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
var showLightbox_exports = {};
__export(showLightbox_exports, {
  closeLightbox: () => closeLightbox,
  isLightboxOpen: () => isLightboxOpen,
  showLightbox: () => showLightbox
});
module.exports = __toCommonJS(showLightbox_exports);
var import_react = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_Lightbox = require("../components/Lightbox");
let lightboxMountNode;
function isLightboxOpen() {
  return Boolean(lightboxMountNode);
}
function closeLightbox() {
  if (!lightboxMountNode) {
    return;
  }
  window.ReactDOM.unmountComponentAtNode(lightboxMountNode);
  document.body.removeChild(lightboxMountNode);
  lightboxMountNode = void 0;
}
function showLightbox(props) {
  if (lightboxMountNode) {
    closeLightbox();
  }
  lightboxMountNode = document.createElement("div");
  lightboxMountNode.setAttribute("data-id", "lightbox");
  document.body.appendChild(lightboxMountNode);
  (0, import_react_dom.render)(/* @__PURE__ */ import_react.default.createElement(import_Lightbox.Lightbox, {
    ...props
  }), lightboxMountNode);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  closeLightbox,
  isLightboxOpen,
  showLightbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvd0xpZ2h0Ym94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9MaWdodGJveCc7XG5pbXBvcnQgeyBMaWdodGJveCB9IGZyb20gJy4uL2NvbXBvbmVudHMvTGlnaHRib3gnO1xuXG4vLyBOT1RFOiBUaGlzIGZpbGUgaXMgdGVtcG9yYXJpbHkgaGVyZSBmb3IgY29udmVuaWNlbmNlIG9mIHVzZSBieVxuLy8gY29udmVyc2F0aW9uX3ZpZXcgd2hpbGUgaXQgaXMgdHJhbnNpdGlvbmluZyBmcm9tIEJhY2tib25lIGludG8gcHVyZSBSZWFjdC5cbi8vIFBsZWFzZSB1c2UgPExpZ2h0Ym94IC8+IGRpcmVjdGx5IGFuZCBETyBOT1QgVVNFIFRIRVNFIEZVTkNUSU9OUy5cblxubGV0IGxpZ2h0Ym94TW91bnROb2RlOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlnaHRib3hPcGVuKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihsaWdodGJveE1vdW50Tm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUxpZ2h0Ym94KCk6IHZvaWQge1xuICBpZiAoIWxpZ2h0Ym94TW91bnROb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LlJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUobGlnaHRib3hNb3VudE5vZGUpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpZ2h0Ym94TW91bnROb2RlKTtcbiAgbGlnaHRib3hNb3VudE5vZGUgPSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93TGlnaHRib3gocHJvcHM6IFByb3BzVHlwZSk6IHZvaWQge1xuICBpZiAobGlnaHRib3hNb3VudE5vZGUpIHtcbiAgICBjbG9zZUxpZ2h0Ym94KCk7XG4gIH1cblxuICBsaWdodGJveE1vdW50Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsaWdodGJveE1vdW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCAnbGlnaHRib3gnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaWdodGJveE1vdW50Tm9kZSk7XG5cbiAgcmVuZGVyKDxMaWdodGJveCB7Li4ucHJvcHN9IC8+LCBsaWdodGJveE1vdW50Tm9kZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix1QkFBdUI7QUFFdkIsc0JBQXlCO0FBTXpCLElBQUk7QUFFRywwQkFBbUM7QUFDeEMsU0FBTyxRQUFRLGlCQUFpQjtBQUNsQztBQUZnQixBQUlULHlCQUErQjtBQUNwQyxNQUFJLENBQUMsbUJBQW1CO0FBQ3RCO0FBQUEsRUFDRjtBQUVBLFNBQU8sU0FBUyx1QkFBdUIsaUJBQWlCO0FBQ3hELFdBQVMsS0FBSyxZQUFZLGlCQUFpQjtBQUMzQyxzQkFBb0I7QUFDdEI7QUFSZ0IsQUFVVCxzQkFBc0IsT0FBd0I7QUFDbkQsTUFBSSxtQkFBbUI7QUFDckIsa0JBQWM7QUFBQSxFQUNoQjtBQUVBLHNCQUFvQixTQUFTLGNBQWMsS0FBSztBQUNoRCxvQkFBa0IsYUFBYSxXQUFXLFVBQVU7QUFDcEQsV0FBUyxLQUFLLFlBQVksaUJBQWlCO0FBRTNDLCtCQUFPLG1EQUFDO0FBQUEsT0FBYTtBQUFBLEdBQU8sR0FBSSxpQkFBaUI7QUFDbkQ7QUFWZ0IiLAogICJuYW1lcyI6IFtdCn0K
