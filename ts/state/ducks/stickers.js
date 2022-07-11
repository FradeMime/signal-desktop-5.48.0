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
var stickers_exports = {};
__export(stickers_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(stickers_exports);
var import_lodash = require("lodash");
var import_Client = __toESM(require("../../sql/Client"));
var import_Stickers = require("../../types/Stickers");
var import_textsecure = require("../../shims/textsecure");
var import_events = require("../../shims/events");
const { getRecentStickers, updateStickerLastUsed, updateStickerPackStatus } = import_Client.default;
const actions = {
  downloadStickerPack,
  clearInstalledStickerPack,
  removeStickerPack,
  stickerAdded,
  stickerPackAdded,
  installStickerPack,
  uninstallStickerPack,
  stickerPackUpdated,
  useSticker
};
function removeStickerPack(id) {
  return {
    type: "stickers/REMOVE_STICKER_PACK",
    payload: id
  };
}
function stickerAdded(payload) {
  return {
    type: "stickers/STICKER_ADDED",
    payload
  };
}
function stickerPackAdded(payload, options) {
  const { status, attemptedStatus } = payload;
  if (status === "error" && attemptedStatus === "installed" && !options?.suppressError) {
    (0, import_events.trigger)("pack-install-failed");
  }
  return {
    type: "stickers/STICKER_PACK_ADDED",
    payload
  };
}
function downloadStickerPack(packId, packKey, options) {
  const { finalStatus } = options || { finalStatus: void 0 };
  (0, import_Stickers.downloadStickerPack)(packId, packKey, { finalStatus });
  return {
    type: "NOOP",
    payload: null
  };
}
function installStickerPack(packId, packKey, options = null) {
  return {
    type: "stickers/INSTALL_STICKER_PACK",
    payload: doInstallStickerPack(packId, packKey, options)
  };
}
async function doInstallStickerPack(packId, packKey, options) {
  const { fromSync } = options || { fromSync: false };
  const status = "installed";
  const timestamp = Date.now();
  await updateStickerPackStatus(packId, status, { timestamp });
  if (!fromSync) {
    (0, import_textsecure.sendStickerPackSync)(packId, packKey, true);
  }
  const recentStickers = await getRecentStickers();
  return {
    packId,
    fromSync,
    status,
    installedAt: timestamp,
    recentStickers: recentStickers.map((item) => ({
      packId: item.packId,
      stickerId: item.id
    }))
  };
}
function uninstallStickerPack(packId, packKey, options = null) {
  return {
    type: "stickers/UNINSTALL_STICKER_PACK",
    payload: doUninstallStickerPack(packId, packKey, options)
  };
}
async function doUninstallStickerPack(packId, packKey, options) {
  const { fromSync } = options || { fromSync: false };
  const status = "downloaded";
  await updateStickerPackStatus(packId, status);
  await (0, import_Stickers.maybeDeletePack)(packId);
  if (!fromSync) {
    (0, import_textsecure.sendStickerPackSync)(packId, packKey, false);
  }
  const recentStickers = await getRecentStickers();
  return {
    packId,
    fromSync,
    status,
    installedAt: void 0,
    recentStickers: recentStickers.map((item) => ({
      packId: item.packId,
      stickerId: item.id
    }))
  };
}
function clearInstalledStickerPack() {
  return { type: "stickers/CLEAR_INSTALLED_STICKER_PACK" };
}
function stickerPackUpdated(packId, patch, options) {
  const { status, attemptedStatus } = patch;
  if (status === "error" && attemptedStatus === "installed" && !options?.suppressError) {
    (0, import_events.trigger)("pack-install-failed");
  }
  return {
    type: "stickers/STICKER_PACK_UPDATED",
    payload: {
      packId,
      patch
    }
  };
}
function useSticker(packId, stickerId, time = Date.now()) {
  return {
    type: "stickers/USE_STICKER",
    payload: doUseSticker(packId, stickerId, time)
  };
}
async function doUseSticker(packId, stickerId, time = Date.now()) {
  await updateStickerLastUsed(packId, stickerId, time);
  return {
    packId,
    stickerId,
    time
  };
}
function getEmptyState() {
  return {
    installedPack: null,
    packs: {},
    recentStickers: [],
    blessedPacks: {}
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === "stickers/STICKER_PACK_ADDED") {
    const { payload } = action;
    const newPack = {
      stickers: {},
      ...payload
    };
    return {
      ...state,
      packs: {
        ...state.packs,
        [payload.id]: newPack
      }
    };
  }
  if (action.type === "stickers/STICKER_ADDED") {
    const { payload } = action;
    const packToUpdate = state.packs[payload.packId];
    return {
      ...state,
      packs: {
        ...state.packs,
        [packToUpdate.id]: {
          ...packToUpdate,
          stickers: {
            ...packToUpdate.stickers,
            [payload.id]: payload
          }
        }
      }
    };
  }
  if (action.type === "stickers/STICKER_PACK_UPDATED") {
    const { payload } = action;
    const packToUpdate = state.packs[payload.packId];
    return {
      ...state,
      packs: {
        ...state.packs,
        [packToUpdate.id]: {
          ...packToUpdate,
          ...payload.patch
        }
      }
    };
  }
  if (action.type === "stickers/INSTALL_STICKER_PACK_FULFILLED" || action.type === "stickers/UNINSTALL_STICKER_PACK_FULFILLED") {
    const { payload } = action;
    const { fromSync, installedAt, packId, status, recentStickers } = payload;
    const { packs } = state;
    const existingPack = packs[packId];
    if (!existingPack) {
      return {
        ...state,
        installedPack: state.installedPack === packId ? null : state.installedPack,
        recentStickers
      };
    }
    const isBlessed = state.blessedPacks[packId];
    const installedPack = !fromSync && !isBlessed ? packId : null;
    return {
      ...state,
      installedPack,
      packs: {
        ...packs,
        [packId]: {
          ...packs[packId],
          status,
          installedAt
        }
      },
      recentStickers
    };
  }
  if (action.type === "stickers/CLEAR_INSTALLED_STICKER_PACK") {
    return {
      ...state,
      installedPack: null
    };
  }
  if (action.type === "stickers/REMOVE_STICKER_PACK") {
    const { payload } = action;
    return {
      ...state,
      packs: (0, import_lodash.omit)(state.packs, payload)
    };
  }
  if (action.type === "stickers/USE_STICKER_FULFILLED") {
    const { payload } = action;
    const { packId, stickerId, time } = payload;
    const { recentStickers, packs } = state;
    const filteredRecents = (0, import_lodash.reject)(recentStickers, (item) => item.packId === packId && item.stickerId === stickerId);
    const pack = packs[packId];
    const sticker = pack.stickers[stickerId];
    return {
      ...state,
      recentStickers: [payload, ...filteredRecents],
      packs: {
        ...state.packs,
        [packId]: {
          ...pack,
          lastUsed: time,
          stickers: {
            ...pack.stickers,
            [stickerId]: {
              ...sticker,
              lastUsed: time
            }
          }
        }
      }
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RpY2tlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERpY3Rpb25hcnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgb21pdCwgcmVqZWN0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHtcbiAgU3RpY2tlclBhY2tTdGF0dXNUeXBlLFxuICBTdGlja2VyVHlwZSBhcyBTdGlja2VyREJUeXBlLFxuICBTdGlja2VyUGFja1R5cGUgYXMgU3RpY2tlclBhY2tEQlR5cGUsXG59IGZyb20gJy4uLy4uL3NxbC9JbnRlcmZhY2UnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgdHlwZSB7IFJlY2VudFN0aWNrZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvU3RpY2tlcnMnO1xuaW1wb3J0IHtcbiAgZG93bmxvYWRTdGlja2VyUGFjayBhcyBleHRlcm5hbERvd25sb2FkU3RpY2tlclBhY2ssXG4gIG1heWJlRGVsZXRlUGFjayxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvU3RpY2tlcnMnO1xuaW1wb3J0IHsgc2VuZFN0aWNrZXJQYWNrU3luYyB9IGZyb20gJy4uLy4uL3NoaW1zL3RleHRzZWN1cmUnO1xuaW1wb3J0IHsgdHJpZ2dlciB9IGZyb20gJy4uLy4uL3NoaW1zL2V2ZW50cyc7XG5cbmltcG9ydCB0eXBlIHsgTm9vcEFjdGlvblR5cGUgfSBmcm9tICcuL25vb3AnO1xuXG5jb25zdCB7IGdldFJlY2VudFN0aWNrZXJzLCB1cGRhdGVTdGlja2VyTGFzdFVzZWQsIHVwZGF0ZVN0aWNrZXJQYWNrU3RhdHVzIH0gPVxuICBkYXRhSW50ZXJmYWNlO1xuXG4vLyBTdGF0ZVxuXG5leHBvcnQgdHlwZSBTdGlja2Vyc1N0YXRlVHlwZSA9IHtcbiAgcmVhZG9ubHkgaW5zdGFsbGVkUGFjazogc3RyaW5nIHwgbnVsbDtcbiAgcmVhZG9ubHkgcGFja3M6IERpY3Rpb25hcnk8U3RpY2tlclBhY2tEQlR5cGU+O1xuICByZWFkb25seSByZWNlbnRTdGlja2VyczogQXJyYXk8UmVjZW50U3RpY2tlclR5cGU+O1xuICByZWFkb25seSBibGVzc2VkUGFja3M6IERpY3Rpb25hcnk8Ym9vbGVhbj47XG59O1xuXG4vLyBUaGVzZSBhcmUgZm9yIHRoZSBSZWFjdCBjb21wb25lbnRzXG5cbmV4cG9ydCB0eXBlIFN0aWNrZXJUeXBlID0ge1xuICByZWFkb25seSBpZDogbnVtYmVyO1xuICByZWFkb25seSBwYWNrSWQ6IHN0cmluZztcbiAgcmVhZG9ubHkgZW1vamk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHVybDogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgU3RpY2tlclBhY2tUeXBlID0gUmVhZG9ubHk8e1xuICBpZDogc3RyaW5nO1xuICBrZXk6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgYXV0aG9yOiBzdHJpbmc7XG4gIGlzQmxlc3NlZDogYm9vbGVhbjtcbiAgY292ZXI/OiBTdGlja2VyVHlwZTtcbiAgbGFzdFVzZWQ/OiBudW1iZXI7XG4gIGF0dGVtcHRlZFN0YXR1cz86ICdkb3dubG9hZGVkJyB8ICdpbnN0YWxsZWQnIHwgJ2VwaGVtZXJhbCc7XG4gIHN0YXR1czogU3RpY2tlclBhY2tTdGF0dXNUeXBlO1xuICBzdGlja2VyczogQXJyYXk8U3RpY2tlclR5cGU+O1xuICBzdGlja2VyQ291bnQ6IG51bWJlcjtcbn0+O1xuXG4vLyBBY3Rpb25zXG5cbnR5cGUgU3RpY2tlclBhY2tBZGRlZEFjdGlvbiA9IHtcbiAgdHlwZTogJ3N0aWNrZXJzL1NUSUNLRVJfUEFDS19BRERFRCc7XG4gIHBheWxvYWQ6IFN0aWNrZXJQYWNrREJUeXBlO1xufTtcblxudHlwZSBTdGlja2VyQWRkZWRBY3Rpb24gPSB7XG4gIHR5cGU6ICdzdGlja2Vycy9TVElDS0VSX0FEREVEJztcbiAgcGF5bG9hZDogU3RpY2tlckRCVHlwZTtcbn07XG5cbnR5cGUgSW5zdGFsbFN0aWNrZXJQYWNrUGF5bG9hZFR5cGUgPSB7XG4gIHBhY2tJZDogc3RyaW5nO1xuICBmcm9tU3luYzogYm9vbGVhbjtcbiAgc3RhdHVzOiAnaW5zdGFsbGVkJztcbiAgaW5zdGFsbGVkQXQ6IG51bWJlcjtcbiAgcmVjZW50U3RpY2tlcnM6IEFycmF5PFJlY2VudFN0aWNrZXJUeXBlPjtcbn07XG50eXBlIEluc3RhbGxTdGlja2VyUGFja0FjdGlvbiA9IHtcbiAgdHlwZTogJ3N0aWNrZXJzL0lOU1RBTExfU1RJQ0tFUl9QQUNLJztcbiAgcGF5bG9hZDogUHJvbWlzZTxJbnN0YWxsU3RpY2tlclBhY2tQYXlsb2FkVHlwZT47XG59O1xudHlwZSBJbnN0YWxsU3RpY2tlclBhY2tGdWxmaWxsZWRBY3Rpb24gPSB7XG4gIHR5cGU6ICdzdGlja2Vycy9JTlNUQUxMX1NUSUNLRVJfUEFDS19GVUxGSUxMRUQnO1xuICBwYXlsb2FkOiBJbnN0YWxsU3RpY2tlclBhY2tQYXlsb2FkVHlwZTtcbn07XG50eXBlIENsZWFySW5zdGFsbGVkU3RpY2tlclBhY2tBY3Rpb24gPSB7XG4gIHR5cGU6ICdzdGlja2Vycy9DTEVBUl9JTlNUQUxMRURfU1RJQ0tFUl9QQUNLJztcbn07XG5cbnR5cGUgVW5pbnN0YWxsU3RpY2tlclBhY2tQYXlsb2FkVHlwZSA9IHtcbiAgcGFja0lkOiBzdHJpbmc7XG4gIGZyb21TeW5jOiBib29sZWFuO1xuICBzdGF0dXM6ICdkb3dubG9hZGVkJztcbiAgaW5zdGFsbGVkQXQ/OiB1bmRlZmluZWQ7XG4gIHJlY2VudFN0aWNrZXJzOiBBcnJheTxSZWNlbnRTdGlja2VyVHlwZT47XG59O1xudHlwZSBVbmluc3RhbGxTdGlja2VyUGFja0FjdGlvbiA9IHtcbiAgdHlwZTogJ3N0aWNrZXJzL1VOSU5TVEFMTF9TVElDS0VSX1BBQ0snO1xuICBwYXlsb2FkOiBQcm9taXNlPFVuaW5zdGFsbFN0aWNrZXJQYWNrUGF5bG9hZFR5cGU+O1xufTtcbnR5cGUgVW5pbnN0YWxsU3RpY2tlclBhY2tGdWxmaWxsZWRBY3Rpb24gPSB7XG4gIHR5cGU6ICdzdGlja2Vycy9VTklOU1RBTExfU1RJQ0tFUl9QQUNLX0ZVTEZJTExFRCc7XG4gIHBheWxvYWQ6IFVuaW5zdGFsbFN0aWNrZXJQYWNrUGF5bG9hZFR5cGU7XG59O1xuXG50eXBlIFN0aWNrZXJQYWNrVXBkYXRlZEFjdGlvbiA9IHtcbiAgdHlwZTogJ3N0aWNrZXJzL1NUSUNLRVJfUEFDS19VUERBVEVEJztcbiAgcGF5bG9hZDogeyBwYWNrSWQ6IHN0cmluZzsgcGF0Y2g6IFBhcnRpYWw8U3RpY2tlclBhY2tEQlR5cGU+IH07XG59O1xuXG50eXBlIFN0aWNrZXJQYWNrUmVtb3ZlZEFjdGlvbiA9IHtcbiAgdHlwZTogJ3N0aWNrZXJzL1JFTU9WRV9TVElDS0VSX1BBQ0snO1xuICBwYXlsb2FkOiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZVN0aWNrZXJQYXlsb2FkVHlwZSA9IHtcbiAgcGFja0lkOiBzdHJpbmc7XG4gIHN0aWNrZXJJZDogbnVtYmVyO1xuICB0aW1lOiBudW1iZXI7XG59O1xudHlwZSBVc2VTdGlja2VyQWN0aW9uID0ge1xuICB0eXBlOiAnc3RpY2tlcnMvVVNFX1NUSUNLRVInO1xuICBwYXlsb2FkOiBQcm9taXNlPFVzZVN0aWNrZXJQYXlsb2FkVHlwZT47XG59O1xudHlwZSBVc2VTdGlja2VyRnVsZmlsbGVkQWN0aW9uID0ge1xuICB0eXBlOiAnc3RpY2tlcnMvVVNFX1NUSUNLRVJfRlVMRklMTEVEJztcbiAgcGF5bG9hZDogVXNlU3RpY2tlclBheWxvYWRUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgU3RpY2tlcnNBY3Rpb25UeXBlID1cbiAgfCBDbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrQWN0aW9uXG4gIHwgU3RpY2tlckFkZGVkQWN0aW9uXG4gIHwgU3RpY2tlclBhY2tBZGRlZEFjdGlvblxuICB8IEluc3RhbGxTdGlja2VyUGFja0Z1bGZpbGxlZEFjdGlvblxuICB8IFVuaW5zdGFsbFN0aWNrZXJQYWNrRnVsZmlsbGVkQWN0aW9uXG4gIHwgU3RpY2tlclBhY2tVcGRhdGVkQWN0aW9uXG4gIHwgU3RpY2tlclBhY2tSZW1vdmVkQWN0aW9uXG4gIHwgVXNlU3RpY2tlckZ1bGZpbGxlZEFjdGlvblxuICB8IE5vb3BBY3Rpb25UeXBlO1xuXG4vLyBBY3Rpb24gQ3JlYXRvcnNcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gIGRvd25sb2FkU3RpY2tlclBhY2ssXG4gIGNsZWFySW5zdGFsbGVkU3RpY2tlclBhY2ssXG4gIHJlbW92ZVN0aWNrZXJQYWNrLFxuICBzdGlja2VyQWRkZWQsXG4gIHN0aWNrZXJQYWNrQWRkZWQsXG4gIGluc3RhbGxTdGlja2VyUGFjayxcbiAgdW5pbnN0YWxsU3RpY2tlclBhY2ssXG4gIHN0aWNrZXJQYWNrVXBkYXRlZCxcbiAgdXNlU3RpY2tlcixcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZVN0aWNrZXJQYWNrKGlkOiBzdHJpbmcpOiBTdGlja2VyUGFja1JlbW92ZWRBY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdzdGlja2Vycy9SRU1PVkVfU1RJQ0tFUl9QQUNLJyxcbiAgICBwYXlsb2FkOiBpZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RpY2tlckFkZGVkKHBheWxvYWQ6IFN0aWNrZXJEQlR5cGUpOiBTdGlja2VyQWRkZWRBY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdzdGlja2Vycy9TVElDS0VSX0FEREVEJyxcbiAgICBwYXlsb2FkLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzdGlja2VyUGFja0FkZGVkKFxuICBwYXlsb2FkOiBTdGlja2VyUGFja0RCVHlwZSxcbiAgb3B0aW9ucz86IHsgc3VwcHJlc3NFcnJvcj86IGJvb2xlYW4gfVxuKTogU3RpY2tlclBhY2tBZGRlZEFjdGlvbiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBhdHRlbXB0ZWRTdGF0dXMgfSA9IHBheWxvYWQ7XG5cbiAgLy8gV2UgZG8gdGhpcyB0byB0cmlnZ2VyIGEgdG9hc3QsIHdoaWNoIGlzIHN0aWxsIGRvbmUgdmlhIEJhY2tib25lXG4gIGlmIChcbiAgICBzdGF0dXMgPT09ICdlcnJvcicgJiZcbiAgICBhdHRlbXB0ZWRTdGF0dXMgPT09ICdpbnN0YWxsZWQnICYmXG4gICAgIW9wdGlvbnM/LnN1cHByZXNzRXJyb3JcbiAgKSB7XG4gICAgdHJpZ2dlcigncGFjay1pbnN0YWxsLWZhaWxlZCcpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnc3RpY2tlcnMvU1RJQ0tFUl9QQUNLX0FEREVEJyxcbiAgICBwYXlsb2FkLFxuICB9O1xufVxuXG5mdW5jdGlvbiBkb3dubG9hZFN0aWNrZXJQYWNrKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICBvcHRpb25zPzogeyBmaW5hbFN0YXR1cz86ICdpbnN0YWxsZWQnIHwgJ2Rvd25sb2FkZWQnIH1cbik6IE5vb3BBY3Rpb25UeXBlIHtcbiAgY29uc3QgeyBmaW5hbFN0YXR1cyB9ID0gb3B0aW9ucyB8fCB7IGZpbmFsU3RhdHVzOiB1bmRlZmluZWQgfTtcblxuICAvLyBXZSdyZSBqdXN0IGtpY2tpbmcgdGhpcyBvZmYsIHNpbmNlIGl0IHdpbGwgZ2VuZXJhdGUgbW9yZSByZWR1eCBldmVudHNcbiAgZXh0ZXJuYWxEb3dubG9hZFN0aWNrZXJQYWNrKHBhY2tJZCwgcGFja0tleSwgeyBmaW5hbFN0YXR1cyB9KTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdOT09QJyxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnN0YWxsU3RpY2tlclBhY2soXG4gIHBhY2tJZDogc3RyaW5nLFxuICBwYWNrS2V5OiBzdHJpbmcsXG4gIG9wdGlvbnM6IHsgZnJvbVN5bmM6IGJvb2xlYW4gfSB8IG51bGwgPSBudWxsXG4pOiBJbnN0YWxsU3RpY2tlclBhY2tBY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdzdGlja2Vycy9JTlNUQUxMX1NUSUNLRVJfUEFDSycsXG4gICAgcGF5bG9hZDogZG9JbnN0YWxsU3RpY2tlclBhY2socGFja0lkLCBwYWNrS2V5LCBvcHRpb25zKSxcbiAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRvSW5zdGFsbFN0aWNrZXJQYWNrKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICBvcHRpb25zOiB7IGZyb21TeW5jOiBib29sZWFuIH0gfCBudWxsXG4pOiBQcm9taXNlPEluc3RhbGxTdGlja2VyUGFja1BheWxvYWRUeXBlPiB7XG4gIGNvbnN0IHsgZnJvbVN5bmMgfSA9IG9wdGlvbnMgfHwgeyBmcm9tU3luYzogZmFsc2UgfTtcblxuICBjb25zdCBzdGF0dXMgPSAnaW5zdGFsbGVkJztcbiAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgYXdhaXQgdXBkYXRlU3RpY2tlclBhY2tTdGF0dXMocGFja0lkLCBzdGF0dXMsIHsgdGltZXN0YW1wIH0pO1xuXG4gIGlmICghZnJvbVN5bmMpIHtcbiAgICAvLyBLaWNrIHRoaXMgb2ZmLCBidXQgZG9uJ3Qgd2FpdCBmb3IgaXRcbiAgICBzZW5kU3RpY2tlclBhY2tTeW5jKHBhY2tJZCwgcGFja0tleSwgdHJ1ZSk7XG4gIH1cblxuICBjb25zdCByZWNlbnRTdGlja2VycyA9IGF3YWl0IGdldFJlY2VudFN0aWNrZXJzKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYWNrSWQsXG4gICAgZnJvbVN5bmMsXG4gICAgc3RhdHVzLFxuICAgIGluc3RhbGxlZEF0OiB0aW1lc3RhbXAsXG4gICAgcmVjZW50U3RpY2tlcnM6IHJlY2VudFN0aWNrZXJzLm1hcChpdGVtID0+ICh7XG4gICAgICBwYWNrSWQ6IGl0ZW0ucGFja0lkLFxuICAgICAgc3RpY2tlcklkOiBpdGVtLmlkLFxuICAgIH0pKSxcbiAgfTtcbn1cbmZ1bmN0aW9uIHVuaW5zdGFsbFN0aWNrZXJQYWNrKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICBvcHRpb25zOiB7IGZyb21TeW5jOiBib29sZWFuIH0gfCBudWxsID0gbnVsbFxuKTogVW5pbnN0YWxsU3RpY2tlclBhY2tBY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdzdGlja2Vycy9VTklOU1RBTExfU1RJQ0tFUl9QQUNLJyxcbiAgICBwYXlsb2FkOiBkb1VuaW5zdGFsbFN0aWNrZXJQYWNrKHBhY2tJZCwgcGFja0tleSwgb3B0aW9ucyksXG4gIH07XG59XG5hc3luYyBmdW5jdGlvbiBkb1VuaW5zdGFsbFN0aWNrZXJQYWNrKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICBvcHRpb25zOiB7IGZyb21TeW5jOiBib29sZWFuIH0gfCBudWxsXG4pOiBQcm9taXNlPFVuaW5zdGFsbFN0aWNrZXJQYWNrUGF5bG9hZFR5cGU+IHtcbiAgY29uc3QgeyBmcm9tU3luYyB9ID0gb3B0aW9ucyB8fCB7IGZyb21TeW5jOiBmYWxzZSB9O1xuXG4gIGNvbnN0IHN0YXR1cyA9ICdkb3dubG9hZGVkJztcbiAgYXdhaXQgdXBkYXRlU3RpY2tlclBhY2tTdGF0dXMocGFja0lkLCBzdGF0dXMpO1xuXG4gIC8vIElmIHRoZXJlIGFyZSBubyBtb3JlIHJlZmVyZW5jZXMsIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gIGF3YWl0IG1heWJlRGVsZXRlUGFjayhwYWNrSWQpO1xuXG4gIGlmICghZnJvbVN5bmMpIHtcbiAgICAvLyBLaWNrIHRoaXMgb2ZmLCBidXQgZG9uJ3Qgd2FpdCBmb3IgaXRcbiAgICBzZW5kU3RpY2tlclBhY2tTeW5jKHBhY2tJZCwgcGFja0tleSwgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgcmVjZW50U3RpY2tlcnMgPSBhd2FpdCBnZXRSZWNlbnRTdGlja2VycygpO1xuXG4gIHJldHVybiB7XG4gICAgcGFja0lkLFxuICAgIGZyb21TeW5jLFxuICAgIHN0YXR1cyxcbiAgICBpbnN0YWxsZWRBdDogdW5kZWZpbmVkLFxuICAgIHJlY2VudFN0aWNrZXJzOiByZWNlbnRTdGlja2Vycy5tYXAoaXRlbSA9PiAoe1xuICAgICAgcGFja0lkOiBpdGVtLnBhY2tJZCxcbiAgICAgIHN0aWNrZXJJZDogaXRlbS5pZCxcbiAgICB9KSksXG4gIH07XG59XG5mdW5jdGlvbiBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrKCk6IENsZWFySW5zdGFsbGVkU3RpY2tlclBhY2tBY3Rpb24ge1xuICByZXR1cm4geyB0eXBlOiAnc3RpY2tlcnMvQ0xFQVJfSU5TVEFMTEVEX1NUSUNLRVJfUEFDSycgfTtcbn1cblxuZnVuY3Rpb24gc3RpY2tlclBhY2tVcGRhdGVkKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGF0Y2g6IFBhcnRpYWw8U3RpY2tlclBhY2tEQlR5cGU+LFxuICBvcHRpb25zPzogeyBzdXBwcmVzc0Vycm9yPzogYm9vbGVhbiB9XG4pOiBTdGlja2VyUGFja1VwZGF0ZWRBY3Rpb24ge1xuICBjb25zdCB7IHN0YXR1cywgYXR0ZW1wdGVkU3RhdHVzIH0gPSBwYXRjaDtcblxuICAvLyBXZSBkbyB0aGlzIHRvIHRyaWdnZXIgYSB0b2FzdCwgd2hpY2ggaXMgc3RpbGwgZG9uZSB2aWEgQmFja2JvbmVcbiAgaWYgKFxuICAgIHN0YXR1cyA9PT0gJ2Vycm9yJyAmJlxuICAgIGF0dGVtcHRlZFN0YXR1cyA9PT0gJ2luc3RhbGxlZCcgJiZcbiAgICAhb3B0aW9ucz8uc3VwcHJlc3NFcnJvclxuICApIHtcbiAgICB0cmlnZ2VyKCdwYWNrLWluc3RhbGwtZmFpbGVkJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdzdGlja2Vycy9TVElDS0VSX1BBQ0tfVVBEQVRFRCcsXG4gICAgcGF5bG9hZDoge1xuICAgICAgcGFja0lkLFxuICAgICAgcGF0Y2gsXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlU3RpY2tlcihcbiAgcGFja0lkOiBzdHJpbmcsXG4gIHN0aWNrZXJJZDogbnVtYmVyLFxuICB0aW1lID0gRGF0ZS5ub3coKVxuKTogVXNlU3RpY2tlckFjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ3N0aWNrZXJzL1VTRV9TVElDS0VSJyxcbiAgICBwYXlsb2FkOiBkb1VzZVN0aWNrZXIocGFja0lkLCBzdGlja2VySWQsIHRpbWUpLFxuICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gZG9Vc2VTdGlja2VyKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgc3RpY2tlcklkOiBudW1iZXIsXG4gIHRpbWUgPSBEYXRlLm5vdygpXG4pOiBQcm9taXNlPFVzZVN0aWNrZXJQYXlsb2FkVHlwZT4ge1xuICBhd2FpdCB1cGRhdGVTdGlja2VyTGFzdFVzZWQocGFja0lkLCBzdGlja2VySWQsIHRpbWUpO1xuXG4gIHJldHVybiB7XG4gICAgcGFja0lkLFxuICAgIHN0aWNrZXJJZCxcbiAgICB0aW1lLFxuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IFN0aWNrZXJzU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBpbnN0YWxsZWRQYWNrOiBudWxsLFxuICAgIHBhY2tzOiB7fSxcbiAgICByZWNlbnRTdGlja2VyczogW10sXG4gICAgYmxlc3NlZFBhY2tzOiB7fSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gIHN0YXRlOiBSZWFkb25seTxTdGlja2Vyc1N0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8U3RpY2tlcnNBY3Rpb25UeXBlPlxuKTogU3RpY2tlcnNTdGF0ZVR5cGUge1xuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdzdGlja2Vycy9TVElDS0VSX1BBQ0tfQURERUQnKSB7XG4gICAgLy8gdHMgY29tcGxhaW5zIGR1ZSB0byBgc3RpY2tlcnM6IHt9YCBiZWluZyBvdmVycmlkZGVuIGJ5IHRoZSBwYXlsb2FkXG4gICAgLy8gYnV0IHdpdGhvdXQgZnVsbCBjb25maWRlbmNlIHRoYXQgdGhhdCdzIHRoZSBjYXNlLCBgYW55YCBhbmQgaWdub3JlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbiBhcyBhbnk7XG4gICAgY29uc3QgbmV3UGFjayA9IHtcbiAgICAgIHN0aWNrZXJzOiB7fSxcbiAgICAgIC4uLnBheWxvYWQsXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHBhY2tzOiB7XG4gICAgICAgIC4uLnN0YXRlLnBhY2tzLFxuICAgICAgICBbcGF5bG9hZC5pZF06IG5ld1BhY2ssXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdzdGlja2Vycy9TVElDS0VSX0FEREVEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHBhY2tUb1VwZGF0ZSA9IHN0YXRlLnBhY2tzW3BheWxvYWQucGFja0lkXTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHBhY2tzOiB7XG4gICAgICAgIC4uLnN0YXRlLnBhY2tzLFxuICAgICAgICBbcGFja1RvVXBkYXRlLmlkXToge1xuICAgICAgICAgIC4uLnBhY2tUb1VwZGF0ZSxcbiAgICAgICAgICBzdGlja2Vyczoge1xuICAgICAgICAgICAgLi4ucGFja1RvVXBkYXRlLnN0aWNrZXJzLFxuICAgICAgICAgICAgW3BheWxvYWQuaWRdOiBwYXlsb2FkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdzdGlja2Vycy9TVElDS0VSX1BBQ0tfVVBEQVRFRCcpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCBwYWNrVG9VcGRhdGUgPSBzdGF0ZS5wYWNrc1twYXlsb2FkLnBhY2tJZF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBwYWNrczoge1xuICAgICAgICAuLi5zdGF0ZS5wYWNrcyxcbiAgICAgICAgW3BhY2tUb1VwZGF0ZS5pZF06IHtcbiAgICAgICAgICAuLi5wYWNrVG9VcGRhdGUsXG4gICAgICAgICAgLi4ucGF5bG9hZC5wYXRjaCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChcbiAgICBhY3Rpb24udHlwZSA9PT0gJ3N0aWNrZXJzL0lOU1RBTExfU1RJQ0tFUl9QQUNLX0ZVTEZJTExFRCcgfHxcbiAgICBhY3Rpb24udHlwZSA9PT0gJ3N0aWNrZXJzL1VOSU5TVEFMTF9TVElDS0VSX1BBQ0tfRlVMRklMTEVEJ1xuICApIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IGZyb21TeW5jLCBpbnN0YWxsZWRBdCwgcGFja0lkLCBzdGF0dXMsIHJlY2VudFN0aWNrZXJzIH0gPSBwYXlsb2FkO1xuICAgIGNvbnN0IHsgcGFja3MgfSA9IHN0YXRlO1xuICAgIGNvbnN0IGV4aXN0aW5nUGFjayA9IHBhY2tzW3BhY2tJZF07XG5cbiAgICAvLyBBIHBhY2sgbWlnaHQgYmUgZGVsZXRlZCBhcyBwYXJ0IG9mIHRoZSB1bmluc3RhbGwgcHJvY2Vzc1xuICAgIGlmICghZXhpc3RpbmdQYWNrKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW5zdGFsbGVkUGFjazpcbiAgICAgICAgICBzdGF0ZS5pbnN0YWxsZWRQYWNrID09PSBwYWNrSWQgPyBudWxsIDogc3RhdGUuaW5zdGFsbGVkUGFjayxcbiAgICAgICAgcmVjZW50U3RpY2tlcnMsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGlzQmxlc3NlZCA9IHN0YXRlLmJsZXNzZWRQYWNrc1twYWNrSWRdO1xuICAgIGNvbnN0IGluc3RhbGxlZFBhY2sgPSAhZnJvbVN5bmMgJiYgIWlzQmxlc3NlZCA/IHBhY2tJZCA6IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBpbnN0YWxsZWRQYWNrLFxuICAgICAgcGFja3M6IHtcbiAgICAgICAgLi4ucGFja3MsXG4gICAgICAgIFtwYWNrSWRdOiB7XG4gICAgICAgICAgLi4ucGFja3NbcGFja0lkXSxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgaW5zdGFsbGVkQXQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVjZW50U3RpY2tlcnMsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ3N0aWNrZXJzL0NMRUFSX0lOU1RBTExFRF9TVElDS0VSX1BBQ0snKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgaW5zdGFsbGVkUGFjazogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnc3RpY2tlcnMvUkVNT1ZFX1NUSUNLRVJfUEFDSycpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHBhY2tzOiBvbWl0KHN0YXRlLnBhY2tzLCBwYXlsb2FkKSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnc3RpY2tlcnMvVVNFX1NUSUNLRVJfRlVMRklMTEVEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgcGFja0lkLCBzdGlja2VySWQsIHRpbWUgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgeyByZWNlbnRTdGlja2VycywgcGFja3MgfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgZmlsdGVyZWRSZWNlbnRzID0gcmVqZWN0KFxuICAgICAgcmVjZW50U3RpY2tlcnMsXG4gICAgICBpdGVtID0+IGl0ZW0ucGFja0lkID09PSBwYWNrSWQgJiYgaXRlbS5zdGlja2VySWQgPT09IHN0aWNrZXJJZFxuICAgICk7XG4gICAgY29uc3QgcGFjayA9IHBhY2tzW3BhY2tJZF07XG4gICAgY29uc3Qgc3RpY2tlciA9IHBhY2suc3RpY2tlcnNbc3RpY2tlcklkXTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHJlY2VudFN0aWNrZXJzOiBbcGF5bG9hZCwgLi4uZmlsdGVyZWRSZWNlbnRzXSxcbiAgICAgIHBhY2tzOiB7XG4gICAgICAgIC4uLnN0YXRlLnBhY2tzLFxuICAgICAgICBbcGFja0lkXToge1xuICAgICAgICAgIC4uLnBhY2ssXG4gICAgICAgICAgbGFzdFVzZWQ6IHRpbWUsXG4gICAgICAgICAgc3RpY2tlcnM6IHtcbiAgICAgICAgICAgIC4uLnBhY2suc3RpY2tlcnMsXG4gICAgICAgICAgICBbc3RpY2tlcklkXToge1xuICAgICAgICAgICAgICAuLi5zdGlja2VyLFxuICAgICAgICAgICAgICBsYXN0VXNlZDogdGltZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsb0JBQTZCO0FBTTdCLG9CQUEwQjtBQUUxQixzQkFHTztBQUNQLHdCQUFvQztBQUNwQyxvQkFBd0I7QUFJeEIsTUFBTSxFQUFFLG1CQUFtQix1QkFBdUIsNEJBQ2hEO0FBc0hLLE1BQU0sVUFBVTtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLDJCQUEyQixJQUFzQztBQUMvRCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUNGO0FBTFMsQUFPVCxzQkFBc0IsU0FBNEM7QUFDaEUsU0FBTztBQUFBLElB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
