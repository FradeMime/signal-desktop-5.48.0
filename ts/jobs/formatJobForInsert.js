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
var formatJobForInsert_exports = {};
__export(formatJobForInsert_exports, {
  formatJobForInsert: () => formatJobForInsert
});
module.exports = __toCommonJS(formatJobForInsert_exports);
const formatJobForInsert = /* @__PURE__ */ __name((job) => ({
  id: job.id,
  timestamp: job.timestamp,
  queueType: job.queueType,
  data: job.data
}), "formatJobForInsert");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatJobForInsert
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZm9ybWF0Sm9iRm9ySW5zZXJ0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUGFyc2VkSm9iLCBTdG9yZWRKb2IgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBGb3JtYXQgYSBqb2IgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgZGF0YWJhc2UuXG4gKlxuICogTm90YWJseSwgYEpvYmAgaW5zdGFuY2VzICh3aGljaCBoYXZlIGEgcHJvbWlzZSBhdHRhY2hlZCkgY2Fubm90IGJlIHNlcmlhbGl6ZWQgd2l0aG91dFxuICogc29tZSBjbGVhbnVwLiBUaGF0J3Mgd2hhdCB0aGlzIGZ1bmN0aW9uIGlzIG1vc3QgdXNlZnVsIGZvci5cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEpvYkZvckluc2VydCA9IChcbiAgam9iOiBSZWFkb25seTxTdG9yZWRKb2IgfCBQYXJzZWRKb2I8dW5rbm93bj4+XG4pOiBTdG9yZWRKb2IgPT4gKHtcbiAgaWQ6IGpvYi5pZCxcbiAgdGltZXN0YW1wOiBqb2IudGltZXN0YW1wLFxuICBxdWV1ZVR5cGU6IGpvYi5xdWV1ZVR5cGUsXG4gIGRhdGE6IGpvYi5kYXRhLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV08sTUFBTSxxQkFBcUIsd0JBQ2hDLFFBQ2U7QUFBQSxFQUNmLElBQUksSUFBSTtBQUFBLEVBQ1IsV0FBVyxJQUFJO0FBQUEsRUFDZixXQUFXLElBQUk7QUFBQSxFQUNmLE1BQU0sSUFBSTtBQUNaLElBUGtDOyIsCiAgIm5hbWVzIjogW10KfQo=
