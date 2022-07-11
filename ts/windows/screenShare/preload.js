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
var import_CallingScreenSharingController = require("../../components/CallingScreenSharingController");
import_electron.contextBridge.exposeInMainWorld("SignalContext", import_context.SignalContext);
function renderScreenSharingController(presentedSourceName) {
  import_react_dom.default.render(import_react.default.createElement(import_CallingScreenSharingController.CallingScreenSharingController, {
    platform: process.platform,
    executeMenuRole: import_context.SignalContext.executeMenuRole,
    i18n: import_context.SignalContext.i18n,
    onCloseController: () => import_context.SignalContext.executeMenuRole("close"),
    onStopSharing: () => import_electron.ipcRenderer.send("stop-screen-share"),
    presentedSourceName
  }), document.getElementById("app"));
}
import_electron.ipcRenderer.once("render-screen-sharing-controller", (_, name) => {
  renderScreenSharingController(name);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaGFzIHRvIGJlIHRoZSBmaXJzdCBpbXBvcnQgYmVjYXVzZSBvZiBtb25rZXktcGF0Y2hpbmdcbmltcG9ydCAnLi4vc2hpbXMnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgU2lnbmFsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgQ2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DYWxsaW5nU2NyZWVuU2hhcmluZ0NvbnRyb2xsZXInO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdTaWduYWxDb250ZXh0JywgU2lnbmFsQ29udGV4dCk7XG5cbmZ1bmN0aW9uIHJlbmRlclNjcmVlblNoYXJpbmdDb250cm9sbGVyKHByZXNlbnRlZFNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChDYWxsaW5nU2NyZWVuU2hhcmluZ0NvbnRyb2xsZXIsIHtcbiAgICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICAgICAgZXhlY3V0ZU1lbnVSb2xlOiBTaWduYWxDb250ZXh0LmV4ZWN1dGVNZW51Um9sZSxcbiAgICAgIGkxOG46IFNpZ25hbENvbnRleHQuaTE4bixcbiAgICAgIG9uQ2xvc2VDb250cm9sbGVyOiAoKSA9PiBTaWduYWxDb250ZXh0LmV4ZWN1dGVNZW51Um9sZSgnY2xvc2UnKSxcbiAgICAgIG9uU3RvcFNoYXJpbmc6ICgpID0+IGlwY1JlbmRlcmVyLnNlbmQoJ3N0b3Atc2NyZWVuLXNoYXJlJyksXG4gICAgICBwcmVzZW50ZWRTb3VyY2VOYW1lLFxuICAgIH0pLFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICApO1xufVxuXG5pcGNSZW5kZXJlci5vbmNlKCdyZW5kZXItc2NyZWVuLXNoYXJpbmctY29udHJvbGxlcicsIChfLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgcmVuZGVyU2NyZWVuU2hhcmluZ0NvbnRyb2xsZXIobmFtZSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxtQkFBTztBQUVQLG1CQUFrQjtBQUNsQix1QkFBcUI7QUFDckIsc0JBQTJDO0FBRTNDLHFCQUE4QjtBQUM5Qiw0Q0FBK0M7QUFFL0MsOEJBQWMsa0JBQWtCLGlCQUFpQiw0QkFBYTtBQUU5RCx1Q0FBdUMscUJBQW1DO0FBQ3hFLDJCQUFTLE9BQ1AscUJBQU0sY0FBYyxzRUFBZ0M7QUFBQSxJQUNsRCxVQUFVLFFBQVE7QUFBQSxJQUNsQixpQkFBaUIsNkJBQWM7QUFBQSxJQUMvQixNQUFNLDZCQUFjO0FBQUEsSUFDcEIsbUJBQW1CLE1BQU0sNkJBQWMsZ0JBQWdCLE9BQU87QUFBQSxJQUM5RCxlQUFlLE1BQU0sNEJBQVksS0FBSyxtQkFBbUI7QUFBQSxJQUN6RDtBQUFBLEVBQ0YsQ0FBQyxHQUNELFNBQVMsZUFBZSxLQUFLLENBQy9CO0FBQ0Y7QUFaUyxBQWNULDRCQUFZLEtBQUssb0NBQW9DLENBQUMsR0FBRyxTQUFpQjtBQUN4RSxnQ0FBOEIsSUFBSTtBQUNwQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
