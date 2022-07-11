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
var import_conversations = require("../../../state/ducks/conversations");
var import_noop = require("../../../state/ducks/noop");
var import_search = require("../../../state/ducks/search");
var import_user = require("../../../state/ducks/user");
var import_search2 = require("../../../state/selectors/search");
var import_makeLookup = require("../../../util/makeLookup");
var import_UUID = require("../../../types/UUID");
var import_getDefaultConversation = require("../../helpers/getDefaultConversation");
var import_MessageReadStatus = require("../../../messages/MessageReadStatus");
var import_reducer = require("../../../state/reducer");
describe("both/state/selectors/search", () => {
  const NOW = 1e6;
  let clock;
  beforeEach(() => {
    clock = import_sinon.default.useFakeTimers({
      now: NOW
    });
  });
  afterEach(() => {
    clock.restore();
  });
  const getEmptyRootState = /* @__PURE__ */ __name(() => {
    return (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)());
  }, "getEmptyRootState");
  function getDefaultMessage(id) {
    return {
      attachments: [],
      conversationId: "conversationId",
      id,
      received_at: NOW,
      sent_at: NOW,
      source: "source",
      sourceUuid: import_UUID.UUID.generate().toString(),
      timestamp: NOW,
      type: "incoming",
      readStatus: import_MessageReadStatus.ReadStatus.Read
    };
  }
  function getDefaultSearchMessage(id) {
    return {
      ...getDefaultMessage(id),
      body: "foo bar",
      bodyRanges: [],
      snippet: "foo bar"
    };
  }
  describe("#getIsSearchingInAConversation", () => {
    it("returns false if not searching in a conversation", () => {
      const state = getEmptyRootState();
      import_chai.assert.isFalse((0, import_search2.getIsSearchingInAConversation)(state));
    });
    it("returns true if searching in a conversation", () => {
      const state = {
        ...getEmptyRootState(),
        search: {
          ...(0, import_search.getEmptyState)(),
          searchConversationId: "abc123",
          searchConversationName: "Test Conversation"
        }
      };
      import_chai.assert.isTrue((0, import_search2.getIsSearchingInAConversation)(state));
    });
  });
  describe("#getMessageSearchResultSelector", () => {
    it("returns undefined if message not found in lookup", () => {
      const state = getEmptyRootState();
      const selector = (0, import_search2.getMessageSearchResultSelector)(state);
      const actual = selector("random-id");
      import_chai.assert.strictEqual(actual, void 0);
    });
    it("returns undefined if type is unexpected", () => {
      const id = "message-id";
      const state = {
        ...getEmptyRootState(),
        search: {
          ...(0, import_search.getEmptyState)(),
          messageLookup: {
            [id]: {
              ...getDefaultMessage(id),
              type: "keychange",
              snippet: "snippet",
              body: "snippet",
              bodyRanges: []
            }
          }
        }
      };
      const selector = (0, import_search2.getMessageSearchResultSelector)(state);
      const actual = selector(id);
      import_chai.assert.strictEqual(actual, void 0);
    });
    it("returns incoming message", () => {
      const searchId = "search-id";
      const toId = "to-id";
      const from = (0, import_getDefaultConversation.getDefaultConversationWithUuid)();
      const to = (0, import_getDefaultConversation.getDefaultConversation)({ id: toId });
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [from.id]: from,
            [toId]: to
          },
          conversationsByUuid: {
            [from.uuid]: from
          }
        },
        search: {
          ...(0, import_search.getEmptyState)(),
          messageLookup: {
            [searchId]: {
              ...getDefaultMessage(searchId),
              type: "incoming",
              sourceUuid: from.uuid,
              conversationId: toId,
              snippet: "snippet",
              body: "snippet",
              bodyRanges: []
            }
          }
        }
      };
      const selector = (0, import_search2.getMessageSearchResultSelector)(state);
      const actual = selector(searchId);
      const expected = {
        from,
        to,
        id: searchId,
        conversationId: toId,
        sentAt: NOW,
        snippet: "snippet",
        body: "snippet",
        bodyRanges: [],
        isSelected: false,
        isSearchingInConversation: false
      };
      import_chai.assert.deepEqual(actual, expected);
    });
    it('returns the correct "from" and "to" when sent to me', () => {
      const searchId = "search-id";
      const myId = "my-id";
      const from = (0, import_getDefaultConversation.getDefaultConversationWithUuid)();
      const toId = from.uuid;
      const meAsRecipient = (0, import_getDefaultConversation.getDefaultConversation)({ id: myId });
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [from.id]: from,
            [myId]: meAsRecipient
          },
          conversationsByUuid: {
            [from.uuid]: from
          }
        },
        ourConversationId: myId,
        search: {
          ...(0, import_search.getEmptyState)(),
          messageLookup: {
            [searchId]: {
              ...getDefaultMessage(searchId),
              type: "incoming",
              sourceUuid: from.uuid,
              conversationId: toId,
              snippet: "snippet",
              body: "snippet",
              bodyRanges: []
            }
          }
        },
        user: {
          ...(0, import_user.getEmptyState)(),
          ourConversationId: myId
        }
      };
      const selector = (0, import_search2.getMessageSearchResultSelector)(state);
      const actual = selector(searchId);
      import_chai.assert.deepEqual(actual?.from, from);
      import_chai.assert.deepEqual(actual?.to, meAsRecipient);
    });
    it("returns outgoing message and caches appropriately", () => {
      const searchId = "search-id";
      const toId = "to-id";
      const from = (0, import_getDefaultConversation.getDefaultConversationWithUuid)();
      const to = (0, import_getDefaultConversation.getDefaultConversation)({ id: toId });
      const state = {
        ...getEmptyRootState(),
        user: {
          ...(0, import_user.getEmptyState)(),
          ourConversationId: from.id
        },
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [from.id]: from,
            [toId]: to
          },
          conversationsByUuid: {
            [from.uuid]: from
          }
        },
        search: {
          ...(0, import_search.getEmptyState)(),
          messageLookup: {
            [searchId]: {
              ...getDefaultMessage(searchId),
              type: "outgoing",
              conversationId: toId,
              snippet: "snippet",
              body: "snippet",
              bodyRanges: []
            }
          }
        }
      };
      const selector = (0, import_search2.getMessageSearchResultSelector)(state);
      const actual = selector(searchId);
      const expected = {
        from,
        to,
        id: searchId,
        conversationId: toId,
        sentAt: NOW,
        snippet: "snippet",
        body: "snippet",
        bodyRanges: [],
        isSelected: false,
        isSearchingInConversation: false
      };
      import_chai.assert.deepEqual(actual, expected);
      const secondState = {
        ...state,
        conversations: {
          ...state.conversations
        }
      };
      const secondSelector = (0, import_search2.getMessageSearchResultSelector)(secondState);
      const secondActual = secondSelector(searchId);
      import_chai.assert.strictEqual(secondActual, actual);
      const thirdState = {
        ...state,
        conversations: {
          ...state.conversations,
          conversationsByUuid: {
            ...state.conversations.conversationsByUuid,
            [from.uuid]: {
              ...from,
              name: "new-name"
            }
          }
        }
      };
      const thirdSelector = (0, import_search2.getMessageSearchResultSelector)(thirdState);
      const thirdActual = thirdSelector(searchId);
      import_chai.assert.notStrictEqual(actual, thirdActual);
    });
  });
  describe("#getSearchResults", () => {
    it("returns loading search results when they're loading", () => {
      const state = {
        ...getEmptyRootState(),
        search: {
          ...(0, import_search.getEmptyState)(),
          query: "foo bar",
          discussionsLoading: true,
          messagesLoading: true
        }
      };
      import_chai.assert.deepEqual((0, import_search2.getSearchResults)(state), {
        conversationResults: { isLoading: true },
        contactResults: { isLoading: true },
        messageResults: { isLoading: true },
        searchConversationName: void 0,
        searchTerm: "foo bar"
      });
    });
    it("returns loaded search results", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)({ id: "1" }),
        (0, import_getDefaultConversation.getDefaultConversation)({ id: "2" })
      ];
      const contacts = [
        (0, import_getDefaultConversation.getDefaultConversation)({ id: "3" }),
        (0, import_getDefaultConversation.getDefaultConversation)({ id: "4" }),
        (0, import_getDefaultConversation.getDefaultConversation)({ id: "5" })
      ];
      const messages = [
        getDefaultSearchMessage("a"),
        getDefaultSearchMessage("b"),
        getDefaultSearchMessage("c")
      ];
      const getId = /* @__PURE__ */ __name(({ id }) => id, "getId");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: (0, import_makeLookup.makeLookup)([...conversations, ...contacts], "id")
        },
        search: {
          ...(0, import_search.getEmptyState)(),
          query: "foo bar",
          conversationIds: conversations.map(getId),
          contactIds: contacts.map(getId),
          messageIds: messages.map(getId),
          messageLookup: (0, import_makeLookup.makeLookup)(messages, "id"),
          discussionsLoading: false,
          messagesLoading: false
        }
      };
      import_chai.assert.deepEqual((0, import_search2.getSearchResults)(state), {
        conversationResults: {
          isLoading: false,
          results: conversations
        },
        contactResults: {
          isLoading: false,
          results: contacts
        },
        messageResults: {
          isLoading: false,
          results: messages
        },
        searchConversationName: void 0,
        searchTerm: "foo bar"
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VhcmNoX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvblR5cGUsXG4gIE1lc3NhZ2VUeXBlLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgYXMgZ2V0RW1wdHlDb252ZXJzYXRpb25TdGF0ZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgbm9vcEFjdGlvbiB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL25vb3AnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlU2VhcmNoUmVzdWx0VHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL3NlYXJjaCc7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIGFzIGdldEVtcHR5U2VhcmNoU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9zZWFyY2gnO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSBhcyBnZXRFbXB0eVVzZXJTdGF0ZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL3VzZXInO1xuaW1wb3J0IHtcbiAgZ2V0SXNTZWFyY2hpbmdJbkFDb252ZXJzYXRpb24sXG4gIGdldE1lc3NhZ2VTZWFyY2hSZXN1bHRTZWxlY3RvcixcbiAgZ2V0U2VhcmNoUmVzdWx0cyxcbn0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvc2VsZWN0b3JzL3NlYXJjaCc7XG5pbXBvcnQgeyBtYWtlTG9va3VwIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9tYWtlTG9va3VwJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7XG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24sXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCxcbn0gZnJvbSAnLi4vLi4vaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi8uLi8uLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvcmVkdWNlcic7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvcmVkdWNlcic7XG5cbmRlc2NyaWJlKCdib3RoL3N0YXRlL3NlbGVjdG9ycy9zZWFyY2gnLCAoKSA9PiB7XG4gIGNvbnN0IE5PVyA9IDFfMDAwXzAwMDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgbGV0IGNsb2NrOiBhbnk7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY2xvY2sgPSBzaW5vbi51c2VGYWtlVGltZXJzKHtcbiAgICAgIG5vdzogTk9XLFxuICAgIH0pO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGNsb2NrLnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0RW1wdHlSb290U3RhdGUgPSAoKTogU3RhdGVUeXBlID0+IHtcbiAgICByZXR1cm4gcm9vdFJlZHVjZXIodW5kZWZpbmVkLCBub29wQWN0aW9uKCkpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdldERlZmF1bHRNZXNzYWdlKGlkOiBzdHJpbmcpOiBNZXNzYWdlVHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uSWQnLFxuICAgICAgaWQsXG4gICAgICByZWNlaXZlZF9hdDogTk9XLFxuICAgICAgc2VudF9hdDogTk9XLFxuICAgICAgc291cmNlOiAnc291cmNlJyxcbiAgICAgIHNvdXJjZVV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgdGltZXN0YW1wOiBOT1csXG4gICAgICB0eXBlOiAnaW5jb21pbmcnIGFzIGNvbnN0LFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZWZhdWx0U2VhcmNoTWVzc2FnZShpZDogc3RyaW5nKTogTWVzc2FnZVNlYXJjaFJlc3VsdFR5cGUge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZShpZCksXG4gICAgICBib2R5OiAnZm9vIGJhcicsXG4gICAgICBib2R5UmFuZ2VzOiBbXSxcbiAgICAgIHNuaXBwZXQ6ICdmb28gYmFyJyxcbiAgICB9O1xuICB9XG5cbiAgZGVzY3JpYmUoJyNnZXRJc1NlYXJjaGluZ0luQUNvbnZlcnNhdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3Qgc2VhcmNoaW5nIGluIGEgY29udmVyc2F0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShnZXRJc1NlYXJjaGluZ0luQUNvbnZlcnNhdGlvbihzdGF0ZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzZWFyY2hpbmcgaW4gYSBjb252ZXJzYXRpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgc2VhcmNoOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTZWFyY2hTdGF0ZSgpLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgICBzZWFyY2hDb252ZXJzYXRpb25OYW1lOiAnVGVzdCBDb252ZXJzYXRpb24nLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShnZXRJc1NlYXJjaGluZ0luQUNvbnZlcnNhdGlvbihzdGF0ZSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldE1lc3NhZ2VTZWFyY2hSZXN1bHRTZWxlY3RvcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgbWVzc2FnZSBub3QgZm91bmQgaW4gbG9va3VwJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRNZXNzYWdlU2VhcmNoUmVzdWx0U2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3RvcigncmFuZG9tLWlkJyk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdHlwZSBpcyB1bmV4cGVjdGVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSAnbWVzc2FnZS1pZCc7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgc2VhcmNoOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTZWFyY2hTdGF0ZSgpLFxuICAgICAgICAgIG1lc3NhZ2VMb29rdXA6IHtcbiAgICAgICAgICAgIFtpZF06IHtcbiAgICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2UoaWQpLFxuICAgICAgICAgICAgICB0eXBlOiAna2V5Y2hhbmdlJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgc25pcHBldDogJ3NuaXBwZXQnLFxuICAgICAgICAgICAgICBib2R5OiAnc25pcHBldCcsXG4gICAgICAgICAgICAgIGJvZHlSYW5nZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0TWVzc2FnZVNlYXJjaFJlc3VsdFNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gc2VsZWN0b3IoaWQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaW5jb21pbmcgbWVzc2FnZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHNlYXJjaElkID0gJ3NlYXJjaC1pZCc7XG4gICAgICBjb25zdCB0b0lkID0gJ3RvLWlkJztcblxuICAgICAgY29uc3QgZnJvbSA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCgpO1xuICAgICAgY29uc3QgdG8gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgaWQ6IHRvSWQgfSk7XG5cbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlDb252ZXJzYXRpb25TdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgW2Zyb20uaWRdOiBmcm9tLFxuICAgICAgICAgICAgW3RvSWRdOiB0byxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbnNCeVV1aWQ6IHtcbiAgICAgICAgICAgIFtmcm9tLnV1aWRdOiBmcm9tLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaDoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U2VhcmNoU3RhdGUoKSxcbiAgICAgICAgICBtZXNzYWdlTG9va3VwOiB7XG4gICAgICAgICAgICBbc2VhcmNoSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlKHNlYXJjaElkKSxcbiAgICAgICAgICAgICAgdHlwZTogJ2luY29taW5nJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgc291cmNlVXVpZDogZnJvbS51dWlkLFxuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogdG9JZCxcbiAgICAgICAgICAgICAgc25pcHBldDogJ3NuaXBwZXQnLFxuICAgICAgICAgICAgICBib2R5OiAnc25pcHBldCcsXG4gICAgICAgICAgICAgIGJvZHlSYW5nZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0TWVzc2FnZVNlYXJjaFJlc3VsdFNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gc2VsZWN0b3Ioc2VhcmNoSWQpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuXG4gICAgICAgIGlkOiBzZWFyY2hJZCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRvSWQsXG4gICAgICAgIHNlbnRBdDogTk9XLFxuICAgICAgICBzbmlwcGV0OiAnc25pcHBldCcsXG4gICAgICAgIGJvZHk6ICdzbmlwcGV0JyxcbiAgICAgICAgYm9keVJhbmdlczogW10sXG5cbiAgICAgICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgIGlzU2VhcmNoaW5nSW5Db252ZXJzYXRpb246IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IFwiZnJvbVwiIGFuZCBcInRvXCIgd2hlbiBzZW50IHRvIG1lJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VhcmNoSWQgPSAnc2VhcmNoLWlkJztcbiAgICAgIGNvbnN0IG15SWQgPSAnbXktaWQnO1xuXG4gICAgICBjb25zdCBmcm9tID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkKCk7XG4gICAgICBjb25zdCB0b0lkID0gZnJvbS51dWlkO1xuICAgICAgY29uc3QgbWVBc1JlY2lwaWVudCA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBpZDogbXlJZCB9KTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eUNvbnZlcnNhdGlvblN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICBbZnJvbS5pZF06IGZyb20sXG4gICAgICAgICAgICBbbXlJZF06IG1lQXNSZWNpcGllbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zQnlVdWlkOiB7XG4gICAgICAgICAgICBbZnJvbS51dWlkXTogZnJvbSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBvdXJDb252ZXJzYXRpb25JZDogbXlJZCxcbiAgICAgICAgc2VhcmNoOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTZWFyY2hTdGF0ZSgpLFxuICAgICAgICAgIG1lc3NhZ2VMb29rdXA6IHtcbiAgICAgICAgICAgIFtzZWFyY2hJZF06IHtcbiAgICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2Uoc2VhcmNoSWQpLFxuICAgICAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICBzb3VyY2VVdWlkOiBmcm9tLnV1aWQsXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiB0b0lkLFxuICAgICAgICAgICAgICBzbmlwcGV0OiAnc25pcHBldCcsXG4gICAgICAgICAgICAgIGJvZHk6ICdzbmlwcGV0JyxcbiAgICAgICAgICAgICAgYm9keVJhbmdlczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVVzZXJTdGF0ZSgpLFxuICAgICAgICAgIG91ckNvbnZlcnNhdGlvbklkOiBteUlkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0TWVzc2FnZVNlYXJjaFJlc3VsdFNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gc2VsZWN0b3Ioc2VhcmNoSWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWw/LmZyb20sIGZyb20pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWw/LnRvLCBtZUFzUmVjaXBpZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG91dGdvaW5nIG1lc3NhZ2UgYW5kIGNhY2hlcyBhcHByb3ByaWF0ZWx5JywgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VhcmNoSWQgPSAnc2VhcmNoLWlkJztcbiAgICAgIGNvbnN0IHRvSWQgPSAndG8taWQnO1xuXG4gICAgICBjb25zdCBmcm9tID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkKCk7XG4gICAgICBjb25zdCB0byA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBpZDogdG9JZCB9KTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVVzZXJTdGF0ZSgpLFxuICAgICAgICAgIG91ckNvbnZlcnNhdGlvbklkOiBmcm9tLmlkLFxuICAgICAgICB9LFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlDb252ZXJzYXRpb25TdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgW2Zyb20uaWRdOiBmcm9tLFxuICAgICAgICAgICAgW3RvSWRdOiB0byxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbnNCeVV1aWQ6IHtcbiAgICAgICAgICAgIFtmcm9tLnV1aWRdOiBmcm9tLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaDoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U2VhcmNoU3RhdGUoKSxcbiAgICAgICAgICBtZXNzYWdlTG9va3VwOiB7XG4gICAgICAgICAgICBbc2VhcmNoSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlKHNlYXJjaElkKSxcbiAgICAgICAgICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRvSWQsXG4gICAgICAgICAgICAgIHNuaXBwZXQ6ICdzbmlwcGV0JyxcbiAgICAgICAgICAgICAgYm9keTogJ3NuaXBwZXQnLFxuICAgICAgICAgICAgICBib2R5UmFuZ2VzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBzZWxlY3RvciA9IGdldE1lc3NhZ2VTZWFyY2hSZXN1bHRTZWxlY3RvcihzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IHNlbGVjdG9yKHNlYXJjaElkKTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcblxuICAgICAgICBpZDogc2VhcmNoSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiB0b0lkLFxuICAgICAgICBzZW50QXQ6IE5PVyxcbiAgICAgICAgc25pcHBldDogJ3NuaXBwZXQnLFxuICAgICAgICBib2R5OiAnc25pcHBldCcsXG4gICAgICAgIGJvZHlSYW5nZXM6IFtdLFxuXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBpc1NlYXJjaGluZ0luQ29udmVyc2F0aW9uOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgY29udmVyc2F0aW9uIGxvb2t1cCwgYnV0IG5vdCB0aGUgY29udmVyc2F0aW9ucyBpbiBxdWVzdGlvblxuICAgICAgY29uc3Qgc2Vjb25kU3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uc3RhdGUuY29udmVyc2F0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBzZWNvbmRTZWxlY3RvciA9IGdldE1lc3NhZ2VTZWFyY2hSZXN1bHRTZWxlY3RvcihzZWNvbmRTdGF0ZSk7XG4gICAgICBjb25zdCBzZWNvbmRBY3R1YWwgPSBzZWNvbmRTZWxlY3RvcihzZWFyY2hJZCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZWNvbmRBY3R1YWwsIGFjdHVhbCk7XG5cbiAgICAgIC8vIFVwZGF0ZSBhIGNvbnZlcnNhdGlvbiBpbnZvbHZlZCBpbiByZW5kZXJpbmcgdGhpcyBzZWFyY2ggcmVzdWx0XG4gICAgICBjb25zdCB0aGlyZFN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLnN0YXRlLmNvbnZlcnNhdGlvbnMsXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5VXVpZDoge1xuICAgICAgICAgICAgLi4uc3RhdGUuY29udmVyc2F0aW9ucy5jb252ZXJzYXRpb25zQnlVdWlkLFxuICAgICAgICAgICAgW2Zyb20udXVpZF06IHtcbiAgICAgICAgICAgICAgLi4uZnJvbSxcbiAgICAgICAgICAgICAgbmFtZTogJ25ldy1uYW1lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRoaXJkU2VsZWN0b3IgPSBnZXRNZXNzYWdlU2VhcmNoUmVzdWx0U2VsZWN0b3IodGhpcmRTdGF0ZSk7XG4gICAgICBjb25zdCB0aGlyZEFjdHVhbCA9IHRoaXJkU2VsZWN0b3Ioc2VhcmNoSWQpO1xuXG4gICAgICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCB0aGlyZEFjdHVhbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0U2VhcmNoUmVzdWx0cycsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgbG9hZGluZyBzZWFyY2ggcmVzdWx0cyB3aGVuIHRoZXkncmUgbG9hZGluZ1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgc2VhcmNoOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTZWFyY2hTdGF0ZSgpLFxuICAgICAgICAgIHF1ZXJ5OiAnZm9vIGJhcicsXG4gICAgICAgICAgZGlzY3Vzc2lvbnNMb2FkaW5nOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2VzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZ2V0U2VhcmNoUmVzdWx0cyhzdGF0ZSksIHtcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb25OYW1lOiB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28gYmFyJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbG9hZGVkIHNlYXJjaCByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBpZDogJzEnIH0pLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgaWQ6ICcyJyB9KSxcbiAgICAgIF07XG4gICAgICBjb25zdCBjb250YWN0czogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oeyBpZDogJzMnIH0pLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgaWQ6ICc0JyB9KSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7IGlkOiAnNScgfSksXG4gICAgICBdO1xuICAgICAgY29uc3QgbWVzc2FnZXM6IEFycmF5PE1lc3NhZ2VTZWFyY2hSZXN1bHRUeXBlPiA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdFNlYXJjaE1lc3NhZ2UoJ2EnKSxcbiAgICAgICAgZ2V0RGVmYXVsdFNlYXJjaE1lc3NhZ2UoJ2InKSxcbiAgICAgICAgZ2V0RGVmYXVsdFNlYXJjaE1lc3NhZ2UoJ2MnKSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGdldElkID0gKHsgaWQgfTogUmVhZG9ubHk8eyBpZDogc3RyaW5nIH0+KSA9PiBpZDtcblxuICAgICAgY29uc3Qgc3RhdGU6IFN0YXRlVHlwZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC8vIFRoaXMgdGVzdCBzdGF0ZSBpcyBpbnZhbGlkLCBidXQgaXMgZ29vZCBlbm91Z2ggZm9yIHRoaXMgdGVzdC5cbiAgICAgICAgICAuLi5nZXRFbXB0eUNvbnZlcnNhdGlvblN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiBtYWtlTG9va3VwKFsuLi5jb252ZXJzYXRpb25zLCAuLi5jb250YWN0c10sICdpZCcpLFxuICAgICAgICB9LFxuICAgICAgICBzZWFyY2g6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVNlYXJjaFN0YXRlKCksXG4gICAgICAgICAgcXVlcnk6ICdmb28gYmFyJyxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZHM6IGNvbnZlcnNhdGlvbnMubWFwKGdldElkKSxcbiAgICAgICAgICBjb250YWN0SWRzOiBjb250YWN0cy5tYXAoZ2V0SWQpLFxuICAgICAgICAgIG1lc3NhZ2VJZHM6IG1lc3NhZ2VzLm1hcChnZXRJZCksXG4gICAgICAgICAgbWVzc2FnZUxvb2t1cDogbWFrZUxvb2t1cChtZXNzYWdlcywgJ2lkJyksXG4gICAgICAgICAgZGlzY3Vzc2lvbnNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRTZWFyY2hSZXN1bHRzKHN0YXRlKSwge1xuICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICByZXN1bHRzOiBjb252ZXJzYXRpb25zLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogY29udGFjdHMsXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICByZXN1bHRzOiBtZXNzYWdlcyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uTmFtZTogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIs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
