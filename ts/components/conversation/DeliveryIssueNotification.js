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
var DeliveryIssueNotification_exports = {};
__export(DeliveryIssueNotification_exports, {
  DeliveryIssueNotification: () => DeliveryIssueNotification
});
module.exports = __toCommonJS(DeliveryIssueNotification_exports);
var import_react = __toESM(require("react"));
var import_Button = require("../Button");
var import_SystemMessage = require("./SystemMessage");
var import_Intl = require("../Intl");
var import_Emojify = require("./Emojify");
var import_DeliveryIssueDialog = require("./DeliveryIssueDialog");
function DeliveryIssueNotification(props) {
  const { i18n, inGroup, sender, learnMoreAboutDeliveryIssue } = props;
  const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
  const openDialog = (0, import_react.useCallback)(() => {
    setIsDialogOpen(true);
  }, [setIsDialogOpen]);
  const closeDialog = (0, import_react.useCallback)(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);
  if (!sender) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    contents: /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      id: "DeliveryIssue--notification",
      components: {
        sender: /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
          text: sender.firstName || sender.title
        })
      },
      i18n
    }),
    icon: "info",
    button: /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: openDialog,
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("DeliveryIssue--learnMore"))
  }), isDialogOpen ? /* @__PURE__ */ import_react.default.createElement(import_DeliveryIssueDialog.DeliveryIssueDialog, {
    i18n,
    inGroup,
    learnMoreAboutDeliveryIssue,
    sender,
    onClose: closeDialog
  }) : null);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeliveryIssueNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGVsaXZlcnlJc3N1ZU5vdGlmaWNhdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblNpemUsIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHsgU3lzdGVtTWVzc2FnZSB9IGZyb20gJy4vU3lzdGVtTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHsgRW1vamlmeSB9IGZyb20gJy4vRW1vamlmeSc7XG5cbmltcG9ydCB7IERlbGl2ZXJ5SXNzdWVEaWFsb2cgfSBmcm9tICcuL0RlbGl2ZXJ5SXNzdWVEaWFsb2cnO1xuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGFUeXBlID0ge1xuICBzZW5kZXI/OiBDb252ZXJzYXRpb25UeXBlO1xuICBpbkdyb3VwOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNBY3Rpb25zVHlwZSA9IHtcbiAgbGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlOiAoKSA9PiB1bmtub3duO1xufTtcblxudHlwZSBQcm9wc0hvdXNla2VlcGluZ1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBQcm9wc0RhdGFUeXBlICZcbiAgUHJvcHNBY3Rpb25zVHlwZSAmXG4gIFByb3BzSG91c2VrZWVwaW5nVHlwZTtcblxuZXhwb3J0IGZ1bmN0aW9uIERlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb24oXG4gIHByb3BzOiBQcm9wc1R5cGVcbik6IFJlYWN0RWxlbWVudCB8IG51bGwge1xuICBjb25zdCB7IGkxOG4sIGluR3JvdXAsIHNlbmRlciwgbGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlIH0gPSBwcm9wcztcbiAgY29uc3QgW2lzRGlhbG9nT3Blbiwgc2V0SXNEaWFsb2dPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBvcGVuRGlhbG9nID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldElzRGlhbG9nT3Blbih0cnVlKTtcbiAgfSwgW3NldElzRGlhbG9nT3Blbl0pO1xuICBjb25zdCBjbG9zZURpYWxvZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpO1xuICB9LCBbc2V0SXNEaWFsb2dPcGVuXSk7XG5cbiAgaWYgKCFzZW5kZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxTeXN0ZW1NZXNzYWdlXG4gICAgICAgIGNvbnRlbnRzPXtcbiAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgaWQ9XCJEZWxpdmVyeUlzc3VlLS1ub3RpZmljYXRpb25cIlxuICAgICAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgICAgICBzZW5kZXI6IDxFbW9qaWZ5IHRleHQ9e3NlbmRlci5maXJzdE5hbWUgfHwgc2VuZGVyLnRpdGxlfSAvPixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAgaWNvbj1cImluZm9cIlxuICAgICAgICBidXR0b249e1xuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5EaWFsb2d9XG4gICAgICAgICAgICBzaXplPXtCdXR0b25TaXplLlNtYWxsfVxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TeXN0ZW1NZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdEZWxpdmVyeUlzc3VlLS1sZWFybk1vcmUnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgLz5cbiAgICAgIHtpc0RpYWxvZ09wZW4gPyAoXG4gICAgICAgIDxEZWxpdmVyeUlzc3VlRGlhbG9nXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpbkdyb3VwPXtpbkdyb3VwfVxuICAgICAgICAgIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZT17bGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlfVxuICAgICAgICAgIHNlbmRlcj17c2VuZGVyfVxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQTZDO0FBRTdDLG9CQUFrRDtBQUNsRCwyQkFBOEI7QUFHOUIsa0JBQXFCO0FBQ3JCLHFCQUF3QjtBQUV4QixpQ0FBb0M7QUFtQjdCLG1DQUNMLE9BQ3FCO0FBQ3JCLFFBQU0sRUFBRSxNQUFNLFNBQVMsUUFBUSxnQ0FBZ0M7QUFDL0QsUUFBTSxDQUFDLGNBQWMsbUJBQW1CLDJCQUFrQixLQUFLO0FBRS9ELFFBQU0sYUFBYSw4QkFBWSxNQUFNO0FBQ25DLG9CQUFnQixJQUFJO0FBQUEsRUFDdEIsR0FBRyxDQUFDLGVBQWUsQ0FBQztBQUNwQixRQUFNLGNBQWMsOEJBQVksTUFBTTtBQUNwQyxvQkFBZ0IsS0FBSztBQUFBLEVBQ3ZCLEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFFcEIsTUFBSSxDQUFDLFFBQVE7QUFDWCxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxJQUNDLFVBQ0UsbURBQUM7QUFBQSxNQUNDLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLFFBQVEsbURBQUM7QUFBQSxVQUFRLE1BQU0sT0FBTyxhQUFhLE9BQU87QUFBQSxTQUFPO0FBQUEsTUFDM0Q7QUFBQSxNQUNBO0FBQUEsS0FDRjtBQUFBLElBRUYsTUFBSztBQUFBLElBQ0wsUUFDRSxtREFBQztBQUFBLE1BQ0MsU0FBUztBQUFBLE1BQ1QsTUFBTSx5QkFBVztBQUFBLE1BQ2pCLFNBQVMsNEJBQWM7QUFBQSxPQUV0QixLQUFLLDBCQUEwQixDQUNsQztBQUFBLEdBRUosR0FDQyxlQUNDLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUztBQUFBLEdBQ1gsSUFDRSxJQUNOO0FBRUo7QUFuRGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
