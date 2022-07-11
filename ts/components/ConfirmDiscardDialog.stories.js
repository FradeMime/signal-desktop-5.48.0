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
var ConfirmDiscardDialog_stories_exports = {};
__export(ConfirmDiscardDialog_stories_exports, {
  Default: () => Default,
  default: () => ConfirmDiscardDialog_stories_default
});
module.exports = __toCommonJS(ConfirmDiscardDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_ConfirmDiscardDialog = require("./ConfirmDiscardDialog");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name(() => ({
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  onDiscard: (0, import_addon_actions.action)("onDiscard")
}), "createProps");
var ConfirmDiscardDialog_stories_default = {
  title: "Components/ConfirmDiscardDialog"
};
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ConfirmDiscardDialog.ConfirmDiscardDialog, {
  ...createProps()
}), "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybURpc2NhcmREaWFsb2cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQ29uZmlybURpc2NhcmREaWFsb2cnO1xuaW1wb3J0IHsgQ29uZmlybURpc2NhcmREaWFsb2cgfSBmcm9tICcuL0NvbmZpcm1EaXNjYXJkRGlhbG9nJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoKTogUHJvcHNUeXBlID0+ICh7XG4gIGkxOG4sXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICBvbkRpc2NhcmQ6IGFjdGlvbignb25EaXNjYXJkJyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29uZmlybURpc2NhcmREaWFsb2cnLFxufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29uZmlybURpc2NhcmREaWFsb2cgey4uLmNyZWF0ZVByb3BzKCl9IC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUN2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBR3ZCLGtDQUFxQztBQUVyQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGNBQWMsNkJBQWtCO0FBQUEsRUFDcEM7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLFdBQVcsaUNBQU8sV0FBVztBQUMvQixJQUpvQjtBQU1wQixJQUFPLHVDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQ3JCLG1EQUFDO0FBQUEsS0FBeUIsWUFBWTtBQUFBLENBQUcsR0FEcEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
