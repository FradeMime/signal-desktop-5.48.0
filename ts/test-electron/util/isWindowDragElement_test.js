var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_isWindowDragElement = require("../../util/isWindowDragElement");
describe("isWindowDragElement", () => {
  const crel = /* @__PURE__ */ __name((tagName, appRegion) => {
    const result = document.createElement(tagName);
    if (appRegion) {
      result.style.cssText = `-webkit-app-region: ${appRegion}`;
    }
    return result;
  }, "crel");
  let sandboxEl;
  beforeEach(() => {
    sandboxEl = document.createElement("div");
    document.body.appendChild(sandboxEl);
  });
  afterEach(() => {
    sandboxEl.remove();
  });
  it("returns false for elements with no -webkit-app-region property in the heirarchy", () => {
    const root = crel("div");
    const outer = crel("span");
    const inner = crel("div");
    root.appendChild(outer);
    outer.appendChild(inner);
    sandboxEl.appendChild(root);
    import_chai.assert.isFalse((0, import_isWindowDragElement.isWindowDragElement)(root));
    import_chai.assert.isFalse((0, import_isWindowDragElement.isWindowDragElement)(outer));
    import_chai.assert.isFalse((0, import_isWindowDragElement.isWindowDragElement)(inner));
  });
  it("returns false for elements with -webkit-app-region: drag on a sub-element", () => {
    const parent = crel("div");
    const child = crel("div", "drag");
    parent.appendChild(child);
    sandboxEl.appendChild(parent);
    import_chai.assert.isFalse((0, import_isWindowDragElement.isWindowDragElement)(parent));
  });
  it("returns false if any element up the chain is found to be -webkit-app-region: no-drag", () => {
    const root = crel("div", "drag");
    const outer = crel("div", "no-drag");
    const inner = crel("div");
    root.appendChild(outer);
    outer.appendChild(inner);
    sandboxEl.appendChild(root);
    import_chai.assert.isFalse((0, import_isWindowDragElement.isWindowDragElement)(outer));
    import_chai.assert.isFalse((0, import_isWindowDragElement.isWindowDragElement)(inner));
  });
  it("returns true if any element up the chain is found to be -webkit-app-region: drag", () => {
    const root = crel("div", "drag");
    const outer = crel("div");
    const inner = crel("div");
    root.appendChild(outer);
    outer.appendChild(inner);
    sandboxEl.appendChild(root);
    import_chai.assert.isTrue((0, import_isWindowDragElement.isWindowDragElement)(root));
    import_chai.assert.isTrue((0, import_isWindowDragElement.isWindowDragElement)(outer));
    import_chai.assert.isTrue((0, import_isWindowDragElement.isWindowDragElement)(inner));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNXaW5kb3dEcmFnRWxlbWVudF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBpc1dpbmRvd0RyYWdFbGVtZW50IH0gZnJvbSAnLi4vLi4vdXRpbC9pc1dpbmRvd0RyYWdFbGVtZW50JztcblxuZGVzY3JpYmUoJ2lzV2luZG93RHJhZ0VsZW1lbnQnLCAoKSA9PiB7XG4gIGNvbnN0IGNyZWwgPSAodGFnTmFtZTogc3RyaW5nLCBhcHBSZWdpb24/OiBzdHJpbmcpOiBFbGVtZW50ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmIChhcHBSZWdpb24pIHtcbiAgICAgIHJlc3VsdC5zdHlsZS5jc3NUZXh0ID0gYC13ZWJraXQtYXBwLXJlZ2lvbjogJHthcHBSZWdpb259YDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBsZXQgc2FuZGJveEVsOiBIVE1MRWxlbWVudDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNhbmRib3hFbCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveEVsLnJlbW92ZSgpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZWxlbWVudHMgd2l0aCBubyAtd2Via2l0LWFwcC1yZWdpb24gcHJvcGVydHkgaW4gdGhlIGhlaXJhcmNoeScsICgpID0+IHtcbiAgICBjb25zdCByb290ID0gY3JlbCgnZGl2Jyk7XG4gICAgY29uc3Qgb3V0ZXIgPSBjcmVsKCdzcGFuJyk7XG4gICAgY29uc3QgaW5uZXIgPSBjcmVsKCdkaXYnKTtcbiAgICByb290LmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG4gICAgc2FuZGJveEVsLmFwcGVuZENoaWxkKHJvb3QpO1xuXG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNXaW5kb3dEcmFnRWxlbWVudChyb290KSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNXaW5kb3dEcmFnRWxlbWVudChvdXRlcikpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzV2luZG93RHJhZ0VsZW1lbnQoaW5uZXIpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGVsZW1lbnRzIHdpdGggLXdlYmtpdC1hcHAtcmVnaW9uOiBkcmFnIG9uIGEgc3ViLWVsZW1lbnQnLCAoKSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gY3JlbCgnZGl2Jyk7XG4gICAgY29uc3QgY2hpbGQgPSBjcmVsKCdkaXYnLCAnZHJhZycpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgc2FuZGJveEVsLmFwcGVuZENoaWxkKHBhcmVudCk7XG5cbiAgICBhc3NlcnQuaXNGYWxzZShpc1dpbmRvd0RyYWdFbGVtZW50KHBhcmVudCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiBhbnkgZWxlbWVudCB1cCB0aGUgY2hhaW4gaXMgZm91bmQgdG8gYmUgLXdlYmtpdC1hcHAtcmVnaW9uOiBuby1kcmFnJywgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBjcmVsKCdkaXYnLCAnZHJhZycpO1xuICAgIGNvbnN0IG91dGVyID0gY3JlbCgnZGl2JywgJ25vLWRyYWcnKTtcbiAgICBjb25zdCBpbm5lciA9IGNyZWwoJ2RpdicpO1xuICAgIHJvb3QuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICBzYW5kYm94RWwuYXBwZW5kQ2hpbGQocm9vdCk7XG5cbiAgICBhc3NlcnQuaXNGYWxzZShpc1dpbmRvd0RyYWdFbGVtZW50KG91dGVyKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNXaW5kb3dEcmFnRWxlbWVudChpbm5lcikpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGlmIGFueSBlbGVtZW50IHVwIHRoZSBjaGFpbiBpcyBmb3VuZCB0byBiZSAtd2Via2l0LWFwcC1yZWdpb246IGRyYWcnLCAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IGNyZWwoJ2RpdicsICdkcmFnJyk7XG4gICAgY29uc3Qgb3V0ZXIgPSBjcmVsKCdkaXYnKTtcbiAgICBjb25zdCBpbm5lciA9IGNyZWwoJ2RpdicpO1xuICAgIHJvb3QuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICBzYW5kYm94RWwuYXBwZW5kQ2hpbGQocm9vdCk7XG5cbiAgICBhc3NlcnQuaXNUcnVlKGlzV2luZG93RHJhZ0VsZW1lbnQocm9vdCkpO1xuICAgIGFzc2VydC5pc1RydWUoaXNXaW5kb3dEcmFnRWxlbWVudChvdXRlcikpO1xuICAgIGFzc2VydC5pc1RydWUoaXNXaW5kb3dEcmFnRWxlbWVudChpbm5lcikpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFFdkIsaUNBQW9DO0FBRXBDLFNBQVMsdUJBQXVCLE1BQU07QUFDcEMsUUFBTSxPQUFPLHdCQUFDLFNBQWlCLGNBQWdDO0FBQzdELFVBQU0sU0FBUyxTQUFTLGNBQWMsT0FBTztBQUM3QyxRQUFJLFdBQVc7QUFDYixhQUFPLE1BQU0sVUFBVSx1QkFBdUI7QUFBQSxJQUNoRDtBQUNBLFdBQU87QUFBQSxFQUNULEdBTmE7QUFRYixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsZ0JBQVksU0FBUyxjQUFjLEtBQUs7QUFDeEMsYUFBUyxLQUFLLFlBQVksU0FBUztBQUFBLEVBQ3JDLENBQUM7QUFFRCxZQUFVLE1BQU07QUFDZCxjQUFVLE9BQU87QUFBQSxFQUNuQixDQUFDO0FBRUQsS0FBRyxtRkFBbUYsTUFBTTtBQUMxRixVQUFNLE9BQU8sS0FBSyxLQUFLO0FBQ3ZCLFVBQU0sUUFBUSxLQUFLLE1BQU07QUFDekIsVUFBTSxRQUFRLEtBQUssS0FBSztBQUN4QixTQUFLLFlBQVksS0FBSztBQUN0QixVQUFNLFlBQVksS0FBSztBQUN2QixjQUFVLFlBQVksSUFBSTtBQUUxQix1QkFBTyxRQUFRLG9EQUFvQixJQUFJLENBQUM7QUFDeEMsdUJBQU8sUUFBUSxvREFBb0IsS0FBSyxDQUFDO0FBQ3pDLHVCQUFPLFFBQVEsb0RBQW9CLEtBQUssQ0FBQztBQUFBLEVBQzNDLENBQUM7QUFFRCxLQUFHLDZFQUE2RSxNQUFNO0FBQ3BGLFVBQU0sU0FBUyxLQUFLLEtBQUs7QUFDekIsVUFBTSxRQUFRLEtBQUssT0FBTyxNQUFNO0FBQ2hDLFdBQU8sWUFBWSxLQUFLO0FBQ3hCLGNBQVUsWUFBWSxNQUFNO0FBRTVCLHVCQUFPLFFBQVEsb0RBQW9CLE1BQU0sQ0FBQztBQUFBLEVBQzVDLENBQUM7QUFFRCxLQUFHLHdGQUF3RixNQUFNO0FBQy9GLFVBQU0sT0FBTyxLQUFLLE9BQU8sTUFBTTtBQUMvQixVQUFNLFFBQVEsS0FBSyxPQUFPLFNBQVM7QUFDbkMsVUFBTSxRQUFRLEtBQUssS0FBSztBQUN4QixTQUFLLFlBQVksS0FBSztBQUN0QixVQUFNLFlBQVksS0FBSztBQUN2QixjQUFVLFlBQVksSUFBSTtBQUUxQix1QkFBTyxRQUFRLG9EQUFvQixLQUFLLENBQUM7QUFDekMsdUJBQU8sUUFBUSxvREFBb0IsS0FBSyxDQUFDO0FBQUEsRUFDM0MsQ0FBQztBQUVELEtBQUcsb0ZBQW9GLE1BQU07QUFDM0YsVUFBTSxPQUFPLEtBQUssT0FBTyxNQUFNO0FBQy9CLFVBQU0sUUFBUSxLQUFLLEtBQUs7QUFDeEIsVUFBTSxRQUFRLEtBQUssS0FBSztBQUN4QixTQUFLLFlBQVksS0FBSztBQUN0QixVQUFNLFlBQVksS0FBSztBQUN2QixjQUFVLFlBQVksSUFBSTtBQUUxQix1QkFBTyxPQUFPLG9EQUFvQixJQUFJLENBQUM7QUFDdkMsdUJBQU8sT0FBTyxvREFBb0IsS0FBSyxDQUFDO0FBQ3hDLHVCQUFPLE9BQU8sb0RBQW9CLEtBQUssQ0FBQztBQUFBLEVBQzFDLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
