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
var Attachment_exports = {};
__export(Attachment_exports, {
  TextAttachmentStyleType: () => TextAttachmentStyleType,
  _replaceUnicodeOrderOverridesSync: () => _replaceUnicodeOrderOverridesSync,
  areAllAttachmentsVisual: () => areAllAttachmentsVisual,
  autoOrientJPEG: () => autoOrientJPEG,
  canBeDownloaded: () => canBeDownloaded,
  canBeTranscoded: () => canBeTranscoded,
  canDisplayImage: () => canDisplayImage,
  captureDimensionsAndScreenshot: () => captureDimensionsAndScreenshot,
  defaultBlurHash: () => defaultBlurHash,
  deleteData: () => deleteData,
  getAlt: () => getAlt,
  getExtensionForDisplay: () => getExtensionForDisplay,
  getFileExtension: () => getFileExtension,
  getGridDimensions: () => getGridDimensions,
  getImageDimensions: () => getImageDimensions,
  getMaximumAttachmentSize: () => getMaximumAttachmentSize,
  getSuggestedFilename: () => getSuggestedFilename,
  getThumbnailUrl: () => getThumbnailUrl,
  getUrl: () => getUrl,
  hasData: () => hasData,
  hasImage: () => hasImage,
  hasNotResolved: () => hasNotResolved,
  hasVideoBlurHash: () => hasVideoBlurHash,
  hasVideoScreenshot: () => hasVideoScreenshot,
  isAudio: () => isAudio,
  isDownloaded: () => isDownloaded,
  isDownloading: () => isDownloading,
  isFile: () => isFile,
  isGIF: () => isGIF,
  isImage: () => isImage,
  isImageAttachment: () => isImageAttachment,
  isValid: () => isValid,
  isVideo: () => isVideo,
  isVideoAttachment: () => isVideoAttachment,
  isVisualMedia: () => isVisualMedia,
  isVoiceMessage: () => isVoiceMessage,
  loadData: () => loadData,
  migrateDataToFileSystem: () => migrateDataToFileSystem,
  removeSchemaVersion: () => removeSchemaVersion,
  replaceUnicodeOrderOverrides: () => replaceUnicodeOrderOverrides,
  replaceUnicodeV2: () => replaceUnicodeV2,
  save: () => save
});
module.exports = __toCommonJS(Attachment_exports);
var import_is = __toESM(require("@sindresorhus/is"));
var import_moment = __toESM(require("moment"));
var import_lodash = require("lodash");
var import_blob_util = require("blob-util");
var MIME = __toESM(require("./MIME"));
var log = __toESM(require("../logging/log"));
var import_errors = require("./errors");
var import_protobuf = require("../protobuf");
var import_GoogleChrome = require("../util/GoogleChrome");
var import_Util = require("./Util");
var import_scaleImageToLevel = require("../util/scaleImageToLevel");
var GoogleChrome = __toESM(require("../util/GoogleChrome"));
var import_parseIntOrThrow = require("../util/parseIntOrThrow");
var import_RemoteConfig = require("../RemoteConfig");
const MAX_WIDTH = 300;
const MAX_HEIGHT = MAX_WIDTH * 1.5;
const MIN_WIDTH = 200;
const MIN_HEIGHT = 50;
var TextAttachmentStyleType = /* @__PURE__ */ ((TextAttachmentStyleType2) => {
  TextAttachmentStyleType2[TextAttachmentStyleType2["DEFAULT"] = 0] = "DEFAULT";
  TextAttachmentStyleType2[TextAttachmentStyleType2["REGULAR"] = 1] = "REGULAR";
  TextAttachmentStyleType2[TextAttachmentStyleType2["BOLD"] = 2] = "BOLD";
  TextAttachmentStyleType2[TextAttachmentStyleType2["SERIF"] = 3] = "SERIF";
  TextAttachmentStyleType2[TextAttachmentStyleType2["SCRIPT"] = 4] = "SCRIPT";
  TextAttachmentStyleType2[TextAttachmentStyleType2["CONDENSED"] = 5] = "CONDENSED";
  return TextAttachmentStyleType2;
})(TextAttachmentStyleType || {});
async function migrateDataToFileSystem(attachment, {
  writeNewAttachmentData
}) {
  if (!(0, import_lodash.isFunction)(writeNewAttachmentData)) {
    throw new TypeError("'writeNewAttachmentData' must be a function");
  }
  const { data } = attachment;
  const attachmentHasData = !(0, import_lodash.isUndefined)(data);
  const shouldSkipSchemaUpgrade = !attachmentHasData;
  if (shouldSkipSchemaUpgrade) {
    return attachment;
  }
  if (!(0, import_lodash.isTypedArray)(data)) {
    throw new TypeError(`Expected \`attachment.data\` to be a typed array; got: ${typeof attachment.data}`);
  }
  const path = await writeNewAttachmentData(data);
  const attachmentWithoutData = (0, import_lodash.omit)({ ...attachment, path }, ["data"]);
  return attachmentWithoutData;
}
function isValid(rawAttachment) {
  if (!rawAttachment) {
    return false;
  }
  return true;
}
async function autoOrientJPEG(attachment, _, {
  sendHQImages = false,
  isIncoming = false
} = {}) {
  if (isIncoming && !MIME.isJPEG(attachment.contentType)) {
    return attachment;
  }
  if (!canBeTranscoded(attachment)) {
    return attachment;
  }
  if (!attachment.data || sendHQImages) {
    return attachment;
  }
  const dataBlob = new Blob([attachment.data], {
    type: attachment.contentType
  });
  const { blob: xcodedDataBlob } = await (0, import_scaleImageToLevel.scaleImageToLevel)(dataBlob, attachment.contentType, isIncoming);
  const xcodedDataArrayBuffer = await (0, import_blob_util.blobToArrayBuffer)(xcodedDataBlob);
  const xcodedAttachment = {
    ...(0, import_lodash.omit)(attachment, "digest"),
    data: new Uint8Array(xcodedDataArrayBuffer),
    size: xcodedDataArrayBuffer.byteLength
  };
  return xcodedAttachment;
}
const UNICODE_LEFT_TO_RIGHT_OVERRIDE = "\u202D";
const UNICODE_RIGHT_TO_LEFT_OVERRIDE = "\u202E";
const UNICODE_REPLACEMENT_CHARACTER = "\uFFFD";
const INVALID_CHARACTERS_PATTERN = new RegExp(`[${UNICODE_LEFT_TO_RIGHT_OVERRIDE}${UNICODE_RIGHT_TO_LEFT_OVERRIDE}]`, "g");
function _replaceUnicodeOrderOverridesSync(attachment) {
  if (!import_is.default.string(attachment.fileName)) {
    return attachment;
  }
  const normalizedFilename = attachment.fileName.replace(INVALID_CHARACTERS_PATTERN, UNICODE_REPLACEMENT_CHARACTER);
  const newAttachment = { ...attachment, fileName: normalizedFilename };
  return newAttachment;
}
const replaceUnicodeOrderOverrides = /* @__PURE__ */ __name(async (attachment) => {
  return _replaceUnicodeOrderOverridesSync(attachment);
}, "replaceUnicodeOrderOverrides");
const V2_UNWANTED_UNICODE = /[\u202A-\u202E\u2066-\u2069\u200E\u200F\u061C]/g;
async function replaceUnicodeV2(attachment) {
  if (!import_is.default.string(attachment.fileName)) {
    return attachment;
  }
  const fileName = attachment.fileName.replace(V2_UNWANTED_UNICODE, UNICODE_REPLACEMENT_CHARACTER);
  return {
    ...attachment,
    fileName
  };
}
function removeSchemaVersion({
  attachment,
  logger
}) {
  if (!isValid(attachment)) {
    logger.error("Attachment.removeSchemaVersion: Invalid input attachment:", attachment);
    return attachment;
  }
  return (0, import_lodash.omit)(attachment, "schemaVersion");
}
function hasData(attachment) {
  return attachment.data instanceof Uint8Array;
}
function loadData(readAttachmentData) {
  if (!import_is.default.function_(readAttachmentData)) {
    throw new TypeError("'readAttachmentData' must be a function");
  }
  return async (attachment) => {
    if (!isValid(attachment)) {
      throw new TypeError("'attachment' is not valid");
    }
    const isAlreadyLoaded = Boolean(attachment.data);
    if (isAlreadyLoaded) {
      return attachment;
    }
    if (!import_is.default.string(attachment.path)) {
      throw new TypeError("'attachment.path' is required");
    }
    const data = await readAttachmentData(attachment.path);
    return { ...attachment, data, size: data.byteLength };
  };
}
function deleteData(deleteOnDisk) {
  if (!import_is.default.function_(deleteOnDisk)) {
    throw new TypeError("deleteData: deleteOnDisk must be a function");
  }
  return async (attachment) => {
    if (!isValid(attachment)) {
      throw new TypeError("deleteData: attachment is not valid");
    }
    const { path, thumbnail, screenshot } = attachment;
    if (import_is.default.string(path)) {
      await deleteOnDisk(path);
    }
    if (thumbnail && import_is.default.string(thumbnail.path)) {
      await deleteOnDisk(thumbnail.path);
    }
    if (screenshot && import_is.default.string(screenshot.path)) {
      await deleteOnDisk(screenshot.path);
    }
  };
}
const THUMBNAIL_SIZE = 150;
const THUMBNAIL_CONTENT_TYPE = MIME.IMAGE_PNG;
async function captureDimensionsAndScreenshot(attachment, params) {
  const { contentType } = attachment;
  const {
    writeNewAttachmentData,
    getAbsoluteAttachmentPath,
    makeObjectUrl,
    revokeObjectUrl,
    getImageDimensions: getImageDimensionsFromURL,
    makeImageThumbnail,
    makeVideoScreenshot,
    logger
  } = params;
  if (!GoogleChrome.isImageTypeSupported(contentType) && !GoogleChrome.isVideoTypeSupported(contentType)) {
    return attachment;
  }
  if (!attachment.path) {
    return attachment;
  }
  const absolutePath = getAbsoluteAttachmentPath(attachment.path);
  if (GoogleChrome.isImageTypeSupported(contentType)) {
    try {
      const { width, height } = await getImageDimensionsFromURL({
        objectUrl: absolutePath,
        logger
      });
      const thumbnailBuffer = await (0, import_blob_util.blobToArrayBuffer)(await makeImageThumbnail({
        size: THUMBNAIL_SIZE,
        objectUrl: absolutePath,
        contentType: THUMBNAIL_CONTENT_TYPE,
        logger
      }));
      const thumbnailPath = await writeNewAttachmentData(new Uint8Array(thumbnailBuffer));
      return {
        ...attachment,
        width,
        height,
        thumbnail: {
          path: thumbnailPath,
          contentType: THUMBNAIL_CONTENT_TYPE,
          width: THUMBNAIL_SIZE,
          height: THUMBNAIL_SIZE
        }
      };
    } catch (error) {
      logger.error("captureDimensionsAndScreenshot:", "error processing image; skipping screenshot generation", (0, import_errors.toLogFormat)(error));
      return attachment;
    }
  }
  let screenshotObjectUrl;
  try {
    const screenshotBuffer = await (0, import_blob_util.blobToArrayBuffer)(await makeVideoScreenshot({
      objectUrl: absolutePath,
      contentType: THUMBNAIL_CONTENT_TYPE,
      logger
    }));
    screenshotObjectUrl = makeObjectUrl(screenshotBuffer, THUMBNAIL_CONTENT_TYPE);
    const { width, height } = await getImageDimensionsFromURL({
      objectUrl: screenshotObjectUrl,
      logger
    });
    const screenshotPath = await writeNewAttachmentData(new Uint8Array(screenshotBuffer));
    const thumbnailBuffer = await (0, import_blob_util.blobToArrayBuffer)(await makeImageThumbnail({
      size: THUMBNAIL_SIZE,
      objectUrl: screenshotObjectUrl,
      contentType: THUMBNAIL_CONTENT_TYPE,
      logger
    }));
    const thumbnailPath = await writeNewAttachmentData(new Uint8Array(thumbnailBuffer));
    return {
      ...attachment,
      screenshot: {
        contentType: THUMBNAIL_CONTENT_TYPE,
        path: screenshotPath,
        width,
        height
      },
      thumbnail: {
        path: thumbnailPath,
        contentType: THUMBNAIL_CONTENT_TYPE,
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE
      },
      width,
      height
    };
  } catch (error) {
    logger.error("captureDimensionsAndScreenshot: error processing video; skipping screenshot generation", (0, import_errors.toLogFormat)(error));
    return attachment;
  } finally {
    if (screenshotObjectUrl !== void 0) {
      revokeObjectUrl(screenshotObjectUrl);
    }
  }
}
function getExtensionForDisplay({
  fileName,
  contentType
}) {
  if (fileName && fileName.indexOf(".") >= 0) {
    const lastPeriod = fileName.lastIndexOf(".");
    const extension = fileName.slice(lastPeriod + 1);
    if (extension.length) {
      return extension;
    }
  }
  if (!contentType) {
    return void 0;
  }
  const slash = contentType.indexOf("/");
  if (slash >= 0) {
    return contentType.slice(slash + 1);
  }
  return void 0;
}
function isAudio(attachments) {
  return Boolean(attachments && attachments[0] && attachments[0].contentType && !attachments[0].isCorrupted && MIME.isAudio(attachments[0].contentType));
}
function canDisplayImage(attachments) {
  const { height, width } = attachments && attachments[0] ? attachments[0] : { height: 0, width: 0 };
  return Boolean(height && height > 0 && height <= 4096 && width && width > 0 && width <= 4096);
}
function getThumbnailUrl(attachment) {
  if (attachment.thumbnail) {
    return attachment.thumbnail.url;
  }
  return getUrl(attachment);
}
function getUrl(attachment) {
  if (attachment.screenshot) {
    return attachment.screenshot.url;
  }
  if (isVideoAttachment(attachment)) {
    return void 0;
  }
  return attachment.url;
}
function isImage(attachments) {
  return Boolean(attachments && attachments[0] && attachments[0].contentType && (0, import_GoogleChrome.isImageTypeSupported)(attachments[0].contentType));
}
function isImageAttachment(attachment) {
  return Boolean(attachment && attachment.contentType && (0, import_GoogleChrome.isImageTypeSupported)(attachment.contentType));
}
function canBeTranscoded(attachment) {
  return Boolean(attachment && isImageAttachment(attachment) && !MIME.isGif(attachment.contentType));
}
function hasImage(attachments) {
  return Boolean(attachments && attachments[0] && (attachments[0].url || attachments[0].pending || attachments[0].blurHash));
}
function isVideo(attachments) {
  if (!attachments || attachments.length === 0) {
    return false;
  }
  return isVideoAttachment(attachments[0]);
}
function isVideoAttachment(attachment) {
  if (!attachment || !attachment.contentType) {
    return false;
  }
  return (0, import_GoogleChrome.isVideoTypeSupported)(attachment.contentType);
}
function isGIF(attachments) {
  if (!attachments || attachments.length !== 1) {
    return false;
  }
  const [attachment] = attachments;
  const flag = import_protobuf.SignalService.AttachmentPointer.Flags.GIF;
  const hasFlag = !import_is.default.undefined(attachment.flags) && (attachment.flags & flag) === flag;
  return hasFlag && isVideoAttachment(attachment);
}
function isDownloaded(attachment) {
  return Boolean(attachment && (attachment.path || attachment.textAttachment));
}
function hasNotResolved(attachment) {
  return Boolean(attachment && !attachment.url && !attachment.textAttachment);
}
function isDownloading(attachment) {
  return Boolean(attachment && attachment.downloadJobId && attachment.pending);
}
function hasVideoBlurHash(attachments) {
  const firstAttachment = attachments ? attachments[0] : null;
  return Boolean(firstAttachment && firstAttachment.blurHash);
}
function hasVideoScreenshot(attachments) {
  const firstAttachment = attachments ? attachments[0] : null;
  return firstAttachment && firstAttachment.screenshot && firstAttachment.screenshot.url;
}
function getImageDimensions(attachment, forcedWidth) {
  const { height, width } = attachment;
  if (!height || !width) {
    return {
      height: MIN_HEIGHT,
      width: MIN_WIDTH
    };
  }
  const aspectRatio = height / width;
  const targetWidth = forcedWidth || Math.max(Math.min(MAX_WIDTH, width), MIN_WIDTH);
  const candidateHeight = Math.round(targetWidth * aspectRatio);
  return {
    width: targetWidth,
    height: Math.max(Math.min(MAX_HEIGHT, candidateHeight), MIN_HEIGHT)
  };
}
function areAllAttachmentsVisual(attachments) {
  if (!attachments) {
    return false;
  }
  const max = attachments.length;
  for (let i = 0; i < max; i += 1) {
    const attachment = attachments[i];
    if (!isImageAttachment(attachment) && !isVideoAttachment(attachment)) {
      return false;
    }
  }
  return true;
}
function getGridDimensions(attachments) {
  if (!attachments || !attachments.length) {
    return null;
  }
  if (!isImage(attachments) && !isVideo(attachments)) {
    return null;
  }
  if (attachments.length === 1) {
    return getImageDimensions(attachments[0]);
  }
  if (attachments.length === 2) {
    return {
      height: 150,
      width: 300
    };
  }
  if (attachments.length === 3) {
    return {
      height: 200,
      width: 300
    };
  }
  if (attachments.length === 4) {
    return {
      height: 300,
      width: 300
    };
  }
  return {
    height: 250,
    width: 300
  };
}
function getAlt(attachment, i18n) {
  if (isVideoAttachment(attachment)) {
    return i18n("videoAttachmentAlt");
  }
  return i18n("imageAttachmentAlt");
}
const isVisualMedia = /* @__PURE__ */ __name((attachment) => {
  const { contentType } = attachment;
  if (import_is.default.undefined(contentType)) {
    return false;
  }
  if (isVoiceMessage(attachment)) {
    return false;
  }
  return MIME.isImage(contentType) || MIME.isVideo(contentType);
}, "isVisualMedia");
const isFile = /* @__PURE__ */ __name((attachment) => {
  const { contentType } = attachment;
  if (import_is.default.undefined(contentType)) {
    return false;
  }
  if (isVisualMedia(attachment)) {
    return false;
  }
  if (isVoiceMessage(attachment)) {
    return false;
  }
  return true;
}, "isFile");
const isVoiceMessage = /* @__PURE__ */ __name((attachment) => {
  const flag = import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE;
  const hasFlag = !import_is.default.undefined(attachment.flags) && (attachment.flags & flag) === flag;
  if (hasFlag) {
    return true;
  }
  const isLegacyAndroidVoiceMessage = !import_is.default.undefined(attachment.contentType) && MIME.isAudio(attachment.contentType) && !attachment.fileName;
  if (isLegacyAndroidVoiceMessage) {
    return true;
  }
  return false;
}, "isVoiceMessage");
const save = /* @__PURE__ */ __name(async ({
  attachment,
  index,
  readAttachmentData,
  saveAttachmentToDisk,
  timestamp
}) => {
  let data;
  if (attachment.path) {
    data = await readAttachmentData(attachment.path);
  } else if (attachment.data) {
    data = attachment.data;
  } else {
    throw new Error("Attachment had neither path nor data");
  }
  const name = getSuggestedFilename({ attachment, timestamp, index });
  const result = await saveAttachmentToDisk({
    data,
    name
  });
  if (!result) {
    return null;
  }
  return result.fullPath;
}, "save");
const getSuggestedFilename = /* @__PURE__ */ __name(({
  attachment,
  timestamp,
  index
}) => {
  if (!(0, import_lodash.isNumber)(index) && attachment.fileName) {
    return attachment.fileName;
  }
  const prefix = "signal";
  const suffix = timestamp ? (0, import_moment.default)(timestamp).format("-YYYY-MM-DD-HHmmss") : "";
  const fileType = getFileExtension(attachment);
  const extension = fileType ? `.${fileType}` : "";
  const indexSuffix = index ? `_${(0, import_lodash.padStart)(index.toString(), 3, "0")}` : "";
  return `${prefix}${suffix}${indexSuffix}${extension}`;
}, "getSuggestedFilename");
const getFileExtension = /* @__PURE__ */ __name((attachment) => {
  if (!attachment.contentType) {
    return void 0;
  }
  switch (attachment.contentType) {
    case "video/quicktime":
      return "mov";
    default:
      return attachment.contentType.split("/")[1];
  }
}, "getFileExtension");
const MEBIBYTE = 1024 * 1024;
const DEFAULT_MAX = 100 * MEBIBYTE;
const getMaximumAttachmentSize = /* @__PURE__ */ __name(() => {
  try {
    return (0, import_parseIntOrThrow.parseIntOrThrow)((0, import_RemoteConfig.getValue)("global.attachments.maxBytes"), "preProcessAttachment/maxAttachmentSize");
  } catch (error) {
    log.warn("Failed to parse integer out of global.attachments.maxBytes feature flag");
    return DEFAULT_MAX;
  }
}, "getMaximumAttachmentSize");
const defaultBlurHash = /* @__PURE__ */ __name((theme = import_Util.ThemeType.light) => {
  if (theme === import_Util.ThemeType.dark) {
    return "L05OQnoffQofoffQfQfQfQfQfQfQ";
  }
  return "L1Q]+w-;fQ-;~qfQfQfQfQfQfQfQ";
}, "defaultBlurHash");
const canBeDownloaded = /* @__PURE__ */ __name((attachment) => {
  return Boolean(attachment.key && attachment.digest);
}, "canBeDownloaded");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TextAttachmentStyleType,
  _replaceUnicodeOrderOverridesSync,
  areAllAttachmentsVisual,
  autoOrientJPEG,
  canBeDownloaded,
  canBeTranscoded,
  canDisplayImage,
  captureDimensionsAndScreenshot,
  defaultBlurHash,
  deleteData,
  getAlt,
  getExtensionForDisplay,
  getFileExtension,
  getGridDimensions,
  getImageDimensions,
  getMaximumAttachmentSize,
  getSuggestedFilename,
  getThumbnailUrl,
  getUrl,
  hasData,
  hasImage,
  hasNotResolved,
  hasVideoBlurHash,
  hasVideoScreenshot,
  isAudio,
  isDownloaded,
  isDownloading,
  isFile,
  isGIF,
  isImage,
  isImageAttachment,
  isValid,
  isVideo,
  isVideoAttachment,
  isVisualMedia,
  isVoiceMessage,
  loadData,
  migrateDataToFileSystem,
  removeSchemaVersion,
  replaceUnicodeOrderOverrides,
  replaceUnicodeV2,
  save
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBpcyBmcm9tICdAc2luZHJlc29yaHVzL2lzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gIGlzTnVtYmVyLFxuICBwYWRTdGFydCxcbiAgaXNUeXBlZEFycmF5LFxuICBpc0Z1bmN0aW9uLFxuICBpc1VuZGVmaW5lZCxcbiAgb21pdCxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGJsb2JUb0FycmF5QnVmZmVyIH0gZnJvbSAnYmxvYi11dGlsJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi9Mb2dnaW5nJztcbmltcG9ydCAqIGFzIE1JTUUgZnJvbSAnLi9NSU1FJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyB0b0xvZ0Zvcm1hdCB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQge1xuICBpc0ltYWdlVHlwZVN1cHBvcnRlZCxcbiAgaXNWaWRlb1R5cGVTdXBwb3J0ZWQsXG59IGZyb20gJy4uL3V0aWwvR29vZ2xlQ2hyb21lJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4vVXRpbCc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHsgc2NhbGVJbWFnZVRvTGV2ZWwgfSBmcm9tICcuLi91dGlsL3NjYWxlSW1hZ2VUb0xldmVsJztcbmltcG9ydCAqIGFzIEdvb2dsZUNocm9tZSBmcm9tICcuLi91dGlsL0dvb2dsZUNocm9tZSc7XG5pbXBvcnQgeyBwYXJzZUludE9yVGhyb3cgfSBmcm9tICcuLi91dGlsL3BhcnNlSW50T3JUaHJvdyc7XG5pbXBvcnQgeyBnZXRWYWx1ZSB9IGZyb20gJy4uL1JlbW90ZUNvbmZpZyc7XG5cbmNvbnN0IE1BWF9XSURUSCA9IDMwMDtcbmNvbnN0IE1BWF9IRUlHSFQgPSBNQVhfV0lEVEggKiAxLjU7XG5jb25zdCBNSU5fV0lEVEggPSAyMDA7XG5jb25zdCBNSU5fSEVJR0hUID0gNTA7XG5cbi8vIFVzZWQgZm9yIGRpc3BsYXlcblxuZXhwb3J0IHR5cGUgQXR0YWNobWVudFR5cGUgPSB7XG4gIGVycm9yPzogYm9vbGVhbjtcbiAgYmx1ckhhc2g/OiBzdHJpbmc7XG4gIGNhcHRpb24/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlOiBNSU1FLk1JTUVUeXBlO1xuICBmaWxlTmFtZT86IHN0cmluZztcbiAgLyoqIE5vdCBpbmNsdWRlZCBpbiBwcm90b2J1ZiwgbmVlZHMgdG8gYmUgcHVsbGVkIGZyb20gZmxhZ3MgKi9cbiAgaXNWb2ljZU1lc3NhZ2U/OiBib29sZWFuO1xuICAvKiogRm9yIG1lc3NhZ2VzIG5vdCBhbHJlYWR5IG9uIGRpc2ssIHRoaXMgd2lsbCBiZSBhIGRhdGEgdXJsICovXG4gIHVybD86IHN0cmluZztcbiAgc2l6ZTogbnVtYmVyO1xuICBmaWxlU2l6ZT86IHN0cmluZztcbiAgcGVuZGluZz86IGJvb2xlYW47XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIHNjcmVlbnNob3Q/OiB7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICB1cmw/OiBzdHJpbmc7XG4gICAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGRhdGE/OiBVaW50OEFycmF5O1xuICB9O1xuICBzY3JlZW5zaG90RGF0YT86IFVpbnQ4QXJyYXk7XG4gIHNjcmVlbnNob3RQYXRoPzogc3RyaW5nO1xuICBmbGFncz86IG51bWJlcjtcbiAgdGh1bWJuYWlsPzogVGh1bWJuYWlsVHlwZTtcbiAgaXNDb3JydXB0ZWQ/OiBib29sZWFuO1xuICBkb3dubG9hZEpvYklkPzogc3RyaW5nO1xuICBjZG5OdW1iZXI/OiBudW1iZXI7XG4gIGNkbklkPzogc3RyaW5nO1xuICBjZG5LZXk/OiBzdHJpbmc7XG4gIGRhdGE/OiBVaW50OEFycmF5O1xuICB0ZXh0QXR0YWNobWVudD86IFRleHRBdHRhY2htZW50VHlwZTtcblxuICAvKiogTGVnYWN5IGZpZWxkLiBVc2VkIG9ubHkgZm9yIGRvd25sb2FkaW5nIG9sZCBhdHRhY2htZW50cyAqL1xuICBpZD86IG51bWJlcjtcblxuICAvKiogTGVnYWN5IGZpZWxkLCB1c2VkIGxvbmcgYWdvIGZvciBtaWdyYXRpbmcgYXR0YWNobWVudHMgdG8gZGlzay4gKi9cbiAgc2NoZW1hVmVyc2lvbj86IG51bWJlcjtcblxuICAvKiogUmVtb3ZlZCBvbmNlIHdlIGRvd25sb2FkIHRoZSBhdHRhY2htZW50ICovXG4gIGRpZ2VzdD86IHN0cmluZztcbiAga2V5Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQXR0YWNobWVudFdpdGhIeWRyYXRlZERhdGEgPSBBdHRhY2htZW50VHlwZSAmIHtcbiAgZGF0YTogVWludDhBcnJheTtcbn07XG5cbmV4cG9ydCBlbnVtIFRleHRBdHRhY2htZW50U3R5bGVUeXBlIHtcbiAgREVGQVVMVCA9IDAsXG4gIFJFR1VMQVIgPSAxLFxuICBCT0xEID0gMixcbiAgU0VSSUYgPSAzLFxuICBTQ1JJUFQgPSA0LFxuICBDT05ERU5TRUQgPSA1LFxufVxuXG5leHBvcnQgdHlwZSBUZXh0QXR0YWNobWVudFR5cGUgPSB7XG4gIHRleHQ/OiBzdHJpbmcgfCBudWxsO1xuICB0ZXh0U3R5bGU/OiBudW1iZXIgfCBudWxsO1xuICB0ZXh0Rm9yZWdyb3VuZENvbG9yPzogbnVtYmVyIHwgbnVsbDtcbiAgdGV4dEJhY2tncm91bmRDb2xvcj86IG51bWJlciB8IG51bGw7XG4gIHByZXZpZXc/OiB7XG4gICAgaW1hZ2U/OiBBdHRhY2htZW50VHlwZTtcbiAgICB0aXRsZT86IHN0cmluZyB8IG51bGw7XG4gICAgdXJsPzogc3RyaW5nIHwgbnVsbDtcbiAgfSB8IG51bGw7XG4gIGdyYWRpZW50Pzoge1xuICAgIHN0YXJ0Q29sb3I/OiBudW1iZXIgfCBudWxsO1xuICAgIGVuZENvbG9yPzogbnVtYmVyIHwgbnVsbDtcbiAgICBhbmdsZT86IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBjb2xvcj86IG51bWJlciB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBEb3dubG9hZGVkQXR0YWNobWVudFR5cGUgPSBBdHRhY2htZW50VHlwZSAmIHtcbiAgZGF0YTogVWludDhBcnJheTtcbn07XG5cbmV4cG9ydCB0eXBlIEJhc2VBdHRhY2htZW50RHJhZnRUeXBlID0ge1xuICBibHVySGFzaD86IHN0cmluZztcbiAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gIHNjcmVlbnNob3RDb250ZW50VHlwZT86IHN0cmluZztcbiAgc2NyZWVuc2hvdFNpemU/OiBudW1iZXI7XG4gIHNpemU6IG51bWJlcjtcbiAgZmxhZ3M/OiBudW1iZXI7XG59O1xuXG4vLyBBbiBlcGhlbWVyYWwgYXR0YWNobWVudCB0eXBlLCB1c2VkIGJldHdlZW4gdXNlcidzIHJlcXVlc3QgdG8gYWRkIHRoZSBhdHRhY2htZW50IGFzXG4vLyAgIGEgZHJhZnQgYW5kIGZpbmFsIHNhdmUgb24gZGlzayBhbmQgaW4gY29udmVyc2F0aW9uLmRyYWZ0QXR0YWNobWVudHMuXG5leHBvcnQgdHlwZSBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUgPVxuICB8ICh7XG4gICAgICBkYXRhOiBVaW50OEFycmF5O1xuICAgICAgcGVuZGluZzogZmFsc2U7XG4gICAgICBzY3JlZW5zaG90RGF0YT86IFVpbnQ4QXJyYXk7XG4gICAgICBmaWxlTmFtZT86IHN0cmluZztcbiAgICAgIHBhdGg/OiBzdHJpbmc7XG4gICAgfSAmIEJhc2VBdHRhY2htZW50RHJhZnRUeXBlKVxuICB8IHtcbiAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLk1JTUVUeXBlO1xuICAgICAgZmlsZU5hbWU/OiBzdHJpbmc7XG4gICAgICBwYXRoPzogc3RyaW5nO1xuICAgICAgcGVuZGluZzogdHJ1ZTtcbiAgICAgIHNpemU6IG51bWJlcjtcbiAgICB9O1xuXG4vLyBXaGF0J3Mgc3RvcmVkIGluIGNvbnZlcnNhdGlvbi5kcmFmdEF0dGFjaG1lbnRzXG5leHBvcnQgdHlwZSBBdHRhY2htZW50RHJhZnRUeXBlID1cbiAgfCAoe1xuICAgICAgdXJsPzogc3RyaW5nO1xuICAgICAgc2NyZWVuc2hvdFBhdGg/OiBzdHJpbmc7XG4gICAgICBwZW5kaW5nOiBmYWxzZTtcbiAgICAgIC8vIE9sZCBkcmFmdCBhdHRhY2htZW50cyBtYXkgaGF2ZSBhIGNhcHRpb24sIHRob3VnaCB0aGV5IGFyZSBubyBsb25nZXIgZWRpdGFibGVcbiAgICAgIC8vICAgYmVjYXVzZSB3ZSByZW1vdmVkIHRoZSBjYXB0aW9uIGVkaXRvci5cbiAgICAgIGNhcHRpb24/OiBzdHJpbmc7XG4gICAgICBmaWxlTmFtZT86IHN0cmluZztcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIHdpZHRoPzogbnVtYmVyO1xuICAgICAgaGVpZ2h0PzogbnVtYmVyO1xuICAgIH0gJiBCYXNlQXR0YWNobWVudERyYWZ0VHlwZSlcbiAgfCB7XG4gICAgICBjb250ZW50VHlwZTogTUlNRS5NSU1FVHlwZTtcbiAgICAgIGZpbGVOYW1lPzogc3RyaW5nO1xuICAgICAgcGF0aD86IHN0cmluZztcbiAgICAgIHBlbmRpbmc6IHRydWU7XG4gICAgICBzaXplOiBudW1iZXI7XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgVGh1bWJuYWlsVHlwZSA9IHtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuICB3aWR0aD86IG51bWJlcjtcbiAgdXJsPzogc3RyaW5nO1xuICBjb250ZW50VHlwZTogTUlNRS5NSU1FVHlwZTtcbiAgcGF0aD86IHN0cmluZztcbiAgZGF0YT86IFVpbnQ4QXJyYXk7XG4gIC8vIE9ubHkgdXNlZCB3aGVuIHF1b3RlIG5lZWRlZCB0byBtYWtlIGFuIGluLW1lbW9yeSB0aHVtYm5haWxcbiAgb2JqZWN0VXJsPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAge1xuICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gIH06IHtcbiAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhOiAoZGF0YTogVWludDhBcnJheSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICB9XG4pOiBQcm9taXNlPEF0dGFjaG1lbnRUeXBlPiB7XG4gIGlmICghaXNGdW5jdGlvbih3cml0ZU5ld0F0dGFjaG1lbnREYXRhKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInd3JpdGVOZXdBdHRhY2htZW50RGF0YScgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgY29uc3QgeyBkYXRhIH0gPSBhdHRhY2htZW50O1xuICBjb25zdCBhdHRhY2htZW50SGFzRGF0YSA9ICFpc1VuZGVmaW5lZChkYXRhKTtcbiAgY29uc3Qgc2hvdWxkU2tpcFNjaGVtYVVwZ3JhZGUgPSAhYXR0YWNobWVudEhhc0RhdGE7XG4gIGlmIChzaG91bGRTa2lwU2NoZW1hVXBncmFkZSkge1xuICAgIHJldHVybiBhdHRhY2htZW50O1xuICB9XG5cbiAgaWYgKCFpc1R5cGVkQXJyYXkoZGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ0V4cGVjdGVkIGBhdHRhY2htZW50LmRhdGFgIHRvIGJlIGEgdHlwZWQgYXJyYXk7JyArXG4gICAgICAgIGAgZ290OiAke3R5cGVvZiBhdHRhY2htZW50LmRhdGF9YFxuICAgICk7XG4gIH1cblxuICBjb25zdCBwYXRoID0gYXdhaXQgd3JpdGVOZXdBdHRhY2htZW50RGF0YShkYXRhKTtcblxuICBjb25zdCBhdHRhY2htZW50V2l0aG91dERhdGEgPSBvbWl0KHsgLi4uYXR0YWNobWVudCwgcGF0aCB9LCBbJ2RhdGEnXSk7XG4gIHJldHVybiBhdHRhY2htZW50V2l0aG91dERhdGE7XG59XG5cbi8vIC8vIEluY29taW5nIG1lc3NhZ2UgYXR0YWNobWVudCBmaWVsZHNcbi8vIHtcbi8vICAgaWQ6IHN0cmluZ1xuLy8gICBjb250ZW50VHlwZTogTUlNRVR5cGVcbi8vICAgZGF0YTogVWludDhBcnJheVxuLy8gICBkaWdlc3Q6IFVpbnQ4QXJyYXlcbi8vICAgZmlsZU5hbWU/OiBzdHJpbmdcbi8vICAgZmxhZ3M6IG51bGxcbi8vICAga2V5OiBVaW50OEFycmF5XG4vLyAgIHNpemU6IGludGVnZXJcbi8vICAgdGh1bWJuYWlsOiBVaW50OEFycmF5XG4vLyB9XG5cbi8vIC8vIE91dGdvaW5nIG1lc3NhZ2UgYXR0YWNobWVudCBmaWVsZHNcbi8vIHtcbi8vICAgY29udGVudFR5cGU6IE1JTUVUeXBlXG4vLyAgIGRhdGE6IFVpbnQ4QXJyYXlcbi8vICAgZmlsZU5hbWU6IHN0cmluZ1xuLy8gICBzaXplOiBpbnRlZ2VyXG4vLyB9XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBgcmF3QXR0YWNobWVudGAgaXMgYSB2YWxpZCBhdHRhY2htZW50IGJhc2VkIG9uIG91ciBjdXJyZW50IHNjaGVtYS5cbi8vIE92ZXIgdGltZSwgd2UgY2FuIGV4cGFuZCB0aGlzIGRlZmluaXRpb24gdG8gYmVjb21lIG1vcmUgbmFycm93LCBlLmcuIHJlcXVpcmUgY2VydGFpblxuLy8gZmllbGRzLCBldGMuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChcbiAgcmF3QXR0YWNobWVudD86IEF0dGFjaG1lbnRUeXBlXG4pOiByYXdBdHRhY2htZW50IGlzIEF0dGFjaG1lbnRUeXBlIHtcbiAgLy8gTk9URTogV2UgY2Fubm90IHVzZSBgXy5pc1BsYWluT2JqZWN0YCBiZWNhdXNlIGByYXdBdHRhY2htZW50YCBpc1xuICAvLyBkZXNlcmlhbGl6ZWQgYnkgcHJvdG9idWY6XG4gIGlmICghcmF3QXR0YWNobWVudCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBVcGdyYWRlIHN0ZXBzXG4vLyBOT1RFOiBUaGlzIHN0ZXAgc3RyaXBzIGFsbCBFWElGIG1ldGFkYXRhIGZyb20gSlBFRyBpbWFnZXMgYXNcbi8vIHBhcnQgb2YgcmUtZW5jb2RpbmcgdGhlIGltYWdlOlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF1dG9PcmllbnRKUEVHKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAgXzogdW5rbm93bixcbiAge1xuICAgIHNlbmRIUUltYWdlcyA9IGZhbHNlLFxuICAgIGlzSW5jb21pbmcgPSBmYWxzZSxcbiAgfToge1xuICAgIHNlbmRIUUltYWdlcz86IGJvb2xlYW47XG4gICAgaXNJbmNvbWluZz86IGJvb2xlYW47XG4gIH0gPSB7fVxuKTogUHJvbWlzZTxBdHRhY2htZW50VHlwZT4ge1xuICBpZiAoaXNJbmNvbWluZyAmJiAhTUlNRS5pc0pQRUcoYXR0YWNobWVudC5jb250ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgfVxuXG4gIGlmICghY2FuQmVUcmFuc2NvZGVkKGF0dGFjaG1lbnQpKSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gIH1cblxuICAvLyBJZiB3ZSBoYXZlbid0IGRvd25sb2FkZWQgdGhlIGF0dGFjaG1lbnQgeWV0LCB3ZSB3b24ndCBoYXZlIHRoZSBkYXRhLlxuICAvLyBBbGwgaW1hZ2VzIGdvIHRocm91Z2ggaGFuZGxlSW1hZ2VBdHRhY2htZW50IGJlZm9yZSBiZWluZyBzZW50IGFuZCB0aHVzIGhhdmVcbiAgLy8gYWxyZWFkeSBiZWVuIHNjYWxlZCB0byBsZXZlbCwgb3JpZW50ZWQsIHN0cmlwcGVkIG9mIGV4aWYgZGF0YSwgYW5kIHNhdmVkXG4gIC8vIGluIGhpZ2ggcXVhbGl0eSBmb3JtYXQuIElmIHdlIHdhbnQgdG8gc2VuZCB0aGUgaW1hZ2UgaW4gSFEgd2UgY2FuIHJldHVyblxuICAvLyB0aGUgYXR0YWNobWVudCBhcy1pcy4gT3RoZXJ3aXNlIHdlJ2xsIGhhdmUgdG8gZnVydGhlciBzY2FsZSBpdCBkb3duLlxuICBpZiAoIWF0dGFjaG1lbnQuZGF0YSB8fCBzZW5kSFFJbWFnZXMpIHtcbiAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgfVxuXG4gIGNvbnN0IGRhdGFCbG9iID0gbmV3IEJsb2IoW2F0dGFjaG1lbnQuZGF0YV0sIHtcbiAgICB0eXBlOiBhdHRhY2htZW50LmNvbnRlbnRUeXBlLFxuICB9KTtcbiAgY29uc3QgeyBibG9iOiB4Y29kZWREYXRhQmxvYiB9ID0gYXdhaXQgc2NhbGVJbWFnZVRvTGV2ZWwoXG4gICAgZGF0YUJsb2IsXG4gICAgYXR0YWNobWVudC5jb250ZW50VHlwZSxcbiAgICBpc0luY29taW5nXG4gICk7XG4gIGNvbnN0IHhjb2RlZERhdGFBcnJheUJ1ZmZlciA9IGF3YWl0IGJsb2JUb0FycmF5QnVmZmVyKHhjb2RlZERhdGFCbG9iKTtcblxuICAvLyBJTVBPUlRBTlQ6IFdlIG92ZXJ3cml0ZSB0aGUgZXhpc3RpbmcgYGRhdGFgIGBVaW50OEFycmF5YCBsb3NpbmcgdGhlIG9yaWdpbmFsXG4gIC8vIGltYWdlIGRhdGEuIElkZWFsbHksIHdlXHUyMDE5ZCBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgaW1hZ2UgZGF0YSBmb3IgdXNlcnMgd2hvIHdhbnQgdG9cbiAgLy8gcmV0YWluIGl0IGJ1dCBkdWUgdG8gcmVwb3J0cyBvZiBkYXRhIGxvc3MsIHdlIGRvblx1MjAxOXQgd2FudCB0byBvdmVyYnVyZGVuIEluZGV4ZWREQlxuICAvLyBieSBwb3RlbnRpYWxseSBkb3VibGluZyBzdG9yZWQgaW1hZ2UgZGF0YS5cbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1EZXNrdG9wL2lzc3Vlcy8xNTg5XG4gIGNvbnN0IHhjb2RlZEF0dGFjaG1lbnQgPSB7XG4gICAgLy8gYGRpZ2VzdGAgaXMgbm8gbG9uZ2VyIHZhbGlkIGZvciBhdXRvLW9yaWVudGVkIGltYWdlIGRhdGEsIHNvIHdlIGRpc2NhcmQgaXQ6XG4gICAgLi4ub21pdChhdHRhY2htZW50LCAnZGlnZXN0JyksXG4gICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoeGNvZGVkRGF0YUFycmF5QnVmZmVyKSxcbiAgICBzaXplOiB4Y29kZWREYXRhQXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgfTtcblxuICByZXR1cm4geGNvZGVkQXR0YWNobWVudDtcbn1cblxuY29uc3QgVU5JQ09ERV9MRUZUX1RPX1JJR0hUX09WRVJSSURFID0gJ1xcdTIwMkQnO1xuY29uc3QgVU5JQ09ERV9SSUdIVF9UT19MRUZUX09WRVJSSURFID0gJ1xcdTIwMkUnO1xuY29uc3QgVU5JQ09ERV9SRVBMQUNFTUVOVF9DSEFSQUNURVIgPSAnXFx1RkZGRCc7XG5jb25zdCBJTlZBTElEX0NIQVJBQ1RFUlNfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gIGBbJHtVTklDT0RFX0xFRlRfVE9fUklHSFRfT1ZFUlJJREV9JHtVTklDT0RFX1JJR0hUX1RPX0xFRlRfT1ZFUlJJREV9XWAsXG4gICdnJ1xuKTtcblxuLy8gTk9URTogRXhwb3NlIHN5bmNocm9ub3VzIHZlcnNpb24gdG8gZG8gcHJvcGVydHktYmFzZWQgdGVzdGluZyB1c2luZyBgdGVzdGNoZWNrYCxcbi8vIHdoaWNoIGN1cnJlbnRseSBkb2Vzblx1MjAxOXQgc3VwcG9ydCBhc3luYyB0ZXN0aW5nOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2xlZWJ5cm9uL3Rlc3RjaGVjay1qcy9pc3N1ZXMvNDVcbmV4cG9ydCBmdW5jdGlvbiBfcmVwbGFjZVVuaWNvZGVPcmRlck92ZXJyaWRlc1N5bmMoXG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlXG4pOiBBdHRhY2htZW50VHlwZSB7XG4gIGlmICghaXMuc3RyaW5nKGF0dGFjaG1lbnQuZmlsZU5hbWUpKSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkRmlsZW5hbWUgPSBhdHRhY2htZW50LmZpbGVOYW1lLnJlcGxhY2UoXG4gICAgSU5WQUxJRF9DSEFSQUNURVJTX1BBVFRFUk4sXG4gICAgVU5JQ09ERV9SRVBMQUNFTUVOVF9DSEFSQUNURVJcbiAgKTtcbiAgY29uc3QgbmV3QXR0YWNobWVudCA9IHsgLi4uYXR0YWNobWVudCwgZmlsZU5hbWU6IG5vcm1hbGl6ZWRGaWxlbmFtZSB9O1xuXG4gIHJldHVybiBuZXdBdHRhY2htZW50O1xufVxuXG5leHBvcnQgY29uc3QgcmVwbGFjZVVuaWNvZGVPcmRlck92ZXJyaWRlcyA9IGFzeW5jIChcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGVcbik6IFByb21pc2U8QXR0YWNobWVudFR5cGU+ID0+IHtcbiAgcmV0dXJuIF9yZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzU3luYyhhdHRhY2htZW50KTtcbn07XG5cbi8vIFxcdTIwMkEtXFx1MjAyRSBpcyBMUkUsIFJMRSwgUERGLCBMUk8sIFJMT1xuLy8gXFx1MjA2Ni1cXHUyMDY5IGlzIExSSSwgUkxJLCBGU0ksIFBESVxuLy8gXFx1MjAwRSBpcyBMUk1cbi8vIFxcdTIwMEYgaXMgUkxNXG4vLyBcXHUwNjFDIGlzIEFMTVxuY29uc3QgVjJfVU5XQU5URURfVU5JQ09ERSA9IC9bXFx1MjAyQS1cXHUyMDJFXFx1MjA2Ni1cXHUyMDY5XFx1MjAwRVxcdTIwMEZcXHUwNjFDXS9nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVwbGFjZVVuaWNvZGVWMihcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGVcbik6IFByb21pc2U8QXR0YWNobWVudFR5cGU+IHtcbiAgaWYgKCFpcy5zdHJpbmcoYXR0YWNobWVudC5maWxlTmFtZSkpIHtcbiAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgfVxuXG4gIGNvbnN0IGZpbGVOYW1lID0gYXR0YWNobWVudC5maWxlTmFtZS5yZXBsYWNlKFxuICAgIFYyX1VOV0FOVEVEX1VOSUNPREUsXG4gICAgVU5JQ09ERV9SRVBMQUNFTUVOVF9DSEFSQUNURVJcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC4uLmF0dGFjaG1lbnQsXG4gICAgZmlsZU5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTY2hlbWFWZXJzaW9uKHtcbiAgYXR0YWNobWVudCxcbiAgbG9nZ2VyLFxufToge1xuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xufSk6IEF0dGFjaG1lbnRUeXBlIHtcbiAgaWYgKCFpc1ZhbGlkKGF0dGFjaG1lbnQpKSB7XG4gICAgbG9nZ2VyLmVycm9yKFxuICAgICAgJ0F0dGFjaG1lbnQucmVtb3ZlU2NoZW1hVmVyc2lvbjogSW52YWxpZCBpbnB1dCBhdHRhY2htZW50OicsXG4gICAgICBhdHRhY2htZW50XG4gICAgKTtcbiAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgfVxuXG4gIHJldHVybiBvbWl0KGF0dGFjaG1lbnQsICdzY2hlbWFWZXJzaW9uJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNEYXRhKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiBhdHRhY2htZW50LmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZERhdGEoXG4gIHJlYWRBdHRhY2htZW50RGF0YTogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTxVaW50OEFycmF5PlxuKTogKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKSA9PiBQcm9taXNlPEF0dGFjaG1lbnRXaXRoSHlkcmF0ZWREYXRhPiB7XG4gIGlmICghaXMuZnVuY3Rpb25fKHJlYWRBdHRhY2htZW50RGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ3JlYWRBdHRhY2htZW50RGF0YScgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgcmV0dXJuIGFzeW5jIChcbiAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuICApOiBQcm9taXNlPEF0dGFjaG1lbnRXaXRoSHlkcmF0ZWREYXRhPiA9PiB7XG4gICAgaWYgKCFpc1ZhbGlkKGF0dGFjaG1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2F0dGFjaG1lbnQnIGlzIG5vdCB2YWxpZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0FscmVhZHlMb2FkZWQgPSBCb29sZWFuKGF0dGFjaG1lbnQuZGF0YSk7XG4gICAgaWYgKGlzQWxyZWFkeUxvYWRlZCkge1xuICAgICAgcmV0dXJuIGF0dGFjaG1lbnQgYXMgQXR0YWNobWVudFdpdGhIeWRyYXRlZERhdGE7XG4gICAgfVxuXG4gICAgaWYgKCFpcy5zdHJpbmcoYXR0YWNobWVudC5wYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidhdHRhY2htZW50LnBhdGgnIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZWFkQXR0YWNobWVudERhdGEoYXR0YWNobWVudC5wYXRoKTtcbiAgICByZXR1cm4geyAuLi5hdHRhY2htZW50LCBkYXRhLCBzaXplOiBkYXRhLmJ5dGVMZW5ndGggfTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZURhdGEoXG4gIGRlbGV0ZU9uRGlzazogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPlxuKTogKGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZSkgPT4gUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghaXMuZnVuY3Rpb25fKGRlbGV0ZU9uRGlzaykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkZWxldGVEYXRhOiBkZWxldGVPbkRpc2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gYXN5bmMgKGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICghaXNWYWxpZChhdHRhY2htZW50KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGVsZXRlRGF0YTogYXR0YWNobWVudCBpcyBub3QgdmFsaWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHBhdGgsIHRodW1ibmFpbCwgc2NyZWVuc2hvdCB9ID0gYXR0YWNobWVudDtcbiAgICBpZiAoaXMuc3RyaW5nKHBhdGgpKSB7XG4gICAgICBhd2FpdCBkZWxldGVPbkRpc2socGF0aCk7XG4gICAgfVxuXG4gICAgaWYgKHRodW1ibmFpbCAmJiBpcy5zdHJpbmcodGh1bWJuYWlsLnBhdGgpKSB7XG4gICAgICBhd2FpdCBkZWxldGVPbkRpc2sodGh1bWJuYWlsLnBhdGgpO1xuICAgIH1cblxuICAgIGlmIChzY3JlZW5zaG90ICYmIGlzLnN0cmluZyhzY3JlZW5zaG90LnBhdGgpKSB7XG4gICAgICBhd2FpdCBkZWxldGVPbkRpc2soc2NyZWVuc2hvdC5wYXRoKTtcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IFRIVU1CTkFJTF9TSVpFID0gMTUwO1xuY29uc3QgVEhVTUJOQUlMX0NPTlRFTlRfVFlQRSA9IE1JTUUuSU1BR0VfUE5HO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FwdHVyZURpbWVuc2lvbnNBbmRTY3JlZW5zaG90KFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAgcGFyYW1zOiB7XG4gICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YTogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoOiAocGF0aDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gICAgbWFrZU9iamVjdFVybDogKFxuICAgICAgZGF0YTogVWludDhBcnJheSB8IEFycmF5QnVmZmVyLFxuICAgICAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGVcbiAgICApID0+IHN0cmluZztcbiAgICByZXZva2VPYmplY3RVcmw6IChwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgZ2V0SW1hZ2VEaW1lbnNpb25zOiAocGFyYW1zOiB7XG4gICAgICBvYmplY3RVcmw6IHN0cmluZztcbiAgICAgIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbiAgICB9KSA9PiBQcm9taXNlPHtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICB9PjtcbiAgICBtYWtlSW1hZ2VUaHVtYm5haWw6IChwYXJhbXM6IHtcbiAgICAgIHNpemU6IG51bWJlcjtcbiAgICAgIG9iamVjdFVybDogc3RyaW5nO1xuICAgICAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gICAgICBsb2dnZXI6IExvZ2dlclR5cGU7XG4gICAgfSkgPT4gUHJvbWlzZTxCbG9iPjtcbiAgICBtYWtlVmlkZW9TY3JlZW5zaG90OiAocGFyYW1zOiB7XG4gICAgICBvYmplY3RVcmw6IHN0cmluZztcbiAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLk1JTUVUeXBlO1xuICAgICAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICAgIH0pID0+IFByb21pc2U8QmxvYj47XG4gICAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICB9XG4pOiBQcm9taXNlPEF0dGFjaG1lbnRUeXBlPiB7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgY29uc3Qge1xuICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCxcbiAgICBtYWtlT2JqZWN0VXJsLFxuICAgIHJldm9rZU9iamVjdFVybCxcbiAgICBnZXRJbWFnZURpbWVuc2lvbnM6IGdldEltYWdlRGltZW5zaW9uc0Zyb21VUkwsXG4gICAgbWFrZUltYWdlVGh1bWJuYWlsLFxuICAgIG1ha2VWaWRlb1NjcmVlbnNob3QsXG4gICAgbG9nZ2VyLFxuICB9ID0gcGFyYW1zO1xuXG4gIGlmIChcbiAgICAhR29vZ2xlQ2hyb21lLmlzSW1hZ2VUeXBlU3VwcG9ydGVkKGNvbnRlbnRUeXBlKSAmJlxuICAgICFHb29nbGVDaHJvbWUuaXNWaWRlb1R5cGVTdXBwb3J0ZWQoY29udGVudFR5cGUpXG4gICkge1xuICAgIHJldHVybiBhdHRhY2htZW50O1xuICB9XG5cbiAgLy8gSWYgdGhlIGF0dGFjaG1lbnQgaGFzbid0IGJlZW4gZG93bmxvYWRlZCB5ZXQsIHdlIHdvbid0IGhhdmUgYSBwYXRoXG4gIGlmICghYXR0YWNobWVudC5wYXRoKSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gIH1cblxuICBjb25zdCBhYnNvbHV0ZVBhdGggPSBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKGF0dGFjaG1lbnQucGF0aCk7XG5cbiAgaWYgKEdvb2dsZUNocm9tZS5pc0ltYWdlVHlwZVN1cHBvcnRlZChjb250ZW50VHlwZSkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBhd2FpdCBnZXRJbWFnZURpbWVuc2lvbnNGcm9tVVJMKHtcbiAgICAgICAgb2JqZWN0VXJsOiBhYnNvbHV0ZVBhdGgsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdGh1bWJuYWlsQnVmZmVyID0gYXdhaXQgYmxvYlRvQXJyYXlCdWZmZXIoXG4gICAgICAgIGF3YWl0IG1ha2VJbWFnZVRodW1ibmFpbCh7XG4gICAgICAgICAgc2l6ZTogVEhVTUJOQUlMX1NJWkUsXG4gICAgICAgICAgb2JqZWN0VXJsOiBhYnNvbHV0ZVBhdGgsXG4gICAgICAgICAgY29udGVudFR5cGU6IFRIVU1CTkFJTF9DT05URU5UX1RZUEUsXG4gICAgICAgICAgbG9nZ2VyLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgdGh1bWJuYWlsUGF0aCA9IGF3YWl0IHdyaXRlTmV3QXR0YWNobWVudERhdGEoXG4gICAgICAgIG5ldyBVaW50OEFycmF5KHRodW1ibmFpbEJ1ZmZlcilcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hdHRhY2htZW50LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICBwYXRoOiB0aHVtYm5haWxQYXRoLFxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBUSFVNQk5BSUxfQ09OVEVOVF9UWVBFLFxuICAgICAgICAgIHdpZHRoOiBUSFVNQk5BSUxfU0laRSxcbiAgICAgICAgICBoZWlnaHQ6IFRIVU1CTkFJTF9TSVpFLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAnY2FwdHVyZURpbWVuc2lvbnNBbmRTY3JlZW5zaG90OicsXG4gICAgICAgICdlcnJvciBwcm9jZXNzaW5nIGltYWdlOyBza2lwcGluZyBzY3JlZW5zaG90IGdlbmVyYXRpb24nLFxuICAgICAgICB0b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgICB9XG4gIH1cblxuICBsZXQgc2NyZWVuc2hvdE9iamVjdFVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIGNvbnN0IHNjcmVlbnNob3RCdWZmZXIgPSBhd2FpdCBibG9iVG9BcnJheUJ1ZmZlcihcbiAgICAgIGF3YWl0IG1ha2VWaWRlb1NjcmVlbnNob3Qoe1xuICAgICAgICBvYmplY3RVcmw6IGFic29sdXRlUGF0aCxcbiAgICAgICAgY29udGVudFR5cGU6IFRIVU1CTkFJTF9DT05URU5UX1RZUEUsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pXG4gICAgKTtcbiAgICBzY3JlZW5zaG90T2JqZWN0VXJsID0gbWFrZU9iamVjdFVybChcbiAgICAgIHNjcmVlbnNob3RCdWZmZXIsXG4gICAgICBUSFVNQk5BSUxfQ09OVEVOVF9UWVBFXG4gICAgKTtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGF3YWl0IGdldEltYWdlRGltZW5zaW9uc0Zyb21VUkwoe1xuICAgICAgb2JqZWN0VXJsOiBzY3JlZW5zaG90T2JqZWN0VXJsLFxuICAgICAgbG9nZ2VyLFxuICAgIH0pO1xuICAgIGNvbnN0IHNjcmVlbnNob3RQYXRoID0gYXdhaXQgd3JpdGVOZXdBdHRhY2htZW50RGF0YShcbiAgICAgIG5ldyBVaW50OEFycmF5KHNjcmVlbnNob3RCdWZmZXIpXG4gICAgKTtcblxuICAgIGNvbnN0IHRodW1ibmFpbEJ1ZmZlciA9IGF3YWl0IGJsb2JUb0FycmF5QnVmZmVyKFxuICAgICAgYXdhaXQgbWFrZUltYWdlVGh1bWJuYWlsKHtcbiAgICAgICAgc2l6ZTogVEhVTUJOQUlMX1NJWkUsXG4gICAgICAgIG9iamVjdFVybDogc2NyZWVuc2hvdE9iamVjdFVybCxcbiAgICAgICAgY29udGVudFR5cGU6IFRIVU1CTkFJTF9DT05URU5UX1RZUEUsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHRodW1ibmFpbFBhdGggPSBhd2FpdCB3cml0ZU5ld0F0dGFjaG1lbnREYXRhKFxuICAgICAgbmV3IFVpbnQ4QXJyYXkodGh1bWJuYWlsQnVmZmVyKVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uYXR0YWNobWVudCxcbiAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgY29udGVudFR5cGU6IFRIVU1CTkFJTF9DT05URU5UX1RZUEUsXG4gICAgICAgIHBhdGg6IHNjcmVlbnNob3RQYXRoLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICBwYXRoOiB0aHVtYm5haWxQYXRoLFxuICAgICAgICBjb250ZW50VHlwZTogVEhVTUJOQUlMX0NPTlRFTlRfVFlQRSxcbiAgICAgICAgd2lkdGg6IFRIVU1CTkFJTF9TSVpFLFxuICAgICAgICBoZWlnaHQ6IFRIVU1CTkFJTF9TSVpFLFxuICAgICAgfSxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKFxuICAgICAgJ2NhcHR1cmVEaW1lbnNpb25zQW5kU2NyZWVuc2hvdDogZXJyb3IgcHJvY2Vzc2luZyB2aWRlbzsgc2tpcHBpbmcgc2NyZWVuc2hvdCBnZW5lcmF0aW9uJyxcbiAgICAgIHRvTG9nRm9ybWF0KGVycm9yKVxuICAgICk7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKHNjcmVlbnNob3RPYmplY3RVcmwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV2b2tlT2JqZWN0VXJsKHNjcmVlbnNob3RPYmplY3RVcmwpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBVSS1mb2N1c2VkIGZ1bmN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uRm9yRGlzcGxheSh7XG4gIGZpbGVOYW1lLFxuICBjb250ZW50VHlwZSxcbn06IHtcbiAgZmlsZU5hbWU/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlOiBNSU1FLk1JTUVUeXBlO1xufSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGlmIChmaWxlTmFtZSAmJiBmaWxlTmFtZS5pbmRleE9mKCcuJykgPj0gMCkge1xuICAgIGNvbnN0IGxhc3RQZXJpb2QgPSBmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpO1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGZpbGVOYW1lLnNsaWNlKGxhc3RQZXJpb2QgKyAxKTtcbiAgICBpZiAoZXh0ZW5zaW9uLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHNsYXNoID0gY29udGVudFR5cGUuaW5kZXhPZignLycpO1xuICBpZiAoc2xhc2ggPj0gMCkge1xuICAgIHJldHVybiBjb250ZW50VHlwZS5zbGljZShzbGFzaCArIDEpO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXVkaW8oYXR0YWNobWVudHM/OiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnRUeXBlPik6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBhdHRhY2htZW50cyAmJlxuICAgICAgYXR0YWNobWVudHNbMF0gJiZcbiAgICAgIGF0dGFjaG1lbnRzWzBdLmNvbnRlbnRUeXBlICYmXG4gICAgICAhYXR0YWNobWVudHNbMF0uaXNDb3JydXB0ZWQgJiZcbiAgICAgIE1JTUUuaXNBdWRpbyhhdHRhY2htZW50c1swXS5jb250ZW50VHlwZSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkRpc3BsYXlJbWFnZShcbiAgYXR0YWNobWVudHM/OiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnRUeXBlPlxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID1cbiAgICBhdHRhY2htZW50cyAmJiBhdHRhY2htZW50c1swXSA/IGF0dGFjaG1lbnRzWzBdIDogeyBoZWlnaHQ6IDAsIHdpZHRoOiAwIH07XG5cbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgaGVpZ2h0ICYmXG4gICAgICBoZWlnaHQgPiAwICYmXG4gICAgICBoZWlnaHQgPD0gNDA5NiAmJlxuICAgICAgd2lkdGggJiZcbiAgICAgIHdpZHRoID4gMCAmJlxuICAgICAgd2lkdGggPD0gNDA5NlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGh1bWJuYWlsVXJsKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGF0dGFjaG1lbnQudGh1bWJuYWlsKSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQudGh1bWJuYWlsLnVybDtcbiAgfVxuXG4gIHJldHVybiBnZXRVcmwoYXR0YWNobWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmwoYXR0YWNobWVudDogQXR0YWNobWVudFR5cGUpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoYXR0YWNobWVudC5zY3JlZW5zaG90KSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQuc2NyZWVuc2hvdC51cmw7XG4gIH1cblxuICBpZiAoaXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudCkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaG1lbnQudXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbWFnZShhdHRhY2htZW50cz86IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudFR5cGU+KTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIGF0dGFjaG1lbnRzICYmXG4gICAgICBhdHRhY2htZW50c1swXSAmJlxuICAgICAgYXR0YWNobWVudHNbMF0uY29udGVudFR5cGUgJiZcbiAgICAgIGlzSW1hZ2VUeXBlU3VwcG9ydGVkKGF0dGFjaG1lbnRzWzBdLmNvbnRlbnRUeXBlKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbWFnZUF0dGFjaG1lbnQoXG4gIGF0dGFjaG1lbnQ/OiBQaWNrPEF0dGFjaG1lbnRUeXBlLCAnY29udGVudFR5cGUnPlxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIGF0dGFjaG1lbnQgJiZcbiAgICAgIGF0dGFjaG1lbnQuY29udGVudFR5cGUgJiZcbiAgICAgIGlzSW1hZ2VUeXBlU3VwcG9ydGVkKGF0dGFjaG1lbnQuY29udGVudFR5cGUpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5CZVRyYW5zY29kZWQoXG4gIGF0dGFjaG1lbnQ/OiBQaWNrPEF0dGFjaG1lbnRUeXBlLCAnY29udGVudFR5cGUnPlxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIGF0dGFjaG1lbnQgJiZcbiAgICAgIGlzSW1hZ2VBdHRhY2htZW50KGF0dGFjaG1lbnQpICYmXG4gICAgICAhTUlNRS5pc0dpZihhdHRhY2htZW50LmNvbnRlbnRUeXBlKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzSW1hZ2UoYXR0YWNobWVudHM/OiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnRUeXBlPik6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBhdHRhY2htZW50cyAmJlxuICAgICAgYXR0YWNobWVudHNbMF0gJiZcbiAgICAgIChhdHRhY2htZW50c1swXS51cmwgfHwgYXR0YWNobWVudHNbMF0ucGVuZGluZyB8fCBhdHRhY2htZW50c1swXS5ibHVySGFzaClcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmlkZW8oYXR0YWNobWVudHM/OiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnRUeXBlPik6IGJvb2xlYW4ge1xuICBpZiAoIWF0dGFjaG1lbnRzIHx8IGF0dGFjaG1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudHNbMF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudD86IEF0dGFjaG1lbnRUeXBlKTogYm9vbGVhbiB7XG4gIGlmICghYXR0YWNobWVudCB8fCAhYXR0YWNobWVudC5jb250ZW50VHlwZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNWaWRlb1R5cGVTdXBwb3J0ZWQoYXR0YWNobWVudC5jb250ZW50VHlwZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0dJRihhdHRhY2htZW50cz86IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudFR5cGU+KTogYm9vbGVhbiB7XG4gIGlmICghYXR0YWNobWVudHMgfHwgYXR0YWNobWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgW2F0dGFjaG1lbnRdID0gYXR0YWNobWVudHM7XG5cbiAgY29uc3QgZmxhZyA9IFNpZ25hbFNlcnZpY2UuQXR0YWNobWVudFBvaW50ZXIuRmxhZ3MuR0lGO1xuICBjb25zdCBoYXNGbGFnID1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICFpcy51bmRlZmluZWQoYXR0YWNobWVudC5mbGFncykgJiYgKGF0dGFjaG1lbnQuZmxhZ3MgJiBmbGFnKSA9PT0gZmxhZztcblxuICByZXR1cm4gaGFzRmxhZyAmJiBpc1ZpZGVvQXR0YWNobWVudChhdHRhY2htZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRG93bmxvYWRlZChhdHRhY2htZW50PzogQXR0YWNobWVudFR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJvb2xlYW4oYXR0YWNobWVudCAmJiAoYXR0YWNobWVudC5wYXRoIHx8IGF0dGFjaG1lbnQudGV4dEF0dGFjaG1lbnQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc05vdFJlc29sdmVkKGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihhdHRhY2htZW50ICYmICFhdHRhY2htZW50LnVybCAmJiAhYXR0YWNobWVudC50ZXh0QXR0YWNobWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Rvd25sb2FkaW5nKGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihhdHRhY2htZW50ICYmIGF0dGFjaG1lbnQuZG93bmxvYWRKb2JJZCAmJiBhdHRhY2htZW50LnBlbmRpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzVmlkZW9CbHVySGFzaChhdHRhY2htZW50cz86IEFycmF5PEF0dGFjaG1lbnRUeXBlPik6IGJvb2xlYW4ge1xuICBjb25zdCBmaXJzdEF0dGFjaG1lbnQgPSBhdHRhY2htZW50cyA/IGF0dGFjaG1lbnRzWzBdIDogbnVsbDtcblxuICByZXR1cm4gQm9vbGVhbihmaXJzdEF0dGFjaG1lbnQgJiYgZmlyc3RBdHRhY2htZW50LmJsdXJIYXNoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1ZpZGVvU2NyZWVuc2hvdChcbiAgYXR0YWNobWVudHM/OiBBcnJheTxBdHRhY2htZW50VHlwZT5cbik6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQge1xuICBjb25zdCBmaXJzdEF0dGFjaG1lbnQgPSBhdHRhY2htZW50cyA/IGF0dGFjaG1lbnRzWzBdIDogbnVsbDtcblxuICByZXR1cm4gKFxuICAgIGZpcnN0QXR0YWNobWVudCAmJlxuICAgIGZpcnN0QXR0YWNobWVudC5zY3JlZW5zaG90ICYmXG4gICAgZmlyc3RBdHRhY2htZW50LnNjcmVlbnNob3QudXJsXG4gICk7XG59XG5cbnR5cGUgRGltZW5zaW9uc1R5cGUgPSB7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlRGltZW5zaW9ucyhcbiAgYXR0YWNobWVudDogUGljazxBdHRhY2htZW50VHlwZSwgJ3dpZHRoJyB8ICdoZWlnaHQnPixcbiAgZm9yY2VkV2lkdGg/OiBudW1iZXJcbik6IERpbWVuc2lvbnNUeXBlIHtcbiAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBhdHRhY2htZW50O1xuICBpZiAoIWhlaWdodCB8fCAhd2lkdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBNSU5fSEVJR0hULFxuICAgICAgd2lkdGg6IE1JTl9XSURUSCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgYXNwZWN0UmF0aW8gPSBoZWlnaHQgLyB3aWR0aDtcbiAgY29uc3QgdGFyZ2V0V2lkdGggPVxuICAgIGZvcmNlZFdpZHRoIHx8IE1hdGgubWF4KE1hdGgubWluKE1BWF9XSURUSCwgd2lkdGgpLCBNSU5fV0lEVEgpO1xuICBjb25zdCBjYW5kaWRhdGVIZWlnaHQgPSBNYXRoLnJvdW5kKHRhcmdldFdpZHRoICogYXNwZWN0UmF0aW8pO1xuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHRhcmdldFdpZHRoLFxuICAgIGhlaWdodDogTWF0aC5tYXgoTWF0aC5taW4oTUFYX0hFSUdIVCwgY2FuZGlkYXRlSGVpZ2h0KSwgTUlOX0hFSUdIVCksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVBbGxBdHRhY2htZW50c1Zpc3VhbChcbiAgYXR0YWNobWVudHM/OiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnRUeXBlPlxuKTogYm9vbGVhbiB7XG4gIGlmICghYXR0YWNobWVudHMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBtYXggPSBhdHRhY2htZW50cy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICBjb25zdCBhdHRhY2htZW50ID0gYXR0YWNobWVudHNbaV07XG4gICAgaWYgKCFpc0ltYWdlQXR0YWNobWVudChhdHRhY2htZW50KSAmJiAhaXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdyaWREaW1lbnNpb25zKFxuICBhdHRhY2htZW50cz86IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudFR5cGU+XG4pOiBudWxsIHwgRGltZW5zaW9uc1R5cGUge1xuICBpZiAoIWF0dGFjaG1lbnRzIHx8ICFhdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghaXNJbWFnZShhdHRhY2htZW50cykgJiYgIWlzVmlkZW8oYXR0YWNobWVudHMpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoYXR0YWNobWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGdldEltYWdlRGltZW5zaW9ucyhhdHRhY2htZW50c1swXSk7XG4gIH1cblxuICBpZiAoYXR0YWNobWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgLy8gQSBCXG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogMTUwLFxuICAgICAgd2lkdGg6IDMwMCxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGF0dGFjaG1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIC8vIEEgQSBCXG4gICAgLy8gQSBBIENcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICB3aWR0aDogMzAwLFxuICAgIH07XG4gIH1cblxuICBpZiAoYXR0YWNobWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgLy8gQSBCXG4gICAgLy8gQyBEXG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogMzAwLFxuICAgICAgd2lkdGg6IDMwMCxcbiAgICB9O1xuICB9XG5cbiAgLy8gQSBBIEEgQiBCIEJcbiAgLy8gQSBBIEEgQiBCIEJcbiAgLy8gQSBBIEEgQiBCIEJcbiAgLy8gQyBDIEQgRCBFIEVcbiAgLy8gQyBDIEQgRCBFIEVcbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IDI1MCxcbiAgICB3aWR0aDogMzAwLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWx0KFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAgaTE4bjogTG9jYWxpemVyVHlwZVxuKTogc3RyaW5nIHtcbiAgaWYgKGlzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnQpKSB7XG4gICAgcmV0dXJuIGkxOG4oJ3ZpZGVvQXR0YWNobWVudEFsdCcpO1xuICB9XG4gIHJldHVybiBpMThuKCdpbWFnZUF0dGFjaG1lbnRBbHQnKTtcbn1cblxuLy8gTWlncmF0aW9uLXJlbGF0ZWQgYXR0YWNobWVudCBzdHVmZlxuXG5leHBvcnQgY29uc3QgaXNWaXN1YWxNZWRpYSA9IChhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB7IGNvbnRlbnRUeXBlIH0gPSBhdHRhY2htZW50O1xuXG4gIGlmIChpcy51bmRlZmluZWQoY29udGVudFR5cGUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzVm9pY2VNZXNzYWdlKGF0dGFjaG1lbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIE1JTUUuaXNJbWFnZShjb250ZW50VHlwZSkgfHwgTUlNRS5pc1ZpZGVvKGNvbnRlbnRUeXBlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0ZpbGUgPSAoYXR0YWNobWVudDogQXR0YWNobWVudFR5cGUpOiBib29sZWFuID0+IHtcbiAgY29uc3QgeyBjb250ZW50VHlwZSB9ID0gYXR0YWNobWVudDtcblxuICBpZiAoaXMudW5kZWZpbmVkKGNvbnRlbnRUeXBlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc1Zpc3VhbE1lZGlhKGF0dGFjaG1lbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzVm9pY2VNZXNzYWdlKGF0dGFjaG1lbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgaXNWb2ljZU1lc3NhZ2UgPSAoYXR0YWNobWVudDogQXR0YWNobWVudFR5cGUpOiBib29sZWFuID0+IHtcbiAgY29uc3QgZmxhZyA9IFNpZ25hbFNlcnZpY2UuQXR0YWNobWVudFBvaW50ZXIuRmxhZ3MuVk9JQ0VfTUVTU0FHRTtcbiAgY29uc3QgaGFzRmxhZyA9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAhaXMudW5kZWZpbmVkKGF0dGFjaG1lbnQuZmxhZ3MpICYmIChhdHRhY2htZW50LmZsYWdzICYgZmxhZykgPT09IGZsYWc7XG4gIGlmIChoYXNGbGFnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBpc0xlZ2FjeUFuZHJvaWRWb2ljZU1lc3NhZ2UgPVxuICAgICFpcy51bmRlZmluZWQoYXR0YWNobWVudC5jb250ZW50VHlwZSkgJiZcbiAgICBNSU1FLmlzQXVkaW8oYXR0YWNobWVudC5jb250ZW50VHlwZSkgJiZcbiAgICAhYXR0YWNobWVudC5maWxlTmFtZTtcbiAgaWYgKGlzTGVnYWN5QW5kcm9pZFZvaWNlTWVzc2FnZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmUgPSBhc3luYyAoe1xuICBhdHRhY2htZW50LFxuICBpbmRleCxcbiAgcmVhZEF0dGFjaG1lbnREYXRhLFxuICBzYXZlQXR0YWNobWVudFRvRGlzayxcbiAgdGltZXN0YW1wLFxufToge1xuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgaW5kZXg/OiBudW1iZXI7XG4gIHJlYWRBdHRhY2htZW50RGF0YTogKHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuICBzYXZlQXR0YWNobWVudFRvRGlzazogKG9wdGlvbnM6IHtcbiAgICBkYXRhOiBVaW50OEFycmF5O1xuICAgIG5hbWU6IHN0cmluZztcbiAgfSkgPT4gUHJvbWlzZTx7IG5hbWU6IHN0cmluZzsgZnVsbFBhdGg6IHN0cmluZyB9IHwgbnVsbD47XG4gIHRpbWVzdGFtcD86IG51bWJlcjtcbn0pOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcbiAgbGV0IGRhdGE6IFVpbnQ4QXJyYXk7XG4gIGlmIChhdHRhY2htZW50LnBhdGgpIHtcbiAgICBkYXRhID0gYXdhaXQgcmVhZEF0dGFjaG1lbnREYXRhKGF0dGFjaG1lbnQucGF0aCk7XG4gIH0gZWxzZSBpZiAoYXR0YWNobWVudC5kYXRhKSB7XG4gICAgZGF0YSA9IGF0dGFjaG1lbnQuZGF0YTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGFjaG1lbnQgaGFkIG5laXRoZXIgcGF0aCBub3IgZGF0YScpO1xuICB9XG5cbiAgY29uc3QgbmFtZSA9IGdldFN1Z2dlc3RlZEZpbGVuYW1lKHsgYXR0YWNobWVudCwgdGltZXN0YW1wLCBpbmRleCB9KTtcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBzYXZlQXR0YWNobWVudFRvRGlzayh7XG4gICAgZGF0YSxcbiAgICBuYW1lLFxuICB9KTtcblxuICBpZiAoIXJlc3VsdCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5mdWxsUGF0aDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdWdnZXN0ZWRGaWxlbmFtZSA9ICh7XG4gIGF0dGFjaG1lbnQsXG4gIHRpbWVzdGFtcCxcbiAgaW5kZXgsXG59OiB7XG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICB0aW1lc3RhbXA/OiBudW1iZXIgfCBEYXRlO1xuICBpbmRleD86IG51bWJlcjtcbn0pOiBzdHJpbmcgPT4ge1xuICBpZiAoIWlzTnVtYmVyKGluZGV4KSAmJiBhdHRhY2htZW50LmZpbGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dGFjaG1lbnQuZmlsZU5hbWU7XG4gIH1cblxuICBjb25zdCBwcmVmaXggPSAnc2lnbmFsJztcbiAgY29uc3Qgc3VmZml4ID0gdGltZXN0YW1wXG4gICAgPyBtb21lbnQodGltZXN0YW1wKS5mb3JtYXQoJy1ZWVlZLU1NLURELUhIbW1zcycpXG4gICAgOiAnJztcbiAgY29uc3QgZmlsZVR5cGUgPSBnZXRGaWxlRXh0ZW5zaW9uKGF0dGFjaG1lbnQpO1xuICBjb25zdCBleHRlbnNpb24gPSBmaWxlVHlwZSA/IGAuJHtmaWxlVHlwZX1gIDogJyc7XG4gIGNvbnN0IGluZGV4U3VmZml4ID0gaW5kZXggPyBgXyR7cGFkU3RhcnQoaW5kZXgudG9TdHJpbmcoKSwgMywgJzAnKX1gIDogJyc7XG5cbiAgcmV0dXJuIGAke3ByZWZpeH0ke3N1ZmZpeH0ke2luZGV4U3VmZml4fSR7ZXh0ZW5zaW9ufWA7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsZUV4dGVuc2lvbiA9IChcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGVcbik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICghYXR0YWNobWVudC5jb250ZW50VHlwZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBzd2l0Y2ggKGF0dGFjaG1lbnQuY29udGVudFR5cGUpIHtcbiAgICBjYXNlICd2aWRlby9xdWlja3RpbWUnOlxuICAgICAgcmV0dXJuICdtb3YnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gYXR0YWNobWVudC5jb250ZW50VHlwZS5zcGxpdCgnLycpWzFdO1xuICB9XG59O1xuXG5jb25zdCBNRUJJQllURSA9IDEwMjQgKiAxMDI0O1xuY29uc3QgREVGQVVMVF9NQVggPSAxMDAgKiBNRUJJQllURTtcblxuZXhwb3J0IGNvbnN0IGdldE1heGltdW1BdHRhY2htZW50U2l6ZSA9ICgpOiBudW1iZXIgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBwYXJzZUludE9yVGhyb3coXG4gICAgICBnZXRWYWx1ZSgnZ2xvYmFsLmF0dGFjaG1lbnRzLm1heEJ5dGVzJyksXG4gICAgICAncHJlUHJvY2Vzc0F0dGFjaG1lbnQvbWF4QXR0YWNobWVudFNpemUnXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cud2FybihcbiAgICAgICdGYWlsZWQgdG8gcGFyc2UgaW50ZWdlciBvdXQgb2YgZ2xvYmFsLmF0dGFjaG1lbnRzLm1heEJ5dGVzIGZlYXR1cmUgZmxhZydcbiAgICApO1xuICAgIHJldHVybiBERUZBVUxUX01BWDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRCbHVySGFzaCA9ICh0aGVtZTogVGhlbWVUeXBlID0gVGhlbWVUeXBlLmxpZ2h0KTogc3RyaW5nID0+IHtcbiAgaWYgKHRoZW1lID09PSBUaGVtZVR5cGUuZGFyaykge1xuICAgIHJldHVybiAnTDA1T1Fub2ZmUW9mb2ZmUWZRZlFmUWZRZlFmUSc7XG4gIH1cbiAgcmV0dXJuICdMMVFdK3ctO2ZRLTt+cWZRZlFmUWZRZlFmUWZRJztcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5CZURvd25sb2FkZWQgPSAoXG4gIGF0dGFjaG1lbnQ6IFBpY2s8QXR0YWNobWVudFR5cGUsICdrZXknIHwgJ2RpZ2VzdCc+XG4pOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIEJvb2xlYW4oYXR0YWNobWVudC5rZXkgJiYgYXR0YWNobWVudC5kaWdlc3QpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQWU7QUFDZixvQkFBbUI7QUFDbkIsb0JBT087QUFDUCx1QkFBa0M7QUFHbEMsV0FBc0I7QUFDdEIsVUFBcUI7QUFDckIsb0JBQTRCO0FBQzVCLHNCQUE4QjtBQUM5QiwwQkFHTztBQUVQLGtCQUEwQjtBQUMxQiwrQkFBa0M7QUFDbEMsbUJBQThCO0FBQzlCLDZCQUFnQztBQUNoQywwQkFBeUI7QUFFekIsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sYUFBYSxZQUFZO0FBQy9CLE1BQU0sWUFBWTtBQUNsQixNQUFNLGFBQWE7QUF1RFosSUFBSywwQkFBTCxrQkFBSyw2QkFBTDtBQUNMLGlFQUFVLEtBQVY7QUFDQSxpRUFBVSxLQUFWO0FBQ0EsOERBQU8sS0FBUDtBQUNBLCtEQUFRLEtBQVI7QUFDQSxnRUFBUyxLQUFUO0FBQ0EsbUVBQVksS0FBWjtBQU5VO0FBQUE7QUEyRlosdUNBQ0UsWUFDQTtBQUFBLEVBQ0U7QUFBQSxHQUl1QjtBQUN6QixNQUFJLENBQUMsOEJBQVcsc0JBQXNCLEdBQUc7QUFDdkMsVUFBTSxJQUFJLFVBQVUsNkNBQTZDO0FBQUEsRUFDbkU7QUFFQSxRQUFNLEVBQUUsU0FBUztBQUNqQixRQUFNLG9CQUFvQixDQUFDLCtCQUFZLElBQUk7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
