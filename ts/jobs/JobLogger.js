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
var JobLogger_exports = {};
__export(JobLogger_exports, {
  JobLogger: () => JobLogger
});
module.exports = __toCommonJS(JobLogger_exports);
class JobLogger {
  constructor(job, logger) {
    this.logger = logger;
    this.attempt = -1;
    this.id = job.id;
    this.queueType = job.queueType;
  }
  fatal(...args) {
    this.logger.fatal(this.prefix(), ...args);
  }
  error(...args) {
    this.logger.error(this.prefix(), ...args);
  }
  warn(...args) {
    this.logger.warn(this.prefix(), ...args);
  }
  info(...args) {
    this.logger.info(this.prefix(), ...args);
  }
  debug(...args) {
    this.logger.debug(this.prefix(), ...args);
  }
  trace(...args) {
    this.logger.trace(this.prefix(), ...args);
  }
  prefix() {
    return `${this.queueType} job queue, job ID ${this.id}, attempt ${this.attempt}:`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobLogger
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iTG9nZ2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRKb2IgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEpvYkxvZ2dlciBpbXBsZW1lbnRzIExvZ2dlclR5cGUge1xuICBwcml2YXRlIGlkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBxdWV1ZVR5cGU6IHN0cmluZztcblxuICBwdWJsaWMgYXR0ZW1wdCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGpvYjogUmVhZG9ubHk8UGljazxQYXJzZWRKb2I8dW5rbm93bj4sICdpZCcgfCAncXVldWVUeXBlJz4+LFxuICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXJUeXBlXG4gICkge1xuICAgIHRoaXMuaWQgPSBqb2IuaWQ7XG4gICAgdGhpcy5xdWV1ZVR5cGUgPSBqb2IucXVldWVUeXBlO1xuICB9XG5cbiAgZmF0YWwoLi4uYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmZhdGFsKHRoaXMucHJlZml4KCksIC4uLmFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMucHJlZml4KCksIC4uLmFyZ3MpO1xuICB9XG5cbiAgd2FybiguLi5hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLnByZWZpeCgpLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGluZm8oLi4uYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5wcmVmaXgoKSwgLi4uYXJncyk7XG4gIH1cblxuICBkZWJ1ZyguLi5hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcodGhpcy5wcmVmaXgoKSwgLi4uYXJncyk7XG4gIH1cblxuICB0cmFjZSguLi5hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIudHJhY2UodGhpcy5wcmVmaXgoKSwgLi4uYXJncyk7XG4gIH1cblxuICBwcml2YXRlIHByZWZpeCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLnF1ZXVlVHlwZX0gam9iIHF1ZXVlLCBqb2IgSUQgJHt0aGlzLmlkfSwgYXR0ZW1wdCAke3RoaXMuYXR0ZW1wdH06YDtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLE1BQU0sVUFBZ0M7QUFBQSxFQU8zQyxZQUNFLEtBQ1EsUUFDUjtBQURRO0FBSkgsbUJBQVU7QUFNZixTQUFLLEtBQUssSUFBSTtBQUNkLFNBQUssWUFBWSxJQUFJO0FBQUEsRUFDdkI7QUFBQSxFQUVBLFNBQVMsTUFBb0M7QUFDM0MsU0FBSyxPQUFPLE1BQU0sS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDMUM7QUFBQSxFQUVBLFNBQVMsTUFBb0M7QUFDM0MsU0FBSyxPQUFPLE1BQU0sS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDMUM7QUFBQSxFQUVBLFFBQVEsTUFBb0M7QUFDMUMsU0FBSyxPQUFPLEtBQUssS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDekM7QUFBQSxFQUVBLFFBQVEsTUFBb0M7QUFDMUMsU0FBSyxPQUFPLEtBQUssS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDekM7QUFBQSxFQUVBLFNBQVMsTUFBb0M7QUFDM0MsU0FBSyxPQUFPLE1BQU0sS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDMUM7QUFBQSxFQUVBLFNBQVMsTUFBb0M7QUFDM0MsU0FBSyxPQUFPLE1BQU0sS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJO0FBQUEsRUFDMUM7QUFBQSxFQUVRLFNBQWlCO0FBQ3ZCLFdBQU8sR0FBRyxLQUFLLCtCQUErQixLQUFLLGVBQWUsS0FBSztBQUFBLEVBQ3pFO0FBQ0Y7QUExQ08iLAogICJuYW1lcyI6IFtdCn0K
