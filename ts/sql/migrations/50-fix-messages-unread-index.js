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
var fix_messages_unread_index_exports = {};
__export(fix_messages_unread_index_exports, {
  default: () => updateToSchemaVersion50
});
module.exports = __toCommonJS(fix_messages_unread_index_exports);
function updateToSchemaVersion50(currentVersion, db, logger) {
  if (currentVersion >= 50) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP INDEX messages_unread;

      -- Note: here we move to the modern isStory/storyId fields and add received_at/sent_at.
      CREATE INDEX messages_unread ON messages
        (conversationId, readStatus, isStory, storyId, received_at, sent_at) WHERE readStatus IS NOT NULL;
      `);
    db.pragma("user_version = 50");
  })();
  logger.info("updateToSchemaVersion50: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTAtZml4LW1lc3NhZ2VzLXVucmVhZC1pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTAoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDUwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICBEUk9QIElOREVYIG1lc3NhZ2VzX3VucmVhZDtcblxuICAgICAgLS0gTm90ZTogaGVyZSB3ZSBtb3ZlIHRvIHRoZSBtb2Rlcm4gaXNTdG9yeS9zdG9yeUlkIGZpZWxkcyBhbmQgYWRkIHJlY2VpdmVkX2F0L3NlbnRfYXQuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdW5yZWFkIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgcmVhZFN0YXR1cywgaXNTdG9yeSwgc3RvcnlJZCwgcmVjZWl2ZWRfYXQsIHNlbnRfYXQpIFdIRVJFIHJlYWRTdGF0dXMgSVMgTk9UIE5VTEw7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNTAnKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNTA6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT2UsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FPRjtBQUVBLE9BQUcsT0FBTyxtQkFBbUI7QUFBQSxFQUMvQixDQUFDLEVBQUU7QUFFSCxTQUFPLEtBQUssbUNBQW1DO0FBQ2pEO0FBeEJ3QiIsCiAgIm5hbWVzIjogW10KfQo=
