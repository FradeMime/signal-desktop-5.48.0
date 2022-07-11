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
  GroupV1MigrationDialog: () => GroupV1MigrationDialog
});
module.exports = __toCommonJS(GroupV1MigrationDialog_exports);
var React = __toESM(require("react"));
var import_GroupDialog = require("./GroupDialog");
var import_sortByTitle = require("../util/sortByTitle");
const GroupV1MigrationDialog = React.memo((props) => {
  const {
    areWeInvited,
    droppedMembers,
    getPreferredBadge,
    hasMigrated,
    i18n,
    invitedMembers,
    migrate,
    onClose,
    theme
  } = props;
  const title = hasMigrated ? i18n("GroupV1--Migration--info--title") : i18n("GroupV1--Migration--migrate--title");
  const keepHistory = hasMigrated ? i18n("GroupV1--Migration--info--keep-history") : i18n("GroupV1--Migration--migrate--keep-history");
  const migrationKey = hasMigrated ? "after" : "before";
  const droppedMembersKey = `GroupV1--Migration--info--removed--${migrationKey}`;
  let primaryButtonText;
  let onClickPrimaryButton;
  let secondaryButtonProps;
  if (hasMigrated) {
    primaryButtonText = i18n("Confirmation--confirm");
    onClickPrimaryButton = onClose;
  } else {
    primaryButtonText = i18n("GroupV1--Migration--migrate");
    onClickPrimaryButton = migrate;
    secondaryButtonProps = {
      secondaryButtonText: i18n("cancel"),
      onClickSecondaryButton: onClose
    };
  }
  return /* @__PURE__ */ React.createElement(import_GroupDialog.GroupDialog, {
    i18n,
    onClickPrimaryButton,
    onClose,
    primaryButtonText,
    title,
    ...secondaryButtonProps
  }, /* @__PURE__ */ React.createElement(import_GroupDialog.GroupDialog.Paragraph, null, i18n("GroupV1--Migration--info--summary")), /* @__PURE__ */ React.createElement(import_GroupDialog.GroupDialog.Paragraph, null, keepHistory), areWeInvited ? /* @__PURE__ */ React.createElement(import_GroupDialog.GroupDialog.Paragraph, null, i18n("GroupV1--Migration--info--invited--you")) : /* @__PURE__ */ React.createElement(React.Fragment, null, renderMembers({
    getPreferredBadge,
    i18n,
    members: invitedMembers,
    prefix: "GroupV1--Migration--info--invited",
    theme
  }), renderMembers({
    getPreferredBadge,
    i18n,
    members: droppedMembers,
    prefix: droppedMembersKey,
    theme
  })));
});
function renderMembers({
  getPreferredBadge,
  i18n,
  members,
  prefix,
  theme
}) {
  if (!members.length) {
    return null;
  }
  const postfix = members.length === 1 ? "--one" : "--many";
  const key = `${prefix}${postfix}`;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_GroupDialog.GroupDialog.Paragraph, null, i18n(key)), /* @__PURE__ */ React.createElement(import_GroupDialog.GroupDialog.Contacts, {
    contacts: (0, import_sortByTitle.sortByTitle)(members),
    getPreferredBadge,
    i18n,
    theme
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV1MigrationDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBHcm91cERpYWxvZyB9IGZyb20gJy4vR3JvdXBEaWFsb2cnO1xuaW1wb3J0IHsgc29ydEJ5VGl0bGUgfSBmcm9tICcuLi91dGlsL3NvcnRCeVRpdGxlJztcblxudHlwZSBDYWxsYmFja1R5cGUgPSAoKSA9PiB1bmtub3duO1xuXG5leHBvcnQgdHlwZSBEYXRhUHJvcHNUeXBlID0ge1xuICByZWFkb25seSBhcmVXZUludml0ZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGRyb3BwZWRNZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgcmVhZG9ubHkgaGFzTWlncmF0ZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGludml0ZWRNZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgcmVhZG9ubHkgbWlncmF0ZTogQ2FsbGJhY2tUeXBlO1xuICByZWFkb25seSBvbkNsb3NlOiBDYWxsYmFja1R5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBIb3VzZWtlZXBpbmdQcm9wc1R5cGUgPSB7XG4gIHJlYWRvbmx5IGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcmVhZG9ubHkgdGhlbWU6IFRoZW1lVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IERhdGFQcm9wc1R5cGUgJiBIb3VzZWtlZXBpbmdQcm9wc1R5cGU7XG5cbmV4cG9ydCBjb25zdCBHcm91cFYxTWlncmF0aW9uRGlhbG9nOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID1cbiAgUmVhY3QubWVtbygocHJvcHM6IFByb3BzVHlwZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFyZVdlSW52aXRlZCxcbiAgICAgIGRyb3BwZWRNZW1iZXJzLFxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICBoYXNNaWdyYXRlZCxcbiAgICAgIGkxOG4sXG4gICAgICBpbnZpdGVkTWVtYmVycyxcbiAgICAgIG1pZ3JhdGUsXG4gICAgICBvbkNsb3NlLFxuICAgICAgdGhlbWUsXG4gICAgfSA9IHByb3BzO1xuXG4gICAgY29uc3QgdGl0bGUgPSBoYXNNaWdyYXRlZFxuICAgICAgPyBpMThuKCdHcm91cFYxLS1NaWdyYXRpb24tLWluZm8tLXRpdGxlJylcbiAgICAgIDogaTE4bignR3JvdXBWMS0tTWlncmF0aW9uLS1taWdyYXRlLS10aXRsZScpO1xuICAgIGNvbnN0IGtlZXBIaXN0b3J5ID0gaGFzTWlncmF0ZWRcbiAgICAgID8gaTE4bignR3JvdXBWMS0tTWlncmF0aW9uLS1pbmZvLS1rZWVwLWhpc3RvcnknKVxuICAgICAgOiBpMThuKCdHcm91cFYxLS1NaWdyYXRpb24tLW1pZ3JhdGUtLWtlZXAtaGlzdG9yeScpO1xuICAgIGNvbnN0IG1pZ3JhdGlvbktleSA9IGhhc01pZ3JhdGVkID8gJ2FmdGVyJyA6ICdiZWZvcmUnO1xuICAgIGNvbnN0IGRyb3BwZWRNZW1iZXJzS2V5ID0gYEdyb3VwVjEtLU1pZ3JhdGlvbi0taW5mby0tcmVtb3ZlZC0tJHttaWdyYXRpb25LZXl9YDtcblxuICAgIGxldCBwcmltYXJ5QnV0dG9uVGV4dDogc3RyaW5nO1xuICAgIGxldCBvbkNsaWNrUHJpbWFyeUJ1dHRvbjogKCkgPT4gdm9pZDtcbiAgICBsZXQgc2Vjb25kYXJ5QnV0dG9uUHJvcHM6XG4gICAgICB8IHVuZGVmaW5lZFxuICAgICAgfCB7XG4gICAgICAgICAgc2Vjb25kYXJ5QnV0dG9uVGV4dDogc3RyaW5nO1xuICAgICAgICAgIG9uQ2xpY2tTZWNvbmRhcnlCdXR0b246ICgpID0+IHZvaWQ7XG4gICAgICAgIH07XG4gICAgaWYgKGhhc01pZ3JhdGVkKSB7XG4gICAgICBwcmltYXJ5QnV0dG9uVGV4dCA9IGkxOG4oJ0NvbmZpcm1hdGlvbi0tY29uZmlybScpO1xuICAgICAgb25DbGlja1ByaW1hcnlCdXR0b24gPSBvbkNsb3NlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmltYXJ5QnV0dG9uVGV4dCA9IGkxOG4oJ0dyb3VwVjEtLU1pZ3JhdGlvbi0tbWlncmF0ZScpO1xuICAgICAgb25DbGlja1ByaW1hcnlCdXR0b24gPSBtaWdyYXRlO1xuICAgICAgc2Vjb25kYXJ5QnV0dG9uUHJvcHMgPSB7XG4gICAgICAgIHNlY29uZGFyeUJ1dHRvblRleHQ6IGkxOG4oJ2NhbmNlbCcpLFxuICAgICAgICBvbkNsaWNrU2Vjb25kYXJ5QnV0dG9uOiBvbkNsb3NlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEdyb3VwRGlhbG9nXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2xpY2tQcmltYXJ5QnV0dG9uPXtvbkNsaWNrUHJpbWFyeUJ1dHRvbn1cbiAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgcHJpbWFyeUJ1dHRvblRleHQ9e3ByaW1hcnlCdXR0b25UZXh0fVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIHsuLi5zZWNvbmRhcnlCdXR0b25Qcm9wc31cbiAgICAgID5cbiAgICAgICAgPEdyb3VwRGlhbG9nLlBhcmFncmFwaD5cbiAgICAgICAgICB7aTE4bignR3JvdXBWMS0tTWlncmF0aW9uLS1pbmZvLS1zdW1tYXJ5Jyl9XG4gICAgICAgIDwvR3JvdXBEaWFsb2cuUGFyYWdyYXBoPlxuICAgICAgICA8R3JvdXBEaWFsb2cuUGFyYWdyYXBoPntrZWVwSGlzdG9yeX08L0dyb3VwRGlhbG9nLlBhcmFncmFwaD5cbiAgICAgICAge2FyZVdlSW52aXRlZCA/IChcbiAgICAgICAgICA8R3JvdXBEaWFsb2cuUGFyYWdyYXBoPlxuICAgICAgICAgICAge2kxOG4oJ0dyb3VwVjEtLU1pZ3JhdGlvbi0taW5mby0taW52aXRlZC0teW91Jyl9XG4gICAgICAgICAgPC9Hcm91cERpYWxvZy5QYXJhZ3JhcGg+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtyZW5kZXJNZW1iZXJzKHtcbiAgICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgICAgIG1lbWJlcnM6IGludml0ZWRNZW1iZXJzLFxuICAgICAgICAgICAgICBwcmVmaXg6ICdHcm91cFYxLS1NaWdyYXRpb24tLWluZm8tLWludml0ZWQnLFxuICAgICAgICAgICAgICB0aGVtZSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAge3JlbmRlck1lbWJlcnMoe1xuICAgICAgICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgICAgICAgICAgICAgaTE4bixcbiAgICAgICAgICAgICAgbWVtYmVyczogZHJvcHBlZE1lbWJlcnMsXG4gICAgICAgICAgICAgIHByZWZpeDogZHJvcHBlZE1lbWJlcnNLZXksXG4gICAgICAgICAgICAgIHRoZW1lLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L0dyb3VwRGlhbG9nPlxuICAgICk7XG4gIH0pO1xuXG5mdW5jdGlvbiByZW5kZXJNZW1iZXJzKHtcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIG1lbWJlcnMsXG4gIHByZWZpeCxcbiAgdGhlbWUsXG59OiBSZWFkb25seTx7XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgbWVtYmVyczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIHByZWZpeDogc3RyaW5nO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufT4pOiBSZWFjdC5SZWFjdE5vZGUge1xuICBpZiAoIW1lbWJlcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwb3N0Zml4ID0gbWVtYmVycy5sZW5ndGggPT09IDEgPyAnLS1vbmUnIDogJy0tbWFueSc7XG4gIGNvbnN0IGtleSA9IGAke3ByZWZpeH0ke3Bvc3RmaXh9YDtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8R3JvdXBEaWFsb2cuUGFyYWdyYXBoPntpMThuKGtleSl9PC9Hcm91cERpYWxvZy5QYXJhZ3JhcGg+XG4gICAgICA8R3JvdXBEaWFsb2cuQ29udGFjdHNcbiAgICAgICAgY29udGFjdHM9e3NvcnRCeVRpdGxlKG1lbWJlcnMpfVxuICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2V9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgIC8+XG4gICAgPC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFJdkIseUJBQTRCO0FBQzVCLHlCQUE0QjtBQXFCckIsTUFBTSx5QkFDWCxNQUFNLEtBQUssQ0FBQyxVQUFxQjtBQUMvQixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU0sUUFBUSxjQUNWLEtBQUssaUNBQWlDLElBQ3RDLEtBQUssb0NBQW9DO0FBQzdDLFFBQU0sY0FBYyxjQUNoQixLQUFLLHdDQUF3QyxJQUM3QyxLQUFLLDJDQUEyQztBQUNwRCxRQUFNLGVBQWUsY0FBYyxVQUFVO0FBQzdDLFFBQU0sb0JBQW9CLHNDQUFzQztBQUVoRSxNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFNSixNQUFJLGFBQWE7QUFDZix3QkFBb0IsS0FBSyx1QkFBdUI7QUFDaEQsMkJBQXVCO0FBQUEsRUFDekIsT0FBTztBQUNMLHdCQUFvQixLQUFLLDZCQUE2QjtBQUN0RCwyQkFBdUI7QUFDdkIsMkJBQXVCO0FBQUEsTUFDckIscUJBQXFCLEtBQUssUUFBUTtBQUFBLE1BQ2xDLHdCQUF3QjtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUVBLFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE9BQ0k7QUFBQSxLQUVKLG9DQUFDLCtCQUFZLFdBQVosTUFDRSxLQUFLLG1DQUFtQyxDQUMzQyxHQUNBLG9DQUFDLCtCQUFZLFdBQVosTUFBdUIsV0FBWSxHQUNuQyxlQUNDLG9DQUFDLCtCQUFZLFdBQVosTUFDRSxLQUFLLHdDQUF3QyxDQUNoRCxJQUVBLDBEQUNHLGNBQWM7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1I7QUFBQSxFQUNGLENBQUMsR0FDQSxjQUFjO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDLENBQ0gsQ0FFSjtBQUVKLENBQUM7QUFFSCx1QkFBdUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQU9tQjtBQUNuQixNQUFJLENBQUMsUUFBUSxRQUFRO0FBQ25CLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxVQUFVLFFBQVEsV0FBVyxJQUFJLFVBQVU7QUFDakQsUUFBTSxNQUFNLEdBQUcsU0FBUztBQUV4QixTQUNFLDBEQUNFLG9DQUFDLCtCQUFZLFdBQVosTUFBdUIsS0FBSyxHQUFHLENBQUUsR0FDbEMsb0NBQUMsK0JBQVksVUFBWjtBQUFBLElBQ0MsVUFBVSxvQ0FBWSxPQUFPO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEdBQ0YsQ0FDRjtBQUVKO0FBL0JTIiwKICAibmFtZXMiOiBbXQp9Cg==
