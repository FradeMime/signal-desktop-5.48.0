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
var MessageController_exports = {};
__export(MessageController_exports, {
  MessageController: () => MessageController
});
module.exports = __toCommonJS(MessageController_exports);
var durations = __toESM(require("./durations"));
var import_iterables = require("./iterables");
var import_isNotNil = require("./isNotNil");
var import_RemoteConfig = require("../RemoteConfig");
const FIVE_MINUTES = 5 * durations.MINUTE;
class MessageController {
  constructor() {
    this.messageLookup = /* @__PURE__ */ Object.create(null);
    this.msgIDsBySender = /* @__PURE__ */ new Map();
    this.msgIDsBySentAt = /* @__PURE__ */ new Map();
  }
  static install() {
    const instance = new MessageController();
    window.MessageController = instance;
    instance.startCleanupInterval();
    return instance;
  }
  register(id, data) {
    if (!id || !data) {
      throw new Error("MessageController.register: Got falsey id or message");
    }
    const existing = this.messageLookup[id];
    if (existing) {
      this.messageLookup[id] = {
        message: existing.message,
        timestamp: Date.now()
      };
      return existing.message;
    }
    const message = "attributes" in data ? data : new window.Whisper.Message(data);
    this.messageLookup[id] = {
      message,
      timestamp: Date.now()
    };
    const sentAt = message.get("sent_at");
    const previousIdsBySentAt = this.msgIDsBySentAt.get(sentAt);
    if (previousIdsBySentAt) {
      previousIdsBySentAt.add(id);
    } else {
      this.msgIDsBySentAt.set(sentAt, /* @__PURE__ */ new Set([id]));
    }
    this.msgIDsBySender.set(message.getSenderIdentifier(), id);
    return message;
  }
  unregister(id) {
    const { message } = this.messageLookup[id] || {};
    if (message) {
      this.msgIDsBySender.delete(message.getSenderIdentifier());
      const sentAt = message.get("sent_at");
      const idsBySentAt = this.msgIDsBySentAt.get(sentAt) || /* @__PURE__ */ new Set();
      idsBySentAt.delete(id);
      if (!idsBySentAt.size) {
        this.msgIDsBySentAt.delete(sentAt);
      }
    }
    delete this.messageLookup[id];
  }
  cleanup() {
    const messages = Object.values(this.messageLookup);
    const now = Date.now();
    for (let i = 0, max = messages.length; i < max; i += 1) {
      const { message, timestamp } = messages[i];
      const conversation = message.getConversation();
      const state = window.reduxStore.getState();
      const selectedId = state?.conversations?.selectedConversationId;
      const inActiveConversation = conversation && selectedId && conversation.id === selectedId;
      if (now - timestamp > FIVE_MINUTES && !inActiveConversation) {
        this.unregister(message.id);
      }
    }
  }
  getById(id) {
    const existing = this.messageLookup[id];
    return existing && existing.message ? existing.message : void 0;
  }
  filterBySentAt(sentAt) {
    const ids = this.msgIDsBySentAt.get(sentAt) || [];
    const maybeMessages = (0, import_iterables.map)(ids, (id) => this.getById(id));
    return (0, import_iterables.filter)(maybeMessages, import_isNotNil.isNotNil);
  }
  findBySender(sender) {
    const id = this.msgIDsBySender.get(sender);
    if (!id) {
      return void 0;
    }
    return this.getById(id);
  }
  _get() {
    return this.messageLookup;
  }
  startCleanupInterval() {
    return setInterval(this.cleanup.bind(this), (0, import_RemoteConfig.isEnabled)("desktop.messageCleanup") ? FIVE_MINUTES : durations.HOUR);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageController
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUNvbnRyb2xsZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIgfSBmcm9tICcuL2l0ZXJhYmxlcyc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4vaXNOb3ROaWwnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IGlzRW5hYmxlZCB9IGZyb20gJy4uL1JlbW90ZUNvbmZpZyc7XG5cbmNvbnN0IEZJVkVfTUlOVVRFUyA9IDUgKiBkdXJhdGlvbnMuTUlOVVRFO1xuXG50eXBlIExvb2t1cEl0ZW1UeXBlID0ge1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgbWVzc2FnZTogTWVzc2FnZU1vZGVsO1xufTtcbnR5cGUgTG9va3VwVHlwZSA9IFJlY29yZDxzdHJpbmcsIExvb2t1cEl0ZW1UeXBlPjtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBtZXNzYWdlTG9va3VwOiBMb29rdXBUeXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBwcml2YXRlIG1zZ0lEc0J5U2VuZGVyID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICBwcml2YXRlIG1zZ0lEc0J5U2VudEF0ID0gbmV3IE1hcDxudW1iZXIsIFNldDxzdHJpbmc+PigpO1xuXG4gIHN0YXRpYyBpbnN0YWxsKCk6IE1lc3NhZ2VDb250cm9sbGVyIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBNZXNzYWdlQ29udHJvbGxlcigpO1xuICAgIHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlciA9IGluc3RhbmNlO1xuXG4gICAgaW5zdGFuY2Uuc3RhcnRDbGVhbnVwSW50ZXJ2YWwoKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICByZWdpc3RlcihcbiAgICBpZDogc3RyaW5nLFxuICAgIGRhdGE6IE1lc3NhZ2VNb2RlbCB8IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVxuICApOiBNZXNzYWdlTW9kZWwge1xuICAgIGlmICghaWQgfHwgIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXI6IEdvdCBmYWxzZXkgaWQgb3IgbWVzc2FnZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5tZXNzYWdlTG9va3VwW2lkXTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIHRoaXMubWVzc2FnZUxvb2t1cFtpZF0gPSB7XG4gICAgICAgIG1lc3NhZ2U6IGV4aXN0aW5nLm1lc3NhZ2UsXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gZXhpc3RpbmcubWVzc2FnZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICdhdHRyaWJ1dGVzJyBpbiBkYXRhID8gZGF0YSA6IG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKGRhdGEpO1xuICAgIHRoaXMubWVzc2FnZUxvb2t1cFtpZF0gPSB7XG4gICAgICBtZXNzYWdlLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH07XG5cbiAgICBjb25zdCBzZW50QXQgPSBtZXNzYWdlLmdldCgnc2VudF9hdCcpO1xuICAgIGNvbnN0IHByZXZpb3VzSWRzQnlTZW50QXQgPSB0aGlzLm1zZ0lEc0J5U2VudEF0LmdldChzZW50QXQpO1xuICAgIGlmIChwcmV2aW91c0lkc0J5U2VudEF0KSB7XG4gICAgICBwcmV2aW91c0lkc0J5U2VudEF0LmFkZChpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubXNnSURzQnlTZW50QXQuc2V0KHNlbnRBdCwgbmV3IFNldChbaWRdKSk7XG4gICAgfVxuXG4gICAgdGhpcy5tc2dJRHNCeVNlbmRlci5zZXQobWVzc2FnZS5nZXRTZW5kZXJJZGVudGlmaWVyKCksIGlkKTtcblxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG5cbiAgdW5yZWdpc3RlcihpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgeyBtZXNzYWdlIH0gPSB0aGlzLm1lc3NhZ2VMb29rdXBbaWRdIHx8IHt9O1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICB0aGlzLm1zZ0lEc0J5U2VuZGVyLmRlbGV0ZShtZXNzYWdlLmdldFNlbmRlcklkZW50aWZpZXIoKSk7XG5cbiAgICAgIGNvbnN0IHNlbnRBdCA9IG1lc3NhZ2UuZ2V0KCdzZW50X2F0Jyk7XG4gICAgICBjb25zdCBpZHNCeVNlbnRBdCA9IHRoaXMubXNnSURzQnlTZW50QXQuZ2V0KHNlbnRBdCkgfHwgbmV3IFNldCgpO1xuICAgICAgaWRzQnlTZW50QXQuZGVsZXRlKGlkKTtcbiAgICAgIGlmICghaWRzQnlTZW50QXQuc2l6ZSkge1xuICAgICAgICB0aGlzLm1zZ0lEc0J5U2VudEF0LmRlbGV0ZShzZW50QXQpO1xuICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUgdGhpcy5tZXNzYWdlTG9va3VwW2lkXTtcbiAgfVxuXG4gIGNsZWFudXAoKTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBPYmplY3QudmFsdWVzKHRoaXMubWVzc2FnZUxvb2t1cCk7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBtZXNzYWdlcy5sZW5ndGg7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgeyBtZXNzYWdlLCB0aW1lc3RhbXAgfSA9IG1lc3NhZ2VzW2ldO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gbWVzc2FnZS5nZXRDb252ZXJzYXRpb24oKTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSB3aW5kb3cucmVkdXhTdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHN0YXRlPy5jb252ZXJzYXRpb25zPy5zZWxlY3RlZENvbnZlcnNhdGlvbklkO1xuICAgICAgY29uc3QgaW5BY3RpdmVDb252ZXJzYXRpb24gPVxuICAgICAgICBjb252ZXJzYXRpb24gJiYgc2VsZWN0ZWRJZCAmJiBjb252ZXJzYXRpb24uaWQgPT09IHNlbGVjdGVkSWQ7XG5cbiAgICAgIGlmIChub3cgLSB0aW1lc3RhbXAgPiBGSVZFX01JTlVURVMgJiYgIWluQWN0aXZlQ29udmVyc2F0aW9uKSB7XG4gICAgICAgIHRoaXMudW5yZWdpc3RlcihtZXNzYWdlLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRCeUlkKGlkOiBzdHJpbmcpOiBNZXNzYWdlTW9kZWwgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5tZXNzYWdlTG9va3VwW2lkXTtcbiAgICByZXR1cm4gZXhpc3RpbmcgJiYgZXhpc3RpbmcubWVzc2FnZSA/IGV4aXN0aW5nLm1lc3NhZ2UgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBmaWx0ZXJCeVNlbnRBdChzZW50QXQ6IG51bWJlcik6IEl0ZXJhYmxlPE1lc3NhZ2VNb2RlbD4ge1xuICAgIGNvbnN0IGlkcyA9IHRoaXMubXNnSURzQnlTZW50QXQuZ2V0KHNlbnRBdCkgfHwgW107XG4gICAgY29uc3QgbWF5YmVNZXNzYWdlcyA9IG1hcChpZHMsIGlkID0+IHRoaXMuZ2V0QnlJZChpZCkpO1xuICAgIHJldHVybiBmaWx0ZXIobWF5YmVNZXNzYWdlcywgaXNOb3ROaWwpO1xuICB9XG5cbiAgZmluZEJ5U2VuZGVyKHNlbmRlcjogc3RyaW5nKTogTWVzc2FnZU1vZGVsIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBpZCA9IHRoaXMubXNnSURzQnlTZW5kZXIuZ2V0KHNlbmRlcik7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0QnlJZChpZCk7XG4gIH1cblxuICBfZ2V0KCk6IExvb2t1cFR5cGUge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VMb29rdXA7XG4gIH1cblxuICBzdGFydENsZWFudXBJbnRlcnZhbCgpOiBOb2RlSlMuVGltZW91dCB8IG51bWJlciB7XG4gICAgcmV0dXJuIHNldEludGVydmFsKFxuICAgICAgdGhpcy5jbGVhbnVwLmJpbmQodGhpcyksXG4gICAgICBpc0VuYWJsZWQoJ2Rlc2t0b3AubWVzc2FnZUNsZWFudXAnKSA/IEZJVkVfTUlOVVRFUyA6IGR1cmF0aW9ucy5IT1VSXG4gICAgKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGdCQUEyQjtBQUMzQix1QkFBNEI7QUFDNUIsc0JBQXlCO0FBRXpCLDBCQUEwQjtBQUUxQixNQUFNLGVBQWUsSUFBSSxVQUFVO0FBUTVCLE1BQU0sa0JBQWtCO0FBQUEsRUFBeEI7QUFDRyx5QkFBNEIsdUJBQU8sT0FBTyxJQUFJO0FBRTlDLDBCQUFpQixvQkFBSSxJQUFvQjtBQUV6QywwQkFBaUIsb0JBQUksSUFBeUI7QUFBQTtBQUFBLFNBRS9DLFVBQTZCO0FBQ2xDLFVBQU0sV0FBVyxJQUFJLGtCQUFrQjtBQUN2QyxXQUFPLG9CQUFvQjtBQUUzQixhQUFTLHFCQUFxQjtBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsU0FDRSxJQUNBLE1BQ2M7QUFDZCxRQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07QUFDaEIsWUFBTSxJQUFJLE1BQU0sc0RBQXNEO0FBQUEsSUFDeEU7QUFFQSxVQUFNLFdBQVcsS0FBSyxjQUFjO0FBQ3BDLFFBQUksVUFBVTtBQUNaLFdBQUssY0FBYyxNQUFN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
