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
var ConversationView_exports = {};
__export(ConversationView_exports, {
  ConversationView: () => ConversationView
});
module.exports = __toCommonJS(ConversationView_exports);
var import_react = __toESM(require("react"));
const ConversationView = /* @__PURE__ */ __name(({
  renderCompositionArea,
  renderConversationHeader,
  renderTimeline
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationView"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationView__header"
  }, renderConversationHeader()), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationView__pane main panel"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationView__timeline--container"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-live": "polite",
    className: "ConversationView__timeline"
  }, renderTimeline())), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationView__composition-area"
  }, renderCompositionArea())));
}, "ConversationView");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uVmlldy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIHJlbmRlckNvbXBvc2l0aW9uQXJlYTogKCkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlckNvbnZlcnNhdGlvbkhlYWRlcjogKCkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlclRpbWVsaW5lOiAoKSA9PiBKU1guRWxlbWVudDtcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25WaWV3ID0gKHtcbiAgcmVuZGVyQ29tcG9zaXRpb25BcmVhLFxuICByZW5kZXJDb252ZXJzYXRpb25IZWFkZXIsXG4gIHJlbmRlclRpbWVsaW5lLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udmVyc2F0aW9uVmlld1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25WaWV3X19oZWFkZXJcIj5cbiAgICAgICAge3JlbmRlckNvbnZlcnNhdGlvbkhlYWRlcigpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnZlcnNhdGlvblZpZXdfX3BhbmUgbWFpbiBwYW5lbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnZlcnNhdGlvblZpZXdfX3RpbWVsaW5lLS1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGNsYXNzTmFtZT1cIkNvbnZlcnNhdGlvblZpZXdfX3RpbWVsaW5lXCI+XG4gICAgICAgICAgICB7cmVuZGVyVGltZWxpbmUoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udmVyc2F0aW9uVmlld19fY29tcG9zaXRpb24tYXJlYVwiPlxuICAgICAgICAgIHtyZW5kZXJDb21wb3NpdGlvbkFyZWEoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBUVgsTUFBTSxtQkFBbUIsd0JBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLHlCQUF5QixDQUM1QixHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLGFBQVU7QUFBQSxJQUFTLFdBQVU7QUFBQSxLQUMvQixlQUFlLENBQ2xCLENBQ0YsR0FDQSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osc0JBQXNCLENBQ3pCLENBQ0YsQ0FDRjtBQUVKLEdBdEJnQzsiLAogICJuYW1lcyI6IFtdCn0K
