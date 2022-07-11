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
var waitForOnline_exports = {};
__export(waitForOnline_exports, {
  waitForOnline: () => waitForOnline
});
module.exports = __toCommonJS(waitForOnline_exports);
var import_clearTimeoutIfNecessary = require("./clearTimeoutIfNecessary");
function waitForOnline(navigator, onlineEventTarget, options = {}) {
  const { timeout } = options;
  return new Promise((resolve, reject) => {
    if (navigator.onLine) {
      resolve();
      return;
    }
    let timeoutId;
    const listener = /* @__PURE__ */ __name(() => {
      cleanup();
      resolve();
    }, "listener");
    const cleanup = /* @__PURE__ */ __name(() => {
      onlineEventTarget.removeEventListener("online", listener);
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeoutId);
    }, "cleanup");
    onlineEventTarget.addEventListener("online", listener);
    if (timeout !== void 0) {
      timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error("waitForOnline: did not come online in time"));
      }, timeout);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  waitForOnline
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2FpdEZvck9ubGluZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yT25saW5lKFxuICBuYXZpZ2F0b3I6IFJlYWRvbmx5PHsgb25MaW5lOiBib29sZWFuIH0+LFxuICBvbmxpbmVFdmVudFRhcmdldDogRXZlbnRUYXJnZXQsXG4gIG9wdGlvbnM6IFJlYWRvbmx5PHsgdGltZW91dD86IG51bWJlciB9PiA9IHt9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyB0aW1lb3V0IH0gPSBvcHRpb25zO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKG5hdmlnYXRvci5vbkxpbmUpIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdGltZW91dElkOiB1bmRlZmluZWQgfCBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcblxuICAgIGNvbnN0IGxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgb25saW5lRXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25saW5lJywgbGlzdGVuZXIpO1xuICAgICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dElkKTtcbiAgICB9O1xuXG4gICAgb25saW5lRXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignb25saW5lJywgbGlzdGVuZXIpO1xuXG4gICAgaWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignd2FpdEZvck9ubGluZTogZGlkIG5vdCBjb21lIG9ubGluZSBpbiB0aW1lJykpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgfVxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxxQ0FBd0M7QUFFakMsdUJBQ0wsV0FDQSxtQkFDQSxVQUEwQyxDQUFDLEdBQzVCO0FBQ2YsUUFBTSxFQUFFLFlBQVk7QUFFcEIsU0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDdEMsUUFBSSxVQUFVLFFBQVE7QUFDcEIsY0FBUTtBQUNSO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFFSixVQUFNLFdBQVcsNkJBQU07QUFDckIsY0FBUTtBQUNSLGNBQVE7QUFBQSxJQUNWLEdBSGlCO0FBS2pCLFVBQU0sVUFBVSw2QkFBTTtBQUNwQix3QkFBa0Isb0JBQW9CLFVBQVUsUUFBUTtBQUN4RCxrRUFBd0IsU0FBUztBQUFBLElBQ25DLEdBSGdCO0FBS2hCLHNCQUFrQixpQkFBaUIsVUFBVSxRQUFRO0FBRXJELFFBQUksWUFBWSxRQUFXO0FBQ3pCLGtCQUFZLFdBQVcsTUFBTTtBQUMzQixnQkFBUTtBQUNSLGVBQU8sSUFBSSxNQUFNLDRDQUE0QyxDQUFDO0FBQUEsTUFDaEUsR0FBRyxPQUFPO0FBQUEsSUFDWjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBbENnQiIsCiAgIm5hbWVzIjogW10KfQo=
