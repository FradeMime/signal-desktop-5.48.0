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
var deleteForEveryone_exports = {};
__export(deleteForEveryone_exports, {
  deleteForEveryone: () => deleteForEveryone
});
module.exports = __toCommonJS(deleteForEveryone_exports);
var log = __toESM(require("../logging/log"));
var import_durations = require("./durations");
async function deleteForEveryone(message, doe, shouldPersist = true) {
  const messageTimestamp = message.get("serverTimestamp") || message.get("sent_at") || 0;
  const delta = Math.abs(doe.get("serverTimestamp") - messageTimestamp);
  if (delta > import_durations.DAY) {
    log.info("Received late DOE. Dropping.", {
      fromId: doe.get("fromId"),
      targetSentTimestamp: doe.get("targetSentTimestamp"),
      messageServerTimestamp: message.get("serverTimestamp"),
      messageSentAt: message.get("sent_at"),
      deleteServerTimestamp: doe.get("serverTimestamp")
    });
    return;
  }
  await message.handleDeleteForEveryone(doe, shouldPersist);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteForEveryone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVsZXRlRm9yRXZlcnlvbmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBEZWxldGVNb2RlbCB9IGZyb20gJy4uL21lc3NhZ2VNb2RpZmllcnMvRGVsZXRlcyc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgREFZIH0gZnJvbSAnLi9kdXJhdGlvbnMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlRm9yRXZlcnlvbmUoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCxcbiAgZG9lOiBEZWxldGVNb2RlbCxcbiAgc2hvdWxkUGVyc2lzdCA9IHRydWVcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBtZXNzYWdlVGltZXN0YW1wID1cbiAgICBtZXNzYWdlLmdldCgnc2VydmVyVGltZXN0YW1wJykgfHwgbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSB8fCAwO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGUgc2VydmVyIHRpbWVzdGFtcHMgZm9yIHRoZSBET0UgYW5kIHRoZSBtYXRjaGluZyBtZXNzYWdlXG4gIC8vIGFyZSBsZXNzIHRoYW4gb25lIGRheSBhcGFydFxuICBjb25zdCBkZWx0YSA9IE1hdGguYWJzKGRvZS5nZXQoJ3NlcnZlclRpbWVzdGFtcCcpIC0gbWVzc2FnZVRpbWVzdGFtcCk7XG5cbiAgaWYgKGRlbHRhID4gREFZKSB7XG4gICAgbG9nLmluZm8oJ1JlY2VpdmVkIGxhdGUgRE9FLiBEcm9wcGluZy4nLCB7XG4gICAgICBmcm9tSWQ6IGRvZS5nZXQoJ2Zyb21JZCcpLFxuICAgICAgdGFyZ2V0U2VudFRpbWVzdGFtcDogZG9lLmdldCgndGFyZ2V0U2VudFRpbWVzdGFtcCcpLFxuICAgICAgbWVzc2FnZVNlcnZlclRpbWVzdGFtcDogbWVzc2FnZS5nZXQoJ3NlcnZlclRpbWVzdGFtcCcpLFxuICAgICAgbWVzc2FnZVNlbnRBdDogbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgIGRlbGV0ZVNlcnZlclRpbWVzdGFtcDogZG9lLmdldCgnc2VydmVyVGltZXN0YW1wJyksXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgbWVzc2FnZS5oYW5kbGVEZWxldGVGb3JFdmVyeW9uZShkb2UsIHNob3VsZFBlcnNpc3QpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLFVBQXFCO0FBQ3JCLHVCQUFvQjtBQUVwQixpQ0FDRSxTQUNBLEtBQ0EsZ0JBQWdCLE1BQ0Q7QUFDZixRQUFNLG1CQUNKLFFBQVEsSUFBSSxpQkFBaUIsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLO0FBSTlELFFBQU0sUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLGlCQUFpQixJQUFJLGdCQUFnQjtBQUVwRSxNQUFJLFFBQVEsc0JBQUs7QUFDZixRQUFJLEtBQUssZ0NBQWdDO0FBQUEsTUFDdkMsUUFBUSxJQUFJLElBQUksUUFBUTtBQUFBLE1BQ3hCLHFCQUFxQixJQUFJLElBQUkscUJBQXFCO0FBQUEsTUFDbEQsd0JBQXdCLFFBQVEsSUFBSSxpQkFBaUI7QUFBQSxNQUNyRCxlQUFlLFFBQVEsSUFBSSxTQUFTO0FBQUEsTUFDcEMsdUJBQXVCLElBQUksSUFBSSxpQkFBaUI7QUFBQSxJQUNsRCxDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLHdCQUF3QixLQUFLLGFBQWE7QUFDMUQ7QUF4QnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
