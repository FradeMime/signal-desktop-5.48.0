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
var ToastConversationArchived_exports = {};
__export(ToastConversationArchived_exports, {
  ToastConversationArchived: () => ToastConversationArchived
});
module.exports = __toCommonJS(ToastConversationArchived_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastConversationArchived = /* @__PURE__ */ __name(({
  i18n,
  onClose,
  undo
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    toastAction: {
      label: i18n("conversationArchivedUndo"),
      onClick: () => {
        undo();
        onClose();
      }
    },
    onClose
  }, i18n("conversationArchived"));
}, "ToastConversationArchived");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastConversationArchived
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL1RvYXN0JztcblxuZXhwb3J0IHR5cGUgVG9hc3RQcm9wc1R5cGUgPSB7XG4gIHVuZG86ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG59ICYgVG9hc3RQcm9wc1R5cGU7XG5cbmV4cG9ydCBjb25zdCBUb2FzdENvbnZlcnNhdGlvbkFyY2hpdmVkID0gKHtcbiAgaTE4bixcbiAgb25DbG9zZSxcbiAgdW5kbyxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VG9hc3RcbiAgICAgIHRvYXN0QWN0aW9uPXt7XG4gICAgICAgIGxhYmVsOiBpMThuKCdjb252ZXJzYXRpb25BcmNoaXZlZFVuZG8nKSxcbiAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgIHVuZG8oKTtcbiAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH0sXG4gICAgICB9fVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICA+XG4gICAgICB7aTE4bignY29udmVyc2F0aW9uQXJjaGl2ZWQnKX1cbiAgICA8L1RvYXN0PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsbUJBQXNCO0FBV2YsTUFBTSw0QkFBNEIsd0JBQUM7QUFBQSxFQUN4QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsU0FDRSxtREFBQztBQUFBLElBQ0MsYUFBYTtBQUFBLE1BQ1gsT0FBTyxLQUFLLDBCQUEwQjtBQUFBLE1BQ3RDLFNBQVMsTUFBTTtBQUNiLGFBQUs7QUFDTCxnQkFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLEtBRUMsS0FBSyxzQkFBc0IsQ0FDOUI7QUFFSixHQW5CeUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
