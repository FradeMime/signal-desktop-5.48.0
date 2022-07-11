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
var useBoundActions_exports = {};
__export(useBoundActions_exports, {
  useBoundActions: () => useBoundActions
});
module.exports = __toCommonJS(useBoundActions_exports);
var import_redux = require("redux");
var import_react_redux = require("react-redux");
var import_react = require("react");
const useBoundActions = /* @__PURE__ */ __name((actions) => {
  const dispatch = (0, import_react_redux.useDispatch)();
  return (0, import_react.useMemo)(() => {
    return (0, import_redux.bindActionCreators)(actions, dispatch);
  }, [actions, dispatch]);
}, "useBoundActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBoundActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlQm91bmRBY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBBY3Rpb25DcmVhdG9yc01hcE9iamVjdCB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IHVzZUJvdW5kQWN0aW9ucyA9IDxUIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcnNNYXBPYmplY3Q+KFxuICBhY3Rpb25zOiBUXG4pOiBUID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbnMsIGRpc3BhdGNoKTtcbiAgfSwgW2FjdGlvbnMsIGRpc3BhdGNoXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFtQztBQUNuQyx5QkFBNEI7QUFDNUIsbUJBQXdCO0FBRWpCLE1BQU0sa0JBQWtCLHdCQUM3QixZQUNNO0FBQ04sUUFBTSxXQUFXLG9DQUFZO0FBRTdCLFNBQU8sMEJBQVEsTUFBTTtBQUNuQixXQUFPLHFDQUFtQixTQUFTLFFBQVE7QUFBQSxFQUM3QyxHQUFHLENBQUMsU0FBUyxRQUFRLENBQUM7QUFDeEIsR0FSK0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
