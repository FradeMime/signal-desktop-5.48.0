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
var lib_exports = {};
__export(lib_exports, {
  convertShortName: () => convertShortName,
  convertShortNameToData: () => convertShortNameToData,
  dataByCategory: () => dataByCategory,
  emojiToData: () => emojiToData,
  emojiToImage: () => emojiToImage,
  getEmojiCount: () => getEmojiCount,
  getEmojiData: () => getEmojiData,
  getImagePath: () => getImagePath,
  getSizeClass: () => getSizeClass,
  isShortName: () => isShortName,
  preloadImages: () => preloadImages,
  search: () => search,
  skinTones: () => skinTones,
  unifiedToEmoji: () => unifiedToEmoji
});
module.exports = __toCommonJS(lib_exports);
var import_emoji_datasource = __toESM(require("emoji-datasource"));
var import_emoji_regex = __toESM(require("emoji-regex"));
var import_lodash = require("lodash");
var import_fuse = __toESM(require("fuse.js"));
var import_p_queue = __toESM(require("p-queue"));
var import_is = __toESM(require("@sindresorhus/is"));
var import_getOwn = require("../../util/getOwn");
var log = __toESM(require("../../logging/log"));
const skinTones = ["1F3FB", "1F3FC", "1F3FD", "1F3FE", "1F3FF"];
const data = import_emoji_datasource.default.filter((emoji) => emoji.has_img_apple).map((emoji) => emoji.category === "People & Body" ? { ...emoji, sort_order: emoji.sort_order + 1e3 } : emoji);
const ROOT_PATH = (0, import_lodash.get)(typeof window !== "undefined" ? window : null, "ROOT_PATH", "");
const makeImagePath = /* @__PURE__ */ __name((src) => {
  return `${ROOT_PATH}node_modules/emoji-datasource-apple/img/apple/64/${src}`;
}, "makeImagePath");
const imageQueue = new import_p_queue.default({
  concurrency: 10,
  timeout: 1e3 * 60 * 2,
  throwOnTimeout: true
});
const images = /* @__PURE__ */ new Set();
const preloadImages = /* @__PURE__ */ __name(async () => {
  const preload = /* @__PURE__ */ __name(async (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
    images.add(img);
    setTimeout(reject, 5e3);
  }), "preload");
  log.info("Preloading emoji images");
  const start = Date.now();
  data.forEach((emoji) => {
    imageQueue.add(() => preload(makeImagePath(emoji.image)));
    if (emoji.skin_variations) {
      Object.values(emoji.skin_variations).forEach((variation) => {
        imageQueue.add(() => preload(makeImagePath(variation.image)));
      });
    }
  });
  await imageQueue.onEmpty();
  const end = Date.now();
  log.info(`Done preloading emoji images in ${end - start}ms`);
}, "preloadImages");
const dataByShortName = (0, import_lodash.keyBy)(data, "short_name");
const imageByEmoji = {};
const dataByEmoji = {};
const dataByCategory = (0, import_lodash.mapValues)((0, import_lodash.groupBy)(data, ({ category }) => {
  if (category === "Activities") {
    return "activity";
  }
  if (category === "Animals & Nature") {
    return "animal";
  }
  if (category === "Flags") {
    return "flag";
  }
  if (category === "Food & Drink") {
    return "food";
  }
  if (category === "Objects") {
    return "object";
  }
  if (category === "Travel & Places") {
    return "travel";
  }
  if (category === "Smileys & Emotion") {
    return "emoji";
  }
  if (category === "People & Body") {
    return "emoji";
  }
  if (category === "Symbols") {
    return "symbol";
  }
  return "misc";
}), (arr) => (0, import_lodash.sortBy)(arr, "sort_order"));
function getEmojiData(shortName, skinTone) {
  const base = dataByShortName[shortName];
  if (skinTone && base.skin_variations) {
    const variation = (0, import_lodash.isNumber)(skinTone) ? skinTones[skinTone - 1] : skinTone;
    if (base.skin_variations[variation]) {
      return base.skin_variations[variation];
    }
    return base.skin_variations[`${variation}-${variation}`];
  }
  return base;
}
function getImagePath(shortName, skinTone) {
  const emojiData = getEmojiData(shortName, skinTone);
  return makeImagePath(emojiData.image);
}
const fuse = new import_fuse.default(data, {
  shouldSort: true,
  threshold: 0.2,
  minMatchCharLength: 1,
  keys: ["short_name", "name"]
});
function search(query, count = 0) {
  const results = fuse.search(query.substr(0, 32)).map((result) => result.item);
  if (count) {
    return (0, import_lodash.take)(results, count);
  }
  return results;
}
const shortNames = /* @__PURE__ */ new Set([
  ...(0, import_lodash.map)(data, "short_name"),
  ...(0, import_lodash.compact)((0, import_lodash.flatMap)(data, "short_names"))
]);
function isShortName(name) {
  return shortNames.has(name);
}
function unifiedToEmoji(unified) {
  return unified.split("-").map((c) => String.fromCodePoint(parseInt(c, 16))).join("");
}
function convertShortNameToData(shortName, skinTone = 0) {
  const base = dataByShortName[shortName];
  if (!base) {
    return void 0;
  }
  const toneKey = import_is.default.number(skinTone) ? skinTones[skinTone - 1] : skinTone;
  if (skinTone && base.skin_variations) {
    const variation = base.skin_variations[toneKey];
    if (variation) {
      return {
        ...base,
        ...variation
      };
    }
  }
  return base;
}
function convertShortName(shortName, skinTone = 0) {
  const emojiData = convertShortNameToData(shortName, skinTone);
  if (!emojiData) {
    return "";
  }
  return unifiedToEmoji(emojiData.unified);
}
function emojiToImage(emoji) {
  return (0, import_getOwn.getOwn)(imageByEmoji, emoji);
}
function emojiToData(emoji) {
  return (0, import_getOwn.getOwn)(dataByEmoji, emoji);
}
function getEmojiCount(str) {
  const regex = (0, import_emoji_regex.default)();
  let match = regex.exec(str);
  let count = 0;
  if (!regex.global) {
    return match ? 1 : 0;
  }
  while (match) {
    count += 1;
    match = regex.exec(str);
  }
  return count;
}
function getSizeClass(str) {
  if (str.replace((0, import_emoji_regex.default)(), "").trim().length > 0) {
    return "";
  }
  const emojiCount = getEmojiCount(str);
  if (emojiCount === 1) {
    return "max";
  }
  if (emojiCount === 2) {
    return "extra-large";
  }
  if (emojiCount === 3) {
    return "large";
  }
  if (emojiCount === 4) {
    return "medium";
  }
  if (emojiCount === 5) {
    return "small";
  }
  return "";
}
data.forEach((emoji) => {
  const { short_name, short_names, skin_variations, image } = emoji;
  if (short_names) {
    short_names.forEach((name) => {
      dataByShortName[name] = emoji;
    });
  }
  imageByEmoji[convertShortName(short_name)] = makeImagePath(image);
  dataByEmoji[convertShortName(short_name)] = emoji;
  if (skin_variations) {
    Object.entries(skin_variations).forEach(([tone, variation]) => {
      imageByEmoji[convertShortName(short_name, tone)] = makeImagePath(variation.image);
      dataByEmoji[convertShortName(short_name, tone)] = emoji;
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertShortName,
  convertShortNameToData,
  dataByCategory,
  emojiToData,
  emojiToImage,
  getEmojiCount,
  getEmojiData,
  getImagePath,
  getSizeClass,
  isShortName,
  preloadImages,
  search,
  skinTones,
  unifiedToEmoji
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLy8gQ2FtZWxjYXNlIGRpc2FibGVkIGR1ZSB0byBlbW9qaS1kYXRhc291cmNlIHVzaW5nIHNuYWtlX2Nhc2Vcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVudHlwZWREYXRhIGZyb20gJ2Vtb2ppLWRhdGFzb3VyY2UnO1xuaW1wb3J0IGVtb2ppUmVnZXggZnJvbSAnZW1vamktcmVnZXgnO1xuaW1wb3J0IHtcbiAgY29tcGFjdCxcbiAgZmxhdE1hcCxcbiAgZ2V0LFxuICBncm91cEJ5LFxuICBpc051bWJlcixcbiAga2V5QnksXG4gIG1hcCxcbiAgbWFwVmFsdWVzLFxuICBzb3J0QnksXG4gIHRha2UsXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgRnVzZSBmcm9tICdmdXNlLmpzJztcbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5pbXBvcnQgaXMgZnJvbSAnQHNpbmRyZXNvcmh1cy9pcyc7XG5pbXBvcnQgeyBnZXRPd24gfSBmcm9tICcuLi8uLi91dGlsL2dldE93bic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgY29uc3Qgc2tpblRvbmVzID0gWycxRjNGQicsICcxRjNGQycsICcxRjNGRCcsICcxRjNGRScsICcxRjNGRiddO1xuXG5leHBvcnQgdHlwZSBTa2luVG9uZUtleSA9ICcxRjNGQicgfCAnMUYzRkMnIHwgJzFGM0ZEJyB8ICcxRjNGRScgfCAnMUYzRkYnO1xuZXhwb3J0IHR5cGUgU2l6ZUNsYXNzVHlwZSA9XG4gIHwgJydcbiAgfCAnc21hbGwnXG4gIHwgJ21lZGl1bSdcbiAgfCAnbGFyZ2UnXG4gIHwgJ2V4dHJhLWxhcmdlJ1xuICB8ICdtYXgnO1xuXG5leHBvcnQgdHlwZSBFbW9qaVNraW5WYXJpYXRpb24gPSB7XG4gIHVuaWZpZWQ6IHN0cmluZztcbiAgbm9uX3F1YWxpZmllZDogbnVsbDtcbiAgaW1hZ2U6IHN0cmluZztcbiAgc2hlZXRfeDogbnVtYmVyO1xuICBzaGVldF95OiBudW1iZXI7XG4gIGFkZGVkX2luOiBzdHJpbmc7XG4gIGhhc19pbWdfYXBwbGU6IGJvb2xlYW47XG4gIGhhc19pbWdfZ29vZ2xlOiBib29sZWFuO1xuICBoYXNfaW1nX3R3aXR0ZXI6IGJvb2xlYW47XG4gIGhhc19pbWdfZW1vamlvbmU6IGJvb2xlYW47XG4gIGhhc19pbWdfZmFjZWJvb2s6IGJvb2xlYW47XG4gIGhhc19pbWdfbWVzc2VuZ2VyOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgRW1vamlEYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHVuaWZpZWQ6IHN0cmluZztcbiAgbm9uX3F1YWxpZmllZDogc3RyaW5nIHwgbnVsbDtcbiAgZG9jb21vOiBzdHJpbmcgfCBudWxsO1xuICBhdTogc3RyaW5nIHwgbnVsbDtcbiAgc29mdGJhbms6IHN0cmluZyB8IG51bGw7XG4gIGdvb2dsZTogc3RyaW5nIHwgbnVsbDtcbiAgaW1hZ2U6IHN0cmluZztcbiAgc2hlZXRfeDogbnVtYmVyO1xuICBzaGVldF95OiBudW1iZXI7XG4gIHNob3J0X25hbWU6IHN0cmluZztcbiAgc2hvcnRfbmFtZXM6IEFycmF5PHN0cmluZz47XG4gIHRleHQ6IHN0cmluZyB8IG51bGw7XG4gIHRleHRzOiBBcnJheTxzdHJpbmc+IHwgbnVsbDtcbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgc29ydF9vcmRlcjogbnVtYmVyO1xuICBhZGRlZF9pbjogc3RyaW5nO1xuICBoYXNfaW1nX2FwcGxlOiBib29sZWFuO1xuICBoYXNfaW1nX2dvb2dsZTogYm9vbGVhbjtcbiAgaGFzX2ltZ190d2l0dGVyOiBib29sZWFuO1xuICBoYXNfaW1nX2ZhY2Vib29rOiBib29sZWFuO1xuICBza2luX3ZhcmlhdGlvbnM/OiB7XG4gICAgW2tleTogc3RyaW5nXTogRW1vamlTa2luVmFyaWF0aW9uO1xuICB9O1xufTtcblxuY29uc3QgZGF0YSA9ICh1bnR5cGVkRGF0YSBhcyBBcnJheTxFbW9qaURhdGE+KVxuICAuZmlsdGVyKGVtb2ppID0+IGVtb2ppLmhhc19pbWdfYXBwbGUpXG4gIC5tYXAoZW1vamkgPT5cbiAgICAvLyBXaHkgdGhpcyB3ZWlyZCBtYXA/XG4gICAgLy8gdGhlIGVtb2ppIGRhdGFzZXQgaGFzIHR3byBzZXBhcmF0ZSBjYXRlZ29yaWVzIGZvciBFbW90aW9ucyBhbmQgUGVvcGxlXG4gICAgLy8geWV0IGluIG91ciBVSSB3ZSBkaXNwbGF5IHRoZXNlIGFzIGEgc2luZ2xlIG1lcmdlZCBjYXRlZ29yeS4gSW4gb3JkZXJcbiAgICAvLyBmb3IgdGhlIGVtb2ppcyB0byBiZSBzb3J0ZWQgcHJvcGVybHkgd2UncmUgbWFudWFsbHkgaW5jcmVtZW50aW5nIHRoZVxuICAgIC8vIHNvcnRfb3JkZXIgZm9yIHRoZSBQZW9wbGUgJiBCb2R5IGVtb2ppcyBzbyB0aGF0IHRoZXkgZmFsbCBiZWxvdyB0aGVcbiAgICAvLyBTbWlsZXkgJiBFbW90aW9ucyBjYXRlZ29yeS5cbiAgICBlbW9qaS5jYXRlZ29yeSA9PT0gJ1Blb3BsZSAmIEJvZHknXG4gICAgICA/IHsgLi4uZW1vamksIHNvcnRfb3JkZXI6IGVtb2ppLnNvcnRfb3JkZXIgKyAxMDAwIH1cbiAgICAgIDogZW1vamlcbiAgKTtcblxuY29uc3QgUk9PVF9QQVRIID0gZ2V0KFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IG51bGwsXG4gICdST09UX1BBVEgnLFxuICAnJ1xuKTtcblxuY29uc3QgbWFrZUltYWdlUGF0aCA9IChzcmM6IHN0cmluZykgPT4ge1xuICByZXR1cm4gYCR7Uk9PVF9QQVRIfW5vZGVfbW9kdWxlcy9lbW9qaS1kYXRhc291cmNlLWFwcGxlL2ltZy9hcHBsZS82NC8ke3NyY31gO1xufTtcblxuY29uc3QgaW1hZ2VRdWV1ZSA9IG5ldyBQUXVldWUoe1xuICBjb25jdXJyZW5jeTogMTAsXG4gIHRpbWVvdXQ6IDEwMDAgKiA2MCAqIDIsXG4gIHRocm93T25UaW1lb3V0OiB0cnVlLFxufSk7XG5jb25zdCBpbWFnZXMgPSBuZXcgU2V0KCk7XG5cbmV4cG9ydCBjb25zdCBwcmVsb2FkSW1hZ2VzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAvLyBQcmVsb2FkIGltYWdlc1xuICBjb25zdCBwcmVsb2FkID0gYXN5bmMgKHNyYzogc3RyaW5nKSA9PlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICBpbWcub25lcnJvciA9IHJlamVjdDtcbiAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICBpbWFnZXMuYWRkKGltZyk7XG4gICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNTAwMCk7XG4gICAgfSk7XG5cbiAgbG9nLmluZm8oJ1ByZWxvYWRpbmcgZW1vamkgaW1hZ2VzJyk7XG4gIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICBkYXRhLmZvckVhY2goZW1vamkgPT4ge1xuICAgIGltYWdlUXVldWUuYWRkKCgpID0+IHByZWxvYWQobWFrZUltYWdlUGF0aChlbW9qaS5pbWFnZSkpKTtcblxuICAgIGlmIChlbW9qaS5za2luX3ZhcmlhdGlvbnMpIHtcbiAgICAgIE9iamVjdC52YWx1ZXMoZW1vamkuc2tpbl92YXJpYXRpb25zKS5mb3JFYWNoKHZhcmlhdGlvbiA9PiB7XG4gICAgICAgIGltYWdlUXVldWUuYWRkKCgpID0+IHByZWxvYWQobWFrZUltYWdlUGF0aCh2YXJpYXRpb24uaW1hZ2UpKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGF3YWl0IGltYWdlUXVldWUub25FbXB0eSgpO1xuXG4gIGNvbnN0IGVuZCA9IERhdGUubm93KCk7XG4gIGxvZy5pbmZvKGBEb25lIHByZWxvYWRpbmcgZW1vamkgaW1hZ2VzIGluICR7ZW5kIC0gc3RhcnR9bXNgKTtcbn07XG5cbmNvbnN0IGRhdGFCeVNob3J0TmFtZSA9IGtleUJ5KGRhdGEsICdzaG9ydF9uYW1lJyk7XG5jb25zdCBpbWFnZUJ5RW1vamk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbmNvbnN0IGRhdGFCeUVtb2ppOiB7IFtrZXk6IHN0cmluZ106IEVtb2ppRGF0YSB9ID0ge307XG5cbmV4cG9ydCBjb25zdCBkYXRhQnlDYXRlZ29yeSA9IG1hcFZhbHVlcyhcbiAgZ3JvdXBCeShkYXRhLCAoeyBjYXRlZ29yeSB9KSA9PiB7XG4gICAgaWYgKGNhdGVnb3J5ID09PSAnQWN0aXZpdGllcycpIHtcbiAgICAgIHJldHVybiAnYWN0aXZpdHknO1xuICAgIH1cblxuICAgIGlmIChjYXRlZ29yeSA9PT0gJ0FuaW1hbHMgJiBOYXR1cmUnKSB7XG4gICAgICByZXR1cm4gJ2FuaW1hbCc7XG4gICAgfVxuXG4gICAgaWYgKGNhdGVnb3J5ID09PSAnRmxhZ3MnKSB7XG4gICAgICByZXR1cm4gJ2ZsYWcnO1xuICAgIH1cblxuICAgIGlmIChjYXRlZ29yeSA9PT0gJ0Zvb2QgJiBEcmluaycpIHtcbiAgICAgIHJldHVybiAnZm9vZCc7XG4gICAgfVxuXG4gICAgaWYgKGNhdGVnb3J5ID09PSAnT2JqZWN0cycpIHtcbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG5cbiAgICBpZiAoY2F0ZWdvcnkgPT09ICdUcmF2ZWwgJiBQbGFjZXMnKSB7XG4gICAgICByZXR1cm4gJ3RyYXZlbCc7XG4gICAgfVxuXG4gICAgaWYgKGNhdGVnb3J5ID09PSAnU21pbGV5cyAmIEVtb3Rpb24nKSB7XG4gICAgICByZXR1cm4gJ2Vtb2ppJztcbiAgICB9XG5cbiAgICBpZiAoY2F0ZWdvcnkgPT09ICdQZW9wbGUgJiBCb2R5Jykge1xuICAgICAgcmV0dXJuICdlbW9qaSc7XG4gICAgfVxuXG4gICAgaWYgKGNhdGVnb3J5ID09PSAnU3ltYm9scycpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ21pc2MnO1xuICB9KSxcbiAgYXJyID0+IHNvcnRCeShhcnIsICdzb3J0X29yZGVyJylcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbW9qaURhdGEoXG4gIHNob3J0TmFtZToga2V5b2YgdHlwZW9mIGRhdGFCeVNob3J0TmFtZSxcbiAgc2tpblRvbmU/OiBTa2luVG9uZUtleSB8IG51bWJlclxuKTogRW1vamlEYXRhIHwgRW1vamlTa2luVmFyaWF0aW9uIHtcbiAgY29uc3QgYmFzZSA9IGRhdGFCeVNob3J0TmFtZVtzaG9ydE5hbWVdO1xuXG4gIGlmIChza2luVG9uZSAmJiBiYXNlLnNraW5fdmFyaWF0aW9ucykge1xuICAgIGNvbnN0IHZhcmlhdGlvbiA9IGlzTnVtYmVyKHNraW5Ub25lKSA/IHNraW5Ub25lc1tza2luVG9uZSAtIDFdIDogc2tpblRvbmU7XG5cbiAgICBpZiAoYmFzZS5za2luX3ZhcmlhdGlvbnNbdmFyaWF0aW9uXSkge1xuICAgICAgcmV0dXJuIGJhc2Uuc2tpbl92YXJpYXRpb25zW3ZhcmlhdGlvbl07XG4gICAgfVxuXG4gICAgLy8gRm9yIGVtb2ppcyB0aGF0IGhhdmUgdHdvIHBlb3BsZSBpbiB0aGVtIHdoaWNoIGNhbiBoYXZlIGRpZmYgc2tpbiB0b25lc1xuICAgIC8vIHRoZSBNYXAgaXMgb2YgU2tpblRvbmUtU2tpblRvbmUuIElmIHdlIGRvbid0IGZpbmQgdGhlIGNvcnJlY3Qgc2tpbiB0b25lXG4gICAgLy8gaW4gdGhlIGxpc3Qgb2YgdmFyaWF0aW9ucyB0aGVuIHdlIGFzc3VtZSBpdCBpcyBvbmUgb2YgdGhvc2UgZG91YmxlIHNraW5cbiAgICAvLyBlbW9qaXMgYW5kIHdlIGRlZmF1bHQgdG8gYm90aCBwZW9wbGUgaGF2aW5nIHNhbWUgc2tpbi5cbiAgICByZXR1cm4gYmFzZS5za2luX3ZhcmlhdGlvbnNbYCR7dmFyaWF0aW9ufS0ke3ZhcmlhdGlvbn1gXTtcbiAgfVxuXG4gIHJldHVybiBiYXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VQYXRoKFxuICBzaG9ydE5hbWU6IGtleW9mIHR5cGVvZiBkYXRhQnlTaG9ydE5hbWUsXG4gIHNraW5Ub25lPzogU2tpblRvbmVLZXkgfCBudW1iZXJcbik6IHN0cmluZyB7XG4gIGNvbnN0IGVtb2ppRGF0YSA9IGdldEVtb2ppRGF0YShzaG9ydE5hbWUsIHNraW5Ub25lKTtcblxuICByZXR1cm4gbWFrZUltYWdlUGF0aChlbW9qaURhdGEuaW1hZ2UpO1xufVxuXG5jb25zdCBmdXNlID0gbmV3IEZ1c2UoZGF0YSwge1xuICBzaG91bGRTb3J0OiB0cnVlLFxuICB0aHJlc2hvbGQ6IDAuMixcbiAgbWluTWF0Y2hDaGFyTGVuZ3RoOiAxLFxuICBrZXlzOiBbJ3Nob3J0X25hbWUnLCAnbmFtZSddLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2gocXVlcnk6IHN0cmluZywgY291bnQgPSAwKTogQXJyYXk8RW1vamlEYXRhPiB7XG4gIGNvbnN0IHJlc3VsdHMgPSBmdXNlLnNlYXJjaChxdWVyeS5zdWJzdHIoMCwgMzIpKS5tYXAocmVzdWx0ID0+IHJlc3VsdC5pdGVtKTtcblxuICBpZiAoY291bnQpIHtcbiAgICByZXR1cm4gdGFrZShyZXN1bHRzLCBjb3VudCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuY29uc3Qgc2hvcnROYW1lcyA9IG5ldyBTZXQoW1xuICAuLi5tYXAoZGF0YSwgJ3Nob3J0X25hbWUnKSxcbiAgLi4uY29tcGFjdDxzdHJpbmc+KGZsYXRNYXAoZGF0YSwgJ3Nob3J0X25hbWVzJykpLFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Nob3J0TmFtZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIHNob3J0TmFtZXMuaGFzKG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pZmllZFRvRW1vamkodW5pZmllZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHVuaWZpZWRcbiAgICAuc3BsaXQoJy0nKVxuICAgIC5tYXAoYyA9PiBTdHJpbmcuZnJvbUNvZGVQb2ludChwYXJzZUludChjLCAxNikpKVxuICAgIC5qb2luKCcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRTaG9ydE5hbWVUb0RhdGEoXG4gIHNob3J0TmFtZTogc3RyaW5nLFxuICBza2luVG9uZTogbnVtYmVyIHwgU2tpblRvbmVLZXkgPSAwXG4pOiBFbW9qaURhdGEgfCB1bmRlZmluZWQge1xuICBjb25zdCBiYXNlID0gZGF0YUJ5U2hvcnROYW1lW3Nob3J0TmFtZV07XG5cbiAgaWYgKCFiYXNlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHRvbmVLZXkgPSBpcy5udW1iZXIoc2tpblRvbmUpID8gc2tpblRvbmVzW3NraW5Ub25lIC0gMV0gOiBza2luVG9uZTtcblxuICBpZiAoc2tpblRvbmUgJiYgYmFzZS5za2luX3ZhcmlhdGlvbnMpIHtcbiAgICBjb25zdCB2YXJpYXRpb24gPSBiYXNlLnNraW5fdmFyaWF0aW9uc1t0b25lS2V5XTtcbiAgICBpZiAodmFyaWF0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICAuLi52YXJpYXRpb24sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiYXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFNob3J0TmFtZShcbiAgc2hvcnROYW1lOiBzdHJpbmcsXG4gIHNraW5Ub25lOiBudW1iZXIgfCBTa2luVG9uZUtleSA9IDBcbik6IHN0cmluZyB7XG4gIGNvbnN0IGVtb2ppRGF0YSA9IGNvbnZlcnRTaG9ydE5hbWVUb0RhdGEoc2hvcnROYW1lLCBza2luVG9uZSk7XG5cbiAgaWYgKCFlbW9qaURhdGEpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByZXR1cm4gdW5pZmllZFRvRW1vamkoZW1vamlEYXRhLnVuaWZpZWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1vamlUb0ltYWdlKGVtb2ppOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICByZXR1cm4gZ2V0T3duKGltYWdlQnlFbW9qaSwgZW1vamkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1vamlUb0RhdGEoZW1vamk6IHN0cmluZyk6IEVtb2ppRGF0YSB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiBnZXRPd24oZGF0YUJ5RW1vamksIGVtb2ppKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtb2ppQ291bnQoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCByZWdleCA9IGVtb2ppUmVnZXgoKTtcblxuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKHN0cik7XG4gIGxldCBjb3VudCA9IDA7XG5cbiAgaWYgKCFyZWdleC5nbG9iYWwpIHtcbiAgICByZXR1cm4gbWF0Y2ggPyAxIDogMDtcbiAgfVxuXG4gIHdoaWxlIChtYXRjaCkge1xuICAgIGNvdW50ICs9IDE7XG4gICAgbWF0Y2ggPSByZWdleC5leGVjKHN0cik7XG4gIH1cblxuICByZXR1cm4gY291bnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaXplQ2xhc3Moc3RyOiBzdHJpbmcpOiBTaXplQ2xhc3NUeXBlIHtcbiAgLy8gRG8gd2UgaGF2ZSBub24tZW1vamkgY2hhcmFjdGVycz9cbiAgaWYgKHN0ci5yZXBsYWNlKGVtb2ppUmVnZXgoKSwgJycpLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgZW1vamlDb3VudCA9IGdldEVtb2ppQ291bnQoc3RyKTtcblxuICBpZiAoZW1vamlDb3VudCA9PT0gMSkge1xuICAgIHJldHVybiAnbWF4JztcbiAgfVxuICBpZiAoZW1vamlDb3VudCA9PT0gMikge1xuICAgIHJldHVybiAnZXh0cmEtbGFyZ2UnO1xuICB9XG4gIGlmIChlbW9qaUNvdW50ID09PSAzKSB7XG4gICAgcmV0dXJuICdsYXJnZSc7XG4gIH1cbiAgaWYgKGVtb2ppQ291bnQgPT09IDQpIHtcbiAgICByZXR1cm4gJ21lZGl1bSc7XG4gIH1cbiAgaWYgKGVtb2ppQ291bnQgPT09IDUpIHtcbiAgICByZXR1cm4gJ3NtYWxsJztcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmRhdGEuZm9yRWFjaChlbW9qaSA9PiB7XG4gIGNvbnN0IHsgc2hvcnRfbmFtZSwgc2hvcnRfbmFtZXMsIHNraW5fdmFyaWF0aW9ucywgaW1hZ2UgfSA9IGVtb2ppO1xuXG4gIGlmIChzaG9ydF9uYW1lcykge1xuICAgIHNob3J0X25hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICBkYXRhQnlTaG9ydE5hbWVbbmFtZV0gPSBlbW9qaTtcbiAgICB9KTtcbiAgfVxuXG4gIGltYWdlQnlFbW9qaVtjb252ZXJ0U2hvcnROYW1lKHNob3J0X25hbWUpXSA9IG1ha2VJbWFnZVBhdGgoaW1hZ2UpO1xuICBkYXRhQnlFbW9qaVtjb252ZXJ0U2hvcnROYW1lKHNob3J0X25hbWUpXSA9IGVtb2ppO1xuXG4gIGlmIChza2luX3ZhcmlhdGlvbnMpIHtcbiAgICBPYmplY3QuZW50cmllcyhza2luX3ZhcmlhdGlvbnMpLmZvckVhY2goKFt0b25lLCB2YXJpYXRpb25dKSA9PiB7XG4gICAgICBpbWFnZUJ5RW1vamlbY29udmVydFNob3J0TmFtZShzaG9ydF9uYW1lLCB0b25lIGFzIFNraW5Ub25lS2V5KV0gPVxuICAgICAgICBtYWtlSW1hZ2VQYXRoKHZhcmlhdGlvbi5pbWFnZSk7XG4gICAgICBkYXRhQnlFbW9qaVtjb252ZXJ0U2hvcnROYW1lKHNob3J0X25hbWUsIHRvbmUgYXMgU2tpblRvbmVLZXkpXSA9IGVtb2ppO1xuICAgIH0pO1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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
