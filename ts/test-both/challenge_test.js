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
var import_lodash = require("lodash");
var sinon = __toESM(require("sinon"));
var import_challenge = require("../challenge");
var import_durations = require("../util/durations");
const NOW = Date.now();
const NEVER_RETRY = NOW + import_durations.DAY;
const IMMEDIATE_RETRY = NOW - import_durations.DAY;
const DEFAULT_RETRY_AFTER = 25;
const SOLVE_AFTER = 5;
describe("ChallengeHandler", () => {
  const storage = /* @__PURE__ */ new Map();
  let challengeStatus = "idle";
  let queuesStarted = [];
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    storage.clear();
    challengeStatus = "idle";
    queuesStarted = [];
    this.sandbox = sinon.createSandbox();
    this.clock = this.sandbox.useFakeTimers({
      now: NOW
    });
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.sandbox.restore();
  }, "afterEach"));
  const createChallenge = /* @__PURE__ */ __name((conversationId, options = {}) => {
    return {
      conversationId,
      token: "1",
      retryAt: NOW + DEFAULT_RETRY_AFTER,
      createdAt: NOW - import_durations.SECOND,
      ...options
    };
  }, "createChallenge");
  const createHandler = /* @__PURE__ */ __name(async ({
    autoSolve = false,
    challengeError,
    expireAfter,
    onChallengeSolved = import_lodash.noop,
    onChallengeFailed = import_lodash.noop
  } = {}) => {
    const handler = new import_challenge.ChallengeHandler({
      expireAfter,
      storage: {
        get(key) {
          return storage.get(key);
        },
        async put(key, value) {
          storage.set(key, value);
        }
      },
      startQueue(conversationId) {
        queuesStarted.push(conversationId);
      },
      onChallengeSolved,
      onChallengeFailed,
      requestChallenge(request) {
        if (!autoSolve) {
          return;
        }
        setTimeout(() => {
          handler.onResponse({
            seq: request.seq,
            data: { captcha: "captcha" }
          });
        }, SOLVE_AFTER);
      },
      async sendChallengeResponse() {
        if (challengeError) {
          throw challengeError;
        }
      },
      setChallengeStatus(status) {
        challengeStatus = status;
      }
    });
    await handler.load();
    await handler.onOnline();
    return handler;
  }, "createHandler");
  const isInStorage = /* @__PURE__ */ __name((conversationId) => {
    return (storage.get(import_challenge.STORAGE_KEY) || []).some(({ conversationId: storageId }) => {
      return storageId === conversationId;
    });
  }, "isInStorage");
  it("should automatically start queue after timeout", async function test() {
    const handler = await createHandler();
    const one = createChallenge("1");
    await handler.register(one);
    import_chai.assert.isTrue(isInStorage(one.conversationId));
    import_chai.assert.equal(challengeStatus, "required");
    await this.clock.nextAsync();
    import_chai.assert.deepEqual(queuesStarted, [one.conversationId]);
    import_chai.assert.equal(challengeStatus, "idle");
    import_chai.assert.isFalse(isInStorage(one.conversationId));
  });
  it("should send challenge response", async function test() {
    const handler = await createHandler({ autoSolve: true });
    const one = createChallenge("1", {
      retryAt: NEVER_RETRY
    });
    await handler.register(one);
    import_chai.assert.equal(challengeStatus, "required");
    await this.clock.nextAsync();
    import_chai.assert.deepEqual(queuesStarted, [one.conversationId]);
    import_chai.assert.isFalse(isInStorage(one.conversationId));
    import_chai.assert.equal(challengeStatus, "idle");
  });
  it("should send old challenges", async function test() {
    const handler = await createHandler();
    const challenges = [
      createChallenge("1"),
      createChallenge("2"),
      createChallenge("3")
    ];
    for (const challenge of challenges) {
      await handler.register(challenge);
    }
    import_chai.assert.equal(challengeStatus, "required");
    import_chai.assert.deepEqual(queuesStarted, []);
    for (const challenge of challenges) {
      import_chai.assert.isTrue(isInStorage(challenge.conversationId), `${challenge.conversationId} should be in storage`);
    }
    await handler.onOffline();
    await this.clock.nextAsync();
    await createHandler();
    for (const challenge of challenges) {
      await handler.unregister(challenge.conversationId);
    }
    for (const challenge of challenges) {
      import_chai.assert.isFalse(isInStorage(challenge.conversationId), `${challenge.conversationId} should not be in storage`);
    }
    import_chai.assert.deepEqual(queuesStarted, ["1", "2", "3"]);
    import_chai.assert.equal(challengeStatus, "idle");
  });
  it("should send challenge immediately if it is ready", async () => {
    const handler = await createHandler();
    const one = createChallenge("1", {
      retryAt: IMMEDIATE_RETRY
    });
    await handler.register(one);
    import_chai.assert.equal(challengeStatus, "idle");
    import_chai.assert.deepEqual(queuesStarted, [one.conversationId]);
  });
  it("should not retry expired challenges", async function test() {
    const handler = await createHandler();
    const one = createChallenge("1");
    await handler.register(one);
    import_chai.assert.isTrue(isInStorage(one.conversationId));
    const newHandler = await createHandler({
      autoSolve: true,
      expireAfter: -1
    });
    await handler.unregister(one.conversationId);
    challengeStatus = "idle";
    await newHandler.load();
    import_chai.assert.equal(challengeStatus, "idle");
    import_chai.assert.deepEqual(queuesStarted, []);
    await this.clock.nextAsync();
    import_chai.assert.equal(challengeStatus, "idle");
    import_chai.assert.deepEqual(queuesStarted, []);
    import_chai.assert.isFalse(isInStorage(one.conversationId));
  });
  it("should send challenges that matured while we were offline", async function test() {
    const handler = await createHandler();
    const one = createChallenge("1");
    await handler.register(one);
    import_chai.assert.isTrue(isInStorage(one.conversationId));
    import_chai.assert.deepEqual(queuesStarted, []);
    import_chai.assert.equal(challengeStatus, "required");
    await handler.onOffline();
    await this.clock.nextAsync();
    import_chai.assert.isTrue(isInStorage(one.conversationId));
    import_chai.assert.deepEqual(queuesStarted, []);
    import_chai.assert.equal(challengeStatus, "required");
    await handler.onOnline();
    import_chai.assert.isFalse(isInStorage(one.conversationId));
    import_chai.assert.deepEqual(queuesStarted, [one.conversationId]);
    import_chai.assert.equal(challengeStatus, "idle");
  });
  it("should trigger onChallengeSolved", async function test() {
    const onChallengeSolved = sinon.stub();
    const handler = await createHandler({
      autoSolve: true,
      onChallengeSolved
    });
    const one = createChallenge("1", {
      retryAt: NEVER_RETRY
    });
    await handler.register(one);
    await this.clock.nextAsync();
    sinon.assert.calledOnce(onChallengeSolved);
  });
  it("should trigger onChallengeFailed", async function test() {
    const onChallengeFailed = sinon.stub();
    const handler = await createHandler({
      autoSolve: true,
      challengeError: new Error("custom failure"),
      onChallengeFailed
    });
    const one = createChallenge("1", {
      retryAt: NEVER_RETRY
    });
    await handler.register(one);
    await this.clock.nextAsync();
    sinon.assert.calledOnce(onChallengeFailed);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2hhbGxlbmdlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcbi8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgU1RPUkFHRV9LRVksIENoYWxsZW5nZUhhbmRsZXIgfSBmcm9tICcuLi9jaGFsbGVuZ2UnO1xuaW1wb3J0IHR5cGUgeyBSZWdpc3RlcmVkQ2hhbGxlbmdlVHlwZSB9IGZyb20gJy4uL2NoYWxsZW5nZSc7XG5pbXBvcnQgeyBEQVksIFNFQ09ORCB9IGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcblxudHlwZSBDcmVhdGVIYW5kbGVyT3B0aW9ucyA9IHtcbiAgcmVhZG9ubHkgYXV0b1NvbHZlPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2hhbGxlbmdlRXJyb3I/OiBFcnJvcjtcbiAgcmVhZG9ubHkgZXhwaXJlQWZ0ZXI/OiBudW1iZXI7XG4gIHJlYWRvbmx5IG9uQ2hhbGxlbmdlU29sdmVkPzogKCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25DaGFsbGVuZ2VGYWlsZWQ/OiAocmV0cnlBdD86IG51bWJlcikgPT4gdm9pZDtcbn07XG5cbmNvbnN0IE5PVyA9IERhdGUubm93KCk7XG5jb25zdCBORVZFUl9SRVRSWSA9IE5PVyArIERBWTtcbmNvbnN0IElNTUVESUFURV9SRVRSWSA9IE5PVyAtIERBWTtcblxuLy8gVmFyaW91cyB0aW1lb3V0cyBpbiBtaWxsaXNlY29uZHNcbmNvbnN0IERFRkFVTFRfUkVUUllfQUZURVIgPSAyNTtcbmNvbnN0IFNPTFZFX0FGVEVSID0gNTtcblxuZGVzY3JpYmUoJ0NoYWxsZW5nZUhhbmRsZXInLCAoKSA9PiB7XG4gIGNvbnN0IHN0b3JhZ2UgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBsZXQgY2hhbGxlbmdlU3RhdHVzID0gJ2lkbGUnO1xuICBsZXQgcXVldWVzU3RhcnRlZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICBzdG9yYWdlLmNsZWFyKCk7XG4gICAgY2hhbGxlbmdlU3RhdHVzID0gJ2lkbGUnO1xuICAgIHF1ZXVlc1N0YXJ0ZWQgPSBbXTtcblxuICAgIHRoaXMuc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgICB0aGlzLmNsb2NrID0gdGhpcy5zYW5kYm94LnVzZUZha2VUaW1lcnMoe1xuICAgICAgbm93OiBOT1csXG4gICAgfSk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChmdW5jdGlvbiBhZnRlckVhY2goKSB7XG4gICAgdGhpcy5zYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgY29uc3QgY3JlYXRlQ2hhbGxlbmdlID0gKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgb3B0aW9uczogUGFydGlhbDxSZWdpc3RlcmVkQ2hhbGxlbmdlVHlwZT4gPSB7fVxuICApOiBSZWdpc3RlcmVkQ2hhbGxlbmdlVHlwZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgdG9rZW46ICcxJyxcbiAgICAgIHJldHJ5QXQ6IE5PVyArIERFRkFVTFRfUkVUUllfQUZURVIsXG4gICAgICBjcmVhdGVkQXQ6IE5PVyAtIFNFQ09ORCxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVIYW5kbGVyID0gYXN5bmMgKHtcbiAgICBhdXRvU29sdmUgPSBmYWxzZSxcbiAgICBjaGFsbGVuZ2VFcnJvcixcbiAgICBleHBpcmVBZnRlcixcbiAgICBvbkNoYWxsZW5nZVNvbHZlZCA9IG5vb3AsXG4gICAgb25DaGFsbGVuZ2VGYWlsZWQgPSBub29wLFxuICB9OiBDcmVhdGVIYW5kbGVyT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxDaGFsbGVuZ2VIYW5kbGVyPiA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBDaGFsbGVuZ2VIYW5kbGVyKHtcbiAgICAgIGV4cGlyZUFmdGVyLFxuXG4gICAgICBzdG9yYWdlOiB7XG4gICAgICAgIGdldChrZXk6IHN0cmluZykge1xuICAgICAgICAgIHJldHVybiBzdG9yYWdlLmdldChrZXkpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBwdXQoa2V5OiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKSB7XG4gICAgICAgICAgc3RvcmFnZS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuXG4gICAgICBzdGFydFF1ZXVlKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpIHtcbiAgICAgICAgcXVldWVzU3RhcnRlZC5wdXNoKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgIH0sXG5cbiAgICAgIG9uQ2hhbGxlbmdlU29sdmVkLFxuICAgICAgb25DaGFsbGVuZ2VGYWlsZWQsXG5cbiAgICAgIHJlcXVlc3RDaGFsbGVuZ2UocmVxdWVzdCkge1xuICAgICAgICBpZiAoIWF1dG9Tb2x2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXIub25SZXNwb25zZSh7XG4gICAgICAgICAgICBzZXE6IHJlcXVlc3Quc2VxLFxuICAgICAgICAgICAgZGF0YTogeyBjYXB0Y2hhOiAnY2FwdGNoYScgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgU09MVkVfQUZURVIpO1xuICAgICAgfSxcblxuICAgICAgYXN5bmMgc2VuZENoYWxsZW5nZVJlc3BvbnNlKCkge1xuICAgICAgICBpZiAoY2hhbGxlbmdlRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBjaGFsbGVuZ2VFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgc2V0Q2hhbGxlbmdlU3RhdHVzKHN0YXR1cykge1xuICAgICAgICBjaGFsbGVuZ2VTdGF0dXMgPSBzdGF0dXM7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGF3YWl0IGhhbmRsZXIubG9hZCgpO1xuICAgIGF3YWl0IGhhbmRsZXIub25PbmxpbmUoKTtcbiAgICByZXR1cm4gaGFuZGxlcjtcbiAgfTtcblxuICBjb25zdCBpc0luU3RvcmFnZSA9IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIChzdG9yYWdlLmdldChTVE9SQUdFX0tFWSkgfHwgW10pLnNvbWUoXG4gICAgICAoeyBjb252ZXJzYXRpb25JZDogc3RvcmFnZUlkIH06IHsgY29udmVyc2F0aW9uSWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHJldHVybiBzdG9yYWdlSWQgPT09IGNvbnZlcnNhdGlvbklkO1xuICAgICAgfVxuICAgICk7XG4gIH07XG5cbiAgaXQoJ3Nob3VsZCBhdXRvbWF0aWNhbGx5IHN0YXJ0IHF1ZXVlIGFmdGVyIHRpbWVvdXQnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBjcmVhdGVIYW5kbGVyKCk7XG5cbiAgICBjb25zdCBvbmUgPSBjcmVhdGVDaGFsbGVuZ2UoJzEnKTtcbiAgICBhd2FpdCBoYW5kbGVyLnJlZ2lzdGVyKG9uZSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc0luU3RvcmFnZShvbmUuY29udmVyc2F0aW9uSWQpKTtcbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAncmVxdWlyZWQnKTtcblxuICAgIGF3YWl0IHRoaXMuY2xvY2submV4dEFzeW5jKCk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKHF1ZXVlc1N0YXJ0ZWQsIFtvbmUuY29udmVyc2F0aW9uSWRdKTtcbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAnaWRsZScpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzSW5TdG9yYWdlKG9uZS5jb252ZXJzYXRpb25JZCkpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNlbmQgY2hhbGxlbmdlIHJlc3BvbnNlJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgY3JlYXRlSGFuZGxlcih7IGF1dG9Tb2x2ZTogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IG9uZSA9IGNyZWF0ZUNoYWxsZW5nZSgnMScsIHtcbiAgICAgIHJldHJ5QXQ6IE5FVkVSX1JFVFJZLFxuICAgIH0pO1xuICAgIGF3YWl0IGhhbmRsZXIucmVnaXN0ZXIob25lKTtcbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAncmVxdWlyZWQnKTtcblxuICAgIGF3YWl0IHRoaXMuY2xvY2submV4dEFzeW5jKCk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKHF1ZXVlc1N0YXJ0ZWQsIFtvbmUuY29udmVyc2F0aW9uSWRdKTtcbiAgICBhc3NlcnQuaXNGYWxzZShpc0luU3RvcmFnZShvbmUuY29udmVyc2F0aW9uSWQpKTtcbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAnaWRsZScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNlbmQgb2xkIGNoYWxsZW5nZXMnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBjcmVhdGVIYW5kbGVyKCk7XG5cbiAgICBjb25zdCBjaGFsbGVuZ2VzID0gW1xuICAgICAgY3JlYXRlQ2hhbGxlbmdlKCcxJyksXG4gICAgICBjcmVhdGVDaGFsbGVuZ2UoJzInKSxcbiAgICAgIGNyZWF0ZUNoYWxsZW5nZSgnMycpLFxuICAgIF07XG4gICAgZm9yIChjb25zdCBjaGFsbGVuZ2Ugb2YgY2hhbGxlbmdlcykge1xuICAgICAgYXdhaXQgaGFuZGxlci5yZWdpc3RlcihjaGFsbGVuZ2UpO1xuICAgIH1cblxuICAgIGFzc2VydC5lcXVhbChjaGFsbGVuZ2VTdGF0dXMsICdyZXF1aXJlZCcpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwocXVldWVzU3RhcnRlZCwgW10pO1xuXG4gICAgZm9yIChjb25zdCBjaGFsbGVuZ2Ugb2YgY2hhbGxlbmdlcykge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNJblN0b3JhZ2UoY2hhbGxlbmdlLmNvbnZlcnNhdGlvbklkKSxcbiAgICAgICAgYCR7Y2hhbGxlbmdlLmNvbnZlcnNhdGlvbklkfSBzaG91bGQgYmUgaW4gc3RvcmFnZWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXdhaXQgaGFuZGxlci5vbk9mZmxpbmUoKTtcblxuICAgIC8vIFdhaXQgZm9yIGNoYWxsZW5nZXMgdG8gbWF0dXJlXG4gICAgYXdhaXQgdGhpcy5jbG9jay5uZXh0QXN5bmMoKTtcblxuICAgIC8vIENyZWF0ZSBuZXcgaGFuZGxlciB0byBsb2FkIG9sZCBjaGFsbGVuZ2VzIGZyb20gc3RvcmFnZTsgaXQgd2lsbCBzdGFydCB1cCBvbmxpbmVcbiAgICBhd2FpdCBjcmVhdGVIYW5kbGVyKCk7XG5cbiAgICBmb3IgKGNvbnN0IGNoYWxsZW5nZSBvZiBjaGFsbGVuZ2VzKSB7XG4gICAgICBhd2FpdCBoYW5kbGVyLnVucmVnaXN0ZXIoY2hhbGxlbmdlLmNvbnZlcnNhdGlvbklkKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGNoYWxsZW5nZSBvZiBjaGFsbGVuZ2VzKSB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNJblN0b3JhZ2UoY2hhbGxlbmdlLmNvbnZlcnNhdGlvbklkKSxcbiAgICAgICAgYCR7Y2hhbGxlbmdlLmNvbnZlcnNhdGlvbklkfSBzaG91bGQgbm90IGJlIGluIHN0b3JhZ2VgXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFRoZSBvcmRlciBoYXMgdG8gYmUgY29ycmVjdFxuICAgIGFzc2VydC5kZWVwRXF1YWwocXVldWVzU3RhcnRlZCwgWycxJywgJzInLCAnMyddKTtcbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAnaWRsZScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNlbmQgY2hhbGxlbmdlIGltbWVkaWF0ZWx5IGlmIGl0IGlzIHJlYWR5JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBjcmVhdGVIYW5kbGVyKCk7XG5cbiAgICBjb25zdCBvbmUgPSBjcmVhdGVDaGFsbGVuZ2UoJzEnLCB7XG4gICAgICByZXRyeUF0OiBJTU1FRElBVEVfUkVUUlksXG4gICAgfSk7XG4gICAgYXdhaXQgaGFuZGxlci5yZWdpc3RlcihvbmUpO1xuXG4gICAgYXNzZXJ0LmVxdWFsKGNoYWxsZW5nZVN0YXR1cywgJ2lkbGUnKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHF1ZXVlc1N0YXJ0ZWQsIFtvbmUuY29udmVyc2F0aW9uSWRdKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBub3QgcmV0cnkgZXhwaXJlZCBjaGFsbGVuZ2VzJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgY3JlYXRlSGFuZGxlcigpO1xuXG4gICAgY29uc3Qgb25lID0gY3JlYXRlQ2hhbGxlbmdlKCcxJyk7XG4gICAgYXdhaXQgaGFuZGxlci5yZWdpc3RlcihvbmUpO1xuICAgIGFzc2VydC5pc1RydWUoaXNJblN0b3JhZ2Uob25lLmNvbnZlcnNhdGlvbklkKSk7XG5cbiAgICBjb25zdCBuZXdIYW5kbGVyID0gYXdhaXQgY3JlYXRlSGFuZGxlcih7XG4gICAgICBhdXRvU29sdmU6IHRydWUsXG4gICAgICBleHBpcmVBZnRlcjogLTEsXG4gICAgfSk7XG4gICAgYXdhaXQgaGFuZGxlci51bnJlZ2lzdGVyKG9uZS5jb252ZXJzYXRpb25JZCk7XG5cbiAgICBjaGFsbGVuZ2VTdGF0dXMgPSAnaWRsZSc7XG4gICAgYXdhaXQgbmV3SGFuZGxlci5sb2FkKCk7XG5cbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAnaWRsZScpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwocXVldWVzU3RhcnRlZCwgW10pO1xuXG4gICAgYXdhaXQgdGhpcy5jbG9jay5uZXh0QXN5bmMoKTtcblxuICAgIGFzc2VydC5lcXVhbChjaGFsbGVuZ2VTdGF0dXMsICdpZGxlJyk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChxdWV1ZXNTdGFydGVkLCBbXSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNJblN0b3JhZ2Uob25lLmNvbnZlcnNhdGlvbklkKSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc2VuZCBjaGFsbGVuZ2VzIHRoYXQgbWF0dXJlZCB3aGlsZSB3ZSB3ZXJlIG9mZmxpbmUnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBjcmVhdGVIYW5kbGVyKCk7XG5cbiAgICBjb25zdCBvbmUgPSBjcmVhdGVDaGFsbGVuZ2UoJzEnKTtcbiAgICBhd2FpdCBoYW5kbGVyLnJlZ2lzdGVyKG9uZSk7XG5cbiAgICBhc3NlcnQuaXNUcnVlKGlzSW5TdG9yYWdlKG9uZS5jb252ZXJzYXRpb25JZCkpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwocXVldWVzU3RhcnRlZCwgW10pO1xuICAgIGFzc2VydC5lcXVhbChjaGFsbGVuZ2VTdGF0dXMsICdyZXF1aXJlZCcpO1xuXG4gICAgYXdhaXQgaGFuZGxlci5vbk9mZmxpbmUoKTtcblxuICAgIC8vIExldCBjaGFsbGVuZ2VzIG1hdHVyZVxuICAgIGF3YWl0IHRoaXMuY2xvY2submV4dEFzeW5jKCk7XG5cbiAgICBhc3NlcnQuaXNUcnVlKGlzSW5TdG9yYWdlKG9uZS5jb252ZXJzYXRpb25JZCkpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwocXVldWVzU3RhcnRlZCwgW10pO1xuICAgIGFzc2VydC5lcXVhbChjaGFsbGVuZ2VTdGF0dXMsICdyZXF1aXJlZCcpO1xuXG4gICAgLy8gR28gYmFjayBvbmxpbmVcbiAgICBhd2FpdCBoYW5kbGVyLm9uT25saW5lKCk7XG5cbiAgICBhc3NlcnQuaXNGYWxzZShpc0luU3RvcmFnZShvbmUuY29udmVyc2F0aW9uSWQpKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHF1ZXVlc1N0YXJ0ZWQsIFtvbmUuY29udmVyc2F0aW9uSWRdKTtcbiAgICBhc3NlcnQuZXF1YWwoY2hhbGxlbmdlU3RhdHVzLCAnaWRsZScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHRyaWdnZXIgb25DaGFsbGVuZ2VTb2x2ZWQnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IG9uQ2hhbGxlbmdlU29sdmVkID0gc2lub24uc3R1YigpO1xuXG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGNyZWF0ZUhhbmRsZXIoe1xuICAgICAgYXV0b1NvbHZlOiB0cnVlLFxuICAgICAgb25DaGFsbGVuZ2VTb2x2ZWQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBvbmUgPSBjcmVhdGVDaGFsbGVuZ2UoJzEnLCB7XG4gICAgICByZXRyeUF0OiBORVZFUl9SRVRSWSxcbiAgICB9KTtcbiAgICBhd2FpdCBoYW5kbGVyLnJlZ2lzdGVyKG9uZSk7XG5cbiAgICAvLyBMZXQgdGhlIGNoYWxsZW5nZSBnbyB0aHJvdWdoXG4gICAgYXdhaXQgdGhpcy5jbG9jay5uZXh0QXN5bmMoKTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKG9uQ2hhbGxlbmdlU29sdmVkKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCB0cmlnZ2VyIG9uQ2hhbGxlbmdlRmFpbGVkJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBjb25zdCBvbkNoYWxsZW5nZUZhaWxlZCA9IHNpbm9uLnN0dWIoKTtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBjcmVhdGVIYW5kbGVyKHtcbiAgICAgIGF1dG9Tb2x2ZTogdHJ1ZSxcbiAgICAgIGNoYWxsZW5nZUVycm9yOiBuZXcgRXJyb3IoJ2N1c3RvbSBmYWlsdXJlJyksXG4gICAgICBvbkNoYWxsZW5nZUZhaWxlZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IG9uZSA9IGNyZWF0ZUNoYWxsZW5nZSgnMScsIHtcbiAgICAgIHJldHJ5QXQ6IE5FVkVSX1JFVFJZLFxuICAgIH0pO1xuICAgIGF3YWl0IGhhbmRsZXIucmVnaXN0ZXIob25lKTtcblxuICAgIC8vIExldCB0aGUgY2hhbGxlbmdlIGdvIHRocm91Z2hcbiAgICBhd2FpdCB0aGlzLmNsb2NrLm5leHRBc3luYygpO1xuXG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uob25DaGFsbGVuZ2VGYWlsZWQpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLGtCQUF1QjtBQUN2QixvQkFBcUI7QUFDckIsWUFBdUI7QUFFdkIsdUJBQThDO0FBRTlDLHVCQUE0QjtBQVU1QixNQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLE1BQU0sY0FBYyxNQUFNO0FBQzFCLE1BQU0sa0JBQWtCLE1BQU07QUFHOUIsTUFBTSxzQkFBc0I7QUFDNUIsTUFBTSxjQUFjO0FBRXBCLFNBQVMsb0JBQW9CLE1BQU07QUFDakMsUUFBTSxVQUFVLG9CQUFJLElBQWlCO0FBQ3JDLE1BQUksa0JBQWtCO0FBQ3RCLE1BQUksZ0JBQStCLENBQUM7QUFFcEMsYUFBVyw4Q0FBc0I7QUFDL0IsWUFBUSxNQUFNO0FBQ2Qsc0JBQWtCO0FBQ2xCLG9CQUFnQixDQUFDO0FBRWpCLFNBQUssVUFBVSxNQUFNLGNBQWM7QUFDbkMsU0FBSyxRQUFRLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDdEMsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0gsR0FUVyxhQVNWO0FBRUQsWUFBVSw2Q0FBcUI7QUFDN0IsU0FBSyxRQUFRLFFBQVE7QUFBQSxFQUN2QixHQUZVLFlBRVQ7QUFFRCxRQUFNLGtCQUFrQix3QkFDdEIsZ0JBQ0EsVUFBNEMsQ0FBQyxNQUNqQjtBQUM1QixXQUFPO0FBQUEs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
