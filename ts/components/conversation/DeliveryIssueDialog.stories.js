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
var DeliveryIssueDialog_stories_exports = {};
__export(DeliveryIssueDialog_stories_exports, {
  Default: () => Default,
  InGroup: () => InGroup,
  default: () => DeliveryIssueDialog_stories_default
});
module.exports = __toCommonJS(DeliveryIssueDialog_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_DeliveryIssueDialog = require("./DeliveryIssueDialog");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const sender = (0, import_getDefaultConversation.getDefaultConversation)();
var DeliveryIssueDialog_stories_default = {
  title: "Components/Conversation/DeliveryIssueDialog"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_DeliveryIssueDialog.DeliveryIssueDialog, {
    i18n,
    sender,
    inGroup: false,
    learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
    onClose: (0, import_addon_actions.action)("onClose")
  });
}, "Default");
const InGroup = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_DeliveryIssueDialog.DeliveryIssueDialog, {
    i18n,
    sender,
    inGroup: true,
    learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
    onClose: (0, import_addon_actions.action)("onClose")
  });
}, "InGroup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  InGroup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGVsaXZlcnlJc3N1ZURpYWxvZy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IERlbGl2ZXJ5SXNzdWVEaWFsb2cgfSBmcm9tICcuL0RlbGl2ZXJ5SXNzdWVEaWFsb2cnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuY29uc3Qgc2VuZGVyID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vRGVsaXZlcnlJc3N1ZURpYWxvZycsXG59O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPERlbGl2ZXJ5SXNzdWVEaWFsb2dcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBzZW5kZXI9e3NlbmRlcn1cbiAgICAgIGluR3JvdXA9e2ZhbHNlfVxuICAgICAgbGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlPXthY3Rpb24oJ2xlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZScpfVxuICAgICAgb25DbG9zZT17YWN0aW9uKCdvbkNsb3NlJyl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbkdyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8RGVsaXZlcnlJc3N1ZURpYWxvZ1xuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIHNlbmRlcj17c2VuZGVyfVxuICAgICAgaW5Hcm91cFxuICAgICAgbGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlPXthY3Rpb24oJ2xlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZScpfVxuICAgICAgb25DbG9zZT17YWN0aW9uKCdvbkNsb3NlJyl9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLGlDQUFvQztBQUNwQyxvQ0FBdUM7QUFFdkMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFDdkMsTUFBTSxTQUFTLDBEQUF1QjtBQUV0QyxJQUFPLHNDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsNkJBQTZCLGlDQUFPLDZCQUE2QjtBQUFBLElBQ2pFLFNBQVMsaUNBQU8sU0FBUztBQUFBLEdBQzNCO0FBRUosR0FWdUI7QUFZaEIsTUFBTSxVQUFVLDZCQUFtQjtBQUN4QyxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQU87QUFBQSxJQUNQLDZCQUE2QixpQ0FBTyw2QkFBNkI7QUFBQSxJQUNqRSxTQUFTLGlDQUFPLFNBQVM7QUFBQSxHQUMzQjtBQUVKLEdBVnVCOyIsCiAgIm5hbWVzIjogW10KfQo=
