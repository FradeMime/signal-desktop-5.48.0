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
var CaptchaDialog_stories_exports = {};
__export(CaptchaDialog_stories_exports, {
  _CaptchaDialog: () => _CaptchaDialog,
  default: () => CaptchaDialog_stories_default
});
module.exports = __toCommonJS(CaptchaDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_CaptchaDialog = require("./CaptchaDialog");
var import_Button = require("./Button");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var CaptchaDialog_stories_default = {
  title: "Components/CaptchaDialog"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const _CaptchaDialog = /* @__PURE__ */ __name(() => {
  const [isSkipped, setIsSkipped] = (0, import_react.useState)(false);
  if (isSkipped) {
    return /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: () => setIsSkipped(false)
    }, "Show again");
  }
  return /* @__PURE__ */ import_react.default.createElement(import_CaptchaDialog.CaptchaDialog, {
    i18n,
    isPending: (0, import_addon_knobs.boolean)("isPending", false),
    onContinue: (0, import_addon_actions.action)("onContinue"),
    onSkip: () => setIsSkipped(true)
  });
}, "_CaptchaDialog");
_CaptchaDialog.story = {
  name: "CaptchaDialog"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _CaptchaDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FwdGNoYURpYWxvZy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBDYXB0Y2hhRGlhbG9nIH0gZnJvbSAnLi9DYXB0Y2hhRGlhbG9nJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DYXB0Y2hhRGlhbG9nJyxcbn07XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBjb25zdCBfQ2FwdGNoYURpYWxvZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtpc1NraXBwZWQsIHNldElzU2tpcHBlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgaWYgKGlzU2tpcHBlZCkge1xuICAgIHJldHVybiA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldElzU2tpcHBlZChmYWxzZSl9PlNob3cgYWdhaW48L0J1dHRvbj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDYXB0Y2hhRGlhbG9nXG4gICAgICBpMThuPXtpMThufVxuICAgICAgaXNQZW5kaW5nPXtib29sZWFuKCdpc1BlbmRpbmcnLCBmYWxzZSl9XG4gICAgICBvbkNvbnRpbnVlPXthY3Rpb24oJ29uQ29udGludWUnKX1cbiAgICAgIG9uU2tpcD17KCkgPT4gc2V0SXNTa2lwcGVkKHRydWUpfVxuICAgIC8+XG4gICk7XG59O1xuXG5fQ2FwdGNoYURpYWxvZy5zdG9yeSA9IHtcbiAgbmFtZTogJ0NhcHRjaGFEaWFsb2cnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUNoQywyQkFBdUI7QUFDdkIseUJBQXdCO0FBRXhCLDJCQUE4QjtBQUM5QixvQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixJQUFPLGdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUVoQyxNQUFNLGlCQUFpQiw2QkFBbUI7QUFDL0MsUUFBTSxDQUFDLFdBQVcsZ0JBQWdCLDJCQUFTLEtBQUs7QUFFaEQsTUFBSSxXQUFXO0FBQ2IsV0FBTyxtREFBQztBQUFBLE1BQU8sU0FBUyxNQUFNLGFBQWEsS0FBSztBQUFBLE9BQUcsWUFBVTtBQUFBLEVBQy9EO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLFdBQVcsZ0NBQVEsYUFBYSxLQUFLO0FBQUEsSUFDckMsWUFBWSxpQ0FBTyxZQUFZO0FBQUEsSUFDL0IsUUFBUSxNQUFNLGFBQWEsSUFBSTtBQUFBLEdBQ2pDO0FBRUosR0FmOEI7QUFpQjlCLGVBQWUsUUFBUTtBQUFBLEVBQ3JCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
