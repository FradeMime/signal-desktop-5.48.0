var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var import_path = __toESM(require("path"));
var import_http = __toESM(require("http"));
var import_promises = __toESM(require("fs/promises"));
var import_os = require("os");
var import_assert = require("../../util/assert");
var durations = __toESM(require("../../util/durations"));
var import_got = require("../../updater/got");
var import_differential = require("../../updater/differential");
const FIXTURES = import_path.default.join(__dirname, "..", "..", "..", "fixtures");
const CRLF = "\r\n";
describe("updater/differential", () => {
  describe("computeDiff", () => {
    it("computes correct difference", () => {
      const old = [
        { checksum: "a", offset: 0, size: 2 },
        { checksum: "b", offset: 2, size: 4 },
        { checksum: "c", offset: 6, size: 1 },
        { checksum: "c", offset: 7, size: 1 },
        { checksum: "d", offset: 8, size: 4 }
      ];
      const next = [
        { checksum: "prepend", offset: 0, size: 2 },
        { checksum: "not a", offset: 2, size: 4 },
        { checksum: "b", offset: 6, size: 4 },
        { checksum: "c", offset: 10, size: 1 },
        { checksum: "c", offset: 11, size: 1 },
        { checksum: "insert", offset: 12, size: 5 },
        { checksum: "c", offset: 17, size: 1 },
        { checksum: "d", offset: 18, size: 4 },
        { checksum: "append", offset: 22, size: 3 }
      ];
      import_chai.assert.deepStrictEqual((0, import_differential.computeDiff)(old, next), [
        { action: "download", readOffset: 0, size: 6, writeOffset: 0 },
        { action: "copy", readOffset: 2, size: 6, writeOffset: 6 },
        { action: "download", readOffset: 12, size: 6, writeOffset: 12 },
        { action: "copy", readOffset: 8, size: 4, writeOffset: 18 },
        { action: "download", readOffset: 22, size: 3, writeOffset: 22 }
      ]);
    });
  });
  describe("prepareDownload/download", () => {
    const oldFile = "diff-original.bin";
    const oldBlockFile = (0, import_differential.getBlockMapFileName)(oldFile);
    const emptyFile = "diff-empty.bin";
    const newFile = "diff-modified.bin";
    const newBlockFile = (0, import_differential.getBlockMapFileName)(newFile);
    const newHash = "oEXIz7JVN1phjmumPLVQuwSYa+tHLEn5/a+q9w/pbkbnCaXAioWrAIq1P9HeqNQ0Lpsb4mWey632DUPnUXqfiw==";
    const allowedFiles = /* @__PURE__ */ new Set([
      oldFile,
      oldBlockFile,
      newFile,
      newBlockFile
    ]);
    let server;
    let baseUrl;
    let shouldTimeout;
    beforeEach((callback) => {
      shouldTimeout = void 0;
      server = import_http.default.createServer(async (req, res) => {
        if (!req.headers["user-agent"]?.includes("Signal-Desktop")) {
          res.writeHead(403);
          res.end(`Invalid user agent: "${req.headers["user-agent"]}"`);
          return;
        }
        const file = req.url?.slice(1) ?? "";
        if (!allowedFiles.has(file)) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const fullFile = await import_promises.default.readFile(import_path.default.join(FIXTURES, file));
        const rangeHeader = req.headers.range?.match(/^bytes=([\d,\s-]+)$/);
        if (!rangeHeader) {
          res.writeHead(200);
          res.end(fullFile);
          return;
        }
        const ranges = rangeHeader[1].split(/\s*,\s*/g).map((value) => {
          const range = value.match(/^(\d+)-(\d+)$/);
          (0, import_assert.strictAssert)(range, `Invalid header: ${rangeHeader}`);
          return [parseInt(range[1], 10), parseInt(range[2], 10)];
        });
        if (ranges.length === 1) {
          res.writeHead(206, {
            "content-type": "application/octet-stream"
          });
          if (shouldTimeout === "response") {
            res.flushHeaders();
            return;
          }
          const [from, to] = ranges[0];
          res.end(fullFile.slice(from, to + 1));
          return;
        }
        const BOUNDARY = "f8f254ce1ba37627";
        res.writeHead(206, {
          "content-type": `multipart/byteranges; boundary=${BOUNDARY}`
        });
        if (shouldTimeout === "response") {
          res.flushHeaders();
          return;
        }
        const totalSize = fullFile.length;
        const multipart = Buffer.concat([
          ...ranges.map(([from, to]) => [
            Buffer.from([
              `--${BOUNDARY}`,
              "Content-Type: binary/octet-stream",
              `Content-Range: bytes ${from}-${to}/${totalSize}`,
              "",
              ""
            ].join(CRLF)),
            fullFile.slice(from, to + 1),
            Buffer.from(CRLF)
          ]).flat(),
          Buffer.from(`--${BOUNDARY}--${CRLF}`)
        ]);
        res.end(multipart);
      });
      server.unref();
      server.listen(0, () => {
        const addr = server.address();
        (0, import_assert.strictAssert)(typeof addr === "object" && addr, "node.js apis");
        baseUrl = `http://127.0.0.1:${addr.port}`;
        callback();
      });
    });
    afterEach(() => {
      server.close();
    });
    it("prepares the download", async () => {
      const data = await (0, import_differential.prepareDownload)({
        oldFile: import_path.default.join(FIXTURES, oldFile),
        newUrl: `${baseUrl}/${newFile}`,
        sha512: newHash
      });
      import_chai.assert.strictEqual(data.downloadSize, 62826);
      import_chai.assert.deepStrictEqual(data.diff, [
        { action: "copy", size: 44288, readOffset: 0, writeOffset: 0 },
        {
          action: "download",
          size: 8813,
          readOffset: 44288,
          writeOffset: 44288
        },
        {
          action: "copy",
          size: 37849,
          readOffset: 53101,
          writeOffset: 53101
        },
        {
          action: "download",
          size: 21245,
          readOffset: 90950,
          writeOffset: 90950
        },
        {
          action: "copy",
          size: 116397,
          readOffset: 112195,
          writeOffset: 112195
        },
        {
          action: "download",
          size: 32768,
          readOffset: 228592,
          writeOffset: 228592
        },
        {
          action: "copy",
          size: 784,
          readOffset: 261360,
          writeOffset: 261360
        }
      ]);
    });
    it("checks that the data is valid to facilitate caching", async () => {
      const oldFilePath = import_path.default.join(FIXTURES, oldFile);
      const newUrl = `${baseUrl}/${newFile}`;
      const data = await (0, import_differential.prepareDownload)({
        oldFile: oldFilePath,
        newUrl,
        sha512: newHash
      });
      import_chai.assert.isTrue((0, import_differential.isValidPreparedData)(data, {
        oldFile: oldFilePath,
        newUrl,
        sha512: newHash
      }));
      import_chai.assert.isFalse((0, import_differential.isValidPreparedData)(data, {
        oldFile: "different file",
        newUrl,
        sha512: newHash
      }));
      import_chai.assert.isFalse((0, import_differential.isValidPreparedData)(data, {
        oldFile: oldFilePath,
        newUrl: "different url",
        sha512: newHash
      }));
      import_chai.assert.isFalse((0, import_differential.isValidPreparedData)(data, {
        oldFile: oldFilePath,
        newUrl,
        sha512: "different hash"
      }));
    });
    it("downloads the file", async () => {
      const data = await (0, import_differential.prepareDownload)({
        oldFile: import_path.default.join(FIXTURES, oldFile),
        newUrl: `${baseUrl}/${newFile}`,
        sha512: newHash
      });
      const outDir = await import_promises.default.mkdtemp(import_path.default.join((0, import_os.tmpdir)(), "signal-temp-"));
      await import_promises.default.mkdir(outDir, { recursive: true });
      const outFile = import_path.default.join(outDir, "out.bin");
      const chunks = new Array();
      await (0, import_differential.download)(outFile, data, {
        statusCallback(size) {
          chunks.push(size);
        }
      });
      const expected = await import_promises.default.readFile(import_path.default.join(FIXTURES, newFile));
      const actual = await import_promises.default.readFile(outFile);
      import_chai.assert.isTrue(actual.equals(expected), "Files do not match");
      import_chai.assert.isTrue(chunks.length > 0, "Expected multiple callback invocations");
    });
    it("downloads the full file with a single range", async () => {
      const data = await (0, import_differential.prepareDownload)({
        oldFile: import_path.default.join(FIXTURES, emptyFile),
        newUrl: `${baseUrl}/${newFile}`,
        sha512: newHash
      });
      const outDir = await import_promises.default.mkdtemp(import_path.default.join((0, import_os.tmpdir)(), "signal-temp-"));
      await import_promises.default.mkdir(outDir, { recursive: true });
      const outFile = import_path.default.join(outDir, "out.bin");
      const chunks = new Array();
      await (0, import_differential.download)(outFile, data, {
        statusCallback(size) {
          chunks.push(size);
        }
      });
      const expected = await import_promises.default.readFile(import_path.default.join(FIXTURES, newFile));
      const actual = await import_promises.default.readFile(outFile);
      import_chai.assert.isTrue(actual.equals(expected), "Files do not match");
      import_chai.assert.isTrue(chunks.length > 0, "Expected multiple callback invocations");
    });
    it("handles response timeouts gracefully", async () => {
      const data = await (0, import_differential.prepareDownload)({
        oldFile: import_path.default.join(FIXTURES, oldFile),
        newUrl: `${baseUrl}/${newFile}`,
        sha512: newHash
      });
      const outDir = await import_promises.default.mkdtemp(import_path.default.join((0, import_os.tmpdir)(), "signal-temp-"));
      await import_promises.default.mkdir(outDir, { recursive: true });
      const outFile = import_path.default.join(outDir, "out.bin");
      shouldTimeout = "response";
      await import_chai.assert.isRejected((0, import_differential.download)(outFile, data, {
        gotOptions: {
          ...(0, import_got.getGotOptions)(),
          timeout: {
            connect: 0.5 * durations.SECOND,
            lookup: 0.5 * durations.SECOND,
            socket: 0.5 * durations.SECOND
          }
        }
      }), /Timeout awaiting 'socket' for 500ms/);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGlmZmVyZW50aWFsX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzL3Byb21pc2VzJztcbmltcG9ydCB7IHRtcGRpciB9IGZyb20gJ29zJztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGdldEdvdE9wdGlvbnMgfSBmcm9tICcuLi8uLi91cGRhdGVyL2dvdCc7XG5pbXBvcnQge1xuICBjb21wdXRlRGlmZixcbiAgZ2V0QmxvY2tNYXBGaWxlTmFtZSxcbiAgcHJlcGFyZURvd25sb2FkLFxuICBpc1ZhbGlkUHJlcGFyZWREYXRhLFxuICBkb3dubG9hZCxcbn0gZnJvbSAnLi4vLi4vdXBkYXRlci9kaWZmZXJlbnRpYWwnO1xuXG5jb25zdCBGSVhUVVJFUyA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICdmaXh0dXJlcycpO1xuY29uc3QgQ1JMRiA9ICdcXHJcXG4nO1xuXG5kZXNjcmliZSgndXBkYXRlci9kaWZmZXJlbnRpYWwnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdjb21wdXRlRGlmZicsICgpID0+IHtcbiAgICBpdCgnY29tcHV0ZXMgY29ycmVjdCBkaWZmZXJlbmNlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb2xkID0gW1xuICAgICAgICB7IGNoZWNrc3VtOiAnYScsIG9mZnNldDogMCwgc2l6ZTogMiB9LFxuICAgICAgICB7IGNoZWNrc3VtOiAnYicsIG9mZnNldDogMiwgc2l6ZTogNCB9LFxuICAgICAgICB7IGNoZWNrc3VtOiAnYycsIG9mZnNldDogNiwgc2l6ZTogMSB9LFxuICAgICAgICB7IGNoZWNrc3VtOiAnYycsIG9mZnNldDogNywgc2l6ZTogMSB9LFxuICAgICAgICB7IGNoZWNrc3VtOiAnZCcsIG9mZnNldDogOCwgc2l6ZTogNCB9LFxuICAgICAgXTtcblxuICAgICAgY29uc3QgbmV4dCA9IFtcbiAgICAgICAgeyBjaGVja3N1bTogJ3ByZXBlbmQnLCBvZmZzZXQ6IDAsIHNpemU6IDIgfSxcbiAgICAgICAgeyBjaGVja3N1bTogJ25vdCBhJywgb2Zmc2V0OiAyLCBzaXplOiA0IH0sXG4gICAgICAgIHsgY2hlY2tzdW06ICdiJywgb2Zmc2V0OiA2LCBzaXplOiA0IH0sXG4gICAgICAgIHsgY2hlY2tzdW06ICdjJywgb2Zmc2V0OiAxMCwgc2l6ZTogMSB9LFxuICAgICAgICB7IGNoZWNrc3VtOiAnYycsIG9mZnNldDogMTEsIHNpemU6IDEgfSxcbiAgICAgICAgeyBjaGVja3N1bTogJ2luc2VydCcsIG9mZnNldDogMTIsIHNpemU6IDUgfSxcbiAgICAgICAgeyBjaGVja3N1bTogJ2MnLCBvZmZzZXQ6IDE3LCBzaXplOiAxIH0sXG4gICAgICAgIHsgY2hlY2tzdW06ICdkJywgb2Zmc2V0OiAxOCwgc2l6ZTogNCB9LFxuICAgICAgICB7IGNoZWNrc3VtOiAnYXBwZW5kJywgb2Zmc2V0OiAyMiwgc2l6ZTogMyB9LFxuICAgICAgXTtcblxuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjb21wdXRlRGlmZihvbGQsIG5leHQpLCBbXG4gICAgICAgIHsgYWN0aW9uOiAnZG93bmxvYWQnLCByZWFkT2Zmc2V0OiAwLCBzaXplOiA2LCB3cml0ZU9mZnNldDogMCB9LFxuICAgICAgICB7IGFjdGlvbjogJ2NvcHknLCByZWFkT2Zmc2V0OiAyLCBzaXplOiA2LCB3cml0ZU9mZnNldDogNiB9LFxuICAgICAgICAvLyBOb3RlOiB0aGlzIGluY2x1ZGVzIHRoZSB0aGlyZCBcImNcIlxuICAgICAgICB7IGFjdGlvbjogJ2Rvd25sb2FkJywgcmVhZE9mZnNldDogMTIsIHNpemU6IDYsIHdyaXRlT2Zmc2V0OiAxMiB9LFxuICAgICAgICAvLyBUaGlzIGlzIFwiZFwiXG4gICAgICAgIHsgYWN0aW9uOiAnY29weScsIHJlYWRPZmZzZXQ6IDgsIHNpemU6IDQsIHdyaXRlT2Zmc2V0OiAxOCB9LFxuICAgICAgICB7IGFjdGlvbjogJ2Rvd25sb2FkJywgcmVhZE9mZnNldDogMjIsIHNpemU6IDMsIHdyaXRlT2Zmc2V0OiAyMiB9LFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdwcmVwYXJlRG93bmxvYWQvZG93bmxvYWQnLCAoKSA9PiB7XG4gICAgY29uc3Qgb2xkRmlsZSA9ICdkaWZmLW9yaWdpbmFsLmJpbic7XG4gICAgY29uc3Qgb2xkQmxvY2tGaWxlID0gZ2V0QmxvY2tNYXBGaWxlTmFtZShvbGRGaWxlKTtcblxuICAgIGNvbnN0IGVtcHR5RmlsZSA9ICdkaWZmLWVtcHR5LmJpbic7XG5cbiAgICBjb25zdCBuZXdGaWxlID0gJ2RpZmYtbW9kaWZpZWQuYmluJztcbiAgICBjb25zdCBuZXdCbG9ja0ZpbGUgPSBnZXRCbG9ja01hcEZpbGVOYW1lKG5ld0ZpbGUpO1xuICAgIGNvbnN0IG5ld0hhc2ggPVxuICAgICAgJ29FWEl6N0pWTjFwaGptdW1QTFZRdXdTWWErdEhMRW41L2ErcTl3L3BiaycgK1xuICAgICAgJ2JuQ2FYQWlvV3JBSXExUDlIZXFOUTBMcHNiNG1XZXk2MzJEVVBuVVhxZml3PT0nO1xuXG4gICAgY29uc3QgYWxsb3dlZEZpbGVzID0gbmV3IFNldChbXG4gICAgICBvbGRGaWxlLFxuICAgICAgb2xkQmxvY2tGaWxlLFxuICAgICAgbmV3RmlsZSxcbiAgICAgIG5ld0Jsb2NrRmlsZSxcbiAgICBdKTtcblxuICAgIGxldCBzZXJ2ZXI6IGh0dHAuU2VydmVyO1xuICAgIGxldCBiYXNlVXJsOiBzdHJpbmc7XG4gICAgbGV0IHNob3VsZFRpbWVvdXQ6ICdyZXNwb25zZScgfCB1bmRlZmluZWQ7XG5cbiAgICBiZWZvcmVFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgIHNob3VsZFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICAgICAgaWYgKCFyZXEuaGVhZGVyc1sndXNlci1hZ2VudCddPy5pbmNsdWRlcygnU2lnbmFsLURlc2t0b3AnKSkge1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAzKTtcbiAgICAgICAgICByZXMuZW5kKGBJbnZhbGlkIHVzZXIgYWdlbnQ6IFwiJHtyZXEuaGVhZGVyc1sndXNlci1hZ2VudCddfVwiYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZSA9IHJlcS51cmw/LnNsaWNlKDEpID8/ICcnO1xuICAgICAgICBpZiAoIWFsbG93ZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgICByZXMud3JpdGVIZWFkKDQwNCk7XG4gICAgICAgICAgcmVzLmVuZCgnTm90IGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZnVsbEZpbGUgPSBhd2FpdCBmcy5yZWFkRmlsZShwYXRoLmpvaW4oRklYVFVSRVMsIGZpbGUpKTtcblxuICAgICAgICBjb25zdCByYW5nZUhlYWRlciA9IHJlcS5oZWFkZXJzLnJhbmdlPy5tYXRjaCgvXmJ5dGVzPShbXFxkLFxccy1dKykkLyk7XG4gICAgICAgIGlmICghcmFuZ2VIZWFkZXIpIHtcbiAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCk7XG4gICAgICAgICAgcmVzLmVuZChmdWxsRmlsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmFuZ2VzID0gcmFuZ2VIZWFkZXJbMV0uc3BsaXQoL1xccyosXFxzKi9nKS5tYXAodmFsdWUgPT4ge1xuICAgICAgICAgIGNvbnN0IHJhbmdlID0gdmFsdWUubWF0Y2goL14oXFxkKyktKFxcZCspJC8pO1xuICAgICAgICAgIHN0cmljdEFzc2VydChyYW5nZSwgYEludmFsaWQgaGVhZGVyOiAke3JhbmdlSGVhZGVyfWApO1xuXG4gICAgICAgICAgcmV0dXJuIFtwYXJzZUludChyYW5nZVsxXSwgMTApLCBwYXJzZUludChyYW5nZVsyXSwgMTApXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJhbmdlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICByZXMud3JpdGVIZWFkKDIwNiwge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzaG91bGRUaW1lb3V0ID09PSAncmVzcG9uc2UnKSB7XG4gICAgICAgICAgICByZXMuZmx1c2hIZWFkZXJzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgW2Zyb20sIHRvXSA9IHJhbmdlc1swXTtcbiAgICAgICAgICByZXMuZW5kKGZ1bGxGaWxlLnNsaWNlKGZyb20sIHRvICsgMSkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IEJPVU5EQVJZID0gJ2Y4ZjI1NGNlMWJhMzc2MjcnO1xuXG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjA2LCB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IGBtdWx0aXBhcnQvYnl0ZXJhbmdlczsgYm91bmRhcnk9JHtCT1VOREFSWX1gLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNob3VsZFRpbWVvdXQgPT09ICdyZXNwb25zZScpIHtcbiAgICAgICAgICByZXMuZmx1c2hIZWFkZXJzKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdG90YWxTaXplID0gZnVsbEZpbGUubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IG11bHRpcGFydCA9IEJ1ZmZlci5jb25jYXQoW1xuICAgICAgICAgIC4uLnJhbmdlc1xuICAgICAgICAgICAgLm1hcCgoW2Zyb20sIHRvXSkgPT4gW1xuICAgICAgICAgICAgICBCdWZmZXIuZnJvbShcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBgLS0ke0JPVU5EQVJZfWAsXG4gICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlOiBiaW5hcnkvb2N0ZXQtc3RyZWFtJyxcbiAgICAgICAgICAgICAgICAgIGBDb250ZW50LVJhbmdlOiBieXRlcyAke2Zyb219LSR7dG99LyR7dG90YWxTaXplfWAsXG4gICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgIF0uam9pbihDUkxGKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBmdWxsRmlsZS5zbGljZShmcm9tLCB0byArIDEpLFxuICAgICAgICAgICAgICBCdWZmZXIuZnJvbShDUkxGKSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAuZmxhdCgpLFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKGAtLSR7Qk9VTkRBUll9LS0ke0NSTEZ9YCksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHJlcy5lbmQobXVsdGlwYXJ0KTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXJ2ZXIudW5yZWYoKTtcblxuICAgICAgc2VydmVyLmxpc3RlbigwLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICAgICAgICBzdHJpY3RBc3NlcnQodHlwZW9mIGFkZHIgPT09ICdvYmplY3QnICYmIGFkZHIsICdub2RlLmpzIGFwaXMnKTtcbiAgICAgICAgYmFzZVVybCA9IGBodHRwOi8vMTI3LjAuMC4xOiR7YWRkci5wb3J0fWA7XG5cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNlcnZlci5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3ByZXBhcmVzIHRoZSBkb3dubG9hZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwcmVwYXJlRG93bmxvYWQoe1xuICAgICAgICBvbGRGaWxlOiBwYXRoLmpvaW4oRklYVFVSRVMsIG9sZEZpbGUpLFxuICAgICAgICBuZXdVcmw6IGAke2Jhc2VVcmx9LyR7bmV3RmlsZX1gLFxuICAgICAgICBzaGE1MTI6IG5ld0hhc2gsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGRhdGEuZG93bmxvYWRTaXplLCA2MjgyNik7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGRhdGEuZGlmZiwgW1xuICAgICAgICB7IGFjdGlvbjogJ2NvcHknLCBzaXplOiA0NDI4OCwgcmVhZE9mZnNldDogMCwgd3JpdGVPZmZzZXQ6IDAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogJ2Rvd25sb2FkJyxcbiAgICAgICAgICBzaXplOiA4ODEzLFxuICAgICAgICAgIHJlYWRPZmZzZXQ6IDQ0Mjg4LFxuICAgICAgICAgIHdyaXRlT2Zmc2V0OiA0NDI4OCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogJ2NvcHknLFxuICAgICAgICAgIHNpemU6IDM3ODQ5LFxuICAgICAgICAgIHJlYWRPZmZzZXQ6IDUzMTAxLFxuICAgICAgICAgIHdyaXRlT2Zmc2V0OiA1MzEwMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogJ2Rvd25sb2FkJyxcbiAgICAgICAgICBzaXplOiAyMTI0NSxcbiAgICAgICAgICByZWFkT2Zmc2V0OiA5MDk1MCxcbiAgICAgICAgICB3cml0ZU9mZnNldDogOTA5NTAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhY3Rpb246ICdjb3B5JyxcbiAgICAgICAgICBzaXplOiAxMTYzOTcsXG4gICAgICAgICAgcmVhZE9mZnNldDogMTEyMTk1LFxuICAgICAgICAgIHdyaXRlT2Zmc2V0OiAxMTIxOTUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhY3Rpb246ICdkb3dubG9hZCcsXG4gICAgICAgICAgc2l6ZTogMzI3NjgsXG4gICAgICAgICAgcmVhZE9mZnNldDogMjI4NTkyLFxuICAgICAgICAgIHdyaXRlT2Zmc2V0OiAyMjg1OTIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhY3Rpb246ICdjb3B5JyxcbiAgICAgICAgICBzaXplOiA3ODQsXG4gICAgICAgICAgcmVhZE9mZnNldDogMjYxMzYwLFxuICAgICAgICAgIHdyaXRlT2Zmc2V0OiAyNjEzNjAsXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICB9KTtcblxuICAgIGl0KCdjaGVja3MgdGhhdCB0aGUgZGF0YSBpcyB2YWxpZCB0byBmYWNpbGl0YXRlIGNhY2hpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRGaWxlUGF0aCA9IHBhdGguam9pbihGSVhUVVJFUywgb2xkRmlsZSk7XG4gICAgICBjb25zdCBuZXdVcmwgPSBgJHtiYXNlVXJsfS8ke25ld0ZpbGV9YDtcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHByZXBhcmVEb3dubG9hZCh7XG4gICAgICAgIG9sZEZpbGU6IG9sZEZpbGVQYXRoLFxuICAgICAgICBuZXdVcmwsXG4gICAgICAgIHNoYTUxMjogbmV3SGFzaCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBpc1ZhbGlkUHJlcGFyZWREYXRhKGRhdGEsIHtcbiAgICAgICAgICBvbGRGaWxlOiBvbGRGaWxlUGF0aCxcbiAgICAgICAgICBuZXdVcmwsXG4gICAgICAgICAgc2hhNTEyOiBuZXdIYXNoLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGlzVmFsaWRQcmVwYXJlZERhdGEoZGF0YSwge1xuICAgICAgICAgIG9sZEZpbGU6ICdkaWZmZXJlbnQgZmlsZScsXG4gICAgICAgICAgbmV3VXJsLFxuICAgICAgICAgIHNoYTUxMjogbmV3SGFzaCxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc1ZhbGlkUHJlcGFyZWREYXRhKGRhdGEsIHtcbiAgICAgICAgICBvbGRGaWxlOiBvbGRGaWxlUGF0aCxcbiAgICAgICAgICBuZXdVcmw6ICdkaWZmZXJlbnQgdXJsJyxcbiAgICAgICAgICBzaGE1MTI6IG5ld0hhc2gsXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNWYWxpZFByZXBhcmVkRGF0YShkYXRhLCB7XG4gICAgICAgICAgb2xkRmlsZTogb2xkRmlsZVBhdGgsXG4gICAgICAgICAgbmV3VXJsLFxuICAgICAgICAgIHNoYTUxMjogJ2RpZmZlcmVudCBoYXNoJyxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG93bmxvYWRzIHRoZSBmaWxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHByZXBhcmVEb3dubG9hZCh7XG4gICAgICAgIG9sZEZpbGU6IHBhdGguam9pbihGSVhUVVJFUywgb2xkRmlsZSksXG4gICAgICAgIG5ld1VybDogYCR7YmFzZVVybH0vJHtuZXdGaWxlfWAsXG4gICAgICAgIHNoYTUxMjogbmV3SGFzaCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvdXREaXIgPSBhd2FpdCBmcy5ta2R0ZW1wKHBhdGguam9pbih0bXBkaXIoKSwgJ3NpZ25hbC10ZW1wLScpKTtcbiAgICAgIGF3YWl0IGZzLm1rZGlyKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNvbnN0IG91dEZpbGUgPSBwYXRoLmpvaW4ob3V0RGlyLCAnb3V0LmJpbicpO1xuICAgICAgY29uc3QgY2h1bmtzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgIGF3YWl0IGRvd25sb2FkKG91dEZpbGUsIGRhdGEsIHtcbiAgICAgICAgc3RhdHVzQ2FsbGJhY2soc2l6ZSkge1xuICAgICAgICAgIGNodW5rcy5wdXNoKHNpemUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gYXdhaXQgZnMucmVhZEZpbGUocGF0aC5qb2luKEZJWFRVUkVTLCBuZXdGaWxlKSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBmcy5yZWFkRmlsZShvdXRGaWxlKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShhY3R1YWwuZXF1YWxzKGV4cGVjdGVkKSwgJ0ZpbGVzIGRvIG5vdCBtYXRjaCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgY2h1bmtzLmxlbmd0aCA+IDAsXG4gICAgICAgICdFeHBlY3RlZCBtdWx0aXBsZSBjYWxsYmFjayBpbnZvY2F0aW9ucydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG93bmxvYWRzIHRoZSBmdWxsIGZpbGUgd2l0aCBhIHNpbmdsZSByYW5nZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwcmVwYXJlRG93bmxvYWQoe1xuICAgICAgICBvbGRGaWxlOiBwYXRoLmpvaW4oRklYVFVSRVMsIGVtcHR5RmlsZSksXG4gICAgICAgIG5ld1VybDogYCR7YmFzZVVybH0vJHtuZXdGaWxlfWAsXG4gICAgICAgIHNoYTUxMjogbmV3SGFzaCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvdXREaXIgPSBhd2FpdCBmcy5ta2R0ZW1wKHBhdGguam9pbih0bXBkaXIoKSwgJ3NpZ25hbC10ZW1wLScpKTtcbiAgICAgIGF3YWl0IGZzLm1rZGlyKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNvbnN0IG91dEZpbGUgPSBwYXRoLmpvaW4ob3V0RGlyLCAnb3V0LmJpbicpO1xuICAgICAgY29uc3QgY2h1bmtzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgIGF3YWl0IGRvd25sb2FkKG91dEZpbGUsIGRhdGEsIHtcbiAgICAgICAgc3RhdHVzQ2FsbGJhY2soc2l6ZSkge1xuICAgICAgICAgIGNodW5rcy5wdXNoKHNpemUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gYXdhaXQgZnMucmVhZEZpbGUocGF0aC5qb2luKEZJWFRVUkVTLCBuZXdGaWxlKSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBmcy5yZWFkRmlsZShvdXRGaWxlKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShhY3R1YWwuZXF1YWxzKGV4cGVjdGVkKSwgJ0ZpbGVzIGRvIG5vdCBtYXRjaCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgY2h1bmtzLmxlbmd0aCA+IDAsXG4gICAgICAgICdFeHBlY3RlZCBtdWx0aXBsZSBjYWxsYmFjayBpbnZvY2F0aW9ucydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyByZXNwb25zZSB0aW1lb3V0cyBncmFjZWZ1bGx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHByZXBhcmVEb3dubG9hZCh7XG4gICAgICAgIG9sZEZpbGU6IHBhdGguam9pbihGSVhUVVJFUywgb2xkRmlsZSksXG4gICAgICAgIG5ld1VybDogYCR7YmFzZVVybH0vJHtuZXdGaWxlfWAsXG4gICAgICAgIHNoYTUxMjogbmV3SGFzaCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvdXREaXIgPSBhd2FpdCBmcy5ta2R0ZW1wKHBhdGguam9pbih0bXBkaXIoKSwgJ3NpZ25hbC10ZW1wLScpKTtcbiAgICAgIGF3YWl0IGZzLm1rZGlyKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNvbnN0IG91dEZpbGUgPSBwYXRoLmpvaW4ob3V0RGlyLCAnb3V0LmJpbicpO1xuXG4gICAgICBzaG91bGRUaW1lb3V0ID0gJ3Jlc3BvbnNlJztcbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICBkb3dubG9hZChvdXRGaWxlLCBkYXRhLCB7XG4gICAgICAgICAgZ290T3B0aW9uczoge1xuICAgICAgICAgICAgLi4uZ2V0R290T3B0aW9ucygpLFxuICAgICAgICAgICAgdGltZW91dDoge1xuICAgICAgICAgICAgICBjb25uZWN0OiAwLjUgKiBkdXJhdGlvbnMuU0VDT05ELFxuICAgICAgICAgICAgICBsb29rdXA6IDAuNSAqIGR1cmF0aW9ucy5TRUNPTkQsXG4gICAgICAgICAgICAgIHNvY2tldDogMC41ICogZHVyYXRpb25zLlNFQ09ORCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIC9UaW1lb3V0IGF3YWl0aW5nICdzb2NrZXQnIGZvciA1MDBtcy9cbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsa0JBQWlCO0FBQ2pCLGtCQUFpQjtBQUNqQixzQkFBZTtBQUNmLGdCQUF1QjtBQUV2QixvQkFBNkI7QUFDN0IsZ0JBQTJCO0FBQzNCLGlCQUE4QjtBQUM5QiwwQkFNTztBQUVQLE1BQU0sV0FBVyxvQkFBSyxLQUFLLFdBQVcsTUFBTSxNQUFNLE1BQU0sVUFBVTtBQUNsRSxNQUFNLE9BQU87QUFFYixTQUFTLHdCQUF3QixNQUFNO0FBQ3JDLFdBQVMsZUFBZSxNQUFNO0FBQzVCLE9BQUcsK0JBQStCLE1BQU07QUFDdEMsWUFBTSxNQUFNO0FBQUEsUUFDVixFQUFFLFVBQVUsS0FBSyxRQUFRLEdBQUcsTUFBTSxFQUFFO0FBQUEsUUFDcEMsRUFBRSxVQUFVLEtBQUssUUFBUSxHQUFHLE1BQU0sRUFBRTtBQUFBLFFBQ3BDLEVB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
