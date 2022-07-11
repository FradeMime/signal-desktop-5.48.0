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
var ViewOnceOpenSyncs_exports = {};
__export(ViewOnceOpenSyncs_exports, {
  ViewOnceOpenSyncs: () => ViewOnceOpenSyncs
});
module.exports = __toCommonJS(ViewOnceOpenSyncs_exports);
var import_backbone = require("backbone");
var log = __toESM(require("../logging/log"));
class ViewOnceOpenSyncModel extends import_backbone.Model {
}
let singleton;
class ViewOnceOpenSyncs extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new ViewOnceOpenSyncs();
    }
    return singleton;
  }
  forMessage(message) {
    const syncBySourceUuid = this.find((item) => {
      return item.get("sourceUuid") === message.get("sourceUuid") && item.get("timestamp") === message.get("sent_at");
    });
    if (syncBySourceUuid) {
      log.info("Found early view once open sync for message");
      this.remove(syncBySourceUuid);
      return syncBySourceUuid;
    }
    const syncBySource = this.find((item) => {
      return item.get("source") === message.get("source") && item.get("timestamp") === message.get("sent_at");
    });
    if (syncBySource) {
      log.info("Found early view once open sync for message");
      this.remove(syncBySource);
      return syncBySource;
    }
    return null;
  }
  async onSync(sync) {
    try {
      const messages = await window.Signal.Data.getMessagesBySentAt(sync.get("timestamp"));
      const found = messages.find((item) => {
        const itemSourceUuid = item.sourceUuid;
        const syncSourceUuid2 = sync.get("sourceUuid");
        const itemSource = item.source;
        const syncSource2 = sync.get("source");
        return Boolean(itemSourceUuid && syncSourceUuid2 && itemSourceUuid === syncSourceUuid2 || itemSource && syncSource2 && itemSource === syncSource2);
      });
      const syncSource = sync.get("source");
      const syncSourceUuid = sync.get("sourceUuid");
      const syncTimestamp = sync.get("timestamp");
      const wasMessageFound = Boolean(found);
      log.info("Receive view once open sync:", {
        syncSource,
        syncSourceUuid,
        syncTimestamp,
        wasMessageFound
      });
      if (!found) {
        return;
      }
      const message = window.MessageController.register(found.id, found);
      await message.markViewOnceMessageViewed({ fromSync: true });
      this.remove(sync);
    } catch (error) {
      log.error("ViewOnceOpenSyncs.onSync error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewOnceOpenSyncs
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVmlld09uY2VPcGVuU3luY3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uLCBNb2RlbCB9IGZyb20gJ2JhY2tib25lJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21lc3NhZ2VzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCB0eXBlIFZpZXdPbmNlT3BlblN5bmNBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgc291cmNlPzogc3RyaW5nO1xuICBzb3VyY2VVdWlkOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcblxuY2xhc3MgVmlld09uY2VPcGVuU3luY01vZGVsIGV4dGVuZHMgTW9kZWw8Vmlld09uY2VPcGVuU3luY0F0dHJpYnV0ZXNUeXBlPiB7fVxuXG5sZXQgc2luZ2xldG9uOiBWaWV3T25jZU9wZW5TeW5jcyB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNsYXNzIFZpZXdPbmNlT3BlblN5bmNzIGV4dGVuZHMgQ29sbGVjdGlvbjxWaWV3T25jZU9wZW5TeW5jTW9kZWw+IHtcbiAgc3RhdGljIGdldFNpbmdsZXRvbigpOiBWaWV3T25jZU9wZW5TeW5jcyB7XG4gICAgaWYgKCFzaW5nbGV0b24pIHtcbiAgICAgIHNpbmdsZXRvbiA9IG5ldyBWaWV3T25jZU9wZW5TeW5jcygpO1xuICAgIH1cblxuICAgIHJldHVybiBzaW5nbGV0b247XG4gIH1cblxuICBmb3JNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCk6IFZpZXdPbmNlT3BlblN5bmNNb2RlbCB8IG51bGwge1xuICAgIGNvbnN0IHN5bmNCeVNvdXJjZVV1aWQgPSB0aGlzLmZpbmQoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpdGVtLmdldCgnc291cmNlVXVpZCcpID09PSBtZXNzYWdlLmdldCgnc291cmNlVXVpZCcpICYmXG4gICAgICAgIGl0ZW0uZ2V0KCd0aW1lc3RhbXAnKSA9PT0gbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBpZiAoc3luY0J5U291cmNlVXVpZCkge1xuICAgICAgbG9nLmluZm8oJ0ZvdW5kIGVhcmx5IHZpZXcgb25jZSBvcGVuIHN5bmMgZm9yIG1lc3NhZ2UnKTtcbiAgICAgIHRoaXMucmVtb3ZlKHN5bmNCeVNvdXJjZVV1aWQpO1xuICAgICAgcmV0dXJuIHN5bmNCeVNvdXJjZVV1aWQ7XG4gICAgfVxuXG4gICAgY29uc3Qgc3luY0J5U291cmNlID0gdGhpcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaXRlbS5nZXQoJ3NvdXJjZScpID09PSBtZXNzYWdlLmdldCgnc291cmNlJykgJiZcbiAgICAgICAgaXRlbS5nZXQoJ3RpbWVzdGFtcCcpID09PSBtZXNzYWdlLmdldCgnc2VudF9hdCcpXG4gICAgICApO1xuICAgIH0pO1xuICAgIGlmIChzeW5jQnlTb3VyY2UpIHtcbiAgICAgIGxvZy5pbmZvKCdGb3VuZCBlYXJseSB2aWV3IG9uY2Ugb3BlbiBzeW5jIGZvciBtZXNzYWdlJyk7XG4gICAgICB0aGlzLnJlbW92ZShzeW5jQnlTb3VyY2UpO1xuICAgICAgcmV0dXJuIHN5bmNCeVNvdXJjZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIG9uU3luYyhzeW5jOiBWaWV3T25jZU9wZW5TeW5jTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNCeVNlbnRBdChcbiAgICAgICAgc3luYy5nZXQoJ3RpbWVzdGFtcCcpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBmb3VuZCA9IG1lc3NhZ2VzLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1Tb3VyY2VVdWlkID0gaXRlbS5zb3VyY2VVdWlkO1xuICAgICAgICBjb25zdCBzeW5jU291cmNlVXVpZCA9IHN5bmMuZ2V0KCdzb3VyY2VVdWlkJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1Tb3VyY2UgPSBpdGVtLnNvdXJjZTtcbiAgICAgICAgY29uc3Qgc3luY1NvdXJjZSA9IHN5bmMuZ2V0KCdzb3VyY2UnKTtcblxuICAgICAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgICAgICAoaXRlbVNvdXJjZVV1aWQgJiZcbiAgICAgICAgICAgIHN5bmNTb3VyY2VVdWlkICYmXG4gICAgICAgICAgICBpdGVtU291cmNlVXVpZCA9PT0gc3luY1NvdXJjZVV1aWQpIHx8XG4gICAgICAgICAgICAoaXRlbVNvdXJjZSAmJiBzeW5jU291cmNlICYmIGl0ZW1Tb3VyY2UgPT09IHN5bmNTb3VyY2UpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc3luY1NvdXJjZSA9IHN5bmMuZ2V0KCdzb3VyY2UnKTtcbiAgICAgIGNvbnN0IHN5bmNTb3VyY2VVdWlkID0gc3luYy5nZXQoJ3NvdXJjZVV1aWQnKTtcbiAgICAgIGNvbnN0IHN5bmNUaW1lc3RhbXAgPSBzeW5jLmdldCgndGltZXN0YW1wJyk7XG4gICAgICBjb25zdCB3YXNNZXNzYWdlRm91bmQgPSBCb29sZWFuKGZvdW5kKTtcbiAgICAgIGxvZy5pbmZvKCdSZWNlaXZlIHZpZXcgb25jZSBvcGVuIHN5bmM6Jywge1xuICAgICAgICBzeW5jU291cmNlLFxuICAgICAgICBzeW5jU291cmNlVXVpZCxcbiAgICAgICAgc3luY1RpbWVzdGFtcCxcbiAgICAgICAgd2FzTWVzc2FnZUZvdW5kLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKGZvdW5kLmlkLCBmb3VuZCk7XG4gICAgICBhd2FpdCBtZXNzYWdlLm1hcmtWaWV3T25jZU1lc3NhZ2VWaWV3ZWQoeyBmcm9tU3luYzogdHJ1ZSB9KTtcblxuICAgICAgdGhpcy5yZW1vdmUoc3luYyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ1ZpZXdPbmNlT3BlblN5bmNzLm9uU3luYyBlcnJvcjonLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0Esc0JBQWtDO0FBRWxDLFVBQXFCO0FBUXJCLE1BQU0sOEJBQThCLHNCQUFzQztBQUFDO0FBQTNFLEFBRUEsSUFBSTtBQUVHLE1BQU0sMEJBQTBCLDJCQUFrQztBQUFBLFNBQ2hFLGVBQWtDO0FBQ3ZDLFFBQUksQ0FBQyxXQUFXO0FBQ2Qsa0JBQVksSUFBSSxrQkFBa0I7QUFBQSxJQUNwQztBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxXQUFXLFNBQXFEO0FBQzlELFVBQU0sbUJBQW1CLEtBQUssS0FBSyxVQUFRO0FBQ3pDLGFBQ0UsS0FBSyxJQUFJLFlBQVksTUFBTSxRQUFRLElBQUksWUFBWSxLQUNuRCxLQUFLLElBQUksV0FBVyxNQUFNLFFBQVEsSUFBSSxTQUFTO0FBQUEsSUFFbkQsQ0FBQztBQUNELFFBQUksa0JBQWtCO0FBQ3BCLFVBQUksS0FBSyw2Q0FBNkM7QUFDdEQsV0FBSyxPQUFPLGdCQUFnQjtBQUM1QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZUFBZSxLQUFLLEtBQUssVUFBUTtBQUNyQyxhQUNFLEtBQUssSUFBSSxRQUFRLE1BQU0sUUFBUSxJQUFJLFFBQVEsS0FDM0MsS0FBSyxJQUFJLFdBQVcsTUFBTSxRQUFRLElBQUksU0FBUztBQUFBLElBRW5ELENBQUM7QUFDRCxRQUFJLGNBQWM7QUFDaEIsVUFBSSxLQUFLLDZDQUE2QztBQUN0RCxXQUFLLE9BQU8sWUFBWTtBQUN4QixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsUUFFTSxPQUFPLE1BQTRDO0FBQ3ZELFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxPQUFPLE9BQU8sS0FBSyxvQkFDeEMsS0FBSyxJQUFJLFdBQVcsQ0FDdEI7QUFFQSxZQUFNLFFBQVEsU0FBUyxLQUFLLFVBQVE7QUFDbEMsY0FBTSxpQkFBaUIsS0FBSztBQUM1QixjQUFNLGtCQUFpQixLQUFLLElBQUksWUFBWTtBQUM1QyxjQUFNLGFBQWEsS0FBSztBQUN4QixjQUFNLGNBQWEsS0FBSyxJQUFJLFFBQVE7QUFFcEMsZUFBTyxRQUNKLGtCQUNDLG1CQUNBLG1CQUFtQixtQkFDbEIsY0FBYyxlQUFjLGVBQWUsV0FDaEQ7QUFBQSxNQUNGLENBQUM7QUFFRCxZQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7QUFDcEMsWUFBTSxpQkFBaUIsS0FBSyxJQUFJLFlBQVk7QUFDNUMsWUFBTSxnQkFBZ0IsS0FBSyxJQUFJLFdBQVc7QUFDMUMsWUFBTSxrQkFBa0IsUUFBUSxLQUFLO0FBQ3JDLFVBQUksS0FBSyxnQ0FBZ0M7QUFBQSxRQUN2QztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUVELFVBQUksQ0FBQyxPQUFPO0FBQ1Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLE9BQU8sa0JBQWtCLFNBQVMsTUFBTSxJQUFJLEtBQUs7QUFDakUsWUFBTSxRQUFRLDBCQUEwQixFQUFFLFVBQVUsS0FBSyxDQUFDO0FBRTFELFdBQUssT0FBTyxJQUFJO0FBQUEsSUFDbEIsU0FBUyxPQUFQO0FBQ0EsVUFBSSxNQUNGLG1DQUNBLFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUN2QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFuRk8iLAogICJuYW1lcyI6IFtdCn0K
