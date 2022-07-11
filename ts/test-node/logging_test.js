var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var fs = __toESM(require("fs"));
var fse = __toESM(require("fs-extra"));
var os = __toESM(require("os"));
var path = __toESM(require("path"));
var import_chai = require("chai");
var import_main_process_logging = require("../logging/main_process_logging");
describe("logging", () => {
  const fakeLogEntry = /* @__PURE__ */ __name(({
    level = 30,
    msg = "hello world",
    time = new Date().toISOString()
  }) => ({
    level,
    msg,
    time
  }), "fakeLogEntry");
  const fakeLogLine = /* @__PURE__ */ __name((...args) => JSON.stringify(fakeLogEntry(...args)), "fakeLogLine");
  let tmpDir;
  beforeEach(async () => {
    tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "signal-test-"));
  });
  afterEach(async () => {
    await fse.remove(tmpDir);
  });
  describe("#isLineAfterDate", () => {
    it("returns false if falsy", () => {
      const actual = (0, import_main_process_logging.isLineAfterDate)("", new Date());
      import_chai.assert.isFalse(actual);
    });
    it("returns false if invalid JSON", () => {
      const actual = (0, import_main_process_logging.isLineAfterDate)("{{}", new Date());
      import_chai.assert.isFalse(actual);
    });
    it("returns false if date is invalid", () => {
      const line = JSON.stringify({ time: "2018-01-04T19:17:05.014Z" });
      const actual = (0, import_main_process_logging.isLineAfterDate)(line, new Date("try6"));
      import_chai.assert.isFalse(actual);
    });
    it("returns false if log time is invalid", () => {
      const line = JSON.stringify({ time: "try7" });
      const date = new Date("2018-01-04T19:17:00.000Z");
      const actual = (0, import_main_process_logging.isLineAfterDate)(line, date);
      import_chai.assert.isFalse(actual);
    });
    it("returns false if date before provided date", () => {
      const line = JSON.stringify({ time: "2018-01-04T19:17:00.000Z" });
      const date = new Date("2018-01-04T19:17:05.014Z");
      const actual = (0, import_main_process_logging.isLineAfterDate)(line, date);
      import_chai.assert.isFalse(actual);
    });
    it("returns true if date is after provided date", () => {
      const line = JSON.stringify({ time: "2018-01-04T19:17:05.014Z" });
      const date = new Date("2018-01-04T19:17:00.000Z");
      const actual = (0, import_main_process_logging.isLineAfterDate)(line, date);
      import_chai.assert.isTrue(actual);
    });
  });
  describe("#eliminateOutOfDateFiles", () => {
    it("deletes an empty file", () => {
      const date = new Date();
      const log = "\n";
      const target = path.join(tmpDir, "log.log");
      fs.writeFileSync(target, log);
      return (0, import_main_process_logging.eliminateOutOfDateFiles)(tmpDir, date).then(() => {
        import_chai.assert.isFalse(fs.existsSync(target));
      });
    });
    it("deletes a file with invalid JSON lines", () => {
      const date = new Date();
      const log = "{{}\n";
      const target = path.join(tmpDir, "log.log");
      fs.writeFileSync(target, log);
      return (0, import_main_process_logging.eliminateOutOfDateFiles)(tmpDir, date).then(() => {
        import_chai.assert.isFalse(fs.existsSync(target));
      });
    });
    it("deletes a file with all dates before provided date", () => {
      const date = new Date("2018-01-04T19:17:05.014Z");
      const contents = [
        JSON.stringify({ time: "2018-01-04T19:17:00.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:01.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:02.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:03.014Z" })
      ].join("\n");
      const target = path.join(tmpDir, "log.log");
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.eliminateOutOfDateFiles)(tmpDir, date).then(() => {
        import_chai.assert.isFalse(fs.existsSync(target));
      });
    });
    it("keeps a file with first line date before provided date", () => {
      const date = new Date("2018-01-04T19:16:00.000Z");
      const contents = [
        JSON.stringify({ time: "2018-01-04T19:17:00.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:01.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:02.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:03.014Z" })
      ].join("\n");
      const target = path.join(tmpDir, "log.log");
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.eliminateOutOfDateFiles)(tmpDir, date).then(() => {
        import_chai.assert.isTrue(fs.existsSync(target));
      });
    });
    it("keeps a file with last line date before provided date", () => {
      const date = new Date("2018-01-04T19:17:01.000Z");
      const contents = [
        JSON.stringify({ time: "2018-01-04T19:17:00.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:01.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:02.014Z" }),
        JSON.stringify({ time: "2018-01-04T19:17:03.014Z" })
      ].join("\n");
      const target = path.join(tmpDir, "log.log");
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.eliminateOutOfDateFiles)(tmpDir, date).then(() => {
        import_chai.assert.isTrue(fs.existsSync(target));
      });
    });
  });
  describe("#eliminateOldEntries", () => {
    it("eliminates all non-parsing entries", () => {
      const date = new Date("2018-01-04T19:17:01.000Z");
      const contents = [
        "random line",
        fakeLogLine({ time: "2018-01-04T19:17:01.014Z" }),
        fakeLogLine({ time: "2018-01-04T19:17:02.014Z" }),
        fakeLogLine({ time: "2018-01-04T19:17:03.014Z" })
      ].join("\n");
      const expected = [
        fakeLogEntry({ time: "2018-01-04T19:17:01.014Z" }),
        fakeLogEntry({ time: "2018-01-04T19:17:02.014Z" }),
        fakeLogEntry({ time: "2018-01-04T19:17:03.014Z" })
      ];
      const target = path.join(tmpDir, "log.log");
      const files = [
        {
          path: target
        }
      ];
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.eliminateOldEntries)(files, date).then(() => {
        const actualEntries = fs.readFileSync(target, "utf8").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
        import_chai.assert.deepStrictEqual(actualEntries, expected);
      });
    });
    it("preserves all lines if before target date", () => {
      const date = new Date("2018-01-04T19:17:03.000Z");
      const contents = [
        "random line",
        fakeLogLine({ time: "2018-01-04T19:17:01.014Z" }),
        fakeLogLine({ time: "2018-01-04T19:17:02.014Z" }),
        fakeLogLine({ time: "2018-01-04T19:17:03.014Z" })
      ].join("\n");
      const expected = fakeLogEntry({ time: "2018-01-04T19:17:03.014Z" });
      const target = path.join(tmpDir, "log.log");
      const files = [
        {
          path: target
        }
      ];
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.eliminateOldEntries)(files, date).then(() => {
        import_chai.assert.deepStrictEqual(JSON.parse(fs.readFileSync(target, "utf8")), expected);
      });
    });
  });
  describe("#fetchLog", () => {
    it("returns error if file does not exist", () => {
      const target = "random_file";
      return (0, import_main_process_logging.fetchLog)(target).then(() => {
        throw new Error("Expected an error!");
      }, (error) => {
        import_chai.assert.match(error.message, /random_file/);
      });
    });
    it("returns empty array if file has no valid JSON lines", () => {
      const contents = "line 1\nline2\n";
      const target = path.join(tmpDir, "test.log");
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.fetchLog)(target).then((result) => {
        import_chai.assert.isEmpty(result);
      });
    });
    it("returns just three fields in each returned line", () => {
      const contents = [
        JSON.stringify({
          one: 1,
          two: 2,
          level: 30,
          time: "2020-04-20T06:09:08.000Z",
          msg: "message 1"
        }),
        JSON.stringify({
          one: 1,
          two: 2,
          level: 40,
          time: "2021-04-20T06:09:08.000Z",
          msg: "message 2"
        }),
        ""
      ].join("\n");
      const expected = [
        {
          level: 30,
          time: "2020-04-20T06:09:08.000Z",
          msg: "message 1"
        },
        {
          level: 40,
          time: "2021-04-20T06:09:08.000Z",
          msg: "message 2"
        }
      ];
      const target = path.join(tmpDir, "test.log");
      fs.writeFileSync(target, contents);
      return (0, import_main_process_logging.fetchLog)(target).then((result) => {
        import_chai.assert.deepStrictEqual(result, expected);
      });
    });
  });
  describe("#fetchLogs", () => {
    it("returns single entry if no files", () => {
      return (0, import_main_process_logging.fetchLogs)(tmpDir).then((results) => {
        import_chai.assert.lengthOf(results, 1);
        import_chai.assert.match(results[0]?.msg || "", /Loaded this list/);
      });
    });
    it("returns sorted entries from all files", () => {
      const first = [
        fakeLogLine({ msg: "2", time: "2018-01-04T19:17:05.014Z" }),
        ""
      ].join("\n");
      const second = [
        fakeLogLine({ msg: "1", time: "2018-01-04T19:17:00.014Z" }),
        fakeLogLine({ msg: "3", time: "2018-01-04T19:18:00.014Z" }),
        ""
      ].join("\n");
      fs.writeFileSync(path.join(tmpDir, "first.log"), first);
      fs.writeFileSync(path.join(tmpDir, "second.log"), second);
      return (0, import_main_process_logging.fetchLogs)(tmpDir).then((results) => {
        import_chai.assert.lengthOf(results, 4);
        import_chai.assert.strictEqual(results[0]?.msg, "1");
        import_chai.assert.strictEqual(results[1]?.msg, "2");
        import_chai.assert.strictEqual(results[2]?.msg, "3");
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibG9nZ2luZ190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLy8gTk9URTogVGVtcG9yYXJpbHkgYWxsb3cgYHRoZW5gIHVudGlsIHdlIGNvbnZlcnQgdGhlIGVudGlyZSBmaWxlIHRvIGBhc3luY2AgLyBgYXdhaXRgOlxuLyogZXNsaW50LWRpc2FibGUgbW9yZS9uby10aGVuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIGZzZSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7XG4gIGVsaW1pbmF0ZU91dE9mRGF0ZUZpbGVzLFxuICBlbGltaW5hdGVPbGRFbnRyaWVzLFxuICBpc0xpbmVBZnRlckRhdGUsXG4gIGZldGNoTG9nLFxuICBmZXRjaExvZ3MsXG59IGZyb20gJy4uL2xvZ2dpbmcvbWFpbl9wcm9jZXNzX2xvZ2dpbmcnO1xuXG5kZXNjcmliZSgnbG9nZ2luZycsICgpID0+IHtcbiAgY29uc3QgZmFrZUxvZ0VudHJ5ID0gKHtcbiAgICBsZXZlbCA9IDMwLFxuICAgIG1zZyA9ICdoZWxsbyB3b3JsZCcsXG4gICAgdGltZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgfToge1xuICAgIGxldmVsPzogbnVtYmVyO1xuICAgIG1zZz86IHN0cmluZztcbiAgICB0aW1lPzogc3RyaW5nO1xuICB9KTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4gKHtcbiAgICBsZXZlbCxcbiAgICBtc2csXG4gICAgdGltZSxcbiAgfSk7XG5cbiAgY29uc3QgZmFrZUxvZ0xpbmUgPSAoLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgZmFrZUxvZ0VudHJ5Pik6IHN0cmluZyA9PlxuICAgIEpTT04uc3RyaW5naWZ5KGZha2VMb2dFbnRyeSguLi5hcmdzKSk7XG5cbiAgbGV0IHRtcERpcjogc3RyaW5nO1xuXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIHRtcERpciA9IGF3YWl0IGZzLnByb21pc2VzLm1rZHRlbXAocGF0aC5qb2luKG9zLnRtcGRpcigpLCAnc2lnbmFsLXRlc3QtJykpO1xuICB9KTtcblxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGZzZS5yZW1vdmUodG1wRGlyKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNpc0xpbmVBZnRlckRhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgZmFsc3knLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmVBZnRlckRhdGUoJycsIG5ldyBEYXRlKCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoYWN0dWFsKTtcbiAgICB9KTtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpbnZhbGlkIEpTT04nLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmVBZnRlckRhdGUoJ3t7fScsIG5ldyBEYXRlKCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoYWN0dWFsKTtcbiAgICB9KTtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBkYXRlIGlzIGludmFsaWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBsaW5lID0gSlNPTi5zdHJpbmdpZnkoeyB0aW1lOiAnMjAxOC0wMS0wNFQxOToxNzowNS4wMTRaJyB9KTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGlzTGluZUFmdGVyRGF0ZShsaW5lLCBuZXcgRGF0ZSgndHJ5NicpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGFjdHVhbCk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbG9nIHRpbWUgaXMgaW52YWxpZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGxpbmUgPSBKU09OLnN0cmluZ2lmeSh7IHRpbWU6ICd0cnk3JyB9KTtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgnMjAxOC0wMS0wNFQxOToxNzowMC4wMDBaJyk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmVBZnRlckRhdGUobGluZSwgZGF0ZSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShhY3R1YWwpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGRhdGUgYmVmb3JlIHByb3ZpZGVkIGRhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBsaW5lID0gSlNPTi5zdHJpbmdpZnkoeyB0aW1lOiAnMjAxOC0wMS0wNFQxOToxNzowMC4wMDBaJyB9KTtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgnMjAxOC0wMS0wNFQxOToxNzowNS4wMTRaJyk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmVBZnRlckRhdGUobGluZSwgZGF0ZSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShhY3R1YWwpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyBhZnRlciBwcm92aWRlZCBkYXRlJywgKCkgPT4ge1xuICAgICAgY29uc3QgbGluZSA9IEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDUuMDE0WicgfSk7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoJzIwMTgtMDEtMDRUMTk6MTc6MDAuMDAwWicpO1xuICAgICAgY29uc3QgYWN0dWFsID0gaXNMaW5lQWZ0ZXJEYXRlKGxpbmUsIGRhdGUpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShhY3R1YWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2VsaW1pbmF0ZU91dE9mRGF0ZUZpbGVzJywgKCkgPT4ge1xuICAgIGl0KCdkZWxldGVzIGFuIGVtcHR5IGZpbGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGxvZyA9ICdcXG4nO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ2xvZy5sb2cnKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0LCBsb2cpO1xuXG4gICAgICByZXR1cm4gZWxpbWluYXRlT3V0T2ZEYXRlRmlsZXModG1wRGlyLCBkYXRlKS50aGVuKCgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoZnMuZXhpc3RzU3luYyh0YXJnZXQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KCdkZWxldGVzIGEgZmlsZSB3aXRoIGludmFsaWQgSlNPTiBsaW5lcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgbG9nID0gJ3t7fVxcbic7XG4gICAgICBjb25zdCB0YXJnZXQgPSBwYXRoLmpvaW4odG1wRGlyLCAnbG9nLmxvZycpO1xuICAgICAgZnMud3JpdGVGaWxlU3luYyh0YXJnZXQsIGxvZyk7XG5cbiAgICAgIHJldHVybiBlbGltaW5hdGVPdXRPZkRhdGVGaWxlcyh0bXBEaXIsIGRhdGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShmcy5leGlzdHNTeW5jKHRhcmdldCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoJ2RlbGV0ZXMgYSBmaWxlIHdpdGggYWxsIGRhdGVzIGJlZm9yZSBwcm92aWRlZCBkYXRlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCcyMDE4LTAxLTA0VDE5OjE3OjA1LjAxNFonKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gW1xuICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAwLjAxNFonIH0pLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAxLjAxNFonIH0pLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAyLjAxNFonIH0pLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAzLjAxNFonIH0pLFxuICAgICAgXS5qb2luKCdcXG4nKTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHBhdGguam9pbih0bXBEaXIsICdsb2cubG9nJyk7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHRhcmdldCwgY29udGVudHMpO1xuXG4gICAgICByZXR1cm4gZWxpbWluYXRlT3V0T2ZEYXRlRmlsZXModG1wRGlyLCBkYXRlKS50aGVuKCgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoZnMuZXhpc3RzU3luYyh0YXJnZXQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KCdrZWVwcyBhIGZpbGUgd2l0aCBmaXJzdCBsaW5lIGRhdGUgYmVmb3JlIHByb3ZpZGVkIGRhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoJzIwMTgtMDEtMDRUMTk6MTY6MDAuMDAwWicpO1xuICAgICAgY29uc3QgY29udGVudHMgPSBbXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDAuMDE0WicgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDEuMDE0WicgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDIuMDE0WicgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDMuMDE0WicgfSksXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ2xvZy5sb2cnKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0LCBjb250ZW50cyk7XG5cbiAgICAgIHJldHVybiBlbGltaW5hdGVPdXRPZkRhdGVGaWxlcyh0bXBEaXIsIGRhdGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGZzLmV4aXN0c1N5bmModGFyZ2V0KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgna2VlcHMgYSBmaWxlIHdpdGggbGFzdCBsaW5lIGRhdGUgYmVmb3JlIHByb3ZpZGVkIGRhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoJzIwMTgtMDEtMDRUMTk6MTc6MDEuMDAwWicpO1xuICAgICAgY29uc3QgY29udGVudHMgPSBbXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDAuMDE0WicgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDEuMDE0WicgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDIuMDE0WicgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDMuMDE0WicgfSksXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ2xvZy5sb2cnKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0LCBjb250ZW50cyk7XG5cbiAgICAgIHJldHVybiBlbGltaW5hdGVPdXRPZkRhdGVGaWxlcyh0bXBEaXIsIGRhdGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGZzLmV4aXN0c1N5bmModGFyZ2V0KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNlbGltaW5hdGVPbGRFbnRyaWVzJywgKCkgPT4ge1xuICAgIGl0KCdlbGltaW5hdGVzIGFsbCBub24tcGFyc2luZyBlbnRyaWVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCcyMDE4LTAxLTA0VDE5OjE3OjAxLjAwMFonKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gW1xuICAgICAgICAncmFuZG9tIGxpbmUnLFxuICAgICAgICBmYWtlTG9nTGluZSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAxLjAxNFonIH0pLFxuICAgICAgICBmYWtlTG9nTGluZSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAyLjAxNFonIH0pLFxuICAgICAgICBmYWtlTG9nTGluZSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAzLjAxNFonIH0pLFxuICAgICAgXS5qb2luKCdcXG4nKTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gW1xuICAgICAgICBmYWtlTG9nRW50cnkoeyB0aW1lOiAnMjAxOC0wMS0wNFQxOToxNzowMS4wMTRaJyB9KSxcbiAgICAgICAgZmFrZUxvZ0VudHJ5KHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDIuMDE0WicgfSksXG4gICAgICAgIGZha2VMb2dFbnRyeSh7IHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE3OjAzLjAxNFonIH0pLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ2xvZy5sb2cnKTtcbiAgICAgIGNvbnN0IGZpbGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgcGF0aDogdGFyZ2V0LFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyh0YXJnZXQsIGNvbnRlbnRzKTtcblxuICAgICAgcmV0dXJuIGVsaW1pbmF0ZU9sZEVudHJpZXMoZmlsZXMsIGRhdGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3R1YWxFbnRyaWVzID0gZnNcbiAgICAgICAgICAucmVhZEZpbGVTeW5jKHRhcmdldCwgJ3V0ZjgnKVxuICAgICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgICAubWFwKGxpbmUgPT4gbGluZS50cmltKCkpXG4gICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgIC5tYXAobGluZSA9PiBKU09OLnBhcnNlKGxpbmUpKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3R1YWxFbnRyaWVzLCBleHBlY3RlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgncHJlc2VydmVzIGFsbCBsaW5lcyBpZiBiZWZvcmUgdGFyZ2V0IGRhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoJzIwMTgtMDEtMDRUMTk6MTc6MDMuMDAwWicpO1xuICAgICAgY29uc3QgY29udGVudHMgPSBbXG4gICAgICAgICdyYW5kb20gbGluZScsXG4gICAgICAgIGZha2VMb2dMaW5lKHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDEuMDE0WicgfSksXG4gICAgICAgIGZha2VMb2dMaW5lKHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDIuMDE0WicgfSksXG4gICAgICAgIGZha2VMb2dMaW5lKHsgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDMuMDE0WicgfSksXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBmYWtlTG9nRW50cnkoeyB0aW1lOiAnMjAxOC0wMS0wNFQxOToxNzowMy4wMTRaJyB9KTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ2xvZy5sb2cnKTtcbiAgICAgIGNvbnN0IGZpbGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgcGF0aDogdGFyZ2V0LFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyh0YXJnZXQsIGNvbnRlbnRzKTtcblxuICAgICAgcmV0dXJuIGVsaW1pbmF0ZU9sZEVudHJpZXMoZmlsZXMsIGRhdGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBUaGVyZSBzaG91bGQgb25seSBiZSAxIGxpbmUsIHNvIHdlIGNhbiBwYXJzZSBpdCBzYWZlbHkuXG4gICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgICAgSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmModGFyZ2V0LCAndXRmOCcpKSxcbiAgICAgICAgICBleHBlY3RlZFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZmV0Y2hMb2cnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZXJyb3IgaWYgZmlsZSBkb2VzIG5vdCBleGlzdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICdyYW5kb21fZmlsZSc7XG4gICAgICByZXR1cm4gZmV0Y2hMb2codGFyZ2V0KS50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBlcnJvciEnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIGFzc2VydC5tYXRjaChlcnJvci5tZXNzYWdlLCAvcmFuZG9tX2ZpbGUvKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBpdCgncmV0dXJucyBlbXB0eSBhcnJheSBpZiBmaWxlIGhhcyBubyB2YWxpZCBKU09OIGxpbmVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudHMgPSAnbGluZSAxXFxubGluZTJcXG4nO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ3Rlc3QubG9nJyk7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0LCBjb250ZW50cyk7XG5cbiAgICAgIHJldHVybiBmZXRjaExvZyh0YXJnZXQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzRW1wdHkocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIGp1c3QgdGhyZWUgZmllbGRzIGluIGVhY2ggcmV0dXJuZWQgbGluZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gW1xuICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgb25lOiAxLFxuICAgICAgICAgIHR3bzogMixcbiAgICAgICAgICBsZXZlbDogMzAsXG4gICAgICAgICAgdGltZTogJzIwMjAtMDQtMjBUMDY6MDk6MDguMDAwWicsXG4gICAgICAgICAgbXNnOiAnbWVzc2FnZSAxJyxcbiAgICAgICAgfSksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBvbmU6IDEsXG4gICAgICAgICAgdHdvOiAyLFxuICAgICAgICAgIGxldmVsOiA0MCxcbiAgICAgICAgICB0aW1lOiAnMjAyMS0wNC0yMFQwNjowOTowOC4wMDBaJyxcbiAgICAgICAgICBtc2c6ICdtZXNzYWdlIDInLFxuICAgICAgICB9KSxcbiAgICAgICAgJycsXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBsZXZlbDogMzAsXG4gICAgICAgICAgdGltZTogJzIwMjAtMDQtMjBUMDY6MDk6MDguMDAwWicsXG4gICAgICAgICAgbXNnOiAnbWVzc2FnZSAxJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxldmVsOiA0MCxcbiAgICAgICAgICB0aW1lOiAnMjAyMS0wNC0yMFQwNjowOTowOC4wMDBaJyxcbiAgICAgICAgICBtc2c6ICdtZXNzYWdlIDInLFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHRtcERpciwgJ3Rlc3QubG9nJyk7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0LCBjb250ZW50cyk7XG5cbiAgICAgIHJldHVybiBmZXRjaExvZyh0YXJnZXQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZXN1bHQsIGV4cGVjdGVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2ZldGNoTG9ncycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBzaW5nbGUgZW50cnkgaWYgbm8gZmlsZXMnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gZmV0Y2hMb2dzKHRtcERpcikudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHJlc3VsdHMsIDEpO1xuICAgICAgICBhc3NlcnQubWF0Y2gocmVzdWx0c1swXT8ubXNnIHx8ICcnLCAvTG9hZGVkIHRoaXMgbGlzdC8pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgc29ydGVkIGVudHJpZXMgZnJvbSBhbGwgZmlsZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmaXJzdCA9IFtcbiAgICAgICAgZmFrZUxvZ0xpbmUoeyBtc2c6ICcyJywgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDUuMDE0WicgfSksXG4gICAgICAgICcnLFxuICAgICAgXS5qb2luKCdcXG4nKTtcbiAgICAgIGNvbnN0IHNlY29uZCA9IFtcbiAgICAgICAgZmFrZUxvZ0xpbmUoeyBtc2c6ICcxJywgdGltZTogJzIwMTgtMDEtMDRUMTk6MTc6MDAuMDE0WicgfSksXG4gICAgICAgIGZha2VMb2dMaW5lKHsgbXNnOiAnMycsIHRpbWU6ICcyMDE4LTAxLTA0VDE5OjE4OjAwLjAxNFonIH0pLFxuICAgICAgICAnJyxcbiAgICAgIF0uam9pbignXFxuJyk7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHRtcERpciwgJ2ZpcnN0LmxvZycpLCBmaXJzdCk7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbih0bXBEaXIsICdzZWNvbmQubG9nJyksIHNlY29uZCk7XG5cbiAgICAgIHJldHVybiBmZXRjaExvZ3ModG1wRGlyKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgICBhc3NlcnQubGVuZ3RoT2YocmVzdWx0cywgNCk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRzWzBdPy5tc2csICcxJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRzWzFdPy5tc2csICcyJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRzWzJdPy5tc2csICczJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxTQUFvQjtBQUNwQixVQUFxQjtBQUNyQixTQUFvQjtBQUNwQixXQUFzQjtBQUN0QixrQkFBdUI7QUFFdkIsa0NBTU87QUFFUCxTQUFTLFdBQVcsTUFBTTtBQUN4QixRQUFNLGVBQWUsd0JBQUM7QUFBQSxJQUNwQixRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixPQUFPLElBQUksS0FBSyxFQUFFLFlBQVk7QUFBQSxRQUtBO0FBQUEsSUFDOUI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFacUI7QUFjckIsUUFBTSxjQUFjLDJCQUFJLFNBQ3RCLEtBQUssVUFBVSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBRGxCO0FBR3BCLE1BQUk7QUFFSixhQUFXLFlBQVk7QUFDckIsYUFBUyxNQUFNLEdBQUcsU0FBUyxRQUFRLEtBQUssS0FBSyxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQUM7QUFBQSxFQUMzRSxDQUFDO0FBRUQsWUFBVSxZQUFZO0FBQ3BCLFVBQU0sSUFBSSxPQUFPLE1BQU07QUFBQSxFQUN6QixDQUFDO0FBRUQsV0FBUyxvQkFBb0IsTUFBTTtBQUNqQyxPQUFHLDBCQUEwQixNQUFNO0FBQ2pDLFlBQU0sU0FBUyxpREFBZ0IsSUFBSSxJQUFJLEtBQUssQ0FBQztBQUM3Qyx5QkFBTyxRQUFRLE1BQU07QUFBQSxJQUN2QixDQUFDO0FBQ0QsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4QyxZQUFNLFNBQVMsaURBQWdCLE9BQU8sSUFBSSxLQUFLLENBQUM7QUFDaEQseUJBQU8sUUFBUSxNQUFNO0FBQUEsSUFDdkIsQ0FBQztBQUNE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QUFBLFFBQ2Y7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFVBQ04sS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBRUEsWUFBTSxTQUFTLEtBQUssS0FBSyxRQUFRLFVBQVU7QUFFM0MsU0FBRyxjQUFjLFFBQVEsUUFBUTtBQUVqQyxhQUFPLDBDQUFTLE1BQU0sRUFBRSxLQUFLLFlBQVU7QUFDckMsMkJBQU8sZ0JBQWdCLFFBQVEsUUFBUTtBQUFBLE1BQ3pDLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGNBQWMsTUFBTTtBQUMzQixPQUFHLG9DQUFvQyxNQUFNO0FBQzNDLGFBQU8sMkNBQVUsTUFBTSxFQUFFLEtBQUssYUFBVztBQUN2QywyQkFBTyxTQUFTLFNBQVMsQ0FBQztBQUMxQiwyQkFBTyxNQUFNLFFBQVEsSUFBSSxPQUFPLElBQUksa0JBQWtCO0FBQUEsTUFDeEQsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELE9BQUcseUNBQXlDLE1BQU07QUFDaEQsWUFBTSxRQUFRO0FBQUEsUUFDWixZQUFZLEVBQUUsS0FBSyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFBQSxRQUMxRDtBQUFBLE1BQ0YsRUFBRSxLQUFLLElBQUk7QUFDWCxZQUFNLFNBQVM7QUFBQSxRQUNiLFlBQVksRUFBRSxLQUFLLEtBQUssTUFBTSwyQkFBMkIsQ0FBQztBQUFBLFFBQzFELFlBQVksRUFBRSxLQUFLLEtBQUssTUFBTSwyQkFBMkIsQ0FBQztBQUFBLFFBQzFEO0FBQUEsTUFDRixFQUFFLEtBQUssSUFBSTtBQUVYLFNBQUcsY0FBYyxLQUFLLEtBQUssUUFBUSxXQUFXLEdBQUcsS0FBSztBQUN0RCxTQUFHLGNBQWMsS0FBSyxLQUFLLFFBQVEsWUFBWSxHQUFHLE1BQU07QUFFeEQsYUFBTywyQ0FBVSxNQUFNLEVBQUUsS0FBSyxhQUFXO0FBQ3ZDLDJCQUFPLFNBQVMsU0FBUyxDQUFDO0FBQzFCLDJCQUFPLFlBQVksUUFBUSxJQUFJLEtBQUssR0FBRztBQUN2QywyQkFBTyxZQUFZLFFBQVEsSUFBSSxLQUFLLEdBQUc7QUFDdkMsMkJBQU8sWUFBWSxRQUFRLElBQUksS0FBSyxHQUFHO0FBQUEsTUFDekMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
