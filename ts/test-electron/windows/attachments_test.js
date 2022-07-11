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
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_os = __toESM(require("os"));
var import_fs_extra = __toESM(require("fs-extra"));
var Attachments = __toESM(require("../../windows/attachments"));
var Bytes = __toESM(require("../../Bytes"));
const PREFIX_LENGTH = 2;
const NUM_SEPARATORS = 1;
const NAME_LENGTH = 64;
const PATH_LENGTH = PREFIX_LENGTH + NUM_SEPARATORS + NAME_LENGTH;
describe("Attachments", () => {
  const USER_DATA = window.SignalContext.getPath("userData");
  let tempRootDirectory;
  before(() => {
    tempRootDirectory = import_fs.default.mkdtempSync(import_path.default.join(import_os.default.tmpdir(), "Signal"));
  });
  after(async () => {
    await import_fs_extra.default.remove(tempRootDirectory);
  });
  describe("createReader", () => {
    it("should read file from disk", async () => {
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createReader");
      const relativePath = Attachments.getRelativePath(Attachments.createName());
      const fullPath = import_path.default.join(tempDirectory, relativePath);
      const input = Bytes.fromString("test string");
      const inputBuffer = Buffer.from(input);
      await import_fs_extra.default.ensureFile(fullPath);
      await import_fs_extra.default.writeFile(fullPath, inputBuffer);
      const output = await Attachments.createReader(tempDirectory)(relativePath);
      import_chai.assert.deepEqual(input, output);
    });
    it("throws if relative path goes higher than root", async () => {
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createReader");
      const relativePath = "../../parent";
      await import_chai.assert.isRejected(Attachments.createReader(tempDirectory)(relativePath), "Invalid relative path");
    });
  });
  describe("copyIntoAttachmentsDirectory", () => {
    let filesToRemove;
    const getFakeAttachmentsDirectory = /* @__PURE__ */ __name(() => {
      const result = import_path.default.join(USER_DATA, `fake-attachments-${Date.now()}-${Math.random().toString().substring(2)}`);
      filesToRemove.push(result);
      return result;
    }, "getFakeAttachmentsDirectory");
    before(() => {
      filesToRemove = [];
    });
    after(async () => {
      await Promise.all(filesToRemove.map((toRemove) => import_fs_extra.default.remove(toRemove)));
      filesToRemove = [];
    });
    it("throws if passed a non-string", () => {
      import_chai.assert.throws(() => {
        Attachments.copyIntoAttachmentsDirectory(1234);
      }, TypeError);
      import_chai.assert.throws(() => {
        Attachments.copyIntoAttachmentsDirectory(null);
      }, TypeError);
    });
    it("returns a function that rejects if the source path is not a string", async () => {
      const copier = Attachments.copyIntoAttachmentsDirectory(await getFakeAttachmentsDirectory());
      await import_chai.assert.isRejected(copier(123));
    });
    it("returns a function that rejects if the source path is not in the user config directory", async () => {
      const copier = Attachments.copyIntoAttachmentsDirectory(await getFakeAttachmentsDirectory());
      await import_chai.assert.isRejected(copier(import_path.default.join(tempRootDirectory, "hello.txt")), "'sourcePath' must be relative to the user config directory");
    });
    it("returns a function that copies the source path into the attachments directory and returns its path and size", async () => {
      const attachmentsPath = await getFakeAttachmentsDirectory();
      const someOtherPath = import_path.default.join(USER_DATA, "somethingElse");
      await import_fs_extra.default.outputFile(someOtherPath, "hello world");
      filesToRemove.push(someOtherPath);
      const copier = Attachments.copyIntoAttachmentsDirectory(attachmentsPath);
      const { path: relativePath, size } = await copier(someOtherPath);
      const absolutePath = import_path.default.join(attachmentsPath, relativePath);
      import_chai.assert.notEqual(someOtherPath, absolutePath);
      import_chai.assert.strictEqual(await import_fs.default.promises.readFile(absolutePath, "utf8"), "hello world");
      import_chai.assert.strictEqual(size, "hello world".length);
    });
  });
  describe("createWriterForExisting", () => {
    it("should write file to disk on given path and return path", async () => {
      const input = Bytes.fromString("test string");
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createWriterForExisting");
      const relativePath = Attachments.getRelativePath(Attachments.createName());
      const attachment = {
        path: relativePath,
        data: input
      };
      const outputPath = await Attachments.createWriterForExisting(tempDirectory)(attachment);
      const output = await import_fs_extra.default.readFile(import_path.default.join(tempDirectory, outputPath));
      import_chai.assert.equal(outputPath, relativePath);
      const inputBuffer = Buffer.from(input);
      import_chai.assert.deepEqual(inputBuffer, output);
    });
    it("throws if relative path goes higher than root", async () => {
      const input = Bytes.fromString("test string");
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createWriterForExisting");
      const relativePath = "../../parent";
      const attachment = {
        path: relativePath,
        data: input
      };
      try {
        await Attachments.createWriterForExisting(tempDirectory)(attachment);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "Invalid relative path");
        return;
      }
      throw new Error("Expected an error");
    });
  });
  describe("createWriterForNew", () => {
    it("should write file to disk and return path", async () => {
      const input = Bytes.fromString("test string");
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createWriterForNew");
      const outputPath = await Attachments.createWriterForNew(tempDirectory)(input);
      const output = await import_fs_extra.default.readFile(import_path.default.join(tempDirectory, outputPath));
      import_chai.assert.lengthOf(outputPath, PATH_LENGTH);
      const inputBuffer = Buffer.from(input);
      import_chai.assert.deepEqual(inputBuffer, output);
    });
  });
  describe("createAbsolutePathGetter", () => {
    const isWindows = process.platform === "win32";
    it("combines root and relative path", () => {
      const root = isWindows ? "C:\\temp" : "/tmp";
      const relative = "ab/abcdef";
      const pathGetter = Attachments.createAbsolutePathGetter(root);
      const absolutePath = pathGetter(relative);
      import_chai.assert.strictEqual(absolutePath, isWindows ? "C:\\temp\\ab\\abcdef" : "/tmp/ab/abcdef");
    });
    it("throws if relative path goes higher than root", () => {
      const root = isWindows ? "C:\\temp" : "tmp";
      const relative = "../../ab/abcdef";
      const pathGetter = Attachments.createAbsolutePathGetter(root);
      try {
        pathGetter(relative);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "Invalid relative path");
        return;
      }
      throw new Error("Expected an error");
    });
  });
  describe("createName", () => {
    it("should return random file name with correct length", () => {
      import_chai.assert.lengthOf(Attachments.createName(), NAME_LENGTH);
    });
    it("can include a suffix", () => {
      const result = Attachments.createName(".txt");
      import_chai.assert.lengthOf(result, NAME_LENGTH + ".txt".length);
      (0, import_chai.assert)(result.endsWith(".txt"));
    });
  });
  describe("getRelativePath", () => {
    it("should return correct path", () => {
      const name = "608ce3bc536edbf7637a6aeb6040bdfec49349140c0dd43e97c7ce263b15ff7e";
      import_chai.assert.lengthOf(Attachments.getRelativePath(name), PATH_LENGTH);
    });
  });
  describe("createDeleter", () => {
    it("should delete file from disk", async () => {
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createDeleter");
      const relativePath = Attachments.getRelativePath(Attachments.createName());
      const fullPath = import_path.default.join(tempDirectory, relativePath);
      const input = Bytes.fromString("test string");
      const inputBuffer = Buffer.from(input);
      await import_fs_extra.default.ensureFile(fullPath);
      await import_fs_extra.default.writeFile(fullPath, inputBuffer);
      await Attachments.createDeleter(tempDirectory)(relativePath);
      const existsFile = await import_fs_extra.default.pathExists(fullPath);
      import_chai.assert.isFalse(existsFile);
    });
    it("throws if relative path goes higher than root", async () => {
      const tempDirectory = import_path.default.join(tempRootDirectory, "Attachments_createDeleter");
      const relativePath = "../../parent";
      try {
        await Attachments.createDeleter(tempDirectory)(relativePath);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "Invalid relative path");
        return;
      }
      throw new Error("Expected an error");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXR0YWNobWVudHNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIEF0dGFjaG1lbnRzIGZyb20gJy4uLy4uL3dpbmRvd3MvYXR0YWNobWVudHMnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vLi4vQnl0ZXMnO1xuXG5jb25zdCBQUkVGSVhfTEVOR1RIID0gMjtcbmNvbnN0IE5VTV9TRVBBUkFUT1JTID0gMTtcbmNvbnN0IE5BTUVfTEVOR1RIID0gNjQ7XG5jb25zdCBQQVRIX0xFTkdUSCA9IFBSRUZJWF9MRU5HVEggKyBOVU1fU0VQQVJBVE9SUyArIE5BTUVfTEVOR1RIO1xuXG5kZXNjcmliZSgnQXR0YWNobWVudHMnLCAoKSA9PiB7XG4gIGNvbnN0IFVTRVJfREFUQSA9IHdpbmRvdy5TaWduYWxDb250ZXh0LmdldFBhdGgoJ3VzZXJEYXRhJyk7XG5cbiAgbGV0IHRlbXBSb290RGlyZWN0b3J5OiBzdHJpbmc7XG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICB0ZW1wUm9vdERpcmVjdG9yeSA9IGZzLm1rZHRlbXBTeW5jKHBhdGguam9pbihvcy50bXBkaXIoKSwgJ1NpZ25hbCcpKTtcbiAgfSk7XG5cbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGZzZS5yZW1vdmUodGVtcFJvb3REaXJlY3RvcnkpO1xuICB9KTtcblxuICBkZXNjcmliZSgnY3JlYXRlUmVhZGVyJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmVhZCBmaWxlIGZyb20gZGlzaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRlbXBEaXJlY3RvcnkgPSBwYXRoLmpvaW4oXG4gICAgICAgIHRlbXBSb290RGlyZWN0b3J5LFxuICAgICAgICAnQXR0YWNobWVudHNfY3JlYXRlUmVhZGVyJ1xuICAgICAgKTtcblxuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gQXR0YWNobWVudHMuZ2V0UmVsYXRpdmVQYXRoKFxuICAgICAgICBBdHRhY2htZW50cy5jcmVhdGVOYW1lKClcbiAgICAgICk7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IHBhdGguam9pbih0ZW1wRGlyZWN0b3J5LCByZWxhdGl2ZVBhdGgpO1xuICAgICAgY29uc3QgaW5wdXQgPSBCeXRlcy5mcm9tU3RyaW5nKCd0ZXN0IHN0cmluZycpO1xuXG4gICAgICBjb25zdCBpbnB1dEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGlucHV0KTtcbiAgICAgIGF3YWl0IGZzZS5lbnN1cmVGaWxlKGZ1bGxQYXRoKTtcbiAgICAgIGF3YWl0IGZzZS53cml0ZUZpbGUoZnVsbFBhdGgsIGlucHV0QnVmZmVyKTtcbiAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IEF0dGFjaG1lbnRzLmNyZWF0ZVJlYWRlcih0ZW1wRGlyZWN0b3J5KShcbiAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGlucHV0LCBvdXRwdXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiByZWxhdGl2ZSBwYXRoIGdvZXMgaGlnaGVyIHRoYW4gcm9vdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRlbXBEaXJlY3RvcnkgPSBwYXRoLmpvaW4oXG4gICAgICAgIHRlbXBSb290RGlyZWN0b3J5LFxuICAgICAgICAnQXR0YWNobWVudHNfY3JlYXRlUmVhZGVyJ1xuICAgICAgKTtcblxuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gJy4uLy4uL3BhcmVudCc7XG5cbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICBBdHRhY2htZW50cy5jcmVhdGVSZWFkZXIodGVtcERpcmVjdG9yeSkocmVsYXRpdmVQYXRoKSxcbiAgICAgICAgJ0ludmFsaWQgcmVsYXRpdmUgcGF0aCdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjb3B5SW50b0F0dGFjaG1lbnRzRGlyZWN0b3J5JywgKCkgPT4ge1xuICAgIGxldCBmaWxlc1RvUmVtb3ZlOiBBcnJheTxzdHJpbmc+O1xuXG4gICAgY29uc3QgZ2V0RmFrZUF0dGFjaG1lbnRzRGlyZWN0b3J5ID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcGF0aC5qb2luKFxuICAgICAgICBVU0VSX0RBVEEsXG4gICAgICAgIGBmYWtlLWF0dGFjaG1lbnRzLSR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAuc3Vic3RyaW5nKDIpfWBcbiAgICAgICk7XG4gICAgICBmaWxlc1RvUmVtb3ZlLnB1c2gocmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIFRoZXNlIHRlc3RzIHVzZSB0aGUgYHVzZXJEYXRhYCBwYXRoLiBJbiBgZWxlY3Ryb24tbW9jaGFgLCB0aGVzZSBhcmUgdGVtcG9yYXJ5XG4gICAgLy8gICBkaXJlY3Rvcmllczsgbm8gbmVlZCB0byBiZSBjb25jZXJuZWQgYWJvdXQgbWVzc2luZyB3aXRoIHRoZSBcInJlYWxcIiBkaXJlY3RvcnkuXG4gICAgYmVmb3JlKCgpID0+IHtcbiAgICAgIGZpbGVzVG9SZW1vdmUgPSBbXTtcbiAgICB9KTtcblxuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGZpbGVzVG9SZW1vdmUubWFwKHRvUmVtb3ZlID0+IGZzZS5yZW1vdmUodG9SZW1vdmUpKSk7XG4gICAgICBmaWxlc1RvUmVtb3ZlID0gW107XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHBhc3NlZCBhIG5vbi1zdHJpbmcnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgQXR0YWNobWVudHMuY29weUludG9BdHRhY2htZW50c0RpcmVjdG9yeSgxMjM0IGFzIHVua25vd24gYXMgc3RyaW5nKTtcbiAgICAgIH0sIFR5cGVFcnJvcik7XG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgQXR0YWNobWVudHMuY29weUludG9BdHRhY2htZW50c0RpcmVjdG9yeShudWxsIGFzIHVua25vd24gYXMgc3RyaW5nKTtcbiAgICAgIH0sIFR5cGVFcnJvcik7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyBpZiB0aGUgc291cmNlIHBhdGggaXMgbm90IGEgc3RyaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY29waWVyID0gQXR0YWNobWVudHMuY29weUludG9BdHRhY2htZW50c0RpcmVjdG9yeShcbiAgICAgICAgYXdhaXQgZ2V0RmFrZUF0dGFjaG1lbnRzRGlyZWN0b3J5KClcbiAgICAgICk7XG4gICAgICBhd2FpdCBhc3NlcnQuaXNSZWplY3RlZChjb3BpZXIoMTIzIGFzIHVua25vd24gYXMgc3RyaW5nKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyBpZiB0aGUgc291cmNlIHBhdGggaXMgbm90IGluIHRoZSB1c2VyIGNvbmZpZyBkaXJlY3RvcnknLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjb3BpZXIgPSBBdHRhY2htZW50cy5jb3B5SW50b0F0dGFjaG1lbnRzRGlyZWN0b3J5KFxuICAgICAgICBhd2FpdCBnZXRGYWtlQXR0YWNobWVudHNEaXJlY3RvcnkoKVxuICAgICAgKTtcbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICBjb3BpZXIocGF0aC5qb2luKHRlbXBSb290RGlyZWN0b3J5LCAnaGVsbG8udHh0JykpLFxuICAgICAgICBcIidzb3VyY2VQYXRoJyBtdXN0IGJlIHJlbGF0aXZlIHRvIHRoZSB1c2VyIGNvbmZpZyBkaXJlY3RvcnlcIlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjb3BpZXMgdGhlIHNvdXJjZSBwYXRoIGludG8gdGhlIGF0dGFjaG1lbnRzIGRpcmVjdG9yeSBhbmQgcmV0dXJucyBpdHMgcGF0aCBhbmQgc2l6ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnRzUGF0aCA9IGF3YWl0IGdldEZha2VBdHRhY2htZW50c0RpcmVjdG9yeSgpO1xuICAgICAgY29uc3Qgc29tZU90aGVyUGF0aCA9IHBhdGguam9pbihVU0VSX0RBVEEsICdzb21ldGhpbmdFbHNlJyk7XG4gICAgICBhd2FpdCBmc2Uub3V0cHV0RmlsZShzb21lT3RoZXJQYXRoLCAnaGVsbG8gd29ybGQnKTtcbiAgICAgIGZpbGVzVG9SZW1vdmUucHVzaChzb21lT3RoZXJQYXRoKTtcblxuICAgICAgY29uc3QgY29waWVyID0gQXR0YWNobWVudHMuY29weUludG9BdHRhY2htZW50c0RpcmVjdG9yeShhdHRhY2htZW50c1BhdGgpO1xuICAgICAgY29uc3QgeyBwYXRoOiByZWxhdGl2ZVBhdGgsIHNpemUgfSA9IGF3YWl0IGNvcGllcihzb21lT3RoZXJQYXRoKTtcblxuICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gcGF0aC5qb2luKGF0dGFjaG1lbnRzUGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICAgIGFzc2VydC5ub3RFcXVhbChzb21lT3RoZXJQYXRoLCBhYnNvbHV0ZVBhdGgpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShhYnNvbHV0ZVBhdGgsICd1dGY4JyksXG4gICAgICAgICdoZWxsbyB3b3JsZCdcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzaXplLCAnaGVsbG8gd29ybGQnLmxlbmd0aCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjcmVhdGVXcml0ZXJGb3JFeGlzdGluZycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHdyaXRlIGZpbGUgdG8gZGlzayBvbiBnaXZlbiBwYXRoIGFuZCByZXR1cm4gcGF0aCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gQnl0ZXMuZnJvbVN0cmluZygndGVzdCBzdHJpbmcnKTtcbiAgICAgIGNvbnN0IHRlbXBEaXJlY3RvcnkgPSBwYXRoLmpvaW4oXG4gICAgICAgIHRlbXBSb290RGlyZWN0b3J5LFxuICAgICAgICAnQXR0YWNobWVudHNfY3JlYXRlV3JpdGVyRm9yRXhpc3RpbmcnXG4gICAgICApO1xuXG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBBdHRhY2htZW50cy5nZXRSZWxhdGl2ZVBhdGgoXG4gICAgICAgIEF0dGFjaG1lbnRzLmNyZWF0ZU5hbWUoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSB7XG4gICAgICAgIHBhdGg6IHJlbGF0aXZlUGF0aCxcbiAgICAgICAgZGF0YTogaW5wdXQsXG4gICAgICB9O1xuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IGF3YWl0IEF0dGFjaG1lbnRzLmNyZWF0ZVdyaXRlckZvckV4aXN0aW5nKFxuICAgICAgICB0ZW1wRGlyZWN0b3J5XG4gICAgICApKGF0dGFjaG1lbnQpO1xuICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZnNlLnJlYWRGaWxlKHBhdGguam9pbih0ZW1wRGlyZWN0b3J5LCBvdXRwdXRQYXRoKSk7XG5cbiAgICAgIGFzc2VydC5lcXVhbChvdXRwdXRQYXRoLCByZWxhdGl2ZVBhdGgpO1xuXG4gICAgICBjb25zdCBpbnB1dEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaW5wdXRCdWZmZXIsIG91dHB1dCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHJlbGF0aXZlIHBhdGggZ29lcyBoaWdoZXIgdGhhbiByb290JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBCeXRlcy5mcm9tU3RyaW5nKCd0ZXN0IHN0cmluZycpO1xuICAgICAgY29uc3QgdGVtcERpcmVjdG9yeSA9IHBhdGguam9pbihcbiAgICAgICAgdGVtcFJvb3REaXJlY3RvcnksXG4gICAgICAgICdBdHRhY2htZW50c19jcmVhdGVXcml0ZXJGb3JFeGlzdGluZydcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9ICcuLi8uLi9wYXJlbnQnO1xuICAgICAgY29uc3QgYXR0YWNobWVudCA9IHtcbiAgICAgICAgcGF0aDogcmVsYXRpdmVQYXRoLFxuICAgICAgICBkYXRhOiBpbnB1dCxcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBBdHRhY2htZW50cy5jcmVhdGVXcml0ZXJGb3JFeGlzdGluZyh0ZW1wRGlyZWN0b3J5KShhdHRhY2htZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChlcnJvci5tZXNzYWdlLCAnSW52YWxpZCByZWxhdGl2ZSBwYXRoJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBlcnJvcicpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY3JlYXRlV3JpdGVyRm9yTmV3JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgd3JpdGUgZmlsZSB0byBkaXNrIGFuZCByZXR1cm4gcGF0aCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gQnl0ZXMuZnJvbVN0cmluZygndGVzdCBzdHJpbmcnKTtcbiAgICAgIGNvbnN0IHRlbXBEaXJlY3RvcnkgPSBwYXRoLmpvaW4oXG4gICAgICAgIHRlbXBSb290RGlyZWN0b3J5LFxuICAgICAgICAnQXR0YWNobWVudHNfY3JlYXRlV3JpdGVyRm9yTmV3J1xuICAgICAgKTtcblxuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IGF3YWl0IEF0dGFjaG1lbnRzLmNyZWF0ZVdyaXRlckZvck5ldyh0ZW1wRGlyZWN0b3J5KShcbiAgICAgICAgaW5wdXRcbiAgICAgICk7XG4gICAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCBmc2UucmVhZEZpbGUocGF0aC5qb2luKHRlbXBEaXJlY3RvcnksIG91dHB1dFBhdGgpKTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG91dHB1dFBhdGgsIFBBVEhfTEVOR1RIKTtcblxuICAgICAgY29uc3QgaW5wdXRCdWZmZXIgPSBCdWZmZXIuZnJvbShpbnB1dCk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGlucHV0QnVmZmVyLCBvdXRwdXQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY3JlYXRlQWJzb2x1dGVQYXRoR2V0dGVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGlzV2luZG93cyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5cbiAgICBpdCgnY29tYmluZXMgcm9vdCBhbmQgcmVsYXRpdmUgcGF0aCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHJvb3QgPSBpc1dpbmRvd3MgPyAnQzpcXFxcdGVtcCcgOiAnL3RtcCc7XG4gICAgICBjb25zdCByZWxhdGl2ZSA9ICdhYi9hYmNkZWYnO1xuICAgICAgY29uc3QgcGF0aEdldHRlciA9IEF0dGFjaG1lbnRzLmNyZWF0ZUFic29sdXRlUGF0aEdldHRlcihyb290KTtcbiAgICAgIGNvbnN0IGFic29sdXRlUGF0aCA9IHBhdGhHZXR0ZXIocmVsYXRpdmUpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGFic29sdXRlUGF0aCxcbiAgICAgICAgaXNXaW5kb3dzID8gJ0M6XFxcXHRlbXBcXFxcYWJcXFxcYWJjZGVmJyA6ICcvdG1wL2FiL2FiY2RlZidcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHJlbGF0aXZlIHBhdGggZ29lcyBoaWdoZXIgdGhhbiByb290JywgKCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdCA9IGlzV2luZG93cyA/ICdDOlxcXFx0ZW1wJyA6ICd0bXAnO1xuICAgICAgY29uc3QgcmVsYXRpdmUgPSAnLi4vLi4vYWIvYWJjZGVmJztcbiAgICAgIGNvbnN0IHBhdGhHZXR0ZXIgPSBBdHRhY2htZW50cy5jcmVhdGVBYnNvbHV0ZVBhdGhHZXR0ZXIocm9vdCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHBhdGhHZXR0ZXIocmVsYXRpdmUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVycm9yLm1lc3NhZ2UsICdJbnZhbGlkIHJlbGF0aXZlIHBhdGgnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGFuIGVycm9yJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjcmVhdGVOYW1lJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHJhbmRvbSBmaWxlIG5hbWUgd2l0aCBjb3JyZWN0IGxlbmd0aCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihBdHRhY2htZW50cy5jcmVhdGVOYW1lKCksIE5BTUVfTEVOR1RIKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gaW5jbHVkZSBhIHN1ZmZpeCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IEF0dGFjaG1lbnRzLmNyZWF0ZU5hbWUoJy50eHQnKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihyZXN1bHQsIE5BTUVfTEVOR1RIICsgJy50eHQnLmxlbmd0aCk7XG4gICAgICBhc3NlcnQocmVzdWx0LmVuZHNXaXRoKCcudHh0JykpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0UmVsYXRpdmVQYXRoJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvcnJlY3QgcGF0aCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPVxuICAgICAgICAnNjA4Y2UzYmM1MzZlZGJmNzYzN2E2YWViNjA0MGJkZmVjNDkzNDkxNDBjMGRkNDNlOTdjN2NlMjYzYjE1ZmY3ZSc7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoQXR0YWNobWVudHMuZ2V0UmVsYXRpdmVQYXRoKG5hbWUpLCBQQVRIX0xFTkdUSCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjcmVhdGVEZWxldGVyJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgZGVsZXRlIGZpbGUgZnJvbSBkaXNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdGVtcERpcmVjdG9yeSA9IHBhdGguam9pbihcbiAgICAgICAgdGVtcFJvb3REaXJlY3RvcnksXG4gICAgICAgICdBdHRhY2htZW50c19jcmVhdGVEZWxldGVyJ1xuICAgICAgKTtcblxuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gQXR0YWNobWVudHMuZ2V0UmVsYXRpdmVQYXRoKFxuICAgICAgICBBdHRhY2htZW50cy5jcmVhdGVOYW1lKClcbiAgICAgICk7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IHBhdGguam9pbih0ZW1wRGlyZWN0b3J5LCByZWxhdGl2ZVBhdGgpO1xuICAgICAgY29uc3QgaW5wdXQgPSBCeXRlcy5mcm9tU3RyaW5nKCd0ZXN0IHN0cmluZycpO1xuXG4gICAgICBjb25zdCBpbnB1dEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGlucHV0KTtcbiAgICAgIGF3YWl0IGZzZS5lbnN1cmVGaWxlKGZ1bGxQYXRoKTtcbiAgICAgIGF3YWl0IGZzZS53cml0ZUZpbGUoZnVsbFBhdGgsIGlucHV0QnVmZmVyKTtcbiAgICAgIGF3YWl0IEF0dGFjaG1lbnRzLmNyZWF0ZURlbGV0ZXIodGVtcERpcmVjdG9yeSkocmVsYXRpdmVQYXRoKTtcblxuICAgICAgY29uc3QgZXhpc3RzRmlsZSA9IGF3YWl0IGZzZS5wYXRoRXhpc3RzKGZ1bGxQYXRoKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGV4aXN0c0ZpbGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiByZWxhdGl2ZSBwYXRoIGdvZXMgaGlnaGVyIHRoYW4gcm9vdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRlbXBEaXJlY3RvcnkgPSBwYXRoLmpvaW4oXG4gICAgICAgIHRlbXBSb290RGlyZWN0b3J5LFxuICAgICAgICAnQXR0YWNobWVudHNfY3JlYXRlRGVsZXRlcidcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9ICcuLi8uLi9wYXJlbnQnO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBBdHRhY2htZW50cy5jcmVhdGVEZWxldGVyKHRlbXBEaXJlY3RvcnkpKHJlbGF0aXZlUGF0aCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXJyb3IubWVzc2FnZSwgJ0ludmFsaWQgcmVsYXRpdmUgcGF0aCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYW4gZXJyb3InKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsa0JBQWlCO0FBQ2pCLGdCQUFlO0FBQ2YsZ0JBQWU7QUFDZixzQkFBZ0I7QUFDaEIsa0JBQTZCO0FBQzdCLFlBQXVCO0FBRXZCLE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sY0FBYztBQUNwQixNQUFNLGNBQWMsZ0JBQWdCLGlCQUFpQjtBQUVyRCxTQUFTLGVBQWUsTUFBTTtBQUM1QixRQUFNLFlBQVksT0FBTyxjQUFjLFFBQVEsVUFBVTtBQUV6RCxNQUFJO0FBRUosU0FBTyxNQUFNO0FBQ1gsd0JBQW9C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
