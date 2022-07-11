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
var SafetyNumberViewer_stories_exports = {};
__export(SafetyNumberViewer_stories_exports, {
  JustNumber: () => JustNumber,
  JustProfileAndNumber: () => JustProfileAndNumber,
  NoPhoneNumberCannotVerify: () => NoPhoneNumberCannotVerify,
  SafetyNumber: () => SafetyNumber,
  SafetyNumberDialogClose: () => SafetyNumberDialogClose,
  SafetyNumberNotVerified: () => SafetyNumberNotVerified,
  VerificationDisabled: () => VerificationDisabled,
  default: () => SafetyNumberViewer_stories_default
});
module.exports = __toCommonJS(SafetyNumberViewer_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_SafetyNumberViewer = require("./SafetyNumberViewer");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const contactWithAllData = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Summer Smith",
  name: "Summer Smith",
  phoneNumber: "(305) 123-4567",
  isVerified: true
});
const contactWithJustProfile = (0, import_getDefaultConversation.getDefaultConversation)({
  avatarPath: void 0,
  title: "-*Smartest Dude*-",
  profileName: "-*Smartest Dude*-",
  name: void 0,
  phoneNumber: "(305) 123-4567"
});
const contactWithJustNumber = (0, import_getDefaultConversation.getDefaultConversation)({
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
  title: "Unknown contact",
  name: void 0,
  phoneNumber: void 0
});
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  contact: overrideProps.contact || contactWithAllData,
  generateSafetyNumber: (0, import_addon_actions.action)("generate-safety-number"),
  i18n,
  safetyNumber: (0, import_addon_knobs.text)("safetyNumber", overrideProps.safetyNumber || "XXX"),
  toggleVerified: (0, import_addon_actions.action)("toggle-verified"),
  verificationDisabled: (0, import_addon_knobs.boolean)("verificationDisabled", overrideProps.verificationDisabled !== void 0 ? overrideProps.verificationDisabled : false),
  onClose: (0, import_addon_actions.action)("onClose")
}), "createProps");
var SafetyNumberViewer_stories_default = {
  title: "Components/SafetyNumberViewer"
};
const SafetyNumber = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({})
  });
}, "SafetyNumber");
const SafetyNumberNotVerified = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({
      contact: {
        ...contactWithAllData,
        isVerified: false
      }
    })
  });
}, "SafetyNumberNotVerified");
SafetyNumberNotVerified.story = {
  name: "Safety Number (not verified)"
};
const VerificationDisabled = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({
      verificationDisabled: true
    })
  });
}, "VerificationDisabled");
const SafetyNumberDialogClose = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({
      onClose: (0, import_addon_actions.action)("close")
    })
  });
}, "SafetyNumberDialogClose");
SafetyNumberDialogClose.story = {
  name: "Safety Number (dialog close)"
};
const JustProfileAndNumber = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({
      contact: contactWithJustProfile
    })
  });
}, "JustProfileAndNumber");
JustProfileAndNumber.story = {
  name: "Just Profile and Number"
};
const JustNumber = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({
      contact: contactWithJustNumber
    })
  });
}, "JustNumber");
const NoPhoneNumberCannotVerify = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_SafetyNumberViewer.SafetyNumberViewer, {
    ...createProps({
      contact: contactWithNothing
    })
  });
}, "NoPhoneNumberCannotVerify");
NoPhoneNumberCannotVerify.story = {
  name: "No Phone Number (cannot verify)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JustNumber,
  JustProfileAndNumber,
  NoPhoneNumberCannotVerify,
  SafetyNumber,
  SafetyNumberDialogClose,
  SafetyNumberNotVerified,
  VerificationDisabled
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyVmlld2VyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJWaWV3ZXInO1xuaW1wb3J0IHsgU2FmZXR5TnVtYmVyVmlld2VyIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJWaWV3ZXInO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNvbnRhY3RXaXRoQWxsRGF0YSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICB0aXRsZTogJ1N1bW1lciBTbWl0aCcsXG4gIG5hbWU6ICdTdW1tZXIgU21pdGgnLFxuICBwaG9uZU51bWJlcjogJygzMDUpIDEyMy00NTY3JyxcbiAgaXNWZXJpZmllZDogdHJ1ZSxcbn0pO1xuXG5jb25zdCBjb250YWN0V2l0aEp1c3RQcm9maWxlID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIGF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgdGl0bGU6ICctKlNtYXJ0ZXN0IER1ZGUqLScsXG4gIHByb2ZpbGVOYW1lOiAnLSpTbWFydGVzdCBEdWRlKi0nLFxuICBuYW1lOiB1bmRlZmluZWQsXG4gIHBob25lTnVtYmVyOiAnKDMwNSkgMTIzLTQ1NjcnLFxufSk7XG5cbmNvbnN0IGNvbnRhY3RXaXRoSnVzdE51bWJlciA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gIHByb2ZpbGVOYW1lOiB1bmRlZmluZWQsXG4gIG5hbWU6IHVuZGVmaW5lZCxcbiAgdGl0bGU6ICcoMzA1KSAxMjMtNDU2NycsXG4gIHBob25lTnVtYmVyOiAnKDMwNSkgMTIzLTQ1NjcnLFxufSk7XG5cbmNvbnN0IGNvbnRhY3RXaXRoTm90aGluZyA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICBpZDogJ3NvbWUtZ3VpZCcsXG4gIGF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgcHJvZmlsZU5hbWU6IHVuZGVmaW5lZCxcbiAgdGl0bGU6ICdVbmtub3duIGNvbnRhY3QnLFxuICBuYW1lOiB1bmRlZmluZWQsXG4gIHBob25lTnVtYmVyOiB1bmRlZmluZWQsXG59KTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgY29udGFjdDogb3ZlcnJpZGVQcm9wcy5jb250YWN0IHx8IGNvbnRhY3RXaXRoQWxsRGF0YSxcbiAgZ2VuZXJhdGVTYWZldHlOdW1iZXI6IGFjdGlvbignZ2VuZXJhdGUtc2FmZXR5LW51bWJlcicpLFxuICBpMThuLFxuICBzYWZldHlOdW1iZXI6IHRleHQoJ3NhZmV0eU51bWJlcicsIG92ZXJyaWRlUHJvcHMuc2FmZXR5TnVtYmVyIHx8ICdYWFgnKSxcbiAgdG9nZ2xlVmVyaWZpZWQ6IGFjdGlvbigndG9nZ2xlLXZlcmlmaWVkJyksXG4gIHZlcmlmaWNhdGlvbkRpc2FibGVkOiBib29sZWFuKFxuICAgICd2ZXJpZmljYXRpb25EaXNhYmxlZCcsXG4gICAgb3ZlcnJpZGVQcm9wcy52ZXJpZmljYXRpb25EaXNhYmxlZCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IG92ZXJyaWRlUHJvcHMudmVyaWZpY2F0aW9uRGlzYWJsZWRcbiAgICAgIDogZmFsc2VcbiAgKSxcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU2FmZXR5TnVtYmVyVmlld2VyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTYWZldHlOdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPFNhZmV0eU51bWJlclZpZXdlciB7Li4uY3JlYXRlUHJvcHMoe30pfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTYWZldHlOdW1iZXJOb3RWZXJpZmllZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPFNhZmV0eU51bWJlclZpZXdlclxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgY29udGFjdDoge1xuICAgICAgICAgIC4uLmNvbnRhY3RXaXRoQWxsRGF0YSxcbiAgICAgICAgICBpc1ZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5TYWZldHlOdW1iZXJOb3RWZXJpZmllZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1NhZmV0eSBOdW1iZXIgKG5vdCB2ZXJpZmllZCknLFxufTtcblxuZXhwb3J0IGNvbnN0IFZlcmlmaWNhdGlvbkRpc2FibGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U2FmZXR5TnVtYmVyVmlld2VyXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICB2ZXJpZmljYXRpb25EaXNhYmxlZDogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgU2FmZXR5TnVtYmVyRGlhbG9nQ2xvc2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTYWZldHlOdW1iZXJWaWV3ZXJcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIG9uQ2xvc2U6IGFjdGlvbignY2xvc2UnKSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5TYWZldHlOdW1iZXJEaWFsb2dDbG9zZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1NhZmV0eSBOdW1iZXIgKGRpYWxvZyBjbG9zZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IEp1c3RQcm9maWxlQW5kTnVtYmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U2FmZXR5TnVtYmVyVmlld2VyXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBjb250YWN0OiBjb250YWN0V2l0aEp1c3RQcm9maWxlLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbkp1c3RQcm9maWxlQW5kTnVtYmVyLnN0b3J5ID0ge1xuICBuYW1lOiAnSnVzdCBQcm9maWxlIGFuZCBOdW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IEp1c3ROdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTYWZldHlOdW1iZXJWaWV3ZXJcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGNvbnRhY3Q6IGNvbnRhY3RXaXRoSnVzdE51bWJlcixcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgTm9QaG9uZU51bWJlckNhbm5vdFZlcmlmeSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPFNhZmV0eU51bWJlclZpZXdlclxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgY29udGFjdDogY29udGFjdFdpdGhOb3RoaW5nLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbk5vUGhvbmVOdW1iZXJDYW5ub3RWZXJpZnkuc3RvcnkgPSB7XG4gIG5hbWU6ICdObyBQaG9uZSBOdW1iZXIgKGNhbm5vdCB2ZXJpZnkpJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFDdkIseUJBQThCO0FBRzlCLGdDQUFtQztBQUNuQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG9DQUF1QztBQUV2QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLHFCQUFxQiwwREFBdUI7QUFBQSxFQUNoRCxPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQ2QsQ0FBQztBQUVELE1BQU0seUJBQXlCLDBEQUF1QjtBQUFBLEVBQ3BELFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFDZixDQUFDO0FBRUQsTUFBTSx3QkFBd0IsMERBQXVCO0FBQUEsRUFDbkQsWUFBWTtBQUFBLEVBQ1osYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUNmLENBQUM7QUFFRCxNQUFNLHFCQUFxQiwwREFBdUI7QUFBQSxFQUNoRCxJQUFJO0FBQUEsRUFDSixZQUFZO0FBQUEsRUFDWixhQUFhO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixhQUFhO0FBQ2YsQ0FBQztBQUVELE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLFNBQVMsY0FBYyxXQUFXO0FBQUEsRUFDbEMsc0JBQXNCLGlDQUFPLHdCQUF3QjtBQUFBLEVBQ3JEO0FBQUEsRUFDQSxjQUFjLDZCQUFLLGdCQUFnQixjQUFjLGdCQUFnQixLQUFLO0FBQUEsRUFDdEUsZ0JBQWdCLGlDQUFPLGlCQUFpQjtBQUFBLEVBQ3hDLHNCQUFzQixnQ0FDcEIsd0JBQ0EsY0FBYyx5QkFBeUIsU0FDbkMsY0FBYyx1QkFDZCxLQUNOO0FBQUEsRUFDQSxTQUFTLGlDQUFPLFNBQVM7QUFDM0IsSUFib0I7QUFlcEIsSUFBTyxxQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxlQUFlLDZCQUFtQjtBQUM3QyxTQUFPLG9DQUFDO0FBQUEsT0FBdUIsWUFBWSxDQUFDLENBQUM7QUFBQSxHQUFHO0FBQ2xELEdBRjRCO0FBSXJCLE1BQU0sMEJBQTBCLDZCQUFtQjtBQUN4RCxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxTQUFTO0FBQUEsV0FDSjtBQUFBLFFBQ0gsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGLENBQUM7QUFBQSxHQUNIO0FBRUosR0FYdUM7QUFhdkMsd0JBQXdCLFFBQVE7QUFBQSxFQUM5QixNQUFNO0FBQ1I7QUFFTyxNQUFNLHVCQUF1Qiw2QkFBbUI7QUFDckQsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2Qsc0JBQXNCO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVJvQztBQVU3QixNQUFNLDBCQUEwQiw2QkFBbUI7QUFDeEQsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2QsU0FBUyxpQ0FBTyxPQUFPO0FBQUEsSUFDekIsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVJ1QztBQVV2Qyx3QkFBd0IsUUFBUTtBQUFBLEVBQzlCLE1BQU07QUFDUjtBQUVPLE1BQU0sdUJBQXVCLDZCQUFtQjtBQUNyRCxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBUm9DO0FBVXBDLHFCQUFxQixRQUFRO0FBQUEsRUFDM0IsTUFBTTtBQUNSO0FBRU8sTUFBTSxhQUFhLDZCQUFtQjtBQUMzQyxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBUjBCO0FBVW5CLE1BQU0sNEJBQTRCLDZCQUFtQjtBQUMxRCxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBUnlDO0FBVXpDLDBCQUEwQixRQUFRO0FBQUEsRUFDaEMsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
