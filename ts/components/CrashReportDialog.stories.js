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
var CrashReportDialog_stories_exports = {};
__export(CrashReportDialog_stories_exports, {
  _CrashReportDialog: () => _CrashReportDialog,
  default: () => CrashReportDialog_stories_default
});
module.exports = __toCommonJS(CrashReportDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_CrashReportDialog = require("./CrashReportDialog");
var import_setupI18n = require("../util/setupI18n");
var import_sleep = require("../util/sleep");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var CrashReportDialog_stories_default = {
  title: "Components/CrashReportDialog"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const _CrashReportDialog = /* @__PURE__ */ __name(() => {
  const [isPending, setIsPending] = (0, import_react.useState)(false);
  return /* @__PURE__ */ import_react.default.createElement(import_CrashReportDialog.CrashReportDialog, {
    i18n,
    isPending,
    uploadCrashReports: async () => {
      setIsPending(true);
      (0, import_addon_actions.action)("uploadCrashReports")();
      await (0, import_sleep.sleep)(5e3);
      setIsPending(false);
    },
    eraseCrashReports: (0, import_addon_actions.action)("eraseCrashReports")
  });
}, "_CrashReportDialog");
_CrashReportDialog.story = {
  name: "CrashReportDialog"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _CrashReportDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3Jhc2hSZXBvcnREaWFsb2cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgQ3Jhc2hSZXBvcnREaWFsb2cgfSBmcm9tICcuL0NyYXNoUmVwb3J0RGlhbG9nJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vdXRpbC9zbGVlcCc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ3Jhc2hSZXBvcnREaWFsb2cnLFxufTtcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGNvbnN0IF9DcmFzaFJlcG9ydERpYWxvZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtpc1BlbmRpbmcsIHNldElzUGVuZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q3Jhc2hSZXBvcnREaWFsb2dcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBpc1BlbmRpbmc9e2lzUGVuZGluZ31cbiAgICAgIHVwbG9hZENyYXNoUmVwb3J0cz17YXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc1BlbmRpbmcodHJ1ZSk7XG4gICAgICAgIGFjdGlvbigndXBsb2FkQ3Jhc2hSZXBvcnRzJykoKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoNTAwMCk7XG4gICAgICAgIHNldElzUGVuZGluZyhmYWxzZSk7XG4gICAgICB9fVxuICAgICAgZXJhc2VDcmFzaFJlcG9ydHM9e2FjdGlvbignZXJhc2VDcmFzaFJlcG9ydHMnKX1cbiAgICAvPlxuICApO1xufTtcblxuX0NyYXNoUmVwb3J0RGlhbG9nLnN0b3J5ID0ge1xuICBuYW1lOiAnQ3Jhc2hSZXBvcnREaWFsb2cnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUNoQywyQkFBdUI7QUFFdkIsK0JBQWtDO0FBQ2xDLHVCQUEwQjtBQUMxQixtQkFBc0I7QUFDdEIsc0JBQXVCO0FBRXZCLElBQU8sb0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRWhDLE1BQU0scUJBQXFCLDZCQUFtQjtBQUNuRCxRQUFNLENBQUMsV0FBVyxnQkFBZ0IsMkJBQVMsS0FBSztBQUVoRCxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLG9CQUFvQixZQUFZO0FBQzlCLG1CQUFhLElBQUk7QUFDakIsdUNBQU8sb0JBQW9CLEVBQUU7QUFDN0IsWUFBTSx3QkFBTSxHQUFJO0FBQ2hCLG1CQUFhLEtBQUs7QUFBQSxJQUNwQjtBQUFBLElBQ0EsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUFBLEdBQy9DO0FBRUosR0FoQmtDO0FBa0JsQyxtQkFBbUIsUUFBUTtBQUFBLEVBQ3pCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
