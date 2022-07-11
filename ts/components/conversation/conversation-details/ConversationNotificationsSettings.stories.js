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
var ConversationNotificationsSettings_stories_exports = {};
__export(ConversationNotificationsSettings_stories_exports, {
  GroupConversationAllDefault: () => GroupConversationAllDefault,
  GroupConversationMentionsMuted: () => GroupConversationMentionsMuted,
  GroupConversationMuted: () => GroupConversationMuted,
  default: () => ConversationNotificationsSettings_stories_default
});
module.exports = __toCommonJS(ConversationNotificationsSettings_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_ConversationNotificationsSettings = require("./ConversationNotificationsSettings");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationNotificationsSettings_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationNotificationsSettings"
};
const getCommonProps = /* @__PURE__ */ __name(() => ({
  muteExpiresAt: void 0,
  conversationType: "group",
  dontNotifyForMentionsIfMuted: false,
  i18n,
  setDontNotifyForMentionsIfMuted: (0, import_addon_actions.action)("setDontNotifyForMentionsIfMuted"),
  setMuteExpiration: (0, import_addon_actions.action)("setMuteExpiration")
}), "getCommonProps");
const GroupConversationAllDefault = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ConversationNotificationsSettings.ConversationNotificationsSettings, {
  ...getCommonProps()
}), "GroupConversationAllDefault");
GroupConversationAllDefault.story = {
  name: "Group conversation, all default"
};
const GroupConversationMuted = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ConversationNotificationsSettings.ConversationNotificationsSettings, {
  ...getCommonProps(),
  muteExpiresAt: Date.UTC(2099, 5, 9)
}), "GroupConversationMuted");
GroupConversationMuted.story = {
  name: "Group conversation, muted"
};
const GroupConversationMentionsMuted = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ConversationNotificationsSettings.ConversationNotificationsSettings, {
  ...getCommonProps(),
  dontNotifyForMentionsIfMuted: true
}), "GroupConversationMentionsMuted");
GroupConversationMentionsMuted.story = {
  name: "Group conversation, @mentions muted"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupConversationAllDefault,
  GroupConversationMentionsMuted,
  GroupConversationMuted
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3MgfSBmcm9tICcuL0NvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5ncyc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6XG4gICAgJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0NvbnZlcnNhdGlvbkRldGFpbHMvQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzJyxcbn07XG5cbmNvbnN0IGdldENvbW1vblByb3BzID0gKCkgPT4gKHtcbiAgbXV0ZUV4cGlyZXNBdDogdW5kZWZpbmVkLFxuICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICBkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkOiBmYWxzZSxcbiAgaTE4bixcbiAgc2V0RG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZDogYWN0aW9uKCdzZXREb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkJyksXG4gIHNldE11dGVFeHBpcmF0aW9uOiBhY3Rpb24oJ3NldE11dGVFeHBpcmF0aW9uJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ29udmVyc2F0aW9uQWxsRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3Mgey4uLmdldENvbW1vblByb3BzKCl9IC8+XG4pO1xuXG5Hcm91cENvbnZlcnNhdGlvbkFsbERlZmF1bHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBjb252ZXJzYXRpb24sIGFsbCBkZWZhdWx0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENvbnZlcnNhdGlvbk11dGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5nc1xuICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgIG11dGVFeHBpcmVzQXQ9e0RhdGUuVVRDKDIwOTksIDUsIDkpfVxuICAvPlxuKTtcblxuR3JvdXBDb252ZXJzYXRpb25NdXRlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNvbnZlcnNhdGlvbiwgbXV0ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ29udmVyc2F0aW9uTWVudGlvbnNNdXRlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3NcbiAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICBkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkXG4gIC8+XG4pO1xuXG5Hcm91cENvbnZlcnNhdGlvbk1lbnRpb25zTXV0ZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBjb252ZXJzYXRpb24sIEBtZW50aW9ucyBtdXRlZCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLCtDQUFrRDtBQUVsRCxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLG9EQUFRO0FBQUEsRUFDYixPQUNFO0FBQ0o7QUFFQSxNQUFNLGlCQUFpQiw2QkFBTztBQUFBLEVBQzVCLGVBQWU7QUFBQSxFQUNmLGtCQUFrQjtBQUFBLEVBQ2xCLDhCQUE4QjtBQUFBLEVBQzlCO0FBQUEsRUFDQSxpQ0FBaUMsaUNBQU8saUNBQWlDO0FBQUEsRUFDekUsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUMvQyxJQVB1QjtBQVNoQixNQUFNLDhCQUE4Qiw2QkFDekMsb0NBQUM7QUFBQSxLQUFzQyxlQUFlO0FBQUEsQ0FBRyxHQURoQjtBQUkzQyw0QkFBNEIsUUFBUTtBQUFBLEVBQ2xDLE1BQU07QUFDUjtBQUVPLE1BQU0seUJBQXlCLDZCQUNwQyxvQ0FBQztBQUFBLEtBQ0ssZUFBZTtBQUFBLEVBQ25CLGVBQWUsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDO0FBQUEsQ0FDcEMsR0FKb0M7QUFPdEMsdUJBQXVCLFFBQVE7QUFBQSxFQUM3QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGlDQUFpQyw2QkFDNUMsb0NBQUM7QUFBQSxLQUNLLGVBQWU7QUFBQSxFQUNuQiw4QkFBNEI7QUFBQSxDQUM5QixHQUo0QztBQU85QywrQkFBK0IsUUFBUTtBQUFBLEVBQ3JDLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
