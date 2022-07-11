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
var CDSBase_exports = {};
__export(CDSBase_exports, {
  CDSBase: () => CDSBase
});
module.exports = __toCommonJS(CDSBase_exports);
var import_proxy_agent = __toESM(require("proxy-agent"));
var import_timestamp = require("../../util/timestamp");
var import_durations = require("../../util/durations");
const CACHED_AUTH_TTL = 23 * import_durations.HOUR;
class CDSBase {
  constructor(options) {
    this.options = options;
    this.logger = options.logger;
    if (options.proxyUrl) {
      this.proxyAgent = new import_proxy_agent.default(options.proxyUrl);
    }
  }
  async getAuth() {
    if (this.cachedAuth) {
      if ((0, import_timestamp.isOlderThan)(this.cachedAuth.timestamp, CACHED_AUTH_TTL)) {
        this.cachedAuth = void 0;
      } else {
        return this.cachedAuth.auth;
      }
    }
    const auth = await this.options.getAuth();
    this.cachedAuth = {
      auth,
      timestamp: Date.now()
    };
    return auth;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSBase
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTQmFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUHJveHlBZ2VudCBmcm9tICdwcm94eS1hZ2VudCc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQ0RTQXV0aFR5cGUsXG4gIENEU1JlcXVlc3RPcHRpb25zVHlwZSxcbiAgQ0RTUmVzcG9uc2VUeXBlLFxufSBmcm9tICcuL1R5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgeyBpc09sZGVyVGhhbiB9IGZyb20gJy4uLy4uL3V0aWwvdGltZXN0YW1wJztcbmltcG9ydCB7IEhPVVIgfSBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5cbi8vIEl0IGlzIDI0IGhvdXJzLCBidXQgd2UgZG9uJ3Qgd2FudCBsYXRlbmN5IGJldHdlZW4gc2VydmVyIGFuZCBjbGllbnQgdG8gYmVcbi8vIGNvdW50LlxuY29uc3QgQ0FDSEVEX0FVVEhfVFRMID0gMjMgKiBIT1VSO1xuXG5leHBvcnQgdHlwZSBDRFNCYXNlT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbiAgcHJveHlVcmw/OiBzdHJpbmc7XG4gIGdldEF1dGgoKTogUHJvbWlzZTxDRFNBdXRoVHlwZT47XG59PjtcblxuZXhwb3J0IHR5cGUgQ2FjaGVkQXV0aFR5cGUgPSBSZWFkb25seTx7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICBhdXRoOiBDRFNBdXRoVHlwZTtcbn0+O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ0RTQmFzZTxcbiAgT3B0aW9ucyBleHRlbmRzIENEU0Jhc2VPcHRpb25zVHlwZSA9IENEU0Jhc2VPcHRpb25zVHlwZVxuPiB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsb2dnZXI6IExvZ2dlclR5cGU7XG4gIHByb3RlY3RlZCByZWFkb25seSBwcm94eUFnZW50PzogUmV0dXJuVHlwZTx0eXBlb2YgUHJveHlBZ2VudD47XG4gIHByb3RlY3RlZCBjYWNoZWRBdXRoPzogQ2FjaGVkQXV0aFR5cGU7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyO1xuXG4gICAgaWYgKG9wdGlvbnMucHJveHlVcmwpIHtcbiAgICAgIHRoaXMucHJveHlBZ2VudCA9IG5ldyBQcm94eUFnZW50KG9wdGlvbnMucHJveHlVcmwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCByZXF1ZXN0KFxuICAgIG9wdGlvbnM6IENEU1JlcXVlc3RPcHRpb25zVHlwZVxuICApOiBQcm9taXNlPENEU1Jlc3BvbnNlVHlwZT47XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGdldEF1dGgoKTogUHJvbWlzZTxDRFNBdXRoVHlwZT4ge1xuICAgIGlmICh0aGlzLmNhY2hlZEF1dGgpIHtcbiAgICAgIGlmIChpc09sZGVyVGhhbih0aGlzLmNhY2hlZEF1dGgudGltZXN0YW1wLCBDQUNIRURfQVVUSF9UVEwpKSB7XG4gICAgICAgIHRoaXMuY2FjaGVkQXV0aCA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlZEF1dGguYXV0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhdXRoID0gYXdhaXQgdGhpcy5vcHRpb25zLmdldEF1dGgoKTtcblxuICAgIHRoaXMuY2FjaGVkQXV0aCA9IHtcbiAgICAgIGF1dGgsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfTtcblxuICAgIHJldHVybiBhdXRoO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXVCO0FBUXZCLHVCQUE0QjtBQUM1Qix1QkFBcUI7QUFJckIsTUFBTSxrQkFBa0IsS0FBSztBQWF0QixNQUFlLFFBRXBCO0FBQUEsRUFLQSxZQUErQixTQUFrQjtBQUFsQjtBQUM3QixTQUFLLFNBQVMsUUFBUTtBQUV0QixRQUFJLFFBQVEsVUFBVTtBQUNwQixXQUFLLGFBQWEsSUFBSSwyQkFBVyxRQUFRLFFBQVE7QUFBQSxJQUNuRDtBQUFBLEVBQ0Y7QUFBQSxRQU1nQixVQUFnQztBQUM5QyxRQUFJLEtBQUssWUFBWTtBQUNuQixVQUFJLGtDQUFZLEtBQUssV0FBVyxXQUFXLGVBQWUsR0FBRztBQUMzRCxhQUFLLGFBQWE7QUFBQSxNQUNwQixPQUFPO0FBQ0wsZUFBTyxLQUFLLFdBQVc7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQU8sTUFBTSxLQUFLLFFBQVEsUUFBUTtBQUV4QyxTQUFLLGFBQWE7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsV0FBVyxLQUFLLElBQUk7QUFBQSxJQUN0QjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFyQ08iLAogICJuYW1lcyI6IFtdCn0K
