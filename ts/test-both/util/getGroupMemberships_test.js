var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_UUID = require("../../types/UUID");
var import_getDefaultConversation = require("../helpers/getDefaultConversation");
var import_getGroupMemberships = require("../../util/getGroupMemberships");
describe("getGroupMemberships", () => {
  const normalConversation1 = (0, import_getDefaultConversation.getDefaultConversationWithUuid)();
  const normalConversation2 = (0, import_getDefaultConversation.getDefaultConversationWithUuid)();
  const unregisteredConversation = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
    discoveredUnregisteredAt: Date.now()
  });
  function getConversationByUuid(uuid) {
    return [
      normalConversation1,
      normalConversation2,
      unregisteredConversation
    ].find((conversation) => conversation.uuid === uuid);
  }
  describe("memberships", () => {
    it("returns an empty array if passed undefined", () => {
      const conversation = {};
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).memberships;
      import_chai.assert.isEmpty(result);
    });
    it("returns an empty array if passed an empty array", () => {
      const conversation = { memberships: [] };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).memberships;
      import_chai.assert.isEmpty(result);
    });
    it("filters out conversation IDs that don't exist", () => {
      const conversation = {
        memberships: [
          {
            uuid: import_UUID.UUID.generate().toString(),
            isAdmin: true
          }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).memberships;
      import_chai.assert.isEmpty(result);
    });
    it("does not filter out unregistered conversations", () => {
      const conversation = {
        memberships: [
          {
            uuid: unregisteredConversation.uuid,
            isAdmin: true
          }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).memberships;
      import_chai.assert.lengthOf(result, 1);
      import_chai.assert.deepEqual(result[0], {
        isAdmin: true,
        member: unregisteredConversation
      });
    });
    it("hydrates memberships", () => {
      const conversation = {
        memberships: [
          {
            uuid: normalConversation2.uuid,
            isAdmin: false
          },
          {
            uuid: normalConversation1.uuid,
            isAdmin: true
          }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).memberships;
      import_chai.assert.lengthOf(result, 2);
      import_chai.assert.deepEqual(result[0], {
        isAdmin: false,
        member: normalConversation2
      });
      import_chai.assert.deepEqual(result[1], {
        isAdmin: true,
        member: normalConversation1
      });
    });
  });
  describe("pendingApprovalMemberships", () => {
    it("returns an empty array if passed undefined", () => {
      const conversation = {};
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingApprovalMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("returns an empty array if passed an empty array", () => {
      const conversation = { pendingApprovalMemberships: [] };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingApprovalMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("filters out conversation IDs that don't exist", () => {
      const conversation = {
        pendingApprovalMemberships: [{ uuid: import_UUID.UUID.generate().toString() }]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingApprovalMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("filters out unregistered conversations", () => {
      const conversation = {
        pendingApprovalMemberships: [{ uuid: unregisteredConversation.uuid }]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingApprovalMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("hydrates pending-approval memberships", () => {
      const conversation = {
        pendingApprovalMemberships: [
          { uuid: normalConversation2.uuid },
          { uuid: normalConversation1.uuid }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingApprovalMemberships;
      import_chai.assert.lengthOf(result, 2);
      import_chai.assert.deepEqual(result[0], { member: normalConversation2 });
      import_chai.assert.deepEqual(result[1], { member: normalConversation1 });
    });
  });
  describe("pendingMemberships", () => {
    it("returns an empty array if passed undefined", () => {
      const conversation = {};
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("returns an empty array if passed an empty array", () => {
      const conversation = { pendingMemberships: [] };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("filters out conversation IDs that don't exist", () => {
      const conversation = {
        pendingMemberships: [
          {
            uuid: import_UUID.UUID.generate().toString(),
            addedByUserId: normalConversation1.uuid
          }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("filters out unregistered conversations", () => {
      const conversation = {
        pendingMemberships: [
          {
            uuid: unregisteredConversation.uuid,
            addedByUserId: normalConversation1.uuid
          }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingMemberships;
      import_chai.assert.isEmpty(result);
    });
    it("hydrates pending memberships", () => {
      const abc = import_UUID.UUID.generate().toString();
      const xyz = import_UUID.UUID.generate().toString();
      const conversation = {
        pendingMemberships: [
          { uuid: normalConversation2.uuid, addedByUserId: abc },
          { uuid: normalConversation1.uuid, addedByUserId: xyz }
        ]
      };
      const result = (0, import_getGroupMemberships.getGroupMemberships)(conversation, getConversationByUuid).pendingMemberships;
      import_chai.assert.lengthOf(result, 2);
      import_chai.assert.deepEqual(result[0], {
        member: normalConversation2,
        metadata: { addedByUserId: abc }
      });
      import_chai.assert.deepEqual(result[1], {
        member: normalConversation1,
        metadata: { addedByUserId: xyz }
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0R3JvdXBNZW1iZXJzaGlwc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQgfSBmcm9tICcuLi9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5pbXBvcnQgeyBnZXRHcm91cE1lbWJlcnNoaXBzIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRHcm91cE1lbWJlcnNoaXBzJztcblxuZGVzY3JpYmUoJ2dldEdyb3VwTWVtYmVyc2hpcHMnLCAoKSA9PiB7XG4gIGNvbnN0IG5vcm1hbENvbnZlcnNhdGlvbjEgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoKTtcbiAgY29uc3Qgbm9ybWFsQ29udmVyc2F0aW9uMiA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCgpO1xuICBjb25zdCB1bnJlZ2lzdGVyZWRDb252ZXJzYXRpb24gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICAgIGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdDogRGF0ZS5ub3coKSxcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0Q29udmVyc2F0aW9uQnlVdWlkKFxuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlXG4gICk6IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvblR5cGUge1xuICAgIHJldHVybiBbXG4gICAgICBub3JtYWxDb252ZXJzYXRpb24xLFxuICAgICAgbm9ybWFsQ29udmVyc2F0aW9uMixcbiAgICAgIHVucmVnaXN0ZXJlZENvbnZlcnNhdGlvbixcbiAgICBdLmZpbmQoY29udmVyc2F0aW9uID0+IGNvbnZlcnNhdGlvbi51dWlkID09PSB1dWlkKTtcbiAgfVxuXG4gIGRlc2NyaWJlKCdtZW1iZXJzaGlwcycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBwYXNzZWQgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0ge307XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEdyb3VwTWVtYmVyc2hpcHMoXG4gICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgZ2V0Q29udmVyc2F0aW9uQnlVdWlkXG4gICAgICApLm1lbWJlcnNoaXBzO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgcGFzc2VkIGFuIGVtcHR5IGFycmF5JywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0geyBtZW1iZXJzaGlwczogW10gfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBNZW1iZXJzaGlwcyhcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBnZXRDb252ZXJzYXRpb25CeVV1aWRcbiAgICAgICkubWVtYmVyc2hpcHM7XG5cbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICBpdChcImZpbHRlcnMgb3V0IGNvbnZlcnNhdGlvbiBJRHMgdGhhdCBkb24ndCBleGlzdFwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB7XG4gICAgICAgIG1lbWJlcnNoaXBzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXVpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBpc0FkbWluOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRHcm91cE1lbWJlcnNoaXBzKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGdldENvbnZlcnNhdGlvbkJ5VXVpZFxuICAgICAgKS5tZW1iZXJzaGlwcztcblxuICAgICAgYXNzZXJ0LmlzRW1wdHkocmVzdWx0KTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBmaWx0ZXIgb3V0IHVucmVnaXN0ZXJlZCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0ge1xuICAgICAgICBtZW1iZXJzaGlwczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHV1aWQ6IHVucmVnaXN0ZXJlZENvbnZlcnNhdGlvbi51dWlkLFxuICAgICAgICAgICAgaXNBZG1pbjogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBNZW1iZXJzaGlwcyhcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBnZXRDb252ZXJzYXRpb25CeVV1aWRcbiAgICAgICkubWVtYmVyc2hpcHM7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihyZXN1bHQsIDEpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRbMF0sIHtcbiAgICAgICAgaXNBZG1pbjogdHJ1ZSxcbiAgICAgICAgbWVtYmVyOiB1bnJlZ2lzdGVyZWRDb252ZXJzYXRpb24sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdoeWRyYXRlcyBtZW1iZXJzaGlwcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHtcbiAgICAgICAgbWVtYmVyc2hpcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBub3JtYWxDb252ZXJzYXRpb24yLnV1aWQsXG4gICAgICAgICAgICBpc0FkbWluOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHV1aWQ6IG5vcm1hbENvbnZlcnNhdGlvbjEudXVpZCxcbiAgICAgICAgICAgIGlzQWRtaW46IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEdyb3VwTWVtYmVyc2hpcHMoXG4gICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgZ2V0Q29udmVyc2F0aW9uQnlVdWlkXG4gICAgICApLm1lbWJlcnNoaXBzO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YocmVzdWx0LCAyKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0WzBdLCB7XG4gICAgICAgIGlzQWRtaW46IGZhbHNlLFxuICAgICAgICBtZW1iZXI6IG5vcm1hbENvbnZlcnNhdGlvbjIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0WzFdLCB7XG4gICAgICAgIGlzQWRtaW46IHRydWUsXG4gICAgICAgIG1lbWJlcjogbm9ybWFsQ29udmVyc2F0aW9uMSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHMnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgcGFzc2VkIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHt9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRHcm91cE1lbWJlcnNoaXBzKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGdldENvbnZlcnNhdGlvbkJ5VXVpZFxuICAgICAgKS5wZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwcztcblxuICAgICAgYXNzZXJ0LmlzRW1wdHkocmVzdWx0KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIHBhc3NlZCBhbiBlbXB0eSBhcnJheScsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHsgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM6IFtdIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEdyb3VwTWVtYmVyc2hpcHMoXG4gICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgZ2V0Q29udmVyc2F0aW9uQnlVdWlkXG4gICAgICApLnBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJmaWx0ZXJzIG91dCBjb252ZXJzYXRpb24gSURzIHRoYXQgZG9uJ3QgZXhpc3RcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0ge1xuICAgICAgICBwZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwczogW3sgdXVpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCkgfV0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRHcm91cE1lbWJlcnNoaXBzKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGdldENvbnZlcnNhdGlvbkJ5VXVpZFxuICAgICAgKS5wZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwcztcblxuICAgICAgYXNzZXJ0LmlzRW1wdHkocmVzdWx0KTtcbiAgICB9KTtcblxuICAgIGl0KCdmaWx0ZXJzIG91dCB1bnJlZ2lzdGVyZWQgY29udmVyc2F0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHtcbiAgICAgICAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM6IFt7IHV1aWQ6IHVucmVnaXN0ZXJlZENvbnZlcnNhdGlvbi51dWlkIH1dLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBNZW1iZXJzaGlwcyhcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBnZXRDb252ZXJzYXRpb25CeVV1aWRcbiAgICAgICkucGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM7XG5cbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaHlkcmF0ZXMgcGVuZGluZy1hcHByb3ZhbCBtZW1iZXJzaGlwcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHtcbiAgICAgICAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM6IFtcbiAgICAgICAgICB7IHV1aWQ6IG5vcm1hbENvbnZlcnNhdGlvbjIudXVpZCB9LFxuICAgICAgICAgIHsgdXVpZDogbm9ybWFsQ29udmVyc2F0aW9uMS51dWlkIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRHcm91cE1lbWJlcnNoaXBzKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGdldENvbnZlcnNhdGlvbkJ5VXVpZFxuICAgICAgKS5wZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwcztcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHJlc3VsdCwgMik7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdFswXSwgeyBtZW1iZXI6IG5vcm1hbENvbnZlcnNhdGlvbjIgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdFsxXSwgeyBtZW1iZXI6IG5vcm1hbENvbnZlcnNhdGlvbjEgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdwZW5kaW5nTWVtYmVyc2hpcHMnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgcGFzc2VkIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHt9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRHcm91cE1lbWJlcnNoaXBzKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGdldENvbnZlcnNhdGlvbkJ5VXVpZFxuICAgICAgKS5wZW5kaW5nTWVtYmVyc2hpcHM7XG5cbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBwYXNzZWQgYW4gZW1wdHkgYXJyYXknLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB7IHBlbmRpbmdNZW1iZXJzaGlwczogW10gfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBNZW1iZXJzaGlwcyhcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBnZXRDb252ZXJzYXRpb25CeVV1aWRcbiAgICAgICkucGVuZGluZ01lbWJlcnNoaXBzO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJmaWx0ZXJzIG91dCBjb252ZXJzYXRpb24gSURzIHRoYXQgZG9uJ3QgZXhpc3RcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0ge1xuICAgICAgICBwZW5kaW5nTWVtYmVyc2hpcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGFkZGVkQnlVc2VySWQ6IG5vcm1hbENvbnZlcnNhdGlvbjEudXVpZCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBNZW1iZXJzaGlwcyhcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBnZXRDb252ZXJzYXRpb25CeVV1aWRcbiAgICAgICkucGVuZGluZ01lbWJlcnNoaXBzO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpbHRlcnMgb3V0IHVucmVnaXN0ZXJlZCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0ge1xuICAgICAgICBwZW5kaW5nTWVtYmVyc2hpcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiB1bnJlZ2lzdGVyZWRDb252ZXJzYXRpb24udXVpZCxcbiAgICAgICAgICAgIGFkZGVkQnlVc2VySWQ6IG5vcm1hbENvbnZlcnNhdGlvbjEudXVpZCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBNZW1iZXJzaGlwcyhcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBnZXRDb252ZXJzYXRpb25CeVV1aWRcbiAgICAgICkucGVuZGluZ01lbWJlcnNoaXBzO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2h5ZHJhdGVzIHBlbmRpbmcgbWVtYmVyc2hpcHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhYmMgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHh5eiA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuXG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB7XG4gICAgICAgIHBlbmRpbmdNZW1iZXJzaGlwczogW1xuICAgICAgICAgIHsgdXVpZDogbm9ybWFsQ29udmVyc2F0aW9uMi51dWlkLCBhZGRlZEJ5VXNlcklkOiBhYmMgfSxcbiAgICAgICAgICB7IHV1aWQ6IG5vcm1hbENvbnZlcnNhdGlvbjEudXVpZCwgYWRkZWRCeVVzZXJJZDogeHl6IH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBnZXRHcm91cE1lbWJlcnNoaXBzKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGdldENvbnZlcnNhdGlvbkJ5VXVpZFxuICAgICAgKS5wZW5kaW5nTWVtYmVyc2hpcHM7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihyZXN1bHQsIDIpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRbMF0sIHtcbiAgICAgICAgbWVtYmVyOiBub3JtYWxDb252ZXJzYXRpb24yLFxuICAgICAgICBtZXRhZGF0YTogeyBhZGRlZEJ5VXNlcklkOiBhYmMgfSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRbMV0sIHtcbiAgICAgICAgbWVtYmVyOiBub3JtYWxDb252ZXJzYXRpb24xLFxuICAgICAgICBtZXRhZGF0YTogeyBhZGRlZEJ5VXNlcklkOiB4eXogfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFFdkIsa0JBQXFCO0FBRXJCLG9DQUErQztBQUUvQyxpQ0FBb0M7QUFFcEMsU0FBUyx1QkFBdUIsTUFBTTtBQUNwQyxRQUFNLHNCQUFzQixrRUFBK0I7QUFDM0QsUUFBTSxzQkFBc0Isa0VBQStCO0FBQzNELFFBQU0sMkJBQTJCLGtFQUErQjtBQUFBLElBQzlELDBCQUEwQixLQUFLLElBQUk7QUFBQSxFQUNyQyxDQUFDO0FBRUQsaUNBQ0UsTUFDOEI7QUFDOUIsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsRUFBRSxLQUFLLGtCQUFnQixhQUFhLFNBQVMsSUFBSTtBQUFBLEVBQ25EO0FBUlMsQUFVVCxXQUFTLGVBQWUsTUFBTTtBQUM1QixPQUFHLDhDQUE4QyxNQUFNO0FBQ3JELFlBQU0sZUFBZSxDQUFDO0FBRXRCLFlBQU0sU0FBUyxvREFDYixjQUNBLHFCQUNGLEVBQUU7QUFFRix5QkFBTyxRQUFRLE1BQU07QUFBQSxJQUN2QixDQUFDO0FBRUQsT0FBRyxtREFBbUQsTUFBTTtBQUMxRCxZQUFNLGVBQWUsRUFBRSxhQUFhLENBQUMsRUFBRTtBQUV2QyxZQUFNLFNBQVMsb0RB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
