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
var import_got = __toESM(require("got"));
var import_form_data = __toESM(require("form-data"));
var util = __toESM(require("util"));
var zlib = __toESM(require("zlib"));
var durations = __toESM(require("../../util/durations"));
var import_uploadDebugLog = require("../../logging/uploadDebugLog");
var logger = __toESM(require("../../logging/log"));
const gzip = util.promisify(zlib.gzip);
describe("upload", () => {
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(process, "platform").get(() => "freebsd");
    this.fakeGet = this.sandbox.stub(import_got.default, "get");
    this.fakePost = this.sandbox.stub(import_got.default, "post");
    this.fakeGet.resolves({
      body: {
        fields: {
          foo: "bar",
          key: "abc123"
        },
        url: "https://example.com/fake-upload"
      }
    });
    this.fakePost.resolves({ statusCode: 204 });
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.sandbox.restore();
  }, "afterEach"));
  it("makes a request to get the S3 bucket, then uploads it there", async function test() {
    import_chai.assert.strictEqual(await (0, import_uploadDebugLog.upload)({ content: "hello world", appVersion: "1.2.3", logger }), "https://debuglogs.org/abc123.gz");
    sinon.assert.calledOnce(this.fakeGet);
    sinon.assert.calledWith(this.fakeGet, "https://debuglogs.org/", {
      responseType: "json",
      headers: { "User-Agent": "Signal-Desktop/1.2.3" },
      timeout: { request: durations.MINUTE }
    });
    const compressedContent = await gzip("hello world");
    sinon.assert.calledOnce(this.fakePost);
    sinon.assert.calledWith(this.fakePost, "https://example.com/fake-upload", {
      headers: { "User-Agent": "Signal-Desktop/1.2.3" },
      timeout: { request: durations.MINUTE },
      body: sinon.match((value) => {
        if (!(value instanceof import_form_data.default)) {
          return false;
        }
        const buffer = value.getBuffer();
        (0, import_chai.assert)(buffer.includes(compressedContent), "gzipped content was not in body");
        return true;
      }, "FormData")
    });
  });
  it("rejects if we can't get a token", async function test() {
    this.fakeGet.rejects(new Error("HTTP request failure"));
    let err;
    try {
      await (0, import_uploadDebugLog.upload)({ content: "hello world", appVersion: "1.2.3", logger });
    } catch (e) {
      err = e;
    }
    import_chai.assert.instanceOf(err, Error);
  });
  it("rejects with an invalid token body", async function test() {
    const bodies = [
      null,
      {},
      { fields: {} },
      { fields: { nokey: "ok" } },
      { fields: { key: "123" } },
      { fields: { key: "123" }, url: { not: "a string" } },
      { fields: { key: "123" }, url: "http://notsecure.example.com" },
      { fields: { key: "123" }, url: "not a valid URL" }
    ];
    for (const body of bodies) {
      this.fakeGet.resolves({ body });
      let err;
      try {
        await (0, import_uploadDebugLog.upload)({ content: "hello world", appVersion: "1.2.3", logger });
      } catch (e) {
        err = e;
      }
      import_chai.assert.instanceOf(err, Error);
    }
  });
  it("rejects if the upload doesn't return a 204", async function test() {
    this.fakePost.resolves({ statusCode: 400 });
    let err;
    try {
      await (0, import_uploadDebugLog.upload)({ content: "hello world", appVersion: "1.2.3", logger });
    } catch (e) {
      err = e;
    }
    import_chai.assert.instanceOf(err, Error);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBsb2FkRGVidWdMb2dzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgZ290IGZyb20gJ2dvdCc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgKiBhcyB6bGliIGZyb20gJ3psaWInO1xuXG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgdXBsb2FkIH0gZnJvbSAnLi4vLi4vbG9nZ2luZy91cGxvYWREZWJ1Z0xvZyc7XG5pbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG5jb25zdCBnemlwOiAoXzogemxpYi5JbnB1dFR5cGUpID0+IFByb21pc2U8QnVmZmVyPiA9IHV0aWwucHJvbWlzaWZ5KHpsaWIuZ3ppcCk7XG5cbmRlc2NyaWJlKCd1cGxvYWQnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICB0aGlzLnNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG5cbiAgICB0aGlzLnNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ2ZyZWVic2QnKTtcblxuICAgIHRoaXMuZmFrZUdldCA9IHRoaXMuc2FuZGJveC5zdHViKGdvdCwgJ2dldCcpO1xuICAgIHRoaXMuZmFrZVBvc3QgPSB0aGlzLnNhbmRib3guc3R1Yihnb3QsICdwb3N0Jyk7XG5cbiAgICB0aGlzLmZha2VHZXQucmVzb2x2ZXMoe1xuICAgICAgYm9keToge1xuICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICBmb286ICdiYXInLFxuICAgICAgICAgIGtleTogJ2FiYzEyMycsXG4gICAgICAgIH0sXG4gICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vZmFrZS11cGxvYWQnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmZha2VQb3N0LnJlc29sdmVzKHsgc3RhdHVzQ29kZTogMjA0IH0pO1xuICB9KTtcblxuICBhZnRlckVhY2goZnVuY3Rpb24gYWZ0ZXJFYWNoKCkge1xuICAgIHRoaXMuc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdtYWtlcyBhIHJlcXVlc3QgdG8gZ2V0IHRoZSBTMyBidWNrZXQsIHRoZW4gdXBsb2FkcyBpdCB0aGVyZScsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgYXdhaXQgdXBsb2FkKHsgY29udGVudDogJ2hlbGxvIHdvcmxkJywgYXBwVmVyc2lvbjogJzEuMi4zJywgbG9nZ2VyIH0pLFxuICAgICAgJ2h0dHBzOi8vZGVidWdsb2dzLm9yZy9hYmMxMjMuZ3onXG4gICAgKTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHRoaXMuZmFrZUdldCk7XG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgodGhpcy5mYWtlR2V0LCAnaHR0cHM6Ly9kZWJ1Z2xvZ3Mub3JnLycsIHtcbiAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgaGVhZGVyczogeyAnVXNlci1BZ2VudCc6ICdTaWduYWwtRGVza3RvcC8xLjIuMycgfSxcbiAgICAgIHRpbWVvdXQ6IHsgcmVxdWVzdDogZHVyYXRpb25zLk1JTlVURSB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgY29tcHJlc3NlZENvbnRlbnQgPSBhd2FpdCBnemlwKCdoZWxsbyB3b3JsZCcpO1xuXG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodGhpcy5mYWtlUG9zdCk7XG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgodGhpcy5mYWtlUG9zdCwgJ2h0dHBzOi8vZXhhbXBsZS5jb20vZmFrZS11cGxvYWQnLCB7XG4gICAgICBoZWFkZXJzOiB7ICdVc2VyLUFnZW50JzogJ1NpZ25hbC1EZXNrdG9wLzEuMi4zJyB9LFxuICAgICAgdGltZW91dDogeyByZXF1ZXN0OiBkdXJhdGlvbnMuTUlOVVRFIH0sXG4gICAgICBib2R5OiBzaW5vbi5tYXRjaCgodmFsdWU6IHVua25vd24pID0+IHtcbiAgICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBGb3JtRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBgRm9ybURhdGFgIGRvZXNuJ3Qgb2ZmZXIgaGlnaC1sZXZlbCBBUElzIGZvciBmZXRjaGluZyBkYXRhLCBzbyB3ZSBkbyB0aGlzLlxuICAgICAgICBjb25zdCBidWZmZXIgPSB2YWx1ZS5nZXRCdWZmZXIoKTtcbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIGJ1ZmZlci5pbmNsdWRlcyhjb21wcmVzc2VkQ29udGVudCksXG4gICAgICAgICAgJ2d6aXBwZWQgY29udGVudCB3YXMgbm90IGluIGJvZHknXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LCAnRm9ybURhdGEnKSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoXCJyZWplY3RzIGlmIHdlIGNhbid0IGdldCBhIHRva2VuXCIsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgdGhpcy5mYWtlR2V0LnJlamVjdHMobmV3IEVycm9yKCdIVFRQIHJlcXVlc3QgZmFpbHVyZScpKTtcblxuICAgIGxldCBlcnI6IHVua25vd247XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHVwbG9hZCh7IGNvbnRlbnQ6ICdoZWxsbyB3b3JsZCcsIGFwcFZlcnNpb246ICcxLjIuMycsIGxvZ2dlciB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cbiAgICBhc3NlcnQuaW5zdGFuY2VPZihlcnIsIEVycm9yKTtcbiAgfSk7XG5cbiAgaXQoJ3JlamVjdHMgd2l0aCBhbiBpbnZhbGlkIHRva2VuIGJvZHknLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IGJvZGllcyA9IFtcbiAgICAgIG51bGwsXG4gICAgICB7fSxcbiAgICAgIHsgZmllbGRzOiB7fSB9LFxuICAgICAgeyBmaWVsZHM6IHsgbm9rZXk6ICdvaycgfSB9LFxuICAgICAgeyBmaWVsZHM6IHsga2V5OiAnMTIzJyB9IH0sXG4gICAgICB7IGZpZWxkczogeyBrZXk6ICcxMjMnIH0sIHVybDogeyBub3Q6ICdhIHN0cmluZycgfSB9LFxuICAgICAgeyBmaWVsZHM6IHsga2V5OiAnMTIzJyB9LCB1cmw6ICdodHRwOi8vbm90c2VjdXJlLmV4YW1wbGUuY29tJyB9LFxuICAgICAgeyBmaWVsZHM6IHsga2V5OiAnMTIzJyB9LCB1cmw6ICdub3QgYSB2YWxpZCBVUkwnIH0sXG4gICAgXTtcblxuICAgIGZvciAoY29uc3QgYm9keSBvZiBib2RpZXMpIHtcbiAgICAgIHRoaXMuZmFrZUdldC5yZXNvbHZlcyh7IGJvZHkgfSk7XG5cbiAgICAgIGxldCBlcnI6IHVua25vd247XG4gICAgICB0cnkge1xuICAgICAgICAvLyBBZ2FpbiwgdGhlc2Ugc2hvdWxkIGJlIHJ1biBzZXJpYWxseS5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgYXdhaXQgdXBsb2FkKHsgY29udGVudDogJ2hlbGxvIHdvcmxkJywgYXBwVmVyc2lvbjogJzEuMi4zJywgbG9nZ2VyIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnIgPSBlO1xuICAgICAgfVxuICAgICAgYXNzZXJ0Lmluc3RhbmNlT2YoZXJyLCBFcnJvcik7XG4gICAgfVxuICB9KTtcblxuICBpdChcInJlamVjdHMgaWYgdGhlIHVwbG9hZCBkb2Vzbid0IHJldHVybiBhIDIwNFwiLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIHRoaXMuZmFrZVBvc3QucmVzb2x2ZXMoeyBzdGF0dXNDb2RlOiA0MDAgfSk7XG5cbiAgICBsZXQgZXJyOiB1bmtub3duO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB1cGxvYWQoeyBjb250ZW50OiAnaGVsbG8gd29ybGQnLCBhcHBWZXJzaW9uOiAnMS4yLjMnLCBsb2dnZXIgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgYXNzZXJ0Lmluc3RhbmNlT2YoZXJyLCBFcnJvcik7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLGlCQUFnQjtBQUNoQix1QkFBcUI7QUFDckIsV0FBc0I7QUFDdEIsV0FBc0I7QUFFdEIsZ0JBQTJCO0FBQzNCLDRCQUF1QjtBQUN2QixhQUF3QjtBQUV4QixNQUFNLE9BQStDLEtBQUssVUFBVSxLQUFLLElBQUk7QUFFN0UsU0FBUyxVQUFVLE1BQU07QUFDdkIsYUFBVyw4Q0FBc0I7QUFDL0IsU0FBSyxVQUFVLE1BQU0sY0FBYztBQUVuQyxTQUFLLFFBQVEsS0FBSyxTQUFTLFVBQVUsRUFBRSxJQUFJLE1BQU0sU0FBUztBQUUxRCxTQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUssb0JBQUssS0FBSztBQUMzQyxTQUFLLFdBQVcsS0FBSyxRQUFRLEtBQUssb0JBQUssTUFBTTtBQUU3QyxTQUFLLFFBQVEsU0FBUztBQUFBLE1BQ3BCLE1BQU07QUFBQSxRQUNKLFFBQVE7QUFBQSxVQUNOLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0YsQ0FBQztBQUNELFNBQUssU0FBUyxTQUFTLEVBQUUsWUFBWSxJQUFJLENBQUM7QUFBQSxFQUM1QyxHQWxCVyxhQWtCVjtB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
