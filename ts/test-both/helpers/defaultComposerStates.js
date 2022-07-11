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
var defaultComposerStates_exports = {};
__export(defaultComposerStates_exports, {
  defaultChooseGroupMembersComposerState: () => defaultChooseGroupMembersComposerState,
  defaultSetGroupMetadataComposerState: () => defaultSetGroupMetadataComposerState,
  defaultStartDirectConversationComposerState: () => defaultStartDirectConversationComposerState
});
module.exports = __toCommonJS(defaultComposerStates_exports);
var import_conversationsEnums = require("../../state/ducks/conversationsEnums");
var import_toggleSelectedContactForGroupAddition = require("../../groups/toggleSelectedContactForGroupAddition");
const defaultStartDirectConversationComposerState = {
  step: import_conversationsEnums.ComposerStep.StartDirectConversation,
  searchTerm: "",
  uuidFetchState: {}
};
const defaultChooseGroupMembersComposerState = {
  step: import_conversationsEnums.ComposerStep.ChooseGroupMembers,
  searchTerm: "",
  uuidFetchState: {},
  groupAvatar: void 0,
  groupName: "",
  groupExpireTimer: 0,
  maximumGroupSizeModalState: import_toggleSelectedContactForGroupAddition.OneTimeModalState.NeverShown,
  recommendedGroupSizeModalState: import_toggleSelectedContactForGroupAddition.OneTimeModalState.NeverShown,
  selectedConversationIds: [],
  userAvatarData: []
};
const defaultSetGroupMetadataComposerState = {
  step: import_conversationsEnums.ComposerStep.SetGroupMetadata,
  isEditingAvatar: false,
  groupAvatar: void 0,
  groupName: "",
  groupExpireTimer: 0,
  maximumGroupSizeModalState: import_toggleSelectedContactForGroupAddition.OneTimeModalState.NeverShown,
  recommendedGroupSizeModalState: import_toggleSelectedContactForGroupAddition.OneTimeModalState.NeverShown,
  selectedConversationIds: [],
  userAvatarData: [],
  isCreating: false,
  hasError: false
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultChooseGroupMembersComposerState,
  defaultSetGroupMetadataComposerState,
  defaultStartDirectConversationComposerState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVmYXVsdENvbXBvc2VyU3RhdGVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgQ29tcG9zZXJTdGVwIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9uc0VudW1zJztcbmltcG9ydCB7IE9uZVRpbWVNb2RhbFN0YXRlIH0gZnJvbSAnLi4vLi4vZ3JvdXBzL3RvZ2dsZVNlbGVjdGVkQ29udGFjdEZvckdyb3VwQWRkaXRpb24nO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uQ29tcG9zZXJTdGF0ZSA9IHtcbiAgc3RlcDogQ29tcG9zZXJTdGVwLlN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uIGFzIGNvbnN0LFxuICBzZWFyY2hUZXJtOiAnJyxcbiAgdXVpZEZldGNoU3RhdGU6IHt9LFxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlID0ge1xuICBzdGVwOiBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzIGFzIGNvbnN0LFxuICBzZWFyY2hUZXJtOiAnJyxcbiAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICBncm91cEF2YXRhcjogdW5kZWZpbmVkLFxuICBncm91cE5hbWU6ICcnLFxuICBncm91cEV4cGlyZVRpbWVyOiAwLFxuICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuTmV2ZXJTaG93bixcbiAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZS5OZXZlclNob3duLFxuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogW10sXG4gIHVzZXJBdmF0YXJEYXRhOiBbXSxcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2V0R3JvdXBNZXRhZGF0YUNvbXBvc2VyU3RhdGUgPSB7XG4gIHN0ZXA6IENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhIGFzIGNvbnN0LFxuICBpc0VkaXRpbmdBdmF0YXI6IGZhbHNlLFxuICBncm91cEF2YXRhcjogdW5kZWZpbmVkLFxuICBncm91cE5hbWU6ICcnLFxuICBncm91cEV4cGlyZVRpbWVyOiAwLFxuICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuTmV2ZXJTaG93bixcbiAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZS5OZXZlclNob3duLFxuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogW10sXG4gIHVzZXJBdmF0YXJEYXRhOiBbXSxcbiAgaXNDcmVhdGluZzogZmFsc2UgYXMgY29uc3QsXG4gIGhhc0Vycm9yOiBmYWxzZSBhcyBjb25zdCxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0NBQTZCO0FBQzdCLG1EQUFrQztBQUUzQixNQUFNLDhDQUE4QztBQUFBLEVBQ3pELE1BQU0sdUNBQWE7QUFBQSxFQUNuQixZQUFZO0FBQUEsRUFDWixnQkFBZ0IsQ0FBQztBQUNuQjtBQUVPLE1BQU0seUNBQXlDO0FBQUEsRUFDcEQsTUFBTSx1Q0FBYTtBQUFBLEVBQ25CLFlBQVk7QUFBQSxFQUNaLGdCQUFnQixDQUFDO0FBQUEsRUFDakIsYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsa0JBQWtCO0FBQUEsRUFDbEIsNEJBQTRCLCtEQUFrQjtBQUFBLEVBQzlDLGdDQUFnQywrREFBa0I7QUFBQSxFQUNsRCx5QkFBeUIsQ0FBQztBQUFBLEVBQzFCLGdCQUFnQixDQUFDO0FBQ25CO0FBRU8sTUFBTSx1Q0FBdUM7QUFBQSxFQUNsRCxNQUFNLHVDQUFhO0FBQUEsRUFDbkIsaUJBQWlCO0FBQUEsRUFDakIsYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsa0JBQWtCO0FBQUEsRUFDbEIsNEJBQTRCLCtEQUFrQjtBQUFBLEVBQzlDLGdDQUFnQywrREFBa0I7QUFBQSxFQUNsRCx5QkFBeUIsQ0FBQztBQUFBLEVBQzFCLGdCQUFnQixDQUFDO0FBQUEsRUFDakIsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUNaOyIsCiAgIm5hbWVzIjogW10KfQo=
