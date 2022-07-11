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
var tapToViewMessagesDeletionService_exports = {};
__export(tapToViewMessagesDeletionService_exports, {
  tapToViewMessagesDeletionService: () => tapToViewMessagesDeletionService
});
module.exports = __toCommonJS(tapToViewMessagesDeletionService_exports);
var import_lodash = require("lodash");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_durations = require("../util/durations");
async function eraseTapToViewMessages() {
  try {
    window.SignalContext.log.info("eraseTapToViewMessages: Loading messages...");
    const messages = await window.Signal.Data.getTapToViewMessagesNeedingErase();
    await Promise.all(messages.map(async (fromDB) => {
      const message = window.MessageController.register(fromDB.id, fromDB);
      window.SignalContext.log.info("eraseTapToViewMessages: erasing message contents", message.idForLogging());
      message.trigger("expired");
      await message.eraseContents();
    }));
  } catch (error) {
    window.SignalContext.log.error("eraseTapToViewMessages: Error erasing messages", error && error.stack ? error.stack : error);
  }
  window.SignalContext.log.info("eraseTapToViewMessages: complete");
}
class TapToViewMessagesDeletionService {
  constructor() {
    this.update = (0, import_lodash.debounce)(this.checkTapToViewMessages, 1e3);
  }
  async checkTapToViewMessages() {
    const receivedAt = await window.Signal.Data.getNextTapToViewMessageTimestampToAgeOut();
    if (!receivedAt) {
      return;
    }
    const nextCheck = receivedAt + 30 * import_durations.DAY;
    window.SignalContext.log.info("checkTapToViewMessages: next check at", new Date(nextCheck).toISOString());
    let wait = nextCheck - Date.now();
    if (wait < 0) {
      wait = 0;
    }
    if (wait > 2147483647) {
      wait = 2147483647;
    }
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.timeout);
    this.timeout = setTimeout(async () => {
      await eraseTapToViewMessages();
      this.update();
    }, wait);
  }
}
const tapToViewMessagesDeletionService = new TapToViewMessagesDeletionService();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tapToViewMessagesDeletionService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGFwVG9WaWV3TWVzc2FnZXNEZWxldGlvblNlcnZpY2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuaW1wb3J0IHsgREFZIH0gZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5hc3luYyBmdW5jdGlvbiBlcmFzZVRhcFRvVmlld01lc3NhZ2VzKCkge1xuICB0cnkge1xuICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZy5pbmZvKFxuICAgICAgJ2VyYXNlVGFwVG9WaWV3TWVzc2FnZXM6IExvYWRpbmcgbWVzc2FnZXMuLi4nXG4gICAgKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0VGFwVG9WaWV3TWVzc2FnZXNOZWVkaW5nRXJhc2UoKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIG1lc3NhZ2VzLm1hcChhc3luYyBmcm9tREIgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKGZyb21EQi5pZCwgZnJvbURCKTtcblxuICAgICAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuaW5mbyhcbiAgICAgICAgICAnZXJhc2VUYXBUb1ZpZXdNZXNzYWdlczogZXJhc2luZyBtZXNzYWdlIGNvbnRlbnRzJyxcbiAgICAgICAgICBtZXNzYWdlLmlkRm9yTG9nZ2luZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gV2UgZG8gdGhpcyB0byB1cGRhdGUgdGhlIFVJLCBpZiB0aGlzIG1lc3NhZ2UgaXMgYmVpbmcgZGlzcGxheWVkIHNvbWV3aGVyZVxuICAgICAgICBtZXNzYWdlLnRyaWdnZXIoJ2V4cGlyZWQnKTtcblxuICAgICAgICBhd2FpdCBtZXNzYWdlLmVyYXNlQ29udGVudHMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuZXJyb3IoXG4gICAgICAnZXJhc2VUYXBUb1ZpZXdNZXNzYWdlczogRXJyb3IgZXJhc2luZyBtZXNzYWdlcycsXG4gICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICApO1xuICB9XG5cbiAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oJ2VyYXNlVGFwVG9WaWV3TWVzc2FnZXM6IGNvbXBsZXRlJyk7XG59XG5cbmNsYXNzIFRhcFRvVmlld01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHVwZGF0ZTogdHlwZW9mIHRoaXMuY2hlY2tUYXBUb1ZpZXdNZXNzYWdlcztcblxuICBwcml2YXRlIHRpbWVvdXQ/OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVwZGF0ZSA9IGRlYm91bmNlKHRoaXMuY2hlY2tUYXBUb1ZpZXdNZXNzYWdlcywgMTAwMCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoZWNrVGFwVG9WaWV3TWVzc2FnZXMoKSB7XG4gICAgY29uc3QgcmVjZWl2ZWRBdCA9XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TmV4dFRhcFRvVmlld01lc3NhZ2VUaW1lc3RhbXBUb0FnZU91dCgpO1xuICAgIGlmICghcmVjZWl2ZWRBdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRDaGVjayA9IHJlY2VpdmVkQXQgKyAzMCAqIERBWTtcbiAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuaW5mbyhcbiAgICAgICdjaGVja1RhcFRvVmlld01lc3NhZ2VzOiBuZXh0IGNoZWNrIGF0JyxcbiAgICAgIG5ldyBEYXRlKG5leHRDaGVjaykudG9JU09TdHJpbmcoKVxuICAgICk7XG5cbiAgICBsZXQgd2FpdCA9IG5leHRDaGVjayAtIERhdGUubm93KCk7XG5cbiAgICAvLyBJbiB0aGUgcGFzdFxuICAgIGlmICh3YWl0IDwgMCkge1xuICAgICAgd2FpdCA9IDA7XG4gICAgfVxuXG4gICAgLy8gVG9vIGZhciBpbiB0aGUgZnV0dXJlLCBzaW5jZSBpdCdzIGxpbWl0ZWQgdG8gYSAzMi1iaXQgdmFsdWVcbiAgICBpZiAod2FpdCA+IDIxNDc0ODM2NDcpIHtcbiAgICAgIHdhaXQgPSAyMTQ3NDgzNjQ3O1xuICAgIH1cblxuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBlcmFzZVRhcFRvVmlld01lc3NhZ2VzKCk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sIHdhaXQpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0YXBUb1ZpZXdNZXNzYWdlc0RlbGV0aW9uU2VydmljZSA9XG4gIG5ldyBUYXBUb1ZpZXdNZXNzYWdlc0RlbGV0aW9uU2VydmljZSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUN6QixxQ0FBd0M7QUFDeEMsdUJBQW9CO0FBRXBCLHdDQUF3QztBQUN0QyxNQUFJO0FBQ0YsV0FBTyxjQUFjLElBQUksS0FDdkIsNkNBQ0Y7QUFDQSxVQUFNLFdBQ0osTUFBTSxPQUFPLE9BQU8sS0FBSyxpQ0FBaUM7QUFDNUQsVUFBTSxRQUFRLElBQ1osU0FBUyxJQUFJLE9BQU0sV0FBVTtBQUMzQixZQUFNLFVBQVUsT0FBTyxrQkFBa0IsU0FBUyxPQUFPLElBQUksTUFBTTtBQUVuRSxhQUFPLGNBQWMsSUFBSSxLQUN2QixvREFDQSxRQUFRLGFBQWEsQ0FDdkI7QUFHQSxjQUFRLFFBQVEsU0FBUztBQUV6QixZQUFNLFFBQVEsY0FBYztBQUFBLElBQzlCLENBQUMsQ0FDSDtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsV0FBTyxjQUFjLElBQUksTUFDdkIsa0RBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsRUFDRjtBQUVBLFNBQU8sY0FBYyxJQUFJLEtBQUssa0NBQWtDO0FBQ2xFO0FBOUJlLEFBZ0NmLE1BQU0saUNBQWlDO0FBQUEsRUFLckMsY0FBYztBQUNaLFNBQUssU0FBUyw0QkFBUyxLQUFLLHdCQUF3QixHQUFJO0FBQUEsRUFDMUQ7QUFBQSxRQUVjLHlCQUF5QjtBQUNyQyxVQUFNLGFBQ0osTUFBTSxPQUFPLE9BQU8sS0FBSyx5Q0FBeUM7QUFDcEUsUUFBSSxDQUFDLFlBQVk7QUFDZjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFlBQVksYUFBYSxLQUFLO0FBQ3BDLFdBQU8sY0FBYyxJQUFJLEtBQ3ZCLHlDQUNBLElBQUksS0FBSyxTQUFTLEVBQUUsWUFBWSxDQUNsQztBQUVBLFFBQUksT0FBTyxZQUFZLEtBQUssSUFBSTtBQUdoQyxRQUFJLE9BQU8sR0FBRztBQUNaLGFBQU87QUFBQSxJQUNUO0FBR0EsUUFBSSxPQUFPLFlBQVk7QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFFQSxnRUFBd0IsS0FBSyxPQUFPO0FBQ3BDLFNBQUssVUFBVSxXQUFXLFlBQVk7QUFDcEMsWUFBTSx1QkFBdUI7QUFDN0IsV0FBSyxPQUFPO0FBQUEsSUFDZCxHQUFHLElBQUk7QUFBQSxFQUNUO0FBQ0Y7QUF4Q0EsQUEwQ08sTUFBTSxtQ0FDWCxJQUFJLGlDQUFpQzsiLAogICJuYW1lcyI6IFtdCn0K
