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
var LabeledInput_exports = {};
__export(LabeledInput_exports, {
  LabeledInput: () => LabeledInput
});
module.exports = __toCommonJS(LabeledInput_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./LabeledInput.scss"));
var import_Typography = require("./Typography");
const LabeledInput = React.memo(({ children, value, placeholder, onChange }) => {
  const handleChange = React.useCallback((e) => {
    if (onChange !== void 0) {
      onChange(e.currentTarget.value);
    }
  }, [onChange]);
  return /* @__PURE__ */ React.createElement("label", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement(import_Typography.Inline, {
    className: styles.label
  }, children), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    className: styles.input,
    placeholder,
    value,
    onChange: handleChange
  }));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LabeledInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGFiZWxlZElucHV0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL0xhYmVsZWRJbnB1dC5zY3NzJztcbmltcG9ydCB7IElubGluZSB9IGZyb20gJy4vVHlwb2dyYXBoeSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmc7XG4gIG9uQ2hhbmdlPzogKHZhbHVlOiBzdHJpbmcpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgTGFiZWxlZElucHV0ID0gUmVhY3QubWVtbyhcbiAgKHsgY2hpbGRyZW4sIHZhbHVlLCBwbGFjZWhvbGRlciwgb25DaGFuZ2UgfTogUHJvcHMpID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICBpZiAob25DaGFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG9uQ2hhbmdlKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbb25DaGFuZ2VdXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgPElubGluZSBjbGFzc05hbWU9e3N0eWxlcy5sYWJlbH0+e2NoaWxkcmVufTwvSW5saW5lPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9sYWJlbD5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsYUFBd0I7QUFDeEIsd0JBQXVCO0FBU2hCLE1BQU0sZUFBZSxNQUFNLEtBQ2hDLENBQUMsRUFBRSxVQUFVLE9BQU8sYUFBYSxlQUFzQjtBQUNyRCxRQUFNLGVBQWUsTUFBTSxZQUN6QixDQUFDLE1BQTJDO0FBQzFDLFFBQUksYUFBYSxRQUFXO0FBQzFCLGVBQVMsRUFBRSxjQUFjLEtBQUs7QUFBQSxJQUNoQztBQUFBLEVBQ0YsR0FDQSxDQUFDLFFBQVEsQ0FDWDtBQUVBLFNBQ0Usb0NBQUM7QUFBQSxJQUFNLFdBQVcsT0FBTztBQUFBLEtBQ3ZCLG9DQUFDO0FBQUEsSUFBTyxXQUFXLE9BQU87QUFBQSxLQUFRLFFBQVMsR0FDM0Msb0NBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFdBQVcsT0FBTztBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLElBQ0EsVUFBVTtBQUFBLEdBQ1osQ0FDRjtBQUVKLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
