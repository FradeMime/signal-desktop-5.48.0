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
var DisappearingTimeDialog_stories_exports = {};
__export(DisappearingTimeDialog_stories_exports, {
  Days: () => Days,
  Hours: () => Hours,
  Minutes: () => Minutes,
  Seconds: () => Seconds,
  Weeks: () => Weeks,
  default: () => DisappearingTimeDialog_stories_default
});
module.exports = __toCommonJS(DisappearingTimeDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_DisappearingTimeDialog = require("./DisappearingTimeDialog");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_expireTimers = require("../test-both/util/expireTimers");
var DisappearingTimeDialog_stories_default = {
  title: "Components/DisappearingTimeDialog"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const Seconds = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
  i18n,
  initialValue: import_expireTimers.EXPIRE_TIMERS[0].value,
  onSubmit: (0, import_addon_actions.action)("onSubmit"),
  onClose: (0, import_addon_actions.action)("onClose")
}), "Seconds");
const Minutes = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
  i18n,
  initialValue: import_expireTimers.EXPIRE_TIMERS[1].value,
  onSubmit: (0, import_addon_actions.action)("onSubmit"),
  onClose: (0, import_addon_actions.action)("onClose")
}), "Minutes");
const Hours = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
  i18n,
  initialValue: import_expireTimers.EXPIRE_TIMERS[2].value,
  onSubmit: (0, import_addon_actions.action)("onSubmit"),
  onClose: (0, import_addon_actions.action)("onClose")
}), "Hours");
const Days = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
  i18n,
  initialValue: import_expireTimers.EXPIRE_TIMERS[3].value,
  onSubmit: (0, import_addon_actions.action)("onSubmit"),
  onClose: (0, import_addon_actions.action)("onClose")
}), "Days");
const Weeks = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
  i18n,
  initialValue: import_expireTimers.EXPIRE_TIMERS[4].value,
  onSubmit: (0, import_addon_actions.action)("onSubmit"),
  onClose: (0, import_addon_actions.action)("onClose")
}), "Weeks");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Days,
  Hours,
  Minutes,
  Seconds,
  Weeks
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlzYXBwZWFyaW5nVGltZURpYWxvZy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgRGlzYXBwZWFyaW5nVGltZURpYWxvZyB9IGZyb20gJy4vRGlzYXBwZWFyaW5nVGltZURpYWxvZyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHsgRVhQSVJFX1RJTUVSUyB9IGZyb20gJy4uL3Rlc3QtYm90aC91dGlsL2V4cGlyZVRpbWVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0Rpc2FwcGVhcmluZ1RpbWVEaWFsb2cnLFxufTtcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGNvbnN0IFNlY29uZHMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RGlzYXBwZWFyaW5nVGltZURpYWxvZ1xuICAgIGkxOG49e2kxOG59XG4gICAgaW5pdGlhbFZhbHVlPXtFWFBJUkVfVElNRVJTWzBdLnZhbHVlfVxuICAgIG9uU3VibWl0PXthY3Rpb24oJ29uU3VibWl0Jyl9XG4gICAgb25DbG9zZT17YWN0aW9uKCdvbkNsb3NlJyl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgTWludXRlcyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxEaXNhcHBlYXJpbmdUaW1lRGlhbG9nXG4gICAgaTE4bj17aTE4bn1cbiAgICBpbml0aWFsVmFsdWU9e0VYUElSRV9USU1FUlNbMV0udmFsdWV9XG4gICAgb25TdWJtaXQ9e2FjdGlvbignb25TdWJtaXQnKX1cbiAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBIb3VycyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxEaXNhcHBlYXJpbmdUaW1lRGlhbG9nXG4gICAgaTE4bj17aTE4bn1cbiAgICBpbml0aWFsVmFsdWU9e0VYUElSRV9USU1FUlNbMl0udmFsdWV9XG4gICAgb25TdWJtaXQ9e2FjdGlvbignb25TdWJtaXQnKX1cbiAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBEYXlzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPERpc2FwcGVhcmluZ1RpbWVEaWFsb2dcbiAgICBpMThuPXtpMThufVxuICAgIGluaXRpYWxWYWx1ZT17RVhQSVJFX1RJTUVSU1szXS52YWx1ZX1cbiAgICBvblN1Ym1pdD17YWN0aW9uKCdvblN1Ym1pdCcpfVxuICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFdlZWtzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPERpc2FwcGVhcmluZ1RpbWVEaWFsb2dcbiAgICBpMThuPXtpMThufVxuICAgIGluaXRpYWxWYWx1ZT17RVhQSVJFX1RJTUVSU1s0XS52YWx1ZX1cbiAgICBvblN1Ym1pdD17YWN0aW9uKCdvblN1Ym1pdCcpfVxuICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAvPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUV2QixvQ0FBdUM7QUFDdkMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwwQkFBOEI7QUFFOUIsSUFBTyx5Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFaEMsTUFBTSxVQUFVLDZCQUNyQixtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLGNBQWMsa0NBQWMsR0FBRztBQUFBLEVBQy9CLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLFNBQVMsaUNBQU8sU0FBUztBQUFBLENBQzNCLEdBTnFCO0FBU2hCLE1BQU0sVUFBVSw2QkFDckIsbURBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQSxjQUFjLGtDQUFjLEdBQUc7QUFBQSxFQUMvQixVQUFVLGlDQUFPLFVBQVU7QUFBQSxFQUMzQixTQUFTLGlDQUFPLFNBQVM7QUFBQSxDQUMzQixHQU5xQjtBQVNoQixNQUFNLFFBQVEsNkJBQ25CLG1EQUFDO0FBQUEsRUFDQztBQUFBLEVBQ0EsY0FBYyxrQ0FBYyxHQUFHO0FBQUEsRUFDL0IsVUFBVSxpQ0FBTyxVQUFVO0FBQUEsRUFDM0IsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsQ0FDM0IsR0FObUI7QUFTZCxNQUFNLE9BQU8sNkJBQ2xCLG1EQUFDO0FBQUEsRUFDQztBQUFBLEVBQ0EsY0FBYyxrQ0FBYyxHQUFHO0FBQUEsRUFDL0IsVUFBVSxpQ0FBTyxVQUFVO0FBQUEsRUFDM0IsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsQ0FDM0IsR0FOa0I7QUFTYixNQUFNLFFBQVEsNkJBQ25CLG1EQUFDO0FBQUEsRUFDQztBQUFBLEVBQ0EsY0FBYyxrQ0FBYyxHQUFHO0FBQUEsRUFDL0IsVUFBVSxpQ0FBTyxVQUFVO0FBQUEsRUFDM0IsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsQ0FDM0IsR0FObUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
