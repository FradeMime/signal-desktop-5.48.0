var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var durations_exports = {};
__export(durations_exports, {
  DAY: () => DAY,
  HOUR: () => HOUR,
  MINUTE: () => MINUTE,
  MONTH: () => MONTH,
  SECOND: () => SECOND,
  WEEK: () => WEEK
});
module.exports = __toCommonJS(durations_exports);
const SECOND = 1e3;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DAY,
  HOUR,
  MINUTE,
  MONTH,
  SECOND,
  WEEK
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZHVyYXRpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBjb25zdCBTRUNPTkQgPSAxMDAwO1xuZXhwb3J0IGNvbnN0IE1JTlVURSA9IFNFQ09ORCAqIDYwO1xuZXhwb3J0IGNvbnN0IEhPVVIgPSBNSU5VVEUgKiA2MDtcbmV4cG9ydCBjb25zdCBEQVkgPSBIT1VSICogMjQ7XG5leHBvcnQgY29uc3QgV0VFSyA9IERBWSAqIDc7XG5leHBvcnQgY29uc3QgTU9OVEggPSBEQVkgKiAzMDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyxNQUFNLFNBQVM7QUFDZixNQUFNLFNBQVMsU0FBUztBQUN4QixNQUFNLE9BQU8sU0FBUztBQUN0QixNQUFNLE1BQU0sT0FBTztBQUNuQixNQUFNLE9BQU8sTUFBTTtBQUNuQixNQUFNLFFBQVEsTUFBTTsiLAogICJuYW1lcyI6IFtdCn0K
