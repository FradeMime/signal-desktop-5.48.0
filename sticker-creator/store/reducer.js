var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var reducer_exports = {};
__export(reducer_exports, {
  reducer: () => reducer
});
module.exports = __toCommonJS(reducer_exports);
var import_redux = require("redux");
var import_stickers = require("./ducks/stickers");
const reducer = (0, import_redux.combineReducers)({
  stickers: import_stickers.reducer
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVkdWNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHJlZHVjZXIgYXMgc3RpY2tlcnMgfSBmcm9tICcuL2R1Y2tzL3N0aWNrZXJzJztcblxuZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBzdGlja2Vycyxcbn0pO1xuXG5leHBvcnQgdHlwZSBBcHBTdGF0ZSA9IHR5cGVvZiByZWR1Y2VyIGV4dGVuZHMgUmVkdWNlcjxpbmZlciBVPiA/IFUgOiBuZXZlcjtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFnQztBQUNoQyxzQkFBb0M7QUFFN0IsTUFBTSxVQUFVLGtDQUFnQjtBQUFBLEVBQ3JDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
