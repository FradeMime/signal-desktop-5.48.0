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
var ShortcutGuideModal_exports = {};
__export(ShortcutGuideModal_exports, {
  ShortcutGuideModal: () => ShortcutGuideModal
});
module.exports = __toCommonJS(ShortcutGuideModal_exports);
var React = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_ShortcutGuide = require("./ShortcutGuide");
const ShortcutGuideModal = React.memo((props) => {
  const { i18n, close, hasInstalledStickers, platform } = props;
  const [root, setRoot] = React.useState(null);
  React.useEffect(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);
  return root ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide-modal"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide-container"
  }, /* @__PURE__ */ React.createElement(import_ShortcutGuide.ShortcutGuide, {
    hasInstalledStickers,
    platform,
    close,
    i18n
  }))), root) : null;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShortcutGuideModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hvcnRjdXRHdWlkZU1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFNob3J0Y3V0R3VpZGUgfSBmcm9tICcuL1Nob3J0Y3V0R3VpZGUnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGhhc0luc3RhbGxlZFN0aWNrZXJzOiBib29sZWFuO1xuICBwbGF0Zm9ybTogc3RyaW5nO1xuICByZWFkb25seSBjbG9zZTogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBTaG9ydGN1dEd1aWRlTW9kYWwgPSBSZWFjdC5tZW1vKChwcm9wczogUHJvcHNUeXBlKSA9PiB7XG4gIGNvbnN0IHsgaTE4biwgY2xvc2UsIGhhc0luc3RhbGxlZFN0aWNrZXJzLCBwbGF0Zm9ybSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtyb290LCBzZXRSb290XSA9IFJlYWN0LnVzZVN0YXRlPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgc2V0Um9vdChkaXYpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHJvb3RcbiAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGUtbW9kYWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxTaG9ydGN1dEd1aWRlXG4gICAgICAgICAgICAgIGhhc0luc3RhbGxlZFN0aWNrZXJzPXtoYXNJbnN0YWxsZWRTdGlja2Vyc31cbiAgICAgICAgICAgICAgcGxhdGZvcm09e3BsYXRmb3JtfVxuICAgICAgICAgICAgICBjbG9zZT17Y2xvc2V9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4sXG4gICAgICAgIHJvb3RcbiAgICAgIClcbiAgICA6IG51bGw7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHVCQUE2QjtBQUU3QiwyQkFBOEI7QUFTdkIsTUFBTSxxQkFBcUIsTUFBTSxLQUFLLENBQUMsVUFBcUI7QUFDakUsUUFBTSxFQUFFLE1BQU0sT0FBTyxzQkFBc0IsYUFBYTtBQUN4RCxRQUFNLENBQUMsTUFBTSxXQUFXLE1BQU0sU0FBNkIsSUFBSTtBQUUvRCxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLE1BQU0sU0FBUyxjQUFjLEtBQUs7QUFDeEMsYUFBUyxLQUFLLFlBQVksR0FBRztBQUM3QixZQUFRLEdBQUc7QUFFWCxXQUFPLE1BQU07QUFDWCxlQUFTLEtBQUssWUFBWSxHQUFHO0FBQUEsSUFDL0I7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTyxPQUNILG1DQUNFLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsR0FDRixDQUNGLENBQ0YsR0FDQSxJQUNGLElBQ0E7QUFDTixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
