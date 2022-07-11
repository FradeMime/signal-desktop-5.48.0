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
var ErrorModal_exports = {};
__export(ErrorModal_exports, {
  ErrorModal: () => ErrorModal
});
module.exports = __toCommonJS(ErrorModal_exports);
var React = __toESM(require("react"));
var import_Modal = require("./Modal");
var import_Button = require("./Button");
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
const ErrorModal = /* @__PURE__ */ __name((props) => {
  const { buttonText, description, i18n, onClose, title } = props;
  return /* @__PURE__ */ React.createElement(import_Modal.Modal, {
    i18n,
    onClose,
    title: title || i18n("ErrorModal--title")
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "module-error-modal__description"
  }, description || i18n("ErrorModal--description")), /* @__PURE__ */ React.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: onClose,
    ref: focusRef,
    variant: import_Button.ButtonVariant.Secondary
  }, buttonText || i18n("Confirmation--confirm")))));
}, "ErrorModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXJyb3JNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBidXR0b25UZXh0Pzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG5cbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmZ1bmN0aW9uIGZvY3VzUmVmKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRXJyb3JNb2RhbCA9IChwcm9wczogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB7IGJ1dHRvblRleHQsIGRlc2NyaXB0aW9uLCBpMThuLCBvbkNsb3NlLCB0aXRsZSB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgdGl0bGU9e3RpdGxlIHx8IGkxOG4oJ0Vycm9yTW9kYWwtLXRpdGxlJyl9XG4gICAgPlxuICAgICAgPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZXJyb3ItbW9kYWxfX2Rlc2NyaXB0aW9uXCI+XG4gICAgICAgICAge2Rlc2NyaXB0aW9uIHx8IGkxOG4oJ0Vycm9yTW9kYWwtLWRlc2NyaXB0aW9uJyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICByZWY9e2ZvY3VzUmVmfVxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2J1dHRvblRleHQgfHwgaTE4bignQ29uZmlybWF0aW9uLS1jb25maXJtJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgPC8+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFHdkIsbUJBQXNCO0FBQ3RCLG9CQUFzQztBQVd0QyxrQkFBa0IsSUFBd0I7QUFDeEMsTUFBSSxJQUFJO0FBQ04sT0FBRyxNQUFNO0FBQUEsRUFDWDtBQUNGO0FBSlMsQUFNRixNQUFNLGFBQWEsd0JBQUMsVUFBa0M7QUFDM0QsUUFBTSxFQUFFLFlBQVksYUFBYSxNQUFNLFNBQVMsVUFBVTtBQUUxRCxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU8sU0FBUyxLQUFLLG1CQUFtQjtBQUFBLEtBRXhDLDBEQUNFLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixlQUFlLEtBQUsseUJBQXlCLENBQ2hELEdBQ0Esb0NBQUMsbUJBQU0sY0FBTixNQUNDLG9DQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsY0FBYyxLQUFLLHVCQUF1QixDQUM3QyxDQUNGLENBQ0YsQ0FDRjtBQUVKLEdBekIwQjsiLAogICJuYW1lcyI6IFtdCn0K
