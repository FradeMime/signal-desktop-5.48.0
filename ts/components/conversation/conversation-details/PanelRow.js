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
var PanelRow_exports = {};
__export(PanelRow_exports, {
  PanelRow: () => PanelRow
});
module.exports = __toCommonJS(PanelRow_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_util = require("./util");
const bem = (0, import_util.bemGenerator)("ConversationDetails-panel-row");
const PanelRow = import_react.default.forwardRef(({
  alwaysShowActions,
  className,
  disabled,
  icon,
  label,
  info,
  right,
  actions,
  onClick
}, ref) => {
  const content = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, icon !== void 0 ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("icon")
  }, icon) : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("label")
  }, /* @__PURE__ */ import_react.default.createElement("div", null, label), info !== void 0 ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("info")
  }, info) : null), right !== void 0 ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("right")
  }, right) : null, actions !== void 0 ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: alwaysShowActions ? "" : bem("actions")
  }, actions) : null);
  if (onClick) {
    return /* @__PURE__ */ import_react.default.createElement("button", {
      disabled,
      type: "button",
      className: (0, import_classnames.default)(bem("root", "button"), className),
      onClick,
      ref
    }, content);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(bem("root"), className)
  }, content);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PanelRow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGFuZWxSb3cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGJlbUdlbmVyYXRvciB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBhbHdheXNTaG93QWN0aW9ucz86IGJvb2xlYW47XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICBsYWJlbDogc3RyaW5nIHwgUmVhY3QuUmVhY3ROb2RlO1xuICBpbmZvPzogc3RyaW5nO1xuICByaWdodD86IHN0cmluZyB8IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYWN0aW9ucz86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBiZW0gPSBiZW1HZW5lcmF0b3IoJ0NvbnZlcnNhdGlvbkRldGFpbHMtcGFuZWwtcm93Jyk7XG5cbmV4cG9ydCBjb25zdCBQYW5lbFJvdyA9IFJlYWN0LmZvcndhcmRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQsIFByb3BzPihcbiAgKFxuICAgIHtcbiAgICAgIGFsd2F5c1Nob3dBY3Rpb25zLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBpY29uLFxuICAgICAgbGFiZWwsXG4gICAgICBpbmZvLFxuICAgICAgcmlnaHQsXG4gICAgICBhY3Rpb25zLFxuICAgICAgb25DbGljayxcbiAgICB9OiBQcm9wcyxcbiAgICByZWY6IFJlYWN0LlJlZjxIVE1MQnV0dG9uRWxlbWVudD5cbiAgKSA9PiB7XG4gICAgY29uc3QgY29udGVudCA9IChcbiAgICAgIDw+XG4gICAgICAgIHtpY29uICE9PSB1bmRlZmluZWQgPyA8ZGl2IGNsYXNzTmFtZT17YmVtKCdpY29uJyl9PntpY29ufTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtiZW0oJ2xhYmVsJyl9PlxuICAgICAgICAgIDxkaXY+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgIHtpbmZvICE9PSB1bmRlZmluZWQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YmVtKCdpbmZvJyl9PntpbmZvfTwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3JpZ2h0ICE9PSB1bmRlZmluZWQgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2JlbSgncmlnaHQnKX0+e3JpZ2h0fTwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2FjdGlvbnMgIT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YWx3YXlzU2hvd0FjdGlvbnMgPyAnJyA6IGJlbSgnYWN0aW9ucycpfT5cbiAgICAgICAgICAgIHthY3Rpb25zfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvPlxuICAgICk7XG5cbiAgICBpZiAob25DbGljaykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoYmVtKCdyb290JywgJ2J1dHRvbicpLCBjbGFzc05hbWUpfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgID5cbiAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhiZW0oJ3Jvb3QnKSwgY2xhc3NOYW1lKX0+e2NvbnRlbnR9PC9kaXY+O1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHdCQUF1QjtBQUN2QixrQkFBNkI7QUFjN0IsTUFBTSxNQUFNLDhCQUFhLCtCQUErQjtBQUVqRCxNQUFNLFdBQVcscUJBQU0sV0FDNUIsQ0FDRTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBRUYsUUFDRztBQUNILFFBQU0sVUFDSix3RkFDRyxTQUFTLFNBQVksbURBQUM7QUFBQSxJQUFJLFdBQVcsSUFBSSxNQUFNO0FBQUEsS0FBSSxJQUFLLElBQVMsTUFDbEUsbURBQUM7QUFBQSxJQUFJLFdBQVcsSUFBSSxPQUFPO0FBQUEsS0FDekIsbURBQUMsYUFBSyxLQUFNLEdBQ1gsU0FBUyxTQUNSLG1EQUFDO0FBQUEsSUFBSSxXQUFXLElBQUksTUFBTTtBQUFBLEtBQUksSUFBSyxJQUNqQyxJQUNOLEdBQ0MsVUFBVSxTQUNULG1EQUFDO0FBQUEsSUFBSSxXQUFXLElBQUksT0FBTztBQUFBLEtBQUksS0FBTSxJQUNuQyxNQUNILFlBQVksU0FDWCxtREFBQztBQUFBLElBQUksV0FBVyxvQkFBb0IsS0FBSyxJQUFJLFNBQVM7QUFBQSxLQUNuRCxPQUNILElBQ0UsSUFDTjtBQUdGLE1BQUksU0FBUztBQUNYLFdBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxNQUFLO0FBQUEsTUFDTCxXQUFXLCtCQUFXLElBQUksUUFBUSxRQUFRLEdBQUcsU0FBUztBQUFBLE1BQ3REO0FBQUEsTUFDQTtBQUFBLE9BRUMsT0FDSDtBQUFBLEVBRUo7QUFFQSxTQUFPLG1EQUFDO0FBQUEsSUFBSSxXQUFXLCtCQUFXLElBQUksTUFBTSxHQUFHLFNBQVM7QUFBQSxLQUFJLE9BQVE7QUFDdEUsQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
