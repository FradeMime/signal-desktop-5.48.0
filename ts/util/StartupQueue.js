var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var StartupQueue_exports = {};
__export(StartupQueue_exports, {
  StartupQueue: () => StartupQueue
});
module.exports = __toCommonJS(StartupQueue_exports);
var Errors = __toESM(require("../types/errors"));
var log = __toESM(require("../logging/log"));
class StartupQueue {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(id, value, f) {
    const existing = this.map.get(id);
    if (existing && existing.value >= value) {
      return;
    }
    this.map.set(id, { value, callback: f });
  }
  flush() {
    log.info("StartupQueue: Processing", this.map.size, "actions");
    const values = Array.from(this.map.values());
    this.map.clear();
    for (const { callback } of values) {
      try {
        callback();
      } catch (error) {
        log.error("StartupQueue: Failed to process item due to error", Errors.toLogFormat(error));
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StartupQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhcnR1cFF1ZXVlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxudHlwZSBFbnRyeVR5cGUgPSBSZWFkb25seTx7XG4gIHZhbHVlOiBudW1iZXI7XG4gIGNhbGxiYWNrKCk6IHZvaWQ7XG59PjtcblxuZXhwb3J0IGNsYXNzIFN0YXJ0dXBRdWV1ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEVudHJ5VHlwZT4oKTtcblxuICBwdWJsaWMgYWRkKGlkOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGY6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBjb25zdCBleGlzdGluZyA9IHRoaXMubWFwLmdldChpZCk7XG4gICAgaWYgKGV4aXN0aW5nICYmIGV4aXN0aW5nLnZhbHVlID49IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tYXAuc2V0KGlkLCB7IHZhbHVlLCBjYWxsYmFjazogZiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBmbHVzaCgpOiB2b2lkIHtcbiAgICBsb2cuaW5mbygnU3RhcnR1cFF1ZXVlOiBQcm9jZXNzaW5nJywgdGhpcy5tYXAuc2l6ZSwgJ2FjdGlvbnMnKTtcblxuICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmZyb20odGhpcy5tYXAudmFsdWVzKCkpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG5cbiAgICBmb3IgKGNvbnN0IHsgY2FsbGJhY2sgfSBvZiB2YWx1ZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ1N0YXJ0dXBRdWV1ZTogRmFpbGVkIHRvIHByb2Nlc3MgaXRlbSBkdWUgdG8gZXJyb3InLFxuICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxhQUF3QjtBQUN4QixVQUFxQjtBQU9kLE1BQU0sYUFBYTtBQUFBLEVBQW5CO0FBQ1ksZUFBTSxvQkFBSSxJQUF1QjtBQUFBO0FBQUEsRUFFM0MsSUFBSSxJQUFZLE9BQWUsR0FBcUI7QUFDekQsVUFBTSxXQUFXLEtBQUssSUFBSSxJQUFJLEVBQUU7QUFDaEMsUUFBSSxZQUFZLFNBQVMsU0FBUyxPQUFPO0FBQ3ZDO0FBQUEsSUFDRjtBQUVBLFNBQUssSUFBSSxJQUFJLElBQUksRUFBRSxPQUFPLFVBQVUsRUFBRSxDQUFDO0FBQUEsRUFDekM7QUFBQSxFQUVPLFFBQWM7QUFDbkIsUUFBSSxLQUFLLDRCQUE0QixLQUFLLElBQUksTUFBTSxTQUFTO0FBRTdELFVBQU0sU0FBUyxNQUFNLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQztBQUMzQyxTQUFLLElBQUksTUFBTTtBQUVmLGVBQVcsRUFBRSxjQUFjLFFBQVE7QUFDakMsVUFBSTtBQUNGLGlCQUFTO0FBQUEsTUFDWCxTQUFTLE9BQVA7QUFDQSxZQUFJLE1BQ0YscURBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQTdCTyIsCiAgIm5hbWVzIjogW10KfQo=
