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
var Slider_exports = {};
__export(Slider_exports, {
  Slider: () => Slider
});
module.exports = __toCommonJS(Slider_exports);
var import_react = __toESM(require("react"));
var import_getClassNamesFor = require("../util/getClassNamesFor");
const Slider = /* @__PURE__ */ __name(({
  containerStyle = {},
  label,
  handleStyle = {},
  moduleClassName,
  onChange,
  value
}) => {
  const diff = (0, import_react.useRef)(0);
  const handleRef = (0, import_react.useRef)(null);
  const sliderRef = (0, import_react.useRef)(null);
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("Slider", moduleClassName);
  const handleValueChange = /* @__PURE__ */ __name((ev) => {
    if (!sliderRef || !sliderRef.current) {
      return;
    }
    let x = ev.clientX - diff.current - sliderRef.current.getBoundingClientRect().left;
    const max = sliderRef.current.offsetWidth;
    x = Math.min(max, Math.max(0, x));
    const nextValue = 100 * x / max;
    onChange(nextValue);
    ev.preventDefault();
    ev.stopPropagation();
  }, "handleValueChange");
  const handleMouseUp = /* @__PURE__ */ __name(() => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleValueChange);
  }, "handleMouseUp");
  const handleMouseDown = /* @__PURE__ */ __name((ev) => {
    if (!handleRef || !handleRef.current) {
      return;
    }
    diff.current = ev.clientX - handleRef.current.getBoundingClientRect().left;
    document.addEventListener("mousemove", handleValueChange);
    document.addEventListener("mouseup", handleMouseUp);
  }, "handleMouseDown");
  const handleKeyDown = /* @__PURE__ */ __name((ev) => {
    let preventDefault = false;
    if (ev.key === "ArrowRight") {
      const nextValue = value + 1;
      onChange(Math.min(nextValue, 100));
      preventDefault = true;
    }
    if (ev.key === "ArrowLeft") {
      const nextValue = value - 1;
      onChange(Math.max(0, nextValue));
      preventDefault = true;
    }
    if (ev.key === "Home") {
      onChange(0);
      preventDefault = true;
    }
    if (ev.key === "End") {
      onChange(100);
      preventDefault = true;
    }
    if (preventDefault) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, "handleKeyDown");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": label,
    className: getClassName(""),
    onClick: handleValueChange,
    onKeyDown: handleKeyDown,
    ref: sliderRef,
    role: "button",
    style: containerStyle,
    tabIndex: 0
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": label,
    "aria-valuenow": value,
    className: getClassName("__handle"),
    onMouseDown: handleMouseDown,
    ref: handleRef,
    role: "slider",
    style: { ...handleStyle, left: `${value}%` },
    tabIndex: -1
  }));
}, "Slider");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Slider
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2xpZGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENTU1Byb3BlcnRpZXMsIEtleWJvYXJkRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0Q2xhc3NOYW1lc0ZvciB9IGZyb20gJy4uL3V0aWwvZ2V0Q2xhc3NOYW1lc0Zvcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgY29udGFpbmVyU3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICBsYWJlbDogc3RyaW5nO1xuICBoYW5kbGVTdHlsZT86IENTU1Byb3BlcnRpZXM7XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB1bmtub3duO1xuICB2YWx1ZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IFNsaWRlciA9ICh7XG4gIGNvbnRhaW5lclN0eWxlID0ge30sXG4gIGxhYmVsLFxuICBoYW5kbGVTdHlsZSA9IHt9LFxuICBtb2R1bGVDbGFzc05hbWUsXG4gIG9uQ2hhbmdlLFxuICB2YWx1ZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZGlmZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuICBjb25zdCBoYW5kbGVSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc2xpZGVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgZ2V0Q2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lc0ZvcignU2xpZGVyJywgbW9kdWxlQ2xhc3NOYW1lKTtcblxuICBjb25zdCBoYW5kbGVWYWx1ZUNoYW5nZSA9IChldjogTW91c2VFdmVudCB8IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoIXNsaWRlclJlZiB8fCAhc2xpZGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCA9XG4gICAgICBldi5jbGllbnRYIC1cbiAgICAgIGRpZmYuY3VycmVudCAtXG4gICAgICBzbGlkZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXG4gICAgY29uc3QgbWF4ID0gc2xpZGVyUmVmLmN1cnJlbnQub2Zmc2V0V2lkdGg7XG5cbiAgICB4ID0gTWF0aC5taW4obWF4LCBNYXRoLm1heCgwLCB4KSk7XG5cbiAgICBjb25zdCBuZXh0VmFsdWUgPSAoMTAwICogeCkgLyBtYXg7XG5cbiAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuXG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZVVwID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVWYWx1ZUNoYW5nZSk7XG4gIH07XG5cbiAgLy8gV2Ugd2FudCB0byB1c2UgUmVhY3QuTW91c2VFdmVudCBoZXJlIGJlY2F1c2UgYWJvdmUgd2VcbiAgLy8gdXNlIHRoZSByZWd1bGFyIE1vdXNlRXZlbnRcbiAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKGV2OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFoYW5kbGVSZWYgfHwgIWhhbmRsZVJlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGlmZi5jdXJyZW50ID0gZXYuY2xpZW50WCAtIGhhbmRsZVJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVWYWx1ZUNoYW5nZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBsZXQgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcblxuICAgIGlmIChldi5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgY29uc3QgbmV4dFZhbHVlID0gdmFsdWUgKyAxO1xuICAgICAgb25DaGFuZ2UoTWF0aC5taW4obmV4dFZhbHVlLCAxMDApKTtcblxuICAgICAgcHJldmVudERlZmF1bHQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChldi5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICBjb25zdCBuZXh0VmFsdWUgPSB2YWx1ZSAtIDE7XG4gICAgICBvbkNoYW5nZShNYXRoLm1heCgwLCBuZXh0VmFsdWUpKTtcblxuICAgICAgcHJldmVudERlZmF1bHQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChldi5rZXkgPT09ICdIb21lJykge1xuICAgICAgb25DaGFuZ2UoMCk7XG4gICAgICBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGV2LmtleSA9PT0gJ0VuZCcpIHtcbiAgICAgIG9uQ2hhbmdlKDEwMCk7XG4gICAgICBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnJyl9XG4gICAgICBvbkNsaWNrPXtoYW5kbGVWYWx1ZUNoYW5nZX1cbiAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgIHJlZj17c2xpZGVyUmVmfVxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICBzdHlsZT17Y29udGFpbmVyU3R5bGV9XG4gICAgICB0YWJJbmRleD17MH1cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICBhcmlhLXZhbHVlbm93PXt2YWx1ZX1cbiAgICAgICAgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19faGFuZGxlJyl9XG4gICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgIHJlZj17aGFuZGxlUmVmfVxuICAgICAgICByb2xlPVwic2xpZGVyXCJcbiAgICAgICAgc3R5bGU9e3sgLi4uaGFuZGxlU3R5bGUsIGxlZnQ6IGAke3ZhbHVlfSVgIH19XG4gICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUE4QjtBQUM5Qiw4QkFBaUM7QUFXMUIsTUFBTSxTQUFTLHdCQUFDO0FBQUEsRUFDckIsaUJBQWlCLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsY0FBYyxDQUFDO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxPQUFPLHlCQUFlLENBQUM7QUFDN0IsUUFBTSxZQUFZLHlCQUE4QixJQUFJO0FBQ3BELFFBQU0sWUFBWSx5QkFBOEIsSUFBSTtBQUVwRCxRQUFNLGVBQWUsOENBQWlCLFVBQVUsZUFBZTtBQUUvRCxRQUFNLG9CQUFvQix3QkFBQyxPQUFzQztBQUMvRCxRQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsU0FBUztBQUNwQztBQUFBLElBQ0Y7QUFFQSxRQUFJLElBQ0YsR0FBRyxVQUNILEtBQUssVUFDTCxVQUFVLFFBQVEsc0JBQXNCLEVBQUU7QUFFNUMsVUFBTSxNQUFNLFVBQVUsUUFBUTtBQUU5QixRQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztBQUVoQyxVQUFNLFlBQWEsTUFBTSxJQUFLO0FBRTlCLGFBQVMsU0FBUztBQUVsQixPQUFHLGVBQWU7QUFDbEIsT0FBRyxnQkFBZ0I7QUFBQSxFQUNyQixHQXBCMEI7QUFzQjFCLFFBQU0sZ0JBQWdCLDZCQUFNO0FBQzFCLGFBQVMsb0JBQW9CLFdBQVcsYUFBYTtBQUNyRCxhQUFTLG9CQUFvQixhQUFhLGlCQUFpQjtBQUFBLEVBQzdELEdBSHNCO0FBT3RCLFFBQU0sa0JBQWtCLHdCQUFDLE9BQXlCO0FBQ2hELFFBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxTQUFTO0FBQ3BDO0FBQUEsSUFDRjtBQUVBLFNBQUssVUFBVSxHQUFHLFVBQVUsVUFBVSxRQUFRLHNCQUFzQixFQUFFO0FBRXRFLGFBQVMsaUJBQWlCLGFBQWEsaUJBQWlCO0FBQ3hELGFBQVMsaUJBQWlCLFdBQVcsYUFBYTtBQUFBLEVBQ3BELEdBVHdCO0FBV3hCLFFBQU0sZ0JBQWdCLHdCQUFDLE9BQXNCO0FBQzNDLFFBQUksaUJBQWlCO0FBRXJCLFFBQUksR0FBRyxRQUFRLGNBQWM7QUFDM0IsWUFBTSxZQUFZLFFBQVE7QUFDMUIsZUFBUyxLQUFLLElBQUksV0FBVyxHQUFHLENBQUM7QUFFakMsdUJBQWlCO0FBQUEsSUFDbkI7QUFFQSxRQUFJLEdBQUcsUUFBUSxhQUFhO0FBQzFCLFlBQU0sWUFBWSxRQUFRO0FBQzFCLGVBQVMsS0FBSyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBRS9CLHVCQUFpQjtBQUFBLElBQ25CO0FBRUEsUUFBSSxHQUFHLFFBQVEsUUFBUTtBQUNyQixlQUFTLENBQUM7QUFDVix1QkFBaUI7QUFBQSxJQUNuQjtBQUVBLFFBQUksR0FBRyxRQUFRLE9BQU87QUFDcEIsZUFBUyxHQUFHO0FBQ1osdUJBQWlCO0FBQUEsSUFDbkI7QUFFQSxRQUFJLGdCQUFnQjtBQUNsQixTQUFHLGVBQWU7QUFDbEIsU0FBRyxnQkFBZ0I7QUFBQSxJQUNyQjtBQUFBLEVBQ0YsR0EvQnNCO0FBaUN0QixTQUNFLG1EQUFDO0FBQUEsSUFDQyxjQUFZO0FBQUEsSUFDWixXQUFXLGFBQWEsRUFBRTtBQUFBLElBQzFCLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxJQUNMLE1BQUs7QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxLQUVWLG1EQUFDO0FBQUEsSUFDQyxjQUFZO0FBQUEsSUFDWixpQkFBZTtBQUFBLElBQ2YsV0FBVyxhQUFhLFVBQVU7QUFBQSxJQUNsQyxhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsSUFDTCxNQUFLO0FBQUEsSUFDTCxPQUFPLEtBQUssYUFBYSxNQUFNLEdBQUcsU0FBUztBQUFBLElBQzNDLFVBQVU7QUFBQSxHQUNaLENBQ0Y7QUFFSixHQTlHc0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
