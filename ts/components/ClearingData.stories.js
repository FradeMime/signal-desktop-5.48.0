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
var ClearingData_stories_exports = {};
__export(ClearingData_stories_exports, {
  _ClearingData: () => _ClearingData,
  default: () => ClearingData_stories_default
});
module.exports = __toCommonJS(ClearingData_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_ClearingData = require("./ClearingData");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ClearingData_stories_default = {
  title: "Components/ClearingData"
};
const _ClearingData = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ClearingData.ClearingData, {
  deleteAllData: (0, import_addon_actions.action)("deleteAllData"),
  i18n
}), "_ClearingData");
_ClearingData.story = {
  name: "Clearing data"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ClearingData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2xlYXJpbmdEYXRhLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHsgQ2xlYXJpbmdEYXRhIH0gZnJvbSAnLi9DbGVhcmluZ0RhdGEnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DbGVhcmluZ0RhdGEnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9DbGVhcmluZ0RhdGEgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2xlYXJpbmdEYXRhIGRlbGV0ZUFsbERhdGE9e2FjdGlvbignZGVsZXRlQWxsRGF0YScpfSBpMThuPXtpMThufSAvPlxuKTtcblxuX0NsZWFyaW5nRGF0YS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NsZWFyaW5nIGRhdGEnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwyQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwwQkFBNkI7QUFFN0IsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTywrQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxnQkFBZ0IsNkJBQzNCLG1EQUFDO0FBQUEsRUFBYSxlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUFHO0FBQUEsQ0FBWSxHQUR2QztBQUk3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
