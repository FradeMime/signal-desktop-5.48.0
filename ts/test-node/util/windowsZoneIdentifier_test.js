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
var path = __toESM(require("path"));
var os = __toESM(require("os"));
var fs = __toESM(require("fs"));
var fse = __toESM(require("fs-extra"));
var Sinon = __toESM(require("sinon"));
var import_windowsZoneIdentifier = require("../../util/windowsZoneIdentifier");
describe("writeWindowsZoneIdentifier", () => {
  before(function thisNeeded() {
    if (process.platform !== "win32") {
      this.skip();
    }
  });
  beforeEach(async function thisNeeded() {
    this.sandbox = Sinon.createSandbox();
    this.tmpdir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "signal-test-"));
  });
  afterEach(async function thisNeeded() {
    this.sandbox.restore();
    await fse.remove(this.tmpdir);
  });
  it("writes zone transfer ID 3 (internet) to the Zone.Identifier file", async function thisNeeded() {
    const file = path.join(this.tmpdir, "file.txt");
    await fse.outputFile(file, "hello");
    await (0, import_windowsZoneIdentifier.writeWindowsZoneIdentifier)(file);
    import_chai.assert.strictEqual(await fs.promises.readFile(`${file}:Zone.Identifier`, "utf8"), "[ZoneTransfer]\r\nZoneId=3");
  });
  it("fails if there is an existing Zone.Identifier file", async function thisNeeded() {
    const file = path.join(this.tmpdir, "file.txt");
    await fse.outputFile(file, "hello");
    await fs.promises.writeFile(`${file}:Zone.Identifier`, "# already here");
    await import_chai.assert.isRejected((0, import_windowsZoneIdentifier.writeWindowsZoneIdentifier)(file));
  });
  it("fails if the original file does not exist", async function thisNeeded() {
    const file = path.join(this.tmpdir, "file-never-created.txt");
    await import_chai.assert.isRejected((0, import_windowsZoneIdentifier.writeWindowsZoneIdentifier)(file));
  });
  it("fails if not on Windows", async function thisNeeded() {
    this.sandbox.stub(process, "platform").get(() => "darwin");
    const file = path.join(this.tmpdir, "file.txt");
    await fse.outputFile(file, "hello");
    await import_chai.assert.isRejected((0, import_windowsZoneIdentifier.writeWindowsZoneIdentifier)(file));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2luZG93c1pvbmVJZGVudGlmaWVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBmc2UgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgU2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgeyB3cml0ZVdpbmRvd3Nab25lSWRlbnRpZmllciB9IGZyb20gJy4uLy4uL3V0aWwvd2luZG93c1pvbmVJZGVudGlmaWVyJztcblxuZGVzY3JpYmUoJ3dyaXRlV2luZG93c1pvbmVJZGVudGlmaWVyJywgKCkgPT4ge1xuICBiZWZvcmUoZnVuY3Rpb24gdGhpc05lZWRlZCgpIHtcbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ3dpbjMyJykge1xuICAgICAgdGhpcy5za2lwKCk7XG4gICAgfVxuICB9KTtcblxuICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uIHRoaXNOZWVkZWQoKSB7XG4gICAgdGhpcy5zYW5kYm94ID0gU2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgIHRoaXMudG1wZGlyID0gYXdhaXQgZnMucHJvbWlzZXMubWtkdGVtcChcbiAgICAgIHBhdGguam9pbihvcy50bXBkaXIoKSwgJ3NpZ25hbC10ZXN0LScpXG4gICAgKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uIHRoaXNOZWVkZWQoKSB7XG4gICAgdGhpcy5zYW5kYm94LnJlc3RvcmUoKTtcbiAgICBhd2FpdCBmc2UucmVtb3ZlKHRoaXMudG1wZGlyKTtcbiAgfSk7XG5cbiAgaXQoJ3dyaXRlcyB6b25lIHRyYW5zZmVyIElEIDMgKGludGVybmV0KSB0byB0aGUgWm9uZS5JZGVudGlmaWVyIGZpbGUnLCBhc3luYyBmdW5jdGlvbiB0aGlzTmVlZGVkKCkge1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4odGhpcy50bXBkaXIsICdmaWxlLnR4dCcpO1xuICAgIGF3YWl0IGZzZS5vdXRwdXRGaWxlKGZpbGUsICdoZWxsbycpO1xuXG4gICAgYXdhaXQgd3JpdGVXaW5kb3dzWm9uZUlkZW50aWZpZXIoZmlsZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShgJHtmaWxlfTpab25lLklkZW50aWZpZXJgLCAndXRmOCcpLFxuICAgICAgJ1tab25lVHJhbnNmZXJdXFxyXFxuWm9uZUlkPTMnXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ2ZhaWxzIGlmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIFpvbmUuSWRlbnRpZmllciBmaWxlJywgYXN5bmMgZnVuY3Rpb24gdGhpc05lZWRlZCgpIHtcbiAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHRoaXMudG1wZGlyLCAnZmlsZS50eHQnKTtcbiAgICBhd2FpdCBmc2Uub3V0cHV0RmlsZShmaWxlLCAnaGVsbG8nKTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoYCR7ZmlsZX06Wm9uZS5JZGVudGlmaWVyYCwgJyMgYWxyZWFkeSBoZXJlJyk7XG5cbiAgICBhd2FpdCBhc3NlcnQuaXNSZWplY3RlZCh3cml0ZVdpbmRvd3Nab25lSWRlbnRpZmllcihmaWxlKSk7XG4gIH0pO1xuXG4gIGl0KCdmYWlscyBpZiB0aGUgb3JpZ2luYWwgZmlsZSBkb2VzIG5vdCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uIHRoaXNOZWVkZWQoKSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbih0aGlzLnRtcGRpciwgJ2ZpbGUtbmV2ZXItY3JlYXRlZC50eHQnKTtcblxuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKHdyaXRlV2luZG93c1pvbmVJZGVudGlmaWVyKGZpbGUpKTtcbiAgfSk7XG5cbiAgaXQoJ2ZhaWxzIGlmIG5vdCBvbiBXaW5kb3dzJywgYXN5bmMgZnVuY3Rpb24gdGhpc05lZWRlZCgpIHtcbiAgICB0aGlzLnNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ2RhcndpbicpO1xuXG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbih0aGlzLnRtcGRpciwgJ2ZpbGUudHh0Jyk7XG4gICAgYXdhaXQgZnNlLm91dHB1dEZpbGUoZmlsZSwgJ2hlbGxvJyk7XG5cbiAgICBhd2FpdCBhc3NlcnQuaXNSZWplY3RlZCh3cml0ZVdpbmRvd3Nab25lSWRlbnRpZmllcihmaWxlKSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFdBQXNCO0FBQ3RCLFNBQW9CO0FBQ3BCLFNBQW9CO0FBQ3BCLFVBQXFCO0FBQ3JCLFlBQXVCO0FBRXZCLG1DQUEyQztBQUUzQyxTQUFTLDhCQUE4QixNQUFNO0FBQzNDLFNBQU8sc0JBQXNCO0FBQzNCLFFBQUksUUFBUSxhQUFhLFNBQVM7QUFDaEMsV0FBSyxLQUFLO0FBQUEsSUFDWjtBQUFBLEVBQ0YsQ0FBQztBQUVELGFBQVcsNEJBQTRCO0FBQ3JDLFNBQUssVUFBVSxNQUFNLGNBQWM7QUFDbkMsU0FBSyxTQUFTLE1BQU0sR0FBRyxTQUFTLFFBQzlCLEtBQUssS0FBSyxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQ3ZDO0FBQUEsRUFDRixDQUFDO0FBRUQsWUFBVSw0QkFBNEI7QUFDcEMsU0FBSyxRQUFRLFFBQVE7QUFDckIsVUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNO0FBQUEsRUFDOUIsQ0FBQztBQUVELEtBQUcsb0VBQW9FLDRCQUE0QjtBQUNqRyxVQUFNLE9BQU8sS0FBSyxLQUFLLEtBQUssUUFBUSxVQUFVO0FBQzlDLFVBQU0sSUFBSSxXQUFXLE1BQU0sT0FBTztBQUVsQyxVQUFNLDZEQUEyQixJQUFJO0FBRXJDLHVCQUFPLFlBQ0wsTUFBTSxHQUFHLFNBQVMsU0FBUyxHQUFHLHdCQUF3QixNQUFNLEdBQzVELDRCQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxzREFBc0QsNEJBQTRCO0FBQ25GLFVBQU0sT0FBTyxLQUFLLEtBQUssS0FBSyxRQUFRLFVBQVU7QUFDOUMsVUFBTSxJQUFJLFdBQVcsTUFBTSxPQUFPO0FBQ2xDLFVBQU0sR0FBRyxTQUFTLFVBQVUsR0FBRyx3QkFBd0IsZ0JBQWdCO0FBRXZFLFVBQU0sbUJBQU8sV0FBVyw2REFBMkIsSUFBSSxDQUFDO0FBQUEsRUFDMUQsQ0FBQztBQUVELEtBQUcsNkNBQTZDLDRCQUE0QjtBQUMxRSxVQUFNLE9BQU8sS0FBSyxLQUFLLEtBQUssUUFBUSx3QkFBd0I7QUFFNUQsVUFBTSxtQkFBTyxXQUFXLDZEQUEyQixJQUFJLENBQUM7QUFBQSxFQUMxRCxDQUFDO0FBRUQsS0FBRywyQkFBMkIsNEJBQTRCO0FBQ3hELFNBQUssUUFBUSxLQUFLLFNBQVMsVUFBVSxFQUFFLElBQUksTUFBTSxRQUFRO0FBRXpELFVBQU0sT0FBTyxLQUFLLEtBQUssS0FBSyxRQUFRLFVBQVU7QUFDOUMsVUFBTSxJQUFJLFdBQVcsTUFBTSxPQUFPO0FBRWxDLFVBQU0sbUJBQU8sV0FBVyw2REFBMkIsSUFBSSxDQUFDO0FBQUEsRUFDMUQsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
