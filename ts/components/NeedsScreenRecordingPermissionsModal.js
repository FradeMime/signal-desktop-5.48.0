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
var NeedsScreenRecordingPermissionsModal_exports = {};
__export(NeedsScreenRecordingPermissionsModal_exports, {
  NeedsScreenRecordingPermissionsModal: () => NeedsScreenRecordingPermissionsModal
});
module.exports = __toCommonJS(NeedsScreenRecordingPermissionsModal_exports);
var import_react = __toESM(require("react"));
var import_theme = require("../util/theme");
var import_Modal = require("./Modal");
var import_Button = require("./Button");
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
const NeedsScreenRecordingPermissionsModal = /* @__PURE__ */ __name(({
  i18n,
  openSystemPreferencesAction,
  toggleScreenRecordingPermissionsDialog
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    i18n,
    title: i18n("calling__presenting--permission-title"),
    theme: import_theme.Theme.Dark,
    onClose: toggleScreenRecordingPermissionsDialog
  }, /* @__PURE__ */ import_react.default.createElement("p", null, i18n("calling__presenting--macos-permission-description")), /* @__PURE__ */ import_react.default.createElement("ol", {
    style: { paddingLeft: 16 }
  }, /* @__PURE__ */ import_react.default.createElement("li", null, i18n("calling__presenting--permission-instruction-step1")), /* @__PURE__ */ import_react.default.createElement("li", null, i18n("calling__presenting--permission-instruction-step2")), /* @__PURE__ */ import_react.default.createElement("li", null, i18n("calling__presenting--permission-instruction-step3"))), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: toggleScreenRecordingPermissionsDialog,
    ref: focusRef,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("calling__presenting--permission-cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: () => {
      openSystemPreferencesAction();
      toggleScreenRecordingPermissionsDialog();
    },
    variant: import_Button.ButtonVariant.Primary
  }, i18n("calling__presenting--permission-open"))));
}, "NeedsScreenRecordingPermissionsModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NeedsScreenRecordingPermissionsModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTmVlZHNTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc01vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9wZW5TeXN0ZW1QcmVmZXJlbmNlc0FjdGlvbjogKCkgPT4gdW5rbm93bjtcbiAgdG9nZ2xlU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNEaWFsb2c6ICgpID0+IHVua25vd247XG59O1xuXG5mdW5jdGlvbiBmb2N1c1JlZihlbDogSFRNTEVsZW1lbnQgfCBudWxsKSB7XG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IE5lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNNb2RhbCA9ICh7XG4gIGkxOG4sXG4gIG9wZW5TeXN0ZW1QcmVmZXJlbmNlc0FjdGlvbixcbiAgdG9nZ2xlU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNEaWFsb2csXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPE1vZGFsXG4gICAgICBpMThuPXtpMThufVxuICAgICAgdGl0bGU9e2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLXBlcm1pc3Npb24tdGl0bGUnKX1cbiAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgICAgb25DbG9zZT17dG9nZ2xlU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNEaWFsb2d9XG4gICAgPlxuICAgICAgPHA+e2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLW1hY29zLXBlcm1pc3Npb24tZGVzY3JpcHRpb24nKX08L3A+XG4gICAgICA8b2wgc3R5bGU9e3sgcGFkZGluZ0xlZnQ6IDE2IH19PlxuICAgICAgICA8bGk+e2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLXBlcm1pc3Npb24taW5zdHJ1Y3Rpb24tc3RlcDEnKX08L2xpPlxuICAgICAgICA8bGk+e2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLXBlcm1pc3Npb24taW5zdHJ1Y3Rpb24tc3RlcDInKX08L2xpPlxuICAgICAgICA8bGk+e2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLXBlcm1pc3Npb24taW5zdHJ1Y3Rpb24tc3RlcDMnKX08L2xpPlxuICAgICAgPC9vbD5cbiAgICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZ31cbiAgICAgICAgICByZWY9e2ZvY3VzUmVmfVxuICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLXBlcm1pc3Npb24tY2FuY2VsJyl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb3BlblN5c3RlbVByZWZlcmVuY2VzQWN0aW9uKCk7XG4gICAgICAgICAgICB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZygpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5QcmltYXJ5fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLXBlcm1pc3Npb24tb3BlbicpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQixtQkFBc0I7QUFDdEIsbUJBQXNCO0FBQ3RCLG9CQUFzQztBQVF0QyxrQkFBa0IsSUFBd0I7QUFDeEMsTUFBSSxJQUFJO0FBQ04sT0FBRyxNQUFNO0FBQUEsRUFDWDtBQUNGO0FBSlMsQUFNRixNQUFNLHVDQUF1Qyx3QkFBQztBQUFBLEVBQ25EO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsT0FBTyxLQUFLLHVDQUF1QztBQUFBLElBQ25ELE9BQU8sbUJBQU07QUFBQSxJQUNiLFNBQVM7QUFBQSxLQUVULG1EQUFDLFdBQUcsS0FBSyxtREFBbUQsQ0FBRSxHQUM5RCxtREFBQztBQUFBLElBQUcsT0FBTyxFQUFFLGFBQWEsR0FBRztBQUFBLEtBQzNCLG1EQUFDLFlBQUksS0FBSyxtREFBbUQsQ0FBRSxHQUMvRCxtREFBQyxZQUFJLEtBQUssbURBQW1ELENBQUUsR0FDL0QsbURBQUMsWUFBSSxLQUFLLG1EQUFtRCxDQUFFLENBQ2pFLEdBQ0EsbURBQUMsbUJBQU0sY0FBTixNQUNDLG1EQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsS0FBSyx3Q0FBd0MsQ0FDaEQsR0FDQSxtREFBQztBQUFBLElBQ0MsU0FBUyxNQUFNO0FBQ2Isa0NBQTRCO0FBQzVCLDZDQUF1QztBQUFBLElBQ3pDO0FBQUEsSUFDQSxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsS0FBSyxzQ0FBc0MsQ0FDOUMsQ0FDRixDQUNGO0FBRUosR0F0Q29EOyIsCiAgIm5hbWVzIjogW10KfQo=
