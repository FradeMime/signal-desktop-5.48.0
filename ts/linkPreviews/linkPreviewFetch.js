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
var linkPreviewFetch_exports = {};
__export(linkPreviewFetch_exports, {
  fetchLinkPreviewImage: () => fetchLinkPreviewImage,
  fetchLinkPreviewMetadata: () => fetchLinkPreviewMetadata
});
module.exports = __toCommonJS(linkPreviewFetch_exports);
var import_blob_util = require("blob-util");
var import_MIME = require("../types/MIME");
var import_scaleImageToLevel = require("../util/scaleImageToLevel");
var log = __toESM(require("../logging/log"));
const USER_AGENT = "WhatsApp/2";
const MAX_REQUEST_COUNT_WITH_REDIRECTS = 20;
const REDIRECT_STATUSES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const MAX_CONTENT_TYPE_LENGTH_TO_PARSE = 100;
const MAX_HTML_BYTES_TO_LOAD = 1e3 * 1024;
const MIN_HTML_CONTENT_LENGTH = 8;
const MIN_IMAGE_CONTENT_LENGTH = 8;
const MAX_IMAGE_CONTENT_LENGTH = 1024 * 1024;
const VALID_IMAGE_MIME_TYPES = /* @__PURE__ */ new Set([
  import_MIME.IMAGE_GIF,
  import_MIME.IMAGE_ICO,
  import_MIME.IMAGE_JPEG,
  import_MIME.IMAGE_PNG,
  import_MIME.IMAGE_WEBP
]);
const MIN_DATE = 0;
const MAX_DATE = new Date(3e3, 0, 1).valueOf();
const emptyContentType = { type: null, charset: null };
async function fetchWithRedirects(fetchFn, href, options, logger = log) {
  const urlsSeen = /* @__PURE__ */ new Set();
  let nextHrefToLoad = href;
  for (let i = 0; i < MAX_REQUEST_COUNT_WITH_REDIRECTS; i += 1) {
    if (urlsSeen.has(nextHrefToLoad)) {
      logger.warn("fetchWithRedirects: found a redirect loop");
      throw new Error("redirect loop");
    }
    urlsSeen.add(nextHrefToLoad);
    const response = await fetchFn(nextHrefToLoad, {
      ...options,
      redirect: "manual"
    });
    if (!REDIRECT_STATUSES.has(response.status)) {
      return response;
    }
    const location = response.headers.get("location");
    if (!location) {
      logger.warn("fetchWithRedirects: got a redirect status code but no Location header; bailing");
      throw new Error("no location with redirect");
    }
    const newUrl = maybeParseUrl(location, nextHrefToLoad);
    if (newUrl?.protocol !== "https:") {
      logger.warn("fetchWithRedirects: got a redirect status code and an invalid Location header");
      throw new Error("invalid location");
    }
    nextHrefToLoad = newUrl.href;
  }
  logger.warn("fetchWithRedirects: too many redirects");
  throw new Error("too many redirects");
}
function maybeParseUrl(href, base) {
  let result;
  try {
    result = new URL(href, base);
  } catch (err) {
    return null;
  }
  result.hash = "";
  return result;
}
const parseContentType = /* @__PURE__ */ __name((headerValue) => {
  if (!headerValue || headerValue.length > MAX_CONTENT_TYPE_LENGTH_TO_PARSE) {
    return emptyContentType;
  }
  const [rawType, ...rawParameters] = headerValue.toLowerCase().split(/;/g).map((part) => part.trim()).filter(Boolean);
  if (!rawType) {
    return emptyContentType;
  }
  let charset = null;
  for (let i = 0; i < rawParameters.length; i += 1) {
    const rawParameter = rawParameters[i];
    const parsed = new URLSearchParams(rawParameter);
    const parsedCharset = parsed.get("charset")?.trim();
    if (parsedCharset) {
      charset = parsedCharset;
      break;
    }
  }
  return {
    type: (0, import_MIME.stringToMIMEType)(rawType),
    charset
  };
}, "parseContentType");
const isInlineContentDisposition = /* @__PURE__ */ __name((headerValue) => !headerValue || headerValue.split(";", 1)[0] === "inline", "isInlineContentDisposition");
const parseContentLength = /* @__PURE__ */ __name((headerValue) => {
  if (typeof headerValue !== "string" || !/^\d{1,10}$/g.test(headerValue)) {
    return Infinity;
  }
  const result = parseInt(headerValue, 10);
  return Number.isNaN(result) ? Infinity : result;
}, "parseContentLength");
const VALID_CHARSETS = /* @__PURE__ */ new Set([
  "ascii",
  "utf8",
  "utf-8",
  "utf16le",
  "ucs2",
  "ucs-2",
  "base64",
  "latin1",
  "binary",
  "hex"
]);
const checkCharset = /* @__PURE__ */ __name((charSet) => {
  if (!charSet) {
    return false;
  }
  return VALID_CHARSETS.has(charSet);
}, "checkCharset");
const emptyHtmlDocument = /* @__PURE__ */ __name(() => new DOMParser().parseFromString("", "text/html"), "emptyHtmlDocument");
const parseHtmlBytes = /* @__PURE__ */ __name((bytes, httpCharset) => {
  const hasBom = bytes[0] === 239 && bytes[1] === 187 && bytes[2] === 191;
  let isSureOfCharset;
  let decoder;
  if (hasBom) {
    decoder = new TextDecoder();
    isSureOfCharset = true;
  } else if (httpCharset) {
    try {
      decoder = new TextDecoder(httpCharset);
      isSureOfCharset = true;
    } catch (err) {
      decoder = new TextDecoder();
      isSureOfCharset = false;
    }
  } else {
    decoder = new TextDecoder();
    isSureOfCharset = false;
  }
  let decoded;
  try {
    decoded = decoder.decode(bytes);
  } catch (err) {
    decoded = "";
  }
  let document;
  try {
    document = new DOMParser().parseFromString(decoded, "text/html");
  } catch (err) {
    document = emptyHtmlDocument();
  }
  if (!isSureOfCharset) {
    const httpEquiv = document.querySelector('meta[http-equiv="content-type"]')?.getAttribute("content");
    if (httpEquiv) {
      const httpEquivCharset = parseContentType(httpEquiv).charset;
      if (httpEquivCharset) {
        return parseHtmlBytes(bytes, httpEquivCharset);
      }
    }
    const metaCharset = document.querySelector("meta[charset]")?.getAttribute("charset");
    if (metaCharset) {
      return parseHtmlBytes(bytes, metaCharset);
    }
  }
  return document;
}, "parseHtmlBytes");
const getHtmlDocument = /* @__PURE__ */ __name(async (body, httpCharset, abortSignal, logger = log) => {
  let result = emptyHtmlDocument();
  const buffer = new Uint8Array(MAX_HTML_BYTES_TO_LOAD);
  let bytesLoadedSoFar = 0;
  try {
    for await (let chunk of body) {
      if (abortSignal.aborted) {
        break;
      }
      if (typeof chunk === "string") {
        if (!checkCharset(httpCharset)) {
          throw new Error(`Invalid charset: ${httpCharset}`);
        }
        chunk = Buffer.from(chunk, httpCharset || "utf8");
      }
      const truncatedChunk = chunk.slice(0, buffer.length - bytesLoadedSoFar);
      buffer.set(truncatedChunk, bytesLoadedSoFar);
      bytesLoadedSoFar += truncatedChunk.byteLength;
      result = parseHtmlBytes(buffer.slice(0, bytesLoadedSoFar), httpCharset);
      const hasLoadedMaxBytes = bytesLoadedSoFar >= buffer.length;
      if (hasLoadedMaxBytes) {
        break;
      }
    }
  } catch (err) {
    logger.warn("getHtmlDocument: error when reading body; continuing with what we got");
  }
  return result;
}, "getHtmlDocument");
const getOpenGraphContent = /* @__PURE__ */ __name((document, properties) => {
  for (let i = 0; i < properties.length; i += 1) {
    const property = properties[i];
    const content = document.querySelector(`meta[property="${property}"]`)?.getAttribute("content")?.trim();
    if (content) {
      return content;
    }
  }
  return null;
}, "getOpenGraphContent");
const getLinkHrefAttribute = /* @__PURE__ */ __name((document, rels) => {
  for (let i = 0; i < rels.length; i += 1) {
    const rel = rels[i];
    const href = document.querySelector(`link[rel="${rel}"]`)?.getAttribute("href")?.trim();
    if (href) {
      return href;
    }
  }
  return null;
}, "getLinkHrefAttribute");
const parseMetadata = /* @__PURE__ */ __name((document, href, logger = log) => {
  const title = getOpenGraphContent(document, ["og:title"]) || document.title.trim();
  if (!title) {
    logger.warn("parseMetadata: HTML document doesn't have a title; bailing");
    return null;
  }
  const description = getOpenGraphContent(document, ["og:description"]) || document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || null;
  const rawImageHref = getOpenGraphContent(document, ["og:image", "og:image:url"]) || getLinkHrefAttribute(document, [
    "apple-touch-icon",
    "apple-touch-icon-precomposed",
    "shortcut icon",
    "icon"
  ]);
  const imageUrl = rawImageHref ? maybeParseUrl(rawImageHref, href) : null;
  const imageHref = imageUrl ? imageUrl.href : null;
  let date = null;
  const rawDate = getOpenGraphContent(document, [
    "og:published_time",
    "article:published_time",
    "og:modified_time",
    "article:modified_time"
  ]);
  if (rawDate) {
    const parsed = Date.parse(rawDate);
    if (parsed > MIN_DATE && parsed < MAX_DATE) {
      date = parsed;
    }
  }
  return {
    title,
    description,
    imageHref,
    date
  };
}, "parseMetadata");
async function fetchLinkPreviewMetadata(fetchFn, href, abortSignal, logger = log) {
  let response;
  try {
    response = await fetchWithRedirects(fetchFn, href, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": USER_AGENT
      },
      signal: abortSignal
    }, logger);
  } catch (err) {
    logger.warn("fetchLinkPreviewMetadata: failed to fetch link preview HTML; bailing");
    return null;
  }
  if (!response.ok) {
    logger.warn(`fetchLinkPreviewMetadata: got a ${response.status} status code; bailing`);
    return null;
  }
  if (!response.body) {
    logger.warn("fetchLinkPreviewMetadata: no response body; bailing");
    return null;
  }
  if (!isInlineContentDisposition(response.headers.get("Content-Disposition"))) {
    logger.warn("fetchLinkPreviewMetadata: Content-Disposition header is not inline; bailing");
    return null;
  }
  if (abortSignal.aborted) {
    return null;
  }
  const contentLength = parseContentLength(response.headers.get("Content-Length"));
  if (contentLength < MIN_HTML_CONTENT_LENGTH) {
    logger.warn("fetchLinkPreviewMetadata: Content-Length is too short; bailing");
    return null;
  }
  const contentType = parseContentType(response.headers.get("Content-Type"));
  if (contentType.type !== "text/html") {
    logger.warn("fetchLinkPreviewMetadata: Content-Type is not HTML; bailing");
    return null;
  }
  const document = await getHtmlDocument(response.body, contentType.charset, abortSignal, logger);
  try {
    response.body.destroy();
  } catch (err) {
  }
  if (abortSignal.aborted) {
    return null;
  }
  return parseMetadata(document, response.url, logger);
}
async function fetchLinkPreviewImage(fetchFn, href, abortSignal, logger = log) {
  let response;
  try {
    response = await fetchWithRedirects(fetchFn, href, {
      headers: {
        "User-Agent": USER_AGENT
      },
      size: MAX_IMAGE_CONTENT_LENGTH,
      signal: abortSignal
    }, logger);
  } catch (err) {
    logger.warn("fetchLinkPreviewImage: failed to fetch image; bailing");
    return null;
  }
  if (abortSignal.aborted) {
    return null;
  }
  if (!response.ok) {
    logger.warn(`fetchLinkPreviewImage: got a ${response.status} status code; bailing`);
    return null;
  }
  const contentLength = parseContentLength(response.headers.get("Content-Length"));
  if (contentLength < MIN_IMAGE_CONTENT_LENGTH) {
    logger.warn("fetchLinkPreviewImage: Content-Length is too short; bailing");
    return null;
  }
  if (contentLength > MAX_IMAGE_CONTENT_LENGTH) {
    logger.warn("fetchLinkPreviewImage: Content-Length is too large or is unset; bailing");
    return null;
  }
  const { type: contentType } = parseContentType(response.headers.get("Content-Type"));
  if (!contentType || !VALID_IMAGE_MIME_TYPES.has(contentType)) {
    logger.warn("fetchLinkPreviewImage: Content-Type is not an image; bailing");
    return null;
  }
  let data;
  try {
    data = await response.buffer();
  } catch (err) {
    logger.warn("fetchLinkPreviewImage: failed to read body; bailing");
    return null;
  }
  if (abortSignal.aborted) {
    return null;
  }
  if (contentType !== import_MIME.IMAGE_GIF) {
    const dataBlob = new Blob([data], {
      type: contentType
    });
    const { blob: xcodedDataBlob } = await (0, import_scaleImageToLevel.scaleImageToLevel)(dataBlob, contentType, false);
    const xcodedDataArrayBuffer = await (0, import_blob_util.blobToArrayBuffer)(xcodedDataBlob);
    data = new Uint8Array(xcodedDataArrayBuffer);
  }
  return { data, contentType };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchLinkPreviewImage,
  fetchLinkPreviewMetadata
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlua1ByZXZpZXdGZXRjaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVxdWVzdEluaXQsIFJlc3BvbnNlIH0gZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgdHlwZSB7IEFib3J0U2lnbmFsIGFzIEFib3J0U2lnbmFsRm9yTm9kZUZldGNoIH0gZnJvbSAnYWJvcnQtY29udHJvbGxlcic7XG5pbXBvcnQgeyBibG9iVG9BcnJheUJ1ZmZlciB9IGZyb20gJ2Jsb2ItdXRpbCc7XG5cbmltcG9ydCB0eXBlIHsgTUlNRVR5cGUgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB7XG4gIElNQUdFX0dJRixcbiAgSU1BR0VfSUNPLFxuICBJTUFHRV9KUEVHLFxuICBJTUFHRV9QTkcsXG4gIElNQUdFX1dFQlAsXG4gIHN0cmluZ1RvTUlNRVR5cGUsXG59IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgeyBzY2FsZUltYWdlVG9MZXZlbCB9IGZyb20gJy4uL3V0aWwvc2NhbGVJbWFnZVRvTGV2ZWwnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuY29uc3QgVVNFUl9BR0VOVCA9ICdXaGF0c0FwcC8yJztcblxuY29uc3QgTUFYX1JFUVVFU1RfQ09VTlRfV0lUSF9SRURJUkVDVFMgPSAyMDtcblxuLy8gTGlmdGVkIGZyb20gdGhlIGBmZXRjaGAgc3BlYyBbaGVyZV1bMF0uXG4vLyBbMF06IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZWRpcmVjdC1zdGF0dXNcbmNvbnN0IFJFRElSRUNUX1NUQVRVU0VTID0gbmV3IFNldChbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdKTtcblxuY29uc3QgTUFYX0NPTlRFTlRfVFlQRV9MRU5HVEhfVE9fUEFSU0UgPSAxMDA7XG5cbi8vIFRob3VnaCB3ZSdsbCBhY2NlcHQgSFRNTCBvZiBhbnkgQ29udGVudC1MZW5ndGggKGluY2x1ZGluZyBubyBzcGVjaWZpZWQgbGVuZ3RoKSwgd2Vcbi8vICAgd2lsbCBvbmx5IGxvYWQgc29tZSBvZiB0aGUgSFRNTC4gU28gd2UgbWlnaHQgc3RhcnQgbG9hZGluZyBhIDk5IGdpZ2FieXRlIEhUTUwgcGFnZVxuLy8gICBidXQgb25seSBwYXJzZSB0aGUgZmlyc3QgMTAwMCBraWxvYnl0ZXMuIEhvd2V2ZXIsIGlmIHRoZSBDb250ZW50LUxlbmd0aCBpcyBsZXNzIHRoYW5cbi8vICAgdGhpcywgd2Ugd29uJ3Qgd2FzdGUgc3BhY2UuXG5jb25zdCBNQVhfSFRNTF9CWVRFU19UT19MT0FEID0gMTAwMCAqIDEwMjQ7XG5cbi8vIGA8dGl0bGU+eGAgaXMgOCBieXRlcy4gTm90aGluZyBlbHNlIChtZXRhIHRhZ3MsIGV0Yykgd2lsbCBldmVuIGZpdCwgc28gd2UgY2FuIGlnbm9yZVxuLy8gICBpdC4gVGhpcyBpcyBtb3N0bHkgdG8gcHJvdGVjdCB1cyBhZ2FpbnN0IGVtcHR5IHJlc3BvbnNlIGJvZGllcy5cbmNvbnN0IE1JTl9IVE1MX0NPTlRFTlRfTEVOR1RIID0gODtcblxuLy8gU2ltaWxhciB0byB0aGUgYWJvdmUuIFdlIGRvbid0IHdhbnQgdG8gc2hvdyB0aW55IGltYWdlcyAoZXZlbiB0aG91Z2ggdGhlIG1vcmUgbGlrZWx5XG4vLyAgIGNhc2UgaXMgdGhhdCB0aGUgQ29udGVudC1MZW5ndGggaXMgMCkuXG5jb25zdCBNSU5fSU1BR0VfQ09OVEVOVF9MRU5HVEggPSA4O1xuY29uc3QgTUFYX0lNQUdFX0NPTlRFTlRfTEVOR1RIID0gMTAyNCAqIDEwMjQ7XG5jb25zdCBWQUxJRF9JTUFHRV9NSU1FX1RZUEVTOiBTZXQ8TUlNRVR5cGU+ID0gbmV3IFNldChbXG4gIElNQUdFX0dJRixcbiAgSU1BR0VfSUNPLFxuICBJTUFHRV9KUEVHLFxuICBJTUFHRV9QTkcsXG4gIElNQUdFX1dFQlAsXG5dKTtcblxuLy8gV2Ugd2FudCB0byBkaXNjYXJkIHVucmVhc29uYWJsZSBkYXRlcy4gVXBkYXRlIHRoaXMgaW4gfjk1MCB5ZWFycy4gKFRoaXMgbWF5IGRpc2NhcmRcbi8vICAgc29tZSByZWFzb25hYmxlIGRhdGVzLCB3aGljaCBpcyBva2F5IGJlY2F1c2UgaXQgaXMgb25seSBmb3IgbGluayBwcmV2aWV3cy4pXG5jb25zdCBNSU5fREFURSA9IDA7XG5jb25zdCBNQVhfREFURSA9IG5ldyBEYXRlKDMwMDAsIDAsIDEpLnZhbHVlT2YoKTtcblxuY29uc3QgZW1wdHlDb250ZW50VHlwZSA9IHsgdHlwZTogbnVsbCwgY2hhcnNldDogbnVsbCB9O1xuXG5leHBvcnQgdHlwZSBGZXRjaEZuID0gKGhyZWY6IHN0cmluZywgaW5pdDogUmVxdWVzdEluaXQpID0+IFByb21pc2U8UmVzcG9uc2U+O1xuXG5leHBvcnQgdHlwZSBMaW5rUHJldmlld01ldGFkYXRhID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogbnVsbCB8IHN0cmluZztcbiAgZGF0ZTogbnVsbCB8IG51bWJlcjtcbiAgaW1hZ2VIcmVmOiBudWxsIHwgc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgTGlua1ByZXZpZXdJbWFnZSA9IHtcbiAgZGF0YTogVWludDhBcnJheTtcbiAgY29udGVudFR5cGU6IE1JTUVUeXBlO1xufTtcblxudHlwZSBQYXJzZWRDb250ZW50VHlwZSA9XG4gIHwgeyB0eXBlOiBudWxsOyBjaGFyc2V0OiBudWxsIH1cbiAgfCB7IHR5cGU6IE1JTUVUeXBlOyBjaGFyc2V0OiBudWxsIHwgc3RyaW5nIH07XG5cbi8vIFRoaXMgdGhyb3dzIG5vbi1oZWxwZnVsIGVycm9ycyBiZWNhdXNlICgxKSBpdCBsb2dzICgyKSBpdCB3aWxsIGJlIGltbWVkaWF0ZWx5IGNhdWdodC5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2l0aFJlZGlyZWN0cyhcbiAgZmV0Y2hGbjogRmV0Y2hGbixcbiAgaHJlZjogc3RyaW5nLFxuICBvcHRpb25zOiBSZXF1ZXN0SW5pdCxcbiAgbG9nZ2VyOiBQaWNrPExvZ2dlclR5cGUsICd3YXJuJz4gPSBsb2dcbik6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgY29uc3QgdXJsc1NlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBsZXQgbmV4dEhyZWZUb0xvYWQgPSBocmVmO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9SRVFVRVNUX0NPVU5UX1dJVEhfUkVESVJFQ1RTOyBpICs9IDEpIHtcbiAgICBpZiAodXJsc1NlZW4uaGFzKG5leHRIcmVmVG9Mb2FkKSkge1xuICAgICAgbG9nZ2VyLndhcm4oJ2ZldGNoV2l0aFJlZGlyZWN0czogZm91bmQgYSByZWRpcmVjdCBsb29wJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlZGlyZWN0IGxvb3AnKTtcbiAgICB9XG4gICAgdXJsc1NlZW4uYWRkKG5leHRIcmVmVG9Mb2FkKTtcblxuICAgIC8vIFRoaXMgYGF3YWl0YCBpcyBkZWxpYmVyYXRlbHkgaW5zaWRlIG9mIGEgbG9vcC5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hGbihuZXh0SHJlZlRvTG9hZCwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHJlZGlyZWN0OiAnbWFudWFsJyxcbiAgICB9KTtcblxuICAgIGlmICghUkVESVJFQ1RfU1RBVFVTRVMuaGFzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdsb2NhdGlvbicpO1xuICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAnZmV0Y2hXaXRoUmVkaXJlY3RzOiBnb3QgYSByZWRpcmVjdCBzdGF0dXMgY29kZSBidXQgbm8gTG9jYXRpb24gaGVhZGVyOyBiYWlsaW5nJ1xuICAgICAgKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbG9jYXRpb24gd2l0aCByZWRpcmVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1VybCA9IG1heWJlUGFyc2VVcmwobG9jYXRpb24sIG5leHRIcmVmVG9Mb2FkKTtcbiAgICBpZiAobmV3VXJsPy5wcm90b2NvbCAhPT0gJ2h0dHBzOicpIHtcbiAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAnZmV0Y2hXaXRoUmVkaXJlY3RzOiBnb3QgYSByZWRpcmVjdCBzdGF0dXMgY29kZSBhbmQgYW4gaW52YWxpZCBMb2NhdGlvbiBoZWFkZXInXG4gICAgICApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGxvY2F0aW9uJyk7XG4gICAgfVxuXG4gICAgbmV4dEhyZWZUb0xvYWQgPSBuZXdVcmwuaHJlZjtcbiAgfVxuXG4gIGxvZ2dlci53YXJuKCdmZXRjaFdpdGhSZWRpcmVjdHM6IHRvbyBtYW55IHJlZGlyZWN0cycpO1xuICB0aHJvdyBuZXcgRXJyb3IoJ3RvbyBtYW55IHJlZGlyZWN0cycpO1xufVxuXG5mdW5jdGlvbiBtYXliZVBhcnNlVXJsKGhyZWY6IHN0cmluZywgYmFzZTogc3RyaW5nKTogbnVsbCB8IFVSTCB7XG4gIGxldCByZXN1bHQ6IFVSTDtcbiAgdHJ5IHtcbiAgICByZXN1bHQgPSBuZXcgVVJMKGhyZWYsIGJhc2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBXZSBuZXZlciBuZWVkIHRoZSBoYXNoXG4gIHJlc3VsdC5oYXNoID0gJyc7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgQ29udGVudC1UeXBlIGhlYWRlciB2YWx1ZS4gUmVmZXIgdG8gW1JGQyAyMDQ1XVswXSBmb3IgZGV0YWlscyAodGhvdWdoIHRoaXMgaXNcbiAqIGEgc2ltcGxpZmllZCB2ZXJzaW9uIGZvciBsaW5rIHByZXZpZXdzKS5cbiAqIFswXTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIwNDVcbiAqL1xuY29uc3QgcGFyc2VDb250ZW50VHlwZSA9IChoZWFkZXJWYWx1ZTogc3RyaW5nIHwgbnVsbCk6IFBhcnNlZENvbnRlbnRUeXBlID0+IHtcbiAgaWYgKCFoZWFkZXJWYWx1ZSB8fCBoZWFkZXJWYWx1ZS5sZW5ndGggPiBNQVhfQ09OVEVOVF9UWVBFX0xFTkdUSF9UT19QQVJTRSkge1xuICAgIHJldHVybiBlbXB0eUNvbnRlbnRUeXBlO1xuICB9XG5cbiAgY29uc3QgW3Jhd1R5cGUsIC4uLnJhd1BhcmFtZXRlcnNdID0gaGVhZGVyVmFsdWVcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdCgvOy9nKVxuICAgIC5tYXAocGFydCA9PiBwYXJ0LnRyaW0oKSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICBpZiAoIXJhd1R5cGUpIHtcbiAgICByZXR1cm4gZW1wdHlDb250ZW50VHlwZTtcbiAgfVxuXG4gIGxldCBjaGFyc2V0OiBudWxsIHwgc3RyaW5nID0gbnVsbDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdQYXJhbWV0ZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmF3UGFyYW1ldGVyID0gcmF3UGFyYW1ldGVyc1tpXTtcbiAgICBjb25zdCBwYXJzZWQgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHJhd1BhcmFtZXRlcik7XG4gICAgY29uc3QgcGFyc2VkQ2hhcnNldCA9IHBhcnNlZC5nZXQoJ2NoYXJzZXQnKT8udHJpbSgpO1xuICAgIGlmIChwYXJzZWRDaGFyc2V0KSB7XG4gICAgICBjaGFyc2V0ID0gcGFyc2VkQ2hhcnNldDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogc3RyaW5nVG9NSU1FVHlwZShyYXdUeXBlKSxcbiAgICBjaGFyc2V0LFxuICB9O1xufTtcblxuY29uc3QgaXNJbmxpbmVDb250ZW50RGlzcG9zaXRpb24gPSAoaGVhZGVyVmFsdWU6IHN0cmluZyB8IG51bGwpOiBib29sZWFuID0+XG4gICFoZWFkZXJWYWx1ZSB8fCBoZWFkZXJWYWx1ZS5zcGxpdCgnOycsIDEpWzBdID09PSAnaW5saW5lJztcblxuY29uc3QgcGFyc2VDb250ZW50TGVuZ3RoID0gKGhlYWRlclZhbHVlOiBzdHJpbmcgfCBudWxsKTogbnVtYmVyID0+IHtcbiAgLy8gTm8gbmVlZCB0byBwYXJzZSBnaWdhbnRpYyBDb250ZW50LUxlbmd0aHM7IG9ubHkgcGFyc2UgdGhlIGZpcnN0IDEwIGRpZ2l0cy5cbiAgaWYgKHR5cGVvZiBoZWFkZXJWYWx1ZSAhPT0gJ3N0cmluZycgfHwgIS9eXFxkezEsMTB9JC9nLnRlc3QoaGVhZGVyVmFsdWUpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IHBhcnNlSW50KGhlYWRlclZhbHVlLCAxMCk7XG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocmVzdWx0KSA/IEluZmluaXR5IDogcmVzdWx0O1xufTtcblxudHlwZSBWYWxpZENoYXJzZXQgPVxuICB8ICdhc2NpaSdcbiAgfCAndXRmOCdcbiAgfCAndXRmLTgnXG4gIHwgJ3V0ZjE2bGUnXG4gIHwgJ3VjczInXG4gIHwgJ3Vjcy0yJ1xuICB8ICdiYXNlNjQnXG4gIHwgJ2xhdGluMSdcbiAgfCAnYmluYXJ5J1xuICB8ICdoZXgnO1xuXG5jb25zdCBWQUxJRF9DSEFSU0VUUyA9IG5ldyBTZXQoW1xuICAnYXNjaWknLFxuICAndXRmOCcsXG4gICd1dGYtOCcsXG4gICd1dGYxNmxlJyxcbiAgJ3VjczInLFxuICAndWNzLTInLFxuICAnYmFzZTY0JyxcbiAgJ2xhdGluMScsXG4gICdiaW5hcnknLFxuICAnaGV4Jyxcbl0pO1xuXG5jb25zdCBjaGVja0NoYXJzZXQgPSAoY2hhclNldDogc3RyaW5nIHwgbnVsbCk6IGNoYXJTZXQgaXMgVmFsaWRDaGFyc2V0ID0+IHtcbiAgaWYgKCFjaGFyU2V0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBWQUxJRF9DSEFSU0VUUy5oYXMoY2hhclNldCk7XG59O1xuXG5jb25zdCBlbXB0eUh0bWxEb2N1bWVudCA9ICgpOiBIVE1MRG9jdW1lbnQgPT5cbiAgbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZygnJywgJ3RleHQvaHRtbCcpO1xuXG4vLyBUaGUgY2hhcnNldCBiZWhhdmlvciBoZXJlIGZvbGxvd3MgdGhlIFtXMyBndWlkZWxpbmVzXVswXS4gVGhlIHByaW9yaXR5IGlzIEJPTSwgSFRUUFxuLy8gICBoZWFkZXIsIGBodHRwLWVxdWl2YCBtZXRhIHRhZywgYGNoYXJzZXRgIG1ldGEgdGFnLCBhbmQgZmluYWxseSBhIFVURi04IGZhbGxiYWNrLlxuLy8gICAoVGhpcyBmYWxsYmFjayBjb3VsZCwgcGVyaGFwcywgYmUgc21hcnRlciBiYXNlZCBvbiB1c2VyIGxvY2FsZS4pXG4vLyBbMF06IGh0dHBzOi8vd3d3LnczLm9yZy9JbnRlcm5hdGlvbmFsL3F1ZXN0aW9ucy9xYS1odG1sLWVuY29kaW5nLWRlY2xhcmF0aW9ucy5lblxuY29uc3QgcGFyc2VIdG1sQnl0ZXMgPSAoXG4gIGJ5dGVzOiBSZWFkb25seTxVaW50OEFycmF5PixcbiAgaHR0cENoYXJzZXQ6IHN0cmluZyB8IG51bGxcbik6IEhUTUxEb2N1bWVudCA9PiB7XG4gIGNvbnN0IGhhc0JvbSA9IGJ5dGVzWzBdID09PSAweGVmICYmIGJ5dGVzWzFdID09PSAweGJiICYmIGJ5dGVzWzJdID09PSAweGJmO1xuXG4gIGxldCBpc1N1cmVPZkNoYXJzZXQ6IGJvb2xlYW47XG4gIGxldCBkZWNvZGVyOiBUZXh0RGVjb2RlcjtcbiAgaWYgKGhhc0JvbSkge1xuICAgIGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICBpc1N1cmVPZkNoYXJzZXQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKGh0dHBDaGFyc2V0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoaHR0cENoYXJzZXQpO1xuICAgICAgaXNTdXJlT2ZDaGFyc2V0ID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgIGlzU3VyZU9mQ2hhcnNldCA9IGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgaXNTdXJlT2ZDaGFyc2V0ID0gZmFsc2U7XG4gIH1cblxuICBsZXQgZGVjb2RlZDogc3RyaW5nO1xuICB0cnkge1xuICAgIGRlY29kZWQgPSBkZWNvZGVyLmRlY29kZShieXRlcyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlY29kZWQgPSAnJztcbiAgfVxuXG4gIGxldCBkb2N1bWVudDogSFRNTERvY3VtZW50O1xuICB0cnkge1xuICAgIGRvY3VtZW50ID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkZWNvZGVkLCAndGV4dC9odG1sJyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRvY3VtZW50ID0gZW1wdHlIdG1sRG9jdW1lbnQoKTtcbiAgfVxuXG4gIGlmICghaXNTdXJlT2ZDaGFyc2V0KSB7XG4gICAgY29uc3QgaHR0cEVxdWl2ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCdtZXRhW2h0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIl0nKVxuICAgICAgPy5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKTtcbiAgICBpZiAoaHR0cEVxdWl2KSB7XG4gICAgICBjb25zdCBodHRwRXF1aXZDaGFyc2V0ID0gcGFyc2VDb250ZW50VHlwZShodHRwRXF1aXYpLmNoYXJzZXQ7XG4gICAgICBpZiAoaHR0cEVxdWl2Q2hhcnNldCkge1xuICAgICAgICByZXR1cm4gcGFyc2VIdG1sQnl0ZXMoYnl0ZXMsIGh0dHBFcXVpdkNoYXJzZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1ldGFDaGFyc2V0ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCdtZXRhW2NoYXJzZXRdJylcbiAgICAgID8uZ2V0QXR0cmlidXRlKCdjaGFyc2V0Jyk7XG4gICAgaWYgKG1ldGFDaGFyc2V0KSB7XG4gICAgICByZXR1cm4gcGFyc2VIdG1sQnl0ZXMoYnl0ZXMsIG1ldGFDaGFyc2V0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5jb25zdCBnZXRIdG1sRG9jdW1lbnQgPSBhc3luYyAoXG4gIGJvZHk6IEFzeW5jSXRlcmFibGU8c3RyaW5nIHwgVWludDhBcnJheT4sXG4gIGh0dHBDaGFyc2V0OiBzdHJpbmcgfCBudWxsLFxuICBhYm9ydFNpZ25hbDogQWJvcnRTaWduYWwsXG4gIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnd2Fybic+ID0gbG9nXG4pOiBQcm9taXNlPEhUTUxEb2N1bWVudD4gPT4ge1xuICBsZXQgcmVzdWx0OiBIVE1MRG9jdW1lbnQgPSBlbXB0eUh0bWxEb2N1bWVudCgpO1xuXG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KE1BWF9IVE1MX0JZVEVTX1RPX0xPQUQpO1xuICBsZXQgYnl0ZXNMb2FkZWRTb0ZhciA9IDA7XG5cbiAgdHJ5IHtcbiAgICBmb3IgYXdhaXQgKGxldCBjaHVuayBvZiBib2R5KSB7XG4gICAgICBpZiAoYWJvcnRTaWduYWwuYWJvcnRlZCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gVGhpcyBjaGVjayBleGlzdHMgdG8gc2F0aXNmeSBUeXBlU2NyaXB0OyBjaHVuayBzaG91bGQgYWx3YXlzIGJlIGEgQnVmZmVyLlxuICAgICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKCFjaGVja0NoYXJzZXQoaHR0cENoYXJzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJzZXQ6ICR7aHR0cENoYXJzZXR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2h1bmsgPSBCdWZmZXIuZnJvbShjaHVuaywgaHR0cENoYXJzZXQgfHwgJ3V0ZjgnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHJ1bmNhdGVkQ2h1bmsgPSBjaHVuay5zbGljZSgwLCBidWZmZXIubGVuZ3RoIC0gYnl0ZXNMb2FkZWRTb0Zhcik7XG4gICAgICBidWZmZXIuc2V0KHRydW5jYXRlZENodW5rLCBieXRlc0xvYWRlZFNvRmFyKTtcbiAgICAgIGJ5dGVzTG9hZGVkU29GYXIgKz0gdHJ1bmNhdGVkQ2h1bmsuYnl0ZUxlbmd0aDtcblxuICAgICAgcmVzdWx0ID0gcGFyc2VIdG1sQnl0ZXMoYnVmZmVyLnNsaWNlKDAsIGJ5dGVzTG9hZGVkU29GYXIpLCBodHRwQ2hhcnNldCk7XG5cbiAgICAgIGNvbnN0IGhhc0xvYWRlZE1heEJ5dGVzID0gYnl0ZXNMb2FkZWRTb0ZhciA+PSBidWZmZXIubGVuZ3RoO1xuICAgICAgaWYgKGhhc0xvYWRlZE1heEJ5dGVzKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICAnZ2V0SHRtbERvY3VtZW50OiBlcnJvciB3aGVuIHJlYWRpbmcgYm9keTsgY29udGludWluZyB3aXRoIHdoYXQgd2UgZ290J1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgZ2V0T3BlbkdyYXBoQ29udGVudCA9IChcbiAgZG9jdW1lbnQ6IEhUTUxEb2N1bWVudCxcbiAgcHJvcGVydGllczogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4pOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYG1ldGFbcHJvcGVydHk9XCIke3Byb3BlcnR5fVwiXWApXG4gICAgICA/LmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICA/LnRyaW0oKTtcbiAgICBpZiAoY29udGVudCkge1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgZ2V0TGlua0hyZWZBdHRyaWJ1dGUgPSAoXG4gIGRvY3VtZW50OiBIVE1MRG9jdW1lbnQsXG4gIHJlbHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPlxuKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJlbCA9IHJlbHNbaV07XG4gICAgY29uc3QgaHJlZiA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCIke3JlbH1cIl1gKVxuICAgICAgPy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICAgPy50cmltKCk7XG4gICAgaWYgKGhyZWYpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHBhcnNlTWV0YWRhdGEgPSAoXG4gIGRvY3VtZW50OiBIVE1MRG9jdW1lbnQsXG4gIGhyZWY6IHN0cmluZyxcbiAgbG9nZ2VyOiBQaWNrPExvZ2dlclR5cGUsICd3YXJuJz4gPSBsb2dcbik6IExpbmtQcmV2aWV3TWV0YWRhdGEgfCBudWxsID0+IHtcbiAgY29uc3QgdGl0bGUgPVxuICAgIGdldE9wZW5HcmFwaENvbnRlbnQoZG9jdW1lbnQsIFsnb2c6dGl0bGUnXSkgfHwgZG9jdW1lbnQudGl0bGUudHJpbSgpO1xuICBpZiAoIXRpdGxlKSB7XG4gICAgbG9nZ2VyLndhcm4oXCJwYXJzZU1ldGFkYXRhOiBIVE1MIGRvY3VtZW50IGRvZXNuJ3QgaGF2ZSBhIHRpdGxlOyBiYWlsaW5nXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGVzY3JpcHRpb24gPVxuICAgIGdldE9wZW5HcmFwaENvbnRlbnQoZG9jdW1lbnQsIFsnb2c6ZGVzY3JpcHRpb24nXSkgfHxcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImRlc2NyaXB0aW9uXCJdJylcbiAgICAgID8uZ2V0QXR0cmlidXRlKCdjb250ZW50JylcbiAgICAgID8udHJpbSgpIHx8XG4gICAgbnVsbDtcblxuICBjb25zdCByYXdJbWFnZUhyZWYgPVxuICAgIGdldE9wZW5HcmFwaENvbnRlbnQoZG9jdW1lbnQsIFsnb2c6aW1hZ2UnLCAnb2c6aW1hZ2U6dXJsJ10pIHx8XG4gICAgZ2V0TGlua0hyZWZBdHRyaWJ1dGUoZG9jdW1lbnQsIFtcbiAgICAgICdhcHBsZS10b3VjaC1pY29uJyxcbiAgICAgICdhcHBsZS10b3VjaC1pY29uLXByZWNvbXBvc2VkJyxcbiAgICAgICdzaG9ydGN1dCBpY29uJyxcbiAgICAgICdpY29uJyxcbiAgICBdKTtcbiAgY29uc3QgaW1hZ2VVcmwgPSByYXdJbWFnZUhyZWYgPyBtYXliZVBhcnNlVXJsKHJhd0ltYWdlSHJlZiwgaHJlZikgOiBudWxsO1xuICBjb25zdCBpbWFnZUhyZWYgPSBpbWFnZVVybCA/IGltYWdlVXJsLmhyZWYgOiBudWxsO1xuXG4gIGxldCBkYXRlOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgcmF3RGF0ZSA9IGdldE9wZW5HcmFwaENvbnRlbnQoZG9jdW1lbnQsIFtcbiAgICAnb2c6cHVibGlzaGVkX3RpbWUnLFxuICAgICdhcnRpY2xlOnB1Ymxpc2hlZF90aW1lJyxcbiAgICAnb2c6bW9kaWZpZWRfdGltZScsXG4gICAgJ2FydGljbGU6bW9kaWZpZWRfdGltZScsXG4gIF0pO1xuICBpZiAocmF3RGF0ZSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IERhdGUucGFyc2UocmF3RGF0ZSk7XG4gICAgaWYgKHBhcnNlZCA+IE1JTl9EQVRFICYmIHBhcnNlZCA8IE1BWF9EQVRFKSB7XG4gICAgICBkYXRlID0gcGFyc2VkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgaW1hZ2VIcmVmLFxuICAgIGRhdGUsXG4gIH07XG59O1xuXG4vKipcbiAqIFRoaXMgYXR0ZW1wdHMgdG8gZmV0Y2ggbGluayBwcmV2aWV3IG1ldGFkYXRhLCByZXNvbHZpbmcgd2l0aCBgbnVsbGAgaWYgaXQgY2Fubm90XG4gKiBiZSBmb3VuZCBmb3IgYW55IHJlYXNvbi5cbiAqXG4gKiBOT1RFOiBUaGlzIGRvZXMgTk9UIHZhbGlkYXRlIHRoZSBpbmNvbWluZyBVUkwgZm9yIHNhZmV0eS4gRm9yIGV4YW1wbGUsIGl0IG1heSBmZXRjaCBhblxuICogaW5zZWN1cmUgSFRUUCBocmVmLiBJdCBhbHNvIGRvZXMgbm90IG9mZmVyIGEgdGltZW91dDsgdGhhdCBpcyB1cCB0byB0aGUgY2FsbGVyLlxuICpcbiAqIEF0IGEgaGlnaCBsZXZlbCwgaXQ6XG4gKlxuICogMS4gTWFrZXMgYSBHRVQgcmVxdWVzdCwgZm9sbG93aW5nIHVwIHRvIDIwIHJlZGlyZWN0cyAoYGZldGNoYCdzIGRlZmF1bHQpLlxuICogMi4gQ2hlY2tzIHRoZSByZXNwb25zZSBzdGF0dXMgY29kZSBhbmQgaGVhZGVycyB0byBtYWtlIHN1cmUgaXQncyBhIG5vcm1hbCBIVE1MXG4gKiAgICByZXNwb25zZS5cbiAqIDMuIFN0cmVhbXMgdXAgdG8gYE1BWF9IVE1MX0JZVEVTX1RPX0xPQURgLCBzdG9wcGluZyB3aGVuICgxKSBpdCBoYXMgbG9hZGVkIGFsbCBvZiB0aGVcbiAqICAgIEhUTUwgKDIpIGxvYWRlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgYnl0ZXMgKDMpIGZpbmlzaGVkIGxvYWRpbmcgdGhlIGA8aGVhZD5gLlxuICogNC4gUGFyc2VzIHRoZSByZXN1bHRpbmcgSFRNTCB3aXRoIGBET01QYXJzZXJgLlxuICogNS4gR3JhYnMgdGhlIHRpdGxlLCBkZXNjcmlwdGlvbiwgaW1hZ2UgVVJMLCBhbmQgZGF0ZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgZmV0Y2hGbjogRmV0Y2hGbixcbiAgaHJlZjogc3RyaW5nLFxuICBhYm9ydFNpZ25hbDogQWJvcnRTaWduYWwsXG4gIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnd2Fybic+ID0gbG9nXG4pOiBQcm9taXNlPG51bGwgfCBMaW5rUHJldmlld01ldGFkYXRhPiB7XG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XG4gIHRyeSB7XG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaFdpdGhSZWRpcmVjdHMoXG4gICAgICBmZXRjaEZuLFxuICAgICAgaHJlZixcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEFjY2VwdDogJ3RleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICAgICAgICdVc2VyLUFnZW50JzogVVNFUl9BR0VOVCxcbiAgICAgICAgfSxcbiAgICAgICAgc2lnbmFsOiBhYm9ydFNpZ25hbCBhcyBBYm9ydFNpZ25hbEZvck5vZGVGZXRjaCxcbiAgICAgIH0sXG4gICAgICBsb2dnZXJcbiAgICApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybihcbiAgICAgICdmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGE6IGZhaWxlZCB0byBmZXRjaCBsaW5rIHByZXZpZXcgSFRNTDsgYmFpbGluZydcbiAgICApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGxvZ2dlci53YXJuKFxuICAgICAgYGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogZ290IGEgJHtyZXNwb25zZS5zdGF0dXN9IHN0YXR1cyBjb2RlOyBiYWlsaW5nYFxuICAgICk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICBsb2dnZXIud2FybignZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhOiBubyByZXNwb25zZSBib2R5OyBiYWlsaW5nJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoXG4gICAgIWlzSW5saW5lQ29udGVudERpc3Bvc2l0aW9uKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LURpc3Bvc2l0aW9uJykpXG4gICkge1xuICAgIGxvZ2dlci53YXJuKFxuICAgICAgJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogQ29udGVudC1EaXNwb3NpdGlvbiBoZWFkZXIgaXMgbm90IGlubGluZTsgYmFpbGluZydcbiAgICApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKGFib3J0U2lnbmFsLmFib3J0ZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBwYXJzZUNvbnRlbnRMZW5ndGgoXG4gICAgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtTGVuZ3RoJylcbiAgKTtcbiAgaWYgKGNvbnRlbnRMZW5ndGggPCBNSU5fSFRNTF9DT05URU5UX0xFTkdUSCkge1xuICAgIGxvZ2dlci53YXJuKFxuICAgICAgJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogQ29udGVudC1MZW5ndGggaXMgdG9vIHNob3J0OyBiYWlsaW5nJ1xuICAgICk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBjb250ZW50VHlwZSA9IHBhcnNlQ29udGVudFR5cGUocmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKTtcbiAgaWYgKGNvbnRlbnRUeXBlLnR5cGUgIT09ICd0ZXh0L2h0bWwnKSB7XG4gICAgbG9nZ2VyLndhcm4oJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogQ29udGVudC1UeXBlIGlzIG5vdCBIVE1MOyBiYWlsaW5nJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBkb2N1bWVudCA9IGF3YWl0IGdldEh0bWxEb2N1bWVudChcbiAgICByZXNwb25zZS5ib2R5LFxuICAgIGNvbnRlbnRUeXBlLmNoYXJzZXQsXG4gICAgYWJvcnRTaWduYWwsXG4gICAgbG9nZ2VyXG4gICk7XG5cbiAgLy8gW1RoZSBOb2RlIGRvY3MgYWJvdXQgYFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl1gXVswXSBzYXkgdGhhdFxuICAvLyAgIHRoZSBzdHJlYW0gd2lsbCBiZSBkZXN0cm95ZWQgaWYgeW91IGBicmVha2Agb3V0IG9mIHRoZSBsb29wLCBidXQgSSBjb3VsZCBub3RcbiAgLy8gICByZXByb2R1Y2UgdGhpcy4gQWxzbyBbYGRlc3Ryb3lgIGlzIGEgZG9jdW1lbnRlZCBtZXRob2RdWzFdIGJ1dCBpdCBpcyBub3QgaW4gdGhlXG4gIC8vICAgTm9kZSB0eXBlcywgd2hpY2ggaXMgd2h5IHdlIGRvIHRoaXMgY2FzdCB0byBgYW55YC5cbiAgLy8gWzBdOiBodHRwczovL25vZGVqcy5vcmcvZG9jcy9sYXRlc3QtdjEyLngvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9yZWFkYWJsZV9zeW1ib2xfYXN5bmNpdGVyYXRvclxuICAvLyBbMV06IGh0dHBzOi8vbm9kZWpzLm9yZy9kb2NzL2xhdGVzdC12MTIueC9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX3JlYWRhYmxlX2Rlc3Ryb3lfZXJyb3JcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIChyZXNwb25zZS5ib2R5IGFzIGFueSkuZGVzdHJveSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBJZ25vcmVkLlxuICB9XG5cbiAgaWYgKGFib3J0U2lnbmFsLmFib3J0ZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZU1ldGFkYXRhKGRvY3VtZW50LCByZXNwb25zZS51cmwsIGxvZ2dlcik7XG59XG5cbi8qKlxuICogVGhpcyBhdHRlbXB0cyB0byBmZXRjaCBhbiBpbWFnZSwgcmVzb2x2aW5nIHdpdGggYG51bGxgIGlmIGl0IGZhaWxzIGZvciBhbnkgcmVhc29uLlxuICpcbiAqIE5PVEU6IFRoaXMgZG9lcyBOT1QgdmFsaWRhdGUgdGhlIGluY29taW5nIFVSTCBmb3Igc2FmZXR5LiBGb3IgZXhhbXBsZSwgaXQgbWF5IGZldGNoIGFuXG4gKiBpbnNlY3VyZSBIVFRQIGhyZWYuIEl0IGFsc28gZG9lcyBub3Qgb2ZmZXIgYSB0aW1lb3V0OyB0aGF0IGlzIHVwIHRvIHRoZSBjYWxsZXIuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gIGZldGNoRm46IEZldGNoRm4sXG4gIGhyZWY6IHN0cmluZyxcbiAgYWJvcnRTaWduYWw6IEFib3J0U2lnbmFsLFxuICBsb2dnZXI6IFBpY2s8TG9nZ2VyVHlwZSwgJ3dhcm4nPiA9IGxvZ1xuKTogUHJvbWlzZTxudWxsIHwgTGlua1ByZXZpZXdJbWFnZT4ge1xuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xuICB0cnkge1xuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hXaXRoUmVkaXJlY3RzKFxuICAgICAgZmV0Y2hGbixcbiAgICAgIGhyZWYsXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnVXNlci1BZ2VudCc6IFVTRVJfQUdFTlQsXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IE1BWF9JTUFHRV9DT05URU5UX0xFTkdUSCxcbiAgICAgICAgc2lnbmFsOiBhYm9ydFNpZ25hbCBhcyBBYm9ydFNpZ25hbEZvck5vZGVGZXRjaCxcbiAgICAgIH0sXG4gICAgICBsb2dnZXJcbiAgICApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIud2FybignZmV0Y2hMaW5rUHJldmlld0ltYWdlOiBmYWlsZWQgdG8gZmV0Y2ggaW1hZ2U7IGJhaWxpbmcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChhYm9ydFNpZ25hbC5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICBgZmV0Y2hMaW5rUHJldmlld0ltYWdlOiBnb3QgYSAke3Jlc3BvbnNlLnN0YXR1c30gc3RhdHVzIGNvZGU7IGJhaWxpbmdgXG4gICAgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBwYXJzZUNvbnRlbnRMZW5ndGgoXG4gICAgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtTGVuZ3RoJylcbiAgKTtcbiAgaWYgKGNvbnRlbnRMZW5ndGggPCBNSU5fSU1BR0VfQ09OVEVOVF9MRU5HVEgpIHtcbiAgICBsb2dnZXIud2FybignZmV0Y2hMaW5rUHJldmlld0ltYWdlOiBDb250ZW50LUxlbmd0aCBpcyB0b28gc2hvcnQ7IGJhaWxpbmcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY29udGVudExlbmd0aCA+IE1BWF9JTUFHRV9DT05URU5UX0xFTkdUSCkge1xuICAgIGxvZ2dlci53YXJuKFxuICAgICAgJ2ZldGNoTGlua1ByZXZpZXdJbWFnZTogQ29udGVudC1MZW5ndGggaXMgdG9vIGxhcmdlIG9yIGlzIHVuc2V0OyBiYWlsaW5nJ1xuICAgICk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7IHR5cGU6IGNvbnRlbnRUeXBlIH0gPSBwYXJzZUNvbnRlbnRUeXBlKFxuICAgIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKVxuICApO1xuICBpZiAoIWNvbnRlbnRUeXBlIHx8ICFWQUxJRF9JTUFHRV9NSU1FX1RZUEVTLmhhcyhjb250ZW50VHlwZSkpIHtcbiAgICBsb2dnZXIud2FybignZmV0Y2hMaW5rUHJldmlld0ltYWdlOiBDb250ZW50LVR5cGUgaXMgbm90IGFuIGltYWdlOyBiYWlsaW5nJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsZXQgZGF0YTogVWludDhBcnJheTtcbiAgdHJ5IHtcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuYnVmZmVyKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci53YXJuKCdmZXRjaExpbmtQcmV2aWV3SW1hZ2U6IGZhaWxlZCB0byByZWFkIGJvZHk7IGJhaWxpbmcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChhYm9ydFNpZ25hbC5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTY2FsZSBsaW5rIHByZXZpZXcgaW1hZ2VcbiAgaWYgKGNvbnRlbnRUeXBlICE9PSBJTUFHRV9HSUYpIHtcbiAgICBjb25zdCBkYXRhQmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwge1xuICAgICAgdHlwZTogY29udGVudFR5cGUsXG4gICAgfSk7XG4gICAgY29uc3QgeyBibG9iOiB4Y29kZWREYXRhQmxvYiB9ID0gYXdhaXQgc2NhbGVJbWFnZVRvTGV2ZWwoXG4gICAgICBkYXRhQmxvYixcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIGNvbnN0IHhjb2RlZERhdGFBcnJheUJ1ZmZlciA9IGF3YWl0IGJsb2JUb0FycmF5QnVmZmVyKHhjb2RlZERhdGFCbG9iKTtcblxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheSh4Y29kZWREYXRhQXJyYXlCdWZmZXIpO1xuICB9XG5cbiAgcmV0dXJuIHsgZGF0YSwgY29udGVudFR5cGUgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLHVCQUFrQztBQUdsQyxrQkFPTztBQUVQLCtCQUFrQztBQUNsQyxVQUFxQjtBQUVyQixNQUFNLGFBQWE7QUFFbkIsTUFBTSxtQ0FBbUM7QUFJekMsTUFBTSxvQkFBb0Isb0JBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssR0FB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
