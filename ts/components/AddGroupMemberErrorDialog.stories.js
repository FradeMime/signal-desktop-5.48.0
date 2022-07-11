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
var AddGroupMemberErrorDialog_stories_exports = {};
__export(AddGroupMemberErrorDialog_stories_exports, {
  MaximumRecommendedGroupSize: () => MaximumRecommendedGroupSize,
  _MaximumGroupSize: () => _MaximumGroupSize,
  default: () => AddGroupMemberErrorDialog_stories_default
});
module.exports = __toCommonJS(AddGroupMemberErrorDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_AddGroupMemberErrorDialog = require("./AddGroupMemberErrorDialog");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var AddGroupMemberErrorDialog_stories_default = {
  title: "Components/AddGroupMemberErrorDialog"
};
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
};
const _MaximumGroupSize = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialog, {
  ...defaultProps,
  mode: import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialogMode.MaximumGroupSize,
  maximumNumberOfContacts: 123
}), "_MaximumGroupSize");
_MaximumGroupSize.story = {
  name: "Maximum group size"
};
const MaximumRecommendedGroupSize = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialog, {
  ...defaultProps,
  mode: import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialogMode.RecommendedMaximumGroupSize,
  recommendedMaximumNumberOfContacts: 123
}), "MaximumRecommendedGroupSize");
MaximumRecommendedGroupSize.story = {
  name: "Maximum recommended group size"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MaximumRecommendedGroupSize,
  _MaximumGroupSize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHtcbiAgQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZyxcbiAgQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZ01vZGUsXG59IGZyb20gJy4vQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZyc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0FkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2cnLFxufTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbn07XG5cbmV4cG9ydCBjb25zdCBfTWF4aW11bUdyb3VwU2l6ZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBZGRHcm91cE1lbWJlckVycm9yRGlhbG9nXG4gICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICBtb2RlPXtBZGRHcm91cE1lbWJlckVycm9yRGlhbG9nTW9kZS5NYXhpbXVtR3JvdXBTaXplfVxuICAgIG1heGltdW1OdW1iZXJPZkNvbnRhY3RzPXsxMjN9XG4gIC8+XG4pO1xuXG5fTWF4aW11bUdyb3VwU2l6ZS5zdG9yeSA9IHtcbiAgbmFtZTogJ01heGltdW0gZ3JvdXAgc2l6ZScsXG59O1xuXG5leHBvcnQgY29uc3QgTWF4aW11bVJlY29tbWVuZGVkR3JvdXBTaXplID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEFkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2dcbiAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgIG1vZGU9e0FkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2dNb2RlLlJlY29tbWVuZGVkTWF4aW11bUdyb3VwU2l6ZX1cbiAgICByZWNvbW1lbmRlZE1heGltdW1OdW1iZXJPZkNvbnRhY3RzPXsxMjN9XG4gIC8+XG4pO1xuXG5NYXhpbXVtUmVjb21tZW5kZWRHcm91cFNpemUuc3RvcnkgPSB7XG4gIG5hbWU6ICdNYXhpbXVtIHJlY29tbWVuZGVkIGdyb3VwIHNpemUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLHVDQUdPO0FBRVAsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyw0Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxlQUFlO0FBQUEsRUFDbkI7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUMzQjtBQUVPLE1BQU0sb0JBQW9CLDZCQUMvQixtREFBQztBQUFBLEtBQ0s7QUFBQSxFQUNKLE1BQU0sK0RBQThCO0FBQUEsRUFDcEMseUJBQXlCO0FBQUEsQ0FDM0IsR0FMK0I7QUFRakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7QUFFTyxNQUFNLDhCQUE4Qiw2QkFDekMsbURBQUM7QUFBQSxLQUNLO0FBQUEsRUFDSixNQUFNLCtEQUE4QjtBQUFBLEVBQ3BDLG9DQUFvQztBQUFBLENBQ3RDLEdBTHlDO0FBUTNDLDRCQUE0QixRQUFRO0FBQUEsRUFDbEMsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
