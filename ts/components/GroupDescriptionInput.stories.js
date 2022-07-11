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
var GroupDescriptionInput_stories_exports = {};
__export(GroupDescriptionInput_stories_exports, {
  Default: () => Default,
  Disabled: () => Disabled,
  default: () => GroupDescriptionInput_stories_default
});
module.exports = __toCommonJS(GroupDescriptionInput_stories_exports);
var import_react = __toESM(require("react"));
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_GroupDescriptionInput = require("./GroupDescriptionInput");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var GroupDescriptionInput_stories_default = {
  title: "Components/GroupDescriptionInput"
};
const Wrapper = /* @__PURE__ */ __name(({
  disabled,
  startingValue = ""
}) => {
  const [value, setValue] = (0, import_react.useState)(startingValue);
  return /* @__PURE__ */ import_react.default.createElement(import_GroupDescriptionInput.GroupDescriptionInput, {
    disabled,
    i18n,
    onChangeValue: setValue,
    value
  });
}, "Wrapper");
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, null), "Default");
const Disabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  disabled: true
}), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  disabled: true,
  startingValue: "Has a value"
})), "Disabled");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  Disabled
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBEZXNjcmlwdGlvbklucHV0LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmltcG9ydCB7IEdyb3VwRGVzY3JpcHRpb25JbnB1dCB9IGZyb20gJy4vR3JvdXBEZXNjcmlwdGlvbklucHV0JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvR3JvdXBEZXNjcmlwdGlvbklucHV0Jyxcbn07XG5cbmNvbnN0IFdyYXBwZXIgPSAoe1xuICBkaXNhYmxlZCxcbiAgc3RhcnRpbmdWYWx1ZSA9ICcnLFxufToge1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHN0YXJ0aW5nVmFsdWU/OiBzdHJpbmc7XG59KSA9PiB7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoc3RhcnRpbmdWYWx1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8R3JvdXBEZXNjcmlwdGlvbklucHV0XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DaGFuZ2VWYWx1ZT17c2V0VmFsdWV9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IDxXcmFwcGVyIC8+O1xuXG5leHBvcnQgY29uc3QgRGlzYWJsZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8PlxuICAgIDxXcmFwcGVyIGRpc2FibGVkIC8+XG4gICAgPGJyIC8+XG4gICAgPFdyYXBwZXIgZGlzYWJsZWQgc3RhcnRpbmdWYWx1ZT1cIkhhcyBhIHZhbHVlXCIgLz5cbiAgPC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixtQ0FBc0M7QUFFdEMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyx3Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxVQUFVLHdCQUFDO0FBQUEsRUFDZjtBQUFBLEVBQ0EsZ0JBQWdCO0FBQUEsTUFJWjtBQUNKLFFBQU0sQ0FBQyxPQUFPLFlBQVksMkJBQVMsYUFBYTtBQUVoRCxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmO0FBQUEsR0FDRjtBQUVKLEdBakJnQjtBQW1CVCxNQUFNLFVBQVUsNkJBQW1CLG1EQUFDLGFBQVEsR0FBNUI7QUFFaEIsTUFBTSxXQUFXLDZCQUN0Qix3RkFDRSxtREFBQztBQUFBLEVBQVEsVUFBUTtBQUFBLENBQUMsR0FDbEIsbURBQUMsVUFBRyxHQUNKLG1EQUFDO0FBQUEsRUFBUSxVQUFRO0FBQUEsRUFBQyxlQUFjO0FBQUEsQ0FBYyxDQUNoRCxHQUxzQjsiLAogICJuYW1lcyI6IFtdCn0K
