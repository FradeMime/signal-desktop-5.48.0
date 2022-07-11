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
var DocumentListItem_stories_exports = {};
__export(DocumentListItem_stories_exports, {
  Multiple: () => Multiple,
  Single: () => Single,
  default: () => DocumentListItem_stories_default
});
module.exports = __toCommonJS(DocumentListItem_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_DocumentListItem = require("./DocumentListItem");
var DocumentListItem_stories_default = {
  title: "Components/Conversation/MediaGallery/DocumentListItem"
};
const Single = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_DocumentListItem.DocumentListItem, {
  timestamp: (0, import_addon_knobs.date)("timestamp", new Date()),
  fileName: (0, import_addon_knobs.text)("fileName", "meow.jpg"),
  fileSize: (0, import_addon_knobs.number)("fileSize", 1024 * 1e3 * 2),
  shouldShowSeparator: (0, import_addon_knobs.boolean)("shouldShowSeparator", false),
  onClick: (0, import_addon_actions.action)("onClick")
}), "Single");
const Multiple = /* @__PURE__ */ __name(() => {
  const items = [
    {
      fileName: "meow.jpg",
      fileSize: 1024 * 1e3 * 2,
      timestamp: Date.now()
    },
    {
      fileName: "rickroll.mp4",
      fileSize: 1024 * 1e3 * 8,
      timestamp: Date.now() - 24 * 60 * 60 * 1e3
    },
    {
      fileName: "kitten.gif",
      fileSize: 1024 * 1e3 * 1.2,
      timestamp: Date.now() - 14 * 24 * 60 * 60 * 1e3,
      shouldShowSeparator: false
    }
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, items.map((item) => /* @__PURE__ */ React.createElement(import_DocumentListItem.DocumentListItem, {
    key: item.fileName,
    onClick: (0, import_addon_actions.action)("onClick"),
    ...item
  })));
}, "Multiple");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Multiple,
  Single
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRG9jdW1lbnRMaXN0SXRlbS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBib29sZWFuLCBkYXRlLCBudW1iZXIsIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IERvY3VtZW50TGlzdEl0ZW0gfSBmcm9tICcuL0RvY3VtZW50TGlzdEl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vTWVkaWFHYWxsZXJ5L0RvY3VtZW50TGlzdEl0ZW0nLFxufTtcblxuZXhwb3J0IGNvbnN0IFNpbmdsZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxEb2N1bWVudExpc3RJdGVtXG4gICAgdGltZXN0YW1wPXtkYXRlKCd0aW1lc3RhbXAnLCBuZXcgRGF0ZSgpKX1cbiAgICBmaWxlTmFtZT17dGV4dCgnZmlsZU5hbWUnLCAnbWVvdy5qcGcnKX1cbiAgICBmaWxlU2l6ZT17bnVtYmVyKCdmaWxlU2l6ZScsIDEwMjQgKiAxMDAwICogMil9XG4gICAgc2hvdWxkU2hvd1NlcGFyYXRvcj17Ym9vbGVhbignc2hvdWxkU2hvd1NlcGFyYXRvcicsIGZhbHNlKX1cbiAgICBvbkNsaWNrPXthY3Rpb24oJ29uQ2xpY2snKX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gW1xuICAgIHtcbiAgICAgIGZpbGVOYW1lOiAnbWVvdy5qcGcnLFxuICAgICAgZmlsZVNpemU6IDEwMjQgKiAxMDAwICogMixcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpbGVOYW1lOiAncmlja3JvbGwubXA0JyxcbiAgICAgIGZpbGVTaXplOiAxMDI0ICogMTAwMCAqIDgsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCkgLSAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgIH0sXG4gICAge1xuICAgICAgZmlsZU5hbWU6ICdraXR0ZW4uZ2lmJyxcbiAgICAgIGZpbGVTaXplOiAxMDI0ICogMTAwMCAqIDEuMixcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDE0ICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgIHNob3VsZFNob3dTZXBhcmF0b3I6IGZhbHNlLFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2l0ZW1zLm1hcChpdGVtID0+IChcbiAgICAgICAgPERvY3VtZW50TGlzdEl0ZW1cbiAgICAgICAgICBrZXk9e2l0ZW0uZmlsZU5hbWV9XG4gICAgICAgICAgb25DbGljaz17YWN0aW9uKCdvbkNsaWNrJyl9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUE0QztBQUM1QywyQkFBdUI7QUFFdkIsOEJBQWlDO0FBRWpDLElBQU8sbUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sU0FBUyw2QkFDcEIsb0NBQUM7QUFBQSxFQUNDLFdBQVcsNkJBQUssYUFBYSxJQUFJLEtBQUssQ0FBQztBQUFBLEVBQ3ZDLFVBQVUsNkJBQUssWUFBWSxVQUFVO0FBQUEsRUFDckMsVUFBVSwrQkFBTyxZQUFZLE9BQU8sTUFBTyxDQUFDO0FBQUEsRUFDNUMscUJBQXFCLGdDQUFRLHVCQUF1QixLQUFLO0FBQUEsRUFDekQsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsQ0FDM0IsR0FQb0I7QUFVZixNQUFNLFdBQVcsNkJBQW1CO0FBQ3pDLFFBQU0sUUFBUTtBQUFBLElBQ1o7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVUsT0FBTyxNQUFPO0FBQUEsTUFDeEIsV0FBVyxLQUFLLElBQUk7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLFVBQVUsT0FBTyxNQUFPO0FBQUEsTUFDeEIsV0FBVyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSztBQUFBLElBQ3pDO0FBQUEsSUFDQTtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsVUFBVSxPQUFPLE1BQU87QUFBQSxNQUN4QixXQUFXLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFBQSxNQUM1QyxxQkFBcUI7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFFQSxTQUNFLDBEQUNHLE1BQU0sSUFBSSxVQUNULG9DQUFDO0FBQUEsSUFDQyxLQUFLLEtBQUs7QUFBQSxJQUNWLFNBQVMsaUNBQU8sU0FBUztBQUFBLE9BQ3JCO0FBQUEsR0FDTixDQUNELENBQ0g7QUFFSixHQS9Cd0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
