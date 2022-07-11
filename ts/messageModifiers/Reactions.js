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
var Reactions_exports = {};
__export(Reactions_exports, {
  ReactionModel: () => ReactionModel,
  Reactions: () => Reactions
});
module.exports = __toCommonJS(Reactions_exports);
var import_backbone = require("backbone");
var log = __toESM(require("../logging/log"));
var import_helpers = require("../messages/helpers");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_message = require("../state/selectors/message");
class ReactionModel extends import_backbone.Model {
}
let singleton;
class Reactions extends import_backbone.Collection {
  static getSingleton() {
    if (!singleton) {
      singleton = new Reactions();
    }
    return singleton;
  }
  forMessage(message) {
    if ((0, import_message.isOutgoing)(message.attributes)) {
      const outgoingReactions = this.filter((item) => item.get("targetTimestamp") === message.get("sent_at"));
      if (outgoingReactions.length > 0) {
        log.info("Found early reaction for outgoing message");
        this.remove(outgoingReactions);
        return outgoingReactions;
      }
    }
    const senderId = (0, import_helpers.getContactId)(message.attributes);
    const sentAt = message.get("sent_at");
    const reactionsBySource = this.filter((re) => {
      const targetSenderId = window.ConversationController.ensureContactIds({
        uuid: re.get("targetAuthorUuid")
      });
      const targetTimestamp = re.get("targetTimestamp");
      return targetSenderId === senderId && targetTimestamp === sentAt;
    });
    if (reactionsBySource.length > 0) {
      log.info("Found early reaction for message");
      this.remove(reactionsBySource);
      return reactionsBySource;
    }
    return [];
  }
  async onReaction(reaction, generatedMessage) {
    try {
      const targetConversationId = window.ConversationController.ensureContactIds({
        uuid: reaction.get("targetAuthorUuid")
      });
      if (!targetConversationId) {
        throw new Error("onReaction: No conversationId returned from ensureContactIds!");
      }
      const targetConversation = await window.ConversationController.getConversationForTargetMessage(targetConversationId, reaction.get("targetTimestamp"));
      if (!targetConversation) {
        log.info("No target conversation for reaction", reaction.get("targetAuthorUuid"), reaction.get("targetTimestamp"));
        return void 0;
      }
      await targetConversation.queueJob("Reactions.onReaction", async () => {
        log.info("Handling reaction for", reaction.get("targetTimestamp"));
        const messages = await window.Signal.Data.getMessagesBySentAt(reaction.get("targetTimestamp"));
        const targetMessage = messages.find((m) => {
          const contact = (0, import_helpers.getContact)(m);
          if (!contact) {
            return false;
          }
          const mcid = contact.get("id");
          const recid = window.ConversationController.ensureContactIds({
            uuid: reaction.get("targetAuthorUuid")
          });
          return mcid === recid;
        });
        if (!targetMessage) {
          log.info("No message for reaction", reaction.get("targetAuthorUuid"), reaction.get("targetTimestamp"));
          if (reaction.get("remove")) {
            this.remove(reaction);
            const oldReaction = this.where({
              targetAuthorUuid: reaction.get("targetAuthorUuid"),
              targetTimestamp: reaction.get("targetTimestamp"),
              emoji: reaction.get("emoji")
            });
            oldReaction.forEach((r) => this.remove(r));
          }
          return;
        }
        const message = window.MessageController.register(targetMessage.id, targetMessage);
        if ((0, import_message.isStory)(targetMessage) && (0, import_whatTypeOfConversation.isDirectConversation)(targetConversation.attributes)) {
          generatedMessage.set({
            storyId: targetMessage.id,
            storyReactionEmoji: reaction.get("emoji")
          });
          await Promise.all([
            window.Signal.Data.saveMessage(generatedMessage.attributes, {
              ourUuid: window.textsecure.storage.user.getCheckedUuid().toString(),
              forceSave: true
            }),
            generatedMessage.hydrateStoryContext(message)
          ]);
          targetConversation.addSingleMessage(window.MessageController.register(generatedMessage.id, generatedMessage));
        }
        await message.handleReaction(reaction);
        this.remove(reaction);
      });
    } catch (error) {
      log.error("Reactions.onReaction error:", error && error.stack ? error.stack : error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactionModel,
  Reactions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHsgQ29sbGVjdGlvbiwgTW9kZWwgfSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbWVzc2FnZXMnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBnZXRDb250YWN0SWQsIGdldENvbnRhY3QgfSBmcm9tICcuLi9tZXNzYWdlcy9oZWxwZXJzJztcbmltcG9ydCB7IGlzRGlyZWN0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IGlzT3V0Z29pbmcsIGlzU3RvcnkgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5cbmV4cG9ydCBjbGFzcyBSZWFjdGlvbk1vZGVsIGV4dGVuZHMgTW9kZWw8UmVhY3Rpb25BdHRyaWJ1dGVzVHlwZT4ge31cblxubGV0IHNpbmdsZXRvbjogUmVhY3Rpb25zIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgY2xhc3MgUmVhY3Rpb25zIGV4dGVuZHMgQ29sbGVjdGlvbjxSZWFjdGlvbk1vZGVsPiB7XG4gIHN0YXRpYyBnZXRTaW5nbGV0b24oKTogUmVhY3Rpb25zIHtcbiAgICBpZiAoIXNpbmdsZXRvbikge1xuICAgICAgc2luZ2xldG9uID0gbmV3IFJlYWN0aW9ucygpO1xuICAgIH1cblxuICAgIHJldHVybiBzaW5nbGV0b247XG4gIH1cblxuICBmb3JNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCk6IEFycmF5PFJlYWN0aW9uTW9kZWw+IHtcbiAgICBpZiAoaXNPdXRnb2luZyhtZXNzYWdlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBjb25zdCBvdXRnb2luZ1JlYWN0aW9ucyA9IHRoaXMuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uZ2V0KCd0YXJnZXRUaW1lc3RhbXAnKSA9PT0gbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKVxuICAgICAgKTtcblxuICAgICAgaWYgKG91dGdvaW5nUmVhY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbG9nLmluZm8oJ0ZvdW5kIGVhcmx5IHJlYWN0aW9uIGZvciBvdXRnb2luZyBtZXNzYWdlJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlKG91dGdvaW5nUmVhY3Rpb25zKTtcbiAgICAgICAgcmV0dXJuIG91dGdvaW5nUmVhY3Rpb25zO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNlbmRlcklkID0gZ2V0Q29udGFjdElkKG1lc3NhZ2UuYXR0cmlidXRlcyk7XG4gICAgY29uc3Qgc2VudEF0ID0gbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKTtcbiAgICBjb25zdCByZWFjdGlvbnNCeVNvdXJjZSA9IHRoaXMuZmlsdGVyKHJlID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldFNlbmRlcklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgIHV1aWQ6IHJlLmdldCgndGFyZ2V0QXV0aG9yVXVpZCcpLFxuICAgICAgfSk7XG4gICAgICBjb25zdCB0YXJnZXRUaW1lc3RhbXAgPSByZS5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpO1xuICAgICAgcmV0dXJuIHRhcmdldFNlbmRlcklkID09PSBzZW5kZXJJZCAmJiB0YXJnZXRUaW1lc3RhbXAgPT09IHNlbnRBdDtcbiAgICB9KTtcblxuICAgIGlmIChyZWFjdGlvbnNCeVNvdXJjZS5sZW5ndGggPiAwKSB7XG4gICAgICBsb2cuaW5mbygnRm91bmQgZWFybHkgcmVhY3Rpb24gZm9yIG1lc3NhZ2UnKTtcbiAgICAgIHRoaXMucmVtb3ZlKHJlYWN0aW9uc0J5U291cmNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbnNCeVNvdXJjZTtcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBhc3luYyBvblJlYWN0aW9uKFxuICAgIHJlYWN0aW9uOiBSZWFjdGlvbk1vZGVsLFxuICAgIGdlbmVyYXRlZE1lc3NhZ2U6IE1lc3NhZ2VNb2RlbFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIGNvbnZlcnNhdGlvbiB0aGUgdGFyZ2V0IG1lc3NhZ2Ugd2FzIGluOyB3ZSBoYXZlIHRvIGZpbmQgaXQgaW4gdGhlIGRhdGFiYXNlXG4gICAgICAvLyAgIHRvIHRvIGZpZ3VyZSB0aGF0IG91dC5cbiAgICAgIGNvbnN0IHRhcmdldENvbnZlcnNhdGlvbklkID1cbiAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgICAgdXVpZDogcmVhY3Rpb24uZ2V0KCd0YXJnZXRBdXRob3JVdWlkJyksXG4gICAgICAgIH0pO1xuICAgICAgaWYgKCF0YXJnZXRDb252ZXJzYXRpb25JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ29uUmVhY3Rpb246IE5vIGNvbnZlcnNhdGlvbklkIHJldHVybmVkIGZyb20gZW5zdXJlQ29udGFjdElkcyEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldENvbnZlcnNhdGlvbiA9XG4gICAgICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldENvbnZlcnNhdGlvbkZvclRhcmdldE1lc3NhZ2UoXG4gICAgICAgICAgdGFyZ2V0Q29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgcmVhY3Rpb24uZ2V0KCd0YXJnZXRUaW1lc3RhbXAnKVxuICAgICAgICApO1xuICAgICAgaWYgKCF0YXJnZXRDb252ZXJzYXRpb24pIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgJ05vIHRhcmdldCBjb252ZXJzYXRpb24gZm9yIHJlYWN0aW9uJyxcbiAgICAgICAgICByZWFjdGlvbi5nZXQoJ3RhcmdldEF1dGhvclV1aWQnKSxcbiAgICAgICAgICByZWFjdGlvbi5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIGF3YWl0aW5nIGlzIHNhZmUgc2luY2UgYG9uUmVhY3Rpb25gIGlzIG5ldmVyIGNhbGxlZCBmcm9tIGluc2lkZSB0aGUgcXVldWVcbiAgICAgIGF3YWl0IHRhcmdldENvbnZlcnNhdGlvbi5xdWV1ZUpvYignUmVhY3Rpb25zLm9uUmVhY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxvZy5pbmZvKCdIYW5kbGluZyByZWFjdGlvbiBmb3InLCByZWFjdGlvbi5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpKTtcblxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRNZXNzYWdlc0J5U2VudEF0KFxuICAgICAgICAgIHJlYWN0aW9uLmdldCgndGFyZ2V0VGltZXN0YW1wJylcbiAgICAgICAgKTtcbiAgICAgICAgLy8gTWVzc2FnZSBpcyBmZXRjaGVkIGluc2lkZSB0aGUgY29udmVyc2F0aW9uIHF1ZXVlIHNvIHdlIGhhdmUgdGhlXG4gICAgICAgIC8vIG1vc3QgcmVjZW50IGRhdGFcbiAgICAgICAgY29uc3QgdGFyZ2V0TWVzc2FnZSA9IG1lc3NhZ2VzLmZpbmQobSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGFjdCA9IGdldENvbnRhY3QobSk7XG5cbiAgICAgICAgICBpZiAoIWNvbnRhY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBtY2lkID0gY29udGFjdC5nZXQoJ2lkJyk7XG4gICAgICAgICAgY29uc3QgcmVjaWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgICAgIHV1aWQ6IHJlYWN0aW9uLmdldCgndGFyZ2V0QXV0aG9yVXVpZCcpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBtY2lkID09PSByZWNpZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXRNZXNzYWdlKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAnTm8gbWVzc2FnZSBmb3IgcmVhY3Rpb24nLFxuICAgICAgICAgICAgcmVhY3Rpb24uZ2V0KCd0YXJnZXRBdXRob3JVdWlkJyksXG4gICAgICAgICAgICByZWFjdGlvbi5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIFNpbmNlIHdlIGhhdmVuJ3QgcmVjZWl2ZWQgdGhlIG1lc3NhZ2UgZm9yIHdoaWNoIHdlIGFyZSByZW1vdmluZyBhXG4gICAgICAgICAgLy8gcmVhY3Rpb24sIHdlIGNhbiBqdXN0IHJlbW92ZSB0aG9zZSBwZW5kaW5nIHJlYWN0aW9uc1xuICAgICAgICAgIGlmIChyZWFjdGlvbi5nZXQoJ3JlbW92ZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShyZWFjdGlvbik7XG4gICAgICAgICAgICBjb25zdCBvbGRSZWFjdGlvbiA9IHRoaXMud2hlcmUoe1xuICAgICAgICAgICAgICB0YXJnZXRBdXRob3JVdWlkOiByZWFjdGlvbi5nZXQoJ3RhcmdldEF1dGhvclV1aWQnKSxcbiAgICAgICAgICAgICAgdGFyZ2V0VGltZXN0YW1wOiByZWFjdGlvbi5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpLFxuICAgICAgICAgICAgICBlbW9qaTogcmVhY3Rpb24uZ2V0KCdlbW9qaScpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbGRSZWFjdGlvbi5mb3JFYWNoKHIgPT4gdGhpcy5yZW1vdmUocikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoXG4gICAgICAgICAgdGFyZ2V0TWVzc2FnZS5pZCxcbiAgICAgICAgICB0YXJnZXRNZXNzYWdlXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gVXNlIHRoZSBnZW5lcmF0ZWQgbWVzc2FnZSBpbiB0cy9iYWNrZ3JvdW5kLnRzIHRvIGNyZWF0ZSBhIG1lc3NhZ2VcbiAgICAgICAgLy8gaWYgdGhlIHJlYWN0aW9uIGlzIHRhcmdldHRlZCBhdCBhIHN0b3J5IG9uIGEgMToxIGNvbnZlcnNhdGlvbi5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzU3RvcnkodGFyZ2V0TWVzc2FnZSkgJiZcbiAgICAgICAgICBpc0RpcmVjdENvbnZlcnNhdGlvbih0YXJnZXRDb252ZXJzYXRpb24uYXR0cmlidXRlcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgZ2VuZXJhdGVkTWVzc2FnZS5zZXQoe1xuICAgICAgICAgICAgc3RvcnlJZDogdGFyZ2V0TWVzc2FnZS5pZCxcbiAgICAgICAgICAgIHN0b3J5UmVhY3Rpb25FbW9qaTogcmVhY3Rpb24uZ2V0KCdlbW9qaScpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKGdlbmVyYXRlZE1lc3NhZ2UuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXJcbiAgICAgICAgICAgICAgICAuZ2V0Q2hlY2tlZFV1aWQoKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGdlbmVyYXRlZE1lc3NhZ2UuaHlkcmF0ZVN0b3J5Q29udGV4dChtZXNzYWdlKSxcbiAgICAgICAgICBdKTtcblxuICAgICAgICAgIHRhcmdldENvbnZlcnNhdGlvbi5hZGRTaW5nbGVNZXNzYWdlKFxuICAgICAgICAgICAgd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKFxuICAgICAgICAgICAgICBnZW5lcmF0ZWRNZXNzYWdlLmlkLFxuICAgICAgICAgICAgICBnZW5lcmF0ZWRNZXNzYWdlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IG1lc3NhZ2UuaGFuZGxlUmVhY3Rpb24ocmVhY3Rpb24pO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlKHJlYWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdSZWFjdGlvbnMub25SZWFjdGlvbiBlcnJvcjonLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxzQkFBa0M7QUFDbEMsVUFBcUI7QUFHckIscUJBQXlDO0FBQ3pDLG9DQUFxQztBQUNyQyxxQkFBb0M7QUFFN0IsTUFBTSxzQkFBc0Isc0JBQThCO0FBQUM7QUFBM0QsQUFFUCxJQUFJO0FBRUcsTUFBTSxrQkFBa0IsMkJBQTBCO0FBQUEsU0FDaEQsZUFBMEI7QUFDL0IsUUFBSSxDQUFDLFdBQVc7QUFDZCxrQkFBWSxJQUFJLFVBQVU7QUFBQSxJQUM1QjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxX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
