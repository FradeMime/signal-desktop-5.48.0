var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ForwardMessageModal_exports = {};
__export(ForwardMessageModal_exports, {
  SmartForwardMessageModal: () => SmartForwardMessageModal
});
module.exports = __toCommonJS(ForwardMessageModal_exports);
var import_react_redux = require("react-redux");
var import_ForwardMessageModal = require("../../components/ForwardMessageModal");
var import_LinkPreview = require("../../types/LinkPreview");
var import_conversations = require("../selectors/conversations");
var import_items = require("../selectors/items");
var import_user = require("../selectors/user");
var import_linkPreviews = require("../selectors/linkPreviews");
var import_badges = require("../selectors/badges");
var import_actions = require("../actions");
var import_emojis = require("../selectors/emojis");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const {
    attachments,
    doForwardMessage,
    hasContact,
    isSticker,
    messageBody,
    onClose,
    onEditorStateChange,
    onTextTooLong
  } = props;
  const candidateConversations = (0, import_conversations.getAllComposableConversations)(state);
  const recentEmojis = (0, import_emojis.selectRecentEmojis)(state);
  const skinTone = (0, import_items.getEmojiSkinTone)(state);
  const linkPreviewForSource = (0, import_linkPreviews.getLinkPreview)(state);
  return {
    attachments,
    candidateConversations,
    doForwardMessage,
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    hasContact,
    i18n: (0, import_user.getIntl)(state),
    isSticker,
    linkPreview: linkPreviewForSource(import_LinkPreview.LinkPreviewSourceType.ForwardMessageModal),
    messageBody,
    onClose,
    onEditorStateChange,
    recentEmojis,
    skinTone,
    onTextTooLong,
    theme: (0, import_user.getTheme)(state),
    regionCode: (0, import_user.getRegionCode)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, {
  ...import_actions.mapDispatchToProps,
  onPickEmoji: import_actions.mapDispatchToProps.onUseEmoji
});
const SmartForwardMessageModal = smart(import_ForwardMessageModal.ForwardMessageModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartForwardMessageModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRm9yd2FyZE1lc3NhZ2VNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgQm9keVJhbmdlVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBEYXRhUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Gb3J3YXJkTWVzc2FnZU1vZGFsJztcbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IEZvcndhcmRNZXNzYWdlTW9kYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0ZvcndhcmRNZXNzYWdlTW9kYWwnO1xuaW1wb3J0IHsgTGlua1ByZXZpZXdTb3VyY2VUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTGlua1ByZXZpZXcnO1xuaW1wb3J0IHsgZ2V0QWxsQ29tcG9zYWJsZUNvbnZlcnNhdGlvbnMgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRFbW9qaVNraW5Ub25lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB7IGdldEludGwsIGdldFRoZW1lLCBnZXRSZWdpb25Db2RlIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgZ2V0TGlua1ByZXZpZXcgfSBmcm9tICcuLi9zZWxlY3RvcnMvbGlua1ByZXZpZXdzJztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgc2VsZWN0UmVjZW50RW1vamlzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2Vtb2ppcyc7XG5cbmV4cG9ydCB0eXBlIFNtYXJ0Rm9yd2FyZE1lc3NhZ2VNb2RhbFByb3BzID0ge1xuICBhdHRhY2htZW50cz86IEFycmF5PEF0dGFjaG1lbnRUeXBlPjtcbiAgZG9Gb3J3YXJkTWVzc2FnZTogKFxuICAgIHNlbGVjdGVkQ29udGFjdHM6IEFycmF5PHN0cmluZz4sXG4gICAgbWVzc2FnZUJvZHk/OiBzdHJpbmcsXG4gICAgYXR0YWNobWVudHM/OiBBcnJheTxBdHRhY2htZW50VHlwZT4sXG4gICAgbGlua1ByZXZpZXc/OiBMaW5rUHJldmlld1R5cGVcbiAgKSA9PiB2b2lkO1xuICBoYXNDb250YWN0OiBib29sZWFuO1xuICBpc1N0aWNrZXI6IGJvb2xlYW47XG4gIG1lc3NhZ2VCb2R5Pzogc3RyaW5nO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBvbkVkaXRvclN0YXRlQ2hhbmdlOiAoXG4gICAgbWVzc2FnZVRleHQ6IHN0cmluZyxcbiAgICBib2R5UmFuZ2VzOiBBcnJheTxCb2R5UmFuZ2VUeXBlPixcbiAgICBjYXJldExvY2F0aW9uPzogbnVtYmVyXG4gICkgPT4gdW5rbm93bjtcbiAgb25UZXh0VG9vTG9uZzogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgcHJvcHM6IFNtYXJ0Rm9yd2FyZE1lc3NhZ2VNb2RhbFByb3BzXG4pOiBEYXRhUHJvcHNUeXBlID0+IHtcbiAgY29uc3Qge1xuICAgIGF0dGFjaG1lbnRzLFxuICAgIGRvRm9yd2FyZE1lc3NhZ2UsXG4gICAgaGFzQ29udGFjdCxcbiAgICBpc1N0aWNrZXIsXG4gICAgbWVzc2FnZUJvZHksXG4gICAgb25DbG9zZSxcbiAgICBvbkVkaXRvclN0YXRlQ2hhbmdlLFxuICAgIG9uVGV4dFRvb0xvbmcsXG4gIH0gPSBwcm9wcztcblxuICBjb25zdCBjYW5kaWRhdGVDb252ZXJzYXRpb25zID0gZ2V0QWxsQ29tcG9zYWJsZUNvbnZlcnNhdGlvbnMoc3RhdGUpO1xuICBjb25zdCByZWNlbnRFbW9qaXMgPSBzZWxlY3RSZWNlbnRFbW9qaXMoc3RhdGUpO1xuICBjb25zdCBza2luVG9uZSA9IGdldEVtb2ppU2tpblRvbmUoc3RhdGUpO1xuICBjb25zdCBsaW5rUHJldmlld0ZvclNvdXJjZSA9IGdldExpbmtQcmV2aWV3KHN0YXRlKTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFjaG1lbnRzLFxuICAgIGNhbmRpZGF0ZUNvbnZlcnNhdGlvbnMsXG4gICAgZG9Gb3J3YXJkTWVzc2FnZSxcbiAgICBnZXRQcmVmZXJyZWRCYWRnZTogZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSksXG4gICAgaGFzQ29udGFjdCxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICBpc1N0aWNrZXIsXG4gICAgbGlua1ByZXZpZXc6IGxpbmtQcmV2aWV3Rm9yU291cmNlKFxuICAgICAgTGlua1ByZXZpZXdTb3VyY2VUeXBlLkZvcndhcmRNZXNzYWdlTW9kYWxcbiAgICApLFxuICAgIG1lc3NhZ2VCb2R5LFxuICAgIG9uQ2xvc2UsXG4gICAgb25FZGl0b3JTdGF0ZUNoYW5nZSxcbiAgICByZWNlbnRFbW9qaXMsXG4gICAgc2tpblRvbmUsXG4gICAgb25UZXh0VG9vTG9uZyxcbiAgICB0aGVtZTogZ2V0VGhlbWUoc3RhdGUpLFxuICAgIHJlZ2lvbkNvZGU6IGdldFJlZ2lvbkNvZGUoc3RhdGUpLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge1xuICAuLi5tYXBEaXNwYXRjaFRvUHJvcHMsXG4gIG9uUGlja0Vtb2ppOiBtYXBEaXNwYXRjaFRvUHJvcHMub25Vc2VFbW9qaSxcbn0pO1xuXG5leHBvcnQgY29uc3QgU21hcnRGb3J3YXJkTWVzc2FnZU1vZGFsID0gc21hcnQoRm9yd2FyZE1lc3NhZ2VNb2RhbCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBTXhCLGlDQUFvQztBQUNwQyx5QkFBc0M7QUFDdEMsMkJBQThDO0FBQzlDLG1CQUFpQztBQUNqQyxrQkFBaUQ7QUFDakQsMEJBQStCO0FBQy9CLG9CQUEwQztBQUMxQyxxQkFBbUM7QUFDbkMsb0JBQW1DO0FBc0JuQyxNQUFNLGtCQUFrQix3QkFDdEIsT0FDQSxVQUNrQjtBQUNsQixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBRUosUUFBTSx5QkFBeUIsd0RBQThCLEtBQUs7QUFDbEUsUUFBTSxlQUFlLHNDQUFtQixLQUFLO0FBQzdDLFFBQU0sV0FBVyxtQ0FBaUIsS0FBSztBQUN2QyxRQUFNLHVCQUF1Qix3Q0FBZSxLQUFLO0FBRWpELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQiw2Q0FBMEIsS0FBSztBQUFBLElBQ2xEO0FBQUEsSUFDQSxNQUFNLHlCQUFRLEtBQUs7QUFBQSxJQUNuQjtBQUFBLElBQ0EsYUFBYSxxQkFDWCx5Q0FBc0IsbUJBQ3hCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxPQUFPLDBCQUFTLEtBQUs7QUFBQSxJQUNyQixZQUFZLCtCQUFjLEtBQUs7QUFBQSxFQUNqQztBQUNGLEdBeEN3QjtBQTBDeEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQjtBQUFBLEtBQ2xDO0FBQUEsRUFDSCxhQUFhLGtDQUFtQjtBQUNsQyxDQUFDO0FBRU0sTUFBTSwyQkFBMkIsTUFBTSw4Q0FBbUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
