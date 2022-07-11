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
var ContactModal_exports = {};
__export(ContactModal_exports, {
  SmartContactModal: () => SmartContactModal
});
module.exports = __toCommonJS(ContactModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_ContactModal = require("../../components/conversation/ContactModal");
var import_items = require("../selectors/items");
var import_user = require("../selectors/user");
var import_badges = require("../selectors/badges");
var import_conversations = require("../selectors/conversations");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  const { contactId, conversationId } = state.globalModals.contactModalState || {};
  const currentConversation = (0, import_conversations.getConversationSelector)(state)(conversationId);
  const contact = (0, import_conversations.getConversationSelector)(state)(contactId);
  const areWeAdmin = currentConversation && currentConversation.areWeAdmin ? currentConversation.areWeAdmin : false;
  let isMember = false;
  let isAdmin = false;
  if (contact && currentConversation && currentConversation.memberships) {
    currentConversation.memberships.forEach((membership) => {
      if (membership.uuid === contact.uuid) {
        isMember = true;
        isAdmin = membership.isAdmin;
      }
    });
  }
  return {
    areWeASubscriber: (0, import_items.getAreWeASubscriber)(state),
    areWeAdmin,
    badges: (0, import_badges.getBadgesSelector)(state)(contact.badges),
    contact,
    conversation: currentConversation,
    i18n: (0, import_user.getIntl)(state),
    isAdmin,
    isMember,
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartContactModal = smart(import_ContactModal.ContactModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartContactModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdE1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL0NvbnRhY3RNb2RhbCc7XG5pbXBvcnQgeyBDb250YWN0TW9kYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9Db250YWN0TW9kYWwnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuaW1wb3J0IHsgZ2V0QXJlV2VBU3Vic2NyaWJlciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pdGVtcyc7XG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRUaGVtZSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldEJhZGdlc1NlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25TZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9jb252ZXJzYXRpb25zJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUpOiBQcm9wc0RhdGFUeXBlID0+IHtcbiAgY29uc3QgeyBjb250YWN0SWQsIGNvbnZlcnNhdGlvbklkIH0gPVxuICAgIHN0YXRlLmdsb2JhbE1vZGFscy5jb250YWN0TW9kYWxTdGF0ZSB8fCB7fTtcblxuICBjb25zdCBjdXJyZW50Q29udmVyc2F0aW9uID0gZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3Ioc3RhdGUpKGNvbnZlcnNhdGlvbklkKTtcbiAgY29uc3QgY29udGFjdCA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKShjb250YWN0SWQpO1xuXG4gIGNvbnN0IGFyZVdlQWRtaW4gPVxuICAgIGN1cnJlbnRDb252ZXJzYXRpb24gJiYgY3VycmVudENvbnZlcnNhdGlvbi5hcmVXZUFkbWluXG4gICAgICA/IGN1cnJlbnRDb252ZXJzYXRpb24uYXJlV2VBZG1pblxuICAgICAgOiBmYWxzZTtcblxuICBsZXQgaXNNZW1iZXIgPSBmYWxzZTtcbiAgbGV0IGlzQWRtaW4gPSBmYWxzZTtcbiAgaWYgKGNvbnRhY3QgJiYgY3VycmVudENvbnZlcnNhdGlvbiAmJiBjdXJyZW50Q29udmVyc2F0aW9uLm1lbWJlcnNoaXBzKSB7XG4gICAgY3VycmVudENvbnZlcnNhdGlvbi5tZW1iZXJzaGlwcy5mb3JFYWNoKG1lbWJlcnNoaXAgPT4ge1xuICAgICAgaWYgKG1lbWJlcnNoaXAudXVpZCA9PT0gY29udGFjdC51dWlkKSB7XG4gICAgICAgIGlzTWVtYmVyID0gdHJ1ZTtcbiAgICAgICAgaXNBZG1pbiA9IG1lbWJlcnNoaXAuaXNBZG1pbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJlV2VBU3Vic2NyaWJlcjogZ2V0QXJlV2VBU3Vic2NyaWJlcihzdGF0ZSksXG4gICAgYXJlV2VBZG1pbixcbiAgICBiYWRnZXM6IGdldEJhZGdlc1NlbGVjdG9yKHN0YXRlKShjb250YWN0LmJhZGdlcyksXG4gICAgY29udGFjdCxcbiAgICBjb252ZXJzYXRpb246IGN1cnJlbnRDb252ZXJzYXRpb24sXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgaXNBZG1pbixcbiAgICBpc01lbWJlcixcbiAgICB0aGVtZTogZ2V0VGhlbWUoc3RhdGUpLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0Q29udGFjdE1vZGFsID0gc21hcnQoQ29udGFjdE1vZGFsKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBRW5DLDBCQUE2QjtBQUc3QixtQkFBb0M7QUFDcEMsa0JBQWtDO0FBQ2xDLG9CQUFrQztBQUNsQywyQkFBd0M7QUFFeEMsTUFBTSxrQkFBa0Isd0JBQUMsVUFBb0M7QUFDM0QsUUFBTSxFQUFFLFdBQVcsbUJBQ2pCLE1BQU0sYUFBYSxxQkFBcUIsQ0FBQztBQUUzQyxRQUFNLHNCQUFzQixrREFBd0IsS0FBSyxFQUFFLGNBQWM7QUFDekUsUUFBTSxVQUFVLGtEQUF3QixLQUFLLEVBQUUsU0FBUztBQUV4RCxRQUFNLGFBQ0osdUJBQXVCLG9CQUFvQixhQUN2QyxvQkFBb0IsYUFDcEI7QUFFTixNQUFJLFdBQVc7QUFDZixNQUFJLFVBQVU7QUFDZCxNQUFJLFdBQVcsdUJBQXVCLG9CQUFvQixhQUFhO0FBQ3JFLHdCQUFvQixZQUFZLFFBQVEsZ0JBQWM7QUFDcEQsVUFBSSxXQUFXLFNBQVMsUUFBUSxNQUFNO0FBQ3BDLG1CQUFXO0FBQ1gsa0JBQVUsV0FBVztBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU87QUFBQSxJQUNMLGtCQUFrQixzQ0FBb0IsS0FBSztBQUFBLElBQzNDO0FBQUEsSUFDQSxRQUFRLHFDQUFrQixLQUFLLEVBQUUsUUFBUSxNQUFNO0FBQUEsSUFDL0M7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTywwQkFBUyxLQUFLO0FBQUEsRUFDdkI7QUFDRixHQWxDd0I7QUFvQ3hCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sb0JBQW9CLE1BQU0sZ0NBQVk7IiwKICAibmFtZXMiOiBbXQp9Cg==
