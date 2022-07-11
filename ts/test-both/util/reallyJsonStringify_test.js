var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_reallyJsonStringify = require("../../util/reallyJsonStringify");
describe("reallyJsonStringify", () => {
  it("returns the same thing as JSON.stringify when JSON.stringify returns a string", () => {
    [
      null,
      true,
      false,
      0,
      -0,
      123,
      -Infinity,
      Infinity,
      NaN,
      "",
      "foo",
      [],
      [1],
      {},
      { hi: 5 },
      new Date(),
      /* @__PURE__ */ new Set([1, 2, 3]),
      /* @__PURE__ */ new Map([["foo", "bar"]]),
      Promise.resolve(123),
      {
        toJSON() {
          return "foo";
        }
      }
    ].forEach((value) => {
      const expected = JSON.stringify(value);
      const actual = (0, import_reallyJsonStringify.reallyJsonStringify)(value);
      import_chai.assert.strictEqual(actual, expected);
      import_chai.assert.isString(actual);
    });
  });
  it("returns a string when JSON.stringify returns undefined", () => {
    const check = /* @__PURE__ */ __name((value, expected) => {
      const actual = (0, import_reallyJsonStringify.reallyJsonStringify)(value);
      import_chai.assert.strictEqual(actual, expected);
      import_chai.assert.isUndefined(JSON.stringify(value));
    }, "check");
    check(void 0, "[object Undefined]");
    check(Symbol("foo"), "[object Symbol]");
    check({
      toJSON() {
        return void 0;
      }
    }, "[object Object]");
  });
  it("returns a string when JSON.stringify would error", () => {
    const check = /* @__PURE__ */ __name((value, expected) => {
      const actual = (0, import_reallyJsonStringify.reallyJsonStringify)(value);
      import_chai.assert.strictEqual(actual, expected);
      import_chai.assert.throws(() => JSON.stringify(value));
    }, "check");
    check(BigInt(123), "[object BigInt]");
    const a = {};
    const b = { a };
    a.b = b;
    check(a, "[object Object]");
    check([a], "[object Array]");
    const bad = {
      toJSON() {
        throw new Error("don't even try to stringify me");
      }
    };
    check(bad, "[object Object]");
    check([bad], "[object Array]");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhbGx5SnNvblN0cmluZ2lmeV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgcmVhbGx5SnNvblN0cmluZ2lmeSB9IGZyb20gJy4uLy4uL3V0aWwvcmVhbGx5SnNvblN0cmluZ2lmeSc7XG5cbmRlc2NyaWJlKCdyZWFsbHlKc29uU3RyaW5naWZ5JywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB0aGUgc2FtZSB0aGluZyBhcyBKU09OLnN0cmluZ2lmeSB3aGVuIEpTT04uc3RyaW5naWZ5IHJldHVybnMgYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgW1xuICAgICAgbnVsbCxcbiAgICAgIHRydWUsXG4gICAgICBmYWxzZSxcbiAgICAgIDAsXG4gICAgICAtMCxcbiAgICAgIDEyMyxcbiAgICAgIC1JbmZpbml0eSxcbiAgICAgIEluZmluaXR5LFxuICAgICAgTmFOLFxuICAgICAgJycsXG4gICAgICAnZm9vJyxcbiAgICAgIFtdLFxuICAgICAgWzFdLFxuICAgICAge30sXG4gICAgICB7IGhpOiA1IH0sXG4gICAgICBuZXcgRGF0ZSgpLFxuICAgICAgbmV3IFNldChbMSwgMiwgM10pLFxuICAgICAgbmV3IE1hcChbWydmb28nLCAnYmFyJ11dKSxcbiAgICAgIFByb21pc2UucmVzb2x2ZSgxMjMpLFxuICAgICAge1xuICAgICAgICB0b0pTT04oKSB7XG4gICAgICAgICAgcmV0dXJuICdmb28nO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSByZWFsbHlKc29uU3RyaW5naWZ5KHZhbHVlKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgYXNzZXJ0LmlzU3RyaW5nKGFjdHVhbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGEgc3RyaW5nIHdoZW4gSlNPTi5zdHJpbmdpZnkgcmV0dXJucyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2sgPSAodmFsdWU6IHVua25vd24sIGV4cGVjdGVkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHJlYWxseUpzb25TdHJpbmdpZnkodmFsdWUpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgb3VyIHRlc3QgaXMgc2V0IHVwIGNvcnJlY3RseSwgbm90IHRoZSBjb2RlIHVuZGVyIHRlc3QuXG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgY2hlY2sodW5kZWZpbmVkLCAnW29iamVjdCBVbmRlZmluZWRdJyk7XG4gICAgY2hlY2soU3ltYm9sKCdmb28nKSwgJ1tvYmplY3QgU3ltYm9sXScpO1xuICAgIGNoZWNrKFxuICAgICAge1xuICAgICAgICB0b0pTT04oKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAnW29iamVjdCBPYmplY3RdJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGEgc3RyaW5nIHdoZW4gSlNPTi5zdHJpbmdpZnkgd291bGQgZXJyb3InLCAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2sgPSAodmFsdWU6IHVua25vd24sIGV4cGVjdGVkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHJlYWxseUpzb25TdHJpbmdpZnkodmFsdWUpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgb3VyIHRlc3QgaXMgc2V0IHVwIGNvcnJlY3RseSwgbm90IHRoZSBjb2RlIHVuZGVyIHRlc3QuXG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgfTtcblxuICAgIGNoZWNrKEJpZ0ludCgxMjMpLCAnW29iamVjdCBCaWdJbnRdJyk7XG5cbiAgICBjb25zdCBhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGIgPSB7IGEgfTtcbiAgICBhLmIgPSBiO1xuICAgIGNoZWNrKGEsICdbb2JqZWN0IE9iamVjdF0nKTtcblxuICAgIGNoZWNrKFthXSwgJ1tvYmplY3QgQXJyYXldJyk7XG5cbiAgICBjb25zdCBiYWQgPSB7XG4gICAgICB0b0pTT04oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImRvbid0IGV2ZW4gdHJ5IHRvIHN0cmluZ2lmeSBtZVwiKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjaGVjayhiYWQsICdbb2JqZWN0IE9iamVjdF0nKTtcbiAgICBjaGVjayhbYmFkXSwgJ1tvYmplY3QgQXJyYXldJyk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUdBLGtCQUF1QjtBQUN2QixpQ0FBb0M7QUFFcEMsU0FBUyx1QkFBdUIsTUFBTTtBQUNwQyxLQUFHLGlGQUFpRixNQUFNO0FBQ3hGO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLENBQUM7QUFBQSxNQUNELENBQUMsQ0FBQztBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsRUFBRSxJQUFJLEVBQUU7QUFBQSxNQUNSLElBQUksS0FBSztBQUFBLE1BQ1Qsb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFBQSxNQUNqQixvQkFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDO0FBQUEsTUFDeEIsUUFBUSxRQUFRLEdBQUc7QUFBQSxNQUNuQjtBQUFBLFFBQ0UsU0FBUztBQUNQLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLEVBQUUsUUFBUSxXQUFTO0FBQ2pCLFlBQU0sV0FBVyxLQUFLLFVBQVUsS0FBSztBQUNyQyxZQUFNLFNBQVMsb0RBQW9CLEtBQUs7QUFFeEMseUJBQU8sWUFBWSxRQUFRLFFBQVE7QUFDbkMseUJBQU8sU0FBUyxNQUFNO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELEtBQUcsMERBQTBELE1BQU07QUFDakUsVUFBTSxRQUFRLHdCQUFDLE9BQWdCLGFBQTJCO0FBQ3hELFlBQU0sU0FBUyxvREFBb0IsS0FBSztBQUN4Qyx5QkFBTyxZQUFZLFFBQVEsUUFBUTtBQUVuQyx5QkFBTyxZQUFZLEtBQUssVUFBVSxLQUFLLENBQUM7QUFBQSxJQUMxQyxHQUxjO0FBT2QsVUFBTSxRQUFXLG9CQUFvQjtBQUNyQyxVQUFNLE9BQU8sS0FBSyxHQUFHLGlCQUFpQjtBQUN0QyxVQUNFO0FBQUEsTUFDRSxTQUFTO0FBQ1AsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGLEdBQ0EsaUJBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLG9EQUFvRCxNQUFNO0FBQzNELFVBQU0sUUFBUSx3QkFBQyxPQUFnQixhQUEyQjtBQUN4RCxZQUFNLFNBQVMsb0RBQW9CLEtBQUs7QUFDeEMseUJBQU8sWUFBWSxRQUFRLFFBQVE7QUFFbkMseUJBQU8sT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUM7QUFBQSxJQUMzQyxHQUxjO0FBT2QsVUFBTSxPQUFPLEdBQUcsR0FBRyxpQkFBaUI7QUFFcEMsVUFBTSxJQUE2QixDQUFDO0FBQ3BDLFVBQU0sSUFBSSxFQUFFLEVBQUU7QUFDZCxNQUFFLElBQUk7QUFDTixVQUFNLEdBQUcsaUJBQWlCO0FBRTFCLFVBQU0sQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCO0FBRTNCLFVBQU0sTUFBTTtBQUFBLE1BQ1YsU0FBUztBQUNQLGNBQU0sSUFBSSxNQUFNLGdDQUFnQztBQUFBLE1BQ2xEO0FBQUEsSUFDRjtBQUNBLFVBQU0sS0FBSyxpQkFBaUI7QUFDNUIsVUFBTSxDQUFDLEdBQUcsR0FBRyxnQkFBZ0I7QUFBQSxFQUMvQixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
