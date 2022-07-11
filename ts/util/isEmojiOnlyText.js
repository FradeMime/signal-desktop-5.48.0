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
var isEmojiOnlyText_exports = {};
__export(isEmojiOnlyText_exports, {
  isEmojiOnlyText: () => isEmojiOnlyText
});
module.exports = __toCommonJS(isEmojiOnlyText_exports);
var import_emoji_regex = __toESM(require("emoji-regex"));
function isEmojiOnlyText(text) {
  if (text.length === 0) {
    return false;
  }
  const regex = (0, import_emoji_regex.default)();
  let len = 0;
  for (const match of text.matchAll(regex)) {
    if (match.index !== len) {
      return false;
    }
    len += match[0].length;
  }
  return len === text.length;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isEmojiOnlyText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNFbW9qaU9ubHlUZXh0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBlbW9qaVJlZ2V4IGZyb20gJ2Vtb2ppLXJlZ2V4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1vamlPbmx5VGV4dCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKHRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcmVnZXggPSBlbW9qaVJlZ2V4KCk7XG4gIGxldCBsZW4gPSAwO1xuICBmb3IgKGNvbnN0IG1hdGNoIG9mIHRleHQubWF0Y2hBbGwocmVnZXgpKSB7XG4gICAgLy8gU2tpcHBlZCBzb21lIG5vbi1lbW9qaSB0ZXh0LCByZXR1cm4gZWFybHlcbiAgICBpZiAobWF0Y2guaW5kZXggIT09IGxlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxlbiArPSBtYXRjaFswXS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIGxlbiA9PT0gdGV4dC5sZW5ndGg7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXVCO0FBRWhCLHlCQUF5QixNQUF1QjtBQUNyRCxNQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3JCLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxRQUFRLGdDQUFXO0FBQ3pCLE1BQUksTUFBTTtBQUNWLGFBQVcsU0FBUyxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBRXhDLFFBQUksTUFBTSxVQUFVLEtBQUs7QUFDdkIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLE1BQU0sR0FBRztBQUFBLEVBQ2xCO0FBQ0EsU0FBTyxRQUFRLEtBQUs7QUFDdEI7QUFoQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
