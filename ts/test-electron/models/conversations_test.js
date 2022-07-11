var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_MessageSendState = require("../../messages/MessageSendState");
var import_UUID = require("../../types/UUID");
describe("Conversations", () => {
  async function resetConversationController() {
    window.ConversationController.reset();
    await window.ConversationController.load();
  }
  beforeEach(resetConversationController);
  afterEach(resetConversationController);
  it("updates lastMessage even in race conditions with db", async () => {
    const ourNumber = "+15550000000";
    const ourUuid = import_UUID.UUID.generate().toString();
    const ourPni = import_UUID.UUID.generate().toString();
    const conversation = new window.Whisper.Conversation({
      avatars: [],
      id: import_UUID.UUID.generate().toString(),
      e164: "+15551234567",
      uuid: import_UUID.UUID.generate().toString(),
      type: "private",
      inbox_position: 0,
      isPinned: false,
      markedUnread: false,
      lastMessageDeletedForEveryone: false,
      messageCount: 0,
      sentMessageCount: 0,
      profileSharing: true,
      version: 0
    });
    await window.textsecure.storage.user.setCredentials({
      number: ourNumber,
      uuid: ourUuid,
      pni: ourPni,
      deviceId: 2,
      deviceName: "my device",
      password: "password"
    });
    await window.ConversationController.load();
    await window.Signal.Data.saveConversation(conversation.attributes);
    const now = Date.now();
    let message = new window.Whisper.Message({
      attachments: [],
      body: "bananas",
      conversationId: conversation.id,
      expirationStartTimestamp: now,
      hasAttachments: false,
      hasFileAttachments: false,
      hasVisualMediaAttachments: false,
      id: import_UUID.UUID.generate().toString(),
      received_at: now,
      sent_at: now,
      timestamp: now,
      type: "outgoing",
      sendStateByConversationId: {
        [conversation.id]: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: now
        }
      }
    });
    await window.Signal.Data.saveMessage(message.attributes, {
      forceSave: true,
      ourUuid
    });
    message = window.MessageController.register(message.id, message);
    await window.Signal.Data.updateConversation(conversation.attributes);
    await conversation.updateLastMessage();
    import_chai.assert.strictEqual(conversation.get("lastMessage"), "bananas");
    message.set({
      isErased: true,
      body: "",
      bodyRanges: void 0,
      attachments: [],
      quote: void 0,
      contact: [],
      sticker: void 0,
      preview: []
    });
    await conversation.updateLastMessage();
    import_chai.assert.strictEqual(conversation.get("lastMessage"), "");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9uc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBTZW5kU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmRlc2NyaWJlKCdDb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICBhc3luYyBmdW5jdGlvbiByZXNldENvbnZlcnNhdGlvbkNvbnRyb2xsZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5sb2FkKCk7XG4gIH1cblxuICBiZWZvcmVFYWNoKHJlc2V0Q29udmVyc2F0aW9uQ29udHJvbGxlcik7XG5cbiAgYWZ0ZXJFYWNoKHJlc2V0Q29udmVyc2F0aW9uQ29udHJvbGxlcik7XG5cbiAgaXQoJ3VwZGF0ZXMgbGFzdE1lc3NhZ2UgZXZlbiBpbiByYWNlIGNvbmRpdGlvbnMgd2l0aCBkYicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBvdXJOdW1iZXIgPSAnKzE1NTUwMDAwMDAwJztcbiAgICBjb25zdCBvdXJVdWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgb3VyUG5pID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgICAvLyBDcmVhdGluZyBhIGZha2UgY29udmVyc2F0aW9uXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gbmV3IHdpbmRvdy5XaGlzcGVyLkNvbnZlcnNhdGlvbih7XG4gICAgICBhdmF0YXJzOiBbXSxcbiAgICAgIGlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIGUxNjQ6ICcrMTU1NTEyMzQ1NjcnLFxuICAgICAgdXVpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICB0eXBlOiAncHJpdmF0ZScsXG4gICAgICBpbmJveF9wb3NpdGlvbjogMCxcbiAgICAgIGlzUGlubmVkOiBmYWxzZSxcbiAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gICAgICBsYXN0TWVzc2FnZURlbGV0ZWRGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICBtZXNzYWdlQ291bnQ6IDAsXG4gICAgICBzZW50TWVzc2FnZUNvdW50OiAwLFxuICAgICAgcHJvZmlsZVNoYXJpbmc6IHRydWUsXG4gICAgICB2ZXJzaW9uOiAwLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLnNldENyZWRlbnRpYWxzKHtcbiAgICAgIG51bWJlcjogb3VyTnVtYmVyLFxuICAgICAgdXVpZDogb3VyVXVpZCxcbiAgICAgIHBuaTogb3VyUG5pLFxuICAgICAgZGV2aWNlSWQ6IDIsXG4gICAgICBkZXZpY2VOYW1lOiAnbXkgZGV2aWNlJyxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgIH0pO1xuICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmxvYWQoKTtcblxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICAgIC8vIENyZWF0aW5nIGEgZmFrZSBtZXNzYWdlXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgbWVzc2FnZSA9IG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKHtcbiAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIGJvZHk6ICdiYW5hbmFzJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb24uaWQsXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IG5vdyxcbiAgICAgIGhhc0F0dGFjaG1lbnRzOiBmYWxzZSxcbiAgICAgIGhhc0ZpbGVBdHRhY2htZW50czogZmFsc2UsXG4gICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzOiBmYWxzZSxcbiAgICAgIGlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIHJlY2VpdmVkX2F0OiBub3csXG4gICAgICBzZW50X2F0OiBub3csXG4gICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgIFtjb252ZXJzYXRpb24uaWRdOiB7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgdXBkYXRlZEF0OiBub3csXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gU2F2aW5nIHRvIGRiIGFuZCB1cGRhdGluZyB0aGUgY29udm8ncyBsYXN0IG1lc3NhZ2VcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZS5hdHRyaWJ1dGVzLCB7XG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuICAgIG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIobWVzc2FnZS5pZCwgbWVzc2FnZSk7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgYXdhaXQgY29udmVyc2F0aW9uLnVwZGF0ZUxhc3RNZXNzYWdlKCk7XG5cbiAgICAvLyBTaG91bGQgYmUgc2V0IHRvIGJhbmFuYXMgYmVjYXVzZSB0aGF0J3MgdGhlIGxhc3QgbWVzc2FnZSBzZW50LlxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb252ZXJzYXRpb24uZ2V0KCdsYXN0TWVzc2FnZScpLCAnYmFuYW5hcycpO1xuXG4gICAgLy8gRXJhc2luZyBtZXNzYWdlIGNvbnRlbnRzIChET0UpXG4gICAgbWVzc2FnZS5zZXQoe1xuICAgICAgaXNFcmFzZWQ6IHRydWUsXG4gICAgICBib2R5OiAnJyxcbiAgICAgIGJvZHlSYW5nZXM6IHVuZGVmaW5lZCxcbiAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIHF1b3RlOiB1bmRlZmluZWQsXG4gICAgICBjb250YWN0OiBbXSxcbiAgICAgIHN0aWNrZXI6IHVuZGVmaW5lZCxcbiAgICAgIHByZXZpZXc6IFtdLFxuICAgIH0pO1xuXG4gICAgLy8gTm90IHNhdmluZyB0aGUgbWVzc2FnZSB0byBkYiBvbiBwdXJwb3NlXG4gICAgLy8gdG8gc2ltdWxhdGUgdGhhdCBhIHNhdmUgaGFzbid0IHRha2VuIHBsYWNlIHlldC5cblxuICAgIC8vIFVwZGF0aW5nIGNvbnZvJ3MgbGFzdCBtZXNzYWdlLCBzaG91bGQgcGljayBpdCB1cCBmcm9tIG1lbW9yeVxuICAgIGF3YWl0IGNvbnZlcnNhdGlvbi51cGRhdGVMYXN0TWVzc2FnZSgpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbi5nZXQoJ2xhc3RNZXNzYWdlJyksICcnKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBQ3ZCLDhCQUEyQjtBQUMzQixrQkFBcUI7QUFFckIsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QiwrQ0FBNEQ7QUFDMUQsV0FBTyx1QkFBdUIsTUFBTTtBQUNwQyxVQUFNLE9BQU8sdUJBQXVCLEtBQUs7QUFBQSxFQUMzQztBQUhlLEFBS2YsYUFBVywyQkFBMkI7QUFFdEMsWUFBVSwyQkFBMkI7QUFFckMsS0FBRyx1REFBdUQsWUFBWTtBQUNwRSxVQUFNLFlBQVk7QUFDbEIsVUFBTSxVQUFVLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQ3pDLFVBQU0sU0FBUyxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUd4QyxVQUFNLGVBQWUsSUFBSSxPQUFPLFFBQVEsYUFBYTtBQUFBLE1BQ25ELFNBQVMsQ0FBQztBQUFBLE1BQ1YsSUFBSSxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUFBLE1BQzdCLE1BQU07QUFBQSxNQUNOLE1BQU0saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxNQUMvQixNQUFNO0FBQUEsTUFDTixnQkFBZ0I7QUFBQSxNQUNoQixVQUFVO0FBQUEsTUFDVixjQUFjO0FBQUEsTUFDZCwrQkFBK0I7QUFBQSxNQUMvQixjQUFjO0FBQUEsTUFDZCxrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBRUQsVUFBTSxPQUFPLFdBQVcsUUFBUSxLQUFLLGVBQWU7QUFBQSxNQUNsRCxRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUEsSUFDWixDQUFDO0FBQ0QsVUFBTSxPQUFPLHVCQUF1QixLQUFLO0FBRXpDLFVBQU0sT0FBTyxPQUFPLEtBQUssaUJBQWlCLGFBQWEsVUFBVTtBQUdqRSxVQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFFBQUksVUFBVSxJQUFJLE9BQU8sUUFBUSxRQUFRO0FBQUEsTUFDdkMsYUFBYSxDQUFDO0FBQUEsTUFDZCxNQUFNO0FBQUEsTUFDTixnQkFBZ0IsYUFBYTtBQUFBLE1BQzdCLDBCQUEwQjtBQUFBLE1BQzFCLGdCQUFnQjtBQUFBLE1BQ2hCLG9CQUFvQjtBQUFBLE1BQ3BCLDJCQUEyQjtBQUFBLE1BQzNCLElBQUksaUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxNQUM3QixhQUFhO0FBQUEsTUFDYixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTiwyQkFBMkI7QUFBQSxTQUN4QixhQUFhLEtBQUs7QUFBQSxVQUNqQixRQUFRLG1DQUFXO0FBQUEsVUFDbkIsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBR0QsVUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLFFBQVEsWUFBWTtBQUFBLE1BQ3ZELFdBQVc7QUFBQSxNQUNYO0FBQUEsSUFDRixDQUFDO0FBQ0QsY0FBVSxPQUFPLGtCQUFrQixTQUFTLFFBQVEsSUFBSSxPQUFPO0FBQy9ELFVBQU0sT0FBTyxPQUFPLEtBQUssbUJBQW1CLGFBQWEsVUFBVTtBQUNuRSxVQUFNLGFBQWEsa0JBQWtCO0FBR3JDLHVCQUFPLFlBQVksYUFBYSxJQUFJLGFBQWEsR0FBRyxTQUFTO0FBRzdELFlBQVEsSUFBSTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osYUFBYSxDQUFDO0FBQUEsTUFDZCxPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUM7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQztBQUFBLElBQ1osQ0FBQztBQU1ELFVBQU0sYUFBYSxrQkFBa0I7QUFFckMsdUJBQU8sWUFBWSxhQUFhLElBQUksYUFBYSxHQUFHLEVBQUU7QUFBQSxFQUN4RCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
