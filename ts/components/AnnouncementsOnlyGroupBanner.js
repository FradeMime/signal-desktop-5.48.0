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
var AnnouncementsOnlyGroupBanner_exports = {};
__export(AnnouncementsOnlyGroupBanner_exports, {
  AnnouncementsOnlyGroupBanner: () => AnnouncementsOnlyGroupBanner
});
module.exports = __toCommonJS(AnnouncementsOnlyGroupBanner_exports);
var import_react = __toESM(require("react"));
var import_Intl = require("./Intl");
var import_Modal = require("./Modal");
var import_ConversationListItem = require("./conversationList/ConversationListItem");
const AnnouncementsOnlyGroupBanner = /* @__PURE__ */ __name(({
  groupAdmins,
  i18n,
  openConversation,
  theme
}) => {
  const [isShowingAdmins, setIsShowingAdmins] = (0, import_react.useState)(false);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, isShowingAdmins && /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    i18n,
    onClose: () => setIsShowingAdmins(false),
    title: i18n("AnnouncementsOnlyGroupBanner--modal")
  }, groupAdmins.map((admin) => /* @__PURE__ */ import_react.default.createElement(import_ConversationListItem.ConversationListItem, {
    ...admin,
    i18n,
    onClick: () => {
      openConversation(admin.id);
    },
    draftPreview: "",
    lastMessage: void 0,
    lastUpdated: void 0,
    theme
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AnnouncementsOnlyGroupBanner__banner"
  }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "AnnouncementsOnlyGroupBanner--announcements-only",
    components: [
      /* @__PURE__ */ import_react.default.createElement("button", {
        className: "AnnouncementsOnlyGroupBanner__banner--admins",
        type: "button",
        onClick: () => setIsShowingAdmins(true)
      }, i18n("AnnouncementsOnlyGroupBanner--admins"))
    ]
  })));
}, "AnnouncementsOnlyGroupBanner");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnnouncementsOnlyGroupBanner
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQW5ub3VuY2VtZW50c09ubHlHcm91cEJhbm5lci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi9JbnRsJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uTGlzdEl0ZW0gfSBmcm9tICcuL2NvbnZlcnNhdGlvbkxpc3QvQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgZ3JvdXBBZG1pbnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvcGVuQ29udmVyc2F0aW9uOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBBbm5vdW5jZW1lbnRzT25seUdyb3VwQmFubmVyID0gKHtcbiAgZ3JvdXBBZG1pbnMsXG4gIGkxOG4sXG4gIG9wZW5Db252ZXJzYXRpb24sXG4gIHRoZW1lLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbaXNTaG93aW5nQWRtaW5zLCBzZXRJc1Nob3dpbmdBZG1pbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtpc1Nob3dpbmdBZG1pbnMgJiYgKFxuICAgICAgICA8TW9kYWxcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzU2hvd2luZ0FkbWlucyhmYWxzZSl9XG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ0Fubm91bmNlbWVudHNPbmx5R3JvdXBCYW5uZXItLW1vZGFsJyl9XG4gICAgICAgID5cbiAgICAgICAgICB7Z3JvdXBBZG1pbnMubWFwKGFkbWluID0+IChcbiAgICAgICAgICAgIDxDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICAgICAgICB7Li4uYWRtaW59XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKGFkbWluLmlkKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgZHJhZnRQcmV2aWV3PVwiXCJcbiAgICAgICAgICAgICAgbGFzdE1lc3NhZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgbGFzdFVwZGF0ZWQ9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Nb2RhbD5cbiAgICAgICl9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFubm91bmNlbWVudHNPbmx5R3JvdXBCYW5uZXJfX2Jhbm5lclwiPlxuICAgICAgICA8SW50bFxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaWQ9XCJBbm5vdW5jZW1lbnRzT25seUdyb3VwQmFubmVyLS1hbm5vdW5jZW1lbnRzLW9ubHlcIlxuICAgICAgICAgIGNvbXBvbmVudHM9e1tcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiQW5ub3VuY2VtZW50c09ubHlHcm91cEJhbm5lcl9fYmFubmVyLS1hZG1pbnNcIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTaG93aW5nQWRtaW5zKHRydWUpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aTE4bignQW5ub3VuY2VtZW50c09ubHlHcm91cEJhbm5lci0tYWRtaW5zJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj4sXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMsa0JBQXFCO0FBRXJCLG1CQUFzQjtBQUN0QixrQ0FBcUM7QUFTOUIsTUFBTSwrQkFBK0Isd0JBQUM7QUFBQSxFQUMzQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sQ0FBQyxpQkFBaUIsc0JBQXNCLDJCQUFTLEtBQUs7QUFFNUQsU0FDRSx3RkFDRyxtQkFDQyxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLFNBQVMsTUFBTSxtQkFBbUIsS0FBSztBQUFBLElBQ3ZDLE9BQU8sS0FBSyxxQ0FBcUM7QUFBQSxLQUVoRCxZQUFZLElBQUksV0FDZixtREFBQztBQUFBLE9BQ0s7QUFBQSxJQUNKO0FBQUEsSUFDQSxTQUFTLE1BQU07QUFDYix1QkFBaUIsTUFBTSxFQUFFO0FBQUEsSUFDM0I7QUFBQSxJQUNBLGNBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiO0FBQUEsR0FDRixDQUNELENBQ0gsR0FFRixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxJQUFHO0FBQUEsSUFDSCxZQUFZO0FBQUEsTUFDVixtREFBQztBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsTUFBSztBQUFBLFFBQ0wsU0FBUyxNQUFNLG1CQUFtQixJQUFJO0FBQUEsU0FFckMsS0FBSyxzQ0FBc0MsQ0FDOUM7QUFBQSxJQUNGO0FBQUEsR0FDRixDQUNGLENBQ0Y7QUFFSixHQWhENEM7IiwKICAibmFtZXMiOiBbXQp9Cg==
