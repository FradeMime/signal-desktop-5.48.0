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
var AvatarModalButtons_exports = {};
__export(AvatarModalButtons_exports, {
  AvatarModalButtons: () => AvatarModalButtons
});
module.exports = __toCommonJS(AvatarModalButtons_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_ConfirmDiscardDialog = require("./ConfirmDiscardDialog");
var import_Modal = require("./Modal");
const AvatarModalButtons = /* @__PURE__ */ __name(({
  hasChanges,
  i18n,
  onCancel,
  onSave
}) => {
  const [confirmDiscardAction, setConfirmDiscardAction] = (0, import_react.useState)(void 0);
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: () => {
      if (hasChanges) {
        setConfirmDiscardAction(() => onCancel);
      } else {
        onCancel();
      }
    },
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !hasChanges,
    onClick: onSave
  }, i18n("save")), confirmDiscardAction && /* @__PURE__ */ import_react.default.createElement(import_ConfirmDiscardDialog.ConfirmDiscardDialog, {
    i18n,
    onDiscard: confirmDiscardAction,
    onClose: () => setConfirmDiscardAction(void 0)
  }));
}, "AvatarModalButtons");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarModalButtons
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyTW9kYWxCdXR0b25zLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IENvbmZpcm1EaXNjYXJkRGlhbG9nIH0gZnJvbSAnLi9Db25maXJtRGlzY2FyZERpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaGFzQ2hhbmdlczogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DYW5jZWw6ICgpID0+IHVua25vd247XG4gIG9uU2F2ZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBBdmF0YXJNb2RhbEJ1dHRvbnMgPSAoe1xuICBoYXNDaGFuZ2VzLFxuICBpMThuLFxuICBvbkNhbmNlbCxcbiAgb25TYXZlLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbY29uZmlybURpc2NhcmRBY3Rpb24sIHNldENvbmZpcm1EaXNjYXJkQWN0aW9uXSA9IHVzZVN0YXRlPFxuICAgICgoKSA9PiB1bmtub3duKSB8IHVuZGVmaW5lZFxuICA+KHVuZGVmaW5lZCk7XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgPEJ1dHRvblxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc0NoYW5nZXMpIHtcbiAgICAgICAgICAgIHNldENvbmZpcm1EaXNjYXJkQWN0aW9uKCgpID0+IG9uQ2FuY2VsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25DYW5jZWwoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fVxuICAgICAgPlxuICAgICAgICB7aTE4bignY2FuY2VsJyl9XG4gICAgICA8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gZGlzYWJsZWQ9eyFoYXNDaGFuZ2VzfSBvbkNsaWNrPXtvblNhdmV9PlxuICAgICAgICB7aTE4bignc2F2ZScpfVxuICAgICAgPC9CdXR0b24+XG4gICAgICB7Y29uZmlybURpc2NhcmRBY3Rpb24gJiYgKFxuICAgICAgICA8Q29uZmlybURpc2NhcmREaWFsb2dcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uRGlzY2FyZD17Y29uZmlybURpc2NhcmRBY3Rpb259XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0Q29uZmlybURpc2NhcmRBY3Rpb24odW5kZWZpbmVkKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9Nb2RhbC5CdXR0b25Gb290ZXI+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUVoQyxvQkFBc0M7QUFDdEMsa0NBQXFDO0FBRXJDLG1CQUFzQjtBQVNmLE1BQU0scUJBQXFCLHdCQUFDO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixRQUFNLENBQUMsc0JBQXNCLDJCQUEyQiwyQkFFdEQsTUFBUztBQUVYLFNBQ0UsbURBQUMsbUJBQU0sY0FBTixNQUNDLG1EQUFDO0FBQUEsSUFDQyxTQUFTLE1BQU07QUFDYixVQUFJLFlBQVk7QUFDZCxnQ0FBd0IsTUFBTSxRQUFRO0FBQUEsTUFDeEMsT0FBTztBQUNMLGlCQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixLQUFLLFFBQVEsQ0FDaEIsR0FDQSxtREFBQztBQUFBLElBQU8sVUFBVSxDQUFDO0FBQUEsSUFBWSxTQUFTO0FBQUEsS0FDckMsS0FBSyxNQUFNLENBQ2QsR0FDQyx3QkFDQyxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFNBQVMsTUFBTSx3QkFBd0IsTUFBUztBQUFBLEdBQ2xELENBRUo7QUFFSixHQXBDa0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
