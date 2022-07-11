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
var UnsupportedMessage_exports = {};
__export(UnsupportedMessage_exports, {
  UnsupportedMessage: () => UnsupportedMessage
});
module.exports = __toCommonJS(UnsupportedMessage_exports);
var import_react = __toESM(require("react"));
var import_SystemMessage = require("./SystemMessage");
var import_Button = require("../Button");
var import_ContactName = require("./ContactName");
var import_Intl = require("../Intl");
const UnsupportedMessage = /* @__PURE__ */ __name(({
  canProcessNow,
  contact,
  i18n,
  downloadNewVersion
}) => {
  const { isMe } = contact;
  const otherStringId = canProcessNow ? "Message--unsupported-message-ask-to-resend" : "Message--unsupported-message";
  const meStringId = canProcessNow ? "Message--from-me-unsupported-message-ask-to-resend" : "Message--from-me-unsupported-message";
  const stringId = isMe ? meStringId : otherStringId;
  const icon = canProcessNow ? "unsupported--can-process" : "unsupported";
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    icon,
    contents: /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      id: stringId,
      components: [
        /* @__PURE__ */ import_react.default.createElement("span", {
          key: "external-1",
          className: "module-unsupported-message__contact"
        }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
          title: contact.title,
          module: "module-unsupported-message__contact"
        }))
      ],
      i18n
    }),
    button: canProcessNow ? void 0 : /* @__PURE__ */ import_react.default.createElement("div", {
      className: "SystemMessage__line"
    }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: () => {
        downloadNewVersion();
      },
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("Message--update-signal")))
  });
}, "UnsupportedMessage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UnsupportedMessage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVW5zdXBwb3J0ZWRNZXNzYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFN5c3RlbU1lc3NhZ2UgfSBmcm9tICcuL1N5c3RlbU1lc3NhZ2UnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25TaXplLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi4vQnV0dG9uJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi4vSW50bCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgQ29udGFjdFR5cGUgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xuICBwcm9maWxlTmFtZT86IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgaXNNZTogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YSA9IHtcbiAgY2FuUHJvY2Vzc05vdzogYm9vbGVhbjtcbiAgY29udGFjdDogQ29udGFjdFR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc0FjdGlvbnMgPSB7XG4gIGRvd25sb2FkTmV3VmVyc2lvbjogKCkgPT4gdW5rbm93bjtcbn07XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmcgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nICYgUHJvcHNBY3Rpb25zO1xuXG5leHBvcnQgY29uc3QgVW5zdXBwb3J0ZWRNZXNzYWdlID0gKHtcbiAgY2FuUHJvY2Vzc05vdyxcbiAgY29udGFjdCxcbiAgaTE4bixcbiAgZG93bmxvYWROZXdWZXJzaW9uLFxufTogUHJvcHMpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHsgaXNNZSB9ID0gY29udGFjdDtcblxuICBjb25zdCBvdGhlclN0cmluZ0lkID0gY2FuUHJvY2Vzc05vd1xuICAgID8gJ01lc3NhZ2UtLXVuc3VwcG9ydGVkLW1lc3NhZ2UtYXNrLXRvLXJlc2VuZCdcbiAgICA6ICdNZXNzYWdlLS11bnN1cHBvcnRlZC1tZXNzYWdlJztcbiAgY29uc3QgbWVTdHJpbmdJZCA9IGNhblByb2Nlc3NOb3dcbiAgICA/ICdNZXNzYWdlLS1mcm9tLW1lLXVuc3VwcG9ydGVkLW1lc3NhZ2UtYXNrLXRvLXJlc2VuZCdcbiAgICA6ICdNZXNzYWdlLS1mcm9tLW1lLXVuc3VwcG9ydGVkLW1lc3NhZ2UnO1xuICBjb25zdCBzdHJpbmdJZCA9IGlzTWUgPyBtZVN0cmluZ0lkIDogb3RoZXJTdHJpbmdJZDtcbiAgY29uc3QgaWNvbiA9IGNhblByb2Nlc3NOb3cgPyAndW5zdXBwb3J0ZWQtLWNhbi1wcm9jZXNzJyA6ICd1bnN1cHBvcnRlZCc7XG5cbiAgcmV0dXJuIChcbiAgICA8U3lzdGVtTWVzc2FnZVxuICAgICAgaWNvbj17aWNvbn1cbiAgICAgIGNvbnRlbnRzPXtcbiAgICAgICAgPEludGxcbiAgICAgICAgICBpZD17c3RyaW5nSWR9XG4gICAgICAgICAgY29tcG9uZW50cz17W1xuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAga2V5PVwiZXh0ZXJuYWwtMVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS11bnN1cHBvcnRlZC1tZXNzYWdlX19jb250YWN0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgICAgICAgdGl0bGU9e2NvbnRhY3QudGl0bGV9XG4gICAgICAgICAgICAgICAgbW9kdWxlPVwibW9kdWxlLXVuc3VwcG9ydGVkLW1lc3NhZ2VfX2NvbnRhY3RcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9zcGFuPixcbiAgICAgICAgICBdfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIC8+XG4gICAgICB9XG4gICAgICBidXR0b249e1xuICAgICAgICBjYW5Qcm9jZXNzTm93ID8gdW5kZWZpbmVkIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3lzdGVtTWVzc2FnZV9fbGluZVwiPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG93bmxvYWROZXdWZXJzaW9uKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHNpemU9e0J1dHRvblNpemUuU21hbGx9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU3lzdGVtTWVzc2FnZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2kxOG4oJ01lc3NhZ2UtLXVwZGF0ZS1zaWduYWwnKX1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgICB9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUE4QjtBQUM5QixvQkFBa0Q7QUFDbEQseUJBQTRCO0FBQzVCLGtCQUFxQjtBQTJCZCxNQUFNLHFCQUFxQix3QkFBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDd0I7QUFDeEIsUUFBTSxFQUFFLFNBQVM7QUFFakIsUUFBTSxnQkFBZ0IsZ0JBQ2xCLCtDQUNBO0FBQ0osUUFBTSxhQUFhLGdCQUNmLHVEQUNBO0FBQ0osUUFBTSxXQUFXLE9BQU8sYUFBYTtBQUNyQyxRQUFNLE9BQU8sZ0JBQWdCLDZCQUE2QjtBQUUxRCxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsVUFDRSxtREFBQztBQUFBLE1BQ0MsSUFBSTtBQUFBLE1BQ0osWUFBWTtBQUFBLFFBQ1YsbURBQUM7QUFBQSxVQUNDLEtBQUk7QUFBQSxVQUNKLFdBQVU7QUFBQSxXQUVWLG1EQUFDO0FBQUEsVUFDQyxPQUFPLFFBQVE7QUFBQSxVQUNmLFFBQU87QUFBQSxTQUNULENBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLEtBQ0Y7QUFBQSxJQUVGLFFBQ0UsZ0JBQWdCLFNBQ2QsbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxPQUNiLG1EQUFDO0FBQUEsTUFDQyxTQUFTLE1BQU07QUFDYiwyQkFBbUI7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsTUFBTSx5QkFBVztBQUFBLE1BQ2pCLFNBQVMsNEJBQWM7QUFBQSxPQUV0QixLQUFLLHdCQUF3QixDQUNoQyxDQUNGO0FBQUEsR0FHTjtBQUVKLEdBdERrQzsiLAogICJuYW1lcyI6IFtdCn0K
