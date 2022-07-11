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
var StoryImage_stories_exports = {};
__export(StoryImage_stories_exports, {
  BrokenImage: () => BrokenImage,
  BrokenImageThumbnail: () => BrokenImageThumbnail,
  GoodStory: () => GoodStory,
  GoodStoryThumbnail: () => GoodStoryThumbnail,
  NotDownloaded: () => NotDownloaded,
  NotDownloadedThumbnail: () => NotDownloadedThumbnail,
  PendingDownload: () => PendingDownload,
  PendingDownloadThumbnail: () => PendingDownloadThumbnail,
  Video: () => Video,
  default: () => StoryImage_stories_default
});
module.exports = __toCommonJS(StoryImage_stories_exports);
var import_react = __toESM(require("react"));
var import_uuid = require("uuid");
var import_addon_actions = require("@storybook/addon-actions");
var import_StoryImage = require("./StoryImage");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
var import_MIME = require("../types/MIME");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StoryImage_stories_default = {
  title: "Components/StoryImage"
};
function getDefaultProps() {
  return {
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/nathan-anderson-316188-unsplash.jpg",
      thumbnail: (0, import_fakeAttachment.fakeThumbnail)("/fixtures/nathan-anderson-316188-unsplash.jpg")
    }),
    i18n,
    label: "A story",
    queueStoryDownload: (0, import_addon_actions.action)("queueStoryDownload"),
    storyId: (0, import_uuid.v4)()
  };
}
const GoodStory = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps()
}), "GoodStory");
GoodStory.story = {
  name: "Good story"
};
const GoodStoryThumbnail = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  isThumbnail: true
}), "GoodStoryThumbnail");
GoodStoryThumbnail.story = {
  name: "Good story (thumbnail)"
};
const NotDownloaded = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)()
}), "NotDownloaded");
NotDownloaded.story = {
  name: "Not downloaded"
};
const NotDownloadedThumbnail = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)(),
  isThumbnail: true
}), "NotDownloadedThumbnail");
NotDownloadedThumbnail.story = {
  name: "Not downloaded (thumbnail)"
};
const PendingDownload = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)({
    pending: true
  })
}), "PendingDownload");
PendingDownload.story = {
  name: "Pending download"
};
const PendingDownloadThumbnail = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)({
    pending: true
  }),
  isThumbnail: true
}), "PendingDownloadThumbnail");
PendingDownloadThumbnail.story = {
  name: "Pending download (thumbnail)"
};
const BrokenImage = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)({
    url: "/this/path/does/not/exist.jpg"
  })
}), "BrokenImage");
const BrokenImageThumbnail = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)({
    url: "/this/path/does/not/exist.jpg"
  }),
  isThumbnail: true
}), "BrokenImageThumbnail");
BrokenImageThumbnail.story = {
  name: "Broken Image (thumbnail)"
};
const Video = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
  ...getDefaultProps(),
  attachment: (0, import_fakeAttachment.fakeAttachment)({
    contentType: import_MIME.VIDEO_MP4,
    url: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
  })
}), "Video");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrokenImage,
  BrokenImageThumbnail,
  GoodStory,
  GoodStoryThumbnail,
  NotDownloaded,
  NotDownloadedThumbnail,
  PendingDownload,
  PendingDownloadThumbnail,
  Video
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlJbWFnZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1N0b3J5SW1hZ2UnO1xuaW1wb3J0IHsgU3RvcnlJbWFnZSB9IGZyb20gJy4vU3RvcnlJbWFnZSc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7XG4gIGZha2VBdHRhY2htZW50LFxuICBmYWtlVGh1bWJuYWlsLFxufSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5pbXBvcnQgeyBWSURFT19NUDQgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU3RvcnlJbWFnZScsXG59O1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKTogUHJvcHNUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2htZW50OiBmYWtlQXR0YWNobWVudCh7XG4gICAgICB1cmw6ICcvZml4dHVyZXMvbmF0aGFuLWFuZGVyc29uLTMxNjE4OC11bnNwbGFzaC5qcGcnLFxuICAgICAgdGh1bWJuYWlsOiBmYWtlVGh1bWJuYWlsKCcvZml4dHVyZXMvbmF0aGFuLWFuZGVyc29uLTMxNjE4OC11bnNwbGFzaC5qcGcnKSxcbiAgICB9KSxcbiAgICBpMThuLFxuICAgIGxhYmVsOiAnQSBzdG9yeScsXG4gICAgcXVldWVTdG9yeURvd25sb2FkOiBhY3Rpb24oJ3F1ZXVlU3RvcnlEb3dubG9hZCcpLFxuICAgIHN0b3J5SWQ6IHV1aWQoKSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IEdvb2RTdG9yeSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeUltYWdlIHsuLi5nZXREZWZhdWx0UHJvcHMoKX0gLz5cbik7XG5cbkdvb2RTdG9yeS5zdG9yeSA9IHtcbiAgbmFtZTogJ0dvb2Qgc3RvcnknLFxufTtcblxuZXhwb3J0IGNvbnN0IEdvb2RTdG9yeVRodW1ibmFpbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeUltYWdlIHsuLi5nZXREZWZhdWx0UHJvcHMoKX0gaXNUaHVtYm5haWwgLz5cbik7XG5cbkdvb2RTdG9yeVRodW1ibmFpbC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dvb2Qgc3RvcnkgKHRodW1ibmFpbCknLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdERvd25sb2FkZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8U3RvcnlJbWFnZSB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9IGF0dGFjaG1lbnQ9e2Zha2VBdHRhY2htZW50KCl9IC8+XG4pO1xuXG5Ob3REb3dubG9hZGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90IGRvd25sb2FkZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdERvd25sb2FkZWRUaHVtYm5haWwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8U3RvcnlJbWFnZVxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICBhdHRhY2htZW50PXtmYWtlQXR0YWNobWVudCgpfVxuICAgIGlzVGh1bWJuYWlsXG4gIC8+XG4pO1xuXG5Ob3REb3dubG9hZGVkVGh1bWJuYWlsLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90IGRvd25sb2FkZWQgKHRodW1ibmFpbCknLFxufTtcblxuZXhwb3J0IGNvbnN0IFBlbmRpbmdEb3dubG9hZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeUltYWdlXG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIGF0dGFjaG1lbnQ9e2Zha2VBdHRhY2htZW50KHtcbiAgICAgIHBlbmRpbmc6IHRydWUsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5QZW5kaW5nRG93bmxvYWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdQZW5kaW5nIGRvd25sb2FkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nRG93bmxvYWRUaHVtYm5haWwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8U3RvcnlJbWFnZVxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICBhdHRhY2htZW50PXtmYWtlQXR0YWNobWVudCh7XG4gICAgICBwZW5kaW5nOiB0cnVlLFxuICAgIH0pfVxuICAgIGlzVGh1bWJuYWlsXG4gIC8+XG4pO1xuXG5QZW5kaW5nRG93bmxvYWRUaHVtYm5haWwuc3RvcnkgPSB7XG4gIG5hbWU6ICdQZW5kaW5nIGRvd25sb2FkICh0aHVtYm5haWwpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBCcm9rZW5JbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeUltYWdlXG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIGF0dGFjaG1lbnQ9e2Zha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogJy90aGlzL3BhdGgvZG9lcy9ub3QvZXhpc3QuanBnJyxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBCcm9rZW5JbWFnZVRodW1ibmFpbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTdG9yeUltYWdlXG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIGF0dGFjaG1lbnQ9e2Zha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogJy90aGlzL3BhdGgvZG9lcy9ub3QvZXhpc3QuanBnJyxcbiAgICB9KX1cbiAgICBpc1RodW1ibmFpbFxuICAvPlxuKTtcblxuQnJva2VuSW1hZ2VUaHVtYm5haWwuc3RvcnkgPSB7XG4gIG5hbWU6ICdCcm9rZW4gSW1hZ2UgKHRodW1ibmFpbCknLFxufTtcblxuZXhwb3J0IGNvbnN0IFZpZGVvID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFN0b3J5SW1hZ2VcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgYXR0YWNobWVudD17ZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgIHVybDogJy9maXh0dXJlcy9waXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICB9KX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLGtCQUEyQjtBQUMzQiwyQkFBdUI7QUFHdkIsd0JBQTJCO0FBQzNCLHNCQUF1QjtBQUN2Qix1QkFBMEI7QUFDMUIsNEJBR087QUFDUCxrQkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyw2QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsMkJBQXNDO0FBQ3BDLFNBQU87QUFBQSxJQUNMLFlBQVksMENBQWU7QUFBQSxNQUN6QixLQUFLO0FBQUEsTUFDTCxXQUFXLHlDQUFjLCtDQUErQztBQUFBLElBQzFFLENBQUM7QUFBQSxJQUNEO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFDUCxvQkFBb0IsaUNBQU8sb0JBQW9CO0FBQUEsSUFDL0MsU0FBUyxvQkFBSztBQUFBLEVBQ2hCO0FBQ0Y7QUFYUyxBQWFGLE1BQU0sWUFBWSw2QkFDdkIsbURBQUM7QUFBQSxLQUFlLGdCQUFnQjtBQUFBLENBQUcsR0FEWjtBQUl6QixVQUFVLFFBQVE7QUFBQSxFQUNoQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHFCQUFxQiw2QkFDaEMsbURBQUM7QUFBQSxLQUFlLGdCQUFnQjtBQUFBLEVBQUcsYUFBVztBQUFBLENBQUMsR0FEZjtBQUlsQyxtQkFBbUIsUUFBUTtBQUFBLEVBQ3pCLE1BQU07QUFDUjtBQUVPLE1BQU0sZ0JBQWdCLDZCQUMzQixtREFBQztBQUFBLEtBQWUsZ0JBQWdCO0FBQUEsRUFBRyxZQUFZLDBDQUFlO0FBQUEsQ0FBRyxHQUR0QztBQUk3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHlCQUF5Qiw2QkFDcEMsbURBQUM7QUFBQSxLQUNLLGdCQUFnQjtBQUFBLEVBQ3BCLFlBQVksMENBQWU7QUFBQSxFQUMzQixhQUFXO0FBQUEsQ0FDYixHQUxvQztBQVF0Qyx1QkFBdUIsUUFBUTtBQUFBLEVBQzdCLE1BQU07QUFDUjtBQUVPLE1BQU0sa0JBQWtCLDZCQUM3QixtREFBQztBQUFBLEtBQ0ssZ0JBQWdCO0FBQUEsRUFDcEIsWUFBWSwwQ0FBZTtBQUFBLElBQ3pCLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFBQSxDQUNILEdBTjZCO0FBUy9CLGdCQUFnQixRQUFRO0FBQUEsRUFDdEIsTUFBTTtBQUNSO0FBRU8sTUFBTSwyQkFBMkIsNkJBQ3RDLG1EQUFDO0FBQUEsS0FDSyxnQkFBZ0I7QUFBQSxFQUNwQixZQUFZLDBDQUFlO0FBQUEsSUFDekIsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUFBLEVBQ0QsYUFBVztBQUFBLENBQ2IsR0FQc0M7QUFVeEMseUJBQXlCLFFBQVE7QUFBQSxFQUMvQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGNBQWMsNkJBQ3pCLG1EQUFDO0FBQUEsS0FDSyxnQkFBZ0I7QUFBQSxFQUNwQixZQUFZLDBDQUFlO0FBQUEsSUFDekIsS0FBSztBQUFBLEVBQ1AsQ0FBQztBQUFBLENBQ0gsR0FOeUI7QUFTcEIsTUFBTSx1QkFBdUIsNkJBQ2xDLG1EQUFDO0FBQUEsS0FDSyxnQkFBZ0I7QUFBQSxFQUNwQixZQUFZLDBDQUFlO0FBQUEsSUFDekIsS0FBSztBQUFBLEVBQ1AsQ0FBQztBQUFBLEVBQ0QsYUFBVztBQUFBLENBQ2IsR0FQa0M7QUFVcEMscUJBQXFCLFFBQVE7QUFBQSxFQUMzQixNQUFNO0FBQ1I7QUFFTyxNQUFNLFFBQVEsNkJBQ25CLG1EQUFDO0FBQUEsS0FDSyxnQkFBZ0I7QUFBQSxFQUNwQixZQUFZLDBDQUFlO0FBQUEsSUFDekIsYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLEVBQ1AsQ0FBQztBQUFBLENBQ0gsR0FQbUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
