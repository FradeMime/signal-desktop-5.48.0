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
var ScrollDownButton_exports = {};
__export(ScrollDownButton_exports, {
  ScrollDownButton: () => ScrollDownButton
});
module.exports = __toCommonJS(ScrollDownButton_exports);
var import_react = __toESM(require("react"));
const ScrollDownButton = /* @__PURE__ */ __name(({
  conversationId,
  unreadCount,
  i18n,
  scrollDown
}) => {
  const altText = unreadCount ? i18n("messagesBelow") : i18n("scrollDown");
  let badgeText;
  if (unreadCount) {
    if (unreadCount < 100) {
      badgeText = unreadCount.toString();
    } else {
      badgeText = "99+";
    }
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ScrollDownButton"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "ScrollDownButton__button",
    onClick: () => {
      scrollDown(conversationId);
    },
    title: altText
  }, badgeText ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ScrollDownButton__button__badge"
  }, badgeText) : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ScrollDownButton__button__icon"
  })));
}, "ScrollDownButton");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollDownButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2Nyb2xsRG93bkJ1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIHVucmVhZENvdW50PzogbnVtYmVyO1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuXG4gIHNjcm9sbERvd246IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgY29uc3QgU2Nyb2xsRG93bkJ1dHRvbiA9ICh7XG4gIGNvbnZlcnNhdGlvbklkLFxuICB1bnJlYWRDb3VudCxcbiAgaTE4bixcbiAgc2Nyb2xsRG93bixcbn06IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBhbHRUZXh0ID0gdW5yZWFkQ291bnQgPyBpMThuKCdtZXNzYWdlc0JlbG93JykgOiBpMThuKCdzY3JvbGxEb3duJyk7XG5cbiAgbGV0IGJhZGdlVGV4dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAodW5yZWFkQ291bnQpIHtcbiAgICBpZiAodW5yZWFkQ291bnQgPCAxMDApIHtcbiAgICAgIGJhZGdlVGV4dCA9IHVucmVhZENvdW50LnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZGdlVGV4dCA9ICc5OSsnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJTY3JvbGxEb3duQnV0dG9uXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9XCJTY3JvbGxEb3duQnV0dG9uX19idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgc2Nyb2xsRG93bihjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIH19XG4gICAgICAgIHRpdGxlPXthbHRUZXh0fVxuICAgICAgPlxuICAgICAgICB7YmFkZ2VUZXh0ID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU2Nyb2xsRG93bkJ1dHRvbl9fYnV0dG9uX19iYWRnZVwiPntiYWRnZVRleHR9PC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlNjcm9sbERvd25CdXR0b25fX2J1dHRvbl9faWNvblwiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBYVgsTUFBTSxtQkFBbUIsd0JBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ3dCO0FBQ3hCLFFBQU0sVUFBVSxjQUFjLEtBQUssZUFBZSxJQUFJLEtBQUssWUFBWTtBQUV2RSxNQUFJO0FBQ0osTUFBSSxhQUFhO0FBQ2YsUUFBSSxjQUFjLEtBQUs7QUFDckIsa0JBQVksWUFBWSxTQUFTO0FBQUEsSUFDbkMsT0FBTztBQUNMLGtCQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsU0FBUyxNQUFNO0FBQ2IsaUJBQVcsY0FBYztBQUFBLElBQzNCO0FBQUEsSUFDQSxPQUFPO0FBQUEsS0FFTixZQUNDLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FBbUMsU0FBVSxJQUMxRCxNQUNKLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsR0FBaUMsQ0FDbEQsQ0FDRjtBQUVKLEdBbENnQzsiLAogICJuYW1lcyI6IFtdCn0K
