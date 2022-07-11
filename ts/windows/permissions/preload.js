var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_shims = require("../shims");
var import_react = __toESM(require("react"));
var import_react_dom = __toESM(require("react-dom"));
var import_electron = require("electron");
var import_context = require("../context");
var import_preload = require("../../util/preload");
var import_PermissionsPopup = require("../../components/PermissionsPopup");
const mediaCameraPermissions = (0, import_preload.createSetting)("mediaCameraPermissions", {
  getter: false
});
const mediaPermissions = (0, import_preload.createSetting)("mediaPermissions", {
  getter: false
});
import_electron.contextBridge.exposeInMainWorld("nativeThemeListener", window.SignalContext.nativeThemeListener);
import_electron.contextBridge.exposeInMainWorld("SignalContext", {
  ...import_context.SignalContext,
  renderWindow: () => {
    const { forCalling, forCamera } = import_context.SignalContext.config;
    let message;
    if (forCalling) {
      if (forCamera) {
        message = import_context.SignalContext.i18n("videoCallingPermissionNeeded");
      } else {
        message = import_context.SignalContext.i18n("audioCallingPermissionNeeded");
      }
    } else {
      message = import_context.SignalContext.i18n("audioPermissionNeeded");
    }
    function onClose() {
      import_context.SignalContext.executeMenuRole("close");
    }
    import_react_dom.default.render(import_react.default.createElement(import_PermissionsPopup.PermissionsPopup, {
      i18n: import_context.SignalContext.i18n,
      message,
      onAccept: () => {
        if (!forCamera) {
          mediaPermissions.setValue(true);
        } else {
          mediaCameraPermissions.setValue(true);
        }
        onClose();
      },
      onClose
    }), document.getElementById("app"));
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaGFzIHRvIGJlIHRoZSBmaXJzdCBpbXBvcnQgYmVjYXVzZSBvZiBtb25rZXktcGF0Y2hpbmdcbmltcG9ydCAnLi4vc2hpbXMnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgeyBTaWduYWxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5cbmltcG9ydCB7IGNyZWF0ZVNldHRpbmcgfSBmcm9tICcuLi8uLi91dGlsL3ByZWxvYWQnO1xuaW1wb3J0IHsgUGVybWlzc2lvbnNQb3B1cCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUGVybWlzc2lvbnNQb3B1cCc7XG5cbmNvbnN0IG1lZGlhQ2FtZXJhUGVybWlzc2lvbnMgPSBjcmVhdGVTZXR0aW5nKCdtZWRpYUNhbWVyYVBlcm1pc3Npb25zJywge1xuICBnZXR0ZXI6IGZhbHNlLFxufSk7XG5jb25zdCBtZWRpYVBlcm1pc3Npb25zID0gY3JlYXRlU2V0dGluZygnbWVkaWFQZXJtaXNzaW9ucycsIHtcbiAgZ2V0dGVyOiBmYWxzZSxcbn0pO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKFxuICAnbmF0aXZlVGhlbWVMaXN0ZW5lcicsXG4gIHdpbmRvdy5TaWduYWxDb250ZXh0Lm5hdGl2ZVRoZW1lTGlzdGVuZXJcbik7XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ1NpZ25hbENvbnRleHQnLCB7XG4gIC4uLlNpZ25hbENvbnRleHQsXG4gIHJlbmRlcldpbmRvdzogKCkgPT4ge1xuICAgIGNvbnN0IHsgZm9yQ2FsbGluZywgZm9yQ2FtZXJhIH0gPSBTaWduYWxDb250ZXh0LmNvbmZpZztcblxuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmIChmb3JDYWxsaW5nKSB7XG4gICAgICBpZiAoZm9yQ2FtZXJhKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBTaWduYWxDb250ZXh0LmkxOG4oJ3ZpZGVvQ2FsbGluZ1Blcm1pc3Npb25OZWVkZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBTaWduYWxDb250ZXh0LmkxOG4oJ2F1ZGlvQ2FsbGluZ1Blcm1pc3Npb25OZWVkZWQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSA9IFNpZ25hbENvbnRleHQuaTE4bignYXVkaW9QZXJtaXNzaW9uTmVlZGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZSgpIHtcbiAgICAgIFNpZ25hbENvbnRleHQuZXhlY3V0ZU1lbnVSb2xlKCdjbG9zZScpO1xuICAgIH1cblxuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGVybWlzc2lvbnNQb3B1cCwge1xuICAgICAgICBpMThuOiBTaWduYWxDb250ZXh0LmkxOG4sXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIG9uQWNjZXB0OiAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFmb3JDYW1lcmEpIHtcbiAgICAgICAgICAgIG1lZGlhUGVybWlzc2lvbnMuc2V0VmFsdWUodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lZGlhQ2FtZXJhUGVybWlzc2lvbnMuc2V0VmFsdWUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbG9zZSxcbiAgICAgIH0pLFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgKTtcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLG1CQUFPO0FBRVAsbUJBQWtCO0FBQ2xCLHVCQUFxQjtBQUNyQixzQkFBOEI7QUFFOUIscUJBQThCO0FBRTlCLHFCQUE4QjtBQUM5Qiw4QkFBaUM7QUFFakMsTUFBTSx5QkFBeUIsa0NBQWMsMEJBQTBCO0FBQUEsRUFDckUsUUFBUTtBQUNWLENBQUM7QUFDRCxNQUFNLG1CQUFtQixrQ0FBYyxvQkFBb0I7QUFBQSxFQUN6RCxRQUFRO0FBQ1YsQ0FBQztBQUVELDhCQUFjLGtCQUNaLHVCQUNBLE9BQU8sY0FBYyxtQkFDdkI7QUFFQSw4QkFBYyxrQkFBa0IsaUJBQWlCO0FBQUEsS0FDNUM7QUFBQSxFQUNILGNBQWMsTUFBTTtBQUNsQixVQUFNLEVBQUUsWUFBWSxjQUFjLDZCQUFjO0FBRWhELFFBQUk7QUFDSixRQUFJLFlBQVk7QUFDZCxVQUFJLFdBQVc7QUFDYixrQkFBVSw2QkFBYyxLQUFLLDhCQUE4QjtBQUFBLE1BQzdELE9BQU87QUFDTCxrQkFBVSw2QkFBYyxLQUFLLDhCQUE4QjtBQUFBLE1BQzdEO0FBQUEsSUFDRixPQUFPO0FBQ0wsZ0JBQVUsNkJBQWMsS0FBSyx1QkFBdUI7QUFBQSxJQUN0RDtBQUVBLHVCQUFtQjtBQUNqQixtQ0FBYyxnQkFBZ0IsT0FBTztBQUFBLElBQ3ZDO0FBRlMsQUFJVCw2QkFBUyxPQUNQLHFCQUFNLGNBQWMsMENBQWtCO0FBQUEsTUFDcEMsTUFBTSw2QkFBYztBQUFBLE1BQ3BCO0FBQUEsTUFDQSxVQUFVLE1BQU07QUFDZCxZQUFJLENBQUMsV0FBVztBQUNkLDJCQUFpQixTQUFTLElBQUk7QUFBQSxRQUNoQyxPQUFPO0FBQ0wsaUNBQXVCLFNBQVMsSUFBSTtBQUFBLFFBQ3RDO0FBQ0EsZ0JBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQyxHQUNELFNBQVMsZUFBZSxLQUFLLENBQy9CO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
