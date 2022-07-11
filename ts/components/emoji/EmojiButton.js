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
var EmojiButton_exports = {};
__export(EmojiButton_exports, {
  EmojiButton: () => EmojiButton
});
module.exports = __toCommonJS(EmojiButton_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_react_popper = require("react-popper");
var import_react_dom = require("react-dom");
var import_Emoji = require("./Emoji");
var import_EmojiPicker = require("./EmojiPicker");
var import_useRefMerger = require("../../hooks/useRefMerger");
var KeyboardLayout = __toESM(require("../../services/keyboardLayout"));
const EmojiButton = React.memo(({
  className,
  closeOnPick,
  emoji,
  i18n,
  doSend,
  onClose,
  onPickEmoji,
  skinTone,
  onSetSkinTone,
  recentEmojis
}) => {
  const [open, setOpen] = React.useState(false);
  const [popperRoot, setPopperRoot] = React.useState(null);
  const buttonRef = React.useRef(null);
  const refMerger = (0, import_useRefMerger.useRefMerger)();
  const handleClickButton = React.useCallback(() => {
    if (popperRoot) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [popperRoot, setOpen]);
  const handleClose = React.useCallback(() => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  }, [setOpen, onClose]);
  React.useEffect(() => {
    if (open) {
      const root = document.createElement("div");
      setPopperRoot(root);
      document.body.appendChild(root);
      const handleOutsideClick = /* @__PURE__ */ __name((event) => {
        if (!root.contains(event.target) && event.target !== buttonRef.current) {
          handleClose();
          event.stopPropagation();
          event.preventDefault();
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
  }, [open, setOpen, setPopperRoot, handleClose]);
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
      if (commandOrCtrl && shiftKey && (key === "j" || key === "J")) {
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
  return /* @__PURE__ */ React.createElement(import_react_popper.Manager, null, /* @__PURE__ */ React.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ React.createElement("button", {
    type: "button",
    ref: refMerger(buttonRef, ref),
    onClick: handleClickButton,
    className: (0, import_classnames.default)(className, {
      "module-emoji-button__button": true,
      "module-emoji-button__button--active": open,
      "module-emoji-button__button--has-emoji": Boolean(emoji)
    }),
    "aria-label": i18n("EmojiButton__label")
  }, emoji && /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    emoji,
    size: 24
  }))), open && popperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement(import_react_popper.Popper, {
    placement: "top-start",
    strategy: "fixed"
  }, ({ ref, style }) => /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
    ref,
    i18n,
    style,
    onPickEmoji: (ev) => {
      onPickEmoji(ev);
      if (closeOnPick) {
        handleClose();
      }
    },
    doSend,
    onClose: handleClose,
    skinTone,
    onSetSkinTone,
    recentEmojis
  })), popperRoot) : null);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlCdXR0b24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBnZXQsIG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTWFuYWdlciwgUG9wcGVyLCBSZWZlcmVuY2UgfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IEVtb2ppIH0gZnJvbSAnLi9FbW9qaSc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIEVtb2ppUGlja2VyUHJvcHMgfSBmcm9tICcuL0Vtb2ppUGlja2VyJztcbmltcG9ydCB7IEVtb2ppUGlja2VyIH0gZnJvbSAnLi9FbW9qaVBpY2tlcic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IHVzZVJlZk1lcmdlciB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVJlZk1lcmdlcic7XG5pbXBvcnQgKiBhcyBLZXlib2FyZExheW91dCBmcm9tICcuLi8uLi9zZXJ2aWNlcy9rZXlib2FyZExheW91dCc7XG5cbmV4cG9ydCB0eXBlIE93blByb3BzID0ge1xuICByZWFkb25seSBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNsb3NlT25QaWNrPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgZW1vamk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG4gIHJlYWRvbmx5IG9uQ2xvc2U/OiAoKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBPd25Qcm9wcyAmXG4gIFBpY2s8XG4gICAgRW1vamlQaWNrZXJQcm9wcyxcbiAgICAnZG9TZW5kJyB8ICdvblBpY2tFbW9qaScgfCAnb25TZXRTa2luVG9uZScgfCAncmVjZW50RW1vamlzJyB8ICdza2luVG9uZSdcbiAgPjtcblxuZXhwb3J0IGNvbnN0IEVtb2ppQnV0dG9uID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBjbGFzc05hbWUsXG4gICAgY2xvc2VPblBpY2ssXG4gICAgZW1vamksXG4gICAgaTE4bixcbiAgICBkb1NlbmQsXG4gICAgb25DbG9zZSxcbiAgICBvblBpY2tFbW9qaSxcbiAgICBza2luVG9uZSxcbiAgICBvblNldFNraW5Ub25lLFxuICAgIHJlY2VudEVtb2ppcyxcbiAgfTogUHJvcHMpID0+IHtcbiAgICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3BvcHBlclJvb3QsIHNldFBvcHBlclJvb3RdID0gUmVhY3QudXNlU3RhdGU8SFRNTEVsZW1lbnQgfCBudWxsPihcbiAgICAgIG51bGxcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvblJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICAgIGNvbnN0IHJlZk1lcmdlciA9IHVzZVJlZk1lcmdlcigpO1xuXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tCdXR0b24gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBpZiAocG9wcGVyUm9vdCkge1xuICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgW3BvcHBlclJvb3QsIHNldE9wZW5dKTtcblxuICAgIGNvbnN0IGhhbmRsZUNsb3NlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICBpZiAob25DbG9zZSkge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9XG4gICAgfSwgW3NldE9wZW4sIG9uQ2xvc2VdKTtcblxuICAgIC8vIENyZWF0ZSBwb3BwZXIgcm9vdCBhbmQgaGFuZGxlIG91dHNpZGUgY2xpY2tzXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2V0UG9wcGVyUm9vdChyb290KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KTtcbiAgICAgICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXJvb3QuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpICYmXG4gICAgICAgICAgICBldmVudC50YXJnZXQgIT09IGJ1dHRvblJlZi5jdXJyZW50XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBoYW5kbGVDbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChyb290KTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgICAgICAgc2V0UG9wcGVyUm9vdChudWxsKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfSwgW29wZW4sIHNldE9wZW4sIHNldFBvcHBlclJvb3QsIGhhbmRsZUNsb3NlXSk7XG5cbiAgICAvLyBJbnN0YWxsIGtleWJvYXJkIHNob3J0Y3V0IHRvIG9wZW4gZW1vamkgcGlja2VyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZUtleWRvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgeyBjdHJsS2V5LCBtZXRhS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRLZXkgPSBnZXQod2luZG93LCAncGxhdGZvcm0nKSA9PT0gJ2RhcndpbicgJiYgbWV0YUtleTtcbiAgICAgICAgY29uc3QgY29udHJvbEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpICE9PSAnZGFyd2luJyAmJiBjdHJsS2V5O1xuICAgICAgICBjb25zdCBjb21tYW5kT3JDdHJsID0gY29tbWFuZEtleSB8fCBjb250cm9sS2V5O1xuICAgICAgICBjb25zdCBrZXkgPSBLZXlib2FyZExheW91dC5sb29rdXAoZXZlbnQpO1xuXG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gb3BlbiB1cCBpZiB0aGUgY29udmVyc2F0aW9uIGhhcyBhbnkgcGFuZWxzIG9wZW5cbiAgICAgICAgY29uc3QgcGFuZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnZlcnNhdGlvbiAucGFuZWwnKTtcbiAgICAgICAgaWYgKHBhbmVscyAmJiBwYW5lbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tYW5kT3JDdHJsICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICdqJyB8fCBrZXkgPT09ICdKJykpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgc2V0T3Blbighb3Blbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5ZG93bik7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlkb3duKTtcbiAgICAgIH07XG4gICAgfSwgW29wZW4sIHNldE9wZW5dKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TWFuYWdlcj5cbiAgICAgICAgPFJlZmVyZW5jZT5cbiAgICAgICAgICB7KHsgcmVmIH0pID0+IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIHJlZj17cmVmTWVyZ2VyKGJ1dHRvblJlZiwgcmVmKX1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2tCdXR0b259XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhjbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAnbW9kdWxlLWVtb2ppLWJ1dHRvbl9fYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnbW9kdWxlLWVtb2ppLWJ1dHRvbl9fYnV0dG9uLS1hY3RpdmUnOiBvcGVuLFxuICAgICAgICAgICAgICAgICdtb2R1bGUtZW1vamktYnV0dG9uX19idXR0b24tLWhhcy1lbW9qaSc6IEJvb2xlYW4oZW1vamkpLFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignRW1vamlCdXR0b25fX2xhYmVsJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtlbW9qaSAmJiA8RW1vamkgZW1vamk9e2Vtb2ppfSBzaXplPXsyNH0gLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L1JlZmVyZW5jZT5cbiAgICAgICAge29wZW4gJiYgcG9wcGVyUm9vdFxuICAgICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgICA8UG9wcGVyIHBsYWNlbWVudD1cInRvcC1zdGFydFwiIHN0cmF0ZWd5PVwiZml4ZWRcIj5cbiAgICAgICAgICAgICAgICB7KHsgcmVmLCBzdHlsZSB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RW1vamlQaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgb25QaWNrRW1vamk9e2V2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBvblBpY2tFbW9qaShldik7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlT25QaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgZG9TZW5kPXtkb1NlbmR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2hhbmRsZUNsb3NlfVxuICAgICAgICAgICAgICAgICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICAgICAgICAgICAgICAgIG9uU2V0U2tpblRvbmU9e29uU2V0U2tpblRvbmV9XG4gICAgICAgICAgICAgICAgICAgIHJlY2VudEVtb2ppcz17cmVjZW50RW1vamlzfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L1BvcHBlcj4sXG4gICAgICAgICAgICAgIHBvcHBlclJvb3RcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IG51bGx9XG4gICAgICA8L01hbmFnZXI+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBw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
