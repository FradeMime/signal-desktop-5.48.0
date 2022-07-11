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
var TitleBarContainer_exports = {};
__export(TitleBarContainer_exports, {
  TitleBarContainer: () => TitleBarContainer
});
module.exports = __toCommonJS(TitleBarContainer_exports);
var import_react = __toESM(require("react"));
var import_frameless_titlebar = __toESM(require("@indutny/frameless-titlebar"));
var import_classnames = __toESM(require("classnames"));
var import_menu = require("../../app/menu");
var import_Util = require("../types/Util");
const TITLEBAR_HEIGHT = 28;
const ROLE_TO_ACCELERATOR = /* @__PURE__ */ new Map();
ROLE_TO_ACCELERATOR.set("undo", "CmdOrCtrl+Z");
ROLE_TO_ACCELERATOR.set("redo", "CmdOrCtrl+Y");
ROLE_TO_ACCELERATOR.set("cut", "CmdOrCtrl+X");
ROLE_TO_ACCELERATOR.set("copy", "CmdOrCtrl+C");
ROLE_TO_ACCELERATOR.set("paste", "CmdOrCtrl+V");
ROLE_TO_ACCELERATOR.set("pasteAndMatchStyle", "CmdOrCtrl+Shift+V");
ROLE_TO_ACCELERATOR.set("selectAll", "CmdOrCtrl+A");
ROLE_TO_ACCELERATOR.set("resetZoom", "CmdOrCtrl+0");
ROLE_TO_ACCELERATOR.set("zoomIn", "CmdOrCtrl+=");
ROLE_TO_ACCELERATOR.set("zoomOut", "CmdOrCtrl+-");
ROLE_TO_ACCELERATOR.set("togglefullscreen", "F11");
ROLE_TO_ACCELERATOR.set("toggleDevTools", "CmdOrCtrl+Shift+I");
ROLE_TO_ACCELERATOR.set("minimize", "CmdOrCtrl+M");
function convertMenu(menuList, executeMenuRole) {
  return menuList.map((item) => {
    const {
      type,
      label,
      accelerator: originalAccelerator,
      click: originalClick,
      submenu: originalSubmenu,
      role
    } = item;
    let submenu;
    if (Array.isArray(originalSubmenu)) {
      submenu = convertMenu(originalSubmenu, executeMenuRole);
    } else if (originalSubmenu) {
      throw new Error("Non-array submenu is not supported");
    }
    let click;
    if (originalClick) {
      if (role) {
        throw new Error(`Menu item: ${label} has both click and role`);
      }
      click = originalClick;
    } else if (role) {
      click = /* @__PURE__ */ __name(() => executeMenuRole(role), "click");
    }
    let accelerator;
    if (originalAccelerator) {
      accelerator = originalAccelerator.toString();
    } else if (role) {
      accelerator = ROLE_TO_ACCELERATOR.get(role);
    }
    return {
      type,
      label,
      accelerator,
      click,
      submenu
    };
  });
}
const TitleBarContainer = /* @__PURE__ */ __name((props) => {
  const {
    theme,
    isMaximized,
    isFullScreen,
    isWindows11,
    hideMenuBar,
    executeMenuRole,
    titleBarDoubleClick,
    children,
    hasMenu,
    platform,
    iconSrc = "images/icon_32.png"
  } = props;
  const titleBarTheme = (0, import_react.useMemo)(() => ({
    bar: {
      height: TITLEBAR_HEIGHT,
      palette: theme === import_Util.ThemeType.light ? "light" : "dark",
      ...theme === import_Util.ThemeType.dark ? {
        color: "#e9e9e9",
        background: "#2e2e2e",
        borderBottom: "1px solid #121212",
        button: {
          active: {
            color: "#e9e9e9",
            background: "#3b3b3b"
          },
          hover: {
            color: "#e9e9e9",
            background: "#3b3b3b"
          }
        }
      } : {}
    },
    menu: {
      overlay: {
        opacity: 0
      },
      autoHide: hideMenuBar,
      ...theme === import_Util.ThemeType.dark ? {
        separator: {
          color: "#5e5e5e"
        },
        accelerator: {
          color: "#b9b9b9"
        },
        list: {
          background: "#3b3b3b",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.12)",
          borderRadius: "0px 0px 6px 6px"
        }
      } : {
        list: {
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.12)",
          borderRadius: "0px 0px 6px 6px"
        }
      }
    },
    enableOverflow: false,
    scalingFunction(value) {
      return `calc(${value} * var(--zoom-factor))`;
    }
  }), [theme, hideMenuBar]);
  if (platform !== "win32" || isFullScreen) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
  }
  let maybeMenu;
  if (hasMenu) {
    const { localeMessages, menuOptions, executeMenuAction } = props;
    const menuTemplate = (0, import_menu.createTemplate)({
      ...menuOptions,
      forceUpdate: () => executeMenuAction("forceUpdate"),
      openContactUs: () => executeMenuAction("openContactUs"),
      openForums: () => executeMenuAction("openForums"),
      openJoinTheBeta: () => executeMenuAction("openJoinTheBeta"),
      openReleaseNotes: () => executeMenuAction("openReleaseNotes"),
      openSupportPage: () => executeMenuAction("openSupportPage"),
      setupAsNewDevice: () => executeMenuAction("setupAsNewDevice"),
      setupAsStandalone: () => executeMenuAction("setupAsStandalone"),
      showAbout: () => executeMenuAction("showAbout"),
      showDebugLog: () => executeMenuAction("showDebugLog"),
      showKeyboardShortcuts: () => executeMenuAction("showKeyboardShortcuts"),
      showSettings: () => executeMenuAction("showSettings"),
      showStickerCreator: () => executeMenuAction("showStickerCreator"),
      showWindow: () => executeMenuAction("showWindow")
    }, localeMessages);
    maybeMenu = convertMenu(menuTemplate, executeMenuRole);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TitleBarContainer"
  }, /* @__PURE__ */ import_react.default.createElement(import_frameless_titlebar.default, {
    className: (0, import_classnames.default)("TitleBarContainer__title", isWindows11 && !isMaximized ? "TitleBarContainer__title--extra-padding" : null),
    platform,
    iconSrc,
    theme: titleBarTheme,
    maximized: isMaximized,
    menu: maybeMenu,
    onDoubleClick: titleBarDoubleClick,
    hideControls: true
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TitleBarContainer__content"
  }, children));
}, "TitleBarContainer");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TitleBarContainer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGl0bGVCYXJDb250YWluZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVGl0bGVCYXIgZnJvbSAnQGluZHV0bnkvZnJhbWVsZXNzLXRpdGxlYmFyJztcbmltcG9ydCB0eXBlIHsgTWVudUl0ZW0gfSBmcm9tICdAaW5kdXRueS9mcmFtZWxlc3MtdGl0bGViYXInO1xuaW1wb3J0IHR5cGUgeyBNZW51SXRlbUNvbnN0cnVjdG9yT3B0aW9ucyB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBjcmVhdGVUZW1wbGF0ZSB9IGZyb20gJy4uLy4uL2FwcC9tZW51JztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGVNZXNzYWdlc1R5cGUgfSBmcm9tICcuLi90eXBlcy9JMThOJztcbmltcG9ydCB0eXBlIHsgTWVudU9wdGlvbnNUeXBlLCBNZW51QWN0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzL21lbnUnO1xuXG5leHBvcnQgdHlwZSBNZW51UHJvcHNUeXBlID0gUmVhZG9ubHk8e1xuICBoYXNNZW51OiB0cnVlO1xuICBsb2NhbGVNZXNzYWdlczogTG9jYWxlTWVzc2FnZXNUeXBlO1xuICBtZW51T3B0aW9uczogTWVudU9wdGlvbnNUeXBlO1xuICBleGVjdXRlTWVudUFjdGlvbjogKGFjdGlvbjogTWVudUFjdGlvblR5cGUpID0+IHZvaWQ7XG59PjtcblxuZXhwb3J0IHR5cGUgRXhlY3V0ZU1lbnVSb2xlVHlwZSA9IChcbiAgcm9sZTogTWVudUl0ZW1Db25zdHJ1Y3Rvck9wdGlvbnNbJ3JvbGUnXVxuKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBSZWFkb25seTx7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG4gIGlzTWF4aW1pemVkPzogYm9vbGVhbjtcbiAgaXNGdWxsU2NyZWVuPzogYm9vbGVhbjtcbiAgaXNXaW5kb3dzMTE6IGJvb2xlYW47XG4gIGhpZGVNZW51QmFyPzogYm9vbGVhbjtcbiAgcGxhdGZvcm06IHN0cmluZztcbiAgZXhlY3V0ZU1lbnVSb2xlOiBFeGVjdXRlTWVudVJvbGVUeXBlO1xuICB0aXRsZUJhckRvdWJsZUNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcblxuICAvLyBOZWVkcyB0byBiZSBvdmVycmlkZW4gaW4gc3RpY2tlci1jcmVhdG9yXG4gIGljb25TcmM/OiBzdHJpbmc7XG59PiAmXG4gIChNZW51UHJvcHNUeXBlIHwgeyBoYXNNZW51PzogZmFsc2UgfSk7XG5cbmNvbnN0IFRJVExFQkFSX0hFSUdIVCA9IDI4O1xuXG4vLyBXaW5kb3dzIG9ubHlcbmNvbnN0IFJPTEVfVE9fQUNDRUxFUkFUT1IgPSBuZXcgTWFwPFxuICBNZW51SXRlbUNvbnN0cnVjdG9yT3B0aW9uc1sncm9sZSddLFxuICBzdHJpbmdcbj4oKTtcblJPTEVfVE9fQUNDRUxFUkFUT1Iuc2V0KCd1bmRvJywgJ0NtZE9yQ3RybCtaJyk7XG5ST0xFX1RPX0FDQ0VMRVJBVE9SLnNldCgncmVkbycsICdDbWRPckN0cmwrWScpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ2N1dCcsICdDbWRPckN0cmwrWCcpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ2NvcHknLCAnQ21kT3JDdHJsK0MnKTtcblJPTEVfVE9fQUNDRUxFUkFUT1Iuc2V0KCdwYXN0ZScsICdDbWRPckN0cmwrVicpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ3Bhc3RlQW5kTWF0Y2hTdHlsZScsICdDbWRPckN0cmwrU2hpZnQrVicpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ3NlbGVjdEFsbCcsICdDbWRPckN0cmwrQScpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ3Jlc2V0Wm9vbScsICdDbWRPckN0cmwrMCcpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ3pvb21JbicsICdDbWRPckN0cmwrPScpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ3pvb21PdXQnLCAnQ21kT3JDdHJsKy0nKTtcblJPTEVfVE9fQUNDRUxFUkFUT1Iuc2V0KCd0b2dnbGVmdWxsc2NyZWVuJywgJ0YxMScpO1xuUk9MRV9UT19BQ0NFTEVSQVRPUi5zZXQoJ3RvZ2dsZURldlRvb2xzJywgJ0NtZE9yQ3RybCtTaGlmdCtJJyk7XG5ST0xFX1RPX0FDQ0VMRVJBVE9SLnNldCgnbWluaW1pemUnLCAnQ21kT3JDdHJsK00nKTtcblxuZnVuY3Rpb24gY29udmVydE1lbnUoXG4gIG1lbnVMaXN0OiBSZWFkb25seUFycmF5PE1lbnVJdGVtQ29uc3RydWN0b3JPcHRpb25zPixcbiAgZXhlY3V0ZU1lbnVSb2xlOiAocm9sZTogTWVudUl0ZW1Db25zdHJ1Y3Rvck9wdGlvbnNbJ3JvbGUnXSkgPT4gdm9pZFxuKTogQXJyYXk8TWVudUl0ZW0+IHtcbiAgcmV0dXJuIG1lbnVMaXN0Lm1hcChpdGVtID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB0eXBlLFxuICAgICAgbGFiZWwsXG4gICAgICBhY2NlbGVyYXRvcjogb3JpZ2luYWxBY2NlbGVyYXRvcixcbiAgICAgIGNsaWNrOiBvcmlnaW5hbENsaWNrLFxuICAgICAgc3VibWVudTogb3JpZ2luYWxTdWJtZW51LFxuICAgICAgcm9sZSxcbiAgICB9ID0gaXRlbTtcbiAgICBsZXQgc3VibWVudTogQXJyYXk8TWVudUl0ZW0+IHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3JpZ2luYWxTdWJtZW51KSkge1xuICAgICAgc3VibWVudSA9IGNvbnZlcnRNZW51KG9yaWdpbmFsU3VibWVudSwgZXhlY3V0ZU1lbnVSb2xlKTtcbiAgICB9IGVsc2UgaWYgKG9yaWdpbmFsU3VibWVudSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb24tYXJyYXkgc3VibWVudSBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuXG4gICAgbGV0IGNsaWNrOiAoKCkgPT4gdW5rbm93bikgfCB1bmRlZmluZWQ7XG4gICAgaWYgKG9yaWdpbmFsQ2xpY2spIHtcbiAgICAgIGlmIChyb2xlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWVudSBpdGVtOiAke2xhYmVsfSBoYXMgYm90aCBjbGljayBhbmQgcm9sZWApO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBkb24ndCB1c2UgYXJndW1lbnRzIGluIGFwcC9tZW51LnRzXG4gICAgICBjbGljayA9IG9yaWdpbmFsQ2xpY2sgYXMgKCkgPT4gdW5rbm93bjtcbiAgICB9IGVsc2UgaWYgKHJvbGUpIHtcbiAgICAgIGNsaWNrID0gKCkgPT4gZXhlY3V0ZU1lbnVSb2xlKHJvbGUpO1xuICAgIH1cblxuICAgIGxldCBhY2NlbGVyYXRvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlmIChvcmlnaW5hbEFjY2VsZXJhdG9yKSB7XG4gICAgICBhY2NlbGVyYXRvciA9IG9yaWdpbmFsQWNjZWxlcmF0b3IudG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKHJvbGUpIHtcbiAgICAgIGFjY2VsZXJhdG9yID0gUk9MRV9UT19BQ0NFTEVSQVRPUi5nZXQocm9sZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGUsXG4gICAgICBsYWJlbCxcbiAgICAgIGFjY2VsZXJhdG9yLFxuICAgICAgY2xpY2ssXG4gICAgICBzdWJtZW51LFxuICAgIH07XG4gIH0pO1xufVxuXG5leHBvcnQgY29uc3QgVGl0bGVCYXJDb250YWluZXIgPSAocHJvcHM6IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3Qge1xuICAgIHRoZW1lLFxuICAgIGlzTWF4aW1pemVkLFxuICAgIGlzRnVsbFNjcmVlbixcbiAgICBpc1dpbmRvd3MxMSxcbiAgICBoaWRlTWVudUJhcixcbiAgICBleGVjdXRlTWVudVJvbGUsXG4gICAgdGl0bGVCYXJEb3VibGVDbGljayxcbiAgICBjaGlsZHJlbixcbiAgICBoYXNNZW51LFxuICAgIHBsYXRmb3JtLFxuICAgIGljb25TcmMgPSAnaW1hZ2VzL2ljb25fMzIucG5nJyxcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHRpdGxlQmFyVGhlbWUgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBiYXI6IHtcbiAgICAgICAgLy8gU2VlIHN0eWxlc2hlZXRzL19nbG9iYWwuc2Nzc1xuICAgICAgICBoZWlnaHQ6IFRJVExFQkFSX0hFSUdIVCxcbiAgICAgICAgcGFsZXR0ZTpcbiAgICAgICAgICB0aGVtZSA9PT0gVGhlbWVUeXBlLmxpZ2h0ID8gKCdsaWdodCcgYXMgY29uc3QpIDogKCdkYXJrJyBhcyBjb25zdCksXG4gICAgICAgIC4uLih0aGVtZSA9PT0gVGhlbWVUeXBlLmRhcmtcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLy8gJGNvbG9yLWdyYXktMDVcbiAgICAgICAgICAgICAgY29sb3I6ICcjZTllOWU5JyxcbiAgICAgICAgICAgICAgLy8gJGNvbG9yLWdyYXktODBcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyZTJlMmUnLFxuICAgICAgICAgICAgICAvLyAkY29sb3ItZ3JheS05NVxuICAgICAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgIzEyMTIxMicsXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgICAgICAgLy8gJGNvbG9yLWdyYXktMDVcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2U5ZTllOScsXG4gICAgICAgICAgICAgICAgICAvLyAkY29sb3ItZ3JheS03NVxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMzYjNiM2InLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaG92ZXI6IHtcbiAgICAgICAgICAgICAgICAgIC8vICRjb2xvci1ncmF5LTA1XG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNlOWU5ZTknLFxuICAgICAgICAgICAgICAgICAgLy8gJGNvbG9yLWdyYXktNzVcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjM2IzYjNiJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge30pLFxuICAgICAgfSxcblxuICAgICAgLy8gSGlkZSBvdmVybGF5XG4gICAgICBtZW51OiB7XG4gICAgICAgIG92ZXJsYXk6IHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICB9LFxuICAgICAgICBhdXRvSGlkZTogaGlkZU1lbnVCYXIsXG5cbiAgICAgICAgLi4uKHRoZW1lID09PSBUaGVtZVR5cGUuZGFya1xuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBzZXBhcmF0b3I6IHtcbiAgICAgICAgICAgICAgICAvLyAkY29sb3ItZ3JheS05NVxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzVlNWU1ZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGFjY2VsZXJhdG9yOiB7XG4gICAgICAgICAgICAgICAgLy8gJGNvbG9yLWdyYXktMjVcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNiOWI5YjknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICAgICAgLy8gJGNvbG9yLWdyYXktNzVcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzNiM2IzYicsXG4gICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMHB4IDRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEyKScsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMHB4IDBweCA2cHggNnB4JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMiknLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzBweCAwcHggNnB4IDZweCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgIH0sXG5cbiAgICAgIC8vIFpvb20gc3VwcG9ydFxuICAgICAgZW5hYmxlT3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgc2NhbGluZ0Z1bmN0aW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGBjYWxjKCR7dmFsdWV9ICogdmFyKC0tem9vbS1mYWN0b3IpKWA7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIFt0aGVtZSwgaGlkZU1lbnVCYXJdXG4gICk7XG5cbiAgaWYgKHBsYXRmb3JtICE9PSAnd2luMzInIHx8IGlzRnVsbFNjcmVlbikge1xuICAgIHJldHVybiA8PntjaGlsZHJlbn08Lz47XG4gIH1cblxuICBsZXQgbWF5YmVNZW51OiBBcnJheTxNZW51SXRlbT4gfCB1bmRlZmluZWQ7XG4gIGlmIChoYXNNZW51KSB7XG4gICAgY29uc3QgeyBsb2NhbGVNZXNzYWdlcywgbWVudU9wdGlvbnMsIGV4ZWN1dGVNZW51QWN0aW9uIH0gPSBwcm9wcztcblxuICAgIGNvbnN0IG1lbnVUZW1wbGF0ZSA9IGNyZWF0ZVRlbXBsYXRlKFxuICAgICAge1xuICAgICAgICAuLi5tZW51T3B0aW9ucyxcblxuICAgICAgICAvLyBhY3Rpb25zXG4gICAgICAgIGZvcmNlVXBkYXRlOiAoKSA9PiBleGVjdXRlTWVudUFjdGlvbignZm9yY2VVcGRhdGUnKSxcbiAgICAgICAgb3BlbkNvbnRhY3RVczogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ29wZW5Db250YWN0VXMnKSxcbiAgICAgICAgb3BlbkZvcnVtczogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ29wZW5Gb3J1bXMnKSxcbiAgICAgICAgb3BlbkpvaW5UaGVCZXRhOiAoKSA9PiBleGVjdXRlTWVudUFjdGlvbignb3BlbkpvaW5UaGVCZXRhJyksXG4gICAgICAgIG9wZW5SZWxlYXNlTm90ZXM6ICgpID0+IGV4ZWN1dGVNZW51QWN0aW9uKCdvcGVuUmVsZWFzZU5vdGVzJyksXG4gICAgICAgIG9wZW5TdXBwb3J0UGFnZTogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ29wZW5TdXBwb3J0UGFnZScpLFxuICAgICAgICBzZXR1cEFzTmV3RGV2aWNlOiAoKSA9PiBleGVjdXRlTWVudUFjdGlvbignc2V0dXBBc05ld0RldmljZScpLFxuICAgICAgICBzZXR1cEFzU3RhbmRhbG9uZTogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ3NldHVwQXNTdGFuZGFsb25lJyksXG4gICAgICAgIHNob3dBYm91dDogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ3Nob3dBYm91dCcpLFxuICAgICAgICBzaG93RGVidWdMb2c6ICgpID0+IGV4ZWN1dGVNZW51QWN0aW9uKCdzaG93RGVidWdMb2cnKSxcbiAgICAgICAgc2hvd0tleWJvYXJkU2hvcnRjdXRzOiAoKSA9PiBleGVjdXRlTWVudUFjdGlvbignc2hvd0tleWJvYXJkU2hvcnRjdXRzJyksXG4gICAgICAgIHNob3dTZXR0aW5nczogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ3Nob3dTZXR0aW5ncycpLFxuICAgICAgICBzaG93U3RpY2tlckNyZWF0b3I6ICgpID0+IGV4ZWN1dGVNZW51QWN0aW9uKCdzaG93U3RpY2tlckNyZWF0b3InKSxcbiAgICAgICAgc2hvd1dpbmRvdzogKCkgPT4gZXhlY3V0ZU1lbnVBY3Rpb24oJ3Nob3dXaW5kb3cnKSxcbiAgICAgIH0sXG4gICAgICBsb2NhbGVNZXNzYWdlc1xuICAgICk7XG5cbiAgICBtYXliZU1lbnUgPSBjb252ZXJ0TWVudShtZW51VGVtcGxhdGUsIGV4ZWN1dGVNZW51Um9sZSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiVGl0bGVCYXJDb250YWluZXJcIj5cbiAgICAgIDxUaXRsZUJhclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ1RpdGxlQmFyQ29udGFpbmVyX190aXRsZScsXG5cbiAgICAgICAgICAvLyBBZGQgYSBwaXhlbCBvZiBwYWRkaW5nIG9uIG5vbi1tYXhpbWl6ZWQgV2luZG93cyAxMSB0aXRsZWJhci5cbiAgICAgICAgICBpc1dpbmRvd3MxMSAmJiAhaXNNYXhpbWl6ZWRcbiAgICAgICAgICAgID8gJ1RpdGxlQmFyQ29udGFpbmVyX190aXRsZS0tZXh0cmEtcGFkZGluZydcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApfVxuICAgICAgICBwbGF0Zm9ybT17cGxhdGZvcm19XG4gICAgICAgIGljb25TcmM9e2ljb25TcmN9XG4gICAgICAgIHRoZW1lPXt0aXRsZUJhclRoZW1lfVxuICAgICAgICBtYXhpbWl6ZWQ9e2lzTWF4aW1pemVkfVxuICAgICAgICBtZW51PXttYXliZU1lbnV9XG4gICAgICAgIG9uRG91YmxlQ2xpY2s9e3RpdGxlQmFyRG91YmxlQ2xpY2t9XG4gICAgICAgIGhpZGVDb250cm9sc1xuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJUaXRsZUJhckNvbnRhaW5lcl9fY29udGVudFwiPntjaGlsZHJlbn08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQStCO0FBRS9CLGdDQUFxQjtBQUdyQix3QkFBdUI7QUFFdkIsa0JBQStCO0FBQy9CLGtCQUEwQjtBQStCMUIsTUFBTSxrQkFBa0I7QUFHeEIsTUFBTSxzQkFBc0Isb0JBQUksSUFHOUI7QUFDRixvQkFBb0IsSUFBSSxRQUFRLGFBQWE7QUFDN0Msb0JBQW9CLElBQUksUUFBUSxhQUFhO0FBQzdDLG9CQUFvQixJQUFJLE9BQU8sYUFBYTtBQUM1QyxvQkFBb0IsSUFBSSxRQUFRLGFBQWE7QUFDN0Msb0JBQW9CLElBQUksU0FBUyxhQUFhO0FBQzlDLG9CQUFvQixJQUFJLHNCQUFzQixtQkFBbUI7QUFDakUsb0JBQW9CLElBQUksYUFBYSxhQUFhO0FBQ2xELG9CQUFvQixJQUFJLGFBQWEsYUFBYTtBQUNsRCxvQkFBb0IsSUFBSSxVQUFVLGFBQWE7QUFDL0Msb0JBQW9CLElBQUksV0FBVyxhQUFhO0FBQ2hELG9CQUFvQixJQUFJLG9CQUFvQixLQUFLO0FBQ2pELG9CQUFvQixJQUFJLGtCQUFrQixtQkFBbUI7QUFDN0Qsb0JBQW9CLElBQUksWUFBWSxhQUFhO0FBRWpELHFCQUNFLFVBQ0EsaUJBQ2lCO0FBQ2pCLFNBQU8sU0FBUyxJQUFJLFVBQVE7QUFDMUIsVUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsTUFDQSxhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVDtBQUFBLFFBQ0U7QUFDSixRQUFJO0FBRUosUUFBSSxNQUFNLFFBQVEsZUFBZSxHQUFHO0FBQ2xDLGdCQUFVLFlBQVksaUJBQWlCLGVBQWU7QUFBQSxJQUN4RCxXQUFXLGlCQUFpQjtBQUMxQixZQUFNLElBQUksTUFBTSxvQ0FBb0M7QUFBQSxJQUN0RDtBQUVBLFFBQUk7QUFDSixRQUFJLGVBQWU7QUFDakIsVUFBSSxNQUFNO0FBQ1IsY0FBTSxJQUFJLE1BQU0sY0FBYywrQkFBK0I7QUFBQSxNQUMvRDtBQUdBLGNBQVE7QUFBQSxJQUNWLFdBQVcsTUFBTTtBQUNmLGNBQVEsNkJBQU0sZ0JBQWdCLElBQUksR0FBMUI7QUFBQSxJQUNWO0FBRUEsUUFBSTtBQUNKLFFBQUkscUJBQXFCO0FBQ3ZCLG9CQUFjLG9CQUFvQixTQUFTO0FBQUEsSUFDN0MsV0FBVyxNQUFNO0FBQ2Ysb0JBQWMsb0JBQW9CLElBQUksSUFBSTtBQUFBLElBQzVDO0FBRUEsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBaERTLEFBa0RGLE1BQU0sb0JBQW9CLHdCQUFDLFVBQWtDO0FBQ2xFLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUjtBQUVKLFFBQU0sZ0JBQWdCLDBCQUNwQixNQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFFSCxRQUFRO0FBQUEsTUFDUixTQUNFLFVBQVUsc0JBQVUsUUFBUyxVQUFxQjtBQUFBLFNBQ2hELFVBQVUsc0JBQVUsT0FDcEI7QUFBQSxRQUVFLE9BQU87QUFBQSxRQUVQLFlBQVk7QUFBQSxRQUVaLGNBQWM7QUFBQSxRQUVkLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxZQUVOLE9BQU87QUFBQSxZQUVQLFlBQVk7QUFBQSxVQUNkO0FBQUEsVUFDQSxPQUFPO0FBQUEsWUFFTCxPQUFPO0FBQUEsWUFFUCxZQUFZO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLElBQ0EsQ0FBQztBQUFBLElBQ1A7QUFBQSxJQUdBLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxVQUFVO0FBQUEsU0FFTixVQUFVLHNCQUFVLE9BQ3BCO0FBQUEsUUFDRSxXQUFXO0FBQUEsVUFFVCxPQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsYUFBYTtBQUFBLFVBRVgsT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUVKLFlBQVk7QUFBQSxVQUNaLFdBQVc7QUFBQSxVQUNYLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0YsSUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFVBQ0osV0FBVztBQUFBLFVBQ1gsY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBLElBQ047QUFBQSxJQUdBLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQixPQUFlO0FBQzdCLGFBQU8sUUFBUTtBQUFBLElBQ2pCO0FBQUEsRUFDRixJQUNBLENBQUMsT0FBTyxXQUFXLENBQ3JCO0FBRUEsTUFBSSxhQUFhLFdBQVcsY0FBYztBQUN4QyxXQUFPLHdGQUFHLFFBQVM7QUFBQSxFQUNyQjtBQUVBLE1BQUk7QUFDSixNQUFJLFNBQVM7QUFDWCxVQUFNLEVBQUUsZ0JBQWdCLGFBQWEsc0JBQXNCO0FBRTNELFVBQU0sZUFBZSxnQ0FDbkI7QUFBQSxTQUNLO0FBQUEsTUFHSCxhQUFhLE1BQU0sa0JBQWtCLGFBQWE7QUFBQSxNQUNsRCxlQUFlLE1BQU0sa0JBQWtCLGVBQWU7QUFBQSxNQUN0RCxZQUFZLE1BQU0sa0JBQWtCLFlBQVk7QUFBQSxNQUNoRCxpQkFBaUIsTUFBTSxrQkFBa0IsaUJBQWlCO0FBQUEsTUFDMUQsa0JBQWtCLE1BQU0sa0JBQWtCLGtCQUFrQjtBQUFBLE1BQzVELGlCQUFpQixNQUFNLGtCQUFrQixpQkFBaUI7QUFBQSxNQUMxRCxrQkFBa0IsTUFBTSxrQkFBa0Isa0JBQWtCO0FBQUEsTUFDNUQsbUJBQW1CLE1BQU0sa0JBQWtCLG1CQUFtQjtBQUFBLE1BQzlELFdBQVcsTUFBTSxrQkFBa0IsV0FBVztBQUFBLE1BQzlDLGNBQWMsTUFBTSxrQkFBa0IsY0FBYztBQUFBLE1BQ3BELHVCQUF1QixNQUFNLGtCQUFrQix1QkFBdUI7QUFBQSxNQUN0RSxjQUFjLE1BQU0sa0JBQWtCLGNBQWM7QUFBQSxNQUNwRCxvQkFBb0IsTUFBTSxrQkFBa0Isb0JBQW9CO0FBQUEsTUFDaEUsWUFBWSxNQUFNLGtCQUFrQixZQUFZO0FBQUEsSUFDbEQsR0FDQSxjQUNGO0FBRUEsZ0JBQVksWUFBWSxjQUFjLGVBQWU7QUFBQSxFQUN2RDtBQUVBLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULDRCQUdBLGVBQWUsQ0FBQyxjQUNaLDRDQUNBLElBQ047QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YsY0FBWTtBQUFBLEdBQ2QsR0FFQSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQThCLFFBQVMsQ0FDeEQ7QUFFSixHQW5KaUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
