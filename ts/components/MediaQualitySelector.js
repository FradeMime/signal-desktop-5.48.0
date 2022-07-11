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
var MediaQualitySelector_exports = {};
__export(MediaQualitySelector_exports, {
  MediaQualitySelector: () => MediaQualitySelector
});
module.exports = __toCommonJS(MediaQualitySelector_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_react_dom = require("react-dom");
var import_classnames = __toESM(require("classnames"));
var import_react_popper = require("react-popper");
var import_useRefMerger = require("../hooks/useRefMerger");
const MediaQualitySelector = /* @__PURE__ */ __name(({
  i18n,
  isHighQuality,
  onSelectQuality
}) => {
  const [menuShowing, setMenuShowing] = (0, import_react.useState)(false);
  const [popperRoot, setPopperRoot] = (0, import_react.useState)(null);
  const [focusedOption, setFocusedOption] = (0, import_react.useState)(void 0);
  const buttonRef = import_react.default.useRef(null);
  const refMerger = (0, import_useRefMerger.useRefMerger)();
  const handleClick = /* @__PURE__ */ __name(() => {
    setMenuShowing(true);
  }, "handleClick");
  const handleKeyDown = /* @__PURE__ */ __name((ev) => {
    if (!popperRoot) {
      if (ev.key === "Enter") {
        setFocusedOption(isHighQuality ? 1 : 0);
      }
      return;
    }
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
      setFocusedOption((oldFocusedOption) => oldFocusedOption === 1 ? 0 : 1);
      ev.stopPropagation();
      ev.preventDefault();
    }
    if (ev.key === "Enter") {
      onSelectQuality(Boolean(focusedOption));
      setMenuShowing(false);
      ev.stopPropagation();
      ev.preventDefault();
    }
  }, "handleKeyDown");
  const handleClose = (0, import_react.useCallback)(() => {
    setMenuShowing(false);
    setFocusedOption(void 0);
  }, [setMenuShowing]);
  (0, import_react.useEffect)(() => {
    if (menuShowing) {
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
  }, [menuShowing, setPopperRoot, handleClose]);
  return /* @__PURE__ */ import_react.default.createElement(import_react_popper.Manager, null, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaQualitySelector--button"),
    className: (0, import_classnames.default)({
      MediaQualitySelector__button: true,
      "MediaQualitySelector__button--hq": isHighQuality,
      "MediaQualitySelector__button--active": menuShowing
    }),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ref: refMerger(buttonRef, ref),
    type: "button"
  })), menuShowing && popperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement(import_react_popper.Popper, {
    placement: "top-start",
    strategy: "fixed"
  }, ({ ref, style, placement }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaQualitySelector__popper",
    "data-placement": placement,
    ref,
    style
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaQualitySelector__title"
  }, i18n("MediaQualitySelector--title")), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaQualitySelector--standard-quality-title"),
    className: (0, import_classnames.default)({
      MediaQualitySelector__option: true,
      "MediaQualitySelector__option--focused": focusedOption === 0
    }),
    type: "button",
    onClick: () => {
      onSelectQuality(false);
      setMenuShowing(false);
    }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      "MediaQualitySelector__option--checkmark": true,
      "MediaQualitySelector__option--selected": !isHighQuality
    })
  }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaQualitySelector__option--title"
  }, i18n("MediaQualitySelector--standard-quality-title")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaQualitySelector__option--description"
  }, i18n("MediaQualitySelector--standard-quality-description")))), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaQualitySelector--high-quality-title"),
    className: (0, import_classnames.default)({
      MediaQualitySelector__option: true,
      "MediaQualitySelector__option--focused": focusedOption === 1
    }),
    type: "button",
    onClick: () => {
      onSelectQuality(true);
      setMenuShowing(false);
    }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      "MediaQualitySelector__option--checkmark": true,
      "MediaQualitySelector__option--selected": isHighQuality
    })
  }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaQualitySelector__option--title"
  }, i18n("MediaQualitySelector--high-quality-title")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaQualitySelector__option--description"
  }, i18n("MediaQualitySelector--high-quality-description")))))), popperRoot) : null);
}, "MediaQualitySelector");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaQualitySelector
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFRdWFsaXR5U2VsZWN0b3IudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBLZXlib2FyZEV2ZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBNYW5hZ2VyLCBQb3BwZXIsIFJlZmVyZW5jZSB9IGZyb20gJ3JlYWN0LXBvcHBlcic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IHVzZVJlZk1lcmdlciB9IGZyb20gJy4uL2hvb2tzL3VzZVJlZk1lcmdlcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNIaWdoUXVhbGl0eTogYm9vbGVhbjtcbiAgb25TZWxlY3RRdWFsaXR5OiAoaXNIUTogYm9vbGVhbikgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBNZWRpYVF1YWxpdHlTZWxlY3RvciA9ICh7XG4gIGkxOG4sXG4gIGlzSGlnaFF1YWxpdHksXG4gIG9uU2VsZWN0UXVhbGl0eSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW21lbnVTaG93aW5nLCBzZXRNZW51U2hvd2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwb3BwZXJSb290LCBzZXRQb3BwZXJSb290XSA9IHVzZVN0YXRlPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtmb2N1c2VkT3B0aW9uLCBzZXRGb2N1c2VkT3B0aW9uXSA9IHVzZVN0YXRlPDAgfCAxIHwgdW5kZWZpbmVkPihcbiAgICB1bmRlZmluZWRcbiAgKTtcblxuICBjb25zdCBidXR0b25SZWYgPSBSZWFjdC51c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcmVmTWVyZ2VyID0gdXNlUmVmTWVyZ2VyKCk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgc2V0TWVudVNob3dpbmcodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGlmICghcG9wcGVyUm9vdCkge1xuICAgICAgaWYgKGV2LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBzZXRGb2N1c2VkT3B0aW9uKGlzSGlnaFF1YWxpdHkgPyAxIDogMCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXYua2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIHNldEZvY3VzZWRPcHRpb24ob2xkRm9jdXNlZE9wdGlvbiA9PiAob2xkRm9jdXNlZE9wdGlvbiA9PT0gMSA/IDAgOiAxKSk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKGV2LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgb25TZWxlY3RRdWFsaXR5KEJvb2xlYW4oZm9jdXNlZE9wdGlvbikpO1xuICAgICAgc2V0TWVudVNob3dpbmcoZmFsc2UpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbG9zZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRNZW51U2hvd2luZyhmYWxzZSk7XG4gICAgc2V0Rm9jdXNlZE9wdGlvbih1bmRlZmluZWQpO1xuICB9LCBbc2V0TWVudVNob3dpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChtZW51U2hvd2luZykge1xuICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc2V0UG9wcGVyUm9vdChyb290KTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICBjb25zdCBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFyb290LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSAmJlxuICAgICAgICAgIGV2ZW50LnRhcmdldCAhPT0gYnV0dG9uUmVmLmN1cnJlbnRcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGFuZGxlQ2xvc2UoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHJvb3QpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgICAgIHNldFBvcHBlclJvb3QobnVsbCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBub29wO1xuICB9LCBbbWVudVNob3dpbmcsIHNldFBvcHBlclJvb3QsIGhhbmRsZUNsb3NlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TWFuYWdlcj5cbiAgICAgIDxSZWZlcmVuY2U+XG4gICAgICAgIHsoeyByZWYgfSkgPT4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ01lZGlhUXVhbGl0eVNlbGVjdG9yLS1idXR0b24nKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgIE1lZGlhUXVhbGl0eVNlbGVjdG9yX19idXR0b246IHRydWUsXG4gICAgICAgICAgICAgICdNZWRpYVF1YWxpdHlTZWxlY3Rvcl9fYnV0dG9uLS1ocSc6IGlzSGlnaFF1YWxpdHksXG4gICAgICAgICAgICAgICdNZWRpYVF1YWxpdHlTZWxlY3Rvcl9fYnV0dG9uLS1hY3RpdmUnOiBtZW51U2hvd2luZyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgICByZWY9e3JlZk1lcmdlcihidXR0b25SZWYsIHJlZil9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9SZWZlcmVuY2U+XG4gICAgICB7bWVudVNob3dpbmcgJiYgcG9wcGVyUm9vdFxuICAgICAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgICAgIDxQb3BwZXIgcGxhY2VtZW50PVwidG9wLXN0YXJ0XCIgc3RyYXRlZ3k9XCJmaXhlZFwiPlxuICAgICAgICAgICAgICB7KHsgcmVmLCBzdHlsZSwgcGxhY2VtZW50IH0pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJNZWRpYVF1YWxpdHlTZWxlY3Rvcl9fcG9wcGVyXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PXtwbGFjZW1lbnR9XG4gICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIk1lZGlhUXVhbGl0eVNlbGVjdG9yX190aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7aTE4bignTWVkaWFRdWFsaXR5U2VsZWN0b3ItLXRpdGxlJyl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bihcbiAgICAgICAgICAgICAgICAgICAgICAnTWVkaWFRdWFsaXR5U2VsZWN0b3ItLXN0YW5kYXJkLXF1YWxpdHktdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgICAgICAgTWVkaWFRdWFsaXR5U2VsZWN0b3JfX29wdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAnTWVkaWFRdWFsaXR5U2VsZWN0b3JfX29wdGlvbi0tZm9jdXNlZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2VkT3B0aW9uID09PSAwLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdFF1YWxpdHkoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVTaG93aW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnTWVkaWFRdWFsaXR5U2VsZWN0b3JfX29wdGlvbi0tY2hlY2ttYXJrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdNZWRpYVF1YWxpdHlTZWxlY3Rvcl9fb3B0aW9uLS1zZWxlY3RlZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICFpc0hpZ2hRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFRdWFsaXR5U2VsZWN0b3JfX29wdGlvbi0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpMThuKCdNZWRpYVF1YWxpdHlTZWxlY3Rvci0tc3RhbmRhcmQtcXVhbGl0eS10aXRsZScpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFRdWFsaXR5U2VsZWN0b3JfX29wdGlvbi0tZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpMThuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnTWVkaWFRdWFsaXR5U2VsZWN0b3ItLXN0YW5kYXJkLXF1YWxpdHktZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKFxuICAgICAgICAgICAgICAgICAgICAgICdNZWRpYVF1YWxpdHlTZWxlY3Rvci0taGlnaC1xdWFsaXR5LXRpdGxlJ1xuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICAgICAgICAgIE1lZGlhUXVhbGl0eVNlbGVjdG9yX19vcHRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgJ01lZGlhUXVhbGl0eVNlbGVjdG9yX19vcHRpb24tLWZvY3VzZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNlZE9wdGlvbiA9PT0gMSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RRdWFsaXR5KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVTaG93aW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnTWVkaWFRdWFsaXR5U2VsZWN0b3JfX29wdGlvbi0tY2hlY2ttYXJrJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdNZWRpYVF1YWxpdHlTZWxlY3Rvcl9fb3B0aW9uLS1zZWxlY3RlZCc6IGlzSGlnaFF1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJNZWRpYVF1YWxpdHlTZWxlY3Rvcl9fb3B0aW9uLS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2kxOG4oJ01lZGlhUXVhbGl0eVNlbGVjdG9yLS1oaWdoLXF1YWxpdHktdGl0bGUnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIk1lZGlhUXVhbGl0eVNlbGVjdG9yX19vcHRpb24tLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aTE4bignTWVkaWFRdWFsaXR5U2VsZWN0b3ItLWhpZ2gtcXVhbGl0eS1kZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9Qb3BwZXI+LFxuICAgICAgICAgICAgcG9wcGVyUm9vdFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsfVxuICAgIDwvTWFuYWdlcj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQXdEO0FBQ3hELG9CQUFxQjtBQUNyQix1QkFBNkI7QUFDN0Isd0JBQXVCO0FBQ3ZCLDBCQUEyQztBQUUzQywwQkFBNkI7QUFRdEIsTUFBTSx1QkFBdUIsd0JBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxDQUFDLGFBQWEsa0JBQWtCLDJCQUFTLEtBQUs7QUFDcEQsUUFBTSxDQUFDLFlBQVksaUJBQWlCLDJCQUE2QixJQUFJO0FBQ3JFLFFBQU0sQ0FBQyxlQUFlLG9CQUFvQiwyQkFDeEMsTUFDRjtBQUVBLFFBQU0sWUFBWSxxQkFBTSxPQUFpQyxJQUFJO0FBQzdELFFBQU0sWUFBWSxzQ0FBYTtBQUUvQixRQUFNLGNBQWMsNkJBQU07QUFDeEIsbUJBQWUsSUFBSTtB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
