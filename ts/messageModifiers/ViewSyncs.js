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
var ViewSyncs_exports = {};
__export(ViewSyncs_exports, {
  ViewSyncs: () => ViewSyncs
});
module.exports = __toCommonJS(ViewSyncs_exports);
var import_backbone = require("backbone");
var import_MessageReadStatus = require("../messages/MessageReadStatus");
var import_MessageUpdater = require("../services/MessageUpdater");
var import_message = require("../state/selectors/message");
var import_notifications = require("../services/notifications");
var log = __toESM(require("../logging/log"));
var import_Message = require("../components/conversation/Message");
class ViewSyncModel extends import_backbone.Model {
}
let singleton;
class ViewSyncs extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new ViewSyncs();
    }
    return singleton;
  }
  forMessage(message) {
    const senderId = window.ConversationController.ensureContactIds({
      e164: message.get("source"),
      uuid: message.get("sourceUuid")
    });
    const syncs = this.filter((item) => {
      return item.get("senderId") === senderId && item.get("timestamp") === message.get("sent_at");
    });
    if (syncs.length) {
      log.info(`Found ${syncs.length} early view sync(s) for message ${message.get("sent_at")}`);
      this.remove(syncs);
    }
    return syncs;
  }
  async onSync(sync) {
    try {
      const messages = await window.Signal.Data.getMessagesBySentAt(sync.get("timestamp"));
      const found = messages.find((item) => {
        const senderId = window.ConversationController.ensureContactIds({
          e164: item.source,
          uuid: item.sourceUuid
        });
        return ((0, import_message.isIncoming)(item) || (0, import_message.isStory)(item)) && senderId === sync.get("senderId");
      });
      if (!found) {
        log.info("Nothing found for view sync", sync.get("senderId"), sync.get("senderE164"), sync.get("senderUuid"), sync.get("timestamp"));
        return;
      }
      import_notifications.notificationService.removeBy({ messageId: found.id });
      const message = window.MessageController.register(found.id, found);
      if (message.get("readStatus") !== import_MessageReadStatus.ReadStatus.Viewed) {
        message.set((0, import_MessageUpdater.markViewed)(message.attributes, sync.get("viewedAt")));
      }
      const giftBadge = message.get("giftBadge");
      if (giftBadge) {
        message.set({
          giftBadge: {
            ...giftBadge,
            state: (0, import_message.isIncoming)(message.attributes) ? import_Message.GiftBadgeStates.Redeemed : import_Message.GiftBadgeStates.Opened
          }
        });
      }
      this.remove(sync);
    } catch (error) {
      log.error("ViewSyncs.onSync error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewSyncs
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVmlld1N5bmNzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG5cbmltcG9ydCB7IENvbGxlY3Rpb24sIE1vZGVsIH0gZnJvbSAnYmFja2JvbmUnO1xuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgbWFya1ZpZXdlZCB9IGZyb20gJy4uL3NlcnZpY2VzL01lc3NhZ2VVcGRhdGVyJztcbmltcG9ydCB7IGlzSW5jb21pbmcsIGlzU3RvcnkgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgR2lmdEJhZGdlU3RhdGVzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vTWVzc2FnZSc7XG5cbmV4cG9ydCB0eXBlIFZpZXdTeW5jQXR0cmlidXRlc1R5cGUgPSB7XG4gIHNlbmRlcklkOiBzdHJpbmc7XG4gIHNlbmRlckUxNjQ/OiBzdHJpbmc7XG4gIHNlbmRlclV1aWQ6IHN0cmluZztcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIHZpZXdlZEF0OiBudW1iZXI7XG59O1xuXG5jbGFzcyBWaWV3U3luY01vZGVsIGV4dGVuZHMgTW9kZWw8Vmlld1N5bmNBdHRyaWJ1dGVzVHlwZT4ge31cblxubGV0IHNpbmdsZXRvbjogVmlld1N5bmNzIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgY2xhc3MgVmlld1N5bmNzIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIHN0YXRpYyBnZXRTaW5nbGV0b24oKTogVmlld1N5bmNzIHtcbiAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgc2luZ2xldG9uID0gbmV3IFZpZXdTeW5jcygpO1xuICAgIH1cblxuICAgIHJldHVybiBzaW5nbGV0b247XG4gIH1cblxuICBmb3JNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCk6IEFycmF5PFZpZXdTeW5jTW9kZWw+IHtcbiAgICBjb25zdCBzZW5kZXJJZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgZTE2NDogbWVzc2FnZS5nZXQoJ3NvdXJjZScpLFxuICAgICAgdXVpZDogbWVzc2FnZS5nZXQoJ3NvdXJjZVV1aWQnKSxcbiAgICB9KTtcbiAgICBjb25zdCBzeW5jcyA9IHRoaXMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaXRlbS5nZXQoJ3NlbmRlcklkJykgPT09IHNlbmRlcklkICYmXG4gICAgICAgIGl0ZW0uZ2V0KCd0aW1lc3RhbXAnKSA9PT0gbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBpZiAoc3luY3MubGVuZ3RoKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYEZvdW5kICR7c3luY3MubGVuZ3RofSBlYXJseSB2aWV3IHN5bmMocykgZm9yIG1lc3NhZ2UgJHttZXNzYWdlLmdldChcbiAgICAgICAgICAnc2VudF9hdCdcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgICAgdGhpcy5yZW1vdmUoc3luY3MpO1xuICAgIH1cbiAgICByZXR1cm4gc3luY3M7XG4gIH1cblxuICBhc3luYyBvblN5bmMoc3luYzogVmlld1N5bmNNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRNZXNzYWdlc0J5U2VudEF0KFxuICAgICAgICBzeW5jLmdldCgndGltZXN0YW1wJylcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGZvdW5kID0gbWVzc2FnZXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVySWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgICBlMTY0OiBpdGVtLnNvdXJjZSxcbiAgICAgICAgICB1dWlkOiBpdGVtLnNvdXJjZVV1aWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgKGlzSW5jb21pbmcoaXRlbSkgfHwgaXNTdG9yeShpdGVtKSkgJiZcbiAgICAgICAgICBzZW5kZXJJZCA9PT0gc3luYy5nZXQoJ3NlbmRlcklkJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdOb3RoaW5nIGZvdW5kIGZvciB2aWV3IHN5bmMnLFxuICAgICAgICAgIHN5bmMuZ2V0KCdzZW5kZXJJZCcpLFxuICAgICAgICAgIHN5bmMuZ2V0KCdzZW5kZXJFMTY0JyksXG4gICAgICAgICAgc3luYy5nZXQoJ3NlbmRlclV1aWQnKSxcbiAgICAgICAgICBzeW5jLmdldCgndGltZXN0YW1wJylcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBub3RpZmljYXRpb25TZXJ2aWNlLnJlbW92ZUJ5KHsgbWVzc2FnZUlkOiBmb3VuZC5pZCB9KTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3Rlcihmb3VuZC5pZCwgZm91bmQpO1xuXG4gICAgICBpZiAobWVzc2FnZS5nZXQoJ3JlYWRTdGF0dXMnKSAhPT0gUmVhZFN0YXR1cy5WaWV3ZWQpIHtcbiAgICAgICAgbWVzc2FnZS5zZXQobWFya1ZpZXdlZChtZXNzYWdlLmF0dHJpYnV0ZXMsIHN5bmMuZ2V0KCd2aWV3ZWRBdCcpKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdpZnRCYWRnZSA9IG1lc3NhZ2UuZ2V0KCdnaWZ0QmFkZ2UnKTtcbiAgICAgIGlmIChnaWZ0QmFkZ2UpIHtcbiAgICAgICAgbWVzc2FnZS5zZXQoe1xuICAgICAgICAgIGdpZnRCYWRnZToge1xuICAgICAgICAgICAgLi4uZ2lmdEJhZGdlLFxuICAgICAgICAgICAgc3RhdGU6IGlzSW5jb21pbmcobWVzc2FnZS5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgICA/IEdpZnRCYWRnZVN0YXRlcy5SZWRlZW1lZFxuICAgICAgICAgICAgICA6IEdpZnRCYWRnZVN0YXRlcy5PcGVuZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVtb3ZlKHN5bmMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdWaWV3U3luY3Mub25TeW5jIGVycm9yOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxzQkFBa0M7QUFHbEMsK0JBQTJCO0FBQzNCLDRCQUEyQjtBQUMzQixxQkFBb0M7QUFDcEMsMkJBQW9DO0FBQ3BDLFVBQXFCO0FBQ3JCLHFCQUFnQztBQVVoQyxNQUFNLHNCQUFzQixzQkFBOEI7QUFBQztBQUEzRCxBQUVBLElBQUk7QUFFRyxNQUFNLGtCQUFrQiwyQkFBVztBQUFBLFNBQ2pDLGVBQTBCO0FBQy9CLFFBQUksQ0FBQyxXQUFXO0FBQ2Qsa0JBQVksSUFBSSxVQUFVO0FBQUEsSUFDNUI7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsV0FBVyxTQUE2QztBQUN0RCxVQUFNLFdBQVcsT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsTUFDOUQsTUFBTSxRQUFRLElBQUksUUFBUTtBQUFBLE1BQzFCLE1BQU0sUUFBUSxJQUFJLFlBQVk7QUFBQSxJQUNoQyxDQUFDO0FBQ0QsVUFBTSxRQUFRLEtBQUssT0FBTyxVQUFRO0FBQ2hDLGFBQ0UsS0FBSyxJQUFJLFVBQVUsTUFBTSxZQUN6QixLQUFLLElBQUksV0FBVyxNQUFNLFFBQVEsSUFBSSxTQUFTO0FBQUEsSUFFbkQsQ0FBQztBQUNELFFBQUksTUFBTSxRQUFRO0FBQ2hCLFVBQUksS0FDRixTQUFTLE1BQU0seUNBQXlDLFFBQVEsSUFDOUQsU0FDRixHQUNGO0FBQ0EsV0FBSyxPQUFPLEtBQUs7QUFBQSxJQUNuQjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsUUFFTSxPQUFPLE1BQW9DO0FBQy9DLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxPQUFPLE9BQU8sS0FBSyxvQkFDeEMsS0FBSyxJQUFJLFdBQVcsQ0FDdEI7QUFFQSxZQUFNLFFBQVEsU0FBUyxLQUFLLFVBQVE7QUFDbEMsY0FBTSxXQUFXLE9BQU8sdUJBQXVCLGlCQUFpQjtBQUFBLFVBQzlELE1BQU0sS0FBSztBQUFBLFVBQ1gsTUFBTSxLQUFLO0FBQUEsUUFDYixDQUFDO0FBRUQsZUFDRyxnQ0FBVyxJQUFJLEtBQUssNEJBQVEsSUFBSSxNQUNqQyxhQUFhLEtBQUssSUFBSSxVQUFVO0FBQUEsTUFFcEMsQ0FBQztBQUVELFVBQUksQ0FBQyxPQUFPO0FBQ1YsWUFBSSxLQUNGLCtCQUNBLEtBQUssSUFBSSxVQUFVLEdBQ25CLEtBQUssSUFBSSxZQUFZLEdBQ3JCLEtBQUssSUFBSSxZQUFZLEdBQ3JCLEtBQUssSUFBSSxXQUFXLENBQ3RCO0FBQ0E7QUFBQSxNQUNGO0FBRUEsK0NBQW9CLFNBQVMsRUFBRSxXQUFXLE1BQU0sR0FBRyxDQUFDO0FBRXBELFlBQU0sVUFBVSxPQUFPLGtCQUFrQixTQUFTLE1BQU0sSUFBSSxLQUFLO0FBRWpFLFVBQUksUUFBUSxJQUFJLFlBQVksTUFBTSxvQ0FBVyxRQUFRO0FBQ25ELGdCQUFRLElBQUksc0NBQVcsUUFBUSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsQ0FBQztBQUFBLE1BQ2xFO0FBRUEsWUFBTSxZQUFZLFFBQVEsSUFBSSxXQUFXO0FBQ3pDLFVBQUksV0FBVztBQUNiLGdCQUFRLElBQUk7QUFBQSxVQUNWLFdBQVc7QUFBQSxlQUNOO0FBQUEsWUFDSCxPQUFPLCtCQUFXLFFBQVEsVUFBVSxJQUNoQywrQkFBZ0IsV0FDaEIsK0JBQWdCO0FBQUEsVUFDdEI7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBRUEsV0FBSyxPQUFPLElBQUk7QUFBQSxJQUNsQixTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQ0YsMkJBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQXhGTyIsCiAgIm5hbWVzIjogW10KfQo=
