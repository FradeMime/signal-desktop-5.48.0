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
var GroupV2PendingApprovalActions_exports = {};
__export(GroupV2PendingApprovalActions_exports, {
  GroupV2PendingApprovalActions: () => GroupV2PendingApprovalActions
});
module.exports = __toCommonJS(GroupV2PendingApprovalActions_exports);
var React = __toESM(require("react"));
const GroupV2PendingApprovalActions = /* @__PURE__ */ __name(({
  i18n,
  onCancelJoinRequest
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-pending-approval-actions"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "module-group-v2-pending-approval-actions__message"
  }, i18n("GroupV2--join--requested")), /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-pending-approval-actions__buttons"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: onCancelJoinRequest,
    tabIndex: 0,
    className: "module-group-v2-pending-approval-actions__buttons__button"
  }, i18n("GroupV2--join--cancel-request-to-join"))));
}, "GroupV2PendingApprovalActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV2PendingApprovalActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMlBlbmRpbmdBcHByb3ZhbEFjdGlvbnMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2FuY2VsSm9pblJlcXVlc3Q6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBWMlBlbmRpbmdBcHByb3ZhbEFjdGlvbnMgPSAoe1xuICBpMThuLFxuICBvbkNhbmNlbEpvaW5SZXF1ZXN0LFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLXBlbmRpbmctYXBwcm92YWwtYWN0aW9uc1wiPlxuICAgICAgPHAgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLXBlbmRpbmctYXBwcm92YWwtYWN0aW9uc19fbWVzc2FnZVwiPlxuICAgICAgICB7aTE4bignR3JvdXBWMi0tam9pbi0tcmVxdWVzdGVkJyl9XG4gICAgICA8L3A+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1ncm91cC12Mi1wZW5kaW5nLWFwcHJvdmFsLWFjdGlvbnNfX2J1dHRvbnNcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2FuY2VsSm9pblJlcXVlc3R9XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLXBlbmRpbmctYXBwcm92YWwtYWN0aW9uc19fYnV0dG9uc19fYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdHcm91cFYyLS1qb2luLS1jYW5jZWwtcmVxdWVzdC10by1qb2luJyl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBUWhCLE1BQU0sZ0NBQWdDLHdCQUFDO0FBQUEsRUFDNUM7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsU0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUFFLFdBQVU7QUFBQSxLQUNWLEtBQUssMEJBQTBCLENBQ2xDLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixXQUFVO0FBQUEsS0FFVCxLQUFLLHVDQUF1QyxDQUMvQyxDQUNGLENBQ0Y7QUFFSixHQXJCNkM7IiwKICAibmFtZXMiOiBbXQp9Cg==
