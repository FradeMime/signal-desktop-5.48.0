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
var InMemoryQueues_exports = {};
__export(InMemoryQueues_exports, {
  InMemoryQueues: () => InMemoryQueues
});
module.exports = __toCommonJS(InMemoryQueues_exports);
var import_p_queue = __toESM(require("p-queue"));
class InMemoryQueues {
  constructor() {
    this.queues = /* @__PURE__ */ new Map();
  }
  get(key) {
    const existingQueue = this.queues.get(key);
    if (existingQueue) {
      return existingQueue;
    }
    const newQueue = new import_p_queue.default({ concurrency: 1 });
    newQueue.once("idle", () => {
      this.queues.delete(key);
    });
    this.queues.set(key, newQueue);
    return newQueue;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryQueues
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5NZW1vcnlRdWV1ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcblxuZXhwb3J0IGNsYXNzIEluTWVtb3J5UXVldWVzIHtcbiAgcHJpdmF0ZSByZWFkb25seSBxdWV1ZXMgPSBuZXcgTWFwPHN0cmluZywgUFF1ZXVlPigpO1xuXG4gIGdldChrZXk6IHN0cmluZyk6IFBRdWV1ZSB7XG4gICAgY29uc3QgZXhpc3RpbmdRdWV1ZSA9IHRoaXMucXVldWVzLmdldChrZXkpO1xuICAgIGlmIChleGlzdGluZ1F1ZXVlKSB7XG4gICAgICByZXR1cm4gZXhpc3RpbmdRdWV1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdRdWV1ZSA9IG5ldyBQUXVldWUoeyBjb25jdXJyZW5jeTogMSB9KTtcbiAgICBuZXdRdWV1ZS5vbmNlKCdpZGxlJywgKCkgPT4ge1xuICAgICAgdGhpcy5xdWV1ZXMuZGVsZXRlKGtleSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnF1ZXVlcy5zZXQoa2V5LCBuZXdRdWV1ZSk7XG4gICAgcmV0dXJuIG5ld1F1ZXVlO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EscUJBQW1CO0FBRVosTUFBTSxlQUFlO0FBQUEsRUFBckI7QUFDWSxrQkFBUyxvQkFBSSxJQUFvQjtBQUFBO0FBQUEsRUFFbEQsSUFBSSxLQUFxQjtBQUN2QixVQUFNLGdCQUFnQixLQUFLLE9BQU8sSUFBSSxHQUFHO0FBQ3pDLFFBQUksZUFBZTtBQUNqQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sV0FBVyxJQUFJLHVCQUFPLEVBQUUsYUFBYSxFQUFFLENBQUM7QUFDOUMsYUFBUyxLQUFLLFFBQVEsTUFBTTtBQUMxQixXQUFLLE9BQU8sT0FBTyxHQUFHO0FBQUEsSUFDeEIsQ0FBQztBQUVELFNBQUssT0FBTyxJQUFJLEtBQUssUUFBUTtBQUM3QixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBakJPIiwKICAibmFtZXMiOiBbXQp9Cg==
