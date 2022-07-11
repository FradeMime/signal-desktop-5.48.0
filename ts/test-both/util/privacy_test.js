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
var Privacy = __toESM(require("../../util/privacy"));
var import_privacy = require("../../util/privacy");
Privacy.addSensitivePath("sensitive-path");
describe("Privacy", () => {
  describe("redactPhoneNumbers", () => {
    it("should redact all phone numbers", () => {
      const text = "This is a log line with a phone number +12223334455\nand another one +13334445566";
      const actual = Privacy.redactPhoneNumbers(text);
      const expected = "This is a log line with a phone number +[REDACTED]455\nand another one +[REDACTED]566";
      import_chai.assert.equal(actual, expected);
    });
  });
  describe("redactUuids", () => {
    it("should redact all uuids", () => {
      const text = "This is a log line with a uuid 9e420799-acdf-4bf4-8dee-353d7e2096b4\nand another one IN ALL UPPERCASE 340727FB-E43A-413B-941B-AADA033B6CA3";
      const actual = Privacy.redactUuids(text);
      const expected = "This is a log line with a uuid [REDACTED]6b4\nand another one IN ALL UPPERCASE [REDACTED]CA3";
      import_chai.assert.equal(actual, expected);
    });
  });
  describe("redactGroupIds", () => {
    it("should redact all group IDs", () => {
      const text = "This is a log line with two group IDs: group(123456789)\nand group(abcdefghij)";
      const actual = Privacy.redactGroupIds(text);
      const expected = "This is a log line with two group IDs: group([REDACTED]789)\nand group([REDACTED]hij)";
      import_chai.assert.equal(actual, expected);
    });
    it("should remove newlines from redacted group IDs", () => {
      const text = "This is a log line with two group IDs: group(12345678\n9)\nand group(abc\ndefghij)";
      const actual = Privacy.redactGroupIds(text);
      const expected = "This is a log line with two group IDs: group([REDACTED]789)\nand group([REDACTED]hij)";
      import_chai.assert.equal(actual, expected);
    });
    it("should remove newlines from redacted group V2 IDs", () => {
      const text = "This is a log line with three group IDs: groupv2(abcd32341a==)\nand groupv2(abcd32341ad=) and and groupv2(abcd32341ade)";
      const actual = Privacy.redactGroupIds(text);
      const expected = "This is a log line with three group IDs: groupv2([REDACTED]41a==)\nand groupv2([REDACTED]1ad=) and and groupv2([REDACTED]ade)";
      import_chai.assert.equal(actual, expected);
    });
  });
  describe("redactAll", () => {
    it("should redact all sensitive information", () => {
      const encodedAppRootPath = import_privacy.APP_ROOT_PATH.replace(/ /g, "%20");
      const text = `This is a log line with sensitive information:
path1 ${import_privacy.APP_ROOT_PATH}/main.js
phone1 +12223334455 ipsum
group1 group(123456789) doloret
path2 file:///${encodedAppRootPath}/js/background.js.phone2 +13334445566 lorem
group2 group(abcdefghij) doloret
path3 sensitive-path/attachment.noindex
`;
      const actual = Privacy.redactAll(text);
      const expected = "This is a log line with sensitive information:\npath1 [REDACTED]/main.js\nphone1 +[REDACTED]455 ipsum\ngroup1 group([REDACTED]789) doloret\npath2 file:///[REDACTED]/js/background.js.phone2 +[REDACTED]566 lorem\ngroup2 group([REDACTED]hij) doloret\npath3 [REDACTED]/attachment.noindex\n";
      import_chai.assert.equal(actual, expected);
    });
  });
  describe("_redactPath", () => {
    it("should redact file paths", () => {
      const testPath = "/Users/meow/Library/Application Support/Signal Beta";
      const text = `This is a log line with sensitive information:
path1 ${testPath}/main.js
phone1 +12223334455 ipsum
`;
      const actual = Privacy._redactPath(testPath)(text);
      const expected = "This is a log line with sensitive information:\npath1 [REDACTED]/main.js\nphone1 +12223334455 ipsum\n";
      import_chai.assert.equal(actual, expected);
    });
    it("should redact URL-encoded paths", () => {
      const testPath = "/Users/meow/Library/Application Support/Signal Beta";
      const encodedTestPath = encodeURI(testPath);
      const text = `This is a log line with sensitive information:
path1 ${testPath}/main.js
phone1 +12223334455 ipsum
group1 group(123456789) doloret
path2 file:///${encodedTestPath}/js/background.js.`;
      const actual = Privacy._redactPath(testPath)(text);
      const expected = "This is a log line with sensitive information:\npath1 [REDACTED]/main.js\nphone1 +12223334455 ipsum\ngroup1 group(123456789) doloret\npath2 file:///[REDACTED]/js/background.js.";
      import_chai.assert.equal(actual, expected);
    });
    it("should redact stack traces with both forward and backslashes", () => {
      const testPath = "C:/Users/Meow/AppData/Local/Programs/signal-desktop-beta";
      const modifiedTestPath = "C:\\Users\\Meow\\AppData\\Local\\Programs\\signal-desktop-beta";
      const text = `This is a log line with sensitive information:
path1 ${testPath}\\main.js
phone1 +12223334455 ipsum
group1 group(123456789) doloret
path2 ${modifiedTestPath}\\js\\background.js.`;
      const actual = Privacy._redactPath(testPath)(text);
      const expected = "This is a log line with sensitive information:\npath1 [REDACTED]\\main.js\nphone1 +12223334455 ipsum\ngroup1 group(123456789) doloret\npath2 [REDACTED]\\js\\background.js.";
      import_chai.assert.equal(actual, expected);
    });
    it("should redact stack traces with escaped backslashes", () => {
      const testPath = "C:\\Users\\Meow\\AppData\\Local\\Programs\\signal-desktop-beta";
      const modifiedTestPath = "C:\\\\Users\\\\Meow\\\\AppData\\\\Local\\\\Programs\\\\signal-desktop-beta";
      const text = `This is a log line with sensitive information:
path1 ${testPath}\\main.js
phone1 +12223334455 ipsum
group1 group(123456789) doloret
path2 ${modifiedTestPath}\\js\\background.js.`;
      const actual = Privacy._redactPath(testPath)(text);
      const expected = "This is a log line with sensitive information:\npath1 [REDACTED]\\main.js\nphone1 +12223334455 ipsum\ngroup1 group(123456789) doloret\npath2 [REDACTED]\\js\\background.js.";
      import_chai.assert.equal(actual, expected);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJpdmFjeV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCAqIGFzIFByaXZhY3kgZnJvbSAnLi4vLi4vdXRpbC9wcml2YWN5JztcbmltcG9ydCB7IEFQUF9ST09UX1BBVEggfSBmcm9tICcuLi8uLi91dGlsL3ByaXZhY3knO1xuXG5Qcml2YWN5LmFkZFNlbnNpdGl2ZVBhdGgoJ3NlbnNpdGl2ZS1wYXRoJyk7XG5cbmRlc2NyaWJlKCdQcml2YWN5JywgKCkgPT4ge1xuICBkZXNjcmliZSgncmVkYWN0UGhvbmVOdW1iZXJzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmVkYWN0IGFsbCBwaG9uZSBudW1iZXJzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9XG4gICAgICAgICdUaGlzIGlzIGEgbG9nIGxpbmUgd2l0aCBhIHBob25lIG51bWJlciArMTIyMjMzMzQ0NTVcXG4nICtcbiAgICAgICAgJ2FuZCBhbm90aGVyIG9uZSArMTMzMzQ0NDU1NjYnO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBQcml2YWN5LnJlZGFjdFBob25lTnVtYmVycyh0ZXh0KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIGEgcGhvbmUgbnVtYmVyICtbUkVEQUNURURdNDU1XFxuJyArXG4gICAgICAgICdhbmQgYW5vdGhlciBvbmUgK1tSRURBQ1RFRF01NjYnO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVkYWN0VXVpZHMnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZWRhY3QgYWxsIHV1aWRzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9XG4gICAgICAgICdUaGlzIGlzIGEgbG9nIGxpbmUgd2l0aCBhIHV1aWQgOWU0MjA3OTktYWNkZi00YmY0LThkZWUtMzUzZDdlMjA5NmI0XFxuJyArXG4gICAgICAgICdhbmQgYW5vdGhlciBvbmUgSU4gQUxMIFVQUEVSQ0FTRSAzNDA3MjdGQi1FNDNBLTQxM0ItOTQxQi1BQURBMDMzQjZDQTMnO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBQcml2YWN5LnJlZGFjdFV1aWRzKHRleHQpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPVxuICAgICAgICAnVGhpcyBpcyBhIGxvZyBsaW5lIHdpdGggYSB1dWlkIFtSRURBQ1RFRF02YjRcXG4nICtcbiAgICAgICAgJ2FuZCBhbm90aGVyIG9uZSBJTiBBTEwgVVBQRVJDQVNFIFtSRURBQ1RFRF1DQTMnO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVkYWN0R3JvdXBJZHMnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZWRhY3QgYWxsIGdyb3VwIElEcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPVxuICAgICAgICAnVGhpcyBpcyBhIGxvZyBsaW5lIHdpdGggdHdvIGdyb3VwIElEczogZ3JvdXAoMTIzNDU2Nzg5KVxcbicgK1xuICAgICAgICAnYW5kIGdyb3VwKGFiY2RlZmdoaWopJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gUHJpdmFjeS5yZWRhY3RHcm91cElkcyh0ZXh0KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHR3byBncm91cCBJRHM6IGdyb3VwKFtSRURBQ1RFRF03ODkpXFxuJyArXG4gICAgICAgICdhbmQgZ3JvdXAoW1JFREFDVEVEXWhpaiknO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgbmV3bGluZXMgZnJvbSByZWRhY3RlZCBncm91cCBJRHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHR3byBncm91cCBJRHM6IGdyb3VwKDEyMzQ1Njc4XFxuOSlcXG4nICtcbiAgICAgICAgJ2FuZCBncm91cChhYmNcXG5kZWZnaGlqKSc7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IFByaXZhY3kucmVkYWN0R3JvdXBJZHModGV4dCk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICdUaGlzIGlzIGEgbG9nIGxpbmUgd2l0aCB0d28gZ3JvdXAgSURzOiBncm91cChbUkVEQUNURURdNzg5KVxcbicgK1xuICAgICAgICAnYW5kIGdyb3VwKFtSRURBQ1RFRF1oaWopJztcbiAgICAgIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVtb3ZlIG5ld2xpbmVzIGZyb20gcmVkYWN0ZWQgZ3JvdXAgVjIgSURzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9XG4gICAgICAgICdUaGlzIGlzIGEgbG9nIGxpbmUgd2l0aCB0aHJlZSBncm91cCBJRHM6IGdyb3VwdjIoYWJjZDMyMzQxYT09KVxcbicgK1xuICAgICAgICAnYW5kIGdyb3VwdjIoYWJjZDMyMzQxYWQ9KSBhbmQgYW5kIGdyb3VwdjIoYWJjZDMyMzQxYWRlKSc7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IFByaXZhY3kucmVkYWN0R3JvdXBJZHModGV4dCk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICdUaGlzIGlzIGEgbG9nIGxpbmUgd2l0aCB0aHJlZSBncm91cCBJRHM6IGdyb3VwdjIoW1JFREFDVEVEXTQxYT09KVxcbicgK1xuICAgICAgICAnYW5kIGdyb3VwdjIoW1JFREFDVEVEXTFhZD0pIGFuZCBhbmQgZ3JvdXB2MihbUkVEQUNURURdYWRlKSc7XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZWRhY3RBbGwnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZWRhY3QgYWxsIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IGVuY29kZWRBcHBSb290UGF0aCA9IEFQUF9ST09UX1BBVEgucmVwbGFjZSgvIC9nLCAnJTIwJyk7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgYHBhdGgxICR7QVBQX1JPT1RfUEFUSH0vbWFpbi5qc1xcbmAgK1xuICAgICAgICAncGhvbmUxICsxMjIyMzMzNDQ1NSBpcHN1bVxcbicgK1xuICAgICAgICAnZ3JvdXAxIGdyb3VwKDEyMzQ1Njc4OSkgZG9sb3JldFxcbicgK1xuICAgICAgICBgcGF0aDIgZmlsZTovLy8ke2VuY29kZWRBcHBSb290UGF0aH0vanMvYmFja2dyb3VuZC5qcy5gICtcbiAgICAgICAgJ3Bob25lMiArMTMzMzQ0NDU1NjYgbG9yZW1cXG4nICtcbiAgICAgICAgJ2dyb3VwMiBncm91cChhYmNkZWZnaGlqKSBkb2xvcmV0XFxuJyArXG4gICAgICAgICdwYXRoMyBzZW5zaXRpdmUtcGF0aC9hdHRhY2htZW50Lm5vaW5kZXhcXG4nO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBQcml2YWN5LnJlZGFjdEFsbCh0ZXh0KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgJ3BhdGgxIFtSRURBQ1RFRF0vbWFpbi5qc1xcbicgK1xuICAgICAgICAncGhvbmUxICtbUkVEQUNURURdNDU1IGlwc3VtXFxuJyArXG4gICAgICAgICdncm91cDEgZ3JvdXAoW1JFREFDVEVEXTc4OSkgZG9sb3JldFxcbicgK1xuICAgICAgICAncGF0aDIgZmlsZTovLy9bUkVEQUNURURdL2pzL2JhY2tncm91bmQuanMuJyArXG4gICAgICAgICdwaG9uZTIgK1tSRURBQ1RFRF01NjYgbG9yZW1cXG4nICtcbiAgICAgICAgJ2dyb3VwMiBncm91cChbUkVEQUNURURdaGlqKSBkb2xvcmV0XFxuJyArXG4gICAgICAgICdwYXRoMyBbUkVEQUNURURdL2F0dGFjaG1lbnQubm9pbmRleFxcbic7XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdfcmVkYWN0UGF0aCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlZGFjdCBmaWxlIHBhdGhzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGVzdFBhdGggPSAnL1VzZXJzL21lb3cvTGlicmFyeS9BcHBsaWNhdGlvbiBTdXBwb3J0L1NpZ25hbCBCZXRhJztcbiAgICAgIGNvbnN0IHRleHQgPVxuICAgICAgICAnVGhpcyBpcyBhIGxvZyBsaW5lIHdpdGggc2Vuc2l0aXZlIGluZm9ybWF0aW9uOlxcbicgK1xuICAgICAgICBgcGF0aDEgJHt0ZXN0UGF0aH0vbWFpbi5qc1xcbmAgK1xuICAgICAgICAncGhvbmUxICsxMjIyMzMzNDQ1NSBpcHN1bVxcbic7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IFByaXZhY3kuX3JlZGFjdFBhdGgodGVzdFBhdGgpKHRleHQpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPVxuICAgICAgICAnVGhpcyBpcyBhIGxvZyBsaW5lIHdpdGggc2Vuc2l0aXZlIGluZm9ybWF0aW9uOlxcbicgK1xuICAgICAgICAncGF0aDEgW1JFREFDVEVEXS9tYWluLmpzXFxuJyArXG4gICAgICAgICdwaG9uZTEgKzEyMjIzMzM0NDU1IGlwc3VtXFxuJztcbiAgICAgIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVkYWN0IFVSTC1lbmNvZGVkIHBhdGhzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGVzdFBhdGggPSAnL1VzZXJzL21lb3cvTGlicmFyeS9BcHBsaWNhdGlvbiBTdXBwb3J0L1NpZ25hbCBCZXRhJztcbiAgICAgIGNvbnN0IGVuY29kZWRUZXN0UGF0aCA9IGVuY29kZVVSSSh0ZXN0UGF0aCk7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgYHBhdGgxICR7dGVzdFBhdGh9L21haW4uanNcXG5gICtcbiAgICAgICAgJ3Bob25lMSArMTIyMjMzMzQ0NTUgaXBzdW1cXG4nICtcbiAgICAgICAgJ2dyb3VwMSBncm91cCgxMjM0NTY3ODkpIGRvbG9yZXRcXG4nICtcbiAgICAgICAgYHBhdGgyIGZpbGU6Ly8vJHtlbmNvZGVkVGVzdFBhdGh9L2pzL2JhY2tncm91bmQuanMuYDtcblxuICAgICAgY29uc3QgYWN0dWFsID0gUHJpdmFjeS5fcmVkYWN0UGF0aCh0ZXN0UGF0aCkodGV4dCk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICdUaGlzIGlzIGEgbG9nIGxpbmUgd2l0aCBzZW5zaXRpdmUgaW5mb3JtYXRpb246XFxuJyArXG4gICAgICAgICdwYXRoMSBbUkVEQUNURURdL21haW4uanNcXG4nICtcbiAgICAgICAgJ3Bob25lMSArMTIyMjMzMzQ0NTUgaXBzdW1cXG4nICtcbiAgICAgICAgJ2dyb3VwMSBncm91cCgxMjM0NTY3ODkpIGRvbG9yZXRcXG4nICtcbiAgICAgICAgJ3BhdGgyIGZpbGU6Ly8vW1JFREFDVEVEXS9qcy9iYWNrZ3JvdW5kLmpzLic7XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlZGFjdCBzdGFjayB0cmFjZXMgd2l0aCBib3RoIGZvcndhcmQgYW5kIGJhY2tzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGVzdFBhdGggPVxuICAgICAgICAnQzovVXNlcnMvTWVvdy9BcHBEYXRhL0xvY2FsL1Byb2dyYW1zL3NpZ25hbC1kZXNrdG9wLWJldGEnO1xuICAgICAgY29uc3QgbW9kaWZpZWRUZXN0UGF0aCA9XG4gICAgICAgICdDOlxcXFxVc2Vyc1xcXFxNZW93XFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcUHJvZ3JhbXNcXFxcc2lnbmFsLWRlc2t0b3AtYmV0YSc7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgYHBhdGgxICR7dGVzdFBhdGh9XFxcXG1haW4uanNcXG5gICtcbiAgICAgICAgJ3Bob25lMSArMTIyMjMzMzQ0NTUgaXBzdW1cXG4nICtcbiAgICAgICAgJ2dyb3VwMSBncm91cCgxMjM0NTY3ODkpIGRvbG9yZXRcXG4nICtcbiAgICAgICAgYHBhdGgyICR7bW9kaWZpZWRUZXN0UGF0aH1cXFxcanNcXFxcYmFja2dyb3VuZC5qcy5gO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBQcml2YWN5Ll9yZWRhY3RQYXRoKHRlc3RQYXRoKSh0ZXh0KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgJ3BhdGgxIFtSRURBQ1RFRF1cXFxcbWFpbi5qc1xcbicgK1xuICAgICAgICAncGhvbmUxICsxMjIyMzMzNDQ1NSBpcHN1bVxcbicgK1xuICAgICAgICAnZ3JvdXAxIGdyb3VwKDEyMzQ1Njc4OSkgZG9sb3JldFxcbicgK1xuICAgICAgICAncGF0aDIgW1JFREFDVEVEXVxcXFxqc1xcXFxiYWNrZ3JvdW5kLmpzLic7XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlZGFjdCBzdGFjayB0cmFjZXMgd2l0aCBlc2NhcGVkIGJhY2tzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGVzdFBhdGggPVxuICAgICAgICAnQzpcXFxcVXNlcnNcXFxcTWVvd1xcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFByb2dyYW1zXFxcXHNpZ25hbC1kZXNrdG9wLWJldGEnO1xuICAgICAgY29uc3QgbW9kaWZpZWRUZXN0UGF0aCA9XG4gICAgICAgICdDOlxcXFxcXFxcVXNlcnNcXFxcXFxcXE1lb3dcXFxcXFxcXEFwcERhdGFcXFxcXFxcXExvY2FsXFxcXFxcXFxQcm9ncmFtc1xcXFxcXFxcc2lnbmFsLWRlc2t0b3AtYmV0YSc7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgYHBhdGgxICR7dGVzdFBhdGh9XFxcXG1haW4uanNcXG5gICtcbiAgICAgICAgJ3Bob25lMSArMTIyMjMzMzQ0NTUgaXBzdW1cXG4nICtcbiAgICAgICAgJ2dyb3VwMSBncm91cCgxMjM0NTY3ODkpIGRvbG9yZXRcXG4nICtcbiAgICAgICAgYHBhdGgyICR7bW9kaWZpZWRUZXN0UGF0aH1cXFxcanNcXFxcYmFja2dyb3VuZC5qcy5gO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBQcml2YWN5Ll9yZWRhY3RQYXRoKHRlc3RQYXRoKSh0ZXh0KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID1cbiAgICAgICAgJ1RoaXMgaXMgYSBsb2cgbGluZSB3aXRoIHNlbnNpdGl2ZSBpbmZvcm1hdGlvbjpcXG4nICtcbiAgICAgICAgJ3BhdGgxIFtSRURBQ1RFRF1cXFxcbWFpbi5qc1xcbicgK1xuICAgICAgICAncGhvbmUxICsxMjIyMzMzNDQ1NSBpcHN1bVxcbicgK1xuICAgICAgICAnZ3JvdXAxIGdyb3VwKDEyMzQ1Njc4OSkgZG9sb3JldFxcbicgK1xuICAgICAgICAncGF0aDIgW1JFREFDVEVEXVxcXFxqc1xcXFxiYWNrZ3JvdW5kLmpzLic7XG4gICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsY0FBeUI7QUFDekIscUJBQThCO0FBRTlCLFFBQVEsaUJBQWlCLGdCQUFnQjtBQUV6QyxTQUFTLFdBQVcsTUFBTTtBQUN4QixXQUFTLHNCQUFzQixNQUFNO0FBQ25DLE9BQUcsbUNBQW1DLE1BQU07QUFDMUMsWUFBTSxPQUNKO0FBR0YsWUFBTSxTQUFTLFFBQVEsbUJBQW1CLElBQUk7QUFDOUMsWUFBTSxXQUNKO0FBRUYseUJBQU8sTUFBTSxRQUFRLFFBQVE7QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRywyQkFBMkIsTUFBTTtBQUNsQyxZQUFNLE9BQ0o7QUFHRixZQUFNLFNBQVMsUUFBUSxZQUFZLElBQUk7QUFDdkMsWUFBTSxXQUNKO0FBRUYseUJBQU8sTUFBTSxRQUFRLFFBQVE7QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxrQkFBa0IsTUFBTTtBQUMvQixPQUFHLCtCQUErQixNQUFNO0FBQ3RDLFlBQU0sT0FDSjtBQUdGLFlBQU0sU0FBUyxRQUFRLGVBQWUsSUFBSTtBQUMxQyxZQUFNLFdBQ0o7QUFFRix5QkFBTyxNQUFNLFFBQVEsUUFBUTtBQUFBLElBQy9CLENBQUM7QUFFRCxPQUFHLGtEQUFrRCxNQUFNO0FBQ3pELFlBQU0sT0FDSjtBQUdGLFlBQU0sU0FBUyxRQUFRLGVBQWUsSUFBSTtBQUMxQyxZQUFNLFdBQ0o7QUFFRix5QkFBTyxNQUFNLFFBQVEsUUFBUTtBQUFBLElBQy9CLENBQUM7QUFFRCxPQUFHLHFEQUFxRCxNQUFNO0FBQzVELFlBQU0sT0FDSjtBQUdGLFlBQU0sU0FBUyxRQUFRLGVBQWUsSUFBSTtBQUMxQyxZQUFNLFdBQ0o7QUFFRix5QkFBTyxNQUFNLFFBQVEsUUFBUTtBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGFBQWEsTUFBTTtBQUMxQixPQUFHLDJDQUEyQyxNQUFNO0FBQ2xELFlBQU0scUJBQXFCLDZCQUFjLFFBQVEsTUFBTSxLQUFLO0FBQzVELFlBQU0sT0FDSjtBQUFBLFFBQ1M7QUFBQTtBQUFBO0FBQUEsZ0JBR1E7QUFBQTtBQUFBO0FBQUE7QUFLbkIsWUFBTSxTQUFTLFFBQVEsVUFBVSxJQUFJO0FBQ3JDLFlBQU0sV0FDSjtBQVFGLHlCQUFPLE1BQU0sUUFBUSxRQUFRO0FBQUEsSUFDL0IsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsZUFBZSxNQUFNO0FBQzVCLE9BQUcsNEJBQTRCLE1BQU07QUFDbkMsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sT0FDSjtBQUFBLFFBQ1M7QUFBQTtBQUFBO0FBR1gsWUFBTSxTQUFTLFFBQVEsWUFBWSxRQUFRLEVBQUUsSUFBSTtBQUNqRCxZQUFNLFdBQ0o7QUFHRix5QkFBTyxNQUFNLFFBQVEsUUFBUTtBQUFBLElBQy9CLENBQUM7QUFFRCxPQUFHLG1DQUFtQyxNQUFNO0FBQzFDLFlBQU0sV0FBVztBQUNqQixZQUFNLGtCQUFrQixVQUFVLFFBQVE7QUFDMUMsWUFBTSxPQUNKO0FBQUEsUUFDUztBQUFBO0FBQUE7QUFBQSxnQkFHUTtBQUVuQixZQUFNLFNBQVMsUUFBUSxZQUFZLFFBQVEsRUFBRSxJQUFJO0FBQ2pELFlBQU0sV0FDSjtBQUtGLHlCQUFPLE1BQU0sUUFBUSxRQUFRO0FBQUEsSUFDL0IsQ0FBQztBQUVELE9BQUcsZ0VBQWdFLE1BQU07QUFDdkUsWUFBTSxXQUNKO0FBQ0YsWUFBTSxtQkFDSjtBQUNGLFlBQU0sT0FDSjtBQUFBLFFBQ1M7QUFBQTtBQUFBO0FBQUEsUUFHQTtBQUVYLFlBQU0sU0FBUyxRQUFRLFlBQVksUUFBUSxFQUFFLElBQUk7QUFDakQsWUFBTSxXQUNKO0FBS0YseUJBQU8sTUFBTSxRQUFRLFFBQVE7QUFBQSxJQUMvQixDQUFDO0FBRUQsT0FBRyx1REFBdUQsTUFBTTtBQUM5RCxZQUFNLFdBQ0o7QUFDRixZQUFNLG1CQUNKO0FBQ0YsWUFBTSxPQUNKO0FBQUEsUUFDUztBQUFBO0FBQUE7QUFBQSxRQUdBO0FBRVgsWUFBTSxTQUFTLFFBQVEsWUFBWSxRQUFRLEVBQUUsSUFBSTtBQUNqRCxZQUFNLFdBQ0o7QUFLRix5QkFBTyxNQUFNLFFBQVEsUUFBUTtBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
