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
var StickerButton_exports = {};
__export(StickerButton_exports, {
  StickerButton: () => StickerButton
});
module.exports = __toCommonJS(StickerButton_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_react_popper = require("react-popper");
var import_react_dom = require("react-dom");
var import_StickerPicker = require("./StickerPicker");
var import_lib = require("./lib");
var import_popperUtil = require("../../util/popperUtil");
var import_theme = require("../../util/theme");
var KeyboardLayout = __toESM(require("../../services/keyboardLayout"));
var import_useRefMerger = require("../../hooks/useRefMerger");
const StickerButton = React.memo(({
  className,
  i18n,
  clearInstalledStickerPack,
  onClickAddPack,
  onPickSticker,
  recentStickers,
  receivedPacks,
  installedPack,
  installedPacks,
  blessedPacks,
  knownPacks,
  showIntroduction,
  clearShowIntroduction,
  showPickerHint,
  clearShowPickerHint,
  position = "top-end",
  theme
}) => {
  const [open, setOpen] = React.useState(false);
  const [popperRoot, setPopperRoot] = React.useState(null);
  const buttonRef = React.useRef(null);
  const refMerger = (0, import_useRefMerger.useRefMerger)();
  const handleClickButton = React.useCallback(() => {
    clearInstalledStickerPack();
    clearShowIntroduction();
    if (installedPacks.length === 0) {
      onClickAddPack?.();
    } else if (popperRoot) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [
    clearInstalledStickerPack,
    clearShowIntroduction,
    installedPacks,
    onClickAddPack,
    popperRoot,
    setOpen
  ]);
  const handlePickSticker = React.useCallback((packId, stickerId, url) => {
    setOpen(false);
    onPickSticker(packId, stickerId, url);
  }, [setOpen, onPickSticker]);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const handleClickAddPack = React.useCallback(() => {
    setOpen(false);
    if (showPickerHint) {
      clearShowPickerHint();
    }
    onClickAddPack?.();
  }, [onClickAddPack, showPickerHint, clearShowPickerHint]);
  const handleClearIntroduction = React.useCallback(() => {
    clearInstalledStickerPack();
    clearShowIntroduction();
  }, [clearInstalledStickerPack, clearShowIntroduction]);
  React.useEffect(() => {
    if (open) {
      const root = document.createElement("div");
      setPopperRoot(root);
      document.body.appendChild(root);
      const handleOutsideClick = /* @__PURE__ */ __name(({ target }) => {
        const targetElement = target;
        const targetClassName = targetElement ? targetElement.className || "" : "";
        const isMissingButtonClass = !targetClassName || targetClassName.indexOf("module-sticker-picker__header__button") < 0;
        if (!root.contains(targetElement) && isMissingButtonClass && targetElement !== buttonRef.current) {
          setOpen(false);
        }
      }, "handleOutsideClick");
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.body.removeChild(root);
        document.removeEventListener("click", handleOutsideClick);
        setPopperRoot(null);
      };
    }
    return import_lodash.noop;
  }, [open, setOpen, setPopperRoot]);
  React.useEffect(() => {
    const handleKeydown = /* @__PURE__ */ __name((event) => {
      const { ctrlKey, metaKey, shiftKey } = event;
      const commandKey = (0, import_lodash.get)(window, "platform") === "darwin" && metaKey;
      const controlKey = (0, import_lodash.get)(window, "platform") !== "darwin" && ctrlKey;
      const commandOrCtrl = commandKey || controlKey;
      const key = KeyboardLayout.lookup(event);
      const panels = document.querySelectorAll(".conversation .panel");
      if (panels && panels.length > 1) {
        return;
      }
      if (commandOrCtrl && shiftKey && (key === "s" || key === "S")) {
        event.stopPropagation();
        event.preventDefault();
        setOpen(!open);
      }
    }, "handleKeydown");
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open, setOpen]);
  React.useEffect(() => {
    if (installedPack) {
      const timerId = setTimeout(clearInstalledStickerPack, 10 * 1e3);
      return () => {
        clearTimeout(timerId);
      };
    }
    return import_lodash.noop;
  }, [installedPack, clearInstalledStickerPack]);
  if ((0, import_lib.countStickers)({
    knownPacks,
    blessedPacks,
    installedPacks,
    receivedPacks
  }) === 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(import_react_popper.Manager, null, /* @__PURE__ */ React.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ React.createElement("button", {
    type: "button",
    ref: refMerger(buttonRef, ref),
    onClick: handleClickButton,
    className: (0, import_classnames.default)({
      "module-sticker-button__button": true,
      "module-sticker-button__button--active": open
    }, className),
    "aria-label": i18n("stickers--StickerPicker--Open")
  })), !open && !showIntroduction && installedPack ? /* @__PURE__ */ React.createElement(import_react_popper.Popper, {
    placement: position,
    key: installedPack.id,
    modifiers: [(0, import_popperUtil.offsetDistanceModifier)(6)]
  }, ({ ref, style, placement, arrowProps }) => /* @__PURE__ */ React.createElement("div", {
    className: theme ? (0, import_theme.themeClassName)(theme) : void 0
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    ref,
    style,
    className: "module-sticker-button__tooltip",
    onClick: clearInstalledStickerPack
  }, installedPack.cover ? /* @__PURE__ */ React.createElement("img", {
    className: "module-sticker-button__tooltip__image",
    src: installedPack.cover.url,
    alt: installedPack.title
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-button__tooltip__image-placeholder"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "module-sticker-button__tooltip__text"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "module-sticker-button__tooltip__text__title"
  }, installedPack.title), " ", "installed"), /* @__PURE__ */ React.createElement("div", {
    ref: arrowProps.ref,
    style: arrowProps.style,
    className: (0, import_classnames.default)("module-sticker-button__tooltip__triangle", `module-sticker-button__tooltip__triangle--${placement}`)
  })))) : null, !open && showIntroduction ? /* @__PURE__ */ React.createElement(import_react_popper.Popper, {
    placement: position,
    modifiers: [(0, import_popperUtil.offsetDistanceModifier)(6)]
  }, ({ ref, style, placement, arrowProps }) => /* @__PURE__ */ React.createElement("div", {
    className: theme ? (0, import_theme.themeClassName)(theme) : void 0
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    ref,
    style,
    className: (0, import_classnames.default)("module-sticker-button__tooltip", "module-sticker-button__tooltip--introduction"),
    onClick: handleClearIntroduction
  }, /* @__PURE__ */ React.createElement("img", {
    className: "module-sticker-button__tooltip--introduction__image",
    srcSet: "images/sticker_splash@1x.png 1x, images/sticker_splash@2x.png 2x",
    alt: i18n("stickers--StickerManager--Introduction--Image")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-button__tooltip--introduction__meta"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-button__tooltip--introduction__meta__title"
  }, i18n("stickers--StickerManager--Introduction--Title")), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-button__tooltip--introduction__meta__subtitle"
  }, i18n("stickers--StickerManager--Introduction--Body"))), /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-button__tooltip--introduction__close"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "module-sticker-button__tooltip--introduction__close__button",
    onClick: handleClearIntroduction,
    "aria-label": i18n("close")
  })), /* @__PURE__ */ React.createElement("div", {
    ref: arrowProps.ref,
    style: arrowProps.style,
    className: (0, import_classnames.default)("module-sticker-button__tooltip__triangle", "module-sticker-button__tooltip__triangle--introduction", `module-sticker-button__tooltip__triangle--${placement}`)
  })))) : null, open && popperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement(import_react_popper.Popper, {
    placement: position
  }, ({ ref, style }) => /* @__PURE__ */ React.createElement("div", {
    className: theme ? (0, import_theme.themeClassName)(theme) : void 0
  }, /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ref,
    i18n,
    style,
    packs: installedPacks,
    onClose: handleClose,
    onClickAddPack: onClickAddPack ? handleClickAddPack : void 0,
    onPickSticker: handlePickSticker,
    recentStickers,
    showPickerHint
  }))), popperRoot) : null);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlckJ1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGdldCwgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBNYW5hZ2VyLCBQb3BwZXIsIFJlZmVyZW5jZSB9IGZyb20gJ3JlYWN0LXBvcHBlcic7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgdHlwZSB7IFN0aWNrZXJQYWNrVHlwZSwgU3RpY2tlclR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9zdGlja2Vycyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgVGhlbWUgfSBmcm9tICcuLi8uLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IFN0aWNrZXJQaWNrZXIgfSBmcm9tICcuL1N0aWNrZXJQaWNrZXInO1xuaW1wb3J0IHsgY291bnRTdGlja2VycyB9IGZyb20gJy4vbGliJztcbmltcG9ydCB7IG9mZnNldERpc3RhbmNlTW9kaWZpZXIgfSBmcm9tICcuLi8uLi91dGlsL3BvcHBlclV0aWwnO1xuaW1wb3J0IHsgdGhlbWVDbGFzc05hbWUgfSBmcm9tICcuLi8uLi91dGlsL3RoZW1lJztcbmltcG9ydCAqIGFzIEtleWJvYXJkTGF5b3V0IGZyb20gJy4uLy4uL3NlcnZpY2VzL2tleWJvYXJkTGF5b3V0JztcbmltcG9ydCB7IHVzZVJlZk1lcmdlciB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVJlZk1lcmdlcic7XG5cbmV4cG9ydCB0eXBlIE93blByb3BzID0ge1xuICByZWFkb25seSBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG4gIHJlYWRvbmx5IHJlY2VpdmVkUGFja3M6IFJlYWRvbmx5QXJyYXk8U3RpY2tlclBhY2tUeXBlPjtcbiAgcmVhZG9ubHkgaW5zdGFsbGVkUGFja3M6IFJlYWRvbmx5QXJyYXk8U3RpY2tlclBhY2tUeXBlPjtcbiAgcmVhZG9ubHkgYmxlc3NlZFBhY2tzOiBSZWFkb25seUFycmF5PFN0aWNrZXJQYWNrVHlwZT47XG4gIHJlYWRvbmx5IGtub3duUGFja3M6IFJlYWRvbmx5QXJyYXk8U3RpY2tlclBhY2tUeXBlPjtcbiAgcmVhZG9ubHkgaW5zdGFsbGVkUGFjaz86IFN0aWNrZXJQYWNrVHlwZSB8IG51bGw7XG4gIHJlYWRvbmx5IHJlY2VudFN0aWNrZXJzOiBSZWFkb25seUFycmF5PFN0aWNrZXJUeXBlPjtcbiAgcmVhZG9ubHkgY2xlYXJJbnN0YWxsZWRTdGlja2VyUGFjazogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgb25DbGlja0FkZFBhY2s/OiAoKSA9PiB1bmtub3duO1xuICByZWFkb25seSBvblBpY2tTdGlja2VyOiAoXG4gICAgcGFja0lkOiBzdHJpbmcsXG4gICAgc3RpY2tlcklkOiBudW1iZXIsXG4gICAgdXJsOiBzdHJpbmdcbiAgKSA9PiB1bmtub3duO1xuICByZWFkb25seSBzaG93SW50cm9kdWN0aW9uPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2xlYXJTaG93SW50cm9kdWN0aW9uOiAoKSA9PiB1bmtub3duO1xuICByZWFkb25seSBzaG93UGlja2VySGludDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2xlYXJTaG93UGlja2VySGludDogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgcG9zaXRpb24/OiAndG9wLWVuZCcgfCAndG9wLXN0YXJ0JztcbiAgcmVhZG9ubHkgdGhlbWU/OiBUaGVtZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gT3duUHJvcHM7XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyQnV0dG9uID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBjbGFzc05hbWUsXG4gICAgaTE4bixcbiAgICBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrLFxuICAgIG9uQ2xpY2tBZGRQYWNrLFxuICAgIG9uUGlja1N0aWNrZXIsXG4gICAgcmVjZW50U3RpY2tlcnMsXG4gICAgcmVjZWl2ZWRQYWNrcyxcbiAgICBpbnN0YWxsZWRQYWNrLFxuICAgIGluc3RhbGxlZFBhY2tzLFxuICAgIGJsZXNzZWRQYWNrcyxcbiAgICBrbm93blBhY2tzLFxuICAgIHNob3dJbnRyb2R1Y3Rpb24sXG4gICAgY2xlYXJTaG93SW50cm9kdWN0aW9uLFxuICAgIHNob3dQaWNrZXJIaW50LFxuICAgIGNsZWFyU2hvd1BpY2tlckhpbnQsXG4gICAgcG9zaXRpb24gPSAndG9wLWVuZCcsXG4gICAgdGhlbWUsXG4gIH06IFByb3BzKSA9PiB7XG4gICAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtwb3BwZXJSb290LCBzZXRQb3BwZXJSb290XSA9IFJlYWN0LnVzZVN0YXRlPEhUTUxFbGVtZW50IHwgbnVsbD4oXG4gICAgICBudWxsXG4gICAgKTtcbiAgICBjb25zdCBidXR0b25SZWYgPSBSZWFjdC51c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgICBjb25zdCByZWZNZXJnZXIgPSB1c2VSZWZNZXJnZXIoKTtcblxuICAgIGNvbnN0IGhhbmRsZUNsaWNrQnV0dG9uID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgLy8gQ2xlYXIgdG9vbHRpcCBzdGF0ZVxuICAgICAgY2xlYXJJbnN0YWxsZWRTdGlja2VyUGFjaygpO1xuICAgICAgY2xlYXJTaG93SW50cm9kdWN0aW9uKCk7XG5cbiAgICAgIC8vIEhhbmRsZSBidXR0b24gY2xpY2tcbiAgICAgIGlmIChpbnN0YWxsZWRQYWNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb25DbGlja0FkZFBhY2s/LigpO1xuICAgICAgfSBlbHNlIGlmIChwb3BwZXJSb290KSB7XG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrLFxuICAgICAgY2xlYXJTaG93SW50cm9kdWN0aW9uLFxuICAgICAgaW5zdGFsbGVkUGFja3MsXG4gICAgICBvbkNsaWNrQWRkUGFjayxcbiAgICAgIHBvcHBlclJvb3QsXG4gICAgICBzZXRPcGVuLFxuICAgIF0pO1xuXG4gICAgY29uc3QgaGFuZGxlUGlja1N0aWNrZXIgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIChwYWNrSWQ6IHN0cmluZywgc3RpY2tlcklkOiBudW1iZXIsIHVybDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICBvblBpY2tTdGlja2VyKHBhY2tJZCwgc3RpY2tlcklkLCB1cmwpO1xuICAgICAgfSxcbiAgICAgIFtzZXRPcGVuLCBvblBpY2tTdGlja2VyXVxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVDbG9zZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIH0sIFtzZXRPcGVuXSk7XG5cbiAgICBjb25zdCBoYW5kbGVDbGlja0FkZFBhY2sgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgIGlmIChzaG93UGlja2VySGludCkge1xuICAgICAgICBjbGVhclNob3dQaWNrZXJIaW50KCk7XG4gICAgICB9XG4gICAgICBvbkNsaWNrQWRkUGFjaz8uKCk7XG4gICAgfSwgW29uQ2xpY2tBZGRQYWNrLCBzaG93UGlja2VySGludCwgY2xlYXJTaG93UGlja2VySGludF0pO1xuXG4gICAgY29uc3QgaGFuZGxlQ2xlYXJJbnRyb2R1Y3Rpb24gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrKCk7XG4gICAgICBjbGVhclNob3dJbnRyb2R1Y3Rpb24oKTtcbiAgICB9LCBbY2xlYXJJbnN0YWxsZWRTdGlja2VyUGFjaywgY2xlYXJTaG93SW50cm9kdWN0aW9uXSk7XG5cbiAgICAvLyBDcmVhdGUgcG9wcGVyIHJvb3QgYW5kIGhhbmRsZSBvdXRzaWRlIGNsaWNrc1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAob3Blbikge1xuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNldFBvcHBlclJvb3Qocm9vdCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9ICh7IHRhcmdldCB9OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICBjb25zdCB0YXJnZXRDbGFzc05hbWUgPSB0YXJnZXRFbGVtZW50XG4gICAgICAgICAgICA/IHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lIHx8ICcnXG4gICAgICAgICAgICA6ICcnO1xuXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBzcGVjaWFsLWNhc2Ugc3RpY2tlciBwaWNrZXIgaGVhZGVyIGJ1dHRvbnMsIGJlY2F1c2UgdGhleSBjYW5cbiAgICAgICAgICAvLyAgIGRpc2FwcGVhciBhZnRlciBiZWluZyBjbGlja2VkLCB3aGljaCBicmVha3MgdGhlIC5jb250YWlucygpIGNoZWNrIGJlbG93LlxuICAgICAgICAgIGNvbnN0IGlzTWlzc2luZ0J1dHRvbkNsYXNzID1cbiAgICAgICAgICAgICF0YXJnZXRDbGFzc05hbWUgfHxcbiAgICAgICAgICAgIHRhcmdldENsYXNzTmFtZS5pbmRleE9mKCdtb2R1bGUtc3RpY2tlci1waWNrZXJfX2hlYWRlcl9fYnV0dG9uJykgPFxuICAgICAgICAgICAgICAwO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXJvb3QuY29udGFpbnModGFyZ2V0RWxlbWVudCkgJiZcbiAgICAgICAgICAgIGlzTWlzc2luZ0J1dHRvbkNsYXNzICYmXG4gICAgICAgICAgICB0YXJnZXRFbGVtZW50ICE9PSBidXR0b25SZWYuY3VycmVudFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU91dHNpZGVDbGljayk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHJvb3QpO1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICAgICAgICBzZXRQb3BwZXJSb290KG51bGwpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9LCBbb3Blbiwgc2V0T3Blbiwgc2V0UG9wcGVyUm9vdF0pO1xuXG4gICAgLy8gSW5zdGFsbCBrZXlib2FyZCBzaG9ydGN1dCB0byBvcGVuIHN0aWNrZXIgcGlja2VyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZUtleWRvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgeyBjdHJsS2V5LCBtZXRhS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRLZXkgPSBnZXQod2luZG93LCAncGxhdGZvcm0nKSA9PT0gJ2RhcndpbicgJiYgbWV0YUtleTtcbiAgICAgICAgY29uc3QgY29udHJvbEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpICE9PSAnZGFyd2luJyAmJiBjdHJsS2V5O1xuICAgICAgICBjb25zdCBjb21tYW5kT3JDdHJsID0gY29tbWFuZEtleSB8fCBjb250cm9sS2V5O1xuICAgICAgICBjb25zdCBrZXkgPSBLZXlib2FyZExheW91dC5sb29rdXAoZXZlbnQpO1xuXG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gb3BlbiB1cCBpZiB0aGUgY29udmVyc2F0aW9uIGhhcyBhbnkgcGFuZWxzIG9wZW5cbiAgICAgICAgY29uc3QgcGFuZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnZlcnNhdGlvbiAucGFuZWwnKTtcbiAgICAgICAgaWYgKHBhbmVscyAmJiBwYW5lbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tYW5kT3JDdHJsICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICdzJyB8fCBrZXkgPT09ICdTJykpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgc2V0T3Blbighb3Blbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5ZG93bik7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlkb3duKTtcbiAgICAgIH07XG4gICAgfSwgW29wZW4sIHNldE9wZW5dKTtcblxuICAgIC8vIENsZWFyIHRoZSBpbnN0YWxsZWQgcGFjayBhZnRlciBvbmUgbWludXRlXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmIChpbnN0YWxsZWRQYWNrKSB7XG4gICAgICAgIGNvbnN0IHRpbWVySWQgPSBzZXRUaW1lb3V0KGNsZWFySW5zdGFsbGVkU3RpY2tlclBhY2ssIDEwICogMTAwMCk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub29wO1xuICAgIH0sIFtpbnN0YWxsZWRQYWNrLCBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrXSk7XG5cbiAgICBpZiAoXG4gICAgICBjb3VudFN0aWNrZXJzKHtcbiAgICAgICAga25vd25QYWNrcyxcbiAgICAgICAgYmxlc3NlZFBhY2tzLFxuICAgICAgICBpbnN0YWxsZWRQYWNrcyxcbiAgICAgICAgcmVjZWl2ZWRQYWNrcyxcbiAgICAgIH0pID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1hbmFnZXI+XG4gICAgICAgIDxSZWZlcmVuY2U+XG4gICAgICAgICAgeyh7IHJlZiB9KSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICByZWY9e3JlZk1lcmdlcihidXR0b25SZWYsIHJlZil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrQnV0dG9ufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgJ21vZHVsZS1zdGlja2VyLWJ1dHRvbl9fYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICdtb2R1bGUtc3RpY2tlci1idXR0b25fX2J1dHRvbi0tYWN0aXZlJzogb3BlbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdzdGlja2Vycy0tU3RpY2tlclBpY2tlci0tT3BlbicpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L1JlZmVyZW5jZT5cbiAgICAgICAgeyFvcGVuICYmICFzaG93SW50cm9kdWN0aW9uICYmIGluc3RhbGxlZFBhY2sgPyAoXG4gICAgICAgICAgPFBvcHBlclxuICAgICAgICAgICAgcGxhY2VtZW50PXtwb3NpdGlvbn1cbiAgICAgICAgICAgIGtleT17aW5zdGFsbGVkUGFjay5pZH1cbiAgICAgICAgICAgIG1vZGlmaWVycz17W29mZnNldERpc3RhbmNlTW9kaWZpZXIoNildfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsoeyByZWYsIHN0eWxlLCBwbGFjZW1lbnQsIGFycm93UHJvcHMgfSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhlbWUgPyB0aGVtZUNsYXNzTmFtZSh0aGVtZSkgOiB1bmRlZmluZWR9PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXBcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xlYXJJbnN0YWxsZWRTdGlja2VyUGFja31cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5zdGFsbGVkUGFjay5jb3ZlciA/IChcbiAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLWJ1dHRvbl9fdG9vbHRpcF9faW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIHNyYz17aW5zdGFsbGVkUGFjay5jb3Zlci51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgYWx0PXtpbnN0YWxsZWRQYWNrLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXBfX2ltYWdlLXBsYWNlaG9sZGVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXBfX3RleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItYnV0dG9uX190b29sdGlwX190ZXh0X190aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtpbnN0YWxsZWRQYWNrLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+eycgJ31cbiAgICAgICAgICAgICAgICAgICAgaW5zdGFsbGVkXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHJlZj17YXJyb3dQcm9wcy5yZWZ9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXthcnJvd1Byb3BzLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZS1zdGlja2VyLWJ1dHRvbl9fdG9vbHRpcF9fdHJpYW5nbGUnLFxuICAgICAgICAgICAgICAgICAgICAgIGBtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXBfX3RyaWFuZ2xlLS0ke3BsYWNlbWVudH1gXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Qb3BwZXI+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IW9wZW4gJiYgc2hvd0ludHJvZHVjdGlvbiA/IChcbiAgICAgICAgICA8UG9wcGVyIHBsYWNlbWVudD17cG9zaXRpb259IG1vZGlmaWVycz17W29mZnNldERpc3RhbmNlTW9kaWZpZXIoNildfT5cbiAgICAgICAgICAgIHsoeyByZWYsIHN0eWxlLCBwbGFjZW1lbnQsIGFycm93UHJvcHMgfSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhlbWUgPyB0aGVtZUNsYXNzTmFtZSh0aGVtZSkgOiB1bmRlZmluZWR9PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICdtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXAnLFxuICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLXN0aWNrZXItYnV0dG9uX190b29sdGlwLS1pbnRyb2R1Y3Rpb24nXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xlYXJJbnRyb2R1Y3Rpb259XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXAtLWludHJvZHVjdGlvbl9faW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICBzcmNTZXQ9XCJpbWFnZXMvc3RpY2tlcl9zcGxhc2hAMXgucG5nIDF4LCBpbWFnZXMvc3RpY2tlcl9zcGxhc2hAMngucG5nIDJ4XCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtpMThuKCdzdGlja2Vycy0tU3RpY2tlck1hbmFnZXItLUludHJvZHVjdGlvbi0tSW1hZ2UnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGlja2VyLWJ1dHRvbl9fdG9vbHRpcC0taW50cm9kdWN0aW9uX19tZXRhXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItYnV0dG9uX190b29sdGlwLS1pbnRyb2R1Y3Rpb25fX21ldGFfX3RpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2kxOG4oJ3N0aWNrZXJzLS1TdGlja2VyTWFuYWdlci0tSW50cm9kdWN0aW9uLS1UaXRsZScpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXAtLWludHJvZHVjdGlvbl9fbWV0YV9fc3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aTE4bignc3RpY2tlcnMtLVN0aWNrZXJNYW5hZ2VyLS1JbnRyb2R1Y3Rpb24tLUJvZHknKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItYnV0dG9uX190b29sdGlwLS1pbnRyb2R1Y3Rpb25fX2Nsb3NlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXAtLWludHJvZHVjdGlvbl9fY2xvc2VfX2J1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xlYXJJbnRyb2R1Y3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2xvc2UnKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICByZWY9e2Fycm93UHJvcHMucmVmfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17YXJyb3dQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUtc3RpY2tlci1idXR0b25fX3Rvb2x0aXBfX3RyaWFuZ2xlJyxcbiAgICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLXN0aWNrZXItYnV0dG9uX190b29sdGlwX190cmlhbmdsZS0taW50cm9kdWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICBgbW9kdWxlLXN0aWNrZXItYnV0dG9uX190b29sdGlwX190cmlhbmdsZS0tJHtwbGFjZW1lbnR9YFxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvUG9wcGVyPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge29wZW4gJiYgcG9wcGVyUm9vdFxuICAgICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgICA8UG9wcGVyIHBsYWNlbWVudD17cG9zaXRpb259PlxuICAgICAgICAgICAgICAgIHsoeyByZWYsIHN0eWxlIH0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGVtZSA/IHRoZW1lQ2xhc3NOYW1lKHRoZW1lKSA6IHVuZGVmaW5lZH0+XG4gICAgICAgICAgICAgICAgICAgIDxTdGlja2VyUGlja2VyXG4gICAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgcGFja3M9e2luc3RhbGxlZFBhY2tzfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2hhbmRsZUNsb3NlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tBZGRQYWNrPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tBZGRQYWNrID8gaGFuZGxlQ2xpY2tBZGRQYWNrIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIG9uUGlja1N0aWNrZXI9e2hhbmRsZVBpY2tTdGlja2VyfVxuICAgICAgICAgICAgICAgICAgICAgIHJlY2VudFN0aWNrZXJzPXtyZWNlbnRTdGlja2Vyc31cbiAgICAgICAgICAgICAgICAgICAgICBzaG93UGlja2VySGludD17c2hvd1BpY2tlckhpbnR9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L1BvcHBlcj4sXG4gICAgICAgICAgICAgIHBvcHBlclJvb3RcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG51bGx9XG4gICAgICA8L01hbmFnZXI+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix3QkFBdUI7QUFDdkIsb0JBQTBCO0FBQzFCLDBCQUEyQztBQUMzQyx1QkFBNkI7QUFLN0IsMkJBQThCO0FBQzlCLGlCQUE4QjtBQUM5Qix3QkFBdUM7QUFDdkMsbUJBQStCO0FBQy9CLHFCQUFnQztBQUNoQywwQkFBNkI7QUE0QnRCLE1BQU0sZ0JBQWdCLE1BQU0sS0FDakMsQ0FBQztBQUFBLEVBQ0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1g7QUFBQSxNQUNXO0FBQ1gsUUFBTSxDQUFDLE1BQU0sV0FBVyxNQUFNLFNBQVMsS0FBSztBQUM1QyxRQUFNLENBQUMsWUFBWSxpQkFBaUIsTUFBTSxTQUN4QyxJQUNGO0FBQ0EsUUFBTSxZQUFZLE1BQU0sT0FBaUMsSUFBSTtBQUM3RCxRQUFNLFlBQVksc0NBQWE7QUFFL0IsUUFBTSxvQkFBb0IsTUFBTSxZQUFZLE1BQU07QUFFaEQsOEJBQTBCO0FBQzFCLDBCQUFzQjtBQUd0QixRQUFJLGVBQWUsV0FBVyxHQUFHO0FBQy9CLHVCQUFpQjtBQUFBLElBQ25CLFdBQVcsWUFBWTtBQUNyQixjQUFRLEtBQUs7QUFBQSxJQUNmLE9BQU87QUFDTCxjQUFRLElBQUk7QUFBQSxJQUNkO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxvQkFBb0IsTUFBTSxZQUM5QixDQUFDLFFBQWdCLFdBQW1CLFFBQWdCO0FBQ2xELFlBQVEsS0FBSztBQUNiLGtCQUFjLFFBQVEsV0FBVyxHQUFHO0FBQUEsRUFDdEMsR0FDQSxDQUFDLFNBQVMsYUFBYSxDQUN6QjtBQUVBLFFBQU0sY0FBYyxNQUFNLFlBQVksTUFBTTtBQUMxQyxZQUFRLEtBQUs7QUFBQSxFQUNmLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFWixRQUFNLHFCQUFxQixNQUFNLFlBQVksTUFBTTtBQUNqRCxZQUFRLEtBQUs7QUFDYixRQUFJLGdCQUFnQjtBQUNsQiwwQkFBb0I7QUFBQSxJQUN0QjtBQUNBLHFCQUFpQjtBQUFBLEVBQ25CLEdBQUcsQ0FBQyxnQkFBZ0IsZ0JBQWdCLG1CQUFtQixDQUFDO0FBRXhELFFBQU0sMEJBQTBCLE1BQU0sWUFBWSxNQUFNO0FBQ3RELDhCQUEwQjtBQUMxQiwwQkFBc0I7QUFBQSxFQUN4QixHQUFHLENBQUMsMkJBQTJCLHFCQUFxQixDQUFDO0FBR3JELFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFFBQUksTUFBTTtBQUNSLFlBQU0sT0FBTyxTQUFTLGNBQWMsS0FBSztBQUN6QyxvQkFBYyxJQUFJO0FBQ2xCLGVBQVMsS0FBSyxZQUFZLElBQUk7QUFDOUIsWUFBTSxxQkFBcUIsd0JBQUMsRUFBRSxhQUF5QjtBQUNyRCxjQUFNLGdCQUFnQjtBQUN0QixjQUFNLGtCQUFrQixnQkFDcEIsY0FBYyxhQUFhLEtBQzNCO0FBSUosY0FBTSx1QkFDSixDQUFDLG1CQUNELGdCQUFnQixRQUFRLHVDQUF1QyxJQUM3RDtBQUVKLFlBQ0UsQ0FBQyxLQUFLLFNBQVMsYUFBYSxLQUM1Qix3QkFDQSxrQkFBa0IsVUFBVSxTQUM1QjtBQUNBLGtCQUFRLEtBQUs7QUFBQSxRQUNmO0FBQUEsTUFDRixHQXBCMkI7QUFxQjNCLGVBQVMsaUJBQWlCLFNBQVMsa0JBQWtCO0FBRXJELGFBQU8sTUFBTTtBQUNYLGlCQUFTLEtBQUssWUFBWSxJQUFJO0FBQzlCLGlCQUFTLG9CQUFvQixTQUFTLGtCQUFrQjtBQUN4RCxzQkFBYyxJQUFJO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLE1BQU0sU0FBUyxhQUFhLENBQUM7QUFHakMsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxnQkFBZ0Isd0JBQUMsVUFBeUI7QUFDOUMsWUFBTSxFQUFFLFNBQVMsU0FBUyxhQUFhO0FBQ3ZDLFlBQU0sYUFBYSx1QkFBSSxRQUFRLFVBQVUsTUFBTSxZQUFZO0FBQzNELFlBQU0sYUFBYSx1QkFBSSxRQUFRLFVBQVUsTUFBTSxZQUFZO0FBQzNELFlBQU0sZ0JBQWdCLGNBQWM7QUFDcEMsWUFBTSxNQUFNLGVBQWUsT0FBTyxLQUFLO0FBR3ZDLFlBQU0sU0FBUyxTQUFTLGlCQUFpQixzQkFBc0I7QUFDL0QsVUFBSSxVQUFVLE9BQU8sU0FBUyxHQUFHO0FBQy9CO0FBQUEsTUFDRjtBQUVBLFVBQUksaUJBQWlCLFlBQWEsU0FBUSxPQUFPLFFBQVEsTUFBTTtBQUM3RCxjQUFNLGdCQUFnQjtBQUN0QixjQUFNLGVBQWU7QUFFckIsZ0JBQVEsQ0FBQyxJQUFJO0FBQUEsTUFDZjtBQUFBLElBQ0YsR0FuQnNCO0FBb0J0QixhQUFTLGlCQUFpQixXQUFXLGFBQWE7QUFFbEQsV0FBTyxNQUFNO0FBQ1gsZUFBUyxvQkFBb0IsV0FBVyxhQUFhO0FBQUEsSUFDdkQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQztBQUdsQixRQUFNLFVBQVUsTUFBTTtBQUNwQixRQUFJLGVBQWU7QUFDakIsWUFBTSxVQUFVLFdBQVcsMkJBQTJCLEtBQUssR0FBSTtBQUUvRCxhQUFPLE1BQU07QUFDWCxxQkFBYSxPQUFPO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLGVBQWUseUJBQXlCLENBQUM7QUFFN0MsTUFDRSw4QkFBYztBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUMsTUFBTSxHQUNQO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUNFLG9DQUFDLG1DQUNDLG9DQUFDLHFDQUNFLENBQUMsRUFBRSxVQUNGLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxLQUFLLFVBQVUsV0FBVyxHQUFHO0FBQUEsSUFDN0IsU0FBUztBQUFBLElBQ1QsV0FBVywrQkFDVDtBQUFBLE1BQ0UsaUNBQWlDO0FBQUEsTUFDakMseUNBQXlDO0FBQUEsSUFDM0MsR0FDQSxTQUNGO0FBQUEsSUFDQSxjQUFZLEtBQUssK0JBQStCO0FBQUEsR0FDbEQsQ0FFSixHQUNDLENBQUMsUUFBUSxDQUFDLG9CQUFvQixnQkFDN0Isb0NBQUM7QUFBQSxJQUNDLFdBQVc7QUFBQSxJQUNYLEtBQUssY0FBYztBQUFBLElBQ25CLFdBQVcsQ0FBQyw4Q0FBdUIsQ0FBQyxDQUFDO0FBQUEsS0FFcEMsQ0FBQyxFQUFFLEtBQUssT0FBTyxXQUFXLGlCQUN6QixvQ0FBQztBQUFBLElBQUksV0FBVyxRQUFRLGlDQUFlLEtBQUssSUFBSTtBQUFBLEtBQzlDLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxLQUVSLGNBQWMsUUFDYixvQ0FBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsS0FBSyxjQUFjLE1BQU07QUFBQSxJQUN6QixLQUFLLGNBQWM7QUFBQSxHQUNyQixJQUVBLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsR0FBb0QsR0FFckUsb0NBQUM7QUFBQSxJQUFLLFdBQVU7QUFBQSxLQUNkLG9DQUFDO0FBQUEsSUFBSyxXQUFVO0FBQUEsS0FDYixjQUFjLEtBQ2pCLEdBQVEsS0FBSSxXQUVkLEdBQ0Esb0NBQUM7QUFBQSxJQUNDLEtBQUssV0FBVztBQUFBLElBQ2hCLE9BQU8sV0FBVztBQUFBLElBQ2xCLFdBQVcsK0JBQ1QsNENBQ0EsNkNBQTZDLFdBQy9DO0FBQUEsR0FDRixDQUNGLENBQ0YsQ0FFSixJQUNFLE1BQ0gsQ0FBQyxRQUFRLG1CQUNSLG9DQUFDO0FBQUEsSUFBTyxXQUFXO0FBQUEsSUFBVSxXQUFXLENBQUMsOENBQXVCLENBQUMsQ0FBQztBQUFBLEtBQy9ELENBQUMsRUFBRSxLQUFLLE9BQU8sV0FBVyxpQkFDekIsb0NBQUM7QUFBQSxJQUFJLFdBQVcsUUFBUSxpQ0FBZSxLQUFLLElBQUk7QUFBQSxLQUM5QyxvQ0FBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXLCtCQUNULGtDQUNBLDhDQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsS0FFVCxvQ0FBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsUUFBTztBQUFBLElBQ1AsS0FBSyxLQUFLLCtDQUErQztBQUFBLEdBQzNELEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixLQUFLLCtDQUErQyxDQUN2RCxHQUNBLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixLQUFLLDhDQUE4QyxDQUN0RCxDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxXQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxjQUFZLEtBQUssT0FBTztBQUFBLEdBQzFCLENBQ0YsR0FDQSxvQ0FBQztBQUFBLElBQ0MsS0FBSyxXQUFXO0FBQUEsSUFDaEIsT0FBTyxXQUFXO0FBQUEsSUFDbEIsV0FBVywrQkFDVCw0Q0FDQSwwREFDQSw2Q0FBNkMsV0FDL0M7QUFBQSxHQUNGLENBQ0YsQ0FDRixDQUVKLElBQ0UsTUFDSCxRQUFRLGFBQ0wsbUNBQ0Usb0NBQUM7QUFBQSxJQUFPLFdBQVc7QUFBQSxLQUNoQixDQUFDLEVBQUUsS0FBSyxZQUNQLG9DQUFDO0FBQUEsSUFBSSxXQUFXLFFBQVEsaUNBQWUsS0FBSyxJQUFJO0FBQUEsS0FDOUMsb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULGdCQUNFLGlCQUFpQixxQkFBcUI7QUFBQSxJQUV4QyxlQUFlO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxHQUNGLENBQ0YsQ0FFSixHQUNBLFVBQ0YsSUFDQSxJQUNOO0FBRUosQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
