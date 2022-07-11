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
var stories_exports = {};
__export(stories_exports, {
  RESOLVE_ATTACHMENT_URL: () => RESOLVE_ATTACHMENT_URL,
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer,
  useStoriesActions: () => useStoriesActions
});
module.exports = __toCommonJS(stories_exports);
var import_lodash = require("lodash");
var log = __toESM(require("../../logging/log"));
var import_Client = __toESM(require("../../sql/Client"));
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_ToastReactionFailed = require("../../components/ToastReactionFailed");
var import_UUID = require("../../types/UUID");
var import_enqueueReactionForSend = require("../../reactions/enqueueReactionForSend");
var import_getMessageById = require("../../messages/getMessageById");
var import_MessageUpdater = require("../../services/MessageUpdater");
var import_queueAttachmentDownloads = require("../../util/queueAttachmentDownloads");
var import_replaceIndex = require("../../util/replaceIndex");
var import_showToast = require("../../util/showToast");
var import_Attachment = require("../../types/Attachment");
var import_useBoundActions = require("../../hooks/useBoundActions");
var import_viewSyncJobQueue = require("../../jobs/viewSyncJobQueue");
var import_viewedReceiptsJobQueue = require("../../jobs/viewedReceiptsJobQueue");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_conversations = require("../selectors/conversations");
const LOAD_STORY_REPLIES = "stories/LOAD_STORY_REPLIES";
const MARK_STORY_READ = "stories/MARK_STORY_READ";
const REPLY_TO_STORY = "stories/REPLY_TO_STORY";
const RESOLVE_ATTACHMENT_URL = "stories/RESOLVE_ATTACHMENT_URL";
const STORY_CHANGED = "stories/STORY_CHANGED";
const TOGGLE_VIEW = "stories/TOGGLE_VIEW";
const actions = {
  loadStoryReplies,
  markStoryRead,
  queueStoryDownload,
  reactToStory,
  replyToStory,
  storyChanged,
  toggleStoriesView
};
const useStoriesActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useStoriesActions");
function loadStoryReplies(conversationId, messageId) {
  return async (dispatch, getState) => {
    const conversation = (0, import_conversations.getConversationSelector)(getState())(conversationId);
    const replies = await import_Client.default.getOlderMessagesByConversation(conversationId, { limit: 9e3, storyId: messageId, isGroup: (0, import_whatTypeOfConversation.isGroup)(conversation) });
    dispatch({
      type: LOAD_STORY_REPLIES,
      payload: {
        messageId,
        replies
      }
    });
  };
}
function markStoryRead(messageId) {
  return async (dispatch, getState) => {
    const { stories } = getState().stories;
    const matchingStory = stories.find((story) => story.messageId === messageId);
    if (!matchingStory) {
      log.warn(`markStoryRead: no matching story found: ${messageId}`);
      return;
    }
    if (!(0, import_Attachment.isDownloaded)(matchingStory.attachment)) {
      return;
    }
    if (matchingStory.readStatus !== import_MessageReadStatus.ReadStatus.Unread) {
      return;
    }
    const message = await (0, import_getMessageById.getMessageById)(messageId);
    if (!message) {
      return;
    }
    const storyReadDate = Date.now();
    (0, import_MessageUpdater.markViewed)(message.attributes, storyReadDate);
    const viewedReceipt = {
      messageId,
      senderE164: message.attributes.source,
      senderUuid: message.attributes.sourceUuid,
      timestamp: message.attributes.sent_at
    };
    const viewSyncs = [viewedReceipt];
    if (!window.ConversationController.areWePrimaryDevice()) {
      import_viewSyncJobQueue.viewSyncJobQueue.add({ viewSyncs });
    }
    import_viewedReceiptsJobQueue.viewedReceiptsJobQueue.add({ viewedReceipt });
    await import_Client.default.addNewStoryRead({
      authorId: message.attributes.sourceUuid,
      conversationId: message.attributes.conversationId,
      storyId: new import_UUID.UUID(messageId).toString(),
      storyReadDate
    });
    dispatch({
      type: MARK_STORY_READ,
      payload: messageId
    });
  };
}
function queueStoryDownload(storyId) {
  return async (dispatch) => {
    const story = await (0, import_getMessageById.getMessageById)(storyId);
    if (!story) {
      return;
    }
    const storyAttributes = story.attributes;
    const { attachments } = storyAttributes;
    const attachment = attachments && attachments[0];
    if (!attachment) {
      log.warn("queueStoryDownload: No attachment found for story", {
        storyId
      });
      return;
    }
    if ((0, import_Attachment.isDownloaded)(attachment)) {
      if (!attachment.path) {
        return;
      }
      if ((0, import_Attachment.hasNotResolved)(attachment)) {
        dispatch({
          type: RESOLVE_ATTACHMENT_URL,
          payload: {
            messageId: storyId,
            attachmentUrl: window.Signal.Migrations.getAbsoluteAttachmentPath(attachment.path)
          }
        });
      }
      return;
    }
    if ((0, import_Attachment.isDownloading)(attachment)) {
      return;
    }
    story.set({ storyReplyContext: void 0 });
    await (0, import_queueAttachmentDownloads.queueAttachmentDownloads)(story.attributes);
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function reactToStory(nextReaction, messageId) {
  return async (dispatch) => {
    try {
      await (0, import_enqueueReactionForSend.enqueueReactionForSend)({
        messageId,
        emoji: nextReaction,
        remove: false
      });
    } catch (error) {
      log.error("Error enqueuing reaction", error, messageId, nextReaction);
      (0, import_showToast.showToast)(import_ToastReactionFailed.ToastReactionFailed);
    }
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function replyToStory(conversationId, messageBody, mentions, timestamp, story) {
  return async (dispatch) => {
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      log.error("replyToStory: conversation does not exist", conversationId);
      return;
    }
    const messageAttributes = await conversation.enqueueMessageForSend({
      body: messageBody,
      attachments: [],
      mentions
    }, {
      storyId: story.messageId,
      timestamp
    });
    if (messageAttributes) {
      dispatch({
        type: REPLY_TO_STORY,
        payload: messageAttributes
      });
    }
  };
}
function storyChanged(story) {
  return {
    type: STORY_CHANGED,
    payload: story
  };
}
function toggleStoriesView() {
  return {
    type: TOGGLE_VIEW
  };
}
function getEmptyState(overrideState = {}) {
  return {
    isShowingStoriesView: false,
    stories: [],
    ...overrideState
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === TOGGLE_VIEW) {
    return {
      ...state,
      isShowingStoriesView: !state.isShowingStoriesView
    };
  }
  if (action.type === "MESSAGE_DELETED") {
    const nextStories = state.stories.filter((story) => story.messageId !== action.payload.id);
    if (nextStories.length === state.stories.length) {
      return state;
    }
    return {
      ...state,
      stories: nextStories
    };
  }
  if (action.type === STORY_CHANGED) {
    const newStory = (0, import_lodash.pick)(action.payload, [
      "attachment",
      "conversationId",
      "deletedForEveryone",
      "messageId",
      "reactions",
      "readStatus",
      "sendStateByConversationId",
      "source",
      "sourceUuid",
      "timestamp",
      "type"
    ]);
    const prevStoryIndex = state.stories.findIndex((existingStory) => existingStory.messageId === newStory.messageId);
    if (prevStoryIndex >= 0) {
      const prevStory = state.stories[prevStoryIndex];
      const isDownloadingAttachment = (0, import_Attachment.isDownloading)(newStory.attachment);
      const hasAttachmentDownloaded = !(0, import_Attachment.isDownloaded)(prevStory.attachment) && (0, import_Attachment.isDownloaded)(newStory.attachment);
      const readStatusChanged = prevStory.readStatus !== newStory.readStatus;
      const reactionsChanged = prevStory.reactions?.length !== newStory.reactions?.length;
      const shouldReplace = isDownloadingAttachment || hasAttachmentDownloaded || readStatusChanged || reactionsChanged;
      if (!shouldReplace) {
        return state;
      }
      return {
        ...state,
        stories: (0, import_replaceIndex.replaceIndex)(state.stories, prevStoryIndex, newStory)
      };
    }
    const stories = [...state.stories, newStory].sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
    return {
      ...state,
      stories
    };
  }
  if (action.type === MARK_STORY_READ) {
    return {
      ...state,
      stories: state.stories.map((story) => {
        if (story.messageId === action.payload) {
          return {
            ...story,
            readStatus: import_MessageReadStatus.ReadStatus.Viewed
          };
        }
        return story;
      })
    };
  }
  if (action.type === LOAD_STORY_REPLIES) {
    return {
      ...state,
      replyState: action.payload
    };
  }
  if (action.type === "MESSAGE_CHANGED" && state.replyState && state.replyState.messageId === action.payload.data.storyId) {
    const { replyState } = state;
    const messageIndex = replyState.replies.findIndex((reply) => reply.id === action.payload.id);
    if (messageIndex < 0) {
      return {
        ...state,
        replyState: {
          messageId: replyState.messageId,
          replies: [...replyState.replies, action.payload.data]
        }
      };
    }
    return {
      ...state,
      replyState: {
        messageId: replyState.messageId,
        replies: (0, import_replaceIndex.replaceIndex)(replyState.replies, messageIndex, action.payload.data)
      }
    };
  }
  if (action.type === REPLY_TO_STORY) {
    const { replyState } = state;
    if (!replyState) {
      return state;
    }
    return {
      ...state,
      replyState: {
        messageId: replyState.messageId,
        replies: [...replyState.replies, action.payload]
      }
    };
  }
  if (action.type === RESOLVE_ATTACHMENT_URL) {
    const { messageId, attachmentUrl } = action.payload;
    const storyIndex = state.stories.findIndex((existingStory) => existingStory.messageId === messageId);
    if (storyIndex < 0) {
      return state;
    }
    const story = state.stories[storyIndex];
    if (!story.attachment) {
      return state;
    }
    const storyWithResolvedAttachment = {
      ...story,
      attachment: {
        ...story.attachment,
        url: attachmentUrl
      }
    };
    return {
      ...state,
      stories: (0, import_replaceIndex.replaceIndex)(state.stories, storyIndex, storyWithResolvedAttachment)
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RESOLVE_ATTACHMENT_URL,
  actions,
  getEmptyState,
  reducer,
  useStoriesActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3Rvcmllcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFRodW5rQWN0aW9uIH0gZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IEJvZHlSYW5nZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7XG4gIE1lc3NhZ2VDaGFuZ2VkQWN0aW9uVHlwZSxcbiAgTWVzc2FnZURlbGV0ZWRBY3Rpb25UeXBlLFxufSBmcm9tICcuL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBOb29wQWN0aW9uVHlwZSB9IGZyb20gJy4vbm9vcCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7IFN0b3J5Vmlld1R5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL1N0b3J5TGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBTeW5jVHlwZSB9IGZyb20gJy4uLy4uL2pvYnMvaGVscGVycy9zeW5jSGVscGVycyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgVG9hc3RSZWFjdGlvbkZhaWxlZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvVG9hc3RSZWFjdGlvbkZhaWxlZCc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBlbnF1ZXVlUmVhY3Rpb25Gb3JTZW5kIH0gZnJvbSAnLi4vLi4vcmVhY3Rpb25zL2VucXVldWVSZWFjdGlvbkZvclNlbmQnO1xuaW1wb3J0IHsgZ2V0TWVzc2FnZUJ5SWQgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9nZXRNZXNzYWdlQnlJZCc7XG5pbXBvcnQgeyBtYXJrVmlld2VkIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvTWVzc2FnZVVwZGF0ZXInO1xuaW1wb3J0IHsgcXVldWVBdHRhY2htZW50RG93bmxvYWRzIH0gZnJvbSAnLi4vLi4vdXRpbC9xdWV1ZUF0dGFjaG1lbnREb3dubG9hZHMnO1xuaW1wb3J0IHsgcmVwbGFjZUluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbC9yZXBsYWNlSW5kZXgnO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSAnLi4vLi4vdXRpbC9zaG93VG9hc3QnO1xuaW1wb3J0IHtcbiAgaGFzTm90UmVzb2x2ZWQsXG4gIGlzRG93bmxvYWRlZCxcbiAgaXNEb3dubG9hZGluZyxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyB1c2VCb3VuZEFjdGlvbnMgfSBmcm9tICcuLi8uLi9ob29rcy91c2VCb3VuZEFjdGlvbnMnO1xuaW1wb3J0IHsgdmlld1N5bmNKb2JRdWV1ZSB9IGZyb20gJy4uLy4uL2pvYnMvdmlld1N5bmNKb2JRdWV1ZSc7XG5pbXBvcnQgeyB2aWV3ZWRSZWNlaXB0c0pvYlF1ZXVlIH0gZnJvbSAnLi4vLi4vam9icy92aWV3ZWRSZWNlaXB0c0pvYlF1ZXVlJztcbmltcG9ydCB7IGlzR3JvdXAgfSBmcm9tICcuLi8uLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFN0b3J5RGF0YVR5cGUgPSB7XG4gIGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZTtcbiAgbWVzc2FnZUlkOiBzdHJpbmc7XG59ICYgUGljazxcbiAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICB8ICdjb252ZXJzYXRpb25JZCdcbiAgfCAnZGVsZXRlZEZvckV2ZXJ5b25lJ1xuICB8ICdyZWFjdGlvbnMnXG4gIHwgJ3JlYWRTdGF0dXMnXG4gIHwgJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnXG4gIHwgJ3NvdXJjZSdcbiAgfCAnc291cmNlVXVpZCdcbiAgfCAndGltZXN0YW1wJ1xuICB8ICd0eXBlJ1xuPjtcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgU3Rvcmllc1N0YXRlVHlwZSA9IHtcbiAgcmVhZG9ubHkgaXNTaG93aW5nU3Rvcmllc1ZpZXc6IGJvb2xlYW47XG4gIHJlYWRvbmx5IHJlcGx5U3RhdGU/OiB7XG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gICAgcmVwbGllczogQXJyYXk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPjtcbiAgfTtcbiAgcmVhZG9ubHkgc3RvcmllczogQXJyYXk8U3RvcnlEYXRhVHlwZT47XG59O1xuXG4vLyBBY3Rpb25zXG5cbmNvbnN0IExPQURfU1RPUllfUkVQTElFUyA9ICdzdG9yaWVzL0xPQURfU1RPUllfUkVQTElFUyc7XG5jb25zdCBNQVJLX1NUT1JZX1JFQUQgPSAnc3Rvcmllcy9NQVJLX1NUT1JZX1JFQUQnO1xuY29uc3QgUkVQTFlfVE9fU1RPUlkgPSAnc3Rvcmllcy9SRVBMWV9UT19TVE9SWSc7XG5leHBvcnQgY29uc3QgUkVTT0xWRV9BVFRBQ0hNRU5UX1VSTCA9ICdzdG9yaWVzL1JFU09MVkVfQVRUQUNITUVOVF9VUkwnO1xuY29uc3QgU1RPUllfQ0hBTkdFRCA9ICdzdG9yaWVzL1NUT1JZX0NIQU5HRUQnO1xuY29uc3QgVE9HR0xFX1ZJRVcgPSAnc3Rvcmllcy9UT0dHTEVfVklFVyc7XG5cbnR5cGUgTG9hZFN0b3J5UmVwbGllc0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6IHR5cGVvZiBMT0FEX1NUT1JZX1JFUExJRVM7XG4gIHBheWxvYWQ6IHtcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICByZXBsaWVzOiBBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+O1xuICB9O1xufTtcblxudHlwZSBNYXJrU3RvcnlSZWFkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIE1BUktfU1RPUllfUkVBRDtcbiAgcGF5bG9hZDogc3RyaW5nO1xufTtcblxudHlwZSBSZXBseVRvU3RvcnlBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgUkVQTFlfVE9fU1RPUlk7XG4gIHBheWxvYWQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZTtcbn07XG5cbnR5cGUgUmVzb2x2ZUF0dGFjaG1lbnRVcmxBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgUkVTT0xWRV9BVFRBQ0hNRU5UX1VSTDtcbiAgcGF5bG9hZDoge1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnRVcmw6IHN0cmluZztcbiAgfTtcbn07XG5cbnR5cGUgU3RvcnlDaGFuZ2VkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIFNUT1JZX0NIQU5HRUQ7XG4gIHBheWxvYWQ6IFN0b3J5RGF0YVR5cGU7XG59O1xuXG50eXBlIFRvZ2dsZVZpZXdBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgVE9HR0xFX1ZJRVc7XG59O1xuXG5leHBvcnQgdHlwZSBTdG9yaWVzQWN0aW9uVHlwZSA9XG4gIHwgTG9hZFN0b3J5UmVwbGllc0FjdGlvblR5cGVcbiAgfCBNYXJrU3RvcnlSZWFkQWN0aW9uVHlwZVxuICB8IE1lc3NhZ2VDaGFuZ2VkQWN0aW9uVHlwZVxuICB8IE1lc3NhZ2VEZWxldGVkQWN0aW9uVHlwZVxuICB8IFJlcGx5VG9TdG9yeUFjdGlvblR5cGVcbiAgfCBSZXNvbHZlQXR0YWNobWVudFVybEFjdGlvblR5cGVcbiAgfCBTdG9yeUNoYW5nZWRBY3Rpb25UeXBlXG4gIHwgVG9nZ2xlVmlld0FjdGlvblR5cGU7XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgbG9hZFN0b3J5UmVwbGllcyxcbiAgbWFya1N0b3J5UmVhZCxcbiAgcXVldWVTdG9yeURvd25sb2FkLFxuICByZWFjdFRvU3RvcnksXG4gIHJlcGx5VG9TdG9yeSxcbiAgc3RvcnlDaGFuZ2VkLFxuICB0b2dnbGVTdG9yaWVzVmlldyxcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VTdG9yaWVzQWN0aW9ucyA9ICgpOiB0eXBlb2YgYWN0aW9ucyA9PiB1c2VCb3VuZEFjdGlvbnMoYWN0aW9ucyk7XG5cbmZ1bmN0aW9uIGxvYWRTdG9yeVJlcGxpZXMoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIG1lc3NhZ2VJZDogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBMb2FkU3RvcnlSZXBsaWVzQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKGdldFN0YXRlKCkpKGNvbnZlcnNhdGlvbklkKTtcbiAgICBjb25zdCByZXBsaWVzID0gYXdhaXQgZGF0YUludGVyZmFjZS5nZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHsgbGltaXQ6IDkwMDAsIHN0b3J5SWQ6IG1lc3NhZ2VJZCwgaXNHcm91cDogaXNHcm91cChjb252ZXJzYXRpb24pIH1cbiAgICApO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogTE9BRF9TVE9SWV9SRVBMSUVTLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBtZXNzYWdlSWQsXG4gICAgICAgIHJlcGxpZXMsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtYXJrU3RvcnlSZWFkKFxuICBtZXNzYWdlSWQ6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgTWFya1N0b3J5UmVhZEFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCB7IHN0b3JpZXMgfSA9IGdldFN0YXRlKCkuc3RvcmllcztcblxuICAgIGNvbnN0IG1hdGNoaW5nU3RvcnkgPSBzdG9yaWVzLmZpbmQoc3RvcnkgPT4gc3RvcnkubWVzc2FnZUlkID09PSBtZXNzYWdlSWQpO1xuXG4gICAgaWYgKCFtYXRjaGluZ1N0b3J5KSB7XG4gICAgICBsb2cud2FybihgbWFya1N0b3J5UmVhZDogbm8gbWF0Y2hpbmcgc3RvcnkgZm91bmQ6ICR7bWVzc2FnZUlkfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNEb3dubG9hZGVkKG1hdGNoaW5nU3RvcnkuYXR0YWNobWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWF0Y2hpbmdTdG9yeS5yZWFkU3RhdHVzICE9PSBSZWFkU3RhdHVzLlVucmVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuXG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcnlSZWFkRGF0ZSA9IERhdGUubm93KCk7XG5cbiAgICBtYXJrVmlld2VkKG1lc3NhZ2UuYXR0cmlidXRlcywgc3RvcnlSZWFkRGF0ZSk7XG5cbiAgICBjb25zdCB2aWV3ZWRSZWNlaXB0ID0ge1xuICAgICAgbWVzc2FnZUlkLFxuICAgICAgc2VuZGVyRTE2NDogbWVzc2FnZS5hdHRyaWJ1dGVzLnNvdXJjZSxcbiAgICAgIHNlbmRlclV1aWQ6IG1lc3NhZ2UuYXR0cmlidXRlcy5zb3VyY2VVdWlkLFxuICAgICAgdGltZXN0YW1wOiBtZXNzYWdlLmF0dHJpYnV0ZXMuc2VudF9hdCxcbiAgICB9O1xuICAgIGNvbnN0IHZpZXdTeW5jczogQXJyYXk8U3luY1R5cGU+ID0gW3ZpZXdlZFJlY2VpcHRdO1xuXG4gICAgaWYgKCF3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5hcmVXZVByaW1hcnlEZXZpY2UoKSkge1xuICAgICAgdmlld1N5bmNKb2JRdWV1ZS5hZGQoeyB2aWV3U3luY3MgfSk7XG4gICAgfVxuXG4gICAgdmlld2VkUmVjZWlwdHNKb2JRdWV1ZS5hZGQoeyB2aWV3ZWRSZWNlaXB0IH0pO1xuXG4gICAgYXdhaXQgZGF0YUludGVyZmFjZS5hZGROZXdTdG9yeVJlYWQoe1xuICAgICAgYXV0aG9ySWQ6IG1lc3NhZ2UuYXR0cmlidXRlcy5zb3VyY2VVdWlkLFxuICAgICAgY29udmVyc2F0aW9uSWQ6IG1lc3NhZ2UuYXR0cmlidXRlcy5jb252ZXJzYXRpb25JZCxcbiAgICAgIHN0b3J5SWQ6IG5ldyBVVUlEKG1lc3NhZ2VJZCkudG9TdHJpbmcoKSxcbiAgICAgIHN0b3J5UmVhZERhdGUsXG4gICAgfSk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBNQVJLX1NUT1JZX1JFQUQsXG4gICAgICBwYXlsb2FkOiBtZXNzYWdlSWQsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHF1ZXVlU3RvcnlEb3dubG9hZChcbiAgc3RvcnlJZDogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgTm9vcEFjdGlvblR5cGUgfCBSZXNvbHZlQXR0YWNobWVudFVybEFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IHN0b3J5ID0gYXdhaXQgZ2V0TWVzc2FnZUJ5SWQoc3RvcnlJZCk7XG5cbiAgICBpZiAoIXN0b3J5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcnlBdHRyaWJ1dGVzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSBzdG9yeS5hdHRyaWJ1dGVzO1xuICAgIGNvbnN0IHsgYXR0YWNobWVudHMgfSA9IHN0b3J5QXR0cmlidXRlcztcbiAgICBjb25zdCBhdHRhY2htZW50ID0gYXR0YWNobWVudHMgJiYgYXR0YWNobWVudHNbMF07XG5cbiAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgIGxvZy53YXJuKCdxdWV1ZVN0b3J5RG93bmxvYWQ6IE5vIGF0dGFjaG1lbnQgZm91bmQgZm9yIHN0b3J5Jywge1xuICAgICAgICBzdG9yeUlkLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzRG93bmxvYWRlZChhdHRhY2htZW50KSkge1xuICAgICAgaWYgKCFhdHRhY2htZW50LnBhdGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGlzIGZ1bmN0aW9uIGFsc28gcmVzb2x2ZXMgdGhlIGF0dGFjaG1lbnQncyBVUkwgaW4gY2FzZSB3ZSd2ZSBhbHJlYWR5XG4gICAgICAvLyBkb3dubG9hZGVkIHRoZSBhdHRhY2htZW50IGJ1dCBoYXZlbid0IHBvaW50ZWQgaXRzIHBhdGggdG8gYW4gYWJzb2x1dGVcbiAgICAgIC8vIGxvY2F0aW9uIG9uIGRpc2suXG4gICAgICBpZiAoaGFzTm90UmVzb2x2ZWQoYXR0YWNobWVudCkpIHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFJFU09MVkVfQVRUQUNITUVOVF9VUkwsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgbWVzc2FnZUlkOiBzdG9yeUlkLFxuICAgICAgICAgICAgYXR0YWNobWVudFVybDogd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlQXR0YWNobWVudFBhdGgoXG4gICAgICAgICAgICAgIGF0dGFjaG1lbnQucGF0aFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0Rvd25sb2FkaW5nKGF0dGFjaG1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gV2Ugd2FudCB0byBlbnN1cmUgdGhhdCB3ZSByZS1oeWRyYXRlIHRoZSBzdG9yeSByZXBseSBjb250ZXh0IHdpdGggdGhlXG4gICAgLy8gY29tcGxldGVkIGF0dGFjaG1lbnQgZG93bmxvYWQuXG4gICAgc3Rvcnkuc2V0KHsgc3RvcnlSZXBseUNvbnRleHQ6IHVuZGVmaW5lZCB9KTtcblxuICAgIGF3YWl0IHF1ZXVlQXR0YWNobWVudERvd25sb2FkcyhzdG9yeS5hdHRyaWJ1dGVzKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdOT09QJyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlYWN0VG9TdG9yeShcbiAgbmV4dFJlYWN0aW9uOiBzdHJpbmcsXG4gIG1lc3NhZ2VJZDogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBOb29wQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBlbnF1ZXVlUmVhY3Rpb25Gb3JTZW5kKHtcbiAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICBlbW9qaTogbmV4dFJlYWN0aW9uLFxuICAgICAgICByZW1vdmU6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcignRXJyb3IgZW5xdWV1aW5nIHJlYWN0aW9uJywgZXJyb3IsIG1lc3NhZ2VJZCwgbmV4dFJlYWN0aW9uKTtcbiAgICAgIHNob3dUb2FzdChUb2FzdFJlYWN0aW9uRmFpbGVkKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnTk9PUCcsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXBseVRvU3RvcnkoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIG1lc3NhZ2VCb2R5OiBzdHJpbmcsXG4gIG1lbnRpb25zOiBBcnJheTxCb2R5UmFuZ2VUeXBlPixcbiAgdGltZXN0YW1wOiBudW1iZXIsXG4gIHN0b3J5OiBTdG9yeVZpZXdUeXBlXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBSZXBseVRvU3RvcnlBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcblxuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICBsb2cuZXJyb3IoJ3JlcGx5VG9TdG9yeTogY29udmVyc2F0aW9uIGRvZXMgbm90IGV4aXN0JywgY29udmVyc2F0aW9uSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VBdHRyaWJ1dGVzID0gYXdhaXQgY29udmVyc2F0aW9uLmVucXVldWVNZXNzYWdlRm9yU2VuZChcbiAgICAgIHtcbiAgICAgICAgYm9keTogbWVzc2FnZUJvZHksXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgbWVudGlvbnMsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdG9yeUlkOiBzdG9yeS5tZXNzYWdlSWQsXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKG1lc3NhZ2VBdHRyaWJ1dGVzKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFJFUExZX1RPX1NUT1JZLFxuICAgICAgICBwYXlsb2FkOiBtZXNzYWdlQXR0cmlidXRlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RvcnlDaGFuZ2VkKHN0b3J5OiBTdG9yeURhdGFUeXBlKTogU3RvcnlDaGFuZ2VkQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogU1RPUllfQ0hBTkdFRCxcbiAgICBwYXlsb2FkOiBzdG9yeSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlU3Rvcmllc1ZpZXcoKTogVG9nZ2xlVmlld0FjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9WSUVXLFxuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKFxuICBvdmVycmlkZVN0YXRlOiBQYXJ0aWFsPFN0b3JpZXNTdGF0ZVR5cGU+ID0ge31cbik6IFN0b3JpZXNTdGF0ZVR5cGUge1xuICByZXR1cm4ge1xuICAgIGlzU2hvd2luZ1N0b3JpZXNWaWV3OiBmYWxzZSxcbiAgICBzdG9yaWVzOiBbXSxcbiAgICAuLi5vdmVycmlkZVN0YXRlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PFN0b3JpZXNTdGF0ZVR5cGU+ID0gZ2V0RW1wdHlTdGF0ZSgpLFxuICBhY3Rpb246IFJlYWRvbmx5PFN0b3JpZXNBY3Rpb25UeXBlPlxuKTogU3Rvcmllc1N0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gVE9HR0xFX1ZJRVcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBpc1Nob3dpbmdTdG9yaWVzVmlldzogIXN0YXRlLmlzU2hvd2luZ1N0b3JpZXNWaWV3LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdNRVNTQUdFX0RFTEVURUQnKSB7XG4gICAgY29uc3QgbmV4dFN0b3JpZXMgPSBzdGF0ZS5zdG9yaWVzLmZpbHRlcihcbiAgICAgIHN0b3J5ID0+IHN0b3J5Lm1lc3NhZ2VJZCAhPT0gYWN0aW9uLnBheWxvYWQuaWRcbiAgICApO1xuXG4gICAgaWYgKG5leHRTdG9yaWVzLmxlbmd0aCA9PT0gc3RhdGUuc3Rvcmllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzdG9yaWVzOiBuZXh0U3RvcmllcyxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBTVE9SWV9DSEFOR0VEKSB7XG4gICAgY29uc3QgbmV3U3RvcnkgPSBwaWNrKGFjdGlvbi5wYXlsb2FkLCBbXG4gICAgICAnYXR0YWNobWVudCcsXG4gICAgICAnY29udmVyc2F0aW9uSWQnLFxuICAgICAgJ2RlbGV0ZWRGb3JFdmVyeW9uZScsXG4gICAgICAnbWVzc2FnZUlkJyxcbiAgICAgICdyZWFjdGlvbnMnLFxuICAgICAgJ3JlYWRTdGF0dXMnLFxuICAgICAgJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnLFxuICAgICAgJ3NvdXJjZScsXG4gICAgICAnc291cmNlVXVpZCcsXG4gICAgICAndGltZXN0YW1wJyxcbiAgICAgICd0eXBlJyxcbiAgICBdKTtcblxuICAgIGNvbnN0IHByZXZTdG9yeUluZGV4ID0gc3RhdGUuc3Rvcmllcy5maW5kSW5kZXgoXG4gICAgICBleGlzdGluZ1N0b3J5ID0+IGV4aXN0aW5nU3RvcnkubWVzc2FnZUlkID09PSBuZXdTdG9yeS5tZXNzYWdlSWRcbiAgICApO1xuICAgIGlmIChwcmV2U3RvcnlJbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBwcmV2U3RvcnkgPSBzdGF0ZS5zdG9yaWVzW3ByZXZTdG9yeUluZGV4XTtcblxuICAgICAgLy8gU3RvcmllcyByYXJlbHkgbmVlZCB0byBjaGFuZ2UsIGhlcmUgYXJlIHRoZSBmb2xsb3dpbmcgZXhjZXB0aW9uczpcbiAgICAgIGNvbnN0IGlzRG93bmxvYWRpbmdBdHRhY2htZW50ID0gaXNEb3dubG9hZGluZyhuZXdTdG9yeS5hdHRhY2htZW50KTtcbiAgICAgIGNvbnN0IGhhc0F0dGFjaG1lbnREb3dubG9hZGVkID1cbiAgICAgICAgIWlzRG93bmxvYWRlZChwcmV2U3RvcnkuYXR0YWNobWVudCkgJiZcbiAgICAgICAgaXNEb3dubG9hZGVkKG5ld1N0b3J5LmF0dGFjaG1lbnQpO1xuICAgICAgY29uc3QgcmVhZFN0YXR1c0NoYW5nZWQgPSBwcmV2U3RvcnkucmVhZFN0YXR1cyAhPT0gbmV3U3RvcnkucmVhZFN0YXR1cztcbiAgICAgIGNvbnN0IHJlYWN0aW9uc0NoYW5nZWQgPVxuICAgICAgICBwcmV2U3RvcnkucmVhY3Rpb25zPy5sZW5ndGggIT09IG5ld1N0b3J5LnJlYWN0aW9ucz8ubGVuZ3RoO1xuXG4gICAgICBjb25zdCBzaG91bGRSZXBsYWNlID1cbiAgICAgICAgaXNEb3dubG9hZGluZ0F0dGFjaG1lbnQgfHxcbiAgICAgICAgaGFzQXR0YWNobWVudERvd25sb2FkZWQgfHxcbiAgICAgICAgcmVhZFN0YXR1c0NoYW5nZWQgfHxcbiAgICAgICAgcmVhY3Rpb25zQ2hhbmdlZDtcbiAgICAgIGlmICghc2hvdWxkUmVwbGFjZSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzdG9yaWVzOiByZXBsYWNlSW5kZXgoc3RhdGUuc3RvcmllcywgcHJldlN0b3J5SW5kZXgsIG5ld1N0b3J5KSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIGEgbmV3IHN0b3J5XG4gICAgY29uc3Qgc3RvcmllcyA9IFsuLi5zdGF0ZS5zdG9yaWVzLCBuZXdTdG9yeV0uc29ydCgoYSwgYikgPT5cbiAgICAgIGEudGltZXN0YW1wID4gYi50aW1lc3RhbXAgPyAxIDogLTFcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3RvcmllcyxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBNQVJLX1NUT1JZX1JFQUQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzdG9yaWVzOiBzdGF0ZS5zdG9yaWVzLm1hcChzdG9yeSA9PiB7XG4gICAgICAgIGlmIChzdG9yeS5tZXNzYWdlSWQgPT09IGFjdGlvbi5wYXlsb2FkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0b3J5LFxuICAgICAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5WaWV3ZWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdG9yeTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IExPQURfU1RPUllfUkVQTElFUykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHJlcGx5U3RhdGU6IGFjdGlvbi5wYXlsb2FkLFxuICAgIH07XG4gIH1cblxuICAvLyBGb3IgbGl2ZSB1cGRhdGluZyBvZiB0aGUgc3RvcnkgcmVwbGllc1xuICBpZiAoXG4gICAgYWN0aW9uLnR5cGUgPT09ICdNRVNTQUdFX0NIQU5HRUQnICYmXG4gICAgc3RhdGUucmVwbHlTdGF0ZSAmJlxuICAgIHN0YXRlLnJlcGx5U3RhdGUubWVzc2FnZUlkID09PSBhY3Rpb24ucGF5bG9hZC5kYXRhLnN0b3J5SWRcbiAgKSB7XG4gICAgY29uc3QgeyByZXBseVN0YXRlIH0gPSBzdGF0ZTtcbiAgICBjb25zdCBtZXNzYWdlSW5kZXggPSByZXBseVN0YXRlLnJlcGxpZXMuZmluZEluZGV4KFxuICAgICAgcmVwbHkgPT4gcmVwbHkuaWQgPT09IGFjdGlvbi5wYXlsb2FkLmlkXG4gICAgKTtcblxuICAgIC8vIE5ldyBtZXNzYWdlXG4gICAgaWYgKG1lc3NhZ2VJbmRleCA8IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZXBseVN0YXRlOiB7XG4gICAgICAgICAgbWVzc2FnZUlkOiByZXBseVN0YXRlLm1lc3NhZ2VJZCxcbiAgICAgICAgICByZXBsaWVzOiBbLi4ucmVwbHlTdGF0ZS5yZXBsaWVzLCBhY3Rpb24ucGF5bG9hZC5kYXRhXSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2hhbmdlZCBtZXNzYWdlLCBhbHNvIGhhbmRsZXMgRE9FXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcmVwbHlTdGF0ZToge1xuICAgICAgICBtZXNzYWdlSWQ6IHJlcGx5U3RhdGUubWVzc2FnZUlkLFxuICAgICAgICByZXBsaWVzOiByZXBsYWNlSW5kZXgoXG4gICAgICAgICAgcmVwbHlTdGF0ZS5yZXBsaWVzLFxuICAgICAgICAgIG1lc3NhZ2VJbmRleCxcbiAgICAgICAgICBhY3Rpb24ucGF5bG9hZC5kYXRhXG4gICAgICAgICksXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFJFUExZX1RPX1NUT1JZKSB7XG4gICAgY29uc3QgeyByZXBseVN0YXRlIH0gPSBzdGF0ZTtcbiAgICBpZiAoIXJlcGx5U3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZXBseVN0YXRlOiB7XG4gICAgICAgIG1lc3NhZ2VJZDogcmVwbHlTdGF0ZS5tZXNzYWdlSWQsXG4gICAgICAgIHJlcGxpZXM6IFsuLi5yZXBseVN0YXRlLnJlcGxpZXMsIGFjdGlvbi5wYXlsb2FkXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gUkVTT0xWRV9BVFRBQ0hNRU5UX1VSTCkge1xuICAgIGNvbnN0IHsgbWVzc2FnZUlkLCBhdHRhY2htZW50VXJsIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IHN0b3J5SW5kZXggPSBzdGF0ZS5zdG9yaWVzLmZpbmRJbmRleChcbiAgICAgIGV4aXN0aW5nU3RvcnkgPT4gZXhpc3RpbmdTdG9yeS5tZXNzYWdlSWQgPT09IG1lc3NhZ2VJZFxuICAgICk7XG5cbiAgICBpZiAoc3RvcnlJbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBzdG9yeSA9IHN0YXRlLnN0b3JpZXNbc3RvcnlJbmRleF07XG5cbiAgICBpZiAoIXN0b3J5LmF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBzdG9yeVdpdGhSZXNvbHZlZEF0dGFjaG1lbnQgPSB7XG4gICAgICAuLi5zdG9yeSxcbiAgICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgICAgLi4uc3RvcnkuYXR0YWNobWVudCxcbiAgICAgICAgdXJsOiBhdHRhY2htZW50VXJsLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3RvcmllczogcmVwbGFjZUluZGV4KFxuICAgICAgICBzdGF0ZS5zdG9yaWVzLFxuICAgICAgICBzdG9yeUluZGV4LFxuICAgICAgICBzdG9yeVdpdGhSZXNvbHZlZEF0dGFjaG1lbnRcbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG9CQUFxQjtBQVlyQixVQUFxQjtBQUNyQixvQkFBMEI7QUFDMUIsK0JBQTJCO0FBQzNCLGlDQUFvQztBQUNwQyxrQkFBcUI7QUFDckIsb0NBQXVDO0FBQ3ZDLDRCQUErQjtBQUMvQiw0QkFBMkI7QUFDM0Isc0NBQXlDO0FBQ3pDLDBCQUE2QjtBQUM3Qix1QkFBMEI7QUFDMUIsd0JBSU87QUFDUCw2QkFBZ0M7QUFDaEMsOEJBQWlD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QSxFQUNGO0FBR0EsTUFDRSxPQUFPLFNBQVMscUJBQ2hCLE1BQU0sY0FDTixNQUFNLFdBQVcsY0FBYyxPQUFPLFFBQVEsS0FBSyxTQUNuRDtBQUNBLFVBQU0sRUFBRSxlQUFlO0FBQ3ZCLFVBQU0sZUFBZSxXQUFXLFFBQVEsVUFDdEMsV0FBUyxNQUFNLE9BQU8sT0FBTyxRQUFRLEVBQ3ZDO0FBR0EsUUFBSSxlQUFlLEdBQUc7QUFDcEIsYUFBTztBQUFBLFdBQ0Y7QUFBQSxRQUNILFlBQVk7QUFBQSxVQUNWLFdBQVcsV0FBVztBQUFBLFVBQ3RCLFNBQVMsQ0FBQyxHQUFHLFdBQVcsU0FBUyxPQUFPLFFBQVEsSUFBSTtBQUFBLFFBQ3REO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFHQSxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsWUFBWTtBQUFBLFFBQ1YsV0FBVyxXQUFXO0FBQUEsUUFDdEIsU0FBUyxzQ0FDUCxXQUFXLFNBQ1gsY0FDQSxPQUFPLFFBQVEsSUFDakI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE9BQU8sU0FBUyxnQkFBZ0I7QUFDbEMsVUFBTSxFQUFFLGVBQWU7QUFDdkIsUUFBSSxDQUFDLFlBQVk7QUFDZixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxZQUFZO0FBQUEsUUFDVixXQUFXLFdBQVc7QUFBQSxRQUN0QixTQUFTLENBQUMsR0FBRyxXQUFXLFNBQVMsT0FBTyxPQUFPO0FBQUEsTUFDakQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxTQUFTLHdCQUF3QjtBQUMxQyxVQUFNLEVBQUUsV0FBVyxrQkFBa0IsT0FBTztBQUU1QyxVQUFNLGFBQWEsTUFBTSxRQUFRLFVBQy9CLG1CQUFpQixjQUFjLGNBQWMsU0FDL0M7QUFFQSxRQUFJLGFBQWEsR0FBRztBQUNsQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sUUFBUSxNQUFNLFFBQVE7QUFFNUIsUUFBSSxDQUFDLE1BQU0sWUFBWTtBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sOEJBQThCO0FBQUEsU0FDL0I7QUFBQSxNQUNILFlBQVk7QUFBQSxXQUNQLE1BQU07QUFBQSxRQUNULEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxTQUFTLHNDQUNQLE1BQU0sU0FDTixZQUNBLDJCQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFoTWdCIiwKICAibmFtZXMiOiBbXQp9Cg==
