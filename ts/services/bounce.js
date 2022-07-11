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
var bounce_exports = {};
__export(bounce_exports, {
  init: () => init
});
module.exports = __toCommonJS(bounce_exports);
var import_electron = require("electron");
let bounceId = -1;
function init(win) {
  import_electron.ipcMain.on("bounce-app-icon-start", (_, isCritical = false) => {
    if (import_electron.app.dock) {
      const type = isCritical ? "critical" : "informational";
      bounceId = import_electron.app.dock.bounce(type);
    } else if (win && win.flashFrame) {
      win.once("focus", () => {
        win.flashFrame(false);
      });
      win.flashFrame(true);
    }
  });
  import_electron.ipcMain.on("bounce-app-icon-stop", () => {
    if (import_electron.app.dock) {
      if (bounceId < 0) {
        return;
      }
      import_electron.app.dock.cancelBounce(bounceId);
      bounceId = -1;
    } else if (win && win.flashFrame) {
      win.flashFrame(false);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  init
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYm91bmNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQnJvd3NlcldpbmRvdyB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IGFwcCwgaXBjTWFpbiB9IGZyb20gJ2VsZWN0cm9uJztcblxubGV0IGJvdW5jZUlkID0gLTE7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KHdpbjogQnJvd3NlcldpbmRvdyk6IHZvaWQge1xuICBpcGNNYWluLm9uKCdib3VuY2UtYXBwLWljb24tc3RhcnQnLCAoXywgaXNDcml0aWNhbCA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKGFwcC5kb2NrKSB7XG4gICAgICBjb25zdCB0eXBlID0gaXNDcml0aWNhbCA/ICdjcml0aWNhbCcgOiAnaW5mb3JtYXRpb25hbCc7XG4gICAgICBib3VuY2VJZCA9IGFwcC5kb2NrLmJvdW5jZSh0eXBlKTtcbiAgICB9IGVsc2UgaWYgKHdpbiAmJiB3aW4uZmxhc2hGcmFtZSkge1xuICAgICAgd2luLm9uY2UoJ2ZvY3VzJywgKCkgPT4ge1xuICAgICAgICB3aW4uZmxhc2hGcmFtZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHdpbi5mbGFzaEZyYW1lKHRydWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXBjTWFpbi5vbignYm91bmNlLWFwcC1pY29uLXN0b3AnLCAoKSA9PiB7XG4gICAgaWYgKGFwcC5kb2NrKSB7XG4gICAgICBpZiAoYm91bmNlSWQgPCAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBwLmRvY2suY2FuY2VsQm91bmNlKGJvdW5jZUlkKTtcbiAgICAgIGJvdW5jZUlkID0gLTE7XG4gICAgfSBlbHNlIGlmICh3aW4gJiYgd2luLmZsYXNoRnJhbWUpIHtcbiAgICAgIHdpbi5mbGFzaEZyYW1lKGZhbHNlKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLHNCQUE2QjtBQUU3QixJQUFJLFdBQVc7QUFFUixjQUFjLEtBQTBCO0FBQzdDLDBCQUFRLEdBQUcseUJBQXlCLENBQUMsR0FBRyxhQUFhLFVBQVU7QUFDN0QsUUFBSSxvQkFBSSxNQUFNO0FBQ1osWUFBTSxPQUFPLGFBQWEsYUFBYTtBQUN2QyxpQkFBVyxvQkFBSSxLQUFLLE9BQU8sSUFBSTtBQUFBLElBQ2pDLFdBQVcsT0FBTyxJQUFJLFlBQVk7QUFDaEMsVUFBSSxLQUFLLFNBQVMsTUFBTTtBQUN0QixZQUFJLFdBQVcsS0FBSztBQUFBLE1BQ3RCLENBQUM7QUFDRCxVQUFJLFdBQVcsSUFBSTtBQUFBLElBQ3JCO0FBQUEsRUFDRixDQUFDO0FBRUQsMEJBQVEsR0FBRyx3QkFBd0IsTUFBTTtBQUN2QyxRQUFJLG9CQUFJLE1BQU07QUFDWixVQUFJLFdBQVcsR0FBRztBQUNoQjtBQUFBLE1BQ0Y7QUFFQSwwQkFBSSxLQUFLLGFBQWEsUUFBUTtBQUM5QixpQkFBVztBQUFBLElBQ2IsV0FBVyxPQUFPLElBQUksWUFBWTtBQUNoQyxVQUFJLFdBQVcsS0FBSztBQUFBLElBQ3RCO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUF6QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
