var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_lodash = require("lodash");
var import_cleanDataForIpc = require("../../sql/cleanDataForIpc");
describe("cleanDataForIpc", () => {
  it("does nothing to JSON primitives", () => {
    ["", "foo bar", 0, 123, true, false, null].forEach((value) => {
      import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(value), {
        cleaned: value,
        pathsChanged: []
      });
    });
  });
  it("does nothing to undefined", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(void 0), {
      cleaned: void 0,
      pathsChanged: []
    });
  });
  it("converts BigInts to strings", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(BigInt(0)), {
      cleaned: "0",
      pathsChanged: ["root"]
    });
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(BigInt(123)), {
      cleaned: "123",
      pathsChanged: ["root"]
    });
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(BigInt(-123)), {
      cleaned: "-123",
      pathsChanged: ["root"]
    });
  });
  it("converts functions to `undefined` but does not mark them as cleaned, for backwards compatibility", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(import_lodash.noop), {
      cleaned: void 0,
      pathsChanged: []
    });
  });
  it("converts symbols to `undefined`", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(Symbol("test")), {
      cleaned: void 0,
      pathsChanged: ["root"]
    });
  });
  it("converts ArrayBuffers to `undefined`", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(new ArrayBuffer(2)), {
      cleaned: void 0,
      pathsChanged: ["root"]
    });
  });
  it("keeps Buffers in a field", () => {
    const buffer = new Uint8Array([170, 187, 204]);
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(buffer), {
      cleaned: buffer,
      pathsChanged: []
    });
  });
  it("converts valid dates to ISO strings", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(new Date(924588548e3)), {
      cleaned: "1999-04-20T06:09:08.000Z",
      pathsChanged: ["root"]
    });
  });
  it("converts invalid dates to `undefined`", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(new Date(NaN)), {
      cleaned: void 0,
      pathsChanged: ["root"]
    });
  });
  it("converts other iterables to arrays", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(new Float32Array([1, 2, 3])), {
      cleaned: [1, 2, 3],
      pathsChanged: ["root"]
    });
    function* generator() {
      yield 1;
      yield 2;
    }
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)(generator()), {
      cleaned: [1, 2],
      pathsChanged: ["root"]
    });
  });
  it("deeply cleans arrays, removing `undefined` and `null`s", () => {
    const result = (0, import_cleanDataForIpc.cleanDataForIpc)([
      12,
      Symbol("top level symbol"),
      { foo: 3, symb: Symbol("nested symbol 1") },
      [45, Symbol("nested symbol 2")],
      void 0,
      null
    ]);
    import_chai.assert.deepEqual(result.cleaned, [
      12,
      void 0,
      {
        foo: 3,
        symb: void 0
      },
      [45, void 0]
    ]);
    import_chai.assert.sameMembers(result.pathsChanged, [
      "root.1",
      "root.2.symb",
      "root.3.1",
      "root.4",
      "root.5"
    ]);
  });
  it("deeply cleans sets and converts them to arrays", () => {
    const result = (0, import_cleanDataForIpc.cleanDataForIpc)(/* @__PURE__ */ new Set([
      12,
      Symbol("top level symbol"),
      { foo: 3, symb: Symbol("nested symbol 1") },
      [45, Symbol("nested symbol 2")]
    ]));
    import_chai.assert.isArray(result.cleaned);
    import_chai.assert.sameDeepMembers(result.cleaned, [
      12,
      void 0,
      {
        foo: 3,
        symb: void 0
      },
      [45, void 0]
    ]);
    import_chai.assert.sameMembers(result.pathsChanged, [
      "root",
      "root.<iterator index 1>",
      "root.<iterator index 2>.symb",
      "root.<iterator index 3>.1"
    ]);
  });
  it("deeply cleans maps and converts them to objects", () => {
    const result = (0, import_cleanDataForIpc.cleanDataForIpc)(/* @__PURE__ */ new Map([
      ["key 1", "value"],
      [Symbol("symbol key"), "dropped"],
      ["key 2", ["foo", Symbol("nested symbol")]],
      [3, "dropped"],
      [BigInt(4), "dropped"]
    ]));
    import_chai.assert.deepEqual(result.cleaned, {
      "key 1": "value",
      "key 2": ["foo", void 0]
    });
    import_chai.assert.sameMembers(result.pathsChanged, [
      "root",
      "root.<map key Symbol(symbol key)>",
      "root.<map value at key 2>.1",
      "root.<map key 3>",
      "root.<map key 4>"
    ]);
  });
  it("calls `toNumber` when available", () => {
    import_chai.assert.deepEqual((0, import_cleanDataForIpc.cleanDataForIpc)([
      {
        toNumber() {
          return 5;
        }
      },
      {
        toNumber() {
          return Symbol("bogus");
        }
      }
    ]), {
      cleaned: [5, void 0],
      pathsChanged: ["root.1"]
    });
  });
  it("deeply cleans objects with a `null` prototype", () => {
    const value = Object.assign(/* @__PURE__ */ Object.create(null), {
      "key 1": "value",
      [Symbol("symbol key")]: "dropped",
      "key 2": ["foo", Symbol("nested symbol")]
    });
    const result = (0, import_cleanDataForIpc.cleanDataForIpc)(value);
    import_chai.assert.deepEqual(result.cleaned, {
      "key 1": "value",
      "key 2": ["foo", void 0]
    });
    import_chai.assert.sameMembers(result.pathsChanged, ["root.key 2.1"]);
  });
  it("deeply cleans objects with a prototype of `Object.prototype`", () => {
    const value = {
      "key 1": "value",
      [Symbol("symbol key")]: "dropped",
      "key 2": ["foo", Symbol("nested symbol")]
    };
    const result = (0, import_cleanDataForIpc.cleanDataForIpc)(value);
    import_chai.assert.deepEqual(result.cleaned, {
      "key 1": "value",
      "key 2": ["foo", void 0]
    });
    import_chai.assert.sameMembers(result.pathsChanged, ["root.key 2.1"]);
  });
  it("deeply cleans class instances", () => {
    class Person {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.toBeDiscarded = Symbol("to be discarded");
      }
      get name() {
        return this.getName();
      }
      getName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
    const person = new Person("Selena", "Gomez");
    const result = (0, import_cleanDataForIpc.cleanDataForIpc)(person);
    import_chai.assert.deepEqual(result.cleaned, {
      firstName: "Selena",
      lastName: "Gomez",
      toBeDiscarded: void 0
    });
    import_chai.assert.sameMembers(result.pathsChanged, ["root", "root.toBeDiscarded"]);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xlYW5EYXRhRm9ySXBjX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgY2xlYW5EYXRhRm9ySXBjIH0gZnJvbSAnLi4vLi4vc3FsL2NsZWFuRGF0YUZvcklwYyc7XG5cbmRlc2NyaWJlKCdjbGVhbkRhdGFGb3JJcGMnLCAoKSA9PiB7XG4gIGl0KCdkb2VzIG5vdGhpbmcgdG8gSlNPTiBwcmltaXRpdmVzJywgKCkgPT4ge1xuICAgIFsnJywgJ2ZvbyBiYXInLCAwLCAxMjMsIHRydWUsIGZhbHNlLCBudWxsXS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoY2xlYW5EYXRhRm9ySXBjKHZhbHVlKSwge1xuICAgICAgICBjbGVhbmVkOiB2YWx1ZSxcbiAgICAgICAgcGF0aHNDaGFuZ2VkOiBbXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3RoaW5nIHRvIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAvLyBUaG91Z2ggYHVuZGVmaW5lZGAgaXMgbm90IHRlY2huaWNhbGx5IEpTT04tc2VyaWFsaXphYmxlLCB3ZSBkb24ndCBjbGVhbiBpdCBiZWNhdXNlXG4gICAgLy8gICBpdHMga2V5IGlzIGRyb3BwZWQuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChjbGVhbkRhdGFGb3JJcGModW5kZWZpbmVkKSwge1xuICAgICAgY2xlYW5lZDogdW5kZWZpbmVkLFxuICAgICAgcGF0aHNDaGFuZ2VkOiBbXSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2NvbnZlcnRzIEJpZ0ludHMgdG8gc3RyaW5ncycsICgpID0+IHtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGNsZWFuRGF0YUZvcklwYyhCaWdJbnQoMCkpLCB7XG4gICAgICBjbGVhbmVkOiAnMCcsXG4gICAgICBwYXRoc0NoYW5nZWQ6IFsncm9vdCddLFxuICAgIH0pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoY2xlYW5EYXRhRm9ySXBjKEJpZ0ludCgxMjMpKSwge1xuICAgICAgY2xlYW5lZDogJzEyMycsXG4gICAgICBwYXRoc0NoYW5nZWQ6IFsncm9vdCddLFxuICAgIH0pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoY2xlYW5EYXRhRm9ySXBjKEJpZ0ludCgtMTIzKSksIHtcbiAgICAgIGNsZWFuZWQ6ICctMTIzJyxcbiAgICAgIHBhdGhzQ2hhbmdlZDogWydyb290J10sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdjb252ZXJ0cyBmdW5jdGlvbnMgdG8gYHVuZGVmaW5lZGAgYnV0IGRvZXMgbm90IG1hcmsgdGhlbSBhcyBjbGVhbmVkLCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHknLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChjbGVhbkRhdGFGb3JJcGMobm9vcCksIHtcbiAgICAgIGNsZWFuZWQ6IHVuZGVmaW5lZCxcbiAgICAgIHBhdGhzQ2hhbmdlZDogW10sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdjb252ZXJ0cyBzeW1ib2xzIHRvIGB1bmRlZmluZWRgJywgKCkgPT4ge1xuICAgIGFzc2VydC5kZWVwRXF1YWwoY2xlYW5EYXRhRm9ySXBjKFN5bWJvbCgndGVzdCcpKSwge1xuICAgICAgY2xlYW5lZDogdW5kZWZpbmVkLFxuICAgICAgcGF0aHNDaGFuZ2VkOiBbJ3Jvb3QnXSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2NvbnZlcnRzIEFycmF5QnVmZmVycyB0byBgdW5kZWZpbmVkYCcsICgpID0+IHtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGNsZWFuRGF0YUZvcklwYyhuZXcgQXJyYXlCdWZmZXIoMikpLCB7XG4gICAgICBjbGVhbmVkOiB1bmRlZmluZWQsXG4gICAgICBwYXRoc0NoYW5nZWQ6IFsncm9vdCddLFxuICAgIH0pO1xuICB9KTtcblxuICBpdCgna2VlcHMgQnVmZmVycyBpbiBhIGZpZWxkJywgKCkgPT4ge1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KFsweGFhLCAweGJiLCAweGNjXSk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKGNsZWFuRGF0YUZvcklwYyhidWZmZXIpLCB7XG4gICAgICBjbGVhbmVkOiBidWZmZXIsXG4gICAgICBwYXRoc0NoYW5nZWQ6IFtdLFxuICAgIH0pO1xuICB9KTtcblxuICBpdCgnY29udmVydHMgdmFsaWQgZGF0ZXMgdG8gSVNPIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChjbGVhbkRhdGFGb3JJcGMobmV3IERhdGUoOTI0NTg4NTQ4MDAwKSksIHtcbiAgICAgIGNsZWFuZWQ6ICcxOTk5LTA0LTIwVDA2OjA5OjA4LjAwMFonLFxuICAgICAgcGF0aHNDaGFuZ2VkOiBbJ3Jvb3QnXSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2NvbnZlcnRzIGludmFsaWQgZGF0ZXMgdG8gYHVuZGVmaW5lZGAnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChjbGVhbkRhdGFGb3JJcGMobmV3IERhdGUoTmFOKSksIHtcbiAgICAgIGNsZWFuZWQ6IHVuZGVmaW5lZCxcbiAgICAgIHBhdGhzQ2hhbmdlZDogWydyb290J10sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdjb252ZXJ0cyBvdGhlciBpdGVyYWJsZXMgdG8gYXJyYXlzJywgKCkgPT4ge1xuICAgIGFzc2VydC5kZWVwRXF1YWwoY2xlYW5EYXRhRm9ySXBjKG5ldyBGbG9hdDMyQXJyYXkoWzEsIDIsIDNdKSksIHtcbiAgICAgIGNsZWFuZWQ6IFsxLCAyLCAzXSxcbiAgICAgIHBhdGhzQ2hhbmdlZDogWydyb290J10sXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiogZ2VuZXJhdG9yKCkge1xuICAgICAgeWllbGQgMTtcbiAgICAgIHlpZWxkIDI7XG4gICAgfVxuICAgIGFzc2VydC5kZWVwRXF1YWwoY2xlYW5EYXRhRm9ySXBjKGdlbmVyYXRvcigpKSwge1xuICAgICAgY2xlYW5lZDogWzEsIDJdLFxuICAgICAgcGF0aHNDaGFuZ2VkOiBbJ3Jvb3QnXSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2RlZXBseSBjbGVhbnMgYXJyYXlzLCByZW1vdmluZyBgdW5kZWZpbmVkYCBhbmQgYG51bGxgcycsICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBjbGVhbkRhdGFGb3JJcGMoW1xuICAgICAgMTIsXG4gICAgICBTeW1ib2woJ3RvcCBsZXZlbCBzeW1ib2wnKSxcbiAgICAgIHsgZm9vOiAzLCBzeW1iOiBTeW1ib2woJ25lc3RlZCBzeW1ib2wgMScpIH0sXG4gICAgICBbNDUsIFN5bWJvbCgnbmVzdGVkIHN5bWJvbCAyJyldLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgbnVsbCxcbiAgICBdKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmNsZWFuZWQsIFtcbiAgICAgIDEyLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBmb286IDMsXG4gICAgICAgIHN5bWI6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICBbNDUsIHVuZGVmaW5lZF0sXG4gICAgXSk7XG4gICAgYXNzZXJ0LnNhbWVNZW1iZXJzKHJlc3VsdC5wYXRoc0NoYW5nZWQsIFtcbiAgICAgICdyb290LjEnLFxuICAgICAgJ3Jvb3QuMi5zeW1iJyxcbiAgICAgICdyb290LjMuMScsXG4gICAgICAncm9vdC40JyxcbiAgICAgICdyb290LjUnLFxuICAgIF0pO1xuICB9KTtcblxuICBpdCgnZGVlcGx5IGNsZWFucyBzZXRzIGFuZCBjb252ZXJ0cyB0aGVtIHRvIGFycmF5cycsICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBjbGVhbkRhdGFGb3JJcGMoXG4gICAgICBuZXcgU2V0KFtcbiAgICAgICAgMTIsXG4gICAgICAgIFN5bWJvbCgndG9wIGxldmVsIHN5bWJvbCcpLFxuICAgICAgICB7IGZvbzogMywgc3ltYjogU3ltYm9sKCduZXN0ZWQgc3ltYm9sIDEnKSB9LFxuICAgICAgICBbNDUsIFN5bWJvbCgnbmVzdGVkIHN5bWJvbCAyJyldLFxuICAgICAgXSlcbiAgICApO1xuXG4gICAgYXNzZXJ0LmlzQXJyYXkocmVzdWx0LmNsZWFuZWQpO1xuICAgIGFzc2VydC5zYW1lRGVlcE1lbWJlcnMocmVzdWx0LmNsZWFuZWQsIFtcbiAgICAgIDEyLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAge1xuICAgICAgICBmb286IDMsXG4gICAgICAgIHN5bWI6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICBbNDUsIHVuZGVmaW5lZF0sXG4gICAgXSk7XG4gICAgYXNzZXJ0LnNhbWVNZW1iZXJzKHJlc3VsdC5wYXRoc0NoYW5nZWQsIFtcbiAgICAgICdyb290JyxcbiAgICAgICdyb290LjxpdGVyYXRvciBpbmRleCAxPicsXG4gICAgICAncm9vdC48aXRlcmF0b3IgaW5kZXggMj4uc3ltYicsXG4gICAgICAncm9vdC48aXRlcmF0b3IgaW5kZXggMz4uMScsXG4gICAgXSk7XG4gIH0pO1xuXG4gIGl0KCdkZWVwbHkgY2xlYW5zIG1hcHMgYW5kIGNvbnZlcnRzIHRoZW0gdG8gb2JqZWN0cycsICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBjbGVhbkRhdGFGb3JJcGMoXG4gICAgICBuZXcgTWFwPHVua25vd24sIHVua25vd24+KFtcbiAgICAgICAgWydrZXkgMScsICd2YWx1ZSddLFxuICAgICAgICBbU3ltYm9sKCdzeW1ib2wga2V5JyksICdkcm9wcGVkJ10sXG4gICAgICAgIFsna2V5IDInLCBbJ2ZvbycsIFN5bWJvbCgnbmVzdGVkIHN5bWJvbCcpXV0sXG4gICAgICAgIFszLCAnZHJvcHBlZCddLFxuICAgICAgICBbQmlnSW50KDQpLCAnZHJvcHBlZCddLFxuICAgICAgXSlcbiAgICApO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY2xlYW5lZCwge1xuICAgICAgJ2tleSAxJzogJ3ZhbHVlJyxcbiAgICAgICdrZXkgMic6IFsnZm9vJywgdW5kZWZpbmVkXSxcbiAgICB9KTtcbiAgICBhc3NlcnQuc2FtZU1lbWJlcnMocmVzdWx0LnBhdGhzQ2hhbmdlZCwgW1xuICAgICAgJ3Jvb3QnLFxuICAgICAgJ3Jvb3QuPG1hcCBrZXkgU3ltYm9sKHN5bWJvbCBrZXkpPicsXG4gICAgICAncm9vdC48bWFwIHZhbHVlIGF0IGtleSAyPi4xJyxcbiAgICAgICdyb290LjxtYXAga2V5IDM+JyxcbiAgICAgICdyb290LjxtYXAga2V5IDQ+JyxcbiAgICBdKTtcbiAgfSk7XG5cbiAgaXQoJ2NhbGxzIGB0b051bWJlcmAgd2hlbiBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgIGNsZWFuRGF0YUZvcklwYyhbXG4gICAgICAgIHtcbiAgICAgICAgICB0b051bWJlcigpIHtcbiAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0b051bWJlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBTeW1ib2woJ2JvZ3VzJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0pLFxuICAgICAge1xuICAgICAgICBjbGVhbmVkOiBbNSwgdW5kZWZpbmVkXSxcbiAgICAgICAgcGF0aHNDaGFuZ2VkOiBbJ3Jvb3QuMSddLFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdkZWVwbHkgY2xlYW5zIG9iamVjdHMgd2l0aCBhIGBudWxsYCBwcm90b3R5cGUnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIHtcbiAgICAgICdrZXkgMSc6ICd2YWx1ZScsXG4gICAgICBbU3ltYm9sKCdzeW1ib2wga2V5JyldOiAnZHJvcHBlZCcsXG4gICAgICAna2V5IDInOiBbJ2ZvbycsIFN5bWJvbCgnbmVzdGVkIHN5bWJvbCcpXSxcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSBjbGVhbkRhdGFGb3JJcGModmFsdWUpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY2xlYW5lZCwge1xuICAgICAgJ2tleSAxJzogJ3ZhbHVlJyxcbiAgICAgICdrZXkgMic6IFsnZm9vJywgdW5kZWZpbmVkXSxcbiAgICB9KTtcbiAgICBhc3NlcnQuc2FtZU1lbWJlcnMocmVzdWx0LnBhdGhzQ2hhbmdlZCwgWydyb290LmtleSAyLjEnXSk7XG4gIH0pO1xuXG4gIGl0KCdkZWVwbHkgY2xlYW5zIG9iamVjdHMgd2l0aCBhIHByb3RvdHlwZSBvZiBgT2JqZWN0LnByb3RvdHlwZWAnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICAna2V5IDEnOiAndmFsdWUnLFxuICAgICAgW1N5bWJvbCgnc3ltYm9sIGtleScpXTogJ2Ryb3BwZWQnLFxuICAgICAgJ2tleSAyJzogWydmb28nLCBTeW1ib2woJ25lc3RlZCBzeW1ib2wnKV0sXG4gICAgfTtcbiAgICBjb25zdCByZXN1bHQgPSBjbGVhbkRhdGFGb3JJcGModmFsdWUpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY2xlYW5lZCwge1xuICAgICAgJ2tleSAxJzogJ3ZhbHVlJyxcbiAgICAgICdrZXkgMic6IFsnZm9vJywgdW5kZWZpbmVkXSxcbiAgICB9KTtcbiAgICBhc3NlcnQuc2FtZU1lbWJlcnMocmVzdWx0LnBhdGhzQ2hhbmdlZCwgWydyb290LmtleSAyLjEnXSk7XG4gIH0pO1xuXG4gIGl0KCdkZWVwbHkgY2xlYW5zIGNsYXNzIGluc3RhbmNlcycsICgpID0+IHtcbiAgICBjbGFzcyBQZXJzb24ge1xuICAgICAgcHVibGljIHRvQmVEaXNjYXJkZWQgPSBTeW1ib2woJ3RvIGJlIGRpc2NhcmRlZCcpO1xuXG4gICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlyc3ROYW1lOiBzdHJpbmcsIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nKSB7fVxuXG4gICAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmFtZSgpO1xuICAgICAgfVxuXG4gICAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwZXJzb24gPSBuZXcgUGVyc29uKCdTZWxlbmEnLCAnR29tZXonKTtcbiAgICBjb25zdCByZXN1bHQgPSBjbGVhbkRhdGFGb3JJcGMocGVyc29uKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmNsZWFuZWQsIHtcbiAgICAgIGZpcnN0TmFtZTogJ1NlbGVuYScsXG4gICAgICBsYXN0TmFtZTogJ0dvbWV6JyxcbiAgICAgIHRvQmVEaXNjYXJkZWQ6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgICBhc3NlcnQuc2FtZU1lbWJlcnMocmVzdWx0LnBhdGhzQ2hhbmdlZCwgWydyb290JywgJ3Jvb3QudG9CZURpc2NhcmRlZCddKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBQ3ZCLG9CQUFxQjtBQUVyQiw2QkFBZ0M7QUFFaEMsU0FBUyxtQkFBbUIsTUFBTTtBQUNoQyxLQUFHLG1DQUFtQyxNQUFNO0FBQzFDLEtBQUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxNQUFNLE9BQU8sSUFBSSxFQUFFLFFBQVEsV0FBUztBQUMxRCx5QkFBTyxVQUFVLDRDQUFnQixLQUFLLEdBQUc7QUFBQSxRQUN2QyxTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUM7QUFBQSxNQUNqQixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyw2QkFBNkIsTUFBTTtBQUdwQyx1QkFBTyxVQUFVLDRDQUFnQixNQUFTLEdBQUc7QUFBQSxNQUMzQyxTQUFTO0FBQUEsTUFDVCxjQUFjLENBQUM7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRywrQkFBK0IsTUFBTTtBQUN0Qyx1QkFBTyxVQUFVLDRDQUFnQixPQUFPLENBQUMsQ0FBQyxHQUFHO0FBQUEsTUFDM0MsU0FBUztBQUFBLE1BQ1QsY0FBYyxDQUFDLE1BQU07QUFBQSxJQUN2QixDQUFDO0FBQ0QsdUJBQU8sVUFBVSw0Q0FBZ0IsT0FBTyxHQUFHLENBQUMsR0FBRztBQUFBLE1BQzdDLFNBQVM7QUFBQSxNQUNULGNBQWMsQ0FBQyxNQUFNO0FBQUEsSUFDdkIsQ0FBQztBQUNELHVCQUFPLFVBQVUsNENBQWdCLE9BQU8sSUFBSSxDQUFDLEdBQUc7QUFBQSxNQUM5QyxTQUFTO0FBQUEsTUFDVCxjQUFjLENBQUMsTUFBTTtBQUFBLElBQ3ZCLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxLQUFHLG9HQUFvRyxNQUFNO0FBQzNHLHVCQUFPLFVBQVUsNENBQWdCLGtCQUFJLEdBQUc7QUFBQSxNQUN0QyxTQUFTO0FBQUEsTUFDVCxjQUFjLENBQUM7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyxtQ0FBbUMsTUFBTTtBQUMxQyx1QkFBTyxVQUFVLDRDQUFnQixPQUFPLE1BQU0sQ0FBQyxHQUFHO0FBQUEsTUFDaEQsU0FBUztBQUFBLE1BQ1QsY0FBYyxDQUFDLE1BQU07QUFBQSxJQUN2QixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyx3Q0FBd0MsTUFBTTtBQUMvQyx1QkFBTyxVQUFVLDRDQUFnQixJQUFJLFlBQVksQ0FBQyxDQUFDLEdBQUc7QUFBQSxNQUNwRCxTQUFTO0FBQUEsTUFDVCxjQUFjLENBQUMsTUFBTTtBQUFBLElBQ3ZCLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxLQUFHLDRCQUE0QixNQUFNO0FBQ25DLFVBQU0sU0FBUyxJQUFJLFdBQVcsQ0FBQyxLQUFNLEtBQU0sR0FBSSxDQUFDO0FBRWhELHVCQUFPLFVBQVUsNENBQWdCLE1BQU0sR0FBRztBQUFBLE1BQ3hDLFNBQVM7QUFBQSxNQUNULGNBQWMsQ0FBQztBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxLQUFHLHVDQUF1QyxNQUFNO0FBQzlDLHVCQUFPLFVBQVUsNENBQWdCLElBQUksS0FBSyxXQUFZLENBQUMsR0FBRztBQUFBLE1BQ3hELFNBQVM7QUFBQSxNQUNULGNBQWMsQ0FBQyxNQUFNO0FBQUEsSUFDdkIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELEtBQUcseUNBQXlDLE1BQU07QUFDaEQsdUJBQU8sVUFBVSw0Q0FBZ0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHO0FBQUEsTUFDL0MsU0FBUztBQUFBLE1BQ1QsY0FBYyxDQUFDLE1BQU07QUFBQSxJQUN2QixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyxzQ0FBc0MsTUFBTTtBQUM3Qyx1QkFBTyxVQUFVLDRDQUFnQixJQUFJLGFBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUFBLE1BQzdELFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ2pCLGNBQWMsQ0FBQyxNQUFNO0FBQUEsSUFDdkIsQ0FBQztBQUVELDBCQUFzQjtBQUNwQixZQUFNO0FBQ04sWUFBTTtBQUFBLElBQ1I7QUFIVSxBQUlWLHVCQUFPLFVBQVUsNENBQWdCLFVBQVUsQ0FBQyxHQUFHO0FBQUEsTUFDN0MsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUFBLE1BQ2QsY0FBYyxDQUFDLE1BQU07QUFBQSxJQUN2QixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRywwREFBMEQsTUFBTTtBQUNqRSxVQUFNLFNBQVMsNENBQWdCO0FBQUEsTUFDN0I7QUFBQSxNQUNBLE9BQU8sa0JBQWtCO0FBQUEsTUFDekIsRUFBRSxLQUFLLEdBQUcsTUFBTSxPQUFPLGlCQUFpQixFQUFFO0FBQUEsTUFDMUMsQ0FBQyxJQUFJLE9BQU8saUJBQWlCLENBQUM7QUFBQSxNQUM5QjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCx1QkFBTyxVQUFVLE9BQU8sU0FBUztBQUFBLE1BQy9CO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxDQUFDLElBQUksTUFBUztBQUFBLElBQ2hCLENBQUM7QUFDRCx1QkFBTyxZQUFZLE9BQU8sY0FBYztBQUFBLE1BQ3RDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELEtBQUcsa0RBQWtELE1BQU07QUFDekQsVUFBTSxTQUFTLDRDQUNiLG9CQUFJLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxPQUFPLGtCQUFrQjtBQUFBLE1BQ3pCLEVBQUUsS0FBSyxHQUFHLE1BQU0sT0FBTyxpQkFBaUIsRUFBRTtBQUFBLE1BQzFDLENBQUMsSUFBSSxPQUFPLGlCQUFpQixDQUFDO0FBQUEsSUFDaEMsQ0FBQyxDQUNIO0FBRUEsdUJBQU8sUUFBUSxPQUFPLE9BQU87QUFDN0IsdUJBQU8sZ0JBQWdCLE9BQU8sU0FBUztBQUFBLE1BQ3JDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxDQUFDLElBQUksTUFBUztBQUFBLElBQ2hCLENBQUM7QUFDRCx1QkFBTyxZQUFZLE9BQU8sY0FBYztBQUFBLE1BQ3RDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyxtREFBbUQsTUFBTTtBQUMxRCxVQUFNLFNBQVMsNENBQ2Isb0JBQUksSUFBc0I7QUFBQSxNQUN4QixDQUFDLFNBQVMsT0FBTztBQUFBLE1BQ2pCLENBQUMsT0FBTyxZQUFZLEdBQUcsU0FBUztBQUFBLE1BQ2hDLENBQUMsU0FBUyxDQUFDLE9BQU8sT0FBTyxlQUFlLENBQUMsQ0FBQztBQUFBLE1BQzFDLENBQUMsR0FBRyxTQUFTO0FBQUEsTUFDYixDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVM7QUFBQSxJQUN2QixDQUFDLENBQ0g7QUFFQSx1QkFBTyxVQUFVLE9BQU8sU0FBUztBQUFBLE1BQy9CLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLE1BQVM7QUFBQSxJQUM1QixDQUFDO0FBQ0QsdUJBQU8sWUFBWSxPQUFPLGNBQWM7QUFBQSxNQUN0QztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxLQUFHLG1DQUFtQyxNQUFNO0FBQzFDLHVCQUFPLFVBQ0wsNENBQWdCO0FBQUEsTUFDZDtBQUFBLFFBQ0UsV0FBVztBQUNULGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxXQUFXO0FBQ1QsaUJBQU8sT0FBTyxPQUFPO0FBQUEsUUFDdkI7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDLEdBQ0Q7QUFBQSxNQUNFLFNBQVMsQ0FBQyxHQUFHLE1BQVM7QUFBQSxNQUN0QixjQUFjLENBQUMsUUFBUTtBQUFBLElBQ3pCLENBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLGlEQUFpRCxNQUFNO0FBQ3hELFVBQU0sUUFBUSxPQUFPLE9BQU8sdUJBQU8sT0FBTyxJQUFJLEdBQUc7QUFBQSxNQUMvQyxTQUFTO0FBQUEsT0FDUixPQUFPLFlBQVksSUFBSTtBQUFBLE1BQ3hCLFNBQVMsQ0FBQyxPQUFPLE9BQU8sZUFBZSxDQUFDO0FBQUEsSUFDMUMsQ0FBQztBQUNELFVBQU0sU0FBUyw0Q0FBZ0IsS0FBSztBQUVwQyx1QkFBTyxVQUFVLE9BQU8sU0FBUztBQUFBLE1BQy9CLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLE1BQVM7QUFBQSxJQUM1QixDQUFDO0FBQ0QsdUJBQU8sWUFBWSxPQUFPLGNBQWMsQ0FBQyxjQUFjLENBQUM7QUFBQSxFQUMxRCxDQUFDO0FBRUQsS0FBRyxnRUFBZ0UsTUFBTTtBQUN2RSxVQUFNLFFBQVE7QUFBQSxNQUNaLFNBQVM7QUFBQSxPQUNSLE9BQU8sWUFBWSxJQUFJO0FBQUEsTUFDeEIsU0FBUyxDQUFDLE9BQU8sT0FBTyxlQUFlLENBQUM7QUFBQSxJQUMxQztBQUNBLFVBQU0sU0FBUyw0Q0FBZ0IsS0FBSztBQUVwQyx1QkFBTyxVQUFVLE9BQU8sU0FBUztBQUFBLE1BQy9CLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLE1BQVM7QUFBQSxJQUM1QixDQUFDO0FBQ0QsdUJBQU8sWUFBWSxPQUFPLGNBQWMsQ0FBQyxjQUFjLENBQUM7QUFBQSxFQUMxRCxDQUFDO0FBRUQsS0FBRyxpQ0FBaUMsTUFBTTtBQUN4QyxVQUFNLE9BQU87QUFBQSxNQUdYLFlBQW1CLFdBQTBCLFVBQWtCO0FBQTVDO0FBQTBCO0FBRnRDLDZCQUFnQixPQUFPLGlCQUFpQjtBQUFBLE1BRWlCO0FBQUEsVUFFNUQsT0FBTztBQUNULGVBQU8sS0FBSyxRQUFRO0FBQUEsTUFDdEI7QUFBQSxNQUVBLFVBQVU7QUFDUixlQUFPLEdBQUcsS0FBSyxhQUFhLEtBQUs7QUFBQSxNQUNuQztBQUFBLElBQ0Y7QUFaQSxBQWFBLFVBQU0sU0FBUyxJQUFJLE9BQU8sVUFBVSxPQUFPO0FBQzNDLFVBQU0sU0FBUyw0Q0FBZ0IsTUFBTTtBQUVyQyx1QkFBTyxVQUFVLE9BQU8sU0FBUztBQUFBLE1BQy9CLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxNQUNWLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQ0QsdUJBQU8sWUFBWSxPQUFPLGNBQWMsQ0FBQyxRQUFRLG9CQUFvQixDQUFDO0FBQUEsRUFDeEUsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
