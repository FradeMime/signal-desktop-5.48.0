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
var VerificationNotification_exports = {};
__export(VerificationNotification_exports, {
  VerificationNotification: () => VerificationNotification
});
module.exports = __toCommonJS(VerificationNotification_exports);
var import_react = __toESM(require("react"));
var import_SystemMessage = require("./SystemMessage");
var import_ContactName = require("./ContactName");
var import_Intl = require("../Intl");
var import_missingCaseError = require("../../util/missingCaseError");
class VerificationNotification extends import_react.default.Component {
  getStringId() {
    const { isLocal, type } = this.props;
    switch (type) {
      case "markVerified":
        return isLocal ? "youMarkedAsVerified" : "youMarkedAsVerifiedOtherDevice";
      case "markNotVerified":
        return isLocal ? "youMarkedAsNotVerified" : "youMarkedAsNotVerifiedOtherDevice";
      default:
        throw (0, import_missingCaseError.missingCaseError)(type);
    }
  }
  renderContents() {
    const { contact, i18n } = this.props;
    const id = this.getStringId();
    return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      id,
      components: [
        /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
          key: "external-1",
          title: contact.title,
          module: "module-verification-notification__contact"
        })
      ],
      i18n
    });
  }
  render() {
    const { type } = this.props;
    const icon = type === "markVerified" ? "verified" : "verified-not";
    return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
      icon,
      contents: this.renderContents()
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VerificationNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFN5c3RlbU1lc3NhZ2UgfSBmcm9tICcuL1N5c3RlbU1lc3NhZ2UnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi9JbnRsJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcblxudHlwZSBDb250YWN0ID0geyB0aXRsZTogc3RyaW5nIH07XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YSA9IHtcbiAgdHlwZTogJ21hcmtWZXJpZmllZCcgfCAnbWFya05vdFZlcmlmaWVkJztcbiAgaXNMb2NhbDogYm9vbGVhbjtcbiAgY29udGFjdDogQ29udGFjdDtcbn07XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmcgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY2xhc3MgVmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHB1YmxpYyBnZXRTdHJpbmdJZCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgaXNMb2NhbCwgdHlwZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbWFya1ZlcmlmaWVkJzpcbiAgICAgICAgcmV0dXJuIGlzTG9jYWxcbiAgICAgICAgICA/ICd5b3VNYXJrZWRBc1ZlcmlmaWVkJ1xuICAgICAgICAgIDogJ3lvdU1hcmtlZEFzVmVyaWZpZWRPdGhlckRldmljZSc7XG4gICAgICBjYXNlICdtYXJrTm90VmVyaWZpZWQnOlxuICAgICAgICByZXR1cm4gaXNMb2NhbFxuICAgICAgICAgID8gJ3lvdU1hcmtlZEFzTm90VmVyaWZpZWQnXG4gICAgICAgICAgOiAneW91TWFya2VkQXNOb3RWZXJpZmllZE90aGVyRGV2aWNlJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbmRlckNvbnRlbnRzKCk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7IGNvbnRhY3QsIGkxOG4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldFN0cmluZ0lkKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEludGxcbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICBjb21wb25lbnRzPXtbXG4gICAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgICBrZXk9XCJleHRlcm5hbC0xXCJcbiAgICAgICAgICAgIHRpdGxlPXtjb250YWN0LnRpdGxlfVxuICAgICAgICAgICAgbW9kdWxlPVwibW9kdWxlLXZlcmlmaWNhdGlvbi1ub3RpZmljYXRpb25fX2NvbnRhY3RcIlxuICAgICAgICAgIC8+LFxuICAgICAgICBdfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyB0eXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGljb24gPSB0eXBlID09PSAnbWFya1ZlcmlmaWVkJyA/ICd2ZXJpZmllZCcgOiAndmVyaWZpZWQtbm90JztcblxuICAgIHJldHVybiA8U3lzdGVtTWVzc2FnZSBpY29uPXtpY29ufSBjb250ZW50cz17dGhpcy5yZW5kZXJDb250ZW50cygpfSAvPjtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwyQkFBOEI7QUFDOUIseUJBQTRCO0FBQzVCLGtCQUFxQjtBQUdyQiw4QkFBaUM7QUFnQjFCLE1BQU0saUNBQWlDLHFCQUFNLFVBQWlCO0FBQUEsRUFDNUQsY0FBc0I7QUFDM0IsVUFBTSxFQUFFLFNBQVMsU0FBUyxLQUFLO0FBRS9CLFlBQVE7QUFBQSxXQUNEO0FBQ0gsZUFBTyxVQUNILHdCQUNBO0FBQUEsV0FDRDtBQUNILGVBQU8sVUFDSCwyQkFDQTtBQUFBO0FBRUosY0FBTSw4Q0FBaUIsSUFBSTtBQUFBO0FBQUEsRUFFakM7QUFBQSxFQUVPLGlCQUE4QjtBQUNuQyxVQUFNLEVBQUUsU0FBUyxTQUFTLEtBQUs7QUFDL0IsVUFBTSxLQUFLLEtBQUssWUFBWTtBQUU1QixXQUNFLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsbURBQUM7QUFBQSxVQUNDLEtBQUk7QUFBQSxVQUNKLE9BQU8sUUFBUTtBQUFBLFVBQ2YsUUFBTztBQUFBLFNBQ1Q7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBQUEsRUFFZ0IsU0FBc0I7QUFDcEMsVUFBTSxFQUFFLFNBQVMsS0FBSztBQUN0QixVQUFNLE9BQU8sU0FBUyxpQkFBaUIsYUFBYTtBQUVwRCxXQUFPLG1EQUFDO0FBQUEsTUFBYztBQUFBLE1BQVksVUFBVSxLQUFLLGVBQWU7QUFBQSxLQUFHO0FBQUEsRUFDckU7QUFDRjtBQTNDTyIsCiAgIm5hbWVzIjogW10KfQo=
