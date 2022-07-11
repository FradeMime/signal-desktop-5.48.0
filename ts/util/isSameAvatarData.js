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
var isSameAvatarData_exports = {};
__export(isSameAvatarData_exports, {
  isSameAvatarData: () => isSameAvatarData
});
module.exports = __toCommonJS(isSameAvatarData_exports);
function isSameAvatarData(a, b) {
  if (!a || !b) {
    return false;
  }
  if (a.buffer && b.buffer) {
    return a.buffer === b.buffer;
  }
  if (a.imagePath && b.imagePath) {
    return a.imagePath === b.imagePath;
  }
  return a.id === b.id;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isSameAvatarData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNTYW1lQXZhdGFyRGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEF2YXRhckRhdGFUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZUF2YXRhckRhdGEoXG4gIGE/OiBBdmF0YXJEYXRhVHlwZSxcbiAgYj86IEF2YXRhckRhdGFUeXBlXG4pOiBib29sZWFuIHtcbiAgaWYgKCFhIHx8ICFiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChhLmJ1ZmZlciAmJiBiLmJ1ZmZlcikge1xuICAgIHJldHVybiBhLmJ1ZmZlciA9PT0gYi5idWZmZXI7XG4gIH1cbiAgaWYgKGEuaW1hZ2VQYXRoICYmIGIuaW1hZ2VQYXRoKSB7XG4gICAgcmV0dXJuIGEuaW1hZ2VQYXRoID09PSBiLmltYWdlUGF0aDtcbiAgfVxuICByZXR1cm4gYS5pZCA9PT0gYi5pZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLTywwQkFDTCxHQUNBLEdBQ1M7QUFDVCxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7QUFDWixXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksRUFBRSxVQUFVLEVBQUUsUUFBUTtBQUN4QixXQUFPLEVBQUUsV0FBVyxFQUFFO0FBQUEsRUFDeEI7QUFDQSxNQUFJLEVBQUUsYUFBYSxFQUFFLFdBQVc7QUFDOUIsV0FBTyxFQUFFLGNBQWMsRUFBRTtBQUFBLEVBQzNCO0FBQ0EsU0FBTyxFQUFFLE9BQU8sRUFBRTtBQUNwQjtBQWRnQiIsCiAgIm5hbWVzIjogW10KfQo=
