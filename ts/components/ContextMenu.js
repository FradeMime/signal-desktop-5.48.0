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
var ContextMenu_exports = {};
__export(ContextMenu_exports, {
  ContextMenu: () => ContextMenu,
  ContextMenuPopper: () => ContextMenuPopper
});
module.exports = __toCommonJS(ContextMenu_exports);
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_popper = require("react-popper");
var import_lodash = require("lodash");
var import_theme = require("../util/theme");
function ContextMenuPopper({
  menuOptions,
  focusedIndex,
  isMenuShowing,
  popperOptions,
  onClose,
  referenceElement,
  title,
  theme,
  value
}) {
  const [popperElement, setPopperElement] = (0, import_react.useState)(null);
  const { styles, attributes } = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    placement: "top-start",
    strategy: "fixed",
    ...popperOptions
  });
  (0, import_react.useEffect)(() => {
    if (!isMenuShowing) {
      return import_lodash.noop;
    }
    const handleOutsideClick = /* @__PURE__ */ __name((event) => {
      if (!referenceElement?.contains(event.target)) {
        onClose();
        event.stopPropagation();
        event.preventDefault();
      }
    }, "handleOutsideClick");
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuShowing, onClose, referenceElement]);
  if (!isMenuShowing) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: theme ? (0, import_theme.themeClassName)(theme) : void 0
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ContextMenu__popper",
    ref: setPopperElement,
    style: styles.popper,
    ...attributes.popper
  }, title && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ContextMenu__title"
  }, title), menuOptions.map((option, index) => /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": option.label,
    className: (0, import_classnames.default)({
      ContextMenu__option: true,
      "ContextMenu__option--focused": focusedIndex === index
    }),
    key: option.label,
    type: "button",
    onClick: () => {
      option.onClick(option.value);
      onClose();
    }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ContextMenu__option--container"
  }, option.icon && /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("ContextMenu__option--icon", option.icon)
  }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ContextMenu__option--title"
  }, option.label), option.description && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ContextMenu__option--description"
  }, option.description))), typeof value !== "undefined" && typeof option.value !== "undefined" && value === option.value ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ContextMenu__option--selected"
  }) : null))));
}
function ContextMenu({
  buttonClassName,
  buttonStyle,
  i18n,
  menuOptions,
  popperOptions,
  theme,
  title,
  value
}) {
  const [menuShowing, setMenuShowing] = (0, import_react.useState)(false);
  const [focusedIndex, setFocusedIndex] = (0, import_react.useState)(void 0);
  const handleKeyDown = /* @__PURE__ */ __name((ev) => {
    if (!menuShowing) {
      if (ev.key === "Enter") {
        setFocusedIndex(0);
      }
      return;
    }
    if (ev.key === "ArrowDown") {
      const currFocusedIndex = focusedIndex || 0;
      const nextFocusedIndex = currFocusedIndex >= menuOptions.length - 1 ? 0 : currFocusedIndex + 1;
      setFocusedIndex(nextFocusedIndex);
      ev.stopPropagation();
      ev.preventDefault();
    }
    if (ev.key === "ArrowUp") {
      const currFocusedIndex = focusedIndex || 0;
      const nextFocusedIndex = currFocusedIndex === 0 ? menuOptions.length - 1 : currFocusedIndex - 1;
      setFocusedIndex(nextFocusedIndex);
      ev.stopPropagation();
      ev.preventDefault();
    }
    if (ev.key === "Enter") {
      if (focusedIndex !== void 0) {
        const focusedOption = menuOptions[focusedIndex];
        focusedOption.onClick(focusedOption.value);
      }
      setMenuShowing(false);
      ev.stopPropagation();
      ev.preventDefault();
    }
  }, "handleKeyDown");
  const handleClick = /* @__PURE__ */ __name((ev) => {
    setMenuShowing(true);
    ev.stopPropagation();
    ev.preventDefault();
  }, "handleClick");
  const [referenceElement, setReferenceElement] = (0, import_react.useState)(null);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: theme ? (0, import_theme.themeClassName)(theme) : void 0
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("ContextMenu--button"),
    className: (0, import_classnames.default)(buttonClassName, {
      ContextMenu__button: true,
      "ContextMenu__button--active": menuShowing
    }),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ref: setReferenceElement,
    style: buttonStyle,
    type: "button"
  }), menuShowing && /* @__PURE__ */ import_react.default.createElement(import_focus_trap_react.default, {
    focusTrapOptions: {
      allowOutsideClick: true
    }
  }, /* @__PURE__ */ import_react.default.createElement(ContextMenuPopper, {
    focusedIndex,
    isMenuShowing: menuShowing,
    menuOptions,
    onClose: () => setMenuShowing(false),
    popperOptions,
    referenceElement,
    title,
    value
  })));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContextMenu,
  ContextMenuPopper
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGV4dE1lbnUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDU1NQcm9wZXJ0aWVzLCBLZXlib2FyZEV2ZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBPcHRpb25zIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuaW1wb3J0IEZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwLXJlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VQb3BwZXIgfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgVGhlbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgdGhlbWVDbGFzc05hbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcblxudHlwZSBPcHRpb25UeXBlPFQ+ID0ge1xuICByZWFkb25seSBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgcmVhZG9ubHkgaWNvbj86IHN0cmluZztcbiAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZztcbiAgcmVhZG9ubHkgb25DbGljazogKHZhbHVlPzogVCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgdmFsdWU/OiBUO1xufTtcblxuZXhwb3J0IHR5cGUgQ29udGV4dE1lbnVQcm9wc1R5cGU8VD4gPSB7XG4gIHJlYWRvbmx5IGZvY3VzZWRJbmRleD86IG51bWJlcjtcbiAgcmVhZG9ubHkgaXNNZW51U2hvd2luZzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgbWVudU9wdGlvbnM6IFJlYWRvbmx5QXJyYXk8T3B0aW9uVHlwZTxUPj47XG4gIHJlYWRvbmx5IG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIHJlYWRvbmx5IHBvcHBlck9wdGlvbnM/OiBQaWNrPE9wdGlvbnMsICdwbGFjZW1lbnQnIHwgJ3N0cmF0ZWd5Jz47XG4gIHJlYWRvbmx5IHJlZmVyZW5jZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcmVhZG9ubHkgdGhlbWU/OiBUaGVtZTtcbiAgcmVhZG9ubHkgdGl0bGU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHZhbHVlPzogVDtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZTxUPiA9IHtcbiAgcmVhZG9ubHkgYnV0dG9uQ2xhc3NOYW1lPzogc3RyaW5nO1xuICByZWFkb25seSBidXR0b25TdHlsZT86IENTU1Byb3BlcnRpZXM7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG59ICYgUGljazxcbiAgQ29udGV4dE1lbnVQcm9wc1R5cGU8VD4sXG4gICdtZW51T3B0aW9ucycgfCAncG9wcGVyT3B0aW9ucycgfCAndGhlbWUnIHwgJ3RpdGxlJyB8ICd2YWx1ZSdcbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250ZXh0TWVudVBvcHBlcjxUPih7XG4gIG1lbnVPcHRpb25zLFxuICBmb2N1c2VkSW5kZXgsXG4gIGlzTWVudVNob3dpbmcsXG4gIHBvcHBlck9wdGlvbnMsXG4gIG9uQ2xvc2UsXG4gIHJlZmVyZW5jZUVsZW1lbnQsXG4gIHRpdGxlLFxuICB0aGVtZSxcbiAgdmFsdWUsXG59OiBDb250ZXh0TWVudVByb3BzVHlwZTxUPik6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IFtwb3BwZXJFbGVtZW50LCBzZXRQb3BwZXJFbGVtZW50XSA9IHVzZVN0YXRlPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4oXG4gICAgbnVsbFxuICApO1xuICBjb25zdCB7IHN0eWxlcywgYXR0cmlidXRlcyB9ID0gdXNlUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHBvcHBlckVsZW1lbnQsIHtcbiAgICBwbGFjZW1lbnQ6ICd0b3Atc3RhcnQnLFxuICAgIHN0cmF0ZWd5OiAnZml4ZWQnLFxuICAgIC4uLnBvcHBlck9wdGlvbnMsXG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc01lbnVTaG93aW5nKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmICghcmVmZXJlbmNlRWxlbWVudD8uY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU91dHNpZGVDbGljayk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgIH07XG4gIH0sIFtpc01lbnVTaG93aW5nLCBvbkNsb3NlLCByZWZlcmVuY2VFbGVtZW50XSk7XG5cbiAgaWYgKCFpc01lbnVTaG93aW5nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXt0aGVtZSA/IHRoZW1lQ2xhc3NOYW1lKHRoZW1lKSA6IHVuZGVmaW5lZH0+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIkNvbnRleHRNZW51X19wb3BwZXJcIlxuICAgICAgICByZWY9e3NldFBvcHBlckVsZW1lbnR9XG4gICAgICAgIHN0eWxlPXtzdHlsZXMucG9wcGVyfVxuICAgICAgICB7Li4uYXR0cmlidXRlcy5wb3BwZXJ9XG4gICAgICA+XG4gICAgICAgIHt0aXRsZSAmJiA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRleHRNZW51X190aXRsZVwiPnt0aXRsZX08L2Rpdj59XG4gICAgICAgIHttZW51T3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICBDb250ZXh0TWVudV9fb3B0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAnQ29udGV4dE1lbnVfX29wdGlvbi0tZm9jdXNlZCc6IGZvY3VzZWRJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGtleT17b3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIG9wdGlvbi5vbkNsaWNrKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250ZXh0TWVudV9fb3B0aW9uLS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAge29wdGlvbi5pY29uICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICdDb250ZXh0TWVudV9fb3B0aW9uLS1pY29uJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmljb25cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRleHRNZW51X19vcHRpb24tLXRpdGxlXCI+e29wdGlvbi5sYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgICB7b3B0aW9uLmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGV4dE1lbnVfX29wdGlvbi0tZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAge29wdGlvbi5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG9wdGlvbi52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHZhbHVlID09PSBvcHRpb24udmFsdWUgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGV4dE1lbnVfX29wdGlvbi0tc2VsZWN0ZWRcIiAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250ZXh0TWVudTxUPih7XG4gIGJ1dHRvbkNsYXNzTmFtZSxcbiAgYnV0dG9uU3R5bGUsXG4gIGkxOG4sXG4gIG1lbnVPcHRpb25zLFxuICBwb3BwZXJPcHRpb25zLFxuICB0aGVtZSxcbiAgdGl0bGUsXG4gIHZhbHVlLFxufTogUHJvcHNUeXBlPFQ+KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCBbbWVudVNob3dpbmcsIHNldE1lbnVTaG93aW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2ZvY3VzZWRJbmRleCwgc2V0Rm9jdXNlZEluZGV4XSA9IHVzZVN0YXRlPG51bWJlciB8IHVuZGVmaW5lZD4oXG4gICAgdW5kZWZpbmVkXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGlmICghbWVudVNob3dpbmcpIHtcbiAgICAgIGlmIChldi5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgc2V0Rm9jdXNlZEluZGV4KDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldi5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICBjb25zdCBjdXJyRm9jdXNlZEluZGV4ID0gZm9jdXNlZEluZGV4IHx8IDA7XG4gICAgICBjb25zdCBuZXh0Rm9jdXNlZEluZGV4ID1cbiAgICAgICAgY3VyckZvY3VzZWRJbmRleCA+PSBtZW51T3B0aW9ucy5sZW5ndGggLSAxID8gMCA6IGN1cnJGb2N1c2VkSW5kZXggKyAxO1xuICAgICAgc2V0Rm9jdXNlZEluZGV4KG5leHRGb2N1c2VkSW5kZXgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmIChldi5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgY29uc3QgY3VyckZvY3VzZWRJbmRleCA9IGZvY3VzZWRJbmRleCB8fCAwO1xuICAgICAgY29uc3QgbmV4dEZvY3VzZWRJbmRleCA9XG4gICAgICAgIGN1cnJGb2N1c2VkSW5kZXggPT09IDAgPyBtZW51T3B0aW9ucy5sZW5ndGggLSAxIDogY3VyckZvY3VzZWRJbmRleCAtIDE7XG4gICAgICBzZXRGb2N1c2VkSW5kZXgobmV4dEZvY3VzZWRJbmRleCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKGV2LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgaWYgKGZvY3VzZWRJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRPcHRpb24gPSBtZW51T3B0aW9uc1tmb2N1c2VkSW5kZXhdO1xuICAgICAgICBmb2N1c2VkT3B0aW9uLm9uQ2xpY2soZm9jdXNlZE9wdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgICBzZXRNZW51U2hvd2luZyhmYWxzZSk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2OiBLZXlib2FyZEV2ZW50IHwgUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIHNldE1lbnVTaG93aW5nKHRydWUpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgY29uc3QgW3JlZmVyZW5jZUVsZW1lbnQsIHNldFJlZmVyZW5jZUVsZW1lbnRdID1cbiAgICB1c2VTdGF0ZTxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3RoZW1lID8gdGhlbWVDbGFzc05hbWUodGhlbWUpIDogdW5kZWZpbmVkfT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgYXJpYS1sYWJlbD17aTE4bignQ29udGV4dE1lbnUtLWJ1dHRvbicpfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoYnV0dG9uQ2xhc3NOYW1lLCB7XG4gICAgICAgICAgQ29udGV4dE1lbnVfX2J1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAnQ29udGV4dE1lbnVfX2J1dHRvbi0tYWN0aXZlJzogbWVudVNob3dpbmcsXG4gICAgICAgIH0pfVxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICByZWY9e3NldFJlZmVyZW5jZUVsZW1lbnR9XG4gICAgICAgIHN0eWxlPXtidXR0b25TdHlsZX1cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAvPlxuICAgICAge21lbnVTaG93aW5nICYmIChcbiAgICAgICAgPEZvY3VzVHJhcFxuICAgICAgICAgIGZvY3VzVHJhcE9wdGlvbnM9e3tcbiAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8Q29udGV4dE1lbnVQb3BwZXJcbiAgICAgICAgICAgIGZvY3VzZWRJbmRleD17Zm9jdXNlZEluZGV4fVxuICAgICAgICAgICAgaXNNZW51U2hvd2luZz17bWVudVNob3dpbmd9XG4gICAgICAgICAgICBtZW51T3B0aW9ucz17bWVudU9wdGlvbnN9XG4gICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRNZW51U2hvd2luZyhmYWxzZSl9XG4gICAgICAgICAgICBwb3BwZXJPcHRpb25zPXtwb3BwZXJPcHRpb25zfVxuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudD17cmVmZXJlbmNlRWxlbWVudH1cbiAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZvY3VzVHJhcD5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSw4QkFBc0I7QUFDdEIsbUJBQTJDO0FBQzNDLHdCQUF1QjtBQUN2QiwwQkFBMEI7QUFDMUIsb0JBQXFCO0FBSXJCLG1CQUErQjtBQStCeEIsMkJBQThCO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQzhDO0FBQzlDLFFB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
