var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var processSyncMessage_exports = {};
__export(processSyncMessage_exports, {
  processSyncMessage: () => processSyncMessage
});
module.exports = __toCommonJS(processSyncMessage_exports);
var import_protobuf = require("../protobuf");
var import_normalizeUuid = require("../util/normalizeUuid");
const UnidentifiedDeliveryStatus = import_protobuf.SignalService.SyncMessage.Sent.IUnidentifiedDeliveryStatus;
function processUnidentifiedDeliveryStatus(status) {
  const { destinationUuid } = status;
  return {
    ...status,
    destinationUuid: destinationUuid ? (0, import_normalizeUuid.normalizeUuid)(destinationUuid, "syncMessage.sent.unidentifiedStatus.destinationUuid") : void 0
  };
}
function processSent(sent) {
  if (!sent) {
    return void 0;
  }
  const { destinationUuid, unidentifiedStatus } = sent;
  return {
    ...sent,
    destinationUuid: destinationUuid ? (0, import_normalizeUuid.normalizeUuid)(destinationUuid, "syncMessage.sent.destinationUuid") : void 0,
    unidentifiedStatus: unidentifiedStatus ? unidentifiedStatus.map(processUnidentifiedDeliveryStatus) : void 0
  };
}
function processSyncMessage(syncMessage) {
  return {
    ...syncMessage,
    sent: processSent(syncMessage.sent)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  processSyncMessage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvY2Vzc1N5bmNNZXNzYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgeyBub3JtYWxpemVVdWlkIH0gZnJvbSAnLi4vdXRpbC9ub3JtYWxpemVVdWlkJztcbmltcG9ydCB0eXBlIHtcbiAgUHJvY2Vzc2VkVW5pZGVudGlmaWVkRGVsaXZlcnlTdGF0dXMsXG4gIFByb2Nlc3NlZFNlbnQsXG4gIFByb2Nlc3NlZFN5bmNNZXNzYWdlLFxufSBmcm9tICcuL1R5cGVzLmQnO1xuXG5pbXBvcnQgVW5pZGVudGlmaWVkRGVsaXZlcnlTdGF0dXMgPSBQcm90by5TeW5jTWVzc2FnZS5TZW50LklVbmlkZW50aWZpZWREZWxpdmVyeVN0YXR1cztcblxuZnVuY3Rpb24gcHJvY2Vzc1VuaWRlbnRpZmllZERlbGl2ZXJ5U3RhdHVzKFxuICBzdGF0dXM6IFVuaWRlbnRpZmllZERlbGl2ZXJ5U3RhdHVzXG4pOiBQcm9jZXNzZWRVbmlkZW50aWZpZWREZWxpdmVyeVN0YXR1cyB7XG4gIGNvbnN0IHsgZGVzdGluYXRpb25VdWlkIH0gPSBzdGF0dXM7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0dXMsXG5cbiAgICBkZXN0aW5hdGlvblV1aWQ6IGRlc3RpbmF0aW9uVXVpZFxuICAgICAgPyBub3JtYWxpemVVdWlkKFxuICAgICAgICAgIGRlc3RpbmF0aW9uVXVpZCxcbiAgICAgICAgICAnc3luY01lc3NhZ2Uuc2VudC51bmlkZW50aWZpZWRTdGF0dXMuZGVzdGluYXRpb25VdWlkJ1xuICAgICAgICApXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NlbnQoXG4gIHNlbnQ/OiBQcm90by5TeW5jTWVzc2FnZS5JU2VudCB8IG51bGxcbik6IFByb2Nlc3NlZFNlbnQgfCB1bmRlZmluZWQge1xuICBpZiAoIXNlbnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgeyBkZXN0aW5hdGlvblV1aWQsIHVuaWRlbnRpZmllZFN0YXR1cyB9ID0gc2VudDtcblxuICByZXR1cm4ge1xuICAgIC4uLnNlbnQsXG5cbiAgICBkZXN0aW5hdGlvblV1aWQ6IGRlc3RpbmF0aW9uVXVpZFxuICAgICAgPyBub3JtYWxpemVVdWlkKGRlc3RpbmF0aW9uVXVpZCwgJ3N5bmNNZXNzYWdlLnNlbnQuZGVzdGluYXRpb25VdWlkJylcbiAgICAgIDogdW5kZWZpbmVkLFxuXG4gICAgdW5pZGVudGlmaWVkU3RhdHVzOiB1bmlkZW50aWZpZWRTdGF0dXNcbiAgICAgID8gdW5pZGVudGlmaWVkU3RhdHVzLm1hcChwcm9jZXNzVW5pZGVudGlmaWVkRGVsaXZlcnlTdGF0dXMpXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NTeW5jTWVzc2FnZShcbiAgc3luY01lc3NhZ2U6IFByb3RvLklTeW5jTWVzc2FnZVxuKTogUHJvY2Vzc2VkU3luY01lc3NhZ2Uge1xuICByZXR1cm4ge1xuICAgIC4uLnN5bmNNZXNzYWdlLFxuICAgIHNlbnQ6IHByb2Nlc3NTZW50KHN5bmNNZXNzYWdlLnNlbnQpLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUF1QztBQUN2QywyQkFBOEI7QUFPOUIsTUFBTyw2QkFBNkIsOEJBQU0sWUFBWSxLQUFLO0FBRTNELDJDQUNFLFFBQ3FDO0FBQ3JDLFFBQU0sRUFBRSxvQkFBb0I7QUFFNUIsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUVILGlCQUFpQixrQkFDYix3Q0FDRSxpQkFDQSxxREFDRixJQUNBO0FBQUEsRUFDTjtBQUNGO0FBZlMsQUFpQlQscUJBQ0UsTUFDMkI7QUFDM0IsTUFBSSxDQUFDLE1BQU07QUFDVCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxpQkFBaUIsdUJBQXVCO0FBRWhELFNBQU87QUFBQSxPQUNGO0FBQUEsSUFFSCxpQkFBaUIsa0JBQ2Isd0NBQWMsaUJBQWlCLGtDQUFrQyxJQUNqRTtBQUFBLElBRUosb0JBQW9CLHFCQUNoQixtQkFBbUIsSUFBSSxpQ0FBaUMsSUFDeEQ7QUFBQSxFQUNOO0FBQ0Y7QUFwQlMsQUFzQkYsNEJBQ0wsYUFDc0I7QUFDdEIsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUNILE1BQU0sWUFBWSxZQUFZLElBQUk7QUFBQSxFQUNwQztBQUNGO0FBUGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
