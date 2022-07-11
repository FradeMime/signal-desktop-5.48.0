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
  LinkPreviewSourceType: () => LinkPreviewSourceType,
  findLinks: () => findLinks,
  getDomain: () => getDomain,
  isGroupLink: () => isGroupLink,
  isLinkSneaky: () => isLinkSneaky,
  isStickerPack: () => isStickerPack,
  shouldLinkifyMessage: () => shouldLinkifyMessage,
  shouldPreviewHref: () => shouldPreviewHref
});
module.exports = __toCommonJS(LinkPreview_exports);
var import_lodash = require("lodash");
var import_url = __toESM(require("url"));
var import_linkify_it = __toESM(require("linkify-it"));
var import_url2 = require("../util/url");
var import_emoji = require("../util/emoji");
var LinkPreviewSourceType = /* @__PURE__ */ ((LinkPreviewSourceType2) => {
  LinkPreviewSourceType2[LinkPreviewSourceType2["Composer"] = 0] = "Composer";
  LinkPreviewSourceType2[LinkPreviewSourceType2["ForwardMessageModal"] = 1] = "ForwardMessageModal";
  LinkPreviewSourceType2[LinkPreviewSourceType2["StoryCreator"] = 2] = "StoryCreator";
  return LinkPreviewSourceType2;
})(LinkPreviewSourceType || {});
const linkify = (0, import_linkify_it.default)();
function shouldPreviewHref(href) {
  const url = (0, import_url2.maybeParseUrl)(href);
  return Boolean(url && url.protocol === "https:" && url.hostname !== "debuglogs.org" && !isLinkSneaky(href));
}
const DIRECTIONAL_OVERRIDES = /[\u202c\u202d\u202e]/;
const UNICODE_DRAWING = /[\u2500-\u25FF]/;
function shouldLinkifyMessage(message) {
  if (!message) {
    return true;
  }
  if (DIRECTIONAL_OVERRIDES.test(message)) {
    return false;
  }
  if (UNICODE_DRAWING.test(message)) {
    return false;
  }
  return true;
}
function isStickerPack(link = "") {
  return link.startsWith("https://signal.art/addstickers/");
}
function isGroupLink(link = "") {
  return link.startsWith("https://signal.group/");
}
function findLinks(text, caretLocation) {
  if (!shouldLinkifyMessage(text)) {
    return [];
  }
  const haveCaretLocation = (0, import_lodash.isNumber)(caretLocation);
  const textLength = text ? text.length : 0;
  const matches = linkify.match(text ? (0, import_emoji.replaceEmojiWithSpaces)(text) : "") || [];
  return (0, import_lodash.compact)(matches.map((match) => {
    if (!haveCaretLocation) {
      return match.text;
    }
    if (caretLocation === void 0) {
      return null;
    }
    if (match.lastIndex === textLength && caretLocation === textLength) {
      return match.text;
    }
    if (match.index > caretLocation || match.lastIndex < caretLocation) {
      return match.text;
    }
    return null;
  }));
}
function getDomain(href) {
  const url = (0, import_url2.maybeParseUrl)(href);
  if (!url || !url.hostname) {
    throw new Error("getDomain: Unable to extract hostname from href");
  }
  return url.hostname;
}
const VALID_URI_CHARACTERS = /* @__PURE__ */ new Set([
  "%",
  ":",
  "/",
  "?",
  "#",
  "[",
  "]",
  "@",
  "!",
  "$",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  ";",
  "=",
  ...String.fromCharCode(...(0, import_lodash.range)(65, 91), ...(0, import_lodash.range)(97, 123)),
  ...(0, import_lodash.range)(10).map(String),
  "-",
  ".",
  "_",
  "~"
]);
const ASCII_PATTERN = new RegExp("[\\u0020-\\u007F]", "g");
const MAX_HREF_LENGTH = 2 ** 12;
function isLinkSneaky(href) {
  if (href.length > MAX_HREF_LENGTH) {
    return true;
  }
  const url = (0, import_url2.maybeParseUrl)(href);
  if (!url) {
    return true;
  }
  if (url.username || url.password) {
    return true;
  }
  if (!url.hostname) {
    return true;
  }
  if (url.hostname.length > 2048) {
    return true;
  }
  if (url.hostname.includes("%")) {
    return true;
  }
  const labels = url.hostname.split(".");
  if (labels.length < 2 || labels.some(import_lodash.isEmpty)) {
    return true;
  }
  const unicodeDomain = import_url.default.domainToUnicode ? import_url.default.domainToUnicode(url.hostname) : url.hostname;
  const withoutPeriods = unicodeDomain.replace(/\./g, "");
  const hasASCII = ASCII_PATTERN.test(withoutPeriods);
  const withoutASCII = withoutPeriods.replace(ASCII_PATTERN, "");
  const isMixed = hasASCII && withoutASCII.length > 0;
  if (isMixed) {
    return true;
  }
  const startOfPathAndHash = href.indexOf("/", url.protocol.length + 4);
  const pathAndHash = startOfPathAndHash === -1 ? "" : href.substr(startOfPathAndHash);
  return [...pathAndHash].some((character) => !VALID_URI_CHARACTERS.has(character));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinkPreviewSourceType,
  findLinks,
  getDomain,
  isGroupLink,
  isLinkSneaky,
  isStickerPack,
  shouldLinkifyMessage,
  shouldPreviewHref
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlua1ByZXZpZXcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpc051bWJlciwgY29tcGFjdCwgaXNFbXB0eSwgcmFuZ2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG5vZGVVcmwgZnJvbSAndXJsJztcbmltcG9ydCBMaW5raWZ5SXQgZnJvbSAnbGlua2lmeS1pdCc7XG5cbmltcG9ydCB7IG1heWJlUGFyc2VVcmwgfSBmcm9tICcuLi91dGlsL3VybCc7XG5pbXBvcnQgeyByZXBsYWNlRW1vamlXaXRoU3BhY2VzIH0gZnJvbSAnLi4vdXRpbC9lbW9qaSc7XG5cbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuL0F0dGFjaG1lbnQnO1xuXG5leHBvcnQgdHlwZSBMaW5rUHJldmlld0ltYWdlID0gQXR0YWNobWVudFR5cGUgJiB7XG4gIGRhdGE6IFVpbnQ4QXJyYXk7XG59O1xuXG5leHBvcnQgdHlwZSBMaW5rUHJldmlld1Jlc3VsdCA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGltYWdlPzogTGlua1ByZXZpZXdJbWFnZTtcbiAgZGVzY3JpcHRpb246IHN0cmluZyB8IG51bGw7XG4gIGRhdGU6IG51bWJlciB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBMaW5rUHJldmlld1dpdGhEb21haW4gPSB7XG4gIGRvbWFpbjogc3RyaW5nO1xufSAmIExpbmtQcmV2aWV3UmVzdWx0O1xuXG5leHBvcnQgZW51bSBMaW5rUHJldmlld1NvdXJjZVR5cGUge1xuICBDb21wb3NlcixcbiAgRm9yd2FyZE1lc3NhZ2VNb2RhbCxcbiAgU3RvcnlDcmVhdG9yLFxufVxuXG5jb25zdCBsaW5raWZ5ID0gTGlua2lmeUl0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRQcmV2aWV3SHJlZihocmVmOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgdXJsID0gbWF5YmVQYXJzZVVybChocmVmKTtcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgdXJsICYmXG4gICAgICB1cmwucHJvdG9jb2wgPT09ICdodHRwczonICYmXG4gICAgICB1cmwuaG9zdG5hbWUgIT09ICdkZWJ1Z2xvZ3Mub3JnJyAmJlxuICAgICAgIWlzTGlua1NuZWFreShocmVmKVxuICApO1xufVxuXG5jb25zdCBESVJFQ1RJT05BTF9PVkVSUklERVMgPSAvW1xcdTIwMmNcXHUyMDJkXFx1MjAyZV0vO1xuY29uc3QgVU5JQ09ERV9EUkFXSU5HID0gL1tcXHUyNTAwLVxcdTI1RkZdLztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZExpbmtpZnlNZXNzYWdlKFxuICBtZXNzYWdlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoRElSRUNUSU9OQUxfT1ZFUlJJREVTLnRlc3QobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKFVOSUNPREVfRFJBV0lORy50ZXN0KG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0aWNrZXJQYWNrKGxpbmsgPSAnJyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbGluay5zdGFydHNXaXRoKCdodHRwczovL3NpZ25hbC5hcnQvYWRkc3RpY2tlcnMvJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0dyb3VwTGluayhsaW5rID0gJycpOiBib29sZWFuIHtcbiAgcmV0dXJuIGxpbmsuc3RhcnRzV2l0aCgnaHR0cHM6Ly9zaWduYWwuZ3JvdXAvJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGlua3ModGV4dDogc3RyaW5nLCBjYXJldExvY2F0aW9uPzogbnVtYmVyKTogQXJyYXk8c3RyaW5nPiB7XG4gIGlmICghc2hvdWxkTGlua2lmeU1lc3NhZ2UodGV4dCkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBoYXZlQ2FyZXRMb2NhdGlvbiA9IGlzTnVtYmVyKGNhcmV0TG9jYXRpb24pO1xuICBjb25zdCB0ZXh0TGVuZ3RoID0gdGV4dCA/IHRleHQubGVuZ3RoIDogMDtcblxuICBjb25zdCBtYXRjaGVzID0gbGlua2lmeS5tYXRjaCh0ZXh0ID8gcmVwbGFjZUVtb2ppV2l0aFNwYWNlcyh0ZXh0KSA6ICcnKSB8fCBbXTtcbiAgcmV0dXJuIGNvbXBhY3QoXG4gICAgbWF0Y2hlcy5tYXAobWF0Y2ggPT4ge1xuICAgICAgaWYgKCFoYXZlQ2FyZXRMb2NhdGlvbikge1xuICAgICAgICByZXR1cm4gbWF0Y2gudGV4dDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhcmV0TG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGNoLmxhc3RJbmRleCA9PT0gdGV4dExlbmd0aCAmJiBjYXJldExvY2F0aW9uID09PSB0ZXh0TGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaC50ZXh0O1xuICAgICAgfVxuXG4gICAgICBpZiAobWF0Y2guaW5kZXggPiBjYXJldExvY2F0aW9uIHx8IG1hdGNoLmxhc3RJbmRleCA8IGNhcmV0TG9jYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoLnRleHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREb21haW4oaHJlZjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdXJsID0gbWF5YmVQYXJzZVVybChocmVmKTtcbiAgaWYgKCF1cmwgfHwgIXVybC5ob3N0bmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0RG9tYWluOiBVbmFibGUgdG8gZXh0cmFjdCBob3N0bmFtZSBmcm9tIGhyZWYnKTtcbiAgfVxuXG4gIHJldHVybiB1cmwuaG9zdG5hbWU7XG59XG5cbi8vIFNlZSA8aHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODY+LlxuY29uc3QgVkFMSURfVVJJX0NIQVJBQ1RFUlMgPSBuZXcgU2V0KFtcbiAgJyUnLFxuICAvLyBcImdlbi1kZWxpbXNcIlxuICAnOicsXG4gICcvJyxcbiAgJz8nLFxuICAnIycsXG4gICdbJyxcbiAgJ10nLFxuICAnQCcsXG4gIC8vIFwic3ViLWRlbGltc1wiXG4gICchJyxcbiAgJyQnLFxuICAnJicsXG4gIFwiJ1wiLFxuICAnKCcsXG4gICcpJyxcbiAgJyonLFxuICAnKycsXG4gICcsJyxcbiAgJzsnLFxuICAnPScsXG4gIC8vIHVucmVzZXJ2ZWRcbiAgLi4uU3RyaW5nLmZyb21DaGFyQ29kZSguLi5yYW5nZSg2NSwgOTEpLCAuLi5yYW5nZSg5NywgMTIzKSksXG4gIC4uLnJhbmdlKDEwKS5tYXAoU3RyaW5nKSxcbiAgJy0nLFxuICAnLicsXG4gICdfJyxcbiAgJ34nLFxuXSk7XG5jb25zdCBBU0NJSV9QQVRURVJOID0gbmV3IFJlZ0V4cCgnW1xcXFx1MDAyMC1cXFxcdTAwN0ZdJywgJ2cnKTtcbmNvbnN0IE1BWF9IUkVGX0xFTkdUSCA9IDIgKiogMTI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpbmtTbmVha3koaHJlZjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIFRoaXMgaGVscHMgdXNlcnMgYXZvaWQgZXh0cmVtZWx5IGxvbmcgbGlua3MgKHdoaWNoIGNvdWxkIGJlIGhpZGluZyBzb21ldGhpbmdcbiAgLy8gICBza2V0Y2h5KSBhbmQgYWxzbyBzaWRlc3RlcHMgdGhlIHBlcmZvcm1hbmNlIGltcGxpY2F0aW9ucyBvZiBleHRyZW1lbHkgbG9uZyBocmVmcy5cbiAgaWYgKGhyZWYubGVuZ3RoID4gTUFYX0hSRUZfTEVOR1RIKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCB1cmwgPSBtYXliZVBhcnNlVXJsKGhyZWYpO1xuXG4gIC8vIElmIHdlIGNhbid0IHBhcnNlIGl0LCBpdCdzIHNuZWFreS5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEFueSBsaW5rcyB3aGljaCBjb250YWluIGF1dGggYXJlIGNvbnNpZGVyZWQgc25lYWt5XG4gIGlmICh1cmwudXNlcm5hbWUgfHwgdXJsLnBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJZiB0aGUgZG9tYWluIGlzIGZhbHN5LCBzb21ldGhpbmcgZmlzaHkgaXMgZ29pbmcgb25cbiAgaWYgKCF1cmwuaG9zdG5hbWUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRvIHF1b3RlIFtSRkMgMTAzNF1bMF06IFwidGhlIHRvdGFsIG51bWJlciBvZiBvY3RldHMgdGhhdCByZXByZXNlbnQgYVxuICAvLyAgIGRvbWFpbiBuYW1lIFsuLi5dIGlzIGxpbWl0ZWQgdG8gMjU1LlwiIFRvIGJlIGV4dHJhIGNhcmVmdWwsIHdlIHNldCBhXG4gIC8vICAgbWF4aW11bSBvZiAyMDQ4LiAoVGhpcyBhbHNvIHVzZXMgdGhlIHN0cmluZydzIGAubGVuZ3RoYCBwcm9wZXJ0eSxcbiAgLy8gICB3aGljaCBpc24ndCBleGFjdGx5IHRoZSBzYW1lIHRoaW5nIGFzIHRoZSBudW1iZXIgb2Ygb2N0ZXRzLilcbiAgLy8gWzBdOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMTAzNFxuICBpZiAodXJsLmhvc3RuYW1lLmxlbmd0aCA+IDIwNDgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIERvbWFpbnMgY2Fubm90IGNvbnRhaW4gZW5jb2RlZCBjaGFyYWN0ZXJzXG4gIGlmICh1cmwuaG9zdG5hbWUuaW5jbHVkZXMoJyUnKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAyIGRvbWFpbiBsYWJlbHMsIGFuZCBub25lIG9mIHRoZW0gY2FuIGJlIGVtcHR5LlxuICBjb25zdCBsYWJlbHMgPSB1cmwuaG9zdG5hbWUuc3BsaXQoJy4nKTtcbiAgaWYgKGxhYmVscy5sZW5ndGggPCAyIHx8IGxhYmVscy5zb21lKGlzRW1wdHkpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGdldERvbWFpbiByZXR1cm5zIGRvbWFpbnMgaW4gcHVueWNvZGUgZm9ybS5cbiAgY29uc3QgdW5pY29kZURvbWFpbiA9IG5vZGVVcmwuZG9tYWluVG9Vbmljb2RlXG4gICAgPyBub2RlVXJsLmRvbWFpblRvVW5pY29kZSh1cmwuaG9zdG5hbWUpXG4gICAgOiB1cmwuaG9zdG5hbWU7XG5cbiAgY29uc3Qgd2l0aG91dFBlcmlvZHMgPSB1bmljb2RlRG9tYWluLnJlcGxhY2UoL1xcLi9nLCAnJyk7XG5cbiAgY29uc3QgaGFzQVNDSUkgPSBBU0NJSV9QQVRURVJOLnRlc3Qod2l0aG91dFBlcmlvZHMpO1xuICBjb25zdCB3aXRob3V0QVNDSUkgPSB3aXRob3V0UGVyaW9kcy5yZXBsYWNlKEFTQ0lJX1BBVFRFUk4sICcnKTtcblxuICBjb25zdCBpc01peGVkID0gaGFzQVNDSUkgJiYgd2l0aG91dEFTQ0lJLmxlbmd0aCA+IDA7XG4gIGlmIChpc01peGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgYHVybC5wYXRobmFtZWAgKGFuZCBzbyBvbikgYmVjYXVzZSBpdCBhdXRvbWF0aWNhbGx5IGVuY29kZXMgc3RyaW5ncy5cbiAgLy8gICBGb3IgZXhhbXBsZSwgaXQgdHVybnMgYC9hcXVcdTAwRURgIGludG8gYC9hcXUlQzMlQURgLlxuICBjb25zdCBzdGFydE9mUGF0aEFuZEhhc2ggPSBocmVmLmluZGV4T2YoJy8nLCB1cmwucHJvdG9jb2wubGVuZ3RoICsgNCk7XG4gIGNvbnN0IHBhdGhBbmRIYXNoID1cbiAgICBzdGFydE9mUGF0aEFuZEhhc2ggPT09IC0xID8gJycgOiBocmVmLnN1YnN0cihzdGFydE9mUGF0aEFuZEhhc2gpO1xuICByZXR1cm4gWy4uLnBhdGhBbmRIYXNoXS5zb21lKFxuICAgIGNoYXJhY3RlciA9PiAhVkFMSURfVVJJX0NIQVJBQ1RFUlMuaGFzKGNoYXJhY3RlcilcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFrRDtBQUNsRCxpQkFBb0I7QUFDcEIsd0JBQXNCO0FBRXRCLGtCQUE4QjtBQUM5QixtQkFBdUM7QUFvQmhDLElBQUssd0JBQUwsa0JBQUssMkJBQUw7QUFDTDtBQUNBO0FBQ0E7QUFIVTtBQUFBO0FBTVosTUFBTSxVQUFVLCtCQUFVO0FBRW5CLDJCQUEyQixNQUF1QjtBQUN2RCxRQUFNLE1BQU0sK0JBQWMsSUFBSTtBQUM5QixTQUFPLFFBQ0wsT0FDRSxJQUFJLGFBQWEsWUFDakIsSUFBSSxhQUFhLG1CQUNqQixDQUFDLGFBQWEsSUFBSSxDQUN0QjtBQUNGO0FBUmdCLEFBVWhCLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0sa0JBQWtCO0FBRWpCLDhCQUNMLFNBQ1M7QUFDVCxNQUFJLENBQUMsU0FBUztBQUNaLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxzQkFBc0IsS0FBSyxPQUFPLEdBQUc7QUFDdkMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLGdCQUFnQixLQUFLLE9BQU8sR0FBRztBQUNqQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQWZnQixBQWlCVCx1QkFBdUIsT0FBTyxJQUFhO0FBQ2hELFNBQU8sS0FBSyxXQUFXLGlDQUFpQztBQUMxRDtBQUZnQixBQUlULHFCQUFxQixPQUFPLElBQWE7QUFDOUMsU0FBTyxLQUFLLFdBQVcsdUJBQXVCO0FBQ2hEO0FBRmdCLEFBSVQsbUJBQW1CLE1BQWMsZUFBdUM7QUFDN0UsTUFBSSxDQUFDLHFCQUFxQixJQUFJLEdBQUc7QUFDL0IsV0FBTyxDQUFDO0FBQUEsRUFDVjtBQUVBLFFBQU0sb0JBQW9CLDRCQUFTLGFBQWE7QUFDaEQsUUFBTSxhQUFhLE9BQU8sS0FBSyxTQUFTO0FBRXhDLFFBQU0sVUFBVSxRQUFRLE1BQU0sT0FBTyx5Q0FBdUIsSUFBSSxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQzVFLFNBQU8sMkJBQ0wsUUFBUSxJQUFJLFdBQVM7QUFDbkIsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixhQUFPLE1BQU07QUFBQSxJQUNmO0FBRUEsUUFBSSxrQkFBa0IsUUFBVztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksTUFBTSxjQUFjLGNBQWMsa0JBQWtCLFlBQVk7QUFDbEUsYUFBTyxNQUFNO0FBQUEsSUFDZjtBQUVBLFFBQUksTUFBTSxRQUFRLGlCQUFpQixNQUFNLFlBQVksZUFBZTtBQUNsRSxhQUFPLE1BQU07QUFBQSxJQUNmO0FBRUEsV0FBTztBQUFBLEVBQ1QsQ0FBQyxDQUNIO0FBQ0Y7QUE5QmdCLEFBZ0NULG1CQUFtQixNQUFzQjtBQUM5QyxRQUFNLE1BQU0sK0JBQWMsSUFBSTtBQUM5QixNQUFJLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVTtBQUN6QixVQUFNLElBQUksTUFBTSxpREFBaUQ7QUFBQSxFQUNuRTtBQUVBLFNBQU8sSUFBSTtBQUNiO0FBUGdCLEFBVWhCLE1BQU0sdUJBQXVCLG9CQUFJLElBQUk7QUFBQSxFQUNuQztBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUEsR0FBRyxPQUFPLGFBQWEsR0FBRyx5QkFBTSxJQUFJLEVBQUUsR0FBRyxHQUFHLHlCQUFNLElBQUksR0FBRyxDQUFDO0FBQUEsRUFDMUQsR0FBRyx5QkFBTSxFQUFFLEVBQUUsSUFBSSxNQUFNO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixDQUFDO0FBQ0QsTUFBTSxnQkFBZ0IsSUFBSSxPQUFPLHFCQUFxQixHQUFHO0FBQ3pELE1BQU0sa0JBQWtCLEtBQUs7QUFFdEIsc0JBQXNCLE1BQXVCO0FBR2xELE1BQUksS0FBSyxTQUFTLGlCQUFpQjtBQUNqQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sTUFBTSwrQkFBYyxJQUFJO0FBRzlCLE1BQUksQ0FBQyxLQUFLO0FBQ1IsV0FBTztBQUFBLEVBQ1Q7QUFHQSxNQUFJLElBQUksWUFBWSxJQUFJLFVBQVU7QUFDaEMsV0FBTztBQUFBLEVBQ1Q7QUFHQSxNQUFJLENBQUMsSUFBSSxVQUFVO0FBQ2pCLFdBQU87QUFBQSxFQUNUO0FBT0EsTUFBSSxJQUFJLFNBQVMsU0FBUyxNQUFNO0FBQzlCLFdBQU87QUFBQSxFQUNUO0FBR0EsTUFBSSxJQUFJLFNBQVMsU0FBUyxHQUFHLEdBQUc7QUFDOUIsV0FBTztBQUFBLEVBQ1Q7QUFHQSxRQUFNLFNBQVMsSUFBSSxTQUFTLE1BQU0sR0FBRztBQUNyQyxNQUFJLE9BQU8sU0FBUyxLQUFLLE9BQU8sS0FBSyxxQkFBTyxHQUFHO0FBQzdDLFdBQU87QUFBQSxFQUNUO0FBR0EsUUFBTSxnQkFBZ0IsbUJBQVEsa0JBQzFCLG1CQUFRLGdCQUFnQixJQUFJLFFBQVEsSUFDcEMsSUFBSTtBQUVSLFFBQU0saUJBQWlCLGNBQWMsUUFBUSxPQUFPLEVBQUU7QUFFdEQsUUFBTSxXQUFXLGNBQWMsS0FBSyxjQUFjO0FBQ2xELFFBQU0sZUFBZSxlQUFlLFFBQVEsZUFBZSxFQUFFO0FBRTdELFFBQU0sVUFBVSxZQUFZLGFBQWEsU0FBUztBQUNsRCxNQUFJLFNBQVM7QUFDWCxXQUFPO0FBQUEsRUFDVDtBQUlBLFFBQU0scUJBQXFCLEtBQUssUUFBUSxLQUFLLElBQUksU0FBUyxTQUFTLENBQUM7QUFDcEUsUUFBTSxjQUNKLHVCQUF1QixLQUFLLEtBQUssS0FBSyxPQUFPLGtCQUFrQjtBQUNqRSxTQUFPLENBQUMsR0FBRyxXQUFXLEVBQUUsS0FDdEIsZUFBYSxDQUFDLHFCQUFxQixJQUFJLFNBQVMsQ0FDbEQ7QUFDRjtBQW5FZ0IiLAogICJuYW1lcyI6IFtdCn0K
