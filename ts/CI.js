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
var CI_exports = {};
__export(CI_exports, {
  CI: () => CI
});
module.exports = __toCommonJS(CI_exports);
var import_electron = require("electron");
var import_explodePromise = require("./util/explodePromise");
var import_durations = require("./util/durations");
var log = __toESM(require("./logging/log"));
class CI {
  constructor(deviceName) {
    this.deviceName = deviceName;
    this.eventListeners = /* @__PURE__ */ new Map();
    this.completedEvents = /* @__PURE__ */ new Map();
    import_electron.ipcRenderer.on("ci:event", (_, event, data) => {
      this.handleEvent(event, data);
    });
  }
  async waitForEvent(event, timeout = 60 * import_durations.SECOND) {
    const pendingCompleted = this.completedEvents.get(event) || [];
    const pending = pendingCompleted.shift();
    if (pending) {
      log.info(`CI: resolving pending result for ${event}`, pending);
      if (pendingCompleted.length === 0) {
        this.completedEvents.delete(event);
      }
      return pending;
    }
    log.info(`CI: waiting for event ${event}`);
    const { resolve, reject, promise } = (0, import_explodePromise.explodePromise)();
    const timer = setTimeout(() => {
      reject(new Error("Timed out"));
    }, timeout);
    let list = this.eventListeners.get(event);
    if (!list) {
      list = [];
      this.eventListeners.set(event, list);
    }
    list.push((value) => {
      clearTimeout(timer);
      resolve(value);
    });
    return promise;
  }
  setProvisioningURL(url) {
    this.handleEvent("provisioning-url", url);
  }
  handleEvent(event, data) {
    const list = this.eventListeners.get(event) || [];
    const resolve = list.shift();
    if (resolve) {
      if (list.length === 0) {
        this.eventListeners.delete(event);
      }
      log.info(`CI: got event ${event} with data`, data);
      resolve(data);
      return;
    }
    log.info(`CI: postponing event ${event}`);
    let resultList = this.completedEvents.get(event);
    if (!resultList) {
      resultList = [];
      this.completedEvents.set(event, resultList);
    }
    resultList.push(data);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CI
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0kudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB7IGV4cGxvZGVQcm9taXNlIH0gZnJvbSAnLi91dGlsL2V4cGxvZGVQcm9taXNlJztcbmltcG9ydCB7IFNFQ09ORCB9IGZyb20gJy4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4vbG9nZ2luZy9sb2cnO1xuXG50eXBlIFJlc29sdmVUeXBlID0gKGRhdGE6IHVua25vd24pID0+IHZvaWQ7XG5cbmV4cG9ydCBjbGFzcyBDSSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8UmVzb2x2ZVR5cGU+PigpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29tcGxldGVkRXZlbnRzID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PHVua25vd24+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBkZXZpY2VOYW1lOiBzdHJpbmcpIHtcbiAgICBpcGNSZW5kZXJlci5vbignY2k6ZXZlbnQnLCAoXywgZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlRXZlbnQoZXZlbnQsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHdhaXRGb3JFdmVudChcbiAgICBldmVudDogc3RyaW5nLFxuICAgIHRpbWVvdXQgPSA2MCAqIFNFQ09ORFxuICApOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCBwZW5kaW5nQ29tcGxldGVkID0gdGhpcy5jb21wbGV0ZWRFdmVudHMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICBjb25zdCBwZW5kaW5nID0gcGVuZGluZ0NvbXBsZXRlZC5zaGlmdCgpO1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICBsb2cuaW5mbyhgQ0k6IHJlc29sdmluZyBwZW5kaW5nIHJlc3VsdCBmb3IgJHtldmVudH1gLCBwZW5kaW5nKTtcblxuICAgICAgaWYgKHBlbmRpbmdDb21wbGV0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkRXZlbnRzLmRlbGV0ZShldmVudCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwZW5kaW5nO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKGBDSTogd2FpdGluZyBmb3IgZXZlbnQgJHtldmVudH1gKTtcbiAgICBjb25zdCB7IHJlc29sdmUsIHJlamVjdCwgcHJvbWlzZSB9ID0gZXhwbG9kZVByb21pc2UoKTtcblxuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdUaW1lZCBvdXQnKSk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICBsZXQgbGlzdCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50KTtcbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgIGxpc3QgPSBbXTtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50LCBsaXN0KTtcbiAgICB9XG5cbiAgICBsaXN0LnB1c2goKHZhbHVlOiB1bmtub3duKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm92aXNpb25pbmdVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUV2ZW50KCdwcm92aXNpb25pbmctdXJsJywgdXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVFdmVudChldmVudDogc3RyaW5nLCBkYXRhOiB1bmtub3duKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICBjb25zdCByZXNvbHZlID0gbGlzdC5zaGlmdCgpO1xuXG4gICAgaWYgKHJlc29sdmUpIHtcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLmRlbGV0ZShldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGxvZy5pbmZvKGBDSTogZ290IGV2ZW50ICR7ZXZlbnR9IHdpdGggZGF0YWAsIGRhdGEpO1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhgQ0k6IHBvc3Rwb25pbmcgZXZlbnQgJHtldmVudH1gKTtcblxuICAgIGxldCByZXN1bHRMaXN0ID0gdGhpcy5jb21wbGV0ZWRFdmVudHMuZ2V0KGV2ZW50KTtcbiAgICBpZiAoIXJlc3VsdExpc3QpIHtcbiAgICAgIHJlc3VsdExpc3QgPSBbXTtcbiAgICAgIHRoaXMuY29tcGxldGVkRXZlbnRzLnNldChldmVudCwgcmVzdWx0TGlzdCk7XG4gICAgfVxuICAgIHJlc3VsdExpc3QucHVzaChkYXRhKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUE0QjtBQUU1Qiw0QkFBK0I7QUFDL0IsdUJBQXVCO0FBQ3ZCLFVBQXFCO0FBSWQsTUFBTSxHQUFHO0FBQUEsRUFLZCxZQUE0QixZQUFvQjtBQUFwQjtBQUpYLDBCQUFpQixvQkFBSSxJQUFnQztBQUVyRCwyQkFBa0Isb0JBQUksSUFBNEI7QUFHakUsZ0NBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxPQUFPLFNBQVM7QUFDN0MsV0FBSyxZQUFZLE9BQU8sSUFBSTtBQUFBLElBQzlCLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFYSxhQUNYLE9BQ0EsVUFBVSxLQUFLLHlCQUNHO0FBQ2xCLFVBQU0sbUJBQW1CLEtBQUssZ0JBQWdCLElBQUksS0FBSyxLQUFLLENBQUM7QUFDN0QsVUFBTSxVQUFVLGlCQUFpQixNQUFNO0FBQ3ZDLFFBQUksU0FBUztBQUNYLFVBQUksS0FBSyxvQ0FBb0MsU0FBUyxPQUFPO0FBRTdELFVBQUksaUJBQWlCLFdBQVcsR0FBRztBQUNqQyxhQUFLLGdCQUFnQixPQUFPLEtBQUs7QUFBQSxNQUNuQztBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxLQUFLLHlCQUF5QixPQUFPO0FBQ3pDLFVBQU0sRUFBRSxTQUFTLFFBQVEsWUFBWSwwQ0FBZTtBQUVwRCxVQUFNLFFBQVEsV0FBVyxNQUFNO0FBQzdCLGFBQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUFBLElBQy9CLEdBQUcsT0FBTztBQUVWLFFBQUksT0FBTyxLQUFLLGVBQWUsSUFBSSxLQUFLO0FBQ3hDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsYUFBTyxDQUFDO0FBQ1IsV0FBSyxlQUFlLElBQUksT0FBTyxJQUFJO0FBQUEsSUFDckM7QUFFQSxTQUFLLEtBQUssQ0FBQyxVQUFtQjtBQUM1QixtQkFBYSxLQUFLO0FBQ2xCLGNBQVEsS0FBSztBQUFBLElBQ2YsQ0FBQztBQUVELFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFTyxtQkFBbUIsS0FBbUI7QUFDM0MsU0FBSyxZQUFZLG9CQUFvQixHQUFHO0FBQUEsRUFDMUM7QUFBQSxFQUVPLFlBQVksT0FBZSxNQUFxQjtBQUNyRCxVQUFNLE9BQU8sS0FBSyxlQUFlLElBQUksS0FBSyxLQUFLLENBQUM7QUFDaEQsVUFBTSxVQUFVLEtBQUssTUFBTTtBQUUzQixRQUFJLFNBQVM7QUFDWCxVQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3JCLGFBQUssZUFBZSxPQUFPLEtBQUs7QUFBQSxNQUNsQztBQUVBLFVBQUksS0FBSyxpQkFBaUIsbUJBQW1CLElBQUk7QUFDakQsY0FBUSxJQUFJO0FBQ1o7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLHdCQUF3QixPQUFPO0FBRXhDLFFBQUksYUFBYSxLQUFLLGdCQUFnQixJQUFJLEtBQUs7QUFDL0MsUUFBSSxDQUFDLFlBQVk7QUFDZixtQkFBYSxDQUFDO0FBQ2QsV0FBSyxnQkFBZ0IsSUFBSSxPQUFPLFVBQVU7QUFBQSxJQUM1QztBQUNBLGVBQVcsS0FBSyxJQUFJO0FBQUEsRUFDdEI7QUFDRjtBQTNFTyIsCiAgIm5hbWVzIjogW10KfQo=
