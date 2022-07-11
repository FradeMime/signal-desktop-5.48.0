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
var notifications_exports = {};
__export(notifications_exports, {
  FALLBACK_NOTIFICATION_TITLE: () => FALLBACK_NOTIFICATION_TITLE,
  NotificationSetting: () => NotificationSetting,
  notificationService: () => notificationService
});
module.exports = __toCommonJS(notifications_exports);
var import_lodash = require("lodash");
var import_events = __toESM(require("events"));
var import_Sound = require("../util/Sound");
var import_Settings = require("../types/Settings");
var OS = __toESM(require("../OS"));
var log = __toESM(require("../logging/log"));
var import_enum = require("../util/enum");
var import_missingCaseError = require("../util/missingCaseError");
var NotificationSetting = /* @__PURE__ */ ((NotificationSetting2) => {
  NotificationSetting2["Off"] = "off";
  NotificationSetting2["NoNameOrMessage"] = "count";
  NotificationSetting2["NameOnly"] = "name";
  NotificationSetting2["NameAndMessage"] = "message";
  return NotificationSetting2;
})(NotificationSetting || {});
const parseNotificationSetting = (0, import_enum.makeEnumParser)(NotificationSetting, "message" /* NameAndMessage */);
const FALLBACK_NOTIFICATION_TITLE = "Signal";
class NotificationService extends import_events.default {
  constructor() {
    super();
    this.isEnabled = false;
    this.lastNotification = null;
    this.notificationData = null;
    this.update = (0, import_lodash.debounce)(this.fastUpdate.bind(this), 1e3);
  }
  initialize({
    i18n,
    storage
  }) {
    log.info("NotificationService initialized");
    this.i18n = i18n;
    this.storage = storage;
  }
  getStorage() {
    if (this.storage) {
      return this.storage;
    }
    log.error("NotificationService not initialized. Falling back to window.storage, but you should fix this");
    return window.storage;
  }
  getI18n() {
    if (this.i18n) {
      return this.i18n;
    }
    log.error("NotificationService not initialized. Falling back to window.i18n, but you should fix this");
    return window.i18n;
  }
  add(notificationData) {
    log.info("NotificationService: adding a notification and requesting an update");
    this.notificationData = notificationData;
    this.update();
  }
  notify({
    icon,
    message,
    onNotificationClick,
    silent,
    title
  }) {
    log.info("NotificationService: showing a notification");
    this.lastNotification?.close();
    const audioNotificationSupport = (0, import_Settings.getAudioNotificationSupport)();
    const notification = new window.Notification(title, {
      body: OS.isLinux() ? filterNotificationText(message) : message,
      icon,
      silent: silent || audioNotificationSupport !== import_Settings.AudioNotificationSupport.Native
    });
    notification.onclick = onNotificationClick;
    if (!silent && audioNotificationSupport === import_Settings.AudioNotificationSupport.Custom) {
      new import_Sound.Sound({ src: "sounds/notification.ogg" }).play();
    }
    this.lastNotification = notification;
  }
  removeBy({
    conversationId,
    messageId,
    emoji,
    targetAuthorUuid,
    targetTimestamp
  }) {
    if (!this.notificationData) {
      log.info("NotificationService#removeBy: no notification data");
      return;
    }
    let shouldClear = false;
    if (conversationId && this.notificationData.conversationId === conversationId) {
      log.info("NotificationService#removeBy: conversation ID matches");
      shouldClear = true;
    }
    if (messageId && this.notificationData.messageId === messageId) {
      log.info("NotificationService#removeBy: message ID matches");
      shouldClear = true;
    }
    if (!shouldClear) {
      return;
    }
    const { reaction } = this.notificationData;
    if (reaction && emoji && targetAuthorUuid && targetTimestamp && (reaction.emoji !== emoji || reaction.targetAuthorUuid !== targetAuthorUuid || reaction.targetTimestamp !== targetTimestamp)) {
      return;
    }
    this.clear();
    this.update();
  }
  fastUpdate() {
    const storage = this.getStorage();
    const i18n = this.getI18n();
    if (this.lastNotification) {
      this.lastNotification.close();
      this.lastNotification = null;
    }
    const { notificationData } = this;
    const isAppFocused = window.isActive();
    const userSetting = this.getNotificationSetting();
    const shouldShowNotification = this.isEnabled && !isAppFocused && notificationData;
    if (!shouldShowNotification) {
      log.info(`NotificationService not updating notifications. Notifications are ${this.isEnabled ? "enabled" : "disabled"}; app is ${isAppFocused ? "" : "not "}focused; there is ${notificationData ? "" : "no "}notification data`);
      if (isAppFocused) {
        this.notificationData = null;
      }
      return;
    }
    const shouldPlayNotificationSound = Boolean(storage.get("audio-notification"));
    const shouldDrawAttention = storage.get("notification-draw-attention", true);
    if (shouldDrawAttention) {
      log.info("NotificationService: drawing attention");
      window.drawAttention();
    }
    let notificationTitle;
    let notificationMessage;
    let notificationIconUrl;
    const {
      conversationId,
      messageId,
      senderTitle,
      message,
      isExpiringMessage,
      reaction,
      wasShown
    } = notificationData;
    if (wasShown) {
      log.info("NotificationService: not showing a notification because it was already shown");
      return;
    }
    switch (userSetting) {
      case "off" /* Off */:
        log.info("NotificationService: not showing a notification because user has disabled it");
        return;
      case "name" /* NameOnly */:
      case "message" /* NameAndMessage */: {
        notificationTitle = senderTitle;
        ({ notificationIconUrl } = notificationData);
        if (isExpiringMessage && (0, import_Settings.shouldHideExpiringMessageBody)()) {
          notificationMessage = i18n("newMessage");
        } else if (userSetting === "name" /* NameOnly */) {
          if (reaction) {
            notificationMessage = i18n("notificationReaction", {
              sender: senderTitle,
              emoji: reaction.emoji
            });
          } else {
            notificationMessage = i18n("newMessage");
          }
        } else if (reaction) {
          notificationMessage = i18n("notificationReactionMessage", {
            sender: senderTitle,
            emoji: reaction.emoji,
            message
          });
        } else {
          notificationMessage = message;
        }
        break;
      }
      case "count" /* NoNameOrMessage */:
        notificationTitle = FALLBACK_NOTIFICATION_TITLE;
        notificationMessage = i18n("newMessage");
        break;
      default:
        log.error((0, import_missingCaseError.missingCaseError)(userSetting));
        notificationTitle = FALLBACK_NOTIFICATION_TITLE;
        notificationMessage = i18n("newMessage");
        break;
    }
    log.info("NotificationService: requesting a notification to be shown");
    this.notificationData = {
      ...notificationData,
      wasShown: true
    };
    this.notify({
      title: notificationTitle,
      icon: notificationIconUrl,
      message: notificationMessage,
      silent: !shouldPlayNotificationSound,
      onNotificationClick: () => {
        this.emit("click", conversationId, messageId);
      }
    });
  }
  getNotificationSetting() {
    return parseNotificationSetting(this.getStorage().get("notification-setting"));
  }
  clear() {
    log.info("NotificationService: clearing notification and requesting an update");
    this.notificationData = null;
    this.update();
  }
  fastClear() {
    log.info("NotificationService: clearing notification and updating");
    this.notificationData = null;
    this.fastUpdate();
  }
  enable() {
    log.info("NotificationService: enabling");
    const needUpdate = !this.isEnabled;
    this.isEnabled = true;
    if (needUpdate) {
      this.update();
    }
  }
  disable() {
    log.info("NotificationService: disabling");
    this.isEnabled = false;
  }
}
const notificationService = new NotificationService();
function filterNotificationText(text) {
  return (text || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FALLBACK_NOTIFICATION_TITLE,
  NotificationSetting,
  notificationService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm90aWZpY2F0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IFNvdW5kIH0gZnJvbSAnLi4vdXRpbC9Tb3VuZCc7XG5pbXBvcnQge1xuICBBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQsXG4gIGdldEF1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydCxcbiAgc2hvdWxkSGlkZUV4cGlyaW5nTWVzc2FnZUJvZHksXG59IGZyb20gJy4uL3R5cGVzL1NldHRpbmdzJztcbmltcG9ydCAqIGFzIE9TIGZyb20gJy4uL09TJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBtYWtlRW51bVBhcnNlciB9IGZyb20gJy4uL3V0aWwvZW51bSc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB0eXBlIHsgU3RvcmFnZUludGVyZmFjZSB9IGZyb20gJy4uL3R5cGVzL1N0b3JhZ2UuZCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxudHlwZSBOb3RpZmljYXRpb25EYXRhVHlwZSA9IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gIHNlbmRlclRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgbm90aWZpY2F0aW9uSWNvblVybD86IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgaXNFeHBpcmluZ01lc3NhZ2U6IGJvb2xlYW47XG4gIHJlYWN0aW9uOiB7XG4gICAgZW1vamk6IHN0cmluZztcbiAgICB0YXJnZXRBdXRob3JVdWlkOiBzdHJpbmc7XG4gICAgdGFyZ2V0VGltZXN0YW1wOiBudW1iZXI7XG4gIH07XG4gIHdhc1Nob3duPzogYm9vbGVhbjtcbn0+O1xuXG4vLyBUaGUga2V5cyBhbmQgdmFsdWVzIGRvbid0IG1hdGNoIGhlcmUuIFRoaXMgaXMgYmVjYXVzZSB0aGUgdmFsdWVzIGNvcnJlc3BvbmQgdG8gb2xkXG4vLyAgIHNldHRpbmcgbmFtZXMuIEluIHRoZSBmdXR1cmUsIHdlIG1heSB3aXNoIHRvIG1pZ3JhdGUgdGhlc2UgdG8gbWF0Y2guXG5leHBvcnQgZW51bSBOb3RpZmljYXRpb25TZXR0aW5nIHtcbiAgT2ZmID0gJ29mZicsXG4gIE5vTmFtZU9yTWVzc2FnZSA9ICdjb3VudCcsXG4gIE5hbWVPbmx5ID0gJ25hbWUnLFxuICBOYW1lQW5kTWVzc2FnZSA9ICdtZXNzYWdlJyxcbn1cblxuY29uc3QgcGFyc2VOb3RpZmljYXRpb25TZXR0aW5nID0gbWFrZUVudW1QYXJzZXIoXG4gIE5vdGlmaWNhdGlvblNldHRpbmcsXG4gIE5vdGlmaWNhdGlvblNldHRpbmcuTmFtZUFuZE1lc3NhZ2Vcbik7XG5cbmV4cG9ydCBjb25zdCBGQUxMQkFDS19OT1RJRklDQVRJT05fVElUTEUgPSAnU2lnbmFsJztcblxuLy8gRWxlY3Ryb24sIGF0IGxlYXN0IG9uIFdpbmRvd3MgYW5kIG1hY09TLCBvbmx5IHNob3dzIG9uZSBub3RpZmljYXRpb24gYXQgYSB0aW1lIChzZWVcbi8vICAgaXNzdWVzIFsjMTUzNjRdWzBdIGFuZCBbIzIxNjQ2XVsxXSwgYW1vbmcgb3RoZXJzKS4gQmVjYXVzZSBvZiB0aGF0LCB3ZSBoYXZlIGFcbi8vICAgc2luZ2xlIHNsb3QgZm9yIG5vdGlmaWNhdGlvbnMsIGFuZCBvbmNlIGEgbm90aWZpY2F0aW9uIGlzIGRpc21pc3NlZCwgYWxsIG9mXG4vLyAgIFNpZ25hbCdzIG5vdGlmaWNhdGlvbnMgYXJlIGRpc21pc3NlZC5cbi8vIFswXTogaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uL2VsZWN0cm9uL2lzc3Vlcy8xNTM2NFxuLy8gWzFdOiBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24vZWxlY3Ryb24vaXNzdWVzLzIxNjQ2XG5jbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBpMThuPzogTG9jYWxpemVyVHlwZTtcblxuICBwcml2YXRlIHN0b3JhZ2U/OiBTdG9yYWdlSW50ZXJmYWNlO1xuXG4gIHB1YmxpYyBpc0VuYWJsZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIGxhc3ROb3RpZmljYXRpb246IG51bGwgfCBOb3RpZmljYXRpb24gPSBudWxsO1xuXG4gIHByaXZhdGUgbm90aWZpY2F0aW9uRGF0YTogbnVsbCB8IE5vdGlmaWNhdGlvbkRhdGFUeXBlID0gbnVsbDtcblxuICAvLyBUZXN0aW5nIGluZGljYXRlZCB0aGF0IHRyeWluZyB0byBjcmVhdGUvZGVzdHJveSBub3RpZmljYXRpb25zIHRvbyBxdWlja2x5XG4gIC8vICAgcmVzdWx0ZWQgaW4gbm90aWZpY2F0aW9ucyB0aGF0IHN0dWNrIGFyb3VuZCBmb3JldmVyLCByZXF1aXJpbmcgdGhlIHVzZXJcbiAgLy8gICB0byBtYW51YWxseSBjbG9zZSB0aGVtLiBUaGlzIGludHJvZHVjZXMgYSBtaW5pbXVtIGFtb3VudCBvZiB0aW1lIGJldHdlZW4gY2FsbHMsXG4gIC8vICAgYW5kIGJhdGNoZXMgdXAgdGhlIHF1aWNrIHN1Y2Nlc3NpdmUgdXBkYXRlKCkgY2FsbHMgd2UgZ2V0IGZyb20gYW4gaW5jb21pbmdcbiAgLy8gICByZWFkIHN5bmMsIHdoaWNoIG1pZ2h0IGhhdmUgYSBudW1iZXIgb2YgbWVzc2FnZXMgcmVmZXJlbmNlZCBpbnNpZGUgb2YgaXQuXG4gIHByaXZhdGUgdXBkYXRlOiAoKSA9PiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnVwZGF0ZSA9IGRlYm91bmNlKHRoaXMuZmFzdFVwZGF0ZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKHtcbiAgICBpMThuLFxuICAgIHN0b3JhZ2UsXG4gIH06IFJlYWRvbmx5PHsgaTE4bjogTG9jYWxpemVyVHlwZTsgc3RvcmFnZTogU3RvcmFnZUludGVyZmFjZSB9Pik6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdOb3RpZmljYXRpb25TZXJ2aWNlIGluaXRpYWxpemVkJyk7XG4gICAgdGhpcy5pMThuID0gaTE4bjtcbiAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdG9yYWdlKCk6IFN0b3JhZ2VJbnRlcmZhY2Uge1xuICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2U7XG4gICAgfVxuXG4gICAgbG9nLmVycm9yKFxuICAgICAgJ05vdGlmaWNhdGlvblNlcnZpY2Ugbm90IGluaXRpYWxpemVkLiBGYWxsaW5nIGJhY2sgdG8gd2luZG93LnN0b3JhZ2UsIGJ1dCB5b3Ugc2hvdWxkIGZpeCB0aGlzJ1xuICAgICk7XG4gICAgcmV0dXJuIHdpbmRvdy5zdG9yYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJMThuKCk6IExvY2FsaXplclR5cGUge1xuICAgIGlmICh0aGlzLmkxOG4pIHtcbiAgICAgIHJldHVybiB0aGlzLmkxOG47XG4gICAgfVxuXG4gICAgbG9nLmVycm9yKFxuICAgICAgJ05vdGlmaWNhdGlvblNlcnZpY2Ugbm90IGluaXRpYWxpemVkLiBGYWxsaW5nIGJhY2sgdG8gd2luZG93LmkxOG4sIGJ1dCB5b3Ugc2hvdWxkIGZpeCB0aGlzJ1xuICAgICk7XG4gICAgcmV0dXJuIHdpbmRvdy5pMThuO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgaGlnaGVyLWxldmVsIHdyYXBwZXIgYXJvdW5kIGB3aW5kb3cuTm90aWZpY2F0aW9uYC4gWW91IG1heSBwcmVmZXIgdG8gdXNlIGBub3RpZnlgLFxuICAgKiB3aGljaCBkb2Vzbid0IGNoZWNrIHBlcm1pc3Npb25zLCBkbyBhbnkgZmlsdGVyaW5nLCBldGMuXG4gICAqL1xuICBwdWJsaWMgYWRkKG5vdGlmaWNhdGlvbkRhdGE6IE9taXQ8Tm90aWZpY2F0aW9uRGF0YVR5cGUsICd3YXNTaG93bic+KTogdm9pZCB7XG4gICAgbG9nLmluZm8oXG4gICAgICAnTm90aWZpY2F0aW9uU2VydmljZTogYWRkaW5nIGEgbm90aWZpY2F0aW9uIGFuZCByZXF1ZXN0aW5nIGFuIHVwZGF0ZSdcbiAgICApO1xuICAgIHRoaXMubm90aWZpY2F0aW9uRGF0YSA9IG5vdGlmaWNhdGlvbkRhdGE7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGxvd2VyLWxldmVsIHdyYXBwZXIgYXJvdW5kIGB3aW5kb3cuTm90aWZpY2F0aW9uYC4gWW91IG1heSBwcmVmZXIgdG8gdXNlIGBhZGRgLFxuICAgKiB3aGljaCBpbmNsdWRlcyBkZWJvdW5jaW5nIGFuZCB1c2VyIHBlcm1pc3Npb24gbG9naWMuXG4gICAqL1xuICBwdWJsaWMgbm90aWZ5KHtcbiAgICBpY29uLFxuICAgIG1lc3NhZ2UsXG4gICAgb25Ob3RpZmljYXRpb25DbGljayxcbiAgICBzaWxlbnQsXG4gICAgdGl0bGUsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBvbk5vdGlmaWNhdGlvbkNsaWNrOiAoKSA9PiB2b2lkO1xuICAgIHNpbGVudDogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICB9Pik6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdOb3RpZmljYXRpb25TZXJ2aWNlOiBzaG93aW5nIGEgbm90aWZpY2F0aW9uJyk7XG5cbiAgICB0aGlzLmxhc3ROb3RpZmljYXRpb24/LmNsb3NlKCk7XG5cbiAgICBjb25zdCBhdWRpb05vdGlmaWNhdGlvblN1cHBvcnQgPSBnZXRBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQoKTtcblxuICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyB3aW5kb3cuTm90aWZpY2F0aW9uKHRpdGxlLCB7XG4gICAgICBib2R5OiBPUy5pc0xpbnV4KCkgPyBmaWx0ZXJOb3RpZmljYXRpb25UZXh0KG1lc3NhZ2UpIDogbWVzc2FnZSxcbiAgICAgIGljb24sXG4gICAgICBzaWxlbnQ6XG4gICAgICAgIHNpbGVudCB8fCBhdWRpb05vdGlmaWNhdGlvblN1cHBvcnQgIT09IEF1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydC5OYXRpdmUsXG4gICAgfSk7XG4gICAgbm90aWZpY2F0aW9uLm9uY2xpY2sgPSBvbk5vdGlmaWNhdGlvbkNsaWNrO1xuXG4gICAgaWYgKFxuICAgICAgIXNpbGVudCAmJlxuICAgICAgYXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0ID09PSBBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQuQ3VzdG9tXG4gICAgKSB7XG4gICAgICAvLyBXZSBraWNrIG9mZiB0aGUgc291bmQgdG8gYmUgcGxheWVkLiBObyBuZWVkIHRvIGF3YWl0IGl0LlxuICAgICAgbmV3IFNvdW5kKHsgc3JjOiAnc291bmRzL25vdGlmaWNhdGlvbi5vZ2cnIH0pLnBsYXkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3ROb3RpZmljYXRpb24gPSBub3RpZmljYXRpb247XG4gIH1cblxuICAvLyBSZW1vdmUgdGhlIGxhc3Qgbm90aWZpY2F0aW9uIGlmIGJvdGggY29uZGl0aW9ucyBob2xkOlxuICAvL1xuICAvLyAxLiBFaXRoZXIgYGNvbnZlcnNhdGlvbklkYCBvciBgbWVzc2FnZUlkYCBtYXRjaGVzIChpZiBwcmVzZW50KVxuICAvLyAyLiBgZW1vamlgLCBgdGFyZ2V0QXV0aG9yVXVpZGAsIGB0YXJnZXRUaW1lc3RhbXBgIG1hdGNoZXMgKGlmIHByZXNlbnQpXG4gIHB1YmxpYyByZW1vdmVCeSh7XG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgbWVzc2FnZUlkLFxuICAgIGVtb2ppLFxuICAgIHRhcmdldEF1dGhvclV1aWQsXG4gICAgdGFyZ2V0VGltZXN0YW1wLFxuICB9OiBSZWFkb25seTx7XG4gICAgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmc7XG4gICAgbWVzc2FnZUlkPzogc3RyaW5nO1xuICAgIGVtb2ppPzogc3RyaW5nO1xuICAgIHRhcmdldEF1dGhvclV1aWQ/OiBzdHJpbmc7XG4gICAgdGFyZ2V0VGltZXN0YW1wPzogbnVtYmVyO1xuICB9Pik6IHZvaWQge1xuICAgIGlmICghdGhpcy5ub3RpZmljYXRpb25EYXRhKSB7XG4gICAgICBsb2cuaW5mbygnTm90aWZpY2F0aW9uU2VydmljZSNyZW1vdmVCeTogbm8gbm90aWZpY2F0aW9uIGRhdGEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkQ2xlYXIgPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBjb252ZXJzYXRpb25JZCAmJlxuICAgICAgdGhpcy5ub3RpZmljYXRpb25EYXRhLmNvbnZlcnNhdGlvbklkID09PSBjb252ZXJzYXRpb25JZFxuICAgICkge1xuICAgICAgbG9nLmluZm8oJ05vdGlmaWNhdGlvblNlcnZpY2UjcmVtb3ZlQnk6IGNvbnZlcnNhdGlvbiBJRCBtYXRjaGVzJyk7XG4gICAgICBzaG91bGRDbGVhciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlSWQgJiYgdGhpcy5ub3RpZmljYXRpb25EYXRhLm1lc3NhZ2VJZCA9PT0gbWVzc2FnZUlkKSB7XG4gICAgICBsb2cuaW5mbygnTm90aWZpY2F0aW9uU2VydmljZSNyZW1vdmVCeTogbWVzc2FnZSBJRCBtYXRjaGVzJyk7XG4gICAgICBzaG91bGRDbGVhciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFzaG91bGRDbGVhcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcmVhY3Rpb24gfSA9IHRoaXMubm90aWZpY2F0aW9uRGF0YTtcbiAgICBpZiAoXG4gICAgICByZWFjdGlvbiAmJlxuICAgICAgZW1vamkgJiZcbiAgICAgIHRhcmdldEF1dGhvclV1aWQgJiZcbiAgICAgIHRhcmdldFRpbWVzdGFtcCAmJlxuICAgICAgKHJlYWN0aW9uLmVtb2ppICE9PSBlbW9qaSB8fFxuICAgICAgICByZWFjdGlvbi50YXJnZXRBdXRob3JVdWlkICE9PSB0YXJnZXRBdXRob3JVdWlkIHx8XG4gICAgICAgIHJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCAhPT0gdGFyZ2V0VGltZXN0YW1wKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmYXN0VXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICBjb25zdCBpMThuID0gdGhpcy5nZXRJMThuKCk7XG5cbiAgICBpZiAodGhpcy5sYXN0Tm90aWZpY2F0aW9uKSB7XG4gICAgICB0aGlzLmxhc3ROb3RpZmljYXRpb24uY2xvc2UoKTtcbiAgICAgIHRoaXMubGFzdE5vdGlmaWNhdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgeyBub3RpZmljYXRpb25EYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IGlzQXBwRm9jdXNlZCA9IHdpbmRvdy5pc0FjdGl2ZSgpO1xuICAgIGNvbnN0IHVzZXJTZXR0aW5nID0gdGhpcy5nZXROb3RpZmljYXRpb25TZXR0aW5nKCk7XG5cbiAgICAvLyBUaGlzIGlzbid0IGEgYm9vbGVhbiBiZWNhdXNlIFR5cGVTY3JpcHQgaXNuJ3Qgc21hcnQgZW5vdWdoIHRvIGtub3cgdGhhdCwgaWZcbiAgICAvLyAgIGBCb29sZWFuKG5vdGlmaWNhdGlvbkRhdGEpYCBpcyB0cnVlLCBgbm90aWZpY2F0aW9uRGF0YWAgaXMgdHJ1dGh5LlxuICAgIGNvbnN0IHNob3VsZFNob3dOb3RpZmljYXRpb24gPVxuICAgICAgdGhpcy5pc0VuYWJsZWQgJiYgIWlzQXBwRm9jdXNlZCAmJiBub3RpZmljYXRpb25EYXRhO1xuICAgIGlmICghc2hvdWxkU2hvd05vdGlmaWNhdGlvbikge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBOb3RpZmljYXRpb25TZXJ2aWNlIG5vdCB1cGRhdGluZyBub3RpZmljYXRpb25zLiBOb3RpZmljYXRpb25zIGFyZSAke1xuICAgICAgICAgIHRoaXMuaXNFbmFibGVkID8gJ2VuYWJsZWQnIDogJ2Rpc2FibGVkJ1xuICAgICAgICB9OyBhcHAgaXMgJHtpc0FwcEZvY3VzZWQgPyAnJyA6ICdub3QgJ31mb2N1c2VkOyB0aGVyZSBpcyAke1xuICAgICAgICAgIG5vdGlmaWNhdGlvbkRhdGEgPyAnJyA6ICdubyAnXG4gICAgICAgIH1ub3RpZmljYXRpb24gZGF0YWBcbiAgICAgICk7XG4gICAgICBpZiAoaXNBcHBGb2N1c2VkKSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uRGF0YSA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvdWxkUGxheU5vdGlmaWNhdGlvblNvdW5kID0gQm9vbGVhbihcbiAgICAgIHN0b3JhZ2UuZ2V0KCdhdWRpby1ub3RpZmljYXRpb24nKVxuICAgICk7XG5cbiAgICBjb25zdCBzaG91bGREcmF3QXR0ZW50aW9uID0gc3RvcmFnZS5nZXQoXG4gICAgICAnbm90aWZpY2F0aW9uLWRyYXctYXR0ZW50aW9uJyxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIGlmIChzaG91bGREcmF3QXR0ZW50aW9uKSB7XG4gICAgICBsb2cuaW5mbygnTm90aWZpY2F0aW9uU2VydmljZTogZHJhd2luZyBhdHRlbnRpb24nKTtcbiAgICAgIHdpbmRvdy5kcmF3QXR0ZW50aW9uKCk7XG4gICAgfVxuXG4gICAgbGV0IG5vdGlmaWNhdGlvblRpdGxlOiBzdHJpbmc7XG4gICAgbGV0IG5vdGlmaWNhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgbm90aWZpY2F0aW9uSWNvblVybDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuXG4gICAgY29uc3Qge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBzZW5kZXJUaXRsZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBpc0V4cGlyaW5nTWVzc2FnZSxcbiAgICAgIHJlYWN0aW9uLFxuICAgICAgd2FzU2hvd24sXG4gICAgfSA9IG5vdGlmaWNhdGlvbkRhdGE7XG5cbiAgICBpZiAod2FzU2hvd24pIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnTm90aWZpY2F0aW9uU2VydmljZTogbm90IHNob3dpbmcgYSBub3RpZmljYXRpb24gYmVjYXVzZSBpdCB3YXMgYWxyZWFkeSBzaG93bidcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoICh1c2VyU2V0dGluZykge1xuICAgICAgY2FzZSBOb3RpZmljYXRpb25TZXR0aW5nLk9mZjpcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgJ05vdGlmaWNhdGlvblNlcnZpY2U6IG5vdCBzaG93aW5nIGEgbm90aWZpY2F0aW9uIGJlY2F1c2UgdXNlciBoYXMgZGlzYWJsZWQgaXQnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgTm90aWZpY2F0aW9uU2V0dGluZy5OYW1lT25seTpcbiAgICAgIGNhc2UgTm90aWZpY2F0aW9uU2V0dGluZy5OYW1lQW5kTWVzc2FnZToge1xuICAgICAgICBub3RpZmljYXRpb25UaXRsZSA9IHNlbmRlclRpdGxlO1xuICAgICAgICAoeyBub3RpZmljYXRpb25JY29uVXJsIH0gPSBub3RpZmljYXRpb25EYXRhKTtcblxuICAgICAgICBpZiAoaXNFeHBpcmluZ01lc3NhZ2UgJiYgc2hvdWxkSGlkZUV4cGlyaW5nTWVzc2FnZUJvZHkoKSkge1xuICAgICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBpMThuKCduZXdNZXNzYWdlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodXNlclNldHRpbmcgPT09IE5vdGlmaWNhdGlvblNldHRpbmcuTmFtZU9ubHkpIHtcbiAgICAgICAgICBpZiAocmVhY3Rpb24pIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBpMThuKCdub3RpZmljYXRpb25SZWFjdGlvbicsIHtcbiAgICAgICAgICAgICAgc2VuZGVyOiBzZW5kZXJUaXRsZSxcbiAgICAgICAgICAgICAgZW1vamk6IHJlYWN0aW9uLmVtb2ppLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBpMThuKCduZXdNZXNzYWdlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlYWN0aW9uKSB7XG4gICAgICAgICAgbm90aWZpY2F0aW9uTWVzc2FnZSA9IGkxOG4oJ25vdGlmaWNhdGlvblJlYWN0aW9uTWVzc2FnZScsIHtcbiAgICAgICAgICAgIHNlbmRlcjogc2VuZGVyVGl0bGUsXG4gICAgICAgICAgICBlbW9qaTogcmVhY3Rpb24uZW1vamksXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBOb3RpZmljYXRpb25TZXR0aW5nLk5vTmFtZU9yTWVzc2FnZTpcbiAgICAgICAgbm90aWZpY2F0aW9uVGl0bGUgPSBGQUxMQkFDS19OT1RJRklDQVRJT05fVElUTEU7XG4gICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBpMThuKCduZXdNZXNzYWdlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nLmVycm9yKG1pc3NpbmdDYXNlRXJyb3IodXNlclNldHRpbmcpKTtcbiAgICAgICAgbm90aWZpY2F0aW9uVGl0bGUgPSBGQUxMQkFDS19OT1RJRklDQVRJT05fVElUTEU7XG4gICAgICAgIG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBpMThuKCduZXdNZXNzYWdlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdOb3RpZmljYXRpb25TZXJ2aWNlOiByZXF1ZXN0aW5nIGEgbm90aWZpY2F0aW9uIHRvIGJlIHNob3duJyk7XG5cbiAgICB0aGlzLm5vdGlmaWNhdGlvbkRhdGEgPSB7XG4gICAgICAuLi5ub3RpZmljYXRpb25EYXRhLFxuICAgICAgd2FzU2hvd246IHRydWUsXG4gICAgfTtcblxuICAgIHRoaXMubm90aWZ5KHtcbiAgICAgIHRpdGxlOiBub3RpZmljYXRpb25UaXRsZSxcbiAgICAgIGljb246IG5vdGlmaWNhdGlvbkljb25VcmwsXG4gICAgICBtZXNzYWdlOiBub3RpZmljYXRpb25NZXNzYWdlLFxuICAgICAgc2lsZW50OiAhc2hvdWxkUGxheU5vdGlmaWNhdGlvblNvdW5kLFxuICAgICAgb25Ob3RpZmljYXRpb25DbGljazogKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXQoJ2NsaWNrJywgY29udmVyc2F0aW9uSWQsIG1lc3NhZ2VJZCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5vdGlmaWNhdGlvblNldHRpbmcoKTogTm90aWZpY2F0aW9uU2V0dGluZyB7XG4gICAgcmV0dXJuIHBhcnNlTm90aWZpY2F0aW9uU2V0dGluZyhcbiAgICAgIHRoaXMuZ2V0U3RvcmFnZSgpLmdldCgnbm90aWZpY2F0aW9uLXNldHRpbmcnKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgbG9nLmluZm8oXG4gICAgICAnTm90aWZpY2F0aW9uU2VydmljZTogY2xlYXJpbmcgbm90aWZpY2F0aW9uIGFuZCByZXF1ZXN0aW5nIGFuIHVwZGF0ZSdcbiAgICApO1xuICAgIHRoaXMubm90aWZpY2F0aW9uRGF0YSA9IG51bGw7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIC8vIFdlIGRvbid0IHVzdWFsbHkgY2FsbCB0aGlzLCBidXQgd2hlbiB0aGUgcHJvY2VzcyBpcyBzaHV0dGluZyBkb3duLCB3ZSBzaG91bGQgYXRcbiAgLy8gICBsZWFzdCB0cnkgdG8gcmVtb3ZlIHRoZSBub3RpZmljYXRpb24gaW1tZWRpYXRlbHkgaW5zdGVhZCBvZiB3YWl0aW5nIGZvciB0aGVcbiAgLy8gICBub3JtYWwgZGVib3VuY2UuXG4gIHB1YmxpYyBmYXN0Q2xlYXIoKTogdm9pZCB7XG4gICAgbG9nLmluZm8oJ05vdGlmaWNhdGlvblNlcnZpY2U6IGNsZWFyaW5nIG5vdGlmaWNhdGlvbiBhbmQgdXBkYXRpbmcnKTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbkRhdGEgPSBudWxsO1xuICAgIHRoaXMuZmFzdFVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIGVuYWJsZSgpOiB2b2lkIHtcbiAgICBsb2cuaW5mbygnTm90aWZpY2F0aW9uU2VydmljZTogZW5hYmxpbmcnKTtcbiAgICBjb25zdCBuZWVkVXBkYXRlID0gIXRoaXMuaXNFbmFibGVkO1xuICAgIHRoaXMuaXNFbmFibGVkID0gdHJ1ZTtcbiAgICBpZiAobmVlZFVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGlzYWJsZSgpOiB2b2lkIHtcbiAgICBsb2cuaW5mbygnTm90aWZpY2F0aW9uU2VydmljZTogZGlzYWJsaW5nJyk7XG4gICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgbm90aWZpY2F0aW9uU2VydmljZSA9IG5ldyBOb3RpZmljYXRpb25TZXJ2aWNlKCk7XG5cbmZ1bmN0aW9uIGZpbHRlck5vdGlmaWNhdGlvblRleHQodGV4dDogc3RyaW5nKSB7XG4gIHJldHVybiAodGV4dCB8fCAnJylcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJmFwb3M7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXlCO0FBQ3pCLG9CQUF5QjtBQUN6QixtQkFBc0I7QUFDdEIsc0JBSU87QUFDUCxTQUFvQjtBQUNwQixVQUFxQjtBQUNyQixrQkFBK0I7QUFDL0IsOEJBQWlDO0FBcUIxQixJQUFLLHNCQUFMLGtCQUFLLHlCQUFMO0FBQ0wsZ0NBQU07QUFDTiw0Q0FBa0I7QUFDbEIscUNBQVc7QUFDWCwyQ0FBaUI7QUFKUDtBQUFBO0FBT1osTUFBTSwyQkFBMkIsZ0NBQy9CLHFCQUNBLDhCQUNGO0FBRU8sTUFBTSw4QkFBOEI7QUFRM0MsTUFBTSw0QkFBNEIsc0JBQWE7QUFBQSxFQWtCN0MsY0FBYztBQUNaLFVBQU07QUFkRCxxQkFBWTtBQUVYLDRCQUF3QztBQUV4Qyw0QkFBZ0Q7QUFZdEQsU0FBSyxTQUFTLDRCQUFTLEtBQUssV0FBVyxLQUFLLElBQUksR0FBRyxHQUFJO0FBQUEsRUFDekQ7QUFBQSxFQUVPLFdBQVc7QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxLQUNxRTtBQUNyRSxRQUFJLEtBQUssaUNBQWlDO0FBQzFDLFNBQUssT0FBTztBQUNaLFNBQUssVUFBVTtBQUFBLEVBQ2pCO0FBQUEsRUFFUSxhQUErQjtBQUNyQyxRQUFJLEtBQUssU0FBUztBQUNoQixhQUFPLEtBQUs7QUFBQSxJQUNkO0FBRUEsUUFBSSxNQUNGLDhGQUNGO0FBQ0EsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFBQSxFQUVRLFVBQXlCO0FBQy9CLFFBQUksS0FBSyxNQUFNO0FBQ2IsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUVBLFFBQUksTUFDRiwyRkFDRjtBQUNBLFdBQU8sT0FBTztBQUFBLEVBQ2hCO0FBQUEsRUFNTyxJQUFJLGtCQUFnRTtBQUN6RSxRQUFJLEtB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
