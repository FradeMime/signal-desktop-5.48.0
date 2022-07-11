var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_audioDeviceModule = require("../../calling/audioDeviceModule");
var import_findBestMatchingDevice = require("../../calling/findBestMatchingDevice");
describe('"find best matching device" helpers', () => {
  describe("findBestMatchingAudioDeviceIndex", () => {
    const itReturnsUndefinedIfNoDevicesAreAvailable = /* @__PURE__ */ __name((admOptions) => {
      it("returns undefined if no devices are available", () => {
        [
          void 0,
          { name: "Big Microphone", index: 1, uniqueId: "abc123" }
        ].forEach((preferred) => {
          import_chai.assert.isUndefined((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
            available: [],
            preferred,
            ...admOptions
          }));
        });
      });
    }, "itReturnsUndefinedIfNoDevicesAreAvailable");
    const itReturnsTheFirstAvailableDeviceIfNoneIsPreferred = /* @__PURE__ */ __name((admOptions) => {
      it("returns the first available device if none is preferred", () => {
        import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
          available: [
            { name: "A", index: 123, uniqueId: "device-A" },
            { name: "B", index: 456, uniqueId: "device-B" },
            { name: "C", index: 789, uniqueId: "device-C" }
          ],
          preferred: void 0,
          ...admOptions
        }), 0);
      });
    }, "itReturnsTheFirstAvailableDeviceIfNoneIsPreferred");
    const testUniqueIdMatch = /* @__PURE__ */ __name((admOptions) => {
      import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
        available: [
          { name: "A", index: 123, uniqueId: "device-A" },
          { name: "B", index: 456, uniqueId: "device-B" },
          { name: "C", index: 789, uniqueId: "device-C" }
        ],
        preferred: { name: "Ignored", index: 99, uniqueId: "device-C" },
        ...admOptions
      }), 2);
    }, "testUniqueIdMatch");
    const testNameMatch = /* @__PURE__ */ __name((admOptions) => {
      import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
        available: [
          { name: "A", index: 123, uniqueId: "device-A" },
          { name: "B", index: 456, uniqueId: "device-B" },
          { name: "C", index: 789, uniqueId: "device-C" }
        ],
        preferred: { name: "C", index: 99, uniqueId: "ignored" },
        ...admOptions
      }), 2);
    }, "testNameMatch");
    const itReturnsTheFirstAvailableDeviceIfThePreferredDeviceIsNotFound = /* @__PURE__ */ __name((admOptions) => {
      it("returns the first available device if the preferred device is not found", () => {
        import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
          available: [
            { name: "A", index: 123, uniqueId: "device-A" },
            { name: "B", index: 456, uniqueId: "device-B" },
            { name: "C", index: 789, uniqueId: "device-C" }
          ],
          preferred: { name: "X", index: 123, uniqueId: "Y" },
          ...admOptions
        }), 0);
      });
    }, "itReturnsTheFirstAvailableDeviceIfThePreferredDeviceIsNotFound");
    describe("with default audio device module", () => {
      const admOptions = {
        previousAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.Default,
        currentAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.Default
      };
      itReturnsUndefinedIfNoDevicesAreAvailable(admOptions);
      itReturnsTheFirstAvailableDeviceIfNoneIsPreferred(admOptions);
      it("returns a unique ID match if it exists", () => {
        testUniqueIdMatch(admOptions);
      });
      it("returns a name match if it exists", () => {
        testNameMatch(admOptions);
      });
      itReturnsTheFirstAvailableDeviceIfThePreferredDeviceIsNotFound(admOptions);
    });
    describe("when going from the default to Windows ADM2", () => {
      const admOptions = {
        previousAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.Default,
        currentAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.WindowsAdm2
      };
      itReturnsUndefinedIfNoDevicesAreAvailable(admOptions);
      itReturnsTheFirstAvailableDeviceIfNoneIsPreferred(admOptions);
      it("returns 0 if that was the previous preferred index (and a device is available)", () => {
        import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
          available: [
            { name: "A", index: 123, uniqueId: "device-A" },
            { name: "B", index: 456, uniqueId: "device-B" }
          ],
          preferred: { name: "B", index: 0, uniqueId: "device-B" },
          ...admOptions
        }), 0);
      });
      it("returns a unique ID match if it exists and the preferred index is not 0", () => {
        testUniqueIdMatch(admOptions);
      });
      it("returns a name match if it exists and the preferred index is not 0", () => {
        testNameMatch(admOptions);
      });
      itReturnsTheFirstAvailableDeviceIfThePreferredDeviceIsNotFound(admOptions);
    });
    describe('when going "backwards" from Windows ADM2 to the default', () => {
      const admOptions = {
        previousAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.WindowsAdm2,
        currentAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.Default
      };
      itReturnsUndefinedIfNoDevicesAreAvailable(admOptions);
      itReturnsTheFirstAvailableDeviceIfNoneIsPreferred(admOptions);
      it("returns a unique ID match if it exists", () => {
        testUniqueIdMatch(admOptions);
      });
      it("returns a name match if it exists", () => {
        testNameMatch(admOptions);
      });
      itReturnsTheFirstAvailableDeviceIfThePreferredDeviceIsNotFound(admOptions);
    });
    describe("with Windows ADM2", () => {
      const admOptions = {
        previousAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.WindowsAdm2,
        currentAudioDeviceModule: import_audioDeviceModule.AudioDeviceModule.WindowsAdm2
      };
      itReturnsUndefinedIfNoDevicesAreAvailable(admOptions);
      itReturnsTheFirstAvailableDeviceIfNoneIsPreferred(admOptions);
      [0, 1].forEach((index) => {
        it(`returns ${index} if that was the previous preferred index (and a device is available)`, () => {
          import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
            available: [
              { name: "A", index: 123, uniqueId: "device-A" },
              { name: "B", index: 456, uniqueId: "device-B" },
              { name: "C", index: 789, uniqueId: "device-C" }
            ],
            preferred: { name: "C", index, uniqueId: "device-C" },
            ...admOptions
          }), index);
        });
      });
      it("returns 0 if the previous preferred index was 1 but there's only 1 audio device", () => {
        import_chai.assert.strictEqual((0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
          available: [{ name: "A", index: 123, uniqueId: "device-A" }],
          preferred: { name: "C", index: 1, uniqueId: "device-C" },
          ...admOptions
        }), 0);
      });
      it("returns a unique ID match if it exists and the preferred index is not 0 or 1", () => {
        testUniqueIdMatch(admOptions);
      });
      it("returns a name match if it exists and the preferred index is not 0 or 1", () => {
        testNameMatch(admOptions);
      });
      itReturnsTheFirstAvailableDeviceIfThePreferredDeviceIsNotFound(admOptions);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmluZEJlc3RNYXRjaGluZ0RldmljZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgQXVkaW9EZXZpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi9jYWxsaW5nL2F1ZGlvRGV2aWNlTW9kdWxlJztcblxuaW1wb3J0IHsgZmluZEJlc3RNYXRjaGluZ0F1ZGlvRGV2aWNlSW5kZXggfSBmcm9tICcuLi8uLi9jYWxsaW5nL2ZpbmRCZXN0TWF0Y2hpbmdEZXZpY2UnO1xuXG5kZXNjcmliZSgnXCJmaW5kIGJlc3QgbWF0Y2hpbmcgZGV2aWNlXCIgaGVscGVycycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2ZpbmRCZXN0TWF0Y2hpbmdBdWRpb0RldmljZUluZGV4JywgKCkgPT4ge1xuICAgIHR5cGUgQWRtT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gICAgICBwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlOiBBdWRpb0RldmljZU1vZHVsZTtcbiAgICAgIGN1cnJlbnRBdWRpb0RldmljZU1vZHVsZTogQXVkaW9EZXZpY2VNb2R1bGU7XG4gICAgfT47XG5cbiAgICBjb25zdCBpdFJldHVybnNVbmRlZmluZWRJZk5vRGV2aWNlc0FyZUF2YWlsYWJsZSA9IChcbiAgICAgIGFkbU9wdGlvbnM6IEFkbU9wdGlvbnNUeXBlXG4gICAgKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgbm8gZGV2aWNlcyBhcmUgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICBbXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHsgbmFtZTogJ0JpZyBNaWNyb3Bob25lJywgaW5kZXg6IDEsIHVuaXF1ZUlkOiAnYWJjMTIzJyB9LFxuICAgICAgICBdLmZvckVhY2gocHJlZmVycmVkID0+IHtcbiAgICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgICAgICBmaW5kQmVzdE1hdGNoaW5nQXVkaW9EZXZpY2VJbmRleCh7XG4gICAgICAgICAgICAgIGF2YWlsYWJsZTogW10sXG4gICAgICAgICAgICAgIHByZWZlcnJlZCxcbiAgICAgICAgICAgICAgLi4uYWRtT3B0aW9ucyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaXRSZXR1cm5zVGhlRmlyc3RBdmFpbGFibGVEZXZpY2VJZk5vbmVJc1ByZWZlcnJlZCA9IChcbiAgICAgIGFkbU9wdGlvbnM6IEFkbU9wdGlvbnNUeXBlXG4gICAgKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgZmlyc3QgYXZhaWxhYmxlIGRldmljZSBpZiBub25lIGlzIHByZWZlcnJlZCcsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGZpbmRCZXN0TWF0Y2hpbmdBdWRpb0RldmljZUluZGV4KHtcbiAgICAgICAgICAgIGF2YWlsYWJsZTogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICdBJywgaW5kZXg6IDEyMywgdW5pcXVlSWQ6ICdkZXZpY2UtQScgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnQicsIGluZGV4OiA0NTYsIHVuaXF1ZUlkOiAnZGV2aWNlLUInIH0sXG4gICAgICAgICAgICAgIHsgbmFtZTogJ0MnLCBpbmRleDogNzg5LCB1bmlxdWVJZDogJ2RldmljZS1DJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHByZWZlcnJlZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLi4uYWRtT3B0aW9ucyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgdGVzdFVuaXF1ZUlkTWF0Y2ggPSAoYWRtT3B0aW9uczogQWRtT3B0aW9uc1R5cGUpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZmluZEJlc3RNYXRjaGluZ0F1ZGlvRGV2aWNlSW5kZXgoe1xuICAgICAgICAgIGF2YWlsYWJsZTogW1xuICAgICAgICAgICAgeyBuYW1lOiAnQScsIGluZGV4OiAxMjMsIHVuaXF1ZUlkOiAnZGV2aWNlLUEnIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdCJywgaW5kZXg6IDQ1NiwgdW5pcXVlSWQ6ICdkZXZpY2UtQicgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ0MnLCBpbmRleDogNzg5LCB1bmlxdWVJZDogJ2RldmljZS1DJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgcHJlZmVycmVkOiB7IG5hbWU6ICdJZ25vcmVkJywgaW5kZXg6IDk5LCB1bmlxdWVJZDogJ2RldmljZS1DJyB9LFxuICAgICAgICAgIC4uLmFkbU9wdGlvbnMsXG4gICAgICAgIH0pLFxuICAgICAgICAyXG4gICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCB0ZXN0TmFtZU1hdGNoID0gKGFkbU9wdGlvbnM6IEFkbU9wdGlvbnNUeXBlKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZpbmRCZXN0TWF0Y2hpbmdBdWRpb0RldmljZUluZGV4KHtcbiAgICAgICAgICBhdmFpbGFibGU6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ0EnLCBpbmRleDogMTIzLCB1bmlxdWVJZDogJ2RldmljZS1BJyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnQicsIGluZGV4OiA0NTYsIHVuaXF1ZUlkOiAnZGV2aWNlLUInIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdDJywgaW5kZXg6IDc4OSwgdW5pcXVlSWQ6ICdkZXZpY2UtQycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHByZWZlcnJlZDogeyBuYW1lOiAnQycsIGluZGV4OiA5OSwgdW5pcXVlSWQ6ICdpZ25vcmVkJyB9LFxuICAgICAgICAgIC4uLmFkbU9wdGlvbnMsXG4gICAgICAgIH0pLFxuICAgICAgICAyXG4gICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCBpdFJldHVybnNUaGVGaXJzdEF2YWlsYWJsZURldmljZUlmVGhlUHJlZmVycmVkRGV2aWNlSXNOb3RGb3VuZCA9IChcbiAgICAgIGFkbU9wdGlvbnM6IEFkbU9wdGlvbnNUeXBlXG4gICAgKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgZmlyc3QgYXZhaWxhYmxlIGRldmljZSBpZiB0aGUgcHJlZmVycmVkIGRldmljZSBpcyBub3QgZm91bmQnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBmaW5kQmVzdE1hdGNoaW5nQXVkaW9EZXZpY2VJbmRleCh7XG4gICAgICAgICAgICBhdmFpbGFibGU6IFtcbiAgICAgICAgICAgICAgeyBuYW1lOiAnQScsIGluZGV4OiAxMjMsIHVuaXF1ZUlkOiAnZGV2aWNlLUEnIH0sXG4gICAgICAgICAgICAgIHsgbmFtZTogJ0InLCBpbmRleDogNDU2LCB1bmlxdWVJZDogJ2RldmljZS1CJyB9LFxuICAgICAgICAgICAgICB7IG5hbWU6ICdDJywgaW5kZXg6IDc4OSwgdW5pcXVlSWQ6ICdkZXZpY2UtQycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBwcmVmZXJyZWQ6IHsgbmFtZTogJ1gnLCBpbmRleDogMTIzLCB1bmlxdWVJZDogJ1knIH0sXG4gICAgICAgICAgICAuLi5hZG1PcHRpb25zLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIDBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBkZXNjcmliZSgnd2l0aCBkZWZhdWx0IGF1ZGlvIGRldmljZSBtb2R1bGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhZG1PcHRpb25zID0ge1xuICAgICAgICBwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlOiBBdWRpb0RldmljZU1vZHVsZS5EZWZhdWx0LFxuICAgICAgICBjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGU6IEF1ZGlvRGV2aWNlTW9kdWxlLkRlZmF1bHQsXG4gICAgICB9O1xuXG4gICAgICBpdFJldHVybnNVbmRlZmluZWRJZk5vRGV2aWNlc0FyZUF2YWlsYWJsZShhZG1PcHRpb25zKTtcblxuICAgICAgaXRSZXR1cm5zVGhlRmlyc3RBdmFpbGFibGVEZXZpY2VJZk5vbmVJc1ByZWZlcnJlZChhZG1PcHRpb25zKTtcblxuICAgICAgaXQoJ3JldHVybnMgYSB1bmlxdWUgSUQgbWF0Y2ggaWYgaXQgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VW5pcXVlSWRNYXRjaChhZG1PcHRpb25zKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhIG5hbWUgbWF0Y2ggaWYgaXQgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICB0ZXN0TmFtZU1hdGNoKGFkbU9wdGlvbnMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0UmV0dXJuc1RoZUZpcnN0QXZhaWxhYmxlRGV2aWNlSWZUaGVQcmVmZXJyZWREZXZpY2VJc05vdEZvdW5kKFxuICAgICAgICBhZG1PcHRpb25zXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3doZW4gZ29pbmcgZnJvbSB0aGUgZGVmYXVsdCB0byBXaW5kb3dzIEFETTInLCAoKSA9PiB7XG4gICAgICBjb25zdCBhZG1PcHRpb25zID0ge1xuICAgICAgICBwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlOiBBdWRpb0RldmljZU1vZHVsZS5EZWZhdWx0LFxuICAgICAgICBjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGU6IEF1ZGlvRGV2aWNlTW9kdWxlLldpbmRvd3NBZG0yLFxuICAgICAgfTtcblxuICAgICAgaXRSZXR1cm5zVW5kZWZpbmVkSWZOb0RldmljZXNBcmVBdmFpbGFibGUoYWRtT3B0aW9ucyk7XG5cbiAgICAgIGl0UmV0dXJuc1RoZUZpcnN0QXZhaWxhYmxlRGV2aWNlSWZOb25lSXNQcmVmZXJyZWQoYWRtT3B0aW9ucyk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIDAgaWYgdGhhdCB3YXMgdGhlIHByZXZpb3VzIHByZWZlcnJlZCBpbmRleCAoYW5kIGEgZGV2aWNlIGlzIGF2YWlsYWJsZSknLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBmaW5kQmVzdE1hdGNoaW5nQXVkaW9EZXZpY2VJbmRleCh7XG4gICAgICAgICAgICBhdmFpbGFibGU6IFtcbiAgICAgICAgICAgICAgeyBuYW1lOiAnQScsIGluZGV4OiAxMjMsIHVuaXF1ZUlkOiAnZGV2aWNlLUEnIH0sXG4gICAgICAgICAgICAgIHsgbmFtZTogJ0InLCBpbmRleDogNDU2LCB1bmlxdWVJZDogJ2RldmljZS1CJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHByZWZlcnJlZDogeyBuYW1lOiAnQicsIGluZGV4OiAwLCB1bmlxdWVJZDogJ2RldmljZS1CJyB9LFxuICAgICAgICAgICAgLi4uYWRtT3B0aW9ucyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYSB1bmlxdWUgSUQgbWF0Y2ggaWYgaXQgZXhpc3RzIGFuZCB0aGUgcHJlZmVycmVkIGluZGV4IGlzIG5vdCAwJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VW5pcXVlSWRNYXRjaChhZG1PcHRpb25zKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhIG5hbWUgbWF0Y2ggaWYgaXQgZXhpc3RzIGFuZCB0aGUgcHJlZmVycmVkIGluZGV4IGlzIG5vdCAwJywgKCkgPT4ge1xuICAgICAgICB0ZXN0TmFtZU1hdGNoKGFkbU9wdGlvbnMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0UmV0dXJuc1RoZUZpcnN0QXZhaWxhYmxlRGV2aWNlSWZUaGVQcmVmZXJyZWREZXZpY2VJc05vdEZvdW5kKFxuICAgICAgICBhZG1PcHRpb25zXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3doZW4gZ29pbmcgXCJiYWNrd2FyZHNcIiBmcm9tIFdpbmRvd3MgQURNMiB0byB0aGUgZGVmYXVsdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFkbU9wdGlvbnMgPSB7XG4gICAgICAgIHByZXZpb3VzQXVkaW9EZXZpY2VNb2R1bGU6IEF1ZGlvRGV2aWNlTW9kdWxlLldpbmRvd3NBZG0yLFxuICAgICAgICBjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGU6IEF1ZGlvRGV2aWNlTW9kdWxlLkRlZmF1bHQsXG4gICAgICB9O1xuXG4gICAgICBpdFJldHVybnNVbmRlZmluZWRJZk5vRGV2aWNlc0FyZUF2YWlsYWJsZShhZG1PcHRpb25zKTtcblxuICAgICAgaXRSZXR1cm5zVGhlRmlyc3RBdmFpbGFibGVEZXZpY2VJZk5vbmVJc1ByZWZlcnJlZChhZG1PcHRpb25zKTtcblxuICAgICAgaXQoJ3JldHVybnMgYSB1bmlxdWUgSUQgbWF0Y2ggaWYgaXQgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VW5pcXVlSWRNYXRjaChhZG1PcHRpb25zKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhIG5hbWUgbWF0Y2ggaWYgaXQgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICB0ZXN0TmFtZU1hdGNoKGFkbU9wdGlvbnMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0UmV0dXJuc1RoZUZpcnN0QXZhaWxhYmxlRGV2aWNlSWZUaGVQcmVmZXJyZWREZXZpY2VJc05vdEZvdW5kKFxuICAgICAgICBhZG1PcHRpb25zXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGggV2luZG93cyBBRE0yJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWRtT3B0aW9ucyA9IHtcbiAgICAgICAgcHJldmlvdXNBdWRpb0RldmljZU1vZHVsZTogQXVkaW9EZXZpY2VNb2R1bGUuV2luZG93c0FkbTIsXG4gICAgICAgIGN1cnJlbnRBdWRpb0RldmljZU1vZHVsZTogQXVkaW9EZXZpY2VNb2R1bGUuV2luZG93c0FkbTIsXG4gICAgICB9O1xuXG4gICAgICBpdFJldHVybnNVbmRlZmluZWRJZk5vRGV2aWNlc0FyZUF2YWlsYWJsZShhZG1PcHRpb25zKTtcblxuICAgICAgaXRSZXR1cm5zVGhlRmlyc3RBdmFpbGFibGVEZXZpY2VJZk5vbmVJc1ByZWZlcnJlZChhZG1PcHRpb25zKTtcblxuICAgICAgWzAsIDFdLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICBpdChgcmV0dXJucyAke2luZGV4fSBpZiB0aGF0IHdhcyB0aGUgcHJldmlvdXMgcHJlZmVycmVkIGluZGV4IChhbmQgYSBkZXZpY2UgaXMgYXZhaWxhYmxlKWAsICgpID0+IHtcbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICBmaW5kQmVzdE1hdGNoaW5nQXVkaW9EZXZpY2VJbmRleCh7XG4gICAgICAgICAgICAgIGF2YWlsYWJsZTogW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ0EnLCBpbmRleDogMTIzLCB1bmlxdWVJZDogJ2RldmljZS1BJyB9LFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ0InLCBpbmRleDogNDU2LCB1bmlxdWVJZDogJ2RldmljZS1CJyB9LFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ0MnLCBpbmRleDogNzg5LCB1bmlxdWVJZDogJ2RldmljZS1DJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBwcmVmZXJyZWQ6IHsgbmFtZTogJ0MnLCBpbmRleCwgdW5pcXVlSWQ6ICdkZXZpY2UtQycgfSxcbiAgICAgICAgICAgICAgLi4uYWRtT3B0aW9ucyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcInJldHVybnMgMCBpZiB0aGUgcHJldmlvdXMgcHJlZmVycmVkIGluZGV4IHdhcyAxIGJ1dCB0aGVyZSdzIG9ubHkgMSBhdWRpbyBkZXZpY2VcIiwgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZmluZEJlc3RNYXRjaGluZ0F1ZGlvRGV2aWNlSW5kZXgoe1xuICAgICAgICAgICAgYXZhaWxhYmxlOiBbeyBuYW1lOiAnQScsIGluZGV4OiAxMjMsIHVuaXF1ZUlkOiAnZGV2aWNlLUEnIH1dLFxuICAgICAgICAgICAgcHJlZmVycmVkOiB7IG5hbWU6ICdDJywgaW5kZXg6IDEsIHVuaXF1ZUlkOiAnZGV2aWNlLUMnIH0sXG4gICAgICAgICAgICAuLi5hZG1PcHRpb25zLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIDBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhIHVuaXF1ZSBJRCBtYXRjaCBpZiBpdCBleGlzdHMgYW5kIHRoZSBwcmVmZXJyZWQgaW5kZXggaXMgbm90IDAgb3IgMScsICgpID0+IHtcbiAgICAgICAgdGVzdFVuaXF1ZUlkTWF0Y2goYWRtT3B0aW9ucyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYSBuYW1lIG1hdGNoIGlmIGl0IGV4aXN0cyBhbmQgdGhlIHByZWZlcnJlZCBpbmRleCBpcyBub3QgMCBvciAxJywgKCkgPT4ge1xuICAgICAgICB0ZXN0TmFtZU1hdGNoKGFkbU9wdGlvbnMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0UmV0dXJuc1RoZUZpcnN0QXZhaWxhYmxlRGV2aWNlSWZUaGVQcmVmZXJyZWREZXZpY2VJc05vdEZvdW5kKFxuICAgICAgICBhZG1PcHRpb25zXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFDdkIsK0JBQWtDO0FBRWxDLG9DQUFpRDtBQUVqRCxTQUFTLHVDQUF1QyxNQUFNO0FBQ3BELFdBQVMsb0NBQW9DLE1BQU07QUFNakQsVUFBTSw0Q0FBNEMsd0JBQ2hELGVBQ0c7QUFD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
