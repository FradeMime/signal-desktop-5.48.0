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
var callingNotification_exports = {};
__export(callingNotification_exports, {
  getCallingIcon: () => getCallingIcon,
  getCallingNotificationText: () => getCallingNotificationText
});
module.exports = __toCommonJS(callingNotification_exports);
var import_Calling = require("../types/Calling");
var import_missingCaseError = require("./missingCaseError");
var log = __toESM(require("../logging/log"));
function getDirectCallNotificationText({
  wasIncoming,
  wasVideoCall,
  wasDeclined,
  acceptedTime
}, i18n) {
  const wasAccepted = Boolean(acceptedTime);
  if (wasIncoming) {
    if (wasDeclined) {
      if (wasVideoCall) {
        return i18n("declinedIncomingVideoCall");
      }
      return i18n("declinedIncomingAudioCall");
    }
    if (wasAccepted) {
      if (wasVideoCall) {
        return i18n("acceptedIncomingVideoCall");
      }
      return i18n("acceptedIncomingAudioCall");
    }
    if (wasVideoCall) {
      return i18n("missedIncomingVideoCall");
    }
    return i18n("missedIncomingAudioCall");
  }
  if (wasAccepted) {
    if (wasVideoCall) {
      return i18n("acceptedOutgoingVideoCall");
    }
    return i18n("acceptedOutgoingAudioCall");
  }
  if (wasVideoCall) {
    return i18n("missedOrDeclinedOutgoingVideoCall");
  }
  return i18n("missedOrDeclinedOutgoingAudioCall");
}
function getGroupCallNotificationText(notification, i18n) {
  if (notification.ended) {
    return i18n("calling__call-notification__ended");
  }
  if (!notification.creator) {
    return i18n("calling__call-notification__started-by-someone");
  }
  if (notification.creator.isMe) {
    return i18n("calling__call-notification__started-by-you");
  }
  return i18n("calling__call-notification__started", [
    notification.creator.firstName || notification.creator.title
  ]);
}
function getCallingNotificationText(notification, i18n) {
  switch (notification.callMode) {
    case import_Calling.CallMode.Direct:
      return getDirectCallNotificationText(notification, i18n);
    case import_Calling.CallMode.Group:
      return getGroupCallNotificationText(notification, i18n);
    default:
      log.error(`getCallingNotificationText: missing case ${(0, import_missingCaseError.missingCaseError)(notification)}`);
      return "";
  }
}
function getDirectCallingIcon({
  wasIncoming,
  wasVideoCall,
  acceptedTime
}) {
  const wasAccepted = Boolean(acceptedTime);
  if (wasVideoCall) {
    if (wasAccepted) {
      return wasIncoming ? "video-incoming" : "video-outgoing";
    }
    return "video-missed";
  }
  if (wasAccepted) {
    return wasIncoming ? "audio-incoming" : "audio-outgoing";
  }
  return "audio-missed";
}
function getCallingIcon(notification) {
  switch (notification.callMode) {
    case import_Calling.CallMode.Direct:
      return getDirectCallingIcon(notification);
    case import_Calling.CallMode.Group:
      return "video";
    default:
      log.error(`getCallingNotificationText: missing case ${(0, import_missingCaseError.missingCaseError)(notification)}`);
      return "phone";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCallingIcon,
  getCallingNotificationText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ05vdGlmaWNhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQ2FsbE1vZGUgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxudHlwZSBEaXJlY3RDYWxsTm90aWZpY2F0aW9uVHlwZSA9IHtcbiAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdDtcbiAgYWN0aXZlQ2FsbENvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICB3YXNJbmNvbWluZzogYm9vbGVhbjtcbiAgd2FzVmlkZW9DYWxsOiBib29sZWFuO1xuICB3YXNEZWNsaW5lZDogYm9vbGVhbjtcbiAgYWNjZXB0ZWRUaW1lPzogbnVtYmVyO1xuICBlbmRlZFRpbWU6IG51bWJlcjtcbn07XG5cbnR5cGUgR3JvdXBDYWxsTm90aWZpY2F0aW9uVHlwZSA9IHtcbiAgYWN0aXZlQ2FsbENvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXA7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGNyZWF0b3I/OiB7XG4gICAgZmlyc3ROYW1lPzogc3RyaW5nO1xuICAgIGlzTWU/OiBib29sZWFuO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gIH07XG4gIGVuZGVkOiBib29sZWFuO1xuICBkZXZpY2VDb3VudDogbnVtYmVyO1xuICBtYXhEZXZpY2VzOiBudW1iZXI7XG4gIHN0YXJ0ZWRUaW1lOiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBDYWxsaW5nTm90aWZpY2F0aW9uVHlwZSA9XG4gIHwgRGlyZWN0Q2FsbE5vdGlmaWNhdGlvblR5cGVcbiAgfCBHcm91cENhbGxOb3RpZmljYXRpb25UeXBlO1xuXG5mdW5jdGlvbiBnZXREaXJlY3RDYWxsTm90aWZpY2F0aW9uVGV4dChcbiAge1xuICAgIHdhc0luY29taW5nLFxuICAgIHdhc1ZpZGVvQ2FsbCxcbiAgICB3YXNEZWNsaW5lZCxcbiAgICBhY2NlcHRlZFRpbWUsXG4gIH06IERpcmVjdENhbGxOb3RpZmljYXRpb25UeXBlLFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlXG4pOiBzdHJpbmcge1xuICBjb25zdCB3YXNBY2NlcHRlZCA9IEJvb2xlYW4oYWNjZXB0ZWRUaW1lKTtcblxuICBpZiAod2FzSW5jb21pbmcpIHtcbiAgICBpZiAod2FzRGVjbGluZWQpIHtcbiAgICAgIGlmICh3YXNWaWRlb0NhbGwpIHtcbiAgICAgICAgcmV0dXJuIGkxOG4oJ2RlY2xpbmVkSW5jb21pbmdWaWRlb0NhbGwnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpMThuKCdkZWNsaW5lZEluY29taW5nQXVkaW9DYWxsJyk7XG4gICAgfVxuICAgIGlmICh3YXNBY2NlcHRlZCkge1xuICAgICAgaWYgKHdhc1ZpZGVvQ2FsbCkge1xuICAgICAgICByZXR1cm4gaTE4bignYWNjZXB0ZWRJbmNvbWluZ1ZpZGVvQ2FsbCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGkxOG4oJ2FjY2VwdGVkSW5jb21pbmdBdWRpb0NhbGwnKTtcbiAgICB9XG4gICAgaWYgKHdhc1ZpZGVvQ2FsbCkge1xuICAgICAgcmV0dXJuIGkxOG4oJ21pc3NlZEluY29taW5nVmlkZW9DYWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBpMThuKCdtaXNzZWRJbmNvbWluZ0F1ZGlvQ2FsbCcpO1xuICB9XG4gIGlmICh3YXNBY2NlcHRlZCkge1xuICAgIGlmICh3YXNWaWRlb0NhbGwpIHtcbiAgICAgIHJldHVybiBpMThuKCdhY2NlcHRlZE91dGdvaW5nVmlkZW9DYWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBpMThuKCdhY2NlcHRlZE91dGdvaW5nQXVkaW9DYWxsJyk7XG4gIH1cbiAgaWYgKHdhc1ZpZGVvQ2FsbCkge1xuICAgIHJldHVybiBpMThuKCdtaXNzZWRPckRlY2xpbmVkT3V0Z29pbmdWaWRlb0NhbGwnKTtcbiAgfVxuICByZXR1cm4gaTE4bignbWlzc2VkT3JEZWNsaW5lZE91dGdvaW5nQXVkaW9DYWxsJyk7XG59XG5cbmZ1bmN0aW9uIGdldEdyb3VwQ2FsbE5vdGlmaWNhdGlvblRleHQoXG4gIG5vdGlmaWNhdGlvbjogR3JvdXBDYWxsTm90aWZpY2F0aW9uVHlwZSxcbiAgaTE4bjogTG9jYWxpemVyVHlwZVxuKTogc3RyaW5nIHtcbiAgaWYgKG5vdGlmaWNhdGlvbi5lbmRlZCkge1xuICAgIHJldHVybiBpMThuKCdjYWxsaW5nX19jYWxsLW5vdGlmaWNhdGlvbl9fZW5kZWQnKTtcbiAgfVxuICBpZiAoIW5vdGlmaWNhdGlvbi5jcmVhdG9yKSB7XG4gICAgcmV0dXJuIGkxOG4oJ2NhbGxpbmdfX2NhbGwtbm90aWZpY2F0aW9uX19zdGFydGVkLWJ5LXNvbWVvbmUnKTtcbiAgfVxuICBpZiAobm90aWZpY2F0aW9uLmNyZWF0b3IuaXNNZSkge1xuICAgIHJldHVybiBpMThuKCdjYWxsaW5nX19jYWxsLW5vdGlmaWNhdGlvbl9fc3RhcnRlZC1ieS15b3UnKTtcbiAgfVxuICByZXR1cm4gaTE4bignY2FsbGluZ19fY2FsbC1ub3RpZmljYXRpb25fX3N0YXJ0ZWQnLCBbXG4gICAgbm90aWZpY2F0aW9uLmNyZWF0b3IuZmlyc3ROYW1lIHx8IG5vdGlmaWNhdGlvbi5jcmVhdG9yLnRpdGxlLFxuICBdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbGxpbmdOb3RpZmljYXRpb25UZXh0KFxuICBub3RpZmljYXRpb246IENhbGxpbmdOb3RpZmljYXRpb25UeXBlLFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlXG4pOiBzdHJpbmcge1xuICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi5jYWxsTW9kZSkge1xuICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OlxuICAgICAgcmV0dXJuIGdldERpcmVjdENhbGxOb3RpZmljYXRpb25UZXh0KG5vdGlmaWNhdGlvbiwgaTE4bik7XG4gICAgY2FzZSBDYWxsTW9kZS5Hcm91cDpcbiAgICAgIHJldHVybiBnZXRHcm91cENhbGxOb3RpZmljYXRpb25UZXh0KG5vdGlmaWNhdGlvbiwgaTE4bik7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYGdldENhbGxpbmdOb3RpZmljYXRpb25UZXh0OiBtaXNzaW5nIGNhc2UgJHttaXNzaW5nQ2FzZUVycm9yKFxuICAgICAgICAgIG5vdGlmaWNhdGlvblxuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxudHlwZSBDYWxsaW5nSWNvblR5cGUgPVxuICB8ICdhdWRpby1pbmNvbWluZydcbiAgfCAnYXVkaW8tbWlzc2VkJ1xuICB8ICdhdWRpby1vdXRnb2luZydcbiAgfCAncGhvbmUnXG4gIHwgJ3ZpZGVvJ1xuICB8ICd2aWRlby1pbmNvbWluZydcbiAgfCAndmlkZW8tbWlzc2VkJ1xuICB8ICd2aWRlby1vdXRnb2luZyc7XG5cbmZ1bmN0aW9uIGdldERpcmVjdENhbGxpbmdJY29uKHtcbiAgd2FzSW5jb21pbmcsXG4gIHdhc1ZpZGVvQ2FsbCxcbiAgYWNjZXB0ZWRUaW1lLFxufTogRGlyZWN0Q2FsbE5vdGlmaWNhdGlvblR5cGUpOiBDYWxsaW5nSWNvblR5cGUge1xuICBjb25zdCB3YXNBY2NlcHRlZCA9IEJvb2xlYW4oYWNjZXB0ZWRUaW1lKTtcblxuICAvLyB2aWRlb1xuICBpZiAod2FzVmlkZW9DYWxsKSB7XG4gICAgaWYgKHdhc0FjY2VwdGVkKSB7XG4gICAgICByZXR1cm4gd2FzSW5jb21pbmcgPyAndmlkZW8taW5jb21pbmcnIDogJ3ZpZGVvLW91dGdvaW5nJztcbiAgICB9XG4gICAgcmV0dXJuICd2aWRlby1taXNzZWQnO1xuICB9XG5cbiAgaWYgKHdhc0FjY2VwdGVkKSB7XG4gICAgcmV0dXJuIHdhc0luY29taW5nID8gJ2F1ZGlvLWluY29taW5nJyA6ICdhdWRpby1vdXRnb2luZyc7XG4gIH1cblxuICByZXR1cm4gJ2F1ZGlvLW1pc3NlZCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYWxsaW5nSWNvbihcbiAgbm90aWZpY2F0aW9uOiBDYWxsaW5nTm90aWZpY2F0aW9uVHlwZVxuKTogQ2FsbGluZ0ljb25UeXBlIHtcbiAgc3dpdGNoIChub3RpZmljYXRpb24uY2FsbE1vZGUpIHtcbiAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDpcbiAgICAgIHJldHVybiBnZXREaXJlY3RDYWxsaW5nSWNvbihub3RpZmljYXRpb24pO1xuICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6XG4gICAgICByZXR1cm4gJ3ZpZGVvJztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgZ2V0Q2FsbGluZ05vdGlmaWNhdGlvblRleHQ6IG1pc3NpbmcgY2FzZSAke21pc3NpbmdDYXNlRXJyb3IoXG4gICAgICAgICAgbm90aWZpY2F0aW9uXG4gICAgICAgICl9YFxuICAgICAgKTtcbiAgICAgIHJldHVybiAncGhvbmUnO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxxQkFBeUI7QUFDekIsOEJBQWlDO0FBQ2pDLFVBQXFCO0FBK0JyQix1Q0FDRTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUVGLE1BQ1E7QUFDUixRQUFNLGNBQWMsUUFBUSxZQUFZO0FBRXhDLE1BQUksYUFBYTtBQUNmLFFBQUksYUFBYTtBQUNmLFVBQUksY0FBYztBQUNoQixlQUFPLEtBQUssMkJBQTJCO0FBQUEsTUFDekM7QUFDQSxhQUFPLEtBQUssMkJBQTJCO0FBQUEsSUFDekM7QUFDQSxRQUFJLGFBQWE7QUFDZixVQUFJLGNBQWM7QUFDaEIsZUFBTyxLQUFLLDJCQUEyQjtBQUFBLE1BQ3pDO0FBQ0EsYUFBTyxLQUFLLDJCQUEyQjtBQUFBLElBQ3pDO0FBQ0EsUUFBSSxjQUFjO0FBQ2hCLGFBQU8sS0FBSyx5QkFBeUI7QUFBQSxJQUN2QztBQUNBLFdBQU8sS0FBSyx5QkFBeUI7QUFBQSxFQUN2QztBQUNBLE1BQUksYUFBYTtBQUNmLFFBQUksY0FBYztBQUNoQixhQUFPLEtBQUssMkJBQTJCO0FBQUEsSUFDekM7QUFDQSxXQUFPLEtBQUssMkJBQTJCO0FBQUEsRUFDekM7QUFDQSxNQUFJLGNBQWM7QUFDaEIsV0FBTyxLQUFLLG1DQUFtQztBQUFBLEVBQ2pEO0FBQ0EsU0FBTyxLQUFLLG1DQUFtQztBQUNqRDtBQXZDUyxBQXlDVCxzQ0FDRSxjQUNBLE1BQ1E7QUFDUixNQUFJLGFBQWEsT0FBTztBQUN0QixXQUFPLEtBQUssbUNBQW1DO0FBQUEsRUFDakQ7QUFDQSxNQUFJLENBQUMsYUFBYSxTQUFTO0FBQ3pCLFdBQU8sS0FBSyxnREFBZ0Q7QUFBQSxFQUM5RDtBQUNBLE1BQUksYUFBYSxRQUFRLE1BQU07QUFDN0IsV0FBTyxLQUFLLDRDQUE0QztBQUFBLEVBQzFEO0FBQ0EsU0FBTyxLQUFLLHVDQUF1QztBQUFBLElBQ2pELGFBQWEsUUFBUSxhQUFhLGFBQWEsUUFBUTtBQUFBLEVBQ3pELENBQUM7QUFDSDtBQWhCUyxBQWtCRixvQ0FDTCxjQUNBLE1BQ1E7QUFDUixVQUFRLGFBQWE7QUFBQSxTQUNkLHdCQUFTO0FBQ1osYUFBTyw4QkFBOEIsY0FBYyxJQUFJO0FBQUEsU0FDcEQsd0JBQVM7QUFDWixhQUFPLDZCQUE2QixjQUFjLElBQUk7QUFBQTtBQUV0RCxVQUFJLE1BQ0YsNENBQTRDLDhDQUMxQyxZQUNGLEdBQ0Y7QUFDQSxhQUFPO0FBQUE7QUFFYjtBQWpCZ0IsQUE2QmhCLDhCQUE4QjtBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUM4QztBQUM5QyxRQUFNLGNBQWMsUUFBUSxZQUFZO0FBR3hDLE1BQUksY0FBYztBQUNoQixRQUFJLGFBQWE7QUFDZixhQUFPLGNBQWMsbUJBQW1CO0FBQUEsSUFDMUM7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksYUFBYTtBQUNmLFdBQU8sY0FBYyxtQkFBbUI7QUFBQSxFQUMxQztBQUVBLFNBQU87QUFDVDtBQXBCUyxBQXNCRix3QkFDTCxjQUNpQjtBQUNqQixVQUFRLGFBQWE7QUFBQSxTQUNkLHdCQUFTO0FBQ1osYUFBTyxxQkFBcUIsWUFBWTtBQUFBLFNBQ3JDLHdCQUFTO0FBQ1osYUFBTztBQUFBO0FBRVAsVUFBSSxNQUNGLDRDQUE0Qyw4Q0FDMUMsWUFDRixHQUNGO0FBQ0EsYUFBTztBQUFBO0FBRWI7QUFoQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
