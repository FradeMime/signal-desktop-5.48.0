var import_chai = require("chai");
var import_assignWithNoUnnecessaryAllocation = require("../../util/assignWithNoUnnecessaryAllocation");
describe("assignWithNoUnnecessaryAllocation", () => {
  it("returns the same object if there are no modifications", () => {
    const empty = {};
    import_chai.assert.strictEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(empty, {}), empty);
    const obj = {
      foo: "bar",
      baz: "qux",
      und: void 0
    };
    import_chai.assert.strictEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, {}), obj);
    import_chai.assert.strictEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { foo: "bar" }), obj);
    import_chai.assert.strictEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { baz: "qux" }), obj);
    import_chai.assert.strictEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { und: void 0 }), obj);
  });
  it("returns a new object if there are modifications", () => {
    const empty = {};
    import_chai.assert.deepEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(empty, { name: "Bert" }), { name: "Bert" });
    import_chai.assert.deepEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(empty, { age: 8 }), {
      age: 8
    });
    import_chai.assert.deepEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(empty, { name: void 0 }), {
      name: void 0
    });
    const obj = { name: "Ernie" };
    import_chai.assert.deepEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { name: "Big Bird" }), {
      name: "Big Bird"
    });
    import_chai.assert.deepEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { age: 9 }), {
      name: "Ernie",
      age: 9
    });
    import_chai.assert.deepEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { age: void 0 }), {
      name: "Ernie",
      age: void 0
    });
  });
  it("only performs a shallow comparison", () => {
    const obj = { foo: { bar: "baz" } };
    import_chai.assert.notStrictEqual((0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { foo: { bar: "baz" } }), obj);
  });
  it("doesn't modify the original object when there are no modifications", () => {
    const empty = {};
    (0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(empty, {});
    import_chai.assert.deepEqual(empty, {});
    const obj = { foo: "bar" };
    (0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { foo: "bar" });
    import_chai.assert.deepEqual(obj, { foo: "bar" });
  });
  it("doesn't modify the original object when there are modifications", () => {
    const empty = {};
    (0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(empty, { name: "Bert" });
    import_chai.assert.deepEqual(empty, {});
    const obj = { foo: "bar" };
    (0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(obj, { foo: "baz" });
    import_chai.assert.deepEqual(obj, { foo: "bar" });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NpZ25XaXRoTm9Vbm5lY2Vzc2FyeUFsbG9jYXRpb24nO1xuXG5kZXNjcmliZSgnYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uJywgKCkgPT4ge1xuICB0eXBlIFBlcnNvbiA9IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGFnZT86IG51bWJlcjtcbiAgfTtcblxuICBpdCgncmV0dXJucyB0aGUgc2FtZSBvYmplY3QgaWYgdGhlcmUgYXJlIG5vIG1vZGlmaWNhdGlvbnMnLCAoKSA9PiB7XG4gICAgY29uc3QgZW1wdHkgPSB7fTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKGVtcHR5LCB7fSksIGVtcHR5KTtcblxuICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgIGZvbzogJ2JhcicsXG4gICAgICBiYXo6ICdxdXgnLFxuICAgICAgdW5kOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKG9iaiwge30pLCBvYmopO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihvYmosIHsgZm9vOiAnYmFyJyB9KSxcbiAgICAgIG9ialxuICAgICk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKG9iaiwgeyBiYXo6ICdxdXgnIH0pLFxuICAgICAgb2JqXG4gICAgKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBhc3NpZ25XaXRoTm9Vbm5lY2Vzc2FyeUFsbG9jYXRpb24ob2JqLCB7IHVuZDogdW5kZWZpbmVkIH0pLFxuICAgICAgb2JqXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgYSBuZXcgb2JqZWN0IGlmIHRoZXJlIGFyZSBtb2RpZmljYXRpb25zJywgKCkgPT4ge1xuICAgIGNvbnN0IGVtcHR5OiBQZXJzb24gPSB7fTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKGVtcHR5LCB7IG5hbWU6ICdCZXJ0JyB9KSxcbiAgICAgIHsgbmFtZTogJ0JlcnQnIH1cbiAgICApO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKGVtcHR5LCB7IGFnZTogOCB9KSwge1xuICAgICAgYWdlOiA4LFxuICAgIH0pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICBhc3NpZ25XaXRoTm9Vbm5lY2Vzc2FyeUFsbG9jYXRpb24oZW1wdHksIHsgbmFtZTogdW5kZWZpbmVkIH0pLFxuICAgICAge1xuICAgICAgICBuYW1lOiB1bmRlZmluZWQsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IG9iajogUGVyc29uID0geyBuYW1lOiAnRXJuaWUnIH07XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihvYmosIHsgbmFtZTogJ0JpZyBCaXJkJyB9KSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0JpZyBCaXJkJyxcbiAgICAgIH1cbiAgICApO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKG9iaiwgeyBhZ2U6IDkgfSksIHtcbiAgICAgIG5hbWU6ICdFcm5pZScsXG4gICAgICBhZ2U6IDksXG4gICAgfSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihvYmosIHsgYWdlOiB1bmRlZmluZWQgfSksXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdFcm5pZScsXG4gICAgICAgIGFnZTogdW5kZWZpbmVkLFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdvbmx5IHBlcmZvcm1zIGEgc2hhbGxvdyBjb21wYXJpc29uJywgKCkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IHsgZm9vOiB7IGJhcjogJ2JheicgfSB9O1xuICAgIGFzc2VydC5ub3RTdHJpY3RFcXVhbChcbiAgICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihvYmosIHsgZm9vOiB7IGJhcjogJ2JheicgfSB9KSxcbiAgICAgIG9ialxuICAgICk7XG4gIH0pO1xuXG4gIGl0KFwiZG9lc24ndCBtb2RpZnkgdGhlIG9yaWdpbmFsIG9iamVjdCB3aGVuIHRoZXJlIGFyZSBubyBtb2RpZmljYXRpb25zXCIsICgpID0+IHtcbiAgICBjb25zdCBlbXB0eSA9IHt9O1xuICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihlbXB0eSwge30pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoZW1wdHksIHt9KTtcblxuICAgIGNvbnN0IG9iaiA9IHsgZm9vOiAnYmFyJyB9O1xuICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihvYmosIHsgZm9vOiAnYmFyJyB9KTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKG9iaiwgeyBmb286ICdiYXInIH0pO1xuICB9KTtcblxuICBpdChcImRvZXNuJ3QgbW9kaWZ5IHRoZSBvcmlnaW5hbCBvYmplY3Qgd2hlbiB0aGVyZSBhcmUgbW9kaWZpY2F0aW9uc1wiLCAoKSA9PiB7XG4gICAgY29uc3QgZW1wdHk6IFBlcnNvbiA9IHt9O1xuICAgIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihlbXB0eSwgeyBuYW1lOiAnQmVydCcgfSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChlbXB0eSwge30pO1xuXG4gICAgY29uc3Qgb2JqID0geyBmb286ICdiYXInIH07XG4gICAgYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uKG9iaiwgeyBmb286ICdiYXonIH0pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwob2JqLCB7IGZvbzogJ2JhcicgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsK0NBQWtEO0FBRWxELFNBQVMscUNBQXFDLE1BQU07QUFNbEQsS0FBRyx5REFBeUQsTUFBTTtBQUNoRSxVQUFNLFFBQVEsQ0FBQztBQUNmLHVCQUFPLFlBQVksZ0ZBQWtDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSztBQUV0RSxVQUFNLE1BQU07QUFBQSxNQUNWLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQ0EsdUJBQU8sWUFBWSxnRkFBa0MsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHO0FBQ2xFLHVCQUFPLFlBQ0wsZ0ZBQWtDLEtBQUssRUFBRSxLQUFLLE1BQU0sQ0FBQyxHQUNyRCxHQUNGO0FBQ0EsdUJBQU8sWUFDTCxnRkFBa0MsS0FBSyxFQUFFLEtBQUssTUFBTSxDQUFDLEdBQ3JELEdBQ0Y7QUFDQSx1QkFBTyxZQUNMLGdGQUFrQyxLQUFLLEVBQUUsS0FBSyxPQUFVLENBQUMsR0FDekQsR0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsbURBQW1ELE1BQU07QUFDMUQsVUFBTSxRQUFnQixDQUFDO0FBQ3ZCLHVCQUFPLFVBQ0wsZ0ZBQWtDLE9BQU8sRUFBRSxNQUFNLE9BQU8sQ0FBQyxHQUN6RCxFQUFFLE1BQU0sT0FBTyxDQUNqQjtBQUNBLHVCQUFPLFVBQVUsZ0ZBQWtDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHO0FBQUEsTUFDckUsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUNELHVCQUFPLFVBQ0wsZ0ZBQWtDLE9BQU8sRUFBRSxNQUFNLE9BQVUsQ0FBQyxHQUM1RDtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1IsQ0FDRjtBQUVBLFVBQU0sTUFBYyxFQUFFLE1BQU0sUUFBUTtBQUNwQyx1QkFBTyxVQUNMLGdGQUFrQyxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUMsR0FDM0Q7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSLENBQ0Y7QUFDQSx1QkFBTyxVQUFVLGdGQUFrQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRztBQUFBLE1BQ25FLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFDRCx1QkFBTyxVQUNMLGdGQUFrQyxLQUFLLEVBQUUsS0FBSyxPQUFVLENBQUMsR0FDekQ7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQLENBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHNDQUFzQyxNQUFNO0FBQzdDLFVBQU0sTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLE1BQU0sRUFBRTtBQUNsQyx1QkFBTyxlQUNMLGdGQUFrQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssTUFBTSxFQUFFLENBQUMsR0FDOUQsR0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsc0VBQXNFLE1BQU07QUFDN0UsVUFBTSxRQUFRLENBQUM7QUFDZixvRkFBa0MsT0FBTyxDQUFDLENBQUM7QUFDM0MsdUJBQU8sVUFBVSxPQUFPLENBQUMsQ0FBQztBQUUxQixVQUFNLE1BQU0sRUFBRSxLQUFLLE1BQU07QUFDekIsb0ZBQWtDLEtBQUssRUFBRSxLQUFLLE1BQU0sQ0FBQztBQUNyRCx1QkFBTyxVQUFVLEtBQUssRUFBRSxLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQ3RDLENBQUM7QUFFRCxLQUFHLG1FQUFtRSxNQUFNO0FBQzFFLFVBQU0sUUFBZ0IsQ0FBQztBQUN2QixvRkFBa0MsT0FBTyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3pELHVCQUFPLFVBQVUsT0FBTyxDQUFDLENBQUM7QUFFMUIsVUFBTSxNQUFNLEVBQUUsS0FBSyxNQUFNO0FBQ3pCLG9GQUFrQyxLQUFLLEVBQUUsS0FBSyxNQUFNLENBQUM7QUFDckQsdUJBQU8sVUFBVSxLQUFLLEVBQUUsS0FBSyxNQUFNLENBQUM7QUFBQSxFQUN0QyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
