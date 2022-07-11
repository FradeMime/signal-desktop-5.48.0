var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var libphonenumberUtil_exports = {};
__export(libphonenumberUtil_exports, {
  getRegionCodeForNumber: () => getRegionCodeForNumber,
  parseNumber: () => parseNumber
});
module.exports = __toCommonJS(libphonenumberUtil_exports);
var import_libphonenumberInstance = require("./libphonenumberInstance");
const FALLBACK_REGION_CODE = "ZZ";
function getRegionCodeForNumber(number) {
  try {
    const parsedNumber = import_libphonenumberInstance.instance.parse(number);
    return import_libphonenumberInstance.instance.getRegionCodeForNumber(parsedNumber) || FALLBACK_REGION_CODE;
  } catch (e) {
    return FALLBACK_REGION_CODE;
  }
}
function parseNumber(number, defaultRegionCode) {
  try {
    const parsedNumber = import_libphonenumberInstance.instance.parse(number, defaultRegionCode);
    const isValidNumber = import_libphonenumberInstance.instance.isValidNumber(parsedNumber);
    if (!isValidNumber) {
      return { error: new Error("Invalid phone number"), isValidNumber: false };
    }
    return {
      isValidNumber: true,
      regionCode: import_libphonenumberInstance.instance.getRegionCodeForNumber(parsedNumber),
      countryCode: parsedNumber.getCountryCode()?.toString(),
      e164: import_libphonenumberInstance.instance.format(parsedNumber, import_libphonenumberInstance.PhoneNumberFormat.E164)
    };
  } catch (error) {
    return { error, isValidNumber: false };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRegionCodeForNumber,
  parseNumber
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicGhvbmVudW1iZXJVdGlsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHtcbiAgaW5zdGFuY2UgYXMgbGlicGhvbmVudW1iZXIsXG4gIFBob25lTnVtYmVyRm9ybWF0LFxufSBmcm9tICcuL2xpYnBob25lbnVtYmVySW5zdGFuY2UnO1xuXG5jb25zdCBGQUxMQkFDS19SRUdJT05fQ09ERSA9ICdaWic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWdpb25Db2RlRm9yTnVtYmVyKG51bWJlcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWROdW1iZXIgPSBsaWJwaG9uZW51bWJlci5wYXJzZShudW1iZXIpO1xuICAgIHJldHVybiAoXG4gICAgICBsaWJwaG9uZW51bWJlci5nZXRSZWdpb25Db2RlRm9yTnVtYmVyKHBhcnNlZE51bWJlcikgfHxcbiAgICAgIEZBTExCQUNLX1JFR0lPTl9DT0RFXG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBGQUxMQkFDS19SRUdJT05fQ09ERTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOdW1iZXIoXG4gIG51bWJlcjogc3RyaW5nLFxuICBkZWZhdWx0UmVnaW9uQ29kZT86IHN0cmluZ1xuKTpcbiAgfCB7IGlzVmFsaWROdW1iZXI6IGZhbHNlOyBlcnJvcjogdW5rbm93biB9XG4gIHwge1xuICAgICAgaXNWYWxpZE51bWJlcjogdHJ1ZTtcbiAgICAgIHJlZ2lvbkNvZGU6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICAgIGNvdW50cnlDb2RlOiB1bmRlZmluZWQgfCBzdHJpbmc7XG4gICAgICBlMTY0OiBzdHJpbmc7XG4gICAgfSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkTnVtYmVyID0gbGlicGhvbmVudW1iZXIucGFyc2UobnVtYmVyLCBkZWZhdWx0UmVnaW9uQ29kZSk7XG5cbiAgICBjb25zdCBpc1ZhbGlkTnVtYmVyID0gbGlicGhvbmVudW1iZXIuaXNWYWxpZE51bWJlcihwYXJzZWROdW1iZXIpO1xuICAgIGlmICghaXNWYWxpZE51bWJlcikge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6IG5ldyBFcnJvcignSW52YWxpZCBwaG9uZSBudW1iZXInKSwgaXNWYWxpZE51bWJlcjogZmFsc2UgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNWYWxpZE51bWJlcjogdHJ1ZSxcbiAgICAgIHJlZ2lvbkNvZGU6IGxpYnBob25lbnVtYmVyLmdldFJlZ2lvbkNvZGVGb3JOdW1iZXIocGFyc2VkTnVtYmVyKSxcbiAgICAgIGNvdW50cnlDb2RlOiBwYXJzZWROdW1iZXIuZ2V0Q291bnRyeUNvZGUoKT8udG9TdHJpbmcoKSxcbiAgICAgIGUxNjQ6IGxpYnBob25lbnVtYmVyLmZvcm1hdChwYXJzZWROdW1iZXIsIFBob25lTnVtYmVyRm9ybWF0LkUxNjQpLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgZXJyb3IsIGlzVmFsaWROdW1iZXI6IGZhbHNlIH07XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9DQUdPO0FBRVAsTUFBTSx1QkFBdUI7QUFFdEIsZ0NBQWdDLFFBQXdCO0FBQzdELE1BQUk7QUFDRixVQUFNLGVBQWUsdUNBQWUsTUFBTSxNQUFNO0FBQ2hELFdBQ0UsdUNBQWUsdUJBQXVCLFlBQVksS0FDbEQ7QUFBQSxFQUVKLFNBQVMsR0FBUDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFWZ0IsQUFZVCxxQkFDTCxRQUNBLG1CQVFJO0FBQ0osTUFBSTtBQUNGLFVBQU0sZUFBZSx1Q0FBZSxNQUFNLFFBQVEsaUJBQWlCO0FBRW5FLFVBQU0sZ0JBQWdCLHVDQUFlLGNBQWMsWUFBWTtBQUMvRCxRQUFJLENBQUMsZUFBZTtBQUNsQixhQUFPLEVBQUUsT0FBTyxJQUFJLE1BQU0sc0JBQXNCLEdBQUcsZUFBZSxNQUFNO0FBQUEsSUFDMUU7QUFFQSxXQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsTUFDZixZQUFZLHVDQUFlLHVCQUF1QixZQUFZO0FBQUEsTUFDOUQsYUFBYSxhQUFhLGVBQWUsR0FBRyxTQUFTO0FBQUEsTUFDckQsTUFBTSx1Q0FBZSxPQUFPLGNBQWMsZ0RBQWtCLElBQUk7QUFBQSxJQUNsRTtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsV0FBTyxFQUFFLE9BQU8sZUFBZSxNQUFNO0FBQUEsRUFDdkM7QUFDRjtBQTVCZ0IiLAogICJuYW1lcyI6IFtdCn0K
