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
var Job_exports = {};
__export(Job_exports, {
  Job: () => Job
});
module.exports = __toCommonJS(Job_exports);
class Job {
  constructor(id, timestamp, queueType, data, completion) {
    this.id = id;
    this.timestamp = timestamp;
    this.queueType = queueType;
    this.data = data;
    this.completion = completion;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Job
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUGFyc2VkSm9iIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQSBzaW5nbGUgam9iIGluc3RhbmNlLiBTaG91bGRuJ3QgYmUgaW5zdGFudGlhdGVkIGRpcmVjdGx5LCBleGNlcHQgYnkgYEpvYlF1ZXVlYC5cbiAqL1xuZXhwb3J0IGNsYXNzIEpvYjxUPiBpbXBsZW1lbnRzIFBhcnNlZEpvYjxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgcmVhZG9ubHkgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgcXVldWVUeXBlOiBzdHJpbmcsXG4gICAgcmVhZG9ubHkgZGF0YTogVCxcbiAgICByZWFkb25seSBjb21wbGV0aW9uOiBQcm9taXNlPHZvaWQ+XG4gICkge31cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRTyxNQUFNLElBQStCO0FBQUEsRUFDMUMsWUFDVyxJQUNBLFdBQ0EsV0FDQSxNQUNBLFlBQ1Q7QUFMUztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUEsRUFDUjtBQUNMO0FBUk8iLAogICJuYW1lcyI6IFtdCn0K
