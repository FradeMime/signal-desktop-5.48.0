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
var downloadAttachment_exports = {};
__export(downloadAttachment_exports, {
  downloadAttachment: () => downloadAttachment
});
module.exports = __toCommonJS(downloadAttachment_exports);
var import_lodash = require("lodash");
var import_assert = require("../util/assert");
var import_dropNull = require("../util/dropNull");
var MIME = __toESM(require("../types/MIME"));
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
async function downloadAttachment(server, attachment) {
  const cdnId = attachment.cdnId || attachment.cdnKey;
  const { cdnNumber } = attachment;
  if (!cdnId) {
    throw new Error("downloadAttachment: Attachment was missing cdnId!");
  }
  (0, import_assert.strictAssert)(cdnId, "attachment without cdnId");
  const encrypted = await server.getAttachment(cdnId, (0, import_dropNull.dropNull)(cdnNumber));
  const { key, digest, size, contentType } = attachment;
  if (!digest) {
    throw new Error("Failure: Ask sender to update Signal and resend.");
  }
  (0, import_assert.strictAssert)(key, "attachment has no key");
  (0, import_assert.strictAssert)(digest, "attachment has no digest");
  const paddedData = (0, import_Crypto.decryptAttachment)(encrypted, Bytes.fromBase64(key), Bytes.fromBase64(digest));
  if (!(0, import_lodash.isNumber)(size)) {
    throw new Error(`downloadAttachment: Size was not provided, actual size was ${paddedData.byteLength}`);
  }
  const data = (0, import_Crypto.getFirstBytes)(paddedData, size);
  return {
    ...(0, import_lodash.omit)(attachment, "digest", "key"),
    size,
    contentType: contentType ? MIME.stringToMIMEType(contentType) : MIME.APPLICATION_OCTET_STREAM,
    data
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG93bmxvYWRBdHRhY2htZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOdW1iZXIsIG9taXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBkcm9wTnVsbCB9IGZyb20gJy4uL3V0aWwvZHJvcE51bGwnO1xuaW1wb3J0IHR5cGUgeyBEb3dubG9hZGVkQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCAqIGFzIE1JTUUgZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyBnZXRGaXJzdEJ5dGVzLCBkZWNyeXB0QXR0YWNobWVudCB9IGZyb20gJy4uL0NyeXB0byc7XG5cbmltcG9ydCB0eXBlIHsgUHJvY2Vzc2VkQXR0YWNobWVudCB9IGZyb20gJy4vVHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IFdlYkFQSVR5cGUgfSBmcm9tICcuL1dlYkFQSSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEF0dGFjaG1lbnQoXG4gIHNlcnZlcjogV2ViQVBJVHlwZSxcbiAgYXR0YWNobWVudDogUHJvY2Vzc2VkQXR0YWNobWVudFxuKTogUHJvbWlzZTxEb3dubG9hZGVkQXR0YWNobWVudFR5cGU+IHtcbiAgY29uc3QgY2RuSWQgPSBhdHRhY2htZW50LmNkbklkIHx8IGF0dGFjaG1lbnQuY2RuS2V5O1xuICBjb25zdCB7IGNkbk51bWJlciB9ID0gYXR0YWNobWVudDtcblxuICBpZiAoIWNkbklkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkb3dubG9hZEF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQgd2FzIG1pc3NpbmcgY2RuSWQhJyk7XG4gIH1cblxuICBzdHJpY3RBc3NlcnQoY2RuSWQsICdhdHRhY2htZW50IHdpdGhvdXQgY2RuSWQnKTtcbiAgY29uc3QgZW5jcnlwdGVkID0gYXdhaXQgc2VydmVyLmdldEF0dGFjaG1lbnQoY2RuSWQsIGRyb3BOdWxsKGNkbk51bWJlcikpO1xuICBjb25zdCB7IGtleSwgZGlnZXN0LCBzaXplLCBjb250ZW50VHlwZSB9ID0gYXR0YWNobWVudDtcblxuICBpZiAoIWRpZ2VzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbHVyZTogQXNrIHNlbmRlciB0byB1cGRhdGUgU2lnbmFsIGFuZCByZXNlbmQuJyk7XG4gIH1cblxuICBzdHJpY3RBc3NlcnQoa2V5LCAnYXR0YWNobWVudCBoYXMgbm8ga2V5Jyk7XG4gIHN0cmljdEFzc2VydChkaWdlc3QsICdhdHRhY2htZW50IGhhcyBubyBkaWdlc3QnKTtcblxuICBjb25zdCBwYWRkZWREYXRhID0gZGVjcnlwdEF0dGFjaG1lbnQoXG4gICAgZW5jcnlwdGVkLFxuICAgIEJ5dGVzLmZyb21CYXNlNjQoa2V5KSxcbiAgICBCeXRlcy5mcm9tQmFzZTY0KGRpZ2VzdClcbiAgKTtcblxuICBpZiAoIWlzTnVtYmVyKHNpemUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYGRvd25sb2FkQXR0YWNobWVudDogU2l6ZSB3YXMgbm90IHByb3ZpZGVkLCBhY3R1YWwgc2l6ZSB3YXMgJHtwYWRkZWREYXRhLmJ5dGVMZW5ndGh9YFxuICAgICk7XG4gIH1cblxuICBjb25zdCBkYXRhID0gZ2V0Rmlyc3RCeXRlcyhwYWRkZWREYXRhLCBzaXplKTtcblxuICByZXR1cm4ge1xuICAgIC4uLm9taXQoYXR0YWNobWVudCwgJ2RpZ2VzdCcsICdrZXknKSxcblxuICAgIHNpemUsXG4gICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlXG4gICAgICA/IE1JTUUuc3RyaW5nVG9NSU1FVHlwZShjb250ZW50VHlwZSlcbiAgICAgIDogTUlNRS5BUFBMSUNBVElPTl9PQ1RFVF9TVFJFQU0sXG4gICAgZGF0YSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBK0I7QUFFL0Isb0JBQTZCO0FBQzdCLHNCQUF5QjtBQUV6QixXQUFzQjtBQUN0QixZQUF1QjtBQUN2QixvQkFBaUQ7QUFLakQsa0NBQ0UsUUFDQSxZQUNtQztBQUNuQyxRQUFNLFFBQVEsV0FBVyxTQUFTLFdBQVc7QUFDN0MsUUFBTSxFQUFFLGNBQWM7QUFFdEIsTUFBSSxDQUFDLE9BQU87QUFDVixVQUFNLElBQUksTUFBTSxtREFBbUQ7QUFBQSxFQUNyRTtBQUVBLGtDQUFhLE9BQU8sMEJBQTBCO0FBQzlDLFFBQU0sWUFBWSxNQUFNLE9BQU8sY0FBYyxPQUFPLDhCQUFTLFNBQVMsQ0FBQztBQUN2RSxRQUFNLEVBQUUsS0FBSyxRQUFRLE1BQU0sZ0JBQWdCO0FBRTNDLE1BQUksQ0FBQyxRQUFRO0FBQ1gsVUFBTSxJQUFJLE1BQU0sa0RBQWtEO0FBQUEsRUFDcEU7QUFFQSxrQ0FBYSxLQUFLLHVCQUF1QjtBQUN6QyxrQ0FBYSxRQUFRLDBCQUEwQjtBQUUvQyxRQUFNLGFBQWEscUNBQ2pCLFdBQ0EsTUFBTSxXQUFXLEdBQUcsR0FDcEIsTUFBTSxXQUFXLE1BQU0sQ0FDekI7QUFFQSxNQUFJLENBQUMsNEJBQVMsSUFBSSxHQUFHO0FBQ25CLFVBQU0sSUFBSSxNQUNSLDhEQUE4RCxXQUFXLFlBQzNFO0FBQUEsRUFDRjtBQUVBLFFBQU0sT0FBTyxpQ0FBYyxZQUFZLElBQUk7QUFFM0MsU0FBTztBQUFBLE9BQ0Ysd0JBQUssWUFBWSxVQUFVLEtBQUs7QUFBQSxJQUVuQztBQUFBLElBQ0EsYUFBYSxjQUNULEtBQUssaUJBQWlCLFdBQVcsSUFDakMsS0FBSztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7QUE3Q3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
