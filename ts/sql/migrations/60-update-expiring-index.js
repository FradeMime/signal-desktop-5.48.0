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
var update_expiring_index_exports = {};
__export(update_expiring_index_exports, {
  default: () => updateToSchemaVersion60
});
module.exports = __toCommonJS(update_expiring_index_exports);
function updateToSchemaVersion60(currentVersion, db, logger) {
  if (currentVersion >= 60) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP INDEX expiring_message_by_conversation_and_received_at;

      CREATE INDEX expiring_message_by_conversation_and_received_at
        ON messages
        (
          conversationId,
          storyId,
          expirationStartTimestamp,
          expireTimer,
          received_at
        )
        WHERE isStory IS 0 AND type IS 'incoming';
      `);
    db.pragma("user_version = 60");
  })();
  logger.info("updateToSchemaVersion60: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNjAtdXBkYXRlLWV4cGlyaW5nLWluZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBEYXRhYmFzZSB9IGZyb20gJ2JldHRlci1zcWxpdGUzJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTG9nZ2luZyc7XG5cbi8vIFRPRE86IERFU0tUT1AtMzY5NFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNjAoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDYwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICBEUk9QIElOREVYIGV4cGlyaW5nX21lc3NhZ2VfYnlfY29udmVyc2F0aW9uX2FuZF9yZWNlaXZlZF9hdDtcblxuICAgICAgQ1JFQVRFIElOREVYIGV4cGlyaW5nX21lc3NhZ2VfYnlfY29udmVyc2F0aW9uX2FuZF9yZWNlaXZlZF9hdFxuICAgICAgICBPTiBtZXNzYWdlc1xuICAgICAgICAoXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgc3RvcnlJZCxcbiAgICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICAgICAgZXhwaXJlVGltZXIsXG4gICAgICAgICAgcmVjZWl2ZWRfYXRcbiAgICAgICAgKVxuICAgICAgICBXSEVSRSBpc1N0b3J5IElTIDAgQU5EIHR5cGUgSVMgJ2luY29taW5nJztcbiAgICAgIGBcbiAgICApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA2MCcpO1xuICB9KSgpO1xuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb242MDogc3VjY2VzcyEnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRZSxpQ0FDYixnQkFDQSxJQUNBLFFBQ007QUFDTixNQUFJLGtCQUFrQixJQUFJO0FBQ3hCO0FBQUEsRUFDRjtBQUVBLEtBQUcsWUFBWSxNQUFNO0FBQ25CLE9BQUcsS0FDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BY0Y7QUFFQSxPQUFHLE9BQU8sbUJBQW1CO0FBQUEsRUFDL0IsQ0FBQyxFQUFFO0FBRUgsU0FBTyxLQUFLLG1DQUFtQztBQUNqRDtBQS9Cd0IiLAogICJuYW1lcyI6IFtdCn0K
