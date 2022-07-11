var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_sinon = require("sinon");
var import_menu = require("../../../app/menu");
var import_locale = require("../../../app/locale");
const forceUpdate = (0, import_sinon.stub)();
const openContactUs = (0, import_sinon.stub)();
const openForums = (0, import_sinon.stub)();
const openJoinTheBeta = (0, import_sinon.stub)();
const openReleaseNotes = (0, import_sinon.stub)();
const openSupportPage = (0, import_sinon.stub)();
const setupAsNewDevice = (0, import_sinon.stub)();
const setupAsStandalone = (0, import_sinon.stub)();
const showAbout = (0, import_sinon.stub)();
const showDebugLog = (0, import_sinon.stub)();
const showKeyboardShortcuts = (0, import_sinon.stub)();
const showSettings = (0, import_sinon.stub)();
const showStickerCreator = (0, import_sinon.stub)();
const showWindow = (0, import_sinon.stub)();
const getExpectedEditMenu = /* @__PURE__ */ __name((includeSpeech) => ({
  label: "&Edit",
  submenu: [
    { label: "Undo", role: "undo" },
    { label: "Redo", role: "redo" },
    { type: "separator" },
    { label: "Cut", role: "cut" },
    { label: "Copy", role: "copy" },
    { label: "Paste", role: "paste" },
    { label: "Paste and Match Style", role: "pasteAndMatchStyle" },
    { label: "Delete", role: "delete" },
    { label: "Select All", role: "selectAll" },
    ...includeSpeech ? [
      { type: "separator" },
      {
        label: "Speech",
        submenu: [
          { label: "Start speaking", role: "startSpeaking" },
          { label: "Stop speaking", role: "stopSpeaking" }
        ]
      }
    ] : []
  ]
}), "getExpectedEditMenu");
const getExpectedViewMenu = /* @__PURE__ */ __name(() => ({
  label: "&View",
  submenu: [
    { label: "Actual Size", role: "resetZoom" },
    { accelerator: "CmdOrCtrl+=", label: "Zoom In", role: "zoomIn" },
    { label: "Zoom Out", role: "zoomOut" },
    { type: "separator" },
    { label: "Toggle Full Screen", role: "togglefullscreen" },
    { type: "separator" },
    { label: "Debug Log", click: showDebugLog },
    { type: "separator" },
    { label: "Toggle Developer Tools", role: "toggleDevTools" },
    { label: "Force Update", click: forceUpdate }
  ]
}), "getExpectedViewMenu");
const getExpectedHelpMenu = /* @__PURE__ */ __name((includeAbout) => ({
  label: "&Help",
  role: "help",
  submenu: [
    {
      label: "Show Keyboard Shortcuts",
      accelerator: "CmdOrCtrl+/",
      click: showKeyboardShortcuts
    },
    { type: "separator" },
    { label: "Contact Us", click: openContactUs },
    { label: "Go to Release Notes", click: openReleaseNotes },
    { label: "Go to Forums", click: openForums },
    { label: "Go to Support Page", click: openSupportPage },
    { label: "Join the Beta", click: openJoinTheBeta },
    ...includeAbout ? [
      { type: "separator" },
      { label: "About Signal Desktop", click: showAbout }
    ] : []
  ]
}), "getExpectedHelpMenu");
const EXPECTED_MACOS = [
  {
    label: "Signal Desktop",
    submenu: [
      { label: "About Signal Desktop", click: showAbout },
      { type: "separator" },
      {
        label: "Preferences\u2026",
        accelerator: "CommandOrControl+,",
        click: showSettings
      },
      { type: "separator" },
      { label: "Services", role: "services" },
      { type: "separator" },
      { label: "Hide", role: "hide" },
      { label: "Hide Others", role: "hideOthers" },
      { label: "Show All", role: "unhide" },
      { type: "separator" },
      { label: "Quit Signal", role: "quit" }
    ]
  },
  {
    label: "&File",
    submenu: [
      { label: "Create/upload sticker pack", click: showStickerCreator },
      { type: "separator" },
      { accelerator: "CmdOrCtrl+W", label: "Close Window", role: "close" }
    ]
  },
  getExpectedEditMenu(true),
  getExpectedViewMenu(),
  {
    label: "&Window",
    role: "window",
    submenu: [
      { label: "Minimize", accelerator: "CmdOrCtrl+M", role: "minimize" },
      { label: "Zoom", role: "zoom" },
      { label: "Show", accelerator: "CmdOrCtrl+Shift+0", click: showWindow },
      { type: "separator" },
      { label: "Bring All to Front", role: "front" }
    ]
  },
  getExpectedHelpMenu(false)
];
const EXPECTED_WINDOWS = [
  {
    label: "&File",
    submenu: [
      { label: "Create/upload sticker pack", click: showStickerCreator },
      {
        label: "Preferences\u2026",
        accelerator: "CommandOrControl+,",
        click: showSettings
      },
      { type: "separator" },
      { label: "Quit Signal", role: "quit" }
    ]
  },
  getExpectedEditMenu(false),
  getExpectedViewMenu(),
  {
    label: "&Window",
    role: "window",
    submenu: [{ label: "Minimize", role: "minimize" }]
  },
  getExpectedHelpMenu(true)
];
const EXPECTED_LINUX = EXPECTED_WINDOWS.map((menuItem) => {
  if (menuItem.label === "&View" && Array.isArray(menuItem.submenu)) {
    return {
      ...menuItem,
      submenu: menuItem.submenu.filter((submenuItem) => submenuItem.label !== "Force Update")
    };
  }
  return menuItem;
});
const PLATFORMS = [
  {
    label: "macOS",
    platform: "darwin",
    expectedDefault: EXPECTED_MACOS
  },
  {
    label: "Windows",
    platform: "win32",
    expectedDefault: EXPECTED_WINDOWS
  },
  {
    label: "Linux",
    platform: "linux",
    expectedDefault: EXPECTED_LINUX
  }
];
describe("createTemplate", () => {
  const { messages } = (0, import_locale.load)({
    appLocale: "en",
    logger: {
      error(arg) {
        throw new Error(String(arg));
      }
    }
  });
  const actions = {
    forceUpdate,
    openContactUs,
    openForums,
    openJoinTheBeta,
    openReleaseNotes,
    openSupportPage,
    setupAsNewDevice,
    setupAsStandalone,
    showAbout,
    showDebugLog,
    showKeyboardShortcuts,
    showSettings,
    showStickerCreator,
    showWindow
  };
  PLATFORMS.forEach(({ label, platform, expectedDefault }) => {
    describe(label, () => {
      it("should return the correct template without setup options", () => {
        const options = {
          development: false,
          devTools: true,
          includeSetup: false,
          isProduction: true,
          platform,
          ...actions
        };
        const actual = (0, import_menu.createTemplate)(options, messages);
        import_chai.assert.deepEqual(actual, expectedDefault);
      });
      it("should return correct template with setup options", () => {
        const options = {
          development: false,
          devTools: true,
          includeSetup: true,
          isProduction: true,
          platform,
          ...actions
        };
        const expected = expectedDefault.map((menuItem) => {
          if (menuItem.label === "&File" && Array.isArray(menuItem.submenu)) {
            return {
              ...menuItem,
              submenu: [
                { label: "Set Up as New Device", click: setupAsNewDevice },
                { type: "separator" },
                ...menuItem.submenu
              ]
            };
          }
          return menuItem;
        });
        const actual = (0, import_menu.createTemplate)(options, messages);
        import_chai.assert.deepEqual(actual, expected);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVudV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBzdHViIH0gZnJvbSAnc2lub24nO1xuaW1wb3J0IHR5cGUgeyBNZW51SXRlbUNvbnN0cnVjdG9yT3B0aW9ucyB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHR5cGUgeyBDcmVhdGVUZW1wbGF0ZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vLi4vYXBwL21lbnUnO1xuaW1wb3J0IHsgY3JlYXRlVGVtcGxhdGUgfSBmcm9tICcuLi8uLi8uLi9hcHAvbWVudSc7XG5pbXBvcnQgeyBsb2FkIGFzIGxvYWRMb2NhbGUgfSBmcm9tICcuLi8uLi8uLi9hcHAvbG9jYWxlJztcbmltcG9ydCB0eXBlIHsgTWVudUxpc3RUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvbWVudSc7XG5cbmNvbnN0IGZvcmNlVXBkYXRlID0gc3R1YigpO1xuY29uc3Qgb3BlbkNvbnRhY3RVcyA9IHN0dWIoKTtcbmNvbnN0IG9wZW5Gb3J1bXMgPSBzdHViKCk7XG5jb25zdCBvcGVuSm9pblRoZUJldGEgPSBzdHViKCk7XG5jb25zdCBvcGVuUmVsZWFzZU5vdGVzID0gc3R1YigpO1xuY29uc3Qgb3BlblN1cHBvcnRQYWdlID0gc3R1YigpO1xuY29uc3Qgc2V0dXBBc05ld0RldmljZSA9IHN0dWIoKTtcbmNvbnN0IHNldHVwQXNTdGFuZGFsb25lID0gc3R1YigpO1xuY29uc3Qgc2hvd0Fib3V0ID0gc3R1YigpO1xuY29uc3Qgc2hvd0RlYnVnTG9nID0gc3R1YigpO1xuY29uc3Qgc2hvd0tleWJvYXJkU2hvcnRjdXRzID0gc3R1YigpO1xuY29uc3Qgc2hvd1NldHRpbmdzID0gc3R1YigpO1xuY29uc3Qgc2hvd1N0aWNrZXJDcmVhdG9yID0gc3R1YigpO1xuY29uc3Qgc2hvd1dpbmRvdyA9IHN0dWIoKTtcblxuY29uc3QgZ2V0RXhwZWN0ZWRFZGl0TWVudSA9IChcbiAgaW5jbHVkZVNwZWVjaDogYm9vbGVhblxuKTogTWVudUl0ZW1Db25zdHJ1Y3Rvck9wdGlvbnMgPT4gKHtcbiAgbGFiZWw6ICcmRWRpdCcsXG4gIHN1Ym1lbnU6IFtcbiAgICB7IGxhYmVsOiAnVW5kbycsIHJvbGU6ICd1bmRvJyB9LFxuICAgIHsgbGFiZWw6ICdSZWRvJywgcm9sZTogJ3JlZG8nIH0sXG4gICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgIHsgbGFiZWw6ICdDdXQnLCByb2xlOiAnY3V0JyB9LFxuICAgIHsgbGFiZWw6ICdDb3B5Jywgcm9sZTogJ2NvcHknIH0sXG4gICAgeyBsYWJlbDogJ1Bhc3RlJywgcm9sZTogJ3Bhc3RlJyB9LFxuICAgIHsgbGFiZWw6ICdQYXN0ZSBhbmQgTWF0Y2ggU3R5bGUnLCByb2xlOiAncGFzdGVBbmRNYXRjaFN0eWxlJyB9LFxuICAgIHsgbGFiZWw6ICdEZWxldGUnLCByb2xlOiAnZGVsZXRlJyB9LFxuICAgIHsgbGFiZWw6ICdTZWxlY3QgQWxsJywgcm9sZTogJ3NlbGVjdEFsbCcgfSxcbiAgICAuLi4oaW5jbHVkZVNwZWVjaFxuICAgICAgPyAoW1xuICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ1NwZWVjaCcsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgIHsgbGFiZWw6ICdTdGFydCBzcGVha2luZycsIHJvbGU6ICdzdGFydFNwZWFraW5nJyB9LFxuICAgICAgICAgICAgICB7IGxhYmVsOiAnU3RvcCBzcGVha2luZycsIHJvbGU6ICdzdG9wU3BlYWtpbmcnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0gYXMgTWVudUxpc3RUeXBlKVxuICAgICAgOiBbXSksXG4gIF0sXG59KTtcblxuY29uc3QgZ2V0RXhwZWN0ZWRWaWV3TWVudSA9ICgpOiBNZW51SXRlbUNvbnN0cnVjdG9yT3B0aW9ucyA9PiAoe1xuICBsYWJlbDogJyZWaWV3JyxcbiAgc3VibWVudTogW1xuICAgIHsgbGFiZWw6ICdBY3R1YWwgU2l6ZScsIHJvbGU6ICdyZXNldFpvb20nIH0sXG4gICAgeyBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCs9JywgbGFiZWw6ICdab29tIEluJywgcm9sZTogJ3pvb21JbicgfSxcbiAgICB7IGxhYmVsOiAnWm9vbSBPdXQnLCByb2xlOiAnem9vbU91dCcgfSxcbiAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgeyBsYWJlbDogJ1RvZ2dsZSBGdWxsIFNjcmVlbicsIHJvbGU6ICd0b2dnbGVmdWxsc2NyZWVuJyB9LFxuICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICB7IGxhYmVsOiAnRGVidWcgTG9nJywgY2xpY2s6IHNob3dEZWJ1Z0xvZyB9LFxuICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICB7IGxhYmVsOiAnVG9nZ2xlIERldmVsb3BlciBUb29scycsIHJvbGU6ICd0b2dnbGVEZXZUb29scycgfSxcbiAgICB7IGxhYmVsOiAnRm9yY2UgVXBkYXRlJywgY2xpY2s6IGZvcmNlVXBkYXRlIH0sXG4gIF0sXG59KTtcblxuY29uc3QgZ2V0RXhwZWN0ZWRIZWxwTWVudSA9IChcbiAgaW5jbHVkZUFib3V0OiBib29sZWFuXG4pOiBNZW51SXRlbUNvbnN0cnVjdG9yT3B0aW9ucyA9PiAoe1xuICBsYWJlbDogJyZIZWxwJyxcbiAgcm9sZTogJ2hlbHAnLFxuICBzdWJtZW51OiBbXG4gICAge1xuICAgICAgbGFiZWw6ICdTaG93IEtleWJvYXJkIFNob3J0Y3V0cycsXG4gICAgICBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCsvJyxcbiAgICAgIGNsaWNrOiBzaG93S2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgfSxcbiAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgeyBsYWJlbDogJ0NvbnRhY3QgVXMnLCBjbGljazogb3BlbkNvbnRhY3RVcyB9LFxuICAgIHsgbGFiZWw6ICdHbyB0byBSZWxlYXNlIE5vdGVzJywgY2xpY2s6IG9wZW5SZWxlYXNlTm90ZXMgfSxcbiAgICB7IGxhYmVsOiAnR28gdG8gRm9ydW1zJywgY2xpY2s6IG9wZW5Gb3J1bXMgfSxcbiAgICB7IGxhYmVsOiAnR28gdG8gU3VwcG9ydCBQYWdlJywgY2xpY2s6IG9wZW5TdXBwb3J0UGFnZSB9LFxuICAgIHsgbGFiZWw6ICdKb2luIHRoZSBCZXRhJywgY2xpY2s6IG9wZW5Kb2luVGhlQmV0YSB9LFxuICAgIC4uLihpbmNsdWRlQWJvdXRcbiAgICAgID8gKFtcbiAgICAgICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICAgICAgeyBsYWJlbDogJ0Fib3V0IFNpZ25hbCBEZXNrdG9wJywgY2xpY2s6IHNob3dBYm91dCB9LFxuICAgICAgICBdIGFzIE1lbnVMaXN0VHlwZSlcbiAgICAgIDogW10pLFxuICBdLFxufSk7XG5cbmNvbnN0IEVYUEVDVEVEX01BQ09TOiBNZW51TGlzdFR5cGUgPSBbXG4gIHtcbiAgICBsYWJlbDogJ1NpZ25hbCBEZXNrdG9wJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQWJvdXQgU2lnbmFsIERlc2t0b3AnLCBjbGljazogc2hvd0Fib3V0IH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnUHJlZmVyZW5jZXNcdTIwMjYnLFxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NvbW1hbmRPckNvbnRyb2wrLCcsXG4gICAgICAgIGNsaWNrOiBzaG93U2V0dGluZ3MsXG4gICAgICB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1NlcnZpY2VzJywgcm9sZTogJ3NlcnZpY2VzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ0hpZGUnLCByb2xlOiAnaGlkZScgfSxcbiAgICAgIHsgbGFiZWw6ICdIaWRlIE90aGVycycsIHJvbGU6ICdoaWRlT3RoZXJzJyB9LFxuICAgICAgeyBsYWJlbDogJ1Nob3cgQWxsJywgcm9sZTogJ3VuaGlkZScgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdRdWl0IFNpZ25hbCcsIHJvbGU6ICdxdWl0JyB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJyZGaWxlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQ3JlYXRlL3VwbG9hZCBzdGlja2VyIHBhY2snLCBjbGljazogc2hvd1N0aWNrZXJDcmVhdG9yIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1cnLCBsYWJlbDogJ0Nsb3NlIFdpbmRvdycsIHJvbGU6ICdjbG9zZScgfSxcbiAgICBdLFxuICB9LFxuICBnZXRFeHBlY3RlZEVkaXRNZW51KHRydWUpLFxuICBnZXRFeHBlY3RlZFZpZXdNZW51KCksXG4gIHtcbiAgICBsYWJlbDogJyZXaW5kb3cnLFxuICAgIHJvbGU6ICd3aW5kb3cnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdNaW5pbWl6ZScsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK00nLCByb2xlOiAnbWluaW1pemUnIH0sXG4gICAgICB7IGxhYmVsOiAnWm9vbScsIHJvbGU6ICd6b29tJyB9LFxuICAgICAgeyBsYWJlbDogJ1Nob3cnLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtTaGlmdCswJywgY2xpY2s6IHNob3dXaW5kb3cgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdCcmluZyBBbGwgdG8gRnJvbnQnLCByb2xlOiAnZnJvbnQnIH0sXG4gICAgXSxcbiAgfSxcbiAgZ2V0RXhwZWN0ZWRIZWxwTWVudShmYWxzZSksXG5dO1xuXG5jb25zdCBFWFBFQ1RFRF9XSU5ET1dTOiBNZW51TGlzdFR5cGUgPSBbXG4gIHtcbiAgICBsYWJlbDogJyZGaWxlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQ3JlYXRlL3VwbG9hZCBzdGlja2VyIHBhY2snLCBjbGljazogc2hvd1N0aWNrZXJDcmVhdG9yIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnUHJlZmVyZW5jZXNcdTIwMjYnLFxuICAgICAgICBhY2NlbGVyYXRvcjogJ0NvbW1hbmRPckNvbnRyb2wrLCcsXG4gICAgICAgIGNsaWNrOiBzaG93U2V0dGluZ3MsXG4gICAgICB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1F1aXQgU2lnbmFsJywgcm9sZTogJ3F1aXQnIH0sXG4gICAgXSxcbiAgfSxcbiAgZ2V0RXhwZWN0ZWRFZGl0TWVudShmYWxzZSksXG4gIGdldEV4cGVjdGVkVmlld01lbnUoKSxcbiAge1xuICAgIGxhYmVsOiAnJldpbmRvdycsXG4gICAgcm9sZTogJ3dpbmRvdycsXG4gICAgc3VibWVudTogW3sgbGFiZWw6ICdNaW5pbWl6ZScsIHJvbGU6ICdtaW5pbWl6ZScgfV0sXG4gIH0sXG4gIGdldEV4cGVjdGVkSGVscE1lbnUodHJ1ZSksXG5dO1xuXG5jb25zdCBFWFBFQ1RFRF9MSU5VWDogTWVudUxpc3RUeXBlID0gRVhQRUNURURfV0lORE9XUy5tYXAobWVudUl0ZW0gPT4ge1xuICBpZiAobWVudUl0ZW0ubGFiZWwgPT09ICcmVmlldycgJiYgQXJyYXkuaXNBcnJheShtZW51SXRlbS5zdWJtZW51KSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5tZW51SXRlbSxcbiAgICAgIHN1Ym1lbnU6IG1lbnVJdGVtLnN1Ym1lbnUuZmlsdGVyKFxuICAgICAgICBzdWJtZW51SXRlbSA9PiBzdWJtZW51SXRlbS5sYWJlbCAhPT0gJ0ZvcmNlIFVwZGF0ZSdcbiAgICAgICksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbWVudUl0ZW07XG59KTtcblxuY29uc3QgUExBVEZPUk1TID0gW1xuICB7XG4gICAgbGFiZWw6ICdtYWNPUycsXG4gICAgcGxhdGZvcm06ICdkYXJ3aW4nLFxuICAgIGV4cGVjdGVkRGVmYXVsdDogRVhQRUNURURfTUFDT1MsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ1dpbmRvd3MnLFxuICAgIHBsYXRmb3JtOiAnd2luMzInLFxuICAgIGV4cGVjdGVkRGVmYXVsdDogRVhQRUNURURfV0lORE9XUyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnTGludXgnLFxuICAgIHBsYXRmb3JtOiAnbGludXgnLFxuICAgIGV4cGVjdGVkRGVmYXVsdDogRVhQRUNURURfTElOVVgsXG4gIH0sXG5dO1xuXG5kZXNjcmliZSgnY3JlYXRlVGVtcGxhdGUnLCAoKSA9PiB7XG4gIGNvbnN0IHsgbWVzc2FnZXMgfSA9IGxvYWRMb2NhbGUoe1xuICAgIGFwcExvY2FsZTogJ2VuJyxcbiAgICBsb2dnZXI6IHtcbiAgICAgIGVycm9yKGFyZzogdW5rbm93bikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoU3RyaW5nKGFyZykpO1xuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBhY3Rpb25zID0ge1xuICAgIGZvcmNlVXBkYXRlLFxuICAgIG9wZW5Db250YWN0VXMsXG4gICAgb3BlbkZvcnVtcyxcbiAgICBvcGVuSm9pblRoZUJldGEsXG4gICAgb3BlblJlbGVhc2VOb3RlcyxcbiAgICBvcGVuU3VwcG9ydFBhZ2UsXG4gICAgc2V0dXBBc05ld0RldmljZSxcbiAgICBzZXR1cEFzU3RhbmRhbG9uZSxcbiAgICBzaG93QWJvdXQsXG4gICAgc2hvd0RlYnVnTG9nLFxuICAgIHNob3dLZXlib2FyZFNob3J0Y3V0cyxcbiAgICBzaG93U2V0dGluZ3MsXG4gICAgc2hvd1N0aWNrZXJDcmVhdG9yLFxuICAgIHNob3dXaW5kb3csXG4gIH07XG5cbiAgUExBVEZPUk1TLmZvckVhY2goKHsgbGFiZWwsIHBsYXRmb3JtLCBleHBlY3RlZERlZmF1bHQgfSkgPT4ge1xuICAgIGRlc2NyaWJlKGxhYmVsLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCB0ZW1wbGF0ZSB3aXRob3V0IHNldHVwIG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENyZWF0ZVRlbXBsYXRlT3B0aW9uc1R5cGUgPSB7XG4gICAgICAgICAgZGV2ZWxvcG1lbnQ6IGZhbHNlLFxuICAgICAgICAgIGRldlRvb2xzOiB0cnVlLFxuICAgICAgICAgIGluY2x1ZGVTZXR1cDogZmFsc2UsXG4gICAgICAgICAgaXNQcm9kdWN0aW9uOiB0cnVlLFxuICAgICAgICAgIHBsYXRmb3JtLFxuICAgICAgICAgIC4uLmFjdGlvbnMsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gY3JlYXRlVGVtcGxhdGUob3B0aW9ucywgbWVzc2FnZXMpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWREZWZhdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBjb3JyZWN0IHRlbXBsYXRlIHdpdGggc2V0dXAgb3B0aW9ucycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ3JlYXRlVGVtcGxhdGVPcHRpb25zVHlwZSA9IHtcbiAgICAgICAgICBkZXZlbG9wbWVudDogZmFsc2UsXG4gICAgICAgICAgZGV2VG9vbHM6IHRydWUsXG4gICAgICAgICAgaW5jbHVkZVNldHVwOiB0cnVlLFxuICAgICAgICAgIGlzUHJvZHVjdGlvbjogdHJ1ZSxcbiAgICAgICAgICBwbGF0Zm9ybSxcbiAgICAgICAgICAuLi5hY3Rpb25zLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkOiBNZW51TGlzdFR5cGUgPSBleHBlY3RlZERlZmF1bHQubWFwKG1lbnVJdGVtID0+IHtcbiAgICAgICAgICBpZiAobWVudUl0ZW0ubGFiZWwgPT09ICcmRmlsZScgJiYgQXJyYXkuaXNBcnJheShtZW51SXRlbS5zdWJtZW51KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ubWVudUl0ZW0sXG4gICAgICAgICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnU2V0IFVwIGFzIE5ldyBEZXZpY2UnLCBjbGljazogc2V0dXBBc05ld0RldmljZSB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgICAgICAgICAgICAuLi5tZW51SXRlbS5zdWJtZW51LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1lbnVJdGVtO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3R1YWwgPSBjcmVhdGVUZW1wbGF0ZShvcHRpb25zLCBtZXNzYWdlcyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBQ3ZCLG1CQUFxQjtBQUlyQixrQkFBK0I7QUFDL0Isb0JBQW1DO0FBR25DLE1BQU0sY0FBYyx1QkFBSztBQUN6QixNQUFNLGdCQUFnQix1QkFBSztBQUMzQixNQUFNLGFBQWEsdUJBQUs7QUFDeEIsTUFBTSxrQkFBa0IsdUJBQUs7QUFDN0IsTUFBTSxtQkFBbUIsdUJBQUs7QUFDOUIsTUFBTSxrQkFBa0IsdUJBQUs7QUFDN0IsTUFBTSxtQkFBbUIsdUJBQUs7QUFDOUIsTUFBTSxvQkFBb0IsdUJBQUs7QUFDL0IsTUFBTSxZQUFZLHVCQUFLO0FBQ3ZCLE1BQU0sZUFBZSx1QkFBSztBQUMxQixNQUFNLHdCQUF3Qix1QkFBSztBQUNuQyxNQUFNLGVBQWUsdUJBQUs7QUFDMUIsTUFBTSxx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
