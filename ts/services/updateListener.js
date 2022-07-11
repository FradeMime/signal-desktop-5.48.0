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
var updateListener_exports = {};
__export(updateListener_exports, {
  initializeUpdateListener: () => initializeUpdateListener
});
module.exports = __toCommonJS(updateListener_exports);
var import_electron = require("electron");
function initializeUpdateListener(updatesActions) {
  import_electron.ipcRenderer.on("show-update-dialog", (_, dialogType, options = {}) => {
    updatesActions.showUpdateDialog(dialogType, options);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initializeUpdateListener
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlTGlzdGVuZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgdHlwZSB7IERpYWxvZ1R5cGUgfSBmcm9tICcuLi90eXBlcy9EaWFsb2dzJztcbmltcG9ydCB0eXBlIHtcbiAgVXBkYXRlRGlhbG9nT3B0aW9uc1R5cGUsXG4gIFNob3dVcGRhdGVEaWFsb2dBY3Rpb25UeXBlLFxufSBmcm9tICcuLi9zdGF0ZS9kdWNrcy91cGRhdGVzJztcblxudHlwZSBVcGRhdGVzQWN0aW9ucyA9IHtcbiAgc2hvd1VwZGF0ZURpYWxvZzogKFxuICAgIHg6IERpYWxvZ1R5cGUsXG4gICAgb3B0aW9uczogVXBkYXRlRGlhbG9nT3B0aW9uc1R5cGVcbiAgKSA9PiBTaG93VXBkYXRlRGlhbG9nQWN0aW9uVHlwZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplVXBkYXRlTGlzdGVuZXIodXBkYXRlc0FjdGlvbnM6IFVwZGF0ZXNBY3Rpb25zKTogdm9pZCB7XG4gIGlwY1JlbmRlcmVyLm9uKFxuICAgICdzaG93LXVwZGF0ZS1kaWFsb2cnLFxuICAgIChfLCBkaWFsb2dUeXBlOiBEaWFsb2dUeXBlLCBvcHRpb25zOiBVcGRhdGVEaWFsb2dPcHRpb25zVHlwZSA9IHt9KSA9PiB7XG4gICAgICB1cGRhdGVzQWN0aW9ucy5zaG93VXBkYXRlRGlhbG9nKGRpYWxvZ1R5cGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBNEI7QUFjckIsa0NBQWtDLGdCQUFzQztBQUM3RSw4QkFBWSxHQUNWLHNCQUNBLENBQUMsR0FBRyxZQUF3QixVQUFtQyxDQUFDLE1BQU07QUFDcEUsbUJBQWUsaUJBQWlCLFlBQVksT0FBTztBQUFBLEVBQ3JELENBQ0Y7QUFDRjtBQVBnQiIsCiAgIm5hbWVzIjogW10KfQo=
