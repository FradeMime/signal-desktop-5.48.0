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
var PendingInvites_stories_exports = {};
__export(PendingInvites_stories_exports, {
  Basic: () => Basic,
  WithBadges: () => WithBadges,
  default: () => PendingInvites_stories_default
});
module.exports = __toCommonJS(PendingInvites_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_UUID = require("../../../types/UUID");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_PendingInvites = require("./PendingInvites");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_getFakeBadge = require("../../../test-both/helpers/getFakeBadge");
var import_StorybookThemeContext = require("../../../../.storybook/StorybookThemeContext");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var PendingInvites_stories_default = {
  title: "Components/Conversation/ConversationDetails/PendingInvites"
};
const sortedGroupMembers = Array.from(Array(32)).map((_, i) => i === 0 ? (0, import_getDefaultConversation.getDefaultConversation)({ id: "def456" }) : (0, import_getDefaultConversation.getDefaultConversation)({}));
const conversation = {
  acceptedMessageRequest: true,
  areWeAdmin: true,
  badges: [],
  id: "",
  lastUpdated: 0,
  markedUnread: false,
  isMe: false,
  sortedGroupMembers,
  title: "Some Conversation",
  type: "group",
  sharedGroupNames: []
};
const OUR_UUID = import_UUID.UUID.generate().toString();
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  approvePendingMembership: (0, import_addon_actions.action)("approvePendingMembership"),
  conversation,
  getPreferredBadge: () => void 0,
  i18n,
  ourUuid: OUR_UUID,
  pendingApprovalMemberships: (0, import_lodash.times)(5, () => ({
    member: (0, import_getDefaultConversation.getDefaultConversation)()
  })),
  pendingMemberships: [
    ...(0, import_lodash.times)(4, () => ({
      member: (0, import_getDefaultConversation.getDefaultConversation)(),
      metadata: {
        addedByUserId: OUR_UUID
      }
    })),
    ...(0, import_lodash.times)(8, () => ({
      member: (0, import_getDefaultConversation.getDefaultConversation)(),
      metadata: {
        addedByUserId: import_UUID.UUID.generate().toString()
      }
    }))
  ],
  revokePendingMemberships: (0, import_addon_actions.action)("revokePendingMemberships"),
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext),
  ...overrideProps
}), "useProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = useProps();
  return /* @__PURE__ */ React.createElement(import_PendingInvites.PendingInvites, {
    ...props
  });
}, "Basic");
const WithBadges = /* @__PURE__ */ __name(() => {
  const props = useProps({ getPreferredBadge: () => (0, import_getFakeBadge.getFakeBadge)() });
  return /* @__PURE__ */ React.createElement(import_PendingInvites.PendingInvites, {
    ...props
  });
}, "WithBadges");
WithBadges.story = {
  name: "With badges"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  WithBadges
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGVuZGluZ0ludml0ZXMuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGltZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9QZW5kaW5nSW52aXRlcyc7XG5pbXBvcnQgeyBQZW5kaW5nSW52aXRlcyB9IGZyb20gJy4vUGVuZGluZ0ludml0ZXMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBnZXRGYWtlQmFkZ2UgfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXRGYWtlQmFkZ2UnO1xuaW1wb3J0IHsgU3Rvcnlib29rVGhlbWVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLnN0b3J5Ym9vay9TdG9yeWJvb2tUaGVtZUNvbnRleHQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ29udmVyc2F0aW9uRGV0YWlscy9QZW5kaW5nSW52aXRlcycsXG59O1xuXG5jb25zdCBzb3J0ZWRHcm91cE1lbWJlcnMgPSBBcnJheS5mcm9tKEFycmF5KDMyKSkubWFwKChfLCBpKSA9PlxuICBpID09PSAwXG4gICAgPyBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgaWQ6ICdkZWY0NTYnIH0pXG4gICAgOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHt9KVxuKTtcblxuY29uc3QgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlID0ge1xuICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICBhcmVXZUFkbWluOiB0cnVlLFxuICBiYWRnZXM6IFtdLFxuICBpZDogJycsXG4gIGxhc3RVcGRhdGVkOiAwLFxuICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuICBpc01lOiBmYWxzZSxcbiAgc29ydGVkR3JvdXBNZW1iZXJzLFxuICB0aXRsZTogJ1NvbWUgQ29udmVyc2F0aW9uJyxcbiAgdHlwZTogJ2dyb3VwJyxcbiAgc2hhcmVkR3JvdXBOYW1lczogW10sXG59O1xuXG5jb25zdCBPVVJfVVVJRCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuXG5jb25zdCB1c2VQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBhcHByb3ZlUGVuZGluZ01lbWJlcnNoaXA6IGFjdGlvbignYXBwcm92ZVBlbmRpbmdNZW1iZXJzaGlwJyksXG4gIGNvbnZlcnNhdGlvbixcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgaTE4bixcbiAgb3VyVXVpZDogT1VSX1VVSUQsXG4gIHBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzOiB0aW1lcyg1LCAoKSA9PiAoe1xuICAgIG1lbWJlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICB9KSksXG4gIHBlbmRpbmdNZW1iZXJzaGlwczogW1xuICAgIC4uLnRpbWVzKDQsICgpID0+ICh7XG4gICAgICBtZW1iZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIGFkZGVkQnlVc2VySWQ6IE9VUl9VVUlELFxuICAgICAgfSxcbiAgICB9KSksXG4gICAgLi4udGltZXMoOCwgKCkgPT4gKHtcbiAgICAgIG1lbWJlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgYWRkZWRCeVVzZXJJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICB9LFxuICAgIH0pKSxcbiAgXSxcbiAgcmV2b2tlUGVuZGluZ01lbWJlcnNoaXBzOiBhY3Rpb24oJ3Jldm9rZVBlbmRpbmdNZW1iZXJzaGlwcycpLFxuICB0aGVtZTogUmVhY3QudXNlQ29udGV4dChTdG9yeWJvb2tUaGVtZUNvbnRleHQpLFxuICAuLi5vdmVycmlkZVByb3BzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBCYXNpYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoKTtcblxuICByZXR1cm4gPFBlbmRpbmdJbnZpdGVzIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aEJhZGdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoeyBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gZ2V0RmFrZUJhZGdlKCkgfSk7XG5cbiAgcmV0dXJuIDxQZW5kaW5nSW52aXRlcyB7Li4ucHJvcHN9IC8+O1xufTtcblxuV2l0aEJhZGdlcy5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggYmFkZ2VzJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLG9CQUFzQjtBQUV0QiwyQkFBdUI7QUFFdkIsa0JBQXFCO0FBQ3JCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsNEJBQStCO0FBRS9CLG9DQUF1QztBQUN2QywwQkFBNkI7QUFDN0IsbUNBQXNDO0FBRXRDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8saUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0scUJBQXFCLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLE1BQ3ZELE1BQU0sSUFDRiwwREFBdUIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxJQUN2QywwREFBdUIsQ0FBQyxDQUFDLENBQy9CO0FBRUEsTUFBTSxlQUFpQztBQUFBLEVBQ3JDLHdCQUF3QjtBQUFBLEVBQ3hCLFlBQVk7QUFBQSxFQUNaLFFBQVEsQ0FBQztBQUFBLEVBQ1QsSUFBSTtBQUFBLEVBQ0osYUFBYTtBQUFBLEVBQ2IsY0FBYztBQUFBLEVBQ2QsTUFBTTtBQUFBLEVBQ047QUFBQSxFQUNBLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLGtCQUFrQixDQUFDO0FBQ3JCO0FBRUEsTUFBTSxXQUFXLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBRTFDLE1BQU0sV0FBVyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQ3ZFLDBCQUEwQixpQ0FBTywwQkFBMEI7QUFBQSxFQUMzRDtBQUFBLEVBQ0EsbUJBQW1CLE1BQU07QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLEVBQ1QsNEJBQTRCLHlCQUFNLEdBQUcsTUFBTztBQUFBLElBQzFDLFFBQVEsMERBQXVCO0FBQUEsRUFDakMsRUFBRTtBQUFBLEVBQ0Ysb0JBQW9CO0FBQUEsSUFDbEIsR0FBRyx5QkFBTSxHQUFHLE1BQU87QUFBQSxNQUNqQixRQUFRLDBEQUF1QjtBQUFBLE1BQy9CLFVBQVU7QUFBQSxRQUNSLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0YsRUFBRTtBQUFBLElBQ0YsR0FBRyx5QkFBTSxHQUFHLE1BQU87QUFBQSxNQUNqQixRQUFRLDBEQUF1QjtBQUFBLE1BQy9CLFVBQVU7QUFBQSxRQUNSLGVBQWUsaUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxNQUMxQztBQUFBLElBQ0YsRUFBRTtBQUFBLEVBQ0o7QUFBQSxFQUNBLDBCQUEwQixpQ0FBTywwQkFBMEI7QUFBQSxFQUMzRCxPQUFPLE1BQU0sV0FBVyxrREFBcUI7QUFBQSxLQUMxQztBQUNMLElBMUJpQjtBQTRCVixNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFFBQU0sUUFBUSxTQUFTO0FBRXZCLFNBQU8sb0NBQUM7QUFBQSxPQUFtQjtBQUFBLEdBQU87QUFDcEMsR0FKcUI7QUFNZCxNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFFBQU0sUUFBUSxTQUFTLEVBQUUsbUJBQW1CLE1BQU0sc0NBQWEsRUFBRSxDQUFDO0FBRWxFLFNBQU8sb0NBQUM7QUFBQSxPQUFtQjtBQUFBLEdBQU87QUFDcEMsR0FKMEI7QUFNMUIsV0FBVyxRQUFRO0FBQUEsRUFDakIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
