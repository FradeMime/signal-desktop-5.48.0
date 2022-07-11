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
var further_optimize_exports = {};
__export(further_optimize_exports, {
  default: () => updateToSchemaVersion47
});
module.exports = __toCommonJS(further_optimize_exports);
var import_uuid_keys = require("./41-uuid-keys");
function updateToSchemaVersion47(currentVersion, db, logger) {
  if (currentVersion >= 47) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP INDEX   messages_conversation;

      ALTER TABLE messages
        DROP COLUMN isStory;
      ALTER TABLE messages
        ADD COLUMN isStory INTEGER
        GENERATED ALWAYS AS (type IS 'story');

      ALTER TABLE messages
        ADD COLUMN isChangeCreatedByUs INTEGER NOT NULL DEFAULT 0;

      ALTER TABLE messages
        ADD COLUMN shouldAffectActivity INTEGER
        GENERATED ALWAYS AS (
          type IS NULL
          OR
          type NOT IN (
            'change-number-notification',
            'group-v1-migration',
            'message-history-unsynced',
            'profile-change',
            'story',
            'universal-timer-notification',
            'verified-change',

            'keychange'
          )
        );

      ALTER TABLE messages
        ADD COLUMN shouldAffectPreview INTEGER
        GENERATED ALWAYS AS (
          type IS NULL
          OR
          type NOT IN (
            'change-number-notification',
            'group-v1-migration',
            'message-history-unsynced',
            'profile-change',
            'story',
            'universal-timer-notification',
            'verified-change'
          )
        );

      ALTER TABLE messages
        ADD COLUMN isUserInitiatedMessage INTEGER
        GENERATED ALWAYS AS (
          type IS NULL
          OR
          type NOT IN (
            'change-number-notification',
            'group-v1-migration',
            'message-history-unsynced',
            'profile-change',
            'story',
            'universal-timer-notification',
            'verified-change',

            'group-v2-change',
            'keychange'
          )
        );

      ALTER TABLE messages
        ADD COLUMN isTimerChangeFromSync INTEGER
        GENERATED ALWAYS AS (
          json_extract(json, '$.expirationTimerUpdate.fromSync') IS 1
        );

      ALTER TABLE messages
        ADD COLUMN isGroupLeaveEvent INTEGER
        GENERATED ALWAYS AS (
          type IS 'group-v2-change' AND
          json_array_length(json_extract(json, '$.groupV2Change.details')) IS 1 AND
          json_extract(json, '$.groupV2Change.details[0].type') IS 'member-remove' AND
          json_extract(json, '$.groupV2Change.from') IS NOT NULL AND
          json_extract(json, '$.groupV2Change.from') IS json_extract(json, '$.groupV2Change.details[0].uuid')
        );

      ALTER TABLE messages
        ADD COLUMN isGroupLeaveEventFromOther INTEGER
        GENERATED ALWAYS AS (
          isGroupLeaveEvent IS 1
          AND
          isChangeCreatedByUs IS 0
        );

      CREATE INDEX messages_conversation ON messages
        (conversationId, isStory, storyId, received_at, sent_at);

      CREATE INDEX messages_preview ON messages
        (conversationId, shouldAffectPreview, isGroupLeaveEventFromOther, expiresAt, received_at, sent_at);

      CREATE INDEX messages_activity ON messages
        (conversationId, shouldAffectActivity, isTimerChangeFromSync, isGroupLeaveEventFromOther, received_at, sent_at);

      CREATE INDEX message_user_initiated ON messages (isUserInitiatedMessage);
      `);
    const ourUuid = (0, import_uuid_keys.getOurUuid)(db);
    if (!ourUuid) {
      logger.warn("updateToSchemaVersion47: our UUID not found");
    } else {
      db.prepare(`
        UPDATE messages SET
          isChangeCreatedByUs = json_extract(json, '$.groupV2Change.from') IS $ourUuid;
        `).run({
        ourUuid
      });
    }
    db.pragma("user_version = 47");
  })();
  logger.info("updateToSchemaVersion47: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDctZnVydGhlci1vcHRpbWl6ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGdldE91clV1aWQgfSBmcm9tICcuLzQxLXV1aWQta2V5cyc7XG5pbXBvcnQgdHlwZSB7IFF1ZXJ5IH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ3KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSA0Nykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKFxuICAgICAgYFxuICAgICAgRFJPUCBJTkRFWCAgIG1lc3NhZ2VzX2NvbnZlcnNhdGlvbjtcblxuICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgICAgRFJPUCBDT0xVTU4gaXNTdG9yeTtcbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gaXNTdG9yeSBJTlRFR0VSXG4gICAgICAgIEdFTkVSQVRFRCBBTFdBWVMgQVMgKHR5cGUgSVMgJ3N0b3J5Jyk7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gaXNDaGFuZ2VDcmVhdGVkQnlVcyBJTlRFR0VSIE5PVCBOVUxMIERFRkFVTFQgMDtcblxuICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgICAgQUREIENPTFVNTiBzaG91bGRBZmZlY3RBY3Rpdml0eSBJTlRFR0VSXG4gICAgICAgIEdFTkVSQVRFRCBBTFdBWVMgQVMgKFxuICAgICAgICAgIHR5cGUgSVMgTlVMTFxuICAgICAgICAgIE9SXG4gICAgICAgICAgdHlwZSBOT1QgSU4gKFxuICAgICAgICAgICAgJ2NoYW5nZS1udW1iZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICdncm91cC12MS1taWdyYXRpb24nLFxuICAgICAgICAgICAgJ21lc3NhZ2UtaGlzdG9yeS11bnN5bmNlZCcsXG4gICAgICAgICAgICAncHJvZmlsZS1jaGFuZ2UnLFxuICAgICAgICAgICAgJ3N0b3J5JyxcbiAgICAgICAgICAgICd1bml2ZXJzYWwtdGltZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd2ZXJpZmllZC1jaGFuZ2UnLFxuXG4gICAgICAgICAgICAna2V5Y2hhbmdlJ1xuICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgICAgQUREIENPTFVNTiBzaG91bGRBZmZlY3RQcmV2aWV3IElOVEVHRVJcbiAgICAgICAgR0VORVJBVEVEIEFMV0FZUyBBUyAoXG4gICAgICAgICAgdHlwZSBJUyBOVUxMXG4gICAgICAgICAgT1JcbiAgICAgICAgICB0eXBlIE5PVCBJTiAoXG4gICAgICAgICAgICAnY2hhbmdlLW51bWJlci1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgJ2dyb3VwLXYxLW1pZ3JhdGlvbicsXG4gICAgICAgICAgICAnbWVzc2FnZS1oaXN0b3J5LXVuc3luY2VkJyxcbiAgICAgICAgICAgICdwcm9maWxlLWNoYW5nZScsXG4gICAgICAgICAgICAnc3RvcnknLFxuICAgICAgICAgICAgJ3VuaXZlcnNhbC10aW1lci1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgJ3ZlcmlmaWVkLWNoYW5nZSdcbiAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gaXNVc2VySW5pdGlhdGVkTWVzc2FnZSBJTlRFR0VSXG4gICAgICAgIEdFTkVSQVRFRCBBTFdBWVMgQVMgKFxuICAgICAgICAgIHR5cGUgSVMgTlVMTFxuICAgICAgICAgIE9SXG4gICAgICAgICAgdHlwZSBOT1QgSU4gKFxuICAgICAgICAgICAgJ2NoYW5nZS1udW1iZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICdncm91cC12MS1taWdyYXRpb24nLFxuICAgICAgICAgICAgJ21lc3NhZ2UtaGlzdG9yeS11bnN5bmNlZCcsXG4gICAgICAgICAgICAncHJvZmlsZS1jaGFuZ2UnLFxuICAgICAgICAgICAgJ3N0b3J5JyxcbiAgICAgICAgICAgICd1bml2ZXJzYWwtdGltZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd2ZXJpZmllZC1jaGFuZ2UnLFxuXG4gICAgICAgICAgICAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICAgICAgICAgICdrZXljaGFuZ2UnXG4gICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgICBBREQgQ09MVU1OIGlzVGltZXJDaGFuZ2VGcm9tU3luYyBJTlRFR0VSXG4gICAgICAgIEdFTkVSQVRFRCBBTFdBWVMgQVMgKFxuICAgICAgICAgIGpzb25fZXh0cmFjdChqc29uLCAnJC5leHBpcmF0aW9uVGltZXJVcGRhdGUuZnJvbVN5bmMnKSBJUyAxXG4gICAgICAgICk7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gaXNHcm91cExlYXZlRXZlbnQgSU5URUdFUlxuICAgICAgICBHRU5FUkFURUQgQUxXQVlTIEFTIChcbiAgICAgICAgICB0eXBlIElTICdncm91cC12Mi1jaGFuZ2UnIEFORFxuICAgICAgICAgIGpzb25fYXJyYXlfbGVuZ3RoKGpzb25fZXh0cmFjdChqc29uLCAnJC5ncm91cFYyQ2hhbmdlLmRldGFpbHMnKSkgSVMgMSBBTkRcbiAgICAgICAgICBqc29uX2V4dHJhY3QoanNvbiwgJyQuZ3JvdXBWMkNoYW5nZS5kZXRhaWxzWzBdLnR5cGUnKSBJUyAnbWVtYmVyLXJlbW92ZScgQU5EXG4gICAgICAgICAganNvbl9leHRyYWN0KGpzb24sICckLmdyb3VwVjJDaGFuZ2UuZnJvbScpIElTIE5PVCBOVUxMIEFORFxuICAgICAgICAgIGpzb25fZXh0cmFjdChqc29uLCAnJC5ncm91cFYyQ2hhbmdlLmZyb20nKSBJUyBqc29uX2V4dHJhY3QoanNvbiwgJyQuZ3JvdXBWMkNoYW5nZS5kZXRhaWxzWzBdLnV1aWQnKVxuICAgICAgICApO1xuXG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgICBBREQgQ09MVU1OIGlzR3JvdXBMZWF2ZUV2ZW50RnJvbU90aGVyIElOVEVHRVJcbiAgICAgICAgR0VORVJBVEVEIEFMV0FZUyBBUyAoXG4gICAgICAgICAgaXNHcm91cExlYXZlRXZlbnQgSVMgMVxuICAgICAgICAgIEFORFxuICAgICAgICAgIGlzQ2hhbmdlQ3JlYXRlZEJ5VXMgSVMgMFxuICAgICAgICApO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfY29udmVyc2F0aW9uIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgaXNTdG9yeSwgc3RvcnlJZCwgcmVjZWl2ZWRfYXQsIHNlbnRfYXQpO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfcHJldmlldyBPTiBtZXNzYWdlc1xuICAgICAgICAoY29udmVyc2F0aW9uSWQsIHNob3VsZEFmZmVjdFByZXZpZXcsIGlzR3JvdXBMZWF2ZUV2ZW50RnJvbU90aGVyLCBleHBpcmVzQXQsIHJlY2VpdmVkX2F0LCBzZW50X2F0KTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX2FjdGl2aXR5IE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgc2hvdWxkQWZmZWN0QWN0aXZpdHksIGlzVGltZXJDaGFuZ2VGcm9tU3luYywgaXNHcm91cExlYXZlRXZlbnRGcm9tT3RoZXIsIHJlY2VpdmVkX2F0LCBzZW50X2F0KTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VfdXNlcl9pbml0aWF0ZWQgT04gbWVzc2FnZXMgKGlzVXNlckluaXRpYXRlZE1lc3NhZ2UpO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0T3VyVXVpZChkYik7XG4gICAgaWYgKCFvdXJVdWlkKSB7XG4gICAgICBsb2dnZXIud2FybigndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDc6IG91ciBVVUlEIG5vdCBmb3VuZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBVUERBVEUgbWVzc2FnZXMgU0VUXG4gICAgICAgICAgaXNDaGFuZ2VDcmVhdGVkQnlVcyA9IGpzb25fZXh0cmFjdChqc29uLCAnJC5ncm91cFYyQ2hhbmdlLmZyb20nKSBJUyAkb3VyVXVpZDtcbiAgICAgICAgYFxuICAgICAgKS5ydW4oe1xuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA0NycpO1xuICB9KSgpO1xuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb240Nzogc3VjY2VzcyEnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQSx1QkFBMkI7QUFHWixpQ0FDYixnQkFDQSxJQUNBLFFBQ007QUFDTixNQUFJLGtCQUFrQixJQUFJO0FBQ3hCO0FBQUEsRUFDRjtBQUVBLEtBQUcsWUFBWSxNQUFNO0FBQ25CLE9BQUcsS0FDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQW9HRjtBQUVBLFVBQU0sVUFBVSxpQ0FBVyxFQUFFO0FBQzdCLFFBQUksQ0FBQyxTQUFTO0FBQ1osYUFBTyxLQUFLLDZDQUE2QztBQUFBLElBQzNELE9BQU87QUFDTCxTQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUEsU0FJRixFQUFFLElBQUk7QUFBQSxRQUNKO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLE9BQUcsT0FBTyxtQkFBbUI7QUFBQSxFQUMvQixDQUFDLEVBQUU7QUFFSCxTQUFPLEtBQUssbUNBQW1DO0FBQ2pEO0FBbkl3QiIsCiAgIm5hbWVzIjogW10KfQo=
