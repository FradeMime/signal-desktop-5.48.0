var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var fixtures_exports = {};
__export(fixtures_exports, {
  App: () => import_playwright.App,
  Bootstrap: () => import_bootstrap.Bootstrap,
  DISCARD_COUNT: () => DISCARD_COUNT,
  GROUP_SIZE: () => GROUP_SIZE,
  RUN_COUNT: () => RUN_COUNT,
  debug: () => debug,
  saveLogs: () => saveLogs,
  stats: () => stats
});
module.exports = __toCommonJS(fixtures_exports);
var import_debug = __toESM(require("debug"));
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_bootstrap = require("../bootstrap");
var import_playwright = require("../playwright");
const debug = (0, import_debug.default)("mock:benchmarks");
const RUN_COUNT = process.env.RUN_COUNT ? parseInt(process.env.RUN_COUNT, 10) : 100;
const GROUP_SIZE = process.env.GROUP_SIZE ? parseInt(process.env.GROUP_SIZE, 10) : 8;
const DISCARD_COUNT = process.env.DISCARD_COUNT ? parseInt(process.env.DISCARD_COUNT, 10) : 5;
function stats(list, percentiles = []) {
  if (list.length === 0) {
    throw new Error("Empty list given to stats");
  }
  let mean = 0;
  let stddev = 0;
  for (const value of list) {
    mean += value;
    stddev += value ** 2;
  }
  mean /= list.length;
  stddev /= list.length;
  stddev -= mean ** 2;
  stddev = Math.sqrt(stddev);
  const sorted = list.slice().sort((a, b) => a - b);
  const result = { mean, stddev };
  for (const p of percentiles) {
    result[`p${p}`] = sorted[Math.floor(sorted.length * p / 100)];
  }
  return result;
}
async function saveLogs(bootstrap) {
  const { ARTIFACTS_DIR } = process.env;
  if (!ARTIFACTS_DIR) {
    console.error("Not saving logs. Please set ARTIFACTS_DIR env variable");
    return;
  }
  await import_promises.default.mkdir(ARTIFACTS_DIR, { recursive: true });
  const { logsDir } = bootstrap;
  await import_promises.default.rename(logsDir, import_path.default.join(ARTIFACTS_DIR, "logs"));
}
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:");
  console.error(reason);
  process.exit(1);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App,
  Bootstrap,
  DISCARD_COUNT,
  GROUP_SIZE,
  RUN_COUNT,
  debug,
  saveLogs,
  stats
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZml4dHVyZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy9wcm9taXNlcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgQm9vdHN0cmFwIH0gZnJvbSAnLi4vYm9vdHN0cmFwJztcblxuZXhwb3J0IGNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ21vY2s6YmVuY2htYXJrcycpO1xuXG5leHBvcnQgeyBCb290c3RyYXAgfTtcbmV4cG9ydCB7IEFwcCB9IGZyb20gJy4uL3BsYXl3cmlnaHQnO1xuXG5leHBvcnQgdHlwZSBTdGF0c1R5cGUgPSB7XG4gIG1lYW46IG51bWJlcjtcbiAgc3RkZGV2OiBudW1iZXI7XG4gIFtrZXk6IHN0cmluZ106IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBSVU5fQ09VTlQgPSBwcm9jZXNzLmVudi5SVU5fQ09VTlRcbiAgPyBwYXJzZUludChwcm9jZXNzLmVudi5SVU5fQ09VTlQsIDEwKVxuICA6IDEwMDtcblxuZXhwb3J0IGNvbnN0IEdST1VQX1NJWkUgPSBwcm9jZXNzLmVudi5HUk9VUF9TSVpFXG4gID8gcGFyc2VJbnQocHJvY2Vzcy5lbnYuR1JPVVBfU0laRSwgMTApXG4gIDogODtcblxuZXhwb3J0IGNvbnN0IERJU0NBUkRfQ09VTlQgPSBwcm9jZXNzLmVudi5ESVNDQVJEX0NPVU5UXG4gID8gcGFyc2VJbnQocHJvY2Vzcy5lbnYuRElTQ0FSRF9DT1VOVCwgMTApXG4gIDogNTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXRzKFxuICBsaXN0OiBSZWFkb25seUFycmF5PG51bWJlcj4sXG4gIHBlcmNlbnRpbGVzOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSBbXVxuKTogU3RhdHNUeXBlIHtcbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFbXB0eSBsaXN0IGdpdmVuIHRvIHN0YXRzJyk7XG4gIH1cblxuICBsZXQgbWVhbiA9IDA7XG4gIGxldCBzdGRkZXYgPSAwO1xuXG4gIGZvciAoY29uc3QgdmFsdWUgb2YgbGlzdCkge1xuICAgIG1lYW4gKz0gdmFsdWU7XG4gICAgc3RkZGV2ICs9IHZhbHVlICoqIDI7XG4gIH1cbiAgbWVhbiAvPSBsaXN0Lmxlbmd0aDtcbiAgc3RkZGV2IC89IGxpc3QubGVuZ3RoO1xuXG4gIHN0ZGRldiAtPSBtZWFuICoqIDI7XG4gIHN0ZGRldiA9IE1hdGguc3FydChzdGRkZXYpO1xuXG4gIGNvbnN0IHNvcnRlZCA9IGxpc3Quc2xpY2UoKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG5cbiAgY29uc3QgcmVzdWx0OiBTdGF0c1R5cGUgPSB7IG1lYW4sIHN0ZGRldiB9O1xuXG4gIGZvciAoY29uc3QgcCBvZiBwZXJjZW50aWxlcykge1xuICAgIHJlc3VsdFtgcCR7cH1gXSA9IHNvcnRlZFtNYXRoLmZsb29yKChzb3J0ZWQubGVuZ3RoICogcCkgLyAxMDApXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlTG9ncyhib290c3RyYXA6IEJvb3RzdHJhcCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IEFSVElGQUNUU19ESVIgfSA9IHByb2Nlc3MuZW52O1xuICBpZiAoIUFSVElGQUNUU19ESVIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdOb3Qgc2F2aW5nIGxvZ3MuIFBsZWFzZSBzZXQgQVJUSUZBQ1RTX0RJUiBlbnYgdmFyaWFibGUnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBmcy5ta2RpcihBUlRJRkFDVFNfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICBjb25zdCB7IGxvZ3NEaXIgfSA9IGJvb3RzdHJhcDtcbiAgYXdhaXQgZnMucmVuYW1lKGxvZ3NEaXIsIHBhdGguam9pbihBUlRJRkFDVFNfRElSLCAnbG9ncycpKTtcbn1cblxuLy8gQ2FuIGhhcHBlbiBpZiBlbGVjdHJvbiBleGl0cyBwcmVtYXR1cmVseVxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgcmVhc29uID0+IHtcbiAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHJlamVjdGlvbjonKTtcbiAgY29uc29sZS5lcnJvcihyZWFzb24pO1xuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUF3QjtBQUN4QixzQkFBZTtBQUNmLGtCQUFpQjtBQUVqQix1QkFBMEI7QUFLMUIsd0JBQW9CO0FBSGIsTUFBTSxRQUFRLDBCQUFZLGlCQUFpQjtBQVczQyxNQUFNLFlBQVksUUFBUSxJQUFJLFlBQ2pDLFNBQVMsUUFBUSxJQUFJLFdBQVcsRUFBRSxJQUNsQztBQUVHLE1BQU0sYUFBYSxRQUFRLElBQUksYUFDbEMsU0FBUyxRQUFRLElBQUksWUFBWSxFQUFFLElBQ25DO0FBRUcsTUFBTSxnQkFBZ0IsUUFBUSxJQUFJLGdCQUNyQyxTQUFTLFFBQVEsSUFBSSxlQUFlLEVBQUUsSUFDdEM7QUFFRyxlQUNMLE1BQ0EsY0FBcUMsQ0FBQyxHQUMzQjtBQUNYLE1BQUksS0FBSyxXQUFXLEdBQUc7QUFDckIsVUFBTSxJQUFJLE1BQU0sMkJBQTJCO0FBQUEsRUFDN0M7QUFFQSxNQUFJLE9BQU87QUFDWCxNQUFJLFNBQVM7QUFFYixhQUFXLFNBQVMsTUFBTTtBQUN4QixZQUFRO0FBQ1IsY0FBVSxTQUFTO0FBQUEsRUFDckI7QUFDQSxVQUFRLEtBQUs7QUFDYixZQUFVLEtBQUs7QUFFZixZQUFVLFFBQVE7QUFDbEIsV0FBUyxLQUFLLEtBQUssTUFBTTtBQUV6QixRQUFNLFNBQVMsS0FBSyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUM7QUFFaEQsUUFBTSxTQUFvQixFQUFFLE1BQU0sT0FBTztBQUV6QyxhQUFXLEtBQUssYUFBYTtBQUMzQixXQUFPLElBQUksT0FBTyxPQUFPLEtBQUssTUFBTyxPQUFPLFNBQVMsSUFBSyxHQUFHO0FBQUEsRUFDL0Q7QUFFQSxTQUFPO0FBQ1Q7QUE5QmdCLEFBZ0NoQix3QkFBK0IsV0FBcUM7QUFDbEUsUUFBTSxFQUFFLGtCQUFrQixRQUFRO0FBQ2xDLE1BQUksQ0FBQyxlQUFlO0FBQ2xCLFlBQVEsTUFBTSx3REFBd0Q7QUFDdEU7QUFBQSxFQUNGO0FBRUEsUUFBTSx3QkFBRyxNQUFNLGVBQWUsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUVqRCxRQUFNLEVBQUUsWUFBWTtBQUNwQixRQUFNLHdCQUFHLE9BQU8sU0FBUyxvQkFBSyxLQUFLLGVBQWUsTUFBTSxDQUFDO0FBQzNEO0FBWHNCLEFBY3RCLFFBQVEsR0FBRyxzQkFBc0IsWUFBVTtBQUN6QyxVQUFRLE1BQU0sc0JBQXNCO0FBQ3BDLFVBQVEsTUFBTSxNQUFNO0FBQ3BCLFVBQVEsS0FBSyxDQUFDO0FBQ2hCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
