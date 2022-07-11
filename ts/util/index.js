var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var util_exports = {};
__export(util_exports, {
  GoogleChrome: () => GoogleChrome,
  MessageController: () => import_MessageController.MessageController,
  Registration: () => Registration,
  RetryPlaceholders: () => import_retryPlaceholders.RetryPlaceholders,
  StartupQueue: () => import_StartupQueue.StartupQueue,
  arrayBufferToObjectURL: () => import_arrayBufferToObjectURL.arrayBufferToObjectURL,
  combineNames: () => import_combineNames.combineNames,
  createBatcher: () => import_batcher.createBatcher,
  createWaitBatcher: () => import_waitBatcher.createWaitBatcher,
  deleteForEveryone: () => import_deleteForEveryone.deleteForEveryone,
  downloadAttachment: () => import_downloadAttachment.downloadAttachment,
  expirationTimer: () => expirationTimer,
  flushMessageCounter: () => import_incrementMessageCounter.flushMessageCounter,
  fromWebSafeBase64: () => import_webSafeBase64.fromWebSafeBase64,
  generateSecurityNumber: () => import_safetyNumber.generateSecurityNumber,
  getStringForProfileChange: () => import_getStringForProfileChange.getStringForProfileChange,
  getTextWithMentions: () => import_getTextWithMentions.getTextWithMentions,
  getUserAgent: () => import_getUserAgent.getUserAgent,
  hasExpired: () => import_hasExpired.hasExpired,
  incrementMessageCounter: () => import_incrementMessageCounter.incrementMessageCounter,
  initializeMessageCounter: () => import_incrementMessageCounter.initializeMessageCounter,
  isFileDangerous: () => import_isFileDangerous.isFileDangerous,
  longRunningTaskWrapper: () => import_longRunningTaskWrapper.longRunningTaskWrapper,
  makeLookup: () => import_makeLookup.makeLookup,
  mapToSupportLocale: () => import_mapToSupportLocale.mapToSupportLocale,
  missingCaseError: () => import_missingCaseError.missingCaseError,
  parseRemoteClientExpiration: () => import_parseRemoteClientExpiration.parseRemoteClientExpiration,
  queueUpdateMessage: () => import_messageBatcher.queueUpdateMessage,
  saveNewMessageBatcher: () => import_messageBatcher.saveNewMessageBatcher,
  sendContentMessageToGroup: () => import_sendToGroup.sendContentMessageToGroup,
  sendToGroup: () => import_sendToGroup.sendToGroup,
  sessionRecordToProtobuf: () => import_sessionTranslation.sessionRecordToProtobuf,
  sessionStructureToBytes: () => import_sessionTranslation.sessionStructureToBytes,
  setBatchingStrategy: () => import_messageBatcher.setBatchingStrategy,
  sleep: () => import_sleep.sleep,
  toWebSafeBase64: () => import_webSafeBase64.toWebSafeBase64,
  zkgroup: () => zkgroup
});
module.exports = __toCommonJS(util_exports);
var GoogleChrome = __toESM(require("./GoogleChrome"));
var Registration = __toESM(require("./registration"));
var import_arrayBufferToObjectURL = require("./arrayBufferToObjectURL");
var import_combineNames = require("./combineNames");
var import_batcher = require("./batcher");
var import_waitBatcher = require("./waitBatcher");
var import_deleteForEveryone = require("./deleteForEveryone");
var import_downloadAttachment = require("./downloadAttachment");
var import_safetyNumber = require("./safetyNumber");
var import_getStringForProfileChange = require("./getStringForProfileChange");
var import_getTextWithMentions = require("./getTextWithMentions");
var import_getUserAgent = require("./getUserAgent");
var import_hasExpired = require("./hasExpired");
var import_incrementMessageCounter = require("./incrementMessageCounter");
var import_isFileDangerous = require("./isFileDangerous");
var import_makeLookup = require("./makeLookup");
var import_messageBatcher = require("./messageBatcher");
var import_missingCaseError = require("./missingCaseError");
var import_parseRemoteClientExpiration = require("./parseRemoteClientExpiration");
var import_sleep = require("./sleep");
var import_longRunningTaskWrapper = require("./longRunningTaskWrapper");
var import_webSafeBase64 = require("./webSafeBase64");
var import_mapToSupportLocale = require("./mapToSupportLocale");
var import_sessionTranslation = require("./sessionTranslation");
var zkgroup = __toESM(require("./zkgroup"));
var import_StartupQueue = require("./StartupQueue");
var import_sendToGroup = require("./sendToGroup");
var import_retryPlaceholders = require("./retryPlaceholders");
var expirationTimer = __toESM(require("./expirationTimer"));
var import_MessageController = require("./MessageController");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleChrome,
  MessageController,
  Registration,
  RetryPlaceholders,
  StartupQueue,
  arrayBufferToObjectURL,
  combineNames,
  createBatcher,
  createWaitBatcher,
  deleteForEveryone,
  downloadAttachment,
  expirationTimer,
  flushMessageCounter,
  fromWebSafeBase64,
  generateSecurityNumber,
  getStringForProfileChange,
  getTextWithMentions,
  getUserAgent,
  hasExpired,
  incrementMessageCounter,
  initializeMessageCounter,
  isFileDangerous,
  longRunningTaskWrapper,
  makeLookup,
  mapToSupportLocale,
  missingCaseError,
  parseRemoteClientExpiration,
  queueUpdateMessage,
  saveNewMessageBatcher,
  sendContentMessageToGroup,
  sendToGroup,
  sessionRecordToProtobuf,
  sessionStructureToBytes,
  setBatchingStrategy,
  sleep,
  toWebSafeBase64,
  zkgroup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBHb29nbGVDaHJvbWUgZnJvbSAnLi9Hb29nbGVDaHJvbWUnO1xuaW1wb3J0ICogYXMgUmVnaXN0cmF0aW9uIGZyb20gJy4vcmVnaXN0cmF0aW9uJztcbmltcG9ydCB7IGFycmF5QnVmZmVyVG9PYmplY3RVUkwgfSBmcm9tICcuL2FycmF5QnVmZmVyVG9PYmplY3RVUkwnO1xuaW1wb3J0IHsgY29tYmluZU5hbWVzIH0gZnJvbSAnLi9jb21iaW5lTmFtZXMnO1xuaW1wb3J0IHsgY3JlYXRlQmF0Y2hlciB9IGZyb20gJy4vYmF0Y2hlcic7XG5pbXBvcnQgeyBjcmVhdGVXYWl0QmF0Y2hlciB9IGZyb20gJy4vd2FpdEJhdGNoZXInO1xuaW1wb3J0IHsgZGVsZXRlRm9yRXZlcnlvbmUgfSBmcm9tICcuL2RlbGV0ZUZvckV2ZXJ5b25lJztcbmltcG9ydCB7IGRvd25sb2FkQXR0YWNobWVudCB9IGZyb20gJy4vZG93bmxvYWRBdHRhY2htZW50JztcbmltcG9ydCB7IGdlbmVyYXRlU2VjdXJpdHlOdW1iZXIgfSBmcm9tICcuL3NhZmV0eU51bWJlcic7XG5pbXBvcnQgeyBnZXRTdHJpbmdGb3JQcm9maWxlQ2hhbmdlIH0gZnJvbSAnLi9nZXRTdHJpbmdGb3JQcm9maWxlQ2hhbmdlJztcbmltcG9ydCB7IGdldFRleHRXaXRoTWVudGlvbnMgfSBmcm9tICcuL2dldFRleHRXaXRoTWVudGlvbnMnO1xuaW1wb3J0IHsgZ2V0VXNlckFnZW50IH0gZnJvbSAnLi9nZXRVc2VyQWdlbnQnO1xuaW1wb3J0IHsgaGFzRXhwaXJlZCB9IGZyb20gJy4vaGFzRXhwaXJlZCc7XG5pbXBvcnQge1xuICBpbml0aWFsaXplTWVzc2FnZUNvdW50ZXIsXG4gIGluY3JlbWVudE1lc3NhZ2VDb3VudGVyLFxuICBmbHVzaE1lc3NhZ2VDb3VudGVyLFxufSBmcm9tICcuL2luY3JlbWVudE1lc3NhZ2VDb3VudGVyJztcbmltcG9ydCB7IGlzRmlsZURhbmdlcm91cyB9IGZyb20gJy4vaXNGaWxlRGFuZ2Vyb3VzJztcbmltcG9ydCB7IG1ha2VMb29rdXAgfSBmcm9tICcuL21ha2VMb29rdXAnO1xuaW1wb3J0IHtcbiAgcXVldWVVcGRhdGVNZXNzYWdlLFxuICBzYXZlTmV3TWVzc2FnZUJhdGNoZXIsXG4gIHNldEJhdGNoaW5nU3RyYXRlZ3ksXG59IGZyb20gJy4vbWVzc2FnZUJhdGNoZXInO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4vbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgeyBwYXJzZVJlbW90ZUNsaWVudEV4cGlyYXRpb24gfSBmcm9tICcuL3BhcnNlUmVtb3RlQ2xpZW50RXhwaXJhdGlvbic7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vc2xlZXAnO1xuaW1wb3J0IHsgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlciB9IGZyb20gJy4vbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcic7XG5pbXBvcnQgeyB0b1dlYlNhZmVCYXNlNjQsIGZyb21XZWJTYWZlQmFzZTY0IH0gZnJvbSAnLi93ZWJTYWZlQmFzZTY0JztcbmltcG9ydCB7IG1hcFRvU3VwcG9ydExvY2FsZSB9IGZyb20gJy4vbWFwVG9TdXBwb3J0TG9jYWxlJztcbmltcG9ydCB7XG4gIHNlc3Npb25SZWNvcmRUb1Byb3RvYnVmLFxuICBzZXNzaW9uU3RydWN0dXJlVG9CeXRlcyxcbn0gZnJvbSAnLi9zZXNzaW9uVHJhbnNsYXRpb24nO1xuaW1wb3J0ICogYXMgemtncm91cCBmcm9tICcuL3prZ3JvdXAnO1xuaW1wb3J0IHsgU3RhcnR1cFF1ZXVlIH0gZnJvbSAnLi9TdGFydHVwUXVldWUnO1xuaW1wb3J0IHsgc2VuZFRvR3JvdXAsIHNlbmRDb250ZW50TWVzc2FnZVRvR3JvdXAgfSBmcm9tICcuL3NlbmRUb0dyb3VwJztcbmltcG9ydCB7IFJldHJ5UGxhY2Vob2xkZXJzIH0gZnJvbSAnLi9yZXRyeVBsYWNlaG9sZGVycyc7XG5pbXBvcnQgKiBhcyBleHBpcmF0aW9uVGltZXIgZnJvbSAnLi9leHBpcmF0aW9uVGltZXInO1xuaW1wb3J0IHsgTWVzc2FnZUNvbnRyb2xsZXIgfSBmcm9tICcuL01lc3NhZ2VDb250cm9sbGVyJztcblxuZXhwb3J0IHtcbiAgR29vZ2xlQ2hyb21lLFxuICBSZWdpc3RyYXRpb24sXG4gIFN0YXJ0dXBRdWV1ZSxcbiAgYXJyYXlCdWZmZXJUb09iamVjdFVSTCxcbiAgY29tYmluZU5hbWVzLFxuICBjcmVhdGVCYXRjaGVyLFxuICBjcmVhdGVXYWl0QmF0Y2hlcixcbiAgZGVsZXRlRm9yRXZlcnlvbmUsXG4gIGRvd25sb2FkQXR0YWNobWVudCxcbiAgZmx1c2hNZXNzYWdlQ291bnRlcixcbiAgZnJvbVdlYlNhZmVCYXNlNjQsXG4gIGdlbmVyYXRlU2VjdXJpdHlOdW1iZXIsXG4gIGdldFN0cmluZ0ZvclByb2ZpbGVDaGFuZ2UsXG4gIGdldFRleHRXaXRoTWVudGlvbnMsXG4gIGdldFVzZXJBZ2VudCxcbiAgaGFzRXhwaXJlZCxcbiAgaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIsXG4gIGluaXRpYWxpemVNZXNzYWdlQ291bnRlcixcbiAgaXNGaWxlRGFuZ2Vyb3VzLFxuICBsb25nUnVubmluZ1Rhc2tXcmFwcGVyLFxuICBtYWtlTG9va3VwLFxuICBtYXBUb1N1cHBvcnRMb2NhbGUsXG4gIE1lc3NhZ2VDb250cm9sbGVyLFxuICBtaXNzaW5nQ2FzZUVycm9yLFxuICBwYXJzZVJlbW90ZUNsaWVudEV4cGlyYXRpb24sXG4gIHF1ZXVlVXBkYXRlTWVzc2FnZSxcbiAgUmV0cnlQbGFjZWhvbGRlcnMsXG4gIHNhdmVOZXdNZXNzYWdlQmF0Y2hlcixcbiAgc2VuZENvbnRlbnRNZXNzYWdlVG9Hcm91cCxcbiAgc2VuZFRvR3JvdXAsXG4gIHNldEJhdGNoaW5nU3RyYXRlZ3ksXG4gIHNlc3Npb25SZWNvcmRUb1Byb3RvYnVmLFxuICBzZXNzaW9uU3RydWN0dXJlVG9CeXRlcyxcbiAgc2xlZXAsXG4gIHRvV2ViU2FmZUJhc2U2NCxcbiAgemtncm91cCxcbiAgZXhwaXJhdGlvblRpbWVyLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUE4QjtBQUM5QixtQkFBOEI7QUFDOUIsb0NBQXVDO0FBQ3ZDLDBCQUE2QjtBQUM3QixxQkFBOEI7QUFDOUIseUJBQWtDO0FBQ2xDLCtCQUFrQztBQUNsQyxnQ0FBbUM7QUFDbkMsMEJBQXVDO0FBQ3ZDLHVDQUEwQztBQUMxQyxpQ0FBb0M7QUFDcEMsMEJBQTZCO0FBQzdCLHdCQUEyQjtBQUMzQixxQ0FJTztBQUNQLDZCQUFnQztBQUNoQyx3QkFBMkI7QUFDM0IsNEJBSU87QUFDUCw4QkFBaUM7QUFDakMseUNBQTRDO0FBQzVDLG1CQUFzQjtBQUN0QixvQ0FBdUM7QUFDdkMsMkJBQW1EO0FBQ25ELGdDQUFtQztBQUNuQyxnQ0FHTztBQUNQLGNBQXlCO0FBQ3pCLDBCQUE2QjtBQUM3Qix5QkFBdUQ7QUFDdkQsK0JBQWtDO0FBQ2xDLHNCQUFpQztBQUNqQywrQkFBa0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
