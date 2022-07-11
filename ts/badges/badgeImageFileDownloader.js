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
var badgeImageFileDownloader_exports = {};
__export(badgeImageFileDownloader_exports, {
  badgeImageFileDownloader: () => badgeImageFileDownloader
});
module.exports = __toCommonJS(badgeImageFileDownloader_exports);
var import_p_queue = __toESM(require("p-queue"));
var log = __toESM(require("../logging/log"));
var import_durations = require("../util/durations");
var import_missingCaseError = require("../util/missingCaseError");
var import_waitForOnline = require("../util/waitForOnline");
var BadgeDownloaderState = /* @__PURE__ */ ((BadgeDownloaderState2) => {
  BadgeDownloaderState2[BadgeDownloaderState2["Idle"] = 0] = "Idle";
  BadgeDownloaderState2[BadgeDownloaderState2["Checking"] = 1] = "Checking";
  BadgeDownloaderState2[BadgeDownloaderState2["CheckingWithAnotherCheckEnqueued"] = 2] = "CheckingWithAnotherCheckEnqueued";
  return BadgeDownloaderState2;
})(BadgeDownloaderState || {});
class BadgeImageFileDownloader {
  constructor() {
    this.state = 0 /* Idle */;
    this.queue = new import_p_queue.default({ concurrency: 3 });
  }
  async checkForFilesToDownload() {
    switch (this.state) {
      case 2 /* CheckingWithAnotherCheckEnqueued */:
        log.info("BadgeDownloader#checkForFilesToDownload: not enqueuing another check");
        return;
      case 1 /* Checking */:
        log.info("BadgeDownloader#checkForFilesToDownload: enqueuing another check");
        this.state = 2 /* CheckingWithAnotherCheckEnqueued */;
        return;
      case 0 /* Idle */: {
        this.state = 1 /* Checking */;
        const urlsToDownload = getUrlsToDownload();
        log.info(`BadgeDownloader#checkForFilesToDownload: downloading ${urlsToDownload.length} badge(s)`);
        try {
          await this.queue.addAll(urlsToDownload.map((url) => () => downloadBadgeImageFile(url)));
        } catch (err) {
        }
        const previousState = this.state;
        this.state = 0 /* Idle */;
        if (previousState === 2 /* CheckingWithAnotherCheckEnqueued */) {
          this.checkForFilesToDownload();
        }
        return;
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(this.state);
    }
  }
}
const badgeImageFileDownloader = new BadgeImageFileDownloader();
function getUrlsToDownload() {
  const result = [];
  const badges = Object.values(window.reduxStore.getState().badges.byId);
  for (const badge of badges) {
    for (const image of badge.images) {
      for (const imageFile of Object.values(image)) {
        if (!imageFile.localPath) {
          result.push(imageFile.url);
        }
      }
    }
  }
  return result;
}
async function downloadBadgeImageFile(url) {
  await (0, import_waitForOnline.waitForOnline)(navigator, window, { timeout: 1 * import_durations.MINUTE });
  const { server } = window.textsecure;
  if (!server) {
    throw new Error("downloadBadgeImageFile: window.textsecure.server is not available!");
  }
  const imageFileData = await server.getBadgeImageFile(url);
  const localPath = await window.Signal.Migrations.writeNewBadgeImageFileData(imageFileData);
  await window.Signal.Data.badgeImageFileDownloaded(url, localPath);
  window.reduxActions.badges.badgeImageFileDownloaded(url, localPath);
  return localPath;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  badgeImageFileDownloader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgTUlOVVRFIH0gZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgeyB3YWl0Rm9yT25saW5lIH0gZnJvbSAnLi4vdXRpbC93YWl0Rm9yT25saW5lJztcblxuZW51bSBCYWRnZURvd25sb2FkZXJTdGF0ZSB7XG4gIElkbGUsXG4gIENoZWNraW5nLFxuICBDaGVja2luZ1dpdGhBbm90aGVyQ2hlY2tFbnF1ZXVlZCxcbn1cblxuY2xhc3MgQmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVyIHtcbiAgcHJpdmF0ZSBzdGF0ZSA9IEJhZGdlRG93bmxvYWRlclN0YXRlLklkbGU7XG5cbiAgcHJpdmF0ZSBxdWV1ZSA9IG5ldyBQUXVldWUoeyBjb25jdXJyZW5jeTogMyB9KTtcblxuICBwdWJsaWMgYXN5bmMgY2hlY2tGb3JGaWxlc1RvRG93bmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICBjYXNlIEJhZGdlRG93bmxvYWRlclN0YXRlLkNoZWNraW5nV2l0aEFub3RoZXJDaGVja0VucXVldWVkOlxuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnQmFkZ2VEb3dubG9hZGVyI2NoZWNrRm9yRmlsZXNUb0Rvd25sb2FkOiBub3QgZW5xdWV1aW5nIGFub3RoZXIgY2hlY2snXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgQmFkZ2VEb3dubG9hZGVyU3RhdGUuQ2hlY2tpbmc6XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdCYWRnZURvd25sb2FkZXIjY2hlY2tGb3JGaWxlc1RvRG93bmxvYWQ6IGVucXVldWluZyBhbm90aGVyIGNoZWNrJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0YXRlID0gQmFkZ2VEb3dubG9hZGVyU3RhdGUuQ2hlY2tpbmdXaXRoQW5vdGhlckNoZWNrRW5xdWV1ZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgQmFkZ2VEb3dubG9hZGVyU3RhdGUuSWRsZToge1xuICAgICAgICB0aGlzLnN0YXRlID0gQmFkZ2VEb3dubG9hZGVyU3RhdGUuQ2hlY2tpbmc7XG5cbiAgICAgICAgY29uc3QgdXJsc1RvRG93bmxvYWQgPSBnZXRVcmxzVG9Eb3dubG9hZCgpO1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgQmFkZ2VEb3dubG9hZGVyI2NoZWNrRm9yRmlsZXNUb0Rvd25sb2FkOiBkb3dubG9hZGluZyAke3VybHNUb0Rvd25sb2FkLmxlbmd0aH0gYmFkZ2UocylgXG4gICAgICAgICk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnF1ZXVlLmFkZEFsbChcbiAgICAgICAgICAgIHVybHNUb0Rvd25sb2FkLm1hcCh1cmwgPT4gKCkgPT4gZG93bmxvYWRCYWRnZUltYWdlRmlsZSh1cmwpKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgIC8vIEVycm9ycyBhcmUgaWdub3JlZC5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdpdGhvdXQgdGhpcyBjYXN0LCBUeXBlU2NyaXB0IGhhcyBhbiBpbmNvcnJlY3QgdHlwZSBmb3IgdGhpcyB2YWx1ZSwgYXNzdW1pbmdcbiAgICAgICAgLy8gICBpdCdzIGEgY29uc3RhbnQgd2hlbiBpdCBjb3VsZCd2ZSBjaGFuZ2VkLiBUaGlzIGlzIGEgW2xvbmctc3RhbmRpbmcgVHlwZVNjcmlwdFxuICAgICAgICAvLyAgIGlzc3VlXVswXS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gWzBdOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzk5OThcbiAgICAgICAgY29uc3QgcHJldmlvdXNTdGF0ZSA9IHRoaXMuc3RhdGUgYXMgQmFkZ2VEb3dubG9hZGVyU3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBCYWRnZURvd25sb2FkZXJTdGF0ZS5JZGxlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZSA9PT1cbiAgICAgICAgICBCYWRnZURvd25sb2FkZXJTdGF0ZS5DaGVja2luZ1dpdGhBbm90aGVyQ2hlY2tFbnF1ZXVlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNoZWNrRm9yRmlsZXNUb0Rvd25sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih0aGlzLnN0YXRlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJhZGdlSW1hZ2VGaWxlRG93bmxvYWRlciA9IG5ldyBCYWRnZUltYWdlRmlsZURvd25sb2FkZXIoKTtcblxuZnVuY3Rpb24gZ2V0VXJsc1RvRG93bmxvYWQoKTogQXJyYXk8c3RyaW5nPiB7XG4gIGNvbnN0IHJlc3VsdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdCBiYWRnZXMgPSBPYmplY3QudmFsdWVzKHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCkuYmFkZ2VzLmJ5SWQpO1xuICBmb3IgKGNvbnN0IGJhZGdlIG9mIGJhZGdlcykge1xuICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYmFkZ2UuaW1hZ2VzKSB7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlRmlsZSBvZiBPYmplY3QudmFsdWVzKGltYWdlKSkge1xuICAgICAgICBpZiAoIWltYWdlRmlsZS5sb2NhbFBhdGgpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChpbWFnZUZpbGUudXJsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZEJhZGdlSW1hZ2VGaWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgYXdhaXQgd2FpdEZvck9ubGluZShuYXZpZ2F0b3IsIHdpbmRvdywgeyB0aW1lb3V0OiAxICogTUlOVVRFIH0pO1xuXG4gIGNvbnN0IHsgc2VydmVyIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgaWYgKCFzZXJ2ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZG93bmxvYWRCYWRnZUltYWdlRmlsZTogd2luZG93LnRleHRzZWN1cmUuc2VydmVyIGlzIG5vdCBhdmFpbGFibGUhJ1xuICAgICk7XG4gIH1cblxuICBjb25zdCBpbWFnZUZpbGVEYXRhID0gYXdhaXQgc2VydmVyLmdldEJhZGdlSW1hZ2VGaWxlKHVybCk7XG4gIGNvbnN0IGxvY2FsUGF0aCA9IGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy53cml0ZU5ld0JhZGdlSW1hZ2VGaWxlRGF0YShcbiAgICBpbWFnZUZpbGVEYXRhXG4gICk7XG5cbiAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmJhZGdlSW1hZ2VGaWxlRG93bmxvYWRlZCh1cmwsIGxvY2FsUGF0aCk7XG5cbiAgd2luZG93LnJlZHV4QWN0aW9ucy5iYWRnZXMuYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVkKHVybCwgbG9jYWxQYXRoKTtcblxuICByZXR1cm4gbG9jYWxQYXRoO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHFCQUFtQjtBQUNuQixVQUFxQjtBQUNyQix1QkFBdUI7QUFDdkIsOEJBQWlDO0FBQ2pDLDJCQUE4QjtBQUU5QixJQUFLLHVCQUFMLGtCQUFLLDBCQUFMO0FBQ0U7QUFDQTtBQUNBO0FBSEc7QUFBQTtBQU1MLE1BQU0seUJBQXlCO0FBQUEsRUFBL0I7QUFDVSxpQkFBUTtBQUVSLGlCQUFRLElBQUksdUJBQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQztBQUFBO0FBQUEsUUFFaEMsMEJBQXlDO0FBQ3BELFlBQVEsS0FBSztBQUFBLFdBQ047QUFDSCxZQUFJLEtBQ0Ysc0VBQ0Y7QUFDQTtBQUFBLFdBQ0c7QUFDSCxZQUFJLEtBQ0Ysa0VBQ0Y7QUFDQSxhQUFLLFFBQVE7QUFDYjtBQUFBLFdBQ0csY0FBMkI7QUFDOUIsYUFBSyxRQUFRO0FBRWIsY0FBTSxpQkFBaUIsa0JBQWtCO0FBQ3pDLFlBQUksS0FDRix3REFBd0QsZUFBZSxpQkFDekU7QUFFQSxZQUFJO0FBQ0YsZ0JBQU0sS0FBSyxNQUFNLE9BQ2YsZUFBZSxJQUFJLFNBQU8sTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQzdEO0FBQUEsUUFDRixTQUFTLEtBQVA7QUFBQSxRQUVGO0FBT0EsY0FBTSxnQkFBZ0IsS0FBSztBQUMzQixhQUFLLFFBQVE7QUFDYixZQUNFLGtCQUNBLDBDQUNBO0FBQ0EsZUFBSyx3QkFBd0I7QUFBQSxRQUMvQjtBQUNBO0FBQUEsTUFDRjtBQUFBO0FBRUUsY0FBTSw4Q0FBaUIsS0FBSyxLQUFLO0FBQUE7QUFBQSxFQUV2QztBQUNGO0FBckRBLEFBdURPLE1BQU0sMkJBQTJCLElBQUkseUJBQXlCO0FBRXJFLDZCQUE0QztBQUMxQyxRQUFNLFNBQXdCLENBQUM7QUFDL0IsUUFBTSxTQUFTLE9BQU8sT0FBTyxPQUFPLFdBQVcsU0FBUyxFQUFFLE9BQU8sSUFBSTtBQUNyRSxhQUFXLFNBQVMsUUFBUTtBQUMxQixlQUFXLFNBQVMsTUFBTSxRQUFRO0FBQ2hDLGlCQUFXLGFBQWEsT0FBTyxPQUFPLEtBQUssR0FBRztBQUM1QyxZQUFJLENBQUMsVUFBVSxXQUFXO0FBQ3hCLGlCQUFPLEtBQUssVUFBVSxHQUFHO0FBQUEsUUFDM0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFiUyxBQWVULHNDQUFzQyxLQUE4QjtBQUNsRSxRQUFNLHdDQUFjLFdBQVcsUUFBUSxFQUFFLFNBQVMsSUFBSSx3QkFBTyxDQUFDO0FBRTlELFFBQU0sRUFBRSxXQUFXLE9BQU87QUFDMUIsTUFBSSxDQUFDLFFBQVE7QUFDWCxVQUFNLElBQUksTUFDUixvRUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGdCQUFnQixNQUFNLE9BQU8sa0JBQWtCLEdBQUc7QUFDeEQsUUFBTSxZQUFZLE1BQU0sT0FBTyxPQUFPLFdBQVcsMkJBQy9DLGFBQ0Y7QUFFQSxRQUFNLE9BQU8sT0FBTyxLQUFLLHlCQUF5QixLQUFLLFNBQVM7QUFFaEUsU0FBTyxhQUFhLE9BQU8seUJBQXlCLEtBQUssU0FBUztBQUVsRSxTQUFPO0FBQ1Q7QUFwQmUiLAogICJuYW1lcyI6IFtdCn0K
