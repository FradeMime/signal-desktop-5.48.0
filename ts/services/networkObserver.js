var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var networkObserver_exports = {};
__export(networkObserver_exports, {
  initializeNetworkObserver: () => initializeNetworkObserver
});
module.exports = __toCommonJS(networkObserver_exports);
var import_socketStatus = require("../shims/socketStatus");
var log = __toESM(require("../logging/log"));
var import_durations = require("../util/durations");
var import_SocketStatus = require("../types/SocketStatus");
function initializeNetworkObserver(networkActions) {
  log.info("Initializing network observer");
  const refresh = /* @__PURE__ */ __name(() => {
    const socketStatus = (0, import_socketStatus.getSocketStatus)();
    if (socketStatus === import_SocketStatus.SocketStatus.CLOSED) {
      window.Signal.Data.goBackToMainProcess();
    }
    networkActions.checkNetworkStatus({
      isOnline: navigator.onLine,
      socketStatus
    });
  }, "refresh");
  window.Whisper.events.on("socketStatusChange", refresh);
  window.addEventListener("online", refresh);
  window.addEventListener("offline", refresh);
  window.setTimeout(() => {
    networkActions.closeConnectingGracePeriod();
  }, 5 * import_durations.SECOND);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initializeNetworkObserver
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0d29ya09ic2VydmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHtcbiAgQ2hlY2tOZXR3b3JrU3RhdHVzUGF5bG9hZFR5cGUsXG4gIE5ldHdvcmtBY3Rpb25UeXBlLFxufSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9uZXR3b3JrJztcbmltcG9ydCB7IGdldFNvY2tldFN0YXR1cyB9IGZyb20gJy4uL3NoaW1zL3NvY2tldFN0YXR1cyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgU0VDT05EIH0gZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgU29ja2V0U3RhdHVzIH0gZnJvbSAnLi4vdHlwZXMvU29ja2V0U3RhdHVzJztcblxudHlwZSBOZXR3b3JrQWN0aW9ucyA9IHtcbiAgY2hlY2tOZXR3b3JrU3RhdHVzOiAoeDogQ2hlY2tOZXR3b3JrU3RhdHVzUGF5bG9hZFR5cGUpID0+IE5ldHdvcmtBY3Rpb25UeXBlO1xuICBjbG9zZUNvbm5lY3RpbmdHcmFjZVBlcmlvZDogKCkgPT4gTmV0d29ya0FjdGlvblR5cGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZU5ldHdvcmtPYnNlcnZlcihcbiAgbmV0d29ya0FjdGlvbnM6IE5ldHdvcmtBY3Rpb25zXG4pOiB2b2lkIHtcbiAgbG9nLmluZm8oJ0luaXRpYWxpemluZyBuZXR3b3JrIG9ic2VydmVyJyk7XG5cbiAgY29uc3QgcmVmcmVzaCA9ICgpID0+IHtcbiAgICBjb25zdCBzb2NrZXRTdGF0dXMgPSBnZXRTb2NrZXRTdGF0dXMoKTtcblxuICAgIGlmIChzb2NrZXRTdGF0dXMgPT09IFNvY2tldFN0YXR1cy5DTE9TRUQpIHtcbiAgICAgIC8vIElmIHdlIGNvdWxkbid0IGNvbm5lY3QgZHVyaW5nIHN0YXJ0dXAgLSB3ZSBzaG91bGQgc3RpbGwgc3dpdGNoIFNRTCB0b1xuICAgICAgLy8gdGhlIG1haW4gcHJvY2VzcyB0byBhdm9pZCBzdGFsbGluZyBVSS5cbiAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5nb0JhY2tUb01haW5Qcm9jZXNzKCk7XG4gICAgfVxuXG4gICAgbmV0d29ya0FjdGlvbnMuY2hlY2tOZXR3b3JrU3RhdHVzKHtcbiAgICAgIGlzT25saW5lOiBuYXZpZ2F0b3Iub25MaW5lLFxuICAgICAgc29ja2V0U3RhdHVzLFxuICAgIH0pO1xuICB9O1xuXG4gIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbignc29ja2V0U3RhdHVzQ2hhbmdlJywgcmVmcmVzaCk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIHJlZnJlc2gpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsIHJlZnJlc2gpO1xuICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbmV0d29ya0FjdGlvbnMuY2xvc2VDb25uZWN0aW5nR3JhY2VQZXJpb2QoKTtcbiAgfSwgNSAqIFNFQ09ORCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0EsMEJBQWdDO0FBQ2hDLFVBQXFCO0FBQ3JCLHVCQUF1QjtBQUN2QiwwQkFBNkI7QUFPdEIsbUNBQ0wsZ0JBQ007QUFDTixNQUFJLEtBQUssK0JBQStCO0FBRXhDLFFBQU0sVUFBVSw2QkFBTTtBQUNwQixVQUFNLGVBQWUseUNBQWdCO0FBRXJDLFFBQUksaUJBQWlCLGlDQUFhLFFBQVE7QUFHeEMsYUFBTyxPQUFPLEtBQUssb0JBQW9CO0FBQUEsSUFDekM7QUFFQSxtQkFBZSxtQkFBbUI7QUFBQSxNQUNoQyxVQUFVLFVBQVU7QUFBQSxNQUNwQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FiZ0I7QUFlaEIsU0FBTyxRQUFRLE9BQU8sR0FBRyxzQkFBc0IsT0FBTztBQUV0RCxTQUFPLGlCQUFpQixVQUFVLE9BQU87QUFDekMsU0FBTyxpQkFBaUIsV0FBVyxPQUFPO0FBQzFDLFNBQU8sV0FBVyxNQUFNO0FBQ3RCLG1CQUFlLDJCQUEyQjtBQUFBLEVBQzVDLEdBQUcsSUFBSSx1QkFBTTtBQUNmO0FBM0JnQiIsCiAgIm5hbWVzIjogW10KfQo=
