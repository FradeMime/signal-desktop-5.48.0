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
  MentionBlot: () => MentionBlot
});
module.exports = __toCommonJS(blot_exports);
var import_react = __toESM(require("react"));
var import_quill = __toESM(require("quill"));
var import_react_dom = require("react-dom");
var import_Emojify = require("../../components/conversation/Emojify");
const Embed = import_quill.default.import("blots/embed");
const _MentionBlot = class extends Embed {
  static create(value) {
    const node = super.create(void 0);
    _MentionBlot.buildSpan(value, node);
    return node;
  }
  static value(node) {
    const { uuid, title } = node.dataset;
    if (uuid === void 0 || title === void 0) {
      throw new Error(`Failed to make MentionBlot with uuid: ${uuid} and title: ${title}`);
    }
    return {
      uuid,
      title
    };
  }
  static buildSpan(mention, node) {
    node.setAttribute("data-uuid", mention.uuid || "");
    node.setAttribute("data-title", mention.title || "");
    node.setAttribute("contenteditable", "false");
    const mentionSpan = document.createElement("span");
    (0, import_react_dom.render)(/* @__PURE__ */ import_react.default.createElement("span", {
      className: "module-composition-input__at-mention"
    }, /* @__PURE__ */ import_react.default.createElement("bdi", null, "@", /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
      text: mention.title
    }))), mentionSpan);
    node.appendChild(mentionSpan);
  }
};
let MentionBlot = _MentionBlot;
MentionBlot.blotName = "mention";
MentionBlot.className = "mention-blot";
MentionBlot.tagName = "span";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MentionBlot
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmxvdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhcmNobWVudCBmcm9tICdwYXJjaG1lbnQnO1xuaW1wb3J0IFF1aWxsIGZyb20gJ3F1aWxsJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vRW1vamlmeSc7XG5pbXBvcnQgdHlwZSB7IE1lbnRpb25CbG90VmFsdWUgfSBmcm9tICcuLi91dGlsJztcblxuZGVjbGFyZSBjbGFzcyBRdWlsbEVtYmVkIGV4dGVuZHMgUGFyY2htZW50LkVtYmVkIHtcbiAgY29udGVudE5vZGU6IEhUTUxFbGVtZW50O1xufVxuXG5jb25zdCBFbWJlZDogdHlwZW9mIFF1aWxsRW1iZWQgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2VtYmVkJyk7XG5cbmV4cG9ydCBjbGFzcyBNZW50aW9uQmxvdCBleHRlbmRzIEVtYmVkIHtcbiAgc3RhdGljIG92ZXJyaWRlIGJsb3ROYW1lID0gJ21lbnRpb24nO1xuXG4gIHN0YXRpYyBvdmVycmlkZSBjbGFzc05hbWUgPSAnbWVudGlvbi1ibG90JztcblxuICBzdGF0aWMgb3ZlcnJpZGUgdGFnTmFtZSA9ICdzcGFuJztcblxuICBzdGF0aWMgb3ZlcnJpZGUgY3JlYXRlKHZhbHVlOiBNZW50aW9uQmxvdFZhbHVlKTogTm9kZSB7XG4gICAgY29uc3Qgbm9kZSA9IHN1cGVyLmNyZWF0ZSh1bmRlZmluZWQpIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgTWVudGlvbkJsb3QuYnVpbGRTcGFuKHZhbHVlLCBub2RlKTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgc3RhdGljIG92ZXJyaWRlIHZhbHVlKG5vZGU6IEhUTUxFbGVtZW50KTogTWVudGlvbkJsb3RWYWx1ZSB7XG4gICAgY29uc3QgeyB1dWlkLCB0aXRsZSB9ID0gbm9kZS5kYXRhc2V0O1xuICAgIGlmICh1dWlkID09PSB1bmRlZmluZWQgfHwgdGl0bGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRmFpbGVkIHRvIG1ha2UgTWVudGlvbkJsb3Qgd2l0aCB1dWlkOiAke3V1aWR9IGFuZCB0aXRsZTogJHt0aXRsZX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB1dWlkLFxuICAgICAgdGl0bGUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBidWlsZFNwYW4obWVudGlvbjogTWVudGlvbkJsb3RWYWx1ZSwgbm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS11dWlkJywgbWVudGlvbi51dWlkIHx8ICcnKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScsIG1lbnRpb24udGl0bGUgfHwgJycpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAnZmFsc2UnKTtcblxuICAgIGNvbnN0IG1lbnRpb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgcmVuZGVyKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLWNvbXBvc2l0aW9uLWlucHV0X19hdC1tZW50aW9uXCI+XG4gICAgICAgIDxiZGk+XG4gICAgICAgICAgQFxuICAgICAgICAgIDxFbW9qaWZ5IHRleHQ9e21lbnRpb24udGl0bGV9IC8+XG4gICAgICAgIDwvYmRpPlxuICAgICAgPC9zcGFuPixcbiAgICAgIG1lbnRpb25TcGFuXG4gICAgKTtcblxuICAgIG5vZGUuYXBwZW5kQ2hpbGQobWVudGlvblNwYW4pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsbUJBQWtCO0FBRWxCLG1CQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIscUJBQXdCO0FBT3hCLE1BQU0sUUFBMkIscUJBQU0sT0FBTyxhQUFhO0FBRXBELG1DQUEwQixNQUFNO0FBQUEsU0FPckIsT0FBTyxPQUErQjtBQUNwRCxVQUFNLE9BQU8sTUFBTSxPQUFPLE1BQVM7QUFFbkMsaUJBQVksVUFBVSxPQUFPLElBQUk7QUFFakMsV0FBTztBQUFBLEVBQ1Q7QUFBQSxTQUVnQixNQUFNLE1BQXFDO0FBQ3pELFVBQU0sRUFBRSxNQUFNLFVBQVUsS0FBSztBQUM3QixRQUFJLFNBQVMsVUFBYSxVQUFVLFFBQVc7QUFDN0MsWUFBTSxJQUFJLE1BQ1IseUNBQXlDLG1CQUFtQixPQUM5RDtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLFNBRU8sVUFBVSxTQUEyQixNQUF5QjtBQUNuRSxTQUFLLGFBQWEsYUFBYSxRQUFRLFFBQVEsRUFBRTtBQUNqRCxTQUFLLGFBQWEsY0FBYyxRQUFRLFNBQVMsRUFBRTtBQUNuRCxTQUFLLGFBQWEsbUJBQW1CLE9BQU87QUFFNUMsVUFBTSxjQUFjLFNBQVMsY0FBYyxNQUFNO0FBRWpELGlDQUNFLG1EQUFDO0FBQUEsTUFBSyxXQUFVO0FBQUEsT0FDZCxtREFBQyxhQUFJLEtBRUgsbURBQUM7QUFBQSxNQUFRLE1BQU0sUUFBUTtBQUFBLEtBQU8sQ0FDaEMsQ0FDRixHQUNBLFdBQ0Y7QUFFQSxTQUFLLFlBQVksV0FBVztBQUFBLEVBQzlCO0FBQ0Y7QUFoRE87QUFDVyxBQURYLFlBQ1csV0FBVztBQUVYLEFBSFgsWUFHVyxZQUFZO0FBRVosQUFMWCxZQUtXLFVBQVU7IiwKICAibmFtZXMiOiBbXQp9Cg==
