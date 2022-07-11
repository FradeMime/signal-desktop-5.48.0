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
var Alert_exports = {};
__export(Alert_exports, {
  Alert: () => Alert
});
module.exports = __toCommonJS(Alert_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_Modal = require("./Modal");
const Alert = /* @__PURE__ */ __name(({
  body,
  i18n,
  onClose,
  title
}) => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n,
  onClose,
  title
}, body, /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: onClose
}, i18n("Confirmation--confirm")))), "Alert");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alert
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWxlcnQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBib2R5OiBSZWFjdE5vZGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgQWxlcnQ6IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzVHlwZT4gPSAoe1xuICBib2R5LFxuICBpMThuLFxuICBvbkNsb3NlLFxuICB0aXRsZSxcbn0pID0+IChcbiAgPE1vZGFsIGkxOG49e2kxOG59IG9uQ2xvc2U9e29uQ2xvc2V9IHRpdGxlPXt0aXRsZX0+XG4gICAge2JvZHl9XG4gICAgPE1vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17b25DbG9zZX0+e2kxOG4oJ0NvbmZpcm1hdGlvbi0tY29uZmlybScpfTwvQnV0dG9uPlxuICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICA8L01vZGFsPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFHbEIsb0JBQXVCO0FBQ3ZCLG1CQUFzQjtBQVNmLE1BQU0sUUFBc0Msd0JBQUM7QUFBQSxFQUNsRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BRUEsbURBQUM7QUFBQSxFQUFNO0FBQUEsRUFBWTtBQUFBLEVBQWtCO0FBQUEsR0FDbEMsTUFDRCxtREFBQyxtQkFBTSxjQUFOLE1BQ0MsbURBQUM7QUFBQSxFQUFPLFNBQVM7QUFBQSxHQUFVLEtBQUssdUJBQXVCLENBQUUsQ0FDM0QsQ0FDRixHQVhpRDsiLAogICJuYW1lcyI6IFtdCn0K
