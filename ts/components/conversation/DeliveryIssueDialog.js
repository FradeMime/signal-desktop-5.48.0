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
var DeliveryIssueDialog_exports = {};
__export(DeliveryIssueDialog_exports, {
  DeliveryIssueDialog: () => DeliveryIssueDialog
});
module.exports = __toCommonJS(DeliveryIssueDialog_exports);
var React = __toESM(require("react"));
var import_Button = require("../Button");
var import_Modal = require("../Modal");
var import_Intl = require("../Intl");
var import_Emojify = require("./Emojify");
var import_useRestoreFocus = require("../../hooks/useRestoreFocus");
function DeliveryIssueDialog(props) {
  const { i18n, inGroup, learnMoreAboutDeliveryIssue, sender, onClose } = props;
  const key = inGroup ? "DeliveryIssue--summary--group" : "DeliveryIssue--summary";
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  return /* @__PURE__ */ React.createElement(import_Modal.Modal, {
    hasXButton: false,
    onClose,
    i18n
  }, /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("div", {
    className: "module-delivery-issue-dialog__image"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "images/delivery-issue.svg",
    height: "110",
    width: "200",
    alt: ""
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-delivery-issue-dialog__title"
  }, i18n("DeliveryIssue--title")), /* @__PURE__ */ React.createElement("div", {
    className: "module-delivery-issue-dialog__description"
  }, /* @__PURE__ */ React.createElement(import_Intl.Intl, {
    id: key,
    components: {
      sender: /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
        text: sender.title
      })
    },
    i18n
  }))), /* @__PURE__ */ React.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: learnMoreAboutDeliveryIssue,
    size: import_Button.ButtonSize.Medium,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("DeliveryIssue--learnMore")), /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: onClose,
    ref: focusRef,
    size: import_Button.ButtonSize.Medium,
    variant: import_Button.ButtonVariant.Primary,
    className: "module-delivery-issue-dialog__close-button"
  }, i18n("Confirmation--confirm"))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeliveryIssueDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGVsaXZlcnlJc3N1ZURpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblNpemUsIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL01vZGFsJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi9JbnRsJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL0Vtb2ppZnknO1xuXG5pbXBvcnQgeyB1c2VSZXN0b3JlRm9jdXMgfSBmcm9tICcuLi8uLi9ob29rcy91c2VSZXN0b3JlRm9jdXMnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBzZW5kZXI6IENvbnZlcnNhdGlvblR5cGU7XG4gIGluR3JvdXA6IGJvb2xlYW47XG4gIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZTogKCkgPT4gdW5rbm93bjtcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBEZWxpdmVyeUlzc3VlRGlhbG9nKHByb3BzOiBQcm9wc1R5cGUpOiBSZWFjdC5SZWFjdEVsZW1lbnQge1xuICBjb25zdCB7IGkxOG4sIGluR3JvdXAsIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZSwgc2VuZGVyLCBvbkNsb3NlIH0gPSBwcm9wcztcblxuICBjb25zdCBrZXkgPSBpbkdyb3VwXG4gICAgPyAnRGVsaXZlcnlJc3N1ZS0tc3VtbWFyeS0tZ3JvdXAnXG4gICAgOiAnRGVsaXZlcnlJc3N1ZS0tc3VtbWFyeSc7XG5cbiAgLy8gRm9jdXMgZmlyc3QgYnV0dG9uIGFmdGVyIGluaXRpYWwgcmVuZGVyLCByZXN0b3JlIGZvY3VzIG9uIHRlYXJkb3duXG4gIGNvbnN0IFtmb2N1c1JlZl0gPSB1c2VSZXN0b3JlRm9jdXMoKTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBoYXNYQnV0dG9uPXtmYWxzZX0gb25DbG9zZT17b25DbG9zZX0gaTE4bj17aTE4bn0+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZGVsaXZlcnktaXNzdWUtZGlhbG9nX19pbWFnZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cImltYWdlcy9kZWxpdmVyeS1pc3N1ZS5zdmdcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTEwXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMjAwXCJcbiAgICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWRlbGl2ZXJ5LWlzc3VlLWRpYWxvZ19fdGl0bGVcIj5cbiAgICAgICAgICB7aTE4bignRGVsaXZlcnlJc3N1ZS0tdGl0bGUnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWRlbGl2ZXJ5LWlzc3VlLWRpYWxvZ19fZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgaWQ9e2tleX1cbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgc2VuZGVyOiA8RW1vamlmeSB0ZXh0PXtzZW5kZXIudGl0bGV9IC8+LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8TW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17bGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlfVxuICAgICAgICAgIHNpemU9e0J1dHRvblNpemUuTWVkaXVtfVxuICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ0RlbGl2ZXJ5SXNzdWUtLWxlYXJuTW9yZScpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgICBzaXplPXtCdXR0b25TaXplLk1lZGl1bX1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlByaW1hcnl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWRlbGl2ZXJ5LWlzc3VlLWRpYWxvZ19fY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdDb25maXJtYXRpb24tLWNvbmZpcm0nKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLG9CQUFrRDtBQUVsRCxtQkFBc0I7QUFDdEIsa0JBQXFCO0FBQ3JCLHFCQUF3QjtBQUV4Qiw2QkFBZ0M7QUFZekIsNkJBQTZCLE9BQXNDO0FBQ3hFLFFBQU0sRUFBRSxNQUFNLFNBQVMsNkJBQTZCLFFBQVEsWUFBWTtBQUV4RSxRQUFNLE1BQU0sVUFDUixrQ0FDQTtBQUdKLFFBQU0sQ0FBQyxZQUFZLDRDQUFnQjtBQUVuQyxTQUNFLG9DQUFDO0FBQUEsSUFBTSxZQUFZO0FBQUEsSUFBTztBQUFBLElBQWtCO0FBQUEsS0FDMUMsb0NBQUMsaUJBQ0Msb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxLQUFJO0FBQUEsSUFDSixRQUFPO0FBQUEsSUFDUCxPQUFNO0FBQUEsSUFDTixLQUFJO0FBQUEsR0FDTixDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssc0JBQXNCLENBQzlCLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsTUFDVixRQUFRLG9DQUFDO0FBQUEsUUFBUSxNQUFNLE9BQU87QUFBQSxPQUFPO0FBQUEsSUFDdkM7QUFBQSxJQUNBO0FBQUEsR0FDRixDQUNGLENBQ0YsR0FDQSxvQ0FBQyxtQkFBTSxjQUFOLE1BQ0Msb0NBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxJQUNULE1BQU0seUJBQVc7QUFBQSxJQUNqQixTQUFTLDRCQUFjO0FBQUEsS0FFdEIsS0FBSywwQkFBMEIsQ0FDbEMsR0FDQSxvQ0FBQztBQUFBLElBQ0MsU0FBUztBQUFBLElBQ1QsS0FBSztBQUFBLElBQ0wsTUFBTSx5QkFBVztBQUFBLElBQ2pCLFNBQVMsNEJBQWM7QUFBQSxJQUN2QixXQUFVO0FBQUEsS0FFVCxLQUFLLHVCQUF1QixDQUMvQixDQUNGLENBQ0Y7QUFFSjtBQXREZ0IiLAogICJuYW1lcyI6IFtdCn0K
