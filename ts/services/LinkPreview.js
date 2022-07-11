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
var LinkPreview_exports = {};
__export(LinkPreview_exports, {
  addLinkPreview: () => addLinkPreview,
  getLinkPreviewForSend: () => getLinkPreviewForSend,
  hasLinkPreviewLoaded: () => hasLinkPreviewLoaded,
  maybeGrabLinkPreview: () => maybeGrabLinkPreview,
  removeLinkPreview: () => removeLinkPreview,
  resetLinkPreview: () => resetLinkPreview,
  suspendLinkPreviews: () => suspendLinkPreviews
});
module.exports = __toCommonJS(LinkPreview_exports);
var import_lodash = require("lodash");
var Bytes = __toESM(require("../Bytes"));
var LinkPreview = __toESM(require("../types/LinkPreview"));
var Stickers = __toESM(require("../types/Stickers"));
var VisualAttachment = __toESM(require("../types/VisualAttachment"));
var log = __toESM(require("../logging/log"));
var import_MIME = require("../types/MIME");
var import_durations = require("../util/durations");
var import_handleImageAttachment = require("../util/handleImageAttachment");
var import_dropNull = require("../util/dropNull");
var import_fileToBytes = require("../util/fileToBytes");
var import_url = require("../util/url");
var import_sniffImageMimeType = require("../util/sniffImageMimeType");
const LINK_PREVIEW_TIMEOUT = 60 * import_durations.SECOND;
let currentlyMatchedLink;
let disableLinkPreviews = false;
let excludedPreviewUrls = [];
let linkPreviewAbortController;
let linkPreviewResult;
function suspendLinkPreviews() {
  disableLinkPreviews = true;
}
function hasLinkPreviewLoaded() {
  return Boolean(linkPreviewResult);
}
const maybeGrabLinkPreview = (0, import_lodash.debounce)(_maybeGrabLinkPreview, 200);
function _maybeGrabLinkPreview(message, source, caretLocation) {
  if (!window.Events.getLinkPreviewSetting()) {
    return;
  }
  const { messaging } = window.textsecure;
  if (!messaging) {
    return;
  }
  if (window.isBehindProxy()) {
    return;
  }
  if (!message) {
    resetLinkPreview();
    return;
  }
  if (disableLinkPreviews) {
    return;
  }
  const links = LinkPreview.findLinks(message, caretLocation);
  if (currentlyMatchedLink && links.includes(currentlyMatchedLink)) {
    return;
  }
  currentlyMatchedLink = void 0;
  excludedPreviewUrls = excludedPreviewUrls || [];
  const link = links.find((item) => LinkPreview.shouldPreviewHref(item) && !excludedPreviewUrls.includes(item));
  if (!link) {
    removeLinkPreview();
    return;
  }
  addLinkPreview(link, source);
}
function resetLinkPreview() {
  disableLinkPreviews = false;
  excludedPreviewUrls = [];
  removeLinkPreview();
}
function removeLinkPreview() {
  (linkPreviewResult || []).forEach((item) => {
    if (item.url) {
      URL.revokeObjectURL(item.url);
    }
  });
  linkPreviewResult = void 0;
  currentlyMatchedLink = void 0;
  linkPreviewAbortController?.abort();
  linkPreviewAbortController = void 0;
  window.reduxActions.linkPreviews.removeLinkPreview();
}
async function addLinkPreview(url, source) {
  if (currentlyMatchedLink === url) {
    log.warn("addLinkPreview should not be called with the same URL like this");
    return;
  }
  (linkPreviewResult || []).forEach((item) => {
    if (item.url) {
      URL.revokeObjectURL(item.url);
    }
  });
  window.reduxActions.linkPreviews.removeLinkPreview();
  linkPreviewResult = void 0;
  if (linkPreviewAbortController) {
    log.info("addLinkPreview: canceling another in-flight link preview request");
    linkPreviewAbortController.abort();
  }
  const thisRequestAbortController = new AbortController();
  linkPreviewAbortController = thisRequestAbortController;
  const timeout = setTimeout(() => {
    thisRequestAbortController.abort();
  }, LINK_PREVIEW_TIMEOUT);
  currentlyMatchedLink = url;
  window.reduxActions.linkPreviews.addLinkPreview({
    url
  }, source);
  try {
    const result = await getPreview(url, thisRequestAbortController.signal);
    if (!result) {
      log.info("addLinkPreview: failed to load preview (not necessarily a problem)");
      const failedToFetch = currentlyMatchedLink === url;
      if (failedToFetch) {
        excludedPreviewUrls.push(url);
        removeLinkPreview();
      }
      return;
    }
    if (result.image && result.image.data) {
      const blob = new Blob([result.image.data], {
        type: result.image.contentType
      });
      result.image.url = URL.createObjectURL(blob);
    } else if (!result.title) {
      removeLinkPreview();
      return;
    }
    window.reduxActions.linkPreviews.addLinkPreview({
      ...result,
      description: (0, import_dropNull.dropNull)(result.description),
      date: (0, import_dropNull.dropNull)(result.date),
      domain: LinkPreview.getDomain(result.url),
      isStickerPack: LinkPreview.isStickerPack(result.url)
    }, source);
    linkPreviewResult = [result];
  } catch (error) {
    log.error("Problem loading link preview, disabling.", error && error.stack ? error.stack : error);
    disableLinkPreviews = true;
    removeLinkPreview();
  } finally {
    clearTimeout(timeout);
  }
}
function getLinkPreviewForSend(message) {
  if (!window.storage.get("linkPreviews", false)) {
    return [];
  }
  if (!linkPreviewResult) {
    return [];
  }
  const urlsInMessage = new Set(LinkPreview.findLinks(message));
  return linkPreviewResult.filter(({ url }) => urlsInMessage.has(url)).map((item) => {
    if (item.image) {
      return {
        ...item,
        image: (0, import_lodash.omit)(item.image, "url"),
        description: (0, import_dropNull.dropNull)(item.description),
        date: (0, import_dropNull.dropNull)(item.date),
        domain: LinkPreview.getDomain(item.url),
        isStickerPack: LinkPreview.isStickerPack(item.url)
      };
    }
    return {
      ...item,
      description: (0, import_dropNull.dropNull)(item.description),
      date: (0, import_dropNull.dropNull)(item.date),
      domain: LinkPreview.getDomain(item.url),
      isStickerPack: LinkPreview.isStickerPack(item.url)
    };
  });
}
async function getPreview(url, abortSignal) {
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  if (LinkPreview.isStickerPack(url)) {
    return getStickerPackPreview(url, abortSignal);
  }
  if (LinkPreview.isGroupLink(url)) {
    return getGroupPreview(url, abortSignal);
  }
  if (!LinkPreview.shouldPreviewHref(url)) {
    return null;
  }
  const linkPreviewMetadata = await messaging.fetchLinkPreviewMetadata(url, abortSignal);
  if (!linkPreviewMetadata || abortSignal.aborted) {
    return null;
  }
  const { title, imageHref, description, date } = linkPreviewMetadata;
  let image;
  if (imageHref && LinkPreview.shouldPreviewHref(imageHref)) {
    let objectUrl;
    try {
      const fullSizeImage = await messaging.fetchLinkPreviewImage(imageHref, abortSignal);
      if (abortSignal.aborted) {
        return null;
      }
      if (!fullSizeImage) {
        throw new Error("Failed to fetch link preview image");
      }
      const withBlob = await (0, import_handleImageAttachment.autoScale)({
        contentType: fullSizeImage.contentType,
        file: new Blob([fullSizeImage.data], {
          type: fullSizeImage.contentType
        }),
        fileName: title
      });
      const data = await (0, import_fileToBytes.fileToBytes)(withBlob.file);
      objectUrl = URL.createObjectURL(withBlob.file);
      const blurHash = await window.imageToBlurHash(withBlob.file);
      const dimensions = await VisualAttachment.getImageDimensions({
        objectUrl,
        logger: log
      });
      image = {
        data,
        size: data.byteLength,
        ...dimensions,
        contentType: (0, import_MIME.stringToMIMEType)(withBlob.file.type),
        blurHash
      };
    } catch (error) {
      log.error("getPreview failed to get image for link preview:", error.message);
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    }
  }
  if (abortSignal.aborted) {
    return null;
  }
  return {
    date: date || null,
    description: description || null,
    image,
    title,
    url
  };
}
async function getStickerPackPreview(url, abortSignal) {
  const isPackDownloaded = /* @__PURE__ */ __name((pack) => {
    if (!pack) {
      return false;
    }
    return pack.status === "downloaded" || pack.status === "installed";
  }, "isPackDownloaded");
  const isPackValid = /* @__PURE__ */ __name((pack) => {
    if (!pack) {
      return false;
    }
    return pack.status === "ephemeral" || pack.status === "downloaded" || pack.status === "installed";
  }, "isPackValid");
  const dataFromLink = Stickers.getDataFromLink(url);
  if (!dataFromLink) {
    return null;
  }
  const { id, key } = dataFromLink;
  try {
    const keyBytes = Bytes.fromHex(key);
    const keyBase64 = Bytes.toBase64(keyBytes);
    const existing = Stickers.getStickerPack(id);
    if (!isPackDownloaded(existing)) {
      await Stickers.downloadEphemeralPack(id, keyBase64);
    }
    if (abortSignal.aborted) {
      return null;
    }
    const pack = Stickers.getStickerPack(id);
    if (!isPackValid(pack)) {
      return null;
    }
    if (pack.key !== keyBase64) {
      return null;
    }
    const { title, coverStickerId } = pack;
    const sticker = pack.stickers[coverStickerId];
    const data = pack.status === "ephemeral" ? await window.Signal.Migrations.readTempData(sticker.path) : await window.Signal.Migrations.readStickerData(sticker.path);
    if (abortSignal.aborted) {
      return null;
    }
    let contentType;
    const sniffedMimeType = (0, import_sniffImageMimeType.sniffImageMimeType)(data);
    if (sniffedMimeType) {
      contentType = sniffedMimeType;
    } else {
      log.warn("getStickerPackPreview: Unable to sniff sticker MIME type; falling back to WebP");
      contentType = import_MIME.IMAGE_WEBP;
    }
    return {
      date: null,
      description: null,
      image: {
        ...sticker,
        data,
        size: data.byteLength,
        contentType
      },
      title,
      url
    };
  } catch (error) {
    log.error("getStickerPackPreview error:", error && error.stack ? error.stack : error);
    return null;
  } finally {
    if (id) {
      await Stickers.removeEphemeralPack(id);
    }
  }
}
async function getGroupPreview(url, abortSignal) {
  const urlObject = (0, import_url.maybeParseUrl)(url);
  if (!urlObject) {
    return null;
  }
  const { hash } = urlObject;
  if (!hash) {
    return null;
  }
  const groupData = hash.slice(1);
  const { inviteLinkPassword, masterKey } = window.Signal.Groups.parseGroupLink(groupData);
  const fields = window.Signal.Groups.deriveGroupFields(Bytes.fromBase64(masterKey));
  const id = Bytes.toBase64(fields.id);
  const logId = `groupv2(${id})`;
  const secretParams = Bytes.toBase64(fields.secretParams);
  log.info(`getGroupPreview/${logId}: Fetching pre-join state`);
  const result = await window.Signal.Groups.getPreJoinGroupInfo(inviteLinkPassword, masterKey);
  if (abortSignal.aborted) {
    return null;
  }
  const title = window.Signal.Groups.decryptGroupTitle(result.title, secretParams) || window.i18n("unknownGroup");
  const description = result.memberCount === 1 || result.memberCount === void 0 ? window.i18n("GroupV2--join--member-count--single") : window.i18n("GroupV2--join--member-count--multiple", {
    count: result.memberCount.toString()
  });
  let image;
  if (result.avatar) {
    try {
      const data = await window.Signal.Groups.decryptGroupAvatar(result.avatar, secretParams);
      image = {
        data,
        size: data.byteLength,
        contentType: import_MIME.IMAGE_JPEG,
        blurHash: await window.imageToBlurHash(new Blob([data], {
          type: import_MIME.IMAGE_JPEG
        }))
      };
    } catch (error) {
      const errorString = error && error.stack ? error.stack : error;
      log.error(`getGroupPreview/${logId}: Failed to fetch avatar ${errorString}`);
    }
  }
  if (abortSignal.aborted) {
    return null;
  }
  return {
    date: null,
    description,
    image,
    title,
    url
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addLinkPreview,
  getLinkPreviewForSend,
  hasLinkPreviewLoaded,
  maybeGrabLinkPreview,
  removeLinkPreview,
  resetLinkPreview,
  suspendLinkPreviews
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlua1ByZXZpZXcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZGVib3VuY2UsIG9taXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IExpbmtQcmV2aWV3VHlwZSB9IGZyb20gJy4uL3R5cGVzL21lc3NhZ2UvTGlua1ByZXZpZXdzJztcbmltcG9ydCB0eXBlIHtcbiAgTGlua1ByZXZpZXdJbWFnZSxcbiAgTGlua1ByZXZpZXdSZXN1bHQsXG4gIExpbmtQcmV2aWV3U291cmNlVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvTGlua1ByZXZpZXcnO1xuaW1wb3J0IHR5cGUgeyBTdGlja2VyUGFja1R5cGUgYXMgU3RpY2tlclBhY2tEQlR5cGUgfSBmcm9tICcuLi9zcWwvSW50ZXJmYWNlJztcbmltcG9ydCB0eXBlIHsgTUlNRVR5cGUgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcbmltcG9ydCAqIGFzIExpbmtQcmV2aWV3IGZyb20gJy4uL3R5cGVzL0xpbmtQcmV2aWV3JztcbmltcG9ydCAqIGFzIFN0aWNrZXJzIGZyb20gJy4uL3R5cGVzL1N0aWNrZXJzJztcbmltcG9ydCAqIGFzIFZpc3VhbEF0dGFjaG1lbnQgZnJvbSAnLi4vdHlwZXMvVmlzdWFsQXR0YWNobWVudCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgSU1BR0VfSlBFRywgSU1BR0VfV0VCUCwgc3RyaW5nVG9NSU1FVHlwZSB9IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHsgU0VDT05EIH0gZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgYXV0b1NjYWxlIH0gZnJvbSAnLi4vdXRpbC9oYW5kbGVJbWFnZUF0dGFjaG1lbnQnO1xuaW1wb3J0IHsgZHJvcE51bGwgfSBmcm9tICcuLi91dGlsL2Ryb3BOdWxsJztcbmltcG9ydCB7IGZpbGVUb0J5dGVzIH0gZnJvbSAnLi4vdXRpbC9maWxlVG9CeXRlcyc7XG5pbXBvcnQgeyBtYXliZVBhcnNlVXJsIH0gZnJvbSAnLi4vdXRpbC91cmwnO1xuaW1wb3J0IHsgc25pZmZJbWFnZU1pbWVUeXBlIH0gZnJvbSAnLi4vdXRpbC9zbmlmZkltYWdlTWltZVR5cGUnO1xuXG5jb25zdCBMSU5LX1BSRVZJRVdfVElNRU9VVCA9IDYwICogU0VDT05EO1xuXG5sZXQgY3VycmVudGx5TWF0Y2hlZExpbms6IHN0cmluZyB8IHVuZGVmaW5lZDtcbmxldCBkaXNhYmxlTGlua1ByZXZpZXdzID0gZmFsc2U7XG5sZXQgZXhjbHVkZWRQcmV2aWV3VXJsczogQXJyYXk8c3RyaW5nPiA9IFtdO1xubGV0IGxpbmtQcmV2aWV3QWJvcnRDb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCB1bmRlZmluZWQ7XG5sZXQgbGlua1ByZXZpZXdSZXN1bHQ6IEFycmF5PExpbmtQcmV2aWV3UmVzdWx0PiB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGZ1bmN0aW9uIHN1c3BlbmRMaW5rUHJldmlld3MoKTogdm9pZCB7XG4gIGRpc2FibGVMaW5rUHJldmlld3MgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzTGlua1ByZXZpZXdMb2FkZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKGxpbmtQcmV2aWV3UmVzdWx0KTtcbn1cblxuZXhwb3J0IGNvbnN0IG1heWJlR3JhYkxpbmtQcmV2aWV3ID0gZGVib3VuY2UoX21heWJlR3JhYkxpbmtQcmV2aWV3LCAyMDApO1xuXG5mdW5jdGlvbiBfbWF5YmVHcmFiTGlua1ByZXZpZXcoXG4gIG1lc3NhZ2U6IHN0cmluZyxcbiAgc291cmNlOiBMaW5rUHJldmlld1NvdXJjZVR5cGUsXG4gIGNhcmV0TG9jYXRpb24/OiBudW1iZXJcbik6IHZvaWQge1xuICAvLyBEb24ndCBnZW5lcmF0ZSBsaW5rIHByZXZpZXdzIGlmIHVzZXIgaGFzIHR1cm5lZCB0aGVtIG9mZlxuICBpZiAoIXdpbmRvdy5FdmVudHMuZ2V0TGlua1ByZXZpZXdTZXR0aW5nKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEbyBub3RoaW5nIGlmIHdlJ3JlIG9mZmxpbmVcbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICBpZiAoIW1lc3NhZ2luZykge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBJZiB3ZSdyZSBiZWhpbmQgYSB1c2VyLWNvbmZpZ3VyZWQgcHJveHksIHdlIGRvbid0IHN1cHBvcnQgbGluayBwcmV2aWV3c1xuICBpZiAod2luZG93LmlzQmVoaW5kUHJveHkoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghbWVzc2FnZSkge1xuICAgIHJlc2V0TGlua1ByZXZpZXcoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZGlzYWJsZUxpbmtQcmV2aWV3cykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGxpbmtzID0gTGlua1ByZXZpZXcuZmluZExpbmtzKG1lc3NhZ2UsIGNhcmV0TG9jYXRpb24pO1xuICBpZiAoY3VycmVudGx5TWF0Y2hlZExpbmsgJiYgbGlua3MuaW5jbHVkZXMoY3VycmVudGx5TWF0Y2hlZExpbmspKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3VycmVudGx5TWF0Y2hlZExpbmsgPSB1bmRlZmluZWQ7XG4gIGV4Y2x1ZGVkUHJldmlld1VybHMgPSBleGNsdWRlZFByZXZpZXdVcmxzIHx8IFtdO1xuXG4gIGNvbnN0IGxpbmsgPSBsaW5rcy5maW5kKFxuICAgIGl0ZW0gPT5cbiAgICAgIExpbmtQcmV2aWV3LnNob3VsZFByZXZpZXdIcmVmKGl0ZW0pICYmICFleGNsdWRlZFByZXZpZXdVcmxzLmluY2x1ZGVzKGl0ZW0pXG4gICk7XG4gIGlmICghbGluaykge1xuICAgIHJlbW92ZUxpbmtQcmV2aWV3KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYWRkTGlua1ByZXZpZXcobGluaywgc291cmNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0TGlua1ByZXZpZXcoKTogdm9pZCB7XG4gIGRpc2FibGVMaW5rUHJldmlld3MgPSBmYWxzZTtcbiAgZXhjbHVkZWRQcmV2aWV3VXJscyA9IFtdO1xuICByZW1vdmVMaW5rUHJldmlldygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTGlua1ByZXZpZXcoKTogdm9pZCB7XG4gIChsaW5rUHJldmlld1Jlc3VsdCB8fCBbXSkuZm9yRWFjaCgoaXRlbTogTGlua1ByZXZpZXdSZXN1bHQpID0+IHtcbiAgICBpZiAoaXRlbS51cmwpIHtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoaXRlbS51cmwpO1xuICAgIH1cbiAgfSk7XG4gIGxpbmtQcmV2aWV3UmVzdWx0ID0gdW5kZWZpbmVkO1xuICBjdXJyZW50bHlNYXRjaGVkTGluayA9IHVuZGVmaW5lZDtcbiAgbGlua1ByZXZpZXdBYm9ydENvbnRyb2xsZXI/LmFib3J0KCk7XG4gIGxpbmtQcmV2aWV3QWJvcnRDb250cm9sbGVyID0gdW5kZWZpbmVkO1xuXG4gIHdpbmRvdy5yZWR1eEFjdGlvbnMubGlua1ByZXZpZXdzLnJlbW92ZUxpbmtQcmV2aWV3KCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRMaW5rUHJldmlldyhcbiAgdXJsOiBzdHJpbmcsXG4gIHNvdXJjZTogTGlua1ByZXZpZXdTb3VyY2VUeXBlXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKGN1cnJlbnRseU1hdGNoZWRMaW5rID09PSB1cmwpIHtcbiAgICBsb2cud2FybignYWRkTGlua1ByZXZpZXcgc2hvdWxkIG5vdCBiZSBjYWxsZWQgd2l0aCB0aGUgc2FtZSBVUkwgbGlrZSB0aGlzJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgKGxpbmtQcmV2aWV3UmVzdWx0IHx8IFtdKS5mb3JFYWNoKChpdGVtOiBMaW5rUHJldmlld1Jlc3VsdCkgPT4ge1xuICAgIGlmIChpdGVtLnVybCkge1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpdGVtLnVybCk7XG4gICAgfVxuICB9KTtcbiAgd2luZG93LnJlZHV4QWN0aW9ucy5saW5rUHJldmlld3MucmVtb3ZlTGlua1ByZXZpZXcoKTtcbiAgbGlua1ByZXZpZXdSZXN1bHQgPSB1bmRlZmluZWQ7XG5cbiAgLy8gQ2FuY2VsIG90aGVyIGluLWZsaWdodCBsaW5rIHByZXZpZXcgcmVxdWVzdHMuXG4gIGlmIChsaW5rUHJldmlld0Fib3J0Q29udHJvbGxlcikge1xuICAgIGxvZy5pbmZvKFxuICAgICAgJ2FkZExpbmtQcmV2aWV3OiBjYW5jZWxpbmcgYW5vdGhlciBpbi1mbGlnaHQgbGluayBwcmV2aWV3IHJlcXVlc3QnXG4gICAgKTtcbiAgICBsaW5rUHJldmlld0Fib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICB9XG5cbiAgY29uc3QgdGhpc1JlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGxpbmtQcmV2aWV3QWJvcnRDb250cm9sbGVyID0gdGhpc1JlcXVlc3RBYm9ydENvbnRyb2xsZXI7XG5cbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRoaXNSZXF1ZXN0QWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gIH0sIExJTktfUFJFVklFV19USU1FT1VUKTtcblxuICBjdXJyZW50bHlNYXRjaGVkTGluayA9IHVybDtcbiAgLy8gQWRkaW5nIGp1c3QgdGhlIFVSTCBzbyB0aGF0IHdlIGdldCBpbnRvIGEgXCJsb2FkaW5nXCIgc3RhdGVcbiAgd2luZG93LnJlZHV4QWN0aW9ucy5saW5rUHJldmlld3MuYWRkTGlua1ByZXZpZXcoXG4gICAge1xuICAgICAgdXJsLFxuICAgIH0sXG4gICAgc291cmNlXG4gICk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRQcmV2aWV3KHVybCwgdGhpc1JlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsKTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ2FkZExpbmtQcmV2aWV3OiBmYWlsZWQgdG8gbG9hZCBwcmV2aWV3IChub3QgbmVjZXNzYXJpbHkgYSBwcm9ibGVtKSdcbiAgICAgICk7XG5cbiAgICAgIC8vIFRoaXMgaGVscHMgdXMgZGlzYW1iaWd1YXRlIGJldHdlZW4gdHdvIGtpbmRzIG9mIGZhaWx1cmU6XG4gICAgICAvL1xuICAgICAgLy8gMS4gV2UgZmFpbGVkIHRvIGZldGNoIHRoZSBwcmV2aWV3IGJlY2F1c2Ugb2YgKDEpIGEgbmV0d29yayBmYWlsdXJlICgyKSBhblxuICAgICAgLy8gICAgaW52YWxpZCByZXNwb25zZSAoMykgYSB0aW1lb3V0XG4gICAgICAvLyAyLiBXZSBmYWlsZWQgdG8gZmV0Y2ggdGhlIHByZXZpZXcgYmVjYXVzZSB3ZSBhYm9ydGVkIHRoZSByZXF1ZXN0IGJlY2F1c2UgdGhlXG4gICAgICAvLyAgICB1c2VyIGNoYW5nZWQgdGhlIGxpbmsgKGUuZy4sIGJ5IGNvbnRpbnVpbmcgdG8gdHlwZSB0aGUgVVJMKVxuICAgICAgY29uc3QgZmFpbGVkVG9GZXRjaCA9IGN1cnJlbnRseU1hdGNoZWRMaW5rID09PSB1cmw7XG4gICAgICBpZiAoZmFpbGVkVG9GZXRjaCkge1xuICAgICAgICBleGNsdWRlZFByZXZpZXdVcmxzLnB1c2godXJsKTtcbiAgICAgICAgcmVtb3ZlTGlua1ByZXZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmltYWdlICYmIHJlc3VsdC5pbWFnZS5kYXRhKSB7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdC5pbWFnZS5kYXRhXSwge1xuICAgICAgICB0eXBlOiByZXN1bHQuaW1hZ2UuY29udGVudFR5cGUsXG4gICAgICB9KTtcbiAgICAgIHJlc3VsdC5pbWFnZS51cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH0gZWxzZSBpZiAoIXJlc3VsdC50aXRsZSkge1xuICAgICAgLy8gQSBsaW5rIHByZXZpZXcgaXNuJ3Qgd29ydGggc2hvd2luZyB1bmxlc3Mgd2UgaGF2ZSBlaXRoZXIgYSB0aXRsZSBvciBhbiBpbWFnZVxuICAgICAgcmVtb3ZlTGlua1ByZXZpZXcoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmxpbmtQcmV2aWV3cy5hZGRMaW5rUHJldmlldyhcbiAgICAgIHtcbiAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICBkZXNjcmlwdGlvbjogZHJvcE51bGwocmVzdWx0LmRlc2NyaXB0aW9uKSxcbiAgICAgICAgZGF0ZTogZHJvcE51bGwocmVzdWx0LmRhdGUpLFxuICAgICAgICBkb21haW46IExpbmtQcmV2aWV3LmdldERvbWFpbihyZXN1bHQudXJsKSxcbiAgICAgICAgaXNTdGlja2VyUGFjazogTGlua1ByZXZpZXcuaXNTdGlja2VyUGFjayhyZXN1bHQudXJsKSxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VcbiAgICApO1xuICAgIGxpbmtQcmV2aWV3UmVzdWx0ID0gW3Jlc3VsdF07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ1Byb2JsZW0gbG9hZGluZyBsaW5rIHByZXZpZXcsIGRpc2FibGluZy4nLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICBkaXNhYmxlTGlua1ByZXZpZXdzID0gdHJ1ZTtcbiAgICByZW1vdmVMaW5rUHJldmlldygpO1xuICB9IGZpbmFsbHkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua1ByZXZpZXdGb3JTZW5kKG1lc3NhZ2U6IHN0cmluZyk6IEFycmF5PExpbmtQcmV2aWV3VHlwZT4ge1xuICAvLyBEb24ndCBnZW5lcmF0ZSBsaW5rIHByZXZpZXdzIGlmIHVzZXIgaGFzIHR1cm5lZCB0aGVtIG9mZlxuICBpZiAoIXdpbmRvdy5zdG9yYWdlLmdldCgnbGlua1ByZXZpZXdzJywgZmFsc2UpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFsaW5rUHJldmlld1Jlc3VsdCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHVybHNJbk1lc3NhZ2UgPSBuZXcgU2V0PHN0cmluZz4oTGlua1ByZXZpZXcuZmluZExpbmtzKG1lc3NhZ2UpKTtcblxuICByZXR1cm4gKFxuICAgIGxpbmtQcmV2aWV3UmVzdWx0XG4gICAgICAvLyBUaGlzIGJ1bGxldC1wcm9vZnMgYWdhaW5zdCBzZW5kaW5nIGxpbmsgcHJldmlld3MgZm9yIFVSTHMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluXG4gICAgICAvLyAgIHRoZSBtZXNzYWdlLiBUaGlzIGNhbiBoYXBwZW4gaWYgeW91IGhhdmUgYSBsaW5rIHByZXZpZXcsIHRoZW4gcXVpY2tseSBkZWxldGVcbiAgICAgIC8vICAgdGhlIGxpbmsgYW5kIHNlbmQgdGhlIG1lc3NhZ2UuXG4gICAgICAuZmlsdGVyKCh7IHVybCB9OiBSZWFkb25seTx7IHVybDogc3RyaW5nIH0+KSA9PiB1cmxzSW5NZXNzYWdlLmhhcyh1cmwpKVxuICAgICAgLm1hcCgoaXRlbTogTGlua1ByZXZpZXdSZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uaW1hZ2UpIHtcbiAgICAgICAgICAvLyBXZSBlbGltaW5hdGUgdGhlIE9iamVjdFVSTCBoZXJlLCB1bm5lZWRlZCBmb3Igc2VuZCBvciBzYXZlXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBpbWFnZTogb21pdChpdGVtLmltYWdlLCAndXJsJyksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZHJvcE51bGwoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgICAgICAgICBkYXRlOiBkcm9wTnVsbChpdGVtLmRhdGUpLFxuICAgICAgICAgICAgZG9tYWluOiBMaW5rUHJldmlldy5nZXREb21haW4oaXRlbS51cmwpLFxuICAgICAgICAgICAgaXNTdGlja2VyUGFjazogTGlua1ByZXZpZXcuaXNTdGlja2VyUGFjayhpdGVtLnVybCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZHJvcE51bGwoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgICAgICAgZGF0ZTogZHJvcE51bGwoaXRlbS5kYXRlKSxcbiAgICAgICAgICBkb21haW46IExpbmtQcmV2aWV3LmdldERvbWFpbihpdGVtLnVybCksXG4gICAgICAgICAgaXNTdGlja2VyUGFjazogTGlua1ByZXZpZXcuaXNTdGlja2VyUGFjayhpdGVtLnVybCksXG4gICAgICAgIH07XG4gICAgICB9KVxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQcmV2aWV3KFxuICB1cmw6IHN0cmluZyxcbiAgYWJvcnRTaWduYWw6IFJlYWRvbmx5PEFib3J0U2lnbmFsPlxuKTogUHJvbWlzZTxudWxsIHwgTGlua1ByZXZpZXdSZXN1bHQ+IHtcbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuXG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSEnKTtcbiAgfVxuXG4gIGlmIChMaW5rUHJldmlldy5pc1N0aWNrZXJQYWNrKHVybCkpIHtcbiAgICByZXR1cm4gZ2V0U3RpY2tlclBhY2tQcmV2aWV3KHVybCwgYWJvcnRTaWduYWwpO1xuICB9XG4gIGlmIChMaW5rUHJldmlldy5pc0dyb3VwTGluayh1cmwpKSB7XG4gICAgcmV0dXJuIGdldEdyb3VwUHJldmlldyh1cmwsIGFib3J0U2lnbmFsKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYWxyZWFkeSBjaGVja2VkIGVsc2V3aGVyZSwgYnV0IHdlIHdhbnQgdG8gYmUgZXh0cmEtY2FyZWZ1bC5cbiAgaWYgKCFMaW5rUHJldmlldy5zaG91bGRQcmV2aWV3SHJlZih1cmwpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBsaW5rUHJldmlld01ldGFkYXRhID0gYXdhaXQgbWVzc2FnaW5nLmZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICB1cmwsXG4gICAgYWJvcnRTaWduYWxcbiAgKTtcbiAgaWYgKCFsaW5rUHJldmlld01ldGFkYXRhIHx8IGFib3J0U2lnbmFsLmFib3J0ZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCB7IHRpdGxlLCBpbWFnZUhyZWYsIGRlc2NyaXB0aW9uLCBkYXRlIH0gPSBsaW5rUHJldmlld01ldGFkYXRhO1xuXG4gIGxldCBpbWFnZTtcbiAgaWYgKGltYWdlSHJlZiAmJiBMaW5rUHJldmlldy5zaG91bGRQcmV2aWV3SHJlZihpbWFnZUhyZWYpKSB7XG4gICAgbGV0IG9iamVjdFVybDogdm9pZCB8IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgY29uc3QgZnVsbFNpemVJbWFnZSA9IGF3YWl0IG1lc3NhZ2luZy5mZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgIGltYWdlSHJlZixcbiAgICAgICAgYWJvcnRTaWduYWxcbiAgICAgICk7XG4gICAgICBpZiAoYWJvcnRTaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICghZnVsbFNpemVJbWFnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBsaW5rIHByZXZpZXcgaW1hZ2UnKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhpcyBmaWxlIGlzIGVpdGhlciBzbWFsbCBlbm91Z2ggb3IgaXMgcmVzaXplZCB0byBtZWV0IG91clxuICAgICAgLy8gICByZXF1aXJlbWVudHMgZm9yIGF0dGFjaG1lbnRzXG4gICAgICBjb25zdCB3aXRoQmxvYiA9IGF3YWl0IGF1dG9TY2FsZSh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBmdWxsU2l6ZUltYWdlLmNvbnRlbnRUeXBlLFxuICAgICAgICBmaWxlOiBuZXcgQmxvYihbZnVsbFNpemVJbWFnZS5kYXRhXSwge1xuICAgICAgICAgIHR5cGU6IGZ1bGxTaXplSW1hZ2UuY29udGVudFR5cGUsXG4gICAgICAgIH0pLFxuICAgICAgICBmaWxlTmFtZTogdGl0bGUsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZpbGVUb0J5dGVzKHdpdGhCbG9iLmZpbGUpO1xuICAgICAgb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh3aXRoQmxvYi5maWxlKTtcblxuICAgICAgY29uc3QgYmx1ckhhc2ggPSBhd2FpdCB3aW5kb3cuaW1hZ2VUb0JsdXJIYXNoKHdpdGhCbG9iLmZpbGUpO1xuXG4gICAgICBjb25zdCBkaW1lbnNpb25zID0gYXdhaXQgVmlzdWFsQXR0YWNobWVudC5nZXRJbWFnZURpbWVuc2lvbnMoe1xuICAgICAgICBvYmplY3RVcmwsXG4gICAgICAgIGxvZ2dlcjogbG9nLFxuICAgICAgfSk7XG5cbiAgICAgIGltYWdlID0ge1xuICAgICAgICBkYXRhLFxuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIC4uLmRpbWVuc2lvbnMsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKHdpdGhCbG9iLmZpbGUudHlwZSksXG4gICAgICAgIGJsdXJIYXNoLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gV2Ugc3RpbGwgd2FudCB0byBzaG93IHRoZSBwcmV2aWV3IGlmIHdlIGZhaWxlZCB0byBnZXQgYW4gaW1hZ2VcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ2dldFByZXZpZXcgZmFpbGVkIHRvIGdldCBpbWFnZSBmb3IgbGluayBwcmV2aWV3OicsXG4gICAgICAgIGVycm9yLm1lc3NhZ2VcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChvYmplY3RVcmwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChhYm9ydFNpZ25hbC5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRhdGU6IGRhdGUgfHwgbnVsbCxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICBpbWFnZSxcbiAgICB0aXRsZSxcbiAgICB1cmwsXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0aWNrZXJQYWNrUHJldmlldyhcbiAgdXJsOiBzdHJpbmcsXG4gIGFib3J0U2lnbmFsOiBSZWFkb25seTxBYm9ydFNpZ25hbD5cbik6IFByb21pc2U8bnVsbCB8IExpbmtQcmV2aWV3UmVzdWx0PiB7XG4gIGNvbnN0IGlzUGFja0Rvd25sb2FkZWQgPSAoXG4gICAgcGFjaz86IFN0aWNrZXJQYWNrREJUeXBlXG4gICk6IHBhY2sgaXMgU3RpY2tlclBhY2tEQlR5cGUgPT4ge1xuICAgIGlmICghcGFjaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBwYWNrLnN0YXR1cyA9PT0gJ2Rvd25sb2FkZWQnIHx8IHBhY2suc3RhdHVzID09PSAnaW5zdGFsbGVkJztcbiAgfTtcbiAgY29uc3QgaXNQYWNrVmFsaWQgPSAocGFjaz86IFN0aWNrZXJQYWNrREJUeXBlKTogcGFjayBpcyBTdGlja2VyUGFja0RCVHlwZSA9PiB7XG4gICAgaWYgKCFwYWNrKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBwYWNrLnN0YXR1cyA9PT0gJ2VwaGVtZXJhbCcgfHxcbiAgICAgIHBhY2suc3RhdHVzID09PSAnZG93bmxvYWRlZCcgfHxcbiAgICAgIHBhY2suc3RhdHVzID09PSAnaW5zdGFsbGVkJ1xuICAgICk7XG4gIH07XG5cbiAgY29uc3QgZGF0YUZyb21MaW5rID0gU3RpY2tlcnMuZ2V0RGF0YUZyb21MaW5rKHVybCk7XG4gIGlmICghZGF0YUZyb21MaW5rKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgeyBpZCwga2V5IH0gPSBkYXRhRnJvbUxpbms7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBrZXlCeXRlcyA9IEJ5dGVzLmZyb21IZXgoa2V5KTtcbiAgICBjb25zdCBrZXlCYXNlNjQgPSBCeXRlcy50b0Jhc2U2NChrZXlCeXRlcyk7XG5cbiAgICBjb25zdCBleGlzdGluZyA9IFN0aWNrZXJzLmdldFN0aWNrZXJQYWNrKGlkKTtcbiAgICBpZiAoIWlzUGFja0Rvd25sb2FkZWQoZXhpc3RpbmcpKSB7XG4gICAgICBhd2FpdCBTdGlja2Vycy5kb3dubG9hZEVwaGVtZXJhbFBhY2soaWQsIGtleUJhc2U2NCk7XG4gICAgfVxuXG4gICAgaWYgKGFib3J0U2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHBhY2sgPSBTdGlja2Vycy5nZXRTdGlja2VyUGFjayhpZCk7XG5cbiAgICBpZiAoIWlzUGFja1ZhbGlkKHBhY2spKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHBhY2sua2V5ICE9PSBrZXlCYXNlNjQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHsgdGl0bGUsIGNvdmVyU3RpY2tlcklkIH0gPSBwYWNrO1xuICAgIGNvbnN0IHN0aWNrZXIgPSBwYWNrLnN0aWNrZXJzW2NvdmVyU3RpY2tlcklkXTtcbiAgICBjb25zdCBkYXRhID1cbiAgICAgIHBhY2suc3RhdHVzID09PSAnZXBoZW1lcmFsJ1xuICAgICAgICA/IGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5yZWFkVGVtcERhdGEoc3RpY2tlci5wYXRoKVxuICAgICAgICA6IGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5yZWFkU3RpY2tlckRhdGEoc3RpY2tlci5wYXRoKTtcblxuICAgIGlmIChhYm9ydFNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGVudFR5cGU6IE1JTUVUeXBlO1xuICAgIGNvbnN0IHNuaWZmZWRNaW1lVHlwZSA9IHNuaWZmSW1hZ2VNaW1lVHlwZShkYXRhKTtcbiAgICBpZiAoc25pZmZlZE1pbWVUeXBlKSB7XG4gICAgICBjb250ZW50VHlwZSA9IHNuaWZmZWRNaW1lVHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdnZXRTdGlja2VyUGFja1ByZXZpZXc6IFVuYWJsZSB0byBzbmlmZiBzdGlja2VyIE1JTUUgdHlwZTsgZmFsbGluZyBiYWNrIHRvIFdlYlAnXG4gICAgICApO1xuICAgICAgY29udGVudFR5cGUgPSBJTUFHRV9XRUJQO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRlOiBudWxsLFxuICAgICAgZGVzY3JpcHRpb246IG51bGwsXG4gICAgICBpbWFnZToge1xuICAgICAgICAuLi5zdGlja2VyLFxuICAgICAgICBkYXRhLFxuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgfSxcbiAgICAgIHRpdGxlLFxuICAgICAgdXJsLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ2dldFN0aWNrZXJQYWNrUHJldmlldyBlcnJvcjonLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGF3YWl0IFN0aWNrZXJzLnJlbW92ZUVwaGVtZXJhbFBhY2soaWQpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRHcm91cFByZXZpZXcoXG4gIHVybDogc3RyaW5nLFxuICBhYm9ydFNpZ25hbDogUmVhZG9ubHk8QWJvcnRTaWduYWw+XG4pOiBQcm9taXNlPG51bGwgfCBMaW5rUHJldmlld1Jlc3VsdD4ge1xuICBjb25zdCB1cmxPYmplY3QgPSBtYXliZVBhcnNlVXJsKHVybCk7XG4gIGlmICghdXJsT2JqZWN0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7IGhhc2ggfSA9IHVybE9iamVjdDtcbiAgaWYgKCFoYXNoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgZ3JvdXBEYXRhID0gaGFzaC5zbGljZSgxKTtcblxuICBjb25zdCB7IGludml0ZUxpbmtQYXNzd29yZCwgbWFzdGVyS2V5IH0gPVxuICAgIHdpbmRvdy5TaWduYWwuR3JvdXBzLnBhcnNlR3JvdXBMaW5rKGdyb3VwRGF0YSk7XG5cbiAgY29uc3QgZmllbGRzID0gd2luZG93LlNpZ25hbC5Hcm91cHMuZGVyaXZlR3JvdXBGaWVsZHMoXG4gICAgQnl0ZXMuZnJvbUJhc2U2NChtYXN0ZXJLZXkpXG4gICk7XG4gIGNvbnN0IGlkID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLmlkKTtcbiAgY29uc3QgbG9nSWQgPSBgZ3JvdXB2Migke2lkfSlgO1xuICBjb25zdCBzZWNyZXRQYXJhbXMgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuc2VjcmV0UGFyYW1zKTtcblxuICBsb2cuaW5mbyhgZ2V0R3JvdXBQcmV2aWV3LyR7bG9nSWR9OiBGZXRjaGluZyBwcmUtam9pbiBzdGF0ZWApO1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5nZXRQcmVKb2luR3JvdXBJbmZvKFxuICAgIGludml0ZUxpbmtQYXNzd29yZCxcbiAgICBtYXN0ZXJLZXlcbiAgKTtcblxuICBpZiAoYWJvcnRTaWduYWwuYWJvcnRlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdGl0bGUgPVxuICAgIHdpbmRvdy5TaWduYWwuR3JvdXBzLmRlY3J5cHRHcm91cFRpdGxlKHJlc3VsdC50aXRsZSwgc2VjcmV0UGFyYW1zKSB8fFxuICAgIHdpbmRvdy5pMThuKCd1bmtub3duR3JvdXAnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPVxuICAgIHJlc3VsdC5tZW1iZXJDb3VudCA9PT0gMSB8fCByZXN1bHQubWVtYmVyQ291bnQgPT09IHVuZGVmaW5lZFxuICAgICAgPyB3aW5kb3cuaTE4bignR3JvdXBWMi0tam9pbi0tbWVtYmVyLWNvdW50LS1zaW5nbGUnKVxuICAgICAgOiB3aW5kb3cuaTE4bignR3JvdXBWMi0tam9pbi0tbWVtYmVyLWNvdW50LS1tdWx0aXBsZScsIHtcbiAgICAgICAgICBjb3VudDogcmVzdWx0Lm1lbWJlckNvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIH0pO1xuICBsZXQgaW1hZ2U6IHVuZGVmaW5lZCB8IExpbmtQcmV2aWV3SW1hZ2U7XG5cbiAgaWYgKHJlc3VsdC5hdmF0YXIpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuR3JvdXBzLmRlY3J5cHRHcm91cEF2YXRhcihcbiAgICAgICAgcmVzdWx0LmF2YXRhcixcbiAgICAgICAgc2VjcmV0UGFyYW1zXG4gICAgICApO1xuICAgICAgaW1hZ2UgPSB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIHNpemU6IGRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGJsdXJIYXNoOiBhd2FpdCB3aW5kb3cuaW1hZ2VUb0JsdXJIYXNoKFxuICAgICAgICAgIG5ldyBCbG9iKFtkYXRhXSwge1xuICAgICAgICAgICAgdHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZXJyb3JTdHJpbmcgPSBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3I7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBnZXRHcm91cFByZXZpZXcvJHtsb2dJZH06IEZhaWxlZCB0byBmZXRjaCBhdmF0YXIgJHtlcnJvclN0cmluZ31gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhYm9ydFNpZ25hbC5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRhdGU6IG51bGwsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgaW1hZ2UsXG4gICAgdGl0bGUsXG4gICAgdXJsLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUErQjtBQVUvQixZQUF1QjtBQUN2QixrQkFBNkI7QUFDN0IsZUFBMEI7QUFDMUIsdUJBQWtDO0FBQ2xDLFVBQXFCO0FBQ3JCLGtCQUF5RDtBQUN6RCx1QkFBdUI7QUFDdkIsbUNBQTBCO0FBQzFCLHNCQUF5QjtBQUN6Qix5QkFBNEI7QUFDNUIsaUJBQThCO0FBQzlCLGdDQUFtQztBQUVuQyxNQUFNLHVCQUF1QixLQUFLO0FBRWxDLElBQUk7QUFDSixJQUFJLHNCQUFzQjtBQUMxQixJQUFJLHNCQUFxQyxDQUFDO0FBQzFDLElBQUk7QUFDSixJQUFJO0FBRUcsK0JBQXFDO0FBQzFDLHdCQUFzQjtBQUN4QjtBQUZnQixBQUlULGdDQUF5QztBQUM5QyxTQUFPLFFBQVEsaUJBQWlCO0FBQ2xDO0FBRmdCLEFBSVQsTUFBTSx1QkFBdUIsNEJBQVMsdUJBQXVCLEdBQUc7QUFFdkUsK0JBQ0UsU0FDQSxRQUNBLGVBQ007QUFFTixNQUFJLENBQUMsT0FBTyxPQUFPLHNCQUFzQixHQUFHO0FBQzFDO0FBQUEs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
