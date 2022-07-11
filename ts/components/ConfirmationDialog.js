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
var ConfirmationDialog_exports = {};
__export(ConfirmationDialog_exports, {
  ConfirmationDialog: () => ConfirmationDialog
});
module.exports = __toCommonJS(ConfirmationDialog_exports);
var import_react = __toESM(require("react"));
var import_web = require("@react-spring/web");
var import_Button = require("./Button");
var import_ModalHost = require("./ModalHost");
var import_Modal = require("./Modal");
var import_useAnimated = require("../hooks/useAnimated");
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
function getButtonVariant(buttonStyle) {
  if (buttonStyle === "affirmative") {
    return import_Button.ButtonVariant.Primary;
  }
  if (buttonStyle === "negative") {
    return import_Button.ButtonVariant.Destructive;
  }
  return import_Button.ButtonVariant.Secondary;
}
const ConfirmationDialog = import_react.default.memo(({
  moduleClassName,
  actions = [],
  cancelText,
  children,
  i18n,
  onCancel,
  onClose,
  theme,
  title,
  hasXButton,
  cancelButtonVariant,
  onTopOfEverything
}) => {
  const { close, overlayStyles, modalStyles } = (0, import_useAnimated.useAnimated)(onClose, {
    getFrom: () => ({ opacity: 0, transform: "scale(0.25)" }),
    getTo: (isOpen) => ({ opacity: isOpen ? 1 : 0, transform: "scale(1)" })
  });
  const cancelAndClose = (0, import_react.useCallback)(() => {
    if (onCancel) {
      onCancel();
    }
    close();
  }, [close, onCancel]);
  const handleCancel = (0, import_react.useCallback)((e) => {
    if (e.target === e.currentTarget) {
      cancelAndClose();
    }
  }, [cancelAndClose]);
  const hasActions = Boolean(actions.length);
  return /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onTopOfEverything,
    onClose: close,
    theme,
    overlayStyles
  }, /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    style: modalStyles
  }, /* @__PURE__ */ import_react.default.createElement(import_Modal.ModalWindow, {
    hasXButton,
    i18n,
    moduleClassName,
    onClose: cancelAndClose,
    title
  }, children, /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: handleCancel,
    ref: focusRef,
    variant: cancelButtonVariant || (hasActions ? import_Button.ButtonVariant.Secondary : import_Button.ButtonVariant.Primary)
  }, cancelText || i18n("confirmation-dialog--Cancel")), actions.map((action, i) => /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    key: action.text,
    onClick: () => {
      action.action();
      close();
    },
    "data-action": i,
    variant: getButtonVariant(action.style)
  }, action.text))))));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmationDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybWF0aW9uRGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTW91c2VFdmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFuaW1hdGVkIH0gZnJvbSAnQHJlYWN0LXNwcmluZy93ZWInO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBNb2RhbEhvc3QgfSBmcm9tICcuL01vZGFsSG9zdCc7XG5pbXBvcnQgeyBNb2RhbCwgTW9kYWxXaW5kb3cgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB0eXBlIHsgVGhlbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IHVzZUFuaW1hdGVkIH0gZnJvbSAnLi4vaG9va3MvdXNlQW5pbWF0ZWQnO1xuXG5leHBvcnQgdHlwZSBBY3Rpb25TcGVjID0ge1xuICB0ZXh0OiBzdHJpbmc7XG4gIGFjdGlvbjogKCkgPT4gdW5rbm93bjtcbiAgc3R5bGU/OiAnYWZmaXJtYXRpdmUnIHwgJ25lZ2F0aXZlJztcbn07XG5cbmV4cG9ydCB0eXBlIE93blByb3BzID0gUmVhZG9ubHk8e1xuICBhY3Rpb25zPzogQXJyYXk8QWN0aW9uU3BlYz47XG4gIGNhbmNlbEJ1dHRvblZhcmlhbnQ/OiBCdXR0b25WYXJpYW50O1xuICBjYW5jZWxUZXh0Pzogc3RyaW5nO1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgaGFzWEJ1dHRvbj86IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgb25DYW5jZWw/OiAoKSA9PiB1bmtub3duO1xuICBvbkNsb3NlOiAoKSA9PiB1bmtub3duO1xuICBvblRvcE9mRXZlcnl0aGluZz86IGJvb2xlYW47XG4gIHRoZW1lPzogVGhlbWU7XG4gIHRpdGxlPzogc3RyaW5nIHwgUmVhY3QuUmVhY3ROb2RlO1xufT47XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gT3duUHJvcHM7XG5cbmZ1bmN0aW9uIGZvY3VzUmVmKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRCdXR0b25WYXJpYW50KFxuICBidXR0b25TdHlsZT86ICdhZmZpcm1hdGl2ZScgfCAnbmVnYXRpdmUnXG4pOiBCdXR0b25WYXJpYW50IHtcbiAgaWYgKGJ1dHRvblN0eWxlID09PSAnYWZmaXJtYXRpdmUnKSB7XG4gICAgcmV0dXJuIEJ1dHRvblZhcmlhbnQuUHJpbWFyeTtcbiAgfVxuXG4gIGlmIChidXR0b25TdHlsZSA9PT0gJ25lZ2F0aXZlJykge1xuICAgIHJldHVybiBCdXR0b25WYXJpYW50LkRlc3RydWN0aXZlO1xuICB9XG5cbiAgcmV0dXJuIEJ1dHRvblZhcmlhbnQuU2Vjb25kYXJ5O1xufVxuXG5leHBvcnQgY29uc3QgQ29uZmlybWF0aW9uRGlhbG9nID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBtb2R1bGVDbGFzc05hbWUsXG4gICAgYWN0aW9ucyA9IFtdLFxuICAgIGNhbmNlbFRleHQsXG4gICAgY2hpbGRyZW4sXG4gICAgaTE4bixcbiAgICBvbkNhbmNlbCxcbiAgICBvbkNsb3NlLFxuICAgIHRoZW1lLFxuICAgIHRpdGxlLFxuICAgIGhhc1hCdXR0b24sXG4gICAgY2FuY2VsQnV0dG9uVmFyaWFudCxcbiAgICBvblRvcE9mRXZlcnl0aGluZyxcbiAgfTogUHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGNsb3NlLCBvdmVybGF5U3R5bGVzLCBtb2RhbFN0eWxlcyB9ID0gdXNlQW5pbWF0ZWQob25DbG9zZSwge1xuICAgICAgZ2V0RnJvbTogKCkgPT4gKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMC4yNSknIH0pLFxuICAgICAgZ2V0VG86IGlzT3BlbiA9PiAoeyBvcGFjaXR5OiBpc09wZW4gPyAxIDogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0pLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FuY2VsQW5kQ2xvc2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBpZiAob25DYW5jZWwpIHtcbiAgICAgICAgb25DYW5jZWwoKTtcbiAgICAgIH1cbiAgICAgIGNsb3NlKCk7XG4gICAgfSwgW2Nsb3NlLCBvbkNhbmNlbF0pO1xuXG4gICAgY29uc3QgaGFuZGxlQ2FuY2VsID0gdXNlQ2FsbGJhY2soXG4gICAgICAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgIGNhbmNlbEFuZENsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbY2FuY2VsQW5kQ2xvc2VdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGlvbnMgPSBCb29sZWFuKGFjdGlvbnMubGVuZ3RoKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxIb3N0XG4gICAgICAgIG9uVG9wT2ZFdmVyeXRoaW5nPXtvblRvcE9mRXZlcnl0aGluZ31cbiAgICAgICAgb25DbG9zZT17Y2xvc2V9XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgb3ZlcmxheVN0eWxlcz17b3ZlcmxheVN0eWxlc31cbiAgICAgID5cbiAgICAgICAgPGFuaW1hdGVkLmRpdiBzdHlsZT17bW9kYWxTdHlsZXN9PlxuICAgICAgICAgIDxNb2RhbFdpbmRvd1xuICAgICAgICAgICAgaGFzWEJ1dHRvbj17aGFzWEJ1dHRvbn1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9e21vZHVsZUNsYXNzTmFtZX1cbiAgICAgICAgICAgIG9uQ2xvc2U9e2NhbmNlbEFuZENsb3NlfVxuICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYW5jZWx9XG4gICAgICAgICAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgICAgICAgICB2YXJpYW50PXtcbiAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblZhcmlhbnQgfHxcbiAgICAgICAgICAgICAgICAgIChoYXNBY3Rpb25zID8gQnV0dG9uVmFyaWFudC5TZWNvbmRhcnkgOiBCdXR0b25WYXJpYW50LlByaW1hcnkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NhbmNlbFRleHQgfHwgaTE4bignY29uZmlybWF0aW9uLWRpYWxvZy0tQ2FuY2VsJyl9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICB7YWN0aW9ucy5tYXAoKGFjdGlvbiwgaSkgPT4gKFxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17YWN0aW9uLnRleHR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBkYXRhLWFjdGlvbj17aX1cbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9e2dldEJ1dHRvblZhcmlhbnQoYWN0aW9uLnN0eWxlKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YWN0aW9uLnRleHR9XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Nb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICAgICAgPC9Nb2RhbFdpbmRvdz5cbiAgICAgICAgPC9hbmltYXRlZC5kaXY+XG4gICAgICA8L01vZGFsSG9zdD5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFtQztBQUNuQyxpQkFBeUI7QUFDekIsb0JBQXNDO0FBRXRDLHVCQUEwQjtBQUMxQixtQkFBbUM7QUFFbkMseUJBQTRCO0FBeUI1QixrQkFBa0IsSUFBd0I7QUFDeEMsTUFBSSxJQUFJO0FBQ04sT0FBRyxNQUFNO0FBQUEsRUFDWDtBQUNGO0FBSlMsQUFNVCwwQkFDRSxhQUNlO0FBQ2YsTUFBSSxnQkFBZ0IsZUFBZTtBQUNqQyxXQUFPLDRCQUFjO0FBQUEsRUFDdkI7QUFFQSxNQUFJLGdCQUFnQixZQUFZO0FBQzlCLFdBQU8sNEJBQWM7QUFBQSxFQUN2QjtBQUVBLFNBQU8sNEJBQWM7QUFDdkI7QUFaUyxBQWNGLE1BQU0scUJBQXFCLHFCQUFNLEtBQ3RDLENBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQSxVQUFVLENBQUM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDVztBQUNYLFFBQU0sRUFBRSxPQUFPLGVBQWUsZ0JBQWdCLG9DQUFZLFNBQVM7QUFBQSxJQUNqRSxTQUFTLE1BQU8sR0FBRSxTQUFTLEdBQUcsV0FBVyxjQUFjO0FBQUEsSUFDdkQsT0FBTyxZQUFXLEdBQUUsU0FBUyxTQUFTLElBQUksR0FBRyxXQUFXLFdBQVc7QUFBQSxFQUNyRSxDQUFDO0FBRUQsUUFBTSxpQkFBaUIsOEJBQVksTUFBTTtBQUN2QyxRQUFJLFVBQVU7QUFDWixlQUFTO0FBQUEsSUFDWDtBQUNBLFVBQU07QUFBQSxFQUNSLEdBQUcsQ0FBQyxPQUFPLFFBQVEsQ0FBQztBQUVwQixRQUFNLGVBQWUsOEJBQ25CLENBQUMsTUFBa0I7QUFDakIsUUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlO0FBQ2hDLHFCQUFlO0FBQUEsSUFDakI7QUFBQSxFQUNGLEdBQ0EsQ0FBQyxjQUFjLENBQ2pCO0FBRUEsUUFBTSxhQUFhLFFBQVEsUUFBUSxNQUFNO0FBRXpDLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVDtBQUFBLElBQ0E7QUFBQSxLQUVBLG1EQUFDLG9CQUFTLEtBQVQ7QUFBQSxJQUFhLE9BQU87QUFBQSxLQUNuQixtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1Q7QUFBQSxLQUVDLFVBQ0QsbURBQUMsbUJBQU0sY0FBTixNQUNDLG1EQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxTQUNFLHVCQUNDLGNBQWEsNEJBQWMsWUFBWSw0QkFBYztBQUFBLEtBR3ZELGNBQWMsS0FBSyw2QkFBNkIsQ0FDbkQsR0FDQyxRQUFRLElBQUksQ0FBQyxRQUFRLE1BQ3BCLG1EQUFDO0FBQUEsSUFDQyxLQUFLLE9BQU87QUFBQSxJQUNaLFNBQVMsTUFBTTtBQUNiLGFBQU8sT0FBTztBQUNkLFlBQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxlQUFhO0FBQUEsSUFDYixTQUFTLGlCQUFpQixPQUFPLEtBQUs7QUFBQSxLQUVyQyxPQUFPLElBQ1YsQ0FDRCxDQUNILENBQ0YsQ0FDRixDQUNGO0FBRUosQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
