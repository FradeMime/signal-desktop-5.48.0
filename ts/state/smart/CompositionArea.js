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
var CompositionArea_exports = {};
__export(CompositionArea_exports, {
  SmartCompositionArea: () => SmartCompositionArea
});
module.exports = __toCommonJS(CompositionArea_exports);
var import_react_redux = require("react-redux");
var import_lodash = require("lodash");
var import_actions = require("../actions");
var import_CompositionArea = require("../../components/CompositionArea");
var import_isConversationSMSOnly = require("../../util/isConversationSMSOnly");
var import_dropNull = require("../../util/dropNull");
var import_badges = require("../selectors/badges");
var import_emojis = require("../selectors/emojis");
var import_user = require("../selectors/user");
var import_items = require("../selectors/items");
var import_conversations = require("../selectors/conversations");
var import_message = require("../selectors/message");
var import_stickers = require("../selectors/stickers");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const { id, handleClickQuotedMessage } = props;
  const conversationSelector = (0, import_conversations.getConversationSelector)(state);
  const conversation = conversationSelector(id);
  if (!conversation) {
    throw new Error(`Conversation id ${id} not found!`);
  }
  const { announcementsOnly, areWeAdmin, draftText, draftBodyRanges } = conversation;
  const receivedPacks = (0, import_stickers.getReceivedStickerPacks)(state);
  const installedPacks = (0, import_stickers.getInstalledStickerPacks)(state);
  const blessedPacks = (0, import_stickers.getBlessedStickerPacks)(state);
  const knownPacks = (0, import_stickers.getKnownStickerPacks)(state);
  const installedPack = (0, import_stickers.getRecentlyInstalledStickerPack)(state);
  const recentStickers = (0, import_stickers.getRecentStickers)(state);
  const showIntroduction = (0, import_lodash.get)(state.items, ["showStickersIntroduction"], false);
  const showPickerHint = Boolean((0, import_lodash.get)(state.items, ["showStickerPickerHint"], false) && receivedPacks.length > 0);
  const {
    attachments: draftAttachments,
    linkPreviewLoading,
    linkPreviewResult,
    quotedMessage,
    shouldSendHighQualityAttachments
  } = state.composer;
  const recentEmojis = (0, import_emojis.selectRecentEmojis)(state);
  return {
    conversationId: id,
    i18n: (0, import_user.getIntl)(state),
    theme: (0, import_user.getTheme)(state),
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    errorDialogAudioRecorderType: state.audioRecorder.errorDialogAudioRecorderType,
    recordingState: state.audioRecorder.recordingState,
    draftAttachments,
    shouldSendHighQualityAttachments,
    linkPreviewLoading,
    linkPreviewResult,
    quotedMessageProps: quotedMessage ? (0, import_message.getPropsForQuote)(quotedMessage, {
      conversationSelector,
      ourConversationId: (0, import_user.getUserConversationId)(state)
    }) : void 0,
    onClickQuotedMessage: () => {
      const messageId = quotedMessage?.quote?.messageId;
      if (messageId) {
        handleClickQuotedMessage(messageId);
      }
    },
    recentEmojis,
    skinTone: (0, import_items.getEmojiSkinTone)(state),
    receivedPacks,
    installedPack,
    blessedPacks,
    knownPacks,
    installedPacks,
    recentStickers,
    showIntroduction,
    showPickerHint,
    ...conversation,
    conversationType: conversation.type,
    isSMSOnly: Boolean((0, import_isConversationSMSOnly.isConversationSMSOnly)(conversation)),
    isFetchingUUID: conversation.isFetchingUUID,
    isMissingMandatoryProfileSharing: (0, import_conversations.isMissingRequiredProfileSharing)(conversation),
    announcementsOnly,
    areWeAdmin,
    groupAdmins: (0, import_conversations.getGroupAdminsSelector)(state)(conversation.id),
    draftText: (0, import_dropNull.dropNull)(draftText),
    draftBodyRanges
  };
}, "mapStateToProps");
const dispatchPropsMap = {
  ...import_actions.mapDispatchToProps,
  onSetSkinTone: (tone) => import_actions.mapDispatchToProps.putItem("skinTone", tone),
  clearShowIntroduction: () => import_actions.mapDispatchToProps.removeItem("showStickersIntroduction"),
  clearShowPickerHint: () => import_actions.mapDispatchToProps.removeItem("showStickerPickerHint"),
  onPickEmoji: import_actions.mapDispatchToProps.onUseEmoji
};
const smart = (0, import_react_redux.connect)(mapStateToProps, dispatchPropsMap);
const SmartCompositionArea = smart(import_CompositionArea.CompositionArea);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCompositionArea
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29tcG9zaXRpb25BcmVhLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIENvbXBvbmVudFByb3BzVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ29tcG9zaXRpb25BcmVhJztcbmltcG9ydCB7IENvbXBvc2l0aW9uQXJlYSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ29tcG9zaXRpb25BcmVhJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvblNNU09ubHkgfSBmcm9tICcuLi8uLi91dGlsL2lzQ29udmVyc2F0aW9uU01TT25seSc7XG5pbXBvcnQgeyBkcm9wTnVsbCB9IGZyb20gJy4uLy4uL3V0aWwvZHJvcE51bGwnO1xuXG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBzZWxlY3RSZWNlbnRFbW9qaXMgfSBmcm9tICcuLi9zZWxlY3RvcnMvZW1vamlzJztcbmltcG9ydCB7IGdldEludGwsIGdldFRoZW1lLCBnZXRVc2VyQ29udmVyc2F0aW9uSWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRFbW9qaVNraW5Ub25lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB7XG4gIGdldENvbnZlcnNhdGlvblNlbGVjdG9yLFxuICBnZXRHcm91cEFkbWluc1NlbGVjdG9yLFxuICBpc01pc3NpbmdSZXF1aXJlZFByb2ZpbGVTaGFyaW5nLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRQcm9wc0ZvclF1b3RlIH0gZnJvbSAnLi4vc2VsZWN0b3JzL21lc3NhZ2UnO1xuaW1wb3J0IHtcbiAgZ2V0Qmxlc3NlZFN0aWNrZXJQYWNrcyxcbiAgZ2V0SW5zdGFsbGVkU3RpY2tlclBhY2tzLFxuICBnZXRLbm93blN0aWNrZXJQYWNrcyxcbiAgZ2V0UmVjZWl2ZWRTdGlja2VyUGFja3MsXG4gIGdldFJlY2VudGx5SW5zdGFsbGVkU3RpY2tlclBhY2ssXG4gIGdldFJlY2VudFN0aWNrZXJzLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvc3RpY2tlcnMnO1xuXG50eXBlIEV4dGVybmFsUHJvcHMgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGhhbmRsZUNsaWNrUXVvdGVkTWVzc2FnZTogKGlkOiBzdHJpbmcpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgdHlwZSBDb21wb3NpdGlvbkFyZWFQcm9wc1R5cGUgPSBFeHRlcm5hbFByb3BzICYgQ29tcG9uZW50UHJvcHNUeXBlO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IEV4dGVybmFsUHJvcHMpID0+IHtcbiAgY29uc3QgeyBpZCwgaGFuZGxlQ2xpY2tRdW90ZWRNZXNzYWdlIH0gPSBwcm9wcztcblxuICBjb25zdCBjb252ZXJzYXRpb25TZWxlY3RvciA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKTtcbiAgY29uc3QgY29udmVyc2F0aW9uID0gY29udmVyc2F0aW9uU2VsZWN0b3IoaWQpO1xuICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ29udmVyc2F0aW9uIGlkICR7aWR9IG5vdCBmb3VuZCFgKTtcbiAgfVxuXG4gIGNvbnN0IHsgYW5ub3VuY2VtZW50c09ubHksIGFyZVdlQWRtaW4sIGRyYWZ0VGV4dCwgZHJhZnRCb2R5UmFuZ2VzIH0gPVxuICAgIGNvbnZlcnNhdGlvbjtcblxuICBjb25zdCByZWNlaXZlZFBhY2tzID0gZ2V0UmVjZWl2ZWRTdGlja2VyUGFja3Moc3RhdGUpO1xuICBjb25zdCBpbnN0YWxsZWRQYWNrcyA9IGdldEluc3RhbGxlZFN0aWNrZXJQYWNrcyhzdGF0ZSk7XG4gIGNvbnN0IGJsZXNzZWRQYWNrcyA9IGdldEJsZXNzZWRTdGlja2VyUGFja3Moc3RhdGUpO1xuICBjb25zdCBrbm93blBhY2tzID0gZ2V0S25vd25TdGlja2VyUGFja3Moc3RhdGUpO1xuXG4gIGNvbnN0IGluc3RhbGxlZFBhY2sgPSBnZXRSZWNlbnRseUluc3RhbGxlZFN0aWNrZXJQYWNrKHN0YXRlKTtcblxuICBjb25zdCByZWNlbnRTdGlja2VycyA9IGdldFJlY2VudFN0aWNrZXJzKHN0YXRlKTtcbiAgY29uc3Qgc2hvd0ludHJvZHVjdGlvbiA9IGdldChcbiAgICBzdGF0ZS5pdGVtcyxcbiAgICBbJ3Nob3dTdGlja2Vyc0ludHJvZHVjdGlvbiddLFxuICAgIGZhbHNlXG4gICk7XG4gIGNvbnN0IHNob3dQaWNrZXJIaW50ID0gQm9vbGVhbihcbiAgICBnZXQoc3RhdGUuaXRlbXMsIFsnc2hvd1N0aWNrZXJQaWNrZXJIaW50J10sIGZhbHNlKSAmJlxuICAgICAgcmVjZWl2ZWRQYWNrcy5sZW5ndGggPiAwXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGF0dGFjaG1lbnRzOiBkcmFmdEF0dGFjaG1lbnRzLFxuICAgIGxpbmtQcmV2aWV3TG9hZGluZyxcbiAgICBsaW5rUHJldmlld1Jlc3VsdCxcbiAgICBxdW90ZWRNZXNzYWdlLFxuICAgIHNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzLFxuICB9ID0gc3RhdGUuY29tcG9zZXI7XG5cbiAgY29uc3QgcmVjZW50RW1vamlzID0gc2VsZWN0UmVjZW50RW1vamlzKHN0YXRlKTtcblxuICByZXR1cm4ge1xuICAgIC8vIEJhc2VcbiAgICBjb252ZXJzYXRpb25JZDogaWQsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgdGhlbWU6IGdldFRoZW1lKHN0YXRlKSxcbiAgICBnZXRQcmVmZXJyZWRCYWRnZTogZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSksXG4gICAgLy8gQXVkaW9DYXB0dXJlXG4gICAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZTpcbiAgICAgIHN0YXRlLmF1ZGlvUmVjb3JkZXIuZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZSxcbiAgICByZWNvcmRpbmdTdGF0ZTogc3RhdGUuYXVkaW9SZWNvcmRlci5yZWNvcmRpbmdTdGF0ZSxcbiAgICAvLyBBdHRhY2htZW50c0xpc3RcbiAgICBkcmFmdEF0dGFjaG1lbnRzLFxuICAgIC8vIE1lZGlhUXVhbGl0eVNlbGVjdG9yXG4gICAgc2hvdWxkU2VuZEhpZ2hRdWFsaXR5QXR0YWNobWVudHMsXG4gICAgLy8gU3RhZ2VkTGlua1ByZXZpZXdcbiAgICBsaW5rUHJldmlld0xvYWRpbmcsXG4gICAgbGlua1ByZXZpZXdSZXN1bHQsXG4gICAgLy8gUXVvdGVcbiAgICBxdW90ZWRNZXNzYWdlUHJvcHM6IHF1b3RlZE1lc3NhZ2VcbiAgICAgID8gZ2V0UHJvcHNGb3JRdW90ZShxdW90ZWRNZXNzYWdlLCB7XG4gICAgICAgICAgY29udmVyc2F0aW9uU2VsZWN0b3IsXG4gICAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6IGdldFVzZXJDb252ZXJzYXRpb25JZChzdGF0ZSksXG4gICAgICAgIH0pXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBvbkNsaWNrUXVvdGVkTWVzc2FnZTogKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZUlkID0gcXVvdGVkTWVzc2FnZT8ucXVvdGU/Lm1lc3NhZ2VJZDtcbiAgICAgIGlmIChtZXNzYWdlSWQpIHtcbiAgICAgICAgaGFuZGxlQ2xpY2tRdW90ZWRNZXNzYWdlKG1lc3NhZ2VJZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBFbW9qaXNcbiAgICByZWNlbnRFbW9qaXMsXG4gICAgc2tpblRvbmU6IGdldEVtb2ppU2tpblRvbmUoc3RhdGUpLFxuICAgIC8vIFN0aWNrZXJzXG4gICAgcmVjZWl2ZWRQYWNrcyxcbiAgICBpbnN0YWxsZWRQYWNrLFxuICAgIGJsZXNzZWRQYWNrcyxcbiAgICBrbm93blBhY2tzLFxuICAgIGluc3RhbGxlZFBhY2tzLFxuICAgIHJlY2VudFN0aWNrZXJzLFxuICAgIHNob3dJbnRyb2R1Y3Rpb24sXG4gICAgc2hvd1BpY2tlckhpbnQsXG4gICAgLy8gTWVzc2FnZSBSZXF1ZXN0c1xuICAgIC4uLmNvbnZlcnNhdGlvbixcbiAgICBjb252ZXJzYXRpb25UeXBlOiBjb252ZXJzYXRpb24udHlwZSxcbiAgICBpc1NNU09ubHk6IEJvb2xlYW4oaXNDb252ZXJzYXRpb25TTVNPbmx5KGNvbnZlcnNhdGlvbikpLFxuICAgIGlzRmV0Y2hpbmdVVUlEOiBjb252ZXJzYXRpb24uaXNGZXRjaGluZ1VVSUQsXG4gICAgaXNNaXNzaW5nTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmc6XG4gICAgICBpc01pc3NpbmdSZXF1aXJlZFByb2ZpbGVTaGFyaW5nKGNvbnZlcnNhdGlvbiksXG4gICAgLy8gR3JvdXBzXG4gICAgYW5ub3VuY2VtZW50c09ubHksXG4gICAgYXJlV2VBZG1pbixcbiAgICBncm91cEFkbWluczogZ2V0R3JvdXBBZG1pbnNTZWxlY3RvcihzdGF0ZSkoY29udmVyc2F0aW9uLmlkKSxcblxuICAgIGRyYWZ0VGV4dDogZHJvcE51bGwoZHJhZnRUZXh0KSxcbiAgICBkcmFmdEJvZHlSYW5nZXMsXG4gIH07XG59O1xuXG5jb25zdCBkaXNwYXRjaFByb3BzTWFwID0ge1xuICAuLi5tYXBEaXNwYXRjaFRvUHJvcHMsXG4gIG9uU2V0U2tpblRvbmU6ICh0b25lOiBudW1iZXIpID0+IG1hcERpc3BhdGNoVG9Qcm9wcy5wdXRJdGVtKCdza2luVG9uZScsIHRvbmUpLFxuICBjbGVhclNob3dJbnRyb2R1Y3Rpb246ICgpID0+XG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzLnJlbW92ZUl0ZW0oJ3Nob3dTdGlja2Vyc0ludHJvZHVjdGlvbicpLFxuICBjbGVhclNob3dQaWNrZXJIaW50OiAoKSA9PlxuICAgIG1hcERpc3BhdGNoVG9Qcm9wcy5yZW1vdmVJdGVtKCdzaG93U3RpY2tlclBpY2tlckhpbnQnKSxcbiAgb25QaWNrRW1vamk6IG1hcERpc3BhdGNoVG9Qcm9wcy5vblVzZUVtb2ppLFxufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgZGlzcGF0Y2hQcm9wc01hcCk7XG5cbmV4cG9ydCBjb25zdCBTbWFydENvbXBvc2l0aW9uQXJlYSA9IHNtYXJ0KENvbXBvc2l0aW9uQXJlYSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLG9CQUFvQjtBQUNwQixxQkFBbUM7QUFFbkMsNkJBQWdDO0FBRWhDLG1DQUFzQztBQUN0QyxzQkFBeUI7QUFFekIsb0JBQTBDO0FBQzFDLG9CQUFtQztBQUNuQyxrQkFBeUQ7QUFDekQsbUJBQWlDO0FBQ2pDLDJCQUlPO0FBQ1AscUJBQWlDO0FBQ2pDLHNCQU9PO0FBU1AsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsVUFBeUI7QUFDbEUsUUFBTSxFQUFFLElBQUksNkJBQTZCO0FBRXpDLFFBQU0sdUJBQXVCLGtEQUF3QixLQUFLO0FBQzFELFFBQU0sZUFBZSxxQkFBcUIsRUFBRTtBQUM1QyxNQUFJLENBQUMsY0FBYztBQUNqQixVQUFNLElBQUksTUFBTSxtQkFBbUIsZUFBZTtBQUFBLEVBQ3BEO0FBRUEsUUFBTSxFQUFFLG1CQUFtQixZQUFZLFdBQVcsb0JBQ2hEO0FBRUYsUUFBTSxnQkFBZ0IsNkNBQXdCLEtBQUs7QUFDbkQsUUFBTSxpQkFBaUIsOENBQXlCLEtBQUs7QUFDckQsUUFBTSxlQUFlLDRDQUF1QixLQUFLO0FBQ2pELFFBQU0sYUFBYSwwQ0FBcUIsS0FBSztBQUU3QyxRQUFNLGdCQUFnQixxREFBZ0MsS0FBSztBQUUzRCxRQUFNLGlCQUFpQix1Q0FBa0IsS0FBSztBQUM5QyxRQUFNLG1CQUFtQix1QkFDdkIsTUFBTSxPQUNOLENBQUMsMEJBQTBCLEdBQzNCLEtBQ0Y7QUFDQSxRQUFNLGlCQUFpQixRQUNyQix1QkFBSSxNQUFNLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLEtBQy9DLGNBQWMsU0FBUyxDQUMzQjtBQUVBLFFBQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBRVYsUUFBTSxlQUFlLHNDQUFtQixLQUFLO0FBRTdDLFNBQU87QUFBQSxJQUVMLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CLE9BQU8sMEJBQVMsS0FBSztBQUFBLElBQ3JCLG1CQUFtQiw2Q0FBMEIsS0FBSztBQUFBLElBRWxELDhCQUNFLE1BQU0sY0FBYztBQUFBLElBQ3RCLGdCQUFnQixNQUFNLGNBQWM7QUFBQSxJQUVwQztBQUFBLElBRUE7QUFBQSxJQUVBO0FBQUEsSUFDQTtBQUFBLElBRUEsb0JBQW9CLGdCQUNoQixxQ0FBaUIsZUFBZTtBQUFBLE1BQzlCO0FBQUEsTUFDQSxtQkFBbUIsdUNBQXNCLEtBQUs7QUFBQSxJQUNoRCxDQUFDLElBQ0Q7QUFBQSxJQUNKLHNCQUFzQixNQUFNO0FBQzFCLFlBQU0sWUFBWSxlQUFlLE9BQU87QUFDeEMsVUFBSSxXQUFXO0FBQ2IsaUNBQXlCLFNBQVM7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxJQUVBO0FBQUEsSUFDQSxVQUFVLG1DQUFpQixLQUFLO0FBQUEsSUFFaEM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsT0FFRztBQUFBLElBQ0gsa0JBQWtCLGFBQWE7QUFBQSxJQUMvQixXQUFXLFFBQVEsd0RBQXNCLFlBQVksQ0FBQztBQUFBLElBQ3RELGdCQUFnQixhQUFhO0FBQUEsSUFDN0Isa0NBQ0UsMERBQWdDLFlBQVk7QUFBQSxJQUU5QztBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQWEsaURBQXVCLEtBQUssRUFBRSxhQUFhLEVBQUU7QUFBQSxJQUUxRCxXQUFXLDhCQUFTLFNBQVM7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFDRixHQWpHd0I7QUFtR3hCLE1BQU0sbUJBQW1CO0FBQUEsS0FDcEI7QUFBQSxFQUNILGVBQWUsQ0FBQyxTQUFpQixrQ0FBbUIsUUFBUSxZQUFZLElBQUk7QUFBQSxFQUM1RSx1QkFBdUIsTUFDckIsa0NBQW1CLFdBQVcsMEJBQTBCO0FBQUEsRUFDMUQscUJBQXFCLE1BQ25CLGtDQUFtQixXQUFXLHVCQUF1QjtBQUFBLEVBQ3ZELGFBQWEsa0NBQW1CO0FBQ2xDO0FBRUEsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixnQkFBZ0I7QUFFaEQsTUFBTSx1QkFBdUIsTUFBTSxzQ0FBZTsiLAogICJuYW1lcyI6IFtdCn0K