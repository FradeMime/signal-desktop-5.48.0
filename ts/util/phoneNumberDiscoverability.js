var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var phoneNumberDiscoverability_exports = {};
__export(phoneNumberDiscoverability_exports, {
  PhoneNumberDiscoverability: () => PhoneNumberDiscoverability,
  parsePhoneNumberDiscoverability: () => parsePhoneNumberDiscoverability
});
module.exports = __toCommonJS(phoneNumberDiscoverability_exports);
var import_enum = require("./enum");
var PhoneNumberDiscoverability = /* @__PURE__ */ ((PhoneNumberDiscoverability2) => {
  PhoneNumberDiscoverability2["Discoverable"] = "Discoverable";
  PhoneNumberDiscoverability2["NotDiscoverable"] = "NotDiscoverable";
  return PhoneNumberDiscoverability2;
})(PhoneNumberDiscoverability || {});
const parsePhoneNumberDiscoverability = (0, import_enum.makeEnumParser)(PhoneNumberDiscoverability, "Discoverable" /* Discoverable */);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PhoneNumberDiscoverability,
  parsePhoneNumberDiscoverability
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgbWFrZUVudW1QYXJzZXIgfSBmcm9tICcuL2VudW0nO1xuXG4vLyBUaGVzZSBzdHJpbmdzIGFyZSBzYXZlZCB0byBkaXNrLCBzbyBiZSBjYXJlZnVsIHdoZW4gY2hhbmdpbmcgdGhlbS5cbmV4cG9ydCBlbnVtIFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5IHtcbiAgRGlzY292ZXJhYmxlID0gJ0Rpc2NvdmVyYWJsZScsXG4gIE5vdERpc2NvdmVyYWJsZSA9ICdOb3REaXNjb3ZlcmFibGUnLFxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eSA9IG1ha2VFbnVtUGFyc2VyKFxuICBQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eSxcbiAgUGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHkuRGlzY292ZXJhYmxlXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBK0I7QUFHeEIsSUFBSyw2QkFBTCxrQkFBSyxnQ0FBTDtBQUNMLGdEQUFlO0FBQ2YsbURBQWtCO0FBRlI7QUFBQTtBQUtMLE1BQU0sa0NBQWtDLGdDQUM3Qyw0QkFDQSxpQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
