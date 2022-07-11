var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var truncateAudioLevel_exports = {};
__export(truncateAudioLevel_exports, {
  truncateAudioLevel: () => truncateAudioLevel
});
module.exports = __toCommonJS(truncateAudioLevel_exports);
const LOWEST = 500 / 32767;
const LOW = 1e3 / 32767;
const MEDIUM = 5e3 / 32767;
const HIGH = 16e3 / 32767;
function truncateAudioLevel(audioLevel) {
  if (audioLevel < LOWEST) {
    return 0;
  }
  if (audioLevel < LOW) {
    return 0.25;
  }
  if (audioLevel < MEDIUM) {
    return 0.5;
  }
  if (audioLevel < HIGH) {
    return 0.75;
  }
  return 1;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  truncateAudioLevel
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHJ1bmNhdGVBdWRpb0xldmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1BbmRyb2lkL2Jsb2IvYjUyN2IyZmZiOTRmYjgyYTc1MDhjM2IzM2RkYmZmZWYyODA4NTM0OS9hcHAvc3JjL21haW4vamF2YS9vcmcvdGhvdWdodGNyaW1lL3NlY3VyZXNtcy9ldmVudHMvQ2FsbFBhcnRpY2lwYW50Lmt0I0w4Ny1MMTAwXG5jb25zdCBMT1dFU1QgPSA1MDAgLyAzMjc2NztcbmNvbnN0IExPVyA9IDEwMDAgLyAzMjc2NztcbmNvbnN0IE1FRElVTSA9IDUwMDAgLyAzMjc2NztcbmNvbnN0IEhJR0ggPSAxNjAwMCAvIDMyNzY3O1xuXG5leHBvcnQgZnVuY3Rpb24gdHJ1bmNhdGVBdWRpb0xldmVsKGF1ZGlvTGV2ZWw6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChhdWRpb0xldmVsIDwgTE9XRVNUKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKGF1ZGlvTGV2ZWwgPCBMT1cpIHtcbiAgICByZXR1cm4gMC4yNTtcbiAgfVxuICBpZiAoYXVkaW9MZXZlbCA8IE1FRElVTSkge1xuICAgIHJldHVybiAwLjU7XG4gIH1cbiAgaWYgKGF1ZGlvTGV2ZWwgPCBISUdIKSB7XG4gICAgcmV0dXJuIDAuNzU7XG4gIH1cbiAgcmV0dXJuIDE7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsTUFBTSxTQUFTLE1BQU07QUFDckIsTUFBTSxNQUFNLE1BQU87QUFDbkIsTUFBTSxTQUFTLE1BQU87QUFDdEIsTUFBTSxPQUFPLE9BQVE7QUFFZCw0QkFBNEIsWUFBNEI7QUFDN0QsTUFBSSxhQUFhLFFBQVE7QUFDdkIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLGFBQWEsS0FBSztBQUNwQixXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksYUFBYSxRQUFRO0FBQ3ZCLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxhQUFhLE1BQU07QUFDckIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPO0FBQ1Q7QUFkZ0IiLAogICJuYW1lcyI6IFtdCn0K
