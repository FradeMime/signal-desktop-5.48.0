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
var StoriesPane_exports = {};
__export(StoriesPane_exports, {
  StoriesPane: () => StoriesPane
});
module.exports = __toCommonJS(StoriesPane_exports);
var import_fuse = __toESM(require("fuse.js"));
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_SearchInput = require("./SearchInput");
var import_StoryListItem = require("./StoryListItem");
var import_isNotNil = require("../util/isNotNil");
const FUSE_OPTIONS = {
  getFn: (obj, path) => {
    if (path === "searchNames") {
      return obj.stories.flatMap((story) => [
        story.sender.title,
        story.sender.name
      ]).filter(import_isNotNil.isNotNil);
    }
    return obj.group?.title ?? "";
  },
  keys: [
    {
      name: "searchNames",
      weight: 1
    },
    {
      name: "group",
      weight: 1
    }
  ],
  threshold: 0.1
};
function search(stories, searchTerm) {
  return new import_fuse.default(stories, FUSE_OPTIONS).search(searchTerm).map((result) => result.item);
}
function getNewestStory(story) {
  return story.stories[story.stories.length - 1];
}
const StoriesPane = /* @__PURE__ */ __name(({
  hiddenStories,
  i18n,
  onAddStory,
  onStoryClicked,
  queueStoryDownload,
  showConversation,
  stories,
  toggleHideStories,
  toggleStoriesView
}) => {
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [isShowingHiddenStories, setIsShowingHiddenStories] = (0, import_react.useState)(false);
  const [renderedStories, setRenderedStories] = (0, import_react.useState)(stories);
  (0, import_react.useEffect)(() => {
    if (searchTerm) {
      setRenderedStories(search(stories, searchTerm));
    } else {
      setRenderedStories(stories);
    }
  }, [searchTerm, stories]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Stories__pane__header"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("back"),
    className: "Stories__pane__header--back",
    onClick: toggleStoriesView,
    tabIndex: 0,
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Stories__pane__header--title"
  }, i18n("Stories__title")), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("Stories__add"),
    className: "Stories__pane__header--camera",
    onClick: onAddStory,
    type: "button"
  })), /* @__PURE__ */ import_react.default.createElement(import_SearchInput.SearchInput, {
    i18n,
    moduleClassName: "Stories__search",
    onChange: (event) => {
      setSearchTerm(event.target.value);
    },
    placeholder: i18n("search"),
    value: searchTerm
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("Stories__pane__list", {
      "Stories__pane__list--empty": !stories.length
    })
  }, renderedStories.map((story) => /* @__PURE__ */ import_react.default.createElement(import_StoryListItem.StoryListItem, {
    group: story.group,
    i18n,
    key: getNewestStory(story).timestamp,
    onClick: () => {
      onStoryClicked(story.conversationId);
    },
    onHideStory: toggleHideStories,
    onGoToConversation: (conversationId) => {
      showConversation({ conversationId });
      toggleStoriesView();
    },
    queueStoryDownload,
    story: getNewestStory(story)
  })), Boolean(hiddenStories.length) && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", {
    className: (0, import_classnames.default)("Stories__hidden-stories", {
      "Stories__hidden-stories--expanded": isShowingHiddenStories
    }),
    onClick: () => setIsShowingHiddenStories(!isShowingHiddenStories),
    type: "button"
  }, i18n("Stories__hidden-stories")), isShowingHiddenStories && hiddenStories.map((story) => /* @__PURE__ */ import_react.default.createElement(import_StoryListItem.StoryListItem, {
    key: getNewestStory(story).timestamp,
    i18n,
    isHidden: true,
    onClick: () => {
      onStoryClicked(story.conversationId);
    },
    onHideStory: toggleHideStories,
    onGoToConversation: (conversationId) => {
      showConversation({ conversationId });
      toggleStoriesView();
    },
    queueStoryDownload,
    story: getNewestStory(story)
  }))), !stories.length && i18n("Stories__list-empty")));
}, "StoriesPane");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoriesPane
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3Rvcmllc1BhbmUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBGdXNlIGZyb20gJ2Z1c2UuanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25TdG9yeVR5cGUsIFN0b3J5Vmlld1R5cGUgfSBmcm9tICcuL1N0b3J5TGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IFNob3dDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBTZWFyY2hJbnB1dCB9IGZyb20gJy4vU2VhcmNoSW5wdXQnO1xuaW1wb3J0IHsgU3RvcnlMaXN0SXRlbSB9IGZyb20gJy4vU3RvcnlMaXN0SXRlbSc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uL3V0aWwvaXNOb3ROaWwnO1xuXG5jb25zdCBGVVNFX09QVElPTlM6IEZ1c2UuSUZ1c2VPcHRpb25zPENvbnZlcnNhdGlvblN0b3J5VHlwZT4gPSB7XG4gIGdldEZuOiAob2JqLCBwYXRoKSA9PiB7XG4gICAgaWYgKHBhdGggPT09ICdzZWFyY2hOYW1lcycpIHtcbiAgICAgIHJldHVybiBvYmouc3Rvcmllc1xuICAgICAgICAuZmxhdE1hcCgoc3Rvcnk6IFN0b3J5Vmlld1R5cGUpID0+IFtcbiAgICAgICAgICBzdG9yeS5zZW5kZXIudGl0bGUsXG4gICAgICAgICAgc3Rvcnkuc2VuZGVyLm5hbWUsXG4gICAgICAgIF0pXG4gICAgICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmouZ3JvdXA/LnRpdGxlID8/ICcnO1xuICB9LFxuICBrZXlzOiBbXG4gICAge1xuICAgICAgbmFtZTogJ3NlYXJjaE5hbWVzJyxcbiAgICAgIHdlaWdodDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdncm91cCcsXG4gICAgICB3ZWlnaHQ6IDEsXG4gICAgfSxcbiAgXSxcbiAgdGhyZXNob2xkOiAwLjEsXG59O1xuXG5mdW5jdGlvbiBzZWFyY2goXG4gIHN0b3JpZXM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uU3RvcnlUeXBlPixcbiAgc2VhcmNoVGVybTogc3RyaW5nXG4pOiBBcnJheTxDb252ZXJzYXRpb25TdG9yeVR5cGU+IHtcbiAgcmV0dXJuIG5ldyBGdXNlPENvbnZlcnNhdGlvblN0b3J5VHlwZT4oc3RvcmllcywgRlVTRV9PUFRJT05TKVxuICAgIC5zZWFyY2goc2VhcmNoVGVybSlcbiAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuaXRlbSk7XG59XG5cbmZ1bmN0aW9uIGdldE5ld2VzdFN0b3J5KHN0b3J5OiBDb252ZXJzYXRpb25TdG9yeVR5cGUpOiBTdG9yeVZpZXdUeXBlIHtcbiAgcmV0dXJuIHN0b3J5LnN0b3JpZXNbc3Rvcnkuc3Rvcmllcy5sZW5ndGggLSAxXTtcbn1cblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBoaWRkZW5TdG9yaWVzOiBBcnJheTxDb252ZXJzYXRpb25TdG9yeVR5cGU+O1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkFkZFN0b3J5OiAoKSA9PiB1bmtub3duO1xuICBvblN0b3J5Q2xpY2tlZDogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHF1ZXVlU3RvcnlEb3dubG9hZDogKHN0b3J5SWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvd0NvbnZlcnNhdGlvbjogU2hvd0NvbnZlcnNhdGlvblR5cGU7XG4gIHN0b3JpZXM6IEFycmF5PENvbnZlcnNhdGlvblN0b3J5VHlwZT47XG4gIHRvZ2dsZUhpZGVTdG9yaWVzOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgdG9nZ2xlU3Rvcmllc1ZpZXc6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgU3Rvcmllc1BhbmUgPSAoe1xuICBoaWRkZW5TdG9yaWVzLFxuICBpMThuLFxuICBvbkFkZFN0b3J5LFxuICBvblN0b3J5Q2xpY2tlZCxcbiAgcXVldWVTdG9yeURvd25sb2FkLFxuICBzaG93Q29udmVyc2F0aW9uLFxuICBzdG9yaWVzLFxuICB0b2dnbGVIaWRlU3RvcmllcyxcbiAgdG9nZ2xlU3Rvcmllc1ZpZXcsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtzZWFyY2hUZXJtLCBzZXRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2lzU2hvd2luZ0hpZGRlblN0b3JpZXMsIHNldElzU2hvd2luZ0hpZGRlblN0b3JpZXNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVuZGVyZWRTdG9yaWVzLCBzZXRSZW5kZXJlZFN0b3JpZXNdID1cbiAgICB1c2VTdGF0ZTxBcnJheTxDb252ZXJzYXRpb25TdG9yeVR5cGU+PihzdG9yaWVzKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICBzZXRSZW5kZXJlZFN0b3JpZXMoc2VhcmNoKHN0b3JpZXMsIHNlYXJjaFRlcm0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0UmVuZGVyZWRTdG9yaWVzKHN0b3JpZXMpO1xuICAgIH1cbiAgfSwgW3NlYXJjaFRlcm0sIHN0b3JpZXNdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3JpZXNfX3BhbmVfX2hlYWRlclwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignYmFjaycpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3JpZXNfX3BhbmVfX2hlYWRlci0tYmFja1wiXG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlU3Rvcmllc1ZpZXd9XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3Rvcmllc19fcGFuZV9faGVhZGVyLS10aXRsZVwiPlxuICAgICAgICAgIHtpMThuKCdTdG9yaWVzX190aXRsZScpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ1N0b3JpZXNfX2FkZCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3JpZXNfX3BhbmVfX2hlYWRlci0tY2FtZXJhXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbkFkZFN0b3J5fVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8U2VhcmNoSW5wdXRcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiU3Rvcmllc19fc2VhcmNoXCJcbiAgICAgICAgb25DaGFuZ2U9e2V2ZW50ID0+IHtcbiAgICAgICAgICBzZXRTZWFyY2hUZXJtKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH19XG4gICAgICAgIHBsYWNlaG9sZGVyPXtpMThuKCdzZWFyY2gnKX1cbiAgICAgICAgdmFsdWU9e3NlYXJjaFRlcm19XG4gICAgICAvPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ1N0b3JpZXNfX3BhbmVfX2xpc3QnLCB7XG4gICAgICAgICAgJ1N0b3JpZXNfX3BhbmVfX2xpc3QtLWVtcHR5JzogIXN0b3JpZXMubGVuZ3RoLFxuICAgICAgICB9KX1cbiAgICAgID5cbiAgICAgICAge3JlbmRlcmVkU3Rvcmllcy5tYXAoc3RvcnkgPT4gKFxuICAgICAgICAgIDxTdG9yeUxpc3RJdGVtXG4gICAgICAgICAgICBncm91cD17c3RvcnkuZ3JvdXB9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAga2V5PXtnZXROZXdlc3RTdG9yeShzdG9yeSkudGltZXN0YW1wfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBvblN0b3J5Q2xpY2tlZChzdG9yeS5jb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25IaWRlU3Rvcnk9e3RvZ2dsZUhpZGVTdG9yaWVzfVxuICAgICAgICAgICAgb25Hb1RvQ29udmVyc2F0aW9uPXtjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICAgICAgICAgIHNob3dDb252ZXJzYXRpb24oeyBjb252ZXJzYXRpb25JZCB9KTtcbiAgICAgICAgICAgICAgdG9nZ2xlU3Rvcmllc1ZpZXcoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBxdWV1ZVN0b3J5RG93bmxvYWQ9e3F1ZXVlU3RvcnlEb3dubG9hZH1cbiAgICAgICAgICAgIHN0b3J5PXtnZXROZXdlc3RTdG9yeShzdG9yeSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICAgIHtCb29sZWFuKGhpZGRlblN0b3JpZXMubGVuZ3RoKSAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdTdG9yaWVzX19oaWRkZW4tc3RvcmllcycsIHtcbiAgICAgICAgICAgICAgICAnU3Rvcmllc19faGlkZGVuLXN0b3JpZXMtLWV4cGFuZGVkJzogaXNTaG93aW5nSGlkZGVuU3RvcmllcyxcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzU2hvd2luZ0hpZGRlblN0b3JpZXMoIWlzU2hvd2luZ0hpZGRlblN0b3JpZXMpfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2kxOG4oJ1N0b3JpZXNfX2hpZGRlbi1zdG9yaWVzJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtpc1Nob3dpbmdIaWRkZW5TdG9yaWVzICYmXG4gICAgICAgICAgICAgIGhpZGRlblN0b3JpZXMubWFwKHN0b3J5ID0+IChcbiAgICAgICAgICAgICAgICA8U3RvcnlMaXN0SXRlbVxuICAgICAgICAgICAgICAgICAga2V5PXtnZXROZXdlc3RTdG9yeShzdG9yeSkudGltZXN0YW1wfVxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIGlzSGlkZGVuXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3RvcnlDbGlja2VkKHN0b3J5LmNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkhpZGVTdG9yeT17dG9nZ2xlSGlkZVN0b3JpZXN9XG4gICAgICAgICAgICAgICAgICBvbkdvVG9Db252ZXJzYXRpb249e2NvbnZlcnNhdGlvbklkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbnZlcnNhdGlvbih7IGNvbnZlcnNhdGlvbklkIH0pO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVTdG9yaWVzVmlldygpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHF1ZXVlU3RvcnlEb3dubG9hZD17cXVldWVTdG9yeURvd25sb2FkfVxuICAgICAgICAgICAgICAgICAgc3Rvcnk9e2dldE5ld2VzdFN0b3J5KHN0b3J5KX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgICAgeyFzdG9yaWVzLmxlbmd0aCAmJiBpMThuKCdTdG9yaWVzX19saXN0LWVtcHR5Jyl9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQWlCO0FBQ2pCLG1CQUEyQztBQUMzQyx3QkFBdUI7QUFLdkIseUJBQTRCO0FBQzVCLDJCQUE4QjtBQUM5QixzQkFBeUI7QUFFekIsTUFBTSxlQUF5RDtBQUFBLEVBQzdELE9BQU8sQ0FBQyxLQUFLLFNBQVM7QUFDcEIsUUFBSSxTQUFTLGVBQWU7QUFDMUIsYUFBTyxJQUFJLFFBQ1IsUUFBUSxDQUFDLFVBQXlCO0FBQUEsUUFDakMsTUFBTSxPQUFPO0FBQUEsUUFDYixNQUFNLE9BQU87QUFBQSxNQUNmLENBQUMsRUFDQSxPQUFPLHdCQUFRO0FBQUEsSUFDcEI7QUFFQSxXQUFPLElBQUksT0FBTyxTQUFTO0FBQUEsRUFDN0I7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVztBQUNiO0FBRUEsZ0JBQ0UsU0FDQSxZQUM4QjtBQUM5QixTQUFPLElBQUksb0JBQTRCLFNBQVMsWUFBWSxFQUN6RCxPQUFPLFVBQVUsRUFDakIsSUFBSSxZQUFVLE9BQU8sSUFBSTtBQUM5QjtBQVBTLEFBU1Qsd0JBQXdCLE9BQTZDO0FBQ25FLFNBQU8sTUFBTSxRQUFRLE1BQU0sUUFBUSxTQUFTO0FBQzlDO0FBRlMsQUFnQkYsTUFBTSxjQUFjLHdCQUFDO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0s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
