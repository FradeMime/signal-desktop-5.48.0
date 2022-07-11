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
var path = __toESM(require("path"));
var import_os = require("os");
var import_fs = require("fs");
var import_fs_extra = require("fs-extra");
var import_uuid = require("uuid");
var import_chai = require("chai");
var import_base_config = require("../../../app/base_config");
describe("base_config", () => {
  let targetPath;
  beforeEach(() => {
    targetPath = path.join((0, import_os.tmpdir)(), `${(0, import_uuid.v4)()}.json`);
  });
  afterEach(() => {
    try {
      (0, import_fs.unlinkSync)(targetPath);
    } catch (err) {
      import_chai.assert.strictEqual(err.code, "ENOENT");
    }
  });
  describe("start", () => {
    it("does not throw if file is missing", () => {
      const { _getCachedValue } = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      import_chai.assert.deepEqual(_getCachedValue(), /* @__PURE__ */ Object.create(null));
    });
    it("doesn't create the file if it is missing", async () => {
      (0, import_base_config.start)({ name: "test", targetPath, throwOnFilesystemErrors: true });
      import_chai.assert.isFalse(await (0, import_fs_extra.pathExists)(targetPath));
    });
    it("does not throw if file is empty", () => {
      (0, import_fs.writeFileSync)(targetPath, "");
      const { _getCachedValue } = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      import_chai.assert.deepEqual(_getCachedValue(), /* @__PURE__ */ Object.create(null));
    });
    it("successfully loads config file", () => {
      const config = { a: 1, b: 2 };
      (0, import_fs.writeFileSync)(targetPath, JSON.stringify(config));
      const { _getCachedValue } = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      import_chai.assert.deepEqual(_getCachedValue(), config);
    });
    describe("throwOnFilesystemErrors: true", () => {
      it("throws if file is malformed", () => {
        (0, import_fs.writeFileSync)(targetPath, "{{ malformed JSON");
        import_chai.assert.throws(() => {
          (0, import_base_config.start)({ name: "test", targetPath, throwOnFilesystemErrors: true });
        });
      });
    });
    describe("throwOnFilesystemErrors: false", () => {
      it("handles a malformed file, if told to", () => {
        (0, import_fs.writeFileSync)(targetPath, "{{ malformed JSON");
        const { _getCachedValue } = (0, import_base_config.start)({
          name: "test",
          targetPath,
          throwOnFilesystemErrors: false
        });
        import_chai.assert.deepEqual(_getCachedValue(), /* @__PURE__ */ Object.create(null));
      });
      it("handles a file that cannot be opened, if told to", function test() {
        if (process.platform === "win32") {
          this.skip();
        }
        (0, import_fs.writeFileSync)(targetPath, JSON.stringify({ foo: 123 }));
        (0, import_fs.chmodSync)(targetPath, 0);
        const { _getCachedValue } = (0, import_base_config.start)({
          name: "test",
          targetPath,
          throwOnFilesystemErrors: false
        });
        import_chai.assert.deepEqual(_getCachedValue(), /* @__PURE__ */ Object.create(null));
      });
    });
  });
  describe("get", () => {
    let config;
    beforeEach(() => {
      (0, import_fs.writeFileSync)(targetPath, JSON.stringify({ foo: 123, bar: [1, 2, 3] }));
      config = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
    });
    it("returns undefined for missing keys", () => {
      import_chai.assert.isUndefined(config.get("garbage"));
    });
    it("can look up values by path", () => {
      import_chai.assert.strictEqual(config.get("foo"), 123);
      import_chai.assert.strictEqual(config.get("bar.1"), 2);
    });
  });
  describe("set", () => {
    it("updates data in memory by path", () => {
      const config = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      config.set("foo", 1);
      config.set("bar.baz", 2);
      import_chai.assert.strictEqual(config.get("foo"), 1);
      import_chai.assert.deepStrictEqual(config.get("bar"), { baz: 2 });
    });
    it("saves data to disk", () => {
      const config = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      config.set("foo", 123);
      import_chai.assert.deepStrictEqual((0, import_fs_extra.readJsonSync)(targetPath), { foo: 123 });
      config.set("bar.baz", 2);
      import_chai.assert.deepStrictEqual((0, import_fs_extra.readJsonSync)(targetPath), {
        foo: 123,
        bar: { baz: 2 }
      });
      config.set("foo", void 0);
      import_chai.assert.deepStrictEqual((0, import_fs_extra.readJsonSync)(targetPath), { bar: { baz: 2 } });
    });
    describe("throwOnFilesystemErrors: true", () => {
      it("doesn't update in-memory data if file write fails", () => {
        const config = (0, import_base_config.start)({
          name: "test",
          targetPath,
          throwOnFilesystemErrors: true
        });
        config.set("foo", 123);
        (0, import_fs.chmodSync)(targetPath, 0);
        import_chai.assert.throws(() => config.set("foo", 456));
        import_chai.assert.strictEqual(config.get("foo"), 123);
        import_chai.assert.throws(() => config.set("bar", 999));
        import_chai.assert.isUndefined(config.get("bar"));
      });
    });
    describe("throwOnFilesystemErrors: false", () => {
      it("updates in-memory data even if file write fails", () => {
        const config = (0, import_base_config.start)({
          name: "test",
          targetPath,
          throwOnFilesystemErrors: false
        });
        config.set("foo", 123);
        (0, import_fs.chmodSync)(targetPath, 0);
        config.set("bar", 456);
        import_chai.assert.strictEqual(config.get("bar"), 456);
      });
    });
  });
  describe("remove", () => {
    it("deletes all data from memory", () => {
      (0, import_fs.writeFileSync)(targetPath, JSON.stringify({ foo: 123 }));
      const config = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      config.remove();
      import_chai.assert.isEmpty(config._getCachedValue());
    });
    it("does nothing if the file never existed", async () => {
      const config = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      config.remove();
      import_chai.assert.isFalse(await (0, import_fs_extra.pathExists)(targetPath));
    });
    it("removes the file on disk", async () => {
      (0, import_fs.writeFileSync)(targetPath, JSON.stringify({ foo: 123 }));
      const config = (0, import_base_config.start)({
        name: "test",
        targetPath,
        throwOnFilesystemErrors: true
      });
      config.remove();
      import_chai.assert.isFalse(await (0, import_fs_extra.pathExists)(targetPath));
    });
    describe("throwOnFilesystemErrors: true", () => {
      it("doesn't update the local cache if file removal fails", async function test() {
        if (process.platform === "win32") {
          this.skip();
        }
        const directory = path.join((0, import_os.tmpdir)(), (0, import_uuid.v4)());
        const configFile = path.join(directory, "test_config.json");
        (0, import_fs.mkdirSync)(directory, { recursive: true });
        (0, import_fs.writeFileSync)(configFile, JSON.stringify({ foo: 123 }));
        const config = (0, import_base_config.start)({
          name: "test",
          targetPath: configFile,
          throwOnFilesystemErrors: true
        });
        (0, import_fs.chmodSync)(directory, 0);
        import_chai.assert.throws(() => config.remove());
        import_chai.assert.deepStrictEqual(config._getCachedValue(), { foo: 123 });
      });
    });
    describe("throwOnFilesystemErrors: false", () => {
      it("updates the local cache even if file removal fails", async function test() {
        if (process.platform === "win32") {
          this.skip();
        }
        const directory = path.join((0, import_os.tmpdir)(), (0, import_uuid.v4)());
        const configFile = path.join(directory, "test_config.json");
        (0, import_fs.mkdirSync)(directory, { recursive: true });
        (0, import_fs.writeFileSync)(configFile, JSON.stringify({ foo: 123 }));
        const config = (0, import_base_config.start)({
          name: "test",
          targetPath: configFile,
          throwOnFilesystemErrors: false
        });
        (0, import_fs.chmodSync)(directory, 0);
        config.remove();
        import_chai.assert.isEmpty(config._getCachedValue());
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFzZV9jb25maWdfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyB0bXBkaXIgfSBmcm9tICdvcyc7XG5pbXBvcnQgeyBjaG1vZFN5bmMsIG1rZGlyU3luYywgdW5saW5rU3luYywgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHBhdGhFeGlzdHMsIHJlYWRKc29uU3luYyB9IGZyb20gJ2ZzLWV4dHJhJztcblxuaW1wb3J0IHsgdjQgYXMgZ2VuZXJhdGVHdWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHR5cGUgeyBDb25maWdUeXBlIH0gZnJvbSAnLi4vLi4vLi4vYXBwL2Jhc2VfY29uZmlnJztcbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSAnLi4vLi4vLi4vYXBwL2Jhc2VfY29uZmlnJztcblxuZGVzY3JpYmUoJ2Jhc2VfY29uZmlnJywgKCkgPT4ge1xuICBsZXQgdGFyZ2V0UGF0aDogc3RyaW5nO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHRhcmdldFBhdGggPSBwYXRoLmpvaW4odG1wZGlyKCksIGAke2dlbmVyYXRlR3VpZCgpfS5qc29uYCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHVubGlua1N5bmModGFyZ2V0UGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXJyLmNvZGUsICdFTk9FTlQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzdGFydCcsICgpID0+IHtcbiAgICBpdCgnZG9lcyBub3QgdGhyb3cgaWYgZmlsZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBfZ2V0Q2FjaGVkVmFsdWUgfSA9IHN0YXJ0KHtcbiAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChfZ2V0Q2FjaGVkVmFsdWUoKSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfSk7XG5cbiAgICBpdChcImRvZXNuJ3QgY3JlYXRlIHRoZSBmaWxlIGlmIGl0IGlzIG1pc3NpbmdcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgc3RhcnQoeyBuYW1lOiAndGVzdCcsIHRhcmdldFBhdGgsIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXdhaXQgcGF0aEV4aXN0cyh0YXJnZXRQYXRoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3QgdGhyb3cgaWYgZmlsZSBpcyBlbXB0eScsICgpID0+IHtcbiAgICAgIHdyaXRlRmlsZVN5bmModGFyZ2V0UGF0aCwgJycpO1xuICAgICAgY29uc3QgeyBfZ2V0Q2FjaGVkVmFsdWUgfSA9IHN0YXJ0KHtcbiAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChfZ2V0Q2FjaGVkVmFsdWUoKSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3VjY2Vzc2Z1bGx5IGxvYWRzIGNvbmZpZyBmaWxlJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29uZmlnID0geyBhOiAxLCBiOiAyIH07XG4gICAgICB3cml0ZUZpbGVTeW5jKHRhcmdldFBhdGgsIEpTT04uc3RyaW5naWZ5KGNvbmZpZykpO1xuICAgICAgY29uc3QgeyBfZ2V0Q2FjaGVkVmFsdWUgfSA9IHN0YXJ0KHtcbiAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChfZ2V0Q2FjaGVkVmFsdWUoKSwgY29uZmlnKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZScsICgpID0+IHtcbiAgICAgIGl0KCd0aHJvd3MgaWYgZmlsZSBpcyBtYWxmb3JtZWQnLCAoKSA9PiB7XG4gICAgICAgIHdyaXRlRmlsZVN5bmModGFyZ2V0UGF0aCwgJ3t7IG1hbGZvcm1lZCBKU09OJyk7XG4gICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgIHN0YXJ0KHsgbmFtZTogJ3Rlc3QnLCB0YXJnZXRQYXRoLCB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHJvd09uRmlsZXN5c3RlbUVycm9yczogZmFsc2UnLCAoKSA9PiB7XG4gICAgICBpdCgnaGFuZGxlcyBhIG1hbGZvcm1lZCBmaWxlLCBpZiB0b2xkIHRvJywgKCkgPT4ge1xuICAgICAgICB3cml0ZUZpbGVTeW5jKHRhcmdldFBhdGgsICd7eyBtYWxmb3JtZWQgSlNPTicpO1xuICAgICAgICBjb25zdCB7IF9nZXRDYWNoZWRWYWx1ZSB9ID0gc3RhcnQoe1xuICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICAgIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoX2dldENhY2hlZFZhbHVlKCksIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdoYW5kbGVzIGEgZmlsZSB0aGF0IGNhbm5vdCBiZSBvcGVuZWQsIGlmIHRvbGQgdG8nLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JpdGVGaWxlU3luYyh0YXJnZXRQYXRoLCBKU09OLnN0cmluZ2lmeSh7IGZvbzogMTIzIH0pKTtcbiAgICAgICAgY2htb2RTeW5jKHRhcmdldFBhdGgsIDApO1xuICAgICAgICBjb25zdCB7IF9nZXRDYWNoZWRWYWx1ZSB9ID0gc3RhcnQoe1xuICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICAgIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoX2dldENhY2hlZFZhbHVlKCksIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbmZpZzogQ29uZmlnVHlwZTtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHdyaXRlRmlsZVN5bmModGFyZ2V0UGF0aCwgSlNPTi5zdHJpbmdpZnkoeyBmb286IDEyMywgYmFyOiBbMSwgMiwgM10gfSkpO1xuICAgICAgY29uZmlnID0gc3RhcnQoe1xuICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgIHRhcmdldFBhdGgsXG4gICAgICAgIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgZm9yIG1pc3Npbmcga2V5cycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChjb25maWcuZ2V0KCdnYXJiYWdlJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbiBsb29rIHVwIHZhbHVlcyBieSBwYXRoJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbmZpZy5nZXQoJ2ZvbycpLCAxMjMpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbmZpZy5nZXQoJ2Jhci4xJyksIDIpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2V0JywgKCkgPT4ge1xuICAgIGl0KCd1cGRhdGVzIGRhdGEgaW4gbWVtb3J5IGJ5IHBhdGgnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb25maWcgPSBzdGFydCh7XG4gICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgdGFyZ2V0UGF0aCxcbiAgICAgICAgdGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGNvbmZpZy5zZXQoJ2ZvbycsIDEpO1xuICAgICAgY29uZmlnLnNldCgnYmFyLmJheicsIDIpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29uZmlnLmdldCgnZm9vJyksIDEpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjb25maWcuZ2V0KCdiYXInKSwgeyBiYXo6IDIgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2F2ZXMgZGF0YSB0byBkaXNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29uZmlnID0gc3RhcnQoe1xuICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgIHRhcmdldFBhdGgsXG4gICAgICAgIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbmZpZy5zZXQoJ2ZvbycsIDEyMyk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlYWRKc29uU3luYyh0YXJnZXRQYXRoKSwgeyBmb286IDEyMyB9KTtcblxuICAgICAgY29uZmlnLnNldCgnYmFyLmJheicsIDIpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZWFkSnNvblN5bmModGFyZ2V0UGF0aCksIHtcbiAgICAgICAgZm9vOiAxMjMsXG4gICAgICAgIGJhcjogeyBiYXo6IDIgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25maWcuc2V0KCdmb28nLCB1bmRlZmluZWQpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZWFkSnNvblN5bmModGFyZ2V0UGF0aCksIHsgYmFyOiB7IGJhejogMiB9IH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Rocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlJywgKCkgPT4ge1xuICAgICAgaXQoXCJkb2Vzbid0IHVwZGF0ZSBpbi1tZW1vcnkgZGF0YSBpZiBmaWxlIHdyaXRlIGZhaWxzXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gc3RhcnQoe1xuICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICAgIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uZmlnLnNldCgnZm9vJywgMTIzKTtcbiAgICAgICAgY2htb2RTeW5jKHRhcmdldFBhdGgsIDApO1xuXG4gICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gY29uZmlnLnNldCgnZm9vJywgNDU2KSk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb25maWcuZ2V0KCdmb28nKSwgMTIzKTtcblxuICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IGNvbmZpZy5zZXQoJ2JhcicsIDk5OSkpO1xuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQoY29uZmlnLmdldCgnYmFyJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnM6IGZhbHNlJywgKCkgPT4ge1xuICAgICAgaXQoJ3VwZGF0ZXMgaW4tbWVtb3J5IGRhdGEgZXZlbiBpZiBmaWxlIHdyaXRlIGZhaWxzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBzdGFydCh7XG4gICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgIHRhcmdldFBhdGgsXG4gICAgICAgICAgdGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnM6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uZmlnLnNldCgnZm9vJywgMTIzKTtcbiAgICAgICAgY2htb2RTeW5jKHRhcmdldFBhdGgsIDApO1xuXG4gICAgICAgIGNvbmZpZy5zZXQoJ2JhcicsIDQ1Nik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbmZpZy5nZXQoJ2JhcicpLCA0NTYpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZW1vdmUnLCAoKSA9PiB7XG4gICAgaXQoJ2RlbGV0ZXMgYWxsIGRhdGEgZnJvbSBtZW1vcnknLCAoKSA9PiB7XG4gICAgICB3cml0ZUZpbGVTeW5jKHRhcmdldFBhdGgsIEpTT04uc3RyaW5naWZ5KHsgZm9vOiAxMjMgfSkpO1xuICAgICAgY29uc3QgY29uZmlnID0gc3RhcnQoe1xuICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgIHRhcmdldFBhdGgsXG4gICAgICAgIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBjb25maWcucmVtb3ZlKCk7XG5cbiAgICAgIGFzc2VydC5pc0VtcHR5KGNvbmZpZy5fZ2V0Q2FjaGVkVmFsdWUoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSBmaWxlIG5ldmVyIGV4aXN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjb25maWcgPSBzdGFydCh7XG4gICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgdGFyZ2V0UGF0aCxcbiAgICAgICAgdGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGNvbmZpZy5yZW1vdmUoKTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXdhaXQgcGF0aEV4aXN0cyh0YXJnZXRQYXRoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyB0aGUgZmlsZSBvbiBkaXNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgd3JpdGVGaWxlU3luYyh0YXJnZXRQYXRoLCBKU09OLnN0cmluZ2lmeSh7IGZvbzogMTIzIH0pKTtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHN0YXJ0KHtcbiAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICB0YXJnZXRQYXRoLFxuICAgICAgICB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgY29uZmlnLnJlbW92ZSgpO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShhd2FpdCBwYXRoRXhpc3RzKHRhcmdldFBhdGgpKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHJvd09uRmlsZXN5c3RlbUVycm9yczogdHJ1ZScsICgpID0+IHtcbiAgICAgIGl0KFwiZG9lc24ndCB1cGRhdGUgdGhlIGxvY2FsIGNhY2hlIGlmIGZpbGUgcmVtb3ZhbCBmYWlsc1wiLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgcHV0IHRoZSBjb25maWcgZmlsZSBpbiBhIGRpcmVjdG9yeSwgdGhlbiByZW1vdmUgYWxsIHBlcm1pc3Npb25zIGZyb20gdGhhdFxuICAgICAgICAvLyAgIGRpcmVjdG9yeS4gVGhpcyBzaG91bGQgcHJldmVudCByZW1vdmFsLlxuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLmpvaW4odG1wZGlyKCksIGdlbmVyYXRlR3VpZCgpKTtcbiAgICAgICAgY29uc3QgY29uZmlnRmlsZSA9IHBhdGguam9pbihkaXJlY3RvcnksICd0ZXN0X2NvbmZpZy5qc29uJyk7XG4gICAgICAgIG1rZGlyU3luYyhkaXJlY3RvcnksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB3cml0ZUZpbGVTeW5jKGNvbmZpZ0ZpbGUsIEpTT04uc3RyaW5naWZ5KHsgZm9vOiAxMjMgfSkpO1xuICAgICAgICBjb25zdCBjb25maWcgPSBzdGFydCh7XG4gICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgIHRhcmdldFBhdGg6IGNvbmZpZ0ZpbGUsXG4gICAgICAgICAgdGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBjaG1vZFN5bmMoZGlyZWN0b3J5LCAwKTtcblxuICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IGNvbmZpZy5yZW1vdmUoKSk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjb25maWcuX2dldENhY2hlZFZhbHVlKCksIHsgZm9vOiAxMjMgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHJvd09uRmlsZXN5c3RlbUVycm9yczogZmFsc2UnLCAoKSA9PiB7XG4gICAgICBpdCgndXBkYXRlcyB0aGUgbG9jYWwgY2FjaGUgZXZlbiBpZiBmaWxlIHJlbW92YWwgZmFpbHMnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VlIGFib3ZlLlxuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLmpvaW4odG1wZGlyKCksIGdlbmVyYXRlR3VpZCgpKTtcbiAgICAgICAgY29uc3QgY29uZmlnRmlsZSA9IHBhdGguam9pbihkaXJlY3RvcnksICd0ZXN0X2NvbmZpZy5qc29uJyk7XG4gICAgICAgIG1rZGlyU3luYyhkaXJlY3RvcnksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB3cml0ZUZpbGVTeW5jKGNvbmZpZ0ZpbGUsIEpTT04uc3RyaW5naWZ5KHsgZm9vOiAxMjMgfSkpO1xuICAgICAgICBjb25zdCBjb25maWcgPSBzdGFydCh7XG4gICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgIHRhcmdldFBhdGg6IGNvbmZpZ0ZpbGUsXG4gICAgICAgICAgdGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnM6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY2htb2RTeW5jKGRpcmVjdG9yeSwgMCk7XG5cbiAgICAgICAgY29uZmlnLnJlbW92ZSgpO1xuXG4gICAgICAgIGFzc2VydC5pc0VtcHR5KGNvbmZpZy5fZ2V0Q2FjaGVkVmFsdWUoKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxXQUFzQjtBQUN0QixnQkFBdUI7QUFDdkIsZ0JBQWdFO0FBQ2hFLHNCQUF5QztBQUV6QyxrQkFBbUM7QUFDbkMsa0JBQXVCO0FBR3ZCLHlCQUFzQjtBQUV0QixTQUFTLGVBQWUsTUFBTTtBQUM1QixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsaUJBQWEsS0FBSyxLQUFLLHNCQUFPLEdBQUcsR0FBRyxvQkFBYSxRQUFRO0FBQUEsRUFDM0QsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFFBQUk7QUFDRixnQ0FBVyxVQUFVO0FBQUEsSUFDdkIsU0FBUyxLQUFQO0FBQ0EseUJBQU8sWUFBWSxJQUFJLE1BQU0sUUFBUTtBQUFBLElBQ3ZDO0FBQUEsRUFDRixDQUFDO0FBRUQsV0FBUyxTQUFTLE1BQU07QUFDdEIsT0FBRyxxQ0FBcUMsTUFBTTtBQUM1QyxZQUFNLEVBQUUsb0JBQW9CLDhCQUFNO0FBQUEsUUFDaEMsTUFBTTtBQUFBLFFBQ047QUFBQSxRQUNBLHlCQUF5QjtBQUFBLE1BQzNCLENBQUM7QUFDRCx5QkFBTyxVQUFVLGdCQUFnQixHQUFHLHVCQUFPLE9BQU8sSUFBSSxDQUFDO0FBQUEsSUFDekQsQ0FBQztBQUVE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
