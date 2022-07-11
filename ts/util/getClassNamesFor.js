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
var getClassNamesFor_exports = {};
__export(getClassNamesFor_exports, {
  getClassNamesFor: () => getClassNamesFor
});
module.exports = __toCommonJS(getClassNamesFor_exports);
var import_classnames = __toESM(require("classnames"));
function getClassNamesFor(...modules) {
  return (modifier) => {
    const cx = modules.map((parentModule) => parentModule && modifier !== void 0 ? `${parentModule}${modifier}` : void 0);
    return (0, import_classnames.default)(cx);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getClassNamesFor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q2xhc3NOYW1lc0Zvci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzTmFtZXNGb3IoXG4gIC4uLm1vZHVsZXM6IEFycmF5PHN0cmluZyB8IHVuZGVmaW5lZD5cbik6IChtb2RpZmllcj86IHN0cmluZykgPT4gc3RyaW5nIHtcbiAgcmV0dXJuIG1vZGlmaWVyID0+IHtcbiAgICBjb25zdCBjeCA9IG1vZHVsZXMubWFwKHBhcmVudE1vZHVsZSA9PlxuICAgICAgcGFyZW50TW9kdWxlICYmIG1vZGlmaWVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBgJHtwYXJlbnRNb2R1bGV9JHttb2RpZmllcn1gXG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgKTtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyhjeCk7XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esd0JBQXVCO0FBRWhCLDZCQUNGLFNBQzRCO0FBQy9CLFNBQU8sY0FBWTtBQUNqQixVQUFNLEtBQUssUUFBUSxJQUFJLGtCQUNyQixnQkFBZ0IsYUFBYSxTQUN6QixHQUFHLGVBQWUsYUFDbEIsTUFDTjtBQUNBLFdBQU8sK0JBQVcsRUFBRTtBQUFBLEVBQ3RCO0FBQ0Y7QUFYZ0IiLAogICJuYW1lcyI6IFtdCn0K
