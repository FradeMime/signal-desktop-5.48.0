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
var StoryViewer_exports = {};
__export(StoryViewer_exports, {
  SmartStoryViewer: () => SmartStoryViewer
});
module.exports = __toCommonJS(StoryViewer_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_StoryViewer = require("../../components/StoryViewer");
var import_ToastMessageBodyTooLong = require("../../components/ToastMessageBodyTooLong");
var import_items = require("../selectors/items");
var import_user = require("../selectors/user");
var import_badges = require("../selectors/badges");
var import_stories = require("../selectors/stories");
var import_renderEmojiPicker = require("./renderEmojiPicker");
var import_showToast = require("../../util/showToast");
var import_emojis = require("../ducks/emojis");
var import_items2 = require("../ducks/items");
var import_conversations = require("../ducks/conversations");
var import_emojis2 = require("../selectors/emojis");
var import_stories2 = require("../ducks/stories");
function SmartStoryViewer({
  conversationId,
  onClose,
  onNextUserStories,
  onPrevUserStories
}) {
  const storiesActions = (0, import_stories2.useStoriesActions)();
  const { onSetSkinTone, toggleHasAllStoriesMuted } = (0, import_items2.useActions)();
  const { onUseEmoji } = (0, import_emojis.useActions)();
  const { showConversation, toggleHideStories } = (0, import_conversations.useConversationsActions)();
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const getPreferredBadge = (0, import_react_redux.useSelector)(import_badges.getPreferredBadgeSelector);
  const preferredReactionEmoji = (0, import_react_redux.useSelector)(import_items.getPreferredReactionEmoji);
  const getStoriesByConversationId = (0, import_react_redux.useSelector)(import_stories.getStoriesSelector);
  const { group, stories } = getStoriesByConversationId(conversationId);
  const recentEmojis = (0, import_emojis2.useRecentEmojis)();
  const skinTone = (0, import_react_redux.useSelector)(import_items.getEmojiSkinTone);
  const replyState = (0, import_react_redux.useSelector)(import_stories.getStoryReplies);
  const hasAllStoriesMuted = (0, import_react_redux.useSelector)(import_items.getHasAllStoriesMuted);
  return /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
    conversationId,
    getPreferredBadge,
    group,
    hasAllStoriesMuted,
    i18n,
    onClose,
    onHideStory: toggleHideStories,
    onGoToConversation: (senderId) => {
      showConversation({ conversationId: senderId });
      storiesActions.toggleStoriesView();
    },
    onNextUserStories,
    onPrevUserStories,
    onReactToStory: async (emoji, story) => {
      const { messageId } = story;
      storiesActions.reactToStory(emoji, messageId);
    },
    onReplyToStory: (message, mentions, timestamp, story) => {
      storiesActions.replyToStory(conversationId, message, mentions, timestamp, story);
    },
    onSetSkinTone,
    onTextTooLong: () => (0, import_showToast.showToast)(import_ToastMessageBodyTooLong.ToastMessageBodyTooLong),
    onUseEmoji,
    preferredReactionEmoji,
    recentEmojis,
    renderEmojiPicker: import_renderEmojiPicker.renderEmojiPicker,
    replyState,
    stories,
    skinTone,
    toggleHasAllStoriesMuted,
    ...storiesActions
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartStoryViewer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlWaWV3ZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHR5cGUgeyBHZXRTdG9yaWVzQnlDb252ZXJzYXRpb25JZFR5cGUgfSBmcm9tICcuLi9zZWxlY3RvcnMvc3Rvcmllcyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBTdG9yeVZpZXdlciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU3RvcnlWaWV3ZXInO1xuaW1wb3J0IHsgVG9hc3RNZXNzYWdlQm9keVRvb0xvbmcgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL1RvYXN0TWVzc2FnZUJvZHlUb29Mb25nJztcbmltcG9ydCB7XG4gIGdldEVtb2ppU2tpblRvbmUsXG4gIGdldEhhc0FsbFN0b3JpZXNNdXRlZCxcbiAgZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaSxcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBnZXRTdG9yaWVzU2VsZWN0b3IsIGdldFN0b3J5UmVwbGllcyB9IGZyb20gJy4uL3NlbGVjdG9ycy9zdG9yaWVzJztcbmltcG9ydCB7IHJlbmRlckVtb2ppUGlja2VyIH0gZnJvbSAnLi9yZW5kZXJFbW9qaVBpY2tlcic7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tICcuLi8uLi91dGlsL3Nob3dUb2FzdCc7XG5pbXBvcnQgeyB1c2VBY3Rpb25zIGFzIHVzZUVtb2ppc0FjdGlvbnMgfSBmcm9tICcuLi9kdWNrcy9lbW9qaXMnO1xuaW1wb3J0IHsgdXNlQWN0aW9ucyBhcyB1c2VJdGVtc0FjdGlvbnMgfSBmcm9tICcuLi9kdWNrcy9pdGVtcyc7XG5pbXBvcnQgeyB1c2VDb252ZXJzYXRpb25zQWN0aW9ucyB9IGZyb20gJy4uL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgdXNlUmVjZW50RW1vamlzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2Vtb2ppcyc7XG5pbXBvcnQgeyB1c2VTdG9yaWVzQWN0aW9ucyB9IGZyb20gJy4uL2R1Y2tzL3N0b3JpZXMnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIG9uTmV4dFVzZXJTdG9yaWVzOiAoKSA9PiB1bmtub3duO1xuICBvblByZXZVc2VyU3RvcmllczogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBTbWFydFN0b3J5Vmlld2VyKHtcbiAgY29udmVyc2F0aW9uSWQsXG4gIG9uQ2xvc2UsXG4gIG9uTmV4dFVzZXJTdG9yaWVzLFxuICBvblByZXZVc2VyU3Rvcmllcyxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IHN0b3JpZXNBY3Rpb25zID0gdXNlU3Rvcmllc0FjdGlvbnMoKTtcbiAgY29uc3QgeyBvblNldFNraW5Ub25lLCB0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWQgfSA9IHVzZUl0ZW1zQWN0aW9ucygpO1xuICBjb25zdCB7IG9uVXNlRW1vamkgfSA9IHVzZUVtb2ppc0FjdGlvbnMoKTtcbiAgY29uc3QgeyBzaG93Q29udmVyc2F0aW9uLCB0b2dnbGVIaWRlU3RvcmllcyB9ID0gdXNlQ29udmVyc2F0aW9uc0FjdGlvbnMoKTtcblxuICBjb25zdCBpMThuID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBMb2NhbGl6ZXJUeXBlPihnZXRJbnRsKTtcbiAgY29uc3QgZ2V0UHJlZmVycmVkQmFkZ2UgPSB1c2VTZWxlY3RvcihnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yKTtcbiAgY29uc3QgcHJlZmVycmVkUmVhY3Rpb25FbW9qaSA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgQXJyYXk8c3RyaW5nPj4oXG4gICAgZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaVxuICApO1xuXG4gIGNvbnN0IGdldFN0b3JpZXNCeUNvbnZlcnNhdGlvbklkID0gdXNlU2VsZWN0b3I8XG4gICAgU3RhdGVUeXBlLFxuICAgIEdldFN0b3JpZXNCeUNvbnZlcnNhdGlvbklkVHlwZVxuICA+KGdldFN0b3JpZXNTZWxlY3Rvcik7XG5cbiAgY29uc3QgeyBncm91cCwgc3RvcmllcyB9ID0gZ2V0U3Rvcmllc0J5Q29udmVyc2F0aW9uSWQoY29udmVyc2F0aW9uSWQpO1xuXG4gIGNvbnN0IHJlY2VudEVtb2ppcyA9IHVzZVJlY2VudEVtb2ppcygpO1xuICBjb25zdCBza2luVG9uZSA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgbnVtYmVyPihnZXRFbW9qaVNraW5Ub25lKTtcbiAgY29uc3QgcmVwbHlTdGF0ZSA9IHVzZVNlbGVjdG9yKGdldFN0b3J5UmVwbGllcyk7XG4gIGNvbnN0IGhhc0FsbFN0b3JpZXNNdXRlZCA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgYm9vbGVhbj4oXG4gICAgZ2V0SGFzQWxsU3Rvcmllc011dGVkXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlWaWV3ZXJcbiAgICAgIGNvbnZlcnNhdGlvbklkPXtjb252ZXJzYXRpb25JZH1cbiAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgIGdyb3VwPXtncm91cH1cbiAgICAgIGhhc0FsbFN0b3JpZXNNdXRlZD17aGFzQWxsU3Rvcmllc011dGVkfVxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICBvbkhpZGVTdG9yeT17dG9nZ2xlSGlkZVN0b3JpZXN9XG4gICAgICBvbkdvVG9Db252ZXJzYXRpb249e3NlbmRlcklkID0+IHtcbiAgICAgICAgc2hvd0NvbnZlcnNhdGlvbih7IGNvbnZlcnNhdGlvbklkOiBzZW5kZXJJZCB9KTtcbiAgICAgICAgc3Rvcmllc0FjdGlvbnMudG9nZ2xlU3Rvcmllc1ZpZXcoKTtcbiAgICAgIH19XG4gICAgICBvbk5leHRVc2VyU3Rvcmllcz17b25OZXh0VXNlclN0b3JpZXN9XG4gICAgICBvblByZXZVc2VyU3Rvcmllcz17b25QcmV2VXNlclN0b3JpZXN9XG4gICAgICBvblJlYWN0VG9TdG9yeT17YXN5bmMgKGVtb2ppLCBzdG9yeSkgPT4ge1xuICAgICAgICBjb25zdCB7IG1lc3NhZ2VJZCB9ID0gc3Rvcnk7XG4gICAgICAgIHN0b3JpZXNBY3Rpb25zLnJlYWN0VG9TdG9yeShlbW9qaSwgbWVzc2FnZUlkKTtcbiAgICAgIH19XG4gICAgICBvblJlcGx5VG9TdG9yeT17KG1lc3NhZ2UsIG1lbnRpb25zLCB0aW1lc3RhbXAsIHN0b3J5KSA9PiB7XG4gICAgICAgIHN0b3JpZXNBY3Rpb25zLnJlcGx5VG9TdG9yeShcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIG1lbnRpb25zLFxuICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICBzdG9yeVxuICAgICAgICApO1xuICAgICAgfX1cbiAgICAgIG9uU2V0U2tpblRvbmU9e29uU2V0U2tpblRvbmV9XG4gICAgICBvblRleHRUb29Mb25nPXsoKSA9PiBzaG93VG9hc3QoVG9hc3RNZXNzYWdlQm9keVRvb0xvbmcpfVxuICAgICAgb25Vc2VFbW9qaT17b25Vc2VFbW9qaX1cbiAgICAgIHByZWZlcnJlZFJlYWN0aW9uRW1vamk9e3ByZWZlcnJlZFJlYWN0aW9uRW1vaml9XG4gICAgICByZWNlbnRFbW9qaXM9e3JlY2VudEVtb2ppc31cbiAgICAgIHJlbmRlckVtb2ppUGlja2VyPXtyZW5kZXJFbW9qaVBpY2tlcn1cbiAgICAgIHJlcGx5U3RhdGU9e3JlcGx5U3RhdGV9XG4gICAgICBzdG9yaWVzPXtzdG9yaWVzfVxuICAgICAgc2tpblRvbmU9e3NraW5Ub25lfVxuICAgICAgdG9nZ2xlSGFzQWxsU3Rvcmllc011dGVkPXt0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWR9XG4gICAgICB7Li4uc3Rvcmllc0FjdGlvbnN9XG4gICAgLz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIseUJBQTRCO0FBSzVCLHlCQUE0QjtBQUM1QixxQ0FBd0M7QUFDeEMsbUJBSU87QUFDUCxrQkFBd0I7QUFDeEIsb0JBQTBDO0FBQzFDLHFCQUFvRDtBQUNwRCwrQkFBa0M7QUFDbEMsdUJBQTBCO0FBQzFCLG9CQUErQztBQUMvQyxvQkFBOEM7QUFDOUMsMkJBQXdDO0FBQ3hDLHFCQUFnQztBQUNoQyxzQkFBa0M7QUFTM0IsMEJBQTBCO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNnQztBQUNoQyxRQUFNLGlCQUFpQix1Q0FBa0I7QUFDekMsUUFBTSxFQUFFLGVBQWUsNkJBQTZCLDhCQUFnQjtBQUNwRSxRQUFNLEVBQUUsZUFBZSw4QkFBaUI7QUFDeEMsUUFBTSxFQUFFLGtCQUFrQixzQkFBc0Isa0RBQXdCO0FBRXhFLFFBQU0sT0FBTyxvQ0FBc0MsbUJBQU87QUFDMUQsUUFBTSxvQkFBb0Isb0NBQVksdUNBQXlCO0FBQy9ELFFBQU0seUJBQXlCLG9DQUM3QixzQ0FDRjtBQUVBLFFBQU0sNkJBQTZCLG9DQUdqQyxpQ0FBa0I7QUFFcEIsUUFBTSxFQUFFLE9BQU8sWUFBWSwyQkFBMkIsY0FBYztBQUVwRSxRQUFNLGVBQWUsb0NBQWdCO0FBQ3JDLFFBQU0sV0FBVyxvQ0FBK0IsNkJBQWdCO0FBQ2hFLFFBQU0sYUFBYSxvQ0FBWSw4QkFBZTtBQUM5QyxRQUFNLHFCQUFxQixvQ0FDekIsa0NBQ0Y7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixvQkFBb0IsY0FBWTtBQUM5Qix1QkFBaUIsRUFBRSxnQkFBZ0IsU0FBUyxDQUFDO0FBQzdDLHFCQUFlLGtCQUFrQjtBQUFBLElBQ25DO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGdCQUFnQixPQUFPLE9BQU8sVUFBVTtBQUN0QyxZQUFNLEVBQUUsY0FBYztBQUN0QixxQkFBZSxhQUFhLE9BQU8sU0FBUztBQUFBLElBQzlDO0FBQUEsSUFDQSxnQkFBZ0IsQ0FBQyxTQUFTLFVBQVUsV0FBVyxVQUFVO0FBQ3ZELHFCQUFlLGFBQ2IsZ0JBQ0EsU0FDQSxVQUNBLFdBQ0EsS0FDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsSUFDQSxlQUFlLE1BQU0sZ0NBQVUsc0RBQXVCO0FBQUEsSUFDdEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsbUJBQW1CO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxPQUNJO0FBQUEsR0FDTjtBQUVKO0FBeEVnQiIsCiAgIm5hbWVzIjogW10KfQo=
