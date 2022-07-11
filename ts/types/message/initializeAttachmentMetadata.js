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
var initializeAttachmentMetadata_exports = {};
__export(initializeAttachmentMetadata_exports, {
  initializeAttachmentMetadata: () => initializeAttachmentMetadata
});
module.exports = __toCommonJS(initializeAttachmentMetadata_exports);
var Attachment = __toESM(require("../Attachment"));
var IndexedDB = __toESM(require("../IndexedDB"));
const hasAttachment = /* @__PURE__ */ __name((predicate) => (message) => IndexedDB.toIndexablePresence((message.attachments || []).some(predicate)), "hasAttachment");
const hasFileAttachment = hasAttachment(Attachment.isFile);
const hasVisualMediaAttachment = hasAttachment(Attachment.isVisualMedia);
const initializeAttachmentMetadata = /* @__PURE__ */ __name(async (message) => {
  if (message.type === "verified-change") {
    return message;
  }
  if (message.type === "profile-change") {
    return message;
  }
  if (message.messageTimer || message.isViewOnce) {
    return message;
  }
  const attachments = (message.attachments || []).filter((attachment) => attachment.contentType !== "text/x-signal-plain");
  const hasAttachments = IndexedDB.toIndexableBoolean(attachments.length > 0);
  const hasFileAttachments = hasFileAttachment({ ...message, attachments });
  const hasVisualMediaAttachments = hasVisualMediaAttachment({
    ...message,
    attachments
  });
  return {
    ...message,
    hasAttachments,
    hasFileAttachments,
    hasVisualMediaAttachments
  };
}, "initializeAttachmentMetadata");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initializeAttachmentMetadata
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5pdGlhbGl6ZUF0dGFjaG1lbnRNZXRhZGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIEF0dGFjaG1lbnQgZnJvbSAnLi4vQXR0YWNobWVudCc7XG5pbXBvcnQgKiBhcyBJbmRleGVkREIgZnJvbSAnLi4vSW5kZXhlZERCJztcblxuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi8uLi9tb2RlbC10eXBlcy5kJztcblxuY29uc3QgaGFzQXR0YWNobWVudCA9XG4gIChwcmVkaWNhdGU6ICh2YWx1ZTogQXR0YWNobWVudC5BdHRhY2htZW50VHlwZSkgPT4gYm9vbGVhbikgPT5cbiAgKG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSk6IEluZGV4ZWREQi5JbmRleGFibGVQcmVzZW5jZSA9PlxuICAgIEluZGV4ZWREQi50b0luZGV4YWJsZVByZXNlbmNlKChtZXNzYWdlLmF0dGFjaG1lbnRzIHx8IFtdKS5zb21lKHByZWRpY2F0ZSkpO1xuXG5jb25zdCBoYXNGaWxlQXR0YWNobWVudCA9IGhhc0F0dGFjaG1lbnQoQXR0YWNobWVudC5pc0ZpbGUpO1xuY29uc3QgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50ID0gaGFzQXR0YWNobWVudChBdHRhY2htZW50LmlzVmlzdWFsTWVkaWEpO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUF0dGFjaG1lbnRNZXRhZGF0YSA9IGFzeW5jIChcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBQcm9taXNlPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4gPT4ge1xuICBpZiAobWVzc2FnZS50eXBlID09PSAndmVyaWZpZWQtY2hhbmdlJykge1xuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG4gIGlmIChtZXNzYWdlLnR5cGUgPT09ICdwcm9maWxlLWNoYW5nZScpIHtcbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuICBpZiAobWVzc2FnZS5tZXNzYWdlVGltZXIgfHwgbWVzc2FnZS5pc1ZpZXdPbmNlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH1cblxuICBjb25zdCBhdHRhY2htZW50cyA9IChtZXNzYWdlLmF0dGFjaG1lbnRzIHx8IFtdKS5maWx0ZXIoXG4gICAgKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUpID0+XG4gICAgICBhdHRhY2htZW50LmNvbnRlbnRUeXBlICE9PSAndGV4dC94LXNpZ25hbC1wbGFpbidcbiAgKTtcbiAgY29uc3QgaGFzQXR0YWNobWVudHMgPSBJbmRleGVkREIudG9JbmRleGFibGVCb29sZWFuKGF0dGFjaG1lbnRzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGhhc0ZpbGVBdHRhY2htZW50cyA9IGhhc0ZpbGVBdHRhY2htZW50KHsgLi4ubWVzc2FnZSwgYXR0YWNobWVudHMgfSk7XG4gIGNvbnN0IGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMgPSBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnQoe1xuICAgIC4uLm1lc3NhZ2UsXG4gICAgYXR0YWNobWVudHMsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4ubWVzc2FnZSxcbiAgICBoYXNBdHRhY2htZW50cyxcbiAgICBoYXNGaWxlQXR0YWNobWVudHMsXG4gICAgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQTRCO0FBQzVCLGdCQUEyQjtBQUkzQixNQUFNLGdCQUNKLHdCQUFDLGNBQ0QsQ0FBQyxZQUNDLFVBQVUsb0JBQXFCLFNBQVEsZUFBZSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsR0FGM0U7QUFJRixNQUFNLG9CQUFvQixjQUFjLFdBQVcsTUFBTTtBQUN6RCxNQUFNLDJCQUEyQixjQUFjLFdBQVcsYUFBYTtBQUVoRSxNQUFNLCtCQUErQiw4QkFDMUMsWUFDbUM7QUFDbkMsTUFBSSxRQUFRLFNBQVMsbUJBQW1CO0FBQ3RDLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxRQUFRLFNBQVMsa0JBQWtCO0FBQ3JDLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxRQUFRLGdCQUFnQixRQUFRLFlBQVk7QUFDOUMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGNBQWUsU0FBUSxlQUFlLENBQUMsR0FBRyxPQUM5QyxDQUFDLGVBQ0MsV0FBVyxnQkFBZ0IscUJBQy9CO0FBQ0EsUUFBTSxpQkFBaUIsVUFBVSxtQkFBbUIsWUFBWSxTQUFTLENBQUM7QUFFMUUsUUFBTSxxQkFBcUIsa0JBQWtCLEtBQUssU0FBUyxZQUFZLENBQUM7QUFDeEUsUUFBTSw0QkFBNEIseUJBQXlCO0FBQUEsT0FDdEQ7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsR0EvQjRDOyIsCiAgIm5hbWVzIjogW10KfQo=
