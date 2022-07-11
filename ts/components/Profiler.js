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
var Profiler_exports = {};
__export(Profiler_exports, {
  Profiler: () => Profiler
});
module.exports = __toCommonJS(Profiler_exports);
var import_react = __toESM(require("react"));
var log = __toESM(require("../logging/log"));
const Fallback = /* @__PURE__ */ __name(({ children }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
}, "Fallback");
const BaseProfiler = import_react.default.unstable_Profiler || Fallback;
const onRender = /* @__PURE__ */ __name((id, phase, actual, base, start, commit) => {
  log.info(`Profiler.tsx(${id}): actual=${actual.toFixed(1)}ms phase=${phase} base=${base.toFixed(1)}ms start=${start.toFixed(1)}ms commit=${commit.toFixed(1)}ms`);
}, "onRender");
const Profiler = /* @__PURE__ */ __name(({ id, children }) => {
  return /* @__PURE__ */ import_react.default.createElement(BaseProfiler, {
    id,
    onRender
  }, children);
}, "Profiler");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Profiler
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZmlsZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbnR5cGUgSW50ZXJuYWxQcm9wc1R5cGUgPSBSZWFkb25seTx7XG4gIGlkOiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG5cbiAgb25SZW5kZXIoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwaGFzZTogJ21vdW50JyB8ICd1cGRhdGUnLFxuICAgIGFjdHVhbER1cmF0aW9uOiBudW1iZXIsXG4gICAgYmFzZUR1cmF0aW9uOiBudW1iZXIsXG4gICAgc3RhcnRUaW1lOiBudW1iZXIsXG4gICAgY29tbWl0VGltZTogbnVtYmVyLFxuICAgIGludGVyYWN0aW9uczogU2V0PHVua25vd24+XG4gICk6IHZvaWQ7XG59PjtcblxuY29uc3QgRmFsbGJhY2s6IFJlYWN0LkZDPEludGVybmFsUHJvcHNUeXBlPiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgcmV0dXJuIDw+e2NoaWxkcmVufTwvPjtcbn07XG5cbmNvbnN0IEJhc2VQcm9maWxlcjogUmVhY3QuRkM8SW50ZXJuYWxQcm9wc1R5cGU+ID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKFJlYWN0IGFzIGFueSkudW5zdGFibGVfUHJvZmlsZXIgfHwgRmFsbGJhY2s7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFJlYWRvbmx5PHtcbiAgaWQ6IHN0cmluZztcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbn0+O1xuXG5jb25zdCBvblJlbmRlcjogSW50ZXJuYWxQcm9wc1R5cGVbJ29uUmVuZGVyJ10gPSAoXG4gIGlkLFxuICBwaGFzZSxcbiAgYWN0dWFsLFxuICBiYXNlLFxuICBzdGFydCxcbiAgY29tbWl0XG4pID0+IHtcbiAgbG9nLmluZm8oXG4gICAgYFByb2ZpbGVyLnRzeCgke2lkfSk6IGFjdHVhbD0ke2FjdHVhbC50b0ZpeGVkKDEpfW1zIHBoYXNlPSR7cGhhc2V9IGAgK1xuICAgICAgYGJhc2U9JHtiYXNlLnRvRml4ZWQoMSl9bXMgc3RhcnQ9JHtzdGFydC50b0ZpeGVkKDEpfW1zIGAgK1xuICAgICAgYGNvbW1pdD0ke2NvbW1pdC50b0ZpeGVkKDEpfW1zYFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFByb2ZpbGVyOiBSZWFjdC5GQzxQcm9wc1R5cGU+ID0gKHsgaWQsIGNoaWxkcmVuIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8QmFzZVByb2ZpbGVyIGlkPXtpZH0gb25SZW5kZXI9e29uUmVuZGVyfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0Jhc2VQcm9maWxlcj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBQ2xCLFVBQXFCO0FBaUJyQixNQUFNLFdBQXdDLHdCQUFDLEVBQUUsZUFBZTtBQUM5RCxTQUFPLHdGQUFHLFFBQVM7QUFDckIsR0FGOEM7QUFJOUMsTUFBTSxlQUVILHFCQUFjLHFCQUFxQjtBQU90QyxNQUFNLFdBQTBDLHdCQUM5QyxJQUNBLE9BQ0EsUUFDQSxNQUNBLE9BQ0EsV0FDRztBQUNILE1BQUksS0FDRixnQkFBZ0IsZUFBZSxPQUFPLFFBQVEsQ0FBQyxhQUFhLGNBQ2xELEtBQUssUUFBUSxDQUFDLGFBQWEsTUFBTSxRQUFRLENBQUMsY0FDeEMsT0FBTyxRQUFRLENBQUMsS0FDOUI7QUFDRixHQWJnRDtBQWV6QyxNQUFNLFdBQWdDLHdCQUFDLEVBQUUsSUFBSSxlQUFlO0FBQ2pFLFNBQ0UsbURBQUM7QUFBQSxJQUFhO0FBQUEsSUFBUTtBQUFBLEtBQ25CLFFBQ0g7QUFFSixHQU42QzsiLAogICJuYW1lcyI6IFtdCn0K
