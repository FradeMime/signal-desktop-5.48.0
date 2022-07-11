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
var scrollUtil_exports = {};
__export(scrollUtil_exports, {
  getScrollBottom: () => getScrollBottom,
  scrollToBottom: () => scrollToBottom,
  setScrollBottom: () => setScrollBottom
});
module.exports = __toCommonJS(scrollUtil_exports);
const getScrollBottom = /* @__PURE__ */ __name((el) => el.scrollHeight - el.scrollTop - el.clientHeight, "getScrollBottom");
function setScrollBottom(el, newScrollBottom) {
  el.scrollTop = el.scrollHeight - newScrollBottom - el.clientHeight;
}
function scrollToBottom(el) {
  el.scrollTop = el.scrollHeight;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getScrollBottom,
  scrollToBottom,
  setScrollBottom
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2Nyb2xsVXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBjb25zdCBnZXRTY3JvbGxCb3R0b20gPSAoXG4gIGVsOiBSZWFkb25seTxQaWNrPEhUTUxFbGVtZW50LCAnY2xpZW50SGVpZ2h0JyB8ICdzY3JvbGxIZWlnaHQnIHwgJ3Njcm9sbFRvcCc+PlxuKTogbnVtYmVyID0+IGVsLnNjcm9sbEhlaWdodCAtIGVsLnNjcm9sbFRvcCAtIGVsLmNsaWVudEhlaWdodDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbEJvdHRvbShcbiAgZWw6IFBpY2s8SFRNTEVsZW1lbnQsICdjbGllbnRIZWlnaHQnIHwgJ3Njcm9sbEhlaWdodCcgfCAnc2Nyb2xsVG9wJz4sXG4gIG5ld1Njcm9sbEJvdHRvbTogbnVtYmVyXG4pOiB2b2lkIHtcbiAgLy8gV2Ugd2FudCB0byBtdXRhdGUgdGhlIHBhcmFtZXRlciBoZXJlLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZWwuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsSGVpZ2h0IC0gbmV3U2Nyb2xsQm90dG9tIC0gZWwuY2xpZW50SGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsVG9Cb3R0b20oXG4gIGVsOiBQaWNrPEhUTUxFbGVtZW50LCAnc2Nyb2xsSGVpZ2h0JyB8ICdzY3JvbGxUb3AnPlxuKTogdm9pZCB7XG4gIC8vIFdlIHdhbnQgdG8gbXV0YXRlIHRoZSBwYXJhbWV0ZXIgaGVyZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGVsLnNjcm9sbFRvcCA9IGVsLnNjcm9sbEhlaWdodDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sTUFBTSxrQkFBa0Isd0JBQzdCLE9BQ1csR0FBRyxlQUFlLEdBQUcsWUFBWSxHQUFHLGNBRmxCO0FBSXhCLHlCQUNMLElBQ0EsaUJBQ007QUFHTixLQUFHLFlBQVksR0FBRyxlQUFlLGtCQUFrQixHQUFHO0FBQ3hEO0FBUGdCLEFBU1Qsd0JBQ0wsSUFDTTtBQUdOLEtBQUcsWUFBWSxHQUFHO0FBQ3BCO0FBTmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
