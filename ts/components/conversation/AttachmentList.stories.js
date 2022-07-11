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
var AttachmentList_stories_exports = {};
__export(AttachmentList_stories_exports, {
  EmptyList: () => EmptyList,
  MultipleVisualAttachments: () => MultipleVisualAttachments,
  MultipleWithNonVisualTypes: () => MultipleWithNonVisualTypes,
  OneFile: () => OneFile,
  default: () => AttachmentList_stories_default
});
module.exports = __toCommonJS(AttachmentList_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_AttachmentList = require("./AttachmentList");
var import_MIME = require("../../types/MIME");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var AttachmentList_stories_default = {
  title: "Components/Conversation/AttachmentList"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  attachments: overrideProps.attachments || [],
  i18n,
  onAddAttachment: (0, import_addon_actions.action)("onAddAttachment"),
  onClickAttachment: (0, import_addon_actions.action)("onClickAttachment"),
  onClose: (0, import_addon_actions.action)("onClose"),
  onCloseAttachment: (0, import_addon_actions.action)("onCloseAttachment")
}), "createProps");
const OneFile = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        url: "/fixtures/tina-rolf-269345-unsplash.jpg"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_AttachmentList.AttachmentList, {
    ...props
  });
}, "OneFile");
const MultipleVisualAttachments = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        url: "/fixtures/tina-rolf-269345-unsplash.jpg"
      }),
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.VIDEO_MP4,
        fileName: "pixabay-Soap-Bubble-7141.mp4",
        url: "/fixtures/kitten-4-112-112.jpg",
        screenshotPath: "/fixtures/kitten-4-112-112.jpg"
      }),
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.IMAGE_GIF,
        fileName: "giphy-GVNv0UpeYm17e",
        url: "/fixtures/giphy-GVNvOUpeYmI7e.gif"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_AttachmentList.AttachmentList, {
    ...props
  });
}, "MultipleVisualAttachments");
const MultipleWithNonVisualTypes = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachments: [
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        fileName: "tina-rolf-269345-unsplash.jpg",
        url: "/fixtures/tina-rolf-269345-unsplash.jpg"
      }),
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
        fileName: "lorem-ipsum.txt",
        url: "/fixtures/lorem-ipsum.txt"
      }),
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.AUDIO_MP3,
        fileName: "incompetech-com-Agnus-Dei-X.mp3",
        url: "/fixtures/incompetech-com-Agnus-Dei-X.mp3"
      }),
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.VIDEO_MP4,
        fileName: "pixabay-Soap-Bubble-7141.mp4",
        url: "/fixtures/kitten-4-112-112.jpg",
        screenshotPath: "/fixtures/kitten-4-112-112.jpg"
      }),
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.IMAGE_GIF,
        fileName: "giphy-GVNv0UpeYm17e",
        url: "/fixtures/giphy-GVNvOUpeYmI7e.gif"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_AttachmentList.AttachmentList, {
    ...props
  });
}, "MultipleWithNonVisualTypes");
MultipleWithNonVisualTypes.story = {
  name: "Multiple with Non-Visual Types"
};
const EmptyList = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_AttachmentList.AttachmentList, {
    ...props
  });
}, "EmptyList");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyList,
  MultipleVisualAttachments,
  MultipleWithNonVisualTypes,
  OneFile
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudExpc3Quc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnREcmFmdFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL0F0dGFjaG1lbnRMaXN0JztcbmltcG9ydCB7IEF0dGFjaG1lbnRMaXN0IH0gZnJvbSAnLi9BdHRhY2htZW50TGlzdCc7XG5pbXBvcnQge1xuICBBVURJT19NUDMsXG4gIElNQUdFX0dJRixcbiAgSU1BR0VfSlBFRyxcbiAgVklERU9fTVA0LFxuICBzdHJpbmdUb01JTUVUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgeyBmYWtlRHJhZnRBdHRhY2htZW50IH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZmFrZUF0dGFjaG1lbnQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQXR0YWNobWVudExpc3QnLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoXG4gIG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM8QXR0YWNobWVudERyYWZ0VHlwZT4+ID0ge31cbik6IFByb3BzPEF0dGFjaG1lbnREcmFmdFR5cGU+ID0+ICh7XG4gIGF0dGFjaG1lbnRzOiBvdmVycmlkZVByb3BzLmF0dGFjaG1lbnRzIHx8IFtdLFxuICBpMThuLFxuICBvbkFkZEF0dGFjaG1lbnQ6IGFjdGlvbignb25BZGRBdHRhY2htZW50JyksXG4gIG9uQ2xpY2tBdHRhY2htZW50OiBhY3Rpb24oJ29uQ2xpY2tBdHRhY2htZW50JyksXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICBvbkNsb3NlQXR0YWNobWVudDogYWN0aW9uKCdvbkNsb3NlQXR0YWNobWVudCcpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBPbmVGaWxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VEcmFmdEF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICd0aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZycsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbiAgcmV0dXJuIDxBdHRhY2htZW50TGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpcGxlVmlzdWFsQXR0YWNobWVudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhdHRhY2htZW50czogW1xuICAgICAgZmFrZURyYWZ0QXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgIH0pLFxuICAgICAgZmFrZURyYWZ0QXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBWSURFT19NUDQsXG4gICAgICAgIGZpbGVOYW1lOiAncGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCcsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgICAgIHNjcmVlbnNob3RQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi00LTExMi0xMTIuanBnJyxcbiAgICAgIH0pLFxuICAgICAgZmFrZURyYWZ0QXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9HSUYsXG4gICAgICAgIGZpbGVOYW1lOiAnZ2lwaHktR1ZOdjBVcGVZbTE3ZScsXG4gICAgICAgIHVybDogJy9maXh0dXJlcy9naXBoeS1HVk52T1VwZVltSTdlLmdpZicsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4gPEF0dGFjaG1lbnRMaXN0IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlwbGVXaXRoTm9uVmlzdWFsVHlwZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhdHRhY2htZW50czogW1xuICAgICAgZmFrZURyYWZ0QXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL3RpbmEtcm9sZi0yNjkzNDUtdW5zcGxhc2guanBnJyxcbiAgICAgIH0pLFxuICAgICAgZmFrZURyYWZ0QXR0YWNobWVudCh7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKCd0ZXh0L3BsYWluJyksXG4gICAgICAgIGZpbGVOYW1lOiAnbG9yZW0taXBzdW0udHh0JyxcbiAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2xvcmVtLWlwc3VtLnR4dCcsXG4gICAgICB9KSxcbiAgICAgIGZha2VEcmFmdEF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogQVVESU9fTVAzLFxuICAgICAgICBmaWxlTmFtZTogJ2luY29tcGV0ZWNoLWNvbS1BZ251cy1EZWktWC5tcDMnLFxuICAgICAgICB1cmw6ICcvZml4dHVyZXMvaW5jb21wZXRlY2gtY29tLUFnbnVzLURlaS1YLm1wMycsXG4gICAgICB9KSxcbiAgICAgIGZha2VEcmFmdEF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogVklERU9fTVA0LFxuICAgICAgICBmaWxlTmFtZTogJ3BpeGFiYXktU29hcC1CdWJibGUtNzE0MS5tcDQnLFxuICAgICAgICB1cmw6ICcvZml4dHVyZXMva2l0dGVuLTQtMTEyLTExMi5qcGcnLFxuICAgICAgICBzY3JlZW5zaG90UGF0aDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgICB9KSxcbiAgICAgIGZha2VEcmFmdEF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfR0lGLFxuICAgICAgICBmaWxlTmFtZTogJ2dpcGh5LUdWTnYwVXBlWW0xN2UnLFxuICAgICAgICB1cmw6ICcvZml4dHVyZXMvZ2lwaHktR1ZOdk9VcGVZbUk3ZS5naWYnLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxBdHRhY2htZW50TGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuTXVsdGlwbGVXaXRoTm9uVmlzdWFsVHlwZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNdWx0aXBsZSB3aXRoIE5vbi1WaXN1YWwgVHlwZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtcHR5TGlzdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRl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
