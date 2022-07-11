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
var deleteAllData_exports = {};
__export(deleteAllData_exports, {
  deleteAllData: () => deleteAllData
});
module.exports = __toCommonJS(deleteAllData_exports);
var log = __toESM(require("../logging/log"));
var import_deleteAllLogs = require("../util/deleteAllLogs");
async function deleteAllData() {
  try {
    await (0, import_deleteAllLogs.deleteAllLogs)();
    log.info("deleteAllData: deleted all logs");
    await window.Signal.Data.removeAll();
    log.info("deleteAllData: emptied database");
    await window.Signal.Data.close();
    log.info("deleteAllData: closed database");
    await window.Signal.Data.removeDB();
    log.info("deleteAllData: removed database");
    await window.Signal.Data.removeOtherData();
    log.info("deleteAllData: removed all other data");
  } catch (error) {
    log.error("Something went wrong deleting all data:", error && error.stack ? error.stack : error);
  }
  window.restart();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteAllData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVsZXRlQWxsRGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgZGVsZXRlQWxsTG9ncyB9IGZyb20gJy4uL3V0aWwvZGVsZXRlQWxsTG9ncyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBbGxEYXRhKCk6IFByb21pc2U8dm9pZD4ge1xuICB0cnkge1xuICAgIGF3YWl0IGRlbGV0ZUFsbExvZ3MoKTtcblxuICAgIGxvZy5pbmZvKCdkZWxldGVBbGxEYXRhOiBkZWxldGVkIGFsbCBsb2dzJyk7XG5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlQWxsKCk7XG5cbiAgICBsb2cuaW5mbygnZGVsZXRlQWxsRGF0YTogZW1wdGllZCBkYXRhYmFzZScpO1xuXG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNsb3NlKCk7XG5cbiAgICBsb2cuaW5mbygnZGVsZXRlQWxsRGF0YTogY2xvc2VkIGRhdGFiYXNlJyk7XG5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlREIoKTtcblxuICAgIGxvZy5pbmZvKCdkZWxldGVBbGxEYXRhOiByZW1vdmVkIGRhdGFiYXNlJyk7XG5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlT3RoZXJEYXRhKCk7XG5cbiAgICBsb2cuaW5mbygnZGVsZXRlQWxsRGF0YTogcmVtb3ZlZCBhbGwgb3RoZXIgZGF0YScpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyBkZWxldGluZyBhbGwgZGF0YTonLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgfVxuICB3aW5kb3cucmVzdGFydCgpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFVBQXFCO0FBQ3JCLDJCQUE4QjtBQUU5QiwrQkFBcUQ7QUFDbkQsTUFBSTtBQUNGLFVBQU0sd0NBQWM7QUFFcEIsUUFBSSxLQUFLLGlDQUFpQztBQUUxQyxVQUFNLE9BQU8sT0FBTyxLQUFLLFVBQVU7QUFFbkMsUUFBSSxLQUFLLGlDQUFpQztBQUUxQyxVQUFNLE9BQU8sT0FBTyxLQUFLLE1BQU07QUFFL0IsUUFBSSxLQUFLLGdDQUFnQztBQUV6QyxVQUFNLE9BQU8sT0FBTyxLQUFLLFNBQVM7QUFFbEMsUUFBSSxLQUFLLGlDQUFpQztBQUUxQyxVQUFNLE9BQU8sT0FBTyxLQUFLLGdCQUFnQjtBQUV6QyxRQUFJLEtBQUssdUNBQXVDO0FBQUEsRUFDbEQsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUNGLDJDQUNBLFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUN2QztBQUFBLEVBQ0Y7QUFDQSxTQUFPLFFBQVE7QUFDakI7QUE1QnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
