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
var SafetyNumberNotification_exports = {};
__export(SafetyNumberNotification_exports, {
  SafetyNumberNotification: () => SafetyNumberNotification
});
module.exports = __toCommonJS(SafetyNumberNotification_exports);
var import_react = __toESM(require("react"));
var import_Button = require("../Button");
var import_SystemMessage = require("./SystemMessage");
var import_ContactName = require("./ContactName");
var import_Intl = require("../Intl");
const SafetyNumberNotification = /* @__PURE__ */ __name(({
  contact,
  isGroup,
  i18n,
  showIdentity
}) => {
  const changeKey = isGroup ? "safetyNumberChangedGroup" : "safetyNumberChanged";
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    icon: "safety-number",
    contents: /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      id: changeKey,
      components: [
        /* @__PURE__ */ import_react.default.createElement("span", {
          key: "external-1",
          className: "module-safety-number-notification__contact"
        }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
          title: contact.title,
          module: "module-safety-number-notification__contact"
        }))
      ],
      i18n
    }),
    button: /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: () => {
        showIdentity(contact.id);
      },
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("verifyNewNumber"))
  });
}, "SafetyNumberNotification");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SafetyNumberNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uU2l6ZSwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uL0J1dHRvbic7XG5pbXBvcnQgeyBTeXN0ZW1NZXNzYWdlIH0gZnJvbSAnLi9TeXN0ZW1NZXNzYWdlJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi4vSW50bCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgQ29udGFjdFR5cGUgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGEgPSB7XG4gIGlzR3JvdXA6IGJvb2xlYW47XG4gIGNvbnRhY3Q6IENvbnRhY3RUeXBlO1xufTtcblxudHlwZSBQcm9wc0hvdXNla2VlcGluZyA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzQWN0aW9ucyA9IHtcbiAgc2hvd0lkZW50aXR5OiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gUHJvcHNEYXRhICYgUHJvcHNIb3VzZWtlZXBpbmcgJiBQcm9wc0FjdGlvbnM7XG5cbmV4cG9ydCBjb25zdCBTYWZldHlOdW1iZXJOb3RpZmljYXRpb24gPSAoe1xuICBjb250YWN0LFxuICBpc0dyb3VwLFxuICBpMThuLFxuICBzaG93SWRlbnRpdHksXG59OiBQcm9wcyk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2hhbmdlS2V5ID0gaXNHcm91cFxuICAgID8gJ3NhZmV0eU51bWJlckNoYW5nZWRHcm91cCdcbiAgICA6ICdzYWZldHlOdW1iZXJDaGFuZ2VkJztcblxuICByZXR1cm4gKFxuICAgIDxTeXN0ZW1NZXNzYWdlXG4gICAgICBpY29uPVwic2FmZXR5LW51bWJlclwiXG4gICAgICBjb250ZW50cz17XG4gICAgICAgIDxJbnRsXG4gICAgICAgICAgaWQ9e2NoYW5nZUtleX1cbiAgICAgICAgICBjb21wb25lbnRzPXtbXG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBrZXk9XCJleHRlcm5hbC0xXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLXNhZmV0eS1udW1iZXItbm90aWZpY2F0aW9uX19jb250YWN0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgICAgICAgdGl0bGU9e2NvbnRhY3QudGl0bGV9XG4gICAgICAgICAgICAgICAgbW9kdWxlPVwibW9kdWxlLXNhZmV0eS1udW1iZXItbm90aWZpY2F0aW9uX19jb250YWN0XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc3Bhbj4sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAvPlxuICAgICAgfVxuICAgICAgYnV0dG9uPXtcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNob3dJZGVudGl0eShjb250YWN0LmlkKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHNpemU9e0J1dHRvblNpemUuU21hbGx9XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TeXN0ZW1NZXNzYWdlfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ3ZlcmlmeU5ld051bWJlcicpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIH1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsb0JBQWtEO0FBQ2xELDJCQUE4QjtBQUM5Qix5QkFBNEI7QUFDNUIsa0JBQXFCO0FBdUJkLE1BQU0sMkJBQTJCLHdCQUFDO0FBQUEsRUFDdkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUN3QjtBQUN4QixRQUFNLFlBQVksVUFDZCw2QkFDQTtBQUVKLFNBQ0UsbURBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFVBQ0UsbURBQUM7QUFBQSxNQUNDLElBQUk7QUFBQSxNQUNKLFlBQVk7QUFBQSxRQUNWLG1EQUFDO0FBQUEsVUFDQyxLQUFJO0FBQUEsVUFDSixXQUFVO0FBQUEsV0FFVixtREFBQztBQUFBLFVBQ0MsT0FBTyxRQUFRO0FBQUEsVUFDZixRQUFPO0FBQUEsU0FDVCxDQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxLQUNGO0FBQUEsSUFFRixRQUNFLG1EQUFDO0FBQUEsTUFDQyxTQUFTLE1BQU07QUFDYixxQkFBYSxRQUFRLEVBQUU7QUFBQSxNQUN6QjtBQUFBLE1BQ0EsTUFBTSx5QkFBVztBQUFBLE1BQ2pCLFNBQVMsNEJBQWM7QUFBQSxPQUV0QixLQUFLLGlCQUFpQixDQUN6QjtBQUFBLEdBRUo7QUFFSixHQTNDd0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
