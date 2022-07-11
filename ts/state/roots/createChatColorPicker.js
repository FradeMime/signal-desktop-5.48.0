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
var createChatColorPicker_exports = {};
__export(createChatColorPicker_exports, {
  createChatColorPicker: () => createChatColorPicker
});
module.exports = __toCommonJS(createChatColorPicker_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_ChatColorPicker = require("../smart/ChatColorPicker");
const createChatColorPicker = /* @__PURE__ */ __name((store, props) => /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
  store
}, /* @__PURE__ */ import_react.default.createElement(import_ChatColorPicker.SmartChatColorPicker, {
  ...props
})), "createChatColorPicker");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createChatColorPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlQ2hhdENvbG9yUGlja2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU21hcnRDaGF0Q29sb3JQaWNrZXJQcm9wcyB9IGZyb20gJy4uL3NtYXJ0L0NoYXRDb2xvclBpY2tlcic7XG5pbXBvcnQgeyBTbWFydENoYXRDb2xvclBpY2tlciB9IGZyb20gJy4uL3NtYXJ0L0NoYXRDb2xvclBpY2tlcic7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDaGF0Q29sb3JQaWNrZXIgPSAoXG4gIHN0b3JlOiBTdG9yZSxcbiAgcHJvcHM6IFNtYXJ0Q2hhdENvbG9yUGlja2VyUHJvcHNcbik6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiAoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxTbWFydENoYXRDb2xvclBpY2tlciB7Li4ucHJvcHN9IC8+XG4gIDwvUHJvdmlkZXI+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix5QkFBeUI7QUFLekIsNkJBQXFDO0FBRTlCLE1BQU0sd0JBQXdCLHdCQUNuQyxPQUNBLFVBRUEsbURBQUM7QUFBQSxFQUFTO0FBQUEsR0FDUixtREFBQztBQUFBLEtBQXlCO0FBQUEsQ0FBTyxDQUNuQyxHQU5tQzsiLAogICJuYW1lcyI6IFtdCn0K
