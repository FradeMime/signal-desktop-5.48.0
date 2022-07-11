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
var SystemTraySettingCache_exports = {};
__export(SystemTraySettingCache_exports, {
  SystemTraySettingCache: () => SystemTraySettingCache
});
module.exports = __toCommonJS(SystemTraySettingCache_exports);
var log = __toESM(require("../ts/logging/log"));
var import_SystemTraySetting = require("../ts/types/SystemTraySetting");
var import_Settings = require("../ts/types/Settings");
class SystemTraySettingCache {
  constructor(sql, ephemeralConfig, argv, appVersion) {
    this.sql = sql;
    this.ephemeralConfig = ephemeralConfig;
    this.argv = argv;
    this.appVersion = appVersion;
  }
  async get() {
    if (this.cachedValue !== void 0) {
      return this.cachedValue;
    }
    this.getPromise = this.getPromise || this.doFirstGet();
    return this.getPromise;
  }
  set(value) {
    this.cachedValue = value;
  }
  async doFirstGet() {
    let result;
    if (this.argv.some((arg) => arg === "--start-in-tray")) {
      result = import_SystemTraySetting.SystemTraySetting.MinimizeToAndStartInSystemTray;
      log.info(`getSystemTraySetting saw --start-in-tray flag. Returning ${result}`);
    } else if (this.argv.some((arg) => arg === "--use-tray-icon")) {
      result = import_SystemTraySetting.SystemTraySetting.MinimizeToSystemTray;
      log.info(`getSystemTraySetting saw --use-tray-icon flag. Returning ${result}`);
    } else if ((0, import_Settings.isSystemTraySupported)(this.appVersion)) {
      const fastValue = this.ephemeralConfig.get("system-tray-setting");
      if (fastValue !== void 0) {
        log.info("getSystemTraySetting got fast value", fastValue);
      }
      const value = fastValue ?? (await this.sql.sqlCall("getItemById", ["system-tray-setting"]))?.value;
      if (value !== void 0) {
        result = (0, import_SystemTraySetting.parseSystemTraySetting)(value);
        log.info(`getSystemTraySetting returning ${result}`);
      } else {
        result = import_SystemTraySetting.SystemTraySetting.DoNotUseSystemTray;
        log.info(`getSystemTraySetting got no value, returning ${result}`);
      }
      if (result !== fastValue) {
        this.ephemeralConfig.set("system-tray-setting", result);
      }
    } else {
      result = import_SystemTraySetting.SystemTraySetting.DoNotUseSystemTray;
      log.info(`getSystemTraySetting had no flags and did no DB lookups. Returning ${result}`);
    }
    return this.updateCachedValue(result);
  }
  updateCachedValue(value) {
    this.cachedValue = this.cachedValue === void 0 ? value : this.cachedValue;
    return this.cachedValue;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemTraySettingCache
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3lzdGVtVHJheVNldHRpbmdDYWNoZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi90cy9sb2dnaW5nL2xvZyc7XG5pbXBvcnQge1xuICBwYXJzZVN5c3RlbVRyYXlTZXR0aW5nLFxuICBTeXN0ZW1UcmF5U2V0dGluZyxcbn0gZnJvbSAnLi4vdHMvdHlwZXMvU3lzdGVtVHJheVNldHRpbmcnO1xuaW1wb3J0IHsgaXNTeXN0ZW1UcmF5U3VwcG9ydGVkIH0gZnJvbSAnLi4vdHMvdHlwZXMvU2V0dGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBNYWluU1FMIH0gZnJvbSAnLi4vdHMvc3FsL21haW4nO1xuaW1wb3J0IHR5cGUgeyBDb25maWdUeXBlIH0gZnJvbSAnLi9iYXNlX2NvbmZpZyc7XG5cbi8qKlxuICogQSBzbWFsbCBoZWxwZXIgY2xhc3MgdG8gZ2V0IGFuZCBjYWNoZSB0aGUgYHN5c3RlbS10cmF5LXNldHRpbmdgIHByZWZlcmVuY2UgaW4gdGhlIG1haW5cbiAqIHByb2Nlc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBTeXN0ZW1UcmF5U2V0dGluZ0NhY2hlIHtcbiAgcHJpdmF0ZSBjYWNoZWRWYWx1ZTogdW5kZWZpbmVkIHwgU3lzdGVtVHJheVNldHRpbmc7XG5cbiAgcHJpdmF0ZSBnZXRQcm9taXNlOiB1bmRlZmluZWQgfCBQcm9taXNlPFN5c3RlbVRyYXlTZXR0aW5nPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNxbDogUGljazxNYWluU1FMLCAnc3FsQ2FsbCc+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZXBoZW1lcmFsQ29uZmlnOiBQaWNrPENvbmZpZ1R5cGUsICdnZXQnIHwgJ3NldCc+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXJndjogQXJyYXk8c3RyaW5nPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcFZlcnNpb246IHN0cmluZ1xuICApIHt9XG5cbiAgYXN5bmMgZ2V0KCk6IFByb21pc2U8U3lzdGVtVHJheVNldHRpbmc+IHtcbiAgICBpZiAodGhpcy5jYWNoZWRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZWRWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFByb21pc2UgPSB0aGlzLmdldFByb21pc2UgfHwgdGhpcy5kb0ZpcnN0R2V0KCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvbWlzZTtcbiAgfVxuXG4gIHNldCh2YWx1ZTogU3lzdGVtVHJheVNldHRpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhY2hlZFZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRvRmlyc3RHZXQoKTogUHJvbWlzZTxTeXN0ZW1UcmF5U2V0dGluZz4ge1xuICAgIGxldCByZXN1bHQ6IFN5c3RlbVRyYXlTZXR0aW5nO1xuXG4gICAgLy8gVGhlc2UgY29tbWFuZCBsaW5lIGZsYWdzIGFyZSBub3Qgb2ZmaWNpYWxseSBzdXBwb3J0ZWQsIGJ1dCBtYW55IHVzZXJzIHJlbHkgb24gdGhlbS5cbiAgICAvLyAgIEJlIGNhcmVmdWwgd2hlbiByZW1vdmluZyB0aGVtIG9yIG1ha2luZyBjaGFuZ2VzLlxuICAgIGlmICh0aGlzLmFyZ3Yuc29tZShhcmcgPT4gYXJnID09PSAnLS1zdGFydC1pbi10cmF5JykpIHtcbiAgICAgIHJlc3VsdCA9IFN5c3RlbVRyYXlTZXR0aW5nLk1pbmltaXplVG9BbmRTdGFydEluU3lzdGVtVHJheTtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgZ2V0U3lzdGVtVHJheVNldHRpbmcgc2F3IC0tc3RhcnQtaW4tdHJheSBmbGFnLiBSZXR1cm5pbmcgJHtyZXN1bHR9YFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXJndi5zb21lKGFyZyA9PiBhcmcgPT09ICctLXVzZS10cmF5LWljb24nKSkge1xuICAgICAgcmVzdWx0ID0gU3lzdGVtVHJheVNldHRpbmcuTWluaW1pemVUb1N5c3RlbVRyYXk7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGdldFN5c3RlbVRyYXlTZXR0aW5nIHNhdyAtLXVzZS10cmF5LWljb24gZmxhZy4gUmV0dXJuaW5nICR7cmVzdWx0fWBcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpc1N5c3RlbVRyYXlTdXBwb3J0ZWQodGhpcy5hcHBWZXJzaW9uKSkge1xuICAgICAgY29uc3QgZmFzdFZhbHVlID0gdGhpcy5lcGhlbWVyYWxDb25maWcuZ2V0KCdzeXN0ZW0tdHJheS1zZXR0aW5nJyk7XG4gICAgICBpZiAoZmFzdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nLmluZm8oJ2dldFN5c3RlbVRyYXlTZXR0aW5nIGdvdCBmYXN0IHZhbHVlJywgZmFzdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICBmYXN0VmFsdWUgPz9cbiAgICAgICAgKGF3YWl0IHRoaXMuc3FsLnNxbENhbGwoJ2dldEl0ZW1CeUlkJywgWydzeXN0ZW0tdHJheS1zZXR0aW5nJ10pKT8udmFsdWU7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCA9IHBhcnNlU3lzdGVtVHJheVNldHRpbmcodmFsdWUpO1xuICAgICAgICBsb2cuaW5mbyhgZ2V0U3lzdGVtVHJheVNldHRpbmcgcmV0dXJuaW5nICR7cmVzdWx0fWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gU3lzdGVtVHJheVNldHRpbmcuRG9Ob3RVc2VTeXN0ZW1UcmF5O1xuICAgICAgICBsb2cuaW5mbyhgZ2V0U3lzdGVtVHJheVNldHRpbmcgZ290IG5vIHZhbHVlLCByZXR1cm5pbmcgJHtyZXN1bHR9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQgIT09IGZhc3RWYWx1ZSkge1xuICAgICAgICB0aGlzLmVwaGVtZXJhbENvbmZpZy5zZXQoJ3N5c3RlbS10cmF5LXNldHRpbmcnLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBTeXN0ZW1UcmF5U2V0dGluZy5Eb05vdFVzZVN5c3RlbVRyYXk7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGdldFN5c3RlbVRyYXlTZXR0aW5nIGhhZCBubyBmbGFncyBhbmQgZGlkIG5vIERCIGxvb2t1cHMuIFJldHVybmluZyAke3Jlc3VsdH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUNhY2hlZFZhbHVlKHJlc3VsdCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNhY2hlZFZhbHVlKHZhbHVlOiBTeXN0ZW1UcmF5U2V0dGluZyk6IFN5c3RlbVRyYXlTZXR0aW5nIHtcbiAgICAvLyBJZiB0aGVyZSdzIGEgdmFsdWUgaW4gdGhlIGNhY2hlLCBzb21lb25lIGhhcyB1cGRhdGVkIHRoZSB2YWx1ZSBcIm91dCBmcm9tIHVuZGVyIHVzXCIsXG4gICAgLy8gICBzbyB3ZSBzaG91bGQgcmV0dXJuIHRoYXQgYmVjYXVzZSBpdCdzIG5ld2VyLlxuICAgIHRoaXMuY2FjaGVkVmFsdWUgPVxuICAgICAgdGhpcy5jYWNoZWRWYWx1ZSA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiB0aGlzLmNhY2hlZFZhbHVlO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkVmFsdWU7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxVQUFxQjtBQUNyQiwrQkFHTztBQUNQLHNCQUFzQztBQVEvQixNQUFNLHVCQUF1QjtBQUFBLEVBS2xDLFlBQ21CLEtBQ0EsaUJBQ0EsTUFDQSxZQUNqQjtBQUppQjtBQUNBO0FBQ0E7QUFDQTtBQUFBLEVBQ2hCO0FBQUEsUUFFRyxNQUFrQztBQUN0QyxRQUFJLEtBQUssZ0JBQWdCLFFBQVc7QUFDbEMsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUVBLFNBQUssYUFBYSxLQUFLLGNBQWMsS0FBSyxXQUFXO0FBQ3JELFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLElBQUksT0FBZ0M7QUFDbEMsU0FBSyxjQUFjO0FBQUEsRUFDckI7QUFBQSxRQUVjLGFBQXlDO0FBQ3JELFFBQUk7QUFJSixRQUFJLEtBQUssS0FBSyxLQUFLLFNBQU8sUUFBUSxpQkFBaUIsR0FBRztBQUNwRCxlQUFTLDJDQUFrQjtBQUMzQixVQUFJLEtBQ0YsNERBQTRELFFBQzlEO0FBQUEsSUFDRixXQUFXLEtBQUssS0FBSyxLQUFLLFNBQU8sUUFBUSxpQkFBaUIsR0FBRztBQUMzRCxlQUFTLDJDQUFrQjtBQUMzQixVQUFJLEtBQ0YsNERBQTRELFFBQzlEO0FBQUEsSUFDRixXQUFXLDJDQUFzQixLQUFLLFVBQVUsR0FBRztBQUNqRCxZQUFNLFlBQVksS0FBSyxnQkFBZ0IsSUFBSSxxQkFBcUI7QUFDaEUsVUFBSSxjQUFjLFFBQVc7QUFDM0IsWUFBSSxLQUFLLHVDQUF1QyxTQUFTO0FBQUEsTUFDM0Q7QUFFQSxZQUFNLFFBQ0osYUFDQyxPQUFNLEtBQUssSUFBSSxRQUFRLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJO0FBRXBFLFVBQUksVUFBVSxRQUFXO0FBQ3ZCLGlCQUFTLHFEQUF1QixLQUFLO0FBQ3JDLFlBQUksS0FBSyxrQ0FBa0MsUUFBUTtBQUFBLE1BQ3JELE9BQU87QUFDTCxpQkFBUywyQ0FBa0I7QUFDM0IsWUFBSSxLQUFLLGdEQUFnRCxRQUFRO0FBQUEsTUFDbkU7QUFFQSxVQUFJLFdBQVcsV0FBVztBQUN4QixhQUFLLGdCQUFnQixJQUFJLHVCQUF1QixNQUFNO0FBQUEsTUFDeEQ7QUFBQSxJQUNGLE9BQU87QUFDTCxlQUFTLDJDQUFrQjtBQUMzQixVQUFJLEtBQ0Ysc0VBQXNFLFFBQ3hFO0FBQUEsSUFDRjtBQUVBLFdBQU8sS0FBSyxrQkFBa0IsTUFBTTtBQUFBLEVBQ3RDO0FBQUEsRUFFUSxrQkFBa0IsT0FBNkM7QUFHckUsU0FBSyxjQUNILEtBQUssZ0JBQWdCLFNBQVksUUFBUSxLQUFLO0FBRWhELFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFDRjtBQS9FTyIsCiAgIm5hbWVzIjogW10KfQo=
