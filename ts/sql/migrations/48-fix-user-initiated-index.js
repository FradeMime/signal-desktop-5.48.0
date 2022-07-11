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
var fix_user_initiated_index_exports = {};
__export(fix_user_initiated_index_exports, {
  default: () => updateToSchemaVersion48
});
module.exports = __toCommonJS(fix_user_initiated_index_exports);
function updateToSchemaVersion48(currentVersion, db, logger) {
  if (currentVersion >= 48) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP INDEX   message_user_initiated;

      CREATE INDEX message_user_initiated ON messages (conversationId, isUserInitiatedMessage);
      `);
    db.pragma("user_version = 48");
  })();
  logger.info("updateToSchemaVersion48: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDgtZml4LXVzZXItaW5pdGlhdGVkLWluZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb240OChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gNDgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhcbiAgICAgIGBcbiAgICAgIERST1AgSU5ERVggICBtZXNzYWdlX3VzZXJfaW5pdGlhdGVkO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZV91c2VyX2luaXRpYXRlZCBPTiBtZXNzYWdlcyAoY29udmVyc2F0aW9uSWQsIGlzVXNlckluaXRpYXRlZE1lc3NhZ2UpO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDQ4Jyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ4OiBzdWNjZXNzIScpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9lLGlDQUNiLGdCQUNBLElBQ0EsUUFDTTtBQUNOLE1BQUksa0JBQWtCLElBQUk7QUFDeEI7QUFBQSxFQUNGO0FBRUEsS0FBRyxZQUFZLE1BQU07QUFDbkIsT0FBRyxLQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FLRjtBQUVBLE9BQUcsT0FBTyxtQkFBbUI7QUFBQSxFQUMvQixDQUFDLEVBQUU7QUFFSCxTQUFPLEtBQUssbUNBQW1DO0FBQ2pEO0FBdEJ3QiIsCiAgIm5hbWVzIjogW10KfQo=
