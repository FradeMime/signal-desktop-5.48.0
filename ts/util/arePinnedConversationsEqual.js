var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var arePinnedConversationsEqual_exports = {};
__export(arePinnedConversationsEqual_exports, {
  arePinnedConversationsEqual: () => arePinnedConversationsEqual
});
module.exports = __toCommonJS(arePinnedConversationsEqual_exports);
var Bytes = __toESM(require("../Bytes"));
var import_protobuf = require("../protobuf");
const PinnedConversation = import_protobuf.SignalService.AccountRecord.IPinnedConversation;
function arePinnedConversationsEqual(localValue, remoteValue) {
  if (localValue.length !== remoteValue.length) {
    return false;
  }
  return localValue.every((localPinnedConversation, index) => {
    const remotePinnedConversation = remoteValue[index];
    const { contact, groupMasterKey, legacyGroupId } = localPinnedConversation;
    if (contact) {
      return remotePinnedConversation.contact && contact.uuid === remotePinnedConversation.contact.uuid;
    }
    if (groupMasterKey && groupMasterKey.length) {
      return Bytes.areEqual(groupMasterKey, remotePinnedConversation.groupMasterKey);
    }
    if (legacyGroupId && legacyGroupId.length) {
      return Bytes.areEqual(legacyGroupId, remotePinnedConversation.legacyGroupId);
    }
    return false;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  arePinnedConversationsEqual
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlUGlubmVkQ29udmVyc2F0aW9uc0VxdWFsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcblxuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uL3Byb3RvYnVmJztcblxuaW1wb3J0IFBpbm5lZENvbnZlcnNhdGlvbiA9IFByb3RvLkFjY291bnRSZWNvcmQuSVBpbm5lZENvbnZlcnNhdGlvbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFyZVBpbm5lZENvbnZlcnNhdGlvbnNFcXVhbChcbiAgbG9jYWxWYWx1ZTogQXJyYXk8UGlubmVkQ29udmVyc2F0aW9uPixcbiAgcmVtb3RlVmFsdWU6IEFycmF5PFBpbm5lZENvbnZlcnNhdGlvbj5cbik6IGJvb2xlYW4ge1xuICBpZiAobG9jYWxWYWx1ZS5sZW5ndGggIT09IHJlbW90ZVZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbG9jYWxWYWx1ZS5ldmVyeShcbiAgICAobG9jYWxQaW5uZWRDb252ZXJzYXRpb246IFBpbm5lZENvbnZlcnNhdGlvbiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgcmVtb3RlUGlubmVkQ29udmVyc2F0aW9uID0gcmVtb3RlVmFsdWVbaW5kZXhdO1xuXG4gICAgICBjb25zdCB7IGNvbnRhY3QsIGdyb3VwTWFzdGVyS2V5LCBsZWdhY3lHcm91cElkIH0gPVxuICAgICAgICBsb2NhbFBpbm5lZENvbnZlcnNhdGlvbjtcblxuICAgICAgaWYgKGNvbnRhY3QpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICByZW1vdGVQaW5uZWRDb252ZXJzYXRpb24uY29udGFjdCAmJlxuICAgICAgICAgIGNvbnRhY3QudXVpZCA9PT0gcmVtb3RlUGlubmVkQ29udmVyc2F0aW9uLmNvbnRhY3QudXVpZFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3JvdXBNYXN0ZXJLZXkgJiYgZ3JvdXBNYXN0ZXJLZXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBCeXRlcy5hcmVFcXVhbChcbiAgICAgICAgICBncm91cE1hc3RlcktleSxcbiAgICAgICAgICByZW1vdGVQaW5uZWRDb252ZXJzYXRpb24uZ3JvdXBNYXN0ZXJLZXlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxlZ2FjeUdyb3VwSWQgJiYgbGVnYWN5R3JvdXBJZC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIEJ5dGVzLmFyZUVxdWFsKFxuICAgICAgICAgIGxlZ2FjeUdyb3VwSWQsXG4gICAgICAgICAgcmVtb3RlUGlubmVkQ29udmVyc2F0aW9uLmxlZ2FjeUdyb3VwSWRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QixzQkFBdUM7QUFFdkMsTUFBTyxxQkFBcUIsOEJBQU0sY0FBYztBQUV6QyxxQ0FDTCxZQUNBLGFBQ1M7QUFDVCxNQUFJLFdBQVcsV0FBVyxZQUFZLFFBQVE7QUFDNUMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPLFdBQVcsTUFDaEIsQ0FBQyx5QkFBNkMsVUFBa0I7QUFDOUQsVUFBTSwyQkFBMkIsWUFBWTtBQUU3QyxVQUFNLEVBQUUsU0FBUyxnQkFBZ0Isa0JBQy9CO0FBRUYsUUFBSSxTQUFTO0FBQ1gsYUFDRSx5QkFBeUIsV0FDekIsUUFBUSxTQUFTLHlCQUF5QixRQUFRO0FBQUEsSUFFdEQ7QUFFQSxRQUFJLGtCQUFrQixlQUFlLFFBQVE7QUFDM0MsYUFBTyxNQUFNLFNBQ1gsZ0JBQ0EseUJBQXlCLGNBQzNCO0FBQUEsSUFDRjtBQUVBLFFBQUksaUJBQWlCLGNBQWMsUUFBUTtBQUN6QyxhQUFPLE1BQU0sU0FDWCxlQUNBLHlCQUF5QixhQUMzQjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVCxDQUNGO0FBQ0Y7QUF0Q2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
