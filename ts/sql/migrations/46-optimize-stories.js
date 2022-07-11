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
  default: () => updateToSchemaVersion46
});
module.exports = __toCommonJS(optimize_stories_exports);
function updateToSchemaVersion46(currentVersion, db, logger) {
  if (currentVersion >= 46) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      --- Add column to messages table

      ALTER TABLE messages
      ADD COLUMN
      isStory INTEGER
      GENERATED ALWAYS
      AS (type = 'story');

      --- Update important message indices

      DROP INDEX   messages_conversation;
      CREATE INDEX messages_conversation ON messages
        (conversationId, isStory, storyId, received_at, sent_at);
      `);
    db.pragma("user_version = 46");
  })();
  logger.info("updateToSchemaVersion46: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDYtb3B0aW1pemUtc3Rvcmllcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDYoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDQ2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICAtLS0gQWRkIGNvbHVtbiB0byBtZXNzYWdlcyB0YWJsZVxuXG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgQUREIENPTFVNTlxuICAgICAgaXNTdG9yeSBJTlRFR0VSXG4gICAgICBHRU5FUkFURUQgQUxXQVlTXG4gICAgICBBUyAodHlwZSA9ICdzdG9yeScpO1xuXG4gICAgICAtLS0gVXBkYXRlIGltcG9ydGFudCBtZXNzYWdlIGluZGljZXNcblxuICAgICAgRFJPUCBJTkRFWCAgIG1lc3NhZ2VzX2NvbnZlcnNhdGlvbjtcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19jb252ZXJzYXRpb24gT04gbWVzc2FnZXNcbiAgICAgICAgKGNvbnZlcnNhdGlvbklkLCBpc1N0b3J5LCBzdG9yeUlkLCByZWNlaXZlZF9hdCwgc2VudF9hdCk7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNDYnKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDY6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT2UsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BZUY7QUFFQSxPQUFHLE9BQU8sbUJBQW1CO0FBQUEsRUFDL0IsQ0FBQyxFQUFFO0FBRUgsU0FBTyxLQUFLLG1DQUFtQztBQUNqRDtBQWhDd0IiLAogICJuYW1lcyI6IFtdCn0K
