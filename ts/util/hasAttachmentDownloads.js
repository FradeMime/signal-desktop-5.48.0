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
var hasAttachmentDownloads_exports = {};
__export(hasAttachmentDownloads_exports, {
  hasAttachmentDownloads: () => hasAttachmentDownloads
});
module.exports = __toCommonJS(hasAttachmentDownloads_exports);
var import_lodash = require("lodash");
var import_MIME = require("../types/MIME");
function hasAttachmentDownloads(message) {
  const attachments = message.attachments || [];
  const [longMessageAttachments, normalAttachments] = (0, import_lodash.partition)(attachments, (attachment) => (0, import_MIME.isLongMessage)(attachment.contentType));
  if (longMessageAttachments.length > 0) {
    return true;
  }
  const hasNormalAttachments = normalAttachments.some((attachment) => {
    if (!attachment) {
      return false;
    }
    if (attachment.path) {
      return false;
    }
    return true;
  });
  if (hasNormalAttachments) {
    return true;
  }
  const previews = message.preview || [];
  const hasPreviews = previews.some((item) => {
    if (!item.image) {
      return false;
    }
    if (item.image.path) {
      return false;
    }
    return true;
  });
  if (hasPreviews) {
    return true;
  }
  const contacts = message.contact || [];
  const hasContacts = contacts.some((item) => {
    if (!item.avatar || !item.avatar.avatar) {
      return false;
    }
    if (item.avatar.avatar.path) {
      return false;
    }
    return true;
  });
  if (hasContacts) {
    return true;
  }
  const { quote } = message;
  const quoteAttachments = quote && quote.attachments ? quote.attachments : [];
  const hasQuoteAttachments = quoteAttachments.some((item) => {
    if (!item.thumbnail) {
      return false;
    }
    if (item.thumbnail.path) {
      return false;
    }
    return true;
  });
  if (hasQuoteAttachments) {
    return true;
  }
  const { sticker } = message;
  if (sticker) {
    return !sticker.data || sticker.data && !sticker.data.path;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasAttachmentDownloads
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFzQXR0YWNobWVudERvd25sb2Fkcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHBhcnRpdGlvbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHsgaXNMb25nTWVzc2FnZSB9IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuXG4vLyBOT1RFOiBJZiB5b3UncmUgbW9kaWZ5aW5nIHRoaXMgZnVuY3Rpb24gdGhlbiB5b3UnbGwgbGlrZWx5IGFsc28gbmVlZFxuLy8gdG8gbW9kaWZ5IC4vcXVldWVBdHRhY2htZW50RG93bmxvYWRzXG5leHBvcnQgZnVuY3Rpb24gaGFzQXR0YWNobWVudERvd25sb2FkcyhcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBib29sZWFuIHtcbiAgY29uc3QgYXR0YWNobWVudHMgPSBtZXNzYWdlLmF0dGFjaG1lbnRzIHx8IFtdO1xuXG4gIGNvbnN0IFtsb25nTWVzc2FnZUF0dGFjaG1lbnRzLCBub3JtYWxBdHRhY2htZW50c10gPSBwYXJ0aXRpb24oXG4gICAgYXR0YWNobWVudHMsXG4gICAgYXR0YWNobWVudCA9PiBpc0xvbmdNZXNzYWdlKGF0dGFjaG1lbnQuY29udGVudFR5cGUpXG4gICk7XG5cbiAgaWYgKGxvbmdNZXNzYWdlQXR0YWNobWVudHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgaGFzTm9ybWFsQXR0YWNobWVudHMgPSBub3JtYWxBdHRhY2htZW50cy5zb21lKGF0dGFjaG1lbnQgPT4ge1xuICAgIGlmICghYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBXZSd2ZSBhbHJlYWR5IGRvd25sb2FkZWQgdGhpcyFcbiAgICBpZiAoYXR0YWNobWVudC5wYXRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgaWYgKGhhc05vcm1hbEF0dGFjaG1lbnRzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBwcmV2aWV3cyA9IG1lc3NhZ2UucHJldmlldyB8fCBbXTtcbiAgY29uc3QgaGFzUHJldmlld3MgPSBwcmV2aWV3cy5zb21lKGl0ZW0gPT4ge1xuICAgIGlmICghaXRlbS5pbWFnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBXZSd2ZSBhbHJlYWR5IGRvd25sb2FkZWQgdGhpcyFcbiAgICBpZiAoaXRlbS5pbWFnZS5wYXRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgaWYgKGhhc1ByZXZpZXdzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBjb250YWN0cyA9IG1lc3NhZ2UuY29udGFjdCB8fCBbXTtcbiAgY29uc3QgaGFzQ29udGFjdHMgPSBjb250YWN0cy5zb21lKGl0ZW0gPT4ge1xuICAgIGlmICghaXRlbS5hdmF0YXIgfHwgIWl0ZW0uYXZhdGFyLmF2YXRhcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlbS5hdmF0YXIuYXZhdGFyLnBhdGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICBpZiAoaGFzQ29udGFjdHMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHsgcXVvdGUgfSA9IG1lc3NhZ2U7XG4gIGNvbnN0IHF1b3RlQXR0YWNobWVudHMgPSBxdW90ZSAmJiBxdW90ZS5hdHRhY2htZW50cyA/IHF1b3RlLmF0dGFjaG1lbnRzIDogW107XG4gIGNvbnN0IGhhc1F1b3RlQXR0YWNobWVudHMgPSBxdW90ZUF0dGFjaG1lbnRzLnNvbWUoaXRlbSA9PiB7XG4gICAgaWYgKCFpdGVtLnRodW1ibmFpbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBXZSd2ZSBhbHJlYWR5IGRvd25sb2FkZWQgdGhpcyFcbiAgICBpZiAoaXRlbS50aHVtYm5haWwucGF0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG4gIGlmIChoYXNRdW90ZUF0dGFjaG1lbnRzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCB7IHN0aWNrZXIgfSA9IG1lc3NhZ2U7XG4gIGlmIChzdGlja2VyKSB7XG4gICAgcmV0dXJuICFzdGlja2VyLmRhdGEgfHwgKHN0aWNrZXIuZGF0YSAmJiAhc3RpY2tlci5kYXRhLnBhdGgpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUEwQjtBQUUxQixrQkFBOEI7QUFJdkIsZ0NBQ0wsU0FDUztBQUNULFFBQU0sY0FBYyxRQUFRLGVBQWUsQ0FBQztBQUU1QyxRQUFNLENBQUMsd0JBQXdCLHFCQUFxQiw2QkFDbEQsYUFDQSxnQkFBYywrQkFBYyxXQUFXLFdBQVcsQ0FDcEQ7QUFFQSxNQUFJLHVCQUF1QixTQUFTLEdBQUc7QUFDckMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLHVCQUF1QixrQkFBa0IsS0FBSyxnQkFBYztBQUNoRSxRQUFJLENBQUMsWUFBWTtBQUNmLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxXQUFXLE1BQU07QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0QsTUFBSSxzQkFBc0I7QUFDeEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFdBQVcsUUFBUSxXQUFXLENBQUM7QUFDckMsUUFBTSxjQUFjLFNBQVMsS0FBSyxVQUFRO0FBQ3hDLFFBQUksQ0FBQyxLQUFLLE9BQU87QUFDZixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksS0FBSyxNQUFNLE1BQU07QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0QsTUFBSSxhQUFhO0FBQ2YsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFdBQVcsUUFBUSxXQUFXLENBQUM7QUFDckMsUUFBTSxjQUFjLFNBQVMsS0FBSyxVQUFRO0FBQ3hDLFFBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxLQUFLLE9BQU8sUUFBUTtBQUN2QyxhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksS0FBSyxPQUFPLE9BQU8sTUFBTTtBQUMzQixhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU87QUFBQSxFQUNULENBQUM7QUFDRCxNQUFJLGFBQWE7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxVQUFVO0FBQ2xCLFFBQU0sbUJBQW1CLFNBQVMsTUFBTSxjQUFjLE1BQU0sY0FBYyxDQUFDO0FBQzNFLFFBQU0sc0JBQXNCLGlCQUFpQixLQUFLLFVBQVE7QUFDeEQsUUFBSSxDQUFDLEtBQUssV0FBVztBQUNuQixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksS0FBSyxVQUFVLE1BQU07QUFDdkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0QsTUFBSSxxQkFBcUI7QUFDdkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLEVBQUUsWUFBWTtBQUNwQixNQUFJLFNBQVM7QUFDWCxXQUFPLENBQUMsUUFBUSxRQUFTLFFBQVEsUUFBUSxDQUFDLFFBQVEsS0FBSztBQUFBLEVBQ3pEO0FBRUEsU0FBTztBQUNUO0FBL0VnQiIsCiAgIm5hbWVzIjogW10KfQo=
