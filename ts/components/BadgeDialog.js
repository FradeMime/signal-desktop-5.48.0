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
var BadgeDialog_exports = {};
__export(BadgeDialog_exports, {
  BadgeDialog: () => BadgeDialog
});
module.exports = __toCommonJS(BadgeDialog_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_assert = require("../util/assert");
var import_BadgeCategory = require("../badges/BadgeCategory");
var import_Modal = require("./Modal");
var import_Button = require("./Button");
var import_BadgeDescription = require("./BadgeDescription");
var import_BadgeImage = require("./BadgeImage");
var import_BadgeCarouselIndex = require("./BadgeCarouselIndex");
var import_BadgeSustainerInstructionsDialog = require("./BadgeSustainerInstructionsDialog");
function BadgeDialog(props) {
  const { badges, i18n, onClose } = props;
  const [isShowingInstructions, setIsShowingInstructions] = (0, import_react.useState)(false);
  const hasBadges = badges.length > 0;
  (0, import_react.useEffect)(() => {
    if (!hasBadges && !isShowingInstructions) {
      onClose();
    }
  }, [hasBadges, isShowingInstructions, onClose]);
  if (isShowingInstructions) {
    return /* @__PURE__ */ import_react.default.createElement(import_BadgeSustainerInstructionsDialog.BadgeSustainerInstructionsDialog, {
      i18n,
      onClose: () => setIsShowingInstructions(false)
    });
  }
  return hasBadges ? /* @__PURE__ */ import_react.default.createElement(BadgeDialogWithBadges, {
    ...props,
    onShowInstructions: () => setIsShowingInstructions(true)
  }) : null;
}
function BadgeDialogWithBadges({
  areWeASubscriber,
  badges,
  firstName,
  i18n,
  onClose,
  onShowInstructions,
  title
}) {
  const firstBadge = badges[0];
  (0, import_assert.strictAssert)(firstBadge, "<BadgeDialogWithBadges> got an empty array of badges");
  const [currentBadgeId, setCurrentBadgeId] = (0, import_react.useState)(firstBadge.id);
  let currentBadge;
  let currentBadgeIndex = badges.findIndex((b) => b.id === currentBadgeId);
  if (currentBadgeIndex === -1) {
    currentBadgeIndex = 0;
    currentBadge = firstBadge;
  } else {
    currentBadge = badges[currentBadgeIndex];
  }
  const setCurrentBadgeIndex = /* @__PURE__ */ __name((index) => {
    const newBadge = badges[index];
    (0, import_assert.strictAssert)(newBadge, "<BadgeDialog> tried to select a nonexistent badge");
    setCurrentBadgeId(newBadge.id);
  }, "setCurrentBadgeIndex");
  const navigate = /* @__PURE__ */ __name((change) => {
    setCurrentBadgeIndex(currentBadgeIndex + change);
  }, "navigate");
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    moduleClassName: "BadgeDialog",
    i18n,
    onClose
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "BadgeDialog__contents"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("previous"),
    className: "BadgeDialog__nav BadgeDialog__nav--previous",
    disabled: currentBadgeIndex === 0,
    onClick: () => navigate(-1),
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "BadgeDialog__main"
  }, /* @__PURE__ */ import_react.default.createElement(import_BadgeImage.BadgeImage, {
    badge: currentBadge,
    size: 160
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "BadgeDialog__name"
  }, currentBadge.name), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "BadgeDialog__description"
  }, /* @__PURE__ */ import_react.default.createElement(import_BadgeDescription.BadgeDescription, {
    firstName,
    template: currentBadge.descriptionTemplate,
    title
  })), !areWeASubscriber && /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    className: (0, import_classnames.default)("BadgeDialog__instructions-button", currentBadge.category !== import_BadgeCategory.BadgeCategory.Donor && "BadgeDialog__instructions-button--hidden"),
    onClick: onShowInstructions,
    size: import_Button.ButtonSize.Large
  }, i18n("BadgeDialog__become-a-sustainer-button")), /* @__PURE__ */ import_react.default.createElement(import_BadgeCarouselIndex.BadgeCarouselIndex, {
    currentIndex: currentBadgeIndex,
    totalCount: badges.length
  })), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("next"),
    className: "BadgeDialog__nav BadgeDialog__nav--next",
    disabled: currentBadgeIndex === badges.length - 1,
    onClick: () => navigate(1),
    type: "button"
  })));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VEaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUgfSBmcm9tICcuLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHsgQmFkZ2VDYXRlZ29yeSB9IGZyb20gJy4uL2JhZGdlcy9CYWRnZUNhdGVnb3J5JztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblNpemUgfSBmcm9tICcuL0J1dHRvbic7XG5pbXBvcnQgeyBCYWRnZURlc2NyaXB0aW9uIH0gZnJvbSAnLi9CYWRnZURlc2NyaXB0aW9uJztcbmltcG9ydCB7IEJhZGdlSW1hZ2UgfSBmcm9tICcuL0JhZGdlSW1hZ2UnO1xuaW1wb3J0IHsgQmFkZ2VDYXJvdXNlbEluZGV4IH0gZnJvbSAnLi9CYWRnZUNhcm91c2VsSW5kZXgnO1xuaW1wb3J0IHsgQmFkZ2VTdXN0YWluZXJJbnN0cnVjdGlvbnNEaWFsb2cgfSBmcm9tICcuL0JhZGdlU3VzdGFpbmVySW5zdHJ1Y3Rpb25zRGlhbG9nJztcblxudHlwZSBQcm9wc1R5cGUgPSBSZWFkb25seTx7XG4gIGFyZVdlQVN1YnNjcmliZXI6IGJvb2xlYW47XG4gIGJhZGdlczogUmVhZG9ubHlBcnJheTxCYWRnZVR5cGU+O1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIHRpdGxlOiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIEJhZGdlRGlhbG9nKHByb3BzOiBQcm9wc1R5cGUpOiBudWxsIHwgSlNYLkVsZW1lbnQge1xuICBjb25zdCB7IGJhZGdlcywgaTE4biwgb25DbG9zZSB9ID0gcHJvcHM7XG5cbiAgY29uc3QgW2lzU2hvd2luZ0luc3RydWN0aW9ucywgc2V0SXNTaG93aW5nSW5zdHJ1Y3Rpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYXNCYWRnZXMgPSBiYWRnZXMubGVuZ3RoID4gMDtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0JhZGdlcyAmJiAhaXNTaG93aW5nSW5zdHJ1Y3Rpb25zKSB7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfVxuICB9LCBbaGFzQmFkZ2VzLCBpc1Nob3dpbmdJbnN0cnVjdGlvbnMsIG9uQ2xvc2VdKTtcblxuICBpZiAoaXNTaG93aW5nSW5zdHJ1Y3Rpb25zKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCYWRnZVN1c3RhaW5lckluc3RydWN0aW9uc0RpYWxvZ1xuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc1Nob3dpbmdJbnN0cnVjdGlvbnMoZmFsc2UpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGhhc0JhZGdlcyA/IChcbiAgICA8QmFkZ2VEaWFsb2dXaXRoQmFkZ2VzXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBvblNob3dJbnN0cnVjdGlvbnM9eygpID0+IHNldElzU2hvd2luZ0luc3RydWN0aW9ucyh0cnVlKX1cbiAgICAvPlxuICApIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gQmFkZ2VEaWFsb2dXaXRoQmFkZ2VzKHtcbiAgYXJlV2VBU3Vic2NyaWJlcixcbiAgYmFkZ2VzLFxuICBmaXJzdE5hbWUsXG4gIGkxOG4sXG4gIG9uQ2xvc2UsXG4gIG9uU2hvd0luc3RydWN0aW9ucyxcbiAgdGl0bGUsXG59OiBQcm9wc1R5cGUgJiB7IG9uU2hvd0luc3RydWN0aW9uczogKCkgPT4gdW5rbm93biB9KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCBmaXJzdEJhZGdlID0gYmFkZ2VzWzBdO1xuICBzdHJpY3RBc3NlcnQoXG4gICAgZmlyc3RCYWRnZSxcbiAgICAnPEJhZGdlRGlhbG9nV2l0aEJhZGdlcz4gZ290IGFuIGVtcHR5IGFycmF5IG9mIGJhZGdlcydcbiAgKTtcblxuICBjb25zdCBbY3VycmVudEJhZGdlSWQsIHNldEN1cnJlbnRCYWRnZUlkXSA9IHVzZVN0YXRlKGZpcnN0QmFkZ2UuaWQpO1xuXG4gIGxldCBjdXJyZW50QmFkZ2U6IEJhZGdlVHlwZTtcbiAgbGV0IGN1cnJlbnRCYWRnZUluZGV4OiBudW1iZXIgPSBiYWRnZXMuZmluZEluZGV4KFxuICAgIGIgPT4gYi5pZCA9PT0gY3VycmVudEJhZGdlSWRcbiAgKTtcbiAgaWYgKGN1cnJlbnRCYWRnZUluZGV4ID09PSAtMSkge1xuICAgIGN1cnJlbnRCYWRnZUluZGV4ID0gMDtcbiAgICBjdXJyZW50QmFkZ2UgPSBmaXJzdEJhZGdlO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRCYWRnZSA9IGJhZGdlc1tjdXJyZW50QmFkZ2VJbmRleF07XG4gIH1cblxuICBjb25zdCBzZXRDdXJyZW50QmFkZ2VJbmRleCA9IChpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgY29uc3QgbmV3QmFkZ2UgPSBiYWRnZXNbaW5kZXhdO1xuICAgIHN0cmljdEFzc2VydChuZXdCYWRnZSwgJzxCYWRnZURpYWxvZz4gdHJpZWQgdG8gc2VsZWN0IGEgbm9uZXhpc3RlbnQgYmFkZ2UnKTtcbiAgICBzZXRDdXJyZW50QmFkZ2VJZChuZXdCYWRnZS5pZCk7XG4gIH07XG5cbiAgY29uc3QgbmF2aWdhdGUgPSAoY2hhbmdlOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBzZXRDdXJyZW50QmFkZ2VJbmRleChjdXJyZW50QmFkZ2VJbmRleCArIGNoYW5nZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIGhhc1hCdXR0b25cbiAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIkJhZGdlRGlhbG9nXCJcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQmFkZ2VEaWFsb2dfX2NvbnRlbnRzXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdwcmV2aW91cycpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIkJhZGdlRGlhbG9nX19uYXYgQmFkZ2VEaWFsb2dfX25hdi0tcHJldmlvdXNcIlxuICAgICAgICAgIGRpc2FibGVkPXtjdXJyZW50QmFkZ2VJbmRleCA9PT0gMH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgtMSl9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQmFkZ2VEaWFsb2dfX21haW5cIj5cbiAgICAgICAgICA8QmFkZ2VJbWFnZSBiYWRnZT17Y3VycmVudEJhZGdlfSBzaXplPXsxNjB9IC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJCYWRnZURpYWxvZ19fbmFtZVwiPntjdXJyZW50QmFkZ2UubmFtZX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkJhZGdlRGlhbG9nX19kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgPEJhZGdlRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgZmlyc3ROYW1lPXtmaXJzdE5hbWV9XG4gICAgICAgICAgICAgIHRlbXBsYXRlPXtjdXJyZW50QmFkZ2UuZGVzY3JpcHRpb25UZW1wbGF0ZX1cbiAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IWFyZVdlQVN1YnNjcmliZXIgJiYgKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgJ0JhZGdlRGlhbG9nX19pbnN0cnVjdGlvbnMtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBjdXJyZW50QmFkZ2UuY2F0ZWdvcnkgIT09IEJhZGdlQ2F0ZWdvcnkuRG9ub3IgJiZcbiAgICAgICAgICAgICAgICAgICdCYWRnZURpYWxvZ19faW5zdHJ1Y3Rpb25zLWJ1dHRvbi0taGlkZGVuJ1xuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblNob3dJbnN0cnVjdGlvbnN9XG4gICAgICAgICAgICAgIHNpemU9e0J1dHRvblNpemUuTGFyZ2V9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpMThuKCdCYWRnZURpYWxvZ19fYmVjb21lLWEtc3VzdGFpbmVyLWJ1dHRvbicpfVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8QmFkZ2VDYXJvdXNlbEluZGV4XG4gICAgICAgICAgICBjdXJyZW50SW5kZXg9e2N1cnJlbnRCYWRnZUluZGV4fVxuICAgICAgICAgICAgdG90YWxDb3VudD17YmFkZ2VzLmxlbmd0aH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ25leHQnKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJCYWRnZURpYWxvZ19fbmF2IEJhZGdlRGlhbG9nX19uYXYtLW5leHRcIlxuICAgICAgICAgIGRpc2FibGVkPXtjdXJyZW50QmFkZ2VJbmRleCA9PT0gYmFkZ2VzLmxlbmd0aCAtIDF9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoMSl9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUEyQztBQUMzQyx3QkFBdUI7QUFFdkIsb0JBQTZCO0FBRzdCLDJCQUE4QjtBQUM5QixtQkFBc0I7QUFDdEIsb0JBQW1DO0FBQ25DLDhCQUFpQztBQUNqQyx3QkFBMkI7QUFDM0IsZ0NBQW1DO0FBQ25DLDhDQUFpRDtBQVcxQyxxQkFBcUIsT0FBc0M7QUFDaEUsUUFBTSxFQUFFLFFBQVEsTUFBTSxZQUFZO0FBRWxDLFFBQU0sQ0FBQyx1QkFBdUIsNEJBQTRCLDJCQUFTLEtBQUs7QUFFeEUsUUFBTSxZQUFZLE9BQU8sU0FBUztBQUNsQyw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUI7QUFDeEMsY0FBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxXQUFXLHVCQUF1QixPQUFPLENBQUM7QUFFOUMsTUFBSSx1QkFBdUI7QUFDekIsV0FDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLFNBQVMsTUFBTSx5QkFBeUIsS0FBSztBQUFBLEtBQy9DO0FBQUEsRUFFSjtBQUVBLFNBQU8sWUFDTCxtREFBQztBQUFBLE9BQ0s7QUFBQSxJQUNKLG9CQUFvQixNQUFNLHlCQUF5QixJQUFJO0FBQUEsR0FDekQsSUFDRTtBQUNOO0FBM0JnQixBQTZCaEIsK0JBQStCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNpRTtBQUNqRSxRQUFNLGFBQWEsT0FBTztBQUMxQixrQ0FDRSxZQUNBLHNEQUNGO0FBRUEsUUFBTSxDQUFDLGdCQUFnQixxQkFBcUIsMkJBQVMsV0FBVyxFQUFFO0FBRWxFLE1BQUk7QUFDSixNQUFJLG9CQUE0QixPQUFPLFVBQ3JDLE9BQUssRUFBRSxPQUFPLGNBQ2hCO0FBQ0EsTUFBSSxzQkFBc0IsSUFBSTtBQUM1Qix3QkFBb0I7QUFDcEIsbUJBQWU7QUFBQSxFQUNqQixPQUFPO0FBQ0wsbUJBQWUsT0FBTztBQUFBLEVBQ3hCO0FBRUEsUUFBTSx1QkFBdUIsd0JBQUMsVUFBd0I7QUFDcEQsVUFBTSxXQUFXLE9BQU87QUFDeEIsb0NBQWEsVUFBVSxtREFBbUQ7QUFDMUUsc0JBQWtCLFNBQVMsRUFBRTtBQUFBLEVBQy9CLEdBSjZCO0FBTTdCLFFBQU0sV0FBVyx3QkFBQyxXQUF5QjtBQUN6Qyx5QkFBcUIsb0JBQW9CLE1BQU07QUFBQSxFQUNqRCxHQUZpQjtBQUlqQixTQUNFLG1EQUFDO0FBQUEsSUFDQyxZQUFVO0FBQUEsSUFDVixpQkFBZ0I7QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxLQUVBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0MsY0FBWSxLQUFLLFVBQVU7QUFBQSxJQUMzQixXQUFVO0FBQUEsSUFDVixVQUFVLHNCQUFzQjtBQUFBLElBQ2hDLFNBQVMsTUFBTSxTQUFTLEVBQUU7QUFBQSxJQUMxQixNQUFLO0FBQUEsR0FDUCxHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQVcsT0FBTztBQUFBLElBQWMsTUFBTTtBQUFBLEdBQUssR0FDNUMsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUFxQixhQUFhLElBQUssR0FDdEQsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsVUFBVSxhQUFhO0FBQUEsSUFDdkI7QUFBQSxHQUNGLENBQ0YsR0FDQyxDQUFDLG9CQUNBLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULG9DQUNBLGFBQWEsYUFBYSxtQ0FBYyxTQUN0QywwQ0FDSjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsTUFBTSx5QkFBVztBQUFBLEtBRWhCLEtBQUssd0NBQXdDLENBQ2hELEdBRUYsbURBQUM7QUFBQSxJQUNDLGNBQWM7QUFBQSxJQUNkLFlBQVksT0FBTztBQUFBLEdBQ3JCLENBQ0YsR0FDQSxtREFBQztBQUFBLElBQ0MsY0FBWSxLQUFLLE1BQU07QUFBQSxJQUN2QixXQUFVO0FBQUEsSUFDVixVQUFVLHNCQUFzQixPQUFPLFNBQVM7QUFBQSxJQUNoRCxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQUEsSUFDekIsTUFBSztBQUFBLEdBQ1AsQ0FDRixDQUNGO0FBRUo7QUEzRlMiLAogICJuYW1lcyI6IFtdCn0K
