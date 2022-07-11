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
var requestMicrophonePermissions_exports = {};
__export(requestMicrophonePermissions_exports, {
  requestMicrophonePermissions: () => requestMicrophonePermissions
});
module.exports = __toCommonJS(requestMicrophonePermissions_exports);
async function requestMicrophonePermissions(forCalling) {
  const microphonePermission = await window.getMediaPermissions();
  if (!microphonePermission) {
    await window.showPermissionsPopup(forCalling, false);
    return window.getMediaPermissions();
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestMicrophonePermissions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVxdWVzdE1pY3JvcGhvbmVQZXJtaXNzaW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdE1pY3JvcGhvbmVQZXJtaXNzaW9ucyhcbiAgZm9yQ2FsbGluZzogYm9vbGVhblxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IG1pY3JvcGhvbmVQZXJtaXNzaW9uID0gYXdhaXQgd2luZG93LmdldE1lZGlhUGVybWlzc2lvbnMoKTtcbiAgaWYgKCFtaWNyb3Bob25lUGVybWlzc2lvbikge1xuICAgIGF3YWl0IHdpbmRvdy5zaG93UGVybWlzc2lvbnNQb3B1cChmb3JDYWxsaW5nLCBmYWxzZSk7XG5cbiAgICAvLyBDaGVjayB0aGUgc2V0dGluZyBhZ2FpbiAoZnJvbSB0aGUgc291cmNlIG9mIHRydXRoKS5cbiAgICByZXR1cm4gd2luZG93LmdldE1lZGlhUGVybWlzc2lvbnMoKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLDRDQUNFLFlBQ2tCO0FBQ2xCLFFBQU0sdUJBQXVCLE1BQU0sT0FBTyxvQkFBb0I7QUFDOUQsTUFBSSxDQUFDLHNCQUFzQjtBQUN6QixVQUFNLE9BQU8scUJBQXFCLFlBQVksS0FBSztBQUduRCxXQUFPLE9BQU8sb0JBQW9CO0FBQUEsRUFDcEM7QUFFQSxTQUFPO0FBQ1Q7QUFac0IiLAogICJuYW1lcyI6IFtdCn0K
