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
var settingsChannel_exports = {};
__export(settingsChannel_exports, {
  SettingsChannel: () => SettingsChannel
});
module.exports = __toCommonJS(settingsChannel_exports);
var import_electron = require("electron");
var import_events = require("events");
var import_user_config = require("../../app/user_config");
var import_ephemeral_config = require("../../app/ephemeral_config");
var import_permissions = require("../../app/permissions");
var import_assert = require("../util/assert");
var import_explodePromise = require("../util/explodePromise");
const EPHEMERAL_NAME_MAP = /* @__PURE__ */ new Map([
  ["spellCheck", "spell-check"],
  ["systemTraySetting", "system-tray-setting"],
  ["themeSetting", "theme-setting"]
]);
class SettingsChannel extends import_events.EventEmitter {
  constructor() {
    super(...arguments);
    this.responseQueue = /* @__PURE__ */ new Map();
    this.responseSeq = 0;
  }
  setMainWindow(mainWindow) {
    this.mainWindow = mainWindow;
  }
  getMainWindow() {
    return this.mainWindow;
  }
  install() {
    this.installSetting("deviceName", { setter: false });
    this.installCallback("getCustomColors");
    this.installCallback("getConversationsWithCustomColor");
    this.installCallback("resetAllChatColors");
    this.installCallback("resetDefaultChatColor");
    this.installCallback("addCustomColor");
    this.installCallback("editCustomColor");
    this.installCallback("removeCustomColor");
    this.installCallback("removeCustomColorOnConversations");
    this.installCallback("setGlobalDefaultConversationColor");
    this.installCallback("getDefaultConversationColor");
    this.installCallback("getAvailableIODevices");
    this.installCallback("isPrimary");
    this.installCallback("syncRequest");
    this.installCallback("isPhoneNumberSharingEnabled");
    this.installSetting("blockedCount", { setter: false });
    this.installSetting("linkPreviewSetting", { setter: false });
    this.installSetting("phoneNumberDiscoverabilitySetting", { setter: false });
    this.installSetting("phoneNumberSharingSetting", { setter: false });
    this.installSetting("readReceiptSetting", { setter: false });
    this.installSetting("typingIndicatorSetting", { setter: false });
    this.installSetting("themeSetting", {
      isEphemeral: true
    });
    this.installSetting("hideMenuBar");
    this.installSetting("systemTraySetting", {
      isEphemeral: true
    });
    this.installSetting("notificationSetting");
    this.installSetting("notificationDrawAttention");
    this.installSetting("audioNotification");
    this.installSetting("countMutedConversations");
    this.installSetting("spellCheck", {
      isEphemeral: true
    });
    this.installSetting("autoDownloadUpdate");
    this.installSetting("autoLaunch");
    this.installSetting("alwaysRelayCalls");
    this.installSetting("callRingtoneNotification");
    this.installSetting("callSystemNotification");
    this.installSetting("incomingCallNotification");
    this.installSetting("preferredAudioInputDevice");
    this.installSetting("preferredAudioOutputDevice");
    this.installSetting("preferredVideoInputDevice");
    this.installSetting("lastSyncTime");
    this.installSetting("universalExpireTimer");
    this.installSetting("zoomFactor");
    (0, import_permissions.installPermissionsHandler)({ session: import_electron.session, userConfig: import_user_config.userConfig });
    import_electron.ipcMain.handle("settings:get:mediaPermissions", () => {
      return import_user_config.userConfig.get("mediaPermissions") || false;
    });
    import_electron.ipcMain.handle("settings:get:mediaCameraPermissions", () => {
      return import_user_config.userConfig.get("mediaCameraPermissions") || false;
    });
    import_electron.ipcMain.handle("settings:set:mediaPermissions", (_event, value) => {
      import_user_config.userConfig.set("mediaPermissions", value);
      (0, import_permissions.installPermissionsHandler)({ session: import_electron.session, userConfig: import_user_config.userConfig });
    });
    import_electron.ipcMain.handle("settings:set:mediaCameraPermissions", (_event, value) => {
      import_user_config.userConfig.set("mediaCameraPermissions", value);
      (0, import_permissions.installPermissionsHandler)({ session: import_electron.session, userConfig: import_user_config.userConfig });
    });
    import_electron.ipcMain.on("settings:response", (_event, seq, error, value) => {
      const entry = this.responseQueue.get(seq);
      this.responseQueue.delete(seq);
      if (!entry) {
        return;
      }
      const { resolve, reject } = entry;
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  }
  waitForResponse() {
    const seq = this.responseSeq;
    this.responseSeq = this.responseSeq + 1 & 2147483647;
    const { promise, resolve, reject } = (0, import_explodePromise.explodePromise)();
    this.responseQueue.set(seq, { resolve, reject });
    return { seq, promise };
  }
  getSettingFromMainWindow(name) {
    const { mainWindow } = this;
    if (!mainWindow || !mainWindow.webContents) {
      throw new Error("No main window");
    }
    const { seq, promise } = this.waitForResponse();
    mainWindow.webContents.send(`settings:get:${name}`, { seq });
    return promise;
  }
  setSettingInMainWindow(name, value) {
    const { mainWindow } = this;
    if (!mainWindow || !mainWindow.webContents) {
      throw new Error("No main window");
    }
    const { seq, promise } = this.waitForResponse();
    mainWindow.webContents.send(`settings:set:${name}`, { seq, value });
    return promise;
  }
  invokeCallbackInMainWindow(name, args) {
    const { mainWindow } = this;
    if (!mainWindow || !mainWindow.webContents) {
      throw new Error("Main window not found");
    }
    const { seq, promise } = this.waitForResponse();
    mainWindow.webContents.send(`settings:call:${name}`, { seq, args });
    return promise;
  }
  installCallback(name) {
    import_electron.ipcMain.handle(`settings:call:${name}`, async (_event, args) => {
      return this.invokeCallbackInMainWindow(name, args);
    });
  }
  installSetting(name, {
    getter = true,
    setter = true,
    isEphemeral = false
  } = {}) {
    if (getter) {
      import_electron.ipcMain.handle(`settings:get:${name}`, async () => {
        return this.getSettingFromMainWindow(name);
      });
    }
    if (!setter) {
      return;
    }
    import_electron.ipcMain.handle(`settings:set:${name}`, async (_event, value) => {
      if (isEphemeral) {
        const ephemeralName = EPHEMERAL_NAME_MAP.get(name);
        (0, import_assert.strictAssert)(ephemeralName !== void 0, `${name} is not an ephemeral setting`);
        import_ephemeral_config.ephemeralConfig.set(ephemeralName, value);
      }
      await this.setSettingInMainWindow(name, value);
      this.emit(`change:${name}`, value);
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SettingsChannel
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0dGluZ3NDaGFubmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBCcm93c2VyV2luZG93IH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgaXBjTWFpbiBhcyBpcGMsIHNlc3Npb24gfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG5pbXBvcnQgeyB1c2VyQ29uZmlnIH0gZnJvbSAnLi4vLi4vYXBwL3VzZXJfY29uZmlnJztcbmltcG9ydCB7IGVwaGVtZXJhbENvbmZpZyB9IGZyb20gJy4uLy4uL2FwcC9lcGhlbWVyYWxfY29uZmlnJztcbmltcG9ydCB7IGluc3RhbGxQZXJtaXNzaW9uc0hhbmRsZXIgfSBmcm9tICcuLi8uLi9hcHAvcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuLi91dGlsL2V4cGxvZGVQcm9taXNlJztcbmltcG9ydCB0eXBlIHtcbiAgSVBDRXZlbnRzVmFsdWVzVHlwZSxcbiAgSVBDRXZlbnRzQ2FsbGJhY2tzVHlwZSxcbn0gZnJvbSAnLi4vdXRpbC9jcmVhdGVJUENFdmVudHMnO1xuXG5jb25zdCBFUEhFTUVSQUxfTkFNRV9NQVAgPSBuZXcgTWFwKFtcbiAgWydzcGVsbENoZWNrJywgJ3NwZWxsLWNoZWNrJ10sXG4gIFsnc3lzdGVtVHJheVNldHRpbmcnLCAnc3lzdGVtLXRyYXktc2V0dGluZyddLFxuICBbJ3RoZW1lU2V0dGluZycsICd0aGVtZS1zZXR0aW5nJ10sXG5dKTtcblxudHlwZSBSZXNwb25zZVF1ZXVlRW50cnkgPSBSZWFkb25seTx7XG4gIHJlc29sdmUodmFsdWU6IHVua25vd24pOiB2b2lkO1xuICByZWplY3QoZXJyb3I6IEVycm9yKTogdm9pZDtcbn0+O1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDaGFubmVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBtYWluV2luZG93PzogQnJvd3NlcldpbmRvdztcblxuICBwcml2YXRlIHJlYWRvbmx5IHJlc3BvbnNlUXVldWUgPSBuZXcgTWFwPG51bWJlciwgUmVzcG9uc2VRdWV1ZUVudHJ5PigpO1xuXG4gIHByaXZhdGUgcmVzcG9uc2VTZXEgPSAwO1xuXG4gIHB1YmxpYyBzZXRNYWluV2luZG93KG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3cgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLm1haW5XaW5kb3cgPSBtYWluV2luZG93O1xuICB9XG5cbiAgcHVibGljIGdldE1haW5XaW5kb3coKTogQnJvd3NlcldpbmRvdyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMubWFpbldpbmRvdztcbiAgfVxuXG4gIHB1YmxpYyBpbnN0YWxsKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2RldmljZU5hbWUnLCB7IHNldHRlcjogZmFsc2UgfSk7XG5cbiAgICAvLyBDaGF0Q29sb3JQaWNrZXIgcmVkdXggaG9va3Vwc1xuICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKCdnZXRDdXN0b21Db2xvcnMnKTtcbiAgICB0aGlzLmluc3RhbGxDYWxsYmFjaygnZ2V0Q29udmVyc2F0aW9uc1dpdGhDdXN0b21Db2xvcicpO1xuICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKCdyZXNldEFsbENoYXRDb2xvcnMnKTtcbiAgICB0aGlzLmluc3RhbGxDYWxsYmFjaygncmVzZXREZWZhdWx0Q2hhdENvbG9yJyk7XG4gICAgdGhpcy5pbnN0YWxsQ2FsbGJhY2soJ2FkZEN1c3RvbUNvbG9yJyk7XG4gICAgdGhpcy5pbnN0YWxsQ2FsbGJhY2soJ2VkaXRDdXN0b21Db2xvcicpO1xuICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKCdyZW1vdmVDdXN0b21Db2xvcicpO1xuICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKCdyZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9ucycpO1xuICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKCdzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3InKTtcbiAgICB0aGlzLmluc3RhbGxDYWxsYmFjaygnZ2V0RGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yJyk7XG5cbiAgICAvLyBWYXJpb3VzIGNhbGxiYWNrc1xuICAgIHRoaXMuaW5zdGFsbENhbGxiYWNrKCdnZXRBdmFpbGFibGVJT0RldmljZXMnKTtcbiAgICB0aGlzLmluc3RhbGxDYWxsYmFjaygnaXNQcmltYXJ5Jyk7XG4gICAgdGhpcy5pbnN0YWxsQ2FsbGJhY2soJ3N5bmNSZXF1ZXN0Jyk7XG4gICAgdGhpcy5pbnN0YWxsQ2FsbGJhY2soJ2lzUGhvbmVOdW1iZXJTaGFyaW5nRW5hYmxlZCcpO1xuXG4gICAgLy8gR2V0dGVycyBvbmx5LiBUaGVzZSBhcmUgc2V0IGJ5IHRoZSBwcmltYXJ5IGRldmljZVxuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2Jsb2NrZWRDb3VudCcsIHsgc2V0dGVyOiBmYWxzZSB9KTtcbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCdsaW5rUHJldmlld1NldHRpbmcnLCB7IHNldHRlcjogZmFsc2UgfSk7XG4gICAgdGhpcy5pbnN0YWxsU2V0dGluZygncGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHlTZXR0aW5nJywgeyBzZXR0ZXI6IGZhbHNlIH0pO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3Bob25lTnVtYmVyU2hhcmluZ1NldHRpbmcnLCB7IHNldHRlcjogZmFsc2UgfSk7XG4gICAgdGhpcy5pbnN0YWxsU2V0dGluZygncmVhZFJlY2VpcHRTZXR0aW5nJywgeyBzZXR0ZXI6IGZhbHNlIH0pO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3R5cGluZ0luZGljYXRvclNldHRpbmcnLCB7IHNldHRlcjogZmFsc2UgfSk7XG5cbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCd0aGVtZVNldHRpbmcnLCB7XG4gICAgICBpc0VwaGVtZXJhbDogdHJ1ZSxcbiAgICB9KTtcbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCdoaWRlTWVudUJhcicpO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3N5c3RlbVRyYXlTZXR0aW5nJywge1xuICAgICAgaXNFcGhlbWVyYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCdub3RpZmljYXRpb25TZXR0aW5nJyk7XG4gICAgdGhpcy5pbnN0YWxsU2V0dGluZygnbm90aWZpY2F0aW9uRHJhd0F0dGVudGlvbicpO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2F1ZGlvTm90aWZpY2F0aW9uJyk7XG4gICAgdGhpcy5pbnN0YWxsU2V0dGluZygnY291bnRNdXRlZENvbnZlcnNhdGlvbnMnKTtcblxuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3NwZWxsQ2hlY2snLCB7XG4gICAgICBpc0VwaGVtZXJhbDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2F1dG9Eb3dubG9hZFVwZGF0ZScpO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2F1dG9MYXVuY2gnKTtcblxuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2Fsd2F5c1JlbGF5Q2FsbHMnKTtcbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCdjYWxsUmluZ3RvbmVOb3RpZmljYXRpb24nKTtcbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCdjYWxsU3lzdGVtTm90aWZpY2F0aW9uJyk7XG4gICAgdGhpcy5pbnN0YWxsU2V0dGluZygnaW5jb21pbmdDYWxsTm90aWZpY2F0aW9uJyk7XG5cbiAgICAvLyBNZWRpYSBzZXR0aW5nc1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3ByZWZlcnJlZEF1ZGlvSW5wdXREZXZpY2UnKTtcbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCdwcmVmZXJyZWRBdWRpb091dHB1dERldmljZScpO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3ByZWZlcnJlZFZpZGVvSW5wdXREZXZpY2UnKTtcblxuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ2xhc3RTeW5jVGltZScpO1xuICAgIHRoaXMuaW5zdGFsbFNldHRpbmcoJ3VuaXZlcnNhbEV4cGlyZVRpbWVyJyk7XG5cbiAgICB0aGlzLmluc3RhbGxTZXR0aW5nKCd6b29tRmFjdG9yJyk7XG5cbiAgICBpbnN0YWxsUGVybWlzc2lvbnNIYW5kbGVyKHsgc2Vzc2lvbiwgdXNlckNvbmZpZyB9KTtcblxuICAgIC8vIFRoZXNlIG9uZXMgYXJlIGRpZmZlcmVudCBiZWNhdXNlIGl0cyBzaW5nbGUgc291cmNlIG9mIHRydXRoIGlzIHVzZXJDb25maWcsXG4gICAgLy8gbm90IEluZGV4ZWREQlxuICAgIGlwYy5oYW5kbGUoJ3NldHRpbmdzOmdldDptZWRpYVBlcm1pc3Npb25zJywgKCkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJDb25maWcuZ2V0KCdtZWRpYVBlcm1pc3Npb25zJykgfHwgZmFsc2U7XG4gICAgfSk7XG4gICAgaXBjLmhhbmRsZSgnc2V0dGluZ3M6Z2V0Om1lZGlhQ2FtZXJhUGVybWlzc2lvbnMnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gdXNlckNvbmZpZy5nZXQoJ21lZGlhQ2FtZXJhUGVybWlzc2lvbnMnKSB8fCBmYWxzZTtcbiAgICB9KTtcbiAgICBpcGMuaGFuZGxlKCdzZXR0aW5nczpzZXQ6bWVkaWFQZXJtaXNzaW9ucycsIChfZXZlbnQsIHZhbHVlKSA9PiB7XG4gICAgICB1c2VyQ29uZmlnLnNldCgnbWVkaWFQZXJtaXNzaW9ucycsIHZhbHVlKTtcblxuICAgICAgLy8gV2UgcmVpbnN0YWxsIHBlcm1pc3Npb25zIGhhbmRsZXIgdG8gZW5zdXJlIHRoYXQgYSByZXZva2VkIHBlcm1pc3Npb24gdGFrZXMgZWZmZWN0XG4gICAgICBpbnN0YWxsUGVybWlzc2lvbnNIYW5kbGVyKHsgc2Vzc2lvbiwgdXNlckNvbmZpZyB9KTtcbiAgICB9KTtcbiAgICBpcGMuaGFuZGxlKCdzZXR0aW5nczpzZXQ6bWVkaWFDYW1lcmFQZXJtaXNzaW9ucycsIChfZXZlbnQsIHZhbHVlKSA9PiB7XG4gICAgICB1c2VyQ29uZmlnLnNldCgnbWVkaWFDYW1lcmFQZXJtaXNzaW9ucycsIHZhbHVlKTtcblxuICAgICAgLy8gV2UgcmVpbnN0YWxsIHBlcm1pc3Npb25zIGhhbmRsZXIgdG8gZW5zdXJlIHRoYXQgYSByZXZva2VkIHBlcm1pc3Npb24gdGFrZXMgZWZmZWN0XG4gICAgICBpbnN0YWxsUGVybWlzc2lvbnNIYW5kbGVyKHsgc2Vzc2lvbiwgdXNlckNvbmZpZyB9KTtcbiAgICB9KTtcblxuICAgIGlwYy5vbignc2V0dGluZ3M6cmVzcG9uc2UnLCAoX2V2ZW50LCBzZXEsIGVycm9yLCB2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLnJlc3BvbnNlUXVldWUuZ2V0KHNlcSk7XG4gICAgICB0aGlzLnJlc3BvbnNlUXVldWUuZGVsZXRlKHNlcSk7XG4gICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyByZXNvbHZlLCByZWplY3QgfSA9IGVudHJ5O1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd2FpdEZvclJlc3BvbnNlPFZhbHVlPigpOiB7IHByb21pc2U6IFByb21pc2U8VmFsdWU+OyBzZXE6IG51bWJlciB9IHtcbiAgICBjb25zdCBzZXEgPSB0aGlzLnJlc3BvbnNlU2VxO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICB0aGlzLnJlc3BvbnNlU2VxID0gKHRoaXMucmVzcG9uc2VTZXEgKyAxKSAmIDB4N2ZmZmZmZmY7XG5cbiAgICBjb25zdCB7IHByb21pc2UsIHJlc29sdmUsIHJlamVjdCB9ID0gZXhwbG9kZVByb21pc2U8VmFsdWU+KCk7XG5cbiAgICB0aGlzLnJlc3BvbnNlUXVldWUuc2V0KHNlcSwgeyByZXNvbHZlLCByZWplY3QgfSk7XG5cbiAgICByZXR1cm4geyBzZXEsIHByb21pc2UgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZXR0aW5nRnJvbU1haW5XaW5kb3c8TmFtZSBleHRlbmRzIGtleW9mIElQQ0V2ZW50c1ZhbHVlc1R5cGU+KFxuICAgIG5hbWU6IE5hbWVcbiAgKTogUHJvbWlzZTxJUENFdmVudHNWYWx1ZXNUeXBlW05hbWVdPiB7XG4gICAgY29uc3QgeyBtYWluV2luZG93IH0gPSB0aGlzO1xuICAgIGlmICghbWFpbldpbmRvdyB8fCAhbWFpbldpbmRvdy53ZWJDb250ZW50cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYWluIHdpbmRvdycpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc2VxLCBwcm9taXNlIH0gPSB0aGlzLndhaXRGb3JSZXNwb25zZTxJUENFdmVudHNWYWx1ZXNUeXBlW05hbWVdPigpO1xuXG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKGBzZXR0aW5nczpnZXQ6JHtuYW1lfWAsIHsgc2VxIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0U2V0dGluZ0luTWFpbldpbmRvdzxOYW1lIGV4dGVuZHMga2V5b2YgSVBDRXZlbnRzVmFsdWVzVHlwZT4oXG4gICAgbmFtZTogTmFtZSxcbiAgICB2YWx1ZTogSVBDRXZlbnRzVmFsdWVzVHlwZVtOYW1lXVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1haW5XaW5kb3cgfSA9IHRoaXM7XG4gICAgaWYgKCFtYWluV2luZG93IHx8ICFtYWluV2luZG93LndlYkNvbnRlbnRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1haW4gd2luZG93Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBzZXEsIHByb21pc2UgfSA9IHRoaXMud2FpdEZvclJlc3BvbnNlPHZvaWQ+KCk7XG5cbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoYHNldHRpbmdzOnNldDoke25hbWV9YCwgeyBzZXEsIHZhbHVlIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwdWJsaWMgaW52b2tlQ2FsbGJhY2tJbk1haW5XaW5kb3c8TmFtZSBleHRlbmRzIGtleW9mIElQQ0V2ZW50c0NhbGxiYWNrc1R5cGU+KFxuICAgIG5hbWU6IE5hbWUsXG4gICAgYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPlxuICApOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCB7IG1haW5XaW5kb3cgfSA9IHRoaXM7XG4gICAgaWYgKCFtYWluV2luZG93IHx8ICFtYWluV2luZG93LndlYkNvbnRlbnRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01haW4gd2luZG93IG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc2VxLCBwcm9taXNlIH0gPSB0aGlzLndhaXRGb3JSZXNwb25zZTx1bmtub3duPigpO1xuXG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKGBzZXR0aW5nczpjYWxsOiR7bmFtZX1gLCB7IHNlcSwgYXJncyB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnN0YWxsQ2FsbGJhY2s8TmFtZSBleHRlbmRzIGtleW9mIElQQ0V2ZW50c0NhbGxiYWNrc1R5cGU+KFxuICAgIG5hbWU6IE5hbWVcbiAgKTogdm9pZCB7XG4gICAgaXBjLmhhbmRsZShgc2V0dGluZ3M6Y2FsbDoke25hbWV9YCwgYXN5bmMgKF9ldmVudCwgYXJncykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW52b2tlQ2FsbGJhY2tJbk1haW5XaW5kb3cobmFtZSwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluc3RhbGxTZXR0aW5nPE5hbWUgZXh0ZW5kcyBrZXlvZiBJUENFdmVudHNWYWx1ZXNUeXBlPihcbiAgICBuYW1lOiBOYW1lLFxuICAgIHtcbiAgICAgIGdldHRlciA9IHRydWUsXG4gICAgICBzZXR0ZXIgPSB0cnVlLFxuICAgICAgaXNFcGhlbWVyYWwgPSBmYWxzZSxcbiAgICB9OiB7IGdldHRlcj86IGJvb2xlYW47IHNldHRlcj86IGJvb2xlYW47IGlzRXBoZW1lcmFsPzogYm9vbGVhbiB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgaWYgKGdldHRlcikge1xuICAgICAgaXBjLmhhbmRsZShgc2V0dGluZ3M6Z2V0OiR7bmFtZX1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNldHRpbmdGcm9tTWFpbldpbmRvdyhuYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghc2V0dGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaXBjLmhhbmRsZShgc2V0dGluZ3M6c2V0OiR7bmFtZX1gLCBhc3luYyAoX2V2ZW50LCB2YWx1ZSkgPT4ge1xuICAgICAgaWYgKGlzRXBoZW1lcmFsKSB7XG4gICAgICAgIGNvbnN0IGVwaGVtZXJhbE5hbWUgPSBFUEhFTUVSQUxfTkFNRV9NQVAuZ2V0KG5hbWUpO1xuICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgZXBoZW1lcmFsTmFtZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgICAgIGAke25hbWV9IGlzIG5vdCBhbiBlcGhlbWVyYWwgc2V0dGluZ2BcbiAgICAgICAgKTtcbiAgICAgICAgZXBoZW1lcmFsQ29uZmlnLnNldChlcGhlbWVyYWxOYW1lLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc2V0U2V0dGluZ0luTWFpbldpbmRvdyhuYW1lLCB2YWx1ZSk7XG5cbiAgICAgIHRoaXMuZW1pdChgY2hhbmdlOiR7bmFtZX1gLCB2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
