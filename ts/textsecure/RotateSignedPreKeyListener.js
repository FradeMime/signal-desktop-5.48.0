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
var RotateSignedPreKeyListener_exports = {};
__export(RotateSignedPreKeyListener_exports, {
  RotateSignedPreKeyListener: () => RotateSignedPreKeyListener
});
module.exports = __toCommonJS(RotateSignedPreKeyListener_exports);
var durations = __toESM(require("../util/durations"));
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_UUID = require("../types/UUID");
var log = __toESM(require("../logging/log"));
const ROTATION_INTERVAL = 2 * durations.DAY;
let initComplete = false;
class RotateSignedPreKeyListener {
  scheduleRotationForNow() {
    const now = Date.now();
    window.textsecure.storage.put("nextSignedKeyRotationTime", now);
  }
  setTimeoutForNextRun() {
    const now = Date.now();
    const time = window.textsecure.storage.get("nextSignedKeyRotationTime", now);
    log.info("Next signed key rotation scheduled for", new Date(time).toISOString());
    let waitTime = time - now;
    if (waitTime < 0) {
      waitTime = 0;
    }
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.timeout);
    this.timeout = setTimeout(() => this.runWhenOnline(), waitTime);
  }
  scheduleNextRotation() {
    const now = Date.now();
    const nextTime = now + ROTATION_INTERVAL;
    window.textsecure.storage.put("nextSignedKeyRotationTime", nextTime);
  }
  async run() {
    log.info("Rotating signed prekey...");
    try {
      const accountManager = window.getAccountManager();
      await Promise.all([
        accountManager.rotateSignedPreKey(import_UUID.UUIDKind.ACI),
        accountManager.rotateSignedPreKey(import_UUID.UUIDKind.PNI)
      ]);
      this.scheduleNextRotation();
      this.setTimeoutForNextRun();
    } catch (error) {
      log.error("rotateSignedPrekey() failed. Trying again in five minutes");
      setTimeout(() => this.setTimeoutForNextRun(), 5 * durations.MINUTE);
    }
  }
  runWhenOnline() {
    if (window.navigator.onLine) {
      this.run();
    } else {
      log.info("We are offline; keys will be rotated when we are next online");
      const listener = /* @__PURE__ */ __name(() => {
        window.removeEventListener("online", listener);
        this.setTimeoutForNextRun();
      }, "listener");
      window.addEventListener("online", listener);
    }
  }
  static init(events, newVersion) {
    if (initComplete) {
      window.SignalContext.log.info("Rotate signed prekey listener: Already initialized");
      return;
    }
    initComplete = true;
    const listener = new RotateSignedPreKeyListener();
    if (newVersion) {
      listener.scheduleRotationForNow();
    }
    listener.setTimeoutForNextRun();
    events.on("timetravel", () => {
      if (window.Signal.Util.Registration.isDone()) {
        listener.setTimeoutForNextRun();
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RotateSignedPreKeyListener
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUm90YXRlU2lnbmVkUHJlS2V5TGlzdGVuZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuLi91dGlsL2NsZWFyVGltZW91dElmTmVjZXNzYXJ5JztcbmltcG9ydCB7IFVVSURLaW5kIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5jb25zdCBST1RBVElPTl9JTlRFUlZBTCA9IDIgKiBkdXJhdGlvbnMuREFZO1xuXG5leHBvcnQgdHlwZSBNaW5pbWFsRXZlbnRzVHlwZSA9IHtcbiAgb24oZXZlbnQ6ICd0aW1ldHJhdmVsJywgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkO1xufTtcblxubGV0IGluaXRDb21wbGV0ZSA9IGZhbHNlO1xuXG5leHBvcnQgY2xhc3MgUm90YXRlU2lnbmVkUHJlS2V5TGlzdGVuZXIge1xuICBwdWJsaWMgdGltZW91dDogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQ7XG5cbiAgcHJvdGVjdGVkIHNjaGVkdWxlUm90YXRpb25Gb3JOb3coKTogdm9pZCB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnB1dCgnbmV4dFNpZ25lZEtleVJvdGF0aW9uVGltZScsIG5vdyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VGltZW91dEZvck5leHRSdW4oKTogdm9pZCB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB0aW1lID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5nZXQoXG4gICAgICAnbmV4dFNpZ25lZEtleVJvdGF0aW9uVGltZScsXG4gICAgICBub3dcbiAgICApO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICAnTmV4dCBzaWduZWQga2V5IHJvdGF0aW9uIHNjaGVkdWxlZCBmb3InLFxuICAgICAgbmV3IERhdGUodGltZSkudG9JU09TdHJpbmcoKVxuICAgICk7XG5cbiAgICBsZXQgd2FpdFRpbWUgPSB0aW1lIC0gbm93O1xuICAgIGlmICh3YWl0VGltZSA8IDApIHtcbiAgICAgIHdhaXRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ydW5XaGVuT25saW5lKCksIHdhaXRUaW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVOZXh0Um90YXRpb24oKTogdm9pZCB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBuZXh0VGltZSA9IG5vdyArIFJPVEFUSU9OX0lOVEVSVkFMO1xuICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHV0KCduZXh0U2lnbmVkS2V5Um90YXRpb25UaW1lJywgbmV4dFRpbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oJ1JvdGF0aW5nIHNpZ25lZCBwcmVrZXkuLi4nKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWNjb3VudE1hbmFnZXIgPSB3aW5kb3cuZ2V0QWNjb3VudE1hbmFnZXIoKTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgYWNjb3VudE1hbmFnZXIucm90YXRlU2lnbmVkUHJlS2V5KFVVSURLaW5kLkFDSSksXG4gICAgICAgIGFjY291bnRNYW5hZ2VyLnJvdGF0ZVNpZ25lZFByZUtleShVVUlES2luZC5QTkkpLFxuICAgICAgXSk7XG4gICAgICB0aGlzLnNjaGVkdWxlTmV4dFJvdGF0aW9uKCk7XG4gICAgICB0aGlzLnNldFRpbWVvdXRGb3JOZXh0UnVuKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcigncm90YXRlU2lnbmVkUHJla2V5KCkgZmFpbGVkLiBUcnlpbmcgYWdhaW4gaW4gZml2ZSBtaW51dGVzJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0VGltZW91dEZvck5leHRSdW4oKSwgNSAqIGR1cmF0aW9ucy5NSU5VVEUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVuV2hlbk9ubGluZSgpIHtcbiAgICBpZiAod2luZG93Lm5hdmlnYXRvci5vbkxpbmUpIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKCdXZSBhcmUgb2ZmbGluZTsga2V5cyB3aWxsIGJlIHJvdGF0ZWQgd2hlbiB3ZSBhcmUgbmV4dCBvbmxpbmUnKTtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25saW5lJywgbGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnNldFRpbWVvdXRGb3JOZXh0UnVuKCk7XG4gICAgICB9O1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXQoZXZlbnRzOiBNaW5pbWFsRXZlbnRzVHlwZSwgbmV3VmVyc2lvbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChpbml0Q29tcGxldGUpIHtcbiAgICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZy5pbmZvKFxuICAgICAgICAnUm90YXRlIHNpZ25lZCBwcmVrZXkgbGlzdGVuZXI6IEFscmVhZHkgaW5pdGlhbGl6ZWQnXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbml0Q29tcGxldGUgPSB0cnVlO1xuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBuZXcgUm90YXRlU2lnbmVkUHJlS2V5TGlzdGVuZXIoKTtcblxuICAgIGlmIChuZXdWZXJzaW9uKSB7XG4gICAgICBsaXN0ZW5lci5zY2hlZHVsZVJvdGF0aW9uRm9yTm93KCk7XG4gICAgfVxuICAgIGxpc3RlbmVyLnNldFRpbWVvdXRGb3JOZXh0UnVuKCk7XG5cbiAgICBldmVudHMub24oJ3RpbWV0cmF2ZWwnLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LlNpZ25hbC5VdGlsLlJlZ2lzdHJhdGlvbi5pc0RvbmUoKSkge1xuICAgICAgICBsaXN0ZW5lci5zZXRUaW1lb3V0Rm9yTmV4dFJ1bigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQTJCO0FBQzNCLHFDQUF3QztBQUN4QyxrQkFBeUI7QUFDekIsVUFBcUI7QUFFckIsTUFBTSxvQkFBb0IsSUFBSSxVQUFVO0FBTXhDLElBQUksZUFBZTtBQUVaLE1BQU0sMkJBQTJCO0FBQUEsRUFHNUIseUJBQStCO0FBQ3ZDLFVBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsV0FBTyxXQUFXLFFBQVEsSUFBSSw2QkFBNkIsR0FBRztBQUFBLEVBQ2hFO0FBQUEsRUFFVSx1QkFBNkI7QUFDckMsVUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixVQUFNLE9BQU8sT0FBTyxXQUFXLFFBQVEsSUFDckMsNkJBQ0EsR0FDRjtBQUVBLFFBQUksS0FDRiwwQ0FDQSxJQUFJLEtBQUssSUFBSSxFQUFFLFlBQVksQ0FDN0I7QUFFQSxRQUFJLFdBQVcsT0FBTztBQUN0QixRQUFJLFdBQVcsR0FBRztBQUNoQixpQkFBVztBQUFBLElBQ2I7QUFFQSxnRUFBd0IsS0FBSyxPQUFPO0FBQ3BDLFNBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxjQUFjLEdBQUcsUUFBUTtBQUFBLEVBQ2hFO0FBQUEsRUFFUSx1QkFBNkI7QUFDbkMsVUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixVQUFNLFdBQVcsTUFBTTtBQUN2QixXQUFPLFdBQVcsUUFBUSxJQUFJLDZCQUE2QixRQUFRO0FBQUEsRUFDckU7QUFBQSxRQUVjLE1BQXFCO0FBQ2pDLFFBQUksS0FBSywyQkFBMkI7QUFDcEMsUUFBSTtBQUNGLFlBQU0saUJBQWlCLE9BQU8sa0JBQWtCO0FBQ2hELFlBQU0sUUFBUSxJQUFJO0FBQUEsUUFDaEIsZUFBZSxtQkFBbUIscUJBQVMsR0FBRztBQUFBLFFBQzlDLGVBQWUsbUJBQW1CLHFCQUFTLEdBQUc7QUFBQSxNQUNoRCxDQUFDO0FBQ0QsV0FBSyxxQkFBcUI7QUFDMUIsV0FBSyxxQkFBcUI7QUFBQSxJQUM1QixTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQU0sMkRBQTJEO0FBQ3JFLGlCQUFXLE1BQU0sS0FBSyxxQkFBcUIsR0FBRyxJQUFJLFVBQVUsTUFBTTtBQUFBLElBQ3BFO0FBQUEsRUFDRjtBQUFBLEVBRVEsZ0JBQWdCO0FBQ3RCLFFBQUksT0FBTyxVQUFVLFFBQVE7QUFDM0IsV0FBSyxJQUFJO0FBQUEsSUFDWCxPQUFPO0FBQ0wsVUFBSSxLQUFLLDhEQUE4RDtBQUN2RSxZQUFNLFdBQVcsNkJBQU07QUFDckIsZUFBTyxvQkFBb0IsVUFBVSxRQUFRO0FBQzdDLGFBQUsscUJBQXFCO0FBQUEsTUFDNUIsR0FIaUI7QUFJakIsYUFBTyxpQkFBaUIsVUFBVSxRQUFRO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUEsU0FFYyxLQUFLLFFBQTJCLFlBQTJCO0FBQ3ZFLFFBQUksY0FBYztBQUNoQixhQUFPLGNBQWMsSUFBSSxLQUN2QixvREFDRjtBQUNBO0FBQUEsSUFDRjtBQUNBLG1CQUFlO0FBRWYsVUFBTSxXQUFXLElBQUksMkJBQTJCO0FBRWhELFFBQUksWUFBWTtBQUNkLGVBQVMsdUJBQXVCO0FBQUEsSUFDbEM7QUFDQSxhQUFTLHFCQUFxQjtBQUU5QixXQUFPLEdBQUcsY0FBYyxNQUFNO0FBQzVCLFVBQUksT0FBTyxPQUFPLEtBQUssYUFBYSxPQUFPLEdBQUc7QUFDNUMsaUJBQVMscUJBQXFCO0FBQUEsTUFDaEM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUF0Rk8iLAogICJuYW1lcyI6IFtdCn0K
