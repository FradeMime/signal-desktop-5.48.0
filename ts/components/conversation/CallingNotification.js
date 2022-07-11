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
var CallingNotification_exports = {};
__export(CallingNotification_exports, {
  CallingNotification: () => CallingNotification
});
module.exports = __toCommonJS(CallingNotification_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_SystemMessage = require("./SystemMessage");
var import_Button = require("../Button");
var import_MessageTimestamp = require("./MessageTimestamp");
var import_Calling = require("../../types/Calling");
var import_callingNotification = require("../../util/callingNotification");
var import_missingCaseError = require("../../util/missingCaseError");
var import_Tooltip = require("../Tooltip");
var log = __toESM(require("../../logging/log"));
const CallingNotification = import_react.default.memo((props) => {
  const { i18n } = props;
  let timestamp;
  let wasMissed = false;
  switch (props.callMode) {
    case import_Calling.CallMode.Direct:
      timestamp = props.acceptedTime || props.endedTime;
      wasMissed = props.wasIncoming && !props.acceptedTime && !props.wasDeclined;
      break;
    case import_Calling.CallMode.Group:
      timestamp = props.startedTime;
      break;
    default:
      log.error(`CallingNotification missing case: ${(0, import_missingCaseError.missingCaseError)(props)}`);
      return null;
  }
  const icon = (0, import_callingNotification.getCallingIcon)(props);
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    button: renderCallingNotificationButton(props),
    contents: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, (0, import_callingNotification.getCallingNotificationText)(props, i18n), " \xB7", " ", /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
      direction: "outgoing",
      i18n,
      timestamp,
      withImageNoCaption: false,
      withSticker: false,
      withTapToViewExpired: false
    })),
    icon,
    isError: wasMissed
  });
});
function renderCallingNotificationButton(props) {
  const {
    activeCallConversationId,
    conversationId,
    i18n,
    isNextItemCallingNotification,
    returnToActiveCall,
    startCallingLobby
  } = props;
  if (isNextItemCallingNotification) {
    return null;
  }
  let buttonText;
  let disabledTooltipText;
  let onClick;
  switch (props.callMode) {
    case import_Calling.CallMode.Direct: {
      const { wasIncoming, wasVideoCall } = props;
      buttonText = wasIncoming ? i18n("calling__call-back") : i18n("calling__call-again");
      if (activeCallConversationId) {
        disabledTooltipText = i18n("calling__in-another-call-tooltip");
        onClick = import_lodash.noop;
      } else {
        onClick = /* @__PURE__ */ __name(() => {
          startCallingLobby({ conversationId, isVideoCall: wasVideoCall });
        }, "onClick");
      }
      break;
    }
    case import_Calling.CallMode.Group: {
      if (props.ended) {
        return null;
      }
      const { deviceCount, maxDevices } = props;
      if (activeCallConversationId) {
        if (activeCallConversationId === conversationId) {
          buttonText = i18n("calling__return");
          onClick = returnToActiveCall;
        } else {
          buttonText = i18n("calling__join");
          disabledTooltipText = i18n("calling__in-another-call-tooltip");
          onClick = import_lodash.noop;
        }
      } else if (deviceCount >= maxDevices) {
        buttonText = i18n("calling__call-is-full");
        disabledTooltipText = i18n("calling__call-notification__button__call-full-tooltip", [String(deviceCount)]);
        onClick = import_lodash.noop;
      } else {
        buttonText = i18n("calling__join");
        onClick = /* @__PURE__ */ __name(() => {
          startCallingLobby({ conversationId, isVideoCall: true });
        }, "onClick");
      }
      break;
    }
    default:
      log.error((0, import_missingCaseError.missingCaseError)(props));
      return null;
  }
  const button = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: Boolean(disabledTooltipText),
    onClick,
    size: import_Button.ButtonSize.Small,
    variant: import_Button.ButtonVariant.SystemMessage
  }, buttonText);
  if (disabledTooltipText) {
    return /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
      content: disabledTooltipText,
      direction: import_Tooltip.TooltipPlacement.Top
    }, button);
  }
  return button;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ05vdGlmaWNhdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgU3lzdGVtTWVzc2FnZSB9IGZyb20gJy4vU3lzdGVtTWVzc2FnZSc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblNpemUsIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHsgTWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4vTWVzc2FnZVRpbWVzdGFtcCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IENhbGxNb2RlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IENhbGxpbmdOb3RpZmljYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9jYWxsaW5nTm90aWZpY2F0aW9uJztcbmltcG9ydCB7XG4gIGdldENhbGxpbmdJY29uLFxuICBnZXRDYWxsaW5nTm90aWZpY2F0aW9uVGV4dCxcbn0gZnJvbSAnLi4vLi4vdXRpbC9jYWxsaW5nTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgVG9vbHRpcCwgVG9vbHRpcFBsYWNlbWVudCB9IGZyb20gJy4uL1Rvb2x0aXAnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHNBY3Rpb25zVHlwZSA9IHtcbiAgcmV0dXJuVG9BY3RpdmVDYWxsOiAoKSA9PiB2b2lkO1xuICBzdGFydENhbGxpbmdMb2JieTogKF86IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIGlzVmlkZW9DYWxsOiBib29sZWFuO1xuICB9KSA9PiB2b2lkO1xufTtcblxudHlwZSBQcm9wc0hvdXNla2VlcGluZyA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNOZXh0SXRlbUNhbGxpbmdOb3RpZmljYXRpb246IGJvb2xlYW47XG59O1xuXG50eXBlIFByb3BzVHlwZSA9IENhbGxpbmdOb3RpZmljYXRpb25UeXBlICYgUHJvcHNBY3Rpb25zVHlwZSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY29uc3QgQ2FsbGluZ05vdGlmaWNhdGlvbjogUmVhY3QuRkM8UHJvcHNUeXBlPiA9IFJlYWN0Lm1lbW8ocHJvcHMgPT4ge1xuICBjb25zdCB7IGkxOG4gfSA9IHByb3BzO1xuXG4gIGxldCB0aW1lc3RhbXA6IG51bWJlcjtcbiAgbGV0IHdhc01pc3NlZCA9IGZhbHNlO1xuICBzd2l0Y2ggKHByb3BzLmNhbGxNb2RlKSB7XG4gICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICB0aW1lc3RhbXAgPSBwcm9wcy5hY2NlcHRlZFRpbWUgfHwgcHJvcHMuZW5kZWRUaW1lO1xuICAgICAgd2FzTWlzc2VkID1cbiAgICAgICAgcHJvcHMud2FzSW5jb21pbmcgJiYgIXByb3BzLmFjY2VwdGVkVGltZSAmJiAhcHJvcHMud2FzRGVjbGluZWQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIENhbGxNb2RlLkdyb3VwOlxuICAgICAgdGltZXN0YW1wID0gcHJvcHMuc3RhcnRlZFRpbWU7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nLmVycm9yKGBDYWxsaW5nTm90aWZpY2F0aW9uIG1pc3NpbmcgY2FzZTogJHttaXNzaW5nQ2FzZUVycm9yKHByb3BzKX1gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgaWNvbiA9IGdldENhbGxpbmdJY29uKHByb3BzKTtcblxuICByZXR1cm4gKFxuICAgIDxTeXN0ZW1NZXNzYWdlXG4gICAgICBidXR0b249e3JlbmRlckNhbGxpbmdOb3RpZmljYXRpb25CdXR0b24ocHJvcHMpfVxuICAgICAgY29udGVudHM9e1xuICAgICAgICA8PlxuICAgICAgICAgIHtnZXRDYWxsaW5nTm90aWZpY2F0aW9uVGV4dChwcm9wcywgaTE4bil9ICZtaWRkb3Q7eycgJ31cbiAgICAgICAgICA8TWVzc2FnZVRpbWVzdGFtcFxuICAgICAgICAgICAgZGlyZWN0aW9uPVwib3V0Z29pbmdcIlxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHRpbWVzdGFtcD17dGltZXN0YW1wfVxuICAgICAgICAgICAgd2l0aEltYWdlTm9DYXB0aW9uPXtmYWxzZX1cbiAgICAgICAgICAgIHdpdGhTdGlja2VyPXtmYWxzZX1cbiAgICAgICAgICAgIHdpdGhUYXBUb1ZpZXdFeHBpcmVkPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgIH1cbiAgICAgIGljb249e2ljb259XG4gICAgICBpc0Vycm9yPXt3YXNNaXNzZWR9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5mdW5jdGlvbiByZW5kZXJDYWxsaW5nTm90aWZpY2F0aW9uQnV0dG9uKFxuICBwcm9wczogUmVhZG9ubHk8UHJvcHNUeXBlPlxuKTogUmVhY3ROb2RlIHtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZUNhbGxDb252ZXJzYXRpb25JZCxcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICBpMThuLFxuICAgIGlzTmV4dEl0ZW1DYWxsaW5nTm90aWZpY2F0aW9uLFxuICAgIHJldHVyblRvQWN0aXZlQ2FsbCxcbiAgICBzdGFydENhbGxpbmdMb2JieSxcbiAgfSA9IHByb3BzO1xuXG4gIGlmIChpc05leHRJdGVtQ2FsbGluZ05vdGlmaWNhdGlvbikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IGJ1dHRvblRleHQ6IHN0cmluZztcbiAgbGV0IGRpc2FibGVkVG9vbHRpcFRleHQ6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgbGV0IG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG5cbiAgc3dpdGNoIChwcm9wcy5jYWxsTW9kZSkge1xuICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OiB7XG4gICAgICBjb25zdCB7IHdhc0luY29taW5nLCB3YXNWaWRlb0NhbGwgfSA9IHByb3BzO1xuICAgICAgYnV0dG9uVGV4dCA9IHdhc0luY29taW5nXG4gICAgICAgID8gaTE4bignY2FsbGluZ19fY2FsbC1iYWNrJylcbiAgICAgICAgOiBpMThuKCdjYWxsaW5nX19jYWxsLWFnYWluJyk7XG4gICAgICBpZiAoYWN0aXZlQ2FsbENvbnZlcnNhdGlvbklkKSB7XG4gICAgICAgIGRpc2FibGVkVG9vbHRpcFRleHQgPSBpMThuKCdjYWxsaW5nX19pbi1hbm90aGVyLWNhbGwtdG9vbHRpcCcpO1xuICAgICAgICBvbkNsaWNrID0gbm9vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgc3RhcnRDYWxsaW5nTG9iYnkoeyBjb252ZXJzYXRpb25JZCwgaXNWaWRlb0NhbGw6IHdhc1ZpZGVvQ2FsbCB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIENhbGxNb2RlLkdyb3VwOiB7XG4gICAgICBpZiAocHJvcHMuZW5kZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGRldmljZUNvdW50LCBtYXhEZXZpY2VzIH0gPSBwcm9wcztcbiAgICAgIGlmIChhY3RpdmVDYWxsQ29udmVyc2F0aW9uSWQpIHtcbiAgICAgICAgaWYgKGFjdGl2ZUNhbGxDb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uSWQpIHtcbiAgICAgICAgICBidXR0b25UZXh0ID0gaTE4bignY2FsbGluZ19fcmV0dXJuJyk7XG4gICAgICAgICAgb25DbGljayA9IHJldHVyblRvQWN0aXZlQ2FsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidXR0b25UZXh0ID0gaTE4bignY2FsbGluZ19fam9pbicpO1xuICAgICAgICAgIGRpc2FibGVkVG9vbHRpcFRleHQgPSBpMThuKCdjYWxsaW5nX19pbi1hbm90aGVyLWNhbGwtdG9vbHRpcCcpO1xuICAgICAgICAgIG9uQ2xpY2sgPSBub29wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRldmljZUNvdW50ID49IG1heERldmljZXMpIHtcbiAgICAgICAgYnV0dG9uVGV4dCA9IGkxOG4oJ2NhbGxpbmdfX2NhbGwtaXMtZnVsbCcpO1xuICAgICAgICBkaXNhYmxlZFRvb2x0aXBUZXh0ID0gaTE4bihcbiAgICAgICAgICAnY2FsbGluZ19fY2FsbC1ub3RpZmljYXRpb25fX2J1dHRvbl9fY2FsbC1mdWxsLXRvb2x0aXAnLFxuICAgICAgICAgIFtTdHJpbmcoZGV2aWNlQ291bnQpXVxuICAgICAgICApO1xuICAgICAgICBvbkNsaWNrID0gbm9vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvblRleHQgPSBpMThuKCdjYWxsaW5nX19qb2luJyk7XG4gICAgICAgIG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgc3RhcnRDYWxsaW5nTG9iYnkoeyBjb252ZXJzYXRpb25JZCwgaXNWaWRlb0NhbGw6IHRydWUgfSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZy5lcnJvcihtaXNzaW5nQ2FzZUVycm9yKHByb3BzKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGJ1dHRvbiA9IChcbiAgICA8QnV0dG9uXG4gICAgICBkaXNhYmxlZD17Qm9vbGVhbihkaXNhYmxlZFRvb2x0aXBUZXh0KX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBzaXplPXtCdXR0b25TaXplLlNtYWxsfVxuICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TeXN0ZW1NZXNzYWdlfVxuICAgID5cbiAgICAgIHtidXR0b25UZXh0fVxuICAgIDwvQnV0dG9uPlxuICApO1xuXG4gIGlmIChkaXNhYmxlZFRvb2x0aXBUZXh0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUb29sdGlwIGNvbnRlbnQ9e2Rpc2FibGVkVG9vbHRpcFRleHR9IGRpcmVjdGlvbj17VG9vbHRpcFBsYWNlbWVudC5Ub3B9PlxuICAgICAgICB7YnV0dG9ufVxuICAgICAgPC9Ub29sdGlwPlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGJ1dHRvbjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsb0JBQXFCO0FBRXJCLDJCQUE4QjtBQUM5QixvQkFBa0Q7QUFDbEQsOEJBQWlDO0FBRWpDLHFCQUF5QjtBQUV6QixpQ0FHTztBQUNQLDhCQUFpQztBQUNqQyxxQkFBMEM7QUFDMUMsVUFBcUI7QUFrQmQsTUFBTSxzQkFBMkMscUJBQU0sS0FBSyxXQUFTO0FBQzFFLFFBQU0sRUFBRSxTQUFTO0FBRWpCLE1BQUk7QUFDSixNQUFJLFlBQVk7QUFDaEIsVUFBUSxNQUFNO0FBQUEsU0FDUCx3QkFBUztBQUNaLGtCQUFZLE1BQU0sZ0JBQWdCLE1BQU07QUFDeEMsa0JBQ0UsTUFBTSxlQUFlLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxNQUFNO0FBQ3JEO0FBQUEsU0FDRyx3QkFBUztBQUNaLGtCQUFZLE1BQU07QUFDbEI7QUFBQTtBQUVBLFVBQUksTUFBTSxxQ0FBcUMsOENBQWlCLEtBQUssR0FBRztBQUN4RSxhQUFPO0FBQUE7QUFHWCxRQUFNLE9BQU8sK0NBQWUsS0FBSztBQUVqQyxTQUNFLG1EQUFDO0FBQUEsSUFDQyxRQUFRLGdDQUFnQyxLQUFLO0FBQUEsSUFDN0MsVUFDRSx3RkFDRywyREFBMkIsT0FBTyxJQUFJLEdBQUUsU0FBVSxLQUNuRCxtREFBQztBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsTUFDQSxvQkFBb0I7QUFBQSxNQUNwQixhQUFhO0FBQUEsTUFDYixzQkFBc0I7QUFBQSxLQUN4QixDQUNGO0FBQUEsSUFFRjtBQUFBLElBQ0EsU0FBUztBQUFBLEdBQ1g7QUFFSixDQUFDO0FBRUQseUNBQ0UsT0FDVztBQUNYLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBRUosTUFBSSwrQkFBK0I7QUFDakMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFFSixVQUFRLE1BQU07QUFBQSxTQUNQLHdCQUFTLFFBQVE7QUFDcEIsWUFBTSxFQUFFLGFBQWEsaUJBQWlCO0FBQ3RDLG1CQUFhLGNBQ1QsS0FBSyxvQkFBb0IsSUFDekIsS0FBSyxxQkFBcUI7QUFDOUIsVUFBSSwwQkFBMEI7QUFDNUIsOEJBQXNCLEtBQUssa0NBQWtDO0FBQzdELGtCQUFVO0FBQUEsTUFDWixPQUFPO0FBQ0wsa0JBQVUsNkJBQU07QUFDZCw0QkFBa0IsRUFBRSxnQkFBZ0IsYUFBYSxhQUFhLENBQUM7QUFBQSxRQUNqRSxHQUZVO0FBQUEsTUFHWjtBQUNBO0FBQUEsSUFDRjtBQUFBLFNBQ0ssd0JBQVMsT0FBTztBQUNuQixVQUFJLE1BQU0sT0FBTztBQUNmLGVBQU87QUFBQSxNQUNUO0FBQ0EsWUFBTSxFQUFFLGFBQWEsZUFBZTtBQUNwQyxVQUFJLDBCQUEwQjtBQUM1QixZQUFJLDZCQUE2QixnQkFBZ0I7QUFDL0MsdUJBQWEsS0FBSyxpQkFBaUI7QUFDbkMsb0JBQVU7QUFBQSxRQUNaLE9BQU87QUFDTCx1QkFBYSxLQUFLLGVBQWU7QUFDakMsZ0NBQXNCLEtBQUssa0NBQWtDO0FBQzdELG9CQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0YsV0FBVyxlQUFlLFlBQVk7QUFDcEMscUJBQWEsS0FBSyx1QkFBdUI7QUFDekMsOEJBQXNCLEtBQ3BCLHlEQUNBLENBQUMsT0FBTyxXQUFXLENBQUMsQ0FDdEI7QUFDQSxrQkFBVTtBQUFBLE1BQ1osT0FBTztBQUNMLHFCQUFhLEtBQUssZUFBZTtBQUNqQyxrQkFBVSw2QkFBTTtBQUNkLDRCQUFrQixFQUFFLGdCQUFnQixhQUFhLEtBQUssQ0FBQztBQUFBLFFBQ3pELEdBRlU7QUFBQSxNQUdaO0FBQ0E7QUFBQSxJQUNGO0FBQUE7QUFFRSxVQUFJLE1BQU0sOENBQWlCLEtBQUssQ0FBQztBQUNqQyxhQUFPO0FBQUE7QUFHWCxRQUFNLFNBQ0osbURBQUM7QUFBQSxJQUNDLFVBQVUsUUFBUSxtQkFBbUI7QUFBQSxJQUNyQztBQUFBLElBQ0EsTUFBTSx5QkFBVztBQUFBLElBQ2pCLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixVQUNIO0FBR0YsTUFBSSxxQkFBcUI7QUFDdkIsV0FDRSxtREFBQztBQUFBLE1BQVEsU0FBUztBQUFBLE1BQXFCLFdBQVcsZ0NBQWlCO0FBQUEsT0FDaEUsTUFDSDtBQUFBLEVBRUo7QUFDQSxTQUFPO0FBQ1Q7QUF6RlMiLAogICJuYW1lcyI6IFtdCn0K
