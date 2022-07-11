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
var PopperRootContext_exports = {};
__export(PopperRootContext_exports, {
  ClassyProvider: () => ClassyProvider,
  PopperRootContext: () => PopperRootContext
});
module.exports = __toCommonJS(PopperRootContext_exports);
var React = __toESM(require("react"));
const makeApi = /* @__PURE__ */ __name((classes) => ({
  createRoot: () => {
    const div = document.createElement("div");
    if (classes) {
      classes.forEach((theme) => {
        div.classList.add(theme);
      });
    }
    document.body.appendChild(div);
    return div;
  },
  removeRoot: (root) => {
    document.body.removeChild(root);
  }
}), "makeApi");
const PopperRootContext = React.createContext(makeApi());
const ClassyProvider = /* @__PURE__ */ __name(({
  classes,
  children
}) => {
  const api = React.useMemo(() => makeApi(classes), [classes]);
  return /* @__PURE__ */ React.createElement(PopperRootContext.Provider, {
    value: api
  }, children);
}, "ClassyProvider");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClassyProvider,
  PopperRootContext
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUG9wcGVyUm9vdENvbnRleHQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgbWFrZUFwaSA9IChjbGFzc2VzPzogQXJyYXk8c3RyaW5nPikgPT4gKHtcbiAgY3JlYXRlUm9vdDogKCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgIGNsYXNzZXMuZm9yRWFjaCh0aGVtZSA9PiB7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKHRoZW1lKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgIHJldHVybiBkaXY7XG4gIH0sXG4gIHJlbW92ZVJvb3Q6IChyb290OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocm9vdCk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IFBvcHBlclJvb3RDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChtYWtlQXBpKCkpO1xuXG5leHBvcnQgdHlwZSBDbGFzc3lQcm92aWRlclByb3BzID0ge1xuICBjbGFzc2VzPzogQXJyYXk8c3RyaW5nPjtcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdENoaWxkcmVuO1xufTtcblxuZXhwb3J0IGNvbnN0IENsYXNzeVByb3ZpZGVyOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxDbGFzc3lQcm92aWRlclByb3BzPiA9ICh7XG4gIGNsYXNzZXMsXG4gIGNoaWxkcmVuLFxufSkgPT4ge1xuICBjb25zdCBhcGkgPSBSZWFjdC51c2VNZW1vKCgpID0+IG1ha2VBcGkoY2xhc3NlcyksIFtjbGFzc2VzXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8UG9wcGVyUm9vdENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2FwaX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Qb3BwZXJSb290Q29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QixNQUFNLFVBQVUsd0JBQUMsWUFBNkI7QUFBQSxFQUM1QyxZQUFZLE1BQU07QUFDaEIsVUFBTSxNQUFNLFNBQVMsY0FBYyxLQUFLO0FBRXhDLFFBQUksU0FBUztBQUNYLGNBQVEsUUFBUSxXQUFTO0FBQ3ZCLFlBQUksVUFBVSxJQUFJLEtBQUs7QUFBQSxNQUN6QixDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsS0FBSyxZQUFZLEdBQUc7QUFFN0IsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFlBQVksQ0FBQyxTQUFzQjtBQUNqQyxhQUFTLEtBQUssWUFBWSxJQUFJO0FBQUEsRUFDaEM7QUFDRixJQWpCZ0I7QUFtQlQsTUFBTSxvQkFBb0IsTUFBTSxjQUFjLFFBQVEsQ0FBQztBQU92RCxNQUFNLGlCQUErRCx3QkFBQztBQUFBLEVBQzNFO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixRQUFNLE1BQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFM0QsU0FDRSxvQ0FBQyxrQkFBa0IsVUFBbEI7QUFBQSxJQUEyQixPQUFPO0FBQUEsS0FDaEMsUUFDSDtBQUVKLEdBWDRFOyIsCiAgIm5hbWVzIjogW10KfQo=
