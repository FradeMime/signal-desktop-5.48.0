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
var ConversationNotificationsSettings_exports = {};
__export(ConversationNotificationsSettings_exports, {
  ConversationNotificationsSettings: () => ConversationNotificationsSettings
});
module.exports = __toCommonJS(ConversationNotificationsSettings_exports);
var import_react = __toESM(require("react"));
var import_PanelSection = require("./PanelSection");
var import_PanelRow = require("./PanelRow");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var import_Select = require("../../Select");
var import_isConversationMuted = require("../../../util/isConversationMuted");
var import_getMuteOptions = require("../../../util/getMuteOptions");
var import_parseIntOrThrow = require("../../../util/parseIntOrThrow");
var import_useUniqueId = require("../../../hooks/useUniqueId");
const ConversationNotificationsSettings = /* @__PURE__ */ __name(({
  conversationType,
  dontNotifyForMentionsIfMuted,
  i18n,
  muteExpiresAt,
  setMuteExpiration,
  setDontNotifyForMentionsIfMuted
}) => {
  const muteNotificationsSelectId = (0, import_useUniqueId.useUniqueId)();
  const mentionsSelectId = (0, import_useUniqueId.useUniqueId)();
  const muteOptions = (0, import_react.useMemo)(() => [
    ...(0, import_isConversationMuted.isConversationMuted)({ muteExpiresAt }) ? [] : [
      {
        disabled: true,
        text: i18n("notMuted"),
        value: -1
      }
    ],
    ...(0, import_getMuteOptions.getMuteOptions)(muteExpiresAt, i18n).map(({ disabled, name, value }) => ({
      disabled,
      text: name,
      value
    }))
  ], [i18n, muteExpiresAt]);
  const onMuteChange = /* @__PURE__ */ __name((rawValue) => {
    const ms = (0, import_parseIntOrThrow.parseIntOrThrow)(rawValue, "NotificationSettings: mute ms was not an integer");
    setMuteExpiration(ms);
  }, "onMuteChange");
  const onChangeDontNotifyForMentionsIfMuted = /* @__PURE__ */ __name((rawValue) => {
    setDontNotifyForMentionsIfMuted(rawValue === "yes");
  }, "onChangeDontNotifyForMentionsIfMuted");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "conversation-details-panel"
  }, /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("muteNotificationsTitle"),
      icon: import_ConversationDetailsIcon.IconType.mute
    }),
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: muteNotificationsSelectId
    }, i18n("muteNotificationsTitle")),
    right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: muteNotificationsSelectId,
      options: muteOptions,
      onChange: onMuteChange,
      value: -1
    })
  }), conversationType === "group" && /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("ConversationNotificationsSettings__mentions__label"),
      icon: import_ConversationDetailsIcon.IconType.mention
    }),
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: mentionsSelectId
    }, i18n("ConversationNotificationsSettings__mentions__label")),
    info: i18n("ConversationNotificationsSettings__mentions__info"),
    right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: mentionsSelectId,
      options: [
        {
          text: i18n("ConversationNotificationsSettings__mentions__select__always-notify"),
          value: "no"
        },
        {
          text: i18n("ConversationNotificationsSettings__mentions__select__dont-notify-for-mentions-if-muted"),
          value: "yes"
        }
      ],
      onChange: onChangeDontNotifyForMentionsIfMuted,
      value: dontNotifyForMentionsIfMuted ? "yes" : "no"
    })
  })));
}, "ConversationNotificationsSettings");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationNotificationsSettings
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBQYW5lbFNlY3Rpb24gfSBmcm9tICcuL1BhbmVsU2VjdGlvbic7XG5pbXBvcnQgeyBQYW5lbFJvdyB9IGZyb20gJy4vUGFuZWxSb3cnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uRGV0YWlsc0ljb24sIEljb25UeXBlIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzSWNvbic7XG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuLi8uLi9TZWxlY3QnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25NdXRlZCB9IGZyb20gJy4uLy4uLy4uL3V0aWwvaXNDb252ZXJzYXRpb25NdXRlZCc7XG5pbXBvcnQgeyBnZXRNdXRlT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3V0aWwvZ2V0TXV0ZU9wdGlvbnMnO1xuaW1wb3J0IHsgcGFyc2VJbnRPclRocm93IH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9wYXJzZUludE9yVGhyb3cnO1xuaW1wb3J0IHsgdXNlVW5pcXVlSWQgfSBmcm9tICcuLi8uLi8uLi9ob29rcy91c2VVbmlxdWVJZCc7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjb252ZXJzYXRpb25UeXBlOiBDb252ZXJzYXRpb25UeXBlVHlwZTtcbiAgZG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgbXV0ZUV4cGlyZXNBdDogdW5kZWZpbmVkIHwgbnVtYmVyO1xuICBzZXREb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkOiAoXG4gICAgZG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZDogYm9vbGVhblxuICApID0+IHVua25vd247XG4gIHNldE11dGVFeHBpcmF0aW9uOiAobXV0ZUV4cGlyZXNBdDogdW5kZWZpbmVkIHwgbnVtYmVyKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5nczogRnVuY3Rpb25Db21wb25lbnQ8XG4gIFByb3BzVHlwZVxuPiA9ICh7XG4gIGNvbnZlcnNhdGlvblR5cGUsXG4gIGRvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQsXG4gIGkxOG4sXG4gIG11dGVFeHBpcmVzQXQsXG4gIHNldE11dGVFeHBpcmF0aW9uLFxuICBzZXREb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkLFxufSkgPT4ge1xuICBjb25zdCBtdXRlTm90aWZpY2F0aW9uc1NlbGVjdElkID0gdXNlVW5pcXVlSWQoKTtcbiAgY29uc3QgbWVudGlvbnNTZWxlY3RJZCA9IHVzZVVuaXF1ZUlkKCk7XG4gIGNvbnN0IG11dGVPcHRpb25zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICAuLi4oaXNDb252ZXJzYXRpb25NdXRlZCh7IG11dGVFeHBpcmVzQXQgfSlcbiAgICAgICAgPyBbXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ25vdE11dGVkJyksXG4gICAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSksXG4gICAgICAuLi5nZXRNdXRlT3B0aW9ucyhtdXRlRXhwaXJlc0F0LCBpMThuKS5tYXAoXG4gICAgICAgICh7IGRpc2FibGVkLCBuYW1lLCB2YWx1ZSB9KSA9PiAoe1xuICAgICAgICAgIGRpc2FibGVkLFxuICAgICAgICAgIHRleHQ6IG5hbWUsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgIF0sXG4gICAgW2kxOG4sIG11dGVFeHBpcmVzQXRdXG4gICk7XG5cbiAgY29uc3Qgb25NdXRlQ2hhbmdlID0gKHJhd1ZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBtcyA9IHBhcnNlSW50T3JUaHJvdyhcbiAgICAgIHJhd1ZhbHVlLFxuICAgICAgJ05vdGlmaWNhdGlvblNldHRpbmdzOiBtdXRlIG1zIHdhcyBub3QgYW4gaW50ZWdlcidcbiAgICApO1xuICAgIHNldE11dGVFeHBpcmF0aW9uKG1zKTtcbiAgfTtcblxuICBjb25zdCBvbkNoYW5nZURvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQgPSAocmF3VmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHNldERvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQocmF3VmFsdWUgPT09ICd5ZXMnKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udmVyc2F0aW9uLWRldGFpbHMtcGFuZWxcIj5cbiAgICAgIDxQYW5lbFNlY3Rpb24+XG4gICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uXG4gICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignbXV0ZU5vdGlmaWNhdGlvbnNUaXRsZScpfVxuICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS5tdXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWw9e1xuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e211dGVOb3RpZmljYXRpb25zU2VsZWN0SWR9PlxuICAgICAgICAgICAgICB7aTE4bignbXV0ZU5vdGlmaWNhdGlvbnNUaXRsZScpfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICBpZD17bXV0ZU5vdGlmaWNhdGlvbnNTZWxlY3RJZH1cbiAgICAgICAgICAgICAgb3B0aW9ucz17bXV0ZU9wdGlvbnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk11dGVDaGFuZ2V9XG4gICAgICAgICAgICAgIHZhbHVlPXstMX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgICB7Y29udmVyc2F0aW9uVHlwZSA9PT0gJ2dyb3VwJyAmJiAoXG4gICAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uXG4gICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpMThuKFxuICAgICAgICAgICAgICAgICAgJ0NvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5nc19fbWVudGlvbnNfX2xhYmVsJ1xuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgaWNvbj17SWNvblR5cGUubWVudGlvbn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhYmVsPXtcbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e21lbnRpb25zU2VsZWN0SWR9PlxuICAgICAgICAgICAgICAgIHtpMThuKCdDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3NfX21lbnRpb25zX19sYWJlbCcpfVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5mbz17aTE4bignQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzX19tZW50aW9uc19faW5mbycpfVxuICAgICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgaWQ9e21lbnRpb25zU2VsZWN0SWR9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKFxuICAgICAgICAgICAgICAgICAgICAgICdDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3NfX21lbnRpb25zX19zZWxlY3RfX2Fsd2F5cy1ub3RpZnknXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbm8nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaTE4bihcbiAgICAgICAgICAgICAgICAgICAgICAnQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzX19tZW50aW9uc19fc2VsZWN0X19kb250LW5vdGlmeS1mb3ItbWVudGlvbnMtaWYtbXV0ZWQnXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAneWVzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VEb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkID8gJ3llcycgOiAnbm8nfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1BhbmVsU2VjdGlvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAi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
