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
var useUniqueId_exports = {};
__export(useUniqueId_exports, {
  useUniqueId: () => useUniqueId
});
module.exports = __toCommonJS(useUniqueId_exports);
var import_react = require("react");
var import_uuid = require("uuid");
function useUniqueId() {
  return (0, import_react.useMemo)(() => (0, import_uuid.v4)(), []);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useUniqueId
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlVW5pcXVlSWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVVuaXF1ZUlkKCk6IHN0cmluZyB7XG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHV1aWQoKSwgW10pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF3QjtBQUN4QixrQkFBMkI7QUFFcEIsdUJBQStCO0FBQ3BDLFNBQU8sMEJBQVEsTUFBTSxvQkFBSyxHQUFHLENBQUMsQ0FBQztBQUNqQztBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
