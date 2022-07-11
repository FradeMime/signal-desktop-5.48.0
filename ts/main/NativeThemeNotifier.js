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
var NativeThemeNotifier_exports = {};
__export(NativeThemeNotifier_exports, {
  NativeThemeNotifier: () => NativeThemeNotifier
});
module.exports = __toCommonJS(NativeThemeNotifier_exports);
var import_electron = require("electron");
function getState() {
  return {
    shouldUseDarkColors: import_electron.nativeTheme.shouldUseDarkColors
  };
}
class NativeThemeNotifier {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
  }
  initialize() {
    import_electron.nativeTheme.on("updated", () => {
      this.notifyListeners();
    });
    import_electron.ipcMain.on("native-theme:init", (event) => {
      event.returnValue = getState();
    });
  }
  addWindow(window) {
    if (this.listeners.has(window)) {
      return;
    }
    this.listeners.add(window);
    window.once("closed", () => {
      this.listeners.delete(window);
    });
  }
  notifyListeners() {
    for (const window of this.listeners) {
      window.webContents.send("native-theme:changed", getState());
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NativeThemeNotifier
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTmF0aXZlVGhlbWVOb3RpZmllci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBpcGNNYWluIGFzIGlwYywgbmF0aXZlVGhlbWUgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB0eXBlIHsgTmF0aXZlVGhlbWVTdGF0ZSB9IGZyb20gJy4uL3R5cGVzL05hdGl2ZVRoZW1lTm90aWZpZXIuZCc7XG5cbmZ1bmN0aW9uIGdldFN0YXRlKCk6IE5hdGl2ZVRoZW1lU3RhdGUge1xuICByZXR1cm4ge1xuICAgIHNob3VsZFVzZURhcmtDb2xvcnM6IG5hdGl2ZVRoZW1lLnNob3VsZFVzZURhcmtDb2xvcnMsXG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVUaGVtZU5vdGlmaWVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lcnMgPSBuZXcgU2V0PEJyb3dzZXJXaW5kb3c+KCk7XG5cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgbmF0aXZlVGhlbWUub24oJ3VwZGF0ZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgaXBjLm9uKCduYXRpdmUtdGhlbWU6aW5pdCcsIGV2ZW50ID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBnZXRTdGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFdpbmRvdyh3aW5kb3c6IEJyb3dzZXJXaW5kb3cpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMuaGFzKHdpbmRvdykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbmVycy5hZGQod2luZG93KTtcblxuICAgIHdpbmRvdy5vbmNlKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5kZWxldGUod2luZG93KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgd2luZG93IG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICB3aW5kb3cud2ViQ29udGVudHMuc2VuZCgnbmF0aXZlLXRoZW1lOmNoYW5nZWQnLCBnZXRTdGF0ZSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxzQkFBNEM7QUFJNUMsb0JBQXNDO0FBQ3BDLFNBQU87QUFBQSxJQUNMLHFCQUFxQiw0QkFBWTtBQUFBLEVBQ25DO0FBQ0Y7QUFKUyxBQU1GLE1BQU0sb0JBQW9CO0FBQUEsRUFBMUI7QUFDWSxxQkFBWSxvQkFBSSxJQUFtQjtBQUFBO0FBQUEsRUFFN0MsYUFBbUI7QUFDeEIsZ0NBQVksR0FBRyxXQUFXLE1BQU07QUFDOUIsV0FBSyxnQkFBZ0I7QUFBQSxJQUN2QixDQUFDO0FBRUQsNEJBQUksR0FBRyxxQkFBcUIsV0FBUztBQUVuQyxZQUFNLGNBQWMsU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFTyxVQUFVLFFBQTZCO0FBQzVDLFFBQUksS0FBSyxVQUFVLElBQUksTUFBTSxHQUFHO0FBQzlCO0FBQUEsSUFDRjtBQUVBLFNBQUssVUFBVSxJQUFJLE1BQU07QUFFekIsV0FBTyxLQUFLLFVBQVUsTUFBTTtBQUMxQixXQUFLLFVBQVUsT0FBTyxNQUFNO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVRLGtCQUF3QjtBQUM5QixlQUFXLFVBQVUsS0FBSyxXQUFXO0FBQ25DLGFBQU8sWUFBWSxLQUFLLHdCQUF3QixTQUFTLENBQUM7QUFBQSxJQUM1RDtBQUFBLEVBQ0Y7QUFDRjtBQS9CTyIsCiAgIm5hbWVzIjogW10KfQo=
