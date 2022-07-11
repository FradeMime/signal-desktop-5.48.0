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
var ClearingData_exports = {};
__export(ClearingData_exports, {
  ClearingData: () => ClearingData
});
module.exports = __toCommonJS(ClearingData_exports);
var import_react = __toESM(require("react"));
function ClearingData({ deleteAllData, i18n }) {
  (0, import_react.useEffect)(() => {
    deleteAllData();
  }, [deleteAllData]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "full-screen-flow overlay"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "step"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "inner"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "step-body"
  }, /* @__PURE__ */ import_react.default.createElement("span", {
    className: "banner-icon delete"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "header"
  }, i18n("deleteAllDataProgress"))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "progress"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "bar-container"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "bar progress-bar progress-bar-striped active"
  }))))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClearingData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2xlYXJpbmdEYXRhLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgZGVsZXRlQWxsRGF0YTogKCkgPT4gdm9pZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBDbGVhcmluZ0RhdGEoeyBkZWxldGVBbGxEYXRhLCBpMThuIH06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkZWxldGVBbGxEYXRhKCk7XG4gIH0sIFtkZWxldGVBbGxEYXRhXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bGwtc2NyZWVuLWZsb3cgb3ZlcmxheVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtYm9keVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmFubmVyLWljb24gZGVsZXRlXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+e2kxOG4oJ2RlbGV0ZUFsbERhdGFQcm9ncmVzcycpfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhciBwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN0cmlwZWQgYWN0aXZlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFpQztBQVExQixzQkFBc0IsRUFBRSxlQUFlLFFBQWdDO0FBQzVFLDhCQUFVLE1BQU07QUFDZCxrQkFBYztBQUFBLEVBQ2hCLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFbEIsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFLLFdBQVU7QUFBQSxHQUFxQixHQUNyQyxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQVUsS0FBSyx1QkFBdUIsQ0FBRSxDQUN6RCxHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxHQUErQyxDQUNoRSxDQUNGLENBQ0YsQ0FDRixDQUNGO0FBRUo7QUF0QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
