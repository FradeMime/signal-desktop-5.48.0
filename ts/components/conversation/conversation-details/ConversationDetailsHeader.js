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
var ConversationDetailsHeader_exports = {};
__export(ConversationDetailsHeader_exports, {
  ConversationDetailsHeader: () => ConversationDetailsHeader
});
module.exports = __toCommonJS(ConversationDetailsHeader_exports);
var import_react = __toESM(require("react"));
var import_Avatar = require("../../Avatar");
var import_AvatarLightbox = require("../../AvatarLightbox");
var import_Emojify = require("../Emojify");
var import_GroupDescription = require("../GroupDescription");
var import_About = require("../About");
var import_util = require("./util");
var import_BadgeDialog = require("../../BadgeDialog");
var ConversationDetailsHeaderActiveModal = /* @__PURE__ */ ((ConversationDetailsHeaderActiveModal2) => {
  ConversationDetailsHeaderActiveModal2[ConversationDetailsHeaderActiveModal2["ShowingAvatar"] = 0] = "ShowingAvatar";
  ConversationDetailsHeaderActiveModal2[ConversationDetailsHeaderActiveModal2["ShowingBadges"] = 1] = "ShowingBadges";
  return ConversationDetailsHeaderActiveModal2;
})(ConversationDetailsHeaderActiveModal || {});
const bem = (0, import_util.bemGenerator)("ConversationDetails-header");
const ConversationDetailsHeader = /* @__PURE__ */ __name(({
  areWeASubscriber,
  badges,
  canEdit,
  conversation,
  i18n,
  isGroup,
  isMe,
  memberships,
  startEditing,
  theme
}) => {
  const [activeModal, setActiveModal] = (0, import_react.useState)();
  let preferredBadge;
  let subtitle;
  if (isGroup) {
    if (conversation.groupDescription) {
      subtitle = /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
        i18n,
        text: conversation.groupDescription,
        title: conversation.title
      });
    } else if (canEdit) {
      subtitle = i18n("ConversationDetailsHeader--add-group-description");
    } else {
      subtitle = i18n("ConversationDetailsHeader--members", [
        memberships.length.toString()
      ]);
    }
  } else if (!isMe) {
    subtitle = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: bem("subtitle__about")
    }, /* @__PURE__ */ import_react.default.createElement(import_About.About, {
      text: conversation.about
    })), /* @__PURE__ */ import_react.default.createElement("div", {
      className: bem("subtitle__phone-number")
    }, conversation.phoneNumber));
    preferredBadge = badges?.[0];
  }
  const avatar = /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    badge: preferredBadge,
    conversationType: conversation.type,
    i18n,
    size: 80,
    ...conversation,
    noteToSelf: isMe,
    onClick: () => {
      setActiveModal(0 /* ShowingAvatar */);
    },
    onClickBadge: () => {
      setActiveModal(1 /* ShowingBadges */);
    },
    sharedGroupNames: [],
    theme
  });
  const contents = /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("title")
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: isMe ? i18n("noteToSelf") : conversation.title
  })));
  let modal;
  switch (activeModal) {
    case 0 /* ShowingAvatar */:
      modal = /* @__PURE__ */ import_react.default.createElement(import_AvatarLightbox.AvatarLightbox, {
        avatarColor: conversation.color,
        avatarPath: conversation.avatarPath,
        conversationTitle: conversation.title,
        i18n,
        isGroup,
        onClose: () => {
          setActiveModal(void 0);
        }
      });
      break;
    case 1 /* ShowingBadges */:
      modal = /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
        areWeASubscriber,
        badges: badges || [],
        firstName: conversation.firstName,
        i18n,
        onClose: () => {
          setActiveModal(void 0);
        },
        title: conversation.title
      });
      break;
    default:
      modal = null;
      break;
  }
  if (canEdit) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: bem("root")
    }, modal, avatar, /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        startEditing(true);
      },
      className: bem("root", "editable")
    }, contents), /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: (ev) => {
        if (ev.target instanceof HTMLAnchorElement) {
          return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        startEditing(false);
      },
      className: bem("root", "editable")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: bem("subtitle")
    }, subtitle)));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("root")
  }, modal, avatar, contents, /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("subtitle")
  }, subtitle));
}, "ConversationDetailsHeader");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationDetailsHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc0hlYWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEF2YXRhciB9IGZyb20gJy4uLy4uL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXJMaWdodGJveCB9IGZyb20gJy4uLy4uL0F2YXRhckxpZ2h0Ym94JztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgRW1vamlmeSB9IGZyb20gJy4uL0Vtb2ppZnknO1xuaW1wb3J0IHsgR3JvdXBEZXNjcmlwdGlvbiB9IGZyb20gJy4uL0dyb3VwRGVzY3JpcHRpb24nO1xuaW1wb3J0IHsgQWJvdXQgfSBmcm9tICcuLi9BYm91dCc7XG5pbXBvcnQgdHlwZSB7IEdyb3VwVjJNZW1iZXJzaGlwIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGJlbUdlbmVyYXRvciB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBCYWRnZURpYWxvZyB9IGZyb20gJy4uLy4uL0JhZGdlRGlhbG9nJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vLi4vLi4vYmFkZ2VzL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGFyZVdlQVN1YnNjcmliZXI6IGJvb2xlYW47XG4gIGJhZGdlcz86IFJlYWRvbmx5QXJyYXk8QmFkZ2VUeXBlPjtcbiAgY2FuRWRpdDogYm9vbGVhbjtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc0dyb3VwOiBib29sZWFuO1xuICBpc01lOiBib29sZWFuO1xuICBtZW1iZXJzaGlwczogQXJyYXk8R3JvdXBWMk1lbWJlcnNoaXA+O1xuICBzdGFydEVkaXRpbmc6IChpc0dyb3VwVGl0bGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG5lbnVtIENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXJBY3RpdmVNb2RhbCB7XG4gIFNob3dpbmdBdmF0YXIsXG4gIFNob3dpbmdCYWRnZXMsXG59XG5cbmNvbnN0IGJlbSA9IGJlbUdlbmVyYXRvcignQ29udmVyc2F0aW9uRGV0YWlscy1oZWFkZXInKTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXI6IFJlYWN0LkNvbXBvbmVudFR5cGU8UHJvcHM+ID0gKHtcbiAgYXJlV2VBU3Vic2NyaWJlcixcbiAgYmFkZ2VzLFxuICBjYW5FZGl0LFxuICBjb252ZXJzYXRpb24sXG4gIGkxOG4sXG4gIGlzR3JvdXAsXG4gIGlzTWUsXG4gIG1lbWJlcnNoaXBzLFxuICBzdGFydEVkaXRpbmcsXG4gIHRoZW1lLFxufSkgPT4ge1xuICBjb25zdCBbYWN0aXZlTW9kYWwsIHNldEFjdGl2ZU1vZGFsXSA9IHVzZVN0YXRlPFxuICAgIHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXJBY3RpdmVNb2RhbFxuICA+KCk7XG5cbiAgbGV0IHByZWZlcnJlZEJhZGdlOiB1bmRlZmluZWQgfCBCYWRnZVR5cGU7XG4gIGxldCBzdWJ0aXRsZTogUmVhY3ROb2RlO1xuICBpZiAoaXNHcm91cCkge1xuICAgIGlmIChjb252ZXJzYXRpb24uZ3JvdXBEZXNjcmlwdGlvbikge1xuICAgICAgc3VidGl0bGUgPSAoXG4gICAgICAgIDxHcm91cERlc2NyaXB0aW9uXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICB0ZXh0PXtjb252ZXJzYXRpb24uZ3JvdXBEZXNjcmlwdGlvbn1cbiAgICAgICAgICB0aXRsZT17Y29udmVyc2F0aW9uLnRpdGxlfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGNhbkVkaXQpIHtcbiAgICAgIHN1YnRpdGxlID0gaTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0hlYWRlci0tYWRkLWdyb3VwLWRlc2NyaXB0aW9uJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YnRpdGxlID0gaTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0hlYWRlci0tbWVtYmVycycsIFtcbiAgICAgICAgbWVtYmVyc2hpcHMubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgICBdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWlzTWUpIHtcbiAgICBzdWJ0aXRsZSA9IChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtiZW0oJ3N1YnRpdGxlX19hYm91dCcpfT5cbiAgICAgICAgICA8QWJvdXQgdGV4dD17Y29udmVyc2F0aW9uLmFib3V0fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2JlbSgnc3VidGl0bGVfX3Bob25lLW51bWJlcicpfT5cbiAgICAgICAgICB7Y29udmVyc2F0aW9uLnBob25lTnVtYmVyfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvPlxuICAgICk7XG4gICAgcHJlZmVycmVkQmFkZ2UgPSBiYWRnZXM/LlswXTtcbiAgfVxuXG4gIGNvbnN0IGF2YXRhciA9IChcbiAgICA8QXZhdGFyXG4gICAgICBiYWRnZT17cHJlZmVycmVkQmFkZ2V9XG4gICAgICBjb252ZXJzYXRpb25UeXBlPXtjb252ZXJzYXRpb24udHlwZX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBzaXplPXs4MH1cbiAgICAgIHsuLi5jb252ZXJzYXRpb259XG4gICAgICBub3RlVG9TZWxmPXtpc01lfVxuICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICBzZXRBY3RpdmVNb2RhbChDb252ZXJzYXRpb25EZXRhaWxzSGVhZGVyQWN0aXZlTW9kYWwuU2hvd2luZ0F2YXRhcik7XG4gICAgICB9fVxuICAgICAgb25DbGlja0JhZGdlPXsoKSA9PiB7XG4gICAgICAgIHNldEFjdGl2ZU1vZGFsKENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXJBY3RpdmVNb2RhbC5TaG93aW5nQmFkZ2VzKTtcbiAgICAgIH19XG4gICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAvPlxuICApO1xuXG4gIGNvbnN0IGNvbnRlbnRzID0gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YmVtKCd0aXRsZScpfT5cbiAgICAgICAgPEVtb2ppZnkgdGV4dD17aXNNZSA/IGkxOG4oJ25vdGVUb1NlbGYnKSA6IGNvbnZlcnNhdGlvbi50aXRsZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIGxldCBtb2RhbDogUmVhY3ROb2RlO1xuICBzd2l0Y2ggKGFjdGl2ZU1vZGFsKSB7XG4gICAgY2FzZSBDb252ZXJzYXRpb25EZXRhaWxzSGVhZGVyQWN0aXZlTW9kYWwuU2hvd2luZ0F2YXRhcjpcbiAgICAgIG1vZGFsID0gKFxuICAgICAgICA8QXZhdGFyTGlnaHRib3hcbiAgICAgICAgICBhdmF0YXJDb2xvcj17Y29udmVyc2F0aW9uLmNvbG9yfVxuICAgICAgICAgIGF2YXRhclBhdGg9e2NvbnZlcnNhdGlvbi5hdmF0YXJQYXRofVxuICAgICAgICAgIGNvbnZlcnNhdGlvblRpdGxlPXtjb252ZXJzYXRpb24udGl0bGV9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpc0dyb3VwPXtpc0dyb3VwfVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldEFjdGl2ZU1vZGFsKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXJBY3RpdmVNb2RhbC5TaG93aW5nQmFkZ2VzOlxuICAgICAgbW9kYWwgPSAoXG4gICAgICAgIDxCYWRnZURpYWxvZ1xuICAgICAgICAgIGFyZVdlQVN1YnNjcmliZXI9e2FyZVdlQVN1YnNjcmliZXJ9XG4gICAgICAgICAgYmFkZ2VzPXtiYWRnZXMgfHwgW119XG4gICAgICAgICAgZmlyc3ROYW1lPXtjb252ZXJzYXRpb24uZmlyc3ROYW1lfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgc2V0QWN0aXZlTW9kYWwodW5kZWZpbmVkKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRpdGxlPXtjb252ZXJzYXRpb24udGl0bGV9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIG1vZGFsID0gbnVsbDtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKGNhbkVkaXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2JlbSgncm9vdCcpfT5cbiAgICAgICAge21vZGFsfVxuICAgICAgICB7YXZhdGFyfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17ZXYgPT4ge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgc3RhcnRFZGl0aW5nKHRydWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtiZW0oJ3Jvb3QnLCAnZWRpdGFibGUnKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtjb250ZW50c31cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtldiA9PiB7XG4gICAgICAgICAgICBpZiAoZXYudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBzdGFydEVkaXRpbmcoZmFsc2UpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtiZW0oJ3Jvb3QnLCAnZWRpdGFibGUnKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtiZW0oJ3N1YnRpdGxlJyl9PntzdWJ0aXRsZX08L2Rpdj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YmVtKCdyb290Jyl9PlxuICAgICAge21vZGFsfVxuICAgICAge2F2YXRhcn1cbiAgICAgIHtjb250ZW50c31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtiZW0oJ3N1YnRpdGxlJyl9PntzdWJ0aXRsZX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWdDO0FBRWhDLG9CQUF1QjtBQUN2Qiw0QkFBK0I7QUFFL0IscUJBQXdCO0FBQ3hCLDhCQUFpQztBQUNqQyxtQkFBc0I7QUFHdEIsa0JBQTZCO0FBQzdCLHlCQUE0QjtBQWdCNUIsSUFBSyx1Q0FBTCxrQkFBSywwQ0FBTDtBQUNFO0FBQ0E7QUFGRztBQUFBO0FBS0wsTUFBTSxNQUFNLDhCQUFhLDRCQUE0QjtBQUU5QyxNQUFNLDRCQUF3RCx3QkFBQztBQUFBLEVBQ3BFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFFBQU0sQ0FBQyxhQUFhLGtCQUFrQiwyQkFFcEM7QUFFRixNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUksU0FBUztBQUNYLFFBQUksYUFBYSxrQkFBa0I7QUFDakMsaUJBQ0UsbURBQUM7QUFBQSxRQUNDO0FBQUEsUUFDQSxNQUFNLGFBQWE7QUFBQSxRQUNuQixPQUFPLGFBQWE7QUFBQSxPQUN0QjtBQUFBLElBRUosV0FBVyxTQUFTO0FBQ2xCLGlCQUFXLEtBQUssa0RBQWtEO0FBQUEsSUFDcEUsT0FBTztBQUNMLGlCQUFXLEtBQUssc0NBQXNDO0FBQUEsUUFDcEQsWUFBWSxPQUFPLFNBQVM7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsV0FBVyxDQUFDLE1BQU07QUFDaEIsZUFDRSx3RkFDRSxtREFBQztBQUFBLE1BQUksV0FBVyxJQUFJLGlCQUFpQjtBQUFBLE9BQ25DLG1EQUFDO0FBQUEsTUFBTSxNQUFNLGFBQWE7QUFBQSxLQUFPLENBQ25DLEdBQ0EsbURBQUM7QUFBQSxNQUFJLFdBQVcsSUFBSSx3QkFBd0I7QUFBQSxPQUN6QyxhQUFhLFdBQ2hCLENBQ0Y7QUFFRixxQkFBaUIsU0FBUztBQUFBLEVBQzVCO0FBRUEsUUFBTSxTQUNKLG1EQUFDO0FBQUEsSUFDQyxPQUFPO0FBQUEsSUFDUCxrQkFBa0IsYUFBYTtBQUFBLElBQy9CO0FBQUEsSUFDQSxNQUFNO0FBQUEsT0FDRjtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osU0FBUyxNQUFNO0FBQ2IscUJBQWUscUJBQWtEO0FBQUEsSUFDbkU7QUFBQSxJQUNBLGNBQWMsTUFBTTtBQUNsQixxQkFBZSxxQkFBa0Q7QUFBQSxJQUNuRTtBQUFBLElBQ0Esa0JBQWtCLENBQUM7QUFBQSxJQUNuQjtBQUFBLEdBQ0Y7QUFHRixRQUFNLFdBQ0osbURBQUMsYUFDQyxtREFBQztBQUFBLElBQUksV0FBVyxJQUFJLE9BQU87QUFBQSxLQUN6QixtREFBQztBQUFBLElBQVEsTUFBTSxPQUFPLEtBQUssWUFBWSxJQUFJLGFBQWE7QUFBQSxHQUFPLENBQ2pFLENBQ0Y7QUFHRixNQUFJO0FBQ0osVUFBUTtBQUFBLFNBQ0Q7QUFDSCxjQUNFLG1EQUFDO0FBQUEsUUFDQyxhQUFhLGFBQWE7QUFBQSxRQUMxQixZQUFZLGFBQWE7QUFBQSxRQUN6QixtQkFBbUIsYUFBYTtBQUFBLFFBQ2hDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsU0FBUyxNQUFNO0FBQ2IseUJBQWUsTUFBUztBQUFBLFFBQzFCO0FBQUEsT0FDRjtBQUVGO0FBQUEsU0FDRztBQUNILGNBQ0UsbURBQUM7QUFBQSxRQUNDO0FBQUEsUUFDQSxRQUFRLFVBQVUsQ0FBQztBQUFBLFFBQ25CLFdBQVcsYUFBYTtBQUFBLFFBQ3hCO0FBQUEsUUFDQSxTQUFTLE1BQU07QUFDYix5QkFBZSxNQUFTO0FBQUEsUUFDMUI7QUFBQSxRQUNBLE9BQU8sYUFBYTtBQUFBLE9BQ3RCO0FBRUY7QUFBQTtBQUVBLGNBQVE7QUFDUjtBQUFBO0FBR0osTUFBSSxTQUFTO0FBQ1gsV0FDRSxtREFBQztBQUFBLE1BQUksV0FBVyxJQUFJLE1BQU07QUFBQSxPQUN2QixPQUNBLFFBQ0QsbURBQUM7QUFBQSxNQUNDLE1BQUs7QUFBQSxNQUNMLFNBQVMsUUFBTTtBQUNiLFdBQUcsZUFBZTtBQUNsQixXQUFHLGdCQUFnQjtBQUNuQixxQkFBYSxJQUFJO0FBQUEsTUFDbkI7QUFBQSxNQUNBLFdBQVcsSUFBSSxRQUFRLFVBQVU7QUFBQSxPQUVoQyxRQUNILEdBQ0EsbURBQUM7QUFBQSxNQUNDLE1BQUs7QUFBQSxNQUNMLFNBQVMsUUFBTTtBQUNiLFlBQUksR0FBRyxrQkFBa0IsbUJBQW1CO0FBQzFDO0FBQUEsUUFDRjtBQUVBLFdBQUcsZUFBZTtBQUNsQixXQUFHLGdCQUFnQjtBQUNuQixxQkFBYSxLQUFLO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFdBQVcsSUFBSSxRQUFRLFVBQVU7QUFBQSxPQUVqQyxtREFBQztBQUFBLE1BQUksV0FBVyxJQUFJLFVBQVU7QUFBQSxPQUFJLFFBQVMsQ0FDN0MsQ0FDRjtBQUFBLEVBRUo7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFXLElBQUksTUFBTTtBQUFBLEtBQ3ZCLE9BQ0EsUUFDQSxVQUNELG1EQUFDO0FBQUEsSUFBSSxXQUFXLElBQUksVUFBVTtBQUFBLEtBQUksUUFBUyxDQUM3QztBQUVKLEdBekpxRTsiLAogICJuYW1lcyI6IFtdCn0K
