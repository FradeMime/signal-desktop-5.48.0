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
var Spinner_stories_exports = {};
__export(Spinner_stories_exports, {
  Directions: () => Directions,
  Normal: () => Normal,
  SvgSizes: () => SvgSizes,
  default: () => Spinner_stories_default
});
module.exports = __toCommonJS(Spinner_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Spinner = require("./Spinner");
var Spinner_stories_default = {
  title: "Components/Spinner"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  size: (0, import_addon_knobs.text)("size", overrideProps.size || ""),
  svgSize: (0, import_addon_knobs.select)("svgSize", import_Spinner.SpinnerSvgSizes.reduce((m, s) => ({ ...m, [s]: s }), {}), overrideProps.svgSize || "normal"),
  direction: (0, import_addon_knobs.select)("direction", import_Spinner.SpinnerDirections.reduce((d, s) => ({ ...d, [s]: s }), {}), overrideProps.direction)
}), "createProps");
const Normal = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
    ...props
  });
}, "Normal");
const SvgSizes = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Spinner.SpinnerSvgSizes.map((svgSize) => /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
    key: svgSize,
    ...props,
    svgSize
  })));
}, "SvgSizes");
SvgSizes.story = {
  name: "SVG Sizes"
};
const Directions = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Spinner.SpinnerDirections.map((direction) => /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
    key: direction,
    ...props,
    direction
  })));
}, "Directions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Directions,
  Normal,
  SvgSizes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3Bpbm5lci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHNlbGVjdCwgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vU3Bpbm5lcic7XG5pbXBvcnQgeyBTcGlubmVyLCBTcGlubmVyRGlyZWN0aW9ucywgU3Bpbm5lclN2Z1NpemVzIH0gZnJvbSAnLi9TcGlubmVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU3Bpbm5lcicsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgc2l6ZTogdGV4dCgnc2l6ZScsIG92ZXJyaWRlUHJvcHMuc2l6ZSB8fCAnJyksXG4gIHN2Z1NpemU6IHNlbGVjdChcbiAgICAnc3ZnU2l6ZScsXG4gICAgU3Bpbm5lclN2Z1NpemVzLnJlZHVjZSgobSwgcykgPT4gKHsgLi4ubSwgW3NdOiBzIH0pLCB7fSksXG4gICAgb3ZlcnJpZGVQcm9wcy5zdmdTaXplIHx8ICdub3JtYWwnXG4gICksXG4gIGRpcmVjdGlvbjogc2VsZWN0KFxuICAgICdkaXJlY3Rpb24nLFxuICAgIFNwaW5uZXJEaXJlY3Rpb25zLnJlZHVjZSgoZCwgcykgPT4gKHsgLi4uZCwgW3NdOiBzIH0pLCB7fSksXG4gICAgb3ZlcnJpZGVQcm9wcy5kaXJlY3Rpb25cbiAgKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgTm9ybWFsID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiA8U3Bpbm5lciB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFN2Z1NpemVzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtTcGlubmVyU3ZnU2l6ZXMubWFwKHN2Z1NpemUgPT4gKFxuICAgICAgICA8U3Bpbm5lciBrZXk9e3N2Z1NpemV9IHsuLi5wcm9wc30gc3ZnU2l6ZT17c3ZnU2l6ZX0gLz5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcblxuU3ZnU2l6ZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdTVkcgU2l6ZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IERpcmVjdGlvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge1NwaW5uZXJEaXJlY3Rpb25zLm1hcChkaXJlY3Rpb24gPT4gKFxuICAgICAgICA8U3Bpbm5lciBrZXk9e2RpcmVjdGlvbn0gey4uLnByb3BzfSBkaXJlY3Rpb249e2RpcmVjdGlvbn0gLz5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix5QkFBNkI7QUFFN0IscUJBQTREO0FBRTVELElBQU8sMEJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsTUFBTSw2QkFBSyxRQUFRLGNBQWMsUUFBUSxFQUFFO0FBQUEsRUFDM0MsU0FBUywrQkFDUCxXQUNBLCtCQUFnQixPQUFPLENBQUMsR0FBRyxNQUFPLE1BQUssSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FDdkQsY0FBYyxXQUFXLFFBQzNCO0FBQUEsRUFDQSxXQUFXLCtCQUNULGFBQ0EsaUNBQWtCLE9BQU8sQ0FBQyxHQUFHLE1BQU8sTUFBSyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUN6RCxjQUFjLFNBQ2hCO0FBQ0YsSUFab0I7QUFjYixNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFFBQU0sUUFBUSxZQUFZO0FBRTFCLFNBQU8sb0NBQUM7QUFBQSxPQUFZO0FBQUEsR0FBTztBQUM3QixHQUpzQjtBQU1mLE1BQU0sV0FBVyw2QkFBbUI7QUFDekMsUUFBTSxRQUFRLFlBQVk7QUFFMUIsU0FDRSwwREFDRywrQkFBZ0IsSUFBSSxhQUNuQixvQ0FBQztBQUFBLElBQVEsS0FBSztBQUFBLE9BQWE7QUFBQSxJQUFPO0FBQUEsR0FBa0IsQ0FDckQsQ0FDSDtBQUVKLEdBVndCO0FBWXhCLFNBQVMsUUFBUTtBQUFBLEVBQ2YsTUFBTTtBQUNSO0FBRU8sTUFBTSxhQUFhLDZCQUFtQjtBQUMzQyxRQUFNLFFBQVEsWUFBWTtBQUUxQixTQUNFLDBEQUNHLGlDQUFrQixJQUFJLGVBQ3JCLG9DQUFDO0FBQUEsSUFBUSxLQUFLO0FBQUEsT0FBZTtBQUFBLElBQU87QUFBQSxHQUFzQixDQUMzRCxDQUNIO0FBRUosR0FWMEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
