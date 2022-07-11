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
var optimize_stories_exports = {};
__export(optimize_stories_exports, {
  default: () => updateToSchemaVersion52
});
module.exports = __toCommonJS(optimize_stories_exports);
function updateToSchemaVersion52(currentVersion, db, logger) {
  if (currentVersion >= 52) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      -- Create indices that don't have storyId in them so that
      -- '_storyIdPredicate' could be optimized.

      -- See migration 47
      CREATE INDEX messages_conversation_no_story_id ON messages
        (conversationId, isStory, received_at, sent_at);

      -- See migration 50
      CREATE INDEX messages_unread_no_story_id ON messages
        (conversationId, readStatus, isStory, received_at, sent_at)
        WHERE readStatus IS NOT NULL;
      `);
    db.pragma("user_version = 52");
  })();
  logger.info("updateToSchemaVersion52: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTItb3B0aW1pemUtc3Rvcmllcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTIoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDUyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICAtLSBDcmVhdGUgaW5kaWNlcyB0aGF0IGRvbid0IGhhdmUgc3RvcnlJZCBpbiB0aGVtIHNvIHRoYXRcbiAgICAgIC0tICdfc3RvcnlJZFByZWRpY2F0ZScgY291bGQgYmUgb3B0aW1pemVkLlxuXG4gICAgICAtLSBTZWUgbWlncmF0aW9uIDQ3XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfY29udmVyc2F0aW9uX25vX3N0b3J5X2lkIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgaXNTdG9yeSwgcmVjZWl2ZWRfYXQsIHNlbnRfYXQpO1xuXG4gICAgICAtLSBTZWUgbWlncmF0aW9uIDUwXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdW5yZWFkX25vX3N0b3J5X2lkIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgcmVhZFN0YXR1cywgaXNTdG9yeSwgcmVjZWl2ZWRfYXQsIHNlbnRfYXQpXG4gICAgICAgIFdIRVJFIHJlYWRTdGF0dXMgSVMgTk9UIE5VTEw7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNTInKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNTI6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT2UsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FhRjtBQUVBLE9BQUcsT0FBTyxtQkFBbUI7QUFBQSxFQUMvQixDQUFDLEVBQUU7QUFFSCxTQUFPLEtBQUssbUNBQW1DO0FBQ2pEO0FBOUJ3QiIsCiAgIm5hbWVzIjogW10KfQo=
