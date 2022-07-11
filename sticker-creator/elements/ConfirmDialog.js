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
var ConfirmDialog_exports = {};
__export(ConfirmDialog_exports, {
  ConfirmDialog: () => ConfirmDialog
});
module.exports = __toCommonJS(ConfirmDialog_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./ConfirmDialog.scss"));
var import_i18n = require("../util/i18n");
const ConfirmDialog = /* @__PURE__ */ __name(({
  title,
  children,
  confirm,
  cancel,
  onConfirm,
  onCancel
}) => {
  const i18n = (0, import_i18n.useI18n)();
  const cancelText = cancel || i18n("StickerCreator--ConfirmDialog--cancel");
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.base
  }, /* @__PURE__ */ React.createElement("h1", {
    className: styles.title
  }, title), /* @__PURE__ */ React.createElement("p", {
    className: styles.text
  }, children), /* @__PURE__ */ React.createElement("div", {
    className: styles.bottom
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: styles.button,
    onClick: onCancel
  }, cancelText), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: styles.buttonPrimary,
    onClick: onConfirm
  }, confirm)));
}, "ConfirmDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybURpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9Db25maXJtRGlhbG9nLnNjc3MnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJy4uL3V0aWwvaTE4bic7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuICByZWFkb25seSBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICByZWFkb25seSBjb25maXJtOiBzdHJpbmc7XG4gIHJlYWRvbmx5IG9uQ29uZmlybTogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgY2FuY2VsPzogc3RyaW5nO1xuICByZWFkb25seSBvbkNhbmNlbDogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBDb25maXJtRGlhbG9nOiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzPiA9ICh7XG4gIHRpdGxlLFxuICBjaGlsZHJlbixcbiAgY29uZmlybSxcbiAgY2FuY2VsLFxuICBvbkNvbmZpcm0sXG4gIG9uQ2FuY2VsLFxufSkgPT4ge1xuICBjb25zdCBpMThuID0gdXNlSTE4bigpO1xuICBjb25zdCBjYW5jZWxUZXh0ID0gY2FuY2VsIHx8IGkxOG4oJ1N0aWNrZXJDcmVhdG9yLS1Db25maXJtRGlhbG9nLS1jYW5jZWwnKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYmFzZX0+XG4gICAgICA8aDEgY2xhc3NOYW1lPXtzdHlsZXMudGl0bGV9Pnt0aXRsZX08L2gxPlxuICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMudGV4dH0+e2NoaWxkcmVufTwvcD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYm90dG9tfT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9ufSBvbkNsaWNrPXtvbkNhbmNlbH0+XG4gICAgICAgICAge2NhbmNlbFRleHR9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9uUHJpbWFyeX1cbiAgICAgICAgICBvbkNsaWNrPXtvbkNvbmZpcm19XG4gICAgICAgID5cbiAgICAgICAgICB7Y29uZmlybX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsYUFBd0I7QUFDeEIsa0JBQXdCO0FBV2pCLE1BQU0sZ0JBQTRDLHdCQUFDO0FBQUEsRUFDeEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixRQUFNLE9BQU8seUJBQVE7QUFDckIsUUFBTSxhQUFhLFVBQVUsS0FBSyx1Q0FBdUM7QUFFekUsU0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVyxPQUFPO0FBQUEsS0FDckIsb0NBQUM7QUFBQSxJQUFHLFdBQVcsT0FBTztBQUFBLEtBQVEsS0FBTSxHQUNwQyxvQ0FBQztBQUFBLElBQUUsV0FBVyxPQUFPO0FBQUEsS0FBTyxRQUFTLEdBQ3JDLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNyQixvQ0FBQztBQUFBLElBQU8sTUFBSztBQUFBLElBQVMsV0FBVyxPQUFPO0FBQUEsSUFBUSxTQUFTO0FBQUEsS0FDdEQsVUFDSCxHQUNBLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxXQUFXLE9BQU87QUFBQSxJQUNsQixTQUFTO0FBQUEsS0FFUixPQUNILENBQ0YsQ0FDRjtBQUVKLEdBN0J5RDsiLAogICJuYW1lcyI6IFtdCn0K
