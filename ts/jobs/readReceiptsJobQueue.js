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
var readReceiptsJobQueue_exports = {};
__export(readReceiptsJobQueue_exports, {
  ReadReceiptsJobQueue: () => ReadReceiptsJobQueue,
  readReceiptsJobQueue: () => readReceiptsJobQueue
});
module.exports = __toCommonJS(readReceiptsJobQueue_exports);
var import_zod = require("zod");
var import_exponentialBackoff = require("../util/exponentialBackoff");
var import_Receipt = require("../types/Receipt");
var import_receiptHelpers = require("./helpers/receiptHelpers");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
const readReceiptsJobDataSchema = import_zod.z.object({
  readReceipts: import_Receipt.receiptSchema.array()
});
class ReadReceiptsJobQueue extends import_JobQueue.JobQueue {
  async addIfAllowedByUser(storage, readReceipts) {
    if (storage.get("read-receipt-setting")) {
      await this.add({ readReceipts });
    }
  }
  parseData(data) {
    return readReceiptsJobDataSchema.parse(data);
  }
  async run({
    data,
    timestamp
  }, { attempt, log }) {
    await (0, import_receiptHelpers.runReceiptJob)({
      attempt,
      log,
      timestamp,
      receipts: data.readReceipts,
      type: import_Receipt.ReceiptType.Read
    });
  }
}
const readReceiptsJobQueue = new ReadReceiptsJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "read receipts",
  maxAttempts: (0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(import_receiptHelpers.MAX_RETRY_TIME)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadReceiptsJobQueue,
  readReceiptsJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhZFJlY2VpcHRzSm9iUXVldWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzIH0gZnJvbSAnLi4vdXRpbC9leHBvbmVudGlhbEJhY2tvZmYnO1xuaW1wb3J0IHR5cGUgeyBTdG9yYWdlSW50ZXJmYWNlIH0gZnJvbSAnLi4vdHlwZXMvU3RvcmFnZS5kJztcbmltcG9ydCB0eXBlIHsgUmVjZWlwdCB9IGZyb20gJy4uL3R5cGVzL1JlY2VpcHQnO1xuaW1wb3J0IHsgcmVjZWlwdFNjaGVtYSwgUmVjZWlwdFR5cGUgfSBmcm9tICcuLi90eXBlcy9SZWNlaXB0JztcbmltcG9ydCB7IE1BWF9SRVRSWV9USU1FLCBydW5SZWNlaXB0Sm9iIH0gZnJvbSAnLi9oZWxwZXJzL3JlY2VpcHRIZWxwZXJzJztcblxuaW1wb3J0IHsgSm9iUXVldWUgfSBmcm9tICcuL0pvYlF1ZXVlJztcbmltcG9ydCB7IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSB9IGZyb20gJy4vSm9iUXVldWVEYXRhYmFzZVN0b3JlJztcblxuY29uc3QgcmVhZFJlY2VpcHRzSm9iRGF0YVNjaGVtYSA9IHoub2JqZWN0KHtcbiAgcmVhZFJlY2VpcHRzOiByZWNlaXB0U2NoZW1hLmFycmF5KCksXG59KTtcblxudHlwZSBSZWFkUmVjZWlwdHNKb2JEYXRhID0gei5pbmZlcjx0eXBlb2YgcmVhZFJlY2VpcHRzSm9iRGF0YVNjaGVtYT47XG5cbmV4cG9ydCBjbGFzcyBSZWFkUmVjZWlwdHNKb2JRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPFJlYWRSZWNlaXB0c0pvYkRhdGE+IHtcbiAgcHVibGljIGFzeW5jIGFkZElmQWxsb3dlZEJ5VXNlcihcbiAgICBzdG9yYWdlOiBQaWNrPFN0b3JhZ2VJbnRlcmZhY2UsICdnZXQnPixcbiAgICByZWFkUmVjZWlwdHM6IEFycmF5PFJlY2VpcHQ+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChzdG9yYWdlLmdldCgncmVhZC1yZWNlaXB0LXNldHRpbmcnKSkge1xuICAgICAgYXdhaXQgdGhpcy5hZGQoeyByZWFkUmVjZWlwdHMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogUmVhZFJlY2VpcHRzSm9iRGF0YSB7XG4gICAgcmV0dXJuIHJlYWRSZWNlaXB0c0pvYkRhdGFTY2hlbWEucGFyc2UoZGF0YSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcnVuKFxuICAgIHtcbiAgICAgIGRhdGEsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTogUmVhZG9ubHk8eyBkYXRhOiBSZWFkUmVjZWlwdHNKb2JEYXRhOyB0aW1lc3RhbXA6IG51bWJlciB9PixcbiAgICB7IGF0dGVtcHQsIGxvZyB9OiBSZWFkb25seTx7IGF0dGVtcHQ6IG51bWJlcjsgbG9nOiBMb2dnZXJUeXBlIH0+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHJ1blJlY2VpcHRKb2Ioe1xuICAgICAgYXR0ZW1wdCxcbiAgICAgIGxvZyxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIHJlY2VpcHRzOiBkYXRhLnJlYWRSZWNlaXB0cyxcbiAgICAgIHR5cGU6IFJlY2VpcHRUeXBlLlJlYWQsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRSZWNlaXB0c0pvYlF1ZXVlID0gbmV3IFJlYWRSZWNlaXB0c0pvYlF1ZXVlKHtcbiAgc3RvcmU6IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSxcbiAgcXVldWVUeXBlOiAncmVhZCByZWNlaXB0cycsXG4gIG1heEF0dGVtcHRzOiBleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyhNQVhfUkVUUllfVElNRSksXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGlCQUFrQjtBQUVsQixnQ0FBOEM7QUFHOUMscUJBQTJDO0FBQzNDLDRCQUE4QztBQUU5QyxzQkFBeUI7QUFDekIsbUNBQXNDO0FBRXRDLE1BQU0sNEJBQTRCLGFBQUUsT0FBTztBQUFBLEVBQ3pDLGNBQWMsNkJBQWMsTUFBTTtBQUNwQyxDQUFDO0FBSU0sTUFBTSw2QkFBNkIseUJBQThCO0FBQUEsUUFDekQsbUJBQ1gsU0FDQSxjQUNlO0FBQ2YsUUFBSSxRQUFRLElBQUksc0JBQXNCLEdBQUc7QUFDdkMsWUFBTSxLQUFLLElBQUksRUFBRSxhQUFhLENBQUM7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFBQSxFQUVVLFVBQVUsTUFBb0M7QUFDdEQsV0FBTywwQkFBMEIsTUFBTSxJQUFJO0FBQUEsRUFDN0M7QUFBQSxRQUVnQixJQUNkO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxLQUVGLEVBQUUsU0FBUyxPQUNJO0FBQ2YsVUFBTSx5Q0FBYztBQUFBLE1BQ2xCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFVBQVUsS0FBSztBQUFBLE1BQ2YsTUFBTSwyQkFBWTtBQUFBLElBQ3BCLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUE3Qk8sQUErQkEsTUFBTSx1QkFBdUIsSUFBSSxxQkFBcUI7QUFBQSxFQUMzRCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxhQUFhLDZEQUE4QixvQ0FBYztBQUMzRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
