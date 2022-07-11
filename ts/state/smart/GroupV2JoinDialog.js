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
var GroupV2JoinDialog_exports = {};
__export(GroupV2JoinDialog_exports, {
  SmartGroupV2JoinDialog: () => SmartGroupV2JoinDialog
});
module.exports = __toCommonJS(GroupV2JoinDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_GroupV2JoinDialog = require("../../components/GroupV2JoinDialog");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const preJoinConversation = (0, import_conversations.getPreJoinConversation)(state);
  if (!preJoinConversation) {
    throw new Error("smart/GroupV2JoinDialog: No pre-join conversation!");
  }
  return {
    ...props,
    ...preJoinConversation,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartGroupV2JoinDialog = smart(import_GroupV2JoinDialog.GroupV2JoinDialog);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartGroupV2JoinDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMkpvaW5EaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIGFzIEdyb3VwVjJKb2luRGlhbG9nUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Hcm91cFYySm9pbkRpYWxvZyc7XG5pbXBvcnQgeyBHcm91cFYySm9pbkRpYWxvZyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvR3JvdXBWMkpvaW5EaWFsb2cnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldFByZUpvaW5Db252ZXJzYXRpb24gfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFBpY2s8R3JvdXBWMkpvaW5EaWFsb2dQcm9wc1R5cGUsICdqb2luJyB8ICdvbkNsb3NlJz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgcHJvcHM6IFByb3BzVHlwZVxuKTogR3JvdXBWMkpvaW5EaWFsb2dQcm9wc1R5cGUgPT4ge1xuICBjb25zdCBwcmVKb2luQ29udmVyc2F0aW9uID0gZ2V0UHJlSm9pbkNvbnZlcnNhdGlvbihzdGF0ZSk7XG5cbiAgaWYgKCFwcmVKb2luQ29udmVyc2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzbWFydC9Hcm91cFYySm9pbkRpYWxvZzogTm8gcHJlLWpvaW4gY29udmVyc2F0aW9uIScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICAuLi5wcmVKb2luQ29udmVyc2F0aW9uLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0R3JvdXBWMkpvaW5EaWFsb2cgPSBzbWFydChHcm91cFYySm9pbkRpYWxvZyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUVuQywrQkFBa0M7QUFHbEMsa0JBQXdCO0FBQ3hCLDJCQUF1QztBQUl2QyxNQUFNLGtCQUFrQix3QkFDdEIsT0FDQSxVQUMrQjtBQUMvQixRQUFNLHNCQUFzQixpREFBdUIsS0FBSztBQUV4RCxNQUFJLENBQUMscUJBQXFCO0FBQ3hCLFVBQU0sSUFBSSxNQUFNLG9EQUFvRDtBQUFBLEVBQ3RFO0FBRUEsU0FBTztBQUFBLE9BQ0Y7QUFBQSxPQUNBO0FBQUEsSUFDSCxNQUFNLHlCQUFRLEtBQUs7QUFBQSxFQUNyQjtBQUNGLEdBZndCO0FBaUJ4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLHlCQUF5QixNQUFNLDBDQUFpQjsiLAogICJuYW1lcyI6IFtdCn0K
