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
var audioPlayer_exports = {};
__export(audioPlayer_exports, {
  isPaused: () => isPaused
});
module.exports = __toCommonJS(audioPlayer_exports);
const isPaused = /* @__PURE__ */ __name((state) => {
  return state.audioPlayer.activeAudioID === void 0;
}, "isPaused");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isPaused
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9QbGF5ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuZXhwb3J0IGNvbnN0IGlzUGF1c2VkID0gKHN0YXRlOiBTdGF0ZVR5cGUpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHN0YXRlLmF1ZGlvUGxheWVyLmFjdGl2ZUF1ZGlvSUQgPT09IHVuZGVmaW5lZDtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS08sTUFBTSxXQUFXLHdCQUFDLFVBQThCO0FBQ3JELFNBQU8sTUFBTSxZQUFZLGtCQUFrQjtBQUM3QyxHQUZ3QjsiLAogICJuYW1lcyI6IFtdCn0K
