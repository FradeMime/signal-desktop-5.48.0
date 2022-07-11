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
var ShortcutGuide_exports = {};
__export(ShortcutGuide_exports, {
  ShortcutGuide: () => ShortcutGuide
});
module.exports = __toCommonJS(ShortcutGuide_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_useRestoreFocus = require("../hooks/useRestoreFocus");
const NAVIGATION_SHORTCUTS = [
  {
    description: "Keyboard--navigate-by-section",
    keys: [["commandOrCtrl", "T"]]
  },
  {
    description: "Keyboard--previous-conversation",
    keys: [
      ["optionOrAlt", "\u2191"],
      ["ctrl", "shift", "tab"]
    ]
  },
  {
    description: "Keyboard--next-conversation",
    keys: [
      ["optionOrAlt", "\u2193"],
      ["ctrl", "tab"]
    ]
  },
  {
    description: "Keyboard--previous-unread-conversation",
    keys: [["optionOrAlt", "shift", "\u2191"]]
  },
  {
    description: "Keyboard--next-unread-conversation",
    keys: [["optionOrAlt", "shift", "\u2193"]]
  },
  {
    description: "Keyboard--conversation-by-index",
    keys: [["commandOrCtrl", "1 to 9"]]
  },
  {
    description: "Keyboard--preferences",
    keys: [["commandOrCtrl", ","]]
  },
  {
    description: "Keyboard--open-conversation-menu",
    keys: [["commandOrCtrl", "shift", "L"]]
  },
  {
    description: "Keyboard--new-conversation",
    keys: [["commandOrCtrl", "N"]]
  },
  {
    description: "Keyboard--search",
    keys: [["commandOrCtrl", "F"]]
  },
  {
    description: "Keyboard--search-in-conversation",
    keys: [["commandOrCtrl", "shift", "F"]]
  },
  {
    description: "Keyboard--focus-composer",
    keys: [["commandOrCtrl", "shift", "T"]]
  },
  {
    description: "Keyboard--open-all-media-view",
    keys: [["commandOrCtrl", "shift", "M"]]
  },
  {
    description: "Keyboard--open-emoji-chooser",
    keys: [["commandOrCtrl", "shift", "J"]]
  },
  {
    description: "Keyboard--open-sticker-chooser",
    keys: [["commandOrCtrl", "shift", "S"]]
  },
  {
    description: "Keyboard--begin-recording-voice-note",
    keys: [["commandOrCtrl", "shift", "V"]]
  },
  {
    description: "Keyboard--archive-conversation",
    keys: [["commandOrCtrl", "shift", "A"]]
  },
  {
    description: "Keyboard--unarchive-conversation",
    keys: [["commandOrCtrl", "shift", "U"]]
  },
  {
    description: "Keyboard--scroll-to-top",
    keys: [["commandOrCtrl", "\u2191"]]
  },
  {
    description: "Keyboard--scroll-to-bottom",
    keys: [["commandOrCtrl", "\u2193"]]
  },
  {
    description: "Keyboard--close-curent-conversation",
    keys: [["commandOrCtrl", "shift", "C"]]
  }
];
const MESSAGE_SHORTCUTS = [
  {
    description: "Keyboard--default-message-action",
    keys: [["enter"]]
  },
  {
    description: "Keyboard--view-details-for-selected-message",
    keys: [["commandOrCtrl", "D"]]
  },
  {
    description: "Keyboard--toggle-reply",
    keys: [["commandOrCtrl", "shift", "R"]]
  },
  {
    description: "Keyboard--toggle-reaction-picker",
    keys: [["commandOrCtrl", "shift", "E"]]
  },
  {
    description: "Keyboard--save-attachment",
    keys: [["commandOrCtrl", "S"]]
  },
  {
    description: "Keyboard--delete-message",
    keys: [["commandOrCtrl", "shift", "D"]]
  }
];
const COMPOSER_SHORTCUTS = [
  {
    description: "Keyboard--add-newline",
    keys: [["shift", "enter"]]
  },
  {
    description: "Keyboard--expand-composer",
    keys: [["commandOrCtrl", "shift", "X"]]
  },
  {
    description: "Keyboard--send-in-expanded-composer",
    keys: [["commandOrCtrl", "enter"]]
  },
  {
    description: "Keyboard--attach-file",
    keys: [["commandOrCtrl", "U"]]
  },
  {
    description: "Keyboard--remove-draft-link-preview",
    keys: [["commandOrCtrl", "P"]]
  },
  {
    description: "Keyboard--remove-draft-attachments",
    keys: [["commandOrCtrl", "shift", "P"]]
  }
];
const CALLING_SHORTCUTS = [
  {
    description: "Keyboard--toggle-audio",
    keys: [["shift", "M"]]
  },
  {
    description: "Keyboard--toggle-video",
    keys: [["shift", "V"]]
  },
  {
    description: "Keyboard--accept-video-call",
    keys: [["ctrlOrAlt", "shift", "V"]]
  },
  {
    description: "Keyboard--accept-audio-call",
    keys: [["ctrlOrAlt", "shift", "A"]]
  },
  {
    description: "Keyboard--decline-call",
    keys: [["ctrlOrAlt", "shift", "D"]]
  },
  {
    description: "Keyboard--start-audio-call",
    keys: [["ctrlOrAlt", "shift", "C"]]
  },
  {
    description: "Keyboard--start-video-call",
    keys: [["ctrlOrAlt", "shift", "Y"]]
  },
  {
    description: "Keyboard--hang-up",
    keys: [["ctrlOrAlt", "shift", "E"]]
  }
];
const ShortcutGuide = /* @__PURE__ */ __name((props) => {
  const { i18n, close, hasInstalledStickers, platform } = props;
  const isMacOS = platform === "darwin";
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__header"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__header-text"
  }, i18n("Keyboard--header")), /* @__PURE__ */ React.createElement("button", {
    "aria-label": i18n("close-popup"),
    className: "module-shortcut-guide__header-close",
    onClick: close,
    title: i18n("close-popup"),
    type: "button"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__scroll-container",
    ref: focusRef,
    tabIndex: -1
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-header"
  }, i18n("Keyboard--navigation-header")), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-list"
  }, NAVIGATION_SHORTCUTS.map((shortcut, index) => {
    if (!hasInstalledStickers && shortcut.description === "Keyboard--open-sticker-chooser") {
      return null;
    }
    return renderShortcut(shortcut, index, isMacOS, i18n);
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-header"
  }, i18n("Keyboard--messages-header")), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-list"
  }, MESSAGE_SHORTCUTS.map((shortcut, index) => renderShortcut(shortcut, index, isMacOS, i18n)))), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-header"
  }, i18n("Keyboard--composer-header")), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-list"
  }, COMPOSER_SHORTCUTS.map((shortcut, index) => renderShortcut(shortcut, index, isMacOS, i18n)))), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-header"
  }, i18n("Keyboard--calling-header")), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__section-list"
  }, CALLING_SHORTCUTS.map((shortcut, index) => renderShortcut(shortcut, index, isMacOS, i18n)))))));
}, "ShortcutGuide");
function renderShortcut(shortcut, index, isMacOS, i18n) {
  return /* @__PURE__ */ React.createElement("div", {
    key: index,
    className: "module-shortcut-guide__shortcut"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__shortcut__description"
  }, i18n(shortcut.description)), /* @__PURE__ */ React.createElement("div", {
    className: "module-shortcut-guide__shortcut__key-container"
  }, shortcut.keys.map((keys) => /* @__PURE__ */ React.createElement("div", {
    key: `${shortcut.description}--${keys.map((k) => k).join("-")}`,
    className: "module-shortcut-guide__shortcut__key-inner-container"
  }, keys.map((key) => {
    let label = key;
    let isSquare = true;
    if (key === "commandOrCtrl" && isMacOS) {
      label = "\u2318";
    }
    if (key === "commandOrCtrl" && !isMacOS) {
      label = i18n("Keyboard--Key--ctrl");
      isSquare = false;
    }
    if (key === "ctrlOrAlt" && isMacOS) {
      label = i18n("Keyboard--Key--ctrl");
      isSquare = false;
    }
    if (key === "ctrlOrAlt" && !isMacOS) {
      label = i18n("Keyboard--Key--alt");
      isSquare = false;
    }
    if (key === "optionOrAlt" && isMacOS) {
      label = i18n("Keyboard--Key--option");
      isSquare = false;
    }
    if (key === "optionOrAlt" && !isMacOS) {
      label = i18n("Keyboard--Key--alt");
      isSquare = false;
    }
    if (key === "ctrl") {
      label = i18n("Keyboard--Key--ctrl");
      isSquare = false;
    }
    if (key === "shift") {
      label = i18n("Keyboard--Key--shift");
      isSquare = false;
    }
    if (key === "enter") {
      label = i18n("Keyboard--Key--enter");
      isSquare = false;
    }
    if (key === "tab") {
      label = i18n("Keyboard--Key--tab");
      isSquare = false;
    }
    if (key === "1 to 9") {
      label = i18n("Keyboard--Key--one-to-nine-range");
      isSquare = false;
    }
    return /* @__PURE__ */ React.createElement("span", {
      key: `shortcut__key--${key}`,
      className: (0, import_classnames.default)("module-shortcut-guide__shortcut__key", isSquare ? "module-shortcut-guide__shortcut__key--square" : null)
    }, label);
  })))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShortcutGuide
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hvcnRjdXRHdWlkZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IHVzZVJlc3RvcmVGb2N1cyB9IGZyb20gJy4uL2hvb2tzL3VzZVJlc3RvcmVGb2N1cyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGhhc0luc3RhbGxlZFN0aWNrZXJzOiBib29sZWFuO1xuICBwbGF0Zm9ybTogc3RyaW5nO1xuICByZWFkb25seSBjbG9zZTogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbnR5cGUgS2V5VHlwZSA9XG4gIHwgJ2NvbW1hbmRPckN0cmwnXG4gIHwgJ2N0cmxPckFsdCdcbiAgfCAnb3B0aW9uT3JBbHQnXG4gIHwgJ3NoaWZ0J1xuICB8ICdlbnRlcidcbiAgfCAndGFiJ1xuICB8ICdjdHJsJ1xuICB8ICdcdTIxOTEnXG4gIHwgJ1x1MjE5MydcbiAgfCAnLCdcbiAgfCAnLidcbiAgfCAnQSdcbiAgfCAnQydcbiAgfCAnRCdcbiAgfCAnRSdcbiAgfCAnRidcbiAgfCAnSidcbiAgfCAnTCdcbiAgfCAnTSdcbiAgfCAnTidcbiAgfCAnUCdcbiAgfCAnUidcbiAgfCAnUydcbiAgfCAnVCdcbiAgfCAnVSdcbiAgfCAnVidcbiAgfCAnWCdcbiAgfCAnWSdcbiAgfCAnMSB0byA5JztcbnR5cGUgU2hvcnRjdXRUeXBlID0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBrZXlzOiBBcnJheTxBcnJheTxLZXlUeXBlPj47XG59O1xuXG5jb25zdCBOQVZJR0FUSU9OX1NIT1JUQ1VUUzogQXJyYXk8U2hvcnRjdXRUeXBlPiA9IFtcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLW5hdmlnYXRlLWJ5LXNlY3Rpb24nLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnVCddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXByZXZpb3VzLWNvbnZlcnNhdGlvbicsXG4gICAga2V5czogW1xuICAgICAgWydvcHRpb25PckFsdCcsICdcdTIxOTEnXSxcbiAgICAgIFsnY3RybCcsICdzaGlmdCcsICd0YWInXSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tbmV4dC1jb252ZXJzYXRpb24nLFxuICAgIGtleXM6IFtcbiAgICAgIFsnb3B0aW9uT3JBbHQnLCAnXHUyMTkzJ10sXG4gICAgICBbJ2N0cmwnLCAndGFiJ10sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXByZXZpb3VzLXVucmVhZC1jb252ZXJzYXRpb24nLFxuICAgIGtleXM6IFtbJ29wdGlvbk9yQWx0JywgJ3NoaWZ0JywgJ1x1MjE5MSddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLW5leHQtdW5yZWFkLWNvbnZlcnNhdGlvbicsXG4gICAga2V5czogW1snb3B0aW9uT3JBbHQnLCAnc2hpZnQnLCAnXHUyMTkzJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tY29udmVyc2F0aW9uLWJ5LWluZGV4JyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJzEgdG8gOSddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXByZWZlcmVuY2VzJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJywnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1vcGVuLWNvbnZlcnNhdGlvbi1tZW51JyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ3NoaWZ0JywgJ0wnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1uZXctY29udmVyc2F0aW9uJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ04nXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1zZWFyY2gnLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnRiddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXNlYXJjaC1pbi1jb252ZXJzYXRpb24nLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnRiddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLWZvY3VzLWNvbXBvc2VyJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ3NoaWZ0JywgJ1QnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1vcGVuLWFsbC1tZWRpYS12aWV3JyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ3NoaWZ0JywgJ00nXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1vcGVuLWVtb2ppLWNob29zZXInLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnSiddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLW9wZW4tc3RpY2tlci1jaG9vc2VyJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ3NoaWZ0JywgJ1MnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1iZWdpbi1yZWNvcmRpbmctdm9pY2Utbm90ZScsXG4gICAga2V5czogW1snY29tbWFuZE9yQ3RybCcsICdzaGlmdCcsICdWJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tYXJjaGl2ZS1jb252ZXJzYXRpb24nLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnQSddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXVuYXJjaGl2ZS1jb252ZXJzYXRpb24nLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnVSddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXNjcm9sbC10by10b3AnLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnXHUyMTkxJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tc2Nyb2xsLXRvLWJvdHRvbScsXG4gICAga2V5czogW1snY29tbWFuZE9yQ3RybCcsICdcdTIxOTMnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1jbG9zZS1jdXJlbnQtY29udmVyc2F0aW9uJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ3NoaWZ0JywgJ0MnXV0sXG4gIH0sXG5dO1xuXG5jb25zdCBNRVNTQUdFX1NIT1JUQ1VUUzogQXJyYXk8U2hvcnRjdXRUeXBlPiA9IFtcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLWRlZmF1bHQtbWVzc2FnZS1hY3Rpb24nLFxuICAgIGtleXM6IFtbJ2VudGVyJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tdmlldy1kZXRhaWxzLWZvci1zZWxlY3RlZC1tZXNzYWdlJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ0QnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS10b2dnbGUtcmVwbHknLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnUiddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXRvZ2dsZS1yZWFjdGlvbi1waWNrZXInLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnRSddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXNhdmUtYXR0YWNobWVudCcsXG4gICAga2V5czogW1snY29tbWFuZE9yQ3RybCcsICdTJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tZGVsZXRlLW1lc3NhZ2UnLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnRCddXSxcbiAgfSxcbl07XG5cbmNvbnN0IENPTVBPU0VSX1NIT1JUQ1VUUzogQXJyYXk8U2hvcnRjdXRUeXBlPiA9IFtcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLWFkZC1uZXdsaW5lJyxcbiAgICBrZXlzOiBbWydzaGlmdCcsICdlbnRlciddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLWV4cGFuZC1jb21wb3NlcicsXG4gICAga2V5czogW1snY29tbWFuZE9yQ3RybCcsICdzaGlmdCcsICdYJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tc2VuZC1pbi1leHBhbmRlZC1jb21wb3NlcicsXG4gICAga2V5czogW1snY29tbWFuZE9yQ3RybCcsICdlbnRlciddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLWF0dGFjaC1maWxlJyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ1UnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1yZW1vdmUtZHJhZnQtbGluay1wcmV2aWV3JyxcbiAgICBrZXlzOiBbWydjb21tYW5kT3JDdHJsJywgJ1AnXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1yZW1vdmUtZHJhZnQtYXR0YWNobWVudHMnLFxuICAgIGtleXM6IFtbJ2NvbW1hbmRPckN0cmwnLCAnc2hpZnQnLCAnUCddXSxcbiAgfSxcbl07XG5cbmNvbnN0IENBTExJTkdfU0hPUlRDVVRTOiBBcnJheTxTaG9ydGN1dFR5cGU+ID0gW1xuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tdG9nZ2xlLWF1ZGlvJyxcbiAgICBrZXlzOiBbWydzaGlmdCcsICdNJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tdG9nZ2xlLXZpZGVvJyxcbiAgICBrZXlzOiBbWydzaGlmdCcsICdWJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tYWNjZXB0LXZpZGVvLWNhbGwnLFxuICAgIGtleXM6IFtbJ2N0cmxPckFsdCcsICdzaGlmdCcsICdWJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tYWNjZXB0LWF1ZGlvLWNhbGwnLFxuICAgIGtleXM6IFtbJ2N0cmxPckFsdCcsICdzaGlmdCcsICdBJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tZGVjbGluZS1jYWxsJyxcbiAgICBrZXlzOiBbWydjdHJsT3JBbHQnLCAnc2hpZnQnLCAnRCddXSxcbiAgfSxcbiAge1xuICAgIGRlc2NyaXB0aW9uOiAnS2V5Ym9hcmQtLXN0YXJ0LWF1ZGlvLWNhbGwnLFxuICAgIGtleXM6IFtbJ2N0cmxPckFsdCcsICdzaGlmdCcsICdDJ11dLFxuICB9LFxuICB7XG4gICAgZGVzY3JpcHRpb246ICdLZXlib2FyZC0tc3RhcnQtdmlkZW8tY2FsbCcsXG4gICAga2V5czogW1snY3RybE9yQWx0JywgJ3NoaWZ0JywgJ1knXV0sXG4gIH0sXG4gIHtcbiAgICBkZXNjcmlwdGlvbjogJ0tleWJvYXJkLS1oYW5nLXVwJyxcbiAgICBrZXlzOiBbWydjdHJsT3JBbHQnLCAnc2hpZnQnLCAnRSddXSxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBTaG9ydGN1dEd1aWRlID0gKHByb3BzOiBQcm9wcyk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgeyBpMThuLCBjbG9zZSwgaGFzSW5zdGFsbGVkU3RpY2tlcnMsIHBsYXRmb3JtIH0gPSBwcm9wcztcbiAgY29uc3QgaXNNYWNPUyA9IHBsYXRmb3JtID09PSAnZGFyd2luJztcblxuICAvLyBSZXN0b3JlIGZvY3VzIG9uIHRlYXJkb3duXG4gIGNvbnN0IFtmb2N1c1JlZl0gPSB1c2VSZXN0b3JlRm9jdXMoKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXNob3J0Y3V0LWd1aWRlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9faGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXNob3J0Y3V0LWd1aWRlX19oZWFkZXItdGV4dFwiPlxuICAgICAgICAgIHtpMThuKCdLZXlib2FyZC0taGVhZGVyJyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2xvc2UtcG9wdXAnKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX2hlYWRlci1jbG9zZVwiXG4gICAgICAgICAgb25DbGljaz17Y2xvc2V9XG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ2Nsb3NlLXBvcHVwJyl9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLXNob3J0Y3V0LWd1aWRlX19zY3JvbGwtY29udGFpbmVyXCJcbiAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2VjdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2VjdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3NlY3Rpb24taGVhZGVyXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdLZXlib2FyZC0tbmF2aWdhdGlvbi1oZWFkZXInKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3NlY3Rpb24tbGlzdFwiPlxuICAgICAgICAgICAgICB7TkFWSUdBVElPTl9TSE9SVENVVFMubWFwKChzaG9ydGN1dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhaGFzSW5zdGFsbGVkU3RpY2tlcnMgJiZcbiAgICAgICAgICAgICAgICAgIHNob3J0Y3V0LmRlc2NyaXB0aW9uID09PSAnS2V5Ym9hcmQtLW9wZW4tc3RpY2tlci1jaG9vc2VyJ1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlclNob3J0Y3V0KHNob3J0Y3V0LCBpbmRleCwgaXNNYWNPUywgaTE4bik7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3NlY3Rpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXNob3J0Y3V0LWd1aWRlX19zZWN0aW9uLWhlYWRlclwiPlxuICAgICAgICAgICAgICB7aTE4bignS2V5Ym9hcmQtLW1lc3NhZ2VzLWhlYWRlcicpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2VjdGlvbi1saXN0XCI+XG4gICAgICAgICAgICAgIHtNRVNTQUdFX1NIT1JUQ1VUUy5tYXAoKHNob3J0Y3V0LCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICByZW5kZXJTaG9ydGN1dChzaG9ydGN1dCwgaW5kZXgsIGlzTWFjT1MsIGkxOG4pXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2VjdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3NlY3Rpb24taGVhZGVyXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdLZXlib2FyZC0tY29tcG9zZXItaGVhZGVyJyl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXNob3J0Y3V0LWd1aWRlX19zZWN0aW9uLWxpc3RcIj5cbiAgICAgICAgICAgICAge0NPTVBPU0VSX1NIT1JUQ1VUUy5tYXAoKHNob3J0Y3V0LCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICByZW5kZXJTaG9ydGN1dChzaG9ydGN1dCwgaW5kZXgsIGlzTWFjT1MsIGkxOG4pXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2VjdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3NlY3Rpb24taGVhZGVyXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdLZXlib2FyZC0tY2FsbGluZy1oZWFkZXInKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3NlY3Rpb24tbGlzdFwiPlxuICAgICAgICAgICAgICB7Q0FMTElOR19TSE9SVENVVFMubWFwKChzaG9ydGN1dCwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgcmVuZGVyU2hvcnRjdXQoc2hvcnRjdXQsIGluZGV4LCBpc01hY09TLCBpMThuKVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5mdW5jdGlvbiByZW5kZXJTaG9ydGN1dChcbiAgc2hvcnRjdXQ6IFNob3J0Y3V0VHlwZSxcbiAgaW5kZXg6IG51bWJlcixcbiAgaXNNYWNPUzogYm9vbGVhbixcbiAgaTE4bjogTG9jYWxpemVyVHlwZVxuKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3Nob3J0Y3V0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2hvcnRjdXRfX2Rlc2NyaXB0aW9uXCI+XG4gICAgICAgIHtpMThuKHNob3J0Y3V0LmRlc2NyaXB0aW9uKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc2hvcnRjdXQtZ3VpZGVfX3Nob3J0Y3V0X19rZXktY29udGFpbmVyXCI+XG4gICAgICAgIHtzaG9ydGN1dC5rZXlzLm1hcChrZXlzID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2Ake3Nob3J0Y3V0LmRlc2NyaXB0aW9ufS0tJHtrZXlzLm1hcChrID0+IGspLmpvaW4oJy0nKX1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLXNob3J0Y3V0LWd1aWRlX19zaG9ydGN1dF9fa2V5LWlubmVyLWNvbnRhaW5lclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2tleXMubWFwKGtleSA9PiB7XG4gICAgICAgICAgICAgIGxldCBsYWJlbDogc3RyaW5nID0ga2V5O1xuICAgICAgICAgICAgICBsZXQgaXNTcXVhcmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGlmIChrZXkgPT09ICdjb21tYW5kT3JDdHJsJyAmJiBpc01hY09TKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSAnXHUyMzE4JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnY29tbWFuZE9yQ3RybCcgJiYgIWlzTWFjT1MpIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGkxOG4oJ0tleWJvYXJkLS1LZXktLWN0cmwnKTtcbiAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChrZXkgPT09ICdjdHJsT3JBbHQnICYmIGlzTWFjT1MpIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGkxOG4oJ0tleWJvYXJkLS1LZXktLWN0cmwnKTtcbiAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChrZXkgPT09ICdjdHJsT3JBbHQnICYmICFpc01hY09TKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpMThuKCdLZXlib2FyZC0tS2V5LS1hbHQnKTtcbiAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChrZXkgPT09ICdvcHRpb25PckFsdCcgJiYgaXNNYWNPUykge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaTE4bignS2V5Ym9hcmQtLUtleS0tb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgaXNTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnb3B0aW9uT3JBbHQnICYmICFpc01hY09TKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpMThuKCdLZXlib2FyZC0tS2V5LS1hbHQnKTtcbiAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChrZXkgPT09ICdjdHJsJykge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaTE4bignS2V5Ym9hcmQtLUtleS0tY3RybCcpO1xuICAgICAgICAgICAgICAgIGlzU3F1YXJlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3NoaWZ0Jykge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaTE4bignS2V5Ym9hcmQtLUtleS0tc2hpZnQnKTtcbiAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGkxOG4oJ0tleWJvYXJkLS1LZXktLWVudGVyJyk7XG4gICAgICAgICAgICAgICAgaXNTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoa2V5ID09PSAndGFiJykge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaTE4bignS2V5Ym9hcmQtLUtleS0tdGFiJyk7XG4gICAgICAgICAgICAgICAgaXNTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnMSB0byA5Jykge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaTE4bignS2V5Ym9hcmQtLUtleS0tb25lLXRvLW5pbmUtcmFuZ2UnKTtcbiAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAga2V5PXtgc2hvcnRjdXRfX2tleS0tJHtrZXl9YH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgJ21vZHVsZS1zaG9ydGN1dC1ndWlkZV9fc2hvcnRjdXRfX2tleScsXG4gICAgICAgICAgICAgICAgICAgIGlzU3F1YXJlXG4gICAgICAgICAgICAgICAgICAgICAgPyAnbW9kdWxlLXNob3J0Y3V0LWd1aWRlX19zaG9ydGN1dF9fa2V5LS1zcXVhcmUnXG4gICAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix3QkFBdUI7QUFDdkIsNkJBQWdDO0FBNkNoQyxNQUFNLHVCQUE0QztBQUFBLEVBQ2hEO0FBQUEsSUFDRSxhQUFhO0FBQUEsSUFDYixNQUFNLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxhQUFhO0FBQUEsSUFDYixNQUFNO0FBQUEsTUFDSixDQUFDLGVBQWUsUUFBRztBQUFBLE1BQ25CLENBQUMsUUFBUSxTQUFTLEtBQUs7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFD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
