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
var ConversationNotificationsSettings_exports = {};
__export(ConversationNotificationsSettings_exports, {
  SmartConversationNotificationsSettings: () => SmartConversationNotificationsSettings
});
module.exports = __toCommonJS(ConversationNotificationsSettings_exports);
var import_react_redux = require("react-redux");
var import_ConversationNotificationsSettings = require("../../components/conversation/conversation-details/ConversationNotificationsSettings");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
var import_assert = require("../../util/assert");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const { conversationId, setDontNotifyForMentionsIfMuted, setMuteExpiration } = props;
  const conversationSelector = (0, import_conversations.getConversationByIdSelector)(state);
  const conversation = conversationSelector(conversationId);
  (0, import_assert.strictAssert)(conversation, "Expected a conversation to be found");
  return {
    conversationType: conversation.type,
    dontNotifyForMentionsIfMuted: Boolean(conversation.dontNotifyForMentionsIfMuted),
    i18n: (0, import_user.getIntl)(state),
    muteExpiresAt: conversation.muteExpiresAt,
    setDontNotifyForMentionsIfMuted,
    setMuteExpiration
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, {});
const SmartConversationNotificationsSettings = smart(import_ConversationNotificationsSettings.ConversationNotificationsSettings);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartConversationNotificationsSettings
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uQnlJZFNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuXG5leHBvcnQgdHlwZSBPd25Qcm9wcyA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgc2V0RG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZDogKFxuICAgIGRvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQ6IGJvb2xlYW5cbiAgKSA9PiB1bmtub3duO1xuICBzZXRNdXRlRXhwaXJhdGlvbjogKG11dGVFeHBpcmVzQXQ6IHVuZGVmaW5lZCB8IG51bWJlcikgPT4gdW5rbm93bjtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGVUeXBlLCBwcm9wczogT3duUHJvcHMpID0+IHtcbiAgY29uc3QgeyBjb252ZXJzYXRpb25JZCwgc2V0RG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZCwgc2V0TXV0ZUV4cGlyYXRpb24gfSA9XG4gICAgcHJvcHM7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uU2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25CeUlkU2VsZWN0b3Ioc3RhdGUpO1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBjb252ZXJzYXRpb25TZWxlY3Rvcihjb252ZXJzYXRpb25JZCk7XG4gIHN0cmljdEFzc2VydChjb252ZXJzYXRpb24sICdFeHBlY3RlZCBhIGNvbnZlcnNhdGlvbiB0byBiZSBmb3VuZCcpO1xuXG4gIHJldHVybiB7XG4gICAgY29udmVyc2F0aW9uVHlwZTogY29udmVyc2F0aW9uLnR5cGUsXG4gICAgZG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZDogQm9vbGVhbihcbiAgICAgIGNvbnZlcnNhdGlvbi5kb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkXG4gICAgKSxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICBtdXRlRXhwaXJlc0F0OiBjb252ZXJzYXRpb24ubXV0ZUV4cGlyZXNBdCxcbiAgICBzZXREb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkLFxuICAgIHNldE11dGVFeHBpcmF0aW9uLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge30pO1xuXG5leHBvcnQgY29uc3QgU21hcnRDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3MgPSBzbWFydChcbiAgQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QiwrQ0FBa0Q7QUFFbEQsa0JBQXdCO0FBQ3hCLDJCQUE0QztBQUM1QyxvQkFBNkI7QUFVN0IsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsVUFBb0I7QUFDN0QsUUFBTSxFQUFFLGdCQUFnQixpQ0FBaUMsc0JBQ3ZEO0FBRUYsUUFBTSx1QkFBdUIsc0RBQTRCLEtBQUs7QUFDOUQsUUFBTSxlQUFlLHFCQUFxQixjQUFjO0FBQ3hELGtDQUFhLGNBQWMscUNBQXFDO0FBRWhFLFNBQU87QUFBQSxJQUNMLGtCQUFrQixhQUFhO0FBQUEsSUFDL0IsOEJBQThCLFFBQzVCLGFBQWEsNEJBQ2Y7QUFBQSxJQUNBLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CLGVBQWUsYUFBYTtBQUFBLElBQzVCO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRixHQWxCd0I7QUFvQnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsQ0FBQyxDQUFDO0FBRWxDLE1BQU0seUNBQXlDLE1BQ3BELDBFQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
