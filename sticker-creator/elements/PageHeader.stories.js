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
var PageHeader_stories_exports = {};
__export(PageHeader_stories_exports, {
  _PageHeader: () => _PageHeader,
  default: () => PageHeader_stories_default
});
module.exports = __toCommonJS(PageHeader_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_PageHeader = require("./PageHeader");
var PageHeader_stories_default = {
  title: "Sticker Creator/elements"
};
const _PageHeader = /* @__PURE__ */ __name(() => {
  const child = (0, import_addon_knobs.text)("text", "foo bar");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_PageHeader.PageHeader, null, child));
}, "_PageHeader");
_PageHeader.story = {
  name: "PageHeader"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _PageHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGFnZUhlYWRlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgU3RvcnlSb3cgfSBmcm9tICcuL1N0b3J5Um93JztcbmltcG9ydCB7IFBhZ2VIZWFkZXIgfSBmcm9tICcuL1BhZ2VIZWFkZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfUGFnZUhlYWRlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNoaWxkID0gdGV4dCgndGV4dCcsICdmb28gYmFyJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlSb3c+XG4gICAgICA8UGFnZUhlYWRlcj57Y2hpbGR9PC9QYWdlSGVhZGVyPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5fUGFnZUhlYWRlci5zdG9yeSA9IHtcbiAgbmFtZTogJ1BhZ2VIZWFkZXInLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUFxQjtBQUVyQixzQkFBeUI7QUFDekIsd0JBQTJCO0FBRTNCLElBQU8sNkJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsUUFBTSxRQUFRLDZCQUFLLFFBQVEsU0FBUztBQUVwQyxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDLG9DQUFZLEtBQU0sQ0FDckI7QUFFSixHQVIyQjtBQVUzQixZQUFZLFFBQVE7QUFBQSxFQUNsQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
