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
var InstallScreenChoosingDeviceNameStep_stories_exports = {};
__export(InstallScreenChoosingDeviceNameStep_stories_exports, {
  Default: () => Default,
  default: () => InstallScreenChoosingDeviceNameStep_stories_default
});
module.exports = __toCommonJS(InstallScreenChoosingDeviceNameStep_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_InstallScreenChoosingDeviceNameStep = require("./InstallScreenChoosingDeviceNameStep");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var InstallScreenChoosingDeviceNameStep_stories_default = {
  title: "Components/InstallScreen/InstallScreenChoosingDeviceNameStep"
};
const Default = /* @__PURE__ */ __name(() => {
  const Wrapper = /* @__PURE__ */ __name(() => {
    const [deviceName, setDeviceName] = (0, import_react.useState)("Default value");
    return /* @__PURE__ */ import_react.default.createElement(import_InstallScreenChoosingDeviceNameStep.InstallScreenChoosingDeviceNameStep, {
      i18n,
      deviceName,
      setDeviceName,
      onSubmit: (0, import_addon_actions.action)("onSubmit")
    });
  }, "Wrapper");
  return /* @__PURE__ */ import_react.default.createElement(Wrapper, null);
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHsgSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAgfSBmcm9tICcuL0luc3RhbGxTY3JlZW5DaG9vc2luZ0RldmljZU5hbWVTdGVwJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvSW5zdGFsbFNjcmVlbi9JbnN0YWxsU2NyZWVuQ2hvb3NpbmdEZXZpY2VOYW1lU3RlcCcsXG59O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgW2RldmljZU5hbWUsIHNldERldmljZU5hbWVdID0gdXNlU3RhdGU8c3RyaW5nPignRGVmYXVsdCB2YWx1ZScpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxJbnN0YWxsU2NyZWVuQ2hvb3NpbmdEZXZpY2VOYW1lU3RlcFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBkZXZpY2VOYW1lPXtkZXZpY2VOYW1lfVxuICAgICAgICBzZXREZXZpY2VOYW1lPXtzZXREZXZpY2VOYW1lfVxuICAgICAgICBvblN1Ym1pdD17YWN0aW9uKCdvblN1Ym1pdCcpfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiA8V3JhcHBlciAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMsMkJBQXVCO0FBRXZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsaURBQW9EO0FBRXBELE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sc0RBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sVUFBVSw2QkFBbUI7QUFDeEMsUUFBTSxVQUFVLDZCQUFNO0FBQ3BCLFVBQU0sQ0FBQyxZQUFZLGlCQUFpQiwyQkFBaUIsZUFBZTtBQUVwRSxXQUNFLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxVQUFVLGlDQUFPLFVBQVU7QUFBQSxLQUM3QjtBQUFBLEVBRUosR0FYZ0I7QUFhaEIsU0FBTyxtREFBQyxhQUFRO0FBQ2xCLEdBZnVCOyIsCiAgIm5hbWVzIjogW10KfQo=
