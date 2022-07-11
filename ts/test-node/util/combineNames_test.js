var import_chai = require("chai");
var import_combineNames = require("../../util/combineNames");
describe("combineNames", () => {
  it("returns undefined if no names provided", () => {
    import_chai.assert.strictEqual((0, import_combineNames.combineNames)("", ""), void 0);
  });
  it("returns first name only if family name not provided", () => {
    import_chai.assert.strictEqual((0, import_combineNames.combineNames)("Alice"), "Alice");
  });
  it("returns returns combined names", () => {
    import_chai.assert.strictEqual((0, import_combineNames.combineNames)("Alice", "Jones"), "Alice Jones");
  });
  it("returns given name first if names in Chinese", () => {
    import_chai.assert.strictEqual((0, import_combineNames.combineNames)("\u632F\u5B81", "\u6768"), "\u6768\u632F\u5B81");
  });
  it("returns given name first if names in Japanese", () => {
    import_chai.assert.strictEqual((0, import_combineNames.combineNames)("\u6CF0\u592B", "\u6728\u7530"), "\u6728\u7530\u6CF0\u592B");
  });
  it("returns given name first if names in Korean", () => {
    import_chai.assert.strictEqual((0, import_combineNames.combineNames)("\uCC44\uC6D0", "\uB3C4\uC724"), "\uB3C4\uC724\uCC44\uC6D0");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tYmluZU5hbWVzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGNvbWJpbmVOYW1lcyB9IGZyb20gJy4uLy4uL3V0aWwvY29tYmluZU5hbWVzJztcblxuZGVzY3JpYmUoJ2NvbWJpbmVOYW1lcycsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIG5vIG5hbWVzIHByb3ZpZGVkJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb21iaW5lTmFtZXMoJycsICcnKSwgdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmlyc3QgbmFtZSBvbmx5IGlmIGZhbWlseSBuYW1lIG5vdCBwcm92aWRlZCcsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29tYmluZU5hbWVzKCdBbGljZScpLCAnQWxpY2UnKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgcmV0dXJucyBjb21iaW5lZCBuYW1lcycsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29tYmluZU5hbWVzKCdBbGljZScsICdKb25lcycpLCAnQWxpY2UgSm9uZXMnKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZ2l2ZW4gbmFtZSBmaXJzdCBpZiBuYW1lcyBpbiBDaGluZXNlJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb21iaW5lTmFtZXMoJ1x1NjMyRlx1NUI4MScsICdcdTY3NjgnKSwgJ1x1Njc2OFx1NjMyRlx1NUI4MScpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBnaXZlbiBuYW1lIGZpcnN0IGlmIG5hbWVzIGluIEphcGFuZXNlJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb21iaW5lTmFtZXMoJ1x1NkNGMFx1NTkyQicsICdcdTY3MjhcdTc1MzAnKSwgJ1x1NjcyOFx1NzUzMFx1NkNGMFx1NTkyQicpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBnaXZlbiBuYW1lIGZpcnN0IGlmIG5hbWVzIGluIEtvcmVhbicsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29tYmluZU5hbWVzKCdcdUNDNDRcdUM2RDAnLCAnXHVCM0M0XHVDNzI0JyksICdcdUIzQzRcdUM3MjRcdUNDNDRcdUM2RDAnKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2QiwwQkFBNkI7QUFFN0IsU0FBUyxnQkFBZ0IsTUFBTTtBQUM3QixLQUFHLDBDQUEwQyxNQUFNO0FBQ2pELHVCQUFPLFlBQVksc0NBQWEsSUFBSSxFQUFFLEdBQUcsTUFBUztBQUFBLEVBQ3BELENBQUM7QUFFRCxLQUFHLHVEQUF1RCxNQUFNO0FBQzlELHVCQUFPLFlBQVksc0NBQWEsT0FBTyxHQUFHLE9BQU87QUFBQSxFQUNuRCxDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsTUFBTTtBQUN6Qyx1QkFBTyxZQUFZLHNDQUFhLFNBQVMsT0FBTyxHQUFHLGFBQWE7QUFBQSxFQUNsRSxDQUFDO0FBRUQsS0FBRyxnREFBZ0QsTUFBTTtBQUN2RCx1QkFBTyxZQUFZLHNDQUFhLGdCQUFNLFFBQUcsR0FBRyxvQkFBSztBQUFBLEVBQ25ELENBQUM7QUFFRCxLQUFHLGlEQUFpRCxNQUFNO0FBQ3hELHVCQUFPLFlBQVksc0NBQWEsZ0JBQU0sY0FBSSxHQUFHLDBCQUFNO0FBQUEsRUFDckQsQ0FBQztBQUVELEtBQUcsK0NBQStDLE1BQU07QUFDdEQsdUJBQU8sWUFBWSxzQ0FBYSxnQkFBTSxjQUFJLEdBQUcsMEJBQU07QUFBQSxFQUNyRCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
