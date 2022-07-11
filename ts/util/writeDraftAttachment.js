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
var writeDraftAttachment_exports = {};
__export(writeDraftAttachment_exports, {
  writeDraftAttachment: () => writeDraftAttachment
});
module.exports = __toCommonJS(writeDraftAttachment_exports);
var import_lodash = require("lodash");
var import_Attachment = require("../types/Attachment");
var import_VisualAttachment = require("../types/VisualAttachment");
var Errors = __toESM(require("../types/errors"));
var logger = __toESM(require("../logging/log"));
async function writeDraftAttachment(attachment) {
  if (attachment.pending) {
    throw new Error("writeDraftAttachment: Cannot write pending attachment");
  }
  const path = await window.Signal.Migrations.writeNewDraftData(attachment.data);
  const screenshotPath = attachment.screenshotData ? await window.Signal.Migrations.writeNewDraftData(attachment.screenshotData) : void 0;
  let dimensions = {};
  if ((0, import_Attachment.isImageAttachment)(attachment)) {
    const url = window.Signal.Migrations.getAbsoluteDraftPath(path);
    try {
      dimensions = await (0, import_VisualAttachment.getImageDimensions)({
        objectUrl: url,
        logger
      });
    } catch (error) {
      logger.error("writeDraftAttachment: failed to capture image dimensions", Errors.toLogFormat(error));
    }
  }
  return {
    ...(0, import_lodash.omit)(attachment, ["data", "screenshotData"]),
    path,
    screenshotPath,
    pending: false,
    ...dimensions
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  writeDraftAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JpdGVEcmFmdEF0dGFjaG1lbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgb21pdCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7XG4gIEluTWVtb3J5QXR0YWNobWVudERyYWZ0VHlwZSxcbiAgQXR0YWNobWVudERyYWZ0VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBpc0ltYWdlQXR0YWNobWVudCB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgZ2V0SW1hZ2VEaW1lbnNpb25zIH0gZnJvbSAnLi4vdHlwZXMvVmlzdWFsQXR0YWNobWVudCc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCAqIGFzIGxvZ2dlciBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZURyYWZ0QXR0YWNobWVudChcbiAgYXR0YWNobWVudDogSW5NZW1vcnlBdHRhY2htZW50RHJhZnRUeXBlXG4pOiBQcm9taXNlPEF0dGFjaG1lbnREcmFmdFR5cGU+IHtcbiAgaWYgKGF0dGFjaG1lbnQucGVuZGluZykge1xuICAgIHRocm93IG5ldyBFcnJvcignd3JpdGVEcmFmdEF0dGFjaG1lbnQ6IENhbm5vdCB3cml0ZSBwZW5kaW5nIGF0dGFjaG1lbnQnKTtcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBhd2FpdCB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMud3JpdGVOZXdEcmFmdERhdGEoXG4gICAgYXR0YWNobWVudC5kYXRhXG4gICk7XG5cbiAgY29uc3Qgc2NyZWVuc2hvdFBhdGggPSBhdHRhY2htZW50LnNjcmVlbnNob3REYXRhXG4gICAgPyBhd2FpdCB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMud3JpdGVOZXdEcmFmdERhdGEoXG4gICAgICAgIGF0dGFjaG1lbnQuc2NyZWVuc2hvdERhdGFcbiAgICAgIClcbiAgICA6IHVuZGVmaW5lZDtcblxuICBsZXQgZGltZW5zaW9uczogeyB3aWR0aD86IG51bWJlcjsgaGVpZ2h0PzogbnVtYmVyIH0gPSB7fTtcbiAgaWYgKGlzSW1hZ2VBdHRhY2htZW50KGF0dGFjaG1lbnQpKSB7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlRHJhZnRQYXRoKHBhdGgpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGRpbWVuc2lvbnMgPSBhd2FpdCBnZXRJbWFnZURpbWVuc2lvbnMoe1xuICAgICAgICBvYmplY3RVcmw6IHVybCxcbiAgICAgICAgbG9nZ2VyLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgJ3dyaXRlRHJhZnRBdHRhY2htZW50OiBmYWlsZWQgdG8gY2FwdHVyZSBpbWFnZSBkaW1lbnNpb25zJyxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLm9taXQoYXR0YWNobWVudCwgWydkYXRhJywgJ3NjcmVlbnNob3REYXRhJ10pLFxuICAgIHBhdGgsXG4gICAgc2NyZWVuc2hvdFBhdGgsXG4gICAgcGVuZGluZzogZmFsc2UsXG4gICAgLi4uZGltZW5zaW9ucyxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBcUI7QUFLckIsd0JBQWtDO0FBQ2xDLDhCQUFtQztBQUNuQyxhQUF3QjtBQUN4QixhQUF3QjtBQUV4QixvQ0FDRSxZQUM4QjtBQUM5QixNQUFJLFdBQVcsU0FBUztBQUN0QixVQUFNLElBQUksTUFBTSx1REFBdUQ7QUFBQSxFQUN6RTtBQUVBLFFBQU0sT0FBTyxNQUFNLE9BQU8sT0FBTyxXQUFXLGtCQUMxQyxXQUFXLElBQ2I7QUFFQSxRQUFNLGlCQUFpQixXQUFXLGlCQUM5QixNQUFNLE9BQU8sT0FBTyxXQUFXLGtCQUM3QixXQUFXLGNBQ2IsSUFDQTtBQUVKLE1BQUksYUFBa0QsQ0FBQztBQUN2RCxNQUFJLHlDQUFrQixVQUFVLEdBQUc7QUFDakMsVUFBTSxNQUFNLE9BQU8sT0FBTyxXQUFXLHFCQUFxQixJQUFJO0FBRTlELFFBQUk7QUFDRixtQkFBYSxNQUFNLGdEQUFtQjtBQUFBLFFBQ3BDLFdBQVc7QUFBQSxRQUNYO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxTQUFTLE9BQVA7QUFDQSxhQUFPLE1BQ0wsNERBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxPQUNGLHdCQUFLLFlBQVksQ0FBQyxRQUFRLGdCQUFnQixDQUFDO0FBQUEsSUFDOUM7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTO0FBQUEsT0FDTjtBQUFBLEVBQ0w7QUFDRjtBQXpDc0IiLAogICJuYW1lcyI6IFtdCn0K
