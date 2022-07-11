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
var TypingBubble_exports = {};
__export(TypingBubble_exports, {
  SmartTypingBubble: () => SmartTypingBubble
});
module.exports = __toCommonJS(TypingBubble_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_TypingBubble = require("../../components/conversation/TypingBubble");
var import_assert = require("../../util/assert");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
var import_badges = require("../selectors/badges");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const { id } = props;
  const conversationSelector = (0, import_conversations.getConversationSelector)(state);
  const conversation = conversationSelector(id);
  if (!conversation) {
    throw new Error(`Did not find conversation ${id} in state!`);
  }
  (0, import_assert.strictAssert)(conversation.typingContactId, "Missing typing contact ID");
  const typingContact = conversationSelector(conversation.typingContactId);
  return {
    ...typingContact,
    badge: (0, import_badges.getPreferredBadgeSelector)(state)(typingContact.badges),
    conversationType: conversation.type,
    i18n: (0, import_user.getIntl)(state),
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartTypingBubble = smart(import_TypingBubble.TypingBubble);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartTypingBubble
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwaW5nQnViYmxlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFR5cGluZ0J1YmJsZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1R5cGluZ0J1YmJsZSc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuXG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRUaGVtZSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvblNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9iYWRnZXMnO1xuXG50eXBlIEV4dGVybmFsUHJvcHMgPSB7XG4gIGlkOiBzdHJpbmc7XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IEV4dGVybmFsUHJvcHMpID0+IHtcbiAgY29uc3QgeyBpZCB9ID0gcHJvcHM7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uU2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSk7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKGlkKTtcbiAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERpZCBub3QgZmluZCBjb252ZXJzYXRpb24gJHtpZH0gaW4gc3RhdGUhYCk7XG4gIH1cblxuICBzdHJpY3RBc3NlcnQoY29udmVyc2F0aW9uLnR5cGluZ0NvbnRhY3RJZCwgJ01pc3NpbmcgdHlwaW5nIGNvbnRhY3QgSUQnKTtcbiAgY29uc3QgdHlwaW5nQ29udGFjdCA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKGNvbnZlcnNhdGlvbi50eXBpbmdDb250YWN0SWQpO1xuXG4gIHJldHVybiB7XG4gICAgLi4udHlwaW5nQ29udGFjdCxcbiAgICBiYWRnZTogZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSkodHlwaW5nQ29udGFjdC5iYWRnZXMpLFxuICAgIGNvbnZlcnNhdGlvblR5cGU6IGNvbnZlcnNhdGlvbi50eXBlLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRUeXBpbmdCdWJibGUgPSBzbWFydChUeXBpbmdCdWJibGUpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMsMEJBQTZCO0FBQzdCLG9CQUE2QjtBQUc3QixrQkFBa0M7QUFDbEMsMkJBQXdDO0FBQ3hDLG9CQUEwQztBQU0xQyxNQUFNLGtCQUFrQix3QkFBQyxPQUFrQixVQUF5QjtBQUNsRSxRQUFNLEVBQUUsT0FBTztBQUVmLFFBQU0sdUJBQXVCLGtEQUF3QixLQUFLO0FBQzFELFFBQU0sZUFBZSxxQkFBcUIsRUFBRTtBQUM1QyxNQUFJLENBQUMsY0FBYztBQUNqQixVQUFNLElBQUksTUFBTSw2QkFBNkIsY0FBYztBQUFBLEVBQzdEO0FBRUEsa0NBQWEsYUFBYSxpQkFBaUIsMkJBQTJCO0FBQ3RFLFFBQU0sZ0JBQWdCLHFCQUFxQixhQUFhLGVBQWU7QUFFdkUsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUNILE9BQU8sNkNBQTBCLEtBQUssRUFBRSxjQUFjLE1BQU07QUFBQSxJQUM1RCxrQkFBa0IsYUFBYTtBQUFBLElBQy9CLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CLE9BQU8sMEJBQVMsS0FBSztBQUFBLEVBQ3ZCO0FBQ0YsR0FuQndCO0FBcUJ4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLG9CQUFvQixNQUFNLGdDQUFZOyIsCiAgIm5hbWVzIjogW10KfQo=
