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
var Slider_stories_exports = {};
__export(Slider_stories_exports, {
  Default: () => Default,
  DraggableTest: () => DraggableTest,
  default: () => Slider_stories_default
});
module.exports = __toCommonJS(Slider_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_Slider = require("./Slider");
var Slider_stories_default = {
  title: "Components/Slider"
};
const createProps = /* @__PURE__ */ __name(() => ({
  label: "Slider Handle",
  onChange: (0, import_addon_actions.action)("onChange"),
  value: 30
}), "createProps");
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
  ...createProps()
}), "Default");
const DraggableTest = /* @__PURE__ */ __name(() => {
  function StatefulSliderController(props) {
    const [value, setValue] = (0, import_react.useState)(30);
    return /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
      ...props,
      onChange: setValue,
      value
    });
  }
  return /* @__PURE__ */ import_react.default.createElement(StatefulSliderController, {
    ...createProps()
  });
}, "DraggableTest");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  DraggableTest
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2xpZGVyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1NsaWRlcic7XG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuL1NsaWRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1NsaWRlcicsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9ICgpOiBQcm9wc1R5cGUgPT4gKHtcbiAgbGFiZWw6ICdTbGlkZXIgSGFuZGxlJyxcbiAgb25DaGFuZ2U6IGFjdGlvbignb25DaGFuZ2UnKSxcbiAgdmFsdWU6IDMwLFxufSk7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IDxTbGlkZXIgey4uLmNyZWF0ZVByb3BzKCl9IC8+O1xuXG5leHBvcnQgY29uc3QgRHJhZ2dhYmxlVGVzdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGZ1bmN0aW9uIFN0YXRlZnVsU2xpZGVyQ29udHJvbGxlcihwcm9wczogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoMzApO1xuXG4gICAgcmV0dXJuIDxTbGlkZXIgey4uLnByb3BzfSBvbkNoYW5nZT17c2V0VmFsdWV9IHZhbHVlPXt2YWx1ZX0gLz47XG4gIH1cblxuICByZXR1cm4gPFN0YXRlZnVsU2xpZGVyQ29udHJvbGxlciB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMsMkJBQXVCO0FBR3ZCLG9CQUF1QjtBQUV2QixJQUFPLHlCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsNkJBQWtCO0FBQUEsRUFDcEMsT0FBTztBQUFBLEVBQ1AsVUFBVSxpQ0FBTyxVQUFVO0FBQUEsRUFDM0IsT0FBTztBQUNULElBSm9CO0FBTWIsTUFBTSxVQUFVLDZCQUFtQixtREFBQztBQUFBLEtBQVcsWUFBWTtBQUFBLENBQUcsR0FBOUM7QUFFaEIsTUFBTSxnQkFBZ0IsNkJBQW1CO0FBQzlDLG9DQUFrQyxPQUErQjtBQUMvRCxVQUFNLENBQUMsT0FBTyxZQUFZLDJCQUFTLEVBQUU7QUFFckMsV0FBTyxtREFBQztBQUFBLFNBQVc7QUFBQSxNQUFPLFVBQVU7QUFBQSxNQUFVO0FBQUEsS0FBYztBQUFBLEVBQzlEO0FBSlMsQUFNVCxTQUFPLG1EQUFDO0FBQUEsT0FBNkIsWUFBWTtBQUFBLEdBQUc7QUFDdEQsR0FSNkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
