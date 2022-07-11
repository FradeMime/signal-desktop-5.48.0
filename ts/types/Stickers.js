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
var Stickers_exports = {};
__export(Stickers_exports, {
  BLESSED_PACKS: () => BLESSED_PACKS,
  copyStickerToAttachments: () => copyStickerToAttachments,
  deletePack: () => deletePack,
  deletePackReference: () => deletePackReference,
  downloadEphemeralPack: () => downloadEphemeralPack,
  downloadQueuedPacks: () => downloadQueuedPacks,
  downloadStickerPack: () => downloadStickerPack,
  getDataFromLink: () => getDataFromLink,
  getInitialState: () => getInitialState,
  getInstalledStickerPacks: () => getInstalledStickerPacks,
  getSticker: () => getSticker,
  getStickerPack: () => getStickerPack,
  getStickerPackStatus: () => getStickerPackStatus,
  isPackIdValid: () => isPackIdValid,
  load: () => load,
  maybeDeletePack: () => maybeDeletePack,
  redactPackId: () => redactPackId,
  removeEphemeralPack: () => removeEphemeralPack,
  savePackMetadata: () => savePackMetadata
});
module.exports = __toCommonJS(Stickers_exports);
var import_lodash = require("lodash");
var import_p_map = __toESM(require("p-map"));
var import_p_queue = __toESM(require("p-queue"));
var import_assert = require("../util/assert");
var import_dropNull = require("../util/dropNull");
var import_makeLookup = require("../util/makeLookup");
var import_url = require("../util/url");
var Bytes = __toESM(require("../Bytes"));
var Errors = __toESM(require("./errors"));
var import_Crypto = require("../Crypto");
var import_MIME = require("./MIME");
var import_sniffImageMimeType = require("../util/sniffImageMimeType");
var import_Client = __toESM(require("../sql/Client"));
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
const BLESSED_PACKS = {
  "9acc9e8aba563d26a4994e69263e3b25": {
    key: "Wm3/OUjCjvubeq+T7MN1xp/DFueAd+0mhnoU0QoPahI=",
    status: "downloaded"
  },
  fb535407d2f6497ec074df8b9c51dd1d: {
    key: "F+lxwTQDViJ4HS7iSeZHO3dFg3ULaMEbuCt1CcaLbf0=",
    status: "downloaded"
  },
  e61fa0867031597467ccc036cc65d403: {
    key: "E657GnQHMYKA6bOMEmHe044OcTi5+WSmzLtz5A9zeps=",
    status: "downloaded"
  },
  cca32f5b905208b7d0f1e17f23fdc185: {
    key: "i/jpX3pFver+DI9bAC7wGrlbjxtbqsQBnM1ra+Cxg3o=",
    status: "downloaded"
  },
  ccc89a05dc077856b57351e90697976c: {
    key: "RXMOYPCdVWYRUiN0RTemt9nqmc7qy3eh+9aAG5YH+88=",
    status: "downloaded"
  },
  cfc50156556893ef9838069d3890fe49: {
    key: "X1vqt9OCRDywCh5I65Upe2uMrf0GMeXQ2dyUnmmZ/0s=",
    status: "downloaded"
  }
};
const STICKER_PACK_DEFAULTS = {
  id: "",
  key: "",
  author: "",
  coverStickerId: 0,
  createdAt: 0,
  downloadAttempts: 0,
  status: "ephemeral",
  stickerCount: 0,
  stickers: {},
  title: ""
};
const VALID_PACK_ID_REGEXP = /^[0-9a-f]{32}$/i;
let initialState;
let packsToDownload;
const downloadQueue = new import_p_queue.default({ concurrency: 1, timeout: 1e3 * 60 * 2 });
async function load() {
  const [packs, recentStickers] = await Promise.all([
    getPacksForRedux(),
    getRecentStickersForRedux()
  ]);
  const blessedPacks = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(BLESSED_PACKS)) {
    blessedPacks[key] = true;
  }
  initialState = {
    packs,
    recentStickers,
    blessedPacks,
    installedPack: null
  };
  packsToDownload = capturePacksToDownload(packs);
}
function getDataFromLink(link) {
  const url = (0, import_url.maybeParseUrl)(link);
  if (!url) {
    return void 0;
  }
  const { hash } = url;
  if (!hash) {
    return void 0;
  }
  let params;
  try {
    params = new URLSearchParams(hash.slice(1));
  } catch (err) {
    return void 0;
  }
  const id = params.get("pack_id");
  if (!isPackIdValid(id)) {
    return void 0;
  }
  const key = params.get("pack_key");
  if (!key) {
    return void 0;
  }
  return { id, key };
}
function getInstalledStickerPacks() {
  const state = window.reduxStore.getState();
  const { stickers } = state;
  const { packs } = stickers;
  if (!packs) {
    return [];
  }
  const items = Object.values(packs);
  return items.filter((pack) => pack.status === "installed");
}
function downloadQueuedPacks() {
  (0, import_assert.strictAssert)(packsToDownload, "Stickers not initialized");
  const ids = Object.keys(packsToDownload);
  for (const id of ids) {
    const { key, status } = packsToDownload[id];
    downloadStickerPack(id, key, { finalStatus: status, suppressError: true });
  }
  packsToDownload = {};
}
function capturePacksToDownload(existingPackLookup) {
  const toDownload = /* @__PURE__ */ Object.create(null);
  const blessedIds = Object.keys(BLESSED_PACKS);
  blessedIds.forEach((id) => {
    const existing = existingPackLookup[id];
    if (!existing || existing.status !== "downloaded" && existing.status !== "installed") {
      toDownload[id] = {
        id,
        ...BLESSED_PACKS[id]
      };
    }
  });
  const existingIds = Object.keys(existingPackLookup);
  existingIds.forEach((id) => {
    if (toDownload[id]) {
      return;
    }
    const existing = existingPackLookup[id];
    if (existing.status === "ephemeral") {
      deletePack(id);
      return;
    }
    if (existing.status === "known") {
      return;
    }
    if (doesPackNeedDownload(existing)) {
      const status = existing.attemptedStatus === "installed" ? "installed" : void 0;
      toDownload[id] = {
        id,
        key: existing.key,
        status
      };
    }
  });
  return toDownload;
}
function doesPackNeedDownload(pack) {
  if (!pack) {
    return true;
  }
  const { status, stickerCount } = pack;
  if ((status === "installed" || status === "downloaded") && stickerCount > 0) {
    return false;
  }
  return true;
}
async function getPacksForRedux() {
  const [packs, stickers] = await Promise.all([
    import_Client.default.getAllStickerPacks(),
    import_Client.default.getAllStickers()
  ]);
  const stickersByPack = (0, import_lodash.groupBy)(stickers, (sticker) => sticker.packId);
  const fullSet = packs.map((pack) => ({
    ...pack,
    stickers: (0, import_makeLookup.makeLookup)(stickersByPack[pack.id] || [], "id")
  }));
  return (0, import_makeLookup.makeLookup)(fullSet, "id");
}
async function getRecentStickersForRedux() {
  const recent = await import_Client.default.getRecentStickers();
  return recent.map((sticker) => ({
    packId: sticker.packId,
    stickerId: sticker.id
  }));
}
function getInitialState() {
  (0, import_assert.strictAssert)(initialState !== void 0, "Stickers not initialized");
  return initialState;
}
function isPackIdValid(packId) {
  return typeof packId === "string" && VALID_PACK_ID_REGEXP.test(packId);
}
function redactPackId(packId) {
  return `[REDACTED]${packId.slice(-3)}`;
}
function getReduxStickerActions() {
  const actions = window.reduxActions;
  (0, import_assert.strictAssert)(actions && actions.stickers, "Redux not ready");
  return actions.stickers;
}
function decryptSticker(packKey, ciphertext) {
  const binaryKey = Bytes.fromBase64(packKey);
  const derivedKey = (0, import_Crypto.deriveStickerPackKey)(binaryKey);
  const plaintext = (0, import_Crypto.decryptAttachment)(ciphertext, derivedKey);
  return plaintext;
}
async function downloadSticker(packId, packKey, proto, { ephemeral } = {}) {
  const { id, emoji } = proto;
  (0, import_assert.strictAssert)(id !== void 0 && id !== null, "Sticker id can't be null");
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  const ciphertext = await messaging.getSticker(packId, id);
  const plaintext = decryptSticker(packKey, ciphertext);
  const sticker = ephemeral ? await window.Signal.Migrations.processNewEphemeralSticker(plaintext) : await window.Signal.Migrations.processNewSticker(plaintext);
  return {
    id,
    emoji: (0, import_dropNull.dropNull)(emoji),
    ...sticker,
    packId
  };
}
async function savePackMetadata(packId, packKey, { messageId } = {}) {
  const existing = getStickerPack(packId);
  if (existing) {
    return;
  }
  const { stickerPackAdded } = getReduxStickerActions();
  const pack = {
    ...STICKER_PACK_DEFAULTS,
    id: packId,
    key: packKey,
    status: "known"
  };
  stickerPackAdded(pack);
  await import_Client.default.createOrUpdateStickerPack(pack);
  if (messageId) {
    await import_Client.default.addStickerPackReference(messageId, packId);
  }
}
async function removeEphemeralPack(packId) {
  const existing = getStickerPack(packId);
  (0, import_assert.strictAssert)(existing, `No existing sticker pack with id: ${packId}`);
  if (existing.status !== "ephemeral" && !(existing.status === "error" && existing.attemptedStatus === "ephemeral")) {
    return;
  }
  const { removeStickerPack } = getReduxStickerActions();
  removeStickerPack(packId);
  const stickers = (0, import_lodash.values)(existing.stickers);
  const paths = stickers.map((sticker) => sticker.path);
  await (0, import_p_map.default)(paths, window.Signal.Migrations.deleteTempFile, {
    concurrency: 3
  });
  await import_Client.default.deleteStickerPack(packId);
}
async function downloadEphemeralPack(packId, packKey) {
  const { stickerAdded, stickerPackAdded, stickerPackUpdated } = getReduxStickerActions();
  const existingPack = getStickerPack(packId);
  if (existingPack && (existingPack.status === "downloaded" || existingPack.status === "installed" || existingPack.status === "pending")) {
    log.warn(`Ephemeral download for pack ${redactPackId(packId)} requested, we already know about it. Skipping.`);
    return;
  }
  try {
    const placeholder = {
      ...STICKER_PACK_DEFAULTS,
      id: packId,
      key: packKey,
      status: "ephemeral"
    };
    stickerPackAdded(placeholder);
    const { messaging } = window.textsecure;
    if (!messaging) {
      throw new Error("messaging is not available!");
    }
    const ciphertext = await messaging.getStickerPackManifest(packId);
    const plaintext = decryptSticker(packKey, ciphertext);
    const proto = import_protobuf.SignalService.StickerPack.decode(plaintext);
    const firstStickerProto = proto.stickers ? proto.stickers[0] : null;
    const stickerCount = proto.stickers.length;
    const coverProto = proto.cover || firstStickerProto;
    const coverStickerId = coverProto ? coverProto.id : null;
    if (!coverProto || !(0, import_lodash.isNumber)(coverStickerId)) {
      throw new Error(`Sticker pack ${redactPackId(packId)} is malformed - it has no cover, and no stickers`);
    }
    const nonCoverStickers = (0, import_lodash.reject)(proto.stickers, (sticker) => !(0, import_lodash.isNumber)(sticker.id) || sticker.id === coverStickerId);
    const coverIncludedInList = nonCoverStickers.length < stickerCount;
    const pack = {
      ...STICKER_PACK_DEFAULTS,
      id: packId,
      key: packKey,
      coverStickerId,
      stickerCount,
      status: "ephemeral",
      ...(0, import_lodash.pick)(proto, ["title", "author"])
    };
    stickerPackAdded(pack);
    const downloadStickerJob = /* @__PURE__ */ __name(async (stickerProto) => {
      let stickerInfo;
      try {
        stickerInfo = await downloadSticker(packId, packKey, stickerProto, {
          ephemeral: true
        });
      } catch (error) {
        log.error(`downloadEphemeralPack/downloadStickerJob error: ${Errors.toLogFormat(error)}`);
        return false;
      }
      const sticker = {
        ...stickerInfo,
        isCoverOnly: !coverIncludedInList && stickerInfo.id === coverStickerId
      };
      const statusCheck = getStickerPackStatus(packId);
      if (statusCheck !== "ephemeral") {
        throw new Error(`Ephemeral download for pack ${redactPackId(packId)} interrupted by status change. Status is now ${statusCheck}.`);
      }
      stickerAdded(sticker);
      return true;
    }, "downloadStickerJob");
    await downloadStickerJob(coverProto);
    const jobResults = await (0, import_p_map.default)(nonCoverStickers, downloadStickerJob, {
      concurrency: 3
    });
    const successfulStickerCount = jobResults.filter((item) => item).length;
    if (successfulStickerCount === 0 && nonCoverStickers.length !== 0) {
      throw new Error("downloadEphemeralPack: All stickers failed to download");
    }
  } catch (error) {
    const statusCheck = getStickerPackStatus(packId);
    if (statusCheck === "ephemeral") {
      stickerPackUpdated(packId, {
        attemptedStatus: "ephemeral",
        status: "error"
      });
    }
    log.error(`Ephemeral download error for sticker pack ${redactPackId(packId)}:`, error && error.stack ? error.stack : error);
  }
}
async function downloadStickerPack(packId, packKey, options = {}) {
  return downloadQueue.add(async () => {
    try {
      await doDownloadStickerPack(packId, packKey, options);
    } catch (error) {
      log.error("doDownloadStickerPack threw an error:", error && error.stack ? error.stack : error);
    }
  });
}
async function doDownloadStickerPack(packId, packKey, {
  finalStatus = "downloaded",
  messageId,
  fromSync = false,
  suppressError = false
}) {
  const {
    stickerAdded,
    stickerPackAdded,
    stickerPackUpdated,
    installStickerPack
  } = getReduxStickerActions();
  if (finalStatus !== "downloaded" && finalStatus !== "installed") {
    throw new Error(`doDownloadStickerPack: invalid finalStatus of ${finalStatus} requested.`);
  }
  const existing = getStickerPack(packId);
  if (!doesPackNeedDownload(existing)) {
    return;
  }
  const attemptIncrement = navigator.onLine ? 1 : 0;
  const downloadAttempts = (existing ? existing.downloadAttempts || 0 : 0) + attemptIncrement;
  if (downloadAttempts > 3) {
    log.warn(`Refusing to attempt another download for pack ${redactPackId(packId)}, attempt number ${downloadAttempts}`);
    if (existing && existing.status !== "error") {
      await import_Client.default.updateStickerPackStatus(packId, "error");
      stickerPackUpdated(packId, {
        status: "error"
      }, { suppressError });
    }
    return;
  }
  let coverProto;
  let coverStickerId;
  let coverIncludedInList = false;
  let nonCoverStickers = [];
  try {
    const placeholder = {
      ...STICKER_PACK_DEFAULTS,
      id: packId,
      key: packKey,
      attemptedStatus: finalStatus,
      downloadAttempts,
      status: "pending"
    };
    stickerPackAdded(placeholder);
    const { messaging } = window.textsecure;
    if (!messaging) {
      throw new Error("messaging is not available!");
    }
    const ciphertext = await messaging.getStickerPackManifest(packId);
    const plaintext = decryptSticker(packKey, ciphertext);
    const proto = import_protobuf.SignalService.StickerPack.decode(plaintext);
    const firstStickerProto = proto.stickers ? proto.stickers[0] : void 0;
    const stickerCount = proto.stickers.length;
    coverProto = proto.cover || firstStickerProto;
    coverStickerId = (0, import_dropNull.dropNull)(coverProto ? coverProto.id : void 0);
    if (!coverProto || !(0, import_lodash.isNumber)(coverStickerId)) {
      throw new Error(`Sticker pack ${redactPackId(packId)} is malformed - it has no cover, and no stickers`);
    }
    nonCoverStickers = (0, import_lodash.reject)(proto.stickers, (sticker) => !(0, import_lodash.isNumber)(sticker.id) || sticker.id === coverStickerId);
    coverIncludedInList = nonCoverStickers.length < stickerCount;
    const pack = {
      id: packId,
      key: packKey,
      attemptedStatus: finalStatus,
      coverStickerId,
      downloadAttempts,
      stickerCount,
      status: "pending",
      createdAt: Date.now(),
      stickers: {},
      ...(0, import_lodash.pick)(proto, ["title", "author"])
    };
    await import_Client.default.createOrUpdateStickerPack(pack);
    stickerPackAdded(pack);
    if (messageId) {
      await import_Client.default.addStickerPackReference(messageId, packId);
    }
  } catch (error) {
    log.error(`Error downloading manifest for sticker pack ${redactPackId(packId)}:`, error && error.stack ? error.stack : error);
    const pack = {
      ...STICKER_PACK_DEFAULTS,
      id: packId,
      key: packKey,
      attemptedStatus: finalStatus,
      downloadAttempts,
      status: "error"
    };
    await import_Client.default.createOrUpdateStickerPack(pack);
    stickerPackAdded(pack, { suppressError });
    return;
  }
  try {
    const downloadStickerJob = /* @__PURE__ */ __name(async (stickerProto) => {
      try {
        const stickerInfo = await downloadSticker(packId, packKey, stickerProto);
        const sticker = {
          ...stickerInfo,
          isCoverOnly: !coverIncludedInList && stickerInfo.id === coverStickerId
        };
        await import_Client.default.createOrUpdateSticker(sticker);
        stickerAdded(sticker);
        return true;
      } catch (error) {
        log.error(`doDownloadStickerPack/downloadStickerJob error: ${Errors.toLogFormat(error)}`);
        return false;
      }
    }, "downloadStickerJob");
    await downloadStickerJob(coverProto);
    const jobResults = await (0, import_p_map.default)(nonCoverStickers, downloadStickerJob, {
      concurrency: 3
    });
    const successfulStickerCount = jobResults.filter((item) => item).length;
    if (successfulStickerCount === 0 && nonCoverStickers.length !== 0) {
      throw new Error("doDownloadStickerPack: All stickers failed to download");
    }
    const existingStatus = getStickerPackStatus(packId);
    if (existingStatus === "installed") {
      return;
    }
    if (finalStatus === "installed") {
      await installStickerPack(packId, packKey, { fromSync });
    } else {
      await import_Client.default.updateStickerPackStatus(packId, finalStatus);
      stickerPackUpdated(packId, {
        status: finalStatus
      });
    }
  } catch (error) {
    log.error(`Error downloading stickers for sticker pack ${redactPackId(packId)}:`, error && error.stack ? error.stack : error);
    const errorStatus = "error";
    await import_Client.default.updateStickerPackStatus(packId, errorStatus);
    if (stickerPackUpdated) {
      stickerPackUpdated(packId, {
        attemptedStatus: finalStatus,
        status: errorStatus
      }, { suppressError });
    }
  }
}
function getStickerPack(packId) {
  const state = window.reduxStore.getState();
  const { stickers } = state;
  const { packs } = stickers;
  if (!packs) {
    return void 0;
  }
  return packs[packId];
}
function getStickerPackStatus(packId) {
  const pack = getStickerPack(packId);
  if (!pack) {
    return void 0;
  }
  return pack.status;
}
function getSticker(packId, stickerId) {
  const pack = getStickerPack(packId);
  if (!pack || !pack.stickers) {
    return void 0;
  }
  return pack.stickers[stickerId];
}
async function copyStickerToAttachments(packId, stickerId) {
  const sticker = getSticker(packId, stickerId);
  if (!sticker) {
    throw new Error(`copyStickerToAttachments: Failed to find sticker ${packId}/${stickerId}`);
  }
  const { path: stickerPath } = sticker;
  const absolutePath = window.Signal.Migrations.getAbsoluteStickerPath(stickerPath);
  const { path, size } = await window.Signal.Migrations.copyIntoAttachmentsDirectory(absolutePath);
  const data = await window.Signal.Migrations.readAttachmentData(path);
  let contentType;
  const sniffedMimeType = (0, import_sniffImageMimeType.sniffImageMimeType)(data);
  if (sniffedMimeType) {
    contentType = sniffedMimeType;
  } else {
    log.warn("copyStickerToAttachments: Unable to sniff sticker MIME type; falling back to WebP");
    contentType = import_MIME.IMAGE_WEBP;
  }
  return {
    ...sticker,
    contentType,
    path,
    size
  };
}
async function maybeDeletePack(packId) {
  await deletePackReference("NOT-USED", packId);
}
async function deletePackReference(messageId, packId) {
  const isBlessed = Boolean(BLESSED_PACKS[packId]);
  if (isBlessed) {
    return;
  }
  const paths = await import_Client.default.deleteStickerPackReference(messageId, packId);
  if (!paths) {
    return;
  }
  const { removeStickerPack } = getReduxStickerActions();
  removeStickerPack(packId);
  await (0, import_p_map.default)(paths, window.Signal.Migrations.deleteSticker, {
    concurrency: 3
  });
}
async function deletePack(packId) {
  const isBlessed = Boolean(BLESSED_PACKS[packId]);
  if (isBlessed) {
    return;
  }
  const paths = await import_Client.default.deleteStickerPack(packId);
  const { removeStickerPack } = getReduxStickerActions();
  removeStickerPack(packId);
  await (0, import_p_map.default)(paths, window.Signal.Migrations.deleteSticker, {
    concurrency: 3
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BLESSED_PACKS,
  copyStickerToAttachments,
  deletePack,
  deletePackReference,
  downloadEphemeralPack,
  downloadQueuedPacks,
  downloadStickerPack,
  getDataFromLink,
  getInitialState,
  getInstalledStickerPacks,
  getSticker,
  getStickerPack,
  getStickerPackStatus,
  isPackIdValid,
  load,
  maybeDeletePack,
  redactPackId,
  removeEphemeralPack,
  savePackMetadata
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpc051bWJlciwgcGljaywgcmVqZWN0LCBncm91cEJ5LCB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBNYXAgZnJvbSAncC1tYXAnO1xuaW1wb3J0IFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuXG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBkcm9wTnVsbCB9IGZyb20gJy4uL3V0aWwvZHJvcE51bGwnO1xuaW1wb3J0IHsgbWFrZUxvb2t1cCB9IGZyb20gJy4uL3V0aWwvbWFrZUxvb2t1cCc7XG5pbXBvcnQgeyBtYXliZVBhcnNlVXJsIH0gZnJvbSAnLi4vdXRpbC91cmwnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IGRlcml2ZVN0aWNrZXJQYWNrS2V5LCBkZWNyeXB0QXR0YWNobWVudCB9IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQgeyBJTUFHRV9XRUJQIH0gZnJvbSAnLi9NSU1FJztcbmltcG9ydCB0eXBlIHsgTUlNRVR5cGUgfSBmcm9tICcuL01JTUUnO1xuaW1wb3J0IHsgc25pZmZJbWFnZU1pbWVUeXBlIH0gZnJvbSAnLi4vdXRpbC9zbmlmZkltYWdlTWltZVR5cGUnO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSwgQXR0YWNobWVudFdpdGhIeWRyYXRlZERhdGEgfSBmcm9tICcuL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUge1xuICBTdGlja2VyVHlwZSBhcyBTdGlja2VyRnJvbURCVHlwZSxcbiAgU3RpY2tlclBhY2tUeXBlLFxuICBTdGlja2VyUGFja1N0YXR1c1R5cGUsXG59IGZyb20gJy4uL3NxbC9JbnRlcmZhY2UnO1xuaW1wb3J0IERhdGEgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgU3RpY2tlcnNTdGF0ZVR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9zdGlja2Vycyc7XG5cbmV4cG9ydCB0eXBlIFN0aWNrZXJUeXBlID0ge1xuICBwYWNrSWQ6IHN0cmluZztcbiAgc3RpY2tlcklkOiBudW1iZXI7XG4gIHBhY2tLZXk6IHN0cmluZztcbiAgZW1vamk/OiBzdHJpbmc7XG4gIGRhdGE/OiBBdHRhY2htZW50VHlwZTtcbiAgcGF0aD86IHN0cmluZztcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcbn07XG5leHBvcnQgdHlwZSBTdGlja2VyV2l0aEh5ZHJhdGVkRGF0YSA9IFN0aWNrZXJUeXBlICYge1xuICBkYXRhOiBBdHRhY2htZW50V2l0aEh5ZHJhdGVkRGF0YTtcbn07XG5cbmV4cG9ydCB0eXBlIFJlY2VudFN0aWNrZXJUeXBlID0gUmVhZG9ubHk8e1xuICBzdGlja2VySWQ6IG51bWJlcjtcbiAgcGFja0lkOiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IHR5cGUgQmxlc3NlZFR5cGUgPSBQaWNrPFN0aWNrZXJQYWNrVHlwZSwgJ2tleScgfCAnc3RhdHVzJz47XG5cbmV4cG9ydCB0eXBlIERvd25sb2FkTWFwID0gUmVjb3JkPFxuICBzdHJpbmcsXG4gIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGtleTogc3RyaW5nO1xuICAgIHN0YXR1cz86IFN0aWNrZXJQYWNrU3RhdHVzVHlwZTtcbiAgfVxuPjtcblxuZXhwb3J0IGNvbnN0IEJMRVNTRURfUEFDS1M6IFJlY29yZDxzdHJpbmcsIEJsZXNzZWRUeXBlPiA9IHtcbiAgJzlhY2M5ZThhYmE1NjNkMjZhNDk5NGU2OTI2M2UzYjI1Jzoge1xuICAgIGtleTogJ1dtMy9PVWpDanZ1YmVxK1Q3TU4xeHAvREZ1ZUFkKzBtaG5vVTBRb1BhaEk9JyxcbiAgICBzdGF0dXM6ICdkb3dubG9hZGVkJyxcbiAgfSxcbiAgZmI1MzU0MDdkMmY2NDk3ZWMwNzRkZjhiOWM1MWRkMWQ6IHtcbiAgICBrZXk6ICdGK2x4d1RRRFZpSjRIUzdpU2VaSE8zZEZnM1VMYU1FYnVDdDFDY2FMYmYwPScsXG4gICAgc3RhdHVzOiAnZG93bmxvYWRlZCcsXG4gIH0sXG4gIGU2MWZhMDg2NzAzMTU5NzQ2N2NjYzAzNmNjNjVkNDAzOiB7XG4gICAga2V5OiAnRTY1N0duUUhNWUtBNmJPTUVtSGUwNDRPY1RpNStXU216THR6NUE5emVwcz0nLFxuICAgIHN0YXR1czogJ2Rvd25sb2FkZWQnLFxuICB9LFxuICBjY2EzMmY1YjkwNTIwOGI3ZDBmMWUxN2YyM2ZkYzE4NToge1xuICAgIGtleTogJ2kvanBYM3BGdmVyK0RJOWJBQzd3R3JsYmp4dGJxc1FCbk0xcmErQ3hnM289JyxcbiAgICBzdGF0dXM6ICdkb3dubG9hZGVkJyxcbiAgfSxcbiAgY2NjODlhMDVkYzA3Nzg1NmI1NzM1MWU5MDY5Nzk3NmM6IHtcbiAgICBrZXk6ICdSWE1PWVBDZFZXWVJVaU4wUlRlbXQ5bnFtYzdxeTNlaCs5YUFHNVlIKzg4PScsXG4gICAgc3RhdHVzOiAnZG93bmxvYWRlZCcsXG4gIH0sXG4gIGNmYzUwMTU2NTU2ODkzZWY5ODM4MDY5ZDM4OTBmZTQ5OiB7XG4gICAga2V5OiAnWDF2cXQ5T0NSRHl3Q2g1STY1VXBlMnVNcmYwR01lWFEyZHlVbm1tWi8wcz0nLFxuICAgIHN0YXR1czogJ2Rvd25sb2FkZWQnLFxuICB9LFxufTtcblxuY29uc3QgU1RJQ0tFUl9QQUNLX0RFRkFVTFRTOiBTdGlja2VyUGFja1R5cGUgPSB7XG4gIGlkOiAnJyxcbiAga2V5OiAnJyxcblxuICBhdXRob3I6ICcnLFxuICBjb3ZlclN0aWNrZXJJZDogMCxcbiAgY3JlYXRlZEF0OiAwLFxuICBkb3dubG9hZEF0dGVtcHRzOiAwLFxuICBzdGF0dXM6ICdlcGhlbWVyYWwnLFxuICBzdGlja2VyQ291bnQ6IDAsXG4gIHN0aWNrZXJzOiB7fSxcbiAgdGl0bGU6ICcnLFxufTtcblxuY29uc3QgVkFMSURfUEFDS19JRF9SRUdFWFAgPSAvXlswLTlhLWZdezMyfSQvaTtcblxubGV0IGluaXRpYWxTdGF0ZTogU3RpY2tlcnNTdGF0ZVR5cGUgfCB1bmRlZmluZWQ7XG5sZXQgcGFja3NUb0Rvd25sb2FkOiBEb3dubG9hZE1hcCB8IHVuZGVmaW5lZDtcbmNvbnN0IGRvd25sb2FkUXVldWUgPSBuZXcgUXVldWUoeyBjb25jdXJyZW5jeTogMSwgdGltZW91dDogMTAwMCAqIDYwICogMiB9KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IFtwYWNrcywgcmVjZW50U3RpY2tlcnNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGdldFBhY2tzRm9yUmVkdXgoKSxcbiAgICBnZXRSZWNlbnRTdGlja2Vyc0ZvclJlZHV4KCksXG4gIF0pO1xuXG4gIGNvbnN0IGJsZXNzZWRQYWNrczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhCTEVTU0VEX1BBQ0tTKSkge1xuICAgIGJsZXNzZWRQYWNrc1trZXldID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBwYWNrcyxcbiAgICByZWNlbnRTdGlja2VycyxcbiAgICBibGVzc2VkUGFja3MsXG4gICAgaW5zdGFsbGVkUGFjazogbnVsbCxcbiAgfTtcblxuICBwYWNrc1RvRG93bmxvYWQgPSBjYXB0dXJlUGFja3NUb0Rvd25sb2FkKHBhY2tzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFGcm9tTGluayhcbiAgbGluazogc3RyaW5nXG4pOiB1bmRlZmluZWQgfCB7IGlkOiBzdHJpbmc7IGtleTogc3RyaW5nIH0ge1xuICBjb25zdCB1cmwgPSBtYXliZVBhcnNlVXJsKGxpbmspO1xuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB7IGhhc2ggfSA9IHVybDtcbiAgaWYgKCFoYXNoKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxldCBwYXJhbXM7XG4gIHRyeSB7XG4gICAgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhoYXNoLnNsaWNlKDEpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGlkID0gcGFyYW1zLmdldCgncGFja19pZCcpO1xuICBpZiAoIWlzUGFja0lkVmFsaWQoaWQpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGtleSA9IHBhcmFtcy5nZXQoJ3BhY2tfa2V5Jyk7XG4gIGlmICgha2V5KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB7IGlkLCBrZXkgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbGxlZFN0aWNrZXJQYWNrcygpOiBBcnJheTxTdGlja2VyUGFja1R5cGU+IHtcbiAgY29uc3Qgc3RhdGUgPSB3aW5kb3cucmVkdXhTdG9yZS5nZXRTdGF0ZSgpO1xuICBjb25zdCB7IHN0aWNrZXJzIH0gPSBzdGF0ZTtcbiAgY29uc3QgeyBwYWNrcyB9ID0gc3RpY2tlcnM7XG4gIGlmICghcGFja3MpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IE9iamVjdC52YWx1ZXMocGFja3MpO1xuICByZXR1cm4gaXRlbXMuZmlsdGVyKHBhY2sgPT4gcGFjay5zdGF0dXMgPT09ICdpbnN0YWxsZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkUXVldWVkUGFja3MoKTogdm9pZCB7XG4gIHN0cmljdEFzc2VydChwYWNrc1RvRG93bmxvYWQsICdTdGlja2VycyBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICBjb25zdCBpZHMgPSBPYmplY3Qua2V5cyhwYWNrc1RvRG93bmxvYWQpO1xuICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgIGNvbnN0IHsga2V5LCBzdGF0dXMgfSA9IHBhY2tzVG9Eb3dubG9hZFtpZF07XG5cbiAgICAvLyBUaGUgcXVldWluZyBpcyBkb25lIGluc2lkZSB0aGlzIGZ1bmN0aW9uLCBubyBuZWVkIHRvIGF3YWl0IGhlcmVcbiAgICBkb3dubG9hZFN0aWNrZXJQYWNrKGlkLCBrZXksIHsgZmluYWxTdGF0dXM6IHN0YXR1cywgc3VwcHJlc3NFcnJvcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHBhY2tzVG9Eb3dubG9hZCA9IHt9O1xufVxuXG5mdW5jdGlvbiBjYXB0dXJlUGFja3NUb0Rvd25sb2FkKFxuICBleGlzdGluZ1BhY2tMb29rdXA6IFJlY29yZDxzdHJpbmcsIFN0aWNrZXJQYWNrVHlwZT5cbik6IERvd25sb2FkTWFwIHtcbiAgY29uc3QgdG9Eb3dubG9hZDogRG93bmxvYWRNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vIEZpcnN0LCBlbnN1cmUgdGhhdCBibGVzc2VkIHBhY2tzIGFyZSBpbiBnb29kIHNoYXBlXG4gIGNvbnN0IGJsZXNzZWRJZHMgPSBPYmplY3Qua2V5cyhCTEVTU0VEX1BBQ0tTKTtcbiAgYmxlc3NlZElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICBjb25zdCBleGlzdGluZyA9IGV4aXN0aW5nUGFja0xvb2t1cFtpZF07XG4gICAgaWYgKFxuICAgICAgIWV4aXN0aW5nIHx8XG4gICAgICAoZXhpc3Rpbmcuc3RhdHVzICE9PSAnZG93bmxvYWRlZCcgJiYgZXhpc3Rpbmcuc3RhdHVzICE9PSAnaW5zdGFsbGVkJylcbiAgICApIHtcbiAgICAgIHRvRG93bmxvYWRbaWRdID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgLi4uQkxFU1NFRF9QQUNLU1tpZF0sXG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVGhlbiwgZmluZCBlcnJvciBjYXNlcyBpbiBwYWNrcyB3ZSBhbHJlYWR5IGtub3cgYWJvdXRcbiAgY29uc3QgZXhpc3RpbmdJZHMgPSBPYmplY3Qua2V5cyhleGlzdGluZ1BhY2tMb29rdXApO1xuICBleGlzdGluZ0lkcy5mb3JFYWNoKGlkID0+IHtcbiAgICBpZiAodG9Eb3dubG9hZFtpZF0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBleGlzdGluZyA9IGV4aXN0aW5nUGFja0xvb2t1cFtpZF07XG5cbiAgICAvLyBUaGVzZSBwYWNrcyBzaG91bGQgbmV2ZXIgZW5kIHVwIGluIHRoZSBkYXRhYmFzZSwgYnV0IGlmIHRoZXkgZG8gd2UnbGwgZGVsZXRlIHRoZW1cbiAgICBpZiAoZXhpc3Rpbmcuc3RhdHVzID09PSAnZXBoZW1lcmFsJykge1xuICAgICAgZGVsZXRlUGFjayhpZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gV2UgZG9uJ3QgYXV0b21hdGljYWxseSBkb3dubG9hZCB0aGVzZTsgbm90IHVudGlsIGEgdXNlciBhY3Rpb24ga2lja3MgaXQgb2ZmXG4gICAgaWYgKGV4aXN0aW5nLnN0YXR1cyA9PT0gJ2tub3duJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkb2VzUGFja05lZWREb3dubG9hZChleGlzdGluZykpIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9XG4gICAgICAgIGV4aXN0aW5nLmF0dGVtcHRlZFN0YXR1cyA9PT0gJ2luc3RhbGxlZCcgPyAnaW5zdGFsbGVkJyA6IHVuZGVmaW5lZDtcbiAgICAgIHRvRG93bmxvYWRbaWRdID0ge1xuICAgICAgICBpZCxcbiAgICAgICAga2V5OiBleGlzdGluZy5rZXksXG4gICAgICAgIHN0YXR1cyxcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdG9Eb3dubG9hZDtcbn1cblxuZnVuY3Rpb24gZG9lc1BhY2tOZWVkRG93bmxvYWQocGFjaz86IFN0aWNrZXJQYWNrVHlwZSk6IGJvb2xlYW4ge1xuICBpZiAoIXBhY2spIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHsgc3RhdHVzLCBzdGlja2VyQ291bnQgfSA9IHBhY2s7XG5cbiAgaWYgKChzdGF0dXMgPT09ICdpbnN0YWxsZWQnIHx8IHN0YXR1cyA9PT0gJ2Rvd25sb2FkZWQnKSAmJiBzdGlja2VyQ291bnQgPiAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gSWYgd2UgZG9uJ3QgdW5kZXJzdGFuZCBhIHBhY2sncyBzdGF0dXMsIHdlJ2xsIGRvd25sb2FkIGl0XG4gIC8vIElmIGEgcGFjayBoYXMgYW55IG90aGVyIHN0YXR1cywgd2UnbGwgZG93bmxvYWQgaXRcbiAgLy8gSWYgYSBwYWNrIGhhcyB6ZXJvIHN0aWNrZXJzIGluIGl0LCB3ZSdsbCBkb3dubG9hZCBpdFxuXG4gIC8vIE5vdGU6IElmIGEgcGFjayBkb3dubG9hZGVkIHdpdGggbGVzcyB0aGFuIHRoZSBleHBlY3RlZCBudW1iZXIgb2Ygc3RpY2tlcnMsIHdlJ3JlXG4gIC8vICAgb2theSB3aXRoIHRoYXQuXG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBhY2tzRm9yUmVkdXgoKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBTdGlja2VyUGFja1R5cGU+PiB7XG4gIGNvbnN0IFtwYWNrcywgc3RpY2tlcnNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIERhdGEuZ2V0QWxsU3RpY2tlclBhY2tzKCksXG4gICAgRGF0YS5nZXRBbGxTdGlja2VycygpLFxuICBdKTtcblxuICBjb25zdCBzdGlja2Vyc0J5UGFjayA9IGdyb3VwQnkoc3RpY2tlcnMsIHN0aWNrZXIgPT4gc3RpY2tlci5wYWNrSWQpO1xuICBjb25zdCBmdWxsU2V0OiBBcnJheTxTdGlja2VyUGFja1R5cGU+ID0gcGFja3MubWFwKHBhY2sgPT4gKHtcbiAgICAuLi5wYWNrLFxuICAgIHN0aWNrZXJzOiBtYWtlTG9va3VwKHN0aWNrZXJzQnlQYWNrW3BhY2suaWRdIHx8IFtdLCAnaWQnKSxcbiAgfSkpO1xuXG4gIHJldHVybiBtYWtlTG9va3VwKGZ1bGxTZXQsICdpZCcpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRTdGlja2Vyc0ZvclJlZHV4KCk6IFByb21pc2U8QXJyYXk8UmVjZW50U3RpY2tlclR5cGU+PiB7XG4gIGNvbnN0IHJlY2VudCA9IGF3YWl0IERhdGEuZ2V0UmVjZW50U3RpY2tlcnMoKTtcbiAgcmV0dXJuIHJlY2VudC5tYXAoc3RpY2tlciA9PiAoe1xuICAgIHBhY2tJZDogc3RpY2tlci5wYWNrSWQsXG4gICAgc3RpY2tlcklkOiBzdGlja2VyLmlkLFxuICB9KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKTogU3RpY2tlcnNTdGF0ZVR5cGUge1xuICBzdHJpY3RBc3NlcnQoaW5pdGlhbFN0YXRlICE9PSB1bmRlZmluZWQsICdTdGlja2VycyBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFja0lkVmFsaWQocGFja0lkOiB1bmtub3duKTogcGFja0lkIGlzIHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgcGFja0lkID09PSAnc3RyaW5nJyAmJiBWQUxJRF9QQUNLX0lEX1JFR0VYUC50ZXN0KHBhY2tJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWRhY3RQYWNrSWQocGFja0lkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYFtSRURBQ1RFRF0ke3BhY2tJZC5zbGljZSgtMyl9YDtcbn1cblxuZnVuY3Rpb24gZ2V0UmVkdXhTdGlja2VyQWN0aW9ucygpIHtcbiAgY29uc3QgYWN0aW9ucyA9IHdpbmRvdy5yZWR1eEFjdGlvbnM7XG4gIHN0cmljdEFzc2VydChhY3Rpb25zICYmIGFjdGlvbnMuc3RpY2tlcnMsICdSZWR1eCBub3QgcmVhZHknKTtcblxuICByZXR1cm4gYWN0aW9ucy5zdGlja2Vycztcbn1cblxuZnVuY3Rpb24gZGVjcnlwdFN0aWNrZXIocGFja0tleTogc3RyaW5nLCBjaXBoZXJ0ZXh0OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGNvbnN0IGJpbmFyeUtleSA9IEJ5dGVzLmZyb21CYXNlNjQocGFja0tleSk7XG4gIGNvbnN0IGRlcml2ZWRLZXkgPSBkZXJpdmVTdGlja2VyUGFja0tleShiaW5hcnlLZXkpO1xuICBjb25zdCBwbGFpbnRleHQgPSBkZWNyeXB0QXR0YWNobWVudChjaXBoZXJ0ZXh0LCBkZXJpdmVkS2V5KTtcblxuICByZXR1cm4gcGxhaW50ZXh0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZFN0aWNrZXIoXG4gIHBhY2tJZDogc3RyaW5nLFxuICBwYWNrS2V5OiBzdHJpbmcsXG4gIHByb3RvOiBQcm90by5TdGlja2VyUGFjay5JU3RpY2tlcixcbiAgeyBlcGhlbWVyYWwgfTogeyBlcGhlbWVyYWw/OiBib29sZWFuIH0gPSB7fVxuKTogUHJvbWlzZTxPbWl0PFN0aWNrZXJGcm9tREJUeXBlLCAnaXNDb3Zlck9ubHknPj4ge1xuICBjb25zdCB7IGlkLCBlbW9qaSB9ID0gcHJvdG87XG4gIHN0cmljdEFzc2VydChpZCAhPT0gdW5kZWZpbmVkICYmIGlkICE9PSBudWxsLCBcIlN0aWNrZXIgaWQgY2FuJ3QgYmUgbnVsbFwiKTtcblxuICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSEnKTtcbiAgfVxuXG4gIGNvbnN0IGNpcGhlcnRleHQgPSBhd2FpdCBtZXNzYWdpbmcuZ2V0U3RpY2tlcihwYWNrSWQsIGlkKTtcbiAgY29uc3QgcGxhaW50ZXh0ID0gZGVjcnlwdFN0aWNrZXIocGFja0tleSwgY2lwaGVydGV4dCk7XG5cbiAgY29uc3Qgc3RpY2tlciA9IGVwaGVtZXJhbFxuICAgID8gYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLnByb2Nlc3NOZXdFcGhlbWVyYWxTdGlja2VyKHBsYWludGV4dClcbiAgICA6IGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5wcm9jZXNzTmV3U3RpY2tlcihwbGFpbnRleHQpO1xuXG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAgZW1vamk6IGRyb3BOdWxsKGVtb2ppKSxcbiAgICAuLi5zdGlja2VyLFxuICAgIHBhY2tJZCxcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVQYWNrTWV0YWRhdGEoXG4gIHBhY2tJZDogc3RyaW5nLFxuICBwYWNrS2V5OiBzdHJpbmcsXG4gIHsgbWVzc2FnZUlkIH06IHsgbWVzc2FnZUlkPzogc3RyaW5nIH0gPSB7fVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZ2V0U3RpY2tlclBhY2socGFja0lkKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBzdGlja2VyUGFja0FkZGVkIH0gPSBnZXRSZWR1eFN0aWNrZXJBY3Rpb25zKCk7XG4gIGNvbnN0IHBhY2sgPSB7XG4gICAgLi4uU1RJQ0tFUl9QQUNLX0RFRkFVTFRTLFxuXG4gICAgaWQ6IHBhY2tJZCxcbiAgICBrZXk6IHBhY2tLZXksXG4gICAgc3RhdHVzOiAna25vd24nIGFzIGNvbnN0LFxuICB9O1xuICBzdGlja2VyUGFja0FkZGVkKHBhY2spO1xuXG4gIGF3YWl0IERhdGEuY3JlYXRlT3JVcGRhdGVTdGlja2VyUGFjayhwYWNrKTtcbiAgaWYgKG1lc3NhZ2VJZCkge1xuICAgIGF3YWl0IERhdGEuYWRkU3RpY2tlclBhY2tSZWZlcmVuY2UobWVzc2FnZUlkLCBwYWNrSWQpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVFcGhlbWVyYWxQYWNrKHBhY2tJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZ2V0U3RpY2tlclBhY2socGFja0lkKTtcbiAgc3RyaWN0QXNzZXJ0KGV4aXN0aW5nLCBgTm8gZXhpc3Rpbmcgc3RpY2tlciBwYWNrIHdpdGggaWQ6ICR7cGFja0lkfWApO1xuICBpZiAoXG4gICAgZXhpc3Rpbmcuc3RhdHVzICE9PSAnZXBoZW1lcmFsJyAmJlxuICAgICEoZXhpc3Rpbmcuc3RhdHVzID09PSAnZXJyb3InICYmIGV4aXN0aW5nLmF0dGVtcHRlZFN0YXR1cyA9PT0gJ2VwaGVtZXJhbCcpXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgcmVtb3ZlU3RpY2tlclBhY2sgfSA9IGdldFJlZHV4U3RpY2tlckFjdGlvbnMoKTtcbiAgcmVtb3ZlU3RpY2tlclBhY2socGFja0lkKTtcblxuICBjb25zdCBzdGlja2VycyA9IHZhbHVlcyhleGlzdGluZy5zdGlja2Vycyk7XG4gIGNvbnN0IHBhdGhzID0gc3RpY2tlcnMubWFwKHN0aWNrZXIgPT4gc3RpY2tlci5wYXRoKTtcbiAgYXdhaXQgcE1hcChwYXRocywgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmRlbGV0ZVRlbXBGaWxlLCB7XG4gICAgY29uY3VycmVuY3k6IDMsXG4gIH0pO1xuXG4gIC8vIFJlbW92ZSBpdCBmcm9tIGRhdGFiYXNlIGluIGNhc2UgaXQgbWFkZSBpdCB0aGVyZVxuICBhd2FpdCBEYXRhLmRlbGV0ZVN0aWNrZXJQYWNrKHBhY2tJZCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEVwaGVtZXJhbFBhY2soXG4gIHBhY2tJZDogc3RyaW5nLFxuICBwYWNrS2V5OiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IHN0aWNrZXJBZGRlZCwgc3RpY2tlclBhY2tBZGRlZCwgc3RpY2tlclBhY2tVcGRhdGVkIH0gPVxuICAgIGdldFJlZHV4U3RpY2tlckFjdGlvbnMoKTtcblxuICBjb25zdCBleGlzdGluZ1BhY2sgPSBnZXRTdGlja2VyUGFjayhwYWNrSWQpO1xuICBpZiAoXG4gICAgZXhpc3RpbmdQYWNrICYmXG4gICAgKGV4aXN0aW5nUGFjay5zdGF0dXMgPT09ICdkb3dubG9hZGVkJyB8fFxuICAgICAgZXhpc3RpbmdQYWNrLnN0YXR1cyA9PT0gJ2luc3RhbGxlZCcgfHxcbiAgICAgIGV4aXN0aW5nUGFjay5zdGF0dXMgPT09ICdwZW5kaW5nJylcbiAgKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgRXBoZW1lcmFsIGRvd25sb2FkIGZvciBwYWNrICR7cmVkYWN0UGFja0lkKFxuICAgICAgICBwYWNrSWRcbiAgICAgICl9IHJlcXVlc3RlZCwgd2UgYWxyZWFkeSBrbm93IGFib3V0IGl0LiBTa2lwcGluZy5gXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFN5bmNocm9ub3VzIHBsYWNlaG9sZGVyIHRvIGhlbHAgd2l0aCByYWNlIGNvbmRpdGlvbnNcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHtcbiAgICAgIC4uLlNUSUNLRVJfUEFDS19ERUZBVUxUUyxcblxuICAgICAgaWQ6IHBhY2tJZCxcbiAgICAgIGtleTogcGFja0tleSxcbiAgICAgIHN0YXR1czogJ2VwaGVtZXJhbCcgYXMgY29uc3QsXG4gICAgfTtcbiAgICBzdGlja2VyUGFja0FkZGVkKHBsYWNlaG9sZGVyKTtcblxuICAgIGNvbnN0IHsgbWVzc2FnaW5nIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgICBpZiAoIW1lc3NhZ2luZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gYXdhaXQgbWVzc2FnaW5nLmdldFN0aWNrZXJQYWNrTWFuaWZlc3QocGFja0lkKTtcbiAgICBjb25zdCBwbGFpbnRleHQgPSBkZWNyeXB0U3RpY2tlcihwYWNrS2V5LCBjaXBoZXJ0ZXh0KTtcbiAgICBjb25zdCBwcm90byA9IFByb3RvLlN0aWNrZXJQYWNrLmRlY29kZShwbGFpbnRleHQpO1xuICAgIGNvbnN0IGZpcnN0U3RpY2tlclByb3RvID0gcHJvdG8uc3RpY2tlcnMgPyBwcm90by5zdGlja2Vyc1swXSA6IG51bGw7XG4gICAgY29uc3Qgc3RpY2tlckNvdW50ID0gcHJvdG8uc3RpY2tlcnMubGVuZ3RoO1xuXG4gICAgY29uc3QgY292ZXJQcm90byA9IHByb3RvLmNvdmVyIHx8IGZpcnN0U3RpY2tlclByb3RvO1xuICAgIGNvbnN0IGNvdmVyU3RpY2tlcklkID0gY292ZXJQcm90byA/IGNvdmVyUHJvdG8uaWQgOiBudWxsO1xuXG4gICAgaWYgKCFjb3ZlclByb3RvIHx8ICFpc051bWJlcihjb3ZlclN0aWNrZXJJZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFN0aWNrZXIgcGFjayAke3JlZGFjdFBhY2tJZChcbiAgICAgICAgICBwYWNrSWRcbiAgICAgICAgKX0gaXMgbWFsZm9ybWVkIC0gaXQgaGFzIG5vIGNvdmVyLCBhbmQgbm8gc3RpY2tlcnNgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG5vbkNvdmVyU3RpY2tlcnMgPSByZWplY3QoXG4gICAgICBwcm90by5zdGlja2VycyxcbiAgICAgIHN0aWNrZXIgPT4gIWlzTnVtYmVyKHN0aWNrZXIuaWQpIHx8IHN0aWNrZXIuaWQgPT09IGNvdmVyU3RpY2tlcklkXG4gICAgKTtcblxuICAgIGNvbnN0IGNvdmVySW5jbHVkZWRJbkxpc3QgPSBub25Db3ZlclN0aWNrZXJzLmxlbmd0aCA8IHN0aWNrZXJDb3VudDtcblxuICAgIGNvbnN0IHBhY2sgPSB7XG4gICAgICAuLi5TVElDS0VSX1BBQ0tfREVGQVVMVFMsXG5cbiAgICAgIGlkOiBwYWNrSWQsXG4gICAgICBrZXk6IHBhY2tLZXksXG4gICAgICBjb3ZlclN0aWNrZXJJZCxcbiAgICAgIHN0aWNrZXJDb3VudCxcbiAgICAgIHN0YXR1czogJ2VwaGVtZXJhbCcgYXMgY29uc3QsXG4gICAgICAuLi5waWNrKHByb3RvLCBbJ3RpdGxlJywgJ2F1dGhvciddKSxcbiAgICB9O1xuICAgIHN0aWNrZXJQYWNrQWRkZWQocGFjayk7XG5cbiAgICBjb25zdCBkb3dubG9hZFN0aWNrZXJKb2IgPSBhc3luYyAoXG4gICAgICBzdGlja2VyUHJvdG86IFByb3RvLlN0aWNrZXJQYWNrLklTdGlja2VyXG4gICAgKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICBsZXQgc3RpY2tlckluZm87XG4gICAgICB0cnkge1xuICAgICAgICBzdGlja2VySW5mbyA9IGF3YWl0IGRvd25sb2FkU3RpY2tlcihwYWNrSWQsIHBhY2tLZXksIHN0aWNrZXJQcm90bywge1xuICAgICAgICAgIGVwaGVtZXJhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYGRvd25sb2FkRXBoZW1lcmFsUGFjay9kb3dubG9hZFN0aWNrZXJKb2IgZXJyb3I6ICR7RXJyb3JzLnRvTG9nRm9ybWF0KFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RpY2tlciA9IHtcbiAgICAgICAgLi4uc3RpY2tlckluZm8sXG4gICAgICAgIGlzQ292ZXJPbmx5OiAhY292ZXJJbmNsdWRlZEluTGlzdCAmJiBzdGlja2VySW5mby5pZCA9PT0gY292ZXJTdGlja2VySWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0dXNDaGVjayA9IGdldFN0aWNrZXJQYWNrU3RhdHVzKHBhY2tJZCk7XG4gICAgICBpZiAoc3RhdHVzQ2hlY2sgIT09ICdlcGhlbWVyYWwnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRXBoZW1lcmFsIGRvd25sb2FkIGZvciBwYWNrICR7cmVkYWN0UGFja0lkKFxuICAgICAgICAgICAgcGFja0lkXG4gICAgICAgICAgKX0gaW50ZXJydXB0ZWQgYnkgc3RhdHVzIGNoYW5nZS4gU3RhdHVzIGlzIG5vdyAke3N0YXR1c0NoZWNrfS5gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHN0aWNrZXJBZGRlZChzdGlja2VyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvLyBEb3dubG9hZCB0aGUgY292ZXIgZmlyc3RcbiAgICBhd2FpdCBkb3dubG9hZFN0aWNrZXJKb2IoY292ZXJQcm90byk7XG5cbiAgICAvLyBUaGVuIHRoZSByZXN0XG4gICAgY29uc3Qgam9iUmVzdWx0cyA9IGF3YWl0IHBNYXAobm9uQ292ZXJTdGlja2VycywgZG93bmxvYWRTdGlja2VySm9iLCB7XG4gICAgICBjb25jdXJyZW5jeTogMyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHN1Y2Nlc3NmdWxTdGlja2VyQ291bnQgPSBqb2JSZXN1bHRzLmZpbHRlcihpdGVtID0+IGl0ZW0pLmxlbmd0aDtcbiAgICBpZiAoc3VjY2Vzc2Z1bFN0aWNrZXJDb3VudCA9PT0gMCAmJiBub25Db3ZlclN0aWNrZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkb3dubG9hZEVwaGVtZXJhbFBhY2s6IEFsbCBzdGlja2VycyBmYWlsZWQgdG8gZG93bmxvYWQnKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgdXNlciBjb3VsZCBpbnN0YWxsIHRoaXMgcGFjayB3aGlsZSB3ZSBhcmUgc3RpbGwgZG93bmxvYWRpbmcgdGhpc1xuICAgIC8vICAgZXBoZW1lcmFsIHBhY2ssIHdlIGRvbid0IHdhbnQgdG8gZ28gY2hhbmdlIGl0cyBzdGF0dXMgdW5sZXNzIHdlJ3JlIHN0aWxsIGluXG4gICAgLy8gICBlcGhlbWVyYWwgbW9kZS5cbiAgICBjb25zdCBzdGF0dXNDaGVjayA9IGdldFN0aWNrZXJQYWNrU3RhdHVzKHBhY2tJZCk7XG4gICAgaWYgKHN0YXR1c0NoZWNrID09PSAnZXBoZW1lcmFsJykge1xuICAgICAgc3RpY2tlclBhY2tVcGRhdGVkKHBhY2tJZCwge1xuICAgICAgICBhdHRlbXB0ZWRTdGF0dXM6ICdlcGhlbWVyYWwnLFxuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICB9KTtcbiAgICB9XG4gICAgbG9nLmVycm9yKFxuICAgICAgYEVwaGVtZXJhbCBkb3dubG9hZCBlcnJvciBmb3Igc3RpY2tlciBwYWNrICR7cmVkYWN0UGFja0lkKHBhY2tJZCl9OmAsXG4gICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIERvd25sb2FkU3RpY2tlclBhY2tPcHRpb25zID0gUmVhZG9ubHk8e1xuICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gIGZyb21TeW5jPzogYm9vbGVhbjtcbiAgZmluYWxTdGF0dXM/OiBTdGlja2VyUGFja1N0YXR1c1R5cGU7XG4gIHN1cHByZXNzRXJyb3I/OiBib29sZWFuO1xufT47XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZFN0aWNrZXJQYWNrKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICBvcHRpb25zOiBEb3dubG9hZFN0aWNrZXJQYWNrT3B0aW9ucyA9IHt9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gVGhpcyB3aWxsIGVuc3VyZSB0aGF0IG9ubHkgb25lIGRvd25sb2FkIHByb2Nlc3MgaXMgaW4gcHJvZ3Jlc3MgYXQgYW55IGdpdmVuIHRpbWVcbiAgcmV0dXJuIGRvd25sb2FkUXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZG9Eb3dubG9hZFN0aWNrZXJQYWNrKHBhY2tJZCwgcGFja0tleSwgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ2RvRG93bmxvYWRTdGlja2VyUGFjayB0aHJldyBhbiBlcnJvcjonLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9Eb3dubG9hZFN0aWNrZXJQYWNrKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICB7XG4gICAgZmluYWxTdGF0dXMgPSAnZG93bmxvYWRlZCcsXG4gICAgbWVzc2FnZUlkLFxuICAgIGZyb21TeW5jID0gZmFsc2UsXG4gICAgc3VwcHJlc3NFcnJvciA9IGZhbHNlLFxuICB9OiBEb3dubG9hZFN0aWNrZXJQYWNrT3B0aW9uc1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHtcbiAgICBzdGlja2VyQWRkZWQsXG4gICAgc3RpY2tlclBhY2tBZGRlZCxcbiAgICBzdGlja2VyUGFja1VwZGF0ZWQsXG4gICAgaW5zdGFsbFN0aWNrZXJQYWNrLFxuICB9ID0gZ2V0UmVkdXhTdGlja2VyQWN0aW9ucygpO1xuXG4gIGlmIChmaW5hbFN0YXR1cyAhPT0gJ2Rvd25sb2FkZWQnICYmIGZpbmFsU3RhdHVzICE9PSAnaW5zdGFsbGVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBkb0Rvd25sb2FkU3RpY2tlclBhY2s6IGludmFsaWQgZmluYWxTdGF0dXMgb2YgJHtmaW5hbFN0YXR1c30gcmVxdWVzdGVkLmBcbiAgICApO1xuICB9XG5cbiAgY29uc3QgZXhpc3RpbmcgPSBnZXRTdGlja2VyUGFjayhwYWNrSWQpO1xuICBpZiAoIWRvZXNQYWNrTmVlZERvd25sb2FkKGV4aXN0aW5nKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFdlIGRvbid0IGNvdW50IHRoaXMgYXMgYW4gYXR0ZW1wdCBpZiB3ZSdyZSBvZmZsaW5lXG4gIGNvbnN0IGF0dGVtcHRJbmNyZW1lbnQgPSBuYXZpZ2F0b3Iub25MaW5lID8gMSA6IDA7XG4gIGNvbnN0IGRvd25sb2FkQXR0ZW1wdHMgPVxuICAgIChleGlzdGluZyA/IGV4aXN0aW5nLmRvd25sb2FkQXR0ZW1wdHMgfHwgMCA6IDApICsgYXR0ZW1wdEluY3JlbWVudDtcbiAgaWYgKGRvd25sb2FkQXR0ZW1wdHMgPiAzKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgUmVmdXNpbmcgdG8gYXR0ZW1wdCBhbm90aGVyIGRvd25sb2FkIGZvciBwYWNrICR7cmVkYWN0UGFja0lkKFxuICAgICAgICBwYWNrSWRcbiAgICAgICl9LCBhdHRlbXB0IG51bWJlciAke2Rvd25sb2FkQXR0ZW1wdHN9YFxuICAgICk7XG5cbiAgICBpZiAoZXhpc3RpbmcgJiYgZXhpc3Rpbmcuc3RhdHVzICE9PSAnZXJyb3InKSB7XG4gICAgICBhd2FpdCBEYXRhLnVwZGF0ZVN0aWNrZXJQYWNrU3RhdHVzKHBhY2tJZCwgJ2Vycm9yJyk7XG4gICAgICBzdGlja2VyUGFja1VwZGF0ZWQoXG4gICAgICAgIHBhY2tJZCxcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgICAgfSxcbiAgICAgICAgeyBzdXBwcmVzc0Vycm9yIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGNvdmVyUHJvdG86IFByb3RvLlN0aWNrZXJQYWNrLklTdGlja2VyIHwgdW5kZWZpbmVkO1xuICBsZXQgY292ZXJTdGlja2VySWQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgbGV0IGNvdmVySW5jbHVkZWRJbkxpc3QgPSBmYWxzZTtcbiAgbGV0IG5vbkNvdmVyU3RpY2tlcnM6IEFycmF5PFByb3RvLlN0aWNrZXJQYWNrLklTdGlja2VyPiA9IFtdO1xuXG4gIHRyeSB7XG4gICAgLy8gU3luY2hyb25vdXMgcGxhY2Vob2xkZXIgdG8gaGVscCB3aXRoIHJhY2UgY29uZGl0aW9uc1xuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0ge1xuICAgICAgLi4uU1RJQ0tFUl9QQUNLX0RFRkFVTFRTLFxuXG4gICAgICBpZDogcGFja0lkLFxuICAgICAga2V5OiBwYWNrS2V5LFxuICAgICAgYXR0ZW1wdGVkU3RhdHVzOiBmaW5hbFN0YXR1cyxcbiAgICAgIGRvd25sb2FkQXR0ZW1wdHMsXG4gICAgICBzdGF0dXM6ICdwZW5kaW5nJyBhcyBjb25zdCxcbiAgICB9O1xuICAgIHN0aWNrZXJQYWNrQWRkZWQocGxhY2Vob2xkZXIpO1xuXG4gICAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICAgIGlmICghbWVzc2FnaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21lc3NhZ2luZyBpcyBub3QgYXZhaWxhYmxlIScpO1xuICAgIH1cblxuICAgIGNvbnN0IGNpcGhlcnRleHQgPSBhd2FpdCBtZXNzYWdpbmcuZ2V0U3RpY2tlclBhY2tNYW5pZmVzdChwYWNrSWQpO1xuICAgIGNvbnN0IHBsYWludGV4dCA9IGRlY3J5cHRTdGlja2VyKHBhY2tLZXksIGNpcGhlcnRleHQpO1xuICAgIGNvbnN0IHByb3RvID0gUHJvdG8uU3RpY2tlclBhY2suZGVjb2RlKHBsYWludGV4dCk7XG4gICAgY29uc3QgZmlyc3RTdGlja2VyUHJvdG8gPSBwcm90by5zdGlja2VycyA/IHByb3RvLnN0aWNrZXJzWzBdIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0aWNrZXJDb3VudCA9IHByb3RvLnN0aWNrZXJzLmxlbmd0aDtcblxuICAgIGNvdmVyUHJvdG8gPSBwcm90by5jb3ZlciB8fCBmaXJzdFN0aWNrZXJQcm90bztcbiAgICBjb3ZlclN0aWNrZXJJZCA9IGRyb3BOdWxsKGNvdmVyUHJvdG8gPyBjb3ZlclByb3RvLmlkIDogdW5kZWZpbmVkKTtcblxuICAgIGlmICghY292ZXJQcm90byB8fCAhaXNOdW1iZXIoY292ZXJTdGlja2VySWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBTdGlja2VyIHBhY2sgJHtyZWRhY3RQYWNrSWQoXG4gICAgICAgICAgcGFja0lkXG4gICAgICAgICl9IGlzIG1hbGZvcm1lZCAtIGl0IGhhcyBubyBjb3ZlciwgYW5kIG5vIHN0aWNrZXJzYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBub25Db3ZlclN0aWNrZXJzID0gcmVqZWN0KFxuICAgICAgcHJvdG8uc3RpY2tlcnMsXG4gICAgICBzdGlja2VyID0+ICFpc051bWJlcihzdGlja2VyLmlkKSB8fCBzdGlja2VyLmlkID09PSBjb3ZlclN0aWNrZXJJZFxuICAgICk7XG5cbiAgICBjb3ZlckluY2x1ZGVkSW5MaXN0ID0gbm9uQ292ZXJTdGlja2Vycy5sZW5ndGggPCBzdGlja2VyQ291bnQ7XG5cbiAgICAvLyBzdGF0dXMgY2FuIGJlOlxuICAgIC8vICAgLSAna25vd24nXG4gICAgLy8gICAtICdlcGhlbWVyYWwnIChzaG91bGQgbm90IGhpdCBkYXRhYmFzZSlcbiAgICAvLyAgIC0gJ3BlbmRpbmcnXG4gICAgLy8gICAtICdkb3dubG9hZGVkJ1xuICAgIC8vICAgLSAnZXJyb3InXG4gICAgLy8gICAtICdpbnN0YWxsZWQnXG4gICAgY29uc3QgcGFjazogU3RpY2tlclBhY2tUeXBlID0ge1xuICAgICAgaWQ6IHBhY2tJZCxcbiAgICAgIGtleTogcGFja0tleSxcbiAgICAgIGF0dGVtcHRlZFN0YXR1czogZmluYWxTdGF0dXMsXG4gICAgICBjb3ZlclN0aWNrZXJJZCxcbiAgICAgIGRvd25sb2FkQXR0ZW1wdHMsXG4gICAgICBzdGlja2VyQ291bnQsXG4gICAgICBzdGF0dXM6ICdwZW5kaW5nJyxcbiAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgIHN0aWNrZXJzOiB7fSxcbiAgICAgIC4uLnBpY2socHJvdG8sIFsndGl0bGUnLCAnYXV0aG9yJ10pLFxuICAgIH07XG4gICAgYXdhaXQgRGF0YS5jcmVhdGVPclVwZGF0ZVN0aWNrZXJQYWNrKHBhY2spO1xuICAgIHN0aWNrZXJQYWNrQWRkZWQocGFjayk7XG5cbiAgICBpZiAobWVzc2FnZUlkKSB7XG4gICAgICBhd2FpdCBEYXRhLmFkZFN0aWNrZXJQYWNrUmVmZXJlbmNlKG1lc3NhZ2VJZCwgcGFja0lkKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYEVycm9yIGRvd25sb2FkaW5nIG1hbmlmZXN0IGZvciBzdGlja2VyIHBhY2sgJHtyZWRhY3RQYWNrSWQocGFja0lkKX06YCxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG5cbiAgICBjb25zdCBwYWNrID0ge1xuICAgICAgLi4uU1RJQ0tFUl9QQUNLX0RFRkFVTFRTLFxuXG4gICAgICBpZDogcGFja0lkLFxuICAgICAga2V5OiBwYWNrS2V5LFxuICAgICAgYXR0ZW1wdGVkU3RhdHVzOiBmaW5hbFN0YXR1cyxcbiAgICAgIGRvd25sb2FkQXR0ZW1wdHMsXG4gICAgICBzdGF0dXM6ICdlcnJvcicgYXMgY29uc3QsXG4gICAgfTtcbiAgICBhd2FpdCBEYXRhLmNyZWF0ZU9yVXBkYXRlU3RpY2tlclBhY2socGFjayk7XG4gICAgc3RpY2tlclBhY2tBZGRlZChwYWNrLCB7IHN1cHByZXNzRXJyb3IgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBXZSBoYXZlIGEgc2VwYXJhdGUgdHJ5L2NhdGNoIGhlcmUgYmVjYXVzZSB3ZSdyZSBzdGFydGluZyB0byBkb3dubG9hZCBzdGlja2VycyBoZXJlXG4gIC8vICAgYW5kIHdlIHdhbnQgdG8gcHJlc2VydmUgbW9yZSBvZiB0aGUgcGFjayBvbiBhbiBlcnJvci5cbiAgdHJ5IHtcbiAgICBjb25zdCBkb3dubG9hZFN0aWNrZXJKb2IgPSBhc3luYyAoXG4gICAgICBzdGlja2VyUHJvdG86IFByb3RvLlN0aWNrZXJQYWNrLklTdGlja2VyXG4gICAgKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdGlja2VySW5mbyA9IGF3YWl0IGRvd25sb2FkU3RpY2tlcihcbiAgICAgICAgICBwYWNrSWQsXG4gICAgICAgICAgcGFja0tleSxcbiAgICAgICAgICBzdGlja2VyUHJvdG9cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc3RpY2tlciA9IHtcbiAgICAgICAgICAuLi5zdGlja2VySW5mbyxcbiAgICAgICAgICBpc0NvdmVyT25seTpcbiAgICAgICAgICAgICFjb3ZlckluY2x1ZGVkSW5MaXN0ICYmIHN0aWNrZXJJbmZvLmlkID09PSBjb3ZlclN0aWNrZXJJZCxcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgRGF0YS5jcmVhdGVPclVwZGF0ZVN0aWNrZXIoc3RpY2tlcik7XG4gICAgICAgIHN0aWNrZXJBZGRlZChzdGlja2VyKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYGRvRG93bmxvYWRTdGlja2VyUGFjay9kb3dubG9hZFN0aWNrZXJKb2IgZXJyb3I6ICR7RXJyb3JzLnRvTG9nRm9ybWF0KFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEb3dubG9hZCB0aGUgY292ZXIgZmlyc3RcbiAgICBhd2FpdCBkb3dubG9hZFN0aWNrZXJKb2IoY292ZXJQcm90byk7XG5cbiAgICAvLyBUaGVuIHRoZSByZXN0XG4gICAgY29uc3Qgam9iUmVzdWx0cyA9IGF3YWl0IHBNYXAobm9uQ292ZXJTdGlja2VycywgZG93bmxvYWRTdGlja2VySm9iLCB7XG4gICAgICBjb25jdXJyZW5jeTogMyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHN1Y2Nlc3NmdWxTdGlja2VyQ291bnQgPSBqb2JSZXN1bHRzLmZpbHRlcihpdGVtID0+IGl0ZW0pLmxlbmd0aDtcbiAgICBpZiAoc3VjY2Vzc2Z1bFN0aWNrZXJDb3VudCA9PT0gMCAmJiBub25Db3ZlclN0aWNrZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkb0Rvd25sb2FkU3RpY2tlclBhY2s6IEFsbCBzdGlja2VycyBmYWlsZWQgdG8gZG93bmxvYWQnKTtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyBmb3IgdGhlIHVzZXIgbWFya2luZyB0aGlzIHBhY2sgYXMgaW5zdGFsbGVkIGluIHRoZSBtaWRkbGUgb2Ygb3VyIGRvd25sb2FkO1xuICAgIC8vICAgZG9uJ3Qgb3ZlcndyaXRlIHRoYXQgc3RhdHVzLlxuICAgIGNvbnN0IGV4aXN0aW5nU3RhdHVzID0gZ2V0U3RpY2tlclBhY2tTdGF0dXMocGFja0lkKTtcbiAgICBpZiAoZXhpc3RpbmdTdGF0dXMgPT09ICdpbnN0YWxsZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGZpbmFsU3RhdHVzID09PSAnaW5zdGFsbGVkJykge1xuICAgICAgYXdhaXQgaW5zdGFsbFN0aWNrZXJQYWNrKHBhY2tJZCwgcGFja0tleSwgeyBmcm9tU3luYyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWFyayB0aGUgcGFjayBhcyBjb21wbGV0ZVxuICAgICAgYXdhaXQgRGF0YS51cGRhdGVTdGlja2VyUGFja1N0YXR1cyhwYWNrSWQsIGZpbmFsU3RhdHVzKTtcbiAgICAgIHN0aWNrZXJQYWNrVXBkYXRlZChwYWNrSWQsIHtcbiAgICAgICAgc3RhdHVzOiBmaW5hbFN0YXR1cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgRXJyb3IgZG93bmxvYWRpbmcgc3RpY2tlcnMgZm9yIHN0aWNrZXIgcGFjayAke3JlZGFjdFBhY2tJZChwYWNrSWQpfTpgLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcblxuICAgIGNvbnN0IGVycm9yU3RhdHVzID0gJ2Vycm9yJztcbiAgICBhd2FpdCBEYXRhLnVwZGF0ZVN0aWNrZXJQYWNrU3RhdHVzKHBhY2tJZCwgZXJyb3JTdGF0dXMpO1xuICAgIGlmIChzdGlja2VyUGFja1VwZGF0ZWQpIHtcbiAgICAgIHN0aWNrZXJQYWNrVXBkYXRlZChcbiAgICAgICAgcGFja0lkLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0ZW1wdGVkU3RhdHVzOiBmaW5hbFN0YXR1cyxcbiAgICAgICAgICBzdGF0dXM6IGVycm9yU3RhdHVzLFxuICAgICAgICB9LFxuICAgICAgICB7IHN1cHByZXNzRXJyb3IgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0aWNrZXJQYWNrKHBhY2tJZDogc3RyaW5nKTogU3RpY2tlclBhY2tUeXBlIHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qgc3RhdGUgPSB3aW5kb3cucmVkdXhTdG9yZS5nZXRTdGF0ZSgpO1xuICBjb25zdCB7IHN0aWNrZXJzIH0gPSBzdGF0ZTtcbiAgY29uc3QgeyBwYWNrcyB9ID0gc3RpY2tlcnM7XG4gIGlmICghcGFja3MpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHBhY2tzW3BhY2tJZF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGlja2VyUGFja1N0YXR1cyhcbiAgcGFja0lkOiBzdHJpbmdcbik6IFN0aWNrZXJQYWNrU3RhdHVzVHlwZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHBhY2sgPSBnZXRTdGlja2VyUGFjayhwYWNrSWQpO1xuICBpZiAoIXBhY2spIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHBhY2suc3RhdHVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RpY2tlcihcbiAgcGFja0lkOiBzdHJpbmcsXG4gIHN0aWNrZXJJZDogbnVtYmVyXG4pOiBTdGlja2VyRnJvbURCVHlwZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHBhY2sgPSBnZXRTdGlja2VyUGFjayhwYWNrSWQpO1xuXG4gIGlmICghcGFjayB8fCAhcGFjay5zdGlja2Vycykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gcGFjay5zdGlja2Vyc1tzdGlja2VySWRdO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weVN0aWNrZXJUb0F0dGFjaG1lbnRzKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgc3RpY2tlcklkOiBudW1iZXJcbik6IFByb21pc2U8QXR0YWNobWVudFR5cGU+IHtcbiAgY29uc3Qgc3RpY2tlciA9IGdldFN0aWNrZXIocGFja0lkLCBzdGlja2VySWQpO1xuICBpZiAoIXN0aWNrZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgY29weVN0aWNrZXJUb0F0dGFjaG1lbnRzOiBGYWlsZWQgdG8gZmluZCBzdGlja2VyICR7cGFja0lkfS8ke3N0aWNrZXJJZH1gXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHsgcGF0aDogc3RpY2tlclBhdGggfSA9IHN0aWNrZXI7XG4gIGNvbnN0IGFic29sdXRlUGF0aCA9XG4gICAgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlU3RpY2tlclBhdGgoc3RpY2tlclBhdGgpO1xuICBjb25zdCB7IHBhdGgsIHNpemUgfSA9XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmNvcHlJbnRvQXR0YWNobWVudHNEaXJlY3RvcnkoYWJzb2x1dGVQYXRoKTtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLnJlYWRBdHRhY2htZW50RGF0YShwYXRoKTtcblxuICBsZXQgY29udGVudFR5cGU6IE1JTUVUeXBlO1xuICBjb25zdCBzbmlmZmVkTWltZVR5cGUgPSBzbmlmZkltYWdlTWltZVR5cGUoZGF0YSk7XG4gIGlmIChzbmlmZmVkTWltZVR5cGUpIHtcbiAgICBjb250ZW50VHlwZSA9IHNuaWZmZWRNaW1lVHlwZTtcbiAgfSBlbHNlIHtcbiAgICBsb2cud2FybihcbiAgICAgICdjb3B5U3RpY2tlclRvQXR0YWNobWVudHM6IFVuYWJsZSB0byBzbmlmZiBzdGlja2VyIE1JTUUgdHlwZTsgZmFsbGluZyBiYWNrIHRvIFdlYlAnXG4gICAgKTtcbiAgICBjb250ZW50VHlwZSA9IElNQUdFX1dFQlA7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0aWNrZXIsXG4gICAgY29udGVudFR5cGUsXG4gICAgcGF0aCxcbiAgICBzaXplLFxuICB9O1xufVxuXG4vLyBJbiB0aGUgY2FzZSB3aGVyZSBhIHN0aWNrZXIgcGFjayBpcyB1bmluc3RhbGxlZCwgd2Ugd2FudCB0byBkZWxldGUgaXQgaWYgdGhlcmUgYXJlIG5vXG4vLyAgIG1vcmUgcmVmZXJlbmNlcyBsZWZ0LiBXZSdsbCBkZWxldGUgYSBub25leGlzdGVudCByZWZlcmVuY2UsIHRoZW4gY2hlY2sgaWYgdGhlcmUgYXJlXG4vLyAgIGFueSByZWZlcmVuY2VzIGxlZnQsIGp1c3QgbGlrZSB1c3VhbC5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXliZURlbGV0ZVBhY2socGFja0lkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gVGhpcyBoYXJkY29kZWQgc3RyaW5nIGlzIGZpbmUgYmVjYXVzZSBtZXNzYWdlIGlkcyBhcmUgR1VJRHNcbiAgYXdhaXQgZGVsZXRlUGFja1JlZmVyZW5jZSgnTk9ULVVTRUQnLCBwYWNrSWQpO1xufVxuXG4vLyBXZSBkb24ndCBnZW5lcmFsbHkgZGVsZXRlIHBhY2tzIG91dHJpZ2h0OyB3ZSBqdXN0IHJlbW92ZSByZWZlcmVuY2VzIHRvIHRoZW0sIGFuZCBpZlxuLy8gICB0aGUgbGFzdCByZWZlcmVuY2UgaXMgZGVsZXRlZCwgd2UgZmluYWxseSB0aGVuIHJlbW92ZSB0aGUgcGFjayBpdHNlbGYgZnJvbSBkYXRhYmFzZVxuLy8gICBhbmQgZnJvbSBkaXNrLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVBhY2tSZWZlcmVuY2UoXG4gIG1lc3NhZ2VJZDogc3RyaW5nLFxuICBwYWNrSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGlzQmxlc3NlZCA9IEJvb2xlYW4oQkxFU1NFRF9QQUNLU1twYWNrSWRdKTtcbiAgaWYgKGlzQmxlc3NlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFRoaXMgY2FsbCB1c2VzIGxvY2tpbmcgdG8gcHJldmVudCByYWNlIGNvbmRpdGlvbnMgd2l0aCBvdGhlciByZWZlcmVuY2UgcmVtb3ZhbHMsXG4gIC8vICAgb3IgYW4gaW5jb21pbmcgbWVzc2FnZSBjcmVhdGluZyBhIG5ldyBtZXNzYWdlLT5wYWNrIHJlZmVyZW5jZVxuICBjb25zdCBwYXRocyA9IGF3YWl0IERhdGEuZGVsZXRlU3RpY2tlclBhY2tSZWZlcmVuY2UobWVzc2FnZUlkLCBwYWNrSWQpO1xuXG4gIC8vIElmIHdlIGRvbid0IGdldCBhIGxpc3Qgb2YgcGF0aHMgYmFjaywgdGhlbiB0aGUgc3RpY2tlciBwYWNrIHdhcyBub3QgZGVsZXRlZFxuICBpZiAoIXBhdGhzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyByZW1vdmVTdGlja2VyUGFjayB9ID0gZ2V0UmVkdXhTdGlja2VyQWN0aW9ucygpO1xuICByZW1vdmVTdGlja2VyUGFjayhwYWNrSWQpO1xuXG4gIGF3YWl0IHBNYXAocGF0aHMsIHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVTdGlja2VyLCB7XG4gICAgY29uY3VycmVuY3k6IDMsXG4gIH0pO1xufVxuXG4vLyBUaGUgb3ZlcnJpZGU7IGRvZXNuJ3QgaG9ub3Igb3VyIHJlZi1jb3VudGluZyBzY2hlbWUgLSBqdXN0IGRlbGV0ZXMgaXQgYWxsLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVBhY2socGFja0lkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaXNCbGVzc2VkID0gQm9vbGVhbihCTEVTU0VEX1BBQ0tTW3BhY2tJZF0pO1xuICBpZiAoaXNCbGVzc2VkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gVGhpcyBjYWxsIHVzZXMgbG9ja2luZyB0byBwcmV2ZW50IHJhY2UgY29uZGl0aW9ucyB3aXRoIG90aGVyIHJlZmVyZW5jZSByZW1vdmFscyxcbiAgLy8gICBvciBhbiBpbmNvbWluZyBtZXNzYWdlIGNyZWF0aW5nIGEgbmV3IG1lc3NhZ2UtPnBhY2sgcmVmZXJlbmNlXG4gIGNvbnN0IHBhdGhzID0gYXdhaXQgRGF0YS5kZWxldGVTdGlja2VyUGFjayhwYWNrSWQpO1xuXG4gIGNvbnN0IHsgcmVtb3ZlU3RpY2tlclBhY2sgfSA9IGdldFJlZHV4U3RpY2tlckFjdGlvbnMoKTtcbiAgcmVtb3ZlU3RpY2tlclBhY2socGFja0lkKTtcblxuICBhd2FpdCBwTWFwKHBhdGhzLCB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMuZGVsZXRlU3RpY2tlciwge1xuICAgIGNvbmN1cnJlbmN5OiAzLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBd0Q7QUFDeEQsbUJBQWlCO0FBQ2pCLHFCQUFrQjtBQUVsQixvQkFBNkI7QUFDN0Isc0JBQXlCO0FBQ3pCLHdCQUEyQjtBQUMzQixpQkFBOEI7QUFDOUIsWUFBdUI7QUFDdkIsYUFBd0I7QUFDeEIsb0JBQXdEO0FBQ3hELGtCQUEyQjtBQUUzQixnQ0FBbUM7QUFPbkMsb0JBQWlCO0FBQ2pCLHNCQUF1QztBQUN2QyxVQUFxQjtBQWlDZCxNQUFNLGdCQUE2QztBQUFBLEVBQ3hELG9DQUFvQztBQUFBLElBQ2xDLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxrQ0FBa0M7QUFBQSxJQUNoQyxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0Esa0NBQWtDO0FBQUEsSUFDaEMsS0FB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
