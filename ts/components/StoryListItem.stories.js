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
var StoryListItem_stories_exports = {};
__export(StoryListItem_stories_exports, {
  MyStory: () => MyStory,
  MyStoryMany: () => MyStoryMany,
  SomeonesStory: () => SomeonesStory,
  default: () => StoryListItem_stories_default
});
module.exports = __toCommonJS(StoryListItem_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_StoryListItem = require("./StoryListItem");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StoryListItem_stories_default = {
  title: "Components/StoryListItem"
};
function getDefaultProps() {
  return {
    i18n,
    onClick: (0, import_addon_actions.action)("onClick"),
    onGoToConversation: (0, import_addon_actions.action)("onGoToConversation"),
    onHideStory: (0, import_addon_actions.action)("onHideStory"),
    queueStoryDownload: (0, import_addon_actions.action)("queueStoryDownload"),
    story: {
      messageId: "123",
      sender: (0, import_getDefaultConversation.getDefaultConversation)(),
      timestamp: Date.now()
    }
  };
}
const MyStory = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryListItem.StoryListItem, {
  ...getDefaultProps(),
  story: {
    messageId: "123",
    sender: (0, import_getDefaultConversation.getDefaultConversation)({ isMe: true }),
    timestamp: Date.now()
  }
}), "MyStory");
const MyStoryMany = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryListItem.StoryListItem, {
  ...getDefaultProps(),
  story: {
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      thumbnail: (0, import_fakeAttachment.fakeThumbnail)("/fixtures/nathan-anderson-316188-unsplash.jpg")
    }),
    messageId: "123",
    sender: (0, import_getDefaultConversation.getDefaultConversation)({ isMe: true }),
    timestamp: Date.now()
  },
  hasMultiple: true
}), "MyStoryMany");
MyStoryMany.story = {
  name: "My Story (many)"
};
const SomeonesStory = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryListItem.StoryListItem, {
  ...getDefaultProps(),
  group: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Sports Group" }),
  story: {
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      thumbnail: (0, import_fakeAttachment.fakeThumbnail)("/fixtures/tina-rolf-269345-unsplash.jpg")
    }),
    hasReplies: true,
    isUnread: true,
    messageId: "123",
    sender: (0, import_getDefaultConversation.getDefaultConversation)(),
    timestamp: Date.now()
  }
}), "SomeonesStory");
SomeonesStory.story = {
  name: "Someone's story"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MyStory,
  MyStoryMany,
  SomeonesStory
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlMaXN0SXRlbS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1N0b3J5TGlzdEl0ZW0nO1xuaW1wb3J0IHsgU3RvcnlMaXN0SXRlbSB9IGZyb20gJy4vU3RvcnlMaXN0SXRlbSc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7XG4gIGZha2VBdHRhY2htZW50LFxuICBmYWtlVGh1bWJuYWlsLFxufSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1N0b3J5TGlzdEl0ZW0nLFxufTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCk6IFByb3BzVHlwZSB7XG4gIHJldHVybiB7XG4gICAgaTE4bixcbiAgICBvbkNsaWNrOiBhY3Rpb24oJ29uQ2xpY2snKSxcbiAgICBvbkdvVG9Db252ZXJzYXRpb246IGFjdGlvbignb25Hb1RvQ29udmVyc2F0aW9uJyksXG4gICAgb25IaWRlU3Rvcnk6IGFjdGlvbignb25IaWRlU3RvcnknKSxcbiAgICBxdWV1ZVN0b3J5RG93bmxvYWQ6IGFjdGlvbigncXVldWVTdG9yeURvd25sb2FkJyksXG4gICAgc3Rvcnk6IHtcbiAgICAgIG1lc3NhZ2VJZDogJzEyMycsXG4gICAgICBzZW5kZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgTXlTdG9yeSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeUxpc3RJdGVtXG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIHN0b3J5PXt7XG4gICAgICBtZXNzYWdlSWQ6ICcxMjMnLFxuICAgICAgc2VuZGVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgaXNNZTogdHJ1ZSB9KSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9fVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IE15U3RvcnlNYW55ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFN0b3J5TGlzdEl0ZW1cbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgc3Rvcnk9e3tcbiAgICAgIGF0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgdGh1bWJuYWlsOiBmYWtlVGh1bWJuYWlsKFxuICAgICAgICAgICcvZml4dHVyZXMvbmF0aGFuLWFuZGVyc29uLTMxNjE4OC11bnNwbGFzaC5qcGcnXG4gICAgICAgICksXG4gICAgICB9KSxcbiAgICAgIG1lc3NhZ2VJZDogJzEyMycsXG4gICAgICBzZW5kZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBpc01lOiB0cnVlIH0pLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH19XG4gICAgaGFzTXVsdGlwbGVcbiAgLz5cbik7XG5cbk15U3RvcnlNYW55LnN0b3J5ID0ge1xuICBuYW1lOiAnTXkgU3RvcnkgKG1hbnkpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTb21lb25lc1N0b3J5ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFN0b3J5TGlzdEl0ZW1cbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgZ3JvdXA9e2dldERlZmF1bHRDb252ZXJzYXRpb24oeyB0aXRsZTogJ1Nwb3J0cyBHcm91cCcgfSl9XG4gICAgc3Rvcnk9e3tcbiAgICAgIGF0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgdGh1bWJuYWlsOiBmYWtlVGh1bWJuYWlsKCcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnKSxcbiAgICAgIH0pLFxuICAgICAgaGFzUmVwbGllczogdHJ1ZSxcbiAgICAgIGlzVW5yZWFkOiB0cnVlLFxuICAgICAgbWVzc2FnZUlkOiAnMTIzJyxcbiAgICAgIHNlbmRlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH19XG4gIC8+XG4pO1xuXG5Tb21lb25lc1N0b3J5LnN0b3J5ID0ge1xuICBuYW1lOiBcIlNvbWVvbmUncyBzdG9yeVwiLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsMkJBQXVCO0FBR3ZCLDJCQUE4QjtBQUM5QixzQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLG9DQUF1QztBQUN2Qyw0QkFHTztBQUVQLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sZ0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLDJCQUFzQztBQUNwQyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsb0JBQW9CLGlDQUFPLG9CQUFvQjtBQUFBLElBQy9DLGFBQWEsaUNBQU8sYUFBYTtBQUFBLElBQ2pDLG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFBQSxJQUMvQyxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsTUFDWCxRQUFRLDBEQUF1QjtBQUFBLE1BQy9CLFdBQVcsS0FBSyxJQUFJO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQ0Y7QUFiUyxBQWVGLE1BQU0sVUFBVSw2QkFDckIsbURBQUM7QUFBQSxLQUNLLGdCQUFnQjtBQUFBLEVBQ3BCLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLFFBQVEsMERBQXVCLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxJQUM3QyxXQUFXLEtBQUssSUFBSTtBQUFBLEVBQ3RCO0FBQUEsQ0FDRixHQVJxQjtBQVdoQixNQUFNLGNBQWMsNkJBQ3pCLG1EQUFDO0FBQUEsS0FDSyxnQkFBZ0I7QUFBQSxFQUNwQixPQUFPO0FBQUEsSUFDTCxZQUFZLDBDQUFlO0FBQUEsTUFDekIsV0FBVyx5Q0FDVCwrQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLElBQ1gsUUFBUSwwREFBdUIsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLElBQzdDLFdBQVcsS0FBSyxJQUFJO0FBQUEsRUFDdEI7QUFBQSxFQUNBLGFBQVc7QUFBQSxDQUNiLEdBZHlCO0FBaUIzQixZQUFZLFFBQVE7QUFBQSxFQUNsQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGdCQUFnQiw2QkFDM0IsbURBQUM7QUFBQSxLQUNLLGdCQUFnQjtBQUFBLEVBQ3BCLE9BQU8sMERBQXVCLEVBQUUsT0FBTyxlQUFlLENBQUM7QUFBQSxFQUN2RCxPQUFPO0FBQUEsSUFDTCxZQUFZLDBDQUFlO0FBQUEsTUFDekIsV0FBVyx5Q0FBYyx5Q0FBeUM7QUFBQSxJQUNwRSxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxRQUFRLDBEQUF1QjtBQUFBLElBQy9CLFdBQVcsS0FBSyxJQUFJO0FBQUEsRUFDdEI7QUFBQSxDQUNGLEdBZDJCO0FBaUI3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
