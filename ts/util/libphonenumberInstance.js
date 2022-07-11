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
var libphonenumberInstance_exports = {};
__export(libphonenumberInstance_exports, {
  PhoneNumberFormat: () => PhoneNumberFormat,
  instance: () => instance,
  parseAndFormatPhoneNumber: () => parseAndFormatPhoneNumber
});
module.exports = __toCommonJS(libphonenumberInstance_exports);
var import_google_libphonenumber = __toESM(require("google-libphonenumber"));
const instance = import_google_libphonenumber.default.PhoneNumberUtil.getInstance();
const { PhoneNumberFormat } = import_google_libphonenumber.default;
function parseAndFormatPhoneNumber(str, regionCode, format = PhoneNumberFormat.E164) {
  let result;
  try {
    result = instance.parse(str, regionCode);
  } catch (err) {
    return void 0;
  }
  return {
    isValid: instance.isValidNumber(result),
    userInput: str,
    e164: instance.format(result, format)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PhoneNumberFormat,
  instance,
  parseAndFormatPhoneNumber
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicGhvbmVudW1iZXJJbnN0YW5jZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBsaWJwaG9uZW51bWJlciBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xuaW1wb3J0IHR5cGUgeyBQaG9uZU51bWJlciB9IGZyb20gJ2dvb2dsZS1saWJwaG9uZW51bWJlcic7XG5cbmNvbnN0IGluc3RhbmNlID0gbGlicGhvbmVudW1iZXIuUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCk7XG5jb25zdCB7IFBob25lTnVtYmVyRm9ybWF0IH0gPSBsaWJwaG9uZW51bWJlcjtcblxuZXhwb3J0IHsgaW5zdGFuY2UsIFBob25lTnVtYmVyRm9ybWF0IH07XG5cbmV4cG9ydCB0eXBlIFBhcnNlZEUxNjRUeXBlID0gUmVhZG9ubHk8e1xuICBpc1ZhbGlkOiBib29sZWFuO1xuICB1c2VySW5wdXQ6IHN0cmluZztcbiAgZTE2NDogc3RyaW5nO1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZEZvcm1hdFBob25lTnVtYmVyKFxuICBzdHI6IHN0cmluZyxcbiAgcmVnaW9uQ29kZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBmb3JtYXQgPSBQaG9uZU51bWJlckZvcm1hdC5FMTY0XG4pOiBQYXJzZWRFMTY0VHlwZSB8IHVuZGVmaW5lZCB7XG4gIGxldCByZXN1bHQ6IFBob25lTnVtYmVyO1xuICB0cnkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLnBhcnNlKHN0ciwgcmVnaW9uQ29kZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlzVmFsaWQ6IGluc3RhbmNlLmlzVmFsaWROdW1iZXIocmVzdWx0KSxcbiAgICB1c2VySW5wdXQ6IHN0cixcbiAgICBlMTY0OiBpbnN0YW5jZS5mb3JtYXQocmVzdWx0LCBmb3JtYXQpLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQ0FBMkI7QUFHM0IsTUFBTSxXQUFXLHFDQUFlLGdCQUFnQixZQUFZO0FBQzVELE1BQU0sRUFBRSxzQkFBc0I7QUFVdkIsbUNBQ0wsS0FDQSxZQUNBLFNBQVMsa0JBQWtCLE1BQ0M7QUFDNUIsTUFBSTtBQUNKLE1BQUk7QUFDRixhQUFTLFNBQVMsTUFBTSxLQUFLLFVBQVU7QUFBQSxFQUN6QyxTQUFTLEtBQVA7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFBQSxJQUNMLFNBQVMsU0FBUyxjQUFjLE1BQU07QUFBQSxJQUN0QyxXQUFXO0FBQUEsSUFDWCxNQUFNLFNBQVMsT0FBTyxRQUFRLE1BQU07QUFBQSxFQUN0QztBQUNGO0FBakJnQiIsCiAgIm5hbWVzIjogW10KfQo=
