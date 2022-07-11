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
var StoryViewsNRepliesModal_exports = {};
__export(StoryViewsNRepliesModal_exports, {
  StoryViewsNRepliesModal: () => StoryViewsNRepliesModal
});
module.exports = __toCommonJS(StoryViewsNRepliesModal_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_popper = require("react-popper");
var import_Avatar = require("./Avatar");
var import_CompositionInput = require("./CompositionInput");
var import_ContactName = require("./conversation/ContactName");
var import_EmojiButton = require("./emoji/EmojiButton");
var import_Emojify = require("./conversation/Emojify");
var import_MessageBody = require("./conversation/MessageBody");
var import_MessageTimestamp = require("./conversation/MessageTimestamp");
var import_Modal = require("./Modal");
var import_Quote = require("./conversation/Quote");
var import_ReactionPicker = require("./conversation/ReactionPicker");
var import_Tabs = require("./Tabs");
var import_theme = require("../util/theme");
var import_Util = require("../types/Util");
var import_Colors = require("../types/Colors");
var import_getStoryReplyText = require("../util/getStoryReplyText");
var Tab = /* @__PURE__ */ ((Tab2) => {
  Tab2["Replies"] = "Replies";
  Tab2["Views"] = "Views";
  return Tab2;
})(Tab || {});
const StoryViewsNRepliesModal = /* @__PURE__ */ __name(({
  authorTitle,
  getPreferredBadge,
  i18n,
  isGroupStory,
  isMyStory,
  onClose,
  onReact,
  onReply,
  onSetSkinTone,
  onTextTooLong,
  onUseEmoji,
  preferredReactionEmoji,
  recentEmojis,
  renderEmojiPicker,
  replies,
  skinTone,
  storyPreviewAttachment,
  views
}) => {
  const inputApiRef = (0, import_react.useRef)();
  const [bottom, setBottom] = (0, import_react.useState)(null);
  const [messageBodyText, setMessageBodyText] = (0, import_react.useState)("");
  const [showReactionPicker, setShowReactionPicker] = (0, import_react.useState)(false);
  const focusComposer = (0, import_react.useCallback)(() => {
    if (inputApiRef.current) {
      inputApiRef.current.focus();
    }
  }, [inputApiRef]);
  const insertEmoji = (0, import_react.useCallback)((e) => {
    if (inputApiRef.current) {
      inputApiRef.current.insertEmoji(e);
      onUseEmoji(e);
    }
  }, [inputApiRef, onUseEmoji]);
  const [referenceElement, setReferenceElement] = (0, import_react.useState)(null);
  const [popperElement, setPopperElement] = (0, import_react.useState)(null);
  const { styles, attributes } = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    placement: "top-start",
    strategy: "fixed"
  });
  (0, import_react.useEffect)(() => {
    if (replies.length) {
      bottom?.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottom, replies.length]);
  let composerElement;
  if (!isMyStory) {
    composerElement = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, !isGroupStory && /* @__PURE__ */ import_react.default.createElement(import_Quote.Quote, {
      authorTitle,
      conversationColor: "ultramarine",
      i18n,
      isFromMe: false,
      isGiftBadge: false,
      isStoryReply: true,
      isViewOnce: false,
      moduleClassName: "StoryViewsNRepliesModal__quote",
      rawAttachment: storyPreviewAttachment,
      referencedMessageNotFound: false,
      text: (0, import_getStoryReplyText.getStoryReplyText)(i18n, storyPreviewAttachment)
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__compose-container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__composer"
    }, /* @__PURE__ */ import_react.default.createElement(import_CompositionInput.CompositionInput, {
      draftText: messageBodyText,
      getPreferredBadge,
      i18n,
      inputApi: inputApiRef,
      moduleClassName: "StoryViewsNRepliesModal__input",
      onEditorStateChange: (messageText) => {
        setMessageBodyText(messageText);
      },
      onPickEmoji: insertEmoji,
      onSubmit: (...args) => {
        inputApiRef.current?.reset();
        onReply(...args);
      },
      onTextTooLong,
      placeholder: isGroupStory ? i18n("StoryViewer__reply-group") : i18n("StoryViewer__reply"),
      theme: import_Util.ThemeType.dark
    }, /* @__PURE__ */ import_react.default.createElement(import_EmojiButton.EmojiButton, {
      className: "StoryViewsNRepliesModal__emoji-button",
      i18n,
      onPickEmoji: insertEmoji,
      onClose: focusComposer,
      recentEmojis,
      skinTone,
      onSetSkinTone
    }))), /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("StoryViewsNRepliesModal__react"),
      className: "StoryViewsNRepliesModal__react",
      onClick: () => {
        setShowReactionPicker(!showReactionPicker);
      },
      ref: setReferenceElement,
      type: "button"
    }), showReactionPicker && /* @__PURE__ */ import_react.default.createElement("div", {
      ref: setPopperElement,
      style: styles.popper,
      ...attributes.popper
    }, /* @__PURE__ */ import_react.default.createElement(import_ReactionPicker.ReactionPicker, {
      i18n,
      onClose: () => {
        setShowReactionPicker(false);
      },
      onPick: (emoji) => {
        setShowReactionPicker(false);
        onReact(emoji);
      },
      onSetSkinTone,
      preferredReactionEmoji,
      renderEmojiPicker
    }))));
  }
  let repliesElement;
  if (replies.length) {
    repliesElement = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__replies"
    }, replies.map((reply) => reply.reactionEmoji ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__reaction",
      key: reply.id
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__reaction--container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: reply.acceptedMessageRequest,
      avatarPath: reply.avatarPath,
      badge: void 0,
      color: (0, import_Colors.getAvatarColor)(reply.color),
      conversationType: "direct",
      i18n,
      isMe: Boolean(reply.isMe),
      name: reply.name,
      profileName: reply.profileName,
      sharedGroupNames: reply.sharedGroupNames || [],
      size: import_Avatar.AvatarSize.TWENTY_EIGHT,
      title: reply.title
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__reaction--body"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__reply--title"
    }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      contactNameColor: reply.contactNameColor,
      title: reply.title
    })), i18n("StoryViewsNRepliesModal__reacted"), /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
      i18n,
      module: "StoryViewsNRepliesModal__reply--timestamp",
      timestamp: reply.timestamp
    }))), /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
      text: reply.reactionEmoji
    })) : /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__reply",
      key: reply.id
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: reply.acceptedMessageRequest,
      avatarPath: reply.avatarPath,
      badge: void 0,
      color: (0, import_Colors.getAvatarColor)(reply.color),
      conversationType: "direct",
      i18n,
      isMe: Boolean(reply.isMe),
      name: reply.name,
      profileName: reply.profileName,
      sharedGroupNames: reply.sharedGroupNames || [],
      size: import_Avatar.AvatarSize.TWENTY_EIGHT,
      title: reply.title
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("StoryViewsNRepliesModal__message-bubble", {
        "StoryViewsNRepliesModal__message-bubble--doe": Boolean(reply.deletedForEveryone)
      })
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__reply--title"
    }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      contactNameColor: reply.contactNameColor,
      title: reply.title
    })), /* @__PURE__ */ import_react.default.createElement(import_MessageBody.MessageBody, {
      disableJumbomoji: true,
      i18n,
      text: reply.deletedForEveryone ? i18n("message--deletedForEveryone") : String(reply.body)
    }), /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
      i18n,
      module: "StoryViewsNRepliesModal__reply--timestamp",
      timestamp: reply.timestamp
    })))), /* @__PURE__ */ import_react.default.createElement("div", {
      ref: setBottom
    }));
  } else if (isGroupStory) {
    repliesElement = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryViewsNRepliesModal__replies--none"
    }, i18n("StoryViewsNRepliesModal__no-replies"));
  }
  const viewsElement = views.length ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewsNRepliesModal__views"
  }, views.map((view) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewsNRepliesModal__view",
    key: view.timestamp
  }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: view.acceptedMessageRequest,
    avatarPath: view.avatarPath,
    badge: void 0,
    color: (0, import_Colors.getAvatarColor)(view.color),
    conversationType: "direct",
    i18n,
    isMe: Boolean(view.isMe),
    name: view.name,
    profileName: view.profileName,
    sharedGroupNames: view.sharedGroupNames || [],
    size: import_Avatar.AvatarSize.TWENTY_EIGHT,
    title: view.title
  }), /* @__PURE__ */ import_react.default.createElement("span", {
    className: "StoryViewsNRepliesModal__view--name"
  }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    contactNameColor: view.contactNameColor,
    title: view.title
  }))), /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
    i18n,
    module: "StoryViewsNRepliesModal__view--timestamp",
    timestamp: view.timestamp
  })))) : void 0;
  const tabsElement = views.length && replies.length ? /* @__PURE__ */ import_react.default.createElement(import_Tabs.Tabs, {
    initialSelectedTab: "Views" /* Views */,
    moduleClassName: "StoryViewsNRepliesModal__tabs",
    tabs: [
      {
        id: "Views" /* Views */,
        label: i18n("StoryViewsNRepliesModal__tab--views")
      },
      {
        id: "Replies" /* Replies */,
        label: i18n("StoryViewsNRepliesModal__tab--replies")
      }
    ]
  }, ({ selectedTab }) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, selectedTab === "Views" /* Views */ && viewsElement, selectedTab === "Replies" /* Replies */ && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, repliesElement, composerElement))) : void 0;
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    i18n,
    moduleClassName: "StoryViewsNRepliesModal",
    onClose,
    useFocusTrap: Boolean(composerElement),
    theme: import_theme.Theme.Dark
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      "StoryViewsNRepliesModal--group": Boolean(isGroupStory)
    })
  }, tabsElement || /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, viewsElement || repliesElement, composerElement)));
}, "StoryViewsNRepliesModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoryViewsNRepliesModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VQb3BwZXIgfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBCb2R5UmFuZ2VUeXBlLCBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IENvbnRhY3ROYW1lQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBFbW9qaVBpY2tEYXRhVHlwZSB9IGZyb20gJy4vZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBJbnB1dEFwaSB9IGZyb20gJy4vQ29tcG9zaXRpb25JbnB1dCc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgdHlwZSB7IFJlbmRlckVtb2ppUGlja2VyUHJvcHMgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9SZWFjdGlvblBpY2tlcic7XG5pbXBvcnQgdHlwZSB7IFJlcGx5VHlwZSB9IGZyb20gJy4uL3R5cGVzL1N0b3JpZXMnO1xuaW1wb3J0IHsgQXZhdGFyLCBBdmF0YXJTaXplIH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHsgQ29tcG9zaXRpb25JbnB1dCB9IGZyb20gJy4vQ29tcG9zaXRpb25JbnB1dCc7XG5pbXBvcnQgeyBDb250YWN0TmFtZSB9IGZyb20gJy4vY29udmVyc2F0aW9uL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IEVtb2ppQnV0dG9uIH0gZnJvbSAnLi9lbW9qaS9FbW9qaUJ1dHRvbic7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vRW1vamlmeSc7XG5pbXBvcnQgeyBNZXNzYWdlQm9keSB9IGZyb20gJy4vY29udmVyc2F0aW9uL01lc3NhZ2VCb2R5JztcbmltcG9ydCB7IE1lc3NhZ2VUaW1lc3RhbXAgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9NZXNzYWdlVGltZXN0YW1wJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgeyBRdW90ZSB9IGZyb20gJy4vY29udmVyc2F0aW9uL1F1b3RlJztcbmltcG9ydCB7IFJlYWN0aW9uUGlja2VyIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vUmVhY3Rpb25QaWNrZXInO1xuaW1wb3J0IHsgVGFicyB9IGZyb20gJy4vVGFicyc7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRBdmF0YXJDb2xvciB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBnZXRTdG9yeVJlcGx5VGV4dCB9IGZyb20gJy4uL3V0aWwvZ2V0U3RvcnlSZXBseVRleHQnO1xuXG50eXBlIFZpZXdUeXBlID0gUGljazxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgfCAnYXZhdGFyUGF0aCdcbiAgfCAnY29sb3InXG4gIHwgJ2lzTWUnXG4gIHwgJ25hbWUnXG4gIHwgJ3Byb2ZpbGVOYW1lJ1xuICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICB8ICd0aXRsZSdcbj4gJiB7XG4gIGNvbnRhY3ROYW1lQ29sb3I/OiBDb250YWN0TmFtZUNvbG9yVHlwZTtcbiAgdGltZXN0YW1wOiBudW1iZXI7XG59O1xuXG5lbnVtIFRhYiB7XG4gIFJlcGxpZXMgPSAnUmVwbGllcycsXG4gIFZpZXdzID0gJ1ZpZXdzJyxcbn1cblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBhdXRob3JUaXRsZTogc3RyaW5nO1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzR3JvdXBTdG9yeT86IGJvb2xlYW47XG4gIGlzTXlTdG9yeT86IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIG9uUmVhY3Q6IChlbW9qaTogc3RyaW5nKSA9PiB1bmtub3duO1xuICBvblJlcGx5OiAoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG1lbnRpb25zOiBBcnJheTxCb2R5UmFuZ2VUeXBlPixcbiAgICB0aW1lc3RhbXA6IG51bWJlclxuICApID0+IHVua25vd247XG4gIG9uU2V0U2tpblRvbmU6ICh0b25lOiBudW1iZXIpID0+IHVua25vd247XG4gIG9uVGV4dFRvb0xvbmc6ICgpID0+IHVua25vd247XG4gIG9uVXNlRW1vamk6IChfOiBFbW9qaVBpY2tEYXRhVHlwZSkgPT4gdW5rbm93bjtcbiAgcHJlZmVycmVkUmVhY3Rpb25FbW9qaTogQXJyYXk8c3RyaW5nPjtcbiAgcmVjZW50RW1vamlzPzogQXJyYXk8c3RyaW5nPjtcbiAgcmVuZGVyRW1vamlQaWNrZXI6IChwcm9wczogUmVuZGVyRW1vamlQaWNrZXJQcm9wcykgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlcGxpZXM6IEFycmF5PFJlcGx5VHlwZT47XG4gIHNraW5Ub25lPzogbnVtYmVyO1xuICBzdG9yeVByZXZpZXdBdHRhY2htZW50PzogQXR0YWNobWVudFR5cGU7XG4gIHZpZXdzOiBBcnJheTxWaWV3VHlwZT47XG59O1xuXG5leHBvcnQgY29uc3QgU3RvcnlWaWV3c05SZXBsaWVzTW9kYWwgPSAoe1xuICBhdXRob3JUaXRsZSxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIGlzR3JvdXBTdG9yeSxcbiAgaXNNeVN0b3J5LFxuICBvbkNsb3NlLFxuICBvblJlYWN0LFxuICBvblJlcGx5LFxuICBvblNldFNraW5Ub25lLFxuICBvblRleHRUb29Mb25nLFxuICBvblVzZUVtb2ppLFxuICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICByZWNlbnRFbW9qaXMsXG4gIHJlbmRlckVtb2ppUGlja2VyLFxuICByZXBsaWVzLFxuICBza2luVG9uZSxcbiAgc3RvcnlQcmV2aWV3QXR0YWNobWVudCxcbiAgdmlld3MsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGlucHV0QXBpUmVmID0gdXNlUmVmPElucHV0QXBpIHwgdW5kZWZpbmVkPigpO1xuICBjb25zdCBbYm90dG9tLCBzZXRCb3R0b21dID0gdXNlU3RhdGU8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW21lc3NhZ2VCb2R5VGV4dCwgc2V0TWVzc2FnZUJvZHlUZXh0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dSZWFjdGlvblBpY2tlciwgc2V0U2hvd1JlYWN0aW9uUGlja2VyXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBmb2N1c0NvbXBvc2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpbnB1dEFwaVJlZi5jdXJyZW50KSB7XG4gICAgICBpbnB1dEFwaVJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgfVxuICB9LCBbaW5wdXRBcGlSZWZdKTtcblxuICBjb25zdCBpbnNlcnRFbW9qaSA9IHVzZUNhbGxiYWNrKFxuICAgIChlOiBFbW9qaVBpY2tEYXRhVHlwZSkgPT4ge1xuICAgICAgaWYgKGlucHV0QXBpUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgaW5wdXRBcGlSZWYuY3VycmVudC5pbnNlcnRFbW9qaShlKTtcbiAgICAgICAgb25Vc2VFbW9qaShlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpbnB1dEFwaVJlZiwgb25Vc2VFbW9qaV1cbiAgKTtcblxuICBjb25zdCBbcmVmZXJlbmNlRWxlbWVudCwgc2V0UmVmZXJlbmNlRWxlbWVudF0gPVxuICAgIHVzZVN0YXRlPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtwb3BwZXJFbGVtZW50LCBzZXRQb3BwZXJFbGVtZW50XSA9IHVzZVN0YXRlPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4oXG4gICAgbnVsbFxuICApO1xuXG4gIGNvbnN0IHsgc3R5bGVzLCBhdHRyaWJ1dGVzIH0gPSB1c2VQb3BwZXIocmVmZXJlbmNlRWxlbWVudCwgcG9wcGVyRWxlbWVudCwge1xuICAgIHBsYWNlbWVudDogJ3RvcC1zdGFydCcsXG4gICAgc3RyYXRlZ3k6ICdmaXhlZCcsXG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlcGxpZXMubGVuZ3RoKSB7XG4gICAgICBib3R0b20/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgIH1cbiAgfSwgW2JvdHRvbSwgcmVwbGllcy5sZW5ndGhdKTtcblxuICBsZXQgY29tcG9zZXJFbGVtZW50OiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICBpZiAoIWlzTXlTdG9yeSkge1xuICAgIGNvbXBvc2VyRWxlbWVudCA9IChcbiAgICAgIDw+XG4gICAgICAgIHshaXNHcm91cFN0b3J5ICYmIChcbiAgICAgICAgICA8UXVvdGVcbiAgICAgICAgICAgIGF1dGhvclRpdGxlPXthdXRob3JUaXRsZX1cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkNvbG9yPVwidWx0cmFtYXJpbmVcIlxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlzRnJvbU1lPXtmYWxzZX1cbiAgICAgICAgICAgIGlzR2lmdEJhZGdlPXtmYWxzZX1cbiAgICAgICAgICAgIGlzU3RvcnlSZXBseVxuICAgICAgICAgICAgaXNWaWV3T25jZT17ZmFsc2V9XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fcXVvdGVcIlxuICAgICAgICAgICAgcmF3QXR0YWNobWVudD17c3RvcnlQcmV2aWV3QXR0YWNobWVudH1cbiAgICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ9e2ZhbHNlfVxuICAgICAgICAgICAgdGV4dD17Z2V0U3RvcnlSZXBseVRleHQoaTE4biwgc3RvcnlQcmV2aWV3QXR0YWNobWVudCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fY29tcG9zZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsX19jb21wb3NlclwiPlxuICAgICAgICAgICAgPENvbXBvc2l0aW9uSW5wdXRcbiAgICAgICAgICAgICAgZHJhZnRUZXh0PXttZXNzYWdlQm9keVRleHR9XG4gICAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaW5wdXRBcGk9e2lucHV0QXBpUmVmfVxuICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9faW5wdXRcIlxuICAgICAgICAgICAgICBvbkVkaXRvclN0YXRlQ2hhbmdlPXttZXNzYWdlVGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZUJvZHlUZXh0KG1lc3NhZ2VUZXh0KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25QaWNrRW1vamk9e2luc2VydEVtb2ppfVxuICAgICAgICAgICAgICBvblN1Ym1pdD17KC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBpbnB1dEFwaVJlZi5jdXJyZW50Py5yZXNldCgpO1xuICAgICAgICAgICAgICAgIG9uUmVwbHkoLi4uYXJncyk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIG9uVGV4dFRvb0xvbmc9e29uVGV4dFRvb0xvbmd9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcbiAgICAgICAgICAgICAgICBpc0dyb3VwU3RvcnlcbiAgICAgICAgICAgICAgICAgID8gaTE4bignU3RvcnlWaWV3ZXJfX3JlcGx5LWdyb3VwJylcbiAgICAgICAgICAgICAgICAgIDogaTE4bignU3RvcnlWaWV3ZXJfX3JlcGx5JylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGVtZT17VGhlbWVUeXBlLmRhcmt9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxFbW9qaUJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsX19lbW9qaS1idXR0b25cIlxuICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgb25QaWNrRW1vamk9e2luc2VydEVtb2ppfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2ZvY3VzQ29tcG9zZXJ9XG4gICAgICAgICAgICAgICAgcmVjZW50RW1vamlzPXtyZWNlbnRFbW9qaXN9XG4gICAgICAgICAgICAgICAgc2tpblRvbmU9e3NraW5Ub25lfVxuICAgICAgICAgICAgICAgIG9uU2V0U2tpblRvbmU9e29uU2V0U2tpblRvbmV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbXBvc2l0aW9uSW5wdXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3JlYWN0Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fcmVhY3RcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRTaG93UmVhY3Rpb25QaWNrZXIoIXNob3dSZWFjdGlvblBpY2tlcik7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcmVmPXtzZXRSZWZlcmVuY2VFbGVtZW50fVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2hvd1JlYWN0aW9uUGlja2VyICYmIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXtzZXRQb3BwZXJFbGVtZW50fVxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnBvcHBlcn1cbiAgICAgICAgICAgICAgey4uLmF0dHJpYnV0ZXMucG9wcGVyfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVhY3Rpb25QaWNrZXJcbiAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFNob3dSZWFjdGlvblBpY2tlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvblBpY2s9e2Vtb2ppID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFNob3dSZWFjdGlvblBpY2tlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICBvblJlYWN0KGVtb2ppKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uU2V0U2tpblRvbmU9e29uU2V0U2tpblRvbmV9XG4gICAgICAgICAgICAgICAgcHJlZmVycmVkUmVhY3Rpb25FbW9qaT17cHJlZmVycmVkUmVhY3Rpb25FbW9qaX1cbiAgICAgICAgICAgICAgICByZW5kZXJFbW9qaVBpY2tlcj17cmVuZGVyRW1vamlQaWNrZXJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICBsZXQgcmVwbGllc0VsZW1lbnQ6IEpTWC5FbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gIGlmIChyZXBsaWVzLmxlbmd0aCkge1xuICAgIHJlcGxpZXNFbGVtZW50ID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fcmVwbGllc1wiPlxuICAgICAgICB7cmVwbGllcy5tYXAocmVwbHkgPT5cbiAgICAgICAgICByZXBseS5yZWFjdGlvbkVtb2ppID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fcmVhY3Rpb25cIiBrZXk9e3JlcGx5LmlkfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fcmVhY3Rpb24tLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e3JlcGx5LmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgICAgICAgICBhdmF0YXJQYXRoPXtyZXBseS5hdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgIGNvbG9yPXtnZXRBdmF0YXJDb2xvcihyZXBseS5jb2xvcil9XG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICBpc01lPXtCb29sZWFuKHJlcGx5LmlzTWUpfVxuICAgICAgICAgICAgICAgICAgbmFtZT17cmVwbHkubmFtZX1cbiAgICAgICAgICAgICAgICAgIHByb2ZpbGVOYW1lPXtyZXBseS5wcm9maWxlTmFtZX1cbiAgICAgICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e3JlcGx5LnNoYXJlZEdyb3VwTmFtZXMgfHwgW119XG4gICAgICAgICAgICAgICAgICBzaXplPXtBdmF0YXJTaXplLlRXRU5UWV9FSUdIVH1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtyZXBseS50aXRsZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3JlYWN0aW9uLS1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsX19yZXBseS0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgY29udGFjdE5hbWVDb2xvcj17cmVwbHkuY29udGFjdE5hbWVDb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17cmVwbHkudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fcmVhY3RlZCcpfVxuICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VUaW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3JlcGx5LS10aW1lc3RhbXBcIlxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA9e3JlcGx5LnRpbWVzdGFtcH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8RW1vamlmeSB0ZXh0PXtyZXBseS5yZWFjdGlvbkVtb2ppfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3JlcGx5XCIga2V5PXtyZXBseS5pZH0+XG4gICAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtyZXBseS5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgICAgICAgIGF2YXRhclBhdGg9e3JlcGx5LmF2YXRhclBhdGh9XG4gICAgICAgICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICBjb2xvcj17Z2V0QXZhdGFyQ29sb3IocmVwbHkuY29sb3IpfVxuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgaXNNZT17Qm9vbGVhbihyZXBseS5pc01lKX1cbiAgICAgICAgICAgICAgICBuYW1lPXtyZXBseS5uYW1lfVxuICAgICAgICAgICAgICAgIHByb2ZpbGVOYW1lPXtyZXBseS5wcm9maWxlTmFtZX1cbiAgICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtyZXBseS5zaGFyZWRHcm91cE5hbWVzIHx8IFtdfVxuICAgICAgICAgICAgICAgIHNpemU9e0F2YXRhclNpemUuVFdFTlRZX0VJR0hUfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtyZXBseS50aXRsZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICdTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fbWVzc2FnZS1idWJibGUnLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAnU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX21lc3NhZ2UtYnViYmxlLS1kb2UnOiBCb29sZWFuKFxuICAgICAgICAgICAgICAgICAgICAgIHJlcGx5LmRlbGV0ZWRGb3JFdmVyeW9uZVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsX19yZXBseS0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIDxDb250YWN0TmFtZVxuICAgICAgICAgICAgICAgICAgICBjb250YWN0TmFtZUNvbG9yPXtyZXBseS5jb250YWN0TmFtZUNvbG9yfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17cmVwbHkudGl0bGV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPE1lc3NhZ2VCb2R5XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlSnVtYm9tb2ppXG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgdGV4dD17XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5LmRlbGV0ZWRGb3JFdmVyeW9uZVxuICAgICAgICAgICAgICAgICAgICAgID8gaTE4bignbWVzc2FnZS0tZGVsZXRlZEZvckV2ZXJ5b25lJylcbiAgICAgICAgICAgICAgICAgICAgICA6IFN0cmluZyhyZXBseS5ib2R5KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8TWVzc2FnZVRpbWVzdGFtcFxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIG1vZHVsZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsX19yZXBseS0tdGltZXN0YW1wXCJcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcD17cmVwbHkudGltZXN0YW1wfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgICA8ZGl2IHJlZj17c2V0Qm90dG9tfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChpc0dyb3VwU3RvcnkpIHtcbiAgICByZXBsaWVzRWxlbWVudCA9IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3JlcGxpZXMtLW5vbmVcIj5cbiAgICAgICAge2kxOG4oJ1N0b3J5Vmlld3NOUmVwbGllc01vZGFsX19uby1yZXBsaWVzJyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29uc3Qgdmlld3NFbGVtZW50ID0gdmlld3MubGVuZ3RoID8gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3ZpZXdzXCI+XG4gICAgICB7dmlld3MubWFwKHZpZXcgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsX192aWV3XCIga2V5PXt2aWV3LnRpbWVzdGFtcH0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17dmlldy5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgICAgICBhdmF0YXJQYXRoPXt2aWV3LmF2YXRhclBhdGh9XG4gICAgICAgICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgIGNvbG9yPXtnZXRBdmF0YXJDb2xvcih2aWV3LmNvbG9yKX1cbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIGlzTWU9e0Jvb2xlYW4odmlldy5pc01lKX1cbiAgICAgICAgICAgICAgbmFtZT17dmlldy5uYW1lfVxuICAgICAgICAgICAgICBwcm9maWxlTmFtZT17dmlldy5wcm9maWxlTmFtZX1cbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17dmlldy5zaGFyZWRHcm91cE5hbWVzIHx8IFtdfVxuICAgICAgICAgICAgICBzaXplPXtBdmF0YXJTaXplLlRXRU5UWV9FSUdIVH1cbiAgICAgICAgICAgICAgdGl0bGU9e3ZpZXcudGl0bGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3ZpZXctLW5hbWVcIj5cbiAgICAgICAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgICAgICAgY29udGFjdE5hbWVDb2xvcj17dmlldy5jb250YWN0TmFtZUNvbG9yfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt2aWV3LnRpdGxlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxNZXNzYWdlVGltZXN0YW1wXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgbW9kdWxlPVwiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3ZpZXctLXRpbWVzdGFtcFwiXG4gICAgICAgICAgICB0aW1lc3RhbXA9e3ZpZXcudGltZXN0YW1wfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICkgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgdGFic0VsZW1lbnQgPVxuICAgIHZpZXdzLmxlbmd0aCAmJiByZXBsaWVzLmxlbmd0aCA/IChcbiAgICAgIDxUYWJzXG4gICAgICAgIGluaXRpYWxTZWxlY3RlZFRhYj17VGFiLlZpZXdzfVxuICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbF9fdGFic1wiXG4gICAgICAgIHRhYnM9e1tcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogVGFiLlZpZXdzLFxuICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ1N0b3J5Vmlld3NOUmVwbGllc01vZGFsX190YWItLXZpZXdzJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogVGFiLlJlcGxpZXMsXG4gICAgICAgICAgICBsYWJlbDogaTE4bignU3RvcnlWaWV3c05SZXBsaWVzTW9kYWxfX3RhYi0tcmVwbGllcycpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHsoeyBzZWxlY3RlZFRhYiB9KSA9PiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtzZWxlY3RlZFRhYiA9PT0gVGFiLlZpZXdzICYmIHZpZXdzRWxlbWVudH1cbiAgICAgICAgICAgIHtzZWxlY3RlZFRhYiA9PT0gVGFiLlJlcGxpZXMgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtyZXBsaWVzRWxlbWVudH1cbiAgICAgICAgICAgICAgICB7Y29tcG9zZXJFbGVtZW50fVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L1RhYnM+XG4gICAgKSA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbFxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlN0b3J5Vmlld3NOUmVwbGllc01vZGFsXCJcbiAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICB1c2VGb2N1c1RyYXA9e0Jvb2xlYW4oY29tcG9zZXJFbGVtZW50KX1cbiAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAnU3RvcnlWaWV3c05SZXBsaWVzTW9kYWwtLWdyb3VwJzogQm9vbGVhbihpc0dyb3VwU3RvcnkpLFxuICAgICAgICB9KX1cbiAgICAgID5cbiAgICAgICAge3RhYnNFbGVtZW50IHx8IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAge3ZpZXdzRWxlbWVudCB8fCByZXBsaWVzRWxlbWVudH1cbiAgICAgICAgICAgIHtjb21wb3NlckVsZW1lbnR9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L01vZGFsPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0U7QUFDaEUsd0JBQXVCO0FBQ3ZCLDBCQUEwQjtBQVUxQixvQkFBbUM7QUFDbkMsOEJBQWlDO0FBQ2pDLHlCQUE0QjtBQUM1Qix5QkFBNEI7QUFDNUIscUJBQXdCO0FBQ3hCLHlCQUE0QjtBQUM1Qiw4QkFBaUM7QUFDakMsbUJBQXNCO0FBQ3RCLG1CQUFzQjtBQUN0Qiw0QkFBK0I7QUFDL0Isa0JBQXFCO0FBQ3JCLG1CQUFzQjtBQUN0QixrQkFBMEI7QUFDMUIsb0JBQStCO0FBQy9CLCtCQUFrQztBQWlCbEMsSUFBSyxNQUFMLGtCQUFLLFNBQUw7QUFDRSxvQkFBVTtBQUNWLGtCQUFRO0FBRkw7QUFBQTtBQThCRSxNQUFNLDBCQUEwQix3QkFBQztBQUFBLEVBQ3RDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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QUFDLGFBQ0MsbURBQUM7QUFBQSxJQUNDLHdCQUF3QixLQUFLO0FBQUEsSUFDN0IsWUFBWSxLQUFLO0FBQUEsSUFDakIsT0FBTztBQUFBLElBQ1AsT0FBTyxrQ0FBZSxLQUFLLEtBQUs7QUFBQSxJQUNoQyxrQkFBaUI7QUFBQSxJQUNqQjtBQUFBLElBQ0EsTUFBTSxRQUFRLEtBQUssSUFBSTtBQUFBLElBQ3ZCLE1BQU0sS0FBSztBQUFBLElBQ1gsYUFBYSxLQUFLO0FBQUEsSUFDbEIsa0JBQWtCLEtBQUssb0JBQW9CLENBQUM7QUFBQSxJQUM1QyxNQUFNLHlCQUFXO0FBQUEsSUFDakIsT0FBTyxLQUFLO0FBQUEsR0FDZCxHQUNBLG1EQUFDO0FBQUEsSUFBSyxXQUFVO0FBQUEsS0FDZCxtREFBQztBQUFBLElBQ0Msa0JBQWtCLEtBQUs7QUFBQSxJQUN2QixPQUFPLEtBQUs7QUFBQSxHQUNkLENBQ0YsQ0FDRixHQUNBLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsUUFBTztBQUFBLElBQ1AsV0FBVyxLQUFLO0FBQUEsR0FDbEIsQ0FDRixDQUNELENBQ0gsSUFDRTtBQUVKLFFBQU0sY0FDSixNQUFNLFVBQVUsUUFBUSxTQUN0QixtREFBQztBQUFBLElBQ0Msb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWdCO0FBQUEsSUFDaEIsTUFBTTtBQUFBLE1BQ0o7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSyxxQ0FBcUM7QUFBQSxNQUNuRDtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSyx1Q0FBdUM7QUFBQSxNQUNyRDtBQUFBLElBQ0Y7QUFBQSxLQUVDLENBQUMsRUFBRSxrQkFDRix3RkFDRyxnQkFBZ0IsdUJBQWEsY0FDN0IsZ0JBQWdCLDJCQUNmLHdGQUNHLGdCQUNBLGVBQ0gsQ0FFSixDQUVKLElBQ0U7QUFFTixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsaUJBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGNBQWMsUUFBUSxlQUFlO0FBQUEsSUFDckMsT0FBTyxtQkFBTTtBQUFBLEtBRWIsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQVc7QUFBQSxNQUNwQixrQ0FBa0MsUUFBUSxZQUFZO0FBQUEsSUFDeEQsQ0FBQztBQUFBLEtBRUEsZUFDQyx3RkFDRyxnQkFBZ0IsZ0JBQ2hCLGVBQ0gsQ0FFSixDQUNGO0FBRUosR0FuVnVDOyIsCiAgIm5hbWVzIjogW10KfQo=
