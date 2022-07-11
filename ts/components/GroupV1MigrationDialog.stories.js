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
var GroupV1MigrationDialog_stories_exports = {};
__export(GroupV1MigrationDialog_stories_exports, {
  MigratedBasic: () => MigratedBasic,
  MigratedYouAreInvited: () => MigratedYouAreInvited,
  NotYetMigratedBasic: () => NotYetMigratedBasic,
  NotYetMigratedJustDroppedMember: () => NotYetMigratedJustDroppedMember,
  NotYetMigratedMultipleDroppedAndInvitedMembers: () => NotYetMigratedMultipleDroppedAndInvitedMembers,
  NotYetMigratedNoMembers: () => NotYetMigratedNoMembers,
  default: () => GroupV1MigrationDialog_stories_default
});
module.exports = __toCommonJS(GroupV1MigrationDialog_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_GroupV1MigrationDialog = require("./GroupV1MigrationDialog");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_Util = require("../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const contact1 = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Alice",
  phoneNumber: "+1 (300) 555-0000",
  id: "guid-1"
});
const contact2 = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Bob",
  phoneNumber: "+1 (300) 555-0001",
  id: "guid-2"
});
const contact3 = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Chet",
  phoneNumber: "+1 (300) 555-0002",
  id: "guid-3"
});
function booleanOr(value, defaultValue) {
  return (0, import_lodash.isBoolean)(value) ? value : defaultValue;
}
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  areWeInvited: (0, import_addon_knobs.boolean)("areWeInvited", booleanOr(overrideProps.areWeInvited, false)),
  droppedMembers: overrideProps.droppedMembers || [contact3, contact1],
  getPreferredBadge: () => void 0,
  hasMigrated: (0, import_addon_knobs.boolean)("hasMigrated", booleanOr(overrideProps.hasMigrated, false)),
  i18n,
  invitedMembers: overrideProps.invitedMembers || [contact2],
  migrate: (0, import_addon_actions.action)("migrate"),
  onClose: (0, import_addon_actions.action)("onClose"),
  theme: import_Util.ThemeType.light
}), "createProps");
var GroupV1MigrationDialog_stories_default = {
  title: "Components/GroupV1MigrationDialog"
};
const NotYetMigratedBasic = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    ...createProps()
  });
}, "NotYetMigratedBasic");
NotYetMigratedBasic.story = {
  name: "Not yet migrated, basic"
};
const MigratedBasic = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    ...createProps({
      hasMigrated: true
    })
  });
}, "MigratedBasic");
MigratedBasic.story = {
  name: "Migrated, basic"
};
const MigratedYouAreInvited = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    ...createProps({
      hasMigrated: true,
      areWeInvited: true
    })
  });
}, "MigratedYouAreInvited");
MigratedYouAreInvited.story = {
  name: "Migrated, you are invited"
};
const NotYetMigratedMultipleDroppedAndInvitedMembers = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    ...createProps({
      droppedMembers: [contact3, contact1, contact2],
      invitedMembers: [contact2, contact3, contact1]
    })
  });
}, "NotYetMigratedMultipleDroppedAndInvitedMembers");
NotYetMigratedMultipleDroppedAndInvitedMembers.story = {
  name: "Not yet migrated, multiple dropped and invited members"
};
const NotYetMigratedNoMembers = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    ...createProps({
      droppedMembers: [],
      invitedMembers: []
    })
  });
}, "NotYetMigratedNoMembers");
NotYetMigratedNoMembers.story = {
  name: "Not yet migrated, no members"
};
const NotYetMigratedJustDroppedMember = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    ...createProps({
      invitedMembers: []
    })
  });
}, "NotYetMigratedJustDroppedMember");
NotYetMigratedJustDroppedMember.story = {
  name: "Not yet migrated, just dropped member"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MigratedBasic,
  MigratedYouAreInvited,
  NotYetMigratedBasic,
  NotYetMigratedJustDroppedMember,
  NotYetMigratedMultipleDroppedAndInvitedMembers,
  NotYetMigratedNoMembers
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBib29sZWFuIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBHcm91cFYxTWlncmF0aW9uRGlhbG9nIH0gZnJvbSAnLi9Hcm91cFYxTWlncmF0aW9uRGlhbG9nJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY29udGFjdDE6IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgdGl0bGU6ICdBbGljZScsXG4gIHBob25lTnVtYmVyOiAnKzEgKDMwMCkgNTU1LTAwMDAnLFxuICBpZDogJ2d1aWQtMScsXG59KTtcblxuY29uc3QgY29udGFjdDI6IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgdGl0bGU6ICdCb2InLFxuICBwaG9uZU51bWJlcjogJysxICgzMDApIDU1NS0wMDAxJyxcbiAgaWQ6ICdndWlkLTInLFxufSk7XG5cbmNvbnN0IGNvbnRhY3QzOiBDb252ZXJzYXRpb25UeXBlID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIHRpdGxlOiAnQ2hldCcsXG4gIHBob25lTnVtYmVyOiAnKzEgKDMwMCkgNTU1LTAwMDInLFxuICBpZDogJ2d1aWQtMycsXG59KTtcblxuZnVuY3Rpb24gYm9vbGVhbk9yKHZhbHVlOiBib29sZWFuIHwgdW5kZWZpbmVkLCBkZWZhdWx0VmFsdWU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzQm9vbGVhbih2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXJlV2VJbnZpdGVkOiBib29sZWFuKFxuICAgICdhcmVXZUludml0ZWQnLFxuICAgIGJvb2xlYW5PcihvdmVycmlkZVByb3BzLmFyZVdlSW52aXRlZCwgZmFsc2UpXG4gICksXG4gIGRyb3BwZWRNZW1iZXJzOiBvdmVycmlkZVByb3BzLmRyb3BwZWRNZW1iZXJzIHx8IFtjb250YWN0MywgY29udGFjdDFdLFxuICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICBoYXNNaWdyYXRlZDogYm9vbGVhbihcbiAgICAnaGFzTWlncmF0ZWQnLFxuICAgIGJvb2xlYW5PcihvdmVycmlkZVByb3BzLmhhc01pZ3JhdGVkLCBmYWxzZSlcbiAgKSxcbiAgaTE4bixcbiAgaW52aXRlZE1lbWJlcnM6IG92ZXJyaWRlUHJvcHMuaW52aXRlZE1lbWJlcnMgfHwgW2NvbnRhY3QyXSxcbiAgbWlncmF0ZTogYWN0aW9uKCdtaWdyYXRlJyksXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0dyb3VwVjFNaWdyYXRpb25EaWFsb2cnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdFlldE1pZ3JhdGVkQmFzaWMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPEdyb3VwVjFNaWdyYXRpb25EaWFsb2cgey4uLmNyZWF0ZVByb3BzKCl9IC8+O1xufTtcblxuTm90WWV0TWlncmF0ZWRCYXNpYy5zdG9yeSA9IHtcbiAgbmFtZTogJ05vdCB5ZXQgbWlncmF0ZWQsIGJhc2ljJyxcbn07XG5cbmV4cG9ydCBjb25zdCBNaWdyYXRlZEJhc2ljID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8R3JvdXBWMU1pZ3JhdGlvbkRpYWxvZ1xuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgaGFzTWlncmF0ZWQ6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuTWlncmF0ZWRCYXNpYy5zdG9yeSA9IHtcbiAgbmFtZTogJ01pZ3JhdGVkLCBiYXNpYycsXG59O1xuXG5leHBvcnQgY29uc3QgTWlncmF0ZWRZb3VBcmVJbnZpdGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8R3JvdXBWMU1pZ3JhdGlvbkRpYWxvZ1xuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgaGFzTWlncmF0ZWQ6IHRydWUsXG4gICAgICAgIGFyZVdlSW52aXRlZDogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5NaWdyYXRlZFlvdUFyZUludml0ZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdNaWdyYXRlZCwgeW91IGFyZSBpbnZpdGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RZZXRNaWdyYXRlZE11bHRpcGxlRHJvcHBlZEFuZEludml0ZWRNZW1iZXJzID1cbiAgKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPEdyb3VwVjFNaWdyYXRpb25EaWFsb2dcbiAgICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgICBkcm9wcGVkTWVtYmVyczogW2NvbnRhY3QzLCBjb250YWN0MSwgY29udGFjdDJdLFxuICAgICAgICAgIGludml0ZWRNZW1iZXJzOiBbY29udGFjdDIsIGNvbnRhY3QzLCBjb250YWN0MV0sXG4gICAgICAgIH0pfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG5Ob3RZZXRNaWdyYXRlZE11bHRpcGxlRHJvcHBlZEFuZEludml0ZWRNZW1iZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90IHlldCBtaWdyYXRlZCwgbXVsdGlwbGUgZHJvcHBlZCBhbmQgaW52aXRlZCBtZW1iZXJzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RZZXRNaWdyYXRlZE5vTWVtYmVycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEdyb3VwVjFNaWdyYXRpb25EaWFsb2dcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGRyb3BwZWRNZW1iZXJzOiBbXSxcbiAgICAgICAgaW52aXRlZE1lbWJlcnM6IFtdLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbk5vdFlldE1pZ3JhdGVkTm9NZW1iZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90IHlldCBtaWdyYXRlZCwgbm8gbWVtYmVycycsXG59O1xuXG5leHBvcnQgY29uc3QgTm90WWV0TWlncmF0ZWRKdXN0RHJvcHBlZE1lbWJlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEdyb3VwVjFNaWdyYXRpb25EaWFsb2dcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGludml0ZWRNZW1iZXJzOiBbXSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5Ob3RZZXRNaWdyYXRlZEp1c3REcm9wcGVkTWVtYmVyLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90IHlldCBtaWdyYXRlZCwganVzdCBkcm9wcGVkIG1lbWJlcicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLG9CQUEwQjtBQUMxQix5QkFBd0I7QUFDeEIsMkJBQXVCO0FBR3ZCLG9DQUF1QztBQUV2Qyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG9DQUF1QztBQUN2QyxrQkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxXQUE2QiwwREFBdUI7QUFBQSxFQUN4RCxPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixJQUFJO0FBQ04sQ0FBQztBQUVELE1BQU0sV0FBNkIsMERBQXVCO0FBQUEsRUFDeEQsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsSUFBSTtBQUNOLENBQUM7QUFFRCxNQUFNLFdBQTZCLDBEQUF1QjtBQUFBLEVBQ3hELE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLElBQUk7QUFDTixDQUFDO0FBRUQsbUJBQW1CLE9BQTRCLGNBQWdDO0FBQzdFLFNBQU8sNkJBQVUsS0FBSyxJQUFJLFFBQVE7QUFDcEM7QUFGUyxBQUlULE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLGNBQWMsZ0NBQ1osZ0JBQ0EsVUFBVSxjQUFjLGNBQWMsS0FBSyxDQUM3QztBQUFBLEVBQ0EsZ0JBQWdCLGNBQWMsa0JBQWtCLENBQUMsVUFBVSxRQUFRO0FBQUEsRUFDbkUsbUJBQW1CLE1BQU07QUFBQSxFQUN6QixhQUFhLGdDQUNYLGVBQ0EsVUFBVSxjQUFjLGFBQWEsS0FBSyxDQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBLGdCQUFnQixjQUFjLGtCQUFrQixDQUFDLFFBQVE7QUFBQSxFQUN6RCxTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixPQUFPLHNCQUFVO0FBQ25CLElBaEJvQjtBQWtCcEIsSUFBTyx5Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxzQkFBc0IsNkJBQW1CO0FBQ3BELFNBQU8sb0NBQUM7QUFBQSxPQUEyQixZQUFZO0FBQUEsR0FBRztBQUNwRCxHQUZtQztBQUluQyxvQkFBb0IsUUFBUTtBQUFBLEVBQzFCLE1BQU07QUFDUjtBQUVPLE1BQU0sZ0JBQWdCLDZCQUFtQjtBQUM5QyxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsR0FDSDtBQUVKLEdBUjZCO0FBVTdCLGNBQWMsUUFBUTtBQUFBLEVBQ3BCLE1BQU07QUFDUjtBQUVPLE1BQU0sd0JBQXdCLDZCQUFtQjtBQUN0RCxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVRxQztBQVdyQyxzQkFBc0IsUUFBUTtBQUFBLEVBQzVCLE1BQU07QUFDUjtBQUVPLE1BQU0saURBQ1gsNkJBQW1CO0FBQ2pCLFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLGdCQUFnQixDQUFDLFVBQVUsVUFBVSxRQUFRO0FBQUEsTUFDN0MsZ0JBQWdCLENBQUMsVUFBVSxVQUFVLFFBQVE7QUFBQSxJQUMvQyxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBVEE7QUFXRiwrQ0FBK0MsUUFBUTtBQUFBLEVBQ3JELE1BQU07QUFDUjtBQUVPLE1BQU0sMEJBQTBCLDZCQUFtQjtBQUN4RCxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxnQkFBZ0IsQ0FBQztBQUFBLE1BQ2pCLGdCQUFnQixDQUFDO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVR1QztBQVd2Qyx3QkFBd0IsUUFBUTtBQUFBLEVBQzlCLE1BQU07QUFDUjtBQUVPLE1BQU0sa0NBQWtDLDZCQUFtQjtBQUNoRSxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxnQkFBZ0IsQ0FBQztBQUFBLElBQ25CLENBQUM7QUFBQSxHQUNIO0FBRUosR0FSK0M7QUFVL0MsZ0NBQWdDLFFBQVE7QUFBQSxFQUN0QyxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
