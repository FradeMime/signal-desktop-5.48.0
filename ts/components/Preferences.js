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
var Preferences_exports = {};
__export(Preferences_exports, {
  Preferences: () => Preferences
});
module.exports = __toCommonJS(Preferences_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var import_Button = require("./Button");
var import_ChatColorPicker = require("./ChatColorPicker");
var import_Checkbox = require("./Checkbox");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_DisappearingTimeDialog = require("./DisappearingTimeDialog");
var import_phoneNumberDiscoverability = require("../util/phoneNumberDiscoverability");
var import_phoneNumberSharingMode = require("../util/phoneNumberSharingMode");
var import_Select = require("./Select");
var import_Spinner = require("./Spinner");
var import_TitleBarContainer = require("./TitleBarContainer");
var import_getCustomColorStyle = require("../util/getCustomColorStyle");
var import_expirationTimer = require("../util/expirationTimer");
var import_useEscapeHandling = require("../hooks/useEscapeHandling");
var import_useUniqueId = require("../hooks/useUniqueId");
var import_useTheme = require("../hooks/useTheme");
var Page = /* @__PURE__ */ ((Page2) => {
  Page2["General"] = "General";
  Page2["Appearance"] = "Appearance";
  Page2["Chats"] = "Chats";
  Page2["Calls"] = "Calls";
  Page2["Notifications"] = "Notifications";
  Page2["Privacy"] = "Privacy";
  Page2["ChatColor"] = "ChatColor";
  return Page2;
})(Page || {});
const DEFAULT_ZOOM_FACTORS = [
  {
    text: "75%",
    value: 0.75
  },
  {
    text: "100%",
    value: 1
  },
  {
    text: "125%",
    value: 1.25
  },
  {
    text: "150%",
    value: 1.5
  },
  {
    text: "200%",
    value: 2
  }
];
const Preferences = /* @__PURE__ */ __name(({
  addCustomColor,
  availableCameras,
  availableMicrophones,
  availableSpeakers,
  blockedCount,
  closeSettings,
  customColors,
  defaultConversationColor,
  deviceName = "",
  doDeleteAllData,
  doneRendering,
  editCustomColor,
  executeMenuRole,
  getConversationsWithCustomColor,
  hasAudioNotifications,
  hasAutoDownloadUpdate,
  hasAutoLaunch,
  hasCallNotifications,
  hasCallRingtoneNotification,
  hasCountMutedConversations,
  hasHideMenuBar,
  hasIncomingCallNotifications,
  hasLinkPreviews,
  hasMediaCameraPermissions,
  hasMediaPermissions,
  hasMinimizeToAndStartInSystemTray,
  hasMinimizeToSystemTray,
  hasNotificationAttention,
  hasNotifications,
  hasReadReceipts,
  hasRelayCalls,
  hasSpellCheck,
  hasTypingIndicators,
  i18n,
  initialSpellCheckSetting,
  isAudioNotificationsSupported,
  isAutoDownloadUpdatesSupported,
  isAutoLaunchSupported,
  isHideMenuBarSupported,
  isPhoneNumberSharingSupported,
  isNotificationAttentionSupported,
  isSyncSupported,
  isSystemTraySupported,
  isWindows11,
  lastSyncTime,
  makeSyncRequest,
  notificationContent,
  onAudioNotificationsChange,
  onAutoDownloadUpdateChange,
  onAutoLaunchChange,
  onCallNotificationsChange,
  onCallRingtoneNotificationChange,
  onCountMutedConversationsChange,
  onHideMenuBarChange,
  onIncomingCallNotificationsChange,
  onLastSyncTimeChange,
  onMediaCameraPermissionsChange,
  onMediaPermissionsChange,
  onMinimizeToAndStartInSystemTrayChange,
  onMinimizeToSystemTrayChange,
  onNotificationAttentionChange,
  onNotificationContentChange,
  onNotificationsChange,
  onRelayCallsChange,
  onSelectedCameraChange,
  onSelectedMicrophoneChange,
  onSelectedSpeakerChange,
  onSpellCheckChange,
  onThemeChange,
  onUniversalExpireTimerChange,
  onZoomFactorChange,
  platform,
  removeCustomColor,
  removeCustomColorOnConversations,
  resetAllChatColors,
  resetDefaultChatColor,
  selectedCamera,
  selectedMicrophone,
  selectedSpeaker,
  setGlobalDefaultConversationColor,
  themeSetting,
  universalExpireTimer = 0,
  whoCanFindMe,
  whoCanSeeMe,
  zoomFactor
}) => {
  const themeSelectId = (0, import_useUniqueId.useUniqueId)();
  const zoomSelectId = (0, import_useUniqueId.useUniqueId)();
  const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
  const [page, setPage] = (0, import_react.useState)("General" /* General */);
  const [showSyncFailed, setShowSyncFailed] = (0, import_react.useState)(false);
  const [nowSyncing, setNowSyncing] = (0, import_react.useState)(false);
  const [showDisappearingTimerDialog, setShowDisappearingTimerDialog] = (0, import_react.useState)(false);
  const theme = (0, import_useTheme.useTheme)();
  (0, import_react.useEffect)(() => {
    doneRendering();
  }, [doneRendering]);
  (0, import_useEscapeHandling.useEscapeHandling)(closeSettings);
  const onZoomSelectChange = (0, import_react.useCallback)((value) => {
    const number = parseFloat(value);
    onZoomFactorChange(number);
  }, [onZoomFactorChange]);
  const onAudioInputSelectChange = (0, import_react.useCallback)((value) => {
    if (value === "undefined") {
      onSelectedMicrophoneChange(void 0);
    } else {
      onSelectedMicrophoneChange(availableMicrophones[parseInt(value, 10)]);
    }
  }, [onSelectedMicrophoneChange, availableMicrophones]);
  const onAudioOutputSelectChange = (0, import_react.useCallback)((value) => {
    if (value === "undefined") {
      onSelectedSpeakerChange(void 0);
    } else {
      onSelectedSpeakerChange(availableSpeakers[parseInt(value, 10)]);
    }
  }, [onSelectedSpeakerChange, availableSpeakers]);
  let settings;
  if (page === "General" /* General */) {
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("Preferences__button--general"))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: i18n("Preferences--device-name"),
      right: deviceName
    })), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences--system")
    }, isAutoLaunchSupported && /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasAutoLaunch,
      label: i18n("autoLaunchDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "autoLaunch",
      onChange: onAutoLaunchChange
    }), isHideMenuBarSupported && /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasHideMenuBar,
      label: i18n("hideMenuBar"),
      moduleClassName: "Preferences__checkbox",
      name: "hideMenuBar",
      onChange: onHideMenuBarChange
    }), isSystemTraySupported && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasMinimizeToSystemTray,
      label: i18n("SystemTraySetting__minimize-to-system-tray"),
      moduleClassName: "Preferences__checkbox",
      name: "system-tray-setting-minimize-to-system-tray",
      onChange: onMinimizeToSystemTrayChange
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasMinimizeToAndStartInSystemTray,
      disabled: !hasMinimizeToSystemTray,
      label: i18n("SystemTraySetting__minimize-to-and-start-in-system-tray"),
      moduleClassName: "Preferences__checkbox",
      name: "system-tray-setting-minimize-to-and-start-in-system-tray",
      onChange: onMinimizeToAndStartInSystemTrayChange
    }))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("permissions")
    }, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasMediaPermissions,
      label: i18n("mediaPermissionsDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "mediaPermissions",
      onChange: onMediaPermissionsChange
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasMediaCameraPermissions,
      label: i18n("mediaCameraPermissionsDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "mediaCameraPermissions",
      onChange: onMediaCameraPermissionsChange
    })), isAutoDownloadUpdatesSupported && /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences--updates")
    }, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasAutoDownloadUpdate,
      label: i18n("Preferences__download-update"),
      moduleClassName: "Preferences__checkbox",
      name: "autoDownloadUpdate",
      onChange: onAutoDownloadUpdateChange
    })));
  } else if (page === "Appearance" /* Appearance */) {
    let zoomFactors = DEFAULT_ZOOM_FACTORS;
    if (!zoomFactors.some(({ value }) => value === zoomFactor)) {
      zoomFactors = [
        ...zoomFactors,
        {
          text: `${Math.round(zoomFactor * 100)}%`,
          value: zoomFactor
        }
      ].sort((a, b) => a.value - b.value);
    }
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("Preferences__button--appearance"))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement("label", {
        htmlFor: themeSelectId
      }, i18n("Preferences--theme")),
      right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        id: themeSelectId,
        onChange: onThemeChange,
        options: [
          {
            text: i18n("themeSystem"),
            value: "system"
          },
          {
            text: i18n("themeLight"),
            value: "light"
          },
          {
            text: i18n("themeDark"),
            value: "dark"
          }
        ],
        value: themeSetting
      })
    }), /* @__PURE__ */ import_react.default.createElement(Control, {
      left: i18n("showChatColorEditor"),
      onClick: () => {
        setPage("ChatColor" /* ChatColor */);
      },
      right: /* @__PURE__ */ import_react.default.createElement("div", {
        className: `ConversationDetails__chat-color ConversationDetails__chat-color--${defaultConversationColor.color}`,
        style: {
          ...(0, import_getCustomColorStyle.getCustomColorStyle)(defaultConversationColor.customColorData?.value)
        }
      })
    }), /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement("label", {
        htmlFor: zoomSelectId
      }, i18n("Preferences--zoom")),
      right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        id: zoomSelectId,
        onChange: onZoomSelectChange,
        options: zoomFactors,
        value: zoomFactor
      })
    })));
  } else if (page === "Chats" /* Chats */) {
    let spellCheckDirtyText;
    if (initialSpellCheckSetting !== hasSpellCheck) {
      spellCheckDirtyText = hasSpellCheck ? i18n("spellCheckWillBeEnabled") : i18n("spellCheckWillBeDisabled");
    }
    const lastSyncDate = new Date(lastSyncTime || 0);
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("Preferences__button--chats"))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences__button--chats")
    }, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasSpellCheck,
      description: spellCheckDirtyText,
      label: i18n("spellCheckDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "spellcheck",
      onChange: onSpellCheckChange
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasLinkPreviews,
      description: i18n("Preferences__link-previews--description"),
      disabled: true,
      label: i18n("Preferences__link-previews--title"),
      moduleClassName: "Preferences__checkbox",
      name: "linkPreviews",
      onChange: import_lodash.noop
    })), isSyncSupported && /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", null, i18n("sync")), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "Preferences__description"
      }, i18n("syncExplanation"), " ", i18n("Preferences--lastSynced", {
        date: lastSyncDate.toLocaleDateString(),
        time: lastSyncDate.toLocaleTimeString()
      })), showSyncFailed && /* @__PURE__ */ import_react.default.createElement("div", {
        className: "Preferences__description Preferences__description--error"
      }, i18n("syncFailed"))),
      right: /* @__PURE__ */ import_react.default.createElement("div", {
        className: "Preferences__right-button"
      }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
        disabled: nowSyncing,
        onClick: async () => {
          setShowSyncFailed(false);
          setNowSyncing(true);
          try {
            await makeSyncRequest();
            onLastSyncTimeChange(Date.now());
          } catch (err) {
            setShowSyncFailed(true);
          } finally {
            setNowSyncing(false);
          }
        },
        variant: import_Button.ButtonVariant.SecondaryAffirmative
      }, nowSyncing ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
        svgSize: "small"
      }) : i18n("syncNow")))
    })));
  } else if (page === "Calls" /* Calls */) {
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("Preferences__button--calls"))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("calling")
    }, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasIncomingCallNotifications,
      label: i18n("incomingCallNotificationDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "incomingCallNotification",
      onChange: onIncomingCallNotificationsChange
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasCallRingtoneNotification,
      label: i18n("callRingtoneNotificationDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "callRingtoneNotification",
      onChange: onCallRingtoneNotificationChange
    })), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences__devices")
    }, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("label", {
        className: "Preferences__select-title",
        htmlFor: "video"
      }, i18n("callingDeviceSelection__label--video")), /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("callingDeviceSelection__label--video"),
        disabled: !availableCameras.length,
        moduleClassName: "Preferences__select",
        name: "video",
        onChange: onSelectedCameraChange,
        options: availableCameras.length ? availableCameras.map((device) => ({
          text: localizeDefault(i18n, device.label),
          value: device.deviceId
        })) : [
          {
            text: i18n("callingDeviceSelection__select--no-device"),
            value: "undefined"
          }
        ],
        value: selectedCamera
      })),
      right: /* @__PURE__ */ import_react.default.createElement("div", null)
    }), /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("label", {
        className: "Preferences__select-title",
        htmlFor: "audio-input"
      }, i18n("callingDeviceSelection__label--audio-input")), /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("callingDeviceSelection__label--audio-input"),
        disabled: !availableMicrophones.length,
        moduleClassName: "Preferences__select",
        name: "audio-input",
        onChange: onAudioInputSelectChange,
        options: availableMicrophones.length ? availableMicrophones.map((device) => ({
          text: localizeDefault(i18n, device.name),
          value: device.index
        })) : [
          {
            text: i18n("callingDeviceSelection__select--no-device"),
            value: "undefined"
          }
        ],
        value: selectedMicrophone?.index
      })),
      right: /* @__PURE__ */ import_react.default.createElement("div", null)
    }), /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("label", {
        className: "Preferences__select-title",
        htmlFor: "audio-output"
      }, i18n("callingDeviceSelection__label--audio-output")), /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("callingDeviceSelection__label--audio-output"),
        disabled: !availableSpeakers.length,
        moduleClassName: "Preferences__select",
        name: "audio-output",
        onChange: onAudioOutputSelectChange,
        options: availableSpeakers.length ? availableSpeakers.map((device) => ({
          text: localizeDefault(i18n, device.name),
          value: device.index
        })) : [
          {
            text: i18n("callingDeviceSelection__select--no-device"),
            value: "undefined"
          }
        ],
        value: selectedSpeaker?.index
      })),
      right: /* @__PURE__ */ import_react.default.createElement("div", null)
    })), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences--advanced")
    }, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasRelayCalls,
      description: i18n("alwaysRelayCallsDetail"),
      label: i18n("alwaysRelayCallsDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "relayCalls",
      onChange: onRelayCallsChange
    })));
  } else if (page === "Notifications" /* Notifications */) {
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("Preferences__button--notifications"))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasNotifications,
      label: i18n("Preferences__enable-notifications"),
      moduleClassName: "Preferences__checkbox",
      name: "notifications",
      onChange: onNotificationsChange
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasCallNotifications,
      label: i18n("callSystemNotificationDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "callSystemNotification",
      onChange: onCallNotificationsChange
    }), isNotificationAttentionSupported && /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasNotificationAttention,
      label: i18n("notificationDrawAttention"),
      moduleClassName: "Preferences__checkbox",
      name: "notificationDrawAttention",
      onChange: onNotificationAttentionChange
    }), isAudioNotificationsSupported && /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasAudioNotifications,
      label: i18n("audioNotificationDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "audioNotification",
      onChange: onAudioNotificationsChange
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasCountMutedConversations,
      label: i18n("countMutedConversationsDescription"),
      moduleClassName: "Preferences__checkbox",
      name: "countMutedConversations",
      onChange: onCountMutedConversationsChange
    })), /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: i18n("Preferences--notification-content"),
      right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("Preferences--notification-content"),
        disabled: !hasNotifications,
        onChange: onNotificationContentChange,
        options: [
          {
            text: i18n("nameAndMessage"),
            value: "message"
          },
          {
            text: i18n("nameOnly"),
            value: "name"
          },
          {
            text: i18n("noNameOrMessage"),
            value: "count"
          }
        ],
        value: notificationContent
      })
    })));
  } else if (page === "Privacy" /* Privacy */) {
    const isCustomDisappearingMessageValue = !import_expirationTimer.DEFAULT_DURATIONS_SET.has(universalExpireTimer);
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("Preferences__button--privacy"))), /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: i18n("Preferences--blocked"),
      right: blockedCount === 1 ? i18n("Preferences--blocked-count-singular", [
        String(blockedCount)
      ]) : i18n("Preferences--blocked-count-plural", [
        String(blockedCount || 0)
      ])
    })), isPhoneNumberSharingSupported ? /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences__who-can--title")
    }, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: i18n("Preferences--see-me"),
      right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("Preferences--see-me"),
        disabled: true,
        onChange: import_lodash.noop,
        options: [
          {
            text: i18n("Preferences__who-can--everybody"),
            value: import_phoneNumberSharingMode.PhoneNumberSharingMode.Everybody
          },
          {
            text: i18n("Preferences__who-can--contacts"),
            value: import_phoneNumberSharingMode.PhoneNumberSharingMode.ContactsOnly
          },
          {
            text: i18n("Preferences__who-can--nobody"),
            value: import_phoneNumberSharingMode.PhoneNumberSharingMode.Nobody
          }
        ],
        value: whoCanSeeMe
      })
    }), /* @__PURE__ */ import_react.default.createElement(Control, {
      left: i18n("Preferences--find-me"),
      right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("Preferences--find-me"),
        disabled: true,
        onChange: import_lodash.noop,
        options: [
          {
            text: i18n("Preferences__who-can--everybody"),
            value: import_phoneNumberDiscoverability.PhoneNumberDiscoverability.Discoverable
          },
          {
            text: i18n("Preferences__who-can--nobody"),
            value: import_phoneNumberDiscoverability.PhoneNumberDiscoverability.NotDiscoverable
          }
        ],
        value: whoCanFindMe
      })
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__padding"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__description"
    }, i18n("Preferences__privacy--description")))) : null, /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("Preferences--messaging")
    }, /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasReadReceipts,
      disabled: true,
      label: i18n("Preferences--read-receipts"),
      moduleClassName: "Preferences__checkbox",
      name: "readReceipts",
      onChange: import_lodash.noop
    }), /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
      checked: hasTypingIndicators,
      disabled: true,
      label: i18n("Preferences--typing-indicators"),
      moduleClassName: "Preferences__checkbox",
      name: "typingIndicators",
      onChange: import_lodash.noop
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__padding"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__description"
    }, i18n("Preferences__privacy--description")))), showDisappearingTimerDialog && /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
      i18n,
      initialValue: universalExpireTimer,
      onClose: () => setShowDisappearingTimerDialog(false),
      onSubmit: onUniversalExpireTimerChange
    }), /* @__PURE__ */ import_react.default.createElement(SettingsRow, {
      title: i18n("disappearingMessages")
    }, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", null, i18n("settings__DisappearingMessages__timer__label")), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "Preferences__description"
      }, i18n("settings__DisappearingMessages__footer"))),
      right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
        ariaLabel: i18n("settings__DisappearingMessages__timer__label"),
        onChange: (value) => {
          if (value === String(universalExpireTimer) || value === "-1") {
            setShowDisappearingTimerDialog(true);
            return;
          }
          onUniversalExpireTimerChange(parseInt(value, 10));
        },
        options: import_expirationTimer.DEFAULT_DURATIONS_IN_SECONDS.map((seconds) => {
          const text = (0, import_expirationTimer.format)(i18n, seconds, {
            capitalizeOff: true
          });
          return {
            value: seconds,
            text
          };
        }).concat([
          {
            value: isCustomDisappearingMessageValue ? universalExpireTimer : -1,
            text: isCustomDisappearingMessageValue ? (0, import_expirationTimer.format)(i18n, universalExpireTimer) : i18n("selectedCustomDisappearingTimeOption")
          }
        ]),
        value: universalExpireTimer
      })
    })), /* @__PURE__ */ import_react.default.createElement(SettingsRow, null, /* @__PURE__ */ import_react.default.createElement(Control, {
      left: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", null, i18n("clearDataHeader")), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "Preferences__description"
      }, i18n("clearDataExplanation"))),
      right: /* @__PURE__ */ import_react.default.createElement("div", {
        className: "Preferences__right-button"
      }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
        onClick: () => setConfirmDelete(true),
        variant: import_Button.ButtonVariant.SecondaryDestructive
      }, i18n("clearDataButton")))
    })), confirmDelete ? /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      actions: [
        {
          action: doDeleteAllData,
          style: "negative",
          text: i18n("clearDataButton")
        }
      ],
      i18n,
      onClose: () => {
        setConfirmDelete(false);
      },
      title: i18n("deleteAllDataHeader")
    }, i18n("deleteAllDataBody")) : null);
  } else if (page === "ChatColor" /* ChatColor */) {
    settings = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title"
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("goBack"),
      className: "Preferences__back-icon",
      onClick: () => setPage("Appearance" /* Appearance */),
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "Preferences__title--header"
    }, i18n("ChatColorPicker__menu-title"))), /* @__PURE__ */ import_react.default.createElement(import_ChatColorPicker.ChatColorPicker, {
      customColors,
      getConversationsWithCustomColor,
      i18n,
      isGlobal: true,
      selectedColor: defaultConversationColor.color,
      selectedCustomColor: defaultConversationColor.customColorData || {},
      addCustomColor,
      colorSelected: import_lodash.noop,
      editCustomColor,
      removeCustomColor,
      removeCustomColorOnConversations,
      resetAllChatColors,
      resetDefaultChatColor,
      setGlobalDefaultConversationColor
    }));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_TitleBarContainer.TitleBarContainer, {
    platform,
    isWindows11,
    theme,
    executeMenuRole
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences__page-selector"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)({
      Preferences__button: true,
      "Preferences__button--general": true,
      "Preferences__button--selected": page === "General" /* General */
    }),
    onClick: () => setPage("General" /* General */)
  }, i18n("Preferences__button--general")), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)({
      Preferences__button: true,
      "Preferences__button--appearance": true,
      "Preferences__button--selected": page === "Appearance" /* Appearance */ || page === "ChatColor" /* ChatColor */
    }),
    onClick: () => setPage("Appearance" /* Appearance */)
  }, i18n("Preferences__button--appearance")), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)({
      Preferences__button: true,
      "Preferences__button--chats": true,
      "Preferences__button--selected": page === "Chats" /* Chats */
    }),
    onClick: () => setPage("Chats" /* Chats */)
  }, i18n("Preferences__button--chats")), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)({
      Preferences__button: true,
      "Preferences__button--calls": true,
      "Preferences__button--selected": page === "Calls" /* Calls */
    }),
    onClick: () => setPage("Calls" /* Calls */)
  }, i18n("Preferences__button--calls")), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)({
      Preferences__button: true,
      "Preferences__button--notifications": true,
      "Preferences__button--selected": page === "Notifications" /* Notifications */
    }),
    onClick: () => setPage("Notifications" /* Notifications */)
  }, i18n("Preferences__button--notifications")), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)({
      Preferences__button: true,
      "Preferences__button--privacy": true,
      "Preferences__button--selected": page === "Privacy" /* Privacy */
    }),
    onClick: () => setPage("Privacy" /* Privacy */)
  }, i18n("Preferences__button--privacy"))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences__settings-pane"
  }, settings)));
}, "Preferences");
const SettingsRow = /* @__PURE__ */ __name(({
  children,
  title
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences__settings-row"
  }, title && /* @__PURE__ */ import_react.default.createElement("h3", {
    className: "Preferences__padding"
  }, title), children);
}, "SettingsRow");
const Control = /* @__PURE__ */ __name(({
  left,
  onClick,
  right
}) => {
  const content = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences__control--key"
  }, left), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences__control--value"
  }, right));
  if (onClick) {
    return /* @__PURE__ */ import_react.default.createElement("button", {
      className: "Preferences__control Preferences__control--clickable",
      type: "button",
      onClick
    }, content);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Preferences__control"
  }, content);
}, "Control");
function localizeDefault(i18n, deviceLabel) {
  return deviceLabel.toLowerCase().startsWith("default") ? deviceLabel.replace(/default/i, i18n("callingDeviceSelection__select--default")) : deviceLabel;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Preferences
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJlZmVyZW5jZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHR5cGUgeyBBdWRpb0RldmljZSB9IGZyb20gJ3JpbmdydGMnO1xuXG5pbXBvcnQgdHlwZSB7IE1lZGlhRGV2aWNlU2V0dGluZ3MgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB0eXBlIHtcbiAgWm9vbUZhY3RvclR5cGUsXG4gIE5vdGlmaWNhdGlvblNldHRpbmdUeXBlLFxufSBmcm9tICcuLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0IHR5cGUgeyBUaGVtZVNldHRpbmdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvU3RvcmFnZVVJS2V5cyc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuL0J1dHRvbic7XG5pbXBvcnQgeyBDaGF0Q29sb3JQaWNrZXIgfSBmcm9tICcuL0NoYXRDb2xvclBpY2tlcic7XG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vQ2hlY2tib3gnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi9Db25maXJtYXRpb25EaWFsb2cnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbiAgQ3VzdG9tQ29sb3JUeXBlLFxuICBEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3JUeXBlLFxufSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgRGlzYXBwZWFyaW5nVGltZURpYWxvZyB9IGZyb20gJy4vRGlzYXBwZWFyaW5nVGltZURpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgUGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHkgfSBmcm9tICcuLi91dGlsL3Bob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5JztcbmltcG9ydCB7IFBob25lTnVtYmVyU2hhcmluZ01vZGUgfSBmcm9tICcuLi91dGlsL3Bob25lTnVtYmVyU2hhcmluZ01vZGUnO1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9TZWxlY3QnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4vU3Bpbm5lcic7XG5pbXBvcnQgeyBUaXRsZUJhckNvbnRhaW5lciB9IGZyb20gJy4vVGl0bGVCYXJDb250YWluZXInO1xuaW1wb3J0IHR5cGUgeyBFeGVjdXRlTWVudVJvbGVUeXBlIH0gZnJvbSAnLi9UaXRsZUJhckNvbnRhaW5lcic7XG5pbXBvcnQgeyBnZXRDdXN0b21Db2xvclN0eWxlIH0gZnJvbSAnLi4vdXRpbC9nZXRDdXN0b21Db2xvclN0eWxlJztcbmltcG9ydCB7XG4gIERFRkFVTFRfRFVSQVRJT05TX0lOX1NFQ09ORFMsXG4gIERFRkFVTFRfRFVSQVRJT05TX1NFVCxcbiAgZm9ybWF0IGFzIGZvcm1hdEV4cGlyYXRpb25UaW1lcixcbn0gZnJvbSAnLi4vdXRpbC9leHBpcmF0aW9uVGltZXInO1xuaW1wb3J0IHsgdXNlRXNjYXBlSGFuZGxpbmcgfSBmcm9tICcuLi9ob29rcy91c2VFc2NhcGVIYW5kbGluZyc7XG5pbXBvcnQgeyB1c2VVbmlxdWVJZCB9IGZyb20gJy4uL2hvb2tzL3VzZVVuaXF1ZUlkJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vaG9va3MvdXNlVGhlbWUnO1xuXG50eXBlIENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHVua25vd247XG50eXBlIFNlbGVjdENoYW5nZUhhbmRsZXJUeXBlPFQgPSBzdHJpbmcgfCBudW1iZXI+ID0gKHZhbHVlOiBUKSA9PiB1bmtub3duO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIC8vIFNldHRpbmdzXG4gIGJsb2NrZWRDb3VudDogbnVtYmVyO1xuICBjdXN0b21Db2xvcnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUNvbG9yVHlwZT47XG4gIGRlZmF1bHRDb252ZXJzYXRpb25Db2xvcjogRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgZGV2aWNlTmFtZT86IHN0cmluZztcbiAgaGFzQXVkaW9Ob3RpZmljYXRpb25zPzogYm9vbGVhbjtcbiAgaGFzQXV0b0Rvd25sb2FkVXBkYXRlOiBib29sZWFuO1xuICBoYXNBdXRvTGF1bmNoOiBib29sZWFuO1xuICBoYXNDYWxsTm90aWZpY2F0aW9uczogYm9vbGVhbjtcbiAgaGFzQ2FsbFJpbmd0b25lTm90aWZpY2F0aW9uOiBib29sZWFuO1xuICBoYXNDb3VudE11dGVkQ29udmVyc2F0aW9uczogYm9vbGVhbjtcbiAgaGFzSGlkZU1lbnVCYXI/OiBib29sZWFuO1xuICBoYXNJbmNvbWluZ0NhbGxOb3RpZmljYXRpb25zOiBib29sZWFuO1xuICBoYXNMaW5rUHJldmlld3M6IGJvb2xlYW47XG4gIGhhc01lZGlhQ2FtZXJhUGVybWlzc2lvbnM6IGJvb2xlYW47XG4gIGhhc01lZGlhUGVybWlzc2lvbnM6IGJvb2xlYW47XG4gIGhhc01pbmltaXplVG9BbmRTdGFydEluU3lzdGVtVHJheTogYm9vbGVhbjtcbiAgaGFzTWluaW1pemVUb1N5c3RlbVRyYXk6IGJvb2xlYW47XG4gIGhhc05vdGlmaWNhdGlvbkF0dGVudGlvbjogYm9vbGVhbjtcbiAgaGFzTm90aWZpY2F0aW9uczogYm9vbGVhbjtcbiAgaGFzUmVhZFJlY2VpcHRzOiBib29sZWFuO1xuICBoYXNSZWxheUNhbGxzPzogYm9vbGVhbjtcbiAgaGFzU3BlbGxDaGVjazogYm9vbGVhbjtcbiAgaGFzVHlwaW5nSW5kaWNhdG9yczogYm9vbGVhbjtcbiAgbGFzdFN5bmNUaW1lPzogbnVtYmVyO1xuICBub3RpZmljYXRpb25Db250ZW50OiBOb3RpZmljYXRpb25TZXR0aW5nVHlwZTtcbiAgc2VsZWN0ZWRDYW1lcmE/OiBzdHJpbmc7XG4gIHNlbGVjdGVkTWljcm9waG9uZT86IEF1ZGlvRGV2aWNlO1xuICBzZWxlY3RlZFNwZWFrZXI/OiBBdWRpb0RldmljZTtcbiAgdGhlbWVTZXR0aW5nOiBUaGVtZVNldHRpbmdUeXBlO1xuICB1bml2ZXJzYWxFeHBpcmVUaW1lcjogbnVtYmVyO1xuICB3aG9DYW5GaW5kTWU6IFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5O1xuICB3aG9DYW5TZWVNZTogUGhvbmVOdW1iZXJTaGFyaW5nTW9kZTtcbiAgem9vbUZhY3RvcjogWm9vbUZhY3RvclR5cGU7XG5cbiAgLy8gT3RoZXIgcHJvcHNcbiAgYWRkQ3VzdG9tQ29sb3I6IChjb2xvcjogQ3VzdG9tQ29sb3JUeXBlKSA9PiB1bmtub3duO1xuICBjbG9zZVNldHRpbmdzOiAoKSA9PiB1bmtub3duO1xuICBkb0RlbGV0ZUFsbERhdGE6ICgpID0+IHVua25vd247XG4gIGRvbmVSZW5kZXJpbmc6ICgpID0+IHVua25vd247XG4gIGVkaXRDdXN0b21Db2xvcjogKGNvbG9ySWQ6IHN0cmluZywgY29sb3I6IEN1c3RvbUNvbG9yVHlwZSkgPT4gdW5rbm93bjtcbiAgZ2V0Q29udmVyc2F0aW9uc1dpdGhDdXN0b21Db2xvcjogKFxuICAgIGNvbG9ySWQ6IHN0cmluZ1xuICApID0+IFByb21pc2U8QXJyYXk8Q29udmVyc2F0aW9uVHlwZT4+O1xuICBpbml0aWFsU3BlbGxDaGVja1NldHRpbmc6IGJvb2xlYW47XG4gIG1ha2VTeW5jUmVxdWVzdDogKCkgPT4gdW5rbm93bjtcbiAgcmVtb3ZlQ3VzdG9tQ29sb3I6IChjb2xvcklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHJlbW92ZUN1c3RvbUNvbG9yT25Db252ZXJzYXRpb25zOiAoY29sb3JJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZXNldEFsbENoYXRDb2xvcnM6ICgpID0+IHVua25vd247XG4gIHJlc2V0RGVmYXVsdENoYXRDb2xvcjogKCkgPT4gdW5rbm93bjtcbiAgc2V0R2xvYmFsRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yOiAoXG4gICAgY29sb3I6IENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbiAgICBjdXN0b21Db2xvckRhdGE/OiB7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgdmFsdWU6IEN1c3RvbUNvbG9yVHlwZTtcbiAgICB9XG4gICkgPT4gdW5rbm93bjtcbiAgcGxhdGZvcm06IHN0cmluZztcbiAgaXNXaW5kb3dzMTE6IGJvb2xlYW47XG4gIGV4ZWN1dGVNZW51Um9sZTogRXhlY3V0ZU1lbnVSb2xlVHlwZTtcblxuICAvLyBMaW1pdGVkIHN1cHBvcnQgZmVhdHVyZXNcbiAgaXNBdWRpb05vdGlmaWNhdGlvbnNTdXBwb3J0ZWQ6IGJvb2xlYW47XG4gIGlzQXV0b0Rvd25sb2FkVXBkYXRlc1N1cHBvcnRlZDogYm9vbGVhbjtcbiAgaXNBdXRvTGF1bmNoU3VwcG9ydGVkOiBib29sZWFuO1xuICBpc0hpZGVNZW51QmFyU3VwcG9ydGVkOiBib29sZWFuO1xuICBpc05vdGlmaWNhdGlvbkF0dGVudGlvblN1cHBvcnRlZDogYm9vbGVhbjtcbiAgaXNQaG9uZU51bWJlclNoYXJpbmdTdXBwb3J0ZWQ6IGJvb2xlYW47XG4gIGlzU3luY1N1cHBvcnRlZDogYm9vbGVhbjtcbiAgaXNTeXN0ZW1UcmF5U3VwcG9ydGVkOiBib29sZWFuO1xuXG4gIC8vIENoYW5nZSBoYW5kbGVyc1xuICBvbkF1ZGlvTm90aWZpY2F0aW9uc0NoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25BdXRvRG93bmxvYWRVcGRhdGVDaGFuZ2U6IENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGU7XG4gIG9uQXV0b0xhdW5jaENoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25DYWxsTm90aWZpY2F0aW9uc0NoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25DYWxsUmluZ3RvbmVOb3RpZmljYXRpb25DaGFuZ2U6IENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGU7XG4gIG9uQ291bnRNdXRlZENvbnZlcnNhdGlvbnNDaGFuZ2U6IENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGU7XG4gIG9uSGlkZU1lbnVCYXJDaGFuZ2U6IENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGU7XG4gIG9uSW5jb21pbmdDYWxsTm90aWZpY2F0aW9uc0NoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25MYXN0U3luY1RpbWVDaGFuZ2U6ICh0aW1lOiBudW1iZXIpID0+IHVua25vd247XG4gIG9uTWVkaWFDYW1lcmFQZXJtaXNzaW9uc0NoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25NZWRpYVBlcm1pc3Npb25zQ2hhbmdlOiBDaGVja2JveENoYW5nZUhhbmRsZXJUeXBlO1xuICBvbk1pbmltaXplVG9BbmRTdGFydEluU3lzdGVtVHJheUNoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25NaW5pbWl6ZVRvU3lzdGVtVHJheUNoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25Ob3RpZmljYXRpb25BdHRlbnRpb25DaGFuZ2U6IENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGU7XG4gIG9uTm90aWZpY2F0aW9uQ29udGVudENoYW5nZTogU2VsZWN0Q2hhbmdlSGFuZGxlclR5cGU8Tm90aWZpY2F0aW9uU2V0dGluZ1R5cGU+O1xuICBvbk5vdGlmaWNhdGlvbnNDaGFuZ2U6IENoZWNrYm94Q2hhbmdlSGFuZGxlclR5cGU7XG4gIG9uUmVsYXlDYWxsc0NoYW5nZTogQ2hlY2tib3hDaGFuZ2VIYW5kbGVyVHlwZTtcbiAgb25TZWxlY3RlZENhbWVyYUNoYW5nZTogU2VsZWN0Q2hhbmdlSGFuZGxlclR5cGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgb25TZWxlY3RlZE1pY3JvcGhvbmVDaGFuZ2U6IFNlbGVjdENoYW5nZUhhbmRsZXJUeXBlPEF1ZGlvRGV2aWNlIHwgdW5kZWZpbmVkPjtcbiAgb25TZWxlY3RlZFNwZWFrZXJDaGFuZ2U6IFNlbGVjdENoYW5nZUhhbmRsZXJUeXBlPEF1ZGlvRGV2aWNlIHwgdW5kZWZpbmVkPjtcbiAgb25TcGVsbENoZWNrQ2hhbmdlOiBDaGVja2JveENoYW5nZUhhbmRsZXJUeXBlO1xuICBvblRoZW1lQ2hhbmdlOiBTZWxlY3RDaGFuZ2VIYW5kbGVyVHlwZTxUaGVtZVR5cGU+O1xuICBvblVuaXZlcnNhbEV4cGlyZVRpbWVyQ2hhbmdlOiBTZWxlY3RDaGFuZ2VIYW5kbGVyVHlwZTxudW1iZXI+O1xuICBvblpvb21GYWN0b3JDaGFuZ2U6IFNlbGVjdENoYW5nZUhhbmRsZXJUeXBlPFpvb21GYWN0b3JUeXBlPjtcblxuICBhdmFpbGFibGVDYW1lcmFzOiBBcnJheTxcbiAgICBQaWNrPE1lZGlhRGV2aWNlSW5mbywgJ2RldmljZUlkJyB8ICdncm91cElkJyB8ICdraW5kJyB8ICdsYWJlbCc+XG4gID47XG5cbiAgLy8gTG9jYWxpemF0aW9uXG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59ICYgT21pdDxNZWRpYURldmljZVNldHRpbmdzLCAnYXZhaWxhYmxlQ2FtZXJhcyc+O1xuXG5lbnVtIFBhZ2Uge1xuICAvLyBBY2Nlc3NpYmxlIHRocm91Z2ggbGVmdCBuYXZcbiAgR2VuZXJhbCA9ICdHZW5lcmFsJyxcbiAgQXBwZWFyYW5jZSA9ICdBcHBlYXJhbmNlJyxcbiAgQ2hhdHMgPSAnQ2hhdHMnLFxuICBDYWxscyA9ICdDYWxscycsXG4gIE5vdGlmaWNhdGlvbnMgPSAnTm90aWZpY2F0aW9ucycsXG4gIFByaXZhY3kgPSAnUHJpdmFjeScsXG5cbiAgLy8gU3ViIHBhZ2VzXG4gIENoYXRDb2xvciA9ICdDaGF0Q29sb3InLFxufVxuXG5jb25zdCBERUZBVUxUX1pPT01fRkFDVE9SUyA9IFtcbiAge1xuICAgIHRleHQ6ICc3NSUnLFxuICAgIHZhbHVlOiAwLjc1LFxuICB9LFxuICB7XG4gICAgdGV4dDogJzEwMCUnLFxuICAgIHZhbHVlOiAxLFxuICB9LFxuICB7XG4gICAgdGV4dDogJzEyNSUnLFxuICAgIHZhbHVlOiAxLjI1LFxuICB9LFxuICB7XG4gICAgdGV4dDogJzE1MCUnLFxuICAgIHZhbHVlOiAxLjUsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnMjAwJScsXG4gICAgdmFsdWU6IDIsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgUHJlZmVyZW5jZXMgPSAoe1xuICBhZGRDdXN0b21Db2xvcixcbiAgYXZhaWxhYmxlQ2FtZXJhcyxcbiAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gIGF2YWlsYWJsZVNwZWFrZXJzLFxuICBibG9ja2VkQ291bnQsXG4gIGNsb3NlU2V0dGluZ3MsXG4gIGN1c3RvbUNvbG9ycyxcbiAgZGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yLFxuICBkZXZpY2VOYW1lID0gJycsXG4gIGRvRGVsZXRlQWxsRGF0YSxcbiAgZG9uZVJlbmRlcmluZyxcbiAgZWRpdEN1c3RvbUNvbG9yLFxuICBleGVjdXRlTWVudVJvbGUsXG4gIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3IsXG4gIGhhc0F1ZGlvTm90aWZpY2F0aW9ucyxcbiAgaGFzQXV0b0Rvd25sb2FkVXBkYXRlLFxuICBoYXNBdXRvTGF1bmNoLFxuICBoYXNDYWxsTm90aWZpY2F0aW9ucyxcbiAgaGFzQ2FsbFJpbmd0b25lTm90aWZpY2F0aW9uLFxuICBoYXNDb3VudE11dGVkQ29udmVyc2F0aW9ucyxcbiAgaGFzSGlkZU1lbnVCYXIsXG4gIGhhc0luY29taW5nQ2FsbE5vdGlmaWNhdGlvbnMsXG4gIGhhc0xpbmtQcmV2aWV3cyxcbiAgaGFzTWVkaWFDYW1lcmFQZXJtaXNzaW9ucyxcbiAgaGFzTWVkaWFQZXJtaXNzaW9ucyxcbiAgaGFzTWluaW1pemVUb0FuZFN0YXJ0SW5TeXN0ZW1UcmF5LFxuICBoYXNNaW5pbWl6ZVRvU3lzdGVtVHJheSxcbiAgaGFzTm90aWZpY2F0aW9uQXR0ZW50aW9uLFxuICBoYXNOb3RpZmljYXRpb25zLFxuICBoYXNSZWFkUmVjZWlwdHMsXG4gIGhhc1JlbGF5Q2FsbHMsXG4gIGhhc1NwZWxsQ2hlY2ssXG4gIGhhc1R5cGluZ0luZGljYXRvcnMsXG4gIGkxOG4sXG4gIGluaXRpYWxTcGVsbENoZWNrU2V0dGluZyxcbiAgaXNBdWRpb05vdGlmaWNhdGlvbnNTdXBwb3J0ZWQsXG4gIGlzQXV0b0Rvd25sb2FkVXBkYXRlc1N1cHBvcnRlZCxcbiAgaXNBdXRvTGF1bmNoU3VwcG9ydGVkLFxuICBpc0hpZGVNZW51QmFyU3VwcG9ydGVkLFxuICBpc1Bob25lTnVtYmVyU2hhcmluZ1N1cHBvcnRlZCxcbiAgaXNOb3RpZmljYXRpb25BdHRlbnRpb25TdXBwb3J0ZWQsXG4gIGlzU3luY1N1cHBvcnRlZCxcbiAgaXNTeXN0ZW1UcmF5U3VwcG9ydGVkLFxuICBpc1dpbmRvd3MxMSxcbiAgbGFzdFN5bmNUaW1lLFxuICBtYWtlU3luY1JlcXVlc3QsXG4gIG5vdGlmaWNhdGlvbkNvbnRlbnQsXG4gIG9uQXVkaW9Ob3RpZmljYXRpb25zQ2hhbmdlLFxuICBvbkF1dG9Eb3dubG9hZFVwZGF0ZUNoYW5nZSxcbiAgb25BdXRvTGF1bmNoQ2hhbmdlLFxuICBvbkNhbGxOb3RpZmljYXRpb25zQ2hhbmdlLFxuICBvbkNhbGxSaW5ndG9uZU5vdGlmaWNhdGlvbkNoYW5nZSxcbiAgb25Db3VudE11dGVkQ29udmVyc2F0aW9uc0NoYW5nZSxcbiAgb25IaWRlTWVudUJhckNoYW5nZSxcbiAgb25JbmNvbWluZ0NhbGxOb3RpZmljYXRpb25zQ2hhbmdlLFxuICBvbkxhc3RTeW5jVGltZUNoYW5nZSxcbiAgb25NZWRpYUNhbWVyYVBlcm1pc3Npb25zQ2hhbmdlLFxuICBvbk1lZGlhUGVybWlzc2lvbnNDaGFuZ2UsXG4gIG9uTWluaW1pemVUb0FuZFN0YXJ0SW5TeXN0ZW1UcmF5Q2hhbmdlLFxuICBvbk1pbmltaXplVG9TeXN0ZW1UcmF5Q2hhbmdlLFxuICBvbk5vdGlmaWNhdGlvbkF0dGVudGlvbkNoYW5nZSxcbiAgb25Ob3RpZmljYXRpb25Db250ZW50Q2hhbmdlLFxuICBvbk5vdGlmaWNhdGlvbnNDaGFuZ2UsXG4gIG9uUmVsYXlDYWxsc0NoYW5nZSxcbiAgb25TZWxlY3RlZENhbWVyYUNoYW5nZSxcbiAgb25TZWxlY3RlZE1pY3JvcGhvbmVDaGFuZ2UsXG4gIG9uU2VsZWN0ZWRTcGVha2VyQ2hhbmdlLFxuICBvblNwZWxsQ2hlY2tDaGFuZ2UsXG4gIG9uVGhlbWVDaGFuZ2UsXG4gIG9uVW5pdmVyc2FsRXhwaXJlVGltZXJDaGFuZ2UsXG4gIG9uWm9vbUZhY3RvckNoYW5nZSxcbiAgcGxhdGZvcm0sXG4gIHJlbW92ZUN1c3RvbUNvbG9yLFxuICByZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9ucyxcbiAgcmVzZXRBbGxDaGF0Q29sb3JzLFxuICByZXNldERlZmF1bHRDaGF0Q29sb3IsXG4gIHNlbGVjdGVkQ2FtZXJhLFxuICBzZWxlY3RlZE1pY3JvcGhvbmUsXG4gIHNlbGVjdGVkU3BlYWtlcixcbiAgc2V0R2xvYmFsRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yLFxuICB0aGVtZVNldHRpbmcsXG4gIHVuaXZlcnNhbEV4cGlyZVRpbWVyID0gMCxcbiAgd2hvQ2FuRmluZE1lLFxuICB3aG9DYW5TZWVNZSxcbiAgem9vbUZhY3Rvcixcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgdGhlbWVTZWxlY3RJZCA9IHVzZVVuaXF1ZUlkKCk7XG4gIGNvbnN0IHpvb21TZWxlY3RJZCA9IHVzZVVuaXF1ZUlkKCk7XG5cbiAgY29uc3QgW2NvbmZpcm1EZWxldGUsIHNldENvbmZpcm1EZWxldGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZTxQYWdlPihQYWdlLkdlbmVyYWwpO1xuICBjb25zdCBbc2hvd1N5bmNGYWlsZWQsIHNldFNob3dTeW5jRmFpbGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25vd1N5bmNpbmcsIHNldE5vd1N5bmNpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0Rpc2FwcGVhcmluZ1RpbWVyRGlhbG9nLCBzZXRTaG93RGlzYXBwZWFyaW5nVGltZXJEaWFsb2ddID1cbiAgICB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRvbmVSZW5kZXJpbmcoKTtcbiAgfSwgW2RvbmVSZW5kZXJpbmddKTtcblxuICB1c2VFc2NhcGVIYW5kbGluZyhjbG9zZVNldHRpbmdzKTtcblxuICBjb25zdCBvblpvb21TZWxlY3RDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgbnVtYmVyID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICBvblpvb21GYWN0b3JDaGFuZ2UobnVtYmVyIGFzIHVua25vd24gYXMgWm9vbUZhY3RvclR5cGUpO1xuICAgIH0sXG4gICAgW29uWm9vbUZhY3RvckNoYW5nZV1cbiAgKTtcblxuICBjb25zdCBvbkF1ZGlvSW5wdXRTZWxlY3RDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvblNlbGVjdGVkTWljcm9waG9uZUNoYW5nZSh1bmRlZmluZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25TZWxlY3RlZE1pY3JvcGhvbmVDaGFuZ2UoYXZhaWxhYmxlTWljcm9waG9uZXNbcGFyc2VJbnQodmFsdWUsIDEwKV0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VsZWN0ZWRNaWNyb3Bob25lQ2hhbmdlLCBhdmFpbGFibGVNaWNyb3Bob25lc11cbiAgKTtcblxuICBjb25zdCBvbkF1ZGlvT3V0cHV0U2VsZWN0Q2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb25TZWxlY3RlZFNwZWFrZXJDaGFuZ2UodW5kZWZpbmVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uU2VsZWN0ZWRTcGVha2VyQ2hhbmdlKGF2YWlsYWJsZVNwZWFrZXJzW3BhcnNlSW50KHZhbHVlLCAxMCldKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvblNlbGVjdGVkU3BlYWtlckNoYW5nZSwgYXZhaWxhYmxlU3BlYWtlcnNdXG4gICk7XG5cbiAgbGV0IHNldHRpbmdzOiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgaWYgKHBhZ2UgPT09IFBhZ2UuR2VuZXJhbCkge1xuICAgIHNldHRpbmdzID0gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fdGl0bGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX190aXRsZS0taGVhZGVyXCI+XG4gICAgICAgICAgICB7aTE4bignUHJlZmVyZW5jZXNfX2J1dHRvbi0tZ2VuZXJhbCcpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNldHRpbmdzUm93PlxuICAgICAgICAgIDxDb250cm9sIGxlZnQ9e2kxOG4oJ1ByZWZlcmVuY2VzLS1kZXZpY2UtbmFtZScpfSByaWdodD17ZGV2aWNlTmFtZX0gLz5cbiAgICAgICAgPC9TZXR0aW5nc1Jvdz5cbiAgICAgICAgPFNldHRpbmdzUm93IHRpdGxlPXtpMThuKCdQcmVmZXJlbmNlcy0tc3lzdGVtJyl9PlxuICAgICAgICAgIHtpc0F1dG9MYXVuY2hTdXBwb3J0ZWQgJiYgKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2hhc0F1dG9MYXVuY2h9XG4gICAgICAgICAgICAgIGxhYmVsPXtpMThuKCdhdXRvTGF1bmNoRGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgbmFtZT1cImF1dG9MYXVuY2hcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25BdXRvTGF1bmNoQ2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpc0hpZGVNZW51QmFyU3VwcG9ydGVkICYmIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBjaGVja2VkPXtoYXNIaWRlTWVudUJhcn1cbiAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ2hpZGVNZW51QmFyJyl9XG4gICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19jaGVja2JveFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJoaWRlTWVudUJhclwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkhpZGVNZW51QmFyQ2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpc1N5c3RlbVRyYXlTdXBwb3J0ZWQgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgICAgY2hlY2tlZD17aGFzTWluaW1pemVUb1N5c3RlbVRyYXl9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ1N5c3RlbVRyYXlTZXR0aW5nX19taW5pbWl6ZS10by1zeXN0ZW0tdHJheScpfVxuICAgICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInN5c3RlbS10cmF5LXNldHRpbmctbWluaW1pemUtdG8tc3lzdGVtLXRyYXlcIlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1pbmltaXplVG9TeXN0ZW1UcmF5Q2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICBjaGVja2VkPXtoYXNNaW5pbWl6ZVRvQW5kU3RhcnRJblN5c3RlbVRyYXl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNNaW5pbWl6ZVRvU3lzdGVtVHJheX1cbiAgICAgICAgICAgICAgICBsYWJlbD17aTE4bihcbiAgICAgICAgICAgICAgICAgICdTeXN0ZW1UcmF5U2V0dGluZ19fbWluaW1pemUtdG8tYW5kLXN0YXJ0LWluLXN5c3RlbS10cmF5J1xuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBuYW1lPVwic3lzdGVtLXRyYXktc2V0dGluZy1taW5pbWl6ZS10by1hbmQtc3RhcnQtaW4tc3lzdGVtLXRyYXlcIlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1pbmltaXplVG9BbmRTdGFydEluU3lzdGVtVHJheUNoYW5nZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvU2V0dGluZ3NSb3c+XG4gICAgICAgIDxTZXR0aW5nc1JvdyB0aXRsZT17aTE4bigncGVybWlzc2lvbnMnKX0+XG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBjaGVja2VkPXtoYXNNZWRpYVBlcm1pc3Npb25zfVxuICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ21lZGlhUGVybWlzc2lvbnNEZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIG5hbWU9XCJtZWRpYVBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1lZGlhUGVybWlzc2lvbnNDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc01lZGlhQ2FtZXJhUGVybWlzc2lvbnN9XG4gICAgICAgICAgICBsYWJlbD17aTE4bignbWVkaWFDYW1lcmFQZXJtaXNzaW9uc0Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY2hlY2tib3hcIlxuICAgICAgICAgICAgbmFtZT1cIm1lZGlhQ2FtZXJhUGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e29uTWVkaWFDYW1lcmFQZXJtaXNzaW9uc0NoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgICB7aXNBdXRvRG93bmxvYWRVcGRhdGVzU3VwcG9ydGVkICYmIChcbiAgICAgICAgICA8U2V0dGluZ3NSb3cgdGl0bGU9e2kxOG4oJ1ByZWZlcmVuY2VzLS11cGRhdGVzJyl9PlxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2hhc0F1dG9Eb3dubG9hZFVwZGF0ZX1cbiAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ1ByZWZlcmVuY2VzX19kb3dubG9hZC11cGRhdGUnKX1cbiAgICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgbmFtZT1cImF1dG9Eb3dubG9hZFVwZGF0ZVwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkF1dG9Eb3dubG9hZFVwZGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9TZXR0aW5nc1Jvdz5cbiAgICAgICAgKX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAocGFnZSA9PT0gUGFnZS5BcHBlYXJhbmNlKSB7XG4gICAgbGV0IHpvb21GYWN0b3JzID0gREVGQVVMVF9aT09NX0ZBQ1RPUlM7XG5cbiAgICBpZiAoIXpvb21GYWN0b3JzLnNvbWUoKHsgdmFsdWUgfSkgPT4gdmFsdWUgPT09IHpvb21GYWN0b3IpKSB7XG4gICAgICB6b29tRmFjdG9ycyA9IFtcbiAgICAgICAgLi4uem9vbUZhY3RvcnMsXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBgJHtNYXRoLnJvdW5kKHpvb21GYWN0b3IgKiAxMDApfSVgLFxuICAgICAgICAgIHZhbHVlOiB6b29tRmFjdG9yLFxuICAgICAgICB9LFxuICAgICAgXS5zb3J0KChhLCBiKSA9PiBhLnZhbHVlIC0gYi52YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0dGluZ3MgPSAoXG4gICAgICA8PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX190aXRsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3RpdGxlLS1oZWFkZXJcIj5cbiAgICAgICAgICAgIHtpMThuKCdQcmVmZXJlbmNlc19fYnV0dG9uLS1hcHBlYXJhbmNlJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2V0dGluZ3NSb3c+XG4gICAgICAgICAgPENvbnRyb2xcbiAgICAgICAgICAgIGxlZnQ9e1xuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhlbWVTZWxlY3RJZH0+XG4gICAgICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzLS10aGVtZScpfVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgaWQ9e3RoZW1lU2VsZWN0SWR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uVGhlbWVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCd0aGVtZVN5c3RlbScpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3N5c3RlbScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCd0aGVtZUxpZ2h0JyksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbGlnaHQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaTE4bigndGhlbWVEYXJrJyksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZGFyaycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoZW1lU2V0dGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250cm9sXG4gICAgICAgICAgICBsZWZ0PXtpMThuKCdzaG93Q2hhdENvbG9yRWRpdG9yJyl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldFBhZ2UoUGFnZS5DaGF0Q29sb3IpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YENvbnZlcnNhdGlvbkRldGFpbHNfX2NoYXQtY29sb3IgQ29udmVyc2F0aW9uRGV0YWlsc19fY2hhdC1jb2xvci0tJHtkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IuY29sb3J9YH1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgLi4uZ2V0Q3VzdG9tQ29sb3JTdHlsZShcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yLmN1c3RvbUNvbG9yRGF0YT8udmFsdWVcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250cm9sXG4gICAgICAgICAgICBsZWZ0PXtcbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e3pvb21TZWxlY3RJZH0+e2kxOG4oJ1ByZWZlcmVuY2VzLS16b29tJyl9PC9sYWJlbD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgIGlkPXt6b29tU2VsZWN0SWR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uWm9vbVNlbGVjdENoYW5nZX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt6b29tRmFjdG9yc31cbiAgICAgICAgICAgICAgICB2YWx1ZT17em9vbUZhY3Rvcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChwYWdlID09PSBQYWdlLkNoYXRzKSB7XG4gICAgbGV0IHNwZWxsQ2hlY2tEaXJ0eVRleHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAoaW5pdGlhbFNwZWxsQ2hlY2tTZXR0aW5nICE9PSBoYXNTcGVsbENoZWNrKSB7XG4gICAgICBzcGVsbENoZWNrRGlydHlUZXh0ID0gaGFzU3BlbGxDaGVja1xuICAgICAgICA/IGkxOG4oJ3NwZWxsQ2hlY2tXaWxsQmVFbmFibGVkJylcbiAgICAgICAgOiBpMThuKCdzcGVsbENoZWNrV2lsbEJlRGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0U3luY0RhdGUgPSBuZXcgRGF0ZShsYXN0U3luY1RpbWUgfHwgMCk7XG5cbiAgICBzZXR0aW5ncyA9IChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3RpdGxlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fdGl0bGUtLWhlYWRlclwiPlxuICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzX19idXR0b24tLWNoYXRzJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2V0dGluZ3NSb3cgdGl0bGU9e2kxOG4oJ1ByZWZlcmVuY2VzX19idXR0b24tLWNoYXRzJyl9PlxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgY2hlY2tlZD17aGFzU3BlbGxDaGVja31cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtzcGVsbENoZWNrRGlydHlUZXh0fVxuICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ3NwZWxsQ2hlY2tEZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIG5hbWU9XCJzcGVsbGNoZWNrXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblNwZWxsQ2hlY2tDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc0xpbmtQcmV2aWV3c31cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtpMThuKCdQcmVmZXJlbmNlc19fbGluay1wcmV2aWV3cy0tZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICBsYWJlbD17aTE4bignUHJlZmVyZW5jZXNfX2xpbmstcHJldmlld3MtLXRpdGxlJyl9XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY2hlY2tib3hcIlxuICAgICAgICAgICAgbmFtZT1cImxpbmtQcmV2aWV3c1wiXG4gICAgICAgICAgICBvbkNoYW5nZT17bm9vcH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgICB7aXNTeW5jU3VwcG9ydGVkICYmIChcbiAgICAgICAgICA8U2V0dGluZ3NSb3c+XG4gICAgICAgICAgICA8Q29udHJvbFxuICAgICAgICAgICAgICBsZWZ0PXtcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdj57aTE4bignc3luYycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAge2kxOG4oJ3N5bmNFeHBsYW5hdGlvbicpfXsnICd9XG4gICAgICAgICAgICAgICAgICAgIHtpMThuKCdQcmVmZXJlbmNlcy0tbGFzdFN5bmNlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBsYXN0U3luY0RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgdGltZTogbGFzdFN5bmNEYXRlLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAge3Nob3dTeW5jRmFpbGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fZGVzY3JpcHRpb24gUHJlZmVyZW5jZXNfX2Rlc2NyaXB0aW9uLS1lcnJvclwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtpMThuKCdzeW5jRmFpbGVkJyl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByaWdodD17XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fcmlnaHQtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtub3dTeW5jaW5nfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd1N5bmNGYWlsZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldE5vd1N5bmNpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1ha2VTeW5jUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0U3luY1RpbWVDaGFuZ2UoRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93U3luY0ZhaWxlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Tm93U3luY2luZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeUFmZmlybWF0aXZlfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7bm93U3luY2luZyA/IDxTcGlubmVyIHN2Z1NpemU9XCJzbWFsbFwiIC8+IDogaTE4bignc3luY05vdycpfVxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9TZXR0aW5nc1Jvdz5cbiAgICAgICAgKX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAocGFnZSA9PT0gUGFnZS5DYWxscykge1xuICAgIHNldHRpbmdzID0gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fdGl0bGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX190aXRsZS0taGVhZGVyXCI+XG4gICAgICAgICAgICB7aTE4bignUHJlZmVyZW5jZXNfX2J1dHRvbi0tY2FsbHMnKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZXR0aW5nc1JvdyB0aXRsZT17aTE4bignY2FsbGluZycpfT5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc0luY29taW5nQ2FsbE5vdGlmaWNhdGlvbnN9XG4gICAgICAgICAgICBsYWJlbD17aTE4bignaW5jb21pbmdDYWxsTm90aWZpY2F0aW9uRGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19jaGVja2JveFwiXG4gICAgICAgICAgICBuYW1lPVwiaW5jb21pbmdDYWxsTm90aWZpY2F0aW9uXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkluY29taW5nQ2FsbE5vdGlmaWNhdGlvbnNDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc0NhbGxSaW5ndG9uZU5vdGlmaWNhdGlvbn1cbiAgICAgICAgICAgIGxhYmVsPXtpMThuKCdjYWxsUmluZ3RvbmVOb3RpZmljYXRpb25EZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIG5hbWU9XCJjYWxsUmluZ3RvbmVOb3RpZmljYXRpb25cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2FsbFJpbmd0b25lTm90aWZpY2F0aW9uQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU2V0dGluZ3NSb3c+XG4gICAgICAgIDxTZXR0aW5nc1JvdyB0aXRsZT17aTE4bignUHJlZmVyZW5jZXNfX2RldmljZXMnKX0+XG4gICAgICAgICAgPENvbnRyb2xcbiAgICAgICAgICAgIGxlZnQ9e1xuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fc2VsZWN0LXRpdGxlXCIgaHRtbEZvcj1cInZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICB7aTE4bignY2FsbGluZ0RldmljZVNlbGVjdGlvbl9fbGFiZWwtLXZpZGVvJyl9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX2xhYmVsLS12aWRlbycpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFhdmFpbGFibGVDYW1lcmFzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInZpZGVvXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvblNlbGVjdGVkQ2FtZXJhQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZUNhbWVyYXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgPyBhdmFpbGFibGVDYW1lcmFzLm1hcChkZXZpY2UgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbG9jYWxpemVEZWZhdWx0KGkxOG4sIGRldmljZS5sYWJlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkZXZpY2UuZGV2aWNlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2FsbGluZ0RldmljZVNlbGVjdGlvbl9fc2VsZWN0LS1uby1kZXZpY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDYW1lcmF9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByaWdodD17PGRpdiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250cm9sXG4gICAgICAgICAgICBsZWZ0PXtcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19zZWxlY3QtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgaHRtbEZvcj1cImF1ZGlvLWlucHV0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aTE4bignY2FsbGluZ0RldmljZVNlbGVjdGlvbl9fbGFiZWwtLWF1ZGlvLWlucHV0Jyl9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX2xhYmVsLS1hdWRpby1pbnB1dCcpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFhdmFpbGFibGVNaWNyb3Bob25lcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fc2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJhdWRpby1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25BdWRpb0lucHV0U2VsZWN0Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZU1pY3JvcGhvbmVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgID8gYXZhaWxhYmxlTWljcm9waG9uZXMubWFwKGRldmljZSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBsb2NhbGl6ZURlZmF1bHQoaTE4biwgZGV2aWNlLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGV2aWNlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX3NlbGVjdC0tbm8tZGV2aWNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkTWljcm9waG9uZT8uaW5kZXh9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByaWdodD17PGRpdiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250cm9sXG4gICAgICAgICAgICBsZWZ0PXtcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19zZWxlY3QtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgaHRtbEZvcj1cImF1ZGlvLW91dHB1dFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2kxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX2xhYmVsLS1hdWRpby1vdXRwdXQnKX1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bihcbiAgICAgICAgICAgICAgICAgICAgJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX2xhYmVsLS1hdWRpby1vdXRwdXQnXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFhdmFpbGFibGVTcGVha2Vycy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fc2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJhdWRpby1vdXRwdXRcIlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQXVkaW9PdXRwdXRTZWxlY3RDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlU3BlYWtlcnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgPyBhdmFpbGFibGVTcGVha2Vycy5tYXAoZGV2aWNlID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGxvY2FsaXplRGVmYXVsdChpMThuLCBkZXZpY2UubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkZXZpY2UuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2FsbGluZ0RldmljZVNlbGVjdGlvbl9fc2VsZWN0LS1uby1kZXZpY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3VuZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRTcGVha2VyPy5pbmRleH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJpZ2h0PXs8ZGl2IC8+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU2V0dGluZ3NSb3c+XG4gICAgICAgIDxTZXR0aW5nc1JvdyB0aXRsZT17aTE4bignUHJlZmVyZW5jZXMtLWFkdmFuY2VkJyl9PlxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgY2hlY2tlZD17aGFzUmVsYXlDYWxsc31cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtpMThuKCdhbHdheXNSZWxheUNhbGxzRGV0YWlsJyl9XG4gICAgICAgICAgICBsYWJlbD17aTE4bignYWx3YXlzUmVsYXlDYWxsc0Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY2hlY2tib3hcIlxuICAgICAgICAgICAgbmFtZT1cInJlbGF5Q2FsbHNcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e29uUmVsYXlDYWxsc0NoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChwYWdlID09PSBQYWdlLk5vdGlmaWNhdGlvbnMpIHtcbiAgICBzZXR0aW5ncyA9IChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3RpdGxlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fdGl0bGUtLWhlYWRlclwiPlxuICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzX19idXR0b24tLW5vdGlmaWNhdGlvbnMnKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZXR0aW5nc1Jvdz5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc05vdGlmaWNhdGlvbnN9XG4gICAgICAgICAgICBsYWJlbD17aTE4bignUHJlZmVyZW5jZXNfX2VuYWJsZS1ub3RpZmljYXRpb25zJyl9XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY2hlY2tib3hcIlxuICAgICAgICAgICAgbmFtZT1cIm5vdGlmaWNhdGlvbnNcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e29uTm90aWZpY2F0aW9uc0NoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgY2hlY2tlZD17aGFzQ2FsbE5vdGlmaWNhdGlvbnN9XG4gICAgICAgICAgICBsYWJlbD17aTE4bignY2FsbFN5c3RlbU5vdGlmaWNhdGlvbkRlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY2hlY2tib3hcIlxuICAgICAgICAgICAgbmFtZT1cImNhbGxTeXN0ZW1Ob3RpZmljYXRpb25cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2FsbE5vdGlmaWNhdGlvbnNDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7aXNOb3RpZmljYXRpb25BdHRlbnRpb25TdXBwb3J0ZWQgJiYgKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2hhc05vdGlmaWNhdGlvbkF0dGVudGlvbn1cbiAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ25vdGlmaWNhdGlvbkRyYXdBdHRlbnRpb24nKX1cbiAgICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgbmFtZT1cIm5vdGlmaWNhdGlvbkRyYXdBdHRlbnRpb25cIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25Ob3RpZmljYXRpb25BdHRlbnRpb25DaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2lzQXVkaW9Ob3RpZmljYXRpb25zU3VwcG9ydGVkICYmIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBjaGVja2VkPXtoYXNBdWRpb05vdGlmaWNhdGlvbnN9XG4gICAgICAgICAgICAgIGxhYmVsPXtpMThuKCdhdWRpb05vdGlmaWNhdGlvbkRlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19jaGVja2JveFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJhdWRpb05vdGlmaWNhdGlvblwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkF1ZGlvTm90aWZpY2F0aW9uc0NoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc0NvdW50TXV0ZWRDb252ZXJzYXRpb25zfVxuICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ2NvdW50TXV0ZWRDb252ZXJzYXRpb25zRGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19jaGVja2JveFwiXG4gICAgICAgICAgICBuYW1lPVwiY291bnRNdXRlZENvbnZlcnNhdGlvbnNcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ291bnRNdXRlZENvbnZlcnNhdGlvbnNDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TZXR0aW5nc1Jvdz5cbiAgICAgICAgPFNldHRpbmdzUm93PlxuICAgICAgICAgIDxDb250cm9sXG4gICAgICAgICAgICBsZWZ0PXtpMThuKCdQcmVmZXJlbmNlcy0tbm90aWZpY2F0aW9uLWNvbnRlbnQnKX1cbiAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignUHJlZmVyZW5jZXMtLW5vdGlmaWNhdGlvbi1jb250ZW50Jyl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNOb3RpZmljYXRpb25zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk5vdGlmaWNhdGlvbkNvbnRlbnRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCduYW1lQW5kTWVzc2FnZScpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ21lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaTE4bignbmFtZU9ubHknKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ25vTmFtZU9yTWVzc2FnZScpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2NvdW50JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17bm90aWZpY2F0aW9uQ29udGVudH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChwYWdlID09PSBQYWdlLlByaXZhY3kpIHtcbiAgICBjb25zdCBpc0N1c3RvbURpc2FwcGVhcmluZ01lc3NhZ2VWYWx1ZSA9XG4gICAgICAhREVGQVVMVF9EVVJBVElPTlNfU0VULmhhcyh1bml2ZXJzYWxFeHBpcmVUaW1lcik7XG5cbiAgICBzZXR0aW5ncyA9IChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3RpdGxlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fdGl0bGUtLWhlYWRlclwiPlxuICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzX19idXR0b24tLXByaXZhY3knKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZXR0aW5nc1Jvdz5cbiAgICAgICAgICA8Q29udHJvbFxuICAgICAgICAgICAgbGVmdD17aTE4bignUHJlZmVyZW5jZXMtLWJsb2NrZWQnKX1cbiAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgYmxvY2tlZENvdW50ID09PSAxXG4gICAgICAgICAgICAgICAgPyBpMThuKCdQcmVmZXJlbmNlcy0tYmxvY2tlZC1jb3VudC1zaW5ndWxhcicsIFtcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGJsb2NrZWRDb3VudCksXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogaTE4bignUHJlZmVyZW5jZXMtLWJsb2NrZWQtY291bnQtcGx1cmFsJywgW1xuICAgICAgICAgICAgICAgICAgICBTdHJpbmcoYmxvY2tlZENvdW50IHx8IDApLFxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgICB7aXNQaG9uZU51bWJlclNoYXJpbmdTdXBwb3J0ZWQgPyAoXG4gICAgICAgICAgPFNldHRpbmdzUm93IHRpdGxlPXtpMThuKCdQcmVmZXJlbmNlc19fd2hvLWNhbi0tdGl0bGUnKX0+XG4gICAgICAgICAgICA8Q29udHJvbFxuICAgICAgICAgICAgICBsZWZ0PXtpMThuKCdQcmVmZXJlbmNlcy0tc2VlLW1lJyl9XG4gICAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ1ByZWZlcmVuY2VzLS1zZWUtbWUnKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17bm9vcH1cbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1tcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ1ByZWZlcmVuY2VzX193aG8tY2FuLS1ldmVyeWJvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5FdmVyeWJvZHksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdQcmVmZXJlbmNlc19fd2hvLWNhbi0tY29udGFjdHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5Db250YWN0c09ubHksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdQcmVmZXJlbmNlc19fd2hvLWNhbi0tbm9ib2R5JyksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFBob25lTnVtYmVyU2hhcmluZ01vZGUuTm9ib2R5LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt3aG9DYW5TZWVNZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENvbnRyb2xcbiAgICAgICAgICAgICAgbGVmdD17aTE4bignUHJlZmVyZW5jZXMtLWZpbmQtbWUnKX1cbiAgICAgICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignUHJlZmVyZW5jZXMtLWZpbmQtbWUnKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17bm9vcH1cbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1tcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ1ByZWZlcmVuY2VzX193aG8tY2FuLS1ldmVyeWJvZHknKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHkuRGlzY292ZXJhYmxlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogaTE4bignUHJlZmVyZW5jZXNfX3doby1jYW4tLW5vYm9keScpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eS5Ob3REaXNjb3ZlcmFibGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3dob0NhbkZpbmRNZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fcGFkZGluZ1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgIHtpMThuKCdQcmVmZXJlbmNlc19fcHJpdmFjeS0tZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFNldHRpbmdzUm93IHRpdGxlPXtpMThuKCdQcmVmZXJlbmNlcy0tbWVzc2FnaW5nJyl9PlxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgY2hlY2tlZD17aGFzUmVhZFJlY2VpcHRzfVxuICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgIGxhYmVsPXtpMThuKCdQcmVmZXJlbmNlcy0tcmVhZC1yZWNlaXB0cycpfVxuICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIG5hbWU9XCJyZWFkUmVjZWlwdHNcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e25vb3B9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGNoZWNrZWQ9e2hhc1R5cGluZ0luZGljYXRvcnN9XG4gICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ1ByZWZlcmVuY2VzLS10eXBpbmctaW5kaWNhdG9ycycpfVxuICAgICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIG5hbWU9XCJ0eXBpbmdJbmRpY2F0b3JzXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtub29wfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fcGFkZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzX19wcml2YWN5LS1kZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU2V0dGluZ3NSb3c+XG4gICAgICAgIHtzaG93RGlzYXBwZWFyaW5nVGltZXJEaWFsb2cgJiYgKFxuICAgICAgICAgIDxEaXNhcHBlYXJpbmdUaW1lRGlhbG9nXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlPXt1bml2ZXJzYWxFeHBpcmVUaW1lcn1cbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dEaXNhcHBlYXJpbmdUaW1lckRpYWxvZyhmYWxzZSl9XG4gICAgICAgICAgICBvblN1Ym1pdD17b25Vbml2ZXJzYWxFeHBpcmVUaW1lckNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICA8U2V0dGluZ3NSb3cgdGl0bGU9e2kxOG4oJ2Rpc2FwcGVhcmluZ01lc3NhZ2VzJyl9PlxuICAgICAgICAgIDxDb250cm9sXG4gICAgICAgICAgICBsZWZ0PXtcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAge2kxOG4oJ3NldHRpbmdzX19EaXNhcHBlYXJpbmdNZXNzYWdlc19fdGltZXJfX2xhYmVsJyl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdzZXR0aW5nc19fRGlzYXBwZWFyaW5nTWVzc2FnZXNfX2Zvb3RlcicpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignc2V0dGluZ3NfX0Rpc2FwcGVhcmluZ01lc3NhZ2VzX190aW1lcl9fbGFiZWwnKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PT0gU3RyaW5nKHVuaXZlcnNhbEV4cGlyZVRpbWVyKSB8fFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PT0gJy0xJ1xuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFNob3dEaXNhcHBlYXJpbmdUaW1lckRpYWxvZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBvblVuaXZlcnNhbEV4cGlyZVRpbWVyQ2hhbmdlKHBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17REVGQVVMVF9EVVJBVElPTlNfSU5fU0VDT05EUy5tYXAoc2Vjb25kcyA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZm9ybWF0RXhwaXJhdGlvblRpbWVyKGkxOG4sIHNlY29uZHMsIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwaXRhbGl6ZU9mZjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlY29uZHMsXG4gICAgICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLmNvbmNhdChbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpc0N1c3RvbURpc2FwcGVhcmluZ01lc3NhZ2VWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgID8gdW5pdmVyc2FsRXhwaXJlVGltZXJcbiAgICAgICAgICAgICAgICAgICAgICA6IC0xLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpc0N1c3RvbURpc2FwcGVhcmluZ01lc3NhZ2VWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgID8gZm9ybWF0RXhwaXJhdGlvblRpbWVyKGkxOG4sIHVuaXZlcnNhbEV4cGlyZVRpbWVyKVxuICAgICAgICAgICAgICAgICAgICAgIDogaTE4bignc2VsZWN0ZWRDdXN0b21EaXNhcHBlYXJpbmdUaW1lT3B0aW9uJyksXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0pfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt1bml2ZXJzYWxFeHBpcmVUaW1lcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1NldHRpbmdzUm93PlxuICAgICAgICA8U2V0dGluZ3NSb3c+XG4gICAgICAgICAgPENvbnRyb2xcbiAgICAgICAgICAgIGxlZnQ9e1xuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXY+e2kxOG4oJ2NsZWFyRGF0YUhlYWRlcicpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2Rlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICB7aTE4bignY2xlYXJEYXRhRXhwbGFuYXRpb24nKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByaWdodD17XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3JpZ2h0LWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbmZpcm1EZWxldGUodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeURlc3RydWN0aXZlfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdjbGVhckRhdGFCdXR0b24nKX1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TZXR0aW5nc1Jvdz5cbiAgICAgICAge2NvbmZpcm1EZWxldGUgPyAoXG4gICAgICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBkb0RlbGV0ZUFsbERhdGEsXG4gICAgICAgICAgICAgICAgc3R5bGU6ICduZWdhdGl2ZScsXG4gICAgICAgICAgICAgICAgdGV4dDogaTE4bignY2xlYXJEYXRhQnV0dG9uJyksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0Q29uZmlybURlbGV0ZShmYWxzZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdGl0bGU9e2kxOG4oJ2RlbGV0ZUFsbERhdGFIZWFkZXInKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignZGVsZXRlQWxsRGF0YUJvZHknKX1cbiAgICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8Lz5cbiAgICApO1xuICB9IGVsc2UgaWYgKHBhZ2UgPT09IFBhZ2UuQ2hhdENvbG9yKSB7XG4gICAgc2V0dGluZ3MgPSAoXG4gICAgICA8PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX190aXRsZVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2dvQmFjaycpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2JhY2staWNvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKFBhZ2UuQXBwZWFyYW5jZSl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3RpdGxlLS1oZWFkZXJcIj5cbiAgICAgICAgICAgIHtpMThuKCdDaGF0Q29sb3JQaWNrZXJfX21lbnUtdGl0bGUnKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDaGF0Q29sb3JQaWNrZXJcbiAgICAgICAgICBjdXN0b21Db2xvcnM9e2N1c3RvbUNvbG9yc31cbiAgICAgICAgICBnZXRDb252ZXJzYXRpb25zV2l0aEN1c3RvbUNvbG9yPXtnZXRDb252ZXJzYXRpb25zV2l0aEN1c3RvbUNvbG9yfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNHbG9iYWxcbiAgICAgICAgICBzZWxlY3RlZENvbG9yPXtkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IuY29sb3J9XG4gICAgICAgICAgc2VsZWN0ZWRDdXN0b21Db2xvcj17ZGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yLmN1c3RvbUNvbG9yRGF0YSB8fCB7fX1cbiAgICAgICAgICAvLyBhY3Rpb25zXG4gICAgICAgICAgYWRkQ3VzdG9tQ29sb3I9e2FkZEN1c3RvbUNvbG9yfVxuICAgICAgICAgIGNvbG9yU2VsZWN0ZWQ9e25vb3B9XG4gICAgICAgICAgZWRpdEN1c3RvbUNvbG9yPXtlZGl0Q3VzdG9tQ29sb3J9XG4gICAgICAgICAgcmVtb3ZlQ3VzdG9tQ29sb3I9e3JlbW92ZUN1c3RvbUNvbG9yfVxuICAgICAgICAgIHJlbW92ZUN1c3RvbUNvbG9yT25Db252ZXJzYXRpb25zPXtyZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9uc31cbiAgICAgICAgICByZXNldEFsbENoYXRDb2xvcnM9e3Jlc2V0QWxsQ2hhdENvbG9yc31cbiAgICAgICAgICByZXNldERlZmF1bHRDaGF0Q29sb3I9e3Jlc2V0RGVmYXVsdENoYXRDb2xvcn1cbiAgICAgICAgICBzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3I9e3NldEdsb2JhbERlZmF1bHRDb252ZXJzYXRpb25Db2xvcn1cbiAgICAgICAgLz5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxUaXRsZUJhckNvbnRhaW5lclxuICAgICAgcGxhdGZvcm09e3BsYXRmb3JtfVxuICAgICAgaXNXaW5kb3dzMTE9e2lzV2luZG93czExfVxuICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgZXhlY3V0ZU1lbnVSb2xlPXtleGVjdXRlTWVudVJvbGV9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19wYWdlLXNlbGVjdG9yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICBQcmVmZXJlbmNlc19fYnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAnUHJlZmVyZW5jZXNfX2J1dHRvbi0tZ2VuZXJhbCc6IHRydWUsXG4gICAgICAgICAgICAgICdQcmVmZXJlbmNlc19fYnV0dG9uLS1zZWxlY3RlZCc6IHBhZ2UgPT09IFBhZ2UuR2VuZXJhbCxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShQYWdlLkdlbmVyYWwpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdQcmVmZXJlbmNlc19fYnV0dG9uLS1nZW5lcmFsJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICBQcmVmZXJlbmNlc19fYnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAnUHJlZmVyZW5jZXNfX2J1dHRvbi0tYXBwZWFyYW5jZSc6IHRydWUsXG4gICAgICAgICAgICAgICdQcmVmZXJlbmNlc19fYnV0dG9uLS1zZWxlY3RlZCc6XG4gICAgICAgICAgICAgICAgcGFnZSA9PT0gUGFnZS5BcHBlYXJhbmNlIHx8IHBhZ2UgPT09IFBhZ2UuQ2hhdENvbG9yLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKFBhZ2UuQXBwZWFyYW5jZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzX19idXR0b24tLWFwcGVhcmFuY2UnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgIFByZWZlcmVuY2VzX19idXR0b246IHRydWUsXG4gICAgICAgICAgICAgICdQcmVmZXJlbmNlc19fYnV0dG9uLS1jaGF0cyc6IHRydWUsXG4gICAgICAgICAgICAgICdQcmVmZXJlbmNlc19fYnV0dG9uLS1zZWxlY3RlZCc6IHBhZ2UgPT09IFBhZ2UuQ2hhdHMsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoUGFnZS5DaGF0cyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ1ByZWZlcmVuY2VzX19idXR0b24tLWNoYXRzJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICBQcmVmZXJlbmNlc19fYnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAnUHJlZmVyZW5jZXNfX2J1dHRvbi0tY2FsbHMnOiB0cnVlLFxuICAgICAgICAgICAgICAnUHJlZmVyZW5jZXNfX2J1dHRvbi0tc2VsZWN0ZWQnOiBwYWdlID09PSBQYWdlLkNhbGxzLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKFBhZ2UuQ2FsbHMpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdQcmVmZXJlbmNlc19fYnV0dG9uLS1jYWxscycpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgUHJlZmVyZW5jZXNfX2J1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgJ1ByZWZlcmVuY2VzX19idXR0b24tLW5vdGlmaWNhdGlvbnMnOiB0cnVlLFxuICAgICAgICAgICAgICAnUHJlZmVyZW5jZXNfX2J1dHRvbi0tc2VsZWN0ZWQnOiBwYWdlID09PSBQYWdlLk5vdGlmaWNhdGlvbnMsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoUGFnZS5Ob3RpZmljYXRpb25zKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignUHJlZmVyZW5jZXNfX2J1dHRvbi0tbm90aWZpY2F0aW9ucycpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgUHJlZmVyZW5jZXNfX2J1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgJ1ByZWZlcmVuY2VzX19idXR0b24tLXByaXZhY3knOiB0cnVlLFxuICAgICAgICAgICAgICAnUHJlZmVyZW5jZXNfX2J1dHRvbi0tc2VsZWN0ZWQnOiBwYWdlID09PSBQYWdlLlByaXZhY3ksXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoUGFnZS5Qcml2YWN5KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignUHJlZmVyZW5jZXNfX2J1dHRvbi0tcHJpdmFjeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fc2V0dGluZ3MtcGFuZVwiPntzZXR0aW5nc308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvVGl0bGVCYXJDb250YWluZXI+XG4gICk7XG59O1xuXG5jb25zdCBTZXR0aW5nc1JvdyA9ICh7XG4gIGNoaWxkcmVuLFxuICB0aXRsZSxcbn06IHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgdGl0bGU/OiBzdHJpbmc7XG59KTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX3NldHRpbmdzLXJvd1wiPlxuICAgICAge3RpdGxlICYmIDxoMyBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fcGFkZGluZ1wiPnt0aXRsZX08L2gzPn1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IENvbnRyb2wgPSAoe1xuICBsZWZ0LFxuICBvbkNsaWNrLFxuICByaWdodCxcbn06IHtcbiAgbGVmdDogUmVhY3ROb2RlO1xuICBvbkNsaWNrPzogKCkgPT4gdW5rbm93bjtcbiAgcmlnaHQ6IFJlYWN0Tm9kZTtcbn0pOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJlZmVyZW5jZXNfX2NvbnRyb2wtLWtleVwiPntsZWZ0fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY29udHJvbC0tdmFsdWVcIj57cmlnaHR9PC9kaXY+XG4gICAgPC8+XG4gICk7XG5cbiAgaWYgKG9uQ2xpY2spIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9XCJQcmVmZXJlbmNlc19fY29udHJvbCBQcmVmZXJlbmNlc19fY29udHJvbC0tY2xpY2thYmxlXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIlByZWZlcmVuY2VzX19jb250cm9sXCI+e2NvbnRlbnR9PC9kaXY+O1xufTtcblxuZnVuY3Rpb24gbG9jYWxpemVEZWZhdWx0KGkxOG46IExvY2FsaXplclR5cGUsIGRldmljZUxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZGV2aWNlTGFiZWwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdkZWZhdWx0JylcbiAgICA/IGRldmljZUxhYmVsLnJlcGxhY2UoXG4gICAgICAgIC9kZWZhdWx0L2ksXG4gICAgICAgIGkxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX3NlbGVjdC0tZGVmYXVsdCcpXG4gICAgICApXG4gICAgOiBkZXZpY2VMYWJlbDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBd0Q7QUFDeEQsb0JBQXFCO0FBQ3JCLHdCQUF1QjtBQVN2QixvQkFBc0M7QUFDdEMsNkJBQWdDO0FBQ2hDLHNCQUF5QjtBQUN6QixnQ0FBbUM7QUFPbkMsb0NBQXVDO0FBRXZDLHdDQUEyQztBQUMzQyxvQ0FBdUM7QUFDdkMsb0JBQXVCO0FBQ3ZCLHFCQUF3QjtBQUN4QiwrQkFBa0M7QUFFbEMsaUNBQW9DO0FBQ3BDLDZCQUlPO0FBQ1AsK0JBQWtDO0FBQ2xDLHlCQUE0QjtBQUM1QixzQkFBeUI7QUErR3pCLElBQUssT0FBTCxrQkFBSyxVQUFMO0FBRUUscUJBQVU7QUFDVix3QkFBYTtBQUNiLG1CQUFRO0FBQ1IsbUJBQVE7QUFDUiwyQkFBZ0I7QUFDaEIscUJBQVU7QUFHVix1QkFBWTtBQVZUO0FBQUE7QUFhTCxNQUFNLHVCQUF1QjtBQUFBLEVBQzNCO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQ0Y7QUFFTyxNQUFNLGNBQWMsd0JBQUM7QUFBQSxFQUMxQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNiO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLHVCQUF1QjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxN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
