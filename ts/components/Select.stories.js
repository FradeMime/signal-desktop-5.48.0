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
var Select_stories_exports = {};
__export(Select_stories_exports, {
  Normal: () => Normal,
  WithDisabledOptions: () => WithDisabledOptions,
  default: () => Select_stories_default
});
module.exports = __toCommonJS(Select_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_Select = require("./Select");
var Select_stories_default = {
  title: "Components/Select"
};
const Normal = /* @__PURE__ */ __name(() => {
  const [value, setValue] = (0, import_react.useState)(0);
  const onChange = (0, import_addon_actions.action)("onChange");
  return /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
    options: [
      { value: 1, text: "1" },
      { value: 2, text: "2" },
      { value: 3, text: "3" }
    ],
    value,
    onChange: (newValue) => {
      onChange(newValue);
      setValue(parseInt(newValue, 10));
    }
  });
}, "Normal");
const WithDisabledOptions = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
  options: [
    { value: "a", text: "Apples" },
    { value: "b", text: "Bananas", disabled: true },
    { value: "c", text: "Cabbage" },
    { value: "d", text: "Durian", disabled: true }
  ],
  onChange: (0, import_addon_actions.action)("onChange"),
  value: "c"
}), "WithDisabledOptions");
WithDisabledOptions.story = {
  name: "With disabled options"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Normal,
  WithDisabledOptions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2VsZWN0LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4vU2VsZWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU2VsZWN0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3JtYWwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IG9uQ2hhbmdlID0gYWN0aW9uKCdvbkNoYW5nZScpO1xuXG4gIHJldHVybiAoXG4gICAgPFNlbGVjdFxuICAgICAgb3B0aW9ucz17W1xuICAgICAgICB7IHZhbHVlOiAxLCB0ZXh0OiAnMScgfSxcbiAgICAgICAgeyB2YWx1ZTogMiwgdGV4dDogJzInIH0sXG4gICAgICAgIHsgdmFsdWU6IDMsIHRleHQ6ICczJyB9LFxuICAgICAgXX1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtuZXdWYWx1ZSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgICAgc2V0VmFsdWUocGFyc2VJbnQobmV3VmFsdWUsIDEwKSk7XG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aERpc2FibGVkT3B0aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTZWxlY3RcbiAgICBvcHRpb25zPXtbXG4gICAgICB7IHZhbHVlOiAnYScsIHRleHQ6ICdBcHBsZXMnIH0sXG4gICAgICB7IHZhbHVlOiAnYicsIHRleHQ6ICdCYW5hbmFzJywgZGlzYWJsZWQ6IHRydWUgfSxcbiAgICAgIHsgdmFsdWU6ICdjJywgdGV4dDogJ0NhYmJhZ2UnIH0sXG4gICAgICB7IHZhbHVlOiAnZCcsIHRleHQ6ICdEdXJpYW4nLCBkaXNhYmxlZDogdHJ1ZSB9LFxuICAgIF19XG4gICAgb25DaGFuZ2U9e2FjdGlvbignb25DaGFuZ2UnKX1cbiAgICB2YWx1ZT1cImNcIlxuICAvPlxuKTtcblxuV2l0aERpc2FibGVkT3B0aW9ucy5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggZGlzYWJsZWQgb3B0aW9ucycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFDaEMsMkJBQXVCO0FBRXZCLG9CQUF1QjtBQUV2QixJQUFPLHlCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFFBQU0sQ0FBQyxPQUFPLFlBQVksMkJBQVMsQ0FBQztBQUVwQyxRQUFNLFdBQVcsaUNBQU8sVUFBVTtBQUVsQyxTQUNFLG1EQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsTUFDUCxFQUFFLE9BQU8sR0FBRyxNQUFNLElBQUk7QUFBQSxNQUN0QixFQUFFLE9BQU8sR0FBRyxNQUFNLElBQUk7QUFBQSxNQUN0QixFQUFFLE9BQU8sR0FBRyxNQUFNLElBQUk7QUFBQSxJQUN4QjtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVUsY0FBWTtBQUNwQixlQUFTLFFBQVE7QUFDakIsZUFBUyxTQUFTLFVBQVUsRUFBRSxDQUFDO0FBQUEsSUFDakM7QUFBQSxHQUNGO0FBRUosR0FuQnNCO0FBcUJmLE1BQU0sc0JBQXNCLDZCQUNqQyxtREFBQztBQUFBLEVBQ0MsU0FBUztBQUFBLElBQ1AsRUFBRSxPQUFPLEtBQUssTUFBTSxTQUFTO0FBQUEsSUFDN0IsRUFBRSxPQUFPLEtBQUssTUFBTSxXQUFXLFVBQVUsS0FBSztBQUFBLElBQzlDLEVBQUUsT0FBTyxLQUFLLE1BQU0sVUFBVTtBQUFBLElBQzlCLEVBQUUsT0FBTyxLQUFLLE1BQU0sVUFBVSxVQUFVLEtBQUs7QUFBQSxFQUMvQztBQUFBLEVBQ0EsVUFBVSxpQ0FBTyxVQUFVO0FBQUEsRUFDM0IsT0FBTTtBQUFBLENBQ1IsR0FWaUM7QUFhbkMsb0JBQW9CLFFBQVE7QUFBQSxFQUMxQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
