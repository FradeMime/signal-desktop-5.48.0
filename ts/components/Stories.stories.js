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
var Stories_stories_exports = {};
__export(Stories_stories_exports, {
  Blank: () => Blank,
  Many: () => Many,
  default: () => Stories_stories_default
});
module.exports = __toCommonJS(Stories_stories_exports);
var import_react = __toESM(require("react"));
var import_uuid = require("uuid");
var import_addon_actions = require("@storybook/addon-actions");
var import_Stories = require("./Stories");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
var durations = __toESM(require("../util/durations"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Stories_stories_default = {
  title: "Components/Stories",
  component: import_Stories.Stories
};
function createStory({
  attachment,
  group,
  timestamp
}) {
  const replies = Math.random() > 0.5;
  let hasReplies = false;
  let hasRepliesFromSelf = false;
  if (replies) {
    hasReplies = true;
    hasRepliesFromSelf = Math.random() > 0.5;
  }
  const sender = (0, import_getDefaultConversation.getDefaultConversation)();
  return {
    conversationId: sender.id,
    group,
    stories: [
      {
        attachment,
        hasReplies,
        hasRepliesFromSelf,
        isMe: false,
        isUnread: Math.random() > 0.5,
        messageId: (0, import_uuid.v4)(),
        sender,
        timestamp
      }
    ]
  };
}
function getAttachmentWithThumbnail(url) {
  return (0, import_fakeAttachment.fakeAttachment)({
    url,
    thumbnail: (0, import_fakeAttachment.fakeThumbnail)(url)
  });
}
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  hiddenStories: [],
  i18n,
  preferredWidthFromStorage: 380,
  queueStoryDownload: (0, import_addon_actions.action)("queueStoryDownload"),
  renderStoryCreator: () => /* @__PURE__ */ import_react.default.createElement("div", null),
  renderStoryViewer: () => /* @__PURE__ */ import_react.default.createElement("div", null),
  showConversation: (0, import_addon_actions.action)("showConversation"),
  stories: [
    createStory({
      attachment: getAttachmentWithThumbnail("/fixtures/tina-rolf-269345-unsplash.jpg"),
      timestamp: Date.now() - 2 * durations.MINUTE
    }),
    createStory({
      attachment: getAttachmentWithThumbnail("/fixtures/koushik-chowdavarapu-105425-unsplash.jpg"),
      timestamp: Date.now() - 5 * durations.MINUTE
    }),
    createStory({
      group: (0, import_getDefaultConversation.getDefaultConversation)({ title: "BBQ in the park" }),
      attachment: getAttachmentWithThumbnail("/fixtures/nathan-anderson-316188-unsplash.jpg"),
      timestamp: Date.now() - 65 * durations.MINUTE
    }),
    createStory({
      attachment: getAttachmentWithThumbnail("/fixtures/snow.jpg"),
      timestamp: Date.now() - 92 * durations.MINUTE
    }),
    createStory({
      attachment: getAttachmentWithThumbnail("/fixtures/kitten-1-64-64.jpg"),
      timestamp: Date.now() - 164 * durations.MINUTE
    }),
    createStory({
      group: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Breaking Signal for Science" }),
      attachment: getAttachmentWithThumbnail("/fixtures/kitten-2-64-64.jpg"),
      timestamp: Date.now() - 380 * durations.MINUTE
    }),
    createStory({
      attachment: getAttachmentWithThumbnail("/fixtures/kitten-3-64-64.jpg"),
      timestamp: Date.now() - 421 * durations.MINUTE
    })
  ],
  toggleHideStories: (0, import_addon_actions.action)("toggleHideStories"),
  toggleStoriesView: (0, import_addon_actions.action)("toggleStoriesView")
}), "getDefaultProps");
const Template = /* @__PURE__ */ __name((args) => /* @__PURE__ */ import_react.default.createElement(import_Stories.Stories, {
  ...args
}), "Template");
const Blank = Template.bind({});
Blank.args = {
  ...getDefaultProps(),
  stories: []
};
const Many = Template.bind({});
Many.args = getDefaultProps();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Blank,
  Many
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3Rvcmllcy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1ldGEsIFN0b3J5IH0gZnJvbSAnQHN0b3J5Ym9vay9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vU3Rvcmllcyc7XG5pbXBvcnQgeyBTdG9yaWVzIH0gZnJvbSAnLi9TdG9yaWVzJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHtcbiAgZmFrZUF0dGFjaG1lbnQsXG4gIGZha2VUaHVtYm5haWwsXG59IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1N0b3JpZXMnLFxuICBjb21wb25lbnQ6IFN0b3JpZXMsXG59IGFzIE1ldGE7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0b3J5KHtcbiAgYXR0YWNobWVudCxcbiAgZ3JvdXAsXG4gIHRpbWVzdGFtcCxcbn06IHtcbiAgYXR0YWNobWVudD86IEF0dGFjaG1lbnRUeXBlO1xuICBncm91cD86IFBpY2s8XG4gICAgQ29udmVyc2F0aW9uVHlwZSxcbiAgICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICAgIHwgJ2F2YXRhclBhdGgnXG4gICAgfCAnY29sb3InXG4gICAgfCAnaWQnXG4gICAgfCAnbmFtZSdcbiAgICB8ICdwcm9maWxlTmFtZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICA+O1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbn0pIHtcbiAgY29uc3QgcmVwbGllcyA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG4gIGxldCBoYXNSZXBsaWVzID0gZmFsc2U7XG4gIGxldCBoYXNSZXBsaWVzRnJvbVNlbGYgPSBmYWxzZTtcbiAgaWYgKHJlcGxpZXMpIHtcbiAgICBoYXNSZXBsaWVzID0gdHJ1ZTtcbiAgICBoYXNSZXBsaWVzRnJvbVNlbGYgPSBNYXRoLnJhbmRvbSgpID4gMC41O1xuICB9XG5cbiAgY29uc3Qgc2VuZGVyID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gIHJldHVybiB7XG4gICAgY29udmVyc2F0aW9uSWQ6IHNlbmRlci5pZCxcbiAgICBncm91cCxcbiAgICBzdG9yaWVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgIGhhc1JlcGxpZXMsXG4gICAgICAgIGhhc1JlcGxpZXNGcm9tU2VsZixcbiAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgIGlzVW5yZWFkOiBNYXRoLnJhbmRvbSgpID4gMC41LFxuICAgICAgICBtZXNzYWdlSWQ6IHV1aWQoKSxcbiAgICAgICAgc2VuZGVyLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEF0dGFjaG1lbnRXaXRoVGh1bWJuYWlsKHVybDogc3RyaW5nKTogQXR0YWNobWVudFR5cGUge1xuICByZXR1cm4gZmFrZUF0dGFjaG1lbnQoe1xuICAgIHVybCxcbiAgICB0aHVtYm5haWw6IGZha2VUaHVtYm5haWwodXJsKSxcbiAgfSk7XG59XG5cbmNvbnN0IGdldERlZmF1bHRQcm9wcyA9ICgpOiBQcm9wc1R5cGUgPT4gKHtcbiAgaGlkZGVuU3RvcmllczogW10sXG4gIGkxOG4sXG4gIHByZWZlcnJlZFdpZHRoRnJvbVN0b3JhZ2U6IDM4MCxcbiAgcXVldWVTdG9yeURvd25sb2FkOiBhY3Rpb24oJ3F1ZXVlU3RvcnlEb3dubG9hZCcpLFxuICByZW5kZXJTdG9yeUNyZWF0b3I6ICgpID0+IDxkaXYgLz4sXG4gIHJlbmRlclN0b3J5Vmlld2VyOiAoKSA9PiA8ZGl2IC8+LFxuICBzaG93Q29udmVyc2F0aW9uOiBhY3Rpb24oJ3Nob3dDb252ZXJzYXRpb24nKSxcbiAgc3RvcmllczogW1xuICAgIGNyZWF0ZVN0b3J5KHtcbiAgICAgIGF0dGFjaG1lbnQ6IGdldEF0dGFjaG1lbnRXaXRoVGh1bWJuYWlsKFxuICAgICAgICAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJ1xuICAgICAgKSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDIgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0pLFxuICAgIGNyZWF0ZVN0b3J5KHtcbiAgICAgIGF0dGFjaG1lbnQ6IGdldEF0dGFjaG1lbnRXaXRoVGh1bWJuYWlsKFxuICAgICAgICAnL2ZpeHR1cmVzL2tvdXNoaWstY2hvd2RhdmFyYXB1LTEwNTQyNS11bnNwbGFzaC5qcGcnXG4gICAgICApLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gNSAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gICAgfSksXG4gICAgY3JlYXRlU3Rvcnkoe1xuICAgICAgZ3JvdXA6IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyB0aXRsZTogJ0JCUSBpbiB0aGUgcGFyaycgfSksXG4gICAgICBhdHRhY2htZW50OiBnZXRBdHRhY2htZW50V2l0aFRodW1ibmFpbChcbiAgICAgICAgJy9maXh0dXJlcy9uYXRoYW4tYW5kZXJzb24tMzE2MTg4LXVuc3BsYXNoLmpwZydcbiAgICAgICksXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSA2NSAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gICAgfSksXG4gICAgY3JlYXRlU3Rvcnkoe1xuICAgICAgYXR0YWNobWVudDogZ2V0QXR0YWNobWVudFdpdGhUaHVtYm5haWwoJy9maXh0dXJlcy9zbm93LmpwZycpLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gOTIgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0pLFxuICAgIGNyZWF0ZVN0b3J5KHtcbiAgICAgIGF0dGFjaG1lbnQ6IGdldEF0dGFjaG1lbnRXaXRoVGh1bWJuYWlsKCcvZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyksXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAxNjQgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0pLFxuICAgIGNyZWF0ZVN0b3J5KHtcbiAgICAgIGdyb3VwOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgdGl0bGU6ICdCcmVha2luZyBTaWduYWwgZm9yIFNjaWVuY2UnIH0pLFxuICAgICAgYXR0YWNobWVudDogZ2V0QXR0YWNobWVudFdpdGhUaHVtYm5haWwoJy9maXh0dXJlcy9raXR0ZW4tMi02NC02NC5qcGcnKSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDM4MCAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gICAgfSksXG4gICAgY3JlYXRlU3Rvcnkoe1xuICAgICAgYXR0YWNobWVudDogZ2V0QXR0YWNobWVudFdpdGhUaHVtYm5haWwoJy9maXh0dXJlcy9raXR0ZW4tMy02NC02NC5qcGcnKSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDQyMSAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gICAgfSksXG4gIF0sXG4gIHRvZ2dsZUhpZGVTdG9yaWVzOiBhY3Rpb24oJ3RvZ2dsZUhpZGVTdG9yaWVzJyksXG4gIHRvZ2dsZVN0b3JpZXNWaWV3OiBhY3Rpb24oJ3RvZ2dsZVN0b3JpZXNWaWV3JyksXG59KTtcblxuY29uc3QgVGVtcGxhdGU6IFN0b3J5PFByb3BzVHlwZT4gPSBhcmdzID0+IDxTdG9yaWVzIHsuLi5hcmdzfSAvPjtcblxuZXhwb3J0IGNvbnN0IEJsYW5rID0gVGVtcGxhdGUuYmluZCh7fSk7XG5CbGFuay5hcmdzID0ge1xuICAuLi5nZXREZWZhdWx0UHJvcHMoKSxcbiAgc3RvcmllczogW10sXG59O1xuXG5leHBvcnQgY29uc3QgTWFueSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuTWFueS5hcmdzID0gZ2V0RGVmYXVsdFByb3BzKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQixrQkFBMkI7QUFDM0IsMkJBQXVCO0FBS3ZCLHFCQUF3QjtBQUN4QixzQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLG9DQUF1QztBQUN2Qyw0QkFHTztBQUNQLGdCQUEyQjtBQUUzQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDBCQUFRO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQ2I7QUFFQSxxQkFBcUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FlQztBQUNELFFBQU0sVUFBVSxLQUFLLE9BQU8sSUFBSTtBQUNoQyxNQUFJLGFBQWE7QUFDakIsTUFBSSxxQkFBcUI7QUFDekIsTUFBSSxTQUFTO0FBQ1gs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
