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
var createIPCEvents_exports = {};
__export(createIPCEvents_exports, {
  createIPCEvents: () => createIPCEvents
});
module.exports = __toCommonJS(createIPCEvents_exports);
var import_electron = require("electron");
var React = __toESM(require("react"));
var import_Colors = require("../types/Colors");
var Stickers = __toESM(require("../types/Stickers"));
var import_SystemTraySetting = require("../types/SystemTraySetting");
var import_ReactWrapperView = require("../views/ReactWrapperView");
var import_ErrorModal = require("../components/ErrorModal");
var import_calling = require("../services/calling");
var import_conversations = require("../state/selectors/conversations");
var import_items = require("../state/selectors/items");
var import_events = require("../shims/events");
var import_themeChanged = require("../shims/themeChanged");
var import_renderClearingDataView = require("../shims/renderClearingDataView");
var universalExpireTimer = __toESM(require("./universalExpireTimer"));
var import_phoneNumberDiscoverability = require("./phoneNumberDiscoverability");
var import_phoneNumberSharingMode = require("./phoneNumberSharingMode");
var import_assert = require("./assert");
var durations = __toESM(require("./durations"));
var import_isPhoneNumberSharingEnabled = require("./isPhoneNumberSharingEnabled");
var import_sgnlHref = require("./sgnlHref");
var log = __toESM(require("../logging/log"));
function createIPCEvents(overrideEvents = {}) {
  return {
    getDeviceName: () => window.textsecure.storage.user.getDeviceName(),
    getZoomFactor: () => window.storage.get("zoomFactor", 1),
    setZoomFactor: async (zoomFactor) => {
      import_electron.webFrame.setZoomFactor(zoomFactor);
    },
    getPreferredAudioInputDevice: () => window.storage.get("preferred-audio-input-device"),
    setPreferredAudioInputDevice: (device) => window.storage.put("preferred-audio-input-device", device),
    getPreferredAudioOutputDevice: () => window.storage.get("preferred-audio-output-device"),
    setPreferredAudioOutputDevice: (device) => window.storage.put("preferred-audio-output-device", device),
    getPreferredVideoInputDevice: () => window.storage.get("preferred-video-input-device"),
    setPreferredVideoInputDevice: (device) => window.storage.put("preferred-video-input-device", device),
    getCustomColors: () => {
      return (0, import_items.getCustomColors)(window.reduxStore.getState()) || {};
    },
    getConversationsWithCustomColor: (colorId) => {
      return (0, import_conversations.getConversationsWithCustomColorSelector)(window.reduxStore.getState())(colorId);
    },
    addCustomColor: (...args) => window.reduxActions.items.addCustomColor(...args),
    editCustomColor: (...args) => window.reduxActions.items.editCustomColor(...args),
    removeCustomColor: (colorId) => window.reduxActions.items.removeCustomColor(colorId),
    removeCustomColorOnConversations: (colorId) => window.reduxActions.conversations.removeCustomColorOnConversations(colorId),
    resetAllChatColors: () => window.reduxActions.conversations.resetAllChatColors(),
    resetDefaultChatColor: () => window.reduxActions.items.resetDefaultChatColor(),
    setGlobalDefaultConversationColor: (...args) => window.reduxActions.items.setGlobalDefaultConversationColor(...args),
    getAvailableIODevices: async () => {
      const { availableCameras, availableMicrophones, availableSpeakers } = await import_calling.calling.getAvailableIODevices();
      return {
        availableCameras: availableCameras.map((inputDeviceInfo) => ({
          deviceId: inputDeviceInfo.deviceId,
          groupId: inputDeviceInfo.groupId,
          kind: inputDeviceInfo.kind,
          label: inputDeviceInfo.label
        })),
        availableMicrophones,
        availableSpeakers
      };
    },
    getBlockedCount: () => window.storage.blocked.getBlockedUuids().length + window.storage.blocked.getBlockedGroups().length,
    getDefaultConversationColor: () => window.storage.get("defaultConversationColor", import_Colors.DEFAULT_CONVERSATION_COLOR),
    getLinkPreviewSetting: () => window.storage.get("linkPreviews", false),
    getPhoneNumberDiscoverabilitySetting: () => window.storage.get("phoneNumberDiscoverability", import_phoneNumberDiscoverability.PhoneNumberDiscoverability.NotDiscoverable),
    getPhoneNumberSharingSetting: () => window.storage.get("phoneNumberSharingMode", import_phoneNumberSharingMode.PhoneNumberSharingMode.Nobody),
    getReadReceiptSetting: () => window.storage.get("read-receipt-setting", false),
    getTypingIndicatorSetting: () => window.storage.get("typingIndicators", false),
    getAutoDownloadUpdate: () => window.storage.get("auto-download-update", true),
    setAutoDownloadUpdate: (value) => window.storage.put("auto-download-update", value),
    getThemeSetting: () => window.storage.get("theme-setting", "system"),
    setThemeSetting: (value) => {
      const promise = window.storage.put("theme-setting", value);
      (0, import_themeChanged.themeChanged)();
      return promise;
    },
    getHideMenuBar: () => window.storage.get("hide-menu-bar"),
    setHideMenuBar: (value) => {
      const promise = window.storage.put("hide-menu-bar", value);
      window.setAutoHideMenuBar(value);
      window.setMenuBarVisibility(!value);
      return promise;
    },
    getSystemTraySetting: () => (0, import_SystemTraySetting.parseSystemTraySetting)(window.storage.get("system-tray-setting")),
    setSystemTraySetting: (value) => {
      const promise = window.storage.put("system-tray-setting", value);
      window.updateSystemTraySetting(value);
      return promise;
    },
    getNotificationSetting: () => window.storage.get("notification-setting", "message"),
    setNotificationSetting: (value) => window.storage.put("notification-setting", value),
    getNotificationDrawAttention: () => window.storage.get("notification-draw-attention", true),
    setNotificationDrawAttention: (value) => window.storage.put("notification-draw-attention", value),
    getAudioNotification: () => window.storage.get("audio-notification"),
    setAudioNotification: (value) => window.storage.put("audio-notification", value),
    getCountMutedConversations: () => window.storage.get("badge-count-muted-conversations", false),
    setCountMutedConversations: (value) => {
      const promise = window.storage.put("badge-count-muted-conversations", value);
      window.Whisper.events.trigger("updateUnreadCount");
      return promise;
    },
    getCallRingtoneNotification: () => window.storage.get("call-ringtone-notification", true),
    setCallRingtoneNotification: (value) => window.storage.put("call-ringtone-notification", value),
    getCallSystemNotification: () => window.storage.get("call-system-notification", true),
    setCallSystemNotification: (value) => window.storage.put("call-system-notification", value),
    getIncomingCallNotification: () => window.storage.get("incoming-call-notification", true),
    setIncomingCallNotification: (value) => window.storage.put("incoming-call-notification", value),
    getSpellCheck: () => window.storage.get("spell-check", true),
    setSpellCheck: (value) => window.storage.put("spell-check", value),
    getAlwaysRelayCalls: () => window.storage.get("always-relay-calls"),
    setAlwaysRelayCalls: (value) => window.storage.put("always-relay-calls", value),
    getAutoLaunch: () => window.getAutoLaunch(),
    setAutoLaunch: async (value) => {
      return window.setAutoLaunch(value);
    },
    isPhoneNumberSharingEnabled: () => (0, import_isPhoneNumberSharingEnabled.isPhoneNumberSharingEnabled)(),
    isPrimary: () => window.textsecure.storage.user.getDeviceId() === 1,
    syncRequest: () => new Promise((resolve, reject) => {
      const FIVE_MINUTES = 5 * durations.MINUTE;
      const syncRequest = window.getSyncRequest(FIVE_MINUTES);
      syncRequest.addEventListener("success", () => resolve());
      syncRequest.addEventListener("timeout", () => reject(new Error("timeout")));
    }),
    getLastSyncTime: () => window.storage.get("synced_at"),
    setLastSyncTime: (value) => window.storage.put("synced_at", value),
    getUniversalExpireTimer: () => universalExpireTimer.get(),
    setUniversalExpireTimer: async (newValue) => {
      await universalExpireTimer.set(newValue);
      const conversationId = window.ConversationController.getOurConversationIdOrThrow();
      const account = window.ConversationController.get(conversationId);
      (0, import_assert.assert)(account, "Account wasn't found");
      account.captureChange("universalExpireTimer");
      const state = window.reduxStore.getState();
      const selectedId = state.conversations.selectedConversationId;
      if (selectedId) {
        const conversation = window.ConversationController.get(selectedId);
        (0, import_assert.assert)(conversation, "Conversation wasn't found");
        await conversation.updateLastMessage();
      }
    },
    addDarkOverlay: () => {
      if ($(".dark-overlay").length) {
        return;
      }
      $(document.body).prepend('<div class="dark-overlay"></div>');
      $(".dark-overlay").on("click", () => $(".dark-overlay").remove());
    },
    removeDarkOverlay: () => $(".dark-overlay").remove(),
    showKeyboardShortcuts: () => window.showKeyboardShortcuts(),
    deleteAllData: async () => {
      await window.Signal.Data.goBackToMainProcess();
      (0, import_renderClearingDataView.renderClearingDataView)();
    },
    closeDB: async () => {
      await window.Signal.Data.goBackToMainProcess();
    },
    showStickerPack: (packId, key) => {
      if (!window.Signal.Util.Registration.everDone()) {
        log.warn("showStickerPack: Not registered, returning early");
        return;
      }
      if (window.isShowingModal) {
        log.warn("showStickerPack: Already showing modal, returning early");
        return;
      }
      try {
        window.isShowingModal = true;
        Stickers.downloadEphemeralPack(packId, key);
        const props = {
          packId,
          onClose: async () => {
            window.isShowingModal = false;
            stickerPreviewModalView.remove();
            await Stickers.removeEphemeralPack(packId);
          }
        };
        const stickerPreviewModalView = new import_ReactWrapperView.ReactWrapperView({
          className: "sticker-preview-modal-wrapper",
          JSX: window.Signal.State.Roots.createStickerPreviewModal(window.reduxStore, props)
        });
      } catch (error) {
        window.isShowingModal = false;
        log.error("showStickerPack: Ran into an error!", error && error.stack ? error.stack : error);
        const errorView = new import_ReactWrapperView.ReactWrapperView({
          className: "error-modal-wrapper",
          JSX: /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
            i18n: window.i18n,
            onClose: () => {
              errorView.remove();
            }
          })
        });
      }
    },
    showGroupViaLink: async (hash) => {
      if (!window.Signal.Util.Registration.everDone()) {
        log.warn("showGroupViaLink: Not registered, returning early");
        return;
      }
      if (window.isShowingModal) {
        log.warn("showGroupViaLink: Already showing modal, returning early");
        return;
      }
      try {
        await window.Signal.Groups.joinViaLink(hash);
      } catch (error) {
        log.error("showGroupViaLink: Ran into an error!", error && error.stack ? error.stack : error);
        const errorView = new import_ReactWrapperView.ReactWrapperView({
          className: "error-modal-wrapper",
          JSX: /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
            i18n: window.i18n,
            title: window.i18n("GroupV2--join--general-join-failure--title"),
            description: window.i18n("GroupV2--join--general-join-failure"),
            onClose: () => {
              errorView.remove();
            }
          })
        });
      }
      window.isShowingModal = false;
    },
    showConversationViaSignalDotMe(hash) {
      if (!window.Signal.Util.Registration.everDone()) {
        log.info("showConversationViaSignalDotMe: Not registered, returning early");
        return;
      }
      const maybeE164 = (0, import_sgnlHref.parseE164FromSignalDotMeHash)(hash);
      if (maybeE164) {
        (0, import_events.trigger)("showConversation", maybeE164);
        return;
      }
      log.info("showConversationViaSignalDotMe: invalid E164");
      if (window.isShowingModal) {
        log.info("showConversationViaSignalDotMe: a modal is already showing. Doing nothing");
      } else {
        showUnknownSgnlLinkModal();
      }
    },
    unknownSignalLink: () => {
      log.warn("unknownSignalLink: Showing error dialog");
      showUnknownSgnlLinkModal();
    },
    installStickerPack: async (packId, key) => {
      Stickers.downloadStickerPack(packId, key, {
        finalStatus: "installed"
      });
    },
    shutdown: () => Promise.resolve(),
    showReleaseNotes: () => {
      const { showWhatsNewModal } = window.reduxActions.globalModals;
      showWhatsNewModal();
    },
    getMediaPermissions: window.getMediaPermissions,
    getMediaCameraPermissions: window.getMediaCameraPermissions,
    persistZoomFactor: (zoomFactor) => window.storage.put("zoomFactor", zoomFactor),
    ...overrideEvents
  };
}
function showUnknownSgnlLinkModal() {
  const errorView = new import_ReactWrapperView.ReactWrapperView({
    className: "error-modal-wrapper",
    JSX: /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
      i18n: window.i18n,
      description: window.i18n("unknown-sgnl-link"),
      onClose: () => {
        errorView.remove();
      }
    })
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createIPCEvents
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlSVBDRXZlbnRzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHdlYkZyYW1lIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHR5cGUgeyBBdWRpb0RldmljZSB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IFpvb21GYWN0b3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvU3RvcmFnZS5kJztcbmltcG9ydCB0eXBlIHtcbiAgQ29udmVyc2F0aW9uQ29sb3JUeXBlLFxuICBDdXN0b21Db2xvclR5cGUsXG4gIERlZmF1bHRDb252ZXJzYXRpb25Db2xvclR5cGUsXG59IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBERUZBVUxUX0NPTlZFUlNBVElPTl9DT0xPUiB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgKiBhcyBTdGlja2VycyBmcm9tICcuLi90eXBlcy9TdGlja2Vycyc7XG5pbXBvcnQgdHlwZSB7IFN5c3RlbVRyYXlTZXR0aW5nIH0gZnJvbSAnLi4vdHlwZXMvU3lzdGVtVHJheVNldHRpbmcnO1xuaW1wb3J0IHsgcGFyc2VTeXN0ZW1UcmF5U2V0dGluZyB9IGZyb20gJy4uL3R5cGVzL1N5c3RlbVRyYXlTZXR0aW5nJztcblxuaW1wb3J0IHsgUmVhY3RXcmFwcGVyVmlldyB9IGZyb20gJy4uL3ZpZXdzL1JlYWN0V3JhcHBlclZpZXcnO1xuaW1wb3J0IHsgRXJyb3JNb2RhbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JNb2RhbCc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgY2FsbGluZyB9IGZyb20gJy4uL3NlcnZpY2VzL2NhbGxpbmcnO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uc1dpdGhDdXN0b21Db2xvclNlbGVjdG9yIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0Q3VzdG9tQ29sb3JzIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB7IHRyaWdnZXIgfSBmcm9tICcuLi9zaGltcy9ldmVudHMnO1xuaW1wb3J0IHsgdGhlbWVDaGFuZ2VkIH0gZnJvbSAnLi4vc2hpbXMvdGhlbWVDaGFuZ2VkJztcbmltcG9ydCB7IHJlbmRlckNsZWFyaW5nRGF0YVZpZXcgfSBmcm9tICcuLi9zaGltcy9yZW5kZXJDbGVhcmluZ0RhdGFWaWV3JztcblxuaW1wb3J0ICogYXMgdW5pdmVyc2FsRXhwaXJlVGltZXIgZnJvbSAnLi91bml2ZXJzYWxFeHBpcmVUaW1lcic7XG5pbXBvcnQgeyBQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eSB9IGZyb20gJy4vcGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHknO1xuaW1wb3J0IHsgUGhvbmVOdW1iZXJTaGFyaW5nTW9kZSB9IGZyb20gJy4vcGhvbmVOdW1iZXJTaGFyaW5nTW9kZSc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgaXNQaG9uZU51bWJlclNoYXJpbmdFbmFibGVkIH0gZnJvbSAnLi9pc1Bob25lTnVtYmVyU2hhcmluZ0VuYWJsZWQnO1xuaW1wb3J0IHsgcGFyc2VFMTY0RnJvbVNpZ25hbERvdE1lSGFzaCB9IGZyb20gJy4vc2dubEhyZWYnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxudHlwZSBUaGVtZVR5cGUgPSAnbGlnaHQnIHwgJ2RhcmsnIHwgJ3N5c3RlbSc7XG50eXBlIE5vdGlmaWNhdGlvblNldHRpbmdUeXBlID0gJ21lc3NhZ2UnIHwgJ25hbWUnIHwgJ2NvdW50JyB8ICdvZmYnO1xuXG5leHBvcnQgdHlwZSBJUENFdmVudHNWYWx1ZXNUeXBlID0ge1xuICBhbHdheXNSZWxheUNhbGxzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBhdWRpb05vdGlmaWNhdGlvbjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgYXV0b0Rvd25sb2FkVXBkYXRlOiBib29sZWFuO1xuICBhdXRvTGF1bmNoOiBib29sZWFuO1xuICBjYWxsUmluZ3RvbmVOb3RpZmljYXRpb246IGJvb2xlYW47XG4gIGNhbGxTeXN0ZW1Ob3RpZmljYXRpb246IGJvb2xlYW47XG4gIGNvdW50TXV0ZWRDb252ZXJzYXRpb25zOiBib29sZWFuO1xuICBoaWRlTWVudUJhcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgaW5jb21pbmdDYWxsTm90aWZpY2F0aW9uOiBib29sZWFuO1xuICBsYXN0U3luY1RpbWU6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgbm90aWZpY2F0aW9uRHJhd0F0dGVudGlvbjogYm9vbGVhbjtcbiAgbm90aWZpY2F0aW9uU2V0dGluZzogTm90aWZpY2F0aW9uU2V0dGluZ1R5cGU7XG4gIHByZWZlcnJlZEF1ZGlvSW5wdXREZXZpY2U6IEF1ZGlvRGV2aWNlIHwgdW5kZWZpbmVkO1xuICBwcmVmZXJyZWRBdWRpb091dHB1dERldmljZTogQXVkaW9EZXZpY2UgfCB1bmRlZmluZWQ7XG4gIHByZWZlcnJlZFZpZGVvSW5wdXREZXZpY2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgc3BlbGxDaGVjazogYm9vbGVhbjtcbiAgc3lzdGVtVHJheVNldHRpbmc6IFN5c3RlbVRyYXlTZXR0aW5nO1xuICB0aGVtZVNldHRpbmc6IFRoZW1lVHlwZTtcbiAgdW5pdmVyc2FsRXhwaXJlVGltZXI6IG51bWJlcjtcbiAgem9vbUZhY3RvcjogWm9vbUZhY3RvclR5cGU7XG5cbiAgLy8gT3B0aW9uYWxcbiAgbWVkaWFQZXJtaXNzaW9uczogYm9vbGVhbjtcbiAgbWVkaWFDYW1lcmFQZXJtaXNzaW9uczogYm9vbGVhbjtcblxuICAvLyBPbmx5IGdldHRlcnNcblxuICBibG9ja2VkQ291bnQ6IG51bWJlcjtcbiAgbGlua1ByZXZpZXdTZXR0aW5nOiBib29sZWFuO1xuICBwaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eVNldHRpbmc6IFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5O1xuICBwaG9uZU51bWJlclNoYXJpbmdTZXR0aW5nOiBQaG9uZU51bWJlclNoYXJpbmdNb2RlO1xuICByZWFkUmVjZWlwdFNldHRpbmc6IGJvb2xlYW47XG4gIHR5cGluZ0luZGljYXRvclNldHRpbmc6IGJvb2xlYW47XG4gIGRldmljZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCB0eXBlIElQQ0V2ZW50c0NhbGxiYWNrc1R5cGUgPSB7XG4gIGdldEF2YWlsYWJsZUlPRGV2aWNlcygpOiBQcm9taXNlPHtcbiAgICBhdmFpbGFibGVDYW1lcmFzOiBBcnJheTxcbiAgICAgIFBpY2s8TWVkaWFEZXZpY2VJbmZvLCAnZGV2aWNlSWQnIHwgJ2dyb3VwSWQnIHwgJ2tpbmQnIHwgJ2xhYmVsJz5cbiAgICA+O1xuICAgIGF2YWlsYWJsZU1pY3JvcGhvbmVzOiBBcnJheTxBdWRpb0RldmljZT47XG4gICAgYXZhaWxhYmxlU3BlYWtlcnM6IEFycmF5PEF1ZGlvRGV2aWNlPjtcbiAgfT47XG4gIGFkZEN1c3RvbUNvbG9yOiAoY3VzdG9tQ29sb3I6IEN1c3RvbUNvbG9yVHlwZSkgPT4gdm9pZDtcbiAgYWRkRGFya092ZXJsYXk6ICgpID0+IHZvaWQ7XG4gIGRlbGV0ZUFsbERhdGE6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGNsb3NlREI6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGVkaXRDdXN0b21Db2xvcjogKGNvbG9ySWQ6IHN0cmluZywgY3VzdG9tQ29sb3I6IEN1c3RvbUNvbG9yVHlwZSkgPT4gdm9pZDtcbiAgZ2V0Q29udmVyc2F0aW9uc1dpdGhDdXN0b21Db2xvcjogKHg6IHN0cmluZykgPT4gQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIGluc3RhbGxTdGlja2VyUGFjazogKHBhY2tJZDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgaXNQaG9uZU51bWJlclNoYXJpbmdFbmFibGVkOiAoKSA9PiBib29sZWFuO1xuICBpc1ByaW1hcnk6ICgpID0+IGJvb2xlYW47XG4gIHJlbW92ZUN1c3RvbUNvbG9yOiAoeDogc3RyaW5nKSA9PiB2b2lkO1xuICByZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9uczogKHg6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVtb3ZlRGFya092ZXJsYXk6ICgpID0+IHZvaWQ7XG4gIHJlc2V0QWxsQ2hhdENvbG9yczogKCkgPT4gdm9pZDtcbiAgcmVzZXREZWZhdWx0Q2hhdENvbG9yOiAoKSA9PiB2b2lkO1xuICBzaG93Q29udmVyc2F0aW9uVmlhU2lnbmFsRG90TWU6IChoYXNoOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNob3dLZXlib2FyZFNob3J0Y3V0czogKCkgPT4gdm9pZDtcbiAgc2hvd0dyb3VwVmlhTGluazogKHg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgc2hvd1JlbGVhc2VOb3RlczogKCkgPT4gdm9pZDtcbiAgc2hvd1N0aWNrZXJQYWNrOiAocGFja0lkOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB2b2lkO1xuICBzaHV0ZG93bjogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgdW5rbm93blNpZ25hbExpbms6ICgpID0+IHZvaWQ7XG4gIGdldEN1c3RvbUNvbG9yczogKCkgPT4gUmVjb3JkPHN0cmluZywgQ3VzdG9tQ29sb3JUeXBlPjtcbiAgc3luY1JlcXVlc3Q6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIHNldEdsb2JhbERlZmF1bHRDb252ZXJzYXRpb25Db2xvcjogKFxuICAgIGNvbG9yOiBDb252ZXJzYXRpb25Db2xvclR5cGUsXG4gICAgY3VzdG9tQ29sb3I/OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBDdXN0b21Db2xvclR5cGUgfVxuICApID0+IHZvaWQ7XG4gIGdldERlZmF1bHRDb252ZXJzYXRpb25Db2xvcjogKCkgPT4gRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgcGVyc2lzdFpvb21GYWN0b3I6IChmYWN0b3I6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbnR5cGUgVmFsdWVzV2l0aEdldHRlcnMgPSBPbWl0PFxuICBJUENFdmVudHNWYWx1ZXNUeXBlLFxuICAvLyBPcHRpb25hbFxuICAnbWVkaWFQZXJtaXNzaW9ucycgfCAnbWVkaWFDYW1lcmFQZXJtaXNzaW9ucycgfCAnYXV0b0xhdW5jaCdcbj47XG5cbnR5cGUgVmFsdWVzV2l0aFNldHRlcnMgPSBPbWl0PFxuICBJUENFdmVudHNWYWx1ZXNUeXBlLFxuICB8ICdibG9ja2VkQ291bnQnXG4gIHwgJ2RlZmF1bHRDb252ZXJzYXRpb25Db2xvcidcbiAgfCAnbGlua1ByZXZpZXdTZXR0aW5nJ1xuICB8ICdwaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eVNldHRpbmcnXG4gIHwgJ3Bob25lTnVtYmVyU2hhcmluZ1NldHRpbmcnXG4gIHwgJ3JlYWRSZWNlaXB0U2V0dGluZydcbiAgfCAndHlwaW5nSW5kaWNhdG9yU2V0dGluZydcbiAgfCAnZGV2aWNlTmFtZSdcblxuICAvLyBPcHRpb25hbFxuICB8ICdtZWRpYVBlcm1pc3Npb25zJ1xuICB8ICdtZWRpYUNhbWVyYVBlcm1pc3Npb25zJ1xuPjtcblxuZXhwb3J0IHR5cGUgSVBDRXZlbnRHZXR0ZXJUeXBlPEtleSBleHRlbmRzIGtleW9mIElQQ0V2ZW50c1ZhbHVlc1R5cGU+ID1cbiAgYGdldCR7Q2FwaXRhbGl6ZTxLZXk+fWA7XG5cbmV4cG9ydCB0eXBlIElQQ0V2ZW50U2V0dGVyVHlwZTxLZXkgZXh0ZW5kcyBrZXlvZiBJUENFdmVudHNWYWx1ZXNUeXBlPiA9XG4gIGBzZXQke0NhcGl0YWxpemU8S2V5Pn1gO1xuXG5leHBvcnQgdHlwZSBJUENFdmVudHNHZXR0ZXJzVHlwZSA9IHtcbiAgW0tleSBpbiBrZXlvZiBWYWx1ZXNXaXRoR2V0dGVycyBhcyBJUENFdmVudEdldHRlclR5cGU8S2V5Pl06ICgpID0+IFZhbHVlc1dpdGhHZXR0ZXJzW0tleV07XG59ICYge1xuICBnZXRNZWRpYVBlcm1pc3Npb25zPzogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgZ2V0TWVkaWFDYW1lcmFQZXJtaXNzaW9ucz86ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGdldEF1dG9MYXVuY2g/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xufTtcblxuZXhwb3J0IHR5cGUgSVBDRXZlbnRzU2V0dGVyc1R5cGUgPSB7XG4gIFtLZXkgaW4ga2V5b2YgVmFsdWVzV2l0aFNldHRlcnMgYXMgSVBDRXZlbnRTZXR0ZXJUeXBlPEtleT5dOiAoXG4gICAgdmFsdWU6IE5vbk51bGxhYmxlPFZhbHVlc1dpdGhTZXR0ZXJzW0tleV0+XG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbn0gJiB7XG4gIHNldE1lZGlhUGVybWlzc2lvbnM/OiAodmFsdWU6IGJvb2xlYW4pID0+IFByb21pc2U8dm9pZD47XG4gIHNldE1lZGlhQ2FtZXJhUGVybWlzc2lvbnM/OiAodmFsdWU6IGJvb2xlYW4pID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgdHlwZSBJUENFdmVudHNUeXBlID0gSVBDRXZlbnRzR2V0dGVyc1R5cGUgJlxuICBJUENFdmVudHNTZXR0ZXJzVHlwZSAmXG4gIElQQ0V2ZW50c0NhbGxiYWNrc1R5cGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJUENFdmVudHMoXG4gIG92ZXJyaWRlRXZlbnRzOiBQYXJ0aWFsPElQQ0V2ZW50c1R5cGU+ID0ge31cbik6IElQQ0V2ZW50c1R5cGUge1xuICByZXR1cm4ge1xuICAgIGdldERldmljZU5hbWU6ICgpID0+IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VOYW1lKCksXG5cbiAgICBnZXRab29tRmFjdG9yOiAoKSA9PiB3aW5kb3cuc3RvcmFnZS5nZXQoJ3pvb21GYWN0b3InLCAxKSxcbiAgICBzZXRab29tRmFjdG9yOiBhc3luYyAoem9vbUZhY3RvcjogWm9vbUZhY3RvclR5cGUpID0+IHtcbiAgICAgIHdlYkZyYW1lLnNldFpvb21GYWN0b3Ioem9vbUZhY3Rvcik7XG4gICAgfSxcblxuICAgIGdldFByZWZlcnJlZEF1ZGlvSW5wdXREZXZpY2U6ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3ByZWZlcnJlZC1hdWRpby1pbnB1dC1kZXZpY2UnKSxcbiAgICBzZXRQcmVmZXJyZWRBdWRpb0lucHV0RGV2aWNlOiBkZXZpY2UgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgncHJlZmVycmVkLWF1ZGlvLWlucHV0LWRldmljZScsIGRldmljZSksXG4gICAgZ2V0UHJlZmVycmVkQXVkaW9PdXRwdXREZXZpY2U6ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3ByZWZlcnJlZC1hdWRpby1vdXRwdXQtZGV2aWNlJyksXG4gICAgc2V0UHJlZmVycmVkQXVkaW9PdXRwdXREZXZpY2U6IGRldmljZSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdwcmVmZXJyZWQtYXVkaW8tb3V0cHV0LWRldmljZScsIGRldmljZSksXG4gICAgZ2V0UHJlZmVycmVkVmlkZW9JbnB1dERldmljZTogKCkgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncHJlZmVycmVkLXZpZGVvLWlucHV0LWRldmljZScpLFxuICAgIHNldFByZWZlcnJlZFZpZGVvSW5wdXREZXZpY2U6IGRldmljZSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdwcmVmZXJyZWQtdmlkZW8taW5wdXQtZGV2aWNlJywgZGV2aWNlKSxcblxuICAgIC8vIENoYXQgQ29sb3IgcmVkdXggaG9va3Vwc1xuICAgIGdldEN1c3RvbUNvbG9yczogKCkgPT4ge1xuICAgICAgcmV0dXJuIGdldEN1c3RvbUNvbG9ycyh3aW5kb3cucmVkdXhTdG9yZS5nZXRTdGF0ZSgpKSB8fCB7fTtcbiAgICB9LFxuICAgIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3I6IGNvbG9ySWQgPT4ge1xuICAgICAgcmV0dXJuIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3JTZWxlY3RvcihcbiAgICAgICAgd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKVxuICAgICAgKShjb2xvcklkKTtcbiAgICB9LFxuICAgIGFkZEN1c3RvbUNvbG9yOiAoLi4uYXJncykgPT5cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuaXRlbXMuYWRkQ3VzdG9tQ29sb3IoLi4uYXJncyksXG4gICAgZWRpdEN1c3RvbUNvbG9yOiAoLi4uYXJncykgPT5cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuaXRlbXMuZWRpdEN1c3RvbUNvbG9yKC4uLmFyZ3MpLFxuICAgIHJlbW92ZUN1c3RvbUNvbG9yOiBjb2xvcklkID0+XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLml0ZW1zLnJlbW92ZUN1c3RvbUNvbG9yKGNvbG9ySWQpLFxuICAgIHJlbW92ZUN1c3RvbUNvbG9yT25Db252ZXJzYXRpb25zOiBjb2xvcklkID0+XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnMucmVtb3ZlQ3VzdG9tQ29sb3JPbkNvbnZlcnNhdGlvbnMoXG4gICAgICAgIGNvbG9ySWRcbiAgICAgICksXG4gICAgcmVzZXRBbGxDaGF0Q29sb3JzOiAoKSA9PlxuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnJlc2V0QWxsQ2hhdENvbG9ycygpLFxuICAgIHJlc2V0RGVmYXVsdENoYXRDb2xvcjogKCkgPT5cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuaXRlbXMucmVzZXREZWZhdWx0Q2hhdENvbG9yKCksXG4gICAgc2V0R2xvYmFsRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yOiAoLi4uYXJncykgPT5cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuaXRlbXMuc2V0R2xvYmFsRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yKC4uLmFyZ3MpLFxuXG4gICAgLy8gR2V0dGVycyBvbmx5XG4gICAgZ2V0QXZhaWxhYmxlSU9EZXZpY2VzOiBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB7IGF2YWlsYWJsZUNhbWVyYXMsIGF2YWlsYWJsZU1pY3JvcGhvbmVzLCBhdmFpbGFibGVTcGVha2VycyB9ID1cbiAgICAgICAgYXdhaXQgY2FsbGluZy5nZXRBdmFpbGFibGVJT0RldmljZXMoKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gbWFwcGluZyBpdCB0byBhIHBvam8gc28gdGhhdCBpdCBpcyBJUEMgZnJpZW5kbHlcbiAgICAgICAgYXZhaWxhYmxlQ2FtZXJhczogYXZhaWxhYmxlQ2FtZXJhcy5tYXAoXG4gICAgICAgICAgKGlucHV0RGV2aWNlSW5mbzogTWVkaWFEZXZpY2VJbmZvKSA9PiAoe1xuICAgICAgICAgICAgZGV2aWNlSWQ6IGlucHV0RGV2aWNlSW5mby5kZXZpY2VJZCxcbiAgICAgICAgICAgIGdyb3VwSWQ6IGlucHV0RGV2aWNlSW5mby5ncm91cElkLFxuICAgICAgICAgICAga2luZDogaW5wdXREZXZpY2VJbmZvLmtpbmQsXG4gICAgICAgICAgICBsYWJlbDogaW5wdXREZXZpY2VJbmZvLmxhYmVsLFxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGF2YWlsYWJsZU1pY3JvcGhvbmVzLFxuICAgICAgICBhdmFpbGFibGVTcGVha2VycyxcbiAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCbG9ja2VkQ291bnQ6ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmdldEJsb2NrZWRVdWlkcygpLmxlbmd0aCArXG4gICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmdldEJsb2NrZWRHcm91cHMoKS5sZW5ndGgsXG4gICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yOiAoKSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UuZ2V0KFxuICAgICAgICAnZGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yJyxcbiAgICAgICAgREVGQVVMVF9DT05WRVJTQVRJT05fQ09MT1JcbiAgICAgICksXG4gICAgZ2V0TGlua1ByZXZpZXdTZXR0aW5nOiAoKSA9PiB3aW5kb3cuc3RvcmFnZS5nZXQoJ2xpbmtQcmV2aWV3cycsIGZhbHNlKSxcbiAgICBnZXRQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eVNldHRpbmc6ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoXG4gICAgICAgICdwaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eScsXG4gICAgICAgIFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5Lk5vdERpc2NvdmVyYWJsZVxuICAgICAgKSxcbiAgICBnZXRQaG9uZU51bWJlclNoYXJpbmdTZXR0aW5nOiAoKSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UuZ2V0KFxuICAgICAgICAncGhvbmVOdW1iZXJTaGFyaW5nTW9kZScsXG4gICAgICAgIFBob25lTnVtYmVyU2hhcmluZ01vZGUuTm9ib2R5XG4gICAgICApLFxuICAgIGdldFJlYWRSZWNlaXB0U2V0dGluZzogKCkgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncmVhZC1yZWNlaXB0LXNldHRpbmcnLCBmYWxzZSksXG4gICAgZ2V0VHlwaW5nSW5kaWNhdG9yU2V0dGluZzogKCkgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgndHlwaW5nSW5kaWNhdG9ycycsIGZhbHNlKSxcblxuICAgIC8vIENvbmZpZ3VyYWJsZSBzZXR0aW5nc1xuICAgIGdldEF1dG9Eb3dubG9hZFVwZGF0ZTogKCkgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgnYXV0by1kb3dubG9hZC11cGRhdGUnLCB0cnVlKSxcbiAgICBzZXRBdXRvRG93bmxvYWRVcGRhdGU6IHZhbHVlID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2F1dG8tZG93bmxvYWQtdXBkYXRlJywgdmFsdWUpLFxuICAgIGdldFRoZW1lU2V0dGluZzogKCkgPT4gd2luZG93LnN0b3JhZ2UuZ2V0KCd0aGVtZS1zZXR0aW5nJywgJ3N5c3RlbScpLFxuICAgIHNldFRoZW1lU2V0dGluZzogdmFsdWUgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IHdpbmRvdy5zdG9yYWdlLnB1dCgndGhlbWUtc2V0dGluZycsIHZhbHVlKTtcbiAgICAgIHRoZW1lQ2hhbmdlZCgpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICBnZXRIaWRlTWVudUJhcjogKCkgPT4gd2luZG93LnN0b3JhZ2UuZ2V0KCdoaWRlLW1lbnUtYmFyJyksXG4gICAgc2V0SGlkZU1lbnVCYXI6IHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSB3aW5kb3cuc3RvcmFnZS5wdXQoJ2hpZGUtbWVudS1iYXInLCB2YWx1ZSk7XG4gICAgICB3aW5kb3cuc2V0QXV0b0hpZGVNZW51QmFyKHZhbHVlKTtcbiAgICAgIHdpbmRvdy5zZXRNZW51QmFyVmlzaWJpbGl0eSghdmFsdWUpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICBnZXRTeXN0ZW1UcmF5U2V0dGluZzogKCkgPT5cbiAgICAgIHBhcnNlU3lzdGVtVHJheVNldHRpbmcod2luZG93LnN0b3JhZ2UuZ2V0KCdzeXN0ZW0tdHJheS1zZXR0aW5nJykpLFxuICAgIHNldFN5c3RlbVRyYXlTZXR0aW5nOiB2YWx1ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlID0gd2luZG93LnN0b3JhZ2UucHV0KCdzeXN0ZW0tdHJheS1zZXR0aW5nJywgdmFsdWUpO1xuICAgICAgd2luZG93LnVwZGF0ZVN5c3RlbVRyYXlTZXR0aW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG5cbiAgICBnZXROb3RpZmljYXRpb25TZXR0aW5nOiAoKSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UuZ2V0KCdub3RpZmljYXRpb24tc2V0dGluZycsICdtZXNzYWdlJyksXG4gICAgc2V0Tm90aWZpY2F0aW9uU2V0dGluZzogKHZhbHVlOiAnbWVzc2FnZScgfCAnbmFtZScgfCAnY291bnQnIHwgJ29mZicpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ25vdGlmaWNhdGlvbi1zZXR0aW5nJywgdmFsdWUpLFxuICAgIGdldE5vdGlmaWNhdGlvbkRyYXdBdHRlbnRpb246ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ25vdGlmaWNhdGlvbi1kcmF3LWF0dGVudGlvbicsIHRydWUpLFxuICAgIHNldE5vdGlmaWNhdGlvbkRyYXdBdHRlbnRpb246IHZhbHVlID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ25vdGlmaWNhdGlvbi1kcmF3LWF0dGVudGlvbicsIHZhbHVlKSxcbiAgICBnZXRBdWRpb05vdGlmaWNhdGlvbjogKCkgPT4gd2luZG93LnN0b3JhZ2UuZ2V0KCdhdWRpby1ub3RpZmljYXRpb24nKSxcbiAgICBzZXRBdWRpb05vdGlmaWNhdGlvbjogdmFsdWUgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgnYXVkaW8tbm90aWZpY2F0aW9uJywgdmFsdWUpLFxuICAgIGdldENvdW50TXV0ZWRDb252ZXJzYXRpb25zOiAoKSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UuZ2V0KCdiYWRnZS1jb3VudC1tdXRlZC1jb252ZXJzYXRpb25zJywgZmFsc2UpLFxuICAgIHNldENvdW50TXV0ZWRDb252ZXJzYXRpb25zOiB2YWx1ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlID0gd2luZG93LnN0b3JhZ2UucHV0KFxuICAgICAgICAnYmFkZ2UtY291bnQtbXV0ZWQtY29udmVyc2F0aW9ucycsXG4gICAgICAgIHZhbHVlXG4gICAgICApO1xuICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLnRyaWdnZXIoJ3VwZGF0ZVVucmVhZENvdW50Jyk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIGdldENhbGxSaW5ndG9uZU5vdGlmaWNhdGlvbjogKCkgPT5cbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgnY2FsbC1yaW5ndG9uZS1ub3RpZmljYXRpb24nLCB0cnVlKSxcbiAgICBzZXRDYWxsUmluZ3RvbmVOb3RpZmljYXRpb246IHZhbHVlID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2NhbGwtcmluZ3RvbmUtbm90aWZpY2F0aW9uJywgdmFsdWUpLFxuICAgIGdldENhbGxTeXN0ZW1Ob3RpZmljYXRpb246ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ2NhbGwtc3lzdGVtLW5vdGlmaWNhdGlvbicsIHRydWUpLFxuICAgIHNldENhbGxTeXN0ZW1Ob3RpZmljYXRpb246IHZhbHVlID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2NhbGwtc3lzdGVtLW5vdGlmaWNhdGlvbicsIHZhbHVlKSxcbiAgICBnZXRJbmNvbWluZ0NhbGxOb3RpZmljYXRpb246ICgpID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ2luY29taW5nLWNhbGwtbm90aWZpY2F0aW9uJywgdHJ1ZSksXG4gICAgc2V0SW5jb21pbmdDYWxsTm90aWZpY2F0aW9uOiB2YWx1ZSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdpbmNvbWluZy1jYWxsLW5vdGlmaWNhdGlvbicsIHZhbHVlKSxcblxuICAgIGdldFNwZWxsQ2hlY2s6ICgpID0+IHdpbmRvdy5zdG9yYWdlLmdldCgnc3BlbGwtY2hlY2snLCB0cnVlKSxcbiAgICBzZXRTcGVsbENoZWNrOiB2YWx1ZSA9PiB3aW5kb3cuc3RvcmFnZS5wdXQoJ3NwZWxsLWNoZWNrJywgdmFsdWUpLFxuXG4gICAgZ2V0QWx3YXlzUmVsYXlDYWxsczogKCkgPT4gd2luZG93LnN0b3JhZ2UuZ2V0KCdhbHdheXMtcmVsYXktY2FsbHMnKSxcbiAgICBzZXRBbHdheXNSZWxheUNhbGxzOiB2YWx1ZSA9PlxuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdhbHdheXMtcmVsYXktY2FsbHMnLCB2YWx1ZSksXG5cbiAgICBnZXRBdXRvTGF1bmNoOiAoKSA9PiB3aW5kb3cuZ2V0QXV0b0xhdW5jaCgpLFxuICAgIHNldEF1dG9MYXVuY2g6IGFzeW5jICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgcmV0dXJuIHdpbmRvdy5zZXRBdXRvTGF1bmNoKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgaXNQaG9uZU51bWJlclNoYXJpbmdFbmFibGVkOiAoKSA9PiBpc1Bob25lTnVtYmVyU2hhcmluZ0VuYWJsZWQoKSxcbiAgICBpc1ByaW1hcnk6ICgpID0+IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpID09PSAxLFxuICAgIHN5bmNSZXF1ZXN0OiAoKSA9PlxuICAgICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBGSVZFX01JTlVURVMgPSA1ICogZHVyYXRpb25zLk1JTlVURTtcbiAgICAgICAgY29uc3Qgc3luY1JlcXVlc3QgPSB3aW5kb3cuZ2V0U3luY1JlcXVlc3QoRklWRV9NSU5VVEVTKTtcbiAgICAgICAgc3luY1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgIHN5bmNSZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWVvdXQnLCAoKSA9PlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3RpbWVvdXQnKSlcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgIGdldExhc3RTeW5jVGltZTogKCkgPT4gd2luZG93LnN0b3JhZ2UuZ2V0KCdzeW5jZWRfYXQnKSxcbiAgICBzZXRMYXN0U3luY1RpbWU6IHZhbHVlID0+IHdpbmRvdy5zdG9yYWdlLnB1dCgnc3luY2VkX2F0JywgdmFsdWUpLFxuICAgIGdldFVuaXZlcnNhbEV4cGlyZVRpbWVyOiAoKSA9PiB1bml2ZXJzYWxFeHBpcmVUaW1lci5nZXQoKSxcbiAgICBzZXRVbml2ZXJzYWxFeHBpcmVUaW1lcjogYXN5bmMgbmV3VmFsdWUgPT4ge1xuICAgICAgYXdhaXQgdW5pdmVyc2FsRXhwaXJlVGltZXIuc2V0KG5ld1ZhbHVlKTtcblxuICAgICAgLy8gVXBkYXRlIGFjY291bnQgaW4gU3RvcmFnZSBTZXJ2aWNlXG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9XG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpO1xuICAgICAgY29uc3QgYWNjb3VudCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgICBhc3NlcnQoYWNjb3VudCwgXCJBY2NvdW50IHdhc24ndCBmb3VuZFwiKTtcblxuICAgICAgYWNjb3VudC5jYXB0dXJlQ2hhbmdlKCd1bml2ZXJzYWxFeHBpcmVUaW1lcicpO1xuXG4gICAgICAvLyBBZGQgYSBub3RpZmljYXRpb24gdG8gdGhlIGN1cnJlbnRseSBvcGVuIGNvbnZlcnNhdGlvblxuICAgICAgY29uc3Qgc3RhdGUgPSB3aW5kb3cucmVkdXhTdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHN0YXRlLmNvbnZlcnNhdGlvbnMuc2VsZWN0ZWRDb252ZXJzYXRpb25JZDtcbiAgICAgIGlmIChzZWxlY3RlZElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChzZWxlY3RlZElkKTtcbiAgICAgICAgYXNzZXJ0KGNvbnZlcnNhdGlvbiwgXCJDb252ZXJzYXRpb24gd2Fzbid0IGZvdW5kXCIpO1xuXG4gICAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbi51cGRhdGVMYXN0TWVzc2FnZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGREYXJrT3ZlcmxheTogKCkgPT4ge1xuICAgICAgaWYgKCQoJy5kYXJrLW92ZXJsYXknKS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgJChkb2N1bWVudC5ib2R5KS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiZGFyay1vdmVybGF5XCI+PC9kaXY+Jyk7XG4gICAgICAkKCcuZGFyay1vdmVybGF5Jykub24oJ2NsaWNrJywgKCkgPT4gJCgnLmRhcmstb3ZlcmxheScpLnJlbW92ZSgpKTtcbiAgICB9LFxuICAgIHJlbW92ZURhcmtPdmVybGF5OiAoKSA9PiAkKCcuZGFyay1vdmVybGF5JykucmVtb3ZlKCksXG4gICAgc2hvd0tleWJvYXJkU2hvcnRjdXRzOiAoKSA9PiB3aW5kb3cuc2hvd0tleWJvYXJkU2hvcnRjdXRzKCksXG5cbiAgICBkZWxldGVBbGxEYXRhOiBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ29CYWNrVG9NYWluUHJvY2VzcygpO1xuXG4gICAgICByZW5kZXJDbGVhcmluZ0RhdGFWaWV3KCk7XG4gICAgfSxcblxuICAgIGNsb3NlREI6IGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nb0JhY2tUb01haW5Qcm9jZXNzKCk7XG4gICAgfSxcblxuICAgIHNob3dTdGlja2VyUGFjazogKHBhY2tJZCwga2V5KSA9PiB7XG4gICAgICAvLyBXZSBjYW4gZ2V0IHRoZXNlIGV2ZW50cyBldmVuIGlmIHRoZSB1c2VyIGhhcyBuZXZlciBsaW5rZWQgdGhpcyBpbnN0YW5jZS5cbiAgICAgIGlmICghd2luZG93LlNpZ25hbC5VdGlsLlJlZ2lzdHJhdGlvbi5ldmVyRG9uZSgpKSB7XG4gICAgICAgIGxvZy53YXJuKCdzaG93U3RpY2tlclBhY2s6IE5vdCByZWdpc3RlcmVkLCByZXR1cm5pbmcgZWFybHknKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5pc1Nob3dpbmdNb2RhbCkge1xuICAgICAgICBsb2cud2Fybignc2hvd1N0aWNrZXJQYWNrOiBBbHJlYWR5IHNob3dpbmcgbW9kYWwsIHJldHVybmluZyBlYXJseScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB3aW5kb3cuaXNTaG93aW5nTW9kYWwgPSB0cnVlO1xuXG4gICAgICAgIC8vIEtpY2sgb2ZmIHRoZSBkb3dubG9hZFxuICAgICAgICBTdGlja2Vycy5kb3dubG9hZEVwaGVtZXJhbFBhY2socGFja0lkLCBrZXkpO1xuXG4gICAgICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgICAgIHBhY2tJZCxcbiAgICAgICAgICBvbkNsb3NlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuaXNTaG93aW5nTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0aWNrZXJQcmV2aWV3TW9kYWxWaWV3LnJlbW92ZSgpO1xuICAgICAgICAgICAgYXdhaXQgU3RpY2tlcnMucmVtb3ZlRXBoZW1lcmFsUGFjayhwYWNrSWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc3RpY2tlclByZXZpZXdNb2RhbFZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICAgICAgY2xhc3NOYW1lOiAnc3RpY2tlci1wcmV2aWV3LW1vZGFsLXdyYXBwZXInLFxuICAgICAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVTdGlja2VyUHJldmlld01vZGFsKFxuICAgICAgICAgICAgd2luZG93LnJlZHV4U3RvcmUsXG4gICAgICAgICAgICBwcm9wc1xuICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgd2luZG93LmlzU2hvd2luZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnc2hvd1N0aWNrZXJQYWNrOiBSYW4gaW50byBhbiBlcnJvciEnLFxuICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICApO1xuICAgICAgICBjb25zdCBlcnJvclZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICAgICAgY2xhc3NOYW1lOiAnZXJyb3ItbW9kYWwtd3JhcHBlcicsXG4gICAgICAgICAgSlNYOiAoXG4gICAgICAgICAgICA8RXJyb3JNb2RhbFxuICAgICAgICAgICAgICBpMThuPXt3aW5kb3cuaTE4bn1cbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGVycm9yVmlldy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93R3JvdXBWaWFMaW5rOiBhc3luYyBoYXNoID0+IHtcbiAgICAgIC8vIFdlIGNhbiBnZXQgdGhlc2UgZXZlbnRzIGV2ZW4gaWYgdGhlIHVzZXIgaGFzIG5ldmVyIGxpbmtlZCB0aGlzIGluc3RhbmNlLlxuICAgICAgaWYgKCF3aW5kb3cuU2lnbmFsLlV0aWwuUmVnaXN0cmF0aW9uLmV2ZXJEb25lKCkpIHtcbiAgICAgICAgbG9nLndhcm4oJ3Nob3dHcm91cFZpYUxpbms6IE5vdCByZWdpc3RlcmVkLCByZXR1cm5pbmcgZWFybHknKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5pc1Nob3dpbmdNb2RhbCkge1xuICAgICAgICBsb2cud2Fybignc2hvd0dyb3VwVmlhTGluazogQWxyZWFkeSBzaG93aW5nIG1vZGFsLCByZXR1cm5pbmcgZWFybHknKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5Hcm91cHMuam9pblZpYUxpbmsoaGFzaCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ3Nob3dHcm91cFZpYUxpbms6IFJhbiBpbnRvIGFuIGVycm9yIScsXG4gICAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGVycm9yVmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICAgICAgICBjbGFzc05hbWU6ICdlcnJvci1tb2RhbC13cmFwcGVyJyxcbiAgICAgICAgICBKU1g6IChcbiAgICAgICAgICAgIDxFcnJvck1vZGFsXG4gICAgICAgICAgICAgIGkxOG49e3dpbmRvdy5pMThufVxuICAgICAgICAgICAgICB0aXRsZT17d2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWdlbmVyYWwtam9pbi1mYWlsdXJlLS10aXRsZScpfVxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17d2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWdlbmVyYWwtam9pbi1mYWlsdXJlJyl9XG4gICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvclZpZXcucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgd2luZG93LmlzU2hvd2luZ01vZGFsID0gZmFsc2U7XG4gICAgfSxcbiAgICBzaG93Q29udmVyc2F0aW9uVmlhU2lnbmFsRG90TWUoaGFzaDogc3RyaW5nKSB7XG4gICAgICBpZiAoIXdpbmRvdy5TaWduYWwuVXRpbC5SZWdpc3RyYXRpb24uZXZlckRvbmUoKSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnc2hvd0NvbnZlcnNhdGlvblZpYVNpZ25hbERvdE1lOiBOb3QgcmVnaXN0ZXJlZCwgcmV0dXJuaW5nIGVhcmx5J1xuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1heWJlRTE2NCA9IHBhcnNlRTE2NEZyb21TaWduYWxEb3RNZUhhc2goaGFzaCk7XG4gICAgICBpZiAobWF5YmVFMTY0KSB7XG4gICAgICAgIHRyaWdnZXIoJ3Nob3dDb252ZXJzYXRpb24nLCBtYXliZUUxNjQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZy5pbmZvKCdzaG93Q29udmVyc2F0aW9uVmlhU2lnbmFsRG90TWU6IGludmFsaWQgRTE2NCcpO1xuICAgICAgaWYgKHdpbmRvdy5pc1Nob3dpbmdNb2RhbCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnc2hvd0NvbnZlcnNhdGlvblZpYVNpZ25hbERvdE1lOiBhIG1vZGFsIGlzIGFscmVhZHkgc2hvd2luZy4gRG9pbmcgbm90aGluZydcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3dVbmtub3duU2dubExpbmtNb2RhbCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmtub3duU2lnbmFsTGluazogKCkgPT4ge1xuICAgICAgbG9nLndhcm4oJ3Vua25vd25TaWduYWxMaW5rOiBTaG93aW5nIGVycm9yIGRpYWxvZycpO1xuICAgICAgc2hvd1Vua25vd25TZ25sTGlua01vZGFsKCk7XG4gICAgfSxcblxuICAgIGluc3RhbGxTdGlja2VyUGFjazogYXN5bmMgKHBhY2tJZCwga2V5KSA9PiB7XG4gICAgICBTdGlja2Vycy5kb3dubG9hZFN0aWNrZXJQYWNrKHBhY2tJZCwga2V5LCB7XG4gICAgICAgIGZpbmFsU3RhdHVzOiAnaW5zdGFsbGVkJyxcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaHV0ZG93bjogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCksXG4gICAgc2hvd1JlbGVhc2VOb3RlczogKCkgPT4ge1xuICAgICAgY29uc3QgeyBzaG93V2hhdHNOZXdNb2RhbCB9ID0gd2luZG93LnJlZHV4QWN0aW9ucy5nbG9iYWxNb2RhbHM7XG4gICAgICBzaG93V2hhdHNOZXdNb2RhbCgpO1xuICAgIH0sXG5cbiAgICBnZXRNZWRpYVBlcm1pc3Npb25zOiB3aW5kb3cuZ2V0TWVkaWFQZXJtaXNzaW9ucyxcbiAgICBnZXRNZWRpYUNhbWVyYVBlcm1pc3Npb25zOiB3aW5kb3cuZ2V0TWVkaWFDYW1lcmFQZXJtaXNzaW9ucyxcblxuICAgIHBlcnNpc3Rab29tRmFjdG9yOiB6b29tRmFjdG9yID0+XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3pvb21GYWN0b3InLCB6b29tRmFjdG9yKSxcblxuICAgIC4uLm92ZXJyaWRlRXZlbnRzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzaG93VW5rbm93blNnbmxMaW5rTW9kYWwoKTogdm9pZCB7XG4gIGNvbnN0IGVycm9yVmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICBjbGFzc05hbWU6ICdlcnJvci1tb2RhbC13cmFwcGVyJyxcbiAgICBKU1g6IChcbiAgICAgIDxFcnJvck1vZGFsXG4gICAgICAgIGkxOG49e3dpbmRvdy5pMThufVxuICAgICAgICBkZXNjcmlwdGlvbj17d2luZG93LmkxOG4oJ3Vua25vd24tc2dubC1saW5rJyl9XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICBlcnJvclZpZXcucmVtb3ZlKCk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICksXG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUF5QjtBQUV6QixZQUF1QjtBQVF2QixvQkFBMkM7QUFDM0MsZUFBMEI7QUFFMUIsK0JBQXVDO0FBRXZDLDhCQUFpQztBQUNqQyx3QkFBMkI7QUFHM0IscUJBQXdCO0FBQ3hCLDJCQUF3RDtBQUN4RCxtQkFBZ0M7QUFDaEMsb0JBQXdCO0FBQ3hCLDBCQUE2QjtBQUM3QixvQ0FBdUM7QUFFdkMsMkJBQXNDO0FBQ3RDLHdDQUEyQztBQUMzQyxvQ0FBdUM7QUFDdkMsb0JBQXVCO0FBQ3ZCLGdCQUEyQjtBQUMzQix5Q0FBNEM7QUFDNUMsc0JBQTZDO0FBQzdDLFVBQXFCO0FBa0lkLHlCQUNMLGlCQUF5QyxDQUFDLEdBQzNCO0FBQ2YsU0FBTztBQUFBLElBQ0wsZUFBZSxNQUFNLE9BQU8sV0FBVyxRQUFRLEtBQUssY0FBYztBQUFBLElBRWxFLGVBQWUsTUFBTSxPQUFPLFFBQVEsSUFBSSxjQUFjLENBQUM7QUFBQSxJQUN2RCxlQUFlLE9BQU8sZUFBK0I7QUFDbkQsK0JBQVMsY0FBYyxVQUFVO0FBQUEsSUFDbkM7QUFBQSxJQUVBLDhCQUE4QixNQUM1QixPQUFPLFFBQVEsSUFBSSw4QkFBOEI7QUFBQSxJQUNuRCw4QkFBOEIsWUFDNUIsT0FBTyxRQUFRLElBQUksZ0NBQWdDLE1BQU07QUFBQSxJQUMzRCwrQkFBK0IsTUFDN0IsT0FBTyxRQUFRLElBQUksK0JBQStCO0FBQUEsSUFDcEQsK0JBQStCLFlBQzdCLE9BQU8sUUFBUSxJQUFJLGlDQUFpQyxNQUFNO0FBQUEsSUFDNUQsOEJBQThCLE1BQzVCLE9BQU8sUUFBUSxJQUFJLDhCQUE4QjtBQUFBLElBQ25ELDhCQUE4QixZQUM1QixPQUFPLFFBQVEsSUFBSSxnQ0FBZ0MsTUFBTTtBQUFBLElBRzNELGlCQUFpQixNQUFNO0FBQ3JCLGFBQU8sa0NBQWdCLE9BQU8sV0FBVyxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQUEsSUFDM0Q7QUFBQSxJQUNBLGlDQUFpQyxhQUFXO0FBQzFDLGFBQU8sa0VBQ0wsT0FBTyxXQUFXLFNBQVMsQ0FDN0IsRUFBRSxPQUFPO0FBQUEsSUFDWDtBQUFBLElBQ0EsZ0JBQWdCLElBQUksU0FDbEIsT0FBTyxhQUFhLE1BQU0sZUFBZSxHQUFHLElBQUk7QUFBQSxJQUNsRCxpQkFBaUIsSUFBSSxTQUNuQixPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJO0FBQUEsSUFDbkQsbUJBQW1CLGFBQ2pCLE9BQU8sYUFBYSxNQUFNLGtCQUFrQixPQUFPO0FBQUEsSUFDckQsa0NBQWtDLGFBQ2hDLE9BQU8sYUFBYSxjQUFjLGlDQUNoQyxPQUNGO0FBQUEsSUFDRixvQkFBb0IsTUFDbEIsT0FBTyxhQUFhLGNBQWMsbUJBQW1CO0FBQUEsSUFDdkQsdUJBQXVCLE1BQ3JCLE9BQU8sYUFBYSxNQUFNLHNCQUFzQjtBQUFBLElBQ2xELG1DQUFtQyxJQUFJLFNBQ3JDLE9BQU8sYUFBYSxNQUFNLGtDQUFrQyxHQUFHLElBQUk7QUFBQSxJQUdyRSx1QkFBdUIsWUFBWTtBQUNqQyxZQUFNLEVBQUUsa0JBQWtCLHNCQUFzQixzQkFDOUMsTUFBTSx1QkFBUSxzQkFBc0I7QUFFdEMsYUFBTztBQUFBLFFBRUwsa0JBQWtCLGlCQUFpQixJQUNqQyxDQUFDLG9CQUFzQztBQUFBLFVBQ3JDLFVBQVUsZ0JBQWdCO0FBQUEsVUFDMUIsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFVBQ3RCLE9BQU8sZ0JBQWdCO0FBQUEsUUFDekIsRUFDRjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGlCQUFpQixNQUNmLE9BQU8sUUFBUSxRQUFRLGdCQUFnQixFQUFFLFNBQ3pDLE9BQU8sUUFBUSxRQUFRLGlCQUFpQixFQUFFO0FBQUEsSUFDNUMsNkJBQTZCLE1BQzNCLE9BQU8sUUFBUSxJQUNiLDRCQUNBLHdDQUNGO0FBQUEsSUFDRix1QkFBdUIsTUFBTSxPQUFPLFFBQVEsSUFBSSxnQkFBZ0IsS0FBSztBQUFBLElBQ3JFLHNDQUFzQyxNQUNwQyxPQUFPLFFBQVEsSUFDYiw4QkFDQSw2REFBMkIsZUFDN0I7QUFBQSxJQUNGLDhCQUE4QixNQUM1QixPQUFPLFFBQVEsSUFDYiwwQkFDQSxxREFBdUIsTUFDekI7QUFBQSxJQUNGLHVCQUF1QixNQUNyQixPQUFPLFFBQVEsSUFBSSx3QkFBd0IsS0FBSztBQUFBLElBQ2xELDJCQUEyQixNQUN6QixPQUFPLFFBQVEsSUFBSSxvQkFBb0IsS0FBSztBQUFBLElBRzlDLHVCQUF1QixNQUNyQixPQUFPLFFBQVEsSUFBSSx3QkFBd0IsSUFBSTtBQUFBLElBQ2pELHVCQUF1QixXQUNyQixPQUFPLFFBQVEsSUFBSSx3QkFBd0IsS0FBSztBQUFBLElBQ2xELGlCQUFpQixNQUFNLE9BQU8sUUFBUSxJQUFJLGlCQUFpQixRQUFRO0FBQUEsSUFDbkUsaUJBQWlCLFdBQVM7QUFDeEIsWUFBTSxVQUFVLE9BQU8sUUFBUSxJQUFJLGlCQUFpQixLQUFLO0FBQ3pELDRDQUFhO0FBQ2IsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLGdCQUFnQixNQUFNLE9BQU8sUUFBUSxJQUFJLGVBQWU7QUFBQSxJQUN4RCxnQkFBZ0IsV0FBUztBQUN2QixZQUFNLFVBQVUsT0FBTyxRQUFRLElBQUksaUJBQWlCLEtBQUs7QUFDekQsYUFBTyxtQkFBbUIsS0FBSztBQUMvQixhQUFPLHFCQUFxQixDQUFDLEtBQUs7QUFDbEMsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLHNCQUFzQixNQUNwQixxREFBdUIsT0FBTyxRQUFRLElBQUkscUJBQXFCLENBQUM7QUFBQSxJQUNsRSxzQkFBc0IsV0FBUztBQUM3QixZQUFNLFVBQVUsT0FBTyxRQUFRLElBQUksdUJBQXVCLEtBQUs7QUFDL0QsYUFBTyx3QkFBd0IsS0FBSztBQUNwQyxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsd0JBQXdCLE1BQ3RCLE9BQU8sUUFBUSxJQUFJLHdCQUF3QixTQUFTO0FBQUEsSUFDdEQsd0JBQXdCLENBQUMsVUFDdkIsT0FBTyxRQUFRLElBQUksd0JBQXdCLEtBQUs7QUFBQSxJQUNsRCw4QkFBOEIsTUFDNUIsT0FBTyxRQUFRLElBQUksK0JBQStCLElBQUk7QUFBQSxJQUN4RCw4QkFBOEIsV0FDNUIsT0FBTyxRQUFRLElBQUksK0JBQStCLEtBQUs7QUFBQSxJQUN6RCxzQkFBc0IsTUFBTSxPQUFPLFFBQVEsSUFBSSxvQkFBb0I7QUFBQSxJQUNuRSxzQkFBc0IsV0FDcEIsT0FBTyxRQUFRLElBQUksc0JBQXNCLEtBQUs7QUFBQSxJQUNoRCw0QkFBNEIsTUFDMUIsT0FBTyxRQUFRLElBQUksbUNBQW1DLEtBQUs7QUFBQSxJQUM3RCw0QkFBNEIsV0FBUztBQUNuQyxZQUFNLFVBQVUsT0FBTyxRQUFRLElBQzdCLG1DQUNBLEtBQ0Y7QUFDQSxhQUFPLFFBQVEsT0FBTyxRQUFRLG1CQUFtQjtBQUNqRCxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsNkJBQTZCLE1BQzNCLE9BQU8sUUFBUSxJQUFJLDhCQUE4QixJQUFJO0FBQUEsSUFDdkQsNkJBQTZCLFdBQzNCLE9BQU8sUUFBUSxJQUFJLDhCQUE4QixLQUFLO0FBQUEsSUFDeEQsMkJBQTJCLE1BQ3pCLE9BQU8sUUFBUSxJQUFJLDRCQUE0QixJQUFJO0FBQUEsSUFDckQsMkJBQTJCLFdBQ3pCLE9BQU8sUUFBUSxJQUFJLDRCQUE0QixLQUFLO0FBQUEsSUFDdEQsNkJBQTZCLE1BQzNCLE9BQU8sUUFBUSxJQUFJLDhCQUE4QixJQUFJO0FBQUEsSUFDdkQsNkJBQTZCLFdBQzNCLE9BQU8sUUFBUSxJQUFJLDhCQUE4QixLQUFLO0FBQUEsSUFFeEQsZUFBZSxNQUFNLE9BQU8sUUFBUSxJQUFJLGVBQWUsSUFBSTtBQUFBLElBQzNELGVBQWUsV0FBUyxPQUFPLFFBQVEsSUFBSSxlQUFlLEtBQUs7QUFBQSxJQUUvRCxxQkFBcUIsTUFBTSxPQUFPLFFBQVEsSUFBSSxvQkFBb0I7QUFBQSxJQUNsRSxxQkFBcUIsV0FDbkIsT0FBTyxRQUFRLElBQUksc0JBQXNCLEtBQUs7QUFBQSxJQUVoRCxlQUFlLE1BQU0sT0FBTyxjQUFjO0FBQUEsSUFDMUMsZUFBZSxPQUFPLFVBQW1CO0FBQ3ZDLGFBQU8sT0FBTyxjQUFjLEtBQUs7QUFBQSxJQUNuQztBQUFBLElBRUEsNkJBQTZCLE1BQU0sb0VBQTRCO0FBQUEsSUFDL0QsV0FBVyxNQUFNLE9BQU8sV0FBVyxRQUFRLEtBQUssWUFBWSxNQUFNO0FBQUEsSUFDbEUsYUFBYSxNQUNYLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztBQUNyQyxZQUFNLGVBQWUsSUFBSSxVQUFVO0FBQ25DLFlBQU0sY0FBYyxPQUFPLGVBQWUsWUFBWTtBQUN0RCxrQkFBWSxpQkFBaUIsV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUN2RCxrQkFBWSxpQkFBaUIsV0FBVyxNQUN0QyxPQUFPLElBQUksTUFBTSxTQUFTLENBQUMsQ0FDN0I7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNILGlCQUFpQixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVc7QUFBQSxJQUNyRCxpQkFBaUIsV0FBUyxPQUFPLFFBQVEsSUFBSSxhQUFhLEtBQUs7QUFBQSxJQUMvRCx5QkFBeUIsTUFBTSxxQkFBcUIsSUFBSTtBQUFBLElBQ3hELHlCQUF5QixPQUFNLGFBQVk7QUFDekMsWUFBTSxxQkFBcUIsSUFBSSxRQUFRO0FBR3ZDLFlBQU0saUJBQ0osT0FBTyx1QkFBdUIsNEJBQTRCO0FBQzVELFlBQU0sVUFBVSxPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDaEUsZ0NBQU8sU0FBUyxzQkFBc0I7QUFFdEMsY0FBUSxjQUFjLHNCQUFzQjtBQUc1QyxZQUFNLFFBQVEsT0FBTyxXQUFXLFNBQVM7QUFDekMsWUFBTSxhQUFhLE1BQU0sY0FBYztBQUN2QyxVQUFJLFlBQVk7QUFDZCxjQUFNLGVBQWUsT0FBTyx1QkFBdUIsSUFBSSxVQUFVO0FBQ2pFLGtDQUFPLGNBQWMsMkJBQTJCO0FBRWhELGNBQU0sYUFBYSxrQkFBa0I7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFBQSxJQUVBLGdCQUFnQixNQUFNO0FBQ3BCLFVBQUksRUFBRSxlQUFlLEVBQUUsUUFBUTtBQUM3QjtBQUFBLE1BQ0Y7QUFDQSxRQUFFLFNBQVMsSUFBSSxFQUFFLFFBQVEsa0NBQWtDO0FBQzNELFFBQUUsZUFBZSxFQUFFLEdBQUcsU0FBUyxNQUFNLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQztBQUFBLElBQ2xFO0FBQUEsSUFDQSxtQkFBbUIsTUFBTSxFQUFFLGVBQWUsRUFBRSxPQUFPO0FBQUEsSUFDbkQsdUJBQXVCLE1BQU0sT0FBTyxzQkFBc0I7QUFBQSxJQUUxRCxlQUFlLFlBQVk7QUFDekIsWUFBTSxPQUFPLE9BQU8sS0FBSyxvQkFBb0I7QUFFN0MsZ0VBQXVCO0FBQUEsSUFDekI7QUFBQSxJQUVBLFNBQVMsWUFBWTtBQUNuQixZQUFNLE9BQU8sT0FBTyxLQUFLLG9CQUFvQjtBQUFBLElBQy9DO0FBQUEsSUFFQSxpQkFBaUIsQ0FBQyxRQUFRLFFBQVE7QUFFaEMsVUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLGFBQWEsU0FBUyxHQUFHO0FBQy9DLFlBQUksS0FBSyxrREFBa0Q7QUFDM0Q7QUFBQSxNQUNGO0FBQ0EsVUFBSSxPQUFPLGdCQUFnQjtBQUN6QixZQUFJLEtBQUsseURBQXlEO0FBQ2xFO0FBQUEsTUFDRjtBQUNBLFVBQUk7QUFDRixlQUFPLGlCQUFpQjtBQUd4QixpQkFBUyxzQkFBc0IsUUFBUSxHQUFHO0FBRTFDLGNBQU0sUUFBUTtBQUFBLFVBQ1o7QUFBQSxVQUNBLFNBQVMsWUFBWTtBQUNuQixtQkFBTyxpQkFBaUI7QUFDeEIsb0NBQXdCLE9BQU87QUFDL0Isa0JBQU0sU0FBUyxvQkFBb0IsTUFBTTtBQUFBLFVBQzNDO0FBQUEsUUFDRjtBQUVBLGNBQU0sMEJBQTBCLElBQUkseUNBQWlCO0FBQUEsVUFDbkQsV0FBVztBQUFBLFVBQ1gsS0FBSyxPQUFPLE9BQU8sTUFBTSxNQUFNLDBCQUM3QixPQUFPLFlBQ1AsS0FDRjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsU0FBUyxPQUFQO0FBQ0EsZUFBTyxpQkFBaUI7QUFDeEIsWUFBSSxNQUNGLHVDQUNBLFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUN2QztBQUNBLGNBQU0sWUFBWSxJQUFJLHlDQUFpQjtBQUFBLFVBQ3JDLFdBQVc7QUFBQSxVQUNYLEtBQ0Usb0NBQUM7QUFBQSxZQUNDLE1BQU0sT0FBTztBQUFBLFlBQ2IsU0FBUyxNQUFNO0FBQ2Isd0JBQVUsT0FBTztBQUFBLFlBQ25CO0FBQUEsV0FDRjtBQUFBLFFBRUosQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsSUFDQSxrQkFBa0IsT0FBTSxTQUFRO0FBRTlCLFVBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxhQUFhLFNBQVMsR0FBRztBQUMvQyxZQUFJLEtBQUssbURBQW1EO0FBQzVEO0FBQUEsTUFDRjtBQUNBLFVBQUksT0FBTyxnQkFBZ0I7QUFDekIsWUFBSSxLQUFLLDBEQUEwRDtBQUNuRTtBQUFBLE1BQ0Y7QUFDQSxVQUFJO0FBQ0YsY0FBTSxPQUFPLE9BQU8sT0FBTyxZQUFZLElBQUk7QUFBQSxNQUM3QyxTQUFTLE9BQVA7QUFDQSxZQUFJLE1BQ0Ysd0NBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQ0EsY0FBTSxZQUFZLElBQUkseUNBQWlCO0FBQUEsVUFDckMsV0FBVztBQUFBLFVBQ1gsS0FDRSxvQ0FBQztBQUFBLFlBQ0MsTUFBTSxPQUFPO0FBQUEsWUFDYixPQUFPLE9BQU8sS0FBSyw0Q0FBNEM7QUFBQSxZQUMvRCxhQUFhLE9BQU8sS0FBSyxxQ0FBcUM7QUFBQSxZQUM5RCxTQUFTLE1BQU07QUFDYix3QkFBVSxPQUFPO0FBQUEsWUFDbkI7QUFBQSxXQUNGO0FBQUEsUUFFSixDQUFDO0FBQUEsTUFDSDtBQUNBLGFBQU8saUJBQWlCO0FBQUEsSUFDMUI7QUFBQSxJQUNBLCtCQUErQixNQUFjO0FBQzNDLFVBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxhQUFhLFNBQVMsR0FBRztBQUMvQyxZQUFJLEtBQ0YsaUVBQ0Y7QUFDQTtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFlBQVksa0RBQTZCLElBQUk7QUFDbkQsVUFBSSxXQUFXO0FBQ2IsbUNBQVEsb0JBQW9CLFNBQVM7QUFDckM7QUFBQSxNQUNGO0FBRUEsVUFBSSxLQUFLLDhDQUE4QztBQUN2RCxVQUFJLE9BQU8sZ0JBQWdCO0FBQ3pCLFlBQUksS0FDRiwyRUFDRjtBQUFBLE1BQ0YsT0FBTztBQUNMLGlDQUF5QjtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBLElBRUEsbUJBQW1CLE1BQU07QUFDdkIsVUFBSSxLQUFLLHlDQUF5QztBQUNsRCwrQkFBeUI7QUFBQSxJQUMzQjtBQUFBLElBRUEsb0JBQW9CLE9BQU8sUUFBUSxRQUFRO0FBQ3pDLGVBQVMsb0JBQW9CLFFBQVEsS0FBSztBQUFBLFFBQ3hDLGFBQWE7QUFBQSxNQUNmLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFQSxVQUFVLE1BQU0sUUFBUSxRQUFRO0FBQUEsSUFDaEMsa0JBQWtCLE1BQU07QUFDdEIsWUFBTSxFQUFFLHNCQUFzQixPQUFPLGFBQWE7QUFDbEQsd0JBQWtCO0FBQUEsSUFDcEI7QUFBQSxJQUVBLHFCQUFxQixPQUFPO0FBQUEsSUFDNUIsMkJBQTJCLE9BQU87QUFBQSxJQUVsQyxtQkFBbUIsZ0JBQ2pCLE9BQU8sUUFBUSxJQUFJLGNBQWMsVUFBVTtBQUFBLE9BRTFDO0FBQUEsRUFDTDtBQUNGO0FBbFdnQixBQW9XaEIsb0NBQTBDO0FBQ3hDLFFBQU0sWUFBWSxJQUFJLHlDQUFpQjtBQUFBLElBQ3JDLFdBQVc7QUFBQSxJQUNYLEtBQ0Usb0NBQUM7QUFBQSxNQUNDLE1BQU0sT0FBTztBQUFBLE1BQ2IsYUFBYSxPQUFPLEtBQUssbUJBQW1CO0FBQUEsTUFDNUMsU0FBUyxNQUFNO0FBQ2Isa0JBQVUsT0FBTztBQUFBLE1BQ25CO0FBQUEsS0FDRjtBQUFBLEVBRUosQ0FBQztBQUNIO0FBYlMiLAogICJuYW1lcyI6IFtdCn0K
