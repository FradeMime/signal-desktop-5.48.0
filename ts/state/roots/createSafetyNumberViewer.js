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
var createSafetyNumberViewer_exports = {};
__export(createSafetyNumberViewer_exports, {
  createSafetyNumberViewer: () => createSafetyNumberViewer
});
module.exports = __toCommonJS(createSafetyNumberViewer_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_SafetyNumberViewer = require("../smart/SafetyNumberViewer");
const createSafetyNumberViewer = /* @__PURE__ */ __name((store, props) => /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
  store
}, /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberViewer.SmartSafetyNumberViewer, {
  ...props
})), "createSafetyNumberViewer");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSafetyNumberViewer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlU2FmZXR5TnVtYmVyVmlld2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHR5cGUgeyBTdG9yZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHR5cGUgeyBTYWZldHlOdW1iZXJQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nJztcbmltcG9ydCB7IFNtYXJ0U2FmZXR5TnVtYmVyVmlld2VyIH0gZnJvbSAnLi4vc21hcnQvU2FmZXR5TnVtYmVyVmlld2VyJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNhZmV0eU51bWJlclZpZXdlciA9IChcbiAgc3RvcmU6IFN0b3JlLFxuICBwcm9wczogU2FmZXR5TnVtYmVyUHJvcHNcbik6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiAoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxTbWFydFNhZmV0eU51bWJlclZpZXdlciB7Li4ucHJvcHN9IC8+XG4gIDwvUHJvdmlkZXI+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix5QkFBeUI7QUFLekIsZ0NBQXdDO0FBRWpDLE1BQU0sMkJBQTJCLHdCQUN0QyxPQUNBLFVBRUEsbURBQUM7QUFBQSxFQUFTO0FBQUEsR0FDUixtREFBQztBQUFBLEtBQTRCO0FBQUEsQ0FBTyxDQUN0QyxHQU5zQzsiLAogICJuYW1lcyI6IFtdCn0K
