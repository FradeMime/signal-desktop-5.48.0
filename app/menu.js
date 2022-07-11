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
var menu_exports = {};
__export(menu_exports, {
  createTemplate: () => createTemplate
});
module.exports = __toCommonJS(menu_exports);
var import_lodash = require("lodash");
const createTemplate = /* @__PURE__ */ __name((options, messages) => {
  if (!(0, import_lodash.isString)(options.platform)) {
    throw new TypeError("`options.platform` must be a string");
  }
  const {
    isProduction,
    devTools,
    includeSetup,
    openContactUs,
    openForums,
    openJoinTheBeta,
    openReleaseNotes,
    openSupportPage,
    platform,
    setupAsNewDevice,
    setupAsStandalone,
    forceUpdate,
    showAbout,
    showDebugLog,
    showKeyboardShortcuts,
    showSettings,
    showStickerCreator
  } = options;
  const template = [
    {
      label: messages.mainMenuFile.message,
      submenu: [
        {
          label: messages.mainMenuCreateStickers.message,
          click: showStickerCreator
        },
        {
          label: messages.mainMenuSettings.message,
          accelerator: "CommandOrControl+,",
          click: showSettings
        },
        {
          type: "separator"
        },
        {
          role: "quit",
          label: messages.appMenuQuit.message
        }
      ]
    },
    {
      label: messages.mainMenuEdit.message,
      submenu: [
        {
          role: "undo",
          label: messages.editMenuUndo.message
        },
        {
          role: "redo",
          label: messages.editMenuRedo.message
        },
        {
          type: "separator"
        },
        {
          role: "cut",
          label: messages.editMenuCut.message
        },
        {
          role: "copy",
          label: messages.editMenuCopy.message
        },
        {
          role: "paste",
          label: messages.editMenuPaste.message
        },
        {
          role: "pasteAndMatchStyle",
          label: messages.editMenuPasteAndMatchStyle.message
        },
        {
          role: "delete",
          label: messages.editMenuDelete.message
        },
        {
          role: "selectAll",
          label: messages.editMenuSelectAll.message
        }
      ]
    },
    {
      label: messages.mainMenuView.message,
      submenu: [
        {
          role: "resetZoom",
          label: messages.viewMenuResetZoom.message
        },
        {
          accelerator: "CmdOrCtrl+=",
          role: "zoomIn",
          label: messages.viewMenuZoomIn.message
        },
        {
          role: "zoomOut",
          label: messages.viewMenuZoomOut.message
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen",
          label: messages.viewMenuToggleFullScreen.message
        },
        {
          type: "separator"
        },
        {
          label: messages.debugLog.message,
          click: showDebugLog
        },
        ...devTools ? [
          {
            type: "separator"
          },
          {
            role: "toggleDevTools",
            label: messages.viewMenuToggleDevTools.message
          }
        ] : [],
        ...devTools && platform !== "linux" ? [
          {
            label: messages.forceUpdate.message,
            click: forceUpdate
          }
        ] : []
      ]
    },
    {
      label: messages.mainMenuWindow.message,
      role: "window",
      submenu: [
        {
          role: "minimize",
          label: messages.windowMenuMinimize.message
        }
      ]
    },
    {
      label: messages.mainMenuHelp.message,
      role: "help",
      submenu: [
        {
          label: messages.helpMenuShowKeyboardShortcuts.message,
          accelerator: "CmdOrCtrl+/",
          click: showKeyboardShortcuts
        },
        {
          type: "separator"
        },
        {
          label: messages.contactUs.message,
          click: openContactUs
        },
        {
          label: messages.goToReleaseNotes.message,
          click: openReleaseNotes
        },
        {
          label: messages.goToForums.message,
          click: openForums
        },
        {
          label: messages.goToSupportPage.message,
          click: openSupportPage
        },
        ...isProduction ? [
          {
            label: messages.joinTheBeta.message,
            click: openJoinTheBeta
          }
        ] : [],
        {
          type: "separator"
        },
        {
          label: messages.aboutSignalDesktop.message,
          click: showAbout
        }
      ]
    }
  ];
  if (includeSetup) {
    const fileMenu = template[0];
    if (Array.isArray(fileMenu.submenu)) {
      if (options.development) {
        fileMenu.submenu.unshift({
          label: messages.menuSetupAsStandalone.message,
          click: setupAsStandalone
        });
      }
      fileMenu.submenu.unshift({
        type: "separator"
      });
      fileMenu.submenu.unshift({
        label: messages.menuSetupAsNewDevice.message,
        click: setupAsNewDevice
      });
    } else {
      throw new Error("createTemplate: fileMenu.submenu was not an array!");
    }
  }
  if (platform === "darwin") {
    return updateForMac(template, messages, options);
  }
  return template;
}, "createTemplate");
function updateForMac(template, messages, options) {
  const { showAbout, showSettings, showWindow } = options;
  const aboutMenu = template[4];
  if (Array.isArray(aboutMenu.submenu)) {
    aboutMenu.submenu.pop();
    aboutMenu.submenu.pop();
  } else {
    throw new Error("updateForMac: help.submenu was not an array!");
  }
  const fileMenu = template[0];
  if (Array.isArray(fileMenu.submenu)) {
    fileMenu.submenu.pop();
    fileMenu.submenu.pop();
    fileMenu.submenu.pop();
    fileMenu.submenu.push({
      type: "separator"
    }, {
      label: messages.windowMenuClose.message,
      accelerator: "CmdOrCtrl+W",
      role: "close"
    });
  } else {
    throw new Error("updateForMac: fileMenu.submenu was not an array!");
  }
  template.unshift({
    label: messages.signalDesktop.message,
    submenu: [
      {
        label: messages.aboutSignalDesktop.message,
        click: showAbout
      },
      {
        type: "separator"
      },
      {
        label: messages.mainMenuSettings.message,
        accelerator: "CommandOrControl+,",
        click: showSettings
      },
      {
        type: "separator"
      },
      {
        label: messages.appMenuServices.message,
        role: "services"
      },
      {
        type: "separator"
      },
      {
        label: messages.appMenuHide.message,
        role: "hide"
      },
      {
        label: messages.appMenuHideOthers.message,
        role: "hideOthers"
      },
      {
        label: messages.appMenuUnhide.message,
        role: "unhide"
      },
      {
        type: "separator"
      },
      {
        label: messages.appMenuQuit.message,
        role: "quit"
      }
    ]
  });
  const editMenu = template[2];
  if (Array.isArray(editMenu.submenu)) {
    editMenu.submenu.push({
      type: "separator"
    }, {
      label: messages.speech.message,
      submenu: [
        {
          role: "startSpeaking",
          label: messages.editMenuStartSpeaking.message
        },
        {
          role: "stopSpeaking",
          label: messages.editMenuStopSpeaking.message
        }
      ]
    });
  } else {
    throw new Error("updateForMac: edit.submenu was not an array!");
  }
  template[4].submenu = [
    {
      label: messages.windowMenuMinimize.message,
      accelerator: "CmdOrCtrl+M",
      role: "minimize"
    },
    {
      label: messages.windowMenuZoom.message,
      role: "zoom"
    },
    {
      label: messages.show.message,
      accelerator: "CmdOrCtrl+Shift+0",
      click: showWindow
    },
    {
      type: "separator"
    },
    {
      role: "front",
      label: messages.windowMenuBringAllToFront.message
    }
  ];
  return template;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTemplate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVudS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGVNZXNzYWdlc1R5cGUgfSBmcm9tICcuLi90cy90eXBlcy9JMThOJztcbmltcG9ydCB0eXBlIHtcbiAgTWVudUxpc3RUeXBlLFxuICBNZW51T3B0aW9uc1R5cGUsXG4gIE1lbnVBY3Rpb25zVHlwZSxcbn0gZnJvbSAnLi4vdHMvdHlwZXMvbWVudSc7XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVRlbXBsYXRlT3B0aW9uc1R5cGUgPSBNZW51T3B0aW9uc1R5cGUgJiBNZW51QWN0aW9uc1R5cGU7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUZW1wbGF0ZSA9IChcbiAgb3B0aW9uczogQ3JlYXRlVGVtcGxhdGVPcHRpb25zVHlwZSxcbiAgbWVzc2FnZXM6IExvY2FsZU1lc3NhZ2VzVHlwZVxuKTogTWVudUxpc3RUeXBlID0+IHtcbiAgaWYgKCFpc1N0cmluZyhvcHRpb25zLnBsYXRmb3JtKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2BvcHRpb25zLnBsYXRmb3JtYCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCB7XG4gICAgaXNQcm9kdWN0aW9uLFxuICAgIGRldlRvb2xzLFxuICAgIGluY2x1ZGVTZXR1cCxcbiAgICBvcGVuQ29udGFjdFVzLFxuICAgIG9wZW5Gb3J1bXMsXG4gICAgb3BlbkpvaW5UaGVCZXRhLFxuICAgIG9wZW5SZWxlYXNlTm90ZXMsXG4gICAgb3BlblN1cHBvcnRQYWdlLFxuICAgIHBsYXRmb3JtLFxuICAgIHNldHVwQXNOZXdEZXZpY2UsXG4gICAgc2V0dXBBc1N0YW5kYWxvbmUsXG4gICAgZm9yY2VVcGRhdGUsXG4gICAgc2hvd0Fib3V0LFxuICAgIHNob3dEZWJ1Z0xvZyxcbiAgICBzaG93S2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgc2hvd1NldHRpbmdzLFxuICAgIHNob3dTdGlja2VyQ3JlYXRvcixcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgdGVtcGxhdGU6IE1lbnVMaXN0VHlwZSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogbWVzc2FnZXMubWFpbk1lbnVGaWxlLm1lc3NhZ2UsXG4gICAgICBzdWJtZW51OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMubWFpbk1lbnVDcmVhdGVTdGlja2Vycy5tZXNzYWdlLFxuICAgICAgICAgIGNsaWNrOiBzaG93U3RpY2tlckNyZWF0b3IsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMubWFpbk1lbnVTZXR0aW5ncy5tZXNzYWdlLFxuICAgICAgICAgIGFjY2VsZXJhdG9yOiAnQ29tbWFuZE9yQ29udHJvbCssJyxcbiAgICAgICAgICBjbGljazogc2hvd1NldHRpbmdzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3NlcGFyYXRvcicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiAncXVpdCcsXG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmFwcE1lbnVRdWl0Lm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6IG1lc3NhZ2VzLm1haW5NZW51RWRpdC5tZXNzYWdlLFxuICAgICAgc3VibWVudTogW1xuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ3VuZG8nLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudVVuZG8ubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdyZWRvJyxcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMuZWRpdE1lbnVSZWRvLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnc2VwYXJhdG9yJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdjdXQnLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudUN1dC5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ2NvcHknLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudUNvcHkubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdwYXN0ZScsXG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmVkaXRNZW51UGFzdGUubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdwYXN0ZUFuZE1hdGNoU3R5bGUnLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudVBhc3RlQW5kTWF0Y2hTdHlsZS5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ2RlbGV0ZScsXG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmVkaXRNZW51RGVsZXRlLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiAnc2VsZWN0QWxsJyxcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMuZWRpdE1lbnVTZWxlY3RBbGwubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogbWVzc2FnZXMubWFpbk1lbnVWaWV3Lm1lc3NhZ2UsXG4gICAgICBzdWJtZW51OiBbXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiAncmVzZXRab29tJyxcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMudmlld01lbnVSZXNldFpvb20ubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsKz0nLFxuICAgICAgICAgIHJvbGU6ICd6b29tSW4nLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy52aWV3TWVudVpvb21Jbi5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ3pvb21PdXQnLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy52aWV3TWVudVpvb21PdXQubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcm9sZTogJ3RvZ2dsZWZ1bGxzY3JlZW4nLFxuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy52aWV3TWVudVRvZ2dsZUZ1bGxTY3JlZW4ubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmRlYnVnTG9nLm1lc3NhZ2UsXG4gICAgICAgICAgY2xpY2s6IHNob3dEZWJ1Z0xvZyxcbiAgICAgICAgfSxcbiAgICAgICAgLi4uKGRldlRvb2xzXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2VwYXJhdG9yJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJvbGU6ICd0b2dnbGVEZXZUb29scycgYXMgY29uc3QsXG4gICAgICAgICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLnZpZXdNZW51VG9nZ2xlRGV2VG9vbHMubWVzc2FnZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IFtdKSxcbiAgICAgICAgLi4uKGRldlRvb2xzICYmIHBsYXRmb3JtICE9PSAnbGludXgnXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogbWVzc2FnZXMuZm9yY2VVcGRhdGUubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBjbGljazogZm9yY2VVcGRhdGUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBbXSksXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6IG1lc3NhZ2VzLm1haW5NZW51V2luZG93Lm1lc3NhZ2UsXG4gICAgICByb2xlOiAnd2luZG93JyxcbiAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdtaW5pbWl6ZScsXG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLndpbmRvd01lbnVNaW5pbWl6ZS5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiBtZXNzYWdlcy5tYWluTWVudUhlbHAubWVzc2FnZSxcbiAgICAgIHJvbGU6ICdoZWxwJyxcbiAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5oZWxwTWVudVNob3dLZXlib2FyZFNob3J0Y3V0cy5tZXNzYWdlLFxuICAgICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsKy8nLFxuICAgICAgICAgIGNsaWNrOiBzaG93S2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnc2VwYXJhdG9yJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5jb250YWN0VXMubWVzc2FnZSxcbiAgICAgICAgICBjbGljazogb3BlbkNvbnRhY3RVcyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5nb1RvUmVsZWFzZU5vdGVzLm1lc3NhZ2UsXG4gICAgICAgICAgY2xpY2s6IG9wZW5SZWxlYXNlTm90ZXMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMuZ29Ub0ZvcnVtcy5tZXNzYWdlLFxuICAgICAgICAgIGNsaWNrOiBvcGVuRm9ydW1zLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmdvVG9TdXBwb3J0UGFnZS5tZXNzYWdlLFxuICAgICAgICAgIGNsaWNrOiBvcGVuU3VwcG9ydFBhZ2UsXG4gICAgICAgIH0sXG4gICAgICAgIC4uLihpc1Byb2R1Y3Rpb25cbiAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5qb2luVGhlQmV0YS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIGNsaWNrOiBvcGVuSm9pblRoZUJldGEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBbXSksXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnc2VwYXJhdG9yJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5hYm91dFNpZ25hbERlc2t0b3AubWVzc2FnZSxcbiAgICAgICAgICBjbGljazogc2hvd0Fib3V0LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xuXG4gIGlmIChpbmNsdWRlU2V0dXApIHtcbiAgICBjb25zdCBmaWxlTWVudSA9IHRlbXBsYXRlWzBdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZU1lbnUuc3VibWVudSkpIHtcbiAgICAgIC8vIFRoZXNlIGFyZSBpbiByZXZlcnNlIG9yZGVyLCBzaW5jZSB3ZSdyZSBwcmVwZW5kaW5nIHRoZW0gb25lIGF0IGEgdGltZVxuICAgICAgaWYgKG9wdGlvbnMuZGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgZmlsZU1lbnUuc3VibWVudS51bnNoaWZ0KHtcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMubWVudVNldHVwQXNTdGFuZGFsb25lLm1lc3NhZ2UsXG4gICAgICAgICAgY2xpY2s6IHNldHVwQXNTdGFuZGFsb25lLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZmlsZU1lbnUuc3VibWVudS51bnNoaWZ0KHtcbiAgICAgICAgdHlwZTogJ3NlcGFyYXRvcicsXG4gICAgICB9KTtcbiAgICAgIGZpbGVNZW51LnN1Ym1lbnUudW5zaGlmdCh7XG4gICAgICAgIGxhYmVsOiBtZXNzYWdlcy5tZW51U2V0dXBBc05ld0RldmljZS5tZXNzYWdlLFxuICAgICAgICBjbGljazogc2V0dXBBc05ld0RldmljZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyZWF0ZVRlbXBsYXRlOiBmaWxlTWVudS5zdWJtZW51IHdhcyBub3QgYW4gYXJyYXkhJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgIHJldHVybiB1cGRhdGVGb3JNYWModGVtcGxhdGUsIG1lc3NhZ2VzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wbGF0ZTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZUZvck1hYyhcbiAgdGVtcGxhdGU6IE1lbnVMaXN0VHlwZSxcbiAgbWVzc2FnZXM6IExvY2FsZU1lc3NhZ2VzVHlwZSxcbiAgb3B0aW9uczogQ3JlYXRlVGVtcGxhdGVPcHRpb25zVHlwZVxuKTogTWVudUxpc3RUeXBlIHtcbiAgY29uc3QgeyBzaG93QWJvdXQsIHNob3dTZXR0aW5ncywgc2hvd1dpbmRvdyB9ID0gb3B0aW9ucztcblxuICAvLyBSZW1vdmUgQWJvdXQgaXRlbSBhbmQgc2VwYXJhdG9yIGZyb20gSGVscCBtZW51LCBzaW5jZSB0aGV5J3JlIGluIHRoZSBhcHAgbWVudVxuICBjb25zdCBhYm91dE1lbnUgPSB0ZW1wbGF0ZVs0XTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYWJvdXRNZW51LnN1Ym1lbnUpKSB7XG4gICAgYWJvdXRNZW51LnN1Ym1lbnUucG9wKCk7XG4gICAgYWJvdXRNZW51LnN1Ym1lbnUucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1cGRhdGVGb3JNYWM6IGhlbHAuc3VibWVudSB3YXMgbm90IGFuIGFycmF5IScpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIHByZWZlcmVuY2VzLCBzZXBhcmF0b3IsIGFuZCBxdWl0IGZyb20gdGhlIEZpbGUgbWVudSwgc2luY2UgdGhleSdyZVxuICAvLyBpbiB0aGUgYXBwIG1lbnVcbiAgY29uc3QgZmlsZU1lbnUgPSB0ZW1wbGF0ZVswXTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZU1lbnUuc3VibWVudSkpIHtcbiAgICBmaWxlTWVudS5zdWJtZW51LnBvcCgpO1xuICAgIGZpbGVNZW51LnN1Ym1lbnUucG9wKCk7XG4gICAgZmlsZU1lbnUuc3VibWVudS5wb3AoKTtcbiAgICAvLyBBbmQgaW5zZXJ0IFwiY2xvc2VcIi5cbiAgICBmaWxlTWVudS5zdWJtZW51LnB1c2goXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLndpbmRvd01lbnVDbG9zZS5tZXNzYWdlLFxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtXJyxcbiAgICAgICAgcm9sZTogJ2Nsb3NlJyxcbiAgICAgIH1cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlRm9yTWFjOiBmaWxlTWVudS5zdWJtZW51IHdhcyBub3QgYW4gYXJyYXkhJyk7XG4gIH1cblxuICAvLyBBZGQgdGhlIE9TWC1zcGVjaWZpYyBTaWduYWwgRGVza3RvcCBtZW51IGF0IHRoZSBmYXIgbGVmdFxuICB0ZW1wbGF0ZS51bnNoaWZ0KHtcbiAgICBsYWJlbDogbWVzc2FnZXMuc2lnbmFsRGVza3RvcC5tZXNzYWdlLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmFib3V0U2lnbmFsRGVza3RvcC5tZXNzYWdlLFxuICAgICAgICBjbGljazogc2hvd0Fib3V0LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ3NlcGFyYXRvcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogbWVzc2FnZXMubWFpbk1lbnVTZXR0aW5ncy5tZXNzYWdlLFxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NvbW1hbmRPckNvbnRyb2wrLCcsXG4gICAgICAgIGNsaWNrOiBzaG93U2V0dGluZ3MsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiAnc2VwYXJhdG9yJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBtZXNzYWdlcy5hcHBNZW51U2VydmljZXMubWVzc2FnZSxcbiAgICAgICAgcm9sZTogJ3NlcnZpY2VzJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmFwcE1lbnVIaWRlLm1lc3NhZ2UsXG4gICAgICAgIHJvbGU6ICdoaWRlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBtZXNzYWdlcy5hcHBNZW51SGlkZU90aGVycy5tZXNzYWdlLFxuICAgICAgICByb2xlOiAnaGlkZU90aGVycycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogbWVzc2FnZXMuYXBwTWVudVVuaGlkZS5tZXNzYWdlLFxuICAgICAgICByb2xlOiAndW5oaWRlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmFwcE1lbnVRdWl0Lm1lc3NhZ2UsXG4gICAgICAgIHJvbGU6ICdxdWl0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG5cbiAgY29uc3QgZWRpdE1lbnUgPSB0ZW1wbGF0ZVsyXTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZWRpdE1lbnUuc3VibWVudSkpIHtcbiAgICBlZGl0TWVudS5zdWJtZW51LnB1c2goXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLnNwZWVjaC5tZXNzYWdlLFxuICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcm9sZTogJ3N0YXJ0U3BlYWtpbmcnLFxuICAgICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmVkaXRNZW51U3RhcnRTcGVha2luZy5tZXNzYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcm9sZTogJ3N0b3BTcGVha2luZycsXG4gICAgICAgICAgICBsYWJlbDogbWVzc2FnZXMuZWRpdE1lbnVTdG9wU3BlYWtpbmcubWVzc2FnZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1cGRhdGVGb3JNYWM6IGVkaXQuc3VibWVudSB3YXMgbm90IGFuIGFycmF5IScpO1xuICB9XG5cbiAgLy8gUmVwbGFjZSBXaW5kb3cgbWVudVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgdGVtcGxhdGVbNF0uc3VibWVudSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogbWVzc2FnZXMud2luZG93TWVudU1pbmltaXplLm1lc3NhZ2UsXG4gICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtNJyxcbiAgICAgIHJvbGU6ICdtaW5pbWl6ZScsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogbWVzc2FnZXMud2luZG93TWVudVpvb20ubWVzc2FnZSxcbiAgICAgIHJvbGU6ICd6b29tJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiBtZXNzYWdlcy5zaG93Lm1lc3NhZ2UsXG4gICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtTaGlmdCswJyxcbiAgICAgIGNsaWNrOiBzaG93V2luZG93LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3NlcGFyYXRvcicsXG4gICAgfSxcbiAgICB7XG4gICAgICByb2xlOiAnZnJvbnQnLFxuICAgICAgbGFiZWw6IG1lc3NhZ2VzLndpbmRvd01lbnVCcmluZ0FsbFRvRnJvbnQubWVzc2FnZSxcbiAgICB9LFxuICBdO1xuXG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBeUI7QUFXbEIsTUFBTSxpQkFBaUIsd0JBQzVCLFNBQ0EsYUFDaUI7QUFDakIsTUFBSSxDQUFDLDRCQUFTLFFBQVEsUUFBUSxHQUFHO0FBQy9CLFVBQU0sSUFBSSxVQUFVLHFDQUFxQztBQUFBLEVBQzNEO0FBRUEsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU0sV0FBeUI7QUFBQSxJQUM3QjtBQUFBLE1BQ0UsT0FBTyxTQUFTLGFBQWE7QUFBQSxNQUM3QixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsT0FBTyxTQUFTLHVCQUF1QjtBQUFBLFVBQ3ZDLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTyxTQUFTLGlCQUFpQjtBQUFBLFVBQ2pDLGFBQWE7QUFB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
