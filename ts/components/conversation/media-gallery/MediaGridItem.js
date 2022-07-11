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
var MediaGridItem_exports = {};
__export(MediaGridItem_exports, {
  MediaGridItem: () => MediaGridItem
});
module.exports = __toCommonJS(MediaGridItem_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_GoogleChrome = require("../../../util/GoogleChrome");
var log = __toESM(require("../../../logging/log"));
class MediaGridItem extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBroken: false
    };
    this.onImageErrorBound = this.onImageError.bind(this);
  }
  onImageError() {
    log.info("MediaGridItem: Image failed to load; failing over to placeholder");
    this.setState({
      imageBroken: true
    });
  }
  renderContent() {
    const { mediaItem, i18n } = this.props;
    const { imageBroken } = this.state;
    const { attachment, contentType } = mediaItem;
    if (!attachment) {
      return null;
    }
    if (contentType && (0, import_GoogleChrome.isImageTypeSupported)(contentType)) {
      if (imageBroken || !mediaItem.thumbnailObjectUrl) {
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: (0, import_classnames.default)("module-media-grid-item__icon", "module-media-grid-item__icon-image")
        });
      }
      return /* @__PURE__ */ import_react.default.createElement("img", {
        alt: i18n("lightboxImageAlt"),
        className: "module-media-grid-item__image",
        src: mediaItem.thumbnailObjectUrl,
        onError: this.onImageErrorBound
      });
    }
    if (contentType && (0, import_GoogleChrome.isVideoTypeSupported)(contentType)) {
      if (imageBroken || !mediaItem.thumbnailObjectUrl) {
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: (0, import_classnames.default)("module-media-grid-item__icon", "module-media-grid-item__icon-video")
        });
      }
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-media-grid-item__image-container"
      }, /* @__PURE__ */ import_react.default.createElement("img", {
        alt: i18n("lightboxImageAlt"),
        className: "module-media-grid-item__image",
        src: mediaItem.thumbnailObjectUrl,
        onError: this.onImageErrorBound
      }), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-media-grid-item__circle-overlay"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-media-grid-item__play-overlay"
      })));
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-media-grid-item__icon", "module-media-grid-item__icon-generic")
    });
  }
  render() {
    const { onClick } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-media-grid-item",
      onClick
    }, this.renderContent());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaGridItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFHcmlkSXRlbS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB7XG4gIGlzSW1hZ2VUeXBlU3VwcG9ydGVkLFxuICBpc1ZpZGVvVHlwZVN1cHBvcnRlZCxcbn0gZnJvbSAnLi4vLi4vLi4vdXRpbC9Hb29nbGVDaHJvbWUnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IE1lZGlhSXRlbVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9NZWRpYUl0ZW0nO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIG1lZGlhSXRlbTogTWVkaWFJdGVtVHlwZTtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG50eXBlIFN0YXRlID0ge1xuICBpbWFnZUJyb2tlbjogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBNZWRpYUdyaWRJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xuICBwcml2YXRlIHJlYWRvbmx5IG9uSW1hZ2VFcnJvckJvdW5kOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbWFnZUJyb2tlbjogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMub25JbWFnZUVycm9yQm91bmQgPSB0aGlzLm9uSW1hZ2VFcnJvci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG9uSW1hZ2VFcnJvcigpOiB2b2lkIHtcbiAgICBsb2cuaW5mbyhcbiAgICAgICdNZWRpYUdyaWRJdGVtOiBJbWFnZSBmYWlsZWQgdG8gbG9hZDsgZmFpbGluZyBvdmVyIHRvIHBsYWNlaG9sZGVyJ1xuICAgICk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbWFnZUJyb2tlbjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJDb250ZW50KCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgeyBtZWRpYUl0ZW0sIGkxOG4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpbWFnZUJyb2tlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGF0dGFjaG1lbnQsIGNvbnRlbnRUeXBlIH0gPSBtZWRpYUl0ZW07XG5cbiAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50VHlwZSAmJiBpc0ltYWdlVHlwZVN1cHBvcnRlZChjb250ZW50VHlwZSkpIHtcbiAgICAgIGlmIChpbWFnZUJyb2tlbiB8fCAhbWVkaWFJdGVtLnRodW1ibmFpbE9iamVjdFVybCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgJ21vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX2ljb24nLFxuICAgICAgICAgICAgICAnbW9kdWxlLW1lZGlhLWdyaWQtaXRlbV9faWNvbi1pbWFnZSdcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZ1xuICAgICAgICAgIGFsdD17aTE4bignbGlnaHRib3hJbWFnZUFsdCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX2ltYWdlXCJcbiAgICAgICAgICBzcmM9e21lZGlhSXRlbS50aHVtYm5haWxPYmplY3RVcmx9XG4gICAgICAgICAgb25FcnJvcj17dGhpcy5vbkltYWdlRXJyb3JCb3VuZH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjb250ZW50VHlwZSAmJiBpc1ZpZGVvVHlwZVN1cHBvcnRlZChjb250ZW50VHlwZSkpIHtcbiAgICAgIGlmIChpbWFnZUJyb2tlbiB8fCAhbWVkaWFJdGVtLnRodW1ibmFpbE9iamVjdFVybCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgJ21vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX2ljb24nLFxuICAgICAgICAgICAgICAnbW9kdWxlLW1lZGlhLWdyaWQtaXRlbV9faWNvbi12aWRlbydcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVkaWEtZ3JpZC1pdGVtX19pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBhbHQ9e2kxOG4oJ2xpZ2h0Ym94SW1hZ2VBbHQnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX2ltYWdlXCJcbiAgICAgICAgICAgIHNyYz17bWVkaWFJdGVtLnRodW1ibmFpbE9iamVjdFVybH1cbiAgICAgICAgICAgIG9uRXJyb3I9e3RoaXMub25JbWFnZUVycm9yQm91bmR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX2NpcmNsZS1vdmVybGF5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX3BsYXktb3ZlcmxheVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1tZWRpYS1ncmlkLWl0ZW1fX2ljb24nLFxuICAgICAgICAgICdtb2R1bGUtbWVkaWEtZ3JpZC1pdGVtX19pY29uLWdlbmVyaWMnXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLW1lZGlhLWdyaWQtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLDBCQUdPO0FBR1AsVUFBcUI7QUFZZCxNQUFNLHNCQUFzQixxQkFBTSxVQUF3QjtBQUFBLEVBRy9ELFlBQVksT0FBYztBQUN4QixVQUFNLEtBQUs7QUFFWCxTQUFLLFFBQVE7QUFBQSxNQUNYLGFBQWE7QUFBQSxJQUNmO0FBRUEsU0FBSyxvQkFBb0IsS0FBSyxhQUFhLEtBQUssSUFBSTtBQUFBLEVBQ3REO0FBQUEsRUFFTyxlQUFxQjtBQUMxQixRQUFJLEtBQ0Ysa0VBQ0Y7QUFDQSxTQUFLLFNBQVM7QUFBQSxNQUNaLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFTyxnQkFBb0M7QUFDekMsVUFBTSxFQUFFLFdBQVcsU0FBUyxLQUFLO0FBQ2pDLFVBQU0sRUFBRSxnQkFBZ0IsS0FBSztBQUM3QixVQUFNLEVBQUUsWUFBWSxnQkFBZ0I7QUFFcEMsUUFBSSxDQUFDLFlBQVk7QUFDZixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksZUFBZSw4Q0FBcUIsV0FBVyxHQUFHO0FBQ3BELFVBQUksZUFBZSxDQUFDLFVBQVUsb0JBQW9CO0FBQ2hELGVBQ0UsbURBQUM7QUFBQSxVQUNDLFdBQVcsK0JBQ1QsZ0NBQ0Esb0NBQ0Y7QUFBQSxTQUNGO0FBQUEsTUFFSjtBQUVBLGFBQ0UsbURBQUM7QUFBQSxRQUNDLEtBQUssS0FBSyxrQkFBa0I7QUFBQSxRQUM1QixXQUFVO0FBQUEsUUFDVixLQUFLLFVBQVU7QUFBQSxRQUNmLFNBQVMsS0FBSztBQUFBLE9BQ2hCO0FBQUEsSUFFSjtBQUNBLFFBQUksZUFBZSw4Q0FBcUIsV0FBVyxHQUFHO0FBQ3BELFVBQUksZUFBZSxDQUFDLFVBQVUsb0JBQW9CO0FBQ2hELGVBQ0UsbURBQUM7QUFBQSxVQUNDLFdBQVcsK0JBQ1QsZ0NBQ0Esb0NBQ0Y7QUFBQSxTQUNGO0FBQUEsTUFFSjtBQUVBLGFBQ0UsbURBQUM7QUFBQSxRQUFJLFdBQVU7QUFBQSxTQUNiLG1EQUFDO0FBQUEsUUFDQyxLQUFLLEtBQUssa0JBQWtCO0FBQUEsUUFDNUIsV0FBVTtBQUFBLFFBQ1YsS0FBSyxVQUFVO0FBQUEsUUFDZixTQUFTLEtBQUs7QUFBQSxPQUNoQixHQUNBLG1EQUFDO0FBQUEsUUFBSSxXQUFVO0FBQUEsU0FDYixtREFBQztBQUFBLFFBQUksV0FBVTtBQUFBLE9BQXVDLENBQ3hELENBQ0Y7QUFBQSxJQUVKO0FBRUEsV0FDRSxtREFBQztBQUFBLE1BQ0MsV0FBVywrQkFDVCxnQ0FDQSxzQ0FDRjtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBQUEsRUFFZ0IsU0FBc0I7QUFDcEMsVUFBTSxFQUFFLFlBQVksS0FBSztBQUV6QixXQUNFLG1EQUFDO0FBQUEsTUFDQyxNQUFLO0FBQUEsTUFDTCxXQUFVO0FBQUEsTUFDVjtBQUFBLE9BRUMsS0FBSyxjQUFjLENBQ3RCO0FBQUEsRUFFSjtBQUNGO0FBdEdPIiwKICAibmFtZXMiOiBbXQp9Cg==
