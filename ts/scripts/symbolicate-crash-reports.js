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
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_http = __toESM(require("http"));
var import_https = __toESM(require("https"));
var import_os = require("os");
var import_child_process = require("child_process");
var import_util = require("util");
var import_assert = require("../util/assert");
var import_wrapEventEmitterOnce = require("../util/wrapEventEmitterOnce");
var import_protobuf = require("../protobuf");
const execFile = (0, import_util.promisify)(import_child_process.execFile);
const TARGET = "https://symbols.electronjs.org";
const proxyServer = import_http.default.createServer(({ method, url = "/" }, res) => {
  console.log(`Proxy server got request ${method} ${url}`);
  if (method !== "GET") {
    throw new Error("Unsupported");
  }
  const patchedURL = url.replace(/signal-desktop-[^\/.]+/g, "electron");
  import_https.default.get(`${TARGET}${patchedURL}`, (remoteRes) => {
    res.writeHead(remoteRes.statusCode ?? 500, remoteRes.headers);
    remoteRes.pipe(res);
  });
}).unref();
async function symbolicate(outDir, fileName, proxyPort) {
  const tmpDir = await import_promises.default.mkdtemp(import_path.default.join((0, import_os.tmpdir)(), "signal-crashe"));
  await import_promises.default.mkdir(tmpDir, { recursive: true });
  const encoded = await import_promises.default.readFile(fileName);
  const { reports } = import_protobuf.SignalService.CrashReportList.decode(encoded);
  const { name: prefix } = import_path.default.parse(fileName);
  await Promise.all(reports.map(async ({ filename: reportName, content }) => {
    if (!reportName || !content) {
      return;
    }
    const { base, name, ext } = import_path.default.parse(reportName);
    if (ext !== ".dmp") {
      console.log(`Ignoring ${reportName}, wrong extension`);
      return;
    }
    const dumpFile = import_path.default.join(tmpDir, `${prefix}-${base}`);
    console.log(`Extracting to ${dumpFile}`);
    await import_promises.default.writeFile(dumpFile, content);
    const outFile = import_path.default.join(outDir, `${prefix}-${name}.txt`);
    await execFile("minidump-stackwalk", [
      "--symbols-url",
      `http://127.0.0.1:${proxyPort}`,
      "--output-file",
      outFile,
      dumpFile
    ]);
    console.log(`Symbolicating ${dumpFile} to ${outFile}`);
  }));
}
async function main(outDir, fileNames) {
  await import_promises.default.mkdir(outDir, { recursive: true });
  proxyServer.listen(0);
  await (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(proxyServer, "listening");
  const addr = proxyServer.address();
  (0, import_assert.strictAssert)(typeof addr === "object" && addr !== null, "Address has to be an object");
  const { port: proxyPort } = addr;
  console.log(`Proxy server listening on ${proxyPort}`);
  await Promise.all(fileNames.map((fileName) => symbolicate(outDir, fileName, proxyPort)));
  proxyServer.close();
}
main(process.argv[2], process.argv.slice(3)).catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3ltYm9saWNhdGUtY3Jhc2gtcmVwb3J0cy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgeyB0bXBkaXIgfSBmcm9tICdvcyc7XG5pbXBvcnQgeyBleGVjRmlsZSBhcyByYXdFeGVjRmlsZSB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5cbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IHdyYXBFdmVudEVtaXR0ZXJPbmNlIH0gZnJvbSAnLi4vdXRpbC93cmFwRXZlbnRFbWl0dGVyT25jZSc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuXG5jb25zdCBleGVjRmlsZSA9IHByb21pc2lmeShyYXdFeGVjRmlsZSk7XG5cbmNvbnN0IFRBUkdFVCA9ICdodHRwczovL3N5bWJvbHMuZWxlY3Ryb25qcy5vcmcnO1xuXG5jb25zdCBwcm94eVNlcnZlciA9IGh0dHBcbiAgLmNyZWF0ZVNlcnZlcigoeyBtZXRob2QsIHVybCA9ICcvJyB9LCByZXMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgUHJveHkgc2VydmVyIGdvdCByZXF1ZXN0ICR7bWV0aG9kfSAke3VybH1gKTtcbiAgICBpZiAobWV0aG9kICE9PSAnR0VUJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCcpO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgIGNvbnN0IHBhdGNoZWRVUkwgPSB1cmwucmVwbGFjZSgvc2lnbmFsLWRlc2t0b3AtW15cXC8uXSsvZywgJ2VsZWN0cm9uJyk7XG5cbiAgICBodHRwcy5nZXQoYCR7VEFSR0VUfSR7cGF0Y2hlZFVSTH1gLCByZW1vdGVSZXMgPT4ge1xuICAgICAgcmVzLndyaXRlSGVhZChyZW1vdGVSZXMuc3RhdHVzQ29kZSA/PyA1MDAsIHJlbW90ZVJlcy5oZWFkZXJzKTtcblxuICAgICAgcmVtb3RlUmVzLnBpcGUocmVzKTtcbiAgICB9KTtcbiAgfSlcbiAgLnVucmVmKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHN5bWJvbGljYXRlKFxuICBvdXREaXI6IHN0cmluZyxcbiAgZmlsZU5hbWU6IHN0cmluZyxcbiAgcHJveHlQb3J0OiBudW1iZXJcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB0bXBEaXIgPSBhd2FpdCBmcy5ta2R0ZW1wKHBhdGguam9pbih0bXBkaXIoKSwgJ3NpZ25hbC1jcmFzaGUnKSk7XG4gIGF3YWl0IGZzLm1rZGlyKHRtcERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgY29uc3QgZW5jb2RlZCA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVOYW1lKTtcbiAgY29uc3QgeyByZXBvcnRzIH0gPSBQcm90by5DcmFzaFJlcG9ydExpc3QuZGVjb2RlKGVuY29kZWQpO1xuXG4gIGNvbnN0IHsgbmFtZTogcHJlZml4IH0gPSBwYXRoLnBhcnNlKGZpbGVOYW1lKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICByZXBvcnRzLm1hcChhc3luYyAoeyBmaWxlbmFtZTogcmVwb3J0TmFtZSwgY29udGVudCB9KSA9PiB7XG4gICAgICBpZiAoIXJlcG9ydE5hbWUgfHwgIWNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGJhc2UsIG5hbWUsIGV4dCB9ID0gcGF0aC5wYXJzZShyZXBvcnROYW1lKTtcbiAgICAgIGlmIChleHQgIT09ICcuZG1wJykge1xuICAgICAgICBjb25zb2xlLmxvZyhgSWdub3JpbmcgJHtyZXBvcnROYW1lfSwgd3JvbmcgZXh0ZW5zaW9uYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZHVtcEZpbGUgPSBwYXRoLmpvaW4odG1wRGlyLCBgJHtwcmVmaXh9LSR7YmFzZX1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBFeHRyYWN0aW5nIHRvICR7ZHVtcEZpbGV9YCk7XG4gICAgICBhd2FpdCBmcy53cml0ZUZpbGUoZHVtcEZpbGUsIGNvbnRlbnQpO1xuXG4gICAgICBjb25zdCBvdXRGaWxlID0gcGF0aC5qb2luKG91dERpciwgYCR7cHJlZml4fS0ke25hbWV9LnR4dGApO1xuXG4gICAgICBhd2FpdCBleGVjRmlsZSgnbWluaWR1bXAtc3RhY2t3YWxrJywgW1xuICAgICAgICAnLS1zeW1ib2xzLXVybCcsXG4gICAgICAgIGBodHRwOi8vMTI3LjAuMC4xOiR7cHJveHlQb3J0fWAsXG4gICAgICAgICctLW91dHB1dC1maWxlJyxcbiAgICAgICAgb3V0RmlsZSxcbiAgICAgICAgZHVtcEZpbGUsXG4gICAgICBdKTtcbiAgICAgIGNvbnNvbGUubG9nKGBTeW1ib2xpY2F0aW5nICR7ZHVtcEZpbGV9IHRvICR7b3V0RmlsZX1gKTtcbiAgICB9KVxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKFxuICBvdXREaXI6IHN0cmluZyxcbiAgZmlsZU5hbWVzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbik6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBmcy5ta2RpcihvdXREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gIHByb3h5U2VydmVyLmxpc3RlbigwKTtcblxuICBhd2FpdCB3cmFwRXZlbnRFbWl0dGVyT25jZShwcm94eVNlcnZlciwgJ2xpc3RlbmluZycpO1xuICBjb25zdCBhZGRyID0gcHJveHlTZXJ2ZXIuYWRkcmVzcygpO1xuICBzdHJpY3RBc3NlcnQoXG4gICAgdHlwZW9mIGFkZHIgPT09ICdvYmplY3QnICYmIGFkZHIgIT09IG51bGwsXG4gICAgJ0FkZHJlc3MgaGFzIHRvIGJlIGFuIG9iamVjdCdcbiAgKTtcblxuICBjb25zdCB7IHBvcnQ6IHByb3h5UG9ydCB9ID0gYWRkcjtcblxuICBjb25zb2xlLmxvZyhgUHJveHkgc2VydmVyIGxpc3RlbmluZyBvbiAke3Byb3h5UG9ydH1gKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBmaWxlTmFtZXMubWFwKGZpbGVOYW1lID0+IHN5bWJvbGljYXRlKG91dERpciwgZmlsZU5hbWUsIHByb3h5UG9ydCkpXG4gICk7XG5cbiAgcHJveHlTZXJ2ZXIuY2xvc2UoKTtcbn1cblxubWFpbihwcm9jZXNzLmFyZ3ZbMl0sIHByb2Nlc3MuYXJndi5zbGljZSgzKSkuY2F0Y2goZXJyb3IgPT4ge1xuICBjb25zb2xlLmVycm9yKGVycm9yLnN0YWNrKTtcbiAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esc0JBQWU7QUFDZixrQkFBaUI7QUFDakIsa0JBQWlCO0FBQ2pCLG1CQUFrQjtBQUNsQixnQkFBdUI7QUFDdkIsMkJBQXdDO0FBQ3hDLGtCQUEwQjtBQUUxQixvQkFBNkI7QUFDN0Isa0NBQXFDO0FBQ3JDLHNCQUF1QztBQUV2QyxNQUFNLFdBQVcsMkJBQVUsNkJBQVc7QUFFdEMsTUFBTSxTQUFTO0FBRWYsTUFBTSxjQUFjLG9CQUNqQixhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU0sT0FBTyxRQUFRO0FBQzVDLFVBQVEsSUFBSSw0QkFBNEIsVUFBVSxLQUFLO0FBQ3ZELE1BQUksV0FBVyxPQUFPO0FBQ3BCLFVBQU0sSUFBSSxNQUFNLGFBQWE7QUFBQSxFQUMvQjtBQUdBLFFBQU0sYUFBYSxJQUFJLFFBQVEsMkJBQTJCLFVBQVU7QUFFcEUsdUJBQU0sSUFBSSxHQUFHLFNBQVMsY0FBYyxlQUFhO0FBQy9DLFFBQUksVUFBVSxVQUFVLGNBQWMsS0FBSyxVQUFVLE9BQU87QUFFNUQsY0FBVSxLQUFLLEdBQUc7QUFBQSxFQUNwQixDQUFDO0FBQ0gsQ0FBQyxFQUNBLE1BQU07QUFFVCwyQkFDRSxRQUNBLFVBQ0EsV0FDZTtBQUNmLFFBQU0sU0FBUyxNQUFNLHdCQUFHLFFBQVEsb0JBQUssS0FBSyxzQkFBTyxHQUFHLGVBQWUsQ0FBQztBQUNwRSxRQUFNLHdCQUFHLE1BQU0sUUFBUSxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBRTFDLFFBQU0sVUFBVSxNQUFNLHdCQUFHLFNBQVMsUUFBUTtBQUMxQyxRQUFNLEVBQUUsWUFBWSw4QkFBTSxnQkFBZ0IsT0FBTyxPQUFPO0FBRXhELFFBQU0sRUFBRSxNQUFNLFdBQVcsb0JBQUssTUFBTSxRQUFRO0FBRTVDLFFBQU0sUUFBUSxJQUNaLFFBQVEsSUFBSSxPQUFPLEVBQUUsVUFBVSxZQUFZLGNBQWM7QUFDdkQsUUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTO0FBQzNCO0FBQUEsSUFDRjtBQUVBLFVBQU0sRUFBRSxNQUFNLE1BQU0sUUFBUSxvQkFBSyxNQUFNLFVBQVU7QUFDakQsUUFBSSxRQUFRLFFBQVE7QUFDbEIsY0FBUSxJQUFJLFlBQVksNkJBQTZCO0FBQ3JEO0FBQUEsSUFDRjtBQUVBLFVBQU0sV0FBVyxvQkFBSyxLQUFLLFFBQVEsR0FBRyxVQUFVLE1BQU07QUFDdEQsWUFBUSxJQUFJLGlCQUFpQixVQUFVO0FBQ3ZDLFVBQU0sd0JBQUcsVUFBVSxVQUFVLE9BQU87QUFFcEMsVUFBTSxVQUFVLG9CQUFLLEtBQUssUUFBUSxHQUFHLFVBQVUsVUFBVTtBQUV6RCxVQUFNLFNBQVMsc0JBQXNCO0FBQUEsTUFDbkM7QUFBQSxNQUNBLG9CQUFvQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFDRCxZQUFRLElBQUksaUJBQWlCLGVBQWUsU0FBUztBQUFBLEVBQ3ZELENBQUMsQ0FDSDtBQUNGO0FBekNlLEFBMkNmLG9CQUNFLFFBQ0EsV0FDZTtBQUNmLFFBQU0sd0JBQUcsTUFBTSxRQUFRLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFFMUMsY0FBWSxPQUFPLENBQUM7QUFFcEIsUUFBTSxzREFBcUIsYUFBYSxXQUFXO0FBQ25ELFFBQU0sT0FBTyxZQUFZLFFBQVE7QUFDakMsa0NBQ0UsT0FBTyxTQUFTLFlBQVksU0FBUyxNQUNyQyw2QkFDRjtBQUVBLFFBQU0sRUFBRSxNQUFNLGNBQWM7QUFFNUIsVUFBUSxJQUFJLDZCQUE2QixXQUFXO0FBRXBELFFBQU0sUUFBUSxJQUNaLFVBQVUsSUFBSSxjQUFZLFlBQVksUUFBUSxVQUFVLFNBQVMsQ0FBQyxDQUNwRTtBQUVBLGNBQVksTUFBTTtBQUNwQjtBQXhCZSxBQTBCZixLQUFLLFFBQVEsS0FBSyxJQUFJLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sV0FBUztBQUMxRCxVQUFRLE1BQU0sTUFBTSxLQUFLO0FBQ3pCLFVBQVEsS0FBSyxDQUFDO0FBQ2hCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
