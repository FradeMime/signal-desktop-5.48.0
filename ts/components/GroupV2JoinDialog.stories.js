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
var GroupV2JoinDialog_stories_exports = {};
__export(GroupV2JoinDialog_stories_exports, {
  ApprovalRequired: () => ApprovalRequired,
  AvatarLoadingState: () => AvatarLoadingState,
  Basic: () => Basic,
  Full: () => Full,
  WithAvatar: () => WithAvatar,
  WithOneMember: () => WithOneMember,
  default: () => GroupV2JoinDialog_stories_default
});
module.exports = __toCommonJS(GroupV2JoinDialog_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_GroupV2JoinDialog = require("./GroupV2JoinDialog");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  memberCount: (0, import_addon_knobs.number)("memberCount", overrideProps.memberCount || 12),
  avatar: overrideProps.avatar,
  title: (0, import_addon_knobs.text)("title", overrideProps.title || "Random Group!"),
  approvalRequired: (0, import_addon_knobs.boolean)("approvalRequired", overrideProps.approvalRequired || false),
  groupDescription: overrideProps.groupDescription,
  join: (0, import_addon_actions.action)("join"),
  onClose: (0, import_addon_actions.action)("onClose"),
  i18n
}), "createProps");
var GroupV2JoinDialog_stories_default = {
  title: "Components/GroupV2JoinDialog"
};
const Basic = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2JoinDialog.GroupV2JoinDialog, {
    ...createProps()
  });
}, "Basic");
const ApprovalRequired = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2JoinDialog.GroupV2JoinDialog, {
    ...createProps({
      approvalRequired: true,
      title: "Approval required!"
    })
  });
}, "ApprovalRequired");
ApprovalRequired.story = {
  name: "Approval required"
};
const WithAvatar = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2JoinDialog.GroupV2JoinDialog, {
    ...createProps({
      avatar: {
        url: "/fixtures/giphy-GVNvOUpeYmI7e.gif"
      },
      title: "Has an avatar!"
    })
  });
}, "WithAvatar");
WithAvatar.story = {
  name: "With avatar"
};
const WithOneMember = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2JoinDialog.GroupV2JoinDialog, {
    ...createProps({
      memberCount: 1,
      title: "Just one member!"
    })
  });
}, "WithOneMember");
WithOneMember.story = {
  name: "With one member"
};
const AvatarLoadingState = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2JoinDialog.GroupV2JoinDialog, {
    ...createProps({
      avatar: {
        loading: true
      },
      title: "Avatar loading!"
    })
  });
}, "AvatarLoadingState");
AvatarLoadingState.story = {
  name: "Avatar loading state"
};
const Full = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2JoinDialog.GroupV2JoinDialog, {
    ...createProps({
      avatar: {
        url: "/fixtures/giphy-GVNvOUpeYmI7e.gif"
      },
      memberCount: 16,
      groupDescription: "Discuss meets, events, training, and recruiting.",
      title: "Underwater basket weavers (LA)"
    })
  });
}, "Full");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApprovalRequired,
  AvatarLoadingState,
  Basic,
  Full,
  WithAvatar,
  WithOneMember
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMkpvaW5EaWFsb2cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiwgbnVtYmVyLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vR3JvdXBWMkpvaW5EaWFsb2cnO1xuaW1wb3J0IHsgR3JvdXBWMkpvaW5EaWFsb2cgfSBmcm9tICcuL0dyb3VwVjJKb2luRGlhbG9nJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBtZW1iZXJDb3VudDogbnVtYmVyKCdtZW1iZXJDb3VudCcsIG92ZXJyaWRlUHJvcHMubWVtYmVyQ291bnQgfHwgMTIpLFxuICBhdmF0YXI6IG92ZXJyaWRlUHJvcHMuYXZhdGFyLFxuICB0aXRsZTogdGV4dCgndGl0bGUnLCBvdmVycmlkZVByb3BzLnRpdGxlIHx8ICdSYW5kb20gR3JvdXAhJyksXG4gIGFwcHJvdmFsUmVxdWlyZWQ6IGJvb2xlYW4oXG4gICAgJ2FwcHJvdmFsUmVxdWlyZWQnLFxuICAgIG92ZXJyaWRlUHJvcHMuYXBwcm92YWxSZXF1aXJlZCB8fCBmYWxzZVxuICApLFxuICBncm91cERlc2NyaXB0aW9uOiBvdmVycmlkZVByb3BzLmdyb3VwRGVzY3JpcHRpb24sXG4gIGpvaW46IGFjdGlvbignam9pbicpLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgaTE4bixcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Hcm91cFYySm9pbkRpYWxvZycsXG59O1xuXG5leHBvcnQgY29uc3QgQmFzaWMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPEdyb3VwVjJKb2luRGlhbG9nIHsuLi5jcmVhdGVQcm9wcygpfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBBcHByb3ZhbFJlcXVpcmVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8R3JvdXBWMkpvaW5EaWFsb2dcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGFwcHJvdmFsUmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIHRpdGxlOiAnQXBwcm92YWwgcmVxdWlyZWQhJyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5BcHByb3ZhbFJlcXVpcmVkLnN0b3J5ID0ge1xuICBuYW1lOiAnQXBwcm92YWwgcmVxdWlyZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhBdmF0YXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxHcm91cFYySm9pbkRpYWxvZ1xuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2dpcGh5LUdWTnZPVXBlWW1JN2UuZ2lmJyxcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6ICdIYXMgYW4gYXZhdGFyIScsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuV2l0aEF2YXRhci5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggYXZhdGFyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoT25lTWVtYmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8R3JvdXBWMkpvaW5EaWFsb2dcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIG1lbWJlckNvdW50OiAxLFxuICAgICAgICB0aXRsZTogJ0p1c3Qgb25lIG1lbWJlciEnLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbldpdGhPbmVNZW1iZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRoIG9uZSBtZW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IEF2YXRhckxvYWRpbmdTdGF0ZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEdyb3VwVjJKb2luRGlhbG9nXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZTogJ0F2YXRhciBsb2FkaW5nIScsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuQXZhdGFyTG9hZGluZ1N0YXRlLnN0b3J5ID0ge1xuICBuYW1lOiAnQXZhdGFyIGxvYWRpbmcgc3RhdGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEZ1bGwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxHcm91cFYySm9pbkRpYWxvZ1xuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgdXJsOiAnL2ZpeHR1cmVzL2dpcGh5LUdWTnZPVXBlWW1JN2UuZ2lmJyxcbiAgICAgICAgfSxcbiAgICAgICAgbWVtYmVyQ291bnQ6IDE2LFxuICAgICAgICBncm91cERlc2NyaXB0aW9uOiAnRGlzY3VzcyBtZWV0cywgZXZlbnRzLCB0cmFpbmluZywgYW5kIHJlY3J1aXRpbmcuJyxcbiAgICAgICAgdGl0bGU6ICdVbmRlcndhdGVyIGJhc2tldCB3ZWF2ZXJzIChMQSknLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXNDO0FBQ3RDLDJCQUF1QjtBQUd2QiwrQkFBa0M7QUFDbEMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRSxhQUFhLCtCQUFPLGVBQWUsY0FBYyxlQUFlLEVBQUU7QUFBQSxFQUNsRSxRQUFRLGNBQWM7QUFBQSxFQUN0QixPQUFPLDZCQUFLLFNBQVMsY0FBYyxTQUFTLGVBQWU7QUFBQSxFQUMzRCxrQkFBa0IsZ0NBQ2hCLG9CQUNBLGNBQWMsb0JBQW9CLEtBQ3BDO0FBQUEsRUFDQSxrQkFBa0IsY0FBYztBQUFBLEVBQ2hDLE1BQU0saUNBQU8sTUFBTTtBQUFBLEVBQ25CLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCO0FBQ0YsSUFab0I7QUFjcEIsSUFBTyxvQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxRQUFRLDZCQUFtQjtBQUN0QyxTQUFPLG9DQUFDO0FBQUEsT0FBc0IsWUFBWTtBQUFBLEdBQUc7QUFDL0MsR0FGcUI7QUFJZCxNQUFNLG1CQUFtQiw2QkFBbUI7QUFDakQsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2Qsa0JBQWtCO0FBQUEsTUFDbEIsT0FBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVRnQztBQVdoQyxpQkFBaUIsUUFBUTtBQUFBLEVBQ3ZCLE1BQU07QUFDUjtBQUVPLE1BQU0sYUFBYSw2QkFBbUI7QUFDM0MsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ1A7QUFBQSxNQUNBLE9BQU87QUFBQSxJQUNULENBQUM7QUFBQSxHQUNIO0FBRUosR0FYMEI7QUFhMUIsV0FBVyxRQUFRO0FBQUEsRUFDakIsTUFBTTtBQUNSO0FBRU8sTUFBTSxnQkFBZ0IsNkJBQW1CO0FBQzlDLFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxJQUNULENBQUM7QUFBQSxHQUNIO0FBRUosR0FUNkI7QUFXN0IsY0FBYyxRQUFRO0FBQUEsRUFDcEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxxQkFBcUIsNkJBQW1CO0FBQ25ELFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBWGtDO0FBYWxDLG1CQUFtQixRQUFRO0FBQUEsRUFDekIsTUFBTTtBQUNSO0FBRU8sTUFBTSxPQUFPLDZCQUFtQjtBQUNyQyxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixLQUFLO0FBQUEsTUFDUDtBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2Isa0JBQWtCO0FBQUEsTUFDbEIsT0FBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQWJvQjsiLAogICJuYW1lcyI6IFtdCn0K
