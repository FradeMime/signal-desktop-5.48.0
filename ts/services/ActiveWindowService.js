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
var ActiveWindowService_exports = {};
__export(ActiveWindowService_exports, {
  ActiveWindowService: () => ActiveWindowService
});
module.exports = __toCommonJS(ActiveWindowService_exports);
var import_lodash = require("lodash");
const ACTIVE_TIMEOUT = 15 * 1e3;
const LISTENER_THROTTLE_TIME = 5 * 1e3;
const ACTIVE_EVENTS = [
  "click",
  "keydown",
  "mousedown",
  "mousemove",
  "touchstart",
  "wheel"
];
class ActiveWindowService {
  constructor() {
    this.isInitialized = false;
    this.isFocused = false;
    this.activeCallbacks = [];
    this.lastActiveEventAt = -Infinity;
    this.callActiveCallbacks = (0, import_lodash.throttle)(() => {
      this.activeCallbacks.forEach((callback) => callback());
    }, LISTENER_THROTTLE_TIME);
  }
  initialize(document, ipc) {
    if (this.isInitialized) {
      throw new Error("Active window service should not be initialized multiple times");
    }
    this.isInitialized = true;
    this.lastActiveEventAt = Date.now();
    const onActiveEvent = this.onActiveEvent.bind(this);
    ACTIVE_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, onActiveEvent, true);
    });
    ipc.on("set-window-focus", (_event, isFocused) => {
      this.setWindowFocus(Boolean(isFocused));
    });
  }
  isActive() {
    return this.isFocused && Date.now() < this.lastActiveEventAt + ACTIVE_TIMEOUT;
  }
  registerForActive(callback) {
    this.activeCallbacks.push(callback);
  }
  unregisterForActive(callback) {
    this.activeCallbacks = this.activeCallbacks.filter((item) => item !== callback);
  }
  onActiveEvent() {
    this.updateState(() => {
      this.lastActiveEventAt = Date.now();
    });
  }
  setWindowFocus(isFocused) {
    this.updateState(() => {
      this.isFocused = isFocused;
    });
  }
  updateState(fn) {
    const wasActiveBefore = this.isActive();
    fn();
    const isActiveNow = this.isActive();
    if (!wasActiveBefore && isActiveNow) {
      this.callActiveCallbacks();
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActiveWindowService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWN0aXZlV2luZG93U2VydmljZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8vIElkbGUgdGltZXIgLSB5b3UncmUgYWN0aXZlIGZvciBBQ1RJVkVfVElNRU9VVCBhZnRlciBvbmUgb2YgdGhlc2UgZXZlbnRzXG5jb25zdCBBQ1RJVkVfVElNRU9VVCA9IDE1ICogMTAwMDtcbmNvbnN0IExJU1RFTkVSX1RIUk9UVExFX1RJTUUgPSA1ICogMTAwMDtcbmNvbnN0IEFDVElWRV9FVkVOVFMgPSBbXG4gICdjbGljaycsXG4gICdrZXlkb3duJyxcbiAgJ21vdXNlZG93bicsXG4gICdtb3VzZW1vdmUnLFxuICAvLyAnc2Nyb2xsJywgLy8gdGhpcyBpcyB0cmlnZ2VyZWQgYnkgVGltZWxpbmUgcmUtcmVuZGVycywgY2FuJ3QgdXNlXG4gICd0b3VjaHN0YXJ0JyxcbiAgJ3doZWVsJyxcbl07XG5cbmV4cG9ydCBjbGFzcyBBY3RpdmVXaW5kb3dTZXJ2aWNlIHtcbiAgLy8gVGhpcyBzdGFydGluZyB2YWx1ZSBtaWdodCBiZSB3cm9uZyBidXQgd2Ugc2hvdWxkIGdldCBhbiB1cGRhdGUgZnJvbSB0aGUgbWFpbiBwcm9jZXNzXG4gIC8vICBzb29uLiBXZSdkIHJhdGhlciByZXBvcnQgdGhhdCB0aGUgd2luZG93IGlzIGluYWN0aXZlIHNvIHdlIGNhbiBzaG93IG5vdGlmaWNhdGlvbnMuXG4gIHByaXZhdGUgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgaXNGb2N1c2VkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBhY3RpdmVDYWxsYmFja3M6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG5cbiAgcHJpdmF0ZSBsYXN0QWN0aXZlRXZlbnRBdCA9IC1JbmZpbml0eTtcblxuICBwcml2YXRlIGNhbGxBY3RpdmVDYWxsYmFja3M6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYWxsQWN0aXZlQ2FsbGJhY2tzID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmVDYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKTtcbiAgICB9LCBMSVNURU5FUl9USFJPVFRMRV9USU1FKTtcbiAgfVxuXG4gIC8vIFRoZXNlIHR5cGVzIGFyZW4ndCBwZXJmZWN0bHkgYWNjdXJhdGUsIGJ1dCB0aGV5IG1ha2UgdGhpcyBjbGFzcyBlYXNpZXIgdG8gdGVzdC5cbiAgaW5pdGlhbGl6ZShkb2N1bWVudDogRXZlbnRUYXJnZXQsIGlwYzogTm9kZUpTLkV2ZW50RW1pdHRlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0FjdGl2ZSB3aW5kb3cgc2VydmljZSBzaG91bGQgbm90IGJlIGluaXRpYWxpemVkIG11bHRpcGxlIHRpbWVzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIHRoaXMubGFzdEFjdGl2ZUV2ZW50QXQgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgb25BY3RpdmVFdmVudCA9IHRoaXMub25BY3RpdmVFdmVudC5iaW5kKHRoaXMpO1xuICAgIEFDVElWRV9FVkVOVFMuZm9yRWFjaCgoZXZlbnROYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBvbkFjdGl2ZUV2ZW50LCB0cnVlKTtcbiAgICB9KTtcblxuICAgIC8vIFdlIGRvbid0IGtub3cgZm9yIHN1cmUgdGhhdCB3ZSdsbCBnZXQgdGhlIHJpZ2h0IGRhdGEgb3ZlciBJUEMgc28gd2UgdXNlIGB1bmtub3duYC5cbiAgICBpcGMub24oJ3NldC13aW5kb3ctZm9jdXMnLCAoX2V2ZW50OiB1bmtub3duLCBpc0ZvY3VzZWQ6IHVua25vd24pID0+IHtcbiAgICAgIHRoaXMuc2V0V2luZG93Rm9jdXMoQm9vbGVhbihpc0ZvY3VzZWQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlzRm9jdXNlZCAmJiBEYXRlLm5vdygpIDwgdGhpcy5sYXN0QWN0aXZlRXZlbnRBdCArIEFDVElWRV9USU1FT1VUXG4gICAgKTtcbiAgfVxuXG4gIHJlZ2lzdGVyRm9yQWN0aXZlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICB1bnJlZ2lzdGVyRm9yQWN0aXZlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYWxsYmFja3MgPSB0aGlzLmFjdGl2ZUNhbGxiYWNrcy5maWx0ZXIoXG4gICAgICBpdGVtID0+IGl0ZW0gIT09IGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25BY3RpdmVFdmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKCgpID0+IHtcbiAgICAgIHRoaXMubGFzdEFjdGl2ZUV2ZW50QXQgPSBEYXRlLm5vdygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXaW5kb3dGb2N1cyhpc0ZvY3VzZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGF0ZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGNvbnN0IHdhc0FjdGl2ZUJlZm9yZSA9IHRoaXMuaXNBY3RpdmUoKTtcbiAgICBmbigpO1xuICAgIGNvbnN0IGlzQWN0aXZlTm93ID0gdGhpcy5pc0FjdGl2ZSgpO1xuXG4gICAgaWYgKCF3YXNBY3RpdmVCZWZvcmUgJiYgaXNBY3RpdmVOb3cpIHtcbiAgICAgIHRoaXMuY2FsbEFjdGl2ZUNhbGxiYWNrcygpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUd6QixNQUFNLGlCQUFpQixLQUFLO0FBQzVCLE1BQU0seUJBQXlCLElBQUk7QUFDbkMsTUFBTSxnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQ0Y7QUFFTyxNQUFNLG9CQUFvQjtBQUFBLEVBYS9CLGNBQWM7QUFWTix5QkFBZ0I7QUFFaEIscUJBQVk7QUFFWiwyQkFBcUMsQ0FBQztBQUV0Qyw2QkFBb0I7QUFLMUIsU0FBSyxzQkFBc0IsNEJBQVMsTUFBTTtBQUN4QyxXQUFLLGdCQUFnQixRQUFRLGNBQVksU0FBUyxDQUFDO0FBQUEsSUFDckQsR0FBRyxzQkFBc0I7QUFBQSxFQUMzQjtBQUFBLEVBR0EsV0FBVyxVQUF1QixLQUFnQztBQUNoRSxRQUFJLEtBQUssZUFBZTtBQUN0QixZQUFNLElBQUksTUFDUixnRUFDRjtBQUFBLElBQ0Y7QUFDQSxTQUFLLGdCQUFnQjtBQUVyQixTQUFLLG9CQUFvQixLQUFLLElBQUk7QUFFbEMsVUFBTSxnQkFBZ0IsS0FBSyxjQUFjLEtBQUssSUFBSTtBQUNsRCxrQkFBYyxRQUFRLENBQUMsY0FBc0I7QUFDM0MsZUFBUyxpQkFBaUIsV0FBVyxlQUFlLElBQUk7QUFBQSxJQUMxRCxDQUFDO0FBR0QsUUFBSSxHQUFHLG9CQUFvQixDQUFDLFFBQWlCLGNBQXVCO0FBQ2xFLFdBQUssZUFBZSxRQUFRLFNBQVMsQ0FBQztBQUFBLElBQ3hDLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxXQUFvQjtBQUNsQixXQUNFLEtBQUssYUFBYSxLQUFLLElBQUksSUFBSSxLQUFLLG9CQUFvQjtBQUFBLEVBRTVEO0FBQUEsRUFFQSxrQkFBa0IsVUFBNEI7QUFDNUMsU0FBSyxnQkFBZ0IsS0FBSyxRQUFRO0FBQUEsRUFDcEM7QUFBQSxFQUVBLG9CQUFvQixVQUE0QjtBQUM5QyxTQUFLLGtCQUFrQixLQUFLLGdCQUFnQixPQUMxQyxVQUFRLFNBQVMsUUFDbkI7QUFBQSxFQUNGO0FBQUEsRUFFUSxnQkFBc0I7QUFDNUIsU0FBSyxZQUFZLE1BQU07QUFDckIsV0FBSyxvQkFBb0IsS0FBSyxJQUFJO0FBQUEsSUFDcEMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVRLGVBQWUsV0FBMEI7QUFDL0MsU0FBSyxZQUFZLE1BQU07QUFDckIsV0FBSyxZQUFZO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVRLFlBQVksSUFBc0I7QUFDeEMsVUFBTSxrQkFBa0IsS0FBSyxTQUFTO0FBQ3RDLE9BQUc7QUFDSCxVQUFNLGNBQWMsS0FBSyxTQUFTO0FBRWxDLFFBQUksQ0FBQyxtQkFBbUIsYUFBYTtBQUNuQyxXQUFLLG9CQUFvQjtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUNGO0FBOUVPIiwKICAibmFtZXMiOiBbXQp9Cg==
