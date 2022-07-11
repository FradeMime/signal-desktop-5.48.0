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
var TypingBubble_exports = {};
__export(TypingBubble_exports, {
  TypingBubble: () => TypingBubble
});
module.exports = __toCommonJS(TypingBubble_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_TypingAnimation = require("./TypingAnimation");
var import_Avatar = require("../Avatar");
function TypingBubble({
  acceptedMessageRequest,
  avatarPath,
  badge,
  color,
  conversationType,
  i18n,
  isMe,
  name,
  phoneNumber,
  profileName,
  sharedGroupNames,
  theme,
  title
}) {
  const isGroup = conversationType === "group";
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-message", "module-message--incoming", isGroup ? "module-message--group" : null)
  }, isGroup && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-message__author-avatar-container"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    avatarPath,
    badge,
    color,
    conversationType: "direct",
    i18n,
    isMe,
    name,
    phoneNumber,
    profileName,
    theme,
    title,
    sharedGroupNames,
    size: 28
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-message__container-outer"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-message__container", "module-message__container--incoming")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-message__typing-container"
  }, /* @__PURE__ */ import_react.default.createElement(import_TypingAnimation.TypingAnimation, {
    color: "light",
    i18n
  })))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypingBubble
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwaW5nQnViYmxlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBUeXBpbmdBbmltYXRpb24gfSBmcm9tICcuL1R5cGluZ0FuaW1hdGlvbic7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuLi9BdmF0YXInO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IEJhZGdlVHlwZSB9IGZyb20gJy4uLy4uL2JhZGdlcy90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gUGljazxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgfCAnYXZhdGFyUGF0aCdcbiAgfCAnY29sb3InXG4gIHwgJ2lzTWUnXG4gIHwgJ25hbWUnXG4gIHwgJ3Bob25lTnVtYmVyJ1xuICB8ICdwcm9maWxlTmFtZSdcbiAgfCAnc2hhcmVkR3JvdXBOYW1lcydcbiAgfCAndGl0bGUnXG4+ICYge1xuICBiYWRnZTogdW5kZWZpbmVkIHwgQmFkZ2VUeXBlO1xuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnIHwgJ2RpcmVjdCc7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gVHlwaW5nQnViYmxlKHtcbiAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgYXZhdGFyUGF0aCxcbiAgYmFkZ2UsXG4gIGNvbG9yLFxuICBjb252ZXJzYXRpb25UeXBlLFxuICBpMThuLFxuICBpc01lLFxuICBuYW1lLFxuICBwaG9uZU51bWJlcixcbiAgcHJvZmlsZU5hbWUsXG4gIHNoYXJlZEdyb3VwTmFtZXMsXG4gIHRoZW1lLFxuICB0aXRsZSxcbn06IFByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgaXNHcm91cCA9IGNvbnZlcnNhdGlvblR5cGUgPT09ICdncm91cCc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdtb2R1bGUtbWVzc2FnZScsXG4gICAgICAgICdtb2R1bGUtbWVzc2FnZS0taW5jb21pbmcnLFxuICAgICAgICBpc0dyb3VwID8gJ21vZHVsZS1tZXNzYWdlLS1ncm91cCcgOiBudWxsXG4gICAgICApfVxuICAgID5cbiAgICAgIHtpc0dyb3VwICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZV9fYXV0aG9yLWF2YXRhci1jb250YWluZXJcIj5cbiAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgICAgIGJhZGdlPXtiYWRnZX1cbiAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlzTWU9e2lzTWV9XG4gICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgcGhvbmVOdW1iZXI9e3Bob25lTnVtYmVyfVxuICAgICAgICAgICAgcHJvZmlsZU5hbWU9e3Byb2ZpbGVOYW1lfVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17c2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICAgIHNpemU9ezI4fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lci1vdXRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19jb250YWluZXInLFxuICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19jb250YWluZXItLWluY29taW5nJ1xuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX190eXBpbmctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8VHlwaW5nQW5pbWF0aW9uIGNvbG9yPVwibGlnaHRcIiBpMThuPXtpMThufSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFFdkIsNkJBQWdDO0FBQ2hDLG9CQUF1QjtBQXdCaEIsc0JBQXNCO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNzQjtBQUN0QixRQUFNLFVBQVUscUJBQXFCO0FBRXJDLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1Qsa0JBQ0EsNEJBQ0EsVUFBVSwwQkFBMEIsSUFDdEM7QUFBQSxLQUVDLFdBQ0MsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esa0JBQWlCO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsR0FDUixDQUNGLEdBRUYsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULDZCQUNBLHFDQUNGO0FBQUEsS0FFQSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFnQixPQUFNO0FBQUEsSUFBUTtBQUFBLEdBQVksQ0FDN0MsQ0FDRixDQUNGLENBQ0Y7QUFFSjtBQTNEZ0IiLAogICJuYW1lcyI6IFtdCn0K
