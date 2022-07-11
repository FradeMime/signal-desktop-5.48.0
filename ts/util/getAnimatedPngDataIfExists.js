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
var getAnimatedPngDataIfExists_exports = {};
__export(getAnimatedPngDataIfExists_exports, {
  getAnimatedPngDataIfExists: () => getAnimatedPngDataIfExists
});
module.exports = __toCommonJS(getAnimatedPngDataIfExists_exports);
const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
const ACTL_CHUNK_BYTES = new TextEncoder().encode("acTL");
const IDAT_CHUNK_BYTES = new TextEncoder().encode("IDAT");
const MAX_BYTES_TO_READ = 1024 * 1024;
function getAnimatedPngDataIfExists(bytes) {
  if (!hasPngSignature(bytes)) {
    return null;
  }
  let numPlays;
  const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let i = PNG_SIGNATURE.length;
  while (i < bytes.byteLength && i <= MAX_BYTES_TO_READ) {
    const chunkTypeBytes = bytes.slice(i + 4, i + 8);
    if (areBytesEqual(chunkTypeBytes, ACTL_CHUNK_BYTES)) {
      numPlays = dataView.getUint32(i + 12);
      if (numPlays === 0) {
        numPlays = Infinity;
      }
      return { numPlays };
    }
    if (areBytesEqual(chunkTypeBytes, IDAT_CHUNK_BYTES)) {
      return null;
    }
    i += 12 + dataView.getUint32(i);
  }
  return null;
}
function hasPngSignature(bytes) {
  return areBytesEqual(bytes.slice(0, 8), PNG_SIGNATURE);
}
function areBytesEqual(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAnimatedPngDataIfExists
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QW5pbWF0ZWRQbmdEYXRhSWZFeGlzdHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5jb25zdCBQTkdfU0lHTkFUVVJFID0gbmV3IFVpbnQ4QXJyYXkoWzEzNywgODAsIDc4LCA3MSwgMTMsIDEwLCAyNiwgMTBdKTtcbmNvbnN0IEFDVExfQ0hVTktfQllURVMgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoJ2FjVEwnKTtcbmNvbnN0IElEQVRfQ0hVTktfQllURVMgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoJ0lEQVQnKTtcbmNvbnN0IE1BWF9CWVRFU19UT19SRUFEID0gMTAyNCAqIDEwMjQ7XG5cbnR5cGUgQW5pbWF0ZWRQbmdEYXRhID0ge1xuICBudW1QbGF5czogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBUaGlzIGlzIGEgbmFcdTAwRUZ2ZSBpbXBsZW1lbnRhdGlvbi4gSXQgb25seSBwZXJmb3JtcyB0d28gY2hlY2tzOlxuICpcbiAqIDEuIERvIHRoZSBieXRlcyBzdGFydCB3aXRoIHRoZSBbUE5HIHNpZ25hdHVyZV1bMF0/XG4gKiAyLiBJZiBzbywgZG9lcyBpdCBjb250YWluIHRoZSBbYGFjVExgIGNodW5rXVsxXSBiZWZvcmUgdGhlIFtgSURBVGAgY2h1bmtdWzJdLCBpbiB0aGVcbiAqICAgIGZpcnN0IG1lZ2FieXRlP1xuICpcbiAqIFRob3VnaCB3ZSBfY291bGRfIG9ubHkgY2hlY2sgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgYGFjVExgIGNodW5rIGFueXdoZXJlLCB3ZSBtYWtlXG4gKiBzdXJlIGl0J3MgYmVmb3JlIHRoZSBgSURBVGAgY2h1bmsgYW5kIHdpdGhpbiB0aGUgZmlyc3QgbWVnYWJ5dGUuIFRoaXMgYWRkcyBhIHNtYWxsXG4gKiBhbW91bnQgb2YgdmFsaWRpdHkgY2hlY2tpbmcgYW5kIGhlbHBzIHVzIGF2b2lkIHByb2JsZW1zIHdpdGggbGFyZ2UgUE5Hcy5cbiAqXG4gKiBJdCBkb2Vzbid0IG1ha2Ugc3VyZSB0aGUgUE5HIGlzIHZhbGlkLiBJdCBkb2Vzbid0IHZlcmlmeSBbdGhlIENSQyBjb2RlXVszXSBvZiBlYWNoIFBOR1xuICogY2h1bms7IGl0IGRvZXNuJ3QgdmVyaWZ5IGFueSBvZiB0aGUgY2h1bmsncyBkYXRhOyBpdCBkb2Vzbid0IHZlcmlmeSB0aGF0IHRoZSBjaHVua3MgYXJlXG4gKiBpbiB0aGUgcmlnaHQgb3JkZXI7IGV0Yy5cbiAqXG4gKiBbMF06IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9QTkcvIzVQTkctZmlsZS1zaWduYXR1cmVcbiAqIFsxXTogaHR0cHM6Ly93aWtpLm1vemlsbGEub3JnL0FQTkdfU3BlY2lmaWNhdGlvbiMuNjBhY1RMLjYwOl9UaGVfQW5pbWF0aW9uX0NvbnRyb2xfQ2h1bmtcbiAqIFsyXTogaHR0cHM6Ly93d3cudzMub3JnL1RSL1BORy8jMTFJREFUXG4gKiBbM106IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9QTkcvIzVDaHVuay1sYXlvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFuaW1hdGVkUG5nRGF0YUlmRXhpc3RzKFxuICBieXRlczogVWludDhBcnJheVxuKTogbnVsbCB8IEFuaW1hdGVkUG5nRGF0YSB7XG4gIGlmICghaGFzUG5nU2lnbmF0dXJlKGJ5dGVzKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IG51bVBsYXlzOiB2b2lkIHwgbnVtYmVyO1xuXG4gIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KFxuICAgIGJ5dGVzLmJ1ZmZlcixcbiAgICBieXRlcy5ieXRlT2Zmc2V0LFxuICAgIGJ5dGVzLmJ5dGVMZW5ndGhcbiAgKTtcblxuICBsZXQgaSA9IFBOR19TSUdOQVRVUkUubGVuZ3RoO1xuICB3aGlsZSAoaSA8IGJ5dGVzLmJ5dGVMZW5ndGggJiYgaSA8PSBNQVhfQllURVNfVE9fUkVBRCkge1xuICAgIGNvbnN0IGNodW5rVHlwZUJ5dGVzID0gYnl0ZXMuc2xpY2UoaSArIDQsIGkgKyA4KTtcbiAgICBpZiAoYXJlQnl0ZXNFcXVhbChjaHVua1R5cGVCeXRlcywgQUNUTF9DSFVOS19CWVRFUykpIHtcbiAgICAgIC8vIDQgYnl0ZXMgZm9yIHRoZSBsZW5ndGg7IDQgYnl0ZXMgZm9yIHRoZSB0eXBlOyA0IGJ5dGVzIGZvciB0aGUgbnVtYmVyIG9mIGZyYW1lcy5cbiAgICAgIG51bVBsYXlzID0gZGF0YVZpZXcuZ2V0VWludDMyKGkgKyAxMik7XG4gICAgICBpZiAobnVtUGxheXMgPT09IDApIHtcbiAgICAgICAgbnVtUGxheXMgPSBJbmZpbml0eTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IG51bVBsYXlzIH07XG4gICAgfVxuICAgIGlmIChhcmVCeXRlc0VxdWFsKGNodW5rVHlwZUJ5dGVzLCBJREFUX0NIVU5LX0JZVEVTKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gSnVtcCBvdmVyIHRoZSBsZW5ndGggKDQgYnl0ZXMpLCB0aGUgdHlwZSAoNCBieXRlcyksIHRoZSBkYXRhLCBhbmQgdGhlIENSQyBjaGVja3N1bVxuICAgIC8vICAgKDQgYnl0ZXMpLlxuICAgIGkgKz0gMTIgKyBkYXRhVmlldy5nZXRVaW50MzIoaSk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFzUG5nU2lnbmF0dXJlKGJ5dGVzOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gIHJldHVybiBhcmVCeXRlc0VxdWFsKGJ5dGVzLnNsaWNlKDAsIDgpLCBQTkdfU0lHTkFUVVJFKTtcbn1cblxuZnVuY3Rpb24gYXJlQnl0ZXNFcXVhbChhOiBVaW50OEFycmF5LCBiOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGEuYnl0ZUxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsTUFBTSxnQkFBZ0IsSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEUsTUFBTSxtQkFBbUIsSUFBSSxZQUFZLEVBQUUsT0FBTyxNQUFNO0FBQ3hELE1BQU0sbUJBQW1CLElBQUksWUFBWSxFQUFFLE9BQU8sTUFBTTtBQUN4RCxNQUFNLG9CQUFvQixPQUFPO0FBMEIxQixvQ0FDTCxPQUN3QjtBQUN4QixNQUFJLENBQUMsZ0JBQWdCLEtBQUssR0FBRztBQUMzQixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUk7QUFFSixRQUFNLFdBQVcsSUFBSSxTQUNuQixNQUFNLFFBQ04sTUFBTSxZQUNOLE1BQU0sVUFDUjtBQUVBLE1BQUksSUFBSSxjQUFjO0FBQ3RCLFNBQU8sSUFBSSxNQUFNLGNBQWMsS0FBSyxtQkFBbUI7QUFDckQsVUFBTSxpQkFBaUIsTUFBTSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDL0MsUUFBSSxjQUFjLGdCQUFnQixnQkFBZ0IsR0FBRztBQUVuRCxpQkFBVyxTQUFTLFVBQVUsSUFBSSxFQUFFO0FBQ3BDLFVBQUksYUFBYSxHQUFHO0FBQ2xCLG1CQUFXO0FBQUEsTUFDYjtBQUNBLGFBQU8sRUFBRSxTQUFTO0FBQUEsSUFDcEI7QUFDQSxRQUFJLGNBQWMsZ0JBQWdCLGdCQUFnQixHQUFHO0FBQ25ELGFBQU87QUFBQSxJQUNUO0FBSUEsU0FBSyxLQUFLLFNBQVMsVUFBVSxDQUFDO0FBQUEsRUFDaEM7QUFFQSxTQUFPO0FBQ1Q7QUFwQ2dCLEFBc0NoQix5QkFBeUIsT0FBNEI7QUFDbkQsU0FBTyxjQUFjLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhO0FBQ3ZEO0FBRlMsQUFJVCx1QkFBdUIsR0FBZSxHQUF3QjtBQUM1RCxNQUFJLEVBQUUsZUFBZSxFQUFFLFlBQVk7QUFDakMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxXQUFTLElBQUksR0FBRyxJQUFJLEVBQUUsWUFBWSxLQUFLLEdBQUc7QUFDeEMsUUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJO0FBQ2pCLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQVZTIiwKICAibmFtZXMiOiBbXQp9Cg==
