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
var PendingInvites_exports = {};
__export(PendingInvites_exports, {
  SmartPendingInvites: () => SmartPendingInvites
});
module.exports = __toCommonJS(PendingInvites_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_PendingInvites = require("../../components/conversation/conversation-details/PendingInvites");
var import_user = require("../selectors/user");
var import_badges = require("../selectors/badges");
var import_conversations = require("../selectors/conversations");
var import_getGroupMemberships = require("../../util/getGroupMemberships");
var import_assert = require("../../util/assert");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const conversationSelector = (0, import_conversations.getConversationByIdSelector)(state);
  const conversationByUuidSelector = (0, import_conversations.getConversationByUuidSelector)(state);
  const conversation = conversationSelector(props.conversationId);
  (0, import_assert.assert)(conversation, "<SmartPendingInvites> expected a conversation to be found");
  return {
    ...props,
    ...(0, import_getGroupMemberships.getGroupMemberships)(conversation, conversationByUuidSelector),
    conversation,
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    i18n: (0, import_user.getIntl)(state),
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartPendingInvites = smart(import_PendingInvites.PendingInvites);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartPendingInvites
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGVuZGluZ0ludml0ZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvUGVuZGluZ0ludml0ZXMnO1xuaW1wb3J0IHsgUGVuZGluZ0ludml0ZXMgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9jb252ZXJzYXRpb24tZGV0YWlscy9QZW5kaW5nSW52aXRlcyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuXG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRUaGVtZSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7XG4gIGdldENvbnZlcnNhdGlvbkJ5SWRTZWxlY3RvcixcbiAgZ2V0Q29udmVyc2F0aW9uQnlVdWlkU2VsZWN0b3IsXG59IGZyb20gJy4uL3NlbGVjdG9ycy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldEdyb3VwTWVtYmVyc2hpcHMgfSBmcm9tICcuLi8uLi91dGlsL2dldEdyb3VwTWVtYmVyc2hpcHMnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuXG5leHBvcnQgdHlwZSBTbWFydFBlbmRpbmdJbnZpdGVzUHJvcHMgPSB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICByZWFkb25seSBhcHByb3ZlUGVuZGluZ01lbWJlcnNoaXA6IChjb252ZXJzYXRpb25pZDogc3RyaW5nKSA9PiB2b2lkO1xuICByZWFkb25seSByZXZva2VQZW5kaW5nTWVtYmVyc2hpcHM6IChtZW1iZXJzaGlwSWRzOiBBcnJheTxzdHJpbmc+KSA9PiB2b2lkO1xufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKFxuICBzdGF0ZTogU3RhdGVUeXBlLFxuICBwcm9wczogU21hcnRQZW5kaW5nSW52aXRlc1Byb3BzXG4pOiBQcm9wc1R5cGUgPT4ge1xuICBjb25zdCBjb252ZXJzYXRpb25TZWxlY3RvciA9IGdldENvbnZlcnNhdGlvbkJ5SWRTZWxlY3RvcihzdGF0ZSk7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbkJ5VXVpZFNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uQnlVdWlkU2VsZWN0b3Ioc3RhdGUpO1xuXG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKHByb3BzLmNvbnZlcnNhdGlvbklkKTtcbiAgYXNzZXJ0KFxuICAgIGNvbnZlcnNhdGlvbixcbiAgICAnPFNtYXJ0UGVuZGluZ0ludml0ZXM+IGV4cGVjdGVkIGEgY29udmVyc2F0aW9uIHRvIGJlIGZvdW5kJ1xuICApO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgLi4uZ2V0R3JvdXBNZW1iZXJzaGlwcyhjb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbkJ5VXVpZFNlbGVjdG9yKSxcbiAgICBjb252ZXJzYXRpb24sXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U6IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3Ioc3RhdGUpLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRQZW5kaW5nSW52aXRlcyA9IHNtYXJ0KFBlbmRpbmdJbnZpdGVzKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBRW5DLDRCQUErQjtBQUcvQixrQkFBa0M7QUFDbEMsb0JBQTBDO0FBQzFDLDJCQUdPO0FBQ1AsaUNBQW9DO0FBQ3BDLG9CQUF1QjtBQVV2QixNQUFNLGtCQUFrQix3QkFDdEIsT0FDQSxVQUNjO0FBQ2QsUUFBTSx1QkFBdUIsc0RBQTRCLEtBQUs7QUFDOUQsUUFBTSw2QkFBNkIsd0RBQThCLEtBQUs7QUFFdEUsUUFBTSxlQUFlLHFCQUFxQixNQUFNLGNBQWM7QUFDOUQsNEJBQ0UsY0FDQSwyREFDRjtBQUVBLFNBQU87QUFBQSxPQUNGO0FBQUEsT0FDQSxvREFBb0IsY0FBYywwQkFBMEI7QUFBQSxJQUMvRDtBQUFBLElBQ0EsbUJBQW1CLDZDQUEwQixLQUFLO0FBQUEsSUFDbEQsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkIsT0FBTywwQkFBUyxLQUFLO0FBQUEsRUFDdkI7QUFDRixHQXJCd0I7QUF1QnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sc0JBQXNCLE1BQU0sb0NBQWM7IiwKICAibmFtZXMiOiBbXQp9Cg==
