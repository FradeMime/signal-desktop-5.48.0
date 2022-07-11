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
var syncHelpers_exports = {};
__export(syncHelpers_exports, {
  SyncTypeList: () => SyncTypeList,
  parseRawSyncDataArray: () => parseRawSyncDataArray,
  runSyncJob: () => runSyncJob
});
module.exports = __toCommonJS(syncHelpers_exports);
var import_lodash = require("lodash");
var import_getSendOptions = require("../../util/getSendOptions");
var import_handleMessageSend = require("../../util/handleMessageSend");
var import_isNotNil = require("../../util/isNotNil");
var import_assert = require("../../util/assert");
var import_isRecord = require("../../util/isRecord");
var import_commonShouldJobContinue = require("./commonShouldJobContinue");
var import_handleCommonJobRequestError = require("./handleCommonJobRequestError");
var import_missingCaseError = require("../../util/missingCaseError");
const CHUNK_SIZE = 100;
var SyncTypeList = /* @__PURE__ */ ((SyncTypeList2) => {
  SyncTypeList2["Read"] = "Read";
  SyncTypeList2["View"] = "View";
  SyncTypeList2["ViewOnceOpen"] = "ViewOnceOpen";
  return SyncTypeList2;
})(SyncTypeList || {});
function parseRawSyncDataArray(value) {
  (0, import_assert.strictAssert)(Array.isArray(value), "syncs are not an array");
  return value.map((item) => {
    (0, import_assert.strictAssert)((0, import_isRecord.isRecord)(item), "sync is not an object");
    const { messageId, senderE164, senderUuid, timestamp } = item;
    (0, import_assert.strictAssert)(typeof timestamp === "number", "timestamp should be a number");
    return {
      messageId: parseOptionalString("messageId", messageId),
      senderE164: parseOptionalString("senderE164", senderE164),
      senderUuid: parseOptionalString("senderUuid", senderUuid),
      timestamp
    };
  });
}
function parseOptionalString(name, value) {
  if (typeof value === "string") {
    return value;
  }
  if (value === void 0 || value === null) {
    return void 0;
  }
  throw new Error(`${name} was not a string`);
}
async function runSyncJob({
  attempt,
  type,
  log,
  maxRetryTime,
  syncs,
  timestamp
}) {
  if (!syncs.length) {
    log.info("skipping this job because there's nothing to sync");
    return;
  }
  let sendType;
  switch (type) {
    case "View" /* View */:
      sendType = "viewSync";
      break;
    case "Read" /* Read */:
      sendType = "readSync";
      break;
    case "ViewOnceOpen" /* ViewOnceOpen */:
      sendType = "viewOnceSync";
      break;
    default: {
      throw (0, import_missingCaseError.missingCaseError)(type);
    }
  }
  const syncTimestamps = syncs.map((sync) => sync.timestamp);
  log.info(`sending ${sendType}(s) for timestamp(s) ${syncTimestamps.join(", ")}`);
  const timeRemaining = timestamp + maxRetryTime - Date.now();
  const shouldContinue = await (0, import_commonShouldJobContinue.commonShouldJobContinue)({
    attempt,
    log,
    timeRemaining,
    skipWait: false
  });
  if (!shouldContinue) {
    return;
  }
  await window.ConversationController.load();
  const ourConversation = window.ConversationController.getOurConversationOrThrow();
  const sendOptions = await (0, import_getSendOptions.getSendOptions)(ourConversation.attributes, {
    syncMessage: true
  });
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  let doSync;
  switch (type) {
    case "View" /* View */:
      doSync = messaging.syncView.bind(messaging);
      break;
    case "Read" /* Read */:
      doSync = messaging.syncReadMessages.bind(messaging);
      break;
    case "ViewOnceOpen" /* ViewOnceOpen */:
      doSync = messaging.syncViewOnceOpen.bind(messaging);
      break;
    default: {
      throw (0, import_missingCaseError.missingCaseError)(type);
    }
  }
  try {
    await Promise.all((0, import_lodash.chunk)(syncs, CHUNK_SIZE).map((batch) => {
      const messageIds = batch.map((item) => item.messageId).filter(import_isNotNil.isNotNil);
      return (0, import_handleMessageSend.handleMessageSend)(doSync(batch, sendOptions), {
        messageIds,
        sendType
      });
    }));
  } catch (err) {
    await (0, import_handleCommonJobRequestError.handleCommonJobRequestError)({ err, log, timeRemaining });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SyncTypeList,
  parseRawSyncDataArray,
  runSyncJob
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3luY0hlbHBlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjaHVuayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGdldFNlbmRPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRTZW5kT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFNlbmRUeXBlc1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGhhbmRsZU1lc3NhZ2VTZW5kIH0gZnJvbSAnLi4vLi4vdXRpbC9oYW5kbGVNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uLy4uL3V0aWwvaXNOb3ROaWwnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi8uLi91dGlsL2lzUmVjb3JkJztcblxuaW1wb3J0IHsgY29tbW9uU2hvdWxkSm9iQ29udGludWUgfSBmcm9tICcuL2NvbW1vblNob3VsZEpvYkNvbnRpbnVlJztcbmltcG9ydCB7IGhhbmRsZUNvbW1vbkpvYlJlcXVlc3RFcnJvciB9IGZyb20gJy4vaGFuZGxlQ29tbW9uSm9iUmVxdWVzdEVycm9yJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHR5cGUgU2VuZE1lc3NhZ2UgZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5cbmNvbnN0IENIVU5LX1NJWkUgPSAxMDA7XG5cbmV4cG9ydCB0eXBlIFN5bmNUeXBlID0ge1xuICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gIHNlbmRlckUxNjQ/OiBzdHJpbmc7XG4gIHNlbmRlclV1aWQ/OiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcbmV4cG9ydCBlbnVtIFN5bmNUeXBlTGlzdCB7XG4gIFJlYWQgPSAnUmVhZCcsXG4gIFZpZXcgPSAnVmlldycsXG4gIFZpZXdPbmNlT3BlbiA9ICdWaWV3T25jZU9wZW4nLFxufVxuXG4vKipcbiAqIFBhcnNlIHdoYXQgX3Nob3VsZF8gYmUgYW4gYXJyYXkgb2YgYFN5bmNUeXBlYHMuXG4gKlxuICogTm90YWJseSwgYG51bGxgcyBtYWRlIGl0IGludG8gdGhlIGpvYiBzeXN0ZW0gYW5kIGNhdXNlZCBqb2JzIHRvIGZhaWwuIFRoaXMgY2xlYW5zIHRoYXRcbiAqIHVwIGluIGFkZGl0aW9uIHRvIHZhbGlkYXRpbmcgdGhlIGRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJhd1N5bmNEYXRhQXJyYXkodmFsdWU6IHVua25vd24pOiBBcnJheTxTeW5jVHlwZT4ge1xuICBzdHJpY3RBc3NlcnQoQXJyYXkuaXNBcnJheSh2YWx1ZSksICdzeW5jcyBhcmUgbm90IGFuIGFycmF5Jyk7XG4gIHJldHVybiB2YWx1ZS5tYXAoKGl0ZW06IHVua25vd24pID0+IHtcbiAgICBzdHJpY3RBc3NlcnQoaXNSZWNvcmQoaXRlbSksICdzeW5jIGlzIG5vdCBhbiBvYmplY3QnKTtcblxuICAgIGNvbnN0IHsgbWVzc2FnZUlkLCBzZW5kZXJFMTY0LCBzZW5kZXJVdWlkLCB0aW1lc3RhbXAgfSA9IGl0ZW07XG4gICAgc3RyaWN0QXNzZXJ0KHR5cGVvZiB0aW1lc3RhbXAgPT09ICdudW1iZXInLCAndGltZXN0YW1wIHNob3VsZCBiZSBhIG51bWJlcicpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VJZDogcGFyc2VPcHRpb25hbFN0cmluZygnbWVzc2FnZUlkJywgbWVzc2FnZUlkKSxcbiAgICAgIHNlbmRlckUxNjQ6IHBhcnNlT3B0aW9uYWxTdHJpbmcoJ3NlbmRlckUxNjQnLCBzZW5kZXJFMTY0KSxcbiAgICAgIHNlbmRlclV1aWQ6IHBhcnNlT3B0aW9uYWxTdHJpbmcoJ3NlbmRlclV1aWQnLCBzZW5kZXJVdWlkKSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcHRpb25hbFN0cmluZyhuYW1lOiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSB3YXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5TeW5jSm9iKHtcbiAgYXR0ZW1wdCxcbiAgdHlwZSxcbiAgbG9nLFxuICBtYXhSZXRyeVRpbWUsXG4gIHN5bmNzLFxuICB0aW1lc3RhbXAsXG59OiBSZWFkb25seTx7XG4gIGF0dGVtcHQ6IG51bWJlcjtcbiAgdHlwZTogU3luY1R5cGVMaXN0O1xuICBsb2c6IExvZ2dlclR5cGU7XG4gIG1heFJldHJ5VGltZTogbnVtYmVyO1xuICBzeW5jczogUmVhZG9ubHlBcnJheTxTeW5jVHlwZT47XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFzeW5jcy5sZW5ndGgpIHtcbiAgICBsb2cuaW5mbyhcInNraXBwaW5nIHRoaXMgam9iIGJlY2F1c2UgdGhlcmUncyBub3RoaW5nIHRvIHN5bmNcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHNlbmRUeXBlOiBTZW5kVHlwZXNUeXBlO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFN5bmNUeXBlTGlzdC5WaWV3OlxuICAgICAgc2VuZFR5cGUgPSAndmlld1N5bmMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTeW5jVHlwZUxpc3QuUmVhZDpcbiAgICAgIHNlbmRUeXBlID0gJ3JlYWRTeW5jJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgU3luY1R5cGVMaXN0LlZpZXdPbmNlT3BlbjpcbiAgICAgIHNlbmRUeXBlID0gJ3ZpZXdPbmNlU3luYyc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN5bmNUaW1lc3RhbXBzID0gc3luY3MubWFwKHN5bmMgPT4gc3luYy50aW1lc3RhbXApO1xuICBsb2cuaW5mbyhcbiAgICBgc2VuZGluZyAke3NlbmRUeXBlfShzKSBmb3IgdGltZXN0YW1wKHMpICR7c3luY1RpbWVzdGFtcHMuam9pbignLCAnKX1gXG4gICk7XG5cbiAgY29uc3QgdGltZVJlbWFpbmluZyA9IHRpbWVzdGFtcCArIG1heFJldHJ5VGltZSAtIERhdGUubm93KCk7XG5cbiAgY29uc3Qgc2hvdWxkQ29udGludWUgPSBhd2FpdCBjb21tb25TaG91bGRKb2JDb250aW51ZSh7XG4gICAgYXR0ZW1wdCxcbiAgICBsb2csXG4gICAgdGltZVJlbWFpbmluZyxcbiAgICBza2lwV2FpdDogZmFsc2UsXG4gIH0pO1xuICBpZiAoIXNob3VsZENvbnRpbnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIubG9hZCgpO1xuXG4gIGNvbnN0IG91ckNvbnZlcnNhdGlvbiA9XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uT3JUaHJvdygpO1xuICBjb25zdCBzZW5kT3B0aW9ucyA9IGF3YWl0IGdldFNlbmRPcHRpb25zKG91ckNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLCB7XG4gICAgc3luY01lc3NhZ2U6IHRydWUsXG4gIH0pO1xuXG4gIGNvbnN0IHsgbWVzc2FnaW5nIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgaWYgKCFtZXNzYWdpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21lc3NhZ2luZyBpcyBub3QgYXZhaWxhYmxlIScpO1xuICB9XG5cbiAgbGV0IGRvU3luYzpcbiAgICB8IFNlbmRNZXNzYWdlWydzeW5jUmVhZE1lc3NhZ2VzJ11cbiAgICB8IFNlbmRNZXNzYWdlWydzeW5jVmlldyddXG4gICAgfCBTZW5kTWVzc2FnZVsnc3luY1ZpZXdPbmNlT3BlbiddO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFN5bmNUeXBlTGlzdC5WaWV3OlxuICAgICAgZG9TeW5jID0gbWVzc2FnaW5nLnN5bmNWaWV3LmJpbmQobWVzc2FnaW5nKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgU3luY1R5cGVMaXN0LlJlYWQ6XG4gICAgICBkb1N5bmMgPSBtZXNzYWdpbmcuc3luY1JlYWRNZXNzYWdlcy5iaW5kKG1lc3NhZ2luZyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFN5bmNUeXBlTGlzdC5WaWV3T25jZU9wZW46XG4gICAgICBkb1N5bmMgPSBtZXNzYWdpbmcuc3luY1ZpZXdPbmNlT3Blbi5iaW5kKG1lc3NhZ2luZyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBjaHVuayhzeW5jcywgQ0hVTktfU0laRSkubWFwKGJhdGNoID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUlkcyA9IGJhdGNoLm1hcChpdGVtID0+IGl0ZW0ubWVzc2FnZUlkKS5maWx0ZXIoaXNOb3ROaWwpO1xuXG4gICAgICAgIHJldHVybiBoYW5kbGVNZXNzYWdlU2VuZChkb1N5bmMoYmF0Y2gsIHNlbmRPcHRpb25zKSwge1xuICAgICAgICAgIG1lc3NhZ2VJZHMsXG4gICAgICAgICAgc2VuZFR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICBhd2FpdCBoYW5kbGVDb21tb25Kb2JSZXF1ZXN0RXJyb3IoeyBlcnIsIGxvZywgdGltZVJlbWFpbmluZyB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBc0I7QUFFdEIsNEJBQStCO0FBRS9CLCtCQUFrQztBQUNsQyxzQkFBeUI7QUFDekIsb0JBQTZCO0FBQzdCLHNCQUF5QjtBQUV6QixxQ0FBd0M7QUFDeEMseUNBQTRDO0FBQzVDLDhCQUFpQztBQUdqQyxNQUFNLGFBQWE7QUFRWixJQUFLLGVBQUwsa0JBQUssa0JBQUw7QUFDTCwwQkFBTztBQUNQLDBCQUFPO0FBQ1Asa0NBQWU7QUFITDtBQUFBO0FBWUwsK0JBQStCLE9BQWlDO0FBQ3JFLGtDQUFhLE1BQU0sUUFBUSxLQUFLLEdBQUcsd0JBQXdCO0FBQzNELFNBQU8sTUFBTSxJQUFJLENBQUMsU0FBa0I7QUFDbEMsb0NBQWEsOEJBQVMsSUFBSSxHQUFHLHVCQUF1QjtBQUVwRCxVQUFNLEVBQUUsV0FBVyxZQUFZLFlBQVksY0FBYztBQUN6RCxvQ0FBYSxPQUFPLGNBQWMsVUFBVSw4QkFBOEI7QUFFMUUsV0FBTztBQUFBLE1BQ0wsV0FBVyxvQkFBb0IsYUFBYSxTQUFTO0FBQUEsTUFDckQsWUFBWSxvQkFBb0IsY0FBYyxVQUFVO0FBQUEsTUFDeEQsWUFBWSxvQkFBb0IsY0FBYyxVQUFVO0FBQUEsTUFDeEQ7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFmZ0IsQUFpQmhCLDZCQUE2QixNQUFjLE9BQW9DO0FBQzdFLE1BQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLFVBQVUsVUFBYSxVQUFVLE1BQU07QUFDekMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxRQUFNLElBQUksTUFBTSxHQUFHLHVCQUF1QjtBQUM1QztBQVJTLEFBVVQsMEJBQWlDO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBUWlCO0FBQ2pCLE1BQUksQ0FBQyxNQUFNLFFBQVE7QUFDakIsUUFBSSxLQUFLLG1EQUFtRDtBQUM1RDtBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0osVUFBUTtBQUFBLFNBQ0Q7QUFDSCxpQkFBVztBQUNYO0FBQUEsU0FDRztBQUNILGlCQUFXO0FBQ1g7QUFBQSxTQUNHO0FBQ0gsaUJBQVc7QUFDWDtBQUFBLGFBQ087QUFDUCxZQUFNLDhDQUFpQixJQUFJO0FBQUEsSUFDN0I7QUFBQTtBQUdGLFFBQU0saUJBQWlCLE1BQU0sSUFBSSxVQUFRLEtBQUssU0FBUztBQUN2RCxNQUFJLEtBQ0YsV0FBVyxnQ0FBZ0MsZUFBZSxLQUFLLElBQUksR0FDckU7QUFFQSxRQUFNLGdCQUFnQixZQUFZLGVBQWUsS0FBSyxJQUFJO0FBRTFELFFBQU0saUJBQWlCLE1BQU0sNERBQXdCO0FBQUEsSUFDbkQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNELE1BQUksQ0FBQyxnQkFBZ0I7QUFDbkI7QUFBQSxFQUNGO0FBRUEsUUFBTSxPQUFPLHVCQUF1QixLQUFLO0FBRXpDLFFBQU0sa0JBQ0osT0FBTyx1QkFBdUIsMEJBQTBCO0FBQzFELFFBQU0sY0FBYyxNQUFNLDBDQUFlLGdCQUFnQixZQUFZO0FBQUEsSUFDbkUsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFFBQU0sRUFBRSxjQUFjLE9BQU87QUFDN0IsTUFBSSxDQUFDLFdBQVc7QUFDZCxVQUFNLElBQUksTUFBTSw2QkFBNkI7QUFBQSxFQUMvQztBQUVBLE1BQUk7QUFJSixVQUFRO0FBQUEsU0FDRDtBQUNILGVBQVMsVUFBVSxTQUFTLEtBQUssU0FBUztBQUMxQztBQUFBLFNBQ0c7QUFDSCxlQUFTLFVBQVUsaUJBQWlCLEtBQUssU0FBUztBQUNsRDtBQUFBLFNBQ0c7QUFDSCxlQUFTLFVBQVUsaUJBQWlCLEtBQUssU0FBUztBQUNsRDtBQUFBLGFBQ087QUFDUCxZQUFNLDhDQUFpQixJQUFJO0FBQUEsSUFDN0I7QUFBQTtBQUdGLE1BQUk7QUFDRixVQUFNLFFBQVEsSUFDWix5QkFBTSxPQUFPLFVBQVUsRUFBRSxJQUFJLFdBQVM7QUFDcEMsWUFBTSxhQUFhLE1BQU0sSUFBSSxVQUFRLEtBQUssU0FBUyxFQUFFLE9BQU8sd0JBQVE7QUFFcEUsYUFBTyxnREFBa0IsT0FBTyxPQUFPLFdBQVcsR0FBRztBQUFBLFFBQ25EO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQyxDQUNIO0FBQUEsRUFDRixTQUFTLEtBQVA7QUFDQSxVQUFNLG9FQUE0QixFQUFFLEtBQUssS0FBSyxjQUFjLENBQUM7QUFBQSxFQUMvRDtBQUNGO0FBbkdzQiIsCiAgIm5hbWVzIjogW10KfQo=
