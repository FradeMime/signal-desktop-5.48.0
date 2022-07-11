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
var TypingAnimation_exports = {};
__export(TypingAnimation_exports, {
  TypingAnimation: () => TypingAnimation
});
module.exports = __toCommonJS(TypingAnimation_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const TypingAnimation = /* @__PURE__ */ __name(({ i18n, color }) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-typing-animation",
  title: i18n("typingAlt")
}, /* @__PURE__ */ import_react.default.createElement("div", {
  className: (0, import_classnames.default)("module-typing-animation__dot", "module-typing-animation__dot--first", color ? `module-typing-animation__dot--${color}` : null)
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-typing-animation__spacer"
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: (0, import_classnames.default)("module-typing-animation__dot", "module-typing-animation__dot--second", color ? `module-typing-animation__dot--${color}` : null)
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-typing-animation__spacer"
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: (0, import_classnames.default)("module-typing-animation__dot", "module-typing-animation__dot--third", color ? `module-typing-animation__dot--${color}` : null)
})), "TypingAnimation");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypingAnimation
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwaW5nQW5pbWF0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBjb2xvcj86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBUeXBpbmdBbmltYXRpb24gPSAoeyBpMThuLCBjb2xvciB9OiBQcm9wcyk6IEpTWC5FbGVtZW50ID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtdHlwaW5nLWFuaW1hdGlvblwiIHRpdGxlPXtpMThuKCd0eXBpbmdBbHQnKX0+XG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAnbW9kdWxlLXR5cGluZy1hbmltYXRpb25fX2RvdCcsXG4gICAgICAgICdtb2R1bGUtdHlwaW5nLWFuaW1hdGlvbl9fZG90LS1maXJzdCcsXG4gICAgICAgIGNvbG9yID8gYG1vZHVsZS10eXBpbmctYW5pbWF0aW9uX19kb3QtLSR7Y29sb3J9YCA6IG51bGxcbiAgICAgICl9XG4gICAgLz5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS10eXBpbmctYW5pbWF0aW9uX19zcGFjZXJcIiAvPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgJ21vZHVsZS10eXBpbmctYW5pbWF0aW9uX19kb3QnLFxuICAgICAgICAnbW9kdWxlLXR5cGluZy1hbmltYXRpb25fX2RvdC0tc2Vjb25kJyxcbiAgICAgICAgY29sb3IgPyBgbW9kdWxlLXR5cGluZy1hbmltYXRpb25fX2RvdC0tJHtjb2xvcn1gIDogbnVsbFxuICAgICAgKX1cbiAgICAvPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXR5cGluZy1hbmltYXRpb25fX3NwYWNlclwiIC8+XG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAnbW9kdWxlLXR5cGluZy1hbmltYXRpb25fX2RvdCcsXG4gICAgICAgICdtb2R1bGUtdHlwaW5nLWFuaW1hdGlvbl9fZG90LS10aGlyZCcsXG4gICAgICAgIGNvbG9yID8gYG1vZHVsZS10eXBpbmctYW5pbWF0aW9uX19kb3QtLSR7Y29sb3J9YCA6IG51bGxcbiAgICAgICl9XG4gICAgLz5cbiAgPC9kaXY+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFTaEIsTUFBTSxrQkFBa0Isd0JBQUMsRUFBRSxNQUFNLFlBQ3RDLG1EQUFDO0FBQUEsRUFBSSxXQUFVO0FBQUEsRUFBMEIsT0FBTyxLQUFLLFdBQVc7QUFBQSxHQUM5RCxtREFBQztBQUFBLEVBQ0MsV0FBVywrQkFDVCxnQ0FDQSx1Q0FDQSxRQUFRLGlDQUFpQyxVQUFVLElBQ3JEO0FBQUEsQ0FDRixHQUNBLG1EQUFDO0FBQUEsRUFBSSxXQUFVO0FBQUEsQ0FBa0MsR0FDakQsbURBQUM7QUFBQSxFQUNDLFdBQVcsK0JBQ1QsZ0NBQ0Esd0NBQ0EsUUFBUSxpQ0FBaUMsVUFBVSxJQUNyRDtBQUFBLENBQ0YsR0FDQSxtREFBQztBQUFBLEVBQUksV0FBVTtBQUFBLENBQWtDLEdBQ2pELG1EQUFDO0FBQUEsRUFDQyxXQUFXLCtCQUNULGdDQUNBLHVDQUNBLFFBQVEsaUNBQWlDLFVBQVUsSUFDckQ7QUFBQSxDQUNGLENBQ0YsR0F6QjZCOyIsCiAgIm5hbWVzIjogW10KfQo=
