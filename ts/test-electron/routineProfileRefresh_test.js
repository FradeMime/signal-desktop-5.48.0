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
var sinon = __toESM(require("sinon"));
var import_lodash = require("lodash");
var import_conversations = require("../models/conversations");
var import_UUID = require("../types/UUID");
var import_routineProfileRefresh = require("../routineProfileRefresh");
describe("routineProfileRefresh", () => {
  let sinonSandbox;
  let getProfileFn;
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
    getProfileFn = sinon.stub();
  });
  afterEach(() => {
    sinonSandbox.restore();
  });
  function makeConversation(overrideAttributes = {}) {
    const result = new import_conversations.ConversationModel({
      accessKey: import_UUID.UUID.generate().toString(),
      active_at: Date.now(),
      draftAttachments: [],
      draftBodyRanges: [],
      draftTimestamp: null,
      id: import_UUID.UUID.generate().toString(),
      inbox_position: 0,
      isPinned: false,
      lastMessageDeletedForEveryone: false,
      lastMessageStatus: "sent",
      left: false,
      markedUnread: false,
      messageCount: 2,
      messageCountBeforeMessageRequests: 0,
      messageRequestResponseType: 0,
      muteExpiresAt: 0,
      profileAvatar: void 0,
      profileKeyCredential: import_UUID.UUID.generate().toString(),
      profileSharing: true,
      quotedMessageId: null,
      sealedSender: 1,
      sentMessageCount: 1,
      sharedGroupNames: [],
      timestamp: Date.now(),
      type: "private",
      uuid: import_UUID.UUID.generate().toString(),
      version: 2,
      ...overrideAttributes
    });
    return result;
  }
  function makeGroup(groupMembers) {
    const result = makeConversation({ type: "group" });
    sinonSandbox.stub(result, "getMembers").returns(groupMembers);
    return result;
  }
  function makeStorage(lastAttemptAt) {
    return {
      get: sinonSandbox.stub().withArgs("lastAttemptedToRefreshProfilesAt").returns(lastAttemptAt),
      put: sinonSandbox.stub().resolves(void 0)
    };
  }
  it("does nothing when the last refresh time is less than 12 hours ago", async () => {
    const conversation1 = makeConversation();
    const conversation2 = makeConversation();
    const storage = makeStorage(Date.now() - 1234);
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [conversation1, conversation2],
      ourConversationId: import_UUID.UUID.generate().toString(),
      storage,
      getProfileFn
    });
    sinon.assert.notCalled(getProfileFn);
    sinon.assert.notCalled(storage.put);
  });
  it("asks conversations to get their profiles", async () => {
    const conversation1 = makeConversation();
    const conversation2 = makeConversation();
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [conversation1, conversation2],
      ourConversationId: import_UUID.UUID.generate().toString(),
      storage: makeStorage(),
      getProfileFn
    });
    sinon.assert.calledWith(getProfileFn, conversation1.get("uuid"), conversation1.get("e164"));
    sinon.assert.calledWith(getProfileFn, conversation2.get("uuid"), conversation2.get("e164"));
  });
  it("skips conversations that haven't been active in 30 days", async () => {
    const recentlyActive = makeConversation();
    const inactive = makeConversation({
      active_at: Date.now() - 31 * 24 * 60 * 60 * 1e3
    });
    const neverActive = makeConversation({ active_at: void 0 });
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [recentlyActive, inactive, neverActive],
      ourConversationId: import_UUID.UUID.generate().toString(),
      storage: makeStorage(),
      getProfileFn
    });
    sinon.assert.calledOnce(getProfileFn);
    sinon.assert.calledWith(getProfileFn, recentlyActive.get("uuid"), recentlyActive.get("e164"));
    sinon.assert.neverCalledWith(getProfileFn, inactive.get("uuid"), inactive.get("e164"));
    sinon.assert.neverCalledWith(getProfileFn, neverActive.get("uuid"), neverActive.get("e164"));
  });
  it("skips your own conversation", async () => {
    const notMe = makeConversation();
    const me = makeConversation();
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [notMe, me],
      ourConversationId: me.id,
      storage: makeStorage(),
      getProfileFn
    });
    sinon.assert.calledWith(getProfileFn, notMe.get("uuid"), notMe.get("e164"));
    sinon.assert.neverCalledWith(getProfileFn, me.get("uuid"), me.get("e164"));
  });
  it("skips conversations that were refreshed in the last hour", async () => {
    const neverRefreshed = makeConversation();
    const recentlyFetched = makeConversation({
      profileLastFetchedAt: Date.now() - 59 * 60 * 1e3
    });
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [neverRefreshed, recentlyFetched],
      ourConversationId: import_UUID.UUID.generate().toString(),
      storage: makeStorage(),
      getProfileFn
    });
    sinon.assert.calledOnce(getProfileFn);
    sinon.assert.calledWith(getProfileFn, neverRefreshed.get("uuid"), neverRefreshed.get("e164"));
    sinon.assert.neverCalledWith(getProfileFn, recentlyFetched.get("uuid"), recentlyFetched.get("e164"));
  });
  it('"digs into" the members of an active group', async () => {
    const privateConversation = makeConversation();
    const recentlyActiveGroupMember = makeConversation();
    const inactiveGroupMember = makeConversation({
      active_at: Date.now() - 31 * 24 * 60 * 60 * 1e3
    });
    const memberWhoHasRecentlyRefreshed = makeConversation({
      profileLastFetchedAt: Date.now() - 59 * 60 * 1e3
    });
    const groupConversation = makeGroup([
      recentlyActiveGroupMember,
      inactiveGroupMember,
      memberWhoHasRecentlyRefreshed
    ]);
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [
        privateConversation,
        recentlyActiveGroupMember,
        inactiveGroupMember,
        memberWhoHasRecentlyRefreshed,
        groupConversation
      ],
      ourConversationId: import_UUID.UUID.generate().toString(),
      storage: makeStorage(),
      getProfileFn
    });
    sinon.assert.calledWith(getProfileFn, privateConversation.get("uuid"), privateConversation.get("e164"));
    sinon.assert.calledWith(getProfileFn, recentlyActiveGroupMember.get("uuid"), recentlyActiveGroupMember.get("e164"));
    sinon.assert.calledWith(getProfileFn, inactiveGroupMember.get("uuid"), inactiveGroupMember.get("e164"));
    sinon.assert.neverCalledWith(getProfileFn, memberWhoHasRecentlyRefreshed.get("uuid"), memberWhoHasRecentlyRefreshed.get("e164"));
    sinon.assert.neverCalledWith(getProfileFn, groupConversation.get("uuid"), groupConversation.get("e164"));
  });
  it("only refreshes profiles for the 50 most recently active direct conversations", async () => {
    const me = makeConversation();
    const activeConversations = (0, import_lodash.times)(40, () => makeConversation());
    const inactiveGroupMembers = (0, import_lodash.times)(10, () => makeConversation({
      active_at: Date.now() - 999 * 24 * 60 * 60 * 1e3
    }));
    const recentlyActiveGroup = makeGroup(inactiveGroupMembers);
    const shouldNotBeIncluded = [
      makeGroup([]),
      makeGroup([me]),
      ...(0, import_lodash.times)(3, () => makeConversation({
        active_at: Date.now() - 365 * 24 * 60 * 60 * 1e3
      })),
      ...(0, import_lodash.times)(3, () => makeGroup(inactiveGroupMembers))
    ];
    await (0, import_routineProfileRefresh.routineProfileRefresh)({
      allConversations: [
        me,
        ...activeConversations,
        recentlyActiveGroup,
        ...inactiveGroupMembers,
        ...shouldNotBeIncluded
      ],
      ourConversationId: me.id,
      storage: makeStorage(),
      getProfileFn
    });
    [...activeConversations, ...inactiveGroupMembers].forEach((conversation) => {
      sinon.assert.calledWith(getProfileFn, conversation.get("uuid"), conversation.get("e164"));
    });
    [me, ...shouldNotBeIncluded].forEach((conversation) => {
      sinon.assert.neverCalledWith(getProfileFn, conversation.get("uuid"), conversation.get("e164"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicm91dGluZVByb2ZpbGVSZWZyZXNoX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcblxuaW1wb3J0IHsgcm91dGluZVByb2ZpbGVSZWZyZXNoIH0gZnJvbSAnLi4vcm91dGluZVByb2ZpbGVSZWZyZXNoJztcblxuZGVzY3JpYmUoJ3JvdXRpbmVQcm9maWxlUmVmcmVzaCcsICgpID0+IHtcbiAgbGV0IHNpbm9uU2FuZGJveDogc2lub24uU2lub25TYW5kYm94O1xuICBsZXQgZ2V0UHJvZmlsZUZuOiBzaW5vbi5TaW5vblN0dWI7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2lub25TYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgIGdldFByb2ZpbGVGbiA9IHNpbm9uLnN0dWIoKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzaW5vblNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcblxuICBmdW5jdGlvbiBtYWtlQ29udmVyc2F0aW9uKFxuICAgIG92ZXJyaWRlQXR0cmlidXRlczogUGFydGlhbDxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4gPSB7fVxuICApOiBDb252ZXJzYXRpb25Nb2RlbCB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IENvbnZlcnNhdGlvbk1vZGVsKHtcbiAgICAgIGFjY2Vzc0tleTogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCksXG4gICAgICBkcmFmdEF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIGRyYWZ0Qm9keVJhbmdlczogW10sXG4gICAgICBkcmFmdFRpbWVzdGFtcDogbnVsbCxcbiAgICAgIGlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIGluYm94X3Bvc2l0aW9uOiAwLFxuICAgICAgaXNQaW5uZWQ6IGZhbHNlLFxuICAgICAgbGFzdE1lc3NhZ2VEZWxldGVkRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgICAgbGFzdE1lc3NhZ2VTdGF0dXM6ICdzZW50JyxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2VDb3VudDogMixcbiAgICAgIG1lc3NhZ2VDb3VudEJlZm9yZU1lc3NhZ2VSZXF1ZXN0czogMCxcbiAgICAgIG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlOiAwLFxuICAgICAgbXV0ZUV4cGlyZXNBdDogMCxcbiAgICAgIHByb2ZpbGVBdmF0YXI6IHVuZGVmaW5lZCxcbiAgICAgIHByb2ZpbGVLZXlDcmVkZW50aWFsOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIHByb2ZpbGVTaGFyaW5nOiB0cnVlLFxuICAgICAgcXVvdGVkTWVzc2FnZUlkOiBudWxsLFxuICAgICAgc2VhbGVkU2VuZGVyOiAxLFxuICAgICAgc2VudE1lc3NhZ2VDb3VudDogMSxcbiAgICAgIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgdHlwZTogJ3ByaXZhdGUnLFxuICAgICAgdXVpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICB2ZXJzaW9uOiAyLFxuICAgICAgLi4ub3ZlcnJpZGVBdHRyaWJ1dGVzLFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlR3JvdXAoXG4gICAgZ3JvdXBNZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25Nb2RlbD5cbiAgKTogQ29udmVyc2F0aW9uTW9kZWwge1xuICAgIGNvbnN0IHJlc3VsdCA9IG1ha2VDb252ZXJzYXRpb24oeyB0eXBlOiAnZ3JvdXAnIH0pO1xuICAgIC8vIFRoaXMgaXMgZWFzaWVyIHRoYW4gc2V0dGluZyB1cCBhbGwgb2YgdGhlIHNjYWZmb2xkaW5nIGZvciBgZ2V0TWVtYmVyc2AuXG4gICAgc2lub25TYW5kYm94LnN0dWIocmVzdWx0LCAnZ2V0TWVtYmVycycpLnJldHVybnMoZ3JvdXBNZW1iZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVN0b3JhZ2UobGFzdEF0dGVtcHRBdD86IG51bWJlcikge1xuICAgIHJldHVybiB7XG4gICAgICBnZXQ6IHNpbm9uU2FuZGJveFxuICAgICAgICAuc3R1YigpXG4gICAgICAgIC53aXRoQXJncygnbGFzdEF0dGVtcHRlZFRvUmVmcmVzaFByb2ZpbGVzQXQnKVxuICAgICAgICAucmV0dXJucyhsYXN0QXR0ZW1wdEF0KSxcbiAgICAgIHB1dDogc2lub25TYW5kYm94LnN0dWIoKS5yZXNvbHZlcyh1bmRlZmluZWQpLFxuICAgIH07XG4gIH1cblxuICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gdGhlIGxhc3QgcmVmcmVzaCB0aW1lIGlzIGxlc3MgdGhhbiAxMiBob3VycyBhZ28nLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uMSA9IG1ha2VDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24yID0gbWFrZUNvbnZlcnNhdGlvbigpO1xuICAgIGNvbnN0IHN0b3JhZ2UgPSBtYWtlU3RvcmFnZShEYXRlLm5vdygpIC0gMTIzNCk7XG5cbiAgICBhd2FpdCByb3V0aW5lUHJvZmlsZVJlZnJlc2goe1xuICAgICAgYWxsQ29udmVyc2F0aW9uczogW2NvbnZlcnNhdGlvbjEsIGNvbnZlcnNhdGlvbjJdLFxuICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgc3RvcmFnZSxcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZ2V0UHJvZmlsZUZuKTtcbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHN0b3JhZ2UucHV0KTtcbiAgfSk7XG5cbiAgaXQoJ2Fza3MgY29udmVyc2F0aW9ucyB0byBnZXQgdGhlaXIgcHJvZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uMSA9IG1ha2VDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24yID0gbWFrZUNvbnZlcnNhdGlvbigpO1xuXG4gICAgYXdhaXQgcm91dGluZVByb2ZpbGVSZWZyZXNoKHtcbiAgICAgIGFsbENvbnZlcnNhdGlvbnM6IFtjb252ZXJzYXRpb24xLCBjb252ZXJzYXRpb24yXSxcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIHN0b3JhZ2U6IG1ha2VTdG9yYWdlKCksXG4gICAgICBnZXRQcm9maWxlRm4sXG4gICAgfSk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICAgIGNvbnZlcnNhdGlvbjEuZ2V0KCd1dWlkJyksXG4gICAgICBjb252ZXJzYXRpb24xLmdldCgnZTE2NCcpXG4gICAgKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICAgIGNvbnZlcnNhdGlvbjIuZ2V0KCd1dWlkJyksXG4gICAgICBjb252ZXJzYXRpb24yLmdldCgnZTE2NCcpXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoXCJza2lwcyBjb252ZXJzYXRpb25zIHRoYXQgaGF2ZW4ndCBiZWVuIGFjdGl2ZSBpbiAzMCBkYXlzXCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZWNlbnRseUFjdGl2ZSA9IG1ha2VDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBpbmFjdGl2ZSA9IG1ha2VDb252ZXJzYXRpb24oe1xuICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpIC0gMzEgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgIH0pO1xuICAgIGNvbnN0IG5ldmVyQWN0aXZlID0gbWFrZUNvbnZlcnNhdGlvbih7IGFjdGl2ZV9hdDogdW5kZWZpbmVkIH0pO1xuXG4gICAgYXdhaXQgcm91dGluZVByb2ZpbGVSZWZyZXNoKHtcbiAgICAgIGFsbENvbnZlcnNhdGlvbnM6IFtyZWNlbnRseUFjdGl2ZSwgaW5hY3RpdmUsIG5ldmVyQWN0aXZlXSxcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIHN0b3JhZ2U6IG1ha2VTdG9yYWdlKCksXG4gICAgICBnZXRQcm9maWxlRm4sXG4gICAgfSk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShnZXRQcm9maWxlRm4pO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgZ2V0UHJvZmlsZUZuLFxuICAgICAgcmVjZW50bHlBY3RpdmUuZ2V0KCd1dWlkJyksXG4gICAgICByZWNlbnRseUFjdGl2ZS5nZXQoJ2UxNjQnKVxuICAgICk7XG4gICAgc2lub24uYXNzZXJ0Lm5ldmVyQ2FsbGVkV2l0aChcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICAgIGluYWN0aXZlLmdldCgndXVpZCcpLFxuICAgICAgaW5hY3RpdmUuZ2V0KCdlMTY0JylcbiAgICApO1xuICAgIHNpbm9uLmFzc2VydC5uZXZlckNhbGxlZFdpdGgoXG4gICAgICBnZXRQcm9maWxlRm4sXG4gICAgICBuZXZlckFjdGl2ZS5nZXQoJ3V1aWQnKSxcbiAgICAgIG5ldmVyQWN0aXZlLmdldCgnZTE2NCcpXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3NraXBzIHlvdXIgb3duIGNvbnZlcnNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBub3RNZSA9IG1ha2VDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBtZSA9IG1ha2VDb252ZXJzYXRpb24oKTtcblxuICAgIGF3YWl0IHJvdXRpbmVQcm9maWxlUmVmcmVzaCh7XG4gICAgICBhbGxDb252ZXJzYXRpb25zOiBbbm90TWUsIG1lXSxcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkOiBtZS5pZCxcbiAgICAgIHN0b3JhZ2U6IG1ha2VTdG9yYWdlKCksXG4gICAgICBnZXRQcm9maWxlRm4sXG4gICAgfSk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChnZXRQcm9maWxlRm4sIG5vdE1lLmdldCgndXVpZCcpLCBub3RNZS5nZXQoJ2UxNjQnKSk7XG4gICAgc2lub24uYXNzZXJ0Lm5ldmVyQ2FsbGVkV2l0aChnZXRQcm9maWxlRm4sIG1lLmdldCgndXVpZCcpLCBtZS5nZXQoJ2UxNjQnKSk7XG4gIH0pO1xuXG4gIGl0KCdza2lwcyBjb252ZXJzYXRpb25zIHRoYXQgd2VyZSByZWZyZXNoZWQgaW4gdGhlIGxhc3QgaG91cicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBuZXZlclJlZnJlc2hlZCA9IG1ha2VDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCByZWNlbnRseUZldGNoZWQgPSBtYWtlQ29udmVyc2F0aW9uKHtcbiAgICAgIHByb2ZpbGVMYXN0RmV0Y2hlZEF0OiBEYXRlLm5vdygpIC0gNTkgKiA2MCAqIDEwMDAsXG4gICAgfSk7XG5cbiAgICBhd2FpdCByb3V0aW5lUHJvZmlsZVJlZnJlc2goe1xuICAgICAgYWxsQ29udmVyc2F0aW9uczogW25ldmVyUmVmcmVzaGVkLCByZWNlbnRseUZldGNoZWRdLFxuICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgc3RvcmFnZTogbWFrZVN0b3JhZ2UoKSxcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGdldFByb2ZpbGVGbik7XG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICBnZXRQcm9maWxlRm4sXG4gICAgICBuZXZlclJlZnJlc2hlZC5nZXQoJ3V1aWQnKSxcbiAgICAgIG5ldmVyUmVmcmVzaGVkLmdldCgnZTE2NCcpXG4gICAgKTtcbiAgICBzaW5vbi5hc3NlcnQubmV2ZXJDYWxsZWRXaXRoKFxuICAgICAgZ2V0UHJvZmlsZUZuLFxuICAgICAgcmVjZW50bHlGZXRjaGVkLmdldCgndXVpZCcpLFxuICAgICAgcmVjZW50bHlGZXRjaGVkLmdldCgnZTE2NCcpXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ1wiZGlncyBpbnRvXCIgdGhlIG1lbWJlcnMgb2YgYW4gYWN0aXZlIGdyb3VwJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHByaXZhdGVDb252ZXJzYXRpb24gPSBtYWtlQ29udmVyc2F0aW9uKCk7XG5cbiAgICBjb25zdCByZWNlbnRseUFjdGl2ZUdyb3VwTWVtYmVyID0gbWFrZUNvbnZlcnNhdGlvbigpO1xuICAgIGNvbnN0IGluYWN0aXZlR3JvdXBNZW1iZXIgPSBtYWtlQ29udmVyc2F0aW9uKHtcbiAgICAgIGFjdGl2ZV9hdDogRGF0ZS5ub3coKSAtIDMxICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICB9KTtcbiAgICBjb25zdCBtZW1iZXJXaG9IYXNSZWNlbnRseVJlZnJlc2hlZCA9IG1ha2VDb252ZXJzYXRpb24oe1xuICAgICAgcHJvZmlsZUxhc3RGZXRjaGVkQXQ6IERhdGUubm93KCkgLSA1OSAqIDYwICogMTAwMCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3VwQ29udmVyc2F0aW9uID0gbWFrZUdyb3VwKFtcbiAgICAgIHJlY2VudGx5QWN0aXZlR3JvdXBNZW1iZXIsXG4gICAgICBpbmFjdGl2ZUdyb3VwTWVtYmVyLFxuICAgICAgbWVtYmVyV2hvSGFzUmVjZW50bHlSZWZyZXNoZWQsXG4gICAgXSk7XG5cbiAgICBhd2FpdCByb3V0aW5lUHJvZmlsZVJlZnJlc2goe1xuICAgICAgYWxsQ29udmVyc2F0aW9uczogW1xuICAgICAgICBwcml2YXRlQ29udmVyc2F0aW9uLFxuICAgICAgICByZWNlbnRseUFjdGl2ZUdyb3VwTWVtYmVyLFxuICAgICAgICBpbmFjdGl2ZUdyb3VwTWVtYmVyLFxuICAgICAgICBtZW1iZXJXaG9IYXNSZWNlbnRseVJlZnJlc2hlZCxcbiAgICAgICAgZ3JvdXBDb252ZXJzYXRpb24sXG4gICAgICBdLFxuICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgc3RvcmFnZTogbWFrZVN0b3JhZ2UoKSxcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgZ2V0UHJvZmlsZUZuLFxuICAgICAgcHJpdmF0ZUNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSxcbiAgICAgIHByaXZhdGVDb252ZXJzYXRpb24uZ2V0KCdlMTY0JylcbiAgICApO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgZ2V0UHJvZmlsZUZuLFxuICAgICAgcmVjZW50bHlBY3RpdmVHcm91cE1lbWJlci5nZXQoJ3V1aWQnKSxcbiAgICAgIHJlY2VudGx5QWN0aXZlR3JvdXBNZW1iZXIuZ2V0KCdlMTY0JylcbiAgICApO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgZ2V0UHJvZmlsZUZuLFxuICAgICAgaW5hY3RpdmVHcm91cE1lbWJlci5nZXQoJ3V1aWQnKSxcbiAgICAgIGluYWN0aXZlR3JvdXBNZW1iZXIuZ2V0KCdlMTY0JylcbiAgICApO1xuICAgIHNpbm9uLmFzc2VydC5uZXZlckNhbGxlZFdpdGgoXG4gICAgICBnZXRQcm9maWxlRm4sXG4gICAgICBtZW1iZXJXaG9IYXNSZWNlbnRseVJlZnJlc2hlZC5nZXQoJ3V1aWQnKSxcbiAgICAgIG1lbWJlcldob0hhc1JlY2VudGx5UmVmcmVzaGVkLmdldCgnZTE2NCcpXG4gICAgKTtcbiAgICBzaW5vbi5hc3NlcnQubmV2ZXJDYWxsZWRXaXRoKFxuICAgICAgZ2V0UHJvZmlsZUZuLFxuICAgICAgZ3JvdXBDb252ZXJzYXRpb24uZ2V0KCd1dWlkJyksXG4gICAgICBncm91cENvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdvbmx5IHJlZnJlc2hlcyBwcm9maWxlcyBmb3IgdGhlIDUwIG1vc3QgcmVjZW50bHkgYWN0aXZlIGRpcmVjdCBjb252ZXJzYXRpb25zJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG1lID0gbWFrZUNvbnZlcnNhdGlvbigpO1xuXG4gICAgY29uc3QgYWN0aXZlQ29udmVyc2F0aW9ucyA9IHRpbWVzKDQwLCAoKSA9PiBtYWtlQ29udmVyc2F0aW9uKCkpO1xuXG4gICAgY29uc3QgaW5hY3RpdmVHcm91cE1lbWJlcnMgPSB0aW1lcygxMCwgKCkgPT5cbiAgICAgIG1ha2VDb252ZXJzYXRpb24oe1xuICAgICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCkgLSA5OTkgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgICAgfSlcbiAgICApO1xuICAgIGNvbnN0IHJlY2VudGx5QWN0aXZlR3JvdXAgPSBtYWtlR3JvdXAoaW5hY3RpdmVHcm91cE1lbWJlcnMpO1xuXG4gICAgY29uc3Qgc2hvdWxkTm90QmVJbmNsdWRlZCA9IFtcbiAgICAgIC8vIFJlY2VudGx5LWFjdGl2ZSBncm91cHMgd2l0aCBubyBvdGhlciBtZW1iZXJzXG4gICAgICBtYWtlR3JvdXAoW10pLFxuICAgICAgbWFrZUdyb3VwKFttZV0pLFxuICAgICAgLy8gT2xkIGRpcmVjdCBjb252ZXJzYXRpb25zXG4gICAgICAuLi50aW1lcygzLCAoKSA9PlxuICAgICAgICBtYWtlQ29udmVyc2F0aW9uKHtcbiAgICAgICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCkgLSAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIC8vIE9sZCBncm91cHNcbiAgICAgIC4uLnRpbWVzKDMsICgpID0+IG1ha2VHcm91cChpbmFjdGl2ZUdyb3VwTWVtYmVycykpLFxuICAgIF07XG5cbiAgICBhd2FpdCByb3V0aW5lUHJvZmlsZVJlZnJlc2goe1xuICAgICAgYWxsQ29udmVyc2F0aW9uczogW1xuICAgICAgICBtZSxcblxuICAgICAgICAuLi5hY3RpdmVDb252ZXJzYXRpb25zLFxuXG4gICAgICAgIHJlY2VudGx5QWN0aXZlR3JvdXAsXG4gICAgICAgIC4uLmluYWN0aXZlR3JvdXBNZW1iZXJzLFxuXG4gICAgICAgIC4uLnNob3VsZE5vdEJlSW5jbHVkZWQsXG4gICAgICBdLFxuICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6IG1lLmlkLFxuICAgICAgc3RvcmFnZTogbWFrZVN0b3JhZ2UoKSxcbiAgICAgIGdldFByb2ZpbGVGbixcbiAgICB9KTtcblxuICAgIFsuLi5hY3RpdmVDb252ZXJzYXRpb25zLCAuLi5pbmFjdGl2ZUdyb3VwTWVtYmVyc10uZm9yRWFjaChjb252ZXJzYXRpb24gPT4ge1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgIGdldFByb2ZpbGVGbixcbiAgICAgICAgY29udmVyc2F0aW9uLmdldCgndXVpZCcpLFxuICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBbbWUsIC4uLnNob3VsZE5vdEJlSW5jbHVkZWRdLmZvckVhY2goY29udmVyc2F0aW9uID0+IHtcbiAgICAgIHNpbm9uLmFzc2VydC5uZXZlckNhbGxlZFdpdGgoXG4gICAgICAgIGdldFByb2ZpbGVGbixcbiAgICAgICAgY29udmVyc2F0aW9uLmdldCgndXVpZCcpLFxuICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsWUFBdUI7QUFDdkIsb0JBQXNCO0FBQ3RCLDJCQUFrQztBQUVsQyxrQkFBcUI7QUFFckIsbUNBQXNDO0FBRXRDLFNBQVMseUJBQXlCLE1BQU07QUFDdEMsTUFBSTtBQUNKLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixtQkFBZSxNQUFNLGNBQWM7QUFDbkMsbUJBQWUsTUFBTSxLQUFLO0FBQUEsRUFDNUIsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLGlCQUFhLFFBQVE7QUFBQSxFQUN2QixDQUFDO0FBRUQsNEJBQ0UscUJBQTBELENBQUMsR0FDeEM7QUFDbkIsVUFBTSxTQUFTLElBQUksdUNBQWtCO0FBQUEsTUFDbkMsV0FBVyxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUFBLE1BQ3BDLFdBQVcsS0FBSyxJQUFJO0FBQUEsTUFDcEIsa0JBQWtCLENBQUM7QUFBQSxNQUNuQixpQkFBaUIsQ0FBQztBQUFBLE1BQ2xCLGdCQUFnQjtBQUFBLE1BQ2hCLElBQUksaUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxNQUM3QixnQkFBZ0I7QUFBQSxNQUNoQixVQUFVO0FBQUEsTUFDViwrQkFBK0I7QUFBQSxNQUMvQixtQkFBbUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxtQ0FBbUM7QUFBQSxNQUNuQyw0QkFBNEI7QUFBQSxNQUM1QixlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixzQkFBc0IsaUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxNQUMvQyxnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixjQUFjO0FBQUEsTUFDZCxrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0IsQ0FBQztBQUFBLE1BQ25CLFdBQVcsS0FBSyxJQUFJO0FBQUEsTUFD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
