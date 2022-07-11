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
var SafetyNumberChangeDialog_stories_exports = {};
__export(SafetyNumberChangeDialog_stories_exports, {
  DifferentConfirmationText: () => DifferentConfirmationText,
  MultiContactDialog: () => MultiContactDialog,
  MultipleContactsAllWithBadges: () => MultipleContactsAllWithBadges,
  ScrollDialog: () => ScrollDialog,
  SingleContactDialog: () => SingleContactDialog,
  default: () => SafetyNumberChangeDialog_stories_default
});
module.exports = __toCommonJS(SafetyNumberChangeDialog_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_SafetyNumberChangeDialog = require("./SafetyNumberChangeDialog");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
var import_getFakeBadge = require("../test-both/helpers/getFakeBadge");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const contactWithAllData = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "abc",
  avatarPath: void 0,
  profileName: "-*Smartest Dude*-",
  title: "Rick Sanchez",
  name: "Rick Sanchez",
  phoneNumber: "(305) 123-4567"
});
const contactWithJustProfile = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "def",
  avatarPath: void 0,
  title: "-*Smartest Dude*-",
  profileName: "-*Smartest Dude*-",
  name: void 0,
  phoneNumber: "(305) 123-4567"
});
const contactWithJustNumber = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "xyz",
  avatarPath: void 0,
  profileName: void 0,
  name: void 0,
  title: "(305) 123-4567",
  phoneNumber: "(305) 123-4567"
});
const contactWithNothing = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "some-guid",
  avatarPath: void 0,
  profileName: void 0,
  name: void 0,
  phoneNumber: void 0,
  title: "Unknown contact"
});
const useTheme = /* @__PURE__ */ __name(() => React.useContext(import_StorybookThemeContext.StorybookThemeContext), "useTheme");
var SafetyNumberChangeDialog_stories_default = {
  title: "Components/SafetyNumberChangeDialog"
};
const SingleContactDialog = /* @__PURE__ */ __name(() => {
  const theme = useTheme();
  return /* @__PURE__ */ React.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
    contacts: [contactWithAllData],
    getPreferredBadge: () => void 0,
    i18n,
    onCancel: (0, import_addon_actions.action)("cancel"),
    onConfirm: (0, import_addon_actions.action)("confirm"),
    renderSafetyNumber: () => {
      (0, import_addon_actions.action)("renderSafetyNumber");
      return /* @__PURE__ */ React.createElement("div", null, "This is a mock Safety Number View");
    },
    theme
  });
}, "SingleContactDialog");
const DifferentConfirmationText = /* @__PURE__ */ __name(() => {
  const theme = useTheme();
  return /* @__PURE__ */ React.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
    confirmText: "You are awesome",
    contacts: [contactWithAllData],
    getPreferredBadge: () => void 0,
    i18n,
    onCancel: (0, import_addon_actions.action)("cancel"),
    onConfirm: (0, import_addon_actions.action)("confirm"),
    renderSafetyNumber: () => {
      (0, import_addon_actions.action)("renderSafetyNumber");
      return /* @__PURE__ */ React.createElement("div", null, "This is a mock Safety Number View");
    },
    theme
  });
}, "DifferentConfirmationText");
const MultiContactDialog = /* @__PURE__ */ __name(() => {
  const theme = useTheme();
  return /* @__PURE__ */ React.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
    contacts: [
      contactWithAllData,
      contactWithJustProfile,
      contactWithJustNumber,
      contactWithNothing
    ],
    getPreferredBadge: () => void 0,
    i18n,
    onCancel: (0, import_addon_actions.action)("cancel"),
    onConfirm: (0, import_addon_actions.action)("confirm"),
    renderSafetyNumber: () => {
      (0, import_addon_actions.action)("renderSafetyNumber");
      return /* @__PURE__ */ React.createElement("div", null, "This is a mock Safety Number View");
    },
    theme
  });
}, "MultiContactDialog");
const MultipleContactsAllWithBadges = /* @__PURE__ */ __name(() => {
  const theme = useTheme();
  return /* @__PURE__ */ React.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
    contacts: [
      contactWithAllData,
      contactWithJustProfile,
      contactWithJustNumber,
      contactWithNothing
    ],
    getPreferredBadge: () => (0, import_getFakeBadge.getFakeBadge)(),
    i18n,
    onCancel: (0, import_addon_actions.action)("cancel"),
    onConfirm: (0, import_addon_actions.action)("confirm"),
    renderSafetyNumber: () => {
      (0, import_addon_actions.action)("renderSafetyNumber");
      return /* @__PURE__ */ React.createElement("div", null, "This is a mock Safety Number View");
    },
    theme
  });
}, "MultipleContactsAllWithBadges");
MultipleContactsAllWithBadges.story = {
  name: "Multiple contacts, all with badges"
};
const ScrollDialog = /* @__PURE__ */ __name(() => {
  const theme = useTheme();
  return /* @__PURE__ */ React.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
    contacts: [
      contactWithAllData,
      contactWithJustProfile,
      contactWithJustNumber,
      contactWithNothing,
      contactWithAllData,
      contactWithAllData,
      contactWithAllData,
      contactWithAllData,
      contactWithAllData,
      contactWithAllData
    ],
    getPreferredBadge: () => void 0,
    i18n,
    onCancel: (0, import_addon_actions.action)("cancel"),
    onConfirm: (0, import_addon_actions.action)("confirm"),
    renderSafetyNumber: () => {
      (0, import_addon_actions.action)("renderSafetyNumber");
      return /* @__PURE__ */ React.createElement("div", null, "This is a mock Safety Number View");
    },
    theme
  });
}, "ScrollDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DifferentConfirmationText,
  MultiContactDialog,
  MultipleContactsAllWithBadges,
  ScrollDialog,
  SingleContactDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgU2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2cnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBTdG9yeWJvb2tUaGVtZUNvbnRleHQgfSBmcm9tICcuLi8uLi8uc3Rvcnlib29rL1N0b3J5Ym9va1RoZW1lQ29udGV4dCc7XG5pbXBvcnQgeyBnZXRGYWtlQmFkZ2UgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXRGYWtlQmFkZ2UnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBjb250YWN0V2l0aEFsbERhdGEgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgaWQ6ICdhYmMnLFxuICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gIHByb2ZpbGVOYW1lOiAnLSpTbWFydGVzdCBEdWRlKi0nLFxuICB0aXRsZTogJ1JpY2sgU2FuY2hleicsXG4gIG5hbWU6ICdSaWNrIFNhbmNoZXonLFxuICBwaG9uZU51bWJlcjogJygzMDUpIDEyMy00NTY3Jyxcbn0pO1xuXG5jb25zdCBjb250YWN0V2l0aEp1c3RQcm9maWxlID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIGlkOiAnZGVmJyxcbiAgYXZhdGFyUGF0aDogdW5kZWZpbmVkLFxuICB0aXRsZTogJy0qU21hcnRlc3QgRHVkZSotJyxcbiAgcHJvZmlsZU5hbWU6ICctKlNtYXJ0ZXN0IER1ZGUqLScsXG4gIG5hbWU6IHVuZGVmaW5lZCxcbiAgcGhvbmVOdW1iZXI6ICcoMzA1KSAxMjMtNDU2NycsXG59KTtcblxuY29uc3QgY29udGFjdFdpdGhKdXN0TnVtYmVyID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIGlkOiAneHl6JyxcbiAgYXZhdGFyUGF0aDogdW5kZWZpbmVkLFxuICBwcm9maWxlTmFtZTogdW5kZWZpbmVkLFxuICBuYW1lOiB1bmRlZmluZWQsXG4gIHRpdGxlOiAnKDMwNSkgMTIzLTQ1NjcnLFxuICBwaG9uZU51bWJlcjogJygzMDUpIDEyMy00NTY3Jyxcbn0pO1xuXG5jb25zdCBjb250YWN0V2l0aE5vdGhpbmcgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgaWQ6ICdzb21lLWd1aWQnLFxuICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gIHByb2ZpbGVOYW1lOiB1bmRlZmluZWQsXG4gIG5hbWU6IHVuZGVmaW5lZCxcbiAgcGhvbmVOdW1iZXI6IHVuZGVmaW5lZCxcbiAgdGl0bGU6ICdVbmtub3duIGNvbnRhY3QnLFxufSk7XG5cbmNvbnN0IHVzZVRoZW1lID0gKCkgPT4gUmVhY3QudXNlQ29udGV4dChTdG9yeWJvb2tUaGVtZUNvbnRleHQpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2cnLFxufTtcblxuZXhwb3J0IGNvbnN0IFNpbmdsZUNvbnRhY3REaWFsb2cgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIHJldHVybiAoXG4gICAgPFNhZmV0eU51bWJlckNoYW5nZURpYWxvZ1xuICAgICAgY29udGFjdHM9e1tjb250YWN0V2l0aEFsbERhdGFdfVxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNhbmNlbD17YWN0aW9uKCdjYW5jZWwnKX1cbiAgICAgIG9uQ29uZmlybT17YWN0aW9uKCdjb25maXJtJyl9XG4gICAgICByZW5kZXJTYWZldHlOdW1iZXI9eygpID0+IHtcbiAgICAgICAgYWN0aW9uKCdyZW5kZXJTYWZldHlOdW1iZXInKTtcbiAgICAgICAgcmV0dXJuIDxkaXY+VGhpcyBpcyBhIG1vY2sgU2FmZXR5IE51bWJlciBWaWV3PC9kaXY+O1xuICAgICAgfX1cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IERpZmZlcmVudENvbmZpcm1hdGlvblRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIHJldHVybiAoXG4gICAgPFNhZmV0eU51bWJlckNoYW5nZURpYWxvZ1xuICAgICAgY29uZmlybVRleHQ9XCJZb3UgYXJlIGF3ZXNvbWVcIlxuICAgICAgY29udGFjdHM9e1tjb250YWN0V2l0aEFsbERhdGFdfVxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNhbmNlbD17YWN0aW9uKCdjYW5jZWwnKX1cbiAgICAgIG9uQ29uZmlybT17YWN0aW9uKCdjb25maXJtJyl9XG4gICAgICByZW5kZXJTYWZldHlOdW1iZXI9eygpID0+IHtcbiAgICAgICAgYWN0aW9uKCdyZW5kZXJTYWZldHlOdW1iZXInKTtcbiAgICAgICAgcmV0dXJuIDxkaXY+VGhpcyBpcyBhIG1vY2sgU2FmZXR5IE51bWJlciBWaWV3PC9kaXY+O1xuICAgICAgfX1cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpQ29udGFjdERpYWxvZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgcmV0dXJuIChcbiAgICA8U2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nXG4gICAgICBjb250YWN0cz17W1xuICAgICAgICBjb250YWN0V2l0aEFsbERhdGEsXG4gICAgICAgIGNvbnRhY3RXaXRoSnVzdFByb2ZpbGUsXG4gICAgICAgIGNvbnRhY3RXaXRoSnVzdE51bWJlcixcbiAgICAgICAgY29udGFjdFdpdGhOb3RoaW5nLFxuICAgICAgXX1cbiAgICAgIGdldFByZWZlcnJlZEJhZGdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DYW5jZWw9e2FjdGlvbignY2FuY2VsJyl9XG4gICAgICBvbkNvbmZpcm09e2FjdGlvbignY29uZmlybScpfVxuICAgICAgcmVuZGVyU2FmZXR5TnVtYmVyPXsoKSA9PiB7XG4gICAgICAgIGFjdGlvbigncmVuZGVyU2FmZXR5TnVtYmVyJyk7XG4gICAgICAgIHJldHVybiA8ZGl2PlRoaXMgaXMgYSBtb2NrIFNhZmV0eSBOdW1iZXIgVmlldzwvZGl2PjtcbiAgICAgIH19XG4gICAgICB0aGVtZT17dGhlbWV9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZUNvbnRhY3RzQWxsV2l0aEJhZGdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgcmV0dXJuIChcbiAgICA8U2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nXG4gICAgICBjb250YWN0cz17W1xuICAgICAgICBjb250YWN0V2l0aEFsbERhdGEsXG4gICAgICAgIGNvbnRhY3RXaXRoSnVzdFByb2ZpbGUsXG4gICAgICAgIGNvbnRhY3RXaXRoSnVzdE51bWJlcixcbiAgICAgICAgY29udGFjdFdpdGhOb3RoaW5nLFxuICAgICAgXX1cbiAgICAgIGdldFByZWZlcnJlZEJhZGdlPXsoKSA9PiBnZXRGYWtlQmFkZ2UoKX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNhbmNlbD17YWN0aW9uKCdjYW5jZWwnKX1cbiAgICAgIG9uQ29uZmlybT17YWN0aW9uKCdjb25maXJtJyl9XG4gICAgICByZW5kZXJTYWZldHlOdW1iZXI9eygpID0+IHtcbiAgICAgICAgYWN0aW9uKCdyZW5kZXJTYWZldHlOdW1iZXInKTtcbiAgICAgICAgcmV0dXJuIDxkaXY+VGhpcyBpcyBhIG1vY2sgU2FmZXR5IE51bWJlciBWaWV3PC9kaXY+O1xuICAgICAgfX1cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAvPlxuICApO1xufTtcblxuTXVsdGlwbGVDb250YWN0c0FsbFdpdGhCYWRnZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNdWx0aXBsZSBjb250YWN0cywgYWxsIHdpdGggYmFkZ2VzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTY3JvbGxEaWFsb2cgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIHJldHVybiAoXG4gICAgPFNhZmV0eU51bWJlckNoYW5nZURpYWxvZ1xuICAgICAgY29udGFjdHM9e1tcbiAgICAgICAgY29udGFjdFdpdGhBbGxEYXRhLFxuICAgICAgICBjb250YWN0V2l0aEp1c3RQcm9maWxlLFxuICAgICAgICBjb250YWN0V2l0aEp1c3ROdW1iZXIsXG4gICAgICAgIGNvbnRhY3RXaXRoTm90aGluZyxcbiAgICAgICAgY29udGFjdFdpdGhBbGxEYXRhLFxuICAgICAgICBjb250YWN0V2l0aEFsbERhdGEsXG4gICAgICAgIGNvbnRhY3RXaXRoQWxsRGF0YSxcbiAgICAgICAgY29udGFjdFdpdGhBbGxEYXRhLFxuICAgICAgICBjb250YWN0V2l0aEFsbERhdGEsXG4gICAgICAgIGNvbnRhY3RXaXRoQWxsRGF0YSxcbiAgICAgIF19XG4gICAgICBnZXRQcmVmZXJyZWRCYWRnZT17KCkgPT4gdW5kZWZpbmVkfVxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG9uQ2FuY2VsPXthY3Rpb24oJ2NhbmNlbCcpfVxuICAgICAgb25Db25maXJtPXthY3Rpb24oJ2NvbmZpcm0nKX1cbiAgICAgIHJlbmRlclNhZmV0eU51bWJlcj17KCkgPT4ge1xuICAgICAgICBhY3Rpb24oJ3JlbmRlclNhZmV0eU51bWJlcicpO1xuICAgICAgICByZXR1cm4gPGRpdj5UaGlzIGlzIGEgbW9jayBTYWZldHkgTnVtYmVyIFZpZXc8L2Rpdj47XG4gICAgICB9fVxuICAgICAgdGhlbWU9e3RoZW1lfVxuICAgIC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFFdkIsc0NBQXlDO0FBQ3pDLG9DQUF1QztBQUN2Qyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG1DQUFzQztBQUN0QywwQkFBNkI7QUFFN0IsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxxQkFBcUIsMERBQXVCO0FBQUEsRUFDaEQsSUFBSTtBQUFBLEVBQ0osWUFBWTtBQUFBLEVBQ1osYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUNmLENBQUM7QUFFRCxNQUFNLHlCQUF5QiwwREFBdUI7QUFBQSxFQUNwRCxJQUFJO0FBQUEsRUFDSixZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixhQUFhO0FBQ2YsQ0FBQztBQUVELE1BQU0sd0JBQXdCLDBEQUF1QjtBQUFBLEVBQ25ELElBQUk7QUFBQSxFQUNKLFlBQVk7QUFBQSxFQUNaLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFDZixDQUFDO0FBRUQsTUFBTSxxQkFBcUIsMERBQXVCO0FBQUEsRUFDaEQsSUFBSTtBQUFBLEVBQ0osWUFBWTtBQUFBLEVBQ1osYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUNULENBQUM7QUFFRCxNQUFNLFdBQVcsNkJBQU0sTUFBTSxXQUFXLGtEQUFxQixHQUE1QztBQUVqQixJQUFPLDJDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLHNCQUFzQiw2QkFBbUI7QUFDcEQsUUFBTSxRQUFRLFNBQVM7QUFDdkIsU0FDRSxvQ0FBQztBQUFBLElBQ0MsVUFBVSxDQUFDLGtCQUFrQjtBQUFBLElBQzdCLG1CQUFtQixNQUFNO0FBQUEsSUFDekI7QUFBQSxJQUNBLFVBQVUsaUNBQU8sUUFBUTtBQUFBLElBQ3pCLFdBQVcsaUNBQU8sU0FBUztBQUFBLElBQzNCLG9CQUFvQixNQUFNO0FBQ3hCLHVDQUFPLG9CQUFvQjtBQUMzQixhQUFPLG9DQUFDLGFBQUksbUNBQWlDO0FBQUEsSUFDL0M7QUFBQSxJQUNBO0FBQUEsR0FDRjtBQUVKLEdBaEJtQztBQWtCNUIsTUFBTSw0QkFBNEIsNkJBQW1CO0FBQzFELFFBQU0sUUFBUSxTQUFTO0FBQ3ZCLFNBQ0Usb0NBQUM7QUFBQSxJQUNDLGFBQVk7QUFBQSxJQUNaLFVBQVUsQ0FBQyxrQkFBa0I7QUFBQSxJQUM3QixtQkFBbUIsTUFBTTtBQUFBLElBQ3pCO0FBQUEsSUFDQSxVQUFVLGlDQUFPLFFBQVE7QUFBQSxJQUN6QixXQUFXLGlDQUFPLFNBQVM7QUFBQSxJQUMzQixvQkFBb0IsTUFBTTtBQUN4Qix1Q0FBTyxvQkFBb0I7QUFDM0IsYUFBTyxvQ0FBQyxhQUFJLG1DQUFpQztBQUFBLElBQy9DO0FBQUEsSUFDQTtBQUFBLEdBQ0Y7QUFFSixHQWpCeUM7QUFtQmxDLE1BQU0scUJBQXFCLDZCQUFtQjtBQUNuRCxRQUFNLFFBQVEsU0FBUztBQUN2QixTQUNFLG9DQUFDO0FBQUEsSUFDQyxVQUFVO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLG1CQUFtQixNQUFNO0FBQUEsSUFDekI7QUFBQSxJQUNBLFVBQVUsaUNBQU8sUUFBUTtBQUFBLElBQ3pCLFdBQVcsaUNBQU8sU0FBUztBQUFBLElBQzNCLG9CQUFvQixNQUFNO0FBQ3hCLHVDQUFPLG9CQUFvQjtBQUMzQixhQUFPLG9DQUFDLGFBQUksbUNBQWlDO0FBQUEsSUFDL0M7QUFBQSxJQUNBO0FBQUEsR0FDRjtBQUVKLEdBckJrQztBQXVCM0IsTUFBTSxnQ0FBZ0MsNkJBQW1CO0FBQzlELFFBQU0sUUFBUSxTQUFTO0FBQ3ZCLFNBQ0Usb0NBQUM7QUFBQSxJQUNDLFVBQVU7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsbUJBQW1CLE1BQU0sc0NBQWE7QUFBQSxJQUN0QztBQUFBLElBQ0EsVUFBVSxpQ0FBTyxRQUFRO0FBQUEsSUFDekIsV0FBVyxpQ0FBTyxTQUFTO0FBQUEsSUFDM0Isb0JBQW9CLE1BQU07QUFDeEIsdUNBQU8sb0JBQW9CO0FBQzNCLGFBQU8sb0NBQUMsYUFBSSxtQ0FBaUM7QUFBQSxJQUMvQztBQUFBLElBQ0E7QUFBQSxHQUNGO0FBRUosR0FyQjZDO0FBdUI3Qyw4QkFBOEIsUUFBUTtBQUFBLEVBQ3BDLE1BQU07QUFDUjtBQUVPLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsUUFBTSxRQUFRLFNBQVM7QUFDdkIsU0FDRSxvQ0FBQztBQUFBLElBQ0MsVUFBVTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxtQkFBbUIsTUFBTTtBQUFBLElBQ3pCO0FBQUEsSUFDQSxVQUFVLGlDQUFPLFFBQVE7QUFBQSxJQUN6QixXQUFXLGlDQUFPLFNBQVM7QUFBQSxJQUMzQixvQkFBb0IsTUFBTTtBQUN4Qix1Q0FBTyxvQkFBb0I7QUFDM0IsYUFBTyxvQ0FBQyxhQUFJLG1DQUFpQztBQUFBLElBQy9DO0FBQUEsSUFDQTtBQUFBLEdBQ0Y7QUFFSixHQTNCNEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
