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
var bounceAppIcon_exports = {};
__export(bounceAppIcon_exports, {
  bounceAppIconStart: () => bounceAppIconStart,
  bounceAppIconStop: () => bounceAppIconStop
});
module.exports = __toCommonJS(bounceAppIcon_exports);
var import_electron = require("electron");
function bounceAppIconStart(isCritical = false) {
  import_electron.ipcRenderer.send("bounce-app-icon-start", isCritical);
}
function bounceAppIconStop() {
  import_electron.ipcRenderer.send("bounce-app-icon-stop");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bounceAppIconStart,
  bounceAppIconStop
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYm91bmNlQXBwSWNvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5jZUFwcEljb25TdGFydChpc0NyaXRpY2FsID0gZmFsc2UpOiB2b2lkIHtcbiAgaXBjUmVuZGVyZXIuc2VuZCgnYm91bmNlLWFwcC1pY29uLXN0YXJ0JywgaXNDcml0aWNhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3VuY2VBcHBJY29uU3RvcCgpOiB2b2lkIHtcbiAgaXBjUmVuZGVyZXIuc2VuZCgnYm91bmNlLWFwcC1pY29uLXN0b3AnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUE0QjtBQUVyQiw0QkFBNEIsYUFBYSxPQUFhO0FBQzNELDhCQUFZLEtBQUsseUJBQXlCLFVBQVU7QUFDdEQ7QUFGZ0IsQUFJVCw2QkFBbUM7QUFDeEMsOEJBQVksS0FBSyxzQkFBc0I7QUFDekM7QUFGZ0IiLAogICJuYW1lcyI6IFtdCn0K
