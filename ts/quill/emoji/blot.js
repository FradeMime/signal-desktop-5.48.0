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
var blot_exports = {};
__export(blot_exports, {
  EmojiBlot: () => EmojiBlot
});
module.exports = __toCommonJS(blot_exports);
var import_quill = __toESM(require("quill"));
var import_lib = require("../../components/emoji/lib");
const Embed = import_quill.default.import("blots/embed");
class EmojiBlot extends Embed {
  static create(emoji) {
    const node = super.create(void 0);
    node.dataset.emoji = emoji;
    const image = (0, import_lib.emojiToImage)(emoji);
    node.setAttribute("src", image || "");
    node.setAttribute("data-emoji", emoji);
    node.setAttribute("title", emoji);
    node.setAttribute("aria-label", emoji);
    return node;
  }
  static value(node) {
    return node.dataset.emoji;
  }
}
EmojiBlot.blotName = "emoji";
EmojiBlot.tagName = "img";
EmojiBlot.className = "emoji-blot";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiBlot
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmxvdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSBQYXJjaG1lbnQgZnJvbSAncGFyY2htZW50JztcbmltcG9ydCBRdWlsbCBmcm9tICdxdWlsbCc7XG5cbmltcG9ydCB7IGVtb2ppVG9JbWFnZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1vamkvbGliJztcblxuY29uc3QgRW1iZWQ6IHR5cGVvZiBQYXJjaG1lbnQuRW1iZWQgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2VtYmVkJyk7XG5cbi8vIHRoZSBET00gc3RydWN0dXJlIG9mIHRoaXMgRW1vamlCbG90IHNob3VsZCBtYXRjaCB0aGUgb3RoZXIgZW1vamkgaW1wbGVtZW50YXRpb25zOlxuLy8gdHMvY29tcG9uZW50cy9jb252ZXJzYXRpb24vRW1vamlmeS50c3hcbi8vIHRzL2NvbXBvbmVudHMvZW1vamkvRW1vamkudHN4XG5cbmV4cG9ydCBjbGFzcyBFbW9qaUJsb3QgZXh0ZW5kcyBFbWJlZCB7XG4gIHN0YXRpYyBvdmVycmlkZSBibG90TmFtZSA9ICdlbW9qaSc7XG5cbiAgc3RhdGljIG92ZXJyaWRlIHRhZ05hbWUgPSAnaW1nJztcblxuICBzdGF0aWMgb3ZlcnJpZGUgY2xhc3NOYW1lID0gJ2Vtb2ppLWJsb3QnO1xuXG4gIHN0YXRpYyBvdmVycmlkZSBjcmVhdGUoZW1vamk6IHN0cmluZyk6IE5vZGUge1xuICAgIGNvbnN0IG5vZGUgPSBzdXBlci5jcmVhdGUodW5kZWZpbmVkKSBhcyBIVE1MRWxlbWVudDtcbiAgICBub2RlLmRhdGFzZXQuZW1vamkgPSBlbW9qaTtcblxuICAgIGNvbnN0IGltYWdlID0gZW1vamlUb0ltYWdlKGVtb2ppKTtcblxuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWFnZSB8fCAnJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZW1vamknLCBlbW9qaSk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgZW1vamkpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgZW1vamkpO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBzdGF0aWMgb3ZlcnJpZGUgdmFsdWUobm9kZTogSFRNTEVsZW1lbnQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBub2RlLmRhdGFzZXQuZW1vamk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFFbEIsaUJBQTZCO0FBRTdCLE1BQU0sUUFBZ0MscUJBQU0sT0FBTyxhQUFhO0FBTXpELE1BQU0sa0JBQWtCLE1BQU07QUFBQSxTQU9uQixPQUFPLE9BQXFCO0FBQzFDLFVBQU0sT0FBTyxNQUFNLE9BQU8sTUFBUztBQUNuQyxTQUFLLFFBQVEsUUFBUTtBQUVyQixVQUFNLFFBQVEsNkJBQWEsS0FBSztBQUVoQyxTQUFLLGFBQWEsT0FBTyxTQUFTLEVBQUU7QUFDcEMsU0FBSyxhQUFhLGNBQWMsS0FBSztBQUNyQyxTQUFLLGFBQWEsU0FBUyxLQUFLO0FBQ2hDLFNBQUssYUFBYSxjQUFjLEtBQUs7QUFFckMsV0FBTztBQUFBLEVBQ1Q7QUFBQSxTQUVnQixNQUFNLE1BQXVDO0FBQzNELFdBQU8sS0FBSyxRQUFRO0FBQUEsRUFDdEI7QUFDRjtBQXhCTyxBQUNXLEFBRFgsVUFDVyxXQUFXO0FBRVgsQUFIWCxVQUdXLFVBQVU7QUFFVixBQUxYLFVBS1csWUFBWTsiLAogICJuYW1lcyI6IFtdCn0K
