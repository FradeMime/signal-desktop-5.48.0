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
var resolveDraftAttachmentOnDisk_exports = {};
__export(resolveDraftAttachmentOnDisk_exports, {
  resolveDraftAttachmentOnDisk: () => resolveDraftAttachmentOnDisk
});
module.exports = __toCommonJS(resolveDraftAttachmentOnDisk_exports);
var import_lodash = require("lodash");
var log = __toESM(require("../logging/log"));
var import_Attachment = require("../types/Attachment");
function resolveDraftAttachmentOnDisk(attachment) {
  let url = "";
  if (attachment.pending) {
    return attachment;
  }
  if (attachment.screenshotPath) {
    url = window.Signal.Migrations.getAbsoluteDraftPath(attachment.screenshotPath);
  } else if (!(0, import_Attachment.isVideoAttachment)(attachment) && attachment.path) {
    url = window.Signal.Migrations.getAbsoluteDraftPath(attachment.path);
  } else {
    log.warn("resolveOnDiskAttachment: Attachment was missing both screenshotPath and path fields");
  }
  return {
    ...(0, import_lodash.pick)(attachment, [
      "blurHash",
      "caption",
      "contentType",
      "fileName",
      "path",
      "size",
      "width",
      "height"
    ]),
    pending: false,
    url
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveDraftAttachmentOnDisk
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVzb2x2ZURyYWZ0QXR0YWNobWVudE9uRGlzay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudERyYWZ0VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgaXNWaWRlb0F0dGFjaG1lbnQgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEcmFmdEF0dGFjaG1lbnRPbkRpc2soXG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnREcmFmdFR5cGVcbik6IEF0dGFjaG1lbnREcmFmdFR5cGUge1xuICBsZXQgdXJsID0gJyc7XG4gIGlmIChhdHRhY2htZW50LnBlbmRpbmcpIHtcbiAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgfVxuXG4gIGlmIChhdHRhY2htZW50LnNjcmVlbnNob3RQYXRoKSB7XG4gICAgdXJsID0gd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlRHJhZnRQYXRoKFxuICAgICAgYXR0YWNobWVudC5zY3JlZW5zaG90UGF0aFxuICAgICk7XG4gIH0gZWxzZSBpZiAoIWlzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnQpICYmIGF0dGFjaG1lbnQucGF0aCkge1xuICAgIHVybCA9IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5nZXRBYnNvbHV0ZURyYWZ0UGF0aChhdHRhY2htZW50LnBhdGgpO1xuICB9IGVsc2Uge1xuICAgIGxvZy53YXJuKFxuICAgICAgJ3Jlc29sdmVPbkRpc2tBdHRhY2htZW50OiBBdHRhY2htZW50IHdhcyBtaXNzaW5nIGJvdGggc2NyZWVuc2hvdFBhdGggYW5kIHBhdGggZmllbGRzJ1xuICAgICk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICAuLi5waWNrKGF0dGFjaG1lbnQsIFtcbiAgICAgICdibHVySGFzaCcsXG4gICAgICAnY2FwdGlvbicsXG4gICAgICAnY29udGVudFR5cGUnLFxuICAgICAgJ2ZpbGVOYW1lJyxcbiAgICAgICdwYXRoJyxcbiAgICAgICdzaXplJyxcbiAgICAgICd3aWR0aCcsXG4gICAgICAnaGVpZ2h0JyxcbiAgICBdKSxcbiAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICB1cmwsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXFCO0FBRXJCLFVBQXFCO0FBRXJCLHdCQUFrQztBQUUzQixzQ0FDTCxZQUNxQjtBQUNyQixNQUFJLE1BQU07QUFDVixNQUFJLFdBQVcsU0FBUztBQUN0QixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksV0FBVyxnQkFBZ0I7QUFDN0IsVUFBTSxPQUFPLE9BQU8sV0FBVyxxQkFDN0IsV0FBVyxjQUNiO0FBQUEsRUFDRixXQUFXLENBQUMseUNBQWtCLFVBQVUsS0FBSyxXQUFXLE1BQU07QUFDNUQsVUFBTSxPQUFPLE9BQU8sV0FBVyxxQkFBcUIsV0FBVyxJQUFJO0FBQUEsRUFDckUsT0FBTztBQUNMLFFBQUksS0FDRixxRkFDRjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQUEsT0FDRix3QkFBSyxZQUFZO0FBQUEsTUFDbEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxTQUFTO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRjtBQWpDZ0IiLAogICJuYW1lcyI6IFtdCn0K
