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
var CallingLobbyJoinButton_exports = {};
__export(CallingLobbyJoinButton_exports, {
  CallingLobbyJoinButton: () => CallingLobbyJoinButton,
  CallingLobbyJoinButtonVariant: () => CallingLobbyJoinButtonVariant
});
module.exports = __toCommonJS(CallingLobbyJoinButton_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_Button = require("./Button");
var import_Spinner = require("./Spinner");
const PADDING_HORIZONTAL = 48;
const PADDING_VERTICAL = 12;
var CallingLobbyJoinButtonVariant = /* @__PURE__ */ ((CallingLobbyJoinButtonVariant2) => {
  CallingLobbyJoinButtonVariant2["CallIsFull"] = "CallIsFull";
  CallingLobbyJoinButtonVariant2["Join"] = "Join";
  CallingLobbyJoinButtonVariant2["Loading"] = "Loading";
  CallingLobbyJoinButtonVariant2["Start"] = "Start";
  return CallingLobbyJoinButtonVariant2;
})(CallingLobbyJoinButtonVariant || {});
const CallingLobbyJoinButton = /* @__PURE__ */ __name(({ disabled, i18n, onClick, variant }) => {
  const [width, setWidth] = (0, import_react.useState)();
  const [height, setHeight] = (0, import_react.useState)();
  const childrenByVariant = {
    ["CallIsFull" /* CallIsFull */]: i18n("calling__call-is-full"),
    ["Loading" /* Loading */]: /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      svgSize: "small"
    }),
    ["Join" /* Join */]: i18n("calling__join"),
    ["Start" /* Start */]: i18n("calling__start")
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, Boolean(width && height) && /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    className: "module-CallingLobbyJoinButton",
    disabled,
    onClick,
    style: { width, height },
    tabIndex: 0,
    variant: import_Button.ButtonVariant.Calling
  }, childrenByVariant[variant]), /* @__PURE__ */ import_react.default.createElement("div", {
    style: {
      visibility: "hidden",
      position: "fixed",
      left: -9999,
      top: -9999
    }
  }, Object.values(CallingLobbyJoinButtonVariant).map((candidateVariant) => /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    key: candidateVariant,
    className: "module-CallingLobbyJoinButton",
    variant: import_Button.ButtonVariant.Calling,
    onClick: import_lodash.noop,
    ref: (button) => {
      if (!button) {
        return;
      }
      const { width: variantWidth, height: variantHeight } = button.getBoundingClientRect();
      setWidth((previousWidth = 0) => Math.ceil(Math.max(previousWidth, variantWidth + PADDING_HORIZONTAL)));
      setHeight((previousHeight = 0) => Math.ceil(Math.max(previousHeight, variantHeight + PADDING_VERTICAL)));
    }
  }, childrenByVariant[candidateVariant]))));
}, "CallingLobbyJoinButton");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingLobbyJoinButton,
  CallingLobbyJoinButtonVariant
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0xvYmJ5Sm9pbkJ1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3RDaGlsZCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuXG5jb25zdCBQQURESU5HX0hPUklaT05UQUwgPSA0ODtcbmNvbnN0IFBBRERJTkdfVkVSVElDQUwgPSAxMjtcblxuZXhwb3J0IGVudW0gQ2FsbGluZ0xvYmJ5Sm9pbkJ1dHRvblZhcmlhbnQge1xuICBDYWxsSXNGdWxsID0gJ0NhbGxJc0Z1bGwnLFxuICBKb2luID0gJ0pvaW4nLFxuICBMb2FkaW5nID0gJ0xvYWRpbmcnLFxuICBTdGFydCA9ICdTdGFydCcsXG59XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgaXMgYSBsaXR0bGUgd2VpcmQuIFdoeSBub3QganVzdCByZW5kZXIgYSBidXR0b24gd2l0aCBzb21lIGNoaWxkcmVuP1xuICpcbiAqIFRoZSBjb250ZW50cyBvZiB0aGlzIGNvbXBvbmVudCBjYW4gY2hhbmdlIGJ1dCB3ZSBkb24ndCB3YW50IGl0cyBzaXplIHRvIGNoYW5nZSwgc28gd2VcbiAqIHJlbmRlciBhbGwgdGhlIHZhcmlhbnRzIGludmlzaWJseSwgY29tcHV0ZSB0aGUgbWF4aW11bSBzaXplLCBhbmQgdGhlbiByZW5kZXIgdGhlXG4gKiBcImZpbmFsXCIgYnV0dG9uIHdpdGggdGhvc2UgZGltZW5zaW9ucy5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgd2UgbWlnaHQgaW5pdGlhbGx5IHJlbmRlciBcIkpvaW4gY2FsbFwiIGFuZCB0aGVuIHJlbmRlciBhIHNwaW5uZXIgd2hlbiB5b3VcbiAqIGNsaWNrIHRoZSBidXR0b24uIFRoZSBidXR0b24gc2hvdWxkbid0IHJlc2l6ZSBpbiB0aGF0IHNpdHVhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IENhbGxpbmdMb2JieUpvaW5CdXR0b246IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsaWNrOiAoKSA9PiB2b2lkO1xuICB2YXJpYW50OiBDYWxsaW5nTG9iYnlKb2luQnV0dG9uVmFyaWFudDtcbn0+ID0gKHsgZGlzYWJsZWQsIGkxOG4sIG9uQ2xpY2ssIHZhcmlhbnQgfSkgPT4ge1xuICBjb25zdCBbd2lkdGgsIHNldFdpZHRoXSA9IHVzZVN0YXRlPHVuZGVmaW5lZCB8IG51bWJlcj4oKTtcbiAgY29uc3QgW2hlaWdodCwgc2V0SGVpZ2h0XSA9IHVzZVN0YXRlPHVuZGVmaW5lZCB8IG51bWJlcj4oKTtcblxuICBjb25zdCBjaGlsZHJlbkJ5VmFyaWFudDogUmVjb3JkPENhbGxpbmdMb2JieUpvaW5CdXR0b25WYXJpYW50LCBSZWFjdENoaWxkPiA9IHtcbiAgICBbQ2FsbGluZ0xvYmJ5Sm9pbkJ1dHRvblZhcmlhbnQuQ2FsbElzRnVsbF06IGkxOG4oJ2NhbGxpbmdfX2NhbGwtaXMtZnVsbCcpLFxuICAgIFtDYWxsaW5nTG9iYnlKb2luQnV0dG9uVmFyaWFudC5Mb2FkaW5nXTogPFNwaW5uZXIgc3ZnU2l6ZT1cInNtYWxsXCIgLz4sXG4gICAgW0NhbGxpbmdMb2JieUpvaW5CdXR0b25WYXJpYW50LkpvaW5dOiBpMThuKCdjYWxsaW5nX19qb2luJyksXG4gICAgW0NhbGxpbmdMb2JieUpvaW5CdXR0b25WYXJpYW50LlN0YXJ0XTogaTE4bignY2FsbGluZ19fc3RhcnQnKSxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7Qm9vbGVhbih3aWR0aCAmJiBoZWlnaHQpICYmIChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1DYWxsaW5nTG9iYnlKb2luQnV0dG9uXCJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICBzdHlsZT17eyB3aWR0aCwgaGVpZ2h0IH19XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5DYWxsaW5nfVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVuQnlWYXJpYW50W3ZhcmlhbnRdfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICl9XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgbGVmdDogLTk5OTksXG4gICAgICAgICAgdG9wOiAtOTk5OSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge09iamVjdC52YWx1ZXMoQ2FsbGluZ0xvYmJ5Sm9pbkJ1dHRvblZhcmlhbnQpLm1hcChjYW5kaWRhdGVWYXJpYW50ID0+IChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2NhbmRpZGF0ZVZhcmlhbnR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ0xvYmJ5Sm9pbkJ1dHRvblwiXG4gICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LkNhbGxpbmd9XG4gICAgICAgICAgICBvbkNsaWNrPXtub29wfVxuICAgICAgICAgICAgcmVmPXsoYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFidXR0b24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgeyB3aWR0aDogdmFyaWFudFdpZHRoLCBoZWlnaHQ6IHZhcmlhbnRIZWlnaHQgfSA9XG4gICAgICAgICAgICAgICAgYnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgIC8vIFdlIGNvdWxkIHNldCB0aGUgcGFkZGluZyBpbiBDU1MsIGJ1dCB3ZSBkb24ndCBkbyB0aGF0IGluIGNhc2Ugc29tZSBvdGhlclxuICAgICAgICAgICAgICAvLyAgIHN0eWxpbmcgY2F1c2VzIGEgcmUtcmVuZGVyIG9mIHRoZSBidXR0b24gYnV0IG5vdCBvZiB0aGUgY29tcG9uZW50LiBUaGlzXG4gICAgICAgICAgICAgIC8vICAgaXMgZWFzaWVzdCB0byByZXByb2R1Y2UgaW4gU3Rvcnlib29rLCB3aGVyZSB0aGUgZm9udCBoYXNuJ3QgbG9hZGVkIHlldDtcbiAgICAgICAgICAgICAgLy8gICB3ZSBjb21wdXRlIHRoZSBzaXplLCB0aGVuIHRoZSBmb250IG1ha2VzIHRoZSB0ZXh0IGEgYml0IGxhcmdlciwgYW5kXG4gICAgICAgICAgICAgIC8vICAgdGhlcmUncyBhIGxheW91dCBpc3N1ZS5cbiAgICAgICAgICAgICAgc2V0V2lkdGgoKHByZXZpb3VzV2lkdGggPSAwKSA9PlxuICAgICAgICAgICAgICAgIE1hdGguY2VpbChcbiAgICAgICAgICAgICAgICAgIE1hdGgubWF4KHByZXZpb3VzV2lkdGgsIHZhcmlhbnRXaWR0aCArIFBBRERJTkdfSE9SSVpPTlRBTClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHNldEhlaWdodCgocHJldmlvdXNIZWlnaHQgPSAwKSA9PlxuICAgICAgICAgICAgICAgIE1hdGguY2VpbChcbiAgICAgICAgICAgICAgICAgIE1hdGgubWF4KHByZXZpb3VzSGVpZ2h0LCB2YXJpYW50SGVpZ2h0ICsgUEFERElOR19WRVJUSUNBTClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbkJ5VmFyaWFudFtjYW5kaWRhdGVWYXJpYW50XX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBZ0M7QUFDaEMsb0JBQXFCO0FBR3JCLG9CQUFzQztBQUN0QyxxQkFBd0I7QUFFeEIsTUFBTSxxQkFBcUI7QUFDM0IsTUFBTSxtQkFBbUI7QUFFbEIsSUFBSyxnQ0FBTCxrQkFBSyxtQ0FBTDtBQUNMLGlEQUFhO0FBQ2IsMkNBQU87QUFDUCw4Q0FBVTtBQUNWLDRDQUFRO0FBSkU7QUFBQTtBQWlCTCxNQUFNLHlCQUtSLHdCQUFDLEVBQUUsVUFBVSxNQUFNLFNBQVMsY0FBYztBQUM3QyxRQUFNLENBQUMsT0FBTyxZQUFZLDJCQUE2QjtBQUN2RCxRQUFNLENBQUMsUUFBUSxhQUFhLDJCQUE2QjtBQUV6RCxRQUFNLG9CQUF1RTtBQUFBLEtBQzFFLGdDQUEyQyxLQUFLLHVCQUF1QjtBQUFBLEtBQ3ZFLDBCQUF3QyxtREFBQztBQUFBLE1BQVEsU0FBUTtBQUFBLEtBQVE7QUFBQSxLQUNqRSxvQkFBcUMsS0FBSyxlQUFlO0FBQUEsS0FDekQsc0JBQXNDLEtBQUssZ0JBQWdCO0FBQUEsRUFDOUQ7QUFFQSxTQUNFLHdGQUNHLFFBQVEsU0FBUyxNQUFNLEtBQ3RCLG1EQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU8sRUFBRSxPQUFPLE9BQU87QUFBQSxJQUN2QixVQUFVO0FBQUEsSUFDVixTQUFTLDRCQUFjO0FBQUEsS0FFdEIsa0JBQWtCLFFBQ3JCLEdBRUYsbURBQUM7QUFBQSxJQUNDLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQO0FBQUEsS0FFQyxPQUFPLE9BQU8sNkJBQTZCLEVBQUUsSUFBSSxzQkFDaEQsbURBQUM7QUFBQSxJQUNDLEtBQUs7QUFBQSxJQUNMLFdBQVU7QUFBQSxJQUNWLFNBQVMsNEJBQWM7QUFBQSxJQUN2QixTQUFTO0FBQUEsSUFDVCxLQUFLLENBQUMsV0FBcUM7QUFDekMsVUFBSSxDQUFDLFFBQVE7QUFDWDtBQUFBLE1BQ0Y7QUFDQSxZQUFNLEVBQUUsT0FBTyxjQUFjLFFBQVEsa0JBQ25DLE9BQU8sc0JBQXNCO0FBTy9CLGVBQVMsQ0FBQyxnQkFBZ0IsTUFDeEIsS0FBSyxLQUNILEtBQUssSUFBSSxlQUFlLGVBQWUsa0JBQWtCLENBQzNELENBQ0Y7QUFDQSxnQkFBVSxDQUFDLGlCQUFpQixNQUMxQixLQUFLLEtBQ0gsS0FBSyxJQUFJLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLENBQzNELENBQ0Y7QUFBQSxJQUNGO0FBQUEsS0FFQyxrQkFBa0IsaUJBQ3JCLENBQ0QsQ0FDSCxDQUNGO0FBRUosR0FyRUs7IiwKICAibmFtZXMiOiBbXQp9Cg==
