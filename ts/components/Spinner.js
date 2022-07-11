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
var Spinner_exports = {};
__export(Spinner_exports, {
  Spinner: () => Spinner,
  SpinnerDirections: () => SpinnerDirections,
  SpinnerSvgSizes: () => SpinnerSvgSizes
});
module.exports = __toCommonJS(Spinner_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_getClassNamesFor = require("../util/getClassNamesFor");
const SpinnerSvgSizes = ["small", "normal"];
const SpinnerDirections = [
  "outgoing",
  "incoming",
  "on-background",
  "on-captcha",
  "on-progress-dialog",
  "on-avatar"
];
const Spinner = /* @__PURE__ */ __name(({
  ariaLabel,
  direction,
  moduleClassName,
  role,
  size,
  svgSize
}) => {
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("module-spinner", moduleClassName);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName("__container"), getClassName(`__container--${svgSize}`), getClassName(direction && `__container--${direction}`), getClassName(direction && `__container--${svgSize}-${direction}`)),
    role,
    "aria-label": ariaLabel,
    style: {
      height: size,
      width: size
    }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName("__circle"), getClassName(`__circle--${svgSize}`), getClassName(direction && `__circle--${direction}`), getClassName(direction && `__circle--${svgSize}-${direction}`))
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName("__arc"), getClassName(`__arc--${svgSize}`), getClassName(direction && `__arc--${direction}`), getClassName(direction && `__arc--${svgSize}-${direction}`))
  }));
}, "Spinner");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Spinner,
  SpinnerDirections,
  SpinnerSvgSizes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3Bpbm5lci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB7IGdldENsYXNzTmFtZXNGb3IgfSBmcm9tICcuLi91dGlsL2dldENsYXNzTmFtZXNGb3InO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lclN2Z1NpemVzID0gWydzbWFsbCcsICdub3JtYWwnXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIFNwaW5uZXJTdmdTaXplID0gdHlwZW9mIFNwaW5uZXJTdmdTaXplc1tudW1iZXJdO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lckRpcmVjdGlvbnMgPSBbXG4gICdvdXRnb2luZycsXG4gICdpbmNvbWluZycsXG4gICdvbi1iYWNrZ3JvdW5kJyxcbiAgJ29uLWNhcHRjaGEnLFxuICAnb24tcHJvZ3Jlc3MtZGlhbG9nJyxcbiAgJ29uLWF2YXRhcicsXG5dIGFzIGNvbnN0O1xuZXhwb3J0IHR5cGUgU3Bpbm5lckRpcmVjdGlvbiA9IHR5cGVvZiBTcGlubmVyRGlyZWN0aW9uc1tudW1iZXJdO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBkaXJlY3Rpb24/OiBTcGlubmVyRGlyZWN0aW9uO1xuICBtb2R1bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHJvbGU/OiBzdHJpbmc7XG4gIHNpemU/OiBzdHJpbmc7XG4gIHN2Z1NpemU6IFNwaW5uZXJTdmdTaXplO1xufTtcblxuZXhwb3J0IGNvbnN0IFNwaW5uZXIgPSAoe1xuICBhcmlhTGFiZWwsXG4gIGRpcmVjdGlvbixcbiAgbW9kdWxlQ2xhc3NOYW1lLFxuICByb2xlLFxuICBzaXplLFxuICBzdmdTaXplLFxufTogUHJvcHMpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGdldENsYXNzTmFtZSA9IGdldENsYXNzTmFtZXNGb3IoJ21vZHVsZS1zcGlubmVyJywgbW9kdWxlQ2xhc3NOYW1lKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgZ2V0Q2xhc3NOYW1lKCdfX2NvbnRhaW5lcicpLFxuICAgICAgICBnZXRDbGFzc05hbWUoYF9fY29udGFpbmVyLS0ke3N2Z1NpemV9YCksXG4gICAgICAgIGdldENsYXNzTmFtZShkaXJlY3Rpb24gJiYgYF9fY29udGFpbmVyLS0ke2RpcmVjdGlvbn1gKSxcbiAgICAgICAgZ2V0Q2xhc3NOYW1lKGRpcmVjdGlvbiAmJiBgX19jb250YWluZXItLSR7c3ZnU2l6ZX0tJHtkaXJlY3Rpb259YClcbiAgICAgICl9XG4gICAgICByb2xlPXtyb2xlfVxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgZ2V0Q2xhc3NOYW1lKCdfX2NpcmNsZScpLFxuICAgICAgICAgIGdldENsYXNzTmFtZShgX19jaXJjbGUtLSR7c3ZnU2l6ZX1gKSxcbiAgICAgICAgICBnZXRDbGFzc05hbWUoZGlyZWN0aW9uICYmIGBfX2NpcmNsZS0tJHtkaXJlY3Rpb259YCksXG4gICAgICAgICAgZ2V0Q2xhc3NOYW1lKGRpcmVjdGlvbiAmJiBgX19jaXJjbGUtLSR7c3ZnU2l6ZX0tJHtkaXJlY3Rpb259YClcbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICBnZXRDbGFzc05hbWUoJ19fYXJjJyksXG4gICAgICAgICAgZ2V0Q2xhc3NOYW1lKGBfX2FyYy0tJHtzdmdTaXplfWApLFxuICAgICAgICAgIGdldENsYXNzTmFtZShkaXJlY3Rpb24gJiYgYF9fYXJjLS0ke2RpcmVjdGlvbn1gKSxcbiAgICAgICAgICBnZXRDbGFzc05hbWUoZGlyZWN0aW9uICYmIGBfX2FyYy0tJHtzdmdTaXplfS0ke2RpcmVjdGlvbn1gKVxuICAgICAgICApfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFFdkIsOEJBQWlDO0FBRTFCLE1BQU0sa0JBQWtCLENBQUMsU0FBUyxRQUFRO0FBRzFDLE1BQU0sb0JBQW9CO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBWU8sTUFBTSxVQUFVLHdCQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ3dCO0FBQ3hCLFFBQU0sZUFBZSw4Q0FBaUIsa0JBQWtCLGVBQWU7QUFFdkUsU0FDRSxtREFBQztBQUFBLElBQ0MsV0FBVywrQkFDVCxhQUFhLGFBQWEsR0FDMUIsYUFBYSxnQkFBZ0IsU0FBUyxHQUN0QyxhQUFhLGFBQWEsZ0JBQWdCLFdBQVcsR0FDckQsYUFBYSxhQUFhLGdCQUFnQixXQUFXLFdBQVcsQ0FDbEU7QUFBQSxJQUNBO0FBQUEsSUFDQSxjQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsSUFDVDtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsYUFBYSxVQUFVLEdBQ3ZCLGFBQWEsYUFBYSxTQUFTLEdBQ25DLGFBQWEsYUFBYSxhQUFhLFdBQVcsR0FDbEQsYUFBYSxhQUFhLGFBQWEsV0FBVyxXQUFXLENBQy9EO0FBQUEsR0FDRixHQUNBLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULGFBQWEsT0FBTyxHQUNwQixhQUFhLFVBQVUsU0FBUyxHQUNoQyxhQUFhLGFBQWEsVUFBVSxXQUFXLEdBQy9DLGFBQWEsYUFBYSxVQUFVLFdBQVcsV0FBVyxDQUM1RDtBQUFBLEdBQ0YsQ0FDRjtBQUVKLEdBM0N1QjsiLAogICJuYW1lcyI6IFtdCn0K
