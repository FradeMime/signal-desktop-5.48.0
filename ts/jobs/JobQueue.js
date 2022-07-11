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
var JobQueue_exports = {};
__export(JobQueue_exports, {
  JobQueue: () => JobQueue
});
module.exports = __toCommonJS(JobQueue_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_uuid = require("uuid");
var import_lodash = require("lodash");
var import_Job = require("./Job");
var import_JobError = require("./JobError");
var import_assert = require("../util/assert");
var log = __toESM(require("../logging/log"));
var import_JobLogger = require("./JobLogger");
var Errors = __toESM(require("../types/errors"));
const noopOnCompleteCallbacks = {
  resolve: import_lodash.noop,
  reject: import_lodash.noop
};
class JobQueue {
  constructor(options) {
    this.onCompleteCallbacks = /* @__PURE__ */ new Map();
    this.defaultInMemoryQueue = new import_p_queue.default();
    this.started = false;
    (0, import_assert.assert)(Number.isInteger(options.maxAttempts) && options.maxAttempts >= 1, "maxAttempts should be a positive integer");
    (0, import_assert.assert)(options.maxAttempts <= Number.MAX_SAFE_INTEGER, "maxAttempts is too large");
    (0, import_assert.assert)(options.queueType.trim().length, "queueType should be a non-blank string");
    this.maxAttempts = options.maxAttempts;
    this.queueType = options.queueType;
    this.store = options.store;
    this.logger = options.logger ?? log;
    this.logPrefix = `${this.queueType} job queue:`;
  }
  async streamJobs() {
    if (this.started) {
      throw new Error(`${this.logPrefix} should not start streaming more than once`);
    }
    this.started = true;
    log.info(`${this.logPrefix} starting to stream jobs`);
    const stream = this.store.stream(this.queueType);
    for await (const storedJob of stream) {
      this.enqueueStoredJob(storedJob);
    }
  }
  async add(data, insert) {
    if (!this.started) {
      throw new Error(`${this.logPrefix} has not started streaming. Make sure to call streamJobs().`);
    }
    const job = this.createJob(data);
    if (insert) {
      await insert(job);
    }
    await this.store.insert(job, { shouldPersist: !insert });
    log.info(`${this.logPrefix} added new job ${job.id}`);
    return job;
  }
  createJob(data) {
    const id = (0, import_uuid.v4)();
    const timestamp = Date.now();
    const completionPromise = new Promise((resolve, reject) => {
      this.onCompleteCallbacks.set(id, { resolve, reject });
    });
    const completion = (async () => {
      try {
        await completionPromise;
      } catch (err) {
        throw new import_JobError.JobError(err);
      } finally {
        this.onCompleteCallbacks.delete(id);
      }
    })();
    return new import_Job.Job(id, timestamp, this.queueType, data, completion);
  }
  getInMemoryQueue(_parsedJob) {
    return this.defaultInMemoryQueue;
  }
  async enqueueStoredJob(storedJob) {
    (0, import_assert.assert)(storedJob.queueType === this.queueType, "Received a mis-matched queue type");
    log.info(`${this.logPrefix} enqueuing job ${storedJob.id}`);
    const { resolve, reject } = this.onCompleteCallbacks.get(storedJob.id) || noopOnCompleteCallbacks;
    let parsedData;
    try {
      parsedData = this.parseData(storedJob.data);
    } catch (err) {
      log.error(`${this.logPrefix} failed to parse data for job ${storedJob.id}, created ${storedJob.timestamp}. Deleting job. Parse error:`, Errors.toLogFormat(err));
      await this.store.delete(storedJob.id);
      reject(new Error("Failed to parse job data. Was unexpected data loaded from the database?"));
      return;
    }
    const parsedJob = {
      ...storedJob,
      data: parsedData
    };
    const queue = this.getInMemoryQueue(parsedJob);
    const logger = new import_JobLogger.JobLogger(parsedJob, this.logger);
    const result = await queue.add(async () => {
      for (let attempt = 1; attempt <= this.maxAttempts; attempt += 1) {
        const isFinalAttempt = attempt === this.maxAttempts;
        logger.attempt = attempt;
        log.info(`${this.logPrefix} running job ${storedJob.id}, attempt ${attempt} of ${this.maxAttempts}`);
        try {
          await this.run(parsedJob, { attempt, log: logger });
          log.info(`${this.logPrefix} job ${storedJob.id} succeeded on attempt ${attempt}`);
          return { success: true };
        } catch (err) {
          log.error(`${this.logPrefix} job ${storedJob.id} failed on attempt ${attempt}. ${Errors.toLogFormat(err)}`);
          if (isFinalAttempt) {
            return { success: false, err };
          }
        }
      }
      return void 0;
    });
    await this.store.delete(storedJob.id);
    (0, import_assert.assert)(result, "The job never ran. This indicates a developer error in the job queue");
    if (result.success) {
      resolve();
    } else {
      reject(result.err);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iUXVldWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBKb2IgfSBmcm9tICcuL0pvYic7XG5pbXBvcnQgeyBKb2JFcnJvciB9IGZyb20gJy4vSm9iRXJyb3InO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRKb2IsIFN0b3JlZEpvYiwgSm9iUXVldWVTdG9yZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IEpvYkxvZ2dlciB9IGZyb20gJy4vSm9iTG9nZ2VyJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5cbmNvbnN0IG5vb3BPbkNvbXBsZXRlQ2FsbGJhY2tzID0ge1xuICByZXNvbHZlOiBub29wLFxuICByZWplY3Q6IG5vb3AsXG59O1xuXG50eXBlIEpvYlF1ZXVlT3B0aW9ucyA9IHtcbiAgLyoqXG4gICAqIFRoZSBiYWNraW5nIHN0b3JlIGZvciBqb2JzLiBUeXBpY2FsbHkgYSB3cmFwcGVyIGFyb3VuZCB0aGUgZGF0YWJhc2UuXG4gICAqL1xuICBzdG9yZTogSm9iUXVldWVTdG9yZTtcblxuICAvKipcbiAgICogQSB1bmlxdWUgbmFtZSBmb3IgdGhpcyBqb2IgcXVldWUuIEZvciBleGFtcGxlLCBtaWdodCBiZSBcImF0dGFjaG1lbnQgZG93bmxvYWRzXCIgb3JcbiAgICogXCJtZXNzYWdlIHNlbmRcIi5cbiAgICovXG4gIHF1ZXVlVHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXR0ZW1wdHMgZm9yIGEgam9iIGluIHRoaXMgcXVldWUuIEEgdmFsdWUgb2YgMSB3aWxsIG5vdCBhbGxvd1xuICAgKiB0aGUgam9iIHRvIGZhaWw7IGEgdmFsdWUgb2YgMiB3aWxsIGFsbG93IHRoZSBqb2IgdG8gZmFpbCBvbmNlOyBldGMuXG4gICAqL1xuICBtYXhBdHRlbXB0czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBsb2dnZXIuIE1pZ2h0IGJlIG92ZXJ3cml0dGVuIGluIHRlc3QuXG4gICAqL1xuICBsb2dnZXI/OiBMb2dnZXJUeXBlO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEpvYlF1ZXVlPFQ+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtYXhBdHRlbXB0czogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcXVldWVUeXBlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdG9yZTogSm9iUXVldWVTdG9yZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyVHlwZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGxvZ1ByZWZpeDogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgb25Db21wbGV0ZUNhbGxiYWNrcyA9IG5ldyBNYXA8XG4gICAgc3RyaW5nLFxuICAgIHtcbiAgICAgIHJlc29sdmU6ICgpID0+IHZvaWQ7XG4gICAgICByZWplY3Q6IChlcnI6IHVua25vd24pID0+IHZvaWQ7XG4gICAgfVxuICA+KCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0SW5NZW1vcnlRdWV1ZSA9IG5ldyBQUXVldWUoKTtcblxuICBwcml2YXRlIHN0YXJ0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZWFkb25seTxKb2JRdWV1ZU9wdGlvbnM+KSB7XG4gICAgYXNzZXJ0KFxuICAgICAgTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLm1heEF0dGVtcHRzKSAmJiBvcHRpb25zLm1heEF0dGVtcHRzID49IDEsXG4gICAgICAnbWF4QXR0ZW1wdHMgc2hvdWxkIGJlIGEgcG9zaXRpdmUgaW50ZWdlcidcbiAgICApO1xuICAgIGFzc2VydChcbiAgICAgIG9wdGlvbnMubWF4QXR0ZW1wdHMgPD0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgICAnbWF4QXR0ZW1wdHMgaXMgdG9vIGxhcmdlJ1xuICAgICk7XG4gICAgYXNzZXJ0KFxuICAgICAgb3B0aW9ucy5xdWV1ZVR5cGUudHJpbSgpLmxlbmd0aCxcbiAgICAgICdxdWV1ZVR5cGUgc2hvdWxkIGJlIGEgbm9uLWJsYW5rIHN0cmluZydcbiAgICApO1xuXG4gICAgdGhpcy5tYXhBdHRlbXB0cyA9IG9wdGlvbnMubWF4QXR0ZW1wdHM7XG4gICAgdGhpcy5xdWV1ZVR5cGUgPSBvcHRpb25zLnF1ZXVlVHlwZTtcbiAgICB0aGlzLnN0b3JlID0gb3B0aW9ucy5zdG9yZTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyID8/IGxvZztcblxuICAgIHRoaXMubG9nUHJlZml4ID0gYCR7dGhpcy5xdWV1ZVR5cGV9IGpvYiBxdWV1ZTpgO1xuICB9XG5cbiAgLyoqXG4gICAqIGBwYXJzZURhdGFgIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHJhdyBkYXRhIGZyb20gYHN0b3JlYC4gRm9yIGV4YW1wbGUsIGlmIHRoZSBqb2JcbiAgICogdGFrZXMgYSBzaW5nbGUgbnVtYmVyLCBgcGFyc2VEYXRhYCBzaG91bGQgdGhyb3cgaWYgYGRhdGFgIGlzIGEgbnVtYmVyIGFuZCBzaG91bGRcbiAgICogcmV0dXJuIHRoZSBudW1iZXIgb3RoZXJ3aXNlLlxuICAgKlxuICAgKiBJZiBpdCB0aHJvd3MsIHRoZSBqb2Igd2lsbCBiZSBkZWxldGVkIGZyb20gdGhlIGRhdGFiYXNlIGFuZCB0aGUgam9iIHdpbGwgbm90IGJlIHJ1bi5cbiAgICpcbiAgICogV2lsbCBvbmx5IGJlIGNhbGxlZCBvbmNlIHBlciBqb2IsIGV2ZW4gaWYgYG1heEF0dGVtcHRzID4gMWAuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcGFyc2VEYXRhKGRhdGE6IHVua25vd24pOiBUO1xuXG4gIC8qKlxuICAgKiBSdW4gdGhlIGpvYiwgZ2l2ZW4gZGF0YS5cbiAgICpcbiAgICogSWYgaXQgcmVzb2x2ZXMsIHRoZSBqb2Igd2lsbCBiZSBkZWxldGVkIGZyb20gdGhlIHN0b3JlLlxuICAgKlxuICAgKiBJZiBpdCByZWplY3RzLCB0aGUgam9iIHdpbGwgYmUgcmV0cmllZCB1cCB0byBgbWF4QXR0ZW1wdHMgLSAxYCB0aW1lcywgYWZ0ZXIgd2hpY2ggaXRcbiAgICogd2lsbCBiZSBkZWxldGVkIGZyb20gdGhlIHN0b3JlLlxuICAgKlxuICAgKiBJZiB5b3VyIGpvYiBsb2dzIHRoaW5ncywgeW91J3JlIGVuY291cmFnZWQgdG8gdXNlIHRoZSBsb2dnZXIgcHJvdmlkZWQsIGFzIGl0XG4gICAqIGF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgZGVidWdnaW5nIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJ1bihcbiAgICBqb2I6IFJlYWRvbmx5PFBhcnNlZEpvYjxUPj4sXG4gICAgZXh0cmE/OiBSZWFkb25seTx7IGF0dGVtcHQ/OiBudW1iZXI7IGxvZz86IExvZ2dlclR5cGUgfT5cbiAgKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogU3RhcnQgc3RyZWFtaW5nIGpvYnMgZnJvbSB0aGUgc3RvcmUuXG4gICAqL1xuICBhc3luYyBzdHJlYW1Kb2JzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYCR7dGhpcy5sb2dQcmVmaXh9IHNob3VsZCBub3Qgc3RhcnQgc3RyZWFtaW5nIG1vcmUgdGhhbiBvbmNlYFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcblxuICAgIGxvZy5pbmZvKGAke3RoaXMubG9nUHJlZml4fSBzdGFydGluZyB0byBzdHJlYW0gam9ic2ApO1xuXG4gICAgY29uc3Qgc3RyZWFtID0gdGhpcy5zdG9yZS5zdHJlYW0odGhpcy5xdWV1ZVR5cGUpO1xuICAgIGZvciBhd2FpdCAoY29uc3Qgc3RvcmVkSm9iIG9mIHN0cmVhbSkge1xuICAgICAgdGhpcy5lbnF1ZXVlU3RvcmVkSm9iKHN0b3JlZEpvYik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGpvYiwgd2hpY2ggc2hvdWxkIGNhdXNlIGl0IHRvIGJlIGVucXVldWVkIGFuZCBydW4uXG4gICAqXG4gICAqIElmIGBzdHJlYW1Kb2JzYCBoYXMgbm90IGJlZW4gY2FsbGVkIHlldCwgdGhpcyB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgKlxuICAgKiBZb3UgY2FuIG92ZXJyaWRlIGBpbnNlcnRgIHRvIGNoYW5nZSB0aGUgd2F5IHRoZSBqb2IgaXMgYWRkZWQgdG8gdGhlIGRhdGFiYXNlLiBUaGlzIGlzXG4gICAqIHVzZWZ1bCBpZiB5b3UncmUgdHJ5aW5nIHRvIHNhdmUgYSBtZXNzYWdlIGFuZCBhIGpvYiBpbiB0aGUgc2FtZSBkYXRhYmFzZSB0cmFuc2FjdGlvbi5cbiAgICovXG4gIGFzeW5jIGFkZChcbiAgICBkYXRhOiBSZWFkb25seTxUPixcbiAgICBpbnNlcnQ/OiAoam9iOiBQYXJzZWRKb2I8VD4pID0+IFByb21pc2U8dm9pZD5cbiAgKTogUHJvbWlzZTxKb2I8VD4+IHtcbiAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgJHt0aGlzLmxvZ1ByZWZpeH0gaGFzIG5vdCBzdGFydGVkIHN0cmVhbWluZy4gTWFrZSBzdXJlIHRvIGNhbGwgc3RyZWFtSm9icygpLmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgam9iID0gdGhpcy5jcmVhdGVKb2IoZGF0YSk7XG5cbiAgICBpZiAoaW5zZXJ0KSB7XG4gICAgICBhd2FpdCBpbnNlcnQoam9iKTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5zdG9yZS5pbnNlcnQoam9iLCB7IHNob3VsZFBlcnNpc3Q6ICFpbnNlcnQgfSk7XG5cbiAgICBsb2cuaW5mbyhgJHt0aGlzLmxvZ1ByZWZpeH0gYWRkZWQgbmV3IGpvYiAke2pvYi5pZH1gKTtcbiAgICByZXR1cm4gam9iO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUpvYihkYXRhOiBSZWFkb25seTxUPik6IEpvYjxUPiB7XG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IGNvbXBsZXRpb25Qcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5vbkNvbXBsZXRlQ2FsbGJhY2tzLnNldChpZCwgeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgfSk7XG4gICAgY29uc3QgY29tcGxldGlvbiA9IChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjb21wbGV0aW9uUHJvbWlzZTtcbiAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICB0aHJvdyBuZXcgSm9iRXJyb3IoZXJyKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZUNhbGxiYWNrcy5kZWxldGUoaWQpO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gbmV3IEpvYihpZCwgdGltZXN0YW1wLCB0aGlzLnF1ZXVlVHlwZSwgZGF0YSwgY29tcGxldGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SW5NZW1vcnlRdWV1ZShfcGFyc2VkSm9iOiBQYXJzZWRKb2I8VD4pOiBQUXVldWUge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRJbk1lbW9yeVF1ZXVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBlbnF1ZXVlU3RvcmVkSm9iKHN0b3JlZEpvYjogUmVhZG9ubHk8U3RvcmVkSm9iPikge1xuICAgIGFzc2VydChcbiAgICAgIHN0b3JlZEpvYi5xdWV1ZVR5cGUgPT09IHRoaXMucXVldWVUeXBlLFxuICAgICAgJ1JlY2VpdmVkIGEgbWlzLW1hdGNoZWQgcXVldWUgdHlwZSdcbiAgICApO1xuXG4gICAgbG9nLmluZm8oYCR7dGhpcy5sb2dQcmVmaXh9IGVucXVldWluZyBqb2IgJHtzdG9yZWRKb2IuaWR9YCk7XG5cbiAgICAvLyBJdCdzIG9rYXkgaWYgd2UgZG9uJ3QgaGF2ZSBhIGNhbGxiYWNrOyB0aGF0IGxpa2VseSBtZWFucyB0aGUgam9iIHdhcyBjcmVhdGVkIGJlZm9yZVxuICAgIC8vICAgdGhlIHByb2Nlc3Mgd2FzIHN0YXJ0ZWQgKGUuZy4sIGZyb20gYSBwcmV2aW91cyBydW4pLlxuICAgIGNvbnN0IHsgcmVzb2x2ZSwgcmVqZWN0IH0gPVxuICAgICAgdGhpcy5vbkNvbXBsZXRlQ2FsbGJhY2tzLmdldChzdG9yZWRKb2IuaWQpIHx8IG5vb3BPbkNvbXBsZXRlQ2FsbGJhY2tzO1xuXG4gICAgbGV0IHBhcnNlZERhdGE6IFQ7XG4gICAgdHJ5IHtcbiAgICAgIHBhcnNlZERhdGEgPSB0aGlzLnBhcnNlRGF0YShzdG9yZWRKb2IuZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGAke3RoaXMubG9nUHJlZml4fSBmYWlsZWQgdG8gcGFyc2UgZGF0YSBmb3Igam9iICR7c3RvcmVkSm9iLmlkfSwgY3JlYXRlZCAke3N0b3JlZEpvYi50aW1lc3RhbXB9LiBEZWxldGluZyBqb2IuIFBhcnNlIGVycm9yOmAsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnIpXG4gICAgICApO1xuICAgICAgYXdhaXQgdGhpcy5zdG9yZS5kZWxldGUoc3RvcmVkSm9iLmlkKTtcbiAgICAgIHJlamVjdChcbiAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICdGYWlsZWQgdG8gcGFyc2Ugam9iIGRhdGEuIFdhcyB1bmV4cGVjdGVkIGRhdGEgbG9hZGVkIGZyb20gdGhlIGRhdGFiYXNlPydcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWRKb2I6IFBhcnNlZEpvYjxUPiA9IHtcbiAgICAgIC4uLnN0b3JlZEpvYixcbiAgICAgIGRhdGE6IHBhcnNlZERhdGEsXG4gICAgfTtcblxuICAgIGNvbnN0IHF1ZXVlOiBQUXVldWUgPSB0aGlzLmdldEluTWVtb3J5UXVldWUocGFyc2VkSm9iKTtcblxuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBKb2JMb2dnZXIocGFyc2VkSm9iLCB0aGlzLmxvZ2dlcik7XG5cbiAgICBjb25zdCByZXN1bHQ6XG4gICAgICB8IHVuZGVmaW5lZFxuICAgICAgfCB7IHN1Y2Nlc3M6IHRydWUgfVxuICAgICAgfCB7IHN1Y2Nlc3M6IGZhbHNlOyBlcnI6IHVua25vd24gfSA9IGF3YWl0IHF1ZXVlLmFkZChhc3luYyAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBhdHRlbXB0ID0gMTsgYXR0ZW1wdCA8PSB0aGlzLm1heEF0dGVtcHRzOyBhdHRlbXB0ICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXNGaW5hbEF0dGVtcHQgPSBhdHRlbXB0ID09PSB0aGlzLm1heEF0dGVtcHRzO1xuXG4gICAgICAgIGxvZ2dlci5hdHRlbXB0ID0gYXR0ZW1wdDtcblxuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgJHt0aGlzLmxvZ1ByZWZpeH0gcnVubmluZyBqb2IgJHtzdG9yZWRKb2IuaWR9LCBhdHRlbXB0ICR7YXR0ZW1wdH0gb2YgJHt0aGlzLm1heEF0dGVtcHRzfWBcbiAgICAgICAgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBXZSB3YW50IGFuIGBhd2FpdGAgaW4gdGhlIGxvb3AsIGFzIHdlIGRvbid0IHdhbnQgYSBzaW5nbGUgam9iIHJ1bm5pbmcgbW9yZVxuICAgICAgICAgIC8vICAgdGhhbiBvbmNlIGF0IGEgdGltZS4gSWRlYWxseSwgdGhlIGpvYiB3aWxsIHN1Y2NlZWQgb24gdGhlIGZpcnN0IGF0dGVtcHQuXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgICBhd2FpdCB0aGlzLnJ1bihwYXJzZWRKb2IsIHsgYXR0ZW1wdCwgbG9nOiBsb2dnZXIgfSk7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgJHt0aGlzLmxvZ1ByZWZpeH0gam9iICR7c3RvcmVkSm9iLmlkfSBzdWNjZWVkZWQgb24gYXR0ZW1wdCAke2F0dGVtcHR9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICBgJHt0aGlzLmxvZ1ByZWZpeH0gam9iICR7XG4gICAgICAgICAgICAgIHN0b3JlZEpvYi5pZFxuICAgICAgICAgICAgfSBmYWlsZWQgb24gYXR0ZW1wdCAke2F0dGVtcHR9LiAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnIpfWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpc0ZpbmFsQXR0ZW1wdCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVyciB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGlzIHNob3VsZCBuZXZlciBoYXBwZW4uIFNlZSB0aGUgYXNzZXJ0aW9uIGJlbG93LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMuc3RvcmUuZGVsZXRlKHN0b3JlZEpvYi5pZCk7XG5cbiAgICBhc3NlcnQoXG4gICAgICByZXN1bHQsXG4gICAgICAnVGhlIGpvYiBuZXZlciByYW4uIFRoaXMgaW5kaWNhdGVzIGEgZGV2ZWxvcGVyIGVycm9yIGluIHRoZSBqb2IgcXVldWUnXG4gICAgKTtcbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVqZWN0KHJlc3VsdC5lcnIpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHFCQUFtQjtBQUNuQixrQkFBMkI7QUFDM0Isb0JBQXFCO0FBRXJCLGlCQUFvQjtBQUNwQixzQkFBeUI7QUFFekIsb0JBQXVCO0FBQ3ZCLFVBQXFCO0FBQ3JCLHVCQUEwQjtBQUMxQixhQUF3QjtBQUd4QixNQUFNLDBCQUEwQjtBQUFBLEVBQzlCLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFDVjtBQTBCTyxNQUFlLFNBQVk7QUFBQSxFQXVCaEMsWUFBWSxTQUFvQztBQVovQiwrQkFBc0Isb0JBQUksSUFNekM7QUFFZSxnQ0FBdUIsSUFBSSx1QkFBTztBQUUzQyxtQkFBVTtBQUdoQiw4QkFDRSxPQUFPLFVBQVUsUUFBUSxXQUFXLEtBQUssUUFBUSxlQUFlLEdBQ2hFLDBDQUNGO0FBQ0EsOEJBQ0UsUUFBUSxlQUFlLE9BQU8sa0JBQzlCLDBCQUNGO0FBQ0EsOEJBQ0UsUUFBUSxVQUFVLEtBQUssRUFBRSxRQUN6Qix3Q0FDRjtBQUVBLFNBQUssY0FBYyxRQUFRO0FBQzNCLFNBQUssWUFBWSxRQUFRO0FBQ3pCLFNBQUssUUFBUSxRQUFRO0FBQ3JCLFNBQUssU0FBUyxRQUFRLFVBQVU7QUFFaEMsU0FBSyxZQUFZLEdBQUcsS0FBSztBQUFBLEVBQzNCO0FBQUEsUUFnQ00sYUFBNEI7QUFDaEMsUUFBSSxLQUFLLFNBQVM7QUFDaEIsWUFBTSxJQUFJLE1BQ1IsR0FBRyxLQUFLLHFEQUNWO0FBQUEsSUFDRjtBQUNBLFNBQUssVUFBVTtBQUVmLFFBQUksS0FBSyxHQUFHLEtBQUss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
