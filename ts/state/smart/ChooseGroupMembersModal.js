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
var ChooseGroupMembersModal_exports = {};
__export(ChooseGroupMembersModal_exports, {
  SmartChooseGroupMembersModal: () => SmartChooseGroupMembersModal
});
module.exports = __toCommonJS(ChooseGroupMembersModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_assert = require("../../util/assert");
var import_lookupConversationWithoutUuid = require("../../util/lookupConversationWithoutUuid");
var import_ChooseGroupMembersModal = require("../../components/conversation/conversation-details/AddGroupMembersModal/ChooseGroupMembersModal");
var import_user = require("../selectors/user");
var import_items = require("../selectors/items");
var import_conversations = require("../selectors/conversations");
var import_badges = require("../selectors/badges");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const conversationSelector = (0, import_conversations.getConversationByIdSelector)(state);
  const candidateContacts = (0, import_conversations.getCandidateContactsForNewGroup)(state);
  const selectedContacts = props.selectedConversationIds.map((conversationId) => {
    const convo = conversationSelector(conversationId);
    (0, import_assert.strictAssert)(convo, "<SmartChooseGroupMemberModal> selected conversation not found");
    return convo;
  });
  return {
    ...props,
    regionCode: (0, import_user.getRegionCode)(state),
    candidateContacts,
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    i18n: (0, import_user.getIntl)(state),
    theme: (0, import_user.getTheme)(state),
    selectedContacts,
    lookupConversationWithoutUuid: import_lookupConversationWithoutUuid.lookupConversationWithoutUuid,
    isUsernamesEnabled: (0, import_items.getUsernamesEnabled)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartChooseGroupMembersModal = smart(import_ChooseGroupMembersModal.ChooseGroupMembersModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartChooseGroupMembersModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkIH0gZnJvbSAnLi4vLi4vdXRpbC9sb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVQcm9wc1R5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9jb252ZXJzYXRpb24tZGV0YWlscy9BZGRHcm91cE1lbWJlcnNNb2RhbC9DaG9vc2VHcm91cE1lbWJlcnNNb2RhbCc7XG5pbXBvcnQgeyBDaG9vc2VHcm91cE1lbWJlcnNNb2RhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL2NvbnZlcnNhdGlvbi1kZXRhaWxzL0FkZEdyb3VwTWVtYmVyc01vZGFsL0Nob29zZUdyb3VwTWVtYmVyc01vZGFsJztcblxuaW1wb3J0IHsgZ2V0SW50bCwgZ2V0VGhlbWUsIGdldFJlZ2lvbkNvZGUgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRVc2VybmFtZXNFbmFibGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB7XG4gIGdldENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAsXG4gIGdldENvbnZlcnNhdGlvbkJ5SWRTZWxlY3Rvcixcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9iYWRnZXMnO1xuXG5leHBvcnQgdHlwZSBTbWFydENob29zZUdyb3VwTWVtYmVyc01vZGFsUHJvcHNUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZHNBbHJlYWR5SW5Hcm91cDogU2V0PHN0cmluZz47XG4gIG1heEdyb3VwU2l6ZTogbnVtYmVyO1xuICBjb25maXJtQWRkczogKCkgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcmVtb3ZlU2VsZWN0ZWRDb250YWN0OiAoXzogc3RyaW5nKSA9PiB2b2lkO1xuICBzZWFyY2hUZXJtOiBzdHJpbmc7XG4gIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gIHNldFNlYXJjaFRlcm06IChfOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRvZ2dsZVNlbGVjdGVkQ29udGFjdDogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoXG4gIHN0YXRlOiBTdGF0ZVR5cGUsXG4gIHByb3BzOiBTbWFydENob29zZUdyb3VwTWVtYmVyc01vZGFsUHJvcHNUeXBlXG4pOiBTdGF0ZVByb3BzVHlwZSA9PiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvblNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uQnlJZFNlbGVjdG9yKHN0YXRlKTtcblxuICBjb25zdCBjYW5kaWRhdGVDb250YWN0cyA9IGdldENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAoc3RhdGUpO1xuICBjb25zdCBzZWxlY3RlZENvbnRhY3RzID0gcHJvcHMuc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMubWFwKGNvbnZlcnNhdGlvbklkID0+IHtcbiAgICBjb25zdCBjb252byA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKGNvbnZlcnNhdGlvbklkKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBjb252byxcbiAgICAgICc8U21hcnRDaG9vc2VHcm91cE1lbWJlck1vZGFsPiBzZWxlY3RlZCBjb252ZXJzYXRpb24gbm90IGZvdW5kJ1xuICAgICk7XG4gICAgcmV0dXJuIGNvbnZvO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIHJlZ2lvbkNvZGU6IGdldFJlZ2lvbkNvZGUoc3RhdGUpLFxuICAgIGNhbmRpZGF0ZUNvbnRhY3RzLFxuICAgIGdldFByZWZlcnJlZEJhZGdlOiBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yKHN0YXRlKSxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICB0aGVtZTogZ2V0VGhlbWUoc3RhdGUpLFxuICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQsXG4gICAgaXNVc2VybmFtZXNFbmFibGVkOiBnZXRVc2VybmFtZXNFbmFibGVkKHN0YXRlKSxcbiAgfTtcbn07XG5cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydENob29zZUdyb3VwTWVtYmVyc01vZGFsID0gc21hcnQoQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUd4QixxQkFBbUM7QUFDbkMsb0JBQTZCO0FBQzdCLDJDQUE4QztBQUc5QyxxQ0FBd0M7QUFFeEMsa0JBQWlEO0FBQ2pELG1CQUFvQztBQUNwQywyQkFHTztBQUNQLG9CQUEwQztBQWMxQyxNQUFNLGtCQUFrQix3QkFDdEIsT0FDQSxVQUNtQjtBQUNuQixRQUFNLHVCQUF1QixzREFBNEIsS0FBSztBQUU5RCxRQUFNLG9CQUFvQiwwREFBZ0MsS0FBSztBQUMvRCxRQUFNLG1CQUFtQixNQUFNLHdCQUF3QixJQUFJLG9CQUFrQjtBQUMzRSxVQUFNLFFBQVEscUJBQXFCLGNBQWM7QUFDakQsb0NBQ0UsT0FDQSwrREFDRjtBQUNBLFdBQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUFPO0FBQUEsT0FDRjtBQUFBLElBQ0gsWUFBWSwrQkFBYyxLQUFLO0FBQUEsSUFDL0I7QUFBQSxJQUNBLG1CQUFtQiw2Q0FBMEIsS0FBSztBQUFBLElBQ2xELE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CLE9BQU8sMEJBQVMsS0FBSztBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CLHNDQUFvQixLQUFLO0FBQUEsRUFDL0M7QUFDRixHQTNCd0I7QUE2QnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sK0JBQStCLE1BQU0sc0RBQXVCOyIsCiAgIm5hbWVzIjogW10KfQo=
