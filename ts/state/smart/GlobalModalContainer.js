var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GlobalModalContainer_exports = {};
__export(GlobalModalContainer_exports, {
  SmartGlobalModalContainer: () => SmartGlobalModalContainer
});
module.exports = __toCommonJS(GlobalModalContainer_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_GlobalModalContainer = require("../../components/GlobalModalContainer");
var import_ProfileEditorModal = require("./ProfileEditorModal");
var import_ContactModal = require("./ContactModal");
var import_SafetyNumberModal = require("./SafetyNumberModal");
var import_user = require("../selectors/user");
function renderProfileEditor() {
  return /* @__PURE__ */ import_react.default.createElement(import_ProfileEditorModal.SmartProfileEditorModal, null);
}
function renderContactModal() {
  return /* @__PURE__ */ import_react.default.createElement(import_ContactModal.SmartContactModal, null);
}
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  const i18n = (0, import_user.getIntl)(state);
  return {
    ...state.globalModals,
    i18n,
    renderContactModal,
    renderProfileEditor,
    renderSafetyNumber: () => /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberModal.SmartSafetyNumberModal, {
      contactID: String(state.globalModals.safetyNumberModalContactId)
    })
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartGlobalModalContainer = smart(import_GlobalModalContainer.GlobalModalContainer);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartGlobalModalContainer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR2xvYmFsTW9kYWxDb250YWluZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBHbG9iYWxNb2RhbENvbnRhaW5lciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvR2xvYmFsTW9kYWxDb250YWluZXInO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IFNtYXJ0UHJvZmlsZUVkaXRvck1vZGFsIH0gZnJvbSAnLi9Qcm9maWxlRWRpdG9yTW9kYWwnO1xuaW1wb3J0IHsgU21hcnRDb250YWN0TW9kYWwgfSBmcm9tICcuL0NvbnRhY3RNb2RhbCc7XG5pbXBvcnQgeyBTbWFydFNhZmV0eU51bWJlck1vZGFsIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJNb2RhbCc7XG5cbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5cbmZ1bmN0aW9uIHJlbmRlclByb2ZpbGVFZGl0b3IoKTogSlNYLkVsZW1lbnQge1xuICByZXR1cm4gPFNtYXJ0UHJvZmlsZUVkaXRvck1vZGFsIC8+O1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb250YWN0TW9kYWwoKTogSlNYLkVsZW1lbnQge1xuICByZXR1cm4gPFNtYXJ0Q29udGFjdE1vZGFsIC8+O1xufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSkgPT4ge1xuICBjb25zdCBpMThuID0gZ2V0SW50bChzdGF0ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZS5nbG9iYWxNb2RhbHMsXG4gICAgaTE4bixcbiAgICByZW5kZXJDb250YWN0TW9kYWwsXG4gICAgcmVuZGVyUHJvZmlsZUVkaXRvcixcbiAgICByZW5kZXJTYWZldHlOdW1iZXI6ICgpID0+IChcbiAgICAgIDxTbWFydFNhZmV0eU51bWJlck1vZGFsXG4gICAgICAgIGNvbnRhY3RJRD17U3RyaW5nKHN0YXRlLmdsb2JhbE1vZGFscy5zYWZldHlOdW1iZXJNb2RhbENvbnRhY3RJZCl9XG4gICAgICAvPlxuICAgICksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRHbG9iYWxNb2RhbENvbnRhaW5lciA9IHNtYXJ0KEdsb2JhbE1vZGFsQ29udGFpbmVyKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQyxrQ0FBcUM7QUFFckMsZ0NBQXdDO0FBQ3hDLDBCQUFrQztBQUNsQywrQkFBdUM7QUFFdkMsa0JBQXdCO0FBRXhCLCtCQUE0QztBQUMxQyxTQUFPLG1EQUFDLHVEQUF3QjtBQUNsQztBQUZTLEFBSVQsOEJBQTJDO0FBQ3pDLFNBQU8sbURBQUMsMkNBQWtCO0FBQzVCO0FBRlMsQUFJVCxNQUFNLGtCQUFrQix3QkFBQyxVQUFxQjtBQUM1QyxRQUFNLE9BQU8seUJBQVEsS0FBSztBQUUxQixTQUFPO0FBQUEsT0FDRixNQUFNO0FBQUEsSUFDVDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxvQkFBb0IsTUFDbEIsbURBQUM7QUFBQSxNQUNDLFdBQVcsT0FBTyxNQUFNLGFBQWEsMEJBQTBCO0FBQUEsS0FDakU7QUFBQSxFQUVKO0FBQ0YsR0Fkd0I7QUFnQnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sNEJBQTRCLE1BQU0sZ0RBQW9COyIsCiAgIm5hbWVzIjogW10KfQo=
