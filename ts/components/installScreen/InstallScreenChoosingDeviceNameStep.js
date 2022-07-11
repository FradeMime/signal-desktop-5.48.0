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
var InstallScreenChoosingDeviceNameStep_exports = {};
__export(InstallScreenChoosingDeviceNameStep_exports, {
  InstallScreenChoosingDeviceNameStep: () => InstallScreenChoosingDeviceNameStep,
  MAX_DEVICE_NAME_LENGTH: () => MAX_DEVICE_NAME_LENGTH
});
module.exports = __toCommonJS(InstallScreenChoosingDeviceNameStep_exports);
var import_react = __toESM(require("react"));
var import_normalizeDeviceName = require("../../util/normalizeDeviceName");
var import_Button = require("../Button");
var import_TitlebarDragArea = require("../TitlebarDragArea");
var import_InstallScreenSignalLogo = require("./InstallScreenSignalLogo");
const MAX_DEVICE_NAME_LENGTH = 50;
function InstallScreenChoosingDeviceNameStep({
  deviceName,
  i18n,
  onSubmit,
  setDeviceName
}) {
  const hasFocusedRef = (0, import_react.useRef)(false);
  const focusRef = /* @__PURE__ */ __name((el) => {
    if (el) {
      el.focus();
      hasFocusedRef.current = true;
    }
  }, "focusRef");
  const normalizedName = (0, import_normalizeDeviceName.normalizeDeviceName)(deviceName);
  const canSubmit = normalizedName.length > 0 && normalizedName.length <= MAX_DEVICE_NAME_LENGTH;
  return /* @__PURE__ */ import_react.default.createElement("form", {
    className: "module-InstallScreenChoosingDeviceNameStep",
    onSubmit: (event) => {
      event.preventDefault();
      onSubmit();
    }
  }, /* @__PURE__ */ import_react.default.createElement(import_TitlebarDragArea.TitlebarDragArea, null), /* @__PURE__ */ import_react.default.createElement(import_InstallScreenSignalLogo.InstallScreenSignalLogo, null), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-InstallScreenChoosingDeviceNameStep__contents"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-InstallScreenChoosingDeviceNameStep__header"
  }, /* @__PURE__ */ import_react.default.createElement("h1", null, i18n("chooseDeviceName")), /* @__PURE__ */ import_react.default.createElement("h2", null, i18n("Install__choose-device-name__description"))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-InstallScreenChoosingDeviceNameStep__inputs"
  }, /* @__PURE__ */ import_react.default.createElement("input", {
    className: "module-InstallScreenChoosingDeviceNameStep__input",
    maxLength: MAX_DEVICE_NAME_LENGTH,
    onChange: (event) => {
      setDeviceName(event.target.value);
    },
    placeholder: i18n("Install__choose-device-name__placeholder"),
    ref: focusRef,
    spellCheck: false,
    value: deviceName
  }), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !canSubmit,
    variant: import_Button.ButtonVariant.Primary,
    type: "submit"
  }, i18n("finishLinkingPhone")))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InstallScreenChoosingDeviceNameStep,
  MAX_DEVICE_NAME_LENGTH
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBub3JtYWxpemVEZXZpY2VOYW1lIH0gZnJvbSAnLi4vLi4vdXRpbC9ub3JtYWxpemVEZXZpY2VOYW1lJztcblxuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi4vQnV0dG9uJztcbmltcG9ydCB7IFRpdGxlYmFyRHJhZ0FyZWEgfSBmcm9tICcuLi9UaXRsZWJhckRyYWdBcmVhJztcbmltcG9ydCB7IEluc3RhbGxTY3JlZW5TaWduYWxMb2dvIH0gZnJvbSAnLi9JbnN0YWxsU2NyZWVuU2lnbmFsTG9nbyc7XG5cbi8vIFRoaXMgaXMgdGhlIHN0cmluZydzIGAubGVuZ3RoYCwgd2hpY2ggaXMgdGhlIG51bWJlciBvZiBVVEYtMTYgY29kZSBwb2ludHMuIEluc3RlYWQsIHdlXG4vLyAgIHdhbnQgdGhpcyB0byBiZSBlaXRoZXIgNTAgZ3JhcGhlbWVzIG9yIDI1NiBlbmNyeXB0ZWQgYnl0ZXMsIHdoaWNoZXZlciBpcyBzbWFsbGVyLiBTZWVcbi8vICAgREVTS1RPUC0yODQ0LlxuZXhwb3J0IGNvbnN0IE1BWF9ERVZJQ0VfTkFNRV9MRU5HVEggPSA1MDtcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGRldmljZU5hbWU6IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25TdWJtaXQ6ICgpID0+IHZvaWQ7XG4gIHNldERldmljZU5hbWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluc3RhbGxTY3JlZW5DaG9vc2luZ0RldmljZU5hbWVTdGVwKHtcbiAgZGV2aWNlTmFtZSxcbiAgaTE4bixcbiAgb25TdWJtaXQsXG4gIHNldERldmljZU5hbWUsXG59OiBSZWFkb25seTxQcm9wc1R5cGU+KTogUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgaGFzRm9jdXNlZFJlZiA9IHVzZVJlZjxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IGZvY3VzUmVmID0gKGVsOiBudWxsIHwgSFRNTEVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgICBoYXNGb2N1c2VkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZURldmljZU5hbWUoZGV2aWNlTmFtZSk7XG4gIGNvbnN0IGNhblN1Ym1pdCA9XG4gICAgbm9ybWFsaXplZE5hbWUubGVuZ3RoID4gMCAmJlxuICAgIG5vcm1hbGl6ZWROYW1lLmxlbmd0aCA8PSBNQVhfREVWSUNFX05BTUVfTEVOR1RIO1xuXG4gIHJldHVybiAoXG4gICAgPGZvcm1cbiAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1JbnN0YWxsU2NyZWVuQ2hvb3NpbmdEZXZpY2VOYW1lU3RlcFwiXG4gICAgICBvblN1Ym1pdD17ZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvblN1Ym1pdCgpO1xuICAgICAgfX1cbiAgICA+XG4gICAgICA8VGl0bGViYXJEcmFnQXJlYSAvPlxuXG4gICAgICA8SW5zdGFsbFNjcmVlblNpZ25hbExvZ28gLz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXBfX2NvbnRlbnRzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUluc3RhbGxTY3JlZW5DaG9vc2luZ0RldmljZU5hbWVTdGVwX19oZWFkZXJcIj5cbiAgICAgICAgICA8aDE+e2kxOG4oJ2Nob29zZURldmljZU5hbWUnKX08L2gxPlxuICAgICAgICAgIDxoMj57aTE4bignSW5zdGFsbF9fY2hvb3NlLWRldmljZS1uYW1lX19kZXNjcmlwdGlvbicpfTwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1JbnN0YWxsU2NyZWVuQ2hvb3NpbmdEZXZpY2VOYW1lU3RlcF9faW5wdXRzXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXBfX2lucHV0XCJcbiAgICAgICAgICAgIG1heExlbmd0aD17TUFYX0RFVklDRV9OQU1FX0xFTkdUSH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgIHNldERldmljZU5hbWUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aTE4bignSW5zdGFsbF9fY2hvb3NlLWRldmljZS1uYW1lX19wbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgICAgIHNwZWxsQ2hlY2s9e2ZhbHNlfVxuICAgICAgICAgICAgdmFsdWU9e2RldmljZU5hbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhblN1Ym1pdH1cbiAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuUHJpbWFyeX1cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdmaW5pc2hMaW5raW5nUGhvbmUnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBOEI7QUFHOUIsaUNBQW9DO0FBRXBDLG9CQUFzQztBQUN0Qyw4QkFBaUM7QUFDakMscUNBQXdDO0FBS2pDLE1BQU0seUJBQXlCO0FBUy9CLDZDQUE2QztBQUFBLEVBQ2xEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FDb0M7QUFDcEMsUUFBTSxnQkFBZ0IseUJBQWdCLEtBQUs7QUFDM0MsUUFBTSxXQUFXLHdCQUFDLE9BQTJCO0FBQzNDLFFBQUksSUFBSTtBQUNOLFNBQUcsTUFBTTtBQUNULG9CQUFjLFVBQVU7QUFBQSxJQUMxQjtBQUFBLEVBQ0YsR0FMaUI7QUFPakIsUUFBTSxpQkFBaUIsb0RBQW9CLFVBQVU7QUFDckQsUUFBTSxZQUNKLGVBQWUsU0FBUyxLQUN4QixlQUFlLFVBQVU7QUFFM0IsU0FDRSxtREFBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsVUFBVSxXQUFTO0FBQ2pCLFlBQU0sZUFBZTtBQUNyQixlQUFTO0FBQUEsSUFDWDtBQUFBLEtBRUEsbURBQUMsOENBQWlCLEdBRWxCLG1EQUFDLDREQUF3QixHQUV6QixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDLFlBQUksS0FBSyxrQkFBa0IsQ0FBRSxHQUM5QixtREFBQyxZQUFJLEtBQUssMENBQTBDLENBQUUsQ0FDeEQsR0FDQSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFVBQVUsV0FBUztBQUNqQixvQkFBYyxNQUFNLE9BQU8sS0FBSztBQUFBLElBQ2xDO0FBQUEsSUFDQSxhQUFhLEtBQUssMENBQTBDO0FBQUEsSUFDNUQsS0FBSztBQUFBLElBQ0wsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLEdBQ1QsR0FDQSxtREFBQztBQUFBLElBQ0MsVUFBVSxDQUFDO0FBQUEsSUFDWCxTQUFTLDRCQUFjO0FBQUEsSUFDdkIsTUFBSztBQUFBLEtBRUosS0FBSyxvQkFBb0IsQ0FDNUIsQ0FDRixDQUNGLENBQ0Y7QUFFSjtBQTNEZ0IiLAogICJuYW1lcyI6IFtdCn0K
