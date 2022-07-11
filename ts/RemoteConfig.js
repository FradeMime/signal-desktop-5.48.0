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
var RemoteConfig_exports = {};
__export(RemoteConfig_exports, {
  getValue: () => getValue,
  initRemoteConfig: () => initRemoteConfig,
  isEnabled: () => isEnabled,
  maybeRefreshRemoteConfig: () => maybeRefreshRemoteConfig,
  onChange: () => onChange,
  refreshRemoteConfig: () => refreshRemoteConfig
});
module.exports = __toCommonJS(RemoteConfig_exports);
var import_lodash = require("lodash");
var log = __toESM(require("./logging/log"));
let config = {};
const listeners = {};
async function initRemoteConfig(server) {
  config = window.storage.get("remoteConfig") || {};
  await maybeRefreshRemoteConfig(server);
}
function onChange(key, fn) {
  const keyListeners = (0, import_lodash.get)(listeners, key, []);
  keyListeners.push(fn);
  listeners[key] = keyListeners;
  return () => {
    listeners[key] = listeners[key].filter((l) => l !== fn);
  };
}
const refreshRemoteConfig = /* @__PURE__ */ __name(async (server) => {
  const now = Date.now();
  const newConfig = await server.getConfig();
  const oldConfig = config;
  config = newConfig.reduce((acc, { name, enabled, value }) => {
    const previouslyEnabled = (0, import_lodash.get)(oldConfig, [name, "enabled"], false);
    const previousValue = (0, import_lodash.get)(oldConfig, [name, "value"], void 0);
    const enabledAt = previouslyEnabled && enabled ? now : (0, import_lodash.get)(oldConfig, [name, "enabledAt"]);
    const configValue = {
      name,
      enabled,
      enabledAt,
      value
    };
    const hasChanged = previouslyEnabled !== enabled || previousValue !== configValue.value;
    const currentListeners = listeners[name] || [];
    if (hasChanged) {
      log.info(`Remote Config: Flag ${name} has changed`);
      currentListeners.forEach((listener) => {
        listener(configValue);
      });
    }
    return {
      ...acc,
      [name]: configValue
    };
  }, {});
  window.storage.put("remoteConfig", config);
}, "refreshRemoteConfig");
const maybeRefreshRemoteConfig = (0, import_lodash.throttle)(refreshRemoteConfig, 2 * 60 * 60 * 1e3, { trailing: false });
function isEnabled(name) {
  return (0, import_lodash.get)(config, [name, "enabled"], false);
}
function getValue(name) {
  return (0, import_lodash.get)(config, [name, "value"], void 0);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getValue,
  initRemoteConfig,
  isEnabled,
  maybeRefreshRemoteConfig,
  onChange,
  refreshRemoteConfig
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVtb3RlQ29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZ2V0LCB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgV2ViQVBJVHlwZSB9IGZyb20gJy4vdGV4dHNlY3VyZS9XZWJBUEknO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgdHlwZSBDb25maWdLZXlUeXBlID1cbiAgfCAnZGVza3RvcC5hbm5vdW5jZW1lbnRHcm91cCdcbiAgfCAnZGVza3RvcC5jYWxsaW5nLmF1ZGlvTGV2ZWxGb3JTcGVha2luZydcbiAgfCAnZGVza3RvcC5jbGllbnRFeHBpcmF0aW9uJ1xuICB8ICdkZXNrdG9wLmdyb3VwQ2FsbE91dGJvdW5kUmluZydcbiAgfCAnZGVza3RvcC5pbnRlcm5hbFVzZXInXG4gIHwgJ2Rlc2t0b3AubWFuZGF0b3J5UHJvZmlsZVNoYXJpbmcnXG4gIHwgJ2Rlc2t0b3AubWVkaWFRdWFsaXR5LmxldmVscydcbiAgfCAnZGVza3RvcC5tZXNzYWdlQ2xlYW51cCdcbiAgfCAnZGVza3RvcC5tZXNzYWdlUmVxdWVzdHMnXG4gIHwgJ2Rlc2t0b3AucmV0cnlSZWNlaXB0TGlmZXNwYW4nXG4gIHwgJ2Rlc2t0b3AucmV0cnlSZXNwb25kTWF4QWdlJ1xuICB8ICdkZXNrdG9wLnNlbmRlcktleS5yZXRyeSdcbiAgfCAnZGVza3RvcC5zZW5kZXJLZXkuc2VuZCdcbiAgfCAnZGVza3RvcC5zZW5kZXJLZXlNYXhBZ2UnXG4gIHwgJ2Rlc2t0b3Auc2VuZFNlbmRlcktleTMnXG4gIHwgJ2Rlc2t0b3Auc2hvd1VzZXJCYWRnZXMuYmV0YSdcbiAgfCAnZGVza3RvcC5zaG93VXNlckJhZGdlczInXG4gIHwgJ2Rlc2t0b3Auc3RvcmllcydcbiAgfCAnZGVza3RvcC51c2VybmFtZXMnXG4gIHwgJ2dsb2JhbC5hdHRhY2htZW50cy5tYXhCeXRlcydcbiAgfCAnZ2xvYmFsLmNhbGxpbmcubWF4R3JvdXBDYWxsUmluZ1NpemUnXG4gIHwgJ2dsb2JhbC5ncm91cHN2Mi5ncm91cFNpemVIYXJkTGltaXQnXG4gIHwgJ2dsb2JhbC5ncm91cHN2Mi5tYXhHcm91cFNpemUnO1xudHlwZSBDb25maWdWYWx1ZVR5cGUgPSB7XG4gIG5hbWU6IENvbmZpZ0tleVR5cGU7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGVuYWJsZWRBdD86IG51bWJlcjtcbiAgdmFsdWU/OiB1bmtub3duO1xufTtcbmV4cG9ydCB0eXBlIENvbmZpZ01hcFR5cGUgPSB7XG4gIFtrZXkgaW4gQ29uZmlnS2V5VHlwZV0/OiBDb25maWdWYWx1ZVR5cGU7XG59O1xudHlwZSBDb25maWdMaXN0ZW5lclR5cGUgPSAodmFsdWU6IENvbmZpZ1ZhbHVlVHlwZSkgPT4gdW5rbm93bjtcbnR5cGUgQ29uZmlnTGlzdGVuZXJzTWFwVHlwZSA9IHtcbiAgW2tleTogc3RyaW5nXTogQXJyYXk8Q29uZmlnTGlzdGVuZXJUeXBlPjtcbn07XG5cbmxldCBjb25maWc6IENvbmZpZ01hcFR5cGUgPSB7fTtcbmNvbnN0IGxpc3RlbmVyczogQ29uZmlnTGlzdGVuZXJzTWFwVHlwZSA9IHt9O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdFJlbW90ZUNvbmZpZyhzZXJ2ZXI6IFdlYkFQSVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uZmlnID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdyZW1vdGVDb25maWcnKSB8fCB7fTtcbiAgYXdhaXQgbWF5YmVSZWZyZXNoUmVtb3RlQ29uZmlnKHNlcnZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoYW5nZShcbiAga2V5OiBDb25maWdLZXlUeXBlLFxuICBmbjogQ29uZmlnTGlzdGVuZXJUeXBlXG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3Qga2V5TGlzdGVuZXJzOiBBcnJheTxDb25maWdMaXN0ZW5lclR5cGU+ID0gZ2V0KGxpc3RlbmVycywga2V5LCBbXSk7XG4gIGtleUxpc3RlbmVycy5wdXNoKGZuKTtcbiAgbGlzdGVuZXJzW2tleV0gPSBrZXlMaXN0ZW5lcnM7XG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBsaXN0ZW5lcnNba2V5XSA9IGxpc3RlbmVyc1trZXldLmZpbHRlcihsID0+IGwgIT09IGZuKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlZnJlc2hSZW1vdGVDb25maWcgPSBhc3luYyAoXG4gIHNlcnZlcjogV2ViQVBJVHlwZVxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IG5ld0NvbmZpZyA9IGF3YWl0IHNlcnZlci5nZXRDb25maWcoKTtcblxuICAvLyBQcm9jZXNzIG5ldyBjb25maWd1cmF0aW9uIGluIGxpZ2h0IG9mIHRoZSBvbGQgY29uZmlndXJhdGlvblxuICAvLyBUaGUgb2xkIGNvbmZpZ3VyYXRpb24gaXMgbm90IHNldCBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBpbiByZWR1Y2UgYmVjYXVzZVxuICAvLyBmbGFncyBtYXkgaGF2ZSBiZWVuIGRlbGV0ZWRcbiAgY29uc3Qgb2xkQ29uZmlnID0gY29uZmlnO1xuICBjb25maWcgPSBuZXdDb25maWcucmVkdWNlKChhY2MsIHsgbmFtZSwgZW5hYmxlZCwgdmFsdWUgfSkgPT4ge1xuICAgIGNvbnN0IHByZXZpb3VzbHlFbmFibGVkOiBib29sZWFuID0gZ2V0KG9sZENvbmZpZywgW25hbWUsICdlbmFibGVkJ10sIGZhbHNlKTtcbiAgICBjb25zdCBwcmV2aW91c1ZhbHVlOiB1bmtub3duID0gZ2V0KG9sZENvbmZpZywgW25hbWUsICd2YWx1ZSddLCB1bmRlZmluZWQpO1xuICAgIC8vIElmIGEgZmxhZyB3YXMgcHJldmlvdXNseSBub3QgZW5hYmxlZCBhbmQgaXMgbm93IGVuYWJsZWQsXG4gICAgLy8gcmVjb3JkIHRoZSB0aW1lIGl0IHdhcyBlbmFibGVkXG4gICAgY29uc3QgZW5hYmxlZEF0OiBudW1iZXIgfCB1bmRlZmluZWQgPVxuICAgICAgcHJldmlvdXNseUVuYWJsZWQgJiYgZW5hYmxlZCA/IG5vdyA6IGdldChvbGRDb25maWcsIFtuYW1lLCAnZW5hYmxlZEF0J10pO1xuXG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSB7XG4gICAgICBuYW1lOiBuYW1lIGFzIENvbmZpZ0tleVR5cGUsXG4gICAgICBlbmFibGVkLFxuICAgICAgZW5hYmxlZEF0LFxuICAgICAgdmFsdWUsXG4gICAgfTtcblxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPVxuICAgICAgcHJldmlvdXNseUVuYWJsZWQgIT09IGVuYWJsZWQgfHwgcHJldmlvdXNWYWx1ZSAhPT0gY29uZmlnVmFsdWUudmFsdWU7XG5cbiAgICAvLyBJZiBlbmFibGVtZW50IGNoYW5nZXMgYXQgYWxsLCBub3RpZnkgbGlzdGVuZXJzXG4gICAgY29uc3QgY3VycmVudExpc3RlbmVycyA9IGxpc3RlbmVyc1tuYW1lXSB8fCBbXTtcbiAgICBpZiAoaGFzQ2hhbmdlZCkge1xuICAgICAgbG9nLmluZm8oYFJlbW90ZSBDb25maWc6IEZsYWcgJHtuYW1lfSBoYXMgY2hhbmdlZGApO1xuICAgICAgY3VycmVudExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgICAgbGlzdGVuZXIoY29uZmlnVmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIG5ldyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgIHJldHVybiB7XG4gICAgICAuLi5hY2MsXG4gICAgICBbbmFtZV06IGNvbmZpZ1ZhbHVlLFxuICAgIH07XG4gIH0sIHt9KTtcblxuICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3JlbW90ZUNvbmZpZycsIGNvbmZpZyk7XG59O1xuXG5leHBvcnQgY29uc3QgbWF5YmVSZWZyZXNoUmVtb3RlQ29uZmlnID0gdGhyb3R0bGUoXG4gIHJlZnJlc2hSZW1vdGVDb25maWcsXG4gIC8vIE9ubHkgZmV0Y2ggcmVtb3RlIGNvbmZpZ3VyYXRpb24gaWYgdGhlIGxhc3QgZmV0Y2ggd2FzIG1vcmUgdGhhbiB0d28gaG91cnMgYWdvXG4gIDIgKiA2MCAqIDYwICogMTAwMCxcbiAgeyB0cmFpbGluZzogZmFsc2UgfVxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW5hYmxlZChuYW1lOiBDb25maWdLZXlUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiBnZXQoY29uZmlnLCBbbmFtZSwgJ2VuYWJsZWQnXSwgZmFsc2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWUobmFtZTogQ29uZmlnS2V5VHlwZSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiBnZXQoY29uZmlnLCBbbmFtZSwgJ3ZhbHVlJ10sIHVuZGVmaW5lZCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUE4QjtBQUc5QixVQUFxQjtBQXdDckIsSUFBSSxTQUF3QixDQUFDO0FBQzdCLE1BQU0sWUFBb0MsQ0FBQztBQUUzQyxnQ0FBdUMsUUFBbUM7QUFDeEUsV0FBUyxPQUFPLFFBQVEsSUFBSSxjQUFjLEtBQUssQ0FBQztBQUNoRCxRQUFNLHlCQUF5QixNQUFNO0FBQ3ZDO0FBSHNCLEFBS2Ysa0JBQ0wsS0FDQSxJQUNZO0FBQ1osUUFBTSxlQUEwQyx1QkFBSSxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBQ3RFLGVBQWEsS0FBSyxFQUFFO0FBQ3BCLFlBQVUsT0FBTztBQUVqQixTQUFPLE1BQU07QUFDWCxjQUFVLE9BQU8sVUFBVSxLQUFLLE9BQU8sT0FBSyxNQUFNLEVBQUU7QUFBQSxFQUN0RDtBQUNGO0FBWGdCLEFBYVQsTUFBTSxzQkFBc0IsOEJBQ2pDLFdBQ2tCO0FBQ2xCLFFBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsUUFBTSxZQUFZLE1BQU0sT0FBTyxVQUFVO0FBS3pDLFFBQU0sWUFBWTtBQUNsQixXQUFTLFVBQVUsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLFNBQVMsWUFBWTtBQUMzRCxVQUFNLG9CQUE2Qix1QkFBSSxXQUFXLENBQUMsTUFBTSxTQUFTLEdBQUcsS0FBSztBQUMxRSxVQUFNLGdCQUF5Qix1QkFBSSxXQUFXLENBQUMsTUFBTSxPQUFPLEdBQUcsTUFBUztBQUd4RSxVQUFNLFlBQ0oscUJBQXFCLFVBQVUsTUFBTSx1QkFBSSxXQUFXLENBQUMsTUFBTSxXQUFXLENBQUM7QUFFekUsVUFBTSxjQUFjO0FBQUEsTUFDbEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUNKLHNCQUFzQixXQUFXLGtCQUFrQixZQUFZO0FBR2pFLFVBQU0sbUJBQW1CLFVBQVUsU0FBUyxDQUFDO0FBQzdDLFFBQUksWUFBWTtBQUNkLFVBQUksS0FBSyx1QkFBdUIsa0JBQWtCO0FBQ2xELHVCQUFpQixRQUFRLGNBQVk7QUFDbkMsaUJBQVMsV0FBVztBQUFBLE1BQ3RCLENBQUM7QUFBQSxJQUNIO0FBR0EsV0FBTztBQUFBLFNBQ0Y7QUFBQSxPQUNGLE9BQU87QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU8sUUFBUSxJQUFJLGdCQUFnQixNQUFNO0FBQzNDLEdBN0NtQztBQStDNUIsTUFBTSwyQkFBMkIsNEJBQ3RDLHFCQUVBLElBQUksS0FBSyxLQUFLLEtBQ2QsRUFBRSxVQUFVLE1BQU0sQ0FDcEI7QUFFTyxtQkFBbUIsTUFBOEI7QUFDdEQsU0FBTyx1QkFBSSxRQUFRLENBQUMsTUFBTSxTQUFTLEdBQUcsS0FBSztBQUM3QztBQUZnQixBQUlULGtCQUFrQixNQUF5QztBQUNoRSxTQUFPLHVCQUFJLFFBQVEsQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFTO0FBQy9DO0FBRmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
