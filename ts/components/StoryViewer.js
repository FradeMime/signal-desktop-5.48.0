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
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var StoryViewer_exports = {};
__export(StoryViewer_exports, {
  StoryViewer: () => StoryViewer
});
module.exports = __toCommonJS(StoryViewer_exports);
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_web = require("@react-spring/web");
var import_AnimatedEmojiGalore = require("./AnimatedEmojiGalore");
var import_Avatar = require("./Avatar");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_ContextMenu = require("./ContextMenu");
var import_Intl = require("./Intl");
var import_MessageTimestamp = require("./conversation/MessageTimestamp");
var import_StoryImage = require("./StoryImage");
var import_StoryViewsNRepliesModal = require("./StoryViewsNRepliesModal");
var import_theme = require("../util/theme");
var import_Colors = require("../types/Colors");
var import_getStoryBackground = require("../util/getStoryBackground");
var import_getStoryDuration = require("../util/getStoryDuration");
var import_graphemeAwareSlice = require("../util/graphemeAwareSlice");
var import_Attachment = require("../types/Attachment");
var import_useEscapeHandling = require("../hooks/useEscapeHandling");
var log = __toESM(require("../logging/log"));
const CAPTION_BUFFER = 20;
const CAPTION_INITIAL_LENGTH = 200;
const CAPTION_MAX_LENGTH = 700;
const MOUSE_IDLE_TIME = 3e3;
var Arrow = /* @__PURE__ */ ((Arrow2) => {
  Arrow2[Arrow2["None"] = 0] = "None";
  Arrow2[Arrow2["Left"] = 1] = "Left";
  Arrow2[Arrow2["Right"] = 2] = "Right";
  return Arrow2;
})(Arrow || {});
const StoryViewer = /* @__PURE__ */ __name(({
  conversationId,
  getPreferredBadge,
  group,
  hasAllStoriesMuted,
  i18n,
  loadStoryReplies,
  markStoryRead,
  onClose,
  onGoToConversation,
  onHideStory,
  onNextUserStories,
  onPrevUserStories,
  onReactToStory,
  onReplyToStory,
  onSetSkinTone,
  onTextTooLong,
  onUseEmoji,
  preferredReactionEmoji,
  queueStoryDownload,
  recentEmojis,
  renderEmojiPicker,
  replyState,
  skinTone,
  stories,
  toggleHasAllStoriesMuted,
  views
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = (0, import_react.useState)(0);
  const [storyDuration, setStoryDuration] = (0, import_react.useState)();
  const [isShowingContextMenu, setIsShowingContextMenu] = (0, import_react.useState)(false);
  const [hasConfirmHideStory, setHasConfirmHideStory] = (0, import_react.useState)(false);
  const [referenceElement, setReferenceElement] = (0, import_react.useState)(null);
  const [reactionEmoji, setReactionEmoji] = (0, import_react.useState)();
  const visibleStory = stories[currentStoryIndex];
  const { attachment, canReply, isHidden, messageId, timestamp } = visibleStory;
  const {
    acceptedMessageRequest,
    avatarPath,
    color,
    isMe,
    id,
    firstName,
    name,
    profileName,
    sharedGroupNames,
    title
  } = visibleStory.sender;
  const [hasReplyModal, setHasReplyModal] = (0, import_react.useState)(false);
  const onEscape = (0, import_react.useCallback)(() => {
    if (hasReplyModal) {
      setHasReplyModal(false);
    } else {
      onClose();
    }
  }, [hasReplyModal, onClose]);
  (0, import_useEscapeHandling.useEscapeHandling)(onEscape);
  const [hasExpandedCaption, setHasExpandedCaption] = (0, import_react.useState)(false);
  const caption = (0, import_react.useMemo)(() => {
    if (!attachment?.caption) {
      return;
    }
    return (0, import_graphemeAwareSlice.graphemeAwareSlice)(attachment.caption, hasExpandedCaption ? CAPTION_MAX_LENGTH : CAPTION_INITIAL_LENGTH, CAPTION_BUFFER);
  }, [attachment?.caption, hasExpandedCaption]);
  (0, import_react.useEffect)(() => {
    setHasExpandedCaption(false);
  }, [messageId]);
  const storiesRef = (0, import_react.useRef)(stories);
  (0, import_react.useEffect)(() => {
    const unreadStoryIndex = storiesRef.current.findIndex((story) => story.isUnread);
    log.info("stories.findUnreadStory", {
      unreadStoryIndex,
      stories: storiesRef.current.length
    });
    setCurrentStoryIndex(unreadStoryIndex < 0 ? 0 : unreadStoryIndex);
  }, [conversationId]);
  (0, import_react.useEffect)(() => {
    storiesRef.current = stories;
  }, [stories]);
  const showNextStory = (0, import_react.useCallback)(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setCurrentStoryIndex(0);
      onNextUserStories();
    }
  }, [currentStoryIndex, onNextUserStories, stories.length]);
  const showPrevStory = (0, import_react.useCallback)(() => {
    if (currentStoryIndex === 0) {
      onPrevUserStories();
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  }, [currentStoryIndex, onPrevUserStories]);
  (0, import_react.useEffect)(() => {
    let shouldCancel = false;
    (async function hydrateStoryDuration() {
      if (!attachment) {
        return;
      }
      const duration = await (0, import_getStoryDuration.getStoryDuration)(attachment);
      if (shouldCancel) {
        return;
      }
      log.info("stories.setStoryDuration", {
        contentType: attachment.textAttachment ? "text" : attachment.contentType,
        duration
      });
      setStoryDuration(duration);
    })();
    return () => {
      shouldCancel = true;
    };
  }, [attachment]);
  const [styles, spring] = (0, import_web.useSpring)(() => ({
    from: { width: 0 },
    to: { width: 100 },
    loop: true,
    onRest: {
      width: ({ value }) => {
        if (value === 100) {
          showNextStory();
        }
      }
    }
  }), [showNextStory]);
  (0, import_react.useEffect)(() => {
    if (!storyDuration) {
      spring.stop();
      return;
    }
    spring.start({
      config: {
        duration: storyDuration
      },
      from: { width: 0 },
      to: { width: 100 }
    });
    return () => {
      spring.stop();
    };
  }, [currentStoryIndex, spring, storyDuration]);
  const [pauseStory, setPauseStory] = (0, import_react.useState)(false);
  const shouldPauseViewing = hasConfirmHideStory || hasExpandedCaption || hasReplyModal || isShowingContextMenu || pauseStory || Boolean(reactionEmoji);
  (0, import_react.useEffect)(() => {
    if (shouldPauseViewing) {
      spring.pause();
    } else {
      spring.resume();
    }
  }, [shouldPauseViewing, spring]);
  (0, import_react.useEffect)(() => {
    markStoryRead(messageId);
    log.info("stories.markStoryRead", { messageId });
  }, [markStoryRead, messageId]);
  const storiesToDownload = (0, import_react.useMemo)(() => {
    return stories.filter((story) => !(0, import_Attachment.isDownloaded)(story.attachment) && !(0, import_Attachment.isDownloading)(story.attachment)).map((story) => story.messageId);
  }, [stories]);
  (0, import_react.useEffect)(() => {
    storiesToDownload.forEach((storyId) => queueStoryDownload(storyId));
  }, [queueStoryDownload, storiesToDownload]);
  const navigateStories = (0, import_react.useCallback)((ev) => {
    if (ev.key === "ArrowRight") {
      showNextStory();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (ev.key === "ArrowLeft") {
      showPrevStory();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, [showPrevStory, showNextStory]);
  (0, import_react.useEffect)(() => {
    document.addEventListener("keydown", navigateStories);
    return () => {
      document.removeEventListener("keydown", navigateStories);
    };
  }, [navigateStories]);
  const isGroupStory = Boolean(group?.id);
  (0, import_react.useEffect)(() => {
    if (!isGroupStory) {
      return;
    }
    loadStoryReplies(conversationId, messageId);
  }, [conversationId, isGroupStory, loadStoryReplies, messageId]);
  const [arrowToShow, setArrowToShow] = (0, import_react.useState)(0 /* None */);
  (0, import_react.useEffect)(() => {
    if (arrowToShow === 0 /* None */) {
      return;
    }
    let lastMouseMove;
    function updateLastMouseMove() {
      lastMouseMove = Date.now();
    }
    function checkMouseIdle() {
      requestAnimationFrame(() => {
        if (lastMouseMove && Date.now() - lastMouseMove > MOUSE_IDLE_TIME) {
          setArrowToShow(0 /* None */);
        } else {
          checkMouseIdle();
        }
      });
    }
    checkMouseIdle();
    document.addEventListener("mousemove", updateLastMouseMove);
    return () => {
      lastMouseMove = void 0;
      document.removeEventListener("mousemove", updateLastMouseMove);
    };
  }, [arrowToShow]);
  const replies = replyState && replyState.messageId === messageId ? replyState.replies : [];
  const viewCount = (views || []).length;
  const replyCount = replies.length;
  return /* @__PURE__ */ import_react.default.createElement(import_focus_trap_react.default, {
    focusTrapOptions: { allowOutsideClick: true }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__overlay",
    style: { background: (0, import_getStoryBackground.getStoryBackground)(attachment) }
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__content"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("back"),
    className: (0, import_classnames.default)("StoryViewer__arrow StoryViewer__arrow--left", {
      "StoryViewer__arrow--visible": arrowToShow === 1 /* Left */
    }),
    onClick: showPrevStory,
    onMouseMove: () => setArrowToShow(1 /* Left */),
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__protection StoryViewer__protection--top"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__container"
  }, /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
    attachment,
    i18n,
    isPaused: shouldPauseViewing,
    isMuted: hasAllStoriesMuted,
    label: i18n("lightboxImageAlt"),
    moduleClassName: "StoryViewer__story",
    queueStoryDownload,
    storyId: messageId
  }, reactionEmoji && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__animated-emojis"
  }, /* @__PURE__ */ import_react.default.createElement(import_AnimatedEmojiGalore.AnimatedEmojiGalore, {
    emoji: reactionEmoji,
    onAnimationEnd: () => {
      setReactionEmoji(void 0);
    }
  }))), hasExpandedCaption && /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close-popup"),
    className: "StoryViewer__caption__overlay",
    onClick: () => setHasExpandedCaption(false),
    type: "button"
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__meta"
  }, caption && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__caption"
  }, caption.text, caption.hasReadMore && !hasExpandedCaption && /* @__PURE__ */ import_react.default.createElement("button", {
    className: "MessageBody__read-more",
    onClick: () => {
      setHasExpandedCaption(true);
    },
    onKeyDown: (ev) => {
      if (ev.key === "Space" || ev.key === "Enter") {
        setHasExpandedCaption(true);
      }
    },
    type: "button"
  }, "...", i18n("MessageBody--read-more"))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__meta__playback-bar"
  }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    avatarPath,
    badge: void 0,
    color: (0, import_Colors.getAvatarColor)(color),
    conversationType: "direct",
    i18n,
    isMe: Boolean(isMe),
    name,
    profileName,
    sharedGroupNames,
    size: import_Avatar.AvatarSize.TWENTY_EIGHT,
    title
  }), group && /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: group.acceptedMessageRequest,
    avatarPath: group.avatarPath,
    badge: void 0,
    className: "StoryViewer__meta--group-avatar",
    color: (0, import_Colors.getAvatarColor)(group.color),
    conversationType: "group",
    i18n,
    isMe: false,
    name: group.name,
    profileName: group.profileName,
    sharedGroupNames: group.sharedGroupNames,
    size: import_Avatar.AvatarSize.TWENTY_EIGHT,
    title: group.title
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__meta--title"
  }, group ? i18n("Stories__from-to-group", {
    name: title,
    group: group.title
  }) : title), /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
    i18n,
    isRelativeTime: true,
    module: "StoryViewer__meta--timestamp",
    timestamp
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__meta__playback-controls"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": pauseStory ? i18n("StoryViewer__play") : i18n("StoryViewer__pause"),
    className: pauseStory ? "StoryViewer__play" : "StoryViewer__pause",
    onClick: () => setPauseStory(!pauseStory),
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": hasAllStoriesMuted ? i18n("StoryViewer__unmute") : i18n("StoryViewer__mute"),
    className: hasAllStoriesMuted ? "StoryViewer__unmute" : "StoryViewer__mute",
    onClick: toggleHasAllStoriesMuted,
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MyStories__more"),
    className: "StoryViewer__more",
    onClick: () => setIsShowingContextMenu(true),
    ref: setReferenceElement,
    type: "button"
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__progress"
  }, stories.map((story, index) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__progress--container",
    key: story.messageId
  }, currentStoryIndex === index ? /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    className: "StoryViewer__progress--bar",
    style: {
      width: (0, import_web.to)([styles.width], (width) => `${width}%`)
    }
  }) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__progress--bar",
    style: {
      width: currentStoryIndex < index ? "0%" : "100%"
    }
  })))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__actions"
  }, canReply && /* @__PURE__ */ import_react.default.createElement("button", {
    className: "StoryViewer__reply",
    onClick: () => setHasReplyModal(true),
    tabIndex: 0,
    type: "button"
  }, /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, viewCount > 0 || replyCount > 0 ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: "StoryViewer__reply__chevron"
  }, viewCount > 0 && (viewCount === 1 ? /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "MyStories__views--singular",
    components: [/* @__PURE__ */ import_react.default.createElement("strong", null, viewCount)]
  }) : /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "MyStories__views--plural",
    components: [/* @__PURE__ */ import_react.default.createElement("strong", null, viewCount)]
  })), viewCount > 0 && replyCount > 0 && " ", replyCount > 0 && (replyCount === 1 ? /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "MyStories__replies--singular",
    components: [/* @__PURE__ */ import_react.default.createElement("strong", null, replyCount)]
  }) : /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "MyStories__replies--plural",
    components: [/* @__PURE__ */ import_react.default.createElement("strong", null, replyCount)]
  }))) : null, !viewCount && !replyCount && /* @__PURE__ */ import_react.default.createElement("span", {
    className: "StoryViewer__reply__arrow"
  }, isGroupStory ? i18n("StoryViewer__reply-group") : i18n("StoryViewer__reply")))))), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("forward"),
    className: (0, import_classnames.default)("StoryViewer__arrow StoryViewer__arrow--right", {
      "StoryViewer__arrow--visible": arrowToShow === 2 /* Right */
    }),
    onClick: showNextStory,
    onMouseMove: () => setArrowToShow(2 /* Right */),
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryViewer__protection StoryViewer__protection--bottom"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: "StoryViewer__close-button",
    onClick: onClose,
    tabIndex: 0,
    type: "button"
  })), /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenuPopper, {
    isMenuShowing: isShowingContextMenu,
    menuOptions: [
      {
        icon: "StoryListItem__icon--hide",
        label: isHidden ? i18n("StoryListItem__unhide") : i18n("StoryListItem__hide"),
        onClick: () => {
          if (isHidden) {
            onHideStory(id);
          } else {
            setHasConfirmHideStory(true);
          }
        }
      },
      {
        icon: "StoryListItem__icon--chat",
        label: i18n("StoryListItem__go-to-chat"),
        onClick: () => {
          onGoToConversation(id);
        }
      }
    ],
    onClose: () => setIsShowingContextMenu(false),
    referenceElement,
    theme: import_theme.Theme.Dark
  }), hasReplyModal && canReply && /* @__PURE__ */ import_react.default.createElement(import_StoryViewsNRepliesModal.StoryViewsNRepliesModal, {
    authorTitle: firstName || title,
    getPreferredBadge,
    i18n,
    isGroupStory,
    isMyStory: isMe,
    onClose: () => setHasReplyModal(false),
    onReact: (emoji) => {
      onReactToStory(emoji, visibleStory);
      setHasReplyModal(false);
      setReactionEmoji(emoji);
    },
    onReply: (message, mentions, replyTimestamp) => {
      if (!isGroupStory) {
        setHasReplyModal(false);
      }
      onReplyToStory(message, mentions, replyTimestamp, visibleStory);
    },
    onSetSkinTone,
    onTextTooLong,
    onUseEmoji,
    preferredReactionEmoji,
    recentEmojis,
    renderEmojiPicker,
    replies,
    skinTone,
    storyPreviewAttachment: attachment,
    views: []
  }), hasConfirmHideStory && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: () => onHideStory(id),
        style: "affirmative",
        text: i18n("StoryListItem__hide-modal--confirm")
      }
    ],
    i18n,
    onClose: () => {
      setHasConfirmHideStory(false);
    }
  }, i18n("StoryListItem__hide-modal--body", [String(firstName)]))));
}, "StoryViewer");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoryViewer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlWaWV3ZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcC1yZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHtcbiAgdXNlQ2FsbGJhY2ssXG4gIHVzZUVmZmVjdCxcbiAgdXNlTWVtbyxcbiAgdXNlUmVmLFxuICB1c2VTdGF0ZSxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB1c2VTcHJpbmcsIGFuaW1hdGVkLCB0byB9IGZyb20gJ0ByZWFjdC1zcHJpbmcvd2ViJztcbmltcG9ydCB0eXBlIHsgQm9keVJhbmdlVHlwZSwgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IEVtb2ppUGlja0RhdGFUeXBlIH0gZnJvbSAnLi9lbW9qaS9FbW9qaVBpY2tlcic7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgdHlwZSB7IFJlbmRlckVtb2ppUGlja2VyUHJvcHMgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9SZWFjdGlvblBpY2tlcic7XG5pbXBvcnQgdHlwZSB7IFJlcGx5U3RhdGVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvU3Rvcmllcyc7XG5pbXBvcnQgdHlwZSB7IFN0b3J5Vmlld1R5cGUgfSBmcm9tICcuL1N0b3J5TGlzdEl0ZW0nO1xuaW1wb3J0IHsgQW5pbWF0ZWRFbW9qaUdhbG9yZSB9IGZyb20gJy4vQW5pbWF0ZWRFbW9qaUdhbG9yZSc7XG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhclNpemUgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBDb250ZXh0TWVudVBvcHBlciB9IGZyb20gJy4vQ29udGV4dE1lbnUnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4vSW50bCc7XG5pbXBvcnQgeyBNZXNzYWdlVGltZXN0YW1wIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vTWVzc2FnZVRpbWVzdGFtcCc7XG5pbXBvcnQgeyBTdG9yeUltYWdlIH0gZnJvbSAnLi9TdG9yeUltYWdlJztcbmltcG9ydCB7IFN0b3J5Vmlld3NOUmVwbGllc01vZGFsIH0gZnJvbSAnLi9TdG9yeVZpZXdzTlJlcGxpZXNNb2RhbCc7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuaW1wb3J0IHsgZ2V0QXZhdGFyQ29sb3IgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgZ2V0U3RvcnlCYWNrZ3JvdW5kIH0gZnJvbSAnLi4vdXRpbC9nZXRTdG9yeUJhY2tncm91bmQnO1xuaW1wb3J0IHsgZ2V0U3RvcnlEdXJhdGlvbiB9IGZyb20gJy4uL3V0aWwvZ2V0U3RvcnlEdXJhdGlvbic7XG5pbXBvcnQgeyBncmFwaGVtZUF3YXJlU2xpY2UgfSBmcm9tICcuLi91dGlsL2dyYXBoZW1lQXdhcmVTbGljZSc7XG5pbXBvcnQgeyBpc0Rvd25sb2FkZWQsIGlzRG93bmxvYWRpbmcgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IHVzZUVzY2FwZUhhbmRsaW5nIH0gZnJvbSAnLi4vaG9va3MvdXNlRXNjYXBlSGFuZGxpbmcnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGdyb3VwPzogUGljazxcbiAgICBDb252ZXJzYXRpb25UeXBlLFxuICAgIHwgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnXG4gICAgfCAnYXZhdGFyUGF0aCdcbiAgICB8ICdjb2xvcidcbiAgICB8ICdpZCdcbiAgICB8ICduYW1lJ1xuICAgIHwgJ3Byb2ZpbGVOYW1lJ1xuICAgIHwgJ3NoYXJlZEdyb3VwTmFtZXMnXG4gICAgfCAndGl0bGUnXG4gID47XG4gIGhhc0FsbFN0b3JpZXNNdXRlZDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgbG9hZFN0b3J5UmVwbGllczogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBtYXJrU3RvcnlSZWFkOiAobUlkOiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIG9uR29Ub0NvbnZlcnNhdGlvbjogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uSGlkZVN0b3J5OiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgb25OZXh0VXNlclN0b3JpZXM6ICgpID0+IHVua25vd247XG4gIG9uUHJldlVzZXJTdG9yaWVzOiAoKSA9PiB1bmtub3duO1xuICBvblNldFNraW5Ub25lOiAodG9uZTogbnVtYmVyKSA9PiB1bmtub3duO1xuICBvblRleHRUb29Mb25nOiAoKSA9PiB1bmtub3duO1xuICBvblJlYWN0VG9TdG9yeTogKGVtb2ppOiBzdHJpbmcsIHN0b3J5OiBTdG9yeVZpZXdUeXBlKSA9PiB1bmtub3duO1xuICBvblJlcGx5VG9TdG9yeTogKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBtZW50aW9uczogQXJyYXk8Qm9keVJhbmdlVHlwZT4sXG4gICAgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgc3Rvcnk6IFN0b3J5Vmlld1R5cGVcbiAgKSA9PiB1bmtub3duO1xuICBvblVzZUVtb2ppOiAoXzogRW1vamlQaWNrRGF0YVR5cGUpID0+IHVua25vd247XG4gIHByZWZlcnJlZFJlYWN0aW9uRW1vamk6IEFycmF5PHN0cmluZz47XG4gIHF1ZXVlU3RvcnlEb3dubG9hZDogKHN0b3J5SWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcmVjZW50RW1vamlzPzogQXJyYXk8c3RyaW5nPjtcbiAgcmVuZGVyRW1vamlQaWNrZXI6IChwcm9wczogUmVuZGVyRW1vamlQaWNrZXJQcm9wcykgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlcGx5U3RhdGU/OiBSZXBseVN0YXRlVHlwZTtcbiAgc2tpblRvbmU/OiBudW1iZXI7XG4gIHN0b3JpZXM6IEFycmF5PFN0b3J5Vmlld1R5cGU+O1xuICB0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWQ6ICgpID0+IHVua25vd247XG4gIHZpZXdzPzogQXJyYXk8c3RyaW5nPjtcbn07XG5cbmNvbnN0IENBUFRJT05fQlVGRkVSID0gMjA7XG5jb25zdCBDQVBUSU9OX0lOSVRJQUxfTEVOR1RIID0gMjAwO1xuY29uc3QgQ0FQVElPTl9NQVhfTEVOR1RIID0gNzAwO1xuY29uc3QgTU9VU0VfSURMRV9USU1FID0gMzAwMDtcblxuZW51bSBBcnJvdyB7XG4gIE5vbmUsXG4gIExlZnQsXG4gIFJpZ2h0LFxufVxuXG5leHBvcnQgY29uc3QgU3RvcnlWaWV3ZXIgPSAoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGdyb3VwLFxuICBoYXNBbGxTdG9yaWVzTXV0ZWQsXG4gIGkxOG4sXG4gIGxvYWRTdG9yeVJlcGxpZXMsXG4gIG1hcmtTdG9yeVJlYWQsXG4gIG9uQ2xvc2UsXG4gIG9uR29Ub0NvbnZlcnNhdGlvbixcbiAgb25IaWRlU3RvcnksXG4gIG9uTmV4dFVzZXJTdG9yaWVzLFxuICBvblByZXZVc2VyU3RvcmllcyxcbiAgb25SZWFjdFRvU3RvcnksXG4gIG9uUmVwbHlUb1N0b3J5LFxuICBvblNldFNraW5Ub25lLFxuICBvblRleHRUb29Mb25nLFxuICBvblVzZUVtb2ppLFxuICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICBxdWV1ZVN0b3J5RG93bmxvYWQsXG4gIHJlY2VudEVtb2ppcyxcbiAgcmVuZGVyRW1vamlQaWNrZXIsXG4gIHJlcGx5U3RhdGUsXG4gIHNraW5Ub25lLFxuICBzdG9yaWVzLFxuICB0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWQsXG4gIHZpZXdzLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbY3VycmVudFN0b3J5SW5kZXgsIHNldEN1cnJlbnRTdG9yeUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbc3RvcnlEdXJhdGlvbiwgc2V0U3RvcnlEdXJhdGlvbl0gPSB1c2VTdGF0ZTxudW1iZXIgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFtpc1Nob3dpbmdDb250ZXh0TWVudSwgc2V0SXNTaG93aW5nQ29udGV4dE1lbnVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaGFzQ29uZmlybUhpZGVTdG9yeSwgc2V0SGFzQ29uZmlybUhpZGVTdG9yeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtyZWZlcmVuY2VFbGVtZW50LCBzZXRSZWZlcmVuY2VFbGVtZW50XSA9XG4gICAgdXNlU3RhdGU8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3JlYWN0aW9uRW1vamksIHNldFJlYWN0aW9uRW1vamldID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPigpO1xuXG4gIGNvbnN0IHZpc2libGVTdG9yeSA9IHN0b3JpZXNbY3VycmVudFN0b3J5SW5kZXhdO1xuXG4gIGNvbnN0IHsgYXR0YWNobWVudCwgY2FuUmVwbHksIGlzSGlkZGVuLCBtZXNzYWdlSWQsIHRpbWVzdGFtcCB9ID0gdmlzaWJsZVN0b3J5O1xuICBjb25zdCB7XG4gICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICBhdmF0YXJQYXRoLFxuICAgIGNvbG9yLFxuICAgIGlzTWUsXG4gICAgaWQsXG4gICAgZmlyc3ROYW1lLFxuICAgIG5hbWUsXG4gICAgcHJvZmlsZU5hbWUsXG4gICAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgICB0aXRsZSxcbiAgfSA9IHZpc2libGVTdG9yeS5zZW5kZXI7XG5cbiAgY29uc3QgW2hhc1JlcGx5TW9kYWwsIHNldEhhc1JlcGx5TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IG9uRXNjYXBlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChoYXNSZXBseU1vZGFsKSB7XG4gICAgICBzZXRIYXNSZXBseU1vZGFsKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25DbG9zZSgpO1xuICAgIH1cbiAgfSwgW2hhc1JlcGx5TW9kYWwsIG9uQ2xvc2VdKTtcblxuICB1c2VFc2NhcGVIYW5kbGluZyhvbkVzY2FwZSk7XG5cbiAgLy8gQ2FwdGlvbiByZWxhdGVkIGhvb2tzXG4gIGNvbnN0IFtoYXNFeHBhbmRlZENhcHRpb24sIHNldEhhc0V4cGFuZGVkQ2FwdGlvbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3QgY2FwdGlvbiA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghYXR0YWNobWVudD8uY2FwdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBncmFwaGVtZUF3YXJlU2xpY2UoXG4gICAgICBhdHRhY2htZW50LmNhcHRpb24sXG4gICAgICBoYXNFeHBhbmRlZENhcHRpb24gPyBDQVBUSU9OX01BWF9MRU5HVEggOiBDQVBUSU9OX0lOSVRJQUxfTEVOR1RILFxuICAgICAgQ0FQVElPTl9CVUZGRVJcbiAgICApO1xuICB9LCBbYXR0YWNobWVudD8uY2FwdGlvbiwgaGFzRXhwYW5kZWRDYXB0aW9uXSk7XG5cbiAgLy8gUmVzZXQgZXhwYW5zaW9uIGlmIG1lc3NhZ2VJZCBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SGFzRXhwYW5kZWRDYXB0aW9uKGZhbHNlKTtcbiAgfSwgW21lc3NhZ2VJZF0pO1xuXG4gIC8vIFRoZXNlIGV4aXN0IHRvIGNoYW5nZSBjdXJyZW50U3RvcnlJbmRleCB0byB0aGUgb2xkZXN0IHVucmVhZCBzdG9yeSBhIHVzZXJcbiAgLy8gaGFzLCBvciBzZXQgdG8gMCB3aGVuZXZlciBjb252ZXJzYXRpb25JZCBjaGFuZ2VzLlxuICAvLyBXZSB1c2UgYSByZWYgc28gdGhhdCB3ZSBvbmx5IGRlcGVuZCBvbiBjb252ZXJzYXRpb25JZCBjaGFuZ2luZywgc2luY2VcbiAgLy8gdGhlIHN0b3JpZXMgQXJyYXkgd2lsbCBjaGFuZ2Ugb25jZSB3ZSBtYXJrIGFzIHN0b3J5IGFzIHZpZXdlZC5cbiAgY29uc3Qgc3Rvcmllc1JlZiA9IHVzZVJlZihzdG9yaWVzKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVucmVhZFN0b3J5SW5kZXggPSBzdG9yaWVzUmVmLmN1cnJlbnQuZmluZEluZGV4KFxuICAgICAgc3RvcnkgPT4gc3RvcnkuaXNVbnJlYWRcbiAgICApO1xuICAgIGxvZy5pbmZvKCdzdG9yaWVzLmZpbmRVbnJlYWRTdG9yeScsIHtcbiAgICAgIHVucmVhZFN0b3J5SW5kZXgsXG4gICAgICBzdG9yaWVzOiBzdG9yaWVzUmVmLmN1cnJlbnQubGVuZ3RoLFxuICAgIH0pO1xuICAgIHNldEN1cnJlbnRTdG9yeUluZGV4KHVucmVhZFN0b3J5SW5kZXggPCAwID8gMCA6IHVucmVhZFN0b3J5SW5kZXgpO1xuICB9LCBbY29udmVyc2F0aW9uSWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN0b3JpZXNSZWYuY3VycmVudCA9IHN0b3JpZXM7XG4gIH0sIFtzdG9yaWVzXSk7XG5cbiAgLy8gRWl0aGVyIHdlIHNob3cgdGhlIG5leHQgc3RvcnkgaW4gdGhlIGN1cnJlbnQgdXNlcidzIHN0b3JpZXMgb3Igd2UgYXNrXG4gIC8vIGZvciB0aGUgbmV4dCB1c2VyJ3Mgc3Rvcmllcy5cbiAgY29uc3Qgc2hvd05leHRTdG9yeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoY3VycmVudFN0b3J5SW5kZXggPCBzdG9yaWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHNldEN1cnJlbnRTdG9yeUluZGV4KGN1cnJlbnRTdG9yeUluZGV4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEN1cnJlbnRTdG9yeUluZGV4KDApO1xuICAgICAgb25OZXh0VXNlclN0b3JpZXMoKTtcbiAgICB9XG4gIH0sIFtjdXJyZW50U3RvcnlJbmRleCwgb25OZXh0VXNlclN0b3JpZXMsIHN0b3JpZXMubGVuZ3RoXSk7XG5cbiAgLy8gRWl0aGVyIHdlIHNob3cgdGhlIHByZXZpb3VzIHN0b3J5IGluIHRoZSBjdXJyZW50IHVzZXIncyBzdG9yaWVzIG9yIHdlIGFza1xuICAvLyBmb3IgdGhlIHByaW9yIHVzZXIncyBzdG9yaWVzLlxuICBjb25zdCBzaG93UHJldlN0b3J5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChjdXJyZW50U3RvcnlJbmRleCA9PT0gMCkge1xuICAgICAgb25QcmV2VXNlclN0b3JpZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0Q3VycmVudFN0b3J5SW5kZXgoY3VycmVudFN0b3J5SW5kZXggLSAxKTtcbiAgICB9XG4gIH0sIFtjdXJyZW50U3RvcnlJbmRleCwgb25QcmV2VXNlclN0b3JpZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBzaG91bGRDYW5jZWwgPSBmYWxzZTtcbiAgICAoYXN5bmMgZnVuY3Rpb24gaHlkcmF0ZVN0b3J5RHVyYXRpb24oKSB7XG4gICAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZHVyYXRpb24gPSBhd2FpdCBnZXRTdG9yeUR1cmF0aW9uKGF0dGFjaG1lbnQpO1xuICAgICAgaWYgKHNob3VsZENhbmNlbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsb2cuaW5mbygnc3Rvcmllcy5zZXRTdG9yeUR1cmF0aW9uJywge1xuICAgICAgICBjb250ZW50VHlwZTogYXR0YWNobWVudC50ZXh0QXR0YWNobWVudFxuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBhdHRhY2htZW50LmNvbnRlbnRUeXBlLFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgIH0pO1xuICAgICAgc2V0U3RvcnlEdXJhdGlvbihkdXJhdGlvbik7XG4gICAgfSkoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzaG91bGRDYW5jZWwgPSB0cnVlO1xuICAgIH07XG4gIH0sIFthdHRhY2htZW50XSk7XG5cbiAgY29uc3QgW3N0eWxlcywgc3ByaW5nXSA9IHVzZVNwcmluZyhcbiAgICAoKSA9PiAoe1xuICAgICAgZnJvbTogeyB3aWR0aDogMCB9LFxuICAgICAgdG86IHsgd2lkdGg6IDEwMCB9LFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIG9uUmVzdDoge1xuICAgICAgICB3aWR0aDogKHsgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICBzaG93TmV4dFN0b3J5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBbc2hvd05leHRTdG9yeV1cbiAgKTtcblxuICAvLyBXZSBuZWVkIHRvIGJlIGNhcmVmdWwgYWJvdXQgdGhpcyBlZmZlY3QgcmVmcmVzaGluZywgaXQgc2hvdWxkIG9ubHkgcnVuXG4gIC8vIGV2ZXJ5IHRpbWUgYSBzdG9yeSBjaGFuZ2VzIG9yIGl0cyBkdXJhdGlvbiBjaGFuZ2VzLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc3RvcnlEdXJhdGlvbikge1xuICAgICAgc3ByaW5nLnN0b3AoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzcHJpbmcuc3RhcnQoe1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGR1cmF0aW9uOiBzdG9yeUR1cmF0aW9uLFxuICAgICAgfSxcbiAgICAgIGZyb206IHsgd2lkdGg6IDAgfSxcbiAgICAgIHRvOiB7IHdpZHRoOiAxMDAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzcHJpbmcuc3RvcCgpO1xuICAgIH07XG4gIH0sIFtjdXJyZW50U3RvcnlJbmRleCwgc3ByaW5nLCBzdG9yeUR1cmF0aW9uXSk7XG5cbiAgY29uc3QgW3BhdXNlU3RvcnksIHNldFBhdXNlU3RvcnldID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHNob3VsZFBhdXNlVmlld2luZyA9XG4gICAgaGFzQ29uZmlybUhpZGVTdG9yeSB8fFxuICAgIGhhc0V4cGFuZGVkQ2FwdGlvbiB8fFxuICAgIGhhc1JlcGx5TW9kYWwgfHxcbiAgICBpc1Nob3dpbmdDb250ZXh0TWVudSB8fFxuICAgIHBhdXNlU3RvcnkgfHxcbiAgICBCb29sZWFuKHJlYWN0aW9uRW1vamkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNob3VsZFBhdXNlVmlld2luZykge1xuICAgICAgc3ByaW5nLnBhdXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwcmluZy5yZXN1bWUoKTtcbiAgICB9XG4gIH0sIFtzaG91bGRQYXVzZVZpZXdpbmcsIHNwcmluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbWFya1N0b3J5UmVhZChtZXNzYWdlSWQpO1xuICAgIGxvZy5pbmZvKCdzdG9yaWVzLm1hcmtTdG9yeVJlYWQnLCB7IG1lc3NhZ2VJZCB9KTtcbiAgfSwgW21hcmtTdG9yeVJlYWQsIG1lc3NhZ2VJZF0pO1xuXG4gIC8vIFF1ZXVlIGFsbCB1bmRvd25sb2FkZWQgc3RvcmllcyBvbmNlIHdlJ3JlIHZpZXdpbmcgc29tZW9uZSdzIHN0b3JpZXNcbiAgY29uc3Qgc3Rvcmllc1RvRG93bmxvYWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gc3Rvcmllc1xuICAgICAgLmZpbHRlcihcbiAgICAgICAgc3RvcnkgPT5cbiAgICAgICAgICAhaXNEb3dubG9hZGVkKHN0b3J5LmF0dGFjaG1lbnQpICYmICFpc0Rvd25sb2FkaW5nKHN0b3J5LmF0dGFjaG1lbnQpXG4gICAgICApXG4gICAgICAubWFwKHN0b3J5ID0+IHN0b3J5Lm1lc3NhZ2VJZCk7XG4gIH0sIFtzdG9yaWVzXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Rvcmllc1RvRG93bmxvYWQuZm9yRWFjaChzdG9yeUlkID0+IHF1ZXVlU3RvcnlEb3dubG9hZChzdG9yeUlkKSk7XG4gIH0sIFtxdWV1ZVN0b3J5RG93bmxvYWQsIHN0b3JpZXNUb0Rvd25sb2FkXSk7XG5cbiAgY29uc3QgbmF2aWdhdGVTdG9yaWVzID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXYua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgc2hvd05leHRTdG9yeSgpO1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0gZWxzZSBpZiAoZXYua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICBzaG93UHJldlN0b3J5KCk7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Nob3dQcmV2U3RvcnksIHNob3dOZXh0U3RvcnldXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbmF2aWdhdGVTdG9yaWVzKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbmF2aWdhdGVTdG9yaWVzKTtcbiAgICB9O1xuICB9LCBbbmF2aWdhdGVTdG9yaWVzXSk7XG5cbiAgY29uc3QgaXNHcm91cFN0b3J5ID0gQm9vbGVhbihncm91cD8uaWQpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNHcm91cFN0b3J5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvYWRTdG9yeVJlcGxpZXMoY29udmVyc2F0aW9uSWQsIG1lc3NhZ2VJZCk7XG4gIH0sIFtjb252ZXJzYXRpb25JZCwgaXNHcm91cFN0b3J5LCBsb2FkU3RvcnlSZXBsaWVzLCBtZXNzYWdlSWRdKTtcblxuICBjb25zdCBbYXJyb3dUb1Nob3csIHNldEFycm93VG9TaG93XSA9IHVzZVN0YXRlPEFycm93PihBcnJvdy5Ob25lKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhcnJvd1RvU2hvdyA9PT0gQXJyb3cuTm9uZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBsYXN0TW91c2VNb3ZlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMYXN0TW91c2VNb3ZlKCkge1xuICAgICAgbGFzdE1vdXNlTW92ZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tNb3VzZUlkbGUoKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAobGFzdE1vdXNlTW92ZSAmJiBEYXRlLm5vdygpIC0gbGFzdE1vdXNlTW92ZSA+IE1PVVNFX0lETEVfVElNRSkge1xuICAgICAgICAgIHNldEFycm93VG9TaG93KEFycm93Lk5vbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrTW91c2VJZGxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVja01vdXNlSWRsZSgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdXBkYXRlTGFzdE1vdXNlTW92ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGFzdE1vdXNlTW92ZSA9IHVuZGVmaW5lZDtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZUxhc3RNb3VzZU1vdmUpO1xuICAgIH07XG4gIH0sIFthcnJvd1RvU2hvd10pO1xuXG4gIGNvbnN0IHJlcGxpZXMgPVxuICAgIHJlcGx5U3RhdGUgJiYgcmVwbHlTdGF0ZS5tZXNzYWdlSWQgPT09IG1lc3NhZ2VJZCA/IHJlcGx5U3RhdGUucmVwbGllcyA6IFtdO1xuXG4gIGNvbnN0IHZpZXdDb3VudCA9ICh2aWV3cyB8fCBbXSkubGVuZ3RoO1xuICBjb25zdCByZXBseUNvdW50ID0gcmVwbGllcy5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9jdXNUcmFwIGZvY3VzVHJhcE9wdGlvbnM9e3sgYWxsb3dPdXRzaWRlQ2xpY2s6IHRydWUgfX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fb3ZlcmxheVwiXG4gICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogZ2V0U3RvcnlCYWNrZ3JvdW5kKGF0dGFjaG1lbnQpIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdiYWNrJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICdTdG9yeVZpZXdlcl9fYXJyb3cgU3RvcnlWaWV3ZXJfX2Fycm93LS1sZWZ0JyxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdTdG9yeVZpZXdlcl9fYXJyb3ctLXZpc2libGUnOiBhcnJvd1RvU2hvdyA9PT0gQXJyb3cuTGVmdCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3Nob3dQcmV2U3Rvcnl9XG4gICAgICAgICAgICBvbk1vdXNlTW92ZT17KCkgPT4gc2V0QXJyb3dUb1Nob3coQXJyb3cuTGVmdCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX3Byb3RlY3Rpb24gU3RvcnlWaWV3ZXJfX3Byb3RlY3Rpb24tLXRvcFwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RvcnlJbWFnZVxuICAgICAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50fVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBpc1BhdXNlZD17c2hvdWxkUGF1c2VWaWV3aW5nfVxuICAgICAgICAgICAgICBpc011dGVkPXtoYXNBbGxTdG9yaWVzTXV0ZWR9XG4gICAgICAgICAgICAgIGxhYmVsPXtpMThuKCdsaWdodGJveEltYWdlQWx0Jyl9XG4gICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19zdG9yeVwiXG4gICAgICAgICAgICAgIHF1ZXVlU3RvcnlEb3dubG9hZD17cXVldWVTdG9yeURvd25sb2FkfVxuICAgICAgICAgICAgICBzdG9yeUlkPXttZXNzYWdlSWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtyZWFjdGlvbkVtb2ppICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19hbmltYXRlZC1lbW9qaXNcIj5cbiAgICAgICAgICAgICAgICAgIDxBbmltYXRlZEVtb2ppR2Fsb3JlXG4gICAgICAgICAgICAgICAgICAgIGVtb2ppPXtyZWFjdGlvbkVtb2ppfVxuICAgICAgICAgICAgICAgICAgICBvbkFuaW1hdGlvbkVuZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldFJlYWN0aW9uRW1vamkodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1N0b3J5SW1hZ2U+XG4gICAgICAgICAgICB7aGFzRXhwYW5kZWRDYXB0aW9uICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Nsb3NlLXBvcHVwJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX2NhcHRpb25fX292ZXJsYXlcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEhhc0V4cGFuZGVkQ2FwdGlvbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX21ldGFcIj5cbiAgICAgICAgICAgIHtjYXB0aW9uICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgIHtjYXB0aW9uLnRleHR9XG4gICAgICAgICAgICAgICAge2NhcHRpb24uaGFzUmVhZE1vcmUgJiYgIWhhc0V4cGFuZGVkQ2FwdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIk1lc3NhZ2VCb2R5X19yZWFkLW1vcmVcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SGFzRXhwYW5kZWRDYXB0aW9uKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249eyhldjogUmVhY3QuS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdTcGFjZScgfHwgZXYua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIYXNFeHBhbmRlZENhcHRpb24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgLi4uXG4gICAgICAgICAgICAgICAgICAgIHtpMThuKCdNZXNzYWdlQm9keS0tcmVhZC1tb3JlJyl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19tZXRhX19wbGF5YmFjay1iYXJcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgICAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgICAgICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICBjb2xvcj17Z2V0QXZhdGFyQ29sb3IoY29sb3IpfVxuICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgaXNNZT17Qm9vbGVhbihpc01lKX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgICAgICBwcm9maWxlTmFtZT17cHJvZmlsZU5hbWV9XG4gICAgICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICAgICAgICAgICAgc2l6ZT17QXZhdGFyU2l6ZS5UV0VOVFlfRUlHSFR9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB7Z3JvdXAgJiYgKFxuICAgICAgICAgICAgICAgICAgPEF2YXRhclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtncm91cC5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgICAgICAgICAgICBhdmF0YXJQYXRoPXtncm91cC5hdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fbWV0YS0tZ3JvdXAtYXZhdGFyXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9e2dldEF2YXRhckNvbG9yKGdyb3VwLmNvbG9yKX1cbiAgICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2dyb3VwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVOYW1lPXtncm91cC5wcm9maWxlTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17Z3JvdXAuc2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICAgICAgICAgICAgc2l6ZT17QXZhdGFyU2l6ZS5UV0VOVFlfRUlHSFR9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXtncm91cC50aXRsZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19tZXRhLS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAge2dyb3VwXG4gICAgICAgICAgICAgICAgICAgID8gaTE4bignU3Rvcmllc19fZnJvbS10by1ncm91cCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDogdGl0bGV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPE1lc3NhZ2VUaW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICBpc1JlbGF0aXZlVGltZVxuICAgICAgICAgICAgICAgICAgbW9kdWxlPVwiU3RvcnlWaWV3ZXJfX21ldGEtLXRpbWVzdGFtcFwiXG4gICAgICAgICAgICAgICAgICB0aW1lc3RhbXA9e3RpbWVzdGFtcH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fbWV0YV9fcGxheWJhY2stY29udHJvbHNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VTdG9yeVxuICAgICAgICAgICAgICAgICAgICAgID8gaTE4bignU3RvcnlWaWV3ZXJfX3BsYXknKVxuICAgICAgICAgICAgICAgICAgICAgIDogaTE4bignU3RvcnlWaWV3ZXJfX3BhdXNlJylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgICAgIHBhdXNlU3RvcnkgPyAnU3RvcnlWaWV3ZXJfX3BsYXknIDogJ1N0b3J5Vmlld2VyX19wYXVzZSdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhdXNlU3RvcnkoIXBhdXNlU3RvcnkpfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtcbiAgICAgICAgICAgICAgICAgICAgaGFzQWxsU3Rvcmllc011dGVkXG4gICAgICAgICAgICAgICAgICAgICAgPyBpMThuKCdTdG9yeVZpZXdlcl9fdW5tdXRlJylcbiAgICAgICAgICAgICAgICAgICAgICA6IGkxOG4oJ1N0b3J5Vmlld2VyX19tdXRlJylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgICAgIGhhc0FsbFN0b3JpZXNNdXRlZFxuICAgICAgICAgICAgICAgICAgICAgID8gJ1N0b3J5Vmlld2VyX191bm11dGUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnU3RvcnlWaWV3ZXJfX211dGUnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWR9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ015U3Rvcmllc19fbW9yZScpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX21vcmVcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTaG93aW5nQ29udGV4dE1lbnUodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICByZWY9e3NldFJlZmVyZW5jZUVsZW1lbnR9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fcHJvZ3Jlc3NcIj5cbiAgICAgICAgICAgICAge3N0b3JpZXMubWFwKChzdG9yeSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fcHJvZ3Jlc3MtLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICBrZXk9e3N0b3J5Lm1lc3NhZ2VJZH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y3VycmVudFN0b3J5SW5kZXggPT09IGluZGV4ID8gKFxuICAgICAgICAgICAgICAgICAgICA8YW5pbWF0ZWQuZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX3Byb2dyZXNzLS1iYXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdG8oW3N0eWxlcy53aWR0aF0sIHdpZHRoID0+IGAke3dpZHRofSVgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19wcm9ncmVzcy0tYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGN1cnJlbnRTdG9yeUluZGV4IDwgaW5kZXggPyAnMCUnIDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICB7Y2FuUmVwbHkgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19yZXBseVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRIYXNSZXBseU1vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICB7dmlld0NvdW50ID4gMCB8fCByZXBseUNvdW50ID4gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJTdG9yeVZpZXdlcl9fcmVwbHlfX2NoZXZyb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt2aWV3Q291bnQgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICh2aWV3Q291bnQgPT09IDEgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEludGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cIk15U3Rvcmllc19fdmlld3MtLXNpbmd1bGFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM9e1s8c3Ryb25nPnt2aWV3Q291bnR9PC9zdHJvbmc+XX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJNeVN0b3JpZXNfX3ZpZXdzLS1wbHVyYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cz17WzxzdHJvbmc+e3ZpZXdDb3VudH08L3N0cm9uZz5dfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAge3ZpZXdDb3VudCA+IDAgJiYgcmVwbHlDb3VudCA+IDAgJiYgJyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAge3JlcGx5Q291bnQgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChyZXBseUNvdW50ID09PSAxID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJNeVN0b3JpZXNfX3JlcGxpZXMtLXNpbmd1bGFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM9e1s8c3Ryb25nPntyZXBseUNvdW50fTwvc3Ryb25nPl19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiTXlTdG9yaWVzX19yZXBsaWVzLS1wbHVyYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cz17WzxzdHJvbmc+e3JlcGx5Q291bnR9PC9zdHJvbmc+XX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICB7IXZpZXdDb3VudCAmJiAhcmVwbHlDb3VudCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX3JlcGx5X19hcnJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzR3JvdXBTdG9yeVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IGkxOG4oJ1N0b3J5Vmlld2VyX19yZXBseS1ncm91cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogaTE4bignU3RvcnlWaWV3ZXJfX3JlcGx5Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdmb3J3YXJkJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICdTdG9yeVZpZXdlcl9fYXJyb3cgU3RvcnlWaWV3ZXJfX2Fycm93LS1yaWdodCcsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnU3RvcnlWaWV3ZXJfX2Fycm93LS12aXNpYmxlJzogYXJyb3dUb1Nob3cgPT09IEFycm93LlJpZ2h0LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgb25DbGljaz17c2hvd05leHRTdG9yeX1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXsoKSA9PiBzZXRBcnJvd1RvU2hvdyhBcnJvdy5SaWdodCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlWaWV3ZXJfX3Byb3RlY3Rpb24gU3RvcnlWaWV3ZXJfX3Byb3RlY3Rpb24tLWJvdHRvbVwiIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2xvc2UnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3J5Vmlld2VyX19jbG9zZS1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDb250ZXh0TWVudVBvcHBlclxuICAgICAgICAgIGlzTWVudVNob3dpbmc9e2lzU2hvd2luZ0NvbnRleHRNZW51fVxuICAgICAgICAgIG1lbnVPcHRpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGljb246ICdTdG9yeUxpc3RJdGVtX19pY29uLS1oaWRlJyxcbiAgICAgICAgICAgICAgbGFiZWw6IGlzSGlkZGVuXG4gICAgICAgICAgICAgICAgPyBpMThuKCdTdG9yeUxpc3RJdGVtX191bmhpZGUnKVxuICAgICAgICAgICAgICAgIDogaTE4bignU3RvcnlMaXN0SXRlbV9faGlkZScpLFxuICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICBvbkhpZGVTdG9yeShpZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHNldEhhc0NvbmZpcm1IaWRlU3RvcnkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWNvbjogJ1N0b3J5TGlzdEl0ZW1fX2ljb24tLWNoYXQnLFxuICAgICAgICAgICAgICBsYWJlbDogaTE4bignU3RvcnlMaXN0SXRlbV9fZ28tdG8tY2hhdCcpLFxuICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb25Hb1RvQ29udmVyc2F0aW9uKGlkKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc1Nob3dpbmdDb250ZXh0TWVudShmYWxzZSl9XG4gICAgICAgICAgcmVmZXJlbmNlRWxlbWVudD17cmVmZXJlbmNlRWxlbWVudH1cbiAgICAgICAgICB0aGVtZT17VGhlbWUuRGFya31cbiAgICAgICAgLz5cbiAgICAgICAge2hhc1JlcGx5TW9kYWwgJiYgY2FuUmVwbHkgJiYgKFxuICAgICAgICAgIDxTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbFxuICAgICAgICAgICAgYXV0aG9yVGl0bGU9e2ZpcnN0TmFtZSB8fCB0aXRsZX1cbiAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpc0dyb3VwU3Rvcnk9e2lzR3JvdXBTdG9yeX1cbiAgICAgICAgICAgIGlzTXlTdG9yeT17aXNNZX1cbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldEhhc1JlcGx5TW9kYWwoZmFsc2UpfVxuICAgICAgICAgICAgb25SZWFjdD17ZW1vamkgPT4ge1xuICAgICAgICAgICAgICBvblJlYWN0VG9TdG9yeShlbW9qaSwgdmlzaWJsZVN0b3J5KTtcbiAgICAgICAgICAgICAgc2V0SGFzUmVwbHlNb2RhbChmYWxzZSk7XG4gICAgICAgICAgICAgIHNldFJlYWN0aW9uRW1vamkoZW1vamkpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uUmVwbHk9eyhtZXNzYWdlLCBtZW50aW9ucywgcmVwbHlUaW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFpc0dyb3VwU3RvcnkpIHtcbiAgICAgICAgICAgICAgICBzZXRIYXNSZXBseU1vZGFsKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvblJlcGx5VG9TdG9yeShtZXNzYWdlLCBtZW50aW9ucywgcmVwbHlUaW1lc3RhbXAsIHZpc2libGVTdG9yeSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25TZXRTa2luVG9uZT17b25TZXRTa2luVG9uZX1cbiAgICAgICAgICAgIG9uVGV4dFRvb0xvbmc9e29uVGV4dFRvb0xvbmd9XG4gICAgICAgICAgICBvblVzZUVtb2ppPXtvblVzZUVtb2ppfVxuICAgICAgICAgICAgcHJlZmVycmVkUmVhY3Rpb25FbW9qaT17cHJlZmVycmVkUmVhY3Rpb25FbW9qaX1cbiAgICAgICAgICAgIHJlY2VudEVtb2ppcz17cmVjZW50RW1vamlzfVxuICAgICAgICAgICAgcmVuZGVyRW1vamlQaWNrZXI9e3JlbmRlckVtb2ppUGlja2VyfVxuICAgICAgICAgICAgcmVwbGllcz17cmVwbGllc31cbiAgICAgICAgICAgIHNraW5Ub25lPXtza2luVG9uZX1cbiAgICAgICAgICAgIHN0b3J5UHJldmlld0F0dGFjaG1lbnQ9e2F0dGFjaG1lbnR9XG4gICAgICAgICAgICB2aWV3cz17W119XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2hhc0NvbmZpcm1IaWRlU3RvcnkgJiYgKFxuICAgICAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4gb25IaWRlU3RvcnkoaWQpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ1N0b3J5TGlzdEl0ZW1fX2hpZGUtbW9kYWwtLWNvbmZpcm0nKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF19XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRIYXNDb25maXJtSGlkZVN0b3J5KGZhbHNlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ1N0b3J5TGlzdEl0ZW1fX2hpZGUtbW9kYWwtLWJvZHknLCBbU3RyaW5nKGZpcnN0TmFtZSldKX1cbiAgICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvRm9jdXNUcmFwPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw4QkFBc0I7QUFDdEIsbUJBTU87QUFDUCx3QkFBdUI7QUFDdkIsaUJBQXdDO0FBUXhDLGlDQUFvQztBQUNwQyxvQkFBbUM7QUFDbkMsZ0NBQW1DO0FBQ25DLHlCQUFrQztBQUNsQyxrQkFBcUI7QUFDckIsOEJBQWlDO0FBQ2pDLHdCQUEyQjtBQUMzQixxQ0FBd0M7QUFDeEMsbUJBQXNCO0FBQ3RC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
