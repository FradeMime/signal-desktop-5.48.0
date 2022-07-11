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
var Stories_exports = {};
__export(Stories_exports, {
  Stories: () => Stories
});
module.exports = __toCommonJS(Stories_exports);
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_StoriesPane = require("./StoriesPane");
var import_theme = require("../util/theme");
var import_leftPaneWidth = require("../util/leftPaneWidth");
var log = __toESM(require("../logging/log"));
const Stories = /* @__PURE__ */ __name(({
  hiddenStories,
  i18n,
  preferredWidthFromStorage,
  queueStoryDownload,
  renderStoryCreator,
  renderStoryViewer,
  showConversation,
  stories,
  toggleHideStories,
  toggleStoriesView
}) => {
  const [conversationIdToView, setConversationIdToView] = (0, import_react.useState)();
  const width = (0, import_leftPaneWidth.getWidthFromPreferredWidth)(preferredWidthFromStorage, {
    requiresFullWidth: true
  });
  const onNextUserStories = (0, import_react.useCallback)(() => {
    const nextUnreadIndex = stories.findIndex((conversationStory) => conversationStory.stories.some((story) => story.isUnread));
    log.info("stories.onNextUserStories", { nextUnreadIndex });
    if (nextUnreadIndex >= 0) {
      const nextStory2 = stories[nextUnreadIndex];
      setConversationIdToView(nextStory2.conversationId);
      return;
    }
    const storyIndex = stories.findIndex((x) => x.conversationId === conversationIdToView);
    log.info("stories.onNextUserStories", {
      storyIndex,
      length: stories.length
    });
    if (storyIndex >= stories.length - 1 || storyIndex === -1) {
      setConversationIdToView(void 0);
      return;
    }
    const nextStory = stories[storyIndex + 1];
    setConversationIdToView(nextStory.conversationId);
  }, [conversationIdToView, stories]);
  const onPrevUserStories = (0, import_react.useCallback)(() => {
    const storyIndex = stories.findIndex((x) => x.conversationId === conversationIdToView);
    log.info("stories.onPrevUserStories", {
      storyIndex,
      length: stories.length
    });
    if (storyIndex <= 0) {
      setConversationIdToView(conversationIdToView);
      return;
    }
    const prevStory = stories[storyIndex - 1];
    setConversationIdToView(prevStory.conversationId);
  }, [conversationIdToView, stories]);
  const [isShowingStoryCreator, setIsShowingStoryCreator] = (0, import_react.useState)(false);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("Stories", (0, import_theme.themeClassName)(import_theme.Theme.Dark))
  }, isShowingStoryCreator && renderStoryCreator({
    onClose: () => setIsShowingStoryCreator(false)
  }), conversationIdToView && renderStoryViewer({
    conversationId: conversationIdToView,
    onClose: () => setConversationIdToView(void 0),
    onNextUserStories,
    onPrevUserStories
  }), /* @__PURE__ */ import_react.default.createElement(import_focus_trap_react.default, {
    focusTrapOptions: { allowOutsideClick: true }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Stories__pane",
    style: { width }
  }, /* @__PURE__ */ import_react.default.createElement(import_StoriesPane.StoriesPane, {
    hiddenStories,
    i18n,
    onAddStory: () => setIsShowingStoryCreator(true),
    onStoryClicked: (clickedIdToView) => {
      const storyIndex = stories.findIndex((x) => x.conversationId === clickedIdToView);
      log.info("stories.onStoryClicked", {
        storyIndex,
        length: stories.length
      });
      setConversationIdToView(clickedIdToView);
    },
    queueStoryDownload,
    showConversation,
    stories,
    toggleHideStories,
    toggleStoriesView
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Stories__placeholder"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Stories__placeholder__stories"
  }), i18n("Stories__placeholder--text")));
}, "Stories");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Stories
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IEZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwLXJlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uU3RvcnlUeXBlIH0gZnJvbSAnLi9TdG9yeUxpc3RJdGVtJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgU21hcnRTdG9yeUNyZWF0b3JQcm9wc1R5cGUgfSBmcm9tICcuLi9zdGF0ZS9zbWFydC9TdG9yeUNyZWF0b3InO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgU21hcnRTdG9yeVZpZXdlclByb3BzVHlwZSB9IGZyb20gJy4uL3N0YXRlL3NtYXJ0L1N0b3J5Vmlld2VyJztcbmltcG9ydCB0eXBlIHsgU2hvd0NvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IFN0b3JpZXNQYW5lIH0gZnJvbSAnLi9TdG9yaWVzUGFuZSc7XG5pbXBvcnQgeyBUaGVtZSwgdGhlbWVDbGFzc05hbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IGdldFdpZHRoRnJvbVByZWZlcnJlZFdpZHRoIH0gZnJvbSAnLi4vdXRpbC9sZWZ0UGFuZVdpZHRoJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaGlkZGVuU3RvcmllczogQXJyYXk8Q29udmVyc2F0aW9uU3RvcnlUeXBlPjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcHJlZmVycmVkV2lkdGhGcm9tU3RvcmFnZTogbnVtYmVyO1xuICBxdWV1ZVN0b3J5RG93bmxvYWQ6IChzdG9yeUlkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHJlbmRlclN0b3J5Q3JlYXRvcjogKHByb3BzOiBTbWFydFN0b3J5Q3JlYXRvclByb3BzVHlwZSkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlclN0b3J5Vmlld2VyOiAocHJvcHM6IFNtYXJ0U3RvcnlWaWV3ZXJQcm9wc1R5cGUpID0+IEpTWC5FbGVtZW50O1xuICBzaG93Q29udmVyc2F0aW9uOiBTaG93Q29udmVyc2F0aW9uVHlwZTtcbiAgc3RvcmllczogQXJyYXk8Q29udmVyc2F0aW9uU3RvcnlUeXBlPjtcbiAgdG9nZ2xlSGlkZVN0b3JpZXM6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICB0b2dnbGVTdG9yaWVzVmlldzogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBTdG9yaWVzID0gKHtcbiAgaGlkZGVuU3RvcmllcyxcbiAgaTE4bixcbiAgcHJlZmVycmVkV2lkdGhGcm9tU3RvcmFnZSxcbiAgcXVldWVTdG9yeURvd25sb2FkLFxuICByZW5kZXJTdG9yeUNyZWF0b3IsXG4gIHJlbmRlclN0b3J5Vmlld2VyLFxuICBzaG93Q29udmVyc2F0aW9uLFxuICBzdG9yaWVzLFxuICB0b2dnbGVIaWRlU3RvcmllcyxcbiAgdG9nZ2xlU3Rvcmllc1ZpZXcsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtjb252ZXJzYXRpb25JZFRvVmlldywgc2V0Q29udmVyc2F0aW9uSWRUb1ZpZXddID0gdXNlU3RhdGU8XG4gICAgdW5kZWZpbmVkIHwgc3RyaW5nXG4gID4oKTtcblxuICBjb25zdCB3aWR0aCA9IGdldFdpZHRoRnJvbVByZWZlcnJlZFdpZHRoKHByZWZlcnJlZFdpZHRoRnJvbVN0b3JhZ2UsIHtcbiAgICByZXF1aXJlc0Z1bGxXaWR0aDogdHJ1ZSxcbiAgfSk7XG5cbiAgY29uc3Qgb25OZXh0VXNlclN0b3JpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgLy8gRmlyc3QgZmluZCB0aGUgbmV4dCB1bnJlYWQgc3RvcnkgaWYgdGhlcmUgYXJlIGFueVxuICAgIGNvbnN0IG5leHRVbnJlYWRJbmRleCA9IHN0b3JpZXMuZmluZEluZGV4KGNvbnZlcnNhdGlvblN0b3J5ID0+XG4gICAgICBjb252ZXJzYXRpb25TdG9yeS5zdG9yaWVzLnNvbWUoc3RvcnkgPT4gc3RvcnkuaXNVbnJlYWQpXG4gICAgKTtcblxuICAgIGxvZy5pbmZvKCdzdG9yaWVzLm9uTmV4dFVzZXJTdG9yaWVzJywgeyBuZXh0VW5yZWFkSW5kZXggfSk7XG5cbiAgICBpZiAobmV4dFVucmVhZEluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IG5leHRTdG9yeSA9IHN0b3JpZXNbbmV4dFVucmVhZEluZGV4XTtcbiAgICAgIHNldENvbnZlcnNhdGlvbklkVG9WaWV3KG5leHRTdG9yeS5jb252ZXJzYXRpb25JZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IHRoZW4gcGxheSB0aGUgbmV4dCBhdmFpbGFibGUgc3RvcnlcbiAgICBjb25zdCBzdG9yeUluZGV4ID0gc3Rvcmllcy5maW5kSW5kZXgoXG4gICAgICB4ID0+IHguY29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbklkVG9WaWV3XG4gICAgKTtcblxuICAgIGxvZy5pbmZvKCdzdG9yaWVzLm9uTmV4dFVzZXJTdG9yaWVzJywge1xuICAgICAgc3RvcnlJbmRleCxcbiAgICAgIGxlbmd0aDogc3Rvcmllcy5sZW5ndGgsXG4gICAgfSk7XG5cbiAgICAvLyBJZiB3ZSd2ZSByZWFjaGVkIHRoZSBlbmQsIGNsb3NlIHRoZSB2aWV3ZXJcbiAgICBpZiAoc3RvcnlJbmRleCA+PSBzdG9yaWVzLmxlbmd0aCAtIDEgfHwgc3RvcnlJbmRleCA9PT0gLTEpIHtcbiAgICAgIHNldENvbnZlcnNhdGlvbklkVG9WaWV3KHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRTdG9yeSA9IHN0b3JpZXNbc3RvcnlJbmRleCArIDFdO1xuICAgIHNldENvbnZlcnNhdGlvbklkVG9WaWV3KG5leHRTdG9yeS5jb252ZXJzYXRpb25JZCk7XG4gIH0sIFtjb252ZXJzYXRpb25JZFRvVmlldywgc3Rvcmllc10pO1xuXG4gIGNvbnN0IG9uUHJldlVzZXJTdG9yaWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHN0b3J5SW5kZXggPSBzdG9yaWVzLmZpbmRJbmRleChcbiAgICAgIHggPT4geC5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uSWRUb1ZpZXdcbiAgICApO1xuXG4gICAgbG9nLmluZm8oJ3N0b3JpZXMub25QcmV2VXNlclN0b3JpZXMnLCB7XG4gICAgICBzdG9yeUluZGV4LFxuICAgICAgbGVuZ3RoOiBzdG9yaWVzLmxlbmd0aCxcbiAgICB9KTtcblxuICAgIGlmIChzdG9yeUluZGV4IDw9IDApIHtcbiAgICAgIC8vIFJlc3RhcnQgcGxheWJhY2sgb24gdGhlIHN0b3J5IGlmIGl0J3MgdGhlIG9sZGVzdFxuICAgICAgc2V0Q29udmVyc2F0aW9uSWRUb1ZpZXcoY29udmVyc2F0aW9uSWRUb1ZpZXcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwcmV2U3RvcnkgPSBzdG9yaWVzW3N0b3J5SW5kZXggLSAxXTtcbiAgICBzZXRDb252ZXJzYXRpb25JZFRvVmlldyhwcmV2U3RvcnkuY29udmVyc2F0aW9uSWQpO1xuICB9LCBbY29udmVyc2F0aW9uSWRUb1ZpZXcsIHN0b3JpZXNdKTtcblxuICBjb25zdCBbaXNTaG93aW5nU3RvcnlDcmVhdG9yLCBzZXRJc1Nob3dpbmdTdG9yeUNyZWF0b3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ1N0b3JpZXMnLCB0aGVtZUNsYXNzTmFtZShUaGVtZS5EYXJrKSl9PlxuICAgICAge2lzU2hvd2luZ1N0b3J5Q3JlYXRvciAmJlxuICAgICAgICByZW5kZXJTdG9yeUNyZWF0b3Ioe1xuICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHNldElzU2hvd2luZ1N0b3J5Q3JlYXRvcihmYWxzZSksXG4gICAgICAgIH0pfVxuICAgICAge2NvbnZlcnNhdGlvbklkVG9WaWV3ICYmXG4gICAgICAgIHJlbmRlclN0b3J5Vmlld2VyKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uSWRUb1ZpZXcsXG4gICAgICAgICAgb25DbG9zZTogKCkgPT4gc2V0Q29udmVyc2F0aW9uSWRUb1ZpZXcodW5kZWZpbmVkKSxcbiAgICAgICAgICBvbk5leHRVc2VyU3RvcmllcyxcbiAgICAgICAgICBvblByZXZVc2VyU3RvcmllcyxcbiAgICAgICAgfSl9XG4gICAgICA8Rm9jdXNUcmFwIGZvY3VzVHJhcE9wdGlvbnM9e3sgYWxsb3dPdXRzaWRlQ2xpY2s6IHRydWUgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3Rvcmllc19fcGFuZVwiIHN0eWxlPXt7IHdpZHRoIH19PlxuICAgICAgICAgIDxTdG9yaWVzUGFuZVxuICAgICAgICAgICAgaGlkZGVuU3Rvcmllcz17aGlkZGVuU3Rvcmllc31cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkFkZFN0b3J5PXsoKSA9PiBzZXRJc1Nob3dpbmdTdG9yeUNyZWF0b3IodHJ1ZSl9XG4gICAgICAgICAgICBvblN0b3J5Q2xpY2tlZD17Y2xpY2tlZElkVG9WaWV3ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RvcnlJbmRleCA9IHN0b3JpZXMuZmluZEluZGV4KFxuICAgICAgICAgICAgICAgIHggPT4geC5jb252ZXJzYXRpb25JZCA9PT0gY2xpY2tlZElkVG9WaWV3XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKCdzdG9yaWVzLm9uU3RvcnlDbGlja2VkJywge1xuICAgICAgICAgICAgICAgIHN0b3J5SW5kZXgsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBzdG9yaWVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNldENvbnZlcnNhdGlvbklkVG9WaWV3KGNsaWNrZWRJZFRvVmlldyk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcXVldWVTdG9yeURvd25sb2FkPXtxdWV1ZVN0b3J5RG93bmxvYWR9XG4gICAgICAgICAgICBzaG93Q29udmVyc2F0aW9uPXtzaG93Q29udmVyc2F0aW9ufVxuICAgICAgICAgICAgc3Rvcmllcz17c3Rvcmllc31cbiAgICAgICAgICAgIHRvZ2dsZUhpZGVTdG9yaWVzPXt0b2dnbGVIaWRlU3Rvcmllc31cbiAgICAgICAgICAgIHRvZ2dsZVN0b3JpZXNWaWV3PXt0b2dnbGVTdG9yaWVzVmlld31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRm9jdXNUcmFwPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yaWVzX19wbGFjZWhvbGRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3JpZXNfX3BsYWNlaG9sZGVyX19zdG9yaWVzXCIgLz5cbiAgICAgICAge2kxOG4oJ1N0b3JpZXNfX3BsYWNlaG9sZGVyLS10ZXh0Jyl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsOEJBQXNCO0FBQ3RCLG1CQUE2QztBQUM3Qyx3QkFBdUI7QUFNdkIseUJBQTRCO0FBQzVCLG1CQUFzQztBQUN0QywyQkFBMkM7QUFDM0MsVUFBcUI7QUFlZCxNQUFNLFVBQVUsd0JBQUM7QUFB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
