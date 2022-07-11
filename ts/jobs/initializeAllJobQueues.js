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
var initializeAllJobQueues_exports = {};
__export(initializeAllJobQueues_exports, {
  initializeAllJobQueues: () => initializeAllJobQueues
});
module.exports = __toCommonJS(initializeAllJobQueues_exports);
var import_conversationJobQueue = require("./conversationJobQueue");
var import_deliveryReceiptsJobQueue = require("./deliveryReceiptsJobQueue");
var import_readReceiptsJobQueue = require("./readReceiptsJobQueue");
var import_readSyncJobQueue = require("./readSyncJobQueue");
var import_removeStorageKeyJobQueue = require("./removeStorageKeyJobQueue");
var import_reportSpamJobQueue = require("./reportSpamJobQueue");
var import_singleProtoJobQueue = require("./singleProtoJobQueue");
var import_viewOnceOpenJobQueue = require("./viewOnceOpenJobQueue");
var import_viewSyncJobQueue = require("./viewSyncJobQueue");
var import_viewedReceiptsJobQueue = require("./viewedReceiptsJobQueue");
function initializeAllJobQueues({
  server
}) {
  import_reportSpamJobQueue.reportSpamJobQueue.initialize({ server });
  import_conversationJobQueue.conversationJobQueue.streamJobs();
  import_singleProtoJobQueue.singleProtoJobQueue.streamJobs();
  import_deliveryReceiptsJobQueue.deliveryReceiptsJobQueue.streamJobs();
  import_readReceiptsJobQueue.readReceiptsJobQueue.streamJobs();
  import_viewedReceiptsJobQueue.viewedReceiptsJobQueue.streamJobs();
  import_readSyncJobQueue.readSyncJobQueue.streamJobs();
  import_viewSyncJobQueue.viewSyncJobQueue.streamJobs();
  import_viewOnceOpenJobQueue.viewOnceOpenJobQueue.streamJobs();
  import_removeStorageKeyJobQueue.removeStorageKeyJobQueue.streamJobs();
  import_reportSpamJobQueue.reportSpamJobQueue.streamJobs();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initializeAllJobQueues
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5pdGlhbGl6ZUFsbEpvYlF1ZXVlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgV2ViQVBJVHlwZSB9IGZyb20gJy4uL3RleHRzZWN1cmUvV2ViQVBJJztcblxuaW1wb3J0IHsgY29udmVyc2F0aW9uSm9iUXVldWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB7IGRlbGl2ZXJ5UmVjZWlwdHNKb2JRdWV1ZSB9IGZyb20gJy4vZGVsaXZlcnlSZWNlaXB0c0pvYlF1ZXVlJztcbmltcG9ydCB7IHJlYWRSZWNlaXB0c0pvYlF1ZXVlIH0gZnJvbSAnLi9yZWFkUmVjZWlwdHNKb2JRdWV1ZSc7XG5pbXBvcnQgeyByZWFkU3luY0pvYlF1ZXVlIH0gZnJvbSAnLi9yZWFkU3luY0pvYlF1ZXVlJztcbmltcG9ydCB7IHJlbW92ZVN0b3JhZ2VLZXlKb2JRdWV1ZSB9IGZyb20gJy4vcmVtb3ZlU3RvcmFnZUtleUpvYlF1ZXVlJztcbmltcG9ydCB7IHJlcG9ydFNwYW1Kb2JRdWV1ZSB9IGZyb20gJy4vcmVwb3J0U3BhbUpvYlF1ZXVlJztcbmltcG9ydCB7IHNpbmdsZVByb3RvSm9iUXVldWUgfSBmcm9tICcuL3NpbmdsZVByb3RvSm9iUXVldWUnO1xuaW1wb3J0IHsgdmlld09uY2VPcGVuSm9iUXVldWUgfSBmcm9tICcuL3ZpZXdPbmNlT3BlbkpvYlF1ZXVlJztcbmltcG9ydCB7IHZpZXdTeW5jSm9iUXVldWUgfSBmcm9tICcuL3ZpZXdTeW5jSm9iUXVldWUnO1xuaW1wb3J0IHsgdmlld2VkUmVjZWlwdHNKb2JRdWV1ZSB9IGZyb20gJy4vdmlld2VkUmVjZWlwdHNKb2JRdWV1ZSc7XG5cbi8qKlxuICogU3RhcnQgYWxsIG9mIHRoZSBqb2IgcXVldWVzLiBTaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGRhdGFiYXNlIGlzIHJlYWR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUFsbEpvYlF1ZXVlcyh7XG4gIHNlcnZlcixcbn06IHtcbiAgc2VydmVyOiBXZWJBUElUeXBlO1xufSk6IHZvaWQge1xuICByZXBvcnRTcGFtSm9iUXVldWUuaW5pdGlhbGl6ZSh7IHNlcnZlciB9KTtcblxuICAvLyBHZW5lcmFsIGNvbnZlcnNhdGlvbiBzZW5kIHF1ZXVlXG4gIGNvbnZlcnNhdGlvbkpvYlF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAvLyBTaW5nbGUgcHJvdG8gc2VuZCBxdWV1ZSwgdXNlZCBmb3IgYSB2YXJpZXR5IG9mIG9uZS1vZmYgc2ltcGxlIG1lc3NhZ2VzXG4gIHNpbmdsZVByb3RvSm9iUXVldWUuc3RyZWFtSm9icygpO1xuXG4gIC8vIFN5bmNzIHRvIG90aGVyc1xuICBkZWxpdmVyeVJlY2VpcHRzSm9iUXVldWUuc3RyZWFtSm9icygpO1xuICByZWFkUmVjZWlwdHNKb2JRdWV1ZS5zdHJlYW1Kb2JzKCk7XG4gIHZpZXdlZFJlY2VpcHRzSm9iUXVldWUuc3RyZWFtSm9icygpO1xuXG4gIC8vIFN5bmNzIHRvIG91cnNlbHZlc1xuICByZWFkU3luY0pvYlF1ZXVlLnN0cmVhbUpvYnMoKTtcbiAgdmlld1N5bmNKb2JRdWV1ZS5zdHJlYW1Kb2JzKCk7XG4gIHZpZXdPbmNlT3BlbkpvYlF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAvLyBPdGhlciBxdWV1ZXNcbiAgcmVtb3ZlU3RvcmFnZUtleUpvYlF1ZXVlLnN0cmVhbUpvYnMoKTtcbiAgcmVwb3J0U3BhbUpvYlF1ZXVlLnN0cmVhbUpvYnMoKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxrQ0FBcUM7QUFDckMsc0NBQXlDO0FBQ3pDLGtDQUFxQztBQUNyQyw4QkFBaUM7QUFDakMsc0NBQXlDO0FBQ3pDLGdDQUFtQztBQUNuQyxpQ0FBb0M7QUFDcEMsa0NBQXFDO0FBQ3JDLDhCQUFpQztBQUNqQyxvQ0FBdUM7QUFLaEMsZ0NBQWdDO0FBQUEsRUFDckM7QUFBQSxHQUdPO0FBQ1AsK0NBQW1CLFdBQVcsRUFBRSxPQUFPLENBQUM7QUFHeEMsbURBQXFCLFdBQVc7QUFHaEMsaURBQW9CLFdBQVc7QUFHL0IsMkRBQXlCLFdBQVc7QUFDcEMsbURBQXFCLFdBQVc7QUFDaEMsdURBQXVCLFdBQVc7QUFHbEMsMkNBQWlCLFdBQVc7QUFDNUIsMkNBQWlCLFdBQVc7QUFDNUIsbURBQXFCLFdBQVc7QUFHaEMsMkRBQXlCLFdBQVc7QUFDcEMsK0NBQW1CLFdBQVc7QUFDaEM7QUExQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
