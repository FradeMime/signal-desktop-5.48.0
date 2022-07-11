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
var JobQueueDatabaseStore_exports = {};
__export(JobQueueDatabaseStore_exports, {
  JobQueueDatabaseStore: () => JobQueueDatabaseStore,
  jobQueueDatabaseStore: () => jobQueueDatabaseStore
});
module.exports = __toCommonJS(JobQueueDatabaseStore_exports);
var import_lodash = require("lodash");
var import_AsyncQueue = require("../util/AsyncQueue");
var import_asyncIterables = require("../util/asyncIterables");
var import_formatJobForInsert = require("./formatJobForInsert");
var import_Client = __toESM(require("../sql/Client"));
var log = __toESM(require("../logging/log"));
class JobQueueDatabaseStore {
  constructor(db) {
    this.db = db;
    this.activeQueueTypes = /* @__PURE__ */ new Set();
    this.queues = /* @__PURE__ */ new Map();
    this.initialFetchPromises = /* @__PURE__ */ new Map();
  }
  async insert(job, { shouldPersist = true } = {}) {
    log.info(`JobQueueDatabaseStore adding job ${job.id} to queue ${JSON.stringify(job.queueType)}`);
    const initialFetchPromise = this.initialFetchPromises.get(job.queueType);
    if (!initialFetchPromise) {
      throw new Error(`JobQueueDatabaseStore tried to add job for queue ${JSON.stringify(job.queueType)} but streaming had not yet started`);
    }
    await initialFetchPromise;
    if (shouldPersist) {
      await this.db.insertJob((0, import_formatJobForInsert.formatJobForInsert)(job));
    }
    this.getQueue(job.queueType).add(job);
  }
  async delete(id) {
    await this.db.deleteJob(id);
  }
  stream(queueType) {
    if (this.activeQueueTypes.has(queueType)) {
      throw new Error(`Cannot stream queue type ${JSON.stringify(queueType)} more than once`);
    }
    this.activeQueueTypes.add(queueType);
    return (0, import_asyncIterables.concat)([
      (0, import_asyncIterables.wrapPromise)(this.fetchJobsAtStart(queueType)),
      this.getQueue(queueType)
    ]);
  }
  getQueue(queueType) {
    const existingQueue = this.queues.get(queueType);
    if (existingQueue) {
      return existingQueue;
    }
    const result = new import_AsyncQueue.AsyncQueue();
    this.queues.set(queueType, result);
    return result;
  }
  async fetchJobsAtStart(queueType) {
    log.info(`JobQueueDatabaseStore fetching existing jobs for queue ${JSON.stringify(queueType)}`);
    let onFinished = import_lodash.noop;
    const initialFetchPromise = new Promise((resolve) => {
      onFinished = resolve;
    });
    this.initialFetchPromises.set(queueType, initialFetchPromise);
    const result = await this.db.getJobsInQueue(queueType);
    log.info(`JobQueueDatabaseStore finished fetching existing ${result.length} jobs for queue ${JSON.stringify(queueType)}`);
    onFinished();
    return result;
  }
}
const jobQueueDatabaseStore = new JobQueueDatabaseStore(import_Client.default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobQueueDatabaseStore,
  jobQueueDatabaseStore
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iUXVldWVEYXRhYmFzZVN0b3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQXN5bmNRdWV1ZSB9IGZyb20gJy4uL3V0aWwvQXN5bmNRdWV1ZSc7XG5pbXBvcnQgeyBjb25jYXQsIHdyYXBQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9hc3luY0l0ZXJhYmxlcyc7XG5pbXBvcnQgdHlwZSB7IEpvYlF1ZXVlU3RvcmUsIFN0b3JlZEpvYiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0Sm9iRm9ySW5zZXJ0IH0gZnJvbSAnLi9mb3JtYXRKb2JGb3JJbnNlcnQnO1xuaW1wb3J0IGRhdGFiYXNlSW50ZXJmYWNlIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxudHlwZSBEYXRhYmFzZSA9IHtcbiAgZ2V0Sm9ic0luUXVldWUocXVldWVUeXBlOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFN0b3JlZEpvYj4+O1xuICBpbnNlcnRKb2Ioam9iOiBSZWFkb25seTxTdG9yZWRKb2I+KTogUHJvbWlzZTx2b2lkPjtcbiAgZGVsZXRlSm9iKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xufTtcblxuZXhwb3J0IGNsYXNzIEpvYlF1ZXVlRGF0YWJhc2VTdG9yZSBpbXBsZW1lbnRzIEpvYlF1ZXVlU3RvcmUge1xuICBwcml2YXRlIGFjdGl2ZVF1ZXVlVHlwZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBwcml2YXRlIHF1ZXVlcyA9IG5ldyBNYXA8c3RyaW5nLCBBc3luY1F1ZXVlPFN0b3JlZEpvYj4+KCk7XG5cbiAgcHJpdmF0ZSBpbml0aWFsRmV0Y2hQcm9taXNlcyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPHZvaWQ+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZGI6IERhdGFiYXNlKSB7fVxuXG4gIGFzeW5jIGluc2VydChcbiAgICBqb2I6IFJlYWRvbmx5PFN0b3JlZEpvYj4sXG4gICAgeyBzaG91bGRQZXJzaXN0ID0gdHJ1ZSB9OiBSZWFkb25seTx7IHNob3VsZFBlcnNpc3Q/OiBib29sZWFuIH0+ID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgSm9iUXVldWVEYXRhYmFzZVN0b3JlIGFkZGluZyBqb2IgJHtqb2IuaWR9IHRvIHF1ZXVlICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIGpvYi5xdWV1ZVR5cGVcbiAgICAgICl9YFxuICAgICk7XG5cbiAgICBjb25zdCBpbml0aWFsRmV0Y2hQcm9taXNlID0gdGhpcy5pbml0aWFsRmV0Y2hQcm9taXNlcy5nZXQoam9iLnF1ZXVlVHlwZSk7XG4gICAgaWYgKCFpbml0aWFsRmV0Y2hQcm9taXNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBKb2JRdWV1ZURhdGFiYXNlU3RvcmUgdHJpZWQgdG8gYWRkIGpvYiBmb3IgcXVldWUgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICBqb2IucXVldWVUeXBlXG4gICAgICAgICl9IGJ1dCBzdHJlYW1pbmcgaGFkIG5vdCB5ZXQgc3RhcnRlZGBcbiAgICAgICk7XG4gICAgfVxuICAgIGF3YWl0IGluaXRpYWxGZXRjaFByb21pc2U7XG5cbiAgICBpZiAoc2hvdWxkUGVyc2lzdCkge1xuICAgICAgYXdhaXQgdGhpcy5kYi5pbnNlcnRKb2IoZm9ybWF0Sm9iRm9ySW5zZXJ0KGpvYikpO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0UXVldWUoam9iLnF1ZXVlVHlwZSkuYWRkKGpvYik7XG4gIH1cblxuICBhc3luYyBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuZGIuZGVsZXRlSm9iKGlkKTtcbiAgfVxuXG4gIHN0cmVhbShxdWV1ZVR5cGU6IHN0cmluZyk6IEFzeW5jSXRlcmFibGU8U3RvcmVkSm9iPiB7XG4gICAgaWYgKHRoaXMuYWN0aXZlUXVldWVUeXBlcy5oYXMocXVldWVUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQ2Fubm90IHN0cmVhbSBxdWV1ZSB0eXBlICR7SlNPTi5zdHJpbmdpZnkocXVldWVUeXBlKX0gbW9yZSB0aGFuIG9uY2VgXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVF1ZXVlVHlwZXMuYWRkKHF1ZXVlVHlwZSk7XG5cbiAgICByZXR1cm4gY29uY2F0KFtcbiAgICAgIHdyYXBQcm9taXNlKHRoaXMuZmV0Y2hKb2JzQXRTdGFydChxdWV1ZVR5cGUpKSxcbiAgICAgIHRoaXMuZ2V0UXVldWUocXVldWVUeXBlKSxcbiAgICBdKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVldWUocXVldWVUeXBlOiBzdHJpbmcpOiBBc3luY1F1ZXVlPFN0b3JlZEpvYj4ge1xuICAgIGNvbnN0IGV4aXN0aW5nUXVldWUgPSB0aGlzLnF1ZXVlcy5nZXQocXVldWVUeXBlKTtcbiAgICBpZiAoZXhpc3RpbmdRdWV1ZSkge1xuICAgICAgcmV0dXJuIGV4aXN0aW5nUXVldWU7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFzeW5jUXVldWU8U3RvcmVkSm9iPigpO1xuICAgIHRoaXMucXVldWVzLnNldChxdWV1ZVR5cGUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hKb2JzQXRTdGFydChxdWV1ZVR5cGU6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8U3RvcmVkSm9iPj4ge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYEpvYlF1ZXVlRGF0YWJhc2VTdG9yZSBmZXRjaGluZyBleGlzdGluZyBqb2JzIGZvciBxdWV1ZSAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBxdWV1ZVR5cGVcbiAgICAgICl9YFxuICAgICk7XG5cbiAgICAvLyBUaGlzIGlzIGluaXRpYWxpemVkIHRvIGBub29wYCBiZWNhdXNlIFR5cGVTY3JpcHQgZG9lc24ndCBrbm93IHRoYXQgYFByb21pc2VgIGNhbGxzXG4gICAgLy8gICBpdHMgY2FsbGJhY2sgc3luY2hyb25vdXNseSwgbWFraW5nIHN1cmUgYG9uRmluaXNoZWRgIGlzIGRlZmluZWQuXG4gICAgbGV0IG9uRmluaXNoZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIGNvbnN0IGluaXRpYWxGZXRjaFByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIG9uRmluaXNoZWQgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIHRoaXMuaW5pdGlhbEZldGNoUHJvbWlzZXMuc2V0KHF1ZXVlVHlwZSwgaW5pdGlhbEZldGNoUHJvbWlzZSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmRiLmdldEpvYnNJblF1ZXVlKHF1ZXVlVHlwZSk7XG4gICAgbG9nLmluZm8oXG4gICAgICBgSm9iUXVldWVEYXRhYmFzZVN0b3JlIGZpbmlzaGVkIGZldGNoaW5nIGV4aXN0aW5nICR7XG4gICAgICAgIHJlc3VsdC5sZW5ndGhcbiAgICAgIH0gam9icyBmb3IgcXVldWUgJHtKU09OLnN0cmluZ2lmeShxdWV1ZVR5cGUpfWBcbiAgICApO1xuICAgIG9uRmluaXNoZWQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBqb2JRdWV1ZURhdGFiYXNlU3RvcmUgPSBuZXcgSm9iUXVldWVEYXRhYmFzZVN0b3JlKFxuICBkYXRhYmFzZUludGVyZmFjZVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFxQjtBQUNyQix3QkFBMkI7QUFDM0IsNEJBQW9DO0FBRXBDLGdDQUFtQztBQUNuQyxvQkFBOEI7QUFDOUIsVUFBcUI7QUFRZCxNQUFNLHNCQUErQztBQUFBLEVBTzFELFlBQTZCLElBQWM7QUFBZDtBQU5yQiw0QkFBbUIsb0JBQUksSUFBWTtBQUVuQyxrQkFBUyxvQkFBSSxJQUFtQztBQUVoRCxnQ0FBdUIsb0JBQUksSUFBMkI7QUFBQSxFQUVsQjtBQUFBLFFBRXRDLE9BQ0osS0FDQSxFQUFFLGdCQUFnQixTQUFnRCxDQUFDLEdBQ3BEO0FBQ2YsUUFBSSxLQUNGLG9DQUFvQyxJQUFJLGVBQWUsS0FBSyxVQUMxRCxJQUFJLFNBQ04sR0FDRjtBQUVBLFVBQU0sc0JBQXNCLEtBQUsscUJBQXFCLElBQUksSUFBSSxTQUFTO0FBQ3ZFLFFBQUksQ0FBQyxxQkFBcUI7QUFDeEIsWUFBTSxJQUFJLE1BQ1Isb0RBQW9ELEtBQUssVUFDdkQsSUFBSSxTQUNOLHFDQUNGO0FBQUEsSUFDRjtBQUNBLFVBQU07QUFFTixRQUFJLGVBQWU7QUFDakIsWUFBTSxLQUFLLEdBQUcsVUFBVSxrREFBbUIsR0FBRyxDQUFDO0FBQUEsSUFDakQ7QUFFQSxTQUFLLFNBQVMsSUFBSSxTQUFTLEVBQUUsSUFBSSxHQUFHO0FBQUEsRUFDdEM7QUFBQSxRQUVNLE9BQU8sSUFBMkI7QUFDdEMsVUFBTSxLQUFLLEdBQUcsVUFBVSxFQUFFO0FBQUEsRUFDNUI7QUFBQSxFQUVBLE9BQU8sV0FBNkM7QUFDbEQsUUFBSSxLQUFLLGlCQUFpQixJQUFJLFNBQVMsR0FBRztBQUN4QyxZQUFNLElBQUksTUFDUiw0QkFBNEIsS0FBSyxVQUFVLFNBQVMsa0JBQ3REO0FBQUEsSUFDRjtBQUNBLFNBQUssaUJBQWlCLElBQUksU0FBUztBQUVuQyxXQUFPLGtDQUFPO0FBQUEsTUFDWix1Q0FBWSxLQUFLLGlCQUFpQixTQUFTLENBQUM7QUFBQSxNQUM1QyxLQUFLLFNBQVMsU0FBUztBQUFBLElBQ3pCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFUSxTQUFTLFdBQTBDO0FBQ3pELFVBQU0sZ0JBQWdCLEtBQUssT0FBTyxJQUFJLFNBQVM7QUFDL0MsUUFBSSxlQUFlO0FBQ2pCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxTQUFTLElBQUksNkJBQXNCO0FBQ3pDLFNBQUssT0FBTyxJQUFJLFdBQVcsTUFBTTtBQUNqQyxXQUFPO0FBQUEsRUFDVDtBQUFBLFFBRWMsaUJBQWlCLFdBQThDO0FBQzNFLFFBQUksS0FDRiwwREFBMEQsS0FBSyxVQUM3RCxTQUNGLEdBQ0Y7QUFJQSxRQUFJLGFBQXlCO0FBQzdCLFVBQU0sc0JBQXNCLElBQUksUUFBYyxhQUFXO0FBQ3ZELG1CQUFhO0FBQUEsSUFDZixDQUFDO0FBQ0QsU0FBSyxxQkFBcUIsSUFBSSxXQUFXLG1CQUFtQjtBQUU1RCxVQUFNLFNBQVMsTUFBTSxLQUFLLEdBQUcsZUFBZSxTQUFTO0FBQ3JELFFBQUksS0FDRixvREFDRSxPQUFPLHlCQUNVLEtBQUssVUFBVSxTQUFTLEdBQzdDO0FBQ0EsZUFBVztBQUNYLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUF6Rk8sQUEyRkEsTUFBTSx3QkFBd0IsSUFBSSxzQkFDdkMscUJBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
