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
var StoryRow_exports = {};
__export(StoryRow_exports, {
  StoryRow: () => StoryRow
});
module.exports = __toCommonJS(StoryRow_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./StoryRow.scss"));
const getClassName = /* @__PURE__ */ __name(({ left, right, top, bottom }) => {
  if (left) {
    return styles.left;
  }
  if (right) {
    return styles.right;
  }
  if (top) {
    return styles.top;
  }
  if (bottom) {
    return styles.bottom;
  }
  return styles.base;
}, "getClassName");
const StoryRow = /* @__PURE__ */ __name(({
  children,
  ...props
}) => /* @__PURE__ */ React.createElement("div", {
  className: getClassName(props)
}, children), "StoryRow");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoryRow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlSb3cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vU3RvcnlSb3cuc2Nzcyc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGxlZnQ/OiBib29sZWFuO1xuICByaWdodD86IGJvb2xlYW47XG4gIHRvcD86IGJvb2xlYW47XG4gIGJvdHRvbT86IGJvb2xlYW47XG59O1xuXG5jb25zdCBnZXRDbGFzc05hbWUgPSAoeyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20gfTogUHJvcHMpID0+IHtcbiAgaWYgKGxlZnQpIHtcbiAgICByZXR1cm4gc3R5bGVzLmxlZnQ7XG4gIH1cblxuICBpZiAocmlnaHQpIHtcbiAgICByZXR1cm4gc3R5bGVzLnJpZ2h0O1xuICB9XG5cbiAgaWYgKHRvcCkge1xuICAgIHJldHVybiBzdHlsZXMudG9wO1xuICB9XG5cbiAgaWYgKGJvdHRvbSkge1xuICAgIHJldHVybiBzdHlsZXMuYm90dG9tO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlcy5iYXNlO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0b3J5Um93OiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSkgPT4gPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZShwcm9wcyl9PntjaGlsZHJlbn08L2Rpdj47XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsYUFBd0I7QUFTeEIsTUFBTSxlQUFlLHdCQUFDLEVBQUUsTUFBTSxPQUFPLEtBQUssYUFBb0I7QUFDNUQsTUFBSSxNQUFNO0FBQ1IsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxNQUFJLE9BQU87QUFDVCxXQUFPLE9BQU87QUFBQSxFQUNoQjtBQUVBLE1BQUksS0FBSztBQUNQLFdBQU8sT0FBTztBQUFBLEVBQ2hCO0FBRUEsTUFBSSxRQUFRO0FBQ1YsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxTQUFPLE9BQU87QUFDaEIsR0FsQnFCO0FBb0JkLE1BQU0sV0FBdUMsd0JBQUM7QUFBQSxFQUNuRDtBQUFBLEtBQ0c7QUFBQSxNQUNDLG9DQUFDO0FBQUEsRUFBSSxXQUFXLGFBQWEsS0FBSztBQUFBLEdBQUksUUFBUyxHQUhEOyIsCiAgIm5hbWVzIjogW10KfQo=
