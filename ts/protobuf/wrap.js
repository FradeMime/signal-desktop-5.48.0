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
var wrap_exports = {};
__export(wrap_exports, {
  default: () => wrap_default
});
module.exports = __toCommonJS(wrap_exports);
var protobuf = __toESM(require("protobufjs/minimal"));
var import_long = __toESM(require("long"));
protobuf.util.Long = import_long.default;
protobuf.configure();
var wrap_default = protobuf;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JhcC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBwcm90b2J1ZiBmcm9tICdwcm90b2J1ZmpzL21pbmltYWwnO1xuaW1wb3J0IExvbmcgZnJvbSAnbG9uZyc7XG5cbnByb3RvYnVmLnV0aWwuTG9uZyA9IExvbmc7XG5wcm90b2J1Zi5jb25maWd1cmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvdG9idWY7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxlQUEwQjtBQUMxQixrQkFBaUI7QUFFakIsU0FBUyxLQUFLLE9BQU87QUFDckIsU0FBUyxVQUFVO0FBRW5CLElBQU8sZUFBUTsiLAogICJuYW1lcyI6IFtdCn0K
