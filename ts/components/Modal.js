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
var Modal_exports = {};
__export(Modal_exports, {
  Modal: () => Modal,
  ModalWindow: () => ModalWindow
});
module.exports = __toCommonJS(Modal_exports);
var import_react = __toESM(require("react"));
var import_react_measure = __toESM(require("react-measure"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_web = require("@react-spring/web");
var import_ModalHost = require("./ModalHost");
var import_getClassNamesFor = require("../util/getClassNamesFor");
var import_useAnimated = require("../hooks/useAnimated");
var import_useHasWrapped = require("../hooks/useHasWrapped");
var import_useRefMerger = require("../hooks/useRefMerger");
const BASE_CLASS_NAME = "module-Modal";
function Modal({
  children,
  hasStickyButtons,
  hasXButton,
  i18n,
  moduleClassName,
  noMouseClose,
  onClose = import_lodash.noop,
  title,
  theme,
  useFocusTrap
}) {
  const { close, modalStyles, overlayStyles } = (0, import_useAnimated.useAnimated)(onClose, {
    getFrom: () => ({ opacity: 0, transform: "translateY(48px)" }),
    getTo: (isOpen) => isOpen ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: "translateY(48px)" }
  });
  return /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    moduleClassName,
    noMouseClose,
    onClose: close,
    overlayStyles,
    theme,
    useFocusTrap
  }, /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    style: modalStyles
  }, /* @__PURE__ */ import_react.default.createElement(ModalWindow, {
    hasStickyButtons,
    hasXButton,
    i18n,
    moduleClassName,
    onClose: close,
    title
  }, children)));
}
function ModalWindow({
  children,
  hasStickyButtons,
  hasXButton,
  i18n,
  moduleClassName,
  onClose = import_lodash.noop,
  title
}) {
  const modalRef = (0, import_react.useRef)(null);
  const refMerger = (0, import_useRefMerger.useRefMerger)();
  const bodyRef = (0, import_react.useRef)(null);
  const [scrolled, setScrolled] = (0, import_react.useState)(false);
  const [hasOverflow, setHasOverflow] = (0, import_react.useState)(false);
  const hasHeader = Boolean(hasXButton || title);
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)(BASE_CLASS_NAME, moduleClassName);
  function handleResize({ scroll }) {
    const modalNode = modalRef?.current;
    if (!modalNode) {
      return;
    }
    if (scroll) {
      setHasOverflow(scroll.height > modalNode.clientHeight);
    }
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName(""), getClassName(hasHeader ? "--has-header" : "--no-header"), hasStickyButtons && getClassName("--sticky-buttons")),
    ref: modalRef,
    onClick: (event) => {
      event.stopPropagation();
    }
  }, hasHeader && /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__header")
  }, hasXButton && /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    type: "button",
    className: getClassName("__close-button"),
    tabIndex: 0,
    onClick: onClose
  }), title && /* @__PURE__ */ import_react.default.createElement("h1", {
    className: (0, import_classnames.default)(getClassName("__title"), hasXButton ? getClassName("__title--with-x-button") : null)
  }, title)), /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    scroll: true,
    onResize: handleResize
  }, ({ measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName("__body"), scrolled ? getClassName("__body--scrolled") : null, hasOverflow || scrolled ? getClassName("__body--overflow") : null),
    onScroll: () => {
      const scrollTop = bodyRef.current?.scrollTop || 0;
      setScrolled(scrollTop > 2);
    },
    ref: refMerger(measureRef, bodyRef)
  }, children))));
}
Modal.ButtonFooter = function ButtonFooter({
  children,
  moduleClassName
}) {
  const [ref, hasWrapped] = (0, import_useHasWrapped.useHasWrapped)();
  const className = (0, import_getClassNamesFor.getClassNamesFor)(BASE_CLASS_NAME, moduleClassName)("__button-footer");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(className, hasWrapped ? `${className}--one-button-per-line` : void 0),
    ref
  }, children);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Modal,
  ModalWindow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdEVsZW1lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBDb250ZW50UmVjdCwgTWVhc3VyZWRDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuaW1wb3J0IE1lYXN1cmUgZnJvbSAncmVhY3QtbWVhc3VyZSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYW5pbWF0ZWQgfSBmcm9tICdAcmVhY3Qtc3ByaW5nL3dlYic7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgTW9kYWxIb3N0IH0gZnJvbSAnLi9Nb2RhbEhvc3QnO1xuaW1wb3J0IHR5cGUgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuaW1wb3J0IHsgZ2V0Q2xhc3NOYW1lc0ZvciB9IGZyb20gJy4uL3V0aWwvZ2V0Q2xhc3NOYW1lc0Zvcic7XG5pbXBvcnQgeyB1c2VBbmltYXRlZCB9IGZyb20gJy4uL2hvb2tzL3VzZUFuaW1hdGVkJztcbmltcG9ydCB7IHVzZUhhc1dyYXBwZWQgfSBmcm9tICcuLi9ob29rcy91c2VIYXNXcmFwcGVkJztcbmltcG9ydCB7IHVzZVJlZk1lcmdlciB9IGZyb20gJy4uL2hvb2tzL3VzZVJlZk1lcmdlcic7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjaGlsZHJlbjogUmVhY3ROb2RlO1xuICBoYXNTdGlja3lCdXR0b25zPzogYm9vbGVhbjtcbiAgaGFzWEJ1dHRvbj86IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgb25DbG9zZT86ICgpID0+IHZvaWQ7XG4gIHRpdGxlPzogUmVhY3ROb2RlO1xuICB1c2VGb2N1c1RyYXA/OiBib29sZWFuO1xufTtcblxudHlwZSBNb2RhbFByb3BzVHlwZSA9IFByb3BzVHlwZSAmIHtcbiAgbm9Nb3VzZUNsb3NlPzogYm9vbGVhbjtcbiAgdGhlbWU/OiBUaGVtZTtcbn07XG5cbmNvbnN0IEJBU0VfQ0xBU1NfTkFNRSA9ICdtb2R1bGUtTW9kYWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gTW9kYWwoe1xuICBjaGlsZHJlbixcbiAgaGFzU3RpY2t5QnV0dG9ucyxcbiAgaGFzWEJ1dHRvbixcbiAgaTE4bixcbiAgbW9kdWxlQ2xhc3NOYW1lLFxuICBub01vdXNlQ2xvc2UsXG4gIG9uQ2xvc2UgPSBub29wLFxuICB0aXRsZSxcbiAgdGhlbWUsXG4gIHVzZUZvY3VzVHJhcCxcbn06IFJlYWRvbmx5PE1vZGFsUHJvcHNUeXBlPik6IFJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IHsgY2xvc2UsIG1vZGFsU3R5bGVzLCBvdmVybGF5U3R5bGVzIH0gPSB1c2VBbmltYXRlZChvbkNsb3NlLCB7XG4gICAgZ2V0RnJvbTogKCkgPT4gKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg0OHB4KScgfSksXG4gICAgZ2V0VG86IGlzT3BlbiA9PlxuICAgICAgaXNPcGVuXG4gICAgICAgID8geyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDBweCknIH1cbiAgICAgICAgOiB7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNDhweCknIH0sXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsSG9zdFxuICAgICAgbW9kdWxlQ2xhc3NOYW1lPXttb2R1bGVDbGFzc05hbWV9XG4gICAgICBub01vdXNlQ2xvc2U9e25vTW91c2VDbG9zZX1cbiAgICAgIG9uQ2xvc2U9e2Nsb3NlfVxuICAgICAgb3ZlcmxheVN0eWxlcz17b3ZlcmxheVN0eWxlc31cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgIHVzZUZvY3VzVHJhcD17dXNlRm9jdXNUcmFwfVxuICAgID5cbiAgICAgIDxhbmltYXRlZC5kaXYgc3R5bGU9e21vZGFsU3R5bGVzfT5cbiAgICAgICAgPE1vZGFsV2luZG93XG4gICAgICAgICAgaGFzU3RpY2t5QnV0dG9ucz17aGFzU3RpY2t5QnV0dG9uc31cbiAgICAgICAgICBoYXNYQnV0dG9uPXtoYXNYQnV0dG9ufVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPXttb2R1bGVDbGFzc05hbWV9XG4gICAgICAgICAgb25DbG9zZT17Y2xvc2V9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L01vZGFsV2luZG93PlxuICAgICAgPC9hbmltYXRlZC5kaXY+XG4gICAgPC9Nb2RhbEhvc3Q+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb2RhbFdpbmRvdyh7XG4gIGNoaWxkcmVuLFxuICBoYXNTdGlja3lCdXR0b25zLFxuICBoYXNYQnV0dG9uLFxuICBpMThuLFxuICBtb2R1bGVDbGFzc05hbWUsXG4gIG9uQ2xvc2UgPSBub29wLFxuICB0aXRsZSxcbn06IFJlYWRvbmx5PFByb3BzVHlwZT4pOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IG1vZGFsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcmVmTWVyZ2VyID0gdXNlUmVmTWVyZ2VyKCk7XG5cbiAgY29uc3QgYm9keVJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2Nyb2xsZWQsIHNldFNjcm9sbGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2hhc092ZXJmbG93LCBzZXRIYXNPdmVyZmxvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFzSGVhZGVyID0gQm9vbGVhbihoYXNYQnV0dG9uIHx8IHRpdGxlKTtcbiAgY29uc3QgZ2V0Q2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lc0ZvcihCQVNFX0NMQVNTX05BTUUsIG1vZHVsZUNsYXNzTmFtZSk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUmVzaXplKHsgc2Nyb2xsIH06IENvbnRlbnRSZWN0KSB7XG4gICAgY29uc3QgbW9kYWxOb2RlID0gbW9kYWxSZWY/LmN1cnJlbnQ7XG4gICAgaWYgKCFtb2RhbE5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2V0SGFzT3ZlcmZsb3coc2Nyb2xsLmhlaWdodCA+IG1vZGFsTm9kZS5jbGllbnRIZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiBXZSBkb24ndCB3YW50IHRoZSBjbGljayBldmVudCB0byBwcm9wYWdhdGUgdG8gaXRzIGNvbnRhaW5lciBub2RlLiAqL31cbiAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlbiAqL31cbiAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zLCBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgZ2V0Q2xhc3NOYW1lKCcnKSxcbiAgICAgICAgICBnZXRDbGFzc05hbWUoaGFzSGVhZGVyID8gJy0taGFzLWhlYWRlcicgOiAnLS1uby1oZWFkZXInKSxcbiAgICAgICAgICBoYXNTdGlja3lCdXR0b25zICYmIGdldENsYXNzTmFtZSgnLS1zdGlja3ktYnV0dG9ucycpXG4gICAgICAgICl9XG4gICAgICAgIHJlZj17bW9kYWxSZWZ9XG4gICAgICAgIG9uQ2xpY2s9e2V2ZW50ID0+IHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2hhc0hlYWRlciAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19oZWFkZXInKX0+XG4gICAgICAgICAgICB7aGFzWEJ1dHRvbiAmJiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX2Nsb3NlLWJ1dHRvbicpfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3RpdGxlICYmIChcbiAgICAgICAgICAgICAgPGgxXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgZ2V0Q2xhc3NOYW1lKCdfX3RpdGxlJyksXG4gICAgICAgICAgICAgICAgICBoYXNYQnV0dG9uID8gZ2V0Q2xhc3NOYW1lKCdfX3RpdGxlLS13aXRoLXgtYnV0dG9uJykgOiBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxNZWFzdXJlIHNjcm9sbCBvblJlc2l6ZT17aGFuZGxlUmVzaXplfT5cbiAgICAgICAgICB7KHsgbWVhc3VyZVJlZiB9OiBNZWFzdXJlZENvbXBvbmVudFByb3BzKSA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBnZXRDbGFzc05hbWUoJ19fYm9keScpLFxuICAgICAgICAgICAgICAgIHNjcm9sbGVkID8gZ2V0Q2xhc3NOYW1lKCdfX2JvZHktLXNjcm9sbGVkJykgOiBudWxsLFxuICAgICAgICAgICAgICAgIGhhc092ZXJmbG93IHx8IHNjcm9sbGVkXG4gICAgICAgICAgICAgICAgICA/IGdldENsYXNzTmFtZSgnX19ib2R5LS1vdmVyZmxvdycpXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgb25TY3JvbGw9eygpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSBib2R5UmVmLmN1cnJlbnQ/LnNjcm9sbFRvcCB8fCAwO1xuICAgICAgICAgICAgICAgIHNldFNjcm9sbGVkKHNjcm9sbFRvcCA+IDIpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICByZWY9e3JlZk1lcmdlcihtZWFzdXJlUmVmLCBib2R5UmVmKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9NZWFzdXJlPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG5cbk1vZGFsLkJ1dHRvbkZvb3RlciA9IGZ1bmN0aW9uIEJ1dHRvbkZvb3Rlcih7XG4gIGNoaWxkcmVuLFxuICBtb2R1bGVDbGFzc05hbWUsXG59OiBSZWFkb25seTx7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbn0+KTogUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgW3JlZiwgaGFzV3JhcHBlZF0gPSB1c2VIYXNXcmFwcGVkPEhUTUxEaXZFbGVtZW50PigpO1xuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGdldENsYXNzTmFtZXNGb3IoXG4gICAgQkFTRV9DTEFTU19OQU1FLFxuICAgIG1vZHVsZUNsYXNzTmFtZVxuICApKCdfX2J1dHRvbi1mb290ZXInKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICBoYXNXcmFwcGVkID8gYCR7Y2xhc3NOYW1lfS0tb25lLWJ1dHRvbi1wZXItbGluZWAgOiB1bmRlZmluZWRcbiAgICAgICl9XG4gICAgICByZWY9e3JlZn1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQXdDO0FBRXhDLDJCQUFvQjtBQUNwQix3QkFBdUI7QUFDdkIsb0JBQXFCO0FBQ3JCLGlCQUF5QjtBQUd6Qix1QkFBMEI7QUFFMUIsOEJBQWlDO0FBQ2pDLHlCQUE0QjtBQUM1QiwyQkFBOEI7QUFDOUIsMEJBQTZCO0FBa0I3QixNQUFNLGtCQUFrQjtBQUVqQixlQUFlO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ3lDO0FBQ3pDLFFBQU0sRUFBRSxPQUFPLGFBQWEsa0JBQWtCLG9DQUFZLFNBQVM7QUFBQSxJQUNqRSxTQUFTLE1BQU8sR0FBRSxTQUFTLEdBQUcsV0FBVyxtQkFBbUI7QUFBQSxJQUM1RCxPQUFPLFlBQ0wsU0FDSSxFQUFFLFNBQVMsR0FBRyxXQUFXLGtCQUFrQixJQUMzQyxFQUFFLFNBQVMsR0FBRyxXQUFXLG1CQUFtQjtB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
