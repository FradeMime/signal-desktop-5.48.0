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
var isConversationAccepted_exports = {};
__export(isConversationAccepted_exports, {
  isConversationAccepted: () => isConversationAccepted
});
module.exports = __toCommonJS(isConversationAccepted_exports);
var import_protobuf = require("../protobuf");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
var import_isInSystemContacts = require("./isInSystemContacts");
function isConversationAccepted(conversationAttrs, { ignoreEmptyConvo = false } = {}) {
  const messageRequestsEnabled = window.Signal.RemoteConfig.isEnabled("desktop.messageRequests");
  if (!messageRequestsEnabled) {
    return true;
  }
  if ((0, import_whatTypeOfConversation.isMe)(conversationAttrs)) {
    return true;
  }
  const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
  const { messageRequestResponseType } = conversationAttrs;
  if (messageRequestResponseType === messageRequestEnum.ACCEPT) {
    return true;
  }
  const { sentMessageCount } = conversationAttrs;
  const hasSentMessages = sentMessageCount > 0;
  const hasMessagesBeforeMessageRequests = (conversationAttrs.messageCountBeforeMessageRequests || 0) > 0;
  const hasNoMessages = (conversationAttrs.messageCount || 0) === 0;
  const isEmptyPrivateConvo = hasNoMessages && (0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs) && !ignoreEmptyConvo;
  const isEmptyWhitelistedGroup = hasNoMessages && !(0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs) && conversationAttrs.profileSharing;
  return isFromOrAddedByTrustedContact(conversationAttrs) || hasSentMessages || hasMessagesBeforeMessageRequests || isEmptyPrivateConvo || isEmptyWhitelistedGroup;
}
function isFromOrAddedByTrustedContact(conversationAttrs) {
  if ((0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs)) {
    return (0, import_isInSystemContacts.isInSystemContacts)(conversationAttrs) || Boolean(conversationAttrs.profileSharing);
  }
  const { addedBy } = conversationAttrs;
  if (!addedBy) {
    return false;
  }
  const conversation = window.ConversationController.get(addedBy);
  if (!conversation) {
    return false;
  }
  return Boolean((0, import_whatTypeOfConversation.isMe)(conversation.attributes) || conversation.get("name") || conversation.get("profileSharing"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationAccepted
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25BY2NlcHRlZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHsgaXNEaXJlY3RDb252ZXJzYXRpb24sIGlzTWUgfSBmcm9tICcuL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgaXNJblN5c3RlbUNvbnRhY3RzIH0gZnJvbSAnLi9pc0luU3lzdGVtQ29udGFjdHMnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB0aGlzIGNvbnZlcnNhdGlvbiBzaG91bGQgYmUgY29uc2lkZXJlZCBcImFjY2VwdGVkXCIgaW4gdGVybXNcbiAqIG9mIG1lc3NhZ2UgcmVxdWVzdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udmVyc2F0aW9uQWNjZXB0ZWQoXG4gIGNvbnZlcnNhdGlvbkF0dHJzOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgeyBpZ25vcmVFbXB0eUNvbnZvID0gZmFsc2UgfSA9IHt9XG4pOiBib29sZWFuIHtcbiAgY29uc3QgbWVzc2FnZVJlcXVlc3RzRW5hYmxlZCA9IHdpbmRvdy5TaWduYWwuUmVtb3RlQ29uZmlnLmlzRW5hYmxlZChcbiAgICAnZGVza3RvcC5tZXNzYWdlUmVxdWVzdHMnXG4gICk7XG5cbiAgaWYgKCFtZXNzYWdlUmVxdWVzdHNFbmFibGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoaXNNZShjb252ZXJzYXRpb25BdHRycykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2VSZXF1ZXN0RW51bSA9IFByb3RvLlN5bmNNZXNzYWdlLk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UuVHlwZTtcblxuICBjb25zdCB7IG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlIH0gPSBjb252ZXJzYXRpb25BdHRycztcbiAgaWYgKG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlID09PSBtZXNzYWdlUmVxdWVzdEVudW0uQUNDRVBUKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCB7IHNlbnRNZXNzYWdlQ291bnQgfSA9IGNvbnZlcnNhdGlvbkF0dHJzO1xuXG4gIGNvbnN0IGhhc1NlbnRNZXNzYWdlcyA9IHNlbnRNZXNzYWdlQ291bnQgPiAwO1xuICBjb25zdCBoYXNNZXNzYWdlc0JlZm9yZU1lc3NhZ2VSZXF1ZXN0cyA9XG4gICAgKGNvbnZlcnNhdGlvbkF0dHJzLm1lc3NhZ2VDb3VudEJlZm9yZU1lc3NhZ2VSZXF1ZXN0cyB8fCAwKSA+IDA7XG4gIGNvbnN0IGhhc05vTWVzc2FnZXMgPSAoY29udmVyc2F0aW9uQXR0cnMubWVzc2FnZUNvdW50IHx8IDApID09PSAwO1xuXG4gIGNvbnN0IGlzRW1wdHlQcml2YXRlQ29udm8gPVxuICAgIGhhc05vTWVzc2FnZXMgJiZcbiAgICBpc0RpcmVjdENvbnZlcnNhdGlvbihjb252ZXJzYXRpb25BdHRycykgJiZcbiAgICAhaWdub3JlRW1wdHlDb252bztcbiAgY29uc3QgaXNFbXB0eVdoaXRlbGlzdGVkR3JvdXAgPVxuICAgIGhhc05vTWVzc2FnZXMgJiZcbiAgICAhaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uQXR0cnMpICYmXG4gICAgY29udmVyc2F0aW9uQXR0cnMucHJvZmlsZVNoYXJpbmc7XG5cbiAgcmV0dXJuIChcbiAgICBpc0Zyb21PckFkZGVkQnlUcnVzdGVkQ29udGFjdChjb252ZXJzYXRpb25BdHRycykgfHxcbiAgICBoYXNTZW50TWVzc2FnZXMgfHxcbiAgICBoYXNNZXNzYWdlc0JlZm9yZU1lc3NhZ2VSZXF1ZXN0cyB8fFxuICAgIC8vIGFuIGVtcHR5IGdyb3VwIGlzIHRoZSBzY2VuYXJpbyB3aGVyZSB3ZSBuZWVkIHRvIHJlbHkgb25cbiAgICAvLyB3aGV0aGVyIHRoZSBwcm9maWxlIGhhcyBhbHJlYWR5IGJlZW4gc2hhcmVkIG9yIG5vdFxuICAgIGlzRW1wdHlQcml2YXRlQ29udm8gfHxcbiAgICBpc0VtcHR5V2hpdGVsaXN0ZWRHcm91cFxuICApO1xufVxuXG4vLyBJcyB0aGlzIHNvbWVvbmUgd2hvIGlzIGEgY29udGFjdCwgb3IgYXJlIHdlIHNoYXJpbmcgb3VyIHByb2ZpbGUgd2l0aCB0aGVtP1xuLy8gICBPciBpcyB0aGUgcGVyc29uIHdobyBhZGRlZCB1cyB0byB0aGlzIGdyb3VwIGEgY29udGFjdCBvciBhcmUgd2Ugc2hhcmluZyBwcm9maWxlXG4vLyAgIHdpdGggdGhlbT9cbmZ1bmN0aW9uIGlzRnJvbU9yQWRkZWRCeVRydXN0ZWRDb250YWN0KFxuICBjb252ZXJzYXRpb25BdHRyczogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGVcbik6IGJvb2xlYW4ge1xuICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uQXR0cnMpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzSW5TeXN0ZW1Db250YWN0cyhjb252ZXJzYXRpb25BdHRycykgfHxcbiAgICAgIEJvb2xlYW4oY29udmVyc2F0aW9uQXR0cnMucHJvZmlsZVNoYXJpbmcpXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHsgYWRkZWRCeSB9ID0gY29udmVyc2F0aW9uQXR0cnM7XG4gIGlmICghYWRkZWRCeSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChhZGRlZEJ5KTtcbiAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gQm9vbGVhbihcbiAgICBpc01lKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSB8fFxuICAgICAgY29udmVyc2F0aW9uLmdldCgnbmFtZScpIHx8XG4gICAgICBjb252ZXJzYXRpb24uZ2V0KCdwcm9maWxlU2hhcmluZycpXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsc0JBQXVDO0FBQ3ZDLG9DQUEyQztBQUMzQyxnQ0FBbUM7QUFNNUIsZ0NBQ0wsbUJBQ0EsRUFBRSxtQkFBbUIsVUFBVSxDQUFDLEdBQ3ZCO0FBQ1QsUUFBTSx5QkFBeUIsT0FBTyxPQUFPLGFBQWEsVUFDeEQseUJBQ0Y7QUFFQSxNQUFJLENBQUMsd0JBQXdCO0FBQzNCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSx3Q0FBSyxpQkFBaUIsR0FBRztBQUMzQixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0scUJBQXFCLDhCQUFNLFlBQVksdUJBQXVCO0FBRXBFLFFBQU0sRUFBRSwrQkFBK0I7QUFDdkMsTUFBSSwrQkFBK0IsbUJBQW1CLFFBQVE7QUFDNUQsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLEVBQUUscUJBQXFCO0FBRTdCLFFBQU0sa0JBQWtCLG1CQUFtQjtBQUMzQyxRQUFNLG1DQUNILG1CQUFrQixxQ0FBcUMsS0FBSztBQUMvRCxRQUFNLGdCQUFpQixtQkFBa0IsZ0JBQWdCLE9BQU87QUFFaEUsUUFBTSxzQkFDSixpQkFDQSx3REFBcUIsaUJBQWlCLEtBQ3RDLENBQUM7QUFDSCxRQUFNLDBCQUNKLGlCQUNBLENBQUMsd0RBQXFCLGlCQUFpQixLQUN2QyxrQkFBa0I7QUFFcEIsU0FDRSw4QkFBOEIsaUJBQWlCLEtBQy9DLG1CQUNBLG9DQUdBLHVCQUNBO0FBRUo7QUFoRGdCLEFBcURoQix1Q0FDRSxtQkFDUztBQUNULE1BQUksd0RBQXFCLGlCQUFpQixHQUFHO0FBQzNDLFdBQ0Usa0RBQW1CLGlCQUFpQixLQUNwQyxRQUFRLGtCQUFrQixjQUFjO0FBQUEsRUFFNUM7QUFFQSxRQUFNLEVBQUUsWUFBWTtBQUNwQixNQUFJLENBQUMsU0FBUztBQUNaLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxlQUFlLE9BQU8sdUJBQXVCLElBQUksT0FBTztBQUM5RCxNQUFJLENBQUMsY0FBYztBQUNqQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sUUFDTCx3Q0FBSyxhQUFhLFVBQVUsS0FDMUIsYUFBYSxJQUFJLE1BQU0sS0FDdkIsYUFBYSxJQUFJLGdCQUFnQixDQUNyQztBQUNGO0FBekJTIiwKICAibmFtZXMiOiBbXQp9Cg==
