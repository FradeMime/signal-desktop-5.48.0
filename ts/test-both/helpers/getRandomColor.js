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
var getRandomColor_exports = {};
__export(getRandomColor_exports, {
  getRandomColor: () => getRandomColor
});
module.exports = __toCommonJS(getRandomColor_exports);
var import_lodash = require("lodash");
var import_Colors = require("../../types/Colors");
function getRandomColor() {
  return (0, import_lodash.sample)(import_Colors.AvatarColors) || import_Colors.AvatarColors[0];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRandomColor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0UmFuZG9tQ29sb3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgc2FtcGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpOiBBdmF0YXJDb2xvclR5cGUge1xuICByZXR1cm4gc2FtcGxlKEF2YXRhckNvbG9ycykgfHwgQXZhdGFyQ29sb3JzWzBdO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF1QjtBQUV2QixvQkFBNkI7QUFFdEIsMEJBQTJDO0FBQ2hELFNBQU8sMEJBQU8sMEJBQVksS0FBSywyQkFBYTtBQUM5QztBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
