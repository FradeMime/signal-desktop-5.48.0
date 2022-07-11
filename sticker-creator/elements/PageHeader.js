var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var PageHeader_exports = {};
__export(PageHeader_exports, {
  PageHeader: () => PageHeader
});
module.exports = __toCommonJS(PageHeader_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./PageHeader.scss"));
var import_Typography = require("./Typography");
const PageHeader = React.memo(({ children }) => /* @__PURE__ */ React.createElement(import_Typography.H1, {
  className: styles.base
}, children));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PageHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGFnZUhlYWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9QYWdlSGVhZGVyLnNjc3MnO1xuaW1wb3J0IHsgSDEgfSBmcm9tICcuL1R5cG9ncmFwaHknO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCBQYWdlSGVhZGVyID0gUmVhY3QubWVtbygoeyBjaGlsZHJlbiB9OiBQcm9wcykgPT4gKFxuICA8SDEgY2xhc3NOYW1lPXtzdHlsZXMuYmFzZX0+e2NoaWxkcmVufTwvSDE+XG4pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLGFBQXdCO0FBQ3hCLHdCQUFtQjtBQU1aLE1BQU0sYUFBYSxNQUFNLEtBQUssQ0FBQyxFQUFFLGVBQ3RDLG9DQUFDO0FBQUEsRUFBRyxXQUFXLE9BQU87QUFBQSxHQUFPLFFBQVMsQ0FDdkM7IiwKICAibmFtZXMiOiBbXQp9Cg==
