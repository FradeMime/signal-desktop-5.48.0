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
var migrateColor_exports = {};
__export(migrateColor_exports, {
  migrateColor: () => migrateColor
});
module.exports = __toCommonJS(migrateColor_exports);
var import_lodash = require("lodash");
var import_Colors = require("../types/Colors");
const NEW_COLOR_NAMES = new Set(import_Colors.AvatarColors);
function migrateColor(color) {
  if (color && NEW_COLOR_NAMES.has(color)) {
    return color;
  }
  return (0, import_lodash.sample)(import_Colors.AvatarColors) || import_Colors.AvatarColors[0];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  migrateColor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWlncmF0ZUNvbG9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgc2FtcGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5cbmNvbnN0IE5FV19DT0xPUl9OQU1FUyA9IG5ldyBTZXQoQXZhdGFyQ29sb3JzKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1pZ3JhdGVDb2xvcihjb2xvcj86IHN0cmluZyk6IEF2YXRhckNvbG9yVHlwZSB7XG4gIGlmIChjb2xvciAmJiBORVdfQ09MT1JfTkFNRVMuaGFzKGNvbG9yKSkge1xuICAgIHJldHVybiBjb2xvcjtcbiAgfVxuXG4gIHJldHVybiBzYW1wbGUoQXZhdGFyQ29sb3JzKSB8fCBBdmF0YXJDb2xvcnNbMF07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBRXZCLG9CQUE2QjtBQUU3QixNQUFNLGtCQUFrQixJQUFJLElBQUksMEJBQVk7QUFFckMsc0JBQXNCLE9BQWlDO0FBQzVELE1BQUksU0FBUyxnQkFBZ0IsSUFBSSxLQUFLLEdBQUc7QUFDdkMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLDBCQUFPLDBCQUFZLEtBQUssMkJBQWE7QUFDOUM7QUFOZ0IiLAogICJuYW1lcyI6IFtdCn0K
