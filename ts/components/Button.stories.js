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
var Button_stories_exports = {};
__export(Button_stories_exports, {
  AriaLabel: () => AriaLabel,
  CustomStyles: () => CustomStyles,
  KitchenSink: () => KitchenSink,
  default: () => Button_stories_default
});
module.exports = __toCommonJS(Button_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_Button = require("./Button");
var Button_stories_default = {
  title: "Components/Button"
};
const KitchenSink = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, Object.values(import_Button.ButtonVariant).map((variant) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
  key: variant
}, [import_Button.ButtonSize.Large, import_Button.ButtonSize.Medium, import_Button.ButtonSize.Small].map((size) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
  key: size
}, /* @__PURE__ */ import_react.default.createElement("p", null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: (0, import_addon_actions.action)("onClick"),
  size,
  variant
}, variant)), /* @__PURE__ */ import_react.default.createElement("p", null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  disabled: true,
  onClick: (0, import_addon_actions.action)("onClick"),
  size,
  variant
}, variant))))))), "KitchenSink");
KitchenSink.story = {
  name: "Kitchen sink"
};
const AriaLabel = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  "aria-label": "hello",
  className: "module-ForwardMessageModal__header--back",
  onClick: (0, import_addon_actions.action)("onClick")
}), "AriaLabel");
AriaLabel.story = {
  name: "aria-label"
};
const CustomStyles = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: (0, import_addon_actions.action)("onClick"),
  style: { transform: "rotate(5deg)" }
}, "Hello world"), "CustomStyles");
CustomStyles.story = {
  name: "Custom styles"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AriaLabel,
  CustomStyles,
  KitchenSink
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQnV0dG9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblNpemUsIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuL0J1dHRvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0J1dHRvbicsXG59O1xuXG5leHBvcnQgY29uc3QgS2l0Y2hlblNpbmsgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8PlxuICAgIHtPYmplY3QudmFsdWVzKEJ1dHRvblZhcmlhbnQpLm1hcCh2YXJpYW50ID0+IChcbiAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e3ZhcmlhbnR9PlxuICAgICAgICB7W0J1dHRvblNpemUuTGFyZ2UsIEJ1dHRvblNpemUuTWVkaXVtLCBCdXR0b25TaXplLlNtYWxsXS5tYXAoc2l6ZSA9PiAoXG4gICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17c2l6ZX0+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXthY3Rpb24oJ29uQ2xpY2snKX0gc2l6ZT17c2l6ZX0gdmFyaWFudD17dmFyaWFudH0+XG4gICAgICAgICAgICAgICAge3ZhcmlhbnR9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FjdGlvbignb25DbGljaycpfVxuICAgICAgICAgICAgICAgIHNpemU9e3NpemV9XG4gICAgICAgICAgICAgICAgdmFyaWFudD17dmFyaWFudH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt2YXJpYW50fVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICApKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKSl9XG4gIDwvPlxuKTtcblxuS2l0Y2hlblNpbmsuc3RvcnkgPSB7XG4gIG5hbWU6ICdLaXRjaGVuIHNpbmsnLFxufTtcblxuZXhwb3J0IGNvbnN0IEFyaWFMYWJlbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCdXR0b25cbiAgICBhcmlhLWxhYmVsPVwiaGVsbG9cIlxuICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19oZWFkZXItLWJhY2tcIlxuICAgIG9uQ2xpY2s9e2FjdGlvbignb25DbGljaycpfVxuICAvPlxuKTtcblxuQXJpYUxhYmVsLnN0b3J5ID0ge1xuICBuYW1lOiAnYXJpYS1sYWJlbCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tU3R5bGVzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEJ1dHRvbiBvbkNsaWNrPXthY3Rpb24oJ29uQ2xpY2snKX0gc3R5bGU9e3sgdHJhbnNmb3JtOiAncm90YXRlKDVkZWcpJyB9fT5cbiAgICBIZWxsbyB3b3JsZFxuICA8L0J1dHRvbj5cbik7XG5cbkN1c3RvbVN0eWxlcy5zdG9yeSA9IHtcbiAgbmFtZTogJ0N1c3RvbSBzdHlsZXMnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsMkJBQXVCO0FBRXZCLG9CQUFrRDtBQUVsRCxJQUFPLHlCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGNBQWMsNkJBQ3pCLHdGQUNHLE9BQU8sT0FBTywyQkFBYSxFQUFFLElBQUksYUFDaEMsbURBQUMscUJBQU0sVUFBTjtBQUFBLEVBQWUsS0FBSztBQUFBLEdBQ2xCLENBQUMseUJBQVcsT0FBTyx5QkFBVyxRQUFRLHlCQUFXLEtBQUssRUFBRSxJQUFJLFVBQzNELG1EQUFDLHFCQUFNLFVBQU47QUFBQSxFQUFlLEtBQUs7QUFBQSxHQUNuQixtREFBQyxXQUNDLG1EQUFDO0FBQUEsRUFBTyxTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUFHO0FBQUEsRUFBWTtBQUFBLEdBQzdDLE9BQ0gsQ0FDRixHQUNBLG1EQUFDLFdBQ0MsbURBQUM7QUFBQSxFQUNDLFVBQVE7QUFBQSxFQUNSLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCO0FBQUEsRUFDQTtBQUFBLEdBRUMsT0FDSCxDQUNGLENBQ0YsQ0FDRCxDQUNILENBQ0QsQ0FDSCxHQXpCeUI7QUE0QjNCLFlBQVksUUFBUTtBQUFBLEVBQ2xCLE1BQU07QUFDUjtBQUVPLE1BQU0sWUFBWSw2QkFDdkIsbURBQUM7QUFBQSxFQUNDLGNBQVc7QUFBQSxFQUNYLFdBQVU7QUFBQSxFQUNWLFNBQVMsaUNBQU8sU0FBUztBQUFBLENBQzNCLEdBTHVCO0FBUXpCLFVBQVUsUUFBUTtBQUFBLEVBQ2hCLE1BQU07QUFDUjtBQUVPLE1BQU0sZUFBZSw2QkFDMUIsbURBQUM7QUFBQSxFQUFPLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQUcsT0FBTyxFQUFFLFdBQVcsZUFBZTtBQUFBLEdBQUcsYUFFMUUsR0FIMEI7QUFNNUIsYUFBYSxRQUFRO0FBQUEsRUFDbkIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
