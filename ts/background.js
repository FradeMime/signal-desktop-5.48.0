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
var background_exports = {};
__export(background_exports, {
  cleanupSessionResets: () => cleanupSessionResets,
  isOverHourIntoPast: () => isOverHourIntoPast,
  startApp: () => startApp
});
module.exports = __toCommonJS(background_exports);
var import_electron = require("electron");
var import_lodash = require("lodash");
var import_redux = require("redux");
var import_react_dom = require("react-dom");
var import_react_redux = require("react-redux");
var import_MessageReceiver = __toESM(require("./textsecure/MessageReceiver"));
var import_Errors = require("./textsecure/Errors");
var import_TaskWithTimeout = __toESM(require("./textsecure/TaskWithTimeout"));
var Bytes = __toESM(require("./Bytes"));
var Timers = __toESM(require("./Timers"));
var indexedDb = __toESM(require("./indexeddb"));
var import_SocketStatus = require("./types/SocketStatus");
var import_Colors = require("./types/Colors");
var import_Util = require("./types/Util");
var import_challenge = require("./challenge");
var durations = __toESM(require("./util/durations"));
var import_explodePromise = require("./util/explodePromise");
var import_isWindowDragElement = require("./util/isWindowDragElement");
var import_assert = require("./util/assert");
var import_normalizeUuid = require("./util/normalizeUuid");
var import_iterables = require("./util/iterables");
var import_isNotNil = require("./util/isNotNil");
var import_setAppLoadingScreenMessage = require("./setAppLoadingScreenMessage");
var import_IdleDetector = require("./IdleDetector");
var import_expiringMessagesDeletion = require("./services/expiringMessagesDeletion");
var import_tapToViewMessagesDeletionService = require("./services/tapToViewMessagesDeletionService");
var import_storyLoader = require("./services/storyLoader");
var import_senderCertificate = require("./services/senderCertificate");
var import_groupCredentialFetcher = require("./services/groupCredentialFetcher");
var KeyboardLayout = __toESM(require("./services/keyboardLayout"));
var import_routineProfileRefresh = require("./routineProfileRefresh");
var import_timestamp = require("./util/timestamp");
var import_isValidReactionEmoji = require("./reactions/isValidReactionEmoji");
var import_helpers = require("./messages/helpers");
var import_migrateMessageData = require("./messages/migrateMessageData");
var import_batcher = require("./util/batcher");
var import_updateConversationsWithUuidLookup = require("./updateConversationsWithUuidLookup");
var import_initializeAllJobQueues = require("./jobs/initializeAllJobQueues");
var import_removeStorageKeyJobQueue = require("./jobs/removeStorageKeyJobQueue");
var import_ourProfileKey = require("./services/ourProfileKey");
var import_notifications = require("./services/notifications");
var import_areWeASubscriber = require("./services/areWeASubscriber");
var import_startTimeTravelDetector = require("./util/startTimeTravelDetector");
var import_shouldRespondWithProfileKey = require("./util/shouldRespondWithProfileKey");
var import_LatestQueue = require("./util/LatestQueue");
var import_parseIntOrThrow = require("./util/parseIntOrThrow");
var import_getProfile = require("./util/getProfile");
var KeyChangeListener = __toESM(require("./textsecure/KeyChangeListener"));
var import_RotateSignedPreKeyListener = require("./textsecure/RotateSignedPreKeyListener");
var import_whatTypeOfConversation = require("./util/whatTypeOfConversation");
var import_BackOff = require("./util/BackOff");
var import_app = require("./state/ducks/app");
var import_badgeImageFileDownloader = require("./badges/badgeImageFileDownloader");
var import_message = require("./state/selectors/message");
var import_actions = require("./state/actions");
var import_Deletes = require("./messageModifiers/Deletes");
var import_MessageReceipts = require("./messageModifiers/MessageReceipts");
var import_MessageRequests = require("./messageModifiers/MessageRequests");
var import_Reactions = require("./messageModifiers/Reactions");
var import_ReadSyncs = require("./messageModifiers/ReadSyncs");
var import_ViewSyncs = require("./messageModifiers/ViewSyncs");
var import_ViewOnceOpenSyncs = require("./messageModifiers/ViewOnceOpenSyncs");
var import_MessageReadStatus = require("./messages/MessageReadStatus");
var import_MessageSendState = require("./messages/MessageSendState");
var AttachmentDownloads = __toESM(require("./messageModifiers/AttachmentDownloads"));
var Conversation = __toESM(require("./types/Conversation"));
var Stickers = __toESM(require("./types/Stickers"));
var Errors = __toESM(require("./types/errors"));
var import_protobuf = require("./protobuf");
var import_handleRetry = require("./util/handleRetry");
var import_themeChanged = require("./shims/themeChanged");
var import_createIPCEvents = require("./util/createIPCEvents");
var import_RemoveAllConfiguration = require("./types/RemoveAllConfiguration");
var import_UUID = require("./types/UUID");
var log = __toESM(require("./logging/log"));
var import_loadRecentEmojis = require("./util/loadRecentEmojis");
var import_deleteAllLogs = require("./util/deleteAllLogs");
var import_ReactWrapperView = require("./views/ReactWrapperView");
var import_ToastCaptchaFailed = require("./components/ToastCaptchaFailed");
var import_ToastCaptchaSolved = require("./components/ToastCaptchaSolved");
var import_ToastConversationArchived = require("./components/ToastConversationArchived");
var import_ToastConversationUnarchived = require("./components/ToastConversationUnarchived");
var import_showToast = require("./util/showToast");
var import_startInteractionMode = require("./windows/startInteractionMode");
var import_deliveryReceiptsJobQueue = require("./jobs/deliveryReceiptsJobQueue");
var import_updateOurUsername = require("./util/updateOurUsername");
var import_ReactionSource = require("./reactions/ReactionSource");
var import_singleProtoJobQueue = require("./jobs/singleProtoJobQueue");
var import_getInitialState = require("./state/getInitialState");
var import_conversationJobQueue = require("./jobs/conversationJobQueue");
var import_MessageSeenStatus = require("./MessageSeenStatus");
var import_SendMessage = __toESM(require("./textsecure/SendMessage"));
const MAX_ATTACHMENT_DOWNLOAD_AGE = 3600 * 72 * 1e3;
function isOverHourIntoPast(timestamp) {
  const HOUR = 1e3 * 60 * 60;
  return (0, import_lodash.isNumber)(timestamp) && (0, import_timestamp.isOlderThan)(timestamp, HOUR);
}
async function cleanupSessionResets() {
  const sessionResets = window.storage.get("sessionResets", {});
  const keys = Object.keys(sessionResets);
  keys.forEach((key) => {
    const timestamp = sessionResets[key];
    if (!timestamp || isOverHourIntoPast(timestamp)) {
      delete sessionResets[key];
    }
  });
  await window.storage.put("sessionResets", sessionResets);
}
async function startApp() {
  window.textsecure.storage.protocol = new window.SignalProtocolStore();
  if (window.initialTheme === import_Util.ThemeType.light) {
    document.body.classList.add("light-theme");
  }
  if (window.initialTheme === import_Util.ThemeType.dark) {
    document.body.classList.add("dark-theme");
  }
  const idleDetector = new import_IdleDetector.IdleDetector();
  await KeyboardLayout.initialize();
  window.Whisper.events = window._.clone(window.Backbone.Events);
  window.Signal.Util.MessageController.install();
  window.Signal.conversationControllerStart();
  window.startupProcessingQueue = new window.Signal.Util.StartupQueue();
  import_notifications.notificationService.initialize({
    i18n: window.i18n,
    storage: window.storage
  });
  window.attachmentDownloadQueue = [];
  await window.Signal.Util.initializeMessageCounter();
  let initialBadgesState = { byId: {} };
  async function loadInitialBadgesState() {
    initialBadgesState = {
      byId: window.Signal.Util.makeLookup(await window.Signal.Data.getAllBadges(), "id")
    };
  }
  let server;
  let messageReceiver;
  let challengeHandler;
  window.storage.onready(() => {
    server = window.WebAPI.connect(window.textsecure.storage.user.getWebAPICredentials());
    window.textsecure.server = server;
    (0, import_initializeAllJobQueues.initializeAllJobQueues)({
      server
    });
    challengeHandler = new import_challenge.ChallengeHandler({
      storage: window.storage,
      startQueue(conversationId) {
        import_conversationJobQueue.conversationJobQueue.resolveVerificationWaiter(conversationId);
      },
      requestChallenge(request) {
        window.sendChallengeRequest(request);
      },
      async sendChallengeResponse(data) {
        const { messaging } = window.textsecure;
        if (!messaging) {
          throw new Error("sendChallengeResponse: messaging is not available!");
        }
        await messaging.sendChallengeResponse(data);
      },
      onChallengeFailed() {
        (0, import_showToast.showToast)(import_ToastCaptchaFailed.ToastCaptchaFailed);
      },
      onChallengeSolved() {
        (0, import_showToast.showToast)(import_ToastCaptchaSolved.ToastCaptchaSolved);
      },
      setChallengeStatus(challengeStatus) {
        window.reduxActions.network.setChallengeStatus(challengeStatus);
      }
    });
    window.Whisper.events.on("challengeResponse", (response) => {
      if (!challengeHandler) {
        throw new Error("Expected challenge handler to be there");
      }
      challengeHandler.onResponse(response);
    });
    window.Signal.challengeHandler = challengeHandler;
    log.info("Initializing MessageReceiver");
    messageReceiver = new import_MessageReceiver.default({
      server,
      storage: window.storage,
      serverTrustRoot: window.getServerTrustRoot()
    });
    function queuedEventListener(handler, track = true) {
      return (...args) => {
        eventHandlerQueue.add(async () => {
          try {
            await handler(...args);
          } finally {
            if (track) {
              window.Whisper.events.trigger("incrementProgress");
            }
          }
        });
      };
    }
    messageReceiver.addEventListener("envelope", queuedEventListener(onEnvelopeReceived, false));
    messageReceiver.addEventListener("message", queuedEventListener(onMessageReceived, false));
    messageReceiver.addEventListener("delivery", queuedEventListener(onDeliveryReceipt));
    messageReceiver.addEventListener("contact", queuedEventListener(onContactReceived));
    messageReceiver.addEventListener("contactSync", queuedEventListener(onContactSyncComplete));
    messageReceiver.addEventListener("group", queuedEventListener(onGroupReceived));
    messageReceiver.addEventListener("groupSync", queuedEventListener(onGroupSyncComplete));
    messageReceiver.addEventListener("sent", queuedEventListener(onSentMessage, false));
    messageReceiver.addEventListener("readSync", queuedEventListener(onReadSync));
    messageReceiver.addEventListener("viewSync", queuedEventListener(onViewSync));
    messageReceiver.addEventListener("read", queuedEventListener(onReadReceipt));
    messageReceiver.addEventListener("view", queuedEventListener(onViewReceipt));
    messageReceiver.addEventListener("error", queuedEventListener(onError, false));
    messageReceiver.addEventListener("decryption-error", queuedEventListener((event) => {
      onDecryptionErrorQueue.add(() => (0, import_handleRetry.onDecryptionError)(event));
    }));
    messageReceiver.addEventListener("retry-request", queuedEventListener((event) => {
      onRetryRequestQueue.add(() => (0, import_handleRetry.onRetryRequest)(event));
    }));
    messageReceiver.addEventListener("empty", queuedEventListener(onEmpty));
    messageReceiver.addEventListener("configuration", queuedEventListener(onConfiguration));
    messageReceiver.addEventListener("typing", queuedEventListener(onTyping));
    messageReceiver.addEventListener("sticker-pack", queuedEventListener(onStickerPack));
    messageReceiver.addEventListener("viewOnceOpenSync", queuedEventListener(onViewOnceOpenSync));
    messageReceiver.addEventListener("messageRequestResponse", queuedEventListener(onMessageRequestResponse));
    messageReceiver.addEventListener("profileKeyUpdate", queuedEventListener(onProfileKeyUpdate));
    messageReceiver.addEventListener("fetchLatest", queuedEventListener(onFetchLatestSync));
    messageReceiver.addEventListener("keys", queuedEventListener(onKeysSync));
    messageReceiver.addEventListener("pniIdentity", queuedEventListener(onPNIIdentitySync));
  });
  import_ourProfileKey.ourProfileKeyService.initialize(window.storage);
  window.storage.onready(() => {
    if (!window.storage.get("defaultConversationColor")) {
      window.storage.put("defaultConversationColor", import_Colors.DEFAULT_CONVERSATION_COLOR);
    }
  });
  let resolveOnAppView;
  const onAppView = new Promise((resolve) => {
    resolveOnAppView = resolve;
  });
  const reconnectBackOff = new import_BackOff.BackOff(import_BackOff.FIBONACCI_TIMEOUTS);
  window.storage.onready(() => {
    (0, import_assert.strictAssert)(server, "WebAPI not ready");
    import_senderCertificate.senderCertificateService.initialize({
      server,
      navigator,
      onlineEventTarget: window,
      storage: window.storage
    });
    import_areWeASubscriber.areWeASubscriberService.update(window.storage, server);
  });
  const eventHandlerQueue = new window.PQueue({
    concurrency: 1,
    timeout: 1e3 * 60 * 2
  });
  const profileKeyResponseQueue = new window.PQueue();
  profileKeyResponseQueue.pause();
  const lightSessionResetQueue = new window.PQueue();
  window.Signal.Services.lightSessionResetQueue = lightSessionResetQueue;
  lightSessionResetQueue.pause();
  const onDecryptionErrorQueue = new window.PQueue();
  onDecryptionErrorQueue.pause();
  const onRetryRequestQueue = new window.PQueue();
  onRetryRequestQueue.pause();
  window.Whisper.deliveryReceiptQueue = new window.PQueue({
    concurrency: 1,
    timeout: 1e3 * 60 * 2
  });
  window.Whisper.deliveryReceiptQueue.pause();
  window.Whisper.deliveryReceiptBatcher = window.Signal.Util.createBatcher({
    name: "Whisper.deliveryReceiptBatcher",
    wait: 500,
    maxSize: 100,
    processBatch: async (deliveryReceipts) => {
      await import_deliveryReceiptsJobQueue.deliveryReceiptsJobQueue.add({ deliveryReceipts });
    }
  });
  if (window.platform === "darwin") {
    window.addEventListener("dblclick", (event) => {
      const target = event.target;
      if ((0, import_isWindowDragElement.isWindowDragElement)(target)) {
        window.titleBarDoubleClick();
      }
    });
  }
  document.body.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, false);
  document.body.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, false);
  (0, import_startInteractionMode.startInteractionMode)();
  window.preloadedImages = [];
  function preload(list) {
    for (let index = 0, max = list.length; index < max; index += 1) {
      const image = new Image();
      image.src = `./images/${list[index]}`;
      window.preloadedImages.push(image);
    }
  }
  const builtInImages = await window.getBuiltInImages();
  preload(builtInImages);
  window.setImmediate = window.nodeSetImmediate;
  const { Message } = window.Signal.Types;
  const {
    upgradeMessageSchema,
    writeNewAttachmentData,
    deleteAttachmentData,
    doesAttachmentExist
  } = window.Signal.Migrations;
  log.info("background page reloaded");
  log.info("environment:", window.getEnvironment());
  let newVersion = false;
  let lastVersion;
  window.document.title = window.getTitle();
  document.documentElement.setAttribute("lang", window.getLocale().substring(0, 2));
  KeyChangeListener.init(window.textsecure.storage.protocol);
  window.textsecure.storage.protocol.on("removePreKey", (ourUuid) => {
    const uuidKind = window.textsecure.storage.user.getOurUuidKind(ourUuid);
    window.getAccountManager().refreshPreKeys(uuidKind);
  });
  window.getSocketStatus = () => {
    if (server === void 0) {
      return import_SocketStatus.SocketStatus.CLOSED;
    }
    return server.getSocketStatus();
  };
  let accountManager;
  window.getAccountManager = () => {
    if (accountManager) {
      return accountManager;
    }
    if (!server) {
      throw new Error("getAccountManager: server is not available!");
    }
    accountManager = new window.textsecure.AccountManager(server);
    accountManager.addEventListener("registration", () => {
      window.Whisper.events.trigger("userChanged", false);
      window.Signal.Util.Registration.markDone();
      log.info("dispatching registration event");
      window.Whisper.events.trigger("registration_done");
    });
    return accountManager;
  };
  const cancelInitializationMessage = (0, import_setAppLoadingScreenMessage.setAppLoadingScreenMessage)(void 0, window.i18n);
  const version = await window.Signal.Data.getItemById("version");
  if (!version) {
    const isIndexedDBPresent = await indexedDb.doesDatabaseExist();
    if (isIndexedDBPresent) {
      log.info("Found IndexedDB database.");
      try {
        log.info("Confirming deletion of old data with user...");
        try {
          await new Promise((resolve, reject) => {
            window.showConfirmationDialog({
              onTopOfEverything: true,
              cancelText: window.i18n("quit"),
              confirmStyle: "negative",
              message: window.i18n("deleteOldIndexedDBData"),
              okText: window.i18n("deleteOldData"),
              reject: () => reject(),
              resolve: () => resolve()
            });
          });
        } catch (error) {
          log.info("User chose not to delete old data. Shutting down.", error && error.stack ? error.stack : error);
          window.shutdown();
          return;
        }
        log.info("Deleting all previously-migrated data in SQL...");
        log.info("Deleting IndexedDB file...");
        await Promise.all([
          indexedDb.removeDatabase(),
          window.Signal.Data.removeAll(),
          window.Signal.Data.removeIndexedDBFiles()
        ]);
        log.info("Done with SQL deletion and IndexedDB file deletion.");
      } catch (error) {
        log.error("Failed to remove IndexedDB file or remove SQL data:", error && error.stack ? error.stack : error);
      }
      await window.Signal.Data.createOrUpdateItem({
        id: "indexeddb-delete-needed",
        value: true
      });
    }
  }
  log.info("Storage fetch");
  window.storage.fetch();
  function mapOldThemeToNew(theme) {
    switch (theme) {
      case "dark":
      case "light":
      case "system":
        return theme;
      case "android-dark":
        return "dark";
      case "android":
      case "ios":
      default:
        return "light";
    }
  }
  let first = true;
  window.storage.onready(async () => {
    if (!first) {
      return;
    }
    first = false;
    (0, import_assert.strictAssert)(server !== void 0, "WebAPI not ready");
    cleanupSessionResets();
    window.Events = (0, import_createIPCEvents.createIPCEvents)({
      shutdown: async () => {
        log.info("background/shutdown");
        window.Signal.Util.flushMessageCounter();
        AttachmentDownloads.stop();
        idleDetector.stop();
        if (messageReceiver) {
          (0, import_assert.strictAssert)(server !== void 0, "WebAPI should be initialized together with MessageReceiver");
          log.info("background/shutdown: shutting down messageReceiver");
          server.unregisterRequestHandler(messageReceiver);
          messageReceiver.stopProcessing();
          await window.waitForAllBatchers();
        }
        log.info("background/shutdown: flushing conversations");
        await Promise.all(window.ConversationController.getAll().map((convo) => convo.flushDebouncedUpdates()));
        log.info("background/shutdown: waiting for all batchers");
        await Promise.all([
          window.waitForAllBatchers(),
          window.waitForAllWaitBatchers()
        ]);
        log.info("background/shutdown: closing the database");
        await window.Signal.Data.shutdown();
      }
    });
    const zoomFactor = window.Events.getZoomFactor();
    import_electron.webFrame.setZoomFactor(zoomFactor);
    document.body.style.setProperty("--zoom-factor", zoomFactor.toString());
    window.addEventListener("resize", () => {
      document.body.style.setProperty("--zoom-factor", import_electron.webFrame.getZoomFactor().toString());
    });
    const lastHeartbeat = (0, import_timestamp.toDayMillis)(window.storage.get("lastHeartbeat", 0));
    const previousLastStartup = window.storage.get("lastStartup");
    await window.storage.put("lastStartup", Date.now());
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1e3;
    if (lastHeartbeat > 0 && (0, import_timestamp.isOlderThan)(lastHeartbeat, THIRTY_DAYS)) {
      log.warn(`This instance has not been used for 30 days. Last heartbeat: ${lastHeartbeat}. Last startup: ${previousLastStartup}.`);
      await unlinkAndDisconnect(import_RemoveAllConfiguration.RemoveAllConfiguration.Soft);
    }
    window.storage.put("lastHeartbeat", (0, import_timestamp.toDayMillis)(Date.now()));
    const TWELVE_HOURS = 12 * 60 * 60 * 1e3;
    setInterval(() => window.storage.put("lastHeartbeat", (0, import_timestamp.toDayMillis)(Date.now())), TWELVE_HOURS);
    const currentVersion = window.getVersion();
    lastVersion = window.storage.get("version");
    newVersion = !lastVersion || currentVersion !== lastVersion;
    await window.storage.put("version", currentVersion);
    if (newVersion && lastVersion) {
      log.info(`New version detected: ${currentVersion}; previous: ${lastVersion}`);
      const remoteBuildExpiration = window.storage.get("remoteBuildExpiration");
      if (remoteBuildExpiration) {
        log.info(`Clearing remoteBuildExpiration. Previous value was ${remoteBuildExpiration}`);
        window.storage.remove("remoteBuildExpiration");
      }
      if (window.isBeforeVersion(lastVersion, "v1.29.2-beta.1")) {
        await Promise.all([
          window.storage.put("showStickersIntroduction", true),
          window.storage.put("showStickerPickerHint", true)
        ]);
      }
      if (window.isBeforeVersion(lastVersion, "v1.26.0")) {
        await window.storage.put("hasRegisterSupportForUnauthenticatedDelivery", false);
      }
      const themeSetting = window.Events.getThemeSetting();
      const newThemeSetting = mapOldThemeToNew(themeSetting);
      if (window.isBeforeVersion(lastVersion, "v1.25.0")) {
        if (newThemeSetting === window.systemTheme) {
          window.Events.setThemeSetting("system");
        } else {
          window.Events.setThemeSetting(newThemeSetting);
        }
      }
      if (window.isBeforeVersion(lastVersion, "v1.36.0-beta.1") && window.isAfterVersion(lastVersion, "v1.35.0-beta.1")) {
        await window.Signal.Services.eraseAllStorageServiceState();
      }
      if (window.isBeforeVersion(lastVersion, "v5.2.0")) {
        const legacySenderCertificateStorageKey = "senderCertificateWithUuid";
        await import_removeStorageKeyJobQueue.removeStorageKeyJobQueue.add({
          key: legacySenderCertificateStorageKey
        });
      }
      if (window.isBeforeVersion(lastVersion, "v5.18.0")) {
        await window.storage.remove("senderCertificate");
        await window.storage.remove("senderCertificateNoE164");
      }
      if (window.isBeforeVersion(lastVersion, "v5.19.0")) {
        await window.storage.remove(import_groupCredentialFetcher.GROUP_CREDENTIALS_KEY);
      }
      if (window.isBeforeVersion(lastVersion, "v5.37.0-alpha")) {
        const legacyChallengeKey = "challenge:retry-message-ids";
        await import_removeStorageKeyJobQueue.removeStorageKeyJobQueue.add({
          key: legacyChallengeKey
        });
        await window.Signal.Data.clearAllErrorStickerPackAttempts();
      }
      if (window.isBeforeVersion(lastVersion, "v5.30.0-alpha")) {
        await (0, import_deleteAllLogs.deleteAllLogs)();
        window.restart();
        return;
      }
    }
    (0, import_setAppLoadingScreenMessage.setAppLoadingScreenMessage)(window.i18n("optimizingApplication"), window.i18n);
    if (newVersion) {
      try {
        await window.Signal.Data.cleanupOrphanedAttachments();
      } catch (error) {
        log.error("background: Failed to cleanup orphaned attachments:", error && error.stack ? error.stack : error);
      }
      window.Signal.Data.ensureFilePermissions();
    }
    try {
      await window.Signal.Data.startInRendererProcess();
    } catch (err) {
      log.error("SQL failed to initialize", err && err.stack ? err.stack : err);
    }
    (0, import_setAppLoadingScreenMessage.setAppLoadingScreenMessage)(window.i18n("loading"), window.i18n);
    let isMigrationWithIndexComplete = false;
    log.info(`Starting background data migration. Target version: ${Message.CURRENT_SCHEMA_VERSION}`);
    idleDetector.on("idle", async () => {
      const NUM_MESSAGES_PER_BATCH = 100;
      const BATCH_DELAY = 5 * durations.SECOND;
      if (!isMigrationWithIndexComplete) {
        const batchWithIndex = await (0, import_migrateMessageData.migrateMessageData)({
          numMessagesPerBatch: NUM_MESSAGES_PER_BATCH,
          upgradeMessageSchema,
          getMessagesNeedingUpgrade: window.Signal.Data.getMessagesNeedingUpgrade,
          saveMessages: window.Signal.Data.saveMessages
        });
        log.info("Upgrade message schema (with index):", batchWithIndex);
        isMigrationWithIndexComplete = batchWithIndex.done;
      }
      idleDetector.stop();
      if (isMigrationWithIndexComplete) {
        log.info("Background migration complete. Stopping idle detector.");
      } else {
        log.info("Background migration not complete. Pausing idle detector.");
        setTimeout(() => {
          idleDetector.start();
        }, BATCH_DELAY);
      }
    });
    window.Signal.RemoteConfig.initRemoteConfig(server);
    let retryReceiptLifespan;
    try {
      retryReceiptLifespan = (0, import_parseIntOrThrow.parseIntOrThrow)(window.Signal.RemoteConfig.getValue("desktop.retryReceiptLifespan"), "retryReceiptLifeSpan");
    } catch (error) {
      log.warn("Failed to parse integer out of desktop.retryReceiptLifespan feature flag");
    }
    const retryPlaceholders = new window.Signal.Util.RetryPlaceholders({
      retryReceiptLifespan
    });
    window.Signal.Services.retryPlaceholders = retryPlaceholders;
    setInterval(async () => {
      const now = Date.now();
      const HOUR = 1e3 * 60 * 60;
      const DAY = 24 * HOUR;
      let sentProtoMaxAge = 14 * DAY;
      try {
        sentProtoMaxAge = (0, import_parseIntOrThrow.parseIntOrThrow)(window.Signal.RemoteConfig.getValue("desktop.retryRespondMaxAge"), "retryRespondMaxAge");
      } catch (error) {
        log.warn("background/setInterval: Failed to parse integer from desktop.retryRespondMaxAge feature flag", error && error.stack ? error.stack : error);
      }
      try {
        await window.Signal.Data.deleteSentProtosOlderThan(now - sentProtoMaxAge);
      } catch (error) {
        log.error("background/onready/setInterval: Error deleting sent protos: ", error && error.stack ? error.stack : error);
      }
      try {
        const expired = await retryPlaceholders.getExpiredAndRemove();
        log.info(`retryPlaceholders/interval: Found ${expired.length} expired items`);
        expired.forEach((item) => {
          const { conversationId, senderUuid, sentAt } = item;
          const conversation = window.ConversationController.get(conversationId);
          if (conversation) {
            const receivedAt = Date.now();
            const receivedAtCounter = window.Signal.Util.incrementMessageCounter();
            conversation.queueJob("addDeliveryIssue", () => conversation.addDeliveryIssue({
              receivedAt,
              receivedAtCounter,
              senderUuid,
              sentAt
            }));
          }
        });
      } catch (error) {
        log.error("background/onready/setInterval: Error getting expired retry placeholders: ", error && error.stack ? error.stack : error);
      }
    }, FIVE_MINUTES);
    let mainWindowStats = {
      isMaximized: false,
      isFullScreen: false
    };
    let menuOptions = {
      development: false,
      devTools: false,
      includeSetup: false,
      isProduction: true,
      platform: "unknown"
    };
    try {
      await Promise.all([
        window.ConversationController.load(),
        Stickers.load(),
        (0, import_loadRecentEmojis.loadRecentEmojis)(),
        loadInitialBadgesState(),
        (0, import_storyLoader.loadStories)(),
        window.textsecure.storage.protocol.hydrateCaches(),
        (async () => {
          mainWindowStats = await window.SignalContext.getMainWindowStats();
        })(),
        (async () => {
          menuOptions = await window.SignalContext.getMenuOptions();
        })()
      ]);
      await window.ConversationController.checkForConflicts();
    } catch (error) {
      log.error("background.js: ConversationController failed to load:", error && error.stack ? error.stack : error);
    } finally {
      initializeRedux({ mainWindowStats, menuOptions });
      start();
      window.Signal.Services.initializeNetworkObserver(window.reduxActions.network);
      window.Signal.Services.initializeUpdateListener(window.reduxActions.updates);
      window.Signal.Services.calling.initialize(window.reduxActions.calling, window.getSfuUrl());
      window.reduxActions.expiration.hydrateExpirationStatus(window.Signal.Util.hasExpired());
    }
  });
  function initializeRedux({
    mainWindowStats,
    menuOptions
  }) {
    const convoCollection = window.getConversations();
    const initialState = (0, import_getInitialState.getInitialState)({
      badges: initialBadgesState,
      stories: (0, import_storyLoader.getStoriesForRedux)(),
      mainWindowStats,
      menuOptions
    });
    const store = window.Signal.State.createStore(initialState);
    window.reduxStore = store;
    window.reduxActions = {
      accounts: (0, import_redux.bindActionCreators)(import_actions.actionCreators.accounts, store.dispatch),
      app: (0, import_redux.bindActionCreators)(import_actions.actionCreators.app, store.dispatch),
      audioPlayer: (0, import_redux.bindActionCreators)(import_actions.actionCreators.audioPlayer, store.dispatch),
      audioRecorder: (0, import_redux.bindActionCreators)(import_actions.actionCreators.audioRecorder, store.dispatch),
      badges: (0, import_redux.bindActionCreators)(import_actions.actionCreators.badges, store.dispatch),
      calling: (0, import_redux.bindActionCreators)(import_actions.actionCreators.calling, store.dispatch),
      composer: (0, import_redux.bindActionCreators)(import_actions.actionCreators.composer, store.dispatch),
      conversations: (0, import_redux.bindActionCreators)(import_actions.actionCreators.conversations, store.dispatch),
      crashReports: (0, import_redux.bindActionCreators)(import_actions.actionCreators.crashReports, store.dispatch),
      emojis: (0, import_redux.bindActionCreators)(import_actions.actionCreators.emojis, store.dispatch),
      expiration: (0, import_redux.bindActionCreators)(import_actions.actionCreators.expiration, store.dispatch),
      globalModals: (0, import_redux.bindActionCreators)(import_actions.actionCreators.globalModals, store.dispatch),
      items: (0, import_redux.bindActionCreators)(import_actions.actionCreators.items, store.dispatch),
      linkPreviews: (0, import_redux.bindActionCreators)(import_actions.actionCreators.linkPreviews, store.dispatch),
      network: (0, import_redux.bindActionCreators)(import_actions.actionCreators.network, store.dispatch),
      safetyNumber: (0, import_redux.bindActionCreators)(import_actions.actionCreators.safetyNumber, store.dispatch),
      search: (0, import_redux.bindActionCreators)(import_actions.actionCreators.search, store.dispatch),
      stickers: (0, import_redux.bindActionCreators)(import_actions.actionCreators.stickers, store.dispatch),
      stories: (0, import_redux.bindActionCreators)(import_actions.actionCreators.stories, store.dispatch),
      updates: (0, import_redux.bindActionCreators)(import_actions.actionCreators.updates, store.dispatch),
      user: (0, import_redux.bindActionCreators)(import_actions.actionCreators.user, store.dispatch)
    };
    const {
      conversationAdded,
      conversationChanged,
      conversationRemoved,
      removeAllConversations
    } = window.reduxActions.conversations;
    convoCollection.on("remove", (conversation) => {
      const { id } = conversation || {};
      conversation.trigger("unload", "removed");
      conversationRemoved(id);
    });
    convoCollection.on("add", (conversation) => {
      if (!conversation) {
        return;
      }
      conversationAdded(conversation.id, conversation.format());
    });
    const changedConvoBatcher = (0, import_batcher.createBatcher)({
      name: "changedConvoBatcher",
      processBatch(batch) {
        const deduped = new Set(batch);
        log.info(`changedConvoBatcher: deduped ${batch.length} into ${deduped.size}`);
        (0, import_react_redux.batch)(() => {
          deduped.forEach((conversation) => {
            conversationChanged(conversation.id, conversation.format());
          });
        });
      },
      wait: 1,
      maxSize: Infinity
    });
    convoCollection.on("props-change", (conversation, isBatched) => {
      if (!conversation) {
        return;
      }
      if (isBatched) {
        changedConvoBatcher.removeAll(conversation);
        conversationChanged(conversation.id, conversation.format());
        return;
      }
      changedConvoBatcher.add(conversation);
    });
    convoCollection.on("reset", removeAllConversations);
    window.Whisper.events.on("userChanged", (reconnect = false) => {
      const newDeviceId = window.textsecure.storage.user.getDeviceId();
      const newNumber = window.textsecure.storage.user.getNumber();
      const newUuid = window.textsecure.storage.user.getUuid()?.toString();
      const ourConversation = window.ConversationController.getOurConversation();
      if (ourConversation?.get("e164") !== newNumber) {
        ourConversation?.set("e164", newNumber);
      }
      window.reduxActions.user.userChanged({
        ourConversationId: ourConversation?.get("id"),
        ourDeviceId: newDeviceId,
        ourNumber: newNumber,
        ourUuid: newUuid,
        regionCode: window.storage.get("regionCode")
      });
      if (reconnect) {
        log.info("background: reconnecting websocket on user change");
        enqueueReconnectToWebSocket();
      }
    });
    window.Whisper.events.on("setWindowStats", ({
      isFullScreen,
      isMaximized
    }) => {
      window.reduxActions.user.userChanged({
        isMainWindowMaximized: isMaximized,
        isMainWindowFullScreen: isFullScreen
      });
    });
    window.Whisper.events.on("setMenuOptions", (options) => {
      window.reduxActions.user.userChanged({ menuOptions: options });
    });
    let shortcutGuideView = null;
    window.showKeyboardShortcuts = () => {
      if (!shortcutGuideView) {
        shortcutGuideView = new import_ReactWrapperView.ReactWrapperView({
          className: "shortcut-guide-wrapper",
          JSX: window.Signal.State.Roots.createShortcutGuideModal(window.reduxStore, {
            close: () => {
              if (shortcutGuideView) {
                shortcutGuideView.remove();
                shortcutGuideView = null;
              }
            }
          }),
          onClose: () => {
            shortcutGuideView = null;
          }
        });
      }
    };
    document.addEventListener("keydown", (event) => {
      const { ctrlKey, metaKey, shiftKey } = event;
      const commandKey = window.platform === "darwin" && metaKey;
      const controlKey = window.platform !== "darwin" && ctrlKey;
      const commandOrCtrl = commandKey || controlKey;
      const state = store.getState();
      const selectedId = state.conversations.selectedConversationId;
      const conversation = window.ConversationController.get(selectedId);
      const key = KeyboardLayout.lookup(event);
      if (commandOrCtrl && key === "/") {
        window.showKeyboardShortcuts();
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      if (commandOrCtrl && !shiftKey && (key === "t" || key === "T")) {
        window.enterKeyboardMode();
        const focusedElement = document.activeElement;
        const targets = [
          document.querySelector(".module-main-header .module-avatar-button"),
          document.querySelector(".module-left-pane__header__contents__back-button"),
          document.querySelector(".LeftPaneSearchInput__input"),
          document.querySelector(".module-main-header__compose-icon"),
          document.querySelector(".module-left-pane__compose-search-form__input"),
          document.querySelector(".module-conversation-list__item--contact-or-conversation"),
          document.querySelector(".module-search-results"),
          document.querySelector(".CompositionArea .ql-editor")
        ];
        const focusedIndex = targets.findIndex((target) => {
          if (!target || !focusedElement) {
            return false;
          }
          if (target === focusedElement) {
            return true;
          }
          if (target.contains(focusedElement)) {
            return true;
          }
          return false;
        });
        const lastIndex = targets.length - 1;
        let index;
        if (focusedIndex < 0 || focusedIndex >= lastIndex) {
          index = 0;
        } else {
          index = focusedIndex + 1;
        }
        while (!targets[index]) {
          index += 1;
          if (index > lastIndex) {
            index = 0;
          }
        }
        targets[index].focus();
      }
      if (shortcutGuideView && key === "Escape") {
        shortcutGuideView.remove();
        shortcutGuideView = null;
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (key === "Escape") {
        const target = document.activeElement;
        if (target && target.attributes && target.attributes.class && target.attributes.class.value) {
          const className = target.attributes.class.value;
          if (className.includes("LeftPaneSearchInput__input")) {
            return;
          }
        }
        const confirmationModal = document.querySelector(".module-confirmation-dialog__overlay");
        if (confirmationModal) {
          return;
        }
        const emojiPicker = document.querySelector(".module-emoji-picker");
        if (emojiPicker) {
          return;
        }
        const lightBox = document.querySelector(".Lightbox");
        if (lightBox) {
          return;
        }
        const stickerPicker = document.querySelector(".module-sticker-picker");
        if (stickerPicker) {
          return;
        }
        const stickerPreview = document.querySelector(".module-sticker-manager__preview-modal__overlay");
        if (stickerPreview) {
          return;
        }
        const reactionViewer = document.querySelector(".module-reaction-viewer");
        if (reactionViewer) {
          return;
        }
        const reactionPicker = document.querySelector(".module-ReactionPicker");
        if (reactionPicker) {
          return;
        }
        const contactModal = document.querySelector(".module-contact-modal");
        if (contactModal) {
          return;
        }
        const modalHost = document.querySelector(".module-modal-host__overlay");
        if (modalHost) {
          return;
        }
      }
      if (conversation && key === "Escape") {
        conversation.trigger("escape-pressed");
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "l" || key === "L")) {
        const button = document.querySelector(".module-ConversationHeader__button--more");
        if (!button) {
          return;
        }
        const { x, y, width, height } = button.getBoundingClientRect();
        const mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("click", true, false, null, null, 0, 0, x + width / 2, y + height / 2, false, false, false, false, false, document.body);
        button.dispatchEvent(mouseEvent);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "t" || key === "T")) {
        conversation.trigger("focus-composer");
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "m" || key === "M")) {
        conversation.trigger("open-all-media");
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && !conversation.get("isArchived") && commandOrCtrl && shiftKey && (key === "a" || key === "A")) {
        conversation.setArchived(true);
        conversation.trigger("unload", "keyboard shortcut archive");
        (0, import_showToast.showToast)(import_ToastConversationArchived.ToastConversationArchived, {
          undo: () => {
            conversation.setArchived(false);
            window.Whisper.events.trigger("showConversation", conversation.get("id"));
          }
        });
        if (document.activeElement === document.body) {
          const leftPaneEl = document.querySelector(".module-left-pane__list");
          if (leftPaneEl) {
            leftPaneEl.focus();
          }
        }
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && conversation.get("isArchived") && commandOrCtrl && shiftKey && (key === "u" || key === "U")) {
        conversation.setArchived(false);
        (0, import_showToast.showToast)(import_ToastConversationUnarchived.ToastConversationUnarchived);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "c" || key === "C")) {
        conversation.trigger("unload", "keyboard shortcut close");
        window.reduxActions.conversations.showConversation({
          conversationId: void 0,
          messageId: void 0
        });
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && !shiftKey && (key === "d" || key === "D")) {
        const { selectedMessage } = state.conversations;
        if (!selectedMessage) {
          return;
        }
        conversation.trigger("show-message-details", selectedMessage);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "r" || key === "R")) {
        const { selectedMessage } = state.conversations;
        conversation.trigger("toggle-reply", selectedMessage);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && !shiftKey && (key === "s" || key === "S")) {
        const { selectedMessage } = state.conversations;
        if (selectedMessage) {
          conversation.trigger("save-attachment", selectedMessage);
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "d" || key === "D")) {
        const { selectedMessage } = state.conversations;
        if (selectedMessage) {
          conversation.trigger("delete-message", selectedMessage);
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }
      if (conversation && commandOrCtrl && !shiftKey && (key === "p" || key === "P")) {
        conversation.trigger("remove-link-review");
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (conversation && commandOrCtrl && shiftKey && (key === "p" || key === "P")) {
        conversation.trigger("remove-all-draft-attachments");
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
  window.Whisper.events.on("setupAsNewDevice", () => {
    window.reduxActions.app.openInstaller();
  });
  window.Whisper.events.on("setupAsStandalone", () => {
    window.reduxActions.app.openStandalone();
  });
  window.Whisper.events.on("powerMonitorSuspend", () => {
    log.info("powerMonitor: suspend");
    (0, import_TaskWithTimeout.suspendTasksWithTimeout)();
  });
  window.Whisper.events.on("powerMonitorResume", () => {
    log.info("powerMonitor: resume");
    server?.checkSockets();
    (0, import_TaskWithTimeout.resumeTasksWithTimeout)();
  });
  window.Whisper.events.on("powerMonitorLockScreen", () => {
    window.reduxActions.calling.hangUpActiveCall();
  });
  const reconnectToWebSocketQueue = new import_LatestQueue.LatestQueue();
  const enqueueReconnectToWebSocket = /* @__PURE__ */ __name(() => {
    reconnectToWebSocketQueue.add(async () => {
      if (!server) {
        log.info("reconnectToWebSocket: No server. Early return.");
        return;
      }
      log.info("reconnectToWebSocket starting...");
      await server.onOffline();
      await server.onOnline();
      log.info("reconnectToWebSocket complete.");
    });
  }, "enqueueReconnectToWebSocket");
  window.Whisper.events.on("mightBeUnlinked", window._.debounce(enqueueReconnectToWebSocket, 1e3, { maxWait: 5e3 }));
  window.Whisper.events.on("unlinkAndDisconnect", () => {
    unlinkAndDisconnect(import_RemoveAllConfiguration.RemoveAllConfiguration.Full);
  });
  async function runStorageService() {
    window.Signal.Services.enableStorageService();
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("background/runStorageService: We are primary device; not sending key sync request");
      return;
    }
    try {
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestKeySyncMessage());
    } catch (error) {
      log.error("runStorageService: Failed to queue sync message", Errors.toLogFormat(error));
    }
  }
  async function start() {
    (0, import_assert.strictAssert)(challengeHandler, "start: challengeHandler");
    await challengeHandler.load();
    if (!window.storage.user.getNumber()) {
      const ourConversation = window.ConversationController.getOurConversation();
      const ourE164 = ourConversation?.get("e164");
      if (ourE164) {
        log.warn("Restoring E164 from our conversation");
        window.storage.user.setNumber(ourE164);
      }
    }
    if (newVersion && lastVersion) {
      if (window.isBeforeVersion(lastVersion, "v5.31.0")) {
        window.ConversationController.repairPinnedConversations();
      }
    }
    window.dispatchEvent(new Event("storage_ready"));
    import_badgeImageFileDownloader.badgeImageFileDownloader.checkForFilesToDownload();
    log.info("Expiration start timestamp cleanup: starting...");
    const messagesUnexpectedlyMissingExpirationStartTimestamp = await window.Signal.Data.getMessagesUnexpectedlyMissingExpirationStartTimestamp();
    log.info(`Expiration start timestamp cleanup: Found ${messagesUnexpectedlyMissingExpirationStartTimestamp.length} messages for cleanup`);
    if (!window.textsecure.storage.user.getUuid()) {
      log.info("Expiration start timestamp cleanup: Cancelling update; we don't have our own UUID");
    } else if (messagesUnexpectedlyMissingExpirationStartTimestamp.length) {
      const newMessageAttributes = messagesUnexpectedlyMissingExpirationStartTimestamp.map((message) => {
        const expirationStartTimestamp = Math.min(...(0, import_iterables.filter)([
          message.sent_at,
          Date.now(),
          message.expirationStartTimestamp
        ], import_isNotNil.isNotNil));
        log.info(`Expiration start timestamp cleanup: starting timer for ${message.type} message sent at ${message.sent_at}. Starting timer at ${expirationStartTimestamp}`);
        return {
          ...message,
          expirationStartTimestamp
        };
      });
      await window.Signal.Data.saveMessages(newMessageAttributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
    log.info("Expiration start timestamp cleanup: complete");
    log.info("listening for registration events");
    window.Whisper.events.on("registration_done", () => {
      log.info("handling registration event");
      (0, import_assert.strictAssert)(server !== void 0, "WebAPI not ready");
      server.authenticate(window.textsecure.storage.user.getWebAPICredentials());
      connect(true);
    });
    cancelInitializationMessage();
    (0, import_react_dom.render)(window.Signal.State.Roots.createApp(window.reduxStore), document.getElementById("app-container"));
    const hideMenuBar = window.storage.get("hide-menu-bar", false);
    window.setAutoHideMenuBar(hideMenuBar);
    window.setMenuBarVisibility(!hideMenuBar);
    (0, import_startTimeTravelDetector.startTimeTravelDetector)(() => {
      window.Whisper.events.trigger("timetravel");
    });
    import_expiringMessagesDeletion.expiringMessagesDeletionService.update();
    import_tapToViewMessagesDeletionService.tapToViewMessagesDeletionService.update();
    window.Whisper.events.on("timetravel", () => {
      import_expiringMessagesDeletion.expiringMessagesDeletionService.update();
      import_tapToViewMessagesDeletionService.tapToViewMessagesDeletionService.update();
    });
    const isCoreDataValid = Boolean(window.textsecure.storage.user.getUuid() && window.ConversationController.getOurConversation());
    if (isCoreDataValid && window.Signal.Util.Registration.everDone()) {
      connect();
      window.reduxActions.app.openInbox();
    } else {
      window.reduxActions.app.openInstaller();
    }
    window.registerForActive(() => import_notifications.notificationService.clear());
    window.addEventListener("unload", () => import_notifications.notificationService.fastClear());
    import_notifications.notificationService.on("click", (id, messageId) => {
      window.showWindow();
      if (id) {
        window.Whisper.events.trigger("showConversation", id, messageId);
      } else {
        window.reduxActions.app.openInbox();
      }
    });
    window.registerForActive(async () => {
      (0, import_assert.strictAssert)(server !== void 0, "WebAPI not ready");
      try {
        await window.Signal.RemoteConfig.maybeRefreshRemoteConfig(server);
      } catch (error) {
        if (error instanceof import_Errors.HTTPError) {
          log.warn(`registerForActive: Failed to to refresh remote config. Code: ${error.code}`);
          return;
        }
        throw error;
      }
    });
    window.Signal.RemoteConfig.onChange("desktop.clientExpiration", ({ value }) => {
      const remoteBuildExpirationTimestamp = window.Signal.Util.parseRemoteClientExpiration(value);
      if (remoteBuildExpirationTimestamp) {
        window.storage.put("remoteBuildExpiration", remoteBuildExpirationTimestamp);
        window.reduxActions.expiration.hydrateExpirationStatus(window.Signal.Util.hasExpired());
      }
    });
    const removeMessageRequestListener = window.Signal.RemoteConfig.onChange("desktop.messageRequests", ({ enabled }) => {
      if (!enabled) {
        return;
      }
      const conversations = window.getConversations();
      conversations.forEach((conversation) => {
        conversation.set({
          messageCountBeforeMessageRequests: conversation.get("messageCount") || 0
        });
        window.Signal.Data.updateConversation(conversation.attributes);
      });
      removeMessageRequestListener();
    });
    if (resolveOnAppView) {
      resolveOnAppView();
      resolveOnAppView = void 0;
    }
  }
  window.getSyncRequest = (timeoutMillis) => {
    (0, import_assert.strictAssert)(messageReceiver, "MessageReceiver not initialized");
    const syncRequest = new window.textsecure.SyncRequest(messageReceiver, timeoutMillis);
    syncRequest.start();
    return syncRequest;
  };
  let disconnectTimer;
  let reconnectTimer;
  function onOffline() {
    log.info("offline");
    window.removeEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    disconnectTimer = Timers.setTimeout(disconnect, 1e3);
    if (challengeHandler) {
      challengeHandler.onOffline();
    }
  }
  function onOnline() {
    log.info("online");
    window.removeEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    if (disconnectTimer && isSocketOnline()) {
      log.warn("Already online. Had a blip in online/offline status.");
      Timers.clearTimeout(disconnectTimer);
      disconnectTimer = void 0;
      return;
    }
    if (disconnectTimer) {
      Timers.clearTimeout(disconnectTimer);
      disconnectTimer = void 0;
    }
    connect();
  }
  function isSocketOnline() {
    const socketStatus = window.getSocketStatus();
    return socketStatus === import_SocketStatus.SocketStatus.CONNECTING || socketStatus === import_SocketStatus.SocketStatus.OPEN;
  }
  async function disconnect() {
    log.info("disconnect");
    disconnectTimer = void 0;
    AttachmentDownloads.stop();
    if (server !== void 0) {
      (0, import_assert.strictAssert)(messageReceiver !== void 0, "WebAPI should be initialized together with MessageReceiver");
      await server.onOffline();
      await messageReceiver.drain();
    }
  }
  let isInitialSync = false;
  let connectCount = 0;
  let connecting = false;
  async function connect(firstRun) {
    if (connecting) {
      log.warn("connect already running", { connectCount });
      return;
    }
    (0, import_assert.strictAssert)(server !== void 0, "WebAPI not connected");
    try {
      connecting = true;
      isInitialSync = false;
      log.info("connect", { firstRun, connectCount });
      if (reconnectTimer) {
        Timers.clearTimeout(reconnectTimer);
        reconnectTimer = void 0;
      }
      if (connectCount === 0 && navigator.onLine) {
        window.addEventListener("offline", onOffline);
      }
      if (connectCount === 0 && !navigator.onLine) {
        log.warn("Starting up offline; will connect when we have network access");
        window.addEventListener("online", onOnline);
        onEmpty();
        return;
      }
      if (!window.Signal.Util.Registration.everDone()) {
        return;
      }
      window.textsecure.messaging = new window.textsecure.MessageSender(server);
      const profileKey = await import_ourProfileKey.ourProfileKeyService.get();
      if (firstRun && profileKey) {
        const me = window.ConversationController.getOurConversation();
        (0, import_assert.strictAssert)(me !== void 0, "Didn't find newly created ourselves");
        await me.setProfileKey(Bytes.toBase64(profileKey));
      }
      if (connectCount === 0) {
        try {
          await window.Signal.RemoteConfig.refreshRemoteConfig(server);
          const expiration = window.Signal.RemoteConfig.getValue("desktop.clientExpiration");
          if (expiration) {
            const remoteBuildExpirationTimestamp = window.Signal.Util.parseRemoteClientExpiration(expiration);
            if (remoteBuildExpirationTimestamp) {
              window.storage.put("remoteBuildExpiration", remoteBuildExpirationTimestamp);
              window.reduxActions.expiration.hydrateExpirationStatus(window.Signal.Util.hasExpired());
            }
          }
        } catch (error) {
          log.error("connect: Error refreshing remote config:", error && error.stack ? error.stack : error);
        }
        try {
          const lonelyE164Conversations = window.getConversations().filter((c) => Boolean((0, import_whatTypeOfConversation.isDirectConversation)(c.attributes) && c.get("e164") && !c.get("uuid") && !c.isEverUnregistered()));
          await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
            conversationController: window.ConversationController,
            conversations: lonelyE164Conversations,
            messaging: window.textsecure.messaging
          });
        } catch (error) {
          log.error("connect: Error fetching UUIDs for lonely e164s:", error && error.stack ? error.stack : error);
        }
      }
      connectCount += 1;
      profileKeyResponseQueue.pause();
      lightSessionResetQueue.pause();
      onDecryptionErrorQueue.pause();
      onRetryRequestQueue.pause();
      window.Whisper.deliveryReceiptQueue.pause();
      import_notifications.notificationService.disable();
      window.Signal.Services.initializeGroupCredentialFetcher();
      (0, import_assert.strictAssert)(server !== void 0, "WebAPI not initialized");
      (0, import_assert.strictAssert)(messageReceiver !== void 0, "MessageReceiver not initialized");
      messageReceiver.reset();
      server.registerRequestHandler(messageReceiver);
      await server.onOnline();
      AttachmentDownloads.start({
        logger: log
      });
      if (connectCount === 1) {
        Stickers.downloadQueuedPacks();
        if (!newVersion) {
          runStorageService();
        }
      }
      if (!firstRun && connectCount === 1 && newVersion && window.textsecure.storage.user.getDeviceId() !== 1) {
        log.info("Boot after upgrading. Requesting contact sync");
        window.getSyncRequest();
        runStorageService();
        try {
          const manager = window.getAccountManager();
          await Promise.all([
            manager.maybeUpdateDeviceName(),
            window.textsecure.storage.user.removeSignalingKey()
          ]);
        } catch (e) {
          log.error("Problem with account manager updates after starting new version: ", e && e.stack ? e.stack : e);
        }
      }
      const udSupportKey = "hasRegisterSupportForUnauthenticatedDelivery";
      if (!window.storage.get(udSupportKey)) {
        try {
          await server.registerSupportForUnauthenticatedDelivery();
          window.storage.put(udSupportKey, true);
        } catch (error) {
          log.error("Error: Unable to register for unauthenticated delivery support.", error && error.stack ? error.stack : error);
        }
      }
      const deviceId = window.textsecure.storage.user.getDeviceId();
      if (!window.textsecure.storage.user.getUuid()) {
        log.error("UUID not captured during registration, unlinking");
        return unlinkAndDisconnect(import_RemoveAllConfiguration.RemoveAllConfiguration.Full);
      }
      if (!window.textsecure.storage.user.getUuid(import_UUID.UUIDKind.PNI)) {
        log.info("PNI not captured during registration, fetching");
        const { pni } = await server.whoami();
        if (!pni) {
          log.error("No PNI found, unlinking");
          return unlinkAndDisconnect(import_RemoveAllConfiguration.RemoveAllConfiguration.Soft);
        }
        log.info("Setting PNI to", pni);
        await window.textsecure.storage.user.setPni(pni);
      }
      if (connectCount === 1) {
        try {
          await Promise.all([
            server.registerCapabilities({
              announcementGroup: true,
              giftBadges: true,
              "gv2-3": true,
              "gv1-migration": true,
              senderKey: true,
              changeNumber: true,
              stories: true
            }),
            (0, import_updateOurUsername.updateOurUsername)()
          ]);
        } catch (error) {
          log.error("Error: Unable to register our capabilities.", error && error.stack ? error.stack : error);
        }
      }
      if (firstRun === true && deviceId !== 1) {
        const hasThemeSetting = Boolean(window.storage.get("theme-setting"));
        if (!hasThemeSetting && window.textsecure.storage.get("userAgent") === "OWI") {
          window.storage.put("theme-setting", await window.Events.getThemeSetting());
          (0, import_themeChanged.themeChanged)();
        }
        const waitForEvent = (0, import_TaskWithTimeout.default)((event) => {
          const { promise, resolve } = (0, import_explodePromise.explodePromise)();
          window.Whisper.events.once(event, () => resolve());
          return promise;
        }, "firstRun:waitForEvent");
        let storageServiceSyncComplete;
        if (window.ConversationController.areWePrimaryDevice()) {
          storageServiceSyncComplete = Promise.resolve();
        } else {
          storageServiceSyncComplete = waitForEvent("storageService:syncComplete");
        }
        const contactSyncComplete = waitForEvent("contactSync:complete");
        log.info("firstRun: requesting initial sync");
        isInitialSync = true;
        try {
          await Promise.all([
            import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestConfigurationSyncMessage()),
            import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestBlockSyncMessage()),
            import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestGroupSyncMessage()),
            import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestContactSyncMessage()),
            runStorageService()
          ]);
        } catch (error) {
          log.error("connect: Failed to request initial syncs", Errors.toLogFormat(error));
        }
        log.info("firstRun: waiting for storage service and contact sync");
        try {
          await Promise.all([storageServiceSyncComplete, contactSyncComplete]);
        } catch (error) {
          log.error("connect: Failed to run storage service and contact syncs", Errors.toLogFormat(error));
        }
        log.info("firstRun: initial sync complete");
        isInitialSync = false;
        if (window.reduxStore.getState().app.appView === import_app.AppViewType.Installer) {
          log.info("firstRun: opening inbox");
          window.reduxActions.app.openInbox();
        } else {
          log.info("firstRun: not opening inbox");
        }
        const installedStickerPacks = Stickers.getInstalledStickerPacks();
        if (installedStickerPacks.length) {
          const operations = installedStickerPacks.map((pack) => ({
            packId: pack.id,
            packKey: pack.key,
            installed: true
          }));
          if (window.ConversationController.areWePrimaryDevice()) {
            log.warn("background/connect: We are primary device; not sending sticker pack sync");
            return;
          }
          log.info("firstRun: requesting stickers", operations.length);
          try {
            await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getStickerPackSync(operations));
          } catch (error) {
            log.error("connect: Failed to queue sticker sync message", Errors.toLogFormat(error));
          }
        }
        log.info("firstRun: done");
      }
      window.storage.onready(async () => {
        idleDetector.start();
      });
      if (!challengeHandler) {
        throw new Error("Expected challenge handler to be initialized");
      }
      challengeHandler.onOnline();
      reconnectBackOff.reset();
    } finally {
      connecting = false;
    }
  }
  window.SignalContext.nativeThemeListener.subscribe(import_themeChanged.themeChanged);
  const FIVE_MINUTES = 5 * durations.MINUTE;
  async function waitForEmptyEventQueue() {
    if (!messageReceiver) {
      log.info("waitForEmptyEventQueue: No messageReceiver available, returning early");
      return;
    }
    if (!messageReceiver.hasEmptied()) {
      log.info("waitForEmptyEventQueue: Waiting for MessageReceiver empty event...");
      const { resolve, reject, promise } = (0, import_explodePromise.explodePromise)();
      const timeout = Timers.setTimeout(() => {
        reject(new Error("Empty queue never fired"));
      }, FIVE_MINUTES);
      const onEmptyOnce = /* @__PURE__ */ __name(() => {
        if (messageReceiver) {
          messageReceiver.removeEventListener("empty", onEmptyOnce);
        }
        Timers.clearTimeout(timeout);
        if (resolve) {
          resolve();
        }
      }, "onEmptyOnce");
      messageReceiver.addEventListener("empty", onEmptyOnce);
      await promise;
    }
    log.info("waitForEmptyEventQueue: Waiting for event handler queue idle...");
    await eventHandlerQueue.onIdle();
  }
  window.waitForEmptyEventQueue = waitForEmptyEventQueue;
  async function onEmpty() {
    const { storage } = window.textsecure;
    await Promise.all([
      window.waitForAllBatchers(),
      window.flushAllWaitBatchers()
    ]);
    log.info("onEmpty: All outstanding database requests complete");
    window.readyForUpdates();
    window.ConversationController.onEmpty();
    import_RotateSignedPreKeyListener.RotateSignedPreKeyListener.init(window.Whisper.events, newVersion);
    await window.Signal.Data.goBackToMainProcess();
    profileKeyResponseQueue.start();
    lightSessionResetQueue.start();
    onDecryptionErrorQueue.start();
    onRetryRequestQueue.start();
    window.Whisper.deliveryReceiptQueue.start();
    import_notifications.notificationService.enable();
    await onAppView;
    window.reduxActions.app.initialLoadComplete();
    const processedCount = messageReceiver?.getAndResetProcessedCount() || 0;
    window.logAppLoadedEvent?.({
      processedCount
    });
    if (messageReceiver) {
      log.info("App loaded - messages:", processedCount);
    }
    window.Signal.Util.setBatchingStrategy(false);
    const attachmentDownloadQueue = window.attachmentDownloadQueue || [];
    window.attachmentDownloadQueue = void 0;
    const MAX_ATTACHMENT_MSGS_TO_DOWNLOAD = 250;
    const attachmentsToDownload = attachmentDownloadQueue.filter((message, index) => index <= MAX_ATTACHMENT_MSGS_TO_DOWNLOAD || (0, import_timestamp.isMoreRecentThan)(message.getReceivedAt(), MAX_ATTACHMENT_DOWNLOAD_AGE) || message.hasRequiredAttachmentDownloads());
    log.info("Downloading recent attachments of total attachments", attachmentsToDownload.length, attachmentDownloadQueue.length);
    if (window.startupProcessingQueue) {
      window.startupProcessingQueue.flush();
      window.startupProcessingQueue = void 0;
    }
    const messagesWithDownloads = await Promise.all(attachmentsToDownload.map((message) => message.queueAttachmentDownloads()));
    const messagesToSave = [];
    messagesWithDownloads.forEach((shouldSave, messageKey) => {
      if (shouldSave) {
        const message = attachmentsToDownload[messageKey];
        messagesToSave.push(message.attributes);
      }
    });
    await window.Signal.Data.saveMessages(messagesToSave, {
      ourUuid: storage.user.getCheckedUuid().toString()
    });
    window.reduxActions.crashReports.setCrashReportCount(await window.crashReports.getCount());
    const ourConversationId = window.ConversationController.getOurConversationId();
    if (ourConversationId) {
      (0, import_routineProfileRefresh.routineProfileRefresh)({
        allConversations: window.ConversationController.getAll(),
        ourConversationId,
        storage
      });
    } else {
      (0, import_assert.assert)(false, "Failed to fetch our conversation ID. Skipping routine profile refresh");
    }
    const pni = storage.user.getCheckedUuid(import_UUID.UUIDKind.PNI);
    const pniIdentity = await storage.protocol.getIdentityKeyPair(pni);
    if (!pniIdentity) {
      log.info("Requesting PNI identity sync");
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestPniIdentitySyncMessage());
    }
  }
  let initialStartupCount = 0;
  window.Whisper.events.on("incrementProgress", incrementProgress);
  function incrementProgress() {
    initialStartupCount += 1;
    if (initialStartupCount % 10 !== 0) {
      return;
    }
    log.info(`incrementProgress: Message count is ${initialStartupCount}`);
    window.Whisper.events.trigger("loadingProgress", initialStartupCount);
  }
  window.Whisper.events.on("manualConnect", manualConnect);
  function manualConnect() {
    if (isSocketOnline()) {
      log.info("manualConnect: already online; not connecting again");
      return;
    }
    log.info("manualConnect: calling connect()");
    connect();
  }
  function onConfiguration(ev) {
    ev.confirm();
    const { configuration } = ev;
    const {
      readReceipts,
      typingIndicators,
      unidentifiedDeliveryIndicators,
      linkPreviews
    } = configuration;
    window.storage.put("read-receipt-setting", Boolean(readReceipts));
    if (unidentifiedDeliveryIndicators === true || unidentifiedDeliveryIndicators === false) {
      window.storage.put("unidentifiedDeliveryIndicators", unidentifiedDeliveryIndicators);
    }
    if (typingIndicators === true || typingIndicators === false) {
      window.storage.put("typingIndicators", typingIndicators);
    }
    if (linkPreviews === true || linkPreviews === false) {
      window.storage.put("linkPreviews", linkPreviews);
    }
  }
  function onTyping(ev) {
    const { typing, sender, senderUuid, senderDevice } = ev;
    const { groupId, groupV2Id, started } = typing || {};
    if (!window.storage.get("typingIndicators")) {
      return;
    }
    let conversation;
    const senderId = window.ConversationController.ensureContactIds({
      e164: sender,
      uuid: senderUuid,
      highTrust: true,
      reason: `onTyping(${typing.timestamp})`
    });
    if (groupV2Id) {
      conversation = window.ConversationController.get(groupV2Id);
    }
    if (!conversation && groupId) {
      conversation = window.ConversationController.get(groupId);
    }
    if (!groupV2Id && !groupId && senderId) {
      conversation = window.ConversationController.get(senderId);
    }
    const ourId = window.ConversationController.getOurConversationId();
    if (!senderId) {
      log.warn("onTyping: ensureContactIds returned falsey senderId!");
      return;
    }
    if (!ourId) {
      log.warn("onTyping: Couldn't get our own id!");
      return;
    }
    if (!conversation) {
      log.warn(`onTyping: Did not find conversation for typing indicator (groupv2(${groupV2Id}), group(${groupId}), ${sender}, ${senderUuid})`);
      return;
    }
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes) && !conversation.hasMember(ourId)) {
      log.warn(`Received typing indicator for group ${conversation.idForLogging()}, which we're not a part of. Dropping.`);
      return;
    }
    if (conversation?.isBlocked()) {
      log.info(`onTyping: conversation ${conversation.idForLogging()} is blocked, dropping typing message`);
      return;
    }
    const senderConversation = window.ConversationController.get(senderId);
    if (!senderConversation) {
      log.warn("onTyping: No conversation for sender!");
      return;
    }
    if (senderConversation.isBlocked()) {
      log.info(`onTyping: sender ${conversation.idForLogging()} is blocked, dropping typing message`);
      return;
    }
    conversation.notifyTyping({
      isTyping: started,
      fromMe: senderId === ourId,
      senderId,
      senderDevice
    });
  }
  async function onStickerPack(ev) {
    ev.confirm();
    const packs = ev.stickerPacks;
    packs.forEach((pack) => {
      const { id, key, isInstall, isRemove } = pack || {};
      if (!id || !key || !isInstall && !isRemove) {
        log.warn("Received malformed sticker pack operation sync message");
        return;
      }
      const status = Stickers.getStickerPackStatus(id);
      if (status === "installed" && isRemove) {
        window.reduxActions.stickers.uninstallStickerPack(id, key, {
          fromSync: true
        });
      } else if (isInstall) {
        if (status === "downloaded") {
          window.reduxActions.stickers.installStickerPack(id, key, {
            fromSync: true
          });
        } else {
          Stickers.downloadStickerPack(id, key, {
            finalStatus: "installed",
            fromSync: true
          });
        }
      }
    });
  }
  async function onContactSyncComplete() {
    log.info("onContactSyncComplete");
    await window.storage.put("synced_at", Date.now());
    window.Whisper.events.trigger("contactSync:complete");
  }
  async function onContactReceived(ev) {
    const details = ev.contactDetails;
    const c = new window.Whisper.Conversation({
      e164: details.number,
      uuid: details.uuid,
      type: "private"
    });
    const validationError = c.validate();
    if (validationError) {
      log.error("Invalid contact received:", Errors.toLogFormat(validationError));
      return;
    }
    try {
      const detailsId = window.ConversationController.ensureContactIds({
        e164: details.number,
        uuid: details.uuid,
        highTrust: true,
        reason: "onContactReceived"
      });
      const conversation = window.ConversationController.get(detailsId);
      conversation.set({
        name: details.name,
        inbox_position: details.inboxPosition
      });
      const { avatar } = details;
      if (avatar && avatar.data) {
        const newAttributes = await Conversation.maybeUpdateAvatar(conversation.attributes, avatar.data, {
          writeNewAttachmentData,
          deleteAttachmentData,
          doesAttachmentExist
        });
        conversation.set(newAttributes);
      } else {
        const { attributes } = conversation;
        if (attributes.avatar && attributes.avatar.path) {
          await deleteAttachmentData(attributes.avatar.path);
        }
        conversation.set({ avatar: null });
      }
      window.Signal.Data.updateConversation(conversation.attributes);
      const { expireTimer } = details;
      const isValidExpireTimer = typeof expireTimer === "number";
      if (isValidExpireTimer) {
        await conversation.updateExpirationTimer(expireTimer, {
          source: window.ConversationController.getOurConversationId(),
          receivedAt: ev.receivedAtCounter,
          fromSync: true,
          isInitialSync,
          reason: "contact sync"
        });
      }
    } catch (error) {
      log.error("onContactReceived error:", Errors.toLogFormat(error));
    }
  }
  async function onGroupSyncComplete() {
    log.info("onGroupSyncComplete");
    await window.storage.put("synced_at", Date.now());
  }
  async function onGroupReceived(ev) {
    const details = ev.groupDetails;
    const { id } = details;
    const conversation = await window.ConversationController.getOrCreateAndWait(id, "group");
    if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes)) {
      log.warn("Got group sync for v2 group: ", conversation.idForLogging());
      return;
    }
    const memberConversations = details.membersE164.map((e164) => window.ConversationController.getOrCreate(e164, "private"));
    const members = memberConversations.map((c) => c.get("id"));
    const updates = {
      name: details.name,
      members,
      type: "group",
      inbox_position: details.inboxPosition
    };
    if (details.active) {
      updates.left = false;
    } else {
      updates.left = true;
    }
    if (details.blocked) {
      conversation.block();
    } else {
      conversation.unblock();
    }
    conversation.set(updates);
    const { avatar } = details;
    if (avatar && avatar.data) {
      const newAttributes = await Conversation.maybeUpdateAvatar(conversation.attributes, avatar.data, {
        writeNewAttachmentData,
        deleteAttachmentData,
        doesAttachmentExist
      });
      conversation.set(newAttributes);
    }
    window.Signal.Data.updateConversation(conversation.attributes);
    const { expireTimer } = details;
    const isValidExpireTimer = typeof expireTimer === "number";
    if (!isValidExpireTimer) {
      return;
    }
    await conversation.updateExpirationTimer(expireTimer, {
      fromSync: true,
      receivedAt: ev.receivedAtCounter,
      source: window.ConversationController.getOurConversationId(),
      reason: "group sync"
    });
  }
  async function handleMessageReceivedProfileUpdate({
    data,
    confirm,
    messageDescriptor
  }) {
    const { profileKey } = data.message;
    (0, import_assert.strictAssert)(profileKey !== void 0, "handleMessageReceivedProfileUpdate: missing profileKey");
    const sender = window.ConversationController.get(messageDescriptor.id);
    if (sender) {
      await sender.setProfileKey(profileKey);
    }
    return confirm();
  }
  const respondWithProfileKeyBatcher = (0, import_batcher.createBatcher)({
    name: "respondWithProfileKeyBatcher",
    processBatch(batch) {
      const deduped = new Set(batch);
      deduped.forEach(async (sender) => {
        try {
          if (!await (0, import_shouldRespondWithProfileKey.shouldRespondWithProfileKey)(sender)) {
            return;
          }
        } catch (error) {
          log.error("respondWithProfileKeyBatcher error", error && error.stack);
        }
        sender.queueJob("sendProfileKeyUpdate", () => sender.sendProfileKeyUpdate());
      });
    },
    wait: 200,
    maxSize: Infinity
  });
  function onEnvelopeReceived({ envelope }) {
    const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
    if (envelope.sourceUuid && envelope.sourceUuid !== ourUuid) {
      window.ConversationController.ensureContactIds({
        e164: envelope.source,
        uuid: envelope.sourceUuid,
        highTrust: true,
        reason: `onEnvelopeReceived(${envelope.timestamp})`
      });
    }
  }
  function onMessageReceived(event) {
    const { data, confirm } = event;
    const messageDescriptor = getMessageDescriptor({
      confirm,
      ...data,
      destination: data.source,
      destinationUuid: data.sourceUuid
    });
    const { PROFILE_KEY_UPDATE } = import_protobuf.SignalService.DataMessage.Flags;
    const isProfileUpdate = Boolean(data.message.flags & PROFILE_KEY_UPDATE);
    if (isProfileUpdate) {
      return handleMessageReceivedProfileUpdate({
        data,
        confirm,
        messageDescriptor
      });
    }
    const message = initIncomingMessage(data, messageDescriptor);
    if ((0, import_message.isIncoming)(message.attributes) && !message.get("unidentifiedDeliveryReceived")) {
      const sender = (0, import_helpers.getContact)(message.attributes);
      if (!sender) {
        throw new Error("MessageModel has no sender.");
      }
      profileKeyResponseQueue.add(() => {
        respondWithProfileKeyBatcher.add(sender);
      });
    }
    if (data.message.reaction) {
      (0, import_assert.strictAssert)(data.message.reaction.targetAuthorUuid, "Reaction without targetAuthorUuid");
      const targetAuthorUuid = (0, import_normalizeUuid.normalizeUuid)(data.message.reaction.targetAuthorUuid, "DataMessage.Reaction.targetAuthorUuid");
      const { reaction, timestamp } = data.message;
      if (!(0, import_isValidReactionEmoji.isValidReactionEmoji)(reaction.emoji)) {
        log.warn("Received an invalid reaction emoji. Dropping it");
        confirm();
        return Promise.resolve();
      }
      (0, import_assert.strictAssert)(reaction.targetTimestamp, "Reaction without targetTimestamp");
      const fromId = window.ConversationController.ensureContactIds({
        e164: data.source,
        uuid: data.sourceUuid
      });
      (0, import_assert.strictAssert)(fromId, "Reaction without fromId");
      log.info("Queuing incoming reaction for", reaction.targetTimestamp);
      const attributes = {
        emoji: reaction.emoji,
        remove: reaction.remove,
        targetAuthorUuid,
        targetTimestamp: reaction.targetTimestamp,
        timestamp,
        fromId,
        source: import_ReactionSource.ReactionSource.FromSomeoneElse
      };
      const reactionModel = import_Reactions.Reactions.getSingleton().add(attributes);
      import_Reactions.Reactions.getSingleton().onReaction(reactionModel, message);
      confirm();
      return Promise.resolve();
    }
    if (data.message.delete) {
      const { delete: del } = data.message;
      log.info("Queuing incoming DOE for", del.targetSentTimestamp);
      (0, import_assert.strictAssert)(del.targetSentTimestamp, "Delete missing targetSentTimestamp");
      (0, import_assert.strictAssert)(data.serverTimestamp, "Delete missing serverTimestamp");
      const fromId = window.ConversationController.ensureContactIds({
        e164: data.source,
        uuid: data.sourceUuid
      });
      (0, import_assert.strictAssert)(fromId, "Delete missing fromId");
      const attributes = {
        targetSentTimestamp: del.targetSentTimestamp,
        serverTimestamp: data.serverTimestamp,
        fromId
      };
      const deleteModel = import_Deletes.Deletes.getSingleton().add(attributes);
      import_Deletes.Deletes.getSingleton().onDelete(deleteModel);
      confirm();
      return Promise.resolve();
    }
    if (handleGroupCallUpdateMessage(data.message, messageDescriptor)) {
      confirm();
      return Promise.resolve();
    }
    message.handleDataMessage(data.message, event.confirm);
    return Promise.resolve();
  }
  async function onProfileKeyUpdate({ data, confirm }) {
    const conversationId = window.ConversationController.ensureContactIds({
      e164: data.source,
      uuid: data.sourceUuid,
      highTrust: true,
      reason: "onProfileKeyUpdate"
    });
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      log.error("onProfileKeyUpdate: could not find conversation", data.source, data.sourceUuid);
      confirm();
      return;
    }
    if (!data.profileKey) {
      log.error("onProfileKeyUpdate: missing profileKey", data.profileKey);
      confirm();
      return;
    }
    log.info("onProfileKeyUpdate: updating profileKey for", data.sourceUuid, data.source);
    await conversation.setProfileKey(data.profileKey);
    confirm();
  }
  async function handleMessageSentProfileUpdate({
    data,
    confirm,
    messageDescriptor
  }) {
    const { id } = messageDescriptor;
    const conversation = window.ConversationController.get(id);
    conversation.enableProfileSharing();
    window.Signal.Data.updateConversation(conversation.attributes);
    const ourId = window.ConversationController.getOurConversationId();
    const me = window.ConversationController.get(ourId);
    const { profileKey } = data.message;
    (0, import_assert.strictAssert)(profileKey !== void 0, "handleMessageSentProfileUpdate: missing profileKey");
    await me.setProfileKey(profileKey);
    return confirm();
  }
  function createSentMessage(data, descriptor) {
    const now = Date.now();
    const timestamp = data.timestamp || now;
    const ourId = window.ConversationController.getOurConversationIdOrThrow();
    const { unidentifiedStatus = [] } = data;
    const sendStateByConversationId = unidentifiedStatus.reduce((result, { destinationUuid, destination }) => {
      const conversationId = window.ConversationController.ensureContactIds({
        uuid: destinationUuid,
        e164: destination
      });
      if (!conversationId || conversationId === ourId) {
        return result;
      }
      return {
        ...result,
        [conversationId]: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: timestamp
        }
      };
    }, {
      [ourId]: {
        status: import_MessageSendState.SendStatus.Sent,
        updatedAt: timestamp
      }
    });
    let unidentifiedDeliveries = [];
    if (unidentifiedStatus.length) {
      const unidentified = window._.filter(data.unidentifiedStatus, (item) => Boolean(item.unidentified));
      unidentifiedDeliveries = unidentified.map((item) => item.destinationUuid || item.destination).filter(import_isNotNil.isNotNil);
    }
    return new window.Whisper.Message({
      conversationId: descriptor.id,
      expirationStartTimestamp: Math.min(data.expirationStartTimestamp || timestamp, now),
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      received_at_ms: data.receivedAtDate,
      received_at: data.receivedAtCounter,
      seenStatus: import_MessageSeenStatus.SeenStatus.NotApplicable,
      sendStateByConversationId,
      sent_at: timestamp,
      serverTimestamp: data.serverTimestamp,
      source: window.textsecure.storage.user.getNumber(),
      sourceDevice: data.device,
      sourceUuid: window.textsecure.storage.user.getUuid()?.toString(),
      timestamp,
      type: "outgoing",
      unidentifiedDeliveries
    });
  }
  const getMessageDescriptor = /* @__PURE__ */ __name(({
    confirm,
    message,
    source,
    sourceUuid,
    destination,
    destinationUuid
  }) => {
    if (message.groupV2) {
      const { id: id2 } = message.groupV2;
      if (!id2) {
        throw new Error("getMessageDescriptor: GroupV2 data was missing an id");
      }
      const groupV2 = window.ConversationController.get(id2);
      if (groupV2) {
        return {
          type: Message.GROUP,
          id: groupV2.id
        };
      }
      const groupV1 = window.ConversationController.getByDerivedGroupV2Id(id2);
      if (groupV1) {
        return {
          type: Message.GROUP,
          id: groupV1.id
        };
      }
      const conversationId = window.ConversationController.ensureGroup(id2, {
        groupVersion: 2,
        masterKey: message.groupV2.masterKey,
        secretParams: message.groupV2.secretParams,
        publicParams: message.groupV2.publicParams
      });
      return {
        type: Message.GROUP,
        id: conversationId
      };
    }
    if (message.group) {
      const { id: id2, derivedGroupV2Id } = message.group;
      if (!id2) {
        throw new Error("getMessageDescriptor: GroupV1 data was missing id");
      }
      if (!derivedGroupV2Id) {
        log.warn("getMessageDescriptor: GroupV1 data was missing derivedGroupV2Id");
      } else {
        const migratedGroup = window.ConversationController.get(derivedGroupV2Id);
        if (migratedGroup) {
          return {
            type: Message.GROUP,
            id: migratedGroup.id
          };
        }
      }
      const fromContactId = window.ConversationController.ensureContactIds({
        e164: source,
        uuid: sourceUuid,
        highTrust: true,
        reason: `getMessageDescriptor(${message.timestamp}): group v1`
      });
      const conversationId = window.ConversationController.ensureGroup(id2, {
        addedBy: fromContactId
      });
      return {
        type: Message.GROUP,
        id: conversationId
      };
    }
    const id = window.ConversationController.ensureContactIds({
      e164: destination,
      uuid: destinationUuid,
      highTrust: true,
      reason: `getMessageDescriptor(${message.timestamp}): private`
    });
    if (!id) {
      confirm();
      throw new Error(`getMessageDescriptor/${message.timestamp}: ensureContactIds returned falsey id`);
    }
    return {
      type: Message.PRIVATE,
      id
    };
  }, "getMessageDescriptor");
  function onSentMessage(event) {
    const { data, confirm } = event;
    const source = window.textsecure.storage.user.getNumber();
    const sourceUuid = window.textsecure.storage.user.getUuid()?.toString();
    (0, import_assert.strictAssert)(source && sourceUuid, "Missing user number and uuid");
    const messageDescriptor = getMessageDescriptor({
      confirm,
      ...data,
      source,
      sourceUuid
    });
    const { PROFILE_KEY_UPDATE } = import_protobuf.SignalService.DataMessage.Flags;
    const isProfileUpdate = Boolean(data.message.flags & PROFILE_KEY_UPDATE);
    if (isProfileUpdate) {
      return handleMessageSentProfileUpdate({
        data,
        confirm,
        messageDescriptor
      });
    }
    const message = createSentMessage(data, messageDescriptor);
    if (data.message.reaction) {
      (0, import_assert.strictAssert)(data.message.reaction.targetAuthorUuid, "Reaction without targetAuthorUuid");
      const targetAuthorUuid = (0, import_normalizeUuid.normalizeUuid)(data.message.reaction.targetAuthorUuid, "DataMessage.Reaction.targetAuthorUuid");
      const { reaction, timestamp } = data.message;
      (0, import_assert.strictAssert)(reaction.targetTimestamp, "Reaction without targetAuthorUuid");
      if (!(0, import_isValidReactionEmoji.isValidReactionEmoji)(reaction.emoji)) {
        log.warn("Received an invalid reaction emoji. Dropping it");
        event.confirm();
        return Promise.resolve();
      }
      log.info("Queuing sent reaction for", reaction.targetTimestamp);
      const attributes = {
        emoji: reaction.emoji,
        remove: reaction.remove,
        targetAuthorUuid,
        targetTimestamp: reaction.targetTimestamp,
        timestamp,
        fromId: window.ConversationController.getOurConversationIdOrThrow(),
        source: import_ReactionSource.ReactionSource.FromSync
      };
      const reactionModel = import_Reactions.Reactions.getSingleton().add(attributes);
      import_Reactions.Reactions.getSingleton().onReaction(reactionModel, message);
      event.confirm();
      return Promise.resolve();
    }
    if (data.message.delete) {
      const { delete: del } = data.message;
      (0, import_assert.strictAssert)(del.targetSentTimestamp, "Delete without targetSentTimestamp");
      (0, import_assert.strictAssert)(data.serverTimestamp, "Data has no serverTimestamp");
      log.info("Queuing sent DOE for", del.targetSentTimestamp);
      const attributes = {
        targetSentTimestamp: del.targetSentTimestamp,
        serverTimestamp: data.serverTimestamp,
        fromId: window.ConversationController.getOurConversationIdOrThrow()
      };
      const deleteModel = import_Deletes.Deletes.getSingleton().add(attributes);
      import_Deletes.Deletes.getSingleton().onDelete(deleteModel);
      confirm();
      return Promise.resolve();
    }
    if (handleGroupCallUpdateMessage(data.message, messageDescriptor)) {
      event.confirm();
      return Promise.resolve();
    }
    message.handleDataMessage(data.message, event.confirm, {
      data
    });
    return Promise.resolve();
  }
  function initIncomingMessage(data, descriptor) {
    (0, import_assert.assert)(Boolean(data.receivedAtCounter), `Did not receive receivedAtCounter for message: ${data.timestamp}`);
    return new window.Whisper.Message({
      source: data.source,
      sourceUuid: data.sourceUuid,
      sourceDevice: data.sourceDevice,
      sent_at: data.timestamp,
      serverGuid: data.serverGuid,
      serverTimestamp: data.serverTimestamp,
      received_at: data.receivedAtCounter,
      received_at_ms: data.receivedAtDate,
      conversationId: descriptor.id,
      unidentifiedDeliveryReceived: data.unidentifiedDeliveryReceived,
      type: data.message.isStory ? "story" : "incoming",
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      seenStatus: import_MessageSeenStatus.SeenStatus.Unseen,
      timestamp: data.timestamp
    });
  }
  function handleGroupCallUpdateMessage(message, messageDescriptor) {
    if (message.groupCallUpdate) {
      if (message.groupV2 && messageDescriptor.type === Message.GROUP) {
        window.reduxActions.calling.peekNotConnectedGroupCall({
          conversationId: messageDescriptor.id
        });
        return true;
      }
      log.warn("Received a group call update for a conversation that is not a GV2 group. Ignoring that property and continuing.");
    }
    return false;
  }
  async function unlinkAndDisconnect(mode) {
    window.Whisper.events.trigger("unauthorized");
    log.warn("unlinkAndDisconnect: Client is no longer authorized; deleting local configuration");
    if (messageReceiver) {
      log.info("unlinkAndDisconnect: logging out");
      (0, import_assert.strictAssert)(server !== void 0, "WebAPI not initialized");
      server.unregisterRequestHandler(messageReceiver);
      messageReceiver.stopProcessing();
      await server.logout();
      await window.waitForAllBatchers();
    }
    onEmpty();
    window.Signal.Util.Registration.remove();
    const NUMBER_ID_KEY = "number_id";
    const UUID_ID_KEY = "uuid_id";
    const VERSION_KEY = "version";
    const LAST_PROCESSED_INDEX_KEY = "attachmentMigration_lastProcessedIndex";
    const IS_MIGRATION_COMPLETE_KEY = "attachmentMigration_isComplete";
    const previousNumberId = window.textsecure.storage.get(NUMBER_ID_KEY);
    const previousUuidId = window.textsecure.storage.get(UUID_ID_KEY);
    const lastProcessedIndex = window.textsecure.storage.get(LAST_PROCESSED_INDEX_KEY);
    const isMigrationComplete = window.textsecure.storage.get(IS_MIGRATION_COMPLETE_KEY);
    try {
      log.info(`unlinkAndDisconnect: removing configuration, mode ${mode}`);
      await window.textsecure.storage.protocol.removeAllConfiguration(mode);
      window.getConversations().forEach((conversation) => {
        delete conversation.attributes.senderKeyInfo;
      });
      if (previousNumberId !== void 0) {
        await window.textsecure.storage.put(NUMBER_ID_KEY, previousNumberId);
      }
      if (previousUuidId !== void 0) {
        await window.textsecure.storage.put(UUID_ID_KEY, previousUuidId);
      }
      await window.textsecure.storage.put(IS_MIGRATION_COMPLETE_KEY, isMigrationComplete || false);
      if (lastProcessedIndex !== void 0) {
        await window.textsecure.storage.put(LAST_PROCESSED_INDEX_KEY, lastProcessedIndex);
      } else {
        await window.textsecure.storage.remove(LAST_PROCESSED_INDEX_KEY);
      }
      await window.textsecure.storage.put(VERSION_KEY, window.getVersion());
      log.info("unlinkAndDisconnect: Successfully cleared local configuration");
    } catch (eraseError) {
      log.error("unlinkAndDisconnect: Something went wrong clearing local configuration", eraseError && eraseError.stack ? eraseError.stack : eraseError);
    } finally {
      window.Signal.Util.Registration.markEverDone();
    }
  }
  function onError(ev) {
    const { error } = ev;
    log.error("background onError:", Errors.toLogFormat(error));
    if (error instanceof import_Errors.HTTPError && (error.code === 401 || error.code === 403)) {
      unlinkAndDisconnect(import_RemoveAllConfiguration.RemoveAllConfiguration.Full);
      return;
    }
    log.warn("background onError: Doing nothing with incoming error");
  }
  async function onViewOnceOpenSync(ev) {
    ev.confirm();
    const { source, sourceUuid, timestamp } = ev;
    log.info(`view once open sync ${source} ${timestamp}`);
    (0, import_assert.strictAssert)(sourceUuid, "ViewOnceOpen without sourceUuid");
    (0, import_assert.strictAssert)(timestamp, "ViewOnceOpen without timestamp");
    const attributes = {
      source,
      sourceUuid,
      timestamp
    };
    const sync = import_ViewOnceOpenSyncs.ViewOnceOpenSyncs.getSingleton().add(attributes);
    import_ViewOnceOpenSyncs.ViewOnceOpenSyncs.getSingleton().onSync(sync);
  }
  async function onFetchLatestSync(ev) {
    ev.confirm();
    const { eventType } = ev;
    const FETCH_LATEST_ENUM = import_protobuf.SignalService.SyncMessage.FetchLatest.Type;
    switch (eventType) {
      case FETCH_LATEST_ENUM.LOCAL_PROFILE: {
        const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
        const ourE164 = window.textsecure.storage.user.getNumber();
        await Promise.all([(0, import_getProfile.getProfile)(ourUuid, ourE164), (0, import_updateOurUsername.updateOurUsername)()]);
        break;
      }
      case FETCH_LATEST_ENUM.STORAGE_MANIFEST:
        log.info("onFetchLatestSync: fetching latest manifest");
        await window.Signal.Services.runStorageServiceSyncJob();
        break;
      case FETCH_LATEST_ENUM.SUBSCRIPTION_STATUS:
        log.info("onFetchLatestSync: fetching latest subscription status");
        (0, import_assert.strictAssert)(server, "WebAPI not ready");
        import_areWeASubscriber.areWeASubscriberService.update(window.storage, server);
        break;
      default:
        log.info(`onFetchLatestSync: Unknown type encountered ${eventType}`);
    }
  }
  async function onKeysSync(ev) {
    ev.confirm();
    const { storageServiceKey } = ev;
    if (storageServiceKey === null) {
      log.info("onKeysSync: deleting window.storageKey");
      window.storage.remove("storageKey");
    }
    if (storageServiceKey) {
      const storageServiceKeyBase64 = Bytes.toBase64(storageServiceKey);
      if (window.storage.get("storageKey") === storageServiceKeyBase64) {
        log.info("onKeysSync: storage service key didn't change, fetching manifest anyway");
      } else {
        log.info("onKeysSync: updated storage service key, erasing state and fetching");
        await window.storage.put("storageKey", storageServiceKeyBase64);
        await window.Signal.Services.eraseAllStorageServiceState({
          keepUnknownFields: true
        });
      }
      await window.Signal.Services.runStorageServiceSyncJob();
    }
  }
  async function onPNIIdentitySync(ev) {
    ev.confirm();
    log.info("onPNIIdentitySync: updating PNI keys");
    const manager = window.getAccountManager();
    const { privateKey: privKey, publicKey: pubKey } = ev.data;
    await manager.updatePNIIdentity({ privKey, pubKey });
  }
  async function onMessageRequestResponse(ev) {
    ev.confirm();
    const {
      threadE164,
      threadUuid,
      groupId,
      groupV2Id,
      messageRequestResponseType
    } = ev;
    log.info("onMessageRequestResponse", {
      threadE164,
      threadUuid,
      groupId: `group(${groupId})`,
      groupV2Id: `groupv2(${groupV2Id})`,
      messageRequestResponseType
    });
    (0, import_assert.strictAssert)(messageRequestResponseType, "onMessageRequestResponse: missing type");
    const attributes = {
      threadE164,
      threadUuid,
      groupId,
      groupV2Id,
      type: messageRequestResponseType
    };
    const sync = import_MessageRequests.MessageRequests.getSingleton().add(attributes);
    import_MessageRequests.MessageRequests.getSingleton().onResponse(sync);
  }
  function onReadReceipt(event) {
    onReadOrViewReceipt({
      logTitle: "read receipt",
      event,
      type: import_MessageReceipts.MessageReceiptType.Read
    });
  }
  function onViewReceipt(event) {
    onReadOrViewReceipt({
      logTitle: "view receipt",
      event,
      type: import_MessageReceipts.MessageReceiptType.View
    });
  }
  function onReadOrViewReceipt({
    event,
    logTitle,
    type
  }) {
    const { envelopeTimestamp, timestamp, source, sourceUuid, sourceDevice } = event.receipt;
    const sourceConversationId = window.ConversationController.ensureContactIds({
      e164: source,
      uuid: sourceUuid,
      highTrust: true,
      reason: `onReadOrViewReceipt(${envelopeTimestamp})`
    });
    log.info(logTitle, source, sourceUuid, sourceDevice, envelopeTimestamp, sourceConversationId, "for sent message", timestamp);
    event.confirm();
    if (!window.storage.get("read-receipt-setting") || !sourceConversationId) {
      return;
    }
    (0, import_assert.strictAssert)((0, import_UUID.isValidUuid)(sourceUuid), "onReadOrViewReceipt: Missing sourceUuid");
    (0, import_assert.strictAssert)(sourceDevice, "onReadOrViewReceipt: Missing sourceDevice");
    const attributes = {
      messageSentAt: timestamp,
      receiptTimestamp: envelopeTimestamp,
      sourceConversationId,
      sourceUuid,
      sourceDevice,
      type
    };
    const receipt = import_MessageReceipts.MessageReceipts.getSingleton().add(attributes);
    import_MessageReceipts.MessageReceipts.getSingleton().onReceipt(receipt);
  }
  function onReadSync(ev) {
    const { envelopeTimestamp, sender, senderUuid, timestamp } = ev.read;
    const readAt = envelopeTimestamp;
    const senderId = window.ConversationController.ensureContactIds({
      e164: sender,
      uuid: senderUuid
    });
    log.info("read sync", sender, senderUuid, envelopeTimestamp, senderId, "for message", timestamp);
    (0, import_assert.strictAssert)(senderId, "onReadSync missing senderId");
    (0, import_assert.strictAssert)(senderUuid, "onReadSync missing senderUuid");
    (0, import_assert.strictAssert)(timestamp, "onReadSync missing timestamp");
    const attributes = {
      senderId,
      sender,
      senderUuid,
      timestamp,
      readAt
    };
    const receipt = import_ReadSyncs.ReadSyncs.getSingleton().add(attributes);
    receipt.on("remove", ev.confirm);
    return import_ReadSyncs.ReadSyncs.getSingleton().onSync(receipt);
  }
  function onViewSync(ev) {
    const { envelopeTimestamp, senderE164, senderUuid, timestamp } = ev.view;
    const senderId = window.ConversationController.ensureContactIds({
      e164: senderE164,
      uuid: senderUuid
    });
    log.info("view sync", senderE164, senderUuid, envelopeTimestamp, senderId, "for message", timestamp);
    (0, import_assert.strictAssert)(senderId, "onViewSync missing senderId");
    (0, import_assert.strictAssert)(senderUuid, "onViewSync missing senderUuid");
    (0, import_assert.strictAssert)(timestamp, "onViewSync missing timestamp");
    const attributes = {
      senderId,
      senderE164,
      senderUuid,
      timestamp,
      viewedAt: envelopeTimestamp
    };
    const receipt = import_ViewSyncs.ViewSyncs.getSingleton().add(attributes);
    receipt.on("remove", ev.confirm);
    return import_ViewSyncs.ViewSyncs.getSingleton().onSync(receipt);
  }
  function onDeliveryReceipt(ev) {
    const { deliveryReceipt } = ev;
    const { envelopeTimestamp, sourceUuid, source, sourceDevice, timestamp } = deliveryReceipt;
    ev.confirm();
    const sourceConversationId = window.ConversationController.ensureContactIds({
      e164: source,
      uuid: sourceUuid,
      highTrust: true,
      reason: `onDeliveryReceipt(${envelopeTimestamp})`
    });
    log.info("delivery receipt from", source, sourceUuid, sourceDevice, sourceConversationId, envelopeTimestamp, "for sent message", timestamp);
    if (!sourceConversationId) {
      log.info("no conversation for", source, sourceUuid);
      return;
    }
    (0, import_assert.strictAssert)(envelopeTimestamp, "onDeliveryReceipt: missing envelopeTimestamp");
    (0, import_assert.strictAssert)((0, import_UUID.isValidUuid)(sourceUuid), "onDeliveryReceipt: missing valid sourceUuid");
    (0, import_assert.strictAssert)(sourceDevice, "onDeliveryReceipt: missing sourceDevice");
    const attributes = {
      messageSentAt: timestamp,
      receiptTimestamp: envelopeTimestamp,
      sourceConversationId,
      sourceUuid,
      sourceDevice,
      type: import_MessageReceipts.MessageReceiptType.Delivery
    };
    const receipt = import_MessageReceipts.MessageReceipts.getSingleton().add(attributes);
    import_MessageReceipts.MessageReceipts.getSingleton().onReceipt(receipt);
  }
}
window.startApp = startApp;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanupSessionResets,
  isOverHourIntoPast,
  startApp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFja2dyb3VuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHdlYkZyYW1lIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGJhdGNoIGFzIGJhdGNoRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBNZXNzYWdlUmVjZWl2ZXIgZnJvbSAnLi90ZXh0c2VjdXJlL01lc3NhZ2VSZWNlaXZlcic7XG5pbXBvcnQgdHlwZSB7XG4gIFNlc3Npb25SZXNldHNUeXBlLFxuICBQcm9jZXNzZWREYXRhTWVzc2FnZSxcbn0gZnJvbSAnLi90ZXh0c2VjdXJlL1R5cGVzLmQnO1xuaW1wb3J0IHsgSFRUUEVycm9yIH0gZnJvbSAnLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5pbXBvcnQgY3JlYXRlVGFza1dpdGhUaW1lb3V0LCB7XG4gIHN1c3BlbmRUYXNrc1dpdGhUaW1lb3V0LFxuICByZXN1bWVUYXNrc1dpdGhUaW1lb3V0LFxufSBmcm9tICcuL3RleHRzZWN1cmUvVGFza1dpdGhUaW1lb3V0JztcbmltcG9ydCB0eXBlIHtcbiAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgUmVhY3Rpb25BdHRyaWJ1dGVzVHlwZSxcbn0gZnJvbSAnLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4vQnl0ZXMnO1xuaW1wb3J0ICogYXMgVGltZXJzIGZyb20gJy4vVGltZXJzJztcbmltcG9ydCAqIGFzIGluZGV4ZWREYiBmcm9tICcuL2luZGV4ZWRkYic7XG5pbXBvcnQgdHlwZSB7IFdoYXRJc1RoaXMgfSBmcm9tICcuL3dpbmRvdy5kJztcbmltcG9ydCB0eXBlIHsgTWVudU9wdGlvbnNUeXBlIH0gZnJvbSAnLi90eXBlcy9tZW51JztcbmltcG9ydCB0eXBlIHsgUmVjZWlwdCB9IGZyb20gJy4vdHlwZXMvUmVjZWlwdCc7XG5pbXBvcnQgeyBTb2NrZXRTdGF0dXMgfSBmcm9tICcuL3R5cGVzL1NvY2tldFN0YXR1cyc7XG5pbXBvcnQgeyBERUZBVUxUX0NPTlZFUlNBVElPTl9DT0xPUiB9IGZyb20gJy4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBDaGFsbGVuZ2VIYW5kbGVyIH0gZnJvbSAnLi9jaGFsbGVuZ2UnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuL3V0aWwvZXhwbG9kZVByb21pc2UnO1xuaW1wb3J0IHsgaXNXaW5kb3dEcmFnRWxlbWVudCB9IGZyb20gJy4vdXRpbC9pc1dpbmRvd0RyYWdFbGVtZW50JztcbmltcG9ydCB7IGFzc2VydCwgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBub3JtYWxpemVVdWlkIH0gZnJvbSAnLi91dGlsL25vcm1hbGl6ZVV1aWQnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAnLi91dGlsL2l0ZXJhYmxlcyc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4vdXRpbC9pc05vdE5pbCc7XG5pbXBvcnQgeyBzZXRBcHBMb2FkaW5nU2NyZWVuTWVzc2FnZSB9IGZyb20gJy4vc2V0QXBwTG9hZGluZ1NjcmVlbk1lc3NhZ2UnO1xuaW1wb3J0IHsgSWRsZURldGVjdG9yIH0gZnJvbSAnLi9JZGxlRGV0ZWN0b3InO1xuaW1wb3J0IHsgZXhwaXJpbmdNZXNzYWdlc0RlbGV0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXhwaXJpbmdNZXNzYWdlc0RlbGV0aW9uJztcbmltcG9ydCB7IHRhcFRvVmlld01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90YXBUb1ZpZXdNZXNzYWdlc0RlbGV0aW9uU2VydmljZSc7XG5pbXBvcnQgeyBnZXRTdG9yaWVzRm9yUmVkdXgsIGxvYWRTdG9yaWVzIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdG9yeUxvYWRlcic7XG5pbXBvcnQgeyBzZW5kZXJDZXJ0aWZpY2F0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NlbmRlckNlcnRpZmljYXRlJztcbmltcG9ydCB7IEdST1VQX0NSRURFTlRJQUxTX0tFWSB9IGZyb20gJy4vc2VydmljZXMvZ3JvdXBDcmVkZW50aWFsRmV0Y2hlcic7XG5pbXBvcnQgKiBhcyBLZXlib2FyZExheW91dCBmcm9tICcuL3NlcnZpY2VzL2tleWJvYXJkTGF5b3V0JztcbmltcG9ydCB7IHJvdXRpbmVQcm9maWxlUmVmcmVzaCB9IGZyb20gJy4vcm91dGluZVByb2ZpbGVSZWZyZXNoJztcbmltcG9ydCB7IGlzTW9yZVJlY2VudFRoYW4sIGlzT2xkZXJUaGFuLCB0b0RheU1pbGxpcyB9IGZyb20gJy4vdXRpbC90aW1lc3RhbXAnO1xuaW1wb3J0IHsgaXNWYWxpZFJlYWN0aW9uRW1vamkgfSBmcm9tICcuL3JlYWN0aW9ucy9pc1ZhbGlkUmVhY3Rpb25FbW9qaSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRDb250YWN0IH0gZnJvbSAnLi9tZXNzYWdlcy9oZWxwZXJzJztcbmltcG9ydCB7IG1pZ3JhdGVNZXNzYWdlRGF0YSB9IGZyb20gJy4vbWVzc2FnZXMvbWlncmF0ZU1lc3NhZ2VEYXRhJztcbmltcG9ydCB7IGNyZWF0ZUJhdGNoZXIgfSBmcm9tICcuL3V0aWwvYmF0Y2hlcic7XG5pbXBvcnQgeyB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAgfSBmcm9tICcuL3VwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cCc7XG5pbXBvcnQgeyBpbml0aWFsaXplQWxsSm9iUXVldWVzIH0gZnJvbSAnLi9qb2JzL2luaXRpYWxpemVBbGxKb2JRdWV1ZXMnO1xuaW1wb3J0IHsgcmVtb3ZlU3RvcmFnZUtleUpvYlF1ZXVlIH0gZnJvbSAnLi9qb2JzL3JlbW92ZVN0b3JhZ2VLZXlKb2JRdWV1ZSc7XG5pbXBvcnQgeyBvdXJQcm9maWxlS2V5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb3VyUHJvZmlsZUtleSc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IGFyZVdlQVN1YnNjcmliZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hcmVXZUFTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN0YXJ0VGltZVRyYXZlbERldGVjdG9yIH0gZnJvbSAnLi91dGlsL3N0YXJ0VGltZVRyYXZlbERldGVjdG9yJztcbmltcG9ydCB7IHNob3VsZFJlc3BvbmRXaXRoUHJvZmlsZUtleSB9IGZyb20gJy4vdXRpbC9zaG91bGRSZXNwb25kV2l0aFByb2ZpbGVLZXknO1xuaW1wb3J0IHsgTGF0ZXN0UXVldWUgfSBmcm9tICcuL3V0aWwvTGF0ZXN0UXVldWUnO1xuaW1wb3J0IHsgcGFyc2VJbnRPclRocm93IH0gZnJvbSAnLi91dGlsL3BhcnNlSW50T3JUaHJvdyc7XG5pbXBvcnQgeyBnZXRQcm9maWxlIH0gZnJvbSAnLi91dGlsL2dldFByb2ZpbGUnO1xuaW1wb3J0IHR5cGUge1xuICBDb25maWd1cmF0aW9uRXZlbnQsXG4gIENvbnRhY3RFdmVudCxcbiAgRGVjcnlwdGlvbkVycm9yRXZlbnQsXG4gIERlbGl2ZXJ5RXZlbnQsXG4gIEVudmVsb3BlRXZlbnQsXG4gIEVycm9yRXZlbnQsXG4gIEZldGNoTGF0ZXN0RXZlbnQsXG4gIEdyb3VwRXZlbnQsXG4gIEtleXNFdmVudCxcbiAgUE5JSWRlbnRpdHlFdmVudCxcbiAgTWVzc2FnZUV2ZW50LFxuICBNZXNzYWdlRXZlbnREYXRhLFxuICBNZXNzYWdlUmVxdWVzdFJlc3BvbnNlRXZlbnQsXG4gIFByb2ZpbGVLZXlVcGRhdGVFdmVudCxcbiAgUmVhZEV2ZW50LFxuICBSZWFkU3luY0V2ZW50LFxuICBSZXRyeVJlcXVlc3RFdmVudCxcbiAgU2VudEV2ZW50LFxuICBTZW50RXZlbnREYXRhLFxuICBTdGlja2VyUGFja0V2ZW50LFxuICBUeXBpbmdFdmVudCxcbiAgVmlld0V2ZW50LFxuICBWaWV3T25jZU9wZW5TeW5jRXZlbnQsXG4gIFZpZXdTeW5jRXZlbnQsXG59IGZyb20gJy4vdGV4dHNlY3VyZS9tZXNzYWdlUmVjZWl2ZXJFdmVudHMnO1xuaW1wb3J0IHR5cGUgeyBXZWJBUElUeXBlIH0gZnJvbSAnLi90ZXh0c2VjdXJlL1dlYkFQSSc7XG5pbXBvcnQgKiBhcyBLZXlDaGFuZ2VMaXN0ZW5lciBmcm9tICcuL3RleHRzZWN1cmUvS2V5Q2hhbmdlTGlzdGVuZXInO1xuaW1wb3J0IHsgUm90YXRlU2lnbmVkUHJlS2V5TGlzdGVuZXIgfSBmcm9tICcuL3RleHRzZWN1cmUvUm90YXRlU2lnbmVkUHJlS2V5TGlzdGVuZXInO1xuaW1wb3J0IHsgaXNEaXJlY3RDb252ZXJzYXRpb24sIGlzR3JvdXBWMiB9IGZyb20gJy4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IEJhY2tPZmYsIEZJQk9OQUNDSV9USU1FT1VUUyB9IGZyb20gJy4vdXRpbC9CYWNrT2ZmJztcbmltcG9ydCB7IEFwcFZpZXdUeXBlIH0gZnJvbSAnLi9zdGF0ZS9kdWNrcy9hcHAnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZXNTdGF0ZVR5cGUgfSBmcm9tICcuL3N0YXRlL2R1Y2tzL2JhZGdlcyc7XG5pbXBvcnQgeyBiYWRnZUltYWdlRmlsZURvd25sb2FkZXIgfSBmcm9tICcuL2JhZGdlcy9iYWRnZUltYWdlRmlsZURvd25sb2FkZXInO1xuaW1wb3J0IHsgaXNJbmNvbWluZyB9IGZyb20gJy4vc3RhdGUvc2VsZWN0b3JzL21lc3NhZ2UnO1xuaW1wb3J0IHsgYWN0aW9uQ3JlYXRvcnMgfSBmcm9tICcuL3N0YXRlL2FjdGlvbnMnO1xuaW1wb3J0IHsgRGVsZXRlcyB9IGZyb20gJy4vbWVzc2FnZU1vZGlmaWVycy9EZWxldGVzJztcbmltcG9ydCB7XG4gIE1lc3NhZ2VSZWNlaXB0cyxcbiAgTWVzc2FnZVJlY2VpcHRUeXBlLFxufSBmcm9tICcuL21lc3NhZ2VNb2RpZmllcnMvTWVzc2FnZVJlY2VpcHRzJztcbmltcG9ydCB7IE1lc3NhZ2VSZXF1ZXN0cyB9IGZyb20gJy4vbWVzc2FnZU1vZGlmaWVycy9NZXNzYWdlUmVxdWVzdHMnO1xuaW1wb3J0IHsgUmVhY3Rpb25zIH0gZnJvbSAnLi9tZXNzYWdlTW9kaWZpZXJzL1JlYWN0aW9ucyc7XG5pbXBvcnQgeyBSZWFkU3luY3MgfSBmcm9tICcuL21lc3NhZ2VNb2RpZmllcnMvUmVhZFN5bmNzJztcbmltcG9ydCB7IFZpZXdTeW5jcyB9IGZyb20gJy4vbWVzc2FnZU1vZGlmaWVycy9WaWV3U3luY3MnO1xuaW1wb3J0IHsgVmlld09uY2VPcGVuU3luY3MgfSBmcm9tICcuL21lc3NhZ2VNb2RpZmllcnMvVmlld09uY2VPcGVuU3luY3MnO1xuaW1wb3J0IHR5cGUgeyBEZWxldGVBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4vbWVzc2FnZU1vZGlmaWVycy9EZWxldGVzJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZVJlY2VpcHRBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4vbWVzc2FnZU1vZGlmaWVycy9NZXNzYWdlUmVjZWlwdHMnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlUmVxdWVzdEF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi9tZXNzYWdlTW9kaWZpZXJzL01lc3NhZ2VSZXF1ZXN0cyc7XG5pbXBvcnQgdHlwZSB7IFJlYWRTeW5jQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuL21lc3NhZ2VNb2RpZmllcnMvUmVhZFN5bmNzJztcbmltcG9ydCB0eXBlIHsgVmlld1N5bmNBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4vbWVzc2FnZU1vZGlmaWVycy9WaWV3U3luY3MnO1xuaW1wb3J0IHR5cGUgeyBWaWV3T25jZU9wZW5TeW5jQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuL21lc3NhZ2VNb2RpZmllcnMvVmlld09uY2VPcGVuU3luY3MnO1xuaW1wb3J0IHsgUmVhZFN0YXR1cyB9IGZyb20gJy4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHR5cGUgeyBTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkIH0gZnJvbSAnLi9tZXNzYWdlcy9NZXNzYWdlU2VuZFN0YXRlJztcbmltcG9ydCB7IFNlbmRTdGF0dXMgfSBmcm9tICcuL21lc3NhZ2VzL01lc3NhZ2VTZW5kU3RhdGUnO1xuaW1wb3J0ICogYXMgQXR0YWNobWVudERvd25sb2FkcyBmcm9tICcuL21lc3NhZ2VNb2RpZmllcnMvQXR0YWNobWVudERvd25sb2Fkcyc7XG5pbXBvcnQgKiBhcyBDb252ZXJzYXRpb24gZnJvbSAnLi90eXBlcy9Db252ZXJzYXRpb24nO1xuaW1wb3J0ICogYXMgU3RpY2tlcnMgZnJvbSAnLi90eXBlcy9TdGlja2Vycyc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4vcHJvdG9idWYnO1xuaW1wb3J0IHsgb25SZXRyeVJlcXVlc3QsIG9uRGVjcnlwdGlvbkVycm9yIH0gZnJvbSAnLi91dGlsL2hhbmRsZVJldHJ5JztcbmltcG9ydCB7IHRoZW1lQ2hhbmdlZCB9IGZyb20gJy4vc2hpbXMvdGhlbWVDaGFuZ2VkJztcbmltcG9ydCB7IGNyZWF0ZUlQQ0V2ZW50cyB9IGZyb20gJy4vdXRpbC9jcmVhdGVJUENFdmVudHMnO1xuaW1wb3J0IHsgUmVtb3ZlQWxsQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vdHlwZXMvUmVtb3ZlQWxsQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBpc1ZhbGlkVXVpZCwgVVVJREtpbmQgfSBmcm9tICcuL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEIH0gZnJvbSAnLi90eXBlcy9VVUlEJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGxvYWRSZWNlbnRFbW9qaXMgfSBmcm9tICcuL3V0aWwvbG9hZFJlY2VudEVtb2ppcyc7XG5pbXBvcnQgeyBkZWxldGVBbGxMb2dzIH0gZnJvbSAnLi91dGlsL2RlbGV0ZUFsbExvZ3MnO1xuaW1wb3J0IHsgUmVhY3RXcmFwcGVyVmlldyB9IGZyb20gJy4vdmlld3MvUmVhY3RXcmFwcGVyVmlldyc7XG5pbXBvcnQgeyBUb2FzdENhcHRjaGFGYWlsZWQgfSBmcm9tICcuL2NvbXBvbmVudHMvVG9hc3RDYXB0Y2hhRmFpbGVkJztcbmltcG9ydCB7IFRvYXN0Q2FwdGNoYVNvbHZlZCB9IGZyb20gJy4vY29tcG9uZW50cy9Ub2FzdENhcHRjaGFTb2x2ZWQnO1xuaW1wb3J0IHsgVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZCB9IGZyb20gJy4vY29tcG9uZW50cy9Ub2FzdENvbnZlcnNhdGlvbkFyY2hpdmVkJztcbmltcG9ydCB7IFRvYXN0Q29udmVyc2F0aW9uVW5hcmNoaXZlZCB9IGZyb20gJy4vY29tcG9uZW50cy9Ub2FzdENvbnZlcnNhdGlvblVuYXJjaGl2ZWQnO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSAnLi91dGlsL3Nob3dUb2FzdCc7XG5pbXBvcnQgeyBzdGFydEludGVyYWN0aW9uTW9kZSB9IGZyb20gJy4vd2luZG93cy9zdGFydEludGVyYWN0aW9uTW9kZSc7XG5pbXBvcnQgdHlwZSB7IE1haW5XaW5kb3dTdGF0c1R5cGUgfSBmcm9tICcuL3dpbmRvd3MvY29udGV4dCc7XG5pbXBvcnQgeyBkZWxpdmVyeVJlY2VpcHRzSm9iUXVldWUgfSBmcm9tICcuL2pvYnMvZGVsaXZlcnlSZWNlaXB0c0pvYlF1ZXVlJztcbmltcG9ydCB7IHVwZGF0ZU91clVzZXJuYW1lIH0gZnJvbSAnLi91dGlsL3VwZGF0ZU91clVzZXJuYW1lJztcbmltcG9ydCB7IFJlYWN0aW9uU291cmNlIH0gZnJvbSAnLi9yZWFjdGlvbnMvUmVhY3Rpb25Tb3VyY2UnO1xuaW1wb3J0IHsgc2luZ2xlUHJvdG9Kb2JRdWV1ZSB9IGZyb20gJy4vam9icy9zaW5nbGVQcm90b0pvYlF1ZXVlJztcbmltcG9ydCB7IGdldEluaXRpYWxTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZ2V0SW5pdGlhbFN0YXRlJztcbmltcG9ydCB7IGNvbnZlcnNhdGlvbkpvYlF1ZXVlIH0gZnJvbSAnLi9qb2JzL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB7IFNlZW5TdGF0dXMgfSBmcm9tICcuL01lc3NhZ2VTZWVuU3RhdHVzJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyIGZyb20gJy4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSBBY2NvdW50TWFuYWdlciBmcm9tICcuL3RleHRzZWN1cmUvQWNjb3VudE1hbmFnZXInO1xuXG5jb25zdCBNQVhfQVRUQUNITUVOVF9ET1dOTE9BRF9BR0UgPSAzNjAwICogNzIgKiAxMDAwO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNPdmVySG91ckludG9QYXN0KHRpbWVzdGFtcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIGNvbnN0IEhPVVIgPSAxMDAwICogNjAgKiA2MDtcbiAgcmV0dXJuIGlzTnVtYmVyKHRpbWVzdGFtcCkgJiYgaXNPbGRlclRoYW4odGltZXN0YW1wLCBIT1VSKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFudXBTZXNzaW9uUmVzZXRzKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzZXNzaW9uUmVzZXRzID0gd2luZG93LnN0b3JhZ2UuZ2V0KFxuICAgICdzZXNzaW9uUmVzZXRzJyxcbiAgICA8U2Vzc2lvblJlc2V0c1R5cGU+e31cbiAgKTtcblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2Vzc2lvblJlc2V0cyk7XG4gIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHNlc3Npb25SZXNldHNba2V5XTtcbiAgICBpZiAoIXRpbWVzdGFtcCB8fCBpc092ZXJIb3VySW50b1Bhc3QodGltZXN0YW1wKSkge1xuICAgICAgZGVsZXRlIHNlc3Npb25SZXNldHNba2V5XTtcbiAgICB9XG4gIH0pO1xuXG4gIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnB1dCgnc2Vzc2lvblJlc2V0cycsIHNlc3Npb25SZXNldHMpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRBcHAoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wgPSBuZXcgd2luZG93LlNpZ25hbFByb3RvY29sU3RvcmUoKTtcblxuICBpZiAod2luZG93LmluaXRpYWxUaGVtZSA9PT0gVGhlbWVUeXBlLmxpZ2h0KSB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdsaWdodC10aGVtZScpO1xuICB9XG4gIGlmICh3aW5kb3cuaW5pdGlhbFRoZW1lID09PSBUaGVtZVR5cGUuZGFyaykge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay10aGVtZScpO1xuICB9XG5cbiAgY29uc3QgaWRsZURldGVjdG9yID0gbmV3IElkbGVEZXRlY3RvcigpO1xuXG4gIGF3YWl0IEtleWJvYXJkTGF5b3V0LmluaXRpYWxpemUoKTtcblxuICB3aW5kb3cuV2hpc3Blci5ldmVudHMgPSB3aW5kb3cuXy5jbG9uZSh3aW5kb3cuQmFja2JvbmUuRXZlbnRzKTtcbiAgd2luZG93LlNpZ25hbC5VdGlsLk1lc3NhZ2VDb250cm9sbGVyLmluc3RhbGwoKTtcbiAgd2luZG93LlNpZ25hbC5jb252ZXJzYXRpb25Db250cm9sbGVyU3RhcnQoKTtcbiAgd2luZG93LnN0YXJ0dXBQcm9jZXNzaW5nUXVldWUgPSBuZXcgd2luZG93LlNpZ25hbC5VdGlsLlN0YXJ0dXBRdWV1ZSgpO1xuICBub3RpZmljYXRpb25TZXJ2aWNlLmluaXRpYWxpemUoe1xuICAgIGkxOG46IHdpbmRvdy5pMThuLFxuICAgIHN0b3JhZ2U6IHdpbmRvdy5zdG9yYWdlLFxuICB9KTtcbiAgd2luZG93LmF0dGFjaG1lbnREb3dubG9hZFF1ZXVlID0gW107XG5cbiAgYXdhaXQgd2luZG93LlNpZ25hbC5VdGlsLmluaXRpYWxpemVNZXNzYWdlQ291bnRlcigpO1xuXG4gIGxldCBpbml0aWFsQmFkZ2VzU3RhdGU6IEJhZGdlc1N0YXRlVHlwZSA9IHsgYnlJZDoge30gfTtcbiAgYXN5bmMgZnVuY3Rpb24gbG9hZEluaXRpYWxCYWRnZXNTdGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbml0aWFsQmFkZ2VzU3RhdGUgPSB7XG4gICAgICBieUlkOiB3aW5kb3cuU2lnbmFsLlV0aWwubWFrZUxvb2t1cChcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldEFsbEJhZGdlcygpLFxuICAgICAgICAnaWQnXG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICAvLyBJbml0aWFsaXplIFdlYkFQSSBhcyBlYXJseSBhcyBwb3NzaWJsZVxuICBsZXQgc2VydmVyOiBXZWJBUElUeXBlIHwgdW5kZWZpbmVkO1xuICBsZXQgbWVzc2FnZVJlY2VpdmVyOiBNZXNzYWdlUmVjZWl2ZXIgfCB1bmRlZmluZWQ7XG4gIGxldCBjaGFsbGVuZ2VIYW5kbGVyOiBDaGFsbGVuZ2VIYW5kbGVyIHwgdW5kZWZpbmVkO1xuXG4gIHdpbmRvdy5zdG9yYWdlLm9ucmVhZHkoKCkgPT4ge1xuICAgIHNlcnZlciA9IHdpbmRvdy5XZWJBUEkuY29ubmVjdChcbiAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRXZWJBUElDcmVkZW50aWFscygpXG4gICAgKTtcbiAgICB3aW5kb3cudGV4dHNlY3VyZS5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cbiAgICBpbml0aWFsaXplQWxsSm9iUXVldWVzKHtcbiAgICAgIHNlcnZlcixcbiAgICB9KTtcblxuICAgIGNoYWxsZW5nZUhhbmRsZXIgPSBuZXcgQ2hhbGxlbmdlSGFuZGxlcih7XG4gICAgICBzdG9yYWdlOiB3aW5kb3cuc3RvcmFnZSxcblxuICAgICAgc3RhcnRRdWV1ZShjb252ZXJzYXRpb25JZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbkpvYlF1ZXVlLnJlc29sdmVWZXJpZmljYXRpb25XYWl0ZXIoY29udmVyc2F0aW9uSWQpO1xuICAgICAgfSxcblxuICAgICAgcmVxdWVzdENoYWxsZW5nZShyZXF1ZXN0KSB7XG4gICAgICAgIHdpbmRvdy5zZW5kQ2hhbGxlbmdlUmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgIH0sXG5cbiAgICAgIGFzeW5jIHNlbmRDaGFsbGVuZ2VSZXNwb25zZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnaW5nIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgICAgICAgaWYgKCFtZXNzYWdpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlbmRDaGFsbGVuZ2VSZXNwb25zZTogbWVzc2FnaW5nIGlzIG5vdCBhdmFpbGFibGUhJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgbWVzc2FnaW5nLnNlbmRDaGFsbGVuZ2VSZXNwb25zZShkYXRhKTtcbiAgICAgIH0sXG5cbiAgICAgIG9uQ2hhbGxlbmdlRmFpbGVkKCkge1xuICAgICAgICAvLyBUT0RPOiBERVNLVE9QLTE1MzBcbiAgICAgICAgLy8gRGlzcGxheSBodW1hbml6ZWQgYHJldHJ5QWZ0ZXJgXG4gICAgICAgIHNob3dUb2FzdChUb2FzdENhcHRjaGFGYWlsZWQpO1xuICAgICAgfSxcblxuICAgICAgb25DaGFsbGVuZ2VTb2x2ZWQoKSB7XG4gICAgICAgIHNob3dUb2FzdChUb2FzdENhcHRjaGFTb2x2ZWQpO1xuICAgICAgfSxcblxuICAgICAgc2V0Q2hhbGxlbmdlU3RhdHVzKGNoYWxsZW5nZVN0YXR1cykge1xuICAgICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLm5ldHdvcmsuc2V0Q2hhbGxlbmdlU3RhdHVzKGNoYWxsZW5nZVN0YXR1cyk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9uKCdjaGFsbGVuZ2VSZXNwb25zZScsIHJlc3BvbnNlID0+IHtcbiAgICAgIGlmICghY2hhbGxlbmdlSGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNoYWxsZW5nZSBoYW5kbGVyIHRvIGJlIHRoZXJlJyk7XG4gICAgICB9XG5cbiAgICAgIGNoYWxsZW5nZUhhbmRsZXIub25SZXNwb25zZShyZXNwb25zZSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuU2lnbmFsLmNoYWxsZW5nZUhhbmRsZXIgPSBjaGFsbGVuZ2VIYW5kbGVyO1xuXG4gICAgbG9nLmluZm8oJ0luaXRpYWxpemluZyBNZXNzYWdlUmVjZWl2ZXInKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIgPSBuZXcgTWVzc2FnZVJlY2VpdmVyKHtcbiAgICAgIHNlcnZlcixcbiAgICAgIHN0b3JhZ2U6IHdpbmRvdy5zdG9yYWdlLFxuICAgICAgc2VydmVyVHJ1c3RSb290OiB3aW5kb3cuZ2V0U2VydmVyVHJ1c3RSb290KCksXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBxdWV1ZWRFdmVudExpc3RlbmVyPEFyZ3MgZXh0ZW5kcyBBcnJheTx1bmtub3duPj4oXG4gICAgICBoYW5kbGVyOiAoLi4uYXJnczogQXJncykgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQsXG4gICAgICB0cmFjayA9IHRydWVcbiAgICApOiAoLi4uYXJnczogQXJncykgPT4gdm9pZCB7XG4gICAgICByZXR1cm4gKC4uLmFyZ3M6IEFyZ3MpOiB2b2lkID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyUXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlciguLi5hcmdzKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgLy8gbWVzc2FnZS9zZW50OiBNZXNzYWdlLmhhbmRsZURhdGFNZXNzYWdlIGhhcyBpdHMgb3duIHF1ZXVlIGFuZCB3aWxsXG4gICAgICAgICAgICAvLyAgIHRyaWdnZXIgdGhpcyBldmVudCBpdHNlbGYgd2hlbiBjb21wbGV0ZS5cbiAgICAgICAgICAgIC8vIGVycm9yOiBFcnJvciBwcm9jZXNzaW5nIChiZWxvdykgYWxzbyBoYXMgaXRzIG93biBxdWV1ZSBhbmQgc2VsZi10cmlnZ2VyLlxuICAgICAgICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCdpbmNyZW1lbnRQcm9ncmVzcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2VudmVsb3BlJyxcbiAgICAgIHF1ZXVlZEV2ZW50TGlzdGVuZXIob25FbnZlbG9wZVJlY2VpdmVkLCBmYWxzZSlcbiAgICApO1xuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ21lc3NhZ2UnLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvbk1lc3NhZ2VSZWNlaXZlZCwgZmFsc2UpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdkZWxpdmVyeScsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uRGVsaXZlcnlSZWNlaXB0KVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY29udGFjdCcsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uQ29udGFjdFJlY2VpdmVkKVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY29udGFjdFN5bmMnLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvbkNvbnRhY3RTeW5jQ29tcGxldGUpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdncm91cCcsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uR3JvdXBSZWNlaXZlZClcbiAgICApO1xuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2dyb3VwU3luYycsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uR3JvdXBTeW5jQ29tcGxldGUpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdzZW50JyxcbiAgICAgIHF1ZXVlZEV2ZW50TGlzdGVuZXIob25TZW50TWVzc2FnZSwgZmFsc2UpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZWFkU3luYycsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uUmVhZFN5bmMpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICd2aWV3U3luYycsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uVmlld1N5bmMpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZWFkJyxcbiAgICAgIHF1ZXVlZEV2ZW50TGlzdGVuZXIob25SZWFkUmVjZWlwdClcbiAgICApO1xuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3ZpZXcnLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvblZpZXdSZWNlaXB0KVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZXJyb3InLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvbkVycm9yLCBmYWxzZSlcbiAgICApO1xuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2RlY3J5cHRpb24tZXJyb3InLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcigoZXZlbnQ6IERlY3J5cHRpb25FcnJvckV2ZW50KSA9PiB7XG4gICAgICAgIG9uRGVjcnlwdGlvbkVycm9yUXVldWUuYWRkKCgpID0+IG9uRGVjcnlwdGlvbkVycm9yKGV2ZW50KSk7XG4gICAgICB9KVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncmV0cnktcmVxdWVzdCcsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKChldmVudDogUmV0cnlSZXF1ZXN0RXZlbnQpID0+IHtcbiAgICAgICAgb25SZXRyeVJlcXVlc3RRdWV1ZS5hZGQoKCkgPT4gb25SZXRyeVJlcXVlc3QoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignZW1wdHknLCBxdWV1ZWRFdmVudExpc3RlbmVyKG9uRW1wdHkpKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjb25maWd1cmF0aW9uJyxcbiAgICAgIHF1ZXVlZEV2ZW50TGlzdGVuZXIob25Db25maWd1cmF0aW9uKVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3R5cGluZycsIHF1ZXVlZEV2ZW50TGlzdGVuZXIob25UeXBpbmcpKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdzdGlja2VyLXBhY2snLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvblN0aWNrZXJQYWNrKVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAndmlld09uY2VPcGVuU3luYycsXG4gICAgICBxdWV1ZWRFdmVudExpc3RlbmVyKG9uVmlld09uY2VPcGVuU3luYylcbiAgICApO1xuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ21lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UnLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvbk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UpXG4gICAgKTtcbiAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdwcm9maWxlS2V5VXBkYXRlJyxcbiAgICAgIHF1ZXVlZEV2ZW50TGlzdGVuZXIob25Qcm9maWxlS2V5VXBkYXRlKVxuICAgICk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZmV0Y2hMYXRlc3QnLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvbkZldGNoTGF0ZXN0U3luYylcbiAgICApO1xuICAgIG1lc3NhZ2VSZWNlaXZlci5hZGRFdmVudExpc3RlbmVyKCdrZXlzJywgcXVldWVkRXZlbnRMaXN0ZW5lcihvbktleXNTeW5jKSk7XG4gICAgbWVzc2FnZVJlY2VpdmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncG5pSWRlbnRpdHknLFxuICAgICAgcXVldWVkRXZlbnRMaXN0ZW5lcihvblBOSUlkZW50aXR5U3luYylcbiAgICApO1xuICB9KTtcblxuICBvdXJQcm9maWxlS2V5U2VydmljZS5pbml0aWFsaXplKHdpbmRvdy5zdG9yYWdlKTtcblxuICB3aW5kb3cuc3RvcmFnZS5vbnJlYWR5KCgpID0+IHtcbiAgICBpZiAoIXdpbmRvdy5zdG9yYWdlLmdldCgnZGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yJykpIHtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChcbiAgICAgICAgJ2RlZmF1bHRDb252ZXJzYXRpb25Db2xvcicsXG4gICAgICAgIERFRkFVTFRfQ09OVkVSU0FUSU9OX0NPTE9SXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHJlc29sdmVPbkFwcFZpZXc6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgY29uc3Qgb25BcHBWaWV3ID0gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgcmVzb2x2ZU9uQXBwVmlldyA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIGNvbnN0IHJlY29ubmVjdEJhY2tPZmYgPSBuZXcgQmFja09mZihGSUJPTkFDQ0lfVElNRU9VVFMpO1xuXG4gIHdpbmRvdy5zdG9yYWdlLm9ucmVhZHkoKCkgPT4ge1xuICAgIHN0cmljdEFzc2VydChzZXJ2ZXIsICdXZWJBUEkgbm90IHJlYWR5Jyk7XG5cbiAgICBzZW5kZXJDZXJ0aWZpY2F0ZVNlcnZpY2UuaW5pdGlhbGl6ZSh7XG4gICAgICBzZXJ2ZXIsXG4gICAgICBuYXZpZ2F0b3IsXG4gICAgICBvbmxpbmVFdmVudFRhcmdldDogd2luZG93LFxuICAgICAgc3RvcmFnZTogd2luZG93LnN0b3JhZ2UsXG4gICAgfSk7XG5cbiAgICBhcmVXZUFTdWJzY3JpYmVyU2VydmljZS51cGRhdGUod2luZG93LnN0b3JhZ2UsIHNlcnZlcik7XG4gIH0pO1xuXG4gIGNvbnN0IGV2ZW50SGFuZGxlclF1ZXVlID0gbmV3IHdpbmRvdy5QUXVldWUoe1xuICAgIGNvbmN1cnJlbmN5OiAxLFxuICAgIHRpbWVvdXQ6IDEwMDAgKiA2MCAqIDIsXG4gIH0pO1xuXG4gIGNvbnN0IHByb2ZpbGVLZXlSZXNwb25zZVF1ZXVlID0gbmV3IHdpbmRvdy5QUXVldWUoKTtcbiAgcHJvZmlsZUtleVJlc3BvbnNlUXVldWUucGF1c2UoKTtcblxuICBjb25zdCBsaWdodFNlc3Npb25SZXNldFF1ZXVlID0gbmV3IHdpbmRvdy5QUXVldWUoKTtcbiAgd2luZG93LlNpZ25hbC5TZXJ2aWNlcy5saWdodFNlc3Npb25SZXNldFF1ZXVlID0gbGlnaHRTZXNzaW9uUmVzZXRRdWV1ZTtcbiAgbGlnaHRTZXNzaW9uUmVzZXRRdWV1ZS5wYXVzZSgpO1xuXG4gIGNvbnN0IG9uRGVjcnlwdGlvbkVycm9yUXVldWUgPSBuZXcgd2luZG93LlBRdWV1ZSgpO1xuICBvbkRlY3J5cHRpb25FcnJvclF1ZXVlLnBhdXNlKCk7XG5cbiAgY29uc3Qgb25SZXRyeVJlcXVlc3RRdWV1ZSA9IG5ldyB3aW5kb3cuUFF1ZXVlKCk7XG4gIG9uUmV0cnlSZXF1ZXN0UXVldWUucGF1c2UoKTtcblxuICB3aW5kb3cuV2hpc3Blci5kZWxpdmVyeVJlY2VpcHRRdWV1ZSA9IG5ldyB3aW5kb3cuUFF1ZXVlKHtcbiAgICBjb25jdXJyZW5jeTogMSxcbiAgICB0aW1lb3V0OiAxMDAwICogNjAgKiAyLFxuICB9KTtcbiAgd2luZG93LldoaXNwZXIuZGVsaXZlcnlSZWNlaXB0UXVldWUucGF1c2UoKTtcbiAgd2luZG93LldoaXNwZXIuZGVsaXZlcnlSZWNlaXB0QmF0Y2hlciA9XG4gICAgd2luZG93LlNpZ25hbC5VdGlsLmNyZWF0ZUJhdGNoZXI8UmVjZWlwdD4oe1xuICAgICAgbmFtZTogJ1doaXNwZXIuZGVsaXZlcnlSZWNlaXB0QmF0Y2hlcicsXG4gICAgICB3YWl0OiA1MDAsXG4gICAgICBtYXhTaXplOiAxMDAsXG4gICAgICBwcm9jZXNzQmF0Y2g6IGFzeW5jIGRlbGl2ZXJ5UmVjZWlwdHMgPT4ge1xuICAgICAgICBhd2FpdCBkZWxpdmVyeVJlY2VpcHRzSm9iUXVldWUuYWRkKHsgZGVsaXZlcnlSZWNlaXB0cyB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgaWYgKHdpbmRvdy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoaXNXaW5kb3dEcmFnRWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICAgIHdpbmRvdy50aXRsZUJhckRvdWJsZUNsaWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBHbG9iYWxseSBkaXNhYmxlIGRyYWcgYW5kIGRyb3BcbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFxuICAgICdkcmFnb3ZlcicsXG4gICAgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0sXG4gICAgZmFsc2VcbiAgKTtcbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFxuICAgICdkcm9wJyxcbiAgICBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSxcbiAgICBmYWxzZVxuICApO1xuXG4gIHN0YXJ0SW50ZXJhY3Rpb25Nb2RlKCk7XG5cbiAgLy8gTG9hZCB0aGVzZSBpbWFnZXMgbm93IHRvIGVuc3VyZSB0aGF0IHRoZXkgZG9uJ3QgZmxpY2tlciBvbiBmaXJzdCB1c2VcbiAgd2luZG93LnByZWxvYWRlZEltYWdlcyA9IFtdO1xuICBmdW5jdGlvbiBwcmVsb2FkKGxpc3Q6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPikge1xuICAgIGZvciAobGV0IGluZGV4ID0gMCwgbWF4ID0gbGlzdC5sZW5ndGg7IGluZGV4IDwgbWF4OyBpbmRleCArPSAxKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gYC4vaW1hZ2VzLyR7bGlzdFtpbmRleF19YDtcbiAgICAgIHdpbmRvdy5wcmVsb2FkZWRJbWFnZXMucHVzaChpbWFnZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVpbHRJbkltYWdlcyA9IGF3YWl0IHdpbmRvdy5nZXRCdWlsdEluSW1hZ2VzKCk7XG4gIHByZWxvYWQoYnVpbHRJbkltYWdlcyk7XG5cbiAgLy8gV2UgYWRkIHRoaXMgdG8gd2luZG93IGhlcmUgYmVjYXVzZSB0aGUgZGVmYXVsdCBOb2RlIGNvbnRleHQgaXMgZXJhc2VkIGF0IHRoZSBlbmRcbiAgLy8gICBvZiBwcmVsb2FkLmpzIHByb2Nlc3NpbmdcbiAgd2luZG93LnNldEltbWVkaWF0ZSA9IHdpbmRvdy5ub2RlU2V0SW1tZWRpYXRlO1xuXG4gIGNvbnN0IHsgTWVzc2FnZSB9ID0gd2luZG93LlNpZ25hbC5UeXBlcztcbiAgY29uc3Qge1xuICAgIHVwZ3JhZGVNZXNzYWdlU2NoZW1hLFxuICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgZGVsZXRlQXR0YWNobWVudERhdGEsXG4gICAgZG9lc0F0dGFjaG1lbnRFeGlzdCxcbiAgfSA9IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucztcblxuICBsb2cuaW5mbygnYmFja2dyb3VuZCBwYWdlIHJlbG9hZGVkJyk7XG4gIGxvZy5pbmZvKCdlbnZpcm9ubWVudDonLCB3aW5kb3cuZ2V0RW52aXJvbm1lbnQoKSk7XG5cbiAgbGV0IG5ld1ZlcnNpb24gPSBmYWxzZTtcbiAgbGV0IGxhc3RWZXJzaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gd2luZG93LmdldFRpdGxlKCk7XG5cbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAnbGFuZycsXG4gICAgd2luZG93LmdldExvY2FsZSgpLnN1YnN0cmluZygwLCAyKVxuICApO1xuXG4gIEtleUNoYW5nZUxpc3RlbmVyLmluaXQod2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbCk7XG4gIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wub24oJ3JlbW92ZVByZUtleScsIChvdXJVdWlkOiBVVUlEKSA9PiB7XG4gICAgY29uc3QgdXVpZEtpbmQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0T3VyVXVpZEtpbmQob3VyVXVpZCk7XG4gICAgd2luZG93LmdldEFjY291bnRNYW5hZ2VyKCkucmVmcmVzaFByZUtleXModXVpZEtpbmQpO1xuICB9KTtcblxuICB3aW5kb3cuZ2V0U29ja2V0U3RhdHVzID0gKCkgPT4ge1xuICAgIGlmIChzZXJ2ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFNvY2tldFN0YXR1cy5DTE9TRUQ7XG4gICAgfVxuICAgIHJldHVybiBzZXJ2ZXIuZ2V0U29ja2V0U3RhdHVzKCk7XG4gIH07XG4gIGxldCBhY2NvdW50TWFuYWdlcjogQWNjb3VudE1hbmFnZXI7XG4gIHdpbmRvdy5nZXRBY2NvdW50TWFuYWdlciA9ICgpID0+IHtcbiAgICBpZiAoYWNjb3VudE1hbmFnZXIpIHtcbiAgICAgIHJldHVybiBhY2NvdW50TWFuYWdlcjtcbiAgICB9XG4gICAgaWYgKCFzZXJ2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0QWNjb3VudE1hbmFnZXI6IHNlcnZlciBpcyBub3QgYXZhaWxhYmxlIScpO1xuICAgIH1cblxuICAgIGFjY291bnRNYW5hZ2VyID0gbmV3IHdpbmRvdy50ZXh0c2VjdXJlLkFjY291bnRNYW5hZ2VyKHNlcnZlcik7XG4gICAgYWNjb3VudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcigncmVnaXN0cmF0aW9uJywgKCkgPT4ge1xuICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLnRyaWdnZXIoJ3VzZXJDaGFuZ2VkJywgZmFsc2UpO1xuXG4gICAgICB3aW5kb3cuU2lnbmFsLlV0aWwuUmVnaXN0cmF0aW9uLm1hcmtEb25lKCk7XG4gICAgICBsb2cuaW5mbygnZGlzcGF0Y2hpbmcgcmVnaXN0cmF0aW9uIGV2ZW50Jyk7XG4gICAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMudHJpZ2dlcigncmVnaXN0cmF0aW9uX2RvbmUnKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWNjb3VudE1hbmFnZXI7XG4gIH07XG5cbiAgY29uc3QgY2FuY2VsSW5pdGlhbGl6YXRpb25NZXNzYWdlID0gc2V0QXBwTG9hZGluZ1NjcmVlbk1lc3NhZ2UoXG4gICAgdW5kZWZpbmVkLFxuICAgIHdpbmRvdy5pMThuXG4gICk7XG5cbiAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJdGVtQnlJZCgndmVyc2lvbicpO1xuICBpZiAoIXZlcnNpb24pIHtcbiAgICBjb25zdCBpc0luZGV4ZWREQlByZXNlbnQgPSBhd2FpdCBpbmRleGVkRGIuZG9lc0RhdGFiYXNlRXhpc3QoKTtcbiAgICBpZiAoaXNJbmRleGVkREJQcmVzZW50KSB7XG4gICAgICBsb2cuaW5mbygnRm91bmQgSW5kZXhlZERCIGRhdGFiYXNlLicpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9nLmluZm8oJ0NvbmZpcm1pbmcgZGVsZXRpb24gb2Ygb2xkIGRhdGEgd2l0aCB1c2VyLi4uJyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc2hvd0NvbmZpcm1hdGlvbkRpYWxvZyh7XG4gICAgICAgICAgICAgIG9uVG9wT2ZFdmVyeXRoaW5nOiB0cnVlLFxuICAgICAgICAgICAgICBjYW5jZWxUZXh0OiB3aW5kb3cuaTE4bigncXVpdCcpLFxuICAgICAgICAgICAgICBjb25maXJtU3R5bGU6ICduZWdhdGl2ZScsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IHdpbmRvdy5pMThuKCdkZWxldGVPbGRJbmRleGVkREJEYXRhJyksXG4gICAgICAgICAgICAgIG9rVGV4dDogd2luZG93LmkxOG4oJ2RlbGV0ZU9sZERhdGEnKSxcbiAgICAgICAgICAgICAgcmVqZWN0OiAoKSA9PiByZWplY3QoKSxcbiAgICAgICAgICAgICAgcmVzb2x2ZTogKCkgPT4gcmVzb2x2ZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAnVXNlciBjaG9zZSBub3QgdG8gZGVsZXRlIG9sZCBkYXRhLiBTaHV0dGluZyBkb3duLicsXG4gICAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIHdpbmRvdy5zaHV0ZG93bigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZy5pbmZvKCdEZWxldGluZyBhbGwgcHJldmlvdXNseS1taWdyYXRlZCBkYXRhIGluIFNRTC4uLicpO1xuICAgICAgICBsb2cuaW5mbygnRGVsZXRpbmcgSW5kZXhlZERCIGZpbGUuLi4nKTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgaW5kZXhlZERiLnJlbW92ZURhdGFiYXNlKCksXG4gICAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUFsbCgpLFxuICAgICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVJbmRleGVkREJGaWxlcygpLFxuICAgICAgICBdKTtcbiAgICAgICAgbG9nLmluZm8oJ0RvbmUgd2l0aCBTUUwgZGVsZXRpb24gYW5kIEluZGV4ZWREQiBmaWxlIGRlbGV0aW9uLicpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICdGYWlsZWQgdG8gcmVtb3ZlIEluZGV4ZWREQiBmaWxlIG9yIHJlbW92ZSBTUUwgZGF0YTonLFxuICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgYSBmbGFnIHRvIGRlbGV0ZSBJbmRleGVkREIgb24gbmV4dCBzdGFydHVwIGlmIGl0IHdhc24ndCBkZWxldGVkIGp1c3Qgbm93LlxuICAgICAgLy8gV2UgbmVlZCB0byB1c2UgZGlyZWN0IGRhdGEgY2FsbHMsIHNpbmNlIHdpbmRvdy5zdG9yYWdlIGlzbid0IHJlYWR5IHlldC5cbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUl0ZW0oe1xuICAgICAgICBpZDogJ2luZGV4ZWRkYi1kZWxldGUtbmVlZGVkJyxcbiAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBsb2cuaW5mbygnU3RvcmFnZSBmZXRjaCcpO1xuICB3aW5kb3cuc3RvcmFnZS5mZXRjaCgpO1xuXG4gIGZ1bmN0aW9uIG1hcE9sZFRoZW1lVG9OZXcoXG4gICAgdGhlbWU6IFJlYWRvbmx5PFxuICAgICAgJ3N5c3RlbScgfCAnbGlnaHQnIHwgJ2RhcmsnIHwgJ2FuZHJvaWQnIHwgJ2lvcycgfCAnYW5kcm9pZC1kYXJrJ1xuICAgID5cbiAgKTogJ3N5c3RlbScgfCAnbGlnaHQnIHwgJ2RhcmsnIHtcbiAgICBzd2l0Y2ggKHRoZW1lKSB7XG4gICAgICBjYXNlICdkYXJrJzpcbiAgICAgIGNhc2UgJ2xpZ2h0JzpcbiAgICAgIGNhc2UgJ3N5c3RlbSc6XG4gICAgICAgIHJldHVybiB0aGVtZTtcbiAgICAgIGNhc2UgJ2FuZHJvaWQtZGFyayc6XG4gICAgICAgIHJldHVybiAnZGFyayc7XG4gICAgICBjYXNlICdhbmRyb2lkJzpcbiAgICAgIGNhc2UgJ2lvcyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2xpZ2h0JztcbiAgICB9XG4gIH1cblxuICAvLyBXZSBuZWVkIHRoaXMgJ2ZpcnN0JyBjaGVjayBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gc3RhcnQgdGhlIGFwcCB1cCBhbnkgb3RoZXIgdGltZVxuICAvLyAgIHRoYW4gdGhlIGZpcnN0IHRpbWUuIEFuZCB3aW5kb3cuc3RvcmFnZS5mZXRjaCgpIHdpbGwgY2F1c2Ugb25yZWFkeSgpIHRvIGZpcmUuXG4gIGxldCBmaXJzdCA9IHRydWU7XG4gIHdpbmRvdy5zdG9yYWdlLm9ucmVhZHkoYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZmlyc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmlyc3QgPSBmYWxzZTtcblxuICAgIHN0cmljdEFzc2VydChzZXJ2ZXIgIT09IHVuZGVmaW5lZCwgJ1dlYkFQSSBub3QgcmVhZHknKTtcblxuICAgIGNsZWFudXBTZXNzaW9uUmVzZXRzKCk7XG5cbiAgICAvLyBUaGVzZSBtYWtlIGtleSBvcGVyYXRpb25zIGF2YWlsYWJsZSB0byBJUEMgaGFuZGxlcnMgY3JlYXRlZCBpbiBwcmVsb2FkLmpzXG4gICAgd2luZG93LkV2ZW50cyA9IGNyZWF0ZUlQQ0V2ZW50cyh7XG4gICAgICBzaHV0ZG93bjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBsb2cuaW5mbygnYmFja2dyb3VuZC9zaHV0ZG93bicpO1xuXG4gICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5mbHVzaE1lc3NhZ2VDb3VudGVyKCk7XG5cbiAgICAgICAgLy8gU3RvcCBiYWNrZ3JvdW5kIHByb2Nlc3NpbmdcbiAgICAgICAgQXR0YWNobWVudERvd25sb2Fkcy5zdG9wKCk7XG4gICAgICAgIGlkbGVEZXRlY3Rvci5zdG9wKCk7XG5cbiAgICAgICAgLy8gU3RvcCBwcm9jZXNzaW5nIGluY29taW5nIG1lc3NhZ2VzXG4gICAgICAgIGlmIChtZXNzYWdlUmVjZWl2ZXIpIHtcbiAgICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgICBzZXJ2ZXIgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICdXZWJBUEkgc2hvdWxkIGJlIGluaXRpYWxpemVkIHRvZ2V0aGVyIHdpdGggTWVzc2FnZVJlY2VpdmVyJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgbG9nLmluZm8oJ2JhY2tncm91bmQvc2h1dGRvd246IHNodXR0aW5nIGRvd24gbWVzc2FnZVJlY2VpdmVyJyk7XG4gICAgICAgICAgc2VydmVyLnVucmVnaXN0ZXJSZXF1ZXN0SGFuZGxlcihtZXNzYWdlUmVjZWl2ZXIpO1xuICAgICAgICAgIG1lc3NhZ2VSZWNlaXZlci5zdG9wUHJvY2Vzc2luZygpO1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy53YWl0Rm9yQWxsQmF0Y2hlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZy5pbmZvKCdiYWNrZ3JvdW5kL3NodXRkb3duOiBmbHVzaGluZyBjb252ZXJzYXRpb25zJyk7XG5cbiAgICAgICAgLy8gRmx1c2ggZGVib3VuY2VkIHVwZGF0ZXMgZm9yIGNvbnZlcnNhdGlvbnNcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0QWxsKCkubWFwKGNvbnZvID0+XG4gICAgICAgICAgICBjb252by5mbHVzaERlYm91bmNlZFVwZGF0ZXMoKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBsb2cuaW5mbygnYmFja2dyb3VuZC9zaHV0ZG93bjogd2FpdGluZyBmb3IgYWxsIGJhdGNoZXJzJyk7XG5cbiAgICAgICAgLy8gQSBudW1iZXIgb2Ygc3RpbGwtdG8tcXVldWUgZGF0YWJhc2UgcXVlcmllcyBtaWdodCBiZSB3YWl0aW5nIGluc2lkZSBiYXRjaGVycy5cbiAgICAgICAgLy8gICBXZSB3YWl0IGZvciB0aGVzZSB0byBlbXB0eSBmaXJzdCwgYW5kIHRoZW4gc2h1dCBkb3duIHRoZSBkYXRhIGludGVyZmFjZS5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgIHdpbmRvdy53YWl0Rm9yQWxsQmF0Y2hlcnMoKSxcbiAgICAgICAgICB3aW5kb3cud2FpdEZvckFsbFdhaXRCYXRjaGVycygpLFxuICAgICAgICBdKTtcblxuICAgICAgICBsb2cuaW5mbygnYmFja2dyb3VuZC9zaHV0ZG93bjogY2xvc2luZyB0aGUgZGF0YWJhc2UnKTtcblxuICAgICAgICAvLyBTaHV0IGRvd24gdGhlIGRhdGEgaW50ZXJmYWNlIGNsZWFubHlcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNodXRkb3duKCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHdpbmRvdy5FdmVudHMuZ2V0Wm9vbUZhY3RvcigpO1xuICAgIHdlYkZyYW1lLnNldFpvb21GYWN0b3Ioem9vbUZhY3Rvcik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS16b29tLWZhY3RvcicsIHpvb21GYWN0b3IudG9TdHJpbmcoKSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgJy0tem9vbS1mYWN0b3InLFxuICAgICAgICB3ZWJGcmFtZS5nZXRab29tRmFjdG9yKCkudG9TdHJpbmcoKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIEhvdyBsb25nIHNpbmNlIHdlIHdlcmUgbGFzdCBydW5uaW5nP1xuICAgIGNvbnN0IGxhc3RIZWFydGJlYXQgPSB0b0RheU1pbGxpcyh3aW5kb3cuc3RvcmFnZS5nZXQoJ2xhc3RIZWFydGJlYXQnLCAwKSk7XG4gICAgY29uc3QgcHJldmlvdXNMYXN0U3RhcnR1cCA9IHdpbmRvdy5zdG9yYWdlLmdldCgnbGFzdFN0YXJ0dXAnKTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wdXQoJ2xhc3RTdGFydHVwJywgRGF0ZS5ub3coKSk7XG5cbiAgICBjb25zdCBUSElSVFlfREFZUyA9IDMwICogMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgICBpZiAobGFzdEhlYXJ0YmVhdCA+IDAgJiYgaXNPbGRlclRoYW4obGFzdEhlYXJ0YmVhdCwgVEhJUlRZX0RBWVMpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYFRoaXMgaW5zdGFuY2UgaGFzIG5vdCBiZWVuIHVzZWQgZm9yIDMwIGRheXMuIExhc3QgaGVhcnRiZWF0OiAke2xhc3RIZWFydGJlYXR9LiBMYXN0IHN0YXJ0dXA6ICR7cHJldmlvdXNMYXN0U3RhcnR1cH0uYFxuICAgICAgKTtcbiAgICAgIGF3YWl0IHVubGlua0FuZERpc2Nvbm5lY3QoUmVtb3ZlQWxsQ29uZmlndXJhdGlvbi5Tb2Z0KTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCBoZWFydGJlYXQgdGltZXJcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2xhc3RIZWFydGJlYXQnLCB0b0RheU1pbGxpcyhEYXRlLm5vdygpKSk7XG4gICAgY29uc3QgVFdFTFZFX0hPVVJTID0gMTIgKiA2MCAqIDYwICogMTAwMDtcbiAgICBzZXRJbnRlcnZhbChcbiAgICAgICgpID0+IHdpbmRvdy5zdG9yYWdlLnB1dCgnbGFzdEhlYXJ0YmVhdCcsIHRvRGF5TWlsbGlzKERhdGUubm93KCkpKSxcbiAgICAgIFRXRUxWRV9IT1VSU1xuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9IHdpbmRvdy5nZXRWZXJzaW9uKCk7XG4gICAgbGFzdFZlcnNpb24gPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3ZlcnNpb24nKTtcbiAgICBuZXdWZXJzaW9uID0gIWxhc3RWZXJzaW9uIHx8IGN1cnJlbnRWZXJzaW9uICE9PSBsYXN0VmVyc2lvbjtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wdXQoJ3ZlcnNpb24nLCBjdXJyZW50VmVyc2lvbik7XG5cbiAgICBpZiAobmV3VmVyc2lvbiAmJiBsYXN0VmVyc2lvbikge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBOZXcgdmVyc2lvbiBkZXRlY3RlZDogJHtjdXJyZW50VmVyc2lvbn07IHByZXZpb3VzOiAke2xhc3RWZXJzaW9ufWBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJlbW90ZUJ1aWxkRXhwaXJhdGlvbiA9IHdpbmRvdy5zdG9yYWdlLmdldCgncmVtb3RlQnVpbGRFeHBpcmF0aW9uJyk7XG4gICAgICBpZiAocmVtb3RlQnVpbGRFeHBpcmF0aW9uKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBDbGVhcmluZyByZW1vdGVCdWlsZEV4cGlyYXRpb24uIFByZXZpb3VzIHZhbHVlIHdhcyAke3JlbW90ZUJ1aWxkRXhwaXJhdGlvbn1gXG4gICAgICAgICk7XG4gICAgICAgIHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgncmVtb3RlQnVpbGRFeHBpcmF0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3aW5kb3cuaXNCZWZvcmVWZXJzaW9uKGxhc3RWZXJzaW9uLCAndjEuMjkuMi1iZXRhLjEnKSkge1xuICAgICAgICAvLyBTdGlja2VycyBmbGFnc1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdzaG93U3RpY2tlcnNJbnRyb2R1Y3Rpb24nLCB0cnVlKSxcbiAgICAgICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3Nob3dTdGlja2VyUGlja2VySGludCcsIHRydWUpLFxuICAgICAgICBdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5pc0JlZm9yZVZlcnNpb24obGFzdFZlcnNpb24sICd2MS4yNi4wJykpIHtcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgd2UgcmUtcmVnaXN0ZXIgb3VyIHN1cHBvcnQgZm9yIHNlYWxlZCBzZW5kZXJcbiAgICAgICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHV0KFxuICAgICAgICAgICdoYXNSZWdpc3RlclN1cHBvcnRGb3JVbmF1dGhlbnRpY2F0ZWREZWxpdmVyeScsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGhlbWVTZXR0aW5nID0gd2luZG93LkV2ZW50cy5nZXRUaGVtZVNldHRpbmcoKTtcbiAgICAgIGNvbnN0IG5ld1RoZW1lU2V0dGluZyA9IG1hcE9sZFRoZW1lVG9OZXcodGhlbWVTZXR0aW5nKTtcbiAgICAgIGlmICh3aW5kb3cuaXNCZWZvcmVWZXJzaW9uKGxhc3RWZXJzaW9uLCAndjEuMjUuMCcpKSB7XG4gICAgICAgIGlmIChuZXdUaGVtZVNldHRpbmcgPT09IHdpbmRvdy5zeXN0ZW1UaGVtZSkge1xuICAgICAgICAgIHdpbmRvdy5FdmVudHMuc2V0VGhlbWVTZXR0aW5nKCdzeXN0ZW0nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuRXZlbnRzLnNldFRoZW1lU2V0dGluZyhuZXdUaGVtZVNldHRpbmcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgd2luZG93LmlzQmVmb3JlVmVyc2lvbihsYXN0VmVyc2lvbiwgJ3YxLjM2LjAtYmV0YS4xJykgJiZcbiAgICAgICAgd2luZG93LmlzQWZ0ZXJWZXJzaW9uKGxhc3RWZXJzaW9uLCAndjEuMzUuMC1iZXRhLjEnKVxuICAgICAgKSB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuU2VydmljZXMuZXJhc2VBbGxTdG9yYWdlU2VydmljZVN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3aW5kb3cuaXNCZWZvcmVWZXJzaW9uKGxhc3RWZXJzaW9uLCAndjUuMi4wJykpIHtcbiAgICAgICAgY29uc3QgbGVnYWN5U2VuZGVyQ2VydGlmaWNhdGVTdG9yYWdlS2V5ID0gJ3NlbmRlckNlcnRpZmljYXRlV2l0aFV1aWQnO1xuICAgICAgICBhd2FpdCByZW1vdmVTdG9yYWdlS2V5Sm9iUXVldWUuYWRkKHtcbiAgICAgICAgICBrZXk6IGxlZ2FjeVNlbmRlckNlcnRpZmljYXRlU3RvcmFnZUtleSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3aW5kb3cuaXNCZWZvcmVWZXJzaW9uKGxhc3RWZXJzaW9uLCAndjUuMTguMCcpKSB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnc2VuZGVyQ2VydGlmaWNhdGUnKTtcbiAgICAgICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucmVtb3ZlKCdzZW5kZXJDZXJ0aWZpY2F0ZU5vRTE2NCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAod2luZG93LmlzQmVmb3JlVmVyc2lvbihsYXN0VmVyc2lvbiwgJ3Y1LjE5LjAnKSkge1xuICAgICAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5yZW1vdmUoR1JPVVBfQ1JFREVOVElBTFNfS0VZKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5pc0JlZm9yZVZlcnNpb24obGFzdFZlcnNpb24sICd2NS4zNy4wLWFscGhhJykpIHtcbiAgICAgICAgY29uc3QgbGVnYWN5Q2hhbGxlbmdlS2V5ID0gJ2NoYWxsZW5nZTpyZXRyeS1tZXNzYWdlLWlkcyc7XG4gICAgICAgIGF3YWl0IHJlbW92ZVN0b3JhZ2VLZXlKb2JRdWV1ZS5hZGQoe1xuICAgICAgICAgIGtleTogbGVnYWN5Q2hhbGxlbmdlS2V5LFxuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY2xlYXJBbGxFcnJvclN0aWNrZXJQYWNrQXR0ZW1wdHMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhpcyBvbmUgc2hvdWxkIGFsd2F5cyBiZSBsYXN0IC0gaXQgY291bGQgcmVzdGFydCB0aGUgYXBwXG4gICAgICBpZiAod2luZG93LmlzQmVmb3JlVmVyc2lvbihsYXN0VmVyc2lvbiwgJ3Y1LjMwLjAtYWxwaGEnKSkge1xuICAgICAgICBhd2FpdCBkZWxldGVBbGxMb2dzKCk7XG4gICAgICAgIHdpbmRvdy5yZXN0YXJ0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBcHBMb2FkaW5nU2NyZWVuTWVzc2FnZShcbiAgICAgIHdpbmRvdy5pMThuKCdvcHRpbWl6aW5nQXBwbGljYXRpb24nKSxcbiAgICAgIHdpbmRvdy5pMThuXG4gICAgKTtcblxuICAgIGlmIChuZXdWZXJzaW9uKSB7XG4gICAgICAvLyBXZSd2ZSByZWNlaXZlZCByZXBvcnRzIHRoYXQgdGhpcyB1cGRhdGUgY2FuIHRha2UgbG9uZ2VyIHRoYW4gdHdvIG1pbnV0ZXMsIHNvIHdlXG4gICAgICAvLyAgIGFsbG93IGl0IHRvIGNvbnRpbnVlIGFuZCBqdXN0IG1vdmUgb24gaW4gdGhhdCB0aW1lb3V0IGNhc2UuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY2xlYW51cE9ycGhhbmVkQXR0YWNobWVudHMoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnYmFja2dyb3VuZDogRmFpbGVkIHRvIGNsZWFudXAgb3JwaGFuZWQgYXR0YWNobWVudHM6JyxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gRG9uJ3QgYmxvY2sgb24gdGhlIGZvbGxvd2luZyBvcGVyYXRpb25cbiAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5lbnN1cmVGaWxlUGVybWlzc2lvbnMoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnN0YXJ0SW5SZW5kZXJlclByb2Nlc3MoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy5lcnJvcignU1FMIGZhaWxlZCB0byBpbml0aWFsaXplJywgZXJyICYmIGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycik7XG4gICAgfVxuXG4gICAgc2V0QXBwTG9hZGluZ1NjcmVlbk1lc3NhZ2Uod2luZG93LmkxOG4oJ2xvYWRpbmcnKSwgd2luZG93LmkxOG4pO1xuXG4gICAgbGV0IGlzTWlncmF0aW9uV2l0aEluZGV4Q29tcGxldGUgPSBmYWxzZTtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBTdGFydGluZyBiYWNrZ3JvdW5kIGRhdGEgbWlncmF0aW9uLiBUYXJnZXQgdmVyc2lvbjogJHtNZXNzYWdlLkNVUlJFTlRfU0NIRU1BX1ZFUlNJT059YFxuICAgICk7XG4gICAgaWRsZURldGVjdG9yLm9uKCdpZGxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgTlVNX01FU1NBR0VTX1BFUl9CQVRDSCA9IDEwMDtcbiAgICAgIGNvbnN0IEJBVENIX0RFTEFZID0gNSAqIGR1cmF0aW9ucy5TRUNPTkQ7XG5cbiAgICAgIGlmICghaXNNaWdyYXRpb25XaXRoSW5kZXhDb21wbGV0ZSkge1xuICAgICAgICBjb25zdCBiYXRjaFdpdGhJbmRleCA9IGF3YWl0IG1pZ3JhdGVNZXNzYWdlRGF0YSh7XG4gICAgICAgICAgbnVtTWVzc2FnZXNQZXJCYXRjaDogTlVNX01FU1NBR0VTX1BFUl9CQVRDSCxcbiAgICAgICAgICB1cGdyYWRlTWVzc2FnZVNjaGVtYSxcbiAgICAgICAgICBnZXRNZXNzYWdlc05lZWRpbmdVcGdyYWRlOlxuICAgICAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLmdldE1lc3NhZ2VzTmVlZGluZ1VwZ3JhZGUsXG4gICAgICAgICAgc2F2ZU1lc3NhZ2VzOiB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2VzLFxuICAgICAgICB9KTtcbiAgICAgICAgbG9nLmluZm8oJ1VwZ3JhZGUgbWVzc2FnZSBzY2hlbWEgKHdpdGggaW5kZXgpOicsIGJhdGNoV2l0aEluZGV4KTtcbiAgICAgICAgaXNNaWdyYXRpb25XaXRoSW5kZXhDb21wbGV0ZSA9IGJhdGNoV2l0aEluZGV4LmRvbmU7XG4gICAgICB9XG5cbiAgICAgIGlkbGVEZXRlY3Rvci5zdG9wKCk7XG5cbiAgICAgIGlmIChpc01pZ3JhdGlvbldpdGhJbmRleENvbXBsZXRlKSB7XG4gICAgICAgIGxvZy5pbmZvKCdCYWNrZ3JvdW5kIG1pZ3JhdGlvbiBjb21wbGV0ZS4gU3RvcHBpbmcgaWRsZSBkZXRlY3Rvci4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5pbmZvKCdCYWNrZ3JvdW5kIG1pZ3JhdGlvbiBub3QgY29tcGxldGUuIFBhdXNpbmcgaWRsZSBkZXRlY3Rvci4nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZGxlRGV0ZWN0b3Iuc3RhcnQoKTtcbiAgICAgICAgfSwgQkFUQ0hfREVMQVkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LlNpZ25hbC5SZW1vdGVDb25maWcuaW5pdFJlbW90ZUNvbmZpZyhzZXJ2ZXIpO1xuXG4gICAgbGV0IHJldHJ5UmVjZWlwdExpZmVzcGFuOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIHJldHJ5UmVjZWlwdExpZmVzcGFuID0gcGFyc2VJbnRPclRocm93KFxuICAgICAgICB3aW5kb3cuU2lnbmFsLlJlbW90ZUNvbmZpZy5nZXRWYWx1ZSgnZGVza3RvcC5yZXRyeVJlY2VpcHRMaWZlc3BhbicpLFxuICAgICAgICAncmV0cnlSZWNlaXB0TGlmZVNwYW4nXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ0ZhaWxlZCB0byBwYXJzZSBpbnRlZ2VyIG91dCBvZiBkZXNrdG9wLnJldHJ5UmVjZWlwdExpZmVzcGFuIGZlYXR1cmUgZmxhZydcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcmV0cnlQbGFjZWhvbGRlcnMgPSBuZXcgd2luZG93LlNpZ25hbC5VdGlsLlJldHJ5UGxhY2Vob2xkZXJzKHtcbiAgICAgIHJldHJ5UmVjZWlwdExpZmVzcGFuLFxuICAgIH0pO1xuICAgIHdpbmRvdy5TaWduYWwuU2VydmljZXMucmV0cnlQbGFjZWhvbGRlcnMgPSByZXRyeVBsYWNlaG9sZGVycztcblxuICAgIHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBIT1VSID0gMTAwMCAqIDYwICogNjA7XG4gICAgICBjb25zdCBEQVkgPSAyNCAqIEhPVVI7XG4gICAgICBsZXQgc2VudFByb3RvTWF4QWdlID0gMTQgKiBEQVk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHNlbnRQcm90b01heEFnZSA9IHBhcnNlSW50T3JUaHJvdyhcbiAgICAgICAgICB3aW5kb3cuU2lnbmFsLlJlbW90ZUNvbmZpZy5nZXRWYWx1ZSgnZGVza3RvcC5yZXRyeVJlc3BvbmRNYXhBZ2UnKSxcbiAgICAgICAgICAncmV0cnlSZXNwb25kTWF4QWdlJ1xuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgJ2JhY2tncm91bmQvc2V0SW50ZXJ2YWw6IEZhaWxlZCB0byBwYXJzZSBpbnRlZ2VyIGZyb20gZGVza3RvcC5yZXRyeVJlc3BvbmRNYXhBZ2UgZmVhdHVyZSBmbGFnJyxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmRlbGV0ZVNlbnRQcm90b3NPbGRlclRoYW4oXG4gICAgICAgICAgbm93IC0gc2VudFByb3RvTWF4QWdlXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ2JhY2tncm91bmQvb25yZWFkeS9zZXRJbnRlcnZhbDogRXJyb3IgZGVsZXRpbmcgc2VudCBwcm90b3M6ICcsXG4gICAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGV4cGlyZWQgPSBhd2FpdCByZXRyeVBsYWNlaG9sZGVycy5nZXRFeHBpcmVkQW5kUmVtb3ZlKCk7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGByZXRyeVBsYWNlaG9sZGVycy9pbnRlcnZhbDogRm91bmQgJHtleHBpcmVkLmxlbmd0aH0gZXhwaXJlZCBpdGVtc2BcbiAgICAgICAgKTtcbiAgICAgICAgZXhwaXJlZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIHNlbmRlclV1aWQsIHNlbnRBdCB9ID0gaXRlbTtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPVxuICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCByZWNlaXZlZEF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IHJlY2VpdmVkQXRDb3VudGVyID1cbiAgICAgICAgICAgICAgd2luZG93LlNpZ25hbC5VdGlsLmluY3JlbWVudE1lc3NhZ2VDb3VudGVyKCk7XG4gICAgICAgICAgICBjb252ZXJzYXRpb24ucXVldWVKb2IoJ2FkZERlbGl2ZXJ5SXNzdWUnLCAoKSA9PlxuICAgICAgICAgICAgICBjb252ZXJzYXRpb24uYWRkRGVsaXZlcnlJc3N1ZSh7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZWRBdCxcbiAgICAgICAgICAgICAgICByZWNlaXZlZEF0Q291bnRlcixcbiAgICAgICAgICAgICAgICBzZW5kZXJVdWlkLFxuICAgICAgICAgICAgICAgIHNlbnRBdCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnYmFja2dyb3VuZC9vbnJlYWR5L3NldEludGVydmFsOiBFcnJvciBnZXR0aW5nIGV4cGlyZWQgcmV0cnkgcGxhY2Vob2xkZXJzOiAnLFxuICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIEZJVkVfTUlOVVRFUyk7XG5cbiAgICBsZXQgbWFpbldpbmRvd1N0YXRzID0ge1xuICAgICAgaXNNYXhpbWl6ZWQ6IGZhbHNlLFxuICAgICAgaXNGdWxsU2NyZWVuOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgbGV0IG1lbnVPcHRpb25zID0ge1xuICAgICAgZGV2ZWxvcG1lbnQ6IGZhbHNlLFxuICAgICAgZGV2VG9vbHM6IGZhbHNlLFxuICAgICAgaW5jbHVkZVNldHVwOiBmYWxzZSxcbiAgICAgIGlzUHJvZHVjdGlvbjogdHJ1ZSxcbiAgICAgIHBsYXRmb3JtOiAndW5rbm93bicsXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmxvYWQoKSxcbiAgICAgICAgU3RpY2tlcnMubG9hZCgpLFxuICAgICAgICBsb2FkUmVjZW50RW1vamlzKCksXG4gICAgICAgIGxvYWRJbml0aWFsQmFkZ2VzU3RhdGUoKSxcbiAgICAgICAgbG9hZFN0b3JpZXMoKSxcbiAgICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5oeWRyYXRlQ2FjaGVzKCksXG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbWFpbldpbmRvd1N0YXRzID0gYXdhaXQgd2luZG93LlNpZ25hbENvbnRleHQuZ2V0TWFpbldpbmRvd1N0YXRzKCk7XG4gICAgICAgIH0pKCksXG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbWVudU9wdGlvbnMgPSBhd2FpdCB3aW5kb3cuU2lnbmFsQ29udGV4dC5nZXRNZW51T3B0aW9ucygpO1xuICAgICAgICB9KSgpLFxuICAgICAgXSk7XG4gICAgICBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5jaGVja0ZvckNvbmZsaWN0cygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdiYWNrZ3JvdW5kLmpzOiBDb252ZXJzYXRpb25Db250cm9sbGVyIGZhaWxlZCB0byBsb2FkOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaW5pdGlhbGl6ZVJlZHV4KHsgbWFpbldpbmRvd1N0YXRzLCBtZW51T3B0aW9ucyB9KTtcbiAgICAgIHN0YXJ0KCk7XG4gICAgICB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLmluaXRpYWxpemVOZXR3b3JrT2JzZXJ2ZXIoXG4gICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMubmV0d29ya1xuICAgICAgKTtcbiAgICAgIHdpbmRvdy5TaWduYWwuU2VydmljZXMuaW5pdGlhbGl6ZVVwZGF0ZUxpc3RlbmVyKFxuICAgICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLnVwZGF0ZXNcbiAgICAgICk7XG4gICAgICB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLmNhbGxpbmcuaW5pdGlhbGl6ZShcbiAgICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jYWxsaW5nLFxuICAgICAgICB3aW5kb3cuZ2V0U2Z1VXJsKClcbiAgICAgICk7XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmV4cGlyYXRpb24uaHlkcmF0ZUV4cGlyYXRpb25TdGF0dXMoXG4gICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5oYXNFeHBpcmVkKClcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplUmVkdXgoe1xuICAgIG1haW5XaW5kb3dTdGF0cyxcbiAgICBtZW51T3B0aW9ucyxcbiAgfToge1xuICAgIG1haW5XaW5kb3dTdGF0czogTWFpbldpbmRvd1N0YXRzVHlwZTtcbiAgICBtZW51T3B0aW9uczogTWVudU9wdGlvbnNUeXBlO1xuICB9KSB7XG4gICAgLy8gSGVyZSB3ZSBzZXQgdXAgYSBmdWxsIHJlZHV4IHN0b3JlIHdpdGggaW5pdGlhbCBzdGF0ZSBmb3Igb3VyIExlZnRQYW5lIFJvb3RcbiAgICBjb25zdCBjb252b0NvbGxlY3Rpb24gPSB3aW5kb3cuZ2V0Q29udmVyc2F0aW9ucygpO1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IGdldEluaXRpYWxTdGF0ZSh7XG4gICAgICBiYWRnZXM6IGluaXRpYWxCYWRnZXNTdGF0ZSxcbiAgICAgIHN0b3JpZXM6IGdldFN0b3JpZXNGb3JSZWR1eCgpLFxuICAgICAgbWFpbldpbmRvd1N0YXRzLFxuICAgICAgbWVudU9wdGlvbnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdG9yZSA9IHdpbmRvdy5TaWduYWwuU3RhdGUuY3JlYXRlU3RvcmUoaW5pdGlhbFN0YXRlKTtcbiAgICB3aW5kb3cucmVkdXhTdG9yZSA9IHN0b3JlO1xuXG4gICAgLy8gQmluZGluZyB0aGVzZSBhY3Rpb25zIHRvIG91ciByZWR1eCBzdG9yZSBhbmQgZXhwb3NpbmcgdGhlbSBhbGxvd3MgdXMgdG8gdXBkYXRlXG4gICAgLy8gICByZWR1eCB3aGVuIHRoaW5ncyBjaGFuZ2UgaW4gdGhlIGJhY2tib25lIHdvcmxkLlxuICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMgPSB7XG4gICAgICBhY2NvdW50czogYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLmFjY291bnRzLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgICBhcHA6IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycy5hcHAsIHN0b3JlLmRpc3BhdGNoKSxcbiAgICAgIGF1ZGlvUGxheWVyOiBiaW5kQWN0aW9uQ3JlYXRvcnMoXG4gICAgICAgIGFjdGlvbkNyZWF0b3JzLmF1ZGlvUGxheWVyLFxuICAgICAgICBzdG9yZS5kaXNwYXRjaFxuICAgICAgKSxcbiAgICAgIGF1ZGlvUmVjb3JkZXI6IGJpbmRBY3Rpb25DcmVhdG9ycyhcbiAgICAgICAgYWN0aW9uQ3JlYXRvcnMuYXVkaW9SZWNvcmRlcixcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2hcbiAgICAgICksXG4gICAgICBiYWRnZXM6IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycy5iYWRnZXMsIHN0b3JlLmRpc3BhdGNoKSxcbiAgICAgIGNhbGxpbmc6IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycy5jYWxsaW5nLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgICBjb21wb3NlcjogYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLmNvbXBvc2VyLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgICBjb252ZXJzYXRpb25zOiBiaW5kQWN0aW9uQ3JlYXRvcnMoXG4gICAgICAgIGFjdGlvbkNyZWF0b3JzLmNvbnZlcnNhdGlvbnMsXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoXG4gICAgICApLFxuICAgICAgY3Jhc2hSZXBvcnRzOiBiaW5kQWN0aW9uQ3JlYXRvcnMoXG4gICAgICAgIGFjdGlvbkNyZWF0b3JzLmNyYXNoUmVwb3J0cyxcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2hcbiAgICAgICksXG4gICAgICBlbW9qaXM6IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycy5lbW9qaXMsIHN0b3JlLmRpc3BhdGNoKSxcbiAgICAgIGV4cGlyYXRpb246IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycy5leHBpcmF0aW9uLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgICBnbG9iYWxNb2RhbHM6IGJpbmRBY3Rpb25DcmVhdG9ycyhcbiAgICAgICAgYWN0aW9uQ3JlYXRvcnMuZ2xvYmFsTW9kYWxzLFxuICAgICAgICBzdG9yZS5kaXNwYXRjaFxuICAgICAgKSxcbiAgICAgIGl0ZW1zOiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMuaXRlbXMsIHN0b3JlLmRpc3BhdGNoKSxcbiAgICAgIGxpbmtQcmV2aWV3czogYmluZEFjdGlvbkNyZWF0b3JzKFxuICAgICAgICBhY3Rpb25DcmVhdG9ycy5saW5rUHJldmlld3MsXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoXG4gICAgICApLFxuICAgICAgbmV0d29yazogYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLm5ldHdvcmssIHN0b3JlLmRpc3BhdGNoKSxcbiAgICAgIHNhZmV0eU51bWJlcjogYmluZEFjdGlvbkNyZWF0b3JzKFxuICAgICAgICBhY3Rpb25DcmVhdG9ycy5zYWZldHlOdW1iZXIsXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoXG4gICAgICApLFxuICAgICAgc2VhcmNoOiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMuc2VhcmNoLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgICBzdGlja2VyczogYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLnN0aWNrZXJzLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgICBzdG9yaWVzOiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMuc3Rvcmllcywgc3RvcmUuZGlzcGF0Y2gpLFxuICAgICAgdXBkYXRlczogYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLnVwZGF0ZXMsIHN0b3JlLmRpc3BhdGNoKSxcbiAgICAgIHVzZXI6IGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycy51c2VyLCBzdG9yZS5kaXNwYXRjaCksXG4gICAgfTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNvbnZlcnNhdGlvbkFkZGVkLFxuICAgICAgY29udmVyc2F0aW9uQ2hhbmdlZCxcbiAgICAgIGNvbnZlcnNhdGlvblJlbW92ZWQsXG4gICAgICByZW1vdmVBbGxDb252ZXJzYXRpb25zLFxuICAgIH0gPSB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnM7XG5cbiAgICBjb252b0NvbGxlY3Rpb24ub24oJ3JlbW92ZScsIGNvbnZlcnNhdGlvbiA9PiB7XG4gICAgICBjb25zdCB7IGlkIH0gPSBjb252ZXJzYXRpb24gfHwge307XG5cbiAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCd1bmxvYWQnLCAncmVtb3ZlZCcpO1xuICAgICAgY29udmVyc2F0aW9uUmVtb3ZlZChpZCk7XG4gICAgfSk7XG4gICAgY29udm9Db2xsZWN0aW9uLm9uKCdhZGQnLCBjb252ZXJzYXRpb24gPT4ge1xuICAgICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29udmVyc2F0aW9uQWRkZWQoY29udmVyc2F0aW9uLmlkLCBjb252ZXJzYXRpb24uZm9ybWF0KCkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hhbmdlZENvbnZvQmF0Y2hlciA9IGNyZWF0ZUJhdGNoZXI8Q29udmVyc2F0aW9uTW9kZWw+KHtcbiAgICAgIG5hbWU6ICdjaGFuZ2VkQ29udm9CYXRjaGVyJyxcbiAgICAgIHByb2Nlc3NCYXRjaChiYXRjaCkge1xuICAgICAgICBjb25zdCBkZWR1cGVkID0gbmV3IFNldChiYXRjaCk7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdjaGFuZ2VkQ29udm9CYXRjaGVyOiBkZWR1cGVkICcgK1xuICAgICAgICAgICAgYCR7YmF0Y2gubGVuZ3RofSBpbnRvICR7ZGVkdXBlZC5zaXplfWBcbiAgICAgICAgKTtcblxuICAgICAgICBiYXRjaERpc3BhdGNoKCgpID0+IHtcbiAgICAgICAgICBkZWR1cGVkLmZvckVhY2goY29udmVyc2F0aW9uID0+IHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkNoYW5nZWQoY29udmVyc2F0aW9uLmlkLCBjb252ZXJzYXRpb24uZm9ybWF0KCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFRoaXMgZGVsYXkgZW5zdXJlcyB0aGF0IHRoZSAuZm9ybWF0KCkgY2FsbCBpc24ndCBzeW5jaHJvbm91cyBhcyBhXG4gICAgICAvLyAgIEJhY2tib25lIHByb3BlcnR5IGlzIGNoYW5nZWQuIEltcG9ydGFudCBiZWNhdXNlIG91ciBfYnlVdWlkL19ieUUxNjRcbiAgICAgIC8vICAgbG9va3VwcyBhcmVuJ3QgdXAtdG8tZGF0ZSBhcyB0aGUgY2hhbmdlIGhhcHBlbnM7IGp1c3QgYSBsaXR0bGUgYml0XG4gICAgICAvLyAgIGFmdGVyLlxuICAgICAgd2FpdDogMSxcbiAgICAgIG1heFNpemU6IEluZmluaXR5LFxuICAgIH0pO1xuXG4gICAgY29udm9Db2xsZWN0aW9uLm9uKCdwcm9wcy1jaGFuZ2UnLCAoY29udmVyc2F0aW9uLCBpc0JhdGNoZWQpID0+IHtcbiAgICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYGlzQmF0Y2hlZGAgaXMgdHJ1ZSB3aGVuIHRoZSBgLnNldCgpYCBjYWxsIG9uIHRoZSBjb252ZXJzYXRpb24gbW9kZWxcbiAgICAgIC8vIGFscmVhZHkgcnVucyBmcm9tIHdpdGhpbiBgcmVhY3QtcmVkdXhgJ3MgYmF0Y2guIEluc3RlYWQgb2YgYmF0Y2hpbmdcbiAgICAgIC8vIHRoZSByZWR1eCB1cGRhdGUgZm9yIGxhdGVyIC0gY2xlYXIgYWxsIHF1ZXVlZCB1cGRhdGVzIGFuZCB1cGRhdGVcbiAgICAgIC8vIGltbWVkaWF0ZWx5LlxuICAgICAgaWYgKGlzQmF0Y2hlZCkge1xuICAgICAgICBjaGFuZ2VkQ29udm9CYXRjaGVyLnJlbW92ZUFsbChjb252ZXJzYXRpb24pO1xuICAgICAgICBjb252ZXJzYXRpb25DaGFuZ2VkKGNvbnZlcnNhdGlvbi5pZCwgY29udmVyc2F0aW9uLmZvcm1hdCgpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjaGFuZ2VkQ29udm9CYXRjaGVyLmFkZChjb252ZXJzYXRpb24pO1xuICAgIH0pO1xuICAgIGNvbnZvQ29sbGVjdGlvbi5vbigncmVzZXQnLCByZW1vdmVBbGxDb252ZXJzYXRpb25zKTtcblxuICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbigndXNlckNoYW5nZWQnLCAocmVjb25uZWN0ID0gZmFsc2UpID0+IHtcbiAgICAgIGNvbnN0IG5ld0RldmljZUlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldERldmljZUlkKCk7XG4gICAgICBjb25zdCBuZXdOdW1iZXIgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG4gICAgICBjb25zdCBuZXdVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoKT8udG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbiA9XG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbigpO1xuXG4gICAgICBpZiAob3VyQ29udmVyc2F0aW9uPy5nZXQoJ2UxNjQnKSAhPT0gbmV3TnVtYmVyKSB7XG4gICAgICAgIG91ckNvbnZlcnNhdGlvbj8uc2V0KCdlMTY0JywgbmV3TnVtYmVyKTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy51c2VyLnVzZXJDaGFuZ2VkKHtcbiAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6IG91ckNvbnZlcnNhdGlvbj8uZ2V0KCdpZCcpLFxuICAgICAgICBvdXJEZXZpY2VJZDogbmV3RGV2aWNlSWQsXG4gICAgICAgIG91ck51bWJlcjogbmV3TnVtYmVyLFxuICAgICAgICBvdXJVdWlkOiBuZXdVdWlkLFxuICAgICAgICByZWdpb25Db2RlOiB3aW5kb3cuc3RvcmFnZS5nZXQoJ3JlZ2lvbkNvZGUnKSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICAgIGxvZy5pbmZvKCdiYWNrZ3JvdW5kOiByZWNvbm5lY3Rpbmcgd2Vic29ja2V0IG9uIHVzZXIgY2hhbmdlJyk7XG4gICAgICAgIGVucXVldWVSZWNvbm5lY3RUb1dlYlNvY2tldCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9uKFxuICAgICAgJ3NldFdpbmRvd1N0YXRzJyxcbiAgICAgICh7XG4gICAgICAgIGlzRnVsbFNjcmVlbixcbiAgICAgICAgaXNNYXhpbWl6ZWQsXG4gICAgICB9OiB7XG4gICAgICAgIGlzRnVsbFNjcmVlbjogYm9vbGVhbjtcbiAgICAgICAgaXNNYXhpbWl6ZWQ6IGJvb2xlYW47XG4gICAgICB9KSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMudXNlci51c2VyQ2hhbmdlZCh7XG4gICAgICAgICAgaXNNYWluV2luZG93TWF4aW1pemVkOiBpc01heGltaXplZCxcbiAgICAgICAgICBpc01haW5XaW5kb3dGdWxsU2NyZWVuOiBpc0Z1bGxTY3JlZW4sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3NldE1lbnVPcHRpb25zJywgKG9wdGlvbnM6IE1lbnVPcHRpb25zVHlwZSkgPT4ge1xuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy51c2VyLnVzZXJDaGFuZ2VkKHsgbWVudU9wdGlvbnM6IG9wdGlvbnMgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc2hvcnRjdXRHdWlkZVZpZXc6IFdoYXRJc1RoaXMgfCBudWxsID0gbnVsbDtcblxuICAgIHdpbmRvdy5zaG93S2V5Ym9hcmRTaG9ydGN1dHMgPSAoKSA9PiB7XG4gICAgICBpZiAoIXNob3J0Y3V0R3VpZGVWaWV3KSB7XG4gICAgICAgIHNob3J0Y3V0R3VpZGVWaWV3ID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoe1xuICAgICAgICAgIGNsYXNzTmFtZTogJ3Nob3J0Y3V0LWd1aWRlLXdyYXBwZXInLFxuICAgICAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVTaG9ydGN1dEd1aWRlTW9kYWwoXG4gICAgICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnRjdXRHdWlkZVZpZXcpIHtcbiAgICAgICAgICAgICAgICAgIHNob3J0Y3V0R3VpZGVWaWV3LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgc2hvcnRjdXRHdWlkZVZpZXcgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLFxuICAgICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgIHNob3J0Y3V0R3VpZGVWaWV3ID0gbnVsbDtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHsgY3RybEtleSwgbWV0YUtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuXG4gICAgICBjb25zdCBjb21tYW5kS2V5ID0gd2luZG93LnBsYXRmb3JtID09PSAnZGFyd2luJyAmJiBtZXRhS2V5O1xuICAgICAgY29uc3QgY29udHJvbEtleSA9IHdpbmRvdy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicgJiYgY3RybEtleTtcbiAgICAgIGNvbnN0IGNvbW1hbmRPckN0cmwgPSBjb21tYW5kS2V5IHx8IGNvbnRyb2xLZXk7XG5cbiAgICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSWQgPSBzdGF0ZS5jb252ZXJzYXRpb25zLnNlbGVjdGVkQ29udmVyc2F0aW9uSWQ7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoc2VsZWN0ZWRJZCk7XG5cbiAgICAgIGNvbnN0IGtleSA9IEtleWJvYXJkTGF5b3V0Lmxvb2t1cChldmVudCk7XG5cbiAgICAgIC8vIE5BVklHQVRJT05cblxuICAgICAgLy8gU2hvdyBrZXlib2FyZCBzaG9ydGN1dHMgLSBoYW5kbGVkIGJ5IEVsZWN0cm9uLW1hbmFnZWQga2V5Ym9hcmQgc2hvcnRjdXRzXG4gICAgICAvLyBIb3dldmVyLCBvbiBsaW51eCBDdHJsKy8gc2VsZWN0cyBhbGwgdGV4dCwgc28gd2UgcHJldmVudCB0aGF0XG4gICAgICBpZiAoY29tbWFuZE9yQ3RybCAmJiBrZXkgPT09ICcvJykge1xuICAgICAgICB3aW5kb3cuc2hvd0tleWJvYXJkU2hvcnRjdXRzKCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBOYXZpZ2F0ZSBieSBzZWN0aW9uXG4gICAgICBpZiAoY29tbWFuZE9yQ3RybCAmJiAhc2hpZnRLZXkgJiYgKGtleSA9PT0gJ3QnIHx8IGtleSA9PT0gJ1QnKSkge1xuICAgICAgICB3aW5kb3cuZW50ZXJLZXlib2FyZE1vZGUoKTtcbiAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IHRhcmdldHM6IEFycmF5PEhUTUxFbGVtZW50IHwgbnVsbD4gPSBbXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZHVsZS1tYWluLWhlYWRlciAubW9kdWxlLWF2YXRhci1idXR0b24nKSxcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5tb2R1bGUtbGVmdC1wYW5lX19oZWFkZXJfX2NvbnRlbnRzX19iYWNrLWJ1dHRvbidcbiAgICAgICAgICApLFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5MZWZ0UGFuZVNlYXJjaElucHV0X19pbnB1dCcpLFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2R1bGUtbWFpbi1oZWFkZXJfX2NvbXBvc2UtaWNvbicpLFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAnLm1vZHVsZS1sZWZ0LXBhbmVfX2NvbXBvc2Utc2VhcmNoLWZvcm1fX2lucHV0J1xuICAgICAgICAgICksXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcubW9kdWxlLWNvbnZlcnNhdGlvbi1saXN0X19pdGVtLS1jb250YWN0LW9yLWNvbnZlcnNhdGlvbidcbiAgICAgICAgICApLFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdHMnKSxcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQ29tcG9zaXRpb25BcmVhIC5xbC1lZGl0b3InKSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgZm9jdXNlZEluZGV4ID0gdGFyZ2V0cy5maW5kSW5kZXgodGFyZ2V0ID0+IHtcbiAgICAgICAgICBpZiAoIXRhcmdldCB8fCAhZm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0ID09PSBmb2N1c2VkRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRhcmdldC5jb250YWlucyhmb2N1c2VkRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHRhcmdldHMubGVuZ3RoIC0gMTtcblxuICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgIGlmIChmb2N1c2VkSW5kZXggPCAwIHx8IGZvY3VzZWRJbmRleCA+PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5kZXggPSBmb2N1c2VkSW5kZXggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCF0YXJnZXRzW2luZGV4XSkge1xuICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgaWYgKGluZGV4ID4gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdGFyZ2V0c1tpbmRleF0hLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhbmNlbCBvdXQgb2Yga2V5Ym9hcmQgc2hvcnRjdXQgc2NyZWVuIC0gaGFzIGZpcnN0IHByZWNlZGVuY2VcbiAgICAgIGlmIChzaG9ydGN1dEd1aWRlVmlldyAmJiBrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHNob3J0Y3V0R3VpZGVWaWV3LnJlbW92ZSgpO1xuICAgICAgICBzaG9ydGN1dEd1aWRlVmlldyA9IG51bGw7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEVzY2FwZSBpcyBoZWF2aWx5IG92ZXJsb2FkZWQgLSBoZXJlIHdlIGF2b2lkIGNsYXNoZXMgd2l0aCBvdGhlciBFc2NhcGUgaGFuZGxlcnNcbiAgICAgIGlmIChrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIC8vIENoZWNrIG9yaWdpbiAtIGlmIHdpdGhpbiBhIHJlYWN0IGNvbXBvbmVudCB3aGljaCBoYW5kbGVzIGVzY2FwZSwgZG9uJ3QgaGFuZGxlLlxuICAgICAgICAvLyAgIFdoeT8gQmVjYXVzZSBSZWFjdCdzIHN5bnRoZXRpYyBldmVudHMgY2FuIGNhdXNlIGV2ZW50cyB0byBiZSBoYW5kbGVkIHR3aWNlLlxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIFdlIG1pZ2h0IHdhbnQgdG8gdXNlIE5hbWVkTm9kZU1hcC5nZXROYW1lZEl0ZW0oJ2NsYXNzJylcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGFyZ2V0ICYmXG4gICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMgJiZcbiAgICAgICAgICAodGFyZ2V0LmF0dHJpYnV0ZXMgYXMgYW55KS5jbGFzcyAmJlxuICAgICAgICAgICh0YXJnZXQuYXR0cmlidXRlcyBhcyBhbnkpLmNsYXNzLnZhbHVlXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICh0YXJnZXQuYXR0cmlidXRlcyBhcyBhbnkpLmNsYXNzLnZhbHVlO1xuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG4gICAgICAgICAgLy8gU2VhcmNoIGJveCB3YW50cyB0byBoYW5kbGUgZXZlbnRzIGludGVybmFsbHlcbiAgICAgICAgICBpZiAoY2xhc3NOYW1lLmluY2x1ZGVzKCdMZWZ0UGFuZVNlYXJjaElucHV0X19pbnB1dCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlc2UgYWRkIGxpc3RlbmVycyB0byBkb2N1bWVudCwgYnV0IHdlJ2xsIHJ1biBmaXJzdFxuICAgICAgICBjb25zdCBjb25maXJtYXRpb25Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy5tb2R1bGUtY29uZmlybWF0aW9uLWRpYWxvZ19fb3ZlcmxheSdcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNvbmZpcm1hdGlvbk1vZGFsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW1vamlQaWNrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kdWxlLWVtb2ppLXBpY2tlcicpO1xuICAgICAgICBpZiAoZW1vamlQaWNrZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaWdodEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5MaWdodGJveCcpO1xuICAgICAgICBpZiAobGlnaHRCb3gpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGlja2VyUGlja2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZHVsZS1zdGlja2VyLXBpY2tlcicpO1xuICAgICAgICBpZiAoc3RpY2tlclBpY2tlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0aWNrZXJQcmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLm1vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3ByZXZpZXctbW9kYWxfX292ZXJsYXknXG4gICAgICAgICk7XG4gICAgICAgIGlmIChzdGlja2VyUHJldmlldykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlYWN0aW9uVmlld2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLm1vZHVsZS1yZWFjdGlvbi12aWV3ZXInXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZWFjdGlvblZpZXdlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlYWN0aW9uUGlja2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZHVsZS1SZWFjdGlvblBpY2tlcicpO1xuICAgICAgICBpZiAocmVhY3Rpb25QaWNrZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kdWxlLWNvbnRhY3QtbW9kYWwnKTtcbiAgICAgICAgaWYgKGNvbnRhY3RNb2RhbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vZGFsSG9zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2R1bGUtbW9kYWwtaG9zdF9fb3ZlcmxheScpO1xuICAgICAgICBpZiAobW9kYWxIb3N0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNlbmQgRXNjYXBlIHRvIGFjdGl2ZSBjb252ZXJzYXRpb24gc28gaXQgY2FuIGNsb3NlIHBhbmVsc1xuICAgICAgaWYgKGNvbnZlcnNhdGlvbiAmJiBrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdlc2NhcGUtcHJlc3NlZCcpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVmZXJlbmNlcyAtIGhhbmRsZWQgYnkgRWxlY3Ryb24tbWFuYWdlZCBrZXlib2FyZCBzaG9ydGN1dHNcblxuICAgICAgLy8gT3BlbiB0aGUgdG9wLXJpZ2h0IG1lbnUgZm9yIGN1cnJlbnQgY29udmVyc2F0aW9uXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnZlcnNhdGlvbiAmJlxuICAgICAgICBjb21tYW5kT3JDdHJsICYmXG4gICAgICAgIHNoaWZ0S2V5ICYmXG4gICAgICAgIChrZXkgPT09ICdsJyB8fCBrZXkgPT09ICdMJylcbiAgICAgICkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcubW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYnV0dG9uLS1tb3JlJ1xuICAgICAgICApO1xuICAgICAgICBpZiAoIWJ1dHRvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlY2F1c2UgdGhlIG1lbnUgaXMgc2hvd24gYXQgYSBsb2NhdGlvbiBiYXNlZCBvbiB0aGUgaW5pdGlhdGluZyBjbGljaywgd2UgbmVlZFxuICAgICAgICAvLyAgIHRvIGZha2UgdXAgYSBtb3VzZSBldmVudCB0byBnZXQgdGhlIG1lbnUgdG8gc2hvdyBzb21ld2hlcmUgb3RoZXIgdGhhbiAoMCwwKS5cbiAgICAgICAgY29uc3QgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH0gPSBidXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICAgICAgLy8gVHlwZXMgZG8gbm90IG1hdGNoIHNpZ25hdHVyZVxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gICAgICAgIG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICB0cnVlLCAvLyBidWJibGVzXG4gICAgICAgICAgZmFsc2UsIC8vIGNhbmNlbGFibGVcbiAgICAgICAgICBudWxsIGFzIGFueSwgLy8gdmlld1xuICAgICAgICAgIG51bGwgYXMgYW55LCAvLyBkZXRhaWxcbiAgICAgICAgICAwLCAvLyBzY3JlZW5YLFxuICAgICAgICAgIDAsIC8vIHNjcmVlblksXG4gICAgICAgICAgeCArIHdpZHRoIC8gMixcbiAgICAgICAgICB5ICsgaGVpZ2h0IC8gMixcbiAgICAgICAgICBmYWxzZSwgLy8gY3RybEtleSxcbiAgICAgICAgICBmYWxzZSwgLy8gYWx0S2V5LFxuICAgICAgICAgIGZhbHNlLCAvLyBzaGlmdEtleSxcbiAgICAgICAgICBmYWxzZSwgLy8gbWV0YUtleSxcbiAgICAgICAgICBmYWxzZSBhcyBhbnksIC8vIGJ1dHRvbixcbiAgICAgICAgICBkb2N1bWVudC5ib2R5XG4gICAgICAgICk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG4gICAgICAgIGJ1dHRvbi5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEZvY3VzIGNvbXBvc2VyIGZpZWxkXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnZlcnNhdGlvbiAmJlxuICAgICAgICBjb21tYW5kT3JDdHJsICYmXG4gICAgICAgIHNoaWZ0S2V5ICYmXG4gICAgICAgIChrZXkgPT09ICd0JyB8fCBrZXkgPT09ICdUJylcbiAgICAgICkge1xuICAgICAgICBjb252ZXJzYXRpb24udHJpZ2dlcignZm9jdXMtY29tcG9zZXInKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gT3BlbiBhbGwgbWVkaWFcbiAgICAgIGlmIChcbiAgICAgICAgY29udmVyc2F0aW9uICYmXG4gICAgICAgIGNvbW1hbmRPckN0cmwgJiZcbiAgICAgICAgc2hpZnRLZXkgJiZcbiAgICAgICAgKGtleSA9PT0gJ20nIHx8IGtleSA9PT0gJ00nKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdvcGVuLWFsbC1tZWRpYScpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBPcGVuIGVtb2ppIHBpY2tlciAtIGhhbmRsZWQgYnkgY29tcG9uZW50XG5cbiAgICAgIC8vIE9wZW4gc3RpY2tlciBwaWNrZXIgLSBoYW5kbGVkIGJ5IGNvbXBvbmVudFxuXG4gICAgICAvLyBCZWdpbiByZWNvcmRpbmcgdm9pY2Ugbm90ZSAtIGhhbmRsZWQgYnkgY29tcG9uZW50XG5cbiAgICAgIC8vIEFyY2hpdmUgb3IgdW5hcmNoaXZlIGNvbnZlcnNhdGlvblxuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24gJiZcbiAgICAgICAgIWNvbnZlcnNhdGlvbi5nZXQoJ2lzQXJjaGl2ZWQnKSAmJlxuICAgICAgICBjb21tYW5kT3JDdHJsICYmXG4gICAgICAgIHNoaWZ0S2V5ICYmXG4gICAgICAgIChrZXkgPT09ICdhJyB8fCBrZXkgPT09ICdBJylcbiAgICAgICkge1xuICAgICAgICBjb252ZXJzYXRpb24uc2V0QXJjaGl2ZWQodHJ1ZSk7XG4gICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCd1bmxvYWQnLCAna2V5Ym9hcmQgc2hvcnRjdXQgYXJjaGl2ZScpO1xuICAgICAgICBzaG93VG9hc3QoVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZCwge1xuICAgICAgICAgIHVuZG86ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5zZXRBcmNoaXZlZChmYWxzZSk7XG4gICAgICAgICAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMudHJpZ2dlcihcbiAgICAgICAgICAgICAgJ3Nob3dDb252ZXJzYXRpb24nLFxuICAgICAgICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdpZCcpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEl0J3MgdmVyeSBsaWtlbHkgdGhhdCB0aGUgYWN0IG9mIGFyY2hpdmluZyBhIGNvbnZlcnNhdGlvbiB3aWxsIHNldCBmb2N1cyB0b1xuICAgICAgICAvLyAgICdub25lLCcgb3IgdGhlIHRvcC1sZXZlbCBib2R5IGVsZW1lbnQuIFRoaXMgcmVzZXRzIGl0IHRvIHRoZSBsZWZ0IHBhbmUuXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgY29uc3QgbGVmdFBhbmVFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcubW9kdWxlLWxlZnQtcGFuZV9fbGlzdCdcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChsZWZ0UGFuZUVsKSB7XG4gICAgICAgICAgICBsZWZ0UGFuZUVsLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgY29udmVyc2F0aW9uICYmXG4gICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ2lzQXJjaGl2ZWQnKSAmJlxuICAgICAgICBjb21tYW5kT3JDdHJsICYmXG4gICAgICAgIHNoaWZ0S2V5ICYmXG4gICAgICAgIChrZXkgPT09ICd1JyB8fCBrZXkgPT09ICdVJylcbiAgICAgICkge1xuICAgICAgICBjb252ZXJzYXRpb24uc2V0QXJjaGl2ZWQoZmFsc2UpO1xuICAgICAgICBzaG93VG9hc3QoVG9hc3RDb252ZXJzYXRpb25VbmFyY2hpdmVkKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTY3JvbGwgdG8gYm90dG9tIG9mIGxpc3QgLSBoYW5kbGVkIGJ5IGNvbXBvbmVudFxuXG4gICAgICAvLyBTY3JvbGwgdG8gdG9wIG9mIGxpc3QgLSBoYW5kbGVkIGJ5IGNvbXBvbmVudFxuXG4gICAgICAvLyBDbG9zZSBjb252ZXJzYXRpb25cbiAgICAgIGlmIChcbiAgICAgICAgY29udmVyc2F0aW9uICYmXG4gICAgICAgIGNvbW1hbmRPckN0cmwgJiZcbiAgICAgICAgc2hpZnRLZXkgJiZcbiAgICAgICAgKGtleSA9PT0gJ2MnIHx8IGtleSA9PT0gJ0MnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCd1bmxvYWQnLCAna2V5Ym9hcmQgc2hvcnRjdXQgY2xvc2UnKTtcbiAgICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNob3dDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWVzc2FnZUlkOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBNRVNTQUdFU1xuXG4gICAgICAvLyBTaG93IG1lc3NhZ2UgZGV0YWlsc1xuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24gJiZcbiAgICAgICAgY29tbWFuZE9yQ3RybCAmJlxuICAgICAgICAhc2hpZnRLZXkgJiZcbiAgICAgICAgKGtleSA9PT0gJ2QnIHx8IGtleSA9PT0gJ0QnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRNZXNzYWdlIH0gPSBzdGF0ZS5jb252ZXJzYXRpb25zO1xuICAgICAgICBpZiAoIXNlbGVjdGVkTWVzc2FnZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdzaG93LW1lc3NhZ2UtZGV0YWlscycsIHNlbGVjdGVkTWVzc2FnZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSByZXBseSB0byBtZXNzYWdlXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnZlcnNhdGlvbiAmJlxuICAgICAgICBjb21tYW5kT3JDdHJsICYmXG4gICAgICAgIHNoaWZ0S2V5ICYmXG4gICAgICAgIChrZXkgPT09ICdyJyB8fCBrZXkgPT09ICdSJylcbiAgICAgICkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdGVkTWVzc2FnZSB9ID0gc3RhdGUuY29udmVyc2F0aW9ucztcblxuICAgICAgICBjb252ZXJzYXRpb24udHJpZ2dlcigndG9nZ2xlLXJlcGx5Jywgc2VsZWN0ZWRNZXNzYWdlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU2F2ZSBhdHRhY2htZW50XG4gICAgICBpZiAoXG4gICAgICAgIGNvbnZlcnNhdGlvbiAmJlxuICAgICAgICBjb21tYW5kT3JDdHJsICYmXG4gICAgICAgICFzaGlmdEtleSAmJlxuICAgICAgICAoa2V5ID09PSAncycgfHwga2V5ID09PSAnUycpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZE1lc3NhZ2UgfSA9IHN0YXRlLmNvbnZlcnNhdGlvbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkTWVzc2FnZSkge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdzYXZlLWF0dGFjaG1lbnQnLCBzZWxlY3RlZE1lc3NhZ2UpO1xuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24gJiZcbiAgICAgICAgY29tbWFuZE9yQ3RybCAmJlxuICAgICAgICBzaGlmdEtleSAmJlxuICAgICAgICAoa2V5ID09PSAnZCcgfHwga2V5ID09PSAnRCcpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZE1lc3NhZ2UgfSA9IHN0YXRlLmNvbnZlcnNhdGlvbnM7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkTWVzc2FnZSkge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdkZWxldGUtbWVzc2FnZScsIHNlbGVjdGVkTWVzc2FnZSk7XG5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDT01QT1NFUlxuXG4gICAgICAvLyBDcmVhdGUgYSBuZXdsaW5lIGluIHlvdXIgbWVzc2FnZSAtIGhhbmRsZWQgYnkgY29tcG9uZW50XG5cbiAgICAgIC8vIEV4cGFuZCBjb21wb3NlciAtIGhhbmRsZWQgYnkgY29tcG9uZW50XG5cbiAgICAgIC8vIFNlbmQgaW4gZXhwYW5kZWQgY29tcG9zZXIgLSBoYW5kbGVkIGJ5IGNvbXBvbmVudFxuXG4gICAgICAvLyBBdHRhY2ggZmlsZVxuICAgICAgLy8gaG9va3MvdXNlS2V5Ym9hcmRTaG9yY3V0cyB1c2VBdHRhY2hGaWxlU2hvcnRjdXRcblxuICAgICAgLy8gUmVtb3ZlIGRyYWZ0IGxpbmsgcHJldmlld1xuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24gJiZcbiAgICAgICAgY29tbWFuZE9yQ3RybCAmJlxuICAgICAgICAhc2hpZnRLZXkgJiZcbiAgICAgICAgKGtleSA9PT0gJ3AnIHx8IGtleSA9PT0gJ1AnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdyZW1vdmUtbGluay1yZXZpZXcnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBBdHRhY2ggZmlsZVxuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24gJiZcbiAgICAgICAgY29tbWFuZE9yQ3RybCAmJlxuICAgICAgICBzaGlmdEtleSAmJlxuICAgICAgICAoa2V5ID09PSAncCcgfHwga2V5ID09PSAnUCcpXG4gICAgICApIHtcbiAgICAgICAgY29udmVyc2F0aW9uLnRyaWdnZXIoJ3JlbW92ZS1hbGwtZHJhZnQtYXR0YWNobWVudHMnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gQ29tbWVudGVkIG91dCBiZWNhdXNlIHRoaXMgaXMgdGhlIGxhc3QgaXRlbVxuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3NldHVwQXNOZXdEZXZpY2UnLCAoKSA9PiB7XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5hcHAub3Blbkluc3RhbGxlcigpO1xuICB9KTtcblxuICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3NldHVwQXNTdGFuZGFsb25lJywgKCkgPT4ge1xuICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuYXBwLm9wZW5TdGFuZGFsb25lKCk7XG4gIH0pO1xuXG4gIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbigncG93ZXJNb25pdG9yU3VzcGVuZCcsICgpID0+IHtcbiAgICBsb2cuaW5mbygncG93ZXJNb25pdG9yOiBzdXNwZW5kJyk7XG4gICAgc3VzcGVuZFRhc2tzV2l0aFRpbWVvdXQoKTtcbiAgfSk7XG5cbiAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9uKCdwb3dlck1vbml0b3JSZXN1bWUnLCAoKSA9PiB7XG4gICAgbG9nLmluZm8oJ3Bvd2VyTW9uaXRvcjogcmVzdW1lJyk7XG4gICAgc2VydmVyPy5jaGVja1NvY2tldHMoKTtcbiAgICByZXN1bWVUYXNrc1dpdGhUaW1lb3V0KCk7XG4gIH0pO1xuXG4gIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbigncG93ZXJNb25pdG9yTG9ja1NjcmVlbicsICgpID0+IHtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNhbGxpbmcuaGFuZ1VwQWN0aXZlQ2FsbCgpO1xuICB9KTtcblxuICBjb25zdCByZWNvbm5lY3RUb1dlYlNvY2tldFF1ZXVlID0gbmV3IExhdGVzdFF1ZXVlKCk7XG5cbiAgY29uc3QgZW5xdWV1ZVJlY29ubmVjdFRvV2ViU29ja2V0ID0gKCkgPT4ge1xuICAgIHJlY29ubmVjdFRvV2ViU29ja2V0UXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghc2VydmVyKSB7XG4gICAgICAgIGxvZy5pbmZvKCdyZWNvbm5lY3RUb1dlYlNvY2tldDogTm8gc2VydmVyLiBFYXJseSByZXR1cm4uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nLmluZm8oJ3JlY29ubmVjdFRvV2ViU29ja2V0IHN0YXJ0aW5nLi4uJyk7XG4gICAgICBhd2FpdCBzZXJ2ZXIub25PZmZsaW5lKCk7XG4gICAgICBhd2FpdCBzZXJ2ZXIub25PbmxpbmUoKTtcbiAgICAgIGxvZy5pbmZvKCdyZWNvbm5lY3RUb1dlYlNvY2tldCBjb21wbGV0ZS4nKTtcbiAgICB9KTtcbiAgfTtcblxuICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oXG4gICAgJ21pZ2h0QmVVbmxpbmtlZCcsXG4gICAgd2luZG93Ll8uZGVib3VuY2UoZW5xdWV1ZVJlY29ubmVjdFRvV2ViU29ja2V0LCAxMDAwLCB7IG1heFdhaXQ6IDUwMDAgfSlcbiAgKTtcblxuICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3VubGlua0FuZERpc2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgdW5saW5rQW5kRGlzY29ubmVjdChSZW1vdmVBbGxDb25maWd1cmF0aW9uLkZ1bGwpO1xuICB9KTtcblxuICBhc3luYyBmdW5jdGlvbiBydW5TdG9yYWdlU2VydmljZSgpIHtcbiAgICB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLmVuYWJsZVN0b3JhZ2VTZXJ2aWNlKCk7XG5cbiAgICBpZiAod2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuYXJlV2VQcmltYXJ5RGV2aWNlKCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICAnYmFja2dyb3VuZC9ydW5TdG9yYWdlU2VydmljZTogV2UgYXJlIHByaW1hcnkgZGV2aWNlOyBub3Qgc2VuZGluZyBrZXkgc3luYyByZXF1ZXN0J1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoTWVzc2FnZVNlbmRlci5nZXRSZXF1ZXN0S2V5U3luY01lc3NhZ2UoKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ3J1blN0b3JhZ2VTZXJ2aWNlOiBGYWlsZWQgdG8gcXVldWUgc3luYyBtZXNzYWdlJyxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAvLyBTdG9yYWdlIGlzIHJlYWR5IGJlY2F1c2UgYHN0YXJ0KClgIGlzIGNhbGxlZCBmcm9tIGBzdG9yYWdlLm9ucmVhZHkoKWBcblxuICAgIHN0cmljdEFzc2VydChjaGFsbGVuZ2VIYW5kbGVyLCAnc3RhcnQ6IGNoYWxsZW5nZUhhbmRsZXInKTtcbiAgICBhd2FpdCBjaGFsbGVuZ2VIYW5kbGVyLmxvYWQoKTtcblxuICAgIGlmICghd2luZG93LnN0b3JhZ2UudXNlci5nZXROdW1iZXIoKSkge1xuICAgICAgY29uc3Qgb3VyQ29udmVyc2F0aW9uID1cbiAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uKCk7XG4gICAgICBjb25zdCBvdXJFMTY0ID0gb3VyQ29udmVyc2F0aW9uPy5nZXQoJ2UxNjQnKTtcbiAgICAgIGlmIChvdXJFMTY0KSB7XG4gICAgICAgIGxvZy53YXJuKCdSZXN0b3JpbmcgRTE2NCBmcm9tIG91ciBjb252ZXJzYXRpb24nKTtcbiAgICAgICAgd2luZG93LnN0b3JhZ2UudXNlci5zZXROdW1iZXIob3VyRTE2NCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5ld1ZlcnNpb24gJiYgbGFzdFZlcnNpb24pIHtcbiAgICAgIGlmICh3aW5kb3cuaXNCZWZvcmVWZXJzaW9uKGxhc3RWZXJzaW9uLCAndjUuMzEuMCcpKSB7XG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLnJlcGFpclBpbm5lZENvbnZlcnNhdGlvbnMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3N0b3JhZ2VfcmVhZHknKSk7XG5cbiAgICBiYWRnZUltYWdlRmlsZURvd25sb2FkZXIuY2hlY2tGb3JGaWxlc1RvRG93bmxvYWQoKTtcblxuICAgIGxvZy5pbmZvKCdFeHBpcmF0aW9uIHN0YXJ0IHRpbWVzdGFtcCBjbGVhbnVwOiBzdGFydGluZy4uLicpO1xuICAgIGNvbnN0IG1lc3NhZ2VzVW5leHBlY3RlZGx5TWlzc2luZ0V4cGlyYXRpb25TdGFydFRpbWVzdGFtcCA9XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNVbmV4cGVjdGVkbHlNaXNzaW5nRXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wKCk7XG4gICAgbG9nLmluZm8oXG4gICAgICBgRXhwaXJhdGlvbiBzdGFydCB0aW1lc3RhbXAgY2xlYW51cDogRm91bmQgJHttZXNzYWdlc1VuZXhwZWN0ZWRseU1pc3NpbmdFeHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAubGVuZ3RofSBtZXNzYWdlcyBmb3IgY2xlYW51cGBcbiAgICApO1xuICAgIGlmICghd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIFwiRXhwaXJhdGlvbiBzdGFydCB0aW1lc3RhbXAgY2xlYW51cDogQ2FuY2VsbGluZyB1cGRhdGU7IHdlIGRvbid0IGhhdmUgb3VyIG93biBVVUlEXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlc1VuZXhwZWN0ZWRseU1pc3NpbmdFeHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAubGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZXdNZXNzYWdlQXR0cmlidXRlcyA9XG4gICAgICAgIG1lc3NhZ2VzVW5leHBlY3RlZGx5TWlzc2luZ0V4cGlyYXRpb25TdGFydFRpbWVzdGFtcC5tYXAobWVzc2FnZSA9PiB7XG4gICAgICAgICAgY29uc3QgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wID0gTWF0aC5taW4oXG4gICAgICAgICAgICAuLi5maWx0ZXIoXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvLyBUaGVzZSBtZXNzYWdlcyBzaG91bGQgYWx3YXlzIGhhdmUgYSBzZW50X2F0LCBidXQgd2UgaGF2ZSBmYWxsYmFja3NcbiAgICAgICAgICAgICAgICAvLyAgIGp1c3QgaW4gY2FzZS5cbiAgICAgICAgICAgICAgICBtZXNzYWdlLnNlbnRfYXQsXG4gICAgICAgICAgICAgICAgRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICAvLyBUaGUgcXVlcnkgc2hvdWxkbid0IHJldHVybiBtZXNzYWdlcyB3aXRoIGV4cGlyYXRpb24gc3RhcnQgdGltZXN0YW1wcyxcbiAgICAgICAgICAgICAgICAvLyAgIGJ1dCB3ZSdyZSB0cnlpbmcgdG8gYmUgZXh0cmEgY2FyZWZ1bC5cbiAgICAgICAgICAgICAgICBtZXNzYWdlLmV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgaXNOb3ROaWxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYEV4cGlyYXRpb24gc3RhcnQgdGltZXN0YW1wIGNsZWFudXA6IHN0YXJ0aW5nIHRpbWVyIGZvciAke21lc3NhZ2UudHlwZX0gbWVzc2FnZSBzZW50IGF0ICR7bWVzc2FnZS5zZW50X2F0fS4gU3RhcnRpbmcgdGltZXIgYXQgJHtleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXB9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZXMobmV3TWVzc2FnZUF0dHJpYnV0ZXMsIHtcbiAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBsb2cuaW5mbygnRXhwaXJhdGlvbiBzdGFydCB0aW1lc3RhbXAgY2xlYW51cDogY29tcGxldGUnKTtcblxuICAgIGxvZy5pbmZvKCdsaXN0ZW5pbmcgZm9yIHJlZ2lzdHJhdGlvbiBldmVudHMnKTtcbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3JlZ2lzdHJhdGlvbl9kb25lJywgKCkgPT4ge1xuICAgICAgbG9nLmluZm8oJ2hhbmRsaW5nIHJlZ2lzdHJhdGlvbiBldmVudCcpO1xuXG4gICAgICBzdHJpY3RBc3NlcnQoc2VydmVyICE9PSB1bmRlZmluZWQsICdXZWJBUEkgbm90IHJlYWR5Jyk7XG4gICAgICBzZXJ2ZXIuYXV0aGVudGljYXRlKFxuICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0V2ViQVBJQ3JlZGVudGlhbHMoKVxuICAgICAgKTtcbiAgICAgIGNvbm5lY3QodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBjYW5jZWxJbml0aWFsaXphdGlvbk1lc3NhZ2UoKTtcbiAgICByZW5kZXIoXG4gICAgICB3aW5kb3cuU2lnbmFsLlN0YXRlLlJvb3RzLmNyZWF0ZUFwcCh3aW5kb3cucmVkdXhTdG9yZSksXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwLWNvbnRhaW5lcicpXG4gICAgKTtcbiAgICBjb25zdCBoaWRlTWVudUJhciA9IHdpbmRvdy5zdG9yYWdlLmdldCgnaGlkZS1tZW51LWJhcicsIGZhbHNlKTtcbiAgICB3aW5kb3cuc2V0QXV0b0hpZGVNZW51QmFyKGhpZGVNZW51QmFyKTtcbiAgICB3aW5kb3cuc2V0TWVudUJhclZpc2liaWxpdHkoIWhpZGVNZW51QmFyKTtcblxuICAgIHN0YXJ0VGltZVRyYXZlbERldGVjdG9yKCgpID0+IHtcbiAgICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCd0aW1ldHJhdmVsJyk7XG4gICAgfSk7XG5cbiAgICBleHBpcmluZ01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlLnVwZGF0ZSgpO1xuICAgIHRhcFRvVmlld01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlLnVwZGF0ZSgpO1xuICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbigndGltZXRyYXZlbCcsICgpID0+IHtcbiAgICAgIGV4cGlyaW5nTWVzc2FnZXNEZWxldGlvblNlcnZpY2UudXBkYXRlKCk7XG4gICAgICB0YXBUb1ZpZXdNZXNzYWdlc0RlbGV0aW9uU2VydmljZS51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlzQ29yZURhdGFWYWxpZCA9IEJvb2xlYW4oXG4gICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpICYmXG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbigpXG4gICAgKTtcblxuICAgIGlmIChpc0NvcmVEYXRhVmFsaWQgJiYgd2luZG93LlNpZ25hbC5VdGlsLlJlZ2lzdHJhdGlvbi5ldmVyRG9uZSgpKSB7XG4gICAgICBjb25uZWN0KCk7XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmFwcC5vcGVuSW5ib3goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5hcHAub3Blbkluc3RhbGxlcigpO1xuICAgIH1cblxuICAgIHdpbmRvdy5yZWdpc3RlckZvckFjdGl2ZSgoKSA9PiBub3RpZmljYXRpb25TZXJ2aWNlLmNsZWFyKCkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiBub3RpZmljYXRpb25TZXJ2aWNlLmZhc3RDbGVhcigpKTtcblxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2Uub24oJ2NsaWNrJywgKGlkLCBtZXNzYWdlSWQpID0+IHtcbiAgICAgIHdpbmRvdy5zaG93V2luZG93KCk7XG4gICAgICBpZiAoaWQpIHtcbiAgICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLnRyaWdnZXIoJ3Nob3dDb252ZXJzYXRpb24nLCBpZCwgbWVzc2FnZUlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuYXBwLm9wZW5JbmJveCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTWF5YmUgcmVmcmVzaCByZW1vdGUgY29uZmlndXJhdGlvbiB3aGVuIHdlIGJlY29tZSBhY3RpdmVcbiAgICB3aW5kb3cucmVnaXN0ZXJGb3JBY3RpdmUoYXN5bmMgKCkgPT4ge1xuICAgICAgc3RyaWN0QXNzZXJ0KHNlcnZlciAhPT0gdW5kZWZpbmVkLCAnV2ViQVBJIG5vdCByZWFkeScpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlJlbW90ZUNvbmZpZy5tYXliZVJlZnJlc2hSZW1vdGVDb25maWcoc2VydmVyKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuICAgICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICAgYHJlZ2lzdGVyRm9yQWN0aXZlOiBGYWlsZWQgdG8gdG8gcmVmcmVzaCByZW1vdGUgY29uZmlnLiBDb2RlOiAke2Vycm9yLmNvZGV9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTGlzdGVuIGZvciBjaGFuZ2VzIHRvIHRoZSBgZGVza3RvcC5jbGllbnRFeHBpcmF0aW9uYCByZW1vdGUgZmxhZ1xuICAgIHdpbmRvdy5TaWduYWwuUmVtb3RlQ29uZmlnLm9uQ2hhbmdlKFxuICAgICAgJ2Rlc2t0b3AuY2xpZW50RXhwaXJhdGlvbicsXG4gICAgICAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW90ZUJ1aWxkRXhwaXJhdGlvblRpbWVzdGFtcCA9XG4gICAgICAgICAgd2luZG93LlNpZ25hbC5VdGlsLnBhcnNlUmVtb3RlQ2xpZW50RXhwaXJhdGlvbih2YWx1ZSBhcyBzdHJpbmcpO1xuICAgICAgICBpZiAocmVtb3RlQnVpbGRFeHBpcmF0aW9uVGltZXN0YW1wKSB7XG4gICAgICAgICAgd2luZG93LnN0b3JhZ2UucHV0KFxuICAgICAgICAgICAgJ3JlbW90ZUJ1aWxkRXhwaXJhdGlvbicsXG4gICAgICAgICAgICByZW1vdGVCdWlsZEV4cGlyYXRpb25UaW1lc3RhbXBcbiAgICAgICAgICApO1xuICAgICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuZXhwaXJhdGlvbi5oeWRyYXRlRXhwaXJhdGlvblN0YXR1cyhcbiAgICAgICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5oYXNFeHBpcmVkKClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIExpc3RlbiBmb3IgY2hhbmdlcyB0byB0aGUgYGRlc2t0b3AubWVzc2FnZVJlcXVlc3RzYCByZW1vdGUgY29uZmlndXJhdGlvbiBmbGFnXG4gICAgY29uc3QgcmVtb3ZlTWVzc2FnZVJlcXVlc3RMaXN0ZW5lciA9IHdpbmRvdy5TaWduYWwuUmVtb3RlQ29uZmlnLm9uQ2hhbmdlKFxuICAgICAgJ2Rlc2t0b3AubWVzc2FnZVJlcXVlc3RzJyxcbiAgICAgICh7IGVuYWJsZWQgfSkgPT4ge1xuICAgICAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25zID0gd2luZG93LmdldENvbnZlcnNhdGlvbnMoKTtcbiAgICAgICAgY29udmVyc2F0aW9ucy5mb3JFYWNoKGNvbnZlcnNhdGlvbiA9PiB7XG4gICAgICAgICAgY29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgICBtZXNzYWdlQ291bnRCZWZvcmVNZXNzYWdlUmVxdWVzdHM6XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ21lc3NhZ2VDb3VudCcpIHx8IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlbW92ZU1lc3NhZ2VSZXF1ZXN0TGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKHJlc29sdmVPbkFwcFZpZXcpIHtcbiAgICAgIHJlc29sdmVPbkFwcFZpZXcoKTtcbiAgICAgIHJlc29sdmVPbkFwcFZpZXcgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgd2luZG93LmdldFN5bmNSZXF1ZXN0ID0gKHRpbWVvdXRNaWxsaXM/OiBudW1iZXIpID0+IHtcbiAgICBzdHJpY3RBc3NlcnQobWVzc2FnZVJlY2VpdmVyLCAnTWVzc2FnZVJlY2VpdmVyIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgY29uc3Qgc3luY1JlcXVlc3QgPSBuZXcgd2luZG93LnRleHRzZWN1cmUuU3luY1JlcXVlc3QoXG4gICAgICBtZXNzYWdlUmVjZWl2ZXIsXG4gICAgICB0aW1lb3V0TWlsbGlzXG4gICAgKTtcbiAgICBzeW5jUmVxdWVzdC5zdGFydCgpO1xuICAgIHJldHVybiBzeW5jUmVxdWVzdDtcbiAgfTtcblxuICBsZXQgZGlzY29ubmVjdFRpbWVyOiBUaW1lcnMuVGltZW91dCB8IHVuZGVmaW5lZDtcbiAgbGV0IHJlY29ubmVjdFRpbWVyOiBUaW1lcnMuVGltZW91dCB8IHVuZGVmaW5lZDtcbiAgZnVuY3Rpb24gb25PZmZsaW5lKCkge1xuICAgIGxvZy5pbmZvKCdvZmZsaW5lJyk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsIG9uT2ZmbGluZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIG9uT25saW5lKTtcblxuICAgIC8vIFdlJ3ZlIHJlY2VpdmVkIGxvZ3MgZnJvbSBMaW51eCB3aGVyZSB3ZSBnZXQgYW4gJ29mZmxpbmUnIGV2ZW50LCB0aGVuIDMwbXMgbGF0ZXJcbiAgICAvLyAgIHdlIGdldCBhbiBvbmxpbmUgZXZlbnQuIFRoaXMgd2FpdHMgYSBiaXQgYWZ0ZXIgZ2V0dGluZyBhbiAnb2ZmbGluZScgZXZlbnRcbiAgICAvLyAgIGJlZm9yZSBkaXNjb25uZWN0aW5nIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gICAgZGlzY29ubmVjdFRpbWVyID0gVGltZXJzLnNldFRpbWVvdXQoZGlzY29ubmVjdCwgMTAwMCk7XG5cbiAgICBpZiAoY2hhbGxlbmdlSGFuZGxlcikge1xuICAgICAgY2hhbGxlbmdlSGFuZGxlci5vbk9mZmxpbmUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbk9ubGluZSgpIHtcbiAgICBsb2cuaW5mbygnb25saW5lJyk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25saW5lJywgb25PbmxpbmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgb25PZmZsaW5lKTtcblxuICAgIGlmIChkaXNjb25uZWN0VGltZXIgJiYgaXNTb2NrZXRPbmxpbmUoKSkge1xuICAgICAgbG9nLndhcm4oJ0FscmVhZHkgb25saW5lLiBIYWQgYSBibGlwIGluIG9ubGluZS9vZmZsaW5lIHN0YXR1cy4nKTtcbiAgICAgIFRpbWVycy5jbGVhclRpbWVvdXQoZGlzY29ubmVjdFRpbWVyKTtcbiAgICAgIGRpc2Nvbm5lY3RUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRpc2Nvbm5lY3RUaW1lcikge1xuICAgICAgVGltZXJzLmNsZWFyVGltZW91dChkaXNjb25uZWN0VGltZXIpO1xuICAgICAgZGlzY29ubmVjdFRpbWVyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbm5lY3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU29ja2V0T25saW5lKCkge1xuICAgIGNvbnN0IHNvY2tldFN0YXR1cyA9IHdpbmRvdy5nZXRTb2NrZXRTdGF0dXMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgc29ja2V0U3RhdHVzID09PSBTb2NrZXRTdGF0dXMuQ09OTkVDVElORyB8fFxuICAgICAgc29ja2V0U3RhdHVzID09PSBTb2NrZXRTdGF0dXMuT1BFTlxuICAgICk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgIGxvZy5pbmZvKCdkaXNjb25uZWN0Jyk7XG5cbiAgICAvLyBDbGVhciB0aW1lciwgc2luY2Ugd2UncmUgb25seSBjYWxsZWQgd2hlbiB0aGUgdGltZXIgaXMgZXhwaXJlZFxuICAgIGRpc2Nvbm5lY3RUaW1lciA9IHVuZGVmaW5lZDtcblxuICAgIEF0dGFjaG1lbnREb3dubG9hZHMuc3RvcCgpO1xuICAgIGlmIChzZXJ2ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBtZXNzYWdlUmVjZWl2ZXIgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgJ1dlYkFQSSBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgdG9nZXRoZXIgd2l0aCBNZXNzYWdlUmVjZWl2ZXInXG4gICAgICApO1xuICAgICAgYXdhaXQgc2VydmVyLm9uT2ZmbGluZSgpO1xuICAgICAgYXdhaXQgbWVzc2FnZVJlY2VpdmVyLmRyYWluKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gV2hlbiB0cnVlIC0gd2UgYXJlIHJ1bm5pbmcgdGhlIHZlcnkgZmlyc3Qgc3RvcmFnZSBhbmQgY29udGFjdCBzeW5jIGFmdGVyXG4gIC8vIGxpbmtpbmcuXG4gIGxldCBpc0luaXRpYWxTeW5jID0gZmFsc2U7XG5cbiAgbGV0IGNvbm5lY3RDb3VudCA9IDA7XG4gIGxldCBjb25uZWN0aW5nID0gZmFsc2U7XG4gIGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoZmlyc3RSdW4/OiBib29sZWFuKSB7XG4gICAgaWYgKGNvbm5lY3RpbmcpIHtcbiAgICAgIGxvZy53YXJuKCdjb25uZWN0IGFscmVhZHkgcnVubmluZycsIHsgY29ubmVjdENvdW50IH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0cmljdEFzc2VydChzZXJ2ZXIgIT09IHVuZGVmaW5lZCwgJ1dlYkFQSSBub3QgY29ubmVjdGVkJyk7XG5cbiAgICB0cnkge1xuICAgICAgY29ubmVjdGluZyA9IHRydWU7XG5cbiAgICAgIC8vIFJlc2V0IHRoZSBmbGFnIGFuZCB1cGRhdGUgaXQgYmVsb3cgaWYgbmVlZGVkXG4gICAgICBpc0luaXRpYWxTeW5jID0gZmFsc2U7XG5cbiAgICAgIGxvZy5pbmZvKCdjb25uZWN0JywgeyBmaXJzdFJ1biwgY29ubmVjdENvdW50IH0pO1xuXG4gICAgICBpZiAocmVjb25uZWN0VGltZXIpIHtcbiAgICAgICAgVGltZXJzLmNsZWFyVGltZW91dChyZWNvbm5lY3RUaW1lcik7XG4gICAgICAgIHJlY29ubmVjdFRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBCb290c3RyYXAgb3VyIG9ubGluZS9vZmZsaW5lIGRldGVjdGlvbiwgb25seSB0aGUgZmlyc3QgdGltZSB3ZSBjb25uZWN0XG4gICAgICBpZiAoY29ubmVjdENvdW50ID09PSAwICYmIG5hdmlnYXRvci5vbkxpbmUpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29mZmxpbmUnLCBvbk9mZmxpbmUpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbm5lY3RDb3VudCA9PT0gMCAmJiAhbmF2aWdhdG9yLm9uTGluZSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAnU3RhcnRpbmcgdXAgb2ZmbGluZTsgd2lsbCBjb25uZWN0IHdoZW4gd2UgaGF2ZSBuZXR3b3JrIGFjY2VzcydcbiAgICAgICAgKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIG9uT25saW5lKTtcbiAgICAgICAgb25FbXB0eSgpOyAvLyB0aGlzIGVuc3VyZXMgdGhhdCB0aGUgbG9hZGluZyBzY3JlZW4gaXMgZGlzbWlzc2VkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF3aW5kb3cuU2lnbmFsLlV0aWwuUmVnaXN0cmF0aW9uLmV2ZXJEb25lKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcgPSBuZXcgd2luZG93LnRleHRzZWN1cmUuTWVzc2FnZVNlbmRlcihzZXJ2ZXIpO1xuXG4gICAgICAvLyBVcGRhdGUgb3VyIHByb2ZpbGUga2V5IGluIHRoZSBjb252ZXJzYXRpb24gaWYgd2UganVzdCBnb3QgbGlua2VkLlxuICAgICAgY29uc3QgcHJvZmlsZUtleSA9IGF3YWl0IG91clByb2ZpbGVLZXlTZXJ2aWNlLmdldCgpO1xuICAgICAgaWYgKGZpcnN0UnVuICYmIHByb2ZpbGVLZXkpIHtcbiAgICAgICAgY29uc3QgbWUgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb24oKTtcbiAgICAgICAgc3RyaWN0QXNzZXJ0KG1lICE9PSB1bmRlZmluZWQsIFwiRGlkbid0IGZpbmQgbmV3bHkgY3JlYXRlZCBvdXJzZWx2ZXNcIik7XG4gICAgICAgIGF3YWl0IG1lLnNldFByb2ZpbGVLZXkoQnl0ZXMudG9CYXNlNjQocHJvZmlsZUtleSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdENvdW50ID09PSAwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gRm9yY2UgYSByZS1mZXRjaCBiZWZvcmUgd2UgcHJvY2VzcyBvdXIgcXVldWUuIFdlIG1heSB3YW50IHRvIHR1cm4gb25cbiAgICAgICAgICAvLyAgIHNvbWV0aGluZyB3aGljaCBjaGFuZ2VzIGhvdyB3ZSBwcm9jZXNzIGluY29taW5nIG1lc3NhZ2VzIVxuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuUmVtb3RlQ29uZmlnLnJlZnJlc2hSZW1vdGVDb25maWcoc2VydmVyKTtcblxuICAgICAgICAgIGNvbnN0IGV4cGlyYXRpb24gPSB3aW5kb3cuU2lnbmFsLlJlbW90ZUNvbmZpZy5nZXRWYWx1ZShcbiAgICAgICAgICAgICdkZXNrdG9wLmNsaWVudEV4cGlyYXRpb24nXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZXhwaXJhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgcmVtb3RlQnVpbGRFeHBpcmF0aW9uVGltZXN0YW1wID1cbiAgICAgICAgICAgICAgd2luZG93LlNpZ25hbC5VdGlsLnBhcnNlUmVtb3RlQ2xpZW50RXhwaXJhdGlvbihcbiAgICAgICAgICAgICAgICBleHBpcmF0aW9uIGFzIHN0cmluZ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHJlbW90ZUJ1aWxkRXhwaXJhdGlvblRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoXG4gICAgICAgICAgICAgICAgJ3JlbW90ZUJ1aWxkRXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgcmVtb3RlQnVpbGRFeHBpcmF0aW9uVGltZXN0YW1wXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuZXhwaXJhdGlvbi5oeWRyYXRlRXhwaXJhdGlvblN0YXR1cyhcbiAgICAgICAgICAgICAgICB3aW5kb3cuU2lnbmFsLlV0aWwuaGFzRXhwaXJlZCgpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdjb25uZWN0OiBFcnJvciByZWZyZXNoaW5nIHJlbW90ZSBjb25maWc6JyxcbiAgICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGxvbmVseUUxNjRDb252ZXJzYXRpb25zID0gd2luZG93XG4gICAgICAgICAgICAuZ2V0Q29udmVyc2F0aW9ucygpXG4gICAgICAgICAgICAuZmlsdGVyKGMgPT5cbiAgICAgICAgICAgICAgQm9vbGVhbihcbiAgICAgICAgICAgICAgICBpc0RpcmVjdENvbnZlcnNhdGlvbihjLmF0dHJpYnV0ZXMpICYmXG4gICAgICAgICAgICAgICAgICBjLmdldCgnZTE2NCcpICYmXG4gICAgICAgICAgICAgICAgICAhYy5nZXQoJ3V1aWQnKSAmJlxuICAgICAgICAgICAgICAgICAgIWMuaXNFdmVyVW5yZWdpc3RlcmVkKClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICBjb252ZXJzYXRpb25zOiBsb25lbHlFMTY0Q29udmVyc2F0aW9ucyxcbiAgICAgICAgICAgIG1lc3NhZ2luZzogd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdjb25uZWN0OiBFcnJvciBmZXRjaGluZyBVVUlEcyBmb3IgbG9uZWx5IGUxNjRzOicsXG4gICAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbm5lY3RDb3VudCArPSAxO1xuXG4gICAgICAvLyBUbyBhdm9pZCBhIGZsb29kIG9mIG9wZXJhdGlvbnMgYmVmb3JlIHdlIGNhdGNoIHVwLCB3ZSBwYXVzZSBzb21lIHF1ZXVlcy5cbiAgICAgIHByb2ZpbGVLZXlSZXNwb25zZVF1ZXVlLnBhdXNlKCk7XG4gICAgICBsaWdodFNlc3Npb25SZXNldFF1ZXVlLnBhdXNlKCk7XG4gICAgICBvbkRlY3J5cHRpb25FcnJvclF1ZXVlLnBhdXNlKCk7XG4gICAgICBvblJldHJ5UmVxdWVzdFF1ZXVlLnBhdXNlKCk7XG4gICAgICB3aW5kb3cuV2hpc3Blci5kZWxpdmVyeVJlY2VpcHRRdWV1ZS5wYXVzZSgpO1xuICAgICAgbm90aWZpY2F0aW9uU2VydmljZS5kaXNhYmxlKCk7XG5cbiAgICAgIHdpbmRvdy5TaWduYWwuU2VydmljZXMuaW5pdGlhbGl6ZUdyb3VwQ3JlZGVudGlhbEZldGNoZXIoKTtcblxuICAgICAgc3RyaWN0QXNzZXJ0KHNlcnZlciAhPT0gdW5kZWZpbmVkLCAnV2ViQVBJIG5vdCBpbml0aWFsaXplZCcpO1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBtZXNzYWdlUmVjZWl2ZXIgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgJ01lc3NhZ2VSZWNlaXZlciBub3QgaW5pdGlhbGl6ZWQnXG4gICAgICApO1xuICAgICAgbWVzc2FnZVJlY2VpdmVyLnJlc2V0KCk7XG4gICAgICBzZXJ2ZXIucmVnaXN0ZXJSZXF1ZXN0SGFuZGxlcihtZXNzYWdlUmVjZWl2ZXIpO1xuXG4gICAgICAvLyBJZiBjb21pbmcgaGVyZSBhZnRlciBgb2ZmbGluZWAgZXZlbnQgLSBjb25uZWN0IGFnYWluLlxuICAgICAgYXdhaXQgc2VydmVyLm9uT25saW5lKCk7XG5cbiAgICAgIEF0dGFjaG1lbnREb3dubG9hZHMuc3RhcnQoe1xuICAgICAgICBsb2dnZXI6IGxvZyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY29ubmVjdENvdW50ID09PSAxKSB7XG4gICAgICAgIFN0aWNrZXJzLmRvd25sb2FkUXVldWVkUGFja3MoKTtcbiAgICAgICAgaWYgKCFuZXdWZXJzaW9uKSB7XG4gICAgICAgICAgcnVuU3RvcmFnZVNlcnZpY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPbiBzdGFydHVwIGFmdGVyIHVwZ3JhZGluZyB0byBhIG5ldyB2ZXJzaW9uLCByZXF1ZXN0IGEgY29udGFjdCBzeW5jXG4gICAgICAvLyAgIChidXQgb25seSBpZiB3ZSdyZSBub3QgdGhlIHByaW1hcnkgZGV2aWNlKVxuICAgICAgaWYgKFxuICAgICAgICAhZmlyc3RSdW4gJiZcbiAgICAgICAgY29ubmVjdENvdW50ID09PSAxICYmXG4gICAgICAgIG5ld1ZlcnNpb24gJiZcbiAgICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldERldmljZUlkKCkgIT09IDFcbiAgICAgICkge1xuICAgICAgICBsb2cuaW5mbygnQm9vdCBhZnRlciB1cGdyYWRpbmcuIFJlcXVlc3RpbmcgY29udGFjdCBzeW5jJyk7XG4gICAgICAgIHdpbmRvdy5nZXRTeW5jUmVxdWVzdCgpO1xuXG4gICAgICAgIHJ1blN0b3JhZ2VTZXJ2aWNlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtYW5hZ2VyID0gd2luZG93LmdldEFjY291bnRNYW5hZ2VyKCk7XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgbWFuYWdlci5tYXliZVVwZGF0ZURldmljZU5hbWUoKSxcbiAgICAgICAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5yZW1vdmVTaWduYWxpbmdLZXkoKSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdQcm9ibGVtIHdpdGggYWNjb3VudCBtYW5hZ2VyIHVwZGF0ZXMgYWZ0ZXIgc3RhcnRpbmcgbmV3IHZlcnNpb246ICcsXG4gICAgICAgICAgICBlICYmIGUuc3RhY2sgPyBlLnN0YWNrIDogZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdWRTdXBwb3J0S2V5ID0gJ2hhc1JlZ2lzdGVyU3VwcG9ydEZvclVuYXV0aGVudGljYXRlZERlbGl2ZXJ5JztcbiAgICAgIGlmICghd2luZG93LnN0b3JhZ2UuZ2V0KHVkU3VwcG9ydEtleSkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBzZXJ2ZXIucmVnaXN0ZXJTdXBwb3J0Rm9yVW5hdXRoZW50aWNhdGVkRGVsaXZlcnkoKTtcbiAgICAgICAgICB3aW5kb3cuc3RvcmFnZS5wdXQodWRTdXBwb3J0S2V5LCB0cnVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICAnRXJyb3I6IFVuYWJsZSB0byByZWdpc3RlciBmb3IgdW5hdXRoZW50aWNhdGVkIGRlbGl2ZXJ5IHN1cHBvcnQuJyxcbiAgICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGV2aWNlSWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0RGV2aWNlSWQoKTtcblxuICAgICAgaWYgKCF3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpKSB7XG4gICAgICAgIGxvZy5lcnJvcignVVVJRCBub3QgY2FwdHVyZWQgZHVyaW5nIHJlZ2lzdHJhdGlvbiwgdW5saW5raW5nJyk7XG4gICAgICAgIHJldHVybiB1bmxpbmtBbmREaXNjb25uZWN0KFJlbW92ZUFsbENvbmZpZ3VyYXRpb24uRnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoVVVJREtpbmQuUE5JKSkge1xuICAgICAgICBsb2cuaW5mbygnUE5JIG5vdCBjYXB0dXJlZCBkdXJpbmcgcmVnaXN0cmF0aW9uLCBmZXRjaGluZycpO1xuICAgICAgICBjb25zdCB7IHBuaSB9ID0gYXdhaXQgc2VydmVyLndob2FtaSgpO1xuICAgICAgICBpZiAoIXBuaSkge1xuICAgICAgICAgIGxvZy5lcnJvcignTm8gUE5JIGZvdW5kLCB1bmxpbmtpbmcnKTtcbiAgICAgICAgICByZXR1cm4gdW5saW5rQW5kRGlzY29ubmVjdChSZW1vdmVBbGxDb25maWd1cmF0aW9uLlNvZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nLmluZm8oJ1NldHRpbmcgUE5JIHRvJywgcG5pKTtcbiAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLnNldFBuaShwbmkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdENvdW50ID09PSAxKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gTm90ZTogd2UgYWx3YXlzIGhhdmUgdG8gcmVnaXN0ZXIgb3VyIGNhcGFiaWxpdGllcyBhbGwgYXQgb25jZSwgc28gd2UgZG8gdGhpc1xuICAgICAgICAgIC8vICAgYWZ0ZXIgY29ubmVjdCBvbiBldmVyeSBzdGFydHVwXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgc2VydmVyLnJlZ2lzdGVyQ2FwYWJpbGl0aWVzKHtcbiAgICAgICAgICAgICAgYW5ub3VuY2VtZW50R3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgIGdpZnRCYWRnZXM6IHRydWUsXG4gICAgICAgICAgICAgICdndjItMyc6IHRydWUsXG4gICAgICAgICAgICAgICdndjEtbWlncmF0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgc2VuZGVyS2V5OiB0cnVlLFxuICAgICAgICAgICAgICBjaGFuZ2VOdW1iZXI6IHRydWUsXG4gICAgICAgICAgICAgIHN0b3JpZXM6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHVwZGF0ZU91clVzZXJuYW1lKCksXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ0Vycm9yOiBVbmFibGUgdG8gcmVnaXN0ZXIgb3VyIGNhcGFiaWxpdGllcy4nLFxuICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmlyc3RSdW4gPT09IHRydWUgJiYgZGV2aWNlSWQgIT09IDEpIHtcbiAgICAgICAgY29uc3QgaGFzVGhlbWVTZXR0aW5nID0gQm9vbGVhbih3aW5kb3cuc3RvcmFnZS5nZXQoJ3RoZW1lLXNldHRpbmcnKSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhaGFzVGhlbWVTZXR0aW5nICYmXG4gICAgICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5nZXQoJ3VzZXJBZ2VudCcpID09PSAnT1dJJ1xuICAgICAgICApIHtcbiAgICAgICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoXG4gICAgICAgICAgICAndGhlbWUtc2V0dGluZycsXG4gICAgICAgICAgICBhd2FpdCB3aW5kb3cuRXZlbnRzLmdldFRoZW1lU2V0dGluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGVtZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdhaXRGb3JFdmVudCA9IGNyZWF0ZVRhc2tXaXRoVGltZW91dChcbiAgICAgICAgICAoZXZlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBwcm9taXNlLCByZXNvbHZlIH0gPSBleHBsb2RlUHJvbWlzZTx2b2lkPigpO1xuICAgICAgICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9uY2UoZXZlbnQsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdmaXJzdFJ1bjp3YWl0Rm9yRXZlbnQnXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHN0b3JhZ2VTZXJ2aWNlU3luY0NvbXBsZXRlOiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBpZiAod2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuYXJlV2VQcmltYXJ5RGV2aWNlKCkpIHtcbiAgICAgICAgICBzdG9yYWdlU2VydmljZVN5bmNDb21wbGV0ZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0b3JhZ2VTZXJ2aWNlU3luY0NvbXBsZXRlID0gd2FpdEZvckV2ZW50KFxuICAgICAgICAgICAgJ3N0b3JhZ2VTZXJ2aWNlOnN5bmNDb21wbGV0ZSdcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGFjdFN5bmNDb21wbGV0ZSA9IHdhaXRGb3JFdmVudCgnY29udGFjdFN5bmM6Y29tcGxldGUnKTtcblxuICAgICAgICBsb2cuaW5mbygnZmlyc3RSdW46IHJlcXVlc3RpbmcgaW5pdGlhbCBzeW5jJyk7XG4gICAgICAgIGlzSW5pdGlhbFN5bmMgPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlcXVlc3QgY29uZmlndXJhdGlvbiwgYmxvY2ssIEdWMSBzeW5jIG1lc3NhZ2VzLCBjb250YWN0c1xuICAgICAgICAvLyAob25seSBhdmF0YXJzIGFuZCBpbmJveFBvc2l0aW9uKSxhbmQgU3RvcmFnZSBTZXJ2aWNlIHN5bmMuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoXG4gICAgICAgICAgICAgIE1lc3NhZ2VTZW5kZXIuZ2V0UmVxdWVzdENvbmZpZ3VyYXRpb25TeW5jTWVzc2FnZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoTWVzc2FnZVNlbmRlci5nZXRSZXF1ZXN0QmxvY2tTeW5jTWVzc2FnZSgpKSxcbiAgICAgICAgICAgIHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKE1lc3NhZ2VTZW5kZXIuZ2V0UmVxdWVzdEdyb3VwU3luY01lc3NhZ2UoKSksXG4gICAgICAgICAgICBzaW5nbGVQcm90b0pvYlF1ZXVlLmFkZChcbiAgICAgICAgICAgICAgTWVzc2FnZVNlbmRlci5nZXRSZXF1ZXN0Q29udGFjdFN5bmNNZXNzYWdlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBydW5TdG9yYWdlU2VydmljZSgpLFxuICAgICAgICAgIF0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdjb25uZWN0OiBGYWlsZWQgdG8gcmVxdWVzdCBpbml0aWFsIHN5bmNzJyxcbiAgICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nLmluZm8oJ2ZpcnN0UnVuOiB3YWl0aW5nIGZvciBzdG9yYWdlIHNlcnZpY2UgYW5kIGNvbnRhY3Qgc3luYycpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW3N0b3JhZ2VTZXJ2aWNlU3luY0NvbXBsZXRlLCBjb250YWN0U3luY0NvbXBsZXRlXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ2Nvbm5lY3Q6IEZhaWxlZCB0byBydW4gc3RvcmFnZSBzZXJ2aWNlIGFuZCBjb250YWN0IHN5bmNzJyxcbiAgICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nLmluZm8oJ2ZpcnN0UnVuOiBpbml0aWFsIHN5bmMgY29tcGxldGUnKTtcbiAgICAgICAgaXNJbml0aWFsU3luYyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFN3aXRjaCB0byBpbmJveCB2aWV3IGV2ZW4gaWYgY29udGFjdCBzeW5jIGlzIHN0aWxsIHJ1bm5pbmdcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCkuYXBwLmFwcFZpZXcgPT09IEFwcFZpZXdUeXBlLkluc3RhbGxlclxuICAgICAgICApIHtcbiAgICAgICAgICBsb2cuaW5mbygnZmlyc3RSdW46IG9wZW5pbmcgaW5ib3gnKTtcbiAgICAgICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmFwcC5vcGVuSW5ib3goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2cuaW5mbygnZmlyc3RSdW46IG5vdCBvcGVuaW5nIGluYm94Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0YWxsZWRTdGlja2VyUGFja3MgPSBTdGlja2Vycy5nZXRJbnN0YWxsZWRTdGlja2VyUGFja3MoKTtcbiAgICAgICAgaWYgKGluc3RhbGxlZFN0aWNrZXJQYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBvcGVyYXRpb25zID0gaW5zdGFsbGVkU3RpY2tlclBhY2tzLm1hcChwYWNrID0+ICh7XG4gICAgICAgICAgICBwYWNrSWQ6IHBhY2suaWQsXG4gICAgICAgICAgICBwYWNrS2V5OiBwYWNrLmtleSxcbiAgICAgICAgICAgIGluc3RhbGxlZDogdHJ1ZSxcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICBpZiAod2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuYXJlV2VQcmltYXJ5RGV2aWNlKCkpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICAgICAnYmFja2dyb3VuZC9jb25uZWN0OiBXZSBhcmUgcHJpbWFyeSBkZXZpY2U7IG5vdCBzZW5kaW5nIHN0aWNrZXIgcGFjayBzeW5jJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsb2cuaW5mbygnZmlyc3RSdW46IHJlcXVlc3Rpbmcgc3RpY2tlcnMnLCBvcGVyYXRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKFxuICAgICAgICAgICAgICBNZXNzYWdlU2VuZGVyLmdldFN0aWNrZXJQYWNrU3luYyhvcGVyYXRpb25zKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgICAnY29ubmVjdDogRmFpbGVkIHRvIHF1ZXVlIHN0aWNrZXIgc3luYyBtZXNzYWdlJyxcbiAgICAgICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2cuaW5mbygnZmlyc3RSdW46IGRvbmUnKTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LnN0b3JhZ2Uub25yZWFkeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlkbGVEZXRlY3Rvci5zdGFydCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghY2hhbGxlbmdlSGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNoYWxsZW5nZSBoYW5kbGVyIHRvIGJlIGluaXRpYWxpemVkJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIEludGVudGlvbmFsbHkgbm90IGF3YWl0aW5nXG4gICAgICBjaGFsbGVuZ2VIYW5kbGVyLm9uT25saW5lKCk7XG5cbiAgICAgIHJlY29ubmVjdEJhY2tPZmYucmVzZXQoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY29ubmVjdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5TaWduYWxDb250ZXh0Lm5hdGl2ZVRoZW1lTGlzdGVuZXIuc3Vic2NyaWJlKHRoZW1lQ2hhbmdlZCk7XG5cbiAgY29uc3QgRklWRV9NSU5VVEVTID0gNSAqIGR1cmF0aW9ucy5NSU5VVEU7XG5cbiAgLy8gTm90ZTogb25jZSB0aGlzIGZ1bmN0aW9uIHJldHVybnMsIHRoZXJlIHN0aWxsIG1pZ2h0IGJlIG1lc3NhZ2VzIGJlaW5nIHByb2Nlc3NlZCBvblxuICAvLyAgIGEgZ2l2ZW4gY29udmVyc2F0aW9uJ3MgcXVldWUuIEJ1dCB3ZSBoYXZlIHByb2Nlc3NlZCBhbGwgZXZlbnRzIGZyb20gdGhlIHdlYnNvY2tldC5cbiAgYXN5bmMgZnVuY3Rpb24gd2FpdEZvckVtcHR5RXZlbnRRdWV1ZSgpIHtcbiAgICBpZiAoIW1lc3NhZ2VSZWNlaXZlcikge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICd3YWl0Rm9yRW1wdHlFdmVudFF1ZXVlOiBObyBtZXNzYWdlUmVjZWl2ZXIgYXZhaWxhYmxlLCByZXR1cm5pbmcgZWFybHknXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghbWVzc2FnZVJlY2VpdmVyLmhhc0VtcHRpZWQoKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICd3YWl0Rm9yRW1wdHlFdmVudFF1ZXVlOiBXYWl0aW5nIGZvciBNZXNzYWdlUmVjZWl2ZXIgZW1wdHkgZXZlbnQuLi4nXG4gICAgICApO1xuICAgICAgY29uc3QgeyByZXNvbHZlLCByZWplY3QsIHByb21pc2UgfSA9IGV4cGxvZGVQcm9taXNlPHZvaWQ+KCk7XG5cbiAgICAgIGNvbnN0IHRpbWVvdXQgPSBUaW1lcnMuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0VtcHR5IHF1ZXVlIG5ldmVyIGZpcmVkJykpO1xuICAgICAgfSwgRklWRV9NSU5VVEVTKTtcblxuICAgICAgY29uc3Qgb25FbXB0eU9uY2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChtZXNzYWdlUmVjZWl2ZXIpIHtcbiAgICAgICAgICBtZXNzYWdlUmVjZWl2ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW1wdHknLCBvbkVtcHR5T25jZSk7XG4gICAgICAgIH1cbiAgICAgICAgVGltZXJzLmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgaWYgKHJlc29sdmUpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcignZW1wdHknLCBvbkVtcHR5T25jZSk7XG5cbiAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ3dhaXRGb3JFbXB0eUV2ZW50UXVldWU6IFdhaXRpbmcgZm9yIGV2ZW50IGhhbmRsZXIgcXVldWUgaWRsZS4uLicpO1xuICAgIGF3YWl0IGV2ZW50SGFuZGxlclF1ZXVlLm9uSWRsZSgpO1xuICB9XG5cbiAgd2luZG93LndhaXRGb3JFbXB0eUV2ZW50UXVldWUgPSB3YWl0Rm9yRW1wdHlFdmVudFF1ZXVlO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIG9uRW1wdHkoKSB7XG4gICAgY29uc3QgeyBzdG9yYWdlIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHdpbmRvdy53YWl0Rm9yQWxsQmF0Y2hlcnMoKSxcbiAgICAgIHdpbmRvdy5mbHVzaEFsbFdhaXRCYXRjaGVycygpLFxuICAgIF0pO1xuICAgIGxvZy5pbmZvKCdvbkVtcHR5OiBBbGwgb3V0c3RhbmRpbmcgZGF0YWJhc2UgcmVxdWVzdHMgY29tcGxldGUnKTtcbiAgICB3aW5kb3cucmVhZHlGb3JVcGRhdGVzKCk7XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIub25FbXB0eSgpO1xuXG4gICAgLy8gU3RhcnQgbGlzdGVuZXJzIGhlcmUsIGFmdGVyIHdlIGdldCB0aHJvdWdoIG91ciBxdWV1ZS5cbiAgICBSb3RhdGVTaWduZWRQcmVLZXlMaXN0ZW5lci5pbml0KHdpbmRvdy5XaGlzcGVyLmV2ZW50cywgbmV3VmVyc2lvbik7XG5cbiAgICAvLyBHbyBiYWNrIHRvIG1haW4gcHJvY2VzcyBiZWZvcmUgcHJvY2Vzc2luZyBkZWxheWVkIGFjdGlvbnNcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ29CYWNrVG9NYWluUHJvY2VzcygpO1xuXG4gICAgcHJvZmlsZUtleVJlc3BvbnNlUXVldWUuc3RhcnQoKTtcbiAgICBsaWdodFNlc3Npb25SZXNldFF1ZXVlLnN0YXJ0KCk7XG4gICAgb25EZWNyeXB0aW9uRXJyb3JRdWV1ZS5zdGFydCgpO1xuICAgIG9uUmV0cnlSZXF1ZXN0UXVldWUuc3RhcnQoKTtcbiAgICB3aW5kb3cuV2hpc3Blci5kZWxpdmVyeVJlY2VpcHRRdWV1ZS5zdGFydCgpO1xuICAgIG5vdGlmaWNhdGlvblNlcnZpY2UuZW5hYmxlKCk7XG5cbiAgICBhd2FpdCBvbkFwcFZpZXc7XG5cbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmFwcC5pbml0aWFsTG9hZENvbXBsZXRlKCk7XG5cbiAgICBjb25zdCBwcm9jZXNzZWRDb3VudCA9IG1lc3NhZ2VSZWNlaXZlcj8uZ2V0QW5kUmVzZXRQcm9jZXNzZWRDb3VudCgpIHx8IDA7XG4gICAgd2luZG93LmxvZ0FwcExvYWRlZEV2ZW50Py4oe1xuICAgICAgcHJvY2Vzc2VkQ291bnQsXG4gICAgfSk7XG4gICAgaWYgKG1lc3NhZ2VSZWNlaXZlcikge1xuICAgICAgbG9nLmluZm8oJ0FwcCBsb2FkZWQgLSBtZXNzYWdlczonLCBwcm9jZXNzZWRDb3VudCk7XG4gICAgfVxuXG4gICAgd2luZG93LlNpZ25hbC5VdGlsLnNldEJhdGNoaW5nU3RyYXRlZ3koZmFsc2UpO1xuXG4gICAgY29uc3QgYXR0YWNobWVudERvd25sb2FkUXVldWUgPSB3aW5kb3cuYXR0YWNobWVudERvd25sb2FkUXVldWUgfHwgW107XG5cbiAgICAvLyBOT1RFOiB0cy9tb2RlbHMvbWVzc2FnZXMudHMgZXhwZWN0cyB0aGlzIGdsb2JhbCB0byBiZWNvbWUgdW5kZWZpbmVkXG4gICAgLy8gb25jZSB3ZSBzdG9wIHByb2Nlc3NpbmcgdGhlIHF1ZXVlLlxuICAgIHdpbmRvdy5hdHRhY2htZW50RG93bmxvYWRRdWV1ZSA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IE1BWF9BVFRBQ0hNRU5UX01TR1NfVE9fRE9XTkxPQUQgPSAyNTA7XG4gICAgY29uc3QgYXR0YWNobWVudHNUb0Rvd25sb2FkID0gYXR0YWNobWVudERvd25sb2FkUXVldWUuZmlsdGVyKFxuICAgICAgKG1lc3NhZ2UsIGluZGV4KSA9PlxuICAgICAgICBpbmRleCA8PSBNQVhfQVRUQUNITUVOVF9NU0dTX1RPX0RPV05MT0FEIHx8XG4gICAgICAgIGlzTW9yZVJlY2VudFRoYW4oXG4gICAgICAgICAgbWVzc2FnZS5nZXRSZWNlaXZlZEF0KCksXG4gICAgICAgICAgTUFYX0FUVEFDSE1FTlRfRE9XTkxPQURfQUdFXG4gICAgICAgICkgfHxcbiAgICAgICAgLy8gU3RpY2tlcnMgYW5kIGxvbmcgdGV4dCBhdHRhY2htZW50cyBoYXMgdG8gYmUgZG93bmxvYWRlZCBmb3IgVUlcbiAgICAgICAgLy8gdG8gZGlzcGxheSB0aGUgbWVzc2FnZSBwcm9wZXJseS5cbiAgICAgICAgbWVzc2FnZS5oYXNSZXF1aXJlZEF0dGFjaG1lbnREb3dubG9hZHMoKVxuICAgICk7XG4gICAgbG9nLmluZm8oXG4gICAgICAnRG93bmxvYWRpbmcgcmVjZW50IGF0dGFjaG1lbnRzIG9mIHRvdGFsIGF0dGFjaG1lbnRzJyxcbiAgICAgIGF0dGFjaG1lbnRzVG9Eb3dubG9hZC5sZW5ndGgsXG4gICAgICBhdHRhY2htZW50RG93bmxvYWRRdWV1ZS5sZW5ndGhcbiAgICApO1xuXG4gICAgaWYgKHdpbmRvdy5zdGFydHVwUHJvY2Vzc2luZ1F1ZXVlKSB7XG4gICAgICB3aW5kb3cuc3RhcnR1cFByb2Nlc3NpbmdRdWV1ZS5mbHVzaCgpO1xuICAgICAgd2luZG93LnN0YXJ0dXBQcm9jZXNzaW5nUXVldWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZXNXaXRoRG93bmxvYWRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBhdHRhY2htZW50c1RvRG93bmxvYWQubWFwKG1lc3NhZ2UgPT4gbWVzc2FnZS5xdWV1ZUF0dGFjaG1lbnREb3dubG9hZHMoKSlcbiAgICApO1xuICAgIGNvbnN0IG1lc3NhZ2VzVG9TYXZlOiBBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+ID0gW107XG4gICAgbWVzc2FnZXNXaXRoRG93bmxvYWRzLmZvckVhY2goKHNob3VsZFNhdmUsIG1lc3NhZ2VLZXkpID0+IHtcbiAgICAgIGlmIChzaG91bGRTYXZlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhdHRhY2htZW50c1RvRG93bmxvYWRbbWVzc2FnZUtleV07XG4gICAgICAgIG1lc3NhZ2VzVG9TYXZlLnB1c2gobWVzc2FnZS5hdHRyaWJ1dGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2VzKG1lc3NhZ2VzVG9TYXZlLCB7XG4gICAgICBvdXJVdWlkOiBzdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgIH0pO1xuXG4gICAgLy8gUHJvY2VzcyBjcmFzaCByZXBvcnRzIGlmIGFueVxuICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY3Jhc2hSZXBvcnRzLnNldENyYXNoUmVwb3J0Q291bnQoXG4gICAgICBhd2FpdCB3aW5kb3cuY3Jhc2hSZXBvcnRzLmdldENvdW50KClcbiAgICApO1xuXG4gICAgLy8gS2ljayBvZmYgYSBwcm9maWxlIHJlZnJlc2ggaWYgbmVjZXNzYXJ5LCBidXQgZG9uJ3Qgd2FpdCBmb3IgaXQsIGFzIGZhaWx1cmUgaXNcbiAgICAvLyAgIHRvbGVyYWJsZS5cbiAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25JZCgpO1xuICAgIGlmIChvdXJDb252ZXJzYXRpb25JZCkge1xuICAgICAgcm91dGluZVByb2ZpbGVSZWZyZXNoKHtcbiAgICAgICAgYWxsQ29udmVyc2F0aW9uczogd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0QWxsKCksXG4gICAgICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzdG9yYWdlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgICdGYWlsZWQgdG8gZmV0Y2ggb3VyIGNvbnZlcnNhdGlvbiBJRC4gU2tpcHBpbmcgcm91dGluZSBwcm9maWxlIHJlZnJlc2gnXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIHRoZSBQTkkgaWRlbnRpdHlcblxuICAgIGNvbnN0IHBuaSA9IHN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZChVVUlES2luZC5QTkkpO1xuICAgIGNvbnN0IHBuaUlkZW50aXR5ID0gYXdhaXQgc3RvcmFnZS5wcm90b2NvbC5nZXRJZGVudGl0eUtleVBhaXIocG5pKTtcbiAgICBpZiAoIXBuaUlkZW50aXR5KSB7XG4gICAgICBsb2cuaW5mbygnUmVxdWVzdGluZyBQTkkgaWRlbnRpdHkgc3luYycpO1xuICAgICAgYXdhaXQgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoXG4gICAgICAgIE1lc3NhZ2VTZW5kZXIuZ2V0UmVxdWVzdFBuaUlkZW50aXR5U3luY01lc3NhZ2UoKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBsZXQgaW5pdGlhbFN0YXJ0dXBDb3VudCA9IDA7XG4gIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbignaW5jcmVtZW50UHJvZ3Jlc3MnLCBpbmNyZW1lbnRQcm9ncmVzcyk7XG4gIGZ1bmN0aW9uIGluY3JlbWVudFByb2dyZXNzKCkge1xuICAgIGluaXRpYWxTdGFydHVwQ291bnQgKz0gMTtcblxuICAgIC8vIE9ubHkgdXBkYXRlIHByb2dyZXNzIGV2ZXJ5IDEwIGl0ZW1zXG4gICAgaWYgKGluaXRpYWxTdGFydHVwQ291bnQgJSAxMCAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKGBpbmNyZW1lbnRQcm9ncmVzczogTWVzc2FnZSBjb3VudCBpcyAke2luaXRpYWxTdGFydHVwQ291bnR9YCk7XG5cbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMudHJpZ2dlcignbG9hZGluZ1Byb2dyZXNzJywgaW5pdGlhbFN0YXJ0dXBDb3VudCk7XG4gIH1cblxuICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ21hbnVhbENvbm5lY3QnLCBtYW51YWxDb25uZWN0KTtcbiAgZnVuY3Rpb24gbWFudWFsQ29ubmVjdCgpIHtcbiAgICBpZiAoaXNTb2NrZXRPbmxpbmUoKSkge1xuICAgICAgbG9nLmluZm8oJ21hbnVhbENvbm5lY3Q6IGFscmVhZHkgb25saW5lOyBub3QgY29ubmVjdGluZyBhZ2FpbicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdtYW51YWxDb25uZWN0OiBjYWxsaW5nIGNvbm5lY3QoKScpO1xuICAgIGNvbm5lY3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29uZmlndXJhdGlvbihldjogQ29uZmlndXJhdGlvbkV2ZW50KSB7XG4gICAgZXYuY29uZmlybSgpO1xuXG4gICAgY29uc3QgeyBjb25maWd1cmF0aW9uIH0gPSBldjtcbiAgICBjb25zdCB7XG4gICAgICByZWFkUmVjZWlwdHMsXG4gICAgICB0eXBpbmdJbmRpY2F0b3JzLFxuICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcnlJbmRpY2F0b3JzLFxuICAgICAgbGlua1ByZXZpZXdzLFxuICAgIH0gPSBjb25maWd1cmF0aW9uO1xuXG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdyZWFkLXJlY2VpcHQtc2V0dGluZycsIEJvb2xlYW4ocmVhZFJlY2VpcHRzKSk7XG5cbiAgICBpZiAoXG4gICAgICB1bmlkZW50aWZpZWREZWxpdmVyeUluZGljYXRvcnMgPT09IHRydWUgfHxcbiAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJ5SW5kaWNhdG9ycyA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChcbiAgICAgICAgJ3VuaWRlbnRpZmllZERlbGl2ZXJ5SW5kaWNhdG9ycycsXG4gICAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJ5SW5kaWNhdG9yc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodHlwaW5nSW5kaWNhdG9ycyA9PT0gdHJ1ZSB8fCB0eXBpbmdJbmRpY2F0b3JzID09PSBmYWxzZSkge1xuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCd0eXBpbmdJbmRpY2F0b3JzJywgdHlwaW5nSW5kaWNhdG9ycyk7XG4gICAgfVxuXG4gICAgaWYgKGxpbmtQcmV2aWV3cyA9PT0gdHJ1ZSB8fCBsaW5rUHJldmlld3MgPT09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2xpbmtQcmV2aWV3cycsIGxpbmtQcmV2aWV3cyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25UeXBpbmcoZXY6IFR5cGluZ0V2ZW50KSB7XG4gICAgLy8gTm90ZTogdGhpcyB0eXBlIG9mIG1lc3NhZ2UgaXMgYXV0b21hdGljYWxseSByZW1vdmVkIGZyb20gY2FjaGUgaW4gTWVzc2FnZVJlY2VpdmVyXG5cbiAgICBjb25zdCB7IHR5cGluZywgc2VuZGVyLCBzZW5kZXJVdWlkLCBzZW5kZXJEZXZpY2UgfSA9IGV2O1xuICAgIGNvbnN0IHsgZ3JvdXBJZCwgZ3JvdXBWMklkLCBzdGFydGVkIH0gPSB0eXBpbmcgfHwge307XG5cbiAgICAvLyBXZSBkb24ndCBkbyBhbnl0aGluZyB3aXRoIGluY29taW5nIHR5cGluZyBtZXNzYWdlcyBpZiB0aGUgc2V0dGluZyBpcyBkaXNhYmxlZFxuICAgIGlmICghd2luZG93LnN0b3JhZ2UuZ2V0KCd0eXBpbmdJbmRpY2F0b3JzJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29udmVyc2F0aW9uO1xuXG4gICAgY29uc3Qgc2VuZGVySWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIGUxNjQ6IHNlbmRlcixcbiAgICAgIHV1aWQ6IHNlbmRlclV1aWQsXG4gICAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgICByZWFzb246IGBvblR5cGluZygke3R5cGluZy50aW1lc3RhbXB9KWAsXG4gICAgfSk7XG5cbiAgICAvLyBXZSBtdWx0aXBsZXggYmV0d2VlbiBHVjEvR1YyIGdyb3VwcyBoZXJlLCBidXQgd2UgZG9uJ3Qga2ljayBvZmYgbWlncmF0aW9uc1xuICAgIGlmIChncm91cFYySWQpIHtcbiAgICAgIGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChncm91cFYySWQpO1xuICAgIH1cbiAgICBpZiAoIWNvbnZlcnNhdGlvbiAmJiBncm91cElkKSB7XG4gICAgICBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoZ3JvdXBJZCk7XG4gICAgfVxuICAgIGlmICghZ3JvdXBWMklkICYmICFncm91cElkICYmIHNlbmRlcklkKSB7XG4gICAgICBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoc2VuZGVySWQpO1xuICAgIH1cblxuICAgIGNvbnN0IG91cklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcblxuICAgIGlmICghc2VuZGVySWQpIHtcbiAgICAgIGxvZy53YXJuKCdvblR5cGluZzogZW5zdXJlQ29udGFjdElkcyByZXR1cm5lZCBmYWxzZXkgc2VuZGVySWQhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghb3VySWQpIHtcbiAgICAgIGxvZy53YXJuKFwib25UeXBpbmc6IENvdWxkbid0IGdldCBvdXIgb3duIGlkIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgb25UeXBpbmc6IERpZCBub3QgZmluZCBjb252ZXJzYXRpb24gZm9yIHR5cGluZyBpbmRpY2F0b3IgKGdyb3VwdjIoJHtncm91cFYySWR9KSwgZ3JvdXAoJHtncm91cElkfSksICR7c2VuZGVyfSwgJHtzZW5kZXJVdWlkfSlgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFdlIGRyb3AgdHlwaW5nIG5vdGlmaWNhdGlvbnMgaW4gZ3JvdXBzIHdlJ3JlIG5vdCBhIHBhcnQgb2ZcbiAgICBpZiAoXG4gICAgICAhaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpICYmXG4gICAgICAhY29udmVyc2F0aW9uLmhhc01lbWJlcihvdXJJZClcbiAgICApIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgUmVjZWl2ZWQgdHlwaW5nIGluZGljYXRvciBmb3IgZ3JvdXAgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9LCB3aGljaCB3ZSdyZSBub3QgYSBwYXJ0IG9mLiBEcm9wcGluZy5gXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udmVyc2F0aW9uPy5pc0Jsb2NrZWQoKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBvblR5cGluZzogY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyBibG9ja2VkLCBkcm9wcGluZyB0eXBpbmcgbWVzc2FnZWBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNlbmRlckNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChzZW5kZXJJZCk7XG4gICAgaWYgKCFzZW5kZXJDb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy53YXJuKCdvblR5cGluZzogTm8gY29udmVyc2F0aW9uIGZvciBzZW5kZXIhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzZW5kZXJDb252ZXJzYXRpb24uaXNCbG9ja2VkKCkpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgb25UeXBpbmc6IHNlbmRlciAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgYmxvY2tlZCwgZHJvcHBpbmcgdHlwaW5nIG1lc3NhZ2VgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnZlcnNhdGlvbi5ub3RpZnlUeXBpbmcoe1xuICAgICAgaXNUeXBpbmc6IHN0YXJ0ZWQsXG4gICAgICBmcm9tTWU6IHNlbmRlcklkID09PSBvdXJJZCxcbiAgICAgIHNlbmRlcklkLFxuICAgICAgc2VuZGVyRGV2aWNlLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gb25TdGlja2VyUGFjayhldjogU3RpY2tlclBhY2tFdmVudCkge1xuICAgIGV2LmNvbmZpcm0oKTtcblxuICAgIGNvbnN0IHBhY2tzID0gZXYuc3RpY2tlclBhY2tzO1xuXG4gICAgcGFja3MuZm9yRWFjaChwYWNrID0+IHtcbiAgICAgIGNvbnN0IHsgaWQsIGtleSwgaXNJbnN0YWxsLCBpc1JlbW92ZSB9ID0gcGFjayB8fCB7fTtcblxuICAgICAgaWYgKCFpZCB8fCAha2V5IHx8ICghaXNJbnN0YWxsICYmICFpc1JlbW92ZSkpIHtcbiAgICAgICAgbG9nLndhcm4oJ1JlY2VpdmVkIG1hbGZvcm1lZCBzdGlja2VyIHBhY2sgb3BlcmF0aW9uIHN5bmMgbWVzc2FnZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXR1cyA9IFN0aWNrZXJzLmdldFN0aWNrZXJQYWNrU3RhdHVzKGlkKTtcblxuICAgICAgaWYgKHN0YXR1cyA9PT0gJ2luc3RhbGxlZCcgJiYgaXNSZW1vdmUpIHtcbiAgICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5zdGlja2Vycy51bmluc3RhbGxTdGlja2VyUGFjayhpZCwga2V5LCB7XG4gICAgICAgICAgZnJvbVN5bmM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc0luc3RhbGwpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Rvd25sb2FkZWQnKSB7XG4gICAgICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5zdGlja2Vycy5pbnN0YWxsU3RpY2tlclBhY2soaWQsIGtleSwge1xuICAgICAgICAgICAgZnJvbVN5bmM6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgU3RpY2tlcnMuZG93bmxvYWRTdGlja2VyUGFjayhpZCwga2V5LCB7XG4gICAgICAgICAgICBmaW5hbFN0YXR1czogJ2luc3RhbGxlZCcsXG4gICAgICAgICAgICBmcm9tU3luYzogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gb25Db250YWN0U3luY0NvbXBsZXRlKCkge1xuICAgIGxvZy5pbmZvKCdvbkNvbnRhY3RTeW5jQ29tcGxldGUnKTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wdXQoJ3N5bmNlZF9hdCcsIERhdGUubm93KCkpO1xuICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCdjb250YWN0U3luYzpjb21wbGV0ZScpO1xuICB9XG5cbiAgLy8gdGhpcyBtYXliZSByZWNlaXZlZCBuZXcgY29udGFjdFxuICBhc3luYyBmdW5jdGlvbiBvbkNvbnRhY3RSZWNlaXZlZChldjogQ29udGFjdEV2ZW50KSB7XG4gICAgY29uc3QgZGV0YWlscyA9IGV2LmNvbnRhY3REZXRhaWxzO1xuXG4gICAgY29uc3QgYyA9IG5ldyB3aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb24oe1xuICAgICAgZTE2NDogZGV0YWlscy5udW1iZXIsXG4gICAgICB1dWlkOiBkZXRhaWxzLnV1aWQsXG4gICAgICB0eXBlOiAncHJpdmF0ZScsXG4gICAgfSBhcyBQYXJ0aWFsPENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlPiBhcyBXaGF0SXNUaGlzKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSBjLnZhbGlkYXRlKCk7XG4gICAgaWYgKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnSW52YWxpZCBjb250YWN0IHJlY2VpdmVkOicsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdCh2YWxpZGF0aW9uRXJyb3IpXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZXRhaWxzSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgZTE2NDogZGV0YWlscy5udW1iZXIsXG4gICAgICAgIHV1aWQ6IGRldGFpbHMudXVpZCxcbiAgICAgICAgaGlnaFRydXN0OiB0cnVlLFxuICAgICAgICByZWFzb246ICdvbkNvbnRhY3RSZWNlaXZlZCcsXG4gICAgICB9KTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoZGV0YWlsc0lkKSE7XG5cbiAgICAgIGNvbnZlcnNhdGlvbi5zZXQoe1xuICAgICAgICBuYW1lOiBkZXRhaWxzLm5hbWUsXG4gICAgICAgIGluYm94X3Bvc2l0aW9uOiBkZXRhaWxzLmluYm94UG9zaXRpb24sXG4gICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBjb252ZXJzYXRpb24gYXZhdGFyIG9ubHkgaWYgbmV3IGF2YXRhciBleGlzdHMgYW5kIGhhc2ggZGlmZmVyc1xuICAgICAgY29uc3QgeyBhdmF0YXIgfSA9IGRldGFpbHM7XG4gICAgICBpZiAoYXZhdGFyICYmIGF2YXRhci5kYXRhKSB7XG4gICAgICAgIGNvbnN0IG5ld0F0dHJpYnV0ZXMgPSBhd2FpdCBDb252ZXJzYXRpb24ubWF5YmVVcGRhdGVBdmF0YXIoXG4gICAgICAgICAgY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgYXZhdGFyLmRhdGEsXG4gICAgICAgICAge1xuICAgICAgICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgICAgICAgIGRlbGV0ZUF0dGFjaG1lbnREYXRhLFxuICAgICAgICAgICAgZG9lc0F0dGFjaG1lbnRFeGlzdCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnZlcnNhdGlvbi5zZXQobmV3QXR0cmlidXRlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuYXZhdGFyICYmIGF0dHJpYnV0ZXMuYXZhdGFyLnBhdGgpIHtcbiAgICAgICAgICBhd2FpdCBkZWxldGVBdHRhY2htZW50RGF0YShhdHRyaWJ1dGVzLmF2YXRhci5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb252ZXJzYXRpb24uc2V0KHsgYXZhdGFyOiBudWxsIH0pO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICAgICAgLy8gZXhwaXJlVGltZXIgaXNuJ3Qgc3RvcmVkIGluIFN0b3JhZ2UgU2VydmljZSBzbyB3ZSBoYXZlIHRvIHJlbHkgb24gdGhlXG4gICAgICAvLyBjb250YWN0IHN5bmMuXG4gICAgICBjb25zdCB7IGV4cGlyZVRpbWVyIH0gPSBkZXRhaWxzO1xuICAgICAgY29uc3QgaXNWYWxpZEV4cGlyZVRpbWVyID0gdHlwZW9mIGV4cGlyZVRpbWVyID09PSAnbnVtYmVyJztcbiAgICAgIGlmIChpc1ZhbGlkRXhwaXJlVGltZXIpIHtcbiAgICAgICAgYXdhaXQgY29udmVyc2F0aW9uLnVwZGF0ZUV4cGlyYXRpb25UaW1lcihleHBpcmVUaW1lciwge1xuICAgICAgICAgIHNvdXJjZTogd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKSxcbiAgICAgICAgICByZWNlaXZlZEF0OiBldi5yZWNlaXZlZEF0Q291bnRlcixcbiAgICAgICAgICBmcm9tU3luYzogdHJ1ZSxcbiAgICAgICAgICBpc0luaXRpYWxTeW5jLFxuICAgICAgICAgIHJlYXNvbjogJ2NvbnRhY3Qgc3luYycsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoJ29uQ29udGFjdFJlY2VpdmVkIGVycm9yOicsIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIG9uR3JvdXBTeW5jQ29tcGxldGUoKSB7XG4gICAgbG9nLmluZm8oJ29uR3JvdXBTeW5jQ29tcGxldGUnKTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wdXQoJ3N5bmNlZF9hdCcsIERhdGUubm93KCkpO1xuICB9XG5cbiAgLy8gTm90ZTogdGhpcyBoYW5kbGVyIGlzIG9ubHkgZm9yIHYxIGdyb3VwcyByZWNlaXZlZCB2aWEgJ2dyb3VwIHN5bmMnIG1lc3NhZ2VzXG4gIGFzeW5jIGZ1bmN0aW9uIG9uR3JvdXBSZWNlaXZlZChldjogR3JvdXBFdmVudCkge1xuICAgIGNvbnN0IGRldGFpbHMgPSBldi5ncm91cERldGFpbHM7XG4gICAgY29uc3QgeyBpZCB9ID0gZGV0YWlscztcblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlQW5kV2FpdChcbiAgICAgIGlkLFxuICAgICAgJ2dyb3VwJ1xuICAgICk7XG4gICAgaWYgKGlzR3JvdXBWMihjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgIGxvZy53YXJuKCdHb3QgZ3JvdXAgc3luYyBmb3IgdjIgZ3JvdXA6ICcsIGNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVyQ29udmVyc2F0aW9ucyA9IGRldGFpbHMubWVtYmVyc0UxNjQubWFwKGUxNjQgPT5cbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKGUxNjQsICdwcml2YXRlJylcbiAgICApO1xuXG4gICAgY29uc3QgbWVtYmVycyA9IG1lbWJlckNvbnZlcnNhdGlvbnMubWFwKGMgPT4gYy5nZXQoJ2lkJykpO1xuXG4gICAgY29uc3QgdXBkYXRlczogUGFydGlhbDxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4gPSB7XG4gICAgICBuYW1lOiBkZXRhaWxzLm5hbWUsXG4gICAgICBtZW1iZXJzLFxuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIGluYm94X3Bvc2l0aW9uOiBkZXRhaWxzLmluYm94UG9zaXRpb24sXG4gICAgfTtcblxuICAgIGlmIChkZXRhaWxzLmFjdGl2ZSkge1xuICAgICAgdXBkYXRlcy5sZWZ0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZXMubGVmdCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGRldGFpbHMuYmxvY2tlZCkge1xuICAgICAgY29udmVyc2F0aW9uLmJsb2NrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnZlcnNhdGlvbi51bmJsb2NrKCk7XG4gICAgfVxuXG4gICAgY29udmVyc2F0aW9uLnNldCh1cGRhdGVzKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgY29udmVyc2F0aW9uIGF2YXRhciBvbmx5IGlmIG5ldyBhdmF0YXIgZXhpc3RzIGFuZCBoYXNoIGRpZmZlcnNcbiAgICBjb25zdCB7IGF2YXRhciB9ID0gZGV0YWlscztcbiAgICBpZiAoYXZhdGFyICYmIGF2YXRhci5kYXRhKSB7XG4gICAgICBjb25zdCBuZXdBdHRyaWJ1dGVzID0gYXdhaXQgQ29udmVyc2F0aW9uLm1heWJlVXBkYXRlQXZhdGFyKFxuICAgICAgICBjb252ZXJzYXRpb24uYXR0cmlidXRlcyxcbiAgICAgICAgYXZhdGFyLmRhdGEsXG4gICAgICAgIHtcbiAgICAgICAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhLFxuICAgICAgICAgIGRlbGV0ZUF0dGFjaG1lbnREYXRhLFxuICAgICAgICAgIGRvZXNBdHRhY2htZW50RXhpc3QsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb252ZXJzYXRpb24uc2V0KG5ld0F0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuXG4gICAgY29uc3QgeyBleHBpcmVUaW1lciB9ID0gZGV0YWlscztcbiAgICBjb25zdCBpc1ZhbGlkRXhwaXJlVGltZXIgPSB0eXBlb2YgZXhwaXJlVGltZXIgPT09ICdudW1iZXInO1xuICAgIGlmICghaXNWYWxpZEV4cGlyZVRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgY29udmVyc2F0aW9uLnVwZGF0ZUV4cGlyYXRpb25UaW1lcihleHBpcmVUaW1lciwge1xuICAgICAgZnJvbVN5bmM6IHRydWUsXG4gICAgICByZWNlaXZlZEF0OiBldi5yZWNlaXZlZEF0Q291bnRlcixcbiAgICAgIHNvdXJjZTogd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKSxcbiAgICAgIHJlYXNvbjogJ2dyb3VwIHN5bmMnLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVjZWl2ZWQ6XG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VSZWNlaXZlZFByb2ZpbGVVcGRhdGUoe1xuICAgIGRhdGEsXG4gICAgY29uZmlybSxcbiAgICBtZXNzYWdlRGVzY3JpcHRvcixcbiAgfToge1xuICAgIGRhdGE6IE1lc3NhZ2VFdmVudERhdGE7XG4gICAgY29uZmlybTogKCkgPT4gdm9pZDtcbiAgICBtZXNzYWdlRGVzY3JpcHRvcjogTWVzc2FnZURlc2NyaXB0b3I7XG4gIH0pIHtcbiAgICBjb25zdCB7IHByb2ZpbGVLZXkgfSA9IGRhdGEubWVzc2FnZTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBwcm9maWxlS2V5ICE9PSB1bmRlZmluZWQsXG4gICAgICAnaGFuZGxlTWVzc2FnZVJlY2VpdmVkUHJvZmlsZVVwZGF0ZTogbWlzc2luZyBwcm9maWxlS2V5J1xuICAgICk7XG4gICAgY29uc3Qgc2VuZGVyID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KG1lc3NhZ2VEZXNjcmlwdG9yLmlkKTtcblxuICAgIGlmIChzZW5kZXIpIHtcbiAgICAgIC8vIFdpbGwgZG8gdGhlIHNhdmUgZm9yIHVzXG4gICAgICBhd2FpdCBzZW5kZXIuc2V0UHJvZmlsZUtleShwcm9maWxlS2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlybSgpO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uZFdpdGhQcm9maWxlS2V5QmF0Y2hlciA9IGNyZWF0ZUJhdGNoZXI8Q29udmVyc2F0aW9uTW9kZWw+KHtcbiAgICBuYW1lOiAncmVzcG9uZFdpdGhQcm9maWxlS2V5QmF0Y2hlcicsXG4gICAgcHJvY2Vzc0JhdGNoKGJhdGNoKSB7XG4gICAgICBjb25zdCBkZWR1cGVkID0gbmV3IFNldChiYXRjaCk7XG4gICAgICBkZWR1cGVkLmZvckVhY2goYXN5bmMgc2VuZGVyID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIShhd2FpdCBzaG91bGRSZXNwb25kV2l0aFByb2ZpbGVLZXkoc2VuZGVyKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdyZXNwb25kV2l0aFByb2ZpbGVLZXlCYXRjaGVyIGVycm9yJywgZXJyb3IgJiYgZXJyb3Iuc3RhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VuZGVyLnF1ZXVlSm9iKCdzZW5kUHJvZmlsZUtleVVwZGF0ZScsICgpID0+XG4gICAgICAgICAgc2VuZGVyLnNlbmRQcm9maWxlS2V5VXBkYXRlKClcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB3YWl0OiAyMDAsXG4gICAgbWF4U2l6ZTogSW5maW5pdHksXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIG9uRW52ZWxvcGVSZWNlaXZlZCh7IGVudmVsb3BlIH06IEVudmVsb3BlRXZlbnQpIHtcbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoKT8udG9TdHJpbmcoKTtcbiAgICBpZiAoZW52ZWxvcGUuc291cmNlVXVpZCAmJiBlbnZlbG9wZS5zb3VyY2VVdWlkICE9PSBvdXJVdWlkKSB7XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgZTE2NDogZW52ZWxvcGUuc291cmNlLFxuICAgICAgICB1dWlkOiBlbnZlbG9wZS5zb3VyY2VVdWlkLFxuICAgICAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgICAgIHJlYXNvbjogYG9uRW52ZWxvcGVSZWNlaXZlZCgke2VudmVsb3BlLnRpbWVzdGFtcH0pYCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE5vdGU6IFdlIGRvIHZlcnkgbGl0dGxlIGluIHRoaXMgZnVuY3Rpb24sIHNpbmNlIGV2ZXJ5dGhpbmcgaW4gaGFuZGxlRGF0YU1lc3NhZ2UgaXNcbiAgLy8gICBpbnNpZGUgYSBjb252ZXJzYXRpb24tc3BlY2lmaWMgcXVldWUoKS4gQW55IGNvZGUgaGVyZSBtaWdodCBydW4gYmVmb3JlIGFuIGVhcmxpZXJcbiAgLy8gICBtZXNzYWdlIGlzIHByb2Nlc3NlZCBpbiBoYW5kbGVEYXRhTWVzc2FnZSgpLlxuICBmdW5jdGlvbiBvbk1lc3NhZ2VSZWNlaXZlZChldmVudDogTWVzc2FnZUV2ZW50KSB7XG4gICAgY29uc3QgeyBkYXRhLCBjb25maXJtIH0gPSBldmVudDtcblxuICAgIGNvbnN0IG1lc3NhZ2VEZXNjcmlwdG9yID0gZ2V0TWVzc2FnZURlc2NyaXB0b3Ioe1xuICAgICAgY29uZmlybSxcbiAgICAgIC4uLmRhdGEsXG4gICAgICAvLyAnbWVzc2FnZScgZXZlbnQ6IGZvciAxOjEgY29udmVyYXRpb25zLCB0aGUgY29udmVyc2F0aW9uIGlzIHNhbWUgYXMgc2VuZGVyXG4gICAgICBkZXN0aW5hdGlvbjogZGF0YS5zb3VyY2UsXG4gICAgICBkZXN0aW5hdGlvblV1aWQ6IGRhdGEuc291cmNlVXVpZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgUFJPRklMRV9LRVlfVVBEQVRFIH0gPSBQcm90by5EYXRhTWVzc2FnZS5GbGFncztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgIGNvbnN0IGlzUHJvZmlsZVVwZGF0ZSA9IEJvb2xlYW4oZGF0YS5tZXNzYWdlLmZsYWdzICYgUFJPRklMRV9LRVlfVVBEQVRFKTtcbiAgICBpZiAoaXNQcm9maWxlVXBkYXRlKSB7XG4gICAgICByZXR1cm4gaGFuZGxlTWVzc2FnZVJlY2VpdmVkUHJvZmlsZVVwZGF0ZSh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbmZpcm0sXG4gICAgICAgIG1lc3NhZ2VEZXNjcmlwdG9yLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IGluaXRJbmNvbWluZ01lc3NhZ2UoZGF0YSwgbWVzc2FnZURlc2NyaXB0b3IpO1xuXG4gICAgaWYgKFxuICAgICAgaXNJbmNvbWluZyhtZXNzYWdlLmF0dHJpYnV0ZXMpICYmXG4gICAgICAhbWVzc2FnZS5nZXQoJ3VuaWRlbnRpZmllZERlbGl2ZXJ5UmVjZWl2ZWQnKVxuICAgICkge1xuICAgICAgY29uc3Qgc2VuZGVyID0gZ2V0Q29udGFjdChtZXNzYWdlLmF0dHJpYnV0ZXMpO1xuXG4gICAgICBpZiAoIXNlbmRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2VNb2RlbCBoYXMgbm8gc2VuZGVyLicpO1xuICAgICAgfVxuXG4gICAgICBwcm9maWxlS2V5UmVzcG9uc2VRdWV1ZS5hZGQoKCkgPT4ge1xuICAgICAgICByZXNwb25kV2l0aFByb2ZpbGVLZXlCYXRjaGVyLmFkZChzZW5kZXIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubWVzc2FnZS5yZWFjdGlvbikge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBkYXRhLm1lc3NhZ2UucmVhY3Rpb24udGFyZ2V0QXV0aG9yVXVpZCxcbiAgICAgICAgJ1JlYWN0aW9uIHdpdGhvdXQgdGFyZ2V0QXV0aG9yVXVpZCdcbiAgICAgICk7XG4gICAgICBjb25zdCB0YXJnZXRBdXRob3JVdWlkID0gbm9ybWFsaXplVXVpZChcbiAgICAgICAgZGF0YS5tZXNzYWdlLnJlYWN0aW9uLnRhcmdldEF1dGhvclV1aWQsXG4gICAgICAgICdEYXRhTWVzc2FnZS5SZWFjdGlvbi50YXJnZXRBdXRob3JVdWlkJ1xuICAgICAgKTtcblxuICAgICAgY29uc3QgeyByZWFjdGlvbiwgdGltZXN0YW1wIH0gPSBkYXRhLm1lc3NhZ2U7XG5cbiAgICAgIGlmICghaXNWYWxpZFJlYWN0aW9uRW1vamkocmVhY3Rpb24uZW1vamkpKSB7XG4gICAgICAgIGxvZy53YXJuKCdSZWNlaXZlZCBhbiBpbnZhbGlkIHJlYWN0aW9uIGVtb2ppLiBEcm9wcGluZyBpdCcpO1xuICAgICAgICBjb25maXJtKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cblxuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICByZWFjdGlvbi50YXJnZXRUaW1lc3RhbXAsXG4gICAgICAgICdSZWFjdGlvbiB3aXRob3V0IHRhcmdldFRpbWVzdGFtcCdcbiAgICAgICk7XG4gICAgICBjb25zdCBmcm9tSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgZTE2NDogZGF0YS5zb3VyY2UsXG4gICAgICAgIHV1aWQ6IGRhdGEuc291cmNlVXVpZCxcbiAgICAgIH0pO1xuICAgICAgc3RyaWN0QXNzZXJ0KGZyb21JZCwgJ1JlYWN0aW9uIHdpdGhvdXQgZnJvbUlkJyk7XG5cbiAgICAgIGxvZy5pbmZvKCdRdWV1aW5nIGluY29taW5nIHJlYWN0aW9uIGZvcicsIHJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCk7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVzOiBSZWFjdGlvbkF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBlbW9qaTogcmVhY3Rpb24uZW1vamksXG4gICAgICAgIHJlbW92ZTogcmVhY3Rpb24ucmVtb3ZlLFxuICAgICAgICB0YXJnZXRBdXRob3JVdWlkLFxuICAgICAgICB0YXJnZXRUaW1lc3RhbXA6IHJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBmcm9tSWQsXG4gICAgICAgIHNvdXJjZTogUmVhY3Rpb25Tb3VyY2UuRnJvbVNvbWVvbmVFbHNlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlYWN0aW9uTW9kZWwgPSBSZWFjdGlvbnMuZ2V0U2luZ2xldG9uKCkuYWRkKGF0dHJpYnV0ZXMpO1xuXG4gICAgICAvLyBOb3RlOiBXZSBkbyBub3Qgd2FpdCBmb3IgY29tcGxldGlvbiBoZXJlXG4gICAgICBSZWFjdGlvbnMuZ2V0U2luZ2xldG9uKCkub25SZWFjdGlvbihyZWFjdGlvbk1vZGVsLCBtZXNzYWdlKTtcbiAgICAgIGNvbmZpcm0oKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5tZXNzYWdlLmRlbGV0ZSkge1xuICAgICAgY29uc3QgeyBkZWxldGU6IGRlbCB9ID0gZGF0YS5tZXNzYWdlO1xuICAgICAgbG9nLmluZm8oJ1F1ZXVpbmcgaW5jb21pbmcgRE9FIGZvcicsIGRlbC50YXJnZXRTZW50VGltZXN0YW1wKTtcblxuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBkZWwudGFyZ2V0U2VudFRpbWVzdGFtcCxcbiAgICAgICAgJ0RlbGV0ZSBtaXNzaW5nIHRhcmdldFNlbnRUaW1lc3RhbXAnXG4gICAgICApO1xuICAgICAgc3RyaWN0QXNzZXJ0KGRhdGEuc2VydmVyVGltZXN0YW1wLCAnRGVsZXRlIG1pc3Npbmcgc2VydmVyVGltZXN0YW1wJyk7XG4gICAgICBjb25zdCBmcm9tSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgZTE2NDogZGF0YS5zb3VyY2UsXG4gICAgICAgIHV1aWQ6IGRhdGEuc291cmNlVXVpZCxcbiAgICAgIH0pO1xuICAgICAgc3RyaWN0QXNzZXJ0KGZyb21JZCwgJ0RlbGV0ZSBtaXNzaW5nIGZyb21JZCcpO1xuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzOiBEZWxldGVBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgdGFyZ2V0U2VudFRpbWVzdGFtcDogZGVsLnRhcmdldFNlbnRUaW1lc3RhbXAsXG4gICAgICAgIHNlcnZlclRpbWVzdGFtcDogZGF0YS5zZXJ2ZXJUaW1lc3RhbXAsXG4gICAgICAgIGZyb21JZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBkZWxldGVNb2RlbCA9IERlbGV0ZXMuZ2V0U2luZ2xldG9uKCkuYWRkKGF0dHJpYnV0ZXMpO1xuXG4gICAgICAvLyBOb3RlOiBXZSBkbyBub3Qgd2FpdCBmb3IgY29tcGxldGlvbiBoZXJlXG4gICAgICBEZWxldGVzLmdldFNpbmdsZXRvbigpLm9uRGVsZXRlKGRlbGV0ZU1vZGVsKTtcblxuICAgICAgY29uZmlybSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGlmIChoYW5kbGVHcm91cENhbGxVcGRhdGVNZXNzYWdlKGRhdGEubWVzc2FnZSwgbWVzc2FnZURlc2NyaXB0b3IpKSB7XG4gICAgICBjb25maXJtKCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLy8gRG9uJ3Qgd2FpdCBmb3IgaGFuZGxlRGF0YU1lc3NhZ2UsIGFzIGl0IGhhcyBpdHMgb3duIHBlci1jb252ZXJzYXRpb24gcXVldWVpbmdcbiAgICBtZXNzYWdlLmhhbmRsZURhdGFNZXNzYWdlKGRhdGEubWVzc2FnZSwgZXZlbnQuY29uZmlybSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBvblByb2ZpbGVLZXlVcGRhdGUoeyBkYXRhLCBjb25maXJtIH06IFByb2ZpbGVLZXlVcGRhdGVFdmVudCkge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICBlMTY0OiBkYXRhLnNvdXJjZSxcbiAgICAgIHV1aWQ6IGRhdGEuc291cmNlVXVpZCxcbiAgICAgIGhpZ2hUcnVzdDogdHJ1ZSxcbiAgICAgIHJlYXNvbjogJ29uUHJvZmlsZUtleVVwZGF0ZScsXG4gICAgfSk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcblxuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdvblByb2ZpbGVLZXlVcGRhdGU6IGNvdWxkIG5vdCBmaW5kIGNvbnZlcnNhdGlvbicsXG4gICAgICAgIGRhdGEuc291cmNlLFxuICAgICAgICBkYXRhLnNvdXJjZVV1aWRcbiAgICAgICk7XG4gICAgICBjb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhLnByb2ZpbGVLZXkpIHtcbiAgICAgIGxvZy5lcnJvcignb25Qcm9maWxlS2V5VXBkYXRlOiBtaXNzaW5nIHByb2ZpbGVLZXknLCBkYXRhLnByb2ZpbGVLZXkpO1xuICAgICAgY29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgJ29uUHJvZmlsZUtleVVwZGF0ZTogdXBkYXRpbmcgcHJvZmlsZUtleSBmb3InLFxuICAgICAgZGF0YS5zb3VyY2VVdWlkLFxuICAgICAgZGF0YS5zb3VyY2VcbiAgICApO1xuXG4gICAgYXdhaXQgY29udmVyc2F0aW9uLnNldFByb2ZpbGVLZXkoZGF0YS5wcm9maWxlS2V5KTtcblxuICAgIGNvbmZpcm0oKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VTZW50UHJvZmlsZVVwZGF0ZSh7XG4gICAgZGF0YSxcbiAgICBjb25maXJtLFxuICAgIG1lc3NhZ2VEZXNjcmlwdG9yLFxuICB9OiB7XG4gICAgZGF0YTogU2VudEV2ZW50RGF0YTtcbiAgICBjb25maXJtOiAoKSA9PiB2b2lkO1xuICAgIG1lc3NhZ2VEZXNjcmlwdG9yOiBNZXNzYWdlRGVzY3JpcHRvcjtcbiAgfSkge1xuICAgIC8vIEZpcnN0IHNldCBwcm9maWxlU2hhcmluZyA9IHRydWUgZm9yIHRoZSBjb252ZXJzYXRpb24gd2Ugc2VudCB0b1xuICAgIGNvbnN0IHsgaWQgfSA9IG1lc3NhZ2VEZXNjcmlwdG9yO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkKSE7XG5cbiAgICBjb252ZXJzYXRpb24uZW5hYmxlUHJvZmlsZVNoYXJpbmcoKTtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICAgIC8vIFRoZW4gd2UgdXBkYXRlIG91ciBvd24gcHJvZmlsZUtleSBpZiBpdCdzIGRpZmZlcmVudCBmcm9tIHdoYXQgd2UgaGF2ZVxuICAgIGNvbnN0IG91cklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IG1lID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KG91cklkKSE7XG4gICAgY29uc3QgeyBwcm9maWxlS2V5IH0gPSBkYXRhLm1lc3NhZ2U7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgcHJvZmlsZUtleSAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ2hhbmRsZU1lc3NhZ2VTZW50UHJvZmlsZVVwZGF0ZTogbWlzc2luZyBwcm9maWxlS2V5J1xuICAgICk7XG5cbiAgICAvLyBXaWxsIGRvIHRoZSBzYXZlIGZvciB1cyBpZiBuZWVkZWRcbiAgICBhd2FpdCBtZS5zZXRQcm9maWxlS2V5KHByb2ZpbGVLZXkpO1xuXG4gICAgcmV0dXJuIGNvbmZpcm0oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNlbnRNZXNzYWdlKFxuICAgIGRhdGE6IFNlbnRFdmVudERhdGEsXG4gICAgZGVzY3JpcHRvcjogTWVzc2FnZURlc2NyaXB0b3JcbiAgKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBub3c7XG5cbiAgICBjb25zdCBvdXJJZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpO1xuXG4gICAgY29uc3QgeyB1bmlkZW50aWZpZWRTdGF0dXMgPSBbXSB9ID0gZGF0YTtcblxuICAgIGNvbnN0IHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPVxuICAgICAgdW5pZGVudGlmaWVkU3RhdHVzLnJlZHVjZShcbiAgICAgICAgKFxuICAgICAgICAgIHJlc3VsdDogU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICB7IGRlc3RpbmF0aW9uVXVpZCwgZGVzdGluYXRpb24gfVxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHV1aWQ6IGRlc3RpbmF0aW9uVXVpZCxcbiAgICAgICAgICAgICAgZTE2NDogZGVzdGluYXRpb24sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIWNvbnZlcnNhdGlvbklkIHx8IGNvbnZlcnNhdGlvbklkID09PSBvdXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgICAgdXBkYXRlZEF0OiB0aW1lc3RhbXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBbb3VySWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogdGltZXN0YW1wLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICBsZXQgdW5pZGVudGlmaWVkRGVsaXZlcmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGlmICh1bmlkZW50aWZpZWRTdGF0dXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCB1bmlkZW50aWZpZWQgPSB3aW5kb3cuXy5maWx0ZXIoZGF0YS51bmlkZW50aWZpZWRTdGF0dXMsIGl0ZW0gPT5cbiAgICAgICAgQm9vbGVhbihpdGVtLnVuaWRlbnRpZmllZClcbiAgICAgICk7XG4gICAgICB1bmlkZW50aWZpZWREZWxpdmVyaWVzID0gdW5pZGVudGlmaWVkXG4gICAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLmRlc3RpbmF0aW9uVXVpZCB8fCBpdGVtLmRlc3RpbmF0aW9uKVxuICAgICAgICAuZmlsdGVyKGlzTm90TmlsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2Uoe1xuICAgICAgY29udmVyc2F0aW9uSWQ6IGRlc2NyaXB0b3IuaWQsXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IE1hdGgubWluKFxuICAgICAgICBkYXRhLmV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCB8fCB0aW1lc3RhbXAsXG4gICAgICAgIG5vd1xuICAgICAgKSxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHJlY2VpdmVkX2F0X21zOiBkYXRhLnJlY2VpdmVkQXREYXRlLFxuICAgICAgcmVjZWl2ZWRfYXQ6IGRhdGEucmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICBzZWVuU3RhdHVzOiBTZWVuU3RhdHVzLk5vdEFwcGxpY2FibGUsXG4gICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogdGltZXN0YW1wLFxuICAgICAgc2VydmVyVGltZXN0YW1wOiBkYXRhLnNlcnZlclRpbWVzdGFtcCxcbiAgICAgIHNvdXJjZTogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldE51bWJlcigpLFxuICAgICAgc291cmNlRGV2aWNlOiBkYXRhLmRldmljZSxcbiAgICAgIHNvdXJjZVV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkKCk/LnRvU3RyaW5nKCksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcmllcyxcbiAgICB9IGFzIFBhcnRpYWw8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiBhcyBXaGF0SXNUaGlzKTtcbiAgfVxuXG4gIC8vIFdvcmtzIHdpdGggJ3NlbnQnIGFuZCAnbWVzc2FnZScgZGF0YSBzZW50IGZyb20gTWVzc2FnZVJlY2VpdmVyLCB3aXRoIGEgbGl0dGxlIG1hc3NhZ2VcbiAgLy8gICBhdCBjYWxsc2l0ZXMgdG8gbWFrZSBzdXJlIGJvdGggc291cmNlIGFuZCBkZXN0aW5hdGlvbiBhcmUgcG9wdWxhdGVkLlxuICBjb25zdCBnZXRNZXNzYWdlRGVzY3JpcHRvciA9ICh7XG4gICAgY29uZmlybSxcbiAgICBtZXNzYWdlLFxuICAgIHNvdXJjZSxcbiAgICBzb3VyY2VVdWlkLFxuICAgIGRlc3RpbmF0aW9uLFxuICAgIGRlc3RpbmF0aW9uVXVpZCxcbiAgfToge1xuICAgIGNvbmZpcm06ICgpID0+IHVua25vd247XG4gICAgbWVzc2FnZTogUHJvY2Vzc2VkRGF0YU1lc3NhZ2U7XG4gICAgc291cmNlPzogc3RyaW5nO1xuICAgIHNvdXJjZVV1aWQ/OiBzdHJpbmc7XG4gICAgZGVzdGluYXRpb24/OiBzdHJpbmc7XG4gICAgZGVzdGluYXRpb25VdWlkPzogc3RyaW5nO1xuICB9KTogTWVzc2FnZURlc2NyaXB0b3IgPT4ge1xuICAgIGlmIChtZXNzYWdlLmdyb3VwVjIpIHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IG1lc3NhZ2UuZ3JvdXBWMjtcbiAgICAgIGlmICghaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRNZXNzYWdlRGVzY3JpcHRvcjogR3JvdXBWMiBkYXRhIHdhcyBtaXNzaW5nIGFuIGlkJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpcnN0IHdlIGNoZWNrIGZvciBhbiBleGlzdGluZyBHcm91cFYyIGdyb3VwXG4gICAgICBjb25zdCBncm91cFYyID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkKTtcbiAgICAgIGlmIChncm91cFYyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogTWVzc2FnZS5HUk9VUCxcbiAgICAgICAgICBpZDogZ3JvdXBWMi5pZCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlbiBjaGVjayBmb3IgVjEgZ3JvdXAgd2l0aCBtYXRjaGluZyBkZXJpdmVkIEdWMiBpZFxuICAgICAgY29uc3QgZ3JvdXBWMSA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldEJ5RGVyaXZlZEdyb3VwVjJJZChpZCk7XG4gICAgICBpZiAoZ3JvdXBWMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IE1lc3NhZ2UuR1JPVVAsXG4gICAgICAgICAgaWQ6IGdyb3VwVjEuaWQsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmFsbHkgY3JlYXRlIHRoZSBWMiBncm91cCBub3JtYWxseVxuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVHcm91cChpZCwge1xuICAgICAgICBncm91cFZlcnNpb246IDIsXG4gICAgICAgIG1hc3RlcktleTogbWVzc2FnZS5ncm91cFYyLm1hc3RlcktleSxcbiAgICAgICAgc2VjcmV0UGFyYW1zOiBtZXNzYWdlLmdyb3VwVjIuc2VjcmV0UGFyYW1zLFxuICAgICAgICBwdWJsaWNQYXJhbXM6IG1lc3NhZ2UuZ3JvdXBWMi5wdWJsaWNQYXJhbXMsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogTWVzc2FnZS5HUk9VUCxcbiAgICAgICAgaWQ6IGNvbnZlcnNhdGlvbklkLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UuZ3JvdXApIHtcbiAgICAgIGNvbnN0IHsgaWQsIGRlcml2ZWRHcm91cFYySWQgfSA9IG1lc3NhZ2UuZ3JvdXA7XG4gICAgICBpZiAoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0TWVzc2FnZURlc2NyaXB0b3I6IEdyb3VwVjEgZGF0YSB3YXMgbWlzc2luZyBpZCcpO1xuICAgICAgfVxuICAgICAgaWYgKCFkZXJpdmVkR3JvdXBWMklkKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdnZXRNZXNzYWdlRGVzY3JpcHRvcjogR3JvdXBWMSBkYXRhIHdhcyBtaXNzaW5nIGRlcml2ZWRHcm91cFYySWQnXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGaXJzdCB3ZSBjaGVjayBmb3IgYW4gYWxyZWFkeS1taWdyYXRlZCBHcm91cFYyIGdyb3VwXG4gICAgICAgIGNvbnN0IG1pZ3JhdGVkR3JvdXAgPVxuICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChkZXJpdmVkR3JvdXBWMklkKTtcbiAgICAgICAgaWYgKG1pZ3JhdGVkR3JvdXApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogTWVzc2FnZS5HUk9VUCxcbiAgICAgICAgICAgIGlkOiBtaWdyYXRlZEdyb3VwLmlkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgY2FuJ3QgZmluZCBvbmUsIHdlIHRyZWF0IHRoaXMgYXMgYSBub3JtYWwgR3JvdXBWMSBncm91cFxuICAgICAgY29uc3QgZnJvbUNvbnRhY3RJZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgICBlMTY0OiBzb3VyY2UsXG4gICAgICAgIHV1aWQ6IHNvdXJjZVV1aWQsXG4gICAgICAgIGhpZ2hUcnVzdDogdHJ1ZSxcbiAgICAgICAgcmVhc29uOiBgZ2V0TWVzc2FnZURlc2NyaXB0b3IoJHttZXNzYWdlLnRpbWVzdGFtcH0pOiBncm91cCB2MWAsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVHcm91cChpZCwge1xuICAgICAgICBhZGRlZEJ5OiBmcm9tQ29udGFjdElkLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IE1lc3NhZ2UuR1JPVVAsXG4gICAgICAgIGlkOiBjb252ZXJzYXRpb25JZCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIGUxNjQ6IGRlc3RpbmF0aW9uLFxuICAgICAgdXVpZDogZGVzdGluYXRpb25VdWlkLFxuICAgICAgaGlnaFRydXN0OiB0cnVlLFxuICAgICAgcmVhc29uOiBgZ2V0TWVzc2FnZURlc2NyaXB0b3IoJHttZXNzYWdlLnRpbWVzdGFtcH0pOiBwcml2YXRlYCxcbiAgICB9KTtcbiAgICBpZiAoIWlkKSB7XG4gICAgICBjb25maXJtKCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBnZXRNZXNzYWdlRGVzY3JpcHRvci8ke21lc3NhZ2UudGltZXN0YW1wfTogZW5zdXJlQ29udGFjdElkcyByZXR1cm5lZCBmYWxzZXkgaWRgXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBNZXNzYWdlLlBSSVZBVEUsXG4gICAgICBpZCxcbiAgICB9O1xuICB9O1xuXG4gIC8vIE5vdGU6IFdlIGRvIHZlcnkgbGl0dGxlIGluIHRoaXMgZnVuY3Rpb24sIHNpbmNlIGV2ZXJ5dGhpbmcgaW4gaGFuZGxlRGF0YU1lc3NhZ2UgaXNcbiAgLy8gICBpbnNpZGUgYSBjb252ZXJzYXRpb24tc3BlY2lmaWMgcXVldWUoKS4gQW55IGNvZGUgaGVyZSBtaWdodCBydW4gYmVmb3JlIGFuIGVhcmxpZXJcbiAgLy8gICBtZXNzYWdlIGlzIHByb2Nlc3NlZCBpbiBoYW5kbGVEYXRhTWVzc2FnZSgpLlxuICBmdW5jdGlvbiBvblNlbnRNZXNzYWdlKGV2ZW50OiBTZW50RXZlbnQpIHtcbiAgICBjb25zdCB7IGRhdGEsIGNvbmZpcm0gfSA9IGV2ZW50O1xuXG4gICAgY29uc3Qgc291cmNlID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICAgIGNvbnN0IHNvdXJjZVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuICAgIHN0cmljdEFzc2VydChzb3VyY2UgJiYgc291cmNlVXVpZCwgJ01pc3NpbmcgdXNlciBudW1iZXIgYW5kIHV1aWQnKTtcblxuICAgIGNvbnN0IG1lc3NhZ2VEZXNjcmlwdG9yID0gZ2V0TWVzc2FnZURlc2NyaXB0b3Ioe1xuICAgICAgY29uZmlybSxcbiAgICAgIC4uLmRhdGEsXG5cbiAgICAgIC8vICdzZW50JyBldmVudDogdGhlIHNlbmRlciBpcyBhbHdheXMgdXMhXG4gICAgICBzb3VyY2UsXG4gICAgICBzb3VyY2VVdWlkLFxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBQUk9GSUxFX0tFWV9VUERBVEUgfSA9IFByb3RvLkRhdGFNZXNzYWdlLkZsYWdzO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgY29uc3QgaXNQcm9maWxlVXBkYXRlID0gQm9vbGVhbihkYXRhLm1lc3NhZ2UuZmxhZ3MgJiBQUk9GSUxFX0tFWV9VUERBVEUpO1xuICAgIGlmIChpc1Byb2ZpbGVVcGRhdGUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVNZXNzYWdlU2VudFByb2ZpbGVVcGRhdGUoe1xuICAgICAgICBkYXRhLFxuICAgICAgICBjb25maXJtLFxuICAgICAgICBtZXNzYWdlRGVzY3JpcHRvcixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVTZW50TWVzc2FnZShkYXRhLCBtZXNzYWdlRGVzY3JpcHRvcik7XG5cbiAgICBpZiAoZGF0YS5tZXNzYWdlLnJlYWN0aW9uKSB7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIGRhdGEubWVzc2FnZS5yZWFjdGlvbi50YXJnZXRBdXRob3JVdWlkLFxuICAgICAgICAnUmVhY3Rpb24gd2l0aG91dCB0YXJnZXRBdXRob3JVdWlkJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHRhcmdldEF1dGhvclV1aWQgPSBub3JtYWxpemVVdWlkKFxuICAgICAgICBkYXRhLm1lc3NhZ2UucmVhY3Rpb24udGFyZ2V0QXV0aG9yVXVpZCxcbiAgICAgICAgJ0RhdGFNZXNzYWdlLlJlYWN0aW9uLnRhcmdldEF1dGhvclV1aWQnXG4gICAgICApO1xuXG4gICAgICBjb25zdCB7IHJlYWN0aW9uLCB0aW1lc3RhbXAgfSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgcmVhY3Rpb24udGFyZ2V0VGltZXN0YW1wLFxuICAgICAgICAnUmVhY3Rpb24gd2l0aG91dCB0YXJnZXRBdXRob3JVdWlkJ1xuICAgICAgKTtcblxuICAgICAgaWYgKCFpc1ZhbGlkUmVhY3Rpb25FbW9qaShyZWFjdGlvbi5lbW9qaSkpIHtcbiAgICAgICAgbG9nLndhcm4oJ1JlY2VpdmVkIGFuIGludmFsaWQgcmVhY3Rpb24gZW1vamkuIERyb3BwaW5nIGl0Jyk7XG4gICAgICAgIGV2ZW50LmNvbmZpcm0oKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBsb2cuaW5mbygnUXVldWluZyBzZW50IHJlYWN0aW9uIGZvcicsIHJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCk7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVzOiBSZWFjdGlvbkF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBlbW9qaTogcmVhY3Rpb24uZW1vamksXG4gICAgICAgIHJlbW92ZTogcmVhY3Rpb24ucmVtb3ZlLFxuICAgICAgICB0YXJnZXRBdXRob3JVdWlkLFxuICAgICAgICB0YXJnZXRUaW1lc3RhbXA6IHJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBmcm9tSWQ6IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpLFxuICAgICAgICBzb3VyY2U6IFJlYWN0aW9uU291cmNlLkZyb21TeW5jLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlYWN0aW9uTW9kZWwgPSBSZWFjdGlvbnMuZ2V0U2luZ2xldG9uKCkuYWRkKGF0dHJpYnV0ZXMpO1xuICAgICAgLy8gTm90ZTogV2UgZG8gbm90IHdhaXQgZm9yIGNvbXBsZXRpb24gaGVyZVxuICAgICAgUmVhY3Rpb25zLmdldFNpbmdsZXRvbigpLm9uUmVhY3Rpb24ocmVhY3Rpb25Nb2RlbCwgbWVzc2FnZSk7XG5cbiAgICAgIGV2ZW50LmNvbmZpcm0oKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5tZXNzYWdlLmRlbGV0ZSkge1xuICAgICAgY29uc3QgeyBkZWxldGU6IGRlbCB9ID0gZGF0YS5tZXNzYWdlO1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBkZWwudGFyZ2V0U2VudFRpbWVzdGFtcCxcbiAgICAgICAgJ0RlbGV0ZSB3aXRob3V0IHRhcmdldFNlbnRUaW1lc3RhbXAnXG4gICAgICApO1xuICAgICAgc3RyaWN0QXNzZXJ0KGRhdGEuc2VydmVyVGltZXN0YW1wLCAnRGF0YSBoYXMgbm8gc2VydmVyVGltZXN0YW1wJyk7XG5cbiAgICAgIGxvZy5pbmZvKCdRdWV1aW5nIHNlbnQgRE9FIGZvcicsIGRlbC50YXJnZXRTZW50VGltZXN0YW1wKTtcblxuICAgICAgY29uc3QgYXR0cmlidXRlczogRGVsZXRlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIHRhcmdldFNlbnRUaW1lc3RhbXA6IGRlbC50YXJnZXRTZW50VGltZXN0YW1wLFxuICAgICAgICBzZXJ2ZXJUaW1lc3RhbXA6IGRhdGEuc2VydmVyVGltZXN0YW1wLFxuICAgICAgICBmcm9tSWQ6IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGRlbGV0ZU1vZGVsID0gRGVsZXRlcy5nZXRTaW5nbGV0b24oKS5hZGQoYXR0cmlidXRlcyk7XG4gICAgICAvLyBOb3RlOiBXZSBkbyBub3Qgd2FpdCBmb3IgY29tcGxldGlvbiBoZXJlXG4gICAgICBEZWxldGVzLmdldFNpbmdsZXRvbigpLm9uRGVsZXRlKGRlbGV0ZU1vZGVsKTtcbiAgICAgIGNvbmZpcm0oKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoaGFuZGxlR3JvdXBDYWxsVXBkYXRlTWVzc2FnZShkYXRhLm1lc3NhZ2UsIG1lc3NhZ2VEZXNjcmlwdG9yKSkge1xuICAgICAgZXZlbnQuY29uZmlybSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIC8vIERvbid0IHdhaXQgZm9yIGhhbmRsZURhdGFNZXNzYWdlLCBhcyBpdCBoYXMgaXRzIG93biBwZXItY29udmVyc2F0aW9uIHF1ZXVlaW5nXG4gICAgbWVzc2FnZS5oYW5kbGVEYXRhTWVzc2FnZShkYXRhLm1lc3NhZ2UsIGV2ZW50LmNvbmZpcm0sIHtcbiAgICAgIGRhdGEsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICB0eXBlIE1lc3NhZ2VEZXNjcmlwdG9yID0ge1xuICAgIHR5cGU6ICdwcml2YXRlJyB8ICdncm91cCc7XG4gICAgaWQ6IHN0cmluZztcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0SW5jb21pbmdNZXNzYWdlKFxuICAgIGRhdGE6IE1lc3NhZ2VFdmVudERhdGEsXG4gICAgZGVzY3JpcHRvcjogTWVzc2FnZURlc2NyaXB0b3JcbiAgKSB7XG4gICAgYXNzZXJ0KFxuICAgICAgQm9vbGVhbihkYXRhLnJlY2VpdmVkQXRDb3VudGVyKSxcbiAgICAgIGBEaWQgbm90IHJlY2VpdmUgcmVjZWl2ZWRBdENvdW50ZXIgZm9yIG1lc3NhZ2U6ICR7ZGF0YS50aW1lc3RhbXB9YFxuICAgICk7XG4gICAgcmV0dXJuIG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKHtcbiAgICAgIHNvdXJjZTogZGF0YS5zb3VyY2UsXG4gICAgICBzb3VyY2VVdWlkOiBkYXRhLnNvdXJjZVV1aWQsXG4gICAgICBzb3VyY2VEZXZpY2U6IGRhdGEuc291cmNlRGV2aWNlLFxuICAgICAgc2VudF9hdDogZGF0YS50aW1lc3RhbXAsXG4gICAgICBzZXJ2ZXJHdWlkOiBkYXRhLnNlcnZlckd1aWQsXG4gICAgICBzZXJ2ZXJUaW1lc3RhbXA6IGRhdGEuc2VydmVyVGltZXN0YW1wLFxuICAgICAgcmVjZWl2ZWRfYXQ6IGRhdGEucmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICByZWNlaXZlZF9hdF9tczogZGF0YS5yZWNlaXZlZEF0RGF0ZSxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBkZXNjcmlwdG9yLmlkLFxuICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcnlSZWNlaXZlZDogZGF0YS51bmlkZW50aWZpZWREZWxpdmVyeVJlY2VpdmVkLFxuICAgICAgdHlwZTogZGF0YS5tZXNzYWdlLmlzU3RvcnkgPyAnc3RvcnknIDogJ2luY29taW5nJyxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkLFxuICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgICB0aW1lc3RhbXA6IGRhdGEudGltZXN0YW1wLFxuICAgIH0gYXMgUGFydGlhbDxNZXNzYWdlQXR0cmlidXRlc1R5cGU+IGFzIFdoYXRJc1RoaXMpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBgZmFsc2VgIGlmIHRoaXMgbWVzc2FnZSBpc24ndCBhIGdyb3VwIGNhbGwgbWVzc2FnZS5cbiAgZnVuY3Rpb24gaGFuZGxlR3JvdXBDYWxsVXBkYXRlTWVzc2FnZShcbiAgICBtZXNzYWdlOiBQcm9jZXNzZWREYXRhTWVzc2FnZSxcbiAgICBtZXNzYWdlRGVzY3JpcHRvcjogTWVzc2FnZURlc2NyaXB0b3JcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKG1lc3NhZ2UuZ3JvdXBDYWxsVXBkYXRlKSB7XG4gICAgICBpZiAobWVzc2FnZS5ncm91cFYyICYmIG1lc3NhZ2VEZXNjcmlwdG9yLnR5cGUgPT09IE1lc3NhZ2UuR1JPVVApIHtcbiAgICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jYWxsaW5nLnBlZWtOb3RDb25uZWN0ZWRHcm91cENhbGwoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBtZXNzYWdlRGVzY3JpcHRvci5pZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdSZWNlaXZlZCBhIGdyb3VwIGNhbGwgdXBkYXRlIGZvciBhIGNvbnZlcnNhdGlvbiB0aGF0IGlzIG5vdCBhIEdWMiBncm91cC4gSWdub3JpbmcgdGhhdCBwcm9wZXJ0eSBhbmQgY29udGludWluZy4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiB1bmxpbmtBbmREaXNjb25uZWN0KFxuICAgIG1vZGU6IFJlbW92ZUFsbENvbmZpZ3VyYXRpb25cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgd2luZG93LldoaXNwZXIuZXZlbnRzLnRyaWdnZXIoJ3VuYXV0aG9yaXplZCcpO1xuXG4gICAgbG9nLndhcm4oXG4gICAgICAndW5saW5rQW5kRGlzY29ubmVjdDogQ2xpZW50IGlzIG5vIGxvbmdlciBhdXRob3JpemVkOyAnICtcbiAgICAgICAgJ2RlbGV0aW5nIGxvY2FsIGNvbmZpZ3VyYXRpb24nXG4gICAgKTtcblxuICAgIGlmIChtZXNzYWdlUmVjZWl2ZXIpIHtcbiAgICAgIGxvZy5pbmZvKCd1bmxpbmtBbmREaXNjb25uZWN0OiBsb2dnaW5nIG91dCcpO1xuICAgICAgc3RyaWN0QXNzZXJ0KHNlcnZlciAhPT0gdW5kZWZpbmVkLCAnV2ViQVBJIG5vdCBpbml0aWFsaXplZCcpO1xuICAgICAgc2VydmVyLnVucmVnaXN0ZXJSZXF1ZXN0SGFuZGxlcihtZXNzYWdlUmVjZWl2ZXIpO1xuICAgICAgbWVzc2FnZVJlY2VpdmVyLnN0b3BQcm9jZXNzaW5nKCk7XG5cbiAgICAgIGF3YWl0IHNlcnZlci5sb2dvdXQoKTtcbiAgICAgIGF3YWl0IHdpbmRvdy53YWl0Rm9yQWxsQmF0Y2hlcnMoKTtcbiAgICB9XG5cbiAgICBvbkVtcHR5KCk7XG5cbiAgICB3aW5kb3cuU2lnbmFsLlV0aWwuUmVnaXN0cmF0aW9uLnJlbW92ZSgpO1xuXG4gICAgY29uc3QgTlVNQkVSX0lEX0tFWSA9ICdudW1iZXJfaWQnO1xuICAgIGNvbnN0IFVVSURfSURfS0VZID0gJ3V1aWRfaWQnO1xuICAgIGNvbnN0IFZFUlNJT05fS0VZID0gJ3ZlcnNpb24nO1xuICAgIGNvbnN0IExBU1RfUFJPQ0VTU0VEX0lOREVYX0tFWSA9ICdhdHRhY2htZW50TWlncmF0aW9uX2xhc3RQcm9jZXNzZWRJbmRleCc7XG4gICAgY29uc3QgSVNfTUlHUkFUSU9OX0NPTVBMRVRFX0tFWSA9ICdhdHRhY2htZW50TWlncmF0aW9uX2lzQ29tcGxldGUnO1xuXG4gICAgY29uc3QgcHJldmlvdXNOdW1iZXJJZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UuZ2V0KE5VTUJFUl9JRF9LRVkpO1xuICAgIGNvbnN0IHByZXZpb3VzVXVpZElkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5nZXQoVVVJRF9JRF9LRVkpO1xuICAgIGNvbnN0IGxhc3RQcm9jZXNzZWRJbmRleCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UuZ2V0KFxuICAgICAgTEFTVF9QUk9DRVNTRURfSU5ERVhfS0VZXG4gICAgKTtcbiAgICBjb25zdCBpc01pZ3JhdGlvbkNvbXBsZXRlID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5nZXQoXG4gICAgICBJU19NSUdSQVRJT05fQ09NUExFVEVfS0VZXG4gICAgKTtcblxuICAgIHRyeSB7XG4gICAgICBsb2cuaW5mbyhgdW5saW5rQW5kRGlzY29ubmVjdDogcmVtb3ZpbmcgY29uZmlndXJhdGlvbiwgbW9kZSAke21vZGV9YCk7XG4gICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLnJlbW92ZUFsbENvbmZpZ3VyYXRpb24obW9kZSk7XG5cbiAgICAgIC8vIFRoaXMgd2FzIGFscmVhZHkgZG9uZSBpbiB0aGUgZGF0YWJhc2Ugd2l0aCByZW1vdmVBbGxDb25maWd1cmF0aW9uOyB0aGlzIGRvZXMgaXRcbiAgICAgIC8vICAgZm9yIGFsbCB0aGUgY29udmVyc2F0aW9uIG1vZGVscyBpbiBtZW1vcnkuXG4gICAgICB3aW5kb3cuZ2V0Q29udmVyc2F0aW9ucygpLmZvckVhY2goY29udmVyc2F0aW9uID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRlbGV0ZSBjb252ZXJzYXRpb24uYXR0cmlidXRlcy5zZW5kZXJLZXlJbmZvO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFRoZXNlIHR3byBiaXRzIG9mIGRhdGEgYXJlIGltcG9ydGFudCB0byBlbnN1cmUgdGhhdCB0aGUgYXBwIGxvYWRzIHVwXG4gICAgICAvLyAgIHRoZSBjb252ZXJzYXRpb24gbGlzdCwgaW5zdGVhZCBvZiBzaG93aW5nIGp1c3QgdGhlIFFSIGNvZGUgc2NyZWVuLlxuICAgICAgaWYgKHByZXZpb3VzTnVtYmVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnB1dChOVU1CRVJfSURfS0VZLCBwcmV2aW91c051bWJlcklkKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2aW91c1V1aWRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHV0KFVVSURfSURfS0VZLCBwcmV2aW91c1V1aWRJZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZXNlIHR3byBhcmUgaW1wb3J0YW50IHRvIGVuc3VyZSB3ZSBkb24ndCByaXAgdGhyb3VnaCBldmVyeSBtZXNzYWdlXG4gICAgICAvLyAgIGluIHRoZSBkYXRhYmFzZSBhdHRlbXB0aW5nIHRvIHVwZ3JhZGUgaXQgYWZ0ZXIgc3RhcnRpbmcgdXAgYWdhaW4uXG4gICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnB1dChcbiAgICAgICAgSVNfTUlHUkFUSU9OX0NPTVBMRVRFX0tFWSxcbiAgICAgICAgaXNNaWdyYXRpb25Db21wbGV0ZSB8fCBmYWxzZVxuICAgICAgKTtcbiAgICAgIGlmIChsYXN0UHJvY2Vzc2VkSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnB1dChcbiAgICAgICAgICBMQVNUX1BST0NFU1NFRF9JTkRFWF9LRVksXG4gICAgICAgICAgbGFzdFByb2Nlc3NlZEluZGV4XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnJlbW92ZShMQVNUX1BST0NFU1NFRF9JTkRFWF9LRVkpO1xuICAgICAgfVxuICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wdXQoVkVSU0lPTl9LRVksIHdpbmRvdy5nZXRWZXJzaW9uKCkpO1xuXG4gICAgICBsb2cuaW5mbygndW5saW5rQW5kRGlzY29ubmVjdDogU3VjY2Vzc2Z1bGx5IGNsZWFyZWQgbG9jYWwgY29uZmlndXJhdGlvbicpO1xuICAgIH0gY2F0Y2ggKGVyYXNlRXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ3VubGlua0FuZERpc2Nvbm5lY3Q6IFNvbWV0aGluZyB3ZW50IHdyb25nIGNsZWFyaW5nICcgK1xuICAgICAgICAgICdsb2NhbCBjb25maWd1cmF0aW9uJyxcbiAgICAgICAgZXJhc2VFcnJvciAmJiBlcmFzZUVycm9yLnN0YWNrID8gZXJhc2VFcnJvci5zdGFjayA6IGVyYXNlRXJyb3JcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5SZWdpc3RyYXRpb24ubWFya0V2ZXJEb25lKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FcnJvcihldjogRXJyb3JFdmVudCkge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGV2O1xuICAgIGxvZy5lcnJvcignYmFja2dyb3VuZCBvbkVycm9yOicsIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcikpO1xuXG4gICAgaWYgKFxuICAgICAgZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IgJiZcbiAgICAgIChlcnJvci5jb2RlID09PSA0MDEgfHwgZXJyb3IuY29kZSA9PT0gNDAzKVxuICAgICkge1xuICAgICAgdW5saW5rQW5kRGlzY29ubmVjdChSZW1vdmVBbGxDb25maWd1cmF0aW9uLkZ1bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy53YXJuKCdiYWNrZ3JvdW5kIG9uRXJyb3I6IERvaW5nIG5vdGhpbmcgd2l0aCBpbmNvbWluZyBlcnJvcicpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gb25WaWV3T25jZU9wZW5TeW5jKGV2OiBWaWV3T25jZU9wZW5TeW5jRXZlbnQpIHtcbiAgICBldi5jb25maXJtKCk7XG5cbiAgICBjb25zdCB7IHNvdXJjZSwgc291cmNlVXVpZCwgdGltZXN0YW1wIH0gPSBldjtcbiAgICBsb2cuaW5mbyhgdmlldyBvbmNlIG9wZW4gc3luYyAke3NvdXJjZX0gJHt0aW1lc3RhbXB9YCk7XG4gICAgc3RyaWN0QXNzZXJ0KHNvdXJjZVV1aWQsICdWaWV3T25jZU9wZW4gd2l0aG91dCBzb3VyY2VVdWlkJyk7XG4gICAgc3RyaWN0QXNzZXJ0KHRpbWVzdGFtcCwgJ1ZpZXdPbmNlT3BlbiB3aXRob3V0IHRpbWVzdGFtcCcpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlczogVmlld09uY2VPcGVuU3luY0F0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgc291cmNlLFxuICAgICAgc291cmNlVXVpZCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICAgIGNvbnN0IHN5bmMgPSBWaWV3T25jZU9wZW5TeW5jcy5nZXRTaW5nbGV0b24oKS5hZGQoYXR0cmlidXRlcyk7XG5cbiAgICBWaWV3T25jZU9wZW5TeW5jcy5nZXRTaW5nbGV0b24oKS5vblN5bmMoc3luYyk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBvbkZldGNoTGF0ZXN0U3luYyhldjogRmV0Y2hMYXRlc3RFdmVudCkge1xuICAgIGV2LmNvbmZpcm0oKTtcblxuICAgIGNvbnN0IHsgZXZlbnRUeXBlIH0gPSBldjtcblxuICAgIGNvbnN0IEZFVENIX0xBVEVTVF9FTlVNID0gUHJvdG8uU3luY01lc3NhZ2UuRmV0Y2hMYXRlc3QuVHlwZTtcblxuICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICBjYXNlIEZFVENIX0xBVEVTVF9FTlVNLkxPQ0FMX1BST0ZJTEU6IHtcbiAgICAgICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkKCk/LnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IG91ckUxNjQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtnZXRQcm9maWxlKG91clV1aWQsIG91ckUxNjQpLCB1cGRhdGVPdXJVc2VybmFtZSgpXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBGRVRDSF9MQVRFU1RfRU5VTS5TVE9SQUdFX01BTklGRVNUOlxuICAgICAgICBsb2cuaW5mbygnb25GZXRjaExhdGVzdFN5bmM6IGZldGNoaW5nIGxhdGVzdCBtYW5pZmVzdCcpO1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLnJ1blN0b3JhZ2VTZXJ2aWNlU3luY0pvYigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRkVUQ0hfTEFURVNUX0VOVU0uU1VCU0NSSVBUSU9OX1NUQVRVUzpcbiAgICAgICAgbG9nLmluZm8oJ29uRmV0Y2hMYXRlc3RTeW5jOiBmZXRjaGluZyBsYXRlc3Qgc3Vic2NyaXB0aW9uIHN0YXR1cycpO1xuICAgICAgICBzdHJpY3RBc3NlcnQoc2VydmVyLCAnV2ViQVBJIG5vdCByZWFkeScpO1xuICAgICAgICBhcmVXZUFTdWJzY3JpYmVyU2VydmljZS51cGRhdGUod2luZG93LnN0b3JhZ2UsIHNlcnZlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nLmluZm8oYG9uRmV0Y2hMYXRlc3RTeW5jOiBVbmtub3duIHR5cGUgZW5jb3VudGVyZWQgJHtldmVudFR5cGV9YCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gb25LZXlzU3luYyhldjogS2V5c0V2ZW50KSB7XG4gICAgZXYuY29uZmlybSgpO1xuXG4gICAgY29uc3QgeyBzdG9yYWdlU2VydmljZUtleSB9ID0gZXY7XG5cbiAgICBpZiAoc3RvcmFnZVNlcnZpY2VLZXkgPT09IG51bGwpIHtcbiAgICAgIGxvZy5pbmZvKCdvbktleXNTeW5jOiBkZWxldGluZyB3aW5kb3cuc3RvcmFnZUtleScpO1xuICAgICAgd2luZG93LnN0b3JhZ2UucmVtb3ZlKCdzdG9yYWdlS2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKHN0b3JhZ2VTZXJ2aWNlS2V5KSB7XG4gICAgICBjb25zdCBzdG9yYWdlU2VydmljZUtleUJhc2U2NCA9IEJ5dGVzLnRvQmFzZTY0KHN0b3JhZ2VTZXJ2aWNlS2V5KTtcbiAgICAgIGlmICh3aW5kb3cuc3RvcmFnZS5nZXQoJ3N0b3JhZ2VLZXknKSA9PT0gc3RvcmFnZVNlcnZpY2VLZXlCYXNlNjQpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgXCJvbktleXNTeW5jOiBzdG9yYWdlIHNlcnZpY2Uga2V5IGRpZG4ndCBjaGFuZ2UsIFwiICtcbiAgICAgICAgICAgICdmZXRjaGluZyBtYW5pZmVzdCBhbnl3YXknXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnb25LZXlzU3luYzogdXBkYXRlZCBzdG9yYWdlIHNlcnZpY2Uga2V5LCBlcmFzaW5nIHN0YXRlIGFuZCBmZXRjaGluZydcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHV0KCdzdG9yYWdlS2V5Jywgc3RvcmFnZVNlcnZpY2VLZXlCYXNlNjQpO1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLmVyYXNlQWxsU3RvcmFnZVNlcnZpY2VTdGF0ZSh7XG4gICAgICAgICAga2VlcFVua25vd25GaWVsZHM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLnJ1blN0b3JhZ2VTZXJ2aWNlU3luY0pvYigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIG9uUE5JSWRlbnRpdHlTeW5jKGV2OiBQTklJZGVudGl0eUV2ZW50KSB7XG4gICAgZXYuY29uZmlybSgpO1xuXG4gICAgbG9nLmluZm8oJ29uUE5JSWRlbnRpdHlTeW5jOiB1cGRhdGluZyBQTkkga2V5cycpO1xuICAgIGNvbnN0IG1hbmFnZXIgPSB3aW5kb3cuZ2V0QWNjb3VudE1hbmFnZXIoKTtcbiAgICBjb25zdCB7IHByaXZhdGVLZXk6IHByaXZLZXksIHB1YmxpY0tleTogcHViS2V5IH0gPSBldi5kYXRhO1xuICAgIGF3YWl0IG1hbmFnZXIudXBkYXRlUE5JSWRlbnRpdHkoeyBwcml2S2V5LCBwdWJLZXkgfSk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBvbk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UoZXY6IE1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VFdmVudCkge1xuICAgIGV2LmNvbmZpcm0oKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIHRocmVhZEUxNjQsXG4gICAgICB0aHJlYWRVdWlkLFxuICAgICAgZ3JvdXBJZCxcbiAgICAgIGdyb3VwVjJJZCxcbiAgICAgIG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlLFxuICAgIH0gPSBldjtcblxuICAgIGxvZy5pbmZvKCdvbk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UnLCB7XG4gICAgICB0aHJlYWRFMTY0LFxuICAgICAgdGhyZWFkVXVpZCxcbiAgICAgIGdyb3VwSWQ6IGBncm91cCgke2dyb3VwSWR9KWAsXG4gICAgICBncm91cFYySWQ6IGBncm91cHYyKCR7Z3JvdXBWMklkfSlgLFxuICAgICAgbWVzc2FnZVJlcXVlc3RSZXNwb25zZVR5cGUsXG4gICAgfSk7XG5cbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBtZXNzYWdlUmVxdWVzdFJlc3BvbnNlVHlwZSxcbiAgICAgICdvbk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2U6IG1pc3NpbmcgdHlwZSdcbiAgICApO1xuXG4gICAgY29uc3QgYXR0cmlidXRlczogTWVzc2FnZVJlcXVlc3RBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIHRocmVhZEUxNjQsXG4gICAgICB0aHJlYWRVdWlkLFxuICAgICAgZ3JvdXBJZCxcbiAgICAgIGdyb3VwVjJJZCxcbiAgICAgIHR5cGU6IG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlLFxuICAgIH07XG4gICAgY29uc3Qgc3luYyA9IE1lc3NhZ2VSZXF1ZXN0cy5nZXRTaW5nbGV0b24oKS5hZGQoYXR0cmlidXRlcyk7XG5cbiAgICBNZXNzYWdlUmVxdWVzdHMuZ2V0U2luZ2xldG9uKCkub25SZXNwb25zZShzeW5jKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUmVhZFJlY2VpcHQoZXZlbnQ6IFJlYWRvbmx5PFJlYWRFdmVudD4pIHtcbiAgICBvblJlYWRPclZpZXdSZWNlaXB0KHtcbiAgICAgIGxvZ1RpdGxlOiAncmVhZCByZWNlaXB0JyxcbiAgICAgIGV2ZW50LFxuICAgICAgdHlwZTogTWVzc2FnZVJlY2VpcHRUeXBlLlJlYWQsXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvblZpZXdSZWNlaXB0KGV2ZW50OiBSZWFkb25seTxWaWV3RXZlbnQ+KTogdm9pZCB7XG4gICAgb25SZWFkT3JWaWV3UmVjZWlwdCh7XG4gICAgICBsb2dUaXRsZTogJ3ZpZXcgcmVjZWlwdCcsXG4gICAgICBldmVudCxcbiAgICAgIHR5cGU6IE1lc3NhZ2VSZWNlaXB0VHlwZS5WaWV3LFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25SZWFkT3JWaWV3UmVjZWlwdCh7XG4gICAgZXZlbnQsXG4gICAgbG9nVGl0bGUsXG4gICAgdHlwZSxcbiAgfTogUmVhZG9ubHk8e1xuICAgIGV2ZW50OiBSZWFkRXZlbnQgfCBWaWV3RXZlbnQ7XG4gICAgbG9nVGl0bGU6IHN0cmluZztcbiAgICB0eXBlOiBNZXNzYWdlUmVjZWlwdFR5cGUuUmVhZCB8IE1lc3NhZ2VSZWNlaXB0VHlwZS5WaWV3O1xuICB9Pik6IHZvaWQge1xuICAgIGNvbnN0IHsgZW52ZWxvcGVUaW1lc3RhbXAsIHRpbWVzdGFtcCwgc291cmNlLCBzb3VyY2VVdWlkLCBzb3VyY2VEZXZpY2UgfSA9XG4gICAgICBldmVudC5yZWNlaXB0O1xuICAgIGNvbnN0IHNvdXJjZUNvbnZlcnNhdGlvbklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyhcbiAgICAgIHtcbiAgICAgICAgZTE2NDogc291cmNlLFxuICAgICAgICB1dWlkOiBzb3VyY2VVdWlkLFxuICAgICAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgICAgIHJlYXNvbjogYG9uUmVhZE9yVmlld1JlY2VpcHQoJHtlbnZlbG9wZVRpbWVzdGFtcH0pYCxcbiAgICAgIH1cbiAgICApO1xuICAgIGxvZy5pbmZvKFxuICAgICAgbG9nVGl0bGUsXG4gICAgICBzb3VyY2UsXG4gICAgICBzb3VyY2VVdWlkLFxuICAgICAgc291cmNlRGV2aWNlLFxuICAgICAgZW52ZWxvcGVUaW1lc3RhbXAsXG4gICAgICBzb3VyY2VDb252ZXJzYXRpb25JZCxcbiAgICAgICdmb3Igc2VudCBtZXNzYWdlJyxcbiAgICAgIHRpbWVzdGFtcFxuICAgICk7XG5cbiAgICBldmVudC5jb25maXJtKCk7XG5cbiAgICBpZiAoIXdpbmRvdy5zdG9yYWdlLmdldCgncmVhZC1yZWNlaXB0LXNldHRpbmcnKSB8fCAhc291cmNlQ29udmVyc2F0aW9uSWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBpc1ZhbGlkVXVpZChzb3VyY2VVdWlkKSxcbiAgICAgICdvblJlYWRPclZpZXdSZWNlaXB0OiBNaXNzaW5nIHNvdXJjZVV1aWQnXG4gICAgKTtcbiAgICBzdHJpY3RBc3NlcnQoc291cmNlRGV2aWNlLCAnb25SZWFkT3JWaWV3UmVjZWlwdDogTWlzc2luZyBzb3VyY2VEZXZpY2UnKTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXM6IE1lc3NhZ2VSZWNlaXB0QXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBtZXNzYWdlU2VudEF0OiB0aW1lc3RhbXAsXG4gICAgICByZWNlaXB0VGltZXN0YW1wOiBlbnZlbG9wZVRpbWVzdGFtcCxcbiAgICAgIHNvdXJjZUNvbnZlcnNhdGlvbklkLFxuICAgICAgc291cmNlVXVpZCxcbiAgICAgIHNvdXJjZURldmljZSxcbiAgICAgIHR5cGUsXG4gICAgfTtcbiAgICBjb25zdCByZWNlaXB0ID0gTWVzc2FnZVJlY2VpcHRzLmdldFNpbmdsZXRvbigpLmFkZChhdHRyaWJ1dGVzKTtcblxuICAgIC8vIE5vdGU6IFdlIGRvIG5vdCB3YWl0IGZvciBjb21wbGV0aW9uIGhlcmVcbiAgICBNZXNzYWdlUmVjZWlwdHMuZ2V0U2luZ2xldG9uKCkub25SZWNlaXB0KHJlY2VpcHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25SZWFkU3luYyhldjogUmVhZFN5bmNFdmVudCkge1xuICAgIGNvbnN0IHsgZW52ZWxvcGVUaW1lc3RhbXAsIHNlbmRlciwgc2VuZGVyVXVpZCwgdGltZXN0YW1wIH0gPSBldi5yZWFkO1xuICAgIGNvbnN0IHJlYWRBdCA9IGVudmVsb3BlVGltZXN0YW1wO1xuICAgIGNvbnN0IHNlbmRlcklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICBlMTY0OiBzZW5kZXIsXG4gICAgICB1dWlkOiBzZW5kZXJVdWlkLFxuICAgIH0pO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICAncmVhZCBzeW5jJyxcbiAgICAgIHNlbmRlcixcbiAgICAgIHNlbmRlclV1aWQsXG4gICAgICBlbnZlbG9wZVRpbWVzdGFtcCxcbiAgICAgIHNlbmRlcklkLFxuICAgICAgJ2ZvciBtZXNzYWdlJyxcbiAgICAgIHRpbWVzdGFtcFxuICAgICk7XG5cbiAgICBzdHJpY3RBc3NlcnQoc2VuZGVySWQsICdvblJlYWRTeW5jIG1pc3Npbmcgc2VuZGVySWQnKTtcbiAgICBzdHJpY3RBc3NlcnQoc2VuZGVyVXVpZCwgJ29uUmVhZFN5bmMgbWlzc2luZyBzZW5kZXJVdWlkJyk7XG4gICAgc3RyaWN0QXNzZXJ0KHRpbWVzdGFtcCwgJ29uUmVhZFN5bmMgbWlzc2luZyB0aW1lc3RhbXAnKTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXM6IFJlYWRTeW5jQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBzZW5kZXJJZCxcbiAgICAgIHNlbmRlcixcbiAgICAgIHNlbmRlclV1aWQsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICByZWFkQXQsXG4gICAgfTtcbiAgICBjb25zdCByZWNlaXB0ID0gUmVhZFN5bmNzLmdldFNpbmdsZXRvbigpLmFkZChhdHRyaWJ1dGVzKTtcblxuICAgIHJlY2VpcHQub24oJ3JlbW92ZScsIGV2LmNvbmZpcm0pO1xuXG4gICAgLy8gTm90ZTogSGVyZSB3ZSB3YWl0LCBiZWNhdXNlIHdlIHdhbnQgcmVhZCBzdGF0ZXMgdG8gYmUgaW4gdGhlIGRhdGFiYXNlXG4gICAgLy8gICBiZWZvcmUgd2UgbW92ZSBvbi5cbiAgICByZXR1cm4gUmVhZFN5bmNzLmdldFNpbmdsZXRvbigpLm9uU3luYyhyZWNlaXB0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVmlld1N5bmMoZXY6IFZpZXdTeW5jRXZlbnQpIHtcbiAgICBjb25zdCB7IGVudmVsb3BlVGltZXN0YW1wLCBzZW5kZXJFMTY0LCBzZW5kZXJVdWlkLCB0aW1lc3RhbXAgfSA9IGV2LnZpZXc7XG4gICAgY29uc3Qgc2VuZGVySWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIGUxNjQ6IHNlbmRlckUxNjQsXG4gICAgICB1dWlkOiBzZW5kZXJVdWlkLFxuICAgIH0pO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICAndmlldyBzeW5jJyxcbiAgICAgIHNlbmRlckUxNjQsXG4gICAgICBzZW5kZXJVdWlkLFxuICAgICAgZW52ZWxvcGVUaW1lc3RhbXAsXG4gICAgICBzZW5kZXJJZCxcbiAgICAgICdmb3IgbWVzc2FnZScsXG4gICAgICB0aW1lc3RhbXBcbiAgICApO1xuXG4gICAgc3RyaWN0QXNzZXJ0KHNlbmRlcklkLCAnb25WaWV3U3luYyBtaXNzaW5nIHNlbmRlcklkJyk7XG4gICAgc3RyaWN0QXNzZXJ0KHNlbmRlclV1aWQsICdvblZpZXdTeW5jIG1pc3Npbmcgc2VuZGVyVXVpZCcpO1xuICAgIHN0cmljdEFzc2VydCh0aW1lc3RhbXAsICdvblZpZXdTeW5jIG1pc3NpbmcgdGltZXN0YW1wJyk7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBWaWV3U3luY0F0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgc2VuZGVySWQsXG4gICAgICBzZW5kZXJFMTY0LFxuICAgICAgc2VuZGVyVXVpZCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIHZpZXdlZEF0OiBlbnZlbG9wZVRpbWVzdGFtcCxcbiAgICB9O1xuICAgIGNvbnN0IHJlY2VpcHQgPSBWaWV3U3luY3MuZ2V0U2luZ2xldG9uKCkuYWRkKGF0dHJpYnV0ZXMpO1xuXG4gICAgcmVjZWlwdC5vbigncmVtb3ZlJywgZXYuY29uZmlybSk7XG5cbiAgICAvLyBOb3RlOiBIZXJlIHdlIHdhaXQsIGJlY2F1c2Ugd2Ugd2FudCB2aWV3ZWQgc3RhdGVzIHRvIGJlIGluIHRoZSBkYXRhYmFzZVxuICAgIC8vICAgYmVmb3JlIHdlIG1vdmUgb24uXG4gICAgcmV0dXJuIFZpZXdTeW5jcy5nZXRTaW5nbGV0b24oKS5vblN5bmMocmVjZWlwdCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkRlbGl2ZXJ5UmVjZWlwdChldjogRGVsaXZlcnlFdmVudCkge1xuICAgIGNvbnN0IHsgZGVsaXZlcnlSZWNlaXB0IH0gPSBldjtcbiAgICBjb25zdCB7IGVudmVsb3BlVGltZXN0YW1wLCBzb3VyY2VVdWlkLCBzb3VyY2UsIHNvdXJjZURldmljZSwgdGltZXN0YW1wIH0gPVxuICAgICAgZGVsaXZlcnlSZWNlaXB0O1xuXG4gICAgZXYuY29uZmlybSgpO1xuXG4gICAgY29uc3Qgc291cmNlQ29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKFxuICAgICAge1xuICAgICAgICBlMTY0OiBzb3VyY2UsXG4gICAgICAgIHV1aWQ6IHNvdXJjZVV1aWQsXG4gICAgICAgIGhpZ2hUcnVzdDogdHJ1ZSxcbiAgICAgICAgcmVhc29uOiBgb25EZWxpdmVyeVJlY2VpcHQoJHtlbnZlbG9wZVRpbWVzdGFtcH0pYCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICAnZGVsaXZlcnkgcmVjZWlwdCBmcm9tJyxcbiAgICAgIHNvdXJjZSxcbiAgICAgIHNvdXJjZVV1aWQsXG4gICAgICBzb3VyY2VEZXZpY2UsXG4gICAgICBzb3VyY2VDb252ZXJzYXRpb25JZCxcbiAgICAgIGVudmVsb3BlVGltZXN0YW1wLFxuICAgICAgJ2ZvciBzZW50IG1lc3NhZ2UnLFxuICAgICAgdGltZXN0YW1wXG4gICAgKTtcblxuICAgIGlmICghc291cmNlQ29udmVyc2F0aW9uSWQpIHtcbiAgICAgIGxvZy5pbmZvKCdubyBjb252ZXJzYXRpb24gZm9yJywgc291cmNlLCBzb3VyY2VVdWlkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBlbnZlbG9wZVRpbWVzdGFtcCxcbiAgICAgICdvbkRlbGl2ZXJ5UmVjZWlwdDogbWlzc2luZyBlbnZlbG9wZVRpbWVzdGFtcCdcbiAgICApO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIGlzVmFsaWRVdWlkKHNvdXJjZVV1aWQpLFxuICAgICAgJ29uRGVsaXZlcnlSZWNlaXB0OiBtaXNzaW5nIHZhbGlkIHNvdXJjZVV1aWQnXG4gICAgKTtcbiAgICBzdHJpY3RBc3NlcnQoc291cmNlRGV2aWNlLCAnb25EZWxpdmVyeVJlY2VpcHQ6IG1pc3Npbmcgc291cmNlRGV2aWNlJyk7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBNZXNzYWdlUmVjZWlwdEF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgbWVzc2FnZVNlbnRBdDogdGltZXN0YW1wLFxuICAgICAgcmVjZWlwdFRpbWVzdGFtcDogZW52ZWxvcGVUaW1lc3RhbXAsXG4gICAgICBzb3VyY2VDb252ZXJzYXRpb25JZCxcbiAgICAgIHNvdXJjZVV1aWQsXG4gICAgICBzb3VyY2VEZXZpY2UsXG4gICAgICB0eXBlOiBNZXNzYWdlUmVjZWlwdFR5cGUuRGVsaXZlcnksXG4gICAgfTtcbiAgICBjb25zdCByZWNlaXB0ID0gTWVzc2FnZVJlY2VpcHRzLmdldFNpbmdsZXRvbigpLmFkZChhdHRyaWJ1dGVzKTtcblxuICAgIC8vIE5vdGU6IFdlIGRvbid0IHdhaXQgZm9yIGNvbXBsZXRpb24gaGVyZVxuICAgIE1lc3NhZ2VSZWNlaXB0cy5nZXRTaW5nbGV0b24oKS5vblJlY2VpcHQocmVjZWlwdCk7XG4gIH1cbn1cblxud2luZG93LnN0YXJ0QXBwID0gc3RhcnRBcHA7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUF5QjtBQUN6QixvQkFBeUI7QUFDekIsbUJBQW1DO0FBQ25DLHVCQUF1QjtBQUN2Qix5QkFBdUM7QUFFdkMsNkJBQTRCO0FBSzVCLG9CQUEwQjtBQUMxQiw2QkFHTztBQU1QLFlBQXVCO0FBQ3ZCLGFBQXdCO0FBQ3hCLGdCQUEyQjtBQUkzQiwwQkFBNkI7QUFDN0Isb0JBQTJDO0FBQzNDLGtCQUEwQjtBQUMxQix1QkFBaUM7QUFDakMsZ0JBQTJCO0FBQzNCLDRCQUErQjtBQUMvQixpQ0FBb0M7QUFDcEMsb0JBQXFDO0FBQ3JDLDJCQUE4QjtBQUM5Qix1QkFBdUI7QUFDdkIsc0JBQXlCO0FBQ3pCLHdDQUEyQztBQUMzQywwQkFBNkI7QUFDN0Isc0NBQWdEO0FBQ2hELDhDQUFpRDtBQUNqRCx5QkFBZ0Q7QUFDaEQsK0JBQXlDO0FBQ3pDLG9DQUFzQztBQUN0QyxxQkFBZ0M7QUFDaEMsbUNBQXNDO0FBQ3RDLHVCQUEyRDtBQUMzRCxrQ0FBcUM7QUFFckMscUJBQTJCO0FBQzNCLGdDQUFtQztBQUNuQyxxQkFBOEI7QUFDOUIsK0NBQWtEO0FBQ2xELG9DQUF1QztBQUN2QyxzQ0FBeUM7QUFDekMsMkJBQXFDO0FBQ3JDLDJCQUFvQztBQUNwQyw4QkFBd0M7QUFDeEMscUNBQXdDO0FBQ3hDLHlDQUE0QztBQUM1Qyx5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
