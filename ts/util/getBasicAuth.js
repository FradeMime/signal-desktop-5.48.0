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
var getBasicAuth_exports = {};
__export(getBasicAuth_exports, {
  getBasicAuth: () => getBasicAuth
});
module.exports = __toCommonJS(getBasicAuth_exports);
var import_Bytes = require("../Bytes");
function getBasicAuth({
  username,
  password
}) {
  const auth = (0, import_Bytes.toBase64)((0, import_Bytes.fromString)(`${username}:${password}`));
  return `Basic ${auth}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBasicAuth
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QmFzaWNBdXRoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZnJvbVN0cmluZywgdG9CYXNlNjQgfSBmcm9tICcuLi9CeXRlcyc7XG5cbmV4cG9ydCB0eXBlIEdldEJhc2ljQXV0aE9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYXNpY0F1dGgoe1xuICB1c2VybmFtZSxcbiAgcGFzc3dvcmQsXG59OiBHZXRCYXNpY0F1dGhPcHRpb25zVHlwZSk6IHN0cmluZyB7XG4gIGNvbnN0IGF1dGggPSB0b0Jhc2U2NChmcm9tU3RyaW5nKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApKTtcblxuICByZXR1cm4gYEJhc2ljICR7YXV0aH1gO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFxQztBQU85QixzQkFBc0I7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxHQUNrQztBQUNsQyxRQUFNLE9BQU8sMkJBQVMsNkJBQVcsR0FBRyxZQUFZLFVBQVUsQ0FBQztBQUUzRCxTQUFPLFNBQVM7QUFDbEI7QUFQZ0IiLAogICJuYW1lcyI6IFtdCn0K
