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
var AttachmentSection_stories_exports = {};
__export(AttachmentSection_stories_exports, {
  Documents: () => Documents,
  Media: () => Media,
  createPreparedMediaItems: () => createPreparedMediaItems,
  createRandomDocuments: () => createRandomDocuments,
  createRandomMedia: () => createRandomMedia,
  days: () => days,
  default: () => AttachmentSection_stories_default,
  now: () => now
});
module.exports = __toCommonJS(AttachmentSection_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_lodash = require("lodash");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_AttachmentSection = require("./AttachmentSection");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var AttachmentSection_stories_default = {
  title: "Components/Conversation/MediaGallery/AttachmentSection"
};
const now = Date.now();
const DAY_MS = 24 * 60 * 60 * 1e3;
const days = /* @__PURE__ */ __name((n) => n * DAY_MS, "days");
const tokens = ["foo", "bar", "baz", "qux", "quux"];
const contentTypes = {
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  mp4: "video/mp4",
  docx: "application/text",
  pdf: "application/pdf",
  txt: "application/text"
};
const createRandomFile = /* @__PURE__ */ __name((startTime, timeWindow, fileExtension) => {
  const contentType = contentTypes[fileExtension];
  const fileName = `${(0, import_lodash.sample)(tokens)}${(0, import_lodash.sample)(tokens)}.${fileExtension}`;
  return {
    contentType,
    message: {
      conversationId: "123",
      id: (0, import_lodash.random)(now).toString(),
      received_at: Math.floor(Math.random() * 10),
      received_at_ms: (0, import_lodash.random)(startTime, startTime + timeWindow),
      attachments: [],
      sent_at: Date.now()
    },
    attachment: {
      url: "",
      fileName,
      size: (0, import_lodash.random)(1e3, 1e3 * 1e3 * 50),
      contentType
    },
    index: 0,
    thumbnailObjectUrl: `https://placekitten.com/${(0, import_lodash.random)(50, 150)}/${(0, import_lodash.random)(50, 150)}`
  };
}, "createRandomFile");
const createRandomFiles = /* @__PURE__ */ __name((startTime, timeWindow, fileExtensions) => (0, import_lodash.range)((0, import_lodash.random)(5, 10)).map(() => createRandomFile(startTime, timeWindow, (0, import_lodash.sample)(fileExtensions))), "createRandomFiles");
const createRandomDocuments = /* @__PURE__ */ __name((startTime, timeWindow) => createRandomFiles(startTime, timeWindow, ["docx", "pdf", "txt"]), "createRandomDocuments");
const createRandomMedia = /* @__PURE__ */ __name((startTime, timeWindow) => createRandomFiles(startTime, timeWindow, ["mp4", "jpg", "png", "gif"]), "createRandomMedia");
const createPreparedMediaItems = /* @__PURE__ */ __name((fn) => (0, import_lodash.sortBy)([
  ...fn(now, days(1)),
  ...fn(now - days(1), days(1)),
  ...fn(now - days(3), days(3)),
  ...fn(now - days(30), days(15)),
  ...fn(now - days(365), days(300))
], (item) => -item.message.received_at), "createPreparedMediaItems");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  header: (0, import_addon_knobs.text)("header", "Today"),
  type: (0, import_addon_knobs.select)("type", { media: "media", documents: "documents" }, overrideProps.type || "media"),
  mediaItems: overrideProps.mediaItems || []
}), "createProps");
const Documents = /* @__PURE__ */ __name(() => {
  const mediaItems = createRandomDocuments(now, days(1));
  const props = createProps({ mediaItems, type: "documents" });
  return /* @__PURE__ */ React.createElement(import_AttachmentSection.AttachmentSection, {
    ...props
  });
}, "Documents");
const Media = /* @__PURE__ */ __name(() => {
  const mediaItems = createRandomMedia(now, days(1));
  const props = createProps({ mediaItems, type: "media" });
  return /* @__PURE__ */ React.createElement(import_AttachmentSection.AttachmentSection, {
    ...props
  });
}, "Media");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Documents,
  Media,
  createPreparedMediaItems,
  createRandomDocuments,
  createRandomMedia,
  days,
  now
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudFNlY3Rpb24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlcyAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzZWxlY3QsIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IHJhbmRvbSwgcmFuZ2UsIHNhbXBsZSwgc29ydEJ5IH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IE1JTUVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgdHlwZSB7IE1lZGlhSXRlbVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9NZWRpYUl0ZW0nO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9BdHRhY2htZW50U2VjdGlvbic7XG5pbXBvcnQgeyBBdHRhY2htZW50U2VjdGlvbiB9IGZyb20gJy4vQXR0YWNobWVudFNlY3Rpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vTWVkaWFHYWxsZXJ5L0F0dGFjaG1lbnRTZWN0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuY29uc3QgREFZX01TID0gMjQgKiA2MCAqIDYwICogMTAwMDtcbmV4cG9ydCBjb25zdCBkYXlzID0gKG46IG51bWJlcikgPT4gbiAqIERBWV9NUztcbmNvbnN0IHRva2VucyA9IFsnZm9vJywgJ2JhcicsICdiYXonLCAncXV4JywgJ3F1dXgnXTtcblxuY29uc3QgY29udGVudFR5cGVzID0ge1xuICBnaWY6ICdpbWFnZS9naWYnLFxuICBqcGc6ICdpbWFnZS9qcGVnJyxcbiAgcG5nOiAnaW1hZ2UvcG5nJyxcbiAgbXA0OiAndmlkZW8vbXA0JyxcbiAgZG9jeDogJ2FwcGxpY2F0aW9uL3RleHQnLFxuICBwZGY6ICdhcHBsaWNhdGlvbi9wZGYnLFxuICB0eHQ6ICdhcHBsaWNhdGlvbi90ZXh0Jyxcbn0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCBNSU1FVHlwZT47XG5cbmNvbnN0IGNyZWF0ZVJhbmRvbUZpbGUgPSAoXG4gIHN0YXJ0VGltZTogbnVtYmVyLFxuICB0aW1lV2luZG93OiBudW1iZXIsXG4gIGZpbGVFeHRlbnNpb246IHN0cmluZ1xuKTogTWVkaWFJdGVtVHlwZSA9PiB7XG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gY29udGVudFR5cGVzW2ZpbGVFeHRlbnNpb25dO1xuICBjb25zdCBmaWxlTmFtZSA9IGAke3NhbXBsZSh0b2tlbnMpfSR7c2FtcGxlKHRva2Vucyl9LiR7ZmlsZUV4dGVuc2lvbn1gO1xuXG4gIHJldHVybiB7XG4gICAgY29udGVudFR5cGUsXG4gICAgbWVzc2FnZToge1xuICAgICAgY29udmVyc2F0aW9uSWQ6ICcxMjMnLFxuICAgICAgaWQ6IHJhbmRvbShub3cpLnRvU3RyaW5nKCksXG4gICAgICByZWNlaXZlZF9hdDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxuICAgICAgcmVjZWl2ZWRfYXRfbXM6IHJhbmRvbShzdGFydFRpbWUsIHN0YXJ0VGltZSArIHRpbWVXaW5kb3cpLFxuICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgc2VudF9hdDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgIHVybDogJycsXG4gICAgICBmaWxlTmFtZSxcbiAgICAgIHNpemU6IHJhbmRvbSgxMDAwLCAxMDAwICogMTAwMCAqIDUwKSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgIH0sXG4gICAgaW5kZXg6IDAsXG4gICAgdGh1bWJuYWlsT2JqZWN0VXJsOiBgaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vJHtyYW5kb20oNTAsIDE1MCl9LyR7cmFuZG9tKFxuICAgICAgNTAsXG4gICAgICAxNTBcbiAgICApfWAsXG4gIH07XG59O1xuXG5jb25zdCBjcmVhdGVSYW5kb21GaWxlcyA9IChcbiAgc3RhcnRUaW1lOiBudW1iZXIsXG4gIHRpbWVXaW5kb3c6IG51bWJlcixcbiAgZmlsZUV4dGVuc2lvbnM6IEFycmF5PHN0cmluZz5cbikgPT5cbiAgcmFuZ2UocmFuZG9tKDUsIDEwKSkubWFwKCgpID0+XG4gICAgY3JlYXRlUmFuZG9tRmlsZShzdGFydFRpbWUsIHRpbWVXaW5kb3csIHNhbXBsZShmaWxlRXh0ZW5zaW9ucykgYXMgc3RyaW5nKVxuICApO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUmFuZG9tRG9jdW1lbnRzID0gKHN0YXJ0VGltZTogbnVtYmVyLCB0aW1lV2luZG93OiBudW1iZXIpID0+XG4gIGNyZWF0ZVJhbmRvbUZpbGVzKHN0YXJ0VGltZSwgdGltZVdpbmRvdywgWydkb2N4JywgJ3BkZicsICd0eHQnXSk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSYW5kb21NZWRpYSA9IChzdGFydFRpbWU6IG51bWJlciwgdGltZVdpbmRvdzogbnVtYmVyKSA9PlxuICBjcmVhdGVSYW5kb21GaWxlcyhzdGFydFRpbWUsIHRpbWVXaW5kb3csIFsnbXA0JywgJ2pwZycsICdwbmcnLCAnZ2lmJ10pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUHJlcGFyZWRNZWRpYUl0ZW1zID0gKFxuICBmbjogdHlwZW9mIGNyZWF0ZVJhbmRvbURvY3VtZW50cyB8IHR5cGVvZiBjcmVhdGVSYW5kb21NZWRpYVxuKSA9PlxuICBzb3J0QnkoXG4gICAgW1xuICAgICAgLi4uZm4obm93LCBkYXlzKDEpKSxcbiAgICAgIC4uLmZuKG5vdyAtIGRheXMoMSksIGRheXMoMSkpLFxuICAgICAgLi4uZm4obm93IC0gZGF5cygzKSwgZGF5cygzKSksXG4gICAgICAuLi5mbihub3cgLSBkYXlzKDMwKSwgZGF5cygxNSkpLFxuICAgICAgLi4uZm4obm93IC0gZGF5cygzNjUpLCBkYXlzKDMwMCkpLFxuICAgIF0sXG4gICAgKGl0ZW06IE1lZGlhSXRlbVR5cGUpID0+IC1pdGVtLm1lc3NhZ2UucmVjZWl2ZWRfYXRcbiAgKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGkxOG4sXG4gIGhlYWRlcjogdGV4dCgnaGVhZGVyJywgJ1RvZGF5JyksXG4gIHR5cGU6IHNlbGVjdChcbiAgICAndHlwZScsXG4gICAgeyBtZWRpYTogJ21lZGlhJywgZG9jdW1lbnRzOiAnZG9jdW1lbnRzJyB9LFxuICAgIG92ZXJyaWRlUHJvcHMudHlwZSB8fCAnbWVkaWEnXG4gICksXG4gIG1lZGlhSXRlbXM6IG92ZXJyaWRlUHJvcHMubWVkaWFJdGVtcyB8fCBbXSxcbn0pO1xuXG5leHBvcnQgY29uc3QgRG9jdW1lbnRzID0gKCkgPT4ge1xuICBjb25zdCBtZWRpYUl0ZW1zID0gY3JlYXRlUmFuZG9tRG9jdW1lbnRzKG5vdywgZGF5cygxKSk7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBtZWRpYUl0ZW1zLCB0eXBlOiAnZG9jdW1lbnRzJyB9KTtcblxuICByZXR1cm4gPEF0dGFjaG1lbnRTZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTWVkaWEgPSAoKSA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbXMgPSBjcmVhdGVSYW5kb21NZWRpYShub3csIGRheXMoMSkpO1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgbWVkaWFJdGVtcywgdHlwZTogJ21lZGlhJyB9KTtcblxuICByZXR1cm4gPEF0dGFjaG1lbnRTZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsWUFBdUI7QUFDdkIseUJBQTZCO0FBQzdCLG9CQUE4QztBQUU5Qyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBS3ZCLCtCQUFrQztBQUVsQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLG9DQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLE1BQU0sS0FBSyxJQUFJO0FBQzVCLE1BQU0sU0FBUyxLQUFLLEtBQUssS0FBSztBQUN2QixNQUFNLE9BQU8sd0JBQUMsTUFBYyxJQUFJLFFBQW5CO0FBQ3BCLE1BQU0sU0FBUyxDQUFDLE9BQU8sT0FBTyxPQUFPLE9BQU8sTUFBTTtBQUVsRCxNQUFNLGVBQWU7QUFBQSxFQUNuQixLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQ1A7QUFFQSxNQUFNLG1CQUFtQix3QkFDdkIsV0FDQSxZQUNBLGtCQUNrQjtBQUNsQixRQUFNLGNBQWMsYUFBYTtBQUNqQyxRQUFNLFdBQVcsR0FBRywwQkFBTyxNQUFNLElBQUksMEJBQU8sTUFBTSxLQUFLO0FBRXZELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQSxNQUNoQixJQUFJLDBCQUFPLEdBQUcsRUFBRSxTQUFTO0FBQUEsTUFDekIsYUFBYSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksRUFBRTtBQUFBLE1BQzFDLGdCQUFnQiwwQkFBTyxXQUFXLFlBQVksVUFBVTtBQUFBLE1BQ3hELGFBQWEsQ0FBQztBQUFBLE1BQ2QsU0FBUyxLQUFLLElBQUk7QUFBQSxJQUNwQjtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsS0FBSztBQUFBLE1BQ0w7QUFBQSxNQUNBLE1BQU0sMEJBQU8sS0FBTSxNQUFPLE1BQU8sRUFBRTtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1Asb0JBQW9CLDJCQUEyQiwwQkFBTyxJQUFJLEdBQUcsS0FBSywwQkFDaEUsSUFDQSxHQUNGO0FBQUEsRUFDRjtBQUNGLEdBOUJ5QjtBQWdDekIsTUFBTSxvQkFBb0Isd0JBQ3hCLFdBQ0EsWUFDQSxtQkFFQSx5QkFBTSwwQkFBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksTUFDdkIsaUJBQWlCLFdBQVcsWUFBWSwwQkFBTyxjQUFjLENBQVcsQ0FDMUUsR0FQd0I7QUFTbkIsTUFBTSx3QkFBd0Isd0JBQUMsV0FBbUIsZUFDdkQsa0JBQWtCLFdBQVcsWUFBWSxDQUFDLFFBQVEsT0FBTyxLQUFLLENBQUMsR0FENUI7QUFHOUIsTUFBTSxvQkFBb0Isd0JBQUMsV0FBbUIsZUFDbkQsa0JBQWtCLFdBQVcsWUFBWSxDQUFDLE9BQU8sT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUR0QztBQUcxQixNQUFNLDJCQUEyQix3QkFDdEMsT0FFQSwwQkFDRTtBQUFBLEVBQ0UsR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7QUFBQSxFQUNsQixHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQzVCLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDNUIsR0FBRyxHQUFHLE1BQU0sS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUM5QixHQUFHLEdBQUcsTUFBTSxLQUFLLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQztBQUNsQyxHQUNBLENBQUMsU0FBd0IsQ0FBQyxLQUFLLFFBQVEsV0FDekMsR0Fac0M7QUFjeEMsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsUUFBUSw2QkFBSyxVQUFVLE9BQU87QUFBQSxFQUM5QixNQUFNLCtCQUNKLFFBQ0EsRUFBRSxPQUFPLFNBQVMsV0FBVyxZQUFZLEdBQ3pDLGNBQWMsUUFBUSxPQUN4QjtBQUFBLEVBQ0EsWUFBWSxjQUFjLGNBQWMsQ0FBQztBQUMzQyxJQVRvQjtBQVdiLE1BQU0sWUFBWSw2QkFBTTtBQUM3QixRQUFNLGFBQWEsc0JBQXNCLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDckQsUUFBTSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBRTNELFNBQU8sb0NBQUM7QUFBQSxPQUFzQjtBQUFBLEdBQU87QUFDdkMsR0FMeUI7QUFPbEIsTUFBTSxRQUFRLDZCQUFNO0FBQ3pCLFFBQU0sYUFBYSxrQkFBa0IsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUNqRCxRQUFNLFFBQVEsWUFBWSxFQUFFLFlBQVksTUFBTSxRQUFRLENBQUM7QUFFdkQsU0FBTyxvQ0FBQztBQUFBLE9BQXNCO0FBQUEsR0FBTztBQUN2QyxHQUxxQjsiLAogICJuYW1lcyI6IFtdCn0K
