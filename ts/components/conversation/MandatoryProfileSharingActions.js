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
var MandatoryProfileSharingActions_exports = {};
__export(MandatoryProfileSharingActions_exports, {
  MandatoryProfileSharingActions: () => MandatoryProfileSharingActions
});
module.exports = __toCommonJS(MandatoryProfileSharingActions_exports);
var React = __toESM(require("react"));
var import_ContactName = require("./ContactName");
var import_Button = require("../Button");
var import_MessageRequestActionsConfirmation = require("./MessageRequestActionsConfirmation");
var import_Intl = require("../Intl");
const MandatoryProfileSharingActions = /* @__PURE__ */ __name(({
  conversationType,
  firstName,
  i18n,
  onAccept,
  onBlock,
  onBlockAndReportSpam,
  onDelete,
  title
}) => {
  const [mrState, setMrState] = React.useState(import_MessageRequestActionsConfirmation.MessageRequestState.default);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, mrState !== import_MessageRequestActionsConfirmation.MessageRequestState.default ? /* @__PURE__ */ React.createElement(import_MessageRequestActionsConfirmation.MessageRequestActionsConfirmation, {
    i18n,
    onBlock,
    onBlockAndReportSpam,
    onUnblock: () => {
      throw new Error("Should not be able to unblock from MandatoryProfileSharingActions");
    },
    onDelete,
    title,
    conversationType,
    state: mrState,
    onChangeState: setMrState
  }) : null, /* @__PURE__ */ React.createElement("div", {
    className: "module-message-request-actions"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "module-message-request-actions__message"
  }, /* @__PURE__ */ React.createElement(import_Intl.Intl, {
    i18n,
    id: `MessageRequests--profile-sharing--${conversationType}`,
    components: {
      firstName: /* @__PURE__ */ React.createElement("strong", {
        key: "name",
        className: "module-message-request-actions__message__name"
      }, /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
        firstName,
        title,
        preferFirstName: true
      })),
      learnMore: /* @__PURE__ */ React.createElement("a", {
        href: "https://support.signal.org/hc/articles/360007459591",
        target: "_blank",
        rel: "noreferrer",
        className: "module-message-request-actions__message__learn-more"
      }, i18n("MessageRequests--learn-more"))
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-message-request-actions__buttons"
  }, /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: () => {
      setMrState(import_MessageRequestActionsConfirmation.MessageRequestState.blocking);
    },
    variant: import_Button.ButtonVariant.SecondaryDestructive
  }, i18n("MessageRequests--block")), /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: () => {
      setMrState(import_MessageRequestActionsConfirmation.MessageRequestState.deleting);
    },
    variant: import_Button.ButtonVariant.SecondaryDestructive
  }, i18n("MessageRequests--delete")), /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: onAccept,
    variant: import_Button.ButtonVariant.SecondaryAffirmative
  }, i18n("MessageRequests--continue")))));
}, "MandatoryProfileSharingActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MandatoryProfileSharingActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdBY3Rpb25zLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIGFzIENvbnRhY3ROYW1lUHJvcHMgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBNZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb25Qcm9wcyB9IGZyb20gJy4vTWVzc2FnZVJlcXVlc3RBY3Rpb25zQ29uZmlybWF0aW9uJztcbmltcG9ydCB7XG4gIE1lc3NhZ2VSZXF1ZXN0QWN0aW9uc0NvbmZpcm1hdGlvbixcbiAgTWVzc2FnZVJlcXVlc3RTdGF0ZSxcbn0gZnJvbSAnLi9NZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb24nO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIG9uQWNjZXB0KCk6IHVua25vd247XG59ICYgT21pdDxDb250YWN0TmFtZVByb3BzLCAnbW9kdWxlJz4gJlxuICBQaWNrPFxuICAgIE1lc3NhZ2VSZXF1ZXN0QWN0aW9uc0NvbmZpcm1hdGlvblByb3BzLFxuICAgICdjb252ZXJzYXRpb25UeXBlJyB8ICdvbkJsb2NrJyB8ICdvbkJsb2NrQW5kUmVwb3J0U3BhbScgfCAnb25EZWxldGUnXG4gID47XG5cbmV4cG9ydCBjb25zdCBNYW5kYXRvcnlQcm9maWxlU2hhcmluZ0FjdGlvbnMgPSAoe1xuICBjb252ZXJzYXRpb25UeXBlLFxuICBmaXJzdE5hbWUsXG4gIGkxOG4sXG4gIG9uQWNjZXB0LFxuICBvbkJsb2NrLFxuICBvbkJsb2NrQW5kUmVwb3J0U3BhbSxcbiAgb25EZWxldGUsXG4gIHRpdGxlLFxufTogUHJvcHMpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFttclN0YXRlLCBzZXRNclN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlKE1lc3NhZ2VSZXF1ZXN0U3RhdGUuZGVmYXVsdCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge21yU3RhdGUgIT09IE1lc3NhZ2VSZXF1ZXN0U3RhdGUuZGVmYXVsdCA/IChcbiAgICAgICAgPE1lc3NhZ2VSZXF1ZXN0QWN0aW9uc0NvbmZpcm1hdGlvblxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25CbG9jaz17b25CbG9ja31cbiAgICAgICAgICBvbkJsb2NrQW5kUmVwb3J0U3BhbT17b25CbG9ja0FuZFJlcG9ydFNwYW19XG4gICAgICAgICAgb25VbmJsb2NrPXsoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICdTaG91bGQgbm90IGJlIGFibGUgdG8gdW5ibG9jayBmcm9tIE1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9ucydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkRlbGV0ZT17b25EZWxldGV9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9e2NvbnZlcnNhdGlvblR5cGV9XG4gICAgICAgICAgc3RhdGU9e21yU3RhdGV9XG4gICAgICAgICAgb25DaGFuZ2VTdGF0ZT17c2V0TXJTdGF0ZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1yZXF1ZXN0LWFjdGlvbnNcIj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtcmVxdWVzdC1hY3Rpb25zX19tZXNzYWdlXCI+XG4gICAgICAgICAgPEludGxcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpZD17YE1lc3NhZ2VSZXF1ZXN0cy0tcHJvZmlsZS1zaGFyaW5nLS0ke2NvbnZlcnNhdGlvblR5cGV9YH1cbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiAoXG4gICAgICAgICAgICAgICAgPHN0cm9uZ1xuICAgICAgICAgICAgICAgICAga2V5PVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1yZXF1ZXN0LWFjdGlvbnNfX21lc3NhZ2VfX25hbWVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxDb250YWN0TmFtZVxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU9e2ZpcnN0TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgICBwcmVmZXJGaXJzdE5hbWVcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGxlYXJuTW9yZTogKFxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdXBwb3J0LnNpZ25hbC5vcmcvaGMvYXJ0aWNsZXMvMzYwMDA3NDU5NTkxXCJcbiAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLXJlcXVlc3QtYWN0aW9uc19fbWVzc2FnZV9fbGVhcm4tbW9yZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2kxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tbGVhcm4tbW9yZScpfVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLXJlcXVlc3QtYWN0aW9uc19fYnV0dG9uc1wiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0TXJTdGF0ZShNZXNzYWdlUmVxdWVzdFN0YXRlLmJsb2NraW5nKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeURlc3RydWN0aXZlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWJsb2NrJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRNclN0YXRlKE1lc3NhZ2VSZXF1ZXN0U3RhdGUuZGVsZXRpbmcpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5RGVzdHJ1Y3RpdmV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tZGVsZXRlJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25BY2NlcHR9XG4gICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeUFmZmlybWF0aXZlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWNvbnRpbnVlJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHlCQUE0QjtBQUM1QixvQkFBc0M7QUFFdEMsK0NBR087QUFDUCxrQkFBcUI7QUFhZCxNQUFNLGlDQUFpQyx3QkFBQztBQUFBLEVBQzdDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ3dCO0FBQ3hCLFFBQU0sQ0FBQyxTQUFTLGNBQWMsTUFBTSxTQUFTLDZEQUFvQixPQUFPO0FBRXhFLFNBQ0UsMERBQ0csWUFBWSw2REFBb0IsVUFDL0Isb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVcsTUFBTTtBQUNmLFlBQU0sSUFBSSxNQUNSLG1FQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1AsZUFBZTtBQUFBLEdBQ2pCLElBQ0UsTUFDSixvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUFFLFdBQVU7QUFBQSxLQUNYLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsSUFBSSxxQ0FBcUM7QUFBQSxJQUN6QyxZQUFZO0FBQUEsTUFDVixXQUNFLG9DQUFDO0FBQUEsUUFDQyxLQUFJO0FBQUEsUUFDSixXQUFVO0FBQUEsU0FFVixvQ0FBQztBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxpQkFBZTtBQUFBLE9BQ2pCLENBQ0Y7QUFBQSxNQUVGLFdBQ0Usb0NBQUM7QUFBQSxRQUNDLE1BQUs7QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLEtBQUk7QUFBQSxRQUNKLFdBQVU7QUFBQSxTQUVULEtBQUssNkJBQTZCLENBQ3JDO0FBQUEsSUFFSjtBQUFBLEdBQ0YsQ0FDRixHQUNBLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixvQ0FBQztBQUFBLElBQ0MsU0FBUyxNQUFNO0FBQ2IsaUJBQVcsNkRBQW9CLFFBQVE7QUFBQSxJQUN6QztBQUFBLElBQ0EsU0FBUyw0QkFBYztBQUFBLEtBRXRCLEtBQUssd0JBQXdCLENBQ2hDLEdBQ0Esb0NBQUM7QUFBQSxJQUNDLFNBQVMsTUFBTTtBQUNiLGlCQUFXLDZEQUFvQixRQUFRO0FBQUEsSUFDekM7QUFBQSxJQUNBLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixLQUFLLHlCQUF5QixDQUNqQyxHQUNBLG9DQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsSUFDVCxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsS0FBSywyQkFBMkIsQ0FDbkMsQ0FDRixDQUNGLENBQ0Y7QUFFSixHQXpGOEM7IiwKICAibmFtZXMiOiBbXQp9Cg==
