var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_scrollUtil = require("../util/scrollUtil");
describe("scroll utilities", () => {
  let sandbox;
  let el;
  before(function thisNeeded() {
    if (process.platform === "win32") {
      this.skip();
    }
  });
  beforeEach(() => {
    sandbox = document.createElement("div");
    document.body.appendChild(sandbox);
    el = document.createElement("div");
    el.innerText = "a".repeat(5e4);
    Object.assign(el.style, {
      height: "50px",
      overflow: "scroll",
      whiteSpace: "wrap",
      width: "100px",
      wordBreak: "break-word"
    });
    sandbox.appendChild(el);
    import_chai.assert.strictEqual(el.scrollTop, 0, "Test is not set up correctly. Element is already scrolled");
    import_chai.assert.isAtLeast(el.scrollHeight, 50, "Test is not set up correctly. scrollHeight is too low");
  });
  afterEach(() => {
    sandbox.remove();
  });
  describe("getScrollBottom", () => {
    it("gets the distance from the bottom", () => {
      import_chai.assert.strictEqual((0, import_scrollUtil.getScrollBottom)(el), el.scrollHeight - el.clientHeight);
      el.scrollTop = 999999;
      import_chai.assert.strictEqual((0, import_scrollUtil.getScrollBottom)(el), 0);
    });
  });
  describe("setScrollBottom", () => {
    it("sets the distance from the bottom", () => {
      (0, import_scrollUtil.setScrollBottom)(el, 12);
      import_chai.assert.strictEqual((0, import_scrollUtil.getScrollBottom)(el), 12);
      (0, import_scrollUtil.setScrollBottom)(el, 9999999);
      import_chai.assert.strictEqual(el.scrollTop, 0);
    });
  });
  describe("scrollToBottom", () => {
    it("sets the element's scrollTop to the element's scrollHeight", () => {
      (0, import_scrollUtil.scrollToBottom)(el);
      import_chai.assert.isAtLeast(el.scrollTop, el.scrollHeight - 50);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2Nyb2xsVXRpbF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7XG4gIGdldFNjcm9sbEJvdHRvbSxcbiAgc2Nyb2xsVG9Cb3R0b20sXG4gIHNldFNjcm9sbEJvdHRvbSxcbn0gZnJvbSAnLi4vdXRpbC9zY3JvbGxVdGlsJztcblxuZGVzY3JpYmUoJ3Njcm9sbCB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGxldCBzYW5kYm94OiBIVE1MRGl2RWxlbWVudDtcbiAgbGV0IGVsOiBIVE1MRGl2RWxlbWVudDtcblxuICAvLyBUaGVzZSB0ZXN0cyB0byBiZSBmbGFreSBvbiBXaW5kb3dzIENJLCBzb21ldGltZXMgdGltaW5nIG91dC4gVGhhdCBkb2Vzbid0IHJlYWxseVxuICAvLyAgIG1ha2Ugc2Vuc2UgYmVjYXVzZSB0aGUgdGVzdCBpcyBzeW5jaHJvbm91cywgYnV0IHRoaXMgcXVpY2stYW5kLWRpcnR5IGZpeCBpc1xuICAvLyAgIHByb2JhYmx5IGJldHRlciB0aGFuIGEgZnVsbCBpbnZlc3RpZ2F0aW9uLlxuICBiZWZvcmUoZnVuY3Rpb24gdGhpc05lZWRlZCgpIHtcbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgdGhpcy5za2lwKCk7XG4gICAgfVxuICB9KTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzYW5kYm94KTtcblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuaW5uZXJUZXh0ID0gJ2EnLnJlcGVhdCg1MDAwMCk7XG4gICAgT2JqZWN0LmFzc2lnbihlbC5zdHlsZSwge1xuICAgICAgaGVpZ2h0OiAnNTBweCcsXG4gICAgICBvdmVyZmxvdzogJ3Njcm9sbCcsXG4gICAgICB3aGl0ZVNwYWNlOiAnd3JhcCcsXG4gICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgIH0pO1xuICAgIHNhbmRib3guYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgZWwuc2Nyb2xsVG9wLFxuICAgICAgMCxcbiAgICAgICdUZXN0IGlzIG5vdCBzZXQgdXAgY29ycmVjdGx5LiBFbGVtZW50IGlzIGFscmVhZHkgc2Nyb2xsZWQnXG4gICAgKTtcbiAgICBhc3NlcnQuaXNBdExlYXN0KFxuICAgICAgZWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgNTAsXG4gICAgICAnVGVzdCBpcyBub3Qgc2V0IHVwIGNvcnJlY3RseS4gc2Nyb2xsSGVpZ2h0IGlzIHRvbyBsb3cnXG4gICAgKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94LnJlbW92ZSgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0U2Nyb2xsQm90dG9tJywgKCkgPT4ge1xuICAgIGl0KCdnZXRzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBib3R0b20nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFNjcm9sbEJvdHRvbShlbCksXG4gICAgICAgIGVsLnNjcm9sbEhlaWdodCAtIGVsLmNsaWVudEhlaWdodFxuICAgICAgKTtcblxuICAgICAgZWwuc2Nyb2xsVG9wID0gOTk5OTk5O1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0U2Nyb2xsQm90dG9tKGVsKSwgMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXRTY3JvbGxCb3R0b20nLCAoKSA9PiB7XG4gICAgaXQoJ3NldHMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGJvdHRvbScsICgpID0+IHtcbiAgICAgIHNldFNjcm9sbEJvdHRvbShlbCwgMTIpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFNjcm9sbEJvdHRvbShlbCksIDEyKTtcblxuICAgICAgc2V0U2Nyb2xsQm90dG9tKGVsLCA5OTk5OTk5KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChlbC5zY3JvbGxUb3AsIDApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2Nyb2xsVG9Cb3R0b20nLCAoKSA9PiB7XG4gICAgaXQoXCJzZXRzIHRoZSBlbGVtZW50J3Mgc2Nyb2xsVG9wIHRvIHRoZSBlbGVtZW50J3Mgc2Nyb2xsSGVpZ2h0XCIsICgpID0+IHtcbiAgICAgIHNjcm9sbFRvQm90dG9tKGVsKTtcblxuICAgICAgYXNzZXJ0LmlzQXRMZWFzdChlbC5zY3JvbGxUb3AsIGVsLnNjcm9sbEhlaWdodCAtIDUwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBRXZCLHdCQUlPO0FBRVAsU0FBUyxvQkFBb0IsTUFBTTtBQUNqQyxNQUFJO0FBQ0osTUFBSTtBQUtKLFNBQU8sc0JBQXNCO0FBQzNCLFFBQUksUUFBUSxhQUFhLFNBQVM7QUFDaEMsV0FBSyxLQUFLO0FBQUEsSUFDWjtBQUFBLEVBQ0YsQ0FBQztBQUVELGFBQVcsTUFBTTtBQUNmLGNBQVUsU0FBUyxjQUFjLEtBQUs7QUFDdEMsYUFBUyxLQUFLLFlBQVksT0FBTztBQUVqQyxTQUFLLFNBQVMsY0FBYyxLQUFLO0FBQ2pDLE9BQUcsWUFBWSxJQUFJLE9BQU8sR0FBSztBQUMvQixXQUFPLE9BQU8sR0FBRyxPQUFPO0FBQUEsTUFDdEIsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUNELFlBQVEsWUFBWSxFQUFFO0FBRXRCLHVCQUFPLFlBQ0wsR0FBRyxXQUNILEdBQ0EsMkRBQ0Y7QUFDQSx1QkFBTyxVQUNMLEdBQUcsY0FDSCxJQUNBLHVEQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsWUFBVSxNQUFNO0FBQ2QsWUFBUSxPQUFPO0FBQUEsRUFDakIsQ0FBQztBQUVELFdBQVMsbUJBQW1CLE1BQU07QUFDaEMsT0FBRyxxQ0FBcUMsTUFBTTtBQUM1Qyx5QkFBTyxZQUNMLHVDQUFnQixFQUFFLEdBQ2xCLEdBQUcsZUFBZSxHQUFHLFlBQ3ZCO0FBRUEsU0FBRyxZQUFZO0FBRWYseUJBQU8sWUFBWSx1Q0FBZ0IsRUFBRSxHQUFHLENBQUM7QUFBQSxJQUMzQyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxtQkFBbUIsTUFBTTtBQUNoQyxPQUFHLHFDQUFxQyxNQUFNO0FBQzVDLDZDQUFnQixJQUFJLEVBQUU7QUFDdEIseUJBQU8sWUFBWSx1Q0FBZ0IsRUFBRSxHQUFHLEVBQUU7QUFFMUMsNkNBQWdCLElBQUksT0FBTztBQUMzQix5QkFBTyxZQUFZLEdBQUcsV0FBVyxDQUFDO0FBQUEsSUFDcEMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsa0JBQWtCLE1BQU07QUFDL0IsT0FBRyw4REFBOEQsTUFBTTtBQUNyRSw0Q0FBZSxFQUFFO0FBRWpCLHlCQUFPLFVBQVUsR0FBRyxXQUFXLEdBQUcsZUFBZSxFQUFFO0FBQUEsSUFDckQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
