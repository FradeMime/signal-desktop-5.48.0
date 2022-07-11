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
var ReadSyncs_exports = {};
__export(ReadSyncs_exports, {
  ReadSyncs: () => ReadSyncs
});
module.exports = __toCommonJS(ReadSyncs_exports);
var import_backbone = require("backbone");
var import_message = require("../state/selectors/message");
var import_isMessageUnread = require("../util/isMessageUnread");
var import_notifications = require("../services/notifications");
var log = __toESM(require("../logging/log"));
class ReadSyncModel extends import_backbone.Model {
}
let singleton;
async function maybeItIsAReactionReadSync(sync) {
  const readReaction = await window.Signal.Data.markReactionAsRead(sync.get("senderUuid"), Number(sync.get("timestamp")));
  if (!readReaction) {
    log.info("Nothing found for read sync", sync.get("senderId"), sync.get("sender"), sync.get("senderUuid"), sync.get("timestamp"));
    return;
  }
  import_notifications.notificationService.removeBy({
    conversationId: readReaction.conversationId,
    emoji: readReaction.emoji,
    targetAuthorUuid: readReaction.targetAuthorUuid,
    targetTimestamp: readReaction.targetTimestamp
  });
}
class ReadSyncs extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new ReadSyncs();
    }
    return singleton;
  }
  forMessage(message) {
    const senderId = window.ConversationController.ensureContactIds({
      e164: message.get("source"),
      uuid: message.get("sourceUuid")
    });
    const sync = this.find((item) => {
      return item.get("senderId") === senderId && item.get("timestamp") === message.get("sent_at");
    });
    if (sync) {
      log.info(`Found early read sync for message ${sync.get("timestamp")}`);
      this.remove(sync);
      return sync;
    }
    return null;
  }
  async onSync(sync) {
    try {
      const messages = await window.Signal.Data.getMessagesBySentAt(sync.get("timestamp"));
      const found = messages.find((item) => {
        const senderId = window.ConversationController.ensureContactIds({
          e164: item.source,
          uuid: item.sourceUuid
        });
        return (0, import_message.isIncoming)(item) && senderId === sync.get("senderId");
      });
      if (!found) {
        await maybeItIsAReactionReadSync(sync);
        return;
      }
      import_notifications.notificationService.removeBy({ messageId: found.id });
      const message = window.MessageController.register(found.id, found);
      const readAt = Math.min(sync.get("readAt"), Date.now());
      if ((0, import_isMessageUnread.isMessageUnread)(message.attributes)) {
        message.markRead(readAt, { skipSave: true });
        const updateConversation = /* @__PURE__ */ __name(() => {
          message.getConversation()?.onReadMessage(message, readAt);
        }, "updateConversation");
        if (window.startupProcessingQueue) {
          const conversation = message.getConversation();
          if (conversation) {
            window.startupProcessingQueue.add(conversation.get("id"), message.get("sent_at"), updateConversation);
          }
        } else {
          updateConversation();
        }
      } else {
        const now = Date.now();
        const existingTimestamp = message.get("expirationStartTimestamp");
        const expirationStartTimestamp = Math.min(now, Math.min(existingTimestamp || now, readAt || now));
        message.set({ expirationStartTimestamp });
      }
      window.Signal.Util.queueUpdateMessage(message.attributes);
      this.remove(sync);
    } catch (error) {
      log.error("ReadSyncs.onSync error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadSyncs
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhZFN5bmNzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHsgQ29sbGVjdGlvbiwgTW9kZWwgfSBmcm9tICdiYWNrYm9uZSc7XG5cbmltcG9ydCB0eXBlIHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21lc3NhZ2VzJztcbmltcG9ydCB7IGlzSW5jb21pbmcgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5pbXBvcnQgeyBpc01lc3NhZ2VVbnJlYWQgfSBmcm9tICcuLi91dGlsL2lzTWVzc2FnZVVucmVhZCc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgdHlwZSBSZWFkU3luY0F0dHJpYnV0ZXNUeXBlID0ge1xuICBzZW5kZXJJZDogc3RyaW5nO1xuICBzZW5kZXI/OiBzdHJpbmc7XG4gIHNlbmRlclV1aWQ6IHN0cmluZztcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIHJlYWRBdDogbnVtYmVyO1xufTtcblxuY2xhc3MgUmVhZFN5bmNNb2RlbCBleHRlbmRzIE1vZGVsPFJlYWRTeW5jQXR0cmlidXRlc1R5cGU+IHt9XG5cbmxldCBzaW5nbGV0b246IFJlYWRTeW5jcyB8IHVuZGVmaW5lZDtcblxuYXN5bmMgZnVuY3Rpb24gbWF5YmVJdElzQVJlYWN0aW9uUmVhZFN5bmMoc3luYzogUmVhZFN5bmNNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCByZWFkUmVhY3Rpb24gPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEubWFya1JlYWN0aW9uQXNSZWFkKFxuICAgIHN5bmMuZ2V0KCdzZW5kZXJVdWlkJyksXG4gICAgTnVtYmVyKHN5bmMuZ2V0KCd0aW1lc3RhbXAnKSlcbiAgKTtcblxuICBpZiAoIXJlYWRSZWFjdGlvbikge1xuICAgIGxvZy5pbmZvKFxuICAgICAgJ05vdGhpbmcgZm91bmQgZm9yIHJlYWQgc3luYycsXG4gICAgICBzeW5jLmdldCgnc2VuZGVySWQnKSxcbiAgICAgIHN5bmMuZ2V0KCdzZW5kZXInKSxcbiAgICAgIHN5bmMuZ2V0KCdzZW5kZXJVdWlkJyksXG4gICAgICBzeW5jLmdldCgndGltZXN0YW1wJylcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG5vdGlmaWNhdGlvblNlcnZpY2UucmVtb3ZlQnkoe1xuICAgIGNvbnZlcnNhdGlvbklkOiByZWFkUmVhY3Rpb24uY29udmVyc2F0aW9uSWQsXG4gICAgZW1vamk6IHJlYWRSZWFjdGlvbi5lbW9qaSxcbiAgICB0YXJnZXRBdXRob3JVdWlkOiByZWFkUmVhY3Rpb24udGFyZ2V0QXV0aG9yVXVpZCxcbiAgICB0YXJnZXRUaW1lc3RhbXA6IHJlYWRSZWFjdGlvbi50YXJnZXRUaW1lc3RhbXAsXG4gIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgUmVhZFN5bmNzIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIHN0YXRpYyBnZXRTaW5nbGV0b24oKTogUmVhZFN5bmNzIHtcbiAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgc2luZ2xldG9uID0gbmV3IFJlYWRTeW5jcygpO1xuICAgIH1cblxuICAgIHJldHVybiBzaW5nbGV0b247XG4gIH1cblxuICBmb3JNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCk6IFJlYWRTeW5jTW9kZWwgfCBudWxsIHtcbiAgICBjb25zdCBzZW5kZXJJZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgZTE2NDogbWVzc2FnZS5nZXQoJ3NvdXJjZScpLFxuICAgICAgdXVpZDogbWVzc2FnZS5nZXQoJ3NvdXJjZVV1aWQnKSxcbiAgICB9KTtcbiAgICBjb25zdCBzeW5jID0gdGhpcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaXRlbS5nZXQoJ3NlbmRlcklkJykgPT09IHNlbmRlcklkICYmXG4gICAgICAgIGl0ZW0uZ2V0KCd0aW1lc3RhbXAnKSA9PT0gbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBpZiAoc3luYykge1xuICAgICAgbG9nLmluZm8oYEZvdW5kIGVhcmx5IHJlYWQgc3luYyBmb3IgbWVzc2FnZSAke3N5bmMuZ2V0KCd0aW1lc3RhbXAnKX1gKTtcbiAgICAgIHRoaXMucmVtb3ZlKHN5bmMpO1xuICAgICAgcmV0dXJuIHN5bmM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhc3luYyBvblN5bmMoc3luYzogUmVhZFN5bmNNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRNZXNzYWdlc0J5U2VudEF0KFxuICAgICAgICBzeW5jLmdldCgndGltZXN0YW1wJylcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGZvdW5kID0gbWVzc2FnZXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVySWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgICBlMTY0OiBpdGVtLnNvdXJjZSxcbiAgICAgICAgICB1dWlkOiBpdGVtLnNvdXJjZVV1aWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpc0luY29taW5nKGl0ZW0pICYmIHNlbmRlcklkID09PSBzeW5jLmdldCgnc2VuZGVySWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIGF3YWl0IG1heWJlSXRJc0FSZWFjdGlvblJlYWRTeW5jKHN5bmMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVtb3ZlQnkoeyBtZXNzYWdlSWQ6IGZvdW5kLmlkIH0pO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKGZvdW5kLmlkLCBmb3VuZCk7XG4gICAgICBjb25zdCByZWFkQXQgPSBNYXRoLm1pbihzeW5jLmdldCgncmVhZEF0JyksIERhdGUubm93KCkpO1xuXG4gICAgICAvLyBJZiBtZXNzYWdlIGlzIHVucmVhZCwgd2UgbWFyayBpdCByZWFkLiBPdGhlcndpc2UsIHdlIHVwZGF0ZSB0aGUgZXhwaXJhdGlvblxuICAgICAgLy8gICB0aW1lciB0byB0aGUgdGltZSBzcGVjaWZpZWQgYnkgdGhlIHJlYWQgc3luYyBpZiBpdCdzIGVhcmxpZXIgdGhhblxuICAgICAgLy8gICB0aGUgcHJldmlvdXMgcmVhZCB0aW1lLlxuICAgICAgaWYgKGlzTWVzc2FnZVVucmVhZChtZXNzYWdlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIC8vIFRPRE8gREVTS1RPUC0xNTA5OiB1c2UgTWVzc2FnZVVwZGF0ZXIubWFya1JlYWQgb25jZSB0aGlzIGlzIFRTXG4gICAgICAgIG1lc3NhZ2UubWFya1JlYWQocmVhZEF0LCB7IHNraXBTYXZlOiB0cnVlIH0pO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZUNvbnZlcnNhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAvLyBvblJlYWRNZXNzYWdlIG1heSByZXN1bHQgaW4gbWVzc2FnZXMgb2xkZXIgdGhhbiB0aGlzIG9uZSBiZWluZ1xuICAgICAgICAgIC8vICAgbWFya2VkIHJlYWQuIFdlIHdhbnQgdGhvc2UgbWVzc2FnZXMgdG8gaGF2ZSB0aGUgc2FtZSBleHBpcmUgdGltZXJcbiAgICAgICAgICAvLyAgIHN0YXJ0IHRpbWUgYXMgdGhpcyBvbmUsIHNvIHdlIHBhc3MgdGhlIHJlYWRBdCB2YWx1ZSB0aHJvdWdoLlxuICAgICAgICAgIG1lc3NhZ2UuZ2V0Q29udmVyc2F0aW9uKCk/Lm9uUmVhZE1lc3NhZ2UobWVzc2FnZSwgcmVhZEF0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAod2luZG93LnN0YXJ0dXBQcm9jZXNzaW5nUXVldWUpIHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBtZXNzYWdlLmdldENvbnZlcnNhdGlvbigpO1xuICAgICAgICAgIGlmIChjb252ZXJzYXRpb24pIHtcbiAgICAgICAgICAgIHdpbmRvdy5zdGFydHVwUHJvY2Vzc2luZ1F1ZXVlLmFkZChcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmdldCgnaWQnKSxcbiAgICAgICAgICAgICAgbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgICAgICAgICAgdXBkYXRlQ29udmVyc2F0aW9uXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdUaW1lc3RhbXAgPSBtZXNzYWdlLmdldCgnZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wJyk7XG4gICAgICAgIGNvbnN0IGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCA9IE1hdGgubWluKFxuICAgICAgICAgIG5vdyxcbiAgICAgICAgICBNYXRoLm1pbihleGlzdGluZ1RpbWVzdGFtcCB8fCBub3csIHJlYWRBdCB8fCBub3cpXG4gICAgICAgICk7XG4gICAgICAgIG1lc3NhZ2Uuc2V0KHsgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wIH0pO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuU2lnbmFsLlV0aWwucXVldWVVcGRhdGVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcyk7XG5cbiAgICAgIHRoaXMucmVtb3ZlKHN5bmMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdSZWFkU3luY3Mub25TeW5jIGVycm9yOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxzQkFBa0M7QUFHbEMscUJBQTJCO0FBQzNCLDZCQUFnQztBQUNoQywyQkFBb0M7QUFDcEMsVUFBcUI7QUFVckIsTUFBTSxzQkFBc0Isc0JBQThCO0FBQUM7QUFBM0QsQUFFQSxJQUFJO0FBRUosMENBQTBDLE1BQW9DO0FBQzVFLFFBQU0sZUFBZSxNQUFNLE9BQU8sT0FBTyxLQUFLLG1CQUM1QyxLQUFLLElBQUksWUFBWSxHQUNyQixPQUFPLEtBQUssSUFBSSxXQUFXLENBQUMsQ0FDOUI7QUFFQSxNQUFJLENBQUMsY0FBYztBQUNqQixRQUFJLEtBQ0YsK0JBQ0EsS0FBSyxJQUFJLFVBQVUsR0FDbkIsS0FBSyxJQUFJLFFBQVEsR0FDakIsS0FBSyxJQUFJLFlBQVksR0FDckIsS0FBSyxJQUFJLFdBQVcsQ0FDdEI7QUFDQTtBQUFBLEVBQ0Y7QUFFQSwyQ0FBb0IsU0FBUztBQUFBLElBQzNCLGdCQUFnQixhQUFhO0FBQUEsSUFDN0IsT0FBTyxhQUFhO0FBQUEsSUFDcEIsa0JBQWtCLGFBQWE7QUFBQSxJQUMvQixpQkFBaUIsYUFBYTtBQUFBLEVBQ2hDLENBQUM7QUFDSDtBQXZCZSxBQXlCUixNQUFNLGtCQUFrQiwyQkFBVztBQUFBLFNBQ2pDLGVBQTBCO0FBQy9CLFFBQUksQ0FBQyxXQUFXO0FBQ2Qsa0JBQVksSUFBSSxVQUFVO0FBQUEsSUFDNUI7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsV0FBVyxTQUE2QztBQUN0RCxV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
