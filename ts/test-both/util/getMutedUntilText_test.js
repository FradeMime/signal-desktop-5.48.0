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
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getMutedUntilText = require("../../util/getMutedUntilText");
describe("getMutedUntilText", () => {
  const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.useFakeTimers({
      now: new Date(2e3, 3, 20, 12, 0, 0)
    });
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('returns an "always" label if passed a large number', () => {
    import_chai.assert.strictEqual((0, import_getMutedUntilText.getMutedUntilText)(Number.MAX_SAFE_INTEGER, i18n), "Muted always");
    import_chai.assert.strictEqual((0, import_getMutedUntilText.getMutedUntilText)(Infinity, i18n), "Muted always");
  });
  it("returns the time if the mute expires later today", () => {
    import_chai.assert.strictEqual((0, import_getMutedUntilText.getMutedUntilText)(new Date(2e3, 3, 20, 18, 30, 0).valueOf(), i18n), "Muted until 6:30 PM");
  });
  it("returns the date and time if the mute expires on another day", () => {
    import_chai.assert.strictEqual((0, import_getMutedUntilText.getMutedUntilText)(new Date(2e3, 3, 21, 18, 30, 0).valueOf(), i18n), "Muted until 04/21/2000, 6:30 PM");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TXV0ZWRVbnRpbFRleHRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgeyBnZXRNdXRlZFVudGlsVGV4dCB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0TXV0ZWRVbnRpbFRleHQnO1xuXG5kZXNjcmliZSgnZ2V0TXV0ZWRVbnRpbFRleHQnLCAoKSA9PiB7XG4gIGNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgIHNhbmRib3gudXNlRmFrZVRpbWVycyh7XG4gICAgICBub3c6IG5ldyBEYXRlKDIwMDAsIDMsIDIwLCAxMiwgMCwgMCksXG4gICAgfSk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGFuIFwiYWx3YXlzXCIgbGFiZWwgaWYgcGFzc2VkIGEgbGFyZ2UgbnVtYmVyJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGdldE11dGVkVW50aWxUZXh0KE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBpMThuKSxcbiAgICAgICdNdXRlZCBhbHdheXMnXG4gICAgKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0TXV0ZWRVbnRpbFRleHQoSW5maW5pdHksIGkxOG4pLCAnTXV0ZWQgYWx3YXlzJyk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSB0aW1lIGlmIHRoZSBtdXRlIGV4cGlyZXMgbGF0ZXIgdG9kYXknLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgZ2V0TXV0ZWRVbnRpbFRleHQobmV3IERhdGUoMjAwMCwgMywgMjAsIDE4LCAzMCwgMCkudmFsdWVPZigpLCBpMThuKSxcbiAgICAgICdNdXRlZCB1bnRpbCA2OjMwIFBNJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSBkYXRlIGFuZCB0aW1lIGlmIHRoZSBtdXRlIGV4cGlyZXMgb24gYW5vdGhlciBkYXknLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgZ2V0TXV0ZWRVbnRpbFRleHQobmV3IERhdGUoMjAwMCwgMywgMjEsIDE4LCAzMCwgMCkudmFsdWVPZigpLCBpMThuKSxcbiAgICAgICdNdXRlZCB1bnRpbCAwNC8yMS8yMDAwLCA2OjMwIFBNJ1xuICAgICk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwrQkFBa0M7QUFFbEMsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxRQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsY0FBVSxNQUFNLGNBQWM7QUFDOUIsWUFBUSxjQUFjO0FBQUEsTUFDcEIsS0FBSyxJQUFJLEtBQUssS0FBTSxHQUFHLElBQUksSUFBSSxHQUFHLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsWUFBVSxNQUFNO0FBQ2QsWUFBUSxRQUFRO0FBQUEsRUFDbEIsQ0FBQztBQUVELEtBQUcsc0RBQXNELE1BQU07QUFDN0QsdUJBQU8sWUFDTCxnREFBa0IsT0FBTyxrQkFBa0IsSUFBSSxHQUMvQyxjQUNGO0FBQ0EsdUJBQU8sWUFBWSxnREFBa0IsVUFBVSxJQUFJLEdBQUcsY0FBYztBQUFBLEVBQ3RFLENBQUM7QUFFRCxLQUFHLG9EQUFvRCxNQUFNO0FBQzNELHVCQUFPLFlBQ0wsZ0RBQWtCLElBQUksS0FBSyxLQUFNLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLFFBQVEsR0FBRyxJQUFJLEdBQ2xFLHFCQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxnRUFBZ0UsTUFBTTtBQUN2RSx1QkFBTyxZQUNMLGdEQUFrQixJQUFJLEtBQUssS0FBTSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxHQUNsRSxpQ0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
