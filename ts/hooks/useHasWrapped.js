var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useHasWrapped_exports = {};
__export(useHasWrapped_exports, {
  useHasWrapped: () => useHasWrapped
});
module.exports = __toCommonJS(useHasWrapped_exports);
var import_react = require("react");
var import_lodash = require("lodash");
function getTop(element) {
  return element.getBoundingClientRect().top;
}
function isWrapped(element) {
  if (!element) {
    return false;
  }
  const { children } = element;
  const firstChild = (0, import_lodash.first)(children);
  const lastChild = (0, import_lodash.last)(children);
  return Boolean(firstChild && lastChild && firstChild !== lastChild && getTop(firstChild) !== getTop(lastChild));
}
function useHasWrapped() {
  const [element, setElement] = (0, import_react.useState)(null);
  const [hasWrapped, setHasWrapped] = (0, import_react.useState)(isWrapped(element));
  (0, import_react.useEffect)(() => {
    if (!element) {
      return import_lodash.noop;
    }
    const observer = new ResizeObserver(() => {
      setHasWrapped(isWrapped(element));
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);
  return [setElement, hasWrapped];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useHasWrapped
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlSGFzV3JhcHBlZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZpcnN0LCBsYXN0LCBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gZ2V0VG9wKGVsZW1lbnQ6IFJlYWRvbmx5PEVsZW1lbnQ+KTogbnVtYmVyIHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xufVxuXG5mdW5jdGlvbiBpc1dyYXBwZWQoZWxlbWVudDogUmVhZG9ubHk8bnVsbCB8IEhUTUxFbGVtZW50Pik6IGJvb2xlYW4ge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB7IGNoaWxkcmVuIH0gPSBlbGVtZW50O1xuICBjb25zdCBmaXJzdENoaWxkID0gZmlyc3QoY2hpbGRyZW4pO1xuICBjb25zdCBsYXN0Q2hpbGQgPSBsYXN0KGNoaWxkcmVuKTtcblxuICByZXR1cm4gQm9vbGVhbihcbiAgICBmaXJzdENoaWxkICYmXG4gICAgICBsYXN0Q2hpbGQgJiZcbiAgICAgIGZpcnN0Q2hpbGQgIT09IGxhc3RDaGlsZCAmJlxuICAgICAgZ2V0VG9wKGZpcnN0Q2hpbGQpICE9PSBnZXRUb3AobGFzdENoaWxkKVxuICApO1xufVxuXG4vKipcbiAqIEEgaG9vayB0aGF0IHJldHVybnMgYSByZWYgKHRvIHB1dCBvbiB5b3VyIGVsZW1lbnQpIGFuZCBhIGJvb2xlYW4uIFRoZSBib29sZWFuIHdpbGwgYmVcbiAqIGB0cnVlYCBpZiB0aGUgZWxlbWVudCdzIGNoaWxkcmVuIGhhdmUgZGlmZmVyZW50IGB0b3BgcywgYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlSGFzV3JhcHBlZDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQ+KCk6IFtSZWY8VD4sIGJvb2xlYW5dIHtcbiAgY29uc3QgW2VsZW1lbnQsIHNldEVsZW1lbnRdID0gdXNlU3RhdGU8bnVsbCB8IFQ+KG51bGwpO1xuXG4gIGNvbnN0IFtoYXNXcmFwcGVkLCBzZXRIYXNXcmFwcGVkXSA9IHVzZVN0YXRlKGlzV3JhcHBlZChlbGVtZW50KSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgIHNldEhhc1dyYXBwZWQoaXNXcmFwcGVkKGVsZW1lbnQpKTtcbiAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9O1xuICB9LCBbZWxlbWVudF0pO1xuXG4gIHJldHVybiBbc2V0RWxlbWVudCwgaGFzV3JhcHBlZF07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQW9DO0FBQ3BDLG9CQUFrQztBQUVsQyxnQkFBZ0IsU0FBb0M7QUFDbEQsU0FBTyxRQUFRLHNCQUFzQixFQUFFO0FBQ3pDO0FBRlMsQUFJVCxtQkFBbUIsU0FBZ0Q7QUFDakUsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxhQUFhO0FBQ3JCLFFBQU0sYUFBYSx5QkFBTSxRQUFRO0FBQ2pDLFFBQU0sWUFBWSx3QkFBSyxRQUFRO0FBRS9CLFNBQU8sUUFDTCxjQUNFLGFBQ0EsZUFBZSxhQUNmLE9BQU8sVUFBVSxNQUFNLE9BQU8sU0FBUyxDQUMzQztBQUNGO0FBZlMsQUFxQkYseUJBQW1FO0FBQ3hFLFFBQU0sQ0FBQyxTQUFTLGNBQWMsMkJBQW1CLElBQUk7QUFFckQsUUFBTSxDQUFDLFlBQVksaUJBQWlCLDJCQUFTLFVBQVUsT0FBTyxDQUFDO0FBRS9ELDhCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsU0FBUztBQUNaLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxXQUFXLElBQUksZUFBZSxNQUFNO0FBQ3hDLG9CQUFjLFVBQVUsT0FBTyxDQUFDO0FBQUEsSUFDbEMsQ0FBQztBQUNELGFBQVMsUUFBUSxPQUFPO0FBRXhCLFdBQU8sTUFBTTtBQUNYLGVBQVMsV0FBVztBQUFBLElBQ3RCO0FBQUEsRUFDRixHQUFHLENBQUMsT0FBTyxDQUFDO0FBRVosU0FBTyxDQUFDLFlBQVksVUFBVTtBQUNoQztBQXJCZ0IiLAogICJuYW1lcyI6IFtdCn0K
