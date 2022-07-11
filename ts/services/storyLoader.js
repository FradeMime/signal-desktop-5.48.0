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
var storyLoader_exports = {};
__export(storyLoader_exports, {
  getStoriesForRedux: () => getStoriesForRedux,
  getStoryDataFromMessageAttributes: () => getStoryDataFromMessageAttributes,
  loadStories: () => loadStories
});
module.exports = __toCommonJS(storyLoader_exports);
var import_lodash = require("lodash");
var durations = __toESM(require("../util/durations"));
var log = __toESM(require("../logging/log"));
var import_Client = __toESM(require("../sql/Client"));
var import_message = require("../state/selectors/message");
var import_isNotNil = require("../util/isNotNil");
var import_assert = require("../util/assert");
let storyData;
async function loadStories() {
  storyData = await import_Client.default.getOlderStories({});
  await repairUnexpiredStories();
}
function getStoryDataFromMessageAttributes(message) {
  const { attachments } = message;
  const unresolvedAttachment = attachments ? attachments[0] : void 0;
  if (!unresolvedAttachment) {
    log.warn(`getStoryDataFromMessageAttributes: ${message.id} does not have an attachment`);
    return;
  }
  const [attachment] = unresolvedAttachment.path ? (0, import_message.getAttachmentsForMessage)(message) : [unresolvedAttachment];
  return {
    attachment,
    messageId: message.id,
    ...(0, import_lodash.pick)(message, [
      "conversationId",
      "deletedForEveryone",
      "reactions",
      "readStatus",
      "sendStateByConversationId",
      "source",
      "sourceUuid",
      "timestamp",
      "type"
    ])
  };
}
function getStoriesForRedux() {
  (0, import_assert.strictAssert)(storyData, "storyData has not been loaded");
  const stories = storyData.map(getStoryDataFromMessageAttributes).filter(import_isNotNil.isNotNil);
  storyData = void 0;
  return stories;
}
async function repairUnexpiredStories() {
  (0, import_assert.strictAssert)(storyData, "Could not load stories");
  const DAY_AS_SECONDS = durations.DAY / 1e3;
  const storiesWithExpiry = storyData.filter((story) => !story.expirationStartTimestamp || !story.expireTimer || story.expireTimer > DAY_AS_SECONDS).map((story) => ({
    ...story,
    expirationStartTimestamp: Math.min(story.serverTimestamp || story.timestamp, Date.now()),
    expireTimer: Math.min(Math.floor((story.timestamp + durations.DAY - Date.now()) / 1e3), DAY_AS_SECONDS)
  }));
  if (!storiesWithExpiry.length) {
    return;
  }
  log.info("repairUnexpiredStories: repairing number of stories", storiesWithExpiry.length);
  await Promise.all(storiesWithExpiry.map((messageAttributes) => {
    return window.Signal.Data.saveMessage(messageAttributes, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStoriesForRedux,
  getStoryDataFromMessageAttributes,
  loadStories
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RvcnlMb2FkZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBTdG9yeURhdGFUeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3Mvc3Rvcmllcyc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0IHsgZ2V0QXR0YWNobWVudHNGb3JNZXNzYWdlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL21lc3NhZ2UnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi91dGlsL2lzTm90TmlsJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxubGV0IHN0b3J5RGF0YTogQXJyYXk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRTdG9yaWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICBzdG9yeURhdGEgPSBhd2FpdCBkYXRhSW50ZXJmYWNlLmdldE9sZGVyU3Rvcmllcyh7fSk7XG4gIGF3YWl0IHJlcGFpclVuZXhwaXJlZFN0b3JpZXMoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0b3J5RGF0YUZyb21NZXNzYWdlQXR0cmlidXRlcyhcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBTdG9yeURhdGFUeXBlIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyBhdHRhY2htZW50cyB9ID0gbWVzc2FnZTtcbiAgY29uc3QgdW5yZXNvbHZlZEF0dGFjaG1lbnQgPSBhdHRhY2htZW50cyA/IGF0dGFjaG1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICBpZiAoIXVucmVzb2x2ZWRBdHRhY2htZW50KSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgZ2V0U3RvcnlEYXRhRnJvbU1lc3NhZ2VBdHRyaWJ1dGVzOiAke21lc3NhZ2UuaWR9IGRvZXMgbm90IGhhdmUgYW4gYXR0YWNobWVudGBcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IFthdHRhY2htZW50XSA9IHVucmVzb2x2ZWRBdHRhY2htZW50LnBhdGhcbiAgICA/IGdldEF0dGFjaG1lbnRzRm9yTWVzc2FnZShtZXNzYWdlKVxuICAgIDogW3VucmVzb2x2ZWRBdHRhY2htZW50XTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFjaG1lbnQsXG4gICAgbWVzc2FnZUlkOiBtZXNzYWdlLmlkLFxuICAgIC4uLnBpY2sobWVzc2FnZSwgW1xuICAgICAgJ2NvbnZlcnNhdGlvbklkJyxcbiAgICAgICdkZWxldGVkRm9yRXZlcnlvbmUnLFxuICAgICAgJ3JlYWN0aW9ucycsXG4gICAgICAncmVhZFN0YXR1cycsXG4gICAgICAnc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCcsXG4gICAgICAnc291cmNlJyxcbiAgICAgICdzb3VyY2VVdWlkJyxcbiAgICAgICd0aW1lc3RhbXAnLFxuICAgICAgJ3R5cGUnLFxuICAgIF0pLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3Rvcmllc0ZvclJlZHV4KCk6IEFycmF5PFN0b3J5RGF0YVR5cGU+IHtcbiAgc3RyaWN0QXNzZXJ0KHN0b3J5RGF0YSwgJ3N0b3J5RGF0YSBoYXMgbm90IGJlZW4gbG9hZGVkJyk7XG5cbiAgY29uc3Qgc3RvcmllcyA9IHN0b3J5RGF0YVxuICAgIC5tYXAoZ2V0U3RvcnlEYXRhRnJvbU1lc3NhZ2VBdHRyaWJ1dGVzKVxuICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuXG4gIHN0b3J5RGF0YSA9IHVuZGVmaW5lZDtcblxuICByZXR1cm4gc3Rvcmllcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwYWlyVW5leHBpcmVkU3RvcmllcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgc3RyaWN0QXNzZXJ0KHN0b3J5RGF0YSwgJ0NvdWxkIG5vdCBsb2FkIHN0b3JpZXMnKTtcblxuICBjb25zdCBEQVlfQVNfU0VDT05EUyA9IGR1cmF0aW9ucy5EQVkgLyAxMDAwO1xuXG4gIGNvbnN0IHN0b3JpZXNXaXRoRXhwaXJ5ID0gc3RvcnlEYXRhXG4gICAgLmZpbHRlcihcbiAgICAgIHN0b3J5ID0+XG4gICAgICAgICFzdG9yeS5leHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgfHxcbiAgICAgICAgIXN0b3J5LmV4cGlyZVRpbWVyIHx8XG4gICAgICAgIHN0b3J5LmV4cGlyZVRpbWVyID4gREFZX0FTX1NFQ09ORFNcbiAgICApXG4gICAgLm1hcChzdG9yeSA9PiAoe1xuICAgICAgLi4uc3RvcnksXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IE1hdGgubWluKFxuICAgICAgICBzdG9yeS5zZXJ2ZXJUaW1lc3RhbXAgfHwgc3RvcnkudGltZXN0YW1wLFxuICAgICAgICBEYXRlLm5vdygpXG4gICAgICApLFxuICAgICAgZXhwaXJlVGltZXI6IE1hdGgubWluKFxuICAgICAgICBNYXRoLmZsb29yKChzdG9yeS50aW1lc3RhbXAgKyBkdXJhdGlvbnMuREFZIC0gRGF0ZS5ub3coKSkgLyAxMDAwKSxcbiAgICAgICAgREFZX0FTX1NFQ09ORFNcbiAgICAgICksXG4gICAgfSkpO1xuXG4gIGlmICghc3Rvcmllc1dpdGhFeHBpcnkubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nLmluZm8oXG4gICAgJ3JlcGFpclVuZXhwaXJlZFN0b3JpZXM6IHJlcGFpcmluZyBudW1iZXIgb2Ygc3RvcmllcycsXG4gICAgc3Rvcmllc1dpdGhFeHBpcnkubGVuZ3RoXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgc3Rvcmllc1dpdGhFeHBpcnkubWFwKG1lc3NhZ2VBdHRyaWJ1dGVzID0+IHtcbiAgICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZUF0dHJpYnV0ZXMsIHtcbiAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgIH0pO1xuICAgIH0pXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFxQjtBQUdyQixnQkFBMkI7QUFDM0IsVUFBcUI7QUFDckIsb0JBQTBCO0FBQzFCLHFCQUF5QztBQUN6QyxzQkFBeUI7QUFDekIsb0JBQTZCO0FBRTdCLElBQUk7QUFFSiw2QkFBbUQ7QUFDakQsY0FBWSxNQUFNLHNCQUFjLGdCQUFnQixDQUFDLENBQUM7QUFDbEQsUUFBTSx1QkFBdUI7QUFDL0I7QUFIc0IsQUFLZiwyQ0FDTCxTQUMyQjtBQUMzQixRQUFNLEVBQUUsZ0JBQWdCO0FBQ3hCLFFBQU0sdUJBQXVCLGNBQWMsWUFBWSxLQUFLO0FBQzVELE1BQUksQ0FBQyxzQkFBc0I7QUFDekIsUUFBSSxLQUNGLHNDQUFzQyxRQUFRLGdDQUNoRDtBQUNBO0FBQUEsRUFDRjtBQUVBLFFBQU0sQ0FBQyxjQUFjLHFCQUFxQixPQUN0Qyw2Q0FBeUIsT0FBTyxJQUNoQyxDQUFDLG9CQUFvQjtBQUV6QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsV0FBVyxRQUFRO0FBQUEsT0FDaEIsd0JBQUssU0FBUztBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQS9CZ0IsQUFpQ1QsOEJBQW9EO0FBQ3pELGtDQUFhLFdBQVcsK0JBQStCO0FBRXZELFFBQU0sVUFBVSxVQUNiLElBQUksaUNBQWlDLEVBQ3JDLE9BQU8sd0JBQVE7QUFFbEIsY0FBWTtBQUVaLFNBQU87QUFDVDtBQVZnQixBQVloQix3Q0FBdUQ7QUFDckQsa0NBQWEsV0FBVyx3QkFBd0I7QUFFaEQsUUFBTSxpQkFBaUIsVUFBVSxNQUFNO0FBRXZDLFFBQU0sb0JBQW9CLFVBQ3ZCLE9BQ0MsV0FDRSxDQUFDLE1BQU0sNEJBQ1AsQ0FBQyxNQUFNLGVBQ1AsTUFBTSxjQUFjLGNBQ3hCLEVBQ0MsSUFBSSxXQUFVO0FBQUEsT0FDVjtBQUFBLElBQ0gsMEJBQTBCLEtBQUssSUFDN0IsTUFBTSxtQkFBbUIsTUFBTSxXQUMvQixLQUFLLElBQUksQ0FDWDtBQUFBLElBQ0EsYUFBYSxLQUFLLElBQ2hCLEtBQUssTUFBTyxPQUFNLFlBQVksVUFBVSxNQUFNLEtBQUssSUFBSSxLQUFLLEdBQUksR0FDaEUsY0FDRjtBQUFBLEVBQ0YsRUFBRTtBQUVKLE1BQUksQ0FBQyxrQkFBa0IsUUFBUTtBQUM3QjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLEtBQ0YsdURBQ0Esa0JBQWtCLE1BQ3BCO0FBRUEsUUFBTSxRQUFRLElBQ1osa0JBQWtCLElBQUksdUJBQXFCO0FBQ3pDLFdBQU8sT0FBTyxPQUFPLEtBQUssWUFBWSxtQkFBbUI7QUFBQSxNQUN2RCxTQUFTLE9BQU8sV0FBVyxRQUFRLEtBQUssZUFBZSxFQUFFLFNBQVM7QUFBQSxJQUNwRSxDQUFDO0FBQUEsRUFDSCxDQUFDLENBQ0g7QUFDRjtBQXhDZSIsCiAgIm5hbWVzIjogW10KfQo=
