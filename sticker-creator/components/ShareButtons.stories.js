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
var ShareButtons_stories_exports = {};
__export(ShareButtons_stories_exports, {
  _ShareButtons: () => _ShareButtons,
  default: () => ShareButtons_stories_default
});
module.exports = __toCommonJS(ShareButtons_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("../elements/StoryRow");
var import_ShareButtons = require("./ShareButtons");
var ShareButtons_stories_default = {
  title: "Sticker Creator/components"
};
const _ShareButtons = /* @__PURE__ */ __name(() => {
  const value = (0, import_addon_knobs.text)("value", "https://signal.org");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_ShareButtons.ShareButtons, {
    value
  }));
}, "_ShareButtons");
_ShareButtons.story = {
  name: "ShareButtons"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ShareButtons
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hhcmVCdXR0b25zLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4uL2VsZW1lbnRzL1N0b3J5Um93JztcbmltcG9ydCB7IFNoYXJlQnV0dG9ucyB9IGZyb20gJy4vU2hhcmVCdXR0b25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ1N0aWNrZXIgQ3JlYXRvci9jb21wb25lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfU2hhcmVCdXR0b25zID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgdmFsdWUgPSB0ZXh0KCd2YWx1ZScsICdodHRwczovL3NpZ25hbC5vcmcnKTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeVJvdz5cbiAgICAgIDxTaGFyZUJ1dHRvbnMgdmFsdWU9e3ZhbHVlfSAvPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5fU2hhcmVCdXR0b25zLnN0b3J5ID0ge1xuICBuYW1lOiAnU2hhcmVCdXR0b25zJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFFckIsc0JBQXlCO0FBQ3pCLDBCQUE2QjtBQUU3QixJQUFPLCtCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsUUFBTSxRQUFRLDZCQUFLLFNBQVMsb0JBQW9CO0FBRWhELFNBQ0Usb0NBQUMsZ0NBQ0Msb0NBQUM7QUFBQSxJQUFhO0FBQUEsR0FBYyxDQUM5QjtBQUVKLEdBUjZCO0FBVTdCLGNBQWMsUUFBUTtBQUFBLEVBQ3BCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
