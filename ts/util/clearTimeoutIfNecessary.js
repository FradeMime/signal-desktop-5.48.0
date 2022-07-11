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
var clearTimeoutIfNecessary_exports = {};
__export(clearTimeoutIfNecessary_exports, {
  clearTimeoutIfNecessary: () => clearTimeoutIfNecessary
});
module.exports = __toCommonJS(clearTimeoutIfNecessary_exports);
function clearTimeoutIfNecessary(timeout) {
  if (timeout) {
    clearTimeout(timeout);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearTimeoutIfNecessary
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KFxuICB0aW1lb3V0OiB1bmRlZmluZWQgfCBudWxsIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD5cbik6IHZvaWQge1xuICBpZiAodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLGlDQUNMLFNBQ007QUFDTixNQUFJLFNBQVM7QUFDWCxpQkFBYSxPQUFPO0FBQUEsRUFDdEI7QUFDRjtBQU5nQiIsCiAgIm5hbWVzIjogW10KfQo=
