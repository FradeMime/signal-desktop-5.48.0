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
var CopyText_exports = {};
__export(CopyText_exports, {
  CopyText: () => CopyText
});
module.exports = __toCommonJS(CopyText_exports);
var React = __toESM(require("react"));
var import_copy_text_to_clipboard = __toESM(require("copy-text-to-clipboard"));
var styles = __toESM(require("./CopyText.scss"));
var import_Button = require("./Button");
var import_i18n = require("../util/i18n");
const CopyText = React.memo(({ label, onCopy, value }) => {
  const i18n = (0, import_i18n.useI18n)();
  const handleClick = React.useCallback(() => {
    (0, import_copy_text_to_clipboard.default)(value);
    if (onCopy) {
      onCopy();
    }
  }, [onCopy, value]);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    className: styles.input,
    value,
    "aria-label": label,
    readOnly: true
  }), /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: handleClick
  }, i18n("StickerCreator--CopyText--button")));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CopyText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29weVRleHQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNvcHkgZnJvbSAnY29weS10ZXh0LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9Db3B5VGV4dC5zY3NzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi91dGlsL2kxOG4nO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgb25Db3B5PzogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBDb3B5VGV4dDogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSBSZWFjdC5tZW1vKFxuICAoeyBsYWJlbCwgb25Db3B5LCB2YWx1ZSB9KSA9PiB7XG4gICAgY29uc3QgaTE4biA9IHVzZUkxOG4oKTtcbiAgICBjb25zdCBoYW5kbGVDbGljayA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgIGNvcHkodmFsdWUpO1xuICAgICAgaWYgKG9uQ29weSkge1xuICAgICAgICBvbkNvcHkoKTtcbiAgICAgIH1cbiAgICB9LCBbb25Db3B5LCB2YWx1ZV0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICByZWFkT25seVxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT5cbiAgICAgICAgICB7aTE4bignU3RpY2tlckNyZWF0b3ItLUNvcHlUZXh0LS1idXR0b24nKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsb0NBQWlCO0FBQ2pCLGFBQXdCO0FBQ3hCLG9CQUF1QjtBQUN2QixrQkFBd0I7QUFRakIsTUFBTSxXQUF1QyxNQUFNLEtBQ3hELENBQUMsRUFBRSxPQUFPLFFBQVEsWUFBWTtBQUM1QixRQUFNLE9BQU8seUJBQVE7QUFDckIsUUFBTSxjQUFjLE1BQU0sWUFBWSxNQUFNO0FBQzFDLCtDQUFLLEtBQUs7QUFDVixRQUFJLFFBQVE7QUFDVixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0YsR0FBRyxDQUFDLFFBQVEsS0FBSyxDQUFDO0FBRWxCLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxXQUFXLE9BQU87QUFBQSxJQUNsQjtBQUFBLElBQ0EsY0FBWTtBQUFBLElBQ1osVUFBUTtBQUFBLEdBQ1YsR0FDQSxvQ0FBQztBQUFBLElBQU8sU0FBUztBQUFBLEtBQ2QsS0FBSyxrQ0FBa0MsQ0FDMUMsQ0FDRjtBQUVKLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
