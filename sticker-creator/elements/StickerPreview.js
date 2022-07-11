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
var StickerPreview_exports = {};
__export(StickerPreview_exports, {
  StickerPreview: () => StickerPreview
});
module.exports = __toCommonJS(StickerPreview_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./StickerPreview.scss"));
var import_MessageBubble = require("./MessageBubble");
var import_MessageSticker = require("./MessageSticker");
var import_i18n = require("../util/i18n");
const renderMessages = /* @__PURE__ */ __name((text, image, kind) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_MessageBubble.MessageBubble, {
  minutesAgo: 3
}, text), /* @__PURE__ */ React.createElement(import_MessageSticker.MessageSticker, {
  image,
  kind,
  minutesAgo: 2
})), "renderMessages");
const getArrowClass = /* @__PURE__ */ __name((placement) => {
  if (placement === "top") {
    return styles.arrowBottom;
  }
  if (placement === "right") {
    return styles.arrowLeft;
  }
  if (placement === "left") {
    return styles.arrowRight;
  }
  return styles.arrowTop;
}, "getArrowClass");
const StickerPreview = React.memo(React.forwardRef(({ image, style, arrowProps, placement }, ref) => {
  const i18n = (0, import_i18n.useI18n)();
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.base,
    ref,
    style
  }, arrowProps ? /* @__PURE__ */ React.createElement("div", {
    ref: arrowProps.ref,
    style: arrowProps.style,
    className: getArrowClass(placement)
  }) : null, /* @__PURE__ */ React.createElement("div", {
    className: styles.frameLight
  }, renderMessages(i18n("StickerCreator--StickerPreview--light"), image, "light")), /* @__PURE__ */ React.createElement("div", {
    className: styles.frameDark
  }, renderMessages(i18n("StickerCreator--StickerPreview--dark"), image, "dark")));
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclByZXZpZXcudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBQb3BwZXJBcnJvd1Byb3BzIH0gZnJvbSAncmVhY3QtcG9wcGVyJztcbmltcG9ydCB0eXBlIHsgUGxhY2VtZW50IH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vU3RpY2tlclByZXZpZXcuc2Nzcyc7XG5pbXBvcnQgeyBNZXNzYWdlQnViYmxlIH0gZnJvbSAnLi9NZXNzYWdlQnViYmxlJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgTWVzc2FnZVN0aWNrZXJQcm9wcyB9IGZyb20gJy4vTWVzc2FnZVN0aWNrZXInO1xuaW1wb3J0IHsgTWVzc2FnZVN0aWNrZXIgfSBmcm9tICcuL01lc3NhZ2VTdGlja2VyJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi91dGlsL2kxOG4nO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFBpY2s8UmVhY3QuSFRNTFByb3BzPEhUTUxEaXZFbGVtZW50PiwgJ3N0eWxlJz4gJiB7XG4gIGltYWdlOiBzdHJpbmc7XG4gIGFycm93UHJvcHM/OiBQb3BwZXJBcnJvd1Byb3BzO1xuICBwbGFjZW1lbnQ/OiBQbGFjZW1lbnQ7XG59O1xuXG5jb25zdCByZW5kZXJNZXNzYWdlcyA9IChcbiAgdGV4dDogc3RyaW5nLFxuICBpbWFnZTogc3RyaW5nLFxuICBraW5kOiBNZXNzYWdlU3RpY2tlclByb3BzWydraW5kJ11cbikgPT4gKFxuICA8PlxuICAgIDxNZXNzYWdlQnViYmxlIG1pbnV0ZXNBZ289ezN9Pnt0ZXh0fTwvTWVzc2FnZUJ1YmJsZT5cbiAgICA8TWVzc2FnZVN0aWNrZXIgaW1hZ2U9e2ltYWdlfSBraW5kPXtraW5kfSBtaW51dGVzQWdvPXsyfSAvPlxuICA8Lz5cbik7XG5cbmNvbnN0IGdldEFycm93Q2xhc3MgPSAocGxhY2VtZW50PzogUGxhY2VtZW50KSA9PiB7XG4gIGlmIChwbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgcmV0dXJuIHN0eWxlcy5hcnJvd0JvdHRvbTtcbiAgfVxuXG4gIGlmIChwbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICByZXR1cm4gc3R5bGVzLmFycm93TGVmdDtcbiAgfVxuXG4gIGlmIChwbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHJldHVybiBzdHlsZXMuYXJyb3dSaWdodDtcbiAgfVxuXG4gIHJldHVybiBzdHlsZXMuYXJyb3dUb3A7XG59O1xuXG5leHBvcnQgY29uc3QgU3RpY2tlclByZXZpZXcgPSBSZWFjdC5tZW1vKFxuICBSZWFjdC5mb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBQcm9wcz4oXG4gICAgKHsgaW1hZ2UsIHN0eWxlLCBhcnJvd1Byb3BzLCBwbGFjZW1lbnQgfTogUHJvcHMsIHJlZikgPT4ge1xuICAgICAgY29uc3QgaTE4biA9IHVzZUkxOG4oKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5iYXNlfSByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICB7YXJyb3dQcm9wcyA/IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXthcnJvd1Byb3BzLnJlZn1cbiAgICAgICAgICAgICAgc3R5bGU9e2Fycm93UHJvcHMuc3R5bGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Z2V0QXJyb3dDbGFzcyhwbGFjZW1lbnQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZyYW1lTGlnaHR9PlxuICAgICAgICAgICAge3JlbmRlck1lc3NhZ2VzKFxuICAgICAgICAgICAgICBpMThuKCdTdGlja2VyQ3JlYXRvci0tU3RpY2tlclByZXZpZXctLWxpZ2h0JyksXG4gICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAnbGlnaHQnXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZnJhbWVEYXJrfT5cbiAgICAgICAgICAgIHtyZW5kZXJNZXNzYWdlcyhcbiAgICAgICAgICAgICAgaTE4bignU3RpY2tlckNyZWF0b3ItLVN0aWNrZXJQcmV2aWV3LS1kYXJrJyksXG4gICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAnZGFyaydcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIClcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFHdkIsYUFBd0I7QUFDeEIsMkJBQThCO0FBRTlCLDRCQUErQjtBQUMvQixrQkFBd0I7QUFReEIsTUFBTSxpQkFBaUIsd0JBQ3JCLE1BQ0EsT0FDQSxTQUVBLDBEQUNFLG9DQUFDO0FBQUEsRUFBYyxZQUFZO0FBQUEsR0FBSSxJQUFLLEdBQ3BDLG9DQUFDO0FBQUEsRUFBZTtBQUFBLEVBQWM7QUFBQSxFQUFZLFlBQVk7QUFBQSxDQUFHLENBQzNELEdBUnFCO0FBV3ZCLE1BQU0sZ0JBQWdCLHdCQUFDLGNBQTBCO0FBQy9DLE1BQUksY0FBYyxPQUFPO0FBQ3ZCLFdBQU8sT0FBTztBQUFBLEVBQ2hCO0FBRUEsTUFBSSxjQUFjLFNBQVM7QUFDekIsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxNQUFJLGNBQWMsUUFBUTtBQUN4QixXQUFPLE9BQU87QUFBQSxFQUNoQjtBQUVBLFNBQU8sT0FBTztBQUNoQixHQWRzQjtBQWdCZixNQUFNLGlCQUFpQixNQUFNLEtBQ2xDLE1BQU0sV0FDSixDQUFDLEVBQUUsT0FBTyxPQUFPLFlBQVksYUFBb0IsUUFBUTtBQUN2RCxRQUFNLE9BQU8seUJBQVE7QUFFckIsU0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVyxPQUFPO0FBQUEsSUFBTTtBQUFBLElBQVU7QUFBQSxLQUNwQyxhQUNDLG9DQUFDO0FBQUEsSUFDQyxLQUFLLFdBQVc7QUFBQSxJQUNoQixPQUFPLFdBQVc7QUFBQSxJQUNsQixXQUFXLGNBQWMsU0FBUztBQUFBLEdBQ3BDLElBQ0UsTUFDSixvQ0FBQztBQUFBLElBQUksV0FBVyxPQUFPO0FBQUEsS0FDcEIsZUFDQyxLQUFLLHVDQUF1QyxHQUM1QyxPQUNBLE9BQ0YsQ0FDRixHQUNBLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNwQixlQUNDLEtBQUssc0NBQXNDLEdBQzNDLE9BQ0EsTUFDRixDQUNGLENBQ0Y7QUFFSixDQUNGLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
