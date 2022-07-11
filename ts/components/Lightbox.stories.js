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
var Lightbox_stories_exports = {};
__export(Lightbox_stories_exports, {
  ConversationHeader: () => ConversationHeader,
  CustomChildren: () => CustomChildren,
  Forwarding: () => Forwarding,
  ImageWithCaptionAllWhiteImage: () => ImageWithCaptionAllWhiteImage,
  ImageWithCaptionNormalImage: () => ImageWithCaptionNormalImage,
  MissingMedia: () => MissingMedia,
  Multimedia: () => Multimedia,
  SingleImage: () => SingleImage,
  SingleVideo: () => SingleVideo,
  SingleVideoWCaption: () => SingleVideoWCaption,
  UnsupportedContent: () => UnsupportedContent,
  UnsupportedImageType: () => UnsupportedImageType,
  UnsupportedVideoType: () => UnsupportedVideoType,
  ViewOnceVideo: () => ViewOnceVideo,
  default: () => Lightbox_stories_default
});
module.exports = __toCommonJS(Lightbox_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Lightbox = require("./Lightbox");
var import_setupI18n = require("../util/setupI18n");
var import_MIME = require("../types/MIME");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Lightbox_stories_default = {
  title: "Components/Lightbox"
};
function createMediaItem(overrideProps) {
  return {
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      caption: overrideProps.caption || "",
      contentType: import_MIME.IMAGE_JPEG,
      fileName: overrideProps.objectURL,
      url: overrideProps.objectURL
    }),
    contentType: import_MIME.IMAGE_JPEG,
    index: 0,
    message: {
      attachments: [],
      conversationId: "1234",
      id: "image-msg",
      received_at: 0,
      received_at_ms: Date.now(),
      sent_at: Date.now()
    },
    objectURL: "",
    ...overrideProps
  };
}
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  close: (0, import_addon_actions.action)("close"),
  i18n,
  isViewOnce: Boolean(overrideProps.isViewOnce),
  media: overrideProps.media || [],
  onSave: (0, import_addon_actions.action)("onSave"),
  selectedIndex: (0, import_addon_knobs.number)("selectedIndex", overrideProps.selectedIndex || 0)
}), "createProps");
const Multimedia = /* @__PURE__ */ __name(() => {
  const props = createProps({
    media: [
      {
        attachment: (0, import_fakeAttachment.fakeAttachment)({
          contentType: import_MIME.IMAGE_JPEG,
          fileName: "tina-rolf-269345-unsplash.jpg",
          url: "/fixtures/tina-rolf-269345-unsplash.jpg",
          caption: "Still from The Lighthouse, starring Robert Pattinson and Willem Defoe."
        }),
        contentType: import_MIME.IMAGE_JPEG,
        index: 0,
        message: {
          attachments: [],
          conversationId: "1234",
          id: "image-msg",
          received_at: 1,
          received_at_ms: Date.now(),
          sent_at: Date.now()
        },
        objectURL: "/fixtures/tina-rolf-269345-unsplash.jpg"
      },
      {
        attachment: (0, import_fakeAttachment.fakeAttachment)({
          contentType: import_MIME.VIDEO_MP4,
          fileName: "pixabay-Soap-Bubble-7141.mp4",
          url: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
        }),
        contentType: import_MIME.VIDEO_MP4,
        index: 1,
        message: {
          attachments: [],
          conversationId: "1234",
          id: "video-msg",
          received_at: 2,
          received_at_ms: Date.now(),
          sent_at: Date.now()
        },
        objectURL: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
      },
      createMediaItem({
        contentType: import_MIME.IMAGE_JPEG,
        index: 2,
        thumbnailObjectUrl: "/fixtures/kitten-1-64-64.jpg",
        objectURL: "/fixtures/kitten-1-64-64.jpg"
      }),
      createMediaItem({
        contentType: import_MIME.IMAGE_JPEG,
        index: 3,
        thumbnailObjectUrl: "/fixtures/kitten-2-64-64.jpg",
        objectURL: "/fixtures/kitten-2-64-64.jpg"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
    ...props
  });
}, "Multimedia");
const MissingMedia = /* @__PURE__ */ __name(() => {
  const props = createProps({
    media: [
      {
        attachment: (0, import_fakeAttachment.fakeAttachment)({
          contentType: import_MIME.IMAGE_JPEG,
          fileName: "tina-rolf-269345-unsplash.jpg",
          url: "/fixtures/tina-rolf-269345-unsplash.jpg"
        }),
        contentType: import_MIME.IMAGE_JPEG,
        index: 0,
        message: {
          attachments: [],
          conversationId: "1234",
          id: "image-msg",
          received_at: 3,
          received_at_ms: Date.now(),
          sent_at: Date.now()
        },
        objectURL: void 0
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
    ...props
  });
}, "MissingMedia");
const SingleImage = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        objectURL: "/fixtures/tina-rolf-269345-unsplash.jpg"
      })
    ]
  })
}), "SingleImage");
const ImageWithCaptionNormalImage = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        caption: "This lighthouse is really cool because there are lots of rocks and there is a tower that has a light and the light is really bright because it shines so much. The day was super duper cloudy and stormy and you can see all the waves hitting against the rocks. Wait? What is that weird red hose line thingy running all the way to the tower? Those rocks look slippery! I bet that water is really cold. I am cold now, can I get a sweater? I wonder where this place is, probably somewhere cold like Coldsgar, Frozenville.",
        objectURL: "/fixtures/tina-rolf-269345-unsplash.jpg"
      })
    ]
  })
}), "ImageWithCaptionNormalImage");
ImageWithCaptionNormalImage.story = {
  name: "Image with Caption (normal image)"
};
const ImageWithCaptionAllWhiteImage = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        caption: "This is the user-provided caption. It should be visible on light backgrounds.",
        objectURL: "/fixtures/2000x2000-white.png"
      })
    ]
  })
}), "ImageWithCaptionAllWhiteImage");
ImageWithCaptionAllWhiteImage.story = {
  name: "Image with Caption (all-white image)"
};
const SingleVideo = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        contentType: import_MIME.VIDEO_MP4,
        objectURL: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
      })
    ]
  })
}), "SingleVideo");
const SingleVideoWCaption = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        caption: "This is the user-provided caption. It can get long and wrap onto multiple lines.",
        contentType: import_MIME.VIDEO_MP4,
        objectURL: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
      })
    ]
  })
}), "SingleVideoWCaption");
SingleVideoWCaption.story = {
  name: "Single Video w/caption"
};
const UnsupportedImageType = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        contentType: (0, import_MIME.stringToMIMEType)("image/tiff"),
        objectURL: "unsupported-image.tiff"
      })
    ]
  })
}), "UnsupportedImageType");
const UnsupportedVideoType = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        contentType: import_MIME.VIDEO_QUICKTIME,
        objectURL: "unsupported-video.mov"
      })
    ]
  })
}), "UnsupportedVideoType");
const UnsupportedContent = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    media: [
      createMediaItem({
        contentType: import_MIME.AUDIO_MP3,
        objectURL: "/fixtures/incompetech-com-Agnus-Dei-X.mp3"
      })
    ]
  })
}), "UnsupportedContent");
const CustomChildren = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({}),
  media: []
}, /* @__PURE__ */ React.createElement("div", {
  style: {
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}, "I am middle child")), "CustomChildren");
CustomChildren.story = {
  name: "Custom children"
};
const Forwarding = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({}),
  onForward: (0, import_addon_actions.action)("onForward")
}), "Forwarding");
const ConversationHeader = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({}),
  getConversation: () => ({
    acceptedMessageRequest: true,
    avatarPath: "/fixtures/kitten-1-64-64.jpg",
    badges: [],
    id: "1234",
    isMe: false,
    name: "Test",
    profileName: "Test",
    sharedGroupNames: [],
    title: "Test",
    type: "direct"
  }),
  media: [
    createMediaItem({
      contentType: import_MIME.VIDEO_MP4,
      objectURL: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
    })
  ]
}), "ConversationHeader");
const ViewOnceVideo = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Lightbox.Lightbox, {
  ...createProps({
    isViewOnce: true,
    media: [
      createMediaItem({
        contentType: import_MIME.VIDEO_MP4,
        objectURL: "/fixtures/pixabay-Soap-Bubble-7141.mp4"
      })
    ]
  }),
  isViewOnce: true
}), "ViewOnceVideo");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationHeader,
  CustomChildren,
  Forwarding,
  ImageWithCaptionAllWhiteImage,
  ImageWithCaptionNormalImage,
  MissingMedia,
  Multimedia,
  SingleImage,
  SingleVideo,
  SingleVideoWCaption,
  UnsupportedContent,
  UnsupportedImageType,
  UnsupportedVideoType,
  ViewOnceVideo
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlnaHRib3guc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vTGlnaHRib3gnO1xuaW1wb3J0IHsgTGlnaHRib3ggfSBmcm9tICcuL0xpZ2h0Ym94JztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQge1xuICBBVURJT19NUDMsXG4gIElNQUdFX0pQRUcsXG4gIFZJREVPX01QNCxcbiAgVklERU9fUVVJQ0tUSU1FLFxuICBzdHJpbmdUb01JTUVUeXBlLFxufSBmcm9tICcuLi90eXBlcy9NSU1FJztcblxuaW1wb3J0IHsgZmFrZUF0dGFjaG1lbnQgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0xpZ2h0Ym94Jyxcbn07XG5cbnR5cGUgT3ZlcnJpZGVQcm9wc01lZGlhSXRlbVR5cGUgPSBQYXJ0aWFsPE1lZGlhSXRlbVR5cGU+ICYgeyBjYXB0aW9uPzogc3RyaW5nIH07XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lZGlhSXRlbShcbiAgb3ZlcnJpZGVQcm9wczogT3ZlcnJpZGVQcm9wc01lZGlhSXRlbVR5cGVcbik6IE1lZGlhSXRlbVR5cGUge1xuICByZXR1cm4ge1xuICAgIGF0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgIGNhcHRpb246IG92ZXJyaWRlUHJvcHMuY2FwdGlvbiB8fCAnJyxcbiAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgZmlsZU5hbWU6IG92ZXJyaWRlUHJvcHMub2JqZWN0VVJMLFxuICAgICAgdXJsOiBvdmVycmlkZVByb3BzLm9iamVjdFVSTCxcbiAgICB9KSxcbiAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICBpbmRleDogMCxcbiAgICBtZXNzYWdlOiB7XG4gICAgICBhdHRhY2htZW50czogW10sXG4gICAgICBjb252ZXJzYXRpb25JZDogJzEyMzQnLFxuICAgICAgaWQ6ICdpbWFnZS1tc2cnLFxuICAgICAgcmVjZWl2ZWRfYXQ6IDAsXG4gICAgICByZWNlaXZlZF9hdF9tczogRGF0ZS5ub3coKSxcbiAgICAgIHNlbnRfYXQ6IERhdGUubm93KCksXG4gICAgfSxcbiAgICBvYmplY3RVUkw6ICcnLFxuICAgIC4uLm92ZXJyaWRlUHJvcHMsXG4gIH07XG59XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGNsb3NlOiBhY3Rpb24oJ2Nsb3NlJyksXG4gIGkxOG4sXG4gIGlzVmlld09uY2U6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc1ZpZXdPbmNlKSxcbiAgbWVkaWE6IG92ZXJyaWRlUHJvcHMubWVkaWEgfHwgW10sXG4gIG9uU2F2ZTogYWN0aW9uKCdvblNhdmUnKSxcbiAgc2VsZWN0ZWRJbmRleDogbnVtYmVyKCdzZWxlY3RlZEluZGV4Jywgb3ZlcnJpZGVQcm9wcy5zZWxlY3RlZEluZGV4IHx8IDApLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWx0aW1lZGlhID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgbWVkaWE6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICAgIGZpbGVOYW1lOiAndGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICAgIHVybDogJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgICAgY2FwdGlvbjpcbiAgICAgICAgICAgICdTdGlsbCBmcm9tIFRoZSBMaWdodGhvdXNlLCBzdGFycmluZyBSb2JlcnQgUGF0dGluc29uIGFuZCBXaWxsZW0gRGVmb2UuJyxcbiAgICAgICAgfSksXG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICBpbmRleDogMCxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJzEyMzQnLFxuICAgICAgICAgIGlkOiAnaW1hZ2UtbXNnJyxcbiAgICAgICAgICByZWNlaXZlZF9hdDogMSxcbiAgICAgICAgICByZWNlaXZlZF9hdF9tczogRGF0ZS5ub3coKSxcbiAgICAgICAgICBzZW50X2F0OiBEYXRlLm5vdygpLFxuICAgICAgICB9LFxuICAgICAgICBvYmplY3RVUkw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICAgICAgZmlsZU5hbWU6ICdwaXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvcGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgICBpbmRleDogMSxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJzEyMzQnLFxuICAgICAgICAgIGlkOiAndmlkZW8tbXNnJyxcbiAgICAgICAgICByZWNlaXZlZF9hdDogMixcbiAgICAgICAgICByZWNlaXZlZF9hdF9tczogRGF0ZS5ub3coKSxcbiAgICAgICAgICBzZW50X2F0OiBEYXRlLm5vdygpLFxuICAgICAgICB9LFxuICAgICAgICBvYmplY3RVUkw6ICcvZml4dHVyZXMvcGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICB9LFxuICAgICAgY3JlYXRlTWVkaWFJdGVtKHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGluZGV4OiAyLFxuICAgICAgICB0aHVtYm5haWxPYmplY3RVcmw6ICcvZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgICAgICAgb2JqZWN0VVJMOiAnL2ZpeHR1cmVzL2tpdHRlbi0xLTY0LTY0LmpwZycsXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICBpbmRleDogMyxcbiAgICAgICAgdGh1bWJuYWlsT2JqZWN0VXJsOiAnL2ZpeHR1cmVzL2tpdHRlbi0yLTY0LTY0LmpwZycsXG4gICAgICAgIG9iamVjdFVSTDogJy9maXh0dXJlcy9raXR0ZW4tMi02NC02NC5qcGcnLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxMaWdodGJveCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1pc3NpbmdNZWRpYSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIG1lZGlhOiBbXG4gICAgICB7XG4gICAgICAgIGF0dGFjaG1lbnQ6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgICBmaWxlTmFtZTogJ3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgICB1cmw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICB9KSxcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGluZGV4OiAwLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnMTIzNCcsXG4gICAgICAgICAgaWQ6ICdpbWFnZS1tc2cnLFxuICAgICAgICAgIHJlY2VpdmVkX2F0OiAzLFxuICAgICAgICAgIHJlY2VpdmVkX2F0X21zOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHNlbnRfYXQ6IERhdGUubm93KCksXG4gICAgICAgIH0sXG4gICAgICAgIG9iamVjdFVSTDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4gPExpZ2h0Ym94IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgU2luZ2xlSW1hZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGlnaHRib3hcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgbWVkaWE6IFtcbiAgICAgICAgY3JlYXRlTWVkaWFJdGVtKHtcbiAgICAgICAgICBvYmplY3RVUkw6ICcvZml4dHVyZXMvdGluYS1yb2xmLTI2OTM0NS11bnNwbGFzaC5qcGcnLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgSW1hZ2VXaXRoQ2FwdGlvbk5vcm1hbEltYWdlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExpZ2h0Ym94XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIG1lZGlhOiBbXG4gICAgICAgIGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgICAgICAgY2FwdGlvbjpcbiAgICAgICAgICAgICdUaGlzIGxpZ2h0aG91c2UgaXMgcmVhbGx5IGNvb2wgYmVjYXVzZSB0aGVyZSBhcmUgbG90cyBvZiByb2NrcyBhbmQgdGhlcmUgaXMgYSB0b3dlciB0aGF0IGhhcyBhIGxpZ2h0IGFuZCB0aGUgbGlnaHQgaXMgcmVhbGx5IGJyaWdodCBiZWNhdXNlIGl0IHNoaW5lcyBzbyBtdWNoLiBUaGUgZGF5IHdhcyBzdXBlciBkdXBlciBjbG91ZHkgYW5kIHN0b3JteSBhbmQgeW91IGNhbiBzZWUgYWxsIHRoZSB3YXZlcyBoaXR0aW5nIGFnYWluc3QgdGhlIHJvY2tzLiBXYWl0PyBXaGF0IGlzIHRoYXQgd2VpcmQgcmVkIGhvc2UgbGluZSB0aGluZ3kgcnVubmluZyBhbGwgdGhlIHdheSB0byB0aGUgdG93ZXI/IFRob3NlIHJvY2tzIGxvb2sgc2xpcHBlcnkhIEkgYmV0IHRoYXQgd2F0ZXIgaXMgcmVhbGx5IGNvbGQuIEkgYW0gY29sZCBub3csIGNhbiBJIGdldCBhIHN3ZWF0ZXI/IEkgd29uZGVyIHdoZXJlIHRoaXMgcGxhY2UgaXMsIHByb2JhYmx5IHNvbWV3aGVyZSBjb2xkIGxpa2UgQ29sZHNnYXIsIEZyb3plbnZpbGxlLicsXG4gICAgICAgICAgb2JqZWN0VVJMOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuSW1hZ2VXaXRoQ2FwdGlvbk5vcm1hbEltYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnSW1hZ2Ugd2l0aCBDYXB0aW9uIChub3JtYWwgaW1hZ2UpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbWFnZVdpdGhDYXB0aW9uQWxsV2hpdGVJbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBtZWRpYTogW1xuICAgICAgICBjcmVhdGVNZWRpYUl0ZW0oe1xuICAgICAgICAgIGNhcHRpb246XG4gICAgICAgICAgICAnVGhpcyBpcyB0aGUgdXNlci1wcm92aWRlZCBjYXB0aW9uLiBJdCBzaG91bGQgYmUgdmlzaWJsZSBvbiBsaWdodCBiYWNrZ3JvdW5kcy4nLFxuICAgICAgICAgIG9iamVjdFVSTDogJy9maXh0dXJlcy8yMDAweDIwMDAtd2hpdGUucG5nJyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuSW1hZ2VXaXRoQ2FwdGlvbkFsbFdoaXRlSW1hZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbWFnZSB3aXRoIENhcHRpb24gKGFsbC13aGl0ZSBpbWFnZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IFNpbmdsZVZpZGVvID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExpZ2h0Ym94XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIG1lZGlhOiBbXG4gICAgICAgIGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgICAgICBvYmplY3RVUkw6ICcvZml4dHVyZXMvcGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBTaW5nbGVWaWRlb1dDYXB0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExpZ2h0Ym94XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIG1lZGlhOiBbXG4gICAgICAgIGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgICAgICAgY2FwdGlvbjpcbiAgICAgICAgICAgICdUaGlzIGlzIHRoZSB1c2VyLXByb3ZpZGVkIGNhcHRpb24uIEl0IGNhbiBnZXQgbG9uZyBhbmQgd3JhcCBvbnRvIG11bHRpcGxlIGxpbmVzLicsXG4gICAgICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgICAgICBvYmplY3RVUkw6ICcvZml4dHVyZXMvcGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KX1cbiAgLz5cbik7XG5cblNpbmdsZVZpZGVvV0NhcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdTaW5nbGUgVmlkZW8gdy9jYXB0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVbnN1cHBvcnRlZEltYWdlVHlwZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBtZWRpYTogW1xuICAgICAgICBjcmVhdGVNZWRpYUl0ZW0oe1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKCdpbWFnZS90aWZmJyksXG4gICAgICAgICAgb2JqZWN0VVJMOiAndW5zdXBwb3J0ZWQtaW1hZ2UudGlmZicsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBVbnN1cHBvcnRlZFZpZGVvVHlwZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBtZWRpYTogW1xuICAgICAgICBjcmVhdGVNZWRpYUl0ZW0oe1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19RVUlDS1RJTUUsXG4gICAgICAgICAgb2JqZWN0VVJMOiAndW5zdXBwb3J0ZWQtdmlkZW8ubW92JyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFVuc3VwcG9ydGVkQ29udGVudCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBtZWRpYTogW1xuICAgICAgICBjcmVhdGVNZWRpYUl0ZW0oe1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBBVURJT19NUDMsXG4gICAgICAgICAgb2JqZWN0VVJMOiAnL2ZpeHR1cmVzL2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tQ2hpbGRyZW4gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGlnaHRib3ggey4uLmNyZWF0ZVByb3BzKHt9KX0gbWVkaWE9e1tdfT5cbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgfX1cbiAgICA+XG4gICAgICBJIGFtIG1pZGRsZSBjaGlsZFxuICAgIDwvZGl2PlxuICA8L0xpZ2h0Ym94PlxuKTtcblxuQ3VzdG9tQ2hpbGRyZW4uc3RvcnkgPSB7XG4gIG5hbWU6ICdDdXN0b20gY2hpbGRyZW4nLFxufTtcblxuZXhwb3J0IGNvbnN0IEZvcndhcmRpbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGlnaHRib3ggey4uLmNyZWF0ZVByb3BzKHt9KX0gb25Gb3J3YXJkPXthY3Rpb24oJ29uRm9yd2FyZCcpfSAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbkhlYWRlciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7fSl9XG4gICAgZ2V0Q29udmVyc2F0aW9uPXsoKSA9PiAoe1xuICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogdHJ1ZSxcbiAgICAgIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgICAgIGJhZGdlczogW10sXG4gICAgICBpZDogJzEyMzQnLFxuICAgICAgaXNNZTogZmFsc2UsXG4gICAgICBuYW1lOiAnVGVzdCcsXG4gICAgICBwcm9maWxlTmFtZTogJ1Rlc3QnLFxuICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICB0aXRsZTogJ1Rlc3QnLFxuICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgfSl9XG4gICAgbWVkaWE9e1tcbiAgICAgIGNyZWF0ZU1lZGlhSXRlbSh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICAgIG9iamVjdFVSTDogJy9maXh0dXJlcy9waXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICAgIH0pLFxuICAgIF19XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgVmlld09uY2VWaWRlbyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc1ZpZXdPbmNlOiB0cnVlLFxuICAgICAgbWVkaWE6IFtcbiAgICAgICAgY3JlYXRlTWVkaWFJdGVtKHtcbiAgICAgICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgICAgIG9iamVjdFVSTDogJy9maXh0dXJlcy9waXhhYmF5LVNvYXAtQnViYmxlLTcxNDEubXA0JyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pfVxuICAgIGlzVmlld09uY2VcbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5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
