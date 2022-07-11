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
var JobQueue_exports = {};
__export(JobQueue_exports, {
  storageJobQueue: () => storageJobQueue
});
module.exports = __toCommonJS(JobQueue_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_TaskWithTimeout = __toESM(require("../textsecure/TaskWithTimeout"));
function createJobQueue(label) {
  const jobQueue = new import_p_queue.default({ concurrency: 1 });
  return (job, id = "") => {
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(job, `${label} ${id}`);
    return jobQueue.add(taskWithTimeout);
  };
}
const storageJobQueue = createJobQueue("storageService");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  storageJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iUXVldWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCBjcmVhdGVUYXNrV2l0aFRpbWVvdXQgZnJvbSAnLi4vdGV4dHNlY3VyZS9UYXNrV2l0aFRpbWVvdXQnO1xuXG5mdW5jdGlvbiBjcmVhdGVKb2JRdWV1ZShsYWJlbDogc3RyaW5nKSB7XG4gIGNvbnN0IGpvYlF1ZXVlID0gbmV3IFBRdWV1ZSh7IGNvbmN1cnJlbmN5OiAxIH0pO1xuXG4gIHJldHVybiAoam9iOiAoKSA9PiBQcm9taXNlPHZvaWQ+LCBpZCA9ICcnKSA9PiB7XG4gICAgY29uc3QgdGFza1dpdGhUaW1lb3V0ID0gY3JlYXRlVGFza1dpdGhUaW1lb3V0KGpvYiwgYCR7bGFiZWx9ICR7aWR9YCk7XG5cbiAgICByZXR1cm4gam9iUXVldWUuYWRkKHRhc2tXaXRoVGltZW91dCk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yYWdlSm9iUXVldWUgPSBjcmVhdGVKb2JRdWV1ZSgnc3RvcmFnZVNlcnZpY2UnKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxxQkFBbUI7QUFDbkIsNkJBQWtDO0FBRWxDLHdCQUF3QixPQUFlO0FBQ3JDLFFBQU0sV0FBVyxJQUFJLHVCQUFPLEVBQUUsYUFBYSxFQUFFLENBQUM7QUFFOUMsU0FBTyxDQUFDLEtBQTBCLEtBQUssT0FBTztBQUM1QyxVQUFNLGtCQUFrQixvQ0FBc0IsS0FBSyxHQUFHLFNBQVMsSUFBSTtBQUVuRSxXQUFPLFNBQVMsSUFBSSxlQUFlO0FBQUEsRUFDckM7QUFDRjtBQVJTLEFBVUYsTUFBTSxrQkFBa0IsZUFBZSxnQkFBZ0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
