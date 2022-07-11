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
var differential_exports = {};
__export(differential_exports, {
  computeDiff: () => computeDiff,
  download: () => download,
  downloadRanges: () => downloadRanges,
  getBlockMapFileName: () => getBlockMapFileName,
  isValidPreparedData: () => isValidPreparedData,
  parseBlockMap: () => parseBlockMap,
  prepareDownload: () => prepareDownload
});
module.exports = __toCommonJS(differential_exports);
var import_promises = require("fs/promises");
var import_util = require("util");
var import_zlib = require("zlib");
var import_got = __toESM(require("got"));
var import_lodash = require("lodash");
var import_p_map = __toESM(require("p-map"));
var import_dicer = __toESM(require("dicer"));
var import_assert = require("../util/assert");
var import_wrapEventEmitterOnce = require("../util/wrapEventEmitterOnce");
var import_got2 = require("./got");
var import_util2 = require("./util");
const gunzip = (0, import_util.promisify)(import_zlib.gunzip);
const SUPPORTED_VERSION = "2";
const MAX_SINGLE_REQ_RANGES = 50;
const MAX_CONCURRENCY = 5;
function getBlockMapFileName(fileName) {
  return `${fileName}.blockmap`;
}
async function parseBlockMap(data) {
  const unpacked = await gunzip(data);
  const json = JSON.parse(unpacked.toString());
  (0, import_assert.strictAssert)(json.version === SUPPORTED_VERSION, `Unsupported blockmap version: ${json.version}`);
  (0, import_assert.strictAssert)(json.files.length === 1, `Unsupported blockmap file count: ${json.files.length}`);
  const [file] = json.files;
  let { offset } = file;
  const blocks = new Array();
  for (const [i, checksum] of file.checksums.entries()) {
    const size = file.sizes[i];
    (0, import_assert.strictAssert)(size !== void 0, `missing block size: ${i}`);
    blocks.push({
      offset,
      size,
      checksum
    });
    offset += size;
  }
  return blocks;
}
function computeDiff(oldMap, newMap) {
  const oldChecksums = /* @__PURE__ */ new Map();
  for (const oldBlock of oldMap) {
    let list = oldChecksums.get(oldBlock.checksum);
    if (!list) {
      list = [];
      oldChecksums.set(oldBlock.checksum, list);
    }
    list.push(oldBlock);
  }
  const diff = new Array();
  let writeOffset = 0;
  for (const newBlock of newMap) {
    const oldBlocks = oldChecksums.get(newBlock.checksum);
    if (oldBlocks) {
      const oldBlock = oldBlocks.shift();
      (0, import_assert.strictAssert)(oldBlock, "Missing expected old block");
      if (oldBlocks.length === 0) {
        oldChecksums.delete(newBlock.checksum);
      }
      (0, import_assert.strictAssert)(oldBlock.size === newBlock.size, `Block size mismatch: ${newBlock.checksum}, ${oldBlock.size} != ${newBlock.size}`);
      diff.push({
        action: "copy",
        size: oldBlock.size,
        readOffset: oldBlock.offset,
        writeOffset
      });
      writeOffset += oldBlock.size;
      continue;
    }
    diff.push({
      action: "download",
      size: newBlock.size,
      readOffset: newBlock.offset,
      writeOffset
    });
    writeOffset += newBlock.size;
  }
  const optimizedDiff = new Array();
  for (const entry of diff) {
    const last = optimizedDiff.length !== 0 ? optimizedDiff[optimizedDiff.length - 1] : void 0;
    const { action, readOffset, size } = entry;
    if (!last || last.action !== action || last.readOffset + last.size !== readOffset) {
      optimizedDiff.push(entry);
      continue;
    }
    last.size += size;
  }
  return optimizedDiff.filter(({ size }) => size !== 0);
}
async function prepareDownload({
  oldFile,
  newUrl,
  sha512
}) {
  const oldBlockMap = await parseBlockMap(await (0, import_promises.readFile)(getBlockMapFileName(oldFile)));
  const newBlockMapData = await (0, import_got.default)(getBlockMapFileName(newUrl), (0, import_got2.getGotOptions)()).buffer();
  const newBlockMap = await parseBlockMap(newBlockMapData);
  const diff = computeDiff(oldBlockMap, newBlockMap);
  let downloadSize = 0;
  for (const { action, size } of diff) {
    if (action === "download") {
      downloadSize += size;
    }
  }
  return {
    downloadSize,
    diff,
    oldFile,
    newUrl,
    newBlockMap: newBlockMapData,
    sha512
  };
}
function isValidPreparedData({ oldFile, newUrl, sha512 }, options) {
  return oldFile === options.oldFile && newUrl === options.newUrl && sha512 === options.sha512;
}
async function download(newFile, { diff, oldFile, newUrl, sha512 }, { statusCallback, logger, gotOptions } = {}) {
  const input = await (0, import_promises.open)(oldFile, "r");
  const output = await (0, import_promises.open)(newFile, "w");
  const abortController = new AbortController();
  const { signal: abortSignal } = abortController;
  const copyActions = diff.filter(({ action }) => action === "copy");
  const copyPromise = Promise.all(copyActions.map(async ({ readOffset, size, writeOffset }) => {
    const chunk = Buffer.alloc(size);
    const { bytesRead } = await input.read(chunk, 0, chunk.length, readOffset);
    (0, import_assert.strictAssert)(bytesRead === size, `Not enough data to read from offset=${readOffset} size=${size}`);
    if (abortSignal?.aborted) {
      return;
    }
    await output.write(chunk, 0, chunk.length, writeOffset);
  }));
  const downloadActions = diff.filter(({ action }) => action === "download");
  try {
    let downloadedSize = 0;
    await Promise.all([
      copyPromise,
      downloadRanges({
        url: newUrl,
        output,
        ranges: downloadActions,
        logger,
        abortSignal,
        gotOptions,
        chunkStatusCallback(chunkSize) {
          downloadedSize += chunkSize;
          if (!abortSignal.aborted) {
            statusCallback?.(downloadedSize);
          }
        }
      })
    ]);
  } catch (error) {
    abortController.abort();
    throw error;
  } finally {
    await Promise.all([input.close(), output.close()]);
  }
  const checkResult = await (0, import_util2.checkIntegrity)(newFile, sha512);
  (0, import_assert.strictAssert)(checkResult.ok, checkResult.error ?? "");
}
async function downloadRanges(options) {
  const { ranges } = options;
  if (ranges.length > MAX_SINGLE_REQ_RANGES) {
    await (0, import_p_map.default)((0, import_lodash.chunk)(ranges, MAX_SINGLE_REQ_RANGES), (subRanges) => downloadRanges({
      ...options,
      ranges: subRanges
    }), { concurrency: MAX_CONCURRENCY });
    return;
  }
  const {
    url,
    output,
    logger,
    abortSignal,
    chunkStatusCallback,
    gotOptions = (0, import_got2.getGotOptions)()
  } = options;
  logger?.info("updater/downloadRanges: downloading ranges", ranges.length);
  const diffByRange = /* @__PURE__ */ new Map();
  for (const diff of ranges) {
    const { action, readOffset, size } = diff;
    (0, import_assert.strictAssert)(action === "download", "Incorrect action type");
    diffByRange.set(`${readOffset}-${readOffset + size - 1}`, diff);
  }
  const stream = import_got.default.stream(url, {
    ...gotOptions,
    headers: {
      ...gotOptions.headers,
      range: `bytes=${Array.from(diffByRange.keys()).join(",")}`
    }
  });
  const onPart = /* @__PURE__ */ __name(async (part) => {
    const diff = await takeDiffFromPart(part, diffByRange);
    await saveDiffStream({
      diff,
      stream: part,
      abortSignal,
      output,
      chunkStatusCallback
    });
  }, "onPart");
  let boundary;
  try {
    const [{ statusCode, headers }] = await (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(stream, "response");
    (0, import_assert.strictAssert)(statusCode === 206, `Invalid status code: ${statusCode}`);
    const match = headers["content-type"]?.match(/^multipart\/byteranges;\s*boundary=([^\s;]+)/);
    if (ranges.length === 1 && !match) {
      await saveDiffStream({
        diff: ranges[0],
        stream,
        abortSignal,
        output,
        chunkStatusCallback
      });
      return;
    }
    boundary = match[1];
  } catch (error) {
    stream.on("error", import_lodash.noop);
    stream.destroy();
    throw error;
  }
  const dicer = new import_dicer.default({ boundary });
  const partPromises = new Array();
  dicer.on("part", (part) => partPromises.push(onPart(part)));
  dicer.once("finish", () => stream.destroy());
  stream.once("error", (err) => dicer.destroy(err));
  stream.pipe(dicer);
  await (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(dicer, "finish");
  stream.unpipe(dicer);
  stream.destroy();
  await Promise.all(partPromises);
  if (abortSignal?.aborted) {
    return;
  }
  const missingRanges = Array.from(diffByRange.values());
  if (missingRanges.length === 0) {
    return;
  }
  logger?.info("updater/downloadRanges: downloading missing ranges", diffByRange.size);
  return downloadRanges({
    ...options,
    ranges: missingRanges
  });
}
async function takeDiffFromPart(part, diffByRange) {
  const [untypedHeaders] = await (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(part, "header");
  const headers = untypedHeaders;
  const contentRange = headers["content-range"];
  (0, import_assert.strictAssert)(contentRange, "Missing Content-Range header for the part");
  const match = contentRange.join(", ").match(/^bytes\s+(\d+-\d+)/);
  (0, import_assert.strictAssert)(match, `Invalid Content-Range header for the part: "${contentRange}"`);
  const range = match[1];
  const diff = diffByRange.get(range);
  (0, import_assert.strictAssert)(diff, `Diff not found for range="${range}"`);
  diffByRange.delete(range);
  return diff;
}
async function saveDiffStream({
  diff,
  stream,
  output,
  abortSignal,
  chunkStatusCallback
}) {
  let offset = 0;
  for await (const chunk of stream) {
    (0, import_assert.strictAssert)(offset + chunk.length <= diff.size, `Server returned more data than expected, written=${offset} newChunk=${chunk.length} maxSize=${diff.size}`);
    if (abortSignal?.aborted) {
      return;
    }
    await output.write(chunk, 0, chunk.length, offset + diff.writeOffset);
    offset += chunk.length;
    if (abortSignal?.aborted) {
      return;
    }
    chunkStatusCallback(chunk.length);
  }
  (0, import_assert.strictAssert)(offset === diff.size, `Not enough data to download from offset=${diff.readOffset} size=${diff.size}`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  computeDiff,
  download,
  downloadRanges,
  getBlockMapFileName,
  isValidPreparedData,
  parseBlockMap,
  prepareDownload
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGlmZmVyZW50aWFsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRmlsZUhhbmRsZSB9IGZyb20gJ2ZzL3Byb21pc2VzJztcbmltcG9ydCB7IHJlYWRGaWxlLCBvcGVuIH0gZnJvbSAnZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHR5cGUgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IGd1bnppcCBhcyBuYXRpdmVHdW56aXAgfSBmcm9tICd6bGliJztcbmltcG9ydCBnb3QgZnJvbSAnZ290JztcbmltcG9ydCB7IGNodW5rIGFzIGxvZGFzaENodW5rLCBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwTWFwIGZyb20gJ3AtbWFwJztcbmltcG9ydCBEaWNlciBmcm9tICdkaWNlcic7XG5cbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IHdyYXBFdmVudEVtaXR0ZXJPbmNlIH0gZnJvbSAnLi4vdXRpbC93cmFwRXZlbnRFbWl0dGVyT25jZSc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGdldEdvdE9wdGlvbnMgfSBmcm9tICcuL2dvdCc7XG5pbXBvcnQgeyBjaGVja0ludGVncml0eSB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IGd1bnppcCA9IHByb21pc2lmeShuYXRpdmVHdW56aXApO1xuXG5jb25zdCBTVVBQT1JURURfVkVSU0lPTiA9ICcyJztcbmNvbnN0IE1BWF9TSU5HTEVfUkVRX1JBTkdFUyA9IDUwOyAvLyAyMCBieXRlcyBwZXIgcmFuZ2UsIH4xa2IgdG90YWwgcGVyIHJlcXVlc3RcbmNvbnN0IE1BWF9DT05DVVJSRU5DWSA9IDU7XG5cbnR5cGUgQmxvY2tNYXBGaWxlSlNPTlR5cGUgPSBSZWFkb25seTx7XG4gIHZlcnNpb246IHN0cmluZztcbiAgZmlsZXM6IFJlYWRvbmx5QXJyYXk8XG4gICAgUmVhZG9ubHk8e1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgb2Zmc2V0OiBudW1iZXI7XG4gICAgICBjaGVja3N1bXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgICAgIHNpemVzOiBSZWFkb25seUFycmF5PG51bWJlcj47XG4gICAgfT5cbiAgPjtcbn0+O1xuXG5leHBvcnQgdHlwZSBCbG9ja01hcEJsb2NrVHlwZSA9IFJlYWRvbmx5PHtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIHNpemU6IG51bWJlcjtcbiAgY2hlY2tzdW06IHN0cmluZztcbn0+O1xuXG5leHBvcnQgdHlwZSBCbG9ja01hcFR5cGUgPSBSZWFkb25seUFycmF5PEJsb2NrTWFwQmxvY2tUeXBlPjtcblxuZXhwb3J0IHR5cGUgRGlmZlR5cGUgPSB7XG4gIGFjdGlvbjogJ2Rvd25sb2FkJyB8ICdjb3B5JztcbiAgc2l6ZTogbnVtYmVyO1xuICByZWFkT2Zmc2V0OiBudW1iZXI7XG4gIHdyaXRlT2Zmc2V0OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBDb21wdXRlRGlmZlJlc3VsdFR5cGUgPSBSZWFkb25seUFycmF5PFJlYWRvbmx5PERpZmZUeXBlPj47XG5cbmV4cG9ydCB0eXBlIFByZXBhcmVEb3dubG9hZFJlc3VsdFR5cGUgPSBSZWFkb25seTx7XG4gIGRvd25sb2FkU2l6ZTogbnVtYmVyO1xuICBvbGRGaWxlOiBzdHJpbmc7XG4gIG5ld1VybDogc3RyaW5nO1xuICBzaGE1MTI6IHN0cmluZztcbiAgZGlmZjogQ29tcHV0ZURpZmZSZXN1bHRUeXBlO1xuXG4gIC8vIFRoaXMgY291bGQgYmUgdXNlZCBieSBjYWxsZXIgdG8gYXZvaWQgZXh0cmEgZG93bmxvYWQgb2YgdGhlIGJsb2NrbWFwXG4gIG5ld0Jsb2NrTWFwOiBCdWZmZXI7XG59PjtcblxuZXhwb3J0IHR5cGUgUHJlcGFyZURvd25sb2FkT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIG9sZEZpbGU6IHN0cmluZztcbiAgbmV3VXJsOiBzdHJpbmc7XG4gIHNoYTUxMjogc3RyaW5nO1xufT47XG5cbmV4cG9ydCB0eXBlIERvd25sb2FkT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIHN0YXR1c0NhbGxiYWNrPzogKGRvd25sb2FkZWRTaXplOiBudW1iZXIpID0+IHZvaWQ7XG4gIGxvZ2dlcj86IExvZ2dlclR5cGU7XG5cbiAgLy8gVGVzdGluZ1xuICBnb3RPcHRpb25zPzogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0R290T3B0aW9ucz47XG59PjtcblxuZXhwb3J0IHR5cGUgRG93bmxvYWRSYW5nZXNPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgdXJsOiBzdHJpbmc7XG4gIG91dHB1dDogRmlsZUhhbmRsZTtcbiAgcmFuZ2VzOiBSZWFkb25seUFycmF5PERpZmZUeXBlPjtcbiAgbG9nZ2VyPzogTG9nZ2VyVHlwZTtcbiAgYWJvcnRTaWduYWw/OiBBYm9ydFNpZ25hbDtcbiAgY2h1bmtTdGF0dXNDYWxsYmFjazogKGNodW5rU2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8vIFRlc3RpbmdcbiAgZ290T3B0aW9ucz86IFJldHVyblR5cGU8dHlwZW9mIGdldEdvdE9wdGlvbnM+O1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCbG9ja01hcEZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7ZmlsZU5hbWV9LmJsb2NrbWFwYDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhcnNlQmxvY2tNYXAoZGF0YTogQnVmZmVyKTogUHJvbWlzZTxCbG9ja01hcFR5cGU+IHtcbiAgY29uc3QgdW5wYWNrZWQgPSBhd2FpdCBndW56aXAoZGF0YSk7XG4gIGNvbnN0IGpzb246IEJsb2NrTWFwRmlsZUpTT05UeXBlID0gSlNPTi5wYXJzZSh1bnBhY2tlZC50b1N0cmluZygpKTtcblxuICBzdHJpY3RBc3NlcnQoXG4gICAganNvbi52ZXJzaW9uID09PSBTVVBQT1JURURfVkVSU0lPTixcbiAgICBgVW5zdXBwb3J0ZWQgYmxvY2ttYXAgdmVyc2lvbjogJHtqc29uLnZlcnNpb259YFxuICApO1xuICBzdHJpY3RBc3NlcnQoXG4gICAganNvbi5maWxlcy5sZW5ndGggPT09IDEsXG4gICAgYFVuc3VwcG9ydGVkIGJsb2NrbWFwIGZpbGUgY291bnQ6ICR7anNvbi5maWxlcy5sZW5ndGh9YFxuICApO1xuXG4gIGNvbnN0IFtmaWxlXSA9IGpzb24uZmlsZXM7XG4gIGxldCB7IG9mZnNldCB9ID0gZmlsZTtcblxuICBjb25zdCBibG9ja3MgPSBuZXcgQXJyYXk8QmxvY2tNYXBCbG9ja1R5cGU+KCk7XG4gIGZvciAoY29uc3QgW2ksIGNoZWNrc3VtXSBvZiBmaWxlLmNoZWNrc3Vtcy5lbnRyaWVzKCkpIHtcbiAgICBjb25zdCBzaXplID0gZmlsZS5zaXplc1tpXTtcbiAgICBzdHJpY3RBc3NlcnQoc2l6ZSAhPT0gdW5kZWZpbmVkLCBgbWlzc2luZyBibG9jayBzaXplOiAke2l9YCk7XG5cbiAgICBibG9ja3MucHVzaCh7XG4gICAgICBvZmZzZXQsXG4gICAgICBzaXplLFxuICAgICAgY2hlY2tzdW0sXG4gICAgfSk7XG5cbiAgICBvZmZzZXQgKz0gc2l6ZTtcbiAgfVxuXG4gIHJldHVybiBibG9ja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlRGlmZihcbiAgb2xkTWFwOiBCbG9ja01hcFR5cGUsXG4gIG5ld01hcDogQmxvY2tNYXBUeXBlXG4pOiBDb21wdXRlRGlmZlJlc3VsdFR5cGUge1xuICBjb25zdCBvbGRDaGVja3N1bXMgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8QmxvY2tNYXBCbG9ja1R5cGU+PigpO1xuICBmb3IgKGNvbnN0IG9sZEJsb2NrIG9mIG9sZE1hcCkge1xuICAgIGxldCBsaXN0ID0gb2xkQ2hlY2tzdW1zLmdldChvbGRCbG9jay5jaGVja3N1bSk7XG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICBsaXN0ID0gW107XG4gICAgICBvbGRDaGVja3N1bXMuc2V0KG9sZEJsb2NrLmNoZWNrc3VtLCBsaXN0KTtcbiAgICB9XG5cbiAgICBsaXN0LnB1c2gob2xkQmxvY2spO1xuICB9XG5cbiAgY29uc3QgZGlmZiA9IG5ldyBBcnJheTxEaWZmVHlwZT4oKTtcblxuICBsZXQgd3JpdGVPZmZzZXQgPSAwO1xuICBmb3IgKGNvbnN0IG5ld0Jsb2NrIG9mIG5ld01hcCkge1xuICAgIGNvbnN0IG9sZEJsb2NrcyA9IG9sZENoZWNrc3Vtcy5nZXQobmV3QmxvY2suY2hlY2tzdW0pO1xuICAgIGlmIChvbGRCbG9ja3MpIHtcbiAgICAgIGNvbnN0IG9sZEJsb2NrID0gb2xkQmxvY2tzLnNoaWZ0KCk7XG4gICAgICBzdHJpY3RBc3NlcnQob2xkQmxvY2ssICdNaXNzaW5nIGV4cGVjdGVkIG9sZCBibG9jaycpO1xuICAgICAgaWYgKG9sZEJsb2Nrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb2xkQ2hlY2tzdW1zLmRlbGV0ZShuZXdCbG9jay5jaGVja3N1bSk7XG4gICAgICB9XG5cbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgb2xkQmxvY2suc2l6ZSA9PT0gbmV3QmxvY2suc2l6ZSxcbiAgICAgICAgYEJsb2NrIHNpemUgbWlzbWF0Y2g6ICR7bmV3QmxvY2suY2hlY2tzdW19LCBgICtcbiAgICAgICAgICBgJHtvbGRCbG9jay5zaXplfSAhPSAke25ld0Jsb2NrLnNpemV9YFxuICAgICAgKTtcblxuICAgICAgZGlmZi5wdXNoKHtcbiAgICAgICAgYWN0aW9uOiAnY29weScsXG4gICAgICAgIHNpemU6IG9sZEJsb2NrLnNpemUsXG4gICAgICAgIHJlYWRPZmZzZXQ6IG9sZEJsb2NrLm9mZnNldCxcbiAgICAgICAgd3JpdGVPZmZzZXQsXG4gICAgICB9KTtcbiAgICAgIHdyaXRlT2Zmc2V0ICs9IG9sZEJsb2NrLnNpemU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBkaWZmLnB1c2goe1xuICAgICAgYWN0aW9uOiAnZG93bmxvYWQnLFxuICAgICAgc2l6ZTogbmV3QmxvY2suc2l6ZSxcbiAgICAgIHJlYWRPZmZzZXQ6IG5ld0Jsb2NrLm9mZnNldCxcbiAgICAgIHdyaXRlT2Zmc2V0LFxuICAgIH0pO1xuICAgIHdyaXRlT2Zmc2V0ICs9IG5ld0Jsb2NrLnNpemU7XG4gIH1cblxuICBjb25zdCBvcHRpbWl6ZWREaWZmID0gbmV3IEFycmF5PERpZmZUeXBlPigpO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRpZmYpIHtcbiAgICBjb25zdCBsYXN0ID1cbiAgICAgIG9wdGltaXplZERpZmYubGVuZ3RoICE9PSAwXG4gICAgICAgID8gb3B0aW1pemVkRGlmZltvcHRpbWl6ZWREaWZmLmxlbmd0aCAtIDFdXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgeyBhY3Rpb24sIHJlYWRPZmZzZXQsIHNpemUgfSA9IGVudHJ5O1xuICAgIGlmIChcbiAgICAgICFsYXN0IHx8XG4gICAgICBsYXN0LmFjdGlvbiAhPT0gYWN0aW9uIHx8XG4gICAgICBsYXN0LnJlYWRPZmZzZXQgKyBsYXN0LnNpemUgIT09IHJlYWRPZmZzZXRcbiAgICApIHtcbiAgICAgIG9wdGltaXplZERpZmYucHVzaChlbnRyeSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBsYXN0LnNpemUgKz0gc2l6ZTtcbiAgfVxuXG4gIHJldHVybiBvcHRpbWl6ZWREaWZmLmZpbHRlcigoeyBzaXplIH0pID0+IHNpemUgIT09IDApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlcGFyZURvd25sb2FkKHtcbiAgb2xkRmlsZSxcbiAgbmV3VXJsLFxuICBzaGE1MTIsXG59OiBQcmVwYXJlRG93bmxvYWRPcHRpb25zVHlwZSk6IFByb21pc2U8UHJlcGFyZURvd25sb2FkUmVzdWx0VHlwZT4ge1xuICBjb25zdCBvbGRCbG9ja01hcCA9IGF3YWl0IHBhcnNlQmxvY2tNYXAoXG4gICAgYXdhaXQgcmVhZEZpbGUoZ2V0QmxvY2tNYXBGaWxlTmFtZShvbGRGaWxlKSlcbiAgKTtcblxuICBjb25zdCBuZXdCbG9ja01hcERhdGEgPSBhd2FpdCBnb3QoXG4gICAgZ2V0QmxvY2tNYXBGaWxlTmFtZShuZXdVcmwpLFxuICAgIGdldEdvdE9wdGlvbnMoKVxuICApLmJ1ZmZlcigpO1xuXG4gIGNvbnN0IG5ld0Jsb2NrTWFwID0gYXdhaXQgcGFyc2VCbG9ja01hcChuZXdCbG9ja01hcERhdGEpO1xuXG4gIGNvbnN0IGRpZmYgPSBjb21wdXRlRGlmZihvbGRCbG9ja01hcCwgbmV3QmxvY2tNYXApO1xuXG4gIGxldCBkb3dubG9hZFNpemUgPSAwO1xuICBmb3IgKGNvbnN0IHsgYWN0aW9uLCBzaXplIH0gb2YgZGlmZikge1xuICAgIGlmIChhY3Rpb24gPT09ICdkb3dubG9hZCcpIHtcbiAgICAgIGRvd25sb2FkU2l6ZSArPSBzaXplO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZG93bmxvYWRTaXplLFxuICAgIGRpZmYsXG4gICAgb2xkRmlsZSxcbiAgICBuZXdVcmwsXG4gICAgbmV3QmxvY2tNYXA6IG5ld0Jsb2NrTWFwRGF0YSxcbiAgICBzaGE1MTIsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkUHJlcGFyZWREYXRhKFxuICB7IG9sZEZpbGUsIG5ld1VybCwgc2hhNTEyIH06IFByZXBhcmVEb3dubG9hZFJlc3VsdFR5cGUsXG4gIG9wdGlvbnM6IFByZXBhcmVEb3dubG9hZE9wdGlvbnNUeXBlXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvbGRGaWxlID09PSBvcHRpb25zLm9sZEZpbGUgJiZcbiAgICBuZXdVcmwgPT09IG9wdGlvbnMubmV3VXJsICYmXG4gICAgc2hhNTEyID09PSBvcHRpb25zLnNoYTUxMlxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWQoXG4gIG5ld0ZpbGU6IHN0cmluZyxcbiAgeyBkaWZmLCBvbGRGaWxlLCBuZXdVcmwsIHNoYTUxMiB9OiBQcmVwYXJlRG93bmxvYWRSZXN1bHRUeXBlLFxuICB7IHN0YXR1c0NhbGxiYWNrLCBsb2dnZXIsIGdvdE9wdGlvbnMgfTogRG93bmxvYWRPcHRpb25zVHlwZSA9IHt9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW5wdXQgPSBhd2FpdCBvcGVuKG9sZEZpbGUsICdyJyk7XG4gIGNvbnN0IG91dHB1dCA9IGF3YWl0IG9wZW4obmV3RmlsZSwgJ3cnKTtcblxuICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IHsgc2lnbmFsOiBhYm9ydFNpZ25hbCB9ID0gYWJvcnRDb250cm9sbGVyO1xuXG4gIGNvbnN0IGNvcHlBY3Rpb25zID0gZGlmZi5maWx0ZXIoKHsgYWN0aW9uIH0pID0+IGFjdGlvbiA9PT0gJ2NvcHknKTtcblxuICBjb25zdCBjb3B5UHJvbWlzZTogUHJvbWlzZTx1bmtub3duPiA9IFByb21pc2UuYWxsKFxuICAgIGNvcHlBY3Rpb25zLm1hcChhc3luYyAoeyByZWFkT2Zmc2V0LCBzaXplLCB3cml0ZU9mZnNldCB9KSA9PiB7XG4gICAgICBjb25zdCBjaHVuayA9IEJ1ZmZlci5hbGxvYyhzaXplKTtcbiAgICAgIGNvbnN0IHsgYnl0ZXNSZWFkIH0gPSBhd2FpdCBpbnB1dC5yZWFkKFxuICAgICAgICBjaHVuayxcbiAgICAgICAgMCxcbiAgICAgICAgY2h1bmsubGVuZ3RoLFxuICAgICAgICByZWFkT2Zmc2V0XG4gICAgICApO1xuXG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIGJ5dGVzUmVhZCA9PT0gc2l6ZSxcbiAgICAgICAgYE5vdCBlbm91Z2ggZGF0YSB0byByZWFkIGZyb20gb2Zmc2V0PSR7cmVhZE9mZnNldH0gc2l6ZT0ke3NpemV9YFxuICAgICAgKTtcblxuICAgICAgaWYgKGFib3J0U2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgb3V0cHV0LndyaXRlKGNodW5rLCAwLCBjaHVuay5sZW5ndGgsIHdyaXRlT2Zmc2V0KTtcbiAgICB9KVxuICApO1xuXG4gIGNvbnN0IGRvd25sb2FkQWN0aW9ucyA9IGRpZmYuZmlsdGVyKCh7IGFjdGlvbiB9KSA9PiBhY3Rpb24gPT09ICdkb3dubG9hZCcpO1xuXG4gIHRyeSB7XG4gICAgbGV0IGRvd25sb2FkZWRTaXplID0gMDtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGNvcHlQcm9taXNlLFxuICAgICAgZG93bmxvYWRSYW5nZXMoe1xuICAgICAgICB1cmw6IG5ld1VybCxcbiAgICAgICAgb3V0cHV0LFxuICAgICAgICByYW5nZXM6IGRvd25sb2FkQWN0aW9ucyxcbiAgICAgICAgbG9nZ2VyLFxuICAgICAgICBhYm9ydFNpZ25hbCxcbiAgICAgICAgZ290T3B0aW9ucyxcbiAgICAgICAgY2h1bmtTdGF0dXNDYWxsYmFjayhjaHVua1NpemUpIHtcbiAgICAgICAgICBkb3dubG9hZGVkU2l6ZSArPSBjaHVua1NpemU7XG4gICAgICAgICAgaWYgKCFhYm9ydFNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgICAgICBzdGF0dXNDYWxsYmFjaz8uKGRvd25sb2FkZWRTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbaW5wdXQuY2xvc2UoKSwgb3V0cHV0LmNsb3NlKCldKTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrUmVzdWx0ID0gYXdhaXQgY2hlY2tJbnRlZ3JpdHkobmV3RmlsZSwgc2hhNTEyKTtcbiAgc3RyaWN0QXNzZXJ0KGNoZWNrUmVzdWx0Lm9rLCBjaGVja1Jlc3VsdC5lcnJvciA/PyAnJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZFJhbmdlcyhcbiAgb3B0aW9uczogRG93bmxvYWRSYW5nZXNPcHRpb25zVHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHsgcmFuZ2VzIH0gPSBvcHRpb25zO1xuXG4gIC8vIElmIHdlIGhhdmUgd2F5IHRvbyBtYW55IHJhbmdlcyAtIHNwbGl0IHRoZW0gdXAgaW50byBtdWx0aXBsZSByZXF1ZXN0c1xuICBpZiAocmFuZ2VzLmxlbmd0aCA+IE1BWF9TSU5HTEVfUkVRX1JBTkdFUykge1xuICAgIGF3YWl0IHBNYXAoXG4gICAgICBsb2Rhc2hDaHVuayhyYW5nZXMsIE1BWF9TSU5HTEVfUkVRX1JBTkdFUyksXG4gICAgICBzdWJSYW5nZXMgPT5cbiAgICAgICAgZG93bmxvYWRSYW5nZXMoe1xuICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgcmFuZ2VzOiBzdWJSYW5nZXMsXG4gICAgICAgIH0pLFxuICAgICAgeyBjb25jdXJyZW5jeTogTUFYX0NPTkNVUlJFTkNZIH1cbiAgICApO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVxdWVzdCBtdWx0aXBsZSByYW5nZXMgaW4gYSBzaW5nbGUgcmVxdWVzdFxuICBjb25zdCB7XG4gICAgdXJsLFxuICAgIG91dHB1dCxcbiAgICBsb2dnZXIsXG4gICAgYWJvcnRTaWduYWwsXG4gICAgY2h1bmtTdGF0dXNDYWxsYmFjayxcbiAgICBnb3RPcHRpb25zID0gZ2V0R290T3B0aW9ucygpLFxuICB9ID0gb3B0aW9ucztcblxuICBsb2dnZXI/LmluZm8oJ3VwZGF0ZXIvZG93bmxvYWRSYW5nZXM6IGRvd25sb2FkaW5nIHJhbmdlcycsIHJhbmdlcy5sZW5ndGgpO1xuXG4gIC8vIE1hcCBmcm9tIGBDb250ZW50LVJhbmdlYCBoZWFkZXIgdmFsdWUgdG8gcmVzcGVjdGl2ZSBEaWZmVHlwZSBvYmplY3QuXG4gIGNvbnN0IGRpZmZCeVJhbmdlID0gbmV3IE1hcDxzdHJpbmcsIERpZmZUeXBlPigpO1xuICBmb3IgKGNvbnN0IGRpZmYgb2YgcmFuZ2VzKSB7XG4gICAgY29uc3QgeyBhY3Rpb24sIHJlYWRPZmZzZXQsIHNpemUgfSA9IGRpZmY7XG4gICAgc3RyaWN0QXNzZXJ0KGFjdGlvbiA9PT0gJ2Rvd25sb2FkJywgJ0luY29ycmVjdCBhY3Rpb24gdHlwZScpO1xuXG4gICAgLy8gTk9URTogdGhlIHJhbmdlIGlzIGluY2x1c2l2ZSwgaGVuY2UgYHNpemUgLSAxYFxuICAgIGRpZmZCeVJhbmdlLnNldChgJHtyZWFkT2Zmc2V0fS0ke3JlYWRPZmZzZXQgKyBzaXplIC0gMX1gLCBkaWZmKTtcbiAgfVxuXG4gIGNvbnN0IHN0cmVhbSA9IGdvdC5zdHJlYW0odXJsLCB7XG4gICAgLi4uZ290T3B0aW9ucyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi5nb3RPcHRpb25zLmhlYWRlcnMsXG4gICAgICByYW5nZTogYGJ5dGVzPSR7QXJyYXkuZnJvbShkaWZmQnlSYW5nZS5rZXlzKCkpLmpvaW4oJywnKX1gLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIEVhY2ggYHBhcnRgIGlzIGEgc2VwYXJhdGUgcmVhZGFibGUgc3RyZWFtIGZvciBvbmUgb2YgdGhlIHJhbmdlc1xuICBjb25zdCBvblBhcnQgPSBhc3luYyAocGFydDogRGljZXIuUGFydFN0cmVhbSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGRpZmYgPSBhd2FpdCB0YWtlRGlmZkZyb21QYXJ0KHBhcnQsIGRpZmZCeVJhbmdlKTtcblxuICAgIGF3YWl0IHNhdmVEaWZmU3RyZWFtKHtcbiAgICAgIGRpZmYsXG4gICAgICBzdHJlYW06IHBhcnQsXG4gICAgICBhYm9ydFNpZ25hbCxcbiAgICAgIG91dHB1dCxcbiAgICAgIGNodW5rU3RhdHVzQ2FsbGJhY2ssXG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IGJvdW5kYXJ5OiBzdHJpbmc7XG4gIHRyeSB7XG4gICAgY29uc3QgW3sgc3RhdHVzQ29kZSwgaGVhZGVycyB9XSA9IGF3YWl0IHdyYXBFdmVudEVtaXR0ZXJPbmNlKFxuICAgICAgc3RyZWFtLFxuICAgICAgJ3Jlc3BvbnNlJ1xuICAgICk7XG5cbiAgICBzdHJpY3RBc3NlcnQoc3RhdHVzQ29kZSA9PT0gMjA2LCBgSW52YWxpZCBzdGF0dXMgY29kZTogJHtzdGF0dXNDb2RlfWApO1xuXG4gICAgY29uc3QgbWF0Y2ggPSBoZWFkZXJzWydjb250ZW50LXR5cGUnXT8ubWF0Y2goXG4gICAgICAvXm11bHRpcGFydFxcL2J5dGVyYW5nZXM7XFxzKmJvdW5kYXJ5PShbXlxccztdKykvXG4gICAgKTtcblxuICAgIC8vIFdoZW4gdGhlIHJlc3VsdCBpcyBzaW5nbGUgcmFuZ2Ugd2UgbWlnaHQgbm9uLW11bHRpcGFydCByZXNwb25zZVxuICAgIGlmIChyYW5nZXMubGVuZ3RoID09PSAxICYmICFtYXRjaCkge1xuICAgICAgYXdhaXQgc2F2ZURpZmZTdHJlYW0oe1xuICAgICAgICBkaWZmOiByYW5nZXNbMF0sXG4gICAgICAgIHN0cmVhbSxcbiAgICAgICAgYWJvcnRTaWduYWwsXG4gICAgICAgIG91dHB1dCxcbiAgICAgICAgY2h1bmtTdGF0dXNDYWxsYmFjayxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgIGJvdW5kYXJ5ID0gbWF0Y2hbMV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSWdub3JlIGZ1cnRoZXIgZXJyb3JzIGFuZCBkZXN0cm95IHN0cmVhbSBlYXJseVxuICAgIHN0cmVhbS5vbignZXJyb3InLCBub29wKTtcbiAgICBzdHJlYW0uZGVzdHJveSgpO1xuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBjb25zdCBkaWNlciA9IG5ldyBEaWNlcih7IGJvdW5kYXJ5IH0pO1xuXG4gIGNvbnN0IHBhcnRQcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPHZvaWQ+PigpO1xuICBkaWNlci5vbigncGFydCcsIHBhcnQgPT4gcGFydFByb21pc2VzLnB1c2gob25QYXJ0KHBhcnQpKSk7XG5cbiAgZGljZXIub25jZSgnZmluaXNoJywgKCkgPT4gc3RyZWFtLmRlc3Ryb3koKSk7XG4gIHN0cmVhbS5vbmNlKCdlcnJvcicsIGVyciA9PiBkaWNlci5kZXN0cm95KGVycikpO1xuXG4gIC8vIFBpcGUgdGhlIHJlc3BvbnNlIHN0cmVhbSBmdWxseSBpbnRvIGRpY2VyXG4gIC8vIE5PVEU6IHdlIGNhbid0IHVzZSBgcGlwZWxpbmVgIGR1ZSB0byBhIGRpY2VyIGJ1ZzpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21zY2RleC9kaWNlci9pc3N1ZXMvMjZcbiAgc3RyZWFtLnBpcGUoZGljZXIpO1xuICBhd2FpdCB3cmFwRXZlbnRFbWl0dGVyT25jZShkaWNlciwgJ2ZpbmlzaCcpO1xuXG4gIC8vIER1ZSB0byB0aGUgYnVnIGFib3ZlIHdlIG5lZWQgdG8gZG8gYSBtYW51YWwgY2xlYW51cFxuICBzdHJlYW0udW5waXBlKGRpY2VyKTtcbiAgc3RyZWFtLmRlc3Ryb3koKTtcblxuICAvLyBXYWl0IGZvciBpbmRpdmlkdWFsIHBhcnRzIHRvIGJlIGZ1bGx5IHdyaXR0ZW4gdG8gRlNcbiAgYXdhaXQgUHJvbWlzZS5hbGwocGFydFByb21pc2VzKTtcblxuICBpZiAoYWJvcnRTaWduYWw/LmFib3J0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBtaXNzaW5nUmFuZ2VzID0gQXJyYXkuZnJvbShkaWZmQnlSYW5nZS52YWx1ZXMoKSk7XG4gIGlmIChtaXNzaW5nUmFuZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlcj8uaW5mbyhcbiAgICAndXBkYXRlci9kb3dubG9hZFJhbmdlczogZG93bmxvYWRpbmcgbWlzc2luZyByYW5nZXMnLFxuICAgIGRpZmZCeVJhbmdlLnNpemVcbiAgKTtcbiAgcmV0dXJuIGRvd25sb2FkUmFuZ2VzKHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHJhbmdlczogbWlzc2luZ1JhbmdlcyxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRha2VEaWZmRnJvbVBhcnQoXG4gIHBhcnQ6IERpY2VyLlBhcnRTdHJlYW0sXG4gIGRpZmZCeVJhbmdlOiBNYXA8c3RyaW5nLCBEaWZmVHlwZT5cbik6IFByb21pc2U8RGlmZlR5cGU+IHtcbiAgY29uc3QgW3VudHlwZWRIZWFkZXJzXSA9IGF3YWl0IHdyYXBFdmVudEVtaXR0ZXJPbmNlKHBhcnQsICdoZWFkZXInKTtcbiAgY29uc3QgaGVhZGVycyA9IHVudHlwZWRIZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIEFycmF5PHN0cmluZz4+O1xuXG4gIGNvbnN0IGNvbnRlbnRSYW5nZSA9IGhlYWRlcnNbJ2NvbnRlbnQtcmFuZ2UnXTtcbiAgc3RyaWN0QXNzZXJ0KGNvbnRlbnRSYW5nZSwgJ01pc3NpbmcgQ29udGVudC1SYW5nZSBoZWFkZXIgZm9yIHRoZSBwYXJ0Jyk7XG5cbiAgY29uc3QgbWF0Y2ggPSBjb250ZW50UmFuZ2Uuam9pbignLCAnKS5tYXRjaCgvXmJ5dGVzXFxzKyhcXGQrLVxcZCspLyk7XG4gIHN0cmljdEFzc2VydChcbiAgICBtYXRjaCxcbiAgICBgSW52YWxpZCBDb250ZW50LVJhbmdlIGhlYWRlciBmb3IgdGhlIHBhcnQ6IFwiJHtjb250ZW50UmFuZ2V9XCJgXG4gICk7XG5cbiAgY29uc3QgcmFuZ2UgPSBtYXRjaFsxXTtcblxuICBjb25zdCBkaWZmID0gZGlmZkJ5UmFuZ2UuZ2V0KHJhbmdlKTtcbiAgc3RyaWN0QXNzZXJ0KGRpZmYsIGBEaWZmIG5vdCBmb3VuZCBmb3IgcmFuZ2U9XCIke3JhbmdlfVwiYCk7XG5cbiAgZGlmZkJ5UmFuZ2UuZGVsZXRlKHJhbmdlKTtcblxuICByZXR1cm4gZGlmZjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZURpZmZTdHJlYW0oe1xuICBkaWZmLFxuICBzdHJlYW0sXG4gIG91dHB1dCxcbiAgYWJvcnRTaWduYWwsXG4gIGNodW5rU3RhdHVzQ2FsbGJhY2ssXG59OiB7XG4gIGRpZmY6IERpZmZUeXBlO1xuICBzdHJlYW06IFJlYWRhYmxlO1xuICBvdXRwdXQ6IEZpbGVIYW5kbGU7XG4gIGFib3J0U2lnbmFsPzogQWJvcnRTaWduYWw7XG4gIGNodW5rU3RhdHVzQ2FsbGJhY2s6IChjaHVua1NpemU6IG51bWJlcikgPT4gdm9pZDtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgbGV0IG9mZnNldCA9IDA7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtKSB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgb2Zmc2V0ICsgY2h1bmsubGVuZ3RoIDw9IGRpZmYuc2l6ZSxcbiAgICAgICdTZXJ2ZXIgcmV0dXJuZWQgbW9yZSBkYXRhIHRoYW4gZXhwZWN0ZWQsICcgK1xuICAgICAgICBgd3JpdHRlbj0ke29mZnNldH0gYCArXG4gICAgICAgIGBuZXdDaHVuaz0ke2NodW5rLmxlbmd0aH0gYCArXG4gICAgICAgIGBtYXhTaXplPSR7ZGlmZi5zaXplfWBcbiAgICApO1xuXG4gICAgaWYgKGFib3J0U2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgb3V0cHV0LndyaXRlKGNodW5rLCAwLCBjaHVuay5sZW5ndGgsIG9mZnNldCArIGRpZmYud3JpdGVPZmZzZXQpO1xuICAgIG9mZnNldCArPSBjaHVuay5sZW5ndGg7XG5cbiAgICAvLyBDaGVjayBmb3Igc2lnbmFsIGFnYWluIHNvIHRoYXQgd2UgZG9uJ3QgaW52b2tlIHN0YXR1cyBjYWxsYmFjayB3aGVuXG4gICAgLy8gYWJvcnRlZC5cbiAgICBpZiAoYWJvcnRTaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjaHVua1N0YXR1c0NhbGxiYWNrKGNodW5rLmxlbmd0aCk7XG4gIH1cblxuICBzdHJpY3RBc3NlcnQoXG4gICAgb2Zmc2V0ID09PSBkaWZmLnNpemUsXG4gICAgYE5vdCBlbm91Z2ggZGF0YSB0byBkb3dubG9hZCBmcm9tIG9mZnNldD0ke2RpZmYucmVhZE9mZnNldH0gYCArXG4gICAgICBgc2l6ZT0ke2RpZmYuc2l6ZX1gXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsc0JBQStCO0FBRS9CLGtCQUEwQjtBQUMxQixrQkFBdUM7QUFDdkMsaUJBQWdCO0FBQ2hCLG9CQUEyQztBQUMzQyxtQkFBaUI7QUFDakIsbUJBQWtCO0FBRWxCLG9CQUE2QjtBQUM3QixrQ0FBcUM7QUFFckMsa0JBQThCO0FBQzlCLG1CQUErQjtBQUUvQixNQUFNLFNBQVMsMkJBQVUsa0JBQVk7QUFFckMsTUFBTSxvQkFBb0I7QUFDMUIsTUFBTSx3QkFBd0I7QUFDOUIsTUFBTSxrQkFBa0I7QUFvRWpCLDZCQUE2QixVQUEwQjtBQUM1RCxTQUFPLEdBQUc7QUFDWjtBQUZnQixBQUloQiw2QkFBb0MsTUFBcUM7QUFDdkUsUUFBTSxXQUFXLE1BQU0sT0FBTyxJQUFJO0FBQ2xDLFFBQU0sT0FBNkIsS0FBSyxNQUFNLFNBQVMsU0FBUyxDQUFDO0FBRWpFLGtDQUNFLEtBQUssWUFBWSxtQkFDakIsaUNBQWlDLEtBQUssU0FDeEM7QUFDQSxrQ0FDRSxLQUFLLE1BQU0sV0FBVyxHQUN0QixvQ0FBb0MsS0FBSyxNQUFNLFFBQ2pEO0FBRUEsUUFBTSxDQUFDLFFBQVEsS0FBSztBQUNwQixNQUFJLEVBQUUsV0FBVztBQUVqQixRQUFNLFNBQVMsSUFBSSxNQUF5QjtBQUM1QyxhQUFXLENBQUMsR0FBRyxhQUFhLEtBQUssVUFBVSxRQUFRLEdBQUc7QUFDcEQsVUFBTSxPQUFPLEtBQUssTUFBTTtBQUN4QixvQ0FBYSxTQUFTLFFBQVcsdUJBQXVCLEdBQUc7QUFFM0QsV0FBTyxLQUFLO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixD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
