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
var unprocessed_received_at_counter_index_exports = {};
__export(unprocessed_received_at_counter_index_exports, {
  default: () => updateToSchemaVersion59
});
module.exports = __toCommonJS(unprocessed_received_at_counter_index_exports);
function updateToSchemaVersion59(currentVersion, db, logger) {
  if (currentVersion >= 59) {
    return;
  }
  db.transaction(() => {
    db.exec(`
        CREATE INDEX unprocessed_byReceivedAtCounter ON unprocessed
          (receivedAtCounter)
      `);
    db.pragma("user_version = 59");
  })();
  logger.info("updateToSchemaVersion59: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTktdW5wcm9jZXNzZWQtcmVjZWl2ZWQtYXQtY291bnRlci1pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTkoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDU5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICAgIENSRUFURSBJTkRFWCB1bnByb2Nlc3NlZF9ieVJlY2VpdmVkQXRDb3VudGVyIE9OIHVucHJvY2Vzc2VkXG4gICAgICAgICAgKHJlY2VpdmVkQXRDb3VudGVyKVxuICAgICAgYFxuICAgICk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDU5Jyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb241OTogc3VjY2VzcyEnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPZSxpQ0FDYixnQkFDQSxJQUNBLFFBQ007QUFDTixNQUFJLGtCQUFrQixJQUFJO0FBQ3hCO0FBQUEsRUFDRjtBQUVBLEtBQUcsWUFBWSxNQUFNO0FBQ25CLE9BQUcsS0FDRDtBQUFBO0FBQUE7QUFBQSxPQUlGO0FBRUEsT0FBRyxPQUFPLG1CQUFtQjtBQUFBLEVBQy9CLENBQUMsRUFBRTtBQUNILFNBQU8sS0FBSyxtQ0FBbUM7QUFDakQ7QUFwQndCIiwKICAibmFtZXMiOiBbXQp9Cg==
