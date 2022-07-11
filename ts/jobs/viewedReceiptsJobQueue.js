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
var viewedReceiptsJobQueue_exports = {};
__export(viewedReceiptsJobQueue_exports, {
  ViewedReceiptsJobQueue: () => ViewedReceiptsJobQueue,
  viewedReceiptsJobQueue: () => viewedReceiptsJobQueue
});
module.exports = __toCommonJS(viewedReceiptsJobQueue_exports);
var import_zod = require("zod");
var import_exponentialBackoff = require("../util/exponentialBackoff");
var import_Receipt = require("../types/Receipt");
var import_receiptHelpers = require("./helpers/receiptHelpers");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
const viewedReceiptsJobDataSchema = import_zod.z.object({ viewedReceipt: import_Receipt.receiptSchema });
class ViewedReceiptsJobQueue extends import_JobQueue.JobQueue {
  parseData(data) {
    return viewedReceiptsJobDataSchema.parse(data);
  }
  async run({
    data,
    timestamp
  }, { attempt, log }) {
    await (0, import_receiptHelpers.runReceiptJob)({
      attempt,
      log,
      timestamp,
      receipts: [data.viewedReceipt],
      type: import_Receipt.ReceiptType.Viewed
    });
  }
}
const viewedReceiptsJobQueue = new ViewedReceiptsJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "viewed receipts",
  maxAttempts: (0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(import_receiptHelpers.MAX_RETRY_TIME)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewedReceiptsJobQueue,
  viewedReceiptsJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidmlld2VkUmVjZWlwdHNKb2JRdWV1ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgZXhwb25lbnRpYWxCYWNrb2ZmTWF4QXR0ZW1wdHMgfSBmcm9tICcuLi91dGlsL2V4cG9uZW50aWFsQmFja29mZic7XG5pbXBvcnQgeyByZWNlaXB0U2NoZW1hLCBSZWNlaXB0VHlwZSB9IGZyb20gJy4uL3R5cGVzL1JlY2VpcHQnO1xuaW1wb3J0IHsgTUFYX1JFVFJZX1RJTUUsIHJ1blJlY2VpcHRKb2IgfSBmcm9tICcuL2hlbHBlcnMvcmVjZWlwdEhlbHBlcnMnO1xuXG5pbXBvcnQgeyBKb2JRdWV1ZSB9IGZyb20gJy4vSm9iUXVldWUnO1xuaW1wb3J0IHsgam9iUXVldWVEYXRhYmFzZVN0b3JlIH0gZnJvbSAnLi9Kb2JRdWV1ZURhdGFiYXNlU3RvcmUnO1xuXG5jb25zdCB2aWV3ZWRSZWNlaXB0c0pvYkRhdGFTY2hlbWEgPSB6Lm9iamVjdCh7IHZpZXdlZFJlY2VpcHQ6IHJlY2VpcHRTY2hlbWEgfSk7XG5cbnR5cGUgVmlld2VkUmVjZWlwdHNKb2JEYXRhID0gei5pbmZlcjx0eXBlb2Ygdmlld2VkUmVjZWlwdHNKb2JEYXRhU2NoZW1hPjtcblxuZXhwb3J0IGNsYXNzIFZpZXdlZFJlY2VpcHRzSm9iUXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxWaWV3ZWRSZWNlaXB0c0pvYkRhdGE+IHtcbiAgcHJvdGVjdGVkIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogVmlld2VkUmVjZWlwdHNKb2JEYXRhIHtcbiAgICByZXR1cm4gdmlld2VkUmVjZWlwdHNKb2JEYXRhU2NoZW1hLnBhcnNlKGRhdGEpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJ1bihcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH06IFJlYWRvbmx5PHsgZGF0YTogVmlld2VkUmVjZWlwdHNKb2JEYXRhOyB0aW1lc3RhbXA6IG51bWJlciB9PixcbiAgICB7IGF0dGVtcHQsIGxvZyB9OiBSZWFkb25seTx7IGF0dGVtcHQ6IG51bWJlcjsgbG9nOiBMb2dnZXJUeXBlIH0+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHJ1blJlY2VpcHRKb2Ioe1xuICAgICAgYXR0ZW1wdCxcbiAgICAgIGxvZyxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIHJlY2VpcHRzOiBbZGF0YS52aWV3ZWRSZWNlaXB0XSxcbiAgICAgIHR5cGU6IFJlY2VpcHRUeXBlLlZpZXdlZCxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgdmlld2VkUmVjZWlwdHNKb2JRdWV1ZSA9IG5ldyBWaWV3ZWRSZWNlaXB0c0pvYlF1ZXVlKHtcbiAgc3RvcmU6IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSxcbiAgcXVldWVUeXBlOiAndmlld2VkIHJlY2VpcHRzJyxcbiAgbWF4QXR0ZW1wdHM6IGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzKE1BWF9SRVRSWV9USU1FKSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQWtCO0FBRWxCLGdDQUE4QztBQUM5QyxxQkFBMkM7QUFDM0MsNEJBQThDO0FBRTlDLHNCQUF5QjtBQUN6QixtQ0FBc0M7QUFFdEMsTUFBTSw4QkFBOEIsYUFBRSxPQUFPLEVBQUUsZUFBZSw2QkFBYyxDQUFDO0FBSXRFLE1BQU0sK0JBQStCLHlCQUFnQztBQUFBLEVBQ2hFLFVBQVUsTUFBc0M7QUFDeEQsV0FBTyw0QkFBNEIsTUFBTSxJQUFJO0FBQUEsRUFDL0M7QUFBQSxRQUVnQixJQUNkO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxLQUVGLEVBQUUsU0FBUyxPQUNJO0FBQ2YsVUFBTSx5Q0FBYztBQUFBLE1BQ2xCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFVBQVUsQ0FBQyxLQUFLLGFBQWE7QUFBQSxNQUM3QixNQUFNLDJCQUFZO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQXBCTyxBQXNCQSxNQUFNLHlCQUF5QixJQUFJLHVCQUF1QjtBQUFBLEVBQy9ELE9BQU87QUFBQSxFQUNQLFdBQVc7QUFBQSxFQUNYLGFBQWEsNkRBQThCLG9DQUFjO0FBQzNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
