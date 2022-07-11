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
var SyncRequest_exports = {};
__export(SyncRequest_exports, {
  default: () => SyncRequest
});
module.exports = __toCommonJS(SyncRequest_exports);
var import_EventTarget = __toESM(require("./EventTarget"));
var import_MessageReceiver = __toESM(require("./MessageReceiver"));
var import_SendMessage = __toESM(require("./SendMessage"));
var import_assert = require("../util/assert");
var log = __toESM(require("../logging/log"));
var import_singleProtoJobQueue = require("../jobs/singleProtoJobQueue");
var Errors = __toESM(require("../types/errors"));
class SyncRequestInner extends import_EventTarget.default {
  constructor(receiver, timeoutMillis) {
    super();
    this.receiver = receiver;
    this.started = false;
    if (!(receiver instanceof import_MessageReceiver.default)) {
      throw new Error("Tried to construct a SyncRequest without MessageReceiver");
    }
    this.oncontact = this.onContactSyncComplete.bind(this);
    receiver.addEventListener("contactSync", this.oncontact);
    this.ongroup = this.onGroupSyncComplete.bind(this);
    receiver.addEventListener("groupSync", this.ongroup);
    this.timeoutMillis = timeoutMillis || 6e4;
  }
  async start() {
    if (this.started) {
      (0, import_assert.assert)(false, "SyncRequestInner: started more than once. Doing nothing");
      return;
    }
    this.started = true;
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("SyncRequest.start: We are primary device; returning early");
      return;
    }
    log.info("SyncRequest created. Sending config, block, contact, and group requests...");
    try {
      await Promise.all([
        import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestConfigurationSyncMessage()),
        import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestBlockSyncMessage()),
        import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestContactSyncMessage()),
        import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestGroupSyncMessage())
      ]);
    } catch (error) {
      log.error("SyncRequest: Failed to add request jobs", Errors.toLogFormat(error));
    }
    this.timeout = setTimeout(this.onTimeout.bind(this), this.timeoutMillis);
  }
  onContactSyncComplete() {
    this.contactSync = true;
    this.update();
  }
  onGroupSyncComplete() {
    this.groupSync = true;
    this.update();
  }
  update() {
    if (this.contactSync && this.groupSync) {
      this.dispatchEvent(new Event("success"));
      this.cleanup();
    }
  }
  onTimeout() {
    if (this.contactSync || this.groupSync) {
      this.dispatchEvent(new Event("success"));
    } else {
      this.dispatchEvent(new Event("timeout"));
    }
    this.cleanup();
  }
  cleanup() {
    clearTimeout(this.timeout);
    this.receiver.removeEventListener("contactsync", this.oncontact);
    this.receiver.removeEventListener("groupSync", this.ongroup);
    delete this.listeners;
  }
}
class SyncRequest {
  constructor(receiver, timeoutMillis) {
    const inner = new SyncRequestInner(receiver, timeoutMillis);
    this.inner = inner;
    this.addEventListener = inner.addEventListener.bind(inner);
    this.removeEventListener = inner.removeEventListener.bind(inner);
  }
  start() {
    this.inner.start();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3luY1JlcXVlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuXG5pbXBvcnQgdHlwZSB7IEV2ZW50SGFuZGxlciB9IGZyb20gJy4vRXZlbnRUYXJnZXQnO1xuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4vRXZlbnRUYXJnZXQnO1xuaW1wb3J0IE1lc3NhZ2VSZWNlaXZlciBmcm9tICcuL01lc3NhZ2VSZWNlaXZlcic7XG5pbXBvcnQgdHlwZSB7IENvbnRhY3RTeW5jRXZlbnQsIEdyb3VwU3luY0V2ZW50IH0gZnJvbSAnLi9tZXNzYWdlUmVjZWl2ZXJFdmVudHMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgZnJvbSAnLi9TZW5kTWVzc2FnZSc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgc2luZ2xlUHJvdG9Kb2JRdWV1ZSB9IGZyb20gJy4uL2pvYnMvc2luZ2xlUHJvdG9Kb2JRdWV1ZSc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcblxuY2xhc3MgU3luY1JlcXVlc3RJbm5lciBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgcHJpdmF0ZSBzdGFydGVkID0gZmFsc2U7XG5cbiAgY29udGFjdFN5bmM/OiBib29sZWFuO1xuXG4gIGdyb3VwU3luYz86IGJvb2xlYW47XG5cbiAgdGltZW91dDogYW55O1xuXG4gIG9uY29udGFjdDogKGV2ZW50OiBDb250YWN0U3luY0V2ZW50KSA9PiB2b2lkO1xuXG4gIG9uZ3JvdXA6IChldmVudDogR3JvdXBTeW5jRXZlbnQpID0+IHZvaWQ7XG5cbiAgdGltZW91dE1pbGxpczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVjZWl2ZXI6IE1lc3NhZ2VSZWNlaXZlciwgdGltZW91dE1pbGxpcz86IG51bWJlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoIShyZWNlaXZlciBpbnN0YW5jZW9mIE1lc3NhZ2VSZWNlaXZlcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RyaWVkIHRvIGNvbnN0cnVjdCBhIFN5bmNSZXF1ZXN0IHdpdGhvdXQgTWVzc2FnZVJlY2VpdmVyJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uY29udGFjdCA9IHRoaXMub25Db250YWN0U3luY0NvbXBsZXRlLmJpbmQodGhpcyk7XG4gICAgcmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignY29udGFjdFN5bmMnLCB0aGlzLm9uY29udGFjdCk7XG5cbiAgICB0aGlzLm9uZ3JvdXAgPSB0aGlzLm9uR3JvdXBTeW5jQ29tcGxldGUuYmluZCh0aGlzKTtcbiAgICByZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKCdncm91cFN5bmMnLCB0aGlzLm9uZ3JvdXApO1xuXG4gICAgdGhpcy50aW1lb3V0TWlsbGlzID0gdGltZW91dE1pbGxpcyB8fCA2MDAwMDtcbiAgfVxuXG4gIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIGFzc2VydChmYWxzZSwgJ1N5bmNSZXF1ZXN0SW5uZXI6IHN0YXJ0ZWQgbW9yZSB0aGFuIG9uY2UuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcblxuICAgIGlmICh3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5hcmVXZVByaW1hcnlEZXZpY2UoKSkge1xuICAgICAgbG9nLndhcm4oJ1N5bmNSZXF1ZXN0LnN0YXJ0OiBXZSBhcmUgcHJpbWFyeSBkZXZpY2U7IHJldHVybmluZyBlYXJseScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgJ1N5bmNSZXF1ZXN0IGNyZWF0ZWQuIFNlbmRpbmcgY29uZmlnLCBibG9jaywgY29udGFjdCwgYW5kIGdyb3VwIHJlcXVlc3RzLi4uJ1xuICAgICk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoXG4gICAgICAgICAgTWVzc2FnZVNlbmRlci5nZXRSZXF1ZXN0Q29uZmlndXJhdGlvblN5bmNNZXNzYWdlKClcbiAgICAgICAgKSxcbiAgICAgICAgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoTWVzc2FnZVNlbmRlci5nZXRSZXF1ZXN0QmxvY2tTeW5jTWVzc2FnZSgpKSxcbiAgICAgICAgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoTWVzc2FnZVNlbmRlci5nZXRSZXF1ZXN0Q29udGFjdFN5bmNNZXNzYWdlKCkpLFxuICAgICAgICBzaW5nbGVQcm90b0pvYlF1ZXVlLmFkZChNZXNzYWdlU2VuZGVyLmdldFJlcXVlc3RHcm91cFN5bmNNZXNzYWdlKCkpLFxuICAgICAgXSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ1N5bmNSZXF1ZXN0OiBGYWlsZWQgdG8gYWRkIHJlcXVlc3Qgam9icycsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLm9uVGltZW91dC5iaW5kKHRoaXMpLCB0aGlzLnRpbWVvdXRNaWxsaXMpO1xuICB9XG5cbiAgb25Db250YWN0U3luY0NvbXBsZXRlKCkge1xuICAgIHRoaXMuY29udGFjdFN5bmMgPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBvbkdyb3VwU3luY0NvbXBsZXRlKCkge1xuICAgIHRoaXMuZ3JvdXBTeW5jID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhY3RTeW5jICYmIHRoaXMuZ3JvdXBTeW5jKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdWNjZXNzJykpO1xuICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxuICB9XG5cbiAgb25UaW1lb3V0KCkge1xuICAgIGlmICh0aGlzLmNvbnRhY3RTeW5jIHx8IHRoaXMuZ3JvdXBTeW5jKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdWNjZXNzJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCd0aW1lb3V0JykpO1xuICAgIH1cbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgfVxuXG4gIGNsZWFudXAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5yZWNlaXZlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250YWN0c3luYycsIHRoaXMub25jb250YWN0KTtcbiAgICB0aGlzLnJlY2VpdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2dyb3VwU3luYycsIHRoaXMub25ncm91cCk7XG4gICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5bmNSZXF1ZXN0IHtcbiAgcHJpdmF0ZSBpbm5lcjogU3luY1JlcXVlc3RJbm5lcjtcblxuICBhZGRFdmVudExpc3RlbmVyOiAoXG4gICAgbmFtZTogJ3N1Y2Nlc3MnIHwgJ3RpbWVvdXQnLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclxuICApID0+IHZvaWQ7XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogKFxuICAgIG5hbWU6ICdzdWNjZXNzJyB8ICd0aW1lb3V0JyxcbiAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXJcbiAgKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY2VpdmVyOiBNZXNzYWdlUmVjZWl2ZXIsIHRpbWVvdXRNaWxsaXM/OiBudW1iZXIpIHtcbiAgICBjb25zdCBpbm5lciA9IG5ldyBTeW5jUmVxdWVzdElubmVyKHJlY2VpdmVyLCB0aW1lb3V0TWlsbGlzKTtcbiAgICB0aGlzLmlubmVyID0gaW5uZXI7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyID0gaW5uZXIuYWRkRXZlbnRMaXN0ZW5lci5iaW5kKGlubmVyKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBpbm5lci5yZW1vdmVFdmVudExpc3RlbmVyLmJpbmQoaW5uZXIpO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5pbm5lci5zdGFydCgpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0EseUJBQXdCO0FBQ3hCLDZCQUE0QjtBQUU1Qix5QkFBMEI7QUFDMUIsb0JBQXVCO0FBQ3ZCLFVBQXFCO0FBQ3JCLGlDQUFvQztBQUNwQyxhQUF3QjtBQUV4QixNQUFNLHlCQUF5QiwyQkFBWTtBQUFBLEVBZXpDLFlBQW9CLFVBQTJCLGVBQXdCO0FBQ3JFLFVBQU07QUFEWTtBQWRaLG1CQUFVO0FBaUJoQixRQUFJLENBQUUscUJBQW9CLGlDQUFrQjtBQUMxQyxZQUFNLElBQUksTUFDUiwwREFDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLFlBQVksS0FBSyxzQkFBc0IsS0FBSyxJQUFJO0FBQ3JELGFBQVMsaUJBQWlCLGVBQWUsS0FBSyxTQUFTO0FBRXZELFNBQUssVUFBVSxLQUFLLG9CQUFvQixLQUFLLElBQUk7QUFDakQsYUFBUyxpQkFBaUIsYUFBYSxLQUFLLE9BQU87QUFFbkQsU0FBSyxnQkFBZ0IsaUJBQWlCO0FBQUEsRUFDeEM7QUFBQSxRQUVNLFFBQXVCO0FBQzNCLFFBQUksS0FBSyxTQUFTO0FBQ2hCLGdDQUFPLE9BQU8seURBQXlEO0FBQ3ZFO0FBQUEsSUFDRjtBQUNBLFNBQUssVUFBVTtBQUVmLFFBQUksT0FBTyx1QkFBdUIsbUJBQW1CLEdBQUc7QUFDdEQsVUFBSSxLQUFLLDJEQUEyRDtBQUNwRTtBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQ0YsNEVBQ0Y7QUFDQSxRQUFJO0FBQ0YsWUFBTSxRQUFRLElBQUk7QUFBQSxRQUNoQiwrQ0FBb0IsSUFDbEIsMkJBQWMsbUNBQW1DLENBQ25EO0FBQUEsUUFDQSwrQ0FBb0IsSUFBSSwyQkFBYywyQkFBMkIsQ0FBQztBQUFBLFFBQ2xFLCtDQUFvQixJQUFJLDJCQUFjLDZCQUE2QixDQUFDO0FBQUEsUUFDcEUsK0NBQW9CLElBQUksMkJBQWMsMkJBQTJCLENBQUM7QUFBQSxNQUNwRSxDQUFDO0FBQUEsSUFDSCxTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQ0YsMkNBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFBQSxJQUNGO0FBRUEsU0FBSyxVQUFVLFdBQVcsS0FBSyxVQUFVLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYTtBQUFBLEVBQ3pFO0FBQUEsRUFFQSx3QkFBd0I7QUFDdEIsU0FBSyxjQUFjO0FBQ25CLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVBLHNCQUFzQjtBQUNwQixTQUFLLFlBQVk7QUFDakIsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLEVBRUEsU0FBUztBQUNQLFFBQUksS0FBSyxlQUFlLEtBQUssV0FBVztBQUN0QyxXQUFLLGNBQWMsSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUN2QyxXQUFLLFFBQVE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUFBLEVBRUEsWUFBWTtBQUNWLFFBQUksS0FBSyxlQUFlLEtBQUssV0FBVztBQUN0QyxXQUFLLGNBQWMsSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUFBLElBQ3pDLE9BQU87QUFDTCxXQUFLLGNBQWMsSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUFBLElBQ3pDO0FBQ0EsU0FBSyxRQUFRO0FBQUEsRUFDZjtBQUFBLEVBRUEsVUFBVTtBQUNSLGlCQUFhLEtBQUssT0FBTztBQUN6QixTQUFLLFNBQVMsb0JBQW9CLGVBQWUsS0FBSyxTQUFTO0FBQy9ELFNBQUssU0FBUyxvQkFBb0IsYUFBYSxLQUFLLE9BQU87QUFDM0QsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUNGO0FBbkdBLEFBcUdBLE1BQU8sWUFBMEI7QUFBQSxFQWEvQixZQUFZLFVBQTJCLGVBQXdCO0FBQzdELFVBQU0sUUFBUSxJQUFJLGlCQUFpQixVQUFVLGFBQWE7QUFDMUQsU0FBSyxRQUFRO0FBQ2IsU0FBSyxtQkFBbUIsTUFBTSxpQkFBaUIsS0FBSyxLQUFLO0FBQ3pELFNBQUssc0JBQXNCLE1BQU0sb0JBQW9CLEtBQUssS0FBSztBQUFBLEVBQ2pFO0FBQUEsRUFFQSxRQUFjO0FBQ1osU0FBSyxNQUFNLE1BQU07QUFBQSxFQUNuQjtBQUNGO0FBdkJBIiwKICAibmFtZXMiOiBbXQp9Cg==
