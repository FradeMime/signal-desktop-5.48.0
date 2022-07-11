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
var createStickerManager_exports = {};
__export(createStickerManager_exports, {
  createStickerManager: () => createStickerManager
});
module.exports = __toCommonJS(createStickerManager_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_StickerManager = require("../smart/StickerManager");
const createStickerManager = /* @__PURE__ */ __name((store) => /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
  store
}, /* @__PURE__ */ import_react.default.createElement(import_StickerManager.SmartStickerManager, null)), "createStickerManager");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStickerManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlU3RpY2tlck1hbmFnZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgdHlwZSB7IFN0b3JlIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBTbWFydFN0aWNrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc21hcnQvU3RpY2tlck1hbmFnZXInO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RpY2tlck1hbmFnZXIgPSAoc3RvcmU6IFN0b3JlKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IChcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPFNtYXJ0U3RpY2tlck1hbmFnZXIgLz5cbiAgPC9Qcm92aWRlcj5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHlCQUF5QjtBQUl6Qiw0QkFBb0M7QUFFN0IsTUFBTSx1QkFBdUIsd0JBQUMsVUFDbkMsbURBQUM7QUFBQSxFQUFTO0FBQUEsR0FDUixtREFBQywrQ0FBb0IsQ0FDdkIsR0FIa0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
