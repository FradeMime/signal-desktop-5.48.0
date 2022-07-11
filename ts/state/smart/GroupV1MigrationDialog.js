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
var GroupV1MigrationDialog_exports = {};
__export(GroupV1MigrationDialog_exports, {
  SmartGroupV1MigrationDialog: () => SmartGroupV1MigrationDialog
});
module.exports = __toCommonJS(GroupV1MigrationDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_GroupV1MigrationDialog = require("../../components/GroupV1MigrationDialog");
var import_badges = require("../selectors/badges");
var import_conversations = require("../selectors/conversations");
var import_user = require("../selectors/user");
var log = __toESM(require("../../logging/log"));
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const getConversation = (0, import_conversations.getConversationSelector)(state);
  const { droppedMemberIds, invitedMemberIds } = props;
  const droppedMembers = droppedMemberIds.map(getConversation).filter(Boolean);
  if (droppedMembers.length !== droppedMemberIds.length) {
    log.warn("smart/GroupV1MigrationDialog: droppedMembers length changed");
  }
  const invitedMembers = invitedMemberIds.map(getConversation).filter(Boolean);
  if (invitedMembers.length !== invitedMemberIds.length) {
    log.warn("smart/GroupV1MigrationDialog: invitedMembers length changed");
  }
  return {
    ...props,
    droppedMembers,
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    invitedMembers,
    i18n: (0, import_user.getIntl)(state),
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartGroupV1MigrationDialog = smart(import_GroupV1MigrationDialog.GroupV1MigrationDialog);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartGroupV1MigrationDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBHcm91cFYxTWlncmF0aW9uRGlhbG9nUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Hcm91cFYxTWlncmF0aW9uRGlhbG9nJztcbmltcG9ydCB7IEdyb3VwVjFNaWdyYXRpb25EaWFsb2cgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0dyb3VwVjFNaWdyYXRpb25EaWFsb2cnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5cbmltcG9ydCB7IGdldEludGwsIGdldFRoZW1lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICByZWFkb25seSBkcm9wcGVkTWVtYmVySWRzOiBBcnJheTxzdHJpbmc+O1xuICByZWFkb25seSBpbnZpdGVkTWVtYmVySWRzOiBBcnJheTxzdHJpbmc+O1xufSAmIE9taXQ8XG4gIEdyb3VwVjFNaWdyYXRpb25EaWFsb2dQcm9wc1R5cGUsXG4gICdpMThuJyB8ICdkcm9wcGVkTWVtYmVycycgfCAnaW52aXRlZE1lbWJlcnMnIHwgJ3RoZW1lJyB8ICdnZXRQcmVmZXJyZWRCYWRnZSdcbj47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgcHJvcHM6IFByb3BzVHlwZVxuKTogR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZ1Byb3BzVHlwZSA9PiB7XG4gIGNvbnN0IGdldENvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKTtcbiAgY29uc3QgeyBkcm9wcGVkTWVtYmVySWRzLCBpbnZpdGVkTWVtYmVySWRzIH0gPSBwcm9wcztcblxuICBjb25zdCBkcm9wcGVkTWVtYmVycyA9IGRyb3BwZWRNZW1iZXJJZHNcbiAgICAubWFwKGdldENvbnZlcnNhdGlvbilcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICBpZiAoZHJvcHBlZE1lbWJlcnMubGVuZ3RoICE9PSBkcm9wcGVkTWVtYmVySWRzLmxlbmd0aCkge1xuICAgIGxvZy53YXJuKCdzbWFydC9Hcm91cFYxTWlncmF0aW9uRGlhbG9nOiBkcm9wcGVkTWVtYmVycyBsZW5ndGggY2hhbmdlZCcpO1xuICB9XG5cbiAgY29uc3QgaW52aXRlZE1lbWJlcnMgPSBpbnZpdGVkTWVtYmVySWRzXG4gICAgLm1hcChnZXRDb252ZXJzYXRpb24pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgaWYgKGludml0ZWRNZW1iZXJzLmxlbmd0aCAhPT0gaW52aXRlZE1lbWJlcklkcy5sZW5ndGgpIHtcbiAgICBsb2cud2Fybignc21hcnQvR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZzogaW52aXRlZE1lbWJlcnMgbGVuZ3RoIGNoYW5nZWQnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgZHJvcHBlZE1lbWJlcnMsXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U6IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3Ioc3RhdGUpLFxuICAgIGludml0ZWRNZW1iZXJzLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRHcm91cFYxTWlncmF0aW9uRGlhbG9nID0gc21hcnQoR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUVuQyxvQ0FBdUM7QUFHdkMsb0JBQTBDO0FBQzFDLDJCQUF3QztBQUV4QyxrQkFBa0M7QUFDbEMsVUFBcUI7QUFVckIsTUFBTSxrQkFBa0Isd0JBQ3RCLE9BQ0EsVUFDb0M7QUFDcEMsUUFBTSxrQkFBa0Isa0RBQXdCLEtBQUs7QUFDckQsUUFBTSxFQUFFLGtCQUFrQixxQkFBcUI7QUFFL0MsUUFBTSxpQkFBaUIsaUJBQ3BCLElBQUksZUFBZSxFQUNuQixPQUFPLE9BQU87QUFDakIsTUFBSSxlQUFlLFdBQVcsaUJBQWlCLFFBQVE7QUFDckQsUUFBSSxLQUFLLDZEQUE2RDtBQUFBLEVBQ3hFO0FBRUEsUUFBTSxpQkFBaUIsaUJBQ3BCLElBQUksZUFBZSxFQUNuQixPQUFPLE9BQU87QUFDakIsTUFBSSxlQUFlLFdBQVcsaUJBQWlCLFFBQVE7QUFDckQsUUFBSSxLQUFLLDZEQUE2RDtBQUFBLEVBQ3hFO0FBRUEsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUNIO0FBQUEsSUFDQSxtQkFBbUIsNkNBQTBCLEtBQUs7QUFBQSxJQUNsRDtBQUFBLElBQ0EsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkIsT0FBTywwQkFBUyxLQUFLO0FBQUEsRUFDdkI7QUFDRixHQTdCd0I7QUErQnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sOEJBQThCLE1BQU0sb0RBQXNCOyIsCiAgIm5hbWVzIjogW10KfQo=
