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
var StickerManagerPackRow_exports = {};
__export(StickerManagerPackRow_exports, {
  StickerManagerPackRow: () => StickerManagerPackRow
});
module.exports = __toCommonJS(StickerManagerPackRow_exports);
var React = __toESM(require("react"));
var import_StickerPackInstallButton = require("./StickerPackInstallButton");
var import_ConfirmationDialog = require("../ConfirmationDialog");
const StickerManagerPackRow = React.memo(({
  installStickerPack,
  uninstallStickerPack,
  onClickPreview,
  pack,
  i18n
}) => {
  const { id, key, isBlessed } = pack;
  const [uninstalling, setUninstalling] = React.useState(false);
  const clearUninstalling = React.useCallback(() => {
    setUninstalling(false);
  }, [setUninstalling]);
  const handleInstall = React.useCallback((e) => {
    e.stopPropagation();
    if (installStickerPack) {
      installStickerPack(id, key);
    }
  }, [id, installStickerPack, key]);
  const handleUninstall = React.useCallback((e) => {
    e.stopPropagation();
    if (isBlessed && uninstallStickerPack) {
      uninstallStickerPack(id, key);
    } else {
      setUninstalling(true);
    }
  }, [id, isBlessed, key, setUninstalling, uninstallStickerPack]);
  const handleConfirmUninstall = React.useCallback(() => {
    clearUninstalling();
    if (uninstallStickerPack) {
      uninstallStickerPack(id, key);
    }
  }, [id, key, clearUninstalling, uninstallStickerPack]);
  const handleKeyDown = React.useCallback((event) => {
    if (onClickPreview && (event.key === "Enter" || event.key === "Space")) {
      event.stopPropagation();
      event.preventDefault();
      onClickPreview(pack);
    }
  }, [onClickPreview, pack]);
  const handleClickPreview = React.useCallback((event) => {
    if (onClickPreview) {
      event.stopPropagation();
      event.preventDefault();
      onClickPreview(pack);
    }
  }, [onClickPreview, pack]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, uninstalling ? /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    i18n,
    onClose: clearUninstalling,
    actions: [
      {
        style: "negative",
        text: i18n("stickers--StickerManager--Uninstall"),
        action: handleConfirmUninstall
      }
    ]
  }, i18n("stickers--StickerManager--UninstallWarning")) : null, /* @__PURE__ */ React.createElement("div", {
    tabIndex: 0,
    role: "button",
    onKeyDown: handleKeyDown,
    onClick: handleClickPreview,
    className: "module-sticker-manager__pack-row"
  }, pack.cover ? /* @__PURE__ */ React.createElement("img", {
    src: pack.cover.url,
    alt: pack.title,
    className: "module-sticker-manager__pack-row__cover"
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__pack-row__cover-placeholder"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__pack-row__meta"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__pack-row__meta__title"
  }, pack.title, pack.isBlessed ? /* @__PURE__ */ React.createElement("span", {
    className: "module-sticker-manager__pack-row__meta__blessed-icon"
  }) : null), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__pack-row__meta__author"
  }, pack.author)), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__pack-row__controls"
  }, pack.status === "installed" ? /* @__PURE__ */ React.createElement(import_StickerPackInstallButton.StickerPackInstallButton, {
    installed: true,
    i18n,
    onClick: handleUninstall
  }) : /* @__PURE__ */ React.createElement(import_StickerPackInstallButton.StickerPackInstallButton, {
    installed: false,
    i18n,
    onClick: handleInstall
  }))));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerManagerPackRow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlck1hbmFnZXJQYWNrUm93LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN0aWNrZXJQYWNrSW5zdGFsbEJ1dHRvbiB9IGZyb20gJy4vU3RpY2tlclBhY2tJbnN0YWxsQnV0dG9uJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZyB9IGZyb20gJy4uL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgU3RpY2tlclBhY2tUeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3Mvc3RpY2tlcnMnO1xuXG5leHBvcnQgdHlwZSBPd25Qcm9wcyA9IHtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcmVhZG9ubHkgcGFjazogU3RpY2tlclBhY2tUeXBlO1xuICByZWFkb25seSBvbkNsaWNrUHJldmlldz86IChzdGlja2VyOiBTdGlja2VyUGFja1R5cGUpID0+IHVua25vd247XG4gIHJlYWRvbmx5IGluc3RhbGxTdGlja2VyUGFjaz86IChwYWNrSWQ6IHN0cmluZywgcGFja0tleTogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZWFkb25seSB1bmluc3RhbGxTdGlja2VyUGFjaz86IChwYWNrSWQ6IHN0cmluZywgcGFja0tleTogc3RyaW5nKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBPd25Qcm9wcztcblxuZXhwb3J0IGNvbnN0IFN0aWNrZXJNYW5hZ2VyUGFja1JvdyA9IFJlYWN0Lm1lbW8oXG4gICh7XG4gICAgaW5zdGFsbFN0aWNrZXJQYWNrLFxuICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrLFxuICAgIG9uQ2xpY2tQcmV2aWV3LFxuICAgIHBhY2ssXG4gICAgaTE4bixcbiAgfTogUHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGlkLCBrZXksIGlzQmxlc3NlZCB9ID0gcGFjaztcbiAgICBjb25zdCBbdW5pbnN0YWxsaW5nLCBzZXRVbmluc3RhbGxpbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3QgY2xlYXJVbmluc3RhbGxpbmcgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBzZXRVbmluc3RhbGxpbmcoZmFsc2UpO1xuICAgIH0sIFtzZXRVbmluc3RhbGxpbmddKTtcblxuICAgIGNvbnN0IGhhbmRsZUluc3RhbGwgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChpbnN0YWxsU3RpY2tlclBhY2spIHtcbiAgICAgICAgICBpbnN0YWxsU3RpY2tlclBhY2soaWQsIGtleSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbaWQsIGluc3RhbGxTdGlja2VyUGFjaywga2V5XVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVVbmluc3RhbGwgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChpc0JsZXNzZWQgJiYgdW5pbnN0YWxsU3RpY2tlclBhY2spIHtcbiAgICAgICAgICB1bmluc3RhbGxTdGlja2VyUGFjayhpZCwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRVbmluc3RhbGxpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbaWQsIGlzQmxlc3NlZCwga2V5LCBzZXRVbmluc3RhbGxpbmcsIHVuaW5zdGFsbFN0aWNrZXJQYWNrXVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVDb25maXJtVW5pbnN0YWxsID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgY2xlYXJVbmluc3RhbGxpbmcoKTtcbiAgICAgIGlmICh1bmluc3RhbGxTdGlja2VyUGFjaykge1xuICAgICAgICB1bmluc3RhbGxTdGlja2VyUGFjayhpZCwga2V5KTtcbiAgICAgIH1cbiAgICB9LCBbaWQsIGtleSwgY2xlYXJVbmluc3RhbGxpbmcsIHVuaW5zdGFsbFN0aWNrZXJQYWNrXSk7XG5cbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG9uQ2xpY2tQcmV2aWV3ICYmXG4gICAgICAgICAgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICdTcGFjZScpXG4gICAgICAgICkge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBvbkNsaWNrUHJldmlldyhwYWNrKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtvbkNsaWNrUHJldmlldywgcGFja11cbiAgICApO1xuXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tQcmV2aWV3ID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKG9uQ2xpY2tQcmV2aWV3KSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIG9uQ2xpY2tQcmV2aWV3KHBhY2spO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW29uQ2xpY2tQcmV2aWV3LCBwYWNrXVxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAge3VuaW5zdGFsbGluZyA/IChcbiAgICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgb25DbG9zZT17Y2xlYXJVbmluc3RhbGxpbmd9XG4gICAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdzdGlja2Vycy0tU3RpY2tlck1hbmFnZXItLVVuaW5zdGFsbCcpLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogaGFuZGxlQ29uZmlybVVuaW5zdGFsbCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ3N0aWNrZXJzLS1TdGlja2VyTWFuYWdlci0tVW5pbnN0YWxsV2FybmluZycpfVxuICAgICAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgIC8vIFRoaXMgY2FuJ3QgYmUgYSBidXR0b24gYmVjYXVzZSB3ZSBoYXZlIGJ1dHRvbnMgYXMgZGVzY2VuZGFudHNcbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2tQcmV2aWV3fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3BhY2stcm93XCJcbiAgICAgICAgPlxuICAgICAgICAgIHtwYWNrLmNvdmVyID8gKFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9e3BhY2suY292ZXIudXJsfVxuICAgICAgICAgICAgICBhbHQ9e3BhY2sudGl0bGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3BhY2stcm93X19jb3ZlclwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3BhY2stcm93X19jb3Zlci1wbGFjZWhvbGRlclwiIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3BhY2stcm93X19tZXRhXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3BhY2stcm93X19tZXRhX190aXRsZVwiPlxuICAgICAgICAgICAgICB7cGFjay50aXRsZX1cbiAgICAgICAgICAgICAge3BhY2suaXNCbGVzc2VkID8gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3BhY2stcm93X19tZXRhX19ibGVzc2VkLWljb25cIiAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wYWNrLXJvd19fbWV0YV9fYXV0aG9yXCI+XG4gICAgICAgICAgICAgIHtwYWNrLmF1dGhvcn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItbWFuYWdlcl9fcGFjay1yb3dfX2NvbnRyb2xzXCI+XG4gICAgICAgICAgICB7cGFjay5zdGF0dXMgPT09ICdpbnN0YWxsZWQnID8gKFxuICAgICAgICAgICAgICA8U3RpY2tlclBhY2tJbnN0YWxsQnV0dG9uXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkXG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVVbmluc3RhbGx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8U3RpY2tlclBhY2tJbnN0YWxsQnV0dG9uXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUluc3RhbGx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixzQ0FBeUM7QUFDekMsZ0NBQW1DO0FBYzVCLE1BQU0sd0JBQXdCLE1BQU0sS0FDekMsQ0FBQztBQUFBLEVBQ0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDVztBQUNYLFFBQU0sRUFBRSxJQUFJLEtBQUssY0FBYztBQUMvQixRQUFNLENBQUMsY0FBYyxtQkFBbUIsTUFBTSxTQUFTLEtBQUs7QUFFNUQsUUFBTSxvQkFBb0IsTUFBTSxZQUFZLE1BQU07QUFDaEQsb0JBQWdCLEtBQUs7QUFBQSxFQUN2QixHQUFHLENBQUMsZUFBZSxDQUFDO0FBRXBCLFFBQU0sZ0JBQWdCLE1BQU0sWUFDMUIsQ0FBQyxNQUF3QjtBQUN2QixNQUFFLGdCQUFnQjtBQUNsQixRQUFJLG9CQUFvQjtBQUN0Qix5QkFBbUIsSUFBSSxHQUFHO0FBQUEsSUFDNUI7QUFBQSxFQUNGLEdBQ0EsQ0FBQyxJQUFJLG9CQUFvQixHQUFHLENBQzlCO0FBRUEsUUFBTSxrQkFBa0IsTUFBTSxZQUM1QixDQUFDLE1BQXdCO0FBQ3ZCLE1BQUUsZ0JBQWdCO0FBQ2xCLFFBQUksYUFBYSxzQkFBc0I7QUFDckMsMkJBQXFCLElBQUksR0FBRztBQUFBLElBQzlCLE9BQU87QUFDTCxzQkFBZ0IsSUFBSTtBQUFBLElBQ3RCO0FBQUEsRUFDRixHQUNBLENBQUMsSUFBSSxXQUFXLEtBQUssaUJBQWlCLG9CQUFvQixDQUM1RDtBQUVBLFFBQU0seUJBQXlCLE1BQU0sWUFBWSxNQUFNO0FBQ3JELHNCQUFrQjtBQUNsQixRQUFJLHNCQUFzQjtBQUN4QiwyQkFBcUIsSUFBSSxHQUFHO0FBQUEsSUFDOUI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLG9CQUFvQixDQUFDO0FBRXJELFFBQU0sZ0JBQWdCLE1BQU0sWUFDMUIsQ0FBQyxVQUErQjtBQUM5QixRQUNFLGtCQUNDLE9BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxVQUN4QztBQUNBLFlBQU0sZ0JBQWdCO0FBQ3RCLFlBQU0sZUFBZTtBQUVyQixxQkFBZSxJQUFJO0FBQUEsSUFDckI7QUFBQSxFQUNGLEdBQ0EsQ0FBQyxnQkFBZ0IsSUFBSSxDQUN2QjtBQUVBLFFBQU0scUJBQXFCLE1BQU0sWUFDL0IsQ0FBQyxVQUE0QjtBQUMzQixRQUFJLGdCQUFnQjtBQUNsQixZQUFNLGdCQUFnQjtBQUN0QixZQUFNLGVBQWU7QUFFckIscUJBQWUsSUFBSTtBQUFBLElBQ3JCO0FBQUEsRUFDRixHQUNBLENBQUMsZ0JBQWdCLElBQUksQ0FDdkI7QUFFQSxTQUNFLDBEQUNHLGVBQ0Msb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsTUFBTSxLQUFLLHFDQUFxQztBQUFBLFFBQ2hELFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEtBRUMsS0FBSyw0Q0FBNEMsQ0FDcEQsSUFDRSxNQUNKLG9DQUFDO0FBQUEsSUFDQyxVQUFVO0FBQUEsSUFFVixNQUFLO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFDVCxXQUFVO0FBQUEsS0FFVCxLQUFLLFFBQ0osb0NBQUM7QUFBQSxJQUNDLEtBQUssS0FBSyxNQUFNO0FBQUEsSUFDaEIsS0FBSyxLQUFLO0FBQUEsSUFDVixXQUFVO0FBQUEsR0FDWixJQUVBLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsR0FBc0QsR0FFdkUsb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixLQUFLLE9BQ0wsS0FBSyxZQUNKLG9DQUFDO0FBQUEsSUFBSyxXQUFVO0FBQUEsR0FBdUQsSUFDckUsSUFDTixHQUNBLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixLQUFLLE1BQ1IsQ0FDRixHQUNBLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixLQUFLLFdBQVcsY0FDZixvQ0FBQztBQUFBLElBQ0MsV0FBUztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxHQUNYLElBRUEsb0NBQUM7QUFBQSxJQUNDLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQSxTQUFTO0FBQUEsR0FDWCxDQUVKLENBQ0YsQ0FDRjtBQUVKLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
