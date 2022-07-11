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
var SafetyNumberModal_exports = {};
__export(SafetyNumberModal_exports, {
  SmartSafetyNumberModal: () => SmartSafetyNumberModal
});
module.exports = __toCommonJS(SafetyNumberModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_SafetyNumberModal = require("../../components/SafetyNumberModal");
var import_safetyNumber = require("../selectors/safetyNumber");
var import_conversations = require("../selectors/conversations");
var import_user = require("../selectors/user");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  return {
    ...props,
    ...(0, import_safetyNumber.getContactSafetyNumber)(state, props),
    contact: (0, import_conversations.getConversationSelector)(state)(props.contactID),
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartSafetyNumberModal = smart(import_SafetyNumberModal.SafetyNumberModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartSafetyNumberModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFNhZmV0eU51bWJlck1vZGFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9TYWZldHlOdW1iZXJNb2RhbCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgZ2V0Q29udGFjdFNhZmV0eU51bWJlciB9IGZyb20gJy4uL3NlbGVjdG9ycy9zYWZldHlOdW1iZXInO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY29udGFjdElEOiBzdHJpbmc7XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IFByb3BzKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgLi4uZ2V0Q29udGFjdFNhZmV0eU51bWJlcihzdGF0ZSwgcHJvcHMpLFxuICAgIGNvbnRhY3Q6IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKShwcm9wcy5jb250YWN0SUQpLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0U2FmZXR5TnVtYmVyTW9kYWwgPSBzbWFydChTYWZldHlOdW1iZXJNb2RhbCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQywrQkFBa0M7QUFFbEMsMEJBQXVDO0FBQ3ZDLDJCQUF3QztBQUN4QyxrQkFBd0I7QUFNeEIsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsVUFBaUI7QUFDMUQsU0FBTztBQUFBLE9BQ0Y7QUFBQSxPQUNBLGdEQUF1QixPQUFPLEtBQUs7QUFBQSxJQUN0QyxTQUFTLGtEQUF3QixLQUFLLEVBQUUsTUFBTSxTQUFTO0FBQUEsSUFDdkQsTUFBTSx5QkFBUSxLQUFLO0FBQUEsRUFDckI7QUFDRixHQVB3QjtBQVN4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLHlCQUF5QixNQUFNLDBDQUFpQjsiLAogICJuYW1lcyI6IFtdCn0K
