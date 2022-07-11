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
var CallingScreenSharingController_exports = {};
__export(CallingScreenSharingController_exports, {
  CallingScreenSharingController: () => CallingScreenSharingController
});
module.exports = __toCommonJS(CallingScreenSharingController_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
const CallingScreenSharingController = /* @__PURE__ */ __name(({
  i18n,
  onCloseController,
  onStopSharing,
  presentedSourceName
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingScreenSharingController"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingScreenSharingController__text"
  }, i18n("calling__presenting--info", [presentedSourceName])), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingScreenSharingController__buttons"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    className: "module-CallingScreenSharingController__button",
    onClick: onStopSharing,
    variant: import_Button.ButtonVariant.Destructive
  }, i18n("calling__presenting--stop")), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: "module-CallingScreenSharingController__close",
    onClick: onCloseController,
    type: "button"
  })));
}, "CallingScreenSharingController");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingScreenSharingController
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZUNvbnRyb2xsZXI6ICgpID0+IHVua25vd247XG4gIG9uU3RvcFNoYXJpbmc6ICgpID0+IHVua25vd247XG4gIHByZXNlbnRlZFNvdXJjZU5hbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBDYWxsaW5nU2NyZWVuU2hhcmluZ0NvbnRyb2xsZXIgPSAoe1xuICBpMThuLFxuICBvbkNsb3NlQ29udHJvbGxlcixcbiAgb25TdG9wU2hhcmluZyxcbiAgcHJlc2VudGVkU291cmNlTmFtZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1DYWxsaW5nU2NyZWVuU2hhcmluZ0NvbnRyb2xsZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTY3JlZW5TaGFyaW5nQ29udHJvbGxlcl9fdGV4dFwiPlxuICAgICAgICB7aTE4bignY2FsbGluZ19fcHJlc2VudGluZy0taW5mbycsIFtwcmVzZW50ZWRTb3VyY2VOYW1lXSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTY3JlZW5TaGFyaW5nQ29udHJvbGxlcl9fYnV0dG9uc1wiPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTY3JlZW5TaGFyaW5nQ29udHJvbGxlcl9fYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtvblN0b3BTaGFyaW5nfVxuICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuRGVzdHJ1Y3RpdmV9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignY2FsbGluZ19fcHJlc2VudGluZy0tc3RvcCcpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Nsb3NlJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTY3JlZW5TaGFyaW5nQ29udHJvbGxlcl9fY2xvc2VcIlxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2VDb250cm9sbGVyfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQixvQkFBc0M7QUFVL0IsTUFBTSxpQ0FBaUMsd0JBQUM7QUFBQSxFQUM3QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixLQUFLLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLENBQzFELEdBQ0EsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsS0FBSywyQkFBMkIsQ0FDbkMsR0FDQSxtREFBQztBQUFBLElBQ0MsY0FBWSxLQUFLLE9BQU87QUFBQSxJQUN4QixXQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxNQUFLO0FBQUEsR0FDUCxDQUNGLENBQ0Y7QUFFSixHQTVCOEM7IiwKICAibmFtZXMiOiBbXQp9Cg==
