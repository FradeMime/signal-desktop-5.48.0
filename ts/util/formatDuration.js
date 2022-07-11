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
var formatDuration_exports = {};
__export(formatDuration_exports, {
  formatDuration: () => formatDuration
});
module.exports = __toCommonJS(formatDuration_exports);
var import_moment = __toESM(require("moment"));
const HOUR = 1e3 * 60 * 60;
function formatDuration(seconds) {
  const time = import_moment.default.utc(seconds * 1e3);
  if (seconds > HOUR) {
    return time.format("H:mm:ss");
  }
  return time.format("m:ss");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatDuration
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZm9ybWF0RHVyYXRpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IEhPVVIgPSAxMDAwICogNjAgKiA2MDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdER1cmF0aW9uKHNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHRpbWUgPSBtb21lbnQudXRjKHNlY29uZHMgKiAxMDAwKTtcblxuICBpZiAoc2Vjb25kcyA+IEhPVVIpIHtcbiAgICByZXR1cm4gdGltZS5mb3JtYXQoJ0g6bW06c3MnKTtcbiAgfVxuXG4gIHJldHVybiB0aW1lLmZvcm1hdCgnbTpzcycpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFtQjtBQUVuQixNQUFNLE9BQU8sTUFBTyxLQUFLO0FBRWxCLHdCQUF3QixTQUF5QjtBQUN0RCxRQUFNLE9BQU8sc0JBQU8sSUFBSSxVQUFVLEdBQUk7QUFFdEMsTUFBSSxVQUFVLE1BQU07QUFDbEIsV0FBTyxLQUFLLE9BQU8sU0FBUztBQUFBLEVBQzlCO0FBRUEsU0FBTyxLQUFLLE9BQU8sTUFBTTtBQUMzQjtBQVJnQiIsCiAgIm5hbWVzIjogW10KfQo=
