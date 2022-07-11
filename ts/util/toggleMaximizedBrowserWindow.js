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
var toggleMaximizedBrowserWindow_exports = {};
__export(toggleMaximizedBrowserWindow_exports, {
  toggleMaximizedBrowserWindow: () => toggleMaximizedBrowserWindow
});
module.exports = __toCommonJS(toggleMaximizedBrowserWindow_exports);
function toggleMaximizedBrowserWindow(browserWindow) {
  if (browserWindow.isMaximized()) {
    browserWindow.unmaximize();
  } else {
    browserWindow.maximize();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toggleMaximizedBrowserWindow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidG9nZ2xlTWF4aW1pemVkQnJvd3NlcldpbmRvdy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVNYXhpbWl6ZWRCcm93c2VyV2luZG93KFxuICBicm93c2VyV2luZG93OiBCcm93c2VyV2luZG93XG4pOiB2b2lkIHtcbiAgaWYgKGJyb3dzZXJXaW5kb3cuaXNNYXhpbWl6ZWQoKSkge1xuICAgIGJyb3dzZXJXaW5kb3cudW5tYXhpbWl6ZSgpO1xuICB9IGVsc2Uge1xuICAgIGJyb3dzZXJXaW5kb3cubWF4aW1pemUoKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtPLHNDQUNMLGVBQ007QUFDTixNQUFJLGNBQWMsWUFBWSxHQUFHO0FBQy9CLGtCQUFjLFdBQVc7QUFBQSxFQUMzQixPQUFPO0FBQ0wsa0JBQWMsU0FBUztBQUFBLEVBQ3pCO0FBQ0Y7QUFSZ0IiLAogICJuYW1lcyI6IFtdCn0K
