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
var user_exports = {};
__export(user_exports, {
  getAttachmentsPath: () => getAttachmentsPath,
  getInteractionMode: () => getInteractionMode,
  getIntl: () => getIntl,
  getIsAlpha: () => getIsAlpha,
  getIsBeta: () => getIsBeta,
  getIsMainWindowFullScreen: () => getIsMainWindowFullScreen,
  getIsMainWindowMaximized: () => getIsMainWindowMaximized,
  getLocaleMessages: () => getLocaleMessages,
  getMenuOptions: () => getMenuOptions,
  getPlatform: () => getPlatform,
  getRegionCode: () => getRegionCode,
  getStickersPath: () => getStickersPath,
  getTempPath: () => getTempPath,
  getTheme: () => getTheme,
  getUser: () => getUser,
  getUserConversationId: () => getUserConversationId,
  getUserDeviceId: () => getUserDeviceId,
  getUserNumber: () => getUserNumber,
  getUserUuid: () => getUserUuid
});
module.exports = __toCommonJS(user_exports);
var import_reselect = require("reselect");
var import_version = require("../../util/version");
const getUser = /* @__PURE__ */ __name((state) => state.user, "getUser");
const getUserNumber = (0, import_reselect.createSelector)(getUser, (state) => state.ourNumber);
const getUserDeviceId = (0, import_reselect.createSelector)(getUser, (state) => state.ourDeviceId);
const getRegionCode = (0, import_reselect.createSelector)(getUser, (state) => state.regionCode);
const getUserConversationId = (0, import_reselect.createSelector)(getUser, (state) => state.ourConversationId);
const getUserUuid = (0, import_reselect.createSelector)(getUser, (state) => state.ourUuid);
const getIntl = (0, import_reselect.createSelector)(getUser, (state) => state.i18n);
const getLocaleMessages = (0, import_reselect.createSelector)(getUser, (state) => state.localeMessages);
const getInteractionMode = (0, import_reselect.createSelector)(getUser, (state) => state.interactionMode);
const getAttachmentsPath = (0, import_reselect.createSelector)(getUser, (state) => state.attachmentsPath);
const getStickersPath = (0, import_reselect.createSelector)(getUser, (state) => state.stickersPath);
const getPlatform = (0, import_reselect.createSelector)(getUser, (state) => state.platform);
const getTempPath = (0, import_reselect.createSelector)(getUser, (state) => state.tempPath);
const getTheme = (0, import_reselect.createSelector)(getUser, (state) => state.theme);
const getVersion = (0, import_reselect.createSelector)(getUser, (state) => state.version);
const getIsAlpha = (0, import_reselect.createSelector)(getVersion, import_version.isAlpha);
const getIsBeta = (0, import_reselect.createSelector)(getVersion, import_version.isBeta);
const getIsMainWindowMaximized = (0, import_reselect.createSelector)(getUser, (state) => state.isMainWindowMaximized);
const getIsMainWindowFullScreen = (0, import_reselect.createSelector)(getUser, (state) => state.isMainWindowFullScreen);
const getMenuOptions = (0, import_reselect.createSelector)(getUser, (state) => state.menuOptions);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAttachmentsPath,
  getInteractionMode,
  getIntl,
  getIsAlpha,
  getIsBeta,
  getIsMainWindowFullScreen,
  getIsMainWindowMaximized,
  getLocaleMessages,
  getMenuOptions,
  getPlatform,
  getRegionCode,
  getStickersPath,
  getTempPath,
  getTheme,
  getUser,
  getUserConversationId,
  getUserDeviceId,
  getUserNumber,
  getUserUuid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGVNZXNzYWdlc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9JMThOJztcbmltcG9ydCB0eXBlIHsgTWVudU9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvbWVudSc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7IFVzZXJTdGF0ZVR5cGUgfSBmcm9tICcuLi9kdWNrcy91c2VyJztcblxuaW1wb3J0IHsgaXNBbHBoYSwgaXNCZXRhIH0gZnJvbSAnLi4vLi4vdXRpbC92ZXJzaW9uJztcblxuZXhwb3J0IGNvbnN0IGdldFVzZXIgPSAoc3RhdGU6IFN0YXRlVHlwZSk6IFVzZXJTdGF0ZVR5cGUgPT4gc3RhdGUudXNlcjtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJOdW1iZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VXNlcixcbiAgKHN0YXRlOiBVc2VyU3RhdGVUeXBlKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHN0YXRlLm91ck51bWJlclxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJEZXZpY2VJZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4gc3RhdGUub3VyRGV2aWNlSWRcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRSZWdpb25Db2RlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFVzZXIsXG4gIChzdGF0ZTogVXNlclN0YXRlVHlwZSk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiBzdGF0ZS5yZWdpb25Db2RlXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckNvbnZlcnNhdGlvbklkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFVzZXIsXG4gIChzdGF0ZTogVXNlclN0YXRlVHlwZSk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiBzdGF0ZS5vdXJDb252ZXJzYXRpb25JZFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJVdWlkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFVzZXIsXG4gIChzdGF0ZTogVXNlclN0YXRlVHlwZSk6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkID0+IHN0YXRlLm91clV1aWRcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRJbnRsID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFVzZXIsXG4gIChzdGF0ZTogVXNlclN0YXRlVHlwZSk6IExvY2FsaXplclR5cGUgPT4gc3RhdGUuaTE4blxuKTtcblxuZXhwb3J0IGNvbnN0IGdldExvY2FsZU1lc3NhZ2VzID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFVzZXIsXG4gIChzdGF0ZTogVXNlclN0YXRlVHlwZSk6IExvY2FsZU1lc3NhZ2VzVHlwZSA9PiBzdGF0ZS5sb2NhbGVNZXNzYWdlc1xuKTtcblxuZXhwb3J0IGNvbnN0IGdldEludGVyYWN0aW9uTW9kZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpID0+IHN0YXRlLmludGVyYWN0aW9uTW9kZVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEF0dGFjaG1lbnRzUGF0aCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpOiBzdHJpbmcgPT4gc3RhdGUuYXR0YWNobWVudHNQYXRoXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U3RpY2tlcnNQYXRoID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFVzZXIsXG4gIChzdGF0ZTogVXNlclN0YXRlVHlwZSk6IHN0cmluZyA9PiBzdGF0ZS5zdGlja2Vyc1BhdGhcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRQbGF0Zm9ybSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpOiBzdHJpbmcgPT4gc3RhdGUucGxhdGZvcm1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRUZW1wUGF0aCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpOiBzdHJpbmcgPT4gc3RhdGUudGVtcFBhdGhcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRUaGVtZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpOiBUaGVtZVR5cGUgPT4gc3RhdGUudGhlbWVcbik7XG5cbmNvbnN0IGdldFZlcnNpb24gPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VXNlcixcbiAgKHN0YXRlOiBVc2VyU3RhdGVUeXBlKSA9PiBzdGF0ZS52ZXJzaW9uXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0SXNBbHBoYSA9IGNyZWF0ZVNlbGVjdG9yKGdldFZlcnNpb24sIGlzQWxwaGEpO1xuXG5leHBvcnQgY29uc3QgZ2V0SXNCZXRhID0gY3JlYXRlU2VsZWN0b3IoZ2V0VmVyc2lvbiwgaXNCZXRhKTtcblxuZXhwb3J0IGNvbnN0IGdldElzTWFpbldpbmRvd01heGltaXplZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRVc2VyLFxuICAoc3RhdGU6IFVzZXJTdGF0ZVR5cGUpOiBib29sZWFuID0+IHN0YXRlLmlzTWFpbldpbmRvd01heGltaXplZFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldElzTWFpbldpbmRvd0Z1bGxTY3JlZW4gPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VXNlcixcbiAgKHN0YXRlOiBVc2VyU3RhdGVUeXBlKTogYm9vbGVhbiA9PiBzdGF0ZS5pc01haW5XaW5kb3dGdWxsU2NyZWVuXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0TWVudU9wdGlvbnMgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VXNlcixcbiAgKHN0YXRlOiBVc2VyU3RhdGVUeXBlKTogTWVudU9wdGlvbnNUeXBlID0+IHN0YXRlLm1lbnVPcHRpb25zXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUErQjtBQVUvQixxQkFBZ0M7QUFFekIsTUFBTSxVQUFVLHdCQUFDLFVBQW9DLE1BQU0sTUFBM0M7QUFFaEIsTUFBTSxnQkFBZ0Isb0NBQzNCLFNBQ0EsQ0FBQyxVQUE2QyxNQUFNLFNBQ3REO0FBRU8sTUFBTSxrQkFBa0Isb0NBQzdCLFNBQ0EsQ0FBQyxVQUE2QyxNQUFNLFdBQ3REO0FBRU8sTUFBTSxnQkFBZ0Isb0NBQzNCLFNBQ0EsQ0FBQyxVQUE2QyxNQUFNLFVBQ3REO0FBRU8sTUFBTSx3QkFBd0Isb0NBQ25DLFNBQ0EsQ0FBQyxVQUE2QyxNQUFNLGlCQUN0RDtBQUVPLE1BQU0sY0FBYyxvQ0FDekIsU0FDQSxDQUFDLFVBQXFELE1BQU0sT0FDOUQ7QUFFTyxNQUFNLFVBQVUsb0NBQ3JCLFNBQ0EsQ0FBQyxVQUF3QyxNQUFNLElBQ2pEO0FBRU8sTUFBTSxvQkFBb0Isb0NBQy9CLFNBQ0EsQ0FBQyxVQUE2QyxNQUFNLGNBQ3REO0FBRU8sTUFBTSxxQkFBcUIsb0NBQ2hDLFNBQ0EsQ0FBQyxVQUF5QixNQUFNLGVBQ2xDO0FBRU8sTUFBTSxxQkFBcUIsb0NBQ2hDLFNBQ0EsQ0FBQyxVQUFpQyxNQUFNLGVBQzFDO0FBRU8sTUFBTSxrQkFBa0Isb0NBQzdCLFNBQ0EsQ0FBQyxVQUFpQyxNQUFNLFlBQzFDO0FBRU8sTUFBTSxjQUFjLG9DQUN6QixTQUNBLENBQUMsVUFBaUMsTUFBTSxRQUMxQztBQUVPLE1BQU0sY0FBYyxvQ0FDekIsU0FDQSxDQUFDLFVBQWlDLE1BQU0sUUFDMUM7QUFFTyxNQUFNLFdBQVcsb0NBQ3RCLFNBQ0EsQ0FBQyxVQUFvQyxNQUFNLEtBQzdDO0FBRUEsTUFBTSxhQUFhLG9DQUNqQixTQUNBLENBQUMsVUFBeUIsTUFBTSxPQUNsQztBQUVPLE1BQU0sYUFBYSxvQ0FBZSxZQUFZLHNCQUFPO0FBRXJELE1BQU0sWUFBWSxvQ0FBZSxZQUFZLHFCQUFNO0FBRW5ELE1BQU0sMkJBQTJCLG9DQUN0QyxTQUNBLENBQUMsVUFBa0MsTUFBTSxxQkFDM0M7QUFFTyxNQUFNLDRCQUE0QixvQ0FDdkMsU0FDQSxDQUFDLFVBQWtDLE1BQU0sc0JBQzNDO0FBRU8sTUFBTSxpQkFBaUIsb0NBQzVCLFNBQ0EsQ0FBQyxVQUEwQyxNQUFNLFdBQ25EOyIsCiAgIm5hbWVzIjogW10KfQo=
