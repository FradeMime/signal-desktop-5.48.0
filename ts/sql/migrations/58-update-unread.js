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
var update_unread_exports = {};
__export(update_unread_exports, {
  default: () => updateToSchemaVersion58
});
module.exports = __toCommonJS(update_unread_exports);
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_MessageSeenStatus = require("../../MessageSeenStatus");
function updateToSchemaVersion58(currentVersion, db, logger) {
  if (currentVersion >= 58) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      --- Promote unread status in JSON to SQL column

      -- NOTE: This was disabled because the 'unread' json field was deprecated
      -- in b0750e5f4e1f79f0f177b17cbe06d688431f948d, but the old value was kept
      -- in the messages created before the release of that commit.
      --
      -- UPDATE messages
      --   SET
      --     readStatus = ${import_MessageReadStatus.ReadStatus.Unread},
      --     seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen}
      --   WHERE
      --     json_extract(json, '$.unread') IS true OR
      --     json_extract(json, '$.unread') IS 1;

      --- Clean up all old messages that still have a null read status
      ---   Note: we don't need to update seenStatus, because that was defaulted to zero

      UPDATE messages
        SET
          readStatus = ${import_MessageReadStatus.ReadStatus.Read}
        WHERE
          readStatus IS NULL;

      --- Re-run unseen/unread queries from migration 56

      UPDATE messages
        SET
          seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen}
        WHERE
          readStatus = ${import_MessageReadStatus.ReadStatus.Unread} AND
          (
            type IS NULL
            OR
            type IN (
              'call-history',
              'change-number-notification',
              'chat-session-refreshed',
              'delivery-issue',
              'group',
              'incoming',
              'keychange',
              'timer-notification',
              'verified-change'
            )
          );

      UPDATE messages
        SET
          readStatus = ${import_MessageReadStatus.ReadStatus.Read}
        WHERE
          readStatus = ${import_MessageReadStatus.ReadStatus.Unread} AND
          type IS NOT NULL AND
          type NOT IN (
            'call-history',
            'change-number-notification',
            'chat-session-refreshed',
            'delivery-issue',
            'group',
            'incoming',
            'keychange',
            'timer-notification',
            'verified-change'
          );

      --- (new) Ensure these message types are not unread, just unseen

      UPDATE messages
        SET
          readStatus = ${import_MessageReadStatus.ReadStatus.Read}
        WHERE
          readStatus = ${import_MessageReadStatus.ReadStatus.Unread} AND
          (
            type IN (
              'change-number-notification',
              'keychange'
            )
          );

      --- (new) Ensure that these message types are neither unseen nor unread

      UPDATE messages
        SET
          readStatus = ${import_MessageReadStatus.ReadStatus.Read},
          seenStatus = ${import_MessageSeenStatus.SeenStatus.Seen}
        WHERE
          type IN (
            'group-v1-migration',
            'message-history-unsynced',
            'outgoing',
            'profile-change',
            'universal-timer-notification'
          );

      --- Make sure JSON reflects SQL columns

      UPDATE messages
        SET
          json = json_patch(
            json,
            json_object(
              'readStatus', readStatus,
              'seenStatus', seenStatus
            )
          )
        WHERE
          readStatus IS NOT NULL OR
          seenStatus IS NOT 0;
      `);
    db.pragma("user_version = 58");
  })();
  logger.info("updateToSchemaVersion58: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTgtdXBkYXRlLXVucmVhZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgU2VlblN0YXR1cyB9IGZyb20gJy4uLy4uL01lc3NhZ2VTZWVuU3RhdHVzJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTG9nZ2luZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU4KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSA1OCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKFxuICAgICAgYFxuICAgICAgLS0tIFByb21vdGUgdW5yZWFkIHN0YXR1cyBpbiBKU09OIHRvIFNRTCBjb2x1bW5cblxuICAgICAgLS0gTk9URTogVGhpcyB3YXMgZGlzYWJsZWQgYmVjYXVzZSB0aGUgJ3VucmVhZCcganNvbiBmaWVsZCB3YXMgZGVwcmVjYXRlZFxuICAgICAgLS0gaW4gYjA3NTBlNWY0ZTFmNzlmMGYxNzdiMTdjYmUwNmQ2ODg0MzFmOTQ4ZCwgYnV0IHRoZSBvbGQgdmFsdWUgd2FzIGtlcHRcbiAgICAgIC0tIGluIHRoZSBtZXNzYWdlcyBjcmVhdGVkIGJlZm9yZSB0aGUgcmVsZWFzZSBvZiB0aGF0IGNvbW1pdC5cbiAgICAgIC0tXG4gICAgICAtLSBVUERBVEUgbWVzc2FnZXNcbiAgICAgIC0tICAgU0VUXG4gICAgICAtLSAgICAgcmVhZFN0YXR1cyA9ICR7UmVhZFN0YXR1cy5VbnJlYWR9LFxuICAgICAgLS0gICAgIHNlZW5TdGF0dXMgPSAke1NlZW5TdGF0dXMuVW5zZWVufVxuICAgICAgLS0gICBXSEVSRVxuICAgICAgLS0gICAgIGpzb25fZXh0cmFjdChqc29uLCAnJC51bnJlYWQnKSBJUyB0cnVlIE9SXG4gICAgICAtLSAgICAganNvbl9leHRyYWN0KGpzb24sICckLnVucmVhZCcpIElTIDE7XG5cbiAgICAgIC0tLSBDbGVhbiB1cCBhbGwgb2xkIG1lc3NhZ2VzIHRoYXQgc3RpbGwgaGF2ZSBhIG51bGwgcmVhZCBzdGF0dXNcbiAgICAgIC0tLSAgIE5vdGU6IHdlIGRvbid0IG5lZWQgdG8gdXBkYXRlIHNlZW5TdGF0dXMsIGJlY2F1c2UgdGhhdCB3YXMgZGVmYXVsdGVkIHRvIHplcm9cblxuICAgICAgVVBEQVRFIG1lc3NhZ2VzXG4gICAgICAgIFNFVFxuICAgICAgICAgIHJlYWRTdGF0dXMgPSAke1JlYWRTdGF0dXMuUmVhZH1cbiAgICAgICAgV0hFUkVcbiAgICAgICAgICByZWFkU3RhdHVzIElTIE5VTEw7XG5cbiAgICAgIC0tLSBSZS1ydW4gdW5zZWVuL3VucmVhZCBxdWVyaWVzIGZyb20gbWlncmF0aW9uIDU2XG5cbiAgICAgIFVQREFURSBtZXNzYWdlc1xuICAgICAgICBTRVRcbiAgICAgICAgICBzZWVuU3RhdHVzID0gJHtTZWVuU3RhdHVzLlVuc2Vlbn1cbiAgICAgICAgV0hFUkVcbiAgICAgICAgICByZWFkU3RhdHVzID0gJHtSZWFkU3RhdHVzLlVucmVhZH0gQU5EXG4gICAgICAgICAgKFxuICAgICAgICAgICAgdHlwZSBJUyBOVUxMXG4gICAgICAgICAgICBPUlxuICAgICAgICAgICAgdHlwZSBJTiAoXG4gICAgICAgICAgICAgICdjYWxsLWhpc3RvcnknLFxuICAgICAgICAgICAgICAnY2hhbmdlLW51bWJlci1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgICAnY2hhdC1zZXNzaW9uLXJlZnJlc2hlZCcsXG4gICAgICAgICAgICAgICdkZWxpdmVyeS1pc3N1ZScsXG4gICAgICAgICAgICAgICdncm91cCcsXG4gICAgICAgICAgICAgICdpbmNvbWluZycsXG4gICAgICAgICAgICAgICdrZXljaGFuZ2UnLFxuICAgICAgICAgICAgICAndGltZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICAgJ3ZlcmlmaWVkLWNoYW5nZSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuXG4gICAgICBVUERBVEUgbWVzc2FnZXNcbiAgICAgICAgU0VUXG4gICAgICAgICAgcmVhZFN0YXR1cyA9ICR7UmVhZFN0YXR1cy5SZWFkfVxuICAgICAgICBXSEVSRVxuICAgICAgICAgIHJlYWRTdGF0dXMgPSAke1JlYWRTdGF0dXMuVW5yZWFkfSBBTkRcbiAgICAgICAgICB0eXBlIElTIE5PVCBOVUxMIEFORFxuICAgICAgICAgIHR5cGUgTk9UIElOIChcbiAgICAgICAgICAgICdjYWxsLWhpc3RvcnknLFxuICAgICAgICAgICAgJ2NoYW5nZS1udW1iZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICdjaGF0LXNlc3Npb24tcmVmcmVzaGVkJyxcbiAgICAgICAgICAgICdkZWxpdmVyeS1pc3N1ZScsXG4gICAgICAgICAgICAnZ3JvdXAnLFxuICAgICAgICAgICAgJ2luY29taW5nJyxcbiAgICAgICAgICAgICdrZXljaGFuZ2UnLFxuICAgICAgICAgICAgJ3RpbWVyLW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAndmVyaWZpZWQtY2hhbmdlJ1xuICAgICAgICAgICk7XG5cbiAgICAgIC0tLSAobmV3KSBFbnN1cmUgdGhlc2UgbWVzc2FnZSB0eXBlcyBhcmUgbm90IHVucmVhZCwganVzdCB1bnNlZW5cblxuICAgICAgVVBEQVRFIG1lc3NhZ2VzXG4gICAgICAgIFNFVFxuICAgICAgICAgIHJlYWRTdGF0dXMgPSAke1JlYWRTdGF0dXMuUmVhZH1cbiAgICAgICAgV0hFUkVcbiAgICAgICAgICByZWFkU3RhdHVzID0gJHtSZWFkU3RhdHVzLlVucmVhZH0gQU5EXG4gICAgICAgICAgKFxuICAgICAgICAgICAgdHlwZSBJTiAoXG4gICAgICAgICAgICAgICdjaGFuZ2UtbnVtYmVyLW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAgICdrZXljaGFuZ2UnXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcblxuICAgICAgLS0tIChuZXcpIEVuc3VyZSB0aGF0IHRoZXNlIG1lc3NhZ2UgdHlwZXMgYXJlIG5laXRoZXIgdW5zZWVuIG5vciB1bnJlYWRcblxuICAgICAgVVBEQVRFIG1lc3NhZ2VzXG4gICAgICAgIFNFVFxuICAgICAgICAgIHJlYWRTdGF0dXMgPSAke1JlYWRTdGF0dXMuUmVhZH0sXG4gICAgICAgICAgc2VlblN0YXR1cyA9ICR7U2VlblN0YXR1cy5TZWVufVxuICAgICAgICBXSEVSRVxuICAgICAgICAgIHR5cGUgSU4gKFxuICAgICAgICAgICAgJ2dyb3VwLXYxLW1pZ3JhdGlvbicsXG4gICAgICAgICAgICAnbWVzc2FnZS1oaXN0b3J5LXVuc3luY2VkJyxcbiAgICAgICAgICAgICdvdXRnb2luZycsXG4gICAgICAgICAgICAncHJvZmlsZS1jaGFuZ2UnLFxuICAgICAgICAgICAgJ3VuaXZlcnNhbC10aW1lci1ub3RpZmljYXRpb24nXG4gICAgICAgICAgKTtcblxuICAgICAgLS0tIE1ha2Ugc3VyZSBKU09OIHJlZmxlY3RzIFNRTCBjb2x1bW5zXG5cbiAgICAgIFVQREFURSBtZXNzYWdlc1xuICAgICAgICBTRVRcbiAgICAgICAgICBqc29uID0ganNvbl9wYXRjaChcbiAgICAgICAgICAgIGpzb24sXG4gICAgICAgICAgICBqc29uX29iamVjdChcbiAgICAgICAgICAgICAgJ3JlYWRTdGF0dXMnLCByZWFkU3RhdHVzLFxuICAgICAgICAgICAgICAnc2VlblN0YXR1cycsIHNlZW5TdGF0dXNcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIFdIRVJFXG4gICAgICAgICAgcmVhZFN0YXR1cyBJUyBOT1QgTlVMTCBPUlxuICAgICAgICAgIHNlZW5TdGF0dXMgSVMgTk9UIDA7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNTgnKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNTg6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsK0JBQTJCO0FBQzNCLCtCQUEyQjtBQUlaLGlDQUNiLGdCQUNBLElBQ0EsUUFDTTtBQUNOLE1BQUksa0JBQWtCLElBQUk7QUFDeEI7QUFBQSxFQUNGO0FBRUEsS0FBRyxZQUFZLE1BQU07QUFDbkIsT0FBRyxLQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQVNzQixvQ0FBVztBQUFBLDRCQUNYLG9DQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBVWQsb0NBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQVFYLG9DQUFXO0FBQUE7QUFBQSx5QkFFWCxvQ0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQW1CWCxvQ0FBVztBQUFBO0FBQUEseUJBRVgsb0NBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBa0JYLG9DQUFXO0FBQUE7QUFBQSx5QkFFWCxvQ0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFZWCxvQ0FBVztBQUFBLHlCQUNYLG9DQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BeUJoQztBQUVBLE9BQUcsT0FBTyxtQkFBbUI7QUFBQSxFQUMvQixDQUFDLEVBQUU7QUFFSCxTQUFPLEtBQUssbUNBQW1DO0FBQ2pEO0FBOUh3QiIsCiAgIm5hbWVzIjogW10KfQo=
