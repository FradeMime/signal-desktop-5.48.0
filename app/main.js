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
var main_exports = {};
__export(main_exports, {
  windowConfigSchema: () => windowConfigSchema
});
module.exports = __toCommonJS(main_exports);
var import_patchWindows7Hostname = require("../ts/util/patchWindows7Hostname");
var import_path = require("path");
var import_url = require("url");
var os = __toESM(require("os"));
var import_fs_extra = require("fs-extra");
var import_crypto = require("crypto");
var import_normalize_path = __toESM(require("normalize-path"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_p_queue = __toESM(require("p-queue"));
var import_lodash = require("lodash");
var import_electron = require("electron");
var import_zod = require("zod");
var import_package = __toESM(require("../package.json"));
var GlobalErrors = __toESM(require("./global_errors"));
var import_crashReports = require("./crashReports");
var import_spell_check = require("./spell_check");
var import_privacy = require("../ts/util/privacy");
var import_createSupportUrl = require("../ts/util/createSupportUrl");
var import_missingCaseError = require("../ts/util/missingCaseError");
var import_assert = require("../ts/util/assert");
var import_consoleLogger = require("../ts/util/consoleLogger");
var import_Util = require("../ts/types/Util");
var import_startup_config = require("./startup_config");
var import_RendererConfig = require("../ts/types/RendererConfig");
var import_config = __toESM(require("./config"));
var import_environment = require("../ts/environment");
var userConfig = __toESM(require("./user_config"));
var attachments = __toESM(require("./attachments"));
var attachmentChannel = __toESM(require("./attachment_channel"));
var bounce = __toESM(require("../ts/services/bounce"));
var updater = __toESM(require("../ts/updater/index"));
var import_updateDefaultSession = require("./updateDefaultSession");
var import_PreventDisplaySleepService = require("./PreventDisplaySleepService");
var import_SystemTrayService = require("./SystemTrayService");
var import_SystemTraySettingCache = require("./SystemTraySettingCache");
var import_SystemTraySetting = require("../ts/types/SystemTraySetting");
var ephemeralConfig = __toESM(require("./ephemeral_config"));
var logging = __toESM(require("../ts/logging/main_process_logging"));
var import_main = require("../ts/sql/main");
var sqlChannels = __toESM(require("./sql_channel"));
var windowState = __toESM(require("./window_state"));
var import_menu = require("./menu");
var import_protocol_filter = require("./protocol_filter");
var OS = __toESM(require("../ts/OS"));
var import_version = require("../ts/util/version");
var import_sgnlHref = require("../ts/util/sgnlHref");
var import_clearTimeoutIfNecessary = require("../ts/util/clearTimeoutIfNecessary");
var import_toggleMaximizedBrowserWindow = require("../ts/util/toggleMaximizedBrowserWindow");
var import_challengeMain = require("../ts/main/challengeMain");
var import_NativeThemeNotifier = require("../ts/main/NativeThemeNotifier");
var import_powerChannel = require("../ts/main/powerChannel");
var import_settingsChannel = require("../ts/main/settingsChannel");
var import_url2 = require("../ts/util/url");
var import_heicConverterMain = require("../ts/workers/heicConverterMain");
var import_locale = require("./locale");
const animationSettings = import_electron.systemPreferences.getAnimationSettings();
let mainWindow;
let mainWindowCreated = false;
let loadingWindow;
const activeWindows = /* @__PURE__ */ new Set();
function getMainWindow() {
  return mainWindow;
}
const development = (0, import_environment.getEnvironment)() === import_environment.Environment.Development || (0, import_environment.getEnvironment)() === import_environment.Environment.Staging;
const isThrottlingEnabled = development || !(0, import_version.isProduction)(import_electron.app.getVersion());
const enableCI = import_config.default.get("enableCI");
const forcePreloadBundle = import_config.default.get("forcePreloadBundle");
const preventDisplaySleepService = new import_PreventDisplaySleepService.PreventDisplaySleepService(import_electron.powerSaveBlocker);
const challengeHandler = new import_challengeMain.ChallengeMainHandler();
const nativeThemeNotifier = new import_NativeThemeNotifier.NativeThemeNotifier();
nativeThemeNotifier.initialize();
let appStartInitialSpellcheckSetting = true;
const defaultWebPrefs = {
  devTools: process.argv.some((arg) => arg === "--enable-dev-tools") || (0, import_environment.getEnvironment)() !== import_environment.Environment.Production || !(0, import_version.isProduction)(import_electron.app.getVersion()),
  spellcheck: false
};
function showWindow() {
  if (!mainWindow) {
    return;
  }
  if (mainWindow.isVisible()) {
    mainWindow.focus();
  } else {
    mainWindow.show();
  }
}
if (!process.mas) {
  console.log("making app single instance");
  const gotLock = import_electron.app.requestSingleInstanceLock();
  if (!gotLock) {
    console.log("quitting; we are the second instance");
    import_electron.app.exit();
  } else {
    import_electron.app.on("second-instance", (_e, argv) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        showWindow();
      }
      if (!logger) {
        console.log("second-instance: logger not initialized; skipping further checks");
        return;
      }
      const incomingCaptchaHref = getIncomingCaptchaHref(argv);
      if (incomingCaptchaHref) {
        const { captcha } = (0, import_sgnlHref.parseCaptchaHref)(incomingCaptchaHref, getLogger());
        challengeHandler.handleCaptcha(captcha);
        return true;
      }
      const incomingHref = getIncomingHref(argv);
      if (incomingHref) {
        handleSgnlHref(incomingHref);
      }
      return true;
    });
  }
}
let sqlInitTimeStart = 0;
let sqlInitTimeEnd = 0;
const sql = new import_main.MainSQL();
const heicConverter = (0, import_heicConverterMain.getHeicConverter)();
async function getSpellCheckSetting() {
  const fastValue = ephemeralConfig.get("spell-check");
  if (fastValue !== void 0) {
    getLogger().info("got fast spellcheck setting", fastValue);
    return fastValue;
  }
  const json = await sql.sqlCall("getItemById", ["spell-check"]);
  const slowValue = json ? json.value : true;
  ephemeralConfig.set("spell-check", slowValue);
  getLogger().info("got slow spellcheck setting", slowValue);
  return slowValue;
}
async function getThemeSetting({
  ephemeralOnly = false
} = {}) {
  const fastValue = ephemeralConfig.get("theme-setting");
  if (fastValue !== void 0) {
    getLogger().info("got fast theme-setting value", fastValue);
    return fastValue;
  }
  if (ephemeralOnly) {
    return "system";
  }
  const json = await sql.sqlCall("getItemById", ["theme-setting"]);
  const setting = json?.value;
  const slowValue = setting === "light" || setting === "dark" || setting === "system" ? setting : "system";
  ephemeralConfig.set("theme-setting", slowValue);
  getLogger().info("got slow theme-setting value", slowValue);
  return slowValue;
}
async function getResolvedThemeSetting(options) {
  const theme = await getThemeSetting(options);
  if (theme === "system") {
    return import_electron.nativeTheme.shouldUseDarkColors ? import_Util.ThemeType.dark : import_Util.ThemeType.light;
  }
  return import_Util.ThemeType[theme];
}
async function getBackgroundColor(options) {
  const theme = await getResolvedThemeSetting(options);
  if (theme === "light") {
    return "#3a76f0";
  }
  if (theme === "dark") {
    return "#121212";
  }
  throw (0, import_missingCaseError.missingCaseError)(theme);
}
let systemTrayService;
const systemTraySettingCache = new import_SystemTraySettingCache.SystemTraySettingCache(sql, ephemeralConfig, process.argv, import_electron.app.getVersion());
const windowFromUserConfig = userConfig.get("window");
const windowFromEphemeral = ephemeralConfig.get("window");
const windowConfigSchema = import_zod.z.object({
  maximized: import_zod.z.boolean().optional(),
  autoHideMenuBar: import_zod.z.boolean().optional(),
  fullscreen: import_zod.z.boolean().optional(),
  width: import_zod.z.number(),
  height: import_zod.z.number(),
  x: import_zod.z.number(),
  y: import_zod.z.number()
});
let windowConfig;
const windowConfigParsed = windowConfigSchema.safeParse(windowFromEphemeral || windowFromUserConfig);
if (windowConfigParsed.success) {
  windowConfig = windowConfigParsed.data;
}
if (windowFromUserConfig) {
  userConfig.set("window", null);
  ephemeralConfig.set("window", windowConfig);
}
let menuOptions;
let logger;
let locale;
let settingsChannel;
function getLogger() {
  if (!logger) {
    console.warn("getLogger: Logger not yet initialized!");
    return import_consoleLogger.consoleLogger;
  }
  return logger;
}
function getLocale() {
  if (!locale) {
    throw new Error("getLocale: Locale not yet initialized!");
  }
  return locale;
}
async function prepareFileUrl(pathSegments, options = {}) {
  const filePath = (0, import_path.join)(...pathSegments);
  const fileUrl = (0, import_url.pathToFileURL)(filePath);
  return prepareUrl(fileUrl, options);
}
async function prepareUrl(url, { forCalling, forCamera } = {}) {
  const theme = await getResolvedThemeSetting();
  const directoryConfig = import_RendererConfig.directoryConfigSchema.safeParse({
    directoryVersion: import_config.default.get("directoryVersion") || 1,
    directoryUrl: import_config.default.get("directoryUrl") || void 0,
    directoryEnclaveId: import_config.default.get("directoryEnclaveId") || void 0,
    directoryTrustAnchor: import_config.default.get("directoryTrustAnchor") || void 0,
    directoryV2Url: import_config.default.get("directoryV2Url") || void 0,
    directoryV2PublicKey: import_config.default.get("directoryV2PublicKey") || void 0,
    directoryV2CodeHashes: import_config.default.get("directoryV2CodeHashes") || void 0,
    directoryV3Url: import_config.default.get("directoryV3Url") || void 0,
    directoryV3MRENCLAVE: import_config.default.get("directoryV3MRENCLAVE") || void 0,
    directoryV3Root: import_config.default.get("directoryV3Root") || void 0
  });
  if (!directoryConfig.success) {
    throw new Error(`prepareUrl: Failed to parse renderer directory config ${JSON.stringify(directoryConfig.error.flatten())}`);
  }
  const urlParams = {
    name: import_package.default.productName,
    locale: getLocale().name,
    version: import_electron.app.getVersion(),
    buildCreation: import_config.default.get("buildCreation"),
    buildExpiration: import_config.default.get("buildExpiration"),
    serverUrl: import_config.default.get("serverUrl"),
    storageUrl: import_config.default.get("storageUrl"),
    updatesUrl: import_config.default.get("updatesUrl"),
    cdnUrl0: import_config.default.get("cdn").get("0"),
    cdnUrl2: import_config.default.get("cdn").get("2"),
    certificateAuthority: import_config.default.get("certificateAuthority"),
    environment: enableCI ? import_environment.Environment.Production : (0, import_environment.getEnvironment)(),
    enableCI,
    nodeVersion: process.versions.node,
    hostname: os.hostname(),
    appInstance: process.env.NODE_APP_INSTANCE || void 0,
    proxyUrl: process.env.HTTPS_PROXY || process.env.https_proxy || void 0,
    contentProxyUrl: import_config.default.get("contentProxyUrl"),
    sfuUrl: import_config.default.get("sfuUrl"),
    reducedMotionSetting: animationSettings.prefersReducedMotion,
    serverPublicParams: import_config.default.get("serverPublicParams"),
    serverTrustRoot: import_config.default.get("serverTrustRoot"),
    theme,
    appStartInitialSpellcheckSetting,
    userDataPath: import_electron.app.getPath("userData"),
    homePath: import_electron.app.getPath("home"),
    crashDumpsPath: import_electron.app.getPath("crashDumps"),
    directoryConfig: directoryConfig.data,
    isMainWindowFullScreen: Boolean(mainWindow?.isFullScreen()),
    argv: JSON.stringify(process.argv),
    forCalling: Boolean(forCalling),
    forCamera: Boolean(forCamera)
  };
  const parsed = import_RendererConfig.rendererConfigSchema.safeParse(urlParams);
  if (!parsed.success) {
    throw new Error(`prepareUrl: Failed to parse renderer config ${JSON.stringify(parsed.error.flatten())}`);
  }
  return (0, import_url2.setUrlSearchParams)(url, { config: JSON.stringify(parsed.data) }).href;
}
async function handleUrl(event, rawTarget) {
  event.preventDefault();
  const parsedUrl = (0, import_url2.maybeParseUrl)(rawTarget);
  if (!parsedUrl) {
    return;
  }
  const target = (0, import_sgnlHref.rewriteSignalHrefsIfNecessary)(rawTarget);
  const { protocol, hostname } = parsedUrl;
  const isDevServer = process.env.SIGNAL_ENABLE_HTTP && hostname === "localhost";
  if ((0, import_sgnlHref.isSgnlHref)(target, getLogger()) || (0, import_sgnlHref.isSignalHttpsLink)(target, getLogger())) {
    handleSgnlHref(target);
    return;
  }
  if ((protocol === "http:" || protocol === "https:") && !isDevServer) {
    try {
      await import_electron.shell.openExternal(target);
    } catch (error) {
      getLogger().error(`Failed to open url: ${error.stack}`);
    }
  }
}
function handleCommonWindowEvents(window, titleBarOverlay = false) {
  window.webContents.on("will-navigate", handleUrl);
  window.webContents.on("new-window", handleUrl);
  window.webContents.on("preload-error", (_event, preloadPath, error) => {
    getLogger().error(`Preload error in ${preloadPath}: `, error.message);
  });
  activeWindows.add(window);
  window.on("closed", () => activeWindows.delete(window));
  let lastZoomFactor = window.webContents.getZoomFactor();
  const onZoomChanged = /* @__PURE__ */ __name(() => {
    if (window.isDestroyed() || !window.webContents || window.webContents.isDestroyed()) {
      return;
    }
    const zoomFactor = window.webContents.getZoomFactor();
    if (lastZoomFactor === zoomFactor) {
      return;
    }
    settingsChannel?.invokeCallbackInMainWindow("persistZoomFactor", [
      zoomFactor
    ]);
    lastZoomFactor = zoomFactor;
  }, "onZoomChanged");
  window.webContents.on("preferred-size-changed", onZoomChanged);
  nativeThemeNotifier.addWindow(window);
  if (titleBarOverlay) {
    const onThemeChange = /* @__PURE__ */ __name(async () => {
      try {
        const newOverlay = await getTitleBarOverlay();
        if (!newOverlay) {
          return;
        }
        window.setTitleBarOverlay(newOverlay);
      } catch (error) {
        console.error("onThemeChange error", error);
      }
    }, "onThemeChange");
    import_electron.nativeTheme.on("updated", onThemeChange);
    settingsChannel?.on("change:themeSetting", onThemeChange);
  }
}
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 610;
const MIN_WIDTH = 712;
const MIN_HEIGHT = 550;
const BOUNDS_BUFFER = 100;
function isVisible(window, bounds) {
  const boundsX = bounds?.x || 0;
  const boundsY = bounds?.y || 0;
  const boundsWidth = bounds?.width || DEFAULT_WIDTH;
  const boundsHeight = bounds?.height || DEFAULT_HEIGHT;
  const rightSideClearOfLeftBound = window.x + window.width >= boundsX + BOUNDS_BUFFER;
  const leftSideClearOfRightBound = window.x <= boundsX + boundsWidth - BOUNDS_BUFFER;
  const topClearOfUpperBound = window.y >= boundsY;
  const topClearOfLowerBound = window.y <= boundsY + boundsHeight - BOUNDS_BUFFER;
  return rightSideClearOfLeftBound && leftSideClearOfRightBound && topClearOfUpperBound && topClearOfLowerBound;
}
let windowIcon;
if (OS.isWindows()) {
  windowIcon = (0, import_path.join)(__dirname, "../build/icons/win/icon.ico");
} else if (OS.isLinux()) {
  windowIcon = (0, import_path.join)(__dirname, "../images/signal-logo-desktop-linux.png");
} else {
  windowIcon = (0, import_path.join)(__dirname, "../build/icons/png/512x512.png");
}
const mainTitleBarStyle = OS.isLinux() || (0, import_environment.isTestEnvironment)((0, import_environment.getEnvironment)()) ? "default" : "hidden";
const nonMainTitleBarStyle = OS.isWindows() ? "hidden" : "default";
async function getTitleBarOverlay() {
  if (!OS.isWindows()) {
    return false;
  }
  const theme = await getResolvedThemeSetting();
  let color;
  let symbolColor;
  if (theme === "light") {
    color = "#e8e8e8";
    symbolColor = "#1b1b1b";
  } else if (theme === "dark") {
    color = "#2e2e2e";
    symbolColor = "#e9e9e9";
  } else {
    throw (0, import_missingCaseError.missingCaseError)(theme);
  }
  return {
    color,
    symbolColor,
    height: 28
  };
}
async function createWindow() {
  const usePreloadBundle = !(0, import_environment.isTestEnvironment)((0, import_environment.getEnvironment)()) || forcePreloadBundle;
  const titleBarOverlay = await getTitleBarOverlay();
  const windowOptions = {
    show: false,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    autoHideMenuBar: false,
    titleBarStyle: mainTitleBarStyle,
    titleBarOverlay,
    backgroundColor: (0, import_environment.isTestEnvironment)((0, import_environment.getEnvironment)()) ? "#ffffff" : await getBackgroundColor(),
    webPreferences: {
      ...defaultWebPrefs,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      preload: (0, import_path.join)(__dirname, usePreloadBundle ? "../preload.bundle.js" : "../ts/windows/main/preload.js"),
      spellcheck: await getSpellCheckSetting(),
      backgroundThrottling: isThrottlingEnabled,
      enablePreferredSizeMode: true,
      disableBlinkFeatures: "Accelerated2dCanvas,AcceleratedSmallCanvases"
    },
    icon: windowIcon,
    ...(0, import_lodash.pick)(windowConfig, ["autoHideMenuBar", "width", "height", "x", "y"])
  };
  if (!(0, import_lodash.isNumber)(windowOptions.width) || windowOptions.width < MIN_WIDTH) {
    windowOptions.width = DEFAULT_WIDTH;
  }
  if (!(0, import_lodash.isNumber)(windowOptions.height) || windowOptions.height < MIN_HEIGHT) {
    windowOptions.height = DEFAULT_HEIGHT;
  }
  if (!(0, import_lodash.isBoolean)(windowOptions.autoHideMenuBar)) {
    delete windowOptions.autoHideMenuBar;
  }
  const startInTray = await systemTraySettingCache.get() === import_SystemTraySetting.SystemTraySetting.MinimizeToAndStartInSystemTray;
  const visibleOnAnyScreen = (0, import_lodash.some)(import_electron.screen.getAllDisplays(), (display) => {
    if ((0, import_lodash.isNumber)(windowOptions.x) && (0, import_lodash.isNumber)(windowOptions.y) && (0, import_lodash.isNumber)(windowOptions.width) && (0, import_lodash.isNumber)(windowOptions.height)) {
      return isVisible(windowOptions, (0, import_lodash.get)(display, "bounds"));
    }
    getLogger().error("visibleOnAnyScreen: windowOptions didn't have valid bounds fields");
    return false;
  });
  if (!visibleOnAnyScreen) {
    getLogger().info("Location reset needed");
    delete windowOptions.x;
    delete windowOptions.y;
  }
  getLogger().info("Initializing BrowserWindow config:", JSON.stringify(windowOptions));
  mainWindow = new import_electron.BrowserWindow(windowOptions);
  if (settingsChannel) {
    settingsChannel.setMainWindow(mainWindow);
  }
  mainWindowCreated = true;
  (0, import_spell_check.setup)(mainWindow, getLocale());
  if (!startInTray && windowConfig && windowConfig.maximized) {
    mainWindow.maximize();
  }
  if (!startInTray && windowConfig && windowConfig.fullscreen) {
    mainWindow.setFullScreen(true);
  }
  if (systemTrayService) {
    systemTrayService.setMainWindow(mainWindow);
  }
  function saveWindowStats() {
    if (!windowConfig) {
      return;
    }
    getLogger().info("Updating BrowserWindow config: %s", JSON.stringify(windowConfig));
    ephemeralConfig.set("window", windowConfig);
  }
  const debouncedSaveStats = (0, import_lodash.debounce)(saveWindowStats, 500);
  function captureWindowStats() {
    if (!mainWindow) {
      return;
    }
    const size = mainWindow.getSize();
    const position = mainWindow.getPosition();
    const newWindowConfig = {
      maximized: mainWindow.isMaximized(),
      autoHideMenuBar: mainWindow.autoHideMenuBar,
      fullscreen: mainWindow.isFullScreen(),
      width: size[0],
      height: size[1],
      x: position[0],
      y: position[1]
    };
    if (newWindowConfig.fullscreen !== windowConfig?.fullscreen || newWindowConfig.maximized !== windowConfig?.maximized) {
      mainWindow.webContents.send("window:set-window-stats", {
        isMaximized: newWindowConfig.maximized,
        isFullScreen: newWindowConfig.fullscreen
      });
    }
    windowConfig = newWindowConfig;
    debouncedSaveStats();
  }
  mainWindow.on("resize", captureWindowStats);
  mainWindow.on("move", captureWindowStats);
  const setWindowFocus = /* @__PURE__ */ __name(() => {
    if (!mainWindow) {
      return;
    }
    mainWindow.webContents.send("set-window-focus", mainWindow.isFocused());
  }, "setWindowFocus");
  mainWindow.on("focus", setWindowFocus);
  mainWindow.on("blur", setWindowFocus);
  mainWindow.once("ready-to-show", setWindowFocus);
  setInterval(setWindowFocus, 1e4);
  if ((0, import_environment.getEnvironment)() === import_environment.Environment.Test) {
    mainWindow.loadURL(await prepareFileUrl([__dirname, "../test/index.html"]));
  } else {
    mainWindow.loadURL(await prepareFileUrl([__dirname, "../background.html"]));
  }
  if (!enableCI && import_config.default.get("openDevTools")) {
    mainWindow.webContents.openDevTools();
  }
  handleCommonWindowEvents(mainWindow, titleBarOverlay);
  bounce.init(mainWindow);
  mainWindow.on("close", async (e) => {
    if (!mainWindow) {
      getLogger().info("close event: no main window");
      return;
    }
    getLogger().info("close event", {
      readyForShutdown: windowState.readyForShutdown(),
      shouldQuit: windowState.shouldQuit()
    });
    if ((0, import_environment.isTestEnvironment)((0, import_environment.getEnvironment)()) || windowState.readyForShutdown() && windowState.shouldQuit()) {
      return;
    }
    e.preventDefault();
    if (mainWindow.isFullScreen()) {
      mainWindow.once("leave-full-screen", () => mainWindow?.hide());
      mainWindow.setFullScreen(false);
    } else {
      mainWindow.hide();
    }
    const usingTrayIcon = (0, import_SystemTraySetting.shouldMinimizeToSystemTray)(await systemTraySettingCache.get());
    if (!windowState.shouldQuit() && (usingTrayIcon || OS.isMacOS())) {
      return;
    }
    await requestShutdown();
    windowState.markReadyForShutdown();
    await sql.close();
    import_electron.app.quit();
  });
  mainWindow.on("closed", () => {
    mainWindow = void 0;
    if (settingsChannel) {
      settingsChannel.setMainWindow(mainWindow);
    }
    if (systemTrayService) {
      systemTrayService.setMainWindow(mainWindow);
    }
  });
  mainWindow.on("enter-full-screen", () => {
    if (mainWindow) {
      mainWindow.webContents.send("full-screen-change", true);
    }
  });
  mainWindow.on("leave-full-screen", () => {
    if (mainWindow) {
      mainWindow.webContents.send("full-screen-change", false);
    }
  });
  mainWindow.once("ready-to-show", async () => {
    getLogger().info("main window is ready-to-show");
    await sqlInitPromise;
    if (!mainWindow) {
      return;
    }
    const shouldShowWindow = !import_electron.app.getLoginItemSettings().wasOpenedAsHidden && !startInTray;
    if (shouldShowWindow) {
      getLogger().info("showing main window");
      mainWindow.show();
    }
  });
}
import_electron.ipcMain.on("database-ready", async (event) => {
  if (!sqlInitPromise) {
    getLogger().error("database-ready requested, but sqlInitPromise is falsey");
    return;
  }
  const { error } = await sqlInitPromise;
  if (error) {
    getLogger().error("database-ready requested, but got sql error", error && error.stack);
    return;
  }
  getLogger().info("sending `database-ready`");
  event.sender.send("database-ready");
});
import_electron.ipcMain.on("show-window", () => {
  showWindow();
});
import_electron.ipcMain.on("title-bar-double-click", () => {
  if (!mainWindow) {
    return;
  }
  if (OS.isMacOS()) {
    switch (import_electron.systemPreferences.getUserDefault("AppleActionOnDoubleClick", "string")) {
      case "Minimize":
        mainWindow.minimize();
        break;
      case "Maximize":
        (0, import_toggleMaximizedBrowserWindow.toggleMaximizedBrowserWindow)(mainWindow);
        break;
      default:
        break;
    }
  } else {
    (0, import_toggleMaximizedBrowserWindow.toggleMaximizedBrowserWindow)(mainWindow);
  }
});
import_electron.ipcMain.on("set-is-call-active", (_event, isCallActive) => {
  preventDisplaySleepService.setEnabled(isCallActive);
  if (!mainWindow) {
    return;
  }
  if (!isThrottlingEnabled) {
    return;
  }
  let backgroundThrottling;
  if (isCallActive) {
    getLogger().info("Background throttling disabled because a call is active");
    backgroundThrottling = false;
  } else {
    getLogger().info("Background throttling enabled because no call is active");
    backgroundThrottling = true;
  }
  mainWindow.webContents.setBackgroundThrottling(backgroundThrottling);
});
import_electron.ipcMain.on("convert-image", async (event, uuid, data) => {
  const { error, response } = await heicConverter(uuid, data);
  event.reply(`convert-image:${uuid}`, { error, response });
});
let isReadyForUpdates = false;
async function readyForUpdates() {
  if (isReadyForUpdates) {
    return;
  }
  isReadyForUpdates = true;
  const incomingHref = getIncomingHref(process.argv);
  if (incomingHref) {
    handleSgnlHref(incomingHref);
  }
  try {
    (0, import_assert.strictAssert)(settingsChannel !== void 0, "SettingsChannel must be initialized");
    await updater.start(settingsChannel, getLogger(), getMainWindow);
  } catch (error) {
    getLogger().error("Error starting update checks:", error && error.stack ? error.stack : error);
  }
}
async function forceUpdate() {
  try {
    getLogger().info("starting force update");
    await updater.force();
  } catch (error) {
    getLogger().error("Error during force update:", error && error.stack ? error.stack : error);
  }
}
import_electron.ipcMain.once("ready-for-updates", readyForUpdates);
const TEN_MINUTES = 10 * 60 * 1e3;
setTimeout(readyForUpdates, TEN_MINUTES);
function openContactUs() {
  import_electron.shell.openExternal((0, import_createSupportUrl.createSupportUrl)({ locale: import_electron.app.getLocale() }));
}
function openJoinTheBeta() {
  import_electron.shell.openExternal("https://support.signal.org/hc/articles/360007318471");
}
function openReleaseNotes() {
  if (mainWindow && mainWindow.isVisible()) {
    mainWindow.webContents.send("show-release-notes");
    return;
  }
  import_electron.shell.openExternal(`https://github.com/signalapp/Signal-Desktop/releases/tag/v${import_electron.app.getVersion()}`);
}
function openSupportPage() {
  import_electron.shell.openExternal("https://support.signal.org/hc/sections/360001602812");
}
function openForums() {
  import_electron.shell.openExternal("https://community.signalusers.org/");
}
function showKeyboardShortcuts() {
  if (mainWindow) {
    mainWindow.webContents.send("show-keyboard-shortcuts");
  }
}
function setupAsNewDevice() {
  if (mainWindow) {
    mainWindow.webContents.send("set-up-as-new-device");
  }
}
function setupAsStandalone() {
  if (mainWindow) {
    mainWindow.webContents.send("set-up-as-standalone");
  }
}
let screenShareWindow;
async function showScreenShareWindow(sourceName) {
  if (screenShareWindow) {
    screenShareWindow.showInactive();
    return;
  }
  const width = 480;
  const display = import_electron.screen.getPrimaryDisplay();
  const options = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    backgroundColor: "#2e2e2e",
    darkTheme: true,
    frame: false,
    fullscreenable: false,
    height: 44,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    title: getLocale().i18n("screenShareWindow"),
    titleBarStyle: nonMainTitleBarStyle,
    width,
    webPreferences: {
      ...defaultWebPrefs,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "../ts/windows/screenShare/preload.js")
    },
    x: Math.floor(display.size.width / 2) - width / 2,
    y: 24
  };
  screenShareWindow = new import_electron.BrowserWindow(options);
  handleCommonWindowEvents(screenShareWindow);
  screenShareWindow.loadURL(await prepareFileUrl([__dirname, "../screenShare.html"]));
  screenShareWindow.on("closed", () => {
    screenShareWindow = void 0;
  });
  screenShareWindow.once("ready-to-show", () => {
    if (screenShareWindow) {
      screenShareWindow.showInactive();
      screenShareWindow.webContents.send("render-screen-sharing-controller", sourceName);
    }
  });
}
let aboutWindow;
async function showAbout() {
  if (aboutWindow) {
    aboutWindow.show();
    return;
  }
  const titleBarOverlay = await getTitleBarOverlay();
  const options = {
    width: 500,
    height: 500,
    resizable: false,
    title: getLocale().i18n("aboutSignalDesktop"),
    titleBarStyle: nonMainTitleBarStyle,
    titleBarOverlay,
    autoHideMenuBar: true,
    backgroundColor: await getBackgroundColor(),
    show: false,
    webPreferences: {
      ...defaultWebPrefs,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "../ts/windows/about/preload.js"),
      nativeWindowOpen: true
    }
  };
  aboutWindow = new import_electron.BrowserWindow(options);
  handleCommonWindowEvents(aboutWindow, titleBarOverlay);
  aboutWindow.loadURL(await prepareFileUrl([__dirname, "../about.html"]));
  aboutWindow.on("closed", () => {
    aboutWindow = void 0;
  });
  aboutWindow.once("ready-to-show", () => {
    if (aboutWindow) {
      aboutWindow.show();
    }
  });
}
let settingsWindow;
async function showSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.show();
    return;
  }
  const titleBarOverlay = await getTitleBarOverlay();
  const options = {
    width: 700,
    height: 700,
    frame: true,
    resizable: false,
    title: getLocale().i18n("signalDesktopPreferences"),
    titleBarStyle: nonMainTitleBarStyle,
    titleBarOverlay,
    autoHideMenuBar: true,
    backgroundColor: await getBackgroundColor(),
    show: false,
    webPreferences: {
      ...defaultWebPrefs,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "../ts/windows/settings/preload.js"),
      nativeWindowOpen: true
    }
  };
  settingsWindow = new import_electron.BrowserWindow(options);
  handleCommonWindowEvents(settingsWindow, titleBarOverlay);
  settingsWindow.loadURL(await prepareFileUrl([__dirname, "../settings.html"]));
  settingsWindow.on("closed", () => {
    settingsWindow = void 0;
  });
  import_electron.ipcMain.once("settings-done-rendering", () => {
    if (!settingsWindow) {
      getLogger().warn("settings-done-rendering: no settingsWindow available!");
      return;
    }
    settingsWindow.show();
  });
}
async function getIsLinked() {
  try {
    const number = await sql.sqlCall("getItemById", ["number_id"]);
    const password = await sql.sqlCall("getItemById", ["password"]);
    return Boolean(number && password);
  } catch (e) {
    return false;
  }
}
let stickerCreatorWindow;
async function showStickerCreator() {
  if (!await getIsLinked()) {
    const message = getLocale().i18n("StickerCreator--Authentication--error");
    import_electron.dialog.showMessageBox({
      type: "warning",
      message
    });
    return;
  }
  if (stickerCreatorWindow) {
    stickerCreatorWindow.show();
    return;
  }
  const { x = 0, y = 0 } = windowConfig || {};
  const titleBarOverlay = await getTitleBarOverlay();
  const options = {
    x: x + 100,
    y: y + 100,
    width: 800,
    minWidth: 800,
    height: 650,
    title: getLocale().i18n("signalDesktopStickerCreator"),
    titleBarStyle: nonMainTitleBarStyle,
    titleBarOverlay,
    autoHideMenuBar: true,
    backgroundColor: await getBackgroundColor(),
    show: false,
    webPreferences: {
      ...defaultWebPrefs,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      preload: (0, import_path.join)(__dirname, "../sticker-creator/preload.js"),
      nativeWindowOpen: true,
      spellcheck: await getSpellCheckSetting()
    }
  };
  stickerCreatorWindow = new import_electron.BrowserWindow(options);
  (0, import_spell_check.setup)(stickerCreatorWindow, getLocale());
  handleCommonWindowEvents(stickerCreatorWindow, titleBarOverlay);
  const appUrl = process.env.SIGNAL_ENABLE_HTTP ? prepareUrl(new URL("http://localhost:6380/sticker-creator/dist/index.html")) : prepareFileUrl([__dirname, "../sticker-creator/dist/index.html"]);
  stickerCreatorWindow.loadURL(await appUrl);
  stickerCreatorWindow.on("closed", () => {
    stickerCreatorWindow = void 0;
  });
  stickerCreatorWindow.once("ready-to-show", () => {
    if (!stickerCreatorWindow) {
      return;
    }
    stickerCreatorWindow.show();
    if (import_config.default.get("openDevTools")) {
      stickerCreatorWindow.webContents.openDevTools();
    }
  });
}
let debugLogWindow;
async function showDebugLogWindow() {
  if (debugLogWindow) {
    debugLogWindow.show();
    return;
  }
  const titleBarOverlay = await getTitleBarOverlay();
  const options = {
    width: 700,
    height: 500,
    resizable: false,
    title: getLocale().i18n("debugLog"),
    titleBarStyle: nonMainTitleBarStyle,
    titleBarOverlay,
    autoHideMenuBar: true,
    backgroundColor: await getBackgroundColor(),
    show: false,
    webPreferences: {
      ...defaultWebPrefs,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "../ts/windows/debuglog/preload.js"),
      nativeWindowOpen: true
    },
    parent: mainWindow,
    fullscreenable: !OS.isMacOS()
  };
  debugLogWindow = new import_electron.BrowserWindow(options);
  handleCommonWindowEvents(debugLogWindow, titleBarOverlay);
  debugLogWindow.loadURL(await prepareFileUrl([__dirname, "../debug_log.html"]));
  debugLogWindow.on("closed", () => {
    debugLogWindow = void 0;
  });
  debugLogWindow.once("ready-to-show", () => {
    if (debugLogWindow) {
      debugLogWindow.show();
      debugLogWindow.center();
    }
  });
}
let permissionsPopupWindow;
function showPermissionsPopupWindow(forCalling, forCamera) {
  return new Promise(async (resolveFn, reject) => {
    if (permissionsPopupWindow) {
      permissionsPopupWindow.show();
      reject(new Error("Permission window already showing"));
      return;
    }
    if (!mainWindow) {
      reject(new Error("No main window"));
      return;
    }
    const size = mainWindow.getSize();
    const options = {
      width: Math.min(400, size[0]),
      height: Math.min(150, size[1]),
      resizable: false,
      title: getLocale().i18n("allowAccess"),
      titleBarStyle: nonMainTitleBarStyle,
      autoHideMenuBar: true,
      backgroundColor: await getBackgroundColor(),
      show: false,
      modal: true,
      webPreferences: {
        ...defaultWebPrefs,
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        contextIsolation: true,
        preload: (0, import_path.join)(__dirname, "../ts/windows/permissions/preload.js"),
        nativeWindowOpen: true
      },
      parent: mainWindow
    };
    permissionsPopupWindow = new import_electron.BrowserWindow(options);
    handleCommonWindowEvents(permissionsPopupWindow);
    permissionsPopupWindow.loadURL(await prepareFileUrl([__dirname, "../permissions_popup.html"], {
      forCalling,
      forCamera
    }));
    permissionsPopupWindow.on("closed", () => {
      removeDarkOverlay();
      permissionsPopupWindow = void 0;
      resolveFn();
    });
    permissionsPopupWindow.once("ready-to-show", () => {
      if (permissionsPopupWindow) {
        addDarkOverlay();
        permissionsPopupWindow.show();
      }
    });
  });
}
const runSQLCorruptionHandler = /* @__PURE__ */ __name(async () => {
  const error = await sql.whenCorrupted();
  getLogger().error(`Detected sql corruption in main process. Restarting the application immediately. Error: ${error.message}`);
  await onDatabaseError(error.stack || error.message);
}, "runSQLCorruptionHandler");
async function initializeSQL(userDataPath) {
  let key;
  const keyFromConfig = userConfig.get("key");
  if (typeof keyFromConfig === "string") {
    key = keyFromConfig;
  } else if (keyFromConfig) {
    getLogger().warn("initializeSQL: got key from config, but it wasn't a string");
  }
  if (!key) {
    getLogger().info("key/initialize: Generating new encryption key, since we did not find it on disk");
    key = (0, import_crypto.randomBytes)(32).toString("hex");
    userConfig.set("key", key);
  }
  sqlInitTimeStart = Date.now();
  try {
    await sql.initialize({
      configDir: userDataPath,
      key,
      logger: getLogger()
    });
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error };
    }
    return {
      ok: false,
      error: new Error(`initializeSQL: Caught a non-error '${error}'`)
    };
  } finally {
    sqlInitTimeEnd = Date.now();
  }
  runSQLCorruptionHandler();
  return { ok: true, error: void 0 };
}
const onDatabaseError = /* @__PURE__ */ __name(async (error) => {
  ready = false;
  if (mainWindow) {
    settingsChannel?.invokeCallbackInMainWindow("closeDB", []);
    mainWindow.close();
  }
  mainWindow = void 0;
  const buttonIndex = import_electron.dialog.showMessageBoxSync({
    buttons: [
      getLocale().i18n("deleteAndRestart"),
      getLocale().i18n("copyErrorAndQuit")
    ],
    defaultId: 1,
    cancelId: 1,
    detail: (0, import_privacy.redactAll)(error),
    message: getLocale().i18n("databaseError"),
    noLink: true,
    type: "error"
  });
  if (buttonIndex === 1) {
    import_electron.clipboard.writeText(`Database startup error:

${(0, import_privacy.redactAll)(error)}`);
  } else {
    await sql.removeDB();
    userConfig.remove();
    getLogger().error("onDatabaseError: Requesting immediate restart after quit");
    import_electron.app.relaunch();
  }
  getLogger().error("onDatabaseError: Quitting application");
  import_electron.app.exit(1);
}, "onDatabaseError");
let sqlInitPromise;
import_electron.ipcMain.on("database-error", (_event, error) => {
  onDatabaseError(error);
});
function getAppLocale() {
  return (0, import_environment.getEnvironment)() === import_environment.Environment.Test ? "en" : import_electron.app.getLocale();
}
import_electron.app.commandLine.appendSwitch("disable-features", "HardwareMediaKeyHandling");
import_electron.app.commandLine.appendSwitch("password-store", "basic");
let ready = false;
import_electron.app.on("ready", async () => {
  (0, import_updateDefaultSession.updateDefaultSession)(import_electron.session.defaultSession);
  const [userDataPath, crashDumpsPath] = await Promise.all([
    (0, import_fs_extra.realpath)(import_electron.app.getPath("userData")),
    (0, import_fs_extra.realpath)(import_electron.app.getPath("crashDumps"))
  ]);
  logger = await logging.initialize(getMainWindow);
  await (0, import_crashReports.setup)(getLogger);
  if (!locale) {
    const appLocale = getAppLocale();
    locale = (0, import_locale.load)({ appLocale, logger });
  }
  sqlInitPromise = initializeSQL(userDataPath);
  const startTime = Date.now();
  settingsChannel = new import_settingsChannel.SettingsChannel();
  settingsChannel.install();
  import_electron.ipcMain.once("signal-app-loaded", (event, info) => {
    const { preloadTime, connectTime, processedCount } = info;
    const loadTime = Date.now() - startTime;
    const sqlInitTime = sqlInitTimeEnd - sqlInitTimeStart;
    const messageTime = loadTime - preloadTime - connectTime;
    const messagesPerSec = processedCount * 1e3 / messageTime;
    const innerLogger = getLogger();
    innerLogger.info("App loaded - time:", loadTime);
    innerLogger.info("SQL init - time:", sqlInitTime);
    innerLogger.info("Preload - time:", preloadTime);
    innerLogger.info("WebSocket connect - time:", connectTime);
    innerLogger.info("Processed count:", processedCount);
    innerLogger.info("Messages per second:", messagesPerSec);
    event.sender.send("ci:event", "app-loaded", {
      loadTime,
      sqlInitTime,
      preloadTime,
      connectTime,
      processedCount,
      messagesPerSec
    });
  });
  const installPath = await (0, import_fs_extra.realpath)(import_electron.app.getAppPath());
  (0, import_privacy.addSensitivePath)(userDataPath);
  (0, import_privacy.addSensitivePath)(crashDumpsPath);
  if ((0, import_environment.getEnvironment)() !== import_environment.Environment.Test) {
    (0, import_protocol_filter.installFileHandler)({
      protocol: import_electron.protocol,
      userDataPath,
      installPath,
      isWindows: OS.isWindows()
    });
  }
  (0, import_protocol_filter.installWebHandler)({
    enableHttp: Boolean(process.env.SIGNAL_ENABLE_HTTP),
    protocol: import_electron.protocol
  });
  logger.info("app ready");
  logger.info(`starting version ${import_package.default.version}`);
  {
    let getMediaAccessStatus;
    if (import_electron.systemPreferences.getMediaAccessStatus) {
      getMediaAccessStatus = import_electron.systemPreferences.getMediaAccessStatus.bind(import_electron.systemPreferences);
    } else {
      getMediaAccessStatus = import_lodash.noop;
    }
    logger.info("media access status", getMediaAccessStatus("microphone"), getMediaAccessStatus("camera"));
  }
  GlobalErrors.updateLocale(locale.messages);
  const timeout = new Promise((resolveFn) => setTimeout(resolveFn, 3e3, "timeout"));
  const backgroundColor = await getBackgroundColor({ ephemeralOnly: true });
  Promise.race([sqlInitPromise, timeout]).then(async (maybeTimeout) => {
    if (maybeTimeout !== "timeout") {
      return;
    }
    getLogger().info("sql.initialize is taking more than three seconds; showing loading dialog");
    loadingWindow = new import_electron.BrowserWindow({
      show: false,
      width: 300,
      height: 265,
      resizable: false,
      frame: false,
      backgroundColor,
      webPreferences: {
        ...defaultWebPrefs,
        nodeIntegration: false,
        contextIsolation: true,
        preload: (0, import_path.join)(__dirname, "../ts/windows/loading/preload.js")
      },
      icon: windowIcon
    });
    loadingWindow.once("ready-to-show", async () => {
      if (!loadingWindow) {
        return;
      }
      loadingWindow.show();
      await sqlInitPromise;
      loadingWindow.destroy();
      loadingWindow = void 0;
    });
    loadingWindow.loadURL(await prepareFileUrl([__dirname, "../loading.html"]));
  });
  try {
    await attachments.clearTempPath(userDataPath);
  } catch (err) {
    logger.error("main/ready: Error deleting temp dir:", err && err.stack ? err.stack : err);
  }
  attachmentChannel.initialize({
    configDir: userDataPath,
    cleanupOrphanedAttachments
  });
  sqlChannels.initialize(sql);
  import_powerChannel.PowerChannel.initialize({
    send(event) {
      if (!mainWindow) {
        return;
      }
      mainWindow.webContents.send(event);
    }
  });
  await createWindow();
  const { error: sqlError } = await sqlInitPromise;
  if (sqlError) {
    getLogger().error("sql.initialize was unsuccessful; returning early");
    await onDatabaseError(sqlError.stack || sqlError.message);
    return;
  }
  appStartInitialSpellcheckSetting = await getSpellCheckSetting();
  try {
    const IDB_KEY = "indexeddb-delete-needed";
    const item = await sql.sqlCall("getItemById", [IDB_KEY]);
    if (item && item.value) {
      await sql.sqlCall("removeIndexedDBFiles", []);
      await sql.sqlCall("removeItemById", [IDB_KEY]);
    }
  } catch (err) {
    getLogger().error("(ready event handler) error deleting IndexedDB:", err && err.stack ? err.stack : err);
  }
  async function cleanupOrphanedAttachments() {
    const allAttachments = await attachments.getAllAttachments(userDataPath);
    const orphanedAttachments = await sql.sqlCall("removeKnownAttachments", [
      allAttachments
    ]);
    await attachments.deleteAll({
      userDataPath,
      attachments: orphanedAttachments
    });
    await attachments.deleteAllBadges({
      userDataPath,
      pathsToKeep: await sql.sqlCall("getAllBadgeImageFileLocalPaths", [])
    });
    const allStickers = await attachments.getAllStickers(userDataPath);
    const orphanedStickers = await sql.sqlCall("removeKnownStickers", [
      allStickers
    ]);
    await attachments.deleteAllStickers({
      userDataPath,
      stickers: orphanedStickers
    });
    const allDraftAttachments = await attachments.getAllDraftAttachments(userDataPath);
    const orphanedDraftAttachments = await sql.sqlCall("removeKnownDraftAttachments", [allDraftAttachments]);
    await attachments.deleteAllDraftAttachments({
      userDataPath,
      attachments: orphanedDraftAttachments
    });
  }
  ready = true;
  setupMenu();
  systemTrayService = new import_SystemTrayService.SystemTrayService({ messages: locale.messages });
  systemTrayService.setMainWindow(mainWindow);
  systemTrayService.setEnabled((0, import_SystemTraySetting.shouldMinimizeToSystemTray)(await systemTraySettingCache.get()));
  ensureFilePermissions([
    "config.json",
    "sql/db.sqlite",
    "sql/db.sqlite-wal",
    "sql/db.sqlite-shm"
  ]);
});
function setupMenu(options) {
  const { platform } = process;
  menuOptions = {
    development,
    devTools: defaultWebPrefs.devTools,
    includeSetup: false,
    isProduction: (0, import_version.isProduction)(import_electron.app.getVersion()),
    platform,
    forceUpdate,
    openContactUs,
    openForums,
    openJoinTheBeta,
    openReleaseNotes,
    openSupportPage,
    setupAsNewDevice,
    setupAsStandalone,
    showAbout,
    showDebugLog: showDebugLogWindow,
    showKeyboardShortcuts,
    showSettings: showSettingsWindow,
    showStickerCreator,
    showWindow,
    ...options
  };
  const template = (0, import_menu.createTemplate)(menuOptions, getLocale().messages);
  const menu = import_electron.Menu.buildFromTemplate(template);
  import_electron.Menu.setApplicationMenu(menu);
  mainWindow?.webContents.send("window:set-menu-options", {
    development: menuOptions.development,
    devTools: menuOptions.devTools,
    includeSetup: menuOptions.includeSetup,
    isProduction: menuOptions.isProduction,
    platform: menuOptions.platform
  });
}
async function requestShutdown() {
  if (!mainWindow || !mainWindow.webContents) {
    return;
  }
  getLogger().info("requestShutdown: Requesting close of mainWindow...");
  const request = new Promise((resolveFn) => {
    let timeout;
    if (!mainWindow) {
      resolveFn();
      return;
    }
    import_electron.ipcMain.once("now-ready-for-shutdown", (_event, error) => {
      getLogger().info("requestShutdown: Response received");
      if (error) {
        getLogger().error("requestShutdown: got error, still shutting down.", error);
      }
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
      resolveFn();
    });
    mainWindow.webContents.send("get-ready-for-shutdown");
    timeout = setTimeout(() => {
      getLogger().error("requestShutdown: Response never received; forcing shutdown.");
      resolveFn();
    }, 2 * 60 * 1e3);
  });
  try {
    await request;
  } catch (error) {
    getLogger().error("requestShutdown error:", error && error.stack ? error.stack : error);
  }
}
import_electron.app.on("before-quit", () => {
  getLogger().info("before-quit event", {
    readyForShutdown: windowState.readyForShutdown(),
    shouldQuit: windowState.shouldQuit()
  });
  systemTrayService?.markShouldQuit();
  windowState.markShouldQuit();
  if (mainWindow) {
    mainWindow.webContents.send("quit");
  }
});
import_electron.app.on("window-all-closed", () => {
  getLogger().info("main process handling window-all-closed");
  const shouldAutoClose = !OS.isMacOS() || (0, import_environment.isTestEnvironment)((0, import_environment.getEnvironment)());
  if (shouldAutoClose && mainWindowCreated) {
    import_electron.app.quit();
  }
});
import_electron.app.on("activate", () => {
  if (!ready) {
    return;
  }
  if (mainWindow) {
    mainWindow.show();
  } else {
    createWindow();
  }
});
import_electron.app.on("web-contents-created", (_createEvent, contents) => {
  contents.on("will-attach-webview", (attachEvent) => {
    attachEvent.preventDefault();
  });
  contents.on("new-window", (newEvent) => {
    newEvent.preventDefault();
  });
});
import_electron.app.setAsDefaultProtocolClient("sgnl");
import_electron.app.setAsDefaultProtocolClient("signalcaptcha");
import_electron.app.on("will-finish-launching", () => {
  import_electron.app.on("open-url", (event, incomingHref) => {
    event.preventDefault();
    if ((0, import_sgnlHref.isCaptchaHref)(incomingHref, getLogger())) {
      const { captcha } = (0, import_sgnlHref.parseCaptchaHref)(incomingHref, getLogger());
      challengeHandler.handleCaptcha(captcha);
      showWindow();
      return;
    }
    handleSgnlHref(incomingHref);
  });
});
import_electron.ipcMain.on("set-badge-count", (_event, count) => {
  import_electron.app.badgeCount = count;
});
import_electron.ipcMain.on("remove-setup-menu-items", () => {
  setupMenu();
});
import_electron.ipcMain.on("add-setup-menu-items", () => {
  setupMenu({
    includeSetup: true
  });
});
import_electron.ipcMain.on("draw-attention", () => {
  if (!mainWindow) {
    return;
  }
  if (OS.isWindows() || OS.isLinux()) {
    mainWindow.flashFrame(true);
  }
});
import_electron.ipcMain.on("restart", () => {
  getLogger().info("Relaunching application");
  import_electron.app.relaunch();
  import_electron.app.quit();
});
import_electron.ipcMain.on("shutdown", () => {
  import_electron.app.quit();
});
import_electron.ipcMain.on("set-auto-hide-menu-bar", (_event, autoHide) => {
  if (mainWindow) {
    mainWindow.autoHideMenuBar = autoHide;
  }
});
import_electron.ipcMain.on("set-menu-bar-visibility", (_event, visibility) => {
  if (mainWindow) {
    mainWindow.setMenuBarVisibility(visibility);
  }
});
import_electron.ipcMain.on("update-system-tray-setting", (_event, rawSystemTraySetting) => {
  const systemTraySetting = (0, import_SystemTraySetting.parseSystemTraySetting)(rawSystemTraySetting);
  systemTraySettingCache.set(systemTraySetting);
  if (systemTrayService) {
    const isEnabled = (0, import_SystemTraySetting.shouldMinimizeToSystemTray)(systemTraySetting);
    systemTrayService.setEnabled(isEnabled);
  }
});
import_electron.ipcMain.on("close-screen-share-controller", () => {
  if (screenShareWindow) {
    screenShareWindow.close();
  }
});
import_electron.ipcMain.on("stop-screen-share", () => {
  if (mainWindow) {
    mainWindow.webContents.send("stop-screen-share");
  }
});
import_electron.ipcMain.on("show-screen-share", (_event, sourceName) => {
  showScreenShareWindow(sourceName);
});
import_electron.ipcMain.on("update-tray-icon", (_event, unreadCount) => {
  if (systemTrayService) {
    systemTrayService.setUnreadCount(unreadCount);
  }
});
import_electron.ipcMain.on("show-debug-log", showDebugLogWindow);
import_electron.ipcMain.on("show-debug-log-save-dialog", async (_event, logText) => {
  const { filePath } = await import_electron.dialog.showSaveDialog({
    defaultPath: "debuglog.txt"
  });
  if (filePath) {
    await (0, import_fs_extra.writeFile)(filePath, logText);
  }
});
import_electron.ipcMain.handle("show-permissions-popup", async (_event, forCalling, forCamera) => {
  try {
    await showPermissionsPopupWindow(forCalling, forCamera);
  } catch (error) {
    getLogger().error("show-permissions-popup error:", error && error.stack ? error.stack : error);
  }
});
function addDarkOverlay() {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("add-dark-overlay");
  }
}
function removeDarkOverlay() {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("remove-dark-overlay");
  }
}
import_electron.ipcMain.on("show-settings", showSettingsWindow);
import_electron.ipcMain.on("delete-all-data", () => {
  if (settingsWindow) {
    settingsWindow.close();
  }
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("delete-all-data");
  }
});
import_electron.ipcMain.on("get-built-in-images", async () => {
  if (!mainWindow) {
    getLogger().warn("ipc/get-built-in-images: No mainWindow!");
    return;
  }
  try {
    const images = await attachments.getBuiltInImages();
    mainWindow.webContents.send("get-success-built-in-images", null, images);
  } catch (error) {
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send("get-success-built-in-images", error.message);
    } else {
      getLogger().error("Error handling get-built-in-images:", error.stack);
    }
  }
});
import_electron.ipcMain.on("locale-data", (event) => {
  event.returnValue = getLocale().messages;
});
import_electron.ipcMain.on("user-config-key", (event) => {
  event.returnValue = userConfig.get("key");
});
import_electron.ipcMain.on("get-user-data-path", (event) => {
  event.returnValue = import_electron.app.getPath("userData");
});
import_electron.ipcMain.on("preferences-changed", () => {
  for (const window of activeWindows) {
    if (window.webContents) {
      window.webContents.send("preferences-changed");
    }
  }
});
function getIncomingHref(argv) {
  return argv.find((arg) => (0, import_sgnlHref.isSgnlHref)(arg, getLogger()));
}
function getIncomingCaptchaHref(argv) {
  return argv.find((arg) => (0, import_sgnlHref.isCaptchaHref)(arg, getLogger()));
}
function handleSgnlHref(incomingHref) {
  let command;
  let args;
  let hash;
  if ((0, import_sgnlHref.isSgnlHref)(incomingHref, getLogger())) {
    ({ command, args, hash } = (0, import_sgnlHref.parseSgnlHref)(incomingHref, getLogger()));
  } else if ((0, import_sgnlHref.isSignalHttpsLink)(incomingHref, getLogger())) {
    ({ command, args, hash } = (0, import_sgnlHref.parseSignalHttpsLink)(incomingHref, getLogger()));
  }
  if (mainWindow && mainWindow.webContents) {
    if (command === "addstickers") {
      getLogger().info("Opening sticker pack from sgnl protocol link");
      const packId = args?.get("pack_id");
      const packKeyHex = args?.get("pack_key");
      const packKey = packKeyHex ? Buffer.from(packKeyHex, "hex").toString("base64") : "";
      mainWindow.webContents.send("show-sticker-pack", { packId, packKey });
    } else if (command === "signal.group" && hash) {
      getLogger().info("Showing group from sgnl protocol link");
      mainWindow.webContents.send("show-group-via-link", { hash });
    } else if (command === "signal.me" && hash) {
      getLogger().info("Showing conversation from sgnl protocol link");
      mainWindow.webContents.send("show-conversation-via-signal.me", { hash });
    } else {
      getLogger().info("Showing warning that we cannot process link");
      mainWindow.webContents.send("unknown-sgnl-link");
    }
  } else {
    getLogger().error("Unhandled sgnl link");
  }
}
import_electron.ipcMain.on("install-sticker-pack", (_event, packId, packKeyHex) => {
  const packKey = Buffer.from(packKeyHex, "hex").toString("base64");
  if (mainWindow) {
    mainWindow.webContents.send("install-sticker-pack", { packId, packKey });
  }
});
import_electron.ipcMain.on("ensure-file-permissions", async (event) => {
  await ensureFilePermissions();
  event.reply("ensure-file-permissions-done");
});
async function ensureFilePermissions(onlyFiles) {
  getLogger().info("Begin ensuring permissions");
  const start = Date.now();
  const userDataPath = await (0, import_fs_extra.realpath)(import_electron.app.getPath("userData"));
  const userDataGlob = (0, import_normalize_path.default)((0, import_path.join)(userDataPath, "**", "*"));
  const files = onlyFiles ? onlyFiles.map((f) => (0, import_path.join)(userDataPath, f)) : await (0, import_fast_glob.default)(userDataGlob, {
    markDirectories: true,
    onlyFiles: false,
    ignore: ["**/Singleton*"]
  });
  getLogger().info(`Ensuring file permissions for ${files.length} files`);
  const q = new import_p_queue.default({ concurrency: 5, timeout: 1e3 * 60 * 2 });
  q.addAll(files.map((f) => async () => {
    const isDir = f.endsWith("/");
    try {
      await (0, import_fs_extra.chmod)((0, import_path.normalize)(f), isDir ? 448 : 384);
    } catch (error) {
      getLogger().error("ensureFilePermissions: Error from chmod", error.message);
    }
  }));
  await q.onEmpty();
  getLogger().info(`Finish ensuring permissions in ${Date.now() - start}ms`);
}
import_electron.ipcMain.handle("get-auto-launch", async () => {
  return import_electron.app.getLoginItemSettings().openAtLogin;
});
import_electron.ipcMain.handle("set-auto-launch", async (_event, value) => {
  import_electron.app.setLoginItemSettings({ openAtLogin: Boolean(value) });
});
import_electron.ipcMain.on("show-message-box", (_event, { type, message }) => {
  import_electron.dialog.showMessageBox({ type, message });
});
import_electron.ipcMain.on("show-item-in-folder", (_event, folder) => {
  import_electron.shell.showItemInFolder(folder);
});
import_electron.ipcMain.handle("show-save-dialog", async (_event, { defaultPath }) => {
  if (!mainWindow) {
    getLogger().warn("show-save-dialog: no main window");
    return { canceled: true };
  }
  return import_electron.dialog.showSaveDialog(mainWindow, {
    defaultPath
  });
});
import_electron.ipcMain.handle("getScreenCaptureSources", async () => {
  return import_electron.desktopCapturer.getSources({
    fetchWindowIcons: true,
    thumbnailSize: { height: 102, width: 184 },
    types: ["window", "screen"]
  });
});
import_electron.ipcMain.handle("executeMenuRole", async ({ sender }, untypedRole) => {
  const role = untypedRole;
  const senderWindow = import_electron.BrowserWindow.fromWebContents(sender);
  switch (role) {
    case "undo":
      sender.undo();
      break;
    case "redo":
      sender.redo();
      break;
    case "cut":
      sender.cut();
      break;
    case "copy":
      sender.copy();
      break;
    case "paste":
      sender.paste();
      break;
    case "pasteAndMatchStyle":
      sender.pasteAndMatchStyle();
      break;
    case "delete":
      sender.delete();
      break;
    case "selectAll":
      sender.selectAll();
      break;
    case "reload":
      sender.reload();
      break;
    case "toggleDevTools":
      sender.toggleDevTools();
      break;
    case "resetZoom":
      sender.setZoomLevel(0);
      break;
    case "zoomIn":
      sender.setZoomLevel(sender.getZoomLevel() + 1);
      break;
    case "zoomOut":
      sender.setZoomLevel(sender.getZoomLevel() - 1);
      break;
    case "togglefullscreen":
      senderWindow?.setFullScreen(!senderWindow?.isFullScreen());
      break;
    case "minimize":
      senderWindow?.minimize();
      break;
    case "close":
      senderWindow?.close();
      break;
    case "quit":
      import_electron.app.quit();
      break;
    default:
      break;
  }
});
import_electron.ipcMain.handle("getMainWindowStats", async () => {
  return {
    isMaximized: windowConfig?.maximized ?? false,
    isFullScreen: windowConfig?.fullscreen ?? false
  };
});
import_electron.ipcMain.handle("getMenuOptions", async () => {
  return {
    development: menuOptions?.development ?? false,
    devTools: menuOptions?.devTools ?? false,
    includeSetup: menuOptions?.includeSetup ?? false,
    isProduction: menuOptions?.isProduction ?? true,
    platform: menuOptions?.platform ?? "unknown"
  };
});
import_electron.ipcMain.handle("executeMenuAction", async (_event, action) => {
  if (action === "forceUpdate") {
    forceUpdate();
  } else if (action === "openContactUs") {
    openContactUs();
  } else if (action === "openForums") {
    openForums();
  } else if (action === "openJoinTheBeta") {
    openJoinTheBeta();
  } else if (action === "openReleaseNotes") {
    openReleaseNotes();
  } else if (action === "openSupportPage") {
    openSupportPage();
  } else if (action === "setupAsNewDevice") {
    setupAsNewDevice();
  } else if (action === "setupAsStandalone") {
    setupAsStandalone();
  } else if (action === "showAbout") {
    showAbout();
  } else if (action === "showDebugLog") {
    showDebugLogWindow();
  } else if (action === "showKeyboardShortcuts") {
    showKeyboardShortcuts();
  } else if (action === "showSettings") {
    showSettingsWindow();
  } else if (action === "showStickerCreator") {
    showStickerCreator();
  } else if (action === "showWindow") {
    showWindow();
  } else {
    throw (0, import_missingCaseError.missingCaseError)(action);
  }
});
if ((0, import_environment.isTestEnvironment)((0, import_environment.getEnvironment)())) {
  import_electron.ipcMain.handle("ci:test-electron:done", async (_event, info) => {
    if (!process.env.TEST_QUIT_ON_COMPLETE) {
      return;
    }
    process.stdout.write(`ci:test-electron:done=${JSON.stringify(info)}
`, () => import_electron.app.quit());
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  windowConfigSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaGFzIHRvIGJlIHRoZSBmaXJzdCBpbXBvcnQgYmVjYXVzZSBpdCBwYXRjaGVzIFwib3NcIiBtb2R1bGVcbmltcG9ydCAnLi4vdHMvdXRpbC9wYXRjaFdpbmRvd3M3SG9zdG5hbWUnO1xuXG5pbXBvcnQgeyBqb2luLCBub3JtYWxpemUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IHBhdGhUb0ZpbGVVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IHsgY2htb2QsIHJlYWxwYXRoLCB3cml0ZUZpbGUgfSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgeyByYW5kb21CeXRlcyB9IGZyb20gJ2NyeXB0byc7XG5cbmltcG9ydCBub3JtYWxpemVQYXRoIGZyb20gJ25vcm1hbGl6ZS1wYXRoJztcbmltcG9ydCBmYXN0R2xvYiBmcm9tICdmYXN0LWdsb2InO1xuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCB7IGdldCwgcGljaywgaXNOdW1iZXIsIGlzQm9vbGVhbiwgc29tZSwgZGVib3VuY2UsIG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgYXBwLFxuICBCcm93c2VyV2luZG93LFxuICBjbGlwYm9hcmQsXG4gIGRlc2t0b3BDYXB0dXJlcixcbiAgZGlhbG9nLFxuICBpcGNNYWluIGFzIGlwYyxcbiAgTWVudSxcbiAgbmF0aXZlVGhlbWUsXG4gIHBvd2VyU2F2ZUJsb2NrZXIsXG4gIHByb3RvY29sIGFzIGVsZWN0cm9uUHJvdG9jb2wsXG4gIHNjcmVlbixcbiAgc2Vzc2lvbixcbiAgc2hlbGwsXG4gIHN5c3RlbVByZWZlcmVuY2VzLFxufSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgdHlwZSB7XG4gIE1lbnVJdGVtQ29uc3RydWN0b3JPcHRpb25zLFxuICBUaXRsZUJhck92ZXJsYXlPcHRpb25zLFxufSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgKiBhcyBHbG9iYWxFcnJvcnMgZnJvbSAnLi9nbG9iYWxfZXJyb3JzJztcbmltcG9ydCB7IHNldHVwIGFzIHNldHVwQ3Jhc2hSZXBvcnRzIH0gZnJvbSAnLi9jcmFzaFJlcG9ydHMnO1xuaW1wb3J0IHsgc2V0dXAgYXMgc2V0dXBTcGVsbENoZWNrZXIgfSBmcm9tICcuL3NwZWxsX2NoZWNrJztcbmltcG9ydCB7IHJlZGFjdEFsbCwgYWRkU2Vuc2l0aXZlUGF0aCB9IGZyb20gJy4uL3RzL3V0aWwvcHJpdmFjeSc7XG5pbXBvcnQgeyBjcmVhdGVTdXBwb3J0VXJsIH0gZnJvbSAnLi4vdHMvdXRpbC9jcmVhdGVTdXBwb3J0VXJsJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi90cy91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdHMvdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgY29uc29sZUxvZ2dlciB9IGZyb20gJy4uL3RzL3V0aWwvY29uc29sZUxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFRoZW1lU2V0dGluZ1R5cGUgfSBmcm9tICcuLi90cy90eXBlcy9TdG9yYWdlVUlLZXlzJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uL3RzL3R5cGVzL1V0aWwnO1xuXG5pbXBvcnQgJy4vc3RhcnR1cF9jb25maWcnO1xuXG5pbXBvcnQgdHlwZSB7IENvbmZpZ1R5cGUgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IFJlbmRlcmVyQ29uZmlnVHlwZSB9IGZyb20gJy4uL3RzL3R5cGVzL1JlbmRlcmVyQ29uZmlnJztcbmltcG9ydCB7XG4gIGRpcmVjdG9yeUNvbmZpZ1NjaGVtYSxcbiAgcmVuZGVyZXJDb25maWdTY2hlbWEsXG59IGZyb20gJy4uL3RzL3R5cGVzL1JlbmRlcmVyQ29uZmlnJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtcbiAgRW52aXJvbm1lbnQsXG4gIGdldEVudmlyb25tZW50LFxuICBpc1Rlc3RFbnZpcm9ubWVudCxcbn0gZnJvbSAnLi4vdHMvZW52aXJvbm1lbnQnO1xuXG4vLyBWZXJ5IGltcG9ydGFudCB0byBwdXQgYmVmb3JlIHRoZSBzaW5nbGUgaW5zdGFuY2UgY2hlY2ssIHNpbmNlIGl0IGlzIGJhc2VkIG9uIHRoZVxuLy8gICB1c2VyRGF0YSBkaXJlY3RvcnkuIChzZWUgcmVxdWVzdFNpbmdsZUluc3RhbmNlTG9jayBiZWxvdylcbmltcG9ydCAqIGFzIHVzZXJDb25maWcgZnJvbSAnLi91c2VyX2NvbmZpZyc7XG5cbi8vIFdlIGdlbmVyYWxseSB3YW50IHRvIHB1bGwgaW4gb3VyIG93biBtb2R1bGVzIGFmdGVyIHRoaXMgcG9pbnQsIGFmdGVyIHRoZSB1c2VyXG4vLyAgIGRhdGEgZGlyZWN0b3J5IGhhcyBiZWVuIHNldC5cbmltcG9ydCAqIGFzIGF0dGFjaG1lbnRzIGZyb20gJy4vYXR0YWNobWVudHMnO1xuaW1wb3J0ICogYXMgYXR0YWNobWVudENoYW5uZWwgZnJvbSAnLi9hdHRhY2htZW50X2NoYW5uZWwnO1xuaW1wb3J0ICogYXMgYm91bmNlIGZyb20gJy4uL3RzL3NlcnZpY2VzL2JvdW5jZSc7XG5pbXBvcnQgKiBhcyB1cGRhdGVyIGZyb20gJy4uL3RzL3VwZGF0ZXIvaW5kZXgnO1xuaW1wb3J0IHsgdXBkYXRlRGVmYXVsdFNlc3Npb24gfSBmcm9tICcuL3VwZGF0ZURlZmF1bHRTZXNzaW9uJztcbmltcG9ydCB7IFByZXZlbnREaXNwbGF5U2xlZXBTZXJ2aWNlIH0gZnJvbSAnLi9QcmV2ZW50RGlzcGxheVNsZWVwU2VydmljZSc7XG5pbXBvcnQgeyBTeXN0ZW1UcmF5U2VydmljZSB9IGZyb20gJy4vU3lzdGVtVHJheVNlcnZpY2UnO1xuaW1wb3J0IHsgU3lzdGVtVHJheVNldHRpbmdDYWNoZSB9IGZyb20gJy4vU3lzdGVtVHJheVNldHRpbmdDYWNoZSc7XG5pbXBvcnQge1xuICBTeXN0ZW1UcmF5U2V0dGluZyxcbiAgc2hvdWxkTWluaW1pemVUb1N5c3RlbVRyYXksXG4gIHBhcnNlU3lzdGVtVHJheVNldHRpbmcsXG59IGZyb20gJy4uL3RzL3R5cGVzL1N5c3RlbVRyYXlTZXR0aW5nJztcbmltcG9ydCAqIGFzIGVwaGVtZXJhbENvbmZpZyBmcm9tICcuL2VwaGVtZXJhbF9jb25maWcnO1xuaW1wb3J0ICogYXMgbG9nZ2luZyBmcm9tICcuLi90cy9sb2dnaW5nL21haW5fcHJvY2Vzc19sb2dnaW5nJztcbmltcG9ydCB7IE1haW5TUUwgfSBmcm9tICcuLi90cy9zcWwvbWFpbic7XG5pbXBvcnQgKiBhcyBzcWxDaGFubmVscyBmcm9tICcuL3NxbF9jaGFubmVsJztcbmltcG9ydCAqIGFzIHdpbmRvd1N0YXRlIGZyb20gJy4vd2luZG93X3N0YXRlJztcbmltcG9ydCB0eXBlIHsgQ3JlYXRlVGVtcGxhdGVPcHRpb25zVHlwZSB9IGZyb20gJy4vbWVudSc7XG5pbXBvcnQgdHlwZSB7IE1lbnVBY3Rpb25UeXBlIH0gZnJvbSAnLi4vdHMvdHlwZXMvbWVudSc7XG5pbXBvcnQgeyBjcmVhdGVUZW1wbGF0ZSB9IGZyb20gJy4vbWVudSc7XG5pbXBvcnQgeyBpbnN0YWxsRmlsZUhhbmRsZXIsIGluc3RhbGxXZWJIYW5kbGVyIH0gZnJvbSAnLi9wcm90b2NvbF9maWx0ZXInO1xuaW1wb3J0ICogYXMgT1MgZnJvbSAnLi4vdHMvT1MnO1xuaW1wb3J0IHsgaXNQcm9kdWN0aW9uIH0gZnJvbSAnLi4vdHMvdXRpbC92ZXJzaW9uJztcbmltcG9ydCB7XG4gIGlzU2dubEhyZWYsXG4gIGlzQ2FwdGNoYUhyZWYsXG4gIGlzU2lnbmFsSHR0cHNMaW5rLFxuICBwYXJzZVNnbmxIcmVmLFxuICBwYXJzZUNhcHRjaGFIcmVmLFxuICBwYXJzZVNpZ25hbEh0dHBzTGluayxcbiAgcmV3cml0ZVNpZ25hbEhyZWZzSWZOZWNlc3NhcnksXG59IGZyb20gJy4uL3RzL3V0aWwvc2dubEhyZWYnO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuLi90cy91dGlsL2NsZWFyVGltZW91dElmTmVjZXNzYXJ5JztcbmltcG9ydCB7IHRvZ2dsZU1heGltaXplZEJyb3dzZXJXaW5kb3cgfSBmcm9tICcuLi90cy91dGlsL3RvZ2dsZU1heGltaXplZEJyb3dzZXJXaW5kb3cnO1xuaW1wb3J0IHsgQ2hhbGxlbmdlTWFpbkhhbmRsZXIgfSBmcm9tICcuLi90cy9tYWluL2NoYWxsZW5nZU1haW4nO1xuaW1wb3J0IHsgTmF0aXZlVGhlbWVOb3RpZmllciB9IGZyb20gJy4uL3RzL21haW4vTmF0aXZlVGhlbWVOb3RpZmllcic7XG5pbXBvcnQgeyBQb3dlckNoYW5uZWwgfSBmcm9tICcuLi90cy9tYWluL3Bvd2VyQ2hhbm5lbCc7XG5pbXBvcnQgeyBTZXR0aW5nc0NoYW5uZWwgfSBmcm9tICcuLi90cy9tYWluL3NldHRpbmdzQ2hhbm5lbCc7XG5pbXBvcnQgeyBtYXliZVBhcnNlVXJsLCBzZXRVcmxTZWFyY2hQYXJhbXMgfSBmcm9tICcuLi90cy91dGlsL3VybCc7XG5pbXBvcnQgeyBnZXRIZWljQ29udmVydGVyIH0gZnJvbSAnLi4vdHMvd29ya2Vycy9oZWljQ29udmVydGVyTWFpbic7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxlVHlwZSB9IGZyb20gJy4vbG9jYWxlJztcbmltcG9ydCB7IGxvYWQgYXMgbG9hZExvY2FsZSB9IGZyb20gJy4vbG9jYWxlJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHMvdHlwZXMvTG9nZ2luZyc7XG5cbmNvbnN0IGFuaW1hdGlvblNldHRpbmdzID0gc3lzdGVtUHJlZmVyZW5jZXMuZ2V0QW5pbWF0aW9uU2V0dGluZ3MoKTtcblxuLy8gS2VlcCBhIGdsb2JhbCByZWZlcmVuY2Ugb2YgdGhlIHdpbmRvdyBvYmplY3QsIGlmIHlvdSBkb24ndCwgdGhlIHdpbmRvdyB3aWxsXG4vLyAgIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IHdoZW4gdGhlIEphdmFTY3JpcHQgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkLlxubGV0IG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3cgfCB1bmRlZmluZWQ7XG5sZXQgbWFpbldpbmRvd0NyZWF0ZWQgPSBmYWxzZTtcbmxldCBsb2FkaW5nV2luZG93OiBCcm93c2VyV2luZG93IHwgdW5kZWZpbmVkO1xuXG5jb25zdCBhY3RpdmVXaW5kb3dzID0gbmV3IFNldDxCcm93c2VyV2luZG93PigpO1xuXG5mdW5jdGlvbiBnZXRNYWluV2luZG93KCkge1xuICByZXR1cm4gbWFpbldpbmRvdztcbn1cblxuY29uc3QgZGV2ZWxvcG1lbnQgPVxuICBnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5EZXZlbG9wbWVudCB8fFxuICBnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5TdGFnaW5nO1xuXG5jb25zdCBpc1Rocm90dGxpbmdFbmFibGVkID0gZGV2ZWxvcG1lbnQgfHwgIWlzUHJvZHVjdGlvbihhcHAuZ2V0VmVyc2lvbigpKTtcblxuY29uc3QgZW5hYmxlQ0kgPSBjb25maWcuZ2V0PGJvb2xlYW4+KCdlbmFibGVDSScpO1xuY29uc3QgZm9yY2VQcmVsb2FkQnVuZGxlID0gY29uZmlnLmdldDxib29sZWFuPignZm9yY2VQcmVsb2FkQnVuZGxlJyk7XG5cbmNvbnN0IHByZXZlbnREaXNwbGF5U2xlZXBTZXJ2aWNlID0gbmV3IFByZXZlbnREaXNwbGF5U2xlZXBTZXJ2aWNlKFxuICBwb3dlclNhdmVCbG9ja2VyXG4pO1xuXG5jb25zdCBjaGFsbGVuZ2VIYW5kbGVyID0gbmV3IENoYWxsZW5nZU1haW5IYW5kbGVyKCk7XG5cbmNvbnN0IG5hdGl2ZVRoZW1lTm90aWZpZXIgPSBuZXcgTmF0aXZlVGhlbWVOb3RpZmllcigpO1xubmF0aXZlVGhlbWVOb3RpZmllci5pbml0aWFsaXplKCk7XG5cbmxldCBhcHBTdGFydEluaXRpYWxTcGVsbGNoZWNrU2V0dGluZyA9IHRydWU7XG5cbmNvbnN0IGRlZmF1bHRXZWJQcmVmcyA9IHtcbiAgZGV2VG9vbHM6XG4gICAgcHJvY2Vzcy5hcmd2LnNvbWUoYXJnID0+IGFyZyA9PT0gJy0tZW5hYmxlLWRldi10b29scycpIHx8XG4gICAgZ2V0RW52aXJvbm1lbnQoKSAhPT0gRW52aXJvbm1lbnQuUHJvZHVjdGlvbiB8fFxuICAgICFpc1Byb2R1Y3Rpb24oYXBwLmdldFZlcnNpb24oKSksXG4gIHNwZWxsY2hlY2s6IGZhbHNlLFxufTtcblxuZnVuY3Rpb24gc2hvd1dpbmRvdygpIHtcbiAgaWYgKCFtYWluV2luZG93KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gVXNpbmcgZm9jdXMoKSBpbnN0ZWFkIG9mIHNob3coKSBzZWVtcyB0byBiZSBpbXBvcnRhbnQgb24gV2luZG93cyB3aGVuIG91ciB3aW5kb3dcbiAgLy8gICBoYXMgYmVlbiBkb2NrZWQgdXNpbmcgQWVybyBTbmFwL1NuYXAgQXNzaXN0LiBBIGZ1bGwgLnNob3coKSBjYWxsIGhlcmUgd2lsbCBjYXVzZVxuICAvLyAgIHRoZSB3aW5kb3cgdG8gcmVwb3NpdGlvbjpcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1EZXNrdG9wL2lzc3Vlcy8xNDI5XG4gIGlmIChtYWluV2luZG93LmlzVmlzaWJsZSgpKSB7XG4gICAgbWFpbldpbmRvdy5mb2N1cygpO1xuICB9IGVsc2Uge1xuICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICB9XG59XG5cbmlmICghcHJvY2Vzcy5tYXMpIHtcbiAgY29uc29sZS5sb2coJ21ha2luZyBhcHAgc2luZ2xlIGluc3RhbmNlJyk7XG4gIGNvbnN0IGdvdExvY2sgPSBhcHAucmVxdWVzdFNpbmdsZUluc3RhbmNlTG9jaygpO1xuICBpZiAoIWdvdExvY2spIHtcbiAgICBjb25zb2xlLmxvZygncXVpdHRpbmc7IHdlIGFyZSB0aGUgc2Vjb25kIGluc3RhbmNlJyk7XG4gICAgYXBwLmV4aXQoKTtcbiAgfSBlbHNlIHtcbiAgICBhcHAub24oJ3NlY29uZC1pbnN0YW5jZScsIChfZTogRWxlY3Ryb24uRXZlbnQsIGFyZ3Y6IEFycmF5PHN0cmluZz4pID0+IHtcbiAgICAgIC8vIFNvbWVvbmUgdHJpZWQgdG8gcnVuIGEgc2Vjb25kIGluc3RhbmNlLCB3ZSBzaG91bGQgZm9jdXMgb3VyIHdpbmRvd1xuICAgICAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICAgICAgaWYgKG1haW5XaW5kb3cuaXNNaW5pbWl6ZWQoKSkge1xuICAgICAgICAgIG1haW5XaW5kb3cucmVzdG9yZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hvd1dpbmRvdygpO1xuICAgICAgfVxuICAgICAgaWYgKCFsb2dnZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJ3NlY29uZC1pbnN0YW5jZTogbG9nZ2VyIG5vdCBpbml0aWFsaXplZDsgc2tpcHBpbmcgZnVydGhlciBjaGVja3MnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5jb21pbmdDYXB0Y2hhSHJlZiA9IGdldEluY29taW5nQ2FwdGNoYUhyZWYoYXJndik7XG4gICAgICBpZiAoaW5jb21pbmdDYXB0Y2hhSHJlZikge1xuICAgICAgICBjb25zdCB7IGNhcHRjaGEgfSA9IHBhcnNlQ2FwdGNoYUhyZWYoaW5jb21pbmdDYXB0Y2hhSHJlZiwgZ2V0TG9nZ2VyKCkpO1xuICAgICAgICBjaGFsbGVuZ2VIYW5kbGVyLmhhbmRsZUNhcHRjaGEoY2FwdGNoYSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQXJlIHRoZXkgdHJ5aW5nIHRvIG9wZW4gYSBzZ25sOi8vIGhyZWY/XG4gICAgICBjb25zdCBpbmNvbWluZ0hyZWYgPSBnZXRJbmNvbWluZ0hyZWYoYXJndik7XG4gICAgICBpZiAoaW5jb21pbmdIcmVmKSB7XG4gICAgICAgIGhhbmRsZVNnbmxIcmVmKGluY29taW5nSHJlZik7XG4gICAgICB9XG4gICAgICAvLyBIYW5kbGVkXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmxldCBzcWxJbml0VGltZVN0YXJ0ID0gMDtcbmxldCBzcWxJbml0VGltZUVuZCA9IDA7XG5cbmNvbnN0IHNxbCA9IG5ldyBNYWluU1FMKCk7XG5jb25zdCBoZWljQ29udmVydGVyID0gZ2V0SGVpY0NvbnZlcnRlcigpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRTcGVsbENoZWNrU2V0dGluZygpIHtcbiAgY29uc3QgZmFzdFZhbHVlID0gZXBoZW1lcmFsQ29uZmlnLmdldCgnc3BlbGwtY2hlY2snKTtcbiAgaWYgKGZhc3RWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ2V0TG9nZ2VyKCkuaW5mbygnZ290IGZhc3Qgc3BlbGxjaGVjayBzZXR0aW5nJywgZmFzdFZhbHVlKTtcbiAgICByZXR1cm4gZmFzdFZhbHVlO1xuICB9XG5cbiAgY29uc3QganNvbiA9IGF3YWl0IHNxbC5zcWxDYWxsKCdnZXRJdGVtQnlJZCcsIFsnc3BlbGwtY2hlY2snXSk7XG5cbiAgLy8gRGVmYXVsdCB0byBgdHJ1ZWAgaWYgc2V0dGluZyBkb2Vzbid0IGV4aXN0IHlldFxuICBjb25zdCBzbG93VmFsdWUgPSBqc29uID8ganNvbi52YWx1ZSA6IHRydWU7XG5cbiAgZXBoZW1lcmFsQ29uZmlnLnNldCgnc3BlbGwtY2hlY2snLCBzbG93VmFsdWUpO1xuXG4gIGdldExvZ2dlcigpLmluZm8oJ2dvdCBzbG93IHNwZWxsY2hlY2sgc2V0dGluZycsIHNsb3dWYWx1ZSk7XG5cbiAgcmV0dXJuIHNsb3dWYWx1ZTtcbn1cblxudHlwZSBHZXRUaGVtZVNldHRpbmdPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgZXBoZW1lcmFsT25seT86IGJvb2xlYW47XG59PjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0VGhlbWVTZXR0aW5nKHtcbiAgZXBoZW1lcmFsT25seSA9IGZhbHNlLFxufTogR2V0VGhlbWVTZXR0aW5nT3B0aW9uc1R5cGUgPSB7fSk6IFByb21pc2U8VGhlbWVTZXR0aW5nVHlwZT4ge1xuICBjb25zdCBmYXN0VmFsdWUgPSBlcGhlbWVyYWxDb25maWcuZ2V0KCd0aGVtZS1zZXR0aW5nJyk7XG4gIGlmIChmYXN0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGdldExvZ2dlcigpLmluZm8oJ2dvdCBmYXN0IHRoZW1lLXNldHRpbmcgdmFsdWUnLCBmYXN0VmFsdWUpO1xuICAgIHJldHVybiBmYXN0VmFsdWUgYXMgVGhlbWVTZXR0aW5nVHlwZTtcbiAgfVxuXG4gIGlmIChlcGhlbWVyYWxPbmx5KSB7XG4gICAgcmV0dXJuICdzeXN0ZW0nO1xuICB9XG5cbiAgY29uc3QganNvbiA9IGF3YWl0IHNxbC5zcWxDYWxsKCdnZXRJdGVtQnlJZCcsIFsndGhlbWUtc2V0dGluZyddKTtcblxuICAvLyBEZWZhdWx0IHRvIGBzeXN0ZW1gIGlmIHNldHRpbmcgZG9lc24ndCBleGlzdCBvciBpcyBpbnZhbGlkXG4gIGNvbnN0IHNldHRpbmc6IHVua25vd24gPSBqc29uPy52YWx1ZTtcbiAgY29uc3Qgc2xvd1ZhbHVlID1cbiAgICBzZXR0aW5nID09PSAnbGlnaHQnIHx8IHNldHRpbmcgPT09ICdkYXJrJyB8fCBzZXR0aW5nID09PSAnc3lzdGVtJ1xuICAgICAgPyBzZXR0aW5nXG4gICAgICA6ICdzeXN0ZW0nO1xuXG4gIGVwaGVtZXJhbENvbmZpZy5zZXQoJ3RoZW1lLXNldHRpbmcnLCBzbG93VmFsdWUpO1xuXG4gIGdldExvZ2dlcigpLmluZm8oJ2dvdCBzbG93IHRoZW1lLXNldHRpbmcgdmFsdWUnLCBzbG93VmFsdWUpO1xuXG4gIHJldHVybiBzbG93VmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFJlc29sdmVkVGhlbWVTZXR0aW5nKFxuICBvcHRpb25zPzogR2V0VGhlbWVTZXR0aW5nT3B0aW9uc1R5cGVcbik6IFByb21pc2U8VGhlbWVUeXBlPiB7XG4gIGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0VGhlbWVTZXR0aW5nKG9wdGlvbnMpO1xuICBpZiAodGhlbWUgPT09ICdzeXN0ZW0nKSB7XG4gICAgcmV0dXJuIG5hdGl2ZVRoZW1lLnNob3VsZFVzZURhcmtDb2xvcnMgPyBUaGVtZVR5cGUuZGFyayA6IFRoZW1lVHlwZS5saWdodDtcbiAgfVxuICByZXR1cm4gVGhlbWVUeXBlW3RoZW1lXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QmFja2dyb3VuZENvbG9yKFxuICBvcHRpb25zPzogR2V0VGhlbWVTZXR0aW5nT3B0aW9uc1R5cGVcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHRoZW1lID0gYXdhaXQgZ2V0UmVzb2x2ZWRUaGVtZVNldHRpbmcob3B0aW9ucyk7XG5cbiAgaWYgKHRoZW1lID09PSAnbGlnaHQnKSB7XG4gICAgcmV0dXJuICcjM2E3NmYwJztcbiAgfVxuXG4gIGlmICh0aGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgcmV0dXJuICcjMTIxMjEyJztcbiAgfVxuXG4gIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodGhlbWUpO1xufVxuXG5sZXQgc3lzdGVtVHJheVNlcnZpY2U6IFN5c3RlbVRyYXlTZXJ2aWNlIHwgdW5kZWZpbmVkO1xuY29uc3Qgc3lzdGVtVHJheVNldHRpbmdDYWNoZSA9IG5ldyBTeXN0ZW1UcmF5U2V0dGluZ0NhY2hlKFxuICBzcWwsXG4gIGVwaGVtZXJhbENvbmZpZyxcbiAgcHJvY2Vzcy5hcmd2LFxuICBhcHAuZ2V0VmVyc2lvbigpXG4pO1xuXG5jb25zdCB3aW5kb3dGcm9tVXNlckNvbmZpZyA9IHVzZXJDb25maWcuZ2V0KCd3aW5kb3cnKTtcbmNvbnN0IHdpbmRvd0Zyb21FcGhlbWVyYWwgPSBlcGhlbWVyYWxDb25maWcuZ2V0KCd3aW5kb3cnKTtcbmV4cG9ydCBjb25zdCB3aW5kb3dDb25maWdTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG1heGltaXplZDogei5ib29sZWFuKCkub3B0aW9uYWwoKSxcbiAgYXV0b0hpZGVNZW51QmFyOiB6LmJvb2xlYW4oKS5vcHRpb25hbCgpLFxuICBmdWxsc2NyZWVuOiB6LmJvb2xlYW4oKS5vcHRpb25hbCgpLFxuICB3aWR0aDogei5udW1iZXIoKSxcbiAgaGVpZ2h0OiB6Lm51bWJlcigpLFxuICB4OiB6Lm51bWJlcigpLFxuICB5OiB6Lm51bWJlcigpLFxufSk7XG50eXBlIFdpbmRvd0NvbmZpZ1R5cGUgPSB6LmluZmVyPHR5cGVvZiB3aW5kb3dDb25maWdTY2hlbWE+O1xuXG5sZXQgd2luZG93Q29uZmlnOiBXaW5kb3dDb25maWdUeXBlIHwgdW5kZWZpbmVkO1xuY29uc3Qgd2luZG93Q29uZmlnUGFyc2VkID0gd2luZG93Q29uZmlnU2NoZW1hLnNhZmVQYXJzZShcbiAgd2luZG93RnJvbUVwaGVtZXJhbCB8fCB3aW5kb3dGcm9tVXNlckNvbmZpZ1xuKTtcbmlmICh3aW5kb3dDb25maWdQYXJzZWQuc3VjY2Vzcykge1xuICB3aW5kb3dDb25maWcgPSB3aW5kb3dDb25maWdQYXJzZWQuZGF0YTtcbn1cblxuaWYgKHdpbmRvd0Zyb21Vc2VyQ29uZmlnKSB7XG4gIHVzZXJDb25maWcuc2V0KCd3aW5kb3cnLCBudWxsKTtcbiAgZXBoZW1lcmFsQ29uZmlnLnNldCgnd2luZG93Jywgd2luZG93Q29uZmlnKTtcbn1cblxubGV0IG1lbnVPcHRpb25zOiBDcmVhdGVUZW1wbGF0ZU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkO1xuXG4vLyBUaGVzZSB3aWxsIGJlIHNldCBhZnRlciBhcHAgZmlyZXMgdGhlICdyZWFkeScgZXZlbnRcbmxldCBsb2dnZXI6IExvZ2dlclR5cGUgfCB1bmRlZmluZWQ7XG5sZXQgbG9jYWxlOiBMb2NhbGVUeXBlIHwgdW5kZWZpbmVkO1xubGV0IHNldHRpbmdzQ2hhbm5lbDogU2V0dGluZ3NDaGFubmVsIHwgdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBnZXRMb2dnZXIoKTogTG9nZ2VyVHlwZSB7XG4gIGlmICghbG9nZ2VyKSB7XG4gICAgY29uc29sZS53YXJuKCdnZXRMb2dnZXI6IExvZ2dlciBub3QgeWV0IGluaXRpYWxpemVkIScpO1xuICAgIHJldHVybiBjb25zb2xlTG9nZ2VyO1xuICB9XG5cbiAgcmV0dXJuIGxvZ2dlcjtcbn1cblxuZnVuY3Rpb24gZ2V0TG9jYWxlKCk6IExvY2FsZVR5cGUge1xuICBpZiAoIWxvY2FsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0TG9jYWxlOiBMb2NhbGUgbm90IHlldCBpbml0aWFsaXplZCEnKTtcbiAgfVxuXG4gIHJldHVybiBsb2NhbGU7XG59XG5cbnR5cGUgUHJlcGFyZVVybE9wdGlvbnMgPSB7IGZvckNhbGxpbmc/OiBib29sZWFuOyBmb3JDYW1lcmE/OiBib29sZWFuIH07XG5cbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmVGaWxlVXJsKFxuICBwYXRoU2VnbWVudHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgb3B0aW9uczogUHJlcGFyZVVybE9wdGlvbnMgPSB7fVxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgZmlsZVBhdGggPSBqb2luKC4uLnBhdGhTZWdtZW50cyk7XG4gIGNvbnN0IGZpbGVVcmwgPSBwYXRoVG9GaWxlVVJMKGZpbGVQYXRoKTtcbiAgcmV0dXJuIHByZXBhcmVVcmwoZmlsZVVybCwgb3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmVVcmwoXG4gIHVybDogVVJMLFxuICB7IGZvckNhbGxpbmcsIGZvckNhbWVyYSB9OiBQcmVwYXJlVXJsT3B0aW9ucyA9IHt9XG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB0aGVtZSA9IGF3YWl0IGdldFJlc29sdmVkVGhlbWVTZXR0aW5nKCk7XG5cbiAgY29uc3QgZGlyZWN0b3J5Q29uZmlnID0gZGlyZWN0b3J5Q29uZmlnU2NoZW1hLnNhZmVQYXJzZSh7XG4gICAgZGlyZWN0b3J5VmVyc2lvbjogY29uZmlnLmdldDxudW1iZXIgfCB1bmRlZmluZWQ+KCdkaXJlY3RvcnlWZXJzaW9uJykgfHwgMSxcbiAgICBkaXJlY3RvcnlVcmw6IGNvbmZpZy5nZXQ8c3RyaW5nIHwgbnVsbD4oJ2RpcmVjdG9yeVVybCcpIHx8IHVuZGVmaW5lZCxcbiAgICBkaXJlY3RvcnlFbmNsYXZlSWQ6XG4gICAgICBjb25maWcuZ2V0PHN0cmluZyB8IG51bGw+KCdkaXJlY3RvcnlFbmNsYXZlSWQnKSB8fCB1bmRlZmluZWQsXG4gICAgZGlyZWN0b3J5VHJ1c3RBbmNob3I6XG4gICAgICBjb25maWcuZ2V0PHN0cmluZyB8IG51bGw+KCdkaXJlY3RvcnlUcnVzdEFuY2hvcicpIHx8IHVuZGVmaW5lZCxcbiAgICBkaXJlY3RvcnlWMlVybDogY29uZmlnLmdldDxzdHJpbmcgfCBudWxsPignZGlyZWN0b3J5VjJVcmwnKSB8fCB1bmRlZmluZWQsXG4gICAgZGlyZWN0b3J5VjJQdWJsaWNLZXk6XG4gICAgICBjb25maWcuZ2V0PHN0cmluZyB8IG51bGw+KCdkaXJlY3RvcnlWMlB1YmxpY0tleScpIHx8IHVuZGVmaW5lZCxcbiAgICBkaXJlY3RvcnlWMkNvZGVIYXNoZXM6XG4gICAgICBjb25maWcuZ2V0PEFycmF5PHN0cmluZz4gfCBudWxsPignZGlyZWN0b3J5VjJDb2RlSGFzaGVzJykgfHwgdW5kZWZpbmVkLFxuICAgIGRpcmVjdG9yeVYzVXJsOiBjb25maWcuZ2V0PHN0cmluZyB8IG51bGw+KCdkaXJlY3RvcnlWM1VybCcpIHx8IHVuZGVmaW5lZCxcbiAgICBkaXJlY3RvcnlWM01SRU5DTEFWRTpcbiAgICAgIGNvbmZpZy5nZXQ8c3RyaW5nIHwgbnVsbD4oJ2RpcmVjdG9yeVYzTVJFTkNMQVZFJykgfHwgdW5kZWZpbmVkLFxuICAgIGRpcmVjdG9yeVYzUm9vdDogY29uZmlnLmdldDxzdHJpbmcgfCBudWxsPignZGlyZWN0b3J5VjNSb290JykgfHwgdW5kZWZpbmVkLFxuICB9KTtcbiAgaWYgKCFkaXJlY3RvcnlDb25maWcuc3VjY2Vzcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBwcmVwYXJlVXJsOiBGYWlsZWQgdG8gcGFyc2UgcmVuZGVyZXIgZGlyZWN0b3J5IGNvbmZpZyAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBkaXJlY3RvcnlDb25maWcuZXJyb3IuZmxhdHRlbigpXG4gICAgICApfWBcbiAgICApO1xuICB9XG5cbiAgY29uc3QgdXJsUGFyYW1zOiBSZW5kZXJlckNvbmZpZ1R5cGUgPSB7XG4gICAgbmFtZTogcGFja2FnZUpzb24ucHJvZHVjdE5hbWUsXG4gICAgbG9jYWxlOiBnZXRMb2NhbGUoKS5uYW1lLFxuICAgIHZlcnNpb246IGFwcC5nZXRWZXJzaW9uKCksXG4gICAgYnVpbGRDcmVhdGlvbjogY29uZmlnLmdldDxudW1iZXI+KCdidWlsZENyZWF0aW9uJyksXG4gICAgYnVpbGRFeHBpcmF0aW9uOiBjb25maWcuZ2V0PG51bWJlcj4oJ2J1aWxkRXhwaXJhdGlvbicpLFxuICAgIHNlcnZlclVybDogY29uZmlnLmdldDxzdHJpbmc+KCdzZXJ2ZXJVcmwnKSxcbiAgICBzdG9yYWdlVXJsOiBjb25maWcuZ2V0PHN0cmluZz4oJ3N0b3JhZ2VVcmwnKSxcbiAgICB1cGRhdGVzVXJsOiBjb25maWcuZ2V0PHN0cmluZz4oJ3VwZGF0ZXNVcmwnKSxcbiAgICBjZG5VcmwwOiBjb25maWcuZ2V0PENvbmZpZ1R5cGU+KCdjZG4nKS5nZXQ8c3RyaW5nPignMCcpLFxuICAgIGNkblVybDI6IGNvbmZpZy5nZXQ8Q29uZmlnVHlwZT4oJ2NkbicpLmdldDxzdHJpbmc+KCcyJyksXG4gICAgY2VydGlmaWNhdGVBdXRob3JpdHk6IGNvbmZpZy5nZXQ8c3RyaW5nPignY2VydGlmaWNhdGVBdXRob3JpdHknKSxcbiAgICBlbnZpcm9ubWVudDogZW5hYmxlQ0kgPyBFbnZpcm9ubWVudC5Qcm9kdWN0aW9uIDogZ2V0RW52aXJvbm1lbnQoKSxcbiAgICBlbmFibGVDSSxcbiAgICBub2RlVmVyc2lvbjogcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLFxuICAgIGhvc3RuYW1lOiBvcy5ob3N0bmFtZSgpLFxuICAgIGFwcEluc3RhbmNlOiBwcm9jZXNzLmVudi5OT0RFX0FQUF9JTlNUQU5DRSB8fCB1bmRlZmluZWQsXG4gICAgcHJveHlVcmw6IHByb2Nlc3MuZW52LkhUVFBTX1BST1hZIHx8IHByb2Nlc3MuZW52Lmh0dHBzX3Byb3h5IHx8IHVuZGVmaW5lZCxcbiAgICBjb250ZW50UHJveHlVcmw6IGNvbmZpZy5nZXQ8c3RyaW5nPignY29udGVudFByb3h5VXJsJyksXG4gICAgc2Z1VXJsOiBjb25maWcuZ2V0KCdzZnVVcmwnKSxcbiAgICByZWR1Y2VkTW90aW9uU2V0dGluZzogYW5pbWF0aW9uU2V0dGluZ3MucHJlZmVyc1JlZHVjZWRNb3Rpb24sXG4gICAgc2VydmVyUHVibGljUGFyYW1zOiBjb25maWcuZ2V0PHN0cmluZz4oJ3NlcnZlclB1YmxpY1BhcmFtcycpLFxuICAgIHNlcnZlclRydXN0Um9vdDogY29uZmlnLmdldDxzdHJpbmc+KCdzZXJ2ZXJUcnVzdFJvb3QnKSxcbiAgICB0aGVtZSxcbiAgICBhcHBTdGFydEluaXRpYWxTcGVsbGNoZWNrU2V0dGluZyxcbiAgICB1c2VyRGF0YVBhdGg6IGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpLFxuICAgIGhvbWVQYXRoOiBhcHAuZ2V0UGF0aCgnaG9tZScpLFxuICAgIGNyYXNoRHVtcHNQYXRoOiBhcHAuZ2V0UGF0aCgnY3Jhc2hEdW1wcycpLFxuXG4gICAgZGlyZWN0b3J5Q29uZmlnOiBkaXJlY3RvcnlDb25maWcuZGF0YSxcblxuICAgIC8vIE9ubHkgdXNlZCBieSB0aGUgbWFpbiB3aW5kb3dcbiAgICBpc01haW5XaW5kb3dGdWxsU2NyZWVuOiBCb29sZWFuKG1haW5XaW5kb3c/LmlzRnVsbFNjcmVlbigpKSxcblxuICAgIC8vIE9ubHkgZm9yIHRlc3RzXG4gICAgYXJndjogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5hcmd2KSxcblxuICAgIC8vIE9ubHkgZm9yIHBlcm1pc3Npb24gcG9wdXAgd2luZG93XG4gICAgZm9yQ2FsbGluZzogQm9vbGVhbihmb3JDYWxsaW5nKSxcbiAgICBmb3JDYW1lcmE6IEJvb2xlYW4oZm9yQ2FtZXJhKSxcbiAgfTtcblxuICBjb25zdCBwYXJzZWQgPSByZW5kZXJlckNvbmZpZ1NjaGVtYS5zYWZlUGFyc2UodXJsUGFyYW1zKTtcbiAgaWYgKCFwYXJzZWQuc3VjY2Vzcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBwcmVwYXJlVXJsOiBGYWlsZWQgdG8gcGFyc2UgcmVuZGVyZXIgY29uZmlnICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIHBhcnNlZC5lcnJvci5mbGF0dGVuKClcbiAgICAgICl9YFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gc2V0VXJsU2VhcmNoUGFyYW1zKHVybCwgeyBjb25maWc6IEpTT04uc3RyaW5naWZ5KHBhcnNlZC5kYXRhKSB9KS5ocmVmO1xufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVVcmwoZXZlbnQ6IEVsZWN0cm9uLkV2ZW50LCByYXdUYXJnZXQ6IHN0cmluZykge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBwYXJzZWRVcmwgPSBtYXliZVBhcnNlVXJsKHJhd1RhcmdldCk7XG4gIGlmICghcGFyc2VkVXJsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gcmV3cml0ZVNpZ25hbEhyZWZzSWZOZWNlc3NhcnkocmF3VGFyZ2V0KTtcblxuICBjb25zdCB7IHByb3RvY29sLCBob3N0bmFtZSB9ID0gcGFyc2VkVXJsO1xuICBjb25zdCBpc0RldlNlcnZlciA9XG4gICAgcHJvY2Vzcy5lbnYuU0lHTkFMX0VOQUJMRV9IVFRQICYmIGhvc3RuYW1lID09PSAnbG9jYWxob3N0JztcbiAgLy8gV2Ugb25seSB3YW50IHRvIHNwZWNpYWxseSBoYW5kbGUgdXJscyB0aGF0IGFyZW4ndCByZXF1ZXN0aW5nIHRoZSBkZXYgc2VydmVyXG4gIGlmIChcbiAgICBpc1NnbmxIcmVmKHRhcmdldCwgZ2V0TG9nZ2VyKCkpIHx8XG4gICAgaXNTaWduYWxIdHRwc0xpbmsodGFyZ2V0LCBnZXRMb2dnZXIoKSlcbiAgKSB7XG4gICAgaGFuZGxlU2dubEhyZWYodGFyZ2V0KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoKHByb3RvY29sID09PSAnaHR0cDonIHx8IHByb3RvY29sID09PSAnaHR0cHM6JykgJiYgIWlzRGV2U2VydmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNoZWxsLm9wZW5FeHRlcm5hbCh0YXJnZXQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBnZXRMb2dnZXIoKS5lcnJvcihgRmFpbGVkIHRvIG9wZW4gdXJsOiAke2Vycm9yLnN0YWNrfWApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVDb21tb25XaW5kb3dFdmVudHMoXG4gIHdpbmRvdzogQnJvd3NlcldpbmRvdyxcbiAgdGl0bGVCYXJPdmVybGF5OiBUaXRsZUJhck92ZXJsYXlPcHRpb25zIHwgZmFsc2UgPSBmYWxzZVxuKSB7XG4gIHdpbmRvdy53ZWJDb250ZW50cy5vbignd2lsbC1uYXZpZ2F0ZScsIGhhbmRsZVVybCk7XG4gIHdpbmRvdy53ZWJDb250ZW50cy5vbignbmV3LXdpbmRvdycsIGhhbmRsZVVybCk7XG4gIHdpbmRvdy53ZWJDb250ZW50cy5vbihcbiAgICAncHJlbG9hZC1lcnJvcicsXG4gICAgKF9ldmVudDogRWxlY3Ryb24uRXZlbnQsIHByZWxvYWRQYXRoOiBzdHJpbmcsIGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgZ2V0TG9nZ2VyKCkuZXJyb3IoYFByZWxvYWQgZXJyb3IgaW4gJHtwcmVsb2FkUGF0aH06IGAsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgKTtcblxuICBhY3RpdmVXaW5kb3dzLmFkZCh3aW5kb3cpO1xuICB3aW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IGFjdGl2ZVdpbmRvd3MuZGVsZXRlKHdpbmRvdykpO1xuXG4gIC8vIFdvcmtzIG9ubHkgZm9yIG1haW5XaW5kb3cgYmVjYXVzZSBpdCBoYXMgYGVuYWJsZVByZWZlcnJlZFNpemVNb2RlYFxuICBsZXQgbGFzdFpvb21GYWN0b3IgPSB3aW5kb3cud2ViQ29udGVudHMuZ2V0Wm9vbUZhY3RvcigpO1xuICBjb25zdCBvblpvb21DaGFuZ2VkID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHdpbmRvdy5pc0Rlc3Ryb3llZCgpIHx8XG4gICAgICAhd2luZG93LndlYkNvbnRlbnRzIHx8XG4gICAgICB3aW5kb3cud2ViQ29udGVudHMuaXNEZXN0cm95ZWQoKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB3aW5kb3cud2ViQ29udGVudHMuZ2V0Wm9vbUZhY3RvcigpO1xuICAgIGlmIChsYXN0Wm9vbUZhY3RvciA9PT0gem9vbUZhY3Rvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldHRpbmdzQ2hhbm5lbD8uaW52b2tlQ2FsbGJhY2tJbk1haW5XaW5kb3coJ3BlcnNpc3Rab29tRmFjdG9yJywgW1xuICAgICAgem9vbUZhY3RvcixcbiAgICBdKTtcblxuICAgIGxhc3Rab29tRmFjdG9yID0gem9vbUZhY3RvcjtcbiAgfTtcbiAgd2luZG93LndlYkNvbnRlbnRzLm9uKCdwcmVmZXJyZWQtc2l6ZS1jaGFuZ2VkJywgb25ab29tQ2hhbmdlZCk7XG5cbiAgbmF0aXZlVGhlbWVOb3RpZmllci5hZGRXaW5kb3cod2luZG93KTtcblxuICBpZiAodGl0bGVCYXJPdmVybGF5KSB7XG4gICAgY29uc3Qgb25UaGVtZUNoYW5nZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG5ld092ZXJsYXkgPSBhd2FpdCBnZXRUaXRsZUJhck92ZXJsYXkoKTtcbiAgICAgICAgaWYgKCFuZXdPdmVybGF5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5zZXRUaXRsZUJhck92ZXJsYXkobmV3T3ZlcmxheSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdvblRoZW1lQ2hhbmdlIGVycm9yJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBuYXRpdmVUaGVtZS5vbigndXBkYXRlZCcsIG9uVGhlbWVDaGFuZ2UpO1xuICAgIHNldHRpbmdzQ2hhbm5lbD8ub24oJ2NoYW5nZTp0aGVtZVNldHRpbmcnLCBvblRoZW1lQ2hhbmdlKTtcbiAgfVxufVxuXG5jb25zdCBERUZBVUxUX1dJRFRIID0gODAwO1xuY29uc3QgREVGQVVMVF9IRUlHSFQgPSA2MTA7XG4vLyBMQVJHRVNUX0xFRlRfUEFORV9XSURUSCA9IDM4MFxuLy8gVElNRUxJTkVfV0lEVEggPSAzMDBcbi8vIFRJTUVMSU5FX01BUkdJTiA9IDE2ICsgMTZcbi8vIDcxMiA9IExBUkdFU1RfTEVGVF9QQU5FX1dJRFRIICsgVElNRUxJTkVfV0lEVEggKyBUSU1FTElORV9NQVJHSU5cbmNvbnN0IE1JTl9XSURUSCA9IDcxMjtcbmNvbnN0IE1JTl9IRUlHSFQgPSA1NTA7XG5jb25zdCBCT1VORFNfQlVGRkVSID0gMTAwO1xuXG50eXBlIEJvdW5kc1R5cGUgPSB7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn07XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZSh3aW5kb3c6IEJvdW5kc1R5cGUsIGJvdW5kczogQm91bmRzVHlwZSkge1xuICBjb25zdCBib3VuZHNYID0gYm91bmRzPy54IHx8IDA7XG4gIGNvbnN0IGJvdW5kc1kgPSBib3VuZHM/LnkgfHwgMDtcbiAgY29uc3QgYm91bmRzV2lkdGggPSBib3VuZHM/LndpZHRoIHx8IERFRkFVTFRfV0lEVEg7XG4gIGNvbnN0IGJvdW5kc0hlaWdodCA9IGJvdW5kcz8uaGVpZ2h0IHx8IERFRkFVTFRfSEVJR0hUO1xuXG4gIC8vIHJlcXVpcmluZyBCT1VORFNfQlVGRkVSIHBpeGVscyBvbiB0aGUgbGVmdCBvciByaWdodCBzaWRlXG4gIGNvbnN0IHJpZ2h0U2lkZUNsZWFyT2ZMZWZ0Qm91bmQgPVxuICAgIHdpbmRvdy54ICsgd2luZG93LndpZHRoID49IGJvdW5kc1ggKyBCT1VORFNfQlVGRkVSO1xuICBjb25zdCBsZWZ0U2lkZUNsZWFyT2ZSaWdodEJvdW5kID1cbiAgICB3aW5kb3cueCA8PSBib3VuZHNYICsgYm91bmRzV2lkdGggLSBCT1VORFNfQlVGRkVSO1xuXG4gIC8vIHRvcCBjYW4ndCBiZSBvZmZzY3JlZW4sIGFuZCBtdXN0IHNob3cgYXQgbGVhc3QgQk9VTkRTX0JVRkZFUiBwaXhlbHMgYXQgYm90dG9tXG4gIGNvbnN0IHRvcENsZWFyT2ZVcHBlckJvdW5kID0gd2luZG93LnkgPj0gYm91bmRzWTtcbiAgY29uc3QgdG9wQ2xlYXJPZkxvd2VyQm91bmQgPVxuICAgIHdpbmRvdy55IDw9IGJvdW5kc1kgKyBib3VuZHNIZWlnaHQgLSBCT1VORFNfQlVGRkVSO1xuXG4gIHJldHVybiAoXG4gICAgcmlnaHRTaWRlQ2xlYXJPZkxlZnRCb3VuZCAmJlxuICAgIGxlZnRTaWRlQ2xlYXJPZlJpZ2h0Qm91bmQgJiZcbiAgICB0b3BDbGVhck9mVXBwZXJCb3VuZCAmJlxuICAgIHRvcENsZWFyT2ZMb3dlckJvdW5kXG4gICk7XG59XG5cbmxldCB3aW5kb3dJY29uOiBzdHJpbmc7XG5cbmlmIChPUy5pc1dpbmRvd3MoKSkge1xuICB3aW5kb3dJY29uID0gam9pbihfX2Rpcm5hbWUsICcuLi9idWlsZC9pY29ucy93aW4vaWNvbi5pY28nKTtcbn0gZWxzZSBpZiAoT1MuaXNMaW51eCgpKSB7XG4gIHdpbmRvd0ljb24gPSBqb2luKF9fZGlybmFtZSwgJy4uL2ltYWdlcy9zaWduYWwtbG9nby1kZXNrdG9wLWxpbnV4LnBuZycpO1xufSBlbHNlIHtcbiAgd2luZG93SWNvbiA9IGpvaW4oX19kaXJuYW1lLCAnLi4vYnVpbGQvaWNvbnMvcG5nLzUxMng1MTIucG5nJyk7XG59XG5cbmNvbnN0IG1haW5UaXRsZUJhclN0eWxlID1cbiAgT1MuaXNMaW51eCgpIHx8IGlzVGVzdEVudmlyb25tZW50KGdldEVudmlyb25tZW50KCkpXG4gICAgPyAoJ2RlZmF1bHQnIGFzIGNvbnN0KVxuICAgIDogKCdoaWRkZW4nIGFzIGNvbnN0KTtcblxuY29uc3Qgbm9uTWFpblRpdGxlQmFyU3R5bGUgPSBPUy5pc1dpbmRvd3MoKVxuICA/ICgnaGlkZGVuJyBhcyBjb25zdClcbiAgOiAoJ2RlZmF1bHQnIGFzIGNvbnN0KTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0VGl0bGVCYXJPdmVybGF5KCk6IFByb21pc2U8VGl0bGVCYXJPdmVybGF5T3B0aW9ucyB8IGZhbHNlPiB7XG4gIGlmICghT1MuaXNXaW5kb3dzKCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB0aGVtZSA9IGF3YWl0IGdldFJlc29sdmVkVGhlbWVTZXR0aW5nKCk7XG5cbiAgbGV0IGNvbG9yOiBzdHJpbmc7XG4gIGxldCBzeW1ib2xDb2xvcjogc3RyaW5nO1xuICBpZiAodGhlbWUgPT09ICdsaWdodCcpIHtcbiAgICBjb2xvciA9ICcjZThlOGU4JztcbiAgICBzeW1ib2xDb2xvciA9ICcjMWIxYjFiJztcbiAgfSBlbHNlIGlmICh0aGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgLy8gJGNvbG9yLWdyYXktODBcbiAgICBjb2xvciA9ICcjMmUyZTJlJztcbiAgICAvLyAkY29sb3ItZ3JheS0wNVxuICAgIHN5bWJvbENvbG9yID0gJyNlOWU5ZTknO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodGhlbWUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb2xvcixcbiAgICBzeW1ib2xDb2xvcixcblxuICAgIC8vIFNob3VsZCBtYXRjaCBzdHlsZXNoZWV0cy9jb21wb25lbnRzL1RpdGxlQmFyQ29udGFpbmVyLnNjc3NcbiAgICBoZWlnaHQ6IDI4LFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVXaW5kb3coKSB7XG4gIGNvbnN0IHVzZVByZWxvYWRCdW5kbGUgPVxuICAgICFpc1Rlc3RFbnZpcm9ubWVudChnZXRFbnZpcm9ubWVudCgpKSB8fCBmb3JjZVByZWxvYWRCdW5kbGU7XG5cbiAgY29uc3QgdGl0bGVCYXJPdmVybGF5ID0gYXdhaXQgZ2V0VGl0bGVCYXJPdmVybGF5KCk7XG5cbiAgY29uc3Qgd2luZG93T3B0aW9uczogRWxlY3Ryb24uQnJvd3NlcldpbmRvd0NvbnN0cnVjdG9yT3B0aW9ucyA9IHtcbiAgICBzaG93OiBmYWxzZSxcbiAgICB3aWR0aDogREVGQVVMVF9XSURUSCxcbiAgICBoZWlnaHQ6IERFRkFVTFRfSEVJR0hULFxuICAgIG1pbldpZHRoOiBNSU5fV0lEVEgsXG4gICAgbWluSGVpZ2h0OiBNSU5fSEVJR0hULFxuICAgIGF1dG9IaWRlTWVudUJhcjogZmFsc2UsXG4gICAgdGl0bGVCYXJTdHlsZTogbWFpblRpdGxlQmFyU3R5bGUsXG4gICAgdGl0bGVCYXJPdmVybGF5LFxuICAgIGJhY2tncm91bmRDb2xvcjogaXNUZXN0RW52aXJvbm1lbnQoZ2V0RW52aXJvbm1lbnQoKSlcbiAgICAgID8gJyNmZmZmZmYnIC8vIFRlc3RzIHNob3VsZCBhbHdheXMgYmUgcmVuZGVyZWQgb24gYSB3aGl0ZSBiYWNrZ3JvdW5kXG4gICAgICA6IGF3YWl0IGdldEJhY2tncm91bmRDb2xvcigpLFxuICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICAuLi5kZWZhdWx0V2ViUHJlZnMsXG4gICAgICBub2RlSW50ZWdyYXRpb246IGZhbHNlLFxuICAgICAgbm9kZUludGVncmF0aW9uSW5Xb3JrZXI6IGZhbHNlLFxuICAgICAgY29udGV4dElzb2xhdGlvbjogZmFsc2UsXG4gICAgICBwcmVsb2FkOiBqb2luKFxuICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgIHVzZVByZWxvYWRCdW5kbGVcbiAgICAgICAgICA/ICcuLi9wcmVsb2FkLmJ1bmRsZS5qcydcbiAgICAgICAgICA6ICcuLi90cy93aW5kb3dzL21haW4vcHJlbG9hZC5qcydcbiAgICAgICksXG4gICAgICBzcGVsbGNoZWNrOiBhd2FpdCBnZXRTcGVsbENoZWNrU2V0dGluZygpLFxuICAgICAgYmFja2dyb3VuZFRocm90dGxpbmc6IGlzVGhyb3R0bGluZ0VuYWJsZWQsXG4gICAgICBlbmFibGVQcmVmZXJyZWRTaXplTW9kZTogdHJ1ZSxcbiAgICAgIGRpc2FibGVCbGlua0ZlYXR1cmVzOiAnQWNjZWxlcmF0ZWQyZENhbnZhcyxBY2NlbGVyYXRlZFNtYWxsQ2FudmFzZXMnLFxuICAgIH0sXG4gICAgaWNvbjogd2luZG93SWNvbixcbiAgICAuLi5waWNrKHdpbmRvd0NvbmZpZywgWydhdXRvSGlkZU1lbnVCYXInLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3gnLCAneSddKSxcbiAgfTtcblxuICBpZiAoIWlzTnVtYmVyKHdpbmRvd09wdGlvbnMud2lkdGgpIHx8IHdpbmRvd09wdGlvbnMud2lkdGggPCBNSU5fV0lEVEgpIHtcbiAgICB3aW5kb3dPcHRpb25zLndpZHRoID0gREVGQVVMVF9XSURUSDtcbiAgfVxuICBpZiAoIWlzTnVtYmVyKHdpbmRvd09wdGlvbnMuaGVpZ2h0KSB8fCB3aW5kb3dPcHRpb25zLmhlaWdodCA8IE1JTl9IRUlHSFQpIHtcbiAgICB3aW5kb3dPcHRpb25zLmhlaWdodCA9IERFRkFVTFRfSEVJR0hUO1xuICB9XG4gIGlmICghaXNCb29sZWFuKHdpbmRvd09wdGlvbnMuYXV0b0hpZGVNZW51QmFyKSkge1xuICAgIGRlbGV0ZSB3aW5kb3dPcHRpb25zLmF1dG9IaWRlTWVudUJhcjtcbiAgfVxuXG4gIGNvbnN0IHN0YXJ0SW5UcmF5ID1cbiAgICAoYXdhaXQgc3lzdGVtVHJheVNldHRpbmdDYWNoZS5nZXQoKSkgPT09XG4gICAgU3lzdGVtVHJheVNldHRpbmcuTWluaW1pemVUb0FuZFN0YXJ0SW5TeXN0ZW1UcmF5O1xuXG4gIGNvbnN0IHZpc2libGVPbkFueVNjcmVlbiA9IHNvbWUoc2NyZWVuLmdldEFsbERpc3BsYXlzKCksIGRpc3BsYXkgPT4ge1xuICAgIGlmIChcbiAgICAgIGlzTnVtYmVyKHdpbmRvd09wdGlvbnMueCkgJiZcbiAgICAgIGlzTnVtYmVyKHdpbmRvd09wdGlvbnMueSkgJiZcbiAgICAgIGlzTnVtYmVyKHdpbmRvd09wdGlvbnMud2lkdGgpICYmXG4gICAgICBpc051bWJlcih3aW5kb3dPcHRpb25zLmhlaWdodClcbiAgICApIHtcbiAgICAgIHJldHVybiBpc1Zpc2libGUod2luZG93T3B0aW9ucyBhcyBCb3VuZHNUeXBlLCBnZXQoZGlzcGxheSwgJ2JvdW5kcycpKTtcbiAgICB9XG5cbiAgICBnZXRMb2dnZXIoKS5lcnJvcihcbiAgICAgIFwidmlzaWJsZU9uQW55U2NyZWVuOiB3aW5kb3dPcHRpb25zIGRpZG4ndCBoYXZlIHZhbGlkIGJvdW5kcyBmaWVsZHNcIlxuICAgICk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgaWYgKCF2aXNpYmxlT25BbnlTY3JlZW4pIHtcbiAgICBnZXRMb2dnZXIoKS5pbmZvKCdMb2NhdGlvbiByZXNldCBuZWVkZWQnKTtcbiAgICBkZWxldGUgd2luZG93T3B0aW9ucy54O1xuICAgIGRlbGV0ZSB3aW5kb3dPcHRpb25zLnk7XG4gIH1cblxuICBnZXRMb2dnZXIoKS5pbmZvKFxuICAgICdJbml0aWFsaXppbmcgQnJvd3NlcldpbmRvdyBjb25maWc6JyxcbiAgICBKU09OLnN0cmluZ2lmeSh3aW5kb3dPcHRpb25zKVxuICApO1xuXG4gIC8vIENyZWF0ZSB0aGUgYnJvd3NlciB3aW5kb3cuXG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh3aW5kb3dPcHRpb25zKTtcbiAgaWYgKHNldHRpbmdzQ2hhbm5lbCkge1xuICAgIHNldHRpbmdzQ2hhbm5lbC5zZXRNYWluV2luZG93KG1haW5XaW5kb3cpO1xuICB9XG5cbiAgbWFpbldpbmRvd0NyZWF0ZWQgPSB0cnVlO1xuICBzZXR1cFNwZWxsQ2hlY2tlcihtYWluV2luZG93LCBnZXRMb2NhbGUoKSk7XG4gIGlmICghc3RhcnRJblRyYXkgJiYgd2luZG93Q29uZmlnICYmIHdpbmRvd0NvbmZpZy5tYXhpbWl6ZWQpIHtcbiAgICBtYWluV2luZG93Lm1heGltaXplKCk7XG4gIH1cbiAgaWYgKCFzdGFydEluVHJheSAmJiB3aW5kb3dDb25maWcgJiYgd2luZG93Q29uZmlnLmZ1bGxzY3JlZW4pIHtcbiAgICBtYWluV2luZG93LnNldEZ1bGxTY3JlZW4odHJ1ZSk7XG4gIH1cbiAgaWYgKHN5c3RlbVRyYXlTZXJ2aWNlKSB7XG4gICAgc3lzdGVtVHJheVNlcnZpY2Uuc2V0TWFpbldpbmRvdyhtYWluV2luZG93KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVXaW5kb3dTdGF0cygpIHtcbiAgICBpZiAoIXdpbmRvd0NvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdldExvZ2dlcigpLmluZm8oXG4gICAgICAnVXBkYXRpbmcgQnJvd3NlcldpbmRvdyBjb25maWc6ICVzJyxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHdpbmRvd0NvbmZpZylcbiAgICApO1xuICAgIGVwaGVtZXJhbENvbmZpZy5zZXQoJ3dpbmRvdycsIHdpbmRvd0NvbmZpZyk7XG4gIH1cbiAgY29uc3QgZGVib3VuY2VkU2F2ZVN0YXRzID0gZGVib3VuY2Uoc2F2ZVdpbmRvd1N0YXRzLCA1MDApO1xuXG4gIGZ1bmN0aW9uIGNhcHR1cmVXaW5kb3dTdGF0cygpIHtcbiAgICBpZiAoIW1haW5XaW5kb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gbWFpbldpbmRvdy5nZXRTaXplKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBtYWluV2luZG93LmdldFBvc2l0aW9uKCk7XG5cbiAgICBjb25zdCBuZXdXaW5kb3dDb25maWcgPSB7XG4gICAgICBtYXhpbWl6ZWQ6IG1haW5XaW5kb3cuaXNNYXhpbWl6ZWQoKSxcbiAgICAgIGF1dG9IaWRlTWVudUJhcjogbWFpbldpbmRvdy5hdXRvSGlkZU1lbnVCYXIsXG4gICAgICBmdWxsc2NyZWVuOiBtYWluV2luZG93LmlzRnVsbFNjcmVlbigpLFxuICAgICAgd2lkdGg6IHNpemVbMF0sXG4gICAgICBoZWlnaHQ6IHNpemVbMV0sXG4gICAgICB4OiBwb3NpdGlvblswXSxcbiAgICAgIHk6IHBvc2l0aW9uWzFdLFxuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICBuZXdXaW5kb3dDb25maWcuZnVsbHNjcmVlbiAhPT0gd2luZG93Q29uZmlnPy5mdWxsc2NyZWVuIHx8XG4gICAgICBuZXdXaW5kb3dDb25maWcubWF4aW1pemVkICE9PSB3aW5kb3dDb25maWc/Lm1heGltaXplZFxuICAgICkge1xuICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCd3aW5kb3c6c2V0LXdpbmRvdy1zdGF0cycsIHtcbiAgICAgICAgaXNNYXhpbWl6ZWQ6IG5ld1dpbmRvd0NvbmZpZy5tYXhpbWl6ZWQsXG4gICAgICAgIGlzRnVsbFNjcmVlbjogbmV3V2luZG93Q29uZmlnLmZ1bGxzY3JlZW4sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzbyBpZiB3ZSBuZWVkIHRvIHJlY3JlYXRlIHRoZSB3aW5kb3csIHdlIGhhdmUgdGhlIG1vc3QgcmVjZW50IHNldHRpbmdzXG4gICAgd2luZG93Q29uZmlnID0gbmV3V2luZG93Q29uZmlnO1xuXG4gICAgZGVib3VuY2VkU2F2ZVN0YXRzKCk7XG4gIH1cblxuICBtYWluV2luZG93Lm9uKCdyZXNpemUnLCBjYXB0dXJlV2luZG93U3RhdHMpO1xuICBtYWluV2luZG93Lm9uKCdtb3ZlJywgY2FwdHVyZVdpbmRvd1N0YXRzKTtcblxuICBjb25zdCBzZXRXaW5kb3dGb2N1cyA9ICgpID0+IHtcbiAgICBpZiAoIW1haW5XaW5kb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdzZXQtd2luZG93LWZvY3VzJywgbWFpbldpbmRvdy5pc0ZvY3VzZWQoKSk7XG4gIH07XG4gIG1haW5XaW5kb3cub24oJ2ZvY3VzJywgc2V0V2luZG93Rm9jdXMpO1xuICBtYWluV2luZG93Lm9uKCdibHVyJywgc2V0V2luZG93Rm9jdXMpO1xuICBtYWluV2luZG93Lm9uY2UoJ3JlYWR5LXRvLXNob3cnLCBzZXRXaW5kb3dGb2N1cyk7XG4gIC8vIFRoaXMgaXMgYSBmYWxsYmFjayBpbiBjYXNlIHdlIGRyb3AgYW4gZXZlbnQgZm9yIHNvbWUgcmVhc29uLlxuICBzZXRJbnRlcnZhbChzZXRXaW5kb3dGb2N1cywgMTAwMDApO1xuXG4gIGlmIChnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5UZXN0KSB7XG4gICAgbWFpbldpbmRvdy5sb2FkVVJMKGF3YWl0IHByZXBhcmVGaWxlVXJsKFtfX2Rpcm5hbWUsICcuLi90ZXN0L2luZGV4Lmh0bWwnXSkpO1xuICB9IGVsc2Uge1xuICAgIG1haW5XaW5kb3cubG9hZFVSTChhd2FpdCBwcmVwYXJlRmlsZVVybChbX19kaXJuYW1lLCAnLi4vYmFja2dyb3VuZC5odG1sJ10pKTtcbiAgfVxuXG4gIGlmICghZW5hYmxlQ0kgJiYgY29uZmlnLmdldDxib29sZWFuPignb3BlbkRldlRvb2xzJykpIHtcbiAgICAvLyBPcGVuIHRoZSBEZXZUb29scy5cbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xuICB9XG5cbiAgaGFuZGxlQ29tbW9uV2luZG93RXZlbnRzKG1haW5XaW5kb3csIHRpdGxlQmFyT3ZlcmxheSk7XG5cbiAgLy8gQXBwIGRvY2sgaWNvbiBib3VuY2VcbiAgYm91bmNlLmluaXQobWFpbldpbmRvdyk7XG5cbiAgLy8gRW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgYWJvdXQgdG8gYmUgY2xvc2VkLlxuICAvLyBOb3RlOiBXZSBkbyBtb3N0IG9mIG91ciBzaHV0ZG93biBsb2dpYyBoZXJlIGJlY2F1c2UgYWxsIHdpbmRvd3MgYXJlIGNsb3NlZCBieVxuICAvLyAgIEVsZWN0cm9uIGJlZm9yZSB0aGUgYXBwIHF1aXRzLlxuICBtYWluV2luZG93Lm9uKCdjbG9zZScsIGFzeW5jIGUgPT4ge1xuICAgIGlmICghbWFpbldpbmRvdykge1xuICAgICAgZ2V0TG9nZ2VyKCkuaW5mbygnY2xvc2UgZXZlbnQ6IG5vIG1haW4gd2luZG93Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2V0TG9nZ2VyKCkuaW5mbygnY2xvc2UgZXZlbnQnLCB7XG4gICAgICByZWFkeUZvclNodXRkb3duOiB3aW5kb3dTdGF0ZS5yZWFkeUZvclNodXRkb3duKCksXG4gICAgICBzaG91bGRRdWl0OiB3aW5kb3dTdGF0ZS5zaG91bGRRdWl0KCksXG4gICAgfSk7XG4gICAgLy8gSWYgdGhlIGFwcGxpY2F0aW9uIGlzIHRlcm1pbmF0aW5nLCBqdXN0IGRvIHRoZSBkZWZhdWx0XG4gICAgaWYgKFxuICAgICAgaXNUZXN0RW52aXJvbm1lbnQoZ2V0RW52aXJvbm1lbnQoKSkgfHxcbiAgICAgICh3aW5kb3dTdGF0ZS5yZWFkeUZvclNodXRkb3duKCkgJiYgd2luZG93U3RhdGUuc2hvdWxkUXVpdCgpKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFByZXZlbnQgdGhlIHNodXRkb3duXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIHVzZXIgaXMgaW4gZnVsbHNjcmVlbiBtb2RlIGFuZCBjbG9zZXMgdGhlIHdpbmRvdywgbm90IHRoZVxuICAgICAqIGFwcGxpY2F0aW9uLCB3ZSBuZWVkIHRoZW0gbGVhdmUgZnVsbHNjcmVlbiBmaXJzdCBiZWZvcmUgY2xvc2luZyBpdCB0b1xuICAgICAqIHByZXZlbnQgYSBibGFjayBzY3JlZW4uXG4gICAgICpcbiAgICAgKiBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtRGVza3RvcC9pc3N1ZXMvNDM0OFxuICAgICAqL1xuXG4gICAgaWYgKG1haW5XaW5kb3cuaXNGdWxsU2NyZWVuKCkpIHtcbiAgICAgIG1haW5XaW5kb3cub25jZSgnbGVhdmUtZnVsbC1zY3JlZW4nLCAoKSA9PiBtYWluV2luZG93Py5oaWRlKCkpO1xuICAgICAgbWFpbldpbmRvdy5zZXRGdWxsU2NyZWVuKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFpbldpbmRvdy5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gT24gTWFjLCBvciBvbiBvdGhlciBwbGF0Zm9ybXMgd2hlbiB0aGUgdHJheSBpY29uIGlzIGluIHVzZSwgdGhlIHdpbmRvd1xuICAgIC8vIHNob3VsZCBiZSBvbmx5IGhpZGRlbiwgbm90IGNsb3NlZCwgd2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGNsb3NlIGJ1dHRvblxuICAgIGNvbnN0IHVzaW5nVHJheUljb24gPSBzaG91bGRNaW5pbWl6ZVRvU3lzdGVtVHJheShcbiAgICAgIGF3YWl0IHN5c3RlbVRyYXlTZXR0aW5nQ2FjaGUuZ2V0KClcbiAgICApO1xuICAgIGlmICghd2luZG93U3RhdGUuc2hvdWxkUXVpdCgpICYmICh1c2luZ1RyYXlJY29uIHx8IE9TLmlzTWFjT1MoKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCByZXF1ZXN0U2h1dGRvd24oKTtcbiAgICB3aW5kb3dTdGF0ZS5tYXJrUmVhZHlGb3JTaHV0ZG93bigpO1xuXG4gICAgYXdhaXQgc3FsLmNsb3NlKCk7XG4gICAgYXBwLnF1aXQoKTtcbiAgfSk7XG5cbiAgLy8gRW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgY2xvc2VkLlxuICBtYWluV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgLy8gRGVyZWZlcmVuY2UgdGhlIHdpbmRvdyBvYmplY3QsIHVzdWFsbHkgeW91IHdvdWxkIHN0b3JlIHdpbmRvd3NcbiAgICAvLyBpbiBhbiBhcnJheSBpZiB5b3VyIGFwcCBzdXBwb3J0cyBtdWx0aSB3aW5kb3dzLCB0aGlzIGlzIHRoZSB0aW1lXG4gICAgLy8gd2hlbiB5b3Ugc2hvdWxkIGRlbGV0ZSB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50LlxuICAgIG1haW5XaW5kb3cgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHNldHRpbmdzQ2hhbm5lbCkge1xuICAgICAgc2V0dGluZ3NDaGFubmVsLnNldE1haW5XaW5kb3cobWFpbldpbmRvdyk7XG4gICAgfVxuICAgIGlmIChzeXN0ZW1UcmF5U2VydmljZSkge1xuICAgICAgc3lzdGVtVHJheVNlcnZpY2Uuc2V0TWFpbldpbmRvdyhtYWluV2luZG93KTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5XaW5kb3cub24oJ2VudGVyLWZ1bGwtc2NyZWVuJywgKCkgPT4ge1xuICAgIGlmIChtYWluV2luZG93KSB7XG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ2Z1bGwtc2NyZWVuLWNoYW5nZScsIHRydWUpO1xuICAgIH1cbiAgfSk7XG4gIG1haW5XaW5kb3cub24oJ2xlYXZlLWZ1bGwtc2NyZWVuJywgKCkgPT4ge1xuICAgIGlmIChtYWluV2luZG93KSB7XG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ2Z1bGwtc2NyZWVuLWNoYW5nZScsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5XaW5kb3cub25jZSgncmVhZHktdG8tc2hvdycsIGFzeW5jICgpID0+IHtcbiAgICBnZXRMb2dnZXIoKS5pbmZvKCdtYWluIHdpbmRvdyBpcyByZWFkeS10by1zaG93Jyk7XG5cbiAgICAvLyBJZ25vcmUgc3FsIGVycm9ycyBhbmQgc2hvdyB0aGUgd2luZG93IGFueXdheVxuICAgIGF3YWl0IHNxbEluaXRQcm9taXNlO1xuXG4gICAgaWYgKCFtYWluV2luZG93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvdWxkU2hvd1dpbmRvdyA9XG4gICAgICAhYXBwLmdldExvZ2luSXRlbVNldHRpbmdzKCkud2FzT3BlbmVkQXNIaWRkZW4gJiYgIXN0YXJ0SW5UcmF5O1xuXG4gICAgaWYgKHNob3VsZFNob3dXaW5kb3cpIHtcbiAgICAgIGdldExvZ2dlcigpLmluZm8oJ3Nob3dpbmcgbWFpbiB3aW5kb3cnKTtcbiAgICAgIG1haW5XaW5kb3cuc2hvdygpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIFJlbmRlcmVyIGFza3MgaWYgd2UgYXJlIGRvbmUgd2l0aCB0aGUgZGF0YWJhc2VcbmlwYy5vbignZGF0YWJhc2UtcmVhZHknLCBhc3luYyBldmVudCA9PiB7XG4gIGlmICghc3FsSW5pdFByb21pc2UpIHtcbiAgICBnZXRMb2dnZXIoKS5lcnJvcignZGF0YWJhc2UtcmVhZHkgcmVxdWVzdGVkLCBidXQgc3FsSW5pdFByb21pc2UgaXMgZmFsc2V5Jyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3FsSW5pdFByb21pc2U7XG4gIGlmIChlcnJvcikge1xuICAgIGdldExvZ2dlcigpLmVycm9yKFxuICAgICAgJ2RhdGFiYXNlLXJlYWR5IHJlcXVlc3RlZCwgYnV0IGdvdCBzcWwgZXJyb3InLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2tcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGdldExvZ2dlcigpLmluZm8oJ3NlbmRpbmcgYGRhdGFiYXNlLXJlYWR5YCcpO1xuICBldmVudC5zZW5kZXIuc2VuZCgnZGF0YWJhc2UtcmVhZHknKTtcbn0pO1xuXG5pcGMub24oJ3Nob3ctd2luZG93JywgKCkgPT4ge1xuICBzaG93V2luZG93KCk7XG59KTtcblxuaXBjLm9uKCd0aXRsZS1iYXItZG91YmxlLWNsaWNrJywgKCkgPT4ge1xuICBpZiAoIW1haW5XaW5kb3cpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoT1MuaXNNYWNPUygpKSB7XG4gICAgc3dpdGNoIChcbiAgICAgIHN5c3RlbVByZWZlcmVuY2VzLmdldFVzZXJEZWZhdWx0KCdBcHBsZUFjdGlvbk9uRG91YmxlQ2xpY2snLCAnc3RyaW5nJylcbiAgICApIHtcbiAgICAgIGNhc2UgJ01pbmltaXplJzpcbiAgICAgICAgbWFpbldpbmRvdy5taW5pbWl6ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ01heGltaXplJzpcbiAgICAgICAgdG9nZ2xlTWF4aW1pemVkQnJvd3NlcldpbmRvdyhtYWluV2luZG93KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGRpc2FibGVkLCBpdCdsbCBiZSAnTm9uZScuIElmIGl0J3MgYW55dGhpbmcgZWxzZSwgdGhhdCdzIHVuZXhwZWN0ZWQsXG4gICAgICAgIC8vICAgYnV0IHdlJ2xsIGp1c3Qgbm8tb3AuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBUaGlzIGlzIGN1cnJlbnRseSBvbmx5IHN1cHBvcnRlZCBvbiBtYWNPUy4gVGhpcyBgZWxzZWAgYnJhbmNoIGlzIGp1c3QgaGVyZSB3aGVuL2lmXG4gICAgLy8gICB3ZSBhZGQgc3VwcG9ydCBmb3Igb3RoZXIgb3BlcmF0aW5nIHN5c3RlbXMuXG4gICAgdG9nZ2xlTWF4aW1pemVkQnJvd3NlcldpbmRvdyhtYWluV2luZG93KTtcbiAgfVxufSk7XG5cbmlwYy5vbignc2V0LWlzLWNhbGwtYWN0aXZlJywgKF9ldmVudCwgaXNDYWxsQWN0aXZlKSA9PiB7XG4gIHByZXZlbnREaXNwbGF5U2xlZXBTZXJ2aWNlLnNldEVuYWJsZWQoaXNDYWxsQWN0aXZlKTtcblxuICBpZiAoIW1haW5XaW5kb3cpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIWlzVGhyb3R0bGluZ0VuYWJsZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgYmFja2dyb3VuZFRocm90dGxpbmc6IGJvb2xlYW47XG4gIGlmIChpc0NhbGxBY3RpdmUpIHtcbiAgICBnZXRMb2dnZXIoKS5pbmZvKCdCYWNrZ3JvdW5kIHRocm90dGxpbmcgZGlzYWJsZWQgYmVjYXVzZSBhIGNhbGwgaXMgYWN0aXZlJyk7XG4gICAgYmFja2dyb3VuZFRocm90dGxpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBnZXRMb2dnZXIoKS5pbmZvKCdCYWNrZ3JvdW5kIHRocm90dGxpbmcgZW5hYmxlZCBiZWNhdXNlIG5vIGNhbGwgaXMgYWN0aXZlJyk7XG4gICAgYmFja2dyb3VuZFRocm90dGxpbmcgPSB0cnVlO1xuICB9XG5cbiAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZXRCYWNrZ3JvdW5kVGhyb3R0bGluZyhiYWNrZ3JvdW5kVGhyb3R0bGluZyk7XG59KTtcblxuaXBjLm9uKCdjb252ZXJ0LWltYWdlJywgYXN5bmMgKGV2ZW50LCB1dWlkLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHsgZXJyb3IsIHJlc3BvbnNlIH0gPSBhd2FpdCBoZWljQ29udmVydGVyKHV1aWQsIGRhdGEpO1xuICBldmVudC5yZXBseShgY29udmVydC1pbWFnZToke3V1aWR9YCwgeyBlcnJvciwgcmVzcG9uc2UgfSk7XG59KTtcblxubGV0IGlzUmVhZHlGb3JVcGRhdGVzID0gZmFsc2U7XG5hc3luYyBmdW5jdGlvbiByZWFkeUZvclVwZGF0ZXMoKSB7XG4gIGlmIChpc1JlYWR5Rm9yVXBkYXRlcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlzUmVhZHlGb3JVcGRhdGVzID0gdHJ1ZTtcblxuICAvLyBGaXJzdCwgaW5zdGFsbCByZXF1ZXN0ZWQgc3RpY2tlciBwYWNrXG4gIGNvbnN0IGluY29taW5nSHJlZiA9IGdldEluY29taW5nSHJlZihwcm9jZXNzLmFyZ3YpO1xuICBpZiAoaW5jb21pbmdIcmVmKSB7XG4gICAgaGFuZGxlU2dubEhyZWYoaW5jb21pbmdIcmVmKTtcbiAgfVxuXG4gIC8vIFNlY29uZCwgc3RhcnQgY2hlY2tpbmcgZm9yIGFwcCB1cGRhdGVzXG4gIHRyeSB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgc2V0dGluZ3NDaGFubmVsICE9PSB1bmRlZmluZWQsXG4gICAgICAnU2V0dGluZ3NDaGFubmVsIG11c3QgYmUgaW5pdGlhbGl6ZWQnXG4gICAgKTtcbiAgICBhd2FpdCB1cGRhdGVyLnN0YXJ0KHNldHRpbmdzQ2hhbm5lbCwgZ2V0TG9nZ2VyKCksIGdldE1haW5XaW5kb3cpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdldExvZ2dlcigpLmVycm9yKFxuICAgICAgJ0Vycm9yIHN0YXJ0aW5nIHVwZGF0ZSBjaGVja3M6JyxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gIHRyeSB7XG4gICAgZ2V0TG9nZ2VyKCkuaW5mbygnc3RhcnRpbmcgZm9yY2UgdXBkYXRlJyk7XG4gICAgYXdhaXQgdXBkYXRlci5mb3JjZSgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdldExvZ2dlcigpLmVycm9yKFxuICAgICAgJ0Vycm9yIGR1cmluZyBmb3JjZSB1cGRhdGU6JyxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG4gIH1cbn1cblxuaXBjLm9uY2UoJ3JlYWR5LWZvci11cGRhdGVzJywgcmVhZHlGb3JVcGRhdGVzKTtcblxuY29uc3QgVEVOX01JTlVURVMgPSAxMCAqIDYwICogMTAwMDtcbnNldFRpbWVvdXQocmVhZHlGb3JVcGRhdGVzLCBURU5fTUlOVVRFUyk7XG5cbmZ1bmN0aW9uIG9wZW5Db250YWN0VXMoKSB7XG4gIHNoZWxsLm9wZW5FeHRlcm5hbChjcmVhdGVTdXBwb3J0VXJsKHsgbG9jYWxlOiBhcHAuZ2V0TG9jYWxlKCkgfSkpO1xufVxuXG5mdW5jdGlvbiBvcGVuSm9pblRoZUJldGEoKSB7XG4gIC8vIElmIHdlIG9taXQgdGhlIGxhbmd1YWdlLCB0aGUgc2l0ZSB3aWxsIGRldGVjdCB0aGUgbGFuZ3VhZ2UgYW5kIHJlZGlyZWN0XG4gIHNoZWxsLm9wZW5FeHRlcm5hbCgnaHR0cHM6Ly9zdXBwb3J0LnNpZ25hbC5vcmcvaGMvYXJ0aWNsZXMvMzYwMDA3MzE4NDcxJyk7XG59XG5cbmZ1bmN0aW9uIG9wZW5SZWxlYXNlTm90ZXMoKSB7XG4gIGlmIChtYWluV2luZG93ICYmIG1haW5XaW5kb3cuaXNWaXNpYmxlKCkpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3Nob3ctcmVsZWFzZS1ub3RlcycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNoZWxsLm9wZW5FeHRlcm5hbChcbiAgICBgaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtRGVza3RvcC9yZWxlYXNlcy90YWcvdiR7YXBwLmdldFZlcnNpb24oKX1gXG4gICk7XG59XG5cbmZ1bmN0aW9uIG9wZW5TdXBwb3J0UGFnZSgpIHtcbiAgLy8gSWYgd2Ugb21pdCB0aGUgbGFuZ3VhZ2UsIHRoZSBzaXRlIHdpbGwgZGV0ZWN0IHRoZSBsYW5ndWFnZSBhbmQgcmVkaXJlY3RcbiAgc2hlbGwub3BlbkV4dGVybmFsKCdodHRwczovL3N1cHBvcnQuc2lnbmFsLm9yZy9oYy9zZWN0aW9ucy8zNjAwMDE2MDI4MTInKTtcbn1cblxuZnVuY3Rpb24gb3BlbkZvcnVtcygpIHtcbiAgc2hlbGwub3BlbkV4dGVybmFsKCdodHRwczovL2NvbW11bml0eS5zaWduYWx1c2Vycy5vcmcvJyk7XG59XG5cbmZ1bmN0aW9uIHNob3dLZXlib2FyZFNob3J0Y3V0cygpIHtcbiAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3Nob3cta2V5Ym9hcmQtc2hvcnRjdXRzJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBBc05ld0RldmljZSgpIHtcbiAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3NldC11cC1hcy1uZXctZGV2aWNlJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBBc1N0YW5kYWxvbmUoKSB7XG4gIGlmIChtYWluV2luZG93KSB7XG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdzZXQtdXAtYXMtc3RhbmRhbG9uZScpO1xuICB9XG59XG5cbmxldCBzY3JlZW5TaGFyZVdpbmRvdzogQnJvd3NlcldpbmRvdyB8IHVuZGVmaW5lZDtcbmFzeW5jIGZ1bmN0aW9uIHNob3dTY3JlZW5TaGFyZVdpbmRvdyhzb3VyY2VOYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHNjcmVlblNoYXJlV2luZG93KSB7XG4gICAgc2NyZWVuU2hhcmVXaW5kb3cuc2hvd0luYWN0aXZlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2lkdGggPSA0ODA7XG5cbiAgY29uc3QgZGlzcGxheSA9IHNjcmVlbi5nZXRQcmltYXJ5RGlzcGxheSgpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGFsd2F5c09uVG9wOiB0cnVlLFxuICAgIGF1dG9IaWRlTWVudUJhcjogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMmUyZTJlJyxcbiAgICBkYXJrVGhlbWU6IHRydWUsXG4gICAgZnJhbWU6IGZhbHNlLFxuICAgIGZ1bGxzY3JlZW5hYmxlOiBmYWxzZSxcbiAgICBoZWlnaHQ6IDQ0LFxuICAgIG1heGltaXphYmxlOiBmYWxzZSxcbiAgICBtaW5pbWl6YWJsZTogZmFsc2UsXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICBzaG93OiBmYWxzZSxcbiAgICB0aXRsZTogZ2V0TG9jYWxlKCkuaTE4bignc2NyZWVuU2hhcmVXaW5kb3cnKSxcbiAgICB0aXRsZUJhclN0eWxlOiBub25NYWluVGl0bGVCYXJTdHlsZSxcbiAgICB3aWR0aCxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgLi4uZGVmYXVsdFdlYlByZWZzLFxuICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiBmYWxzZSxcbiAgICAgIGNvbnRleHRJc29sYXRpb246IHRydWUsXG4gICAgICBwcmVsb2FkOiBqb2luKF9fZGlybmFtZSwgJy4uL3RzL3dpbmRvd3Mvc2NyZWVuU2hhcmUvcHJlbG9hZC5qcycpLFxuICAgIH0sXG4gICAgeDogTWF0aC5mbG9vcihkaXNwbGF5LnNpemUud2lkdGggLyAyKSAtIHdpZHRoIC8gMixcbiAgICB5OiAyNCxcbiAgfTtcblxuICBzY3JlZW5TaGFyZVdpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KG9wdGlvbnMpO1xuXG4gIGhhbmRsZUNvbW1vbldpbmRvd0V2ZW50cyhzY3JlZW5TaGFyZVdpbmRvdyk7XG5cbiAgc2NyZWVuU2hhcmVXaW5kb3cubG9hZFVSTChcbiAgICBhd2FpdCBwcmVwYXJlRmlsZVVybChbX19kaXJuYW1lLCAnLi4vc2NyZWVuU2hhcmUuaHRtbCddKVxuICApO1xuXG4gIHNjcmVlblNoYXJlV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgc2NyZWVuU2hhcmVXaW5kb3cgPSB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIHNjcmVlblNoYXJlV2luZG93Lm9uY2UoJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiB7XG4gICAgaWYgKHNjcmVlblNoYXJlV2luZG93KSB7XG4gICAgICBzY3JlZW5TaGFyZVdpbmRvdy5zaG93SW5hY3RpdmUoKTtcbiAgICAgIHNjcmVlblNoYXJlV2luZG93LndlYkNvbnRlbnRzLnNlbmQoXG4gICAgICAgICdyZW5kZXItc2NyZWVuLXNoYXJpbmctY29udHJvbGxlcicsXG4gICAgICAgIHNvdXJjZU5hbWVcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cblxubGV0IGFib3V0V2luZG93OiBCcm93c2VyV2luZG93IHwgdW5kZWZpbmVkO1xuYXN5bmMgZnVuY3Rpb24gc2hvd0Fib3V0KCkge1xuICBpZiAoYWJvdXRXaW5kb3cpIHtcbiAgICBhYm91dFdpbmRvdy5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGl0bGVCYXJPdmVybGF5ID0gYXdhaXQgZ2V0VGl0bGVCYXJPdmVybGF5KCk7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3aWR0aDogNTAwLFxuICAgIGhlaWdodDogNTAwLFxuICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgdGl0bGU6IGdldExvY2FsZSgpLmkxOG4oJ2Fib3V0U2lnbmFsRGVza3RvcCcpLFxuICAgIHRpdGxlQmFyU3R5bGU6IG5vbk1haW5UaXRsZUJhclN0eWxlLFxuICAgIHRpdGxlQmFyT3ZlcmxheSxcbiAgICBhdXRvSGlkZU1lbnVCYXI6IHRydWUsXG4gICAgYmFja2dyb3VuZENvbG9yOiBhd2FpdCBnZXRCYWNrZ3JvdW5kQ29sb3IoKSxcbiAgICBzaG93OiBmYWxzZSxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgLi4uZGVmYXVsdFdlYlByZWZzLFxuICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiBmYWxzZSxcbiAgICAgIGNvbnRleHRJc29sYXRpb246IHRydWUsXG4gICAgICBwcmVsb2FkOiBqb2luKF9fZGlybmFtZSwgJy4uL3RzL3dpbmRvd3MvYWJvdXQvcHJlbG9hZC5qcycpLFxuICAgICAgbmF0aXZlV2luZG93T3BlbjogdHJ1ZSxcbiAgICB9LFxuICB9O1xuXG4gIGFib3V0V2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3cob3B0aW9ucyk7XG5cbiAgaGFuZGxlQ29tbW9uV2luZG93RXZlbnRzKGFib3V0V2luZG93LCB0aXRsZUJhck92ZXJsYXkpO1xuXG4gIGFib3V0V2luZG93LmxvYWRVUkwoYXdhaXQgcHJlcGFyZUZpbGVVcmwoW19fZGlybmFtZSwgJy4uL2Fib3V0Lmh0bWwnXSkpO1xuXG4gIGFib3V0V2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgYWJvdXRXaW5kb3cgPSB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGFib3V0V2luZG93Lm9uY2UoJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiB7XG4gICAgaWYgKGFib3V0V2luZG93KSB7XG4gICAgICBhYm91dFdpbmRvdy5zaG93KCk7XG4gICAgfVxuICB9KTtcbn1cblxubGV0IHNldHRpbmdzV2luZG93OiBCcm93c2VyV2luZG93IHwgdW5kZWZpbmVkO1xuYXN5bmMgZnVuY3Rpb24gc2hvd1NldHRpbmdzV2luZG93KCkge1xuICBpZiAoc2V0dGluZ3NXaW5kb3cpIHtcbiAgICBzZXR0aW5nc1dpbmRvdy5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGl0bGVCYXJPdmVybGF5ID0gYXdhaXQgZ2V0VGl0bGVCYXJPdmVybGF5KCk7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3aWR0aDogNzAwLFxuICAgIGhlaWdodDogNzAwLFxuICAgIGZyYW1lOiB0cnVlLFxuICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgdGl0bGU6IGdldExvY2FsZSgpLmkxOG4oJ3NpZ25hbERlc2t0b3BQcmVmZXJlbmNlcycpLFxuICAgIHRpdGxlQmFyU3R5bGU6IG5vbk1haW5UaXRsZUJhclN0eWxlLFxuICAgIHRpdGxlQmFyT3ZlcmxheSxcbiAgICBhdXRvSGlkZU1lbnVCYXI6IHRydWUsXG4gICAgYmFja2dyb3VuZENvbG9yOiBhd2FpdCBnZXRCYWNrZ3JvdW5kQ29sb3IoKSxcbiAgICBzaG93OiBmYWxzZSxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgLi4uZGVmYXVsdFdlYlByZWZzLFxuICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiBmYWxzZSxcbiAgICAgIGNvbnRleHRJc29sYXRpb246IHRydWUsXG4gICAgICBwcmVsb2FkOiBqb2luKF9fZGlybmFtZSwgJy4uL3RzL3dpbmRvd3Mvc2V0dGluZ3MvcHJlbG9hZC5qcycpLFxuICAgICAgbmF0aXZlV2luZG93T3BlbjogdHJ1ZSxcbiAgICB9LFxuICB9O1xuXG4gIHNldHRpbmdzV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3cob3B0aW9ucyk7XG5cbiAgaGFuZGxlQ29tbW9uV2luZG93RXZlbnRzKHNldHRpbmdzV2luZG93LCB0aXRsZUJhck92ZXJsYXkpO1xuXG4gIHNldHRpbmdzV2luZG93LmxvYWRVUkwoYXdhaXQgcHJlcGFyZUZpbGVVcmwoW19fZGlybmFtZSwgJy4uL3NldHRpbmdzLmh0bWwnXSkpO1xuXG4gIHNldHRpbmdzV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgc2V0dGluZ3NXaW5kb3cgPSB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGlwYy5vbmNlKCdzZXR0aW5ncy1kb25lLXJlbmRlcmluZycsICgpID0+IHtcbiAgICBpZiAoIXNldHRpbmdzV2luZG93KSB7XG4gICAgICBnZXRMb2dnZXIoKS53YXJuKCdzZXR0aW5ncy1kb25lLXJlbmRlcmluZzogbm8gc2V0dGluZ3NXaW5kb3cgYXZhaWxhYmxlIScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldHRpbmdzV2luZG93LnNob3coKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldElzTGlua2VkKCkge1xuICB0cnkge1xuICAgIGNvbnN0IG51bWJlciA9IGF3YWl0IHNxbC5zcWxDYWxsKCdnZXRJdGVtQnlJZCcsIFsnbnVtYmVyX2lkJ10pO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gYXdhaXQgc3FsLnNxbENhbGwoJ2dldEl0ZW1CeUlkJywgWydwYXNzd29yZCddKTtcbiAgICByZXR1cm4gQm9vbGVhbihudW1iZXIgJiYgcGFzc3dvcmQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmxldCBzdGlja2VyQ3JlYXRvcldpbmRvdzogQnJvd3NlcldpbmRvdyB8IHVuZGVmaW5lZDtcbmFzeW5jIGZ1bmN0aW9uIHNob3dTdGlja2VyQ3JlYXRvcigpIHtcbiAgaWYgKCEoYXdhaXQgZ2V0SXNMaW5rZWQoKSkpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZ2V0TG9jYWxlKCkuaTE4bignU3RpY2tlckNyZWF0b3ItLUF1dGhlbnRpY2F0aW9uLS1lcnJvcicpO1xuXG4gICAgZGlhbG9nLnNob3dNZXNzYWdlQm94KHtcbiAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3RpY2tlckNyZWF0b3JXaW5kb3cpIHtcbiAgICBzdGlja2VyQ3JlYXRvcldpbmRvdy5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyB4ID0gMCwgeSA9IDAgfSA9IHdpbmRvd0NvbmZpZyB8fCB7fTtcblxuICBjb25zdCB0aXRsZUJhck92ZXJsYXkgPSBhd2FpdCBnZXRUaXRsZUJhck92ZXJsYXkoKTtcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHg6IHggKyAxMDAsXG4gICAgeTogeSArIDEwMCxcbiAgICB3aWR0aDogODAwLFxuICAgIG1pbldpZHRoOiA4MDAsXG4gICAgaGVpZ2h0OiA2NTAsXG4gICAgdGl0bGU6IGdldExvY2FsZSgpLmkxOG4oJ3NpZ25hbERlc2t0b3BTdGlja2VyQ3JlYXRvcicpLFxuICAgIHRpdGxlQmFyU3R5bGU6IG5vbk1haW5UaXRsZUJhclN0eWxlLFxuICAgIHRpdGxlQmFyT3ZlcmxheSxcbiAgICBhdXRvSGlkZU1lbnVCYXI6IHRydWUsXG4gICAgYmFja2dyb3VuZENvbG9yOiBhd2FpdCBnZXRCYWNrZ3JvdW5kQ29sb3IoKSxcbiAgICBzaG93OiBmYWxzZSxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgLi4uZGVmYXVsdFdlYlByZWZzLFxuICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiBmYWxzZSxcbiAgICAgIGNvbnRleHRJc29sYXRpb246IGZhbHNlLFxuICAgICAgcHJlbG9hZDogam9pbihfX2Rpcm5hbWUsICcuLi9zdGlja2VyLWNyZWF0b3IvcHJlbG9hZC5qcycpLFxuICAgICAgbmF0aXZlV2luZG93T3BlbjogdHJ1ZSxcbiAgICAgIHNwZWxsY2hlY2s6IGF3YWl0IGdldFNwZWxsQ2hlY2tTZXR0aW5nKCksXG4gICAgfSxcbiAgfTtcblxuICBzdGlja2VyQ3JlYXRvcldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KG9wdGlvbnMpO1xuICBzZXR1cFNwZWxsQ2hlY2tlcihzdGlja2VyQ3JlYXRvcldpbmRvdywgZ2V0TG9jYWxlKCkpO1xuXG4gIGhhbmRsZUNvbW1vbldpbmRvd0V2ZW50cyhzdGlja2VyQ3JlYXRvcldpbmRvdywgdGl0bGVCYXJPdmVybGF5KTtcblxuICBjb25zdCBhcHBVcmwgPSBwcm9jZXNzLmVudi5TSUdOQUxfRU5BQkxFX0hUVFBcbiAgICA/IHByZXBhcmVVcmwoXG4gICAgICAgIG5ldyBVUkwoJ2h0dHA6Ly9sb2NhbGhvc3Q6NjM4MC9zdGlja2VyLWNyZWF0b3IvZGlzdC9pbmRleC5odG1sJylcbiAgICAgIClcbiAgICA6IHByZXBhcmVGaWxlVXJsKFtfX2Rpcm5hbWUsICcuLi9zdGlja2VyLWNyZWF0b3IvZGlzdC9pbmRleC5odG1sJ10pO1xuXG4gIHN0aWNrZXJDcmVhdG9yV2luZG93LmxvYWRVUkwoYXdhaXQgYXBwVXJsKTtcblxuICBzdGlja2VyQ3JlYXRvcldpbmRvdy5vbignY2xvc2VkJywgKCkgPT4ge1xuICAgIHN0aWNrZXJDcmVhdG9yV2luZG93ID0gdW5kZWZpbmVkO1xuICB9KTtcblxuICBzdGlja2VyQ3JlYXRvcldpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIGlmICghc3RpY2tlckNyZWF0b3JXaW5kb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdGlja2VyQ3JlYXRvcldpbmRvdy5zaG93KCk7XG5cbiAgICBpZiAoY29uZmlnLmdldDxib29sZWFuPignb3BlbkRldlRvb2xzJykpIHtcbiAgICAgIC8vIE9wZW4gdGhlIERldlRvb2xzLlxuICAgICAgc3RpY2tlckNyZWF0b3JXaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG4gICAgfVxuICB9KTtcbn1cblxubGV0IGRlYnVnTG9nV2luZG93OiBCcm93c2VyV2luZG93IHwgdW5kZWZpbmVkO1xuYXN5bmMgZnVuY3Rpb24gc2hvd0RlYnVnTG9nV2luZG93KCkge1xuICBpZiAoZGVidWdMb2dXaW5kb3cpIHtcbiAgICBkZWJ1Z0xvZ1dpbmRvdy5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGl0bGVCYXJPdmVybGF5ID0gYXdhaXQgZ2V0VGl0bGVCYXJPdmVybGF5KCk7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3aWR0aDogNzAwLFxuICAgIGhlaWdodDogNTAwLFxuICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgdGl0bGU6IGdldExvY2FsZSgpLmkxOG4oJ2RlYnVnTG9nJyksXG4gICAgdGl0bGVCYXJTdHlsZTogbm9uTWFpblRpdGxlQmFyU3R5bGUsXG4gICAgdGl0bGVCYXJPdmVybGF5LFxuICAgIGF1dG9IaWRlTWVudUJhcjogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGF3YWl0IGdldEJhY2tncm91bmRDb2xvcigpLFxuICAgIHNob3c6IGZhbHNlLFxuICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICAuLi5kZWZhdWx0V2ViUHJlZnMsXG4gICAgICBub2RlSW50ZWdyYXRpb246IGZhbHNlLFxuICAgICAgbm9kZUludGVncmF0aW9uSW5Xb3JrZXI6IGZhbHNlLFxuICAgICAgY29udGV4dElzb2xhdGlvbjogdHJ1ZSxcbiAgICAgIHByZWxvYWQ6IGpvaW4oX19kaXJuYW1lLCAnLi4vdHMvd2luZG93cy9kZWJ1Z2xvZy9wcmVsb2FkLmpzJyksXG4gICAgICBuYXRpdmVXaW5kb3dPcGVuOiB0cnVlLFxuICAgIH0sXG4gICAgcGFyZW50OiBtYWluV2luZG93LFxuICAgIC8vIEVsZWN0cm9uIGhhcyBbYSBtYWNPUyBidWddWzBdIHRoYXQgY2F1c2VzIHBhcmVudCB3aW5kb3dzIHRvIGJlY29tZSB1bnJlc3BvbnNpdmUgaWZcbiAgICAvLyAgIGl0J3MgZnVsbHNjcmVlbiBhbmQgb3BlbnMgYSBmdWxsc2NyZWVuIGNoaWxkIHdpbmRvdy4gVW50aWwgdGhhdCdzIGZpeGVkLCB3ZVxuICAgIC8vICAgcHJldmVudCB0aGUgY2hpbGQgd2luZG93IGZyb20gYmVpbmcgZnVsbHNjcmVlbmFibGUsIHdoaWNoIHNpZGVzdGVwcyB0aGUgcHJvYmxlbS5cbiAgICAvLyBbMF06IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvMzIzNzRcbiAgICBmdWxsc2NyZWVuYWJsZTogIU9TLmlzTWFjT1MoKSxcbiAgfTtcblxuICBkZWJ1Z0xvZ1dpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KG9wdGlvbnMpO1xuXG4gIGhhbmRsZUNvbW1vbldpbmRvd0V2ZW50cyhkZWJ1Z0xvZ1dpbmRvdywgdGl0bGVCYXJPdmVybGF5KTtcblxuICBkZWJ1Z0xvZ1dpbmRvdy5sb2FkVVJMKFxuICAgIGF3YWl0IHByZXBhcmVGaWxlVXJsKFtfX2Rpcm5hbWUsICcuLi9kZWJ1Z19sb2cuaHRtbCddKVxuICApO1xuXG4gIGRlYnVnTG9nV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgZGVidWdMb2dXaW5kb3cgPSB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGRlYnVnTG9nV2luZG93Lm9uY2UoJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiB7XG4gICAgaWYgKGRlYnVnTG9nV2luZG93KSB7XG4gICAgICBkZWJ1Z0xvZ1dpbmRvdy5zaG93KCk7XG5cbiAgICAgIC8vIEVsZWN0cm9uIHNvbWV0aW1lcyBwdXRzIHRoZSB3aW5kb3cgaW4gYSBzdHJhbmdlIHNwb3QgdW50aWwgaXQncyBzaG93bi5cbiAgICAgIGRlYnVnTG9nV2luZG93LmNlbnRlcigpO1xuICAgIH1cbiAgfSk7XG59XG5cbmxldCBwZXJtaXNzaW9uc1BvcHVwV2luZG93OiBCcm93c2VyV2luZG93IHwgdW5kZWZpbmVkO1xuZnVuY3Rpb24gc2hvd1Blcm1pc3Npb25zUG9wdXBXaW5kb3coZm9yQ2FsbGluZzogYm9vbGVhbiwgZm9yQ2FtZXJhOiBib29sZWFuKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yXG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZUZuLCByZWplY3QpID0+IHtcbiAgICBpZiAocGVybWlzc2lvbnNQb3B1cFdpbmRvdykge1xuICAgICAgcGVybWlzc2lvbnNQb3B1cFdpbmRvdy5zaG93KCk7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdQZXJtaXNzaW9uIHdpbmRvdyBhbHJlYWR5IHNob3dpbmcnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghbWFpbldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTm8gbWFpbiB3aW5kb3cnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IG1haW5XaW5kb3cuZ2V0U2l6ZSgpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICB3aWR0aDogTWF0aC5taW4oNDAwLCBzaXplWzBdKSxcbiAgICAgIGhlaWdodDogTWF0aC5taW4oMTUwLCBzaXplWzFdKSxcbiAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICB0aXRsZTogZ2V0TG9jYWxlKCkuaTE4bignYWxsb3dBY2Nlc3MnKSxcbiAgICAgIHRpdGxlQmFyU3R5bGU6IG5vbk1haW5UaXRsZUJhclN0eWxlLFxuICAgICAgYXV0b0hpZGVNZW51QmFyOiB0cnVlLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBhd2FpdCBnZXRCYWNrZ3JvdW5kQ29sb3IoKSxcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgbW9kYWw6IHRydWUsXG4gICAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgICAuLi5kZWZhdWx0V2ViUHJlZnMsXG4gICAgICAgIG5vZGVJbnRlZ3JhdGlvbjogZmFsc2UsXG4gICAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiBmYWxzZSxcbiAgICAgICAgY29udGV4dElzb2xhdGlvbjogdHJ1ZSxcbiAgICAgICAgcHJlbG9hZDogam9pbihfX2Rpcm5hbWUsICcuLi90cy93aW5kb3dzL3Blcm1pc3Npb25zL3ByZWxvYWQuanMnKSxcbiAgICAgICAgbmF0aXZlV2luZG93T3BlbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBwYXJlbnQ6IG1haW5XaW5kb3csXG4gICAgfTtcblxuICAgIHBlcm1pc3Npb25zUG9wdXBXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyhvcHRpb25zKTtcblxuICAgIGhhbmRsZUNvbW1vbldpbmRvd0V2ZW50cyhwZXJtaXNzaW9uc1BvcHVwV2luZG93KTtcblxuICAgIHBlcm1pc3Npb25zUG9wdXBXaW5kb3cubG9hZFVSTChcbiAgICAgIGF3YWl0IHByZXBhcmVGaWxlVXJsKFtfX2Rpcm5hbWUsICcuLi9wZXJtaXNzaW9uc19wb3B1cC5odG1sJ10sIHtcbiAgICAgICAgZm9yQ2FsbGluZyxcbiAgICAgICAgZm9yQ2FtZXJhLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgcGVybWlzc2lvbnNQb3B1cFdpbmRvdy5vbignY2xvc2VkJywgKCkgPT4ge1xuICAgICAgcmVtb3ZlRGFya092ZXJsYXkoKTtcbiAgICAgIHBlcm1pc3Npb25zUG9wdXBXaW5kb3cgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHJlc29sdmVGbigpO1xuICAgIH0pO1xuXG4gICAgcGVybWlzc2lvbnNQb3B1cFdpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgICAgaWYgKHBlcm1pc3Npb25zUG9wdXBXaW5kb3cpIHtcbiAgICAgICAgYWRkRGFya092ZXJsYXkoKTtcbiAgICAgICAgcGVybWlzc2lvbnNQb3B1cFdpbmRvdy5zaG93KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5jb25zdCBydW5TUUxDb3JydXB0aW9uSGFuZGxlciA9IGFzeW5jICgpID0+IHtcbiAgLy8gVGhpcyBpcyBhIGdsb3JpZmllZCBldmVudCBoYW5kbGVyLiBOb3JtYWxseSwgdGhpcyBwcm9taXNlIG5ldmVyIHJlc29sdmVzLFxuICAvLyBidXQgaWYgdGhlcmUgaXMgYSBjb3JydXB0aW9uIGVycm9yIHRyaWdnZXJlZCBieSBhbnkgcXVlcnkgdGhhdCB3ZSBydW5cbiAgLy8gYWdhaW5zdCB0aGUgZGF0YWJhc2UgLSB0aGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgYW5kIHdlIHdpbGwgY2FsbFxuICAvLyBgb25EYXRhYmFzZUVycm9yYC5cbiAgY29uc3QgZXJyb3IgPSBhd2FpdCBzcWwud2hlbkNvcnJ1cHRlZCgpO1xuXG4gIGdldExvZ2dlcigpLmVycm9yKFxuICAgICdEZXRlY3RlZCBzcWwgY29ycnVwdGlvbiBpbiBtYWluIHByb2Nlc3MuICcgK1xuICAgICAgYFJlc3RhcnRpbmcgdGhlIGFwcGxpY2F0aW9uIGltbWVkaWF0ZWx5LiBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWBcbiAgKTtcblxuICBhd2FpdCBvbkRhdGFiYXNlRXJyb3IoZXJyb3Iuc3RhY2sgfHwgZXJyb3IubWVzc2FnZSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplU1FMKFxuICB1c2VyRGF0YVBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTx7IG9rOiB0cnVlOyBlcnJvcjogdW5kZWZpbmVkIH0gfCB7IG9rOiBmYWxzZTsgZXJyb3I6IEVycm9yIH0+IHtcbiAgbGV0IGtleTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjb25zdCBrZXlGcm9tQ29uZmlnID0gdXNlckNvbmZpZy5nZXQoJ2tleScpO1xuICBpZiAodHlwZW9mIGtleUZyb21Db25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAga2V5ID0ga2V5RnJvbUNvbmZpZztcbiAgfSBlbHNlIGlmIChrZXlGcm9tQ29uZmlnKSB7XG4gICAgZ2V0TG9nZ2VyKCkud2FybihcbiAgICAgIFwiaW5pdGlhbGl6ZVNRTDogZ290IGtleSBmcm9tIGNvbmZpZywgYnV0IGl0IHdhc24ndCBhIHN0cmluZ1wiXG4gICAgKTtcbiAgfVxuICBpZiAoIWtleSkge1xuICAgIGdldExvZ2dlcigpLmluZm8oXG4gICAgICAna2V5L2luaXRpYWxpemU6IEdlbmVyYXRpbmcgbmV3IGVuY3J5cHRpb24ga2V5LCBzaW5jZSB3ZSBkaWQgbm90IGZpbmQgaXQgb24gZGlzaydcbiAgICApO1xuICAgIC8vIGh0dHBzOi8vd3d3LnpldGV0aWMubmV0L3NxbGNpcGhlci9zcWxjaXBoZXItYXBpLyNrZXlcbiAgICBrZXkgPSByYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpO1xuICAgIHVzZXJDb25maWcuc2V0KCdrZXknLCBrZXkpO1xuICB9XG5cbiAgc3FsSW5pdFRpbWVTdGFydCA9IERhdGUubm93KCk7XG4gIHRyeSB7XG4gICAgLy8gVGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0IGF3YWl0ZWQgY2FsbCBpbiB0aGlzIGZ1bmN0aW9uLCBvdGhlcndpc2VcbiAgICAvLyBgc3FsLnNxbENhbGxgIHdpbGwgdGhyb3cgYW4gdW5pbml0aWFsaXplZCBlcnJvciBpbnN0ZWFkIG9mIHdhaXRpbmcgZm9yXG4gICAgLy8gaW5pdCB0byBmaW5pc2guXG4gICAgYXdhaXQgc3FsLmluaXRpYWxpemUoe1xuICAgICAgY29uZmlnRGlyOiB1c2VyRGF0YVBhdGgsXG4gICAgICBrZXksXG4gICAgICBsb2dnZXI6IGdldExvZ2dlcigpLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBuZXcgRXJyb3IoYGluaXRpYWxpemVTUUw6IENhdWdodCBhIG5vbi1lcnJvciAnJHtlcnJvcn0nYCksXG4gICAgfTtcbiAgfSBmaW5hbGx5IHtcbiAgICBzcWxJbml0VGltZUVuZCA9IERhdGUubm93KCk7XG4gIH1cblxuICAvLyBPbmx5IGlmIHdlJ3ZlIGluaXRpYWxpemVkIHRoaW5ncyBzdWNjZXNzZnVsbHkgZG8gd2Ugc2V0IHVwIHRoZSBjb3JydXB0aW9uIGhhbmRsZXJcbiAgcnVuU1FMQ29ycnVwdGlvbkhhbmRsZXIoKTtcblxuICByZXR1cm4geyBvazogdHJ1ZSwgZXJyb3I6IHVuZGVmaW5lZCB9O1xufVxuXG5jb25zdCBvbkRhdGFiYXNlRXJyb3IgPSBhc3luYyAoZXJyb3I6IHN0cmluZykgPT4ge1xuICAvLyBQcmV2ZW50IHdpbmRvdyBmcm9tIHJlLW9wZW5pbmdcbiAgcmVhZHkgPSBmYWxzZTtcblxuICBpZiAobWFpbldpbmRvdykge1xuICAgIHNldHRpbmdzQ2hhbm5lbD8uaW52b2tlQ2FsbGJhY2tJbk1haW5XaW5kb3coJ2Nsb3NlREInLCBbXSk7XG4gICAgbWFpbldpbmRvdy5jbG9zZSgpO1xuICB9XG4gIG1haW5XaW5kb3cgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3QgYnV0dG9uSW5kZXggPSBkaWFsb2cuc2hvd01lc3NhZ2VCb3hTeW5jKHtcbiAgICBidXR0b25zOiBbXG4gICAgICBnZXRMb2NhbGUoKS5pMThuKCdkZWxldGVBbmRSZXN0YXJ0JyksXG4gICAgICBnZXRMb2NhbGUoKS5pMThuKCdjb3B5RXJyb3JBbmRRdWl0JyksXG4gICAgXSxcbiAgICBkZWZhdWx0SWQ6IDEsXG4gICAgY2FuY2VsSWQ6IDEsXG4gICAgZGV0YWlsOiByZWRhY3RBbGwoZXJyb3IpLFxuICAgIG1lc3NhZ2U6IGdldExvY2FsZSgpLmkxOG4oJ2RhdGFiYXNlRXJyb3InKSxcbiAgICBub0xpbms6IHRydWUsXG4gICAgdHlwZTogJ2Vycm9yJyxcbiAgfSk7XG5cbiAgaWYgKGJ1dHRvbkluZGV4ID09PSAxKSB7XG4gICAgY2xpcGJvYXJkLndyaXRlVGV4dChgRGF0YWJhc2Ugc3RhcnR1cCBlcnJvcjpcXG5cXG4ke3JlZGFjdEFsbChlcnJvcil9YCk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgc3FsLnJlbW92ZURCKCk7XG4gICAgdXNlckNvbmZpZy5yZW1vdmUoKTtcbiAgICBnZXRMb2dnZXIoKS5lcnJvcihcbiAgICAgICdvbkRhdGFiYXNlRXJyb3I6IFJlcXVlc3RpbmcgaW1tZWRpYXRlIHJlc3RhcnQgYWZ0ZXIgcXVpdCdcbiAgICApO1xuICAgIGFwcC5yZWxhdW5jaCgpO1xuICB9XG5cbiAgZ2V0TG9nZ2VyKCkuZXJyb3IoJ29uRGF0YWJhc2VFcnJvcjogUXVpdHRpbmcgYXBwbGljYXRpb24nKTtcbiAgYXBwLmV4aXQoMSk7XG59O1xuXG5sZXQgc3FsSW5pdFByb21pc2U6XG4gIHwgUHJvbWlzZTx7IG9rOiB0cnVlOyBlcnJvcjogdW5kZWZpbmVkIH0gfCB7IG9rOiBmYWxzZTsgZXJyb3I6IEVycm9yIH0+XG4gIHwgdW5kZWZpbmVkO1xuXG5pcGMub24oJ2RhdGFiYXNlLWVycm9yJywgKF9ldmVudDogRWxlY3Ryb24uRXZlbnQsIGVycm9yOiBzdHJpbmcpID0+IHtcbiAgb25EYXRhYmFzZUVycm9yKGVycm9yKTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRBcHBMb2NhbGUoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdldEVudmlyb25tZW50KCkgPT09IEVudmlyb25tZW50LlRlc3QgPyAnZW4nIDogYXBwLmdldExvY2FsZSgpO1xufVxuXG4vLyBTaWduYWwgZG9lc24ndCByZWFsbHkgdXNlIG1lZGlhIGtleXMgc28gd2Ugc2V0IHRoaXMgc3dpdGNoIGhlcmUgdG8gdW5ibG9ja1xuLy8gdGhlbSBzbyB0aGF0IG90aGVyIGFwcHMgY2FuIHVzZSB0aGVtIGlmIHRoZXkgbmVlZCB0by5cbmFwcC5jb21tYW5kTGluZS5hcHBlbmRTd2l0Y2goJ2Rpc2FibGUtZmVhdHVyZXMnLCAnSGFyZHdhcmVNZWRpYUtleUhhbmRsaW5nJyk7XG5cbi8vIElmIHdlIGRvbid0IHNldCB0aGlzLCBEZXNrdG9wIHdpbGwgYXNrIGZvciBhY2Nlc3MgdG8ga2V5Y2hhaW4va2V5cmluZyBvbiBzdGFydHVwXG5hcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoKCdwYXNzd29yZC1zdG9yZScsICdiYXNpYycpO1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuIEVsZWN0cm9uIGhhcyBmaW5pc2hlZFxuLy8gaW5pdGlhbGl6YXRpb24gYW5kIGlzIHJlYWR5IHRvIGNyZWF0ZSBicm93c2VyIHdpbmRvd3MuXG4vLyBTb21lIEFQSXMgY2FuIG9ubHkgYmUgdXNlZCBhZnRlciB0aGlzIGV2ZW50IG9jY3Vycy5cbmxldCByZWFkeSA9IGZhbHNlO1xuYXBwLm9uKCdyZWFkeScsIGFzeW5jICgpID0+IHtcbiAgdXBkYXRlRGVmYXVsdFNlc3Npb24oc2Vzc2lvbi5kZWZhdWx0U2Vzc2lvbik7XG5cbiAgY29uc3QgW3VzZXJEYXRhUGF0aCwgY3Jhc2hEdW1wc1BhdGhdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIHJlYWxwYXRoKGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpKSxcbiAgICByZWFscGF0aChhcHAuZ2V0UGF0aCgnY3Jhc2hEdW1wcycpKSxcbiAgXSk7XG5cbiAgbG9nZ2VyID0gYXdhaXQgbG9nZ2luZy5pbml0aWFsaXplKGdldE1haW5XaW5kb3cpO1xuXG4gIGF3YWl0IHNldHVwQ3Jhc2hSZXBvcnRzKGdldExvZ2dlcik7XG5cbiAgaWYgKCFsb2NhbGUpIHtcbiAgICBjb25zdCBhcHBMb2NhbGUgPSBnZXRBcHBMb2NhbGUoKTtcbiAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHsgYXBwTG9jYWxlLCBsb2dnZXIgfSk7XG4gIH1cblxuICBzcWxJbml0UHJvbWlzZSA9IGluaXRpYWxpemVTUUwodXNlckRhdGFQYXRoKTtcblxuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIHNldHRpbmdzQ2hhbm5lbCA9IG5ldyBTZXR0aW5nc0NoYW5uZWwoKTtcbiAgc2V0dGluZ3NDaGFubmVsLmluc3RhbGwoKTtcblxuICAvLyBXZSB1c2UgdGhpcyBldmVudCBvbmx5IGEgc2luZ2xlIHRpbWUgdG8gbG9nIHRoZSBzdGFydHVwIHRpbWUgb2YgdGhlIGFwcFxuICAvLyBmcm9tIHdoZW4gaXQncyBmaXJzdCByZWFkeSB1bnRpbCB0aGUgbG9hZGluZyBzY3JlZW4gZGlzYXBwZWFycy5cbiAgaXBjLm9uY2UoJ3NpZ25hbC1hcHAtbG9hZGVkJywgKGV2ZW50LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgeyBwcmVsb2FkVGltZSwgY29ubmVjdFRpbWUsIHByb2Nlc3NlZENvdW50IH0gPSBpbmZvO1xuXG4gICAgY29uc3QgbG9hZFRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIGNvbnN0IHNxbEluaXRUaW1lID0gc3FsSW5pdFRpbWVFbmQgLSBzcWxJbml0VGltZVN0YXJ0O1xuXG4gICAgY29uc3QgbWVzc2FnZVRpbWUgPSBsb2FkVGltZSAtIHByZWxvYWRUaW1lIC0gY29ubmVjdFRpbWU7XG4gICAgY29uc3QgbWVzc2FnZXNQZXJTZWMgPSAocHJvY2Vzc2VkQ291bnQgKiAxMDAwKSAvIG1lc3NhZ2VUaW1lO1xuXG4gICAgY29uc3QgaW5uZXJMb2dnZXIgPSBnZXRMb2dnZXIoKTtcbiAgICBpbm5lckxvZ2dlci5pbmZvKCdBcHAgbG9hZGVkIC0gdGltZTonLCBsb2FkVGltZSk7XG4gICAgaW5uZXJMb2dnZXIuaW5mbygnU1FMIGluaXQgLSB0aW1lOicsIHNxbEluaXRUaW1lKTtcbiAgICBpbm5lckxvZ2dlci5pbmZvKCdQcmVsb2FkIC0gdGltZTonLCBwcmVsb2FkVGltZSk7XG4gICAgaW5uZXJMb2dnZXIuaW5mbygnV2ViU29ja2V0IGNvbm5lY3QgLSB0aW1lOicsIGNvbm5lY3RUaW1lKTtcbiAgICBpbm5lckxvZ2dlci5pbmZvKCdQcm9jZXNzZWQgY291bnQ6JywgcHJvY2Vzc2VkQ291bnQpO1xuICAgIGlubmVyTG9nZ2VyLmluZm8oJ01lc3NhZ2VzIHBlciBzZWNvbmQ6JywgbWVzc2FnZXNQZXJTZWMpO1xuXG4gICAgZXZlbnQuc2VuZGVyLnNlbmQoJ2NpOmV2ZW50JywgJ2FwcC1sb2FkZWQnLCB7XG4gICAgICBsb2FkVGltZSxcbiAgICAgIHNxbEluaXRUaW1lLFxuICAgICAgcHJlbG9hZFRpbWUsXG4gICAgICBjb25uZWN0VGltZSxcbiAgICAgIHByb2Nlc3NlZENvdW50LFxuICAgICAgbWVzc2FnZXNQZXJTZWMsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IGluc3RhbGxQYXRoID0gYXdhaXQgcmVhbHBhdGgoYXBwLmdldEFwcFBhdGgoKSk7XG5cbiAgYWRkU2Vuc2l0aXZlUGF0aCh1c2VyRGF0YVBhdGgpO1xuICBhZGRTZW5zaXRpdmVQYXRoKGNyYXNoRHVtcHNQYXRoKTtcblxuICBpZiAoZ2V0RW52aXJvbm1lbnQoKSAhPT0gRW52aXJvbm1lbnQuVGVzdCkge1xuICAgIGluc3RhbGxGaWxlSGFuZGxlcih7XG4gICAgICBwcm90b2NvbDogZWxlY3Ryb25Qcm90b2NvbCxcbiAgICAgIHVzZXJEYXRhUGF0aCxcbiAgICAgIGluc3RhbGxQYXRoLFxuICAgICAgaXNXaW5kb3dzOiBPUy5pc1dpbmRvd3MoKSxcbiAgICB9KTtcbiAgfVxuXG4gIGluc3RhbGxXZWJIYW5kbGVyKHtcbiAgICBlbmFibGVIdHRwOiBCb29sZWFuKHByb2Nlc3MuZW52LlNJR05BTF9FTkFCTEVfSFRUUCksXG4gICAgcHJvdG9jb2w6IGVsZWN0cm9uUHJvdG9jb2wsXG4gIH0pO1xuXG4gIGxvZ2dlci5pbmZvKCdhcHAgcmVhZHknKTtcbiAgbG9nZ2VyLmluZm8oYHN0YXJ0aW5nIHZlcnNpb24gJHtwYWNrYWdlSnNvbi52ZXJzaW9ufWApO1xuXG4gIC8vIFRoaXMgbG9nZ2luZyBoZWxwcyB1cyBkZWJ1ZyB1c2VyIHJlcG9ydHMgYWJvdXQgYnJva2VuIGRldmljZXMuXG4gIHtcbiAgICBsZXQgZ2V0TWVkaWFBY2Nlc3NTdGF0dXM7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBub3Qgc3VwcG9ydGVkIG9uIExpbnV4LCBzbyB3ZSBoYXZlIGEgZmFsbGJhY2suXG4gICAgaWYgKHN5c3RlbVByZWZlcmVuY2VzLmdldE1lZGlhQWNjZXNzU3RhdHVzKSB7XG4gICAgICBnZXRNZWRpYUFjY2Vzc1N0YXR1cyA9XG4gICAgICAgIHN5c3RlbVByZWZlcmVuY2VzLmdldE1lZGlhQWNjZXNzU3RhdHVzLmJpbmQoc3lzdGVtUHJlZmVyZW5jZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXRNZWRpYUFjY2Vzc1N0YXR1cyA9IG5vb3A7XG4gICAgfVxuICAgIGxvZ2dlci5pbmZvKFxuICAgICAgJ21lZGlhIGFjY2VzcyBzdGF0dXMnLFxuICAgICAgZ2V0TWVkaWFBY2Nlc3NTdGF0dXMoJ21pY3JvcGhvbmUnKSxcbiAgICAgIGdldE1lZGlhQWNjZXNzU3RhdHVzKCdjYW1lcmEnKVxuICAgICk7XG4gIH1cblxuICBHbG9iYWxFcnJvcnMudXBkYXRlTG9jYWxlKGxvY2FsZS5tZXNzYWdlcyk7XG5cbiAgLy8gSWYgdGhlIHNxbCBpbml0aWFsaXphdGlvbiB0YWtlcyBtb3JlIHRoYW4gdGhyZWUgc2Vjb25kcyB0byBjb21wbGV0ZSwgd2VcbiAgLy8gd2FudCB0byBub3RpZnkgdGhlIHVzZXIgdGhhdCB0aGluZ3MgYXJlIGhhcHBlbmluZ1xuICBjb25zdCB0aW1lb3V0ID0gbmV3IFByb21pc2UocmVzb2x2ZUZuID0+XG4gICAgc2V0VGltZW91dChyZXNvbHZlRm4sIDMwMDAsICd0aW1lb3V0JylcbiAgKTtcblxuICAvLyBUaGlzIGNvbG9yIGlzIHRvIGJlIHVzZWQgb25seSBpbiBsb2FkaW5nIHNjcmVlbiBhbmQgaW4gdGhpcyBjYXNlIHdlIHNob3VsZFxuICAvLyBuZXZlciB3YWl0IGZvciB0aGUgZGF0YWJhc2UgdG8gYmUgaW5pdGlhbGl6ZWQuIFRodXMgdGhlIHRoZW1lIHNldHRpbmdcbiAgLy8gbG9va3VwIHNob3VsZCBiZSBkb25lIG9ubHkgaW4gZXBoZW1lcmFsIGNvbmZpZy5cbiAgY29uc3QgYmFja2dyb3VuZENvbG9yID0gYXdhaXQgZ2V0QmFja2dyb3VuZENvbG9yKHsgZXBoZW1lcmFsT25seTogdHJ1ZSB9KTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbW9yZS9uby10aGVuXG4gIFByb21pc2UucmFjZShbc3FsSW5pdFByb21pc2UsIHRpbWVvdXRdKS50aGVuKGFzeW5jIG1heWJlVGltZW91dCA9PiB7XG4gICAgaWYgKG1heWJlVGltZW91dCAhPT0gJ3RpbWVvdXQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2V0TG9nZ2VyKCkuaW5mbyhcbiAgICAgICdzcWwuaW5pdGlhbGl6ZSBpcyB0YWtpbmcgbW9yZSB0aGFuIHRocmVlIHNlY29uZHM7IHNob3dpbmcgbG9hZGluZyBkaWFsb2cnXG4gICAgKTtcblxuICAgIGxvYWRpbmdXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHdpZHRoOiAzMDAsXG4gICAgICBoZWlnaHQ6IDI2NSxcbiAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICBmcmFtZTogZmFsc2UsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgICAuLi5kZWZhdWx0V2ViUHJlZnMsXG4gICAgICAgIG5vZGVJbnRlZ3JhdGlvbjogZmFsc2UsXG4gICAgICAgIGNvbnRleHRJc29sYXRpb246IHRydWUsXG4gICAgICAgIHByZWxvYWQ6IGpvaW4oX19kaXJuYW1lLCAnLi4vdHMvd2luZG93cy9sb2FkaW5nL3ByZWxvYWQuanMnKSxcbiAgICAgIH0sXG4gICAgICBpY29uOiB3aW5kb3dJY29uLFxuICAgIH0pO1xuXG4gICAgbG9hZGluZ1dpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFsb2FkaW5nV2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxvYWRpbmdXaW5kb3cuc2hvdygpO1xuICAgICAgLy8gV2FpdCBmb3Igc3FsIGluaXRpYWxpemF0aW9uIHRvIGNvbXBsZXRlLCBidXQgaWdub3JlIGVycm9yc1xuICAgICAgYXdhaXQgc3FsSW5pdFByb21pc2U7XG4gICAgICBsb2FkaW5nV2luZG93LmRlc3Ryb3koKTtcbiAgICAgIGxvYWRpbmdXaW5kb3cgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG5cbiAgICBsb2FkaW5nV2luZG93LmxvYWRVUkwoYXdhaXQgcHJlcGFyZUZpbGVVcmwoW19fZGlybmFtZSwgJy4uL2xvYWRpbmcuaHRtbCddKSk7XG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgYXR0YWNobWVudHMuY2xlYXJUZW1wUGF0aCh1c2VyRGF0YVBhdGgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAnbWFpbi9yZWFkeTogRXJyb3IgZGVsZXRpbmcgdGVtcCBkaXI6JyxcbiAgICAgIGVyciAmJiBlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnJcbiAgICApO1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6ZSBJUEMgY2hhbm5lbHMgYmVmb3JlIGNyZWF0aW5nIHRoZSB3aW5kb3dcblxuICBhdHRhY2htZW50Q2hhbm5lbC5pbml0aWFsaXplKHtcbiAgICBjb25maWdEaXI6IHVzZXJEYXRhUGF0aCxcbiAgICBjbGVhbnVwT3JwaGFuZWRBdHRhY2htZW50cyxcbiAgfSk7XG4gIHNxbENoYW5uZWxzLmluaXRpYWxpemUoc3FsKTtcbiAgUG93ZXJDaGFubmVsLmluaXRpYWxpemUoe1xuICAgIHNlbmQoZXZlbnQpIHtcbiAgICAgIGlmICghbWFpbldpbmRvdykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoZXZlbnQpO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFJ1biB3aW5kb3cgcHJlbG9hZGluZyBpbiBwYXJhbGxlbCB3aXRoIGRhdGFiYXNlIGluaXRpYWxpemF0aW9uLlxuICBhd2FpdCBjcmVhdGVXaW5kb3coKTtcblxuICBjb25zdCB7IGVycm9yOiBzcWxFcnJvciB9ID0gYXdhaXQgc3FsSW5pdFByb21pc2U7XG4gIGlmIChzcWxFcnJvcikge1xuICAgIGdldExvZ2dlcigpLmVycm9yKCdzcWwuaW5pdGlhbGl6ZSB3YXMgdW5zdWNjZXNzZnVsOyByZXR1cm5pbmcgZWFybHknKTtcblxuICAgIGF3YWl0IG9uRGF0YWJhc2VFcnJvcihzcWxFcnJvci5zdGFjayB8fCBzcWxFcnJvci5tZXNzYWdlKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGFwcFN0YXJ0SW5pdGlhbFNwZWxsY2hlY2tTZXR0aW5nID0gYXdhaXQgZ2V0U3BlbGxDaGVja1NldHRpbmcoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IElEQl9LRVkgPSAnaW5kZXhlZGRiLWRlbGV0ZS1uZWVkZWQnO1xuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCBzcWwuc3FsQ2FsbCgnZ2V0SXRlbUJ5SWQnLCBbSURCX0tFWV0pO1xuICAgIGlmIChpdGVtICYmIGl0ZW0udmFsdWUpIHtcbiAgICAgIGF3YWl0IHNxbC5zcWxDYWxsKCdyZW1vdmVJbmRleGVkREJGaWxlcycsIFtdKTtcbiAgICAgIGF3YWl0IHNxbC5zcWxDYWxsKCdyZW1vdmVJdGVtQnlJZCcsIFtJREJfS0VZXSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBnZXRMb2dnZXIoKS5lcnJvcihcbiAgICAgICcocmVhZHkgZXZlbnQgaGFuZGxlcikgZXJyb3IgZGVsZXRpbmcgSW5kZXhlZERCOicsXG4gICAgICBlcnIgJiYgZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNsZWFudXBPcnBoYW5lZEF0dGFjaG1lbnRzKCkge1xuICAgIGNvbnN0IGFsbEF0dGFjaG1lbnRzID0gYXdhaXQgYXR0YWNobWVudHMuZ2V0QWxsQXR0YWNobWVudHModXNlckRhdGFQYXRoKTtcbiAgICBjb25zdCBvcnBoYW5lZEF0dGFjaG1lbnRzID0gYXdhaXQgc3FsLnNxbENhbGwoJ3JlbW92ZUtub3duQXR0YWNobWVudHMnLCBbXG4gICAgICBhbGxBdHRhY2htZW50cyxcbiAgICBdKTtcbiAgICBhd2FpdCBhdHRhY2htZW50cy5kZWxldGVBbGwoe1xuICAgICAgdXNlckRhdGFQYXRoLFxuICAgICAgYXR0YWNobWVudHM6IG9ycGhhbmVkQXR0YWNobWVudHMsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBhdHRhY2htZW50cy5kZWxldGVBbGxCYWRnZXMoe1xuICAgICAgdXNlckRhdGFQYXRoLFxuICAgICAgcGF0aHNUb0tlZXA6IGF3YWl0IHNxbC5zcWxDYWxsKCdnZXRBbGxCYWRnZUltYWdlRmlsZUxvY2FsUGF0aHMnLCBbXSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGxTdGlja2VycyA9IGF3YWl0IGF0dGFjaG1lbnRzLmdldEFsbFN0aWNrZXJzKHVzZXJEYXRhUGF0aCk7XG4gICAgY29uc3Qgb3JwaGFuZWRTdGlja2VycyA9IGF3YWl0IHNxbC5zcWxDYWxsKCdyZW1vdmVLbm93blN0aWNrZXJzJywgW1xuICAgICAgYWxsU3RpY2tlcnMsXG4gICAgXSk7XG4gICAgYXdhaXQgYXR0YWNobWVudHMuZGVsZXRlQWxsU3RpY2tlcnMoe1xuICAgICAgdXNlckRhdGFQYXRoLFxuICAgICAgc3RpY2tlcnM6IG9ycGhhbmVkU3RpY2tlcnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGxEcmFmdEF0dGFjaG1lbnRzID0gYXdhaXQgYXR0YWNobWVudHMuZ2V0QWxsRHJhZnRBdHRhY2htZW50cyhcbiAgICAgIHVzZXJEYXRhUGF0aFxuICAgICk7XG4gICAgY29uc3Qgb3JwaGFuZWREcmFmdEF0dGFjaG1lbnRzID0gYXdhaXQgc3FsLnNxbENhbGwoXG4gICAgICAncmVtb3ZlS25vd25EcmFmdEF0dGFjaG1lbnRzJyxcbiAgICAgIFthbGxEcmFmdEF0dGFjaG1lbnRzXVxuICAgICk7XG4gICAgYXdhaXQgYXR0YWNobWVudHMuZGVsZXRlQWxsRHJhZnRBdHRhY2htZW50cyh7XG4gICAgICB1c2VyRGF0YVBhdGgsXG4gICAgICBhdHRhY2htZW50czogb3JwaGFuZWREcmFmdEF0dGFjaG1lbnRzLFxuICAgIH0pO1xuICB9XG5cbiAgcmVhZHkgPSB0cnVlO1xuXG4gIHNldHVwTWVudSgpO1xuXG4gIHN5c3RlbVRyYXlTZXJ2aWNlID0gbmV3IFN5c3RlbVRyYXlTZXJ2aWNlKHsgbWVzc2FnZXM6IGxvY2FsZS5tZXNzYWdlcyB9KTtcbiAgc3lzdGVtVHJheVNlcnZpY2Uuc2V0TWFpbldpbmRvdyhtYWluV2luZG93KTtcbiAgc3lzdGVtVHJheVNlcnZpY2Uuc2V0RW5hYmxlZChcbiAgICBzaG91bGRNaW5pbWl6ZVRvU3lzdGVtVHJheShhd2FpdCBzeXN0ZW1UcmF5U2V0dGluZ0NhY2hlLmdldCgpKVxuICApO1xuXG4gIGVuc3VyZUZpbGVQZXJtaXNzaW9ucyhbXG4gICAgJ2NvbmZpZy5qc29uJyxcbiAgICAnc3FsL2RiLnNxbGl0ZScsXG4gICAgJ3NxbC9kYi5zcWxpdGUtd2FsJyxcbiAgICAnc3FsL2RiLnNxbGl0ZS1zaG0nLFxuICBdKTtcbn0pO1xuXG5mdW5jdGlvbiBzZXR1cE1lbnUob3B0aW9ucz86IFBhcnRpYWw8Q3JlYXRlVGVtcGxhdGVPcHRpb25zVHlwZT4pIHtcbiAgY29uc3QgeyBwbGF0Zm9ybSB9ID0gcHJvY2VzcztcbiAgbWVudU9wdGlvbnMgPSB7XG4gICAgLy8gb3B0aW9uc1xuICAgIGRldmVsb3BtZW50LFxuICAgIGRldlRvb2xzOiBkZWZhdWx0V2ViUHJlZnMuZGV2VG9vbHMsXG4gICAgaW5jbHVkZVNldHVwOiBmYWxzZSxcbiAgICBpc1Byb2R1Y3Rpb246IGlzUHJvZHVjdGlvbihhcHAuZ2V0VmVyc2lvbigpKSxcbiAgICBwbGF0Zm9ybSxcblxuICAgIC8vIGFjdGlvbnNcbiAgICBmb3JjZVVwZGF0ZSxcbiAgICBvcGVuQ29udGFjdFVzLFxuICAgIG9wZW5Gb3J1bXMsXG4gICAgb3BlbkpvaW5UaGVCZXRhLFxuICAgIG9wZW5SZWxlYXNlTm90ZXMsXG4gICAgb3BlblN1cHBvcnRQYWdlLFxuICAgIHNldHVwQXNOZXdEZXZpY2UsXG4gICAgc2V0dXBBc1N0YW5kYWxvbmUsXG4gICAgc2hvd0Fib3V0LFxuICAgIHNob3dEZWJ1Z0xvZzogc2hvd0RlYnVnTG9nV2luZG93LFxuICAgIHNob3dLZXlib2FyZFNob3J0Y3V0cyxcbiAgICBzaG93U2V0dGluZ3M6IHNob3dTZXR0aW5nc1dpbmRvdyxcbiAgICBzaG93U3RpY2tlckNyZWF0b3IsXG4gICAgc2hvd1dpbmRvdyxcblxuICAgIC8vIG92ZXJyaWRlc1xuICAgIC4uLm9wdGlvbnMsXG4gIH07XG4gIGNvbnN0IHRlbXBsYXRlID0gY3JlYXRlVGVtcGxhdGUobWVudU9wdGlvbnMsIGdldExvY2FsZSgpLm1lc3NhZ2VzKTtcbiAgY29uc3QgbWVudSA9IE1lbnUuYnVpbGRGcm9tVGVtcGxhdGUodGVtcGxhdGUpO1xuICBNZW51LnNldEFwcGxpY2F0aW9uTWVudShtZW51KTtcblxuICBtYWluV2luZG93Py53ZWJDb250ZW50cy5zZW5kKCd3aW5kb3c6c2V0LW1lbnUtb3B0aW9ucycsIHtcbiAgICBkZXZlbG9wbWVudDogbWVudU9wdGlvbnMuZGV2ZWxvcG1lbnQsXG4gICAgZGV2VG9vbHM6IG1lbnVPcHRpb25zLmRldlRvb2xzLFxuICAgIGluY2x1ZGVTZXR1cDogbWVudU9wdGlvbnMuaW5jbHVkZVNldHVwLFxuICAgIGlzUHJvZHVjdGlvbjogbWVudU9wdGlvbnMuaXNQcm9kdWN0aW9uLFxuICAgIHBsYXRmb3JtOiBtZW51T3B0aW9ucy5wbGF0Zm9ybSxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RTaHV0ZG93bigpIHtcbiAgaWYgKCFtYWluV2luZG93IHx8ICFtYWluV2luZG93LndlYkNvbnRlbnRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZ2V0TG9nZ2VyKCkuaW5mbygncmVxdWVzdFNodXRkb3duOiBSZXF1ZXN0aW5nIGNsb3NlIG9mIG1haW5XaW5kb3cuLi4nKTtcbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmVGbiA9PiB7XG4gICAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKCFtYWluV2luZG93KSB7XG4gICAgICByZXNvbHZlRm4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpcGMub25jZSgnbm93LXJlYWR5LWZvci1zaHV0ZG93bicsIChfZXZlbnQsIGVycm9yKSA9PiB7XG4gICAgICBnZXRMb2dnZXIoKS5pbmZvKCdyZXF1ZXN0U2h1dGRvd246IFJlc3BvbnNlIHJlY2VpdmVkJyk7XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBnZXRMb2dnZXIoKS5lcnJvcihcbiAgICAgICAgICAncmVxdWVzdFNodXRkb3duOiBnb3QgZXJyb3IsIHN0aWxsIHNodXR0aW5nIGRvd24uJyxcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dCk7XG5cbiAgICAgIHJlc29sdmVGbigpO1xuICAgIH0pO1xuXG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdnZXQtcmVhZHktZm9yLXNodXRkb3duJyk7XG5cbiAgICAvLyBXZSdsbCB3YWl0IHR3byBtaW51dGVzLCB0aGVuIGZvcmNlIHRoZSBhcHAgdG8gZ28gZG93bi4gVGhpcyBjYW4gaGFwcGVuIGlmIHNvbWVvbmVcbiAgICAvLyAgIGV4aXRzIHRoZSBhcHAgYmVmb3JlIHdlJ3ZlIHNldCBldmVyeXRoaW5nIHVwIGluIHByZWxvYWQoKSAoc28gdGhlIGJyb3dzZXIgaXNuJ3RcbiAgICAvLyAgIHlldCBsaXN0ZW5pbmcgZm9yIHRoZXNlIGV2ZW50cyksIG9yIGlmIHRoZXJlIGFyZSBhIHdob2xlIGxvdCBvZiBzdGFja2VkLXVwIHRhc2tzLlxuICAgIC8vIE5vdGU6IHR3byBtaW51dGVzIGlzIGFsc28gb3VyIHRpbWVvdXQgZm9yIFNRTCB0YXNrcyBpbiBkYXRhLmpzIGluIHRoZSBicm93c2VyLlxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGdldExvZ2dlcigpLmVycm9yKFxuICAgICAgICAncmVxdWVzdFNodXRkb3duOiBSZXNwb25zZSBuZXZlciByZWNlaXZlZDsgZm9yY2luZyBzaHV0ZG93bi4nXG4gICAgICApO1xuICAgICAgcmVzb2x2ZUZuKCk7XG4gICAgfSwgMiAqIDYwICogMTAwMCk7XG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgcmVxdWVzdDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnZXRMb2dnZXIoKS5lcnJvcihcbiAgICAgICdyZXF1ZXN0U2h1dGRvd24gZXJyb3I6JyxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG4gIH1cbn1cblxuYXBwLm9uKCdiZWZvcmUtcXVpdCcsICgpID0+IHtcbiAgZ2V0TG9nZ2VyKCkuaW5mbygnYmVmb3JlLXF1aXQgZXZlbnQnLCB7XG4gICAgcmVhZHlGb3JTaHV0ZG93bjogd2luZG93U3RhdGUucmVhZHlGb3JTaHV0ZG93bigpLFxuICAgIHNob3VsZFF1aXQ6IHdpbmRvd1N0YXRlLnNob3VsZFF1aXQoKSxcbiAgfSk7XG5cbiAgc3lzdGVtVHJheVNlcnZpY2U/Lm1hcmtTaG91bGRRdWl0KCk7XG4gIHdpbmRvd1N0YXRlLm1hcmtTaG91bGRRdWl0KCk7XG5cbiAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3F1aXQnKTtcbiAgfVxufSk7XG5cbi8vIFF1aXQgd2hlbiBhbGwgd2luZG93cyBhcmUgY2xvc2VkLlxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgZ2V0TG9nZ2VyKCkuaW5mbygnbWFpbiBwcm9jZXNzIGhhbmRsaW5nIHdpbmRvdy1hbGwtY2xvc2VkJyk7XG4gIC8vIE9uIE9TIFggaXQgaXMgY29tbW9uIGZvciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIG1lbnUgYmFyXG4gIC8vIHRvIHN0YXkgYWN0aXZlIHVudGlsIHRoZSB1c2VyIHF1aXRzIGV4cGxpY2l0bHkgd2l0aCBDbWQgKyBRXG4gIGNvbnN0IHNob3VsZEF1dG9DbG9zZSA9ICFPUy5pc01hY09TKCkgfHwgaXNUZXN0RW52aXJvbm1lbnQoZ2V0RW52aXJvbm1lbnQoKSk7XG5cbiAgLy8gT25seSBhdXRvbWF0aWNhbGx5IHF1aXQgaWYgdGhlIG1haW4gd2luZG93IGhhcyBiZWVuIGNyZWF0ZWRcbiAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgd2luZG93LWFsbC1jbG9zZWRgIGNhbiBiZSB0cmlnZ2VyZWQgYnkgdGhlXG4gIC8vIFwib3B0aW1pemluZyBhcHBsaWNhdGlvblwiIHdpbmRvdyBjbG9zaW5nXG4gIGlmIChzaG91bGRBdXRvQ2xvc2UgJiYgbWFpbldpbmRvd0NyZWF0ZWQpIHtcbiAgICBhcHAucXVpdCgpO1xuICB9XG59KTtcblxuYXBwLm9uKCdhY3RpdmF0ZScsICgpID0+IHtcbiAgaWYgKCFyZWFkeSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE9uIE9TIFggaXQncyBjb21tb24gdG8gcmUtY3JlYXRlIGEgd2luZG93IGluIHRoZSBhcHAgd2hlbiB0aGVcbiAgLy8gZG9jayBpY29uIGlzIGNsaWNrZWQgYW5kIHRoZXJlIGFyZSBubyBvdGhlciB3aW5kb3dzIG9wZW4uXG4gIGlmIChtYWluV2luZG93KSB7XG4gICAgbWFpbldpbmRvdy5zaG93KCk7XG4gIH0gZWxzZSB7XG4gICAgY3JlYXRlV2luZG93KCk7XG4gIH1cbn0pO1xuXG4vLyBEZWZlbnNlIGluIGRlcHRoLiBXZSBuZXZlciBpbnRlbmQgdG8gb3BlbiB3ZWJ2aWV3cyBvciB3aW5kb3dzLiBQcmV2ZW50IGl0IGNvbXBsZXRlbHkuXG5hcHAub24oXG4gICd3ZWItY29udGVudHMtY3JlYXRlZCcsXG4gIChfY3JlYXRlRXZlbnQ6IEVsZWN0cm9uLkV2ZW50LCBjb250ZW50czogRWxlY3Ryb24uV2ViQ29udGVudHMpID0+IHtcbiAgICBjb250ZW50cy5vbignd2lsbC1hdHRhY2gtd2VidmlldycsIGF0dGFjaEV2ZW50ID0+IHtcbiAgICAgIGF0dGFjaEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgY29udGVudHMub24oJ25ldy13aW5kb3cnLCBuZXdFdmVudCA9PiB7XG4gICAgICBuZXdFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9XG4pO1xuXG5hcHAuc2V0QXNEZWZhdWx0UHJvdG9jb2xDbGllbnQoJ3NnbmwnKTtcbmFwcC5zZXRBc0RlZmF1bHRQcm90b2NvbENsaWVudCgnc2lnbmFsY2FwdGNoYScpO1xuXG5hcHAub24oJ3dpbGwtZmluaXNoLWxhdW5jaGluZycsICgpID0+IHtcbiAgLy8gb3Blbi11cmwgbXVzdCBiZSBzZXQgZnJvbSB3aXRoaW4gd2lsbC1maW5pc2gtbGF1bmNoaW5nIGZvciBtYWNPU1xuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDM5NDkyOTFcbiAgYXBwLm9uKCdvcGVuLXVybCcsIChldmVudCwgaW5jb21pbmdIcmVmKSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChpc0NhcHRjaGFIcmVmKGluY29taW5nSHJlZiwgZ2V0TG9nZ2VyKCkpKSB7XG4gICAgICBjb25zdCB7IGNhcHRjaGEgfSA9IHBhcnNlQ2FwdGNoYUhyZWYoaW5jb21pbmdIcmVmLCBnZXRMb2dnZXIoKSk7XG4gICAgICBjaGFsbGVuZ2VIYW5kbGVyLmhhbmRsZUNhcHRjaGEoY2FwdGNoYSk7XG5cbiAgICAgIC8vIFNob3cgd2luZG93IGFmdGVyIGhhbmRsaW5nIGNhcHRjaGFcbiAgICAgIHNob3dXaW5kb3coKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhhbmRsZVNnbmxIcmVmKGluY29taW5nSHJlZik7XG4gIH0pO1xufSk7XG5cbmlwYy5vbignc2V0LWJhZGdlLWNvdW50JywgKF9ldmVudDogRWxlY3Ryb24uRXZlbnQsIGNvdW50OiBudW1iZXIpID0+IHtcbiAgYXBwLmJhZGdlQ291bnQgPSBjb3VudDtcbn0pO1xuXG5pcGMub24oJ3JlbW92ZS1zZXR1cC1tZW51LWl0ZW1zJywgKCkgPT4ge1xuICBzZXR1cE1lbnUoKTtcbn0pO1xuXG5pcGMub24oJ2FkZC1zZXR1cC1tZW51LWl0ZW1zJywgKCkgPT4ge1xuICBzZXR1cE1lbnUoe1xuICAgIGluY2x1ZGVTZXR1cDogdHJ1ZSxcbiAgfSk7XG59KTtcblxuaXBjLm9uKCdkcmF3LWF0dGVudGlvbicsICgpID0+IHtcbiAgaWYgKCFtYWluV2luZG93KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKE9TLmlzV2luZG93cygpIHx8IE9TLmlzTGludXgoKSkge1xuICAgIG1haW5XaW5kb3cuZmxhc2hGcmFtZSh0cnVlKTtcbiAgfVxufSk7XG5cbmlwYy5vbigncmVzdGFydCcsICgpID0+IHtcbiAgZ2V0TG9nZ2VyKCkuaW5mbygnUmVsYXVuY2hpbmcgYXBwbGljYXRpb24nKTtcbiAgYXBwLnJlbGF1bmNoKCk7XG4gIGFwcC5xdWl0KCk7XG59KTtcbmlwYy5vbignc2h1dGRvd24nLCAoKSA9PiB7XG4gIGFwcC5xdWl0KCk7XG59KTtcblxuaXBjLm9uKFxuICAnc2V0LWF1dG8taGlkZS1tZW51LWJhcicsXG4gIChfZXZlbnQ6IEVsZWN0cm9uLkV2ZW50LCBhdXRvSGlkZTogYm9vbGVhbikgPT4ge1xuICAgIGlmIChtYWluV2luZG93KSB7XG4gICAgICBtYWluV2luZG93LmF1dG9IaWRlTWVudUJhciA9IGF1dG9IaWRlO1xuICAgIH1cbiAgfVxuKTtcblxuaXBjLm9uKFxuICAnc2V0LW1lbnUtYmFyLXZpc2liaWxpdHknLFxuICAoX2V2ZW50OiBFbGVjdHJvbi5FdmVudCwgdmlzaWJpbGl0eTogYm9vbGVhbikgPT4ge1xuICAgIGlmIChtYWluV2luZG93KSB7XG4gICAgICBtYWluV2luZG93LnNldE1lbnVCYXJWaXNpYmlsaXR5KHZpc2liaWxpdHkpO1xuICAgIH1cbiAgfVxuKTtcblxuaXBjLm9uKFxuICAndXBkYXRlLXN5c3RlbS10cmF5LXNldHRpbmcnLFxuICAoX2V2ZW50LCByYXdTeXN0ZW1UcmF5U2V0dGluZyAvKiA6IFJlYWRvbmx5PHVua25vd24+ICovKSA9PiB7XG4gICAgY29uc3Qgc3lzdGVtVHJheVNldHRpbmcgPSBwYXJzZVN5c3RlbVRyYXlTZXR0aW5nKHJhd1N5c3RlbVRyYXlTZXR0aW5nKTtcbiAgICBzeXN0ZW1UcmF5U2V0dGluZ0NhY2hlLnNldChzeXN0ZW1UcmF5U2V0dGluZyk7XG5cbiAgICBpZiAoc3lzdGVtVHJheVNlcnZpY2UpIHtcbiAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IHNob3VsZE1pbmltaXplVG9TeXN0ZW1UcmF5KHN5c3RlbVRyYXlTZXR0aW5nKTtcbiAgICAgIHN5c3RlbVRyYXlTZXJ2aWNlLnNldEVuYWJsZWQoaXNFbmFibGVkKTtcbiAgICB9XG4gIH1cbik7XG5cbmlwYy5vbignY2xvc2Utc2NyZWVuLXNoYXJlLWNvbnRyb2xsZXInLCAoKSA9PiB7XG4gIGlmIChzY3JlZW5TaGFyZVdpbmRvdykge1xuICAgIHNjcmVlblNoYXJlV2luZG93LmNsb3NlKCk7XG4gIH1cbn0pO1xuXG5pcGMub24oJ3N0b3Atc2NyZWVuLXNoYXJlJywgKCkgPT4ge1xuICBpZiAobWFpbldpbmRvdykge1xuICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMuc2VuZCgnc3RvcC1zY3JlZW4tc2hhcmUnKTtcbiAgfVxufSk7XG5cbmlwYy5vbignc2hvdy1zY3JlZW4tc2hhcmUnLCAoX2V2ZW50OiBFbGVjdHJvbi5FdmVudCwgc291cmNlTmFtZTogc3RyaW5nKSA9PiB7XG4gIHNob3dTY3JlZW5TaGFyZVdpbmRvdyhzb3VyY2VOYW1lKTtcbn0pO1xuXG5pcGMub24oJ3VwZGF0ZS10cmF5LWljb24nLCAoX2V2ZW50OiBFbGVjdHJvbi5FdmVudCwgdW5yZWFkQ291bnQ6IG51bWJlcikgPT4ge1xuICBpZiAoc3lzdGVtVHJheVNlcnZpY2UpIHtcbiAgICBzeXN0ZW1UcmF5U2VydmljZS5zZXRVbnJlYWRDb3VudCh1bnJlYWRDb3VudCk7XG4gIH1cbn0pO1xuXG4vLyBEZWJ1ZyBMb2ctcmVsYXRlZCBJUEMgY2FsbHNcblxuaXBjLm9uKCdzaG93LWRlYnVnLWxvZycsIHNob3dEZWJ1Z0xvZ1dpbmRvdyk7XG5pcGMub24oXG4gICdzaG93LWRlYnVnLWxvZy1zYXZlLWRpYWxvZycsXG4gIGFzeW5jIChfZXZlbnQ6IEVsZWN0cm9uLkV2ZW50LCBsb2dUZXh0OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB7IGZpbGVQYXRoIH0gPSBhd2FpdCBkaWFsb2cuc2hvd1NhdmVEaWFsb2coe1xuICAgICAgZGVmYXVsdFBhdGg6ICdkZWJ1Z2xvZy50eHQnLFxuICAgIH0pO1xuICAgIGlmIChmaWxlUGF0aCkge1xuICAgICAgYXdhaXQgd3JpdGVGaWxlKGZpbGVQYXRoLCBsb2dUZXh0KTtcbiAgICB9XG4gIH1cbik7XG5cbi8vIFBlcm1pc3Npb25zIFBvcHVwLXJlbGF0ZWQgSVBDIGNhbGxzXG5cbmlwYy5oYW5kbGUoXG4gICdzaG93LXBlcm1pc3Npb25zLXBvcHVwJyxcbiAgYXN5bmMgKF9ldmVudDogRWxlY3Ryb24uRXZlbnQsIGZvckNhbGxpbmc6IGJvb2xlYW4sIGZvckNhbWVyYTogYm9vbGVhbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzaG93UGVybWlzc2lvbnNQb3B1cFdpbmRvdyhmb3JDYWxsaW5nLCBmb3JDYW1lcmEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBnZXRMb2dnZXIoKS5lcnJvcihcbiAgICAgICAgJ3Nob3ctcGVybWlzc2lvbnMtcG9wdXAgZXJyb3I6JyxcbiAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICApO1xuICAgIH1cbiAgfVxuKTtcblxuLy8gU2V0dGluZ3MtcmVsYXRlZCBJUEMgY2FsbHNcblxuZnVuY3Rpb24gYWRkRGFya092ZXJsYXkoKSB7XG4gIGlmIChtYWluV2luZG93ICYmIG1haW5XaW5kb3cud2ViQ29udGVudHMpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ2FkZC1kYXJrLW92ZXJsYXknKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlRGFya092ZXJsYXkoKSB7XG4gIGlmIChtYWluV2luZG93ICYmIG1haW5XaW5kb3cud2ViQ29udGVudHMpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3JlbW92ZS1kYXJrLW92ZXJsYXknKTtcbiAgfVxufVxuXG5pcGMub24oJ3Nob3ctc2V0dGluZ3MnLCBzaG93U2V0dGluZ3NXaW5kb3cpO1xuXG5pcGMub24oJ2RlbGV0ZS1hbGwtZGF0YScsICgpID0+IHtcbiAgaWYgKHNldHRpbmdzV2luZG93KSB7XG4gICAgc2V0dGluZ3NXaW5kb3cuY2xvc2UoKTtcbiAgfVxuICBpZiAobWFpbldpbmRvdyAmJiBtYWluV2luZG93LndlYkNvbnRlbnRzKSB7XG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdkZWxldGUtYWxsLWRhdGEnKTtcbiAgfVxufSk7XG5cbmlwYy5vbignZ2V0LWJ1aWx0LWluLWltYWdlcycsIGFzeW5jICgpID0+IHtcbiAgaWYgKCFtYWluV2luZG93KSB7XG4gICAgZ2V0TG9nZ2VyKCkud2FybignaXBjL2dldC1idWlsdC1pbi1pbWFnZXM6IE5vIG1haW5XaW5kb3chJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBpbWFnZXMgPSBhd2FpdCBhdHRhY2htZW50cy5nZXRCdWlsdEluSW1hZ2VzKCk7XG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdnZXQtc3VjY2Vzcy1idWlsdC1pbi1pbWFnZXMnLCBudWxsLCBpbWFnZXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChtYWluV2luZG93ICYmIG1haW5XaW5kb3cud2ViQ29udGVudHMpIHtcbiAgICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMuc2VuZCgnZ2V0LXN1Y2Nlc3MtYnVpbHQtaW4taW1hZ2VzJywgZXJyb3IubWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldExvZ2dlcigpLmVycm9yKCdFcnJvciBoYW5kbGluZyBnZXQtYnVpbHQtaW4taW1hZ2VzOicsIGVycm9yLnN0YWNrKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBJbmdlc3RlZCBpbiBwcmVsb2FkLmpzIHZpYSBhIHNlbmRTeW5jIGNhbGxcbmlwYy5vbignbG9jYWxlLWRhdGEnLCBldmVudCA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBldmVudC5yZXR1cm5WYWx1ZSA9IGdldExvY2FsZSgpLm1lc3NhZ2VzO1xufSk7XG5cbmlwYy5vbigndXNlci1jb25maWcta2V5JywgZXZlbnQgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZXZlbnQucmV0dXJuVmFsdWUgPSB1c2VyQ29uZmlnLmdldCgna2V5Jyk7XG59KTtcblxuaXBjLm9uKCdnZXQtdXNlci1kYXRhLXBhdGgnLCBldmVudCA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBldmVudC5yZXR1cm5WYWx1ZSA9IGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpO1xufSk7XG5cbi8vIFJlZnJlc2ggdGhlIHNldHRpbmdzIHdpbmRvdyB3aGVuZXZlciBwcmVmZXJlbmNlcyBjaGFuZ2VcbmlwYy5vbigncHJlZmVyZW5jZXMtY2hhbmdlZCcsICgpID0+IHtcbiAgZm9yIChjb25zdCB3aW5kb3cgb2YgYWN0aXZlV2luZG93cykge1xuICAgIGlmICh3aW5kb3cud2ViQ29udGVudHMpIHtcbiAgICAgIHdpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdwcmVmZXJlbmNlcy1jaGFuZ2VkJyk7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0SW5jb21pbmdIcmVmKGFyZ3Y6IEFycmF5PHN0cmluZz4pIHtcbiAgcmV0dXJuIGFyZ3YuZmluZChhcmcgPT4gaXNTZ25sSHJlZihhcmcsIGdldExvZ2dlcigpKSk7XG59XG5cbmZ1bmN0aW9uIGdldEluY29taW5nQ2FwdGNoYUhyZWYoYXJndjogQXJyYXk8c3RyaW5nPikge1xuICByZXR1cm4gYXJndi5maW5kKGFyZyA9PiBpc0NhcHRjaGFIcmVmKGFyZywgZ2V0TG9nZ2VyKCkpKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2dubEhyZWYoaW5jb21pbmdIcmVmOiBzdHJpbmcpIHtcbiAgbGV0IGNvbW1hbmQ7XG4gIGxldCBhcmdzO1xuICBsZXQgaGFzaDtcblxuICBpZiAoaXNTZ25sSHJlZihpbmNvbWluZ0hyZWYsIGdldExvZ2dlcigpKSkge1xuICAgICh7IGNvbW1hbmQsIGFyZ3MsIGhhc2ggfSA9IHBhcnNlU2dubEhyZWYoaW5jb21pbmdIcmVmLCBnZXRMb2dnZXIoKSkpO1xuICB9IGVsc2UgaWYgKGlzU2lnbmFsSHR0cHNMaW5rKGluY29taW5nSHJlZiwgZ2V0TG9nZ2VyKCkpKSB7XG4gICAgKHsgY29tbWFuZCwgYXJncywgaGFzaCB9ID0gcGFyc2VTaWduYWxIdHRwc0xpbmsoaW5jb21pbmdIcmVmLCBnZXRMb2dnZXIoKSkpO1xuICB9XG5cbiAgaWYgKG1haW5XaW5kb3cgJiYgbWFpbldpbmRvdy53ZWJDb250ZW50cykge1xuICAgIGlmIChjb21tYW5kID09PSAnYWRkc3RpY2tlcnMnKSB7XG4gICAgICBnZXRMb2dnZXIoKS5pbmZvKCdPcGVuaW5nIHN0aWNrZXIgcGFjayBmcm9tIHNnbmwgcHJvdG9jb2wgbGluaycpO1xuICAgICAgY29uc3QgcGFja0lkID0gYXJncz8uZ2V0KCdwYWNrX2lkJyk7XG4gICAgICBjb25zdCBwYWNrS2V5SGV4ID0gYXJncz8uZ2V0KCdwYWNrX2tleScpO1xuICAgICAgY29uc3QgcGFja0tleSA9IHBhY2tLZXlIZXhcbiAgICAgICAgPyBCdWZmZXIuZnJvbShwYWNrS2V5SGV4LCAnaGV4JykudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgICAgIDogJyc7XG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3Nob3ctc3RpY2tlci1wYWNrJywgeyBwYWNrSWQsIHBhY2tLZXkgfSk7XG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc2lnbmFsLmdyb3VwJyAmJiBoYXNoKSB7XG4gICAgICBnZXRMb2dnZXIoKS5pbmZvKCdTaG93aW5nIGdyb3VwIGZyb20gc2dubCBwcm90b2NvbCBsaW5rJyk7XG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3Nob3ctZ3JvdXAtdmlhLWxpbmsnLCB7IGhhc2ggfSk7XG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc2lnbmFsLm1lJyAmJiBoYXNoKSB7XG4gICAgICBnZXRMb2dnZXIoKS5pbmZvKCdTaG93aW5nIGNvbnZlcnNhdGlvbiBmcm9tIHNnbmwgcHJvdG9jb2wgbGluaycpO1xuICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdzaG93LWNvbnZlcnNhdGlvbi12aWEtc2lnbmFsLm1lJywgeyBoYXNoIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXRMb2dnZXIoKS5pbmZvKCdTaG93aW5nIHdhcm5pbmcgdGhhdCB3ZSBjYW5ub3QgcHJvY2VzcyBsaW5rJyk7XG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ3Vua25vd24tc2dubC1saW5rJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGdldExvZ2dlcigpLmVycm9yKCdVbmhhbmRsZWQgc2dubCBsaW5rJyk7XG4gIH1cbn1cblxuaXBjLm9uKCdpbnN0YWxsLXN0aWNrZXItcGFjaycsIChfZXZlbnQsIHBhY2tJZCwgcGFja0tleUhleCkgPT4ge1xuICBjb25zdCBwYWNrS2V5ID0gQnVmZmVyLmZyb20ocGFja0tleUhleCwgJ2hleCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ2luc3RhbGwtc3RpY2tlci1wYWNrJywgeyBwYWNrSWQsIHBhY2tLZXkgfSk7XG4gIH1cbn0pO1xuXG5pcGMub24oJ2Vuc3VyZS1maWxlLXBlcm1pc3Npb25zJywgYXN5bmMgZXZlbnQgPT4ge1xuICBhd2FpdCBlbnN1cmVGaWxlUGVybWlzc2lvbnMoKTtcbiAgZXZlbnQucmVwbHkoJ2Vuc3VyZS1maWxlLXBlcm1pc3Npb25zLWRvbmUnKTtcbn0pO1xuXG4vKipcbiAqIEVuc3VyZSBmaWxlcyBpbiB0aGUgdXNlcidzIGRhdGEgZGlyZWN0b3J5IGhhdmUgdGhlIHByb3BlciBwZXJtaXNzaW9ucy5cbiAqIE9wdGlvbmFsbHkgdGFrZXMgYW4gYXJyYXkgb2YgZmlsZSBwYXRocyB0byBleGNsdXNpdmVseSBhZmZlY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gW29ubHlGaWxlc10gLSBPbmx5IGVuc3VyZSBwZXJtaXNzaW9ucyBvbiB0aGVzZSBnaXZlbiBmaWxlc1xuICovXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVGaWxlUGVybWlzc2lvbnMob25seUZpbGVzPzogQXJyYXk8c3RyaW5nPikge1xuICBnZXRMb2dnZXIoKS5pbmZvKCdCZWdpbiBlbnN1cmluZyBwZXJtaXNzaW9ucycpO1xuXG4gIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgdXNlckRhdGFQYXRoID0gYXdhaXQgcmVhbHBhdGgoYXBwLmdldFBhdGgoJ3VzZXJEYXRhJykpO1xuICAvLyBmYXN0LWdsb2IgdXNlcyBgL2AgZm9yIGFsbCBwbGF0Zm9ybXNcbiAgY29uc3QgdXNlckRhdGFHbG9iID0gbm9ybWFsaXplUGF0aChqb2luKHVzZXJEYXRhUGF0aCwgJyoqJywgJyonKSk7XG5cbiAgLy8gRGV0ZXJtaW5lIGZpbGVzIHRvIHRvdWNoXG4gIGNvbnN0IGZpbGVzID0gb25seUZpbGVzXG4gICAgPyBvbmx5RmlsZXMubWFwKGYgPT4gam9pbih1c2VyRGF0YVBhdGgsIGYpKVxuICAgIDogYXdhaXQgZmFzdEdsb2IodXNlckRhdGFHbG9iLCB7XG4gICAgICAgIG1hcmtEaXJlY3RvcmllczogdHJ1ZSxcbiAgICAgICAgb25seUZpbGVzOiBmYWxzZSxcbiAgICAgICAgaWdub3JlOiBbJyoqL1NpbmdsZXRvbionXSxcbiAgICAgIH0pO1xuXG4gIGdldExvZ2dlcigpLmluZm8oYEVuc3VyaW5nIGZpbGUgcGVybWlzc2lvbnMgZm9yICR7ZmlsZXMubGVuZ3RofSBmaWxlc2ApO1xuXG4gIC8vIFRvdWNoIGVhY2ggZmlsZSBpbiBhIHF1ZXVlXG4gIGNvbnN0IHEgPSBuZXcgUFF1ZXVlKHsgY29uY3VycmVuY3k6IDUsIHRpbWVvdXQ6IDEwMDAgKiA2MCAqIDIgfSk7XG4gIHEuYWRkQWxsKFxuICAgIGZpbGVzLm1hcChmID0+IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlzRGlyID0gZi5lbmRzV2l0aCgnLycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2htb2Qobm9ybWFsaXplKGYpLCBpc0RpciA/IDBvNzAwIDogMG82MDApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZ2V0TG9nZ2VyKCkuZXJyb3IoXG4gICAgICAgICAgJ2Vuc3VyZUZpbGVQZXJtaXNzaW9uczogRXJyb3IgZnJvbSBjaG1vZCcsXG4gICAgICAgICAgZXJyb3IubWVzc2FnZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgYXdhaXQgcS5vbkVtcHR5KCk7XG5cbiAgZ2V0TG9nZ2VyKCkuaW5mbyhgRmluaXNoIGVuc3VyaW5nIHBlcm1pc3Npb25zIGluICR7RGF0ZS5ub3coKSAtIHN0YXJ0fW1zYCk7XG59XG5cbmlwYy5oYW5kbGUoJ2dldC1hdXRvLWxhdW5jaCcsIGFzeW5jICgpID0+IHtcbiAgcmV0dXJuIGFwcC5nZXRMb2dpbkl0ZW1TZXR0aW5ncygpLm9wZW5BdExvZ2luO1xufSk7XG5cbmlwYy5oYW5kbGUoJ3NldC1hdXRvLWxhdW5jaCcsIGFzeW5jIChfZXZlbnQsIHZhbHVlKSA9PiB7XG4gIGFwcC5zZXRMb2dpbkl0ZW1TZXR0aW5ncyh7IG9wZW5BdExvZ2luOiBCb29sZWFuKHZhbHVlKSB9KTtcbn0pO1xuXG5pcGMub24oJ3Nob3ctbWVzc2FnZS1ib3gnLCAoX2V2ZW50LCB7IHR5cGUsIG1lc3NhZ2UgfSkgPT4ge1xuICBkaWFsb2cuc2hvd01lc3NhZ2VCb3goeyB0eXBlLCBtZXNzYWdlIH0pO1xufSk7XG5cbmlwYy5vbignc2hvdy1pdGVtLWluLWZvbGRlcicsIChfZXZlbnQsIGZvbGRlcikgPT4ge1xuICBzaGVsbC5zaG93SXRlbUluRm9sZGVyKGZvbGRlcik7XG59KTtcblxuaXBjLmhhbmRsZSgnc2hvdy1zYXZlLWRpYWxvZycsIGFzeW5jIChfZXZlbnQsIHsgZGVmYXVsdFBhdGggfSkgPT4ge1xuICBpZiAoIW1haW5XaW5kb3cpIHtcbiAgICBnZXRMb2dnZXIoKS53YXJuKCdzaG93LXNhdmUtZGlhbG9nOiBubyBtYWluIHdpbmRvdycpO1xuXG4gICAgcmV0dXJuIHsgY2FuY2VsZWQ6IHRydWUgfTtcbiAgfVxuXG4gIHJldHVybiBkaWFsb2cuc2hvd1NhdmVEaWFsb2cobWFpbldpbmRvdywge1xuICAgIGRlZmF1bHRQYXRoLFxuICB9KTtcbn0pO1xuXG5pcGMuaGFuZGxlKCdnZXRTY3JlZW5DYXB0dXJlU291cmNlcycsIGFzeW5jICgpID0+IHtcbiAgcmV0dXJuIGRlc2t0b3BDYXB0dXJlci5nZXRTb3VyY2VzKHtcbiAgICBmZXRjaFdpbmRvd0ljb25zOiB0cnVlLFxuICAgIHRodW1ibmFpbFNpemU6IHsgaGVpZ2h0OiAxMDIsIHdpZHRoOiAxODQgfSxcbiAgICB0eXBlczogWyd3aW5kb3cnLCAnc2NyZWVuJ10sXG4gIH0pO1xufSk7XG5cbmlwYy5oYW5kbGUoJ2V4ZWN1dGVNZW51Um9sZScsIGFzeW5jICh7IHNlbmRlciB9LCB1bnR5cGVkUm9sZSkgPT4ge1xuICBjb25zdCByb2xlID0gdW50eXBlZFJvbGUgYXMgTWVudUl0ZW1Db25zdHJ1Y3Rvck9wdGlvbnNbJ3JvbGUnXTtcblxuICBjb25zdCBzZW5kZXJXaW5kb3cgPSBCcm93c2VyV2luZG93LmZyb21XZWJDb250ZW50cyhzZW5kZXIpO1xuXG4gIHN3aXRjaCAocm9sZSkge1xuICAgIGNhc2UgJ3VuZG8nOlxuICAgICAgc2VuZGVyLnVuZG8oKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlZG8nOlxuICAgICAgc2VuZGVyLnJlZG8oKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2N1dCc6XG4gICAgICBzZW5kZXIuY3V0KCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjb3B5JzpcbiAgICAgIHNlbmRlci5jb3B5KCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwYXN0ZSc6XG4gICAgICBzZW5kZXIucGFzdGUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Bhc3RlQW5kTWF0Y2hTdHlsZSc6XG4gICAgICBzZW5kZXIucGFzdGVBbmRNYXRjaFN0eWxlKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkZWxldGUnOlxuICAgICAgc2VuZGVyLmRlbGV0ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2VsZWN0QWxsJzpcbiAgICAgIHNlbmRlci5zZWxlY3RBbGwoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlbG9hZCc6XG4gICAgICBzZW5kZXIucmVsb2FkKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0b2dnbGVEZXZUb29scyc6XG4gICAgICBzZW5kZXIudG9nZ2xlRGV2VG9vbHMoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncmVzZXRab29tJzpcbiAgICAgIHNlbmRlci5zZXRab29tTGV2ZWwoMCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd6b29tSW4nOlxuICAgICAgc2VuZGVyLnNldFpvb21MZXZlbChzZW5kZXIuZ2V0Wm9vbUxldmVsKCkgKyAxKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3pvb21PdXQnOlxuICAgICAgc2VuZGVyLnNldFpvb21MZXZlbChzZW5kZXIuZ2V0Wm9vbUxldmVsKCkgLSAxKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAndG9nZ2xlZnVsbHNjcmVlbic6XG4gICAgICBzZW5kZXJXaW5kb3c/LnNldEZ1bGxTY3JlZW4oIXNlbmRlcldpbmRvdz8uaXNGdWxsU2NyZWVuKCkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbWluaW1pemUnOlxuICAgICAgc2VuZGVyV2luZG93Py5taW5pbWl6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2xvc2UnOlxuICAgICAgc2VuZGVyV2luZG93Py5jbG9zZSgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdxdWl0JzpcbiAgICAgIGFwcC5xdWl0KCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBpZ25vcmVkXG4gICAgICBicmVhaztcbiAgfVxufSk7XG5cbmlwYy5oYW5kbGUoJ2dldE1haW5XaW5kb3dTdGF0cycsIGFzeW5jICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBpc01heGltaXplZDogd2luZG93Q29uZmlnPy5tYXhpbWl6ZWQgPz8gZmFsc2UsXG4gICAgaXNGdWxsU2NyZWVuOiB3aW5kb3dDb25maWc/LmZ1bGxzY3JlZW4gPz8gZmFsc2UsXG4gIH07XG59KTtcblxuaXBjLmhhbmRsZSgnZ2V0TWVudU9wdGlvbnMnLCBhc3luYyAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGV2ZWxvcG1lbnQ6IG1lbnVPcHRpb25zPy5kZXZlbG9wbWVudCA/PyBmYWxzZSxcbiAgICBkZXZUb29sczogbWVudU9wdGlvbnM/LmRldlRvb2xzID8/IGZhbHNlLFxuICAgIGluY2x1ZGVTZXR1cDogbWVudU9wdGlvbnM/LmluY2x1ZGVTZXR1cCA/PyBmYWxzZSxcbiAgICBpc1Byb2R1Y3Rpb246IG1lbnVPcHRpb25zPy5pc1Byb2R1Y3Rpb24gPz8gdHJ1ZSxcbiAgICBwbGF0Zm9ybTogbWVudU9wdGlvbnM/LnBsYXRmb3JtID8/ICd1bmtub3duJyxcbiAgfTtcbn0pO1xuXG5pcGMuaGFuZGxlKCdleGVjdXRlTWVudUFjdGlvbicsIGFzeW5jIChfZXZlbnQsIGFjdGlvbjogTWVudUFjdGlvblR5cGUpID0+IHtcbiAgaWYgKGFjdGlvbiA9PT0gJ2ZvcmNlVXBkYXRlJykge1xuICAgIGZvcmNlVXBkYXRlKCk7XG4gIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnb3BlbkNvbnRhY3RVcycpIHtcbiAgICBvcGVuQ29udGFjdFVzKCk7XG4gIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnb3BlbkZvcnVtcycpIHtcbiAgICBvcGVuRm9ydW1zKCk7XG4gIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnb3BlbkpvaW5UaGVCZXRhJykge1xuICAgIG9wZW5Kb2luVGhlQmV0YSgpO1xuICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ29wZW5SZWxlYXNlTm90ZXMnKSB7XG4gICAgb3BlblJlbGVhc2VOb3RlcygpO1xuICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ29wZW5TdXBwb3J0UGFnZScpIHtcbiAgICBvcGVuU3VwcG9ydFBhZ2UoKTtcbiAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdzZXR1cEFzTmV3RGV2aWNlJykge1xuICAgIHNldHVwQXNOZXdEZXZpY2UoKTtcbiAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdzZXR1cEFzU3RhbmRhbG9uZScpIHtcbiAgICBzZXR1cEFzU3RhbmRhbG9uZSgpO1xuICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3Nob3dBYm91dCcpIHtcbiAgICBzaG93QWJvdXQoKTtcbiAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdzaG93RGVidWdMb2cnKSB7XG4gICAgc2hvd0RlYnVnTG9nV2luZG93KCk7XG4gIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnc2hvd0tleWJvYXJkU2hvcnRjdXRzJykge1xuICAgIHNob3dLZXlib2FyZFNob3J0Y3V0cygpO1xuICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3Nob3dTZXR0aW5ncycpIHtcbiAgICBzaG93U2V0dGluZ3NXaW5kb3coKTtcbiAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdzaG93U3RpY2tlckNyZWF0b3InKSB7XG4gICAgc2hvd1N0aWNrZXJDcmVhdG9yKCk7XG4gIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnc2hvd1dpbmRvdycpIHtcbiAgICBzaG93V2luZG93KCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihhY3Rpb24pO1xuICB9XG59KTtcblxuaWYgKGlzVGVzdEVudmlyb25tZW50KGdldEVudmlyb25tZW50KCkpKSB7XG4gIGlwYy5oYW5kbGUoJ2NpOnRlc3QtZWxlY3Ryb246ZG9uZScsIGFzeW5jIChfZXZlbnQsIGluZm8pID0+IHtcbiAgICBpZiAoIXByb2Nlc3MuZW52LlRFU1RfUVVJVF9PTl9DT01QTEVURSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFxuICAgICAgYGNpOnRlc3QtZWxlY3Ryb246ZG9uZT0ke0pTT04uc3RyaW5naWZ5KGluZm8pfVxcbmAsXG4gICAgICAoKSA9PiBhcHAucXVpdCgpXG4gICAgKTtcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUNBQU87QUFFUCxrQkFBZ0M7QUFDaEMsaUJBQThCO0FBQzlCLFNBQW9CO0FBQ3BCLHNCQUEyQztBQUMzQyxvQkFBNEI7QUFFNUIsNEJBQTBCO0FBQzFCLHVCQUFxQjtBQUNyQixxQkFBbUI7QUFDbkIsb0JBQXFFO0FBQ3JFLHNCQWVPO0FBS1AsaUJBQWtCO0FBRWxCLHFCQUF3QjtBQUN4QixtQkFBOEI7QUFDOUIsMEJBQTJDO0FBQzNDLHlCQUEyQztBQUMzQyxxQkFBNEM7QUFDNUMsOEJBQWlDO0FBQ2pDLDhCQUFpQztBQUNqQyxvQkFBNkI7QUFDN0IsMkJBQThCO0FBRTlCLGtCQUEwQjtBQUUxQiw0QkFBTztBQUlQLDRCQUdPO0FBQ1Asb0JBQW1CO0FBQ25CLHlCQUlPO0FBSVAsaUJBQTRCO0FBSTVCLGtCQUE2QjtBQUM3Qix3QkFBbUM7QUFDbkMsYUFBd0I7QUFDeEIsY0FBeUI7QUFDekIsa0NBQXFDO0FBQ3JDLHdDQUEyQztBQUMzQywrQkFB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
