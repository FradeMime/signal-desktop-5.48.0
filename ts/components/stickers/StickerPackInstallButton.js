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
var StickerPackInstallButton_exports = {};
__export(StickerPackInstallButton_exports, {
  StickerPackInstallButton: () => StickerPackInstallButton
});
module.exports = __toCommonJS(StickerPackInstallButton_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const StickerPackInstallButton = React.forwardRef(({ i18n, installed, blue, ...props }, ref) => /* @__PURE__ */ React.createElement("button", {
  type: "button",
  ref,
  className: (0, import_classnames.default)({
    "module-sticker-manager__install-button": true,
    "module-sticker-manager__install-button--blue": blue
  }),
  "aria-label": i18n("stickers--StickerManager--Install"),
  ...props
}, installed ? i18n("stickers--StickerManager--Uninstall") : i18n("stickers--StickerManager--Install")));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerPackInstallButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclBhY2tJbnN0YWxsQnV0dG9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQnV0dG9uSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBPd25Qcm9wcyA9IHtcbiAgcmVhZG9ubHkgaW5zdGFsbGVkOiBib29sZWFuO1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICByZWFkb25seSBibHVlPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gT3duUHJvcHMgJiBCdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyUGFja0luc3RhbGxCdXR0b24gPSBSZWFjdC5mb3J3YXJkUmVmPFxuICBIVE1MQnV0dG9uRWxlbWVudCxcbiAgUHJvcHNcbj4oKHsgaTE4biwgaW5zdGFsbGVkLCBibHVlLCAuLi5wcm9wcyB9OiBQcm9wcywgcmVmKSA9PiAoXG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICByZWY9e3JlZn1cbiAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgJ21vZHVsZS1zdGlja2VyLW1hbmFnZXJfX2luc3RhbGwtYnV0dG9uJzogdHJ1ZSxcbiAgICAgICdtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19pbnN0YWxsLWJ1dHRvbi0tYmx1ZSc6IGJsdWUsXG4gICAgfSl9XG4gICAgYXJpYS1sYWJlbD17aTE4bignc3RpY2tlcnMtLVN0aWNrZXJNYW5hZ2VyLS1JbnN0YWxsJyl9XG4gICAgey4uLnByb3BzfVxuICA+XG4gICAge2luc3RhbGxlZFxuICAgICAgPyBpMThuKCdzdGlja2Vycy0tU3RpY2tlck1hbmFnZXItLVVuaW5zdGFsbCcpXG4gICAgICA6IGkxOG4oJ3N0aWNrZXJzLS1TdGlja2VyTWFuYWdlci0tSW5zdGFsbCcpfVxuICA8L2J1dHRvbj5cbikpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsWUFBdUI7QUFDdkIsd0JBQXVCO0FBV2hCLE1BQU0sMkJBQTJCLE1BQU0sV0FHNUMsQ0FBQyxFQUFFLE1BQU0sV0FBVyxTQUFTLFNBQWdCLFFBQzdDLG9DQUFDO0FBQUEsRUFDQyxNQUFLO0FBQUEsRUFDTDtBQUFBLEVBQ0EsV0FBVywrQkFBVztBQUFBLElBQ3BCLDBDQUEwQztBQUFBLElBQzFDLGdEQUFnRDtBQUFBLEVBQ2xELENBQUM7QUFBQSxFQUNELGNBQVksS0FBSyxtQ0FBbUM7QUFBQSxLQUNoRDtBQUFBLEdBRUgsWUFDRyxLQUFLLHFDQUFxQyxJQUMxQyxLQUFLLG1DQUFtQyxDQUM5QyxDQUNEOyIsCiAgIm5hbWVzIjogW10KfQo=
