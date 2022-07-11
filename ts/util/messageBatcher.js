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
var messageBatcher_exports = {};
__export(messageBatcher_exports, {
  queueUpdateMessage: () => queueUpdateMessage,
  saveNewMessageBatcher: () => saveNewMessageBatcher,
  setBatchingStrategy: () => setBatchingStrategy
});
module.exports = __toCommonJS(messageBatcher_exports);
var import_batcher = require("./batcher");
var import_waitBatcher = require("./waitBatcher");
var log = __toESM(require("../logging/log"));
const updateMessageBatcher = (0, import_batcher.createBatcher)({
  name: "messageBatcher.updateMessageBatcher",
  wait: 75,
  maxSize: 50,
  processBatch: async (messageAttrs) => {
    log.info("updateMessageBatcher", messageAttrs.length);
    await window.Signal.Data.saveMessages(messageAttrs, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
  }
});
let shouldBatch = true;
function queueUpdateMessage(messageAttr) {
  if (shouldBatch) {
    updateMessageBatcher.add(messageAttr);
  } else {
    window.Signal.Data.saveMessage(messageAttr, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
  }
}
function setBatchingStrategy(keepBatching = false) {
  shouldBatch = keepBatching;
}
const saveNewMessageBatcher = (0, import_waitBatcher.createWaitBatcher)({
  name: "messageBatcher.saveNewMessageBatcher",
  wait: 75,
  maxSize: 30,
  processBatch: async (messageAttrs) => {
    log.info("saveNewMessageBatcher", messageAttrs.length);
    await window.Signal.Data.saveMessages(messageAttrs, {
      forceSave: true,
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  queueUpdateMessage,
  saveNewMessageBatcher,
  setBatchingStrategy
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZUJhdGNoZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IGNyZWF0ZUJhdGNoZXIgfSBmcm9tICcuL2JhdGNoZXInO1xuaW1wb3J0IHsgY3JlYXRlV2FpdEJhdGNoZXIgfSBmcm9tICcuL3dhaXRCYXRjaGVyJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmNvbnN0IHVwZGF0ZU1lc3NhZ2VCYXRjaGVyID0gY3JlYXRlQmF0Y2hlcjxNZXNzYWdlQXR0cmlidXRlc1R5cGU+KHtcbiAgbmFtZTogJ21lc3NhZ2VCYXRjaGVyLnVwZGF0ZU1lc3NhZ2VCYXRjaGVyJyxcbiAgd2FpdDogNzUsXG4gIG1heFNpemU6IDUwLFxuICBwcm9jZXNzQmF0Y2g6IGFzeW5jIChtZXNzYWdlQXR0cnM6IEFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4pID0+IHtcbiAgICBsb2cuaW5mbygndXBkYXRlTWVzc2FnZUJhdGNoZXInLCBtZXNzYWdlQXR0cnMubGVuZ3RoKTtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2VzKG1lc3NhZ2VBdHRycywge1xuICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5sZXQgc2hvdWxkQmF0Y2ggPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gcXVldWVVcGRhdGVNZXNzYWdlKG1lc3NhZ2VBdHRyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUpOiB2b2lkIHtcbiAgaWYgKHNob3VsZEJhdGNoKSB7XG4gICAgdXBkYXRlTWVzc2FnZUJhdGNoZXIuYWRkKG1lc3NhZ2VBdHRyKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZUF0dHIsIHtcbiAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEJhdGNoaW5nU3RyYXRlZ3koa2VlcEJhdGNoaW5nID0gZmFsc2UpOiB2b2lkIHtcbiAgc2hvdWxkQmF0Y2ggPSBrZWVwQmF0Y2hpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBzYXZlTmV3TWVzc2FnZUJhdGNoZXIgPSBjcmVhdGVXYWl0QmF0Y2hlcjxNZXNzYWdlQXR0cmlidXRlc1R5cGU+KHtcbiAgbmFtZTogJ21lc3NhZ2VCYXRjaGVyLnNhdmVOZXdNZXNzYWdlQmF0Y2hlcicsXG4gIHdhaXQ6IDc1LFxuICBtYXhTaXplOiAzMCxcbiAgcHJvY2Vzc0JhdGNoOiBhc3luYyAobWVzc2FnZUF0dHJzOiBBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+KSA9PiB7XG4gICAgbG9nLmluZm8oJ3NhdmVOZXdNZXNzYWdlQmF0Y2hlcicsIG1lc3NhZ2VBdHRycy5sZW5ndGgpO1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZXMobWVzc2FnZUF0dHJzLCB7XG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgIH0pO1xuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLHFCQUE4QjtBQUM5Qix5QkFBa0M7QUFDbEMsVUFBcUI7QUFFckIsTUFBTSx1QkFBdUIsa0NBQXFDO0FBQUEsRUFDaEUsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsY0FBYyxPQUFPLGlCQUErQztBQUNsRSxRQUFJLEtBQUssd0JBQXdCLGFBQWEsTUFBTTtBQUNwRCxVQUFNLE9BQU8sT0FBTyxLQUFLLGFBQWEsY0FBYztBQUFBLE1BQ2xELFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQztBQUVELElBQUksY0FBYztBQUVYLDRCQUE0QixhQUEwQztBQUMzRSxNQUFJLGFBQWE7QUFDZix5QkFBcUIsSUFBSSxXQUFXO0FBQUEsRUFDdEMsT0FBTztBQUNMLFdBQU8sT0FBTyxLQUFLLFlBQVksYUFBYTtBQUFBLE1BQzFDLFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFSZ0IsQUFVVCw2QkFBNkIsZUFBZSxPQUFhO0FBQzlELGdCQUFjO0FBQ2hCO0FBRmdCLEFBSVQsTUFBTSx3QkFBd0IsMENBQXlDO0FBQUEsRUFDNUUsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsY0FBYyxPQUFPLGlCQUErQztBQUNsRSxRQUFJLEtBQUsseUJBQXlCLGFBQWEsTUFBTTtBQUNyRCxVQUFNLE9BQU8sT0FBTyxLQUFLLGFBQWEsY0FBYztBQUFBLE1BQ2xELFdBQVc7QUFBQSxNQUNYLFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
