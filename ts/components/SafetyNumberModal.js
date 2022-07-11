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
var SafetyNumberModal_exports = {};
__export(SafetyNumberModal_exports, {
  SafetyNumberModal: () => SafetyNumberModal
});
module.exports = __toCommonJS(SafetyNumberModal_exports);
var import_react = __toESM(require("react"));
var import_Modal = require("./Modal");
var import_SafetyNumberViewer = require("./SafetyNumberViewer");
const SafetyNumberModal = /* @__PURE__ */ __name(({
  i18n,
  toggleSafetyNumberModal,
  ...safetyNumberViewerProps
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    i18n,
    moduleClassName: "module-SafetyNumberViewer__modal",
    onClose: toggleSafetyNumberModal,
    title: i18n("SafetyNumberModal__title")
  }, /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    i18n,
    onClose: toggleSafetyNumberModal,
    ...safetyNumberViewerProps
  }));
}, "SafetyNumberModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SafetyNumberModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgU2FmZXR5TnVtYmVyVmlld2VyUHJvcHNUeXBlIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJWaWV3ZXInO1xuaW1wb3J0IHsgU2FmZXR5TnVtYmVyVmlld2VyIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJWaWV3ZXInO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgdG9nZ2xlU2FmZXR5TnVtYmVyTW9kYWw6ICgpID0+IHVua25vd247XG59ICYgT21pdDxTYWZldHlOdW1iZXJWaWV3ZXJQcm9wc1R5cGUsICdvbkNsb3NlJz47XG5cbmV4cG9ydCBjb25zdCBTYWZldHlOdW1iZXJNb2RhbCA9ICh7XG4gIGkxOG4sXG4gIHRvZ2dsZVNhZmV0eU51bWJlck1vZGFsLFxuICAuLi5zYWZldHlOdW1iZXJWaWV3ZXJQcm9wc1xufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIGhhc1hCdXR0b25cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBtb2R1bGVDbGFzc05hbWU9XCJtb2R1bGUtU2FmZXR5TnVtYmVyVmlld2VyX19tb2RhbFwiXG4gICAgICBvbkNsb3NlPXt0b2dnbGVTYWZldHlOdW1iZXJNb2RhbH1cbiAgICAgIHRpdGxlPXtpMThuKCdTYWZldHlOdW1iZXJNb2RhbF9fdGl0bGUnKX1cbiAgICA+XG4gICAgICA8U2FmZXR5TnVtYmVyVmlld2VyXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2xvc2U9e3RvZ2dsZVNhZmV0eU51bWJlck1vZGFsfVxuICAgICAgICB7Li4uc2FmZXR5TnVtYmVyVmlld2VyUHJvcHN9XG4gICAgICAvPlxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQixtQkFBc0I7QUFFdEIsZ0NBQW1DO0FBTTVCLE1BQU0sb0JBQW9CLHdCQUFDO0FBQUEsRUFDaEM7QUFBQSxFQUNBO0FBQUEsS0FDRztBQUFBLE1BQ2dDO0FBQ25DLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFlBQVU7QUFBQSxJQUNWO0FBQUEsSUFDQSxpQkFBZ0I7QUFBQSxJQUNoQixTQUFTO0FBQUEsSUFDVCxPQUFPLEtBQUssMEJBQTBCO0FBQUEsS0FFdEMsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxTQUFTO0FBQUEsT0FDTDtBQUFBLEdBQ04sQ0FDRjtBQUVKLEdBcEJpQzsiLAogICJuYW1lcyI6IFtdCn0K
