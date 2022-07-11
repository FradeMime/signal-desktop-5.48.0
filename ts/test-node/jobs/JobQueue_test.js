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
var import_events = __toESM(require("events"));
var import_zod = require("zod");
var import_lodash = require("lodash");
var import_uuid = require("uuid");
var import_p_queue = __toESM(require("p-queue"));
var import_JobError = require("../../jobs/JobError");
var import_TestJobQueueStore = require("./TestJobQueueStore");
var import_missingCaseError = require("../../util/missingCaseError");
var import_JobQueue = require("../../jobs/JobQueue");
describe("JobQueue", () => {
  describe("end-to-end tests", () => {
    it("writes jobs to the database, processes them, and then deletes them", async () => {
      const testJobSchema = import_zod.z.object({
        a: import_zod.z.number(),
        b: import_zod.z.number()
      });
      const results = /* @__PURE__ */ new Set();
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      class Queue extends import_JobQueue.JobQueue {
        parseData(data) {
          return testJobSchema.parse(data);
        }
        async run({ data }) {
          results.add(data.a + data.b);
        }
      }
      const addQueue = new Queue({
        store,
        queueType: "test add queue",
        maxAttempts: 1
      });
      import_chai.assert.deepEqual(results, /* @__PURE__ */ new Set());
      import_chai.assert.isEmpty(store.storedJobs);
      addQueue.streamJobs();
      store.pauseStream("test add queue");
      const job1 = await addQueue.add({ a: 1, b: 2 });
      const job2 = await addQueue.add({ a: 3, b: 4 });
      import_chai.assert.deepEqual(results, /* @__PURE__ */ new Set());
      import_chai.assert.lengthOf(store.storedJobs, 2);
      store.resumeStream("test add queue");
      await job1.completion;
      await job2.completion;
      import_chai.assert.deepEqual(results, /* @__PURE__ */ new Set([3, 7]));
      import_chai.assert.isEmpty(store.storedJobs);
    });
    it("by default, kicks off multiple jobs in parallel", async () => {
      let activeJobCount = 0;
      const eventBus = new import_events.default();
      const updateActiveJobCount = /* @__PURE__ */ __name((incrementBy) => {
        activeJobCount += incrementBy;
        eventBus.emit("updated");
      }, "updateActiveJobCount");
      class Queue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.number().parse(data);
        }
        async run() {
          try {
            updateActiveJobCount(1);
            await new Promise((resolve) => {
              eventBus.on("updated", () => {
                if (activeJobCount === 4) {
                  eventBus.emit("got to 4");
                  resolve();
                }
              });
            });
          } finally {
            updateActiveJobCount(-1);
          }
        }
      }
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      const queue = new Queue({
        store,
        queueType: "test queue",
        maxAttempts: 100
      });
      queue.streamJobs();
      queue.add(1);
      queue.add(2);
      queue.add(3);
      queue.add(4);
      await (0, import_events.once)(eventBus, "got to 4");
    });
    it("can override the in-memory queue", async () => {
      let jobsAdded = 0;
      const testQueue = new import_p_queue.default();
      testQueue.on("add", () => {
        jobsAdded += 1;
      });
      class Queue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.number().parse(data);
        }
        getInMemoryQueue(parsedJob) {
          (0, import_chai.assert)((/* @__PURE__ */ new Set([1, 2, 3, 4])).has(parsedJob.data), "Bad data passed to `getInMemoryQueue`");
          return testQueue;
        }
        run() {
          return Promise.resolve();
        }
      }
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      const queue = new Queue({
        store,
        queueType: "test queue",
        maxAttempts: 100
      });
      queue.streamJobs();
      const jobs = await Promise.all([
        queue.add(1),
        queue.add(2),
        queue.add(3),
        queue.add(4)
      ]);
      await Promise.all(jobs.map((job) => job.completion));
      import_chai.assert.strictEqual(jobsAdded, 4);
    });
    it("writes jobs to the database correctly", async () => {
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.string().parse(data);
        }
        async run() {
          return Promise.resolve();
        }
      }
      const queue1 = new TestQueue({
        store,
        queueType: "test 1",
        maxAttempts: 1
      });
      const queue2 = new TestQueue({
        store,
        queueType: "test 2",
        maxAttempts: 1
      });
      store.pauseStream("test 1");
      store.pauseStream("test 2");
      queue1.streamJobs();
      queue2.streamJobs();
      await queue1.add("one");
      await queue2.add("A");
      await queue1.add("two");
      await queue2.add("B");
      await queue1.add("three");
      import_chai.assert.lengthOf(store.storedJobs, 5);
      const ids = store.storedJobs.map((job) => job.id);
      import_chai.assert.lengthOf(store.storedJobs, new Set(ids).size, "Expected every job to have a unique ID");
      const timestamps = store.storedJobs.map((job) => job.timestamp);
      timestamps.forEach((timestamp) => {
        import_chai.assert.approximately(timestamp, Date.now(), 3e3, "Expected the timestamp to be ~now");
      });
      const datas = store.storedJobs.map((job) => job.data);
      import_chai.assert.sameMembers(datas, ["three", "two", "one", "A", "B"], "Expected every job's data to be stored");
      const queueTypes = (0, import_lodash.groupBy)(store.storedJobs, "queueType");
      import_chai.assert.hasAllKeys(queueTypes, ["test 1", "test 2"]);
      import_chai.assert.lengthOf(queueTypes["test 1"], 3);
      import_chai.assert.lengthOf(queueTypes["test 2"], 2);
    });
    it("can override the insertion logic, skipping storage persistence", async () => {
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.string().parse(data);
        }
        async run() {
          return Promise.resolve();
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test queue",
        maxAttempts: 1
      });
      queue.streamJobs();
      const insert = sinon.stub().resolves();
      await queue.add("foo bar", insert);
      import_chai.assert.lengthOf(store.storedJobs, 0);
      sinon.assert.calledOnce(insert);
      sinon.assert.calledWith(insert, sinon.match({
        id: sinon.match.string,
        timestamp: sinon.match.number,
        queueType: "test queue",
        data: "foo bar"
      }));
    });
    it("retries jobs, running them up to maxAttempts times", async () => {
      let fooAttempts = 0;
      let barAttempts = 0;
      let fooSucceeded = false;
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      class RetryQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          if (data !== "foo" && data !== "bar") {
            throw new Error("Invalid data");
          }
          return data;
        }
        async run({ data }) {
          switch (data) {
            case "foo":
              fooAttempts += 1;
              if (fooAttempts < 3) {
                throw new Error("foo job should fail the first and second time");
              }
              fooSucceeded = true;
              break;
            case "bar":
              barAttempts += 1;
              throw new Error("bar job always fails in this test");
              break;
            default:
              throw (0, import_missingCaseError.missingCaseError)(data);
          }
        }
      }
      const retryQueue = new RetryQueue({
        store,
        queueType: "test retry queue",
        maxAttempts: 5
      });
      retryQueue.streamJobs();
      await (await retryQueue.add("foo")).completion;
      let booErr;
      try {
        await (await retryQueue.add("bar")).completion;
      } catch (err) {
        booErr = err;
      }
      import_chai.assert.strictEqual(fooAttempts, 3);
      import_chai.assert.isTrue(fooSucceeded);
      import_chai.assert.strictEqual(barAttempts, 5);
      if (!(booErr instanceof import_JobError.JobError)) {
        import_chai.assert.fail("Expected error to be a JobError");
        return;
      }
      import_chai.assert.include(booErr.message, "bar job always fails in this test");
      import_chai.assert.isEmpty(store.storedJobs);
    });
    it("passes the attempt number to the run function", async () => {
      const attempts = [];
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.string().parse(data);
        }
        async run(_, { attempt }) {
          attempts.push(attempt);
          throw new Error("this job always fails");
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test",
        maxAttempts: 6
      });
      queue.streamJobs();
      try {
        await (await queue.add("foo")).completion;
      } catch (err) {
      }
      import_chai.assert.deepStrictEqual(attempts, [1, 2, 3, 4, 5, 6]);
    });
    it("passes a logger to the run function", async () => {
      const uniqueString = (0, import_uuid.v4)();
      const fakeLogger = {
        fatal: sinon.fake(),
        error: sinon.fake(),
        warn: sinon.fake(),
        info: sinon.fake(),
        debug: sinon.fake(),
        trace: sinon.fake()
      };
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.number().parse(data);
        }
        async run(_, { log }) {
          log.info(uniqueString);
          log.warn(uniqueString);
          log.error(uniqueString);
        }
      }
      const queue = new TestQueue({
        store: new import_TestJobQueueStore.TestJobQueueStore(),
        queueType: "test queue 123",
        maxAttempts: 6,
        logger: fakeLogger
      });
      queue.streamJobs();
      const job = await queue.add(1);
      await job.completion;
      [fakeLogger.info, fakeLogger.warn, fakeLogger.error].forEach((logFn) => {
        sinon.assert.calledWith(logFn, sinon.match((arg) => typeof arg === "string" && arg.includes(job.id) && arg.includes("test queue 123")), sinon.match((arg) => typeof arg === "string" && arg.includes(uniqueString)));
      });
    });
    it("makes job.completion reject if parseData throws", async () => {
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          if (data === "valid") {
            return data;
          }
          throw new Error("uh oh");
        }
        async run() {
          return Promise.resolve();
        }
      }
      const queue = new TestQueue({
        store: new import_TestJobQueueStore.TestJobQueueStore(),
        queueType: "test queue",
        maxAttempts: 999
      });
      queue.streamJobs();
      const job = await queue.add("this will fail to parse");
      let jobError;
      try {
        await job.completion;
      } catch (err) {
        jobError = err;
      }
      if (!(jobError instanceof import_JobError.JobError)) {
        import_chai.assert.fail("Expected error to be a JobError");
        return;
      }
      import_chai.assert.include(jobError.message, "Failed to parse job data. Was unexpected data loaded from the database?");
    });
    it("doesn't run the job if parseData throws", async () => {
      const run = sinon.stub().resolves();
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          if (data === "valid") {
            return data;
          }
          throw new Error("invalid data!");
        }
        run(job) {
          return run(job);
        }
      }
      const queue = new TestQueue({
        store: new import_TestJobQueueStore.TestJobQueueStore(),
        queueType: "test queue",
        maxAttempts: 999
      });
      queue.streamJobs();
      (await queue.add("invalid")).completion.catch(import_lodash.noop);
      (await queue.add("invalid")).completion.catch(import_lodash.noop);
      await queue.add("valid");
      (await queue.add("invalid")).completion.catch(import_lodash.noop);
      (await queue.add("invalid")).completion.catch(import_lodash.noop);
      sinon.assert.calledOnce(run);
      sinon.assert.calledWithMatch(run, { data: "valid" });
    });
    it("deletes jobs from storage if parseData throws", async () => {
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          if (data === "valid") {
            return data;
          }
          throw new Error("invalid data!");
        }
        async run() {
          return Promise.resolve();
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test queue",
        maxAttempts: 999
      });
      queue.streamJobs();
      await (await queue.add("invalid 1")).completion.catch(import_lodash.noop);
      await (await queue.add("invalid 2")).completion.catch(import_lodash.noop);
      await queue.add("valid");
      const datas = store.storedJobs.map((job) => job.data);
      import_chai.assert.sameMembers(datas, ["valid"]);
    });
    it("adding the job resolves AFTER inserting the job into the database", async () => {
      let inserted = false;
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      store.events.on("insert", () => {
        inserted = true;
      });
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(_) {
          return void 0;
        }
        async run() {
          return Promise.resolve();
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test queue",
        maxAttempts: 999
      });
      queue.streamJobs();
      const addPromise = queue.add(void 0);
      import_chai.assert.isFalse(inserted);
      await addPromise;
      import_chai.assert.isTrue(inserted);
    });
    it("starts the job AFTER inserting the job into the database", async () => {
      const events = [];
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      store.events.on("insert", () => {
        events.push("insert");
      });
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          events.push("parsing data");
          return data;
        }
        async run() {
          events.push("running");
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test queue",
        maxAttempts: 999
      });
      queue.streamJobs();
      await (await queue.add(123)).completion;
      import_chai.assert.deepEqual(events, ["insert", "parsing data", "running"]);
    });
    it("resolves job.completion AFTER deleting the job from the database", async () => {
      const events = [];
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      store.events.on("delete", () => {
        events.push("delete");
      });
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(_) {
          return void 0;
        }
        async run() {
          return Promise.resolve();
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test queue",
        maxAttempts: 999
      });
      queue.streamJobs();
      store.pauseStream("test queue");
      const job = await queue.add(void 0);
      const jobCompletionPromise = job.completion.then(() => {
        events.push("resolved");
      });
      import_chai.assert.lengthOf(store.storedJobs, 1);
      store.resumeStream("test queue");
      await jobCompletionPromise;
      import_chai.assert.deepEqual(events, ["delete", "resolved"]);
    });
    it("if the job fails after every attempt, rejects job.completion AFTER deleting the job from the database", async () => {
      const events = [];
      const store = new import_TestJobQueueStore.TestJobQueueStore();
      store.events.on("delete", () => {
        events.push("delete");
      });
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(_) {
          return void 0;
        }
        async run() {
          events.push("running");
          throw new Error("uh oh");
        }
      }
      const queue = new TestQueue({
        store,
        queueType: "test queue",
        maxAttempts: 5
      });
      queue.streamJobs();
      store.pauseStream("test queue");
      const job = await queue.add(void 0);
      const jobCompletionPromise = job.completion.catch(() => {
        events.push("rejected");
      });
      import_chai.assert.lengthOf(store.storedJobs, 1);
      store.resumeStream("test queue");
      await jobCompletionPromise;
      import_chai.assert.deepEqual(events, [
        "running",
        "running",
        "running",
        "running",
        "running",
        "delete",
        "rejected"
      ]);
    });
  });
  describe("streamJobs", () => {
    const storedJobSchema = import_zod.z.object({
      id: import_zod.z.string(),
      timestamp: import_zod.z.number(),
      queueType: import_zod.z.string(),
      data: import_zod.z.unknown()
    });
    class FakeStream {
      constructor() {
        this.eventEmitter = new import_events.default();
      }
      async *[Symbol.asyncIterator]() {
        while (true) {
          const [job] = await (0, import_events.once)(this.eventEmitter, "drip");
          yield storedJobSchema.parse(job);
        }
      }
      drip(job) {
        this.eventEmitter.emit("drip", job);
      }
    }
    let fakeStream;
    let fakeStore;
    beforeEach(() => {
      fakeStream = new FakeStream();
      fakeStore = {
        insert: sinon.stub().resolves(),
        delete: sinon.stub().resolves(),
        stream: sinon.stub().returns(fakeStream)
      };
    });
    it("starts streaming jobs from the store", async () => {
      const eventEmitter = new import_events.default();
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          return import_zod.z.number().parse(data);
        }
        async run({ data }) {
          eventEmitter.emit("run", data);
        }
      }
      const noopQueue = new TestQueue({
        store: fakeStore,
        queueType: "test noop queue",
        maxAttempts: 99
      });
      sinon.assert.notCalled(fakeStore.stream);
      noopQueue.streamJobs();
      sinon.assert.calledOnce(fakeStore.stream);
      fakeStream.drip({
        id: (0, import_uuid.v4)(),
        timestamp: Date.now(),
        queueType: "test noop queue",
        data: 123
      });
      const [firstRunData] = await (0, import_events.once)(eventEmitter, "run");
      fakeStream.drip({
        id: (0, import_uuid.v4)(),
        timestamp: Date.now(),
        queueType: "test noop queue",
        data: 456
      });
      const [secondRunData] = await (0, import_events.once)(eventEmitter, "run");
      import_chai.assert.strictEqual(firstRunData, 123);
      import_chai.assert.strictEqual(secondRunData, 456);
    });
    it("rejects when called more than once", async () => {
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(data) {
          return data;
        }
        async run() {
          return Promise.resolve();
        }
      }
      const noopQueue = new TestQueue({
        store: fakeStore,
        queueType: "test noop queue",
        maxAttempts: 99
      });
      noopQueue.streamJobs();
      await import_chai.assert.isRejected(noopQueue.streamJobs());
      await import_chai.assert.isRejected(noopQueue.streamJobs());
      sinon.assert.calledOnce(fakeStore.stream);
    });
  });
  describe("add", () => {
    it("rejects if the job queue has not started streaming", async () => {
      const fakeStore = {
        insert: sinon.stub().resolves(),
        delete: sinon.stub().resolves(),
        stream: sinon.stub()
      };
      class TestQueue extends import_JobQueue.JobQueue {
        parseData(_) {
          return void 0;
        }
        async run() {
          return Promise.resolve();
        }
      }
      const noopQueue = new TestQueue({
        store: fakeStore,
        queueType: "test noop queue",
        maxAttempts: 99
      });
      await import_chai.assert.isRejected(noopQueue.add(void 0));
      sinon.assert.notCalled(fakeStore.stream);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iUXVldWVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBFdmVudEVtaXR0ZXIsIHsgb25jZSB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcbmltcG9ydCB7IG5vb3AsIGdyb3VwQnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCB7IEpvYkVycm9yIH0gZnJvbSAnLi4vLi4vam9icy9Kb2JFcnJvcic7XG5pbXBvcnQgeyBUZXN0Sm9iUXVldWVTdG9yZSB9IGZyb20gJy4vVGVzdEpvYlF1ZXVlU3RvcmUnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuaW1wb3J0IHsgSm9iUXVldWUgfSBmcm9tICcuLi8uLi9qb2JzL0pvYlF1ZXVlJztcbmltcG9ydCB0eXBlIHsgUGFyc2VkSm9iLCBTdG9yZWRKb2IsIEpvYlF1ZXVlU3RvcmUgfSBmcm9tICcuLi8uLi9qb2JzL3R5cGVzJztcblxuZGVzY3JpYmUoJ0pvYlF1ZXVlJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZW5kLXRvLWVuZCB0ZXN0cycsICgpID0+IHtcbiAgICBpdCgnd3JpdGVzIGpvYnMgdG8gdGhlIGRhdGFiYXNlLCBwcm9jZXNzZXMgdGhlbSwgYW5kIHRoZW4gZGVsZXRlcyB0aGVtJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdGVzdEpvYlNjaGVtYSA9IHoub2JqZWN0KHtcbiAgICAgICAgYTogei5udW1iZXIoKSxcbiAgICAgICAgYjogei5udW1iZXIoKSxcbiAgICAgIH0pO1xuXG4gICAgICB0eXBlIFRlc3RKb2JEYXRhID0gei5pbmZlcjx0eXBlb2YgdGVzdEpvYlNjaGVtYT47XG5cbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgU2V0PHVua25vd24+KCk7XG4gICAgICBjb25zdCBzdG9yZSA9IG5ldyBUZXN0Sm9iUXVldWVTdG9yZSgpO1xuXG4gICAgICBjbGFzcyBRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPFRlc3RKb2JEYXRhPiB7XG4gICAgICAgIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogVGVzdEpvYkRhdGEge1xuICAgICAgICAgIHJldHVybiB0ZXN0Sm9iU2NoZW1hLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKHsgZGF0YSB9OiBQYXJzZWRKb2I8VGVzdEpvYkRhdGE+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgcmVzdWx0cy5hZGQoZGF0YS5hICsgZGF0YS5iKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGRRdWV1ZSA9IG5ldyBRdWV1ZSh7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IGFkZCBxdWV1ZScsXG4gICAgICAgIG1heEF0dGVtcHRzOiAxLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0cywgbmV3IFNldCgpKTtcbiAgICAgIGFzc2VydC5pc0VtcHR5KHN0b3JlLnN0b3JlZEpvYnMpO1xuXG4gICAgICBhZGRRdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIHN0b3JlLnBhdXNlU3RyZWFtKCd0ZXN0IGFkZCBxdWV1ZScpO1xuICAgICAgY29uc3Qgam9iMSA9IGF3YWl0IGFkZFF1ZXVlLmFkZCh7IGE6IDEsIGI6IDIgfSk7XG4gICAgICBjb25zdCBqb2IyID0gYXdhaXQgYWRkUXVldWUuYWRkKHsgYTogMywgYjogNCB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRzLCBuZXcgU2V0KCkpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JlLnN0b3JlZEpvYnMsIDIpO1xuXG4gICAgICBzdG9yZS5yZXN1bWVTdHJlYW0oJ3Rlc3QgYWRkIHF1ZXVlJyk7XG5cbiAgICAgIGF3YWl0IGpvYjEuY29tcGxldGlvbjtcbiAgICAgIGF3YWl0IGpvYjIuY29tcGxldGlvbjtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRzLCBuZXcgU2V0KFszLCA3XSkpO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkoc3RvcmUuc3RvcmVkSm9icyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYnkgZGVmYXVsdCwga2lja3Mgb2ZmIG11bHRpcGxlIGpvYnMgaW4gcGFyYWxsZWwnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgYWN0aXZlSm9iQ291bnQgPSAwO1xuICAgICAgY29uc3QgZXZlbnRCdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICBjb25zdCB1cGRhdGVBY3RpdmVKb2JDb3VudCA9IChpbmNyZW1lbnRCeTogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICAgIGFjdGl2ZUpvYkNvdW50ICs9IGluY3JlbWVudEJ5O1xuICAgICAgICBldmVudEJ1cy5lbWl0KCd1cGRhdGVkJyk7XG4gICAgICB9O1xuXG4gICAgICBjbGFzcyBRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPG51bWJlcj4ge1xuICAgICAgICBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IG51bWJlciB7XG4gICAgICAgICAgcmV0dXJuIHoubnVtYmVyKCkucGFyc2UoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZUpvYkNvdW50KDEpO1xuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50QnVzLm9uKCd1cGRhdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVKb2JDb3VudCA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgZXZlbnRCdXMuZW1pdCgnZ290IHRvIDQnKTtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZUpvYkNvdW50KC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmUgPSBuZXcgVGVzdEpvYlF1ZXVlU3RvcmUoKTtcblxuICAgICAgY29uc3QgcXVldWUgPSBuZXcgUXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgIG1heEF0dGVtcHRzOiAxMDAsXG4gICAgICB9KTtcbiAgICAgIHF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAgICAgcXVldWUuYWRkKDEpO1xuICAgICAgcXVldWUuYWRkKDIpO1xuICAgICAgcXVldWUuYWRkKDMpO1xuICAgICAgcXVldWUuYWRkKDQpO1xuXG4gICAgICBhd2FpdCBvbmNlKGV2ZW50QnVzLCAnZ290IHRvIDQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gb3ZlcnJpZGUgdGhlIGluLW1lbW9yeSBxdWV1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqb2JzQWRkZWQgPSAwO1xuICAgICAgY29uc3QgdGVzdFF1ZXVlID0gbmV3IFBRdWV1ZSgpO1xuICAgICAgdGVzdFF1ZXVlLm9uKCdhZGQnLCAoKSA9PiB7XG4gICAgICAgIGpvYnNBZGRlZCArPSAxO1xuICAgICAgfSk7XG5cbiAgICAgIGNsYXNzIFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8bnVtYmVyPiB7XG4gICAgICAgIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogbnVtYmVyIHtcbiAgICAgICAgICByZXR1cm4gei5udW1iZXIoKS5wYXJzZShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXRJbk1lbW9yeVF1ZXVlKFxuICAgICAgICAgIHBhcnNlZEpvYjogUGFyc2VkSm9iPG51bWJlcj5cbiAgICAgICAgKTogUFF1ZXVlIHtcbiAgICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgICBuZXcgU2V0KFsxLCAyLCAzLCA0XSkuaGFzKHBhcnNlZEpvYi5kYXRhKSxcbiAgICAgICAgICAgICdCYWQgZGF0YSBwYXNzZWQgdG8gYGdldEluTWVtb3J5UXVldWVgJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRlc3RRdWV1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmUgPSBuZXcgVGVzdEpvYlF1ZXVlU3RvcmUoKTtcblxuICAgICAgY29uc3QgcXVldWUgPSBuZXcgUXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgIG1heEF0dGVtcHRzOiAxMDAsXG4gICAgICB9KTtcbiAgICAgIHF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAgICAgY29uc3Qgam9icyA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgcXVldWUuYWRkKDEpLFxuICAgICAgICBxdWV1ZS5hZGQoMiksXG4gICAgICAgIHF1ZXVlLmFkZCgzKSxcbiAgICAgICAgcXVldWUuYWRkKDQpLFxuICAgICAgXSk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChqb2JzLm1hcChqb2IgPT4gam9iLmNvbXBsZXRpb24pKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpvYnNBZGRlZCwgNCk7XG4gICAgfSk7XG5cbiAgICBpdCgnd3JpdGVzIGpvYnMgdG8gdGhlIGRhdGFiYXNlIGNvcnJlY3RseScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IFRlc3RKb2JRdWV1ZVN0b3JlKCk7XG5cbiAgICAgIGNsYXNzIFRlc3RRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPHN0cmluZz4ge1xuICAgICAgICBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IHN0cmluZyB7XG4gICAgICAgICAgcmV0dXJuIHouc3RyaW5nKCkucGFyc2UoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXVlMSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCAxJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDEsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHF1ZXVlMiA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCAyJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDEsXG4gICAgICB9KTtcblxuICAgICAgc3RvcmUucGF1c2VTdHJlYW0oJ3Rlc3QgMScpO1xuICAgICAgc3RvcmUucGF1c2VTdHJlYW0oJ3Rlc3QgMicpO1xuXG4gICAgICBxdWV1ZTEuc3RyZWFtSm9icygpO1xuICAgICAgcXVldWUyLnN0cmVhbUpvYnMoKTtcblxuICAgICAgYXdhaXQgcXVldWUxLmFkZCgnb25lJyk7XG4gICAgICBhd2FpdCBxdWV1ZTIuYWRkKCdBJyk7XG4gICAgICBhd2FpdCBxdWV1ZTEuYWRkKCd0d28nKTtcbiAgICAgIGF3YWl0IHF1ZXVlMi5hZGQoJ0InKTtcbiAgICAgIGF3YWl0IHF1ZXVlMS5hZGQoJ3RocmVlJyk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZS5zdG9yZWRKb2JzLCA1KTtcblxuICAgICAgY29uc3QgaWRzID0gc3RvcmUuc3RvcmVkSm9icy5tYXAoam9iID0+IGpvYi5pZCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoXG4gICAgICAgIHN0b3JlLnN0b3JlZEpvYnMsXG4gICAgICAgIG5ldyBTZXQoaWRzKS5zaXplLFxuICAgICAgICAnRXhwZWN0ZWQgZXZlcnkgam9iIHRvIGhhdmUgYSB1bmlxdWUgSUQnXG4gICAgICApO1xuXG4gICAgICBjb25zdCB0aW1lc3RhbXBzID0gc3RvcmUuc3RvcmVkSm9icy5tYXAoam9iID0+IGpvYi50aW1lc3RhbXApO1xuICAgICAgdGltZXN0YW1wcy5mb3JFYWNoKHRpbWVzdGFtcCA9PiB7XG4gICAgICAgIGFzc2VydC5hcHByb3hpbWF0ZWx5KFxuICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICBEYXRlLm5vdygpLFxuICAgICAgICAgIDMwMDAsXG4gICAgICAgICAgJ0V4cGVjdGVkIHRoZSB0aW1lc3RhbXAgdG8gYmUgfm5vdydcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhcyA9IHN0b3JlLnN0b3JlZEpvYnMubWFwKGpvYiA9PiBqb2IuZGF0YSk7XG4gICAgICBhc3NlcnQuc2FtZU1lbWJlcnMoXG4gICAgICAgIGRhdGFzLFxuICAgICAgICBbJ3RocmVlJywgJ3R3bycsICdvbmUnLCAnQScsICdCJ10sXG4gICAgICAgIFwiRXhwZWN0ZWQgZXZlcnkgam9iJ3MgZGF0YSB0byBiZSBzdG9yZWRcIlxuICAgICAgKTtcblxuICAgICAgY29uc3QgcXVldWVUeXBlcyA9IGdyb3VwQnkoc3RvcmUuc3RvcmVkSm9icywgJ3F1ZXVlVHlwZScpO1xuICAgICAgYXNzZXJ0Lmhhc0FsbEtleXMocXVldWVUeXBlcywgWyd0ZXN0IDEnLCAndGVzdCAyJ10pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHF1ZXVlVHlwZXNbJ3Rlc3QgMSddLCAzKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihxdWV1ZVR5cGVzWyd0ZXN0IDInXSwgMik7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuIG92ZXJyaWRlIHRoZSBpbnNlcnRpb24gbG9naWMsIHNraXBwaW5nIHN0b3JhZ2UgcGVyc2lzdGVuY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzdG9yZSA9IG5ldyBUZXN0Sm9iUXVldWVTdG9yZSgpO1xuXG4gICAgICBjbGFzcyBUZXN0UXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxzdHJpbmc+IHtcbiAgICAgICAgcGFyc2VEYXRhKGRhdGE6IHVua25vd24pOiBzdHJpbmcge1xuICAgICAgICAgIHJldHVybiB6LnN0cmluZygpLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWV1ZSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgIG1heEF0dGVtcHRzOiAxLFxuICAgICAgfSk7XG5cbiAgICAgIHF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAgICAgY29uc3QgaW5zZXJ0ID0gc2lub24uc3R1YigpLnJlc29sdmVzKCk7XG5cbiAgICAgIGF3YWl0IHF1ZXVlLmFkZCgnZm9vIGJhcicsIGluc2VydCk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZS5zdG9yZWRKb2JzLCAwKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoaW5zZXJ0KTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICBpbnNlcnQsXG4gICAgICAgIHNpbm9uLm1hdGNoKHtcbiAgICAgICAgICBpZDogc2lub24ubWF0Y2guc3RyaW5nLFxuICAgICAgICAgIHRpbWVzdGFtcDogc2lub24ubWF0Y2gubnVtYmVyLFxuICAgICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUnLFxuICAgICAgICAgIGRhdGE6ICdmb28gYmFyJyxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0cmllcyBqb2JzLCBydW5uaW5nIHRoZW0gdXAgdG8gbWF4QXR0ZW1wdHMgdGltZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICB0eXBlIFRlc3RKb2JEYXRhID0gJ2ZvbycgfCAnYmFyJztcblxuICAgICAgbGV0IGZvb0F0dGVtcHRzID0gMDtcbiAgICAgIGxldCBiYXJBdHRlbXB0cyA9IDA7XG4gICAgICBsZXQgZm9vU3VjY2VlZGVkID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IFRlc3RKb2JRdWV1ZVN0b3JlKCk7XG5cbiAgICAgIGNsYXNzIFJldHJ5UXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxUZXN0Sm9iRGF0YT4ge1xuICAgICAgICBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IFRlc3RKb2JEYXRhIHtcbiAgICAgICAgICBpZiAoZGF0YSAhPT0gJ2ZvbycgJiYgZGF0YSAhPT0gJ2JhcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkYXRhJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKHsgZGF0YSB9OiBQYXJzZWRKb2I8VGVzdEpvYkRhdGE+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgc3dpdGNoIChkYXRhKSB7XG4gICAgICAgICAgICBjYXNlICdmb28nOlxuICAgICAgICAgICAgICBmb29BdHRlbXB0cyArPSAxO1xuICAgICAgICAgICAgICBpZiAoZm9vQXR0ZW1wdHMgPCAzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgJ2ZvbyBqb2Igc2hvdWxkIGZhaWwgdGhlIGZpcnN0IGFuZCBzZWNvbmQgdGltZSdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvb1N1Y2NlZWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmFyJzpcbiAgICAgICAgICAgICAgYmFyQXR0ZW1wdHMgKz0gMTtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXIgam9iIGFsd2F5cyBmYWlscyBpbiB0aGlzIHRlc3QnKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXRyeVF1ZXVlID0gbmV3IFJldHJ5UXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCByZXRyeSBxdWV1ZScsXG4gICAgICAgIG1heEF0dGVtcHRzOiA1LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHJ5UXVldWUuc3RyZWFtSm9icygpO1xuXG4gICAgICBhd2FpdCAoXG4gICAgICAgIGF3YWl0IHJldHJ5UXVldWUuYWRkKCdmb28nKVxuICAgICAgKS5jb21wbGV0aW9uO1xuXG4gICAgICBsZXQgYm9vRXJyOiB1bmtub3duO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgKFxuICAgICAgICAgIGF3YWl0IHJldHJ5UXVldWUuYWRkKCdiYXInKVxuICAgICAgICApLmNvbXBsZXRpb247XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgYm9vRXJyID0gZXJyO1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9vQXR0ZW1wdHMsIDMpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShmb29TdWNjZWVkZWQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYmFyQXR0ZW1wdHMsIDUpO1xuXG4gICAgICAvLyBDaGFpJ3MgYGFzc2VydC5pbnN0YW5jZU9mYCBkb2Vzbid0IHRlbGwgVHlwZVNjcmlwdCBhbnl0aGluZywgc28gd2UgZG8gaXQgaGVyZS5cbiAgICAgIGlmICghKGJvb0VyciBpbnN0YW5jZW9mIEpvYkVycm9yKSkge1xuICAgICAgICBhc3NlcnQuZmFpbCgnRXhwZWN0ZWQgZXJyb3IgdG8gYmUgYSBKb2JFcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhc3NlcnQuaW5jbHVkZShib29FcnIubWVzc2FnZSwgJ2JhciBqb2IgYWx3YXlzIGZhaWxzIGluIHRoaXMgdGVzdCcpO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShzdG9yZS5zdG9yZWRKb2JzKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXNzZXMgdGhlIGF0dGVtcHQgbnVtYmVyIHRvIHRoZSBydW4gZnVuY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBhdHRlbXB0czogQXJyYXk8bnVtYmVyPiA9IFtdO1xuXG4gICAgICBjb25zdCBzdG9yZSA9IG5ldyBUZXN0Sm9iUXVldWVTdG9yZSgpO1xuXG4gICAgICBjbGFzcyBUZXN0UXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxzdHJpbmc+IHtcbiAgICAgICAgcGFyc2VEYXRhKGRhdGE6IHVua25vd24pOiBzdHJpbmcge1xuICAgICAgICAgIHJldHVybiB6LnN0cmluZygpLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKFxuICAgICAgICAgIF86IHVua25vd24sXG4gICAgICAgICAgeyBhdHRlbXB0IH06IFJlYWRvbmx5PHsgYXR0ZW1wdDogbnVtYmVyIH0+XG4gICAgICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIGF0dGVtcHRzLnB1c2goYXR0ZW1wdCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGpvYiBhbHdheXMgZmFpbHMnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWV1ZSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCcsXG4gICAgICAgIG1heEF0dGVtcHRzOiA2LFxuICAgICAgfSk7XG5cbiAgICAgIHF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgKFxuICAgICAgICAgIGF3YWl0IHF1ZXVlLmFkZCgnZm9vJylcbiAgICAgICAgKS5jb21wbGV0aW9uO1xuICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgIC8vIFdlIGV4cGVjdCB0aGlzIHRvIGZhaWwuXG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYXR0ZW1wdHMsIFsxLCAyLCAzLCA0LCA1LCA2XSk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFzc2VzIGEgbG9nZ2VyIHRvIHRoZSBydW4gZnVuY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1bmlxdWVTdHJpbmcgPSB1dWlkKCk7XG5cbiAgICAgIGNvbnN0IGZha2VMb2dnZXIgPSB7XG4gICAgICAgIGZhdGFsOiBzaW5vbi5mYWtlKCksXG4gICAgICAgIGVycm9yOiBzaW5vbi5mYWtlKCksXG4gICAgICAgIHdhcm46IHNpbm9uLmZha2UoKSxcbiAgICAgICAgaW5mbzogc2lub24uZmFrZSgpLFxuICAgICAgICBkZWJ1Zzogc2lub24uZmFrZSgpLFxuICAgICAgICB0cmFjZTogc2lub24uZmFrZSgpLFxuICAgICAgfTtcblxuICAgICAgY2xhc3MgVGVzdFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8bnVtYmVyPiB7XG4gICAgICAgIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogbnVtYmVyIHtcbiAgICAgICAgICByZXR1cm4gei5udW1iZXIoKS5wYXJzZShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzeW5jIHJ1bihcbiAgICAgICAgICBfOiB1bmtub3duLFxuICAgICAgICAgIHsgbG9nIH06IFJlYWRvbmx5PHsgbG9nOiBMb2dnZXJUeXBlIH0+XG4gICAgICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIGxvZy5pbmZvKHVuaXF1ZVN0cmluZyk7XG4gICAgICAgICAgbG9nLndhcm4odW5pcXVlU3RyaW5nKTtcbiAgICAgICAgICBsb2cuZXJyb3IodW5pcXVlU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWV1ZSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZTogbmV3IFRlc3RKb2JRdWV1ZVN0b3JlKCksXG4gICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUgMTIzJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDYsXG4gICAgICAgIGxvZ2dlcjogZmFrZUxvZ2dlcixcbiAgICAgIH0pO1xuXG4gICAgICBxdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IHF1ZXVlLmFkZCgxKTtcbiAgICAgIGF3YWl0IGpvYi5jb21wbGV0aW9uO1xuXG4gICAgICBbZmFrZUxvZ2dlci5pbmZvLCBmYWtlTG9nZ2VyLndhcm4sIGZha2VMb2dnZXIuZXJyb3JdLmZvckVhY2gobG9nRm4gPT4ge1xuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgICBsb2dGbixcbiAgICAgICAgICBzaW5vbi5tYXRjaChcbiAgICAgICAgICAgIChhcmc6IHVua25vd24pID0+XG4gICAgICAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgIGFyZy5pbmNsdWRlcyhqb2IuaWQpICYmXG4gICAgICAgICAgICAgIGFyZy5pbmNsdWRlcygndGVzdCBxdWV1ZSAxMjMnKVxuICAgICAgICAgICksXG4gICAgICAgICAgc2lub24ubWF0Y2goXG4gICAgICAgICAgICAoYXJnOiB1bmtub3duKSA9PlxuICAgICAgICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJiBhcmcuaW5jbHVkZXModW5pcXVlU3RyaW5nKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ha2VzIGpvYi5jb21wbGV0aW9uIHJlamVjdCBpZiBwYXJzZURhdGEgdGhyb3dzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY2xhc3MgVGVzdFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8c3RyaW5nPiB7XG4gICAgICAgIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogc3RyaW5nIHtcbiAgICAgICAgICBpZiAoZGF0YSA9PT0gJ3ZhbGlkJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndWggb2gnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzeW5jIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVldWUgPSBuZXcgVGVzdFF1ZXVlKHtcbiAgICAgICAgc3RvcmU6IG5ldyBUZXN0Sm9iUXVldWVTdG9yZSgpLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IHF1ZXVlJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDk5OSxcbiAgICAgIH0pO1xuXG4gICAgICBxdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IHF1ZXVlLmFkZCgndGhpcyB3aWxsIGZhaWwgdG8gcGFyc2UnKTtcblxuICAgICAgbGV0IGpvYkVycm9yOiB1bmtub3duO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgam9iLmNvbXBsZXRpb247XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgam9iRXJyb3IgPSBlcnI7XG4gICAgICB9XG5cbiAgICAgIC8vIENoYWkncyBgYXNzZXJ0Lmluc3RhbmNlT2ZgIGRvZXNuJ3QgdGVsbCBUeXBlU2NyaXB0IGFueXRoaW5nLCBzbyB3ZSBkbyBpdCBoZXJlLlxuICAgICAgaWYgKCEoam9iRXJyb3IgaW5zdGFuY2VvZiBKb2JFcnJvcikpIHtcbiAgICAgICAgYXNzZXJ0LmZhaWwoJ0V4cGVjdGVkIGVycm9yIHRvIGJlIGEgSm9iRXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXNzZXJ0LmluY2x1ZGUoXG4gICAgICAgIGpvYkVycm9yLm1lc3NhZ2UsXG4gICAgICAgICdGYWlsZWQgdG8gcGFyc2Ugam9iIGRhdGEuIFdhcyB1bmV4cGVjdGVkIGRhdGEgbG9hZGVkIGZyb20gdGhlIGRhdGFiYXNlPydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdChcImRvZXNuJ3QgcnVuIHRoZSBqb2IgaWYgcGFyc2VEYXRhIHRocm93c1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBydW4gPSBzaW5vbi5zdHViKCkucmVzb2x2ZXMoKTtcblxuICAgICAgY2xhc3MgVGVzdFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8c3RyaW5nPiB7XG4gICAgICAgIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogc3RyaW5nIHtcbiAgICAgICAgICBpZiAoZGF0YSA9PT0gJ3ZhbGlkJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcnVuKGpvYjogeyBkYXRhOiBzdHJpbmcgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIHJldHVybiBydW4oam9iKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWV1ZSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZTogbmV3IFRlc3RKb2JRdWV1ZVN0b3JlKCksXG4gICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUnLFxuICAgICAgICBtYXhBdHRlbXB0czogOTk5LFxuICAgICAgfSk7XG5cbiAgICAgIHF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAgICAgKGF3YWl0IHF1ZXVlLmFkZCgnaW52YWxpZCcpKS5jb21wbGV0aW9uLmNhdGNoKG5vb3ApO1xuICAgICAgKGF3YWl0IHF1ZXVlLmFkZCgnaW52YWxpZCcpKS5jb21wbGV0aW9uLmNhdGNoKG5vb3ApO1xuICAgICAgYXdhaXQgcXVldWUuYWRkKCd2YWxpZCcpO1xuICAgICAgKGF3YWl0IHF1ZXVlLmFkZCgnaW52YWxpZCcpKS5jb21wbGV0aW9uLmNhdGNoKG5vb3ApO1xuICAgICAgKGF3YWl0IHF1ZXVlLmFkZCgnaW52YWxpZCcpKS5jb21wbGV0aW9uLmNhdGNoKG5vb3ApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShydW4pO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGhNYXRjaChydW4sIHsgZGF0YTogJ3ZhbGlkJyB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWxldGVzIGpvYnMgZnJvbSBzdG9yYWdlIGlmIHBhcnNlRGF0YSB0aHJvd3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzdG9yZSA9IG5ldyBUZXN0Sm9iUXVldWVTdG9yZSgpO1xuXG4gICAgICBjbGFzcyBUZXN0UXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTxzdHJpbmc+IHtcbiAgICAgICAgcGFyc2VEYXRhKGRhdGE6IHVua25vd24pOiBzdHJpbmcge1xuICAgICAgICAgIGlmIChkYXRhID09PSAndmFsaWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGRhdGEhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IFRlc3RRdWV1ZSh7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IHF1ZXVlJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDk5OSxcbiAgICAgIH0pO1xuXG4gICAgICBxdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIGF3YWl0IChhd2FpdCBxdWV1ZS5hZGQoJ2ludmFsaWQgMScpKS5jb21wbGV0aW9uLmNhdGNoKG5vb3ApO1xuICAgICAgYXdhaXQgKGF3YWl0IHF1ZXVlLmFkZCgnaW52YWxpZCAyJykpLmNvbXBsZXRpb24uY2F0Y2gobm9vcCk7XG4gICAgICBhd2FpdCBxdWV1ZS5hZGQoJ3ZhbGlkJyk7XG5cbiAgICAgIGNvbnN0IGRhdGFzID0gc3RvcmUuc3RvcmVkSm9icy5tYXAoam9iID0+IGpvYi5kYXRhKTtcbiAgICAgIGFzc2VydC5zYW1lTWVtYmVycyhkYXRhcywgWyd2YWxpZCddKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRpbmcgdGhlIGpvYiByZXNvbHZlcyBBRlRFUiBpbnNlcnRpbmcgdGhlIGpvYiBpbnRvIHRoZSBkYXRhYmFzZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBpbnNlcnRlZCA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBzdG9yZSA9IG5ldyBUZXN0Sm9iUXVldWVTdG9yZSgpO1xuICAgICAgc3RvcmUuZXZlbnRzLm9uKCdpbnNlcnQnLCAoKSA9PiB7XG4gICAgICAgIGluc2VydGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBjbGFzcyBUZXN0UXVldWUgZXh0ZW5kcyBKb2JRdWV1ZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcGFyc2VEYXRhKF86IHVua25vd24pOiB1bmRlZmluZWQge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IFRlc3RRdWV1ZSh7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IHF1ZXVlJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDk5OSxcbiAgICAgIH0pO1xuXG4gICAgICBxdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIGNvbnN0IGFkZFByb21pc2UgPSBxdWV1ZS5hZGQodW5kZWZpbmVkKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGluc2VydGVkKTtcblxuICAgICAgYXdhaXQgYWRkUHJvbWlzZTtcbiAgICAgIGFzc2VydC5pc1RydWUoaW5zZXJ0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3N0YXJ0cyB0aGUgam9iIEFGVEVSIGluc2VydGluZyB0aGUgam9iIGludG8gdGhlIGRhdGFiYXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnRzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IFRlc3RKb2JRdWV1ZVN0b3JlKCk7XG4gICAgICBzdG9yZS5ldmVudHMub24oJ2luc2VydCcsICgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goJ2luc2VydCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGNsYXNzIFRlc3RRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPHVua25vd24+IHtcbiAgICAgICAgcGFyc2VEYXRhKGRhdGE6IHVua25vd24pOiB1bmtub3duIHtcbiAgICAgICAgICBldmVudHMucHVzaCgncGFyc2luZyBkYXRhJyk7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgZXZlbnRzLnB1c2goJ3J1bm5pbmcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWV1ZSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICAgIG1heEF0dGVtcHRzOiA5OTksXG4gICAgICB9KTtcblxuICAgICAgcXVldWUuc3RyZWFtSm9icygpO1xuXG4gICAgICBhd2FpdCAoXG4gICAgICAgIGF3YWl0IHF1ZXVlLmFkZCgxMjMpXG4gICAgICApLmNvbXBsZXRpb247XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZXZlbnRzLCBbJ2luc2VydCcsICdwYXJzaW5nIGRhdGEnLCAncnVubmluZyddKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXNvbHZlcyBqb2IuY29tcGxldGlvbiBBRlRFUiBkZWxldGluZyB0aGUgam9iIGZyb20gdGhlIGRhdGFiYXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnRzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgIGNvbnN0IHN0b3JlID0gbmV3IFRlc3RKb2JRdWV1ZVN0b3JlKCk7XG4gICAgICBzdG9yZS5ldmVudHMub24oJ2RlbGV0ZScsICgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goJ2RlbGV0ZScpO1xuICAgICAgfSk7XG5cbiAgICAgIGNsYXNzIFRlc3RRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPHVuZGVmaW5lZD4ge1xuICAgICAgICBwYXJzZURhdGEoXzogdW5rbm93bik6IHVuZGVmaW5lZCB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzeW5jIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVldWUgPSBuZXcgVGVzdFF1ZXVlKHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIHF1ZXVlVHlwZTogJ3Rlc3QgcXVldWUnLFxuICAgICAgICBtYXhBdHRlbXB0czogOTk5LFxuICAgICAgfSk7XG5cbiAgICAgIHF1ZXVlLnN0cmVhbUpvYnMoKTtcblxuICAgICAgc3RvcmUucGF1c2VTdHJlYW0oJ3Rlc3QgcXVldWUnKTtcbiAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IHF1ZXVlLmFkZCh1bmRlZmluZWQpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1vcmUvbm8tdGhlblxuICAgICAgY29uc3Qgam9iQ29tcGxldGlvblByb21pc2UgPSBqb2IuY29tcGxldGlvbi50aGVuKCgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goJ3Jlc29sdmVkJyk7XG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZS5zdG9yZWRKb2JzLCAxKTtcblxuICAgICAgc3RvcmUucmVzdW1lU3RyZWFtKCd0ZXN0IHF1ZXVlJyk7XG5cbiAgICAgIGF3YWl0IGpvYkNvbXBsZXRpb25Qcm9taXNlO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGV2ZW50cywgWydkZWxldGUnLCAncmVzb2x2ZWQnXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWYgdGhlIGpvYiBmYWlscyBhZnRlciBldmVyeSBhdHRlbXB0LCByZWplY3RzIGpvYi5jb21wbGV0aW9uIEFGVEVSIGRlbGV0aW5nIHRoZSBqb2IgZnJvbSB0aGUgZGF0YWJhc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudHM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgY29uc3Qgc3RvcmUgPSBuZXcgVGVzdEpvYlF1ZXVlU3RvcmUoKTtcbiAgICAgIHN0b3JlLmV2ZW50cy5vbignZGVsZXRlJywgKCkgPT4ge1xuICAgICAgICBldmVudHMucHVzaCgnZGVsZXRlJyk7XG4gICAgICB9KTtcblxuICAgICAgY2xhc3MgVGVzdFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHBhcnNlRGF0YShfOiB1bmtub3duKTogdW5kZWZpbmVkIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIGV2ZW50cy5wdXNoKCdydW5uaW5nJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1aCBvaCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IFRlc3RRdWV1ZSh7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IHF1ZXVlJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDUsXG4gICAgICB9KTtcblxuICAgICAgcXVldWUuc3RyZWFtSm9icygpO1xuXG4gICAgICBzdG9yZS5wYXVzZVN0cmVhbSgndGVzdCBxdWV1ZScpO1xuICAgICAgY29uc3Qgam9iID0gYXdhaXQgcXVldWUuYWRkKHVuZGVmaW5lZCk7XG4gICAgICBjb25zdCBqb2JDb21wbGV0aW9uUHJvbWlzZSA9IGpvYi5jb21wbGV0aW9uLmNhdGNoKCgpID0+IHtcbiAgICAgICAgZXZlbnRzLnB1c2goJ3JlamVjdGVkJyk7XG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihzdG9yZS5zdG9yZWRKb2JzLCAxKTtcblxuICAgICAgc3RvcmUucmVzdW1lU3RyZWFtKCd0ZXN0IHF1ZXVlJyk7XG5cbiAgICAgIGF3YWl0IGpvYkNvbXBsZXRpb25Qcm9taXNlO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGV2ZW50cywgW1xuICAgICAgICAncnVubmluZycsXG4gICAgICAgICdydW5uaW5nJyxcbiAgICAgICAgJ3J1bm5pbmcnLFxuICAgICAgICAncnVubmluZycsXG4gICAgICAgICdydW5uaW5nJyxcbiAgICAgICAgJ2RlbGV0ZScsXG4gICAgICAgICdyZWplY3RlZCcsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3N0cmVhbUpvYnMnLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RvcmVkSm9iU2NoZW1hID0gei5vYmplY3Qoe1xuICAgICAgaWQ6IHouc3RyaW5nKCksXG4gICAgICB0aW1lc3RhbXA6IHoubnVtYmVyKCksXG4gICAgICBxdWV1ZVR5cGU6IHouc3RyaW5nKCksXG4gICAgICBkYXRhOiB6LnVua25vd24oKSxcbiAgICB9KTtcblxuICAgIGNsYXNzIEZha2VTdHJlYW0gaW1wbGVtZW50cyBBc3luY0l0ZXJhYmxlPFN0b3JlZEpvYj4ge1xuICAgICAgcHJpdmF0ZSBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAgIGFzeW5jICpbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgY29uc3QgW2pvYl0gPSBhd2FpdCBvbmNlKHRoaXMuZXZlbnRFbWl0dGVyLCAnZHJpcCcpO1xuICAgICAgICAgIHlpZWxkIHN0b3JlZEpvYlNjaGVtYS5wYXJzZShqb2IpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRyaXAoam9iOiBSZWFkb25seTxTdG9yZWRKb2I+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ2RyaXAnLCBqb2IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBmYWtlU3RyZWFtOiBGYWtlU3RyZWFtO1xuICAgIGxldCBmYWtlU3RvcmU6IEpvYlF1ZXVlU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGZha2VTdHJlYW0gPSBuZXcgRmFrZVN0cmVhbSgpO1xuICAgICAgZmFrZVN0b3JlID0ge1xuICAgICAgICBpbnNlcnQ6IHNpbm9uLnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgICBkZWxldGU6IHNpbm9uLnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgICBzdHJlYW06IHNpbm9uLnN0dWIoKS5yZXR1cm5zKGZha2VTdHJlYW0pLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGl0KCdzdGFydHMgc3RyZWFtaW5nIGpvYnMgZnJvbSB0aGUgc3RvcmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAgIGNsYXNzIFRlc3RRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPG51bWJlcj4ge1xuICAgICAgICBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IG51bWJlciB7XG4gICAgICAgICAgcmV0dXJuIHoubnVtYmVyKCkucGFyc2UoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYyBydW4oeyBkYXRhIH06IFJlYWRvbmx5PHsgZGF0YTogbnVtYmVyIH0+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoJ3J1bicsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vb3BRdWV1ZSA9IG5ldyBUZXN0UXVldWUoe1xuICAgICAgICBzdG9yZTogZmFrZVN0b3JlLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IG5vb3AgcXVldWUnLFxuICAgICAgICBtYXhBdHRlbXB0czogOTksXG4gICAgICB9KTtcblxuICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChmYWtlU3RvcmUuc3RyZWFtIGFzIHNpbm9uLlNpbm9uU3R1Yik7XG5cbiAgICAgIG5vb3BRdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZha2VTdG9yZS5zdHJlYW0gYXMgc2lub24uU2lub25TdHViKTtcblxuICAgICAgZmFrZVN0cmVhbS5kcmlwKHtcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IG5vb3AgcXVldWUnLFxuICAgICAgICBkYXRhOiAxMjMsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IFtmaXJzdFJ1bkRhdGFdID0gYXdhaXQgb25jZShldmVudEVtaXR0ZXIsICdydW4nKTtcblxuICAgICAgZmFrZVN0cmVhbS5kcmlwKHtcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICBxdWV1ZVR5cGU6ICd0ZXN0IG5vb3AgcXVldWUnLFxuICAgICAgICBkYXRhOiA0NTYsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IFtzZWNvbmRSdW5EYXRhXSA9IGF3YWl0IG9uY2UoZXZlbnRFbWl0dGVyLCAncnVuJyk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaXJzdFJ1bkRhdGEsIDEyMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2Vjb25kUnVuRGF0YSwgNDU2KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZWplY3RzIHdoZW4gY2FsbGVkIG1vcmUgdGhhbiBvbmNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY2xhc3MgVGVzdFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8dW5rbm93bj4ge1xuICAgICAgICBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IHVua25vd24ge1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBub29wUXVldWUgPSBuZXcgVGVzdFF1ZXVlKHtcbiAgICAgICAgc3RvcmU6IGZha2VTdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBub29wIHF1ZXVlJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDk5LFxuICAgICAgfSk7XG5cbiAgICAgIG5vb3BRdWV1ZS5zdHJlYW1Kb2JzKCk7XG5cbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKG5vb3BRdWV1ZS5zdHJlYW1Kb2JzKCkpO1xuICAgICAgYXdhaXQgYXNzZXJ0LmlzUmVqZWN0ZWQobm9vcFF1ZXVlLnN0cmVhbUpvYnMoKSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZha2VTdG9yZS5zdHJlYW0gYXMgc2lub24uU2lub25TdHViKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FkZCcsICgpID0+IHtcbiAgICBpdCgncmVqZWN0cyBpZiB0aGUgam9iIHF1ZXVlIGhhcyBub3Qgc3RhcnRlZCBzdHJlYW1pbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlU3RvcmUgPSB7XG4gICAgICAgIGluc2VydDogc2lub24uc3R1YigpLnJlc29sdmVzKCksXG4gICAgICAgIGRlbGV0ZTogc2lub24uc3R1YigpLnJlc29sdmVzKCksXG4gICAgICAgIHN0cmVhbTogc2lub24uc3R1YigpLFxuICAgICAgfTtcblxuICAgICAgY2xhc3MgVGVzdFF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHBhcnNlRGF0YShfOiB1bmtub3duKTogdW5kZWZpbmVkIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBub29wUXVldWUgPSBuZXcgVGVzdFF1ZXVlKHtcbiAgICAgICAgc3RvcmU6IGZha2VTdG9yZSxcbiAgICAgICAgcXVldWVUeXBlOiAndGVzdCBub29wIHF1ZXVlJyxcbiAgICAgICAgbWF4QXR0ZW1wdHM6IDk5LFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKG5vb3BRdWV1ZS5hZGQodW5kZWZpbmVkKSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVN0b3JlLnN0cmVhbSBhcyBzaW5vbi5TaW5vblN0dWIpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUN2QixvQkFBbUM7QUFDbkMsaUJBQWtCO0FBQ2xCLG9CQUE4QjtBQUM5QixrQkFBMkI7QUFDM0IscUJBQW1CO0FBQ25CLHNCQUF5QjtBQUN6QiwrQkFBa0M7QUFDbEMsOEJBQWlDO0FBR2pDLHNCQUF5QjtBQUd6QixTQUFTLFlBQVksTUFBTTtBQUN6QixXQUFTLG9CQUFvQixNQUFNO0FBQ2pDLE9BQUcsc0VBQXNFLFlBQVk7QUFDbkYsWUFBTSxnQkFBZ0IsYUFBRSxPQUFPO0FBQUEsUUFDN0IsR0FBRyxhQUFFLE9BQU87QUFBQSxRQUNaLEdBQUcsYUFBRSxPQUFPO0FBQUEsTUFDZCxDQUFDO0FBSUQsWUFBTSxVQUFVLG9CQUFJLElBQWE7QUFDakMsWUFBTSxRQUFRLElBQUksMkNBQWtCO0FBRXBDLFlBQU0sY0FBYyx5QkFBc0I7QUFBQSxRQUN4QyxVQUFVLE1BQTRCO0FBQ3BDLGlCQUFPLGNBQWMsTUFBTSxJQUFJO0FBQUEsUUFDakM7QUFBQSxjQUVNLElBQUksRUFBRSxRQUErQztBQUN6RCxrQkFBUSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUM7QUFBQSxRQUM3QjtBQUFBLE1BQ0Y7QUFSQSxBQVVBLFlBQU0sV0FBVyxJQUFJLE1BQU07QUFBQSxRQUN6QjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUVELHlCQUFPLFVBQVUsU0FBUyxvQkFBSSxJQUFJLENBQUM7QUFDbkMseUJBQU8sUUFBUSxNQUFNLFVBQVU7QUFFL0IsZUFBUyxXQUFXO0FBRXBCLFlBQU0sWUFBWSxnQkFBZ0I7QUFD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
