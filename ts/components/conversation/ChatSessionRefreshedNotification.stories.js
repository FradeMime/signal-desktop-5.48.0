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
var ChatSessionRefreshedNotification_stories_exports = {};
__export(ChatSessionRefreshedNotification_stories_exports, {
  Default: () => Default,
  default: () => ChatSessionRefreshedNotification_stories_default
});
module.exports = __toCommonJS(ChatSessionRefreshedNotification_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_ChatSessionRefreshedNotification = require("./ChatSessionRefreshedNotification");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ChatSessionRefreshedNotification_stories_default = {
  title: "Components/Conversation/ChatSessionRefreshedNotification"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ChatSessionRefreshedNotification.ChatSessionRefreshedNotification, {
    contactSupport: (0, import_addon_actions.action)("contactSupport"),
    i18n
  });
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBDaGF0U2Vzc2lvblJlZnJlc2hlZE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDaGF0U2Vzc2lvblJlZnJlc2hlZE5vdGlmaWNhdGlvblxuICAgICAgY29udGFjdFN1cHBvcnQ9e2FjdGlvbignY29udGFjdFN1cHBvcnQnKX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUN2Qiw4Q0FBaUQ7QUFFakQsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxtREFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxVQUFVLDZCQUFtQjtBQUN4QyxTQUNFLG9DQUFDO0FBQUEsSUFDQyxnQkFBZ0IsaUNBQU8sZ0JBQWdCO0FBQUEsSUFDdkM7QUFBQSxHQUNGO0FBRUosR0FQdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
