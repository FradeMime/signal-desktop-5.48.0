var import_chai = require("chai");
var import_setUtil = require("../../util/setUtil");
describe("set utilities", () => {
  const original = /* @__PURE__ */ new Set([1, 2, 3]);
  describe("isEqual", () => {
    it("returns false if the sets are different", () => {
      const sets = [
        /* @__PURE__ */ new Set([1, 2, 3]),
        /* @__PURE__ */ new Set([1, 2, 3, 4]),
        /* @__PURE__ */ new Set([1, 2]),
        /* @__PURE__ */ new Set([4, 5, 6])
      ];
      for (const a of sets) {
        for (const b of sets) {
          if (a !== b) {
            import_chai.assert.isFalse((0, import_setUtil.isEqual)(a, b));
          }
        }
      }
    });
    it("returns true if both arguments are the same set", () => {
      const set = /* @__PURE__ */ new Set([1, 2, 3]);
      import_chai.assert.isTrue((0, import_setUtil.isEqual)(set, set));
    });
    it("returns true if the sets have the same values", () => {
      import_chai.assert.isTrue((0, import_setUtil.isEqual)(/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set()));
      import_chai.assert.isTrue((0, import_setUtil.isEqual)(/* @__PURE__ */ new Set([1, 2]), /* @__PURE__ */ new Set([2, 1])));
    });
  });
  describe("remove", () => {
    it("accepts zero arguments, returning a new set", () => {
      const result = (0, import_setUtil.remove)(original);
      import_chai.assert.deepStrictEqual(result, original);
      import_chai.assert.notStrictEqual(result, original);
    });
    it("accepts 1 argument, returning a new set", () => {
      const result = (0, import_setUtil.remove)(original, 2);
      import_chai.assert.deepStrictEqual(result, /* @__PURE__ */ new Set([1, 3]));
      import_chai.assert.deepStrictEqual(original, /* @__PURE__ */ new Set([1, 2, 3]));
    });
    it("accepts multiple arguments, returning a new set", () => {
      const result = (0, import_setUtil.remove)(original, 1, 2, 99);
      import_chai.assert.deepStrictEqual(result, /* @__PURE__ */ new Set([3]));
      import_chai.assert.deepStrictEqual(original, /* @__PURE__ */ new Set([1, 2, 3]));
    });
  });
  describe("toggle", () => {
    it("returns a clone if trying to remove an item that was never there", () => {
      const result = (0, import_setUtil.toggle)(original, 99, false);
      import_chai.assert.deepStrictEqual(result, /* @__PURE__ */ new Set([1, 2, 3]));
      import_chai.assert.notStrictEqual(result, original);
    });
    it("returns a clone if trying to add an item that was already there", () => {
      const result = (0, import_setUtil.toggle)(original, 3, true);
      import_chai.assert.deepStrictEqual(result, /* @__PURE__ */ new Set([1, 2, 3]));
      import_chai.assert.notStrictEqual(result, original);
    });
    it("can add an item to a set", () => {
      const result = (0, import_setUtil.toggle)(original, 4, true);
      import_chai.assert.deepStrictEqual(result, /* @__PURE__ */ new Set([1, 2, 3, 4]));
      import_chai.assert.deepStrictEqual(original, /* @__PURE__ */ new Set([1, 2, 3]));
    });
    it("can remove an item from a set", () => {
      const result = (0, import_setUtil.toggle)(original, 2, false);
      import_chai.assert.deepStrictEqual(result, /* @__PURE__ */ new Set([1, 3]));
      import_chai.assert.deepStrictEqual(original, /* @__PURE__ */ new Set([1, 2, 3]));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0VXRpbF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzRXF1YWwsIHJlbW92ZSwgdG9nZ2xlIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXRVdGlsJztcblxuZGVzY3JpYmUoJ3NldCB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsID0gbmV3IFNldChbMSwgMiwgM10pO1xuXG4gIGRlc2NyaWJlKCdpc0VxdWFsJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBzZXRzIGFyZSBkaWZmZXJlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzZXRzID0gW1xuICAgICAgICBuZXcgU2V0KFsxLCAyLCAzXSksXG4gICAgICAgIG5ldyBTZXQoWzEsIDIsIDMsIDRdKSxcbiAgICAgICAgbmV3IFNldChbMSwgMl0pLFxuICAgICAgICBuZXcgU2V0KFs0LCA1LCA2XSksXG4gICAgICBdO1xuXG4gICAgICBmb3IgKGNvbnN0IGEgb2Ygc2V0cykge1xuICAgICAgICBmb3IgKGNvbnN0IGIgb2Ygc2V0cykge1xuICAgICAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0VxdWFsKGEsIGIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYm90aCBhcmd1bWVudHMgYXJlIHRoZSBzYW1lIHNldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHNldCA9IG5ldyBTZXQoWzEsIDIsIDNdKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNFcXVhbChzZXQsIHNldCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgc2V0cyBoYXZlIHRoZSBzYW1lIHZhbHVlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNFcXVhbChuZXcgU2V0KCksIG5ldyBTZXQoKSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0VxdWFsKG5ldyBTZXQoWzEsIDJdKSwgbmV3IFNldChbMiwgMV0pKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZW1vdmUnLCAoKSA9PiB7XG4gICAgaXQoJ2FjY2VwdHMgemVybyBhcmd1bWVudHMsIHJldHVybmluZyBhIG5ldyBzZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZW1vdmUob3JpZ2luYWwpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZXN1bHQsIG9yaWdpbmFsKTtcbiAgICAgIGFzc2VydC5ub3RTdHJpY3RFcXVhbChyZXN1bHQsIG9yaWdpbmFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIDEgYXJndW1lbnQsIHJldHVybmluZyBhIG5ldyBzZXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZW1vdmUob3JpZ2luYWwsIDIpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZXN1bHQsIG5ldyBTZXQoWzEsIDNdKSk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG9yaWdpbmFsLCBuZXcgU2V0KFsxLCAyLCAzXSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgbXVsdGlwbGUgYXJndW1lbnRzLCByZXR1cm5pbmcgYSBuZXcgc2V0JywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVtb3ZlKG9yaWdpbmFsLCAxLCAyLCA5OSk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdCwgbmV3IFNldChbM10pKTtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3JpZ2luYWwsIG5ldyBTZXQoWzEsIDIsIDNdKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd0b2dnbGUnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYSBjbG9uZSBpZiB0cnlpbmcgdG8gcmVtb3ZlIGFuIGl0ZW0gdGhhdCB3YXMgbmV2ZXIgdGhlcmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0b2dnbGUob3JpZ2luYWwsIDk5LCBmYWxzZSk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdCwgbmV3IFNldChbMSwgMiwgM10pKTtcbiAgICAgIGFzc2VydC5ub3RTdHJpY3RFcXVhbChyZXN1bHQsIG9yaWdpbmFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgY2xvbmUgaWYgdHJ5aW5nIHRvIGFkZCBhbiBpdGVtIHRoYXQgd2FzIGFscmVhZHkgdGhlcmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0b2dnbGUob3JpZ2luYWwsIDMsIHRydWUpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZXN1bHQsIG5ldyBTZXQoWzEsIDIsIDNdKSk7XG4gICAgICBhc3NlcnQubm90U3RyaWN0RXF1YWwocmVzdWx0LCBvcmlnaW5hbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuIGFkZCBhbiBpdGVtIHRvIGEgc2V0JywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdG9nZ2xlKG9yaWdpbmFsLCA0LCB0cnVlKTtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmVzdWx0LCBuZXcgU2V0KFsxLCAyLCAzLCA0XSkpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChvcmlnaW5hbCwgbmV3IFNldChbMSwgMiwgM10pKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gcmVtb3ZlIGFuIGl0ZW0gZnJvbSBhIHNldCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRvZ2dsZShvcmlnaW5hbCwgMiwgZmFsc2UpO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZXN1bHQsIG5ldyBTZXQoWzEsIDNdKSk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG9yaWdpbmFsLCBuZXcgU2V0KFsxLCAyLCAzXSkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHFCQUF3QztBQUV4QyxTQUFTLGlCQUFpQixNQUFNO0FBQzlCLFFBQU0sV0FBVyxvQkFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUVsQyxXQUFTLFdBQVcsTUFBTTtBQUN4QixPQUFHLDJDQUEyQyxNQUFNO0FBQ2xELFlBQU0sT0FBTztBQUFBLFFBQ1gsb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFBQSxRQUNqQixvQkFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsUUFDcEIsb0JBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQUEsUUFDZCxvQkFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUFBLE1BQ25CO0FBRUEsaUJBQVcsS0FBSyxNQUFNO0FBQ3BCLG1CQUFXLEtBQUssTUFBTTtBQUNwQixjQUFJLE1BQU0sR0FBRztBQUNYLCtCQUFPLFFBQVEsNEJBQVEsR0FBRyxDQUFDLENBQUM7QUFBQSxVQUM5QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxtREFBbUQsTUFBTTtBQUMxRCxZQUFNLE1BQU0sb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDN0IseUJBQU8sT0FBTyw0QkFBUSxLQUFLLEdBQUcsQ0FBQztBQUFBLElBQ2pDLENBQUM7QUFFRCxPQUFHLGlEQUFpRCxNQUFNO0FBQ3hELHlCQUFPLE9BQU8sNEJBQVEsb0JBQUksSUFBSSxHQUFHLG9CQUFJLElBQUksQ0FBQyxDQUFDO0FBQzNDLHlCQUFPLE9BQU8sNEJBQVEsb0JBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsb0JBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFBLElBQ3pELENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLFVBQVUsTUFBTTtBQUN2QixPQUFHLCtDQUErQyxNQUFNO0FBQ3RELFlBQU0sU0FBUywyQkFBTyxRQUFRO0FBQzlCLHlCQUFPLGdCQUFnQixRQUFRLFFBQVE7QUFDdkMseUJBQU8sZUFBZSxRQUFRLFFBQVE7QUFBQSxJQUN4QyxDQUFDO0FBRUQsT0FBRywyQ0FBMkMsTUFBTTtBQUNsRCxZQUFNLFNBQVMsMkJBQU8sVUFBVSxDQUFDO0FBQ2pDLHlCQUFPLGdCQUFnQixRQUFRLG9CQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlDLHlCQUFPLGdCQUFnQixVQUFVLG9CQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFBQSxJQUNyRCxDQUFDO0FBRUQsT0FBRyxtREFBbUQsTUFBTTtBQUMxRCxZQUFNLFNBQVMsMkJBQU8sVUFBVSxHQUFHLEdBQUcsRUFBRTtBQUN4Qyx5QkFBTyxnQkFBZ0IsUUFBUSxvQkFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MseUJBQU8sZ0JBQWdCLFVBQVUsb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUFBLElBQ3JELENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLFVBQVUsTUFBTTtBQUN2QixPQUFHLG9FQUFvRSxNQUFNO0FBQzNFLFlBQU0sU0FBUywyQkFBTyxVQUFVLElBQUksS0FBSztBQUN6Qyx5QkFBTyxnQkFBZ0IsUUFBUSxvQkFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pELHlCQUFPLGVBQWUsUUFBUSxRQUFRO0FBQUEsSUFDeEMsQ0FBQztBQUVELE9BQUcsbUVBQW1FLE1BQU07QUFDMUUsWUFBTSxTQUFTLDJCQUFPLFVBQVUsR0FBRyxJQUFJO0FBQ3ZDLHlCQUFPLGdCQUFnQixRQUFRLG9CQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakQseUJBQU8sZUFBZSxRQUFRLFFBQVE7QUFBQSxJQUN4QyxDQUFDO0FBRUQsT0FBRyw0QkFBNEIsTUFBTTtBQUNuQyxZQUFNLFNBQVMsMkJBQU8sVUFBVSxHQUFHLElBQUk7QUFDdkMseUJBQU8sZ0JBQWdCLFFBQVEsb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BELHlCQUFPLGdCQUFnQixVQUFVLG9CQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFBQSxJQUNyRCxDQUFDO0FBRUQsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4QyxZQUFNLFNBQVMsMkJBQU8sVUFBVSxHQUFHLEtBQUs7QUFDeEMseUJBQU8sZ0JBQWdCLFFBQVEsb0JBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUMseUJBQU8sZ0JBQWdCLFVBQVUsb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUFBLElBQ3JELENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
