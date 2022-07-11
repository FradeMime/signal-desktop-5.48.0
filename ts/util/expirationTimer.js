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
var expirationTimer_exports = {};
__export(expirationTimer_exports, {
  DEFAULT_DURATIONS_IN_SECONDS: () => DEFAULT_DURATIONS_IN_SECONDS,
  DEFAULT_DURATIONS_SET: () => DEFAULT_DURATIONS_SET,
  format: () => format
});
module.exports = __toCommonJS(expirationTimer_exports);
var moment = __toESM(require("moment"));
var import_humanize_duration = __toESM(require("humanize-duration"));
const SECONDS_PER_WEEK = 604800;
const DEFAULT_DURATIONS_IN_SECONDS = [
  0,
  moment.duration(4, "weeks").asSeconds(),
  moment.duration(1, "week").asSeconds(),
  moment.duration(1, "day").asSeconds(),
  moment.duration(8, "hours").asSeconds(),
  moment.duration(1, "hour").asSeconds(),
  moment.duration(5, "minutes").asSeconds(),
  moment.duration(30, "seconds").asSeconds()
];
const DEFAULT_DURATIONS_SET = new Set(DEFAULT_DURATIONS_IN_SECONDS);
function format(i18n, dirtySeconds, { capitalizeOff = false } = {}) {
  let seconds = Math.abs(dirtySeconds || 0);
  if (!seconds) {
    return i18n(capitalizeOff ? "off" : "disappearingMessages__off");
  }
  seconds = Math.max(Math.floor(seconds), 1);
  const locale = i18n.getLocale();
  const localeWithoutRegion = locale.split("_", 1)[0];
  const fallbacks = [];
  if (localeWithoutRegion !== locale) {
    fallbacks.push(localeWithoutRegion);
  }
  if (localeWithoutRegion === "nb" || localeWithoutRegion === "nn") {
    fallbacks.push("no");
  }
  if (localeWithoutRegion !== "en") {
    fallbacks.push("en");
  }
  return (0, import_humanize_duration.default)(seconds * 1e3, {
    units: seconds % SECONDS_PER_WEEK === 0 ? ["w"] : ["d", "h", "m", "s"],
    language: locale,
    ...fallbacks.length ? { fallbacks } : {}
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_DURATIONS_IN_SECONDS,
  DEFAULT_DURATIONS_SET,
  format
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwaXJhdGlvblRpbWVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaHVtYW5pemVEdXJhdGlvbiBmcm9tICdodW1hbml6ZS1kdXJhdGlvbic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuY29uc3QgU0VDT05EU19QRVJfV0VFSyA9IDYwNDgwMDtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0RVUkFUSU9OU19JTl9TRUNPTkRTOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSBbXG4gIDAsXG4gIG1vbWVudC5kdXJhdGlvbig0LCAnd2Vla3MnKS5hc1NlY29uZHMoKSxcbiAgbW9tZW50LmR1cmF0aW9uKDEsICd3ZWVrJykuYXNTZWNvbmRzKCksXG4gIG1vbWVudC5kdXJhdGlvbigxLCAnZGF5JykuYXNTZWNvbmRzKCksXG4gIG1vbWVudC5kdXJhdGlvbig4LCAnaG91cnMnKS5hc1NlY29uZHMoKSxcbiAgbW9tZW50LmR1cmF0aW9uKDEsICdob3VyJykuYXNTZWNvbmRzKCksXG4gIG1vbWVudC5kdXJhdGlvbig1LCAnbWludXRlcycpLmFzU2Vjb25kcygpLFxuICBtb21lbnQuZHVyYXRpb24oMzAsICdzZWNvbmRzJykuYXNTZWNvbmRzKCksXG5dO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9EVVJBVElPTlNfU0VUOiBSZWFkb25seVNldDxudW1iZXI+ID0gbmV3IFNldDxudW1iZXI+KFxuICBERUZBVUxUX0RVUkFUSU9OU19JTl9TRUNPTkRTXG4pO1xuXG5leHBvcnQgdHlwZSBGb3JtYXRPcHRpb25zID0ge1xuICBjYXBpdGFsaXplT2ZmPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIGRpcnR5U2Vjb25kcz86IG51bWJlcixcbiAgeyBjYXBpdGFsaXplT2ZmID0gZmFsc2UgfTogRm9ybWF0T3B0aW9ucyA9IHt9XG4pOiBzdHJpbmcge1xuICBsZXQgc2Vjb25kcyA9IE1hdGguYWJzKGRpcnR5U2Vjb25kcyB8fCAwKTtcbiAgaWYgKCFzZWNvbmRzKSB7XG4gICAgcmV0dXJuIGkxOG4oY2FwaXRhbGl6ZU9mZiA/ICdvZmYnIDogJ2Rpc2FwcGVhcmluZ01lc3NhZ2VzX19vZmYnKTtcbiAgfVxuICBzZWNvbmRzID0gTWF0aC5tYXgoTWF0aC5mbG9vcihzZWNvbmRzKSwgMSk7XG5cbiAgY29uc3QgbG9jYWxlOiBzdHJpbmcgPSBpMThuLmdldExvY2FsZSgpO1xuICBjb25zdCBsb2NhbGVXaXRob3V0UmVnaW9uOiBzdHJpbmcgPSBsb2NhbGUuc3BsaXQoJ18nLCAxKVswXTtcbiAgY29uc3QgZmFsbGJhY2tzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGlmIChsb2NhbGVXaXRob3V0UmVnaW9uICE9PSBsb2NhbGUpIHtcbiAgICBmYWxsYmFja3MucHVzaChsb2NhbGVXaXRob3V0UmVnaW9uKTtcbiAgfVxuICBpZiAobG9jYWxlV2l0aG91dFJlZ2lvbiA9PT0gJ25iJyB8fCBsb2NhbGVXaXRob3V0UmVnaW9uID09PSAnbm4nKSB7XG4gICAgZmFsbGJhY2tzLnB1c2goJ25vJyk7XG4gIH1cbiAgaWYgKGxvY2FsZVdpdGhvdXRSZWdpb24gIT09ICdlbicpIHtcbiAgICBmYWxsYmFja3MucHVzaCgnZW4nKTtcbiAgfVxuXG4gIHJldHVybiBodW1hbml6ZUR1cmF0aW9uKHNlY29uZHMgKiAxMDAwLCB7XG4gICAgdW5pdHM6IHNlY29uZHMgJSBTRUNPTkRTX1BFUl9XRUVLID09PSAwID8gWyd3J10gOiBbJ2QnLCAnaCcsICdtJywgJ3MnXSxcbiAgICBsYW5ndWFnZTogbG9jYWxlLFxuICAgIC4uLihmYWxsYmFja3MubGVuZ3RoID8geyBmYWxsYmFja3MgfSA6IHt9KSxcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGFBQXdCO0FBQ3hCLCtCQUE2QjtBQUc3QixNQUFNLG1CQUFtQjtBQUNsQixNQUFNLCtCQUFzRDtBQUFBLEVBQ2pFO0FBQUEsRUFDQSxPQUFPLFNBQVMsR0FBRyxPQUFPLEVBQUUsVUFBVTtBQUFBLEVBQ3RDLE9BQU8sU0FBUyxHQUFHLE1BQU0sRUFBRSxVQUFVO0FBQUEsRUFDckMsT0FBTyxTQUFTLEdBQUcsS0FBSyxFQUFFLFVBQVU7QUFBQSxFQUNwQyxPQUFPLFNBQVMsR0FBRyxPQUFPLEVBQUUsVUFBVTtBQUFBLEVBQ3RDLE9BQU8sU0FBUyxHQUFHLE1BQU0sRUFBRSxVQUFVO0FBQUEsRUFDckMsT0FBTyxTQUFTLEdBQUcsU0FBUyxFQUFFLFVBQVU7QUFBQSxFQUN4QyxPQUFPLFNBQVMsSUFBSSxTQUFTLEVBQUUsVUFBVTtBQUMzQztBQUVPLE1BQU0sd0JBQTZDLElBQUksSUFDNUQsNEJBQ0Y7QUFNTyxnQkFDTCxNQUNBLGNBQ0EsRUFBRSxnQkFBZ0IsVUFBeUIsQ0FBQyxHQUNwQztBQUNSLE1BQUksVUFBVSxLQUFLLElBQUksZ0JBQWdCLENBQUM7QUFDeEMsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUFPLEtBQUssZ0JBQWdCLFFBQVEsMkJBQTJCO0FBQUEsRUFDakU7QUFDQSxZQUFVLEtBQUssSUFBSSxLQUFLLE1BQU0sT0FBTyxHQUFHLENBQUM7QUFFekMsUUFBTSxTQUFpQixLQUFLLFVBQVU7QUFDdEMsUUFBTSxzQkFBOEIsT0FBTyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3pELFFBQU0sWUFBMkIsQ0FBQztBQUNsQyxNQUFJLHdCQUF3QixRQUFRO0FBQ2xDLGNBQVUsS0FBSyxtQkFBbUI7QUFBQSxFQUNwQztBQUNBLE1BQUksd0JBQXdCLFFBQVEsd0JBQXdCLE1BQU07QUFDaEUsY0FBVSxLQUFLLElBQUk7QUFBQSxFQUNyQjtBQUNBLE1BQUksd0JBQXdCLE1BQU07QUFDaEMsY0FBVSxLQUFLLElBQUk7QUFBQSxFQUNyQjtBQUVBLFNBQU8sc0NBQWlCLFVBQVUsS0FBTTtBQUFBLElBQ3RDLE9BQU8sVUFBVSxxQkFBcUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEdBQUc7QUFBQSxJQUNyRSxVQUFVO0FBQUEsT0FDTixVQUFVLFNBQVMsRUFBRSxVQUFVLElBQUksQ0FBQztBQUFBLEVBQzFDLENBQUM7QUFDSDtBQTdCZ0IiLAogICJuYW1lcyI6IFtdCn0K
