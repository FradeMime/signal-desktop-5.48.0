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
var badges_exports = {};
__export(badges_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(badges_exports);
var import_lodash = require("lodash");
var import_getOwn = require("../../util/getOwn");
var import_badgeImageFileDownloader = require("../../badges/badgeImageFileDownloader");
const IMAGE_FILE_DOWNLOADED = "badges/IMAGE_FILE_DOWNLOADED";
const UPDATE_OR_CREATE = "badges/UPDATE_OR_CREATE";
const actions = {
  badgeImageFileDownloaded,
  updateOrCreate
};
function badgeImageFileDownloaded(url, localPath) {
  return {
    type: IMAGE_FILE_DOWNLOADED,
    payload: { url, localPath }
  };
}
function updateOrCreate(badges) {
  return async (dispatch) => {
    await window.Signal.Data.updateOrCreateBadges(badges);
    dispatch({
      type: UPDATE_OR_CREATE,
      payload: badges
    });
    import_badgeImageFileDownloader.badgeImageFileDownloader.checkForFilesToDownload();
  };
}
function getEmptyState() {
  return { byId: {} };
}
function reducer(state = getEmptyState(), action) {
  switch (action.type) {
    case IMAGE_FILE_DOWNLOADED: {
      const { url, localPath } = action.payload;
      return {
        ...state,
        byId: (0, import_lodash.mapValues)(state.byId, (badge) => ({
          ...badge,
          images: badge.images.map((image) => (0, import_lodash.mapValues)(image, (imageFile) => imageFile.url === url ? {
            ...imageFile,
            localPath
          } : imageFile))
        }))
      };
    }
    case UPDATE_OR_CREATE: {
      const newById = { ...state.byId };
      action.payload.forEach((badge) => {
        const existingBadge = (0, import_getOwn.getOwn)(newById, badge.id);
        const oldLocalPaths = /* @__PURE__ */ new Map();
        existingBadge?.images.forEach((image) => {
          Object.values(image).forEach(({ localPath, url }) => {
            if (localPath) {
              oldLocalPaths.set(url, localPath);
            }
          });
        });
        const images = badge.images.map((image) => (0, import_lodash.mapValues)(image, (imageFile) => ({
          ...imageFile,
          localPath: imageFile.localPath || oldLocalPaths.get(imageFile.url)
        })));
        if (existingBadge) {
          newById[badge.id] = {
            ...existingBadge,
            category: badge.category,
            name: badge.name,
            descriptionTemplate: badge.descriptionTemplate,
            images
          };
        } else {
          newById[badge.id] = { ...badge, images };
        }
      });
      return {
        ...state,
        byId: newById
      };
    }
    default:
      return state;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFkZ2VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgYXMgUm9vdFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUsIEJhZGdlSW1hZ2VUeXBlIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL3R5cGVzJztcbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0T3duJztcbmltcG9ydCB7IGJhZGdlSW1hZ2VGaWxlRG93bmxvYWRlciB9IGZyb20gJy4uLy4uL2JhZGdlcy9iYWRnZUltYWdlRmlsZURvd25sb2FkZXInO1xuXG4vKipcbiAqIFRoaXMgZHVjayBkZWFscyB3aXRoIGJhZGdlIGRhdGEuIFNvbWUgYXNzdW1wdGlvbnMgaXQgbWFrZXM6XG4gKlxuICogLSBJdCBzaG91bGQgYWx3YXlzIGJlIFwiYmVoaW5kXCIgd2hhdCdzIGluIHRoZSBkYXRhYmFzZS4gRm9yIGV4YW1wbGUsIHRoZSBzdGF0ZSBzaG91bGRcbiAqICAgbmV2ZXIgY29udGFpbiBiYWRnZXMgdGhhdCBhcmVuJ3Qgb24gZGlzay5cbiAqXG4gKiAtIFRoZXJlIGFyZSB1bmRlciAxMDAgdW5pcXVlIGJhZGdlcy4gKEFzIG9mIHRvZGF5LCB0aGVyZSBhcmUgfjUuKSBUaGUgcGVyZm9ybWFuY2VcbiAqICAgc2hvdWxkIGJlIG9rYXkgaWYgdGhlcmUgYXJlIG1vcmUgdGhhbiAxMDAsIGJ1dCBpdCdzIG5vdCBvcHRpbWl6ZWQgZm9yIHRoYXQuIFRoaXNcbiAqICAgbWVhbnMgd2UgbG9hZCBhbGwgYmFkZ2VzIGludG8gbWVtb3J5LCBkb3dubG9hZCBpbWFnZSBmaWxlcyBhcyBzb29uIGFzIHdlIGxlYXJuIGFib3V0XG4gKiAgIHRoZW0sIGV0Yy5cbiAqL1xuXG4vLyBTdGF0ZVxuXG5leHBvcnQgdHlwZSBCYWRnZXNTdGF0ZVR5cGUgPSB7XG4gIGJ5SWQ6IFJlY29yZDxzdHJpbmcsIEJhZGdlVHlwZT47XG59O1xuXG4vLyBBY3Rpb25zXG5cbmNvbnN0IElNQUdFX0ZJTEVfRE9XTkxPQURFRCA9ICdiYWRnZXMvSU1BR0VfRklMRV9ET1dOTE9BREVEJztcbmNvbnN0IFVQREFURV9PUl9DUkVBVEUgPSAnYmFkZ2VzL1VQREFURV9PUl9DUkVBVEUnO1xuXG50eXBlIEltYWdlRmlsZURvd25sb2FkZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgSU1BR0VfRklMRV9ET1dOTE9BREVEO1xuICBwYXlsb2FkOiB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgbG9jYWxQYXRoOiBzdHJpbmc7XG4gIH07XG59O1xuXG50eXBlIFVwZGF0ZU9yQ3JlYXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIFVQREFURV9PUl9DUkVBVEU7XG4gIHBheWxvYWQ6IFJlYWRvbmx5QXJyYXk8QmFkZ2VUeXBlPjtcbn07XG5cbi8vIEFjdGlvbiBjcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVkLFxuICB1cGRhdGVPckNyZWF0ZSxcbn07XG5cbmZ1bmN0aW9uIGJhZGdlSW1hZ2VGaWxlRG93bmxvYWRlZChcbiAgdXJsOiBzdHJpbmcsXG4gIGxvY2FsUGF0aDogc3RyaW5nXG4pOiBJbWFnZUZpbGVEb3dubG9hZGVkQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogSU1BR0VfRklMRV9ET1dOTE9BREVELFxuICAgIHBheWxvYWQ6IHsgdXJsLCBsb2NhbFBhdGggfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlT3JDcmVhdGUoXG4gIGJhZGdlczogUmVhZG9ubHlBcnJheTxCYWRnZVR5cGU+XG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBVcGRhdGVPckNyZWF0ZUFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICAvLyBUaGVyZSBpcyBhIHJhY2UgY29uZGl0aW9uIGhlcmU6IGlmIHdlIHNhdmUgdGhlIGJhZGdlcyBidXQgd2UgZmFpbCB0byBraWNrIG9mZiBhXG4gICAgLy8gICBjaGVjayAoZS5nLiwgZHVlIHRvIGEgY3Jhc2gpLCB3ZSB3b24ndCBkb3dubG9hZCBpdHMgaW1hZ2UgZmlsZXMuIEluIHRoZSB1bmxpa2VseVxuICAgIC8vICAgZXZlbnQgdGhhdCB0aGlzIGhhcHBlbnMsIHdlJ2xsIHJlcGFpciBpdCB0aGUgbmV4dCB0aW1lIHdlIGNoZWNrIGZvciB1bmRvd25sb2FkZWRcbiAgICAvLyAgIGltYWdlIGZpbGVzLlxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVPckNyZWF0ZUJhZGdlcyhiYWRnZXMpO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVVBEQVRFX09SX0NSRUFURSxcbiAgICAgIHBheWxvYWQ6IGJhZGdlcyxcbiAgICB9KTtcblxuICAgIGJhZGdlSW1hZ2VGaWxlRG93bmxvYWRlci5jaGVja0ZvckZpbGVzVG9Eb3dubG9hZCgpO1xuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IEJhZGdlc1N0YXRlVHlwZSB7XG4gIHJldHVybiB7IGJ5SWQ6IHt9IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8QmFkZ2VzU3RhdGVUeXBlPiA9IGdldEVtcHR5U3RhdGUoKSxcbiAgYWN0aW9uOiBSZWFkb25seTxJbWFnZUZpbGVEb3dubG9hZGVkQWN0aW9uVHlwZSB8IFVwZGF0ZU9yQ3JlYXRlQWN0aW9uVHlwZT5cbik6IEJhZGdlc1N0YXRlVHlwZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBUaGlzIHNob3VsZCBtYXRjaCB0aGUgZGF0YWJhc2UgbG9naWMuXG4gICAgY2FzZSBJTUFHRV9GSUxFX0RPV05MT0FERUQ6IHtcbiAgICAgIGNvbnN0IHsgdXJsLCBsb2NhbFBhdGggfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGJ5SWQ6IG1hcFZhbHVlcyhzdGF0ZS5ieUlkLCBiYWRnZSA9PiAoe1xuICAgICAgICAgIC4uLmJhZGdlLFxuICAgICAgICAgIGltYWdlczogYmFkZ2UuaW1hZ2VzLm1hcChpbWFnZSA9PlxuICAgICAgICAgICAgbWFwVmFsdWVzKGltYWdlLCBpbWFnZUZpbGUgPT5cbiAgICAgICAgICAgICAgaW1hZ2VGaWxlLnVybCA9PT0gdXJsXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmltYWdlRmlsZSxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxQYXRoLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogaW1hZ2VGaWxlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgfSkpLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gVGhpcyBzaG91bGQgbWF0Y2ggdGhlIGRhdGFiYXNlIGxvZ2ljLlxuICAgIGNhc2UgVVBEQVRFX09SX0NSRUFURToge1xuICAgICAgY29uc3QgbmV3QnlJZCA9IHsgLi4uc3RhdGUuYnlJZCB9O1xuICAgICAgYWN0aW9uLnBheWxvYWQuZm9yRWFjaChiYWRnZSA9PiB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQmFkZ2UgPSBnZXRPd24obmV3QnlJZCwgYmFkZ2UuaWQpO1xuXG4gICAgICAgIGNvbnN0IG9sZExvY2FsUGF0aHMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgICBleGlzdGluZ0JhZGdlPy5pbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhpbWFnZSkuZm9yRWFjaCgoeyBsb2NhbFBhdGgsIHVybCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYWxQYXRoKSB7XG4gICAgICAgICAgICAgIG9sZExvY2FsUGF0aHMuc2V0KHVybCwgbG9jYWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW1hZ2VzOiBSZWFkb25seUFycmF5PEJhZGdlSW1hZ2VUeXBlPiA9IGJhZGdlLmltYWdlcy5tYXAoaW1hZ2UgPT5cbiAgICAgICAgICBtYXBWYWx1ZXMoaW1hZ2UsIGltYWdlRmlsZSA9PiAoe1xuICAgICAgICAgICAgLi4uaW1hZ2VGaWxlLFxuICAgICAgICAgICAgbG9jYWxQYXRoOiBpbWFnZUZpbGUubG9jYWxQYXRoIHx8IG9sZExvY2FsUGF0aHMuZ2V0KGltYWdlRmlsZS51cmwpLFxuICAgICAgICAgIH0pKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChleGlzdGluZ0JhZGdlKSB7XG4gICAgICAgICAgbmV3QnlJZFtiYWRnZS5pZF0gPSB7XG4gICAgICAgICAgICAuLi5leGlzdGluZ0JhZGdlLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IGJhZGdlLmNhdGVnb3J5LFxuICAgICAgICAgICAgbmFtZTogYmFkZ2UubmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uVGVtcGxhdGU6IGJhZGdlLmRlc2NyaXB0aW9uVGVtcGxhdGUsXG4gICAgICAgICAgICBpbWFnZXMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdCeUlkW2JhZGdlLmlkXSA9IHsgLi4uYmFkZ2UsIGltYWdlcyB9O1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGJ5SWQ6IG5ld0J5SWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG9CQUEwQjtBQUcxQixvQkFBdUI7QUFDdkIsc0NBQXlDO0FBc0J6QyxNQUFNLHdCQUF3QjtBQUM5QixNQUFNLG1CQUFtQjtBQWlCbEIsTUFBTSxVQUFVO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxrQ0FDRSxLQUNBLFdBQytCO0FBQy9CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVMsRUFBRSxLQUFLLFVBQVU7QUFBQSxFQUM1QjtBQUNGO0FBUlMsQUFVVCx3QkFDRSxRQUNxRTtBQUNyRSxTQUFPLE9BQU0sYUFBWTtBQUt2QixVQUFNLE9BQU8sT0FBTyxLQUFLLHFCQUFxQixNQUFNO0FBRXBELGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFFRCw2REFBeUIsd0JBQXdCO0FBQUEsRUFDbkQ7QUFDRjtBQWpCUyxBQXFCRix5QkFBMEM7QUFDL0MsU0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBQ3BCO0FBRmdCLEFBSVQsaUJBQ0wsUUFBbUMsY0FBYyxHQUNqRCxRQUNpQjtBQUNqQixVQUFRLE9BQU87QUFBQSxTQUVSLHVCQUF1QjtBQUMxQixZQUFNLEVBQUUsS0FBSyxjQUFjLE9BQU87QUFDbEMsYUFBTztBQUFBLFdBQ0Y7QUFBQSxRQUNILE1BQU0sNkJBQVUsTUFBTSxNQUFNLFdBQVU7QUFBQSxhQUNqQztBQUFBLFVBQ0gsUUFBUSxNQUFNLE9BQU8sSUFBSSxXQUN2Qiw2QkFBVSxPQUFPLGVBQ2YsVUFBVSxRQUFRLE1BQ2Q7QUFBQSxlQUNLO0FBQUEsWUFDSDtBQUFBLFVBQ0YsSUFDQSxTQUNOLENBQ0Y7QUFBQSxRQUNGLEVBQUU7QUFBQSxNQUNKO0FBQUEsSUFDRjtBQUFBLFNBRUssa0JBQWtCO0FBQ3JCLFlBQU0sVUFBVSxLQUFLLE1BQU0sS0FBSztBQUNoQyxhQUFPLFFBQVEsUUFBUSxXQUFTO0FBQzlCLGNBQU0sZ0JBQWdCLDBCQUFPLFNBQVMsTUFBTSxFQUFFO0FBRTlDLGNBQU0sZ0JBQWdCLG9CQUFJLElBQW9CO0FBQzlDLHVCQUFlLE9BQU8sUUFBUSxXQUFTO0FBQ3JDLGlCQUFPLE9BQU8sS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFLFdBQVcsVUFBVTtBQUNuRCxnQkFBSSxXQUFXO0FBQ2IsNEJBQWMsSUFBSSxLQUFLLFNBQVM7QUFBQSxZQUNsQztBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0gsQ0FBQztBQUVELGNBQU0sU0FBd0MsTUFBTSxPQUFPLElBQUksV0FDN0QsNkJBQVUsT0FBTyxlQUFjO0FBQUEsYUFDMUI7QUFBQSxVQUNILFdBQVcsVUFBVSxhQUFhLGNBQWMsSUFBSSxVQUFVLEdBQUc7QUFBQSxRQUNuRSxFQUFFLENBQ0o7QUFFQSxZQUFJLGVBQWU7QUFDakIsa0JBQVEsTUFBTSxNQUFNO0FBQUEsZUFDZjtBQUFBLFlBQ0gsVUFBVSxNQUFNO0FBQUEsWUFDaEIsTUFBTSxNQUFNO0FBQUEsWUFDWixxQkFBcUIsTUFBTTtBQUFBLFlBQzNCO0FBQUEsVUFDRjtBQUFBLFFBQ0YsT0FBTztBQUNMLGtCQUFRLE1BQU0sTUFBTSxLQUFLLE9BQU8sT0FBTztBQUFBLFFBQ3pDO0FBQUEsTUFDRixDQUFDO0FBRUQsYUFBTztBQUFBLFdBQ0Y7QUFBQSxRQUNILE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBO0FBRUUsYUFBTztBQUFBO0FBRWI7QUFwRWdCIiwKICAibmFtZXMiOiBbXQp9Cg==
