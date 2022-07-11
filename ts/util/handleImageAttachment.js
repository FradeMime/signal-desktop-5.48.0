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
var handleImageAttachment_exports = {};
__export(handleImageAttachment_exports, {
  autoScale: () => autoScale,
  handleImageAttachment: () => handleImageAttachment
});
module.exports = __toCommonJS(handleImageAttachment_exports);
var import_path = __toESM(require("path"));
var import_electron = require("electron");
var import_uuid = require("uuid");
var import_VisualAttachment = require("../types/VisualAttachment");
var import_MIME = require("../types/MIME");
var import_Attachment = require("../types/Attachment");
var import_imageToBlurHash = require("./imageToBlurHash");
var import_scaleImageToLevel = require("./scaleImageToLevel");
async function handleImageAttachment(file) {
  let processedFile = file;
  if ((0, import_MIME.isHeic)(file.type, file.name)) {
    const uuid = (0, import_uuid.v4)();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const convertedFile = await new Promise((resolve, reject) => {
      import_electron.ipcRenderer.once(`convert-image:${uuid}`, (_, { error, response }) => {
        if (response) {
          resolve(response);
        } else {
          reject(error);
        }
      });
      import_electron.ipcRenderer.send("convert-image", uuid, bytes);
    });
    processedFile = new Blob([convertedFile]);
  }
  const {
    contentType,
    file: resizedBlob,
    fileName
  } = await autoScale({
    contentType: (0, import_MIME.isHeic)(file.type, file.name) ? import_MIME.IMAGE_JPEG : (0, import_MIME.stringToMIMEType)(file.type),
    fileName: file.name,
    file: processedFile
  });
  const data = await (0, import_VisualAttachment.blobToArrayBuffer)(resizedBlob);
  const blurHash = await (0, import_imageToBlurHash.imageToBlurHash)(resizedBlob);
  return {
    blurHash,
    contentType,
    data: new Uint8Array(data),
    fileName: fileName || file.name,
    path: file.name,
    pending: false,
    size: data.byteLength
  };
}
async function autoScale({
  contentType,
  file,
  fileName
}) {
  if (!(0, import_Attachment.canBeTranscoded)({ contentType })) {
    return { contentType, file, fileName };
  }
  const { blob, contentType: newContentType } = await (0, import_scaleImageToLevel.scaleImageToLevel)(file, contentType, true);
  if (newContentType !== import_MIME.IMAGE_JPEG) {
    return {
      contentType,
      file: blob,
      fileName
    };
  }
  const { name } = import_path.default.parse(fileName);
  return {
    contentType: import_MIME.IMAGE_JPEG,
    file: blob,
    fileName: `${name}.jpg`
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  autoScale,
  handleImageAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlSW1hZ2VBdHRhY2htZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IHY0IGFzIGdlblV1aWQgfSBmcm9tICd1dWlkJztcblxuaW1wb3J0IHsgYmxvYlRvQXJyYXlCdWZmZXIgfSBmcm9tICcuLi90eXBlcy9WaXN1YWxBdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgTUlNRVR5cGUgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IElNQUdFX0pQRUcsIGlzSGVpYywgc3RyaW5nVG9NSU1FVHlwZSB9IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGNhbkJlVHJhbnNjb2RlZCB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgaW1hZ2VUb0JsdXJIYXNoIH0gZnJvbSAnLi9pbWFnZVRvQmx1ckhhc2gnO1xuaW1wb3J0IHsgc2NhbGVJbWFnZVRvTGV2ZWwgfSBmcm9tICcuL3NjYWxlSW1hZ2VUb0xldmVsJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUltYWdlQXR0YWNobWVudChcbiAgZmlsZTogRmlsZVxuKTogUHJvbWlzZTxJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGU+IHtcbiAgbGV0IHByb2Nlc3NlZEZpbGU6IEZpbGUgfCBCbG9iID0gZmlsZTtcblxuICBpZiAoaXNIZWljKGZpbGUudHlwZSwgZmlsZS5uYW1lKSkge1xuICAgIGNvbnN0IHV1aWQgPSBnZW5VdWlkKCk7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCkpO1xuXG4gICAgY29uc3QgY29udmVydGVkRmlsZSA9IGF3YWl0IG5ldyBQcm9taXNlPEZpbGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uY2UoYGNvbnZlcnQtaW1hZ2U6JHt1dWlkfWAsIChfLCB7IGVycm9yLCByZXNwb25zZSB9KSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnY29udmVydC1pbWFnZScsIHV1aWQsIGJ5dGVzKTtcbiAgICB9KTtcblxuICAgIHByb2Nlc3NlZEZpbGUgPSBuZXcgQmxvYihbY29udmVydGVkRmlsZV0pO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGNvbnRlbnRUeXBlLFxuICAgIGZpbGU6IHJlc2l6ZWRCbG9iLFxuICAgIGZpbGVOYW1lLFxuICB9ID0gYXdhaXQgYXV0b1NjYWxlKHtcbiAgICBjb250ZW50VHlwZTogaXNIZWljKGZpbGUudHlwZSwgZmlsZS5uYW1lKVxuICAgICAgPyBJTUFHRV9KUEVHXG4gICAgICA6IHN0cmluZ1RvTUlNRVR5cGUoZmlsZS50eXBlKSxcbiAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgIGZpbGU6IHByb2Nlc3NlZEZpbGUsXG4gIH0pO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBibG9iVG9BcnJheUJ1ZmZlcihyZXNpemVkQmxvYik7XG4gIGNvbnN0IGJsdXJIYXNoID0gYXdhaXQgaW1hZ2VUb0JsdXJIYXNoKHJlc2l6ZWRCbG9iKTtcblxuICByZXR1cm4ge1xuICAgIGJsdXJIYXNoLFxuICAgIGNvbnRlbnRUeXBlLFxuICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KGRhdGEpLFxuICAgIGZpbGVOYW1lOiBmaWxlTmFtZSB8fCBmaWxlLm5hbWUsXG4gICAgcGF0aDogZmlsZS5uYW1lLFxuICAgIHBlbmRpbmc6IGZhbHNlLFxuICAgIHNpemU6IGRhdGEuYnl0ZUxlbmd0aCxcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF1dG9TY2FsZSh7XG4gIGNvbnRlbnRUeXBlLFxuICBmaWxlLFxuICBmaWxlTmFtZSxcbn06IHtcbiAgY29udGVudFR5cGU6IE1JTUVUeXBlO1xuICBmaWxlOiBGaWxlIHwgQmxvYjtcbiAgZmlsZU5hbWU6IHN0cmluZztcbn0pOiBQcm9taXNlPHtcbiAgY29udGVudFR5cGU6IE1JTUVUeXBlO1xuICBmaWxlOiBCbG9iO1xuICBmaWxlTmFtZTogc3RyaW5nO1xufT4ge1xuICBpZiAoIWNhbkJlVHJhbnNjb2RlZCh7IGNvbnRlbnRUeXBlIH0pKSB7XG4gICAgcmV0dXJuIHsgY29udGVudFR5cGUsIGZpbGUsIGZpbGVOYW1lIH07XG4gIH1cblxuICBjb25zdCB7IGJsb2IsIGNvbnRlbnRUeXBlOiBuZXdDb250ZW50VHlwZSB9ID0gYXdhaXQgc2NhbGVJbWFnZVRvTGV2ZWwoXG4gICAgZmlsZSxcbiAgICBjb250ZW50VHlwZSxcbiAgICB0cnVlXG4gICk7XG5cbiAgaWYgKG5ld0NvbnRlbnRUeXBlICE9PSBJTUFHRV9KUEVHKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgZmlsZTogYmxvYixcbiAgICAgIGZpbGVOYW1lLFxuICAgIH07XG4gIH1cblxuICBjb25zdCB7IG5hbWUgfSA9IHBhdGgucGFyc2UoZmlsZU5hbWUpO1xuXG4gIHJldHVybiB7XG4gICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgZmlsZTogYmxvYixcbiAgICBmaWxlTmFtZTogYCR7bmFtZX0uanBnYCxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFpQjtBQUNqQixzQkFBNEI7QUFDNUIsa0JBQThCO0FBRTlCLDhCQUFrQztBQUVsQyxrQkFBcUQ7QUFFckQsd0JBQWdDO0FBQ2hDLDZCQUFnQztBQUNoQywrQkFBa0M7QUFFbEMscUNBQ0UsTUFDc0M7QUFDdEMsTUFBSSxnQkFBNkI7QUFFakMsTUFBSSx3QkFBTyxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUc7QUFDaEMsVUFBTSxPQUFPLG9CQUFRO0FBQ3JCLFVBQU0sUUFBUSxJQUFJLFdBQVcsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUVyRCxVQUFNLGdCQUFnQixNQUFNLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztBQUNqRSxrQ0FBWSxLQUFLLGlCQUFpQixRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sZUFBZTtBQUNwRSxZQUFJLFVBQVU7QUFDWixrQkFBUSxRQUFRO0FBQUEsUUFDbEIsT0FBTztBQUNMLGlCQUFPLEtBQUs7QUFBQSxRQUNkO0FBQUEsTUFDRixDQUFDO0FBQ0Qsa0NBQVksS0FBSyxpQkFBaUIsTUFBTSxLQUFLO0FBQUEsSUFDL0MsQ0FBQztBQUVELG9CQUFnQixJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFBQSxFQUMxQztBQUVBLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTSxVQUFVO0FBQUEsSUFDbEIsYUFBYSx3QkFBTyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQ3BDLHlCQUNBLGtDQUFpQixLQUFLLElBQUk7QUFBQSxJQUM5QixVQUFVLEtBQUs7QUFBQSxJQUNmLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxRQUFNLE9BQU8sTUFBTSwrQ0FBa0IsV0FBVztBQUNoRCxRQUFNLFdBQVcsTUFBTSw0Q0FBZ0IsV0FBVztBQUVsRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU0sSUFBSSxXQUFXLElBQUk7QUFBQSxJQUN6QixVQUFVLFlBQVksS0FBSztBQUFBLElBQzNCLE1BQU0sS0FBSztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsTUFBTSxLQUFLO0FBQUEsRUFDYjtBQUNGO0FBL0NzQixBQWlEdEIseUJBQWdDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBU0M7QUFDRCxNQUFJLENBQUMsdUNBQWdCLEVBQUUsWUFBWSxDQUFDLEdBQUc7QUFDckMsV0FBTyxFQUFFLGFBQWEsTUFBTSxTQUFTO0FBQUEsRUFDdkM7QUFFQSxRQUFNLEVBQUUsTUFBTSxhQUFhLG1CQUFtQixNQUFNLGdEQUNsRCxNQUNBLGFBQ0EsSUFDRjtBQUVBLE1BQUksbUJBQW1CLHdCQUFZO0FBQ2pDLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxFQUFFLFNBQVMsb0JBQUssTUFBTSxRQUFRO0FBRXBDLFNBQU87QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLE1BQU07QUFBQSxJQUNOLFVBQVUsR0FBRztBQUFBLEVBQ2Y7QUFDRjtBQXRDc0IiLAogICJuYW1lcyI6IFtdCn0K
