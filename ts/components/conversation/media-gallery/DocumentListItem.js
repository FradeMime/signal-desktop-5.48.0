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
var DocumentListItem_exports = {};
__export(DocumentListItem_exports, {
  DocumentListItem: () => DocumentListItem
});
module.exports = __toCommonJS(DocumentListItem_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_moment = __toESM(require("moment"));
var import_filesize = __toESM(require("filesize"));
class DocumentListItem extends import_react.default.Component {
  render() {
    const { shouldShowSeparator } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-document-list-item", shouldShowSeparator ? "module-document-list-item--with-separator" : null)
    }, this.renderContent());
  }
  renderContent() {
    const { fileName, fileSize, onClick, timestamp } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-document-list-item__content",
      onClick
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-document-list-item__icon"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-document-list-item__metadata"
    }, /* @__PURE__ */ import_react.default.createElement("span", {
      className: "module-document-list-item__file-name"
    }, fileName), /* @__PURE__ */ import_react.default.createElement("span", {
      className: "module-document-list-item__file-size"
    }, typeof fileSize === "number" ? (0, import_filesize.default)(fileSize, { round: 0 }) : "")), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-document-list-item__date"
    }, (0, import_moment.default)(timestamp).format("ddd, MMM D, Y")));
  }
}
DocumentListItem.defaultProps = {
  shouldShowSeparator: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DocumentListItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRG9jdW1lbnRMaXN0SXRlbS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBmb3JtYXRGaWxlU2l6ZSBmcm9tICdmaWxlc2l6ZSc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIC8vIFJlcXVpcmVkXG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuXG4gIC8vIE9wdGlvbmFsXG4gIGZpbGVOYW1lPzogc3RyaW5nO1xuICBmaWxlU2l6ZT86IG51bWJlcjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIHNob3VsZFNob3dTZXBhcmF0b3I/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIERvY3VtZW50TGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHM+IHtcbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge1xuICAgIHNob3VsZFNob3dTZXBhcmF0b3I6IHRydWUsXG4gIH07XG5cbiAgcHVibGljIG92ZXJyaWRlIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyBzaG91bGRTaG93U2VwYXJhdG9yIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtZG9jdW1lbnQtbGlzdC1pdGVtJyxcbiAgICAgICAgICBzaG91bGRTaG93U2VwYXJhdG9yXG4gICAgICAgICAgICA/ICdtb2R1bGUtZG9jdW1lbnQtbGlzdC1pdGVtLS13aXRoLXNlcGFyYXRvcidcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJDb250ZW50KCkge1xuICAgIGNvbnN0IHsgZmlsZU5hbWUsIGZpbGVTaXplLCBvbkNsaWNrLCB0aW1lc3RhbXAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWRvY3VtZW50LWxpc3QtaXRlbV9fY29udGVudFwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWRvY3VtZW50LWxpc3QtaXRlbV9faWNvblwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWRvY3VtZW50LWxpc3QtaXRlbV9fbWV0YWRhdGFcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtZG9jdW1lbnQtbGlzdC1pdGVtX19maWxlLW5hbWVcIj5cbiAgICAgICAgICAgIHtmaWxlTmFtZX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLWRvY3VtZW50LWxpc3QtaXRlbV9fZmlsZS1zaXplXCI+XG4gICAgICAgICAgICB7dHlwZW9mIGZpbGVTaXplID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgICA/IGZvcm1hdEZpbGVTaXplKGZpbGVTaXplLCB7IHJvdW5kOiAwIH0pXG4gICAgICAgICAgICAgIDogJyd9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZG9jdW1lbnQtbGlzdC1pdGVtX19kYXRlXCI+XG4gICAgICAgICAge21vbWVudCh0aW1lc3RhbXApLmZvcm1hdCgnZGRkLCBNTU0gRCwgWScpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLG9CQUFtQjtBQUNuQixzQkFBMkI7QUFhcEIsTUFBTSx5QkFBeUIscUJBQU0sVUFBaUI7QUFBQSxFQUszQyxTQUFzQjtBQUNwQyxVQUFNLEVBQUUsd0JBQXdCLEtBQUs7QUFFckMsV0FDRSxtREFBQztBQUFBLE1BQ0MsV0FBVywrQkFDVCw2QkFDQSxzQkFDSSw4Q0FDQSxJQUNOO0FBQUEsT0FFQyxLQUFLLGNBQWMsQ0FDdEI7QUFBQSxFQUVKO0FBQUEsRUFFUSxnQkFBZ0I7QUFDdEIsVUFBTSxFQUFFLFVBQVUsVUFBVSxTQUFTLGNBQWMsS0FBSztBQUV4RCxXQUNFLG1EQUFDO0FBQUEsTUFDQyxNQUFLO0FBQUEsTUFDTCxXQUFVO0FBQUEsTUFDVjtBQUFBLE9BRUEsbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxLQUFrQyxHQUNqRCxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ2IsbURBQUM7QUFBQSxNQUFLLFdBQVU7QUFBQSxPQUNiLFFBQ0gsR0FDQSxtREFBQztBQUFBLE1BQUssV0FBVTtBQUFBLE9BQ2IsT0FBTyxhQUFhLFdBQ2pCLDZCQUFlLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUNyQyxFQUNOLENBQ0YsR0FDQSxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ1osMkJBQU8sU0FBUyxFQUFFLE9BQU8sZUFBZSxDQUMzQyxDQUNGO0FBQUEsRUFFSjtBQUNGO0FBaERPLEFBQ1MsQUFEVCxpQkFDUyxlQUErQjtBQUFBLEVBQzNDLHFCQUFxQjtBQUN2QjsiLAogICJuYW1lcyI6IFtdCn0K
