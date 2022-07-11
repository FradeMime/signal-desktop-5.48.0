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
var ChatSessionRefreshedDialog_stories_exports = {};
__export(ChatSessionRefreshedDialog_stories_exports, {
  Default: () => Default,
  default: () => ChatSessionRefreshedDialog_stories_default
});
module.exports = __toCommonJS(ChatSessionRefreshedDialog_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_ChatSessionRefreshedDialog = require("./ChatSessionRefreshedDialog");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ChatSessionRefreshedDialog_stories_default = {
  title: "Components/Conversation/ChatSessionRefreshedDialog"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ChatSessionRefreshedDialog.ChatSessionRefreshedDialog, {
    contactSupport: (0, import_addon_actions.action)("contactSupport"),
    onClose: (0, import_addon_actions.action)("onClose"),
    i18n
  });
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdFNlc3Npb25SZWZyZXNoZWREaWFsb2cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBDaGF0U2Vzc2lvblJlZnJlc2hlZERpYWxvZyB9IGZyb20gJy4vQ2hhdFNlc3Npb25SZWZyZXNoZWREaWFsb2cnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ2hhdFNlc3Npb25SZWZyZXNoZWREaWFsb2cnLFxufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDaGF0U2Vzc2lvblJlZnJlc2hlZERpYWxvZ1xuICAgICAgY29udGFjdFN1cHBvcnQ9e2FjdGlvbignY29udGFjdFN1cHBvcnQnKX1cbiAgICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAgICAgaTE4bj17aTE4bn1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLHdDQUEyQztBQUUzQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDZDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFNBQ0Usb0NBQUM7QUFBQSxJQUNDLGdCQUFnQixpQ0FBTyxnQkFBZ0I7QUFBQSxJQUN2QyxTQUFTLGlDQUFPLFNBQVM7QUFBQSxJQUN6QjtBQUFBLEdBQ0Y7QUFFSixHQVJ1QjsiLAogICJuYW1lcyI6IFtdCn0K
