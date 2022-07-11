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
var BadgeSustainerInstructionsDialog_exports = {};
__export(BadgeSustainerInstructionsDialog_exports, {
  BadgeSustainerInstructionsDialog: () => BadgeSustainerInstructionsDialog
});
module.exports = __toCommonJS(BadgeSustainerInstructionsDialog_exports);
var import_react = __toESM(require("react"));
var import_Modal = require("./Modal");
function BadgeSustainerInstructionsDialog({
  i18n,
  onClose
}) {
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    moduleClassName: "BadgeSustainerInstructionsDialog",
    i18n,
    onClose
  }, /* @__PURE__ */ import_react.default.createElement("h1", {
    className: "BadgeSustainerInstructionsDialog__header"
  }, i18n("BadgeSustainerInstructions__header")), /* @__PURE__ */ import_react.default.createElement("h2", {
    className: "BadgeSustainerInstructionsDialog__subheader"
  }, i18n("BadgeSustainerInstructions__subheader")), /* @__PURE__ */ import_react.default.createElement("ol", {
    className: "BadgeSustainerInstructionsDialog__instructions"
  }, /* @__PURE__ */ import_react.default.createElement("li", null, i18n("BadgeSustainerInstructions__instructions__1")), /* @__PURE__ */ import_react.default.createElement("li", null, i18n("BadgeSustainerInstructions__instructions__2")), /* @__PURE__ */ import_react.default.createElement("li", null, i18n("BadgeSustainerInstructions__instructions__3"))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeSustainerInstructionsDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VTdXN0YWluZXJJbnN0cnVjdGlvbnNEaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcblxuZXhwb3J0IGZ1bmN0aW9uIEJhZGdlU3VzdGFpbmVySW5zdHJ1Y3Rpb25zRGlhbG9nKHtcbiAgaTE4bixcbiAgb25DbG9zZSxcbn06IFJlYWRvbmx5PHsgaTE4bjogTG9jYWxpemVyVHlwZTsgb25DbG9zZTogKCkgPT4gdW5rbm93biB9Pik6IFJlYWN0RWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPE1vZGFsXG4gICAgICBoYXNYQnV0dG9uXG4gICAgICBtb2R1bGVDbGFzc05hbWU9XCJCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc0RpYWxvZ1wiXG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICA+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwiQmFkZ2VTdXN0YWluZXJJbnN0cnVjdGlvbnNEaWFsb2dfX2hlYWRlclwiPlxuICAgICAgICB7aTE4bignQmFkZ2VTdXN0YWluZXJJbnN0cnVjdGlvbnNfX2hlYWRlcicpfVxuICAgICAgPC9oMT5cbiAgICAgIDxoMiBjbGFzc05hbWU9XCJCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc0RpYWxvZ19fc3ViaGVhZGVyXCI+XG4gICAgICAgIHtpMThuKCdCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc19fc3ViaGVhZGVyJyl9XG4gICAgICA8L2gyPlxuICAgICAgPG9sIGNsYXNzTmFtZT1cIkJhZGdlU3VzdGFpbmVySW5zdHJ1Y3Rpb25zRGlhbG9nX19pbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgPGxpPntpMThuKCdCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc19faW5zdHJ1Y3Rpb25zX18xJyl9PC9saT5cbiAgICAgICAgPGxpPntpMThuKCdCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc19faW5zdHJ1Y3Rpb25zX18yJyl9PC9saT5cbiAgICAgICAgPGxpPntpMThuKCdCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc19faW5zdHJ1Y3Rpb25zX18zJyl9PC9saT5cbiAgICAgIDwvb2w+XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFFbEIsbUJBQXNCO0FBRWYsMENBQTBDO0FBQUEsRUFDL0M7QUFBQSxFQUNBO0FBQUEsR0FDMEU7QUFDMUUsU0FDRSxtREFBQztBQUFBLElBQ0MsWUFBVTtBQUFBLElBQ1YsaUJBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsS0FFQSxtREFBQztBQUFBLElBQUcsV0FBVTtBQUFBLEtBQ1gsS0FBSyxvQ0FBb0MsQ0FDNUMsR0FDQSxtREFBQztBQUFBLElBQUcsV0FBVTtBQUFBLEtBQ1gsS0FBSyx1Q0FBdUMsQ0FDL0MsR0FDQSxtREFBQztBQUFBLElBQUcsV0FBVTtBQUFBLEtBQ1osbURBQUMsWUFBSSxLQUFLLDZDQUE2QyxDQUFFLEdBQ3pELG1EQUFDLFlBQUksS0FBSyw2Q0FBNkMsQ0FBRSxHQUN6RCxtREFBQyxZQUFJLEtBQUssNkNBQTZDLENBQUUsQ0FDM0QsQ0FDRjtBQUVKO0FBeEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
