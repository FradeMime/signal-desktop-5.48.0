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
var Input_exports = {};
__export(Input_exports, {
  Input: () => Input
});
module.exports = __toCommonJS(Input_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var grapheme = __toESM(require("../util/grapheme"));
var import_getClassNamesFor = require("../util/getClassNamesFor");
var import_useRefMerger = require("../hooks/useRefMerger");
var import_Bytes = require("../Bytes");
const Input = (0, import_react.forwardRef)(({
  countBytes = import_Bytes.byteLength,
  countLength = grapheme.count,
  disabled,
  disableSpellcheck,
  expandable,
  hasClearButton,
  i18n,
  icon,
  maxByteCount = 0,
  maxLengthCount = 0,
  moduleClassName,
  onChange,
  onEnter,
  placeholder,
  value = "",
  whenToShowRemainingCount = Infinity
}, ref) => {
  const innerRef = (0, import_react.useRef)(null);
  const valueOnKeydownRef = (0, import_react.useRef)(value);
  const selectionStartOnKeydownRef = (0, import_react.useRef)(value.length);
  const [isLarge, setIsLarge] = (0, import_react.useState)(false);
  const refMerger = (0, import_useRefMerger.useRefMerger)();
  const maybeSetLarge = (0, import_react.useCallback)(() => {
    if (!expandable) {
      return;
    }
    const inputEl = innerRef.current;
    if (!inputEl) {
      return;
    }
    if (inputEl.scrollHeight > inputEl.clientHeight || inputEl.scrollWidth > inputEl.clientWidth) {
      setIsLarge(true);
    }
  }, [expandable]);
  const handleKeyDown = (0, import_react.useCallback)((event) => {
    if (onEnter && event.key === "Enter") {
      onEnter();
    }
    const inputEl = innerRef.current;
    if (!inputEl) {
      return;
    }
    valueOnKeydownRef.current = inputEl.value;
    selectionStartOnKeydownRef.current = inputEl.selectionStart || 0;
  }, [onEnter]);
  const handleChange = (0, import_react.useCallback)(() => {
    const inputEl = innerRef.current;
    if (!inputEl) {
      return;
    }
    const newValue = inputEl.value;
    const newLengthCount = maxLengthCount ? countLength(newValue) : 0;
    const newByteCount = maxByteCount ? countBytes(newValue) : 0;
    if (newLengthCount <= maxLengthCount && newByteCount <= maxByteCount) {
      onChange(newValue);
    } else {
      inputEl.value = valueOnKeydownRef.current;
      inputEl.selectionStart = selectionStartOnKeydownRef.current;
      inputEl.selectionEnd = selectionStartOnKeydownRef.current;
    }
    maybeSetLarge();
  }, [
    countLength,
    countBytes,
    maxLengthCount,
    maxByteCount,
    maybeSetLarge,
    onChange
  ]);
  const handlePaste = (0, import_react.useCallback)((event) => {
    const inputEl = innerRef.current;
    if (!inputEl || !maxLengthCount || !maxByteCount) {
      return;
    }
    const selectionStart = inputEl.selectionStart || 0;
    const selectionEnd = inputEl.selectionEnd || inputEl.selectionStart || 0;
    const textBeforeSelection = value.slice(0, selectionStart);
    const textAfterSelection = value.slice(selectionEnd);
    const pastedText = event.clipboardData.getData("Text");
    const newLengthCount = countLength(textBeforeSelection) + countLength(pastedText) + countLength(textAfterSelection);
    const newByteCount = countBytes(textBeforeSelection) + countBytes(pastedText) + countBytes(textAfterSelection);
    if (newLengthCount > maxLengthCount || newByteCount > maxByteCount) {
      event.preventDefault();
    }
    maybeSetLarge();
  }, [
    countLength,
    countBytes,
    maxLengthCount,
    maxByteCount,
    maybeSetLarge,
    value
  ]);
  (0, import_react.useEffect)(() => {
    maybeSetLarge();
  }, [maybeSetLarge]);
  const lengthCount = maxLengthCount ? countLength(value) : -1;
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("Input", moduleClassName);
  const inputProps = {
    className: (0, import_classnames.default)(getClassName("__input"), icon && getClassName("__input--with-icon"), isLarge && getClassName("__input--large")),
    disabled: Boolean(disabled),
    spellCheck: !disableSpellcheck,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onPaste: handlePaste,
    placeholder,
    ref: refMerger(ref, innerRef),
    type: "text",
    value
  };
  const clearButtonElement = hasClearButton && value ? /* @__PURE__ */ import_react.default.createElement("button", {
    tabIndex: -1,
    className: getClassName("__clear-icon"),
    onClick: () => onChange(""),
    type: "button",
    "aria-label": i18n("cancel")
  }) : null;
  const lengthCountElement = lengthCount >= whenToShowRemainingCount && /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__remaining-count")
  }, maxLengthCount - lengthCount);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName("__container"), disabled && getClassName("__container--disabled"))
  }, icon ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__icon")
  }, icon) : null, expandable ? /* @__PURE__ */ import_react.default.createElement("textarea", {
    ...inputProps
  }) : /* @__PURE__ */ import_react.default.createElement("input", {
    ...inputProps
  }), isLarge ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__controls")
  }, clearButtonElement), /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__remaining-count--large")
  }, lengthCountElement)) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__controls")
  }, lengthCountElement, clearButtonElement));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Input
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5wdXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDbGlwYm9hcmRFdmVudCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7XG4gIGZvcndhcmRSZWYsXG4gIHVzZUNhbGxiYWNrLFxuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgKiBhcyBncmFwaGVtZSBmcm9tICcuLi91dGlsL2dyYXBoZW1lJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgZ2V0Q2xhc3NOYW1lc0ZvciB9IGZyb20gJy4uL3V0aWwvZ2V0Q2xhc3NOYW1lc0Zvcic7XG5pbXBvcnQgeyB1c2VSZWZNZXJnZXIgfSBmcm9tICcuLi9ob29rcy91c2VSZWZNZXJnZXInO1xuaW1wb3J0IHsgYnl0ZUxlbmd0aCB9IGZyb20gJy4uL0J5dGVzJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjb3VudEJ5dGVzPzogKHZhbHVlOiBzdHJpbmcpID0+IG51bWJlcjtcbiAgY291bnRMZW5ndGg/OiAodmFsdWU6IHN0cmluZykgPT4gbnVtYmVyO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGRpc2FibGVTcGVsbGNoZWNrPzogYm9vbGVhbjtcbiAgZXhwYW5kYWJsZT86IGJvb2xlYW47XG4gIGhhc0NsZWFyQnV0dG9uPzogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaWNvbj86IFJlYWN0Tm9kZTtcbiAgbWF4Qnl0ZUNvdW50PzogbnVtYmVyO1xuICBtYXhMZW5ndGhDb3VudD86IG51bWJlcjtcbiAgbW9kdWxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uRW50ZXI/OiAoKSA9PiB1bmtub3duO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZT86IHN0cmluZztcbiAgd2hlblRvU2hvd1JlbWFpbmluZ0NvdW50PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBTb21lIGlucHV0cyBtdXN0IGhhdmUgZmV3ZXIgdGhhbiBtYXhMZW5ndGhDb3VudCBnbHlwaHMuIElkZWFsbHksIHdlJ2QgdXNlIHRoZVxuICogYG1heExlbmd0aGAgcHJvcGVydHkgb24gaW5wdXRzLCBidXQgdGhhdCBkb2Vzbid0IGFjY291bnQgZm9yIGdseXBocyB0aGF0IGFyZSBtb3JlIHRoYW5cbiAqIG9uZSBVVEYtMTYgY29kZSB1bml0cy4gRm9yIGV4YW1wbGU6IGAnXHVEODNEXHVEQ0E5XHVEODNEXHVEQ0E5Jy5sZW5ndGggPT09IDRgLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGVmZmVjdGl2ZWx5IGltcGxlbWVudHMgYSBcIm1heCBncmFwaGVtZSBsZW5ndGhcIiBvbiBhbiBpbnB1dC5cbiAqXG4gKiBBdCBhIGhpZ2ggbGV2ZWwsIHRoaXMgY29tcG9uZW50IGhhbmRsZXMgdHdvIG1ldGhvZHMgb2YgaW5wdXQ6XG4gKlxuICogLSBgb25DaGFuZ2VgLiAqQmVmb3JlKiB0aGUgdmFsdWUgaXMgY2hhbmdlZCAoaW4gYG9uS2V5RG93bmApLCB3ZSBzYXZlIHRoZSB2YWx1ZSBhbmQgdGhlXG4gKiAgIGN1cnNvciBwb3NpdGlvbi4gVGhlbiwgaW4gYG9uQ2hhbmdlYCwgd2Ugc2VlIGlmIHRoZSBuZXcgdmFsdWUgaXMgdG9vIGxvbmcuIElmIGl0IGlzLFxuICogICB3ZSByZXZlcnQgdGhlIHZhbHVlIGFuZCBzZWxlY3Rpb24uIE90aGVyd2lzZSwgd2UgZmlyZSBgb25DaGFuZ2VWYWx1ZWAuXG4gKlxuICogLSBgb25QYXN0ZWAuIElmIHlvdSdyZSBwYXN0aW5nIHNvbWV0aGluZyB0aGF0IHdpbGwgZml0LCB3ZSBmYWxsIGJhY2sgdG8gbm9ybWFsIGJyb3dzZXJcbiAqICAgYmVoYXZpb3IsIHdoaWNoIGNhbGxzIGBvbkNoYW5nZWAuIElmIHlvdSdyZSBwYXN0aW5nIHNvbWV0aGluZyB0aGF0IHdvbid0IGZpdCwgaXQncyBhXG4gKiAgIG5vb3AuXG4gKi9cbmV4cG9ydCBjb25zdCBJbnB1dCA9IGZvcndhcmRSZWY8XG4gIEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LFxuICBQcm9wc1R5cGVcbj4oXG4gIChcbiAgICB7XG4gICAgICBjb3VudEJ5dGVzID0gYnl0ZUxlbmd0aCxcbiAgICAgIGNvdW50TGVuZ3RoID0gZ3JhcGhlbWUuY291bnQsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIGRpc2FibGVTcGVsbGNoZWNrLFxuICAgICAgZXhwYW5kYWJsZSxcbiAgICAgIGhhc0NsZWFyQnV0dG9uLFxuICAgICAgaTE4bixcbiAgICAgIGljb24sXG4gICAgICBtYXhCeXRlQ291bnQgPSAwLFxuICAgICAgbWF4TGVuZ3RoQ291bnQgPSAwLFxuICAgICAgbW9kdWxlQ2xhc3NOYW1lLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICBvbkVudGVyLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICB2YWx1ZSA9ICcnLFxuICAgICAgd2hlblRvU2hvd1JlbWFpbmluZ0NvdW50ID0gSW5maW5pdHksXG4gICAgfSxcbiAgICByZWZcbiAgKSA9PiB7XG4gICAgY29uc3QgaW5uZXJSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsPihcbiAgICAgIG51bGxcbiAgICApO1xuICAgIGNvbnN0IHZhbHVlT25LZXlkb3duUmVmID0gdXNlUmVmPHN0cmluZz4odmFsdWUpO1xuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0T25LZXlkb3duUmVmID0gdXNlUmVmPG51bWJlcj4odmFsdWUubGVuZ3RoKTtcbiAgICBjb25zdCBbaXNMYXJnZSwgc2V0SXNMYXJnZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgcmVmTWVyZ2VyID0gdXNlUmVmTWVyZ2VyKCk7XG5cbiAgICBjb25zdCBtYXliZVNldExhcmdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgaWYgKCFleHBhbmRhYmxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXRFbCA9IGlubmVyUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIWlucHV0RWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGlucHV0RWwuc2Nyb2xsSGVpZ2h0ID4gaW5wdXRFbC5jbGllbnRIZWlnaHQgfHxcbiAgICAgICAgaW5wdXRFbC5zY3JvbGxXaWR0aCA+IGlucHV0RWwuY2xpZW50V2lkdGhcbiAgICAgICkge1xuICAgICAgICBzZXRJc0xhcmdlKHRydWUpO1xuICAgICAgfVxuICAgIH0sIFtleHBhbmRhYmxlXSk7XG5cbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgICBldmVudCA9PiB7XG4gICAgICAgIGlmIChvbkVudGVyICYmIGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgIG9uRW50ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlucHV0RWwgPSBpbm5lclJlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIWlucHV0RWwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZU9uS2V5ZG93blJlZi5jdXJyZW50ID0gaW5wdXRFbC52YWx1ZTtcbiAgICAgICAgc2VsZWN0aW9uU3RhcnRPbktleWRvd25SZWYuY3VycmVudCA9IGlucHV0RWwuc2VsZWN0aW9uU3RhcnQgfHwgMDtcbiAgICAgIH0sXG4gICAgICBbb25FbnRlcl1cbiAgICApO1xuXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXRFbCA9IGlubmVyUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIWlucHV0RWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IGlucHV0RWwudmFsdWU7XG5cbiAgICAgIGNvbnN0IG5ld0xlbmd0aENvdW50ID0gbWF4TGVuZ3RoQ291bnQgPyBjb3VudExlbmd0aChuZXdWYWx1ZSkgOiAwO1xuICAgICAgY29uc3QgbmV3Qnl0ZUNvdW50ID0gbWF4Qnl0ZUNvdW50ID8gY291bnRCeXRlcyhuZXdWYWx1ZSkgOiAwO1xuXG4gICAgICBpZiAobmV3TGVuZ3RoQ291bnQgPD0gbWF4TGVuZ3RoQ291bnQgJiYgbmV3Qnl0ZUNvdW50IDw9IG1heEJ5dGVDb3VudCkge1xuICAgICAgICBvbkNoYW5nZShuZXdWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dEVsLnZhbHVlID0gdmFsdWVPbktleWRvd25SZWYuY3VycmVudDtcbiAgICAgICAgaW5wdXRFbC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0T25LZXlkb3duUmVmLmN1cnJlbnQ7XG4gICAgICAgIGlucHV0RWwuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uU3RhcnRPbktleWRvd25SZWYuY3VycmVudDtcbiAgICAgIH1cblxuICAgICAgbWF5YmVTZXRMYXJnZSgpO1xuICAgIH0sIFtcbiAgICAgIGNvdW50TGVuZ3RoLFxuICAgICAgY291bnRCeXRlcyxcbiAgICAgIG1heExlbmd0aENvdW50LFxuICAgICAgbWF4Qnl0ZUNvdW50LFxuICAgICAgbWF5YmVTZXRMYXJnZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgIF0pO1xuXG4gICAgY29uc3QgaGFuZGxlUGFzdGUgPSB1c2VDYWxsYmFjayhcbiAgICAgIChldmVudDogQ2xpcGJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0RWwgPSBpbm5lclJlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIWlucHV0RWwgfHwgIW1heExlbmd0aENvdW50IHx8ICFtYXhCeXRlQ291bnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IGlucHV0RWwuc2VsZWN0aW9uU3RhcnQgfHwgMDtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kID1cbiAgICAgICAgICBpbnB1dEVsLnNlbGVjdGlvbkVuZCB8fCBpbnB1dEVsLnNlbGVjdGlvblN0YXJ0IHx8IDA7XG4gICAgICAgIGNvbnN0IHRleHRCZWZvcmVTZWxlY3Rpb24gPSB2YWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgIGNvbnN0IHRleHRBZnRlclNlbGVjdGlvbiA9IHZhbHVlLnNsaWNlKHNlbGVjdGlvbkVuZCk7XG5cbiAgICAgICAgY29uc3QgcGFzdGVkVGV4dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xuXG4gICAgICAgIGNvbnN0IG5ld0xlbmd0aENvdW50ID1cbiAgICAgICAgICBjb3VudExlbmd0aCh0ZXh0QmVmb3JlU2VsZWN0aW9uKSArXG4gICAgICAgICAgY291bnRMZW5ndGgocGFzdGVkVGV4dCkgK1xuICAgICAgICAgIGNvdW50TGVuZ3RoKHRleHRBZnRlclNlbGVjdGlvbik7XG4gICAgICAgIGNvbnN0IG5ld0J5dGVDb3VudCA9XG4gICAgICAgICAgY291bnRCeXRlcyh0ZXh0QmVmb3JlU2VsZWN0aW9uKSArXG4gICAgICAgICAgY291bnRCeXRlcyhwYXN0ZWRUZXh0KSArXG4gICAgICAgICAgY291bnRCeXRlcyh0ZXh0QWZ0ZXJTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChuZXdMZW5ndGhDb3VudCA+IG1heExlbmd0aENvdW50IHx8IG5ld0J5dGVDb3VudCA+IG1heEJ5dGVDb3VudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXliZVNldExhcmdlKCk7XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBjb3VudExlbmd0aCxcbiAgICAgICAgY291bnRCeXRlcyxcbiAgICAgICAgbWF4TGVuZ3RoQ291bnQsXG4gICAgICAgIG1heEJ5dGVDb3VudCxcbiAgICAgICAgbWF5YmVTZXRMYXJnZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICBdXG4gICAgKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBtYXliZVNldExhcmdlKCk7XG4gICAgfSwgW21heWJlU2V0TGFyZ2VdKTtcblxuICAgIGNvbnN0IGxlbmd0aENvdW50ID0gbWF4TGVuZ3RoQ291bnQgPyBjb3VudExlbmd0aCh2YWx1ZSkgOiAtMTtcbiAgICBjb25zdCBnZXRDbGFzc05hbWUgPSBnZXRDbGFzc05hbWVzRm9yKCdJbnB1dCcsIG1vZHVsZUNsYXNzTmFtZSk7XG5cbiAgICBjb25zdCBpbnB1dFByb3BzID0ge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKFxuICAgICAgICBnZXRDbGFzc05hbWUoJ19faW5wdXQnKSxcbiAgICAgICAgaWNvbiAmJiBnZXRDbGFzc05hbWUoJ19faW5wdXQtLXdpdGgtaWNvbicpLFxuICAgICAgICBpc0xhcmdlICYmIGdldENsYXNzTmFtZSgnX19pbnB1dC0tbGFyZ2UnKVxuICAgICAgKSxcbiAgICAgIGRpc2FibGVkOiBCb29sZWFuKGRpc2FibGVkKSxcbiAgICAgIHNwZWxsQ2hlY2s6ICFkaXNhYmxlU3BlbGxjaGVjayxcbiAgICAgIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsXG4gICAgICBvbktleURvd246IGhhbmRsZUtleURvd24sXG4gICAgICBvblBhc3RlOiBoYW5kbGVQYXN0ZSxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgcmVmOiByZWZNZXJnZXI8SFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsPihcbiAgICAgICAgcmVmLFxuICAgICAgICBpbm5lclJlZlxuICAgICAgKSxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHZhbHVlLFxuICAgIH07XG5cbiAgICBjb25zdCBjbGVhckJ1dHRvbkVsZW1lbnQgPVxuICAgICAgaGFzQ2xlYXJCdXR0b24gJiYgdmFsdWUgPyAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY2xlYXItaWNvbicpfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKCcnKX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjYW5jZWwnKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsO1xuXG4gICAgY29uc3QgbGVuZ3RoQ291bnRFbGVtZW50ID0gbGVuZ3RoQ291bnQgPj0gd2hlblRvU2hvd1JlbWFpbmluZ0NvdW50ICYmIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fcmVtYWluaW5nLWNvdW50Jyl9PlxuICAgICAgICB7bWF4TGVuZ3RoQ291bnQgLSBsZW5ndGhDb3VudH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgZ2V0Q2xhc3NOYW1lKCdfX2NvbnRhaW5lcicpLFxuICAgICAgICAgIGRpc2FibGVkICYmIGdldENsYXNzTmFtZSgnX19jb250YWluZXItLWRpc2FibGVkJylcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAge2ljb24gPyA8ZGl2IGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX2ljb24nKX0+e2ljb259PC9kaXY+IDogbnVsbH1cbiAgICAgICAge2V4cGFuZGFibGUgPyA8dGV4dGFyZWEgey4uLmlucHV0UHJvcHN9IC8+IDogPGlucHV0IHsuLi5pbnB1dFByb3BzfSAvPn1cbiAgICAgICAge2lzTGFyZ2UgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY29udHJvbHMnKX0+XG4gICAgICAgICAgICAgIHtjbGVhckJ1dHRvbkVsZW1lbnR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fcmVtYWluaW5nLWNvdW50LS1sYXJnZScpfT5cbiAgICAgICAgICAgICAge2xlbmd0aENvdW50RWxlbWVudH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY29udHJvbHMnKX0+XG4gICAgICAgICAgICB7bGVuZ3RoQ291bnRFbGVtZW50fVxuICAgICAgICAgICAge2NsZWFyQnV0dG9uRWxlbWVudH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFNTztBQUNQLHdCQUF1QjtBQUV2QixlQUEwQjtBQUUxQiw4QkFBaUM7QUFDakMsMEJBQTZCO0FBQzdCLG1CQUEyQjtBQXNDcEIsTUFBTSxRQUFRLDZCQUluQixDQUNFO0FBQUEsRUFDRSxhQUFhO0FBQUEsRUFDYixjQUFjLFNBQVM7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZixpQkFBaUI7QUFBQSxFQUNqQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEs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
