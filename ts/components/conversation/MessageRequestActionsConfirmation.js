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
var MessageRequestActionsConfirmation_exports = {};
__export(MessageRequestActionsConfirmation_exports, {
  MessageRequestActionsConfirmation: () => MessageRequestActionsConfirmation,
  MessageRequestState: () => MessageRequestState
});
module.exports = __toCommonJS(MessageRequestActionsConfirmation_exports);
var React = __toESM(require("react"));
var import_ContactName = require("./ContactName");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_Intl = require("../Intl");
var MessageRequestState = /* @__PURE__ */ ((MessageRequestState2) => {
  MessageRequestState2[MessageRequestState2["blocking"] = 0] = "blocking";
  MessageRequestState2[MessageRequestState2["deleting"] = 1] = "deleting";
  MessageRequestState2[MessageRequestState2["unblocking"] = 2] = "unblocking";
  MessageRequestState2[MessageRequestState2["default"] = 3] = "default";
  return MessageRequestState2;
})(MessageRequestState || {});
const MessageRequestActionsConfirmation = /* @__PURE__ */ __name(({
  conversationType,
  i18n,
  onBlock,
  onBlockAndReportSpam,
  onChangeState,
  onDelete,
  onUnblock,
  state,
  title
}) => {
  if (state === 0 /* blocking */) {
    return /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      i18n,
      onClose: () => {
        onChangeState(3 /* default */);
      },
      title: /* @__PURE__ */ React.createElement(import_Intl.Intl, {
        i18n,
        id: `MessageRequests--block-${conversationType}-confirm-title`,
        components: [/* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
          key: "name",
          title
        })]
      }),
      actions: [
        ...conversationType === "direct" ? [
          {
            text: i18n("MessageRequests--block-and-report-spam"),
            action: onBlockAndReportSpam,
            style: "negative"
          }
        ] : [],
        {
          text: i18n("MessageRequests--block"),
          action: onBlock,
          style: "negative"
        }
      ]
    }, i18n(`MessageRequests--block-${conversationType}-confirm-body`));
  }
  if (state === 2 /* unblocking */) {
    return /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      i18n,
      onClose: () => {
        onChangeState(3 /* default */);
      },
      title: /* @__PURE__ */ React.createElement(import_Intl.Intl, {
        i18n,
        id: "MessageRequests--unblock-confirm-title",
        components: [/* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
          key: "name",
          title
        })]
      }),
      actions: [
        {
          text: i18n("MessageRequests--unblock"),
          action: onUnblock,
          style: "affirmative"
        }
      ]
    }, i18n(`MessageRequests--unblock-${conversationType}-confirm-body`));
  }
  if (state === 1 /* deleting */) {
    return /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      i18n,
      onClose: () => {
        onChangeState(3 /* default */);
      },
      title: /* @__PURE__ */ React.createElement(import_Intl.Intl, {
        i18n,
        id: `MessageRequests--delete-${conversationType}-confirm-title`,
        components: [/* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
          key: "name",
          title
        })]
      }),
      actions: [
        {
          text: i18n(`MessageRequests--delete-${conversationType}`),
          action: onDelete,
          style: "negative"
        }
      ]
    }, i18n(`MessageRequests--delete-${conversationType}-confirm-body`));
  }
  return null;
}, "MessageRequestActionsConfirmation");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageRequestActionsConfirmation,
  MessageRequestState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlcXVlc3RBY3Rpb25zQ29uZmlybWF0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIGFzIENvbnRhY3ROYW1lUHJvcHMgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuLi9Db25maXJtYXRpb25EaWFsb2cnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCBlbnVtIE1lc3NhZ2VSZXF1ZXN0U3RhdGUge1xuICBibG9ja2luZyxcbiAgZGVsZXRpbmcsXG4gIHVuYmxvY2tpbmcsXG4gIGRlZmF1bHQsXG59XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnIHwgJ2RpcmVjdCc7XG4gIGlzQmxvY2tlZD86IGJvb2xlYW47XG4gIG9uQmxvY2soKTogdW5rbm93bjtcbiAgb25CbG9ja0FuZFJlcG9ydFNwYW0oKTogdW5rbm93bjtcbiAgb25VbmJsb2NrKCk6IHVua25vd247XG4gIG9uRGVsZXRlKCk6IHVua25vd247XG4gIHN0YXRlOiBNZXNzYWdlUmVxdWVzdFN0YXRlO1xuICBvbkNoYW5nZVN0YXRlKHN0YXRlOiBNZXNzYWdlUmVxdWVzdFN0YXRlKTogdW5rbm93bjtcbn0gJiBPbWl0PENvbnRhY3ROYW1lUHJvcHMsICdtb2R1bGUnPjtcblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VSZXF1ZXN0QWN0aW9uc0NvbmZpcm1hdGlvbiA9ICh7XG4gIGNvbnZlcnNhdGlvblR5cGUsXG4gIGkxOG4sXG4gIG9uQmxvY2ssXG4gIG9uQmxvY2tBbmRSZXBvcnRTcGFtLFxuICBvbkNoYW5nZVN0YXRlLFxuICBvbkRlbGV0ZSxcbiAgb25VbmJsb2NrLFxuICBzdGF0ZSxcbiAgdGl0bGUsXG59OiBQcm9wcyk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGlmIChzdGF0ZSA9PT0gTWVzc2FnZVJlcXVlc3RTdGF0ZS5ibG9ja2luZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICBvbkNoYW5nZVN0YXRlKE1lc3NhZ2VSZXF1ZXN0U3RhdGUuZGVmYXVsdCk7XG4gICAgICAgIH19XG4gICAgICAgIHRpdGxlPXtcbiAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlkPXtgTWVzc2FnZVJlcXVlc3RzLS1ibG9jay0ke2NvbnZlcnNhdGlvblR5cGV9LWNvbmZpcm0tdGl0bGVgfVxuICAgICAgICAgICAgY29tcG9uZW50cz17WzxDb250YWN0TmFtZSBrZXk9XCJuYW1lXCIgdGl0bGU9e3RpdGxlfSAvPl19XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgLi4uKGNvbnZlcnNhdGlvblR5cGUgPT09ICdkaXJlY3QnXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWJsb2NrLWFuZC1yZXBvcnQtc3BhbScpLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uOiBvbkJsb2NrQW5kUmVwb3J0U3BhbSxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiAnbmVnYXRpdmUnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW10pLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGkxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tYmxvY2snKSxcbiAgICAgICAgICAgIGFjdGlvbjogb25CbG9jayxcbiAgICAgICAgICAgIHN0eWxlOiAnbmVnYXRpdmUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHtpMThuKGBNZXNzYWdlUmVxdWVzdHMtLWJsb2NrLSR7Y29udmVyc2F0aW9uVHlwZX0tY29uZmlybS1ib2R5YCl9XG4gICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHN0YXRlID09PSBNZXNzYWdlUmVxdWVzdFN0YXRlLnVuYmxvY2tpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgb25DaGFuZ2VTdGF0ZShNZXNzYWdlUmVxdWVzdFN0YXRlLmRlZmF1bHQpO1xuICAgICAgICB9fVxuICAgICAgICB0aXRsZT17XG4gICAgICAgICAgPEludGxcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpZD1cIk1lc3NhZ2VSZXF1ZXN0cy0tdW5ibG9jay1jb25maXJtLXRpdGxlXCJcbiAgICAgICAgICAgIGNvbXBvbmVudHM9e1s8Q29udGFjdE5hbWUga2V5PVwibmFtZVwiIHRpdGxlPXt0aXRsZX0gLz5dfVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGkxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tdW5ibG9jaycpLFxuICAgICAgICAgICAgYWN0aW9uOiBvblVuYmxvY2ssXG4gICAgICAgICAgICBzdHlsZTogJ2FmZmlybWF0aXZlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdfVxuICAgICAgPlxuICAgICAgICB7aTE4bihgTWVzc2FnZVJlcXVlc3RzLS11bmJsb2NrLSR7Y29udmVyc2F0aW9uVHlwZX0tY29uZmlybS1ib2R5YCl9XG4gICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHN0YXRlID09PSBNZXNzYWdlUmVxdWVzdFN0YXRlLmRlbGV0aW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgIG9uQ2hhbmdlU3RhdGUoTWVzc2FnZVJlcXVlc3RTdGF0ZS5kZWZhdWx0KTtcbiAgICAgICAgfX1cbiAgICAgICAgdGl0bGU9e1xuICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaWQ9e2BNZXNzYWdlUmVxdWVzdHMtLWRlbGV0ZS0ke2NvbnZlcnNhdGlvblR5cGV9LWNvbmZpcm0tdGl0bGVgfVxuICAgICAgICAgICAgY29tcG9uZW50cz17WzxDb250YWN0TmFtZSBrZXk9XCJuYW1lXCIgdGl0bGU9e3RpdGxlfSAvPl19XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogaTE4bihgTWVzc2FnZVJlcXVlc3RzLS1kZWxldGUtJHtjb252ZXJzYXRpb25UeXBlfWApLFxuICAgICAgICAgICAgYWN0aW9uOiBvbkRlbGV0ZSxcbiAgICAgICAgICAgIHN0eWxlOiAnbmVnYXRpdmUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHtpMThuKGBNZXNzYWdlUmVxdWVzdHMtLWRlbGV0ZS0ke2NvbnZlcnNhdGlvblR5cGV9LWNvbmZpcm0tYm9keWApfVxuICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHlCQUE0QjtBQUM1QixnQ0FBbUM7QUFDbkMsa0JBQXFCO0FBR2QsSUFBSyxzQkFBTCxrQkFBSyx5QkFBTDtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBSlU7QUFBQTtBQW1CTCxNQUFNLG9DQUFvQyx3QkFBQztBQUFBLEVBQ2hEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUMrQjtBQUMvQixNQUFJLFVBQVUsa0JBQThCO0FBQzFDLFdBQ0Usb0NBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxTQUFTLE1BQU07QUFDYixzQkFBYyxlQUEyQjtBQUFBLE1BQzNDO0FBQUEsTUFDQSxPQUNFLG9DQUFDO0FBQUEsUUFDQztBQUFBLFFBQ0EsSUFBSSwwQkFBMEI7QUFBQSxRQUM5QixZQUFZLENBQUMsb0NBQUM7QUFBQSxVQUFZLEtBQUk7QUFBQSxVQUFPO0FBQUEsU0FBYyxDQUFFO0FBQUEsT0FDdkQ7QUFBQSxNQUVGLFNBQVM7QUFBQSxRQUNQLEdBQUkscUJBQXFCLFdBQ3JCO0FBQUEsVUFDRTtBQUFBLFlBQ0UsTUFBTSxLQUFLLHdDQUF3QztBQUFBLFlBQ25ELFFBQVE7QUFBQSxZQUNSLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRixJQUNBLENBQUM7QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNLEtBQUssd0JBQXdCO0FBQUEsVUFDbkMsUUFBUTtBQUFBLFVBQ1IsT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsT0FFQyxLQUFLLDBCQUEwQiwrQkFBK0IsQ0FDakU7QUFBQSxFQUVKO0FBRUEsTUFBSSxVQUFVLG9CQUFnQztBQUM1QyxXQUNFLG9DQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsU0FBUyxNQUFNO0FBQ2Isc0JBQWMsZUFBMkI7QUFBQSxNQUMzQztBQUFBLE1BQ0EsT0FDRSxvQ0FBQztBQUFBLFFBQ0M7QUFBQSxRQUNBLElBQUc7QUFBQSxRQUNILFlBQVksQ0FBQyxvQ0FBQztBQUFBLFVBQVksS0FBSTtBQUFBLFVBQU87QUFBQSxTQUFjLENBQUU7QUFBQSxPQUN2RDtBQUFBLE1BRUYsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLE1BQU0sS0FBSywwQkFBMEI7QUFBQSxVQUNyQyxRQUFRO0FBQUEsVUFDUixPQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxPQUVDLEtBQUssNEJBQTRCLCtCQUErQixDQUNuRTtBQUFBLEVBRUo7QUFFQSxNQUFJLFVBQVUsa0JBQThCO0FBQzFDLFdBQ0Usb0NBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxTQUFTLE1BQU07QUFDYixzQkFBYyxlQUEyQjtBQUFBLE1BQzNDO0FBQUEsTUFDQSxPQUNFLG9DQUFDO0FBQUEsUUFDQztBQUFBLFFBQ0EsSUFBSSwyQkFBMkI7QUFBQSxRQUMvQixZQUFZLENBQUMsb0NBQUM7QUFBQSxVQUFZLEtBQUk7QUFBQSxVQUFPO0FBQUEsU0FBYyxDQUFFO0FBQUEsT0FDdkQ7QUFBQSxNQUVGLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxNQUFNLEtBQUssMkJBQTJCLGtCQUFrQjtBQUFBLFVBQ3hELFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLE9BRUMsS0FBSywyQkFBMkIsK0JBQStCLENBQ2xFO0FBQUEsRUFFSjtBQUVBLFNBQU87QUFDVCxHQXRHaUQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
