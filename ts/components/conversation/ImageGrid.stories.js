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
var ImageGrid_stories_exports = {};
__export(ImageGrid_stories_exports, {
  BottomOverlay: () => BottomOverlay,
  ContentAboveAndBelow: () => ContentAboveAndBelow,
  FiveImages: () => FiveImages,
  FourImages: () => FourImages,
  MixedContentTypes: () => MixedContentTypes,
  OneImage: () => OneImage,
  Sticker: () => Sticker,
  ThreeImages: () => ThreeImages,
  TwoImages: () => TwoImages,
  _6Images: () => _6Images,
  default: () => ImageGrid_stories_default
});
module.exports = __toCommonJS(ImageGrid_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_ImageGrid = require("./ImageGrid");
var import_MIME = require("../../types/MIME");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_Fixtures = require("../../storybook/Fixtures");
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ImageGrid_stories_default = {
  title: "Components/Conversation/ImageGrid"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  attachments: overrideProps.attachments || [
    (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      height: 1200,
      url: import_Fixtures.pngUrl,
      width: 800
    })
  ],
  bottomOverlay: (0, import_addon_knobs.boolean)("bottomOverlay", overrideProps.bottomOverlay || false),
  direction: overrideProps.direction || "incoming",
  i18n,
  isSticker: (0, import_addon_knobs.boolean)("isSticker", overrideProps.isSticker || false),
  onClick: (0, import_addon_actions.action)("onClick"),
  onError: (0, import_addon_actions.action)("onError"),
  stickerSize: (0, import_addon_knobs.number)("stickerSize", overrideProps.stickerSize || 0),
  tabIndex: (0, import_addon_knobs.number)("tabIndex", overrideProps.tabIndex || 0),
  withContentAbove: (0, import_addon_knobs.boolean)("withContentAbove", overrideProps.withContentAbove || false),
  withContentBelow: (0, import_addon_knobs.boolean)("withContentBelow", overrideProps.withContentBelow || false)
}), "createProps");
const OneImage = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "OneImage");
const TwoImages = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "TwoImages");
const ThreeImages = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "ThreeImages");
const FourImages = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "FourImages");
const FiveImages = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "FiveImages");
const _6Images = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        height: 1680,
        url: "/fixtures/tina-rolf-269345-unsplash.jpg",
        width: 3e3
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "_6Images");
_6Images.story = {
  name: "6+ Images"
};
const MixedContentTypes = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.VIDEO_MP4,
        fileName: "pixabay-Soap-Bubble-7141.mp4",
        height: 112,
        screenshot: {
          height: 112,
          width: 112,
          url: "/fixtures/kitten-4-112-112.jpg",
          contentType: import_MIME.IMAGE_JPEG,
          path: "originalpath"
        },
        url: "/fixtures/pixabay-Soap-Bubble-7141.mp4",
        width: 112
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_PNG,
        fileName: "sax.png",
        height: 1200,
        url: import_Fixtures.pngUrl,
        width: 800
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
        fileName: "lorem-ipsum.txt",
        url: "/fixtures/lorem-ipsum.txt"
      }),
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.AUDIO_MP3,
        fileName: "incompetech-com-Agnus-Dei-X.mp3",
        url: "/fixtures/incompetech-com-Agnus-Dei-X.mp3"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "MixedContentTypes");
const Sticker = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.IMAGE_WEBP,
        fileName: "sticker.webp",
        height: 512,
        url: import_Fixtures.squareStickerUrl,
        width: 512
      })
    ],
    isSticker: true,
    stickerSize: 128
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "Sticker");
const ContentAboveAndBelow = /* @__PURE__ */ __name(() => {
  const props = createProps({
    withContentAbove: true,
    withContentBelow: true
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "ContentAboveAndBelow");
ContentAboveAndBelow.story = {
  name: "Content Above and Below"
};
const BottomOverlay = /* @__PURE__ */ __name(() => {
  const props = createProps({
    bottomOverlay: true
  });
  return /* @__PURE__ */ React.createElement(import_ImageGrid.ImageGrid, {
    ...props
  });
}, "BottomOverlay");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BottomOverlay,
  ContentAboveAndBelow,
  FiveImages,
  FourImages,
  MixedContentTypes,
  OneImage,
  Sticker,
  ThreeImages,
  TwoImages,
  _6Images
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW1hZ2VHcmlkLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IGJvb2xlYW4sIG51bWJlciB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9JbWFnZUdyaWQnO1xuaW1wb3J0IHsgSW1hZ2VHcmlkIH0gZnJvbSAnLi9JbWFnZUdyaWQnO1xuaW1wb3J0IHtcbiAgQVVESU9fTVAzLFxuICBJTUFHRV9KUEVHLFxuICBJTUFHRV9QTkcsXG4gIElNQUdFX1dFQlAsXG4gIFZJREVPX01QNCxcbiAgc3RyaW5nVG9NSU1FVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IHBuZ1VybCwgc3F1YXJlU3RpY2tlclVybCB9IGZyb20gJy4uLy4uL3N0b3J5Ym9vay9GaXh0dXJlcyc7XG5pbXBvcnQgeyBmYWtlQXR0YWNobWVudCB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0ltYWdlR3JpZCcsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgYXR0YWNobWVudHM6IG92ZXJyaWRlUHJvcHMuYXR0YWNobWVudHMgfHwgW1xuICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgaGVpZ2h0OiAxMjAwLFxuICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICB3aWR0aDogODAwLFxuICAgIH0pLFxuICBdLFxuICBib3R0b21PdmVybGF5OiBib29sZWFuKCdib3R0b21PdmVybGF5Jywgb3ZlcnJpZGVQcm9wcy5ib3R0b21PdmVybGF5IHx8IGZhbHNlKSxcbiAgZGlyZWN0aW9uOiBvdmVycmlkZVByb3BzLmRpcmVjdGlvbiB8fCAnaW5jb21pbmcnLFxuICBpMThuLFxuICBpc1N0aWNrZXI6IGJvb2xlYW4oJ2lzU3RpY2tlcicsIG92ZXJyaWRlUHJvcHMuaXNTdGlja2VyIHx8IGZhbHNlKSxcbiAgb25DbGljazogYWN0aW9uKCdvbkNsaWNrJyksXG4gIG9uRXJyb3I6IGFjdGlvbignb25FcnJvcicpLFxuICBzdGlja2VyU2l6ZTogbnVtYmVyKCdzdGlja2VyU2l6ZScsIG92ZXJyaWRlUHJvcHMuc3RpY2tlclNpemUgfHwgMCksXG4gIHRhYkluZGV4OiBudW1iZXIoJ3RhYkluZGV4Jywgb3ZlcnJpZGVQcm9wcy50YWJJbmRleCB8fCAwKSxcbiAgd2l0aENvbnRlbnRBYm92ZTogYm9vbGVhbihcbiAgICAnd2l0aENvbnRlbnRBYm92ZScsXG4gICAgb3ZlcnJpZGVQcm9wcy53aXRoQ29udGVudEFib3ZlIHx8IGZhbHNlXG4gICksXG4gIHdpdGhDb250ZW50QmVsb3c6IGJvb2xlYW4oXG4gICAgJ3dpdGhDb250ZW50QmVsb3cnLFxuICAgIG92ZXJyaWRlUHJvcHMud2l0aENvbnRlbnRCZWxvdyB8fCBmYWxzZVxuICApLFxufSk7XG5cbmV4cG9ydCBjb25zdCBPbmVJbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPEltYWdlR3JpZCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFR3b0ltYWdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICBoZWlnaHQ6IDE2ODAsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIHdpZHRoOiAzMDAwLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxJbWFnZUdyaWQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBUaHJlZUltYWdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICBoZWlnaHQ6IDE2ODAsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIHdpZHRoOiAzMDAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4gPEltYWdlR3JpZCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEZvdXJJbWFnZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhdHRhY2htZW50czogW1xuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDEyMDAsXG4gICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICB3aWR0aDogODAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgaGVpZ2h0OiAxNjgwLFxuICAgICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICB3aWR0aDogMzAwMCxcbiAgICAgIH0pLFxuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDEyMDAsXG4gICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICB3aWR0aDogODAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgaGVpZ2h0OiAxNjgwLFxuICAgICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICB3aWR0aDogMzAwMCxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIHJldHVybiA8SW1hZ2VHcmlkIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRml2ZUltYWdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICBoZWlnaHQ6IDE2ODAsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIHdpZHRoOiAzMDAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICBoZWlnaHQ6IDE2ODAsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIHdpZHRoOiAzMDAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4gPEltYWdlR3JpZCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IF82SW1hZ2VzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgZmlsZU5hbWU6ICdzYXgucG5nJyxcbiAgICAgICAgaGVpZ2h0OiAxMjAwLFxuICAgICAgICB1cmw6IHBuZ1VybCxcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgIH0pLFxuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIGhlaWdodDogMTY4MCxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgd2lkdGg6IDMwMDAsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgZmlsZU5hbWU6ICdzYXgucG5nJyxcbiAgICAgICAgaGVpZ2h0OiAxMjAwLFxuICAgICAgICB1cmw6IHBuZ1VybCxcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgIH0pLFxuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIGhlaWdodDogMTY4MCxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgd2lkdGg6IDMwMDAsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgZmlsZU5hbWU6ICdzYXgucG5nJyxcbiAgICAgICAgaGVpZ2h0OiAxMjAwLFxuICAgICAgICB1cmw6IHBuZ1VybCxcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgIH0pLFxuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDEyMDAsXG4gICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICB3aWR0aDogODAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9QTkcsXG4gICAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICAgIGhlaWdodDogMTIwMCxcbiAgICAgICAgdXJsOiBwbmdVcmwsXG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4gPEltYWdlR3JpZCB7Li4ucHJvcHN9IC8+O1xufTtcblxuXzZJbWFnZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICc2KyBJbWFnZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IE1peGVkQ29udGVudFR5cGVzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgICAgZmlsZU5hbWU6ICdwaXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICAgICAgaGVpZ2h0OiAxMTIsXG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICBoZWlnaHQ6IDExMixcbiAgICAgICAgICB3aWR0aDogMTEyLFxuICAgICAgICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgICAgcGF0aDogJ29yaWdpbmFscGF0aCcsXG4gICAgICAgIH0sXG4gICAgICAgIHVybDogJy9maXh0dXJlcy9waXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICAgICAgd2lkdGg6IDExMixcbiAgICAgIH0pLFxuICAgICAgZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBmaWxlTmFtZTogJ3NheC5wbmcnLFxuICAgICAgICBoZWlnaHQ6IDEyMDAsXG4gICAgICAgIHVybDogcG5nVXJsLFxuICAgICAgICB3aWR0aDogODAwLFxuICAgICAgfSksXG4gICAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKCd0ZXh0L3BsYWluJyksXG4gICAgICAgIGZpbGVOYW1lOiAnbG9yZW0taXBzdW0udHh0JyxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2xvcmVtLWlwc3VtLnR4dCcsXG4gICAgICB9KSxcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IEFVRElPX01QMyxcbiAgICAgICAgZmlsZU5hbWU6ICdpbmNvbXBldGVjaC1jb20tQWdudXMtRGVpLVgubXAzJyxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxJbWFnZUdyaWQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1dFQlAsXG4gICAgICAgIGZpbGVOYW1lOiAnc3RpY2tlci53ZWJwJyxcbiAgICAgICAgaGVpZ2h0OiA1MTIsXG4gICAgICAgIHVybDogc3F1YXJlU3RpY2tlclVybCxcbiAgICAgICAgd2lkdGg6IDUxMixcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgaXNTdGlja2VyOiB0cnVlLFxuICAgIHN0aWNrZXJTaXplOiAxMjgsXG4gIH0pO1xuXG4gIHJldHVybiA8SW1hZ2VHcmlkIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQ29udGVudEFib3ZlQW5kQmVsb3cgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB3aXRoQ29udGVudEFib3ZlOiB0cnVlLFxuICAgIHdpdGhDb250ZW50QmVsb3c6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8SW1hZ2VHcmlkIHsuLi5wcm9wc30gLz47XG59O1xuXG5Db250ZW50QWJvdmVBbmRCZWxvdy5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnRlbnQgQWJvdmUgYW5kIEJlbG93Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBCb3R0b21PdmVybGF5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYm90dG9tT3ZlcmxheTogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxJbWFnZUdyaWQgey4uLnByb3BzfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFDdkIseUJBQWdDO0FBR2hDLHVCQUEwQjtBQUMxQixrQkFPTztBQUNQLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsc0JBQXlDO0FBQ3pDLDRCQUErQjtBQUUvQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDRCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLGFBQWEsY0FBYyxlQUFlO0FBQUEsSUFDeEMsMENBQWU7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFB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QUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUixPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BQ0QsMENBQWU7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELDBDQUFlO0FBQUEsUUFDYixhQUFhLGtDQUFpQixZQUFZO0FBQUEsUUFDMUMsVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BQ0QsMENBQWU7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxRQUNWLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWM7QUFBQSxHQUFPO0FBQy9CLEdBdENpQztBQXdDMUIsTUFBTSxVQUFVLDZCQUFtQjtBQUN4QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGFBQWE7QUFBQSxNQUNYLDBDQUFlO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFjO0FBQUEsR0FBTztBQUMvQixHQWhCdUI7QUFrQmhCLE1BQU0sdUJBQXVCLDZCQUFtQjtBQUNyRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLEVBQ3BCLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBYztBQUFBLEdBQU87QUFDL0IsR0FQb0M7QUFTcEMscUJBQXFCLFFBQVE7QUFBQSxFQUMzQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixlQUFlO0FBQUEsRUFDakIsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFjO0FBQUEsR0FBTztBQUMvQixHQU42QjsiLAogICJuYW1lcyI6IFtdCn0K
