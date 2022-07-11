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
var CallingButton_exports = {};
__export(CallingButton_exports, {
  CallingButton: () => CallingButton,
  CallingButtonType: () => CallingButtonType
});
module.exports = __toCommonJS(CallingButton_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_uuid = require("uuid");
var import_Tooltip = require("./Tooltip");
var import_theme = require("../util/theme");
var CallingButtonType = /* @__PURE__ */ ((CallingButtonType2) => {
  CallingButtonType2["AUDIO_DISABLED"] = "AUDIO_DISABLED";
  CallingButtonType2["AUDIO_OFF"] = "AUDIO_OFF";
  CallingButtonType2["AUDIO_ON"] = "AUDIO_ON";
  CallingButtonType2["HANG_UP"] = "HANG_UP";
  CallingButtonType2["PRESENTING_DISABLED"] = "PRESENTING_DISABLED";
  CallingButtonType2["PRESENTING_OFF"] = "PRESENTING_OFF";
  CallingButtonType2["PRESENTING_ON"] = "PRESENTING_ON";
  CallingButtonType2["RING_DISABLED"] = "RING_DISABLED";
  CallingButtonType2["RING_OFF"] = "RING_OFF";
  CallingButtonType2["RING_ON"] = "RING_ON";
  CallingButtonType2["VIDEO_DISABLED"] = "VIDEO_DISABLED";
  CallingButtonType2["VIDEO_OFF"] = "VIDEO_OFF";
  CallingButtonType2["VIDEO_ON"] = "VIDEO_ON";
  return CallingButtonType2;
})(CallingButtonType || {});
const CallingButton = /* @__PURE__ */ __name(({
  buttonType,
  i18n,
  isVisible = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltipDirection
}) => {
  const uniqueButtonId = (0, import_react.useMemo)(() => (0, import_uuid.v4)(), []);
  let classNameSuffix = "";
  let tooltipContent = "";
  let label = "";
  let disabled = false;
  if (buttonType === "AUDIO_DISABLED" /* AUDIO_DISABLED */) {
    classNameSuffix = "audio--disabled";
    tooltipContent = i18n("calling__button--audio-disabled");
    label = i18n("calling__button--audio__label");
    disabled = true;
  } else if (buttonType === "AUDIO_OFF" /* AUDIO_OFF */) {
    classNameSuffix = "audio--off";
    tooltipContent = i18n("calling__button--audio-on");
    label = i18n("calling__button--audio__label");
  } else if (buttonType === "AUDIO_ON" /* AUDIO_ON */) {
    classNameSuffix = "audio--on";
    tooltipContent = i18n("calling__button--audio-off");
    label = i18n("calling__button--audio__label");
  } else if (buttonType === "VIDEO_DISABLED" /* VIDEO_DISABLED */) {
    classNameSuffix = "video--disabled";
    tooltipContent = i18n("calling__button--video-disabled");
    disabled = true;
    label = i18n("calling__button--video__label");
  } else if (buttonType === "VIDEO_OFF" /* VIDEO_OFF */) {
    classNameSuffix = "video--off";
    tooltipContent = i18n("calling__button--video-on");
    label = i18n("calling__button--video__label");
  } else if (buttonType === "VIDEO_ON" /* VIDEO_ON */) {
    classNameSuffix = "video--on";
    tooltipContent = i18n("calling__button--video-off");
    label = i18n("calling__button--video__label");
  } else if (buttonType === "HANG_UP" /* HANG_UP */) {
    classNameSuffix = "hangup";
    tooltipContent = i18n("calling__hangup");
    label = i18n("calling__hangup");
  } else if (buttonType === "RING_DISABLED" /* RING_DISABLED */) {
    classNameSuffix = "ring--disabled";
    disabled = true;
    tooltipContent = i18n("calling__button--ring__disabled-because-group-is-too-large");
    label = i18n("calling__button--ring__label");
  } else if (buttonType === "RING_OFF" /* RING_OFF */) {
    classNameSuffix = "ring--off";
    tooltipContent = i18n("calling__button--ring__on");
    label = i18n("calling__button--ring__label");
  } else if (buttonType === "RING_ON" /* RING_ON */) {
    classNameSuffix = "ring--on";
    tooltipContent = i18n("calling__button--ring__off");
    label = i18n("calling__button--ring__label");
  } else if (buttonType === "PRESENTING_DISABLED" /* PRESENTING_DISABLED */) {
    classNameSuffix = "presenting--disabled";
    tooltipContent = i18n("calling__button--presenting-disabled");
    disabled = true;
    label = i18n("calling__button--presenting__label");
  } else if (buttonType === "PRESENTING_ON" /* PRESENTING_ON */) {
    classNameSuffix = "presenting--on";
    tooltipContent = i18n("calling__button--presenting-off");
    label = i18n("calling__button--presenting__label");
  } else if (buttonType === "PRESENTING_OFF" /* PRESENTING_OFF */) {
    classNameSuffix = "presenting--off";
    tooltipContent = i18n("calling__button--presenting-on");
    label = i18n("calling__button--presenting__label");
  }
  const className = (0, import_classnames.default)("CallingButton__icon", `CallingButton__icon--${classNameSuffix}`);
  return /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
    content: tooltipContent,
    direction: tooltipDirection,
    theme: import_theme.Theme.Dark
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("CallingButton__container", !isVisible && "CallingButton__container--hidden")
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": tooltipContent,
    className,
    disabled,
    id: uniqueButtonId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    type: "button"
  }, /* @__PURE__ */ import_react.default.createElement("div", null)), /* @__PURE__ */ import_react.default.createElement("label", {
    className: "CallingButton__label",
    htmlFor: uniqueButtonId
  }, label)));
}, "CallingButton");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingButton,
  CallingButtonType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0J1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHR5cGUgeyBUb29sdGlwUGxhY2VtZW50IH0gZnJvbSAnLi9Ub29sdGlwJztcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuL1Rvb2x0aXAnO1xuaW1wb3J0IHsgVGhlbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgZW51bSBDYWxsaW5nQnV0dG9uVHlwZSB7XG4gIEFVRElPX0RJU0FCTEVEID0gJ0FVRElPX0RJU0FCTEVEJyxcbiAgQVVESU9fT0ZGID0gJ0FVRElPX09GRicsXG4gIEFVRElPX09OID0gJ0FVRElPX09OJyxcbiAgSEFOR19VUCA9ICdIQU5HX1VQJyxcbiAgUFJFU0VOVElOR19ESVNBQkxFRCA9ICdQUkVTRU5USU5HX0RJU0FCTEVEJyxcbiAgUFJFU0VOVElOR19PRkYgPSAnUFJFU0VOVElOR19PRkYnLFxuICBQUkVTRU5USU5HX09OID0gJ1BSRVNFTlRJTkdfT04nLFxuICBSSU5HX0RJU0FCTEVEID0gJ1JJTkdfRElTQUJMRUQnLFxuICBSSU5HX09GRiA9ICdSSU5HX09GRicsXG4gIFJJTkdfT04gPSAnUklOR19PTicsXG4gIFZJREVPX0RJU0FCTEVEID0gJ1ZJREVPX0RJU0FCTEVEJyxcbiAgVklERU9fT0ZGID0gJ1ZJREVPX09GRicsXG4gIFZJREVPX09OID0gJ1ZJREVPX09OJyxcbn1cblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBidXR0b25UeXBlOiBDYWxsaW5nQnV0dG9uVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNWaXNpYmxlPzogYm9vbGVhbjtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbiAgb25Nb3VzZUVudGVyPzogKCkgPT4gdm9pZDtcbiAgb25Nb3VzZUxlYXZlPzogKCkgPT4gdm9pZDtcbiAgdG9vbHRpcERpcmVjdGlvbj86IFRvb2x0aXBQbGFjZW1lbnQ7XG59O1xuXG5leHBvcnQgY29uc3QgQ2FsbGluZ0J1dHRvbiA9ICh7XG4gIGJ1dHRvblR5cGUsXG4gIGkxOG4sXG4gIGlzVmlzaWJsZSA9IHRydWUsXG4gIG9uQ2xpY2ssXG4gIG9uTW91c2VFbnRlcixcbiAgb25Nb3VzZUxlYXZlLFxuICB0b29sdGlwRGlyZWN0aW9uLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB1bmlxdWVCdXR0b25JZCA9IHVzZU1lbW8oKCkgPT4gdXVpZCgpLCBbXSk7XG5cbiAgbGV0IGNsYXNzTmFtZVN1ZmZpeCA9ICcnO1xuICBsZXQgdG9vbHRpcENvbnRlbnQgPSAnJztcbiAgbGV0IGxhYmVsID0gJyc7XG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoYnV0dG9uVHlwZSA9PT0gQ2FsbGluZ0J1dHRvblR5cGUuQVVESU9fRElTQUJMRUQpIHtcbiAgICBjbGFzc05hbWVTdWZmaXggPSAnYXVkaW8tLWRpc2FibGVkJztcbiAgICB0b29sdGlwQ29udGVudCA9IGkxOG4oJ2NhbGxpbmdfX2J1dHRvbi0tYXVkaW8tZGlzYWJsZWQnKTtcbiAgICBsYWJlbCA9IGkxOG4oJ2NhbGxpbmdfX2J1dHRvbi0tYXVkaW9fX2xhYmVsJyk7XG4gICAgZGlzYWJsZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLkFVRElPX09GRikge1xuICAgIGNsYXNzTmFtZVN1ZmZpeCA9ICdhdWRpby0tb2ZmJztcbiAgICB0b29sdGlwQ29udGVudCA9IGkxOG4oJ2NhbGxpbmdfX2J1dHRvbi0tYXVkaW8tb24nKTtcbiAgICBsYWJlbCA9IGkxOG4oJ2NhbGxpbmdfX2J1dHRvbi0tYXVkaW9fX2xhYmVsJyk7XG4gIH0gZWxzZSBpZiAoYnV0dG9uVHlwZSA9PT0gQ2FsbGluZ0J1dHRvblR5cGUuQVVESU9fT04pIHtcbiAgICBjbGFzc05hbWVTdWZmaXggPSAnYXVkaW8tLW9uJztcbiAgICB0b29sdGlwQ29udGVudCA9IGkxOG4oJ2NhbGxpbmdfX2J1dHRvbi0tYXVkaW8tb2ZmJyk7XG4gICAgbGFiZWwgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLWF1ZGlvX19sYWJlbCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlZJREVPX0RJU0FCTEVEKSB7XG4gICAgY2xhc3NOYW1lU3VmZml4ID0gJ3ZpZGVvLS1kaXNhYmxlZCc7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXZpZGVvLWRpc2FibGVkJyk7XG4gICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgIGxhYmVsID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS12aWRlb19fbGFiZWwnKTtcbiAgfSBlbHNlIGlmIChidXR0b25UeXBlID09PSBDYWxsaW5nQnV0dG9uVHlwZS5WSURFT19PRkYpIHtcbiAgICBjbGFzc05hbWVTdWZmaXggPSAndmlkZW8tLW9mZic7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXZpZGVvLW9uJyk7XG4gICAgbGFiZWwgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXZpZGVvX19sYWJlbCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlZJREVPX09OKSB7XG4gICAgY2xhc3NOYW1lU3VmZml4ID0gJ3ZpZGVvLS1vbic7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXZpZGVvLW9mZicpO1xuICAgIGxhYmVsID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS12aWRlb19fbGFiZWwnKTtcbiAgfSBlbHNlIGlmIChidXR0b25UeXBlID09PSBDYWxsaW5nQnV0dG9uVHlwZS5IQU5HX1VQKSB7XG4gICAgY2xhc3NOYW1lU3VmZml4ID0gJ2hhbmd1cCc7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19oYW5ndXAnKTtcbiAgICBsYWJlbCA9IGkxOG4oJ2NhbGxpbmdfX2hhbmd1cCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlJJTkdfRElTQUJMRUQpIHtcbiAgICBjbGFzc05hbWVTdWZmaXggPSAncmluZy0tZGlzYWJsZWQnO1xuICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICB0b29sdGlwQ29udGVudCA9IGkxOG4oXG4gICAgICAnY2FsbGluZ19fYnV0dG9uLS1yaW5nX19kaXNhYmxlZC1iZWNhdXNlLWdyb3VwLWlzLXRvby1sYXJnZSdcbiAgICApO1xuICAgIGxhYmVsID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS1yaW5nX19sYWJlbCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlJJTkdfT0ZGKSB7XG4gICAgY2xhc3NOYW1lU3VmZml4ID0gJ3JpbmctLW9mZic7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXJpbmdfX29uJyk7XG4gICAgbGFiZWwgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXJpbmdfX2xhYmVsJyk7XG4gIH0gZWxzZSBpZiAoYnV0dG9uVHlwZSA9PT0gQ2FsbGluZ0J1dHRvblR5cGUuUklOR19PTikge1xuICAgIGNsYXNzTmFtZVN1ZmZpeCA9ICdyaW5nLS1vbic7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXJpbmdfX29mZicpO1xuICAgIGxhYmVsID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS1yaW5nX19sYWJlbCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlBSRVNFTlRJTkdfRElTQUJMRUQpIHtcbiAgICBjbGFzc05hbWVTdWZmaXggPSAncHJlc2VudGluZy0tZGlzYWJsZWQnO1xuICAgIHRvb2x0aXBDb250ZW50ID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS1wcmVzZW50aW5nLWRpc2FibGVkJyk7XG4gICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgIGxhYmVsID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS1wcmVzZW50aW5nX19sYWJlbCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlBSRVNFTlRJTkdfT04pIHtcbiAgICBjbGFzc05hbWVTdWZmaXggPSAncHJlc2VudGluZy0tb24nO1xuICAgIHRvb2x0aXBDb250ZW50ID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS1wcmVzZW50aW5nLW9mZicpO1xuICAgIGxhYmVsID0gaTE4bignY2FsbGluZ19fYnV0dG9uLS1wcmVzZW50aW5nX19sYWJlbCcpO1xuICB9IGVsc2UgaWYgKGJ1dHRvblR5cGUgPT09IENhbGxpbmdCdXR0b25UeXBlLlBSRVNFTlRJTkdfT0ZGKSB7XG4gICAgY2xhc3NOYW1lU3VmZml4ID0gJ3ByZXNlbnRpbmctLW9mZic7XG4gICAgdG9vbHRpcENvbnRlbnQgPSBpMThuKCdjYWxsaW5nX19idXR0b24tLXByZXNlbnRpbmctb24nKTtcbiAgICBsYWJlbCA9IGkxOG4oJ2NhbGxpbmdfX2J1dHRvbi0tcHJlc2VudGluZ19fbGFiZWwnKTtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgJ0NhbGxpbmdCdXR0b25fX2ljb24nLFxuICAgIGBDYWxsaW5nQnV0dG9uX19pY29uLS0ke2NsYXNzTmFtZVN1ZmZpeH1gXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8VG9vbHRpcFxuICAgICAgY29udGVudD17dG9vbHRpcENvbnRlbnR9XG4gICAgICBkaXJlY3Rpb249e3Rvb2x0aXBEaXJlY3Rpb259XG4gICAgICB0aGVtZT17VGhlbWUuRGFya31cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnQ2FsbGluZ0J1dHRvbl9fY29udGFpbmVyJyxcbiAgICAgICAgICAhaXNWaXNpYmxlICYmICdDYWxsaW5nQnV0dG9uX19jb250YWluZXItLWhpZGRlbidcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e3Rvb2x0aXBDb250ZW50fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBpZD17dW5pcXVlQnV0dG9uSWR9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICBvbk1vdXNlRW50ZXI9e29uTW91c2VFbnRlcn1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e29uTW91c2VMZWF2ZX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJDYWxsaW5nQnV0dG9uX19sYWJlbFwiIGh0bWxGb3I9e3VuaXF1ZUJ1dHRvbklkfT5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L1Rvb2x0aXA+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQStCO0FBQy9CLHdCQUF1QjtBQUN2QixrQkFBMkI7QUFFM0IscUJBQXdCO0FB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
