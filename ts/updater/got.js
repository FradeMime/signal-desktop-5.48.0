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
var got_exports = {};
__export(got_exports, {
  GOT_CONNECT_TIMEOUT: () => GOT_CONNECT_TIMEOUT,
  GOT_LOOKUP_TIMEOUT: () => GOT_LOOKUP_TIMEOUT,
  GOT_SOCKET_TIMEOUT: () => GOT_SOCKET_TIMEOUT,
  getCertificateAuthority: () => getCertificateAuthority,
  getGotOptions: () => getGotOptions,
  getProxyUrl: () => getProxyUrl
});
module.exports = __toCommonJS(got_exports);
var import_config = __toESM(require("config"));
var import_proxy_agent = __toESM(require("proxy-agent"));
var packageJson = __toESM(require("../../package.json"));
var import_getUserAgent = require("../util/getUserAgent");
var durations = __toESM(require("../util/durations"));
const GOT_CONNECT_TIMEOUT = durations.MINUTE;
const GOT_LOOKUP_TIMEOUT = durations.MINUTE;
const GOT_SOCKET_TIMEOUT = durations.MINUTE;
const GOT_RETRY_LIMIT = 3;
function getProxyUrl() {
  return process.env.HTTPS_PROXY || process.env.https_proxy;
}
function getCertificateAuthority() {
  return import_config.default.get("certificateAuthority");
}
function getGotOptions() {
  const certificateAuthority = getCertificateAuthority();
  const proxyUrl = getProxyUrl();
  const agent = proxyUrl ? {
    http: new import_proxy_agent.default(proxyUrl),
    https: new import_proxy_agent.default(proxyUrl)
  } : void 0;
  return {
    agent,
    https: {
      certificateAuthority
    },
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": (0, import_getUserAgent.getUserAgent)(packageJson.version)
    },
    timeout: {
      connect: GOT_CONNECT_TIMEOUT,
      lookup: GOT_LOOKUP_TIMEOUT,
      socket: GOT_SOCKET_TIMEOUT
    },
    retry: {
      limit: GOT_RETRY_LIMIT,
      errorCodes: [
        "ETIMEDOUT",
        "ECONNRESET",
        "ECONNREFUSED",
        "EPIPE",
        "ENOTFOUND",
        "ENETUNREACH",
        "EAI_AGAIN"
      ],
      methods: ["GET", "HEAD"],
      statusCodes: [413, 429, 503]
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GOT_CONNECT_TIMEOUT,
  GOT_LOOKUP_TIMEOUT,
  GOT_SOCKET_TIMEOUT,
  getCertificateAuthority,
  getGotOptions,
  getProxyUrl
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ290LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBTdHJpY3RPcHRpb25zIGFzIEdvdE9wdGlvbnMgfSBmcm9tICdnb3QnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IFByb3h5QWdlbnQgZnJvbSAncHJveHktYWdlbnQnO1xuXG5pbXBvcnQgKiBhcyBwYWNrYWdlSnNvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgZ2V0VXNlckFnZW50IH0gZnJvbSAnLi4vdXRpbC9nZXRVc2VyQWdlbnQnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcblxuZXhwb3J0IGNvbnN0IEdPVF9DT05ORUNUX1RJTUVPVVQgPSBkdXJhdGlvbnMuTUlOVVRFO1xuZXhwb3J0IGNvbnN0IEdPVF9MT09LVVBfVElNRU9VVCA9IGR1cmF0aW9ucy5NSU5VVEU7XG5leHBvcnQgY29uc3QgR09UX1NPQ0tFVF9USU1FT1VUID0gZHVyYXRpb25zLk1JTlVURTtcbmNvbnN0IEdPVF9SRVRSWV9MSU1JVCA9IDM7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm94eVVybCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICByZXR1cm4gcHJvY2Vzcy5lbnYuSFRUUFNfUFJPWFkgfHwgcHJvY2Vzcy5lbnYuaHR0cHNfcHJveHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDZXJ0aWZpY2F0ZUF1dGhvcml0eSgpOiBzdHJpbmcge1xuICByZXR1cm4gY29uZmlnLmdldCgnY2VydGlmaWNhdGVBdXRob3JpdHknKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdvdE9wdGlvbnMoKTogR290T3B0aW9ucyB7XG4gIGNvbnN0IGNlcnRpZmljYXRlQXV0aG9yaXR5ID0gZ2V0Q2VydGlmaWNhdGVBdXRob3JpdHkoKTtcbiAgY29uc3QgcHJveHlVcmwgPSBnZXRQcm94eVVybCgpO1xuICBjb25zdCBhZ2VudCA9IHByb3h5VXJsXG4gICAgPyB7XG4gICAgICAgIGh0dHA6IG5ldyBQcm94eUFnZW50KHByb3h5VXJsKSxcbiAgICAgICAgaHR0cHM6IG5ldyBQcm94eUFnZW50KHByb3h5VXJsKSxcbiAgICAgIH1cbiAgICA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4ge1xuICAgIGFnZW50LFxuICAgIGh0dHBzOiB7XG4gICAgICBjZXJ0aWZpY2F0ZUF1dGhvcml0eSxcbiAgICB9LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICdVc2VyLUFnZW50JzogZ2V0VXNlckFnZW50KHBhY2thZ2VKc29uLnZlcnNpb24pLFxuICAgIH0sXG4gICAgdGltZW91dDoge1xuICAgICAgY29ubmVjdDogR09UX0NPTk5FQ1RfVElNRU9VVCxcbiAgICAgIGxvb2t1cDogR09UX0xPT0tVUF9USU1FT1VULFxuXG4gICAgICAvLyBUaGlzIHRpbWVvdXQgaXMgcmVzZXQgd2hlbmV2ZXIgd2UgZ2V0IG5ldyBkYXRhIG9uIHRoZSBzb2NrZXRcbiAgICAgIHNvY2tldDogR09UX1NPQ0tFVF9USU1FT1VULFxuICAgIH0sXG4gICAgcmV0cnk6IHtcbiAgICAgIGxpbWl0OiBHT1RfUkVUUllfTElNSVQsXG4gICAgICBlcnJvckNvZGVzOiBbXG4gICAgICAgICdFVElNRURPVVQnLFxuICAgICAgICAnRUNPTk5SRVNFVCcsXG4gICAgICAgICdFQ09OTlJFRlVTRUQnLFxuICAgICAgICAnRVBJUEUnLFxuICAgICAgICAnRU5PVEZPVU5EJyxcbiAgICAgICAgJ0VORVRVTlJFQUNIJyxcbiAgICAgICAgJ0VBSV9BR0FJTicsXG4gICAgICBdLFxuICAgICAgbWV0aG9kczogWydHRVQnLCAnSEVBRCddLFxuICAgICAgc3RhdHVzQ29kZXM6IFs0MTMsIDQyOSwgNTAzXSxcbiAgICB9LFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxvQkFBbUI7QUFDbkIseUJBQXVCO0FBRXZCLGtCQUE2QjtBQUM3QiwwQkFBNkI7QUFDN0IsZ0JBQTJCO0FBRXBCLE1BQU0sc0JBQXNCLFVBQVU7QUFDdEMsTUFBTSxxQkFBcUIsVUFBVTtBQUNyQyxNQUFNLHFCQUFxQixVQUFVO0FBQzVDLE1BQU0sa0JBQWtCO0FBRWpCLHVCQUEyQztBQUNoRCxTQUFPLFFBQVEsSUFBSSxlQUFlLFFBQVEsSUFBSTtBQUNoRDtBQUZnQixBQUlULG1DQUEyQztBQUNoRCxTQUFPLHNCQUFPLElBQUksc0JBQXNCO0FBQzFDO0FBRmdCLEFBSVQseUJBQXFDO0FBQzFDLFFBQU0sdUJBQXVCLHdCQUF3QjtBQUNyRCxRQUFNLFdBQVcsWUFBWTtBQUM3QixRQUFNLFFBQVEsV0FDVjtBQUFBLElBQ0UsTUFBTSxJQUFJLDJCQUFXLFFBQVE7QUFBQSxJQUM3QixPQUFPLElBQUksMkJBQVcsUUFBUTtBQUFBLEVBQ2hDLElBQ0E7QUFFSixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixjQUFjLHNDQUFhLFlBQVksT0FBTztBQUFBLElBQ2hEO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFHUixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLENBQUMsT0FBTyxNQUFNO0FBQUEsTUFDdkIsYUFBYSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQ0Y7QUF6Q2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
