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
var GroupDescription_exports = {};
__export(GroupDescription_exports, {
  GroupDescription: () => GroupDescription
});
module.exports = __toCommonJS(GroupDescription_exports);
var import_react = __toESM(require("react"));
var import_Modal = require("../Modal");
var import_GroupDescriptionText = require("../GroupDescriptionText");
const SHOW_READ_MORE_THRESHOLD = 5;
const GroupDescription = /* @__PURE__ */ __name(({
  i18n,
  title,
  text
}) => {
  const textRef = (0, import_react.useRef)(null);
  const [hasReadMore, setHasReadMore] = (0, import_react.useState)(false);
  const [showFullDescription, setShowFullDescription] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (!textRef || !textRef.current) {
      return;
    }
    setHasReadMore(textRef.current.scrollHeight - SHOW_READ_MORE_THRESHOLD > textRef.current.clientHeight);
  }, [setHasReadMore, text, textRef]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, showFullDescription && /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    i18n,
    onClose: () => setShowFullDescription(false),
    title
  }, /* @__PURE__ */ import_react.default.createElement(import_GroupDescriptionText.GroupDescriptionText, {
    text
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "GroupDescription__text",
    ref: textRef
  }, /* @__PURE__ */ import_react.default.createElement(import_GroupDescriptionText.GroupDescriptionText, {
    text
  })), hasReadMore && /* @__PURE__ */ import_react.default.createElement("button", {
    className: "GroupDescription__read-more",
    onClick: (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      setShowFullDescription(true);
    },
    type: "button"
  }, i18n("GroupDescription__read-more")));
}, "GroupDescription");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupDescription
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBEZXNjcmlwdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi4vTW9kYWwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBHcm91cERlc2NyaXB0aW9uVGV4dCB9IGZyb20gJy4uL0dyb3VwRGVzY3JpcHRpb25UZXh0JztcblxuLy8gRW1vamlmaWNhdGlvbiBjYW4gY2F1c2UgdGhlIHNjcm9sbCBoZWlnaHQgdG8gYmUgKnNsaWdodGx5KiBsYXJnZXIgdGhhbiB0aGUgY2xpZW50XG4vLyAgIGhlaWdodCwgc28gd2UgYWRkIGEgbGl0dGxlIHdpZ2dsZSByb29tLlxuY29uc3QgU0hPV19SRUFEX01PUkVfVEhSRVNIT0xEID0gNTtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICB0aXRsZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBEZXNjcmlwdGlvbiA9ICh7XG4gIGkxOG4sXG4gIHRpdGxlLFxuICB0ZXh0LFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB0ZXh0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtoYXNSZWFkTW9yZSwgc2V0SGFzUmVhZE1vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0Z1bGxEZXNjcmlwdGlvbiwgc2V0U2hvd0Z1bGxEZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXRleHRSZWYgfHwgIXRleHRSZWYuY3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldEhhc1JlYWRNb3JlKFxuICAgICAgdGV4dFJlZi5jdXJyZW50LnNjcm9sbEhlaWdodCAtIFNIT1dfUkVBRF9NT1JFX1RIUkVTSE9MRCA+XG4gICAgICAgIHRleHRSZWYuY3VycmVudC5jbGllbnRIZWlnaHRcbiAgICApO1xuICB9LCBbc2V0SGFzUmVhZE1vcmUsIHRleHQsIHRleHRSZWZdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7c2hvd0Z1bGxEZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIGhhc1hCdXR0b25cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dGdWxsRGVzY3JpcHRpb24oZmFsc2UpfVxuICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxHcm91cERlc2NyaXB0aW9uVGV4dCB0ZXh0PXt0ZXh0fSAvPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiR3JvdXBEZXNjcmlwdGlvbl9fdGV4dFwiIHJlZj17dGV4dFJlZn0+XG4gICAgICAgIDxHcm91cERlc2NyaXB0aW9uVGV4dCB0ZXh0PXt0ZXh0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7aGFzUmVhZE1vcmUgJiYgKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiR3JvdXBEZXNjcmlwdGlvbl9fcmVhZC1tb3JlXCJcbiAgICAgICAgICBvbkNsaWNrPXtldiA9PiB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBzZXRTaG93RnVsbERlc2NyaXB0aW9uKHRydWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignR3JvdXBEZXNjcmlwdGlvbl9fcmVhZC1tb3JlJyl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQW1EO0FBQ25ELG1CQUFzQjtBQUV0QixrQ0FBcUM7QUFJckMsTUFBTSwyQkFBMkI7QUFRMUIsTUFBTSxtQkFBbUIsd0JBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxVQUFVLHlCQUE4QixJQUFJO0FBQ2xELFFBQU0sQ0FBQyxhQUFhLGtCQUFrQiwyQkFBUyxLQUFLO0FBQ3BELFFBQU0sQ0FBQyxxQkFBcUIsMEJBQTBCLDJCQUFTLEtBQUs7QUFFcEUsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxTQUFTO0FBQ2hDO0FBQUEsSUFDRjtBQUVBLG1CQUNFLFFBQVEsUUFBUSxlQUFlLDJCQUM3QixRQUFRLFFBQVEsWUFDcEI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxnQkFBZ0IsTUFBTSxPQUFPLENBQUM7QUFFbEMsU0FDRSx3RkFDRyx1QkFDQyxtREFBQztBQUFBLElBQ0MsWUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVMsTUFBTSx1QkFBdUIsS0FBSztBQUFBLElBQzNDO0FBQUEsS0FFQSxtREFBQztBQUFBLElBQXFCO0FBQUEsR0FBWSxDQUNwQyxHQUVGLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsSUFBeUIsS0FBSztBQUFBLEtBQzNDLG1EQUFDO0FBQUEsSUFBcUI7QUFBQSxHQUFZLENBQ3BDLEdBQ0MsZUFDQyxtREFBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsU0FBUyxRQUFNO0FBQ2IsU0FBRyxlQUFlO0FBQ2xCLFNBQUcsZ0JBQWdCO0FBQ25CLDZCQUF1QixJQUFJO0FBQUEsSUFDN0I7QUFBQSxJQUNBLE1BQUs7QUFBQSxLQUVKLEtBQUssNkJBQTZCLENBQ3JDLENBRUo7QUFFSixHQWxEZ0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
