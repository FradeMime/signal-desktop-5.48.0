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
var MediaGridItem_stories_exports = {};
__export(MediaGridItem_stories_exports, {
  BrokenImage: () => BrokenImage,
  BrokenVideo: () => BrokenVideo,
  Image: () => Image,
  MissingImage: () => MissingImage,
  MissingVideo: () => MissingVideo,
  OtherContentType: () => OtherContentType,
  Video: () => Video,
  default: () => MediaGridItem_stories_default
});
module.exports = __toCommonJS(MediaGridItem_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_MIME = require("../../../types/MIME");
var import_MediaGridItem = require("./MediaGridItem");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MediaGridItem_stories_default = {
  title: "Components/Conversation/MediaGallery/MediaGridItem"
};
const createProps = /* @__PURE__ */ __name((overrideProps) => ({
  i18n,
  mediaItem: overrideProps.mediaItem,
  onClick: (0, import_addon_actions.action)("onClick")
}), "createProps");
const createMediaItem = /* @__PURE__ */ __name((overrideProps = {}) => ({
  thumbnailObjectUrl: (0, import_addon_knobs.text)("thumbnailObjectUrl", overrideProps.thumbnailObjectUrl || ""),
  contentType: (0, import_MIME.stringToMIMEType)((0, import_addon_knobs.text)("contentType", overrideProps.contentType || "")),
  index: 0,
  attachment: {},
  message: {
    attachments: [],
    conversationId: "1234",
    id: "id",
    received_at: Date.now(),
    received_at_ms: Date.now(),
    sent_at: Date.now()
  }
}), "createMediaItem");
const Image = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    thumbnailObjectUrl: "/fixtures/kitten-1-64-64.jpg",
    contentType: (0, import_MIME.stringToMIMEType)("image/jpeg")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "Image");
const Video = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    thumbnailObjectUrl: "/fixtures/kitten-2-64-64.jpg",
    contentType: (0, import_MIME.stringToMIMEType)("video/mp4")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "Video");
const MissingImage = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    contentType: (0, import_MIME.stringToMIMEType)("image/jpeg")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "MissingImage");
const MissingVideo = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    contentType: (0, import_MIME.stringToMIMEType)("video/mp4")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "MissingVideo");
const BrokenImage = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    thumbnailObjectUrl: "/missing-fixtures/nope.jpg",
    contentType: (0, import_MIME.stringToMIMEType)("image/jpeg")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "BrokenImage");
const BrokenVideo = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    thumbnailObjectUrl: "/missing-fixtures/nope.mp4",
    contentType: (0, import_MIME.stringToMIMEType)("video/mp4")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "BrokenVideo");
const OtherContentType = /* @__PURE__ */ __name(() => {
  const mediaItem = createMediaItem({
    contentType: (0, import_MIME.stringToMIMEType)("application/text")
  });
  const props = createProps({
    mediaItem
  });
  return /* @__PURE__ */ React.createElement(import_MediaGridItem.MediaGridItem, {
    ...props
  });
}, "OtherContentType");
OtherContentType.story = {
  name: "Other ContentType"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrokenImage,
  BrokenVideo,
  Image,
  MissingImage,
  MissingVideo,
  OtherContentType,
  Video
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFHcmlkSXRlbS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBzdHJpbmdUb01JTUVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvTUlNRSc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL01lZGlhR3JpZEl0ZW0nO1xuaW1wb3J0IHsgTWVkaWFHcmlkSXRlbSB9IGZyb20gJy4vTWVkaWFHcmlkSXRlbSc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9NZWRpYUdhbGxlcnkvTWVkaWFHcmlkSXRlbScsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChcbiAgb3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gJiB7IG1lZGlhSXRlbTogTWVkaWFJdGVtVHlwZSB9XG4pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICBtZWRpYUl0ZW06IG92ZXJyaWRlUHJvcHMubWVkaWFJdGVtLFxuICBvbkNsaWNrOiBhY3Rpb24oJ29uQ2xpY2snKSxcbn0pO1xuXG5jb25zdCBjcmVhdGVNZWRpYUl0ZW0gPSAoXG4gIG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8TWVkaWFJdGVtVHlwZT4gPSB7fVxuKTogTWVkaWFJdGVtVHlwZSA9PiAoe1xuICB0aHVtYm5haWxPYmplY3RVcmw6IHRleHQoXG4gICAgJ3RodW1ibmFpbE9iamVjdFVybCcsXG4gICAgb3ZlcnJpZGVQcm9wcy50aHVtYm5haWxPYmplY3RVcmwgfHwgJydcbiAgKSxcbiAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoXG4gICAgdGV4dCgnY29udGVudFR5cGUnLCBvdmVycmlkZVByb3BzLmNvbnRlbnRUeXBlIHx8ICcnKVxuICApLFxuICBpbmRleDogMCxcbiAgYXR0YWNobWVudDoge30gYXMgQXR0YWNobWVudFR5cGUsIC8vIGF0dGFjaG1lbnQgbm90IHVzZWZ1bCBpbiB0aGUgY29tcG9uZW50XG4gIG1lc3NhZ2U6IHtcbiAgICBhdHRhY2htZW50czogW10sXG4gICAgY29udmVyc2F0aW9uSWQ6ICcxMjM0JyxcbiAgICBpZDogJ2lkJyxcbiAgICByZWNlaXZlZF9hdDogRGF0ZS5ub3coKSxcbiAgICByZWNlaXZlZF9hdF9tczogRGF0ZS5ub3coKSxcbiAgICBzZW50X2F0OiBEYXRlLm5vdygpLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbSA9IGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgdGh1bWJuYWlsT2JqZWN0VXJsOiAnL2ZpeHR1cmVzL2tpdHRlbi0xLTY0LTY0LmpwZycsXG4gICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ2ltYWdlL2pwZWcnKSxcbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgbWVkaWFJdGVtLFxuICB9KTtcblxuICByZXR1cm4gPE1lZGlhR3JpZEl0ZW0gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBWaWRlbyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbSA9IGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgdGh1bWJuYWlsT2JqZWN0VXJsOiAnL2ZpeHR1cmVzL2tpdHRlbi0yLTY0LTY0LmpwZycsXG4gICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ3ZpZGVvL21wNCcpLFxuICB9KTtcblxuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBtZWRpYUl0ZW0sXG4gIH0pO1xuXG4gIHJldHVybiA8TWVkaWFHcmlkSXRlbSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1pc3NpbmdJbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbSA9IGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ2ltYWdlL2pwZWcnKSxcbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgbWVkaWFJdGVtLFxuICB9KTtcblxuICByZXR1cm4gPE1lZGlhR3JpZEl0ZW0gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBNaXNzaW5nVmlkZW8gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBtZWRpYUl0ZW0gPSBjcmVhdGVNZWRpYUl0ZW0oe1xuICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKCd2aWRlby9tcDQnKSxcbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgbWVkaWFJdGVtLFxuICB9KTtcblxuICByZXR1cm4gPE1lZGlhR3JpZEl0ZW0gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBCcm9rZW5JbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbSA9IGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgdGh1bWJuYWlsT2JqZWN0VXJsOiAnL21pc3NpbmctZml4dHVyZXMvbm9wZS5qcGcnLFxuICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKCdpbWFnZS9qcGVnJyksXG4gIH0pO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIG1lZGlhSXRlbSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZWRpYUdyaWRJdGVtIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQnJva2VuVmlkZW8gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBtZWRpYUl0ZW0gPSBjcmVhdGVNZWRpYUl0ZW0oe1xuICAgIHRodW1ibmFpbE9iamVjdFVybDogJy9taXNzaW5nLWZpeHR1cmVzL25vcGUubXA0JyxcbiAgICBjb250ZW50VHlwZTogc3RyaW5nVG9NSU1FVHlwZSgndmlkZW8vbXA0JyksXG4gIH0pO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIG1lZGlhSXRlbSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZWRpYUdyaWRJdGVtIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgT3RoZXJDb250ZW50VHlwZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbSA9IGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ2FwcGxpY2F0aW9uL3RleHQnKSxcbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgbWVkaWFJdGVtLFxuICB9KTtcblxuICByZXR1cm4gPE1lZGlhR3JpZEl0ZW0gey4uLnByb3BzfSAvPjtcbn07XG5cbk90aGVyQ29udGVudFR5cGUuc3RvcnkgPSB7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
