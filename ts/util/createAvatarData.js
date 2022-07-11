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
var createAvatarData_exports = {};
__export(createAvatarData_exports, {
  createAvatarData: () => createAvatarData
});
module.exports = __toCommonJS(createAvatarData_exports);
var import_uuid = require("uuid");
function createAvatarData(partialAvatarData) {
  return {
    id: (0, import_uuid.v4)(),
    ...partialAvatarData
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAvatarData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlQXZhdGFyRGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgdHlwZSB7IEF2YXRhckRhdGFUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF2YXRhckRhdGEoXG4gIHBhcnRpYWxBdmF0YXJEYXRhOiBSZWFkb25seTxPbWl0PEF2YXRhckRhdGFUeXBlLCAnaWQnPj5cbik6IEF2YXRhckRhdGFUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogdXVpZCgpLFxuICAgIC4uLnBhcnRpYWxBdmF0YXJEYXRhLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUEyQjtBQUdwQiwwQkFDTCxtQkFDZ0I7QUFDaEIsU0FBTztBQUFBLElBQ0wsSUFBSSxvQkFBSztBQUFBLE9BQ047QUFBQSxFQUNMO0FBQ0Y7QUFQZ0IiLAogICJuYW1lcyI6IFtdCn0K
