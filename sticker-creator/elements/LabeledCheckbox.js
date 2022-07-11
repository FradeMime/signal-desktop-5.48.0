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
var LabeledCheckbox_exports = {};
__export(LabeledCheckbox_exports, {
  LabeledCheckbox: () => LabeledCheckbox
});
module.exports = __toCommonJS(LabeledCheckbox_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./LabeledCheckbox.scss"));
var import_Typography = require("./Typography");
const checkSvg = /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 16 16",
  width: "16px",
  height: "16px"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M7 11.5c-.2 0-.4-.1-.5-.2L3.3 8.1 4.4 7 7 9.7l4.6-4.6 1.1 1.1-5.2 5.2c-.1 0-.3.1-.5.1z"
}));
const LabeledCheckbox = React.memo(({ children, value, onChange }) => {
  const handleChange = React.useCallback(() => {
    if (onChange !== void 0) {
      onChange(!value);
    }
  }, [onChange, value]);
  const className = value ? styles.checkboxChecked : styles.checkbox;
  return /* @__PURE__ */ React.createElement("label", {
    className: styles.base
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    className: styles.input,
    checked: value,
    "aria-checked": value,
    onChange: handleChange
  }), /* @__PURE__ */ React.createElement("span", {
    className
  }, value ? checkSvg : null), /* @__PURE__ */ React.createElement(import_Typography.Inline, {
    className: styles.label
  }, children));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LabeledCheckbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGFiZWxlZENoZWNrYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL0xhYmVsZWRDaGVja2JveC5zY3NzJztcbmltcG9ydCB7IElubGluZSB9IGZyb20gJy4vVHlwb2dyYXBoeSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICB2YWx1ZT86IGJvb2xlYW47XG4gIG9uQ2hhbmdlPzogKHZhbHVlOiBib29sZWFuKSA9PiB1bmtub3duO1xufTtcblxuY29uc3QgY2hlY2tTdmcgPSAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZweFwiIGhlaWdodD1cIjE2cHhcIj5cbiAgICA8cGF0aCBkPVwiTTcgMTEuNWMtLjIgMC0uNC0uMS0uNS0uMkwzLjMgOC4xIDQuNCA3IDcgOS43bDQuNi00LjYgMS4xIDEuMS01LjIgNS4yYy0uMSAwLS4zLjEtLjUuMXpcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBjb25zdCBMYWJlbGVkQ2hlY2tib3ggPSBSZWFjdC5tZW1vKFxuICAoeyBjaGlsZHJlbiwgdmFsdWUsIG9uQ2hhbmdlIH06IFByb3BzKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb25DaGFuZ2UoIXZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCBbb25DaGFuZ2UsIHZhbHVlXSk7XG5cbiAgICBjb25zdCBjbGFzc05hbWUgPSB2YWx1ZSA/IHN0eWxlcy5jaGVja2JveENoZWNrZWQgOiBzdHlsZXMuY2hlY2tib3g7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT17c3R5bGVzLmJhc2V9PlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIGFyaWEtY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWV9Pnt2YWx1ZSA/IGNoZWNrU3ZnIDogbnVsbH08L3NwYW4+XG4gICAgICAgIDxJbmxpbmUgY2xhc3NOYW1lPXtzdHlsZXMubGFiZWx9PntjaGlsZHJlbn08L0lubGluZT5cbiAgICAgIDwvbGFiZWw+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLGFBQXdCO0FBQ3hCLHdCQUF1QjtBQVF2QixNQUFNLFdBQ0osb0NBQUM7QUFBQSxFQUFJLFNBQVE7QUFBQSxFQUFZLE9BQU07QUFBQSxFQUFPLFFBQU87QUFBQSxHQUMzQyxvQ0FBQztBQUFBLEVBQUssR0FBRTtBQUFBLENBQXlGLENBQ25HO0FBR0ssTUFBTSxrQkFBa0IsTUFBTSxLQUNuQyxDQUFDLEVBQUUsVUFBVSxPQUFPLGVBQXNCO0FBQ3hDLFFBQU0sZUFBZSxNQUFNLFlBQVksTUFBTTtBQUMzQyxRQUFJLGFBQWEsUUFBVztBQUMxQixlQUFTLENBQUMsS0FBSztBQUFBLElBQ2pCO0FBQUEsRUFDRixHQUFHLENBQUMsVUFBVSxLQUFLLENBQUM7QUFFcEIsUUFBTSxZQUFZLFFBQVEsT0FBTyxrQkFBa0IsT0FBTztBQUUxRCxTQUNFLG9DQUFDO0FBQUEsSUFBTSxXQUFXLE9BQU87QUFBQSxLQUN2QixvQ0FBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVyxPQUFPO0FBQUEsSUFDbEIsU0FBUztBQUFBLElBQ1QsZ0JBQWM7QUFBQSxJQUNkLFVBQVU7QUFBQSxHQUNaLEdBQ0Esb0NBQUM7QUFBQSxJQUFLO0FBQUEsS0FBdUIsUUFBUSxXQUFXLElBQUssR0FDckQsb0NBQUM7QUFBQSxJQUFPLFdBQVcsT0FBTztBQUFBLEtBQVEsUUFBUyxDQUM3QztBQUVKLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
