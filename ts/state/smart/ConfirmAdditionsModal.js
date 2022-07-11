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
var ConfirmAdditionsModal_exports = {};
__export(ConfirmAdditionsModal_exports, {
  SmartConfirmAdditionsModal: () => SmartConfirmAdditionsModal
});
module.exports = __toCommonJS(ConfirmAdditionsModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_assert = require("../../util/assert");
var import_ConfirmAdditionsModal = require("../../components/conversation/conversation-details/AddGroupMembersModal/ConfirmAdditionsModal");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const conversationSelector = (0, import_conversations.getConversationByIdSelector)(state);
  const selectedContacts = props.selectedConversationIds.map((conversationId) => {
    const convo = conversationSelector(conversationId);
    (0, import_assert.strictAssert)(convo, "<SmartChooseGroupMemberModal> selected conversation not found");
    return convo;
  });
  return {
    ...props,
    selectedContacts,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartConfirmAdditionsModal = smart(import_ConfirmAdditionsModal.ConfirmAdditionsModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartConfirmAdditionsModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybUFkZGl0aW9uc01vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVQcm9wc1R5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9jb252ZXJzYXRpb24tZGV0YWlscy9BZGRHcm91cE1lbWJlcnNNb2RhbC9Db25maXJtQWRkaXRpb25zTW9kYWwnO1xuaW1wb3J0IHsgQ29uZmlybUFkZGl0aW9uc01vZGFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvQWRkR3JvdXBNZW1iZXJzTW9kYWwvQ29uZmlybUFkZGl0aW9uc01vZGFsJztcbmltcG9ydCB0eXBlIHsgUmVxdWVzdFN0YXRlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvdXRpbCc7XG5cbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25CeUlkU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFNtYXJ0Q29uZmlybUFkZGl0aW9uc01vZGFsUHJvcHNUeXBlID0ge1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICBncm91cFRpdGxlOiBzdHJpbmc7XG4gIG1ha2VSZXF1ZXN0OiAoKSA9PiB2b2lkO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICByZXF1ZXN0U3RhdGU6IFJlcXVlc3RTdGF0ZTtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgcHJvcHM6IFNtYXJ0Q29uZmlybUFkZGl0aW9uc01vZGFsUHJvcHNUeXBlXG4pOiBTdGF0ZVByb3BzVHlwZSA9PiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvblNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uQnlJZFNlbGVjdG9yKHN0YXRlKTtcblxuICBjb25zdCBzZWxlY3RlZENvbnRhY3RzID0gcHJvcHMuc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMubWFwKGNvbnZlcnNhdGlvbklkID0+IHtcbiAgICBjb25zdCBjb252byA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKGNvbnZlcnNhdGlvbklkKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBjb252byxcbiAgICAgICc8U21hcnRDaG9vc2VHcm91cE1lbWJlck1vZGFsPiBzZWxlY3RlZCBjb252ZXJzYXRpb24gbm90IGZvdW5kJ1xuICAgICk7XG4gICAgcmV0dXJuIGNvbnZvO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRDb25maXJtQWRkaXRpb25zTW9kYWwgPSBzbWFydChDb25maXJtQWRkaXRpb25zTW9kYWwpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUd4QixxQkFBbUM7QUFDbkMsb0JBQTZCO0FBRzdCLG1DQUFzQztBQUd0QyxrQkFBd0I7QUFDeEIsMkJBQTRDO0FBVTVDLE1BQU0sa0JBQWtCLHdCQUN0QixPQUNBLFVBQ21CO0FBQ25CLFFBQU0sdUJBQXVCLHNEQUE0QixLQUFLO0FBRTlELFFBQU0sbUJBQW1CLE1BQU0sd0JBQXdCLElBQUksb0JBQWtCO0FBQzNFLFVBQU0sUUFBUSxxQkFBcUIsY0FBYztBQUNqRCxvQ0FDRSxPQUNBLCtEQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU87QUFBQSxPQUNGO0FBQUEsSUFDSDtBQUFBLElBQ0EsTUFBTSx5QkFBUSxLQUFLO0FBQUEsRUFDckI7QUFDRixHQXBCd0I7QUFzQnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sNkJBQTZCLE1BQU0sa0RBQXFCOyIsCiAgIm5hbWVzIjogW10KfQo=
