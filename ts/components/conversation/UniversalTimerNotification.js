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
var UniversalTimerNotification_exports = {};
__export(UniversalTimerNotification_exports, {
  UniversalTimerNotification: () => UniversalTimerNotification
});
module.exports = __toCommonJS(UniversalTimerNotification_exports);
var import_react = __toESM(require("react"));
var import_SystemMessage = require("./SystemMessage");
var expirationTimer = __toESM(require("../../util/expirationTimer"));
const UniversalTimerNotification = /* @__PURE__ */ __name((props) => {
  const { i18n, expireTimer } = props;
  if (!expireTimer) {
    return null;
  }
  const timeValue = expirationTimer.format(i18n, expireTimer);
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    icon: "timer",
    contents: i18n("UniversalTimerNotification__text", {
      timeValue
    })
  });
}, "UniversalTimerNotification");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniversalTimerNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFN5c3RlbU1lc3NhZ2UgfSBmcm9tICcuL1N5c3RlbU1lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgKiBhcyBleHBpcmF0aW9uVGltZXIgZnJvbSAnLi4vLi4vdXRpbC9leHBpcmF0aW9uVGltZXInO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgZXhwaXJlVGltZXI6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbjogUmVhY3QuRkM8UHJvcHM+ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGkxOG4sIGV4cGlyZVRpbWVyIH0gPSBwcm9wcztcblxuICBpZiAoIWV4cGlyZVRpbWVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB0aW1lVmFsdWUgPSBleHBpcmF0aW9uVGltZXIuZm9ybWF0KGkxOG4sIGV4cGlyZVRpbWVyKTtcblxuICByZXR1cm4gKFxuICAgIDxTeXN0ZW1NZXNzYWdlXG4gICAgICBpY29uPVwidGltZXJcIlxuICAgICAgY29udGVudHM9e2kxOG4oJ1VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uX190ZXh0Jywge1xuICAgICAgICB0aW1lVmFsdWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsMkJBQThCO0FBRTlCLHNCQUFpQztBQU8xQixNQUFNLDZCQUE4QyxrQ0FBUztBQUNsRSxRQUFNLEVBQUUsTUFBTSxnQkFBZ0I7QUFFOUIsTUFBSSxDQUFDLGFBQWE7QUFDaEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFlBQVksZ0JBQWdCLE9BQU8sTUFBTSxXQUFXO0FBRTFELFNBQ0UsbURBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFVBQVUsS0FBSyxvQ0FBb0M7QUFBQSxNQUNqRDtBQUFBLElBQ0YsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQWpCMkQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
