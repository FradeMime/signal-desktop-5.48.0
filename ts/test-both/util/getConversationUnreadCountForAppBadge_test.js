var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_getConversationUnreadCountForAppBadge = require("../../util/getConversationUnreadCountForAppBadge");
describe("getConversationUnreadCountForAppBadge", () => {
  const getCount = import_getConversationUnreadCountForAppBadge.getConversationUnreadCountForAppBadge;
  const mutedTimestamp = /* @__PURE__ */ __name(() => Date.now() + 12345, "mutedTimestamp");
  const oldMutedTimestamp = /* @__PURE__ */ __name(() => Date.now() - 1e3, "oldMutedTimestamp");
  it("returns 0 if the conversation is archived", () => {
    const archivedConversations = [
      {
        active_at: Date.now(),
        isArchived: true,
        markedUnread: false,
        unreadCount: 0
      },
      {
        active_at: Date.now(),
        isArchived: true,
        markedUnread: false,
        unreadCount: 123
      },
      {
        active_at: Date.now(),
        isArchived: true,
        markedUnread: true,
        unreadCount: 0
      },
      { active_at: Date.now(), isArchived: true, markedUnread: true }
    ];
    for (const conversation of archivedConversations) {
      import_chai.assert.strictEqual(getCount(conversation, true), 0);
      import_chai.assert.strictEqual(getCount(conversation, false), 0);
    }
  });
  it("returns 0 if the conversation is muted and the user doesn't want to include those in the result", () => {
    const mutedConversations = [
      {
        active_at: Date.now(),
        muteExpiresAt: mutedTimestamp(),
        markedUnread: false,
        unreadCount: 0
      },
      {
        active_at: Date.now(),
        muteExpiresAt: mutedTimestamp(),
        markedUnread: false,
        unreadCount: 9
      },
      {
        active_at: Date.now(),
        muteExpiresAt: mutedTimestamp(),
        markedUnread: true,
        unreadCount: 0
      },
      {
        active_at: Date.now(),
        muteExpiresAt: mutedTimestamp(),
        markedUnread: true
      }
    ];
    for (const conversation of mutedConversations) {
      import_chai.assert.strictEqual(getCount(conversation, false), 0);
    }
  });
  it("returns the unread count if nonzero (and not archived)", () => {
    const conversationsWithUnreadCount = [
      { active_at: Date.now(), unreadCount: 9, markedUnread: false },
      { active_at: Date.now(), unreadCount: 9, markedUnread: true },
      {
        active_at: Date.now(),
        unreadCount: 9,
        markedUnread: false,
        muteExpiresAt: oldMutedTimestamp()
      },
      {
        active_at: Date.now(),
        unreadCount: 9,
        markedUnread: false,
        isArchived: false
      }
    ];
    for (const conversation of conversationsWithUnreadCount) {
      import_chai.assert.strictEqual(getCount(conversation, false), 9);
      import_chai.assert.strictEqual(getCount(conversation, true), 9);
    }
    const mutedWithUnreads = {
      active_at: Date.now(),
      unreadCount: 123,
      markedUnread: false,
      muteExpiresAt: mutedTimestamp()
    };
    import_chai.assert.strictEqual(getCount(mutedWithUnreads, true), 123);
  });
  it("returns 1 if the conversation is marked unread", () => {
    const conversationsMarkedUnread = [
      { active_at: Date.now(), markedUnread: true },
      { active_at: Date.now(), markedUnread: true, unreadCount: 0 },
      {
        active_at: Date.now(),
        markedUnread: true,
        muteExpiresAt: oldMutedTimestamp()
      },
      {
        active_at: Date.now(),
        markedUnread: true,
        muteExpiresAt: oldMutedTimestamp(),
        isArchived: false
      }
    ];
    for (const conversation of conversationsMarkedUnread) {
      import_chai.assert.strictEqual(getCount(conversation, false), 1);
      import_chai.assert.strictEqual(getCount(conversation, true), 1);
    }
    const mutedConversationsMarkedUnread = [
      {
        active_at: Date.now(),
        markedUnread: true,
        muteExpiresAt: mutedTimestamp()
      },
      {
        active_at: Date.now(),
        markedUnread: true,
        muteExpiresAt: mutedTimestamp(),
        unreadCount: 0
      }
    ];
    for (const conversation of mutedConversationsMarkedUnread) {
      import_chai.assert.strictEqual(getCount(conversation, true), 1);
    }
  });
  it("returns 0 if the conversation is read", () => {
    const readConversations = [
      { active_at: Date.now(), markedUnread: false },
      { active_at: Date.now(), markedUnread: false, unreadCount: 0 },
      {
        active_at: Date.now(),
        markedUnread: false,
        mutedTimestamp: mutedTimestamp()
      },
      {
        active_at: Date.now(),
        markedUnread: false,
        mutedTimestamp: oldMutedTimestamp()
      }
    ];
    for (const conversation of readConversations) {
      import_chai.assert.strictEqual(getCount(conversation, false), 0);
      import_chai.assert.strictEqual(getCount(conversation, true), 0);
    }
  });
  it("returns 0 if the conversation has falsey active_at", () => {
    const readConversations = [
      { active_at: void 0, markedUnread: false, unreadCount: 2 },
      { active_at: null, markedUnread: true, unreadCount: 0 },
      {
        active_at: 0,
        unreadCount: 2,
        markedUnread: false,
        mutedTimestamp: oldMutedTimestamp()
      }
    ];
    for (const conversation of readConversations) {
      import_chai.assert.strictEqual(getCount(conversation, false), 0);
      import_chai.assert.strictEqual(getCount(conversation, true), 0);
    }
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q29udmVyc2F0aW9uVW5yZWFkQ291bnRGb3JBcHBCYWRnZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25VbnJlYWRDb3VudEZvckFwcEJhZGdlIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRDb252ZXJzYXRpb25VbnJlYWRDb3VudEZvckFwcEJhZGdlJztcblxuZGVzY3JpYmUoJ2dldENvbnZlcnNhdGlvblVucmVhZENvdW50Rm9yQXBwQmFkZ2UnLCAoKSA9PiB7XG4gIGNvbnN0IGdldENvdW50ID0gZ2V0Q29udmVyc2F0aW9uVW5yZWFkQ291bnRGb3JBcHBCYWRnZTtcblxuICBjb25zdCBtdXRlZFRpbWVzdGFtcCA9ICgpOiBudW1iZXIgPT4gRGF0ZS5ub3coKSArIDEyMzQ1O1xuICBjb25zdCBvbGRNdXRlZFRpbWVzdGFtcCA9ICgpOiBudW1iZXIgPT4gRGF0ZS5ub3coKSAtIDEwMDA7XG5cbiAgaXQoJ3JldHVybnMgMCBpZiB0aGUgY29udmVyc2F0aW9uIGlzIGFyY2hpdmVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGFyY2hpdmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICBpc0FyY2hpdmVkOiB0cnVlLFxuICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuICAgICAgICB1bnJlYWRDb3VudDogMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGFjdGl2ZV9hdDogRGF0ZS5ub3coKSxcbiAgICAgICAgaXNBcmNoaXZlZDogdHJ1ZSxcbiAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICAgICAgdW5yZWFkQ291bnQ6IDEyMyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGFjdGl2ZV9hdDogRGF0ZS5ub3coKSxcbiAgICAgICAgaXNBcmNoaXZlZDogdHJ1ZSxcbiAgICAgICAgbWFya2VkVW5yZWFkOiB0cnVlLFxuICAgICAgICB1bnJlYWRDb3VudDogMCxcbiAgICAgIH0sXG4gICAgICB7IGFjdGl2ZV9hdDogRGF0ZS5ub3coKSwgaXNBcmNoaXZlZDogdHJ1ZSwgbWFya2VkVW5yZWFkOiB0cnVlIH0sXG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IGNvbnZlcnNhdGlvbiBvZiBhcmNoaXZlZENvbnZlcnNhdGlvbnMpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRDb3VudChjb252ZXJzYXRpb24sIHRydWUpLCAwKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRDb3VudChjb252ZXJzYXRpb24sIGZhbHNlKSwgMCk7XG4gICAgfVxuICB9KTtcblxuICBpdChcInJldHVybnMgMCBpZiB0aGUgY29udmVyc2F0aW9uIGlzIG11dGVkIGFuZCB0aGUgdXNlciBkb2Vzbid0IHdhbnQgdG8gaW5jbHVkZSB0aG9zZSBpbiB0aGUgcmVzdWx0XCIsICgpID0+IHtcbiAgICBjb25zdCBtdXRlZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIGFjdGl2ZV9hdDogRGF0ZS5ub3coKSxcbiAgICAgICAgbXV0ZUV4cGlyZXNBdDogbXV0ZWRUaW1lc3RhbXAoKSxcbiAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICAgICAgdW5yZWFkQ291bnQ6IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCksXG4gICAgICAgIG11dGVFeHBpcmVzQXQ6IG11dGVkVGltZXN0YW1wKCksXG4gICAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gICAgICAgIHVucmVhZENvdW50OiA5LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICBtdXRlRXhwaXJlc0F0OiBtdXRlZFRpbWVzdGFtcCgpLFxuICAgICAgICBtYXJrZWRVbnJlYWQ6IHRydWUsXG4gICAgICAgIHVucmVhZENvdW50OiAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICBtdXRlRXhwaXJlc0F0OiBtdXRlZFRpbWVzdGFtcCgpLFxuICAgICAgICBtYXJrZWRVbnJlYWQ6IHRydWUsXG4gICAgICB9LFxuICAgIF07XG4gICAgZm9yIChjb25zdCBjb252ZXJzYXRpb24gb2YgbXV0ZWRDb252ZXJzYXRpb25zKSB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0Q291bnQoY29udmVyc2F0aW9uLCBmYWxzZSksIDApO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdGhlIHVucmVhZCBjb3VudCBpZiBub256ZXJvIChhbmQgbm90IGFyY2hpdmVkKScsICgpID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25zV2l0aFVucmVhZENvdW50ID0gW1xuICAgICAgeyBhY3RpdmVfYXQ6IERhdGUubm93KCksIHVucmVhZENvdW50OiA5LCBtYXJrZWRVbnJlYWQ6IGZhbHNlIH0sXG4gICAgICB7IGFjdGl2ZV9hdDogRGF0ZS5ub3coKSwgdW5yZWFkQ291bnQ6IDksIG1hcmtlZFVucmVhZDogdHJ1ZSB9LFxuICAgICAge1xuICAgICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCksXG4gICAgICAgIHVucmVhZENvdW50OiA5LFxuICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuICAgICAgICBtdXRlRXhwaXJlc0F0OiBvbGRNdXRlZFRpbWVzdGFtcCgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICB1bnJlYWRDb3VudDogOSxcbiAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICAgICAgaXNBcmNoaXZlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgZm9yIChjb25zdCBjb252ZXJzYXRpb24gb2YgY29udmVyc2F0aW9uc1dpdGhVbnJlYWRDb3VudCkge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldENvdW50KGNvbnZlcnNhdGlvbiwgZmFsc2UpLCA5KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRDb3VudChjb252ZXJzYXRpb24sIHRydWUpLCA5KTtcbiAgICB9XG5cbiAgICBjb25zdCBtdXRlZFdpdGhVbnJlYWRzID0ge1xuICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgdW5yZWFkQ291bnQ6IDEyMyxcbiAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gICAgICBtdXRlRXhwaXJlc0F0OiBtdXRlZFRpbWVzdGFtcCgpLFxuICAgIH07XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldENvdW50KG11dGVkV2l0aFVucmVhZHMsIHRydWUpLCAxMjMpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyAxIGlmIHRoZSBjb252ZXJzYXRpb24gaXMgbWFya2VkIHVucmVhZCcsICgpID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25zTWFya2VkVW5yZWFkID0gW1xuICAgICAgeyBhY3RpdmVfYXQ6IERhdGUubm93KCksIG1hcmtlZFVucmVhZDogdHJ1ZSB9LFxuICAgICAgeyBhY3RpdmVfYXQ6IERhdGUubm93KCksIG1hcmtlZFVucmVhZDogdHJ1ZSwgdW5yZWFkQ291bnQ6IDAgfSxcbiAgICAgIHtcbiAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICBtYXJrZWRVbnJlYWQ6IHRydWUsXG4gICAgICAgIG11dGVFeHBpcmVzQXQ6IG9sZE11dGVkVGltZXN0YW1wKCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCksXG4gICAgICAgIG1hcmtlZFVucmVhZDogdHJ1ZSxcbiAgICAgICAgbXV0ZUV4cGlyZXNBdDogb2xkTXV0ZWRUaW1lc3RhbXAoKSxcbiAgICAgICAgaXNBcmNoaXZlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgZm9yIChjb25zdCBjb252ZXJzYXRpb24gb2YgY29udmVyc2F0aW9uc01hcmtlZFVucmVhZCkge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldENvdW50KGNvbnZlcnNhdGlvbiwgZmFsc2UpLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRDb3VudChjb252ZXJzYXRpb24sIHRydWUpLCAxKTtcbiAgICB9XG5cbiAgICBjb25zdCBtdXRlZENvbnZlcnNhdGlvbnNNYXJrZWRVbnJlYWQgPSBbXG4gICAgICB7XG4gICAgICAgIGFjdGl2ZV9hdDogRGF0ZS5ub3coKSxcbiAgICAgICAgbWFya2VkVW5yZWFkOiB0cnVlLFxuICAgICAgICBtdXRlRXhwaXJlc0F0OiBtdXRlZFRpbWVzdGFtcCgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICBtYXJrZWRVbnJlYWQ6IHRydWUsXG4gICAgICAgIG11dGVFeHBpcmVzQXQ6IG11dGVkVGltZXN0YW1wKCksXG4gICAgICAgIHVucmVhZENvdW50OiAwLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgY29udmVyc2F0aW9uIG9mIG11dGVkQ29udmVyc2F0aW9uc01hcmtlZFVucmVhZCkge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldENvdW50KGNvbnZlcnNhdGlvbiwgdHJ1ZSksIDEpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgMCBpZiB0aGUgY29udmVyc2F0aW9uIGlzIHJlYWQnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVhZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICB7IGFjdGl2ZV9hdDogRGF0ZS5ub3coKSwgbWFya2VkVW5yZWFkOiBmYWxzZSB9LFxuICAgICAgeyBhY3RpdmVfYXQ6IERhdGUubm93KCksIG1hcmtlZFVucmVhZDogZmFsc2UsIHVucmVhZENvdW50OiAwIH0sXG4gICAgICB7XG4gICAgICAgIGFjdGl2ZV9hdDogRGF0ZS5ub3coKSxcbiAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICAgICAgbXV0ZWRUaW1lc3RhbXA6IG11dGVkVGltZXN0YW1wKCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhY3RpdmVfYXQ6IERhdGUubm93KCksXG4gICAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gICAgICAgIG11dGVkVGltZXN0YW1wOiBvbGRNdXRlZFRpbWVzdGFtcCgpLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgY29udmVyc2F0aW9uIG9mIHJlYWRDb252ZXJzYXRpb25zKSB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0Q291bnQoY29udmVyc2F0aW9uLCBmYWxzZSksIDApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldENvdW50KGNvbnZlcnNhdGlvbiwgdHJ1ZSksIDApO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgMCBpZiB0aGUgY29udmVyc2F0aW9uIGhhcyBmYWxzZXkgYWN0aXZlX2F0JywgKCkgPT4ge1xuICAgIGNvbnN0IHJlYWRDb252ZXJzYXRpb25zID0gW1xuICAgICAgeyBhY3RpdmVfYXQ6IHVuZGVmaW5lZCwgbWFya2VkVW5yZWFkOiBmYWxzZSwgdW5yZWFkQ291bnQ6IDIgfSxcbiAgICAgIHsgYWN0aXZlX2F0OiBudWxsLCBtYXJrZWRVbnJlYWQ6IHRydWUsIHVucmVhZENvdW50OiAwIH0sXG4gICAgICB7XG4gICAgICAgIGFjdGl2ZV9hdDogMCxcbiAgICAgICAgdW5yZWFkQ291bnQ6IDIsXG4gICAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gICAgICAgIG11dGVkVGltZXN0YW1wOiBvbGRNdXRlZFRpbWVzdGFtcCgpLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgY29udmVyc2F0aW9uIG9mIHJlYWRDb252ZXJzYXRpb25zKSB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0Q291bnQoY29udmVyc2F0aW9uLCBmYWxzZSksIDApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldENvdW50KGNvbnZlcnNhdGlvbiwgdHJ1ZSksIDApO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBRXZCLG1EQUFzRDtBQUV0RCxTQUFTLHlDQUF5QyxNQUFNO0FBQ3RELFFBQU0sV0FBVztBQUVqQixRQUFNLGlCQUFpQiw2QkFBYyxLQUFLLElBQUksSUFBSSxPQUEzQjtBQUN2QixRQUFNLG9CQUFvQiw2QkFBYyxLQUFLLElBQUksSUFBSSxLQUEzQjtBQUUxQixLQUFHLDZDQUE2QyxNQUFNO0FBQ3BELFVBQU0sd0JBQXdCO0FBQUEsTUFDNUI7QUFBQSxRQUNFLFdBQVcsS0FBSyxJQUFJO0FBQUEsUUFDcEIsWUFBWTtBQUFBLFFBQ1osY0FBYztBQUFBLFFBQ2QsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxXQUFXLEtBQUssSUFBSTtBQUFBLFFBQ3BCLFlBQVk7QUFBQSxRQUNaLGNBQWM7QUFBQSxRQUNkLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLFFBQ0UsV0FBVyxLQUFLLElBQUk7QUFBQSxRQUNwQixZQUFZO0FBQUEsUUFDWixjQUFjO0FBQUEsUUFDZCxhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0EsRUFBRSxXQUFXLEtBQUssSUFBSSxHQUFHLFlBQVksTUFBTSxjQUFjLEtBQUs7QUFBQSxJQUNoRTtBQUNBLGVBQVcsZ0JBQWdCLHVCQUF1QjtBQUNoRCx5QkFBTyxZQUFZLFNBQVMsY0FBYyxJQUFJLEdBQUcsQ0FBQztBQUNsRCx5QkFBTyxZQUFZLFNBQVMsY0FBYyxLQUFLLEdBQUcsQ0FBQztBQUFBLElBQ3JEO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxtR0FBbUcs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
