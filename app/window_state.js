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
var window_state_exports = {};
__export(window_state_exports, {
  markReadyForShutdown: () => markReadyForShutdown,
  markShouldQuit: () => markShouldQuit,
  readyForShutdown: () => readyForShutdown,
  shouldQuit: () => shouldQuit
});
module.exports = __toCommonJS(window_state_exports);
let shouldQuitFlag = false;
function markShouldQuit() {
  shouldQuitFlag = true;
}
function shouldQuit() {
  return shouldQuitFlag;
}
let isReadyForShutdown = false;
function markReadyForShutdown() {
  isReadyForShutdown = true;
}
function readyForShutdown() {
  return isReadyForShutdown;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  markReadyForShutdown,
  markShouldQuit,
  readyForShutdown,
  shouldQuit
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2luZG93X3N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxubGV0IHNob3VsZFF1aXRGbGFnID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrU2hvdWxkUXVpdCgpOiB2b2lkIHtcbiAgc2hvdWxkUXVpdEZsYWcgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkUXVpdCgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHNob3VsZFF1aXRGbGFnO1xufVxuXG5sZXQgaXNSZWFkeUZvclNodXRkb3duID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrUmVhZHlGb3JTaHV0ZG93bigpOiB2b2lkIHtcbiAgaXNSZWFkeUZvclNodXRkb3duID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5Rm9yU2h1dGRvd24oKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc1JlYWR5Rm9yU2h1dGRvd247XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsSUFBSSxpQkFBaUI7QUFFZCwwQkFBZ0M7QUFDckMsbUJBQWlCO0FBQ25CO0FBRmdCLEFBSVQsc0JBQStCO0FBQ3BDLFNBQU87QUFDVDtBQUZnQixBQUloQixJQUFJLHFCQUFxQjtBQUVsQixnQ0FBc0M7QUFDM0MsdUJBQXFCO0FBQ3ZCO0FBRmdCLEFBSVQsNEJBQXFDO0FBQzFDLFNBQU87QUFDVDtBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
