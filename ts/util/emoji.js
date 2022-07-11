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
var emoji_exports = {};
__export(emoji_exports, {
  replaceEmojiWithSpaces: () => replaceEmojiWithSpaces,
  splitByEmoji: () => splitByEmoji
});
module.exports = __toCommonJS(emoji_exports);
var import_emoji_regex = __toESM(require("emoji-regex"));
var import_assert = require("./assert");
var import_iterables = require("./iterables");
const REGEXP = (0, import_emoji_regex.default)();
const MAX_EMOJI_TO_MATCH = 5e3;
function replaceEmojiWithSpaces(value) {
  return value.replace(REGEXP, " ");
}
function splitByEmoji(value) {
  const emojis = (0, import_iterables.take)(value.matchAll(REGEXP), MAX_EMOJI_TO_MATCH);
  const result = [];
  let lastIndex = 0;
  for (const match of emojis) {
    const nonEmojiText = value.slice(lastIndex, match.index);
    if (nonEmojiText) {
      result.push({ type: "text", value: nonEmojiText });
    }
    result.push({ type: "emoji", value: match[0] });
    (0, import_assert.assert)(match.index !== void 0, "`matchAll` should provide indices");
    lastIndex = match.index + match[0].length;
  }
  const finalNonEmojiText = value.slice(lastIndex);
  if (finalNonEmojiText) {
    result.push({ type: "text", value: finalNonEmojiText });
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  replaceEmojiWithSpaces,
  splitByEmoji
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW1vamkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGVtb2ppUmVnZXggZnJvbSAnZW1vamktcmVnZXgnO1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAnLi9pdGVyYWJsZXMnO1xuXG5jb25zdCBSRUdFWFAgPSBlbW9qaVJlZ2V4KCk7XG5jb25zdCBNQVhfRU1PSklfVE9fTUFUQ0ggPSA1MDAwO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUVtb2ppV2l0aFNwYWNlcyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoUkVHRVhQLCAnICcpO1xufVxuXG5leHBvcnQgdHlwZSBTcGxpdEVsZW1lbnQgPSBSZWFkb25seTx7XG4gIHR5cGU6ICdlbW9qaScgfCAndGV4dCc7XG4gIHZhbHVlOiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0QnlFbW9qaSh2YWx1ZTogc3RyaW5nKTogUmVhZG9ubHlBcnJheTxTcGxpdEVsZW1lbnQ+IHtcbiAgY29uc3QgZW1vamlzID0gdGFrZSh2YWx1ZS5tYXRjaEFsbChSRUdFWFApLCBNQVhfRU1PSklfVE9fTUFUQ0gpO1xuXG4gIGNvbnN0IHJlc3VsdDogQXJyYXk8U3BsaXRFbGVtZW50PiA9IFtdO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgZm9yIChjb25zdCBtYXRjaCBvZiBlbW9qaXMpIHtcbiAgICBjb25zdCBub25FbW9qaVRleHQgPSB2YWx1ZS5zbGljZShsYXN0SW5kZXgsIG1hdGNoLmluZGV4KTtcbiAgICBpZiAobm9uRW1vamlUZXh0KSB7XG4gICAgICByZXN1bHQucHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWU6IG5vbkVtb2ppVGV4dCB9KTtcbiAgICB9XG5cbiAgICByZXN1bHQucHVzaCh7IHR5cGU6ICdlbW9qaScsIHZhbHVlOiBtYXRjaFswXSB9KTtcblxuICAgIGFzc2VydChtYXRjaC5pbmRleCAhPT0gdW5kZWZpbmVkLCAnYG1hdGNoQWxsYCBzaG91bGQgcHJvdmlkZSBpbmRpY2VzJyk7XG4gICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gIH1cblxuICBjb25zdCBmaW5hbE5vbkVtb2ppVGV4dCA9IHZhbHVlLnNsaWNlKGxhc3RJbmRleCk7XG4gIGlmIChmaW5hbE5vbkVtb2ppVGV4dCkge1xuICAgIHJlc3VsdC5wdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogZmluYWxOb25FbW9qaVRleHQgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXVCO0FBRXZCLG9CQUF1QjtBQUN2Qix1QkFBcUI7QUFFckIsTUFBTSxTQUFTLGdDQUFXO0FBQzFCLE1BQU0scUJBQXFCO0FBRXBCLGdDQUFnQyxPQUF1QjtBQUM1RCxTQUFPLE1BQU0sUUFBUSxRQUFRLEdBQUc7QUFDbEM7QUFGZ0IsQUFTVCxzQkFBc0IsT0FBNEM7QUFDdkUsUUFBTSxTQUFTLDJCQUFLLE1BQU0sU0FBUyxNQUFNLEdBQUcsa0JBQWtCO0FBRTlELFFBQU0sU0FBOEIsQ0FBQztBQUNyQyxNQUFJLFlBQVk7QUFDaEIsYUFBVyxTQUFTLFFBQVE7QUFDMUIsVUFBTSxlQUFlLE1BQU0sTUFBTSxXQUFXLE1BQU0sS0FBSztBQUN2RCxRQUFJLGNBQWM7QUFDaEIsYUFBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sYUFBYSxDQUFDO0FBQUEsSUFDbkQ7QUFFQSxXQUFPLEtBQUssRUFBRSxNQUFNLFNBQVMsT0FBTyxNQUFNLEdBQUcsQ0FBQztBQUU5Qyw4QkFBTyxNQUFNLFVBQVUsUUFBVyxtQ0FBbUM7QUFDckUsZ0JBQVksTUFBTSxRQUFRLE1BQU0sR0FBRztBQUFBLEVBQ3JDO0FBRUEsUUFBTSxvQkFBb0IsTUFBTSxNQUFNLFNBQVM7QUFDL0MsTUFBSSxtQkFBbUI7QUFDckIsV0FBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sa0JBQWtCLENBQUM7QUFBQSxFQUN4RDtBQUVBLFNBQU87QUFDVDtBQXZCZ0IiLAogICJuYW1lcyI6IFtdCn0K
