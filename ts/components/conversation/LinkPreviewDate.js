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
var LinkPreviewDate_exports = {};
__export(LinkPreviewDate_exports, {
  LinkPreviewDate: () => LinkPreviewDate
});
module.exports = __toCommonJS(LinkPreviewDate_exports);
var React = __toESM(require("react"));
var import_moment = __toESM(require("moment"));
var import_isLinkPreviewDateValid = require("../../linkPreviews/isLinkPreviewDateValid");
const LinkPreviewDate = /* @__PURE__ */ __name(({
  date,
  className = ""
}) => {
  const dateMoment = (0, import_isLinkPreviewDateValid.isLinkPreviewDateValid)(date) ? (0, import_moment.default)(date) : null;
  return dateMoment ? /* @__PURE__ */ React.createElement("time", {
    className,
    dateTime: dateMoment.toISOString()
  }, dateMoment.format("ll")) : null;
}, "LinkPreviewDate");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinkPreviewDate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlua1ByZXZpZXdEYXRlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGlzTGlua1ByZXZpZXdEYXRlVmFsaWQgfSBmcm9tICcuLi8uLi9saW5rUHJldmlld3MvaXNMaW5rUHJldmlld0RhdGVWYWxpZCc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGRhdGU/OiBudWxsIHwgbnVtYmVyO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdEYXRlOiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICBkYXRlLFxuICBjbGFzc05hbWUgPSAnJyxcbn06IFByb3BzKSA9PiB7XG4gIGNvbnN0IGRhdGVNb21lbnQ6IE1vbWVudCB8IG51bGwgPSBpc0xpbmtQcmV2aWV3RGF0ZVZhbGlkKGRhdGUpXG4gICAgPyBtb21lbnQoZGF0ZSlcbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIGRhdGVNb21lbnQgPyAoXG4gICAgPHRpbWUgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGRhdGVUaW1lPXtkYXRlTW9tZW50LnRvSVNPU3RyaW5nKCl9PlxuICAgICAge2RhdGVNb21lbnQuZm9ybWF0KCdsbCcpfVxuICAgIDwvdGltZT5cbiAgKSA6IG51bGw7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLG9CQUFtQjtBQUNuQixvQ0FBdUM7QUFPaEMsTUFBTSxrQkFBbUMsd0JBQUM7QUFBQSxFQUMvQztBQUFBLEVBQ0EsWUFBWTtBQUFBLE1BQ0Q7QUFDWCxRQUFNLGFBQTRCLDBEQUF1QixJQUFJLElBQ3pELDJCQUFPLElBQUksSUFDWDtBQUVKLFNBQU8sYUFDTCxvQ0FBQztBQUFBLElBQUs7QUFBQSxJQUFzQixVQUFVLFdBQVcsWUFBWTtBQUFBLEtBQzFELFdBQVcsT0FBTyxJQUFJLENBQ3pCLElBQ0U7QUFDTixHQWJnRDsiLAogICJuYW1lcyI6IFtdCn0K
