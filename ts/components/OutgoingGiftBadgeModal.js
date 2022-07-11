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
var OutgoingGiftBadgeModal_exports = {};
__export(OutgoingGiftBadgeModal_exports, {
  OutgoingGiftBadgeModal: () => OutgoingGiftBadgeModal
});
module.exports = __toCommonJS(OutgoingGiftBadgeModal_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_getBadgeImageFileLocalPath = require("../badges/getBadgeImageFileLocalPath");
var import_Modal = require("./Modal");
var import_BadgeImageTheme = require("../badges/BadgeImageTheme");
const CLASS_NAME = "OutgoingGiftBadgeModal";
const OutgoingGiftBadgeModal = /* @__PURE__ */ __name(({
  recipientTitle,
  i18n,
  badgeId,
  hideOutgoingGiftBadgeModal,
  getPreferredBadge
}) => {
  const badge = getPreferredBadge([{ id: badgeId }]);
  const badgeSize = 140;
  const badgeImagePath = (0, import_getBadgeImageFileLocalPath.getBadgeImageFileLocalPath)(badge, badgeSize, import_BadgeImageTheme.BadgeImageTheme.Transparent);
  const badgeElement = badge ? /* @__PURE__ */ import_react.default.createElement("img", {
    className: `${CLASS_NAME}__badge`,
    src: badgeImagePath,
    alt: badge.name
  }) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(`${CLASS_NAME}__badge`, `${CLASS_NAME}__badge--missing`),
    "aria-label": i18n("giftBadge--missing")
  });
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    i18n,
    moduleClassName: `${CLASS_NAME}__container`,
    onClose: hideOutgoingGiftBadgeModal,
    hasXButton: true,
    useFocusTrap: true
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: CLASS_NAME
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${CLASS_NAME}__title`
  }, i18n("modal--giftBadge--title")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${CLASS_NAME}__description`
  }, i18n("modal--giftBadge--description", { name: recipientTitle })), badgeElement, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${CLASS_NAME}__badge-summary`
  }, i18n("message--giftBadge"))));
}, "OutgoingGiftBadgeModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OutgoingGiftBadgeModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiT3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBnZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aCB9IGZyb20gJy4uL2JhZGdlcy9nZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IHsgQmFkZ2VJbWFnZVRoZW1lIH0gZnJvbSAnLi4vYmFkZ2VzL0JhZGdlSW1hZ2VUaGVtZSc7XG5cbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBDTEFTU19OQU1FID0gJ091dGdvaW5nR2lmdEJhZGdlTW9kYWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIHJlY2lwaWVudFRpdGxlOiBzdHJpbmc7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGJhZGdlSWQ6IHN0cmluZztcbiAgaGlkZU91dGdvaW5nR2lmdEJhZGdlTW9kYWw6ICgpID0+IHVua25vd247XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBPdXRnb2luZ0dpZnRCYWRnZU1vZGFsID0gKHtcbiAgcmVjaXBpZW50VGl0bGUsXG4gIGkxOG4sXG4gIGJhZGdlSWQsXG4gIGhpZGVPdXRnb2luZ0dpZnRCYWRnZU1vZGFsLFxuICBnZXRQcmVmZXJyZWRCYWRnZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgYmFkZ2UgPSBnZXRQcmVmZXJyZWRCYWRnZShbeyBpZDogYmFkZ2VJZCB9XSk7XG4gIGNvbnN0IGJhZGdlU2l6ZSA9IDE0MDtcbiAgY29uc3QgYmFkZ2VJbWFnZVBhdGggPSBnZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aChcbiAgICBiYWRnZSxcbiAgICBiYWRnZVNpemUsXG4gICAgQmFkZ2VJbWFnZVRoZW1lLlRyYW5zcGFyZW50XG4gICk7XG5cbiAgY29uc3QgYmFkZ2VFbGVtZW50ID0gYmFkZ2UgPyAoXG4gICAgPGltZ1xuICAgICAgY2xhc3NOYW1lPXtgJHtDTEFTU19OQU1FfV9fYmFkZ2VgfVxuICAgICAgc3JjPXtiYWRnZUltYWdlUGF0aH1cbiAgICAgIGFsdD17YmFkZ2UubmFtZX1cbiAgICAvPlxuICApIDogKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgYCR7Q0xBU1NfTkFNRX1fX2JhZGdlYCxcbiAgICAgICAgYCR7Q0xBU1NfTkFNRX1fX2JhZGdlLS1taXNzaW5nYFxuICAgICAgKX1cbiAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2dpZnRCYWRnZS0tbWlzc2luZycpfVxuICAgIC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBtb2R1bGVDbGFzc05hbWU9e2Ake0NMQVNTX05BTUV9X19jb250YWluZXJgfVxuICAgICAgb25DbG9zZT17aGlkZU91dGdvaW5nR2lmdEJhZGdlTW9kYWx9XG4gICAgICBoYXNYQnV0dG9uXG4gICAgICB1c2VGb2N1c1RyYXBcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Q0xBU1NfTkFNRX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtDTEFTU19OQU1FfV9fdGl0bGVgfT5cbiAgICAgICAgICB7aTE4bignbW9kYWwtLWdpZnRCYWRnZS0tdGl0bGUnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtDTEFTU19OQU1FfV9fZGVzY3JpcHRpb25gfT5cbiAgICAgICAgICB7aTE4bignbW9kYWwtLWdpZnRCYWRnZS0tZGVzY3JpcHRpb24nLCB7IG5hbWU6IHJlY2lwaWVudFRpdGxlIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2JhZGdlRWxlbWVudH1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0NMQVNTX05BTUV9X19iYWRnZS1zdW1tYXJ5YH0+XG4gICAgICAgICAge2kxOG4oJ21lc3NhZ2UtLWdpZnRCYWRnZScpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFFdkIsd0NBQTJDO0FBQzNDLG1CQUFzQjtBQUN0Qiw2QkFBZ0M7QUFLaEMsTUFBTSxhQUFhO0FBVVosTUFBTSx5QkFBeUIsd0JBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixRQUFNLFFBQVEsa0JBQWtCLENBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELFFBQU0sWUFBWTtBQUNsQixRQUFNLGlCQUFpQixrRUFDckIsT0FDQSxXQUNBLHVDQUFnQixXQUNsQjtBQUVBLFFBQU0sZUFBZSxRQUNuQixtREFBQztBQUFBLElBQ0MsV0FBVyxHQUFHO0FBQUEsSUFDZCxLQUFLO0FBQUEsSUFDTCxLQUFLLE1BQU07QUFBQSxHQUNiLElBRUEsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsR0FBRyxxQkFDSCxHQUFHLDRCQUNMO0FBQUEsSUFDQSxjQUFZLEtBQUssb0JBQW9CO0FBQUEsR0FDdkM7QUFHRixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsaUJBQWlCLEdBQUc7QUFBQSxJQUNwQixTQUFTO0FBQUEsSUFDVCxZQUFVO0FBQUEsSUFDVixjQUFZO0FBQUEsS0FFWixtREFBQztBQUFBLElBQUksV0FBVztBQUFBLEtBQ2QsbURBQUM7QUFBQSxJQUFJLFdBQVcsR0FBRztBQUFBLEtBQ2hCLEtBQUsseUJBQXlCLENBQ2pDLEdBQ0EsbURBQUM7QUFBQSxJQUFJLFdBQVcsR0FBRztBQUFBLEtBQ2hCLEtBQUssaUNBQWlDLEVBQUUsTUFBTSxlQUFlLENBQUMsQ0FDakUsR0FDQyxjQUNELG1EQUFDO0FBQUEsSUFBSSxXQUFXLEdBQUc7QUFBQSxLQUNoQixLQUFLLG9CQUFvQixDQUM1QixDQUNGLENBQ0Y7QUFFSixHQXJEc0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
