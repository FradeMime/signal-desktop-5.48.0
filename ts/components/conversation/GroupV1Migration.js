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
var GroupV1Migration_exports = {};
__export(GroupV1Migration_exports, {
  GroupV1Migration: () => GroupV1Migration
});
module.exports = __toCommonJS(GroupV1Migration_exports);
var React = __toESM(require("react"));
var import_Button = require("../Button");
var import_SystemMessage = require("./SystemMessage");
var import_Intl = require("../Intl");
var import_ContactName = require("./ContactName");
var import_GroupV1MigrationDialog = require("../GroupV1MigrationDialog");
var log = __toESM(require("../../logging/log"));
function GroupV1Migration(props) {
  const {
    areWeInvited,
    droppedMembers,
    getPreferredBadge,
    i18n,
    invitedMembers,
    theme
  } = props;
  const [showingDialog, setShowingDialog] = React.useState(false);
  const showDialog = React.useCallback(() => {
    setShowingDialog(true);
  }, [setShowingDialog]);
  const dismissDialog = React.useCallback(() => {
    setShowingDialog(false);
  }, [setShowingDialog]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_SystemMessage.SystemMessage, {
    icon: "group",
    contents: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, i18n("GroupV1--Migration--was-upgraded")), /* @__PURE__ */ React.createElement("p", null, areWeInvited ? i18n("GroupV1--Migration--invited--you") : /* @__PURE__ */ React.createElement(React.Fragment, null, renderUsers(invitedMembers, i18n, "GroupV1--Migration--invited"), renderUsers(droppedMembers, i18n, "GroupV1--Migration--removed")))),
    button: /* @__PURE__ */ React.createElement(import_Button.Button, {
      onClick: showDialog,
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("GroupV1--Migration--learn-more"))
  }), showingDialog ? /* @__PURE__ */ React.createElement(import_GroupV1MigrationDialog.GroupV1MigrationDialog, {
    areWeInvited,
    droppedMembers,
    getPreferredBadge,
    hasMigrated: true,
    i18n,
    invitedMembers,
    migrate: () => log.warn("GroupV1Migration: Modal called migrate()"),
    onClose: dismissDialog,
    theme
  }) : null);
}
function renderUsers(members, i18n, keyPrefix) {
  if (!members || members.length === 0) {
    return null;
  }
  if (members.length === 1) {
    return /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(import_Intl.Intl, {
      i18n,
      id: `${keyPrefix}--one`,
      components: [/* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
        title: members[0].title
      })]
    }));
  }
  return /* @__PURE__ */ React.createElement("p", null, i18n(`${keyPrefix}--many`, [members.length.toString()]));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV1Migration
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMU1pZ3JhdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uU2l6ZSwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uL0J1dHRvbic7XG5pbXBvcnQgeyBTeXN0ZW1NZXNzYWdlIH0gZnJvbSAnLi9TeXN0ZW1NZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi9JbnRsJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBHcm91cFYxTWlncmF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGFUeXBlID0ge1xuICBhcmVXZUludml0ZWQ6IGJvb2xlYW47XG4gIGRyb3BwZWRNZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgaW52aXRlZE1lbWJlcnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNIb3VzZWtlZXBpbmdUeXBlID0ge1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBQcm9wc0RhdGFUeXBlICYgUHJvcHNIb3VzZWtlZXBpbmdUeXBlO1xuXG5leHBvcnQgZnVuY3Rpb24gR3JvdXBWMU1pZ3JhdGlvbihwcm9wczogUHJvcHNUeXBlKTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgY29uc3Qge1xuICAgIGFyZVdlSW52aXRlZCxcbiAgICBkcm9wcGVkTWVtYmVycyxcbiAgICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgICBpMThuLFxuICAgIGludml0ZWRNZW1iZXJzLFxuICAgIHRoZW1lLFxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtzaG93aW5nRGlhbG9nLCBzZXRTaG93aW5nRGlhbG9nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBzaG93RGlhbG9nID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dpbmdEaWFsb2codHJ1ZSk7XG4gIH0sIFtzZXRTaG93aW5nRGlhbG9nXSk7XG5cbiAgY29uc3QgZGlzbWlzc0RpYWxvZyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93aW5nRGlhbG9nKGZhbHNlKTtcbiAgfSwgW3NldFNob3dpbmdEaWFsb2ddKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8U3lzdGVtTWVzc2FnZVxuICAgICAgICBpY29uPVwiZ3JvdXBcIlxuICAgICAgICBjb250ZW50cz17XG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxwPntpMThuKCdHcm91cFYxLS1NaWdyYXRpb24tLXdhcy11cGdyYWRlZCcpfTwvcD5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICB7YXJlV2VJbnZpdGVkID8gKFxuICAgICAgICAgICAgICAgIGkxOG4oJ0dyb3VwVjEtLU1pZ3JhdGlvbi0taW52aXRlZC0teW91JylcbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAge3JlbmRlclVzZXJzKFxuICAgICAgICAgICAgICAgICAgICBpbnZpdGVkTWVtYmVycyxcbiAgICAgICAgICAgICAgICAgICAgaTE4bixcbiAgICAgICAgICAgICAgICAgICAgJ0dyb3VwVjEtLU1pZ3JhdGlvbi0taW52aXRlZCdcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7cmVuZGVyVXNlcnMoXG4gICAgICAgICAgICAgICAgICAgIGRyb3BwZWRNZW1iZXJzLFxuICAgICAgICAgICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgICAgICAgICAnR3JvdXBWMS0tTWlncmF0aW9uLS1yZW1vdmVkJ1xuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgfVxuICAgICAgICBidXR0b249e1xuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3Nob3dEaWFsb2d9XG4gICAgICAgICAgICBzaXplPXtCdXR0b25TaXplLlNtYWxsfVxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TeXN0ZW1NZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdHcm91cFYxLS1NaWdyYXRpb24tLWxlYXJuLW1vcmUnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgLz5cbiAgICAgIHtzaG93aW5nRGlhbG9nID8gKFxuICAgICAgICA8R3JvdXBWMU1pZ3JhdGlvbkRpYWxvZ1xuICAgICAgICAgIGFyZVdlSW52aXRlZD17YXJlV2VJbnZpdGVkfVxuICAgICAgICAgIGRyb3BwZWRNZW1iZXJzPXtkcm9wcGVkTWVtYmVyc31cbiAgICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2V9XG4gICAgICAgICAgaGFzTWlncmF0ZWRcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGludml0ZWRNZW1iZXJzPXtpbnZpdGVkTWVtYmVyc31cbiAgICAgICAgICBtaWdyYXRlPXsoKSA9PiBsb2cud2FybignR3JvdXBWMU1pZ3JhdGlvbjogTW9kYWwgY2FsbGVkIG1pZ3JhdGUoKScpfVxuICAgICAgICAgIG9uQ2xvc2U9e2Rpc21pc3NEaWFsb2d9XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclVzZXJzKFxuICBtZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPixcbiAgaTE4bjogTG9jYWxpemVyVHlwZSxcbiAga2V5UHJlZml4OiBzdHJpbmdcbik6IFJlYWN0LlJlYWN0RWxlbWVudCB8IG51bGwge1xuICBpZiAoIW1lbWJlcnMgfHwgbWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChtZW1iZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiAoXG4gICAgICA8cD5cbiAgICAgICAgPEludGxcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlkPXtgJHtrZXlQcmVmaXh9LS1vbmVgfVxuICAgICAgICAgIGNvbXBvbmVudHM9e1s8Q29udGFjdE5hbWUgdGl0bGU9e21lbWJlcnNbMF0udGl0bGV9IC8+XX1cbiAgICAgICAgLz5cbiAgICAgIDwvcD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIDxwPntpMThuKGAke2tleVByZWZpeH0tLW1hbnlgLCBbbWVtYmVycy5sZW5ndGgudG9TdHJpbmcoKV0pfTwvcD47XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsb0JBQWtEO0FBQ2xELDJCQUE4QjtBQUk5QixrQkFBcUI7QUFDckIseUJBQTRCO0FBQzVCLG9DQUF1QztBQUN2QyxVQUFxQjtBQWdCZCwwQkFBMEIsT0FBc0M7QUFDckUsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFDSixRQUFNLENBQUMsZUFBZSxvQkFBb0IsTUFBTSxTQUFTLEtBQUs7QUFFOUQsUUFBTSxhQUFhLE1BQU0sWUFBWSxNQUFNO0FBQ3pDLHFCQUFpQixJQUFJO0FBQUEsRUFDdkIsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLFFBQU0sZ0JBQWdCLE1BQU0sWUFBWSxNQUFNO0FBQzVDLHFCQUFpQixLQUFLO0FBQUEsRUFDeEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLFNBQ0UsMERBQ0Usb0NBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFVBQ0UsMERBQ0Usb0NBQUMsV0FBRyxLQUFLLGtDQUFrQyxDQUFFLEdBQzdDLG9DQUFDLFdBQ0UsZUFDQyxLQUFLLGtDQUFrQyxJQUV2QywwREFDRyxZQUNDLGdCQUNBLE1BQ0EsNkJBQ0YsR0FDQyxZQUNDLGdCQUNBLE1BQ0EsNkJBQ0YsQ0FDRixDQUVKLENBQ0Y7QUFBQSxJQUVGLFFBQ0Usb0NBQUM7QUFBQSxNQUNDLFNBQVM7QUFBQSxNQUNULE1BQU0seUJBQVc7QUFBQSxNQUNqQixTQUFTLDRCQUFjO0FBQUEsT0FFdEIsS0FBSyxnQ0FBZ0MsQ0FDeEM7QUFBQSxHQUVKLEdBQ0MsZ0JBQ0Msb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxNQUFNLElBQUksS0FBSywwQ0FBMEM7QUFBQSxJQUNsRSxTQUFTO0FBQUEsSUFDVDtBQUFBLEdBQ0YsSUFDRSxJQUNOO0FBRUo7QUF2RWdCLEFBeUVoQixxQkFDRSxTQUNBLE1BQ0EsV0FDMkI7QUFDM0IsTUFBSSxDQUFDLFdBQVcsUUFBUSxXQUFXLEdBQUc7QUFDcEMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLFFBQVEsV0FBVyxHQUFHO0FBQ3hCLFdBQ0Usb0NBQUMsV0FDQyxvQ0FBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLElBQUksR0FBRztBQUFBLE1BQ1AsWUFBWSxDQUFDLG9DQUFDO0FBQUEsUUFBWSxPQUFPLFFBQVEsR0FBRztBQUFBLE9BQU8sQ0FBRTtBQUFBLEtBQ3ZELENBQ0Y7QUFBQSxFQUVKO0FBRUEsU0FBTyxvQ0FBQyxXQUFHLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBRTtBQUNyRTtBQXRCUyIsCiAgIm5hbWVzIjogW10KfQo=
