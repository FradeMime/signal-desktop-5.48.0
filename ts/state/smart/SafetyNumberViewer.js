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
var SafetyNumberViewer_exports = {};
__export(SafetyNumberViewer_exports, {
  SmartSafetyNumberViewer: () => SmartSafetyNumberViewer
});
module.exports = __toCommonJS(SafetyNumberViewer_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_SafetyNumberViewer = require("../../components/SafetyNumberViewer");
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
const SmartSafetyNumberViewer = smart(import_SafetyNumberViewer.SafetyNumberViewer);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartSafetyNumberViewer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyVmlld2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTYWZldHlOdW1iZXJWaWV3ZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL1NhZmV0eU51bWJlclZpZXdlcic7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBTYWZldHlOdW1iZXJQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nJztcbmltcG9ydCB7IGdldENvbnRhY3RTYWZldHlOdW1iZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvc2FmZXR5TnVtYmVyJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvblNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUsIHByb3BzOiBTYWZldHlOdW1iZXJQcm9wcykgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIC4uLmdldENvbnRhY3RTYWZldHlOdW1iZXIoc3RhdGUsIHByb3BzKSxcbiAgICBjb250YWN0OiBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSkocHJvcHMuY29udGFjdElEKSxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgfTtcbn07XG5cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydFNhZmV0eU51bWJlclZpZXdlciA9IHNtYXJ0KFNhZmV0eU51bWJlclZpZXdlcik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQyxnQ0FBbUM7QUFHbkMsMEJBQXVDO0FBQ3ZDLDJCQUF3QztBQUN4QyxrQkFBd0I7QUFFeEIsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsVUFBNkI7QUFDdEUsU0FBTztBQUFBLE9BQ0Y7QUFBQSxPQUNBLGdEQUF1QixPQUFPLEtBQUs7QUFBQSxJQUN0QyxTQUFTLGtEQUF3QixLQUFLLEVBQUUsTUFBTSxTQUFTO0FBQUEsSUFDdkQsTUFBTSx5QkFBUSxLQUFLO0FBQUEsRUFDckI7QUFDRixHQVB3QjtBQVN4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLDBCQUEwQixNQUFNLDRDQUFrQjsiLAogICJuYW1lcyI6IFtdCn0K
