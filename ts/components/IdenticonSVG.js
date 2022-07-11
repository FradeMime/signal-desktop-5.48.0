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
var IdenticonSVG_exports = {};
__export(IdenticonSVG_exports, {
  IdenticonSVG: () => IdenticonSVG
});
module.exports = __toCommonJS(IdenticonSVG_exports);
var import_react = __toESM(require("react"));
function IdenticonSVG({
  backgroundColor,
  content,
  foregroundColor
}) {
  return /* @__PURE__ */ import_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "100",
    height: "100"
  }, /* @__PURE__ */ import_react.default.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    fill: backgroundColor
  }), /* @__PURE__ */ import_react.default.createElement("text", {
    baselineShift: "-8px",
    fill: foregroundColor,
    fontFamily: "sans-serif",
    fontSize: "24px",
    textAnchor: "middle",
    x: "50",
    y: "50"
  }, content));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IdenticonSVG
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSWRlbnRpY29uU1ZHLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGZvcmVncm91bmRDb2xvcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIElkZW50aWNvblNWRyh7XG4gIGJhY2tncm91bmRDb2xvcixcbiAgY29udGVudCxcbiAgZm9yZWdyb3VuZENvbG9yLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQge1xuICByZXR1cm4gKFxuICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCI+XG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgZmlsbD17YmFja2dyb3VuZENvbG9yfSAvPlxuICAgICAgPHRleHRcbiAgICAgICAgYmFzZWxpbmVTaGlmdD1cIi04cHhcIlxuICAgICAgICBmaWxsPXtmb3JlZ3JvdW5kQ29sb3J9XG4gICAgICAgIGZvbnRGYW1pbHk9XCJzYW5zLXNlcmlmXCJcbiAgICAgICAgZm9udFNpemU9XCIyNHB4XCJcbiAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgIHg9XCI1MFwiXG4gICAgICAgIHk9XCI1MFwiXG4gICAgICA+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC90ZXh0PlxuICAgIDwvc3ZnPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQVFYLHNCQUFzQjtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUN5QjtBQUN6QixTQUNFLG1EQUFDO0FBQUEsSUFBSSxPQUFNO0FBQUEsSUFBNkIsT0FBTTtBQUFBLElBQU0sUUFBTztBQUFBLEtBQ3pELG1EQUFDO0FBQUEsSUFBTyxJQUFHO0FBQUEsSUFBSyxJQUFHO0FBQUEsSUFBSyxHQUFFO0FBQUEsSUFBSyxNQUFNO0FBQUEsR0FBaUIsR0FDdEQsbURBQUM7QUFBQSxJQUNDLGVBQWM7QUFBQSxJQUNkLE1BQU07QUFBQSxJQUNOLFlBQVc7QUFBQSxJQUNYLFVBQVM7QUFBQSxJQUNULFlBQVc7QUFBQSxJQUNYLEdBQUU7QUFBQSxJQUNGLEdBQUU7QUFBQSxLQUVELE9BQ0gsQ0FDRjtBQUVKO0FBckJnQiIsCiAgIm5hbWVzIjogW10KfQo=
