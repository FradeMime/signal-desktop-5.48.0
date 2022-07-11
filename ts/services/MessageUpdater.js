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
var MessageUpdater_exports = {};
__export(MessageUpdater_exports, {
  markRead: () => markRead,
  markViewed: () => markViewed
});
module.exports = __toCommonJS(MessageUpdater_exports);
var import_MessageReadStatus = require("../messages/MessageReadStatus");
var import_notifications = require("./notifications");
var import_MessageSeenStatus = require("../MessageSeenStatus");
function markReadOrViewed(messageAttrs, readStatus, timestamp, skipSave) {
  const oldReadStatus = messageAttrs.readStatus ?? import_MessageReadStatus.ReadStatus.Read;
  const newReadStatus = (0, import_MessageReadStatus.maxReadStatus)(oldReadStatus, readStatus);
  const nextMessageAttributes = {
    ...messageAttrs,
    readStatus: newReadStatus,
    seenStatus: import_MessageSeenStatus.SeenStatus.Seen
  };
  const { id: messageId, expireTimer, expirationStartTimestamp } = messageAttrs;
  if (expireTimer && !expirationStartTimestamp) {
    nextMessageAttributes.expirationStartTimestamp = Math.min(Date.now(), timestamp || Date.now());
  }
  import_notifications.notificationService.removeBy({ messageId });
  if (!skipSave) {
    window.Signal.Util.queueUpdateMessage(nextMessageAttributes);
  }
  return nextMessageAttributes;
}
const markRead = /* @__PURE__ */ __name((messageAttrs, readAt, { skipSave = false } = {}) => markReadOrViewed(messageAttrs, import_MessageReadStatus.ReadStatus.Read, readAt, skipSave), "markRead");
const markViewed = /* @__PURE__ */ __name((messageAttrs, viewedAt, { skipSave = false } = {}) => markReadOrViewed(messageAttrs, import_MessageReadStatus.ReadStatus.Viewed, viewedAt, skipSave), "markViewed");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  markRead,
  markViewed
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVVwZGF0ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IFJlYWRTdGF0dXMsIG1heFJlYWRTdGF0dXMgfSBmcm9tICcuLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IFNlZW5TdGF0dXMgfSBmcm9tICcuLi9NZXNzYWdlU2VlblN0YXR1cyc7XG5cbmZ1bmN0aW9uIG1hcmtSZWFkT3JWaWV3ZWQoXG4gIG1lc3NhZ2VBdHRyczogUmVhZG9ubHk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPixcbiAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkIHwgUmVhZFN0YXR1cy5WaWV3ZWQsXG4gIHRpbWVzdGFtcDogdW5kZWZpbmVkIHwgbnVtYmVyLFxuICBza2lwU2F2ZTogYm9vbGVhblxuKTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIHtcbiAgY29uc3Qgb2xkUmVhZFN0YXR1cyA9IG1lc3NhZ2VBdHRycy5yZWFkU3RhdHVzID8/IFJlYWRTdGF0dXMuUmVhZDtcbiAgY29uc3QgbmV3UmVhZFN0YXR1cyA9IG1heFJlYWRTdGF0dXMob2xkUmVhZFN0YXR1cywgcmVhZFN0YXR1cyk7XG5cbiAgY29uc3QgbmV4dE1lc3NhZ2VBdHRyaWJ1dGVzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgLi4ubWVzc2FnZUF0dHJzLFxuICAgIHJlYWRTdGF0dXM6IG5ld1JlYWRTdGF0dXMsXG4gICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5TZWVuLFxuICB9O1xuXG4gIGNvbnN0IHsgaWQ6IG1lc3NhZ2VJZCwgZXhwaXJlVGltZXIsIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCB9ID0gbWVzc2FnZUF0dHJzO1xuXG4gIGlmIChleHBpcmVUaW1lciAmJiAhZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wKSB7XG4gICAgbmV4dE1lc3NhZ2VBdHRyaWJ1dGVzLmV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCA9IE1hdGgubWluKFxuICAgICAgRGF0ZS5ub3coKSxcbiAgICAgIHRpbWVzdGFtcCB8fCBEYXRlLm5vdygpXG4gICAgKTtcbiAgfVxuXG4gIG5vdGlmaWNhdGlvblNlcnZpY2UucmVtb3ZlQnkoeyBtZXNzYWdlSWQgfSk7XG5cbiAgaWYgKCFza2lwU2F2ZSkge1xuICAgIHdpbmRvdy5TaWduYWwuVXRpbC5xdWV1ZVVwZGF0ZU1lc3NhZ2UobmV4dE1lc3NhZ2VBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHJldHVybiBuZXh0TWVzc2FnZUF0dHJpYnV0ZXM7XG59XG5cbmV4cG9ydCBjb25zdCBtYXJrUmVhZCA9IChcbiAgbWVzc2FnZUF0dHJzOiBSZWFkb25seTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+LFxuICByZWFkQXQ/OiBudW1iZXIsXG4gIHsgc2tpcFNhdmUgPSBmYWxzZSB9ID0ge31cbik6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9PlxuICBtYXJrUmVhZE9yVmlld2VkKG1lc3NhZ2VBdHRycywgUmVhZFN0YXR1cy5SZWFkLCByZWFkQXQsIHNraXBTYXZlKTtcblxuZXhwb3J0IGNvbnN0IG1hcmtWaWV3ZWQgPSAoXG4gIG1lc3NhZ2VBdHRyczogUmVhZG9ubHk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPixcbiAgdmlld2VkQXQ/OiBudW1iZXIsXG4gIHsgc2tpcFNhdmUgPSBmYWxzZSB9ID0ge31cbik6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9PlxuICBtYXJrUmVhZE9yVmlld2VkKG1lc3NhZ2VBdHRycywgUmVhZFN0YXR1cy5WaWV3ZWQsIHZpZXdlZEF0LCBza2lwU2F2ZSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSwrQkFBMEM7QUFDMUMsMkJBQW9DO0FBQ3BDLCtCQUEyQjtBQUUzQiwwQkFDRSxjQUNBLFlBQ0EsV0FDQSxVQUN1QjtBQUN2QixRQUFNLGdCQUFnQixhQUFhLGNBQWMsb0NBQVc7QUFDNUQsUUFBTSxnQkFBZ0IsNENBQWMsZUFBZSxVQUFVO0FBRTdELFFBQU0sd0JBQStDO0FBQUEsT0FDaEQ7QUFBQSxJQUNILFlBQVk7QUFBQSxJQUNaLFlBQVksb0NBQVc7QUFBQSxFQUN6QjtBQUVBLFFBQU0sRUFBRSxJQUFJLFdBQVcsYUFBYSw2QkFBNkI7QUFFakUsTUFBSSxlQUFlLENBQUMsMEJBQTBCO0FBQzVDLDBCQUFzQiwyQkFBMkIsS0FBSyxJQUNwRCxLQUFLLElBQUksR0FDVCxhQUFhLEtBQUssSUFBSSxDQUN4QjtBQUFBLEVBQ0Y7QUFFQSwyQ0FBb0IsU0FBUyxFQUFFLFVBQVUsQ0FBQztBQUUxQyxNQUFJLENBQUMsVUFBVTtBQUNiLFdBQU8sT0FBTyxLQUFLLG1CQUFtQixxQkFBcUI7QUFBQSxFQUM3RDtBQUVBLFNBQU87QUFDVDtBQS9CUyxBQWlDRixNQUFNLFdBQVcsd0JBQ3RCLGNBQ0EsUUFDQSxFQUFFLFdBQVcsVUFBVSxDQUFDLE1BRXhCLGlCQUFpQixjQUFjLG9DQUFXLE1BQU0sUUFBUSxRQUFRLEdBTDFDO0FBT2pCLE1BQU0sYUFBYSx3QkFDeEIsY0FDQSxVQUNBLEVBQUUsV0FBVyxVQUFVLENBQUMsTUFFeEIsaUJBQWlCLGNBQWMsb0NBQVcsUUFBUSxVQUFVLFFBQVEsR0FMNUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
