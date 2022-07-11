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
var debuglogs_exports = {};
__export(debuglogs_exports, {
  fetch: () => fetch
});
module.exports = __toCommonJS(debuglogs_exports);
var import_lodash = require("lodash");
var import_os = __toESM(require("os"));
var import_electron = require("electron");
var import_reallyJsonStringify = require("../util/reallyJsonStringify");
var import_shared = require("./shared");
var import_privacy = require("../util/privacy");
var import_environment = require("../environment");
const headerSectionTitle = /* @__PURE__ */ __name((title) => `========= ${title} =========`, "headerSectionTitle");
const headerSection = /* @__PURE__ */ __name((title, data) => {
  const sortedEntries = (0, import_lodash.sortBy)(Object.entries(data), ([key]) => key);
  return [
    headerSectionTitle(title),
    ...sortedEntries.map(([key, value]) => `${key}: ${(0, import_privacy.redactAll)(String(value))}`),
    ""
  ].join("\n");
}, "headerSection");
const getHeader = /* @__PURE__ */ __name(({
  capabilities,
  remoteConfig,
  statistics,
  appMetrics,
  user
}, nodeVersion, appVersion) => [
  headerSection("System info", {
    Time: Date.now(),
    "User agent": window.navigator.userAgent,
    "Node version": nodeVersion,
    Environment: (0, import_environment.getEnvironment)(),
    "App version": appVersion,
    "OS version": import_os.default.version()
  }),
  headerSection("User info", user),
  headerSection("Capabilities", capabilities),
  headerSection("Remote config", remoteConfig),
  headerSection("Metrics", appMetrics.reduce((acc, stats, index) => {
    const {
      type = "?",
      serviceName = "?",
      name = "?",
      cpu,
      memory
    } = stats;
    const processId = `${index}:${type}/${serviceName}/${name}`;
    return {
      ...acc,
      [processId]: `cpuUsage=${cpu.percentCPUUsage.toFixed(2)} wakeups=${cpu.idleWakeupsPerSecond} workingMemory=${memory.workingSetSize} peakWorkingMemory=${memory.peakWorkingSetSize}`
    };
  }, {})),
  headerSection("Statistics", statistics),
  headerSectionTitle("Logs")
].join("\n"), "getHeader");
const getLevel = (0, import_lodash.memoize)((level) => {
  const text = (0, import_shared.getLogLevelString)(level);
  return text.toUpperCase().padEnd(import_shared.levelMaxLength, " ");
});
function formatLine(mightBeEntry) {
  const entry = (0, import_shared.isLogEntry)(mightBeEntry) ? mightBeEntry : {
    level: import_shared.LogLevel.Error,
    msg: `Invalid IPC data when fetching logs. Here's what we could recover: ${(0, import_reallyJsonStringify.reallyJsonStringify)(mightBeEntry)}`,
    time: new Date().toISOString()
  };
  return `${getLevel(entry.level)} ${entry.time} ${entry.msg}`;
}
async function fetch(nodeVersion, appVersion) {
  const data = await import_electron.ipcRenderer.invoke("fetch-log");
  let header;
  let body;
  if ((0, import_shared.isFetchLogIpcData)(data)) {
    const { logEntries } = data;
    header = getHeader(data, nodeVersion, appVersion);
    body = logEntries.map(formatLine).join("\n");
  } else {
    header = headerSectionTitle("Partial logs");
    const entry = {
      level: import_shared.LogLevel.Error,
      msg: "Invalid IPC data when fetching logs; dropping all logs",
      time: new Date().toISOString()
    };
    body = formatLine(entry);
  }
  return `${header}
${body}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetch
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVidWdsb2dzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgbWVtb2l6ZSwgc29ydEJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgeyBpcGNSZW5kZXJlciBhcyBpcGMgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyByZWFsbHlKc29uU3RyaW5naWZ5IH0gZnJvbSAnLi4vdXRpbC9yZWFsbHlKc29uU3RyaW5naWZ5JztcbmltcG9ydCB0eXBlIHsgRmV0Y2hMb2dJcGNEYXRhLCBMb2dFbnRyeVR5cGUgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge1xuICBMb2dMZXZlbCxcbiAgZ2V0TG9nTGV2ZWxTdHJpbmcsXG4gIGlzRmV0Y2hMb2dJcGNEYXRhLFxuICBpc0xvZ0VudHJ5LFxuICBsZXZlbE1heExlbmd0aCxcbn0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgcmVkYWN0QWxsIH0gZnJvbSAnLi4vdXRpbC9wcml2YWN5JztcbmltcG9ydCB7IGdldEVudmlyb25tZW50IH0gZnJvbSAnLi4vZW52aXJvbm1lbnQnO1xuXG4vLyBUaGUgbWVjaGFuaWNzIG9mIHByZXBhcmluZyBhIGxvZyBmb3IgcHVibGlzaFxuXG5jb25zdCBoZWFkZXJTZWN0aW9uVGl0bGUgPSAodGl0bGU6IHN0cmluZykgPT4gYD09PT09PT09PSAke3RpdGxlfSA9PT09PT09PT1gO1xuXG5jb25zdCBoZWFkZXJTZWN0aW9uID0gKFxuICB0aXRsZTogc3RyaW5nLFxuICBkYXRhOiBSZWFkb25seTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj5cbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNvcnRlZEVudHJpZXMgPSBzb3J0QnkoT2JqZWN0LmVudHJpZXMoZGF0YSksIChba2V5XSkgPT4ga2V5KTtcbiAgcmV0dXJuIFtcbiAgICBoZWFkZXJTZWN0aW9uVGl0bGUodGl0bGUpLFxuICAgIC4uLnNvcnRlZEVudHJpZXMubWFwKFxuICAgICAgKFtrZXksIHZhbHVlXSkgPT4gYCR7a2V5fTogJHtyZWRhY3RBbGwoU3RyaW5nKHZhbHVlKSl9YFxuICAgICksXG4gICAgJycsXG4gIF0uam9pbignXFxuJyk7XG59O1xuXG5jb25zdCBnZXRIZWFkZXIgPSAoXG4gIHtcbiAgICBjYXBhYmlsaXRpZXMsXG4gICAgcmVtb3RlQ29uZmlnLFxuICAgIHN0YXRpc3RpY3MsXG4gICAgYXBwTWV0cmljcyxcbiAgICB1c2VyLFxuICB9OiBPbWl0PEZldGNoTG9nSXBjRGF0YSwgJ2xvZ0VudHJpZXMnPixcbiAgbm9kZVZlcnNpb246IHN0cmluZyxcbiAgYXBwVmVyc2lvbjogc3RyaW5nXG4pOiBzdHJpbmcgPT5cbiAgW1xuICAgIGhlYWRlclNlY3Rpb24oJ1N5c3RlbSBpbmZvJywge1xuICAgICAgVGltZTogRGF0ZS5ub3coKSxcbiAgICAgICdVc2VyIGFnZW50Jzogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAnTm9kZSB2ZXJzaW9uJzogbm9kZVZlcnNpb24sXG4gICAgICBFbnZpcm9ubWVudDogZ2V0RW52aXJvbm1lbnQoKSxcbiAgICAgICdBcHAgdmVyc2lvbic6IGFwcFZlcnNpb24sXG4gICAgICAnT1MgdmVyc2lvbic6IG9zLnZlcnNpb24oKSxcbiAgICB9KSxcbiAgICBoZWFkZXJTZWN0aW9uKCdVc2VyIGluZm8nLCB1c2VyKSxcbiAgICBoZWFkZXJTZWN0aW9uKCdDYXBhYmlsaXRpZXMnLCBjYXBhYmlsaXRpZXMpLFxuICAgIGhlYWRlclNlY3Rpb24oJ1JlbW90ZSBjb25maWcnLCByZW1vdGVDb25maWcpLFxuICAgIGhlYWRlclNlY3Rpb24oXG4gICAgICAnTWV0cmljcycsXG4gICAgICBhcHBNZXRyaWNzLnJlZHVjZSgoYWNjLCBzdGF0cywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHR5cGUgPSAnPycsXG4gICAgICAgICAgc2VydmljZU5hbWUgPSAnPycsXG4gICAgICAgICAgbmFtZSA9ICc/JyxcbiAgICAgICAgICBjcHUsXG4gICAgICAgICAgbWVtb3J5LFxuICAgICAgICB9ID0gc3RhdHM7XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc0lkID0gYCR7aW5kZXh9OiR7dHlwZX0vJHtzZXJ2aWNlTmFtZX0vJHtuYW1lfWA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgW3Byb2Nlc3NJZF06XG4gICAgICAgICAgICBgY3B1VXNhZ2U9JHtjcHUucGVyY2VudENQVVVzYWdlLnRvRml4ZWQoMil9IGAgK1xuICAgICAgICAgICAgYHdha2V1cHM9JHtjcHUuaWRsZVdha2V1cHNQZXJTZWNvbmR9IGAgK1xuICAgICAgICAgICAgYHdvcmtpbmdNZW1vcnk9JHttZW1vcnkud29ya2luZ1NldFNpemV9IGAgK1xuICAgICAgICAgICAgYHBlYWtXb3JraW5nTWVtb3J5PSR7bWVtb3J5LnBlYWtXb3JraW5nU2V0U2l6ZX1gLFxuICAgICAgICB9O1xuICAgICAgfSwge30pXG4gICAgKSxcbiAgICBoZWFkZXJTZWN0aW9uKCdTdGF0aXN0aWNzJywgc3RhdGlzdGljcyksXG4gICAgaGVhZGVyU2VjdGlvblRpdGxlKCdMb2dzJyksXG4gIF0uam9pbignXFxuJyk7XG5cbmNvbnN0IGdldExldmVsID0gbWVtb2l6ZSgobGV2ZWw6IExvZ0xldmVsKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdGV4dCA9IGdldExvZ0xldmVsU3RyaW5nKGxldmVsKTtcbiAgcmV0dXJuIHRleHQudG9VcHBlckNhc2UoKS5wYWRFbmQobGV2ZWxNYXhMZW5ndGgsICcgJyk7XG59KTtcblxuZnVuY3Rpb24gZm9ybWF0TGluZShtaWdodEJlRW50cnk6IHVua25vd24pOiBzdHJpbmcge1xuICBjb25zdCBlbnRyeTogTG9nRW50cnlUeXBlID0gaXNMb2dFbnRyeShtaWdodEJlRW50cnkpXG4gICAgPyBtaWdodEJlRW50cnlcbiAgICA6IHtcbiAgICAgICAgbGV2ZWw6IExvZ0xldmVsLkVycm9yLFxuICAgICAgICBtc2c6IGBJbnZhbGlkIElQQyBkYXRhIHdoZW4gZmV0Y2hpbmcgbG9ncy4gSGVyZSdzIHdoYXQgd2UgY291bGQgcmVjb3ZlcjogJHtyZWFsbHlKc29uU3RyaW5naWZ5KFxuICAgICAgICAgIG1pZ2h0QmVFbnRyeVxuICAgICAgICApfWAsXG4gICAgICAgIHRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG5cbiAgcmV0dXJuIGAke2dldExldmVsKGVudHJ5LmxldmVsKX0gJHtlbnRyeS50aW1lfSAke2VudHJ5Lm1zZ31gO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2goXG4gIG5vZGVWZXJzaW9uOiBzdHJpbmcsXG4gIGFwcFZlcnNpb246IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IGlwYy5pbnZva2UoJ2ZldGNoLWxvZycpO1xuXG4gIGxldCBoZWFkZXI6IHN0cmluZztcbiAgbGV0IGJvZHk6IHN0cmluZztcbiAgaWYgKGlzRmV0Y2hMb2dJcGNEYXRhKGRhdGEpKSB7XG4gICAgY29uc3QgeyBsb2dFbnRyaWVzIH0gPSBkYXRhO1xuICAgIGhlYWRlciA9IGdldEhlYWRlcihkYXRhLCBub2RlVmVyc2lvbiwgYXBwVmVyc2lvbik7XG4gICAgYm9keSA9IGxvZ0VudHJpZXMubWFwKGZvcm1hdExpbmUpLmpvaW4oJ1xcbicpO1xuICB9IGVsc2Uge1xuICAgIGhlYWRlciA9IGhlYWRlclNlY3Rpb25UaXRsZSgnUGFydGlhbCBsb2dzJyk7XG4gICAgY29uc3QgZW50cnk6IExvZ0VudHJ5VHlwZSA9IHtcbiAgICAgIGxldmVsOiBMb2dMZXZlbC5FcnJvcixcbiAgICAgIG1zZzogJ0ludmFsaWQgSVBDIGRhdGEgd2hlbiBmZXRjaGluZyBsb2dzOyBkcm9wcGluZyBhbGwgbG9ncycsXG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfTtcbiAgICBib2R5ID0gZm9ybWF0TGluZShlbnRyeSk7XG4gIH1cblxuICByZXR1cm4gYCR7aGVhZGVyfVxcbiR7Ym9keX1gO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFnQztBQUNoQyxnQkFBZTtBQUNmLHNCQUFtQztBQUNuQyxpQ0FBb0M7QUFFcEMsb0JBTU87QUFDUCxxQkFBMEI7QUFDMUIseUJBQStCO0FBSS9CLE1BQU0scUJBQXFCLHdCQUFDLFVBQWtCLGFBQWEsbUJBQWhDO0FBRTNCLE1BQU0sZ0JBQWdCLHdCQUNwQixPQUNBLFNBQ1c7QUFDWCxRQUFNLGdCQUFnQiwwQkFBTyxPQUFPLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUc7QUFDakUsU0FBTztBQUFBLElBQ0wsbUJBQW1CLEtBQUs7QUFBQSxJQUN4QixHQUFHLGNBQWMsSUFDZixDQUFDLENBQUMsS0FBSyxXQUFXLEdBQUcsUUFBUSw4QkFBVSxPQUFPLEtBQUssQ0FBQyxHQUN0RDtBQUFBLElBQ0E7QUFBQSxFQUNGLEVBQUUsS0FBSyxJQUFJO0FBQ2IsR0Fac0I7QUFjdEIsTUFBTSxZQUFZLHdCQUNoQjtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FFRixhQUNBLGVBRUE7QUFBQSxFQUNFLGNBQWMsZUFBZTtBQUFBLElBQzNCLE1BQU0sS0FBSyxJQUFJO0FBQUEsSUFDZixjQUFjLE9BQU8sVUFBVTtBQUFBLElBQy9CLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWEsdUNBQWU7QUFBQSxJQUM1QixlQUFlO0FBQUEsSUFDZixjQUFjLGtCQUFHLFFBQVE7QUFBQSxFQUMzQixDQUFDO0FBQUEsRUFDRCxjQUFjLGFBQWEsSUFBSTtBQUFBLEVBQy9CLGNBQWMsZ0JBQWdCLFlBQVk7QUFBQSxFQUMxQyxjQUFjLGlCQUFpQixZQUFZO0FBQUEsRUFDM0MsY0FDRSxXQUNBLFdBQVcsT0FBTyxDQUFDLEtBQUssT0FBTyxVQUFVO0FBQ3ZDLFVBQU07QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLGNBQWM7QUFBQSxNQUNkLE9BQU87QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLFFBQ0U7QUFFSixVQUFNLFlBQVksR0FBRyxTQUFTLFFBQVEsZUFBZTtBQUVyRCxXQUFPO0FBQUEsU0FDRjtBQUFBLE9BQ0YsWUFDQyxZQUFZLElBQUksZ0JBQWdCLFFBQVEsQ0FBQyxhQUM5QixJQUFJLHNDQUNFLE9BQU8sb0NBQ0gsT0FBTztBQUFBLElBQ2hDO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQyxDQUNQO0FBQUEsRUFDQSxjQUFjLGNBQWMsVUFBVTtBQUFBLEVBQ3RDLG1CQUFtQixNQUFNO0FBQzNCLEVBQUUsS0FBSyxJQUFJLEdBaERLO0FBa0RsQixNQUFNLFdBQVcsMkJBQVEsQ0FBQyxVQUE0QjtBQUNwRCxRQUFNLE9BQU8scUNBQWtCLEtBQUs7QUFDcEMsU0FBTyxLQUFLLFlBQVksRUFBRSxPQUFPLDhCQUFnQixHQUFHO0FBQ3RELENBQUM7QUFFRCxvQkFBb0IsY0FBK0I7QUFDakQsUUFBTSxRQUFzQiw4QkFBVyxZQUFZLElBQy9DLGVBQ0E7QUFBQSxJQUNFLE9BQU8sdUJBQVM7QUFBQSxJQUNoQixLQUFLLHNFQUFzRSxvREFDekUsWUFDRjtBQUFBLElBQ0EsTUFBTSxJQUFJLEtBQUssRUFBRSxZQUFZO0FBQUEsRUFDL0I7QUFFSixTQUFPLEdBQUcsU0FBUyxNQUFNLEtBQUssS0FBSyxNQUFNLFFBQVEsTUFBTTtBQUN6RDtBQVpTLEFBY1QscUJBQ0UsYUFDQSxZQUNpQjtBQUNqQixRQUFNLE9BQWdCLE1BQU0sNEJBQUksT0FBTyxXQUFXO0FBRWxELE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxxQ0FBa0IsSUFBSSxHQUFHO0FBQzNCLFVBQU0sRUFBRSxlQUFlO0FBQ3ZCLGFBQVMsVUFBVSxNQUFNLGFBQWEsVUFBVTtBQUNoRCxXQUFPLFdBQVcsSUFBSSxVQUFVLEVBQUUsS0FBSyxJQUFJO0FBQUEsRUFDN0MsT0FBTztBQUNMLGFBQVMsbUJBQW1CLGNBQWM7QUFDMUMsVUFBTSxRQUFzQjtBQUFBLE1BQzFCLE9BQU8sdUJBQVM7QUFBQSxNQUNoQixLQUFLO0FBQUEsTUFDTCxNQUFNLElBQUksS0FBSyxFQUFFLFlBQVk7QUFBQSxJQUMvQjtBQUNBLFdBQU8sV0FBVyxLQUFLO0FBQUEsRUFDekI7QUFFQSxTQUFPLEdBQUc7QUFBQSxFQUFXO0FBQ3ZCO0FBdkJzQiIsCiAgIm5hbWVzIjogW10KfQo=
