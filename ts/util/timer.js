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
var timer_exports = {};
__export(timer_exports, {
  getIncrement: () => getIncrement,
  getTimerBucket: () => getTimerBucket
});
module.exports = __toCommonJS(timer_exports);
var import_lodash = require("lodash");
function getIncrement(length) {
  if (length < 0) {
    return 1e3;
  }
  return Math.ceil(length / 12);
}
function getTimerBucket(expiration, length) {
  if (!expiration) {
    return "60";
  }
  const delta = expiration - Date.now();
  if (delta < 0) {
    return "00";
  }
  if (delta > length) {
    return "60";
  }
  const bucket = Math.round(delta / length * 12);
  return (0, import_lodash.padStart)(String(bucket * 5), 2, "0");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getIncrement,
  getTimerBucket
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBwYWRTdGFydCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmNyZW1lbnQobGVuZ3RoOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAobGVuZ3RoIDwgMCkge1xuICAgIHJldHVybiAxMDAwO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguY2VpbChsZW5ndGggLyAxMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lckJ1Y2tldChcbiAgZXhwaXJhdGlvbjogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICBsZW5ndGg6IG51bWJlclxuKTogc3RyaW5nIHtcbiAgaWYgKCFleHBpcmF0aW9uKSB7XG4gICAgcmV0dXJuICc2MCc7XG4gIH1cblxuICBjb25zdCBkZWx0YSA9IGV4cGlyYXRpb24gLSBEYXRlLm5vdygpO1xuICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgcmV0dXJuICcwMCc7XG4gIH1cbiAgaWYgKGRlbHRhID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuICc2MCc7XG4gIH1cblxuICBjb25zdCBidWNrZXQgPSBNYXRoLnJvdW5kKChkZWx0YSAvIGxlbmd0aCkgKiAxMik7XG5cbiAgcmV0dXJuIHBhZFN0YXJ0KFN0cmluZyhidWNrZXQgKiA1KSwgMiwgJzAnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUVsQixzQkFBc0IsUUFBd0I7QUFDbkQsTUFBSSxTQUFTLEdBQUc7QUFDZCxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUM5QjtBQU5nQixBQVFULHdCQUNMLFlBQ0EsUUFDUTtBQUNSLE1BQUksQ0FBQyxZQUFZO0FBQ2YsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsYUFBYSxLQUFLLElBQUk7QUFDcEMsTUFBSSxRQUFRLEdBQUc7QUFDYixXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksUUFBUSxRQUFRO0FBQ2xCLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxTQUFTLEtBQUssTUFBTyxRQUFRLFNBQVUsRUFBRTtBQUUvQyxTQUFPLDRCQUFTLE9BQU8sU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHO0FBQzVDO0FBbkJnQiIsCiAgIm5hbWVzIjogW10KfQo=
