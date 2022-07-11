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
var ForwardMessageModal_stories_exports = {};
__export(ForwardMessageModal_stories_exports, {
  ASticker: () => ASticker,
  AnnouncementOnlyGroupsNonAdmin: () => AnnouncementOnlyGroupsNonAdmin,
  LinkPreview: () => LinkPreview,
  MediaAttachments: () => MediaAttachments,
  Modal: () => Modal,
  WithAContact: () => WithAContact,
  WithText: () => WithText,
  default: () => ForwardMessageModal_stories_default
});
module.exports = __toCommonJS(ForwardMessageModal_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_ForwardMessageModal = require("./ForwardMessageModal");
var import_MIME = require("../types/MIME");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../util/setupI18n");
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
const createAttachment = /* @__PURE__ */ __name((props = {}) => ({
  pending: false,
  path: "fileName.jpg",
  contentType: (0, import_MIME.stringToMIMEType)((0, import_addon_knobs.text)("attachment contentType", props.contentType || "")),
  fileName: (0, import_addon_knobs.text)("attachment fileName", props.fileName || ""),
  screenshotPath: props.pending === false ? props.screenshotPath : void 0,
  url: (0, import_addon_knobs.text)("attachment url", props.pending === false ? props.url || "" : ""),
  size: 3433
}), "createAttachment");
var ForwardMessageModal_stories_default = {
  title: "Components/ForwardMessageModal"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const LONG_TITLE = "This is a super-sweet site. And it's got some really amazing content in store for you if you just click that link. Can you click that link for me?";
const LONG_DESCRIPTION = "You're gonna love this description. Not only does it have a lot of characters, but it will also be truncated in the UI. How cool is that??";
const candidateConversations = Array.from(Array(100), () => (0, import_getDefaultConversation.getDefaultConversation)());
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  attachments: overrideProps.attachments,
  candidateConversations,
  doForwardMessage: (0, import_addon_actions.action)("doForwardMessage"),
  getPreferredBadge: () => void 0,
  i18n,
  hasContact: Boolean(overrideProps.hasContact),
  isSticker: Boolean(overrideProps.isSticker),
  linkPreview: overrideProps.linkPreview,
  messageBody: (0, import_addon_knobs.text)("messageBody", overrideProps.messageBody || ""),
  onClose: (0, import_addon_actions.action)("onClose"),
  onEditorStateChange: (0, import_addon_actions.action)("onEditorStateChange"),
  onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
  onTextTooLong: (0, import_addon_actions.action)("onTextTooLong"),
  onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
  recentEmojis: [],
  removeLinkPreview: (0, import_addon_actions.action)("removeLinkPreview"),
  skinTone: 0,
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext),
  regionCode: "US"
}), "useProps");
const Modal = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
    ...useProps()
  });
}, "Modal");
const WithText = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
    ...useProps({ messageBody: "sup" })
  });
}, "WithText");
WithText.story = {
  name: "with text"
};
const ASticker = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
    ...useProps({ isSticker: true })
  });
}, "ASticker");
ASticker.story = {
  name: "a sticker"
};
const WithAContact = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
    ...useProps({ hasContact: true })
  });
}, "WithAContact");
WithAContact.story = {
  name: "with a contact"
};
const LinkPreview = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
    ...useProps({
      linkPreview: {
        description: LONG_DESCRIPTION,
        date: Date.now(),
        domain: "https://www.signal.org",
        url: "signal.org",
        image: createAttachment({
          url: "/fixtures/kitten-4-112-112.jpg",
          contentType: import_MIME.IMAGE_JPEG
        }),
        isStickerPack: false,
        title: LONG_TITLE
      },
      messageBody: "signal.org"
    })
  });
}, "LinkPreview");
LinkPreview.story = {
  name: "link preview"
};
const MediaAttachments = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
    ...useProps({
      attachments: [
        createAttachment({
          pending: true
        }),
        createAttachment({
          contentType: import_MIME.IMAGE_JPEG,
          fileName: "tina-rolf-269345-unsplash.jpg",
          url: "/fixtures/tina-rolf-269345-unsplash.jpg"
        }),
        createAttachment({
          contentType: import_MIME.VIDEO_MP4,
          fileName: "pixabay-Soap-Bubble-7141.mp4",
          url: "/fixtures/pixabay-Soap-Bubble-7141.mp4",
          screenshotPath: "/fixtures/kitten-4-112-112.jpg"
        })
      ],
      messageBody: "cats"
    })
  });
}, "MediaAttachments");
MediaAttachments.story = {
  name: "media attachments"
};
const AnnouncementOnlyGroupsNonAdmin = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ForwardMessageModal.ForwardMessageModal, {
  ...useProps(),
  candidateConversations: [
    (0, import_getDefaultConversation.getDefaultConversation)({
      announcementsOnly: true,
      areWeAdmin: false
    })
  ]
}), "AnnouncementOnlyGroupsNonAdmin");
AnnouncementOnlyGroupsNonAdmin.story = {
  name: "announcement only groups non-admin"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ASticker,
  AnnouncementOnlyGroupsNonAdmin,
  LinkPreview,
  MediaAttachments,
  Modal,
  WithAContact,
  WithText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRm9yd2FyZE1lc3NhZ2VNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0ZvcndhcmRNZXNzYWdlTW9kYWwnO1xuaW1wb3J0IHsgRm9yd2FyZE1lc3NhZ2VNb2RhbCB9IGZyb20gJy4vRm9yd2FyZE1lc3NhZ2VNb2RhbCc7XG5pbXBvcnQgeyBJTUFHRV9KUEVHLCBWSURFT19NUDQsIHN0cmluZ1RvTUlNRVR5cGUgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IFN0b3J5Ym9va1RoZW1lQ29udGV4dCB9IGZyb20gJy4uLy4uLy5zdG9yeWJvb2svU3Rvcnlib29rVGhlbWVDb250ZXh0JztcblxuY29uc3QgY3JlYXRlQXR0YWNobWVudCA9IChcbiAgcHJvcHM6IFBhcnRpYWw8QXR0YWNobWVudFR5cGU+ID0ge31cbik6IEF0dGFjaG1lbnRUeXBlID0+ICh7XG4gIHBlbmRpbmc6IGZhbHNlLFxuICBwYXRoOiAnZmlsZU5hbWUuanBnJyxcbiAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoXG4gICAgdGV4dCgnYXR0YWNobWVudCBjb250ZW50VHlwZScsIHByb3BzLmNvbnRlbnRUeXBlIHx8ICcnKVxuICApLFxuICBmaWxlTmFtZTogdGV4dCgnYXR0YWNobWVudCBmaWxlTmFtZScsIHByb3BzLmZpbGVOYW1lIHx8ICcnKSxcbiAgc2NyZWVuc2hvdFBhdGg6IHByb3BzLnBlbmRpbmcgPT09IGZhbHNlID8gcHJvcHMuc2NyZWVuc2hvdFBhdGggOiB1bmRlZmluZWQsXG4gIHVybDogdGV4dCgnYXR0YWNobWVudCB1cmwnLCBwcm9wcy5wZW5kaW5nID09PSBmYWxzZSA/IHByb3BzLnVybCB8fCAnJyA6ICcnKSxcbiAgc2l6ZTogMzQzMyxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Gb3J3YXJkTWVzc2FnZU1vZGFsJyxcbn07XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IExPTkdfVElUTEUgPVxuICBcIlRoaXMgaXMgYSBzdXBlci1zd2VldCBzaXRlLiBBbmQgaXQncyBnb3Qgc29tZSByZWFsbHkgYW1hemluZyBjb250ZW50IGluIHN0b3JlIGZvciB5b3UgaWYgeW91IGp1c3QgY2xpY2sgdGhhdCBsaW5rLiBDYW4geW91IGNsaWNrIHRoYXQgbGluayBmb3IgbWU/XCI7XG5jb25zdCBMT05HX0RFU0NSSVBUSU9OID1cbiAgXCJZb3UncmUgZ29ubmEgbG92ZSB0aGlzIGRlc2NyaXB0aW9uLiBOb3Qgb25seSBkb2VzIGl0IGhhdmUgYSBsb3Qgb2YgY2hhcmFjdGVycywgYnV0IGl0IHdpbGwgYWxzbyBiZSB0cnVuY2F0ZWQgaW4gdGhlIFVJLiBIb3cgY29vbCBpcyB0aGF0Pz9cIjtcbmNvbnN0IGNhbmRpZGF0ZUNvbnZlcnNhdGlvbnMgPSBBcnJheS5mcm9tKEFycmF5KDEwMCksICgpID0+XG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oKVxuKTtcblxuY29uc3QgdXNlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXR0YWNobWVudHM6IG92ZXJyaWRlUHJvcHMuYXR0YWNobWVudHMsXG4gIGNhbmRpZGF0ZUNvbnZlcnNhdGlvbnMsXG4gIGRvRm9yd2FyZE1lc3NhZ2U6IGFjdGlvbignZG9Gb3J3YXJkTWVzc2FnZScpLFxuICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICBpMThuLFxuICBoYXNDb250YWN0OiBCb29sZWFuKG92ZXJyaWRlUHJvcHMuaGFzQ29udGFjdCksXG4gIGlzU3RpY2tlcjogQm9vbGVhbihvdmVycmlkZVByb3BzLmlzU3RpY2tlciksXG4gIGxpbmtQcmV2aWV3OiBvdmVycmlkZVByb3BzLmxpbmtQcmV2aWV3LFxuICBtZXNzYWdlQm9keTogdGV4dCgnbWVzc2FnZUJvZHknLCBvdmVycmlkZVByb3BzLm1lc3NhZ2VCb2R5IHx8ICcnKSxcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG4gIG9uRWRpdG9yU3RhdGVDaGFuZ2U6IGFjdGlvbignb25FZGl0b3JTdGF0ZUNoYW5nZScpLFxuICBvblBpY2tFbW9qaTogYWN0aW9uKCdvblBpY2tFbW9qaScpLFxuICBvblRleHRUb29Mb25nOiBhY3Rpb24oJ29uVGV4dFRvb0xvbmcnKSxcbiAgb25TZXRTa2luVG9uZTogYWN0aW9uKCdvblNldFNraW5Ub25lJyksXG4gIHJlY2VudEVtb2ppczogW10sXG4gIHJlbW92ZUxpbmtQcmV2aWV3OiBhY3Rpb24oJ3JlbW92ZUxpbmtQcmV2aWV3JyksXG4gIHNraW5Ub25lOiAwLFxuICB0aGVtZTogUmVhY3QudXNlQ29udGV4dChTdG9yeWJvb2tUaGVtZUNvbnRleHQpLFxuICByZWdpb25Db2RlOiAnVVMnLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNb2RhbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiA8Rm9yd2FyZE1lc3NhZ2VNb2RhbCB7Li4udXNlUHJvcHMoKX0gLz47XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aFRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPEZvcndhcmRNZXNzYWdlTW9kYWwgey4uLnVzZVByb3BzKHsgbWVzc2FnZUJvZHk6ICdzdXAnIH0pfSAvPjtcbn07XG5cbldpdGhUZXh0LnN0b3J5ID0ge1xuICBuYW1lOiAnd2l0aCB0ZXh0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBBU3RpY2tlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiA8Rm9yd2FyZE1lc3NhZ2VNb2RhbCB7Li4udXNlUHJvcHMoeyBpc1N0aWNrZXI6IHRydWUgfSl9IC8+O1xufTtcblxuQVN0aWNrZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdhIHN0aWNrZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhBQ29udGFjdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiA8Rm9yd2FyZE1lc3NhZ2VNb2RhbCB7Li4udXNlUHJvcHMoeyBoYXNDb250YWN0OiB0cnVlIH0pfSAvPjtcbn07XG5cbldpdGhBQ29udGFjdC5zdG9yeSA9IHtcbiAgbmFtZTogJ3dpdGggYSBjb250YWN0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlldyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEZvcndhcmRNZXNzYWdlTW9kYWxcbiAgICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICAgIGxpbmtQcmV2aWV3OiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IExPTkdfREVTQ1JJUFRJT04sXG4gICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICBkb21haW46ICdodHRwczovL3d3dy5zaWduYWwub3JnJyxcbiAgICAgICAgICB1cmw6ICdzaWduYWwub3JnJyxcbiAgICAgICAgICBpbWFnZTogY3JlYXRlQXR0YWNobWVudCh7XG4gICAgICAgICAgICB1cmw6ICcvZml4dHVyZXMva2l0dGVuLTQtMTEyLTExMi5qcGcnLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaXNTdGlja2VyUGFjazogZmFsc2UsXG4gICAgICAgICAgdGl0bGU6IExPTkdfVElUTEUsXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VCb2R5OiAnc2lnbmFsLm9yZycsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuTGlua1ByZXZpZXcuc3RvcnkgPSB7XG4gIG5hbWU6ICdsaW5rIHByZXZpZXcnLFxufTtcblxuZXhwb3J0IGNvbnN0IE1lZGlhQXR0YWNobWVudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxGb3J3YXJkTWVzc2FnZU1vZGFsXG4gICAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIGNyZWF0ZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjcmVhdGVBdHRhY2htZW50KHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNyZWF0ZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgICAgICAgIGZpbGVOYW1lOiAncGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvcGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICAgICAgICBzY3JlZW5zaG90UGF0aDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VCb2R5OiAnY2F0cycsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuTWVkaWFBdHRhY2htZW50cy5zdG9yeSA9IHtcbiAgbmFtZTogJ21lZGlhIGF0dGFjaG1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBbm5vdW5jZW1lbnRPbmx5R3JvdXBzTm9uQWRtaW4gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Rm9yd2FyZE1lc3NhZ2VNb2RhbFxuICAgIHsuLi51c2VQcm9wcygpfVxuICAgIGNhbmRpZGF0ZUNvbnZlcnNhdGlvbnM9e1tcbiAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBhbm5vdW5jZW1lbnRzT25seTogdHJ1ZSxcbiAgICAgICAgYXJlV2VBZG1pbjogZmFsc2UsXG4gICAgICB9KSxcbiAgICBdfVxuICAvPlxuKTtcblxuQW5ub3VuY2VtZW50T25seUdyb3Vwc05vbkFkbWluLnN0b3J5ID0ge1xuICBuYW1lOiAnYW5ub3VuY2VtZW50IG9ubHkgZ3JvdXBzIG5vbi1hZG1pbicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsMkJBQXVCO0FBQ3ZCLHlCQUFxQjtBQUVyQixzQkFBdUI7QUFHdkIsaUNBQW9DO0FBQ3BDLGtCQUF3RDtBQUN4RCxvQ0FBdUM7QUFDdkMsdUJBQTBCO0FBQzFCLG1DQUFzQztBQUV0QyxNQUFNLG1CQUFtQix3QkFDdkIsUUFBaUMsQ0FBQyxNQUNkO0FBQUEsRUFDcEIsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sYUFBYSxrQ0FDWCw2QkFBSywwQkFBMEIsTUFBTSxlQUFlLEVBQUUsQ0FDeEQ7QUFBQSxFQUNBLFVBQVUsNkJBQUssdUJBQXVCLE1BQU0sWUFBWSxFQUFFO0FBQUEsRUFDMUQsZ0JBQWdCLE1BQU0sWUFBWSxRQUFRLE1BQU0saUJBQWlCO0FBQUEsRUFDakUsS0FBSyw2QkFBSyxrQkFBa0IsTUFBTSxZQUFZLFFBQVEsTUFBTSxPQUFPLEtBQUssRUFBRTtBQUFBLEVBQzFFLE1BQU07QUFDUixJQVp5QjtBQWN6QixJQUFPLHNDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGFBQ0o7QUFDRixNQUFNLG1CQUNKO0FBQ0YsTUFBTSx5QkFBeUIsTUFBTSxLQUFLLE1BQU0sR0FBRyxHQUFHLE1BQ3BELDBEQUF1QixDQUN6QjtBQUVBLE1BQU0sV0FBVyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQ3ZFLGFBQWEsY0FBYztBQUFBLEVBQzNCO0FBQUEsRUFDQSxrQkFBa0IsaUNBQU8sa0JBQWtCO0FBQUEsRUFDM0MsbUJBQW1CLE1BQU07QUFBQSxFQUN6QjtBQUFBLEVBQ0EsWUFBWSxRQUFRLGNBQWMsVUFBVTtBQUFBLEVBQzVDLFdBQVcsUUFBUSxjQUFjLFNBQVM7QUFBQSxFQUMxQyxhQUFhLGNBQWM7QUFBQSxFQUMzQixhQUFhLDZCQUFLLGVBQWUsY0FBYyxlQUFlLEVBQUU7QUFBQSxFQUNoRSxTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixxQkFBcUIsaUNBQU8scUJBQXFCO0FBQUEsRUFDakQsYUFBYSxpQ0FBTyxhQUFhO0FBQUEsRUFDakMsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsRUFDckMsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsRUFDckMsY0FBYyxDQUFDO0FBQUEsRUFDZixtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQUEsRUFDN0MsVUFBVTtBQUFBLEVBQ1YsT0FBTyxNQUFNLFdBQVcsa0RBQXFCO0FBQUEsRUFDN0MsWUFBWTtBQUNkLElBcEJpQjtBQXNCVixNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFNBQU8sb0NBQUM7QUFBQSxPQUF3QixTQUFTO0FBQUEsR0FBRztBQUM5QyxHQUZxQjtBQUlkLE1BQU0sV0FBVyw2QkFBbUI7QUFDekMsU0FBTyxvQ0FBQztBQUFBLE9BQXdCLFNBQVMsRUFBRSxhQUFhLE1BQU0sQ0FBQztBQUFBLEdBQUc7QUFDcEUsR0FGd0I7QUFJeEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7QUFFTyxNQUFNLFdBQVcsNkJBQW1CO0FBQ3pDLFNBQU8sb0NBQUM7QUFBQSxPQUF3QixTQUFTLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxHQUFHO0FBQ2pFLEdBRndCO0FBSXhCLFNBQVMsUUFBUTtBQUFBLEVBQ2YsTUFBTTtBQUNSO0FBRU8sTUFBTSxlQUFlLDZCQUFtQjtBQUM3QyxTQUFPLG9DQUFDO0FBQUEsT0FBd0IsU0FBUyxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsR0FBRztBQUNsRSxHQUY0QjtBQUk1QixhQUFhLFFBQVE7QUFBQSxFQUNuQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGNBQWMsNkJBQW1CO0FBQzVDLFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFNBQVM7QUFBQSxNQUNYLGFBQWE7QUFBQSxRQUNYLGFBQWE7QUFBQSxRQUNiLE1BQU0sS0FBSyxJQUFJO0FBQUEsUUFDZixRQUFRO0FBQUEsUUFDUixLQUFLO0FBQUEsUUFDTCxPQUFPLGlCQUFpQjtBQUFBLFVBQ3RCLEtBQUs7QUFBQSxVQUNMLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxRQUNELGVBQWU7QUFBQSxRQUNmLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsR0FDSDtBQUVKLEdBcEIyQjtBQXNCM0IsWUFBWSxRQUFRO0FBQUEsRUFDbEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxtQkFBbUIsNkJBQW1CO0FBQ2pELFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFNBQVM7QUFBQSxNQUNYLGFBQWE7QUFBQSxRQUNYLGlCQUFpQjtBQUFBLFVBQ2YsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUFBLFFBQ0QsaUJBQWlCO0FBQUEsVUFDZixhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsVUFDVixLQUFLO0FBQUEsUUFDUCxDQUFDO0FBQUEsUUFDRCxpQkFBaUI7QUFBQSxVQUNmLGFBQWE7QUFBQSxVQUNiLFVBQVU7QUFBQSxVQUNWLEtBQUs7QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFFBQ2xCLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsR0FDSDtBQUVKLEdBeEJnQztBQTBCaEMsaUJBQWlCLFFBQVE7QUFBQSxFQUN2QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGlDQUFpQyw2QkFDNUMsb0NBQUM7QUFBQSxLQUNLLFNBQVM7QUFBQSxFQUNiLHdCQUF3QjtBQUFBLElBQ3RCLDBEQUF1QjtBQUFBLE1BQ3JCLG1CQUFtQjtBQUFBLE1BQ25CLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNIO0FBQUEsQ0FDRixHQVQ0QztBQVk5QywrQkFBK0IsUUFBUTtBQUFBLEVBQ3JDLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
