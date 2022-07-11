var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_audioDeviceModule = require("../../calling/audioDeviceModule");
describe("audio device module", () => {
  describe("getAudioDeviceModule", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it("returns ADM2 on Windows", () => {
      sandbox.stub(process, "platform").get(() => "win32");
      import_chai.assert.strictEqual((0, import_audioDeviceModule.getAudioDeviceModule)(), import_audioDeviceModule.AudioDeviceModule.WindowsAdm2);
    });
    it("returns the default module on macOS", () => {
      sandbox.stub(process, "platform").get(() => "darwin");
      import_chai.assert.strictEqual((0, import_audioDeviceModule.getAudioDeviceModule)(), import_audioDeviceModule.AudioDeviceModule.Default);
    });
    it("returns the default module on Linux", () => {
      sandbox.stub(process, "platform").get(() => "linux");
      import_chai.assert.strictEqual((0, import_audioDeviceModule.getAudioDeviceModule)(), import_audioDeviceModule.AudioDeviceModule.Default);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9EZXZpY2VNb2R1bGVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHtcbiAgQXVkaW9EZXZpY2VNb2R1bGUsXG4gIGdldEF1ZGlvRGV2aWNlTW9kdWxlLFxufSBmcm9tICcuLi8uLi9jYWxsaW5nL2F1ZGlvRGV2aWNlTW9kdWxlJztcblxuZGVzY3JpYmUoJ2F1ZGlvIGRldmljZSBtb2R1bGUnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdnZXRBdWRpb0RldmljZU1vZHVsZScsICgpID0+IHtcbiAgICBsZXQgc2FuZGJveDogc2lub24uU2lub25TYW5kYm94O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgQURNMiBvbiBXaW5kb3dzJywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLmdldCgoKSA9PiAnd2luMzInKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRBdWRpb0RldmljZU1vZHVsZSgpLCBBdWRpb0RldmljZU1vZHVsZS5XaW5kb3dzQWRtMik7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZGVmYXVsdCBtb2R1bGUgb24gbWFjT1MnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykuZ2V0KCgpID0+ICdkYXJ3aW4nKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRBdWRpb0RldmljZU1vZHVsZSgpLCBBdWRpb0RldmljZU1vZHVsZS5EZWZhdWx0KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBkZWZhdWx0IG1vZHVsZSBvbiBMaW51eCcsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ2xpbnV4Jyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0QXVkaW9EZXZpY2VNb2R1bGUoKSwgQXVkaW9EZXZpY2VNb2R1bGUuRGVmYXVsdCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFFdkIsK0JBR087QUFFUCxTQUFTLHVCQUF1QixNQUFNO0FBQ3BDLFdBQVMsd0JBQXdCLE1BQU07QUFDckMsUUFBSTtBQUVKLGVBQVcsTUFBTTtBQUNmLGdCQUFVLE1BQU0sY0FBYztBQUFBLElBQ2hDLENBQUM7QUFFRCxjQUFVLE1BQU07QUFDZCxjQUFRLFFBQVE7QUFBQSxJQUNsQixDQUFDO0FBRUQsT0FBRywyQkFBMkIsTUFBTTtBQUNsQyxjQUFRLEtBQUssU0FBUyxVQUFVLEVBQUUsSUFBSSxNQUFNLE9BQU87QUFDbkQseUJBQU8sWUFBWSxtREFBcUIsR0FBRywyQ0FBa0IsV0FBVztBQUFBLElBQzFFLENBQUM7QUFFRCxPQUFHLHVDQUF1QyxNQUFNO0FBQzlDLGNBQVEsS0FBSyxTQUFTLFVBQVUsRUFBRSxJQUFJLE1BQU0sUUFBUTtBQUNwRCx5QkFBTyxZQUFZLG1EQUFxQixHQUFHLDJDQUFrQixPQUFPO0FBQUEsSUFDdEUsQ0FBQztBQUVELE9BQUcsdUNBQXVDLE1BQU07QUFDOUMsY0FBUSxLQUFLLFNBQVMsVUFBVSxFQUFFLElBQUksTUFBTSxPQUFPO0FBQ25ELHlCQUFPLFlBQVksbURBQXFCLEdBQUcsMkNBQWtCLE9BQU87QUFBQSxJQUN0RSxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
