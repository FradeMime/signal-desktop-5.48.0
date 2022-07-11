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
var Deletes_exports = {};
__export(Deletes_exports, {
  DeleteModel: () => DeleteModel,
  Deletes: () => Deletes
});
module.exports = __toCommonJS(Deletes_exports);
var import_backbone = require("backbone");
var import_helpers = require("../messages/helpers");
var log = __toESM(require("../logging/log"));
class DeleteModel extends import_backbone.Model {
}
let singleton;
class Deletes extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new Deletes();
    }
    return singleton;
  }
  forMessage(message) {
    const matchingDeletes = this.filter((item) => {
      return item.get("targetSentTimestamp") === message.get("sent_at") && item.get("fromId") === (0, import_helpers.getContactId)(message.attributes);
    });
    if (matchingDeletes.length > 0) {
      log.info("Found early DOE for message");
      this.remove(matchingDeletes);
      return matchingDeletes;
    }
    return [];
  }
  async onDelete(del) {
    try {
      const targetConversation = await window.ConversationController.getConversationForTargetMessage(del.get("fromId"), del.get("targetSentTimestamp"));
      if (!targetConversation) {
        log.info("No target conversation for DOE", del.get("fromId"), del.get("targetSentTimestamp"));
        return;
      }
      targetConversation.queueJob("Deletes.onDelete", async () => {
        log.info("Handling DOE for", del.get("targetSentTimestamp"));
        const messages = await window.Signal.Data.getMessagesBySentAt(del.get("targetSentTimestamp"));
        const targetMessage = messages.find((m) => del.get("fromId") === (0, import_helpers.getContactId)(m));
        if (!targetMessage) {
          log.info("No message for DOE", del.get("fromId"), del.get("targetSentTimestamp"));
          return;
        }
        const message = window.MessageController.register(targetMessage.id, targetMessage);
        await window.Signal.Util.deleteForEveryone(message, del);
        this.remove(del);
      });
    } catch (error) {
      log.error("Deletes.onDelete error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteModel,
  Deletes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGVsZXRlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG5cbmltcG9ydCB7IENvbGxlY3Rpb24sIE1vZGVsIH0gZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbWVzc2FnZXMnO1xuaW1wb3J0IHsgZ2V0Q29udGFjdElkIH0gZnJvbSAnLi4vbWVzc2FnZXMvaGVscGVycyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgdHlwZSBEZWxldGVBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgdGFyZ2V0U2VudFRpbWVzdGFtcDogbnVtYmVyO1xuICBzZXJ2ZXJUaW1lc3RhbXA6IG51bWJlcjtcbiAgZnJvbUlkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlTW9kZWwgZXh0ZW5kcyBNb2RlbDxEZWxldGVBdHRyaWJ1dGVzVHlwZT4ge31cblxubGV0IHNpbmdsZXRvbjogRGVsZXRlcyB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNsYXNzIERlbGV0ZXMgZXh0ZW5kcyBDb2xsZWN0aW9uPERlbGV0ZU1vZGVsPiB7XG4gIHN0YXRpYyBnZXRTaW5nbGV0b24oKTogRGVsZXRlcyB7XG4gICAgaWYgKCFzaW5nbGV0b24pIHtcbiAgICAgIHNpbmdsZXRvbiA9IG5ldyBEZWxldGVzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpbmdsZXRvbjtcbiAgfVxuXG4gIGZvck1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZU1vZGVsKTogQXJyYXk8RGVsZXRlTW9kZWw+IHtcbiAgICBjb25zdCBtYXRjaGluZ0RlbGV0ZXMgPSB0aGlzLmZpbHRlcihpdGVtID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGl0ZW0uZ2V0KCd0YXJnZXRTZW50VGltZXN0YW1wJykgPT09IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JykgJiZcbiAgICAgICAgaXRlbS5nZXQoJ2Zyb21JZCcpID09PSBnZXRDb250YWN0SWQobWVzc2FnZS5hdHRyaWJ1dGVzKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXRjaGluZ0RlbGV0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgbG9nLmluZm8oJ0ZvdW5kIGVhcmx5IERPRSBmb3IgbWVzc2FnZScpO1xuICAgICAgdGhpcy5yZW1vdmUobWF0Y2hpbmdEZWxldGVzKTtcbiAgICAgIHJldHVybiBtYXRjaGluZ0RlbGV0ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgYXN5bmMgb25EZWxldGUoZGVsOiBEZWxldGVNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgY29udmVyc2F0aW9uIHRoZSBkZWxldGVkIG1lc3NhZ2Ugd2FzIGluOyB3ZSBoYXZlIHRvIGZpbmQgaXQgaW4gdGhlIGRhdGFiYXNlXG4gICAgICAvLyAgIHRvIHRvIGZpZ3VyZSB0aGF0IG91dC5cbiAgICAgIGNvbnN0IHRhcmdldENvbnZlcnNhdGlvbiA9XG4gICAgICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldENvbnZlcnNhdGlvbkZvclRhcmdldE1lc3NhZ2UoXG4gICAgICAgICAgZGVsLmdldCgnZnJvbUlkJyksXG4gICAgICAgICAgZGVsLmdldCgndGFyZ2V0U2VudFRpbWVzdGFtcCcpXG4gICAgICAgICk7XG5cbiAgICAgIGlmICghdGFyZ2V0Q29udmVyc2F0aW9uKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdObyB0YXJnZXQgY29udmVyc2F0aW9uIGZvciBET0UnLFxuICAgICAgICAgIGRlbC5nZXQoJ2Zyb21JZCcpLFxuICAgICAgICAgIGRlbC5nZXQoJ3RhcmdldFNlbnRUaW1lc3RhbXAnKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRG8gbm90IGF3YWl0LCBzaW5jZSB0aGlzIGNhbiBkZWFkbG9jayB0aGUgcXVldWVcbiAgICAgIHRhcmdldENvbnZlcnNhdGlvbi5xdWV1ZUpvYignRGVsZXRlcy5vbkRlbGV0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbG9nLmluZm8oJ0hhbmRsaW5nIERPRSBmb3InLCBkZWwuZ2V0KCd0YXJnZXRTZW50VGltZXN0YW1wJykpO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldE1lc3NhZ2VzQnlTZW50QXQoXG4gICAgICAgICAgZGVsLmdldCgndGFyZ2V0U2VudFRpbWVzdGFtcCcpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0TWVzc2FnZSA9IG1lc3NhZ2VzLmZpbmQoXG4gICAgICAgICAgbSA9PiBkZWwuZ2V0KCdmcm9tSWQnKSA9PT0gZ2V0Q29udGFjdElkKG0pXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXRNZXNzYWdlKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAnTm8gbWVzc2FnZSBmb3IgRE9FJyxcbiAgICAgICAgICAgIGRlbC5nZXQoJ2Zyb21JZCcpLFxuICAgICAgICAgICAgZGVsLmdldCgndGFyZ2V0U2VudFRpbWVzdGFtcCcpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoXG4gICAgICAgICAgdGFyZ2V0TWVzc2FnZS5pZCxcbiAgICAgICAgICB0YXJnZXRNZXNzYWdlXG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5VdGlsLmRlbGV0ZUZvckV2ZXJ5b25lKG1lc3NhZ2UsIGRlbCk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoZGVsKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdEZWxldGVzLm9uRGVsZXRlIGVycm9yOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLHNCQUFrQztBQUVsQyxxQkFBNkI7QUFDN0IsVUFBcUI7QUFRZCxNQUFNLG9CQUFvQixzQkFBNEI7QUFBQztBQUF2RCxBQUVQLElBQUk7QUFFRyxNQUFNLGdCQUFnQiwyQkFBd0I7QUFBQSxTQUM1QyxlQUF3QjtBQUM3QixRQUFJLENBQUMsV0FBVztBQUNkLGtCQUFZLElBQUksUUFBUTtBQUFBLElBQzFCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLFdBQVcsU0FBMkM7QUFDcEQsVUFBTSxrQkFBa0IsS0FBSyxPQUFPLFVBQVE7QUFDMUMsYUFDRSxLQUFLLElBQUkscUJBQXFCLE1BQU0sUUFBUSxJQUFJLFNBQVMsS0FDekQsS0FBSyxJQUFJLFFBQVEsTUFBTSxpQ0FBYSxRQUFRLFVBQVU7QUFBQSxJQUUxRCxDQUFDO0FBRUQsUUFBSSxnQkFBZ0IsU0FBUyxHQUFHO0FBQzlCLFVBQUksS0FBSyw2QkFBNkI7QUFDdEMsV0FBSyxPQUFPLGVBQWU7QUFDM0IsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLENBQUM7QUFBQSxFQUNWO0FBQUEsUUFFTSxTQUFTLEtBQWlDO0FBQzlDLFFBQUk7QUFHRixZQUFNLHFCQUNKLE1BQU0sT0FBTyx1QkFBdUIsZ0NBQ2xDLElBQUksSUFBSSxRQUFRLEdBQ2hCLElBQUksSUFBSSxxQkFBcUIsQ0FDL0I7QUFFRixVQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLFlBQUksS0FDRixrQ0FDQSxJQUFJLElBQUksUUFBUSxHQUNoQixJQUFJLElBQUkscUJBQXFCLENBQy9CO0FBRUE7QUFBQSxNQUNGO0FBR0EseUJBQW1CLFNBQVMsb0JBQW9CLFlBQVk7QUFDMUQsWUFBSSxLQUFLLG9CQUFvQixJQUFJLElBQUkscUJBQXFCLENBQUM7QUFFM0QsY0FBTSxXQUFXLE1BQU0sT0FBTyxPQUFPLEtBQUssb0JBQ3hDLElBQUksSUFBSSxxQkFBcUIsQ0FDL0I7QUFFQSxjQUFNLGdCQUFnQixTQUFTLEtBQzdCLE9BQUssSUFBSSxJQUFJLFFBQVEsTUFBTSxpQ0FBYSxDQUFDLENBQzNDO0FBRUEsWUFBSSxDQUFDLGVBQWU7QUFDbEIsY0FBSSxLQUNGLHNCQUNBLElBQUksSUFBSSxRQUFRLEdBQ2hCLElBQUksSUFBSSxxQkFBcUIsQ0FDL0I7QUFFQTtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFVBQVUsT0FBTyxrQkFBa0IsU0FDdkMsY0FBYyxJQUNkLGFBQ0Y7QUFFQSxjQUFNLE9BQU8sT0FBTyxLQUFLLGtCQUFrQixTQUFTLEdBQUc7QUFFdkQsYUFBSyxPQUFPLEdBQUc7QUFBQSxNQUNqQixDQUFDO0FBQUEsSUFDSCxTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQ0YsMkJBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQXBGTyIsCiAgIm5hbWVzIjogW10KfQo=
