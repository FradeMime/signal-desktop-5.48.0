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
var AvatarTextEditor_exports = {};
__export(AvatarTextEditor_exports, {
  AvatarTextEditor: () => AvatarTextEditor
});
module.exports = __toCommonJS(AvatarTextEditor_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var grapheme = __toESM(require("../util/grapheme"));
var import_AvatarColorPicker = require("./AvatarColorPicker");
var import_Colors = require("../types/Colors");
var import_AvatarModalButtons = require("./AvatarModalButtons");
var import_BetterAvatarBubble = require("./BetterAvatarBubble");
var import_avatarDataToBytes = require("../util/avatarDataToBytes");
var import_createAvatarData = require("../util/createAvatarData");
var import_avatarTextSizeCalculator = require("../util/avatarTextSizeCalculator");
const BUBBLE_SIZE = 120;
const MAX_LENGTH = 3;
const AvatarTextEditor = /* @__PURE__ */ __name(({
  avatarData,
  i18n,
  onCancel,
  onDone
}) => {
  const initialText = (0, import_react.useMemo)(() => avatarData?.text || "", [avatarData]);
  const initialColor = (0, import_react.useMemo)(() => avatarData?.color || import_Colors.AvatarColors[0], [avatarData]);
  const [inputText, setInputText] = (0, import_react.useState)(initialText);
  const [fontSize, setFontSize] = (0, import_react.useState)((0, import_avatarTextSizeCalculator.getFontSizes)(BUBBLE_SIZE).text);
  const [selectedColor, setSelectedColor] = (0, import_react.useState)(initialColor);
  const inputRef = (0, import_react.useRef)(null);
  const focusInput = (0, import_react.useCallback)(() => {
    const inputEl = inputRef?.current;
    if (inputEl) {
      inputEl.focus();
    }
  }, []);
  const handleChange = (0, import_react.useCallback)((ev) => {
    const { value } = ev.target;
    if (grapheme.count(value) <= MAX_LENGTH) {
      setInputText(ev.target.value);
    }
  }, [setInputText]);
  const handlePaste = (0, import_react.useCallback)((ev) => {
    const inputEl = ev.currentTarget;
    const selectionStart = inputEl.selectionStart || 0;
    const selectionEnd = inputEl.selectionEnd || inputEl.selectionStart || 0;
    const textBeforeSelection = inputText.slice(0, selectionStart);
    const textAfterSelection = inputText.slice(selectionEnd);
    const pastedText = ev.clipboardData.getData("Text");
    const newGraphemeCount = grapheme.count(textBeforeSelection) + grapheme.count(pastedText) + grapheme.count(textAfterSelection);
    if (newGraphemeCount > MAX_LENGTH) {
      ev.preventDefault();
    }
  }, [inputText]);
  const onDoneRef = (0, import_react.useRef)(onDone);
  (0, import_react.useEffect)(() => {
    onDoneRef.current = onDone;
  }, [onDone]);
  const handleDone = (0, import_react.useCallback)(async () => {
    const newAvatarData = (0, import_createAvatarData.createAvatarData)({
      color: selectedColor,
      text: inputText
    });
    const buffer = await (0, import_avatarDataToBytes.avatarDataToBytes)(newAvatarData);
    onDoneRef.current(buffer, newAvatarData);
  }, [inputText, selectedColor]);
  (0, import_react.useEffect)(() => {
    return () => {
      onDoneRef.current = import_lodash.noop;
    };
  }, []);
  const measureElRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const measureEl = measureElRef.current;
    if (!measureEl) {
      return;
    }
    const nextFontSize = (0, import_avatarTextSizeCalculator.getFittedFontSize)(BUBBLE_SIZE, inputText, (candidateFontSize) => {
      measureEl.style.fontSize = `${candidateFontSize}px`;
      const { width, height } = measureEl.getBoundingClientRect();
      return { height, width };
    });
    setFontSize(nextFontSize);
  }, [inputText]);
  (0, import_react.useEffect)(() => {
    focusInput();
  }, [focusInput]);
  const hasChanges = initialText !== inputText || selectedColor !== initialColor;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarEditor__preview"
  }, /* @__PURE__ */ import_react.default.createElement(import_BetterAvatarBubble.BetterAvatarBubble, {
    color: selectedColor,
    i18n,
    onSelect: focusInput,
    style: {
      height: BUBBLE_SIZE,
      width: BUBBLE_SIZE
    }
  }, /* @__PURE__ */ import_react.default.createElement("input", {
    className: "AvatarTextEditor__input",
    onChange: handleChange,
    onPaste: handlePaste,
    ref: inputRef,
    style: { fontSize },
    type: "text",
    value: inputText
  }))), /* @__PURE__ */ import_react.default.createElement("hr", {
    className: "AvatarEditor__divider"
  }), /* @__PURE__ */ import_react.default.createElement(import_AvatarColorPicker.AvatarColorPicker, {
    i18n,
    onColorSelected: (color) => {
      setSelectedColor(color);
      focusInput();
    },
    selectedColor
  }), /* @__PURE__ */ import_react.default.createElement(import_AvatarModalButtons.AvatarModalButtons, {
    hasChanges,
    i18n,
    onCancel,
    onSave: handleDone
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarTextEditor__measure",
    ref: measureElRef
  }, inputText));
}, "AvatarTextEditor");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarTextEditor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyVGV4dEVkaXRvci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDaGFuZ2VFdmVudCwgQ2xpcGJvYXJkRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHtcbiAgdXNlQ2FsbGJhY2ssXG4gIHVzZUVmZmVjdCxcbiAgdXNlTWVtbyxcbiAgdXNlUmVmLFxuICB1c2VTdGF0ZSxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCAqIGFzIGdyYXBoZW1lIGZyb20gJy4uL3V0aWwvZ3JhcGhlbWUnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JQaWNrZXIgfSBmcm9tICcuL0F2YXRhckNvbG9yUGlja2VyJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IEF2YXRhckRhdGFUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcbmltcG9ydCB7IEF2YXRhck1vZGFsQnV0dG9ucyB9IGZyb20gJy4vQXZhdGFyTW9kYWxCdXR0b25zJztcbmltcG9ydCB7IEJldHRlckF2YXRhckJ1YmJsZSB9IGZyb20gJy4vQmV0dGVyQXZhdGFyQnViYmxlJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgYXZhdGFyRGF0YVRvQnl0ZXMgfSBmcm9tICcuLi91dGlsL2F2YXRhckRhdGFUb0J5dGVzJztcbmltcG9ydCB7IGNyZWF0ZUF2YXRhckRhdGEgfSBmcm9tICcuLi91dGlsL2NyZWF0ZUF2YXRhckRhdGEnO1xuaW1wb3J0IHtcbiAgZ2V0Rml0dGVkRm9udFNpemUsXG4gIGdldEZvbnRTaXplcyxcbn0gZnJvbSAnLi4vdXRpbC9hdmF0YXJUZXh0U2l6ZUNhbGN1bGF0b3InO1xuXG50eXBlIERvbmVIYW5kbGVUeXBlID0gKFxuICBhdmF0YXJCdWZmZXI6IFVpbnQ4QXJyYXksXG4gIGF2YXRhckRhdGE6IEF2YXRhckRhdGFUeXBlXG4pID0+IHVua25vd247XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgYXZhdGFyRGF0YT86IEF2YXRhckRhdGFUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNhbmNlbDogKCkgPT4gdW5rbm93bjtcbiAgb25Eb25lOiBEb25lSGFuZGxlVHlwZTtcbn07XG5cbmNvbnN0IEJVQkJMRV9TSVpFID0gMTIwO1xuY29uc3QgTUFYX0xFTkdUSCA9IDM7XG5cbmV4cG9ydCBjb25zdCBBdmF0YXJUZXh0RWRpdG9yID0gKHtcbiAgYXZhdGFyRGF0YSxcbiAgaTE4bixcbiAgb25DYW5jZWwsXG4gIG9uRG9uZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaW5pdGlhbFRleHQgPSB1c2VNZW1vKCgpID0+IGF2YXRhckRhdGE/LnRleHQgfHwgJycsIFthdmF0YXJEYXRhXSk7XG4gIGNvbnN0IGluaXRpYWxDb2xvciA9IHVzZU1lbW8oXG4gICAgKCkgPT4gYXZhdGFyRGF0YT8uY29sb3IgfHwgQXZhdGFyQ29sb3JzWzBdLFxuICAgIFthdmF0YXJEYXRhXVxuICApO1xuXG4gIGNvbnN0IFtpbnB1dFRleHQsIHNldElucHV0VGV4dF0gPSB1c2VTdGF0ZShpbml0aWFsVGV4dCk7XG4gIGNvbnN0IFtmb250U2l6ZSwgc2V0Rm9udFNpemVdID0gdXNlU3RhdGUoZ2V0Rm9udFNpemVzKEJVQkJMRV9TSVpFKS50ZXh0KTtcbiAgY29uc3QgW3NlbGVjdGVkQ29sb3IsIHNldFNlbGVjdGVkQ29sb3JdID0gdXNlU3RhdGUoaW5pdGlhbENvbG9yKTtcblxuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgZm9jdXNJbnB1dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBpbnB1dEVsID0gaW5wdXRSZWY/LmN1cnJlbnQ7XG4gICAgaWYgKGlucHV0RWwpIHtcbiAgICAgIGlucHV0RWwuZm9jdXMoKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZXY6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSBldi50YXJnZXQ7XG4gICAgICBpZiAoZ3JhcGhlbWUuY291bnQodmFsdWUpIDw9IE1BWF9MRU5HVEgpIHtcbiAgICAgICAgc2V0SW5wdXRUZXh0KGV2LnRhcmdldC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2V0SW5wdXRUZXh0XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVBhc3RlID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2OiBDbGlwYm9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgY29uc3QgaW5wdXRFbCA9IGV2LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gaW5wdXRFbC5zZWxlY3Rpb25TdGFydCB8fCAwO1xuICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kID0gaW5wdXRFbC5zZWxlY3Rpb25FbmQgfHwgaW5wdXRFbC5zZWxlY3Rpb25TdGFydCB8fCAwO1xuICAgICAgY29uc3QgdGV4dEJlZm9yZVNlbGVjdGlvbiA9IGlucHV0VGV4dC5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCk7XG4gICAgICBjb25zdCB0ZXh0QWZ0ZXJTZWxlY3Rpb24gPSBpbnB1dFRleHQuc2xpY2Uoc2VsZWN0aW9uRW5kKTtcblxuICAgICAgY29uc3QgcGFzdGVkVGV4dCA9IGV2LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xuXG4gICAgICBjb25zdCBuZXdHcmFwaGVtZUNvdW50ID1cbiAgICAgICAgZ3JhcGhlbWUuY291bnQodGV4dEJlZm9yZVNlbGVjdGlvbikgK1xuICAgICAgICBncmFwaGVtZS5jb3VudChwYXN0ZWRUZXh0KSArXG4gICAgICAgIGdyYXBoZW1lLmNvdW50KHRleHRBZnRlclNlbGVjdGlvbik7XG5cbiAgICAgIGlmIChuZXdHcmFwaGVtZUNvdW50ID4gTUFYX0xFTkdUSCkge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2lucHV0VGV4dF1cbiAgKTtcblxuICBjb25zdCBvbkRvbmVSZWYgPSB1c2VSZWY8RG9uZUhhbmRsZVR5cGU+KG9uRG9uZSk7XG5cbiAgLy8gTWFrZSBzdXJlIHdlIGtlZXAgb25Eb25lUmVmIHVwIHRvIGRhdGVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkRvbmVSZWYuY3VycmVudCA9IG9uRG9uZTtcbiAgfSwgW29uRG9uZV0pO1xuXG4gIGNvbnN0IGhhbmRsZURvbmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbmV3QXZhdGFyRGF0YSA9IGNyZWF0ZUF2YXRhckRhdGEoe1xuICAgICAgY29sb3I6IHNlbGVjdGVkQ29sb3IsXG4gICAgICB0ZXh0OiBpbnB1dFRleHQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBhdmF0YXJEYXRhVG9CeXRlcyhuZXdBdmF0YXJEYXRhKTtcblxuICAgIG9uRG9uZVJlZi5jdXJyZW50KGJ1ZmZlciwgbmV3QXZhdGFyRGF0YSk7XG4gIH0sIFtpbnB1dFRleHQsIHNlbGVjdGVkQ29sb3JdKTtcblxuICAvLyBJbiBjYXNlIHRoZSBjb21wb25lbnQgdW5tb3VudHMgYmVmb3JlIHdlJ3JlIGFibGUgdG8gY3JlYXRlIHRoZSBhdmF0YXIgZGF0YVxuICAvLyB3ZSBzZXQgdGhlIGRvbmUgaGFuZGxlciB0byBhIG5vLW9wLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBvbkRvbmVSZWYuY3VycmVudCA9IG5vb3A7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG1lYXN1cmVFbFJlZiA9IHVzZVJlZjxudWxsIHwgSFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG1lYXN1cmVFbCA9IG1lYXN1cmVFbFJlZi5jdXJyZW50O1xuICAgIGlmICghbWVhc3VyZUVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEZvbnRTaXplID0gZ2V0Rml0dGVkRm9udFNpemUoXG4gICAgICBCVUJCTEVfU0laRSxcbiAgICAgIGlucHV0VGV4dCxcbiAgICAgIGNhbmRpZGF0ZUZvbnRTaXplID0+IHtcbiAgICAgICAgbWVhc3VyZUVsLnN0eWxlLmZvbnRTaXplID0gYCR7Y2FuZGlkYXRlRm9udFNpemV9cHhgO1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IG1lYXN1cmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0LCB3aWR0aCB9O1xuICAgICAgfVxuICAgICk7XG5cbiAgICBzZXRGb250U2l6ZShuZXh0Rm9udFNpemUpO1xuICB9LCBbaW5wdXRUZXh0XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmb2N1c0lucHV0KCk7XG4gIH0sIFtmb2N1c0lucHV0XSk7XG5cbiAgY29uc3QgaGFzQ2hhbmdlcyA9XG4gICAgaW5pdGlhbFRleHQgIT09IGlucHV0VGV4dCB8fCBzZWxlY3RlZENvbG9yICE9PSBpbml0aWFsQ29sb3I7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBdmF0YXJFZGl0b3JfX3ByZXZpZXdcIj5cbiAgICAgICAgPEJldHRlckF2YXRhckJ1YmJsZVxuICAgICAgICAgIGNvbG9yPXtzZWxlY3RlZENvbG9yfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25TZWxlY3Q9e2ZvY3VzSW5wdXR9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGhlaWdodDogQlVCQkxFX1NJWkUsXG4gICAgICAgICAgICB3aWR0aDogQlVCQkxFX1NJWkUsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiQXZhdGFyVGV4dEVkaXRvcl9faW5wdXRcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgIG9uUGFzdGU9e2hhbmRsZVBhc3RlfVxuICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICAgIHN0eWxlPXt7IGZvbnRTaXplIH19XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17aW5wdXRUZXh0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQmV0dGVyQXZhdGFyQnViYmxlPlxuICAgICAgPC9kaXY+XG4gICAgICA8aHIgY2xhc3NOYW1lPVwiQXZhdGFyRWRpdG9yX19kaXZpZGVyXCIgLz5cbiAgICAgIDxBdmF0YXJDb2xvclBpY2tlclxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNvbG9yU2VsZWN0ZWQ9e2NvbG9yID0+IHtcbiAgICAgICAgICBzZXRTZWxlY3RlZENvbG9yKGNvbG9yKTtcbiAgICAgICAgICBmb2N1c0lucHV0KCk7XG4gICAgICAgIH19XG4gICAgICAgIHNlbGVjdGVkQ29sb3I9e3NlbGVjdGVkQ29sb3J9XG4gICAgICAvPlxuICAgICAgPEF2YXRhck1vZGFsQnV0dG9uc1xuICAgICAgICBoYXNDaGFuZ2VzPXtoYXNDaGFuZ2VzfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNhbmNlbD17b25DYW5jZWx9XG4gICAgICAgIG9uU2F2ZT17aGFuZGxlRG9uZX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkF2YXRhclRleHRFZGl0b3JfX21lYXN1cmVcIiByZWY9e21lYXN1cmVFbFJlZn0+XG4gICAgICAgIHtpbnB1dFRleHR9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBTU87QUFDUCxvQkFBcUI7QUFFckIsZUFBMEI7QUFDMUIsK0JBQWtDO0FBQ2xDLG9CQUE2QjtBQUU3QixnQ0FBbUM7QUFDbkMsZ0NBQW1DO0FBRW5DLCtCQUFrQztBQUNsQyw4QkFBaUM7QUFDakMsc0NBR087QUFjUCxNQUFNLGNBQWM7QUFDcEIsTUFBTSxhQUFhO0FBRVosTUFBTSxtQkFBbUIsd0JBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sY0FBYywwQkFBUSxNQUFNLFlBQVksUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3RFLFFBQU0sZUFBZSwwQkFDbkIsTUFBTSxZQUFZLFNBQVMsMkJBQWEsSUFDeEMsQ0FBQyxVQUFVLENBQ2I7QUFFQSxRQUFNLENBQUMsV0FBVyxnQkFBZ0IsMkJBQVMsV0FBVztBQUN0RCxRQUFNLENBQUMsVUFBVSxlQUFlLDJCQUFTLGtEQUFhLFdBQVcsRUFBRSxJQUFJO0FBQ3ZFLFFBQU0sQ0FBQyxlQUFlLG9CQUFvQiwyQkFBUyxZQUFZO0FBRS9ELFFBQU0sV0FBVyx5QkFBZ0MsSUFBSTtBQUVyRCxRQUFNLGFBQWEsOEJBQVksTUFBTTtBQUNuQyxVQUFNLFVBQVUsVUFBVTtBQUMxQixRQUFJLFNBQVM7QUFDWCxjQUFRLE1BQU07QUFBQSxJQUNoQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGVBQWUsOEJBQ25CLENBQUMsT0FBc0M7QUFDckMsVUFBTSxFQUFFLFVBQVUsR0FBRztBQUNyQixRQUFJLFNBQVMsTUFBTSxLQUFLLEtBQUssWUFBWTtBQUN2QyxtQkFBYSxH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
