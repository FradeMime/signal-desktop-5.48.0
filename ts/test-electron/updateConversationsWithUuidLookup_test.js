var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var import_sinon = __toESM(require("sinon"));
var import_conversations = require("../models/conversations");
var import_UUID = require("../types/UUID");
var import_updateConversationsWithUuidLookup = require("../updateConversationsWithUuidLookup");
describe("updateConversationsWithUuidLookup", () => {
  class FakeConversationController {
    constructor(conversations = []) {
      this.conversations = conversations;
    }
    get(id) {
      return this.conversations.find((conversation) => conversation.id === id || conversation.get("e164") === id || conversation.get("uuid") === id);
    }
    ensureContactIds({
      e164,
      uuid: uuidFromServer,
      highTrust
    }) {
      (0, import_chai.assert)(e164, "FakeConversationController is not set up for this case (E164 must be provided)");
      (0, import_chai.assert)(uuidFromServer, "FakeConversationController is not set up for this case (UUID must be provided)");
      (0, import_chai.assert)(highTrust, 'FakeConversationController is not set up for this case (must be "high trust")');
      const normalizedUuid = uuidFromServer.toLowerCase();
      const convoE164 = this.get(e164);
      const convoUuid = this.get(normalizedUuid);
      (0, import_chai.assert)(convoE164 || convoUuid, "FakeConversationController is not set up for this case (at least one conversation should be found)");
      if (convoE164 && convoUuid) {
        if (convoE164 === convoUuid) {
          return convoUuid.get("id");
        }
        convoE164.unset("e164");
        convoUuid.updateE164(e164);
        return convoUuid.get("id");
      }
      if (convoE164 && !convoUuid) {
        convoE164.updateUuid(normalizedUuid);
        return convoE164.get("id");
      }
      import_chai.assert.fail("FakeConversationController should never get here");
      return void 0;
    }
  }
  function createConversation(attributes = {}) {
    return new import_conversations.ConversationModel({
      id: import_UUID.UUID.generate().toString(),
      inbox_position: 0,
      isPinned: false,
      lastMessageDeletedForEveryone: false,
      markedUnread: false,
      messageCount: 1,
      profileSharing: true,
      sentMessageCount: 0,
      type: "private",
      version: 0,
      ...attributes
    });
  }
  let sinonSandbox;
  let fakeGetUuidsForE164s;
  let fakeCheckAccountExistence;
  let fakeMessaging;
  beforeEach(() => {
    sinonSandbox = import_sinon.default.createSandbox();
    sinonSandbox.stub(window.Signal.Data, "updateConversation");
    fakeGetUuidsForE164s = sinonSandbox.stub().resolves({});
    fakeCheckAccountExistence = sinonSandbox.stub().resolves(false);
    fakeMessaging = {
      getUuidsForE164s: fakeGetUuidsForE164s,
      checkAccountExistence: fakeCheckAccountExistence
    };
  });
  afterEach(() => {
    sinonSandbox.restore();
  });
  it("does nothing when called with an empty array", async () => {
    await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
      conversationController: new FakeConversationController(),
      conversations: [],
      messaging: fakeMessaging
    });
    import_sinon.default.assert.notCalled(fakeMessaging.getUuidsForE164s);
  });
  it("does nothing when called with an array of conversations that lack E164s", async () => {
    await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
      conversationController: new FakeConversationController(),
      conversations: [
        createConversation(),
        createConversation({ uuid: import_UUID.UUID.generate().toString() })
      ],
      messaging: fakeMessaging
    });
    import_sinon.default.assert.notCalled(fakeMessaging.getUuidsForE164s);
  });
  it("updates conversations with their UUID", async () => {
    const conversation1 = createConversation({ e164: "+13215559876" });
    const conversation2 = createConversation({
      e164: "+16545559876",
      uuid: import_UUID.UUID.generate().toString()
    });
    const uuid1 = import_UUID.UUID.generate().toString();
    const uuid2 = import_UUID.UUID.generate().toString();
    fakeGetUuidsForE164s.resolves({
      "+13215559876": uuid1,
      "+16545559876": uuid2
    });
    await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
      conversationController: new FakeConversationController([
        conversation1,
        conversation2
      ]),
      conversations: [conversation1, conversation2],
      messaging: fakeMessaging
    });
    import_chai.assert.strictEqual(conversation1.get("uuid"), uuid1);
    import_chai.assert.strictEqual(conversation2.get("uuid"), uuid2);
  });
  it("marks conversations unregistered if we didn't have a UUID for them and the server also doesn't have one", async () => {
    const conversation = createConversation({ e164: "+13215559876" });
    import_chai.assert.isUndefined(conversation.get("discoveredUnregisteredAt"), "Test was not set up correctly");
    fakeGetUuidsForE164s.resolves({ "+13215559876": null });
    await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
      conversationController: new FakeConversationController([conversation]),
      conversations: [conversation],
      messaging: fakeMessaging
    });
    import_chai.assert.approximately(conversation.get("discoveredUnregisteredAt") || 0, Date.now(), 5e3);
  });
  it("doesn't mark conversations unregistered if we already had a UUID for them, even if the account exists on server", async () => {
    const existingUuid = import_UUID.UUID.generate().toString();
    const conversation = createConversation({
      e164: "+13215559876",
      uuid: existingUuid
    });
    import_chai.assert.isUndefined(conversation.get("discoveredUnregisteredAt"), "Test was not set up correctly");
    fakeGetUuidsForE164s.resolves({ "+13215559876": null });
    fakeCheckAccountExistence.resolves(true);
    await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
      conversationController: new FakeConversationController([conversation]),
      conversations: [conversation],
      messaging: fakeMessaging
    });
    import_chai.assert.strictEqual(conversation.get("uuid"), existingUuid);
    import_chai.assert.isUndefined(conversation.get("discoveredUnregisteredAt"));
  });
  it("marks conversations unregistered if we already had a UUID for them, even if the account does not exist on server", async () => {
    const existingUuid = import_UUID.UUID.generate().toString();
    const conversation = createConversation({
      e164: "+13215559876",
      uuid: existingUuid
    });
    import_chai.assert.isUndefined(conversation.get("discoveredUnregisteredAt"), "Test was not set up correctly");
    fakeGetUuidsForE164s.resolves({ "+13215559876": null });
    fakeCheckAccountExistence.resolves(false);
    await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
      conversationController: new FakeConversationController([conversation]),
      conversations: [conversation],
      messaging: fakeMessaging
    });
    import_chai.assert.strictEqual(conversation.get("uuid"), existingUuid);
    import_chai.assert.isNumber(conversation.get("discoveredUnregisteredAt"));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlQ29udmVyc2F0aW9uc1dpdGhVdWlkTG9va3VwX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIFNlbmRNZXNzYWdlIGZyb20gJy4uL3RleHRzZWN1cmUvU2VuZE1lc3NhZ2UnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuXG5pbXBvcnQgeyB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAgfSBmcm9tICcuLi91cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAnO1xuXG5kZXNjcmliZSgndXBkYXRlQ29udmVyc2F0aW9uc1dpdGhVdWlkTG9va3VwJywgKCkgPT4ge1xuICBjbGFzcyBGYWtlQ29udmVyc2F0aW9uQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnZlcnNhdGlvbnM6IEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPiA9IFtdXG4gICAgKSB7fVxuXG4gICAgZ2V0KGlkPzogc3RyaW5nIHwgbnVsbCk6IENvbnZlcnNhdGlvbk1vZGVsIHwgdW5kZWZpbmVkIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnNhdGlvbnMuZmluZChcbiAgICAgICAgY29udmVyc2F0aW9uID0+XG4gICAgICAgICAgY29udmVyc2F0aW9uLmlkID09PSBpZCB8fFxuICAgICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKSA9PT0gaWQgfHxcbiAgICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCd1dWlkJykgPT09IGlkXG4gICAgICApO1xuICAgIH1cblxuICAgIGVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgZTE2NCxcbiAgICAgIHV1aWQ6IHV1aWRGcm9tU2VydmVyLFxuICAgICAgaGlnaFRydXN0LFxuICAgIH06IHtcbiAgICAgIGUxNjQ/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgdXVpZD86IHN0cmluZyB8IG51bGw7XG4gICAgICBoaWdoVHJ1c3Q/OiBib29sZWFuO1xuICAgIH0pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBlMTY0LFxuICAgICAgICAnRmFrZUNvbnZlcnNhdGlvbkNvbnRyb2xsZXIgaXMgbm90IHNldCB1cCBmb3IgdGhpcyBjYXNlIChFMTY0IG11c3QgYmUgcHJvdmlkZWQpJ1xuICAgICAgKTtcbiAgICAgIGFzc2VydChcbiAgICAgICAgdXVpZEZyb21TZXJ2ZXIsXG4gICAgICAgICdGYWtlQ29udmVyc2F0aW9uQ29udHJvbGxlciBpcyBub3Qgc2V0IHVwIGZvciB0aGlzIGNhc2UgKFVVSUQgbXVzdCBiZSBwcm92aWRlZCknXG4gICAgICApO1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBoaWdoVHJ1c3QsXG4gICAgICAgICdGYWtlQ29udmVyc2F0aW9uQ29udHJvbGxlciBpcyBub3Qgc2V0IHVwIGZvciB0aGlzIGNhc2UgKG11c3QgYmUgXCJoaWdoIHRydXN0XCIpJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVdWlkID0gdXVpZEZyb21TZXJ2ZXIhLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGNvbnN0IGNvbnZvRTE2NCA9IHRoaXMuZ2V0KGUxNjQpO1xuICAgICAgY29uc3QgY29udm9VdWlkID0gdGhpcy5nZXQobm9ybWFsaXplZFV1aWQpO1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBjb252b0UxNjQgfHwgY29udm9VdWlkLFxuICAgICAgICAnRmFrZUNvbnZlcnNhdGlvbkNvbnRyb2xsZXIgaXMgbm90IHNldCB1cCBmb3IgdGhpcyBjYXNlIChhdCBsZWFzdCBvbmUgY29udmVyc2F0aW9uIHNob3VsZCBiZSBmb3VuZCknXG4gICAgICApO1xuXG4gICAgICBpZiAoY29udm9FMTY0ICYmIGNvbnZvVXVpZCkge1xuICAgICAgICBpZiAoY29udm9FMTY0ID09PSBjb252b1V1aWQpIHtcbiAgICAgICAgICByZXR1cm4gY29udm9VdWlkLmdldCgnaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZvRTE2NC51bnNldCgnZTE2NCcpO1xuICAgICAgICBjb252b1V1aWQudXBkYXRlRTE2NChlMTY0KTtcbiAgICAgICAgcmV0dXJuIGNvbnZvVXVpZC5nZXQoJ2lkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb252b0UxNjQgJiYgIWNvbnZvVXVpZCkge1xuICAgICAgICBjb252b0UxNjQudXBkYXRlVXVpZChub3JtYWxpemVkVXVpZCk7XG4gICAgICAgIHJldHVybiBjb252b0UxNjQuZ2V0KCdpZCcpO1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQuZmFpbCgnRmFrZUNvbnZlcnNhdGlvbkNvbnRyb2xsZXIgc2hvdWxkIG5ldmVyIGdldCBoZXJlJyk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnZlcnNhdGlvbihcbiAgICBhdHRyaWJ1dGVzOiBSZWFkb25seTxQYXJ0aWFsPENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlPj4gPSB7fVxuICApOiBDb252ZXJzYXRpb25Nb2RlbCB7XG4gICAgcmV0dXJuIG5ldyBDb252ZXJzYXRpb25Nb2RlbCh7XG4gICAgICBpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICBpbmJveF9wb3NpdGlvbjogMCxcbiAgICAgIGlzUGlubmVkOiBmYWxzZSxcbiAgICAgIGxhc3RNZXNzYWdlRGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gICAgICBtZXNzYWdlQ291bnQ6IDEsXG4gICAgICBwcm9maWxlU2hhcmluZzogdHJ1ZSxcbiAgICAgIHNlbnRNZXNzYWdlQ291bnQ6IDAsXG4gICAgICB0eXBlOiAncHJpdmF0ZScgYXMgY29uc3QsXG4gICAgICB2ZXJzaW9uOiAwLFxuICAgICAgLi4uYXR0cmlidXRlcyxcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBzaW5vblNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBsZXQgZmFrZUdldFV1aWRzRm9yRTE2NHM6IHNpbm9uLlNpbm9uU3R1YjtcbiAgbGV0IGZha2VDaGVja0FjY291bnRFeGlzdGVuY2U6IHNpbm9uLlNpbm9uU3R1YjtcbiAgbGV0IGZha2VNZXNzYWdpbmc6IFBpY2s8XG4gICAgU2VuZE1lc3NhZ2UsXG4gICAgJ2dldFV1aWRzRm9yRTE2NHMnIHwgJ2NoZWNrQWNjb3VudEV4aXN0ZW5jZSdcbiAgPjtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzaW5vblNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG5cbiAgICBzaW5vblNhbmRib3guc3R1Yih3aW5kb3cuU2lnbmFsLkRhdGEsICd1cGRhdGVDb252ZXJzYXRpb24nKTtcblxuICAgIGZha2VHZXRVdWlkc0ZvckUxNjRzID0gc2lub25TYW5kYm94LnN0dWIoKS5yZXNvbHZlcyh7fSk7XG4gICAgZmFrZUNoZWNrQWNjb3VudEV4aXN0ZW5jZSA9IHNpbm9uU2FuZGJveC5zdHViKCkucmVzb2x2ZXMoZmFsc2UpO1xuICAgIGZha2VNZXNzYWdpbmcgPSB7XG4gICAgICBnZXRVdWlkc0ZvckUxNjRzOiBmYWtlR2V0VXVpZHNGb3JFMTY0cyxcbiAgICAgIGNoZWNrQWNjb3VudEV4aXN0ZW5jZTogZmFrZUNoZWNrQWNjb3VudEV4aXN0ZW5jZSxcbiAgICB9O1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHNpbm9uU2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdGhpbmcgd2hlbiBjYWxsZWQgd2l0aCBhbiBlbXB0eSBhcnJheScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAoe1xuICAgICAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogbmV3IEZha2VDb252ZXJzYXRpb25Db250cm9sbGVyKCksXG4gICAgICBjb252ZXJzYXRpb25zOiBbXSxcbiAgICAgIG1lc3NhZ2luZzogZmFrZU1lc3NhZ2luZyxcbiAgICB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZU1lc3NhZ2luZy5nZXRVdWlkc0ZvckUxNjRzIGFzIHNpbm9uLlNpbm9uU3R1Yik7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdGhpbmcgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcnJheSBvZiBjb252ZXJzYXRpb25zIHRoYXQgbGFjayBFMTY0cycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAoe1xuICAgICAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogbmV3IEZha2VDb252ZXJzYXRpb25Db250cm9sbGVyKCksXG4gICAgICBjb252ZXJzYXRpb25zOiBbXG4gICAgICAgIGNyZWF0ZUNvbnZlcnNhdGlvbigpLFxuICAgICAgICBjcmVhdGVDb252ZXJzYXRpb24oeyB1dWlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSB9KSxcbiAgICAgIF0sXG4gICAgICBtZXNzYWdpbmc6IGZha2VNZXNzYWdpbmcsXG4gICAgfSk7XG5cbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VNZXNzYWdpbmcuZ2V0VXVpZHNGb3JFMTY0cyBhcyBzaW5vbi5TaW5vblN0dWIpO1xuICB9KTtcblxuICBpdCgndXBkYXRlcyBjb252ZXJzYXRpb25zIHdpdGggdGhlaXIgVVVJRCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24xID0gY3JlYXRlQ29udmVyc2F0aW9uKHsgZTE2NDogJysxMzIxNTU1OTg3NicgfSk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uMiA9IGNyZWF0ZUNvbnZlcnNhdGlvbih7XG4gICAgICBlMTY0OiAnKzE2NTQ1NTU5ODc2JyxcbiAgICAgIHV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLCAvLyBzaG91bGQgYmUgb3ZlcndyaXR0ZW5cbiAgICB9KTtcblxuICAgIGNvbnN0IHV1aWQxID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgdXVpZDIgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcblxuICAgIGZha2VHZXRVdWlkc0ZvckUxNjRzLnJlc29sdmVzKHtcbiAgICAgICcrMTMyMTU1NTk4NzYnOiB1dWlkMSxcbiAgICAgICcrMTY1NDU1NTk4NzYnOiB1dWlkMixcbiAgICB9KTtcblxuICAgIGF3YWl0IHVwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cCh7XG4gICAgICBjb252ZXJzYXRpb25Db250cm9sbGVyOiBuZXcgRmFrZUNvbnZlcnNhdGlvbkNvbnRyb2xsZXIoW1xuICAgICAgICBjb252ZXJzYXRpb24xLFxuICAgICAgICBjb252ZXJzYXRpb24yLFxuICAgICAgXSksXG4gICAgICBjb252ZXJzYXRpb25zOiBbY29udmVyc2F0aW9uMSwgY29udmVyc2F0aW9uMl0sXG4gICAgICBtZXNzYWdpbmc6IGZha2VNZXNzYWdpbmcsXG4gICAgfSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29udmVyc2F0aW9uMS5nZXQoJ3V1aWQnKSwgdXVpZDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb252ZXJzYXRpb24yLmdldCgndXVpZCcpLCB1dWlkMik7XG4gIH0pO1xuXG4gIGl0KFwibWFya3MgY29udmVyc2F0aW9ucyB1bnJlZ2lzdGVyZWQgaWYgd2UgZGlkbid0IGhhdmUgYSBVVUlEIGZvciB0aGVtIGFuZCB0aGUgc2VydmVyIGFsc28gZG9lc24ndCBoYXZlIG9uZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gY3JlYXRlQ29udmVyc2F0aW9uKHsgZTE2NDogJysxMzIxNTU1OTg3NicgfSk7XG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgY29udmVyc2F0aW9uLmdldCgnZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0JyksXG4gICAgICAnVGVzdCB3YXMgbm90IHNldCB1cCBjb3JyZWN0bHknXG4gICAgKTtcblxuICAgIGZha2VHZXRVdWlkc0ZvckUxNjRzLnJlc29sdmVzKHsgJysxMzIxNTU1OTg3Nic6IG51bGwgfSk7XG5cbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAoe1xuICAgICAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogbmV3IEZha2VDb252ZXJzYXRpb25Db250cm9sbGVyKFtjb252ZXJzYXRpb25dKSxcbiAgICAgIGNvbnZlcnNhdGlvbnM6IFtjb252ZXJzYXRpb25dLFxuICAgICAgbWVzc2FnaW5nOiBmYWtlTWVzc2FnaW5nLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0LmFwcHJveGltYXRlbHkoXG4gICAgICBjb252ZXJzYXRpb24uZ2V0KCdkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQnKSB8fCAwLFxuICAgICAgRGF0ZS5ub3coKSxcbiAgICAgIDUwMDBcbiAgICApO1xuICB9KTtcblxuICBpdChcImRvZXNuJ3QgbWFyayBjb252ZXJzYXRpb25zIHVucmVnaXN0ZXJlZCBpZiB3ZSBhbHJlYWR5IGhhZCBhIFVVSUQgZm9yIHRoZW0sIGV2ZW4gaWYgdGhlIGFjY291bnQgZXhpc3RzIG9uIHNlcnZlclwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZXhpc3RpbmdVdWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gY3JlYXRlQ29udmVyc2F0aW9uKHtcbiAgICAgIGUxNjQ6ICcrMTMyMTU1NTk4NzYnLFxuICAgICAgdXVpZDogZXhpc3RpbmdVdWlkLFxuICAgIH0pO1xuICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ2Rpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdCcpLFxuICAgICAgJ1Rlc3Qgd2FzIG5vdCBzZXQgdXAgY29ycmVjdGx5J1xuICAgICk7XG5cbiAgICBmYWtlR2V0VXVpZHNGb3JFMTY0cy5yZXNvbHZlcyh7ICcrMTMyMTU1NTk4NzYnOiBudWxsIH0pO1xuICAgIGZha2VDaGVja0FjY291bnRFeGlzdGVuY2UucmVzb2x2ZXModHJ1ZSk7XG5cbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAoe1xuICAgICAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogbmV3IEZha2VDb252ZXJzYXRpb25Db250cm9sbGVyKFtjb252ZXJzYXRpb25dKSxcbiAgICAgIGNvbnZlcnNhdGlvbnM6IFtjb252ZXJzYXRpb25dLFxuICAgICAgbWVzc2FnaW5nOiBmYWtlTWVzc2FnaW5nLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSwgZXhpc3RpbmdVdWlkKTtcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQoY29udmVyc2F0aW9uLmdldCgnZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0JykpO1xuICB9KTtcblxuICBpdCgnbWFya3MgY29udmVyc2F0aW9ucyB1bnJlZ2lzdGVyZWQgaWYgd2UgYWxyZWFkeSBoYWQgYSBVVUlEIGZvciB0aGVtLCBldmVuIGlmIHRoZSBhY2NvdW50IGRvZXMgbm90IGV4aXN0IG9uIHNlcnZlcicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBleGlzdGluZ1V1aWQgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSBjcmVhdGVDb252ZXJzYXRpb24oe1xuICAgICAgZTE2NDogJysxMzIxNTU1OTg3NicsXG4gICAgICB1dWlkOiBleGlzdGluZ1V1aWQsXG4gICAgfSk7XG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgY29udmVyc2F0aW9uLmdldCgnZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0JyksXG4gICAgICAnVGVzdCB3YXMgbm90IHNldCB1cCBjb3JyZWN0bHknXG4gICAgKTtcblxuICAgIGZha2VHZXRVdWlkc0ZvckUxNjRzLnJlc29sdmVzKHsgJysxMzIxNTU1OTg3Nic6IG51bGwgfSk7XG4gICAgZmFrZUNoZWNrQWNjb3VudEV4aXN0ZW5jZS5yZXNvbHZlcyhmYWxzZSk7XG5cbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAoe1xuICAgICAgY29udmVyc2F0aW9uQ29udHJvbGxlcjogbmV3IEZha2VDb252ZXJzYXRpb25Db250cm9sbGVyKFtjb252ZXJzYXRpb25dKSxcbiAgICAgIGNvbnZlcnNhdGlvbnM6IFtjb252ZXJzYXRpb25dLFxuICAgICAgbWVzc2FnaW5nOiBmYWtlTWVzc2FnaW5nLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSwgZXhpc3RpbmdVdWlkKTtcbiAgICBhc3NlcnQuaXNOdW1iZXIoY29udmVyc2F0aW9uLmdldCgnZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0JykpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLGtCQUF1QjtBQUN2QixtQkFBa0I7QUFDbEIsMkJBQWtDO0FBR2xDLGtCQUFxQjtBQUVyQiwrQ0FBa0Q7QUFFbEQsU0FBUyxxQ0FBcUMsTUFBTTtBQUNsRCxRQUFNLDJCQUEyQjtB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
