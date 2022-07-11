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
var StagedLinkPreview_stories_exports = {};
__export(StagedLinkPreview_stories_exports, {
  EverythingImageTitleDescriptionAndDate: () => EverythingImageTitleDescriptionAndDate,
  Image: () => Image,
  ImageLongTitleAndDescription: () => ImageLongTitleAndDescription,
  ImageLongTitleWithoutDescription: () => ImageLongTitleWithoutDescription,
  ImageNoTitleOrDescription: () => ImageNoTitleOrDescription,
  Loading: () => Loading,
  NoImage: () => NoImage,
  NoImageLongTitleWithDescription: () => NoImageLongTitleWithDescription,
  NoImageLongTitleWithoutDescription: () => NoImageLongTitleWithoutDescription,
  default: () => StagedLinkPreview_stories_default
});
module.exports = __toCommonJS(StagedLinkPreview_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StagedLinkPreview = require("./StagedLinkPreview");
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
var import_setupI18n = require("../../util/setupI18n");
var import_MIME = require("../../types/MIME");
const LONG_TITLE = "This is a super-sweet site. And it's got some really amazing content in store for you if you just click that link. Can you click that link for me?";
const LONG_DESCRIPTION = "You're gonna love this description. Not only does it have a lot of characters, but it will also be truncated in the UI. How cool is that??";
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StagedLinkPreview_stories_default = {
  title: "Components/Conversation/StagedLinkPreview",
  component: import_StagedLinkPreview.StagedLinkPreview
};
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  date: Date.now(),
  description: "This is a description",
  domain: "signal.org",
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  title: "This is a super-sweet site",
  url: "https://www.signal.org"
}), "getDefaultProps");
const Template = /* @__PURE__ */ __name((args) => /* @__PURE__ */ React.createElement(import_StagedLinkPreview.StagedLinkPreview, {
  ...args
}), "Template");
const Loading = Template.bind({});
Loading.args = {
  ...getDefaultProps(),
  domain: ""
};
const NoImage = Template.bind({});
const Image = Template.bind({});
Image.args = {
  ...getDefaultProps(),
  image: (0, import_fakeAttachment.fakeAttachment)({
    url: "/fixtures/kitten-4-112-112.jpg",
    contentType: import_MIME.IMAGE_JPEG
  })
};
const ImageNoTitleOrDescription = Template.bind({});
ImageNoTitleOrDescription.args = {
  ...getDefaultProps(),
  title: "",
  description: "",
  domain: "instagram.com",
  image: (0, import_fakeAttachment.fakeAttachment)({
    url: "/fixtures/kitten-4-112-112.jpg",
    contentType: import_MIME.IMAGE_JPEG
  })
};
ImageNoTitleOrDescription.story = {
  name: "Image, No Title Or Description"
};
const NoImageLongTitleWithDescription = Template.bind({});
NoImageLongTitleWithDescription.args = {
  ...getDefaultProps(),
  title: LONG_TITLE
};
NoImageLongTitleWithDescription.story = {
  name: "No Image, Long Title With Description"
};
const NoImageLongTitleWithoutDescription = Template.bind({});
NoImageLongTitleWithoutDescription.args = {
  ...getDefaultProps(),
  title: LONG_TITLE,
  description: ""
};
NoImageLongTitleWithoutDescription.story = {
  name: "No Image, Long Title Without Description"
};
const ImageLongTitleWithoutDescription = Template.bind({});
ImageLongTitleWithoutDescription.args = {
  ...getDefaultProps(),
  title: LONG_TITLE,
  image: (0, import_fakeAttachment.fakeAttachment)({
    url: "/fixtures/kitten-4-112-112.jpg",
    contentType: import_MIME.IMAGE_JPEG
  })
};
ImageLongTitleWithoutDescription.story = {
  name: "Image, Long Title Without Description"
};
const ImageLongTitleAndDescription = Template.bind({});
ImageLongTitleAndDescription.args = {
  ...getDefaultProps(),
  title: LONG_TITLE,
  description: LONG_DESCRIPTION,
  image: (0, import_fakeAttachment.fakeAttachment)({
    url: "/fixtures/kitten-4-112-112.jpg",
    contentType: import_MIME.IMAGE_JPEG
  })
};
ImageLongTitleAndDescription.story = {
  name: "Image, Long Title And Description"
};
const EverythingImageTitleDescriptionAndDate = Template.bind({});
EverythingImageTitleDescriptionAndDate.args = {
  ...getDefaultProps(),
  title: LONG_TITLE,
  description: LONG_DESCRIPTION,
  image: (0, import_fakeAttachment.fakeAttachment)({
    url: "/fixtures/kitten-4-112-112.jpg",
    contentType: import_MIME.IMAGE_JPEG
  })
};
EverythingImageTitleDescriptionAndDate.story = {
  name: "Everything: image, title, description, and date"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EverythingImageTitleDescriptionAndDate,
  Image,
  ImageLongTitleAndDescription,
  ImageLongTitleWithoutDescription,
  ImageNoTitleOrDescription,
  Loading,
  NoImage,
  NoImageLongTitleWithDescription,
  NoImageLongTitleWithoutDescription
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhZ2VkTGlua1ByZXZpZXcuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1ldGEsIFN0b3J5IH0gZnJvbSAnQHN0b3J5Ym9vay9yZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9TdGFnZWRMaW5rUHJldmlldyc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IFN0YWdlZExpbmtQcmV2aWV3IH0gZnJvbSAnLi9TdGFnZWRMaW5rUHJldmlldyc7XG5pbXBvcnQgeyBmYWtlQXR0YWNobWVudCB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IElNQUdFX0pQRUcgfSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcblxuY29uc3QgTE9OR19USVRMRSA9XG4gIFwiVGhpcyBpcyBhIHN1cGVyLXN3ZWV0IHNpdGUuIEFuZCBpdCdzIGdvdCBzb21lIHJlYWxseSBhbWF6aW5nIGNvbnRlbnQgaW4gc3RvcmUgZm9yIHlvdSBpZiB5b3UganVzdCBjbGljayB0aGF0IGxpbmsuIENhbiB5b3UgY2xpY2sgdGhhdCBsaW5rIGZvciBtZT9cIjtcbmNvbnN0IExPTkdfREVTQ1JJUFRJT04gPVxuICBcIllvdSdyZSBnb25uYSBsb3ZlIHRoaXMgZGVzY3JpcHRpb24uIE5vdCBvbmx5IGRvZXMgaXQgaGF2ZSBhIGxvdCBvZiBjaGFyYWN0ZXJzLCBidXQgaXQgd2lsbCBhbHNvIGJlIHRydW5jYXRlZCBpbiB0aGUgVUkuIEhvdyBjb29sIGlzIHRoYXQ/P1wiO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vU3RhZ2VkTGlua1ByZXZpZXcnLFxuICBjb21wb25lbnQ6IFN0YWdlZExpbmtQcmV2aWV3LFxufSBhcyBNZXRhO1xuXG5jb25zdCBnZXREZWZhdWx0UHJvcHMgPSAoKTogUHJvcHMgPT4gKHtcbiAgZGF0ZTogRGF0ZS5ub3coKSxcbiAgZGVzY3JpcHRpb246ICdUaGlzIGlzIGEgZGVzY3JpcHRpb24nLFxuICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgaTE4bixcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG4gIHRpdGxlOiAnVGhpcyBpcyBhIHN1cGVyLXN3ZWV0IHNpdGUnLFxuICB1cmw6ICdodHRwczovL3d3dy5zaWduYWwub3JnJyxcbn0pO1xuXG5jb25zdCBUZW1wbGF0ZTogU3Rvcnk8UHJvcHM+ID0gYXJncyA9PiA8U3RhZ2VkTGlua1ByZXZpZXcgey4uLmFyZ3N9IC8+O1xuXG5leHBvcnQgY29uc3QgTG9hZGluZyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuTG9hZGluZy5hcmdzID0ge1xuICAuLi5nZXREZWZhdWx0UHJvcHMoKSxcbiAgZG9tYWluOiAnJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb0ltYWdlID0gVGVtcGxhdGUuYmluZCh7fSk7XG5cbmV4cG9ydCBjb25zdCBJbWFnZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuSW1hZ2UuYXJncyA9IHtcbiAgLi4uZ2V0RGVmYXVsdFByb3BzKCksXG4gIGltYWdlOiBmYWtlQXR0YWNobWVudCh7XG4gICAgdXJsOiAnL2ZpeHR1cmVzL2tpdHRlbi00LTExMi0xMTIuanBnJyxcbiAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgfSksXG59O1xuXG5leHBvcnQgY29uc3QgSW1hZ2VOb1RpdGxlT3JEZXNjcmlwdGlvbiA9IFRlbXBsYXRlLmJpbmQoe30pO1xuSW1hZ2VOb1RpdGxlT3JEZXNjcmlwdGlvbi5hcmdzID0ge1xuICAuLi5nZXREZWZhdWx0UHJvcHMoKSxcbiAgdGl0bGU6ICcnLFxuICBkZXNjcmlwdGlvbjogJycsXG4gIGRvbWFpbjogJ2luc3RhZ3JhbS5jb20nLFxuICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gIH0pLFxufTtcbkltYWdlTm9UaXRsZU9yRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdJbWFnZSwgTm8gVGl0bGUgT3IgRGVzY3JpcHRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vSW1hZ2VMb25nVGl0bGVXaXRoRGVzY3JpcHRpb24gPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk5vSW1hZ2VMb25nVGl0bGVXaXRoRGVzY3JpcHRpb24uYXJncyA9IHtcbiAgLi4uZ2V0RGVmYXVsdFByb3BzKCksXG4gIHRpdGxlOiBMT05HX1RJVExFLFxufTtcbk5vSW1hZ2VMb25nVGl0bGVXaXRoRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdObyBJbWFnZSwgTG9uZyBUaXRsZSBXaXRoIERlc2NyaXB0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb0ltYWdlTG9uZ1RpdGxlV2l0aG91dERlc2NyaXB0aW9uID0gVGVtcGxhdGUuYmluZCh7fSk7XG5Ob0ltYWdlTG9uZ1RpdGxlV2l0aG91dERlc2NyaXB0aW9uLmFyZ3MgPSB7XG4gIC4uLmdldERlZmF1bHRQcm9wcygpLFxuICB0aXRsZTogTE9OR19USVRMRSxcbiAgZGVzY3JpcHRpb246ICcnLFxufTtcbk5vSW1hZ2VMb25nVGl0bGVXaXRob3V0RGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdObyBJbWFnZSwgTG9uZyBUaXRsZSBXaXRob3V0IERlc2NyaXB0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbWFnZUxvbmdUaXRsZVdpdGhvdXREZXNjcmlwdGlvbiA9IFRlbXBsYXRlLmJpbmQoe30pO1xuSW1hZ2VMb25nVGl0bGVXaXRob3V0RGVzY3JpcHRpb24uYXJncyA9IHtcbiAgLi4uZ2V0RGVmYXVsdFByb3BzKCksXG4gIHRpdGxlOiBMT05HX1RJVExFLFxuICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gIH0pLFxufTtcbkltYWdlTG9uZ1RpdGxlV2l0aG91dERlc2NyaXB0aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnSW1hZ2UsIExvbmcgVGl0bGUgV2l0aG91dCBEZXNjcmlwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgSW1hZ2VMb25nVGl0bGVBbmREZXNjcmlwdGlvbiA9IFRlbXBsYXRlLmJpbmQoe30pO1xuSW1hZ2VMb25nVGl0bGVBbmREZXNjcmlwdGlvbi5hcmdzID0ge1xuICAuLi5nZXREZWZhdWx0UHJvcHMoKSxcbiAgdGl0bGU6IExPTkdfVElUTEUsXG4gIGRlc2NyaXB0aW9uOiBMT05HX0RFU0NSSVBUSU9OLFxuICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gIH0pLFxufTtcbkltYWdlTG9uZ1RpdGxlQW5kRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdJbWFnZSwgTG9uZyBUaXRsZSBBbmQgRGVzY3JpcHRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IEV2ZXJ5dGhpbmdJbWFnZVRpdGxlRGVzY3JpcHRpb25BbmREYXRlID0gVGVtcGxhdGUuYmluZCh7fSk7XG5FdmVyeXRoaW5nSW1hZ2VUaXRsZURlc2NyaXB0aW9uQW5kRGF0ZS5hcmdzID0ge1xuICAuLi5nZXREZWZhdWx0UHJvcHMoKSxcbiAgdGl0bGU6IExPTkdfVElUTEUsXG4gIGRlc2NyaXB0aW9uOiBMT05HX0RFU0NSSVBUSU9OLFxuICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoe1xuICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gIH0pLFxufTtcbkV2ZXJ5dGhpbmdJbWFnZVRpdGxlRGVzY3JpcHRpb25BbmREYXRlLnN0b3J5ID0ge1xuICBuYW1lOiAnRXZlcnl0aGluZzogaW1hZ2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgYW5kIGRhdGUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFHdkIsc0JBQXVCO0FBQ3ZCLCtCQUFrQztBQUNsQyw0QkFBK0I7QUFDL0IsdUJBQTBCO0FBQzFCLGtCQUEyQjtBQUUzQixNQUFNLGFBQ0o7QUFDRixNQUFNLG1CQUNKO0FBRUYsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxvQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUNiO0FBRUEsTUFBTSxrQkFBa0IsNkJBQWM7QUFBQSxFQUNwQyxNQUFNLEtBQUssSUFBSTtBQUFBLEVBQ2YsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLE9BQU87QUFBQSxFQUNQLEtBQUs7QUFDUCxJQVJ3QjtBQVV4QixNQUFNLFdBQXlCLGlDQUFRLG9DQUFDO0FBQUEsS0FBc0I7QUFBQSxDQUFNLEdBQXJDO0FBRXhCLE1BQU0sVUFBVSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLFFBQVEsT0FBTztBQUFBLEtBQ1YsZ0JBQWdCO0FBQUEsRUFDbkIsUUFBUTtBQUNWO0FBRU8sTUFBTSxVQUFVLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFFaEMsTUFBTSxRQUFRLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDckMsTUFBTSxPQUFPO0FBQUEsS0FDUixnQkFBZ0I7QUFBQSxFQUNuQixPQUFPLDBDQUFlO0FBQUEsSUFDcEIsS0FBSztBQUFBLElBQ0wsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNIO0FBRU8sTUFBTSw0QkFBNEIsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN6RCwwQkFBMEIsT0FBTztBQUFBLEtBQzVCLGdCQUFnQjtBQUFBLEVBQ25CLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLFFBQVE7QUFBQSxFQUNSLE9BQU8sMENBQWU7QUFBQSxJQUNwQixLQUFLO0FBQUEsSUFDTCxhQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0g7QUFDQSwwQkFBMEIsUUFBUTtBQUFBLEVBQ2hDLE1BQU07QUFDUjtBQUVPLE1BQU0sa0NBQWtDLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDL0QsZ0NBQWdDLE9BQU87QUFBQSxLQUNsQyxnQkFBZ0I7QUFBQSxFQUNuQixPQUFPO0FBQ1Q7QUFDQSxnQ0FBZ0MsUUFBUTtBQUFBLEVBQ3RDLE1BQU07QUFDUjtBQUVPLE1BQU0scUNBQXFDLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDbEUsbUNBQW1DLE9BQU87QUFBQSxLQUNyQyxnQkFBZ0I7QUFBQSxFQUNuQixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQ2Y7QUFDQSxtQ0FBbUMsUUFBUTtBQUFBLEVBQ3pDLE1BQU07QUFDUjtBQUVPLE1BQU0sbUNBQW1DLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDaEUsaUNBQWlDLE9BQU87QUFBQSxLQUNuQyxnQkFBZ0I7QUFBQSxFQUNuQixPQUFPO0FBQUEsRUFDUCxPQUFPLDBDQUFlO0FBQUEsSUFDcEIsS0FBSztBQUFBLElBQ0wsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNIO0FBQ0EsaUNBQWlDLFFBQVE7QUFBQSxFQUN2QyxNQUFNO0FBQ1I7QUFFTyxNQUFNLCtCQUErQixTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQzVELDZCQUE2QixPQUFPO0FBQUEsS0FDL0IsZ0JBQWdCO0FBQUEsRUFDbkIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsT0FBTywwQ0FBZTtBQUFBLElBQ3BCLEtBQUs7QUFBQSxJQUNMLGFBQWE7QUFBQSxFQUNmLENBQUM7QUFDSDtBQUNBLDZCQUE2QixRQUFRO0FBQUEsRUFDbkMsTUFBTTtBQUNSO0FBRU8sTUFBTSx5Q0FBeUMsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN0RSx1Q0FBdUMsT0FBTztBQUFBLEtBQ3pDLGdCQUFnQjtBQUFBLEVBQ25CLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE9BQU8sMENBQWU7QUFBQSxJQUNwQixLQUFLO0FBQUEsSUFDTCxhQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0g7QUFDQSx1Q0FBdUMsUUFBUTtBQUFBLEVBQzdDLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
