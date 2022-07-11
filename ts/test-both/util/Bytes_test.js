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
var Bytes = __toESM(require("../../Bytes"));
describe("Bytes", () => {
  it("converts to base64 and back", () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const base64 = Bytes.toBase64(bytes);
    import_chai.assert.strictEqual(base64, "AQID");
    import_chai.assert.deepEqual(Bytes.fromBase64(base64), bytes);
  });
  it("converts to hex and back", () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const hex = Bytes.toHex(bytes);
    import_chai.assert.strictEqual(hex, "010203");
    import_chai.assert.deepEqual(Bytes.fromHex(hex), bytes);
  });
  it("converts to string and back", () => {
    const bytes = new Uint8Array([97, 98, 99]);
    const binary = Bytes.toString(bytes);
    import_chai.assert.strictEqual(binary, "abc");
    import_chai.assert.deepEqual(Bytes.fromString(binary), bytes);
  });
  it("converts to binary and back", () => {
    const bytes = new Uint8Array([255, 1]);
    const binary = Bytes.toBinary(bytes);
    import_chai.assert.strictEqual(binary, "\xFF");
    import_chai.assert.deepEqual(Bytes.fromBinary(binary), bytes);
  });
  it("concatenates bytes", () => {
    const result = Bytes.concatenate([
      Bytes.fromString("hello"),
      Bytes.fromString(" "),
      Bytes.fromString("world")
    ]);
    import_chai.assert.strictEqual(Bytes.toString(result), "hello world");
  });
  describe("isEmpty", () => {
    it("returns true for `undefined`", () => {
      import_chai.assert.strictEqual(Bytes.isEmpty(void 0), true);
    });
    it("returns true for `null`", () => {
      import_chai.assert.strictEqual(Bytes.isEmpty(null), true);
    });
    it("returns true for an empty Uint8Array", () => {
      import_chai.assert.strictEqual(Bytes.isEmpty(new Uint8Array(0)), true);
    });
    it("returns false for not empty Uint8Array", () => {
      import_chai.assert.strictEqual(Bytes.isEmpty(new Uint8Array(123)), false);
    });
  });
  describe("isNotEmpty", () => {
    it("returns false for `undefined`", () => {
      import_chai.assert.strictEqual(Bytes.isNotEmpty(void 0), false);
    });
    it("returns false for `null`", () => {
      import_chai.assert.strictEqual(Bytes.isNotEmpty(null), false);
    });
    it("returns false for an empty Uint8Array", () => {
      import_chai.assert.strictEqual(Bytes.isNotEmpty(new Uint8Array(0)), false);
    });
    it("returns true for not empty Uint8Array", () => {
      import_chai.assert.strictEqual(Bytes.isNotEmpty(new Uint8Array(123)), true);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQnl0ZXNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vLi4vQnl0ZXMnO1xuXG5kZXNjcmliZSgnQnl0ZXMnLCAoKSA9PiB7XG4gIGl0KCdjb252ZXJ0cyB0byBiYXNlNjQgYW5kIGJhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShbMSwgMiwgM10pO1xuXG4gICAgY29uc3QgYmFzZTY0ID0gQnl0ZXMudG9CYXNlNjQoYnl0ZXMpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiYXNlNjQsICdBUUlEJyk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKEJ5dGVzLmZyb21CYXNlNjQoYmFzZTY0KSwgYnl0ZXMpO1xuICB9KTtcblxuICBpdCgnY29udmVydHMgdG8gaGV4IGFuZCBiYWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKTtcblxuICAgIGNvbnN0IGhleCA9IEJ5dGVzLnRvSGV4KGJ5dGVzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaGV4LCAnMDEwMjAzJyk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKEJ5dGVzLmZyb21IZXgoaGV4KSwgYnl0ZXMpO1xuICB9KTtcblxuICBpdCgnY29udmVydHMgdG8gc3RyaW5nIGFuZCBiYWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoWzB4NjEsIDB4NjIsIDB4NjNdKTtcblxuICAgIGNvbnN0IGJpbmFyeSA9IEJ5dGVzLnRvU3RyaW5nKGJ5dGVzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYmluYXJ5LCAnYWJjJyk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKEJ5dGVzLmZyb21TdHJpbmcoYmluYXJ5KSwgYnl0ZXMpO1xuICB9KTtcblxuICBpdCgnY29udmVydHMgdG8gYmluYXJ5IGFuZCBiYWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoWzB4ZmYsIDB4MDFdKTtcblxuICAgIGNvbnN0IGJpbmFyeSA9IEJ5dGVzLnRvQmluYXJ5KGJ5dGVzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYmluYXJ5LCAnXFx4ZmZcXHgwMScpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChCeXRlcy5mcm9tQmluYXJ5KGJpbmFyeSksIGJ5dGVzKTtcbiAgfSk7XG5cbiAgaXQoJ2NvbmNhdGVuYXRlcyBieXRlcycsICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBCeXRlcy5jb25jYXRlbmF0ZShbXG4gICAgICBCeXRlcy5mcm9tU3RyaW5nKCdoZWxsbycpLFxuICAgICAgQnl0ZXMuZnJvbVN0cmluZygnICcpLFxuICAgICAgQnl0ZXMuZnJvbVN0cmluZygnd29ybGQnKSxcbiAgICBdKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChCeXRlcy50b1N0cmluZyhyZXN1bHQpLCAnaGVsbG8gd29ybGQnKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzRW1wdHknLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYHVuZGVmaW5lZGAnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnl0ZXMuaXNFbXB0eSh1bmRlZmluZWQpLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGBudWxsYCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChCeXRlcy5pc0VtcHR5KG51bGwpLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFuIGVtcHR5IFVpbnQ4QXJyYXknLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnl0ZXMuaXNFbXB0eShuZXcgVWludDhBcnJheSgwKSksIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vdCBlbXB0eSBVaW50OEFycmF5JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKEJ5dGVzLmlzRW1wdHkobmV3IFVpbnQ4QXJyYXkoMTIzKSksIGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzTm90RW1wdHknLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGB1bmRlZmluZWRgJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKEJ5dGVzLmlzTm90RW1wdHkodW5kZWZpbmVkKSwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGBudWxsYCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChCeXRlcy5pc05vdEVtcHR5KG51bGwpLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYW4gZW1wdHkgVWludDhBcnJheScsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChCeXRlcy5pc05vdEVtcHR5KG5ldyBVaW50OEFycmF5KDApKSwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3Igbm90IGVtcHR5IFVpbnQ4QXJyYXknLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnl0ZXMuaXNOb3RFbXB0eShuZXcgVWludDhBcnJheSgxMjMpKSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsWUFBdUI7QUFFdkIsU0FBUyxTQUFTLE1BQU07QUFDdEIsS0FBRywrQkFBK0IsTUFBTTtBQUN0QyxV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
