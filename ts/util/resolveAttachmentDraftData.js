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
var resolveAttachmentDraftData_exports = {};
__export(resolveAttachmentDraftData_exports, {
  resolveAttachmentDraftData: () => resolveAttachmentDraftData
});
module.exports = __toCommonJS(resolveAttachmentDraftData_exports);
var log = __toESM(require("../logging/log"));
async function resolveAttachmentDraftData(attachment) {
  if (!attachment || attachment.pending) {
    return;
  }
  if (!attachment.path) {
    return;
  }
  const data = await window.Signal.Migrations.readDraftData(attachment.path);
  if (data.byteLength !== attachment.size) {
    log.error(`Attachment size from disk ${data.byteLength} did not match attachment size ${attachment.size}`);
    return;
  }
  return {
    ...attachment,
    data
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveAttachmentDraftData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVzb2x2ZUF0dGFjaG1lbnREcmFmdERhdGEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZUF0dGFjaG1lbnREcmFmdERhdGEoXG4gIGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZVxuKTogUHJvbWlzZTxBdHRhY2htZW50VHlwZSB8IHVuZGVmaW5lZD4ge1xuICBpZiAoIWF0dGFjaG1lbnQgfHwgYXR0YWNobWVudC5wZW5kaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFhdHRhY2htZW50LnBhdGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBkYXRhID0gYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLnJlYWREcmFmdERhdGEoYXR0YWNobWVudC5wYXRoKTtcbiAgaWYgKGRhdGEuYnl0ZUxlbmd0aCAhPT0gYXR0YWNobWVudC5zaXplKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYEF0dGFjaG1lbnQgc2l6ZSBmcm9tIGRpc2sgJHtkYXRhLmJ5dGVMZW5ndGh9IGRpZCBub3QgbWF0Y2ggYXR0YWNobWVudCBzaXplICR7YXR0YWNobWVudC5zaXplfWBcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uYXR0YWNobWVudCxcbiAgICBkYXRhLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFVBQXFCO0FBR3JCLDBDQUNFLFlBQ3FDO0FBQ3JDLE1BQUksQ0FBQyxjQUFjLFdBQVcsU0FBUztBQUNyQztBQUFBLEVBQ0Y7QUFFQSxNQUFJLENBQUMsV0FBVyxNQUFNO0FBQ3BCO0FBQUEsRUFDRjtBQUVBLFFBQU0sT0FBTyxNQUFNLE9BQU8sT0FBTyxXQUFXLGNBQWMsV0FBVyxJQUFJO0FBQ3pFLE1BQUksS0FBSyxlQUFlLFdBQVcsTUFBTTtBQUN2QyxRQUFJLE1BQ0YsNkJBQTZCLEtBQUssNENBQTRDLFdBQVcsTUFDM0Y7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsT0FDRjtBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0Y7QUF2QnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
