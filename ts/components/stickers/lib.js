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
var lib_exports = {};
__export(lib_exports, {
  countStickers: () => countStickers
});
module.exports = __toCommonJS(lib_exports);
function countStickers(o) {
  return o.knownPacks.length + o.blessedPacks.length + o.installedPacks.length + o.receivedPacks.length;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  countStickers
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBTdGlja2VyUGFja1R5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9zdGlja2Vycyc7XG5cbi8vIFRoaXMgZnVuY3Rpb24gZXhpc3RzIHRvIGZvcmNlIHN0aWNrZXJzIHRvIGJlIGNvdW50ZWQgY29uc2lzdGVudGx5IHdoZXJldmVyXG4vLyB0aGV5IGFyZSBjb3VudGVkIChUeXBlU2NyaXB0IGVuc3VyZXMgdGhhdCBhbGwgZGF0YSBpcyBuYW1lZCBhbmQgcHJvdmlkZWQpXG5leHBvcnQgZnVuY3Rpb24gY291bnRTdGlja2VycyhvOiB7XG4gIGtub3duUGFja3M6IFJlYWRvbmx5QXJyYXk8U3RpY2tlclBhY2tUeXBlPjtcbiAgYmxlc3NlZFBhY2tzOiBSZWFkb25seUFycmF5PFN0aWNrZXJQYWNrVHlwZT47XG4gIGluc3RhbGxlZFBhY2tzOiBSZWFkb25seUFycmF5PFN0aWNrZXJQYWNrVHlwZT47XG4gIHJlY2VpdmVkUGFja3M6IFJlYWRvbmx5QXJyYXk8U3RpY2tlclBhY2tUeXBlPjtcbn0pOiBudW1iZXIge1xuICByZXR1cm4gKFxuICAgIG8ua25vd25QYWNrcy5sZW5ndGggK1xuICAgIG8uYmxlc3NlZFBhY2tzLmxlbmd0aCArXG4gICAgby5pbnN0YWxsZWRQYWNrcy5sZW5ndGggK1xuICAgIG8ucmVjZWl2ZWRQYWNrcy5sZW5ndGhcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPTyx1QkFBdUIsR0FLbkI7QUFDVCxTQUNFLEVBQUUsV0FBVyxTQUNiLEVBQUUsYUFBYSxTQUNmLEVBQUUsZUFBZSxTQUNqQixFQUFFLGNBQWM7QUFFcEI7QUFaZ0IiLAogICJuYW1lcyI6IFtdCn0K
