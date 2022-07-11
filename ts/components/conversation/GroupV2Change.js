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
var GroupV2Change_exports = {};
__export(GroupV2Change_exports, {
  GroupV2Change: () => GroupV2Change
});
module.exports = __toCommonJS(GroupV2Change_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var log = __toESM(require("../../logging/log"));
var import_Intl = require("../Intl");
var import_GroupDescriptionText = require("../GroupDescriptionText");
var import_Button = require("../Button");
var import_SystemMessage = require("./SystemMessage");
var import_groupChange = require("../../groupChange");
var import_Modal = require("../Modal");
var import_ConfirmationDialog = require("../ConfirmationDialog");
function renderStringToIntl(id, i18n, components) {
  return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    id,
    i18n,
    components
  });
}
var ModalState = /* @__PURE__ */ ((ModalState2) => {
  ModalState2["None"] = "None";
  ModalState2["ViewingGroupDescription"] = "ViewingGroupDescription";
  ModalState2["ConfirmingblockGroupLinkRequests"] = "ConfirmingblockGroupLinkRequests";
  return ModalState2;
})(ModalState || {});
const changeToIconMap = /* @__PURE__ */ new Map([
  ["access-attributes", "group-access"],
  ["access-invite-link", "group-access"],
  ["access-members", "group-access"],
  ["admin-approval-add-one", "group-add"],
  ["admin-approval-remove-one", "group-decline"],
  ["admin-approval-bounce", "group-decline"],
  ["announcements-only", "group-access"],
  ["avatar", "group-avatar"],
  ["description", "group-edit"],
  ["group-link-add", "group-access"],
  ["group-link-remove", "group-access"],
  ["group-link-reset", "group-access"],
  ["member-add", "group-add"],
  ["member-add-from-admin-approval", "group-approved"],
  ["member-add-from-invite", "group-add"],
  ["member-add-from-link", "group-add"],
  ["member-privilege", "group-access"],
  ["member-remove", "group-remove"],
  ["pending-add-many", "group-add"],
  ["pending-add-one", "group-add"],
  ["pending-remove-many", "group-decline"],
  ["pending-remove-one", "group-decline"],
  ["title", "group-edit"]
]);
function getIcon(detail, isLastText = true, fromId) {
  const changeType = detail.type;
  let possibleIcon = changeToIconMap.get(changeType);
  const isSameId = fromId === (0, import_lodash.get)(detail, "uuid", null);
  if (isSameId) {
    if (changeType === "member-remove") {
      possibleIcon = "group-leave";
    }
    if (changeType === "member-add-from-invite") {
      possibleIcon = "group-approved";
    }
  }
  if (changeType === "admin-approval-bounce" && isLastText) {
    possibleIcon = void 0;
  }
  return possibleIcon || "group";
}
function GroupV2Detail({
  areWeAdmin,
  blockGroupLinkRequests,
  detail,
  isLastText,
  fromId,
  groupMemberships,
  groupBannedMemberships,
  groupName,
  i18n,
  ourUuid,
  renderContact,
  text
}) {
  const icon = getIcon(detail, isLastText, fromId);
  let buttonNode;
  const [modalState, setModalState] = (0, import_react.useState)("None" /* None */);
  let modalNode;
  switch (modalState) {
    case "None" /* None */:
      modalNode = void 0;
      break;
    case "ViewingGroupDescription" /* ViewingGroupDescription */:
      if (detail.type !== "description" || !detail.description) {
        log.warn("GroupV2Detail: ViewingGroupDescription but missing description or wrong change type");
        modalNode = void 0;
        break;
      }
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
        hasXButton: true,
        i18n,
        title: groupName,
        onClose: () => setModalState("None" /* None */)
      }, /* @__PURE__ */ import_react.default.createElement(import_GroupDescriptionText.GroupDescriptionText, {
        text: detail.description
      }));
      break;
    case "ConfirmingblockGroupLinkRequests" /* ConfirmingblockGroupLinkRequests */:
      if (!isLastText || detail.type !== "admin-approval-bounce" || !detail.uuid) {
        log.warn("GroupV2Detail: ConfirmingblockGroupLinkRequests but missing uuid or wrong change type");
        modalNode = void 0;
        break;
      }
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
        title: i18n("PendingRequests--block--title"),
        actions: [
          {
            action: () => blockGroupLinkRequests(detail.uuid),
            text: i18n("PendingRequests--block--confirm"),
            style: "affirmative"
          }
        ],
        i18n,
        onClose: () => setModalState("None" /* None */)
      }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        id: "PendingRequests--block--contents",
        i18n,
        components: {
          name: renderContact(detail.uuid)
        }
      }));
      break;
    default: {
      const state = modalState;
      log.warn(`GroupV2Detail: unexpected modal state ${state}`);
      modalNode = void 0;
      break;
    }
  }
  if (detail.type === "description" && detail.description) {
    buttonNode = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: () => setModalState("ViewingGroupDescription" /* ViewingGroupDescription */),
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("view"));
  } else if (isLastText && detail.type === "admin-approval-bounce" && areWeAdmin && detail.uuid && detail.uuid !== ourUuid && (!fromId || fromId === detail.uuid) && !groupMemberships?.some((item) => item.uuid === detail.uuid) && !groupBannedMemberships?.some((uuid) => uuid === detail.uuid)) {
    buttonNode = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: () => setModalState("ConfirmingblockGroupLinkRequests" /* ConfirmingblockGroupLinkRequests */),
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("PendingRequests--block--button"));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    icon,
    contents: text,
    button: buttonNode
  }), modalNode);
}
function GroupV2Change(props) {
  const {
    areWeAdmin,
    blockGroupLinkRequests,
    change,
    groupBannedMemberships,
    groupMemberships,
    groupName,
    i18n,
    ourUuid,
    renderContact
  } = props;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, (0, import_groupChange.renderChange)(change, {
    i18n,
    ourUuid,
    renderContact,
    renderString: renderStringToIntl
  }).map(({ detail, isLastText, text }, index) => {
    return /* @__PURE__ */ import_react.default.createElement(GroupV2Detail, {
      areWeAdmin,
      blockGroupLinkRequests,
      detail,
      isLastText,
      fromId: change.from,
      groupBannedMemberships,
      groupMemberships,
      groupName,
      i18n,
      key: index,
      ourUuid,
      renderContact,
      text
    });
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV2Change
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMkNoYW5nZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgUmVwbGFjZW1lbnRWYWx1ZXNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvSTE4Tic7XG5pbXBvcnQgdHlwZSB7IEZ1bGxKU1hUeXBlIH0gZnJvbSAnLi4vSW50bCc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi4vSW50bCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IEdyb3VwRGVzY3JpcHRpb25UZXh0IH0gZnJvbSAnLi4vR3JvdXBEZXNjcmlwdGlvblRleHQnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25TaXplLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi4vQnV0dG9uJztcbmltcG9ydCB7IFN5c3RlbU1lc3NhZ2UgfSBmcm9tICcuL1N5c3RlbU1lc3NhZ2UnO1xuXG5pbXBvcnQgdHlwZSB7IEdyb3VwVjJDaGFuZ2VUeXBlLCBHcm91cFYyQ2hhbmdlRGV0YWlsVHlwZSB9IGZyb20gJy4uLy4uL2dyb3Vwcyc7XG5cbmltcG9ydCB0eXBlIHsgU21hcnRDb250YWN0UmVuZGVyZXJUeXBlIH0gZnJvbSAnLi4vLi4vZ3JvdXBDaGFuZ2UnO1xuaW1wb3J0IHsgcmVuZGVyQ2hhbmdlIH0gZnJvbSAnLi4vLi4vZ3JvdXBDaGFuZ2UnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuLi9Nb2RhbCc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuLi9Db25maXJtYXRpb25EaWFsb2cnO1xuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGFUeXBlID0ge1xuICBhcmVXZUFkbWluOiBib29sZWFuO1xuICBncm91cE1lbWJlcnNoaXBzPzogQXJyYXk8e1xuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICAgIGlzQWRtaW46IGJvb2xlYW47XG4gIH0+O1xuICBncm91cEJhbm5lZE1lbWJlcnNoaXBzPzogQXJyYXk8VVVJRFN0cmluZ1R5cGU+O1xuICBncm91cE5hbWU/OiBzdHJpbmc7XG4gIG91clV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgY2hhbmdlOiBHcm91cFYyQ2hhbmdlVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzQWN0aW9uc1R5cGUgPSB7XG4gIGJsb2NrR3JvdXBMaW5rUmVxdWVzdHM6ICh1dWlkOiBVVUlEU3RyaW5nVHlwZSkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzSG91c2VrZWVwaW5nVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcmVuZGVyQ29udGFjdDogU21hcnRDb250YWN0UmVuZGVyZXJUeXBlPEZ1bGxKU1hUeXBlPjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFByb3BzRGF0YVR5cGUgJlxuICBQcm9wc0FjdGlvbnNUeXBlICZcbiAgUHJvcHNIb3VzZWtlZXBpbmdUeXBlO1xuXG5mdW5jdGlvbiByZW5kZXJTdHJpbmdUb0ludGwoXG4gIGlkOiBzdHJpbmcsXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIGNvbXBvbmVudHM/OiBBcnJheTxGdWxsSlNYVHlwZT4gfCBSZXBsYWNlbWVudFZhbHVlc1R5cGU8RnVsbEpTWFR5cGU+XG4pOiBGdWxsSlNYVHlwZSB7XG4gIHJldHVybiA8SW50bCBpZD17aWR9IGkxOG49e2kxOG59IGNvbXBvbmVudHM9e2NvbXBvbmVudHN9IC8+O1xufVxuXG5lbnVtIE1vZGFsU3RhdGUge1xuICBOb25lID0gJ05vbmUnLFxuICBWaWV3aW5nR3JvdXBEZXNjcmlwdGlvbiA9ICdWaWV3aW5nR3JvdXBEZXNjcmlwdGlvbicsXG4gIENvbmZpcm1pbmdibG9ja0dyb3VwTGlua1JlcXVlc3RzID0gJ0NvbmZpcm1pbmdibG9ja0dyb3VwTGlua1JlcXVlc3RzJyxcbn1cblxudHlwZSBHcm91cEljb25UeXBlID1cbiAgfCAnZ3JvdXAnXG4gIHwgJ2dyb3VwLWFjY2VzcydcbiAgfCAnZ3JvdXAtYWRkJ1xuICB8ICdncm91cC1hcHByb3ZlZCdcbiAgfCAnZ3JvdXAtYXZhdGFyJ1xuICB8ICdncm91cC1kZWNsaW5lJ1xuICB8ICdncm91cC1lZGl0J1xuICB8ICdncm91cC1sZWF2ZSdcbiAgfCAnZ3JvdXAtcmVtb3ZlJztcblxuY29uc3QgY2hhbmdlVG9JY29uTWFwID0gbmV3IE1hcDxzdHJpbmcsIEdyb3VwSWNvblR5cGU+KFtcbiAgWydhY2Nlc3MtYXR0cmlidXRlcycsICdncm91cC1hY2Nlc3MnXSxcbiAgWydhY2Nlc3MtaW52aXRlLWxpbmsnLCAnZ3JvdXAtYWNjZXNzJ10sXG4gIFsnYWNjZXNzLW1lbWJlcnMnLCAnZ3JvdXAtYWNjZXNzJ10sXG4gIFsnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScsICdncm91cC1hZGQnXSxcbiAgWydhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJywgJ2dyb3VwLWRlY2xpbmUnXSxcbiAgWydhZG1pbi1hcHByb3ZhbC1ib3VuY2UnLCAnZ3JvdXAtZGVjbGluZSddLFxuICBbJ2Fubm91bmNlbWVudHMtb25seScsICdncm91cC1hY2Nlc3MnXSxcbiAgWydhdmF0YXInLCAnZ3JvdXAtYXZhdGFyJ10sXG4gIFsnZGVzY3JpcHRpb24nLCAnZ3JvdXAtZWRpdCddLFxuICBbJ2dyb3VwLWxpbmstYWRkJywgJ2dyb3VwLWFjY2VzcyddLFxuICBbJ2dyb3VwLWxpbmstcmVtb3ZlJywgJ2dyb3VwLWFjY2VzcyddLFxuICBbJ2dyb3VwLWxpbmstcmVzZXQnLCAnZ3JvdXAtYWNjZXNzJ10sXG4gIFsnbWVtYmVyLWFkZCcsICdncm91cC1hZGQnXSxcbiAgWydtZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwnLCAnZ3JvdXAtYXBwcm92ZWQnXSxcbiAgWydtZW1iZXItYWRkLWZyb20taW52aXRlJywgJ2dyb3VwLWFkZCddLFxuICBbJ21lbWJlci1hZGQtZnJvbS1saW5rJywgJ2dyb3VwLWFkZCddLFxuICBbJ21lbWJlci1wcml2aWxlZ2UnLCAnZ3JvdXAtYWNjZXNzJ10sXG4gIFsnbWVtYmVyLXJlbW92ZScsICdncm91cC1yZW1vdmUnXSxcbiAgWydwZW5kaW5nLWFkZC1tYW55JywgJ2dyb3VwLWFkZCddLFxuICBbJ3BlbmRpbmctYWRkLW9uZScsICdncm91cC1hZGQnXSxcbiAgWydwZW5kaW5nLXJlbW92ZS1tYW55JywgJ2dyb3VwLWRlY2xpbmUnXSxcbiAgWydwZW5kaW5nLXJlbW92ZS1vbmUnLCAnZ3JvdXAtZGVjbGluZSddLFxuICBbJ3RpdGxlJywgJ2dyb3VwLWVkaXQnXSxcbl0pO1xuXG5mdW5jdGlvbiBnZXRJY29uKFxuICBkZXRhaWw6IEdyb3VwVjJDaGFuZ2VEZXRhaWxUeXBlLFxuICBpc0xhc3RUZXh0ID0gdHJ1ZSxcbiAgZnJvbUlkPzogVVVJRFN0cmluZ1R5cGVcbik6IEdyb3VwSWNvblR5cGUge1xuICBjb25zdCBjaGFuZ2VUeXBlID0gZGV0YWlsLnR5cGU7XG4gIGxldCBwb3NzaWJsZUljb24gPSBjaGFuZ2VUb0ljb25NYXAuZ2V0KGNoYW5nZVR5cGUpO1xuICBjb25zdCBpc1NhbWVJZCA9IGZyb21JZCA9PT0gZ2V0KGRldGFpbCwgJ3V1aWQnLCBudWxsKTtcbiAgaWYgKGlzU2FtZUlkKSB7XG4gICAgaWYgKGNoYW5nZVR5cGUgPT09ICdtZW1iZXItcmVtb3ZlJykge1xuICAgICAgcG9zc2libGVJY29uID0gJ2dyb3VwLWxlYXZlJztcbiAgICB9XG4gICAgaWYgKGNoYW5nZVR5cGUgPT09ICdtZW1iZXItYWRkLWZyb20taW52aXRlJykge1xuICAgICAgcG9zc2libGVJY29uID0gJ2dyb3VwLWFwcHJvdmVkJztcbiAgICB9XG4gIH1cbiAgLy8gVXNlIGRlZmF1bHQgaWNvbiBmb3IgXCIuLi4gcmVxdWVzdGVkIHRvIGpvaW4gdmlhIGdyb3VwIGxpbmtcIiBhZGRlZCB0b1xuICAvLyBib3VuY2Ugbm90aWZpY2F0aW9uLlxuICBpZiAoY2hhbmdlVHlwZSA9PT0gJ2FkbWluLWFwcHJvdmFsLWJvdW5jZScgJiYgaXNMYXN0VGV4dCkge1xuICAgIHBvc3NpYmxlSWNvbiA9IHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gcG9zc2libGVJY29uIHx8ICdncm91cCc7XG59XG5cbmZ1bmN0aW9uIEdyb3VwVjJEZXRhaWwoe1xuICBhcmVXZUFkbWluLFxuICBibG9ja0dyb3VwTGlua1JlcXVlc3RzLFxuICBkZXRhaWwsXG4gIGlzTGFzdFRleHQsXG4gIGZyb21JZCxcbiAgZ3JvdXBNZW1iZXJzaGlwcyxcbiAgZ3JvdXBCYW5uZWRNZW1iZXJzaGlwcyxcbiAgZ3JvdXBOYW1lLFxuICBpMThuLFxuICBvdXJVdWlkLFxuICByZW5kZXJDb250YWN0LFxuICB0ZXh0LFxufToge1xuICBhcmVXZUFkbWluOiBib29sZWFuO1xuICBibG9ja0dyb3VwTGlua1JlcXVlc3RzOiAodXVpZDogVVVJRFN0cmluZ1R5cGUpID0+IHVua25vd247XG4gIGRldGFpbDogR3JvdXBWMkNoYW5nZURldGFpbFR5cGU7XG4gIGlzTGFzdFRleHQ6IGJvb2xlYW47XG4gIGdyb3VwTWVtYmVyc2hpcHM/OiBBcnJheTx7XG4gICAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gICAgaXNBZG1pbjogYm9vbGVhbjtcbiAgfT47XG4gIGdyb3VwQmFubmVkTWVtYmVyc2hpcHM/OiBBcnJheTxVVUlEU3RyaW5nVHlwZT47XG4gIGdyb3VwTmFtZT86IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgZnJvbUlkPzogVVVJRFN0cmluZ1R5cGU7XG4gIG91clV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgcmVuZGVyQ29udGFjdDogU21hcnRDb250YWN0UmVuZGVyZXJUeXBlPEZ1bGxKU1hUeXBlPjtcbiAgdGV4dDogRnVsbEpTWFR5cGU7XG59KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCBpY29uID0gZ2V0SWNvbihkZXRhaWwsIGlzTGFzdFRleHQsIGZyb21JZCk7XG4gIGxldCBidXR0b25Ob2RlOiBSZWFjdE5vZGU7XG5cbiAgY29uc3QgW21vZGFsU3RhdGUsIHNldE1vZGFsU3RhdGVdID0gdXNlU3RhdGU8TW9kYWxTdGF0ZT4oTW9kYWxTdGF0ZS5Ob25lKTtcbiAgbGV0IG1vZGFsTm9kZTogUmVhY3ROb2RlO1xuXG4gIHN3aXRjaCAobW9kYWxTdGF0ZSkge1xuICAgIGNhc2UgTW9kYWxTdGF0ZS5Ob25lOlxuICAgICAgbW9kYWxOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBNb2RhbFN0YXRlLlZpZXdpbmdHcm91cERlc2NyaXB0aW9uOlxuICAgICAgaWYgKGRldGFpbC50eXBlICE9PSAnZGVzY3JpcHRpb24nIHx8ICFkZXRhaWwuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgJ0dyb3VwVjJEZXRhaWw6IFZpZXdpbmdHcm91cERlc2NyaXB0aW9uIGJ1dCBtaXNzaW5nIGRlc2NyaXB0aW9uIG9yIHdyb25nIGNoYW5nZSB0eXBlJ1xuICAgICAgICApO1xuICAgICAgICBtb2RhbE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBtb2RhbE5vZGUgPSAoXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIGhhc1hCdXR0b25cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIHRpdGxlPXtncm91cE5hbWV9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0TW9kYWxTdGF0ZShNb2RhbFN0YXRlLk5vbmUpfVxuICAgICAgICA+XG4gICAgICAgICAgPEdyb3VwRGVzY3JpcHRpb25UZXh0IHRleHQ9e2RldGFpbC5kZXNjcmlwdGlvbn0gLz5cbiAgICAgICAgPC9Nb2RhbD5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE1vZGFsU3RhdGUuQ29uZmlybWluZ2Jsb2NrR3JvdXBMaW5rUmVxdWVzdHM6XG4gICAgICBpZiAoXG4gICAgICAgICFpc0xhc3RUZXh0IHx8XG4gICAgICAgIGRldGFpbC50eXBlICE9PSAnYWRtaW4tYXBwcm92YWwtYm91bmNlJyB8fFxuICAgICAgICAhZGV0YWlsLnV1aWRcbiAgICAgICkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAnR3JvdXBWMkRldGFpbDogQ29uZmlybWluZ2Jsb2NrR3JvdXBMaW5rUmVxdWVzdHMgYnV0IG1pc3NpbmcgdXVpZCBvciB3cm9uZyBjaGFuZ2UgdHlwZSdcbiAgICAgICAgKTtcbiAgICAgICAgbW9kYWxOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbW9kYWxOb2RlID0gKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ1BlbmRpbmdSZXF1ZXN0cy0tYmxvY2stLXRpdGxlJyl9XG4gICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhY3Rpb246ICgpID0+IGJsb2NrR3JvdXBMaW5rUmVxdWVzdHMoZGV0YWlsLnV1aWQpLFxuICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdQZW5kaW5nUmVxdWVzdHMtLWJsb2NrLS1jb25maXJtJyksXG4gICAgICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0TW9kYWxTdGF0ZShNb2RhbFN0YXRlLk5vbmUpfVxuICAgICAgICA+XG4gICAgICAgICAgPEludGxcbiAgICAgICAgICAgIGlkPVwiUGVuZGluZ1JlcXVlc3RzLS1ibG9jay0tY29udGVudHNcIlxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgbmFtZTogcmVuZGVyQ29udGFjdChkZXRhaWwudXVpZCksXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHN0YXRlOiBuZXZlciA9IG1vZGFsU3RhdGU7XG4gICAgICBsb2cud2FybihgR3JvdXBWMkRldGFpbDogdW5leHBlY3RlZCBtb2RhbCBzdGF0ZSAke3N0YXRlfWApO1xuICAgICAgbW9kYWxOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRldGFpbC50eXBlID09PSAnZGVzY3JpcHRpb24nICYmIGRldGFpbC5kZXNjcmlwdGlvbikge1xuICAgIGJ1dHRvbk5vZGUgPSAoXG4gICAgICA8QnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vZGFsU3RhdGUoTW9kYWxTdGF0ZS5WaWV3aW5nR3JvdXBEZXNjcmlwdGlvbil9XG4gICAgICAgIHNpemU9e0J1dHRvblNpemUuU21hbGx9XG4gICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU3lzdGVtTWVzc2FnZX1cbiAgICAgID5cbiAgICAgICAge2kxOG4oJ3ZpZXcnKX1cbiAgICAgIDwvQnV0dG9uPlxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgaXNMYXN0VGV4dCAmJlxuICAgIGRldGFpbC50eXBlID09PSAnYWRtaW4tYXBwcm92YWwtYm91bmNlJyAmJlxuICAgIGFyZVdlQWRtaW4gJiZcbiAgICBkZXRhaWwudXVpZCAmJlxuICAgIGRldGFpbC51dWlkICE9PSBvdXJVdWlkICYmXG4gICAgKCFmcm9tSWQgfHwgZnJvbUlkID09PSBkZXRhaWwudXVpZCkgJiZcbiAgICAhZ3JvdXBNZW1iZXJzaGlwcz8uc29tZShpdGVtID0+IGl0ZW0udXVpZCA9PT0gZGV0YWlsLnV1aWQpICYmXG4gICAgIWdyb3VwQmFubmVkTWVtYmVyc2hpcHM/LnNvbWUodXVpZCA9PiB1dWlkID09PSBkZXRhaWwudXVpZClcbiAgKSB7XG4gICAgYnV0dG9uTm9kZSA9IChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICBzZXRNb2RhbFN0YXRlKE1vZGFsU3RhdGUuQ29uZmlybWluZ2Jsb2NrR3JvdXBMaW5rUmVxdWVzdHMpXG4gICAgICAgIH1cbiAgICAgICAgc2l6ZT17QnV0dG9uU2l6ZS5TbWFsbH1cbiAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TeXN0ZW1NZXNzYWdlfVxuICAgICAgPlxuICAgICAgICB7aTE4bignUGVuZGluZ1JlcXVlc3RzLS1ibG9jay0tYnV0dG9uJyl9XG4gICAgICA8L0J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN5c3RlbU1lc3NhZ2UgaWNvbj17aWNvbn0gY29udGVudHM9e3RleHR9IGJ1dHRvbj17YnV0dG9uTm9kZX0gLz5cbiAgICAgIHttb2RhbE5vZGV9XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHcm91cFYyQ2hhbmdlKHByb3BzOiBQcm9wc1R5cGUpOiBSZWFjdEVsZW1lbnQge1xuICBjb25zdCB7XG4gICAgYXJlV2VBZG1pbixcbiAgICBibG9ja0dyb3VwTGlua1JlcXVlc3RzLFxuICAgIGNoYW5nZSxcbiAgICBncm91cEJhbm5lZE1lbWJlcnNoaXBzLFxuICAgIGdyb3VwTWVtYmVyc2hpcHMsXG4gICAgZ3JvdXBOYW1lLFxuICAgIGkxOG4sXG4gICAgb3VyVXVpZCxcbiAgICByZW5kZXJDb250YWN0LFxuICB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZTxGdWxsSlNYVHlwZT4oY2hhbmdlLCB7XG4gICAgICAgIGkxOG4sXG4gICAgICAgIG91clV1aWQsXG4gICAgICAgIHJlbmRlckNvbnRhY3QsXG4gICAgICAgIHJlbmRlclN0cmluZzogcmVuZGVyU3RyaW5nVG9JbnRsLFxuICAgICAgfSkubWFwKCh7IGRldGFpbCwgaXNMYXN0VGV4dCwgdGV4dCB9LCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxHcm91cFYyRGV0YWlsXG4gICAgICAgICAgICBhcmVXZUFkbWluPXthcmVXZUFkbWlufVxuICAgICAgICAgICAgYmxvY2tHcm91cExpbmtSZXF1ZXN0cz17YmxvY2tHcm91cExpbmtSZXF1ZXN0c31cbiAgICAgICAgICAgIGRldGFpbD17ZGV0YWlsfVxuICAgICAgICAgICAgaXNMYXN0VGV4dD17aXNMYXN0VGV4dH1cbiAgICAgICAgICAgIGZyb21JZD17Y2hhbmdlLmZyb219XG4gICAgICAgICAgICBncm91cEJhbm5lZE1lbWJlcnNoaXBzPXtncm91cEJhbm5lZE1lbWJlcnNoaXBzfVxuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzaGlwcz17Z3JvdXBNZW1iZXJzaGlwc31cbiAgICAgICAgICAgIGdyb3VwTmFtZT17Z3JvdXBOYW1lfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIC8vIERpZmZpY3VsdCB0byBmaW5kIGEgdW5pcXVlIGtleSBmb3IgdGhpcyB0eXBlXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgb3VyVXVpZD17b3VyVXVpZH1cbiAgICAgICAgICAgIHJlbmRlckNvbnRhY3Q9e3JlbmRlckNvbnRhY3R9XG4gICAgICAgICAgICB0ZXh0PXt0ZXh0fVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBZ0M7QUFDaEMsb0JBQW9CO0FBRXBCLFVBQXFCO0FBR3JCLGtCQUFxQjtBQUdyQixrQ0FBcUM7QUFDckMsb0JBQWtEO0FBQ2xELDJCQUE4QjtBQUs5Qix5QkFBNkI7QUFDN0IsbUJBQXNCO0FBQ3RCLGdDQUFtQztBQTJCbkMsNEJBQ0UsSUFDQSxNQUNBLFlBQ2E7QUFDYixTQUFPLG1EQUFDO0FBQUEsSUFBSztBQUFBLElBQVE7QUFBQSxJQUFZO0FBQUEsR0FBd0I7QUFDM0Q7QUFOUyxBQVFULElBQUssYUFBTCxrQkFBSyxnQkFBTDtBQUNFLHdCQUFPO0FBQ1AsMkNBQTBCO0FBQzFCLG9EQUFtQztBQUhoQztBQUFBO0FBaUJMLE1BQU0sa0JBQWtCLG9CQUFJLElBQTJCO0FBQUEsRUFDckQsQ0FBQyxxQkFBcUIsY0FBYztBQUFBLEVBQ3BDLENBQUMsc0JBQXNCLGNBQWM7QUFBQSxFQUNyQyxDQUFDLGtCQUFrQixjQUFjO0FBQUEsRUFDakMsQ0FBQywwQkFBMEIsV0FBVztBQUFBLEVBQ3RDLENBQUMsNkJBQTZCLGVBQWU7QUFBQSxFQUM3QyxDQUFDLHlCQUF5QixlQUFlO0FBQUEsRUFDekMsQ0FBQyxzQkFBc0IsY0FBYztBQUFBLEVBQ3JDLENBQUMsVUFBVSxjQUFjO0FBQUEsRUFDekIsQ0FBQyxlQUFlLFlBQVk7QUFBQSxFQUM1QixDQUFDLGtCQUFrQixjQUFjO0FBQUEsRUFDakMsQ0FBQyxxQkFBcUIsY0FBYztBQUFBLEVBQ3BDLENBQUMsb0JBQW9CLGNBQWM7QUFBQSxFQUNuQyxDQUFDLGNBQWMsV0FBVztBQUFBLEVBQzFCLENBQUMsa0NBQWtDLGdCQUFnQjtBQUFBLEVBQ25E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
