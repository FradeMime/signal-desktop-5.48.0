var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sendReceipts_exports = {};
__export(sendReceipts_exports, {
  sendReceipts: () => sendReceipts
});
module.exports = __toCommonJS(sendReceipts_exports);
var import_lodash = require("lodash");
var import_Receipt = require("../types/Receipt");
var import_getSendOptions = require("./getSendOptions");
var import_handleMessageSend = require("./handleMessageSend");
var import_isConversationAccepted = require("./isConversationAccepted");
var import_isConversationUnregistered = require("./isConversationUnregistered");
var import_iterables = require("./iterables");
var import_missingCaseError = require("./missingCaseError");
const CHUNK_SIZE = 100;
async function sendReceipts({
  log,
  receipts,
  type
}) {
  let requiresUserSetting;
  let methodName;
  switch (type) {
    case import_Receipt.ReceiptType.Delivery:
      requiresUserSetting = false;
      methodName = "sendDeliveryReceipt";
      break;
    case import_Receipt.ReceiptType.Read:
      requiresUserSetting = true;
      methodName = "sendReadReceipt";
      break;
    case import_Receipt.ReceiptType.Viewed:
      requiresUserSetting = true;
      methodName = "sendViewedReceipt";
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(type);
  }
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  if (requiresUserSetting && !window.storage.get("read-receipt-setting")) {
    log.info("requires user setting. Not sending these receipts");
    return;
  }
  const receiptsBySenderId = receipts.reduce((result, receipt) => {
    const { senderE164, senderUuid } = receipt;
    if (!senderE164 && !senderUuid) {
      log.error("no sender E164 or UUID. Skipping this receipt");
      return result;
    }
    const senderId = window.ConversationController.ensureContactIds({
      e164: senderE164,
      uuid: senderUuid
    });
    if (!senderId) {
      throw new Error("no conversation found with that E164/UUID. Cannot send this receipt");
    }
    const existingGroup = result.get(senderId);
    if (existingGroup) {
      existingGroup.push(receipt);
    } else {
      result.set(senderId, [receipt]);
    }
    return result;
  }, /* @__PURE__ */ new Map());
  await window.ConversationController.load();
  await Promise.all((0, import_iterables.map)(receiptsBySenderId, async ([senderId, receiptsForSender]) => {
    const sender = window.ConversationController.get(senderId);
    if (!sender) {
      throw new Error("despite having a conversation ID, no conversation was found");
    }
    if (!(0, import_isConversationAccepted.isConversationAccepted)(sender.attributes)) {
      log.info(`conversation ${sender.idForLogging()} is not accepted; refusing to send`);
      return;
    }
    if ((0, import_isConversationUnregistered.isConversationUnregistered)(sender.attributes)) {
      log.info(`conversation ${sender.idForLogging()} is unregistered; refusing to send`);
      return;
    }
    if (sender.isBlocked()) {
      log.info(`conversation ${sender.idForLogging()} is blocked; refusing to send`);
      return;
    }
    const sendOptions = await (0, import_getSendOptions.getSendOptions)(sender.attributes);
    const batches = (0, import_lodash.chunk)(receiptsForSender, CHUNK_SIZE);
    await Promise.all((0, import_iterables.map)(batches, async (batch) => {
      const timestamps = batch.map((receipt) => receipt.timestamp);
      const messageIds = batch.map((receipt) => receipt.messageId);
      await (0, import_handleMessageSend.handleMessageSend)(messaging[methodName]({
        senderE164: sender.get("e164"),
        senderUuid: sender.get("uuid"),
        timestamps,
        options: sendOptions
      }), { messageIds, sendType: type });
    }));
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendReceipts
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZFJlY2VpcHRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY2h1bmsgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgdHlwZSB7IFJlY2VpcHQgfSBmcm9tICcuLi90eXBlcy9SZWNlaXB0JztcbmltcG9ydCB7IFJlY2VpcHRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvUmVjZWlwdCc7XG5pbXBvcnQgeyBnZXRTZW5kT3B0aW9ucyB9IGZyb20gJy4vZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQgfSBmcm9tICcuL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uQWNjZXB0ZWQgfSBmcm9tICcuL2lzQ29udmVyc2F0aW9uQWNjZXB0ZWQnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQgfSBmcm9tICcuL2lzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4vaXRlcmFibGVzJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuL21pc3NpbmdDYXNlRXJyb3InO1xuXG5jb25zdCBDSFVOS19TSVpFID0gMTAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFJlY2VpcHRzKHtcbiAgbG9nLFxuICByZWNlaXB0cyxcbiAgdHlwZSxcbn06IFJlYWRvbmx5PHtcbiAgbG9nOiBMb2dnZXJUeXBlO1xuICByZWNlaXB0czogUmVhZG9ubHlBcnJheTxSZWNlaXB0PjtcbiAgdHlwZTogUmVjZWlwdFR5cGU7XG59Pik6IFByb21pc2U8dm9pZD4ge1xuICBsZXQgcmVxdWlyZXNVc2VyU2V0dGluZzogYm9vbGVhbjtcbiAgbGV0IG1ldGhvZE5hbWU6XG4gICAgfCAnc2VuZERlbGl2ZXJ5UmVjZWlwdCdcbiAgICB8ICdzZW5kUmVhZFJlY2VpcHQnXG4gICAgfCAnc2VuZFZpZXdlZFJlY2VpcHQnO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJlY2VpcHRUeXBlLkRlbGl2ZXJ5OlxuICAgICAgcmVxdWlyZXNVc2VyU2V0dGluZyA9IGZhbHNlO1xuICAgICAgbWV0aG9kTmFtZSA9ICdzZW5kRGVsaXZlcnlSZWNlaXB0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgUmVjZWlwdFR5cGUuUmVhZDpcbiAgICAgIHJlcXVpcmVzVXNlclNldHRpbmcgPSB0cnVlO1xuICAgICAgbWV0aG9kTmFtZSA9ICdzZW5kUmVhZFJlY2VpcHQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBSZWNlaXB0VHlwZS5WaWV3ZWQ6XG4gICAgICByZXF1aXJlc1VzZXJTZXR0aW5nID0gdHJ1ZTtcbiAgICAgIG1ldGhvZE5hbWUgPSAnc2VuZFZpZXdlZFJlY2VpcHQnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodHlwZSk7XG4gIH1cblxuICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSEnKTtcbiAgfVxuXG4gIGlmIChyZXF1aXJlc1VzZXJTZXR0aW5nICYmICF3aW5kb3cuc3RvcmFnZS5nZXQoJ3JlYWQtcmVjZWlwdC1zZXR0aW5nJykpIHtcbiAgICBsb2cuaW5mbygncmVxdWlyZXMgdXNlciBzZXR0aW5nLiBOb3Qgc2VuZGluZyB0aGVzZSByZWNlaXB0cycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpcHRzQnlTZW5kZXJJZDogTWFwPHN0cmluZywgQXJyYXk8UmVjZWlwdD4+ID0gcmVjZWlwdHMucmVkdWNlKFxuICAgIChyZXN1bHQsIHJlY2VpcHQpID0+IHtcbiAgICAgIGNvbnN0IHsgc2VuZGVyRTE2NCwgc2VuZGVyVXVpZCB9ID0gcmVjZWlwdDtcbiAgICAgIGlmICghc2VuZGVyRTE2NCAmJiAhc2VuZGVyVXVpZCkge1xuICAgICAgICBsb2cuZXJyb3IoJ25vIHNlbmRlciBFMTY0IG9yIFVVSUQuIFNraXBwaW5nIHRoaXMgcmVjZWlwdCcpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZW5kZXJJZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgICBlMTY0OiBzZW5kZXJFMTY0LFxuICAgICAgICB1dWlkOiBzZW5kZXJVdWlkLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXNlbmRlcklkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnbm8gY29udmVyc2F0aW9uIGZvdW5kIHdpdGggdGhhdCBFMTY0L1VVSUQuIENhbm5vdCBzZW5kIHRoaXMgcmVjZWlwdCdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhpc3RpbmdHcm91cCA9IHJlc3VsdC5nZXQoc2VuZGVySWQpO1xuICAgICAgaWYgKGV4aXN0aW5nR3JvdXApIHtcbiAgICAgICAgZXhpc3RpbmdHcm91cC5wdXNoKHJlY2VpcHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnNldChzZW5kZXJJZCwgW3JlY2VpcHRdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIG5ldyBNYXAoKVxuICApO1xuXG4gIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmxvYWQoKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBtYXAocmVjZWlwdHNCeVNlbmRlcklkLCBhc3luYyAoW3NlbmRlcklkLCByZWNlaXB0c0ZvclNlbmRlcl0pID0+IHtcbiAgICAgIGNvbnN0IHNlbmRlciA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChzZW5kZXJJZCk7XG4gICAgICBpZiAoIXNlbmRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2Rlc3BpdGUgaGF2aW5nIGEgY29udmVyc2F0aW9uIElELCBubyBjb252ZXJzYXRpb24gd2FzIGZvdW5kJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzQ29udmVyc2F0aW9uQWNjZXB0ZWQoc2VuZGVyLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBjb252ZXJzYXRpb24gJHtzZW5kZXIuaWRGb3JMb2dnaW5nKCl9IGlzIG5vdCBhY2NlcHRlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKHNlbmRlci5hdHRyaWJ1dGVzKSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgY29udmVyc2F0aW9uICR7c2VuZGVyLmlkRm9yTG9nZ2luZygpfSBpcyB1bnJlZ2lzdGVyZWQ7IHJlZnVzaW5nIHRvIHNlbmRgXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChzZW5kZXIuaXNCbG9ja2VkKCkpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGNvbnZlcnNhdGlvbiAke3NlbmRlci5pZEZvckxvZ2dpbmcoKX0gaXMgYmxvY2tlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZW5kT3B0aW9ucyA9IGF3YWl0IGdldFNlbmRPcHRpb25zKHNlbmRlci5hdHRyaWJ1dGVzKTtcblxuICAgICAgY29uc3QgYmF0Y2hlcyA9IGNodW5rKHJlY2VpcHRzRm9yU2VuZGVyLCBDSFVOS19TSVpFKTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBtYXAoYmF0Y2hlcywgYXN5bmMgYmF0Y2ggPT4ge1xuICAgICAgICAgIGNvbnN0IHRpbWVzdGFtcHMgPSBiYXRjaC5tYXAocmVjZWlwdCA9PiByZWNlaXB0LnRpbWVzdGFtcCk7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZUlkcyA9IGJhdGNoLm1hcChyZWNlaXB0ID0+IHJlY2VpcHQubWVzc2FnZUlkKTtcblxuICAgICAgICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kKFxuICAgICAgICAgICAgbWVzc2FnaW5nW21ldGhvZE5hbWVdKHtcbiAgICAgICAgICAgICAgc2VuZGVyRTE2NDogc2VuZGVyLmdldCgnZTE2NCcpLFxuICAgICAgICAgICAgICBzZW5kZXJVdWlkOiBzZW5kZXIuZ2V0KCd1dWlkJyksXG4gICAgICAgICAgICAgIHRpbWVzdGFtcHMsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHNlbmRPcHRpb25zLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB7IG1lc3NhZ2VJZHMsIHNlbmRUeXBlOiB0eXBlIH1cbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFzQjtBQUd0QixxQkFBNEI7QUFDNUIsNEJBQStCO0FBQy9CLCtCQUFrQztBQUNsQyxvQ0FBdUM7QUFDdkMsd0NBQTJDO0FBQzNDLHVCQUFvQjtBQUNwQiw4QkFBaUM7QUFFakMsTUFBTSxhQUFhO0FBRW5CLDRCQUFtQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUtpQjtBQUNqQixNQUFJO0FBQ0osTUFBSTtBQUlKLFVBQVE7QUFBQSxTQUNELDJCQUFZ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
