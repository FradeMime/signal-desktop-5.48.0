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
var Time_exports = {};
__export(Time_exports, {
  Time: () => Time
});
module.exports = __toCommonJS(Time_exports);
var import_moment = __toESM(require("moment"));
var import_react = __toESM(require("react"));
function Time({
  children,
  dateOnly = false,
  timestamp,
  ...otherProps
}) {
  let dateTime;
  if (dateOnly) {
    dateTime = (0, import_moment.default)(timestamp).format("YYYY-MM-DD");
  } else {
    const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
    dateTime = date.toISOString();
  }
  return /* @__PURE__ */ import_react.default.createElement("time", {
    dateTime,
    ...otherProps
  }, children);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Time
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdEVsZW1lbnQsIFRpbWVIVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lKHtcbiAgY2hpbGRyZW4sXG4gIGRhdGVPbmx5ID0gZmFsc2UsXG4gIHRpbWVzdGFtcCxcbiAgLi4ub3RoZXJQcm9wc1xufTogUmVhZG9ubHk8XG4gIHtcbiAgICBkYXRlT25seT86IGJvb2xlYW47XG4gICAgdGltZXN0YW1wOiBSZWFkb25seTxudW1iZXIgfCBEYXRlIHwgTW9tZW50PjtcbiAgfSAmIE9taXQ8VGltZUhUTUxBdHRyaWJ1dGVzPEhUTUxFbGVtZW50PiwgJ2RhdGVUaW1lJz5cbj4pOiBSZWFjdEVsZW1lbnQge1xuICBsZXQgZGF0ZVRpbWU6IHN0cmluZztcbiAgaWYgKGRhdGVPbmx5KSB7XG4gICAgZGF0ZVRpbWUgPSBtb21lbnQodGltZXN0YW1wKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkYXRlID1cbiAgICAgIHR5cGVvZiB0aW1lc3RhbXAgPT09ICdudW1iZXInID8gbmV3IERhdGUodGltZXN0YW1wKSA6IHRpbWVzdGFtcDtcbiAgICBkYXRlVGltZSA9IGRhdGUudG9JU09TdHJpbmcoKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPHRpbWUgZGF0ZVRpbWU9e2RhdGVUaW1lfSB7Li4ub3RoZXJQcm9wc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC90aW1lPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLG9CQUFtQjtBQUNuQixtQkFBa0I7QUFFWCxjQUFjO0FBQUEsRUFDbkI7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYO0FBQUEsS0FDRztBQUFBLEdBTVk7QUFDZixNQUFJO0FBQ0osTUFBSSxVQUFVO0FBQ1osZUFBVywyQkFBTyxTQUFTLEVBQUUsT0FBTyxZQUFZO0FBQUEsRUFDbEQsT0FBTztBQUNMLFVBQU0sT0FDSixPQUFPLGNBQWMsV0FBVyxJQUFJLEtBQUssU0FBUyxJQUFJO0FBQ3hELGVBQVcsS0FBSyxZQUFZO0FBQUEsRUFDOUI7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFBSztBQUFBLE9BQXdCO0FBQUEsS0FDM0IsUUFDSDtBQUVKO0FBekJnQiIsCiAgIm5hbWVzIjogW10KfQo=
