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
var matchers_exports = {};
__export(matchers_exports, {
  matchEmojiBlot: () => matchEmojiBlot,
  matchEmojiImage: () => matchEmojiImage,
  matchEmojiText: () => matchEmojiText,
  matchReactEmoji: () => matchReactEmoji
});
module.exports = __toCommonJS(matchers_exports);
var import_quill_delta = __toESM(require("quill-delta"));
var import_util = require("../util");
const matchEmojiImage = /* @__PURE__ */ __name((node) => {
  if (node.classList.contains("emoji")) {
    const emoji = node.getAttribute("title");
    return new import_quill_delta.default().insert({ emoji });
  }
  return new import_quill_delta.default();
}, "matchEmojiImage");
const matchEmojiBlot = /* @__PURE__ */ __name((node, delta) => {
  if (node.classList.contains("emoji-blot")) {
    const { emoji } = node.dataset;
    return new import_quill_delta.default().insert({ emoji });
  }
  return delta;
}, "matchEmojiBlot");
const matchReactEmoji = /* @__PURE__ */ __name((node, delta) => {
  if (node.classList.contains("module-emoji")) {
    const emoji = node.innerText.trim();
    return new import_quill_delta.default().insert({ emoji });
  }
  return delta;
}, "matchReactEmoji");
const matchEmojiText = /* @__PURE__ */ __name((node) => {
  const nodeAsInsert = { insert: node.data };
  return new import_quill_delta.default((0, import_util.insertEmojiOps)([nodeAsInsert]));
}, "matchEmojiText");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  matchEmojiBlot,
  matchEmojiImage,
  matchEmojiText,
  matchReactEmoji
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWF0Y2hlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IERlbHRhIGZyb20gJ3F1aWxsLWRlbHRhJztcbmltcG9ydCB7IGluc2VydEVtb2ppT3BzIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBtYXRjaEVtb2ppSW1hZ2UgPSAobm9kZTogRWxlbWVudCk6IERlbHRhID0+IHtcbiAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdlbW9qaScpKSB7XG4gICAgY29uc3QgZW1vamkgPSBub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKTtcbiAgICByZXR1cm4gbmV3IERlbHRhKCkuaW5zZXJ0KHsgZW1vamkgfSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBEZWx0YSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoRW1vamlCbG90ID0gKG5vZGU6IEhUTUxFbGVtZW50LCBkZWx0YTogRGVsdGEpOiBEZWx0YSA9PiB7XG4gIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnZW1vamktYmxvdCcpKSB7XG4gICAgY29uc3QgeyBlbW9qaSB9ID0gbm9kZS5kYXRhc2V0O1xuICAgIHJldHVybiBuZXcgRGVsdGEoKS5pbnNlcnQoeyBlbW9qaSB9KTtcbiAgfVxuICByZXR1cm4gZGVsdGE7XG59O1xuXG5leHBvcnQgY29uc3QgbWF0Y2hSZWFjdEVtb2ppID0gKG5vZGU6IEhUTUxFbGVtZW50LCBkZWx0YTogRGVsdGEpOiBEZWx0YSA9PiB7XG4gIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnbW9kdWxlLWVtb2ppJykpIHtcbiAgICBjb25zdCBlbW9qaSA9IG5vZGUuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICByZXR1cm4gbmV3IERlbHRhKCkuaW5zZXJ0KHsgZW1vamkgfSk7XG4gIH1cbiAgcmV0dXJuIGRlbHRhO1xufTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoRW1vamlUZXh0ID0gKG5vZGU6IFRleHQpOiBEZWx0YSA9PiB7XG4gIGNvbnN0IG5vZGVBc0luc2VydCA9IHsgaW5zZXJ0OiBub2RlLmRhdGEgfTtcblxuICByZXR1cm4gbmV3IERlbHRhKGluc2VydEVtb2ppT3BzKFtub2RlQXNJbnNlcnRdKSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUFrQjtBQUNsQixrQkFBK0I7QUFFeEIsTUFBTSxrQkFBa0Isd0JBQUMsU0FBeUI7QUFDdkQsTUFBSSxLQUFLLFVBQVUsU0FBUyxPQUFPLEdBQUc7QUFDcEMsVUFBTSxRQUFRLEtBQUssYUFBYSxPQUFPO0FBQ3ZDLFdBQU8sSUFBSSwyQkFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFBQSxFQUNyQztBQUNBLFNBQU8sSUFBSSwyQkFBTTtBQUNuQixHQU4rQjtBQVF4QixNQUFNLGlCQUFpQix3QkFBQyxNQUFtQixVQUF3QjtBQUN4RSxNQUFJLEtBQUssVUFBVSxTQUFTLFlBQVksR0FBRztBQUN6QyxVQUFNLEVBQUUsVUFBVSxLQUFLO0FBQ3ZCLFdBQU8sSUFBSSwyQkFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFBQSxFQUNyQztBQUNBLFNBQU87QUFDVCxHQU44QjtBQVF2QixNQUFNLGtCQUFrQix3QkFBQyxNQUFtQixVQUF3QjtBQUN6RSxNQUFJLEtBQUssVUFBVSxTQUFTLGNBQWMsR0FBRztBQUMzQyxVQUFNLFFBQVEsS0FBSyxVQUFVLEtBQUs7QUFDbEMsV0FBTyxJQUFJLDJCQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUFBLEVBQ3JDO0FBQ0EsU0FBTztBQUNULEdBTitCO0FBUXhCLE1BQU0saUJBQWlCLHdCQUFDLFNBQXNCO0FBQ25ELFFBQU0sZUFBZSxFQUFFLFFBQVEsS0FBSyxLQUFLO0FBRXpDLFNBQU8sSUFBSSwyQkFBTSxnQ0FBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pELEdBSjhCOyIsCiAgIm5hbWVzIjogW10KfQo=
