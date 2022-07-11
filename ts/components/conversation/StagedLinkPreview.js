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
var StagedLinkPreview_exports = {};
__export(StagedLinkPreview_exports, {
  StagedLinkPreview: () => StagedLinkPreview
});
module.exports = __toCommonJS(StagedLinkPreview_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_Image = require("./Image");
var import_LinkPreviewDate = require("./LinkPreviewDate");
var import_getClassNamesFor = require("../../util/getClassNamesFor");
var import_Attachment = require("../../types/Attachment");
const StagedLinkPreview = /* @__PURE__ */ __name(({
  date,
  description,
  domain,
  i18n,
  image,
  moduleClassName,
  onClose,
  title
}) => {
  const isImage = (0, import_Attachment.isImageAttachment)(image);
  const isLoaded = Boolean(domain);
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("module-staged-link-preview", moduleClassName);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName(""), !isLoaded ? getClassName("--is-loading") : null)
  }, !isLoaded ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__loading")
  }, i18n("loadingPreview")) : null, isLoaded && image && isImage && domain ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__icon-container")
  }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
    alt: i18n("stagedPreviewThumbnail", [domain]),
    attachment: image,
    curveBottomLeft: import_Image.CurveType.Tiny,
    curveBottomRight: import_Image.CurveType.Tiny,
    curveTopLeft: import_Image.CurveType.Tiny,
    curveTopRight: import_Image.CurveType.Tiny,
    height: 72,
    i18n,
    url: image.url,
    width: 72
  })) : null, isLoaded && !image && /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__no-image")
  }), isLoaded ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__content")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__title")
  }, title), description && /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__description")
  }, (0, import_lodash.unescape)(description)), /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__footer")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__location")
  }, domain), /* @__PURE__ */ import_react.default.createElement(import_LinkPreviewDate.LinkPreviewDate, {
    date,
    className: getClassName("__date")
  }))) : null, onClose && /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: getClassName("__close-button"),
    onClick: onClose,
    type: "button"
  }));
}, "StagedLinkPreview");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StagedLinkPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhZ2VkTGlua1ByZXZpZXcudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgdW5lc2NhcGUgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBDdXJ2ZVR5cGUsIEltYWdlIH0gZnJvbSAnLi9JbWFnZSc7XG5pbXBvcnQgeyBMaW5rUHJldmlld0RhdGUgfSBmcm9tICcuL0xpbmtQcmV2aWV3RGF0ZSc7XG5cbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcbmltcG9ydCB7IGlzSW1hZ2VBdHRhY2htZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gTGlua1ByZXZpZXdUeXBlICYge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtb2R1bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9uQ2xvc2U/OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0YWdlZExpbmtQcmV2aWV3OiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICBkYXRlLFxuICBkZXNjcmlwdGlvbixcbiAgZG9tYWluLFxuICBpMThuLFxuICBpbWFnZSxcbiAgbW9kdWxlQ2xhc3NOYW1lLFxuICBvbkNsb3NlLFxuICB0aXRsZSxcbn06IFByb3BzKSA9PiB7XG4gIGNvbnN0IGlzSW1hZ2UgPSBpc0ltYWdlQXR0YWNobWVudChpbWFnZSk7XG4gIGNvbnN0IGlzTG9hZGVkID0gQm9vbGVhbihkb21haW4pO1xuXG4gIGNvbnN0IGdldENsYXNzTmFtZSA9IGdldENsYXNzTmFtZXNGb3IoXG4gICAgJ21vZHVsZS1zdGFnZWQtbGluay1wcmV2aWV3JyxcbiAgICBtb2R1bGVDbGFzc05hbWVcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgZ2V0Q2xhc3NOYW1lKCcnKSxcbiAgICAgICAgIWlzTG9hZGVkID8gZ2V0Q2xhc3NOYW1lKCctLWlzLWxvYWRpbmcnKSA6IG51bGxcbiAgICAgICl9XG4gICAgPlxuICAgICAgeyFpc0xvYWRlZCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19sb2FkaW5nJyl9PlxuICAgICAgICAgIHtpMThuKCdsb2FkaW5nUHJldmlldycpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgICAge2lzTG9hZGVkICYmIGltYWdlICYmIGlzSW1hZ2UgJiYgZG9tYWluID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX2ljb24tY29udGFpbmVyJyl9PlxuICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgYWx0PXtpMThuKCdzdGFnZWRQcmV2aWV3VGh1bWJuYWlsJywgW2RvbWFpbl0pfVxuICAgICAgICAgICAgYXR0YWNobWVudD17aW1hZ2V9XG4gICAgICAgICAgICBjdXJ2ZUJvdHRvbUxlZnQ9e0N1cnZlVHlwZS5UaW55fVxuICAgICAgICAgICAgY3VydmVCb3R0b21SaWdodD17Q3VydmVUeXBlLlRpbnl9XG4gICAgICAgICAgICBjdXJ2ZVRvcExlZnQ9e0N1cnZlVHlwZS5UaW55fVxuICAgICAgICAgICAgY3VydmVUb3BSaWdodD17Q3VydmVUeXBlLlRpbnl9XG4gICAgICAgICAgICBoZWlnaHQ9ezcyfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHVybD17aW1hZ2UudXJsfVxuICAgICAgICAgICAgd2lkdGg9ezcyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7aXNMb2FkZWQgJiYgIWltYWdlICYmIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fbm8taW1hZ2UnKX0gLz59XG4gICAgICB7aXNMb2FkZWQgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY29udGVudCcpfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX3RpdGxlJyl9Pnt0aXRsZX08L2Rpdj5cbiAgICAgICAgICB7ZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19kZXNjcmlwdGlvbicpfT5cbiAgICAgICAgICAgICAge3VuZXNjYXBlKGRlc2NyaXB0aW9uKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19mb290ZXInKX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX2xvY2F0aW9uJyl9Pntkb21haW59PC9kaXY+XG4gICAgICAgICAgICA8TGlua1ByZXZpZXdEYXRlIGRhdGU9e2RhdGV9IGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX2RhdGUnKX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICAgIHtvbkNsb3NlICYmIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Nsb3NlJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY2xvc2UtYnV0dG9uJyl9XG4gICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFDdkIsb0JBQXlCO0FBRXpCLG1CQUFpQztBQUNqQyw2QkFBZ0M7QUFJaEMsOEJBQWlDO0FBQ2pDLHdCQUFrQztBQVEzQixNQUFNLG9CQUFxQyx3QkFBQztBQUFBLEVBQ2pEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ1c7QUFDWCxRQUFNLFVBQVUseUNBQWtCLEtBQUs7QUFDdkMsUUFBTSxXQUFXLFFBQVEsTUFBTTtBQUUvQixRQUFNLGVBQWUsOENBQ25CLDhCQUNBLGVBQ0Y7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULGFBQWEsRUFBRSxHQUNmLENBQUMsV0FBVyxhQUFhLGNBQWMsSUFBSSxJQUM3QztBQUFBLEtBRUMsQ0FBQyxXQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFXLGFBQWEsV0FBVztBQUFBLEtBQ3JDLEtBQUssZ0JBQWdCLENBQ3hCLElBQ0UsTUFDSCxZQUFZLFNBQVMsV0FBVyxTQUMvQixtREFBQztBQUFBLElBQUksV0FBVyxhQUFhLGtCQUFrQjtBQUFBLEtBQzdDLG1EQUFDO0FBQUEsSUFDQyxLQUFLLEtBQUssMEJBQTBCLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDNUMsWUFBWTtBQUFBLElBQ1osaUJBQWlCLHVCQUFVO0FBQUEsSUFDM0Isa0JBQWtCLHVCQUFVO0FBQUEsSUFDNUIsY0FBYyx1QkFBVTtBQUFBLElBQ3hCLGVBQWUsdUJBQVU7QUFBQSxJQUN6QixRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0EsS0FBSyxNQUFNO0FBQUEsSUFDWCxPQUFPO0FBQUEsR0FDVCxDQUNGLElBQ0UsTUFDSCxZQUFZLENBQUMsU0FBUyxtREFBQztBQUFBLElBQUksV0FBVyxhQUFhLFlBQVk7QUFBQSxHQUFHLEdBQ2xFLFdBQ0MsbURBQUM7QUFBQSxJQUFJLFdBQVcsYUFBYSxXQUFXO0FBQUEsS0FDdEMsbURBQUM7QUFBQSxJQUFJLFdBQVcsYUFBYSxTQUFTO0FBQUEsS0FBSSxLQUFNLEdBQy9DLGVBQ0MsbURBQUM7QUFBQSxJQUFJLFdBQVcsYUFBYSxlQUFlO0FBQUEsS0FDekMsNEJBQVMsV0FBVyxDQUN2QixHQUVGLG1EQUFDO0FBQUEsSUFBSSxXQUFXLGFBQWEsVUFBVTtBQUFBLEtBQ3JDLG1EQUFDO0FBQUEsSUFBSSxXQUFXLGFBQWEsWUFBWTtBQUFBLEtBQUksTUFBTyxHQUNwRCxtREFBQztBQUFBLElBQWdCO0FBQUEsSUFBWSxXQUFXLGFBQWEsUUFBUTtBQUFBLEdBQUcsQ0FDbEUsQ0FDRixJQUNFLE1BQ0gsV0FDQyxtREFBQztBQUFBLElBQ0MsY0FBWSxLQUFLLE9BQU87QUFBQSxJQUN4QixXQUFXLGFBQWEsZ0JBQWdCO0FBQUEsSUFDeEMsU0FBUztBQUFBLElBQ1QsTUFBSztBQUFBLEdBQ1AsQ0FFSjtBQUVKLEdBdkVrRDsiLAogICJuYW1lcyI6IFtdCn0K
