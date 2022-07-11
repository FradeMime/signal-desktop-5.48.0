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
var About_exports = {};
__export(About_exports, {
  About: () => About
});
module.exports = __toCommonJS(About_exports);
var import_react = __toESM(require("react"));
var import_Emojify = require("./Emojify");
const About = /* @__PURE__ */ __name(({
  className = "module-about__text",
  text
}) => {
  if (!text) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement("span", {
    className,
    dir: "auto"
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: text || ""
  }));
}, "About");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  About
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWJvdXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL0Vtb2ppZnknO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgdGV4dD86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBYm91dCA9ICh7XG4gIGNsYXNzTmFtZSA9ICdtb2R1bGUtYWJvdXRfX3RleHQnLFxuICB0ZXh0LFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgaWYgKCF0ZXh0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBkaXI9XCJhdXRvXCI+XG4gICAgICA8RW1vamlmeSB0ZXh0PXt0ZXh0IHx8ICcnfSAvPlxuICAgIDwvc3Bhbj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLHFCQUF3QjtBQU9qQixNQUFNLFFBQVEsd0JBQUM7QUFBQSxFQUNwQixZQUFZO0FBQUEsRUFDWjtBQUFBLE1BQ21DO0FBQ25DLE1BQUksQ0FBQyxNQUFNO0FBQ1QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFBSztBQUFBLElBQXNCLEtBQUk7QUFBQSxLQUM5QixtREFBQztBQUFBLElBQVEsTUFBTSxRQUFRO0FBQUEsR0FBSSxDQUM3QjtBQUVKLEdBYnFCOyIsCiAgIm5hbWVzIjogW10KfQo=
