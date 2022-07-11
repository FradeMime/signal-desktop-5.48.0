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
var PermissionsPopup_exports = {};
__export(PermissionsPopup_exports, {
  PermissionsPopup: () => PermissionsPopup
});
module.exports = __toCommonJS(PermissionsPopup_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_useEscapeHandling = require("../hooks/useEscapeHandling");
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
const PermissionsPopup = /* @__PURE__ */ __name(({
  i18n,
  message,
  onAccept,
  onClose
}) => {
  (0, import_useEscapeHandling.useEscapeHandling)(onClose);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "PermissionsPopup"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "PermissionsPopup__body"
  }, message), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "PermissionsPopup__buttons"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClose,
    ref: focusRef,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("confirmation-dialog--Cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onAccept,
    ref: focusRef,
    variant: import_Button.ButtonVariant.Primary
  }, i18n("allowAccess"))));
}, "PermissionsPopup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PermissionsPopup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGVybWlzc2lvbnNQb3B1cC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgdXNlRXNjYXBlSGFuZGxpbmcgfSBmcm9tICcuLi9ob29rcy91c2VFc2NhcGVIYW5kbGluZyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBvbkFjY2VwdDogKCkgPT4gdW5rbm93bjtcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmZ1bmN0aW9uIGZvY3VzUmVmKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUGVybWlzc2lvbnNQb3B1cCA9ICh7XG4gIGkxOG4sXG4gIG1lc3NhZ2UsXG4gIG9uQWNjZXB0LFxuICBvbkNsb3NlLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICB1c2VFc2NhcGVIYW5kbGluZyhvbkNsb3NlKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiUGVybWlzc2lvbnNQb3B1cFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJQZXJtaXNzaW9uc1BvcHVwX19ib2R5XCI+e21lc3NhZ2V9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlBlcm1pc3Npb25zUG9wdXBfX2J1dHRvbnNcIj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdjb25maXJtYXRpb24tZGlhbG9nLS1DYW5jZWwnKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtvbkFjY2VwdH1cbiAgICAgICAgICByZWY9e2ZvY3VzUmVmfVxuICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuUHJpbWFyeX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdhbGxvd0FjY2VzcycpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsb0JBQXNDO0FBRXRDLCtCQUFrQztBQVNsQyxrQkFBa0IsSUFBd0I7QUFDeEMsTUFBSSxJQUFJO0FBQ04sT0FBRyxNQUFNO0FBQUEsRUFDWDtBQUNGO0FBSlMsQUFNRixNQUFNLG1CQUFtQix3QkFBQztBQUFBLEVBQy9CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsa0RBQWtCLE9BQU87QUFFekIsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUEwQixPQUFRLEdBQ2pELG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0MsU0FBUztBQUFBLElBQ1QsS0FBSztBQUFBLElBQ0wsU0FBUyw0QkFBYztBQUFBLEtBRXRCLEtBQUssNkJBQTZCLENBQ3JDLEdBQ0EsbURBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxJQUNULEtBQUs7QUFBQSxJQUNMLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixLQUFLLGFBQWEsQ0FDckIsQ0FDRixDQUNGO0FBRUosR0E3QmdDOyIsCiAgIm5hbWVzIjogW10KfQo=
