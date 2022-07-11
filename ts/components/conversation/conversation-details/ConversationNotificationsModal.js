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
var ConversationNotificationsModal_exports = {};
__export(ConversationNotificationsModal_exports, {
  ConversationNotificationsModal: () => ConversationNotificationsModal
});
module.exports = __toCommonJS(ConversationNotificationsModal_exports);
var import_react = __toESM(require("react"));
var import_getMuteOptions = require("../../../util/getMuteOptions");
var import_parseIntOrThrow = require("../../../util/parseIntOrThrow");
var import_Checkbox = require("../../Checkbox");
var import_Modal = require("../../Modal");
var import_Button = require("../../Button");
const ConversationNotificationsModal = /* @__PURE__ */ __name(({
  i18n,
  muteExpiresAt,
  onClose,
  setMuteExpiration
}) => {
  const muteOptions = (0, import_react.useMemo)(() => (0, import_getMuteOptions.getMuteOptions)(muteExpiresAt, i18n).map(({ disabled, name, value }) => ({
    disabled,
    text: name,
    value
  })), [i18n, muteExpiresAt]);
  const [muteExpirationValue, setMuteExpirationValue] = (0, import_react.useState)(muteExpiresAt);
  const onMuteChange = /* @__PURE__ */ __name(() => {
    const ms = (0, import_parseIntOrThrow.parseIntOrThrow)(muteExpirationValue, "NotificationSettings: mute ms was not an integer");
    setMuteExpiration(ms);
    onClose();
  }, "onMuteChange");
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasStickyButtons: true,
    hasXButton: true,
    onClose,
    i18n,
    title: i18n("muteNotificationsTitle")
  }, muteOptions.filter((x) => x.value > 0).map((option) => /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
    checked: muteExpirationValue === option.value,
    disabled: option.disabled,
    isRadio: true,
    key: option.value,
    label: option.text,
    moduleClassName: "ConversationDetails__radio",
    name: "mute",
    onChange: (value) => value && setMuteExpirationValue(option.value)
  })), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClose,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onMuteChange,
    variant: import_Button.ButtonVariant.Primary
  }, i18n("mute"))));
}, "ConversationNotificationsModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationNotificationsModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc01vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRNdXRlT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3V0aWwvZ2V0TXV0ZU9wdGlvbnMnO1xuaW1wb3J0IHsgcGFyc2VJbnRPclRocm93IH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9wYXJzZUludE9yVGhyb3cnO1xuaW1wb3J0IHsgQ2hlY2tib3ggfSBmcm9tICcuLi8uLi9DaGVja2JveCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uLy4uL01vZGFsJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uLy4uL0J1dHRvbic7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtdXRlRXhwaXJlc0F0OiB1bmRlZmluZWQgfCBudW1iZXI7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIHNldE11dGVFeHBpcmF0aW9uOiAobXV0ZUV4cGlyZXNBdDogdW5kZWZpbmVkIHwgbnVtYmVyKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNNb2RhbCA9ICh7XG4gIGkxOG4sXG4gIG11dGVFeHBpcmVzQXQsXG4gIG9uQ2xvc2UsXG4gIHNldE11dGVFeHBpcmF0aW9uLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBtdXRlT3B0aW9ucyA9IHVzZU1lbW8oXG4gICAgKCkgPT5cbiAgICAgIGdldE11dGVPcHRpb25zKG11dGVFeHBpcmVzQXQsIGkxOG4pLm1hcCgoeyBkaXNhYmxlZCwgbmFtZSwgdmFsdWUgfSkgPT4gKHtcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgIHRleHQ6IG5hbWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfSkpLFxuICAgIFtpMThuLCBtdXRlRXhwaXJlc0F0XVxuICApO1xuXG4gIGNvbnN0IFttdXRlRXhwaXJhdGlvblZhbHVlLCBzZXRNdXRlRXhwaXJhdGlvblZhbHVlXSA9IHVzZVN0YXRlKG11dGVFeHBpcmVzQXQpO1xuXG4gIGNvbnN0IG9uTXV0ZUNoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCBtcyA9IHBhcnNlSW50T3JUaHJvdyhcbiAgICAgIG11dGVFeHBpcmF0aW9uVmFsdWUsXG4gICAgICAnTm90aWZpY2F0aW9uU2V0dGluZ3M6IG11dGUgbXMgd2FzIG5vdCBhbiBpbnRlZ2VyJ1xuICAgICk7XG4gICAgc2V0TXV0ZUV4cGlyYXRpb24obXMpO1xuICAgIG9uQ2xvc2UoKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbFxuICAgICAgaGFzU3RpY2t5QnV0dG9uc1xuICAgICAgaGFzWEJ1dHRvblxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICB0aXRsZT17aTE4bignbXV0ZU5vdGlmaWNhdGlvbnNUaXRsZScpfVxuICAgID5cbiAgICAgIHttdXRlT3B0aW9uc1xuICAgICAgICAuZmlsdGVyKHggPT4geC52YWx1ZSA+IDApXG4gICAgICAgIC5tYXAob3B0aW9uID0+IChcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e211dGVFeHBpcmF0aW9uVmFsdWUgPT09IG9wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtvcHRpb24uZGlzYWJsZWR9XG4gICAgICAgICAgICBpc1JhZGlvXG4gICAgICAgICAgICBrZXk9e29wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgIGxhYmVsPXtvcHRpb24udGV4dH1cbiAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIkNvbnZlcnNhdGlvbkRldGFpbHNfX3JhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJtdXRlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiB2YWx1ZSAmJiBzZXRNdXRlRXhwaXJhdGlvblZhbHVlKG9wdGlvbi52YWx1ZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8TW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9IHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fT5cbiAgICAgICAgICB7aTE4bignY2FuY2VsJyl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uTXV0ZUNoYW5nZX0gdmFyaWFudD17QnV0dG9uVmFyaWFudC5QcmltYXJ5fT5cbiAgICAgICAgICB7aTE4bignbXV0ZScpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF5QztBQUd6Qyw0QkFBK0I7QUFDL0IsNkJBQWdDO0FBQ2hDLHNCQUF5QjtBQUN6QixtQkFBc0I7QUFDdEIsb0JBQXNDO0FBUy9CLE1BQU0saUNBQWlDLHdCQUFDO0FBQUEsRUFDN0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixRQUFNLGNBQWMsMEJBQ2xCLE1BQ0UsMENBQWUsZUFBZSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsVUFBVSxNQUFNLFlBQWE7QUFBQSxJQUN0RTtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGLEVBQUUsR0FDSixDQUFDLE1BQU0sYUFBYSxDQUN0QjtBQUVBLFFBQU0sQ0FBQyxxQkFBcUIsMEJBQTBCLDJCQUFTLGFBQWE7QUFFNUUsUUFBTSxlQUFlLDZCQUFNO0FBQ3pCLFVBQU0sS0FBSyw0Q0FDVCxxQkFDQSxrREFDRjtBQUNBLHNCQUFrQixFQUFFO0FBQ3BCLFlBQVE7QUFBQSxFQUNWLEdBUHFCO0FBU3JCLFNBQ0UsbURBQUM7QUFBQSxJQUNDLGtCQUFnQjtBQUFBLElBQ2hCLFlBQVU7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTyxLQUFLLHdCQUF3QjtBQUFBLEtBRW5DLFlBQ0UsT0FBTyxPQUFLLEVBQUUsUUFBUSxDQUFDLEVBQ3ZCLElBQUksWUFDSCxtREFBQztBQUFBLElBQ0MsU0FBUyx3QkFBd0IsT0FBTztBQUFBLElBQ3hDLFVBQVUsT0FBTztBQUFBLElBQ2pCLFNBQU87QUFBQSxJQUNQLEtBQUssT0FBTztBQUFBLElBQ1osT0FBTyxPQUFPO0FBQUEsSUFDZCxpQkFBZ0I7QUFBQSxJQUNoQixNQUFLO0FBQUEsSUFDTCxVQUFVLFdBQVMsU0FBUyx1QkFBdUIsT0FBTyxLQUFLO0FBQUEsR0FDakUsQ0FDRCxHQUNILG1EQUFDLG1CQUFNLGNBQU4sTUFDQyxtREFBQztBQUFBLElBQU8sU0FBUztBQUFBLElBQVMsU0FBUyw0QkFBYztBQUFBLEtBQzlDLEtBQUssUUFBUSxDQUNoQixHQUNBLG1EQUFDO0FBQUEsSUFBTyxTQUFTO0FBQUEsSUFBYyxTQUFTLDRCQUFjO0FBQUEsS0FDbkQsS0FBSyxNQUFNLENBQ2QsQ0FDRixDQUNGO0FBRUosR0EzRDhDOyIsCiAgIm5hbWVzIjogW10KfQo=
