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
var PhoneNumber_exports = {};
__export(PhoneNumber_exports, {
  format: () => format,
  isValidNumber: () => isValidNumber,
  normalize: () => normalize,
  parse: () => parse
});
module.exports = __toCommonJS(PhoneNumber_exports);
var import_memoizee = __toESM(require("memoizee"));
var import_libphonenumberInstance = require("../util/libphonenumberInstance");
function _format(phoneNumber, options) {
  try {
    const { ourRegionCode } = options;
    const parsedNumber = import_libphonenumberInstance.instance.parse(phoneNumber);
    const regionCode = import_libphonenumberInstance.instance.getRegionCodeForNumber(parsedNumber);
    if (ourRegionCode && regionCode === ourRegionCode) {
      return import_libphonenumberInstance.instance.format(parsedNumber, import_libphonenumberInstance.PhoneNumberFormat.NATIONAL);
    }
    return import_libphonenumberInstance.instance.format(parsedNumber, import_libphonenumberInstance.PhoneNumberFormat.INTERNATIONAL);
  } catch (error) {
    return phoneNumber;
  }
}
function isValidNumber(phoneNumber, options) {
  const { regionCode } = options || { regionCode: void 0 };
  try {
    const parsedNumber = import_libphonenumberInstance.instance.parse(phoneNumber, regionCode);
    return import_libphonenumberInstance.instance.isValidNumber(parsedNumber);
  } catch (error) {
    return false;
  }
}
const format = (0, import_memoizee.default)(_format, {
  primitive: true,
  normalizer: (...args) => JSON.stringify(args),
  max: 5e3
});
function parse(phoneNumber, options) {
  const { regionCode } = options;
  const parsedNumber = import_libphonenumberInstance.instance.parse(phoneNumber, regionCode);
  if (import_libphonenumberInstance.instance.isValidNumber(parsedNumber)) {
    return import_libphonenumberInstance.instance.format(parsedNumber, import_libphonenumberInstance.PhoneNumberFormat.E164);
  }
  return phoneNumber;
}
function normalize(phoneNumber, options) {
  const { regionCode } = options;
  try {
    const parsedNumber = import_libphonenumberInstance.instance.parse(phoneNumber, regionCode);
    if (import_libphonenumberInstance.instance.isValidNumber(parsedNumber)) {
      return import_libphonenumberInstance.instance.format(parsedNumber, import_libphonenumberInstance.PhoneNumberFormat.E164);
    }
    return void 0;
  } catch (error) {
    return void 0;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  format,
  isValidNumber,
  normalize,
  parse
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGhvbmVOdW1iZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgbWVtb2l6ZWUgZnJvbSAnbWVtb2l6ZWUnO1xuaW1wb3J0IHsgaW5zdGFuY2UsIFBob25lTnVtYmVyRm9ybWF0IH0gZnJvbSAnLi4vdXRpbC9saWJwaG9uZW51bWJlckluc3RhbmNlJztcblxuZnVuY3Rpb24gX2Zvcm1hdChcbiAgcGhvbmVOdW1iZXI6IHN0cmluZyxcbiAgb3B0aW9uczoge1xuICAgIG91clJlZ2lvbkNvZGU/OiBzdHJpbmc7XG4gIH1cbikge1xuICB0cnkge1xuICAgIGNvbnN0IHsgb3VyUmVnaW9uQ29kZSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBwYXJzZWROdW1iZXIgPSBpbnN0YW5jZS5wYXJzZShwaG9uZU51bWJlcik7XG4gICAgY29uc3QgcmVnaW9uQ29kZSA9IGluc3RhbmNlLmdldFJlZ2lvbkNvZGVGb3JOdW1iZXIocGFyc2VkTnVtYmVyKTtcblxuICAgIGlmIChvdXJSZWdpb25Db2RlICYmIHJlZ2lvbkNvZGUgPT09IG91clJlZ2lvbkNvZGUpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZS5mb3JtYXQocGFyc2VkTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdC5OQVRJT05BTCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmZvcm1hdChwYXJzZWROdW1iZXIsIFBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBwaG9uZU51bWJlcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZE51bWJlcihcbiAgcGhvbmVOdW1iZXI6IHN0cmluZyxcbiAgb3B0aW9ucz86IHtcbiAgICByZWdpb25Db2RlPzogc3RyaW5nO1xuICB9XG4pOiBib29sZWFuIHtcbiAgY29uc3QgeyByZWdpb25Db2RlIH0gPSBvcHRpb25zIHx8IHsgcmVnaW9uQ29kZTogdW5kZWZpbmVkIH07XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkTnVtYmVyID0gaW5zdGFuY2UucGFyc2UocGhvbmVOdW1iZXIsIHJlZ2lvbkNvZGUpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlLmlzVmFsaWROdW1iZXIocGFyc2VkTnVtYmVyKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZvcm1hdCA9IG1lbW9pemVlKF9mb3JtYXQsIHtcbiAgcHJpbWl0aXZlOiB0cnVlLFxuICAvLyBDb252ZXJ0IHRoZSBhcmd1bWVudHMgdG8gYSB1bmlxdWUgc3RyaW5nLCByZXF1aXJlZCBmb3IgcHJpbWl0aXZlIG1vZGUuXG4gIG5vcm1hbGl6ZXI6ICguLi5hcmdzKSA9PiBKU09OLnN0cmluZ2lmeShhcmdzKSxcbiAgbWF4OiA1MDAwLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShcbiAgcGhvbmVOdW1iZXI6IHN0cmluZyxcbiAgb3B0aW9uczoge1xuICAgIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgfVxuKTogc3RyaW5nIHtcbiAgY29uc3QgeyByZWdpb25Db2RlIH0gPSBvcHRpb25zO1xuICBjb25zdCBwYXJzZWROdW1iZXIgPSBpbnN0YW5jZS5wYXJzZShwaG9uZU51bWJlciwgcmVnaW9uQ29kZSk7XG5cbiAgaWYgKGluc3RhbmNlLmlzVmFsaWROdW1iZXIocGFyc2VkTnVtYmVyKSkge1xuICAgIHJldHVybiBpbnN0YW5jZS5mb3JtYXQocGFyc2VkTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdC5FMTY0KTtcbiAgfVxuXG4gIHJldHVybiBwaG9uZU51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShcbiAgcGhvbmVOdW1iZXI6IHN0cmluZyxcbiAgb3B0aW9uczogeyByZWdpb25Db2RlOiBzdHJpbmcgfVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyByZWdpb25Db2RlIH0gPSBvcHRpb25zO1xuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZE51bWJlciA9IGluc3RhbmNlLnBhcnNlKHBob25lTnVtYmVyLCByZWdpb25Db2RlKTtcblxuICAgIGlmIChpbnN0YW5jZS5pc1ZhbGlkTnVtYmVyKHBhcnNlZE51bWJlcikpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZS5mb3JtYXQocGFyc2VkTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdC5FMTY0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBcUI7QUFDckIsb0NBQTRDO0FBRTVDLGlCQUNFLGFBQ0EsU0FHQTtBQUNBLE1BQUk7QUFDRixVQUFNLEVBQUUsa0JBQWtCO0FBQzFCLFVBQU0sZUFBZSx1Q0FBUyxNQUFNLFdBQVc7QUFDL0MsVUFBTSxhQUFhLHVDQUFTLHVCQUF1QixZQUFZO0FBRS9ELFFBQUksaUJBQWlCLGVBQWUsZUFBZTtBQUNqRCxhQUFPLHVDQUFTLE9BQU8sY0FBYyxnREFBa0IsUUFBUTtBQUFBLElBQ2pFO0FBRUEsV0FBTyx1Q0FBUyxPQUFPLGNBQWMsZ0RBQWtCLGFBQWE7QUFBQSxFQUN0RSxTQUFTLE9BQVA7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBbkJTLEFBcUJGLHVCQUNMLGFBQ0EsU0FHUztBQUNULFFBQU0sRUFBRSxlQUFlLFdBQVcsRUFBRSxZQUFZLE9BQVU7QUFDMUQsTUFBSTtBQUNGLFVBQU0sZUFBZSx1Q0FBUyxNQUFNLGFBQWEsVUFBVTtBQUUzRCxXQUFPLHVDQUFTLGNBQWMsWUFBWTtBQUFBLEVBQzVDLFNBQVMsT0FBUDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFkZ0IsQUFnQlQsTUFBTSxTQUFTLDZCQUFTLFNBQVM7QUFBQSxFQUN0QyxXQUFXO0FBQUEsRUFFWCxZQUFZLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSTtBQUFBLEVBQzVDLEtBQUs7QUFDUCxDQUFDO0FBRU0sZUFDTCxhQUNBLFNBR1E7QUFDUixRQUFNLEVBQUUsZUFBZTtBQUN2QixRQUFNLGVBQWUsdUNBQVMsTUFBTSxhQUFhLFVBQVU7QUFFM0QsTUFBSSx1Q0FBUyxjQUFjLFlBQVksR0FBRztBQUN4QyxXQUFPLHVDQUFTLE9BQU8sY0FBYyxnREFBa0IsSUFBSTtBQUFBLEVBQzdEO0FBRUEsU0FBTztBQUNUO0FBZGdCLEFBZ0JULG1CQUNMLGFBQ0EsU0FDb0I7QUFDcEIsUUFBTSxFQUFFLGVBQWU7QUFDdkIsTUFBSTtBQUNGLFVBQU0sZUFBZSx1Q0FBUyxNQUFNLGFBQWEsVUFBVTtBQUUzRCxRQUFJLHVDQUFTLGNBQWMsWUFBWSxHQUFHO0FBQ3hDLGFBQU8sdUNBQVMsT0FBTyxjQUFjLGdEQUFrQixJQUFJO0FBQUEsSUFDN0Q7QUFFQSxXQUFPO0FBQUEsRUFDVCxTQUFTLE9BQVA7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBaEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
