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
var MessageRequestActions_exports = {};
__export(MessageRequestActions_exports, {
  MessageRequestActions: () => MessageRequestActions
});
module.exports = __toCommonJS(MessageRequestActions_exports);
var React = __toESM(require("react"));
var import_ContactName = require("./ContactName");
var import_Button = require("../Button");
var import_MessageRequestActionsConfirmation = require("./MessageRequestActionsConfirmation");
var import_Intl = require("../Intl");
const MessageRequestActions = /* @__PURE__ */ __name(({
  conversationType,
  firstName,
  i18n,
  isBlocked,
  onAccept,
  onBlock,
  onBlockAndReportSpam,
  onDelete,
  onUnblock,
  title
}) => {
  const [mrState, setMrState] = React.useState(import_MessageRequestActionsConfirmation.MessageRequestState.default);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, mrState !== import_MessageRequestActionsConfirmation.MessageRequestState.default ? /* @__PURE__ */ React.createElement(import_MessageRequestActionsConfirmation.MessageRequestActionsConfirmation, {
    i18n,
    onBlock,
    onBlockAndReportSpam,
    onUnblock,
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
    id: `MessageRequests--message-${conversationType}${isBlocked ? "-blocked" : ""}`,
    components: [
      /* @__PURE__ */ React.createElement("strong", {
        key: "name",
        className: "module-message-request-actions__message__name"
      }, /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
        firstName,
        title,
        preferFirstName: true
      }))
    ]
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-message-request-actions__buttons"
  }, /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: () => {
      setMrState(import_MessageRequestActionsConfirmation.MessageRequestState.deleting);
    },
    variant: import_Button.ButtonVariant.SecondaryDestructive
  }, i18n("MessageRequests--delete")), isBlocked ? /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: () => {
      setMrState(import_MessageRequestActionsConfirmation.MessageRequestState.unblocking);
    },
    variant: import_Button.ButtonVariant.SecondaryAffirmative
  }, i18n("MessageRequests--unblock")) : /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: () => {
      setMrState(import_MessageRequestActionsConfirmation.MessageRequestState.blocking);
    },
    variant: import_Button.ButtonVariant.SecondaryDestructive
  }, i18n("MessageRequests--block")), !isBlocked ? /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: onAccept,
    variant: import_Button.ButtonVariant.SecondaryAffirmative
  }, i18n("MessageRequests--accept")) : null)));
}, "MessageRequestActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageRequestActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlcXVlc3RBY3Rpb25zLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIGFzIENvbnRhY3ROYW1lUHJvcHMgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBNZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb25Qcm9wcyB9IGZyb20gJy4vTWVzc2FnZVJlcXVlc3RBY3Rpb25zQ29uZmlybWF0aW9uJztcbmltcG9ydCB7XG4gIE1lc3NhZ2VSZXF1ZXN0QWN0aW9uc0NvbmZpcm1hdGlvbixcbiAgTWVzc2FnZVJlcXVlc3RTdGF0ZSxcbn0gZnJvbSAnLi9NZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb24nO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkFjY2VwdCgpOiB1bmtub3duO1xufSAmIE9taXQ8Q29udGFjdE5hbWVQcm9wcywgJ21vZHVsZSc+ICZcbiAgT21pdDxcbiAgICBNZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb25Qcm9wcyxcbiAgICAnaTE4bicgfCAnc3RhdGUnIHwgJ29uQ2hhbmdlU3RhdGUnXG4gID47XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlUmVxdWVzdEFjdGlvbnMgPSAoe1xuICBjb252ZXJzYXRpb25UeXBlLFxuICBmaXJzdE5hbWUsXG4gIGkxOG4sXG4gIGlzQmxvY2tlZCxcbiAgb25BY2NlcHQsXG4gIG9uQmxvY2ssXG4gIG9uQmxvY2tBbmRSZXBvcnRTcGFtLFxuICBvbkRlbGV0ZSxcbiAgb25VbmJsb2NrLFxuICB0aXRsZSxcbn06IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbbXJTdGF0ZSwgc2V0TXJTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZShNZXNzYWdlUmVxdWVzdFN0YXRlLmRlZmF1bHQpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHttclN0YXRlICE9PSBNZXNzYWdlUmVxdWVzdFN0YXRlLmRlZmF1bHQgPyAoXG4gICAgICAgIDxNZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb25cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQmxvY2s9e29uQmxvY2t9XG4gICAgICAgICAgb25CbG9ja0FuZFJlcG9ydFNwYW09e29uQmxvY2tBbmRSZXBvcnRTcGFtfVxuICAgICAgICAgIG9uVW5ibG9jaz17b25VbmJsb2NrfVxuICAgICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZX1cbiAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgY29udmVyc2F0aW9uVHlwZT17Y29udmVyc2F0aW9uVHlwZX1cbiAgICAgICAgICBzdGF0ZT17bXJTdGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZVN0YXRlPXtzZXRNclN0YXRlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLXJlcXVlc3QtYWN0aW9uc1wiPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1yZXF1ZXN0LWFjdGlvbnNfX21lc3NhZ2VcIj5cbiAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlkPXtgTWVzc2FnZVJlcXVlc3RzLS1tZXNzYWdlLSR7Y29udmVyc2F0aW9uVHlwZX0ke1xuICAgICAgICAgICAgICBpc0Jsb2NrZWQgPyAnLWJsb2NrZWQnIDogJydcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgY29tcG9uZW50cz17W1xuICAgICAgICAgICAgICA8c3Ryb25nXG4gICAgICAgICAgICAgICAga2V5PVwibmFtZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtcmVxdWVzdC1hY3Rpb25zX19tZXNzYWdlX19uYW1lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxDb250YWN0TmFtZVxuICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lPXtmaXJzdE5hbWV9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICBwcmVmZXJGaXJzdE5hbWVcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3N0cm9uZz4sXG4gICAgICAgICAgICBdfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1yZXF1ZXN0LWFjdGlvbnNfX2J1dHRvbnNcIj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldE1yU3RhdGUoTWVzc2FnZVJlcXVlc3RTdGF0ZS5kZWxldGluZyk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnlEZXN0cnVjdGl2ZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignTWVzc2FnZVJlcXVlc3RzLS1kZWxldGUnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7aXNCbG9ja2VkID8gKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0TXJTdGF0ZShNZXNzYWdlUmVxdWVzdFN0YXRlLnVuYmxvY2tpbmcpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeUFmZmlybWF0aXZlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aTE4bignTWVzc2FnZVJlcXVlc3RzLS11bmJsb2NrJyl9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0TXJTdGF0ZShNZXNzYWdlUmVxdWVzdFN0YXRlLmJsb2NraW5nKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnlEZXN0cnVjdGl2ZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2kxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tYmxvY2snKX1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyFpc0Jsb2NrZWQgPyAoXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQWNjZXB0fVxuICAgICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeUFmZmlybWF0aXZlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aTE4bignTWVzc2FnZVJlcXVlc3RzLS1hY2NlcHQnKX1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix5QkFBNEI7QUFDNUIsb0JBQXNDO0FBRXRDLCtDQUdPO0FBQ1Asa0JBQXFCO0FBWWQsTUFBTSx3QkFBd0Isd0JBQUM7QUFBQSxFQUNwQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ3dCO0FBQ3hCLFFBQU0sQ0FBQyxTQUFTLGNBQWMsTUFBTSxTQUFTLDZEQUFvQixPQUFPO0FBRXhFLFNBQ0UsMERBQ0csWUFBWSw2REFBb0IsVUFDL0Isb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsR0FDakIsSUFDRSxNQUNKLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixvQ0FBQztBQUFBLElBQUUsV0FBVTtBQUFBLEtBQ1gsb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxJQUFJLDRCQUE0QixtQkFDOUIsWUFBWSxhQUFhO0FBQUEsSUFFM0IsWUFBWTtBQUFBLE1BQ1Ysb0NBQUM7QUFBQSxRQUNDLEtBQUk7QUFBQSxRQUNKLFdBQVU7QUFBQSxTQUVWLG9DQUFDO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLGlCQUFlO0FBQUEsT0FDakIsQ0FDRjtBQUFBLElBQ0Y7QUFBQSxHQUNGLENBQ0YsR0FDQSxvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUNDLFNBQVMsTUFBTTtBQUNiLGlCQUFXLDZEQUFvQixRQUFRO0FBQUEsSUFDekM7QUFBQSxJQUNBLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixLQUFLLHlCQUF5QixDQUNqQyxHQUNDLFlBQ0Msb0NBQUM7QUFBQSxJQUNDLFNBQVMsTUFBTTtBQUNiLGlCQUFXLDZEQUFvQixVQUFVO0FBQUEsSUFDM0M7QUFBQSxJQUNBLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixLQUFLLDBCQUEwQixDQUNsQyxJQUVBLG9DQUFDO0FBQUEsSUFDQyxTQUFTLE1BQU07QUFDYixpQkFBVyw2REFBb0IsUUFBUTtBQUFBLElBQ3pDO0FBQUEsSUFDQSxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsS0FBSyx3QkFBd0IsQ0FDaEMsR0FFRCxDQUFDLFlBQ0Esb0NBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxJQUNULFNBQVMsNEJBQWM7QUFBQSxLQUV0QixLQUFLLHlCQUF5QixDQUNqQyxJQUNFLElBQ04sQ0FDRixDQUNGO0FBRUosR0ExRnFDOyIsCiAgIm5hbWVzIjogW10KfQo=
