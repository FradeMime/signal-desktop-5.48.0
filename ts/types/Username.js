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
var Username_exports = {};
__export(Username_exports, {
  MAX_USERNAME: () => MAX_USERNAME,
  MIN_USERNAME: () => MIN_USERNAME,
  getUsernameFromSearch: () => getUsernameFromSearch,
  isValidUsername: () => isValidUsername
});
module.exports = __toCommonJS(Username_exports);
const MAX_USERNAME = 26;
const MIN_USERNAME = 4;
function isValidUsername(searchTerm) {
  return /^[a-z_][0-9a-z_]{3,25}$/.test(searchTerm);
}
function getUsernameFromSearch(searchTerm) {
  if (/^[+0-9]+$/.test(searchTerm)) {
    return void 0;
  }
  const match = /^@?(.*?)@?$/.exec(searchTerm);
  if (match && match[1]) {
    return match[1];
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_USERNAME,
  MIN_USERNAME,
  getUsernameFromSearch,
  isValidUsername
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXNlcm5hbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGNvbnN0IE1BWF9VU0VSTkFNRSA9IDI2O1xuZXhwb3J0IGNvbnN0IE1JTl9VU0VSTkFNRSA9IDQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVXNlcm5hbWUoc2VhcmNoVGVybTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiAvXlthLXpfXVswLTlhLXpfXXszLDI1fSQvLnRlc3Qoc2VhcmNoVGVybSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VybmFtZUZyb21TZWFyY2goc2VhcmNoVGVybTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKC9eWyswLTldKyQvLnRlc3Qoc2VhcmNoVGVybSkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSAvXkA/KC4qPylAPyQvLmV4ZWMoc2VhcmNoVGVybSk7XG5cbiAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgcmV0dXJuIG1hdGNoWzFdO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyxNQUFNLGVBQWU7QUFDckIsTUFBTSxlQUFlO0FBRXJCLHlCQUF5QixZQUE2QjtBQUMzRCxTQUFPLDBCQUEwQixLQUFLLFVBQVU7QUFDbEQ7QUFGZ0IsQUFJVCwrQkFBK0IsWUFBd0M7QUFDNUUsTUFBSSxZQUFZLEtBQUssVUFBVSxHQUFHO0FBQ2hDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxRQUFRLGNBQWMsS0FBSyxVQUFVO0FBRTNDLE1BQUksU0FBUyxNQUFNLElBQUk7QUFDckIsV0FBTyxNQUFNO0FBQUEsRUFDZjtBQUVBLFNBQU87QUFDVDtBQVpnQiIsCiAgIm5hbWVzIjogW10KfQo=
