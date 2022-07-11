var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_uuid = require("uuid");
var import_getDefaultConversation = require("../helpers/getDefaultConversation");
var import_MessageSendState = require("../../messages/MessageSendState");
var import_migrateLegacySendAttributes = require("../../messages/migrateLegacySendAttributes");
describe("migrateLegacySendAttributes", () => {
  const defaultMessage = {
    type: "outgoing",
    sent_at: 123,
    sent: true
  };
  const createGetConversation = /* @__PURE__ */ __name((...conversations) => {
    const lookup = /* @__PURE__ */ new Map();
    conversations.forEach((conversation) => {
      [conversation.id, conversation.uuid, conversation.e164].forEach((property) => {
        if (property) {
          lookup.set(property, conversation);
        }
      });
    });
    return (id) => id ? lookup.get(id) : void 0;
  }, "createGetConversation");
  it("doesn't migrate messages that already have the modern send state", () => {
    const ourConversationId = (0, import_uuid.v4)();
    const message = {
      ...defaultMessage,
      sendStateByConversationId: {
        [ourConversationId]: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: 123
        }
      }
    };
    const getConversation = /* @__PURE__ */ __name(() => void 0, "getConversation");
    import_chai.assert.isUndefined((0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(message, getConversation, ourConversationId));
  });
  it("doesn't migrate messages that aren't outgoing", () => {
    const ourConversationId = (0, import_uuid.v4)();
    const message = {
      ...defaultMessage,
      type: "incoming"
    };
    const getConversation = /* @__PURE__ */ __name(() => void 0, "getConversation");
    import_chai.assert.isUndefined((0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(message, getConversation, ourConversationId));
  });
  it('advances the send state machine, starting from "pending", for different state types', () => {
    let e164Counter = 0;
    const getTestConversation = /* @__PURE__ */ __name(() => {
      const last4Digits = e164Counter.toString().padStart(4);
      import_chai.assert.strictEqual(last4Digits.length, 4, "Test setup failure: E164 is too long");
      e164Counter += 1;
      return (0, import_getDefaultConversation.getDefaultConversation)({ e164: `+1999555${last4Digits}` });
    }, "getTestConversation");
    const ignoredUuid = import_uuid.v4;
    const failedConversationByUuid = getTestConversation();
    const failedConversationByE164 = getTestConversation();
    const pendingConversation = getTestConversation();
    const sentConversation = getTestConversation();
    const deliveredConversation = getTestConversation();
    const readConversation = getTestConversation();
    const conversationNotInRecipientsList = getTestConversation();
    const ourConversation = getTestConversation();
    const message = {
      ...defaultMessage,
      recipients: [
        failedConversationByUuid.uuid,
        failedConversationByE164.uuid,
        pendingConversation.uuid,
        sentConversation.uuid,
        deliveredConversation.uuid,
        readConversation.uuid,
        ignoredUuid(),
        ourConversation.uuid
      ],
      errors: [
        Object.assign(new Error("looked up by UUID"), {
          identifier: failedConversationByUuid.uuid
        }),
        Object.assign(new Error("looked up by E164"), {
          number: failedConversationByE164.e164
        }),
        Object.assign(new Error("ignored error"), {
          identifier: ignoredUuid()
        }),
        new Error("a different error")
      ],
      sent_to: [
        sentConversation.e164,
        conversationNotInRecipientsList.uuid,
        ignoredUuid(),
        ourConversation.uuid
      ],
      delivered_to: [
        deliveredConversation.uuid,
        ignoredUuid(),
        ourConversation.uuid
      ],
      read_by: [readConversation.uuid, ignoredUuid()]
    };
    const getConversation = createGetConversation(failedConversationByUuid, failedConversationByE164, pendingConversation, sentConversation, deliveredConversation, readConversation, conversationNotInRecipientsList, ourConversation);
    import_chai.assert.deepEqual((0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(message, getConversation, ourConversation.id), {
      [ourConversation.id]: {
        status: import_MessageSendState.SendStatus.Delivered,
        updatedAt: void 0
      },
      [failedConversationByUuid.id]: {
        status: import_MessageSendState.SendStatus.Failed,
        updatedAt: void 0
      },
      [failedConversationByE164.id]: {
        status: import_MessageSendState.SendStatus.Failed,
        updatedAt: void 0
      },
      [pendingConversation.id]: {
        status: import_MessageSendState.SendStatus.Pending,
        updatedAt: message.sent_at
      },
      [sentConversation.id]: {
        status: import_MessageSendState.SendStatus.Sent,
        updatedAt: void 0
      },
      [conversationNotInRecipientsList.id]: {
        status: import_MessageSendState.SendStatus.Sent,
        updatedAt: void 0
      },
      [deliveredConversation.id]: {
        status: import_MessageSendState.SendStatus.Delivered,
        updatedAt: void 0
      },
      [readConversation.id]: {
        status: import_MessageSendState.SendStatus.Read,
        updatedAt: void 0
      }
    });
  });
  it('considers our own conversation sent if the "sent" attribute is set', () => {
    const ourConversation = (0, import_getDefaultConversation.getDefaultConversation)();
    const conversation1 = (0, import_getDefaultConversation.getDefaultConversation)();
    const conversation2 = (0, import_getDefaultConversation.getDefaultConversation)();
    const message = {
      ...defaultMessage,
      recipients: [conversation1.id, conversation2.id],
      sent: true
    };
    const getConversation = createGetConversation(ourConversation, conversation1, conversation2);
    import_chai.assert.deepEqual((0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(message, getConversation, ourConversation.id)?.[ourConversation.id], {
      status: import_MessageSendState.SendStatus.Sent,
      updatedAt: void 0
    });
  });
  it("considers our own conversation failed if the message isn't marked sent and we aren't elsewhere in the recipients list", () => {
    const ourConversation = (0, import_getDefaultConversation.getDefaultConversation)();
    const conversation1 = (0, import_getDefaultConversation.getDefaultConversation)();
    const conversation2 = (0, import_getDefaultConversation.getDefaultConversation)();
    const message = {
      ...defaultMessage,
      recipients: [conversation1.id, conversation2.id],
      sent: false
    };
    const getConversation = createGetConversation(ourConversation, conversation1, conversation2);
    import_chai.assert.deepEqual((0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(message, getConversation, ourConversation.id)?.[ourConversation.id], {
      status: import_MessageSendState.SendStatus.Failed,
      updatedAt: void 0
    });
  });
  it("migrates a typical legacy note to self message", () => {
    const ourConversation = (0, import_getDefaultConversation.getDefaultConversation)();
    const message = {
      ...defaultMessage,
      conversationId: ourConversation.id,
      recipients: [],
      destination: ourConversation.uuid,
      sent_to: [ourConversation.uuid],
      sent: true,
      synced: true,
      unidentifiedDeliveries: [],
      delivered_to: [ourConversation.id],
      read_by: [ourConversation.id]
    };
    const getConversation = createGetConversation(ourConversation);
    import_chai.assert.deepEqual((0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(message, getConversation, ourConversation.id), {
      [ourConversation.id]: {
        status: import_MessageSendState.SendStatus.Read,
        updatedAt: void 0
      }
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWlncmF0ZUxlZ2FjeVNlbmRBdHRyaWJ1dGVzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgU2VuZFN0YXR1cyB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VTZW5kU3RhdGUnO1xuXG5pbXBvcnQgeyBtaWdyYXRlTGVnYWN5U2VuZEF0dHJpYnV0ZXMgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9taWdyYXRlTGVnYWN5U2VuZEF0dHJpYnV0ZXMnO1xuXG5kZXNjcmliZSgnbWlncmF0ZUxlZ2FjeVNlbmRBdHRyaWJ1dGVzJywgKCkgPT4ge1xuICBjb25zdCBkZWZhdWx0TWVzc2FnZSA9IHtcbiAgICB0eXBlOiAnb3V0Z29pbmcnIGFzIGNvbnN0LFxuICAgIHNlbnRfYXQ6IDEyMyxcbiAgICBzZW50OiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUdldENvbnZlcnNhdGlvbiA9IChcbiAgICAuLi5jb252ZXJzYXRpb25zOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvblR5cGU+XG4gICkgPT4ge1xuICAgIGNvbnN0IGxvb2t1cCA9IG5ldyBNYXA8c3RyaW5nLCBDb252ZXJzYXRpb25UeXBlPigpO1xuICAgIGNvbnZlcnNhdGlvbnMuZm9yRWFjaChjb252ZXJzYXRpb24gPT4ge1xuICAgICAgW2NvbnZlcnNhdGlvbi5pZCwgY29udmVyc2F0aW9uLnV1aWQsIGNvbnZlcnNhdGlvbi5lMTY0XS5mb3JFYWNoKFxuICAgICAgICBwcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBsb29rdXAuc2V0KHByb3BlcnR5LCBjb252ZXJzYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoaWQ/OiBzdHJpbmcgfCBudWxsKSA9PiAoaWQgPyBsb29rdXAuZ2V0KGlkKSA6IHVuZGVmaW5lZCk7XG4gIH07XG5cbiAgaXQoXCJkb2Vzbid0IG1pZ3JhdGUgbWVzc2FnZXMgdGhhdCBhbHJlYWR5IGhhdmUgdGhlIG1vZGVybiBzZW5kIHN0YXRlXCIsICgpID0+IHtcbiAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9IHV1aWQoKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IDEyMyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBnZXRDb252ZXJzYXRpb24gPSAoKSA9PiB1bmRlZmluZWQ7XG5cbiAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICBtaWdyYXRlTGVnYWN5U2VuZEF0dHJpYnV0ZXMobWVzc2FnZSwgZ2V0Q29udmVyc2F0aW9uLCBvdXJDb252ZXJzYXRpb25JZClcbiAgICApO1xuICB9KTtcblxuICBpdChcImRvZXNuJ3QgbWlncmF0ZSBtZXNzYWdlcyB0aGF0IGFyZW4ndCBvdXRnb2luZ1wiLCAoKSA9PiB7XG4gICAgY29uc3Qgb3VyQ29udmVyc2F0aW9uSWQgPSB1dWlkKCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgdHlwZTogJ2luY29taW5nJyBhcyBjb25zdCxcbiAgICB9O1xuICAgIGNvbnN0IGdldENvbnZlcnNhdGlvbiA9ICgpID0+IHVuZGVmaW5lZDtcblxuICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgIG1pZ3JhdGVMZWdhY3lTZW5kQXR0cmlidXRlcyhtZXNzYWdlLCBnZXRDb252ZXJzYXRpb24sIG91ckNvbnZlcnNhdGlvbklkKVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdhZHZhbmNlcyB0aGUgc2VuZCBzdGF0ZSBtYWNoaW5lLCBzdGFydGluZyBmcm9tIFwicGVuZGluZ1wiLCBmb3IgZGlmZmVyZW50IHN0YXRlIHR5cGVzJywgKCkgPT4ge1xuICAgIGxldCBlMTY0Q291bnRlciA9IDA7XG4gICAgY29uc3QgZ2V0VGVzdENvbnZlcnNhdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3Q0RGlnaXRzID0gZTE2NENvdW50ZXIudG9TdHJpbmcoKS5wYWRTdGFydCg0KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbGFzdDREaWdpdHMubGVuZ3RoLFxuICAgICAgICA0LFxuICAgICAgICAnVGVzdCBzZXR1cCBmYWlsdXJlOiBFMTY0IGlzIHRvbyBsb25nJ1xuICAgICAgKTtcbiAgICAgIGUxNjRDb3VudGVyICs9IDE7XG4gICAgICByZXR1cm4gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7IGUxNjQ6IGArMTk5OTU1NSR7bGFzdDREaWdpdHN9YCB9KTtcbiAgICB9O1xuXG4gICAgLy8gVGhpcyBpcyBhbGlhc2VkIGZvciBjbGFyaXR5LlxuICAgIGNvbnN0IGlnbm9yZWRVdWlkID0gdXVpZDtcblxuICAgIGNvbnN0IGZhaWxlZENvbnZlcnNhdGlvbkJ5VXVpZCA9IGdldFRlc3RDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBmYWlsZWRDb252ZXJzYXRpb25CeUUxNjQgPSBnZXRUZXN0Q29udmVyc2F0aW9uKCk7XG4gICAgY29uc3QgcGVuZGluZ0NvbnZlcnNhdGlvbiA9IGdldFRlc3RDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBzZW50Q29udmVyc2F0aW9uID0gZ2V0VGVzdENvbnZlcnNhdGlvbigpO1xuICAgIGNvbnN0IGRlbGl2ZXJlZENvbnZlcnNhdGlvbiA9IGdldFRlc3RDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCByZWFkQ29udmVyc2F0aW9uID0gZ2V0VGVzdENvbnZlcnNhdGlvbigpO1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbk5vdEluUmVjaXBpZW50c0xpc3QgPSBnZXRUZXN0Q29udmVyc2F0aW9uKCk7XG4gICAgY29uc3Qgb3VyQ29udmVyc2F0aW9uID0gZ2V0VGVzdENvbnZlcnNhdGlvbigpO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgcmVjaXBpZW50czogW1xuICAgICAgICBmYWlsZWRDb252ZXJzYXRpb25CeVV1aWQudXVpZCxcbiAgICAgICAgZmFpbGVkQ29udmVyc2F0aW9uQnlFMTY0LnV1aWQsXG4gICAgICAgIHBlbmRpbmdDb252ZXJzYXRpb24udXVpZCxcbiAgICAgICAgc2VudENvbnZlcnNhdGlvbi51dWlkLFxuICAgICAgICBkZWxpdmVyZWRDb252ZXJzYXRpb24udXVpZCxcbiAgICAgICAgcmVhZENvbnZlcnNhdGlvbi51dWlkLFxuICAgICAgICBpZ25vcmVkVXVpZCgpLFxuICAgICAgICBvdXJDb252ZXJzYXRpb24udXVpZCxcbiAgICAgIF0sXG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ2xvb2tlZCB1cCBieSBVVUlEJyksIHtcbiAgICAgICAgICBpZGVudGlmaWVyOiBmYWlsZWRDb252ZXJzYXRpb25CeVV1aWQudXVpZCxcbiAgICAgICAgfSksXG4gICAgICAgIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdsb29rZWQgdXAgYnkgRTE2NCcpLCB7XG4gICAgICAgICAgbnVtYmVyOiBmYWlsZWRDb252ZXJzYXRpb25CeUUxNjQuZTE2NCxcbiAgICAgICAgfSksXG4gICAgICAgIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdpZ25vcmVkIGVycm9yJyksIHtcbiAgICAgICAgICBpZGVudGlmaWVyOiBpZ25vcmVkVXVpZCgpLFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IEVycm9yKCdhIGRpZmZlcmVudCBlcnJvcicpLFxuICAgICAgXSxcbiAgICAgIHNlbnRfdG86IFtcbiAgICAgICAgc2VudENvbnZlcnNhdGlvbi5lMTY0LFxuICAgICAgICBjb252ZXJzYXRpb25Ob3RJblJlY2lwaWVudHNMaXN0LnV1aWQsXG4gICAgICAgIGlnbm9yZWRVdWlkKCksXG4gICAgICAgIG91ckNvbnZlcnNhdGlvbi51dWlkLFxuICAgICAgXSxcbiAgICAgIGRlbGl2ZXJlZF90bzogW1xuICAgICAgICBkZWxpdmVyZWRDb252ZXJzYXRpb24udXVpZCxcbiAgICAgICAgaWdub3JlZFV1aWQoKSxcbiAgICAgICAgb3VyQ29udmVyc2F0aW9uLnV1aWQsXG4gICAgICBdLFxuICAgICAgcmVhZF9ieTogW3JlYWRDb252ZXJzYXRpb24udXVpZCwgaWdub3JlZFV1aWQoKV0sXG4gICAgfTtcbiAgICBjb25zdCBnZXRDb252ZXJzYXRpb24gPSBjcmVhdGVHZXRDb252ZXJzYXRpb24oXG4gICAgICBmYWlsZWRDb252ZXJzYXRpb25CeVV1aWQsXG4gICAgICBmYWlsZWRDb252ZXJzYXRpb25CeUUxNjQsXG4gICAgICBwZW5kaW5nQ29udmVyc2F0aW9uLFxuICAgICAgc2VudENvbnZlcnNhdGlvbixcbiAgICAgIGRlbGl2ZXJlZENvbnZlcnNhdGlvbixcbiAgICAgIHJlYWRDb252ZXJzYXRpb24sXG4gICAgICBjb252ZXJzYXRpb25Ob3RJblJlY2lwaWVudHNMaXN0LFxuICAgICAgb3VyQ29udmVyc2F0aW9uXG4gICAgKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICBtaWdyYXRlTGVnYWN5U2VuZEF0dHJpYnV0ZXMobWVzc2FnZSwgZ2V0Q29udmVyc2F0aW9uLCBvdXJDb252ZXJzYXRpb24uaWQpLFxuICAgICAge1xuICAgICAgICBbb3VyQ29udmVyc2F0aW9uLmlkXToge1xuICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgdXBkYXRlZEF0OiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIFtmYWlsZWRDb252ZXJzYXRpb25CeVV1aWQuaWRdOiB7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgICAgW2ZhaWxlZENvbnZlcnNhdGlvbkJ5RTE2NC5pZF06IHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuRmFpbGVkLFxuICAgICAgICAgIHVwZGF0ZWRBdDogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgICBbcGVuZGluZ0NvbnZlcnNhdGlvbi5pZF06IHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICB1cGRhdGVkQXQ6IG1lc3NhZ2Uuc2VudF9hdCxcbiAgICAgICAgfSxcbiAgICAgICAgW3NlbnRDb252ZXJzYXRpb24uaWRdOiB7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgdXBkYXRlZEF0OiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIFtjb252ZXJzYXRpb25Ob3RJblJlY2lwaWVudHNMaXN0LmlkXToge1xuICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgIHVwZGF0ZWRBdDogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgICBbZGVsaXZlcmVkQ29udmVyc2F0aW9uLmlkXToge1xuICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgdXBkYXRlZEF0OiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIFtyZWFkQ29udmVyc2F0aW9uLmlkXToge1xuICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5SZWFkLFxuICAgICAgICAgIHVwZGF0ZWRBdDogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdjb25zaWRlcnMgb3VyIG93biBjb252ZXJzYXRpb24gc2VudCBpZiB0aGUgXCJzZW50XCIgYXR0cmlidXRlIGlzIHNldCcsICgpID0+IHtcbiAgICBjb25zdCBvdXJDb252ZXJzYXRpb24gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uMSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24yID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgcmVjaXBpZW50czogW2NvbnZlcnNhdGlvbjEuaWQsIGNvbnZlcnNhdGlvbjIuaWRdLFxuICAgICAgc2VudDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGdldENvbnZlcnNhdGlvbiA9IGNyZWF0ZUdldENvbnZlcnNhdGlvbihcbiAgICAgIG91ckNvbnZlcnNhdGlvbixcbiAgICAgIGNvbnZlcnNhdGlvbjEsXG4gICAgICBjb252ZXJzYXRpb24yXG4gICAgKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICBtaWdyYXRlTGVnYWN5U2VuZEF0dHJpYnV0ZXMoXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGdldENvbnZlcnNhdGlvbixcbiAgICAgICAgb3VyQ29udmVyc2F0aW9uLmlkXG4gICAgICApPy5bb3VyQ29udmVyc2F0aW9uLmlkXSxcbiAgICAgIHtcbiAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgIHVwZGF0ZWRBdDogdW5kZWZpbmVkLFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KFwiY29uc2lkZXJzIG91ciBvd24gY29udmVyc2F0aW9uIGZhaWxlZCBpZiB0aGUgbWVzc2FnZSBpc24ndCBtYXJrZWQgc2VudCBhbmQgd2UgYXJlbid0IGVsc2V3aGVyZSBpbiB0aGUgcmVjaXBpZW50cyBsaXN0XCIsICgpID0+IHtcbiAgICBjb25zdCBvdXJDb252ZXJzYXRpb24gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uMSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24yID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgcmVjaXBpZW50czogW2NvbnZlcnNhdGlvbjEuaWQsIGNvbnZlcnNhdGlvbjIuaWRdLFxuICAgICAgc2VudDogZmFsc2UsXG4gICAgfTtcbiAgICBjb25zdCBnZXRDb252ZXJzYXRpb24gPSBjcmVhdGVHZXRDb252ZXJzYXRpb24oXG4gICAgICBvdXJDb252ZXJzYXRpb24sXG4gICAgICBjb252ZXJzYXRpb24xLFxuICAgICAgY29udmVyc2F0aW9uMlxuICAgICk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgbWlncmF0ZUxlZ2FjeVNlbmRBdHRyaWJ1dGVzKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBnZXRDb252ZXJzYXRpb24sXG4gICAgICAgIG91ckNvbnZlcnNhdGlvbi5pZFxuICAgICAgKT8uW291ckNvbnZlcnNhdGlvbi5pZF0sXG4gICAgICB7XG4gICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5GYWlsZWQsXG4gICAgICAgIHVwZGF0ZWRBdDogdW5kZWZpbmVkLFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdtaWdyYXRlcyBhIHR5cGljYWwgbGVnYWN5IG5vdGUgdG8gc2VsZiBtZXNzYWdlJywgKCkgPT4ge1xuICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICBjb252ZXJzYXRpb25JZDogb3VyQ29udmVyc2F0aW9uLmlkLFxuICAgICAgcmVjaXBpZW50czogW10sXG4gICAgICBkZXN0aW5hdGlvbjogb3VyQ29udmVyc2F0aW9uLnV1aWQsXG4gICAgICBzZW50X3RvOiBbb3VyQ29udmVyc2F0aW9uLnV1aWRdLFxuICAgICAgc2VudDogdHJ1ZSxcbiAgICAgIHN5bmNlZDogdHJ1ZSxcbiAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJpZXM6IFtdLFxuICAgICAgZGVsaXZlcmVkX3RvOiBbb3VyQ29udmVyc2F0aW9uLmlkXSxcbiAgICAgIHJlYWRfYnk6IFtvdXJDb252ZXJzYXRpb24uaWRdLFxuICAgIH07XG4gICAgY29uc3QgZ2V0Q29udmVyc2F0aW9uID0gY3JlYXRlR2V0Q29udmVyc2F0aW9uKG91ckNvbnZlcnNhdGlvbik7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgbWlncmF0ZUxlZ2FjeVNlbmRBdHRyaWJ1dGVzKG1lc3NhZ2UsIGdldENvbnZlcnNhdGlvbiwgb3VyQ29udmVyc2F0aW9uLmlkKSxcbiAgICAgIHtcbiAgICAgICAgW291ckNvbnZlcnNhdGlvbi5pZF06IHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUmVhZCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFDdkIsa0JBQTJCO0FBQzNCLG9DQUF1QztBQUV2Qyw4QkFBMkI7QUFFM0IseUNBQTRDO0FBRTVDLFNBQVMsK0JBQStCLE1BQU07QUFDNUMsUUFBTSxpQkFBaUI7QUFBQSxJQUNyQixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsRUFDUjtBQUVBLFFBQU0sd0JBQXdCLDJCQUN6QixrQkFDQTtBQUNILFVBQU0sU0FBUyxvQkFBSSxJQUE4QjtBQUNqRCxrQkFBYyxRQUFRLGtCQUFnQjtBQUNwQyxPQUFDLGFBQWEsSUFBSSxhQUFhLE1BQU0sYUFBYSxJQUFJLEVBQUUsUUFDdEQsY0FBWTtBQUNWLFlBQUksVUFBVTtBQUNaLGlCQUFPLElBQUksVUFBVSxZQUFZO0FBQUEsUUFDbkM7QUFBQSxNQUNGLENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPLENBQUMsT0FBd0IsS0FBSyxPQUFPLElBQUksRUFBRSxJQUFJO0FBQUEsRUFDeEQsR0FmOEI7QUFpQjlCLEtBQUcsb0VBQW9FLE1BQU07QUFDM0UsVUFBTSxvQkFBb0Isb0JBQUs7QUFDL0IsVUFBTSxVQUFVO0FBQUEsU0FDWDtBQUFBLE1BQ0gsMkJBQTJCO0FBQUEsU0FDeEIsb0JBQW9CO0FBQUEsVUFDbkIsUUFBUSxtQ0FBVztBQUFBLFVBQ25CLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxVQUFNLGtCQUFrQiw2QkFBTSxRQUFOO0FBRXhCLHVCQUFPLFlBQ0wsb0VBQTRCLFNBQVMsaUJBQWlCLGlCQUFpQixDQUN6RTtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsaURBQWlELE1BQU07QUFDeEQsVUFBTSxvQkFBb0Isb0JBQUs7QUFDL0IsVUFBTSxVQUFVO0FBQUEsU0FDWDtBQUFBLE1BQ0gsTUFBTTtBQUFBLElBQ1I7QUFDQSxVQUFNLGtCQUFrQiw2QkFBTSxRQUFOO0FBRXhCLHVCQUFPLFlBQ0wsb0VBQTRCLFNBQVMsaUJBQWlCLGlCQUFpQixDQUN6RTtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsdUZBQXVGLE1BQU07QUFDOUYsUUFBSSxjQUFjO0FBQ2xCLFVBQU0sc0JBQXNCLDZCQUFNO0FBQ2hDLFlBQU0sY0FBYyxZQUFZLFNBQVMsRUFBRSxTQUFTLENBQUM7QUFDckQseUJBQU8sWUFDTCxZQUFZLFFBQ1osR0FDQSxzQ0FDRjtBQUNBLHFCQUFlO0FBQ2YsYUFBTywwREFBdUIsRUFBRSxNQUFNLFdBQVcsY0FBYyxDQUFDO0FBQUEsSUFDbEUsR0FUNEI7QUFZNUIsVUFBTSxjQUFjO0FBRXBCLFVBQU0sMkJBQTJCLG9CQUFvQjtBQUNyRCxVQUFNLDJCQUEyQixvQkFBb0I7QUFDckQsVUFBTSxzQkFBc0Isb0JBQW9CO0FBQ2hELFVBQU0sbUJBQW1CLG9CQUFvQjtBQUM3QyxVQUFNLHdCQUF3QixvQkFBb0I7QUFDbEQsVUFBTSxtQkFBbUIsb0JBQW9CO0FBQzdDLFVBQU0sa0NBQWtDLG9CQUFvQjtBQUM1RCxVQUFNLGtCQUFrQixvQkFBb0I7QUFFNUMsVUFBTSxVQUFVO0FBQUEsU0FDWDtBQUFBLE1BQ0gsWUFBWTtBQUFBLFFBQ1YseUJBQXlCO0FBQUEsUUFDekIseUJBQXlCO0FBQUEsUUFDekIsb0JBQW9CO0FBQUEsUUFDcEIsaUJBQWlCO0FBQUEsUUFDakIsc0JBQXNCO0FBQUEsUUFDdEIsaUJBQWlCO0FBQUEsUUFDakIsWUFBWTtBQUFBLFFBQ1osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLE9BQU8sT0FBTyxJQUFJLE1BQU0sbUJBQW1CLEdBQUc7QUFBQSxVQUM1QyxZQUFZLHlCQUF5QjtBQUFBLFFBQ3ZDLENBQUM7QUFBQSxRQUNELE9BQU8sT0FBTyxJQUFJLE1BQU0sbUJBQW1CLEdBQUc7QUFBQSxVQUM1QyxRQUFRLHlCQUF5QjtBQUFBLFFBQ25DLENBQUM7QUFBQSxRQUNELE9BQU8sT0FBTyxJQUFJLE1BQU0sZUFBZSxHQUFHO0FBQUEsVUFDeEMsWUFBWSxZQUFZO0FBQUEsUUFDMUIsQ0FBQztBQUFBLFFBQ0QsSUFBSSxNQUFNLG1CQUFtQjtBQUFBLE1BQy9CO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxRQUNqQixnQ0FBZ0M7QUFBQSxRQUNoQyxZQUFZO0FBQUEsUUFDWixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsY0FBYztBQUFBLFFBQ1osc0JBQXNCO0FBQUEsUUFDdEIsWUFBWTtBQUFBLFFBQ1osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFNBQVMsQ0FBQyxpQkFBaUIsTUFBTSxZQUFZLENBQUM7QUFBQSxJQUNoRDtBQUNBLFVBQU0sa0JBQWtCLHNCQUN0QiwwQkFDQSwwQkFDQSxxQkFDQSxrQkFDQSx1QkFDQSxrQkFDQSxpQ0FDQSxlQUNGO0FBRUEsdUJBQU8sVUFDTCxvRUFBNEIsU0FBUyxpQkFBaUIsZ0JBQWdCLEVBQUUsR0FDeEU7QUFBQSxPQUNHLGdCQUFnQixLQUFLO0FBQUEsUUFDcEIsUUFBUSxtQ0FBVztBQUFBLFFBQ25CLFdBQVc7QUFBQSxNQUNiO0FBQUEsT0FDQyx5QkFBeUIsS0FBSztBQUFBLFFBQzdCLFFBQVEsbUNBQVc7QUFBQSxRQUNuQixXQUFXO0FBQUEsTUFDYjtBQUFBLE9BQ0MseUJBQXlCLEtBQUs7QUFBQSxRQUM3QixRQUFRLG1DQUFXO0FBQUEsUUFDbkIsV0FBVztBQUFBLE1BQ2I7QUFBQSxPQUNDLG9CQUFvQixLQUFLO0FBQUEsUUFDeEIsUUFBUSxtQ0FBVztBQUFBLFFBQ25CLFdBQVcsUUFBUTtBQUFBLE1BQ3JCO0FBQUEsT0FDQyxpQkFBaUIsS0FBSztBQUFBLFFBQ3JCLFFBQVEsbUNBQVc7QUFBQSxRQUNuQixXQUFXO0FBQUEsTUFDYjtBQUFBLE9BQ0MsZ0NBQWdDLEtBQUs7QUFBQSxRQUNwQyxRQUFRLG1DQUFXO0FBQUEsUUFDbkIsV0FBVztBQUFBLE1BQ2I7QUFBQSxPQUNDLHNCQUFzQixLQUFLO0FBQUEsUUFDMUIsUUFBUSxtQ0FBVztBQUFBLFFBQ25CLFdBQVc7QUFBQSxNQUNiO0FBQUEsT0FDQyxpQkFBaUIsS0FBSztBQUFBLFFBQ3JCLFFBQVEsbUNBQVc7QUFBQSxRQUNuQixXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0YsQ0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsc0VBQXNFLE1BQU07QUFDN0UsVUFBTSxrQkFBa0IsMERBQXVCO0FBQy9DLFVBQU0sZ0JBQWdCLDBEQUF1QjtBQUM3QyxVQUFNLGdCQUFnQiwwREFBdUI7QUFFN0MsVUFBTSxVQUFVO0FBQUEsU0FDWDtBQUFBLE1BQ0gsWUFBWSxDQUFDLGNBQWMsSUFBSSxjQUFjLEVBQUU7QUFBQSxNQUMvQyxNQUFNO0FBQUEsSUFDUjtBQUNBLFVBQU0sa0JBQWtCLHNCQUN0QixpQkFDQSxlQUNBLGFBQ0Y7QUFFQSx1QkFBTyxVQUNMLG9FQUNFLFNBQ0EsaUJBQ0EsZ0JBQWdCLEVBQ2xCLElBQUksZ0JBQWdCLEtBQ3BCO0FBQUEsTUFDRSxRQUFRLG1DQUFXO0FBQUEsTUFDbkIsV0FBVztBQUFBLElBQ2IsQ0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcseUhBQXlILE1BQU07QUFDaEksVUFBTSxrQkFBa0IsMERBQXVCO0FBQy9DLFVBQU0sZ0JBQWdCLDBEQUF1QjtBQUM3QyxVQUFNLGdCQUFnQiwwREFBdUI7QUFFN0MsVUFBTSxVQUFVO0FBQUEsU0FDWDtBQUFBLE1BQ0gsWUFBWSxDQUFDLGNBQWMsSUFBSSxjQUFjLEVBQUU7QUFBQSxNQUMvQyxNQUFNO0FBQUEsSUFDUjtBQUNBLFVBQU0sa0JBQWtCLHNCQUN0QixpQkFDQSxlQUNBLGFBQ0Y7QUFFQSx1QkFBTyxVQUNMLG9FQUNFLFNBQ0EsaUJBQ0EsZ0JBQWdCLEVBQ2xCLElBQUksZ0JBQWdCLEtBQ3BCO0FBQUEsTUFDRSxRQUFRLG1DQUFXO0FBQUEsTUFDbkIsV0FBVztBQUFBLElBQ2IsQ0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsa0RBQWtELE1BQU07QUFDekQsVUFBTSxrQkFBa0IsMERBQXVCO0FBQy9DLFVBQU0sVUFBVTtBQUFBLFNBQ1g7QUFBQSxNQUNILGdCQUFnQixnQkFBZ0I7QUFBQSxNQUNoQyxZQUFZLENBQUM7QUFBQSxNQUNiLGFBQWEsZ0JBQWdCO0FBQUEsTUFDN0IsU0FBUyxDQUFDLGdCQUFnQixJQUFJO0FBQUEsTUFDOUIsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1Isd0JBQXdCLENBQUM7QUFBQSxNQUN6QixjQUFjLENBQUMsZ0JBQWdCLEVBQUU7QUFBQSxNQUNqQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUU7QUFBQSxJQUM5QjtBQUNBLFVBQU0sa0JBQWtCLHNCQUFzQixlQUFlO0FBRTdELHVCQUFPLFVBQ0wsb0VBQTRCLFNBQVMsaUJBQWlCLGdCQUFnQixFQUFFLEdBQ3hFO0FBQUEsT0FDRyxnQkFBZ0IsS0FBSztBQUFBLFFBQ3BCLFFBQVEsbUNBQVc7QUFBQSxRQUNuQixXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0YsQ0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
