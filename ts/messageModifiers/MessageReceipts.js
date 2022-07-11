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
var MessageReceipts_exports = {};
__export(MessageReceipts_exports, {
  MessageReceiptType: () => MessageReceiptType,
  MessageReceipts: () => MessageReceipts
});
module.exports = __toCommonJS(MessageReceipts_exports);
var import_lodash = require("lodash");
var import_backbone = require("backbone");
var import_message = require("../state/selectors/message");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_getOwn = require("../util/getOwn");
var import_missingCaseError = require("../util/missingCaseError");
var import_waitBatcher = require("../util/waitBatcher");
var import_MessageSendState = require("../messages/MessageSendState");
var import_Client = __toESM(require("../sql/Client"));
var log = __toESM(require("../logging/log"));
const { deleteSentProtoRecipient } = import_Client.default;
var MessageReceiptType = /* @__PURE__ */ ((MessageReceiptType2) => {
  MessageReceiptType2["Delivery"] = "Delivery";
  MessageReceiptType2["Read"] = "Read";
  MessageReceiptType2["View"] = "View";
  return MessageReceiptType2;
})(MessageReceiptType || {});
class MessageReceiptModel extends import_backbone.Model {
}
let singleton;
const deleteSentProtoBatcher = (0, import_waitBatcher.createWaitBatcher)({
  name: "deleteSentProtoBatcher",
  wait: 250,
  maxSize: 30,
  async processBatch(items) {
    log.info(`MessageReceipts: Batching ${items.length} sent proto recipients deletes`);
    await deleteSentProtoRecipient(items);
  }
});
async function getTargetMessage(sourceId, sourceUuid, messages) {
  if (messages.length === 0) {
    return null;
  }
  const message = messages.find((item) => ((0, import_message.isOutgoing)(item) || (0, import_message.isStory)(item)) && sourceId === item.conversationId);
  if (message) {
    return window.MessageController.register(message.id, message);
  }
  const groups = await window.Signal.Data.getAllGroupsInvolvingUuid(sourceUuid);
  const ids = groups.map((item) => item.id);
  ids.push(sourceId);
  const target = messages.find((item) => ((0, import_message.isOutgoing)(item) || (0, import_message.isStory)(item)) && ids.includes(item.conversationId));
  if (!target) {
    return null;
  }
  return window.MessageController.register(target.id, target);
}
const wasDeliveredWithSealedSender = /* @__PURE__ */ __name((conversationId, message) => (message.get("unidentifiedDeliveries") || []).some((identifier) => window.ConversationController.getConversationId(identifier) === conversationId), "wasDeliveredWithSealedSender");
class MessageReceipts extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new MessageReceipts();
    }
    return singleton;
  }
  forMessage(conversation, message) {
    if (!(0, import_message.isOutgoing)(message.attributes)) {
      return [];
    }
    let ids;
    if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
      ids = [conversation.id];
    } else {
      ids = conversation.getMemberIds();
    }
    const receipts = this.filter((receipt) => receipt.get("messageSentAt") === message.get("sent_at") && ids.includes(receipt.get("sourceConversationId")));
    if (receipts.length) {
      log.info("Found early receipts for message");
      this.remove(receipts);
    }
    return receipts;
  }
  async onReceipt(receipt) {
    const type = receipt.get("type");
    const messageSentAt = receipt.get("messageSentAt");
    const receiptTimestamp = receipt.get("receiptTimestamp");
    const sourceConversationId = receipt.get("sourceConversationId");
    const sourceUuid = receipt.get("sourceUuid");
    try {
      const messages = await window.Signal.Data.getMessagesBySentAt(messageSentAt);
      const message = await getTargetMessage(sourceConversationId, sourceUuid, messages);
      if (!message) {
        log.info("No message for receipt", type, sourceConversationId, messageSentAt);
        return;
      }
      const oldSendStateByConversationId = message.get("sendStateByConversationId") || {};
      const oldSendState = (0, import_getOwn.getOwn)(oldSendStateByConversationId, sourceConversationId) ?? { status: import_MessageSendState.SendStatus.Sent, updatedAt: void 0 };
      let sendActionType;
      switch (type) {
        case "Delivery" /* Delivery */:
          sendActionType = import_MessageSendState.SendActionType.GotDeliveryReceipt;
          break;
        case "Read" /* Read */:
          sendActionType = import_MessageSendState.SendActionType.GotReadReceipt;
          break;
        case "View" /* View */:
          sendActionType = import_MessageSendState.SendActionType.GotViewedReceipt;
          break;
        default:
          throw (0, import_missingCaseError.missingCaseError)(type);
      }
      const newSendState = (0, import_MessageSendState.sendStateReducer)(oldSendState, {
        type: sendActionType,
        updatedAt: receiptTimestamp
      });
      if (!(0, import_lodash.isEqual)(oldSendState, newSendState)) {
        message.set("sendStateByConversationId", {
          ...oldSendStateByConversationId,
          [sourceConversationId]: newSendState
        });
        window.Signal.Util.queueUpdateMessage(message.attributes);
        const conversation = window.ConversationController.get(message.get("conversationId"));
        const updateLeftPane = conversation ? conversation.debouncedUpdateLastMessage : void 0;
        if (updateLeftPane) {
          updateLeftPane();
        }
      }
      if (type === "Delivery" /* Delivery */ && wasDeliveredWithSealedSender(sourceConversationId, message) || type === "Read" /* Read */) {
        const recipient = window.ConversationController.get(sourceConversationId);
        const recipientUuid = recipient?.get("uuid");
        const deviceId = receipt.get("sourceDevice");
        if (recipientUuid && deviceId) {
          await deleteSentProtoBatcher.add({
            timestamp: messageSentAt,
            recipientUuid,
            deviceId
          });
        } else {
          log.warn(`MessageReceipts.onReceipt: Missing uuid or deviceId for deliveredTo ${sourceConversationId}`);
        }
      }
      this.remove(receipt);
    } catch (error) {
      log.error("MessageReceipts.onReceipt error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageReceiptType,
  MessageReceipts
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlY2VpcHRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uLCBNb2RlbCB9IGZyb20gJ2JhY2tib25lJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21lc3NhZ2VzJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBpc091dGdvaW5nLCBpc1N0b3J5IH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL21lc3NhZ2UnO1xuaW1wb3J0IHsgaXNEaXJlY3RDb252ZXJzYXRpb24gfSBmcm9tICcuLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0T3duIH0gZnJvbSAnLi4vdXRpbC9nZXRPd24nO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgeyBjcmVhdGVXYWl0QmF0Y2hlciB9IGZyb20gJy4uL3V0aWwvd2FpdEJhdGNoZXInO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHtcbiAgU2VuZEFjdGlvblR5cGUsXG4gIFNlbmRTdGF0dXMsXG4gIHNlbmRTdGF0ZVJlZHVjZXIsXG59IGZyb20gJy4uL21lc3NhZ2VzL01lc3NhZ2VTZW5kU3RhdGUnO1xuaW1wb3J0IHR5cGUgeyBEZWxldGVTZW50UHJvdG9SZWNpcGllbnRPcHRpb25zVHlwZSB9IGZyb20gJy4uL3NxbC9JbnRlcmZhY2UnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5jb25zdCB7IGRlbGV0ZVNlbnRQcm90b1JlY2lwaWVudCB9ID0gZGF0YUludGVyZmFjZTtcblxuZXhwb3J0IGVudW0gTWVzc2FnZVJlY2VpcHRUeXBlIHtcbiAgRGVsaXZlcnkgPSAnRGVsaXZlcnknLFxuICBSZWFkID0gJ1JlYWQnLFxuICBWaWV3ID0gJ1ZpZXcnLFxufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlUmVjZWlwdEF0dHJpYnV0ZXNUeXBlID0ge1xuICBtZXNzYWdlU2VudEF0OiBudW1iZXI7XG4gIHJlY2VpcHRUaW1lc3RhbXA6IG51bWJlcjtcbiAgc291cmNlVXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIHNvdXJjZUNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIHNvdXJjZURldmljZTogbnVtYmVyO1xuICB0eXBlOiBNZXNzYWdlUmVjZWlwdFR5cGU7XG59O1xuXG5jbGFzcyBNZXNzYWdlUmVjZWlwdE1vZGVsIGV4dGVuZHMgTW9kZWw8TWVzc2FnZVJlY2VpcHRBdHRyaWJ1dGVzVHlwZT4ge31cblxubGV0IHNpbmdsZXRvbjogTWVzc2FnZVJlY2VpcHRzIHwgdW5kZWZpbmVkO1xuXG5jb25zdCBkZWxldGVTZW50UHJvdG9CYXRjaGVyID0gY3JlYXRlV2FpdEJhdGNoZXIoe1xuICBuYW1lOiAnZGVsZXRlU2VudFByb3RvQmF0Y2hlcicsXG4gIHdhaXQ6IDI1MCxcbiAgbWF4U2l6ZTogMzAsXG4gIGFzeW5jIHByb2Nlc3NCYXRjaChpdGVtczogQXJyYXk8RGVsZXRlU2VudFByb3RvUmVjaXBpZW50T3B0aW9uc1R5cGU+KSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgTWVzc2FnZVJlY2VpcHRzOiBCYXRjaGluZyAke2l0ZW1zLmxlbmd0aH0gc2VudCBwcm90byByZWNpcGllbnRzIGRlbGV0ZXNgXG4gICAgKTtcbiAgICBhd2FpdCBkZWxldGVTZW50UHJvdG9SZWNpcGllbnQoaXRlbXMpO1xuICB9LFxufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFRhcmdldE1lc3NhZ2UoXG4gIHNvdXJjZUlkOiBzdHJpbmcsXG4gIHNvdXJjZVV1aWQ6IFVVSURTdHJpbmdUeXBlLFxuICBtZXNzYWdlczogUmVhZG9ubHlBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+XG4pOiBQcm9taXNlPE1lc3NhZ2VNb2RlbCB8IG51bGw+IHtcbiAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlcy5maW5kKFxuICAgIGl0ZW0gPT5cbiAgICAgIChpc091dGdvaW5nKGl0ZW0pIHx8IGlzU3RvcnkoaXRlbSkpICYmIHNvdXJjZUlkID09PSBpdGVtLmNvbnZlcnNhdGlvbklkXG4gICk7XG4gIGlmIChtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihtZXNzYWdlLmlkLCBtZXNzYWdlKTtcbiAgfVxuXG4gIGNvbnN0IGdyb3VwcyA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRBbGxHcm91cHNJbnZvbHZpbmdVdWlkKHNvdXJjZVV1aWQpO1xuXG4gIGNvbnN0IGlkcyA9IGdyb3Vwcy5tYXAoaXRlbSA9PiBpdGVtLmlkKTtcbiAgaWRzLnB1c2goc291cmNlSWQpO1xuXG4gIGNvbnN0IHRhcmdldCA9IG1lc3NhZ2VzLmZpbmQoXG4gICAgaXRlbSA9PlxuICAgICAgKGlzT3V0Z29pbmcoaXRlbSkgfHwgaXNTdG9yeShpdGVtKSkgJiYgaWRzLmluY2x1ZGVzKGl0ZW0uY29udmVyc2F0aW9uSWQpXG4gICk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKHRhcmdldC5pZCwgdGFyZ2V0KTtcbn1cblxuY29uc3Qgd2FzRGVsaXZlcmVkV2l0aFNlYWxlZFNlbmRlciA9IChcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgbWVzc2FnZTogTWVzc2FnZU1vZGVsXG4pOiBib29sZWFuID0+XG4gIChtZXNzYWdlLmdldCgndW5pZGVudGlmaWVkRGVsaXZlcmllcycpIHx8IFtdKS5zb21lKFxuICAgIGlkZW50aWZpZXIgPT5cbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldENvbnZlcnNhdGlvbklkKGlkZW50aWZpZXIpID09PVxuICAgICAgY29udmVyc2F0aW9uSWRcbiAgKTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VSZWNlaXB0cyBleHRlbmRzIENvbGxlY3Rpb248TWVzc2FnZVJlY2VpcHRNb2RlbD4ge1xuICBzdGF0aWMgZ2V0U2luZ2xldG9uKCk6IE1lc3NhZ2VSZWNlaXB0cyB7XG4gICAgaWYgKCFzaW5nbGV0b24pIHtcbiAgICAgIHNpbmdsZXRvbiA9IG5ldyBNZXNzYWdlUmVjZWlwdHMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2luZ2xldG9uO1xuICB9XG5cbiAgZm9yTWVzc2FnZShcbiAgICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsLFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbFxuICApOiBBcnJheTxNZXNzYWdlUmVjZWlwdE1vZGVsPiB7XG4gICAgaWYgKCFpc091dGdvaW5nKG1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgbGV0IGlkczogQXJyYXk8c3RyaW5nPjtcbiAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBpZHMgPSBbY29udmVyc2F0aW9uLmlkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWRzID0gY29udmVyc2F0aW9uLmdldE1lbWJlcklkcygpO1xuICAgIH1cbiAgICBjb25zdCByZWNlaXB0cyA9IHRoaXMuZmlsdGVyKFxuICAgICAgcmVjZWlwdCA9PlxuICAgICAgICByZWNlaXB0LmdldCgnbWVzc2FnZVNlbnRBdCcpID09PSBtZXNzYWdlLmdldCgnc2VudF9hdCcpICYmXG4gICAgICAgIGlkcy5pbmNsdWRlcyhyZWNlaXB0LmdldCgnc291cmNlQ29udmVyc2F0aW9uSWQnKSlcbiAgICApO1xuICAgIGlmIChyZWNlaXB0cy5sZW5ndGgpIHtcbiAgICAgIGxvZy5pbmZvKCdGb3VuZCBlYXJseSByZWNlaXB0cyBmb3IgbWVzc2FnZScpO1xuICAgICAgdGhpcy5yZW1vdmUocmVjZWlwdHMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVjZWlwdHM7XG4gIH1cblxuICBhc3luYyBvblJlY2VpcHQocmVjZWlwdDogTWVzc2FnZVJlY2VpcHRNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHR5cGUgPSByZWNlaXB0LmdldCgndHlwZScpO1xuICAgIGNvbnN0IG1lc3NhZ2VTZW50QXQgPSByZWNlaXB0LmdldCgnbWVzc2FnZVNlbnRBdCcpO1xuICAgIGNvbnN0IHJlY2VpcHRUaW1lc3RhbXAgPSByZWNlaXB0LmdldCgncmVjZWlwdFRpbWVzdGFtcCcpO1xuICAgIGNvbnN0IHNvdXJjZUNvbnZlcnNhdGlvbklkID0gcmVjZWlwdC5nZXQoJ3NvdXJjZUNvbnZlcnNhdGlvbklkJyk7XG4gICAgY29uc3Qgc291cmNlVXVpZCA9IHJlY2VpcHQuZ2V0KCdzb3VyY2VVdWlkJyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNCeVNlbnRBdChcbiAgICAgICAgbWVzc2FnZVNlbnRBdFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldFRhcmdldE1lc3NhZ2UoXG4gICAgICAgIHNvdXJjZUNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzb3VyY2VVdWlkLFxuICAgICAgICBtZXNzYWdlc1xuICAgICAgKTtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnTm8gbWVzc2FnZSBmb3IgcmVjZWlwdCcsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBzb3VyY2VDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBtZXNzYWdlU2VudEF0XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2xkU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCA9XG4gICAgICAgIG1lc3NhZ2UuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge307XG4gICAgICBjb25zdCBvbGRTZW5kU3RhdGUgPSBnZXRPd24oXG4gICAgICAgIG9sZFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNvdXJjZUNvbnZlcnNhdGlvbklkXG4gICAgICApID8/IHsgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsIHVwZGF0ZWRBdDogdW5kZWZpbmVkIH07XG5cbiAgICAgIGxldCBzZW5kQWN0aW9uVHlwZTogU2VuZEFjdGlvblR5cGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBNZXNzYWdlUmVjZWlwdFR5cGUuRGVsaXZlcnk6XG4gICAgICAgICAgc2VuZEFjdGlvblR5cGUgPSBTZW5kQWN0aW9uVHlwZS5Hb3REZWxpdmVyeVJlY2VpcHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTWVzc2FnZVJlY2VpcHRUeXBlLlJlYWQ6XG4gICAgICAgICAgc2VuZEFjdGlvblR5cGUgPSBTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNZXNzYWdlUmVjZWlwdFR5cGUuVmlldzpcbiAgICAgICAgICBzZW5kQWN0aW9uVHlwZSA9IFNlbmRBY3Rpb25UeXBlLkdvdFZpZXdlZFJlY2VpcHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih0eXBlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3U2VuZFN0YXRlID0gc2VuZFN0YXRlUmVkdWNlcihvbGRTZW5kU3RhdGUsIHtcbiAgICAgICAgdHlwZTogc2VuZEFjdGlvblR5cGUsXG4gICAgICAgIHVwZGF0ZWRBdDogcmVjZWlwdFRpbWVzdGFtcCxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUaGUgc2VuZCBzdGF0ZSBtYXkgbm90IGNoYW5nZS4gRm9yIGV4YW1wbGUsIHRoaXMgY2FuIGhhcHBlbiBpZiB3ZSBnZXQgYSByZWFkXG4gICAgICAvLyAgIHJlY2VpcHQgYmVmb3JlIGEgZGVsaXZlcnkgcmVjZWlwdC5cbiAgICAgIGlmICghaXNFcXVhbChvbGRTZW5kU3RhdGUsIG5ld1NlbmRTdGF0ZSkpIHtcbiAgICAgICAgbWVzc2FnZS5zZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnLCB7XG4gICAgICAgICAgLi4ub2xkU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBbc291cmNlQ29udmVyc2F0aW9uSWRdOiBuZXdTZW5kU3RhdGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5xdWV1ZVVwZGF0ZU1lc3NhZ2UobWVzc2FnZS5hdHRyaWJ1dGVzKTtcblxuICAgICAgICAvLyBub3RpZnkgZnJvbnRlbmQgbGlzdGVuZXJzXG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChcbiAgICAgICAgICBtZXNzYWdlLmdldCgnY29udmVyc2F0aW9uSWQnKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB1cGRhdGVMZWZ0UGFuZSA9IGNvbnZlcnNhdGlvblxuICAgICAgICAgID8gY29udmVyc2F0aW9uLmRlYm91bmNlZFVwZGF0ZUxhc3RNZXNzYWdlXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh1cGRhdGVMZWZ0UGFuZSkge1xuICAgICAgICAgIHVwZGF0ZUxlZnRQYW5lKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAodHlwZSA9PT0gTWVzc2FnZVJlY2VpcHRUeXBlLkRlbGl2ZXJ5ICYmXG4gICAgICAgICAgd2FzRGVsaXZlcmVkV2l0aFNlYWxlZFNlbmRlcihzb3VyY2VDb252ZXJzYXRpb25JZCwgbWVzc2FnZSkpIHx8XG4gICAgICAgIHR5cGUgPT09IE1lc3NhZ2VSZWNlaXB0VHlwZS5SZWFkXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50ID1cbiAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoc291cmNlQ29udmVyc2F0aW9uSWQpO1xuICAgICAgICBjb25zdCByZWNpcGllbnRVdWlkID0gcmVjaXBpZW50Py5nZXQoJ3V1aWQnKTtcbiAgICAgICAgY29uc3QgZGV2aWNlSWQgPSByZWNlaXB0LmdldCgnc291cmNlRGV2aWNlJyk7XG5cbiAgICAgICAgaWYgKHJlY2lwaWVudFV1aWQgJiYgZGV2aWNlSWQpIHtcbiAgICAgICAgICBhd2FpdCBkZWxldGVTZW50UHJvdG9CYXRjaGVyLmFkZCh7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VTZW50QXQsXG4gICAgICAgICAgICByZWNpcGllbnRVdWlkLFxuICAgICAgICAgICAgZGV2aWNlSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgTWVzc2FnZVJlY2VpcHRzLm9uUmVjZWlwdDogTWlzc2luZyB1dWlkIG9yIGRldmljZUlkIGZvciBkZWxpdmVyZWRUbyAke3NvdXJjZUNvbnZlcnNhdGlvbklkfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVtb3ZlKHJlY2VpcHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdNZXNzYWdlUmVjZWlwdHMub25SZWNlaXB0IGVycm9yOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLG9CQUF3QjtBQUN4QixzQkFBa0M7QUFLbEMscUJBQW9DO0FBQ3BDLG9DQUFxQztBQUNyQyxvQkFBdUI7QUFDdkIsOEJBQWlDO0FBQ2pDLHlCQUFrQztBQUVsQyw4QkFJTztBQUVQLG9CQUEwQjtBQUMxQixVQUFxQjtBQUVyQixNQUFNLEVBQUUsNkJBQTZCO0FBRTlCLElBQUsscUJBQUwsa0JBQUssd0JBQUw7QUFDTCxvQ0FBVztBQUNYLGdDQUFPO0FBQ1AsZ0NBQU87QUFIRztBQUFBO0FBZVosTUFBTSw0QkFBNEIsc0JBQW9DO0FBQUM7QUFBdkUsQUFFQSxJQUFJO0FBRUosTUFBTSx5QkFBeUIsMENBQWtCO0FBQUEsRUFDL0MsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLFFBQ0gsYUFBYSxPQUFtRDtBQUNwRSxRQUFJLEtBQ0YsNkJBQTZCLE1BQU0sc0NBQ3JDO0FBQ0EsVUFBTSx5QkFBeUIsS0FBSztBQUFBLEVBQ3RDO0FBQ0YsQ0FBQztBQUVELGdDQUNFLFVBQ0EsWUFDQSxVQUM4QjtBQUM5QixNQUFJLFNBQVMsV0FBVyxHQUFHO0FBQ3pCLFdBQU87QUFBQSxFQUNUO0FBQ0EsUUFBTSxVQUFVLFNBQVMsS0FDdkIsVUFDRyxnQ0FBVyxJQUFJLEtBQUssNEJBQVEsSUFBSSxNQUFNLGFBQWEsS0FB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
