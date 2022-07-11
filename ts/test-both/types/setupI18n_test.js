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
var import_setupI18n = require("../../util/setupI18n");
var enMessages = __toESM(require("../../../_locales/en/messages.json"));
describe("setupI18n", () => {
  let i18n;
  beforeEach(() => {
    i18n = (0, import_setupI18n.setupI18n)("en", enMessages);
  });
  describe("i18n", () => {
    it("returns empty string for unknown string", () => {
      import_chai.assert.strictEqual(i18n("random"), "");
    });
    it("returns message for given string", () => {
      import_chai.assert.strictEqual(i18n("reportIssue"), "Contact Support");
    });
    it("returns message with single substitution", () => {
      const actual = i18n("migratingToSQLCipher", ["45/200"]);
      import_chai.assert.equal(actual, "Optimizing messages... 45/200 complete.");
    });
    it("returns message with multiple substitutions", () => {
      const actual = i18n("theyChangedTheTimer", {
        name: "Someone",
        time: "5 minutes"
      });
      import_chai.assert.equal(actual, "Someone set the disappearing message time to 5 minutes.");
    });
  });
  describe("getLocale", () => {
    it("returns a string with length two or greater", () => {
      const locale = i18n.getLocale();
      import_chai.assert.isAtLeast(locale.trim().length, 2);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0dXBJMThuX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0ICogYXMgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuZGVzY3JpYmUoJ3NldHVwSTE4bicsICgpID0+IHtcbiAgbGV0IGkxOG46IExvY2FsaXplclR5cGU7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2kxOG4nLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZW1wdHkgc3RyaW5nIGZvciB1bmtub3duIHN0cmluZycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpMThuKCdyYW5kb20nKSwgJycpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2UgZm9yIGdpdmVuIHN0cmluZycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpMThuKCdyZXBvcnRJc3N1ZScpLCAnQ29udGFjdCBTdXBwb3J0Jyk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgbWVzc2FnZSB3aXRoIHNpbmdsZSBzdWJzdGl0dXRpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBpMThuKCdtaWdyYXRpbmdUb1NRTENpcGhlcicsIFsnNDUvMjAwJ10pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFjdHVhbCwgJ09wdGltaXppbmcgbWVzc2FnZXMuLi4gNDUvMjAwIGNvbXBsZXRlLicpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2Ugd2l0aCBtdWx0aXBsZSBzdWJzdGl0dXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0dWFsID0gaTE4bigndGhleUNoYW5nZWRUaGVUaW1lcicsIHtcbiAgICAgICAgbmFtZTogJ1NvbWVvbmUnLFxuICAgICAgICB0aW1lOiAnNSBtaW51dGVzJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICBhY3R1YWwsXG4gICAgICAgICdTb21lb25lIHNldCB0aGUgZGlzYXBwZWFyaW5nIG1lc3NhZ2UgdGltZSB0byA1IG1pbnV0ZXMuJ1xuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldExvY2FsZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhIHN0cmluZyB3aXRoIGxlbmd0aCB0d28gb3IgZ3JlYXRlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IGkxOG4uZ2V0TG9jYWxlKCk7XG4gICAgICBhc3NlcnQuaXNBdExlYXN0KGxvY2FsZS50cmltKCkubGVuZ3RoLCAyKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsaUJBQTRCO0FBRTVCLFNBQVMsYUFBYSxNQUFNO0FBQzFCLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixXQUFPLGdDQUFVLE1BQU0sVUFBVTtBQUFBLEVBQ25DLENBQUM7QUFFRCxXQUFTLFFBQVEsTUFBTTtBQUNyQixPQUFHLDJDQUEyQyxNQUFNO0FBQ2xELHlCQUFPLFlBQVksS0FBSyxRQUFRLEdBQUcsRUFBRTtBQUFBLElBQ3ZDLENBQUM7QUFDRCxPQUFHLG9DQUFvQyxNQUFNO0FBQzNDLHlCQUFPLFlBQVksS0FBSyxhQUFhLEdBQUcsaUJBQWlCO0FBQUEsSUFDM0QsQ0FBQztBQUNELE9BQUcsNENBQTRDLE1BQU07QUFDbkQsWUFBTSxTQUFTLEtBQUssd0JBQXdCLENBQUMsUUFBUSxDQUFDO0FBQ3RELHlCQUFPLE1BQU0sUUFBUSx5Q0FBeUM7QUFBQSxJQUNoRSxDQUFDO0FBQ0QsT0FBRywrQ0FBK0MsTUFBTTtBQUN0RCxZQUFNLFNBQVMsS0FBSyx1QkFBdUI7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUixDQUFDO0FBQ0QseUJBQU8sTUFDTCxRQUNBLHlEQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxhQUFhLE1BQU07QUFDMUIsT0FBRywrQ0FBK0MsTUFBTTtBQUN0RCxZQUFNLFNBQVMsS0FBSyxVQUFVO0FBQzlCLHlCQUFPLFVBQVUsT0FBTyxLQUFLLEVBQUUsUUFBUSxDQUFDO0FBQUEsSUFDMUMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
