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
var StoryViewsNRepliesModal_stories_exports = {};
__export(StoryViewsNRepliesModal_stories_exports, {
  CanReply: () => CanReply,
  InAGroup: () => InAGroup,
  InAGroupNoReplies: () => InAGroupNoReplies,
  ViewsOnly: () => ViewsOnly,
  default: () => StoryViewsNRepliesModal_stories_default
});
module.exports = __toCommonJS(StoryViewsNRepliesModal_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var durations = __toESM(require("../util/durations"));
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_MIME = require("../types/MIME");
var import_StoryViewsNRepliesModal = require("./StoryViewsNRepliesModal");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StoryViewsNRepliesModal_stories_default = {
  title: "Components/StoryViewsNRepliesModal"
};
function getDefaultProps() {
  return {
    authorTitle: (0, import_getDefaultConversation.getDefaultConversation)().title,
    getPreferredBadge: () => void 0,
    i18n,
    isMyStory: false,
    onClose: (0, import_addon_actions.action)("onClose"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    onReact: (0, import_addon_actions.action)("onReact"),
    onReply: (0, import_addon_actions.action)("onReply"),
    onTextTooLong: (0, import_addon_actions.action)("onTextTooLong"),
    onUseEmoji: (0, import_addon_actions.action)("onUseEmoji"),
    preferredReactionEmoji: ["\u2764\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"],
    renderEmojiPicker: () => /* @__PURE__ */ import_react.default.createElement("div", null),
    replies: [],
    storyPreviewAttachment: (0, import_fakeAttachment.fakeAttachment)({
      thumbnail: {
        contentType: import_MIME.IMAGE_JPEG,
        height: 64,
        objectUrl: "/fixtures/nathan-anderson-316188-unsplash.jpg",
        path: "",
        width: 40
      }
    }),
    views: []
  };
}
function getViewsAndReplies() {
  const p1 = (0, import_getDefaultConversation.getDefaultConversation)();
  const p2 = (0, import_getDefaultConversation.getDefaultConversation)();
  const p3 = (0, import_getDefaultConversation.getDefaultConversation)();
  const p4 = (0, import_getDefaultConversation.getDefaultConversation)();
  const p5 = (0, import_getDefaultConversation.getDefaultConversation)();
  const views = [
    {
      ...p1,
      timestamp: Date.now() - 20 * durations.MINUTE
    },
    {
      ...p2,
      timestamp: Date.now() - 25 * durations.MINUTE
    },
    {
      ...p3,
      timestamp: Date.now() - 15 * durations.MINUTE
    },
    {
      ...p4,
      timestamp: Date.now() - 5 * durations.MINUTE
    },
    {
      ...p5,
      timestamp: Date.now() - 30 * durations.MINUTE
    }
  ];
  const replies = [
    {
      ...p2,
      body: "So cute \u2764\uFE0F",
      timestamp: Date.now() - 24 * durations.MINUTE
    },
    {
      ...p3,
      body: "That's awesome",
      timestamp: Date.now() - 13 * durations.MINUTE
    },
    {
      ...p4,
      reactionEmoji: "\u2764\uFE0F",
      timestamp: Date.now() - 5 * durations.MINUTE
    }
  ];
  return {
    views,
    replies
  };
}
const CanReply = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewsNRepliesModal.StoryViewsNRepliesModal, {
  ...getDefaultProps()
}), "CanReply");
CanReply.story = {
  name: "Can reply"
};
const ViewsOnly = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewsNRepliesModal.StoryViewsNRepliesModal, {
  ...getDefaultProps(),
  isMyStory: true,
  views: getViewsAndReplies().views
}), "ViewsOnly");
ViewsOnly.story = {
  name: "Views only"
};
const InAGroupNoReplies = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryViewsNRepliesModal.StoryViewsNRepliesModal, {
  ...getDefaultProps(),
  isGroupStory: true
}), "InAGroupNoReplies");
InAGroupNoReplies.story = {
  name: "In a group (no replies)"
};
const InAGroup = /* @__PURE__ */ __name(() => {
  const { views, replies } = getViewsAndReplies();
  return /* @__PURE__ */ import_react.default.createElement(import_StoryViewsNRepliesModal.StoryViewsNRepliesModal, {
    ...getDefaultProps(),
    isGroupStory: true,
    replies,
    views
  });
}, "InAGroup");
InAGroup.story = {
  name: "In a group"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CanReply,
  InAGroup,
  InAGroupNoReplies,
  ViewsOnly
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlWaWV3c05SZXBsaWVzTW9kYWwuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9TdG9yeVZpZXdzTlJlcGxpZXNNb2RhbCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBJTUFHRV9KUEVHIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgeyBTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbCB9IGZyb20gJy4vU3RvcnlWaWV3c05SZXBsaWVzTW9kYWwnO1xuaW1wb3J0IHsgZmFrZUF0dGFjaG1lbnQgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1N0b3J5Vmlld3NOUmVwbGllc01vZGFsJyxcbn07XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpOiBQcm9wc1R5cGUge1xuICByZXR1cm4ge1xuICAgIGF1dGhvclRpdGxlOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCkudGl0bGUsXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgICBpMThuLFxuICAgIGlzTXlTdG9yeTogZmFsc2UsXG4gICAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG4gICAgb25TZXRTa2luVG9uZTogYWN0aW9uKCdvblNldFNraW5Ub25lJyksXG4gICAgb25SZWFjdDogYWN0aW9uKCdvblJlYWN0JyksXG4gICAgb25SZXBseTogYWN0aW9uKCdvblJlcGx5JyksXG4gICAgb25UZXh0VG9vTG9uZzogYWN0aW9uKCdvblRleHRUb29Mb25nJyksXG4gICAgb25Vc2VFbW9qaTogYWN0aW9uKCdvblVzZUVtb2ppJyksXG4gICAgcHJlZmVycmVkUmVhY3Rpb25FbW9qaTogWydcdTI3NjRcdUZFMEYnLCAnXHVEODNEXHVEQzREJywgJ1x1RDgzRFx1REM0RScsICdcdUQ4M0RcdURFMDInLCAnXHVEODNEXHVERTJFJywgJ1x1RDgzRFx1REUyMiddLFxuICAgIHJlbmRlckVtb2ppUGlja2VyOiAoKSA9PiA8ZGl2IC8+LFxuICAgIHJlcGxpZXM6IFtdLFxuICAgIHN0b3J5UHJldmlld0F0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgaGVpZ2h0OiA2NCxcbiAgICAgICAgb2JqZWN0VXJsOiAnL2ZpeHR1cmVzL25hdGhhbi1hbmRlcnNvbi0zMTYxODgtdW5zcGxhc2guanBnJyxcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdmlld3M6IFtdLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3c0FuZFJlcGxpZXMoKSB7XG4gIGNvbnN0IHAxID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuICBjb25zdCBwMiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcbiAgY29uc3QgcDMgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG4gIGNvbnN0IHA0ID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuICBjb25zdCBwNSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcblxuICBjb25zdCB2aWV3cyA9IFtcbiAgICB7XG4gICAgICAuLi5wMSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDIwICogZHVyYXRpb25zLk1JTlVURSxcbiAgICB9LFxuICAgIHtcbiAgICAgIC4uLnAyLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMjUgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0sXG4gICAge1xuICAgICAgLi4ucDMsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAxNSAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gICAgfSxcbiAgICB7XG4gICAgICAuLi5wNCxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDUgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0sXG4gICAge1xuICAgICAgLi4ucDUsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAzMCAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCByZXBsaWVzID0gW1xuICAgIHtcbiAgICAgIC4uLnAyLFxuICAgICAgYm9keTogJ1NvIGN1dGUgXHUyNzY0XHVGRTBGJyxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDI0ICogZHVyYXRpb25zLk1JTlVURSxcbiAgICB9LFxuICAgIHtcbiAgICAgIC4uLnAzLFxuICAgICAgYm9keTogXCJUaGF0J3MgYXdlc29tZVwiLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpIC0gMTMgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0sXG4gICAge1xuICAgICAgLi4ucDQsXG4gICAgICByZWFjdGlvbkVtb2ppOiAnXHUyNzY0XHVGRTBGJyxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDUgKiBkdXJhdGlvbnMuTUlOVVRFLFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIHtcbiAgICB2aWV3cyxcbiAgICByZXBsaWVzLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgQ2FuUmVwbHkgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8U3RvcnlWaWV3c05SZXBsaWVzTW9kYWwgey4uLmdldERlZmF1bHRQcm9wcygpfSAvPlxuKTtcblxuQ2FuUmVwbHkuc3RvcnkgPSB7XG4gIG5hbWU6ICdDYW4gcmVwbHknLFxufTtcblxuZXhwb3J0IGNvbnN0IFZpZXdzT25seSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICBpc015U3RvcnlcbiAgICB2aWV3cz17Z2V0Vmlld3NBbmRSZXBsaWVzKCkudmlld3N9XG4gIC8+XG4pO1xuXG5WaWV3c09ubHkuc3RvcnkgPSB7XG4gIG5hbWU6ICdWaWV3cyBvbmx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbkFHcm91cE5vUmVwbGllcyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbCB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9IGlzR3JvdXBTdG9yeSAvPlxuKTtcblxuSW5BR3JvdXBOb1JlcGxpZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbiBhIGdyb3VwIChubyByZXBsaWVzKScsXG59O1xuXG5leHBvcnQgY29uc3QgSW5BR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB7IHZpZXdzLCByZXBsaWVzIH0gPSBnZXRWaWV3c0FuZFJlcGxpZXMoKTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeVZpZXdzTlJlcGxpZXNNb2RhbFxuICAgICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgICAgaXNHcm91cFN0b3J5XG4gICAgICByZXBsaWVzPXtyZXBsaWVzfVxuICAgICAgdmlld3M9e3ZpZXdzfVxuICAgIC8+XG4gICk7XG59O1xuXG5JbkFHcm91cC5zdG9yeSA9IHtcbiAgbmFtZTogJ0luIGEgZ3JvdXAnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQiwyQkFBdUI7QUFHdkIsZ0JBQTJCO0FBQzNCLHNCQUF1QjtBQUN2QixrQkFBMkI7QUFDM0IscUNBQXdDO0FBQ3hDLDRCQUErQjtBQUMvQixvQ0FBdUM7QUFDdkMsdUJBQTBCO0FBRTFCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sMENBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLDJCQUFzQztBQUNwQyxTQUFPO0FBQUEsSUFDTCxhQUFhLDBEQUF1QixFQUFFO0FBQUEsSUFDdEMsbUJBQW1CLE1BQU07QUFBQSxJQUN6QjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsSUFDckMsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsSUFDckMsWUFBWSxpQ0FBTyxZQUFZO0FBQUEsSUFDL0Isd0JBQXdCLENBQUMsZ0JBQU0sYUFBTSxhQUFNLGFBQU0sYUFBTSxXQUFJO0FBQUEsSUFDM0QsbUJBQW1CLE1BQU0sbURBQUMsV0FBSTtBQUFBLElBQzlCLFNBQVMsQ0FBQztBQUFBLElBQ1Ysd0JBQXdCLDBDQUFlO0FBQUEsTUFDckMsV0FBVztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFFBQ1IsV0FBVztBQUFBLFFBQ1gsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE9BQU8sQ0FBQztBQUFBLEVBQ1Y7QUFDRjtBQTFCUyxBQTRCVCw4QkFBOEI7QUFDNUIsUUFBTSxLQUFLLDBEQUF1QjtBQUNsQyxRQUFNLEtBQUssMERBQXVCO0FBQ2xDLFFBQU0sS0FBSywwREFBdUI7QUFDbEMsUUFBTSxLQUFLLDBEQUF1QjtBQUNsQyxRQUFNLEtBQUssMERBQXVCO0FBRWxDLFFBQU0sUUFBUTtBQUFBLElBQ1o7QUFBQSxTQUNLO0FBQUEsTUFDSCxXQUFXLEtBQUssSUFBSSxJQUFJLEtBQUssVUFBVTtBQUFBLElBQ3pDO0FBQUEsSUFDQTtBQUFBLFNBQ0s7QUFBQSxNQUNILFdBQVcsS0FBSyxJQUFJLElBQUksS0FBSyxVQUFVO0FBQUEsSUFDekM7QUFBQSxJQUNBO0FBQUEsU0FDSztBQUFBLE1BQ0gsV0FBVyxLQUFLLElBQUksSUFBSSxLQUFLLFVBQVU7QUFBQSxJQUN6QztBQUFBLElBQ0E7QUFBQSxTQUNLO0FBQUEsTUFDSCxXQUFXLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVTtBQUFBLElBQ3hDO0FBQUEsSUFDQTtBQUFBLFNBQ0s7QUFBQSxNQUNILFdBQVcsS0FBSyxJQUFJLElBQUksS0FBSyxVQUFVO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBRUEsUUFBTSxVQUFVO0FBQUEsSUFDZDtBQUFBLFNBQ0s7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFdBQVcsS0FBSyxJQUFJLElBQUksS0FBSyxVQUFVO0FBQUEsSUFDekM7QUFBQSxJQUNBO0FBQUEsU0FDSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sV0FBVyxLQUFLLElBQUksSUFBSSxLQUFLLFVBQVU7QUFBQSxJQUN6QztBQUFBLElBQ0E7QUFBQSxTQUNLO0FBQUEsTUFDSCxlQUFlO0FBQUEsTUFDZixXQUFXLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVTtBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQXBEUyxBQXNERixNQUFNLFdBQVcsNkJBQ3RCLG1EQUFDO0FBQUEsS0FBNEIsZ0JBQWdCO0FBQUEsQ0FBRyxHQUQxQjtBQUl4QixTQUFTLFFBQVE7QUFBQSxFQUNmLE1BQU07QUFDUjtBQUVPLE1BQU0sWUFBWSw2QkFDdkIsbURBQUM7QUFBQSxLQUNLLGdCQUFnQjtBQUFBLEVBQ3BCLFdBQVM7QUFBQSxFQUNULE9BQU8sbUJBQW1CLEVBQUU7QUFBQSxDQUM5QixHQUx1QjtBQVF6QixVQUFVLFFBQVE7QUFBQSxFQUNoQixNQUFNO0FBQ1I7QUFFTyxNQUFNLG9CQUFvQiw2QkFDL0IsbURBQUM7QUFBQSxLQUE0QixnQkFBZ0I7QUFBQSxFQUFHLGNBQVk7QUFBQSxDQUFDLEdBRDlCO0FBSWpDLGtCQUFrQixRQUFRO0FBQUEsRUFDeEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxXQUFXLDZCQUFtQjtBQUN6QyxRQUFNLEVBQUUsT0FBTyxZQUFZLG1CQUFtQjtBQUU5QyxTQUNFLG1EQUFDO0FBQUEsT0FDSyxnQkFBZ0I7QUFBQSxJQUNwQixjQUFZO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxHQUNGO0FBRUosR0FYd0I7QUFheEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
