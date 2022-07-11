var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var CallingParticipantsList_exports = {};
__export(CallingParticipantsList_exports, {
  CallingParticipantsList: () => CallingParticipantsList
});
module.exports = __toCommonJS(CallingParticipantsList_exports);
var import_react = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_Avatar = require("./Avatar");
var import_ContactName = require("./conversation/ContactName");
var import_InContactsIcon = require("./InContactsIcon");
var import_sortByTitle = require("../util/sortByTitle");
var import_isInSystemContacts = require("../util/isInSystemContacts");
const CallingParticipantsList = import_react.default.memo(({ i18n, onClose, ourUuid, participants }) => {
  const [root, setRoot] = import_react.default.useState(null);
  const sortedParticipants = import_react.default.useMemo(() => (0, import_sortByTitle.sortByTitle)(participants), [participants]);
  import_react.default.useEffect(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
      setRoot(null);
    };
  }, []);
  const handleCancel = import_react.default.useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);
  if (!root) {
    return null;
  }
  return (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement(import_focus_trap_react.default, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-participants-list__overlay",
    onClick: handleCancel,
    role: "presentation"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-participants-list"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-participants-list__header"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-participants-list__title"
  }, !participants.length && i18n("calling__in-this-call--zero"), participants.length === 1 && i18n("calling__in-this-call--one"), participants.length > 1 && i18n("calling__in-this-call--many", [
    String(participants.length)
  ])), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "module-calling-participants-list__close",
    onClick: onClose,
    tabIndex: 0,
    "aria-label": i18n("close")
  })), /* @__PURE__ */ import_react.default.createElement("ul", {
    className: "module-calling-participants-list__list"
  }, sortedParticipants.map((participant, index) => /* @__PURE__ */ import_react.default.createElement("li", {
    className: "module-calling-participants-list__contact",
    key: index
  }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: participant.acceptedMessageRequest,
    avatarPath: participant.avatarPath,
    badge: void 0,
    color: participant.color,
    conversationType: "direct",
    i18n,
    isMe: participant.isMe,
    profileName: participant.profileName,
    title: participant.title,
    sharedGroupNames: participant.sharedGroupNames,
    size: 32
  }), ourUuid && participant.uuid === ourUuid ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-calling-participants-list__name"
  }, i18n("you")) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    module: "module-calling-participants-list__name",
    title: participant.title
  }), (0, import_isInSystemContacts.isInSystemContacts)(participant) ? /* @__PURE__ */ import_react.default.createElement("span", null, " ", /* @__PURE__ */ import_react.default.createElement(import_InContactsIcon.InContactsIcon, {
    className: "module-calling-participants-list__contact-icon",
    i18n
  })) : null)), /* @__PURE__ */ import_react.default.createElement("div", null, participant.hasRemoteAudio === false ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-calling-participants-list__muted--audio"
  }) : null, participant.hasRemoteVideo === false ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-calling-participants-list__muted--video"
  }) : null, participant.presenting ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-calling-participants-list__presenting"
  }) : null))))))), root);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingParticipantsList
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1BhcnRpY2lwYW50c0xpc3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwLXJlYWN0JztcblxuaW1wb3J0IHsgQXZhdGFyIH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBJbkNvbnRhY3RzSWNvbiB9IGZyb20gJy4vSW5Db250YWN0c0ljb24nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBzb3J0QnlUaXRsZSB9IGZyb20gJy4uL3V0aWwvc29ydEJ5VGl0bGUnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBpc0luU3lzdGVtQ29udGFjdHMgfSBmcm9tICcuLi91dGlsL2lzSW5TeXN0ZW1Db250YWN0cyc7XG5cbnR5cGUgUGFydGljaXBhbnRUeXBlID0gQ29udmVyc2F0aW9uVHlwZSAmIHtcbiAgaGFzUmVtb3RlQXVkaW8/OiBib29sZWFuO1xuICBoYXNSZW1vdGVWaWRlbz86IGJvb2xlYW47XG4gIHByZXNlbnRpbmc/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICByZWFkb25seSBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICByZWFkb25seSBvdXJVdWlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IHBhcnRpY2lwYW50czogQXJyYXk8UGFydGljaXBhbnRUeXBlPjtcbn07XG5cbmV4cG9ydCBjb25zdCBDYWxsaW5nUGFydGljaXBhbnRzTGlzdCA9IFJlYWN0Lm1lbW8oXG4gICh7IGkxOG4sIG9uQ2xvc2UsIG91clV1aWQsIHBhcnRpY2lwYW50cyB9OiBQcm9wc1R5cGUpID0+IHtcbiAgICBjb25zdCBbcm9vdCwgc2V0Um9vdF0gPSBSZWFjdC51c2VTdGF0ZTxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gICAgY29uc3Qgc29ydGVkUGFydGljaXBhbnRzID0gUmVhY3QudXNlTWVtbzxBcnJheTxQYXJ0aWNpcGFudFR5cGU+PihcbiAgICAgICgpID0+IHNvcnRCeVRpdGxlKHBhcnRpY2lwYW50cyksXG4gICAgICBbcGFydGljaXBhbnRzXVxuICAgICk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICBzZXRSb290KGRpdik7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICAgICAgc2V0Um9vdChudWxsKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgaGFuZGxlQ2FuY2VsID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtvbkNsb3NlXVxuICAgICk7XG5cbiAgICBpZiAoIXJvb3QpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgICA8Rm9jdXNUcmFwPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX292ZXJsYXlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNhbmNlbH1cbiAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX2hlYWRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXBhcnRpY2lwYW50cy1saXN0X190aXRsZVwiPlxuICAgICAgICAgICAgICAgIHshcGFydGljaXBhbnRzLmxlbmd0aCAmJiBpMThuKCdjYWxsaW5nX19pbi10aGlzLWNhbGwtLXplcm8nKX1cbiAgICAgICAgICAgICAgICB7cGFydGljaXBhbnRzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICAgICAgaTE4bignY2FsbGluZ19faW4tdGhpcy1jYWxsLS1vbmUnKX1cbiAgICAgICAgICAgICAgICB7cGFydGljaXBhbnRzLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgICAgICAgICAgIGkxOG4oJ2NhbGxpbmdfX2luLXRoaXMtY2FsbC0tbWFueScsIFtcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nKHBhcnRpY2lwYW50cy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgXSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX2Nsb3NlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Nsb3NlJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZy1wYXJ0aWNpcGFudHMtbGlzdF9fbGlzdFwiPlxuICAgICAgICAgICAgICB7c29ydGVkUGFydGljaXBhbnRzLm1hcChcbiAgICAgICAgICAgICAgICAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50VHlwZSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXBhcnRpY2lwYW50cy1saXN0X19jb250YWN0XCJcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyB0ZW1wdGluZyB0byB1c2UgYHBhcnRpY2lwYW50LnV1aWRgIGFzIHRoZSBga2V5YCBoZXJlLCBidXQgdGhhdFxuICAgICAgICAgICAgICAgICAgICAvLyAgIGNhbiByZXN1bHQgaW4gZHVwbGljYXRlIGtleXMgZm9yIHBhcnRpY2lwYW50cyB3aG8gaGF2ZSBqb2luZWQgb25cbiAgICAgICAgICAgICAgICAgICAgLy8gICBtdWx0aXBsZSBkZXZpY2VzLlxuICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJQYXRoPXtwYXJ0aWNpcGFudC5hdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPXtwYXJ0aWNpcGFudC5jb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWU9e3BhcnRpY2lwYW50LmlzTWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlTmFtZT17cGFydGljaXBhbnQucHJvZmlsZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17cGFydGljaXBhbnQudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtwYXJ0aWNpcGFudC5zaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT17MzJ9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICB7b3VyVXVpZCAmJiBwYXJ0aWNpcGFudC51dWlkID09PSBvdXJVdWlkID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX25hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2kxOG4oJ3lvdScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFjdE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGU9XCJtb2R1bGUtY2FsbGluZy1wYXJ0aWNpcGFudHMtbGlzdF9fbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3BhcnRpY2lwYW50LnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNJblN5c3RlbUNvbnRhY3RzKHBhcnRpY2lwYW50KSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5Db250YWN0c0ljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX2NvbnRhY3QtaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFydGljaXBhbnQuaGFzUmVtb3RlQXVkaW8gPT09IGZhbHNlID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX211dGVkLS1hdWRpb1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAge3BhcnRpY2lwYW50Lmhhc1JlbW90ZVZpZGVvID09PSBmYWxzZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXBhcnRpY2lwYW50cy1saXN0X19tdXRlZC0tdmlkZW9cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgIHtwYXJ0aWNpcGFudC5wcmVzZW50aW5nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGFydGljaXBhbnRzLWxpc3RfX3ByZXNlbnRpbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0ZvY3VzVHJhcD4sXG4gICAgICByb290XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLG1CQUFrQjtBQUNsQix1QkFBNkI7QUFDN0IsOEJBQXNCO0FBRXRCLG9CQUF1QjtBQUN2Qix5QkFBNEI7QUFDNUIsNEJBQStCO0FBRS9CLHlCQUE0QjtBQUU1QixnQ0FBbUM7QUFlNUIsTUFBTSwwQkFBMEIscUJBQU0sS0FDM0MsQ0FBQyxFQUFFLE1BQU0sU0FBUyxTQUFTLG1CQUE4QjtBQUN2RCxRQUFNLENBQUMsTUFBTSxXQUFXLHFCQUFNLFNBQTZCLElBQUk7QUFFL0QsUUFBTSxxQkFBcUIscUJBQU0sUUFDL0IsTUFBTSxvQ0FBWSxZQUFZLEdBQzlCLENBQUMsWUFBWSxDQUNmO0FBRUEsdUJBQU0sVUFBVSxNQUFNO0FBQ3BCLFVBQU0sTUFBTSxTQUFTLGNBQWMsS0FBSztBQUN4QyxhQUFTLEtBQUssWUFBWSxHQUFHO0FBQzdCLFlBQVEsR0FBRztBQUVYLFdBQU8sTUFBTTtBQUNYLGVBQVMsS0FBSyxZQUFZLEdBQUc7QUFDN0IsY0FBUSxJQUFJO0FBQUEsSUFDZDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGVBQWUscUJBQU0sWUFDekIsQ0FBQyxNQUF3QjtBQUN2QixRQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWU7QUFDaEMsY0FBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQ0EsQ0FBQyxPQUFPLENBQ1Y7QUFFQSxNQUFJLENBQUMsTUFBTTtBQUNULFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTyxtQ0FDTCxtREFBQyx1Q0FDQyxtREFBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsU0FBUztBQUFBLElBQ1QsTUFBSztBQUFBLEtBRUwsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osQ0FBQyxhQUFhLFVBQVUsS0FBSyw2QkFBNkIsR0FDMUQsYUFBYSxXQUFXLEtBQ3ZCLEtBQUssNEJBQTRCLEdBQ2xDLGFBQWEsU0FBUyxLQUNyQixLQUFLLCtCQUErQjtBQUFBLElBQ2xDLE9BQU8sYUFBYSxNQUFNO0FBQUEsRUFDNUIsQ0FBQyxDQUNMLEdBQ0EsbURBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFdBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxJQUNWLGNBQVksS0FBSyxPQUFPO0FBQUEsR0FDMUIsQ0FDRixHQUNBLG1EQUFDO0FBQUEsSUFBRyxXQUFVO0FBQUEsS0FDWCxtQkFBbUIsSUFDbEIsQ0FBQyxhQUE4QixVQUM3QixtREFBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBSVYsS0FBSztBQUFBLEtBRUwsbURBQUMsYUFDQyxtREFBQztBQUFBLElBQ0Msd0JBQ0UsWUFBWTtBQUFBLElBRWQsWUFBWSxZQUFZO0FBQUEsSUFDeEIsT0FBTztBQUFBLElBQ1AsT0FBTyxZQUFZO0FBQUEsSUFDbkIsa0JBQWlCO0FBQUEsSUFDakI7QUFBQSxJQUNBLE1BQU0sWUFBWTtBQUFBLElBQ2xCLGFBQWEsWUFBWTtBQUFBLElBQ3pCLE9BQU8sWUFBWTtBQUFBLElBQ25CLGtCQUFrQixZQUFZO0FBQUEsSUFDOUIsTUFBTTtBQUFBLEdBQ1IsR0FDQyxXQUFXLFlBQVksU0FBUyxVQUMvQixtREFBQztBQUFBLElBQUssV0FBVTtBQUFBLEtBQ2IsS0FBSyxLQUFLLENBQ2IsSUFFQSx3RkFDRSxtREFBQztBQUFBLElBQ0MsUUFBTztBQUFBLElBQ1AsT0FBTyxZQUFZO0FBQUEsR0FDckIsR0FDQyxrREFBbUIsV0FBVyxJQUM3QixtREFBQyxjQUNFLEtBQ0QsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWO0FBQUEsR0FDRixDQUNGLElBQ0UsSUFDTixDQUVKLEdBQ0EsbURBQUMsYUFDRSxZQUFZLG1CQUFtQixRQUM5QixtREFBQztBQUFBLElBQUssV0FBVTtBQUFBLEdBQWlELElBQy9ELE1BQ0gsWUFBWSxtQkFBbUIsUUFDOUIsbURBQUM7QUFBQSxJQUFLLFdBQVU7QUFBQSxHQUFpRCxJQUMvRCxNQUNILFlBQVksYUFDWCxtREFBQztBQUFBLElBQUssV0FBVTtBQUFBLEdBQStDLElBQzdELElBQ04sQ0FDRixDQUVKLENBQ0YsQ0FDRixDQUNGLENBQ0YsR0FDQSxJQUNGO0FBQ0YsQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
