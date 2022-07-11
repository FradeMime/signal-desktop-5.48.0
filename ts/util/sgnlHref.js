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
var sgnlHref_exports = {};
__export(sgnlHref_exports, {
  isCaptchaHref: () => isCaptchaHref,
  isSgnlHref: () => isSgnlHref,
  isSignalHttpsLink: () => isSignalHttpsLink,
  parseCaptchaHref: () => parseCaptchaHref,
  parseE164FromSignalDotMeHash: () => parseE164FromSignalDotMeHash,
  parseSgnlHref: () => parseSgnlHref,
  parseSignalHttpsLink: () => parseSignalHttpsLink,
  rewriteSignalHrefsIfNecessary: () => rewriteSignalHrefsIfNecessary
});
module.exports = __toCommonJS(sgnlHref_exports);
var import_url = require("./url");
var import_isValidE164 = require("./isValidE164");
const SIGNAL_HOSTS = /* @__PURE__ */ new Set(["signal.group", "signal.art", "signal.me"]);
const SIGNAL_DOT_ME_HASH_PREFIX = "p/";
function parseUrl(value, logger) {
  if (value instanceof URL) {
    return value;
  }
  if (typeof value === "string") {
    return (0, import_url.maybeParseUrl)(value);
  }
  logger.warn("Tried to parse a sgnl:// URL but got an unexpected type");
  return void 0;
}
function isSgnlHref(value, logger) {
  const url = parseUrl(value, logger);
  return Boolean(url?.protocol === "sgnl:");
}
function isCaptchaHref(value, logger) {
  const url = parseUrl(value, logger);
  return Boolean(url?.protocol === "signalcaptcha:");
}
function isSignalHttpsLink(value, logger) {
  const url = parseUrl(value, logger);
  return Boolean(url && !url.username && !url.password && !url.port && url.protocol === "https:" && SIGNAL_HOSTS.has(url.host));
}
function parseSgnlHref(href, logger) {
  const url = parseUrl(href, logger);
  if (!url || !isSgnlHref(url, logger)) {
    return { command: null, args: /* @__PURE__ */ new Map(), hash: void 0 };
  }
  const args = /* @__PURE__ */ new Map();
  url.searchParams.forEach((value, key) => {
    if (!args.has(key)) {
      args.set(key, value);
    }
  });
  return {
    command: url.host,
    args,
    hash: url.hash ? url.hash.slice(1) : void 0
  };
}
function parseCaptchaHref(href, logger) {
  const url = parseUrl(href, logger);
  if (!url || !isCaptchaHref(url, logger)) {
    throw new Error("Not a captcha href");
  }
  return {
    captcha: url.host
  };
}
function parseSignalHttpsLink(href, logger) {
  const url = parseUrl(href, logger);
  if (!url || !isSignalHttpsLink(url, logger)) {
    return { command: null, args: /* @__PURE__ */ new Map(), hash: void 0 };
  }
  if (url.host === "signal.art") {
    const hash = url.hash.slice(1);
    const hashParams = new URLSearchParams(hash);
    const args = /* @__PURE__ */ new Map();
    hashParams.forEach((value, key) => {
      if (!args.has(key)) {
        args.set(key, value);
      }
    });
    if (!args.get("pack_id") || !args.get("pack_key")) {
      return { command: null, args: /* @__PURE__ */ new Map(), hash: void 0 };
    }
    return {
      command: url.pathname.replace(/\//g, ""),
      args,
      hash: url.hash ? url.hash.slice(1) : void 0
    };
  }
  if (url.host === "signal.group" || url.host === "signal.me") {
    return {
      command: url.host,
      args: /* @__PURE__ */ new Map(),
      hash: url.hash ? url.hash.slice(1) : void 0
    };
  }
  return { command: null, args: /* @__PURE__ */ new Map(), hash: void 0 };
}
function parseE164FromSignalDotMeHash(hash) {
  if (!hash.startsWith(SIGNAL_DOT_ME_HASH_PREFIX)) {
    return;
  }
  const maybeE164 = hash.slice(SIGNAL_DOT_ME_HASH_PREFIX.length);
  return (0, import_isValidE164.isValidE164)(maybeE164, true) ? maybeE164 : void 0;
}
function rewriteSignalHrefsIfNecessary(href) {
  const resultUrl = new URL(href);
  const isHttp = resultUrl.protocol === "http:";
  const isHttpOrHttps = isHttp || resultUrl.protocol === "https:";
  if (SIGNAL_HOSTS.has(resultUrl.host) && isHttpOrHttps) {
    if (isHttp) {
      resultUrl.protocol = "https:";
    }
    resultUrl.username = "";
    resultUrl.password = "";
    return resultUrl.href;
  }
  return href;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isCaptchaHref,
  isSgnlHref,
  isSignalHttpsLink,
  parseCaptchaHref,
  parseE164FromSignalDotMeHash,
  parseSgnlHref,
  parseSignalHttpsLink,
  rewriteSignalHrefsIfNecessary
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2dubEhyZWYudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IG1heWJlUGFyc2VVcmwgfSBmcm9tICcuL3VybCc7XG5pbXBvcnQgeyBpc1ZhbGlkRTE2NCB9IGZyb20gJy4vaXNWYWxpZEUxNjQnO1xuXG5jb25zdCBTSUdOQUxfSE9TVFMgPSBuZXcgU2V0KFsnc2lnbmFsLmdyb3VwJywgJ3NpZ25hbC5hcnQnLCAnc2lnbmFsLm1lJ10pO1xuY29uc3QgU0lHTkFMX0RPVF9NRV9IQVNIX1BSRUZJWCA9ICdwLyc7XG5cbmZ1bmN0aW9uIHBhcnNlVXJsKHZhbHVlOiBzdHJpbmcgfCBVUkwsIGxvZ2dlcjogTG9nZ2VyVHlwZSk6IHVuZGVmaW5lZCB8IFVSTCB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVSTCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG1heWJlUGFyc2VVcmwodmFsdWUpO1xuICB9XG5cbiAgbG9nZ2VyLndhcm4oJ1RyaWVkIHRvIHBhcnNlIGEgc2dubDovLyBVUkwgYnV0IGdvdCBhbiB1bmV4cGVjdGVkIHR5cGUnKTtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2dubEhyZWYodmFsdWU6IHN0cmluZyB8IFVSTCwgbG9nZ2VyOiBMb2dnZXJUeXBlKTogYm9vbGVhbiB7XG4gIGNvbnN0IHVybCA9IHBhcnNlVXJsKHZhbHVlLCBsb2dnZXIpO1xuICByZXR1cm4gQm9vbGVhbih1cmw/LnByb3RvY29sID09PSAnc2dubDonKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2FwdGNoYUhyZWYoXG4gIHZhbHVlOiBzdHJpbmcgfCBVUkwsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHVybCA9IHBhcnNlVXJsKHZhbHVlLCBsb2dnZXIpO1xuICByZXR1cm4gQm9vbGVhbih1cmw/LnByb3RvY29sID09PSAnc2lnbmFsY2FwdGNoYTonKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2lnbmFsSHR0cHNMaW5rKFxuICB2YWx1ZTogc3RyaW5nIHwgVVJMLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IGJvb2xlYW4ge1xuICBjb25zdCB1cmwgPSBwYXJzZVVybCh2YWx1ZSwgbG9nZ2VyKTtcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgdXJsICYmXG4gICAgICAhdXJsLnVzZXJuYW1lICYmXG4gICAgICAhdXJsLnBhc3N3b3JkICYmXG4gICAgICAhdXJsLnBvcnQgJiZcbiAgICAgIHVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicgJiZcbiAgICAgIFNJR05BTF9IT1NUUy5oYXModXJsLmhvc3QpXG4gICk7XG59XG5cbnR5cGUgUGFyc2VkU2dubEhyZWYgPVxuICB8IHsgY29tbWFuZDogbnVsbDsgYXJnczogTWFwPG5ldmVyLCBuZXZlcj47IGhhc2g6IHVuZGVmaW5lZCB9XG4gIHwgeyBjb21tYW5kOiBzdHJpbmc7IGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz47IGhhc2g6IHN0cmluZyB8IHVuZGVmaW5lZCB9O1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU2dubEhyZWYoXG4gIGhyZWY6IHN0cmluZyxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiBQYXJzZWRTZ25sSHJlZiB7XG4gIGNvbnN0IHVybCA9IHBhcnNlVXJsKGhyZWYsIGxvZ2dlcik7XG4gIGlmICghdXJsIHx8ICFpc1NnbmxIcmVmKHVybCwgbG9nZ2VyKSkge1xuICAgIHJldHVybiB7IGNvbW1hbmQ6IG51bGwsIGFyZ3M6IG5ldyBNYXA8bmV2ZXIsIG5ldmVyPigpLCBoYXNoOiB1bmRlZmluZWQgfTtcbiAgfVxuXG4gIGNvbnN0IGFyZ3MgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICB1cmwuc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICBpZiAoIWFyZ3MuaGFzKGtleSkpIHtcbiAgICAgIGFyZ3Muc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21tYW5kOiB1cmwuaG9zdCxcbiAgICBhcmdzLFxuICAgIGhhc2g6IHVybC5oYXNoID8gdXJsLmhhc2guc2xpY2UoMSkgOiB1bmRlZmluZWQsXG4gIH07XG59XG5cbnR5cGUgUGFyc2VkQ2FwdGNoYUhyZWYgPSB7XG4gIHJlYWRvbmx5IGNhcHRjaGE6IHN0cmluZztcbn07XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDYXB0Y2hhSHJlZihcbiAgaHJlZjogVVJMIHwgc3RyaW5nLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IFBhcnNlZENhcHRjaGFIcmVmIHtcbiAgY29uc3QgdXJsID0gcGFyc2VVcmwoaHJlZiwgbG9nZ2VyKTtcbiAgaWYgKCF1cmwgfHwgIWlzQ2FwdGNoYUhyZWYodXJsLCBsb2dnZXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYSBjYXB0Y2hhIGhyZWYnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FwdGNoYTogdXJsLmhvc3QsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNpZ25hbEh0dHBzTGluayhcbiAgaHJlZjogc3RyaW5nLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IFBhcnNlZFNnbmxIcmVmIHtcbiAgY29uc3QgdXJsID0gcGFyc2VVcmwoaHJlZiwgbG9nZ2VyKTtcbiAgaWYgKCF1cmwgfHwgIWlzU2lnbmFsSHR0cHNMaW5rKHVybCwgbG9nZ2VyKSkge1xuICAgIHJldHVybiB7IGNvbW1hbmQ6IG51bGwsIGFyZ3M6IG5ldyBNYXA8bmV2ZXIsIG5ldmVyPigpLCBoYXNoOiB1bmRlZmluZWQgfTtcbiAgfVxuXG4gIGlmICh1cmwuaG9zdCA9PT0gJ3NpZ25hbC5hcnQnKSB7XG4gICAgY29uc3QgaGFzaCA9IHVybC5oYXNoLnNsaWNlKDEpO1xuICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGhhc2gpO1xuXG4gICAgY29uc3QgYXJncyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgaGFzaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAoIWFyZ3MuaGFzKGtleSkpIHtcbiAgICAgICAgYXJncy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWFyZ3MuZ2V0KCdwYWNrX2lkJykgfHwgIWFyZ3MuZ2V0KCdwYWNrX2tleScpKSB7XG4gICAgICByZXR1cm4geyBjb21tYW5kOiBudWxsLCBhcmdzOiBuZXcgTWFwPG5ldmVyLCBuZXZlcj4oKSwgaGFzaDogdW5kZWZpbmVkIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmQ6IHVybC5wYXRobmFtZS5yZXBsYWNlKC9cXC8vZywgJycpLFxuICAgICAgYXJncyxcbiAgICAgIGhhc2g6IHVybC5oYXNoID8gdXJsLmhhc2guc2xpY2UoMSkgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfVxuXG4gIGlmICh1cmwuaG9zdCA9PT0gJ3NpZ25hbC5ncm91cCcgfHwgdXJsLmhvc3QgPT09ICdzaWduYWwubWUnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmQ6IHVybC5ob3N0LFxuICAgICAgYXJnczogbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKSxcbiAgICAgIGhhc2g6IHVybC5oYXNoID8gdXJsLmhhc2guc2xpY2UoMSkgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGNvbW1hbmQ6IG51bGwsIGFyZ3M6IG5ldyBNYXA8bmV2ZXIsIG5ldmVyPigpLCBoYXNoOiB1bmRlZmluZWQgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRTE2NEZyb21TaWduYWxEb3RNZUhhc2goaGFzaDogc3RyaW5nKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgaWYgKCFoYXNoLnN0YXJ0c1dpdGgoU0lHTkFMX0RPVF9NRV9IQVNIX1BSRUZJWCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBtYXliZUUxNjQgPSBoYXNoLnNsaWNlKFNJR05BTF9ET1RfTUVfSEFTSF9QUkVGSVgubGVuZ3RoKTtcbiAgcmV0dXJuIGlzVmFsaWRFMTY0KG1heWJlRTE2NCwgdHJ1ZSkgPyBtYXliZUUxNjQgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGh0dHA6Ly9zaWduYWwuZ3JvdXAvI2FiY2AgdG8gYGh0dHBzOi8vc2lnbmFsLmdyb3VwLyNhYmNgLiBEb2VzIHRoZSBzYW1lIGZvclxuICogb3RoZXIgU2lnbmFsIGhvc3RzLCBsaWtlIHNpZ25hbC5tZS4gRG9lcyBub3RoaW5nIHRvIG90aGVyIFVSTHMuIEV4cGVjdHMgYSB2YWxpZCBocmVmLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV3cml0ZVNpZ25hbEhyZWZzSWZOZWNlc3NhcnkoaHJlZjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcmVzdWx0VXJsID0gbmV3IFVSTChocmVmKTtcblxuICBjb25zdCBpc0h0dHAgPSByZXN1bHRVcmwucHJvdG9jb2wgPT09ICdodHRwOic7XG4gIGNvbnN0IGlzSHR0cE9ySHR0cHMgPSBpc0h0dHAgfHwgcmVzdWx0VXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcblxuICBpZiAoU0lHTkFMX0hPU1RTLmhhcyhyZXN1bHRVcmwuaG9zdCkgJiYgaXNIdHRwT3JIdHRwcykge1xuICAgIGlmIChpc0h0dHApIHtcbiAgICAgIHJlc3VsdFVybC5wcm90b2NvbCA9ICdodHRwczonO1xuICAgIH1cbiAgICByZXN1bHRVcmwudXNlcm5hbWUgPSAnJztcbiAgICByZXN1bHRVcmwucGFzc3dvcmQgPSAnJztcbiAgICByZXR1cm4gcmVzdWx0VXJsLmhyZWY7XG4gIH1cblxuICByZXR1cm4gaHJlZjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGlCQUE4QjtBQUM5Qix5QkFBNEI7QUFFNUIsTUFBTSxlQUFlLG9CQUFJLElBQUksQ0FBQyxnQkFBZ0IsY0FBYyxXQUFXLENBQUM7QUFDeEUsTUFBTSw0QkFBNEI7QUFFbEMsa0JBQWtCLE9BQXFCLFFBQXFDO0FBQzFFLE1BQUksaUJBQWlCLEtBQUs7QUFDeEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLFdBQU8sOEJBQWMsS0FBSztBQUFBLEVBQzVCO0FBRUEsU0FBTyxLQUFLLHlEQUF5RDtBQUNyRSxTQUFPO0FBQ1Q7QUFYUyxBQWFGLG9CQUFvQixPQUFxQixRQUE2QjtBQUMzRSxRQUFNLE1BQU0sU0FBUyxPQUFPLE1BQU07QUFDbEMsU0FBTyxRQUFRLEtBQUssYUFBYSxPQUFPO0FBQzFDO0FBSGdCLEFBS1QsdUJBQ0wsT0FDQSxRQUNTO0FBQ1QsUUFBTSxNQUFNLFNBQVMsT0FBTyxNQUFNO0FBQ2xDLFNBQU8sUUFBUSxLQUFLLGFBQWEsZ0JBQWdCO0FBQ25EO0FBTmdCLEFBUVQsMkJBQ0wsT0FDQSxRQUNTO0FBQ1QsUUFBTSxNQUFNLFNBQVMsT0FBTyxNQUFNO0FBQ2xDLFNBQU8sUUFDTCxPQUNFLENBQUMsSUFBSSxZQUNMLENBQUMsSUFBSSxZQUNMLENBQUMsSUFBSSxRQUNMLElBQUksYUFBYSxZQUNqQixhQUFhLElBQUksSUFBSSxJQUFJLENBQzdCO0FBQ0Y7QUFiZ0IsQUFrQlQsdUJBQ0wsTUFDQSxRQUNnQjtBQUNoQixRQUFNLE1BQU0sU0FBUyxNQUFNLE1BQU07QUFDakMsTUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQ3BDLFdBQU8sRUFBRSxTQUFTLE1BQU0sTUFBTSxvQkFBSSxJQUFrQixHQUFHLE1BQU0sT0FBVTtBQUFBLEVBQ3pFO0FBRUEsUUFBTSxPQUFPLG9CQUFJLElBQW9CO0FBQ3JDLE1BQUksYUFBYSxRQUFRLENBQUMsT0FBTyxRQUFRO0FBQ3ZDLFFBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHO0FBQ2xCLFdBQUssSUFBSSxLQUFLLEtBQUs7QUFBQSxJQUNyQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNMLFNBQVMsSUFBSTtBQUFBLElBQ2I7QUFBQSxJQUNBLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSTtBQUFBLEVBQ3ZDO0FBQ0Y7QUFyQmdCLEFBMEJULDBCQUNMLE1BQ0EsUUFDbUI7QUFDbkIsUUFBTSxNQUFNLFNBQVMsTUFBTSxNQUFNO0FBQ2pDLE1BQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxLQUFLLE1BQU0sR0FBRztBQUN2QyxVQUFNLElBQUksTUFBTSxvQkFBb0I7QUFBQSxFQUN0QztBQUVBLFNBQU87QUFBQSxJQUNMLFNBQVMsSUFBSTtBQUFBLEVBQ2Y7QUFDRjtBQVpnQixBQWNULDhCQUNMLE1BQ0EsUUFDZ0I7QUFDaEIsUUFBTSxNQUFNLFNBQVMsTUFBTSxNQUFNO0FBQ2pDLE1BQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEtBQUssTUFBTSxHQUFHO0FBQzNDLFdBQU8sRUFBRSxTQUFTLE1BQU0sTUFBTSxvQkFBSSxJQUFrQixHQUFHLE1BQU0sT0FBVTtBQUFBLEVBQ3pFO0FBRUEsTUFBSSxJQUFJLFNBQVMsY0FBYztBQUM3QixVQUFNLE9BQU8sSUFBSSxLQUFLLE1BQU0sQ0FBQztBQUM3QixVQUFNLGFBQWEsSUFBSSxnQkFBZ0IsSUFBSTtBQUUzQyxVQUFNLE9BQU8sb0JBQUksSUFBb0I7QUFDckMsZUFBVyxRQUFRLENBQUMsT0FBTyxRQUFRO0FBQ2pDLFVBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHO0FBQ2xCLGFBQUssSUFBSSxLQUFLLEtBQUs7QUFBQSxNQUNyQjtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLFVBQVUsR0FBRztBQUNqRCxhQUFPLEVBQUUsU0FBUyxNQUFNLE1BQU0sb0JBQUksSUFBa0IsR0FBRyxNQUFNLE9BQVU7QUFBQSxJQUN6RTtBQUVBLFdBQU87QUFBQSxNQUNMLFNBQVMsSUFBSSxTQUFTLFFBQVEsT0FBTyxFQUFFO0FBQUEsTUFDdkM7QUFBQSxNQUNBLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSTtBQUFBLElBQ3ZDO0FBQUEsRUFDRjtBQUVBLE1BQUksSUFBSSxTQUFTLGtCQUFrQixJQUFJLFNBQVMsYUFBYTtBQUMzRCxXQUFPO0FBQUEsTUFDTCxTQUFTLElBQUk7QUFBQSxNQUNiLE1BQU0sb0JBQUksSUFBb0I7QUFBQSxNQUM5QixNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUk7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFFQSxTQUFPLEVBQUUsU0FBUyxNQUFNLE1BQU0sb0JBQUksSUFBa0IsR0FBRyxNQUFNLE9BQVU7QUFDekU7QUF4Q2dCLEFBMENULHNDQUFzQyxNQUFrQztBQUM3RSxNQUFJLENBQUMsS0FBSyxXQUFXLHlCQUF5QixHQUFHO0FBQy9DO0FBQUEsRUFDRjtBQUVBLFFBQU0sWUFBWSxLQUFLLE1BQU0sMEJBQTBCLE1BQU07QUFDN0QsU0FBTyxvQ0FBWSxXQUFXLElBQUksSUFBSSxZQUFZO0FBQ3BEO0FBUGdCLEFBYVQsdUNBQXVDLE1BQXNCO0FBQ2xFLFFBQU0sWUFBWSxJQUFJLElBQUksSUFBSTtBQUU5QixRQUFNLFNBQVMsVUFBVSxhQUFhO0FBQ3RDLFFBQU0sZ0JBQWdCLFVBQVUsVUFBVSxhQUFhO0FBRXZELE1BQUksYUFBYSxJQUFJLFVBQVUsSUFBSSxLQUFLLGVBQWU7QUFDckQsUUFBSSxRQUFRO0FBQ1YsZ0JBQVUsV0FBVztBQUFBLElBQ3ZCO0FBQ0EsY0FBVSxXQUFXO0FBQ3JCLGNBQVUsV0FBVztBQUNyQixXQUFPLFVBQVU7QUFBQSxFQUNuQjtBQUVBLFNBQU87QUFDVDtBQWhCZ0IiLAogICJuYW1lcyI6IFtdCn0K
