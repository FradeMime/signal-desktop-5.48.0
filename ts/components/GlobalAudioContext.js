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
var GlobalAudioContext_exports = {};
__export(GlobalAudioContext_exports, {
  GlobalAudioContext: () => GlobalAudioContext,
  GlobalAudioProvider: () => GlobalAudioProvider,
  computePeaks: () => computePeaks
});
module.exports = __toCommonJS(GlobalAudioContext_exports);
var React = __toESM(require("react"));
var import_p_queue = __toESM(require("p-queue"));
var import_lru_cache = __toESM(require("lru-cache"));
var log = __toESM(require("../logging/log"));
const MAX_WAVEFORM_COUNT = 1e3;
const MAX_PARALLEL_COMPUTE = 8;
const MAX_AUDIO_DURATION = 15 * 60;
const audioContext = new AudioContext();
audioContext.suspend();
const waveformCache = new import_lru_cache.default({
  max: MAX_WAVEFORM_COUNT
});
const inProgressMap = /* @__PURE__ */ new Map();
const computeQueue = new import_p_queue.default({
  concurrency: MAX_PARALLEL_COMPUTE
});
async function getAudioDuration(url, buffer) {
  const blob = new Blob([buffer]);
  const blobURL = URL.createObjectURL(blob);
  const audio = new Audio();
  audio.muted = true;
  audio.src = blobURL;
  await new Promise((resolve, reject) => {
    audio.addEventListener("loadedmetadata", () => {
      resolve();
    });
    audio.addEventListener("error", (event) => {
      const error = new Error(`Failed to load audio from: ${url} due to error: ${event.type}`);
      reject(error);
    });
  });
  if (Number.isNaN(audio.duration)) {
    throw new Error(`Invalid audio duration for: ${url}`);
  }
  return audio.duration;
}
async function doComputePeaks(url, barCount) {
  const existing = waveformCache.get(url);
  if (existing) {
    log.info("GlobalAudioContext: waveform cache hit", url);
    return Promise.resolve(existing);
  }
  log.info("GlobalAudioContext: waveform cache miss", url);
  const response = await fetch(url);
  const raw = await response.arrayBuffer();
  const duration = await getAudioDuration(url, raw);
  const peaks = new Array(barCount).fill(0);
  if (duration > MAX_AUDIO_DURATION) {
    log.info(`GlobalAudioContext: audio ${url} duration ${duration}s is too long`);
    const emptyResult = { peaks, duration };
    waveformCache.set(url, emptyResult);
    return emptyResult;
  }
  const data = await audioContext.decodeAudioData(raw);
  const norms = new Array(barCount).fill(0);
  const samplesPerPeak = data.length / peaks.length;
  for (let channelNum = 0; channelNum < data.numberOfChannels; channelNum += 1) {
    const channel = data.getChannelData(channelNum);
    for (let sample = 0; sample < channel.length; sample += 1) {
      const i = Math.floor(sample / samplesPerPeak);
      peaks[i] += channel[sample] ** 2;
      norms[i] += 1;
    }
  }
  let max = 1e-23;
  for (let i = 0; i < peaks.length; i += 1) {
    peaks[i] = Math.sqrt(peaks[i] / Math.max(1, norms[i]));
    max = Math.max(max, peaks[i]);
  }
  for (let i = 0; i < peaks.length; i += 1) {
    peaks[i] /= max;
  }
  const result = { peaks, duration };
  waveformCache.set(url, result);
  return result;
}
async function computePeaks(url, barCount) {
  const computeKey = `${url}:${barCount}`;
  const pending = inProgressMap.get(computeKey);
  if (pending) {
    log.info("GlobalAudioContext: already computing peaks for", computeKey);
    return pending;
  }
  log.info("GlobalAudioContext: queue computing peaks for", computeKey);
  const promise = computeQueue.add(() => doComputePeaks(url, barCount));
  inProgressMap.set(computeKey, promise);
  try {
    return await promise;
  } finally {
    inProgressMap.delete(computeKey);
  }
}
const globalContents = {
  audio: new Audio(),
  computePeaks
};
const GlobalAudioContext = React.createContext(globalContents);
const GlobalAudioProvider = /* @__PURE__ */ __name(({
  conversationId,
  isPaused,
  children
}) => {
  React.useEffect(() => {
    return () => {
      globalContents.audio.pause();
    };
  }, [conversationId]);
  React.useEffect(() => {
    if (isPaused) {
      globalContents.audio.pause();
    }
  }, [isPaused]);
  return /* @__PURE__ */ React.createElement(GlobalAudioContext.Provider, {
    value: globalContents
  }, children);
}, "GlobalAudioProvider");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalAudioContext,
  GlobalAudioProvider,
  computePeaks
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR2xvYmFsQXVkaW9Db250ZXh0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuaW1wb3J0IExSVSBmcm9tICdscnUtY2FjaGUnO1xuXG5pbXBvcnQgdHlwZSB7IFdhdmVmb3JtQ2FjaGUgfSBmcm9tICcuLi90eXBlcy9BdWRpbyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5jb25zdCBNQVhfV0FWRUZPUk1fQ09VTlQgPSAxMDAwO1xuY29uc3QgTUFYX1BBUkFMTEVMX0NPTVBVVEUgPSA4O1xuY29uc3QgTUFYX0FVRElPX0RVUkFUSU9OID0gMTUgKiA2MDsgLy8gMTUgbWludXRlc1xuXG5leHBvcnQgdHlwZSBDb21wdXRlUGVha3NSZXN1bHQgPSB7XG4gIGR1cmF0aW9uOiBudW1iZXI7XG4gIHBlYWtzOiBSZWFkb25seUFycmF5PG51bWJlcj47XG59O1xuXG5leHBvcnQgdHlwZSBDb250ZW50cyA9IHtcbiAgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQ7XG4gIGNvbXB1dGVQZWFrcyh1cmw6IHN0cmluZywgYmFyQ291bnQ6IG51bWJlcik6IFByb21pc2U8Q29tcHV0ZVBlYWtzUmVzdWx0Pjtcbn07XG5cbi8vIFRoaXMgY29udGV4dCdzIHZhbHVlIGlzIGVmZmVjdGl2ZWx5IGdsb2JhbC4gVGhpcyBpcyBub3QgaWRlYWwgYnV0IGlzIG5lY2Vzc2FyeSBiZWNhdXNlXG4vLyAgIHRoZSBhcHAgaGFzIG11bHRpcGxlIFJlYWN0IHJvb3RzLiBJbiB0aGUgZnV0dXJlLCB3ZSBzaG91bGQgdXNlIGEgc2luZ2xlIFJlYWN0IHJvb3Rcbi8vICAgYW5kIGluc3RhbnRpYXRlIHRoZXNlIGluc2lkZSBvZiBgR2xvYmFsQXVkaW9Qcm92aWRlcmAuIChXZSBtYXkgd2lzaCB0byBrZWVwXG4vLyAgIGBhdWRpb0NvbnRleHRgIGdsb2JhbCwgaG93ZXZlciwgYXMgdGhlIGJyb3dzZXIgbGltaXRzIHRoZSBudW1iZXIgdGhhdCBjYW4gYmVcbi8vICAgY3JlYXRlZC4pXG5jb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5hdWRpb0NvbnRleHQuc3VzcGVuZCgpO1xuXG5jb25zdCB3YXZlZm9ybUNhY2hlOiBXYXZlZm9ybUNhY2hlID0gbmV3IExSVSh7XG4gIG1heDogTUFYX1dBVkVGT1JNX0NPVU5ULFxufSk7XG5cbmNvbnN0IGluUHJvZ3Jlc3NNYXAgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxDb21wdXRlUGVha3NSZXN1bHQ+PigpO1xuY29uc3QgY29tcHV0ZVF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gIGNvbmN1cnJlbmN5OiBNQVhfUEFSQUxMRUxfQ09NUFVURSxcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRBdWRpb0R1cmF0aW9uKFxuICB1cmw6IHN0cmluZyxcbiAgYnVmZmVyOiBBcnJheUJ1ZmZlclxuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJdKTtcbiAgY29uc3QgYmxvYlVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oKTtcbiAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xuICBhdWRpby5zcmMgPSBibG9iVVJMO1xuXG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsICgpID0+IHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcblxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXZlbnQgPT4ge1xuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgdG8gbG9hZCBhdWRpbyBmcm9tOiAke3VybH0gZHVlIHRvIGVycm9yOiAke2V2ZW50LnR5cGV9YFxuICAgICAgKTtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4oYXVkaW8uZHVyYXRpb24pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF1ZGlvIGR1cmF0aW9uIGZvcjogJHt1cmx9YCk7XG4gIH1cbiAgcmV0dXJuIGF1ZGlvLmR1cmF0aW9uO1xufVxuXG4vKipcbiAqIExvYWQgYXVkaW8gZnJvbSBgdXJsYCwgZGVjb2RlIFBDTSBkYXRhLCBhbmQgY29tcHV0ZSBSTVMgcGVha3MgZm9yIGRpc3BsYXlpbmdcbiAqIHRoZSB3YXZlZm9ybS5cbiAqXG4gKiBUaGUgcmVzdWx0cyBhcmUgY2FjaGVkIGluIHRoZSBgd2F2ZWZvcm1DYWNoZWAgd2hpY2ggaXMgc2hhcmVkIGFjcm9zc1xuICogbWVzc2FnZXMgaW4gdGhlIGNvbnZlcnNhdGlvbiBhbmQgcHJvdmlkZWQgYnkgR2xvYmFsQXVkaW9Db250ZXh0LlxuICpcbiAqIFRoZSBjb21wdXRhdGlvbiBoYXBwZW5zIG9mZiB0aGUgcmVuZGVyZXIgdGhyZWFkIGJ5IEF1ZGlvQ29udGV4dCwgYnV0IGl0IGlzXG4gKiBzdGlsbCBxdWl0ZSBleHBlbnNpdmUsIHNvIHdlIGNhY2hlIGl0IGluIHRoZSBgd2F2ZWZvcm1DYWNoZWAgTFJVIGNhY2hlLlxuICovXG5hc3luYyBmdW5jdGlvbiBkb0NvbXB1dGVQZWFrcyhcbiAgdXJsOiBzdHJpbmcsXG4gIGJhckNvdW50OiBudW1iZXJcbik6IFByb21pc2U8Q29tcHV0ZVBlYWtzUmVzdWx0PiB7XG4gIGNvbnN0IGV4aXN0aW5nID0gd2F2ZWZvcm1DYWNoZS5nZXQodXJsKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgbG9nLmluZm8oJ0dsb2JhbEF1ZGlvQ29udGV4dDogd2F2ZWZvcm0gY2FjaGUgaGl0JywgdXJsKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGV4aXN0aW5nKTtcbiAgfVxuXG4gIGxvZy5pbmZvKCdHbG9iYWxBdWRpb0NvbnRleHQ6IHdhdmVmb3JtIGNhY2hlIG1pc3MnLCB1cmwpO1xuXG4gIC8vIExvYWQgYW5kIGRlY29kZSBgdXJsYCBpbnRvIGEgcmF3IFBDTVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG5cbiAgY29uc3QgZHVyYXRpb24gPSBhd2FpdCBnZXRBdWRpb0R1cmF0aW9uKHVybCwgcmF3KTtcblxuICBjb25zdCBwZWFrcyA9IG5ldyBBcnJheShiYXJDb3VudCkuZmlsbCgwKTtcbiAgaWYgKGR1cmF0aW9uID4gTUFYX0FVRElPX0RVUkFUSU9OKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgR2xvYmFsQXVkaW9Db250ZXh0OiBhdWRpbyAke3VybH0gZHVyYXRpb24gJHtkdXJhdGlvbn1zIGlzIHRvbyBsb25nYFxuICAgICk7XG4gICAgY29uc3QgZW1wdHlSZXN1bHQgPSB7IHBlYWtzLCBkdXJhdGlvbiB9O1xuICAgIHdhdmVmb3JtQ2FjaGUuc2V0KHVybCwgZW1wdHlSZXN1bHQpO1xuICAgIHJldHVybiBlbXB0eVJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBhdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHJhdyk7XG5cbiAgLy8gQ29tcHV0ZSBSTVMgcGVha3NcbiAgY29uc3Qgbm9ybXMgPSBuZXcgQXJyYXkoYmFyQ291bnQpLmZpbGwoMCk7XG5cbiAgY29uc3Qgc2FtcGxlc1BlclBlYWsgPSBkYXRhLmxlbmd0aCAvIHBlYWtzLmxlbmd0aDtcbiAgZm9yIChcbiAgICBsZXQgY2hhbm5lbE51bSA9IDA7XG4gICAgY2hhbm5lbE51bSA8IGRhdGEubnVtYmVyT2ZDaGFubmVscztcbiAgICBjaGFubmVsTnVtICs9IDFcbiAgKSB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGRhdGEuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE51bSk7XG5cbiAgICBmb3IgKGxldCBzYW1wbGUgPSAwOyBzYW1wbGUgPCBjaGFubmVsLmxlbmd0aDsgc2FtcGxlICs9IDEpIHtcbiAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHNhbXBsZSAvIHNhbXBsZXNQZXJQZWFrKTtcbiAgICAgIHBlYWtzW2ldICs9IGNoYW5uZWxbc2FtcGxlXSAqKiAyO1xuICAgICAgbm9ybXNbaV0gKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBBdmVyYWdlXG4gIGxldCBtYXggPSAxZS0yMztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwZWFrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHBlYWtzW2ldID0gTWF0aC5zcXJ0KHBlYWtzW2ldIC8gTWF0aC5tYXgoMSwgbm9ybXNbaV0pKTtcbiAgICBtYXggPSBNYXRoLm1heChtYXgsIHBlYWtzW2ldKTtcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBlYWtzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgcGVha3NbaV0gLz0gbWF4O1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0geyBwZWFrcywgZHVyYXRpb24gfTtcbiAgd2F2ZWZvcm1DYWNoZS5zZXQodXJsLCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcHV0ZVBlYWtzKFxuICB1cmw6IHN0cmluZyxcbiAgYmFyQ291bnQ6IG51bWJlclxuKTogUHJvbWlzZTxDb21wdXRlUGVha3NSZXN1bHQ+IHtcbiAgY29uc3QgY29tcHV0ZUtleSA9IGAke3VybH06JHtiYXJDb3VudH1gO1xuXG4gIGNvbnN0IHBlbmRpbmcgPSBpblByb2dyZXNzTWFwLmdldChjb21wdXRlS2V5KTtcbiAgaWYgKHBlbmRpbmcpIHtcbiAgICBsb2cuaW5mbygnR2xvYmFsQXVkaW9Db250ZXh0OiBhbHJlYWR5IGNvbXB1dGluZyBwZWFrcyBmb3InLCBjb21wdXRlS2V5KTtcbiAgICByZXR1cm4gcGVuZGluZztcbiAgfVxuXG4gIGxvZy5pbmZvKCdHbG9iYWxBdWRpb0NvbnRleHQ6IHF1ZXVlIGNvbXB1dGluZyBwZWFrcyBmb3InLCBjb21wdXRlS2V5KTtcbiAgY29uc3QgcHJvbWlzZSA9IGNvbXB1dGVRdWV1ZS5hZGQoKCkgPT4gZG9Db21wdXRlUGVha3ModXJsLCBiYXJDb3VudCkpO1xuXG4gIGluUHJvZ3Jlc3NNYXAuc2V0KGNvbXB1dGVLZXksIHByb21pc2UpO1xuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBwcm9taXNlO1xuICB9IGZpbmFsbHkge1xuICAgIGluUHJvZ3Jlc3NNYXAuZGVsZXRlKGNvbXB1dGVLZXkpO1xuICB9XG59XG5cbmNvbnN0IGdsb2JhbENvbnRlbnRzOiBDb250ZW50cyA9IHtcbiAgYXVkaW86IG5ldyBBdWRpbygpLFxuICBjb21wdXRlUGVha3MsXG59O1xuXG5leHBvcnQgY29uc3QgR2xvYmFsQXVkaW9Db250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dDxDb250ZW50cz4oZ2xvYmFsQ29udGVudHMpO1xuXG5leHBvcnQgdHlwZSBHbG9iYWxBdWRpb1Byb3BzID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpc1BhdXNlZDogYm9vbGVhbjtcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGUgfCBSZWFjdC5SZWFjdENoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBBIGdsb2JhbCBjb250ZXh0IHRoYXQgaG9sZHMgQXVkaW8sIEF1ZGlvQ29udGV4dCwgTFJVIGluc3RhbmNlcyB0aGF0IGFyZSB1c2VkXG4gKiBpbnNpZGUgdGhlIGNvbnZlcnNhdGlvbiBieSB0cy9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9NZXNzYWdlQXVkaW8udHN4XG4gKi9cbmV4cG9ydCBjb25zdCBHbG9iYWxBdWRpb1Byb3ZpZGVyOiBSZWFjdC5GQzxHbG9iYWxBdWRpb1Byb3BzPiA9ICh7XG4gIGNvbnZlcnNhdGlvbklkLFxuICBpc1BhdXNlZCxcbiAgY2hpbGRyZW4sXG59KSA9PiB7XG4gIC8vIFdoZW4gbW92aW5nIGJldHdlZW4gY29udmVyc2F0aW9ucyAtIHN0b3AgYXVkaW9cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZ2xvYmFsQ29udGVudHMuYXVkaW8ucGF1c2UoKTtcbiAgICB9O1xuICB9LCBbY29udmVyc2F0aW9uSWRdKTtcblxuICAvLyBQYXVzZSB3aGVuIHJlcXVlc3RlZCBieSBwYXJlbnRcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNQYXVzZWQpIHtcbiAgICAgIGdsb2JhbENvbnRlbnRzLmF1ZGlvLnBhdXNlKCk7XG4gICAgfVxuICB9LCBbaXNQYXVzZWRdKTtcblxuICByZXR1cm4gKFxuICAgIDxHbG9iYWxBdWRpb0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2dsb2JhbENvbnRlbnRzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0dsb2JhbEF1ZGlvQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHFCQUFtQjtBQUNuQix1QkFBZ0I7QUFHaEIsVUFBcUI7QUFFckIsTUFBTSxxQkFBcUI7QUFDM0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSxxQkFBcUIsS0FBSztBQWlCaEMsTUFBTSxlQUFlLElBQUksYUFBYTtBQUN0QyxhQUFhLFFBQVE7QUFFckIsTUFBTSxnQkFBK0IsSUFBSSx5QkFBSTtBQUFBLEVBQzNDLEtBQUs7QUFDUCxDQUFDO0FBRUQsTUFBTSxnQkFBZ0Isb0JBQUksSUFBeUM7QUFDbkUsTUFBTSxlQUFlLElBQUksdUJBQU87QUFBQSxFQUM5QixhQUFhO0FBQ2Ys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
