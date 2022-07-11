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
var removeStorageKeyJobQueue_exports = {};
__export(removeStorageKeyJobQueue_exports, {
  RemoveStorageKeyJobQueue: () => RemoveStorageKeyJobQueue,
  removeStorageKeyJobQueue: () => removeStorageKeyJobQueue
});
module.exports = __toCommonJS(removeStorageKeyJobQueue_exports);
var import_zod = require("zod");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
const removeStorageKeyJobDataSchema = import_zod.z.object({
  key: import_zod.z.enum(["senderCertificateWithUuid", "challenge:retry-message-ids"])
});
class RemoveStorageKeyJobQueue extends import_JobQueue.JobQueue {
  parseData(data) {
    return removeStorageKeyJobDataSchema.parse(data);
  }
  async run({
    data
  }) {
    await new Promise((resolve) => {
      window.storage.onready(resolve);
    });
    await window.storage.remove(data.key);
  }
}
const removeStorageKeyJobQueue = new RemoveStorageKeyJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "remove storage key",
  maxAttempts: 100
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveStorageKeyJobQueue,
  removeStorageKeyJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVtb3ZlU3RvcmFnZUtleUpvYlF1ZXVlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xuXG5pbXBvcnQgeyBKb2JRdWV1ZSB9IGZyb20gJy4vSm9iUXVldWUnO1xuaW1wb3J0IHsgam9iUXVldWVEYXRhYmFzZVN0b3JlIH0gZnJvbSAnLi9Kb2JRdWV1ZURhdGFiYXNlU3RvcmUnO1xuXG5jb25zdCByZW1vdmVTdG9yYWdlS2V5Sm9iRGF0YVNjaGVtYSA9IHoub2JqZWN0KHtcbiAga2V5OiB6LmVudW0oWydzZW5kZXJDZXJ0aWZpY2F0ZVdpdGhVdWlkJywgJ2NoYWxsZW5nZTpyZXRyeS1tZXNzYWdlLWlkcyddKSxcbn0pO1xuXG50eXBlIFJlbW92ZVN0b3JhZ2VLZXlKb2JEYXRhID0gei5pbmZlcjx0eXBlb2YgcmVtb3ZlU3RvcmFnZUtleUpvYkRhdGFTY2hlbWE+O1xuXG5leHBvcnQgY2xhc3MgUmVtb3ZlU3RvcmFnZUtleUpvYlF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8UmVtb3ZlU3RvcmFnZUtleUpvYkRhdGE+IHtcbiAgcHJvdGVjdGVkIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogUmVtb3ZlU3RvcmFnZUtleUpvYkRhdGEge1xuICAgIHJldHVybiByZW1vdmVTdG9yYWdlS2V5Sm9iRGF0YVNjaGVtYS5wYXJzZShkYXRhKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBydW4oe1xuICAgIGRhdGEsXG4gIH06IFJlYWRvbmx5PHsgZGF0YTogUmVtb3ZlU3RvcmFnZUtleUpvYkRhdGEgfT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLm9ucmVhZHkocmVzb2x2ZSk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5yZW1vdmUoZGF0YS5rZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdG9yYWdlS2V5Sm9iUXVldWUgPSBuZXcgUmVtb3ZlU3RvcmFnZUtleUpvYlF1ZXVlKHtcbiAgc3RvcmU6IGpvYlF1ZXVlRGF0YWJhc2VTdG9yZSxcbiAgcXVldWVUeXBlOiAncmVtb3ZlIHN0b3JhZ2Uga2V5JyxcbiAgbWF4QXR0ZW1wdHM6IDEwMCxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQWtCO0FBRWxCLHNCQUF5QjtBQUN6QixtQ0FBc0M7QUFFdEMsTUFBTSxnQ0FBZ0MsYUFBRSxPQUFPO0FBQUEsRUFDN0MsS0FBSyxhQUFFLEtBQUssQ0FBQyw2QkFBNkIsNkJBQTZCLENBQUM7QUFDMUUsQ0FBQztBQUlNLE1BQU0saUNBQWlDLHlCQUFrQztBQUFBLEVBQ3BFLFVBQVUsTUFBd0M7QUFDMUQsV0FBTyw4QkFBOEIsTUFBTSxJQUFJO0FBQUEsRUFDakQ7QUFBQSxRQUVnQixJQUFJO0FBQUEsSUFDbEI7QUFBQSxLQUM2RDtBQUM3RCxVQUFNLElBQUksUUFBYyxhQUFXO0FBQ2pDLGFBQU8sUUFBUSxRQUFRLE9BQU87QUFBQSxJQUNoQyxDQUFDO0FBRUQsVUFBTSxPQUFPLFFBQVEsT0FBTyxLQUFLLEdBQUc7QUFBQSxFQUN0QztBQUNGO0FBZE8sQUFnQkEsTUFBTSwyQkFBMkIsSUFBSSx5QkFBeUI7QUFBQSxFQUNuRSxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQ2YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
