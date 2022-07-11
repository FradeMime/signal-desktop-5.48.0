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
  SmartStories: () => SmartStories
});
module.exports = __toCommonJS(Stories_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_StoryCreator = require("./StoryCreator");
var import_StoryViewer = require("./StoryViewer");
var import_Stories = require("../../components/Stories");
var import_user = require("../selectors/user");
var import_items = require("../selectors/items");
var import_stories = require("../selectors/stories");
var import_stories2 = require("../ducks/stories");
var import_conversations = require("../ducks/conversations");
function renderStoryCreator({
  onClose
}) {
  return /* @__PURE__ */ import_react.default.createElement(import_StoryCreator.SmartStoryCreator, {
    onClose
  });
}
function renderStoryViewer({
  conversationId,
  onClose,
  onNextUserStories,
  onPrevUserStories
}) {
  return /* @__PURE__ */ import_react.default.createElement(import_StoryViewer.SmartStoryViewer, {
    conversationId,
    onClose,
    onNextUserStories,
    onPrevUserStories
  });
}
function SmartStories() {
  const storiesActions = (0, import_stories2.useStoriesActions)();
  const { showConversation, toggleHideStories } = (0, import_conversations.useConversationsActions)();
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const isShowingStoriesView = (0, import_react_redux.useSelector)((state) => state.stories.isShowingStoriesView);
  const preferredWidthFromStorage = (0, import_react_redux.useSelector)(import_items.getPreferredLeftPaneWidth);
  const { hiddenStories, stories } = (0, import_react_redux.useSelector)(import_stories.getStories);
  if (!isShowingStoriesView) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement(import_Stories.Stories, {
    hiddenStories,
    i18n,
    preferredWidthFromStorage,
    renderStoryCreator,
    renderStoryViewer,
    showConversation,
    stories,
    toggleHideStories,
    ...storiesActions
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartStories
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBTbWFydFN0b3J5Q3JlYXRvclByb3BzVHlwZSB9IGZyb20gJy4vU3RvcnlDcmVhdG9yJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIGFzIFNtYXJ0U3RvcnlWaWV3ZXJQcm9wc1R5cGUgfSBmcm9tICcuL1N0b3J5Vmlld2VyJztcbmltcG9ydCB7IFNtYXJ0U3RvcnlDcmVhdG9yIH0gZnJvbSAnLi9TdG9yeUNyZWF0b3InO1xuaW1wb3J0IHsgU21hcnRTdG9yeVZpZXdlciB9IGZyb20gJy4vU3RvcnlWaWV3ZXInO1xuaW1wb3J0IHsgU3RvcmllcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU3Rvcmllcyc7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgZ2V0UHJlZmVycmVkTGVmdFBhbmVXaWR0aCB9IGZyb20gJy4uL3NlbGVjdG9ycy9pdGVtcyc7XG5pbXBvcnQgeyBnZXRTdG9yaWVzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3N0b3JpZXMnO1xuaW1wb3J0IHsgdXNlU3Rvcmllc0FjdGlvbnMgfSBmcm9tICcuLi9kdWNrcy9zdG9yaWVzJztcbmltcG9ydCB7IHVzZUNvbnZlcnNhdGlvbnNBY3Rpb25zIH0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5cbmZ1bmN0aW9uIHJlbmRlclN0b3J5Q3JlYXRvcih7XG4gIG9uQ2xvc2UsXG59OiBTbWFydFN0b3J5Q3JlYXRvclByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIDxTbWFydFN0b3J5Q3JlYXRvciBvbkNsb3NlPXtvbkNsb3NlfSAvPjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU3RvcnlWaWV3ZXIoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgb25DbG9zZSxcbiAgb25OZXh0VXNlclN0b3JpZXMsXG4gIG9uUHJldlVzZXJTdG9yaWVzLFxufTogU21hcnRTdG9yeVZpZXdlclByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIChcbiAgICA8U21hcnRTdG9yeVZpZXdlclxuICAgICAgY29udmVyc2F0aW9uSWQ9e2NvbnZlcnNhdGlvbklkfVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIG9uTmV4dFVzZXJTdG9yaWVzPXtvbk5leHRVc2VyU3Rvcmllc31cbiAgICAgIG9uUHJldlVzZXJTdG9yaWVzPXtvblByZXZVc2VyU3Rvcmllc31cbiAgICAvPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU21hcnRTdG9yaWVzKCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IHN0b3JpZXNBY3Rpb25zID0gdXNlU3Rvcmllc0FjdGlvbnMoKTtcbiAgY29uc3QgeyBzaG93Q29udmVyc2F0aW9uLCB0b2dnbGVIaWRlU3RvcmllcyB9ID0gdXNlQ29udmVyc2F0aW9uc0FjdGlvbnMoKTtcblxuICBjb25zdCBpMThuID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBMb2NhbGl6ZXJUeXBlPihnZXRJbnRsKTtcblxuICBjb25zdCBpc1Nob3dpbmdTdG9yaWVzVmlldyA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgYm9vbGVhbj4oXG4gICAgKHN0YXRlOiBTdGF0ZVR5cGUpID0+IHN0YXRlLnN0b3JpZXMuaXNTaG93aW5nU3Rvcmllc1ZpZXdcbiAgKTtcblxuICBjb25zdCBwcmVmZXJyZWRXaWR0aEZyb21TdG9yYWdlID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBudW1iZXI+KFxuICAgIGdldFByZWZlcnJlZExlZnRQYW5lV2lkdGhcbiAgKTtcblxuICBjb25zdCB7IGhpZGRlblN0b3JpZXMsIHN0b3JpZXMgfSA9IHVzZVNlbGVjdG9yKGdldFN0b3JpZXMpO1xuXG4gIGlmICghaXNTaG93aW5nU3Rvcmllc1ZpZXcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFN0b3JpZXNcbiAgICAgIGhpZGRlblN0b3JpZXM9e2hpZGRlblN0b3JpZXN9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgcHJlZmVycmVkV2lkdGhGcm9tU3RvcmFnZT17cHJlZmVycmVkV2lkdGhGcm9tU3RvcmFnZX1cbiAgICAgIHJlbmRlclN0b3J5Q3JlYXRvcj17cmVuZGVyU3RvcnlDcmVhdG9yfVxuICAgICAgcmVuZGVyU3RvcnlWaWV3ZXI9e3JlbmRlclN0b3J5Vmlld2VyfVxuICAgICAgc2hvd0NvbnZlcnNhdGlvbj17c2hvd0NvbnZlcnNhdGlvbn1cbiAgICAgIHN0b3JpZXM9e3N0b3JpZXN9XG4gICAgICB0b2dnbGVIaWRlU3Rvcmllcz17dG9nZ2xlSGlkZVN0b3JpZXN9XG4gICAgICB7Li4uc3Rvcmllc0FjdGlvbnN9XG4gICAgLz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIseUJBQTRCO0FBTTVCLDBCQUFrQztBQUNsQyx5QkFBaUM7QUFDakMscUJBQXdCO0FBQ3hCLGtCQUF3QjtBQUN4QixtQkFBMEM7QUFDMUMscUJBQTJCO0FBQzNCLHNCQUFrQztBQUNsQywyQkFBd0M7QUFFeEMsNEJBQTRCO0FBQUEsRUFDMUI7QUFBQSxHQUMwQztBQUMxQyxTQUFPLG1EQUFDO0FBQUEsSUFBa0I7QUFBQSxHQUFrQjtBQUM5QztBQUpTLEFBTVQsMkJBQTJCO0FBQUEsRUFDekI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUN5QztBQUN6QyxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEdBQ0Y7QUFFSjtBQWRTLEFBZ0JGLHdCQUE0QztBQUNqRCxRQUFNLGlCQUFpQix1Q0FBa0I7QUFDekMsUUFBTSxFQUFFLGtCQUFrQixzQkFBc0Isa0RBQXdCO0FBRXhFLFFBQU0sT0FBTyxvQ0FBc0MsbUJBQU87QUFFMUQsUUFBTSx1QkFBdUIsb0NBQzNCLENBQUMsVUFBcUIsTUFBTSxRQUFRLG9CQUN0QztBQUVBLFFBQU0sNEJBQTRCLG9DQUNoQyxzQ0FDRjtBQUVBLFFBQU0sRUFBRSxlQUFlLFlBQVksb0NBQVkseUJBQVU7QUFFekQsTUFBSSxDQUFDLHNCQUFzQjtBQUN6QixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE9BQ0k7QUFBQSxHQUNOO0FBRUo7QUFqQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
