var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var conversationsEnums_exports = {};
__export(conversationsEnums_exports, {
  ComposerStep: () => ComposerStep,
  ConversationVerificationState: () => ConversationVerificationState,
  OneTimeModalState: () => OneTimeModalState,
  UsernameSaveState: () => UsernameSaveState
});
module.exports = __toCommonJS(conversationsEnums_exports);
var UsernameSaveState = /* @__PURE__ */ ((UsernameSaveState2) => {
  UsernameSaveState2["None"] = "None";
  UsernameSaveState2["Saving"] = "Saving";
  UsernameSaveState2["UsernameTakenError"] = "UsernameTakenError";
  UsernameSaveState2["UsernameMalformedError"] = "UsernameMalformedError";
  UsernameSaveState2["GeneralError"] = "GeneralError";
  UsernameSaveState2["DeleteFailed"] = "DeleteFailed";
  UsernameSaveState2["Success"] = "Success";
  return UsernameSaveState2;
})(UsernameSaveState || {});
var ComposerStep = /* @__PURE__ */ ((ComposerStep2) => {
  ComposerStep2["StartDirectConversation"] = "StartDirectConversation";
  ComposerStep2["ChooseGroupMembers"] = "ChooseGroupMembers";
  ComposerStep2["SetGroupMetadata"] = "SetGroupMetadata";
  return ComposerStep2;
})(ComposerStep || {});
var OneTimeModalState = /* @__PURE__ */ ((OneTimeModalState2) => {
  OneTimeModalState2[OneTimeModalState2["NeverShown"] = 0] = "NeverShown";
  OneTimeModalState2[OneTimeModalState2["Showing"] = 1] = "Showing";
  OneTimeModalState2[OneTimeModalState2["Shown"] = 2] = "Shown";
  return OneTimeModalState2;
})(OneTimeModalState || {});
var ConversationVerificationState = /* @__PURE__ */ ((ConversationVerificationState2) => {
  ConversationVerificationState2["PendingVerification"] = "PendingVerification";
  ConversationVerificationState2["VerificationCancelled"] = "VerificationCancelled";
  return ConversationVerificationState2;
})(ConversationVerificationState || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComposerStep,
  ConversationVerificationState,
  OneTimeModalState,
  UsernameSaveState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9uc0VudW1zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFdlIHByZXZlbnQgY2lyY3VsYXIgbG9vcHMgYmV0d2VlbiBkdWNrcyBhbmQgc2VsZWN0b3JzL2NvbXBvbmVudHMgd2l0aCBgaW1wb3J0IHR5cGVgLlxuLy8gICBGb3IgZXhhbXBsZSwgU2VsZWN0b3JzIGFyZSB1c2VkIGluIGFjdGlvbiBjcmVhdG9ycyB1c2luZyB0aHVuay9nZXRTdGF0ZSwgYnV0IHRob3NlXG4vLyAgIFNlbGVjdG9ycyBuZWVkIHR5cGVzIGZyb20gdGhlIGR1Y2tzLiBTZWxlY3RvcnMgc2hvdWxkbid0IHVzZSBjb2RlIGZyb20gZHVja3MuXG4vL1xuLy8gQnV0IGVudW1zIGNhbiBiZSB1c2VkIGFzIHR5cGVzIGJ1dCBhbHNvIGFzIGNvZGUuIFNvIHdlIGtlZXAgdGhlbSBvdXQgb2YgdGhlIGR1Y2tzLlxuXG5leHBvcnQgZW51bSBVc2VybmFtZVNhdmVTdGF0ZSB7XG4gIE5vbmUgPSAnTm9uZScsXG4gIFNhdmluZyA9ICdTYXZpbmcnLFxuICBVc2VybmFtZVRha2VuRXJyb3IgPSAnVXNlcm5hbWVUYWtlbkVycm9yJyxcbiAgVXNlcm5hbWVNYWxmb3JtZWRFcnJvciA9ICdVc2VybmFtZU1hbGZvcm1lZEVycm9yJyxcbiAgR2VuZXJhbEVycm9yID0gJ0dlbmVyYWxFcnJvcicsXG4gIERlbGV0ZUZhaWxlZCA9ICdEZWxldGVGYWlsZWQnLFxuICBTdWNjZXNzID0gJ1N1Y2Nlc3MnLFxufVxuXG5leHBvcnQgZW51bSBDb21wb3NlclN0ZXAge1xuICBTdGFydERpcmVjdENvbnZlcnNhdGlvbiA9ICdTdGFydERpcmVjdENvbnZlcnNhdGlvbicsXG4gIENob29zZUdyb3VwTWVtYmVycyA9ICdDaG9vc2VHcm91cE1lbWJlcnMnLFxuICBTZXRHcm91cE1ldGFkYXRhID0gJ1NldEdyb3VwTWV0YWRhdGEnLFxufVxuXG5leHBvcnQgZW51bSBPbmVUaW1lTW9kYWxTdGF0ZSB7XG4gIE5ldmVyU2hvd24sXG4gIFNob3dpbmcsXG4gIFNob3duLFxufVxuXG5leHBvcnQgZW51bSBDb252ZXJzYXRpb25WZXJpZmljYXRpb25TdGF0ZSB7XG4gIFBlbmRpbmdWZXJpZmljYXRpb24gPSAnUGVuZGluZ1ZlcmlmaWNhdGlvbicsXG4gIFZlcmlmaWNhdGlvbkNhbmNlbGxlZCA9ICdWZXJpZmljYXRpb25DYW5jZWxsZWQnLFxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU08sSUFBSyxvQkFBTCxrQkFBSyx1QkFBTDtBQUNMLCtCQUFPO0FBQ1AsaUNBQVM7QUFDVCw2Q0FBcUI7QUFDckIsaURBQXlCO0FBQ3pCLHVDQUFlO0FBQ2YsdUNBQWU7QUFDZixrQ0FBVTtBQVBBO0FBQUE7QUFVTCxJQUFLLGVBQUwsa0JBQUssa0JBQUw7QUFDTCw2Q0FBMEI7QUFDMUIsd0NBQXFCO0FBQ3JCLHNDQUFtQjtBQUhUO0FBQUE7QUFNTCxJQUFLLG9CQUFMLGtCQUFLLHVCQUFMO0FBQ0w7QUFDQTtBQUNBO0FBSFU7QUFBQTtBQU1MLElBQUssZ0NBQUwsa0JBQUssbUNBQUw7QUFDTCwwREFBc0I7QUFDdEIsNERBQXdCO0FBRmQ7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
