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
var retryDeleteForEveryone_exports = {};
__export(retryDeleteForEveryone_exports, {
  retryDeleteForEveryone: () => retryDeleteForEveryone
});
module.exports = __toCommonJS(retryDeleteForEveryone_exports);
var log = __toESM(require("../logging/log"));
var Errors = __toESM(require("../types/errors"));
var import_conversationJobQueue = require("../jobs/conversationJobQueue");
var import_timestamp = require("./timestamp");
var import_durations = require("./durations");
async function retryDeleteForEveryone(messageId) {
  const message = window.MessageController.getById(messageId);
  if (!message) {
    throw new Error(`retryDeleteForEveryone: Message ${messageId} missing!`);
  }
  if ((0, import_timestamp.isOlderThan)(message.get("sent_at"), import_durations.DAY)) {
    throw new Error("retryDeleteForEveryone: Message too old to retry delete for everyone!");
  }
  try {
    const conversation = message.getConversation();
    if (!conversation) {
      throw new Error(`retryDeleteForEveryone: Conversation for ${messageId} missing!`);
    }
    const jobData = {
      type: import_conversationJobQueue.conversationQueueJobEnum.enum.DeleteForEveryone,
      conversationId: conversation.id,
      messageId,
      recipients: conversation.getRecipients(),
      revision: conversation.get("revision"),
      targetTimestamp: message.get("sent_at")
    };
    log.info(`retryDeleteForEveryone: Adding job for message ${message.idForLogging()}!`);
    await import_conversationJobQueue.conversationJobQueue.add(jobData);
  } catch (error) {
    log.error("retryDeleteForEveryone: Failed to queue delete for everyone", Errors.toLogFormat(error));
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  retryDeleteForEveryone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmV0cnlEZWxldGVGb3JFdmVyeW9uZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uUXVldWVKb2JEYXRhIH0gZnJvbSAnLi4vam9icy9jb252ZXJzYXRpb25Kb2JRdWV1ZSc7XG5pbXBvcnQge1xuICBjb252ZXJzYXRpb25Kb2JRdWV1ZSxcbiAgY29udmVyc2F0aW9uUXVldWVKb2JFbnVtLFxufSBmcm9tICcuLi9qb2JzL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB7IGlzT2xkZXJUaGFuIH0gZnJvbSAnLi90aW1lc3RhbXAnO1xuaW1wb3J0IHsgREFZIH0gZnJvbSAnLi9kdXJhdGlvbnMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmV0cnlEZWxldGVGb3JFdmVyeW9uZShtZXNzYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQobWVzc2FnZUlkKTtcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGByZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBNZXNzYWdlICR7bWVzc2FnZUlkfSBtaXNzaW5nIWApO1xuICB9XG5cbiAgaWYgKGlzT2xkZXJUaGFuKG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksIERBWSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAncmV0cnlEZWxldGVGb3JFdmVyeW9uZTogTWVzc2FnZSB0b28gb2xkIHRvIHJldHJ5IGRlbGV0ZSBmb3IgZXZlcnlvbmUhJ1xuICAgICk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IG1lc3NhZ2UuZ2V0Q29udmVyc2F0aW9uKCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IENvbnZlcnNhdGlvbiBmb3IgJHttZXNzYWdlSWR9IG1pc3NpbmchYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBqb2JEYXRhOiBDb252ZXJzYXRpb25RdWV1ZUpvYkRhdGEgPSB7XG4gICAgICB0eXBlOiBjb252ZXJzYXRpb25RdWV1ZUpvYkVudW0uZW51bS5EZWxldGVGb3JFdmVyeW9uZSxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb24uaWQsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICByZWNpcGllbnRzOiBjb252ZXJzYXRpb24uZ2V0UmVjaXBpZW50cygpLFxuICAgICAgcmV2aXNpb246IGNvbnZlcnNhdGlvbi5nZXQoJ3JldmlzaW9uJyksXG4gICAgICB0YXJnZXRUaW1lc3RhbXA6IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksXG4gICAgfTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYHJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IEFkZGluZyBqb2IgZm9yIG1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfSFgXG4gICAgKTtcbiAgICBhd2FpdCBjb252ZXJzYXRpb25Kb2JRdWV1ZS5hZGQoam9iRGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ3JldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IEZhaWxlZCB0byBxdWV1ZSBkZWxldGUgZm9yIGV2ZXJ5b25lJyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsVUFBcUI7QUFDckIsYUFBd0I7QUFHeEIsa0NBR087QUFDUCx1QkFBNEI7QUFDNUIsdUJBQW9CO0FBRXBCLHNDQUE2QyxXQUFrQztBQUM3RSxRQUFNLFVBQVUsT0FBTyxrQkFBa0IsUUFBUSxTQUFTO0FBQzFELE1BQUksQ0FBQyxTQUFTO0FBQ1osVUFBTSxJQUFJLE1BQU0sbUNBQW1DLG9CQUFvQjtBQUFBLEVBQ3pFO0FBRUEsTUFBSSxrQ0FBWSxRQUFRLElBQUksU0FBUyxHQUFHLG9CQUFHLEdBQUc7QUFDNUMsVUFBTSxJQUFJLE1BQ1IsdUVBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSTtBQUNGLFVBQU0sZUFBZSxRQUFRLGdCQUFnQjtBQUM3QyxRQUFJLENBQUMsY0FBYztBQUNqQixZQUFNLElBQUksTUFDUiw0Q0FBNEMsb0JBQzlDO0FBQUEsSUFDRjtBQUVBLFVBQU0sVUFBb0M7QUFBQSxNQUN4QyxNQUFNLHFEQUF5QixLQUFLO0FBQUEsTUFDcEMsZ0JBQWdCLGFBQWE7QUFBQSxNQUM3QjtBQUFBLE1BQ0EsWUFBWSxhQUFhLGNBQWM7QUFBQSxNQUN2QyxVQUFVLGFBQWEsSUFBSSxVQUFVO0FBQUEsTUFDckMsaUJBQWlCLFFBQVEsSUFBSSxTQUFTO0FBQUEsSUFDeEM7QUFFQSxRQUFJLEtBQ0Ysa0RBQWtELFFBQVEsYUFBYSxJQUN6RTtBQUNBLFVBQU0saURBQXFCLElBQUksT0FBTztBQUFBLEVBQ3hDLFNBQVMsT0FBUDtBQUNBLFFBQUksTUFDRiwrREFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUNBLFVBQU07QUFBQSxFQUNSO0FBQ0Y7QUF4Q3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
