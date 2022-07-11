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
var Emojify_exports = {};
__export(Emojify_exports, {
  Emojify: () => Emojify
});
module.exports = __toCommonJS(Emojify_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_emoji = require("../../util/emoji");
var import_missingCaseError = require("../../util/missingCaseError");
var import_lib = require("../emoji/lib");
function getImageTag({
  match,
  sizeClass,
  key
}) {
  const img = (0, import_lib.emojiToImage)(match);
  if (!img) {
    return match;
  }
  return /* @__PURE__ */ import_react.default.createElement("img", {
    key,
    src: img,
    "aria-label": match,
    className: (0, import_classnames.default)("emoji", sizeClass),
    alt: match
  });
}
class Emojify extends import_react.default.Component {
  render() {
    const { text, sizeClass, renderNonEmoji } = this.props;
    if (!renderNonEmoji) {
      return null;
    }
    return (0, import_emoji.splitByEmoji)(text).map(({ type, value: match }, index) => {
      if (type === "emoji") {
        return getImageTag({ match, sizeClass, key: index });
      }
      if (type === "text") {
        return renderNonEmoji({ text: match, key: index });
      }
      throw (0, import_missingCaseError.missingCaseError)(type);
    });
  }
}
Emojify.defaultProps = {
  renderNonEmoji: ({ text }) => text
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Emojify
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlmeS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBSZW5kZXJUZXh0Q2FsbGJhY2tUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBzcGxpdEJ5RW1vamkgfSBmcm9tICcuLi8uLi91dGlsL2Vtb2ppJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHR5cGUgeyBTaXplQ2xhc3NUeXBlIH0gZnJvbSAnLi4vZW1vamkvbGliJztcbmltcG9ydCB7IGVtb2ppVG9JbWFnZSB9IGZyb20gJy4uL2Vtb2ppL2xpYic7XG5cbi8vIFNvbWUgb2YgdGhpcyBsb2dpYyB0YWtlbiBmcm9tIGVtb2ppLWpzL3JlcGxhY2VtZW50XG4vLyB0aGUgRE9NIHN0cnVjdHVyZSBmb3IgdGhpcyBnZXRJbWFnZVRhZyBzaG91bGQgbWF0Y2ggdGhlIG90aGVyIGVtb2ppIGltcGxlbWVudGF0aW9uczpcbi8vIHRzL2NvbXBvbmVudHMvZW1vamkvRW1vamkudHN4XG4vLyB0cy9xdWlsbC9lbW9qaS9ibG90LnRzeFxuZnVuY3Rpb24gZ2V0SW1hZ2VUYWcoe1xuICBtYXRjaCxcbiAgc2l6ZUNsYXNzLFxuICBrZXksXG59OiB7XG4gIG1hdGNoOiBzdHJpbmc7XG4gIHNpemVDbGFzcz86IFNpemVDbGFzc1R5cGU7XG4gIGtleTogc3RyaW5nIHwgbnVtYmVyO1xufSk6IEpTWC5FbGVtZW50IHwgc3RyaW5nIHtcbiAgY29uc3QgaW1nID0gZW1vamlUb0ltYWdlKG1hdGNoKTtcblxuICBpZiAoIWltZykge1xuICAgIHJldHVybiBtYXRjaDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGltZ1xuICAgICAga2V5PXtrZXl9XG4gICAgICBzcmM9e2ltZ31cbiAgICAgIGFyaWEtbGFiZWw9e21hdGNofVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdlbW9qaScsIHNpemVDbGFzcyl9XG4gICAgICBhbHQ9e21hdGNofVxuICAgIC8+XG4gICk7XG59XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICB0ZXh0OiBzdHJpbmc7XG4gIC8qKiBBIGNsYXNzIG5hbWUgdG8gYmUgYWRkZWQgdG8gdGhlIGdlbmVyYXRlZCBlbW9qaSBpbWFnZXMgKi9cbiAgc2l6ZUNsYXNzPzogU2l6ZUNsYXNzVHlwZTtcbiAgLyoqIEFsbG93cyB5b3UgdG8gY3VzdG9taXplIG5vdyBub24tbmV3bGluZXMgYXJlIHJlbmRlcmVkLiBTaW1wbGVzdCBpcyBqdXN0IGEgPHNwYW4+LiAqL1xuICByZW5kZXJOb25FbW9qaT86IFJlbmRlclRleHRDYWxsYmFja1R5cGU7XG59O1xuXG5leHBvcnQgY2xhc3MgRW1vamlmeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcz4ge1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7XG4gICAgcmVuZGVyTm9uRW1vamk6ICh7IHRleHQgfSkgPT4gdGV4dCxcbiAgfTtcblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IG51bGwgfCBBcnJheTxKU1guRWxlbWVudCB8IHN0cmluZyB8IG51bGw+IHtcbiAgICBjb25zdCB7IHRleHQsIHNpemVDbGFzcywgcmVuZGVyTm9uRW1vamkgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoaXMsIGJlY2F1c2UgcmVuZGVyTm9uRW1vamkgaXMgbm90IHJlcXVpcmVkIGluIG91ciBQcm9wcyBvYmplY3QsXG4gICAgLy8gIGJ1dCBpdCBpcyBhbHdheXMgcHJvdmlkZWQgdmlhIGRlZmF1bHRQcm9wcy5cbiAgICBpZiAoIXJlbmRlck5vbkVtb2ppKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BsaXRCeUVtb2ppKHRleHQpLm1hcCgoeyB0eXBlLCB2YWx1ZTogbWF0Y2ggfSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0eXBlID09PSAnZW1vamknKSB7XG4gICAgICAgIHJldHVybiBnZXRJbWFnZVRhZyh7IG1hdGNoLCBzaXplQ2xhc3MsIGtleTogaW5kZXggfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlck5vbkVtb2ppKHsgdGV4dDogbWF0Y2gsIGtleTogaW5kZXggfSk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodHlwZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsd0JBQXVCO0FBR3ZCLG1CQUE2QjtBQUM3Qiw4QkFBaUM7QUFFakMsaUJBQTZCO0FBTTdCLHFCQUFxQjtBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUt1QjtBQUN2QixRQUFNLE1BQU0sNkJBQWEsS0FBSztBQUU5QixNQUFJLENBQUMsS0FBSztBQUNSLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMLGNBQVk7QUFBQSxJQUNaLFdBQVcsK0JBQVcsU0FBUyxTQUFTO0FBQUEsSUFDeEMsS0FBSztBQUFBLEdBQ1A7QUFFSjtBQXhCUyxBQWtDRixNQUFNLGdCQUFnQixxQkFBTSxVQUFpQjtBQUFBLEVBS2xDLFNBQW9EO0FBQ2xFLFVBQU0sRUFBRSxNQUFNLFdBQVcsbUJBQW1CLEtBQUs7QUFJakQsUUFBSSxDQUFDLGdCQUFnQjtBQUNuQixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sK0JBQWEsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLE1BQU0sT0FBTyxTQUFTLFVBQVU7QUFDL0QsVUFBSSxTQUFTLFNBQVM7QUFDcEIsZUFBTyxZQUFZLEVBQUUsT0FBTyxXQUFXLEtBQUssTUFBTSxDQUFDO0FBQUEsTUFDckQ7QUFFQSxVQUFJLFNBQVMsUUFBUTtBQUNuQixlQUFPLGVBQWUsRUFBRSxNQUFNLE9BQU8sS0FBSyxNQUFNLENBQUM7QUFBQSxNQUNuRDtBQUVBLFlBQU0sOENBQWlCLElBQUk7QUFBQSxJQUM3QixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBMUJPLEFBQ1MsQUFEVCxRQUNTLGVBQStCO0FBQUEsRUFDM0MsZ0JBQWdCLENBQUMsRUFBRSxXQUFXO0FBQ2hDOyIsCiAgIm5hbWVzIjogW10KfQo=
