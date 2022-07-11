var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var expireTimers_exports = {};
__export(expireTimers_exports, {
  EXPIRE_TIMERS: () => EXPIRE_TIMERS
});
module.exports = __toCommonJS(expireTimers_exports);
var durations = __toESM(require("../../util/durations"));
const EXPIRE_TIMERS = [
  { value: 42 * durations.SECOND, label: "42 seconds" },
  { value: 5 * durations.MINUTE, label: "5 minutes" },
  { value: 1 * durations.HOUR, label: "1 hour" },
  { value: 6 * durations.DAY, label: "6 days" },
  { value: 3 * durations.WEEK, label: "3 weeks" }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EXPIRE_TIMERS
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwaXJlVGltZXJzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFRlc3RFeHBpcmVUaW1lciA9IFJlYWRvbmx5PHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9PjtcblxuZXhwb3J0IGNvbnN0IEVYUElSRV9USU1FUlM6IFJlYWRvbmx5QXJyYXk8VGVzdEV4cGlyZVRpbWVyPiA9IFtcbiAgeyB2YWx1ZTogNDIgKiBkdXJhdGlvbnMuU0VDT05ELCBsYWJlbDogJzQyIHNlY29uZHMnIH0sXG4gIHsgdmFsdWU6IDUgKiBkdXJhdGlvbnMuTUlOVVRFLCBsYWJlbDogJzUgbWludXRlcycgfSxcbiAgeyB2YWx1ZTogMSAqIGR1cmF0aW9ucy5IT1VSLCBsYWJlbDogJzEgaG91cicgfSxcbiAgeyB2YWx1ZTogNiAqIGR1cmF0aW9ucy5EQVksIGxhYmVsOiAnNiBkYXlzJyB9LFxuICB7IHZhbHVlOiAzICogZHVyYXRpb25zLldFRUssIGxhYmVsOiAnMyB3ZWVrcycgfSxcbl07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxnQkFBMkI7QUFJcEIsTUFBTSxnQkFBZ0Q7QUFBQSxFQUMzRCxFQUFFLE9BQU8sS0FBSyxVQUFVLFFBQVEsT0FBTyxhQUFhO0FBQUEsRUFDcEQsRUFBRSxPQUFPLElBQUksVUFBVSxRQUFRLE9BQU8sWUFBWTtBQUFBLEVBQ2xELEVBQUUsT0FBTyxJQUFJLFVBQVUsTUFBTSxPQUFPLFNBQVM7QUFBQSxFQUM3QyxFQUFFLE9BQU8sSUFBSSxVQUFVLEtBQUssT0FBTyxTQUFTO0FBQUEsRUFDNUMsRUFBRSxPQUFPLElBQUksVUFBVSxNQUFNLE9BQU8sVUFBVTtBQUNoRDsiLAogICJuYW1lcyI6IFtdCn0K
