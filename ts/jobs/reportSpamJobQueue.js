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
var reportSpamJobQueue_exports = {};
__export(reportSpamJobQueue_exports, {
  ReportSpamJobQueue: () => ReportSpamJobQueue,
  reportSpamJobQueue: () => reportSpamJobQueue
});
module.exports = __toCommonJS(reportSpamJobQueue_exports);
var z = __toESM(require("zod"));
var durations = __toESM(require("../util/durations"));
var import_assert = require("../util/assert");
var import_waitForOnline = require("../util/waitForOnline");
var import_registration = require("../util/registration");
var import_iterables = require("../util/iterables");
var import_sleep = require("../util/sleep");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
var import_parseIntWithFallback = require("../util/parseIntWithFallback");
var import_Errors = require("../textsecure/Errors");
const RETRY_WAIT_TIME = durations.MINUTE;
const RETRYABLE_4XX_FAILURE_STATUSES = /* @__PURE__ */ new Set([
  404,
  408,
  410,
  412,
  413,
  414,
  417,
  423,
  424,
  425,
  426,
  428,
  429,
  431,
  449
]);
const is4xxStatus = /* @__PURE__ */ __name((code) => code >= 400 && code <= 499, "is4xxStatus");
const is5xxStatus = /* @__PURE__ */ __name((code) => code >= 500 && code <= 599, "is5xxStatus");
const isRetriable4xxStatus = /* @__PURE__ */ __name((code) => RETRYABLE_4XX_FAILURE_STATUSES.has(code), "isRetriable4xxStatus");
const reportSpamJobDataSchema = z.object({
  uuid: z.string().min(1),
  serverGuids: z.string().array().min(1).max(1e3)
});
class ReportSpamJobQueue extends import_JobQueue.JobQueue {
  initialize({ server }) {
    this.server = server;
  }
  parseData(data) {
    return reportSpamJobDataSchema.parse(data);
  }
  async run({ data }, { log }) {
    const { uuid, serverGuids } = data;
    await new Promise((resolve) => {
      window.storage.onready(resolve);
    });
    if (!(0, import_registration.isDone)()) {
      log.info("reportSpamJobQueue: skipping this job because we're unlinked");
      return;
    }
    await (0, import_waitForOnline.waitForOnline)(window.navigator, window);
    const { server } = this;
    (0, import_assert.strictAssert)(server !== void 0, "ReportSpamJobQueue not initialized");
    try {
      await Promise.all((0, import_iterables.map)(serverGuids, (serverGuid) => server.reportMessage(uuid, serverGuid)));
    } catch (err) {
      if (!(err instanceof import_Errors.HTTPError)) {
        throw err;
      }
      const code = (0, import_parseIntWithFallback.parseIntWithFallback)(err.code, -1);
      if (code < 400) {
        throw err;
      }
      if (code === 508) {
        log.info("reportSpamJobQueue: server responded with 508. Giving up on this job");
        return;
      }
      if (isRetriable4xxStatus(code) || is5xxStatus(code)) {
        log.info(`reportSpamJobQueue: server responded with ${code} status code. Sleeping before our next attempt`);
        await (0, import_sleep.sleep)(RETRY_WAIT_TIME);
        throw err;
      }
      if (is4xxStatus(code)) {
        log.error(`reportSpamJobQueue: server responded with ${code} status code. Giving up on this job`);
        return;
      }
      throw err;
    }
  }
}
const reportSpamJobQueue = new ReportSpamJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "report spam",
  maxAttempts: 25
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReportSpamJobQueue,
  reportSpamJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVwb3J0U3BhbUpvYlF1ZXVlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIHogZnJvbSAnem9kJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyB3YWl0Rm9yT25saW5lIH0gZnJvbSAnLi4vdXRpbC93YWl0Rm9yT25saW5lJztcbmltcG9ydCB7IGlzRG9uZSBhcyBpc0RldmljZUxpbmtlZCB9IGZyb20gJy4uL3V0aWwvcmVnaXN0cmF0aW9uJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi4vdXRpbC9pdGVyYWJsZXMnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi91dGlsL3NsZWVwJztcblxuaW1wb3J0IHsgSm9iUXVldWUgfSBmcm9tICcuL0pvYlF1ZXVlJztcbmltcG9ydCB7IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSB9IGZyb20gJy4vSm9iUXVldWVEYXRhYmFzZVN0b3JlJztcbmltcG9ydCB7IHBhcnNlSW50V2l0aEZhbGxiYWNrIH0gZnJvbSAnLi4vdXRpbC9wYXJzZUludFdpdGhGYWxsYmFjayc7XG5pbXBvcnQgdHlwZSB7IFdlYkFQSVR5cGUgfSBmcm9tICcuLi90ZXh0c2VjdXJlL1dlYkFQSSc7XG5pbXBvcnQgeyBIVFRQRXJyb3IgfSBmcm9tICcuLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5cbmNvbnN0IFJFVFJZX1dBSVRfVElNRSA9IGR1cmF0aW9ucy5NSU5VVEU7XG5jb25zdCBSRVRSWUFCTEVfNFhYX0ZBSUxVUkVfU1RBVFVTRVMgPSBuZXcgU2V0KFtcbiAgNDA0LCA0MDgsIDQxMCwgNDEyLCA0MTMsIDQxNCwgNDE3LCA0MjMsIDQyNCwgNDI1LCA0MjYsIDQyOCwgNDI5LCA0MzEsIDQ0OSxcbl0pO1xuXG5jb25zdCBpczR4eFN0YXR1cyA9IChjb2RlOiBudW1iZXIpOiBib29sZWFuID0+IGNvZGUgPj0gNDAwICYmIGNvZGUgPD0gNDk5O1xuY29uc3QgaXM1eHhTdGF0dXMgPSAoY29kZTogbnVtYmVyKTogYm9vbGVhbiA9PiBjb2RlID49IDUwMCAmJiBjb2RlIDw9IDU5OTtcbmNvbnN0IGlzUmV0cmlhYmxlNHh4U3RhdHVzID0gKGNvZGU6IG51bWJlcik6IGJvb2xlYW4gPT5cbiAgUkVUUllBQkxFXzRYWF9GQUlMVVJFX1NUQVRVU0VTLmhhcyhjb2RlKTtcblxuY29uc3QgcmVwb3J0U3BhbUpvYkRhdGFTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIHV1aWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBzZXJ2ZXJHdWlkczogei5zdHJpbmcoKS5hcnJheSgpLm1pbigxKS5tYXgoMTAwMCksXG59KTtcblxuZXhwb3J0IHR5cGUgUmVwb3J0U3BhbUpvYkRhdGEgPSB6LmluZmVyPHR5cGVvZiByZXBvcnRTcGFtSm9iRGF0YVNjaGVtYT47XG5cbmV4cG9ydCBjbGFzcyBSZXBvcnRTcGFtSm9iUXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxSZXBvcnRTcGFtSm9iRGF0YT4ge1xuICBwcml2YXRlIHNlcnZlcj86IFdlYkFQSVR5cGU7XG5cbiAgcHVibGljIGluaXRpYWxpemUoeyBzZXJ2ZXIgfTogeyBzZXJ2ZXI6IFdlYkFQSVR5cGUgfSk6IHZvaWQge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogUmVwb3J0U3BhbUpvYkRhdGEge1xuICAgIHJldHVybiByZXBvcnRTcGFtSm9iRGF0YVNjaGVtYS5wYXJzZShkYXRhKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBydW4oXG4gICAgeyBkYXRhIH06IFJlYWRvbmx5PHsgZGF0YTogUmVwb3J0U3BhbUpvYkRhdGEgfT4sXG4gICAgeyBsb2cgfTogUmVhZG9ubHk8eyBsb2c6IExvZ2dlclR5cGUgfT5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyB1dWlkLCBzZXJ2ZXJHdWlkcyB9ID0gZGF0YTtcblxuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgd2luZG93LnN0b3JhZ2Uub25yZWFkeShyZXNvbHZlKTtcbiAgICB9KTtcblxuICAgIGlmICghaXNEZXZpY2VMaW5rZWQoKSkge1xuICAgICAgbG9nLmluZm8oXCJyZXBvcnRTcGFtSm9iUXVldWU6IHNraXBwaW5nIHRoaXMgam9iIGJlY2F1c2Ugd2UncmUgdW5saW5rZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgd2FpdEZvck9ubGluZSh3aW5kb3cubmF2aWdhdG9yLCB3aW5kb3cpO1xuXG4gICAgY29uc3QgeyBzZXJ2ZXIgfSA9IHRoaXM7XG4gICAgc3RyaWN0QXNzZXJ0KHNlcnZlciAhPT0gdW5kZWZpbmVkLCAnUmVwb3J0U3BhbUpvYlF1ZXVlIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBtYXAoc2VydmVyR3VpZHMsIHNlcnZlckd1aWQgPT4gc2VydmVyLnJlcG9ydE1lc3NhZ2UodXVpZCwgc2VydmVyR3VpZCkpXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgSFRUUEVycm9yKSkge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvZGUgPSBwYXJzZUludFdpdGhGYWxsYmFjayhlcnIuY29kZSwgLTEpO1xuXG4gICAgICAvLyBUaGlzIGlzIGFuIHVuZXhwZWN0ZWQgY2FzZSwgZXhjZXB0IGZvciAtMSwgd2hpY2ggY2FuIGhhcHBlbiBmb3IgbmV0d29yayBmYWlsdXJlcy5cbiAgICAgIGlmIChjb2RlIDwgNDAwKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvZGUgPT09IDUwOCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAncmVwb3J0U3BhbUpvYlF1ZXVlOiBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggNTA4LiBHaXZpbmcgdXAgb24gdGhpcyBqb2InXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzUmV0cmlhYmxlNHh4U3RhdHVzKGNvZGUpIHx8IGlzNXh4U3RhdHVzKGNvZGUpKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGByZXBvcnRTcGFtSm9iUXVldWU6IHNlcnZlciByZXNwb25kZWQgd2l0aCAke2NvZGV9IHN0YXR1cyBjb2RlLiBTbGVlcGluZyBiZWZvcmUgb3VyIG5leHQgYXR0ZW1wdGBcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoUkVUUllfV0FJVF9USU1FKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXM0eHhTdGF0dXMoY29kZSkpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGByZXBvcnRTcGFtSm9iUXVldWU6IHNlcnZlciByZXNwb25kZWQgd2l0aCAke2NvZGV9IHN0YXR1cyBjb2RlLiBHaXZpbmcgdXAgb24gdGhpcyBqb2JgXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVwb3J0U3BhbUpvYlF1ZXVlID0gbmV3IFJlcG9ydFNwYW1Kb2JRdWV1ZSh7XG4gIHN0b3JlOiBqb2JRdWV1ZURhdGFiYXNlU3RvcmUsXG4gIHF1ZXVlVHlwZTogJ3JlcG9ydCBzcGFtJyxc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
