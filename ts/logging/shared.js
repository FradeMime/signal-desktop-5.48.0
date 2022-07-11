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
var shared_exports = {};
__export(shared_exports, {
  LogLevel: () => import_Logging.LogLevel,
  cleanArgs: () => cleanArgs,
  getLogLevelString: () => getLogLevelString,
  isFetchLogIpcData: () => isFetchLogIpcData,
  isLogEntry: () => isLogEntry,
  levelMaxLength: () => levelMaxLength
});
module.exports = __toCommonJS(shared_exports);
var import_pino = __toESM(require("pino"));
var import_isRecord = require("../util/isRecord");
var import_privacy = require("../util/privacy");
var import_missingCaseError = require("../util/missingCaseError");
var import_reallyJsonStringify = require("../util/reallyJsonStringify");
var import_Logging = require("../types/Logging");
const isFetchLogIpcData = /* @__PURE__ */ __name((data) => (0, import_isRecord.isRecord)(data) && (0, import_isRecord.isRecord)(data.capabilities) && (0, import_isRecord.isRecord)(data.remoteConfig) && (0, import_isRecord.isRecord)(data.statistics) && (0, import_isRecord.isRecord)(data.user) && Array.isArray(data.logEntries), "isFetchLogIpcData");
const isLogEntry = /* @__PURE__ */ __name((data) => {
  if (!(0, import_isRecord.isRecord)(data)) {
    return false;
  }
  const { level, msg, time } = data;
  if (typeof level !== "number") {
    return false;
  }
  if (!import_Logging.LogLevel[level]) {
    return false;
  }
  if (typeof msg !== "string") {
    return false;
  }
  if (typeof time !== "string") {
    return false;
  }
  return !Number.isNaN(new Date(time).getTime());
}, "isLogEntry");
function getLogLevelString(value) {
  switch (value) {
    case import_Logging.LogLevel.Fatal:
      return "fatal";
    case import_Logging.LogLevel.Error:
      return "error";
    case import_Logging.LogLevel.Warn:
      return "warn";
    case import_Logging.LogLevel.Info:
      return "info";
    case import_Logging.LogLevel.Debug:
      return "debug";
    case import_Logging.LogLevel.Trace:
      return "trace";
    default:
      throw (0, import_missingCaseError.missingCaseError)(value);
  }
}
function cleanArgs(args) {
  return (0, import_privacy.redactAll)(args.map((item) => typeof item === "string" ? item : (0, import_reallyJsonStringify.reallyJsonStringify)(item)).join(" "));
}
const levelFromName = (0, import_pino.default)().levels.values;
const levelMaxLength = Object.keys(levelFromName).reduce((maxLength, level) => Math.max(maxLength, level.length), 0);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LogLevel,
  cleanArgs,
  getLogLevelString,
  isFetchLogIpcData,
  isLogEntry,
  levelMaxLength
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hhcmVkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nO1xuaW1wb3J0IHR5cGUgeyBQcm9jZXNzTWV0cmljIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi91dGlsL2lzUmVjb3JkJztcbmltcG9ydCB7IHJlZGFjdEFsbCB9IGZyb20gJy4uL3V0aWwvcHJpdmFjeSc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IHJlYWxseUpzb25TdHJpbmdpZnkgfSBmcm9tICcuLi91dGlsL3JlYWxseUpzb25TdHJpbmdpZnknO1xuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IHsgTG9nTGV2ZWwgfTtcblxuZXhwb3J0IHR5cGUgRmV0Y2hMb2dJcGNEYXRhID0ge1xuICBjYXBhYmlsaXRpZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICByZW1vdGVDb25maWc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICBzdGF0aXN0aWNzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgdXNlcjogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIGFwcE1ldHJpY3M6IFJlYWRvbmx5QXJyYXk8UHJvY2Vzc01ldHJpYz47XG5cbiAgLy8gV2UgZXhwZWN0IGBsb2dFbnRyaWVzYCB0byBiZSBgQXJyYXk8TG9nRW50cnlUeXBlPmAsIGJ1dCB3ZSBkb24ndCB2YWxpZGF0ZSB0aGF0XG4gIC8vICAgdXBmcm9udFx1MjAxNHdlIG9ubHkgdmFsaWRhdGUgaXQgd2hlbiB3ZSBnbyB0byBsb2cgZWFjaCBsaW5lLiBUaGlzIGltcHJvdmVzIHRoZVxuICAvLyAgIHBlcmZvcm1hbmNlLCBiZWNhdXNlIHdlIGRvbid0IGhhdmUgdG8gaXRlcmF0ZSBvdmVyIGV2ZXJ5IHNpbmdsZSBsb2cgZW50cnkgdHdpY2UuIEl0XG4gIC8vICAgYWxzbyBtZWFucyB3ZSBjYW4gbG9nIGVudHJpZXMgaWYgb25seSBzb21lIG9mIHRoZW0gYXJlIGludmFsaWQuXG4gIGxvZ0VudHJpZXM6IEFycmF5PHVua25vd24+O1xufTtcblxuLy8gV2UgZG9uJ3QgdXNlIFpvZCBoZXJlIGJlY2F1c2UgaXQnZCBiZSBzbG93IHBhcnNpbmcgYWxsIG9mIHRoZSBsb2cgZW50cmllcy5cbi8vICAgVW5mb3J0dW5hdGVseSwgWm9kIGlzIGEgYml0IHNsb3cgZXZlbiB3aXRoIGB6LmFycmF5KHoudW5rbm93bigpKWAuXG5leHBvcnQgY29uc3QgaXNGZXRjaExvZ0lwY0RhdGEgPSAoZGF0YTogdW5rbm93bik6IGRhdGEgaXMgRmV0Y2hMb2dJcGNEYXRhID0+XG4gIGlzUmVjb3JkKGRhdGEpICYmXG4gIGlzUmVjb3JkKGRhdGEuY2FwYWJpbGl0aWVzKSAmJlxuICBpc1JlY29yZChkYXRhLnJlbW90ZUNvbmZpZykgJiZcbiAgaXNSZWNvcmQoZGF0YS5zdGF0aXN0aWNzKSAmJlxuICBpc1JlY29yZChkYXRhLnVzZXIpICYmXG4gIEFycmF5LmlzQXJyYXkoZGF0YS5sb2dFbnRyaWVzKTtcblxuLy8gVGhlc2UgbWF0Y2ggW1Bpbm8ncyBjb3JlIGZpZWxkc11bMV0uXG4vLyBbMV06IGh0dHBzOi8vZ2V0cGluby5pby8jLz9pZD11c2FnZVxuZXhwb3J0IHR5cGUgTG9nRW50cnlUeXBlID0gUmVhZG9ubHk8e1xuICBsZXZlbDogTG9nTGV2ZWw7XG4gIG1zZzogc3RyaW5nO1xuICB0aW1lOiBzdHJpbmc7XG59PjtcblxuLy8gVGhlIGNvZGUgYmVsb3cgaXMgcGVyZm9ybWFuY2Ugc2Vuc2l0aXZlIHNpbmNlIGl0IHJ1bnMgZm9yID4gMTAwayBsb2cgZW50cmllc1xuLy8gd2hlbmV2ZXIgd2Ugd2FudCB0byBzZW5kIHRoZSBkZWJ1ZyBsb2cuIFdlIGNhbid0IHVzZSBgem9kYCBiZWNhdXNlIGl0IGNsb25lc1xuLy8gdGhlIGRhdGEgb24gc3VjY2Vzc2Z1bCBwYXJzZSBhbmQgcnVpbnMgdGhlIHBlcmZvcm1hbmNlLlxuZXhwb3J0IGNvbnN0IGlzTG9nRW50cnkgPSAoZGF0YTogdW5rbm93bik6IGRhdGEgaXMgTG9nRW50cnlUeXBlID0+IHtcbiAgaWYgKCFpc1JlY29yZChkYXRhKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHsgbGV2ZWwsIG1zZywgdGltZSB9ID0gZGF0YSBhcyBQYXJ0aWFsPExvZ0VudHJ5VHlwZT47XG5cbiAgaWYgKHR5cGVvZiBsZXZlbCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIUxvZ0xldmVsW2xldmVsXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbXNnICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGltZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gIU51bWJlci5pc05hTihuZXcgRGF0ZSh0aW1lKS5nZXRUaW1lKCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ0xldmVsU3RyaW5nKHZhbHVlOiBMb2dMZXZlbCk6IHBpbm8uTGV2ZWwge1xuICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgY2FzZSBMb2dMZXZlbC5GYXRhbDpcbiAgICAgIHJldHVybiAnZmF0YWwnO1xuICAgIGNhc2UgTG9nTGV2ZWwuRXJyb3I6XG4gICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICBjYXNlIExvZ0xldmVsLldhcm46XG4gICAgICByZXR1cm4gJ3dhcm4nO1xuICAgIGNhc2UgTG9nTGV2ZWwuSW5mbzpcbiAgICAgIHJldHVybiAnaW5mbyc7XG4gICAgY2FzZSBMb2dMZXZlbC5EZWJ1ZzpcbiAgICAgIHJldHVybiAnZGVidWcnO1xuICAgIGNhc2UgTG9nTGV2ZWwuVHJhY2U6XG4gICAgICByZXR1cm4gJ3RyYWNlJztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuQXJncyhhcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlZGFjdEFsbChcbiAgICBhcmdzXG4gICAgICAubWFwKGl0ZW0gPT5cbiAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSA6IHJlYWxseUpzb25TdHJpbmdpZnkoaXRlbSlcbiAgICAgIClcbiAgICAgIC5qb2luKCcgJylcbiAgKTtcbn1cblxuLy8gVG8gbWFrZSBpdCBlYXNpZXIgdG8gdmlzdWFsbHkgc2NhbiBsb2dzLCB3ZSBtYWtlIGFsbCBsZXZlbHMgdGhlIHNhbWUgbGVuZ3RoXG5jb25zdCBsZXZlbEZyb21OYW1lID0gcGlubygpLmxldmVscy52YWx1ZXM7XG5leHBvcnQgY29uc3QgbGV2ZWxNYXhMZW5ndGg6IG51bWJlciA9IE9iamVjdC5rZXlzKGxldmVsRnJvbU5hbWUpLnJlZHVjZShcbiAgKG1heExlbmd0aCwgbGV2ZWwpID0+IE1hdGgubWF4KG1heExlbmd0aCwgbGV2ZWwubGVuZ3RoKSxcbiAgMFxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQWlCO0FBRWpCLHNCQUF5QjtBQUN6QixxQkFBMEI7QUFDMUIsOEJBQWlDO0FBQ2pDLGlDQUFvQztBQUNwQyxxQkFBeUI7QUFvQmxCLE1BQU0sb0JBQW9CLHdCQUFDLFNBQ2hDLDhCQUFTLElBQUksS0FDYiw4QkFBUyxLQUFLLFlBQVksS0FDMUIsOEJBQVMsS0FBSyxZQUFZLEtBQzFCLDhCQUFTLEtBQUssVUFBVSxLQUN4Qiw4QkFBUyxLQUFLLElBQUksS0FDbEIsTUFBTSxRQUFRLEtBQUssVUFBVSxHQU5FO0FBbUIxQixNQUFNLGFBQWEsd0JBQUMsU0FBd0M7QUFDakUsTUFBSSxDQUFDLDhCQUFTLElBQUksR0FBRztBQUNuQixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxPQUFPLEtBQUssU0FBUztBQUU3QixNQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxDQUFDLHdCQUFTLFFBQVE7QUFDcEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sQ0FBQyxPQUFPLE1BQU0sSUFBSSxLQUFLLElBQUksRUFBRSxRQUFRLENBQUM7QUFDL0MsR0F4QjBCO0FBMEJuQiwyQkFBMkIsT0FBNkI7QUFDN0QsVUFBUTtBQUFBLFNBQ0Qsd0JBQVM7QUFDWixhQUFPO0FBQUEsU0FDSix3QkFBUztBQUNaLGFBQU87QUFBQSxTQUNKLHdCQUFTO0FBQ1osYUFBTztBQUFBLFNBQ0osd0JBQVM7QUFDWixhQUFPO0FBQUEsU0FDSix3QkFBUztBQUNaLGFBQU87QUFBQSxTQUNKLHdCQUFTO0FBQ1osYUFBTztBQUFBO0FBRVAsWUFBTSw4Q0FBaUIsS0FBSztBQUFBO0FBRWxDO0FBakJnQixBQW1CVCxtQkFBbUIsTUFBc0M7QUFDOUQsU0FBTyw4QkFDTCxLQUNHLElBQUksVUFDSCxPQUFPLFNBQVMsV0FBVyxPQUFPLG9EQUFvQixJQUFJLENBQzVELEVBQ0MsS0FBSyxHQUFHLENBQ2I7QUFDRjtBQVJnQixBQVdoQixNQUFNLGdCQUFnQix5QkFBSyxFQUFFLE9BQU87QUFDN0IsTUFBTSxpQkFBeUIsT0FBTyxLQUFLLGFBQWEsRUFBRSxPQUMvRCxDQUFDLFdBQVcsVUFBVSxLQUFLLElBQUksV0FBVyxNQUFNLE1BQU0sR0FDdEQsQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
