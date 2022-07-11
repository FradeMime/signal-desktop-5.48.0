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
var updateConversationsWithUuidLookup_exports = {};
__export(updateConversationsWithUuidLookup_exports, {
  updateConversationsWithUuidLookup: () => updateConversationsWithUuidLookup
});
module.exports = __toCommonJS(updateConversationsWithUuidLookup_exports);
var import_assert = require("./util/assert");
var import_getOwn = require("./util/getOwn");
var import_isNotNil = require("./util/isNotNil");
async function updateConversationsWithUuidLookup({
  conversationController,
  conversations,
  messaging
}) {
  const e164s = conversations.map((conversation) => conversation.get("e164")).filter(import_isNotNil.isNotNil);
  if (!e164s.length) {
    return;
  }
  const serverLookup = await messaging.getUuidsForE164s(e164s);
  await Promise.all(conversations.map(async (conversation) => {
    const e164 = conversation.get("e164");
    if (!e164) {
      return;
    }
    let finalConversation;
    const uuidFromServer = (0, import_getOwn.getOwn)(serverLookup, e164);
    if (uuidFromServer) {
      const finalConversationId = conversationController.ensureContactIds({
        e164,
        uuid: uuidFromServer,
        highTrust: true,
        reason: "updateConversationsWithUuidLookup"
      });
      const maybeFinalConversation = conversationController.get(finalConversationId);
      (0, import_assert.assert)(maybeFinalConversation, "updateConversationsWithUuidLookup: expected a conversation to be found or created");
      finalConversation = maybeFinalConversation;
    } else {
      finalConversation = conversation;
    }
    let finalUuid = finalConversation.getUuid();
    if (!uuidFromServer && finalUuid) {
      const doesAccountExist = await messaging.checkAccountExistence(finalUuid);
      if (!doesAccountExist) {
        finalConversation.updateUuid(void 0);
        finalUuid = void 0;
      }
    }
    if (!finalConversation.get("e164") || !finalUuid) {
      finalConversation.setUnregistered();
    }
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateConversationsWithUuidLookup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlQ29udmVyc2F0aW9uc1dpdGhVdWlkTG9va3VwLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQ29udHJvbGxlciB9IGZyb20gJy4vQ29udmVyc2F0aW9uQ29udHJvbGxlcic7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSBTZW5kTWVzc2FnZSBmcm9tICcuL3RleHRzZWN1cmUvU2VuZE1lc3NhZ2UnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBnZXRPd24gfSBmcm9tICcuL3V0aWwvZ2V0T3duJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnLi91dGlsL2lzTm90TmlsJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cCh7XG4gIGNvbnZlcnNhdGlvbkNvbnRyb2xsZXIsXG4gIGNvbnZlcnNhdGlvbnMsXG4gIG1lc3NhZ2luZyxcbn06IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogUGljazxcbiAgICBDb252ZXJzYXRpb25Db250cm9sbGVyLFxuICAgICdlbnN1cmVDb250YWN0SWRzJyB8ICdnZXQnXG4gID47XG4gIGNvbnZlcnNhdGlvbnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+O1xuICBtZXNzYWdpbmc6IFBpY2s8U2VuZE1lc3NhZ2UsICdnZXRVdWlkc0ZvckUxNjRzJyB8ICdjaGVja0FjY291bnRFeGlzdGVuY2UnPjtcbn0+KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGUxNjRzID0gY29udmVyc2F0aW9uc1xuICAgIC5tYXAoY29udmVyc2F0aW9uID0+IGNvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKSlcbiAgICAuZmlsdGVyKGlzTm90TmlsKTtcbiAgaWYgKCFlMTY0cy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzZXJ2ZXJMb29rdXAgPSBhd2FpdCBtZXNzYWdpbmcuZ2V0VXVpZHNGb3JFMTY0cyhlMTY0cyk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgY29udmVyc2F0aW9ucy5tYXAoYXN5bmMgY29udmVyc2F0aW9uID0+IHtcbiAgICAgIGNvbnN0IGUxNjQgPSBjb252ZXJzYXRpb24uZ2V0KCdlMTY0Jyk7XG4gICAgICBpZiAoIWUxNjQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZmluYWxDb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsO1xuXG4gICAgICBjb25zdCB1dWlkRnJvbVNlcnZlciA9IGdldE93bihzZXJ2ZXJMb29rdXAsIGUxNjQpO1xuICAgICAgaWYgKHV1aWRGcm9tU2VydmVyKSB7XG4gICAgICAgIGNvbnN0IGZpbmFsQ29udmVyc2F0aW9uSWQgPSBjb252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgICAgIGUxNjQsXG4gICAgICAgICAgdXVpZDogdXVpZEZyb21TZXJ2ZXIsXG4gICAgICAgICAgaGlnaFRydXN0OiB0cnVlLFxuICAgICAgICAgIHJlYXNvbjogJ3VwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cCcsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtYXliZUZpbmFsQ29udmVyc2F0aW9uID1cbiAgICAgICAgICBjb252ZXJzYXRpb25Db250cm9sbGVyLmdldChmaW5hbENvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIG1heWJlRmluYWxDb252ZXJzYXRpb24sXG4gICAgICAgICAgJ3VwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cDogZXhwZWN0ZWQgYSBjb252ZXJzYXRpb24gdG8gYmUgZm91bmQgb3IgY3JlYXRlZCdcbiAgICAgICAgKTtcbiAgICAgICAgZmluYWxDb252ZXJzYXRpb24gPSBtYXliZUZpbmFsQ29udmVyc2F0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWxDb252ZXJzYXRpb24gPSBjb252ZXJzYXRpb247XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGdvdCBubyB1dWlkIGZyb20gQ0RTIHNvIGVpdGhlciB0aGUgcGVyc29uIGlzIG5vdyB1bnJlZ2lzdGVyZWQgb3JcbiAgICAgIC8vIHRoZXkgY2FuJ3QgYmUgbG9va2VkIHVwIGJ5IGEgcGhvbmUgbnVtYmVyLiBDaGVjayB0aGF0IHV1aWQgc3RpbGwgZXhpc3RzLFxuICAgICAgLy8gYW5kIGlmIG5vdCAtIGRyb3AgaXQuXG4gICAgICBsZXQgZmluYWxVdWlkID0gZmluYWxDb252ZXJzYXRpb24uZ2V0VXVpZCgpO1xuICAgICAgaWYgKCF1dWlkRnJvbVNlcnZlciAmJiBmaW5hbFV1aWQpIHtcbiAgICAgICAgY29uc3QgZG9lc0FjY291bnRFeGlzdCA9IGF3YWl0IG1lc3NhZ2luZy5jaGVja0FjY291bnRFeGlzdGVuY2UoXG4gICAgICAgICAgZmluYWxVdWlkXG4gICAgICAgICk7XG4gICAgICAgIGlmICghZG9lc0FjY291bnRFeGlzdCkge1xuICAgICAgICAgIGZpbmFsQ29udmVyc2F0aW9uLnVwZGF0ZVV1aWQodW5kZWZpbmVkKTtcbiAgICAgICAgICBmaW5hbFV1aWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFmaW5hbENvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKSB8fCAhZmluYWxVdWlkKSB7XG4gICAgICAgIGZpbmFsQ29udmVyc2F0aW9uLnNldFVucmVnaXN0ZXJlZCgpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsb0JBQXVCO0FBQ3ZCLG9CQUF1QjtBQUN2QixzQkFBeUI7QUFFekIsaURBQXdEO0FBQUEsRUFDdEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBUWlCO0FBQ2pCLFFBQU0sUUFBUSxjQUNYLElBQUksa0JBQWdCLGFBQWEsSUFBSSxNQUFNLENBQUMsRUFDNUMsT0FBTyx3QkFBUTtBQUNsQixNQUFJLENBQUMsTUFBTSxRQUFRO0FBQ2pCO0FBQUEsRUFDRjtBQUVBLFFBQU0sZUFBZSxNQUFNLFVBQVUsaUJBQWlCLEtBQUs7QUFFM0QsUUFBTSxRQUFRLElBQ1osY0FBYyxJQUFJLE9BQU0saUJBQWdCO0FBQ3RDLFVBQU0sT0FBTyxhQUFhLElBQUksTUFBTTtBQUNwQyxRQUFJLENBQUMsTUFBTTtBQUNUO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFFSixVQUFNLGlCQUFpQiwwQkFBTyxjQUFjLElBQUk7QUFDaEQsUUFBSSxnQkFBZ0I7QUFDbEIsWUFBTSxzQkFBc0IsdUJBQXVCLGlCQUFpQjtBQUFBLFFBQ2xFO0FBQUEsUUFDQSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsTUFDVixDQUFDO0FBQ0QsWUFBTSx5QkFDSix1QkFBdUIsSUFBSSxtQkFBbUI7QUFDaEQsZ0NBQ0Usd0JBQ0EsbUZBQ0Y7QUFDQSwwQkFBb0I7QUFBQSxJQUN0QixPQUFPO0FBQ0wsMEJBQW9CO0FBQUEsSUFDdEI7QUFLQSxRQUFJLFlBQVksa0JBQWtCLFFBQVE7QUFDMUMsUUFBSSxDQUFDLGtCQUFrQixXQUFXO0FBQ2hDLFlBQU0sbUJBQW1CLE1BQU0sVUFBVSxzQkFDdkMsU0FDRjtBQUNBLFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsMEJBQWtCLFdBQVcsTUFBUztBQUN0QyxvQkFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLGtCQUFrQixJQUFJLE1BQU0sS0FBSyxDQUFDLFdBQVc7QUFDaEQsd0JBQWtCLGdCQUFnQjtBQUFBLElBQ3BDO0FBQUEsRUFDRixDQUFDLENBQ0g7QUFDRjtBQXBFc0IiLAogICJuYW1lcyI6IFtdCn0K
