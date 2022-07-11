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
var Toast_stories_exports = {};
__export(Toast_stories_exports, {
  _Toast: () => _Toast,
  default: () => Toast_stories_default
});
module.exports = __toCommonJS(Toast_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_StoryRow = require("./StoryRow");
var import_Toast = require("./Toast");
var Toast_stories_default = {
  title: "Sticker Creator/elements"
};
const _Toast = /* @__PURE__ */ __name(() => {
  const child = (0, import_addon_knobs.text)("text", "foo bar");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_Toast.Toast, {
    onClick: (0, import_addon_actions.action)("click")
  }, child));
}, "_Toast");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _Toast
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3Quc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4vU3RvcnlSb3cnO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL1RvYXN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ1N0aWNrZXIgQ3JlYXRvci9lbGVtZW50cycsXG59O1xuXG5leHBvcnQgY29uc3QgX1RvYXN0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2hpbGQgPSB0ZXh0KCd0ZXh0JywgJ2ZvbyBiYXInKTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeVJvdz5cbiAgICAgIDxUb2FzdCBvbkNsaWNrPXthY3Rpb24oJ2NsaWNrJyl9PntjaGlsZH08L1RvYXN0PlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXFCO0FBQ3JCLDJCQUF1QjtBQUV2QixzQkFBeUI7QUFDekIsbUJBQXNCO0FBRXRCLElBQU8sd0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sU0FBUyw2QkFBbUI7QUFDdkMsUUFBTSxRQUFRLDZCQUFLLFFBQVEsU0FBUztBQUVwQyxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDO0FBQUEsSUFBTSxTQUFTLGlDQUFPLE9BQU87QUFBQSxLQUFJLEtBQU0sQ0FDMUM7QUFFSixHQVJzQjsiLAogICJuYW1lcyI6IFtdCn0K
