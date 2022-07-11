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
var AttachmentSection_exports = {};
__export(AttachmentSection_exports, {
  AttachmentSection: () => AttachmentSection
});
module.exports = __toCommonJS(AttachmentSection_exports);
var import_react = __toESM(require("react"));
var import_DocumentListItem = require("./DocumentListItem");
var import_MediaGridItem = require("./MediaGridItem");
var import_missingCaseError = require("../../../util/missingCaseError");
var import_getMessageTimestamp = require("../../../util/getMessageTimestamp");
class AttachmentSection extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.createClickHandler = /* @__PURE__ */ __name((mediaItem) => () => {
      const { onItemClick, type } = this.props;
      const { message, attachment } = mediaItem;
      if (!onItemClick) {
        return;
      }
      onItemClick({ type, message, attachment });
    }, "createClickHandler");
  }
  render() {
    const { header } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-attachment-section"
    }, /* @__PURE__ */ import_react.default.createElement("h2", {
      className: "module-attachment-section__header"
    }, header), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-attachment-section__items"
    }, this.renderItems()));
  }
  renderItems() {
    const { i18n, mediaItems, type } = this.props;
    return mediaItems.map((mediaItem, position, array) => {
      const shouldShowSeparator = position < array.length - 1;
      const { message, index, attachment } = mediaItem;
      const onClick = this.createClickHandler(mediaItem);
      switch (type) {
        case "media":
          return /* @__PURE__ */ import_react.default.createElement(import_MediaGridItem.MediaGridItem, {
            key: `${message.id}-${index}`,
            mediaItem,
            onClick,
            i18n
          });
        case "documents":
          return /* @__PURE__ */ import_react.default.createElement(import_DocumentListItem.DocumentListItem, {
            key: `${message.id}-${index}`,
            fileName: attachment.fileName,
            fileSize: attachment.size,
            shouldShowSeparator,
            onClick,
            timestamp: (0, import_getMessageTimestamp.getMessageTimestamp)(message)
          });
        default:
          return (0, import_missingCaseError.missingCaseError)(type);
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AttachmentSection
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudFNlY3Rpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgRG9jdW1lbnRMaXN0SXRlbSB9IGZyb20gJy4vRG9jdW1lbnRMaXN0SXRlbSc7XG5pbXBvcnQgdHlwZSB7IEl0ZW1DbGlja0V2ZW50IH0gZnJvbSAnLi90eXBlcy9JdGVtQ2xpY2tFdmVudCc7XG5pbXBvcnQgeyBNZWRpYUdyaWRJdGVtIH0gZnJvbSAnLi9NZWRpYUdyaWRJdGVtJztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgZ2V0TWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4uLy4uLy4uL3V0aWwvZ2V0TWVzc2FnZVRpbWVzdGFtcCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBoZWFkZXI/OiBzdHJpbmc7XG4gIHR5cGU6ICdtZWRpYScgfCAnZG9jdW1lbnRzJztcbiAgbWVkaWFJdGVtczogQXJyYXk8TWVkaWFJdGVtVHlwZT47XG4gIG9uSXRlbUNsaWNrPzogKGV2ZW50OiBJdGVtQ2xpY2tFdmVudCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBBdHRhY2htZW50U2VjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcz4ge1xuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7IGhlYWRlciB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1hdHRhY2htZW50LXNlY3Rpb25cIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm1vZHVsZS1hdHRhY2htZW50LXNlY3Rpb25fX2hlYWRlclwiPntoZWFkZXJ9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtYXR0YWNobWVudC1zZWN0aW9uX19pdGVtc1wiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVySXRlbXMoKSB7XG4gICAgY29uc3QgeyBpMThuLCBtZWRpYUl0ZW1zLCB0eXBlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIG1lZGlhSXRlbXMubWFwKChtZWRpYUl0ZW0sIHBvc2l0aW9uLCBhcnJheSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkU2hvd1NlcGFyYXRvciA9IHBvc2l0aW9uIDwgYXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSwgaW5kZXgsIGF0dGFjaG1lbnQgfSA9IG1lZGlhSXRlbTtcblxuICAgICAgY29uc3Qgb25DbGljayA9IHRoaXMuY3JlYXRlQ2xpY2tIYW5kbGVyKG1lZGlhSXRlbSk7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnbWVkaWEnOlxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TWVkaWFHcmlkSXRlbVxuICAgICAgICAgICAgICBrZXk9e2Ake21lc3NhZ2UuaWR9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgbWVkaWFJdGVtPXttZWRpYUl0ZW19XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgJ2RvY3VtZW50cyc6XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxEb2N1bWVudExpc3RJdGVtXG4gICAgICAgICAgICAgIGtleT17YCR7bWVzc2FnZS5pZH0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICBmaWxlTmFtZT17YXR0YWNobWVudC5maWxlTmFtZX1cbiAgICAgICAgICAgICAgZmlsZVNpemU9e2F0dGFjaG1lbnQuc2l6ZX1cbiAgICAgICAgICAgICAgc2hvdWxkU2hvd1NlcGFyYXRvcj17c2hvdWxkU2hvd1NlcGFyYXRvcn1cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgICAgdGltZXN0YW1wPXtnZXRNZXNzYWdlVGltZXN0YW1wKG1lc3NhZ2UpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBtaXNzaW5nQ2FzZUVycm9yKHR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjcmVhdGVDbGlja0hhbmRsZXIgPSAobWVkaWFJdGVtOiBNZWRpYUl0ZW1UeXBlKSA9PiAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkl0ZW1DbGljaywgdHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGF0dGFjaG1lbnQgfSA9IG1lZGlhSXRlbTtcblxuICAgIGlmICghb25JdGVtQ2xpY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayh7IHR5cGUsIG1lc3NhZ2UsIGF0dGFjaG1lbnQgfSk7XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDhCQUFpQztBQUVqQywyQkFBOEI7QUFFOUIsOEJBQWlDO0FBRWpDLGlDQUFvQztBQVU3QixNQUFNLDBCQUEwQixxQkFBTSxVQUFpQjtBQUFBLEVBQXZEO0FBQUE7QUFpRFksOEJBQXFCLHdCQUFDLGNBQTZCLE1BQU07QUFDeEUsWUFBTSxFQUFFLGFBQWEsU0FBUyxLQUFLO0FBQ25DLFlBQU0sRUFBRSxTQUFTLGVBQWU7QUFFaEMsVUFBSSxDQUFDLGFBQWE7QUFDaEI7QUFBQSxNQUNGO0FBRUEsa0JBQVksRUFBRSxNQUFNLFNBQVMsV0FBVyxDQUFDO0FBQUEsSUFDM0MsR0FUc0M7QUFBQTtBQUFBLEVBaER0QixTQUFzQjtBQUNwQyxVQUFNLEVBQUUsV0FBVyxLQUFLO0FBRXhCLFdBQ0UsbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxPQUNiLG1EQUFDO0FBQUEsTUFBRyxXQUFVO0FBQUEsT0FBcUMsTUFBTyxHQUMxRCxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ1osS0FBSyxZQUFZLENBQ3BCLENBQ0Y7QUFBQSxFQUVKO0FBQUEsRUFFUSxjQUFjO0FBQ3BCLFVBQU0sRUFBRSxNQUFNLFlBQVksU0FBUyxLQUFLO0FBRXhDLFdBQU8sV0FBVyxJQUFJLENBQUMsV0FBVyxVQUFVLFVBQVU7QUFDcEQsWUFBTSxzQkFBc0IsV0FBVyxNQUFNLFNBQVM7QUFDdEQsWUFBTSxFQUFFLFNBQVMsT0FBTyxlQUFlO0FBRXZDLFlBQU0sVUFBVSxLQUFLLG1CQUFtQixTQUFTO0FBQ2pELGNBQVE7QUFBQSxhQUNEO0FBQ0gsaUJBQ0UsbURBQUM7QUFBQSxZQUNDLEtBQUssR0FBRyxRQUFRLE1BQU07QUFBQSxZQUN0QjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsV0FDRjtBQUFBLGFBRUM7QUFDSCxpQkFDRSxtREFBQztBQUFBLFlBQ0MsS0FBSyxHQUFHLFFBQVEsTUFBTTtBQUFBLFlBQ3RCLFVBQVUsV0FBVztBQUFBLFlBQ3JCLFVBQVUsV0FBVztBQUFBLFlBQ3JCO0FBQUEsWUFDQTtBQUFBLFlBQ0EsV0FBVyxvREFBb0IsT0FBTztBQUFBLFdBQ3hDO0FBQUE7QUFHRixpQkFBTyw4Q0FBaUIsSUFBSTtBQUFBO0FBQUEsSUFFbEMsQ0FBQztBQUFBLEVBQ0g7QUFZRjtBQTNETyIsCiAgIm5hbWVzIjogW10KfQo=
