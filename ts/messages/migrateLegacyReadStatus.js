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
var migrateLegacyReadStatus_exports = {};
__export(migrateLegacyReadStatus_exports, {
  migrateLegacyReadStatus: () => migrateLegacyReadStatus
});
module.exports = __toCommonJS(migrateLegacyReadStatus_exports);
var import_MessageReadStatus = require("./MessageReadStatus");
function migrateLegacyReadStatus(message) {
  const shouldMigrate = message.readStatus == null;
  if (!shouldMigrate) {
    return;
  }
  const legacyUnread = message.unread;
  return legacyUnread ? import_MessageReadStatus.ReadStatus.Unread : import_MessageReadStatus.ReadStatus.Read;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  migrateLegacyReadStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWlncmF0ZUxlZ2FjeVJlYWRTdGF0dXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuL01lc3NhZ2VSZWFkU3RhdHVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1pZ3JhdGVMZWdhY3lSZWFkU3RhdHVzKFxuICBtZXNzYWdlOiBSZWFkb25seTxQaWNrPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSwgJ3JlYWRTdGF0dXMnPj5cbik6IHVuZGVmaW5lZCB8IFJlYWRTdGF0dXMge1xuICBjb25zdCBzaG91bGRNaWdyYXRlID0gbWVzc2FnZS5yZWFkU3RhdHVzID09IG51bGw7XG4gIGlmICghc2hvdWxkTWlncmF0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGxlZ2FjeVVucmVhZCA9IChtZXNzYWdlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KS51bnJlYWQ7XG4gIHJldHVybiBsZWdhY3lVbnJlYWQgPyBSZWFkU3RhdHVzLlVucmVhZCA6IFJlYWRTdGF0dXMuUmVhZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSwrQkFBMkI7QUFFcEIsaUNBQ0wsU0FDd0I7QUFDeEIsUUFBTSxnQkFBZ0IsUUFBUSxjQUFjO0FBQzVDLE1BQUksQ0FBQyxlQUFlO0FBQ2xCO0FBQUEsRUFDRjtBQUVBLFFBQU0sZUFBZ0IsUUFBb0M7QUFDMUQsU0FBTyxlQUFlLG9DQUFXLFNBQVMsb0NBQVc7QUFDdkQ7QUFWZ0IiLAogICJuYW1lcyI6IFtdCn0K
