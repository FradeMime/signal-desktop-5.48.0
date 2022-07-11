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
var ConversationDetailsMembershipList_exports = {};
__export(ConversationDetailsMembershipList_exports, {
  ConversationDetailsMembershipList: () => ConversationDetailsMembershipList
});
module.exports = __toCommonJS(ConversationDetailsMembershipList_exports);
var import_react = __toESM(require("react"));
var import_Avatar = require("../../Avatar");
var import_Emojify = require("../Emojify");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var import_PanelRow = require("./PanelRow");
var import_PanelSection = require("./PanelSection");
const collator = new Intl.Collator(void 0, { sensitivity: "base" });
function sortConversationTitles(left, right) {
  const leftTitle = left.member.title;
  const rightTitle = right.member.title;
  return collator.compare(leftTitle, rightTitle);
}
function sortMemberships(memberships) {
  let you;
  const admins = [];
  const nonAdmins = [];
  memberships.forEach((membershipInfo) => {
    const { isAdmin, member } = membershipInfo;
    if (member.isMe) {
      you = membershipInfo;
    } else if (isAdmin) {
      admins.push(membershipInfo);
    } else {
      nonAdmins.push(membershipInfo);
    }
  });
  admins.sort(sortConversationTitles);
  nonAdmins.sort(sortConversationTitles);
  const sortedMemberships = [];
  if (you) {
    sortedMemberships.push(you);
  }
  sortedMemberships.push(...admins);
  sortedMemberships.push(...nonAdmins);
  return sortedMemberships;
}
const ConversationDetailsMembershipList = /* @__PURE__ */ __name(({
  canAddNewMembers,
  conversationId,
  getPreferredBadge,
  i18n,
  maxShownMemberCount = 5,
  memberships,
  showContactModal,
  startAddingNewMembers,
  theme
}) => {
  const [showAllMembers, setShowAllMembers] = import_react.default.useState(false);
  const sortedMemberships = sortMemberships(memberships);
  const shouldHideRestMembers = sortedMemberships.length - maxShownMemberCount > 1;
  const membersToShow = shouldHideRestMembers && !showAllMembers ? maxShownMemberCount : sortedMemberships.length;
  return /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, {
    title: i18n("ConversationDetailsMembershipList--title", [
      sortedMemberships.length.toString()
    ])
  }, canAddNewMembers && /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement("div", {
      className: "ConversationDetails-membership-list__add-members-icon"
    }),
    label: i18n("ConversationDetailsMembershipList--add-members"),
    onClick: () => startAddingNewMembers?.()
  }), sortedMemberships.slice(0, membersToShow).map(({ isAdmin, member }) => /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    key: member.id,
    onClick: () => showContactModal(member.id, conversationId),
    icon: /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      conversationType: "direct",
      badge: getPreferredBadge(member.badges),
      i18n,
      size: 32,
      theme,
      ...member
    }),
    label: /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
      text: member.isMe ? i18n("you") : member.title
    }),
    right: isAdmin ? i18n("GroupV2--admin") : ""
  })), showAllMembers === false && shouldHideRestMembers && /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    className: "ConversationDetails-membership-list--show-all",
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("ConversationDetailsMembershipList--show-all"),
      icon: import_ConversationDetailsIcon.IconType.down
    }),
    onClick: () => setShowAllMembers(true),
    label: i18n("ConversationDetailsMembershipList--show-all")
  }));
}, "ConversationDetailsMembershipList");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationDetailsMembershipList
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuLi8uLi9BdmF0YXInO1xuaW1wb3J0IHsgRW1vamlmeSB9IGZyb20gJy4uL0Vtb2ppZnknO1xuXG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzSWNvbiwgSWNvblR5cGUgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNJY29uJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHsgUGFuZWxSb3cgfSBmcm9tICcuL1BhbmVsUm93JztcbmltcG9ydCB7IFBhbmVsU2VjdGlvbiB9IGZyb20gJy4vUGFuZWxTZWN0aW9uJztcblxuZXhwb3J0IHR5cGUgR3JvdXBWMk1lbWJlcnNoaXAgPSB7XG4gIGlzQWRtaW46IGJvb2xlYW47XG4gIG1lbWJlcjogQ29udmVyc2F0aW9uVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBjYW5BZGROZXdNZW1iZXJzOiBib29sZWFuO1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1heFNob3duTWVtYmVyQ291bnQ/OiBudW1iZXI7XG4gIG1lbWJlcnNoaXBzOiBBcnJheTxHcm91cFYyTWVtYmVyc2hpcD47XG4gIHNob3dDb250YWN0TW9kYWw6IChjb250YWN0SWQ6IHN0cmluZywgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN0YXJ0QWRkaW5nTmV3TWVtYmVycz86ICgpID0+IHZvaWQ7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG5jb25zdCBjb2xsYXRvciA9IG5ldyBJbnRsLkNvbGxhdG9yKHVuZGVmaW5lZCwgeyBzZW5zaXRpdml0eTogJ2Jhc2UnIH0pO1xuZnVuY3Rpb24gc29ydENvbnZlcnNhdGlvblRpdGxlcyhcbiAgbGVmdDogR3JvdXBWMk1lbWJlcnNoaXAsXG4gIHJpZ2h0OiBHcm91cFYyTWVtYmVyc2hpcFxuKSB7XG4gIGNvbnN0IGxlZnRUaXRsZSA9IGxlZnQubWVtYmVyLnRpdGxlO1xuICBjb25zdCByaWdodFRpdGxlID0gcmlnaHQubWVtYmVyLnRpdGxlO1xuICByZXR1cm4gY29sbGF0b3IuY29tcGFyZShsZWZ0VGl0bGUsIHJpZ2h0VGl0bGUpO1xufVxuXG5mdW5jdGlvbiBzb3J0TWVtYmVyc2hpcHMoXG4gIG1lbWJlcnNoaXBzOiBSZWFkb25seUFycmF5PEdyb3VwVjJNZW1iZXJzaGlwPlxuKTogQXJyYXk8R3JvdXBWMk1lbWJlcnNoaXA+IHtcbiAgbGV0IHlvdTogdW5kZWZpbmVkIHwgR3JvdXBWMk1lbWJlcnNoaXA7XG4gIGNvbnN0IGFkbWluczogQXJyYXk8R3JvdXBWMk1lbWJlcnNoaXA+ID0gW107XG4gIGNvbnN0IG5vbkFkbWluczogQXJyYXk8R3JvdXBWMk1lbWJlcnNoaXA+ID0gW107XG4gIG1lbWJlcnNoaXBzLmZvckVhY2gobWVtYmVyc2hpcEluZm8gPT4ge1xuICAgIGNvbnN0IHsgaXNBZG1pbiwgbWVtYmVyIH0gPSBtZW1iZXJzaGlwSW5mbztcbiAgICBpZiAobWVtYmVyLmlzTWUpIHtcbiAgICAgIHlvdSA9IG1lbWJlcnNoaXBJbmZvO1xuICAgIH0gZWxzZSBpZiAoaXNBZG1pbikge1xuICAgICAgYWRtaW5zLnB1c2gobWVtYmVyc2hpcEluZm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25BZG1pbnMucHVzaChtZW1iZXJzaGlwSW5mbyk7XG4gICAgfVxuICB9KTtcbiAgYWRtaW5zLnNvcnQoc29ydENvbnZlcnNhdGlvblRpdGxlcyk7XG4gIG5vbkFkbWlucy5zb3J0KHNvcnRDb252ZXJzYXRpb25UaXRsZXMpO1xuXG4gIGNvbnN0IHNvcnRlZE1lbWJlcnNoaXBzID0gW107XG4gIGlmICh5b3UpIHtcbiAgICBzb3J0ZWRNZW1iZXJzaGlwcy5wdXNoKHlvdSk7XG4gIH1cbiAgc29ydGVkTWVtYmVyc2hpcHMucHVzaCguLi5hZG1pbnMpO1xuICBzb3J0ZWRNZW1iZXJzaGlwcy5wdXNoKC4uLm5vbkFkbWlucyk7XG5cbiAgcmV0dXJuIHNvcnRlZE1lbWJlcnNoaXBzO1xufVxuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0OiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzPiA9ICh7XG4gIGNhbkFkZE5ld01lbWJlcnMsXG4gIGNvbnZlcnNhdGlvbklkLFxuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgaTE4bixcbiAgbWF4U2hvd25NZW1iZXJDb3VudCA9IDUsXG4gIG1lbWJlcnNoaXBzLFxuICBzaG93Q29udGFjdE1vZGFsLFxuICBzdGFydEFkZGluZ05ld01lbWJlcnMsXG4gIHRoZW1lLFxufSkgPT4ge1xuICBjb25zdCBbc2hvd0FsbE1lbWJlcnMsIHNldFNob3dBbGxNZW1iZXJzXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3Qgc29ydGVkTWVtYmVyc2hpcHMgPSBzb3J0TWVtYmVyc2hpcHMobWVtYmVyc2hpcHMpO1xuXG4gIGNvbnN0IHNob3VsZEhpZGVSZXN0TWVtYmVycyA9XG4gICAgc29ydGVkTWVtYmVyc2hpcHMubGVuZ3RoIC0gbWF4U2hvd25NZW1iZXJDb3VudCA+IDE7XG4gIGNvbnN0IG1lbWJlcnNUb1Nob3cgPVxuICAgIHNob3VsZEhpZGVSZXN0TWVtYmVycyAmJiAhc2hvd0FsbE1lbWJlcnNcbiAgICAgID8gbWF4U2hvd25NZW1iZXJDb3VudFxuICAgICAgOiBzb3J0ZWRNZW1iZXJzaGlwcy5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8UGFuZWxTZWN0aW9uXG4gICAgICB0aXRsZT17aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0LS10aXRsZScsIFtcbiAgICAgICAgc29ydGVkTWVtYmVyc2hpcHMubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgICBdKX1cbiAgICA+XG4gICAgICB7Y2FuQWRkTmV3TWVtYmVycyAmJiAoXG4gICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25EZXRhaWxzLW1lbWJlcnNoaXAtbGlzdF9fYWRkLW1lbWJlcnMtaWNvblwiIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhYmVsPXtpMThuKCdDb252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3QtLWFkZC1tZW1iZXJzJyl9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc3RhcnRBZGRpbmdOZXdNZW1iZXJzPy4oKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7c29ydGVkTWVtYmVyc2hpcHMuc2xpY2UoMCwgbWVtYmVyc1RvU2hvdykubWFwKCh7IGlzQWRtaW4sIG1lbWJlciB9KSA9PiAoXG4gICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgIGtleT17bWVtYmVyLmlkfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dDb250YWN0TW9kYWwobWVtYmVyLmlkLCBjb252ZXJzYXRpb25JZCl9XG4gICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2UobWVtYmVyLmJhZGdlcyl9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIHNpemU9ezMyfVxuICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgIHsuLi5tZW1iZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICBsYWJlbD17PEVtb2ppZnkgdGV4dD17bWVtYmVyLmlzTWUgPyBpMThuKCd5b3UnKSA6IG1lbWJlci50aXRsZX0gLz59XG4gICAgICAgICAgcmlnaHQ9e2lzQWRtaW4gPyBpMThuKCdHcm91cFYyLS1hZG1pbicpIDogJyd9XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICAgIHtzaG93QWxsTWVtYmVycyA9PT0gZmFsc2UgJiYgc2hvdWxkSGlkZVJlc3RNZW1iZXJzICYmIChcbiAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgY2xhc3NOYW1lPVwiQ29udmVyc2F0aW9uRGV0YWlscy1tZW1iZXJzaGlwLWxpc3QtLXNob3ctYWxsXCJcbiAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdC0tc2hvdy1hbGwnKX1cbiAgICAgICAgICAgICAgaWNvbj17SWNvblR5cGUuZG93bn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dBbGxNZW1iZXJzKHRydWUpfVxuICAgICAgICAgIGxhYmVsPXtpMThuKCdDb252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3QtLXNob3ctYWxsJyl9XG4gICAgICAgIC8+XG4g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
