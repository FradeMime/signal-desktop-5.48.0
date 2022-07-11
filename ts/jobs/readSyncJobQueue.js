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
var readSyncJobQueue_exports = {};
__export(readSyncJobQueue_exports, {
  ReadSyncJobQueue: () => ReadSyncJobQueue,
  readSyncJobQueue: () => readSyncJobQueue
});
module.exports = __toCommonJS(readSyncJobQueue_exports);
var durations = __toESM(require("../util/durations"));
var import_exponentialBackoff = require("../util/exponentialBackoff");
var import_syncHelpers = require("./helpers/syncHelpers");
var import_assert = require("../util/assert");
var import_isRecord = require("../util/isRecord");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
const MAX_RETRY_TIME = durations.DAY;
class ReadSyncJobQueue extends import_JobQueue.JobQueue {
  parseData(data) {
    (0, import_assert.strictAssert)((0, import_isRecord.isRecord)(data), "data is not an object");
    return { readSyncs: (0, import_syncHelpers.parseRawSyncDataArray)(data.readSyncs) };
  }
  async run({ data, timestamp }, { attempt, log }) {
    await (0, import_syncHelpers.runSyncJob)({
      attempt,
      log,
      maxRetryTime: MAX_RETRY_TIME,
      syncs: data.readSyncs,
      timestamp,
      type: import_syncHelpers.SyncTypeList.Read
    });
  }
}
const readSyncJobQueue = new ReadSyncJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "read sync",
  maxAttempts: (0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(MAX_RETRY_TIME)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadSyncJobQueue,
  readSyncJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhZFN5bmNKb2JRdWV1ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzIH0gZnJvbSAnLi4vdXRpbC9leHBvbmVudGlhbEJhY2tvZmYnO1xuaW1wb3J0IHR5cGUgeyBTeW5jVHlwZSB9IGZyb20gJy4vaGVscGVycy9zeW5jSGVscGVycyc7XG5pbXBvcnQge1xuICBTeW5jVHlwZUxpc3QsXG4gIHBhcnNlUmF3U3luY0RhdGFBcnJheSxcbiAgcnVuU3luY0pvYixcbn0gZnJvbSAnLi9oZWxwZXJzL3N5bmNIZWxwZXJzJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IGlzUmVjb3JkIH0gZnJvbSAnLi4vdXRpbC9pc1JlY29yZCc7XG5cbmltcG9ydCB7IEpvYlF1ZXVlIH0gZnJvbSAnLi9Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBqb2JRdWV1ZURhdGFiYXNlU3RvcmUgfSBmcm9tICcuL0pvYlF1ZXVlRGF0YWJhc2VTdG9yZSc7XG5cbmNvbnN0IE1BWF9SRVRSWV9USU1FID0gZHVyYXRpb25zLkRBWTtcblxuZXhwb3J0IHR5cGUgUmVhZFN5bmNKb2JEYXRhID0ge1xuICByZWFkU3luY3M6IEFycmF5PFN5bmNUeXBlPjtcbn07XG5cbmV4cG9ydCBjbGFzcyBSZWFkU3luY0pvYlF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8UmVhZFN5bmNKb2JEYXRhPiB7XG4gIHByb3RlY3RlZCBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IFJlYWRTeW5jSm9iRGF0YSB7XG4gICAgc3RyaWN0QXNzZXJ0KGlzUmVjb3JkKGRhdGEpLCAnZGF0YSBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgcmV0dXJuIHsgcmVhZFN5bmNzOiBwYXJzZVJhd1N5bmNEYXRhQXJyYXkoZGF0YS5yZWFkU3luY3MpIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcnVuKFxuICAgIHsgZGF0YSwgdGltZXN0YW1wIH06IFJlYWRvbmx5PHsgZGF0YTogUmVhZFN5bmNKb2JEYXRhOyB0aW1lc3RhbXA6IG51bWJlciB9PixcbiAgICB7IGF0dGVtcHQsIGxvZyB9OiBSZWFkb25seTx7IGF0dGVtcHQ6IG51bWJlcjsgbG9nOiBMb2dnZXJUeXBlIH0+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHJ1blN5bmNKb2Ioe1xuICAgICAgYXR0ZW1wdCxcbiAgICAgIGxvZyxcbiAgICAgIG1heFJldHJ5VGltZTogTUFYX1JFVFJZX1RJTUUsXG4gICAgICBzeW5jczogZGF0YS5yZWFkU3luY3MsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICB0eXBlOiBTeW5jVHlwZUxpc3QuUmVhZCxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVhZFN5bmNKb2JRdWV1ZSA9IG5ldyBSZWFkU3luY0pvYlF1ZXVlKHtcbiAgc3RvcmU6IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSxcbiAgcXVldWVUeXBlOiAncmVhZCBzeW5jJyxcbiAgbWF4QXR0ZW1wdHM6IGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzKE1BWF9SRVRSWV9USU1FKSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQTJCO0FBRTNCLGdDQUE4QztBQUU5Qyx5QkFJTztBQUNQLG9CQUE2QjtBQUM3QixzQkFBeUI7QUFFekIsc0JBQXlCO0FBQ3pCLG1DQUFzQztBQUV0QyxNQUFNLGlCQUFpQixVQUFVO0FBTTFCLE1BQU0seUJBQXlCLHlCQUEwQjtBQUFBLEVBQ3BELFVBQVUsTUFBZ0M7QUFDbEQsb0NBQWEsOEJBQVMsSUFBSSxHQUFHLHVCQUF1QjtBQUNwRCxXQUFPLEVBQUUsV0FBVyw4Q0FBc0IsS0FBSyxTQUFTLEVBQUU7QUFBQSxFQUM1RDtBQUFBLFFBRWdCLElBQ2QsRUFBRSxNQUFNLGFBQ1IsRUFBRSxTQUFTLE9BQ0k7QUFDZixVQUFNLG1DQUFXO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLE9BQU8sS0FBSztBQUFBLE1BQ1o7QUFBQSxNQUNBLE1BQU0sZ0NBQWE7QUFBQSxJQUNyQixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBbkJPLEFBcUJBLE1BQU0sbUJBQW1CLElBQUksaUJBQWlCO0FBQUEsRUFDbkQsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsYUFBYSw2REFBOEIsY0FBYztBQUMzRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
