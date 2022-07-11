var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getStoryReplyText_exports = {};
__export(getStoryReplyText_exports, {
  getStoryReplyText: () => getStoryReplyText
});
module.exports = __toCommonJS(getStoryReplyText_exports);
var import_Attachment = require("../types/Attachment");
function getStoryReplyText(i18n, attachment) {
  if (!attachment) {
    return i18n("Quote__story-unavailable");
  }
  if (attachment.caption) {
    return attachment.caption;
  }
  const attachments = [attachment];
  if ((0, import_Attachment.isImage)(attachments)) {
    return i18n("message--getNotificationText--photo");
  }
  if ((0, import_Attachment.isGIF)(attachments)) {
    return i18n("message--getNotificationText--gif");
  }
  if ((0, import_Attachment.isVideo)(attachments)) {
    return i18n("message--getNotificationText--video");
  }
  if (attachment.textAttachment && attachment.textAttachment.text) {
    return attachment.textAttachment.text;
  }
  return i18n("message--getNotificationText--file");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStoryReplyText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RvcnlSZXBseVRleHQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBpc0dJRiwgaXNJbWFnZSwgaXNWaWRlbyB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RvcnlSZXBseVRleHQoXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZVxuKTogc3RyaW5nIHtcbiAgaWYgKCFhdHRhY2htZW50KSB7XG4gICAgcmV0dXJuIGkxOG4oJ1F1b3RlX19zdG9yeS11bmF2YWlsYWJsZScpO1xuICB9XG5cbiAgaWYgKGF0dGFjaG1lbnQuY2FwdGlvbikge1xuICAgIHJldHVybiBhdHRhY2htZW50LmNhcHRpb247XG4gIH1cblxuICBjb25zdCBhdHRhY2htZW50cyA9IFthdHRhY2htZW50XTtcblxuICBpZiAoaXNJbWFnZShhdHRhY2htZW50cykpIHtcbiAgICByZXR1cm4gaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tcGhvdG8nKTtcbiAgfVxuXG4gIGlmIChpc0dJRihhdHRhY2htZW50cykpIHtcbiAgICByZXR1cm4gaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tZ2lmJyk7XG4gIH1cblxuICBpZiAoaXNWaWRlbyhhdHRhY2htZW50cykpIHtcbiAgICByZXR1cm4gaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tdmlkZW8nKTtcbiAgfVxuXG4gIGlmIChhdHRhY2htZW50LnRleHRBdHRhY2htZW50ICYmIGF0dGFjaG1lbnQudGV4dEF0dGFjaG1lbnQudGV4dCkge1xuICAgIHJldHVybiBhdHRhY2htZW50LnRleHRBdHRhY2htZW50LnRleHQ7XG4gIH1cblxuICByZXR1cm4gaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tZmlsZScpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLHdCQUF3QztBQUVqQywyQkFDTCxNQUNBLFlBQ1E7QUFDUixNQUFJLENBQUMsWUFBWTtBQUNmLFdBQU8sS0FBSywwQkFBMEI7QUFBQSxFQUN4QztBQUVBLE1BQUksV0FBVyxTQUFTO0FBQ3RCLFdBQU8sV0FBVztBQUFBLEVBQ3BCO0FBRUEsUUFBTSxjQUFjLENBQUMsVUFBVTtBQUUvQixNQUFJLCtCQUFRLFdBQVcsR0FBRztBQUN4QixXQUFPLEtBQUsscUNBQXFDO0FBQUEsRUFDbkQ7QUFFQSxNQUFJLDZCQUFNLFdBQVcsR0FBRztBQUN0QixXQUFPLEtBQUssbUNBQW1DO0FBQUEsRUFDakQ7QUFFQSxNQUFJLCtCQUFRLFdBQVcsR0FBRztBQUN4QixXQUFPLEtBQUsscUNBQXFDO0FBQUEsRUFDbkQ7QUFFQSxNQUFJLFdBQVcsa0JBQWtCLFdBQVcsZUFBZSxNQUFNO0FBQy9ELFdBQU8sV0FBVyxlQUFlO0FBQUEsRUFDbkM7QUFFQSxTQUFPLEtBQUssb0NBQW9DO0FBQ2xEO0FBL0JnQiIsCiAgIm5hbWVzIjogW10KfQo=
