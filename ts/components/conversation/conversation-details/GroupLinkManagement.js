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
var GroupLinkManagement_exports = {};
__export(GroupLinkManagement_exports, {
  GroupLinkManagement: () => GroupLinkManagement
});
module.exports = __toCommonJS(GroupLinkManagement_exports);
var import_react = __toESM(require("react"));
var import_ConfirmationDialog = require("../../ConfirmationDialog");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var import_PanelRow = require("./PanelRow");
var import_PanelSection = require("./PanelSection");
var import_Select = require("../../Select");
var import_protobuf = require("../../../protobuf");
var import_copyGroupLink = require("../../../util/copyGroupLink");
var import_useRestoreFocus = require("../../../hooks/useRestoreFocus");
var import_useUniqueId = require("../../../hooks/useUniqueId");
const AccessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
const GroupLinkManagement = /* @__PURE__ */ __name(({
  changeHasGroupLink,
  conversation,
  generateNewGroupLink,
  i18n,
  isAdmin,
  setAccessControlAddFromInviteLinkSetting
}) => {
  const groupLinkSelectId = (0, import_useUniqueId.useUniqueId)();
  const approveSelectId = (0, import_useUniqueId.useUniqueId)();
  if (conversation === void 0) {
    throw new Error("GroupLinkManagement rendered without a conversation");
  }
  const [focusRef] = (0, import_useRestoreFocus.useDelayedRestoreFocus)();
  const createEventHandler = /* @__PURE__ */ __name((handleEvent) => {
    return (value) => {
      handleEvent(conversation.id, value === "true");
    };
  }, "createEventHandler");
  const membersNeedAdminApproval = conversation.accessControlAddFromInviteLink === AccessControlEnum.ADMINISTRATOR;
  const hasGroupLink = conversation.groupLink && conversation.accessControlAddFromInviteLink !== AccessControlEnum.UNSATISFIABLE;
  const groupLinkInfo = hasGroupLink ? conversation.groupLink : "";
  const [hasGenerateNewLinkDialog, setHasGenerateNewLinkDialog] = (0, import_react.useState)(false);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, hasGenerateNewLinkDialog && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: () => {
          generateNewGroupLink(conversation.id);
        },
        style: "negative",
        text: i18n("GroupLinkManagement--reset")
      }
    ],
    i18n,
    onClose: () => {
      setHasGenerateNewLinkDialog(false);
    },
    title: i18n("GroupLinkManagement--confirm-reset")
  }), /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    info: groupLinkInfo,
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: groupLinkSelectId
    }, i18n("ConversationDetails--group-link")),
    right: isAdmin ? /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: groupLinkSelectId,
      onChange: createEventHandler(changeHasGroupLink),
      options: [
        {
          text: i18n("on"),
          value: "true"
        },
        {
          text: i18n("off"),
          value: "false"
        }
      ],
      ref: focusRef,
      value: String(Boolean(hasGroupLink))
    }) : null
  })), hasGroupLink ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("GroupLinkManagement--share"),
      icon: import_ConversationDetailsIcon.IconType.share
    }),
    label: i18n("GroupLinkManagement--share"),
    ref: !isAdmin ? focusRef : void 0,
    onClick: () => {
      if (conversation.groupLink) {
        (0, import_copyGroupLink.copyGroupLink)(conversation.groupLink);
      }
    }
  }), isAdmin ? /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("GroupLinkManagement--reset"),
      icon: import_ConversationDetailsIcon.IconType.reset
    }),
    label: i18n("GroupLinkManagement--reset"),
    onClick: () => setHasGenerateNewLinkDialog(true)
  }) : null), isAdmin ? /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    info: i18n("GroupLinkManagement--approve-info"),
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: approveSelectId
    }, i18n("GroupLinkManagement--approve-label")),
    right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: approveSelectId,
      onChange: createEventHandler(setAccessControlAddFromInviteLinkSetting),
      options: [
        {
          text: i18n("on"),
          value: "true"
        },
        {
          text: i18n("off"),
          value: "false"
        }
      ],
      value: String(membersNeedAdminApproval)
    })
  })) : null) : null);
}, "GroupLinkManagement");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupLinkManagement
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBMaW5rTWFuYWdlbWVudC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZyB9IGZyb20gJy4uLy4uL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzSWNvbiwgSWNvblR5cGUgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNJY29uJztcbmltcG9ydCB7IFBhbmVsUm93IH0gZnJvbSAnLi9QYW5lbFJvdyc7XG5pbXBvcnQgeyBQYW5lbFNlY3Rpb24gfSBmcm9tICcuL1BhbmVsU2VjdGlvbic7XG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuLi8uLi9TZWxlY3QnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uLy4uL3Byb3RvYnVmJztcblxuaW1wb3J0IHsgY29weUdyb3VwTGluayB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29weUdyb3VwTGluayc7XG5pbXBvcnQgeyB1c2VEZWxheWVkUmVzdG9yZUZvY3VzIH0gZnJvbSAnLi4vLi4vLi4vaG9va3MvdXNlUmVzdG9yZUZvY3VzJztcbmltcG9ydCB7IHVzZVVuaXF1ZUlkIH0gZnJvbSAnLi4vLi4vLi4vaG9va3MvdXNlVW5pcXVlSWQnO1xuXG5jb25zdCBBY2Nlc3NDb250cm9sRW51bSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YVR5cGUgPSB7XG4gIGNvbnZlcnNhdGlvbj86IENvbnZlcnNhdGlvblR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzQWRtaW46IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBQcm9wc0RhdGFUeXBlICYge1xuICBjaGFuZ2VIYXNHcm91cExpbms6IChjb252ZXJzYXRpb25JZDogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbikgPT4gdW5rbm93bjtcbiAgZ2VuZXJhdGVOZXdHcm91cExpbms6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBzZXRBY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmtTZXR0aW5nOiAoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICB2YWx1ZTogYm9vbGVhblxuICApID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBMaW5rTWFuYWdlbWVudDogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wc1R5cGU+ID0gKHtcbiAgY2hhbmdlSGFzR3JvdXBMaW5rLFxuICBjb252ZXJzYXRpb24sXG4gIGdlbmVyYXRlTmV3R3JvdXBMaW5rLFxuICBpMThuLFxuICBpc0FkbWluLFxuICBzZXRBY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmtTZXR0aW5nLFxufSkgPT4ge1xuICBjb25zdCBncm91cExpbmtTZWxlY3RJZCA9IHVzZVVuaXF1ZUlkKCk7XG4gIGNvbnN0IGFwcHJvdmVTZWxlY3RJZCA9IHVzZVVuaXF1ZUlkKCk7XG5cbiAgaWYgKGNvbnZlcnNhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cExpbmtNYW5hZ2VtZW50IHJlbmRlcmVkIHdpdGhvdXQgYSBjb252ZXJzYXRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IFtmb2N1c1JlZl0gPSB1c2VEZWxheWVkUmVzdG9yZUZvY3VzKCk7XG5cbiAgY29uc3QgY3JlYXRlRXZlbnRIYW5kbGVyID0gKFxuICAgIGhhbmRsZUV2ZW50OiAoaWQ6IHN0cmluZywgeDogYm9vbGVhbikgPT4gdW5rbm93blxuICApID0+IHtcbiAgICByZXR1cm4gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIGhhbmRsZUV2ZW50KGNvbnZlcnNhdGlvbi5pZCwgdmFsdWUgPT09ICd0cnVlJyk7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtZW1iZXJzTmVlZEFkbWluQXBwcm92YWwgPVxuICAgIGNvbnZlcnNhdGlvbi5hY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmsgPT09XG4gICAgQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUjtcblxuICBjb25zdCBoYXNHcm91cExpbmsgPVxuICAgIGNvbnZlcnNhdGlvbi5ncm91cExpbmsgJiZcbiAgICBjb252ZXJzYXRpb24uYWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rICE9PVxuICAgICAgQWNjZXNzQ29udHJvbEVudW0uVU5TQVRJU0ZJQUJMRTtcbiAgY29uc3QgZ3JvdXBMaW5rSW5mbyA9IGhhc0dyb3VwTGluayA/IGNvbnZlcnNhdGlvbi5ncm91cExpbmsgOiAnJztcblxuICBjb25zdCBbaGFzR2VuZXJhdGVOZXdMaW5rRGlhbG9nLCBzZXRIYXNHZW5lcmF0ZU5ld0xpbmtEaWFsb2ddID1cbiAgICB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2hhc0dlbmVyYXRlTmV3TGlua0RpYWxvZyAmJiAoXG4gICAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlTmV3R3JvdXBMaW5rKGNvbnZlcnNhdGlvbi5pZCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnbmVnYXRpdmUnLFxuICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdHcm91cExpbmtNYW5hZ2VtZW50LS1yZXNldCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgc2V0SGFzR2VuZXJhdGVOZXdMaW5rRGlhbG9nKGZhbHNlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRpdGxlPXtpMThuKCdHcm91cExpbmtNYW5hZ2VtZW50LS1jb25maXJtLXJlc2V0Jyl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgPFBhbmVsU2VjdGlvbj5cbiAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgaW5mbz17Z3JvdXBMaW5rSW5mb31cbiAgICAgICAgICBsYWJlbD17XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17Z3JvdXBMaW5rU2VsZWN0SWR9PlxuICAgICAgICAgICAgICB7aTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tZ3JvdXAtbGluaycpfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgaXNBZG1pbiA/IChcbiAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgIGlkPXtncm91cExpbmtTZWxlY3RJZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17Y3JlYXRlRXZlbnRIYW5kbGVyKGNoYW5nZUhhc0dyb3VwTGluayl9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdvbicpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaTE4bignb2ZmJyksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZmFsc2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIHJlZj17Zm9jdXNSZWZ9XG4gICAgICAgICAgICAgICAgdmFsdWU9e1N0cmluZyhCb29sZWFuKGhhc0dyb3VwTGluaykpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L1BhbmVsU2VjdGlvbj5cblxuICAgICAge2hhc0dyb3VwTGluayA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8UGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpMThuKCdHcm91cExpbmtNYW5hZ2VtZW50LS1zaGFyZScpfVxuICAgICAgICAgICAgICAgICAgaWNvbj17SWNvblR5cGUuc2hhcmV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsYWJlbD17aTE4bignR3JvdXBMaW5rTWFuYWdlbWVudC0tc2hhcmUnKX1cbiAgICAgICAgICAgICAgcmVmPXshaXNBZG1pbiA/IGZvY3VzUmVmIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbi5ncm91cExpbmspIHtcbiAgICAgICAgICAgICAgICAgIGNvcHlHcm91cExpbmsoY29udmVyc2F0aW9uLmdyb3VwTGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtpc0FkbWluID8gKFxuICAgICAgICAgICAgICA8UGFuZWxSb3dcbiAgICAgICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ0dyb3VwTGlua01hbmFnZW1lbnQtLXJlc2V0Jyl9XG4gICAgICAgICAgICAgICAgICAgIGljb249e0ljb25UeXBlLnJlc2V0fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ0dyb3VwTGlua01hbmFnZW1lbnQtLXJlc2V0Jyl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SGFzR2VuZXJhdGVOZXdMaW5rRGlhbG9nKHRydWUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9QYW5lbFNlY3Rpb24+XG5cbiAgICAgICAgICB7aXNBZG1pbiA/IChcbiAgICAgICAgICAgIDxQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgICAgICAgIGluZm89e2kxOG4oJ0dyb3VwTGlua01hbmFnZW1lbnQtLWFwcHJvdmUtaW5mbycpfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtcbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXthcHByb3ZlU2VsZWN0SWR9PlxuICAgICAgICAgICAgICAgICAgICB7aTE4bignR3JvdXBMaW5rTWFuYWdlbWVudC0tYXBwcm92ZS1sYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICBpZD17YXBwcm92ZVNlbGVjdElkfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17Y3JlYXRlRXZlbnRIYW5kbGVyKFxuICAgICAgICAgICAgICAgICAgICAgIHNldEFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGlua1NldHRpbmdcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ29uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogaTE4bignb2ZmJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2ZhbHNlJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17U3RyaW5nKG1lbWJlcnNOZWVkQWRtaW5BcHByb3ZhbCl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8Lz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFLaEMsZ0NBQW1DO0FBQ25DLHFDQUFrRDtBQUNsRCxzQkFBeUI7QUFDekIsMEJBQTZCO0FBQzdCLG9CQUF1QjtBQUN2QixzQkFBdUM7QUFFdkMsMkJBQThCO0FBQzlCLDZCQUF1QztBQUN2Qyx5QkFBNEI7QUFFNUIsTUFBTSxvQkFBb0IsOEJBQU0sY0FBYztBQWlC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
