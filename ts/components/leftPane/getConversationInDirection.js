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
var getConversationInDirection_exports = {};
__export(getConversationInDirection_exports, {
  getConversationInDirection: () => getConversationInDirection
});
module.exports = __toCommonJS(getConversationInDirection_exports);
var import_lodash = require("lodash");
var import_isConversationUnread = require("../../util/isConversationUnread");
var import_LeftPaneHelper = require("./LeftPaneHelper");
const getConversationInDirection = /* @__PURE__ */ __name((conversations, toFind, selectedConversationId) => {
  const selectedConversationIndex = selectedConversationId ? conversations.findIndex(({ id }) => id === selectedConversationId) : -1;
  let conversation;
  if (selectedConversationIndex < 0) {
    if (toFind.unreadOnly) {
      conversation = toFind.direction === import_LeftPaneHelper.FindDirection.Up ? (0, import_lodash.findLast)(conversations, import_isConversationUnread.isConversationUnread) : (0, import_lodash.find)(conversations, import_isConversationUnread.isConversationUnread);
    } else {
      conversation = toFind.direction === import_LeftPaneHelper.FindDirection.Up ? (0, import_lodash.last)(conversations) : (0, import_lodash.first)(conversations);
    }
  } else if (toFind.unreadOnly) {
    conversation = toFind.direction === import_LeftPaneHelper.FindDirection.Up ? (0, import_lodash.findLast)(conversations.slice(0, selectedConversationIndex), import_isConversationUnread.isConversationUnread) : (0, import_lodash.find)(conversations.slice(selectedConversationIndex + 1), import_isConversationUnread.isConversationUnread);
  } else {
    const newIndex = selectedConversationIndex + (toFind.direction === import_LeftPaneHelper.FindDirection.Up ? -1 : 1);
    if (newIndex < 0) {
      conversation = (0, import_lodash.last)(conversations);
    } else if (newIndex >= conversations.length) {
      conversation = (0, import_lodash.first)(conversations);
    } else {
      conversation = conversations[newIndex];
    }
  }
  return conversation ? { conversationId: conversation.id } : void 0;
}, "getConversationInDirection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConversationInDirection
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q29udmVyc2F0aW9uSW5EaXJlY3Rpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZmluZCBhcyBmaW5kRmlyc3QsIGZpbmRMYXN0LCBmaXJzdCwgbGFzdCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhIGFzIENvbnZlcnNhdGlvbkxpc3RJdGVtUHJvcHNUeXBlIH0gZnJvbSAnLi4vY29udmVyc2F0aW9uTGlzdC9Db252ZXJzYXRpb25MaXN0SXRlbSc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvblVucmVhZCB9IGZyb20gJy4uLy4uL3V0aWwvaXNDb252ZXJzYXRpb25VbnJlYWQnO1xuaW1wb3J0IHR5cGUgeyBUb0ZpbmRUeXBlIH0gZnJvbSAnLi9MZWZ0UGFuZUhlbHBlcic7XG5pbXBvcnQgeyBGaW5kRGlyZWN0aW9uIH0gZnJvbSAnLi9MZWZ0UGFuZUhlbHBlcic7XG5cbi8qKlxuICogVGhpcyB3aWxsIGxvb2sgdXAgb3IgZG93biBpbiBhbiBhcnJheSBvZiBjb252ZXJzYXRpb25zIGZvciB0aGUgbmV4dCBvbmUgdG8gc2VsZWN0LlxuICogUmVmZXIgdG8gdGhlIHRlc3RzIGZvciB0aGUgaW50ZW5kZWQgYmVoYXZpb3IuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25JbkRpcmVjdGlvbiA9IChcbiAgY29udmVyc2F0aW9uczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT4sXG4gIHRvRmluZDogUmVhZG9ubHk8VG9GaW5kVHlwZT4sXG4gIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCB8IHN0cmluZ1xuKTogdW5kZWZpbmVkIHwgeyBjb252ZXJzYXRpb25JZDogc3RyaW5nIH0gPT4ge1xuICAvLyBBcyBhbiBvcHRpbWl6YXRpb24sIHdlIGRvbid0IG5lZWQgdG8gc2VhcmNoIGlmIG5vIGNvbnZlcnNhdGlvbiBpcyBzZWxlY3RlZC5cbiAgY29uc3Qgc2VsZWN0ZWRDb252ZXJzYXRpb25JbmRleCA9IHNlbGVjdGVkQ29udmVyc2F0aW9uSWRcbiAgICA/IGNvbnZlcnNhdGlvbnMuZmluZEluZGV4KCh7IGlkIH0pID0+IGlkID09PSBzZWxlY3RlZENvbnZlcnNhdGlvbklkKVxuICAgIDogLTE7XG5cbiAgbGV0IGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTGlzdEl0ZW1Qcm9wc1R5cGUgfCB1bmRlZmluZWQ7XG5cbiAgaWYgKHNlbGVjdGVkQ29udmVyc2F0aW9uSW5kZXggPCAwKSB7XG4gICAgaWYgKHRvRmluZC51bnJlYWRPbmx5KSB7XG4gICAgICBjb252ZXJzYXRpb24gPVxuICAgICAgICB0b0ZpbmQuZGlyZWN0aW9uID09PSBGaW5kRGlyZWN0aW9uLlVwXG4gICAgICAgICAgPyBmaW5kTGFzdChjb252ZXJzYXRpb25zLCBpc0NvbnZlcnNhdGlvblVucmVhZClcbiAgICAgICAgICA6IGZpbmRGaXJzdChjb252ZXJzYXRpb25zLCBpc0NvbnZlcnNhdGlvblVucmVhZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnZlcnNhdGlvbiA9XG4gICAgICAgIHRvRmluZC5kaXJlY3Rpb24gPT09IEZpbmREaXJlY3Rpb24uVXBcbiAgICAgICAgICA/IGxhc3QoY29udmVyc2F0aW9ucylcbiAgICAgICAgICA6IGZpcnN0KGNvbnZlcnNhdGlvbnMpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0b0ZpbmQudW5yZWFkT25seSkge1xuICAgIGNvbnZlcnNhdGlvbiA9XG4gICAgICB0b0ZpbmQuZGlyZWN0aW9uID09PSBGaW5kRGlyZWN0aW9uLlVwXG4gICAgICAgID8gZmluZExhc3QoXG4gICAgICAgICAgICBjb252ZXJzYXRpb25zLnNsaWNlKDAsIHNlbGVjdGVkQ29udmVyc2F0aW9uSW5kZXgpLFxuICAgICAgICAgICAgaXNDb252ZXJzYXRpb25VbnJlYWRcbiAgICAgICAgICApXG4gICAgICAgIDogZmluZEZpcnN0KFxuICAgICAgICAgICAgY29udmVyc2F0aW9ucy5zbGljZShzZWxlY3RlZENvbnZlcnNhdGlvbkluZGV4ICsgMSksXG4gICAgICAgICAgICBpc0NvbnZlcnNhdGlvblVucmVhZFxuICAgICAgICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmV3SW5kZXggPVxuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JbmRleCArXG4gICAgICAodG9GaW5kLmRpcmVjdGlvbiA9PT0gRmluZERpcmVjdGlvbi5VcCA/IC0xIDogMSk7XG4gICAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgICAgY29udmVyc2F0aW9uID0gbGFzdChjb252ZXJzYXRpb25zKTtcbiAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID49IGNvbnZlcnNhdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjb252ZXJzYXRpb24gPSBmaXJzdChjb252ZXJzYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udmVyc2F0aW9uID0gY29udmVyc2F0aW9uc1tuZXdJbmRleF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbnZlcnNhdGlvbiA/IHsgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbi5pZCB9IDogdW5kZWZpbmVkO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBeUQ7QUFHekQsa0NBQXFDO0FBRXJDLDRCQUE4QjtBQU12QixNQUFNLDZCQUE2Qix3QkFDeEMsZUFDQSxRQUNBLDJCQUMyQztBQUUzQyxRQUFNLDRCQUE0Qix5QkFDOUIsY0FBYyxVQUFVLENBQUMsRUFBRSxTQUFTLE9BQU8sc0JBQXNCLElBQ2pFO0FBRUosTUFBSTtBQUVKLE1BQUksNEJBQTRCLEdBQUc7QUFDakMsUUFBSSxPQUFPLFlBQVk7QUFDckIscUJBQ0UsT0FBTyxjQUFjLG9DQUFjLEtBQy9CLDRCQUFTLGVBQWUsZ0RBQW9CLElBQzVDLHdCQUFVLGVBQWUsZ0RBQW9CO0FBQUEsSUFDckQsT0FBTztBQUNMLHFCQUNFLE9BQU8sY0FBYyxvQ0FBYyxLQUMvQix3QkFBSyxhQUFhLElBQ2xCLHlCQUFNLGFBQWE7QUFBQSxJQUMzQjtBQUFBLEVBQ0YsV0FBVyxPQUFPLFlBQVk7QUFDNUIsbUJBQ0UsT0FBTyxjQUFjLG9DQUFjLEtBQy9CLDRCQUNFLGNBQWMsTUFBTSxHQUFHLHlCQUF5QixHQUNoRCxnREFDRixJQUNBLHdCQUNFLGNBQWMsTUFBTSw0QkFBNEIsQ0FBQyxHQUNqRCxnREFDRjtBQUFBLEVBQ1IsT0FBTztBQUNMLFVBQU0sV0FDSiw0QkFDQyxRQUFPLGNBQWMsb0NBQWMsS0FBSyxLQUFLO0FBQ2hELFFBQUksV0FBVyxHQUFHO0FBQ2hCLHFCQUFlLHdCQUFLLGFBQWE7QUFBQSxJQUNuQyxXQUFXLFlBQVksY0FBYyxRQUFRO0FBQzNDLHFCQUFlLHlCQUFNLGFBQWE7QUFBQSxJQUNwQyxPQUFPO0FBQ0wscUJBQWUsY0FBYztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUVBLFNBQU8sZUFBZSxFQUFFLGdCQUFnQixhQUFhLEdBQUcsSUFBSTtBQUM5RCxHQWpEMEM7IiwKICAibmFtZXMiOiBbXQp9Cg==
