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
var Quote_stories_exports = {};
__export(Quote_stories_exports, {
  AudioAttachment: () => AudioAttachment,
  AudioOnly: () => AudioOnly,
  CustomColor: () => CustomColor,
  GiftBadge: () => GiftBadge,
  ImageAttachment: () => ImageAttachment,
  ImageAttachmentWOThumbnail: () => ImageAttachmentWOThumbnail,
  ImageOnly: () => ImageOnly,
  ImageTapToView: () => ImageTapToView,
  IncomingByAnotherAuthor: () => IncomingByAnotherAuthor,
  IncomingByMe: () => IncomingByMe,
  IncomingOutgoingColors: () => IncomingOutgoingColors,
  IsStoryReply: () => IsStoryReply,
  IsStoryReplyEmoji: () => IsStoryReplyEmoji,
  LongMessageAttachmentShouldBeHidden: () => LongMessageAttachmentShouldBeHidden,
  MediaTapToView: () => MediaTapToView,
  MentionIncomingAnotherAuthor: () => MentionIncomingAnotherAuthor,
  MentionIncomingMe: () => MentionIncomingMe,
  MentionOutgoingAnotherAuthor: () => MentionOutgoingAnotherAuthor,
  MentionOutgoingMe: () => MentionOutgoingMe,
  MessageNotFound: () => MessageNotFound,
  MissingTextAttachment: () => MissingTextAttachment,
  NoCloseButton: () => NoCloseButton,
  OtherFileAttachment: () => OtherFileAttachment,
  OtherFileOnly: () => OtherFileOnly,
  OutgoingByAnotherAuthor: () => OutgoingByAnotherAuthor,
  OutgoingByMe: () => OutgoingByMe,
  VideoAttachment: () => VideoAttachment,
  VideoAttachmentWOThumbnail: () => VideoAttachmentWOThumbnail,
  VideoOnly: () => VideoOnly,
  VideoTapToView: () => VideoTapToView,
  VoiceMessageAttachment: () => VoiceMessageAttachment,
  VoiceMessageOnly: () => VoiceMessageOnly,
  default: () => Quote_stories_default
});
module.exports = __toCommonJS(Quote_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Colors = require("../../types/Colors");
var import_Fixtures = require("../../storybook/Fixtures");
var import_Message = require("./Message");
var import_MIME = require("../../types/MIME");
var import_Quote = require("./Quote");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_util = require("../_util");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Quote_stories_default = {
  title: "Components/Conversation/Quote"
};
const defaultMessageProps = {
  author: (0, import_getDefaultConversation.getDefaultConversation)({
    id: "some-id",
    title: "Person X"
  }),
  canReact: true,
  canReply: true,
  canRetry: true,
  canRetryDeleteForEveryone: true,
  canDeleteForEveryone: true,
  canDownload: true,
  checkForAccount: (0, import_addon_actions.action)("checkForAccount"),
  clearSelectedMessage: (0, import_addon_actions.action)("default--clearSelectedMessage"),
  containerElementRef: React.createRef(),
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  conversationColor: "crimson",
  conversationId: "conversationId",
  conversationTitle: "Conversation Title",
  conversationType: "direct",
  deleteMessage: (0, import_addon_actions.action)("default--deleteMessage"),
  deleteMessageForEveryone: (0, import_addon_actions.action)("default--deleteMessageForEveryone"),
  direction: "incoming",
  displayTapToViewMessage: (0, import_addon_actions.action)("default--displayTapToViewMessage"),
  downloadAttachment: (0, import_addon_actions.action)("default--downloadAttachment"),
  doubleCheckMissingQuoteReference: (0, import_addon_actions.action)("default--doubleCheckMissingQuoteReference"),
  getPreferredBadge: () => void 0,
  i18n,
  id: "messageId",
  renderingContext: "storybook",
  interactionMode: "keyboard",
  isBlocked: false,
  isMessageRequestAccepted: true,
  kickOffAttachmentDownload: (0, import_addon_actions.action)("default--kickOffAttachmentDownload"),
  markAttachmentAsCorrupted: (0, import_addon_actions.action)("default--markAttachmentAsCorrupted"),
  markViewed: (0, import_addon_actions.action)("default--markViewed"),
  messageExpanded: (0, import_addon_actions.action)("default--message-expanded"),
  openConversation: (0, import_addon_actions.action)("default--openConversation"),
  openGiftBadge: (0, import_addon_actions.action)("openGiftBadge"),
  openLink: (0, import_addon_actions.action)("default--openLink"),
  previews: [],
  reactToMessage: (0, import_addon_actions.action)("default--reactToMessage"),
  readStatus: import_MessageReadStatus.ReadStatus.Read,
  renderEmojiPicker: () => /* @__PURE__ */ React.createElement("div", null),
  renderReactionPicker: () => /* @__PURE__ */ React.createElement("div", null),
  renderAudioAttachment: () => /* @__PURE__ */ React.createElement("div", null, "*AudioAttachment*"),
  replyToMessage: (0, import_addon_actions.action)("default--replyToMessage"),
  retrySend: (0, import_addon_actions.action)("default--retrySend"),
  retryDeleteForEveryone: (0, import_addon_actions.action)("default--retryDeleteForEveryone"),
  scrollToQuotedMessage: (0, import_addon_actions.action)("default--scrollToQuotedMessage"),
  selectMessage: (0, import_addon_actions.action)("default--selectMessage"),
  shouldCollapseAbove: false,
  shouldCollapseBelow: false,
  shouldHideMetadata: false,
  showContactDetail: (0, import_addon_actions.action)("default--showContactDetail"),
  showContactModal: (0, import_addon_actions.action)("default--showContactModal"),
  showExpiredIncomingTapToViewToast: (0, import_addon_actions.action)("showExpiredIncomingTapToViewToast"),
  showExpiredOutgoingTapToViewToast: (0, import_addon_actions.action)("showExpiredOutgoingTapToViewToast"),
  showForwardMessageModal: (0, import_addon_actions.action)("default--showForwardMessageModal"),
  showMessageDetail: (0, import_addon_actions.action)("default--showMessageDetail"),
  showVisualAttachment: (0, import_addon_actions.action)("default--showVisualAttachment"),
  startConversation: (0, import_addon_actions.action)("default--startConversation"),
  status: "sent",
  text: "This is really interesting.",
  textDirection: import_Message.TextDirection.Default,
  theme: import_Util.ThemeType.light,
  timestamp: Date.now()
};
const renderInMessage = /* @__PURE__ */ __name(({
  authorTitle,
  conversationColor,
  isFromMe,
  rawAttachment,
  isViewOnce,
  isGiftBadge,
  referencedMessageNotFound,
  text: quoteText
}) => {
  const messageProps = {
    ...defaultMessageProps,
    conversationColor,
    quote: {
      authorId: "an-author",
      authorTitle,
      conversationColor,
      isFromMe,
      rawAttachment,
      isViewOnce,
      isGiftBadge,
      referencedMessageNotFound,
      sentAt: Date.now() - 30 * 1e3,
      text: quoteText
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    style: { overflow: "hidden" }
  }, /* @__PURE__ */ React.createElement(import_Message.Message, {
    ...messageProps
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
    ...messageProps,
    direction: "outgoing"
  }));
}, "renderInMessage");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  authorTitle: (0, import_addon_knobs.text)("authorTitle", overrideProps.authorTitle || "Default Sender"),
  conversationColor: overrideProps.conversationColor || "forest",
  doubleCheckMissingQuoteReference: overrideProps.doubleCheckMissingQuoteReference || (0, import_addon_actions.action)("doubleCheckMissingQuoteReference"),
  i18n,
  isFromMe: (0, import_addon_knobs.boolean)("isFromMe", overrideProps.isFromMe || false),
  isIncoming: (0, import_addon_knobs.boolean)("isIncoming", overrideProps.isIncoming || false),
  onClick: (0, import_addon_actions.action)("onClick"),
  onClose: (0, import_addon_actions.action)("onClose"),
  rawAttachment: overrideProps.rawAttachment || void 0,
  referencedMessageNotFound: (0, import_addon_knobs.boolean)("referencedMessageNotFound", overrideProps.referencedMessageNotFound || false),
  isGiftBadge: (0, import_addon_knobs.boolean)("isGiftBadge", overrideProps.isGiftBadge || false),
  isViewOnce: (0, import_addon_knobs.boolean)("isViewOnce", overrideProps.isViewOnce || false),
  text: (0, import_addon_knobs.text)("text", (0, import_lodash.isString)(overrideProps.text) ? overrideProps.text : "A sample message from a pal")
}), "createProps");
const OutgoingByAnotherAuthor = /* @__PURE__ */ __name(() => {
  const props = createProps({
    authorTitle: "Terrence Malick"
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "OutgoingByAnotherAuthor");
OutgoingByAnotherAuthor.story = {
  name: "Outgoing by Another Author"
};
const OutgoingByMe = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isFromMe: true
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "OutgoingByMe");
OutgoingByMe.story = {
  name: "Outgoing by Me"
};
const IncomingByAnotherAuthor = /* @__PURE__ */ __name(() => {
  const props = createProps({
    authorTitle: "Terrence Malick",
    isIncoming: true
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "IncomingByAnotherAuthor");
IncomingByAnotherAuthor.story = {
  name: "Incoming by Another Author"
};
const IncomingByMe = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isFromMe: true,
    isIncoming: true
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "IncomingByMe");
IncomingByMe.story = {
  name: "Incoming by Me"
};
const IncomingOutgoingColors = /* @__PURE__ */ __name(() => {
  const props = createProps({});
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Colors.ConversationColors.map((color) => renderInMessage({ ...props, conversationColor: color })));
}, "IncomingOutgoingColors");
IncomingOutgoingColors.story = {
  name: "Incoming/Outgoing Colors"
};
const ImageOnly = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "",
    rawAttachment: {
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      isVoiceMessage: false,
      thumbnail: {
        contentType: import_MIME.IMAGE_PNG,
        height: 100,
        width: 100,
        path: import_Fixtures.pngUrl,
        objectUrl: import_Fixtures.pngUrl
      }
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "ImageOnly");
const ImageAttachment = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      isVoiceMessage: false,
      thumbnail: {
        contentType: import_MIME.IMAGE_PNG,
        height: 100,
        width: 100,
        path: import_Fixtures.pngUrl,
        objectUrl: import_Fixtures.pngUrl
      }
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "ImageAttachment");
const ImageAttachmentWOThumbnail = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "ImageAttachmentWOThumbnail");
ImageAttachmentWOThumbnail.story = {
  name: "Image Attachment w/o Thumbnail"
};
const ImageTapToView = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "",
    isViewOnce: true,
    rawAttachment: {
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "ImageTapToView");
ImageTapToView.story = {
  name: "Image Tap-to-View"
};
const VideoOnly = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.VIDEO_MP4,
      fileName: "great-video.mp4",
      isVoiceMessage: false,
      thumbnail: {
        contentType: import_MIME.IMAGE_PNG,
        height: 100,
        width: 100,
        path: import_Fixtures.pngUrl,
        objectUrl: import_Fixtures.pngUrl
      }
    }
  });
  props.text = void 0;
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "VideoOnly");
const VideoAttachment = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.VIDEO_MP4,
      fileName: "great-video.mp4",
      isVoiceMessage: false,
      thumbnail: {
        contentType: import_MIME.IMAGE_PNG,
        height: 100,
        width: 100,
        path: import_Fixtures.pngUrl,
        objectUrl: import_Fixtures.pngUrl
      }
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "VideoAttachment");
const VideoAttachmentWOThumbnail = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.VIDEO_MP4,
      fileName: "great-video.mp4",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "VideoAttachmentWOThumbnail");
VideoAttachmentWOThumbnail.story = {
  name: "Video Attachment w/o Thumbnail"
};
const VideoTapToView = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "",
    isViewOnce: true,
    rawAttachment: {
      contentType: import_MIME.VIDEO_MP4,
      fileName: "great-video.mp4",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "VideoTapToView");
VideoTapToView.story = {
  name: "Video Tap-to-View"
};
const GiftBadge = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Some text which shouldn't be rendered",
    isGiftBadge: true
  });
  return renderInMessage(props);
}, "GiftBadge");
const AudioOnly = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.AUDIO_MP3,
      fileName: "great-video.mp3",
      isVoiceMessage: false
    }
  });
  props.text = void 0;
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "AudioOnly");
const AudioAttachment = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.AUDIO_MP3,
      fileName: "great-video.mp3",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "AudioAttachment");
const VoiceMessageOnly = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.AUDIO_MP3,
      fileName: "great-video.mp3",
      isVoiceMessage: true
    }
  });
  props.text = void 0;
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "VoiceMessageOnly");
const VoiceMessageAttachment = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.AUDIO_MP3,
      fileName: "great-video.mp3",
      isVoiceMessage: true
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "VoiceMessageAttachment");
const OtherFileOnly = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: (0, import_MIME.stringToMIMEType)("application/json"),
      fileName: "great-data.json",
      isVoiceMessage: false
    }
  });
  props.text = void 0;
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "OtherFileOnly");
const MediaTapToView = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "",
    isViewOnce: true,
    rawAttachment: {
      contentType: import_MIME.AUDIO_MP3,
      fileName: "great-video.mp3",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "MediaTapToView");
MediaTapToView.story = {
  name: "Media Tap-to-View"
};
const OtherFileAttachment = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: (0, import_MIME.stringToMIMEType)("application/json"),
      fileName: "great-data.json",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "OtherFileAttachment");
const LongMessageAttachmentShouldBeHidden = /* @__PURE__ */ __name(() => {
  const props = createProps({
    rawAttachment: {
      contentType: import_MIME.LONG_MESSAGE,
      fileName: "signal-long-message-123.txt",
      isVoiceMessage: false
    }
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "LongMessageAttachmentShouldBeHidden");
LongMessageAttachmentShouldBeHidden.story = {
  name: "Long message attachment (should be hidden)"
};
const NoCloseButton = /* @__PURE__ */ __name(() => {
  const props = createProps();
  props.onClose = void 0;
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "NoCloseButton");
const MessageNotFound = /* @__PURE__ */ __name(() => {
  const props = createProps({
    referencedMessageNotFound: true
  });
  return renderInMessage(props);
}, "MessageNotFound");
const MissingTextAttachment = /* @__PURE__ */ __name(() => {
  const props = createProps();
  props.text = void 0;
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "MissingTextAttachment");
MissingTextAttachment.story = {
  name: "Missing Text & Attachment"
};
const MentionOutgoingAnotherAuthor = /* @__PURE__ */ __name(() => {
  const props = createProps({
    authorTitle: "Tony Stark",
    text: "@Captain America Lunch later?"
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "MentionOutgoingAnotherAuthor");
MentionOutgoingAnotherAuthor.story = {
  name: "@mention + outgoing + another author"
};
const MentionOutgoingMe = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isFromMe: true,
    text: "@Captain America Lunch later?"
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "MentionOutgoingMe");
MentionOutgoingMe.story = {
  name: "@mention + outgoing + me"
};
const MentionIncomingAnotherAuthor = /* @__PURE__ */ __name(() => {
  const props = createProps({
    authorTitle: "Captain America",
    isIncoming: true,
    text: "@Tony Stark sure"
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "MentionIncomingAnotherAuthor");
MentionIncomingAnotherAuthor.story = {
  name: "@mention + incoming + another author"
};
const MentionIncomingMe = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isFromMe: true,
    isIncoming: true,
    text: "@Tony Stark sure"
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props
  });
}, "MentionIncomingMe");
MentionIncomingMe.story = {
  name: "@mention + incoming + me"
};
const CustomColor = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_Quote.Quote, {
  ...createProps({ isIncoming: true, text: "Solid + Gradient" }),
  customColor: {
    start: { hue: 82, saturation: 35 }
  }
}), /* @__PURE__ */ React.createElement(import_Quote.Quote, {
  ...createProps(),
  customColor: {
    deg: 192,
    start: { hue: 304, saturation: 85 },
    end: { hue: 231, saturation: 76 }
  }
})), "CustomColor");
const IsStoryReply = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Wow!"
  });
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props,
    authorTitle: "Amanda",
    isStoryReply: true,
    moduleClassName: "StoryReplyQuote",
    onClose: void 0,
    rawAttachment: {
      contentType: import_MIME.VIDEO_MP4,
      fileName: "great-video.mp4",
      isVoiceMessage: false
    }
  });
}, "IsStoryReply");
IsStoryReply.story = {
  name: "isStoryReply"
};
const IsStoryReplyEmoji = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_Quote.Quote, {
    ...props,
    authorTitle: "Charlie",
    isStoryReply: true,
    moduleClassName: "StoryReplyQuote",
    onClose: void 0,
    rawAttachment: {
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      isVoiceMessage: false,
      thumbnail: {
        contentType: import_MIME.IMAGE_PNG,
        height: 100,
        width: 100,
        path: import_Fixtures.pngUrl,
        objectUrl: import_Fixtures.pngUrl
      }
    },
    reactionEmoji: "\u{1F3CB}\uFE0F"
  });
}, "IsStoryReplyEmoji");
IsStoryReplyEmoji.story = {
  name: "isStoryReply emoji"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioAttachment,
  AudioOnly,
  CustomColor,
  GiftBadge,
  ImageAttachment,
  ImageAttachmentWOThumbnail,
  ImageOnly,
  ImageTapToView,
  IncomingByAnotherAuthor,
  IncomingByMe,
  IncomingOutgoingColors,
  IsStoryReply,
  IsStoryReplyEmoji,
  LongMessageAttachmentShouldBeHidden,
  MediaTapToView,
  MentionIncomingAnotherAuthor,
  MentionIncomingMe,
  MentionOutgoingAnotherAuthor,
  MentionOutgoingMe,
  MessageNotFound,
  MissingTextAttachment,
  NoCloseButton,
  OtherFileAttachment,
  OtherFileOnly,
  OutgoingByAnotherAuthor,
  OutgoingByMe,
  VideoAttachment,
  VideoAttachmentWOThumbnail,
  VideoOnly,
  VideoTapToView,
  VoiceMessageAttachment,
  VoiceMessageOnly
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUXVvdGUuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IENvbnZlcnNhdGlvbkNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBwbmdVcmwgfSBmcm9tICcuLi8uLi9zdG9yeWJvb2svRml4dHVyZXMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBNZXNzYWdlc1Byb3BzIH0gZnJvbSAnLi9NZXNzYWdlJztcbmltcG9ydCB7IE1lc3NhZ2UsIFRleHREaXJlY3Rpb24gfSBmcm9tICcuL01lc3NhZ2UnO1xuaW1wb3J0IHtcbiAgQVVESU9fTVAzLFxuICBJTUFHRV9QTkcsXG4gIExPTkdfTUVTU0FHRSxcbiAgVklERU9fTVA0LFxuICBzdHJpbmdUb01JTUVUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL1F1b3RlJztcbmltcG9ydCB7IFF1b3RlIH0gZnJvbSAnLi9RdW90ZSc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuLi9fdXRpbCc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1F1b3RlJyxcbn07XG5cbmNvbnN0IGRlZmF1bHRNZXNzYWdlUHJvcHM6IE1lc3NhZ2VzUHJvcHMgPSB7XG4gIGF1dGhvcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgaWQ6ICdzb21lLWlkJyxcbiAgICB0aXRsZTogJ1BlcnNvbiBYJyxcbiAgfSksXG4gIGNhblJlYWN0OiB0cnVlLFxuICBjYW5SZXBseTogdHJ1ZSxcbiAgY2FuUmV0cnk6IHRydWUsXG4gIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gIGNhbkRlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICBjYW5Eb3dubG9hZDogdHJ1ZSxcbiAgY2hlY2tGb3JBY2NvdW50OiBhY3Rpb24oJ2NoZWNrRm9yQWNjb3VudCcpLFxuICBjbGVhclNlbGVjdGVkTWVzc2FnZTogYWN0aW9uKCdkZWZhdWx0LS1jbGVhclNlbGVjdGVkTWVzc2FnZScpLFxuICBjb250YWluZXJFbGVtZW50UmVmOiBSZWFjdC5jcmVhdGVSZWY8SFRNTEVsZW1lbnQ+KCksXG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50LldpZGUsXG4gIGNvbnZlcnNhdGlvbkNvbG9yOiAnY3JpbXNvbicsXG4gIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uSWQnLFxuICBjb252ZXJzYXRpb25UaXRsZTogJ0NvbnZlcnNhdGlvbiBUaXRsZScsXG4gIGNvbnZlcnNhdGlvblR5cGU6ICdkaXJlY3QnLCAvLyBvdmVycmlkZVxuICBkZWxldGVNZXNzYWdlOiBhY3Rpb24oJ2RlZmF1bHQtLWRlbGV0ZU1lc3NhZ2UnKSxcbiAgZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lOiBhY3Rpb24oJ2RlZmF1bHQtLWRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZScpLFxuICBkaXJlY3Rpb246ICdpbmNvbWluZycsXG4gIGRpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlOiBhY3Rpb24oJ2RlZmF1bHQtLWRpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlJyksXG4gIGRvd25sb2FkQXR0YWNobWVudDogYWN0aW9uKCdkZWZhdWx0LS1kb3dubG9hZEF0dGFjaG1lbnQnKSxcbiAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U6IGFjdGlvbihcbiAgICAnZGVmYXVsdC0tZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UnXG4gICksXG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiB1bmRlZmluZWQsXG4gIGkxOG4sXG4gIGlkOiAnbWVzc2FnZUlkJyxcbiAgcmVuZGVyaW5nQ29udGV4dDogJ3N0b3J5Ym9vaycsXG4gIGludGVyYWN0aW9uTW9kZTogJ2tleWJvYXJkJyxcbiAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkOiBhY3Rpb24oJ2RlZmF1bHQtLWtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQnKSxcbiAgbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZDogYWN0aW9uKCdkZWZhdWx0LS1tYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkJyksXG4gIG1hcmtWaWV3ZWQ6IGFjdGlvbignZGVmYXVsdC0tbWFya1ZpZXdlZCcpLFxuICBtZXNzYWdlRXhwYW5kZWQ6IGFjdGlvbignZGVmYXVsdC0tbWVzc2FnZS1leHBhbmRlZCcpLFxuICBvcGVuQ29udmVyc2F0aW9uOiBhY3Rpb24oJ2RlZmF1bHQtLW9wZW5Db252ZXJzYXRpb24nKSxcbiAgb3BlbkdpZnRCYWRnZTogYWN0aW9uKCdvcGVuR2lmdEJhZGdlJyksXG4gIG9wZW5MaW5rOiBhY3Rpb24oJ2RlZmF1bHQtLW9wZW5MaW5rJyksXG4gIHByZXZpZXdzOiBbXSxcbiAgcmVhY3RUb01lc3NhZ2U6IGFjdGlvbignZGVmYXVsdC0tcmVhY3RUb01lc3NhZ2UnKSxcbiAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICByZW5kZXJFbW9qaVBpY2tlcjogKCkgPT4gPGRpdiAvPixcbiAgcmVuZGVyUmVhY3Rpb25QaWNrZXI6ICgpID0+IDxkaXYgLz4sXG4gIHJlbmRlckF1ZGlvQXR0YWNobWVudDogKCkgPT4gPGRpdj4qQXVkaW9BdHRhY2htZW50KjwvZGl2PixcbiAgcmVwbHlUb01lc3NhZ2U6IGFjdGlvbignZGVmYXVsdC0tcmVwbHlUb01lc3NhZ2UnKSxcbiAgcmV0cnlTZW5kOiBhY3Rpb24oJ2RlZmF1bHQtLXJldHJ5U2VuZCcpLFxuICByZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBhY3Rpb24oJ2RlZmF1bHQtLXJldHJ5RGVsZXRlRm9yRXZlcnlvbmUnKSxcbiAgc2Nyb2xsVG9RdW90ZWRNZXNzYWdlOiBhY3Rpb24oJ2RlZmF1bHQtLXNjcm9sbFRvUXVvdGVkTWVzc2FnZScpLFxuICBzZWxlY3RNZXNzYWdlOiBhY3Rpb24oJ2RlZmF1bHQtLXNlbGVjdE1lc3NhZ2UnKSxcbiAgc2hvdWxkQ29sbGFwc2VBYm92ZTogZmFsc2UsXG4gIHNob3VsZENvbGxhcHNlQmVsb3c6IGZhbHNlLFxuICBzaG91bGRIaWRlTWV0YWRhdGE6IGZhbHNlLFxuICBzaG93Q29udGFjdERldGFpbDogYWN0aW9uKCdkZWZhdWx0LS1zaG93Q29udGFjdERldGFpbCcpLFxuICBzaG93Q29udGFjdE1vZGFsOiBhY3Rpb24oJ2RlZmF1bHQtLXNob3dDb250YWN0TW9kYWwnKSxcbiAgc2hvd0V4cGlyZWRJbmNvbWluZ1RhcFRvVmlld1RvYXN0OiBhY3Rpb24oXG4gICAgJ3Nob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgKSxcbiAgc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0OiBhY3Rpb24oXG4gICAgJ3Nob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgKSxcbiAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWw6IGFjdGlvbignZGVmYXVsdC0tc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwnKSxcbiAgc2hvd01lc3NhZ2VEZXRhaWw6IGFjdGlvbignZGVmYXVsdC0tc2hvd01lc3NhZ2VEZXRhaWwnKSxcbiAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQ6IGFjdGlvbignZGVmYXVsdC0tc2hvd1Zpc3VhbEF0dGFjaG1lbnQnKSxcbiAgc3RhcnRDb252ZXJzYXRpb246IGFjdGlvbignZGVmYXVsdC0tc3RhcnRDb252ZXJzYXRpb24nKSxcbiAgc3RhdHVzOiAnc2VudCcsXG4gIHRleHQ6ICdUaGlzIGlzIHJlYWxseSBpbnRlcmVzdGluZy4nLFxuICB0ZXh0RGlyZWN0aW9uOiBUZXh0RGlyZWN0aW9uLkRlZmF1bHQsXG4gIHRoZW1lOiBUaGVtZVR5cGUubGlnaHQsXG4gIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbn07XG5cbmNvbnN0IHJlbmRlckluTWVzc2FnZSA9ICh7XG4gIGF1dGhvclRpdGxlLFxuICBjb252ZXJzYXRpb25Db2xvcixcbiAgaXNGcm9tTWUsXG4gIHJhd0F0dGFjaG1lbnQsXG4gIGlzVmlld09uY2UsXG4gIGlzR2lmdEJhZGdlLFxuICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kLFxuICB0ZXh0OiBxdW90ZVRleHQsXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBtZXNzYWdlUHJvcHMgPSB7XG4gICAgLi4uZGVmYXVsdE1lc3NhZ2VQcm9wcyxcbiAgICBjb252ZXJzYXRpb25Db2xvcixcbiAgICBxdW90ZToge1xuICAgICAgYXV0aG9ySWQ6ICdhbi1hdXRob3InLFxuICAgICAgYXV0aG9yVGl0bGUsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcixcbiAgICAgIGlzRnJvbU1lLFxuICAgICAgcmF3QXR0YWNobWVudCxcbiAgICAgIGlzVmlld09uY2UsXG4gICAgICBpc0dpZnRCYWRnZSxcbiAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQsXG4gICAgICBzZW50QXQ6IERhdGUubm93KCkgLSAzMCAqIDEwMDAsXG4gICAgICB0ZXh0OiBxdW90ZVRleHQsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPE1lc3NhZ2Ugey4uLm1lc3NhZ2VQcm9wc30gLz5cbiAgICAgIDxiciAvPlxuICAgICAgPE1lc3NhZ2Ugey4uLm1lc3NhZ2VQcm9wc30gZGlyZWN0aW9uPVwib3V0Z29pbmdcIiAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGF1dGhvclRpdGxlOiB0ZXh0KFxuICAgICdhdXRob3JUaXRsZScsXG4gICAgb3ZlcnJpZGVQcm9wcy5hdXRob3JUaXRsZSB8fCAnRGVmYXVsdCBTZW5kZXInXG4gICksXG4gIGNvbnZlcnNhdGlvbkNvbG9yOiBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvbkNvbG9yIHx8ICdmb3Jlc3QnLFxuICBkb3VibGVDaGVja01pc3NpbmdRdW90ZVJlZmVyZW5jZTpcbiAgICBvdmVycmlkZVByb3BzLmRvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlIHx8XG4gICAgYWN0aW9uKCdkb3VibGVDaGVja01pc3NpbmdRdW90ZVJlZmVyZW5jZScpLFxuICBpMThuLFxuICBpc0Zyb21NZTogYm9vbGVhbignaXNGcm9tTWUnLCBvdmVycmlkZVByb3BzLmlzRnJvbU1lIHx8IGZhbHNlKSxcbiAgaXNJbmNvbWluZzogYm9vbGVhbignaXNJbmNvbWluZycsIG92ZXJyaWRlUHJvcHMuaXNJbmNvbWluZyB8fCBmYWxzZSksXG4gIG9uQ2xpY2s6IGFjdGlvbignb25DbGljaycpLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgcmF3QXR0YWNobWVudDogb3ZlcnJpZGVQcm9wcy5yYXdBdHRhY2htZW50IHx8IHVuZGVmaW5lZCxcbiAgcmVmZXJlbmNlZE1lc3NhZ2VOb3RGb3VuZDogYm9vbGVhbihcbiAgICAncmVmZXJlbmNlZE1lc3NhZ2VOb3RGb3VuZCcsXG4gICAgb3ZlcnJpZGVQcm9wcy5yZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kIHx8IGZhbHNlXG4gICksXG4gIGlzR2lmdEJhZGdlOiBib29sZWFuKCdpc0dpZnRCYWRnZScsIG92ZXJyaWRlUHJvcHMuaXNHaWZ0QmFkZ2UgfHwgZmFsc2UpLFxuICBpc1ZpZXdPbmNlOiBib29sZWFuKCdpc1ZpZXdPbmNlJywgb3ZlcnJpZGVQcm9wcy5pc1ZpZXdPbmNlIHx8IGZhbHNlKSxcbiAgdGV4dDogdGV4dChcbiAgICAndGV4dCcsXG4gICAgaXNTdHJpbmcob3ZlcnJpZGVQcm9wcy50ZXh0KVxuICAgICAgPyBvdmVycmlkZVByb3BzLnRleHRcbiAgICAgIDogJ0Egc2FtcGxlIG1lc3NhZ2UgZnJvbSBhIHBhbCdcbiAgKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgT3V0Z29pbmdCeUFub3RoZXJBdXRob3IgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhdXRob3JUaXRsZTogJ1RlcnJlbmNlIE1hbGljaycsXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbk91dGdvaW5nQnlBbm90aGVyQXV0aG9yLnN0b3J5ID0ge1xuICBuYW1lOiAnT3V0Z29pbmcgYnkgQW5vdGhlciBBdXRob3InLFxufTtcblxuZXhwb3J0IGNvbnN0IE91dGdvaW5nQnlNZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGlzRnJvbU1lOiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gPFF1b3RlIHsuLi5wcm9wc30gLz47XG59O1xuXG5PdXRnb2luZ0J5TWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdPdXRnb2luZyBieSBNZScsXG59O1xuXG5leHBvcnQgY29uc3QgSW5jb21pbmdCeUFub3RoZXJBdXRob3IgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhdXRob3JUaXRsZTogJ1RlcnJlbmNlIE1hbGljaycsXG4gICAgaXNJbmNvbWluZzogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuSW5jb21pbmdCeUFub3RoZXJBdXRob3Iuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmNvbWluZyBieSBBbm90aGVyIEF1dGhvcicsXG59O1xuXG5leHBvcnQgY29uc3QgSW5jb21pbmdCeU1lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaXNGcm9tTWU6IHRydWUsXG4gICAgaXNJbmNvbWluZzogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuSW5jb21pbmdCeU1lLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5jb21pbmcgYnkgTWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEluY29taW5nT3V0Z29pbmdDb2xvcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHt9KTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge0NvbnZlcnNhdGlvbkNvbG9ycy5tYXAoY29sb3IgPT5cbiAgICAgICAgcmVuZGVySW5NZXNzYWdlKHsgLi4ucHJvcHMsIGNvbnZlcnNhdGlvbkNvbG9yOiBjb2xvciB9KVxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbkluY29taW5nT3V0Z29pbmdDb2xvcnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmNvbWluZy9PdXRnb2luZyBDb2xvcnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEltYWdlT25seSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICcnLFxuICAgIHJhd0F0dGFjaG1lbnQ6IHtcbiAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICBwYXRoOiBwbmdVcmwsXG4gICAgICAgIG9iamVjdFVybDogcG5nVXJsLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gPFF1b3RlIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgSW1hZ2VBdHRhY2htZW50ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICBpc1ZvaWNlTWVzc2FnZTogZmFsc2UsXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgIHBhdGg6IHBuZ1VybCxcbiAgICAgICAgb2JqZWN0VXJsOiBwbmdVcmwsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBJbWFnZUF0dGFjaG1lbnRXT1RodW1ibmFpbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHJhd0F0dGFjaG1lbnQ6IHtcbiAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbkltYWdlQXR0YWNobWVudFdPVGh1bWJuYWlsLnN0b3J5ID0ge1xuICBuYW1lOiAnSW1hZ2UgQXR0YWNobWVudCB3L28gVGh1bWJuYWlsJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbWFnZVRhcFRvVmlldyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICcnLFxuICAgIGlzVmlld09uY2U6IHRydWUsXG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICBpc1ZvaWNlTWVzc2FnZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuSW1hZ2VUYXBUb1ZpZXcuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbWFnZSBUYXAtdG8tVmlldycsXG59O1xuXG5leHBvcnQgY29uc3QgVmlkZW9Pbmx5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgIGZpbGVOYW1lOiAnZ3JlYXQtdmlkZW8ubXA0JyxcbiAgICAgIGlzVm9pY2VNZXNzYWdlOiBmYWxzZSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgcGF0aDogcG5nVXJsLFxuICAgICAgICBvYmplY3RVcmw6IHBuZ1VybCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHByb3BzLnRleHQgPSB1bmRlZmluZWQgYXMgYW55O1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBWaWRlb0F0dGFjaG1lbnQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICByYXdBdHRhY2htZW50OiB7XG4gICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgZmlsZU5hbWU6ICdncmVhdC12aWRlby5tcDQnLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICBwYXRoOiBwbmdVcmwsXG4gICAgICAgIG9iamVjdFVybDogcG5nVXJsLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gPFF1b3RlIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgVmlkZW9BdHRhY2htZW50V09UaHVtYm5haWwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICByYXdBdHRhY2htZW50OiB7XG4gICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgZmlsZU5hbWU6ICdncmVhdC12aWRlby5tcDQnLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cblZpZGVvQXR0YWNobWVudFdPVGh1bWJuYWlsLnN0b3J5ID0ge1xuICBuYW1lOiAnVmlkZW8gQXR0YWNobWVudCB3L28gVGh1bWJuYWlsJyxcbn07XG5cbmV4cG9ydCBjb25zdCBWaWRlb1RhcFRvVmlldyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICcnLFxuICAgIGlzVmlld09uY2U6IHRydWUsXG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgIGZpbGVOYW1lOiAnZ3JlYXQtdmlkZW8ubXA0JyxcbiAgICAgIGlzVm9pY2VNZXNzYWdlOiBmYWxzZSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gPFF1b3RlIHsuLi5wcm9wc30gLz47XG59O1xuXG5WaWRlb1RhcFRvVmlldy5zdG9yeSA9IHtcbiAgbmFtZTogJ1ZpZGVvIFRhcC10by1WaWV3Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBHaWZ0QmFkZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiBcIlNvbWUgdGV4dCB3aGljaCBzaG91bGRuJ3QgYmUgcmVuZGVyZWRcIixcbiAgICBpc0dpZnRCYWRnZTogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIHJlbmRlckluTWVzc2FnZShwcm9wcyk7XG59O1xuXG5leHBvcnQgY29uc3QgQXVkaW9Pbmx5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IEFVRElPX01QMyxcbiAgICAgIGZpbGVOYW1lOiAnZ3JlYXQtdmlkZW8ubXAzJyxcbiAgICAgIGlzVm9pY2VNZXNzYWdlOiBmYWxzZSxcbiAgICB9LFxuICB9KTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHJvcHMudGV4dCA9IHVuZGVmaW5lZCBhcyBhbnk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEF1ZGlvQXR0YWNobWVudCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHJhd0F0dGFjaG1lbnQ6IHtcbiAgICAgIGNvbnRlbnRUeXBlOiBBVURJT19NUDMsXG4gICAgICBmaWxlTmFtZTogJ2dyZWF0LXZpZGVvLm1wMycsXG4gICAgICBpc1ZvaWNlTWVzc2FnZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFZvaWNlTWVzc2FnZU9ubHkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICByYXdBdHRhY2htZW50OiB7XG4gICAgICBjb250ZW50VHlwZTogQVVESU9fTVAzLFxuICAgICAgZmlsZU5hbWU6ICdncmVhdC12aWRlby5tcDMnLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IHRydWUsXG4gICAgfSxcbiAgfSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHByb3BzLnRleHQgPSB1bmRlZmluZWQgYXMgYW55O1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBWb2ljZU1lc3NhZ2VBdHRhY2htZW50ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IEFVRElPX01QMyxcbiAgICAgIGZpbGVOYW1lOiAnZ3JlYXQtdmlkZW8ubXAzJyxcbiAgICAgIGlzVm9pY2VNZXNzYWdlOiB0cnVlLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBPdGhlckZpbGVPbmx5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcmF3QXR0YWNobWVudDoge1xuICAgICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nKSxcbiAgICAgIGZpbGVOYW1lOiAnZ3JlYXQtZGF0YS5qc29uJyxcbiAgICAgIGlzVm9pY2VNZXNzYWdlOiBmYWxzZSxcbiAgICB9LFxuICB9KTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHJvcHMudGV4dCA9IHVuZGVmaW5lZCBhcyBhbnk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1lZGlhVGFwVG9WaWV3ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJycsXG4gICAgaXNWaWV3T25jZTogdHJ1ZSxcbiAgICByYXdBdHRhY2htZW50OiB7XG4gICAgICBjb250ZW50VHlwZTogQVVESU9fTVAzLFxuICAgICAgZmlsZU5hbWU6ICdncmVhdC12aWRlby5tcDMnLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbk1lZGlhVGFwVG9WaWV3LnN0b3J5ID0ge1xuICBuYW1lOiAnTWVkaWEgVGFwLXRvLVZpZXcnLFxufTtcblxuZXhwb3J0IGNvbnN0IE90aGVyRmlsZUF0dGFjaG1lbnQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICByYXdBdHRhY2htZW50OiB7XG4gICAgICBjb250ZW50VHlwZTogc3RyaW5nVG9NSU1FVHlwZSgnYXBwbGljYXRpb24vanNvbicpLFxuICAgICAgZmlsZU5hbWU6ICdncmVhdC1kYXRhLmpzb24nLFxuICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8UXVvdGUgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBMb25nTWVzc2FnZUF0dGFjaG1lbnRTaG91bGRCZUhpZGRlbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHJhd0F0dGFjaG1lbnQ6IHtcbiAgICAgIGNvbnRlbnRUeXBlOiBMT05HX01FU1NBR0UsXG4gICAgICBmaWxlTmFtZTogJ3NpZ25hbC1sb25nLW1lc3NhZ2UtMTIzLnR4dCcsXG4gICAgICBpc1ZvaWNlTWVzc2FnZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTG9uZ01lc3NhZ2VBdHRhY2htZW50U2hvdWxkQmVIaWRkZW4uc3RvcnkgPSB7XG4gIG5hbWU6ICdMb25nIG1lc3NhZ2UgYXR0YWNobWVudCAoc2hvdWxkIGJlIGhpZGRlbiknLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vQ2xvc2VCdXR0b24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKCk7XG4gIHByb3BzLm9uQ2xvc2UgPSB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VOb3RGb3VuZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiByZW5kZXJJbk1lc3NhZ2UocHJvcHMpO1xufTtcblxuZXhwb3J0IGNvbnN0IE1pc3NpbmdUZXh0QXR0YWNobWVudCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHJvcHMudGV4dCA9IHVuZGVmaW5lZCBhcyBhbnk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTWlzc2luZ1RleHRBdHRhY2htZW50LnN0b3J5ID0ge1xuICBuYW1lOiAnTWlzc2luZyBUZXh0ICYgQXR0YWNobWVudCcsXG59O1xuXG5leHBvcnQgY29uc3QgTWVudGlvbk91dGdvaW5nQW5vdGhlckF1dGhvciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF1dGhvclRpdGxlOiAnVG9ueSBTdGFyaycsXG4gICAgdGV4dDogJ0BDYXB0YWluIEFtZXJpY2EgTHVuY2ggbGF0ZXI/JyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTWVudGlvbk91dGdvaW5nQW5vdGhlckF1dGhvci5zdG9yeSA9IHtcbiAgbmFtZTogJ0BtZW50aW9uICsgb3V0Z29pbmcgKyBhbm90aGVyIGF1dGhvcicsXG59O1xuXG5leHBvcnQgY29uc3QgTWVudGlvbk91dGdvaW5nTWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBpc0Zyb21NZTogdHJ1ZSxcbiAgICB0ZXh0OiAnQENhcHRhaW4gQW1lcmljYSBMdW5jaCBsYXRlcj8nLFxuICB9KTtcblxuICByZXR1cm4gPFF1b3RlIHsuLi5wcm9wc30gLz47XG59O1xuXG5NZW50aW9uT3V0Z29pbmdNZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0BtZW50aW9uICsgb3V0Z29pbmcgKyBtZScsXG59O1xuXG5leHBvcnQgY29uc3QgTWVudGlvbkluY29taW5nQW5vdGhlckF1dGhvciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF1dGhvclRpdGxlOiAnQ2FwdGFpbiBBbWVyaWNhJyxcbiAgICBpc0luY29taW5nOiB0cnVlLFxuICAgIHRleHQ6ICdAVG9ueSBTdGFyayBzdXJlJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTWVudGlvbkluY29taW5nQW5vdGhlckF1dGhvci5zdG9yeSA9IHtcbiAgbmFtZTogJ0BtZW50aW9uICsgaW5jb21pbmcgKyBhbm90aGVyIGF1dGhvcicsXG59O1xuXG5leHBvcnQgY29uc3QgTWVudGlvbkluY29taW5nTWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBpc0Zyb21NZTogdHJ1ZSxcbiAgICBpc0luY29taW5nOiB0cnVlLFxuICAgIHRleHQ6ICdAVG9ueSBTdGFyayBzdXJlJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxRdW90ZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTWVudGlvbkluY29taW5nTWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdAbWVudGlvbiArIGluY29taW5nICsgbWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEN1c3RvbUNvbG9yID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPD5cbiAgICA8UXVvdGVcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7IGlzSW5jb21pbmc6IHRydWUsIHRleHQ6ICdTb2xpZCArIEdyYWRpZW50JyB9KX1cbiAgICAgIGN1c3RvbUNvbG9yPXt7XG4gICAgICAgIHN0YXJ0OiB7IGh1ZTogODIsIHNhdHVyYXRpb246IDM1IH0sXG4gICAgICB9fVxuICAgIC8+XG4gICAgPFF1b3RlXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoKX1cbiAgICAgIGN1c3RvbUNvbG9yPXt7XG4gICAgICAgIGRlZzogMTkyLFxuICAgICAgICBzdGFydDogeyBodWU6IDMwNCwgc2F0dXJhdGlvbjogODUgfSxcbiAgICAgICAgZW5kOiB7IGh1ZTogMjMxLCBzYXR1cmF0aW9uOiA3NiB9LFxuICAgICAgfX1cbiAgICAvPlxuICA8Lz5cbik7XG5cbmV4cG9ydCBjb25zdCBJc1N0b3J5UmVwbHkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnV293IScsXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPFF1b3RlXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBhdXRob3JUaXRsZT1cIkFtYW5kYVwiXG4gICAgICBpc1N0b3J5UmVwbHlcbiAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlN0b3J5UmVwbHlRdW90ZVwiXG4gICAgICBvbkNsb3NlPXt1bmRlZmluZWR9XG4gICAgICByYXdBdHRhY2htZW50PXt7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICAgIGZpbGVOYW1lOiAnZ3JlYXQtdmlkZW8ubXA0JyxcbiAgICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgICAgfX1cbiAgICAvPlxuICApO1xufTtcblxuSXNTdG9yeVJlcGx5LnN0b3J5ID0ge1xuICBuYW1lOiAnaXNTdG9yeVJlcGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBJc1N0b3J5UmVwbHlFbW9qaSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gKFxuICAgIDxRdW90ZVxuICAgICAgey4uLnByb3BzfVxuICAgICAgYXV0aG9yVGl0bGU9XCJDaGFybGllXCJcbiAgICAgIGlzU3RvcnlSZXBseVxuICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiU3RvcnlSZXBseVF1b3RlXCJcbiAgICAgIG9uQ2xvc2U9e3VuZGVmaW5lZH1cbiAgICAgIHJhd0F0dGFjaG1lbnQ9e3tcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgZmlsZU5hbWU6ICdzYXgucG5nJyxcbiAgICAgICAgaXNWb2ljZU1lc3NhZ2U6IGZhbHNlLFxuICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgICAgcGF0aDogcG5nVXJsLFxuICAgICAgICAgIG9iamVjdFVybDogcG5nVXJsLFxuICAgICAgICB9LFxuICAgICAgfX1cbiAgICAgIHJlYWN0aW9uRW1vamk9XCJcdUQ4M0NcdURGQ0JcdUZFMEZcIlxuICAgIC8+XG4gICk7XG59O1xuXG5Jc1N0b3J5UmVwbHlFbW9qaS5zdG9yeSA9IHtcbiAgbmFtZTogJ2lzU3RvcnlSZXBseSBlbW9qaScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixvQkFBeUI7QUFFekIsMkJBQXVCO0FBQ3ZCLHlCQUE4QjtBQUU5QixvQkFBbUM7QUFDbkMsc0JBQXVCO0FBRXZCLHFCQUF1QztBQUN2QyxrQkFNTztBQUVQLG1CQUFzQjtBQUN0QiwrQkFBMkI7QUFDM0IsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUN2QixvQ0FBdUM7QUFDdkMsa0JBQWdDO0FBQ2hDLGtCQUEwQjtBQUUxQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHdCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLHNCQUFxQztBQUFBLEVBQ3pDLFFBQVEsMERBQXVCO0FBQUEsSUFDN0IsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUFBLEVBQ0QsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsMkJBQTJCO0FBQUEsRUFDM0Isc0JBQXNCO0FBQUEsRUFDdEIsYUFBYTtBQUFBLEVBQ2IsaUJBQWlCLGlDQUFPLGlCQUFpQjtBQUFBLEVBQ3pDLHNCQUFzQixpQ0FBTywrQkFBK0I7QUFBQSxFQUM1RCxxQkFBcUIsTUFBTSxVQUF1QjtBQUFBLEVBQ2xELDBCQUEwQiw0QkFBZ0I7QUFBQSxFQUMxQyxtQkFBbUI7QUFBQSxFQUNuQixnQkFBZ0I7QUFBQSxFQUNoQixtQkFBbUI7QUFBQSxFQUNuQixrQkFBa0I7QUFBQSxFQUNsQixlQUFlLGlDQUFPLHdCQUF3QjtBQUFBLEVBQzlDLDBCQUEwQixpQ0FBTyxtQ0FBbUM7QUFBQSxFQUNwRSxXQUFXO0FBQUEsRUFDWCx5QkFBeUIsaUNBQU8sa0NBQWtDO0FBQUEsRUFDbEUsb0JBQW9CLGlDQUFPLDZCQUE2QjtBQUFBLEVBQ3hELGtDQUFrQyxpQ0FDaEMsMkNBQ0Y7QUFBQSxFQUNBLG1CQUFtQixNQUFNO0FBQUEsRUFDekI7QUFBQSxFQUNBLElBQUk7QUFBQSxFQUNKLGtCQUFrQjtBQUFBLEVBQ2xCLGlCQUFpQjtBQUFBLEVBQ2pCLFdBQVc7QUFBQSxFQUNYLDBCQUEwQjtBQUFBLEVBQzFCLDJCQUEyQixpQ0FBTyxvQ0FBb0M7QUFBQSxFQUN0RSwyQkFBMkIsaUNBQU8sb0NBQW9DO0FBQUEsRUFDdEUsWUFBWSxpQ0FBTyxxQkFBcUI7QUFBQSxFQUN4QyxpQkFBaUIsaUNBQU8sMkJBQTJCO0FBQUEsRUFDbkQsa0JBQWtCLGlDQUFPLDJCQUEyQjtBQUFBLEVBQ3BELGVBQWUsaUNBQU8sZUFBZTtBQUFBLEVBQ3JDLFVBQVUsaUNBQU8sbUJBQW1CO0FBQUEsRUFDcEMsVUFBVSxDQUFDO0FBQUEsRUFDWCxnQkFBZ0IsaUNBQU8seUJBQXlCO0FBQUEsRUFDaEQsWUFBWSxvQ0FBVztBQUFBLEVBQ3ZCLG1CQUFtQixNQUFNLG9DQUFDLFdBQUk7QUFBQSxFQUM5QixzQkFBc0IsTUFBTSxvQ0FBQyxXQUFJO0FBQUEsRUFDakMsdUJBQXVCLE1BQU0sb0NBQUMsYUFBSSxtQkFBaUI7QUFBQSxFQUNuRCxnQkFBZ0IsaUNBQU8seUJBQXlCO0FBQUEsRUFDaEQsV0FBVyxpQ0FBTyxvQkFBb0I7QUFBQSxFQUN0Qyx3QkFBd0IsaUNBQU8saUNBQWlDO0FBQUEsRUFDaEUsdUJBQXVCLGlDQUFPLGdDQUFnQztBQUFBLEVBQzlELGVBQWUsaUNBQU8sd0JBQXdCO0FBQUEsRUFDOUMscUJBQXFCO0FBQUEsRUFDckIscUJBQXFCO0FBQUEsRUFDckIsb0JBQW9CO0FBQUEsRUFDcEIsbUJBQW1CLGlDQUFPLDRCQUE0QjtBQUFBLEVBQ3RELGtCQUFrQixpQ0FBTywyQkFBMkI7QUFBQSxFQUNwRCxtQ0FBbUMsaUNBQ2pDLG1DQUNGO0FBQUEsRUFDQSxtQ0FBbUMsaUNBQ2pDLG1DQUNGO0FBQUEsRUFDQSx5QkFBeUIsaUNBQU8sa0NBQWtDO0FBQUEsRUFDbEUsbUJBQW1CLGlDQUFPLDRCQUE0QjtBQUFBLEVBQ3RELHNCQUFzQixpQ0FBTywrQkFBK0I7QUFBQSxFQUM1RCxtQkFBbUIsaUNBQU8sNEJBQTRCO0FBQUEsRUFDdEQsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBLEVBQ04sZUFBZSw2QkFBYztBQUFBLEVBQzdCLE9BQU8sc0JBQVU7QUFBQSxFQUNqQixXQUFXLEtBQUssSUFBSTtBQUN0QjtBQUVBLE1BQU0sa0JBQWtCLHdCQUFDO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE1BQU07QUFBQSxNQUNLO0FBQ1gsUUFBTSxlQUFlO0FBQUEsT0FDaEI7QUFBQSxJQUNIO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUSxLQUFLLElBQUksSUFBSSxLQUFLO0FBQUEsTUFDMUIsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQUksT0FBTyxFQUFFLFVBQVUsU0FBUztBQUFBLEtBQy9CLG9DQUFDO0FBQUEsT0FBWTtBQUFBLEdBQWMsR0FDM0Isb0NBQUMsVUFBRyxHQUNKLG9DQUFDO0FBQUEsT0FBWTtBQUFBLElBQWMsV0FBVTtBQUFBLEdBQVcsQ0FDbEQ7QUFFSixHQWxDd0I7QUFvQ3hCLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsYUFBYSw2QkFDWCxlQUNBLGNBQWMsZUFBZSxnQkFDL0I7QUFBQSxFQUNBLG1CQUFtQixjQUFjLHFCQUFxQjtBQUFBLEVBQ3RELGtDQUNFLGNBQWMsb0NBQ2QsaUNBQU8sa0NBQWtDO0FBQUEsRUFDM0M7QUFBQSxFQUNBLFVBQVUsZ0NBQVEsWUFBWSxjQUFjLFlBQVksS0FBSztBQUFBLEVBQzdELFlBQVksZ0NBQVEsY0FBYyxjQUFjLGNBQWMsS0FBSztBQUFBLEVBQ25FLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLGVBQWUsY0FBYyxpQkFBaUI7QUFBQSxFQUM5QywyQkFBMkIsZ0NBQ3pCLDZCQUNBLGNBQWMsNkJBQTZCLEtBQzdDO0FBQUEsRUFDQSxhQUFhLGdDQUFRLGVBQWUsY0FBYyxlQUFlLEtBQUs7QUFBQSxFQUN0RSxZQUFZLGdDQUFRLGNBQWMsY0FBYyxjQUFjLEtBQUs7QUFBQSxFQUNuRSxNQUFNLDZCQUNKLFFBQ0EsNEJBQVMsY0FBYyxJQUFJLElBQ3ZCLGNBQWMsT0FDZCw2QkFDTjtBQUNGLElBM0JvQjtBQTZCYixNQUFNLDBCQUEwQiw2QkFBbUI7QUFDeEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixhQUFhO0FBQUEsRUFDZixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBTnVDO0FBUXZDLHdCQUF3QixRQUFRO0FBQUEsRUFDOUIsTUFBTTtBQUNSO0FBRU8sTUFBTSxlQUFlLDZCQUFtQjtBQUM3QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBVTtBQUFBLEdBQU87QUFDM0IsR0FONEI7QUFRNUIsYUFBYSxRQUFRO0FBQUEsRUFDbkIsTUFBTTtBQUNSO0FBRU8sTUFBTSwwQkFBMEIsNkJBQW1CO0FBQ3hELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVB1QztBQVN2Qyx3QkFBd0IsUUFBUTtBQUFBLEVBQzlCLE1BQU07QUFDUjtBQUVPLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixVQUFVO0FBQUEsSUFDVixZQUFZO0FBQUEsRUFDZCxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBUDRCO0FBUzVCLGFBQWEsUUFBUTtBQUFBLEVBQ25CLE1BQU07QUFDUjtBQUVPLE1BQU0seUJBQXlCLDZCQUFtQjtBQUN2RCxRQUFNLFFBQVEsWUFBWSxDQUFDLENBQUM7QUFDNUIsU0FDRSwwREFDRyxpQ0FBbUIsSUFBSSxXQUN0QixnQkFBZ0IsS0FBSyxPQUFPLG1CQUFtQixNQUFNLENBQUMsQ0FDeEQsQ0FDRjtBQUVKLEdBVHNDO0FBV3RDLHVCQUF1QixRQUFRO0FBQUEsRUFDN0IsTUFBTTtBQUNSO0FBRU8sTUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxJQUNOLGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQWxCeUI7QUFvQmxCLE1BQU0sa0JBQWtCLDZCQUFtQjtBQUNoRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQWpCK0I7QUFtQnhCLE1BQU0sNkJBQTZCLDZCQUFtQjtBQUMzRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBVjBDO0FBWTFDLDJCQUEyQixRQUFRO0FBQUEsRUFDakMsTUFBTTtBQUNSO0FBRU8sTUFBTSxpQkFBaUIsNkJBQW1CO0FBQy9DLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osZUFBZTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLE1BQ1YsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBVTtBQUFBLEdBQU87QUFDM0IsR0FaOEI7QUFjOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSO0FBRU8sTUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sT0FBTztBQUViLFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQW5CeUI7QUFxQmxCLE1BQU0sa0JBQWtCLDZCQUFtQjtBQUNoRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQWpCK0I7QUFtQnhCLE1BQU0sNkJBQTZCLDZCQUFtQjtBQUMzRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBVjBDO0FBWTFDLDJCQUEyQixRQUFRO0FBQUEsRUFDakMsTUFBTTtBQUNSO0FBRU8sTUFBTSxpQkFBaUIsNkJBQW1CO0FBQy9DLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osZUFBZTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLE1BQ1YsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBVTtBQUFBLEdBQU87QUFDM0IsR0FaOEI7QUFjOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSO0FBRU8sTUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNmLENBQUM7QUFFRCxTQUFPLGdCQUFnQixLQUFLO0FBQzlCLEdBUHlCO0FBU2xCLE1BQU0sWUFBWSw2QkFBbUI7QUFDMUMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sT0FBTztBQUViLFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVp5QjtBQWNsQixNQUFNLGtCQUFrQiw2QkFBbUI7QUFDaEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVYrQjtBQVl4QixNQUFNLG1CQUFtQiw2QkFBbUI7QUFDakQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sT0FBTztBQUViLFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVpnQztBQWN6QixNQUFNLHlCQUF5Qiw2QkFBbUI7QUFDdkQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVZzQztBQVkvQixNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhLGtDQUFpQixrQkFBa0I7QUFBQSxNQUNoRCxVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sT0FBTztBQUViLFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVo2QjtBQWN0QixNQUFNLGlCQUFpQiw2QkFBbUI7QUFDL0MsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVo4QjtBQWM5QixlQUFlLFFBQVE7QUFBQSxFQUNyQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHNCQUFzQiw2QkFBbUI7QUFDcEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhLGtDQUFpQixrQkFBa0I7QUFBQSxNQUNoRCxVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVZtQztBQVk1QixNQUFNLHNDQUFzQyw2QkFBbUI7QUFDcEUsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVZtRDtBQVluRCxvQ0FBb0MsUUFBUTtBQUFBLEVBQzFDLE1BQU07QUFDUjtBQUVPLE1BQU0sZ0JBQWdCLDZCQUFtQjtBQUM5QyxRQUFNLFFBQVEsWUFBWTtBQUMxQixRQUFNLFVBQVU7QUFFaEIsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBTDZCO0FBT3RCLE1BQU0sa0JBQWtCLDZCQUFtQjtBQUNoRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLDJCQUEyQjtBQUFBLEVBQzdCLENBQUM7QUFFRCxTQUFPLGdCQUFnQixLQUFLO0FBQzlCLEdBTitCO0FBUXhCLE1BQU0sd0JBQXdCLDZCQUFtQjtBQUN0RCxRQUFNLFFBQVEsWUFBWTtBQUUxQixRQUFNLE9BQU87QUFFYixTQUFPLG9DQUFDO0FBQUEsT0FBVTtBQUFBLEdBQU87QUFDM0IsR0FOcUM7QUFRckMsc0JBQXNCLFFBQVE7QUFBQSxFQUM1QixNQUFNO0FBQ1I7QUFFTyxNQUFNLCtCQUErQiw2QkFBbUI7QUFDN0QsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixhQUFhO0FBQUEsSUFDYixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBUDRDO0FBUzVDLDZCQUE2QixRQUFRO0FBQUEsRUFDbkMsTUFBTTtBQUNSO0FBRU8sTUFBTSxvQkFBb0IsNkJBQW1CO0FBQ2xELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQVBpQztBQVNqQyxrQkFBa0IsUUFBUTtBQUFBLEVBQ3hCLE1BQU07QUFDUjtBQUVPLE1BQU0sK0JBQStCLDZCQUFtQjtBQUM3RCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBVTtBQUFBLEdBQU87QUFDM0IsR0FSNEM7QUFVNUMsNkJBQTZCLFFBQVE7QUFBQSxFQUNuQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLG9CQUFvQiw2QkFBbUI7QUFDbEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixVQUFVO0FBQUEsSUFDVixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVU7QUFBQSxHQUFPO0FBQzNCLEdBUmlDO0FBVWpDLGtCQUFrQixRQUFRO0FBQUEsRUFDeEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxjQUFjLDZCQUN6QiwwREFDRSxvQ0FBQztBQUFBLEtBQ0ssWUFBWSxFQUFFLFlBQVksTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBQUEsRUFDOUQsYUFBYTtBQUFBLElBQ1gsT0FBTyxFQUFFLEtBQUssSUFBSSxZQUFZLEdBQUc7QUFBQSxFQUNuQztBQUFBLENBQ0YsR0FDQSxvQ0FBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLEVBQ2hCLGFBQWE7QUFBQSxJQUNYLEtBQUs7QUFBQSxJQUNMLE9BQU8sRUFBRSxLQUFLLEtBQUssWUFBWSxHQUFHO0FBQUEsSUFDbEMsS0FBSyxFQUFFLEtBQUssS0FBSyxZQUFZLEdBQUc7QUFBQSxFQUNsQztBQUFBLENBQ0YsQ0FDRixHQWhCeUI7QUFtQnBCLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FDRSxvQ0FBQztBQUFBLE9BQ0s7QUFBQSxJQUNKLGFBQVk7QUFBQSxJQUNaLGNBQVk7QUFBQSxJQUNaLGlCQUFnQjtBQUFBLElBQ2hCLFNBQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsR0FDRjtBQUVKLEdBbkI0QjtBQXFCNUIsYUFBYSxRQUFRO0FBQUEsRUFDbkIsTUFBTTtBQUNSO0FBRU8sTUFBTSxvQkFBb0IsNkJBQW1CO0FBQ2xELFFBQU0sUUFBUSxZQUFZO0FBRTFCLFNBQ0Usb0NBQUM7QUFBQSxPQUNLO0FBQUEsSUFDSixhQUFZO0FBQUEsSUFDWixjQUFZO0FBQUEsSUFDWixpQkFBZ0I7QUFBQSxJQUNoQixTQUFTO0FBQUEsSUFDVCxlQUFlO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWM7QUFBQSxHQUNoQjtBQUVKLEdBekJpQztBQTJCakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
