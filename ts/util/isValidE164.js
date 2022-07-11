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
var isValidE164_exports = {};
__export(isValidE164_exports, {
  isValidE164: () => isValidE164
});
module.exports = __toCommonJS(isValidE164_exports);
function isValidE164(value, mustStartWithPlus) {
  if (typeof value !== "string") {
    return false;
  }
  const regex = mustStartWithPlus ? /^\+[1-9]\d{1,14}$/ : /^\+?[1-9]\d{1,14}$/;
  return regex.test(value);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidE164
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNWYWxpZEUxNjQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgaW5wdXQgbG9va3MgbGlrZSBhIHZhbGlkIEUxNjQsIGFuZCBgZmFsc2VgIG90aGVyd2lzZS4gTm90ZSB0aGF0XG4gKiB0aGlzIG1heSByZXR1cm4gZmFsc2UgcG9zaXRpdmVzLCBhcyBpdCBpcyBhIGZhaXJseSBuYVx1MDBFRnZlIGNoZWNrLlxuICpcbiAqIFNlZSA8aHR0cHM6Ly93d3cudHdpbGlvLmNvbS9kb2NzL2dsb3NzYXJ5L3doYXQtZTE2NCNyZWdleC1tYXRjaGluZy1mb3ItZTE2ND4gYW5kXG4gKiA8aHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIzMjk5OTg5Pi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRFMTY0KFxuICB2YWx1ZTogdW5rbm93bixcbiAgbXVzdFN0YXJ0V2l0aFBsdXM6IGJvb2xlYW5cbik6IHZhbHVlIGlzIHN0cmluZyB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcmVnZXggPSBtdXN0U3RhcnRXaXRoUGx1cyA/IC9eXFwrWzEtOV1cXGR7MSwxNH0kLyA6IC9eXFwrP1sxLTldXFxkezEsMTR9JC87XG5cbiAgcmV0dXJuIHJlZ2V4LnRlc3QodmFsdWUpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVPLHFCQUNMLE9BQ0EsbUJBQ2lCO0FBQ2pCLE1BQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsb0JBQW9CLHNCQUFzQjtBQUV4RCxTQUFPLE1BQU0sS0FBSyxLQUFLO0FBQ3pCO0FBWGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
