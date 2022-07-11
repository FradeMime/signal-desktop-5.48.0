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
var Select_exports = {};
__export(Select_exports, {
  Select: () => Select
});
module.exports = __toCommonJS(Select_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const Select = import_react.default.forwardRef(({
  ariaLabel,
  disabled,
  id,
  moduleClassName,
  name,
  onChange,
  options,
  value
}, ref) => {
  const onSelectChange = /* @__PURE__ */ __name((event) => {
    onChange(event.target.value);
  }, "onSelectChange");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(["module-select", moduleClassName])
  }, /* @__PURE__ */ import_react.default.createElement("select", {
    "aria-label": ariaLabel,
    disabled,
    id,
    name,
    value,
    onChange: onSelectChange,
    ref
  }, options.map(({ disabled: optionDisabled, text, value: optionValue }) => {
    return /* @__PURE__ */ import_react.default.createElement("option", {
      disabled: optionDisabled,
      value: optionValue,
      key: optionValue,
      "aria-label": text
    }, text);
  })));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Select
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2VsZWN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ2hhbmdlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbiA9IFJlYWRvbmx5PHtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG59PjtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0gUmVhZG9ubHk8e1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgaWQ/OiBzdHJpbmc7XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgb3B0aW9uczogUmVhZG9ubHlBcnJheTxPcHRpb24+O1xuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZDtcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG59PjtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBhcmlhTGFiZWwsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIGlkLFxuICAgICAgbW9kdWxlQ2xhc3NOYW1lLFxuICAgICAgbmFtZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHZhbHVlLFxuICAgIH06IFByb3BzVHlwZSxcbiAgICByZWY6IFJlYWN0LlJlZjxIVE1MU2VsZWN0RWxlbWVudD5cbiAgKTogSlNYLkVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IG9uU2VsZWN0Q2hhbmdlID0gKGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pID0+IHtcbiAgICAgIG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhbJ21vZHVsZS1zZWxlY3QnLCBtb2R1bGVDbGFzc05hbWVdKX0+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17b25TZWxlY3RDaGFuZ2V9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgID5cbiAgICAgICAgICB7b3B0aW9ucy5tYXAoXG4gICAgICAgICAgICAoeyBkaXNhYmxlZDogb3B0aW9uRGlzYWJsZWQsIHRleHQsIHZhbHVlOiBvcHRpb25WYWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e29wdGlvbkRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e29wdGlvblZhbHVlfVxuICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb25WYWx1ZX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RleHR9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFtQmhCLE1BQU0sU0FBUyxxQkFBTSxXQUMxQixDQUNFO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUVGLFFBQ2dCO0FBQ2hCLFFBQU0saUJBQWlCLHdCQUFDLFVBQTBDO0FBQ2hFLGFBQVMsTUFBTSxPQUFPLEtBQUs7QUFBQSxFQUM3QixHQUZ1QjtBQUl2QixTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFXLCtCQUFXLENBQUMsaUJBQWlCLGVBQWUsQ0FBQztBQUFBLEtBQzNELG1EQUFDO0FBQUEsSUFDQyxjQUFZO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1Y7QUFBQSxLQUVDLFFBQVEsSUFDUCxDQUFDLEVBQUUsVUFBVSxnQkFBZ0IsTUFBTSxPQUFPLGtCQUFrQjtBQUMxRCxXQUNFLG1EQUFDO0FBQUEsTUFDQyxVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsTUFDTCxjQUFZO0FBQUEsT0FFWCxJQUNIO0FBQUEsRUFFSixDQUNGLENBQ0YsQ0FDRjtBQUVKLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
