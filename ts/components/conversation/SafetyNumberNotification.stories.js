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
var SafetyNumberNotification_stories_exports = {};
__export(SafetyNumberNotification_stories_exports, {
  DirectConversation: () => DirectConversation,
  GroupConversation: () => GroupConversation,
  LongNameInGroup: () => LongNameInGroup,
  default: () => SafetyNumberNotification_stories_default
});
module.exports = __toCommonJS(SafetyNumberNotification_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_SafetyNumberNotification = require("./SafetyNumberNotification");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createContact = /* @__PURE__ */ __name((props) => ({
  id: "",
  title: (0, import_addon_knobs.text)("contact title", props.title || "")
}), "createContact");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  contact: overrideProps.contact || {},
  isGroup: (0, import_addon_knobs.boolean)("isGroup", overrideProps.isGroup || false),
  showIdentity: (0, import_addon_actions.action)("showIdentity")
}), "createProps");
var SafetyNumberNotification_stories_default = {
  title: "Components/Conversation/SafetyNumberNotification"
};
const GroupConversation = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroup: true,
    contact: createContact({
      title: "Mr. Fire"
    })
  });
  return /* @__PURE__ */ React.createElement(import_SafetyNumberNotification.SafetyNumberNotification, {
    ...props
  });
}, "GroupConversation");
const DirectConversation = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroup: false,
    contact: createContact({
      title: "Mr. Fire"
    })
  });
  return /* @__PURE__ */ React.createElement(import_SafetyNumberNotification.SafetyNumberNotification, {
    ...props
  });
}, "DirectConversation");
const LongNameInGroup = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroup: true,
    contact: createContact({
      title: "\u{1F408}\u200D\u2B1B\u{1F355}\u{1F382}".repeat(50)
    })
  });
  return /* @__PURE__ */ React.createElement(import_SafetyNumberNotification.SafetyNumberNotification, {
    ...props
  });
}, "LongNameInGroup");
LongNameInGroup.story = {
  name: "Long name in group"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DirectConversation,
  GroupConversation,
  LongNameInGroup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBDb250YWN0VHlwZSwgUHJvcHMgfSBmcm9tICcuL1NhZmV0eU51bWJlck5vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBTYWZldHlOdW1iZXJOb3RpZmljYXRpb24gfSBmcm9tICcuL1NhZmV0eU51bWJlck5vdGlmaWNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZUNvbnRhY3QgPSAocHJvcHM6IFBhcnRpYWw8Q29udGFjdFR5cGU+KTogQ29udGFjdFR5cGUgPT4gKHtcbiAgaWQ6ICcnLFxuICB0aXRsZTogdGV4dCgnY29udGFjdCB0aXRsZScsIHByb3BzLnRpdGxlIHx8ICcnKSxcbn0pO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgaTE4bixcbiAgY29udGFjdDogb3ZlcnJpZGVQcm9wcy5jb250YWN0IHx8ICh7fSBhcyBDb250YWN0VHlwZSksXG4gIGlzR3JvdXA6IGJvb2xlYW4oJ2lzR3JvdXAnLCBvdmVycmlkZVByb3BzLmlzR3JvdXAgfHwgZmFsc2UpLFxuICBzaG93SWRlbnRpdHk6IGFjdGlvbignc2hvd0lkZW50aXR5JyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1NhZmV0eU51bWJlck5vdGlmaWNhdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBDb252ZXJzYXRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBpc0dyb3VwOiB0cnVlLFxuICAgIGNvbnRhY3Q6IGNyZWF0ZUNvbnRhY3Qoe1xuICAgICAgdGl0bGU6ICdNci4gRmlyZScsXG4gICAgfSksXG4gIH0pO1xuXG4gIHJldHVybiA8U2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Q29udmVyc2F0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaXNHcm91cDogZmFsc2UsXG4gICAgY29udGFjdDogY3JlYXRlQ29udGFjdCh7XG4gICAgICB0aXRsZTogJ01yLiBGaXJlJyxcbiAgICB9KSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxTYWZldHlOdW1iZXJOb3RpZmljYXRpb24gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBMb25nTmFtZUluR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBpc0dyb3VwOiB0cnVlLFxuICAgIGNvbnRhY3Q6IGNyZWF0ZUNvbnRhY3Qoe1xuICAgICAgdGl0bGU6ICdcdUQ4M0RcdURDMDhcdTIwMERcdTJCMUJcdUQ4M0NcdURGNTVcdUQ4M0NcdURGODInLnJlcGVhdCg1MCksXG4gICAgfSksXG4gIH0pO1xuXG4gIHJldHVybiA8U2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5Mb25nTmFtZUluR3JvdXAuc3RvcnkgPSB7XG4gIG5hbWU6ICdMb25nIG5hbWUgaW4gZ3JvdXAnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFDdkIseUJBQThCO0FBRTlCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsc0NBQXlDO0FBRXpDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sZ0JBQWdCLHdCQUFDLFVBQThDO0FBQUEsRUFDbkUsSUFBSTtBQUFBLEVBQ0osT0FBTyw2QkFBSyxpQkFBaUIsTUFBTSxTQUFTLEVBQUU7QUFDaEQsSUFIc0I7QUFLdEIsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsU0FBUyxjQUFjLFdBQVksQ0FBQztBQUFBLEVBQ3BDLFNBQVMsZ0NBQVEsV0FBVyxjQUFjLFdBQVcsS0FBSztBQUFBLEVBQzFELGNBQWMsaUNBQU8sY0FBYztBQUNyQyxJQUxvQjtBQU9wQixJQUFPLDJDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLG9CQUFvQiw2QkFBbUI7QUFDbEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixTQUFTO0FBQUEsSUFDVCxTQUFTLGNBQWM7QUFBQSxNQUNyQixPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQTZCO0FBQUEsR0FBTztBQUM5QyxHQVRpQztBQVcxQixNQUFNLHFCQUFxQiw2QkFBbUI7QUFDbkQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixTQUFTO0FBQUEsSUFDVCxTQUFTLGNBQWM7QUFBQSxNQUNyQixPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQTZCO0FBQUEsR0FBTztBQUM5QyxHQVRrQztBQVczQixNQUFNLGtCQUFrQiw2QkFBbUI7QUFDaEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixTQUFTO0FBQUEsSUFDVCxTQUFTLGNBQWM7QUFBQSxNQUNyQixPQUFPLDBDQUFXLE9BQU8sRUFBRTtBQUFBLElBQzdCLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBNkI7QUFBQSxHQUFPO0FBQzlDLEdBVCtCO0FBVy9CLGdCQUFnQixRQUFRO0FBQUEsRUFDdEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
