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
var useIsOnline_exports = {};
__export(useIsOnline_exports, {
  useIsOnline: () => useIsOnline
});
module.exports = __toCommonJS(useIsOnline_exports);
var import_react = require("react");
function useIsOnline() {
  const [isOnline, setIsOnline] = (0, import_react.useState)(navigator.onLine);
  (0, import_react.useEffect)(() => {
    const update = /* @__PURE__ */ __name(() => {
      setIsOnline(navigator.onLine);
    }, "update");
    update();
    window.addEventListener("offline", update);
    window.addEventListener("online", update);
    return () => {
      window.removeEventListener("offline", update);
      window.removeEventListener("online", update);
    };
  }, []);
  return isOnline;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useIsOnline
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlSXNPbmxpbmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUlzT25saW5lKCk6IGJvb2xlYW4ge1xuICBjb25zdCBbaXNPbmxpbmUsIHNldElzT25saW5lXSA9IHVzZVN0YXRlKG5hdmlnYXRvci5vbkxpbmUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgc2V0SXNPbmxpbmUobmF2aWdhdG9yLm9uTGluZSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZSgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29mZmxpbmUnLCB1cGRhdGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCB1cGRhdGUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgdXBkYXRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvbmxpbmUnLCB1cGRhdGUpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gaXNPbmxpbmU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQW9DO0FBRTdCLHVCQUFnQztBQUNyQyxRQUFNLENBQUMsVUFBVSxlQUFlLDJCQUFTLFVBQVUsTUFBTTtBQUV6RCw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxTQUFTLDZCQUFNO0FBQ25CLGtCQUFZLFVBQVUsTUFBTTtBQUFBLElBQzlCLEdBRmU7QUFJZixXQUFPO0FBRVAsV0FBTyxpQkFBaUIsV0FBVyxNQUFNO0FBQ3pDLFdBQU8saUJBQWlCLFVBQVUsTUFBTTtBQUV4QyxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixXQUFXLE1BQU07QUFDNUMsYUFBTyxvQkFBb0IsVUFBVSxNQUFNO0FBQUEsSUFDN0M7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUNUO0FBcEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
