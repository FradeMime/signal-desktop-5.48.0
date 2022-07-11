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
var CallingAudioIndicator_stories_exports = {};
__export(CallingAudioIndicator_stories_exports, {
  Extreme: () => Extreme,
  Random: () => Random,
  default: () => CallingAudioIndicator_stories_default
});
module.exports = __toCommonJS(CallingAudioIndicator_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_CallingAudioIndicator = require("./CallingAudioIndicator");
var import_constants = require("../calling/constants");
var CallingAudioIndicator_stories_default = {
  title: "Components/CallingAudioIndicator"
};
const Extreme = /* @__PURE__ */ __name(() => {
  const [audioLevel, setAudioLevel] = (0, import_react.useState)(1);
  (0, import_react.useEffect)(() => {
    const timer = setTimeout(() => {
      setAudioLevel(1 - audioLevel);
    }, 2 * import_constants.AUDIO_LEVEL_INTERVAL_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [audioLevel, setAudioLevel]);
  return /* @__PURE__ */ import_react.default.createElement(import_CallingAudioIndicator.CallingAudioIndicator, {
    hasAudio: (0, import_addon_knobs.boolean)("hasAudio", true),
    audioLevel
  });
}, "Extreme");
const Random = /* @__PURE__ */ __name(() => {
  const [audioLevel, setAudioLevel] = (0, import_react.useState)(1);
  (0, import_react.useEffect)(() => {
    const timer = setTimeout(() => {
      setAudioLevel(Math.random());
    }, import_constants.AUDIO_LEVEL_INTERVAL_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [audioLevel, setAudioLevel]);
  return /* @__PURE__ */ import_react.default.createElement(import_CallingAudioIndicator.CallingAudioIndicator, {
    hasAudio: (0, import_addon_knobs.boolean)("hasAudio", true),
    audioLevel
  });
}, "Random");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Extreme,
  Random
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0F1ZGlvSW5kaWNhdG9yLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBDYWxsaW5nQXVkaW9JbmRpY2F0b3IgfSBmcm9tICcuL0NhbGxpbmdBdWRpb0luZGljYXRvcic7XG5pbXBvcnQgeyBBVURJT19MRVZFTF9JTlRFUlZBTF9NUyB9IGZyb20gJy4uL2NhbGxpbmcvY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ2FsbGluZ0F1ZGlvSW5kaWNhdG9yJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFeHRyZW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW2F1ZGlvTGV2ZWwsIHNldEF1ZGlvTGV2ZWxdID0gdXNlU3RhdGUoMSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0QXVkaW9MZXZlbCgxIC0gYXVkaW9MZXZlbCk7XG4gICAgfSwgMiAqIEFVRElPX0xFVkVMX0lOVEVSVkFMX01TKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH07XG4gIH0sIFthdWRpb0xldmVsLCBzZXRBdWRpb0xldmVsXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q2FsbGluZ0F1ZGlvSW5kaWNhdG9yXG4gICAgICBoYXNBdWRpbz17Ym9vbGVhbignaGFzQXVkaW8nLCB0cnVlKX1cbiAgICAgIGF1ZGlvTGV2ZWw9e2F1ZGlvTGV2ZWx9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBSYW5kb20gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbYXVkaW9MZXZlbCwgc2V0QXVkaW9MZXZlbF0gPSB1c2VTdGF0ZSgxKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRBdWRpb0xldmVsKE1hdGgucmFuZG9tKCkpO1xuICAgIH0sIEFVRElPX0xFVkVMX0lOVEVSVkFMX01TKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH07XG4gIH0sIFthdWRpb0xldmVsLCBzZXRBdWRpb0xldmVsXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q2FsbGluZ0F1ZGlvSW5kaWNhdG9yXG4gICAgICBoYXNBdWRpbz17Ym9vbGVhbignaGFzQXVkaW8nLCB0cnVlKX1cbiAgICAgIGF1ZGlvTGV2ZWw9e2F1ZGlvTGV2ZWx9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUEyQztBQUMzQyx5QkFBd0I7QUFFeEIsbUNBQXNDO0FBQ3RDLHVCQUF3QztBQUV4QyxJQUFPLHdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFFBQU0sQ0FBQyxZQUFZLGlCQUFpQiwyQkFBUyxDQUFDO0FBRTlDLDhCQUFVLE1BQU07QUFDZCxVQUFNLFFBQVEsV0FBVyxNQUFNO0FBQzdCLG9CQUFjLElBQUksVUFBVTtBQUFBLElBQzlCLEdBQUcsSUFBSSx3Q0FBdUI7QUFFOUIsV0FBTyxNQUFNO0FBQ1gsbUJBQWEsS0FBSztBQUFBLElBQ3BCO0FBQUEsRUFDRixHQUFHLENBQUMsWUFBWSxhQUFhLENBQUM7QUFFOUIsU0FDRSxtREFBQztBQUFBLElBQ0MsVUFBVSxnQ0FBUSxZQUFZLElBQUk7QUFBQSxJQUNsQztBQUFBLEdBQ0Y7QUFFSixHQW5CdUI7QUFxQmhCLE1BQU0sU0FBUyw2QkFBbUI7QUFDdkMsUUFBTSxDQUFDLFlBQVksaUJBQWlCLDJCQUFTLENBQUM7QUFFOUMsOEJBQVUsTUFBTTtBQUNkLFVBQU0sUUFBUSxXQUFXLE1BQU07QUFDN0Isb0JBQWMsS0FBSyxPQUFPLENBQUM7QUFBQSxJQUM3QixHQUFHLHdDQUF1QjtBQUUxQixXQUFPLE1BQU07QUFDWCxtQkFBYSxLQUFLO0FBQUEsSUFDcEI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxZQUFZLGFBQWEsQ0FBQztBQUU5QixTQUNFLG1EQUFDO0FBQUEsSUFDQyxVQUFVLGdDQUFRLFlBQVksSUFBSTtBQUFBLElBQ2xDO0FBQUEsR0FDRjtBQUVKLEdBbkJzQjsiLAogICJuYW1lcyI6IFtdCn0K
