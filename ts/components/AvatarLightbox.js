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
var AvatarLightbox_exports = {};
__export(AvatarLightbox_exports, {
  AvatarLightbox: () => AvatarLightbox
});
module.exports = __toCommonJS(AvatarLightbox_exports);
var import_react = __toESM(require("react"));
var import_AvatarPreview = require("./AvatarPreview");
var import_Lightbox = require("./Lightbox");
const AvatarLightbox = /* @__PURE__ */ __name(({
  avatarColor,
  avatarPath,
  conversationTitle,
  i18n,
  isGroup,
  onClose
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Lightbox.Lightbox, {
    close: onClose,
    i18n,
    media: []
  }, /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
    avatarColor,
    avatarPath,
    conversationTitle,
    i18n,
    isGroup,
    style: {
      fontSize: "16em",
      height: "2em",
      maxHeight: 512,
      maxWidth: 512,
      width: "2em"
    }
  }));
}, "AvatarLightbox");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarLightbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyTGlnaHRib3gudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhclByZXZpZXcgfSBmcm9tICcuL0F2YXRhclByZXZpZXcnO1xuaW1wb3J0IHsgTGlnaHRib3ggfSBmcm9tICcuL0xpZ2h0Ym94JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGF2YXRhckNvbG9yPzogQXZhdGFyQ29sb3JUeXBlO1xuICBhdmF0YXJQYXRoPzogc3RyaW5nO1xuICBjb252ZXJzYXRpb25UaXRsZT86IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNHcm91cD86IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgQXZhdGFyTGlnaHRib3ggPSAoe1xuICBhdmF0YXJDb2xvcixcbiAgYXZhdGFyUGF0aCxcbiAgY29udmVyc2F0aW9uVGl0bGUsXG4gIGkxOG4sXG4gIGlzR3JvdXAsXG4gIG9uQ2xvc2UsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPExpZ2h0Ym94IGNsb3NlPXtvbkNsb3NlfSBpMThuPXtpMThufSBtZWRpYT17W119PlxuICAgICAgPEF2YXRhclByZXZpZXdcbiAgICAgICAgYXZhdGFyQ29sb3I9e2F2YXRhckNvbG9yfVxuICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgICBjb252ZXJzYXRpb25UaXRsZT17Y29udmVyc2F0aW9uVGl0bGV9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzR3JvdXA9e2lzR3JvdXB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZm9udFNpemU6ICcxNmVtJyxcbiAgICAgICAgICBoZWlnaHQ6ICcyZW0nLFxuICAgICAgICAgIG1heEhlaWdodDogNTEyLFxuICAgICAgICAgIG1heFdpZHRoOiA1MTIsXG4gICAgICAgICAgd2lkdGg6ICcyZW0nLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L0xpZ2h0Ym94PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFHbEIsMkJBQThCO0FBQzlCLHNCQUF5QjtBQVlsQixNQUFNLGlCQUFpQix3QkFBQztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixTQUNFLG1EQUFDO0FBQUEsSUFBUyxPQUFPO0FBQUEsSUFBUztBQUFBLElBQVksT0FBTyxDQUFDO0FBQUEsS0FDNUMsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1Q7QUFBQSxHQUNGLENBQ0Y7QUFFSixHQTFCOEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
