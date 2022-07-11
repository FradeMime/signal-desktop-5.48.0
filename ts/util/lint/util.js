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
var util_exports = {};
__export(util_exports, {
  ENCODING: () => ENCODING,
  loadJSON: () => loadJSON,
  sortExceptions: () => sortExceptions,
  writeExceptions: () => writeExceptions
});
module.exports = __toCommonJS(util_exports);
var import_fs_extra = require("fs-extra");
var import_lodash = require("lodash");
const ENCODING = "utf8";
const loadJSON = /* @__PURE__ */ __name((path) => (0, import_fs_extra.readJsonSync)(path), "loadJSON");
const writeExceptions = /* @__PURE__ */ __name((path, exceptions) => (0, import_fs_extra.writeJsonSync)(path, sortExceptions(exceptions), { spaces: 2 }), "writeExceptions");
const sortExceptions = /* @__PURE__ */ __name((exceptions) => (0, import_lodash.orderBy)(exceptions, [
  "path",
  "rule",
  "reasonCategory",
  "updated",
  "reasonDetail"
]), "sortExceptions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ENCODING,
  loadJSON,
  sortExceptions,
  writeExceptions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHJlYWRKc29uU3luYywgd3JpdGVKc29uU3luYyB9IGZyb20gJ2ZzLWV4dHJhJztcblxuaW1wb3J0IHsgb3JkZXJCeSB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgRXhjZXB0aW9uVHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgRU5DT0RJTkcgPSAndXRmOCc7XG5cbmV4cG9ydCBjb25zdCBsb2FkSlNPTiA9IDxUPihwYXRoOiBzdHJpbmcpOiBUID0+IHJlYWRKc29uU3luYyhwYXRoKTtcblxuZXhwb3J0IGNvbnN0IHdyaXRlRXhjZXB0aW9ucyA9IChcbiAgcGF0aDogc3RyaW5nLFxuICBleGNlcHRpb25zOiBSZWFkb25seUFycmF5PEV4Y2VwdGlvblR5cGU+XG4pOiB2b2lkID0+IHdyaXRlSnNvblN5bmMocGF0aCwgc29ydEV4Y2VwdGlvbnMoZXhjZXB0aW9ucyksIHsgc3BhY2VzOiAyIH0pO1xuXG5leHBvcnQgY29uc3Qgc29ydEV4Y2VwdGlvbnMgPSAoXG4gIGV4Y2VwdGlvbnM6IFJlYWRvbmx5QXJyYXk8RXhjZXB0aW9uVHlwZT5cbik6IEFycmF5PEV4Y2VwdGlvblR5cGU+ID0+XG4gIG9yZGVyQnkoZXhjZXB0aW9ucywgW1xuICAgICdwYXRoJyxcbiAgICAncnVsZScsXG4gICAgJ3JlYXNvbkNhdGVnb3J5JyxcbiAgICAndXBkYXRlZCcsXG4gICAgJ3JlYXNvbkRldGFpbCcsXG4gIF0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUE0QztBQUU1QyxvQkFBd0I7QUFJakIsTUFBTSxXQUFXO0FBRWpCLE1BQU0sV0FBVyx3QkFBSSxTQUFvQixrQ0FBYSxJQUFJLEdBQXpDO0FBRWpCLE1BQU0sa0JBQWtCLHdCQUM3QixNQUNBLGVBQ1MsbUNBQWMsTUFBTSxlQUFlLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBSHpDO0FBS3hCLE1BQU0saUJBQWlCLHdCQUM1QixlQUVBLDJCQUFRLFlBQVk7QUFBQSxFQUNsQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixDQUFDLEdBVDJCOyIsCiAgIm5hbWVzIjogW10KfQo=
