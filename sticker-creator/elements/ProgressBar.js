var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var ProgressBar_exports = {};
__export(ProgressBar_exports, {
  ProgressBar: () => ProgressBar
});
module.exports = __toCommonJS(ProgressBar_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var styles = __toESM(require("./ProgressBar.scss"));
const ProgressBar = React.memo(({ className, count, total }) => /* @__PURE__ */ React.createElement("div", {
  className: (0, import_classnames.default)(styles.base, className)
}, /* @__PURE__ */ React.createElement("div", {
  className: styles.bar,
  style: { width: `${Math.floor(count / total * 100)}%` }
})));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProgressBar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZ3Jlc3NCYXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL1Byb2dyZXNzQmFyLnNjc3MnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFBpY2s8UmVhY3QuSFRNTEF0dHJpYnV0ZXM8SFRNTERpdkVsZW1lbnQ+LCAnY2xhc3NOYW1lJz4gJiB7XG4gIHJlYWRvbmx5IGNvdW50OiBudW1iZXI7XG4gIHJlYWRvbmx5IHRvdGFsOiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NCYXIgPSBSZWFjdC5tZW1vKCh7IGNsYXNzTmFtZSwgY291bnQsIHRvdGFsIH06IFByb3BzKSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHN0eWxlcy5iYXNlLCBjbGFzc05hbWUpfT5cbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e3N0eWxlcy5iYXJ9XG4gICAgICBzdHlsZT17eyB3aWR0aDogYCR7TWF0aC5mbG9vcigoY291bnQgLyB0b3RhbCkgKiAxMDApfSVgIH19XG4gICAgLz5cbiAgPC9kaXY+XG4pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHdCQUF1QjtBQUV2QixhQUF3QjtBQU9qQixNQUFNLGNBQWMsTUFBTSxLQUFLLENBQUMsRUFBRSxXQUFXLE9BQU8sWUFDekQsb0NBQUM7QUFBQSxFQUFJLFdBQVcsK0JBQVcsT0FBTyxNQUFNLFNBQVM7QUFBQSxHQUMvQyxvQ0FBQztBQUFBLEVBQ0MsV0FBVyxPQUFPO0FBQUEsRUFDbEIsT0FBTyxFQUFFLE9BQU8sR0FBRyxLQUFLLE1BQU8sUUFBUSxRQUFTLEdBQUcsS0FBSztBQUFBLENBQzFELENBQ0YsQ0FDRDsiLAogICJuYW1lcyI6IFtdCn0K
