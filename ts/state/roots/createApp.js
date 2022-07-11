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
var createApp_exports = {};
__export(createApp_exports, {
  createApp: () => createApp
});
module.exports = __toCommonJS(createApp_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_App = require("../smart/App");
var import_GlobalAudioProvider = require("../smart/GlobalAudioProvider");
const createApp = /* @__PURE__ */ __name((store) => /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
  store
}, /* @__PURE__ */ import_react.default.createElement(import_GlobalAudioProvider.SmartGlobalAudioProvider, null, /* @__PURE__ */ import_react.default.createElement(import_App.SmartApp, null))), "createApp");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createApp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHR5cGUgeyBTdG9yZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgU21hcnRBcHAgfSBmcm9tICcuLi9zbWFydC9BcHAnO1xuaW1wb3J0IHsgU21hcnRHbG9iYWxBdWRpb1Byb3ZpZGVyIH0gZnJvbSAnLi4vc21hcnQvR2xvYmFsQXVkaW9Qcm92aWRlcic7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcHAgPSAoc3RvcmU6IFN0b3JlKTogUmVhY3RFbGVtZW50ID0+IChcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPFNtYXJ0R2xvYmFsQXVkaW9Qcm92aWRlcj5cbiAgICAgIDxTbWFydEFwcCAvPlxuICAgIDwvU21hcnRHbG9iYWxBdWRpb1Byb3ZpZGVyPlxuICA8L1Byb3ZpZGVyPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIseUJBQXlCO0FBSXpCLGlCQUF5QjtBQUN6QixpQ0FBeUM7QUFFbEMsTUFBTSxZQUFZLHdCQUFDLFVBQ3hCLG1EQUFDO0FBQUEsRUFBUztBQUFBLEdBQ1IsbURBQUMsMkRBQ0MsbURBQUMseUJBQVMsQ0FDWixDQUNGLEdBTHVCOyIsCiAgIm5hbWVzIjogW10KfQo=
