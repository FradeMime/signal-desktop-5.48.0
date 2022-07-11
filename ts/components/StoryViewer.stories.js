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
var StoryViewer_stories_exports = {};
__export(StoryViewer_stories_exports, {
  Caption: () => Caption,
  InAGroup: () => InAGroup,
  LongCaption: () => LongCaption,
  MultiStory: () => MultiStory,
  SomeonesStory: () => SomeonesStory,
  WideStory: () => WideStory,
  default: () => StoryViewer_stories_default
});
module.exports = __toCommonJS(StoryViewer_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_StoryViewer = require("./StoryViewer");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StoryViewer_stories_default = {
  title: "Components/StoryViewer"
};
function getDefaultProps() {
  const sender = (0, import_getDefaultConversation.getDefaultConversation)();
  return {
    conversationId: sender.id,
    getPreferredBadge: () => void 0,
    group: void 0,
    hasAllStoriesMuted: false,
    i18n,
    loadStoryReplies: (0, import_addon_actions.action)("loadStoryReplies"),
    markStoryRead: (0, import_addon_actions.action)("markStoryRead"),
    onClose: (0, import_addon_actions.action)("onClose"),
    onGoToConversation: (0, import_addon_actions.action)("onGoToConversation"),
    onHideStory: (0, import_addon_actions.action)("onHideStory"),
    onNextUserStories: (0, import_addon_actions.action)("onNextUserStories"),
    onPrevUserStories: (0, import_addon_actions.action)("onPrevUserStories"),
    onReactToStory: (0, import_addon_actions.action)("onReactToStory"),
    onReplyToStory: (0, import_addon_actions.action)("onReplyToStory"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    onTextTooLong: (0, import_addon_actions.action)("onTextTooLong"),
    onUseEmoji: (0, import_addon_actions.action)("onUseEmoji"),
    preferredReactionEmoji: ["\u2764\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"],
    queueStoryDownload: (0, import_addon_actions.action)("queueStoryDownload"),
    renderEmojiPicker: () => /* @__PURE__ */ import_react.default.createElement("div", null),
    stories: [
      {
        attachment: (0, import_fakeAttachment.fakeAttachment)({
          path: "snow.jpg",
          url: "/fixtures/snow.jpg"
        }),
        canReply: true,
        messageId: "123",
        sender,
        timestamp: Date.now()
      }
    ],
    toggleHasAllStoriesMuted: (0, import_addon_actions.action)("toggleHasAllStoriesMuted")
  };
}
const SomeonesStory = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
  ...getDefaultProps()
}), "SomeonesStory");
SomeonesStory.story = {
  name: "Someone's story"
};
const WideStory = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
  ...getDefaultProps(),
  stories: [
    {
      attachment: (0, import_fakeAttachment.fakeAttachment)({
        path: "file.jpg",
        url: "/fixtures/nathan-anderson-316188-unsplash.jpg"
      }),
      canReply: true,
      messageId: "123",
      sender: (0, import_getDefaultConversation.getDefaultConversation)(),
      timestamp: Date.now()
    }
  ]
}), "WideStory");
WideStory.story = {
  name: "Wide story"
};
const InAGroup = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
  ...getDefaultProps(),
  group: (0, import_getDefaultConversation.getDefaultConversation)({
    avatarPath: "/fixtures/kitten-4-112-112.jpg",
    title: "Family Group",
    type: "group"
  })
}), "InAGroup");
InAGroup.story = {
  name: "In a group"
};
const MultiStory = /* @__PURE__ */ __name(() => {
  const sender = (0, import_getDefaultConversation.getDefaultConversation)();
  return /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
    ...getDefaultProps(),
    stories: [
      {
        attachment: (0, import_fakeAttachment.fakeAttachment)({
          path: "snow.jpg",
          url: "/fixtures/snow.jpg"
        }),
        messageId: "123",
        sender,
        timestamp: Date.now()
      },
      {
        attachment: (0, import_fakeAttachment.fakeAttachment)({
          path: "file.jpg",
          url: "/fixtures/nathan-anderson-316188-unsplash.jpg"
        }),
        canReply: true,
        messageId: "456",
        sender,
        timestamp: Date.now() - 3600
      }
    ]
  });
}, "MultiStory");
MultiStory.story = {
  name: "Multi story"
};
const Caption = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
  ...getDefaultProps(),
  group: (0, import_getDefaultConversation.getDefaultConversation)({
    avatarPath: "/fixtures/kitten-4-112-112.jpg",
    title: "Broskis",
    type: "group"
  }),
  replyState: {
    messageId: "123",
    replies: [
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)(),
        body: "Cool",
        id: "abc",
        timestamp: Date.now()
      }
    ]
  },
  stories: [
    {
      attachment: (0, import_fakeAttachment.fakeAttachment)({
        caption: "This place looks lovely",
        path: "file.jpg",
        url: "/fixtures/nathan-anderson-316188-unsplash.jpg"
      }),
      canReply: true,
      messageId: "123",
      sender: (0, import_getDefaultConversation.getDefaultConversation)(),
      timestamp: Date.now()
    }
  ]
}), "Caption");
const LongCaption = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.StoryViewer, {
  ...getDefaultProps(),
  hasAllStoriesMuted: true,
  stories: [
    {
      attachment: (0, import_fakeAttachment.fakeAttachment)({
        caption: "Snowycle, snowycle, snowycle\nI want to ride my snowycle, snowycle, snowycle\nI want to ride my snowycle\nI want to ride my snow\nI want to ride my snowycle\nI want to ride it where I like\nSnowycle, snowycle, snowycle\nI want to ride my snowycle, snowycle, snowycle\nI want to ride my snowycle\nI want to ride my snow\nI want to ride my snowycle\nI want to ride it where I like\nSnowycle, snowycle, snowycle\nI want to ride my snowycle, snowycle, snowycle\nI want to ride my snowycle\nI want to ride my snow\nI want to ride my snowycle\nI want to ride it where I like",
        path: "file.jpg",
        url: "/fixtures/snow.jpg"
      }),
      canReply: true,
      messageId: "123",
      sender: (0, import_getDefaultConversation.getDefaultConversation)(),
      timestamp: Date.now()
    }
  ]
}), "LongCaption");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Caption,
  InAGroup,
  LongCaption,
  MultiStory,
  SomeonesStory,
  WideStory
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlWaWV3ZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9TdG9yeVZpZXdlcic7XG5pbXBvcnQgeyBTdG9yeVZpZXdlciB9IGZyb20gJy4vU3RvcnlWaWV3ZXInO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBmYWtlQXR0YWNobWVudCB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU3RvcnlWaWV3ZXInLFxufTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCk6IFByb3BzVHlwZSB7XG4gIGNvbnN0IHNlbmRlciA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcblxuICByZXR1cm4ge1xuICAgIGNvbnZlcnNhdGlvbklkOiBzZW5kZXIuaWQsXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgICBncm91cDogdW5kZWZpbmVkLFxuICAgIGhhc0FsbFN0b3JpZXNNdXRlZDogZmFsc2UsXG4gICAgaTE4bixcbiAgICBsb2FkU3RvcnlSZXBsaWVzOiBhY3Rpb24oJ2xvYWRTdG9yeVJlcGxpZXMnKSxcbiAgICBtYXJrU3RvcnlSZWFkOiBhY3Rpb24oJ21hcmtTdG9yeVJlYWQnKSxcbiAgICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgICBvbkdvVG9Db252ZXJzYXRpb246IGFjdGlvbignb25Hb1RvQ29udmVyc2F0aW9uJyksXG4gICAgb25IaWRlU3Rvcnk6IGFjdGlvbignb25IaWRlU3RvcnknKSxcbiAgICBvbk5leHRVc2VyU3RvcmllczogYWN0aW9uKCdvbk5leHRVc2VyU3RvcmllcycpLFxuICAgIG9uUHJldlVzZXJTdG9yaWVzOiBhY3Rpb24oJ29uUHJldlVzZXJTdG9yaWVzJyksXG4gICAgb25SZWFjdFRvU3Rvcnk6IGFjdGlvbignb25SZWFjdFRvU3RvcnknKSxcbiAgICBvblJlcGx5VG9TdG9yeTogYWN0aW9uKCdvblJlcGx5VG9TdG9yeScpLFxuICAgIG9uU2V0U2tpblRvbmU6IGFjdGlvbignb25TZXRTa2luVG9uZScpLFxuICAgIG9uVGV4dFRvb0xvbmc6IGFjdGlvbignb25UZXh0VG9vTG9uZycpLFxuICAgIG9uVXNlRW1vamk6IGFjdGlvbignb25Vc2VFbW9qaScpLFxuICAgIHByZWZlcnJlZFJlYWN0aW9uRW1vamk6IFsnXHUyNzY0XHVGRTBGJywgJ1x1RDgzRFx1REM0RCcsICdcdUQ4M0RcdURDNEUnLCAnXHVEODNEXHVERTAyJywgJ1x1RDgzRFx1REUyRScsICdcdUQ4M0RcdURFMjInXSxcbiAgICBxdWV1ZVN0b3J5RG93bmxvYWQ6IGFjdGlvbigncXVldWVTdG9yeURvd25sb2FkJyksXG4gICAgcmVuZGVyRW1vamlQaWNrZXI6ICgpID0+IDxkaXYgLz4sXG4gICAgc3RvcmllczogW1xuICAgICAge1xuICAgICAgICBhdHRhY2htZW50OiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgcGF0aDogJ3Nub3cuanBnJyxcbiAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvc25vdy5qcGcnLFxuICAgICAgICB9KSxcbiAgICAgICAgY2FuUmVwbHk6IHRydWUsXG4gICAgICAgIG1lc3NhZ2VJZDogJzEyMycsXG4gICAgICAgIHNlbmRlcixcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHRvZ2dsZUhhc0FsbFN0b3JpZXNNdXRlZDogYWN0aW9uKCd0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWQnKSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFNvbWVvbmVzU3RvcnkgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8U3RvcnlWaWV3ZXIgey4uLmdldERlZmF1bHRQcm9wcygpfSAvPlxuKTtcblxuU29tZW9uZXNTdG9yeS5zdG9yeSA9IHtcbiAgbmFtZTogXCJTb21lb25lJ3Mgc3RvcnlcIixcbn07XG5cbmV4cG9ydCBjb25zdCBXaWRlU3RvcnkgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8U3RvcnlWaWV3ZXJcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgc3Rvcmllcz17W1xuICAgICAge1xuICAgICAgICBhdHRhY2htZW50OiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgcGF0aDogJ2ZpbGUuanBnJyxcbiAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvbmF0aGFuLWFuZGVyc29uLTMxNjE4OC11bnNwbGFzaC5qcGcnLFxuICAgICAgICB9KSxcbiAgICAgICAgY2FuUmVwbHk6IHRydWUsXG4gICAgICAgIG1lc3NhZ2VJZDogJzEyMycsXG4gICAgICAgIHNlbmRlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIF19XG4gIC8+XG4pO1xuXG5XaWRlU3Rvcnkuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaWRlIHN0b3J5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbkFHcm91cCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeVZpZXdlclxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICBncm91cD17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICBhdmF0YXJQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi00LTExMi0xMTIuanBnJyxcbiAgICAgIHRpdGxlOiAnRmFtaWx5IEdyb3VwJyxcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5JbkFHcm91cC5zdG9yeSA9IHtcbiAgbmFtZTogJ0luIGEgZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpU3RvcnkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBzZW5kZXIgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG4gIHJldHVybiAoXG4gICAgPFN0b3J5Vmlld2VyXG4gICAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgICBzdG9yaWVzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRhY2htZW50OiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgICBwYXRoOiAnc25vdy5qcGcnLFxuICAgICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3Nub3cuanBnJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICcxMjMnLFxuICAgICAgICAgIHNlbmRlcixcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRhY2htZW50OiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgICBwYXRoOiAnZmlsZS5qcGcnLFxuICAgICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL25hdGhhbi1hbmRlcnNvbi0zMTYxODgtdW5zcGxhc2guanBnJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYW5SZXBseTogdHJ1ZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICc0NTYnLFxuICAgICAgICAgIHNlbmRlcixcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAzNjAwLFxuICAgICAgICB9LFxuICAgICAgXX1cbiAgICAvPlxuICApO1xufTtcblxuTXVsdGlTdG9yeS5zdG9yeSA9IHtcbiAgbmFtZTogJ011bHRpIHN0b3J5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBDYXB0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFN0b3J5Vmlld2VyXG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIGdyb3VwPXtnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTQtMTEyLTExMi5qcGcnLFxuICAgICAgdGl0bGU6ICdCcm9za2lzJyxcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgfSl9XG4gICAgcmVwbHlTdGF0ZT17e1xuICAgICAgbWVzc2FnZUlkOiAnMTIzJyxcbiAgICAgIHJlcGxpZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBib2R5OiAnQ29vbCcsXG4gICAgICAgICAgaWQ6ICdhYmMnLFxuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfX1cbiAgICBzdG9yaWVzPXtbXG4gICAgICB7XG4gICAgICAgIGF0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICBjYXB0aW9uOiAnVGhpcyBwbGFjZSBsb29rcyBsb3ZlbHknLFxuICAgICAgICAgIHBhdGg6ICdmaWxlLmpwZycsXG4gICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL25hdGhhbi1hbmRlcnNvbi0zMTYxODgtdW5zcGxhc2guanBnJyxcbiAgICAgICAgfSksXG4gICAgICAgIGNhblJlcGx5OiB0cnVlLFxuICAgICAgICBtZXNzYWdlSWQ6ICcxMjMnLFxuICAgICAgICBzZW5kZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IExvbmdDYXB0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFN0b3J5Vmlld2VyXG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIGhhc0FsbFN0b3JpZXNNdXRlZFxuICAgIHN0b3JpZXM9e1tcbiAgICAgIHtcbiAgICAgICAgYXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgIGNhcHRpb246XG4gICAgICAgICAgICAnU25vd3ljbGUsIHNub3d5Y2xlLCBzbm93eWNsZVxcbkkgd2FudCB0byByaWRlIG15IHNub3d5Y2xlLCBzbm93eWNsZSwgc25vd3ljbGVcXG5JIHdhbnQgdG8gcmlkZSBteSBzbm93eWNsZVxcbkkgd2FudCB0byByaWRlIG15IHNub3dcXG5JIHdhbnQgdG8gcmlkZSBteSBzbm93eWNsZVxcbkkgd2FudCB0byByaWRlIGl0IHdoZXJlIEkgbGlrZVxcblNub3d5Y2xlLCBzbm93eWNsZSwgc25vd3ljbGVcXG5JIHdhbnQgdG8gcmlkZSBteSBzbm93eWNsZSwgc25vd3ljbGUsIHNub3d5Y2xlXFxuSSB3YW50IHRvIHJpZGUgbXkgc25vd3ljbGVcXG5JIHdhbnQgdG8gcmlkZSBteSBzbm93XFxuSSB3YW50IHRvIHJpZGUgbXkgc25vd3ljbGVcXG5JIHdhbnQgdG8gcmlkZSBpdCB3aGVyZSBJIGxpa2VcXG5Tbm93eWNsZSwgc25vd3ljbGUsIHNub3d5Y2xlXFxuSSB3YW50IHRvIHJpZGUgbXkgc25vd3ljbGUsIHNub3d5Y2xlLCBzbm93eWNsZVxcbkkgd2FudCB0byByaWRlIG15IHNub3d5Y2xlXFxuSSB3YW50IHRvIHJpZGUgbXkgc25vd1xcbkkgd2FudCB0byByaWRlIG15IHNub3d5Y2xlXFxuSSB3YW50IHRvIHJpZGUgaXQgd2hlcmUgSSBsaWtlJyxcbiAgICAgICAgICBwYXRoOiAnZmlsZS5qcGcnLFxuICAgICAgICAgIHVybDogJy9maXh0dXJlcy9zbm93LmpwZycsXG4gICAgICAgIH0pLFxuICAgICAgICBjYW5SZXBseTogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZUlkOiAnMTIzJyxcbiAgICAgICAgc2VuZGVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgXX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUd2Qix5QkFBNEI7QUFDNUIsc0JBQXVCO0FBQ3ZCLHVCQUEwQjtBQUMxQixvQ0FBdUM7QUFDdkMsNEJBQStCO0FBRS9CLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sOEJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLDJCQUFzQztBQUNwQyxRQUFNLFNBQVMsMERBQXVCO0FBRXRDLFNBQU87QUFBQSxJQUNMLGdCQUFnQixPQUFPO0FBQUEsSUFDdkIsbUJBQW1CLE1BQU07QUFBQSxJQUN6QixPQUFPO0FBQUEsSUFDUCxvQkFBb0I7QUFBQSxJQUNwQjtBQUFBLElBQ0Esa0JBQWtCLGlDQUFPLGtCQUFrQjtBQUFBLElBQzNDLGVBQWUsaUNBQU8sZUFBZTtBQUFBLElBQ3JDLFNBQVMsaUNBQU8sU0FBUztBQUFBLElBQ3pCLG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFBQSxJQUMvQyxhQUFhLGlDQUFPLGFBQWE7QUFBQSxJQUNqQyxtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQUEsSUFDN0MsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUFBLElBQzdDLGdCQUFnQixpQ0FBTyxnQkFBZ0I7QUFBQSxJQUN2QyxnQkFBZ0IsaUNBQU8sZ0JBQWdC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
