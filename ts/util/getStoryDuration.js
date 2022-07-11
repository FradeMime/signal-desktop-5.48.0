var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getStoryDuration_exports = {};
__export(getStoryDuration_exports, {
  getStoryDuration: () => getStoryDuration
});
module.exports = __toCommonJS(getStoryDuration_exports);
var import_Attachment = require("../types/Attachment");
var import_grapheme = require("./grapheme");
var import_durations = require("./durations");
const DEFAULT_DURATION = 5 * import_durations.SECOND;
const MAX_VIDEO_DURATION = 30 * import_durations.SECOND;
const MIN_TEXT_DURATION = 3 * import_durations.SECOND;
async function getStoryDuration(attachment) {
  if (!(0, import_Attachment.isDownloaded)(attachment) || (0, import_Attachment.hasNotResolved)(attachment)) {
    return;
  }
  if ((0, import_Attachment.isGIF)([attachment]) || (0, import_Attachment.isVideo)([attachment])) {
    const videoEl = document.createElement("video");
    if (!attachment.url) {
      return DEFAULT_DURATION;
    }
    videoEl.src = attachment.url;
    await new Promise((resolve) => {
      function resolveAndRemove() {
        resolve();
        videoEl.removeEventListener("loadedmetadata", resolveAndRemove);
      }
      videoEl.addEventListener("loadedmetadata", resolveAndRemove);
    });
    const duration = Math.ceil(videoEl.duration * import_durations.SECOND);
    if ((0, import_Attachment.isGIF)([attachment])) {
      return Math.min(Math.max(duration * 3, DEFAULT_DURATION), MAX_VIDEO_DURATION);
    }
    return Math.min(duration, MAX_VIDEO_DURATION);
  }
  if (attachment.textAttachment && attachment.textAttachment.text) {
    const length = (0, import_grapheme.count)(attachment.textAttachment.text);
    const additionalSeconds = (Math.ceil(length / 15) - 1) * import_durations.SECOND;
    const linkPreviewSeconds = attachment.textAttachment.preview ? 2 * import_durations.SECOND : 0;
    return MIN_TEXT_DURATION + additionalSeconds + linkPreviewSeconds;
  }
  return DEFAULT_DURATION;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStoryDuration
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RvcnlEdXJhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQge1xuICBoYXNOb3RSZXNvbHZlZCxcbiAgaXNEb3dubG9hZGVkLFxuICBpc0dJRixcbiAgaXNWaWRlbyxcbn0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBjb3VudCB9IGZyb20gJy4vZ3JhcGhlbWUnO1xuaW1wb3J0IHsgU0VDT05EIH0gZnJvbSAnLi9kdXJhdGlvbnMnO1xuXG5jb25zdCBERUZBVUxUX0RVUkFUSU9OID0gNSAqIFNFQ09ORDtcbmNvbnN0IE1BWF9WSURFT19EVVJBVElPTiA9IDMwICogU0VDT05EO1xuY29uc3QgTUlOX1RFWFRfRFVSQVRJT04gPSAzICogU0VDT05EO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcnlEdXJhdGlvbihcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGVcbik6IFByb21pc2U8bnVtYmVyIHwgdW5kZWZpbmVkPiB7XG4gIGlmICghaXNEb3dubG9hZGVkKGF0dGFjaG1lbnQpIHx8IGhhc05vdFJlc29sdmVkKGF0dGFjaG1lbnQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzR0lGKFthdHRhY2htZW50XSkgfHwgaXNWaWRlbyhbYXR0YWNobWVudF0pKSB7XG4gICAgY29uc3QgdmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgaWYgKCFhdHRhY2htZW50LnVybCkge1xuICAgICAgcmV0dXJuIERFRkFVTFRfRFVSQVRJT047XG4gICAgfVxuICAgIHZpZGVvRWwuc3JjID0gYXR0YWNobWVudC51cmw7XG5cbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVBbmRSZW1vdmUoKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgdmlkZW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIHJlc29sdmVBbmRSZW1vdmUpO1xuICAgICAgfVxuXG4gICAgICB2aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgcmVzb2x2ZUFuZFJlbW92ZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGguY2VpbCh2aWRlb0VsLmR1cmF0aW9uICogU0VDT05EKTtcblxuICAgIGlmIChpc0dJRihbYXR0YWNobWVudF0pKSB7XG4gICAgICAvLyBHSUZzOiBMb29wIGdpZnMgMyB0aW1lcyBvciBwbGF5IGZvciA1IHNlY29uZHMsIHdoaWNoZXZlciBpcyBsb25nZXIuXG4gICAgICByZXR1cm4gTWF0aC5taW4oXG4gICAgICAgIE1hdGgubWF4KGR1cmF0aW9uICogMywgREVGQVVMVF9EVVJBVElPTiksXG4gICAgICAgIE1BWF9WSURFT19EVVJBVElPTlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBWaWRlbyBtYXggZHVyYXRpb246IDMwIHNlY29uZHNcbiAgICByZXR1cm4gTWF0aC5taW4oZHVyYXRpb24sIE1BWF9WSURFT19EVVJBVElPTik7XG4gIH1cblxuICBpZiAoYXR0YWNobWVudC50ZXh0QXR0YWNobWVudCAmJiBhdHRhY2htZW50LnRleHRBdHRhY2htZW50LnRleHQpIHtcbiAgICAvLyBNaW5pbXVtIDMgc2Vjb25kcy4gKzEgc2Vjb25kIGZvciBldmVyeSAxNSBjaGFyYWN0ZXJzIHBhc3QgdGhlIGZpcnN0XG4gICAgLy8gMTUgY2hhcmFjdGVycyAocm91bmQgdXApLlxuICAgIC8vIEZvciB0ZXh0IHN0b3JpZXMgdGhhdCBpbmNsdWRlIGEgbGluaywgKzIgc2Vjb25kcyB0byB0aGUgcGxheWJhY2sgdGltZS5cbiAgICBjb25zdCBsZW5ndGggPSBjb3VudChhdHRhY2htZW50LnRleHRBdHRhY2htZW50LnRleHQpO1xuICAgIGNvbnN0IGFkZGl0aW9uYWxTZWNvbmRzID0gKE1hdGguY2VpbChsZW5ndGggLyAxNSkgLSAxKSAqIFNFQ09ORDtcbiAgICBjb25zdCBsaW5rUHJldmlld1NlY29uZHMgPSBhdHRhY2htZW50LnRleHRBdHRhY2htZW50LnByZXZpZXdcbiAgICAgID8gMiAqIFNFQ09ORFxuICAgICAgOiAwO1xuICAgIHJldHVybiBNSU5fVEVYVF9EVVJBVElPTiArIGFkZGl0aW9uYWxTZWNvbmRzICsgbGlua1ByZXZpZXdTZWNvbmRzO1xuICB9XG5cbiAgcmV0dXJuIERFRkFVTFRfRFVSQVRJT047XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsd0JBS087QUFDUCxzQkFBc0I7QUFDdEIsdUJBQXVCO0FBRXZCLE1BQU0sbUJBQW1CLElBQUk7QUFDN0IsTUFBTSxxQkFBcUIsS0FBSztBQUNoQyxNQUFNLG9CQUFvQixJQUFJO0FBRTlCLGdDQUNFLFlBQzZCO0FBQzdCLE1BQUksQ0FBQyxvQ0FBYSxVQUFVLEtBQUssc0NBQWUsVUFBVSxHQUFHO0FBQzNEO0FBQUEsRUFDRjtBQUVBLE1BQUksNkJBQU0sQ0FBQyxVQUFVLENBQUMsS0FBSywrQkFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHO0FBQ2hELFVBQU0sVUFBVSxTQUFTLGNBQWMsT0FBTztBQUM5QyxRQUFJLENBQUMsV0FBVyxLQUFLO0FBQ25CLGFBQU87QUFBQSxJQUNUO0FBQ0EsWUFBUSxNQUFNLFdBQVc7QUFFekIsVUFBTSxJQUFJLFFBQWMsYUFBVztBQUNqQyxrQ0FBNEI7QUFDMUIsZ0JBQVE7QUFDUixnQkFBUSxvQkFBb0Isa0JBQWtCLGdCQUFnQjtBQUFBLE1BQ2hFO0FBSFMsQUFLVCxjQUFRLGlCQUFpQixrQkFBa0IsZ0JBQWdCO0FBQUEsSUFDN0QsQ0FBQztBQUVELFVBQU0sV0FBVyxLQUFLLEtBQUssUUFBUSxXQUFXLHVCQUFNO0FBRXBELFFBQUksNkJBQU0sQ0FBQyxVQUFVLENBQUMsR0FBRztBQUV2QixhQUFPLEtBQUssSUFDVixLQUFLLElBQUksV0FBVyxHQUFHLGdCQUFnQixHQUN2QyxrQkFDRjtBQUFBLElBQ0Y7QUFHQSxXQUFPLEtBQUssSUFBSSxVQUFVLGtCQUFrQjtBQUFBLEVBQzlDO0FBRUEsTUFBSSxXQUFXLGtCQUFrQixXQUFXLGVBQWUsTUFBTTtBQUkvRCxVQUFNLFNBQVMsMkJBQU0sV0FBVyxlQUFlLElBQUk7QUFDbkQsVUFBTSxvQkFBcUIsTUFBSyxLQUFLLFNBQVMsRUFBRSxJQUFJLEtBQUs7QUFDekQsVUFBTSxxQkFBcUIsV0FBVyxlQUFlLFVBQ2pELElBQUksMEJBQ0o7QUFDSixXQUFPLG9CQUFvQixvQkFBb0I7QUFBQSxFQUNqRDtBQUVBLFNBQU87QUFDVDtBQWxEc0IiLAogICJuYW1lcyI6IFtdCn0K
