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
var isConversationUnregistered_exports = {};
__export(isConversationUnregistered_exports, {
  isConversationUnregistered: () => isConversationUnregistered
});
module.exports = __toCommonJS(isConversationUnregistered_exports);
var import_timestamp = require("./timestamp");
const SIX_HOURS = 1e3 * 60 * 60 * 6;
function isConversationUnregistered({
  discoveredUnregisteredAt
}) {
  return Boolean(discoveredUnregisteredAt && (0, import_timestamp.isMoreRecentThan)(discoveredUnregisteredAt, SIX_HOURS));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationUnregistered
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNNb3JlUmVjZW50VGhhbiB9IGZyb20gJy4vdGltZXN0YW1wJztcblxuY29uc3QgU0lYX0hPVVJTID0gMTAwMCAqIDYwICogNjAgKiA2O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQoe1xuICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQsXG59OiBSZWFkb25seTx7IGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdD86IG51bWJlciB9Pik6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQgJiZcbiAgICAgIGlzTW9yZVJlY2VudFRoYW4oZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0LCBTSVhfSE9VUlMpXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsdUJBQWlDO0FBRWpDLE1BQU0sWUFBWSxNQUFPLEtBQUssS0FBSztBQUU1QixvQ0FBb0M7QUFBQSxFQUN6QztBQUFBLEdBQzJEO0FBQzNELFNBQU8sUUFDTCw0QkFDRSx1Q0FBaUIsMEJBQTBCLFNBQVMsQ0FDeEQ7QUFDRjtBQVBnQiIsCiAgIm5hbWVzIjogW10KfQo=
