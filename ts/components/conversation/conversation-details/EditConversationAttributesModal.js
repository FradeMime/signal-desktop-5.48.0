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
var EditConversationAttributesModal_exports = {};
__export(EditConversationAttributesModal_exports, {
  EditConversationAttributesModal: () => EditConversationAttributesModal
});
module.exports = __toCommonJS(EditConversationAttributesModal_exports);
var import_react = __toESM(require("react"));
var import_Modal = require("../../Modal");
var import_AvatarEditor = require("../../AvatarEditor");
var import_AvatarPreview = require("../../AvatarPreview");
var import_Button = require("../../Button");
var import_Spinner = require("../../Spinner");
var import_GroupDescriptionInput = require("../../GroupDescriptionInput");
var import_GroupTitleInput = require("../../GroupTitleInput");
var import_util = require("./util");
const EditConversationAttributesModal = /* @__PURE__ */ __name(({
  avatarColor,
  avatarPath: externalAvatarPath,
  conversationId,
  groupDescription: externalGroupDescription = "",
  i18n,
  initiallyFocusDescription,
  makeRequest,
  onClose,
  requestState,
  title: externalTitle,
  deleteAvatarFromDisk,
  replaceAvatar,
  saveAvatarToDisk,
  userAvatarData
}) => {
  const focusDescriptionRef = (0, import_react.useRef)(initiallyFocusDescription);
  const focusDescription = focusDescriptionRef.current;
  const startingTitleRef = (0, import_react.useRef)(externalTitle);
  const startingAvatarPathRef = (0, import_react.useRef)(externalAvatarPath);
  const [editingAvatar, setEditingAvatar] = (0, import_react.useState)(false);
  const [avatar, setAvatar] = (0, import_react.useState)();
  const [rawTitle, setRawTitle] = (0, import_react.useState)(externalTitle);
  const [rawGroupDescription, setRawGroupDescription] = (0, import_react.useState)(externalGroupDescription);
  const [hasAvatarChanged, setHasAvatarChanged] = (0, import_react.useState)(false);
  const trimmedTitle = rawTitle.trim();
  const trimmedDescription = rawGroupDescription.trim();
  const focusRef = /* @__PURE__ */ __name((el) => {
    if (el) {
      el.focus();
      focusDescriptionRef.current = void 0;
    }
  }, "focusRef");
  const hasChangedExternally = startingAvatarPathRef.current !== externalAvatarPath || startingTitleRef.current !== externalTitle;
  const hasTitleChanged = trimmedTitle !== externalTitle.trim();
  const hasGroupDescriptionChanged = externalGroupDescription.trim() !== trimmedDescription;
  const isRequestActive = requestState === import_util.RequestState.Active;
  const canSubmit = !isRequestActive && (hasChangedExternally || hasTitleChanged || hasAvatarChanged || hasGroupDescriptionChanged) && trimmedTitle.length > 0;
  const onSubmit = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    const request = {};
    if (hasAvatarChanged) {
      request.avatar = avatar;
    }
    if (hasTitleChanged) {
      request.title = trimmedTitle;
    }
    if (hasGroupDescriptionChanged) {
      request.description = trimmedDescription;
    }
    makeRequest(request);
  }, "onSubmit");
  const avatarPathForPreview = hasAvatarChanged ? void 0 : externalAvatarPath;
  let content;
  if (editingAvatar) {
    content = /* @__PURE__ */ import_react.default.createElement(import_AvatarEditor.AvatarEditor, {
      avatarColor,
      avatarPath: avatarPathForPreview,
      avatarValue: avatar,
      conversationId,
      deleteAvatarFromDisk,
      i18n,
      isGroup: true,
      onCancel: () => {
        setHasAvatarChanged(false);
        setEditingAvatar(false);
      },
      onSave: (newAvatar) => {
        setAvatar(newAvatar);
        setHasAvatarChanged(true);
        setEditingAvatar(false);
      },
      userAvatarData,
      replaceAvatar,
      saveAvatarToDisk
    });
  } else {
    content = /* @__PURE__ */ import_react.default.createElement("form", {
      onSubmit,
      className: "module-EditConversationAttributesModal"
    }, /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
      avatarColor,
      avatarPath: avatarPathForPreview,
      avatarValue: avatar,
      i18n,
      isEditable: true,
      isGroup: true,
      onClick: () => {
        setEditingAvatar(true);
      },
      style: {
        height: 96,
        width: 96
      }
    }), /* @__PURE__ */ import_react.default.createElement(import_GroupTitleInput.GroupTitleInput, {
      disabled: isRequestActive,
      i18n,
      onChangeValue: setRawTitle,
      ref: focusDescription === false ? focusRef : void 0,
      value: rawTitle
    }), /* @__PURE__ */ import_react.default.createElement(import_GroupDescriptionInput.GroupDescriptionInput, {
      disabled: isRequestActive,
      i18n,
      onChangeValue: setRawGroupDescription,
      ref: focusDescription === true ? focusRef : void 0,
      value: rawGroupDescription
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-EditConversationAttributesModal__description-warning"
    }, i18n("EditConversationAttributesModal__description-warning")), requestState === import_util.RequestState.InactiveWithError && /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-EditConversationAttributesModal__error-message"
    }, i18n("updateGroupAttributes__error-message")), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      disabled: isRequestActive,
      onClick: onClose,
      variant: import_Button.ButtonVariant.Secondary
    }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      type: "submit",
      variant: import_Button.ButtonVariant.Primary,
      disabled: !canSubmit
    }, isRequestActive ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      size: "20px",
      svgSize: "small",
      direction: "on-avatar"
    }) : i18n("save"))));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasStickyButtons: true,
    hasXButton: true,
    i18n,
    onClose,
    title: i18n("updateGroupAttributes__title")
  }, content);
}, "EditConversationAttributesModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditConversationAttributesModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGb3JtRXZlbnRIYW5kbGVyLCBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi4vLi4vTW9kYWwnO1xuaW1wb3J0IHsgQXZhdGFyRWRpdG9yIH0gZnJvbSAnLi4vLi4vQXZhdGFyRWRpdG9yJztcbmltcG9ydCB7IEF2YXRhclByZXZpZXcgfSBmcm9tICcuLi8uLi9BdmF0YXJQcmV2aWV3JztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uLy4uL0J1dHRvbic7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vLi4vU3Bpbm5lcic7XG5pbXBvcnQgeyBHcm91cERlc2NyaXB0aW9uSW5wdXQgfSBmcm9tICcuLi8uLi9Hcm91cERlc2NyaXB0aW9uSW5wdXQnO1xuaW1wb3J0IHsgR3JvdXBUaXRsZUlucHV0IH0gZnJvbSAnLi4vLi4vR3JvdXBUaXRsZUlucHV0JztcbmltcG9ydCB7IFJlcXVlc3RTdGF0ZSB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgdHlwZSB7XG4gIEF2YXRhckRhdGFUeXBlLFxuICBEZWxldGVBdmF0YXJGcm9tRGlza0FjdGlvblR5cGUsXG4gIFJlcGxhY2VBdmF0YXJBY3Rpb25UeXBlLFxuICBTYXZlQXZhdGFyVG9EaXNrQWN0aW9uVHlwZSxcbn0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQXZhdGFyJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQ29sb3JzJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGF2YXRhckNvbG9yPzogQXZhdGFyQ29sb3JUeXBlO1xuICBhdmF0YXJQYXRoPzogc3RyaW5nO1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBncm91cERlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpbml0aWFsbHlGb2N1c0Rlc2NyaXB0aW9uOiBib29sZWFuO1xuICBtYWtlUmVxdWVzdDogKFxuICAgIF86IFJlYWRvbmx5PHtcbiAgICAgIGF2YXRhcj86IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXk7XG4gICAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICAgIHRpdGxlPzogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICAgIH0+XG4gICkgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcmVxdWVzdFN0YXRlOiBSZXF1ZXN0U3RhdGU7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlbGV0ZUF2YXRhckZyb21EaXNrOiBEZWxldGVBdmF0YXJGcm9tRGlza0FjdGlvblR5cGU7XG4gIHJlcGxhY2VBdmF0YXI6IFJlcGxhY2VBdmF0YXJBY3Rpb25UeXBlO1xuICBzYXZlQXZhdGFyVG9EaXNrOiBTYXZlQXZhdGFyVG9EaXNrQWN0aW9uVHlwZTtcbiAgdXNlckF2YXRhckRhdGE6IEFycmF5PEF2YXRhckRhdGFUeXBlPjtcbn07XG5cbmV4cG9ydCBjb25zdCBFZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsOiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID0gKHtcbiAgYXZhdGFyQ29sb3IsXG4gIGF2YXRhclBhdGg6IGV4dGVybmFsQXZhdGFyUGF0aCxcbiAgY29udmVyc2F0aW9uSWQsXG4gIGdyb3VwRGVzY3JpcHRpb246IGV4dGVybmFsR3JvdXBEZXNjcmlwdGlvbiA9ICcnLFxuICBpMThuLFxuICBpbml0aWFsbHlGb2N1c0Rlc2NyaXB0aW9uLFxuICBtYWtlUmVxdWVzdCxcbiAgb25DbG9zZSxcbiAgcmVxdWVzdFN0YXRlLFxuICB0aXRsZTogZXh0ZXJuYWxUaXRsZSxcbiAgZGVsZXRlQXZhdGFyRnJvbURpc2ssXG4gIHJlcGxhY2VBdmF0YXIsXG4gIHNhdmVBdmF0YXJUb0Rpc2ssXG4gIHVzZXJBdmF0YXJEYXRhLFxufSkgPT4ge1xuICBjb25zdCBmb2N1c0Rlc2NyaXB0aW9uUmVmID0gdXNlUmVmPHVuZGVmaW5lZCB8IGJvb2xlYW4+KFxuICAgIGluaXRpYWxseUZvY3VzRGVzY3JpcHRpb25cbiAgKTtcbiAgY29uc3QgZm9jdXNEZXNjcmlwdGlvbiA9IGZvY3VzRGVzY3JpcHRpb25SZWYuY3VycmVudDtcblxuICBjb25zdCBzdGFydGluZ1RpdGxlUmVmID0gdXNlUmVmPHN0cmluZz4oZXh0ZXJuYWxUaXRsZSk7XG4gIGNvbnN0IHN0YXJ0aW5nQXZhdGFyUGF0aFJlZiA9IHVzZVJlZjx1bmRlZmluZWQgfCBzdHJpbmc+KGV4dGVybmFsQXZhdGFyUGF0aCk7XG5cbiAgY29uc3QgW2VkaXRpbmdBdmF0YXIsIHNldEVkaXRpbmdBdmF0YXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYXZhdGFyLCBzZXRBdmF0YXJdID0gdXNlU3RhdGU8dW5kZWZpbmVkIHwgVWludDhBcnJheT4oKTtcbiAgY29uc3QgW3Jhd1RpdGxlLCBzZXRSYXdUaXRsZV0gPSB1c2VTdGF0ZShleHRlcm5hbFRpdGxlKTtcbiAgY29uc3QgW3Jhd0dyb3VwRGVzY3JpcHRpb24sIHNldFJhd0dyb3VwRGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXG4gICAgZXh0ZXJuYWxHcm91cERlc2NyaXB0aW9uXG4gICk7XG4gIGNvbnN0IFtoYXNBdmF0YXJDaGFuZ2VkLCBzZXRIYXNBdmF0YXJDaGFuZ2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB0cmltbWVkVGl0bGUgPSByYXdUaXRsZS50cmltKCk7XG4gIGNvbnN0IHRyaW1tZWREZXNjcmlwdGlvbiA9IHJhd0dyb3VwRGVzY3JpcHRpb24udHJpbSgpO1xuXG4gIGNvbnN0IGZvY3VzUmVmID0gKGVsOiBudWxsIHwgSFRNTEVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgICBmb2N1c0Rlc2NyaXB0aW9uUmVmLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhc0NoYW5nZWRFeHRlcm5hbGx5ID1cbiAgICBzdGFydGluZ0F2YXRhclBhdGhSZWYuY3VycmVudCAhPT0gZXh0ZXJuYWxBdmF0YXJQYXRoIHx8XG4gICAgc3RhcnRpbmdUaXRsZVJlZi5jdXJyZW50ICE9PSBleHRlcm5hbFRpdGxlO1xuICBjb25zdCBoYXNUaXRsZUNoYW5nZWQgPSB0cmltbWVkVGl0bGUgIT09IGV4dGVybmFsVGl0bGUudHJpbSgpO1xuICBjb25zdCBoYXNHcm91cERlc2NyaXB0aW9uQ2hhbmdlZCA9XG4gICAgZXh0ZXJuYWxHcm91cERlc2NyaXB0aW9uLnRyaW0oKSAhPT0gdHJpbW1lZERlc2NyaXB0aW9uO1xuXG4gIGNvbnN0IGlzUmVxdWVzdEFjdGl2ZSA9IHJlcXVlc3RTdGF0ZSA9PT0gUmVxdWVzdFN0YXRlLkFjdGl2ZTtcblxuICBjb25zdCBjYW5TdWJtaXQgPVxuICAgICFpc1JlcXVlc3RBY3RpdmUgJiZcbiAgICAoaGFzQ2hhbmdlZEV4dGVybmFsbHkgfHxcbiAgICAgIGhhc1RpdGxlQ2hhbmdlZCB8fFxuICAgICAgaGFzQXZhdGFyQ2hhbmdlZCB8fFxuICAgICAgaGFzR3JvdXBEZXNjcmlwdGlvbkNoYW5nZWQpICYmXG4gICAgdHJpbW1lZFRpdGxlLmxlbmd0aCA+IDA7XG5cbiAgY29uc3Qgb25TdWJtaXQ6IEZvcm1FdmVudEhhbmRsZXI8SFRNTEZvcm1FbGVtZW50PiA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgcmVxdWVzdDoge1xuICAgICAgYXZhdGFyPzogdW5kZWZpbmVkIHwgVWludDhBcnJheTtcbiAgICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgfSA9IHt9O1xuICAgIGlmIChoYXNBdmF0YXJDaGFuZ2VkKSB7XG4gICAgICByZXF1ZXN0LmF2YXRhciA9IGF2YXRhcjtcbiAgICB9XG4gICAgaWYgKGhhc1RpdGxlQ2hhbmdlZCkge1xuICAgICAgcmVxdWVzdC50aXRsZSA9IHRyaW1tZWRUaXRsZTtcbiAgICB9XG4gICAgaWYgKGhhc0dyb3VwRGVzY3JpcHRpb25DaGFuZ2VkKSB7XG4gICAgICByZXF1ZXN0LmRlc2NyaXB0aW9uID0gdHJpbW1lZERlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBtYWtlUmVxdWVzdChyZXF1ZXN0KTtcbiAgfTtcblxuICBjb25zdCBhdmF0YXJQYXRoRm9yUHJldmlldyA9IGhhc0F2YXRhckNoYW5nZWRcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogZXh0ZXJuYWxBdmF0YXJQYXRoO1xuXG4gIGxldCBjb250ZW50OiBKU1guRWxlbWVudDtcbiAgaWYgKGVkaXRpbmdBdmF0YXIpIHtcbiAgICBjb250ZW50ID0gKFxuICAgICAgPEF2YXRhckVkaXRvclxuICAgICAgICBhdmF0YXJDb2xvcj17YXZhdGFyQ29sb3J9XG4gICAgICAgIGF2YXRhclBhdGg9e2F2YXRhclBhdGhGb3JQcmV2aWV3fVxuICAgICAgICBhdmF0YXJWYWx1ZT17YXZhdGFyfVxuICAgICAgICBjb252ZXJzYXRpb25JZD17Y29udmVyc2F0aW9uSWR9XG4gICAgICAgIGRlbGV0ZUF2YXRhckZyb21EaXNrPXtkZWxldGVBdmF0YXJGcm9tRGlza31cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNHcm91cFxuICAgICAgICBvbkNhbmNlbD17KCkgPT4ge1xuICAgICAgICAgIHNldEhhc0F2YXRhckNoYW5nZWQoZmFsc2UpO1xuICAgICAgICAgIHNldEVkaXRpbmdBdmF0YXIoZmFsc2UpO1xuICAgICAgICB9fVxuICAgICAgICBvblNhdmU9e25ld0F2YXRhciA9PiB7XG4gICAgICAgICAgc2V0QXZhdGFyKG5ld0F2YXRhcik7XG4gICAgICAgICAgc2V0SGFzQXZhdGFyQ2hhbmdlZCh0cnVlKTtcbiAgICAgICAgICBzZXRFZGl0aW5nQXZhdGFyKGZhbHNlKTtcbiAgICAgICAgfX1cbiAgICAgICAgdXNlckF2YXRhckRhdGE9e3VzZXJBdmF0YXJEYXRhfVxuICAgICAgICByZXBsYWNlQXZhdGFyPXtyZXBsYWNlQXZhdGFyfVxuICAgICAgICBzYXZlQXZhdGFyVG9EaXNrPXtzYXZlQXZhdGFyVG9EaXNrfVxuICAgICAgLz5cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvbnRlbnQgPSAoXG4gICAgICA8Zm9ybVxuICAgICAgICBvblN1Ym1pdD17b25TdWJtaXR9XG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1FZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsXCJcbiAgICAgID5cbiAgICAgICAgPEF2YXRhclByZXZpZXdcbiAgICAgICAgICBhdmF0YXJDb2xvcj17YXZhdGFyQ29sb3J9XG4gICAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aEZvclByZXZpZXd9XG4gICAgICAgICAgYXZhdGFyVmFsdWU9e2F2YXRhcn1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlzRWRpdGFibGVcbiAgICAgICAgICBpc0dyb3VwXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgc2V0RWRpdGluZ0F2YXRhcih0cnVlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6IDk2LFxuICAgICAgICAgICAgd2lkdGg6IDk2LFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG5cbiAgICAgICAgPEdyb3VwVGl0bGVJbnB1dFxuICAgICAgICAgIGRpc2FibGVkPXtpc1JlcXVlc3RBY3RpdmV9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNoYW5nZVZhbHVlPXtzZXRSYXdUaXRsZX1cbiAgICAgICAgICByZWY9e2ZvY3VzRGVzY3JpcHRpb24gPT09IGZhbHNlID8gZm9jdXNSZWYgOiB1bmRlZmluZWR9XG4gICAgICAgICAgdmFsdWU9e3Jhd1RpdGxlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxHcm91cERlc2NyaXB0aW9uSW5wdXRcbiAgICAgICAgICBkaXNhYmxlZD17aXNSZXF1ZXN0QWN0aXZlfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DaGFuZ2VWYWx1ZT17c2V0UmF3R3JvdXBEZXNjcmlwdGlvbn1cbiAgICAgICAgICByZWY9e2ZvY3VzRGVzY3JpcHRpb24gPT09IHRydWUgPyBmb2N1c1JlZiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICB2YWx1ZT17cmF3R3JvdXBEZXNjcmlwdGlvbn1cbiAgICAgICAgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1FZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsX19kZXNjcmlwdGlvbi13YXJuaW5nXCI+XG4gICAgICAgICAge2kxOG4oJ0VkaXRDb252ZXJzYXRpb25BdHRyaWJ1dGVzTW9kYWxfX2Rlc2NyaXB0aW9uLXdhcm5pbmcnKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3JlcXVlc3RTdGF0ZSA9PT0gUmVxdWVzdFN0YXRlLkluYWN0aXZlV2l0aEVycm9yICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1FZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsX19lcnJvci1tZXNzYWdlXCI+XG4gICAgICAgICAgICB7aTE4bigndXBkYXRlR3JvdXBBdHRyaWJ1dGVzX19lcnJvci1tZXNzYWdlJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgPE1vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNSZXF1ZXN0QWN0aXZlfVxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdjYW5jZWwnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5QcmltYXJ5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5TdWJtaXR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzUmVxdWVzdEFjdGl2ZSA/IChcbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cIjIwcHhcIiBzdmdTaXplPVwic21hbGxcIiBkaXJlY3Rpb249XCJvbi1hdmF0YXJcIiAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgaTE4bignc2F2ZScpXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIGhhc1N0aWNreUJ1dHRvbnNcbiAgICAgIGhhc1hCdXR0b25cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgdGl0bGU9e2kxOG4oJ3VwZGF0ZUdyb3VwQXR0cmlidXRlc19fdGl0bGUnKX1cbiAgICA+XG4gICAgICB7Y29udGVudH1cbiAgICA8L01vZGFsPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBd0M7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
