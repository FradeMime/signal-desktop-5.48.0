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
var attachment_channel_exports = {};
__export(attachment_channel_exports, {
  initialize: () => initialize
});
module.exports = __toCommonJS(attachment_channel_exports);
var import_electron = require("electron");
var rimraf = __toESM(require("rimraf"));
var import_attachments = require("../ts/util/attachments");
let initialized = false;
const ERASE_ATTACHMENTS_KEY = "erase-attachments";
const ERASE_STICKERS_KEY = "erase-stickers";
const ERASE_TEMP_KEY = "erase-temp";
const ERASE_DRAFTS_KEY = "erase-drafts";
const CLEANUP_ORPHANED_ATTACHMENTS_KEY = "cleanup-orphaned-attachments";
function initialize({
  configDir,
  cleanupOrphanedAttachments
}) {
  if (initialized) {
    throw new Error("initialze: Already initialized!");
  }
  initialized = true;
  const attachmentsDir = (0, import_attachments.getPath)(configDir);
  const stickersDir = (0, import_attachments.getStickersPath)(configDir);
  const tempDir = (0, import_attachments.getTempPath)(configDir);
  const draftDir = (0, import_attachments.getDraftPath)(configDir);
  import_electron.ipcMain.on(ERASE_TEMP_KEY, (event) => {
    try {
      rimraf.sync(tempDir);
      event.sender.send(`${ERASE_TEMP_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`erase temp error: ${errorForDisplay}`);
      event.sender.send(`${ERASE_TEMP_KEY}-done`, error);
    }
  });
  import_electron.ipcMain.on(ERASE_ATTACHMENTS_KEY, (event) => {
    try {
      rimraf.sync(attachmentsDir);
      event.sender.send(`${ERASE_ATTACHMENTS_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`erase attachments error: ${errorForDisplay}`);
      event.sender.send(`${ERASE_ATTACHMENTS_KEY}-done`, error);
    }
  });
  import_electron.ipcMain.on(ERASE_STICKERS_KEY, (event) => {
    try {
      rimraf.sync(stickersDir);
      event.sender.send(`${ERASE_STICKERS_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`erase stickers error: ${errorForDisplay}`);
      event.sender.send(`${ERASE_STICKERS_KEY}-done`, error);
    }
  });
  import_electron.ipcMain.on(ERASE_DRAFTS_KEY, (event) => {
    try {
      rimraf.sync(draftDir);
      event.sender.send(`${ERASE_DRAFTS_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`erase drafts error: ${errorForDisplay}`);
      event.sender.send(`${ERASE_DRAFTS_KEY}-done`, error);
    }
  });
  import_electron.ipcMain.on(CLEANUP_ORPHANED_ATTACHMENTS_KEY, async (event) => {
    try {
      await cleanupOrphanedAttachments();
      event.sender.send(`${CLEANUP_ORPHANED_ATTACHMENTS_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`cleanup orphaned attachments error: ${errorForDisplay}`);
      event.sender.send(`${CLEANUP_ORPHANED_ATTACHMENTS_KEY}-done`, error);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initialize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXR0YWNobWVudF9jaGFubmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCAqIGFzIHJpbXJhZiBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHtcbiAgZ2V0UGF0aCxcbiAgZ2V0U3RpY2tlcnNQYXRoLFxuICBnZXRUZW1wUGF0aCxcbiAgZ2V0RHJhZnRQYXRoLFxufSBmcm9tICcuLi90cy91dGlsL2F0dGFjaG1lbnRzJztcblxubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5cbmNvbnN0IEVSQVNFX0FUVEFDSE1FTlRTX0tFWSA9ICdlcmFzZS1hdHRhY2htZW50cyc7XG5jb25zdCBFUkFTRV9TVElDS0VSU19LRVkgPSAnZXJhc2Utc3RpY2tlcnMnO1xuY29uc3QgRVJBU0VfVEVNUF9LRVkgPSAnZXJhc2UtdGVtcCc7XG5jb25zdCBFUkFTRV9EUkFGVFNfS0VZID0gJ2VyYXNlLWRyYWZ0cyc7XG5jb25zdCBDTEVBTlVQX09SUEhBTkVEX0FUVEFDSE1FTlRTX0tFWSA9ICdjbGVhbnVwLW9ycGhhbmVkLWF0dGFjaG1lbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoe1xuICBjb25maWdEaXIsXG4gIGNsZWFudXBPcnBoYW5lZEF0dGFjaG1lbnRzLFxufToge1xuICBjb25maWdEaXI6IHN0cmluZztcbiAgY2xlYW51cE9ycGhhbmVkQXR0YWNobWVudHM6ICgpID0+IFByb21pc2U8dm9pZD47XG59KTogdm9pZCB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbHplOiBBbHJlYWR5IGluaXRpYWxpemVkIScpO1xuICB9XG4gIGluaXRpYWxpemVkID0gdHJ1ZTtcblxuICBjb25zdCBhdHRhY2htZW50c0RpciA9IGdldFBhdGgoY29uZmlnRGlyKTtcbiAgY29uc3Qgc3RpY2tlcnNEaXIgPSBnZXRTdGlja2Vyc1BhdGgoY29uZmlnRGlyKTtcbiAgY29uc3QgdGVtcERpciA9IGdldFRlbXBQYXRoKGNvbmZpZ0Rpcik7XG4gIGNvbnN0IGRyYWZ0RGlyID0gZ2V0RHJhZnRQYXRoKGNvbmZpZ0Rpcik7XG5cbiAgaXBjTWFpbi5vbihFUkFTRV9URU1QX0tFWSwgZXZlbnQgPT4ge1xuICAgIHRyeSB7XG4gICAgICByaW1yYWYuc3luYyh0ZW1wRGlyKTtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKGAke0VSQVNFX1RFTVBfS0VZfS1kb25lYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yRm9yRGlzcGxheSA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvcjtcbiAgICAgIGNvbnNvbGUubG9nKGBlcmFzZSB0ZW1wIGVycm9yOiAke2Vycm9yRm9yRGlzcGxheX1gKTtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKGAke0VSQVNFX1RFTVBfS0VZfS1kb25lYCwgZXJyb3IpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXBjTWFpbi5vbihFUkFTRV9BVFRBQ0hNRU5UU19LRVksIGV2ZW50ID0+IHtcbiAgICB0cnkge1xuICAgICAgcmltcmFmLnN5bmMoYXR0YWNobWVudHNEaXIpO1xuICAgICAgZXZlbnQuc2VuZGVyLnNlbmQoYCR7RVJBU0VfQVRUQUNITUVOVFNfS0VZfS1kb25lYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yRm9yRGlzcGxheSA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvcjtcbiAgICAgIGNvbnNvbGUubG9nKGBlcmFzZSBhdHRhY2htZW50cyBlcnJvcjogJHtlcnJvckZvckRpc3BsYXl9YCk7XG4gICAgICBldmVudC5zZW5kZXIuc2VuZChgJHtFUkFTRV9BVFRBQ0hNRU5UU19LRVl9LWRvbmVgLCBlcnJvcik7XG4gICAgfVxuICB9KTtcblxuICBpcGNNYWluLm9uKEVSQVNFX1NUSUNLRVJTX0tFWSwgZXZlbnQgPT4ge1xuICAgIHRyeSB7XG4gICAgICByaW1yYWYuc3luYyhzdGlja2Vyc0Rpcik7XG4gICAgICBldmVudC5zZW5kZXIuc2VuZChgJHtFUkFTRV9TVElDS0VSU19LRVl9LWRvbmVgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZXJyb3JGb3JEaXNwbGF5ID0gZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yO1xuICAgICAgY29uc29sZS5sb2coYGVyYXNlIHN0aWNrZXJzIGVycm9yOiAke2Vycm9yRm9yRGlzcGxheX1gKTtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKGAke0VSQVNFX1NUSUNLRVJTX0tFWX0tZG9uZWAsIGVycm9yKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlwY01haW4ub24oRVJBU0VfRFJBRlRTX0tFWSwgZXZlbnQgPT4ge1xuICAgIHRyeSB7XG4gICAgICByaW1yYWYuc3luYyhkcmFmdERpcik7XG4gICAgICBldmVudC5zZW5kZXIuc2VuZChgJHtFUkFTRV9EUkFGVFNfS0VZfS1kb25lYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yRm9yRGlzcGxheSA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvcjtcbiAgICAgIGNvbnNvbGUubG9nKGBlcmFzZSBkcmFmdHMgZXJyb3I6ICR7ZXJyb3JGb3JEaXNwbGF5fWApO1xuICAgICAgZXZlbnQuc2VuZGVyLnNlbmQoYCR7RVJBU0VfRFJBRlRTX0tFWX0tZG9uZWAsIGVycm9yKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlwY01haW4ub24oQ0xFQU5VUF9PUlBIQU5FRF9BVFRBQ0hNRU5UU19LRVksIGFzeW5jIGV2ZW50ID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2xlYW51cE9ycGhhbmVkQXR0YWNobWVudHMoKTtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKGAke0NMRUFOVVBfT1JQSEFORURfQVRUQUNITUVOVFNfS0VZfS1kb25lYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yRm9yRGlzcGxheSA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvcjtcbiAgICAgIGNvbnNvbGUubG9nKGBjbGVhbnVwIG9ycGhhbmVkIGF0dGFjaG1lbnRzIGVycm9yOiAke2Vycm9yRm9yRGlzcGxheX1gKTtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKGAke0NMRUFOVVBfT1JQSEFORURfQVRUQUNITUVOVFNfS0VZfS1kb25lYCwgZXJyb3IpO1xuICAgIH1cbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQXdCO0FBQ3hCLGFBQXdCO0FBQ3hCLHlCQUtPO0FBRVAsSUFBSSxjQUFjO0FBRWxCLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0scUJBQXFCO0FBQzNCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sbUNBQW1DO0FBRWxDLG9CQUFvQjtBQUFBLEVBQ3pCO0FBQUEsRUFDQTtBQUFBLEdBSU87QUFDUCxNQUFJLGFBQWE7QUFDZixVQUFNLElBQUksTUFBTSxpQ0FBaUM7QUFBQSxFQUNuRDtBQUNBLGdCQUFjO0FBRWQsUUFBTSxpQkFBaUIsZ0NBQVEsU0FBUztBQUN4QyxRQUFNLGNBQWMsd0NBQWdCLFNBQVM7QUFDN0MsUUFBTSxVQUFVLG9DQUFZLFNBQVM7QUFDckMsUUFBTSxXQUFXLHFDQUFhLFNBQVM7QUFFdkMsMEJBQVEsR0FBRyxnQkFBZ0IsV0FBUztBQUNsQyxRQUFJO0FBQ0YsYUFBTyxLQUFLLE9BQU87QUFDbkIsWUFBTSxPQUFPLEtBQUssR0FBRyxxQkFBcUI7QUFBQSxJQUM1QyxTQUFTLE9BQVA7QUFDQSxZQUFNLGtCQUFrQixTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVE7QUFDN0QsY0FBUSxJQUFJLHFCQUFxQixpQkFBaUI7QUFDbEQsWUFBTSxPQUFPLEtBQUssR0FBRyx1QkFBdUIsS0FBSztBQUFBLElBQ25EO0FBQUEsRUFDRixDQUFDO0FBRUQsMEJBQVEsR0FBRyx1QkFBdUIsV0FBUztBQUN6QyxRQUFJO0FBQ0YsYUFBTyxLQUFLLGNBQWM7QUFDMUIsWUFBTSxPQUFPLEtBQUssR0FBRyw0QkFBNEI7QUFBQSxJQUNuRCxTQUFTLE9BQVA7QUFDQSxZQUFNLGtCQUFrQixTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVE7QUFDN0QsY0FBUSxJQUFJLDRCQUE0QixpQkFBaUI7QUFDekQsWUFBTSxPQUFPLEtBQUssR0FBRyw4QkFBOEIsS0FBSztBQUFBLElBQzFEO0FBQUEsRUFDRixDQUFDO0FBRUQsMEJBQVEsR0FBRyxvQkFBb0IsV0FBUztBQUN0QyxRQUFJO0FBQ0YsYUFBTyxLQUFLLFdBQVc7QUFDdkIsWUFBTSxPQUFPLEtBQUssR0FBRyx5QkFBeUI7QUFBQSxJQUNoRCxTQUFTLE9BQVA7QUFDQSxZQUFNLGtCQUFrQixTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVE7QUFDN0QsY0FBUSxJQUFJLHlCQUF5QixpQkFBaUI7QUFDdEQsWUFBTSxPQUFPLEtBQUssR0FBRywyQkFBMkIsS0FBSztBQUFBLElBQ3ZEO0FBQUEsRUFDRixDQUFDO0FBRUQsMEJBQVEsR0FBRyxrQkFBa0IsV0FBUztBQUNwQyxRQUFJO0FBQ0YsYUFBTyxLQUFLLFFBQVE7QUFDcEIsWUFBTSxPQUFPLEtBQUssR0FBRyx1QkFBdUI7QUFBQSxJQUM5QyxTQUFTLE9BQVA7QUFDQSxZQUFNLGtCQUFrQixTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVE7QUFDN0QsY0FBUSxJQUFJLHVCQUF1QixpQkFBaUI7QUFDcEQsWUFBTSxPQUFPLEtBQUssR0FBRyx5QkFBeUIsS0FBSztBQUFBLElBQ3JEO0FBQUEsRUFDRixDQUFDO0FBRUQsMEJBQVEsR0FBRyxrQ0FBa0MsT0FBTSxVQUFTO0FBQzFELFFBQUk7QUFDRixZQUFNLDJCQUEyQjtBQUNqQyxZQUFNLE9BQU8sS0FBSyxHQUFHLHVDQUF1QztBQUFBLElBQzlELFNBQVMsT0FBUDtBQUNBLFlBQU0sa0JBQWtCLFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUTtBQUM3RCxjQUFRLElBQUksdUNBQXVDLGlCQUFpQjtBQUNwRSxZQUFNLE9BQU8sS0FBSyxHQUFHLHlDQUF5QyxLQUFLO0FBQUEsSUFDckU7QUFBQSxFQUNGLENBQUM7QUFDSDtBQXZFZ0IiLAogICJuYW1lcyI6IFtdCn0K
