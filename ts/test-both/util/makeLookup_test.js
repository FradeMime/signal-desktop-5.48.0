var import_chai = require("chai");
var import_makeLookup = require("../../util/makeLookup");
describe("makeLookup", () => {
  it("returns an empty object if passed an empty array", () => {
    const result = (0, import_makeLookup.makeLookup)([], "foo");
    import_chai.assert.deepEqual(result, {});
  });
  it("returns an object that lets you look up objects by string key", () => {
    const arr = [{ foo: "bar" }, { foo: "baz" }, { foo: "qux" }];
    const result = (0, import_makeLookup.makeLookup)(arr, "foo");
    import_chai.assert.hasAllKeys(result, ["bar", "baz", "qux"]);
    import_chai.assert.strictEqual(result.bar, arr[0]);
    import_chai.assert.strictEqual(result.baz, arr[1]);
    import_chai.assert.strictEqual(result.qux, arr[2]);
  });
  it("if there are duplicates, the last one wins", () => {
    const arr = [
      { foo: "bar", first: true },
      { foo: "bar", first: false }
    ];
    const result = (0, import_makeLookup.makeLookup)(arr, "foo");
    import_chai.assert.deepEqual(result, {
      bar: { foo: "bar", first: false }
    });
  });
  it("ignores undefined properties", () => {
    const arr = [{}, { foo: void 0 }];
    const result = (0, import_makeLookup.makeLookup)(arr, "foo");
    import_chai.assert.deepEqual(result, {});
  });
  it("allows key of 0", () => {
    const arr = [{}, { id: 0 }, { id: 1 }, { id: 2 }];
    const result = (0, import_makeLookup.makeLookup)(arr, "id");
    import_chai.assert.deepEqual(result, {
      0: { id: 0 },
      1: { id: 1 },
      2: { id: 2 }
    });
  });
  it("converts the lookup to a string", () => {
    const arr = [
      { foo: "bar" },
      { foo: 123 },
      { foo: {} },
      {
        foo: {
          toString() {
            return "baz";
          }
        }
      },
      {}
    ];
    const result = (0, import_makeLookup.makeLookup)(arr, "foo");
    import_chai.assert.hasAllKeys(result, ["bar", "123", "[object Object]", "baz"]);
    import_chai.assert.strictEqual(result.bar, arr[0]);
    import_chai.assert.strictEqual(result["123"], arr[1]);
    import_chai.assert.strictEqual(result["[object Object]"], arr[2]);
    import_chai.assert.strictEqual(result.baz, arr[3]);
  });
  it("looks up own and inherited properties", () => {
    const prototype = { foo: "baz" };
    const arr = [{ foo: "bar" }, Object.create(prototype)];
    const result = (0, import_makeLookup.makeLookup)(arr, "foo");
    import_chai.assert.strictEqual(result.bar, arr[0]);
    import_chai.assert.strictEqual(result.baz, arr[1]);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFrZUxvb2t1cF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgbWFrZUxvb2t1cCB9IGZyb20gJy4uLy4uL3V0aWwvbWFrZUxvb2t1cCc7XG5cbmRlc2NyaWJlKCdtYWtlTG9va3VwJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBhbiBlbXB0eSBvYmplY3QgaWYgcGFzc2VkIGFuIGVtcHR5IGFycmF5JywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG1ha2VMb29rdXAoW10sICdmb28nKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCB7fSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGFuIG9iamVjdCB0aGF0IGxldHMgeW91IGxvb2sgdXAgb2JqZWN0cyBieSBzdHJpbmcga2V5JywgKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFt7IGZvbzogJ2JhcicgfSwgeyBmb286ICdiYXonIH0sIHsgZm9vOiAncXV4JyB9XTtcbiAgICBjb25zdCByZXN1bHQgPSBtYWtlTG9va3VwKGFyciwgJ2ZvbycpO1xuXG4gICAgYXNzZXJ0Lmhhc0FsbEtleXMocmVzdWx0LCBbJ2JhcicsICdiYXonLCAncXV4J10pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQuYmFyLCBhcnJbMF0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQuYmF6LCBhcnJbMV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQucXV4LCBhcnJbMl0pO1xuICB9KTtcblxuICBpdCgnaWYgdGhlcmUgYXJlIGR1cGxpY2F0ZXMsIHRoZSBsYXN0IG9uZSB3aW5zJywgKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtcbiAgICAgIHsgZm9vOiAnYmFyJywgZmlyc3Q6IHRydWUgfSxcbiAgICAgIHsgZm9vOiAnYmFyJywgZmlyc3Q6IGZhbHNlIH0sXG4gICAgXTtcbiAgICBjb25zdCByZXN1bHQgPSBtYWtlTG9va3VwKGFyciwgJ2ZvbycpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIHtcbiAgICAgIGJhcjogeyBmb286ICdiYXInLCBmaXJzdDogZmFsc2UgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2lnbm9yZXMgdW5kZWZpbmVkIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW3t9LCB7IGZvbzogdW5kZWZpbmVkIH1dO1xuICAgIGNvbnN0IHJlc3VsdCA9IG1ha2VMb29rdXAoYXJyLCAnZm9vJyk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwge30pO1xuICB9KTtcblxuICBpdCgnYWxsb3dzIGtleSBvZiAwJywgKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFt7fSwgeyBpZDogMCB9LCB7IGlkOiAxIH0sIHsgaWQ6IDIgfV07XG4gICAgY29uc3QgcmVzdWx0ID0gbWFrZUxvb2t1cChhcnIsICdpZCcpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIHtcbiAgICAgIDA6IHsgaWQ6IDAgfSxcbiAgICAgIDE6IHsgaWQ6IDEgfSxcbiAgICAgIDI6IHsgaWQ6IDIgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ2NvbnZlcnRzIHRoZSBsb29rdXAgdG8gYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW1xuICAgICAgeyBmb286ICdiYXInIH0sXG4gICAgICB7IGZvbzogMTIzIH0sXG4gICAgICB7IGZvbzoge30gfSxcbiAgICAgIHtcbiAgICAgICAgZm9vOiB7XG4gICAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Jheic7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7fSxcbiAgICBdO1xuICAgIGNvbnN0IHJlc3VsdCA9IG1ha2VMb29rdXAoYXJyLCAnZm9vJyk7XG5cbiAgICBhc3NlcnQuaGFzQWxsS2V5cyhyZXN1bHQsIFsnYmFyJywgJzEyMycsICdbb2JqZWN0IE9iamVjdF0nLCAnYmF6J10pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQuYmFyLCBhcnJbMF0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRbJzEyMyddLCBhcnJbMV0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRbJ1tvYmplY3QgT2JqZWN0XSddLCBhcnJbMl0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQuYmF6LCBhcnJbM10pO1xuICB9KTtcblxuICBpdCgnbG9va3MgdXAgb3duIGFuZCBpbmhlcml0ZWQgcHJvcGVydGllcycsICgpID0+IHtcbiAgICBjb25zdCBwcm90b3R5cGUgPSB7IGZvbzogJ2JheicgfTtcblxuICAgIGNvbnN0IGFyciA9IFt7IGZvbzogJ2JhcicgfSwgT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpXTtcbiAgICBjb25zdCByZXN1bHQgPSBtYWtlTG9va3VwKGFyciwgJ2ZvbycpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdC5iYXIsIGFyclswXSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdC5iYXosIGFyclsxXSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFDdkIsd0JBQTJCO0FBRTNCLFNBQVMsY0FBYyxNQUFNO0FBQzNCLEtBQUcsb0RBQW9ELE1BQU07QUFDM0QsVUFBTSxTQUFTLGtDQUFXLENBQUMsR0FBRyxLQUFLO0FBRW5DLHVCQUFPLFVBQVUsUUFBUSxDQUFDLENBQUM7QUFBQSxFQUM3QixDQUFDO0FBRUQsS0FBRyxpRUFBaUUsTUFBTTtBQUN4RSxVQUFNLE1BQU0sQ0FBQyxFQUFFLEtBQUssTUFBTSxHQUFHLEVBQUUsS0FBSyxNQUFNLEdB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
