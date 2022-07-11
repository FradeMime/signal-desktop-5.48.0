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
var LeftPaneDialog_exports = {};
__export(LeftPaneDialog_exports, {
  LeftPaneDialog: () => LeftPaneDialog
});
module.exports = __toCommonJS(LeftPaneDialog_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Tooltip = require("./Tooltip");
var import_util = require("./_util");
const BASE_CLASS_NAME = "LeftPaneDialog";
const TOOLTIP_CLASS_NAME = `${BASE_CLASS_NAME}__tooltip`;
const LeftPaneDialog = /* @__PURE__ */ __name(({
  icon = "warning",
  type,
  onClick,
  clickLabel,
  title,
  subtitle,
  children,
  hoverText,
  hasAction,
  containerWidthBreakpoint,
  hasXButton,
  onClose,
  closeLabel
}) => {
  const onClickWrap = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  }, "onClickWrap");
  const onKeyDownWrap = /* @__PURE__ */ __name((e) => {
    if (e.key !== "Enter" && e.key !== " ") {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  }, "onKeyDownWrap");
  const onCloseWrap = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose?.();
  }, "onCloseWrap");
  const iconClassName = typeof icon === "string" ? (0, import_classnames.default)([
    `${BASE_CLASS_NAME}__icon`,
    `${BASE_CLASS_NAME}__icon--${icon}`
  ]) : void 0;
  let action;
  if (hasAction) {
    action = /* @__PURE__ */ import_react.default.createElement("button", {
      title: clickLabel,
      "aria-label": clickLabel,
      className: `${BASE_CLASS_NAME}__action-text`,
      onClick: onClickWrap,
      tabIndex: 0,
      type: "button"
    }, clickLabel);
  }
  let xButton;
  if (hasXButton) {
    xButton = /* @__PURE__ */ import_react.default.createElement("div", {
      className: `${BASE_CLASS_NAME}__container-close`
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      title: closeLabel,
      "aria-label": closeLabel,
      className: `${BASE_CLASS_NAME}__close-button`,
      onClick: onCloseWrap,
      tabIndex: 0,
      type: "button"
    }));
  }
  const className = (0, import_classnames.default)([
    BASE_CLASS_NAME,
    type === void 0 ? void 0 : `${BASE_CLASS_NAME}--${type}`,
    onClick === void 0 ? void 0 : `${BASE_CLASS_NAME}--clickable`
  ]);
  const message = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, title === void 0 ? void 0 : /* @__PURE__ */ import_react.default.createElement("h3", null, title), subtitle === void 0 ? void 0 : /* @__PURE__ */ import_react.default.createElement("div", null, subtitle), children, action);
  const content = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${BASE_CLASS_NAME}__container`
  }, typeof icon === "string" ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: iconClassName
  }) : icon, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${BASE_CLASS_NAME}__message`
  }, message)), xButton);
  let dialogNode;
  if (onClick) {
    dialogNode = /* @__PURE__ */ import_react.default.createElement("div", {
      className,
      role: "button",
      onClick: onClickWrap,
      onKeyDown: onKeyDownWrap,
      "aria-label": clickLabel,
      title: hoverText,
      tabIndex: 0
    }, content);
  } else {
    dialogNode = /* @__PURE__ */ import_react.default.createElement("div", {
      className,
      title: hoverText
    }, content);
  }
  if (containerWidthBreakpoint === import_util.WidthBreakpoint.Narrow) {
    return /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
      content: message,
      direction: import_Tooltip.TooltipPlacement.Right,
      className: (0, import_classnames.default)(TOOLTIP_CLASS_NAME, type && `${TOOLTIP_CLASS_NAME}--${type}`)
    }, dialogNode);
  }
  return dialogNode;
}, "LeftPaneDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeftPaneDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVEaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgVG9vbHRpcCwgVG9vbHRpcFBsYWNlbWVudCB9IGZyb20gJy4vVG9vbHRpcCc7XG5pbXBvcnQgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuL191dGlsJztcblxuY29uc3QgQkFTRV9DTEFTU19OQU1FID0gJ0xlZnRQYW5lRGlhbG9nJztcbmNvbnN0IFRPT0xUSVBfQ0xBU1NfTkFNRSA9IGAke0JBU0VfQ0xBU1NfTkFNRX1fX3Rvb2x0aXBgO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIHR5cGU/OiAnd2FybmluZycgfCAnZXJyb3InO1xuICBpY29uPzogJ3VwZGF0ZScgfCAncmVsaW5rJyB8ICduZXR3b3JrJyB8ICd3YXJuaW5nJyB8IFJlYWN0Q2hpbGQ7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZT86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIGhvdmVyVGV4dD86IHN0cmluZztcbiAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQ7XG59ICYgKFxuICB8IHtcbiAgICAgIG9uQ2xpY2s/OiB1bmRlZmluZWQ7XG4gICAgICBjbGlja0xhYmVsPzogdW5kZWZpbmVkO1xuICAgICAgaGFzQWN0aW9uPzogZmFsc2U7XG4gICAgfVxuICB8IHtcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG4gICAgICBjbGlja0xhYmVsOiBzdHJpbmc7XG4gICAgICBoYXNBY3Rpb246IHRydWU7XG4gICAgfVxuKSAmXG4gIChcbiAgICB8IHtcbiAgICAgICAgb25DbG9zZT86IHVuZGVmaW5lZDtcbiAgICAgICAgY2xvc2VMYWJlbD86IHVuZGVmaW5lZDtcbiAgICAgICAgaGFzWEJ1dHRvbj86IGZhbHNlO1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICAgICAgICBjbG9zZUxhYmVsOiBzdHJpbmc7XG4gICAgICAgIGhhc1hCdXR0b246IHRydWU7XG4gICAgICB9XG4gICk7XG5cbmV4cG9ydCBjb25zdCBMZWZ0UGFuZURpYWxvZzogUmVhY3QuRkM8UHJvcHNUeXBlPiA9ICh7XG4gIGljb24gPSAnd2FybmluZycsXG4gIHR5cGUsXG4gIG9uQ2xpY2ssXG4gIGNsaWNrTGFiZWwsXG4gIHRpdGxlLFxuICBzdWJ0aXRsZSxcbiAgY2hpbGRyZW4sXG4gIGhvdmVyVGV4dCxcbiAgaGFzQWN0aW9uLFxuXG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludCxcbiAgaGFzWEJ1dHRvbixcbiAgb25DbG9zZSxcbiAgY2xvc2VMYWJlbCxcbn0pID0+IHtcbiAgY29uc3Qgb25DbGlja1dyYXAgPSAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgb25DbGljaz8uKCk7XG4gIH07XG5cbiAgY29uc3Qgb25LZXlEb3duV3JhcCA9IChlOiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgaWYgKGUua2V5ICE9PSAnRW50ZXInICYmIGUua2V5ICE9PSAnICcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIG9uQ2xpY2s/LigpO1xuICB9O1xuXG4gIGNvbnN0IG9uQ2xvc2VXcmFwID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIG9uQ2xvc2U/LigpO1xuICB9O1xuXG4gIGNvbnN0IGljb25DbGFzc05hbWUgPVxuICAgIHR5cGVvZiBpY29uID09PSAnc3RyaW5nJ1xuICAgICAgPyBjbGFzc05hbWVzKFtcbiAgICAgICAgICBgJHtCQVNFX0NMQVNTX05BTUV9X19pY29uYCxcbiAgICAgICAgICBgJHtCQVNFX0NMQVNTX05BTUV9X19pY29uLS0ke2ljb259YCxcbiAgICAgICAgXSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gIGxldCBhY3Rpb246IFJlYWN0Tm9kZTtcbiAgaWYgKGhhc0FjdGlvbikge1xuICAgIGFjdGlvbiA9IChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdGl0bGU9e2NsaWNrTGFiZWx9XG4gICAgICAgIGFyaWEtbGFiZWw9e2NsaWNrTGFiZWx9XG4gICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU19OQU1FfV9fYWN0aW9uLXRleHRgfVxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrV3JhcH1cbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgPlxuICAgICAgICB7Y2xpY2tMYWJlbH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICBsZXQgeEJ1dHRvbjogUmVhY3ROb2RlO1xuICBpZiAoaGFzWEJ1dHRvbikge1xuICAgIHhCdXR0b24gPSAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU19OQU1FfV9fY29udGFpbmVyLWNsb3NlYH0+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0aXRsZT17Y2xvc2VMYWJlbH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtjbG9zZUxhYmVsfVxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU19OQU1FfV9fY2xvc2UtYnV0dG9uYH1cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlV3JhcH1cbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKFtcbiAgICBCQVNFX0NMQVNTX05BTUUsXG4gICAgdHlwZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogYCR7QkFTRV9DTEFTU19OQU1FfS0tJHt0eXBlfWAsXG4gICAgb25DbGljayA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogYCR7QkFTRV9DTEFTU19OQU1FfS0tY2xpY2thYmxlYCxcbiAgXSk7XG5cbiAgY29uc3QgbWVzc2FnZSA9IChcbiAgICA8PlxuICAgICAge3RpdGxlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiA8aDM+e3RpdGxlfTwvaDM+fVxuICAgICAge3N1YnRpdGxlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiA8ZGl2PntzdWJ0aXRsZX08L2Rpdj59XG4gICAgICB7Y2hpbGRyZW59XG4gICAgICB7YWN0aW9ufVxuICAgIDwvPlxuICApO1xuXG4gIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTX05BTUV9X19jb250YWluZXJgfT5cbiAgICAgICAge3R5cGVvZiBpY29uID09PSAnc3RyaW5nJyA/IDxkaXYgY2xhc3NOYW1lPXtpY29uQ2xhc3NOYW1lfSAvPiA6IGljb259XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTX05BTUV9X19tZXNzYWdlYH0+e21lc3NhZ2V9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHt4QnV0dG9ufVxuICAgIDwvPlxuICApO1xuXG4gIGxldCBkaWFsb2dOb2RlOiBSZWFjdENoaWxkO1xuICBpZiAob25DbGljaykge1xuICAgIGRpYWxvZ05vZGUgPSAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja1dyYXB9XG4gICAgICAgIG9uS2V5RG93bj17b25LZXlEb3duV3JhcH1cbiAgICAgICAgYXJpYS1sYWJlbD17Y2xpY2tMYWJlbH1cbiAgICAgICAgdGl0bGU9e2hvdmVyVGV4dH1cbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICA+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBkaWFsb2dOb2RlID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdGl0bGU9e2hvdmVyVGV4dH0+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChjb250YWluZXJXaWR0aEJyZWFrcG9pbnQgPT09IFdpZHRoQnJlYWtwb2ludC5OYXJyb3cpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgY29udGVudD17bWVzc2FnZX1cbiAgICAgICAgZGlyZWN0aW9uPXtUb29sdGlwUGxhY2VtZW50LlJpZ2h0fVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgVE9PTFRJUF9DTEFTU19OQU1FLFxuICAgICAgICAgIHR5cGUgJiYgYCR7VE9PTFRJUF9DTEFTU19OQU1FfS0tJHt0eXBlfWBcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAge2RpYWxvZ05vZGV9XG4gICAgICA8L1Rvb2x0aXA+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkaWFsb2dOb2RlO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBQ3ZCLHFCQUEwQztBQUMxQyxrQkFBZ0M7QUFFaEMsTUFB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
