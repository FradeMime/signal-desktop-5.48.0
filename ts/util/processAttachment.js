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
var processAttachment_exports = {};
__export(processAttachment_exports, {
  getPendingAttachment: () => getPendingAttachment,
  preProcessAttachment: () => preProcessAttachment,
  processAttachment: () => processAttachment
});
module.exports = __toCommonJS(processAttachment_exports);
var import_path = __toESM(require("path"));
var log = __toESM(require("../logging/log"));
var import_Attachment = require("../types/Attachment");
var import_AttachmentToastType = require("../types/AttachmentToastType");
var import_fileToBytes = require("./fileToBytes");
var import_handleImageAttachment = require("./handleImageAttachment");
var import_handleVideoAttachment = require("./handleVideoAttachment");
var import_isAttachmentSizeOkay = require("./isAttachmentSizeOkay");
var import_isFileDangerous = require("./isFileDangerous");
var import_MIME = require("../types/MIME");
var import_GoogleChrome = require("./GoogleChrome");
function getPendingAttachment(file) {
  if (!file) {
    return;
  }
  const fileType = (0, import_MIME.stringToMIMEType)(file.type);
  const { name: fileName } = import_path.default.parse(file.name);
  return {
    contentType: fileType,
    fileName,
    size: file.size,
    path: file.name,
    pending: true
  };
}
function preProcessAttachment(file, draftAttachments) {
  if (!file) {
    return;
  }
  if (file.size > (0, import_Attachment.getMaximumAttachmentSize)()) {
    return import_AttachmentToastType.AttachmentToastType.ToastFileSize;
  }
  if ((0, import_isFileDangerous.isFileDangerous)(file.name)) {
    return import_AttachmentToastType.AttachmentToastType.ToastDangerousFileType;
  }
  if (draftAttachments.length >= 32) {
    return import_AttachmentToastType.AttachmentToastType.ToastMaxAttachments;
  }
  const haveNonImage = draftAttachments.some((attachment) => !(0, import_MIME.isImage)(attachment.contentType));
  if (haveNonImage) {
    return import_AttachmentToastType.AttachmentToastType.ToastOneNonImageAtATime;
  }
  const fileType = (0, import_MIME.stringToMIMEType)(file.type);
  if (!(0, import_MIME.isImage)(fileType) && draftAttachments.length > 0) {
    return import_AttachmentToastType.AttachmentToastType.ToastCannotMixImageAndNonImageAttachments;
  }
  return void 0;
}
async function processAttachment(file) {
  const fileType = (0, import_MIME.stringToMIMEType)(file.type);
  let attachment;
  try {
    if ((0, import_GoogleChrome.isImageTypeSupported)(fileType) || (0, import_MIME.isHeic)(fileType, file.name)) {
      attachment = await (0, import_handleImageAttachment.handleImageAttachment)(file);
    } else if ((0, import_GoogleChrome.isVideoTypeSupported)(fileType)) {
      attachment = await (0, import_handleVideoAttachment.handleVideoAttachment)(file);
    } else {
      const data = await (0, import_fileToBytes.fileToBytes)(file);
      attachment = {
        contentType: fileType,
        data,
        fileName: file.name,
        path: file.name,
        pending: false,
        size: data.byteLength
      };
    }
  } catch (e) {
    log.error(`Was unable to generate thumbnail for fileType ${fileType}`, e && e.stack ? e.stack : e);
    const data = await (0, import_fileToBytes.fileToBytes)(file);
    attachment = {
      contentType: fileType,
      data,
      fileName: file.name,
      path: file.name,
      pending: false,
      size: data.byteLength
    };
  }
  try {
    if ((0, import_isAttachmentSizeOkay.isAttachmentSizeOkay)(attachment)) {
      return attachment;
    }
  } catch (error) {
    log.error("Error ensuring that image is properly sized:", error && error.stack ? error.stack : error);
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPendingAttachment,
  preProcessAttachment,
  processAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvY2Vzc0F0dGFjaG1lbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgdHlwZSB7XG4gIEF0dGFjaG1lbnREcmFmdFR5cGUsXG4gIEluTWVtb3J5QXR0YWNobWVudERyYWZ0VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBnZXRNYXhpbXVtQXR0YWNobWVudFNpemUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IEF0dGFjaG1lbnRUb2FzdFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50VG9hc3RUeXBlJztcbmltcG9ydCB7IGZpbGVUb0J5dGVzIH0gZnJvbSAnLi9maWxlVG9CeXRlcyc7XG5pbXBvcnQgeyBoYW5kbGVJbWFnZUF0dGFjaG1lbnQgfSBmcm9tICcuL2hhbmRsZUltYWdlQXR0YWNobWVudCc7XG5pbXBvcnQgeyBoYW5kbGVWaWRlb0F0dGFjaG1lbnQgfSBmcm9tICcuL2hhbmRsZVZpZGVvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBpc0F0dGFjaG1lbnRTaXplT2theSB9IGZyb20gJy4vaXNBdHRhY2htZW50U2l6ZU9rYXknO1xuaW1wb3J0IHsgaXNGaWxlRGFuZ2Vyb3VzIH0gZnJvbSAnLi9pc0ZpbGVEYW5nZXJvdXMnO1xuaW1wb3J0IHsgaXNIZWljLCBpc0ltYWdlLCBzdHJpbmdUb01JTUVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgeyBpc0ltYWdlVHlwZVN1cHBvcnRlZCwgaXNWaWRlb1R5cGVTdXBwb3J0ZWQgfSBmcm9tICcuL0dvb2dsZUNocm9tZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQZW5kaW5nQXR0YWNobWVudChcbiAgZmlsZTogRmlsZVxuKTogQXR0YWNobWVudERyYWZ0VHlwZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghZmlsZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGZpbGVUeXBlID0gc3RyaW5nVG9NSU1FVHlwZShmaWxlLnR5cGUpO1xuICBjb25zdCB7IG5hbWU6IGZpbGVOYW1lIH0gPSBwYXRoLnBhcnNlKGZpbGUubmFtZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb250ZW50VHlwZTogZmlsZVR5cGUsXG4gICAgZmlsZU5hbWUsXG4gICAgc2l6ZTogZmlsZS5zaXplLFxuICAgIHBhdGg6IGZpbGUubmFtZSxcbiAgICBwZW5kaW5nOiB0cnVlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlUHJvY2Vzc0F0dGFjaG1lbnQoXG4gIGZpbGU6IEZpbGUsXG4gIGRyYWZ0QXR0YWNobWVudHM6IEFycmF5PEF0dGFjaG1lbnREcmFmdFR5cGU+XG4pOiBBdHRhY2htZW50VG9hc3RUeXBlIHwgdW5kZWZpbmVkIHtcbiAgaWYgKCFmaWxlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGZpbGUuc2l6ZSA+IGdldE1heGltdW1BdHRhY2htZW50U2l6ZSgpKSB7XG4gICAgcmV0dXJuIEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RGaWxlU2l6ZTtcbiAgfVxuXG4gIGlmIChpc0ZpbGVEYW5nZXJvdXMoZmlsZS5uYW1lKSkge1xuICAgIHJldHVybiBBdHRhY2htZW50VG9hc3RUeXBlLlRvYXN0RGFuZ2Vyb3VzRmlsZVR5cGU7XG4gIH1cblxuICBpZiAoZHJhZnRBdHRhY2htZW50cy5sZW5ndGggPj0gMzIpIHtcbiAgICByZXR1cm4gQXR0YWNobWVudFRvYXN0VHlwZS5Ub2FzdE1heEF0dGFjaG1lbnRzO1xuICB9XG5cbiAgY29uc3QgaGF2ZU5vbkltYWdlID0gZHJhZnRBdHRhY2htZW50cy5zb21lKFxuICAgIChhdHRhY2htZW50OiBBdHRhY2htZW50RHJhZnRUeXBlKSA9PiAhaXNJbWFnZShhdHRhY2htZW50LmNvbnRlbnRUeXBlKVxuICApO1xuICAvLyBZb3UgY2FuJ3QgYWRkIGFub3RoZXIgYXR0YWNobWVudCBpZiB5b3UgYWxyZWFkeSBoYXZlIGEgbm9uLWltYWdlIHN0YWdlZFxuICBpZiAoaGF2ZU5vbkltYWdlKSB7XG4gICAgcmV0dXJuIEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RPbmVOb25JbWFnZUF0QVRpbWU7XG4gIH1cblxuICBjb25zdCBmaWxlVHlwZSA9IHN0cmluZ1RvTUlNRVR5cGUoZmlsZS50eXBlKTtcblxuICAvLyBZb3UgY2FuJ3QgYWRkIGEgbm9uLWltYWdlIGF0dGFjaG1lbnQgaWYgeW91IGFscmVhZHkgaGF2ZSBhdHRhY2htZW50cyBzdGFnZWRcbiAgaWYgKCFpc0ltYWdlKGZpbGVUeXBlKSAmJiBkcmFmdEF0dGFjaG1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gQXR0YWNobWVudFRvYXN0VHlwZS5Ub2FzdENhbm5vdE1peEltYWdlQW5kTm9uSW1hZ2VBdHRhY2htZW50cztcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzQXR0YWNobWVudChcbiAgZmlsZTogRmlsZVxuKTogUHJvbWlzZTxJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUgfCB2b2lkPiB7XG4gIGNvbnN0IGZpbGVUeXBlID0gc3RyaW5nVG9NSU1FVHlwZShmaWxlLnR5cGUpO1xuXG4gIGxldCBhdHRhY2htZW50OiBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGU7XG4gIHRyeSB7XG4gICAgaWYgKGlzSW1hZ2VUeXBlU3VwcG9ydGVkKGZpbGVUeXBlKSB8fCBpc0hlaWMoZmlsZVR5cGUsIGZpbGUubmFtZSkpIHtcbiAgICAgIGF0dGFjaG1lbnQgPSBhd2FpdCBoYW5kbGVJbWFnZUF0dGFjaG1lbnQoZmlsZSk7XG4gICAgfSBlbHNlIGlmIChpc1ZpZGVvVHlwZVN1cHBvcnRlZChmaWxlVHlwZSkpIHtcbiAgICAgIGF0dGFjaG1lbnQgPSBhd2FpdCBoYW5kbGVWaWRlb0F0dGFjaG1lbnQoZmlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmaWxlVG9CeXRlcyhmaWxlKTtcbiAgICAgIGF0dGFjaG1lbnQgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgcGF0aDogZmlsZS5uYW1lLFxuICAgICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgICAgc2l6ZTogZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgV2FzIHVuYWJsZSB0byBnZW5lcmF0ZSB0aHVtYm5haWwgZm9yIGZpbGVUeXBlICR7ZmlsZVR5cGV9YCxcbiAgICAgIGUgJiYgZS5zdGFjayA/IGUuc3RhY2sgOiBlXG4gICAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZmlsZVRvQnl0ZXMoZmlsZSk7XG4gICAgYXR0YWNobWVudCA9IHtcbiAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgIGRhdGEsXG4gICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgICAgcGF0aDogZmlsZS5uYW1lLFxuICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgfTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGlzQXR0YWNobWVudFNpemVPa2F5KGF0dGFjaG1lbnQpKSB7XG4gICAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ0Vycm9yIGVuc3VyaW5nIHRoYXQgaW1hZ2UgaXMgcHJvcGVybHkgc2l6ZWQ6JyxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBaUI7QUFFakIsVUFBcUI7QUFLckIsd0JBQXlDO0FBQ3pDLGlDQUFvQztBQUNwQyx5QkFBNEI7QUFDNUIsbUNBQXNDO0FBQ3RDLG1DQUFzQztBQUN0QyxrQ0FBcUM7QUFDckMsNkJBQWdDO0FBQ2hDLGtCQUFrRDtBQUNsRCwwQkFBMkQ7QUFFcEQsOEJBQ0wsTUFDaUM7QUFDakMsTUFBSSxDQUFDLE1BQU07QUFDVDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQVcsa0NBQWlCLEtBQUssSUFBSTtBQUMzQyxRQUFNLEVBQUUsTUFBTSxhQUFhLG9CQUFLLE1BQU0sS0FBSyxJQUFJO0FBRS9DLFNBQU87QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiO0FBQUEsSUFDQSxNQUFNLEtBQUs7QUFBQSxJQUNYLE1BQU0sS0FBSztBQUFBLElBQ1gsU0FBUztBQUFBLEVBQ1g7QUFDRjtBQWpCZ0IsQUFtQlQsOEJBQ0wsTUFDQSxrQkFDaUM7QUFDakMsTUFBSSxDQUFDLE1BQU07QUFDVDtBQUFBLEVBQ0Y7QUFFQSxNQUFJLEtBQUssT0FBTyxnREFBeUIsR0FBRztBQUMxQyxXQUFPLCtDQUFvQjtBQUFBLEVBQzdCO0FBRUEsTUFBSSw0Q0FBZ0IsS0FBSyxJQUFJLEdBQUc7QUFDOUIsV0FBTywrQ0FBb0I7QUFBQSxFQUM3QjtBQUVBLE1BQUksaUJBQWlCLFVBQVUsSUFBSTtBQUNqQyxXQUFPLCtDQUFvQjtBQUFBLEVBQzdCO0FBRUEsUUFBTSxlQUFlLGlCQUFpQixLQUNwQyxDQUFDLGVBQW9DLENBQUMseUJBQVEsV0FBVyxXQUFXLENBQ3RFO0FBRUEsTUFBSSxjQUFjO0FBQ2hCLFdBQU8sK0NBQW9CO0FBQUEsRUFDN0I7QUFFQSxRQUFNLFdBQVcsa0NBQWlCLEtBQUssSUFBSTtBQUczQyxNQUFJLENBQUMseUJBQVEsUUFBUSxLQUFLLGlCQUFpQixTQUFTLEdBQUc7QUFDckQsV0FBTywrQ0FBb0I7QUFBQSxFQUM3QjtBQUVBLFNBQU87QUFDVDtBQXBDZ0IsQUFzQ2hCLGlDQUNFLE1BQzZDO0FBQzdDLFFBQU0sV0FBVyxrQ0FBaUIsS0FBSyxJQUFJO0FBRTNDLE1BQUk7QUFDSixNQUFJO0FBQ0YsUUFBSSw4Q0FBcUIsUUFBUSxLQUFLLHdCQUFPLFVBQVUsS0FBSyxJQUFJLEdBQUc7QUFDakUsbUJBQWEsTUFBTSx3REFBc0IsSUFBSTtBQUFBLElBQy9DLFdBQVcsOENBQXFCLFFBQVEsR0FBRztBQUN6QyxtQkFBYSxNQUFNLHdEQUFzQixJQUFJO0FBQUEsSUFDL0MsT0FBTztBQUNMLFlBQU0sT0FBTyxNQUFNLG9DQUFZLElBQUk7QUFDbkMsbUJBQWE7QUFBQSxRQUNYLGFBQWE7QUFBQSxRQUNiO0FBQUEsUUFDQSxVQUFVLEtBQUs7QUFBQSxRQUNmLE1BQU0sS0FBSztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsTUFBTSxLQUFLO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxFQUNGLFNBQVMsR0FBUDtBQUNBLFFBQUksTUFDRixpREFBaUQsWUFDakQsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQzNCO0FBQ0EsVUFBTSxPQUFPLE1BQU0sb0NBQVksSUFBSTtBQUNuQyxpQkFBYTtBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2I7QUFBQSxNQUNBLFVBQVUsS0FBSztBQUFBLE1BQ2YsTUFBTSxLQUFLO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVCxNQUFNLEtBQUs7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUVBLE1BQUk7QUFDRixRQUFJLHNEQUFxQixVQUFVLEdBQUc7QUFDcEMsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLFNBQVMsT0FBUDtBQUNBLFFBQUksTUFDRixnREFDQSxTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVEsS0FDdkM7QUFFQSxVQUFNO0FBQUEsRUFDUjtBQUNGO0FBbERzQiIsCiAgIm5hbWVzIjogW10KfQo=
