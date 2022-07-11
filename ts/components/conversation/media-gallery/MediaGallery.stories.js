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
var MediaGallery_stories_exports = {};
__export(MediaGallery_stories_exports, {
  Empty: () => Empty,
  NoDocuments: () => NoDocuments,
  NoMedia: () => NoMedia,
  OneEach: () => OneEach,
  Populated: () => Populated,
  default: () => MediaGallery_stories_default
});
module.exports = __toCommonJS(MediaGallery_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_AttachmentSection = require("./AttachmentSection.stories");
var import_MediaGallery = require("./MediaGallery");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MediaGallery_stories_default = {
  title: "Components/Conversation/MediaGallery/MediaGallery"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  onItemClick: (0, import_addon_actions.action)("onItemClick"),
  documents: overrideProps.documents || [],
  media: overrideProps.media || []
}), "createProps");
const Populated = /* @__PURE__ */ __name(() => {
  const documents = (0, import_AttachmentSection.createRandomDocuments)(import_AttachmentSection.now, (0, import_AttachmentSection.days)(1)).slice(0, 1);
  const media = (0, import_AttachmentSection.createPreparedMediaItems)(import_AttachmentSection.createRandomMedia);
  const props = createProps({ documents, media });
  return /* @__PURE__ */ React.createElement(import_MediaGallery.MediaGallery, {
    ...props
  });
}, "Populated");
const NoDocuments = /* @__PURE__ */ __name(() => {
  const media = (0, import_AttachmentSection.createPreparedMediaItems)(import_AttachmentSection.createRandomMedia);
  const props = createProps({ media });
  return /* @__PURE__ */ React.createElement(import_MediaGallery.MediaGallery, {
    ...props
  });
}, "NoDocuments");
const NoMedia = /* @__PURE__ */ __name(() => {
  const documents = (0, import_AttachmentSection.createPreparedMediaItems)(import_AttachmentSection.createRandomDocuments);
  const props = createProps({ documents });
  return /* @__PURE__ */ React.createElement(import_MediaGallery.MediaGallery, {
    ...props
  });
}, "NoMedia");
const OneEach = /* @__PURE__ */ __name(() => {
  const media = (0, import_AttachmentSection.createRandomMedia)(import_AttachmentSection.now, (0, import_AttachmentSection.days)(1)).slice(0, 1);
  const documents = (0, import_AttachmentSection.createRandomDocuments)(import_AttachmentSection.now, (0, import_AttachmentSection.days)(1)).slice(0, 1);
  const props = createProps({ documents, media });
  return /* @__PURE__ */ React.createElement(import_MediaGallery.MediaGallery, {
    ...props
  });
}, "OneEach");
const Empty = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_MediaGallery.MediaGallery, {
    ...props
  });
}, "Empty");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Empty,
  NoDocuments,
  NoMedia,
  OneEach,
  Populated
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFHYWxsZXJ5LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQge1xuICBjcmVhdGVQcmVwYXJlZE1lZGlhSXRlbXMsXG4gIGNyZWF0ZVJhbmRvbURvY3VtZW50cyxcbiAgY3JlYXRlUmFuZG9tTWVkaWEsXG4gIGRheXMsXG4gIG5vdyxcbn0gZnJvbSAnLi9BdHRhY2htZW50U2VjdGlvbi5zdG9yaWVzJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL01lZGlhR2FsbGVyeSc7XG5pbXBvcnQgeyBNZWRpYUdhbGxlcnkgfSBmcm9tICcuL01lZGlhR2FsbGVyeSc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9NZWRpYUdhbGxlcnkvTWVkaWFHYWxsZXJ5Jyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICBvbkl0ZW1DbGljazogYWN0aW9uKCdvbkl0ZW1DbGljaycpLFxuICBkb2N1bWVudHM6IG92ZXJyaWRlUHJvcHMuZG9jdW1lbnRzIHx8IFtdLFxuICBtZWRpYTogb3ZlcnJpZGVQcm9wcy5tZWRpYSB8fCBbXSxcbn0pO1xuXG5leHBvcnQgY29uc3QgUG9wdWxhdGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZG9jdW1lbnRzID0gY3JlYXRlUmFuZG9tRG9jdW1lbnRzKG5vdywgZGF5cygxKSkuc2xpY2UoMCwgMSk7XG4gIGNvbnN0IG1lZGlhID0gY3JlYXRlUHJlcGFyZWRNZWRpYUl0ZW1zKGNyZWF0ZVJhbmRvbU1lZGlhKTtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGRvY3VtZW50cywgbWVkaWEgfSk7XG5cbiAgcmV0dXJuIDxNZWRpYUdhbGxlcnkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb0RvY3VtZW50cyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhID0gY3JlYXRlUHJlcGFyZWRNZWRpYUl0ZW1zKGNyZWF0ZVJhbmRvbU1lZGlhKTtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IG1lZGlhIH0pO1xuXG4gIHJldHVybiA8TWVkaWFHYWxsZXJ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTm9NZWRpYSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGRvY3VtZW50cyA9IGNyZWF0ZVByZXBhcmVkTWVkaWFJdGVtcyhjcmVhdGVSYW5kb21Eb2N1bWVudHMpO1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgZG9jdW1lbnRzIH0pO1xuXG4gIHJldHVybiA8TWVkaWFHYWxsZXJ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgT25lRWFjaCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lZGlhID0gY3JlYXRlUmFuZG9tTWVkaWEobm93LCBkYXlzKDEpKS5zbGljZSgwLCAxKTtcbiAgY29uc3QgZG9jdW1lbnRzID0gY3JlYXRlUmFuZG9tRG9jdW1lbnRzKG5vdywgZGF5cygxKSkuc2xpY2UoMCwgMSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGRvY3VtZW50cywgbWVkaWEgfSk7XG5cbiAgcmV0dXJuIDxNZWRpYUdhbGxlcnkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPE1lZGlhR2FsbGVyeSB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsMkJBQXVCO0FBRXZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsK0JBTU87QUFFUCwwQkFBNkI7QUFFN0IsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTywrQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsYUFBYSxpQ0FBTyxhQUFhO0FBQUEsRUFDakMsV0FBVyxjQUFjLGFBQWEsQ0FBQztBQUFBLEVBQ3ZDLE9BQU8sY0FBYyxTQUFTLENBQUM7QUFDakMsSUFMb0I7QUFPYixNQUFNLFlBQVksNkJBQW1CO0FBQzFDLFFBQU0sWUFBWSxvREFBc0IsOEJBQUssbUNBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFDaEUsUUFBTSxRQUFRLHVEQUF5QiwwQ0FBaUI7QUFDeEQsUUFBTSxRQUFRLFlBQVksRUFBRSxXQUFXLE1BQU0sQ0FBQztBQUU5QyxTQUFPLG9DQUFDO0FBQUEsT0FBaUI7QUFBQSxHQUFPO0FBQ2xDLEdBTnlCO0FBUWxCLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsUUFBTSxRQUFRLHVEQUF5QiwwQ0FBaUI7QUFDeEQsUUFBTSxRQUFRLFlBQVksRUFBRSxNQUFNLENBQUM7QUFFbkMsU0FBTyxvQ0FBQztBQUFBLE9BQWlCO0FBQUEsR0FBTztBQUNsQyxHQUwyQjtBQU9wQixNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFFBQU0sWUFBWSx1REFBeUIsOENBQXFCO0FBQ2hFLFFBQU0sUUFBUSxZQUFZLEVBQUUsVUFBVSxDQUFDO0FBRXZDLFNBQU8sb0NBQUM7QUFBQSxPQUFpQjtBQUFBLEdBQU87QUFDbEMsR0FMdUI7QUFPaEIsTUFBTSxVQUFVLDZCQUFtQjtBQUN4QyxRQUFNLFFBQVEsZ0RBQWtCLDhCQUFLLG1DQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ3hELFFBQU0sWUFBWSxvREFBc0IsOEJBQUssbUNBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFFaEUsUUFBTSxRQUFRLFlBQVksRUFBRSxXQUFXLE1BQU0sQ0FBQztBQUU5QyxTQUFPLG9DQUFDO0FBQUEsT0FBaUI7QUFBQSxHQUFPO0FBQ2xDLEdBUHVCO0FBU2hCLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxRQUFRLFlBQVk7QUFFMUIsU0FBTyxvQ0FBQztBQUFBLE9BQWlCO0FBQUEsR0FBTztBQUNsQyxHQUpxQjsiLAogICJuYW1lcyI6IFtdCn0K
