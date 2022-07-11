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
var MessageRequests_exports = {};
__export(MessageRequests_exports, {
  MessageRequests: () => MessageRequests
});
module.exports = __toCommonJS(MessageRequests_exports);
var import_backbone = require("backbone");
var log = __toESM(require("../logging/log"));
class MessageRequestModel extends import_backbone.Model {
}
let singleton;
class MessageRequests extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new MessageRequests();
    }
    return singleton;
  }
  forConversation(conversation) {
    if (conversation.get("e164")) {
      const syncByE164 = this.findWhere({
        threadE164: conversation.get("e164")
      });
      if (syncByE164) {
        log.info(`Found early message request response for E164 ${conversation.idForLogging()}`);
        this.remove(syncByE164);
        return syncByE164;
      }
    }
    if (conversation.get("uuid")) {
      const syncByUuid = this.findWhere({
        threadUuid: conversation.get("uuid")
      });
      if (syncByUuid) {
        log.info(`Found early message request response for UUID ${conversation.idForLogging()}`);
        this.remove(syncByUuid);
        return syncByUuid;
      }
    }
    if (conversation.get("groupId")) {
      const syncByGroupId = this.findWhere({
        groupId: conversation.get("groupId")
      });
      if (syncByGroupId) {
        log.info(`Found early message request response for group v1 ID ${conversation.idForLogging()}`);
        this.remove(syncByGroupId);
        return syncByGroupId;
      }
    }
    if (conversation.get("groupId")) {
      const syncByGroupId = this.findWhere({
        groupV2Id: conversation.get("groupId")
      });
      if (syncByGroupId) {
        log.info(`Found early message request response for group v2 ID ${conversation.idForLogging()}`);
        this.remove(syncByGroupId);
        return syncByGroupId;
      }
    }
    return null;
  }
  async onResponse(sync) {
    try {
      const threadE164 = sync.get("threadE164");
      const threadUuid = sync.get("threadUuid");
      const groupId = sync.get("groupId");
      const groupV2Id = sync.get("groupV2Id");
      let conversation;
      if (groupV2Id) {
        conversation = window.ConversationController.get(groupV2Id);
      }
      if (!conversation && groupId) {
        conversation = window.ConversationController.get(groupId);
      }
      if (!conversation && (threadE164 || threadUuid)) {
        conversation = window.ConversationController.get(window.ConversationController.ensureContactIds({
          e164: threadE164,
          uuid: threadUuid
        }));
      }
      if (!conversation) {
        log.warn(`Received message request response for unknown conversation: groupv2(${groupV2Id}) group(${groupId}) ${threadUuid} ${threadE164}`);
        return;
      }
      conversation.applyMessageRequestResponse(sync.get("type"), {
        fromSync: true
      });
      this.remove(sync);
    } catch (error) {
      log.error("MessageRequests.onResponse error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageRequests
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlcXVlc3RzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHsgQ29sbGVjdGlvbiwgTW9kZWwgfSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgTWVzc2FnZVJlcXVlc3RBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgdGhyZWFkRTE2ND86IHN0cmluZztcbiAgdGhyZWFkVXVpZD86IHN0cmluZztcbiAgZ3JvdXBJZD86IHN0cmluZztcbiAgZ3JvdXBWMklkPzogc3RyaW5nO1xuICB0eXBlOiBudW1iZXI7XG59O1xuXG5jbGFzcyBNZXNzYWdlUmVxdWVzdE1vZGVsIGV4dGVuZHMgTW9kZWw8TWVzc2FnZVJlcXVlc3RBdHRyaWJ1dGVzVHlwZT4ge31cblxubGV0IHNpbmdsZXRvbjogTWVzc2FnZVJlcXVlc3RzIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVJlcXVlc3RzIGV4dGVuZHMgQ29sbGVjdGlvbjxNZXNzYWdlUmVxdWVzdE1vZGVsPiB7XG4gIHN0YXRpYyBnZXRTaW5nbGV0b24oKTogTWVzc2FnZVJlcXVlc3RzIHtcbiAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgc2luZ2xldG9uID0gbmV3IE1lc3NhZ2VSZXF1ZXN0cygpO1xuICAgIH1cblxuICAgIHJldHVybiBzaW5nbGV0b247XG4gIH1cblxuICBmb3JDb252ZXJzYXRpb24oY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCk6IE1lc3NhZ2VSZXF1ZXN0TW9kZWwgfCBudWxsIHtcbiAgICBpZiAoY29udmVyc2F0aW9uLmdldCgnZTE2NCcpKSB7XG4gICAgICBjb25zdCBzeW5jQnlFMTY0ID0gdGhpcy5maW5kV2hlcmUoe1xuICAgICAgICB0aHJlYWRFMTY0OiBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JyksXG4gICAgICB9KTtcbiAgICAgIGlmIChzeW5jQnlFMTY0KSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBGb3VuZCBlYXJseSBtZXNzYWdlIHJlcXVlc3QgcmVzcG9uc2UgZm9yIEUxNjQgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlbW92ZShzeW5jQnlFMTY0KTtcbiAgICAgICAgcmV0dXJuIHN5bmNCeUUxNjQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSkge1xuICAgICAgY29uc3Qgc3luY0J5VXVpZCA9IHRoaXMuZmluZFdoZXJlKHtcbiAgICAgICAgdGhyZWFkVXVpZDogY29udmVyc2F0aW9uLmdldCgndXVpZCcpLFxuICAgICAgfSk7XG4gICAgICBpZiAoc3luY0J5VXVpZCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgRm91bmQgZWFybHkgbWVzc2FnZSByZXF1ZXN0IHJlc3BvbnNlIGZvciBVVUlEICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZW1vdmUoc3luY0J5VXVpZCk7XG4gICAgICAgIHJldHVybiBzeW5jQnlVdWlkO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFYxIEdyb3VwXG4gICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ2dyb3VwSWQnKSkge1xuICAgICAgY29uc3Qgc3luY0J5R3JvdXBJZCA9IHRoaXMuZmluZFdoZXJlKHtcbiAgICAgICAgZ3JvdXBJZDogY29udmVyc2F0aW9uLmdldCgnZ3JvdXBJZCcpLFxuICAgICAgfSk7XG4gICAgICBpZiAoc3luY0J5R3JvdXBJZCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgRm91bmQgZWFybHkgbWVzc2FnZSByZXF1ZXN0IHJlc3BvbnNlIGZvciBncm91cCB2MSBJRCAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVtb3ZlKHN5bmNCeUdyb3VwSWQpO1xuICAgICAgICByZXR1cm4gc3luY0J5R3JvdXBJZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWMiBncm91cFxuICAgIGlmIChjb252ZXJzYXRpb24uZ2V0KCdncm91cElkJykpIHtcbiAgICAgIGNvbnN0IHN5bmNCeUdyb3VwSWQgPSB0aGlzLmZpbmRXaGVyZSh7XG4gICAgICAgIGdyb3VwVjJJZDogY29udmVyc2F0aW9uLmdldCgnZ3JvdXBJZCcpLFxuICAgICAgfSk7XG4gICAgICBpZiAoc3luY0J5R3JvdXBJZCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgRm91bmQgZWFybHkgbWVzc2FnZSByZXF1ZXN0IHJlc3BvbnNlIGZvciBncm91cCB2MiBJRCAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVtb3ZlKHN5bmNCeUdyb3VwSWQpO1xuICAgICAgICByZXR1cm4gc3luY0J5R3JvdXBJZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIG9uUmVzcG9uc2Uoc3luYzogTWVzc2FnZVJlcXVlc3RNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0aHJlYWRFMTY0ID0gc3luYy5nZXQoJ3RocmVhZEUxNjQnKTtcbiAgICAgIGNvbnN0IHRocmVhZFV1aWQgPSBzeW5jLmdldCgndGhyZWFkVXVpZCcpO1xuICAgICAgY29uc3QgZ3JvdXBJZCA9IHN5bmMuZ2V0KCdncm91cElkJyk7XG4gICAgICBjb25zdCBncm91cFYySWQgPSBzeW5jLmdldCgnZ3JvdXBWMklkJyk7XG5cbiAgICAgIGxldCBjb252ZXJzYXRpb247XG5cbiAgICAgIC8vIFdlIG11bHRpcGxleCBiZXR3ZWVuIEdWMS9HVjIgZ3JvdXBzIGhlcmUsIGJ1dCB3ZSBkb24ndCBraWNrIG9mZiBtaWdyYXRpb25zXG4gICAgICBpZiAoZ3JvdXBWMklkKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChncm91cFYySWQpO1xuICAgICAgfVxuICAgICAgaWYgKCFjb252ZXJzYXRpb24gJiYgZ3JvdXBJZCkge1xuICAgICAgICBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoZ3JvdXBJZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbiAmJiAodGhyZWFkRTE2NCB8fCB0aHJlYWRVdWlkKSkge1xuICAgICAgICBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoXG4gICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgICAgICBlMTY0OiB0aHJlYWRFMTY0LFxuICAgICAgICAgICAgdXVpZDogdGhyZWFkVXVpZCxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgUmVjZWl2ZWQgbWVzc2FnZSByZXF1ZXN0IHJlc3BvbnNlIGZvciB1bmtub3duIGNvbnZlcnNhdGlvbjogZ3JvdXB2Migke2dyb3VwVjJJZH0pIGdyb3VwKCR7Z3JvdXBJZH0pICR7dGhyZWFkVXVpZH0gJHt0aHJlYWRFMTY0fWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb252ZXJzYXRpb24uYXBwbHlNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKHN5bmMuZ2V0KCd0eXBlJyksIHtcbiAgICAgICAgZnJvbVN5bmM6IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZW1vdmUoc3luYyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ01lc3NhZ2VSZXF1ZXN0cy5vblJlc3BvbnNlIGVycm9yOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxzQkFBa0M7QUFFbEMsVUFBcUI7QUFVckIsTUFBTSw0QkFBNEIsc0JBQW9DO0FBQUM7QUFBdkUsQUFFQSxJQUFJO0FBRUcsTUFBTSx3QkFBd0IsMkJBQWdDO0FBQUEsU0FDNUQsZUFBZ0M7QUFDckMsUUFBSSxDQUFDLFdBQVc7QUFDZCxrQkFBWSxJQUFJLGdCQUFnQjtBQUFBLElBQ2xDO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLGdCQUFnQixjQUE2RDtBQUMzRSxRQUFJLGFBQWEsSUFBSSxNQUFNLEdBQUc7QUFDNUIsWUFBTSxhQUFhLEtBQUssVUFBVTtBQUFBLFFBQ2hDLFlBQVksYUFBYSxJQUFJLE1BQU07QUFBQSxNQUNyQyxDQUFDO0FBQ0QsVUFBSSxZQUFZO0FBQ2QsWUFBSSxLQUNGLGlEQUFpRCxhQUFhLGFBQWEsR0FDN0U7QUFDQSxhQUFLLE9BQU8sVUFBVTtBQUN0QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxRQUFJLGFBQWEsSUFBSSxNQUFNLEdBQUc7QUFDNUIsWUFBTSxhQUFhLEtBQUssVUFBVTtBQUFBLFFBQ2hDLFlBQVksYUFBYSxJQUFJLE1BQU07QUFBQSxNQUNyQyxDQUFDO0FBQ0QsVUFBSSxZQUFZO0FBQ2QsWUFBSSxLQUNGLGlEQUFpRCxhQUFhLGFBQWEsR0FDN0U7QUFDQSxhQUFLLE9BQU8sVUFBVTtBQUN0QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFHQSxRQUFJLGFBQWEsSUFBSSxTQUFTLEdBQUc7QUFDL0IsWUFBTSxnQkFBZ0IsS0FBSyxVQUFVO0FBQUEsUUFDbkMsU0FBUyxhQUFhLElBQUksU0FBUztBQUFBLE1BQ3JDLENBQUM7QUFDRCxVQUFJLGVBQWU7QUFDakIsWUFBSSxLQUNGLHdEQUF3RCxhQUFhLGFBQWEsR0FDcEY7QUFDQSxhQUFLLE9BQU8sYUFBYTtBQUN6QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFHQSxRQUFJLGFBQWEsSUFBSSxTQUFTLEdBQUc7QUFDL0IsWUFBTSxnQkFBZ0IsS0FBSyxVQUFVO0FBQUEsUUFDbkMsV0FBVyxhQUFhLElBQUksU0FBUztBQUFBLE1BQ3ZDLENBQUM7QUFDRCxVQUFJLGVBQWU7QUFDakIsWUFBSSxLQUNGLHdEQUF3RCxhQUFhLGFBQWEsR0FDcEY7QUFDQSxhQUFLLE9BQU8sYUFBYTtBQUN6QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLFFBRU0sV0FBVyxNQUEwQztBQUN6RCxRQUFJO0FBQ0YsWUFBTSxhQUFhLEtBQUssSUFBSSxZQUFZO0FBQ3hDLFlBQU0sYUFBYSxLQUFLLElBQUksWUFBWTtBQUN4QyxZQUFNLFVBQVUsS0FBSyxJQUFJLFNBQVM7QUFDbEMsWUFBTSxZQUFZLEtBQUssSUFBSSxXQUFXO0FBRXRDLFVBQUk7QUFHSixVQUFJLFdBQVc7QUFDYix1QkFBZSxPQUFPLHVCQUF1QixJQUFJLFNBQVM7QUFBQSxNQUM1RDtBQUNBLFVBQUksQ0FBQyxnQkFBZ0IsU0FBUztBQUM1Qix1QkFBZSxPQUFPLHVCQUF1QixJQUFJLE9BQU87QUFBQSxNQUMxRDtBQUNBLFVBQUksQ0FBQyxnQkFBaUIsZUFBYyxhQUFhO0FBQy9DLHVCQUFlLE9BQU8sdUJBQXVCLElBQzNDLE9BQU8sdUJBQXVCLGlCQUFpQjtBQUFBLFVBQzdDLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSLENBQUMsQ0FDSDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsY0FBYztBQUNqQixZQUFJLEtBQ0YsdUVBQXVFLG9CQUFvQixZQUFZLGNBQWMsWUFDdkg7QUFDQTtBQUFBLE1BQ0Y7QUFFQSxtQkFBYSw0QkFBNEIsS0FBSyxJQUFJLE1BQU0sR0FBRztBQUFBLFFBQ3pELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFFRCxXQUFLLE9BQU8sSUFBSTtBQUFBLElBQ2xCLFNBQVMsT0FBUDtBQUNBLFVBQUksTUFDRixxQ0FDQSxTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVEsS0FDdkM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBL0dPIiwKICAibmFtZXMiOiBbXQp9Cg==
