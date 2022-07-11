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
var DeliveryIssueNotification_stories_exports = {};
__export(DeliveryIssueNotification_stories_exports, {
  Default: () => Default,
  InGroup: () => InGroup,
  WithALongName: () => WithALongName,
  default: () => DeliveryIssueNotification_stories_default
});
module.exports = __toCommonJS(DeliveryIssueNotification_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_DeliveryIssueNotification = require("./DeliveryIssueNotification");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var DeliveryIssueNotification_stories_default = {
  title: "Components/Conversation/DeliveryIssueNotification"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const sender = (0, import_getDefaultConversation.getDefaultConversation)();
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_DeliveryIssueNotification.DeliveryIssueNotification, {
    i18n,
    inGroup: false,
    learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
    sender
  });
}, "Default");
const WithALongName = /* @__PURE__ */ __name(() => {
  const longName = "\u{1F937}\u{1F3FD}\u200D\u2640\uFE0F\u2764\uFE0F\u{1F41E}".repeat(50);
  return /* @__PURE__ */ React.createElement(import_DeliveryIssueNotification.DeliveryIssueNotification, {
    i18n,
    inGroup: false,
    learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
    sender: (0, import_getDefaultConversation.getDefaultConversation)({
      firstName: longName,
      name: longName,
      profileName: longName,
      title: longName
    })
  });
}, "WithALongName");
WithALongName.story = {
  name: "With a long name"
};
const InGroup = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_DeliveryIssueNotification.DeliveryIssueNotification, {
    i18n,
    inGroup: true,
    learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
    sender
  });
}, "InGroup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  InGroup,
  WithALongName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGVsaXZlcnlJc3N1ZU5vdGlmaWNhdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IERlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb24gfSBmcm9tICcuL0RlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vRGVsaXZlcnlJc3N1ZU5vdGlmaWNhdGlvbicsXG59O1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuY29uc3Qgc2VuZGVyID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPERlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb25cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBpbkdyb3VwPXtmYWxzZX1cbiAgICAgIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZT17YWN0aW9uKCdsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUnKX1cbiAgICAgIHNlbmRlcj17c2VuZGVyfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aEFMb25nTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGxvbmdOYW1lID0gJ1x1RDgzRVx1REQzN1x1RDgzQ1x1REZGRFx1MjAwRFx1MjY0MFx1RkUwRlx1Mjc2NFx1RkUwRlx1RDgzRFx1REMxRScucmVwZWF0KDUwKTtcbiAgcmV0dXJuIChcbiAgICA8RGVsaXZlcnlJc3N1ZU5vdGlmaWNhdGlvblxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIGluR3JvdXA9e2ZhbHNlfVxuICAgICAgbGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlPXthY3Rpb24oJ2xlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZScpfVxuICAgICAgc2VuZGVyPXtnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgZmlyc3ROYW1lOiBsb25nTmFtZSxcbiAgICAgICAgbmFtZTogbG9uZ05hbWUsXG4gICAgICAgIHByb2ZpbGVOYW1lOiBsb25nTmFtZSxcbiAgICAgICAgdGl0bGU6IGxvbmdOYW1lLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbldpdGhBTG9uZ05hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRoIGEgbG9uZyBuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbkdyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8RGVsaXZlcnlJc3N1ZU5vdGlmaWNhdGlvblxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIGluR3JvdXBcbiAgICAgIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZT17YWN0aW9uKCdsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUnKX1cbiAgICAgIHNlbmRlcj17c2VuZGVyfVxuICAgIC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLHVDQUEwQztBQUMxQyxvQ0FBdUM7QUFFdkMsSUFBTyw0Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFDdkMsTUFBTSxTQUFTLDBEQUF1QjtBQUUvQixNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVCw2QkFBNkIsaUNBQU8sNkJBQTZCO0FBQUEsSUFDakU7QUFBQSxHQUNGO0FBRUosR0FUdUI7QUFXaEIsTUFBTSxnQkFBZ0IsNkJBQW1CO0FBQzlDLFFBQU0sV0FBVyw0REFBYyxPQUFPLEVBQUU7QUFDeEMsU0FDRSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNULDZCQUE2QixpQ0FBTyw2QkFBNkI7QUFBQSxJQUNqRSxRQUFRLDBEQUF1QjtBQUFBLE1BQzdCLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxJQUNULENBQUM7QUFBQSxHQUNIO0FBRUosR0FmNkI7QUFpQjdCLGNBQWMsUUFBUTtBQUFBLEVBQ3BCLE1BQU07QUFDUjtBQUVPLE1BQU0sVUFBVSw2QkFBbUI7QUFDeEMsU0FDRSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBLFNBQU87QUFBQSxJQUNQLDZCQUE2QixpQ0FBTyw2QkFBNkI7QUFBQSxJQUNqRTtBQUFBLEdBQ0Y7QUFFSixHQVR1QjsiLAogICJuYW1lcyI6IFtdCn0K
