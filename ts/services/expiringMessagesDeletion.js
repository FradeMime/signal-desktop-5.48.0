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
var expiringMessagesDeletion_exports = {};
__export(expiringMessagesDeletion_exports, {
  expiringMessagesDeletionService: () => expiringMessagesDeletionService
});
module.exports = __toCommonJS(expiringMessagesDeletion_exports);
var import_lodash = require("lodash");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_sleep = require("../util/sleep");
var import_durations = require("../util/durations");
class ExpiringMessagesDeletionService {
  constructor() {
    this.update = (0, import_lodash.debounce)(this.checkExpiringMessages, 1e3);
  }
  async destroyExpiredMessages() {
    try {
      window.SignalContext.log.info("destroyExpiredMessages: Loading messages...");
      const messages = await window.Signal.Data.getExpiredMessages();
      window.SignalContext.log.info(`destroyExpiredMessages: found ${messages.length} messages to expire`);
      const messageIds = [];
      const inMemoryMessages = [];
      const messageCleanup = [];
      messages.forEach((dbMessage) => {
        const message = window.MessageController.register(dbMessage.id, dbMessage);
        messageIds.push(message.id);
        inMemoryMessages.push(message);
        messageCleanup.push(message.cleanup());
      });
      await window.Signal.Data.removeMessages(messageIds);
      await Promise.all(messageCleanup);
      inMemoryMessages.forEach((message) => {
        window.SignalContext.log.info("Message expired", {
          sentAt: message.get("sent_at")
        });
        const conversation = message.getConversation();
        message.trigger("expired");
        if (conversation) {
          conversation.decrementMessageCount();
        }
      });
    } catch (error) {
      window.SignalContext.log.error("destroyExpiredMessages: Error deleting expired messages", error && error.stack ? error.stack : error);
      window.SignalContext.log.info("destroyExpiredMessages: Waiting 30 seconds before trying again");
      await (0, import_sleep.sleep)(30 * import_durations.SECOND);
    }
    window.SignalContext.log.info("destroyExpiredMessages: done, scheduling another check");
    this.update();
  }
  async checkExpiringMessages() {
    window.SignalContext.log.info("checkExpiringMessages: checking for expiring messages");
    const soonestExpiry = await window.Signal.Data.getSoonestMessageExpiry();
    if (!soonestExpiry) {
      window.SignalContext.log.info("checkExpiringMessages: found no messages to expire");
      return;
    }
    let wait = soonestExpiry - Date.now();
    if (wait < 0) {
      wait = 0;
    }
    if (wait > 2147483647) {
      wait = 2147483647;
    }
    window.SignalContext.log.info(`checkExpiringMessages: next message expires ${new Date(soonestExpiry).toISOString()}; waiting ${wait} ms before clearing`);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.timeout);
    this.timeout = setTimeout(this.destroyExpiredMessages.bind(this), wait);
  }
}
const expiringMessagesDeletionService = new ExpiringMessagesDeletionService();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  expiringMessagesDeletionService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwaXJpbmdNZXNzYWdlc0RlbGV0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi91dGlsL3NsZWVwJztcbmltcG9ydCB7IFNFQ09ORCB9IGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcblxuY2xhc3MgRXhwaXJpbmdNZXNzYWdlc0RlbGV0aW9uU2VydmljZSB7XG4gIHB1YmxpYyB1cGRhdGU6IHR5cGVvZiB0aGlzLmNoZWNrRXhwaXJpbmdNZXNzYWdlcztcblxuICBwcml2YXRlIHRpbWVvdXQ/OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVwZGF0ZSA9IGRlYm91bmNlKHRoaXMuY2hlY2tFeHBpcmluZ01lc3NhZ2VzLCAxMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVzdHJveUV4cGlyZWRNZXNzYWdlcygpIHtcbiAgICB0cnkge1xuICAgICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oXG4gICAgICAgICdkZXN0cm95RXhwaXJlZE1lc3NhZ2VzOiBMb2FkaW5nIG1lc3NhZ2VzLi4uJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldEV4cGlyZWRNZXNzYWdlcygpO1xuICAgICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oXG4gICAgICAgIGBkZXN0cm95RXhwaXJlZE1lc3NhZ2VzOiBmb3VuZCAke21lc3NhZ2VzLmxlbmd0aH0gbWVzc2FnZXMgdG8gZXhwaXJlYFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWVzc2FnZUlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgY29uc3QgaW5NZW1vcnlNZXNzYWdlczogQXJyYXk8TWVzc2FnZU1vZGVsPiA9IFtdO1xuICAgICAgY29uc3QgbWVzc2FnZUNsZWFudXA6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XG5cbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goZGJNZXNzYWdlID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgICAgICBkYk1lc3NhZ2UuaWQsXG4gICAgICAgICAgZGJNZXNzYWdlXG4gICAgICAgICk7XG4gICAgICAgIG1lc3NhZ2VJZHMucHVzaChtZXNzYWdlLmlkKTtcbiAgICAgICAgaW5NZW1vcnlNZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICBtZXNzYWdlQ2xlYW51cC5wdXNoKG1lc3NhZ2UuY2xlYW51cCgpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXZSBkZWxldGUgYWZ0ZXIgdGhlIHRyaWdnZXIgdG8gYWxsb3cgdGhlIGNvbnZlcnNhdGlvbiB0aW1lIHRvIHByb2Nlc3NcbiAgICAgIC8vICAgdGhlIGV4cGlyYXRpb24gYmVmb3JlIHRoZSBtZXNzYWdlIGlzIHJlbW92ZWQgZnJvbSB0aGUgZGF0YWJhc2UuXG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlTWVzc2FnZXMobWVzc2FnZUlkcyk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChtZXNzYWdlQ2xlYW51cCk7XG5cbiAgICAgIGluTWVtb3J5TWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oJ01lc3NhZ2UgZXhwaXJlZCcsIHtcbiAgICAgICAgICBzZW50QXQ6IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IG1lc3NhZ2UuZ2V0Q29udmVyc2F0aW9uKCk7XG5cbiAgICAgICAgLy8gV2UgZG8gdGhpcyB0byB1cGRhdGUgdGhlIFVJLCBpZiB0aGlzIG1lc3NhZ2UgaXMgYmVpbmcgZGlzcGxheWVkIHNvbWV3aGVyZVxuICAgICAgICBtZXNzYWdlLnRyaWdnZXIoJ2V4cGlyZWQnKTtcblxuICAgICAgICBpZiAoY29udmVyc2F0aW9uKSB7XG4gICAgICAgICAgLy8gQW4gZXhwaXJlZCBtZXNzYWdlIG9ubHkgY291bnRzIGFzIGRlY3JlbWVudGluZyB0aGUgbWVzc2FnZSBjb3VudCwgbm90XG4gICAgICAgICAgLy8gdGhlIHNlbnQgbWVzc2FnZSBjb3VudFxuICAgICAgICAgIGNvbnZlcnNhdGlvbi5kZWNyZW1lbnRNZXNzYWdlQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZy5lcnJvcihcbiAgICAgICAgJ2Rlc3Ryb3lFeHBpcmVkTWVzc2FnZXM6IEVycm9yIGRlbGV0aW5nIGV4cGlyZWQgbWVzc2FnZXMnLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuaW5mbyhcbiAgICAgICAgJ2Rlc3Ryb3lFeHBpcmVkTWVzc2FnZXM6IFdhaXRpbmcgMzAgc2Vjb25kcyBiZWZvcmUgdHJ5aW5nIGFnYWluJ1xuICAgICAgKTtcbiAgICAgIGF3YWl0IHNsZWVwKDMwICogU0VDT05EKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuaW5mbyhcbiAgICAgICdkZXN0cm95RXhwaXJlZE1lc3NhZ2VzOiBkb25lLCBzY2hlZHVsaW5nIGFub3RoZXIgY2hlY2snXG4gICAgKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0V4cGlyaW5nTWVzc2FnZXMoKSB7XG4gICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oXG4gICAgICAnY2hlY2tFeHBpcmluZ01lc3NhZ2VzOiBjaGVja2luZyBmb3IgZXhwaXJpbmcgbWVzc2FnZXMnXG4gICAgKTtcblxuICAgIGNvbnN0IHNvb25lc3RFeHBpcnkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0U29vbmVzdE1lc3NhZ2VFeHBpcnkoKTtcbiAgICBpZiAoIXNvb25lc3RFeHBpcnkpIHtcbiAgICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZy5pbmZvKFxuICAgICAgICAnY2hlY2tFeHBpcmluZ01lc3NhZ2VzOiBmb3VuZCBubyBtZXNzYWdlcyB0byBleHBpcmUnXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB3YWl0ID0gc29vbmVzdEV4cGlyeSAtIERhdGUubm93KCk7XG5cbiAgICAvLyBJbiB0aGUgcGFzdFxuICAgIGlmICh3YWl0IDwgMCkge1xuICAgICAgd2FpdCA9IDA7XG4gICAgfVxuXG4gICAgLy8gVG9vIGZhciBpbiB0aGUgZnV0dXJlLCBzaW5jZSBpdCdzIGxpbWl0ZWQgdG8gYSAzMi1iaXQgdmFsdWVcbiAgICBpZiAod2FpdCA+IDIxNDc0ODM2NDcpIHtcbiAgICAgIHdhaXQgPSAyMTQ3NDgzNjQ3O1xuICAgIH1cblxuICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZy5pbmZvKFxuICAgICAgYGNoZWNrRXhwaXJpbmdNZXNzYWdlczogbmV4dCBtZXNzYWdlIGV4cGlyZXMgJHtuZXcgRGF0ZShcbiAgICAgICAgc29vbmVzdEV4cGlyeVxuICAgICAgKS50b0lTT1N0cmluZygpfTsgd2FpdGluZyAke3dhaXR9IG1zIGJlZm9yZSBjbGVhcmluZ2BcbiAgICApO1xuXG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuZGVzdHJveUV4cGlyZWRNZXNzYWdlcy5iaW5kKHRoaXMpLCB3YWl0KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZXhwaXJpbmdNZXNzYWdlc0RlbGV0aW9uU2VydmljZSA9XG4gIG5ldyBFeHBpcmluZ01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXlCO0FBR3pCLHFDQUF3QztBQUN4QyxtQkFBc0I7QUFDdEIsdUJBQXVCO0FBRXZCLE1BQU0sZ0NBQWdDO0FBQUEsRUFLcEMsY0FBYztBQUNaLFNBQUssU0FBUyw0QkFBUyxLQUFLLHVCQUF1QixHQUFJO0FBQUEsRUFDekQ7QUFBQSxRQUVjLHlCQUF5QjtBQUNyQyxRQUFJO0FBQ0YsYUFBTyxjQUFjLElBQUksS0FDdkIsNkNBQ0Y7QUFDQSxZQUFNLFdBQVcsTUFBTSxPQUFPLE9BQU8sS0FBSyxtQkFBbUI7QUFDN0QsYUFBTyxjQUFjLElBQUksS0FDdkIsaUNBQWlDLFNBQVMsMkJBQzVDO0FBRUEsWUFBTSxhQUE0QixDQUFDO0FBQ25DLFlBQU0sbUJBQXdDLENBQUM7QUFDL0MsWUFBTSxpQkFBdUMsQ0FBQztBQUU5QyxlQUFTLFFBQVEsZUFBYTtBQUM1QixjQUFNLFVBQVUsT0FBTyxrQkFBa0IsU0FDdkMsVUFBVSxJQUNWLFNBQ0Y7QUFDQSxtQkFBVyxLQUFLLFFBQVEsRUFBRTtBQUMxQix5QkFBaUIsS0FBSyxPQUFPO0FBQzdCLHVCQUFlLEtBQUssUUFBUSxRQUFRLENBQUM7QUFBQSxNQUN2QyxDQUFDO0FBSUQsWUFBTSxPQUFPLE9BQU8sS0FBSyxlQUFlLFVBQVU7QUFDbEQsWUFBTSxRQUFRLElBQUksY0FBYztBQUVoQyx1QkFBaUIsUUFBUSxhQUFXO0FBQ2xDLGVBQU8sY0FBYyxJQUFJLEtBQUssbUJBQW1CO0FBQUEsVUFDL0MsUUFBUSxRQUFRLElBQUksU0FBUztBQUFBLFFBQy9CLENBQUM7QUFFRCxjQUFNLGVBQWUsUUFBUSxnQkFBZ0I7QUFHN0MsZ0JBQVEsUUFBUSxTQUFTO0FBRXpCLFlBQUksY0FBYztBQUdoQix1QkFBYSxzQkFBc0I7QUFBQSxRQUNyQztBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsU0FBUyxPQUFQO0FBQ0EsYUFBTyxjQUFjLElBQUksTUFDdkIsMkRBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQ0EsYUFBTyxjQUFjLElBQUksS0FDdkIsZ0VBQ0Y7QUFDQSxZQUFNLHdCQUFNLEtBQUssdUJBQU07QUFBQSxJQUN6QjtBQUVBLFdBQU8sY0FBYyxJQUFJLEtBQ3ZCLHdEQUNGO0FBQ0EsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLFFBRWMsd0JBQXdCO0FBQ3BDLFdBQU8sY0FBYyxJQUFJLEtBQ3ZCLHVEQUNGO0FBRUEsVUFBTSxnQkFBZ0IsTUFBTSxPQUFPLE9BQU8sS0FBSyx3QkFBd0I7QUFDdkUsUUFBSSxDQUFDLGVBQWU7QUFDbEIsYUFBTyxjQUFjLElBQUksS0FDdkIsb0RBQ0Y7QUFDQTtBQUFBLElBQ0Y7QUFFQSxRQUFJLE9BQU8sZ0JBQWdCLEtBQUssSUFBSTtBQUdwQyxRQUFJLE9BQU8sR0FBRztBQUNaLGFBQU87QUFBQSxJQUNUO0FBR0EsUUFBSSxPQUFPLFlBQVk7QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLGNBQWMsSUFBSSxLQUN2QiwrQ0FBK0MsSUFBSSxLQUNqRCxhQUNGLEVBQUUsWUFBWSxjQUFjLHlCQUM5QjtBQUVBLGdFQUF3QixLQUFLLE9BQU87QUFDcEMsU0FBSyxVQUFVLFdBQVcsS0FBSyx1QkFBdUIsS0FBSyxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQ3hFO0FBQ0Y7QUF6R0EsQUEyR08sTUFBTSxrQ0FDWCxJQUFJLGdDQUFnQzsiLAogICJuYW1lcyI6IFtdCn0K
