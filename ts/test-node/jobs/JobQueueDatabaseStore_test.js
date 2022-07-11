var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var sinon = __toESM(require("sinon"));
var import_lodash = require("lodash");
var import_JobQueueDatabaseStore = require("../../jobs/JobQueueDatabaseStore");
describe("JobQueueDatabaseStore", () => {
  let fakeDatabase;
  beforeEach(() => {
    fakeDatabase = {
      getJobsInQueue: sinon.stub().resolves([]),
      insertJob: sinon.stub(),
      deleteJob: sinon.stub()
    };
  });
  describe("insert", () => {
    it("fails if streaming hasn't started yet", async () => {
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      let error;
      try {
        await store.insert({
          id: "abc",
          timestamp: 1234,
          queueType: "test queue",
          data: { hi: 5 }
        });
      } catch (err) {
        error = err;
      }
      import_chai.assert.instanceOf(error, Error);
    });
    it("adds jobs to the database", async () => {
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      store.stream("test queue");
      await store.insert({
        id: "abc",
        timestamp: 1234,
        queueType: "test queue",
        data: { hi: 5 }
      });
      sinon.assert.calledOnce(fakeDatabase.insertJob);
      sinon.assert.calledWithMatch(fakeDatabase.insertJob, {
        id: "abc",
        timestamp: 1234,
        queueType: "test queue",
        data: { hi: 5 }
      });
    });
    it("enqueues jobs after putting them in the database", async () => {
      const events = [];
      fakeDatabase.insertJob.callsFake(() => {
        events.push("insert");
      });
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      const streamPromise = (async () => {
        for await (const _job of store.stream("test queue")) {
          events.push("yielded job");
          break;
        }
      })();
      await store.insert({
        id: "abc",
        timestamp: 1234,
        queueType: "test queue",
        data: { hi: 5 }
      });
      await streamPromise;
      import_chai.assert.deepEqual(events, ["insert", "yielded job"]);
    });
    it("can skip the database", async () => {
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      const streamPromise = (async () => {
        for await (const _job of store.stream("test queue")) {
          break;
        }
      })();
      await store.insert({
        id: "abc",
        timestamp: 1234,
        queueType: "test queue",
        data: { hi: 5 }
      }, { shouldPersist: false });
      await streamPromise;
      sinon.assert.notCalled(fakeDatabase.insertJob);
    });
    it("doesn't insert jobs until the initial fetch has completed", async () => {
      const events = [];
      let resolveGetJobsInQueue = import_lodash.noop;
      const getJobsInQueuePromise = new Promise((resolve) => {
        resolveGetJobsInQueue = resolve;
      });
      fakeDatabase.getJobsInQueue.callsFake(() => {
        events.push("loaded jobs");
        return getJobsInQueuePromise;
      });
      fakeDatabase.insertJob.callsFake(() => {
        events.push("insert");
      });
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      store.stream("test queue");
      const insertPromise = store.insert({
        id: "abc",
        timestamp: 1234,
        queueType: "test queue",
        data: { hi: 5 }
      });
      sinon.assert.notCalled(fakeDatabase.insertJob);
      resolveGetJobsInQueue([]);
      await insertPromise;
      sinon.assert.calledOnce(fakeDatabase.insertJob);
      import_chai.assert.deepEqual(events, ["loaded jobs", "insert"]);
    });
  });
  describe("delete", () => {
    it("deletes jobs from the database", async () => {
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      await store.delete("xyz");
      sinon.assert.calledOnce(fakeDatabase.deleteJob);
      sinon.assert.calledWith(fakeDatabase.deleteJob, "xyz");
    });
  });
  describe("stream", () => {
    it("yields all values in the database, then all values inserted", async () => {
      const makeJob = /* @__PURE__ */ __name((id, queueType) => ({
        id,
        timestamp: Date.now(),
        queueType,
        data: { hi: 5 }
      }), "makeJob");
      const ids = /* @__PURE__ */ __name(async (stream, amount) => {
        const result = [];
        for await (const job of stream) {
          result.push(job.id);
          if (result.length >= amount) {
            break;
          }
        }
        return result;
      }, "ids");
      fakeDatabase.getJobsInQueue.withArgs("queue A").resolves([
        makeJob("A.1", "queue A"),
        makeJob("A.2", "queue A"),
        makeJob("A.3", "queue A")
      ]);
      fakeDatabase.getJobsInQueue.withArgs("queue B").resolves([]);
      fakeDatabase.getJobsInQueue.withArgs("queue C").resolves([makeJob("C.1", "queue C"), makeJob("C.2", "queue C")]);
      const store = new import_JobQueueDatabaseStore.JobQueueDatabaseStore(fakeDatabase);
      const streamA = store.stream("queue A");
      const streamB = store.stream("queue B");
      const streamC = store.stream("queue C");
      await store.insert(makeJob("A.4", "queue A"));
      await store.insert(makeJob("C.3", "queue C"));
      await store.insert(makeJob("B.1", "queue B"));
      await store.insert(makeJob("A.5", "queue A"));
      const streamAIds = await ids(streamA, 5);
      const streamBIds = await ids(streamB, 1);
      const streamCIds = await ids(streamC, 3);
      import_chai.assert.deepEqual(streamAIds, ["A.1", "A.2", "A.3", "A.4", "A.5"]);
      import_chai.assert.deepEqual(streamBIds, ["B.1"]);
      import_chai.assert.deepEqual(streamCIds, ["C.1", "C.2", "C.3"]);
      sinon.assert.calledThrice(fakeDatabase.getJobsInQueue);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iUXVldWVEYXRhYmFzZVN0b3JlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgU3RvcmVkSm9iIH0gZnJvbSAnLi4vLi4vam9icy90eXBlcyc7XG5cbmltcG9ydCB7IEpvYlF1ZXVlRGF0YWJhc2VTdG9yZSB9IGZyb20gJy4uLy4uL2pvYnMvSm9iUXVldWVEYXRhYmFzZVN0b3JlJztcblxuZGVzY3JpYmUoJ0pvYlF1ZXVlRGF0YWJhc2VTdG9yZScsICgpID0+IHtcbiAgbGV0IGZha2VEYXRhYmFzZToge1xuICAgIGdldEpvYnNJblF1ZXVlOiBzaW5vbi5TaW5vblN0dWI7XG4gICAgaW5zZXJ0Sm9iOiBzaW5vbi5TaW5vblN0dWI7XG4gICAgZGVsZXRlSm9iOiBzaW5vbi5TaW5vblN0dWI7XG4gIH07XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZmFrZURhdGFiYXNlID0ge1xuICAgICAgZ2V0Sm9ic0luUXVldWU6IHNpbm9uLnN0dWIoKS5yZXNvbHZlcyhbXSksXG4gICAgICBpbnNlcnRKb2I6IHNpbm9uLnN0dWIoKSxcbiAgICAgIGRlbGV0ZUpvYjogc2lub24uc3R1YigpLFxuICAgIH07XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpbnNlcnQnLCAoKSA9PiB7XG4gICAgaXQoXCJmYWlscyBpZiBzdHJlYW1pbmcgaGFzbid0IHN0YXJ0ZWQgeWV0XCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IEpvYlF1ZXVlRGF0YWJhc2VTdG9yZShmYWtlRGF0YWJhc2UpO1xuXG4gICAgICBsZXQgZXJyb3I6IHVua25vd247XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBzdG9yZS5pbnNlcnQoe1xuICAgICAgICAgIGlkOiAnYWJjJyxcbiAgICAgICAgICB0aW1lc3RhbXA6IDEyMzQsXG4gICAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgICAgZGF0YTogeyBoaTogNSB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0Lmluc3RhbmNlT2YoZXJyb3IsIEVycm9yKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGpvYnMgdG8gdGhlIGRhdGFiYXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RvcmUgPSBuZXcgSm9iUXVldWVEYXRhYmFzZVN0b3JlKGZha2VEYXRhYmFzZSk7XG4gICAgICBzdG9yZS5zdHJlYW0oJ3Rlc3QgcXVldWUnKTtcblxuICAgICAgYXdhaXQgc3RvcmUuaW5zZXJ0KHtcbiAgICAgICAgaWQ6ICdhYmMnLFxuICAgICAgICB0aW1lc3RhbXA6IDEyMzQsXG4gICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUnLFxuICAgICAgICBkYXRhOiB7IGhpOiA1IH0sXG4gICAgICB9KTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmFrZURhdGFiYXNlLmluc2VydEpvYik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aE1hdGNoKGZha2VEYXRhYmFzZS5pbnNlcnRKb2IsIHtcbiAgICAgICAgaWQ6ICdhYmMnLFxuICAgICAgICB0aW1lc3RhbXA6IDEyMzQsXG4gICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUnLFxuICAgICAgICBkYXRhOiB7IGhpOiA1IH0sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdlbnF1ZXVlcyBqb2JzIGFmdGVyIHB1dHRpbmcgdGhlbSBpbiB0aGUgZGF0YWJhc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudHM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgZmFrZURhdGFiYXNlLmluc2VydEpvYi5jYWxsc0Zha2UoKCkgPT4ge1xuICAgICAgICBldmVudHMucHVzaCgnaW5zZXJ0Jyk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc3RvcmUgPSBuZXcgSm9iUXVldWVEYXRhYmFzZVN0b3JlKGZha2VEYXRhYmFzZSk7XG5cbiAgICAgIGNvbnN0IHN0cmVhbVByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBXZSBkb24ndCBhY3R1YWxseSBjYXJlIGFib3V0IHVzaW5nIHRoZSB2YXJpYWJsZSBmcm9tIHRoZSBhc3luYyBpdGVyYWJsZS5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IF9qb2Igb2Ygc3RvcmUuc3RyZWFtKCd0ZXN0IHF1ZXVlJykpIHtcbiAgICAgICAgICBldmVudHMucHVzaCgneWllbGRlZCBqb2InKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSkoKTtcblxuICAgICAgYXdhaXQgc3RvcmUuaW5zZXJ0KHtcbiAgICAgICAgaWQ6ICdhYmMnLFxuICAgICAgICB0aW1lc3RhbXA6IDEyMzQsXG4gICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUnLFxuICAgICAgICBkYXRhOiB7IGhpOiA1IH0sXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgc3RyZWFtUHJvbWlzZTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChldmVudHMsIFsnaW5zZXJ0JywgJ3lpZWxkZWQgam9iJ10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbiBza2lwIHRoZSBkYXRhYmFzZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IEpvYlF1ZXVlRGF0YWJhc2VTdG9yZShmYWtlRGF0YWJhc2UpO1xuXG4gICAgICBjb25zdCBzdHJlYW1Qcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gV2UgZG9uJ3QgYWN0dWFsbHkgY2FyZSBhYm91dCB1c2luZyB0aGUgdmFyaWFibGUgZnJvbSB0aGUgYXN5bmMgaXRlcmFibGUuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBfam9iIG9mIHN0b3JlLnN0cmVhbSgndGVzdCBxdWV1ZScpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG5cbiAgICAgIGF3YWl0IHN0b3JlLmluc2VydChcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnYWJjJyxcbiAgICAgICAgICB0aW1lc3RhbXA6IDEyMzQsXG4gICAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgICAgZGF0YTogeyBoaTogNSB9LFxuICAgICAgICB9LFxuICAgICAgICB7IHNob3VsZFBlcnNpc3Q6IGZhbHNlIH1cbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IHN0cmVhbVByb21pc2U7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZURhdGFiYXNlLmluc2VydEpvYik7XG4gICAgfSk7XG5cbiAgICBpdChcImRvZXNuJ3QgaW5zZXJ0IGpvYnMgdW50aWwgdGhlIGluaXRpYWwgZmV0Y2ggaGFzIGNvbXBsZXRlZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudHM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgbGV0IHJlc29sdmVHZXRKb2JzSW5RdWV1ZSA9IG5vb3A7XG4gICAgICBjb25zdCBnZXRKb2JzSW5RdWV1ZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZUdldEpvYnNJblF1ZXVlID0gcmVzb2x2ZTtcbiAgICAgIH0pO1xuXG4gICAgICBmYWtlRGF0YWJhc2UuZ2V0Sm9ic0luUXVldWUuY2FsbHNGYWtlKCgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goJ2xvYWRlZCBqb2JzJyk7XG4gICAgICAgIHJldHVybiBnZXRKb2JzSW5RdWV1ZVByb21pc2U7XG4gICAgICB9KTtcbiAgICAgIGZha2VEYXRhYmFzZS5pbnNlcnRKb2IuY2FsbHNGYWtlKCgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goJ2luc2VydCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IEpvYlF1ZXVlRGF0YWJhc2VTdG9yZShmYWtlRGF0YWJhc2UpO1xuICAgICAgc3RvcmUuc3RyZWFtKCd0ZXN0IHF1ZXVlJyk7XG5cbiAgICAgIGNvbnN0IGluc2VydFByb21pc2UgPSBzdG9yZS5pbnNlcnQoe1xuICAgICAgICBpZDogJ2FiYycsXG4gICAgICAgIHRpbWVzdGFtcDogMTIzNCxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgIGRhdGE6IHsgaGk6IDUgfSxcbiAgICAgIH0pO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VEYXRhYmFzZS5pbnNlcnRKb2IpO1xuXG4gICAgICByZXNvbHZlR2V0Sm9ic0luUXVldWUoW10pO1xuICAgICAgYXdhaXQgaW5zZXJ0UHJvbWlzZTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmFrZURhdGFiYXNlLmluc2VydEpvYik7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGV2ZW50cywgWydsb2FkZWQgam9icycsICdpbnNlcnQnXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdkZWxldGUnLCAoKSA9PiB7XG4gICAgaXQoJ2RlbGV0ZXMgam9icyBmcm9tIHRoZSBkYXRhYmFzZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IEpvYlF1ZXVlRGF0YWJhc2VTdG9yZShmYWtlRGF0YWJhc2UpO1xuXG4gICAgICBhd2FpdCBzdG9yZS5kZWxldGUoJ3h5eicpO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlRGF0YWJhc2UuZGVsZXRlSm9iKTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGZha2VEYXRhYmFzZS5kZWxldGVKb2IsICd4eXonKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3N0cmVhbScsICgpID0+IHtcbiAgICBpdCgneWllbGRzIGFsbCB2YWx1ZXMgaW4gdGhlIGRhdGFiYXNlLCB0aGVuIGFsbCB2YWx1ZXMgaW5zZXJ0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBtYWtlSm9iID0gKGlkOiBzdHJpbmcsIHF1ZXVlVHlwZTogc3RyaW5nKSA9PiAoe1xuICAgICAgICBpZCxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICBxdWV1ZVR5cGUsXG4gICAgICAgIGRhdGE6IHsgaGk6IDUgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpZHMgPSBhc3luYyAoXG4gICAgICAgIHN0cmVhbTogQXN5bmNJdGVyYWJsZTxTdG9yZWRKb2I+LFxuICAgICAgICBhbW91bnQ6IG51bWJlclxuICAgICAgKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGpvYiBvZiBzdHJlYW0pIHtcbiAgICAgICAgICByZXN1bHQucHVzaChqb2IuaWQpO1xuICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IGFtb3VudCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuXG4gICAgICBmYWtlRGF0YWJhc2UuZ2V0Sm9ic0luUXVldWVcbiAgICAgICAgLndpdGhBcmdzKCdxdWV1ZSBBJylcbiAgICAgICAgLnJlc29sdmVzKFtcbiAgICAgICAgICBtYWtlSm9iKCdBLjEnLCAncXVldWUgQScpLFxuICAgICAgICAgIG1ha2VKb2IoJ0EuMicsICdxdWV1ZSBBJyksXG4gICAgICAgICAgbWFrZUpvYignQS4zJywgJ3F1ZXVlIEEnKSxcbiAgICAgICAgXSk7XG5cbiAgICAgIGZha2VEYXRhYmFzZS5nZXRKb2JzSW5RdWV1ZS53aXRoQXJncygncXVldWUgQicpLnJlc29sdmVzKFtdKTtcblxuICAgICAgZmFrZURhdGFiYXNlLmdldEpvYnNJblF1ZXVlXG4gICAgICAgIC53aXRoQXJncygncXVldWUgQycpXG4gICAgICAgIC5yZXNvbHZlcyhbbWFrZUpvYignQy4xJywgJ3F1ZXVlIEMnKSwgbWFrZUpvYignQy4yJywgJ3F1ZXVlIEMnKV0pO1xuXG4gICAgICBjb25zdCBzdG9yZSA9IG5ldyBKb2JRdWV1ZURhdGFiYXNlU3RvcmUoZmFrZURhdGFiYXNlKTtcblxuICAgICAgY29uc3Qgc3RyZWFtQSA9IHN0b3JlLnN0cmVhbSgncXVldWUgQScpO1xuICAgICAgY29uc3Qgc3RyZWFtQiA9IHN0b3JlLnN0cmVhbSgncXVldWUgQicpO1xuICAgICAgY29uc3Qgc3RyZWFtQyA9IHN0b3JlLnN0cmVhbSgncXVldWUgQycpO1xuXG4gICAgICBhd2FpdCBzdG9yZS5pbnNlcnQobWFrZUpvYignQS40JywgJ3F1ZXVlIEEnKSk7XG4gICAgICBhd2FpdCBzdG9yZS5pbnNlcnQobWFrZUpvYignQy4zJywgJ3F1ZXVlIEMnKSk7XG4gICAgICBhd2FpdCBzdG9yZS5pbnNlcnQobWFrZUpvYignQi4xJywgJ3F1ZXVlIEInKSk7XG4gICAgICBhd2FpdCBzdG9yZS5pbnNlcnQobWFrZUpvYignQS41JywgJ3F1ZXVlIEEnKSk7XG5cbiAgICAgIGNvbnN0IHN0cmVhbUFJZHMgPSBhd2FpdCBpZHMoc3RyZWFtQSwgNSk7XG4gICAgICBjb25zdCBzdHJlYW1CSWRzID0gYXdhaXQgaWRzKHN0cmVhbUIsIDEpO1xuICAgICAgY29uc3Qgc3RyZWFtQ0lkcyA9IGF3YWl0IGlkcyhzdHJlYW1DLCAzKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3RyZWFtQUlkcywgWydBLjEnLCAnQS4yJywgJ0EuMycsICdBLjQnLCAnQS41J10pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChzdHJlYW1CSWRzLCBbJ0IuMSddKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3RyZWFtQ0lkcywgWydDLjEnLCAnQy4yJywgJ0MuMyddKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFRocmljZShmYWtlRGF0YWJhc2UuZ2V0Sm9ic0luUXVldWUpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUN2QixvQkFBcUI7QUFHckIsbUNBQXNDO0FBRXRDLFNBQVMseUJBQXlCLE1BQU07QUFDdEMsTUFBSTtBQU1KLGFBQVcsTUFBTTtBQUNmLG1CQUFlO0FBQUEsTUFDYixnQkFBZ0IsTUFBTSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFBQSxNQUN4QyxXQUFXLE1BQU0sS0FBSztBQUFBLE1BQ3RCLFdBQVcsTUFBTSxLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGLENBQUM7QUFFRCxXQUFTLFVBQVUsTUFBTTtBQUN2QixPQUFHLHlDQUF5QyxZQUFZO0FBQ3RELFlBQU0sUUFBUSxJQUFJLG1EQUFzQixZQUFZO0FBRXBELFVBQUk7QUFDSixVQUFJO0FBQ0YsY0FBTSxNQUFNLE9BQU87QUFBQSxVQUNqQixJQUFJO0FBQUEsVUFDSixXQUFXO0FBQUEsVUFDWCxXQUFXO0FBQUEsVUFDWCxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0gsU0FBUyxLQUFQO0FBQ0EsZ0JBQVE7QUFBQSxNQUNWO0FBRUEseUJBQU8sV0FBVyxPQUFPLEtBQUs7QUFBQSxJQUNoQyxDQUFDO0FBRUQsT0FBRyw2QkFBNkIsWUFBWTtBQUMxQyxZQUFNLFFBQVEsSUFBSSxtREFBc0IsWUFBWTtBQUNwRCxZQUFNLE9BQU8sWUFBWTtBQUV6QixZQUFNLE1BQU0sT0FBTztBQUFBLFFBQ2pCLElBQUk7QUFBQSxRQUNKLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFBQSxNQUNoQixDQUFDO0FBRUQsWUFBTSxPQUFPLFdBQVcsYUFBYSxTQUFTO0FBQzlDLFlBQU0sT0FBTyxnQkFBZ0IsYUFBYSxXQUFXO0FBQUEsUUFDbkQsSUFBSTtBQUFBLFFBQ0osV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsTUFBTSxFQUFFLElBQUksRUFBRTtBQUFBLE1BQ2hCLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxPQUFHLG9EQUFvRCxZQUFZO0FBQ2pFLFlBQU0sU0FBd0IsQ0FBQztBQUUvQixtQkFBYSxVQUFVLFVBQVUsTUFBTTtBQUNyQyxlQUFPLEtBQUssUUFBUTtBQUFBLE1BQ3RCLENBQUM7QUFFRCxZQUFNLFFBQVEsSUFBSSxtREFBc0IsWUFBWTtBQUVwRCxZQUFNLGdCQUFpQixhQUFZO0FBR2pDLHlCQUFpQixRQUFRLE1BQU0sT0FBTyxZQUFZLEdBQUc7QUFDbkQsaUJBQU8sS0FBSyxhQUFhO0FBQ3pCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsR0FBRztBQUVILFlBQU0sTUFBTSxPQUFPO0FBQUEsUUFDakIsSUFBSTtBQUFBLFFBQ0osV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsTUFBTSxFQUFFLElBQUksRUFBRTtBQUFBLE1BQ2hCLENBQUM7QUFFRCxZQUFNO0FBRU4seUJBQU8sVUFBVSxRQUFRLENBQUMsVUFBVSxhQUFhLENBQUM7QUFBQSxJQUNwRCxDQUFDO0FBRUQsT0FBRyx5QkFBeUIsWUFBWTtBQUN0QyxZQUFNLFFBQVEsSUFBSSxtREFBc0IsWUFBWTtBQUVwRCxZQUFNLGdCQUFpQixhQUFZO0FBR2pDLHlCQUFpQixRQUFRLE1BQU0sT0FBTyxZQUFZLEdBQUc7QUFDbkQ7QUFBQSxRQUNGO0FBQUEsTUFDRixHQUFHO0FBRUgsWUFBTSxNQUFNLE9BQ1Y7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFBQSxNQUNoQixHQUNBLEVBQUUsZUFBZSxNQUFNLENBQ3pCO0FBRUEsWUFBTTtBQUVOLFlBQU0sT0FBTyxVQUFVLGFBQWEsU0FBUztBQUFBLElBQy9DLENBQUM7QUFFRCxPQUFHLDZEQUE2RCxZQUFZO0FBQzFFLFlBQU0sU0FBd0IsQ0FBQztBQUUvQixVQUFJLHdCQUF3QjtBQUM1QixZQUFNLHdCQUF3QixJQUFJLFFBQVEsYUFBVztBQUNuRCxnQ0FBd0I7QUFBQSxNQUMxQixDQUFDO0FBRUQsbUJBQWEsZUFBZSxVQUFVLE1BQU07QUFDMUMsZUFBTyxLQUFLLGFBQWE7QUFDekIsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUNELG1CQUFhLFVBQVUsVUFBVSxNQUFNO0FBQ3JDLGVBQU8sS0FBSyxRQUFRO0FBQUEsTUFDdEIsQ0FBQztBQUVELFlBQU0sUUFBUSxJQUFJLG1EQUFzQixZQUFZO0FBQ3BELFlBQU0sT0FBTyxZQUFZO0FBRXpCLFlBQU0sZ0JBQWdCLE1BQU0sT0FBTztBQUFBLFFBQ2pDLElBQUk7QUFBQSxRQUNKLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFBQSxNQUNoQixDQUFDO0FBRUQsWUFBTSxPQUFPLFVBQVUsYUFBYSxTQUFTO0FBRTdDLDRCQUFzQixDQUFDLENBQUM7QUFDeEIsWUFBTTtBQUVOLFlBQU0sT0FBTyxXQUFXLGFBQWEsU0FBUztBQUM5Qyx5QkFBTyxVQUFVLFFBQVEsQ0FBQyxlQUFlLFFBQVEsQ0FBQztBQUFBLElBQ3BELENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLFVBQVUsTUFBTTtBQUN2QixPQUFHLGtDQUFrQyxZQUFZO0FBQy9DLFlBQU0sUUFBUSxJQUFJLG1EQUFzQixZQUFZO0FBRXBELFlBQU0sTUFBTSxPQUFPLEtBQUs7QUFFeEIsWUFBTSxPQUFPLFdBQVcsYUFBYSxTQUFTO0FBQzlDLFlBQU0sT0FBTyxXQUFXLGFBQWEsV0FBVyxLQUFLO0FBQUEsSUFDdkQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsVUFBVSxNQUFNO0FBQ3ZCLE9BQUcsK0RBQStELFlBQVk7QUFDNUUsWUFBTSxVQUFVLHdCQUFDLElBQVksY0FBdUI7QUFBQSxRQUNsRDtBQUFBLFFBQ0EsV0FBVyxLQUFLLElBQUk7QUFBQSxRQUNwQjtBQUFBLFFBQ0EsTUFBTSxFQUFFLElBQUksRUFBRTtBQUFBLE1BQ2hCLElBTGdCO0FBT2hCLFlBQU0sTUFBTSw4QkFDVixRQUNBLFdBQzJCO0FBQzNCLGNBQU0sU0FBd0IsQ0FBQztBQUMvQix5QkFBaUIsT0FBTyxRQUFRO0FBQzlCLGlCQUFPLEtBQUssSUFBSSxFQUFFO0FBQ2xCLGNBQUksT0FBTyxVQUFVLFFBQVE7QUFDM0I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLGVBQU87QUFBQSxNQUNULEdBWlk7QUFjWixtQkFBYSxlQUNWLFNBQVMsU0FBUyxFQUNsQixTQUFTO0FBQUEsUUFDUixRQUFRLE9BQU8sU0FBUztBQUFBLFFBQ3hCLFFBQVEsT0FBTyxTQUFTO0FBQUEsUUFDeEIsUUFBUSxPQUFPLFNBQVM7QUFBQSxNQUMxQixDQUFDO0FBRUgsbUJBQWEsZUFBZSxTQUFTLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUUzRCxtQkFBYSxlQUNWLFNBQVMsU0FBUyxFQUNsQixTQUFTLENBQUMsUUFBUSxPQUFPLFNBQVMsR0FBRyxRQUFRLE9BQU8sU0FBUyxDQUFDLENBQUM7QUFFbEUsWUFBTSxRQUFRLElBQUksbURBQXNCLFlBQVk7QUFFcEQsWUFBTSxVQUFVLE1BQU0sT0FBTyxTQUFTO0FBQ3RDLFlBQU0sVUFBVSxNQUFNLE9BQU8sU0FBUztBQUN0QyxZQUFNLFVBQVUsTUFBTSxPQUFPLFNBQVM7QUFFdEMsWUFBTSxNQUFNLE9BQU8sUUFBUSxPQUFPLFNBQVMsQ0FBQztBQUM1QyxZQUFNLE1BQU0sT0FBTyxRQUFRLE9BQU8sU0FBUyxDQUFDO0FBQzVDLFlBQU0sTUFBTSxPQUFPLFFBQVEsT0FBTyxTQUFTLENBQUM7QUFDNUMsWUFBTSxNQUFNLE9BQU8sUUFBUSxPQUFPLFNBQVMsQ0FBQztBQUU1QyxZQUFNLGFBQWEsTUFBTSxJQUFJLFNBQVMsQ0FBQztBQUN2QyxZQUFNLGFBQWEsTUFBTSxJQUFJLFNBQVMsQ0FBQztBQUN2QyxZQUFNLGFBQWEsTUFBTSxJQUFJLFNBQVMsQ0FBQztBQUN2Qyx5QkFBTyxVQUFVLFlBQVksQ0FBQyxPQUFPLE9BQU8sT0FBTyxPQUFPLEtBQUssQ0FBQztBQUNoRSx5QkFBTyxVQUFVLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDcEMseUJBQU8sVUFBVSxZQUFZLENBQUMsT0FBTyxPQUFPLEtBQUssQ0FBQztBQUVsRCxZQUFNLE9BQU8sYUFBYSxhQUFhLGNBQWM7QUFBQSxJQUN2RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
