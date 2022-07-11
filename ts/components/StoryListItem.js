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
var StoryListItem_exports = {};
__export(StoryListItem_exports, {
  StoryListItem: () => StoryListItem
});
module.exports = __toCommonJS(StoryListItem_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Avatar = require("./Avatar");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_ContextMenu = require("./ContextMenu");
var import_MessageTimestamp = require("./conversation/MessageTimestamp");
var import_StoryImage = require("./StoryImage");
var import_Colors = require("../types/Colors");
const StoryListItem = /* @__PURE__ */ __name(({
  group,
  hasMultiple,
  i18n,
  isHidden,
  onClick,
  onGoToConversation,
  onHideStory,
  queueStoryDownload,
  story
}) => {
  const [hasConfirmHideStory, setHasConfirmHideStory] = (0, import_react.useState)(false);
  const [isShowingContextMenu, setIsShowingContextMenu] = (0, import_react.useState)(false);
  const [referenceElement, setReferenceElement] = (0, import_react.useState)(null);
  const {
    attachment,
    hasReplies,
    hasRepliesFromSelf,
    isUnread,
    sender,
    timestamp
  } = story;
  const {
    acceptedMessageRequest,
    avatarPath,
    color,
    firstName,
    isMe,
    name,
    profileName,
    sharedGroupNames,
    title
  } = sender;
  let avatarStoryRing;
  if (attachment) {
    avatarStoryRing = isUnread ? import_Avatar.AvatarStoryRing.Unread : import_Avatar.AvatarStoryRing.Read;
  }
  let repliesElement;
  if (hasRepliesFromSelf) {
    repliesElement = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryListItem__info--replies--self"
    });
  } else if (hasReplies) {
    repliesElement = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryListItem__info--replies--others"
    });
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("StoryListItem__label"),
    className: (0, import_classnames.default)("StoryListItem", {
      "StoryListItem--hidden": isHidden
    }),
    onClick,
    onContextMenu: (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!isMe) {
        setIsShowingContextMenu(true);
      }
    },
    ref: setReferenceElement,
    tabIndex: 0,
    type: "button"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    sharedGroupNames,
    avatarPath,
    badge: void 0,
    color: (0, import_Colors.getAvatarColor)(color),
    conversationType: "direct",
    i18n,
    isMe: Boolean(isMe),
    name,
    profileName,
    size: import_Avatar.AvatarSize.FORTY_EIGHT,
    storyRing: avatarStoryRing,
    title
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryListItem__info"
  }, isMe ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryListItem__info--title"
  }, i18n("Stories__mine")), !attachment && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryListItem__info--timestamp"
  }, i18n("Stories__add"))) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryListItem__info--title"
  }, group ? i18n("Stories__from-to-group", {
    name: title,
    group: group.title
  }) : title), /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
    i18n,
    module: "StoryListItem__info--timestamp",
    timestamp
  })), repliesElement), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("StoryListItem__previews", {
      "StoryListItem__previews--multiple": hasMultiple
    })
  }, !attachment && isMe && /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": i18n("Stories__add"),
    className: "StoryListItem__previews--add StoryListItem__previews--image"
  }), hasMultiple && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryListItem__previews--more"
  }), /* @__PURE__ */ import_react.default.createElement(import_StoryImage.StoryImage, {
    attachment,
    i18n,
    isThumbnail: true,
    label: "",
    moduleClassName: "StoryListItem__previews--image",
    queueStoryDownload,
    storyId: story.messageId
  }))), /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenuPopper, {
    isMenuShowing: isShowingContextMenu,
    menuOptions: [
      {
        icon: "StoryListItem__icon--hide",
        label: isHidden ? i18n("StoryListItem__unhide") : i18n("StoryListItem__hide"),
        onClick: () => {
          if (isHidden) {
            onHideStory(sender.id);
          } else {
            setHasConfirmHideStory(true);
          }
        }
      },
      {
        icon: "StoryListItem__icon--chat",
        label: i18n("StoryListItem__go-to-chat"),
        onClick: () => {
          onGoToConversation(sender.id);
        }
      }
    ],
    onClose: () => setIsShowingContextMenu(false),
    popperOptions: {
      placement: "bottom",
      strategy: "absolute"
    },
    referenceElement
  }), hasConfirmHideStory && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: () => onHideStory(sender.id),
        style: "affirmative",
        text: i18n("StoryListItem__hide-modal--confirm")
      }
    ],
    i18n,
    onClose: () => {
      setHasConfirmHideStory(false);
    }
  }, i18n("StoryListItem__hide-modal--body", [String(firstName)])));
}, "StoryListItem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoryListItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlMaXN0SXRlbS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgQXZhdGFyLCBBdmF0YXJTaXplLCBBdmF0YXJTdG9yeVJpbmcgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBDb250ZXh0TWVudVBvcHBlciB9IGZyb20gJy4vQ29udGV4dE1lbnUnO1xuaW1wb3J0IHsgTWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4vY29udmVyc2F0aW9uL01lc3NhZ2VUaW1lc3RhbXAnO1xuaW1wb3J0IHsgU3RvcnlJbWFnZSB9IGZyb20gJy4vU3RvcnlJbWFnZSc7XG5pbXBvcnQgeyBnZXRBdmF0YXJDb2xvciB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5cbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvblN0b3J5VHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgZ3JvdXA/OiBQaWNrPFxuICAgIENvbnZlcnNhdGlvblR5cGUsXG4gICAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgICB8ICdhdmF0YXJQYXRoJ1xuICAgIHwgJ2NvbG9yJ1xuICAgIHwgJ2lkJ1xuICAgIHwgJ25hbWUnXG4gICAgfCAncHJvZmlsZU5hbWUnXG4gICAgfCAnc2hhcmVkR3JvdXBOYW1lcydcbiAgICB8ICd0aXRsZSdcbiAgPjtcbiAgaGFzTXVsdGlwbGU/OiBib29sZWFuO1xuICBpc0hpZGRlbj86IGJvb2xlYW47XG4gIHNlYXJjaE5hbWVzPzogc3RyaW5nOyAvLyBUaGlzIGlzIGp1c3QgaGVyZSB0byBzYXRpc2Z5IEZ1c2UncyB0eXBlc1xuICBzdG9yaWVzOiBBcnJheTxTdG9yeVZpZXdUeXBlPjtcbn07XG5cbmV4cG9ydCB0eXBlIFN0b3J5Vmlld1R5cGUgPSB7XG4gIGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZTtcbiAgY2FuUmVwbHk/OiBib29sZWFuO1xuICBoYXNSZXBsaWVzPzogYm9vbGVhbjtcbiAgaGFzUmVwbGllc0Zyb21TZWxmPzogYm9vbGVhbjtcbiAgaXNIaWRkZW4/OiBib29sZWFuO1xuICBpc1VucmVhZD86IGJvb2xlYW47XG4gIG1lc3NhZ2VJZDogc3RyaW5nO1xuICBzZW5kZXI6IFBpY2s8XG4gICAgQ29udmVyc2F0aW9uVHlwZSxcbiAgICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICAgIHwgJ2F2YXRhclBhdGgnXG4gICAgfCAnY29sb3InXG4gICAgfCAnZmlyc3ROYW1lJ1xuICAgIHwgJ2lkJ1xuICAgIHwgJ2lzTWUnXG4gICAgfCAnbmFtZSdcbiAgICB8ICdwcm9maWxlTmFtZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICA+O1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFBpY2s8XG4gIENvbnZlcnNhdGlvblN0b3J5VHlwZSxcbiAgJ2dyb3VwJyB8ICdoYXNNdWx0aXBsZScgfCAnaXNIaWRkZW4nXG4+ICYge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsaWNrOiAoKSA9PiB1bmtub3duO1xuICBvbkdvVG9Db252ZXJzYXRpb246IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBvbkhpZGVTdG9yeTogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHF1ZXVlU3RvcnlEb3dubG9hZDogKHN0b3J5SWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc3Rvcnk6IFN0b3J5Vmlld1R5cGU7XG59O1xuXG5leHBvcnQgY29uc3QgU3RvcnlMaXN0SXRlbSA9ICh7XG4gIGdyb3VwLFxuICBoYXNNdWx0aXBsZSxcbiAgaTE4bixcbiAgaXNIaWRkZW4sXG4gIG9uQ2xpY2ssXG4gIG9uR29Ub0NvbnZlcnNhdGlvbixcbiAgb25IaWRlU3RvcnksXG4gIHF1ZXVlU3RvcnlEb3dubG9hZCxcbiAgc3RvcnksXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtoYXNDb25maXJtSGlkZVN0b3J5LCBzZXRIYXNDb25maXJtSGlkZVN0b3J5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzU2hvd2luZ0NvbnRleHRNZW51LCBzZXRJc1Nob3dpbmdDb250ZXh0TWVudV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtyZWZlcmVuY2VFbGVtZW50LCBzZXRSZWZlcmVuY2VFbGVtZW50XSA9XG4gICAgdXNlU3RhdGU8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCB7XG4gICAgYXR0YWNobWVudCxcbiAgICBoYXNSZXBsaWVzLFxuICAgIGhhc1JlcGxpZXNGcm9tU2VsZixcbiAgICBpc1VucmVhZCxcbiAgICBzZW5kZXIsXG4gICAgdGltZXN0YW1wLFxuICB9ID0gc3Rvcnk7XG5cbiAgY29uc3Qge1xuICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3QsXG4gICAgYXZhdGFyUGF0aCxcbiAgICBjb2xvcixcbiAgICBmaXJzdE5hbWUsXG4gICAgaXNNZSxcbiAgICBuYW1lLFxuICAgIHByb2ZpbGVOYW1lLFxuICAgIHNoYXJlZEdyb3VwTmFtZXMsXG4gICAgdGl0bGUsXG4gIH0gPSBzZW5kZXI7XG5cbiAgbGV0IGF2YXRhclN0b3J5UmluZzogQXZhdGFyU3RvcnlSaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAoYXR0YWNobWVudCkge1xuICAgIGF2YXRhclN0b3J5UmluZyA9IGlzVW5yZWFkID8gQXZhdGFyU3RvcnlSaW5nLlVucmVhZCA6IEF2YXRhclN0b3J5UmluZy5SZWFkO1xuICB9XG5cbiAgbGV0IHJlcGxpZXNFbGVtZW50OiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgaWYgKGhhc1JlcGxpZXNGcm9tU2VsZikge1xuICAgIHJlcGxpZXNFbGVtZW50ID0gPGRpdiBjbGFzc05hbWU9XCJTdG9yeUxpc3RJdGVtX19pbmZvLS1yZXBsaWVzLS1zZWxmXCIgLz47XG4gIH0gZWxzZSBpZiAoaGFzUmVwbGllcykge1xuICAgIHJlcGxpZXNFbGVtZW50ID0gPGRpdiBjbGFzc05hbWU9XCJTdG9yeUxpc3RJdGVtX19pbmZvLS1yZXBsaWVzLS1vdGhlcnNcIiAvPjtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxidXR0b25cbiAgICAgICAgYXJpYS1sYWJlbD17aTE4bignU3RvcnlMaXN0SXRlbV9fbGFiZWwnKX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdTdG9yeUxpc3RJdGVtJywge1xuICAgICAgICAgICdTdG9yeUxpc3RJdGVtLS1oaWRkZW4nOiBpc0hpZGRlbixcbiAgICAgICAgfSl9XG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgIG9uQ29udGV4dE1lbnU9e2V2ID0+IHtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgaWYgKCFpc01lKSB7XG4gICAgICAgICAgICBzZXRJc1Nob3dpbmdDb250ZXh0TWVudSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICAgIHJlZj17c2V0UmVmZXJlbmNlRWxlbWVudH1cbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgPlxuICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17YWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICAgIGF2YXRhclBhdGg9e2F2YXRhclBhdGh9XG4gICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICBjb2xvcj17Z2V0QXZhdGFyQ29sb3IoY29sb3IpfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNNZT17Qm9vbGVhbihpc01lKX1cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIHByb2ZpbGVOYW1lPXtwcm9maWxlTmFtZX1cbiAgICAgICAgICBzaXplPXtBdmF0YXJTaXplLkZPUlRZX0VJR0hUfVxuICAgICAgICAgIHN0b3J5UmluZz17YXZhdGFyU3RvcnlSaW5nfVxuICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeUxpc3RJdGVtX19pbmZvXCI+XG4gICAgICAgICAge2lzTWUgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5TGlzdEl0ZW1fX2luZm8tLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAge2kxOG4oJ1N0b3JpZXNfX21pbmUnKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHshYXR0YWNobWVudCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeUxpc3RJdGVtX19pbmZvLS10aW1lc3RhbXBcIj5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdTdG9yaWVzX19hZGQnKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5TGlzdEl0ZW1fX2luZm8tLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAge2dyb3VwXG4gICAgICAgICAgICAgICAgICA/IGkxOG4oJ1N0b3JpZXNfX2Zyb20tdG8tZ3JvdXAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgOiB0aXRsZX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxNZXNzYWdlVGltZXN0YW1wXG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICBtb2R1bGU9XCJTdG9yeUxpc3RJdGVtX19pbmZvLS10aW1lc3RhbXBcIlxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcD17dGltZXN0YW1wfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7cmVwbGllc0VsZW1lbnR9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ1N0b3J5TGlzdEl0ZW1fX3ByZXZpZXdzJywge1xuICAgICAgICAgICAgJ1N0b3J5TGlzdEl0ZW1fX3ByZXZpZXdzLS1tdWx0aXBsZSc6IGhhc011bHRpcGxlLFxuICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgeyFhdHRhY2htZW50ICYmIGlzTWUgJiYgKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdTdG9yaWVzX19hZGQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU3RvcnlMaXN0SXRlbV9fcHJldmlld3MtLWFkZCBTdG9yeUxpc3RJdGVtX19wcmV2aWV3cy0taW1hZ2VcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtoYXNNdWx0aXBsZSAmJiA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5TGlzdEl0ZW1fX3ByZXZpZXdzLS1tb3JlXCIgLz59XG4gICAgICAgICAgPFN0b3J5SW1hZ2VcbiAgICAgICAgICAgIGF0dGFjaG1lbnQ9e2F0dGFjaG1lbnR9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaXNUaHVtYm5haWxcbiAgICAgICAgICAgIGxhYmVsPVwiXCJcbiAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlN0b3J5TGlzdEl0ZW1fX3ByZXZpZXdzLS1pbWFnZVwiXG4gICAgICAgICAgICBxdWV1ZVN0b3J5RG93bmxvYWQ9e3F1ZXVlU3RvcnlEb3dubG9hZH1cbiAgICAgICAgICAgIHN0b3J5SWQ9e3N0b3J5Lm1lc3NhZ2VJZH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPENvbnRleHRNZW51UG9wcGVyXG4gICAgICAgIGlzTWVudVNob3dpbmc9e2lzU2hvd2luZ0NvbnRleHRNZW51fVxuICAgICAgICBtZW51T3B0aW9ucz17W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGljb246ICdTdG9yeUxpc3RJdGVtX19pY29uLS1oaWRlJyxcbiAgICAgICAgICAgIGxhYmVsOiBpc0hpZGRlblxuICAgICAgICAgICAgICA/IGkxOG4oJ1N0b3J5TGlzdEl0ZW1fX3VuaGlkZScpXG4gICAgICAgICAgICAgIDogaTE4bignU3RvcnlMaXN0SXRlbV9faGlkZScpLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBvbkhpZGVTdG9yeShzZW5kZXIuaWQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldEhhc0NvbmZpcm1IaWRlU3RvcnkodHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpY29uOiAnU3RvcnlMaXN0SXRlbV9faWNvbi0tY2hhdCcsXG4gICAgICAgICAgICBsYWJlbDogaTE4bignU3RvcnlMaXN0SXRlbV9fZ28tdG8tY2hhdCcpLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICBvbkdvVG9Db252ZXJzYXRpb24oc2VuZGVyLmlkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXX1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNTaG93aW5nQ29udGV4dE1lbnUoZmFsc2UpfVxuICAgICAgICBwb3BwZXJPcHRpb25zPXt7XG4gICAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgICAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICAgICAgfX1cbiAgICAgICAgcmVmZXJlbmNlRWxlbWVudD17cmVmZXJlbmNlRWxlbWVudH1cbiAgICAgIC8+XG4gICAgICB7aGFzQ29uZmlybUhpZGVTdG9yeSAmJiAoXG4gICAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4gb25IaWRlU3Rvcnkoc2VuZGVyLmlkKSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdhZmZpcm1hdGl2ZScsXG4gICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ1N0b3J5TGlzdEl0ZW1fX2hpZGUtbW9kYWwtLWNvbmZpcm0nKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldEhhc0NvbmZpcm1IaWRlU3RvcnkoZmFsc2UpO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignU3RvcnlMaXN0SXRlbV9faGlkZS1tb2RhbC0tYm9keScsIFtTdHJpbmcoZmlyc3ROYW1lKV0pfVxuICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUNoQyx3QkFBdUI7QUFJdkIsb0JBQW9EO0FBQ3BELGdDQUFtQztBQUNuQyx5QkFBa0M7QUFDbEMsOEJBQWlDO0FBQ2pDLHdCQUEyQjtBQUMzQixvQkFBK0I7QUF5RHhCLE1BQU0sZ0JBQWdCLHdCQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sQ0FBQyxxQkFBcUIsMEJBQTBCLDJCQUFTLEtBQUs7QUFDcEUsUUFBTSxDQUFDLHNCQUFzQiwyQkFBMkIsMkJBQVMsS0FBSztBQUN0RSxRQUFNLENBQUMsa0JBQWtCLHVCQUN2QiwyQkFBbUMsSUFBSTtBQUV6QyxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7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
