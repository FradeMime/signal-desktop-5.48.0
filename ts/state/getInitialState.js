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
var getInitialState_exports = {};
__export(getInitialState_exports, {
  getInitialState: () => getInitialState
});
module.exports = __toCommonJS(getInitialState_exports);
var import_accounts = require("./ducks/accounts");
var import_app = require("./ducks/app");
var import_audioPlayer = require("./ducks/audioPlayer");
var import_audioRecorder = require("./ducks/audioRecorder");
var import_calling = require("./ducks/calling");
var import_composer = require("./ducks/composer");
var import_conversations = require("./ducks/conversations");
var import_crashReports = require("./ducks/crashReports");
var import_expiration = require("./ducks/expiration");
var import_globalModals = require("./ducks/globalModals");
var import_linkPreviews = require("./ducks/linkPreviews");
var import_network = require("./ducks/network");
var import_preferredReactions = require("./ducks/preferredReactions");
var import_safetyNumber = require("./ducks/safetyNumber");
var import_search = require("./ducks/search");
var import_stories = require("./ducks/stories");
var import_updates = require("./ducks/updates");
var import_user = require("./ducks/user");
var import_Stickers = require("../types/Stickers");
var import_loadRecentEmojis = require("../util/loadRecentEmojis");
function getInitialState({
  badges,
  stories,
  mainWindowStats,
  menuOptions
}) {
  const items = window.storage.getItemsState();
  const convoCollection = window.getConversations();
  const formattedConversations = convoCollection.map((conversation) => conversation.format());
  const ourNumber = window.textsecure.storage.user.getNumber();
  const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
  const ourConversationId = window.ConversationController.getOurConversationId();
  const ourDeviceId = window.textsecure.storage.user.getDeviceId();
  const themeSetting = window.Events.getThemeSetting();
  const theme = themeSetting === "system" ? window.systemTheme : themeSetting;
  return {
    accounts: (0, import_accounts.getEmptyState)(),
    app: (0, import_app.getEmptyState)(),
    audioPlayer: (0, import_audioPlayer.getEmptyState)(),
    audioRecorder: (0, import_audioRecorder.getEmptyState)(),
    badges,
    calling: (0, import_calling.getEmptyState)(),
    composer: (0, import_composer.getEmptyState)(),
    conversations: {
      ...(0, import_conversations.getEmptyState)(),
      conversationLookup: window.Signal.Util.makeLookup(formattedConversations, "id"),
      conversationsByE164: window.Signal.Util.makeLookup(formattedConversations, "e164"),
      conversationsByUuid: window.Signal.Util.makeLookup(formattedConversations, "uuid"),
      conversationsByGroupId: window.Signal.Util.makeLookup(formattedConversations, "groupId"),
      conversationsByUsername: window.Signal.Util.makeLookup(formattedConversations, "username")
    },
    crashReports: (0, import_crashReports.getEmptyState)(),
    emojis: (0, import_loadRecentEmojis.getEmojiReducerState)(),
    expiration: (0, import_expiration.getEmptyState)(),
    globalModals: (0, import_globalModals.getEmptyState)(),
    items,
    linkPreviews: (0, import_linkPreviews.getEmptyState)(),
    network: (0, import_network.getEmptyState)(),
    preferredReactions: (0, import_preferredReactions.getEmptyState)(),
    safetyNumber: (0, import_safetyNumber.getEmptyState)(),
    search: (0, import_search.getEmptyState)(),
    stickers: (0, import_Stickers.getInitialState)(),
    stories: {
      ...(0, import_stories.getEmptyState)(),
      stories
    },
    updates: (0, import_updates.getEmptyState)(),
    user: {
      ...(0, import_user.getEmptyState)(),
      attachmentsPath: window.baseAttachmentsPath,
      stickersPath: window.baseStickersPath,
      tempPath: window.baseTempPath,
      regionCode: window.storage.get("regionCode"),
      ourConversationId,
      ourDeviceId,
      ourNumber,
      ourUuid,
      platform: window.platform,
      i18n: window.i18n,
      localeMessages: window.SignalContext.localeMessages,
      interactionMode: window.getInteractionMode(),
      theme,
      version: window.getVersion(),
      isMainWindowMaximized: mainWindowStats.isMaximized,
      isMainWindowFullScreen: mainWindowStats.isFullScreen,
      menuOptions
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInitialState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SW5pdGlhbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgYWNjb3VudHMgfSBmcm9tICcuL2R1Y2tzL2FjY291bnRzJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgYXBwIH0gZnJvbSAnLi9kdWNrcy9hcHAnO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSBhcyBhdWRpb1BsYXllciB9IGZyb20gJy4vZHVja3MvYXVkaW9QbGF5ZXInO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSBhcyBhdWRpb1JlY29yZGVyIH0gZnJvbSAnLi9kdWNrcy9hdWRpb1JlY29yZGVyJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgY2FsbGluZyB9IGZyb20gJy4vZHVja3MvY2FsbGluZyc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIGNvbXBvc2VyIH0gZnJvbSAnLi9kdWNrcy9jb21wb3Nlcic7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIGNvbnZlcnNhdGlvbnMgfSBmcm9tICcuL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSBhcyBjcmFzaFJlcG9ydHMgfSBmcm9tICcuL2R1Y2tzL2NyYXNoUmVwb3J0cyc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIGV4cGlyYXRpb24gfSBmcm9tICcuL2R1Y2tzL2V4cGlyYXRpb24nO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSBhcyBnbG9iYWxNb2RhbHMgfSBmcm9tICcuL2R1Y2tzL2dsb2JhbE1vZGFscyc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIGxpbmtQcmV2aWV3cyB9IGZyb20gJy4vZHVja3MvbGlua1ByZXZpZXdzJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgbmV0d29yayB9IGZyb20gJy4vZHVja3MvbmV0d29yayc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIHByZWZlcnJlZFJlYWN0aW9ucyB9IGZyb20gJy4vZHVja3MvcHJlZmVycmVkUmVhY3Rpb25zJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgc2FmZXR5TnVtYmVyIH0gZnJvbSAnLi9kdWNrcy9zYWZldHlOdW1iZXInO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSBhcyBzZWFyY2ggfSBmcm9tICcuL2R1Y2tzL3NlYXJjaCc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIGdldFN0b3JpZXNFbXB0eVN0YXRlIH0gZnJvbSAnLi9kdWNrcy9zdG9yaWVzJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgdXBkYXRlcyB9IGZyb20gJy4vZHVja3MvdXBkYXRlcyc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIHVzZXIgfSBmcm9tICcuL2R1Y2tzL3VzZXInO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4vcmVkdWNlcic7XG5cbmltcG9ydCB0eXBlIHsgQmFkZ2VzU3RhdGVUeXBlIH0gZnJvbSAnLi9kdWNrcy9iYWRnZXMnO1xuaW1wb3J0IHR5cGUgeyBTdG9yeURhdGFUeXBlIH0gZnJvbSAnLi9kdWNrcy9zdG9yaWVzJztcbmltcG9ydCB7IGdldEluaXRpYWxTdGF0ZSBhcyBzdGlja2VycyB9IGZyb20gJy4uL3R5cGVzL1N0aWNrZXJzJztcbmltcG9ydCB0eXBlIHsgTWVudU9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vdHlwZXMvbWVudSc7XG5pbXBvcnQgeyBnZXRFbW9qaVJlZHVjZXJTdGF0ZSBhcyBlbW9qaXMgfSBmcm9tICcuLi91dGlsL2xvYWRSZWNlbnRFbW9qaXMnO1xuaW1wb3J0IHR5cGUgeyBNYWluV2luZG93U3RhdHNUeXBlIH0gZnJvbSAnLi4vd2luZG93cy9jb250ZXh0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSh7XG4gIGJhZGdlcyxcbiAgc3RvcmllcyxcbiAgbWFpbldpbmRvd1N0YXRzLFxuICBtZW51T3B0aW9ucyxcbn06IHtcbiAgYmFkZ2VzOiBCYWRnZXNTdGF0ZVR5cGU7XG4gIHN0b3JpZXM6IEFycmF5PFN0b3J5RGF0YVR5cGU+O1xuICBtYWluV2luZG93U3RhdHM6IE1haW5XaW5kb3dTdGF0c1R5cGU7XG4gIG1lbnVPcHRpb25zOiBNZW51T3B0aW9uc1R5cGU7XG59KTogU3RhdGVUeXBlIHtcbiAgY29uc3QgaXRlbXMgPSB3aW5kb3cuc3RvcmFnZS5nZXRJdGVtc1N0YXRlKCk7XG5cbiAgY29uc3QgY29udm9Db2xsZWN0aW9uID0gd2luZG93LmdldENvbnZlcnNhdGlvbnMoKTtcbiAgY29uc3QgZm9ybWF0dGVkQ29udmVyc2F0aW9ucyA9IGNvbnZvQ29sbGVjdGlvbi5tYXAoY29udmVyc2F0aW9uID0+XG4gICAgY29udmVyc2F0aW9uLmZvcm1hdCgpXG4gICk7XG4gIGNvbnN0IG91ck51bWJlciA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXROdW1iZXIoKTtcbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkKCk/LnRvU3RyaW5nKCk7XG4gIGNvbnN0IG91ckNvbnZlcnNhdGlvbklkID1cbiAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25JZCgpO1xuICBjb25zdCBvdXJEZXZpY2VJZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpO1xuXG4gIGNvbnN0IHRoZW1lU2V0dGluZyA9IHdpbmRvdy5FdmVudHMuZ2V0VGhlbWVTZXR0aW5nKCk7XG4gIGNvbnN0IHRoZW1lID0gdGhlbWVTZXR0aW5nID09PSAnc3lzdGVtJyA/IHdpbmRvdy5zeXN0ZW1UaGVtZSA6IHRoZW1lU2V0dGluZztcblxuICByZXR1cm4ge1xuICAgIGFjY291bnRzOiBhY2NvdW50cygpLFxuICAgIGFwcDogYXBwKCksXG4gICAgYXVkaW9QbGF5ZXI6IGF1ZGlvUGxheWVyKCksXG4gICAgYXVkaW9SZWNvcmRlcjogYXVkaW9SZWNvcmRlcigpLFxuICAgIGJhZGdlcyxcbiAgICBjYWxsaW5nOiBjYWxsaW5nKCksXG4gICAgY29tcG9zZXI6IGNvbXBvc2VyKCksXG4gICAgY29udmVyc2F0aW9uczoge1xuICAgICAgLi4uY29udmVyc2F0aW9ucygpLFxuICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB3aW5kb3cuU2lnbmFsLlV0aWwubWFrZUxvb2t1cChcbiAgICAgICAgZm9ybWF0dGVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgJ2lkJ1xuICAgICAgKSxcbiAgICAgIGNvbnZlcnNhdGlvbnNCeUUxNjQ6IHdpbmRvdy5TaWduYWwuVXRpbC5tYWtlTG9va3VwKFxuICAgICAgICBmb3JtYXR0ZWRDb252ZXJzYXRpb25zLFxuICAgICAgICAnZTE2NCdcbiAgICAgICksXG4gICAgICBjb252ZXJzYXRpb25zQnlVdWlkOiB3aW5kb3cuU2lnbmFsLlV0aWwubWFrZUxvb2t1cChcbiAgICAgICAgZm9ybWF0dGVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgJ3V1aWQnXG4gICAgICApLFxuICAgICAgY29udmVyc2F0aW9uc0J5R3JvdXBJZDogd2luZG93LlNpZ25hbC5VdGlsLm1ha2VMb29rdXAoXG4gICAgICAgIGZvcm1hdHRlZENvbnZlcnNhdGlvbnMsXG4gICAgICAgICdncm91cElkJ1xuICAgICAgKSxcbiAgICAgIGNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lOiB3aW5kb3cuU2lnbmFsLlV0aWwubWFrZUxvb2t1cChcbiAgICAgICAgZm9ybWF0dGVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgJ3VzZXJuYW1lJ1xuICAgICAgKSxcbiAgICB9LFxuICAgIGNyYXNoUmVwb3J0czogY3Jhc2hSZXBvcnRzKCksXG4gICAgZW1vamlzOiBlbW9qaXMoKSxcbiAgICBleHBpcmF0aW9uOiBleHBpcmF0aW9uKCksXG4gICAgZ2xvYmFsTW9kYWxzOiBnbG9iYWxNb2RhbHMoKSxcbiAgICBpdGVtcyxcbiAgICBsaW5rUHJldmlld3M6IGxpbmtQcmV2aWV3cygpLFxuICAgIG5ldHdvcms6IG5ldHdvcmsoKSxcbiAgICBwcmVmZXJyZWRSZWFjdGlvbnM6IHByZWZlcnJlZFJlYWN0aW9ucygpLFxuICAgIHNhZmV0eU51bWJlcjogc2FmZXR5TnVtYmVyKCksXG4gICAgc2VhcmNoOiBzZWFyY2goKSxcbiAgICBzdGlja2Vyczogc3RpY2tlcnMoKSxcbiAgICBzdG9yaWVzOiB7XG4gICAgICAuLi5nZXRTdG9yaWVzRW1wdHlTdGF0ZSgpLFxuICAgICAgc3RvcmllcyxcbiAgICB9LFxuICAgIHVwZGF0ZXM6IHVwZGF0ZXMoKSxcbiAgICB1c2VyOiB7XG4gICAgICAuLi51c2VyKCksXG4gICAgICBhdHRhY2htZW50c1BhdGg6IHdpbmRvdy5iYXNlQXR0YWNobWVudHNQYXRoLFxuICAgICAgc3RpY2tlcnNQYXRoOiB3aW5kb3cuYmFzZVN0aWNrZXJzUGF0aCxcbiAgICAgIHRlbXBQYXRoOiB3aW5kb3cuYmFzZVRlbXBQYXRoLFxuICAgICAgcmVnaW9uQ29kZTogd2luZG93LnN0b3JhZ2UuZ2V0KCdyZWdpb25Db2RlJyksXG4gICAgICBvdXJDb252ZXJzYXRpb25JZCxcbiAgICAgIG91ckRldmljZUlkLFxuICAgICAgb3VyTnVtYmVyLFxuICAgICAgb3VyVXVpZCxcbiAgICAgIHBsYXRmb3JtOiB3aW5kb3cucGxhdGZvcm0sXG4gICAgICBpMThuOiB3aW5kb3cuaTE4bixcbiAgICAgIGxvY2FsZU1lc3NhZ2VzOiB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2NhbGVNZXNzYWdlcyxcbiAgICAgIGludGVyYWN0aW9uTW9kZTogd2luZG93LmdldEludGVyYWN0aW9uTW9kZSgpLFxuICAgICAgdGhlbWUsXG4gICAgICB2ZXJzaW9uOiB3aW5kb3cuZ2V0VmVyc2lvbigpLFxuICAgICAgaXNNYWluV2luZG93TWF4aW1pemVkOiBtYWluV2luZG93U3RhdHMuaXNNYXhpbWl6ZWQsXG4gICAgICBpc01haW5XaW5kb3dGdWxsU2NyZWVuOiBtYWluV2luZG93U3RhdHMuaXNGdWxsU2NyZWVuLFxuICAgICAgbWVudU9wdGlvbnMsXG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBMEM7QUFDMUMsaUJBQXFDO0FBQ3JDLHlCQUE2QztBQUM3QywyQkFBK0M7QUFDL0MscUJBQXlDO0FBQ3pDLHNCQUEwQztBQUMxQywyQkFBK0M7QUFDL0MsMEJBQThDO0FBQzlDLHdCQUE0QztBQUM1QywwQkFBOEM7QUFDOUMsMEJBQThDO0FBQzlDLHFCQUF5QztBQUN6QyxnQ0FBb0Q7QUFDcEQsMEJBQThDO0FBQzlDLG9CQUF3QztBQUN4QyxxQkFBc0Q7QUFDdEQscUJBQXlDO0FBQ3pDLGtCQUFzQztBQU10QyxzQkFBNEM7QUFFNUMsOEJBQStDO0FBR3hDLHlCQUF5QjtBQUFBLEVBQzlCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FNWTtBQUNaLFFBQU0sUUFBUSxPQUFPLFFBQVEsY0FBYztBQUUzQyxRQUFNLGtCQUFrQixPQUFPLGlCQUFpQjtBQUNoRCxRQUFNLHlCQUF5QixnQkFBZ0IsSUFBSSxrQkFDakQsYUFBYSxPQUFPLENBQ3RCO0FBQ0EsUUFBTSxZQUFZLE9BQU8sV0FBVyxRQUFRLEtBQUssVUFBVTtBQUMzRCxRQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxRQUFRLEdBQUcsU0FBUztBQUNuRSxRQUFNLG9CQUNKLE9BQU8sdUJBQXVCLHFCQUFxQjtBQUNyRCxRQUFNLGNBQWMsT0FBTyxXQUFXLFFBQVEsS0FBSyxZQUFZO0FBRS9ELFFBQU0sZUFBZSxPQUFPLE9BQU8sZ0JBQWdCO0FBQ25ELFFBQU0sUUFBUSxpQkFBaUIsV0FBVyxPQUFPLGNBQWM7QUFFL0QsU0FBTztBQUFBLElBQ0wsVUFBVSxtQ0FBUztBQUFBLElBQ25CLEtBQUssOEJBQUk7QUFBQSxJQUNULGFBQWEsc0NBQVk7QUFBQSxJQUN6QixlQUFlLHdDQUFjO0FBQUEsSUFDN0I7QUFBQSxJQUNBLFNBQVMsa0NBQVE7QUFBQSxJQUNqQixVQUFVLG1DQUFTO0FBQUEsSUFDbkIsZUFBZTtBQUFBLFNBQ1Ysd0NBQWM7QUFBQSxNQUNqQixvQkFBb0IsT0FBTyxPQUFPLEtBQUssV0FDckMsd0JBQ0EsSUFDRjtBQUFBLE1BQ0EscUJBQXFCLE9BQU8sT0FBTyxLQUFLLFdBQ3RDLHdCQUNBLE1BQ0Y7QUFBQSxNQUNBLHFCQUFxQixPQUFPLE9BQU8sS0FBSyxXQUN0Qyx3QkFDQSxNQUNGO0FBQUEsTUFDQSx3QkFBd0IsT0FBTyxPQUFPLEtBQUssV0FDekMsd0JBQ0EsU0FDRjtBQUFBLE1BQ0EseUJBQXlCLE9BQU8sT0FBTyxLQUFLLFdBQzFDLHdCQUNBLFVBQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjLHVDQUFhO0FBQUEsSUFDM0IsUUFBUSxrREFBTztBQUFBLElBQ2YsWUFBWSxxQ0FBVztBQUFBLElBQ3ZCLGNBQWMsdUNBQWE7QUFBQSxJQUMzQjtBQUFBLElBQ0EsY0FBYyx1Q0FBYTtBQUFBLElBQzNCLFNBQVMsa0NBQVE7QUFBQSxJQUNqQixvQkFBb0IsNkNBQW1CO0FBQUEsSUFDdkMsY0FBYyx1Q0FBYTtBQUFBLElBQzNCLFFBQVEsaUNBQU87QUFBQSxJQUNmLFVBQVUscUNBQVM7QUFBQSxJQUNuQixTQUFTO0FBQUEsU0FDSixrQ0FBcUI7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsa0NBQVE7QUFBQSxJQUNqQixNQUFNO0FBQUEsU0FDRCwrQkFBSztBQUFBLE1BQ1IsaUJBQWlCLE9BQU87QUFBQSxNQUN4QixjQUFjLE9BQU87QUFBQSxNQUNyQixVQUFVLE9BQU87QUFBQSxNQUNqQixZQUFZLE9BQU8sUUFBUSxJQUFJLFlBQVk7QUFBQSxNQUMzQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVSxPQUFPO0FBQUEsTUFDakIsTUFBTSxPQUFPO0FBQUEsTUFDYixnQkFBZ0IsT0FBTyxjQUFjO0FBQUEsTUFDckMsaUJBQWlCLE9BQU8sbUJBQW1CO0FBQUEsTUFDM0M7QUFBQSxNQUNBLFNBQVMsT0FBTyxXQUFXO0FBQUEsTUFDM0IsdUJBQXVCLGdCQUFnQjtBQUFBLE1BQ3ZDLHdCQUF3QixnQkFBZ0I7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUE5RmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
