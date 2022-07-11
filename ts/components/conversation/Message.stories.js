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
var Message_stories_exports = {};
__export(Message_stories_exports, {
  AllTheContextMenus: () => AllTheContextMenus,
  AudioWithCaption: () => AudioWithCaption,
  AudioWithNotDownloadedAttachment: () => AudioWithNotDownloadedAttachment,
  AudioWithPendingAttachment: () => AudioWithPendingAttachment,
  AvatarInGroup: () => AvatarInGroup,
  BadgeInGroup: () => BadgeInGroup,
  CanDeleteForEveryone: () => CanDeleteForEveryone,
  CollapsingTextOnlyDMs: () => CollapsingTextOnlyDMs,
  CollapsingTextOnlyGroupMessages: () => CollapsingTextOnlyGroupMessages,
  Colors: () => Colors,
  CustomColor: () => CustomColor,
  DangerousFileType: () => DangerousFileType,
  Deleted: () => Deleted,
  DeletedWithError: () => DeletedWithError,
  DeletedWithExpireTimer: () => DeletedWithExpireTimer,
  Delivered: () => Delivered,
  EmbeddedContactFamilyName: () => EmbeddedContactFamilyName,
  EmbeddedContactFullContact: () => EmbeddedContactFullContact,
  EmbeddedContactGivenFamilyName: () => EmbeddedContactGivenFamilyName,
  EmbeddedContactGivenName: () => EmbeddedContactGivenName,
  EmbeddedContactLoadingAvatar: () => EmbeddedContactLoadingAvatar,
  EmbeddedContactOnlyEmail: () => EmbeddedContactOnlyEmail,
  EmbeddedContactOrganization: () => EmbeddedContactOrganization,
  EmbeddedContactWithSendMessage: () => EmbeddedContactWithSendMessage,
  EmojiMessages: () => EmojiMessages,
  Error: () => Error2,
  Expiring: () => Expiring,
  Gif: () => Gif,
  GifInAGroup: () => GifInAGroup,
  GiftBadgeMissingBadge: () => GiftBadgeMissingBadge,
  GiftBadgeOpened60Minutes: () => GiftBadgeOpened60Minutes,
  GiftBadgeOpenedExpired: () => GiftBadgeOpenedExpired,
  GiftBadgeRedeemed1Minute: () => GiftBadgeRedeemed1Minute,
  GiftBadgeRedeemed24Hours: () => GiftBadgeRedeemed24Hours,
  GiftBadgeRedeemed30Days: () => GiftBadgeRedeemed30Days,
  GiftBadgeUnopened: () => GiftBadgeUnopened,
  Image: () => Image,
  ImageWithCaption: () => ImageWithCaption,
  LinkPreviewInGroup: () => LinkPreviewInGroup,
  LinkPreviewWithLongDescription: () => LinkPreviewWithLongDescription,
  LinkPreviewWithNoDate: () => LinkPreviewWithNoDate,
  LinkPreviewWithNoDescription: () => LinkPreviewWithNoDescription,
  LinkPreviewWithQuote: () => LinkPreviewWithQuote,
  LinkPreviewWithSmallImage: () => LinkPreviewWithSmallImage,
  LinkPreviewWithSmallImageLongDescription: () => LinkPreviewWithSmallImageLongDescription,
  LinkPreviewWithTooNewADate: () => LinkPreviewWithTooNewADate,
  LinkPreviewWithoutImage: () => LinkPreviewWithoutImage,
  LongAudio: () => LongAudio,
  LongBodyCanBeDownloaded: () => LongBodyCanBeDownloaded,
  Mentions: () => Mentions,
  MultipleImages2: () => MultipleImages2,
  MultipleImages3: () => MultipleImages3,
  MultipleImages4: () => MultipleImages4,
  MultipleImages5: () => MultipleImages5,
  NotApprovedWithLinkPreview: () => NotApprovedWithLinkPreview,
  NotDownloadedGif: () => NotDownloadedGif,
  Older: () => Older,
  OtherFileType: () => OtherFileType,
  OtherFileTypeWithCaption: () => OtherFileTypeWithCaption,
  OtherFileTypeWithLongFilename: () => OtherFileTypeWithLongFilename,
  PartialSend: () => PartialSend,
  Paused: () => Paused,
  Pending: () => Pending,
  PendingGif: () => PendingGif,
  PlainMessage: () => PlainMessage,
  PlainRtlMessage: () => PlainRtlMessage,
  ReactionsShortMessage: () => ReactionsShortMessage,
  ReactionsWiderMessage: () => ReactionsWiderMessage,
  Read: () => Read,
  Recent: () => Recent,
  Sending: () => Sending,
  Sticker: () => Sticker,
  StoryReply: () => StoryReply,
  StoryReplyEmoji: () => StoryReplyEmoji,
  StoryReplyYours: () => StoryReplyYours,
  TapToViewError: () => TapToViewError,
  TapToViewExpired: () => TapToViewExpired,
  TapToViewGif: () => TapToViewGif,
  TapToViewImage: () => TapToViewImage,
  TapToViewVideo: () => TapToViewVideo,
  WillExpireButStillSending: () => WillExpireButStillSending,
  _Audio: () => _Audio,
  default: () => Message_stories_default
});
module.exports = __toCommonJS(Message_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_protobuf = require("../../protobuf");
var import_Colors = require("../../types/Colors");
var import_EmojiPicker = require("../emoji/EmojiPicker");
var import_Message = require("./Message");
var import_MIME = require("../../types/MIME");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_MessageAudio = require("./MessageAudio");
var import_GlobalAudioContext = require("../GlobalAudioContext");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_Fixtures = require("../../storybook/Fixtures");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_util = require("../_util");
var import_durations = require("../../util/durations");
var import_EmbeddedContact = require("../../types/EmbeddedContact");
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
var import_getFakeBadge = require("../../test-both/helpers/getFakeBadge");
var import_Util = require("../../types/Util");
var import_UUID = require("../../types/UUID");
var import_BadgeCategory = require("../../badges/BadgeCategory");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const quoteOptions = {
  none: void 0,
  basic: {
    conversationColor: import_Colors.ConversationColors[2],
    text: "The quoted message",
    isFromMe: false,
    sentAt: Date.now(),
    authorId: "some-id",
    authorTitle: "Someone",
    referencedMessageNotFound: false,
    isViewOnce: false,
    isGiftBadge: false
  }
};
var Message_stories_default = {
  title: "Components/Conversation/Message",
  argTypes: {
    conversationType: {
      control: "select",
      defaultValue: "direct",
      options: ["direct", "group"]
    },
    quote: {
      control: "select",
      defaultValue: void 0,
      mapping: quoteOptions,
      options: Object.keys(quoteOptions)
    }
  }
};
const Template = /* @__PURE__ */ __name((args) => {
  return renderBothDirections({
    ...createProps(),
    conversationType: "direct",
    quote: void 0,
    ...args
  });
}, "Template");
function getJoyReaction() {
  return {
    emoji: "\u{1F602}",
    from: (0, import_getDefaultConversation.getDefaultConversation)({
      id: "+14155552674",
      phoneNumber: "+14155552674",
      name: "Amelia Briggs",
      title: "Amelia"
    }),
    timestamp: Date.now() - 10
  };
}
const renderEmojiPicker = /* @__PURE__ */ __name(({
  onClose,
  onPickEmoji,
  ref
}) => /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
  i18n: (0, import_setupI18n.setupI18n)("en", import_messages.default),
  skinTone: 0,
  onSetSkinTone: (0, import_addon_actions.action)("EmojiPicker::onSetSkinTone"),
  ref,
  onClose,
  onPickEmoji
}), "renderEmojiPicker");
const renderReactionPicker = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement("div", null), "renderReactionPicker");
const MessageAudioContainer = /* @__PURE__ */ __name((props) => {
  const [active, setActive] = React.useState({});
  const audio = React.useMemo(() => new Audio(), []);
  return /* @__PURE__ */ React.createElement(import_MessageAudio.MessageAudio, {
    ...props,
    id: "storybook",
    renderingContext: "storybook",
    audio,
    computePeaks: import_GlobalAudioContext.computePeaks,
    setActiveAudioID: (id, context) => setActive({ id, context }),
    onFirstPlayed: (0, import_addon_actions.action)("onFirstPlayed"),
    activeAudioID: active.id,
    activeAudioContext: active.context
  });
}, "MessageAudioContainer");
const renderAudioAttachment = /* @__PURE__ */ __name((props) => /* @__PURE__ */ React.createElement(MessageAudioContainer, {
  ...props
}), "renderAudioAttachment");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  attachments: overrideProps.attachments,
  author: overrideProps.author || (0, import_getDefaultConversation.getDefaultConversation)(),
  reducedMotion: (0, import_addon_knobs.boolean)("reducedMotion", false),
  bodyRanges: overrideProps.bodyRanges,
  canReact: true,
  canReply: true,
  canDownload: true,
  canDeleteForEveryone: overrideProps.canDeleteForEveryone || false,
  canRetry: overrideProps.canRetry || false,
  canRetryDeleteForEveryone: overrideProps.canRetryDeleteForEveryone || false,
  checkForAccount: (0, import_addon_actions.action)("checkForAccount"),
  clearSelectedMessage: (0, import_addon_actions.action)("clearSelectedMessage"),
  containerElementRef: React.createRef(),
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  conversationColor: overrideProps.conversationColor || (0, import_addon_knobs.select)("conversationColor", import_Colors.ConversationColors, import_Colors.ConversationColors[0]),
  conversationTitle: overrideProps.conversationTitle || (0, import_addon_knobs.text)("conversationTitle", "Conversation Title"),
  conversationId: (0, import_addon_knobs.text)("conversationId", overrideProps.conversationId || ""),
  conversationType: overrideProps.conversationType || "direct",
  contact: overrideProps.contact,
  deletedForEveryone: overrideProps.deletedForEveryone,
  deleteMessage: (0, import_addon_actions.action)("deleteMessage"),
  deleteMessageForEveryone: (0, import_addon_actions.action)("deleteMessageForEveryone"),
  disableMenu: overrideProps.disableMenu,
  disableScroll: overrideProps.disableScroll,
  direction: overrideProps.direction || "incoming",
  displayTapToViewMessage: (0, import_addon_actions.action)("displayTapToViewMessage"),
  doubleCheckMissingQuoteReference: (0, import_addon_actions.action)("doubleCheckMissingQuoteReference"),
  downloadAttachment: (0, import_addon_actions.action)("downloadAttachment"),
  expirationLength: (0, import_addon_knobs.number)("expirationLength", overrideProps.expirationLength || 0) || void 0,
  expirationTimestamp: (0, import_addon_knobs.number)("expirationTimestamp", overrideProps.expirationTimestamp || 0) || void 0,
  getPreferredBadge: overrideProps.getPreferredBadge || (() => void 0),
  giftBadge: overrideProps.giftBadge,
  i18n,
  id: (0, import_addon_knobs.text)("id", overrideProps.id || "random-message-id"),
  renderingContext: "storybook",
  interactionMode: overrideProps.interactionMode || "keyboard",
  isSticker: (0, import_lodash.isBoolean)(overrideProps.isSticker) ? overrideProps.isSticker : false,
  isBlocked: (0, import_lodash.isBoolean)(overrideProps.isBlocked) ? overrideProps.isBlocked : false,
  isMessageRequestAccepted: (0, import_lodash.isBoolean)(overrideProps.isMessageRequestAccepted) ? overrideProps.isMessageRequestAccepted : true,
  isTapToView: overrideProps.isTapToView,
  isTapToViewError: overrideProps.isTapToViewError,
  isTapToViewExpired: overrideProps.isTapToViewExpired,
  kickOffAttachmentDownload: (0, import_addon_actions.action)("kickOffAttachmentDownload"),
  markAttachmentAsCorrupted: (0, import_addon_actions.action)("markAttachmentAsCorrupted"),
  markViewed: (0, import_addon_actions.action)("markViewed"),
  messageExpanded: (0, import_addon_actions.action)("messageExpanded"),
  openConversation: (0, import_addon_actions.action)("openConversation"),
  openGiftBadge: (0, import_addon_actions.action)("openGiftBadge"),
  openLink: (0, import_addon_actions.action)("openLink"),
  previews: overrideProps.previews || [],
  quote: overrideProps.quote || void 0,
  reactions: overrideProps.reactions,
  reactToMessage: (0, import_addon_actions.action)("reactToMessage"),
  readStatus: overrideProps.readStatus === void 0 ? import_MessageReadStatus.ReadStatus.Read : overrideProps.readStatus,
  renderEmojiPicker,
  renderReactionPicker,
  renderAudioAttachment,
  replyToMessage: (0, import_addon_actions.action)("replyToMessage"),
  retrySend: (0, import_addon_actions.action)("retrySend"),
  retryDeleteForEveryone: (0, import_addon_actions.action)("retryDeleteForEveryone"),
  scrollToQuotedMessage: (0, import_addon_actions.action)("scrollToQuotedMessage"),
  selectMessage: (0, import_addon_actions.action)("selectMessage"),
  shouldCollapseAbove: (0, import_lodash.isBoolean)(overrideProps.shouldCollapseAbove) ? overrideProps.shouldCollapseAbove : false,
  shouldCollapseBelow: (0, import_lodash.isBoolean)(overrideProps.shouldCollapseBelow) ? overrideProps.shouldCollapseBelow : false,
  shouldHideMetadata: (0, import_lodash.isBoolean)(overrideProps.shouldHideMetadata) ? overrideProps.shouldHideMetadata : false,
  showContactDetail: (0, import_addon_actions.action)("showContactDetail"),
  showContactModal: (0, import_addon_actions.action)("showContactModal"),
  showExpiredIncomingTapToViewToast: (0, import_addon_actions.action)("showExpiredIncomingTapToViewToast"),
  showExpiredOutgoingTapToViewToast: (0, import_addon_actions.action)("showExpiredOutgoingTapToViewToast"),
  showForwardMessageModal: (0, import_addon_actions.action)("showForwardMessageModal"),
  showMessageDetail: (0, import_addon_actions.action)("showMessageDetail"),
  showVisualAttachment: (0, import_addon_actions.action)("showVisualAttachment"),
  startConversation: (0, import_addon_actions.action)("startConversation"),
  status: overrideProps.status || "sent",
  text: overrideProps.text || (0, import_addon_knobs.text)("text", ""),
  textDirection: overrideProps.textDirection || import_Message.TextDirection.Default,
  textAttachment: overrideProps.textAttachment || {
    contentType: import_MIME.LONG_MESSAGE,
    size: 123,
    pending: (0, import_addon_knobs.boolean)("textPending", false)
  },
  theme: import_Util.ThemeType.light,
  timestamp: (0, import_addon_knobs.number)("timestamp", overrideProps.timestamp || Date.now())
}), "createProps");
const createTimelineItem = /* @__PURE__ */ __name((data) => data && {
  type: "message",
  data,
  timestamp: data.timestamp
}, "createTimelineItem");
const renderMany = /* @__PURE__ */ __name((propsArray) => /* @__PURE__ */ React.createElement(React.Fragment, null, propsArray.map((message, index) => /* @__PURE__ */ React.createElement(import_Message.Message, {
  key: message.text,
  ...message,
  shouldCollapseAbove: Boolean(propsArray[index - 1]),
  item: createTimelineItem(message),
  shouldCollapseBelow: Boolean(propsArray[index + 1])
}))), "renderMany");
const renderThree = /* @__PURE__ */ __name((props) => renderMany([props, props, props]), "renderThree");
const renderBothDirections = /* @__PURE__ */ __name((props) => /* @__PURE__ */ React.createElement(React.Fragment, null, renderThree(props), renderThree({
  ...props,
  author: { ...props.author, id: (0, import_getDefaultConversation.getDefaultConversation)().id },
  direction: "outgoing"
})), "renderBothDirections");
const PlainMessage = Template.bind({});
PlainMessage.args = {
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look."
};
const PlainRtlMessage = Template.bind({});
PlainRtlMessage.args = {
  text: '\u0627\u0644\u0623\u0633\u0627\u0646\u0633\u064A\u0631\u060C \u0639\u0644\u0634\u0627\u0646 \u0627\u0644\u0642\u0637\u0637 \u0645\u0627\u062A\u0627\u0643\u0644\u0634 \u0645\u0646\u0647\u0627. \u0648\u0646\u0646\u0633\u0627\u0647\u0627\u060C \u0648\u0646\u0639\u0648\u062F \u0627\u0644\u0649 \u0623\u0648\u0631\u0627\u0642\u0646\u0627 \u0645\u0648\u0635\u062F\u064A\u0646 \u0627\u0644\u0628\u0627\u0628 \u0628\u0625\u062D\u0643\u0627\u0645. \u0646\u062A\u0646\u062D\u0646\u062D\u060C \u0648\u0646\u0642\u0648\u0644: \u0627\u0644\u0628\u062A\u0627\u0639. \u0643\u0644\u0645\u0629 \u062A\u062F\u0644\u0651 \u0639\u0644\u0649 \u0644\u0627 \u0634\u064A\u0621\u060C \u0648\u0639\u0644\u0649 \u0643\u0644\u0651 \u0634\u064A\u0621. \u0648\u0647\u064A \u0645\u0631\u0643\u0632 \u0623\u0628\u062D\u0627\u062B \u0634\u0639\u0628\u064A\u0629 \u0643\u062B\u064A\u0631\u0629\u060C \u062A\u062A\u0639\u062C\u0651\u0628 \u0645\u0646 \u063A\u0631\u0627\u0628\u062A\u0647\u0627 \u0648\u0627\u0644\u0642\u0648\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0627\u0644\u062A\u064A \u062A\u0639\u0643\u0633\u0647\u0627\u060C \u0627\u0644\u0649 \u062C\u0627\u0646\u0628 \u0627\u0644\u0634\u064A\u0621 \u0627\u0644\u0643\u062B\u064A\u0631 \u0645\u0646 \u0627\u0644\u0639\u0641\u0648\u064A\u0629 \u0648\u062D\u0644\u0627\u0648\u0629 \u0627\u0644\u0631\u0648\u062D. \u0646\u0639\u0645\u060C \u0646\u062D\u0646 \u0642\u0631\u0623\u0646\u0627 \u0648\u0633\u0645\u0639\u0646\u0627 \u0648\u0639\u0631\u0641\u0646\u0627 \u0643\u0644 \u0647\u0630\u0627. \u0644\u0643\u0646\u0647 \u0645\u062D\u0644\u0651 \u0627\u0647\u062A\u0645\u0627\u0645\u0646\u0627 \u0627\u0644\u064A\u0648\u0645 \u0644\u0623\u0633\u0628\u0627\u0628 \u063A\u064A\u0631 \u062A\u0644\u0643 \u0627\u0644\u0623\u0633\u0628\u0627\u0628. \u0643\u0630\u0644\u0643\u060C \u0641\u0625\u0646\u0646\u0627 \u0644\u0639\u0627\u0642\u062F\u0648\u0646 \u0639\u0632\u0645\u0646\u0627 \u0639\u0644\u0649 \u0623\u0646 \u0646\u062A\u062C\u0627\u0648\u0632 \u0642\u0636\u064A\u0629 \u0627\u0644\u0641\u0635\u062D\u0649 \u0648\u0627\u0644\u0639\u0627\u0645\u064A\u0629\u060C \u0648\u062B\u0646\u0627\u0626\u064A\u0629 \u0627\u0644\u0646\u062E\u0628\u0629 \u0648\u0627\u0644\u0631\u0639\u0627\u0639\u060C \u0627\u0644\u062A\u064A \u0643\u062B\u064A\u0631\u0627\u064B \u0645\u0627 \u064A\u0646\u062D\u0648 \u0646\u062D\u0648\u0647\u0627 \u0627\u0644\u062D\u062F\u064A\u062B \u0639\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0630\u0643\u0648\u0631\u0629. \u0648\u0641\u0648\u0642 \u0647\u0630\u0627 \u0643\u0644\u0647\u060C \u0644\u0633\u0646\u0627 \u0628\u0635\u062F\u062F \u062A\u0641\u0633\u064A\u0631 \u0645\u0639\u0627\u0646\u064A "\u0627\u0644\u0628\u062A\u0627\u0639" \u0643\u0645\u0627 \u062A\u0623\u062A\u064A \u0641\u064A \u0642\u0635\u064A\u062F\u0629 \u0627\u0644\u062D\u0627\u062C \u0623\u062D\u0645\u062F \u0641\u0624\u0627\u062F \u0646\u062C\u0645\u060C \u0648\u0644\u0627 \u0627\u0644\u062A\u062D\u0630\u0644\u0642 \u0648\u0627\u0644\u062A\u0641\u0630\u0644\u0643 \u0641\u064A \u0627\u0644\u0623\u0644\u063A\u0627\u0632 \u0648\u0627\u0644\u0623\u0633\u0631\u0627\u0631 \u0627\u0644\u0645\u0643\u0646\u0648\u0646\u0629. \u0647\u0630\u0627 \u0627\u0644\u0628\u062A\u0627\u0639 - \u0623\u0645 \u0647\u0630\u0647 \u0627\u0644\u0628\u062A',
  textDirection: import_Message.TextDirection.RightToLeft
};
PlainRtlMessage.story = {
  name: "Plain RTL Message"
};
const EmojiMessages = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({ text: "\u{1F600}" })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({ text: "\u{1F600}\u{1F600}" })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({ text: "\u{1F600}\u{1F600}\u{1F600}" })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({ text: "\u{1F600}\u{1F600}\u{1F600}\u{1F600}" })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({ text: "\u{1F600}\u{1F600}\u{1F600}\u{1F600}\u{1F600}" })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({ text: "\u{1F600}\u{1F600}\u{1F600}\u{1F600}\u{1F600}\u{1F600}\u{1F600}" })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({
    previews: [
      {
        domain: "signal.org",
        image: (0, import_fakeAttachment.fakeAttachment)({
          contentType: import_MIME.IMAGE_PNG,
          fileName: "the-sax.png",
          height: 240,
          url: import_Fixtures.pngUrl,
          width: 320
        }),
        isStickerPack: false,
        title: "Signal",
        description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
        url: "https://www.signal.org",
        date: new Date(2020, 2, 10).valueOf()
      }
    ],
    text: "\u{1F600}"
  })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        fileName: "tina-rolf-269345-unsplash.jpg",
        contentType: import_MIME.IMAGE_JPEG,
        width: 128,
        height: 128
      })
    ],
    text: "\u{1F600}"
  })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.AUDIO_MP3,
        fileName: "incompetech-com-Agnus-Dei-X.mp3",
        url: "/fixtures/incompetech-com-Agnus-Dei-X.mp3"
      })
    ],
    text: "\u{1F600}"
  })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
        fileName: "my-resume.txt",
        url: "my-resume.txt"
      })
    ],
    text: "\u{1F600}"
  })
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_Message.Message, {
  ...createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.VIDEO_MP4,
        flags: import_protobuf.SignalService.AttachmentPointer.Flags.GIF,
        fileName: "cat-gif.mp4",
        url: "/fixtures/cat-gif.mp4",
        width: 400,
        height: 332
      })
    ],
    text: "\u{1F600}"
  })
})), "EmojiMessages");
const Delivered = Template.bind({});
Delivered.args = {
  status: "delivered",
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look."
};
const Read = Template.bind({});
Read.args = {
  status: "read",
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look."
};
const Sending = Template.bind({});
Sending.args = {
  status: "sending",
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look."
};
const Expiring = Template.bind({});
Expiring.args = {
  expirationLength: 30 * 1e3,
  expirationTimestamp: Date.now() + 30 * 1e3,
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look."
};
const WillExpireButStillSending = Template.bind({});
WillExpireButStillSending.args = {
  status: "sending",
  expirationLength: 30 * 1e3,
  text: "We always show the timer if a message has an expiration length, even if unread or still sending."
};
WillExpireButStillSending.story = {
  name: "Will expire but still sending"
};
const Pending = Template.bind({});
Pending.args = {
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look.",
  textAttachment: {
    contentType: import_MIME.LONG_MESSAGE,
    size: 123,
    pending: true
  }
};
const LongBodyCanBeDownloaded = Template.bind({});
LongBodyCanBeDownloaded.args = {
  text: "Hello there from a pal! I am sending a long message so that it will wrap a bit, since I like that look.",
  textAttachment: {
    contentType: import_MIME.LONG_MESSAGE,
    size: 123,
    pending: false,
    error: true,
    digest: "abc",
    key: "def"
  }
};
LongBodyCanBeDownloaded.story = {
  name: "Long body can be downloaded"
};
const Recent = Template.bind({});
Recent.args = {
  text: "Hello there from a pal!",
  timestamp: Date.now() - 30 * 60 * 1e3
};
const Older = Template.bind({});
Older.args = {
  text: "Hello there from a pal!",
  timestamp: Date.now() - 180 * 24 * 60 * 60 * 1e3
};
const ReactionsWiderMessage = Template.bind({});
ReactionsWiderMessage.args = {
  text: "Hello there from a pal!",
  timestamp: Date.now() - 180 * 24 * 60 * 60 * 1e3,
  reactions: [
    {
      emoji: "\u{1F44D}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        isMe: true,
        id: "+14155552672",
        phoneNumber: "+14155552672",
        name: "Me",
        title: "Me"
      }),
      timestamp: Date.now() - 10
    },
    {
      emoji: "\u{1F44D}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552672",
        phoneNumber: "+14155552672",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now() - 10
    },
    {
      emoji: "\u{1F44D}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552673",
        phoneNumber: "+14155552673",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now() - 10
    },
    {
      emoji: "\u{1F602}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552674",
        phoneNumber: "+14155552674",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now() - 10
    },
    {
      emoji: "\u{1F621}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552677",
        phoneNumber: "+14155552677",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now() - 10
    },
    {
      emoji: "\u{1F44E}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552678",
        phoneNumber: "+14155552678",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now() - 10
    },
    {
      emoji: "\u2764\uFE0F",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552679",
        phoneNumber: "+14155552679",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now() - 10
    }
  ]
};
ReactionsWiderMessage.story = {
  name: "Reactions (wider message)"
};
const joyReactions = Array.from({ length: 52 }, () => getJoyReaction());
const ReactionsShortMessage = Template.bind({});
ReactionsShortMessage.args = {
  text: "h",
  timestamp: Date.now(),
  reactions: [
    ...joyReactions,
    {
      emoji: "\u{1F44D}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        isMe: true,
        id: "+14155552672",
        phoneNumber: "+14155552672",
        name: "Me",
        title: "Me"
      }),
      timestamp: Date.now()
    },
    {
      emoji: "\u{1F44D}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552672",
        phoneNumber: "+14155552672",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now()
    },
    {
      emoji: "\u{1F44D}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552673",
        phoneNumber: "+14155552673",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now()
    },
    {
      emoji: "\u{1F621}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552677",
        phoneNumber: "+14155552677",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now()
    },
    {
      emoji: "\u{1F44E}",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552678",
        phoneNumber: "+14155552678",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now()
    },
    {
      emoji: "\u2764\uFE0F",
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        id: "+14155552679",
        phoneNumber: "+14155552679",
        name: "Amelia Briggs",
        title: "Amelia"
      }),
      timestamp: Date.now()
    }
  ]
};
ReactionsShortMessage.story = {
  name: "Reactions (short message)"
};
const AvatarInGroup = Template.bind({});
AvatarInGroup.args = {
  author: (0, import_getDefaultConversation.getDefaultConversation)({ avatarPath: import_Fixtures.pngUrl }),
  conversationType: "group",
  status: "sent",
  text: "Hello it is me, the saxophone."
};
AvatarInGroup.story = {
  name: "Avatar in Group"
};
const BadgeInGroup = Template.bind({});
BadgeInGroup.args = {
  conversationType: "group",
  getPreferredBadge: () => (0, import_getFakeBadge.getFakeBadge)(),
  status: "sent",
  text: "Hello it is me, the saxophone."
};
BadgeInGroup.story = {
  name: "Badge in Group"
};
const Sticker = Template.bind({});
Sticker.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/512x515-thumbs-up-lincoln.webp",
      fileName: "512x515-thumbs-up-lincoln.webp",
      contentType: import_MIME.IMAGE_WEBP,
      width: 128,
      height: 128
    })
  ],
  isSticker: true,
  status: "sent"
};
const Deleted = /* @__PURE__ */ __name(() => {
  const propsSent = createProps({
    conversationType: "direct",
    deletedForEveryone: true,
    status: "sent"
  });
  const propsSending = createProps({
    conversationType: "direct",
    deletedForEveryone: true,
    status: "sending"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderBothDirections(propsSent), renderBothDirections(propsSending));
}, "Deleted");
const DeletedWithExpireTimer = Template.bind({});
DeletedWithExpireTimer.args = {
  timestamp: Date.now() - 60 * 1e3,
  conversationType: "group",
  deletedForEveryone: true,
  expirationLength: 5 * 60 * 1e3,
  expirationTimestamp: Date.now() + 3 * 60 * 1e3,
  status: "sent"
};
DeletedWithExpireTimer.story = {
  name: "Deleted with expireTimer"
};
const DeletedWithError = /* @__PURE__ */ __name(() => {
  const propsPartialError = createProps({
    timestamp: Date.now() - 60 * 1e3,
    canDeleteForEveryone: true,
    conversationType: "group",
    deletedForEveryone: true,
    status: "partial-sent",
    direction: "outgoing"
  });
  const propsError = createProps({
    timestamp: Date.now() - 60 * 1e3,
    canDeleteForEveryone: true,
    conversationType: "group",
    deletedForEveryone: true,
    status: "error",
    direction: "outgoing"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderThree(propsPartialError), renderThree(propsError));
}, "DeletedWithError");
DeletedWithError.story = {
  name: "Deleted with error"
};
const CanDeleteForEveryone = Template.bind({});
CanDeleteForEveryone.args = {
  status: "read",
  text: "I hope you get this.",
  canDeleteForEveryone: true,
  direction: "outgoing"
};
CanDeleteForEveryone.story = {
  name: "Can delete for everyone"
};
const Error2 = Template.bind({});
Error2.args = {
  status: "error",
  canRetry: true,
  text: "I hope you get this."
};
const Paused = Template.bind({});
Paused.args = {
  status: "paused",
  text: "I am up to a challenge"
};
const PartialSend = Template.bind({});
PartialSend.args = {
  status: "partial-sent",
  text: "I hope you get this."
};
const LinkPreviewInGroup = Template.bind({});
LinkPreviewInGroup.args = {
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 240,
        url: import_Fixtures.pngUrl,
        width: 320
      }),
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org",
      date: new Date(2020, 2, 10).valueOf()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org",
  conversationType: "group"
};
LinkPreviewInGroup.story = {
  name: "Link Preview in Group"
};
const LinkPreviewWithQuote = Template.bind({});
LinkPreviewWithQuote.args = {
  quote: {
    conversationColor: import_Colors.ConversationColors[2],
    text: "The quoted message",
    isFromMe: false,
    sentAt: Date.now(),
    authorId: "some-id",
    authorTitle: "Someone",
    referencedMessageNotFound: false,
    isViewOnce: false,
    isGiftBadge: false
  },
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 240,
        url: import_Fixtures.pngUrl,
        width: 320
      }),
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org",
      date: new Date(2020, 2, 10).valueOf()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org",
  conversationType: "group"
};
LinkPreviewWithQuote.story = {
  name: "Link Preview with Quote"
};
const LinkPreviewWithSmallImage = Template.bind({});
LinkPreviewWithSmallImage.args = {
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 50,
        url: import_Fixtures.pngUrl,
        width: 50
      }),
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org",
      date: new Date(2020, 2, 10).valueOf()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithSmallImage.story = {
  name: "Link Preview with Small Image"
};
const LinkPreviewWithoutImage = Template.bind({});
LinkPreviewWithoutImage.args = {
  previews: [
    {
      domain: "signal.org",
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org",
      date: new Date(2020, 2, 10).valueOf()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithoutImage.story = {
  name: "Link Preview without Image"
};
const LinkPreviewWithNoDescription = Template.bind({});
LinkPreviewWithNoDescription.args = {
  previews: [
    {
      domain: "signal.org",
      isStickerPack: false,
      title: "Signal",
      url: "https://www.signal.org",
      date: Date.now()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithNoDescription.story = {
  name: "Link Preview with no description"
};
const LinkPreviewWithLongDescription = Template.bind({});
LinkPreviewWithLongDescription.args = {
  previews: [
    {
      domain: "signal.org",
      isStickerPack: false,
      title: "Signal",
      description: Array(10).fill('Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.').join(" "),
      url: "https://www.signal.org",
      date: Date.now()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithLongDescription.story = {
  name: "Link Preview with long description"
};
const LinkPreviewWithSmallImageLongDescription = Template.bind({});
LinkPreviewWithSmallImageLongDescription.args = {
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 50,
        url: import_Fixtures.pngUrl,
        width: 50
      }),
      isStickerPack: false,
      title: "Signal",
      description: Array(10).fill('Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.').join(" "),
      url: "https://www.signal.org",
      date: Date.now()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithSmallImageLongDescription.story = {
  name: "Link Preview with small image, long description"
};
const LinkPreviewWithNoDate = Template.bind({});
LinkPreviewWithNoDate.args = {
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 240,
        url: import_Fixtures.pngUrl,
        width: 320
      }),
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org"
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithNoDate.story = {
  name: "Link Preview with no date"
};
const LinkPreviewWithTooNewADate = Template.bind({});
LinkPreviewWithTooNewADate.args = {
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 240,
        url: import_Fixtures.pngUrl,
        width: 320
      }),
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org",
      date: Date.now() + 3e9
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org"
};
LinkPreviewWithTooNewADate.story = {
  name: "Link Preview with too new a date"
};
const Image = /* @__PURE__ */ __name(() => {
  const darkImageProps = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        fileName: "tina-rolf-269345-unsplash.jpg",
        contentType: import_MIME.IMAGE_JPEG,
        width: 128,
        height: 128
      })
    ],
    status: "sent"
  });
  const lightImageProps = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        url: import_Fixtures.pngUrl,
        fileName: "the-sax.png",
        contentType: import_MIME.IMAGE_PNG,
        height: 240,
        width: 320
      })
    ],
    status: "sent"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderBothDirections(darkImageProps), renderBothDirections(lightImageProps));
}, "Image");
const MultipleImages2 = Template.bind({});
MultipleImages2.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    })
  ],
  status: "sent"
};
const MultipleImages3 = Template.bind({});
MultipleImages3.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    })
  ],
  status: "sent"
};
const MultipleImages4 = Template.bind({});
MultipleImages4.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    })
  ],
  status: "sent"
};
const MultipleImages5 = Template.bind({});
MultipleImages5.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    }),
    (0, import_fakeAttachment.fakeAttachment)({
      url: import_Fixtures.pngUrl,
      fileName: "the-sax.png",
      contentType: import_MIME.IMAGE_PNG,
      height: 240,
      width: 320
    })
  ],
  status: "sent"
};
const ImageWithCaption = Template.bind({});
ImageWithCaption.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/tina-rolf-269345-unsplash.jpg",
      fileName: "tina-rolf-269345-unsplash.jpg",
      contentType: import_MIME.IMAGE_JPEG,
      width: 128,
      height: 128
    })
  ],
  status: "sent",
  text: "This is my home."
};
ImageWithCaption.story = {
  name: "Image with Caption"
};
const Gif = Template.bind({});
Gif.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.VIDEO_MP4,
      flags: import_protobuf.SignalService.AttachmentPointer.Flags.GIF,
      fileName: "cat-gif.mp4",
      url: "/fixtures/cat-gif.mp4",
      width: 400,
      height: 332
    })
  ],
  status: "sent"
};
Gif.story = {
  name: "GIF"
};
const GifInAGroup = Template.bind({});
GifInAGroup.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.VIDEO_MP4,
      flags: import_protobuf.SignalService.AttachmentPointer.Flags.GIF,
      fileName: "cat-gif.mp4",
      url: "/fixtures/cat-gif.mp4",
      width: 400,
      height: 332
    })
  ],
  conversationType: "group",
  status: "sent"
};
GifInAGroup.story = {
  name: "GIF in a group"
};
const NotDownloadedGif = Template.bind({});
NotDownloadedGif.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.VIDEO_MP4,
      flags: import_protobuf.SignalService.AttachmentPointer.Flags.GIF,
      fileName: "cat-gif.mp4",
      fileSize: "188.61 KB",
      blurHash: "LDA,FDBnm+I=p{tkIUI;~UkpELV]",
      width: 400,
      height: 332
    })
  ],
  status: "sent"
};
NotDownloadedGif.story = {
  name: "Not Downloaded GIF"
};
const PendingGif = Template.bind({});
PendingGif.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      pending: true,
      contentType: import_MIME.VIDEO_MP4,
      flags: import_protobuf.SignalService.AttachmentPointer.Flags.GIF,
      fileName: "cat-gif.mp4",
      fileSize: "188.61 KB",
      blurHash: "LDA,FDBnm+I=p{tkIUI;~UkpELV]",
      width: 400,
      height: 332
    })
  ],
  status: "sent"
};
PendingGif.story = {
  name: "Pending GIF"
};
const _Audio = /* @__PURE__ */ __name(() => {
  const Wrapper = /* @__PURE__ */ __name(() => {
    const [isPlayed, setIsPlayed] = React.useState(false);
    const messageProps = createProps({
      attachments: [
        (0, import_fakeAttachment.fakeAttachment)({
          contentType: import_MIME.AUDIO_MP3,
          fileName: "incompetech-com-Agnus-Dei-X.mp3",
          url: "/fixtures/incompetech-com-Agnus-Dei-X.mp3"
        })
      ],
      ...isPlayed ? {
        status: "viewed",
        readStatus: import_MessageReadStatus.ReadStatus.Viewed
      } : {
        status: "read",
        readStatus: import_MessageReadStatus.ReadStatus.Read
      }
    });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => {
        setIsPlayed((old) => !old);
      },
      style: {
        display: "block",
        marginBottom: "2em"
      }
    }, "Toggle played"), renderBothDirections(messageProps));
  }, "Wrapper");
  return /* @__PURE__ */ React.createElement(Wrapper, null);
}, "_Audio");
const LongAudio = Template.bind({});
LongAudio.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.AUDIO_MP3,
      fileName: "long-audio.mp3",
      url: "/fixtures/long-audio.mp3"
    })
  ],
  status: "sent"
};
const AudioWithCaption = Template.bind({});
AudioWithCaption.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.AUDIO_MP3,
      fileName: "incompetech-com-Agnus-Dei-X.mp3",
      url: "/fixtures/incompetech-com-Agnus-Dei-X.mp3"
    })
  ],
  status: "sent",
  text: "This is what I sound like."
};
AudioWithCaption.story = {
  name: "Audio with Caption"
};
const AudioWithNotDownloadedAttachment = Template.bind({});
AudioWithNotDownloadedAttachment.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.AUDIO_MP3,
      fileName: "incompetech-com-Agnus-Dei-X.mp3"
    })
  ],
  status: "sent"
};
AudioWithNotDownloadedAttachment.story = {
  name: "Audio with Not Downloaded Attachment"
};
const AudioWithPendingAttachment = Template.bind({});
AudioWithPendingAttachment.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.AUDIO_MP3,
      fileName: "incompetech-com-Agnus-Dei-X.mp3",
      pending: true
    })
  ],
  status: "sent"
};
AudioWithPendingAttachment.story = {
  name: "Audio with Pending Attachment"
};
const OtherFileType = Template.bind({});
OtherFileType.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
      fileName: "my-resume.txt",
      url: "my-resume.txt",
      fileSize: "10MB"
    })
  ],
  status: "sent"
};
const OtherFileTypeWithCaption = Template.bind({});
OtherFileTypeWithCaption.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
      fileName: "my-resume.txt",
      url: "my-resume.txt",
      fileSize: "10MB"
    })
  ],
  status: "sent",
  text: "This is what I have done."
};
OtherFileTypeWithCaption.story = {
  name: "Other File Type with Caption"
};
const OtherFileTypeWithLongFilename = Template.bind({});
OtherFileTypeWithLongFilename.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
      fileName: "INSERT-APP-NAME_INSERT-APP-APPLE-ID_AppStore_AppsGamesWatch.psd.zip",
      url: "a2/a2334324darewer4234",
      fileSize: "10MB"
    })
  ],
  status: "sent",
  text: "This is what I have done."
};
OtherFileTypeWithLongFilename.story = {
  name: "Other File Type with Long Filename"
};
const TapToViewImage = Template.bind({});
TapToViewImage.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/tina-rolf-269345-unsplash.jpg",
      fileName: "tina-rolf-269345-unsplash.jpg",
      contentType: import_MIME.IMAGE_JPEG,
      width: 128,
      height: 128
    })
  ],
  isTapToView: true,
  status: "sent"
};
TapToViewImage.story = {
  name: "TapToView Image"
};
const TapToViewVideo = Template.bind({});
TapToViewVideo.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.VIDEO_MP4,
      fileName: "pixabay-Soap-Bubble-7141.mp4",
      height: 128,
      url: "/fixtures/pixabay-Soap-Bubble-7141.mp4",
      width: 128
    })
  ],
  isTapToView: true,
  status: "sent"
};
TapToViewVideo.story = {
  name: "TapToView Video"
};
const TapToViewGif = Template.bind({});
TapToViewGif.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.VIDEO_MP4,
      flags: import_protobuf.SignalService.AttachmentPointer.Flags.GIF,
      fileName: "cat-gif.mp4",
      url: "/fixtures/cat-gif.mp4",
      width: 400,
      height: 332
    })
  ],
  isTapToView: true,
  status: "sent"
};
TapToViewGif.story = {
  name: "TapToView GIF"
};
const TapToViewExpired = Template.bind({});
TapToViewExpired.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/tina-rolf-269345-unsplash.jpg",
      fileName: "tina-rolf-269345-unsplash.jpg",
      contentType: import_MIME.IMAGE_JPEG,
      width: 128,
      height: 128
    })
  ],
  isTapToView: true,
  isTapToViewExpired: true,
  status: "sent"
};
TapToViewExpired.story = {
  name: "TapToView Expired"
};
const TapToViewError = Template.bind({});
TapToViewError.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/tina-rolf-269345-unsplash.jpg",
      fileName: "tina-rolf-269345-unsplash.jpg",
      contentType: import_MIME.IMAGE_JPEG,
      width: 128,
      height: 128
    })
  ],
  isTapToView: true,
  isTapToViewError: true,
  status: "sent"
};
TapToViewError.story = {
  name: "TapToView Error"
};
const DangerousFileType = Template.bind({});
DangerousFileType.args = {
  attachments: [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: (0, import_MIME.stringToMIMEType)("application/vnd.microsoft.portable-executable"),
      fileName: "terrible.exe",
      url: "terrible.exe"
    })
  ],
  status: "sent"
};
const Colors = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Colors.ConversationColors.map((color) => /* @__PURE__ */ React.createElement("div", {
    key: color
  }, renderBothDirections(createProps({
    conversationColor: color,
    text: `Here is a preview of the chat color: ${color}. The color is visible to only you.`
  })))));
}, "Colors");
const Mentions = Template.bind({});
Mentions.args = {
  bodyRanges: [
    {
      start: 0,
      length: 1,
      mentionUuid: "zap",
      replacementText: "Zapp Brannigan"
    }
  ],
  text: "\uFFFC This Is It. The Moment We Should Have Trained For."
};
Mentions.story = {
  name: "@Mentions"
};
const AllTheContextMenus = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        fileName: "tina-rolf-269345-unsplash.jpg",
        contentType: import_MIME.IMAGE_JPEG,
        width: 128,
        height: 128
      })
    ],
    status: "partial-sent",
    canDeleteForEveryone: true,
    canRetry: true,
    canRetryDeleteForEveryone: true
  });
  return /* @__PURE__ */ React.createElement(import_Message.Message, {
    ...props,
    direction: "outgoing"
  });
}, "AllTheContextMenus");
AllTheContextMenus.story = {
  name: "All the context menus"
};
const NotApprovedWithLinkPreview = Template.bind({});
NotApprovedWithLinkPreview.args = {
  previews: [
    {
      domain: "signal.org",
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "the-sax.png",
        height: 240,
        url: import_Fixtures.pngUrl,
        width: 320
      }),
      isStickerPack: false,
      title: "Signal",
      description: 'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
      url: "https://www.signal.org",
      date: new Date(2020, 2, 10).valueOf()
    }
  ],
  status: "sent",
  text: "Be sure to look at https://www.signal.org",
  isMessageRequestAccepted: false
};
NotApprovedWithLinkPreview.story = {
  name: "Not approved, with link preview"
};
const CustomColor = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(React.Fragment, null, renderThree({
  ...createProps({ text: "Solid." }),
  direction: "outgoing",
  customColor: {
    start: { hue: 82, saturation: 35 }
  }
}), /* @__PURE__ */ React.createElement("br", {
  style: { clear: "both" }
}), renderThree({
  ...createProps({ text: "Gradient." }),
  direction: "outgoing",
  customColor: {
    deg: 192,
    start: { hue: 304, saturation: 85 },
    end: { hue: 231, saturation: 76 }
  }
})), "CustomColor");
const CollapsingTextOnlyDMs = /* @__PURE__ */ __name(() => {
  const them = (0, import_getDefaultConversation.getDefaultConversation)();
  const me = (0, import_getDefaultConversation.getDefaultConversation)({ isMe: true });
  return renderMany([
    createProps({
      author: them,
      text: "One",
      timestamp: Date.now() - 5 * import_durations.MINUTE
    }),
    createProps({
      author: them,
      text: "Two",
      timestamp: Date.now() - 4 * import_durations.MINUTE
    }),
    createProps({
      author: them,
      text: "Three",
      timestamp: Date.now() - 3 * import_durations.MINUTE
    }),
    createProps({
      author: me,
      direction: "outgoing",
      text: "Four",
      timestamp: Date.now() - 2 * import_durations.MINUTE
    }),
    createProps({
      text: "Five",
      author: me,
      timestamp: Date.now() - import_durations.MINUTE,
      direction: "outgoing"
    }),
    createProps({
      author: me,
      direction: "outgoing",
      text: "Six"
    })
  ]);
}, "CollapsingTextOnlyDMs");
CollapsingTextOnlyDMs.story = {
  name: "Collapsing text-only DMs"
};
const CollapsingTextOnlyGroupMessages = /* @__PURE__ */ __name(() => {
  const author = (0, import_getDefaultConversation.getDefaultConversation)();
  return renderMany([
    createProps({
      author,
      conversationType: "group",
      text: "One",
      timestamp: Date.now() - 2 * import_durations.MINUTE
    }),
    createProps({
      author,
      conversationType: "group",
      text: "Two",
      timestamp: Date.now() - import_durations.MINUTE
    }),
    createProps({
      author,
      conversationType: "group",
      text: "Three"
    })
  ]);
}, "CollapsingTextOnlyGroupMessages");
CollapsingTextOnlyGroupMessages.story = {
  name: "Collapsing text-only group messages"
};
const StoryReply = /* @__PURE__ */ __name(() => {
  const conversation = (0, import_getDefaultConversation.getDefaultConversation)();
  return renderThree({
    ...createProps({ direction: "outgoing", text: "Wow!" }),
    storyReplyContext: {
      authorTitle: conversation.firstName || conversation.title,
      conversationColor: import_Colors.ConversationColors[0],
      isFromMe: false,
      rawAttachment: (0, import_fakeAttachment.fakeAttachment)({
        url: "/fixtures/snow.jpg",
        thumbnail: (0, import_fakeAttachment.fakeThumbnail)("/fixtures/snow.jpg")
      }),
      text: "Photo"
    }
  });
}, "StoryReply");
StoryReply.story = {
  name: "Story reply"
};
const StoryReplyYours = /* @__PURE__ */ __name(() => {
  const conversation = (0, import_getDefaultConversation.getDefaultConversation)();
  return renderThree({
    ...createProps({ direction: "incoming", text: "Wow!" }),
    storyReplyContext: {
      authorTitle: conversation.firstName || conversation.title,
      conversationColor: import_Colors.ConversationColors[0],
      isFromMe: true,
      rawAttachment: (0, import_fakeAttachment.fakeAttachment)({
        url: "/fixtures/snow.jpg",
        thumbnail: (0, import_fakeAttachment.fakeThumbnail)("/fixtures/snow.jpg")
      }),
      text: "Photo"
    }
  });
}, "StoryReplyYours");
StoryReplyYours.story = {
  name: "Story reply (yours)"
};
const StoryReplyEmoji = /* @__PURE__ */ __name(() => {
  const conversation = (0, import_getDefaultConversation.getDefaultConversation)();
  return renderThree({
    ...createProps({ direction: "outgoing", text: "Wow!" }),
    storyReplyContext: {
      authorTitle: conversation.firstName || conversation.title,
      conversationColor: import_Colors.ConversationColors[0],
      emoji: "\u{1F484}",
      isFromMe: false,
      rawAttachment: (0, import_fakeAttachment.fakeAttachment)({
        url: "/fixtures/snow.jpg",
        thumbnail: (0, import_fakeAttachment.fakeThumbnail)("/fixtures/snow.jpg")
      }),
      text: "Photo"
    }
  });
}, "StoryReplyEmoji");
StoryReplyEmoji.story = {
  name: "Story reply (emoji)"
};
const fullContact = {
  avatar: {
    avatar: (0, import_fakeAttachment.fakeAttachment)({
      path: "/fixtures/giphy-GVNvOUpeYmI7e.gif",
      contentType: import_MIME.IMAGE_GIF
    }),
    isProfile: true
  },
  email: [
    {
      value: "jerjor@fakemail.com",
      type: import_EmbeddedContact.ContactFormType.HOME
    }
  ],
  name: {
    givenName: "Jerry",
    familyName: "Jordan",
    prefix: "Dr.",
    suffix: "Jr.",
    middleName: "James",
    displayName: "Jerry Jordan"
  },
  number: [
    {
      value: "555-444-2323",
      type: import_EmbeddedContact.ContactFormType.HOME
    }
  ]
};
const EmbeddedContactFullContact = Template.bind({});
EmbeddedContactFullContact.args = {
  contact: fullContact
};
EmbeddedContactFullContact.story = {
  name: "EmbeddedContact: Full Contact"
};
const EmbeddedContactWithSendMessage = Template.bind({});
EmbeddedContactWithSendMessage.args = {
  contact: {
    ...fullContact,
    firstNumber: fullContact.number[0].value,
    uuid: import_UUID.UUID.generate().toString()
  },
  direction: "incoming"
};
EmbeddedContactWithSendMessage.story = {
  name: "EmbeddedContact: with Send Message"
};
const EmbeddedContactOnlyEmail = Template.bind({});
EmbeddedContactOnlyEmail.args = {
  contact: {
    email: fullContact.email
  }
};
EmbeddedContactOnlyEmail.story = {
  name: "EmbeddedContact: Only Email"
};
const EmbeddedContactGivenName = Template.bind({});
EmbeddedContactGivenName.args = {
  contact: {
    name: {
      givenName: "Jerry"
    }
  }
};
EmbeddedContactGivenName.story = {
  name: "EmbeddedContact: Given Name"
};
const EmbeddedContactOrganization = Template.bind({});
EmbeddedContactOrganization.args = {
  contact: {
    organization: "Company 5"
  }
};
EmbeddedContactOrganization.story = {
  name: "EmbeddedContact: Organization"
};
const EmbeddedContactGivenFamilyName = Template.bind({});
EmbeddedContactGivenFamilyName.args = {
  contact: {
    name: {
      givenName: "Jerry",
      familyName: "FamilyName"
    }
  }
};
EmbeddedContactGivenFamilyName.story = {
  name: "EmbeddedContact: Given + Family Name"
};
const EmbeddedContactFamilyName = Template.bind({});
EmbeddedContactFamilyName.args = {
  contact: {
    name: {
      familyName: "FamilyName"
    }
  }
};
EmbeddedContactFamilyName.story = {
  name: "EmbeddedContact: Family Name"
};
const EmbeddedContactLoadingAvatar = Template.bind({});
EmbeddedContactLoadingAvatar.args = {
  contact: {
    name: {
      displayName: "Jerry Jordan"
    },
    avatar: {
      avatar: (0, import_fakeAttachment.fakeAttachment)({
        pending: true,
        contentType: import_MIME.IMAGE_GIF
      }),
      isProfile: true
    }
  }
};
EmbeddedContactLoadingAvatar.story = {
  name: "EmbeddedContact: Loading Avatar"
};
const GiftBadgeUnopened = Template.bind({});
GiftBadgeUnopened.args = {
  giftBadge: {
    id: "GIFT",
    expiration: Date.now() + import_durations.DAY * 30,
    level: 3,
    state: import_Message.GiftBadgeStates.Unopened
  }
};
GiftBadgeUnopened.story = {
  name: "Gift Badge: Unopened"
};
const getPreferredBadge = /* @__PURE__ */ __name(() => ({
  category: import_BadgeCategory.BadgeCategory.Donor,
  descriptionTemplate: "This is a description of the badge",
  id: "GIFT",
  images: [
    {
      transparent: {
        localPath: "/fixtures/orange-heart.svg",
        url: "http://someplace"
      }
    }
  ],
  name: "heart"
}), "getPreferredBadge");
const GiftBadgeRedeemed30Days = Template.bind({});
GiftBadgeRedeemed30Days.args = {
  getPreferredBadge,
  giftBadge: {
    expiration: Date.now() + import_durations.DAY * 30 + import_durations.SECOND,
    id: "GIFT",
    level: 3,
    state: import_Message.GiftBadgeStates.Redeemed
  }
};
GiftBadgeRedeemed30Days.story = {
  name: "Gift Badge: Redeemed (30 days)"
};
const GiftBadgeRedeemed24Hours = Template.bind({});
GiftBadgeRedeemed24Hours.args = {
  getPreferredBadge,
  giftBadge: {
    expiration: Date.now() + import_durations.DAY + import_durations.SECOND,
    id: "GIFT",
    level: 3,
    state: import_Message.GiftBadgeStates.Redeemed
  }
};
GiftBadgeRedeemed24Hours.story = {
  name: "Gift Badge: Redeemed (24 hours)"
};
const GiftBadgeOpened60Minutes = Template.bind({});
GiftBadgeOpened60Minutes.args = {
  getPreferredBadge,
  giftBadge: {
    expiration: Date.now() + import_durations.HOUR + import_durations.SECOND,
    id: "GIFT",
    level: 3,
    state: import_Message.GiftBadgeStates.Opened
  }
};
GiftBadgeOpened60Minutes.story = {
  name: "Gift Badge: Opened (60 minutes)"
};
const GiftBadgeRedeemed1Minute = Template.bind({});
GiftBadgeRedeemed1Minute.args = {
  getPreferredBadge,
  giftBadge: {
    expiration: Date.now() + import_durations.MINUTE + import_durations.SECOND,
    id: "GIFT",
    level: 3,
    state: import_Message.GiftBadgeStates.Redeemed
  }
};
GiftBadgeRedeemed1Minute.story = {
  name: "Gift Badge: Redeemed (1 minute)"
};
const GiftBadgeOpenedExpired = Template.bind({});
GiftBadgeOpenedExpired.args = {
  getPreferredBadge,
  giftBadge: {
    expiration: Date.now(),
    id: "GIFT",
    level: 3,
    state: import_Message.GiftBadgeStates.Opened
  }
};
GiftBadgeOpenedExpired.story = {
  name: "Gift Badge: Opened (expired)"
};
const GiftBadgeMissingBadge = Template.bind({});
GiftBadgeMissingBadge.args = {
  getPreferredBadge: () => void 0,
  giftBadge: {
    expiration: Date.now() + import_durations.MINUTE + import_durations.SECOND,
    id: "MISSING",
    level: 3,
    state: import_Message.GiftBadgeStates.Redeemed
  }
};
GiftBadgeMissingBadge.story = {
  name: "Gift Badge: Missing Badge"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllTheContextMenus,
  AudioWithCaption,
  AudioWithNotDownloadedAttachment,
  AudioWithPendingAttachment,
  AvatarInGroup,
  BadgeInGroup,
  CanDeleteForEveryone,
  CollapsingTextOnlyDMs,
  CollapsingTextOnlyGroupMessages,
  Colors,
  CustomColor,
  DangerousFileType,
  Deleted,
  DeletedWithError,
  DeletedWithExpireTimer,
  Delivered,
  EmbeddedContactFamilyName,
  EmbeddedContactFullContact,
  EmbeddedContactGivenFamilyName,
  EmbeddedContactGivenName,
  EmbeddedContactLoadingAvatar,
  EmbeddedContactOnlyEmail,
  EmbeddedContactOrganization,
  EmbeddedContactWithSendMessage,
  EmojiMessages,
  Error,
  Expiring,
  Gif,
  GifInAGroup,
  GiftBadgeMissingBadge,
  GiftBadgeOpened60Minutes,
  GiftBadgeOpenedExpired,
  GiftBadgeRedeemed1Minute,
  GiftBadgeRedeemed24Hours,
  GiftBadgeRedeemed30Days,
  GiftBadgeUnopened,
  Image,
  ImageWithCaption,
  LinkPreviewInGroup,
  LinkPreviewWithLongDescription,
  LinkPreviewWithNoDate,
  LinkPreviewWithNoDescription,
  LinkPreviewWithQuote,
  LinkPreviewWithSmallImage,
  LinkPreviewWithSmallImageLongDescription,
  LinkPreviewWithTooNewADate,
  LinkPreviewWithoutImage,
  LongAudio,
  LongBodyCanBeDownloaded,
  Mentions,
  MultipleImages2,
  MultipleImages3,
  MultipleImages4,
  MultipleImages5,
  NotApprovedWithLinkPreview,
  NotDownloadedGif,
  Older,
  OtherFileType,
  OtherFileTypeWithCaption,
  OtherFileTypeWithLongFilename,
  PartialSend,
  Paused,
  Pending,
  PendingGif,
  PlainMessage,
  PlainRtlMessage,
  ReactionsShortMessage,
  ReactionsWiderMessage,
  Read,
  Recent,
  Sending,
  Sticker,
  StoryReply,
  StoryReplyEmoji,
  StoryReplyYours,
  TapToViewError,
  TapToViewExpired,
  TapToViewGif,
  TapToViewImage,
  TapToViewVideo,
  WillExpireButStillSending,
  _Audio
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCBudW1iZXIsIHNlbGVjdCwgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHR5cGUgeyBNZXRhLCBTdG9yeSB9IGZyb20gJ0BzdG9yeWJvb2svcmVhY3QnO1xuXG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdG9idWYnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uQ29sb3JzIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEVtb2ppUGlja2VyIH0gZnJvbSAnLi4vZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBQcm9wcywgQXVkaW9BdHRhY2htZW50UHJvcHMgfSBmcm9tICcuL01lc3NhZ2UnO1xuaW1wb3J0IHsgR2lmdEJhZGdlU3RhdGVzLCBNZXNzYWdlLCBUZXh0RGlyZWN0aW9uIH0gZnJvbSAnLi9NZXNzYWdlJztcbmltcG9ydCB7XG4gIEFVRElPX01QMyxcbiAgSU1BR0VfSlBFRyxcbiAgSU1BR0VfUE5HLFxuICBJTUFHRV9XRUJQLFxuICBWSURFT19NUDQsXG4gIExPTkdfTUVTU0FHRSxcbiAgc3RyaW5nVG9NSU1FVHlwZSxcbiAgSU1BR0VfR0lGLFxufSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgeyBNZXNzYWdlQXVkaW8gfSBmcm9tICcuL01lc3NhZ2VBdWRpbyc7XG5pbXBvcnQgeyBjb21wdXRlUGVha3MgfSBmcm9tICcuLi9HbG9iYWxBdWRpb0NvbnRleHQnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBwbmdVcmwgfSBmcm9tICcuLi8uLi9zdG9yeWJvb2svRml4dHVyZXMnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi4vX3V0aWwnO1xuaW1wb3J0IHsgREFZLCBIT1VSLCBNSU5VVEUsIFNFQ09ORCB9IGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IENvbnRhY3RGb3JtVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5cbmltcG9ydCB7XG4gIGZha2VBdHRhY2htZW50LFxuICBmYWtlVGh1bWJuYWlsLFxufSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5pbXBvcnQgeyBnZXRGYWtlQmFkZ2UgfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXRGYWtlQmFkZ2UnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBCYWRnZUNhdGVnb3J5IH0gZnJvbSAnLi4vLi4vYmFkZ2VzL0JhZGdlQ2F0ZWdvcnknO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBxdW90ZU9wdGlvbnMgPSB7XG4gIG5vbmU6IHVuZGVmaW5lZCxcbiAgYmFzaWM6IHtcbiAgICBjb252ZXJzYXRpb25Db2xvcjogQ29udmVyc2F0aW9uQ29sb3JzWzJdLFxuICAgIHRleHQ6ICdUaGUgcXVvdGVkIG1lc3NhZ2UnLFxuICAgIGlzRnJvbU1lOiBmYWxzZSxcbiAgICBzZW50QXQ6IERhdGUubm93KCksXG4gICAgYXV0aG9ySWQ6ICdzb21lLWlkJyxcbiAgICBhdXRob3JUaXRsZTogJ1NvbWVvbmUnLFxuICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgIGlzR2lmdEJhZGdlOiBmYWxzZSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9NZXNzYWdlJyxcbiAgYXJnVHlwZXM6IHtcbiAgICBjb252ZXJzYXRpb25UeXBlOiB7XG4gICAgICBjb250cm9sOiAnc2VsZWN0JyxcbiAgICAgIGRlZmF1bHRWYWx1ZTogJ2RpcmVjdCcsXG4gICAgICBvcHRpb25zOiBbJ2RpcmVjdCcsICdncm91cCddLFxuICAgIH0sXG4gICAgcXVvdGU6IHtcbiAgICAgIGNvbnRyb2w6ICdzZWxlY3QnLFxuICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBtYXBwaW5nOiBxdW90ZU9wdGlvbnMsXG4gICAgICBvcHRpb25zOiBPYmplY3Qua2V5cyhxdW90ZU9wdGlvbnMpLFxuICAgIH0sXG4gIH0sXG59IGFzIE1ldGE7XG5cbmNvbnN0IFRlbXBsYXRlOiBTdG9yeTxQYXJ0aWFsPFByb3BzPj4gPSBhcmdzID0+IHtcbiAgcmV0dXJuIHJlbmRlckJvdGhEaXJlY3Rpb25zKHtcbiAgICAuLi5jcmVhdGVQcm9wcygpLFxuICAgIGNvbnZlcnNhdGlvblR5cGU6ICdkaXJlY3QnLFxuICAgIHF1b3RlOiB1bmRlZmluZWQsXG4gICAgLi4uYXJncyxcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBnZXRKb3lSZWFjdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBlbW9qaTogJ1x1RDgzRFx1REUwMicsXG4gICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICBpZDogJysxNDE1NTU1MjY3NCcsXG4gICAgICBwaG9uZU51bWJlcjogJysxNDE1NTU1MjY3NCcsXG4gICAgICBuYW1lOiAnQW1lbGlhIEJyaWdncycsXG4gICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgfSksXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMTAsXG4gIH07XG59XG5cbmNvbnN0IHJlbmRlckVtb2ppUGlja2VyOiBQcm9wc1sncmVuZGVyRW1vamlQaWNrZXInXSA9ICh7XG4gIG9uQ2xvc2UsXG4gIG9uUGlja0Vtb2ppLFxuICByZWYsXG59KSA9PiAoXG4gIDxFbW9qaVBpY2tlclxuICAgIGkxOG49e3NldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKX1cbiAgICBza2luVG9uZT17MH1cbiAgICBvblNldFNraW5Ub25lPXthY3Rpb24oJ0Vtb2ppUGlja2VyOjpvblNldFNraW5Ub25lJyl9XG4gICAgcmVmPXtyZWZ9XG4gICAgb25DbG9zZT17b25DbG9zZX1cbiAgICBvblBpY2tFbW9qaT17b25QaWNrRW1vaml9XG4gIC8+XG4pO1xuXG5jb25zdCByZW5kZXJSZWFjdGlvblBpY2tlcjogUHJvcHNbJ3JlbmRlclJlYWN0aW9uUGlja2VyJ10gPSAoKSA9PiA8ZGl2IC8+O1xuXG5jb25zdCBNZXNzYWdlQXVkaW9Db250YWluZXI6IFJlYWN0LkZDPEF1ZGlvQXR0YWNobWVudFByb3BzPiA9IHByb3BzID0+IHtcbiAgY29uc3QgW2FjdGl2ZSwgc2V0QWN0aXZlXSA9IFJlYWN0LnVzZVN0YXRlPHtcbiAgICBpZD86IHN0cmluZztcbiAgICBjb250ZXh0Pzogc3RyaW5nO1xuICB9Pih7fSk7XG4gIGNvbnN0IGF1ZGlvID0gUmVhY3QudXNlTWVtbygoKSA9PiBuZXcgQXVkaW8oKSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPE1lc3NhZ2VBdWRpb1xuICAgICAgey4uLnByb3BzfVxuICAgICAgaWQ9XCJzdG9yeWJvb2tcIlxuICAgICAgcmVuZGVyaW5nQ29udGV4dD1cInN0b3J5Ym9va1wiXG4gICAgICBhdWRpbz17YXVkaW99XG4gICAgICBjb21wdXRlUGVha3M9e2NvbXB1dGVQZWFrc31cbiAgICAgIHNldEFjdGl2ZUF1ZGlvSUQ9eyhpZCwgY29udGV4dCkgPT4gc2V0QWN0aXZlKHsgaWQsIGNvbnRleHQgfSl9XG4gICAgICBvbkZpcnN0UGxheWVkPXthY3Rpb24oJ29uRmlyc3RQbGF5ZWQnKX1cbiAgICAgIGFjdGl2ZUF1ZGlvSUQ9e2FjdGl2ZS5pZH1cbiAgICAgIGFjdGl2ZUF1ZGlvQ29udGV4dD17YWN0aXZlLmNvbnRleHR9XG4gICAgLz5cbiAgKTtcbn07XG5cbmNvbnN0IHJlbmRlckF1ZGlvQXR0YWNobWVudDogUHJvcHNbJ3JlbmRlckF1ZGlvQXR0YWNobWVudCddID0gcHJvcHMgPT4gKFxuICA8TWVzc2FnZUF1ZGlvQ29udGFpbmVyIHsuLi5wcm9wc30gLz5cbik7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBhdHRhY2htZW50czogb3ZlcnJpZGVQcm9wcy5hdHRhY2htZW50cyxcbiAgYXV0aG9yOiBvdmVycmlkZVByb3BzLmF1dGhvciB8fCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gIHJlZHVjZWRNb3Rpb246IGJvb2xlYW4oJ3JlZHVjZWRNb3Rpb24nLCBmYWxzZSksXG4gIGJvZHlSYW5nZXM6IG92ZXJyaWRlUHJvcHMuYm9keVJhbmdlcyxcbiAgY2FuUmVhY3Q6IHRydWUsXG4gIGNhblJlcGx5OiB0cnVlLFxuICBjYW5Eb3dubG9hZDogdHJ1ZSxcbiAgY2FuRGVsZXRlRm9yRXZlcnlvbmU6IG92ZXJyaWRlUHJvcHMuY2FuRGVsZXRlRm9yRXZlcnlvbmUgfHwgZmFsc2UsXG4gIGNhblJldHJ5OiBvdmVycmlkZVByb3BzLmNhblJldHJ5IHx8IGZhbHNlLFxuICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBvdmVycmlkZVByb3BzLmNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmUgfHwgZmFsc2UsXG4gIGNoZWNrRm9yQWNjb3VudDogYWN0aW9uKCdjaGVja0ZvckFjY291bnQnKSxcbiAgY2xlYXJTZWxlY3RlZE1lc3NhZ2U6IGFjdGlvbignY2xlYXJTZWxlY3RlZE1lc3NhZ2UnKSxcbiAgY29udGFpbmVyRWxlbWVudFJlZjogUmVhY3QuY3JlYXRlUmVmPEhUTUxFbGVtZW50PigpLFxuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludC5XaWRlLFxuICBjb252ZXJzYXRpb25Db2xvcjpcbiAgICBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvbkNvbG9yIHx8XG4gICAgc2VsZWN0KCdjb252ZXJzYXRpb25Db2xvcicsIENvbnZlcnNhdGlvbkNvbG9ycywgQ29udmVyc2F0aW9uQ29sb3JzWzBdKSxcbiAgY29udmVyc2F0aW9uVGl0bGU6XG4gICAgb3ZlcnJpZGVQcm9wcy5jb252ZXJzYXRpb25UaXRsZSB8fFxuICAgIHRleHQoJ2NvbnZlcnNhdGlvblRpdGxlJywgJ0NvbnZlcnNhdGlvbiBUaXRsZScpLFxuICBjb252ZXJzYXRpb25JZDogdGV4dCgnY29udmVyc2F0aW9uSWQnLCBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvbklkIHx8ICcnKSxcbiAgY29udmVyc2F0aW9uVHlwZTogb3ZlcnJpZGVQcm9wcy5jb252ZXJzYXRpb25UeXBlIHx8ICdkaXJlY3QnLFxuICBjb250YWN0OiBvdmVycmlkZVByb3BzLmNvbnRhY3QsXG4gIGRlbGV0ZWRGb3JFdmVyeW9uZTogb3ZlcnJpZGVQcm9wcy5kZWxldGVkRm9yRXZlcnlvbmUsXG4gIGRlbGV0ZU1lc3NhZ2U6IGFjdGlvbignZGVsZXRlTWVzc2FnZScpLFxuICBkZWxldGVNZXNzYWdlRm9yRXZlcnlvbmU6IGFjdGlvbignZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lJyksXG4gIGRpc2FibGVNZW51OiBvdmVycmlkZVByb3BzLmRpc2FibGVNZW51LFxuICBkaXNhYmxlU2Nyb2xsOiBvdmVycmlkZVByb3BzLmRpc2FibGVTY3JvbGwsXG4gIGRpcmVjdGlvbjogb3ZlcnJpZGVQcm9wcy5kaXJlY3Rpb24gfHwgJ2luY29taW5nJyxcbiAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IGFjdGlvbignZGlzcGxheVRhcFRvVmlld01lc3NhZ2UnKSxcbiAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U6IGFjdGlvbignZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UnKSxcbiAgZG93bmxvYWRBdHRhY2htZW50OiBhY3Rpb24oJ2Rvd25sb2FkQXR0YWNobWVudCcpLFxuICBleHBpcmF0aW9uTGVuZ3RoOlxuICAgIG51bWJlcignZXhwaXJhdGlvbkxlbmd0aCcsIG92ZXJyaWRlUHJvcHMuZXhwaXJhdGlvbkxlbmd0aCB8fCAwKSB8fFxuICAgIHVuZGVmaW5lZCxcbiAgZXhwaXJhdGlvblRpbWVzdGFtcDpcbiAgICBudW1iZXIoJ2V4cGlyYXRpb25UaW1lc3RhbXAnLCBvdmVycmlkZVByb3BzLmV4cGlyYXRpb25UaW1lc3RhbXAgfHwgMCkgfHxcbiAgICB1bmRlZmluZWQsXG4gIGdldFByZWZlcnJlZEJhZGdlOiBvdmVycmlkZVByb3BzLmdldFByZWZlcnJlZEJhZGdlIHx8ICgoKSA9PiB1bmRlZmluZWQpLFxuICBnaWZ0QmFkZ2U6IG92ZXJyaWRlUHJvcHMuZ2lmdEJhZGdlLFxuICBpMThuLFxuICBpZDogdGV4dCgnaWQnLCBvdmVycmlkZVByb3BzLmlkIHx8ICdyYW5kb20tbWVzc2FnZS1pZCcpLFxuICByZW5kZXJpbmdDb250ZXh0OiAnc3Rvcnlib29rJyxcbiAgaW50ZXJhY3Rpb25Nb2RlOiBvdmVycmlkZVByb3BzLmludGVyYWN0aW9uTW9kZSB8fCAna2V5Ym9hcmQnLFxuICBpc1N0aWNrZXI6IGlzQm9vbGVhbihvdmVycmlkZVByb3BzLmlzU3RpY2tlcilcbiAgICA/IG92ZXJyaWRlUHJvcHMuaXNTdGlja2VyXG4gICAgOiBmYWxzZSxcbiAgaXNCbG9ja2VkOiBpc0Jvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc0Jsb2NrZWQpXG4gICAgPyBvdmVycmlkZVByb3BzLmlzQmxvY2tlZFxuICAgIDogZmFsc2UsXG4gIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZDogaXNCb29sZWFuKG92ZXJyaWRlUHJvcHMuaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkKVxuICAgID8gb3ZlcnJpZGVQcm9wcy5pc01lc3NhZ2VSZXF1ZXN0QWNjZXB0ZWRcbiAgICA6IHRydWUsXG4gIGlzVGFwVG9WaWV3OiBvdmVycmlkZVByb3BzLmlzVGFwVG9WaWV3LFxuICBpc1RhcFRvVmlld0Vycm9yOiBvdmVycmlkZVByb3BzLmlzVGFwVG9WaWV3RXJyb3IsXG4gIGlzVGFwVG9WaWV3RXhwaXJlZDogb3ZlcnJpZGVQcm9wcy5pc1RhcFRvVmlld0V4cGlyZWQsXG4gIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQ6IGFjdGlvbigna2lja09mZkF0dGFjaG1lbnREb3dubG9hZCcpLFxuICBtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkOiBhY3Rpb24oJ21hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQnKSxcbiAgbWFya1ZpZXdlZDogYWN0aW9uKCdtYXJrVmlld2VkJyksXG4gIG1lc3NhZ2VFeHBhbmRlZDogYWN0aW9uKCdtZXNzYWdlRXhwYW5kZWQnKSxcbiAgb3BlbkNvbnZlcnNhdGlvbjogYWN0aW9uKCdvcGVuQ29udmVyc2F0aW9uJyksXG4gIG9wZW5HaWZ0QmFkZ2U6IGFjdGlvbignb3BlbkdpZnRCYWRnZScpLFxuICBvcGVuTGluazogYWN0aW9uKCdvcGVuTGluaycpLFxuICBwcmV2aWV3czogb3ZlcnJpZGVQcm9wcy5wcmV2aWV3cyB8fCBbXSxcbiAgcXVvdGU6IG92ZXJyaWRlUHJvcHMucXVvdGUgfHwgdW5kZWZpbmVkLFxuICByZWFjdGlvbnM6IG92ZXJyaWRlUHJvcHMucmVhY3Rpb25zLFxuICByZWFjdFRvTWVzc2FnZTogYWN0aW9uKCdyZWFjdFRvTWVzc2FnZScpLFxuICByZWFkU3RhdHVzOlxuICAgIG92ZXJyaWRlUHJvcHMucmVhZFN0YXR1cyA9PT0gdW5kZWZpbmVkXG4gICAgICA/IFJlYWRTdGF0dXMuUmVhZFxuICAgICAgOiBvdmVycmlkZVByb3BzLnJlYWRTdGF0dXMsXG4gIHJlbmRlckVtb2ppUGlja2VyLFxuICByZW5kZXJSZWFjdGlvblBpY2tlcixcbiAgcmVuZGVyQXVkaW9BdHRhY2htZW50LFxuICByZXBseVRvTWVzc2FnZTogYWN0aW9uKCdyZXBseVRvTWVzc2FnZScpLFxuICByZXRyeVNlbmQ6IGFjdGlvbigncmV0cnlTZW5kJyksXG4gIHJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IGFjdGlvbigncmV0cnlEZWxldGVGb3JFdmVyeW9uZScpLFxuICBzY3JvbGxUb1F1b3RlZE1lc3NhZ2U6IGFjdGlvbignc2Nyb2xsVG9RdW90ZWRNZXNzYWdlJyksXG4gIHNlbGVjdE1lc3NhZ2U6IGFjdGlvbignc2VsZWN0TWVzc2FnZScpLFxuICBzaG91bGRDb2xsYXBzZUFib3ZlOiBpc0Jvb2xlYW4ob3ZlcnJpZGVQcm9wcy5zaG91bGRDb2xsYXBzZUFib3ZlKVxuICAgID8gb3ZlcnJpZGVQcm9wcy5zaG91bGRDb2xsYXBzZUFib3ZlXG4gICAgOiBmYWxzZSxcbiAgc2hvdWxkQ29sbGFwc2VCZWxvdzogaXNCb29sZWFuKG92ZXJyaWRlUHJvcHMuc2hvdWxkQ29sbGFwc2VCZWxvdylcbiAgICA/IG92ZXJyaWRlUHJvcHMuc2hvdWxkQ29sbGFwc2VCZWxvd1xuICAgIDogZmFsc2UsXG4gIHNob3VsZEhpZGVNZXRhZGF0YTogaXNCb29sZWFuKG92ZXJyaWRlUHJvcHMuc2hvdWxkSGlkZU1ldGFkYXRhKVxuICAgID8gb3ZlcnJpZGVQcm9wcy5zaG91bGRIaWRlTWV0YWRhdGFcbiAgICA6IGZhbHNlLFxuICBzaG93Q29udGFjdERldGFpbDogYWN0aW9uKCdzaG93Q29udGFjdERldGFpbCcpLFxuICBzaG93Q29udGFjdE1vZGFsOiBhY3Rpb24oJ3Nob3dDb250YWN0TW9kYWwnKSxcbiAgc2hvd0V4cGlyZWRJbmNvbWluZ1RhcFRvVmlld1RvYXN0OiBhY3Rpb24oXG4gICAgJ3Nob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgKSxcbiAgc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0OiBhY3Rpb24oXG4gICAgJ3Nob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgKSxcbiAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWw6IGFjdGlvbignc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwnKSxcbiAgc2hvd01lc3NhZ2VEZXRhaWw6IGFjdGlvbignc2hvd01lc3NhZ2VEZXRhaWwnKSxcbiAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQ6IGFjdGlvbignc2hvd1Zpc3VhbEF0dGFjaG1lbnQnKSxcbiAgc3RhcnRDb252ZXJzYXRpb246IGFjdGlvbignc3RhcnRDb252ZXJzYXRpb24nKSxcbiAgc3RhdHVzOiBvdmVycmlkZVByb3BzLnN0YXR1cyB8fCAnc2VudCcsXG4gIHRleHQ6IG92ZXJyaWRlUHJvcHMudGV4dCB8fCB0ZXh0KCd0ZXh0JywgJycpLFxuICB0ZXh0RGlyZWN0aW9uOiBvdmVycmlkZVByb3BzLnRleHREaXJlY3Rpb24gfHwgVGV4dERpcmVjdGlvbi5EZWZhdWx0LFxuICB0ZXh0QXR0YWNobWVudDogb3ZlcnJpZGVQcm9wcy50ZXh0QXR0YWNobWVudCB8fCB7XG4gICAgY29udGVudFR5cGU6IExPTkdfTUVTU0FHRSxcbiAgICBzaXplOiAxMjMsXG4gICAgcGVuZGluZzogYm9vbGVhbigndGV4dFBlbmRpbmcnLCBmYWxzZSksXG4gIH0sXG4gIHRoZW1lOiBUaGVtZVR5cGUubGlnaHQsXG4gIHRpbWVzdGFtcDogbnVtYmVyKCd0aW1lc3RhbXAnLCBvdmVycmlkZVByb3BzLnRpbWVzdGFtcCB8fCBEYXRlLm5vdygpKSxcbn0pO1xuXG5jb25zdCBjcmVhdGVUaW1lbGluZUl0ZW0gPSAoZGF0YTogdW5kZWZpbmVkIHwgUHJvcHMpID0+XG4gIGRhdGEgJiYge1xuICAgIHR5cGU6ICdtZXNzYWdlJyBhcyBjb25zdCxcbiAgICBkYXRhLFxuICAgIHRpbWVzdGFtcDogZGF0YS50aW1lc3RhbXAsXG4gIH07XG5cbmNvbnN0IHJlbmRlck1hbnkgPSAocHJvcHNBcnJheTogUmVhZG9ubHlBcnJheTxQcm9wcz4pID0+IChcbiAgPD5cbiAgICB7cHJvcHNBcnJheS5tYXAoKG1lc3NhZ2UsIGluZGV4KSA9PiAoXG4gICAgICA8TWVzc2FnZVxuICAgICAgICBrZXk9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgey4uLm1lc3NhZ2V9XG4gICAgICAgIHNob3VsZENvbGxhcHNlQWJvdmU9e0Jvb2xlYW4ocHJvcHNBcnJheVtpbmRleCAtIDFdKX1cbiAgICAgICAgaXRlbT17Y3JlYXRlVGltZWxpbmVJdGVtKG1lc3NhZ2UpfVxuICAgICAgICBzaG91bGRDb2xsYXBzZUJlbG93PXtCb29sZWFuKHByb3BzQXJyYXlbaW5kZXggKyAxXSl9XG4gICAgICAvPlxuICAgICkpfVxuICA8Lz5cbik7XG5cbmNvbnN0IHJlbmRlclRocmVlID0gKHByb3BzOiBQcm9wcykgPT4gcmVuZGVyTWFueShbcHJvcHMsIHByb3BzLCBwcm9wc10pO1xuXG5jb25zdCByZW5kZXJCb3RoRGlyZWN0aW9ucyA9IChwcm9wczogUHJvcHMpID0+IChcbiAgPD5cbiAgICB7cmVuZGVyVGhyZWUocHJvcHMpfVxuICAgIHtyZW5kZXJUaHJlZSh7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGF1dGhvcjogeyAuLi5wcm9wcy5hdXRob3IsIGlkOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCkuaWQgfSxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICB9KX1cbiAgPC8+XG4pO1xuXG5leHBvcnQgY29uc3QgUGxhaW5NZXNzYWdlID0gVGVtcGxhdGUuYmluZCh7fSk7XG5QbGFpbk1lc3NhZ2UuYXJncyA9IHtcbiAgdGV4dDogJ0hlbGxvIHRoZXJlIGZyb20gYSBwYWwhIEkgYW0gc2VuZGluZyBhIGxvbmcgbWVzc2FnZSBzbyB0aGF0IGl0IHdpbGwgd3JhcCBhIGJpdCwgc2luY2UgSSBsaWtlIHRoYXQgbG9vay4nLFxufTtcblxuZXhwb3J0IGNvbnN0IFBsYWluUnRsTWVzc2FnZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuUGxhaW5SdGxNZXNzYWdlLmFyZ3MgPSB7XG4gIHRleHQ6ICdcdTA2MjdcdTA2NDRcdTA2MjNcdTA2MzNcdTA2MjdcdTA2NDZcdTA2MzNcdTA2NEFcdTA2MzFcdTA2MEMgXHUwNjM5XHUwNjQ0XHUwNjM0XHUwNjI3XHUwNjQ2IFx1MDYyN1x1MDY0NFx1MDY0Mlx1MDYzN1x1MDYzNyBcdTA2NDVcdTA2MjdcdTA2MkFcdTA2MjdcdTA2NDNcdTA2NDRcdTA2MzQgXHUwNjQ1XHUwNjQ2XHUwNjQ3XHUwNjI3LiBcdTA2NDhcdTA2NDZcdTA2NDZcdTA2MzNcdTA2MjdcdTA2NDdcdTA2MjdcdTA2MEMgXHUwNjQ4XHUwNjQ2XHUwNjM5XHUwNjQ4XHUwNjJGIFx1MDYyN1x1MDY0NFx1MDY0OSBcdTA2MjNcdTA2NDhcdTA2MzFcdTA2MjdcdTA2NDJcdTA2NDZcdTA2MjcgXHUwNjQ1XHUwNjQ4XHUwNjM1XHUwNjJGXHUwNjRBXHUwNjQ2IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYyN1x1MDYyOCBcdTA2MjhcdTA2MjVcdTA2MkRcdTA2NDNcdTA2MjdcdTA2NDUuIFx1MDY0Nlx1MDYyQVx1MDY0Nlx1MDYyRFx1MDY0Nlx1MDYyRFx1MDYwQyBcdTA2NDhcdTA2NDZcdTA2NDJcdTA2NDhcdTA2NDQ6IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYyQVx1MDYyN1x1MDYzOS4gXHUwNjQzXHUwNjQ0XHUwNjQ1XHUwNjI5IFx1MDYyQVx1MDYyRlx1MDY0NFx1MDY1MSBcdTA2MzlcdTA2NDRcdTA2NDkgXHUwNjQ0XHUwNjI3IFx1MDYzNFx1MDY0QVx1MDYyMVx1MDYwQyBcdTA2NDhcdTA2MzlcdTA2NDRcdTA2NDkgXHUwNjQzXHUwNjQ0XHUwNjUxIFx1MDYzNFx1MDY0QVx1MDYyMS4gXHUwNjQ4XHUwNjQ3XHUwNjRBIFx1MDY0NVx1MDYzMVx1MDY0M1x1MDYzMiBcdTA2MjNcdTA2MjhcdTA2MkRcdTA2MjdcdTA2MkIgXHUwNjM0XHUwNjM5XHUwNjI4XHUwNjRBXHUwNjI5IFx1MDY0M1x1MDYyQlx1MDY0QVx1MDYzMVx1MDYyOVx1MDYwQyBcdTA2MkFcdTA2MkFcdTA2MzlcdTA2MkNcdTA2NTFcdTA2MjggXHUwNjQ1XHUwNjQ2IFx1MDYzQVx1MDYzMVx1MDYyN1x1MDYyOFx1MDYyQVx1MDY0N1x1MDYyNyBcdTA2NDhcdTA2MjdcdTA2NDRcdTA2NDJcdTA2NDhcdTA2NDVcdTA2NEFcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjM1XHUwNjMxXHUwNjRBXHUwNjI5IFx1MDYyN1x1MDY0NFx1MDYyRVx1MDYyN1x1MDYzNVx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MkFcdTA2NEEgXHUwNjJBXHUwNjM5XHUwNjQzXHUwNjMzXHUwNjQ3XHUwNjI3XHUwNjBDIFx1MDYyN1x1MDY0NFx1MDY0OSBcdTA2MkNcdTA2MjdcdTA2NDZcdTA2MjggXHUwNjI3XHUwNjQ0XHUwNjM0XHUwNjRBXHUwNjIxIFx1MDYyN1x1MDY0NFx1MDY0M1x1MDYyQlx1MDY0QVx1MDYzMSBcdTA2NDVcdTA2NDYgXHUwNjI3XHUwNjQ0XHUwNjM5XHUwNjQxXHUwNjQ4XHUwNjRBXHUwNjI5IFx1MDY0OFx1MDYyRFx1MDY0NFx1MDYyN1x1MDY0OFx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2MzFcdTA2NDhcdTA2MkQuIFx1MDY0Nlx1MDYzOVx1MDY0NVx1MDYwQyBcdTA2NDZcdTA2MkRcdTA2NDYgXHUwNjQyXHUwNjMxXHUwNjIzXHUwNjQ2XHUwNjI3IFx1MDY0OFx1MDYzM1x1MDY0NVx1MDYzOVx1MDY0Nlx1MDYyNyBcdTA2NDhcdTA2MzlcdTA2MzFcdTA2NDFcdTA2NDZcdTA2MjcgXHUwNjQzXHUwNjQ0IFx1MDY0N1x1MDYzMFx1MDYyNy4gXHUwNjQ0XHUwNjQzXHUwNjQ2XHUwNjQ3IFx1MDY0NVx1MDYyRFx1MDY0NFx1MDY1MSBcdTA2MjdcdTA2NDdcdTA2MkFcdTA2NDVcdTA2MjdcdTA2NDVcdTA2NDZcdTA2MjcgXHUwNjI3XHUwNjQ0XHUwNjRBXHUwNjQ4XHUwNjQ1IFx1MDY0NFx1MDYyM1x1MDYzM1x1MDYyOFx1MDYyN1x1MDYyOCBcdTA2M0FcdTA2NEFcdTA2MzEgXHUwNjJBXHUwNjQ0XHUwNjQzIFx1MDYyN1x1MDY0NFx1MDYyM1x1MDYzM1x1MDYyOFx1MDYyN1x1MDYyOC4gXHUwNjQzXHUwNjMwXHUwNjQ0XHUwNjQzXHUwNjBDIFx1MDY0MVx1MDYyNVx1MDY0Nlx1MDY0Nlx1MDYyNyBcdTA2NDRcdTA2MzlcdTA2MjdcdTA2NDJcdTA2MkZcdTA2NDhcdTA2NDYgXHUwNjM5XHUwNjMyXHUwNjQ1XHUwNjQ2XHUwNjI3IFx1MDYzOVx1MDY0NFx1MDY0OSBcdTA2MjNcdTA2NDYgXHUwNjQ2XHUwNjJBXHUwNjJDXHUwNjI3XHUwNjQ4XHUwNjMyIFx1MDY0Mlx1MDYzNlx1MDY0QVx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2NDFcdTA2MzVcdTA2MkRcdTA2NDkgXHUwNjQ4XHUwNjI3XHUwNjQ0XHUwNjM5XHUwNjI3XHUwNjQ1XHUwNjRBXHUwNjI5XHUwNjBDIFx1MDY0OFx1MDYyQlx1MDY0Nlx1MDYyN1x1MDYyNlx1MDY0QVx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2NDZcdTA2MkVcdTA2MjhcdTA2MjkgXHUwNjQ4XHUwNjI3XHUwNjQ0XHUwNjMxXHUwNjM5XHUwNjI3XHUwNjM5XHUwNjBDIFx1MDYyN1x1MDY0NFx1MDYyQVx1MDY0QSBcdTA2NDNcdTA2MkJcdTA2NEFcdTA2MzFcdTA2MjdcdTA2NEIgXHUwNjQ1XHUwNjI3IFx1MDY0QVx1MDY0Nlx1MDYyRFx1MDY0OCBcdTA2NDZcdTA2MkRcdTA2NDhcdTA2NDdcdTA2MjcgXHUwNjI3XHUwNjQ0XHUwNjJEXHUwNjJGXHUwNjRBXHUwNjJCIFx1MDYzOVx1MDY0NiBcdTA2MjdcdTA2NDRcdTA2NDNcdTA2NDRcdTA2NDVcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjMwXHUwNjQzXHUwNjQ4XHUwNjMxXHUwNjI5LiBcdTA2NDhcdTA2NDFcdTA2NDhcdTA2NDIgXHUwNjQ3XHUwNjMwXHUwNjI3IFx1MDY0M1x1MDY0NFx1MDY0N1x1MDYwQyBcdTA2NDRcdTA2MzNcdTA2NDZcdTA2MjcgXHUwNjI4XHUwNjM1XHUwNjJGXHUwNjJGIFx1MDYyQVx1MDY0MVx1MDYzM1x1MDY0QVx1MDYzMSBcdTA2NDVcdTA2MzlcdTA2MjdcdTA2NDZcdTA2NEEgXCJcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MkFcdTA2MjdcdTA2MzlcIiBcdTA2NDNcdTA2NDVcdTA2MjcgXHUwNjJBXHUwNjIzXHUwNjJBXHUwNjRBIFx1MDY0MVx1MDY0QSBcdTA2NDJcdTA2MzVcdTA2NEFcdTA2MkZcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjJEXHUwNjI3XHUwNjJDIFx1MDYyM1x1MDYyRFx1MDY0NVx1MDYyRiBcdTA2NDFcdTA2MjRcdTA2MjdcdTA2MkYgXHUwNjQ2XHUwNjJDXHUwNjQ1XHUwNjBDIFx1MDY0OFx1MDY0NFx1MDYyNyBcdTA2MjdcdTA2NDRcdTA2MkFcdTA2MkRcdTA2MzBcdTA2NDRcdTA2NDIgXHUwNjQ4XHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjQxXHUwNjMwXHUwNjQ0XHUwNjQzIFx1MDY0MVx1MDY0QSBcdTA2MjdcdTA2NDRcdTA2MjNcdTA2NDRcdTA2M0FcdTA2MjdcdTA2MzIgXHUwNjQ4XHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjMzXHUwNjMxXHUwNjI3XHUwNjMxIFx1MDYyN1x1MDY0NFx1MDY0NVx1MDY0M1x1MDY0Nlx1MDY0OFx1MDY0Nlx1MDYyOS4gXHUwNjQ3XHUwNjMwXHUwNjI3IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYyQVx1MDYyN1x1MDYzOSAtIFx1MDYyM1x1MDY0NSBcdTA2NDdcdTA2MzBcdTA2NDcgXHUwNjI3XHUwNjQ0XHUwNjI4XHUwNjJBJyxcbiAgdGV4dERpcmVjdGlvbjogVGV4dERpcmVjdGlvbi5SaWdodFRvTGVmdCxcbn07XG5QbGFpblJ0bE1lc3NhZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdQbGFpbiBSVEwgTWVzc2FnZScsXG59O1xuXG5leHBvcnQgY29uc3QgRW1vamlNZXNzYWdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDw+XG4gICAgPE1lc3NhZ2Ugey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1x1RDgzRFx1REUwMCcgfSl9IC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2Ugey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1x1RDgzRFx1REUwMFx1RDgzRFx1REUwMCcgfSl9IC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2Ugey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1x1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMCcgfSl9IC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2Ugey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1x1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMCcgfSl9IC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2Ugey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1x1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMCcgfSl9IC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2Ugey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1x1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMFx1RDgzRFx1REUwMCcgfSl9IC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2VcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIHByZXZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZG9tYWluOiAnc2lnbmFsLm9yZycsXG4gICAgICAgICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICAgICAgICBmaWxlTmFtZTogJ3RoZS1zYXgucG5nJyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICAgICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICAgICAgICB3aWR0aDogMzIwLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBpc1N0aWNrZXJQYWNrOiBmYWxzZSxcbiAgICAgICAgICAgIHRpdGxlOiAnU2lnbmFsJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICAgICAnU2F5IFwiaGVsbG9cIiB0byBhIGRpZmZlcmVudCBtZXNzYWdpbmcgZXhwZXJpZW5jZS4gQW4gdW5leHBlY3RlZCBmb2N1cyBvbiBwcml2YWN5LCBjb21iaW5lZCB3aXRoIGFsbCBvZiB0aGUgZmVhdHVyZXMgeW91IGV4cGVjdC4nLFxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgyMDIwLCAyLCAxMCkudmFsdWVPZigpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHRleHQ6ICdcdUQ4M0RcdURFMDAnLFxuICAgICAgfSl9XG4gICAgLz5cbiAgICA8YnIgLz5cbiAgICA8TWVzc2FnZVxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgICAgIHdpZHRoOiAxMjgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEyOCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgdGV4dDogJ1x1RDgzRFx1REUwMCcsXG4gICAgICB9KX1cbiAgICAvPlxuICAgIDxiciAvPlxuICAgIDxNZXNzYWdlXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBBVURJT19NUDMsXG4gICAgICAgICAgICBmaWxlTmFtZTogJ2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICB0ZXh0OiAnXHVEODNEXHVERTAwJyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICAgPGJyIC8+XG4gICAgPE1lc3NhZ2VcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ3RleHQvcGxhaW4nKSxcbiAgICAgICAgICAgIGZpbGVOYW1lOiAnbXktcmVzdW1lLnR4dCcsXG4gICAgICAgICAgICB1cmw6ICdteS1yZXN1bWUudHh0JyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgdGV4dDogJ1x1RDgzRFx1REUwMCcsXG4gICAgICB9KX1cbiAgICAvPlxuICAgIDxiciAvPlxuICAgIDxNZXNzYWdlXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICAgICAgICBmbGFnczogU2lnbmFsU2VydmljZS5BdHRhY2htZW50UG9pbnRlci5GbGFncy5HSUYsXG4gICAgICAgICAgICBmaWxlTmFtZTogJ2NhdC1naWYubXA0JyxcbiAgICAgICAgICAgIHVybDogJy9maXh0dXJlcy9jYXQtZ2lmLm1wNCcsXG4gICAgICAgICAgICB3aWR0aDogNDAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzMzIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIHRleHQ6ICdcdUQ4M0RcdURFMDAnLFxuICAgICAgfSl9XG4gICAgLz5cbiAgPC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRGVsaXZlcmVkID0gVGVtcGxhdGUuYmluZCh7fSk7XG5EZWxpdmVyZWQuYXJncyA9IHtcbiAgc3RhdHVzOiAnZGVsaXZlcmVkJyxcbiAgdGV4dDogJ0hlbGxvIHRoZXJlIGZyb20gYSBwYWwhIEkgYW0gc2VuZGluZyBhIGxvbmcgbWVzc2FnZSBzbyB0aGF0IGl0IHdpbGwgd3JhcCBhIGJpdCwgc2luY2UgSSBsaWtlIHRoYXQgbG9vay4nLFxufTtcblxuZXhwb3J0IGNvbnN0IFJlYWQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblJlYWQuYXJncyA9IHtcbiAgc3RhdHVzOiAncmVhZCcsXG4gIHRleHQ6ICdIZWxsbyB0aGVyZSBmcm9tIGEgcGFsISBJIGFtIHNlbmRpbmcgYSBsb25nIG1lc3NhZ2Ugc28gdGhhdCBpdCB3aWxsIHdyYXAgYSBiaXQsIHNpbmNlIEkgbGlrZSB0aGF0IGxvb2suJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTZW5kaW5nID0gVGVtcGxhdGUuYmluZCh7fSk7XG5TZW5kaW5nLmFyZ3MgPSB7XG4gIHN0YXR1czogJ3NlbmRpbmcnLFxuICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSBhIHBhbCEgSSBhbSBzZW5kaW5nIGEgbG9uZyBtZXNzYWdlIHNvIHRoYXQgaXQgd2lsbCB3cmFwIGEgYml0LCBzaW5jZSBJIGxpa2UgdGhhdCBsb29rLicsXG59O1xuXG5leHBvcnQgY29uc3QgRXhwaXJpbmcgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkV4cGlyaW5nLmFyZ3MgPSB7XG4gIGV4cGlyYXRpb25MZW5ndGg6IDMwICogMTAwMCxcbiAgZXhwaXJhdGlvblRpbWVzdGFtcDogRGF0ZS5ub3coKSArIDMwICogMTAwMCxcbiAgdGV4dDogJ0hlbGxvIHRoZXJlIGZyb20gYSBwYWwhIEkgYW0gc2VuZGluZyBhIGxvbmcgbWVzc2FnZSBzbyB0aGF0IGl0IHdpbGwgd3JhcCBhIGJpdCwgc2luY2UgSSBsaWtlIHRoYXQgbG9vay4nLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpbGxFeHBpcmVCdXRTdGlsbFNlbmRpbmcgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbldpbGxFeHBpcmVCdXRTdGlsbFNlbmRpbmcuYXJncyA9IHtcbiAgc3RhdHVzOiAnc2VuZGluZycsXG4gIGV4cGlyYXRpb25MZW5ndGg6IDMwICogMTAwMCxcbiAgdGV4dDogJ1dlIGFsd2F5cyBzaG93IHRoZSB0aW1lciBpZiBhIG1lc3NhZ2UgaGFzIGFuIGV4cGlyYXRpb24gbGVuZ3RoLCBldmVuIGlmIHVucmVhZCBvciBzdGlsbCBzZW5kaW5nLicsXG59O1xuV2lsbEV4cGlyZUJ1dFN0aWxsU2VuZGluZy5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpbGwgZXhwaXJlIGJ1dCBzdGlsbCBzZW5kaW5nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nID0gVGVtcGxhdGUuYmluZCh7fSk7XG5QZW5kaW5nLmFyZ3MgPSB7XG4gIHRleHQ6ICdIZWxsbyB0aGVyZSBmcm9tIGEgcGFsISBJIGFtIHNlbmRpbmcgYSBsb25nIG1lc3NhZ2Ugc28gdGhhdCBpdCB3aWxsIHdyYXAgYSBiaXQsIHNpbmNlIEkgbGlrZSB0aGF0IGxvb2suJyxcbiAgdGV4dEF0dGFjaG1lbnQ6IHtcbiAgICBjb250ZW50VHlwZTogTE9OR19NRVNTQUdFLFxuICAgIHNpemU6IDEyMyxcbiAgICBwZW5kaW5nOiB0cnVlLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IExvbmdCb2R5Q2FuQmVEb3dubG9hZGVkID0gVGVtcGxhdGUuYmluZCh7fSk7XG5Mb25nQm9keUNhbkJlRG93bmxvYWRlZC5hcmdzID0ge1xuICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSBhIHBhbCEgSSBhbSBzZW5kaW5nIGEgbG9uZyBtZXNzYWdlIHNvIHRoYXQgaXQgd2lsbCB3cmFwIGEgYml0LCBzaW5jZSBJIGxpa2UgdGhhdCBsb29rLicsXG4gIHRleHRBdHRhY2htZW50OiB7XG4gICAgY29udGVudFR5cGU6IExPTkdfTUVTU0FHRSxcbiAgICBzaXplOiAxMjMsXG4gICAgcGVuZGluZzogZmFsc2UsXG4gICAgZXJyb3I6IHRydWUsXG4gICAgZGlnZXN0OiAnYWJjJyxcbiAgICBrZXk6ICdkZWYnLFxuICB9LFxufTtcbkxvbmdCb2R5Q2FuQmVEb3dubG9hZGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyBib2R5IGNhbiBiZSBkb3dubG9hZGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSZWNlbnQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblJlY2VudC5hcmdzID0ge1xuICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSBhIHBhbCEnLFxuICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAzMCAqIDYwICogMTAwMCxcbn07XG5cbmV4cG9ydCBjb25zdCBPbGRlciA9IFRlbXBsYXRlLmJpbmQoe30pO1xuT2xkZXIuYXJncyA9IHtcbiAgdGV4dDogJ0hlbGxvIHRoZXJlIGZyb20gYSBwYWwhJyxcbiAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMTgwICogMjQgKiA2MCAqIDYwICogMTAwMCxcbn07XG5cbmV4cG9ydCBjb25zdCBSZWFjdGlvbnNXaWRlck1lc3NhZ2UgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblJlYWN0aW9uc1dpZGVyTWVzc2FnZS5hcmdzID0ge1xuICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSBhIHBhbCEnLFxuICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAxODAgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICByZWFjdGlvbnM6IFtcbiAgICB7XG4gICAgICBlbW9qaTogJ1x1RDgzRFx1REM0RCcsXG4gICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzInLFxuICAgICAgICBwaG9uZU51bWJlcjogJysxNDE1NTU1MjY3MicsXG4gICAgICAgIG5hbWU6ICdNZScsXG4gICAgICAgIHRpdGxlOiAnTWUnLFxuICAgICAgfSksXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAxMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzREJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3MicsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjcyJyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDEwLFxuICAgIH0sXG4gICAge1xuICAgICAgZW1vamk6ICdcdUQ4M0RcdURDNEQnLFxuICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIGlkOiAnKzE0MTU1NTUyNjczJyxcbiAgICAgICAgcGhvbmVOdW1iZXI6ICcrMTQxNTU1NTI2NzMnLFxuICAgICAgICBuYW1lOiAnQW1lbGlhIEJyaWdncycsXG4gICAgICAgIHRpdGxlOiAnQW1lbGlhJyxcbiAgICAgIH0pLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMTAsXG4gICAgfSxcbiAgICB7XG4gICAgICBlbW9qaTogJ1x1RDgzRFx1REUwMicsXG4gICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzQnLFxuICAgICAgICBwaG9uZU51bWJlcjogJysxNDE1NTU1MjY3NCcsXG4gICAgICAgIG5hbWU6ICdBbWVsaWEgQnJpZ2dzJyxcbiAgICAgICAgdGl0bGU6ICdBbWVsaWEnLFxuICAgICAgfSksXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAxMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVERTIxJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3NycsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjc3JyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDEwLFxuICAgIH0sXG4gICAge1xuICAgICAgZW1vamk6ICdcdUQ4M0RcdURDNEUnLFxuICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIGlkOiAnKzE0MTU1NTUyNjc4JyxcbiAgICAgICAgcGhvbmVOdW1iZXI6ICcrMTQxNTU1NTI2NzgnLFxuICAgICAgICBuYW1lOiAnQW1lbGlhIEJyaWdncycsXG4gICAgICAgIHRpdGxlOiAnQW1lbGlhJyxcbiAgICAgIH0pLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMTAsXG4gICAgfSxcbiAgICB7XG4gICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRicsXG4gICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzknLFxuICAgICAgICBwaG9uZU51bWJlcjogJysxNDE1NTU1MjY3OScsXG4gICAgICAgIG5hbWU6ICdBbWVsaWEgQnJpZ2dzJyxcbiAgICAgICAgdGl0bGU6ICdBbWVsaWEnLFxuICAgICAgfSksXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAxMCxcbiAgICB9LFxuICBdLFxufTtcblJlYWN0aW9uc1dpZGVyTWVzc2FnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1JlYWN0aW9ucyAod2lkZXIgbWVzc2FnZSknLFxufTtcblxuY29uc3Qgam95UmVhY3Rpb25zID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNTIgfSwgKCkgPT4gZ2V0Sm95UmVhY3Rpb24oKSk7XG5cbmV4cG9ydCBjb25zdCBSZWFjdGlvbnNTaG9ydE1lc3NhZ2UgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblJlYWN0aW9uc1Nob3J0TWVzc2FnZS5hcmdzID0ge1xuICB0ZXh0OiAnaCcsXG4gIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgcmVhY3Rpb25zOiBbXG4gICAgLi4uam95UmVhY3Rpb25zLFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzREJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICBpZDogJysxNDE1NTU1MjY3MicsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjcyJyxcbiAgICAgICAgbmFtZTogJ01lJyxcbiAgICAgICAgdGl0bGU6ICdNZScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzREJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3MicsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjcyJyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzREJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3MycsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjczJyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVERTIxJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3NycsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjc3JyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzRFJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3OCcsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjc4JyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGVtb2ppOiAnXHUyNzY0XHVGRTBGJyxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJysxNDE1NTU1MjY3OScsXG4gICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjc5JyxcbiAgICAgICAgbmFtZTogJ0FtZWxpYSBCcmlnZ3MnLFxuICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICBdLFxufTtcblxuUmVhY3Rpb25zU2hvcnRNZXNzYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnUmVhY3Rpb25zIChzaG9ydCBtZXNzYWdlKScsXG59O1xuXG5leHBvcnQgY29uc3QgQXZhdGFySW5Hcm91cCA9IFRlbXBsYXRlLmJpbmQoe30pO1xuQXZhdGFySW5Hcm91cC5hcmdzID0ge1xuICBhdXRob3I6IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBhdmF0YXJQYXRoOiBwbmdVcmwgfSksXG4gIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcsXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnSGVsbG8gaXQgaXMgbWUsIHRoZSBzYXhvcGhvbmUuJyxcbn07XG5BdmF0YXJJbkdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnQXZhdGFyIGluIEdyb3VwJyxcbn07XG5cbmV4cG9ydCBjb25zdCBCYWRnZUluR3JvdXAgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkJhZGdlSW5Hcm91cC5hcmdzID0ge1xuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxuICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gZ2V0RmFrZUJhZGdlKCksXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnSGVsbG8gaXQgaXMgbWUsIHRoZSBzYXhvcGhvbmUuJyxcbn07XG5CYWRnZUluR3JvdXAuc3RvcnkgPSB7XG4gIG5hbWU6ICdCYWRnZSBpbiBHcm91cCcsXG59O1xuXG5leHBvcnQgY29uc3QgU3RpY2tlciA9IFRlbXBsYXRlLmJpbmQoe30pO1xuU3RpY2tlci5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogJy9maXh0dXJlcy81MTJ4NTE1LXRodW1icy11cC1saW5jb2xuLndlYnAnLFxuICAgICAgZmlsZU5hbWU6ICc1MTJ4NTE1LXRodW1icy11cC1saW5jb2xuLndlYnAnLFxuICAgICAgY29udGVudFR5cGU6IElNQUdFX1dFQlAsXG4gICAgICB3aWR0aDogMTI4LFxuICAgICAgaGVpZ2h0OiAxMjgsXG4gICAgfSksXG4gIF0sXG4gIGlzU3RpY2tlcjogdHJ1ZSxcbiAgc3RhdHVzOiAnc2VudCcsXG59O1xuXG5leHBvcnQgY29uc3QgRGVsZXRlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzU2VudCA9IGNyZWF0ZVByb3BzKHtcbiAgICBjb252ZXJzYXRpb25UeXBlOiAnZGlyZWN0JyxcbiAgICBkZWxldGVkRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgc3RhdHVzOiAnc2VudCcsXG4gIH0pO1xuICBjb25zdCBwcm9wc1NlbmRpbmcgPSBjcmVhdGVQcm9wcyh7XG4gICAgY29udmVyc2F0aW9uVHlwZTogJ2RpcmVjdCcsXG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlLFxuICAgIHN0YXR1czogJ3NlbmRpbmcnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cmVuZGVyQm90aERpcmVjdGlvbnMocHJvcHNTZW50KX1cbiAgICAgIHtyZW5kZXJCb3RoRGlyZWN0aW9ucyhwcm9wc1NlbmRpbmcpfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IERlbGV0ZWRXaXRoRXhwaXJlVGltZXIgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkRlbGV0ZWRXaXRoRXhwaXJlVGltZXIuYXJncyA9IHtcbiAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gNjAgKiAxMDAwLFxuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxuICBkZWxldGVkRm9yRXZlcnlvbmU6IHRydWUsXG4gIGV4cGlyYXRpb25MZW5ndGg6IDUgKiA2MCAqIDEwMDAsXG4gIGV4cGlyYXRpb25UaW1lc3RhbXA6IERhdGUubm93KCkgKyAzICogNjAgKiAxMDAwLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5EZWxldGVkV2l0aEV4cGlyZVRpbWVyLnN0b3J5ID0ge1xuICBuYW1lOiAnRGVsZXRlZCB3aXRoIGV4cGlyZVRpbWVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWxldGVkV2l0aEVycm9yID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHNQYXJ0aWFsRXJyb3IgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gNjAgKiAxMDAwLFxuICAgIGNhbkRlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICAgIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcsXG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlLFxuICAgIHN0YXR1czogJ3BhcnRpYWwtc2VudCcsXG4gICAgZGlyZWN0aW9uOiAnb3V0Z29pbmcnLFxuICB9KTtcbiAgY29uc3QgcHJvcHNFcnJvciA9IGNyZWF0ZVByb3BzKHtcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSA2MCAqIDEwMDAsXG4gICAgY2FuRGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICBkZWxldGVkRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgc3RhdHVzOiAnZXJyb3InLFxuICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlclRocmVlKHByb3BzUGFydGlhbEVycm9yKX1cbiAgICAgIHtyZW5kZXJUaHJlZShwcm9wc0Vycm9yKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5EZWxldGVkV2l0aEVycm9yLnN0b3J5ID0ge1xuICBuYW1lOiAnRGVsZXRlZCB3aXRoIGVycm9yJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDYW5EZWxldGVGb3JFdmVyeW9uZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuQ2FuRGVsZXRlRm9yRXZlcnlvbmUuYXJncyA9IHtcbiAgc3RhdHVzOiAncmVhZCcsXG4gIHRleHQ6ICdJIGhvcGUgeW91IGdldCB0aGlzLicsXG4gIGNhbkRlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG59O1xuQ2FuRGVsZXRlRm9yRXZlcnlvbmUuc3RvcnkgPSB7XG4gIG5hbWU6ICdDYW4gZGVsZXRlIGZvciBldmVyeW9uZScsXG59O1xuXG5leHBvcnQgY29uc3QgRXJyb3IgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkVycm9yLmFyZ3MgPSB7XG4gIHN0YXR1czogJ2Vycm9yJyxcbiAgY2FuUmV0cnk6IHRydWUsXG4gIHRleHQ6ICdJIGhvcGUgeW91IGdldCB0aGlzLicsXG59O1xuXG5leHBvcnQgY29uc3QgUGF1c2VkID0gVGVtcGxhdGUuYmluZCh7fSk7XG5QYXVzZWQuYXJncyA9IHtcbiAgc3RhdHVzOiAncGF1c2VkJyxcbiAgdGV4dDogJ0kgYW0gdXAgdG8gYSBjaGFsbGVuZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IFBhcnRpYWxTZW5kID0gVGVtcGxhdGUuYmluZCh7fSk7XG5QYXJ0aWFsU2VuZC5hcmdzID0ge1xuICBzdGF0dXM6ICdwYXJ0aWFsLXNlbnQnLFxuICB0ZXh0OiAnSSBob3BlIHlvdSBnZXQgdGhpcy4nLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtQcmV2aWV3SW5Hcm91cCA9IFRlbXBsYXRlLmJpbmQoe30pO1xuTGlua1ByZXZpZXdJbkdyb3VwLmFyZ3MgPSB7XG4gIHByZXZpZXdzOiBbXG4gICAge1xuICAgICAgZG9tYWluOiAnc2lnbmFsLm9yZycsXG4gICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3RoZS1zYXgucG5nJyxcbiAgICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICB3aWR0aDogMzIwLFxuICAgICAgfSksXG4gICAgICBpc1N0aWNrZXJQYWNrOiBmYWxzZSxcbiAgICAgIHRpdGxlOiAnU2lnbmFsJyxcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnU2F5IFwiaGVsbG9cIiB0byBhIGRpZmZlcmVudCBtZXNzYWdpbmcgZXhwZXJpZW5jZS4gQW4gdW5leHBlY3RlZCBmb2N1cyBvbiBwcml2YWN5LCBjb21iaW5lZCB3aXRoIGFsbCBvZiB0aGUgZmVhdHVyZXMgeW91IGV4cGVjdC4nLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICBkYXRlOiBuZXcgRGF0ZSgyMDIwLCAyLCAxMCkudmFsdWVPZigpLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxufTtcbkxpbmtQcmV2aWV3SW5Hcm91cC5zdG9yeSA9IHtcbiAgbmFtZTogJ0xpbmsgUHJldmlldyBpbiBHcm91cCcsXG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdXaXRoUXVvdGUgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkxpbmtQcmV2aWV3V2l0aFF1b3RlLmFyZ3MgPSB7XG4gIHF1b3RlOiB7XG4gICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yc1syXSxcbiAgICB0ZXh0OiAnVGhlIHF1b3RlZCBtZXNzYWdlJyxcbiAgICBpc0Zyb21NZTogZmFsc2UsXG4gICAgc2VudEF0OiBEYXRlLm5vdygpLFxuICAgIGF1dGhvcklkOiAnc29tZS1pZCcsXG4gICAgYXV0aG9yVGl0bGU6ICdTb21lb25lJyxcbiAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICBpc0dpZnRCYWRnZTogZmFsc2UsXG4gIH0sXG4gIHByZXZpZXdzOiBbXG4gICAge1xuICAgICAgZG9tYWluOiAnc2lnbmFsLm9yZycsXG4gICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3RoZS1zYXgucG5nJyxcbiAgICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICB3aWR0aDogMzIwLFxuICAgICAgfSksXG4gICAgICBpc1N0aWNrZXJQYWNrOiBmYWxzZSxcbiAgICAgIHRpdGxlOiAnU2lnbmFsJyxcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnU2F5IFwiaGVsbG9cIiB0byBhIGRpZmZlcmVudCBtZXNzYWdpbmcgZXhwZXJpZW5jZS4gQW4gdW5leHBlY3RlZCBmb2N1cyBvbiBwcml2YWN5LCBjb21iaW5lZCB3aXRoIGFsbCBvZiB0aGUgZmVhdHVyZXMgeW91IGV4cGVjdC4nLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICBkYXRlOiBuZXcgRGF0ZSgyMDIwLCAyLCAxMCkudmFsdWVPZigpLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxufTtcbkxpbmtQcmV2aWV3V2l0aFF1b3RlLnN0b3J5ID0ge1xuICBuYW1lOiAnTGluayBQcmV2aWV3IHdpdGggUXVvdGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtQcmV2aWV3V2l0aFNtYWxsSW1hZ2UgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkxpbmtQcmV2aWV3V2l0aFNtYWxsSW1hZ2UuYXJncyA9IHtcbiAgcHJldmlld3M6IFtcbiAgICB7XG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAndGhlLXNheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICB1cmw6IHBuZ1VybCxcbiAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgfSksXG4gICAgICBpc1N0aWNrZXJQYWNrOiBmYWxzZSxcbiAgICAgIHRpdGxlOiAnU2lnbmFsJyxcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnU2F5IFwiaGVsbG9cIiB0byBhIGRpZmZlcmVudCBtZXNzYWdpbmcgZXhwZXJpZW5jZS4gQW4gdW5leHBlY3RlZCBmb2N1cyBvbiBwcml2YWN5LCBjb21iaW5lZCB3aXRoIGFsbCBvZiB0aGUgZmVhdHVyZXMgeW91IGV4cGVjdC4nLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICBkYXRlOiBuZXcgRGF0ZSgyMDIwLCAyLCAxMCkudmFsdWVPZigpLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxufTtcbkxpbmtQcmV2aWV3V2l0aFNtYWxsSW1hZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW5rIFByZXZpZXcgd2l0aCBTbWFsbCBJbWFnZScsXG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdXaXRob3V0SW1hZ2UgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkxpbmtQcmV2aWV3V2l0aG91dEltYWdlLmFyZ3MgPSB7XG4gIHByZXZpZXdzOiBbXG4gICAge1xuICAgICAgZG9tYWluOiAnc2lnbmFsLm9yZycsXG4gICAgICBpc1N0aWNrZXJQYWNrOiBmYWxzZSxcbiAgICAgIHRpdGxlOiAnU2lnbmFsJyxcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnU2F5IFwiaGVsbG9cIiB0byBhIGRpZmZlcmVudCBtZXNzYWdpbmcgZXhwZXJpZW5jZS4gQW4gdW5leHBlY3RlZCBmb2N1cyBvbiBwcml2YWN5LCBjb21iaW5lZCB3aXRoIGFsbCBvZiB0aGUgZmVhdHVyZXMgeW91IGV4cGVjdC4nLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICBkYXRlOiBuZXcgRGF0ZSgyMDIwLCAyLCAxMCkudmFsdWVPZigpLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxufTtcbkxpbmtQcmV2aWV3V2l0aG91dEltYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnTGluayBQcmV2aWV3IHdpdGhvdXQgSW1hZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtQcmV2aWV3V2l0aE5vRGVzY3JpcHRpb24gPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkxpbmtQcmV2aWV3V2l0aE5vRGVzY3JpcHRpb24uYXJncyA9IHtcbiAgcHJldmlld3M6IFtcbiAgICB7XG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIGlzU3RpY2tlclBhY2s6IGZhbHNlLFxuICAgICAgdGl0bGU6ICdTaWduYWwnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICBkYXRlOiBEYXRlLm5vdygpLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxufTtcbkxpbmtQcmV2aWV3V2l0aE5vRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW5rIFByZXZpZXcgd2l0aCBubyBkZXNjcmlwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdXaXRoTG9uZ0Rlc2NyaXB0aW9uID0gVGVtcGxhdGUuYmluZCh7fSk7XG5MaW5rUHJldmlld1dpdGhMb25nRGVzY3JpcHRpb24uYXJncyA9IHtcbiAgcHJldmlld3M6IFtcbiAgICB7XG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIGlzU3RpY2tlclBhY2s6IGZhbHNlLFxuICAgICAgdGl0bGU6ICdTaWduYWwnLFxuICAgICAgZGVzY3JpcHRpb246IEFycmF5KDEwKVxuICAgICAgICAuZmlsbChcbiAgICAgICAgICAnU2F5IFwiaGVsbG9cIiB0byBhIGRpZmZlcmVudCBtZXNzYWdpbmcgZXhwZXJpZW5jZS4gQW4gdW5leHBlY3RlZCBmb2N1cyBvbiBwcml2YWN5LCBjb21iaW5lZCB3aXRoIGFsbCBvZiB0aGUgZmVhdHVyZXMgeW91IGV4cGVjdC4nXG4gICAgICAgIClcbiAgICAgICAgLmpvaW4oJyAnKSxcbiAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICAgICAgZGF0ZTogRGF0ZS5ub3coKSxcbiAgICB9LFxuICBdLFxuICBzdGF0dXM6ICdzZW50JyxcbiAgdGV4dDogJ0JlIHN1cmUgdG8gbG9vayBhdCBodHRwczovL3d3dy5zaWduYWwub3JnJyxcbn07XG5MaW5rUHJldmlld1dpdGhMb25nRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW5rIFByZXZpZXcgd2l0aCBsb25nIGRlc2NyaXB0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlld1dpdGhTbWFsbEltYWdlTG9uZ0Rlc2NyaXB0aW9uID0gVGVtcGxhdGUuYmluZCh7fSk7XG5MaW5rUHJldmlld1dpdGhTbWFsbEltYWdlTG9uZ0Rlc2NyaXB0aW9uLmFyZ3MgPSB7XG4gIHByZXZpZXdzOiBbXG4gICAge1xuICAgICAgZG9tYWluOiAnc2lnbmFsLm9yZycsXG4gICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3RoZS1zYXgucG5nJyxcbiAgICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA1MCxcbiAgICAgIH0pLFxuICAgICAgaXNTdGlja2VyUGFjazogZmFsc2UsXG4gICAgICB0aXRsZTogJ1NpZ25hbCcsXG4gICAgICBkZXNjcmlwdGlvbjogQXJyYXkoMTApXG4gICAgICAgIC5maWxsKFxuICAgICAgICAgICdTYXkgXCJoZWxsb1wiIHRvIGEgZGlmZmVyZW50IG1lc3NhZ2luZyBleHBlcmllbmNlLiBBbiB1bmV4cGVjdGVkIGZvY3VzIG9uIHByaXZhY3ksIGNvbWJpbmVkIHdpdGggYWxsIG9mIHRoZSBmZWF0dXJlcyB5b3UgZXhwZWN0LidcbiAgICAgICAgKVxuICAgICAgICAuam9pbignICcpLFxuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgICBkYXRlOiBEYXRlLm5vdygpLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxufTtcbkxpbmtQcmV2aWV3V2l0aFNtYWxsSW1hZ2VMb25nRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW5rIFByZXZpZXcgd2l0aCBzbWFsbCBpbWFnZSwgbG9uZyBkZXNjcmlwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdXaXRoTm9EYXRlID0gVGVtcGxhdGUuYmluZCh7fSk7XG5MaW5rUHJldmlld1dpdGhOb0RhdGUuYXJncyA9IHtcbiAgcHJldmlld3M6IFtcbiAgICB7XG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAndGhlLXNheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDI0MCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiAzMjAsXG4gICAgICB9KSxcbiAgICAgIGlzU3RpY2tlclBhY2s6IGZhbHNlLFxuICAgICAgdGl0bGU6ICdTaWduYWwnLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdTYXkgXCJoZWxsb1wiIHRvIGEgZGlmZmVyZW50IG1lc3NhZ2luZyBleHBlcmllbmNlLiBBbiB1bmV4cGVjdGVkIGZvY3VzIG9uIHByaXZhY3ksIGNvbWJpbmVkIHdpdGggYWxsIG9mIHRoZSBmZWF0dXJlcyB5b3UgZXhwZWN0LicsXG4gICAgICB1cmw6ICdodHRwczovL3d3dy5zaWduYWwub3JnJyxcbiAgICB9LFxuICBdLFxuICBzdGF0dXM6ICdzZW50JyxcbiAgdGV4dDogJ0JlIHN1cmUgdG8gbG9vayBhdCBodHRwczovL3d3dy5zaWduYWwub3JnJyxcbn07XG5MaW5rUHJldmlld1dpdGhOb0RhdGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW5rIFByZXZpZXcgd2l0aCBubyBkYXRlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlld1dpdGhUb29OZXdBRGF0ZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuTGlua1ByZXZpZXdXaXRoVG9vTmV3QURhdGUuYXJncyA9IHtcbiAgcHJldmlld3M6IFtcbiAgICB7XG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAndGhlLXNheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDI0MCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiAzMjAsXG4gICAgICB9KSxcbiAgICAgIGlzU3RpY2tlclBhY2s6IGZhbHNlLFxuICAgICAgdGl0bGU6ICdTaWduYWwnLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdTYXkgXCJoZWxsb1wiIHRvIGEgZGlmZmVyZW50IG1lc3NhZ2luZyBleHBlcmllbmNlLiBBbiB1bmV4cGVjdGVkIGZvY3VzIG9uIHByaXZhY3ksIGNvbWJpbmVkIHdpdGggYWxsIG9mIHRoZSBmZWF0dXJlcyB5b3UgZXhwZWN0LicsXG4gICAgICB1cmw6ICdodHRwczovL3d3dy5zaWduYWwub3JnJyxcbiAgICAgIGRhdGU6IERhdGUubm93KCkgKyAzMDAwMDAwMDAwLFxuICAgIH0sXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQmUgc3VyZSB0byBsb29rIGF0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxufTtcbkxpbmtQcmV2aWV3V2l0aFRvb05ld0FEYXRlLnN0b3J5ID0ge1xuICBuYW1lOiAnTGluayBQcmV2aWV3IHdpdGggdG9vIG5ldyBhIGRhdGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEltYWdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZGFya0ltYWdlUHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICB3aWR0aDogMTI4LFxuICAgICAgICBoZWlnaHQ6IDEyOCxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgc3RhdHVzOiAnc2VudCcsXG4gIH0pO1xuICBjb25zdCBsaWdodEltYWdlUHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIGZpbGVOYW1lOiAndGhlLXNheC5wbmcnLFxuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBoZWlnaHQ6IDI0MCxcbiAgICAgICAgd2lkdGg6IDMyMCxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgc3RhdHVzOiAnc2VudCcsXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJCb3RoRGlyZWN0aW9ucyhkYXJrSW1hZ2VQcm9wcyl9XG4gICAgICB7cmVuZGVyQm90aERpcmVjdGlvbnMobGlnaHRJbWFnZVByb3BzKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZUltYWdlczIgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk11bHRpcGxlSW1hZ2VzMi5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZUltYWdlczMgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk11bHRpcGxlSW1hZ2VzMy5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZUltYWdlczQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk11bHRpcGxlSW1hZ2VzNC5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZUltYWdlczUgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk11bHRpcGxlSW1hZ2VzNS5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogcG5nVXJsLFxuICAgICAgZmlsZU5hbWU6ICd0aGUtc2F4LnBuZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgaGVpZ2h0OiAyNDAsXG4gICAgICB3aWR0aDogMzIwLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbWFnZVdpdGhDYXB0aW9uID0gVGVtcGxhdGUuYmluZCh7fSk7XG5JbWFnZVdpdGhDYXB0aW9uLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICB3aWR0aDogMTI4LFxuICAgICAgaGVpZ2h0OiAxMjgsXG4gICAgfSksXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnVGhpcyBpcyBteSBob21lLicsXG59O1xuSW1hZ2VXaXRoQ2FwdGlvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0ltYWdlIHdpdGggQ2FwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgR2lmID0gVGVtcGxhdGUuYmluZCh7fSk7XG5HaWYuYXJncyA9IHtcbiAgYXR0YWNobWVudHM6IFtcbiAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgZmxhZ3M6IFNpZ25hbFNlcnZpY2UuQXR0YWNobWVudFBvaW50ZXIuRmxhZ3MuR0lGLFxuICAgICAgZmlsZU5hbWU6ICdjYXQtZ2lmLm1wNCcsXG4gICAgICB1cmw6ICcvZml4dHVyZXMvY2F0LWdpZi5tcDQnLFxuICAgICAgd2lkdGg6IDQwMCxcbiAgICAgIGhlaWdodDogMzMyLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5HaWYuc3RvcnkgPSB7XG4gIG5hbWU6ICdHSUYnLFxufTtcblxuZXhwb3J0IGNvbnN0IEdpZkluQUdyb3VwID0gVGVtcGxhdGUuYmluZCh7fSk7XG5HaWZJbkFHcm91cC5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICBmbGFnczogU2lnbmFsU2VydmljZS5BdHRhY2htZW50UG9pbnRlci5GbGFncy5HSUYsXG4gICAgICBmaWxlTmFtZTogJ2NhdC1naWYubXA0JyxcbiAgICAgIHVybDogJy9maXh0dXJlcy9jYXQtZ2lmLm1wNCcsXG4gICAgICB3aWR0aDogNDAwLFxuICAgICAgaGVpZ2h0OiAzMzIsXG4gICAgfSksXG4gIF0sXG4gIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcsXG4gIHN0YXR1czogJ3NlbnQnLFxufTtcbkdpZkluQUdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnR0lGIGluIGEgZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdERvd25sb2FkZWRHaWYgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk5vdERvd25sb2FkZWRHaWYuYXJncyA9IHtcbiAgYXR0YWNobWVudHM6IFtcbiAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgZmxhZ3M6IFNpZ25hbFNlcnZpY2UuQXR0YWNobWVudFBvaW50ZXIuRmxhZ3MuR0lGLFxuICAgICAgZmlsZU5hbWU6ICdjYXQtZ2lmLm1wNCcsXG4gICAgICBmaWxlU2l6ZTogJzE4OC42MSBLQicsXG4gICAgICBibHVySGFzaDogJ0xEQSxGREJubStJPXB7dGtJVUk7flVrcEVMVl0nLFxuICAgICAgd2lkdGg6IDQwMCxcbiAgICAgIGhlaWdodDogMzMyLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5Ob3REb3dubG9hZGVkR2lmLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90IERvd25sb2FkZWQgR0lGJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nR2lmID0gVGVtcGxhdGUuYmluZCh7fSk7XG5QZW5kaW5nR2lmLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICBmbGFnczogU2lnbmFsU2VydmljZS5BdHRhY2htZW50UG9pbnRlci5GbGFncy5HSUYsXG4gICAgICBmaWxlTmFtZTogJ2NhdC1naWYubXA0JyxcbiAgICAgIGZpbGVTaXplOiAnMTg4LjYxIEtCJyxcbiAgICAgIGJsdXJIYXNoOiAnTERBLEZEQm5tK0k9cHt0a0lVSTt+VWtwRUxWXScsXG4gICAgICB3aWR0aDogNDAwLFxuICAgICAgaGVpZ2h0OiAzMzIsXG4gICAgfSksXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxufTtcblBlbmRpbmdHaWYuc3RvcnkgPSB7XG4gIG5hbWU6ICdQZW5kaW5nIEdJRicsXG59O1xuXG5leHBvcnQgY29uc3QgX0F1ZGlvID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgV3JhcHBlciA9ICgpID0+IHtcbiAgICBjb25zdCBbaXNQbGF5ZWQsIHNldElzUGxheWVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGNvbnN0IG1lc3NhZ2VQcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICBjb250ZW50VHlwZTogQVVESU9fTVAzLFxuICAgICAgICAgIGZpbGVOYW1lOiAnaW5jb21wZXRlY2gtY29tLUFnbnVzLURlaS1YLm1wMycsXG4gICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICAuLi4oaXNQbGF5ZWRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBzdGF0dXM6ICd2aWV3ZWQnLFxuICAgICAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5WaWV3ZWQsXG4gICAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHN0YXR1czogJ3JlYWQnLFxuICAgICAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRJc1BsYXllZChvbGQgPT4gIW9sZCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzJlbScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIFRvZ2dsZSBwbGF5ZWRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIHtyZW5kZXJCb3RoRGlyZWN0aW9ucyhtZXNzYWdlUHJvcHMpfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gPFdyYXBwZXIgLz47XG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ0F1ZGlvID0gVGVtcGxhdGUuYmluZCh7fSk7XG5Mb25nQXVkaW8uYXJncyA9IHtcbiAgYXR0YWNobWVudHM6IFtcbiAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICBjb250ZW50VHlwZTogQVVESU9fTVAzLFxuICAgICAgZmlsZU5hbWU6ICdsb25nLWF1ZGlvLm1wMycsXG4gICAgICB1cmw6ICcvZml4dHVyZXMvbG9uZy1hdWRpby5tcDMnLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBBdWRpb1dpdGhDYXB0aW9uID0gVGVtcGxhdGUuYmluZCh7fSk7XG5BdWRpb1dpdGhDYXB0aW9uLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IEFVRElPX01QMyxcbiAgICAgIGZpbGVOYW1lOiAnaW5jb21wZXRlY2gtY29tLUFnbnVzLURlaS1YLm1wMycsXG4gICAgICB1cmw6ICcvZml4dHVyZXMvaW5jb21wZXRlY2gtY29tLUFnbnVzLURlaS1YLm1wMycsXG4gICAgfSksXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnVGhpcyBpcyB3aGF0IEkgc291bmQgbGlrZS4nLFxufTtcbkF1ZGlvV2l0aENhcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdBdWRpbyB3aXRoIENhcHRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IEF1ZGlvV2l0aE5vdERvd25sb2FkZWRBdHRhY2htZW50ID0gVGVtcGxhdGUuYmluZCh7fSk7XG5BdWRpb1dpdGhOb3REb3dubG9hZGVkQXR0YWNobWVudC5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIGNvbnRlbnRUeXBlOiBBVURJT19NUDMsXG4gICAgICBmaWxlTmFtZTogJ2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5BdWRpb1dpdGhOb3REb3dubG9hZGVkQXR0YWNobWVudC5zdG9yeSA9IHtcbiAgbmFtZTogJ0F1ZGlvIHdpdGggTm90IERvd25sb2FkZWQgQXR0YWNobWVudCcsXG59O1xuXG5leHBvcnQgY29uc3QgQXVkaW9XaXRoUGVuZGluZ0F0dGFjaG1lbnQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkF1ZGlvV2l0aFBlbmRpbmdBdHRhY2htZW50LmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IEFVRElPX01QMyxcbiAgICAgIGZpbGVOYW1lOiAnaW5jb21wZXRlY2gtY29tLUFnbnVzLURlaS1YLm1wMycsXG4gICAgICBwZW5kaW5nOiB0cnVlLFxuICAgIH0pLFxuICBdLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5BdWRpb1dpdGhQZW5kaW5nQXR0YWNobWVudC5zdG9yeSA9IHtcbiAgbmFtZTogJ0F1ZGlvIHdpdGggUGVuZGluZyBBdHRhY2htZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBPdGhlckZpbGVUeXBlID0gVGVtcGxhdGUuYmluZCh7fSk7XG5PdGhlckZpbGVUeXBlLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ3RleHQvcGxhaW4nKSxcbiAgICAgIGZpbGVOYW1lOiAnbXktcmVzdW1lLnR4dCcsXG4gICAgICB1cmw6ICdteS1yZXN1bWUudHh0JyxcbiAgICAgIGZpbGVTaXplOiAnMTBNQicsXG4gICAgfSksXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IE90aGVyRmlsZVR5cGVXaXRoQ2FwdGlvbiA9IFRlbXBsYXRlLmJpbmQoe30pO1xuT3RoZXJGaWxlVHlwZVdpdGhDYXB0aW9uLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ3RleHQvcGxhaW4nKSxcbiAgICAgIGZpbGVOYW1lOiAnbXktcmVzdW1lLnR4dCcsXG4gICAgICB1cmw6ICdteS1yZXN1bWUudHh0JyxcbiAgICAgIGZpbGVTaXplOiAnMTBNQicsXG4gICAgfSksXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnVGhpcyBpcyB3aGF0IEkgaGF2ZSBkb25lLicsXG59O1xuT3RoZXJGaWxlVHlwZVdpdGhDYXB0aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnT3RoZXIgRmlsZSBUeXBlIHdpdGggQ2FwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgT3RoZXJGaWxlVHlwZVdpdGhMb25nRmlsZW5hbWUgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk90aGVyRmlsZVR5cGVXaXRoTG9uZ0ZpbGVuYW1lLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ3RleHQvcGxhaW4nKSxcbiAgICAgIGZpbGVOYW1lOlxuICAgICAgICAnSU5TRVJULUFQUC1OQU1FX0lOU0VSVC1BUFAtQVBQTEUtSURfQXBwU3RvcmVfQXBwc0dhbWVzV2F0Y2gucHNkLnppcCcsXG4gICAgICB1cmw6ICdhMi9hMjMzNDMyNGRhcmV3ZXI0MjM0JyxcbiAgICAgIGZpbGVTaXplOiAnMTBNQicsXG4gICAgfSksXG4gIF0sXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnVGhpcyBpcyB3aGF0IEkgaGF2ZSBkb25lLicsXG59O1xuT3RoZXJGaWxlVHlwZVdpdGhMb25nRmlsZW5hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdPdGhlciBGaWxlIFR5cGUgd2l0aCBMb25nIEZpbGVuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUYXBUb1ZpZXdJbWFnZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuVGFwVG9WaWV3SW1hZ2UuYXJncyA9IHtcbiAgYXR0YWNobWVudHM6IFtcbiAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgIHdpZHRoOiAxMjgsXG4gICAgICBoZWlnaHQ6IDEyOCxcbiAgICB9KSxcbiAgXSxcbiAgaXNUYXBUb1ZpZXc6IHRydWUsXG4gIHN0YXR1czogJ3NlbnQnLFxufTtcblRhcFRvVmlld0ltYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnVGFwVG9WaWV3IEltYWdlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUYXBUb1ZpZXdWaWRlbyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuVGFwVG9WaWV3VmlkZW8uYXJncyA9IHtcbiAgYXR0YWNobWVudHM6IFtcbiAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgZmlsZU5hbWU6ICdwaXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICAgIGhlaWdodDogMTI4LFxuICAgICAgdXJsOiAnL2ZpeHR1cmVzL3BpeGFiYXktU29hcC1CdWJibGUtNzE0MS5tcDQnLFxuICAgICAgd2lkdGg6IDEyOCxcbiAgICB9KSxcbiAgXSxcbiAgaXNUYXBUb1ZpZXc6IHRydWUsXG4gIHN0YXR1czogJ3NlbnQnLFxufTtcblRhcFRvVmlld1ZpZGVvLnN0b3J5ID0ge1xuICBuYW1lOiAnVGFwVG9WaWV3IFZpZGVvJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUYXBUb1ZpZXdHaWYgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblRhcFRvVmlld0dpZi5hcmdzID0ge1xuICBhdHRhY2htZW50czogW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICBmbGFnczogU2lnbmFsU2VydmljZS5BdHRhY2htZW50UG9pbnRlci5GbGFncy5HSUYsXG4gICAgICBmaWxlTmFtZTogJ2NhdC1naWYubXA0JyxcbiAgICAgIHVybDogJy9maXh0dXJlcy9jYXQtZ2lmLm1wNCcsXG4gICAgICB3aWR0aDogNDAwLFxuICAgICAgaGVpZ2h0OiAzMzIsXG4gICAgfSksXG4gIF0sXG4gIGlzVGFwVG9WaWV3OiB0cnVlLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5UYXBUb1ZpZXdHaWYuc3RvcnkgPSB7XG4gIG5hbWU6ICdUYXBUb1ZpZXcgR0lGJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUYXBUb1ZpZXdFeHBpcmVkID0gVGVtcGxhdGUuYmluZCh7fSk7XG5UYXBUb1ZpZXdFeHBpcmVkLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICB3aWR0aDogMTI4LFxuICAgICAgaGVpZ2h0OiAxMjgsXG4gICAgfSksXG4gIF0sXG4gIGlzVGFwVG9WaWV3OiB0cnVlLFxuICBpc1RhcFRvVmlld0V4cGlyZWQ6IHRydWUsXG4gIHN0YXR1czogJ3NlbnQnLFxufTtcblRhcFRvVmlld0V4cGlyZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdUYXBUb1ZpZXcgRXhwaXJlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVGFwVG9WaWV3RXJyb3IgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblRhcFRvVmlld0Vycm9yLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICB3aWR0aDogMTI4LFxuICAgICAgaGVpZ2h0OiAxMjgsXG4gICAgfSksXG4gIF0sXG4gIGlzVGFwVG9WaWV3OiB0cnVlLFxuICBpc1RhcFRvVmlld0Vycm9yOiB0cnVlLFxuICBzdGF0dXM6ICdzZW50Jyxcbn07XG5UYXBUb1ZpZXdFcnJvci5zdG9yeSA9IHtcbiAgbmFtZTogJ1RhcFRvVmlldyBFcnJvcicsXG59O1xuXG5leHBvcnQgY29uc3QgRGFuZ2Vyb3VzRmlsZVR5cGUgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkRhbmdlcm91c0ZpbGVUeXBlLmFyZ3MgPSB7XG4gIGF0dGFjaG1lbnRzOiBbXG4gICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoXG4gICAgICAgICdhcHBsaWNhdGlvbi92bmQubWljcm9zb2Z0LnBvcnRhYmxlLWV4ZWN1dGFibGUnXG4gICAgICApLFxuICAgICAgZmlsZU5hbWU6ICd0ZXJyaWJsZS5leGUnLFxuICAgICAgdXJsOiAndGVycmlibGUuZXhlJyxcbiAgICB9KSxcbiAgXSxcbiAgc3RhdHVzOiAnc2VudCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ29sb3JzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge0NvbnZlcnNhdGlvbkNvbG9ycy5tYXAoY29sb3IgPT4gKFxuICAgICAgICA8ZGl2IGtleT17Y29sb3J9PlxuICAgICAgICAgIHtyZW5kZXJCb3RoRGlyZWN0aW9ucyhcbiAgICAgICAgICAgIGNyZWF0ZVByb3BzKHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICB0ZXh0OiBgSGVyZSBpcyBhIHByZXZpZXcgb2YgdGhlIGNoYXQgY29sb3I6ICR7Y29sb3J9LiBUaGUgY29sb3IgaXMgdmlzaWJsZSB0byBvbmx5IHlvdS5gLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE1lbnRpb25zID0gVGVtcGxhdGUuYmluZCh7fSk7XG5NZW50aW9ucy5hcmdzID0ge1xuICBib2R5UmFuZ2VzOiBbXG4gICAge1xuICAgICAgc3RhcnQ6IDAsXG4gICAgICBsZW5ndGg6IDEsXG4gICAgICBtZW50aW9uVXVpZDogJ3phcCcsXG4gICAgICByZXBsYWNlbWVudFRleHQ6ICdaYXBwIEJyYW5uaWdhbicsXG4gICAgfSxcbiAgXSxcbiAgdGV4dDogJ1xcdUZGRkMgVGhpcyBJcyBJdC4gVGhlIE1vbWVudCBXZSBTaG91bGQgSGF2ZSBUcmFpbmVkIEZvci4nLFxufTtcbk1lbnRpb25zLnN0b3J5ID0ge1xuICBuYW1lOiAnQE1lbnRpb25zJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBbGxUaGVDb250ZXh0TWVudXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhdHRhY2htZW50czogW1xuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICBmaWxlTmFtZTogJ3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIHdpZHRoOiAxMjgsXG4gICAgICAgIGhlaWdodDogMTI4LFxuICAgICAgfSksXG4gICAgXSxcbiAgICBzdGF0dXM6ICdwYXJ0aWFsLXNlbnQnLFxuICAgIGNhbkRlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICAgIGNhblJldHJ5OiB0cnVlLFxuICAgIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZSB7Li4ucHJvcHN9IGRpcmVjdGlvbj1cIm91dGdvaW5nXCIgLz47XG59O1xuQWxsVGhlQ29udGV4dE1lbnVzLnN0b3J5ID0ge1xuICBuYW1lOiAnQWxsIHRoZSBjb250ZXh0IG1lbnVzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RBcHByb3ZlZFdpdGhMaW5rUHJldmlldyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuTm90QXBwcm92ZWRXaXRoTGlua1ByZXZpZXcuYXJncyA9IHtcbiAgcHJldmlld3M6IFtcbiAgICB7XG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAndGhlLXNheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDI0MCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiAzMjAsXG4gICAgICB9KSxcbiAgICAgIGlzU3RpY2tlclBhY2s6IGZhbHNlLFxuICAgICAgdGl0bGU6ICdTaWduYWwnLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdTYXkgXCJoZWxsb1wiIHRvIGEgZGlmZmVyZW50IG1lc3NhZ2luZyBleHBlcmllbmNlLiBBbiB1bmV4cGVjdGVkIGZvY3VzIG9uIHByaXZhY3ksIGNvbWJpbmVkIHdpdGggYWxsIG9mIHRoZSBmZWF0dXJlcyB5b3UgZXhwZWN0LicsXG4gICAgICB1cmw6ICdodHRwczovL3d3dy5zaWduYWwub3JnJyxcbiAgICAgIGRhdGU6IG5ldyBEYXRlKDIwMjAsIDIsIDEwKS52YWx1ZU9mKCksXG4gICAgfSxcbiAgXSxcbiAgc3RhdHVzOiAnc2VudCcsXG4gIHRleHQ6ICdCZSBzdXJlIHRvIGxvb2sgYXQgaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZDogZmFsc2UsXG59O1xuTm90QXBwcm92ZWRXaXRoTGlua1ByZXZpZXcuc3RvcnkgPSB7XG4gIG5hbWU6ICdOb3QgYXBwcm92ZWQsIHdpdGggbGluayBwcmV2aWV3Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBDdXN0b21Db2xvciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDw+XG4gICAge3JlbmRlclRocmVlKHtcbiAgICAgIC4uLmNyZWF0ZVByb3BzKHsgdGV4dDogJ1NvbGlkLicgfSksXG4gICAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgICBjdXN0b21Db2xvcjoge1xuICAgICAgICBzdGFydDogeyBodWU6IDgyLCBzYXR1cmF0aW9uOiAzNSB9LFxuICAgICAgfSxcbiAgICB9KX1cbiAgICA8YnIgc3R5bGU9e3sgY2xlYXI6ICdib3RoJyB9fSAvPlxuICAgIHtyZW5kZXJUaHJlZSh7XG4gICAgICAuLi5jcmVhdGVQcm9wcyh7IHRleHQ6ICdHcmFkaWVudC4nIH0pLFxuICAgICAgZGlyZWN0aW9uOiAnb3V0Z29pbmcnLFxuICAgICAgY3VzdG9tQ29sb3I6IHtcbiAgICAgICAgZGVnOiAxOTIsXG4gICAgICAgIHN0YXJ0OiB7IGh1ZTogMzA0LCBzYXR1cmF0aW9uOiA4NSB9LFxuICAgICAgICBlbmQ6IHsgaHVlOiAyMzEsIHNhdHVyYXRpb246IDc2IH0sXG4gICAgICB9LFxuICAgIH0pfVxuICA8Lz5cbik7XG5cbmV4cG9ydCBjb25zdCBDb2xsYXBzaW5nVGV4dE9ubHlETXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB0aGVtID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuICBjb25zdCBtZSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBpc01lOiB0cnVlIH0pO1xuXG4gIHJldHVybiByZW5kZXJNYW55KFtcbiAgICBjcmVhdGVQcm9wcyh7XG4gICAgICBhdXRob3I6IHRoZW0sXG4gICAgICB0ZXh0OiAnT25lJyxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDUgKiBNSU5VVEUsXG4gICAgfSksXG4gICAgY3JlYXRlUHJvcHMoe1xuICAgICAgYXV0aG9yOiB0aGVtLFxuICAgICAgdGV4dDogJ1R3bycsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSA0ICogTUlOVVRFLFxuICAgIH0pLFxuICAgIGNyZWF0ZVByb3BzKHtcbiAgICAgIGF1dGhvcjogdGhlbSxcbiAgICAgIHRleHQ6ICdUaHJlZScsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAzICogTUlOVVRFLFxuICAgIH0pLFxuICAgIGNyZWF0ZVByb3BzKHtcbiAgICAgIGF1dGhvcjogbWUsXG4gICAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgICB0ZXh0OiAnRm91cicsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAyICogTUlOVVRFLFxuICAgIH0pLFxuICAgIGNyZWF0ZVByb3BzKHtcbiAgICAgIHRleHQ6ICdGaXZlJyxcbiAgICAgIGF1dGhvcjogbWUsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSBNSU5VVEUsXG4gICAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgfSksXG4gICAgY3JlYXRlUHJvcHMoe1xuICAgICAgYXV0aG9yOiBtZSxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgIHRleHQ6ICdTaXgnLFxuICAgIH0pLFxuICBdKTtcbn07XG5cbkNvbGxhcHNpbmdUZXh0T25seURNcy5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbGxhcHNpbmcgdGV4dC1vbmx5IERNcycsXG59O1xuXG5leHBvcnQgY29uc3QgQ29sbGFwc2luZ1RleHRPbmx5R3JvdXBNZXNzYWdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF1dGhvciA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcblxuICByZXR1cm4gcmVuZGVyTWFueShbXG4gICAgY3JlYXRlUHJvcHMoe1xuICAgICAgYXV0aG9yLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIHRleHQ6ICdPbmUnLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMiAqIE1JTlVURSxcbiAgICB9KSxcbiAgICBjcmVhdGVQcm9wcyh7XG4gICAgICBhdXRob3IsXG4gICAgICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxuICAgICAgdGV4dDogJ1R3bycsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSBNSU5VVEUsXG4gICAgfSksXG4gICAgY3JlYXRlUHJvcHMoe1xuICAgICAgYXV0aG9yLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIHRleHQ6ICdUaHJlZScsXG4gICAgfSksXG4gIF0pO1xufTtcblxuQ29sbGFwc2luZ1RleHRPbmx5R3JvdXBNZXNzYWdlcy5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbGxhcHNpbmcgdGV4dC1vbmx5IGdyb3VwIG1lc3NhZ2VzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTdG9yeVJlcGx5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gIHJldHVybiByZW5kZXJUaHJlZSh7XG4gICAgLi4uY3JlYXRlUHJvcHMoeyBkaXJlY3Rpb246ICdvdXRnb2luZycsIHRleHQ6ICdXb3chJyB9KSxcbiAgICBzdG9yeVJlcGx5Q29udGV4dDoge1xuICAgICAgYXV0aG9yVGl0bGU6IGNvbnZlcnNhdGlvbi5maXJzdE5hbWUgfHwgY29udmVyc2F0aW9uLnRpdGxlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yc1swXSxcbiAgICAgIGlzRnJvbU1lOiBmYWxzZSxcbiAgICAgIHJhd0F0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3Nub3cuanBnJyxcbiAgICAgICAgdGh1bWJuYWlsOiBmYWtlVGh1bWJuYWlsKCcvZml4dHVyZXMvc25vdy5qcGcnKSxcbiAgICAgIH0pLFxuICAgICAgdGV4dDogJ1Bob3RvJyxcbiAgICB9LFxuICB9KTtcbn07XG5cblN0b3J5UmVwbHkuc3RvcnkgPSB7XG4gIG5hbWU6ICdTdG9yeSByZXBseScsXG59O1xuXG5leHBvcnQgY29uc3QgU3RvcnlSZXBseVlvdXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gIHJldHVybiByZW5kZXJUaHJlZSh7XG4gICAgLi4uY3JlYXRlUHJvcHMoeyBkaXJlY3Rpb246ICdpbmNvbWluZycsIHRleHQ6ICdXb3chJyB9KSxcbiAgICBzdG9yeVJlcGx5Q29udGV4dDoge1xuICAgICAgYXV0aG9yVGl0bGU6IGNvbnZlcnNhdGlvbi5maXJzdE5hbWUgfHwgY29udmVyc2F0aW9uLnRpdGxlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yc1swXSxcbiAgICAgIGlzRnJvbU1lOiB0cnVlLFxuICAgICAgcmF3QXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICB1cmw6ICcvZml4dHVyZXMvc25vdy5qcGcnLFxuICAgICAgICB0aHVtYm5haWw6IGZha2VUaHVtYm5haWwoJy9maXh0dXJlcy9zbm93LmpwZycpLFxuICAgICAgfSksXG4gICAgICB0ZXh0OiAnUGhvdG8nLFxuICAgIH0sXG4gIH0pO1xufTtcblxuU3RvcnlSZXBseVlvdXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnU3RvcnkgcmVwbHkgKHlvdXJzKScsXG59O1xuXG5leHBvcnQgY29uc3QgU3RvcnlSZXBseUVtb2ppID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gIHJldHVybiByZW5kZXJUaHJlZSh7XG4gICAgLi4uY3JlYXRlUHJvcHMoeyBkaXJlY3Rpb246ICdvdXRnb2luZycsIHRleHQ6ICdXb3chJyB9KSxcbiAgICBzdG9yeVJlcGx5Q29udGV4dDoge1xuICAgICAgYXV0aG9yVGl0bGU6IGNvbnZlcnNhdGlvbi5maXJzdE5hbWUgfHwgY29udmVyc2F0aW9uLnRpdGxlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yc1swXSxcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzg0JyxcbiAgICAgIGlzRnJvbU1lOiBmYWxzZSxcbiAgICAgIHJhd0F0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3Nub3cuanBnJyxcbiAgICAgICAgdGh1bWJuYWlsOiBmYWtlVGh1bWJuYWlsKCcvZml4dHVyZXMvc25vdy5qcGcnKSxcbiAgICAgIH0pLFxuICAgICAgdGV4dDogJ1Bob3RvJyxcbiAgICB9LFxuICB9KTtcbn07XG5cblN0b3J5UmVwbHlFbW9qaS5zdG9yeSA9IHtcbiAgbmFtZTogJ1N0b3J5IHJlcGx5IChlbW9qaSknLFxufTtcblxuY29uc3QgZnVsbENvbnRhY3QgPSB7XG4gIGF2YXRhcjoge1xuICAgIGF2YXRhcjogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgcGF0aDogJy9maXh0dXJlcy9naXBoeS1HVk52T1VwZVltSTdlLmdpZicsXG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfR0lGLFxuICAgIH0pLFxuICAgIGlzUHJvZmlsZTogdHJ1ZSxcbiAgfSxcbiAgZW1haWw6IFtcbiAgICB7XG4gICAgICB2YWx1ZTogJ2plcmpvckBmYWtlbWFpbC5jb20nLFxuICAgICAgdHlwZTogQ29udGFjdEZvcm1UeXBlLkhPTUUsXG4gICAgfSxcbiAgXSxcbiAgbmFtZToge1xuICAgIGdpdmVuTmFtZTogJ0plcnJ5JyxcbiAgICBmYW1pbHlOYW1lOiAnSm9yZGFuJyxcbiAgICBwcmVmaXg6ICdEci4nLFxuICAgIHN1ZmZpeDogJ0pyLicsXG4gICAgbWlkZGxlTmFtZTogJ0phbWVzJyxcbiAgICBkaXNwbGF5TmFtZTogJ0plcnJ5IEpvcmRhbicsXG4gIH0sXG4gIG51bWJlcjogW1xuICAgIHtcbiAgICAgIHZhbHVlOiAnNTU1LTQ0NC0yMzIzJyxcbiAgICAgIHR5cGU6IENvbnRhY3RGb3JtVHlwZS5IT01FLFxuICAgIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgRW1iZWRkZWRDb250YWN0RnVsbENvbnRhY3QgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkVtYmVkZGVkQ29udGFjdEZ1bGxDb250YWN0LmFyZ3MgPSB7XG4gIGNvbnRhY3Q6IGZ1bGxDb250YWN0LFxufTtcbkVtYmVkZGVkQ29udGFjdEZ1bGxDb250YWN0LnN0b3J5ID0ge1xuICBuYW1lOiAnRW1iZWRkZWRDb250YWN0OiBGdWxsIENvbnRhY3QnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtYmVkZGVkQ29udGFjdFdpdGhTZW5kTWVzc2FnZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuRW1iZWRkZWRDb250YWN0V2l0aFNlbmRNZXNzYWdlLmFyZ3MgPSB7XG4gIGNvbnRhY3Q6IHtcbiAgICAuLi5mdWxsQ29udGFjdCxcbiAgICBmaXJzdE51bWJlcjogZnVsbENvbnRhY3QubnVtYmVyWzBdLnZhbHVlLFxuICAgIHV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICB9LFxuICBkaXJlY3Rpb246ICdpbmNvbWluZycsXG59O1xuRW1iZWRkZWRDb250YWN0V2l0aFNlbmRNZXNzYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnRW1iZWRkZWRDb250YWN0OiB3aXRoIFNlbmQgTWVzc2FnZScsXG59O1xuXG5leHBvcnQgY29uc3QgRW1iZWRkZWRDb250YWN0T25seUVtYWlsID0gVGVtcGxhdGUuYmluZCh7fSk7XG5FbWJlZGRlZENvbnRhY3RPbmx5RW1haWwuYXJncyA9IHtcbiAgY29udGFjdDoge1xuICAgIGVtYWlsOiBmdWxsQ29udGFjdC5lbWFpbCxcbiAgfSxcbn07XG5FbWJlZGRlZENvbnRhY3RPbmx5RW1haWwuc3RvcnkgPSB7XG4gIG5hbWU6ICdFbWJlZGRlZENvbnRhY3Q6IE9ubHkgRW1haWwnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtYmVkZGVkQ29udGFjdEdpdmVuTmFtZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuRW1iZWRkZWRDb250YWN0R2l2ZW5OYW1lLmFyZ3MgPSB7XG4gIGNvbnRhY3Q6IHtcbiAgICBuYW1lOiB7XG4gICAgICBnaXZlbk5hbWU6ICdKZXJyeScsXG4gICAgfSxcbiAgfSxcbn07XG5FbWJlZGRlZENvbnRhY3RHaXZlbk5hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdFbWJlZGRlZENvbnRhY3Q6IEdpdmVuIE5hbWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtYmVkZGVkQ29udGFjdE9yZ2FuaXphdGlvbiA9IFRlbXBsYXRlLmJpbmQoe30pO1xuRW1iZWRkZWRDb250YWN0T3JnYW5pemF0aW9uLmFyZ3MgPSB7XG4gIGNvbnRhY3Q6IHtcbiAgICBvcmdhbml6YXRpb246ICdDb21wYW55IDUnLFxuICB9LFxufTtcbkVtYmVkZGVkQ29udGFjdE9yZ2FuaXphdGlvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0VtYmVkZGVkQ29udGFjdDogT3JnYW5pemF0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFbWJlZGRlZENvbnRhY3RHaXZlbkZhbWlseU5hbWUgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkVtYmVkZGVkQ29udGFjdEdpdmVuRmFtaWx5TmFtZS5hcmdzID0ge1xuICBjb250YWN0OiB7XG4gICAgbmFtZToge1xuICAgICAgZ2l2ZW5OYW1lOiAnSmVycnknLFxuICAgICAgZmFtaWx5TmFtZTogJ0ZhbWlseU5hbWUnLFxuICAgIH0sXG4gIH0sXG59O1xuRW1iZWRkZWRDb250YWN0R2l2ZW5GYW1pbHlOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnRW1iZWRkZWRDb250YWN0OiBHaXZlbiArIEZhbWlseSBOYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFbWJlZGRlZENvbnRhY3RGYW1pbHlOYW1lID0gVGVtcGxhdGUuYmluZCh7fSk7XG5FbWJlZGRlZENvbnRhY3RGYW1pbHlOYW1lLmFyZ3MgPSB7XG4gIGNvbnRhY3Q6IHtcbiAgICBuYW1lOiB7XG4gICAgICBmYW1pbHlOYW1lOiAnRmFtaWx5TmFtZScsXG4gICAgfSxcbiAgfSxcbn07XG5FbWJlZGRlZENvbnRhY3RGYW1pbHlOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnRW1iZWRkZWRDb250YWN0OiBGYW1pbHkgTmFtZScsXG59O1xuXG5leHBvcnQgY29uc3QgRW1iZWRkZWRDb250YWN0TG9hZGluZ0F2YXRhciA9IFRlbXBsYXRlLmJpbmQoe30pO1xuRW1iZWRkZWRDb250YWN0TG9hZGluZ0F2YXRhci5hcmdzID0ge1xuICBjb250YWN0OiB7XG4gICAgbmFtZToge1xuICAgICAgZGlzcGxheU5hbWU6ICdKZXJyeSBKb3JkYW4nLFxuICAgIH0sXG4gICAgYXZhdGFyOiB7XG4gICAgICBhdmF0YXI6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0dJRixcbiAgICAgIH0pLFxuICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59O1xuRW1iZWRkZWRDb250YWN0TG9hZGluZ0F2YXRhci5zdG9yeSA9IHtcbiAgbmFtZTogJ0VtYmVkZGVkQ29udGFjdDogTG9hZGluZyBBdmF0YXInLFxufTtcblxuZXhwb3J0IGNvbnN0IEdpZnRCYWRnZVVub3BlbmVkID0gVGVtcGxhdGUuYmluZCh7fSk7XG5HaWZ0QmFkZ2VVbm9wZW5lZC5hcmdzID0ge1xuICBnaWZ0QmFkZ2U6IHtcbiAgICBpZDogJ0dJRlQnLFxuICAgIGV4cGlyYXRpb246IERhdGUubm93KCkgKyBEQVkgKiAzMCxcbiAgICBsZXZlbDogMyxcbiAgICBzdGF0ZTogR2lmdEJhZGdlU3RhdGVzLlVub3BlbmVkLFxuICB9LFxufTtcbkdpZnRCYWRnZVVub3BlbmVkLnN0b3J5ID0ge1xuICBuYW1lOiAnR2lmdCBCYWRnZTogVW5vcGVuZWQnLFxufTtcblxuY29uc3QgZ2V0UHJlZmVycmVkQmFkZ2UgPSAoKSA9PiAoe1xuICBjYXRlZ29yeTogQmFkZ2VDYXRlZ29yeS5Eb25vcixcbiAgZGVzY3JpcHRpb25UZW1wbGF0ZTogJ1RoaXMgaXMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgYmFkZ2UnLFxuICBpZDogJ0dJRlQnLFxuICBpbWFnZXM6IFtcbiAgICB7XG4gICAgICB0cmFuc3BhcmVudDoge1xuICAgICAgICBsb2NhbFBhdGg6ICcvZml4dHVyZXMvb3JhbmdlLWhlYXJ0LnN2ZycsXG4gICAgICAgIHVybDogJ2h0dHA6Ly9zb21lcGxhY2UnLFxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBuYW1lOiAnaGVhcnQnLFxufSk7XG5cbmV4cG9ydCBjb25zdCBHaWZ0QmFkZ2VSZWRlZW1lZDMwRGF5cyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuR2lmdEJhZGdlUmVkZWVtZWQzMERheXMuYXJncyA9IHtcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGdpZnRCYWRnZToge1xuICAgIGV4cGlyYXRpb246IERhdGUubm93KCkgKyBEQVkgKiAzMCArIFNFQ09ORCxcbiAgICBpZDogJ0dJRlQnLFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXRlOiBHaWZ0QmFkZ2VTdGF0ZXMuUmVkZWVtZWQsXG4gIH0sXG59O1xuR2lmdEJhZGdlUmVkZWVtZWQzMERheXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdHaWZ0IEJhZGdlOiBSZWRlZW1lZCAoMzAgZGF5cyknLFxufTtcblxuZXhwb3J0IGNvbnN0IEdpZnRCYWRnZVJlZGVlbWVkMjRIb3VycyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuR2lmdEJhZGdlUmVkZWVtZWQyNEhvdXJzLmFyZ3MgPSB7XG4gIGdldFByZWZlcnJlZEJhZGdlLFxuICBnaWZ0QmFkZ2U6IHtcbiAgICBleHBpcmF0aW9uOiBEYXRlLm5vdygpICsgREFZICsgU0VDT05ELFxuICAgIGlkOiAnR0lGVCcsXG4gICAgbGV2ZWw6IDMsXG4gICAgc3RhdGU6IEdpZnRCYWRnZVN0YXRlcy5SZWRlZW1lZCxcbiAgfSxcbn07XG5HaWZ0QmFkZ2VSZWRlZW1lZDI0SG91cnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdHaWZ0IEJhZGdlOiBSZWRlZW1lZCAoMjQgaG91cnMpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHaWZ0QmFkZ2VPcGVuZWQ2ME1pbnV0ZXMgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkdpZnRCYWRnZU9wZW5lZDYwTWludXRlcy5hcmdzID0ge1xuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgZ2lmdEJhZGdlOiB7XG4gICAgZXhwaXJhdGlvbjogRGF0ZS5ub3coKSArIEhPVVIgKyBTRUNPTkQsXG4gICAgaWQ6ICdHSUZUJyxcbiAgICBsZXZlbDogMyxcbiAgICBzdGF0ZTogR2lmdEJhZGdlU3RhdGVzLk9wZW5lZCxcbiAgfSxcbn07XG5HaWZ0QmFkZ2VPcGVuZWQ2ME1pbnV0ZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdHaWZ0IEJhZGdlOiBPcGVuZWQgKDYwIG1pbnV0ZXMpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHaWZ0QmFkZ2VSZWRlZW1lZDFNaW51dGUgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkdpZnRCYWRnZVJlZGVlbWVkMU1pbnV0ZS5hcmdzID0ge1xuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgZ2lmdEJhZGdlOiB7XG4gICAgZXhwaXJhdGlvbjogRGF0ZS5ub3coKSArIE1JTlVURSArIFNFQ09ORCxcbiAgICBpZDogJ0dJRlQnLFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXRlOiBHaWZ0QmFkZ2VTdGF0ZXMuUmVkZWVtZWQsXG4gIH0sXG59O1xuR2lmdEJhZGdlUmVkZWVtZWQxTWludXRlLnN0b3J5ID0ge1xuICBuYW1lOiAnR2lmdCBCYWRnZTogUmVkZWVtZWQgKDEgbWludXRlKScsXG59O1xuXG5leHBvcnQgY29uc3QgR2lmdEJhZGdlT3BlbmVkRXhwaXJlZCA9IFRlbXBsYXRlLmJpbmQoe30pO1xuR2lmdEJhZGdlT3BlbmVkRXhwaXJlZC5hcmdzID0ge1xuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgZ2lmdEJhZGdlOiB7XG4gICAgZXhwaXJhdGlvbjogRGF0ZS5ub3coKSxcbiAgICBpZDogJ0dJRlQnLFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXRlOiBHaWZ0QmFkZ2VTdGF0ZXMuT3BlbmVkLFxuICB9LFxufTtcbkdpZnRCYWRnZU9wZW5lZEV4cGlyZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdHaWZ0IEJhZGdlOiBPcGVuZWQgKGV4cGlyZWQpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHaWZ0QmFkZ2VNaXNzaW5nQmFkZ2UgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkdpZnRCYWRnZU1pc3NpbmdCYWRnZS5hcmdzID0ge1xuICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICBnaWZ0QmFkZ2U6IHtcbiAgICBleHBpcmF0aW9uOiBEYXRlLm5vdygpICsgTUlOVVRFICsgU0VDT05ELFxuICAgIGlkOiAnTUlTU0lORycsXG4gICAgbGV2ZWw6IDMsXG4gICAgc3RhdGU6IEdpZnRCYWRnZVN0YXRlcy5SZWRlZW1lZCxcbiAgfSxcbn07XG5HaWZ0QmFkZ2VNaXNzaW5nQmFkZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdHaWZ0IEJhZGdlOiBNaXNzaW5nIEJhZGdlJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixvQkFBMEI7QUFFMUIsMkJBQXVCO0FBQ3ZCLHlCQUE4QztBQUc5QyxzQkFBOEI7QUFDOUIsb0JBQW1DO0FBQ25DLHlCQUE0QjtBQUU1QixxQkFBd0Q7QUFDeEQsa0JBU087QUFDUCwrQkFBMkI7QUFDM0IsMEJBQTZCO0FBQzdCLGdDQUE2QjtBQUM3Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLHNCQUF1QjtBQUN2QixvQ0FBdUM7QUFDdkMsa0JBQWdDO0FBQ2hDLHVCQUEwQztBQUMxQyw2QkFBZ0M7QUFFaEMsNEJBR087QUFDUCwwQkFBNkI7QUFDN0Isa0JBQTBCO0FBQzFCLGtCQUFxQjtBQUNyQiwyQkFBOEI7QUFFOUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxlQUFlO0FBQUEsRUFDbkIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsbUJBQW1CLGlDQUFtQjtBQUFBLElBQ3RDLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLFFBQVEsS0FBSyxJQUFJO0FBQUEsSUFDakIsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsMkJBQTJCO0FBQUEsSUFDM0IsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLEVBQ2Y7QUFDRjtBQUVBLElBQU8sMEJBQVE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFVBQVU7QUFBQSxJQUNSLGtCQUFrQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxNQUNULGNBQWM7QUFBQSxNQUNkLFNBQVMsQ0FBQyxVQUFVLE9BQU87QUFBQSxJQUM3QjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsU0FBUztBQUFBLE1BQ1QsU0FBUyxPQUFPLEtBQUssWUFBWTtBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUNGO0FBRUEsTUFBTSxXQUFrQyxpQ0FBUTtBQUM5QyxTQUFPLHFCQUFxQjtBQUFBLE9BQ3ZCLFlBQVk7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLE9BQU87QUFBQSxPQUNKO0FBQUEsRUFDTCxDQUFDO0FBQ0gsR0FQd0M7QUFTeEMsMEJBQTBCO0FBQ3hCLFNBQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLE1BQU0sMERBQXVCO0FBQUEsTUFDM0IsSUFBSTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1QsQ0FBQztBQUFBLElBQ0QsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLEVBQzFCO0FBQ0Y7QUFYUyxBQWFULE1BQU0sb0JBQWdELHdCQUFDO0FBQUEsRUFDckQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BRUEsb0NBQUM7QUFBQSxFQUNDLE1BQU0sZ0NBQVUsTUFBTSx1QkFBVTtBQUFBLEVBQ2hDLFVBQVU7QUFBQSxFQUNWLGVBQWUsaUNBQU8sNEJBQTRCO0FBQUEsRUFDbEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLENBQ0YsR0Fab0Q7QUFldEQsTUFBTSx1QkFBc0QsNkJBQU0sb0NBQUMsV0FBSSxHQUFYO0FBRTVELE1BQU0sd0JBQXdELGtDQUFTO0FBQ3JFLFFBQU0sQ0FBQyxRQUFRLGFBQWEsTUFBTSxTQUcvQixDQUFDLENBQUM7QUFDTCxRQUFNLFFBQVEsTUFBTSxRQUFRLE1BQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWpELFNBQ0Usb0NBQUM7QUFBQSxPQUNLO0FBQUEsSUFDSixJQUFHO0FBQUEsSUFDSCxrQkFBaUI7QUFBQSxJQUNqQjtBQUFBLElBQ0EsY0FBYztBQUFBLElBQ2Qsa0JBQWtCLENBQUMsSUFBSSxZQUFZLFVBQVUsRUFBRSxJQUFJLFFBQVEsQ0FBQztBQUFBLElBQzVELGVBQWUsaUNBQU8sZUFBZTtBQUFBLElBQ3JDLGVBQWUsT0FBTztBQUFBLElBQ3RCLG9CQUFvQixPQUFPO0FBQUEsR0FDN0I7QUFFSixHQXBCOEQ7QUFzQjlELE1BQU0sd0JBQXdELGtDQUM1RCxvQ0FBQztBQUFBLEtBQTBCO0FBQUEsQ0FBTyxHQUQwQjtBQUk5RCxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLGFBQWEsY0FBYztBQUFBLEVBQzNCLFFBQVEsY0FBYyxVQUFVLDBEQUF1QjtBQUFBLEVBQ3ZELGVBQWUsZ0NBQVEsaUJBQWlCLEtBQUs7QUFBQSxFQUM3QyxZQUFZLGNBQWM7QUFBQSxFQUMxQixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixzQkFBc0IsY0FBYyx3QkFBd0I7QUFBQSxFQUM1RCxVQUFVLGNBQWMsWUFBWTtBQUFBLEVBQ3BDLDJCQUEyQixjQUFjLDZCQUE2QjtBQUFBLEVBQ3RFLGlCQUFpQixpQ0FBTyxpQkFBaUI7QUFBQSxFQUN6QyxzQkFBc0IsaUNBQU8sc0JBQXNCO0FBQUEsRUFDbkQscUJBQXFCLE1BQU0sVUFBdUI7QUFBQSxFQUNsRCwwQkFBMEIsNEJBQWdCO0FBQUEsRUFDMUMsbUJBQ0UsY0FBYyxxQkFDZCwrQkFBTyxxQkFBcUIsa0NBQW9CLGlDQUFtQixFQUFFO0FBQUEsRUFDdkUsbUJBQ0UsY0FBYyxxQkFDZCw2QkFBSyxxQkFBcUIsb0JBQW9CO0FBQUEsRUFDaEQsZ0JBQWdCLDZCQUFLLGtCQUFrQixjQUFjLGtCQUFrQixFQUFFO0FBQUEsRUFDekUsa0JBQWtCLGNBQWMsb0JBQW9CO0FBQUEsRUFDcEQsU0FBUyxjQUFjO0FBQUEsRUFDdkIsb0JBQW9CLGNBQWM7QUFBQSxFQUNsQyxlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQywwQkFBMEIsaUNBQU8sMEJBQTBCO0FBQUEsRUFDM0QsYUFBYSxjQUFjO0FBQUEsRUFDM0IsZUFBZSxjQUFjO0FBQUEsRUFDN0IsV0FBVyxjQUFjLGFBQWE7QUFBQSxFQUN0Qyx5QkFBeUIsaUNBQU8seUJBQXlCO0FBQUEsRUFDekQsa0NBQWtDLGlDQUFPLGtDQUFrQztBQUFBLEVBQzNFLG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFBQSxFQUMvQyxrQkFDRSwrQkFBTyxvQkFBb0IsY0FBYyxvQkFBb0IsQ0FBQyxLQUM5RDtBQUFBLEVBQ0YscUJBQ0UsK0JBQU8sdUJBQXVCLGNBQWMsdUJBQXVCLENBQUMsS0FDcEU7QUFBQSxFQUNGLG1CQUFtQixjQUFjLHFCQUFzQixPQUFNO0FBQUEsRUFDN0QsV0FBVyxjQUFjO0FBQUEsRUFDekI7QUFBQSxFQUNBLElBQUksNkJBQUssTUFBTSxjQUFjLE1BQU0sbUJBQW1CO0FBQUEsRUFDdEQsa0JBQWtCO0FBQUEsRUFDbEIsaUJBQWlCLGNBQWMsbUJBQW1CO0FBQUEsRUFDbEQsV0FBVyw2QkFBVSxjQUFjLFNBQVMsSUFDeEMsY0FBYyxZQUNkO0FBQUEsRUFDSixXQUFXLDZCQUFVLGNBQWMsU0FBUyxJQUN4QyxjQUFjLFlBQ2Q7QUFBQSxFQUNKLDBCQUEwQiw2QkFBVSxjQUFjLHdCQUF3QixJQUN0RSxjQUFjLDJCQUNkO0FBQUEsRUFDSixhQUFhLGNBQWM7QUFBQSxFQUMzQixrQkFBa0IsY0FBYztBQUFBLEVBQ2hDLG9CQUFvQixjQUFjO0FBQUEsRUFDbEMsMkJBQTJCLGlDQUFPLDJCQUEyQjtBQUFBLEVBQzdELDJCQUEyQixpQ0FBTywyQkFBMkI7QUFBQSxFQUM3RCxZQUFZLGlDQUFPLFlBQVk7QUFBQSxFQUMvQixpQkFBaUIsaUNBQU8saUJBQWlCO0FBQUEsRUFDekMsa0JBQWtCLGlDQUFPLGtCQUFrQjtBQUFBLEVBQzNDLGVBQWUsaUNBQU8sZUFBZTtBQUFBLEVBQ3JDLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLFVBQVUsY0FBYyxZQUFZLENBQUM7QUFBQSxFQUNyQyxPQUFPLGNBQWMsU0FBUztBQUFBLEVBQzlCLFdBQVcsY0FBYztBQUFBLEVBQ3pCLGdCQUFnQixpQ0FBTyxnQkFBZ0I7QUFBQSxFQUN2QyxZQUNFLGNBQWMsZUFBZSxTQUN6QixvQ0FBVyxPQUNYLGNBQWM7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxnQkFBZ0IsaUNBQU8sZ0JBQWdCO0FBQUEsRUFDdkMsV0FBVyxpQ0FBTyxXQUFXO0FBQUEsRUFDN0Isd0JBQXdCLGlDQUFPLHdCQUF3QjtBQUFBLEVBQ3ZELHVCQUF1QixpQ0FBTyx1QkFBdUI7QUFBQSxFQUNyRCxlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQyxxQkFBcUIsNkJBQVUsY0FBYyxtQkFBbUIsSUFDNUQsY0FBYyxzQkFDZDtBQUFBLEVBQ0oscUJBQXFCLDZCQUFVLGNBQWMsbUJBQW1CLElBQzVELGNBQWMsc0JBQ2Q7QUFBQSxFQUNKLG9CQUFvQiw2QkFBVSxjQUFjLGtCQUFrQixJQUMxRCxjQUFjLHFCQUNkO0FBQUEsRUFDSixtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQUEsRUFDN0Msa0JBQWtCLGlDQUFPLGtCQUFrQjtBQUFBLEVBQzNDLG1DQUFtQyxpQ0FDakMsbUNBQ0Y7QUFBQSxFQUNBLG1DQUFtQyxpQ0FDakMsbUNBQ0Y7QUFBQSxFQUNBLHlCQUF5QixpQ0FBTyx5QkFBeUI7QUFBQSxFQUN6RCxtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQUEsRUFDN0Msc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUFBLEVBQ25ELG1CQUFtQixpQ0FBTyxtQkFBbUI7QUFBQSxFQUM3QyxRQUFRLGNBQWMsVUFBVTtBQUFBLEVBQ2hDLE1BQU0sY0FBYyxRQUFRLDZCQUFLLFFBQVEsRUFBRTtBQUFBLEVBQzNDLGVBQWUsY0FBYyxpQkFBaUIsNkJBQWM7QUFBQSxFQUM1RCxnQkFBZ0IsY0FBYyxrQkFBa0I7QUFBQSxJQUM5QyxhQUFhO0FBQUEsSUFDYixNQUFNO0FBQUEsSUFDTixTQUFTLGdDQUFRLGVBQWUsS0FBSztBQUFBLEVBQ3ZDO0FBQUEsRUFDQSxPQUFPLHNCQUFVO0FBQUEsRUFDakIsV0FBVywrQkFBTyxhQUFhLGNBQWMsYUFBYSxLQUFLLElBQUksQ0FBQztBQUN0RSxJQS9Hb0I7QUFpSHBCLE1BQU0scUJBQXFCLHdCQUFDLFNBQzFCLFFBQVE7QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOO0FBQUEsRUFDQSxXQUFXLEtBQUs7QUFDbEIsR0FMeUI7QUFPM0IsTUFBTSxhQUFhLHdCQUFDLGVBQ2xCLDBEQUNHLFdBQVcsSUFBSSxDQUFDLFNBQVMsVUFDeEIsb0NBQUM7QUFBQSxFQUNDLEtBQUssUUFBUTtBQUFBLEtBQ1Q7QUFBQSxFQUNKLHFCQUFxQixRQUFRLFdBQVcsUUFBUSxFQUFFO0FBQUEsRUFDbEQsTUFBTSxtQkFBbUIsT0FBTztBQUFBLEVBQ2hDLHFCQUFxQixRQUFRLFdBQVcsUUFBUSxFQUFFO0FBQUEsQ0FDcEQsQ0FDRCxDQUNILEdBWGlCO0FBY25CLE1BQU0sY0FBYyx3QkFBQyxVQUFpQixXQUFXLENBQUMsT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUFsRDtBQUVwQixNQUFNLHVCQUF1Qix3QkFBQyxVQUM1QiwwREFDRyxZQUFZLEtBQUssR0FDakIsWUFBWTtBQUFBLEtBQ1I7QUFBQSxFQUNILFFBQVEsS0FBSyxNQUFNLFFBQVEsSUFBSSwwREFBdUIsRUFBRSxHQUFHO0FBQUEsRUFDM0QsV0FBVztBQUNiLENBQUMsQ0FDSCxHQVIyQjtBQVd0QixNQUFNLGVBQWUsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUM1QyxhQUFhLE9BQU87QUFBQSxFQUNsQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGtCQUFrQixTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQy9DLGdCQUFnQixPQUFPO0FBQUEsRUFDckIsTUFBTTtBQUFBLEVBQ04sZUFBZSw2QkFBYztBQUMvQjtBQUNBLGdCQUFnQixRQUFRO0FBQUEsRUFDdEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxnQkFBZ0IsNkJBQzNCLDBEQUNFLG9DQUFDO0FBQUEsS0FBWSxZQUFZLEVBQUUsTUFBTSxZQUFLLENBQUM7QUFBQSxDQUFHLEdBQzFDLG9DQUFDLFVBQUcsR0FDSixvQ0FBQztBQUFBLEtBQVksWUFBWSxFQUFFLE1BQU0scUJBQU8sQ0FBQztBQUFBLENBQUcsR0FDNUMsb0NBQUMsVUFBRyxHQUNKLG9DQUFDO0FBQUEsS0FBWSxZQUFZLEVBQUUsTUFBTSw4QkFBUyxDQUFDO0FBQUEsQ0FBRyxHQUM5QyxvQ0FBQyxVQUFHLEdBQ0osb0NBQUM7QUFBQSxLQUFZLFlBQVksRUFBRSxNQUFNLHVDQUFXLENBQUM7QUFBQSxDQUFHLEdBQ2hELG9DQUFDLFVBQUcsR0FDSixvQ0FBQztBQUFBLEtBQVksWUFBWSxFQUFFLE1BQU0sZ0RBQWEsQ0FBQztBQUFBLENBQUcsR0FDbEQsb0NBQUMsVUFBRyxHQUNKLG9DQUFDO0FBQUEsS0FBWSxZQUFZLEVBQUUsTUFBTSxrRUFBaUIsQ0FBQztBQUFBLENBQUcsR0FDdEQsb0NBQUMsVUFBRyxHQUNKLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsUUFBUTtBQUFBLFFBQ1IsT0FBTywwQ0FBZTtBQUFBLFVBQ3BCLGFBQWE7QUFBQSxVQUNiLFVBQVU7QUFBQSxVQUNWLFFBQVE7QUFBQSxVQUNSLEtBQUs7QUFBQSxVQUNMLE9BQU87QUFBQSxRQUNULENBQUM7QUFBQSxRQUNELGVBQWU7QUFBQSxRQUNmLE9BQU87QUFBQSxRQUNQLGFBQ0U7QUFBQSxRQUNGLEtBQUs7QUFBQSxRQUNMLE1BQU0sSUFBSSxLQUFLLE1BQU0sR0FBRyxFQUFFLEVBQUUsUUFBUTtBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FDQSxvQ0FBQyxVQUFHLEdBQ0osb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYLDBDQUFlO0FBQUEsUUFDYixLQUFLO0FBQUEsUUFDTCxVQUFVO0FBQUEsUUFDVixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FDQSxvQ0FBQyxVQUFHLEdBQ0osb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYLDBDQUFlO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixVQUFVO0FBQUEsUUFDVixLQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FDQSxvQ0FBQyxVQUFHLEdBQ0osb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYLDBDQUFlO0FBQUEsUUFDYixhQUFhLGtDQUFpQixZQUFZO0FBQUEsUUFDMUMsVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNSLENBQUM7QUFBQSxDQUNILEdBQ0Esb0NBQUMsVUFBRyxHQUNKLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDWCwwQ0FBZTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTyw4QkFBYyxrQkFBa0IsTUFBTTtBQUFBLFFBQzdDLFVBQVU7QUFBQSxRQUNWLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNO0FBQUEsRUFDUixDQUFDO0FBQUEsQ0FDSCxDQUNGLEdBOUYyQjtBQWlHdEIsTUFBTSxZQUFZLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDekMsVUFBVSxPQUFPO0FBQUEsRUFDZixRQUFRO0FBQUEsRUFDUixNQUFNO0FBQ1I7QUFFTyxNQUFNLE9BQU8sU0FBUyxLQUFLLENBQUMsQ0FBQztBQUNwQyxLQUFLLE9BQU87QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLE1BQU07QUFDUjtBQUVPLE1BQU0sVUFBVSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLFFBQVEsT0FBTztBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUNSO0FBRU8sTUFBTSxXQUFXLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDeEMsU0FBUyxPQUFPO0FBQUEsRUFDZCxrQkFBa0IsS0FBSztBQUFBLEVBQ3ZCLHFCQUFxQixLQUFLLElBQUksSUFBSSxLQUFLO0FBQUEsRUFDdkMsTUFBTTtBQUNSO0FBRU8sTUFBTSw0QkFBNEIsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN6RCwwQkFBMEIsT0FBTztBQUFBLEVBQy9CLFFBQVE7QUFBQSxFQUNSLGtCQUFrQixLQUFLO0FBQUEsRUFDdkIsTUFBTTtBQUNSO0FBQ0EsMEJBQTBCLFFBQVE7QUFBQSxFQUNoQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLFVBQVUsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN2QyxRQUFRLE9BQU87QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLGdCQUFnQjtBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUVPLE1BQU0sMEJBQTBCLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDdkQsd0JBQXdCLE9BQU87QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFDTixnQkFBZ0I7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxFQUNQO0FBQ0Y7QUFDQSx3QkFBd0IsUUFBUTtBQUFBLEVBQzlCLE1BQU07QUFDUjtBQUVPLE1BQU0sU0FBUyxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLE9BQU8sT0FBTztBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sV0FBVyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUs7QUFDcEM7QUFFTyxNQUFNLFFBQVEsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUNyQyxNQUFNLE9BQU87QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLFdBQVcsS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLEtBQUssS0FBSztBQUMvQztBQUVPLE1BQU0sd0JBQXdCLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDckQsc0JBQXNCLE9BQU87QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixXQUFXLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxLQUFLLEtBQUs7QUFBQSxFQUM3QyxXQUFXO0FBQUEsSUFDVDtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsSUFDMUI7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxNQUFNLDBEQUF1QjtBQUFBLFFBQzNCLElBQUk7QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxJQUMxQjtBQUFBLElBQ0E7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLE1BQU0sMERBQXVCO0FBQUEsUUFDM0IsSUFBSTtBQUFBLFFBQ0osYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BQ0QsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLElBQzFCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsSUFDMUI7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxNQUFNLDBEQUF1QjtBQUFBLFFBQzNCLElBQUk7QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxJQUMxQjtBQUFBLElBQ0E7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLE1BQU0sMERBQXVCO0FBQUEsUUFDM0IsSUFBSTtBQUFBLFFBQ0osYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BQ0QsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLElBQzFCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsSUFDMUI7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxzQkFBc0IsUUFBUTtBQUFBLEVBQzVCLE1BQU07QUFDUjtBQUVBLE1BQU0sZUFBZSxNQUFNLEtBQUssRUFBRSxRQUFRLEdBQUcsR0FBRyxNQUFNLGVBQWUsQ0FBQztBQUUvRCxNQUFNLHdCQUF3QixTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQ3JELHNCQUFzQixPQUFPO0FBQUEsRUFDM0IsTUFBTTtBQUFBLEVBQ04sV0FBVyxLQUFLLElBQUk7QUFBQSxFQUNwQixXQUFXO0FBQUEsSUFDVCxHQUFHO0FBQUEsSUFDSDtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSTtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSTtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSTtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxXQUFXLEtBQUssSUFBSTtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTSwwREFBdUI7QUFBQSxRQUMzQixJQUFJO0FBQUEsUUFDSixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFD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
