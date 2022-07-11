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
var StickerFrame_exports = {};
__export(StickerFrame_exports, {
  StickerFrame: () => StickerFrame
});
module.exports = __toCommonJS(StickerFrame_exports);
var React = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_react_sortable_hoc = require("react-sortable-hoc");
var import_lodash = require("lodash");
var import_react_popper = require("react-popper");
var import_icons = require("../elements/icons");
var import_DropZone = require("../elements/DropZone");
var import_StickerPreview = require("../elements/StickerPreview");
var styles = __toESM(require("./StickerFrame.scss"));
var import_EmojiPicker = require("../../ts/components/emoji/EmojiPicker");
var import_Emoji = require("../../ts/components/emoji/Emoji");
var import_PopperRootContext = require("../../ts/components/PopperRootContext");
var import_i18n = require("../util/i18n");
const spinnerSvg = /* @__PURE__ */ React.createElement("svg", {
  width: 56,
  height: 56
}, /* @__PURE__ */ React.createElement("path", {
  d: "M52.36 14.185A27.872 27.872 0 0156 28c0 15.464-12.536 28-28 28v-2c14.36 0 26-11.64 26-26 0-4.66-1.226-9.033-3.372-12.815l1.732-1z"
}));
const closeSvg = /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 16 16",
  width: "16px",
  height: "16px",
  className: styles.closeButtonIcon
}, /* @__PURE__ */ React.createElement("path", {
  d: "M13.4 3.3l-.8-.6L8 7.3 3.3 2.7l-.6.6L7.3 8l-4.6 4.6.6.8L8 8.7l4.6 4.7.8-.8L8.7 8z"
}));
const ImageHandle = (0, import_react_sortable_hoc.SortableHandle)((props) => /* @__PURE__ */ React.createElement("img", {
  className: styles.image,
  ...props,
  alt: "Sticker"
}));
const StickerFrame = React.memo(({
  id,
  emojiData,
  image,
  showGuide,
  mode,
  onRemove,
  onPickEmoji,
  skinTone,
  onSetSkinTone,
  onDrop
}) => {
  const i18n = (0, import_i18n.useI18n)();
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);
  const [emojiPopperRoot, setEmojiPopperRoot] = React.useState(null);
  const [previewActive, setPreviewActive] = React.useState(false);
  const [previewPopperRoot, setPreviewPopperRoot] = React.useState(null);
  const timerRef = React.useRef();
  const handleToggleEmojiPicker = React.useCallback(() => {
    setEmojiPickerOpen((open) => !open);
  }, [setEmojiPickerOpen]);
  const handlePickEmoji = React.useCallback((emoji) => {
    if (!id) {
      return;
    }
    if (!onPickEmoji) {
      throw new Error("StickerFrame/handlePickEmoji: onPickEmoji was not provided!");
    }
    onPickEmoji({ id, emoji });
    setEmojiPickerOpen(false);
  }, [id, onPickEmoji, setEmojiPickerOpen]);
  const handleRemove = React.useCallback(() => {
    if (!id) {
      return;
    }
    if (!onRemove) {
      throw new Error("StickerFrame/handleRemove: onRemove was not provided!");
    }
    onRemove(id);
  }, [onRemove, id]);
  const handleMouseEnter = React.useCallback(() => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setPreviewActive(true);
    }, 500);
  }, [timerRef, setPreviewActive]);
  const handleMouseLeave = React.useCallback(() => {
    clearTimeout(timerRef.current);
    setPreviewActive(false);
  }, [timerRef, setPreviewActive]);
  React.useEffect(() => () => {
    clearTimeout(timerRef.current);
  }, [timerRef]);
  const { createRoot, removeRoot } = React.useContext(import_PopperRootContext.PopperRootContext);
  React.useEffect(() => {
    if (emojiPickerOpen) {
      const root = createRoot();
      setEmojiPopperRoot(root);
      const handleOutsideClick = /* @__PURE__ */ __name(({ target }) => {
        if (!root.contains(target)) {
          setEmojiPickerOpen(false);
        }
      }, "handleOutsideClick");
      document.addEventListener("click", handleOutsideClick);
      return () => {
        removeRoot(root);
        setEmojiPopperRoot(null);
        document.removeEventListener("click", handleOutsideClick);
      };
    }
    return import_lodash.noop;
  }, [
    createRoot,
    emojiPickerOpen,
    removeRoot,
    setEmojiPickerOpen,
    setEmojiPopperRoot
  ]);
  React.useEffect(() => {
    if (mode !== "pick-emoji" && image && previewActive) {
      const root = createRoot();
      setPreviewPopperRoot(root);
      return () => {
        removeRoot(root);
      };
    }
    return import_lodash.noop;
  }, [
    createRoot,
    image,
    mode,
    previewActive,
    removeRoot,
    setPreviewPopperRoot
  ]);
  const [dragActive, setDragActive] = React.useState(false);
  const containerClass = dragActive ? styles.dragActive : styles.container;
  return /* @__PURE__ */ React.createElement(import_react_popper.Manager, null, /* @__PURE__ */ React.createElement(import_react_popper.Reference, null, ({ ref: rootRef }) => /* @__PURE__ */ React.createElement("div", {
    className: containerClass,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: rootRef
  }, mode !== "add" ? image ? /* @__PURE__ */ React.createElement(ImageHandle, {
    src: image
  }) : /* @__PURE__ */ React.createElement("div", {
    className: styles.spinner
  }, spinnerSvg) : null, showGuide && mode !== "add" ? /* @__PURE__ */ React.createElement("div", {
    className: styles.guide
  }) : null, mode === "add" && onDrop ? /* @__PURE__ */ React.createElement(import_DropZone.DropZone, {
    label: i18n("StickerCreator--DropStage--dragDrop"),
    onDrop,
    inner: true,
    onDragActive: setDragActive
  }) : null, mode === "removable" ? /* @__PURE__ */ React.createElement("button", {
    type: "button",
    "aria-label": i18n("StickerCreator--DropStage--removeSticker"),
    className: styles.closeButton,
    onClick: handleRemove,
    onMouseEnter: handleMouseLeave,
    onMouseLeave: handleMouseEnter
  }, closeSvg) : null, mode === "pick-emoji" ? /* @__PURE__ */ React.createElement(import_react_popper.Manager, null, /* @__PURE__ */ React.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ React.createElement("button", {
    type: "button",
    ref,
    className: styles.emojiButton,
    onClick: handleToggleEmojiPicker
  }, emojiData ? /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    ...emojiData,
    size: 24
  }) : /* @__PURE__ */ React.createElement(import_icons.AddEmoji, null))), emojiPickerOpen && emojiPopperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement(import_react_popper.Popper, {
    placement: "bottom-start"
  }, ({ ref, style }) => /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
    ref,
    style: { ...style, marginTop: "8px" },
    i18n,
    onPickEmoji: handlePickEmoji,
    skinTone,
    onSetSkinTone,
    onClose: handleToggleEmojiPicker
  })), emojiPopperRoot) : null) : null, mode !== "pick-emoji" && image && previewActive && previewPopperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement(import_react_popper.Popper, {
    placement: "bottom",
    modifiers: [
      { name: "offset", options: { offset: [void 0, 8] } }
    ]
  }, ({ ref, style, arrowProps, placement }) => /* @__PURE__ */ React.createElement(import_StickerPreview.StickerPreview, {
    ref,
    style,
    image,
    arrowProps,
    placement
  })), previewPopperRoot) : null)));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerFrame
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlckZyYW1lLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBTb3J0YWJsZUhhbmRsZSB9IGZyb20gJ3JlYWN0LXNvcnRhYmxlLWhvYyc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gIE1hbmFnZXIgYXMgUG9wcGVyTWFuYWdlcixcbiAgUG9wcGVyLFxuICBSZWZlcmVuY2UgYXMgUG9wcGVyUmVmZXJlbmNlLFxufSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IHsgQWRkRW1vamkgfSBmcm9tICcuLi9lbGVtZW50cy9pY29ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIERyb3Bab25lUHJvcHMgfSBmcm9tICcuLi9lbGVtZW50cy9Ecm9wWm9uZSc7XG5pbXBvcnQgeyBEcm9wWm9uZSB9IGZyb20gJy4uL2VsZW1lbnRzL0Ryb3Bab25lJztcbmltcG9ydCB7IFN0aWNrZXJQcmV2aWV3IH0gZnJvbSAnLi4vZWxlbWVudHMvU3RpY2tlclByZXZpZXcnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vU3RpY2tlckZyYW1lLnNjc3MnO1xuaW1wb3J0IHR5cGUge1xuICBFbW9qaVBpY2tEYXRhVHlwZSxcbiAgUHJvcHMgYXMgRW1vamlQaWNrZXJQcm9wcyxcbn0gZnJvbSAnLi4vLi4vdHMvY29tcG9uZW50cy9lbW9qaS9FbW9qaVBpY2tlcic7XG5pbXBvcnQgeyBFbW9qaVBpY2tlciB9IGZyb20gJy4uLy4uL3RzL2NvbXBvbmVudHMvZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHsgRW1vamkgfSBmcm9tICcuLi8uLi90cy9jb21wb25lbnRzL2Vtb2ppL0Vtb2ppJztcbmltcG9ydCB7IFBvcHBlclJvb3RDb250ZXh0IH0gZnJvbSAnLi4vLi4vdHMvY29tcG9uZW50cy9Qb3BwZXJSb290Q29udGV4dCc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAnLi4vdXRpbC9pMThuJztcblxuZXhwb3J0IHR5cGUgTW9kZSA9ICdyZW1vdmFibGUnIHwgJ3BpY2stZW1vamknIHwgJ2FkZCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gUGFydGlhbDxcbiAgUGljazxFbW9qaVBpY2tlclByb3BzLCAnc2tpblRvbmUnIHwgJ29uU2V0U2tpblRvbmUnPlxuPiAmXG4gIFBhcnRpYWw8UGljazxEcm9wWm9uZVByb3BzLCAnb25Ecm9wJz4+ICYge1xuICAgIHJlYWRvbmx5IGlkPzogc3RyaW5nO1xuICAgIHJlYWRvbmx5IGVtb2ppRGF0YT86IEVtb2ppUGlja0RhdGFUeXBlO1xuICAgIHJlYWRvbmx5IGltYWdlPzogc3RyaW5nO1xuICAgIHJlYWRvbmx5IG1vZGU/OiBNb2RlO1xuICAgIHJlYWRvbmx5IHNob3dHdWlkZT86IGJvb2xlYW47XG4gICAgb25QaWNrRW1vamk/KHtcbiAgICAgIGlkLFxuICAgICAgZW1vamksXG4gICAgfToge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIGVtb2ppOiBFbW9qaVBpY2tEYXRhVHlwZTtcbiAgICB9KTogdW5rbm93bjtcbiAgICBvblJlbW92ZT8oaWQ6IHN0cmluZyk6IHVua25vd247XG4gIH07XG5cbmNvbnN0IHNwaW5uZXJTdmcgPSAoXG4gIDxzdmcgd2lkdGg9ezU2fSBoZWlnaHQ9ezU2fT5cbiAgICA8cGF0aCBkPVwiTTUyLjM2IDE0LjE4NUEyNy44NzIgMjcuODcyIDAgMDE1NiAyOGMwIDE1LjQ2NC0xMi41MzYgMjgtMjggMjh2LTJjMTQuMzYgMCAyNi0xMS42NCAyNi0yNiAwLTQuNjYtMS4yMjYtOS4wMzMtMy4zNzItMTIuODE1bDEuNzMyLTF6XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBjbG9zZVN2ZyA9IChcbiAgPHN2Z1xuICAgIHZpZXdCb3g9XCIwIDAgMTYgMTZcIlxuICAgIHdpZHRoPVwiMTZweFwiXG4gICAgaGVpZ2h0PVwiMTZweFwiXG4gICAgY2xhc3NOYW1lPXtzdHlsZXMuY2xvc2VCdXR0b25JY29ufVxuICA+XG4gICAgPHBhdGggZD1cIk0xMy40IDMuM2wtLjgtLjZMOCA3LjMgMy4zIDIuN2wtLjYuNkw3LjMgOGwtNC42IDQuNi42LjhMOCA4LjdsNC42IDQuNy44LS44TDguNyA4elwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgSW1hZ2VIYW5kbGUgPSBTb3J0YWJsZUhhbmRsZSgocHJvcHM6IHsgc3JjOiBzdHJpbmcgfSkgPT4gKFxuICA8aW1nIGNsYXNzTmFtZT17c3R5bGVzLmltYWdlfSB7Li4ucHJvcHN9IGFsdD1cIlN0aWNrZXJcIiAvPlxuKSk7XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyRnJhbWUgPSBSZWFjdC5tZW1vKFxuICAoe1xuICAgIGlkLFxuICAgIGVtb2ppRGF0YSxcbiAgICBpbWFnZSxcbiAgICBzaG93R3VpZGUsXG4gICAgbW9kZSxcbiAgICBvblJlbW92ZSxcbiAgICBvblBpY2tFbW9qaSxcbiAgICBza2luVG9uZSxcbiAgICBvblNldFNraW5Ub25lLFxuICAgIG9uRHJvcCxcbiAgfTogUHJvcHMpID0+IHtcbiAgICBjb25zdCBpMThuID0gdXNlSTE4bigpO1xuICAgIGNvbnN0IFtlbW9qaVBpY2tlck9wZW4sIHNldEVtb2ppUGlja2VyT3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vtb2ppUG9wcGVyUm9vdCwgc2V0RW1vamlQb3BwZXJSb290XSA9XG4gICAgICBSZWFjdC51c2VTdGF0ZTxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICAgIGNvbnN0IFtwcmV2aWV3QWN0aXZlLCBzZXRQcmV2aWV3QWN0aXZlXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbcHJldmlld1BvcHBlclJvb3QsIHNldFByZXZpZXdQb3BwZXJSb290XSA9XG4gICAgICBSZWFjdC51c2VTdGF0ZTxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICAgIGNvbnN0IHRpbWVyUmVmID0gUmVhY3QudXNlUmVmPG51bWJlcj4oKTtcblxuICAgIGNvbnN0IGhhbmRsZVRvZ2dsZUVtb2ppUGlja2VyID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgc2V0RW1vamlQaWNrZXJPcGVuKG9wZW4gPT4gIW9wZW4pO1xuICAgIH0sIFtzZXRFbW9qaVBpY2tlck9wZW5dKTtcblxuICAgIGNvbnN0IGhhbmRsZVBpY2tFbW9qaSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICAgKGVtb2ppOiBFbW9qaVBpY2tEYXRhVHlwZSkgPT4ge1xuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25QaWNrRW1vamkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnU3RpY2tlckZyYW1lL2hhbmRsZVBpY2tFbW9qaTogb25QaWNrRW1vamkgd2FzIG5vdCBwcm92aWRlZCEnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBvblBpY2tFbW9qaSh7IGlkLCBlbW9qaSB9KTtcbiAgICAgICAgc2V0RW1vamlQaWNrZXJPcGVuKGZhbHNlKTtcbiAgICAgIH0sXG4gICAgICBbaWQsIG9uUGlja0Vtb2ppLCBzZXRFbW9qaVBpY2tlck9wZW5dXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgIGlmICghaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFvblJlbW92ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1N0aWNrZXJGcmFtZS9oYW5kbGVSZW1vdmU6IG9uUmVtb3ZlIHdhcyBub3QgcHJvdmlkZWQhJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgb25SZW1vdmUoaWQpO1xuICAgIH0sIFtvblJlbW92ZSwgaWRdKTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlRW50ZXIgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgdGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2V0UHJldmlld0FjdGl2ZSh0cnVlKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfSwgW3RpbWVyUmVmLCBzZXRQcmV2aWV3QWN0aXZlXSk7XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZUxlYXZlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgc2V0UHJldmlld0FjdGl2ZShmYWxzZSk7XG4gICAgfSwgW3RpbWVyUmVmLCBzZXRQcmV2aWV3QWN0aXZlXSk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoXG4gICAgICAoKSA9PiAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lclJlZi5jdXJyZW50KTtcbiAgICAgIH0sXG4gICAgICBbdGltZXJSZWZdXG4gICAgKTtcblxuICAgIGNvbnN0IHsgY3JlYXRlUm9vdCwgcmVtb3ZlUm9vdCB9ID0gUmVhY3QudXNlQ29udGV4dChQb3BwZXJSb290Q29udGV4dCk7XG5cbiAgICAvLyBDcmVhdGUgcG9wcGVyIHJvb3QgYW5kIGhhbmRsZSBvdXRzaWRlIGNsaWNrc1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoZW1vamlQaWNrZXJPcGVuKSB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KCk7XG4gICAgICAgIHNldEVtb2ppUG9wcGVyUm9vdChyb290KTtcbiAgICAgICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKHsgdGFyZ2V0IH06IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoIXJvb3QuY29udGFpbnModGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgICAgICBzZXRFbW9qaVBpY2tlck9wZW4oZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgcmVtb3ZlUm9vdChyb290KTtcbiAgICAgICAgICBzZXRFbW9qaVBvcHBlclJvb3QobnVsbCk7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9LCBbXG4gICAgICBjcmVhdGVSb290LFxuICAgICAgZW1vamlQaWNrZXJPcGVuLFxuICAgICAgcmVtb3ZlUm9vdCxcbiAgICAgIHNldEVtb2ppUGlja2VyT3BlbixcbiAgICAgIHNldEVtb2ppUG9wcGVyUm9vdCxcbiAgICBdKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAobW9kZSAhPT0gJ3BpY2stZW1vamknICYmIGltYWdlICYmIHByZXZpZXdBY3RpdmUpIHtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3QoKTtcbiAgICAgICAgc2V0UHJldmlld1BvcHBlclJvb3Qocm9vdCk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICByZW1vdmVSb290KHJvb3QpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9LCBbXG4gICAgICBjcmVhdGVSb290LFxuICAgICAgaW1hZ2UsXG4gICAgICBtb2RlLFxuICAgICAgcHJldmlld0FjdGl2ZSxcbiAgICAgIHJlbW92ZVJvb3QsXG4gICAgICBzZXRQcmV2aWV3UG9wcGVyUm9vdCxcbiAgICBdKTtcblxuICAgIGNvbnN0IFtkcmFnQWN0aXZlLCBzZXREcmFnQWN0aXZlXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBjb250YWluZXJDbGFzcyA9IGRyYWdBY3RpdmUgPyBzdHlsZXMuZHJhZ0FjdGl2ZSA6IHN0eWxlcy5jb250YWluZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcHBlck1hbmFnZXI+XG4gICAgICAgIDxQb3BwZXJSZWZlcmVuY2U+XG4gICAgICAgICAgeyh7IHJlZjogcm9vdFJlZiB9KSA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3N9XG4gICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17aGFuZGxlTW91c2VFbnRlcn1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICAgICAgICByZWY9e3Jvb3RSZWZ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgICAgICBtb2RlICE9PSAnYWRkJyA/IChcbiAgICAgICAgICAgICAgICAgIGltYWdlID8gKFxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2VIYW5kbGUgc3JjPXtpbWFnZX0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc3Bpbm5lcn0+e3NwaW5uZXJTdmd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSA6IG51bGxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7c2hvd0d1aWRlICYmIG1vZGUgIT09ICdhZGQnID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZ3VpZGV9IC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICB7bW9kZSA9PT0gJ2FkZCcgJiYgb25Ecm9wID8gKFxuICAgICAgICAgICAgICAgIDxEcm9wWm9uZVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1Ecm9wU3RhZ2UtLWRyYWdEcm9wJyl9XG4gICAgICAgICAgICAgICAgICBvbkRyb3A9e29uRHJvcH1cbiAgICAgICAgICAgICAgICAgIGlubmVyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdBY3RpdmU9e3NldERyYWdBY3RpdmV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIHttb2RlID09PSAncmVtb3ZhYmxlJyA/IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1Ecm9wU3RhZ2UtLXJlbW92ZVN0aWNrZXInKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmNsb3NlQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgLy8gUmV2ZXJzZSB0aGUgbW91c2VlbnRlci9sZWF2ZSBsb2dpYyBmb3IgdGhlIHJlbW92ZSBidXR0b24gc29cbiAgICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IGFjY2lkZW50YWxseSBjb3ZlciB0aGUgcmVtb3ZlIGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtoYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZUVudGVyfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjbG9zZVN2Z31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIHttb2RlID09PSAncGljay1lbW9qaScgPyAoXG4gICAgICAgICAgICAgICAgPFBvcHBlck1hbmFnZXI+XG4gICAgICAgICAgICAgICAgICA8UG9wcGVyUmVmZXJlbmNlPlxuICAgICAgICAgICAgICAgICAgICB7KHsgcmVmIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZW1vamlCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVFbW9qaVBpY2tlcn1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW1vamlEYXRhID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RW1vamkgey4uLmVtb2ppRGF0YX0gc2l6ZT17MjR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8QWRkRW1vamkgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L1BvcHBlclJlZmVyZW5jZT5cbiAgICAgICAgICAgICAgICAgIHtlbW9qaVBpY2tlck9wZW4gJiYgZW1vamlQb3BwZXJSb290XG4gICAgICAgICAgICAgICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgPFBvcHBlciBwbGFjZW1lbnQ9XCJib3R0b20tc3RhcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyh7IHJlZiwgc3R5bGUgfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFbW9qaVBpY2tlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGlja0Vtb2ppPXtoYW5kbGVQaWNrRW1vaml9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNldFNraW5Ub25lPXtvblNldFNraW5Ub25lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17aGFuZGxlVG9nZ2xlRW1vamlQaWNrZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUG9wcGVyPixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtb2ppUG9wcGVyUm9vdFxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICAgIDwvUG9wcGVyTWFuYWdlcj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIHttb2RlICE9PSAncGljay1lbW9qaScgJiZcbiAgICAgICAgICAgICAgaW1hZ2UgJiZcbiAgICAgICAgICAgICAgcHJldmlld0FjdGl2ZSAmJlxuICAgICAgICAgICAgICBwcmV2aWV3UG9wcGVyUm9vdFxuICAgICAgICAgICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgICAgICAgICA8UG9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50PVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ29mZnNldCcsIG9wdGlvbnM6IHsgb2Zmc2V0OiBbdW5kZWZpbmVkLCA4XSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHsoeyByZWYsIHN0eWxlLCBhcnJvd1Byb3BzLCBwbGFjZW1lbnQgfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0aWNrZXJQcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlPXtpbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dQcm9wcz17YXJyb3dQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50PXtwbGFjZW1lbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvUG9wcGVyPixcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1BvcHBlclJvb3RcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L1BvcHBlclJlZmVyZW5jZT5cbiAgICAgIDwvUG9wcGVy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
