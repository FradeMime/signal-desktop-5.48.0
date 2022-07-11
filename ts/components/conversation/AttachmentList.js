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
var AttachmentList_exports = {};
__export(AttachmentList_exports, {
  AttachmentList: () => AttachmentList
});
module.exports = __toCommonJS(AttachmentList_exports);
var import_react = __toESM(require("react"));
var import_Image = require("./Image");
var import_StagedGenericAttachment = require("./StagedGenericAttachment");
var import_StagedPlaceholderAttachment = require("./StagedPlaceholderAttachment");
var import_Attachment = require("../../types/Attachment");
const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 120;
const BLANK_VIDEO_THUMBNAIL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQAAAAA3bvkkAAAACklEQVR42mNiAAAABgADm78GJQAAAABJRU5ErkJggg==";
function getUrl(attachment) {
  if (attachment.pending) {
    return void 0;
  }
  if ("screenshot" in attachment) {
    return attachment.screenshot?.url || attachment.url;
  }
  return attachment.url;
}
const AttachmentList = /* @__PURE__ */ __name(({
  attachments,
  canEditImages,
  i18n,
  onAddAttachment,
  onClickAttachment,
  onCloseAttachment,
  onClose
}) => {
  if (!attachments.length) {
    return null;
  }
  const allVisualAttachments = (0, import_Attachment.areAllAttachmentsVisual)(attachments);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-attachments"
  }, onClose && attachments.length > 1 ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-attachments__header"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "module-attachments__close-button",
    "aria-label": i18n("close")
  })) : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-attachments__rail"
  }, (attachments || []).map((attachment, index) => {
    const url = getUrl(attachment);
    const key = url || attachment.path || attachment.fileName || index;
    const isImage = (0, import_Attachment.isImageAttachment)(attachment);
    const isVideo = (0, import_Attachment.isVideoAttachment)(attachment);
    const closeAttachment = /* @__PURE__ */ __name(() => onCloseAttachment(attachment), "closeAttachment");
    if (isImage && (0, import_Attachment.canDisplayImage)([attachment]) || isVideo || attachment.pending) {
      const isDownloaded = !attachment.pending;
      const imageUrl = url || (isVideo ? BLANK_VIDEO_THUMBNAIL : void 0);
      const clickAttachment = onClickAttachment ? () => onClickAttachment(attachment) : void 0;
      const imgElement = /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
        key,
        alt: i18n("stagedImageAttachment", [
          attachment.fileName || url || index.toString()
        ]),
        className: "module-staged-attachment",
        i18n,
        attachment,
        isDownloaded,
        curveBottomLeft: import_Image.CurveType.Tiny,
        curveBottomRight: import_Image.CurveType.Tiny,
        curveTopLeft: import_Image.CurveType.Tiny,
        curveTopRight: import_Image.CurveType.Tiny,
        playIconOverlay: isVideo,
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        url: imageUrl,
        closeButton: true,
        onClick: clickAttachment,
        onClickClose: closeAttachment,
        onError: closeAttachment
      });
      if (isImage && canEditImages) {
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-attachments--editable"
        }, imgElement, /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-attachments__edit-icon"
        }));
      }
      return imgElement;
    }
    return /* @__PURE__ */ import_react.default.createElement(import_StagedGenericAttachment.StagedGenericAttachment, {
      key,
      attachment,
      i18n,
      onClose: closeAttachment
    });
  }), allVisualAttachments && onAddAttachment ? /* @__PURE__ */ import_react.default.createElement(import_StagedPlaceholderAttachment.StagedPlaceholderAttachment, {
    onClick: onAddAttachment,
    i18n
  }) : null));
}, "AttachmentList");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AttachmentList
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudExpc3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ3VydmVUeXBlLCBJbWFnZSB9IGZyb20gJy4vSW1hZ2UnO1xuaW1wb3J0IHsgU3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQgfSBmcm9tICcuL1N0YWdlZEdlbmVyaWNBdHRhY2htZW50JztcbmltcG9ydCB7IFN0YWdlZFBsYWNlaG9sZGVyQXR0YWNobWVudCB9IGZyb20gJy4vU3RhZ2VkUGxhY2Vob2xkZXJBdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUge1xuICBBdHRhY2htZW50VHlwZSxcbiAgQXR0YWNobWVudERyYWZ0VHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQge1xuICBhcmVBbGxBdHRhY2htZW50c1Zpc3VhbCxcbiAgY2FuRGlzcGxheUltYWdlLFxuICBpc0ltYWdlQXR0YWNobWVudCxcbiAgaXNWaWRlb0F0dGFjaG1lbnQsXG59IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuXG5leHBvcnQgdHlwZSBQcm9wczxUIGV4dGVuZHMgQXR0YWNobWVudFR5cGUgfCBBdHRhY2htZW50RHJhZnRUeXBlPiA9IFJlYWRvbmx5PHtcbiAgYXR0YWNobWVudHM6IFJlYWRvbmx5QXJyYXk8VD47XG4gIGNhbkVkaXRJbWFnZXM/OiBib29sZWFuO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkFkZEF0dGFjaG1lbnQ/OiAoKSA9PiB2b2lkO1xuICBvbkNsaWNrQXR0YWNobWVudD86IChhdHRhY2htZW50OiBUKSA9PiB2b2lkO1xuICBvbkNsb3NlPzogKCkgPT4gdm9pZDtcbiAgb25DbG9zZUF0dGFjaG1lbnQ6IChhdHRhY2htZW50OiBUKSA9PiB2b2lkO1xufT47XG5cbmNvbnN0IElNQUdFX1dJRFRIID0gMTIwO1xuY29uc3QgSU1BR0VfSEVJR0hUID0gMTIwO1xuXG4vLyBUaGlzIGlzIGEgMXgxIGJsYWNrIHNxdWFyZS5cbmNvbnN0IEJMQU5LX1ZJREVPX1RIVU1CTkFJTCA9XG4gICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJBUUFBQUFBM2J2a2tBQUFBQ2tsRVFWUjQybU5pQUFBQUJnQURtNzhHSlFBQUFBQkpSVTVFcmtKZ2dnPT0nO1xuXG5mdW5jdGlvbiBnZXRVcmwoXG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlIHwgQXR0YWNobWVudERyYWZ0VHlwZVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGF0dGFjaG1lbnQucGVuZGluZykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoJ3NjcmVlbnNob3QnIGluIGF0dGFjaG1lbnQpIHtcbiAgICByZXR1cm4gYXR0YWNobWVudC5zY3JlZW5zaG90Py51cmwgfHwgYXR0YWNobWVudC51cmw7XG4gIH1cblxuICByZXR1cm4gYXR0YWNobWVudC51cmw7XG59XG5cbmV4cG9ydCBjb25zdCBBdHRhY2htZW50TGlzdCA9IDxUIGV4dGVuZHMgQXR0YWNobWVudFR5cGUgfCBBdHRhY2htZW50RHJhZnRUeXBlPih7XG4gIGF0dGFjaG1lbnRzLFxuICBjYW5FZGl0SW1hZ2VzLFxuICBpMThuLFxuICBvbkFkZEF0dGFjaG1lbnQsXG4gIG9uQ2xpY2tBdHRhY2htZW50LFxuICBvbkNsb3NlQXR0YWNobWVudCxcbiAgb25DbG9zZSxcbn06IFByb3BzPFQ+KTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgaWYgKCFhdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGFsbFZpc3VhbEF0dGFjaG1lbnRzID0gYXJlQWxsQXR0YWNobWVudHNWaXN1YWwoYXR0YWNobWVudHMpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtYXR0YWNobWVudHNcIj5cbiAgICAgIHtvbkNsb3NlICYmIGF0dGFjaG1lbnRzLmxlbmd0aCA+IDEgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWF0dGFjaG1lbnRzX19oZWFkZXJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtYXR0YWNobWVudHNfX2Nsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1hdHRhY2htZW50c19fcmFpbFwiPlxuICAgICAgICB7KGF0dGFjaG1lbnRzIHx8IFtdKS5tYXAoKGF0dGFjaG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXJsID0gZ2V0VXJsKGF0dGFjaG1lbnQpO1xuXG4gICAgICAgICAgY29uc3Qga2V5ID0gdXJsIHx8IGF0dGFjaG1lbnQucGF0aCB8fCBhdHRhY2htZW50LmZpbGVOYW1lIHx8IGluZGV4O1xuXG4gICAgICAgICAgY29uc3QgaXNJbWFnZSA9IGlzSW1hZ2VBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xuICAgICAgICAgIGNvbnN0IGlzVmlkZW8gPSBpc1ZpZGVvQXR0YWNobWVudChhdHRhY2htZW50KTtcbiAgICAgICAgICBjb25zdCBjbG9zZUF0dGFjaG1lbnQgPSAoKSA9PiBvbkNsb3NlQXR0YWNobWVudChhdHRhY2htZW50KTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChpc0ltYWdlICYmIGNhbkRpc3BsYXlJbWFnZShbYXR0YWNobWVudF0pKSB8fFxuICAgICAgICAgICAgaXNWaWRlbyB8fFxuICAgICAgICAgICAgYXR0YWNobWVudC5wZW5kaW5nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBpc0Rvd25sb2FkZWQgPSAhYXR0YWNobWVudC5wZW5kaW5nO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVcmwgPVxuICAgICAgICAgICAgICB1cmwgfHwgKGlzVmlkZW8gPyBCTEFOS19WSURFT19USFVNQk5BSUwgOiB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBjb25zdCBjbGlja0F0dGFjaG1lbnQgPSBvbkNsaWNrQXR0YWNobWVudFxuICAgICAgICAgICAgICA/ICgpID0+IG9uQ2xpY2tBdHRhY2htZW50KGF0dGFjaG1lbnQpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gKFxuICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBhbHQ9e2kxOG4oJ3N0YWdlZEltYWdlQXR0YWNobWVudCcsIFtcbiAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQuZmlsZU5hbWUgfHwgdXJsIHx8IGluZGV4LnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgXSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLXN0YWdlZC1hdHRhY2htZW50XCJcbiAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ9e2F0dGFjaG1lbnR9XG4gICAgICAgICAgICAgICAgaXNEb3dubG9hZGVkPXtpc0Rvd25sb2FkZWR9XG4gICAgICAgICAgICAgICAgY3VydmVCb3R0b21MZWZ0PXtDdXJ2ZVR5cGUuVGlueX1cbiAgICAgICAgICAgICAgICBjdXJ2ZUJvdHRvbVJpZ2h0PXtDdXJ2ZVR5cGUuVGlueX1cbiAgICAgICAgICAgICAgICBjdXJ2ZVRvcExlZnQ9e0N1cnZlVHlwZS5UaW55fVxuICAgICAgICAgICAgICAgIGN1cnZlVG9wUmlnaHQ9e0N1cnZlVHlwZS5UaW55fVxuICAgICAgICAgICAgICAgIHBsYXlJY29uT3ZlcmxheT17aXNWaWRlb31cbiAgICAgICAgICAgICAgICBoZWlnaHQ9e0lNQUdFX0hFSUdIVH1cbiAgICAgICAgICAgICAgICB3aWR0aD17SU1BR0VfV0lEVEh9XG4gICAgICAgICAgICAgICAgdXJsPXtpbWFnZVVybH1cbiAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsaWNrQXR0YWNobWVudH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrQ2xvc2U9e2Nsb3NlQXR0YWNobWVudH1cbiAgICAgICAgICAgICAgICBvbkVycm9yPXtjbG9zZUF0dGFjaG1lbnR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoaXNJbWFnZSAmJiBjYW5FZGl0SW1hZ2VzKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtYXR0YWNobWVudHMtLWVkaXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICB7aW1nRWxlbWVudH1cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWF0dGFjaG1lbnRzX19lZGl0LWljb25cIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW1nRWxlbWVudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFN0YWdlZEdlbmVyaWNBdHRhY2htZW50XG4gICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50fVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBvbkNsb3NlPXtjbG9zZUF0dGFjaG1lbnR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgICB7YWxsVmlzdWFsQXR0YWNobWVudHMgJiYgb25BZGRBdHRhY2htZW50ID8gKFxuICAgICAgICAgIDxTdGFnZWRQbGFjZWhvbGRlckF0dGFjaG1lbnQgb25DbGljaz17b25BZGRBdHRhY2htZW50fSBpMThuPXtpMThufSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsbUJBQWlDO0FBQ2pDLHFDQUF3QztBQUN4Qyx5Q0FBNEM7QUFNNUMsd0JBS087QUFZUCxNQUFNLGNBQWM7QUFDcEIsTUFBTSxlQUFlO0FBR3JCLE1BQU0sd0JBQ0o7QUFFRixnQkFDRSxZQUNvQjtBQUNwQixNQUFJLFdBQVcsU0FBUztBQUN0QixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksZ0JBQWdCLFlBQVk7QUFDOUIsV0FBTyxXQUFXLFlBQVksT0FBTyxXQUFXO0FBQUEsRUFDbEQ7QUFFQSxTQUFPLFdBQVc7QUFDcEI7QUFaUyxBQWNGLE1BQU0saUJBQWlCLHdCQUFpRDtBQUFBLEVBQzdFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDa0M7QUFDbEMsTUFBSSxDQUFDLFlBQVksUUFBUTtBQUN2QixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sdUJBQXVCLCtDQUF3QixXQUFXO0FBRWhFLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLFdBQVcsWUFBWSxTQUFTLElBQy9CLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsV0FBVTtBQUFBLElBQ1YsY0FBWSxLQUFLLE9BQU87QUFBQSxHQUMxQixDQUNGLElBQ0UsTUFDSixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1gsZ0JBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLFVBQVU7QUFDOUMsVUFBTSxNQUFNLE9BQU8sVUFBVTtBQUU3QixVQUFNLE1BQU0sT0FBTyxXQUFXLFFBQVEsV0FBVyxZQUFZO0FBRTdELFVBQU0sVUFBVSx5Q0FBa0IsVUFBVTtBQUM1QyxVQUFNLFVBQVUseUNBQWtCLFVBQVU7QUFDNUMsVUFBTSxrQkFBa0IsNkJBQU0sa0JBQWtCLFVBQVUsR0FBbEM7QUFFeEIsUUFDRyxXQUFXLHVDQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUN4QyxXQUNBLFdBQVcsU0FDWDtBQUNBLFlBQU0sZUFBZSxDQUFDLFdBQVc7QUFDakMsWUFBTSxXQUNKLE9BQVEsV0FBVSx3QkFBd0I7QUFFNUMsWUFBTSxrQkFBa0Isb0JBQ3BCLE1BQU0sa0JBQWtCLFVBQVUsSUFDbEM7QUFFSixZQUFNLGFBQ0osbURBQUM7QUFBQSxRQUNDO0FBQUEsUUFDQSxLQUFLLEtBQUsseUJBQXlCO0FBQUEsVUFDakMsV0FBVyxZQUFZLE9BQU8sTUFBTSxTQUFTO0FBQUEsUUFDL0MsQ0FBQztBQUFBLFFBQ0QsV0FBVTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsaUJBQWlCLHVCQUFVO0FBQUEsUUFDM0Isa0JBQWtCLHVCQUFVO0FBQUEsUUFDNUIsY0FBYyx1QkFBVTtBQUFBLFFBQ3hCLGVBQWUsdUJBQVU7QUFBQSxRQUN6QixpQkFBaUI7QUFBQSxRQUNqQixRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxhQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxjQUFjO0FBQUEsUUFDZCxTQUFTO0FBQUEsT0FDWDtBQUdGLFVBQUksV0FBVyxlQUFlO0FBQzVCLGVBQ0UsbURBQUM7QUFBQSxVQUFJLFdBQVU7QUFBQSxXQUNaLFlBQ0QsbURBQUM7QUFBQSxVQUFJLFdBQVU7QUFBQSxTQUFnQyxDQUNqRDtBQUFBLE1BRUo7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFNBQVM7QUFBQSxLQUNYO0FBQUEsRUFFSixDQUFDLEdBQ0Esd0JBQXdCLGtCQUN2QixtREFBQztBQUFBLElBQTRCLFNBQVM7QUFBQSxJQUFpQjtBQUFBLEdBQVksSUFDakUsSUFDTixDQUNGO0FBRUosR0F0RzhCOyIsCiAgIm5hbWVzIjogW10KfQo=
