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
var StickerPreviewModal_exports = {};
__export(StickerPreviewModal_exports, {
  StickerPreviewModal: () => StickerPreviewModal
});
module.exports = __toCommonJS(StickerPreviewModal_exports);
var React = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var import_StickerPackInstallButton = require("./StickerPackInstallButton");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_Spinner = require("../Spinner");
var import_useRestoreFocus = require("../../hooks/useRestoreFocus");
function renderBody({ pack, i18n }) {
  if (!pack) {
    return null;
  }
  if (pack && pack.status === "error") {
    return /* @__PURE__ */ React.createElement("div", {
      className: "module-sticker-manager__preview-modal__container__error"
    }, i18n("stickers--StickerPreview--Error"));
  }
  if (pack.stickerCount === 0 || !(0, import_lodash.isNumber)(pack.stickerCount)) {
    return /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
      svgSize: "normal"
    });
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__preview-modal__container__sticker-grid"
  }, pack.stickers.map(({ id, url }) => /* @__PURE__ */ React.createElement("div", {
    key: id,
    className: "module-sticker-manager__preview-modal__container__sticker-grid__cell"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "module-sticker-manager__preview-modal__container__sticker-grid__cell__image",
    src: url,
    alt: pack.title
  }))), pack.status === "pending" && (0, import_lodash.range)(pack.stickerCount - pack.stickers.length).map((i) => /* @__PURE__ */ React.createElement("div", {
    key: `placeholder-${i}`,
    className: (0, import_classnames.default)("module-sticker-manager__preview-modal__container__sticker-grid__cell", "module-sticker-manager__preview-modal__container__sticker-grid__cell--placeholder")
  })));
}
const StickerPreviewModal = React.memo((props) => {
  const {
    onClose,
    pack,
    i18n,
    downloadStickerPack,
    installStickerPack,
    uninstallStickerPack
  } = props;
  const [root, setRoot] = React.useState(null);
  const [confirmingUninstall, setConfirmingUninstall] = React.useState(false);
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  React.useEffect(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);
  React.useEffect(() => {
    if (pack && pack.status === "known") {
      downloadStickerPack(pack.id, pack.key);
    }
    if (pack && pack.status === "error" && (pack.attemptedStatus === "downloaded" || pack.attemptedStatus === "installed")) {
      downloadStickerPack(pack.id, pack.key, {
        finalStatus: pack.attemptedStatus
      });
    }
  }, []);
  React.useEffect(() => {
    if (!pack) {
      onClose();
    }
  }, [pack, onClose]);
  const isInstalled = Boolean(pack && pack.status === "installed");
  const handleToggleInstall = React.useCallback(() => {
    if (!pack) {
      return;
    }
    if (isInstalled) {
      setConfirmingUninstall(true);
    } else if (pack.status === "ephemeral") {
      downloadStickerPack(pack.id, pack.key, { finalStatus: "installed" });
      onClose();
    } else {
      installStickerPack(pack.id, pack.key);
      onClose();
    }
  }, [
    downloadStickerPack,
    installStickerPack,
    isInstalled,
    onClose,
    pack,
    setConfirmingUninstall
  ]);
  const handleUninstall = React.useCallback(() => {
    if (!pack) {
      return;
    }
    uninstallStickerPack(pack.id, pack.key);
    setConfirmingUninstall(false);
  }, [uninstallStickerPack, setConfirmingUninstall, pack]);
  React.useEffect(() => {
    const handler = /* @__PURE__ */ __name(({ key }) => {
      if (key === "Escape") {
        onClose();
      }
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);
  const handleClickToClose = React.useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);
  return root ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement("div", {
    role: "button",
    className: "module-sticker-manager__preview-modal__overlay",
    onClick: handleClickToClose
  }, confirmingUninstall ? /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    i18n,
    onClose,
    actions: [
      {
        style: "negative",
        text: i18n("stickers--StickerManager--Uninstall"),
        action: handleUninstall
      }
    ]
  }, i18n("stickers--StickerManager--UninstallWarning")) : /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__preview-modal__container"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "module-sticker-manager__preview-modal__container__header"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "module-sticker-manager__preview-modal__container__header__text"
  }, i18n("stickers--StickerPreview--Title")), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "module-sticker-manager__preview-modal__container__header__close-button",
    "aria-label": i18n("close")
  })), renderBody(props), pack && pack.status !== "error" ? /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__preview-modal__container__meta-overlay"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__preview-modal__container__meta-overlay__info"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "module-sticker-manager__preview-modal__container__meta-overlay__info__title"
  }, pack.title, pack.isBlessed ? /* @__PURE__ */ React.createElement("span", {
    className: "module-sticker-manager__preview-modal__container__meta-overlay__info__blessed-icon"
  }) : null), /* @__PURE__ */ React.createElement("h4", {
    className: "module-sticker-manager__preview-modal__container__meta-overlay__info__author"
  }, pack.author)), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager__preview-modal__container__meta-overlay__install"
  }, pack.status === "pending" ? /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
    svgSize: "small",
    size: "14px"
  }) : /* @__PURE__ */ React.createElement(import_StickerPackInstallButton.StickerPackInstallButton, {
    ref: focusRef,
    installed: isInstalled,
    i18n,
    onClick: handleToggleInstall,
    blue: true
  }))) : null)), root) : null;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerPreviewModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclByZXZpZXdNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgaXNOdW1iZXIsIHJhbmdlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgU3RpY2tlclBhY2tJbnN0YWxsQnV0dG9uIH0gZnJvbSAnLi9TdGlja2VyUGFja0luc3RhbGxCdXR0b24nO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBTdGlja2VyUGFja1R5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9zdGlja2Vycyc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vU3Bpbm5lcic7XG5pbXBvcnQgeyB1c2VSZXN0b3JlRm9jdXMgfSBmcm9tICcuLi8uLi9ob29rcy91c2VSZXN0b3JlRm9jdXMnO1xuXG5leHBvcnQgdHlwZSBPd25Qcm9wcyA9IHtcbiAgcmVhZG9ubHkgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgZG93bmxvYWRTdGlja2VyUGFjazogKFxuICAgIHBhY2tJZDogc3RyaW5nLFxuICAgIHBhY2tLZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzogeyBmaW5hbFN0YXR1cz86ICdpbnN0YWxsZWQnIHwgJ2Rvd25sb2FkZWQnIH1cbiAgKSA9PiB1bmtub3duO1xuICByZWFkb25seSBpbnN0YWxsU3RpY2tlclBhY2s6IChwYWNrSWQ6IHN0cmluZywgcGFja0tleTogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZWFkb25seSB1bmluc3RhbGxTdGlja2VyUGFjazogKHBhY2tJZDogc3RyaW5nLCBwYWNrS2V5OiBzdHJpbmcpID0+IHVua25vd247XG4gIHJlYWRvbmx5IHBhY2s/OiBTdGlja2VyUGFja1R5cGU7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IE93blByb3BzO1xuXG5mdW5jdGlvbiByZW5kZXJCb2R5KHsgcGFjaywgaTE4biB9OiBQcm9wcykge1xuICBpZiAoIXBhY2spIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChwYWNrICYmIHBhY2suc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItbWFuYWdlcl9fcHJldmlldy1tb2RhbF9fY29udGFpbmVyX19lcnJvclwiPlxuICAgICAgICB7aTE4bignc3RpY2tlcnMtLVN0aWNrZXJQcmV2aWV3LS1FcnJvcicpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChwYWNrLnN0aWNrZXJDb3VudCA9PT0gMCB8fCAhaXNOdW1iZXIocGFjay5zdGlja2VyQ291bnQpKSB7XG4gICAgcmV0dXJuIDxTcGlubmVyIHN2Z1NpemU9XCJub3JtYWxcIiAvPjtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX3N0aWNrZXItZ3JpZFwiPlxuICAgICAge3BhY2suc3RpY2tlcnMubWFwKCh7IGlkLCB1cmwgfSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpZH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX3N0aWNrZXItZ3JpZF9fY2VsbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX3N0aWNrZXItZ3JpZF9fY2VsbF9faW1hZ2VcIlxuICAgICAgICAgICAgc3JjPXt1cmx9XG4gICAgICAgICAgICBhbHQ9e3BhY2sudGl0bGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApKX1cbiAgICAgIHtwYWNrLnN0YXR1cyA9PT0gJ3BlbmRpbmcnICYmXG4gICAgICAgIHJhbmdlKHBhY2suc3RpY2tlckNvdW50IC0gcGFjay5zdGlja2Vycy5sZW5ndGgpLm1hcChpID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2BwbGFjZWhvbGRlci0ke2l9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgJ21vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX2NvbnRhaW5lcl9fc3RpY2tlci1ncmlkX19jZWxsJyxcbiAgICAgICAgICAgICAgJ21vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX2NvbnRhaW5lcl9fc3RpY2tlci1ncmlkX19jZWxsLS1wbGFjZWhvbGRlcidcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyUHJldmlld01vZGFsID0gUmVhY3QubWVtbygocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBvbkNsb3NlLFxuICAgIHBhY2ssXG4gICAgaTE4bixcbiAgICBkb3dubG9hZFN0aWNrZXJQYWNrLFxuICAgIGluc3RhbGxTdGlja2VyUGFjayxcbiAgICB1bmluc3RhbGxTdGlja2VyUGFjayxcbiAgfSA9IHByb3BzO1xuICBjb25zdCBbcm9vdCwgc2V0Um9vdF0gPSBSZWFjdC51c2VTdGF0ZTxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbY29uZmlybWluZ1VuaW5zdGFsbCwgc2V0Q29uZmlybWluZ1VuaW5zdGFsbF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVzdG9yZSBmb2N1cyBvbiB0ZWFyZG93blxuICBjb25zdCBbZm9jdXNSZWZdID0gdXNlUmVzdG9yZUZvY3VzKCk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgc2V0Um9vdChkaXYpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocGFjayAmJiBwYWNrLnN0YXR1cyA9PT0gJ2tub3duJykge1xuICAgICAgZG93bmxvYWRTdGlja2VyUGFjayhwYWNrLmlkLCBwYWNrLmtleSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHBhY2sgJiZcbiAgICAgIHBhY2suc3RhdHVzID09PSAnZXJyb3InICYmXG4gICAgICAocGFjay5hdHRlbXB0ZWRTdGF0dXMgPT09ICdkb3dubG9hZGVkJyB8fFxuICAgICAgICBwYWNrLmF0dGVtcHRlZFN0YXR1cyA9PT0gJ2luc3RhbGxlZCcpXG4gICAgKSB7XG4gICAgICBkb3dubG9hZFN0aWNrZXJQYWNrKHBhY2suaWQsIHBhY2sua2V5LCB7XG4gICAgICAgIGZpbmFsU3RhdHVzOiBwYWNrLmF0dGVtcHRlZFN0YXR1cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBXZSBvbmx5IHdhbnQgdG8gYXR0ZW1wdCBkb3dubG9hZHMgb24gaW5pdGlhbCBsb2FkXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBhY2spIHtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9XG4gIH0sIFtwYWNrLCBvbkNsb3NlXSk7XG5cbiAgY29uc3QgaXNJbnN0YWxsZWQgPSBCb29sZWFuKHBhY2sgJiYgcGFjay5zdGF0dXMgPT09ICdpbnN0YWxsZWQnKTtcbiAgY29uc3QgaGFuZGxlVG9nZ2xlSW5zdGFsbCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBhY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzSW5zdGFsbGVkKSB7XG4gICAgICBzZXRDb25maXJtaW5nVW5pbnN0YWxsKHRydWUpO1xuICAgIH0gZWxzZSBpZiAocGFjay5zdGF0dXMgPT09ICdlcGhlbWVyYWwnKSB7XG4gICAgICBkb3dubG9hZFN0aWNrZXJQYWNrKHBhY2suaWQsIHBhY2sua2V5LCB7IGZpbmFsU3RhdHVzOiAnaW5zdGFsbGVkJyB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFsbFN0aWNrZXJQYWNrKHBhY2suaWQsIHBhY2sua2V5KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9XG4gIH0sIFtcbiAgICBkb3dubG9hZFN0aWNrZXJQYWNrLFxuICAgIGluc3RhbGxTdGlja2VyUGFjayxcbiAgICBpc0luc3RhbGxlZCxcbiAgICBvbkNsb3NlLFxuICAgIHBhY2ssXG4gICAgc2V0Q29uZmlybWluZ1VuaW5zdGFsbCxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlVW5pbnN0YWxsID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghcGFjaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmluc3RhbGxTdGlja2VyUGFjayhwYWNrLmlkLCBwYWNrLmtleSk7XG4gICAgc2V0Q29uZmlybWluZ1VuaW5zdGFsbChmYWxzZSk7XG4gICAgLy8gb25DbG9zZSBpcyBjYWxsZWQgYnkgPENvbmZpcm1hdGlvbkRpYWxvZyAvPlxuICB9LCBbdW5pbnN0YWxsU3RpY2tlclBhY2ssIHNldENvbmZpcm1pbmdVbmluc3RhbGwsIHBhY2tdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAoeyBrZXkgfTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuICAgIH07XG4gIH0sIFtvbkNsb3NlXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2tUb0Nsb3NlID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvbkNsb3NlXVxuICApO1xuXG4gIHJldHVybiByb290XG4gICAgPyBjcmVhdGVQb3J0YWwoXG4gICAgICAgIC8vIE5vdCByZWFsbHkgYSBidXR0b24uIEp1c3QgYSBiYWNrZ3JvdW5kIHdoaWNoIGNhbiBiZSBjbGlja2VkIHRvIGNsb3NlIG1vZGFsXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9pbnRlcmFjdGl2ZS1zdXBwb3J0cy1mb2N1cywganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50c1xuICAgICAgICA8ZGl2XG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItbWFuYWdlcl9fcHJldmlldy1tb2RhbF9fb3ZlcmxheVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2tUb0Nsb3NlfVxuICAgICAgICA+XG4gICAgICAgICAge2NvbmZpcm1pbmdVbmluc3RhbGwgPyAoXG4gICAgICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ3N0aWNrZXJzLS1TdGlja2VyTWFuYWdlci0tVW5pbnN0YWxsJyksXG4gICAgICAgICAgICAgICAgICBhY3Rpb246IGhhbmRsZVVuaW5zdGFsbCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aTE4bignc3RpY2tlcnMtLVN0aWNrZXJNYW5hZ2VyLS1Vbmluc3RhbGxXYXJuaW5nJyl9XG4gICAgICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX2hlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX2hlYWRlcl9fdGV4dFwiPlxuICAgICAgICAgICAgICAgICAge2kxOG4oJ3N0aWNrZXJzLS1TdGlja2VyUHJldmlldy0tVGl0bGUnKX1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX2NvbnRhaW5lcl9faGVhZGVyX19jbG9zZS1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2xvc2UnKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAge3JlbmRlckJvZHkocHJvcHMpfVxuICAgICAgICAgICAgICB7cGFjayAmJiBwYWNrLnN0YXR1cyAhPT0gJ2Vycm9yJyA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX2NvbnRhaW5lcl9fbWV0YS1vdmVybGF5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX2NvbnRhaW5lcl9fbWV0YS1vdmVybGF5X19pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX21ldGEtb3ZlcmxheV9faW5mb19fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFjay50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICB7cGFjay5pc0JsZXNzZWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyX19wcmV2aWV3LW1vZGFsX19jb250YWluZXJfX21ldGEtb3ZlcmxheV9faW5mb19fYmxlc3NlZC1pY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX2NvbnRhaW5lcl9fbWV0YS1vdmVybGF5X19pbmZvX19hdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFjay5hdXRob3J9XG4gICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItbWFuYWdlcl9fcHJldmlldy1tb2RhbF9fY29udGFpbmVyX19tZXRhLW92ZXJsYXlfX2luc3RhbGxcIj5cbiAgICAgICAgICAgICAgICAgICAge3BhY2suc3RhdHVzID09PSAncGVuZGluZycgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXIgc3ZnU2l6ZT1cInNtYWxsXCIgc2l6ZT1cIjE0cHhcIiAvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxTdGlja2VyUGFja0luc3RhbGxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17Zm9jdXNSZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YWxsZWQ9e2lzSW5zdGFsbGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZUluc3RhbGx9XG4gICAgICAgICAgICAgICAgICAgICAgICBibHVlXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICAgcm9vdFxuICAgICAgKVxuICAgIDogbnVsbDtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHVCQUE2QjtBQUM3QixvQkFBZ0M7QUFDaEMsd0JBQXVCO0FBQ3ZCLHNDQUF5QztBQUN6QyxnQ0FBbUM7QUFHbkMscUJBQXdCO0FBQ3hCLDZCQUFnQztBQWlCaEMsb0JBQW9CLEVBQUUsTUFBTSxRQUFlO0FBQ3pDLE1BQUksQ0FBQyxNQUFNO0FBQ1QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLFFBQVEsS0FBSyxXQUFXLFNBQVM7QUFDbkMsV0FDRSxvQ0FBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ1osS0FBSyxpQ0FBaUMsQ0FDekM7QUFBQSxFQUVKO0FBRUEsTUFBSSxLQUFLLGlCQUFpQixLQUFLLENBQUMsNEJBQVMsS0FBSyxZQUFZLEdBQUc7QUFDM0QsV0FBTyxvQ0FBQztBQUFBLE1BQVEsU0FBUTtBQUFBLEtBQVM7QUFBQSxFQUNuQztBQUVBLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssU0FBUyxJQUFJLENBQUMsRUFBRSxJQUFJLFVBQ3hCLG9DQUFDO0FBQUEsSUFDQyxLQUFLO0FBQUEsSUFDTCxXQUFVO0FBQUEsS0FFVixvQ0FBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElB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
