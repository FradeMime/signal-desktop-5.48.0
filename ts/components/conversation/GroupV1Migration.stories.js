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
var GroupV1Migration_stories_exports = {};
__export(GroupV1Migration_stories_exports, {
  JustDroppedMembers: () => JustDroppedMembers,
  JustInvitedMembers: () => JustInvitedMembers,
  MultipleDroppedAndInvitedMembers: () => MultipleDroppedAndInvitedMembers,
  NoDroppedOrInvitedMembers: () => NoDroppedOrInvitedMembers,
  SingleDroppedAndSingleInvitedMember: () => SingleDroppedAndSingleInvitedMember,
  YouWereInvited: () => YouWereInvited,
  default: () => GroupV1Migration_stories_default
});
module.exports = __toCommonJS(GroupV1Migration_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_GroupV1Migration = require("./GroupV1Migration");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const contact1 = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Alice",
  phoneNumber: "+1 (300) 555-000",
  id: "guid-1"
});
const contact2 = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Bob",
  phoneNumber: "+1 (300) 555-000",
  id: "guid-2"
});
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  areWeInvited: (0, import_addon_knobs.boolean)("areWeInvited", (0, import_lodash.isBoolean)(overrideProps.areWeInvited) ? overrideProps.areWeInvited : false),
  droppedMembers: overrideProps.droppedMembers || [contact1],
  getPreferredBadge: () => void 0,
  i18n,
  invitedMembers: overrideProps.invitedMembers || [contact2],
  theme: import_Util.ThemeType.light
}), "createProps");
var GroupV1Migration_stories_default = {
  title: "Components/Conversation/GroupV1Migration"
};
const YouWereInvited = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV1Migration.GroupV1Migration, {
  ...createProps({
    areWeInvited: true
  })
}), "YouWereInvited");
YouWereInvited.story = {
  name: "You were invited"
};
const SingleDroppedAndSingleInvitedMember = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV1Migration.GroupV1Migration, {
  ...createProps()
}), "SingleDroppedAndSingleInvitedMember");
SingleDroppedAndSingleInvitedMember.story = {
  name: "Single dropped and single invited member"
};
const MultipleDroppedAndInvitedMembers = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV1Migration.GroupV1Migration, {
  ...createProps({
    invitedMembers: [contact1, contact2],
    droppedMembers: [contact1, contact2]
  })
}), "MultipleDroppedAndInvitedMembers");
MultipleDroppedAndInvitedMembers.story = {
  name: "Multiple dropped and invited members"
};
const JustInvitedMembers = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV1Migration.GroupV1Migration, {
  ...createProps({
    invitedMembers: [contact1, contact1, contact2, contact2],
    droppedMembers: []
  })
}), "JustInvitedMembers");
JustInvitedMembers.story = {
  name: "Just invited members"
};
const JustDroppedMembers = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV1Migration.GroupV1Migration, {
  ...createProps({
    invitedMembers: [],
    droppedMembers: [contact1, contact1, contact2, contact2]
  })
}), "JustDroppedMembers");
JustDroppedMembers.story = {
  name: "Just dropped members"
};
const NoDroppedOrInvitedMembers = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV1Migration.GroupV1Migration, {
  ...createProps({
    invitedMembers: [],
    droppedMembers: []
  })
}), "NoDroppedOrInvitedMembers");
NoDroppedOrInvitedMembers.story = {
  name: "No dropped or invited members"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JustDroppedMembers,
  JustInvitedMembers,
  MultipleDroppedAndInvitedMembers,
  NoDroppedOrInvitedMembers,
  SingleDroppedAndSingleInvitedMember,
  YouWereInvited
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMU1pZ3JhdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBib29sZWFuIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0dyb3VwVjFNaWdyYXRpb24nO1xuaW1wb3J0IHsgR3JvdXBWMU1pZ3JhdGlvbiB9IGZyb20gJy4vR3JvdXBWMU1pZ3JhdGlvbic7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY29udGFjdDEgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgdGl0bGU6ICdBbGljZScsXG4gIHBob25lTnVtYmVyOiAnKzEgKDMwMCkgNTU1LTAwMCcsXG4gIGlkOiAnZ3VpZC0xJyxcbn0pO1xuXG5jb25zdCBjb250YWN0MiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICB0aXRsZTogJ0JvYicsXG4gIHBob25lTnVtYmVyOiAnKzEgKDMwMCkgNTU1LTAwMCcsXG4gIGlkOiAnZ3VpZC0yJyxcbn0pO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBhcmVXZUludml0ZWQ6IGJvb2xlYW4oXG4gICAgJ2FyZVdlSW52aXRlZCcsXG4gICAgaXNCb29sZWFuKG92ZXJyaWRlUHJvcHMuYXJlV2VJbnZpdGVkKSA/IG92ZXJyaWRlUHJvcHMuYXJlV2VJbnZpdGVkIDogZmFsc2VcbiAgKSxcbiAgZHJvcHBlZE1lbWJlcnM6IG92ZXJyaWRlUHJvcHMuZHJvcHBlZE1lbWJlcnMgfHwgW2NvbnRhY3QxXSxcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgaTE4bixcbiAgaW52aXRlZE1lbWJlcnM6IG92ZXJyaWRlUHJvcHMuaW52aXRlZE1lbWJlcnMgfHwgW2NvbnRhY3QyXSxcbiAgdGhlbWU6IFRoZW1lVHlwZS5saWdodCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vR3JvdXBWMU1pZ3JhdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgWW91V2VyZUludml0ZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8R3JvdXBWMU1pZ3JhdGlvblxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhcmVXZUludml0ZWQ6IHRydWUsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Zb3VXZXJlSW52aXRlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1lvdSB3ZXJlIGludml0ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFNpbmdsZURyb3BwZWRBbmRTaW5nbGVJbnZpdGVkTWVtYmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEdyb3VwVjFNaWdyYXRpb24gey4uLmNyZWF0ZVByb3BzKCl9IC8+XG4pO1xuXG5TaW5nbGVEcm9wcGVkQW5kU2luZ2xlSW52aXRlZE1lbWJlci5zdG9yeSA9IHtcbiAgbmFtZTogJ1NpbmdsZSBkcm9wcGVkIGFuZCBzaW5nbGUgaW52aXRlZCBtZW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpcGxlRHJvcHBlZEFuZEludml0ZWRNZW1iZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEdyb3VwVjFNaWdyYXRpb25cbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgaW52aXRlZE1lbWJlcnM6IFtjb250YWN0MSwgY29udGFjdDJdLFxuICAgICAgZHJvcHBlZE1lbWJlcnM6IFtjb250YWN0MSwgY29udGFjdDJdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuTXVsdGlwbGVEcm9wcGVkQW5kSW52aXRlZE1lbWJlcnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNdWx0aXBsZSBkcm9wcGVkIGFuZCBpbnZpdGVkIG1lbWJlcnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEp1c3RJbnZpdGVkTWVtYmVycyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cFYxTWlncmF0aW9uXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGludml0ZWRNZW1iZXJzOiBbY29udGFjdDEsIGNvbnRhY3QxLCBjb250YWN0MiwgY29udGFjdDJdLFxuICAgICAgZHJvcHBlZE1lbWJlcnM6IFtdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuSnVzdEludml0ZWRNZW1iZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnSnVzdCBpbnZpdGVkIG1lbWJlcnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEp1c3REcm9wcGVkTWVtYmVycyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cFYxTWlncmF0aW9uXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGludml0ZWRNZW1iZXJzOiBbXSxcbiAgICAgIGRyb3BwZWRNZW1iZXJzOiBbY29udGFjdDEsIGNvbnRhY3QxLCBjb250YWN0MiwgY29udGFjdDJdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuSnVzdERyb3BwZWRNZW1iZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnSnVzdCBkcm9wcGVkIG1lbWJlcnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vRHJvcHBlZE9ySW52aXRlZE1lbWJlcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8R3JvdXBWMU1pZ3JhdGlvblxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpbnZpdGVkTWVtYmVyczogW10sXG4gICAgICBkcm9wcGVkTWVtYmVyczogW10sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Ob0Ryb3BwZWRPckludml0ZWRNZW1iZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnTm8gZHJvcHBlZCBvciBpbnZpdGVkIG1lbWJlcnMnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixvQkFBMEI7QUFDMUIseUJBQXdCO0FBRXhCLG9DQUF1QztBQUN2Qyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLDhCQUFpQztBQUNqQyxrQkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxXQUFXLDBEQUF1QjtBQUFBLEVBQ3RDLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLElBQUk7QUFDTixDQUFDO0FBRUQsTUFBTSxXQUFXLDBEQUF1QjtBQUFBLEVBQ3RDLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLElBQUk7QUFDTixDQUFDO0FBRUQsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsY0FBYyxnQ0FDWixnQkFDQSw2QkFBVSxjQUFjLFlBQVksSUFBSSxjQUFjLGVBQWUsS0FDdkU7QUFBQSxFQUNBLGdCQUFnQixjQUFjLGtCQUFrQixDQUFDLFFBQVE7QUFBQSxFQUN6RCxtQkFBbUIsTUFBTTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxnQkFBZ0IsY0FBYyxrQkFBa0IsQ0FBQyxRQUFRO0FBQUEsRUFDekQsT0FBTyxzQkFBVTtBQUNuQixJQVZvQjtBQVlwQixJQUFPLG1DQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGlCQUFpQiw2QkFDNUIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGNBQWM7QUFBQSxFQUNoQixDQUFDO0FBQUEsQ0FDSCxHQUw0QjtBQVE5QixlQUFlLFFBQVE7QUFBQSxFQUNyQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHNDQUFzQyw2QkFDakQsb0NBQUM7QUFBQSxLQUFxQixZQUFZO0FBQUEsQ0FBRyxHQURZO0FBSW5ELG9DQUFvQyxRQUFRO0FBQUEsRUFDMUMsTUFBTTtBQUNSO0FBRU8sTUFBTSxtQ0FBbUMsNkJBQzlDLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxnQkFBZ0IsQ0FBQyxVQUFVLFFBQVE7QUFBQSxJQUNuQyxnQkFBZ0IsQ0FBQyxVQUFVLFFBQVE7QUFBQSxFQUNyQyxDQUFDO0FBQUEsQ0FDSCxHQU44QztBQVNoRCxpQ0FBaUMsUUFBUTtBQUFBLEVBQ3ZDLE1BQU07QUFDUjtBQUVPLE1BQU0scUJBQXFCLDZCQUNoQyxvQ0FBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsZ0JBQWdCLENBQUMsVUFBVSxVQUFVLFVBQVUsUUFBUTtBQUFBLElBQ3ZELGdCQUFnQixDQUFDO0FBQUEsRUFDbkIsQ0FBQztBQUFBLENBQ0gsR0FOZ0M7QUFTbEMsbUJBQW1CLFFBQVE7QUFBQSxFQUN6QixNQUFNO0FBQ1I7QUFFTyxNQUFNLHFCQUFxQiw2QkFDaEMsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGdCQUFnQixDQUFDO0FBQUEsSUFDakIsZ0JBQWdCLENBQUMsVUFBVSxVQUFVLFVBQVUsUUFBUTtBQUFBLEVBQ3pELENBQUM7QUFBQSxDQUNILEdBTmdDO0FBU2xDLG1CQUFtQixRQUFRO0FBQUEsRUFDekIsTUFBTTtBQUNSO0FBRU8sTUFBTSw0QkFBNEIsNkJBQ3ZDLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxnQkFBZ0IsQ0FBQztBQUFBLElBQ2pCLGdCQUFnQixDQUFDO0FBQUEsRUFDbkIsQ0FBQztBQUFBLENBQ0gsR0FOdUM7QUFTekMsMEJBQTBCLFFBQVE7QUFBQSxFQUNoQyxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
