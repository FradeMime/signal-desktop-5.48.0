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
var import_conversationsEnums = require("../../../state/ducks/conversationsEnums");
var import_conversations = require("../../../state/ducks/conversations");
var import_conversations2 = require("../../../state/selectors/conversations");
var import_noop = require("../../../state/ducks/noop");
var import_reducer = require("../../../state/reducer");
var import_setupI18n = require("../../../util/setupI18n");
var import_UUID = require("../../../types/UUID");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../helpers/getDefaultConversation");
var import_defaultComposerStates = require("../../helpers/defaultComposerStates");
describe("both/state/selectors/conversations", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => {
    return (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)());
  }, "getEmptyRootState");
  function makeConversation(id) {
    return (0, import_getDefaultConversation.getDefaultConversation)({
      id,
      searchableTitle: `${id} title`,
      title: `${id} title`
    });
  }
  function makeConversationWithUuid(id) {
    return (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
      id,
      searchableTitle: `${id} title`,
      title: `${id} title`
    }, import_UUID.UUID.fromPrefix(id).toString());
  }
  const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
  describe("#getConversationByIdSelector", () => {
    const state = {
      ...getEmptyRootState(),
      conversations: {
        ...(0, import_conversations.getEmptyState)(),
        conversationLookup: { abc123: makeConversation("abc123") }
      }
    };
    it("returns undefined if the conversation is not in the lookup", () => {
      const selector = (0, import_conversations2.getConversationByIdSelector)(state);
      const actual = selector("xyz");
      import_chai.assert.isUndefined(actual);
    });
    it("returns the conversation in the lookup if it exists", () => {
      const selector = (0, import_conversations2.getConversationByIdSelector)(state);
      const actual = selector("abc123");
      import_chai.assert.strictEqual(actual?.title, "abc123 title");
    });
  });
  describe("#getConversationSelector", () => {
    it("returns empty placeholder if falsey id provided", () => {
      const state = getEmptyRootState();
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector(void 0);
      import_chai.assert.deepEqual(actual, (0, import_conversations2.getPlaceholderContact)());
    });
    it("returns empty placeholder if no match", () => {
      const state = {
        ...getEmptyRootState()
      };
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector("random-id");
      import_chai.assert.deepEqual(actual, (0, import_conversations2.getPlaceholderContact)());
    });
    it("returns conversation by uuid first", () => {
      const id = "id";
      const conversation = makeConversation(id);
      const wrongConversation = makeConversation("wrong");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: wrongConversation
          },
          conversationsByE164: {
            [id]: wrongConversation
          },
          conversationsByUuid: {
            [id]: conversation
          },
          conversationsByGroupId: {
            [id]: wrongConversation
          }
        }
      };
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector(id);
      import_chai.assert.strictEqual(actual, conversation);
    });
    it("returns conversation by e164", () => {
      const id = "id";
      const conversation = makeConversation(id);
      const wrongConversation = makeConversation("wrong");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: wrongConversation
          },
          conversationsByE164: {
            [id]: conversation
          },
          conversationsByGroupId: {
            [id]: wrongConversation
          }
        }
      };
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector(id);
      import_chai.assert.strictEqual(actual, conversation);
    });
    it("returns conversation by groupId", () => {
      const id = "id";
      const conversation = makeConversation(id);
      const wrongConversation = makeConversation("wrong");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: wrongConversation
          },
          conversationsByGroupId: {
            [id]: conversation
          }
        }
      };
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector(id);
      import_chai.assert.strictEqual(actual, conversation);
    });
    it("returns conversation by conversationId", () => {
      const id = "id";
      const conversation = makeConversation(id);
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: conversation
          }
        }
      };
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector(id);
      import_chai.assert.strictEqual(actual, conversation);
    });
    it("does proper caching of result", () => {
      const id = "id";
      const conversation = makeConversation(id);
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: conversation
          }
        }
      };
      const selector = (0, import_conversations2.getConversationSelector)(state);
      const actual = selector(id);
      const secondState = {
        ...state,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: conversation
          }
        }
      };
      const secondSelector = (0, import_conversations2.getConversationSelector)(secondState);
      const secondActual = secondSelector(id);
      import_chai.assert.strictEqual(actual, secondActual);
      const thirdState = {
        ...state,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            [id]: makeConversation("third")
          }
        }
      };
      const thirdSelector = (0, import_conversations2.getConversationSelector)(thirdState);
      const thirdActual = thirdSelector(id);
      import_chai.assert.notStrictEqual(actual, thirdActual);
    });
  });
  describe("#getConversationsStoppingSend", () => {
    it("returns an empty array if there are no conversations stopping send", () => {
      const state = getEmptyRootState();
      import_chai.assert.isEmpty((0, import_conversations2.getConversationsStoppingSend)(state));
    });
    it("returns all conversations stopping send", () => {
      const convo1 = makeConversation("abc");
      const convo2 = makeConversation("def");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            def: convo2,
            abc: convo1
          },
          verificationDataByConversation: {
            "convo a": {
              type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
              uuidsNeedingVerification: ["abc"]
            },
            "convo b": {
              type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
              uuidsNeedingVerification: ["def", "abc"]
            }
          }
        }
      };
      import_chai.assert.sameDeepMembers((0, import_conversations2.getConversationUuidsStoppingSend)(state), [
        "abc",
        "def"
      ]);
      import_chai.assert.sameDeepMembers((0, import_conversations2.getConversationsStoppingSend)(state), [
        convo1,
        convo2
      ]);
    });
  });
  describe("#getConversationStoppedForVerification", () => {
    it("returns an empty array if there are no conversations stopping send", () => {
      const state = getEmptyRootState();
      import_chai.assert.isEmpty((0, import_conversations2.getConversationsStoppingSend)(state));
    });
    it("returns all conversations stopping send", () => {
      const convoA = makeConversation("convo a");
      const convoB = makeConversation("convo b");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo a": convoA,
            "convo b": convoB
          },
          verificationDataByConversation: {
            "convo a": {
              type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
              uuidsNeedingVerification: ["abc"]
            },
            "convo b": {
              type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
              uuidsNeedingVerification: ["def", "abc"]
            }
          }
        }
      };
      import_chai.assert.sameDeepMembers((0, import_conversations2.getConversationIdsStoppedForVerification)(state), [
        "convo a",
        "convo b"
      ]);
      import_chai.assert.sameDeepMembers((0, import_conversations2.getConversationsStoppedForVerification)(state), [
        convoA,
        convoB
      ]);
    });
  });
  describe("#getInvitedContactsForNewlyCreatedGroup", () => {
    it("returns an empty array if there are no invited contacts", () => {
      const state = getEmptyRootState();
      import_chai.assert.deepEqual((0, import_conversations2.getInvitedContactsForNewlyCreatedGroup)(state), []);
    });
    it('returns "hydrated" invited contacts', () => {
      const abc = makeConversationWithUuid("abc");
      const def = makeConversationWithUuid("def");
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationsByUuid: {
            [abc.uuid]: abc,
            [def.uuid]: def
          },
          invitedUuidsForNewlyCreatedGroup: [def.uuid, abc.uuid]
        }
      };
      const result = (0, import_conversations2.getInvitedContactsForNewlyCreatedGroup)(state);
      const titles = result.map((conversation) => conversation.title);
      import_chai.assert.deepEqual(titles, ["def title", "abc title"]);
    });
  });
  describe("#getComposerStep", () => {
    it("returns undefined if the composer isn't open", () => {
      const state = getEmptyRootState();
      const result = (0, import_conversations2.getComposerStep)(state);
      import_chai.assert.isUndefined(result);
    });
    it("returns the first step of the composer", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        }
      };
      const result = (0, import_conversations2.getComposerStep)(state);
      import_chai.assert.strictEqual(result, import_conversationsEnums.ComposerStep.StartDirectConversation);
    });
    it("returns the second step of the composer", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
        }
      };
      const result = (0, import_conversations2.getComposerStep)(state);
      import_chai.assert.strictEqual(result, import_conversationsEnums.ComposerStep.ChooseGroupMembers);
    });
    it("returns the third step of the composer", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        }
      };
      const result = (0, import_conversations2.getComposerStep)(state);
      import_chai.assert.strictEqual(result, import_conversationsEnums.ComposerStep.SetGroupMetadata);
    });
  });
  describe("#hasGroupCreationError", () => {
    it('returns false if not in the "set group metadata" composer step', () => {
      import_chai.assert.isFalse((0, import_conversations2.hasGroupCreationError)(getEmptyRootState()));
      import_chai.assert.isFalse((0, import_conversations2.hasGroupCreationError)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        }
      }));
    });
    it("returns false if there is no group creation error", () => {
      import_chai.assert.isFalse((0, import_conversations2.hasGroupCreationError)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        }
      }));
    });
    it("returns true if there is a group creation error", () => {
      import_chai.assert.isTrue((0, import_conversations2.hasGroupCreationError)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            hasError: true
          }
        }
      }));
    });
  });
  describe("#isCreatingGroup", () => {
    it('returns false if not in the "set group metadata" composer step', () => {
      import_chai.assert.isFalse((0, import_conversations2.hasGroupCreationError)(getEmptyRootState()));
      import_chai.assert.isFalse((0, import_conversations2.isCreatingGroup)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        }
      }));
    });
    it("returns false if the group is not being created", () => {
      import_chai.assert.isFalse((0, import_conversations2.isCreatingGroup)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        }
      }));
    });
    it("returns true if the group is being created", () => {
      import_chai.assert.isTrue((0, import_conversations2.isCreatingGroup)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            isCreating: true,
            hasError: false
          }
        }
      }));
    });
  });
  describe("#getAllComposableConversations", () => {
    const getRootState = /* @__PURE__ */ __name(() => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              isMe: true,
              profileName: "My own name"
            }
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getRootState");
    const getRootStateWithConversations = /* @__PURE__ */ __name(() => {
      const result = getRootState();
      Object.assign(result.conversations.conversationLookup, {
        "convo-1": {
          ...makeConversation("convo-1"),
          type: "direct",
          profileName: "A",
          title: "A"
        },
        "convo-2": {
          ...makeConversation("convo-2"),
          type: "group",
          isGroupV1AndDisabled: true,
          name: "2",
          title: "Should Be Dropped (GV1)"
        },
        "convo-3": {
          ...makeConversation("convo-3"),
          type: "group",
          name: "B",
          title: "B"
        },
        "convo-4": {
          ...makeConversation("convo-4"),
          isBlocked: true,
          name: "4",
          title: "Should Be Dropped (blocked)"
        },
        "convo-5": {
          ...makeConversation("convo-5"),
          discoveredUnregisteredAt: new Date(1999, 3, 20).getTime(),
          name: "C",
          title: "C"
        },
        "convo-6": {
          ...makeConversation("convo-6"),
          profileSharing: true,
          name: "Should Be Dropped (no title)",
          title: null
        },
        "convo-7": {
          ...makeConversation("convo-7"),
          discoveredUnregisteredAt: Date.now(),
          name: "7",
          title: "Should Be Dropped (unregistered)"
        }
      });
      return result;
    }, "getRootStateWithConversations");
    it("returns no gv1, no blocked, no missing titles", () => {
      const state = getRootStateWithConversations();
      const result = (0, import_conversations2.getAllComposableConversations)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, [
        "our-conversation-id",
        "convo-1",
        "convo-3",
        "convo-5"
      ]);
    });
  });
  describe("#getComposableContacts", () => {
    const getRootState = /* @__PURE__ */ __name(() => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              isMe: true
            }
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getRootState");
    it("returns only direct contacts, including me", () => {
      const state = {
        ...getRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-0": {
              ...makeConversation("convo-0"),
              isMe: true,
              profileSharing: false
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              type: "group",
              name: "Friends!",
              sharedGroupNames: []
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              name: "Alice"
            }
          }
        }
      };
      const result = (0, import_conversations2.getComposableContacts)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-0", "convo-2"]);
    });
    it("excludes blocked, unregistered, and missing name/profileSharing", () => {
      const state = {
        ...getRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-0": {
              ...makeConversation("convo-0"),
              name: "Ex",
              isBlocked: true
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              name: "Bob",
              discoveredUnregisteredAt: Date.now()
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              name: "Charlie"
            }
          }
        }
      };
      const result = (0, import_conversations2.getComposableContacts)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-2"]);
    });
  });
  describe("#getCandidateContactsForNewGroup", () => {
    const getRootState = /* @__PURE__ */ __name(() => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              isMe: true
            }
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getRootState");
    it("returns only direct contacts, without me", () => {
      const state = {
        ...getRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-0": {
              ...makeConversation("convo-0"),
              isMe: true,
              name: "Me!"
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              type: "group",
              name: "Friends!",
              sharedGroupNames: []
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              name: "Alice"
            }
          }
        }
      };
      const result = (0, import_conversations2.getCandidateContactsForNewGroup)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-2"]);
    });
    it("excludes blocked, unregistered, and missing name/profileSharing", () => {
      const state = {
        ...getRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-0": {
              ...makeConversation("convo-0"),
              name: "Ex",
              isBlocked: true
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              name: "Bob",
              discoveredUnregisteredAt: Date.now()
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              name: "Charlie"
            }
          }
        }
      };
      const result = (0, import_conversations2.getCandidateContactsForNewGroup)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-2"]);
    });
  });
  describe("#getComposableGroups", () => {
    const getRootState = /* @__PURE__ */ __name(() => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              isMe: true
            }
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getRootState");
    it("returns only groups with name", () => {
      const state = {
        ...getRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-0": {
              ...makeConversation("convo-0"),
              isMe: true,
              name: "Me!"
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              type: "group",
              name: "Friends!",
              sharedGroupNames: []
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              type: "group",
              sharedGroupNames: []
            }
          }
        }
      };
      const result = (0, import_conversations2.getComposableGroups)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-1"]);
    });
    it("excludes blocked, and missing name/profileSharing", () => {
      const state = {
        ...getRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-0": {
              ...makeConversation("convo-0"),
              type: "group",
              name: "Family!",
              isBlocked: true,
              sharedGroupNames: []
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              type: "group",
              name: "Friends!",
              sharedGroupNames: []
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              type: "group",
              sharedGroupNames: []
            }
          }
        }
      };
      const result = (0, import_conversations2.getComposableGroups)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-1"]);
    });
  });
  describe("#getFilteredComposeContacts", () => {
    const getRootState = /* @__PURE__ */ __name((searchTerm = "") => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              name: "Me, Myself, and I",
              title: "Me, Myself, and I",
              searchableTitle: "Note to Self",
              isMe: true
            }
          },
          composer: {
            ...import_defaultComposerStates.defaultStartDirectConversationComposerState,
            searchTerm
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getRootState");
    const getRootStateWithConversations = /* @__PURE__ */ __name((searchTerm = "") => {
      const result = getRootState(searchTerm);
      Object.assign(result.conversations.conversationLookup, {
        "convo-1": {
          ...makeConversation("convo-1"),
          name: "In System Contacts",
          title: "A. Sorted First"
        },
        "convo-2": {
          ...makeConversation("convo-2"),
          title: "Should Be Dropped (no name, no profile sharing)"
        },
        "convo-3": {
          ...makeConversation("convo-3"),
          type: "group",
          title: "Should Be Dropped (group)"
        },
        "convo-4": {
          ...makeConversation("convo-4"),
          isBlocked: true,
          title: "Should Be Dropped (blocked)"
        },
        "convo-5": {
          ...makeConversation("convo-5"),
          discoveredUnregisteredAt: new Date(1999, 3, 20).getTime(),
          name: "In System Contacts (and unregistered too long ago)",
          title: "B. Sorted Second"
        },
        "convo-6": {
          ...makeConversation("convo-6"),
          profileSharing: true,
          profileName: "C. Has Profile Sharing",
          title: "C. Has Profile Sharing"
        },
        "convo-7": {
          ...makeConversation("convo-7"),
          discoveredUnregisteredAt: Date.now(),
          title: "Should Be Dropped (unregistered)"
        }
      });
      return result;
    }, "getRootStateWithConversations");
    it("returns no results when there are no contacts", () => {
      const state = getRootState("foo bar baz");
      const result = (0, import_conversations2.getFilteredComposeContacts)(state);
      import_chai.assert.isEmpty(result);
    });
    it("includes Note to Self with no search term", () => {
      const state = getRootStateWithConversations();
      const result = (0, import_conversations2.getFilteredComposeContacts)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, [
        "our-conversation-id",
        "convo-1",
        "convo-5",
        "convo-6"
      ]);
    });
    it("can search for contacts", () => {
      const state = getRootStateWithConversations("in system");
      const result = (0, import_conversations2.getFilteredComposeContacts)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, ["convo-1", "convo-5"]);
    });
    it("can search for note to self", () => {
      const state = getRootStateWithConversations("note");
      const result = (0, import_conversations2.getFilteredComposeContacts)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, ["our-conversation-id"]);
    });
    it("returns note to self when searching for your own name", () => {
      const state = getRootStateWithConversations("Myself");
      const result = (0, import_conversations2.getFilteredComposeContacts)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, ["our-conversation-id"]);
    });
  });
  describe("#getFilteredComposeGroups", () => {
    const getState = /* @__PURE__ */ __name((searchTerm = "") => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              isMe: true
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              name: "In System Contacts",
              title: "Should be dropped (contact)"
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              title: "Should be dropped (contact)"
            },
            "convo-3": {
              ...makeConversation("convo-3"),
              type: "group",
              name: "Hello World",
              title: "Hello World",
              sharedGroupNames: []
            },
            "convo-4": {
              ...makeConversation("convo-4"),
              type: "group",
              isBlocked: true,
              title: "Should be dropped (blocked)",
              sharedGroupNames: []
            },
            "convo-5": {
              ...makeConversation("convo-5"),
              type: "group",
              title: "Unknown Group",
              sharedGroupNames: []
            },
            "convo-6": {
              ...makeConversation("convo-6"),
              type: "group",
              name: "Signal",
              title: "Signal",
              sharedGroupNames: []
            },
            "convo-7": {
              ...makeConversation("convo-7"),
              profileSharing: false,
              type: "group",
              name: "Signal Fake",
              title: "Signal Fake",
              sharedGroupNames: []
            }
          },
          composer: {
            ...import_defaultComposerStates.defaultStartDirectConversationComposerState,
            searchTerm
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getState");
    it("can search for groups", () => {
      const state = getState("hello");
      const result = (0, import_conversations2.getFilteredComposeGroups)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-3"]);
    });
    it("does not return unknown groups when getting all groups (no search term)", () => {
      const state = getState();
      const result = (0, import_conversations2.getFilteredComposeGroups)(state);
      const ids = result.map((group) => group.id);
      import_chai.assert.deepEqual(ids, ["convo-3", "convo-6", "convo-7"]);
    });
  });
  describe("#getFilteredCandidateContactsForNewGroup", () => {
    const getRootState = /* @__PURE__ */ __name((searchTerm = "") => {
      const rootState = getEmptyRootState();
      return {
        ...rootState,
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "our-conversation-id": {
              ...makeConversation("our-conversation-id"),
              isMe: true
            },
            "convo-1": {
              ...makeConversation("convo-1"),
              name: "In System Contacts",
              title: "A. Sorted First"
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              title: "Should be dropped (has no name)"
            },
            "convo-3": {
              ...makeConversation("convo-3"),
              type: "group",
              title: "Should Be Dropped (group)",
              sharedGroupNames: []
            },
            "convo-4": {
              ...makeConversation("convo-4"),
              isBlocked: true,
              name: "My Name",
              title: "Should Be Dropped (blocked)"
            },
            "convo-5": {
              ...makeConversation("convo-5"),
              discoveredUnregisteredAt: new Date(1999, 3, 20).getTime(),
              name: "In System Contacts (and unregistered too long ago)",
              title: "C. Sorted Third"
            },
            "convo-6": {
              ...makeConversation("convo-6"),
              discoveredUnregisteredAt: Date.now(),
              name: "My Name",
              title: "Should Be Dropped (unregistered)"
            }
          },
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            searchTerm
          }
        },
        user: {
          ...rootState.user,
          ourConversationId: "our-conversation-id",
          i18n
        }
      };
    }, "getRootState");
    it("returns sorted contacts when there is no search term", () => {
      const state = getRootState();
      const result = (0, import_conversations2.getFilteredCandidateContactsForNewGroup)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, ["convo-1", "convo-5"]);
    });
    it("can search for contacts", () => {
      const state = getRootState("system contacts");
      const result = (0, import_conversations2.getFilteredCandidateContactsForNewGroup)(state);
      const ids = result.map((contact) => contact.id);
      import_chai.assert.deepEqual(ids, ["convo-1", "convo-5"]);
    });
  });
  describe("#getComposerConversationSearchTerm", () => {
    it("returns the composer's contact search term", () => {
      import_chai.assert.strictEqual((0, import_conversations2.getComposerConversationSearchTerm)({
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultStartDirectConversationComposerState,
            searchTerm: "foo bar"
          }
        }
      }), "foo bar");
    });
  });
  describe("#_getLeftPaneLists", () => {
    it("sorts conversations based on timestamp then by intl-friendly title", () => {
      const data = {
        id1: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id1",
          e164: "+18005551111",
          activeAt: Date.now(),
          name: "No timestamp",
          timestamp: 0,
          inboxPosition: 0,
          phoneNumber: "notused",
          isArchived: false,
          markedUnread: false,
          type: "direct",
          isMe: false,
          lastUpdated: Date.now(),
          title: "No timestamp",
          unreadCount: 1,
          isSelected: false,
          typingContactId: import_UUID.UUID.generate().toString(),
          acceptedMessageRequest: true
        }),
        id2: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id2",
          e164: "+18005551111",
          activeAt: Date.now(),
          name: "B",
          timestamp: 20,
          inboxPosition: 21,
          phoneNumber: "notused",
          isArchived: false,
          markedUnread: false,
          type: "direct",
          isMe: false,
          lastUpdated: Date.now(),
          title: "B",
          unreadCount: 1,
          isSelected: false,
          typingContactId: import_UUID.UUID.generate().toString(),
          acceptedMessageRequest: true
        }),
        id3: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id3",
          e164: "+18005551111",
          activeAt: Date.now(),
          name: "C",
          timestamp: 20,
          inboxPosition: 22,
          phoneNumber: "notused",
          isArchived: false,
          markedUnread: false,
          type: "direct",
          isMe: false,
          lastUpdated: Date.now(),
          title: "C",
          unreadCount: 1,
          isSelected: false,
          typingContactId: import_UUID.UUID.generate().toString(),
          acceptedMessageRequest: true
        }),
        id4: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id4",
          e164: "+18005551111",
          activeAt: Date.now(),
          name: "\xC1",
          timestamp: 20,
          inboxPosition: 20,
          phoneNumber: "notused",
          isArchived: false,
          markedUnread: false,
          type: "direct",
          isMe: false,
          lastUpdated: Date.now(),
          title: "A",
          unreadCount: 1,
          isSelected: false,
          typingContactId: import_UUID.UUID.generate().toString(),
          acceptedMessageRequest: true
        }),
        id5: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id5",
          e164: "+18005551111",
          activeAt: Date.now(),
          name: "First!",
          timestamp: 30,
          inboxPosition: 30,
          phoneNumber: "notused",
          isArchived: false,
          markedUnread: false,
          type: "direct",
          isMe: false,
          lastUpdated: Date.now(),
          title: "First!",
          unreadCount: 1,
          isSelected: false,
          typingContactId: import_UUID.UUID.generate().toString(),
          acceptedMessageRequest: true
        })
      };
      const comparator = (0, import_conversations2._getConversationComparator)();
      const { archivedConversations, conversations, pinnedConversations } = (0, import_conversations2._getLeftPaneLists)(data, comparator);
      import_chai.assert.strictEqual(conversations[0].name, "First!");
      import_chai.assert.strictEqual(conversations[1].name, "\xC1");
      import_chai.assert.strictEqual(conversations[2].name, "B");
      import_chai.assert.strictEqual(conversations[3].name, "C");
      import_chai.assert.strictEqual(conversations[4].name, "No timestamp");
      import_chai.assert.strictEqual(conversations.length, 5);
      import_chai.assert.strictEqual(archivedConversations.length, 0);
      import_chai.assert.strictEqual(pinnedConversations.length, 0);
    });
    describe("given pinned conversations", () => {
      it("sorts pinned conversations based on order in storage", () => {
        const data = {
          pin2: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin2",
            e164: "+18005551111",
            activeAt: Date.now(),
            name: "Pin Two",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: false,
            isPinned: true,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin Two",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          }),
          pin3: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin3",
            e164: "+18005551111",
            activeAt: Date.now(),
            name: "Pin Three",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: false,
            isPinned: true,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin Three",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          }),
          pin1: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin1",
            e164: "+18005551111",
            activeAt: Date.now(),
            name: "Pin One",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: false,
            isPinned: true,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin One",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          })
        };
        const pinnedConversationIds = ["pin1", "pin2", "pin3"];
        const comparator = (0, import_conversations2._getConversationComparator)();
        const { archivedConversations, conversations, pinnedConversations } = (0, import_conversations2._getLeftPaneLists)(data, comparator, void 0, pinnedConversationIds);
        import_chai.assert.strictEqual(pinnedConversations[0].name, "Pin One");
        import_chai.assert.strictEqual(pinnedConversations[1].name, "Pin Two");
        import_chai.assert.strictEqual(pinnedConversations[2].name, "Pin Three");
        import_chai.assert.strictEqual(archivedConversations.length, 0);
        import_chai.assert.strictEqual(conversations.length, 0);
      });
      it("includes archived and pinned conversations with no active_at", () => {
        const data = {
          pin2: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin2",
            e164: "+18005551111",
            name: "Pin Two",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: false,
            isPinned: true,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin Two",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          }),
          pin3: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin3",
            e164: "+18005551111",
            name: "Pin Three",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: false,
            isPinned: true,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin Three",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          }),
          pin1: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin1",
            e164: "+18005551111",
            name: "Pin One",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: true,
            isPinned: true,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin One",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          }),
          pin4: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin1",
            e164: "+18005551111",
            name: "Pin Four",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            activeAt: Date.now(),
            isArchived: true,
            isPinned: false,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin One",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          }),
          pin5: (0, import_getDefaultConversation.getDefaultConversation)({
            id: "pin1",
            e164: "+18005551111",
            name: "Pin Five",
            timestamp: 30,
            inboxPosition: 30,
            phoneNumber: "notused",
            isArchived: false,
            isPinned: false,
            markedUnread: false,
            type: "direct",
            isMe: false,
            lastUpdated: Date.now(),
            title: "Pin One",
            unreadCount: 1,
            isSelected: false,
            typingContactId: import_UUID.UUID.generate().toString(),
            acceptedMessageRequest: true
          })
        };
        const pinnedConversationIds = ["pin1", "pin2", "pin3"];
        const comparator = (0, import_conversations2._getConversationComparator)();
        const { archivedConversations, conversations, pinnedConversations } = (0, import_conversations2._getLeftPaneLists)(data, comparator, void 0, pinnedConversationIds);
        import_chai.assert.strictEqual(pinnedConversations[0].name, "Pin One");
        import_chai.assert.strictEqual(pinnedConversations[1].name, "Pin Two");
        import_chai.assert.strictEqual(pinnedConversations[2].name, "Pin Three");
        import_chai.assert.strictEqual(pinnedConversations.length, 3);
        import_chai.assert.strictEqual(archivedConversations[0].name, "Pin Four");
        import_chai.assert.strictEqual(archivedConversations.length, 1);
        import_chai.assert.strictEqual(conversations.length, 0);
      });
    });
  });
  describe("#getMaximumGroupSizeModalState", () => {
    it("returns the modal state", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Showing
          }
        }
      };
      import_chai.assert.strictEqual((0, import_conversations2.getMaximumGroupSizeModalState)(state), import_conversationsEnums.OneTimeModalState.Showing);
    });
  });
  describe("#getRecommendedGroupSizeModalState", () => {
    it("returns the modal state", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Showing
          }
        }
      };
      import_chai.assert.strictEqual((0, import_conversations2.getRecommendedGroupSizeModalState)(state), import_conversationsEnums.OneTimeModalState.Showing);
    });
  });
  describe("#getComposeGroupAvatar", () => {
    it("returns undefined if there is no group avatar", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            groupAvatar: void 0
          }
        }
      };
      import_chai.assert.isUndefined((0, import_conversations2.getComposeGroupAvatar)(state));
    });
    it("returns the group avatar", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            groupAvatar: new Uint8Array([1, 2, 3])
          }
        }
      };
      import_chai.assert.deepEqual((0, import_conversations2.getComposeGroupAvatar)(state), new Uint8Array([1, 2, 3]));
    });
  });
  describe("#getComposeGroupName", () => {
    it("returns the group name", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            groupName: "foo bar"
          }
        }
      };
      import_chai.assert.deepEqual((0, import_conversations2.getComposeGroupName)(state), "foo bar");
    });
  });
  describe("#getComposeSelectedContacts", () => {
    it("returns the composer's selected contacts", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            "convo-1": {
              ...makeConversation("convo-1"),
              title: "Person One"
            },
            "convo-2": {
              ...makeConversation("convo-2"),
              title: "Person Two"
            }
          },
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            selectedConversationIds: ["convo-2", "convo-1"]
          }
        }
      };
      const titles = (0, import_conversations2.getComposeSelectedContacts)(state).map((contact) => contact.title);
      import_chai.assert.deepEqual(titles, ["Person Two", "Person One"]);
    });
  });
  describe("#getConversationsByTitleSelector", () => {
    it("returns a selector that finds conversations by title", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            abc: { ...makeConversation("abc"), title: "Janet" },
            def: { ...makeConversation("def"), title: "Janet" },
            geh: { ...makeConversation("geh"), title: "Rick" }
          }
        }
      };
      const selector = (0, import_conversations2.getConversationsByTitleSelector)(state);
      import_chai.assert.sameMembers(selector("Janet").map((c) => c.id), ["abc", "def"]);
      import_chai.assert.sameMembers(selector("Rick").map((c) => c.id), ["geh"]);
      import_chai.assert.isEmpty(selector("abc"));
      import_chai.assert.isEmpty(selector("xyz"));
    });
  });
  describe("#getSelectedConversationId", () => {
    it("returns undefined if no conversation is selected", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            abc123: makeConversation("abc123")
          }
        }
      };
      import_chai.assert.isUndefined((0, import_conversations2.getSelectedConversationId)(state));
    });
    it("returns the selected conversation ID", () => {
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            abc123: makeConversation("abc123")
          },
          selectedConversationId: "abc123"
        }
      };
      import_chai.assert.strictEqual((0, import_conversations2.getSelectedConversationId)(state), "abc123");
    });
  });
  describe("#getContactNameColorSelector", () => {
    it("returns the right color order sorted by UUID ASC", () => {
      const group = makeConversation("group");
      group.type = "group";
      group.sortedGroupMembers = [
        makeConversationWithUuid("fff"),
        makeConversationWithUuid("f00"),
        makeConversationWithUuid("e00"),
        makeConversationWithUuid("d00"),
        makeConversationWithUuid("c00"),
        makeConversationWithUuid("b00"),
        makeConversationWithUuid("a00")
      ];
      const state = {
        ...getEmptyRootState(),
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            group
          }
        }
      };
      const contactNameColorSelector = (0, import_conversations2.getContactNameColorSelector)(state);
      import_chai.assert.equal(contactNameColorSelector("group", "a00"), "200");
      import_chai.assert.equal(contactNameColorSelector("group", "b00"), "120");
      import_chai.assert.equal(contactNameColorSelector("group", "c00"), "300");
      import_chai.assert.equal(contactNameColorSelector("group", "d00"), "010");
      import_chai.assert.equal(contactNameColorSelector("group", "e00"), "210");
      import_chai.assert.equal(contactNameColorSelector("group", "f00"), "330");
      import_chai.assert.equal(contactNameColorSelector("group", "fff"), "230");
    });
    it("returns the right colors for direct conversation", () => {
      const direct = makeConversation("theirId");
      const emptyState = getEmptyRootState();
      const state = {
        ...emptyState,
        user: {
          ...emptyState.user,
          ourConversationId: "us"
        },
        conversations: {
          ...(0, import_conversations.getEmptyState)(),
          conversationLookup: {
            direct
          }
        }
      };
      const contactNameColorSelector = (0, import_conversations2.getContactNameColorSelector)(state);
      import_chai.assert.equal(contactNameColorSelector("direct", "theirId"), "200");
      import_chai.assert.equal(contactNameColorSelector("direct", "us"), "200");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9uc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7XG4gIENvbXBvc2VyU3RlcCxcbiAgQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUsXG4gIE9uZVRpbWVNb2RhbFN0YXRlLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zRW51bXMnO1xuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25Mb29rdXBUeXBlLFxuICBDb252ZXJzYXRpb25UeXBlLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldEVtcHR5U3RhdGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7XG4gIF9nZXRDb252ZXJzYXRpb25Db21wYXJhdG9yLFxuICBfZ2V0TGVmdFBhbmVMaXN0cyxcbiAgZ2V0QWxsQ29tcG9zYWJsZUNvbnZlcnNhdGlvbnMsXG4gIGdldENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAsXG4gIGdldENvbXBvc2FibGVDb250YWN0cyxcbiAgZ2V0Q29tcG9zYWJsZUdyb3VwcyxcbiAgZ2V0Q29tcG9zZUdyb3VwQXZhdGFyLFxuICBnZXRDb21wb3NlR3JvdXBOYW1lLFxuICBnZXRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm0sXG4gIGdldENvbXBvc2VyU3RlcCxcbiAgZ2V0Q29tcG9zZVNlbGVjdGVkQ29udGFjdHMsXG4gIGdldENvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcixcbiAgZ2V0Q29udmVyc2F0aW9uQnlJZFNlbGVjdG9yLFxuICBnZXRDb252ZXJzYXRpb25VdWlkc1N0b3BwaW5nU2VuZCxcbiAgZ2V0Q29udmVyc2F0aW9uSWRzU3RvcHBlZEZvclZlcmlmaWNhdGlvbixcbiAgZ2V0Q29udmVyc2F0aW9uc0J5VGl0bGVTZWxlY3RvcixcbiAgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IsXG4gIGdldENvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQsXG4gIGdldENvbnZlcnNhdGlvbnNTdG9wcGVkRm9yVmVyaWZpY2F0aW9uLFxuICBnZXRGaWx0ZXJlZENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAsXG4gIGdldEZpbHRlcmVkQ29tcG9zZUNvbnRhY3RzLFxuICBnZXRGaWx0ZXJlZENvbXBvc2VHcm91cHMsXG4gIGdldEludml0ZWRDb250YWN0c0Zvck5ld2x5Q3JlYXRlZEdyb3VwLFxuICBnZXRNYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZSxcbiAgZ2V0UGxhY2Vob2xkZXJDb250YWN0LFxuICBnZXRSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUsXG4gIGdldFNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gIGhhc0dyb3VwQ3JlYXRpb25FcnJvcixcbiAgaXNDcmVhdGluZ0dyb3VwLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBub29wQWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3Mvbm9vcCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyByb290UmVkdWNlciB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uLFxuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQsXG59IGZyb20gJy4uLy4uL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQge1xuICBkZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICBkZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxufSBmcm9tICcuLi8uLi9oZWxwZXJzL2RlZmF1bHRDb21wb3NlclN0YXRlcyc7XG5cbmRlc2NyaWJlKCdib3RoL3N0YXRlL3NlbGVjdG9ycy9jb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICBjb25zdCBnZXRFbXB0eVJvb3RTdGF0ZSA9ICgpOiBTdGF0ZVR5cGUgPT4ge1xuICAgIHJldHVybiByb290UmVkdWNlcih1bmRlZmluZWQsIG5vb3BBY3Rpb24oKSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUNvbnZlcnNhdGlvbihpZDogc3RyaW5nKTogQ29udmVyc2F0aW9uVHlwZSB7XG4gICAgcmV0dXJuIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgaWQsXG4gICAgICBzZWFyY2hhYmxlVGl0bGU6IGAke2lkfSB0aXRsZWAsXG4gICAgICB0aXRsZTogYCR7aWR9IHRpdGxlYCxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZChcbiAgICBpZDogc3RyaW5nXG4gICk6IENvbnZlcnNhdGlvblR5cGUgJiB7IHV1aWQ6IFVVSURTdHJpbmdUeXBlIH0ge1xuICAgIHJldHVybiBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoXG4gICAgICB7XG4gICAgICAgIGlkLFxuICAgICAgICBzZWFyY2hhYmxlVGl0bGU6IGAke2lkfSB0aXRsZWAsXG4gICAgICAgIHRpdGxlOiBgJHtpZH0gdGl0bGVgLFxuICAgICAgfSxcbiAgICAgIFVVSUQuZnJvbVByZWZpeChpZCkudG9TdHJpbmcoKVxuICAgICk7XG4gIH1cblxuICBjb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG4gIGRlc2NyaWJlKCcjZ2V0Q29udmVyc2F0aW9uQnlJZFNlbGVjdG9yJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHsgYWJjMTIzOiBtYWtlQ29udmVyc2F0aW9uKCdhYmMxMjMnKSB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBjb252ZXJzYXRpb24gaXMgbm90IGluIHRoZSBsb29rdXAnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnZlcnNhdGlvbkJ5SWRTZWxlY3RvcihzdGF0ZSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3RvcigneHl6Jyk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb252ZXJzYXRpb24gaW4gdGhlIGxvb2t1cCBpZiBpdCBleGlzdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnZlcnNhdGlvbkJ5SWRTZWxlY3RvcihzdGF0ZSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3RvcignYWJjMTIzJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsPy50aXRsZSwgJ2FiYzEyMyB0aXRsZScpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldENvbnZlcnNhdGlvblNlbGVjdG9yJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGVtcHR5IHBsYWNlaG9sZGVyIGlmIGZhbHNleSBpZCBwcm92aWRlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3Rvcih1bmRlZmluZWQpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZ2V0UGxhY2Vob2xkZXJDb250YWN0KCkpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIGVtcHR5IHBsYWNlaG9sZGVyIGlmIG5vIG1hdGNoJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICB9O1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IHNlbGVjdG9yKCdyYW5kb20taWQnKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGdldFBsYWNlaG9sZGVyQ29udGFjdCgpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGNvbnZlcnNhdGlvbiBieSB1dWlkIGZpcnN0JywgKCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSAnaWQnO1xuXG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBtYWtlQ29udmVyc2F0aW9uKGlkKTtcbiAgICAgIGNvbnN0IHdyb25nQ29udmVyc2F0aW9uID0gbWFrZUNvbnZlcnNhdGlvbignd3JvbmcnKTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICBbaWRdOiB3cm9uZ0NvbnZlcnNhdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbnNCeUUxNjQ6IHtcbiAgICAgICAgICAgIFtpZF06IHdyb25nQ29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5VXVpZDoge1xuICAgICAgICAgICAgW2lkXTogY29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5R3JvdXBJZDoge1xuICAgICAgICAgICAgW2lkXTogd3JvbmdDb252ZXJzYXRpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3RvcihpZCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGNvbnZlcnNhdGlvbik7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgY29udmVyc2F0aW9uIGJ5IGUxNjQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9ICdpZCc7XG5cbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IG1ha2VDb252ZXJzYXRpb24oaWQpO1xuICAgICAgY29uc3Qgd3JvbmdDb252ZXJzYXRpb24gPSBtYWtlQ29udmVyc2F0aW9uKCd3cm9uZycpO1xuXG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgIFtpZF06IHdyb25nQ29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5RTE2NDoge1xuICAgICAgICAgICAgW2lkXTogY29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5R3JvdXBJZDoge1xuICAgICAgICAgICAgW2lkXTogd3JvbmdDb252ZXJzYXRpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3RvcihpZCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGNvbnZlcnNhdGlvbik7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgY29udmVyc2F0aW9uIGJ5IGdyb3VwSWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9ICdpZCc7XG5cbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IG1ha2VDb252ZXJzYXRpb24oaWQpO1xuICAgICAgY29uc3Qgd3JvbmdDb252ZXJzYXRpb24gPSBtYWtlQ29udmVyc2F0aW9uKCd3cm9uZycpO1xuXG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgIFtpZF06IHdyb25nQ29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5R3JvdXBJZDoge1xuICAgICAgICAgICAgW2lkXTogY29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gc2VsZWN0b3IoaWQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBjb252ZXJzYXRpb24pO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIGNvbnZlcnNhdGlvbiBieSBjb252ZXJzYXRpb25JZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gJ2lkJztcblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gbWFrZUNvbnZlcnNhdGlvbihpZCk7XG5cbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgW2lkXTogY29udmVyc2F0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gc2VsZWN0b3IoaWQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBjb252ZXJzYXRpb24pO1xuICAgIH0pO1xuXG4gICAgLy8gTGVzcyBpbXBvcnRhbnQgbm93LCBnaXZlbiB0aGF0IGFsbCBwcm9wLWdlbmVyYXRpb24gZm9yIGNvbnZlcnNhdGlvbnMgaXMgaW5cbiAgICAvLyAgIG1vZGVscy9jb252ZXJzYXRpb24uZ2V0UHJvcHMoKSBhbmQgbm90IGhlcmUuXG4gICAgaXQoJ2RvZXMgcHJvcGVyIGNhY2hpbmcgb2YgcmVzdWx0JywgKCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSAnaWQnO1xuXG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBtYWtlQ29udmVyc2F0aW9uKGlkKTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICBbaWRdOiBjb252ZXJzYXRpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBzZWxlY3RvcihpZCk7XG5cbiAgICAgIGNvbnN0IHNlY29uZFN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgIFtpZF06IGNvbnZlcnNhdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2Vjb25kU2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzZWNvbmRTdGF0ZSk7XG4gICAgICBjb25zdCBzZWNvbmRBY3R1YWwgPSBzZWNvbmRTZWxlY3RvcihpZCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIHNlY29uZEFjdHVhbCk7XG5cbiAgICAgIGNvbnN0IHRoaXJkU3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgW2lkXTogbWFrZUNvbnZlcnNhdGlvbigndGhpcmQnKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdGhpcmRTZWxlY3RvciA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHRoaXJkU3RhdGUpO1xuICAgICAgY29uc3QgdGhpcmRBY3R1YWwgPSB0aGlyZFNlbGVjdG9yKGlkKTtcblxuICAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGFjdHVhbCwgdGhpcmRBY3R1YWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldENvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgdGhlcmUgYXJlIG5vIGNvbnZlcnNhdGlvbnMgc3RvcHBpbmcgc2VuZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcblxuICAgICAgYXNzZXJ0LmlzRW1wdHkoZ2V0Q29udmVyc2F0aW9uc1N0b3BwaW5nU2VuZChzdGF0ZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYWxsIGNvbnZlcnNhdGlvbnMgc3RvcHBpbmcgc2VuZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZvMSA9IG1ha2VDb252ZXJzYXRpb24oJ2FiYycpO1xuICAgICAgY29uc3QgY29udm8yID0gbWFrZUNvbnZlcnNhdGlvbignZGVmJyk7XG4gICAgICBjb25zdCBzdGF0ZTogU3RhdGVUeXBlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgZGVmOiBjb252bzIsXG4gICAgICAgICAgICBhYmM6IGNvbnZvMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgICAgJ2NvbnZvIGEnOiB7XG4gICAgICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb24gYXMgY29uc3QsXG4gICAgICAgICAgICAgIHV1aWRzTmVlZGluZ1ZlcmlmaWNhdGlvbjogWydhYmMnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8gYic6IHtcbiAgICAgICAgICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuUGVuZGluZ1ZlcmlmaWNhdGlvbiBhcyBjb25zdCxcbiAgICAgICAgICAgICAgdXVpZHNOZWVkaW5nVmVyaWZpY2F0aW9uOiBbJ2RlZicsICdhYmMnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5zYW1lRGVlcE1lbWJlcnMoZ2V0Q29udmVyc2F0aW9uVXVpZHNTdG9wcGluZ1NlbmQoc3RhdGUpLCBbXG4gICAgICAgICdhYmMnLFxuICAgICAgICAnZGVmJyxcbiAgICAgIF0pO1xuXG4gICAgICBhc3NlcnQuc2FtZURlZXBNZW1iZXJzKGdldENvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQoc3RhdGUpLCBbXG4gICAgICAgIGNvbnZvMSxcbiAgICAgICAgY29udm8yLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0Q29udmVyc2F0aW9uU3RvcHBlZEZvclZlcmlmaWNhdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiB0aGVyZSBhcmUgbm8gY29udmVyc2F0aW9ucyBzdG9wcGluZyBzZW5kJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShnZXRDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kKHN0YXRlKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbGwgY29udmVyc2F0aW9ucyBzdG9wcGluZyBzZW5kJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udm9BID0gbWFrZUNvbnZlcnNhdGlvbignY29udm8gYScpO1xuICAgICAgY29uc3QgY29udm9CID0gbWFrZUNvbnZlcnNhdGlvbignY29udm8gYicpO1xuICAgICAgY29uc3Qgc3RhdGU6IFN0YXRlVHlwZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgICdjb252byBhJzogY29udm9BLFxuICAgICAgICAgICAgJ2NvbnZvIGInOiBjb252b0IsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2ZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgICdjb252byBhJzoge1xuICAgICAgICAgICAgICB0eXBlOiBDb252ZXJzYXRpb25WZXJpZmljYXRpb25TdGF0ZS5QZW5kaW5nVmVyaWZpY2F0aW9uIGFzIGNvbnN0LFxuICAgICAgICAgICAgICB1dWlkc05lZWRpbmdWZXJpZmljYXRpb246IFsnYWJjJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvIGInOiB7XG4gICAgICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb24gYXMgY29uc3QsXG4gICAgICAgICAgICAgIHV1aWRzTmVlZGluZ1ZlcmlmaWNhdGlvbjogWydkZWYnLCAnYWJjJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBhc3NlcnQuc2FtZURlZXBNZW1iZXJzKGdldENvbnZlcnNhdGlvbklkc1N0b3BwZWRGb3JWZXJpZmljYXRpb24oc3RhdGUpLCBbXG4gICAgICAgICdjb252byBhJyxcbiAgICAgICAgJ2NvbnZvIGInLFxuICAgICAgXSk7XG5cbiAgICAgIGFzc2VydC5zYW1lRGVlcE1lbWJlcnMoZ2V0Q29udmVyc2F0aW9uc1N0b3BwZWRGb3JWZXJpZmljYXRpb24oc3RhdGUpLCBbXG4gICAgICAgIGNvbnZvQSxcbiAgICAgICAgY29udm9CLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0SW52aXRlZENvbnRhY3RzRm9yTmV3bHlDcmVhdGVkR3JvdXAnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgdGhlcmUgYXJlIG5vIGludml0ZWQgY29udGFjdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5Um9vdFN0YXRlKCk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZ2V0SW52aXRlZENvbnRhY3RzRm9yTmV3bHlDcmVhdGVkR3JvdXAoc3RhdGUpLCBbXSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBcImh5ZHJhdGVkXCIgaW52aXRlZCBjb250YWN0cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGFiYyA9IG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnYWJjJyk7XG4gICAgICBjb25zdCBkZWYgPSBtYWtlQ29udmVyc2F0aW9uV2l0aFV1aWQoJ2RlZicpO1xuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uc0J5VXVpZDoge1xuICAgICAgICAgICAgW2FiYy51dWlkXTogYWJjLFxuICAgICAgICAgICAgW2RlZi51dWlkXTogZGVmLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW52aXRlZFV1aWRzRm9yTmV3bHlDcmVhdGVkR3JvdXA6IFtkZWYudXVpZCwgYWJjLnV1aWRdLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEludml0ZWRDb250YWN0c0Zvck5ld2x5Q3JlYXRlZEdyb3VwKHN0YXRlKTtcbiAgICAgIGNvbnN0IHRpdGxlcyA9IHJlc3VsdC5tYXAoY29udmVyc2F0aW9uID0+IGNvbnZlcnNhdGlvbi50aXRsZSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwodGl0bGVzLCBbJ2RlZiB0aXRsZScsICdhYmMgdGl0bGUnXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0Q29tcG9zZXJTdGVwJywgKCkgPT4ge1xuICAgIGl0KFwicmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIGNvbXBvc2VyIGlzbid0IG9wZW5cIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0Q29tcG9zZXJTdGVwKHN0YXRlKTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZmlyc3Qgc3RlcCBvZiB0aGUgY29tcG9zZXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3NlcjogZGVmYXVsdFN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRDb21wb3NlclN0ZXAoc3RhdGUpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBDb21wb3NlclN0ZXAuU3RhcnREaXJlY3RDb252ZXJzYXRpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHNlY29uZCBzdGVwIG9mIHRoZSBjb21wb3NlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRDb21wb3NlclN0ZXAoc3RhdGUpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSB0aGlyZCBzdGVwIG9mIHRoZSBjb21wb3NlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0U2V0R3JvdXBNZXRhZGF0YUNvbXBvc2VyU3RhdGUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0Q29tcG9zZXJTdGVwKHN0YXRlKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2hhc0dyb3VwQ3JlYXRpb25FcnJvcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgaW4gdGhlIFwic2V0IGdyb3VwIG1ldGFkYXRhXCIgY29tcG9zZXIgc3RlcCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGhhc0dyb3VwQ3JlYXRpb25FcnJvcihnZXRFbXB0eVJvb3RTdGF0ZSgpKSk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoYXNHcm91cENyZWF0aW9uRXJyb3Ioe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRTdGFydERpcmVjdENvbnZlcnNhdGlvbkNvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBubyBncm91cCBjcmVhdGlvbiBlcnJvcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoYXNHcm91cENyZWF0aW9uRXJyb3Ioe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRTZXRHcm91cE1ldGFkYXRhQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYSBncm91cCBjcmVhdGlvbiBlcnJvcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGhhc0dyb3VwQ3JlYXRpb25FcnJvcih7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgICAuLi5kZWZhdWx0U2V0R3JvdXBNZXRhZGF0YUNvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICAgIGhhc0Vycm9yOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNpc0NyZWF0aW5nR3JvdXAnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IGluIHRoZSBcInNldCBncm91cCBtZXRhZGF0YVwiIGNvbXBvc2VyIHN0ZXAnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShoYXNHcm91cENyZWF0aW9uRXJyb3IoZ2V0RW1wdHlSb290U3RhdGUoKSkpO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNDcmVhdGluZ0dyb3VwKHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGdyb3VwIGlzIG5vdCBiZWluZyBjcmVhdGVkJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGlzQ3JlYXRpbmdHcm91cCh7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgICBjb21wb3NlcjogZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgZ3JvdXAgaXMgYmVpbmcgY3JlYXRlZCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGlzQ3JlYXRpbmdHcm91cCh7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgICAuLi5kZWZhdWx0U2V0R3JvdXBNZXRhZGF0YUNvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICAgIGlzQ3JlYXRpbmc6IHRydWUsXG4gICAgICAgICAgICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0QWxsQ29tcG9zYWJsZUNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2V0Um9vdFN0YXRlID0gKCk6IFN0YXRlVHlwZSA9PiB7XG4gICAgICBjb25zdCByb290U3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucm9vdFN0YXRlLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgJ291ci1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ291ci1jb252ZXJzYXRpb24taWQnKSxcbiAgICAgICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgICAgICAgcHJvZmlsZU5hbWU6ICdNeSBvd24gbmFtZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAuLi5yb290U3RhdGUudXNlcixcbiAgICAgICAgICBvdXJDb252ZXJzYXRpb25JZDogJ291ci1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRSb290U3RhdGVXaXRoQ29udmVyc2F0aW9ucyA9ICgpOiBTdGF0ZVR5cGUgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0Um9vdFN0YXRlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKHJlc3VsdC5jb252ZXJzYXRpb25zLmNvbnZlcnNhdGlvbkxvb2t1cCwge1xuICAgICAgICAnY29udm8tMSc6IHtcbiAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0xJyksXG4gICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgcHJvZmlsZU5hbWU6ICdBJyxcbiAgICAgICAgICB0aXRsZTogJ0EnLFxuICAgICAgICB9LFxuICAgICAgICAnY29udm8tMic6IHtcbiAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0yJyksXG4gICAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgICBpc0dyb3VwVjFBbmREaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICBuYW1lOiAnMicsXG4gICAgICAgICAgdGl0bGU6ICdTaG91bGQgQmUgRHJvcHBlZCAoR1YxKScsXG4gICAgICAgIH0sXG4gICAgICAgICdjb252by0zJzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTMnKSxcbiAgICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICAgIG5hbWU6ICdCJyxcbiAgICAgICAgICB0aXRsZTogJ0InLFxuICAgICAgICB9LFxuICAgICAgICAnY29udm8tNCc6IHtcbiAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by00JyksXG4gICAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICAgIG5hbWU6ICc0JyxcbiAgICAgICAgICB0aXRsZTogJ1Nob3VsZCBCZSBEcm9wcGVkIChibG9ja2VkKScsXG4gICAgICAgIH0sXG4gICAgICAgICdjb252by01Jzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTUnKSxcbiAgICAgICAgICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ6IG5ldyBEYXRlKDE5OTksIDMsIDIwKS5nZXRUaW1lKCksXG4gICAgICAgICAgbmFtZTogJ0MnLFxuICAgICAgICAgIHRpdGxlOiAnQycsXG4gICAgICAgIH0sXG4gICAgICAgICdjb252by02Jzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTYnKSxcbiAgICAgICAgICBwcm9maWxlU2hhcmluZzogdHJ1ZSxcbiAgICAgICAgICBuYW1lOiAnU2hvdWxkIEJlIERyb3BwZWQgKG5vIHRpdGxlKScsXG4gICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgICdjb252by03Jzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTcnKSxcbiAgICAgICAgICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgbmFtZTogJzcnLFxuICAgICAgICAgIHRpdGxlOiAnU2hvdWxkIEJlIERyb3BwZWQgKHVucmVnaXN0ZXJlZCknLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBpdCgncmV0dXJucyBubyBndjEsIG5vIGJsb2NrZWQsIG5vIG1pc3NpbmcgdGl0bGVzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGVXaXRoQ29udmVyc2F0aW9ucygpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0QWxsQ29tcG9zYWJsZUNvbnZlcnNhdGlvbnMoc3RhdGUpO1xuXG4gICAgICBjb25zdCBpZHMgPSByZXN1bHQubWFwKGNvbnRhY3QgPT4gY29udGFjdC5pZCk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGlkcywgW1xuICAgICAgICAnb3VyLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICdjb252by0xJyxcbiAgICAgICAgJ2NvbnZvLTMnLFxuICAgICAgICAnY29udm8tNScsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRDb21wb3NhYmxlQ29udGFjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2V0Um9vdFN0YXRlID0gKCk6IFN0YXRlVHlwZSA9PiB7XG4gICAgICBjb25zdCByb290U3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucm9vdFN0YXRlLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgJ291ci1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ291ci1jb252ZXJzYXRpb24taWQnKSxcbiAgICAgICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIC4uLnJvb3RTdGF0ZS51c2VyLFxuICAgICAgICAgIG91ckNvbnZlcnNhdGlvbklkOiAnb3VyLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGl0KCdyZXR1cm5zIG9ubHkgZGlyZWN0IGNvbnRhY3RzLCBpbmNsdWRpbmcgbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnY29udm8tMCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMCcpLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgICBwcm9maWxlU2hhcmluZzogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTEnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTEnKSxcbiAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgbmFtZTogJ0ZyaWVuZHMhJyxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTInOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTInKSxcbiAgICAgICAgICAgICAgbmFtZTogJ0FsaWNlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldENvbXBvc2FibGVDb250YWN0cyhzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoZ3JvdXAgPT4gZ3JvdXAuaWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChpZHMsIFsnY29udm8tMCcsICdjb252by0yJ10pO1xuICAgIH0pO1xuICAgIGl0KCdleGNsdWRlcyBibG9ja2VkLCB1bnJlZ2lzdGVyZWQsIGFuZCBtaXNzaW5nIG5hbWUvcHJvZmlsZVNoYXJpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnY29udm8tMCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMCcpLFxuICAgICAgICAgICAgICBuYW1lOiAnRXgnLFxuICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTEnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTEnKSxcbiAgICAgICAgICAgICAgbmFtZTogJ0JvYicsXG4gICAgICAgICAgICAgIGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tMic6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMicpLFxuICAgICAgICAgICAgICBuYW1lOiAnQ2hhcmxpZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRDb21wb3NhYmxlQ29udGFjdHMoc3RhdGUpO1xuXG4gICAgICBjb25zdCBpZHMgPSByZXN1bHQubWFwKGdyb3VwID0+IGdyb3VwLmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbJ2NvbnZvLTInXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0Q2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cCcsICgpID0+IHtcbiAgICBjb25zdCBnZXRSb290U3RhdGUgPSAoKTogU3RhdGVUeXBlID0+IHtcbiAgICAgIGNvbnN0IHJvb3RTdGF0ZSA9IGdldEVtcHR5Um9vdFN0YXRlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yb290U3RhdGUsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnb3VyLWNvbnZlcnNhdGlvbi1pZCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignb3VyLWNvbnZlcnNhdGlvbi1pZCcpLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgLi4ucm9vdFN0YXRlLnVzZXIsXG4gICAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6ICdvdXItY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXQoJ3JldHVybnMgb25seSBkaXJlY3QgY29udGFjdHMsIHdpdGhvdXQgbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnY29udm8tMCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMCcpLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgICBuYW1lOiAnTWUhJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tMSc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMScpLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICBuYW1lOiAnRnJpZW5kcyEnLFxuICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tMic6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMicpLFxuICAgICAgICAgICAgICBuYW1lOiAnQWxpY2UnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0Q2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cChzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoZ3JvdXAgPT4gZ3JvdXAuaWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChpZHMsIFsnY29udm8tMiddKTtcbiAgICB9KTtcbiAgICBpdCgnZXhjbHVkZXMgYmxvY2tlZCwgdW5yZWdpc3RlcmVkLCBhbmQgbWlzc2luZyBuYW1lL3Byb2ZpbGVTaGFyaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldFJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgJ2NvbnZvLTAnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTAnKSxcbiAgICAgICAgICAgICAgbmFtZTogJ0V4JyxcbiAgICAgICAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb252by0xJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0xJyksXG4gICAgICAgICAgICAgIG5hbWU6ICdCb2InLFxuICAgICAgICAgICAgICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTInOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTInKSxcbiAgICAgICAgICAgICAgbmFtZTogJ0NoYXJsaWUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0Q2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cChzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoZ3JvdXAgPT4gZ3JvdXAuaWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChpZHMsIFsnY29udm8tMiddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRDb21wb3NhYmxlR3JvdXBzJywgKCkgPT4ge1xuICAgIGNvbnN0IGdldFJvb3RTdGF0ZSA9ICgpOiBTdGF0ZVR5cGUgPT4ge1xuICAgICAgY29uc3Qgcm9vdFN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJvb3RTdGF0ZSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgICdvdXItY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdvdXItY29udmVyc2F0aW9uLWlkJyksXG4gICAgICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAuLi5yb290U3RhdGUudXNlcixcbiAgICAgICAgICBvdXJDb252ZXJzYXRpb25JZDogJ291ci1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBpdCgncmV0dXJucyBvbmx5IGdyb3VwcyB3aXRoIG5hbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnY29udm8tMCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMCcpLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgICBuYW1lOiAnTWUhJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tMSc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMScpLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICBuYW1lOiAnRnJpZW5kcyEnLFxuICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tMic6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMicpLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldENvbXBvc2FibGVHcm91cHMoc3RhdGUpO1xuXG4gICAgICBjb25zdCBpZHMgPSByZXN1bHQubWFwKGdyb3VwID0+IGdyb3VwLmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbJ2NvbnZvLTEnXSk7XG4gICAgfSk7XG4gICAgaXQoJ2V4Y2x1ZGVzIGJsb2NrZWQsIGFuZCBtaXNzaW5nIG5hbWUvcHJvZmlsZVNoYXJpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnY29udm8tMCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMCcpLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICBuYW1lOiAnRmFtaWx5IScsXG4gICAgICAgICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTEnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTEnKSxcbiAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgbmFtZTogJ0ZyaWVuZHMhJyxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTInOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTInKSxcbiAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRDb21wb3NhYmxlR3JvdXBzKHN0YXRlKTtcblxuICAgICAgY29uc3QgaWRzID0gcmVzdWx0Lm1hcChncm91cCA9PiBncm91cC5pZCk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGlkcywgWydjb252by0xJ10pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldEZpbHRlcmVkQ29tcG9zZUNvbnRhY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGdldFJvb3RTdGF0ZSA9IChzZWFyY2hUZXJtID0gJycpOiBTdGF0ZVR5cGUgPT4ge1xuICAgICAgY29uc3Qgcm9vdFN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJvb3RTdGF0ZSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgICdvdXItY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdvdXItY29udmVyc2F0aW9uLWlkJyksXG4gICAgICAgICAgICAgIG5hbWU6ICdNZSwgTXlzZWxmLCBhbmQgSScsXG4gICAgICAgICAgICAgIHRpdGxlOiAnTWUsIE15c2VsZiwgYW5kIEknLFxuICAgICAgICAgICAgICBzZWFyY2hhYmxlVGl0bGU6ICdOb3RlIHRvIFNlbGYnLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICAgICAgICAgICAgc2VhcmNoVGVybSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgLi4ucm9vdFN0YXRlLnVzZXIsXG4gICAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQ6ICdvdXItY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Um9vdFN0YXRlV2l0aENvbnZlcnNhdGlvbnMgPSAoc2VhcmNoVGVybSA9ICcnKTogU3RhdGVUeXBlID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldFJvb3RTdGF0ZShzZWFyY2hUZXJtKTtcbiAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LmNvbnZlcnNhdGlvbnMuY29udmVyc2F0aW9uTG9va3VwLCB7XG4gICAgICAgICdjb252by0xJzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTEnKSxcbiAgICAgICAgICBuYW1lOiAnSW4gU3lzdGVtIENvbnRhY3RzJyxcbiAgICAgICAgICB0aXRsZTogJ0EuIFNvcnRlZCBGaXJzdCcsXG4gICAgICAgIH0sXG4gICAgICAgICdjb252by0yJzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTInKSxcbiAgICAgICAgICB0aXRsZTogJ1Nob3VsZCBCZSBEcm9wcGVkIChubyBuYW1lLCBubyBwcm9maWxlIHNoYXJpbmcpJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnZvLTMnOiB7XG4gICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMycpLFxuICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgdGl0bGU6ICdTaG91bGQgQmUgRHJvcHBlZCAoZ3JvdXApJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnZvLTQnOiB7XG4gICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tNCcpLFxuICAgICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgICB0aXRsZTogJ1Nob3VsZCBCZSBEcm9wcGVkIChibG9ja2VkKScsXG4gICAgICAgIH0sXG4gICAgICAgICdjb252by01Jzoge1xuICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTUnKSxcbiAgICAgICAgICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ6IG5ldyBEYXRlKDE5OTksIDMsIDIwKS5nZXRUaW1lKCksXG4gICAgICAgICAgbmFtZTogJ0luIFN5c3RlbSBDb250YWN0cyAoYW5kIHVucmVnaXN0ZXJlZCB0b28gbG9uZyBhZ28pJyxcbiAgICAgICAgICB0aXRsZTogJ0IuIFNvcnRlZCBTZWNvbmQnLFxuICAgICAgICB9LFxuICAgICAgICAnY29udm8tNic6IHtcbiAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by02JyksXG4gICAgICAgICAgcHJvZmlsZVNoYXJpbmc6IHRydWUsXG4gICAgICAgICAgcHJvZmlsZU5hbWU6ICdDLiBIYXMgUHJvZmlsZSBTaGFyaW5nJyxcbiAgICAgICAgICB0aXRsZTogJ0MuIEhhcyBQcm9maWxlIFNoYXJpbmcnLFxuICAgICAgICB9LFxuICAgICAgICAnY29udm8tNyc6IHtcbiAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by03JyksXG4gICAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIHRpdGxlOiAnU2hvdWxkIEJlIERyb3BwZWQgKHVucmVnaXN0ZXJlZCknLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBpdCgncmV0dXJucyBubyByZXN1bHRzIHdoZW4gdGhlcmUgYXJlIG5vIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGUoJ2ZvbyBiYXIgYmF6Jyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRGaWx0ZXJlZENvbXBvc2VDb250YWN0cyhzdGF0ZSk7XG5cbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5jbHVkZXMgTm90ZSB0byBTZWxmIHdpdGggbm8gc2VhcmNoIHRlcm0nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZVdpdGhDb252ZXJzYXRpb25zKCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRGaWx0ZXJlZENvbXBvc2VDb250YWN0cyhzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoY29udGFjdCA9PiBjb250YWN0LmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbXG4gICAgICAgICdvdXItY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgJ2NvbnZvLTEnLFxuICAgICAgICAnY29udm8tNScsXG4gICAgICAgICdjb252by02JyxcbiAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbiBzZWFyY2ggZm9yIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGVXaXRoQ29udmVyc2F0aW9ucygnaW4gc3lzdGVtJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRGaWx0ZXJlZENvbXBvc2VDb250YWN0cyhzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoY29udGFjdCA9PiBjb250YWN0LmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbJ2NvbnZvLTEnLCAnY29udm8tNSddKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gc2VhcmNoIGZvciBub3RlIHRvIHNlbGYnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZVdpdGhDb252ZXJzYXRpb25zKCdub3RlJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRGaWx0ZXJlZENvbXBvc2VDb250YWN0cyhzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoY29udGFjdCA9PiBjb250YWN0LmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbJ291ci1jb252ZXJzYXRpb24taWQnXSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBub3RlIHRvIHNlbGYgd2hlbiBzZWFyY2hpbmcgZm9yIHlvdXIgb3duIG5hbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZVdpdGhDb252ZXJzYXRpb25zKCdNeXNlbGYnKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEZpbHRlcmVkQ29tcG9zZUNvbnRhY3RzKHN0YXRlKTtcblxuICAgICAgY29uc3QgaWRzID0gcmVzdWx0Lm1hcChjb250YWN0ID0+IGNvbnRhY3QuaWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChpZHMsIFsnb3VyLWNvbnZlcnNhdGlvbi1pZCddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRGaWx0ZXJlZENvbXBvc2VHcm91cHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2V0U3RhdGUgPSAoc2VhcmNoVGVybSA9ICcnKTogU3RhdGVUeXBlID0+IHtcbiAgICAgIGNvbnN0IHJvb3RTdGF0ZSA9IGdldEVtcHR5Um9vdFN0YXRlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yb290U3RhdGUsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAnb3VyLWNvbnZlcnNhdGlvbi1pZCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignb3VyLWNvbnZlcnNhdGlvbi1pZCcpLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb252by0xJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0xJyksXG4gICAgICAgICAgICAgIG5hbWU6ICdJbiBTeXN0ZW0gQ29udGFjdHMnLFxuICAgICAgICAgICAgICB0aXRsZTogJ1Nob3VsZCBiZSBkcm9wcGVkIChjb250YWN0KScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTInOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTInKSxcbiAgICAgICAgICAgICAgdGl0bGU6ICdTaG91bGQgYmUgZHJvcHBlZCAoY29udGFjdCknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb252by0zJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0zJyksXG4gICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgICAgIG5hbWU6ICdIZWxsbyBXb3JsZCcsXG4gICAgICAgICAgICAgIHRpdGxlOiAnSGVsbG8gV29ybGQnLFxuICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tNCc6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tNCcpLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHRpdGxlOiAnU2hvdWxkIGJlIGRyb3BwZWQgKGJsb2NrZWQpJyxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTUnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTUnKSxcbiAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgICAgICAgdGl0bGU6ICdVbmtub3duIEdyb3VwJyxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTYnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTYnKSxcbiAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgICAgICAgbmFtZTogJ1NpZ25hbCcsXG4gICAgICAgICAgICAgIHRpdGxlOiAnU2lnbmFsJyxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTcnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTcnKSxcbiAgICAgICAgICAgICAgcHJvZmlsZVNoYXJpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICAgICAgICBuYW1lOiAnU2lnbmFsIEZha2UnLFxuICAgICAgICAgICAgICB0aXRsZTogJ1NpZ25hbCBGYWtlJyxcbiAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRTdGFydERpcmVjdENvbnZlcnNhdGlvbkNvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBzZWFyY2hUZXJtLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAuLi5yb290U3RhdGUudXNlcixcbiAgICAgICAgICBvdXJDb252ZXJzYXRpb25JZDogJ291ci1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBpdCgnY2FuIHNlYXJjaCBmb3IgZ3JvdXBzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgnaGVsbG8nKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEZpbHRlcmVkQ29tcG9zZUdyb3VwcyhzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoZ3JvdXAgPT4gZ3JvdXAuaWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChpZHMsIFsnY29udm8tMyddKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCByZXR1cm4gdW5rbm93biBncm91cHMgd2hlbiBnZXR0aW5nIGFsbCBncm91cHMgKG5vIHNlYXJjaCB0ZXJtKScsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEZpbHRlcmVkQ29tcG9zZUdyb3VwcyhzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoZ3JvdXAgPT4gZ3JvdXAuaWQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChpZHMsIFsnY29udm8tMycsICdjb252by02JywgJ2NvbnZvLTcnXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0RmlsdGVyZWRDYW5kaWRhdGVDb250YWN0c0Zvck5ld0dyb3VwJywgKCkgPT4ge1xuICAgIGNvbnN0IGdldFJvb3RTdGF0ZSA9IChzZWFyY2hUZXJtID0gJycpOiBTdGF0ZVR5cGUgPT4ge1xuICAgICAgY29uc3Qgcm9vdFN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJvb3RTdGF0ZSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgICdvdXItY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdvdXItY29udmVyc2F0aW9uLWlkJyksXG4gICAgICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTEnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTEnKSxcbiAgICAgICAgICAgICAgbmFtZTogJ0luIFN5c3RlbSBDb250YWN0cycsXG4gICAgICAgICAgICAgIHRpdGxlOiAnQS4gU29ydGVkIEZpcnN0JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udm8tMic6IHtcbiAgICAgICAgICAgICAgLi4ubWFrZUNvbnZlcnNhdGlvbignY29udm8tMicpLFxuICAgICAgICAgICAgICB0aXRsZTogJ1Nob3VsZCBiZSBkcm9wcGVkIChoYXMgbm8gbmFtZSknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb252by0zJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0zJyksXG4gICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgICAgIHRpdGxlOiAnU2hvdWxkIEJlIERyb3BwZWQgKGdyb3VwKScsXG4gICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb252by00Jzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by00JyksXG4gICAgICAgICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbmFtZTogJ015IE5hbWUnLFxuICAgICAgICAgICAgICB0aXRsZTogJ1Nob3VsZCBCZSBEcm9wcGVkIChibG9ja2VkKScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTUnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTUnKSxcbiAgICAgICAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBuZXcgRGF0ZSgxOTk5LCAzLCAyMCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICBuYW1lOiAnSW4gU3lzdGVtIENvbnRhY3RzIChhbmQgdW5yZWdpc3RlcmVkIHRvbyBsb25nIGFnbyknLFxuICAgICAgICAgICAgICB0aXRsZTogJ0MuIFNvcnRlZCBUaGlyZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTYnOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTYnKSxcbiAgICAgICAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICBuYW1lOiAnTXkgTmFtZScsXG4gICAgICAgICAgICAgIHRpdGxlOiAnU2hvdWxkIEJlIERyb3BwZWQgKHVucmVnaXN0ZXJlZCknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIHNlYXJjaFRlcm0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIC4uLnJvb3RTdGF0ZS51c2VyLFxuICAgICAgICAgIG91ckNvbnZlcnNhdGlvbklkOiAnb3VyLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGl0KCdyZXR1cm5zIHNvcnRlZCBjb250YWN0cyB3aGVuIHRoZXJlIGlzIG5vIHNlYXJjaCB0ZXJtJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGUoKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEZpbHRlcmVkQ2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cChzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoY29udGFjdCA9PiBjb250YWN0LmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbJ2NvbnZvLTEnLCAnY29udm8tNSddKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gc2VhcmNoIGZvciBjb250YWN0cycsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0Um9vdFN0YXRlKCdzeXN0ZW0gY29udGFjdHMnKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEZpbHRlcmVkQ2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cChzdGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5tYXAoY29udGFjdCA9PiBjb250YWN0LmlkKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaWRzLCBbJ2NvbnZvLTEnLCAnY29udm8tNSddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm0nLCAoKSA9PiB7XG4gICAgaXQoXCJyZXR1cm5zIHRoZSBjb21wb3NlcidzIGNvbnRhY3Qgc2VhcmNoIHRlcm1cIiwgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm0oe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgICAgLi4uZGVmYXVsdFN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgJ2ZvbyBiYXInXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI19nZXRMZWZ0UGFuZUxpc3RzJywgKCkgPT4ge1xuICAgIGl0KCdzb3J0cyBjb252ZXJzYXRpb25zIGJhc2VkIG9uIHRpbWVzdGFtcCB0aGVuIGJ5IGludGwtZnJpZW5kbHkgdGl0bGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlID0ge1xuICAgICAgICBpZDE6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnaWQxJyxcbiAgICAgICAgICBlMTY0OiAnKzE4MDA1NTUxMTExJyxcbiAgICAgICAgICBhY3RpdmVBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICBuYW1lOiAnTm8gdGltZXN0YW1wJyxcbiAgICAgICAgICB0aW1lc3RhbXA6IDAsXG4gICAgICAgICAgaW5ib3hQb3NpdGlvbjogMCxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJ25vdHVzZWQnLFxuICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG5cbiAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgICBsYXN0VXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0aXRsZTogJ05vIHRpbWVzdGFtcCcsXG4gICAgICAgICAgdW5yZWFkQ291bnQ6IDEsXG4gICAgICAgICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgdHlwaW5nQ29udGFjdElkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcblxuICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBpZDI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnaWQyJyxcbiAgICAgICAgICBlMTY0OiAnKzE4MDA1NTUxMTExJyxcbiAgICAgICAgICBhY3RpdmVBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICBuYW1lOiAnQicsXG4gICAgICAgICAgdGltZXN0YW1wOiAyMCxcbiAgICAgICAgICBpbmJveFBvc2l0aW9uOiAyMSxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJ25vdHVzZWQnLFxuICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgIG1hcmtlZFVucmVhZDogZmFsc2UsXG5cbiAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgICBsYXN0VXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB0aXRsZTogJ0InLFxuICAgICAgICAgIHVucmVhZENvdW50OiAxLFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgaWQzOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBpZDogJ2lkMycsXG4gICAgICAgICAgZTE2NDogJysxODAwNTU1MTExMScsXG4gICAgICAgICAgYWN0aXZlQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgbmFtZTogJ0MnLFxuICAgICAgICAgIHRpbWVzdGFtcDogMjAsXG4gICAgICAgICAgaW5ib3hQb3NpdGlvbjogMjIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICBpc0FyY2hpdmVkOiBmYWxzZSxcbiAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgdGl0bGU6ICdDJyxcbiAgICAgICAgICB1bnJlYWRDb3VudDogMSxcbiAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICB0eXBpbmdDb250YWN0SWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuXG4gICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIGlkNDogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICdpZDQnLFxuICAgICAgICAgIGUxNjQ6ICcrMTgwMDU1NTExMTEnLFxuICAgICAgICAgIGFjdGl2ZUF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIG5hbWU6ICdcdTAwQzEnLFxuICAgICAgICAgIHRpbWVzdGFtcDogMjAsXG4gICAgICAgICAgaW5ib3hQb3NpdGlvbjogMjAsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICBpc0FyY2hpdmVkOiBmYWxzZSxcbiAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgdGl0bGU6ICdBJyxcbiAgICAgICAgICB1bnJlYWRDb3VudDogMSxcbiAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICB0eXBpbmdDb250YWN0SWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuXG4gICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIGlkNTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICdpZDUnLFxuICAgICAgICAgIGUxNjQ6ICcrMTgwMDU1NTExMTEnLFxuICAgICAgICAgIGFjdGl2ZUF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIG5hbWU6ICdGaXJzdCEnLFxuICAgICAgICAgIHRpbWVzdGFtcDogMzAsXG4gICAgICAgICAgaW5ib3hQb3NpdGlvbjogMzAsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICBpc0FyY2hpdmVkOiBmYWxzZSxcbiAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgdGl0bGU6ICdGaXJzdCEnLFxuICAgICAgICAgIHVucmVhZENvdW50OiAxLFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb21wYXJhdG9yID0gX2dldENvbnZlcnNhdGlvbkNvbXBhcmF0b3IoKTtcbiAgICAgIGNvbnN0IHsgYXJjaGl2ZWRDb252ZXJzYXRpb25zLCBjb252ZXJzYXRpb25zLCBwaW5uZWRDb252ZXJzYXRpb25zIH0gPVxuICAgICAgICBfZ2V0TGVmdFBhbmVMaXN0cyhkYXRhLCBjb21wYXJhdG9yKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbnNbMF0ubmFtZSwgJ0ZpcnN0IScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbnNbMV0ubmFtZSwgJ1x1MDBDMScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbnNbMl0ubmFtZSwgJ0InKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb252ZXJzYXRpb25zWzNdLm5hbWUsICdDJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29udmVyc2F0aW9uc1s0XS5uYW1lLCAnTm8gdGltZXN0YW1wJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29udmVyc2F0aW9ucy5sZW5ndGgsIDUpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXJjaGl2ZWRDb252ZXJzYXRpb25zLmxlbmd0aCwgMCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwaW5uZWRDb252ZXJzYXRpb25zLmxlbmd0aCwgMCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2l2ZW4gcGlubmVkIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBpdCgnc29ydHMgcGlubmVkIGNvbnZlcnNhdGlvbnMgYmFzZWQgb24gb3JkZXIgaW4gc3RvcmFnZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YTogQ29udmVyc2F0aW9uTG9va3VwVHlwZSA9IHtcbiAgICAgICAgICBwaW4yOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgIGlkOiAncGluMicsXG4gICAgICAgICAgICBlMTY0OiAnKzE4MDA1NTUxMTExJyxcbiAgICAgICAgICAgIGFjdGl2ZUF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbmFtZTogJ1BpbiBUd28nLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAzMCxcbiAgICAgICAgICAgIGluYm94UG9zaXRpb246IDMwLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNQaW5uZWQ6IHRydWUsXG4gICAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgICB0aXRsZTogJ1BpbiBUd28nLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQ6IDEsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgcGluMzogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICBpZDogJ3BpbjMnLFxuICAgICAgICAgICAgZTE2NDogJysxODAwNTU1MTExMScsXG4gICAgICAgICAgICBhY3RpdmVBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG5hbWU6ICdQaW4gVGhyZWUnLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAzMCxcbiAgICAgICAgICAgIGluYm94UG9zaXRpb246IDMwLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNQaW5uZWQ6IHRydWUsXG4gICAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgICB0aXRsZTogJ1BpbiBUaHJlZScsXG4gICAgICAgICAgICB1bnJlYWRDb3VudDogMSxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdHlwaW5nQ29udGFjdElkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcblxuICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwaW4xOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgIGlkOiAncGluMScsXG4gICAgICAgICAgICBlMTY0OiAnKzE4MDA1NTUxMTExJyxcbiAgICAgICAgICAgIGFjdGl2ZUF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbmFtZTogJ1BpbiBPbmUnLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAzMCxcbiAgICAgICAgICAgIGluYm94UG9zaXRpb246IDMwLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNQaW5uZWQ6IHRydWUsXG4gICAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgICB0aXRsZTogJ1BpbiBPbmUnLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQ6IDEsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgICAgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9uSWRzID0gWydwaW4xJywgJ3BpbjInLCAncGluMyddO1xuICAgICAgICBjb25zdCBjb21wYXJhdG9yID0gX2dldENvbnZlcnNhdGlvbkNvbXBhcmF0b3IoKTtcbiAgICAgICAgY29uc3QgeyBhcmNoaXZlZENvbnZlcnNhdGlvbnMsIGNvbnZlcnNhdGlvbnMsIHBpbm5lZENvbnZlcnNhdGlvbnMgfSA9XG4gICAgICAgICAgX2dldExlZnRQYW5lTGlzdHMoZGF0YSwgY29tcGFyYXRvciwgdW5kZWZpbmVkLCBwaW5uZWRDb252ZXJzYXRpb25JZHMpO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwaW5uZWRDb252ZXJzYXRpb25zWzBdLm5hbWUsICdQaW4gT25lJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwaW5uZWRDb252ZXJzYXRpb25zWzFdLm5hbWUsICdQaW4gVHdvJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwaW5uZWRDb252ZXJzYXRpb25zWzJdLm5hbWUsICdQaW4gVGhyZWUnKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXJjaGl2ZWRDb252ZXJzYXRpb25zLmxlbmd0aCwgMCk7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvbnZlcnNhdGlvbnMubGVuZ3RoLCAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaW5jbHVkZXMgYXJjaGl2ZWQgYW5kIHBpbm5lZCBjb252ZXJzYXRpb25zIHdpdGggbm8gYWN0aXZlX2F0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlID0ge1xuICAgICAgICAgIHBpbjI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgaWQ6ICdwaW4yJyxcbiAgICAgICAgICAgIGUxNjQ6ICcrMTgwMDU1NTExMTEnLFxuICAgICAgICAgICAgbmFtZTogJ1BpbiBUd28nLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAzMCxcbiAgICAgICAgICAgIGluYm94UG9zaXRpb246IDMwLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNQaW5uZWQ6IHRydWUsXG4gICAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgICB0aXRsZTogJ1BpbiBUd28nLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQ6IDEsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgcGluMzogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICBpZDogJ3BpbjMnLFxuICAgICAgICAgICAgZTE2NDogJysxODAwNTU1MTExMScsXG4gICAgICAgICAgICBuYW1lOiAnUGluIFRocmVlJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMzAsXG4gICAgICAgICAgICBpbmJveFBvc2l0aW9uOiAzMCxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnbm90dXNlZCcsXG4gICAgICAgICAgICBpc0FyY2hpdmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzUGlubmVkOiB0cnVlLFxuICAgICAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcblxuICAgICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RVcGRhdGVkOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgdGl0bGU6ICdQaW4gVGhyZWUnLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQ6IDEsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgcGluMTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICBpZDogJ3BpbjEnLFxuICAgICAgICAgICAgZTE2NDogJysxODAwNTU1MTExMScsXG4gICAgICAgICAgICBuYW1lOiAnUGluIE9uZScsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IDMwLFxuICAgICAgICAgICAgaW5ib3hQb3NpdGlvbjogMzAsXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogJ25vdHVzZWQnLFxuICAgICAgICAgICAgaXNBcmNoaXZlZDogdHJ1ZSxcbiAgICAgICAgICAgIGlzUGlubmVkOiB0cnVlLFxuICAgICAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcblxuICAgICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RVcGRhdGVkOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgdGl0bGU6ICdQaW4gT25lJyxcbiAgICAgICAgICAgIHVucmVhZENvdW50OiAxLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICB0eXBpbmdDb250YWN0SWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuXG4gICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHBpbjQ6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgaWQ6ICdwaW4xJyxcbiAgICAgICAgICAgIGUxNjQ6ICcrMTgwMDU1NTExMTEnLFxuICAgICAgICAgICAgbmFtZTogJ1BpbiBGb3VyJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMzAsXG4gICAgICAgICAgICBpbmJveFBvc2l0aW9uOiAzMCxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnbm90dXNlZCcsXG4gICAgICAgICAgICBhY3RpdmVBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGlzQXJjaGl2ZWQ6IHRydWUsXG4gICAgICAgICAgICBpc1Bpbm5lZDogZmFsc2UsXG4gICAgICAgICAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICAgICAgICB0aXRsZTogJ1BpbiBPbmUnLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQ6IDEsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGluZ0NvbnRhY3RJZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG5cbiAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgcGluNTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICBpZDogJ3BpbjEnLFxuICAgICAgICAgICAgZTE2NDogJysxODAwNTU1MTExMScsXG4gICAgICAgICAgICBuYW1lOiAnUGluIEZpdmUnLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAzMCxcbiAgICAgICAgICAgIGluYm94UG9zaXRpb246IDMwLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICdub3R1c2VkJyxcbiAgICAgICAgICAgIGlzQXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNQaW5uZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcblxuICAgICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RVcGRhdGVkOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgdGl0bGU6ICdQaW4gT25lJyxcbiAgICAgICAgICAgIHVucmVhZENvdW50OiAxLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICB0eXBpbmdDb250YWN0SWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuXG4gICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBpbm5lZENvbnZlcnNhdGlvbklkcyA9IFsncGluMScsICdwaW4yJywgJ3BpbjMnXTtcbiAgICAgICAgY29uc3QgY29tcGFyYXRvciA9IF9nZXRDb252ZXJzYXRpb25Db21wYXJhdG9yKCk7XG4gICAgICAgIGNvbnN0IHsgYXJjaGl2ZWRDb252ZXJzYXRpb25zLCBjb252ZXJzYXRpb25zLCBwaW5uZWRDb252ZXJzYXRpb25zIH0gPVxuICAgICAgICAgIF9nZXRMZWZ0UGFuZUxpc3RzKGRhdGEsIGNvbXBhcmF0b3IsIHVuZGVmaW5lZCwgcGlubmVkQ29udmVyc2F0aW9uSWRzKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGlubmVkQ29udmVyc2F0aW9uc1swXS5uYW1lLCAnUGluIE9uZScpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGlubmVkQ29udmVyc2F0aW9uc1sxXS5uYW1lLCAnUGluIFR3bycpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGlubmVkQ29udmVyc2F0aW9uc1syXS5uYW1lLCAnUGluIFRocmVlJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwaW5uZWRDb252ZXJzYXRpb25zLmxlbmd0aCwgMyk7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFyY2hpdmVkQ29udmVyc2F0aW9uc1swXS5uYW1lLCAnUGluIEZvdXInKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFyY2hpdmVkQ29udmVyc2F0aW9ucy5sZW5ndGgsIDEpO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb252ZXJzYXRpb25zLmxlbmd0aCwgMCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRNYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbW9kYWwgc3RhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd2luZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0TWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGUoc3RhdGUpLFxuICAgICAgICBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93aW5nXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldFJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbW9kYWwgc3RhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZShzdGF0ZSksXG4gICAgICAgIE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0Q29tcG9zZUdyb3VwQXZhdGFyJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBubyBncm91cCBhdmF0YXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgZ3JvdXBBdmF0YXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRDb21wb3NlR3JvdXBBdmF0YXIoc3RhdGUpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBncm91cCBhdmF0YXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgZ3JvdXBBdmF0YXI6IG5ldyBVaW50OEFycmF5KFsxLCAyLCAzXSksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGdldENvbXBvc2VHcm91cEF2YXRhcihzdGF0ZSksIG5ldyBVaW50OEFycmF5KFsxLCAyLCAzXSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldENvbXBvc2VHcm91cE5hbWUnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIGdyb3VwIG5hbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiAnZm9vIGJhcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGdldENvbXBvc2VHcm91cE5hbWUoc3RhdGUpLCAnZm9vIGJhcicpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldENvbXBvc2VTZWxlY3RlZENvbnRhY3RzJywgKCkgPT4ge1xuICAgIGl0KFwicmV0dXJucyB0aGUgY29tcG9zZXIncyBzZWxlY3RlZCBjb250YWN0c1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgICdjb252by0xJzoge1xuICAgICAgICAgICAgICAuLi5tYWtlQ29udmVyc2F0aW9uKCdjb252by0xJyksXG4gICAgICAgICAgICAgIHRpdGxlOiAnUGVyc29uIE9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnZvLTInOiB7XG4gICAgICAgICAgICAgIC4uLm1ha2VDb252ZXJzYXRpb24oJ2NvbnZvLTInKSxcbiAgICAgICAgICAgICAgdGl0bGU6ICdQZXJzb24gVHdvJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IFsnY29udm8tMicsICdjb252by0xJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRpdGxlcyA9IGdldENvbXBvc2VTZWxlY3RlZENvbnRhY3RzKHN0YXRlKS5tYXAoXG4gICAgICAgIGNvbnRhY3QgPT4gY29udGFjdC50aXRsZVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwodGl0bGVzLCBbJ1BlcnNvbiBUd28nLCAnUGVyc29uIE9uZSddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRDb252ZXJzYXRpb25zQnlUaXRsZVNlbGVjdG9yJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGEgc2VsZWN0b3IgdGhhdCBmaW5kcyBjb252ZXJzYXRpb25zIGJ5IHRpdGxlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICBhYmM6IHsgLi4ubWFrZUNvbnZlcnNhdGlvbignYWJjJyksIHRpdGxlOiAnSmFuZXQnIH0sXG4gICAgICAgICAgICBkZWY6IHsgLi4ubWFrZUNvbnZlcnNhdGlvbignZGVmJyksIHRpdGxlOiAnSmFuZXQnIH0sXG4gICAgICAgICAgICBnZWg6IHsgLi4ubWFrZUNvbnZlcnNhdGlvbignZ2VoJyksIHRpdGxlOiAnUmljaycgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25zQnlUaXRsZVNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgYXNzZXJ0LnNhbWVNZW1iZXJzKFxuICAgICAgICBzZWxlY3RvcignSmFuZXQnKS5tYXAoYyA9PiBjLmlkKSxcbiAgICAgICAgWydhYmMnLCAnZGVmJ11cbiAgICAgICk7XG4gICAgICBhc3NlcnQuc2FtZU1lbWJlcnMoXG4gICAgICAgIHNlbGVjdG9yKCdSaWNrJykubWFwKGMgPT4gYy5pZCksXG4gICAgICAgIFsnZ2VoJ11cbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNFbXB0eShzZWxlY3RvcignYWJjJykpO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkoc2VsZWN0b3IoJ3h5eicpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRTZWxlY3RlZENvbnZlcnNhdGlvbklkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBjb252ZXJzYXRpb24gaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgICAgIGFiYzEyMzogbWFrZUNvbnZlcnNhdGlvbignYWJjMTIzJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoZ2V0U2VsZWN0ZWRDb252ZXJzYXRpb25JZChzdGF0ZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHNlbGVjdGVkIGNvbnZlcnNhdGlvbiBJRCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgYWJjMTIzOiBtYWtlQ29udmVyc2F0aW9uKCdhYmMxMjMnKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRTZWxlY3RlZENvbnZlcnNhdGlvbklkKHN0YXRlKSwgJ2FiYzEyMycpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldENvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgcmlnaHQgY29sb3Igb3JkZXIgc29ydGVkIGJ5IFVVSUQgQVNDJywgKCkgPT4ge1xuICAgICAgY29uc3QgZ3JvdXAgPSBtYWtlQ29udmVyc2F0aW9uKCdncm91cCcpO1xuICAgICAgZ3JvdXAudHlwZSA9ICdncm91cCc7XG4gICAgICBncm91cC5zb3J0ZWRHcm91cE1lbWJlcnMgPSBbXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnZmZmJyksXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnZjAwJyksXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnZTAwJyksXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnZDAwJyksXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnYzAwJyksXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnYjAwJyksXG4gICAgICAgIG1ha2VDb252ZXJzYXRpb25XaXRoVXVpZCgnYTAwJyksXG4gICAgICBdO1xuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICBncm91cCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY29udGFjdE5hbWVDb2xvclNlbGVjdG9yID0gZ2V0Q29udGFjdE5hbWVDb2xvclNlbGVjdG9yKHN0YXRlKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKGNvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcignZ3JvdXAnLCAnYTAwJyksICcyMDAnKTtcbiAgICAgIGFzc2VydC5lcXVhbChjb250YWN0TmFtZUNvbG9yU2VsZWN0b3IoJ2dyb3VwJywgJ2IwMCcpLCAnMTIwJyk7XG4gICAgICBhc3NlcnQuZXF1YWwoY29udGFjdE5hbWVDb2xvclNlbGVjdG9yKCdncm91cCcsICdjMDAnKSwgJzMwMCcpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGNvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcignZ3JvdXAnLCAnZDAwJyksICcwMTAnKTtcbiAgICAgIGFzc2VydC5lcXVhbChjb250YWN0TmFtZUNvbG9yU2VsZWN0b3IoJ2dyb3VwJywgJ2UwMCcpLCAnMjEwJyk7XG4gICAgICBhc3NlcnQuZXF1YWwoY29udGFjdE5hbWVDb2xvclNlbGVjdG9yKCdncm91cCcsICdmMDAnKSwgJzMzMCcpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGNvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcignZ3JvdXAnLCAnZmZmJyksICcyMzAnKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSByaWdodCBjb2xvcnMgZm9yIGRpcmVjdCBjb252ZXJzYXRpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3QgPSBtYWtlQ29udmVyc2F0aW9uKCd0aGVpcklkJyk7XG4gICAgICBjb25zdCBlbXB0eVN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5lbXB0eVN0YXRlLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgLi4uZW1wdHlTdGF0ZS51c2VyLFxuICAgICAgICAgIG91ckNvbnZlcnNhdGlvbklkOiAndXMnLFxuICAgICAgICB9LFxuICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgZGlyZWN0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjb250YWN0TmFtZUNvbG9yU2VsZWN0b3IgPSBnZXRDb250YWN0TmFtZUNvbG9yU2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgICBhc3NlcnQuZXF1YWwoY29udGFjdE5hbWVDb2xvclNlbGVjdG9yKCdkaXJlY3QnLCAndGhlaXJJZCcpLCAnMjAwJyk7XG4gICAgICBhc3NlcnQuZXF1YWwoY29udGFjdE5hbWVDb2xvclNlbGVjdG9yKCdkaXJlY3QnLCAndXMnKSwgJzIwMCcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUV2QixnQ0FJTztBQUtQLDJCQUE4QjtBQUM5Qiw0QkE4Qk87QUFDUCxrQkFBMkI7QUFFM0IscUJBQXVDO0FBQ3ZDLHVCQUEwQjtBQUMxQixrQkFBcUI7QUFFckIsc0JBQXVCO0FBQ3ZCLG9DQUdPO0FBQ1AsbUNBSU87QUFFUCxTQUFTLHNDQUFzQyxNQUFNO0FBQ25ELFFBQU0sb0JBQW9CLDZCQUFpQjtBQUN6QyxXQUFPLDRCQUFZLFFBQVcsNEJBQVcsQ0FBQztBQUFBLEVBQzVDLEdBRjBCO0FBSTFCLDRCQUEwQixJQUE4QjtBQUN0RCxXQUFPLDBEQUF1QjtBQUFBLE1BQzVCO0FBQUEsTUFDQSxpQkFBaUIsR0FBRztBQUFBLE1BQ3BCLE9BQU8sR0FB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
