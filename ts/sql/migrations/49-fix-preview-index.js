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
var fix_preview_index_exports = {};
__export(fix_preview_index_exports, {
  default: () => updateToSchemaVersion49
});
module.exports = __toCommonJS(fix_preview_index_exports);
function updateToSchemaVersion49(currentVersion, db, logger) {
  if (currentVersion >= 49) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP INDEX messages_preview;

      -- Note the omitted 'expiresAt' column in the index. If it is present
      -- sqlite can't ORDER BY received_at, sent_at using this index.
      CREATE INDEX messages_preview ON messages
        (conversationId, shouldAffectPreview, isGroupLeaveEventFromOther, received_at, sent_at);
      `);
    db.pragma("user_version = 49");
  })();
  logger.info("updateToSchemaVersion49: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDktZml4LXByZXZpZXctaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBEYXRhYmFzZSB9IGZyb20gJ2JldHRlci1zcWxpdGUzJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTG9nZ2luZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ5KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSA0OSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKFxuICAgICAgYFxuICAgICAgRFJPUCBJTkRFWCBtZXNzYWdlc19wcmV2aWV3O1xuXG4gICAgICAtLSBOb3RlIHRoZSBvbWl0dGVkICdleHBpcmVzQXQnIGNvbHVtbiBpbiB0aGUgaW5kZXguIElmIGl0IGlzIHByZXNlbnRcbiAgICAgIC0tIHNxbGl0ZSBjYW4ndCBPUkRFUiBCWSByZWNlaXZlZF9hdCwgc2VudF9hdCB1c2luZyB0aGlzIGluZGV4LlxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3ByZXZpZXcgT04gbWVzc2FnZXNcbiAgICAgICAgKGNvbnZlcnNhdGlvbklkLCBzaG91bGRBZmZlY3RQcmV2aWV3LCBpc0dyb3VwTGVhdmVFdmVudEZyb21PdGhlciwgcmVjZWl2ZWRfYXQsIHNlbnRfYXQpO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDQ5Jyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ5OiBzdWNjZXNzIScpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9lLGlDQUNiLGdCQUNBLElBQ0EsUUFDTTtBQUNOLE1BQUksa0JBQWtCLElBQUk7QUFDeEI7QUFBQSxFQUNGO0FBRUEsS0FBRyxZQUFZLE1BQU07QUFDbkIsT0FBRyxLQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FRRjtBQUVBLE9BQUcsT0FBTyxtQkFBbUI7QUFBQSxFQUMvQixDQUFDLEVBQUU7QUFFSCxTQUFPLEtBQUssbUNBQW1DO0FBQ2pEO0FBekJ3QiIsCiAgIm5hbWVzIjogW10KfQo=
