var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_DebugLogWindow = require("../../components/DebugLogWindow");
var debugLog = __toESM(require("../../logging/debuglogs"));
var import_uploadDebugLog = require("../../logging/uploadDebugLog");
var logger = __toESM(require("../../logging/log"));
import_electron.contextBridge.exposeInMainWorld("SignalContext", {
  ...import_context.SignalContext,
  renderWindow: () => {
    const environmentText = [import_context.SignalContext.getEnvironment()];
    const appInstance = import_context.SignalContext.getAppInstance();
    if (appInstance) {
      environmentText.push(appInstance);
    }
    import_react_dom.default.render(import_react.default.createElement(import_DebugLogWindow.DebugLogWindow, {
      platform: process.platform,
      isWindows11: import_context.SignalContext.OS.isWindows11(),
      executeMenuRole: import_context.SignalContext.executeMenuRole,
      closeWindow: () => import_context.SignalContext.executeMenuRole("close"),
      downloadLog: (logText) => import_electron.ipcRenderer.send("show-debug-log-save-dialog", logText),
      i18n: import_context.SignalContext.i18n,
      fetchLogs() {
        return debugLog.fetch(import_context.SignalContext.getNodeVersion(), import_context.SignalContext.getVersion());
      },
      uploadLogs(logs) {
        return (0, import_uploadDebugLog.upload)({
          content: logs,
          appVersion: import_context.SignalContext.getVersion(),
          logger
        });
      }
    }), document.getElementById("app"));
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaGFzIHRvIGJlIHRoZSBmaXJzdCBpbXBvcnQgYmVjYXVzZSBvZiBtb25rZXktcGF0Y2hpbmdcbmltcG9ydCAnLi4vc2hpbXMnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgU2lnbmFsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgRGVidWdMb2dXaW5kb3cgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0RlYnVnTG9nV2luZG93JztcbmltcG9ydCAqIGFzIGRlYnVnTG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvZGVidWdsb2dzJztcbmltcG9ydCB7IHVwbG9hZCB9IGZyb20gJy4uLy4uL2xvZ2dpbmcvdXBsb2FkRGVidWdMb2cnO1xuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnU2lnbmFsQ29udGV4dCcsIHtcbiAgLi4uU2lnbmFsQ29udGV4dCxcbiAgcmVuZGVyV2luZG93OiAoKSA9PiB7XG4gICAgY29uc3QgZW52aXJvbm1lbnRUZXh0OiBBcnJheTxzdHJpbmc+ID0gW1NpZ25hbENvbnRleHQuZ2V0RW52aXJvbm1lbnQoKV07XG5cbiAgICBjb25zdCBhcHBJbnN0YW5jZSA9IFNpZ25hbENvbnRleHQuZ2V0QXBwSW5zdGFuY2UoKTtcbiAgICBpZiAoYXBwSW5zdGFuY2UpIHtcbiAgICAgIGVudmlyb25tZW50VGV4dC5wdXNoKGFwcEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERlYnVnTG9nV2luZG93LCB7XG4gICAgICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICAgICAgICBpc1dpbmRvd3MxMTogU2lnbmFsQ29udGV4dC5PUy5pc1dpbmRvd3MxMSgpLFxuICAgICAgICBleGVjdXRlTWVudVJvbGU6IFNpZ25hbENvbnRleHQuZXhlY3V0ZU1lbnVSb2xlLFxuICAgICAgICBjbG9zZVdpbmRvdzogKCkgPT4gU2lnbmFsQ29udGV4dC5leGVjdXRlTWVudVJvbGUoJ2Nsb3NlJyksXG4gICAgICAgIGRvd25sb2FkTG9nOiAobG9nVGV4dDogc3RyaW5nKSA9PlxuICAgICAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3Nob3ctZGVidWctbG9nLXNhdmUtZGlhbG9nJywgbG9nVGV4dCksXG4gICAgICAgIGkxOG46IFNpZ25hbENvbnRleHQuaTE4bixcbiAgICAgICAgZmV0Y2hMb2dzKCkge1xuICAgICAgICAgIHJldHVybiBkZWJ1Z0xvZy5mZXRjaChcbiAgICAgICAgICAgIFNpZ25hbENvbnRleHQuZ2V0Tm9kZVZlcnNpb24oKSxcbiAgICAgICAgICAgIFNpZ25hbENvbnRleHQuZ2V0VmVyc2lvbigpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBsb2FkTG9ncyhsb2dzOiBzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gdXBsb2FkKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IGxvZ3MsXG4gICAgICAgICAgICBhcHBWZXJzaW9uOiBTaWduYWxDb250ZXh0LmdldFZlcnNpb24oKSxcbiAgICAgICAgICAgIGxvZ2dlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgKTtcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsbUJBQU87QUFFUCxtQkFBa0I7QUFDbEIsdUJBQXFCO0FBQ3JCLHNCQUEyQztBQUUzQyxxQkFBOEI7QUFDOUIsNEJBQStCO0FBQy9CLGVBQTBCO0FBQzFCLDRCQUF1QjtBQUN2QixhQUF3QjtBQUV4Qiw4QkFBYyxrQkFBa0IsaUJBQWlCO0FBQUEsS0FDNUM7QUFBQSxFQUNILGNBQWMsTUFBTTtBQUNsQixVQUFNLGtCQUFpQyxDQUFDLDZCQUFjLGVBQWUsQ0FBQztBQUV0RSxVQUFNLGNBQWMsNkJBQWMsZUFBZTtBQUNqRCxRQUFJLGFBQWE7QUFDZixzQkFBZ0IsS0FBSyxXQUFXO0FBQUEsSUFDbEM7QUFFQSw2QkFBUyxPQUNQLHFCQUFNLGNBQWMsc0NBQWdCO0FBQUEsTUFDbEMsVUFBVSxRQUFRO0FBQUEsTUFDbEIsYUFBYSw2QkFBYyxHQUFHLFlBQVk7QUFBQSxNQUMxQyxpQkFBaUIsNkJBQWM7QUFBQSxNQUMvQixhQUFhLE1BQU0sNkJBQWMsZ0JBQWdCLE9BQU87QUFBQSxNQUN4RCxhQUFhLENBQUMsWUFDWiw0QkFBWSxLQUFLLDhCQUE4QixPQUFPO0FBQUEsTUFDeEQsTUFBTSw2QkFBYztBQUFBLE1BQ3BCLFlBQVk7QUFDVixlQUFPLFNBQVMsTUFDZCw2QkFBYyxlQUFlLEdBQzdCLDZCQUFjLFdBQVcsQ0FDM0I7QUFBQSxNQUNGO0FBQUEsTUFDQSxXQUFXLE1BQWM7QUFDdkIsZUFBTyxrQ0FBTztBQUFBLFVBQ1osU0FBUztBQUFBLFVBQ1QsWUFBWSw2QkFBYyxXQUFXO0FBQUEsVUFDckM7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDLEdBQ0QsU0FBUyxlQUFlLEtBQUssQ0FDL0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
