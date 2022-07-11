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
var ProgressDialog_exports = {};
__export(ProgressDialog_exports, {
  ProgressDialog: () => ProgressDialog
});
module.exports = __toCommonJS(ProgressDialog_exports);
var React = __toESM(require("react"));
var import_Spinner = require("./Spinner");
const ProgressDialog = React.memo(({ i18n }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "module-progress-dialog"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-progress-dialog__spinner"
  }, /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
    svgSize: "normal",
    size: "39px",
    direction: "on-progress-dialog"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-progress-dialog__text"
  }, i18n("updating")));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProgressDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZ3Jlc3NEaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi9TcGlubmVyJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuLy8gVE9ETzogVGhpcyBzaG91bGQgdXNlIDxNb2RhbD4uIFNlZSBERVNLVE9QLTEwMzguXG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NEaWFsb2cgPSBSZWFjdC5tZW1vKCh7IGkxOG4gfTogUHJvcHNUeXBlKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtcHJvZ3Jlc3MtZGlhbG9nXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1wcm9ncmVzcy1kaWFsb2dfX3NwaW5uZXJcIj5cbiAgICAgICAgPFNwaW5uZXIgc3ZnU2l6ZT1cIm5vcm1hbFwiIHNpemU9XCIzOXB4XCIgZGlyZWN0aW9uPVwib24tcHJvZ3Jlc3MtZGlhbG9nXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtcHJvZ3Jlc3MtZGlhbG9nX190ZXh0XCI+e2kxOG4oJ3VwZGF0aW5nJyl9PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHFCQUF3QjtBQU9qQixNQUFNLGlCQUFpQixNQUFNLEtBQUssQ0FBQyxFQUFFLFdBQXNCO0FBQ2hFLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixvQ0FBQztBQUFBLElBQVEsU0FBUTtBQUFBLElBQVMsTUFBSztBQUFBLElBQU8sV0FBVTtBQUFBLEdBQXFCLENBQ3ZFLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUFnQyxLQUFLLFVBQVUsQ0FBRSxDQUNsRTtBQUVKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
