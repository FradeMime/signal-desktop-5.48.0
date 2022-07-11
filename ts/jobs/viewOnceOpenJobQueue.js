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
var viewOnceOpenJobQueue_exports = {};
__export(viewOnceOpenJobQueue_exports, {
  ViewOnceOpenJobQueue: () => ViewOnceOpenJobQueue,
  viewOnceOpenJobQueue: () => viewOnceOpenJobQueue
});
module.exports = __toCommonJS(viewOnceOpenJobQueue_exports);
var durations = __toESM(require("../util/durations"));
var import_exponentialBackoff = require("../util/exponentialBackoff");
var import_syncHelpers = require("./helpers/syncHelpers");
var import_assert = require("../util/assert");
var import_isRecord = require("../util/isRecord");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
const MAX_RETRY_TIME = durations.DAY;
class ViewOnceOpenJobQueue extends import_JobQueue.JobQueue {
  parseData(data) {
    (0, import_assert.strictAssert)((0, import_isRecord.isRecord)(data), "data is not an object");
    return { viewOnceOpens: (0, import_syncHelpers.parseRawSyncDataArray)(data.viewOnceOpens) };
  }
  async run({
    data,
    timestamp
  }, { attempt, log }) {
    await (0, import_syncHelpers.runSyncJob)({
      attempt,
      log,
      maxRetryTime: MAX_RETRY_TIME,
      syncs: data.viewOnceOpens,
      timestamp,
      type: import_syncHelpers.SyncTypeList.ViewOnceOpen
    });
  }
}
const viewOnceOpenJobQueue = new ViewOnceOpenJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "view once open sync",
  maxAttempts: (0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(MAX_RETRY_TIME)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewOnceOpenJobQueue,
  viewOnceOpenJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidmlld09uY2VPcGVuSm9iUXVldWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgZXhwb25lbnRpYWxCYWNrb2ZmTWF4QXR0ZW1wdHMgfSBmcm9tICcuLi91dGlsL2V4cG9uZW50aWFsQmFja29mZic7XG5pbXBvcnQgdHlwZSB7IFN5bmNUeXBlIH0gZnJvbSAnLi9oZWxwZXJzL3N5bmNIZWxwZXJzJztcbmltcG9ydCB7XG4gIFN5bmNUeXBlTGlzdCxcbiAgcGFyc2VSYXdTeW5jRGF0YUFycmF5LFxuICBydW5TeW5jSm9iLFxufSBmcm9tICcuL2hlbHBlcnMvc3luY0hlbHBlcnMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi91dGlsL2lzUmVjb3JkJztcblxuaW1wb3J0IHsgSm9iUXVldWUgfSBmcm9tICcuL0pvYlF1ZXVlJztcbmltcG9ydCB7IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSB9IGZyb20gJy4vSm9iUXVldWVEYXRhYmFzZVN0b3JlJztcblxuY29uc3QgTUFYX1JFVFJZX1RJTUUgPSBkdXJhdGlvbnMuREFZO1xuXG5leHBvcnQgdHlwZSBWaWV3T25jZU9wZW5Kb2JEYXRhID0ge1xuICB2aWV3T25jZU9wZW5zOiBBcnJheTxTeW5jVHlwZT47XG59O1xuXG5leHBvcnQgY2xhc3MgVmlld09uY2VPcGVuSm9iUXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxWaWV3T25jZU9wZW5Kb2JEYXRhPiB7XG4gIHByb3RlY3RlZCBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IFZpZXdPbmNlT3BlbkpvYkRhdGEge1xuICAgIHN0cmljdEFzc2VydChpc1JlY29yZChkYXRhKSwgJ2RhdGEgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgIHJldHVybiB7IHZpZXdPbmNlT3BlbnM6IHBhcnNlUmF3U3luY0RhdGFBcnJheShkYXRhLnZpZXdPbmNlT3BlbnMpIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcnVuKFxuICAgIHtcbiAgICAgIGRhdGEsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTogUmVhZG9ubHk8eyBkYXRhOiBWaWV3T25jZU9wZW5Kb2JEYXRhOyB0aW1lc3RhbXA6IG51bWJlciB9PixcbiAgICB7IGF0dGVtcHQsIGxvZyB9OiBSZWFkb25seTx7IGF0dGVtcHQ6IG51bWJlcjsgbG9nOiBMb2dnZXJUeXBlIH0+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHJ1blN5bmNKb2Ioe1xuICAgICAgYXR0ZW1wdCxcbiAgICAgIGxvZyxcbiAgICAgIG1heFJldHJ5VGltZTogTUFYX1JFVFJZX1RJTUUsXG4gICAgICBzeW5jczogZGF0YS52aWV3T25jZU9wZW5zLFxuICAgICAgdGltZXN0YW1wLFxuICAgICAgdHlwZTogU3luY1R5cGVMaXN0LlZpZXdPbmNlT3BlbixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgdmlld09uY2VPcGVuSm9iUXVldWUgPSBuZXcgVmlld09uY2VPcGVuSm9iUXVldWUoe1xuICBzdG9yZTogam9iUXVldWVEYXRhYmFzZVN0b3JlLFxuICBxdWV1ZVR5cGU6ICd2aWV3IG9uY2Ugb3BlbiBzeW5jJyxcbiAgbWF4QXR0ZW1wdHM6IGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzKE1BWF9SRVRSWV9USU1FKSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQTJCO0FBRTNCLGdDQUE4QztBQUU5Qyx5QkFJTztBQUNQLG9CQUE2QjtBQUM3QixzQkFBeUI7QUFFekIsc0JBQXlCO0FBQ3pCLG1DQUFzQztBQUV0QyxNQUFNLGlCQUFpQixVQUFVO0FBTTFCLE1BQU0sNkJBQTZCLHlCQUE4QjtBQUFBLEVBQzVELFVBQVUsTUFBb0M7QUFDdEQsb0NBQWEsOEJBQVMsSUFBSSxHQUFHLHVCQUF1QjtBQUNwRCxXQUFPLEVBQUUsZUFBZSw4Q0FBc0IsS0FBSyxhQUFhLEVBQUU7QUFBQSxFQUNwRTtBQUFBLFFBRWdCLElBQ2Q7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLEtBRUYsRUFBRSxTQUFTLE9BQ0k7QUFDZixVQUFNLG1DQUFXO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLE9BQU8sS0FBSztBQUFBLE1BQ1o7QUFBQSxNQUNBLE1BQU0sZ0NBQWE7QUFBQSxJQUNyQixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBdEJPLEFBd0JBLE1BQU0sdUJBQXVCLElBQUkscUJBQXFCO0FBQUEsRUFDM0QsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsYUFBYSw2REFBOEIsY0FBYztBQUMzRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
