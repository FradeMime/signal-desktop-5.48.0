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
var PreventDisplaySleepService_exports = {};
__export(PreventDisplaySleepService_exports, {
  PreventDisplaySleepService: () => PreventDisplaySleepService
});
module.exports = __toCommonJS(PreventDisplaySleepService_exports);
var log = __toESM(require("../ts/logging/log"));
class PreventDisplaySleepService {
  constructor(powerSaveBlocker) {
    this.powerSaveBlocker = powerSaveBlocker;
  }
  setEnabled(isEnabled) {
    log.info(`Prevent display sleep service: ${isEnabled ? "preventing" : "allowing"} display sleep`);
    if (isEnabled) {
      this.enable();
    } else {
      this.disable();
    }
  }
  enable() {
    if (this.blockerId !== void 0) {
      return;
    }
    this.blockerId = this.powerSaveBlocker.start("prevent-display-sleep");
  }
  disable() {
    if (this.blockerId === void 0) {
      return;
    }
    this.powerSaveBlocker.stop(this.blockerId);
    delete this.blockerId;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PreventDisplaySleepService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJldmVudERpc3BsYXlTbGVlcFNlcnZpY2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBQb3dlclNhdmVCbG9ja2VyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL3RzL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IGNsYXNzIFByZXZlbnREaXNwbGF5U2xlZXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBibG9ja2VySWQ6IHVuZGVmaW5lZCB8IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvd2VyU2F2ZUJsb2NrZXI6IFBvd2VyU2F2ZUJsb2NrZXIpIHt9XG5cbiAgc2V0RW5hYmxlZChpc0VuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBQcmV2ZW50IGRpc3BsYXkgc2xlZXAgc2VydmljZTogJHtcbiAgICAgICAgaXNFbmFibGVkID8gJ3ByZXZlbnRpbmcnIDogJ2FsbG93aW5nJ1xuICAgICAgfSBkaXNwbGF5IHNsZWVwYFxuICAgICk7XG5cbiAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLmVuYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ibG9ja2VySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmJsb2NrZXJJZCA9IHRoaXMucG93ZXJTYXZlQmxvY2tlci5zdGFydCgncHJldmVudC1kaXNwbGF5LXNsZWVwJyk7XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmxvY2tlcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wb3dlclNhdmVCbG9ja2VyLnN0b3AodGhpcy5ibG9ja2VySWQpO1xuICAgIGRlbGV0ZSB0aGlzLmJsb2NrZXJJZDtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLFVBQXFCO0FBRWQsTUFBTSwyQkFBMkI7QUFBQSxFQUd0QyxZQUFvQixrQkFBb0M7QUFBcEM7QUFBQSxFQUFxQztBQUFBLEVBRXpELFdBQVcsV0FBMEI7QUFDbkMsUUFBSSxLQUNGLGtDQUNFLFlBQVksZUFBZSwwQkFFL0I7QUFFQSxRQUFJLFdBQVc7QUFDYixXQUFLLE9BQU87QUFBQSxJQUNkLE9BQU87QUFDTCxXQUFLLFFBQVE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUFBLEVBRVEsU0FBZTtBQUNyQixRQUFJLEtBQUssY0FBYyxRQUFXO0FBQ2hDO0FBQUEsSUFDRjtBQUNBLFNBQUssWUFBWSxLQUFLLGlCQUFpQixNQUFNLHVCQUF1QjtBQUFBLEVBQ3RFO0FBQUEsRUFFUSxVQUFnQjtBQUN0QixRQUFJLEtBQUssY0FBYyxRQUFXO0FBQ2hDO0FBQUEsSUFDRjtBQUNBLFNBQUssaUJBQWlCLEtBQUssS0FBSyxTQUFTO0FBQ3pDLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFDRjtBQWpDTyIsCiAgIm5hbWVzIjogW10KfQo=
