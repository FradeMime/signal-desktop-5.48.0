var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getGroupMemberships_exports = {};
__export(getGroupMemberships_exports, {
  getGroupMemberships: () => getGroupMemberships
});
module.exports = __toCommonJS(getGroupMemberships_exports);
var import_isConversationUnregistered = require("./isConversationUnregistered");
const getGroupMemberships = /* @__PURE__ */ __name(({
  memberships = [],
  pendingApprovalMemberships = [],
  pendingMemberships = []
}, getConversationByUuid) => ({
  memberships: memberships.reduce((result, membership) => {
    const member = getConversationByUuid(membership.uuid);
    if (!member) {
      return result;
    }
    return [...result, { isAdmin: membership.isAdmin, member }];
  }, []),
  pendingApprovalMemberships: pendingApprovalMemberships.reduce((result, membership) => {
    const member = getConversationByUuid(membership.uuid);
    if (!member || (0, import_isConversationUnregistered.isConversationUnregistered)(member)) {
      return result;
    }
    return [...result, { member }];
  }, []),
  pendingMemberships: pendingMemberships.reduce((result, membership) => {
    const member = getConversationByUuid(membership.uuid);
    if (!member || (0, import_isConversationUnregistered.isConversationUnregistered)(member)) {
      return result;
    }
    return [
      ...result,
      {
        member,
        metadata: { addedByUserId: membership.addedByUserId }
      }
    ];
  }, [])
}), "getGroupMemberships");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGroupMemberships
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0R3JvdXBNZW1iZXJzaGlwcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEdyb3VwVjJNZW1iZXJzaGlwIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0JztcbmltcG9ydCB0eXBlIHtcbiAgR3JvdXBWMlBlbmRpbmdNZW1iZXJzaGlwLFxuICBHcm91cFYyUmVxdWVzdGluZ01lbWJlcnNoaXAsXG59IGZyb20gJy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL2NvbnZlcnNhdGlvbi1kZXRhaWxzL1BlbmRpbmdJbnZpdGVzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQgfSBmcm9tICcuL2lzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkJztcblxuZXhwb3J0IGNvbnN0IGdldEdyb3VwTWVtYmVyc2hpcHMgPSAoXG4gIHtcbiAgICBtZW1iZXJzaGlwcyA9IFtdLFxuICAgIHBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzID0gW10sXG4gICAgcGVuZGluZ01lbWJlcnNoaXBzID0gW10sXG4gIH06IFJlYWRvbmx5PFxuICAgIFBpY2s8XG4gICAgICBDb252ZXJzYXRpb25UeXBlLFxuICAgICAgJ21lbWJlcnNoaXBzJyB8ICdwZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwcycgfCAncGVuZGluZ01lbWJlcnNoaXBzJ1xuICAgID5cbiAgPixcbiAgZ2V0Q29udmVyc2F0aW9uQnlVdWlkOiAodXVpZDogVVVJRFN0cmluZ1R5cGUpID0+IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvblR5cGVcbik6IHtcbiAgbWVtYmVyc2hpcHM6IEFycmF5PEdyb3VwVjJNZW1iZXJzaGlwPjtcbiAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM6IEFycmF5PEdyb3VwVjJSZXF1ZXN0aW5nTWVtYmVyc2hpcD47XG4gIHBlbmRpbmdNZW1iZXJzaGlwczogQXJyYXk8R3JvdXBWMlBlbmRpbmdNZW1iZXJzaGlwPjtcbn0gPT4gKHtcbiAgbWVtYmVyc2hpcHM6IG1lbWJlcnNoaXBzLnJlZHVjZShcbiAgICAocmVzdWx0OiBBcnJheTxHcm91cFYyTWVtYmVyc2hpcD4sIG1lbWJlcnNoaXApID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlciA9IGdldENvbnZlcnNhdGlvbkJ5VXVpZChtZW1iZXJzaGlwLnV1aWQpO1xuICAgICAgaWYgKCFtZW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbLi4ucmVzdWx0LCB7IGlzQWRtaW46IG1lbWJlcnNoaXAuaXNBZG1pbiwgbWVtYmVyIH1dO1xuICAgIH0sXG4gICAgW11cbiAgKSxcbiAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM6IHBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzLnJlZHVjZShcbiAgICAocmVzdWx0OiBBcnJheTxHcm91cFYyUmVxdWVzdGluZ01lbWJlcnNoaXA+LCBtZW1iZXJzaGlwKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXIgPSBnZXRDb252ZXJzYXRpb25CeVV1aWQobWVtYmVyc2hpcC51dWlkKTtcbiAgICAgIGlmICghbWVtYmVyIHx8IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKG1lbWJlcikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbLi4ucmVzdWx0LCB7IG1lbWJlciB9XTtcbiAgICB9LFxuICAgIFtdXG4gICksXG4gIHBlbmRpbmdNZW1iZXJzaGlwczogcGVuZGluZ01lbWJlcnNoaXBzLnJlZHVjZShcbiAgICAocmVzdWx0OiBBcnJheTxHcm91cFYyUGVuZGluZ01lbWJlcnNoaXA+LCBtZW1iZXJzaGlwKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXIgPSBnZXRDb252ZXJzYXRpb25CeVV1aWQobWVtYmVyc2hpcC51dWlkKTtcbiAgICAgIGlmICghbWVtYmVyIHx8IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKG1lbWJlcikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAge1xuICAgICAgICAgIG1lbWJlcixcbiAgICAgICAgICBtZXRhZGF0YTogeyBhZGRlZEJ5VXNlcklkOiBtZW1iZXJzaGlwLmFkZGVkQnlVc2VySWQgfSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgfSxcbiAgICBbXVxuICApLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUEsd0NBQTJDO0FBRXBDLE1BQU0sc0JBQXNCLHdCQUNqQztBQUFBLEVBQ0UsY0FBYyxDQUFDO0FBQUEsRUFDZiw2QkFBNkIsQ0FBQztBQUFBLEVBQzlCLHFCQUFxQixDQUFDO0FBQUEsR0FPeEIsMEJBS0k7QUFBQSxFQUNKLGFBQWEsWUFBWSxPQUN2QixDQUFDLFFBQWtDLGVBQWU7QUFDaEQsVUFBTSxTQUFTLHNCQUFzQixXQUFXLElBQUk7QUFDcEQsUUFBSSxDQUFDLFFBQVE7QUFDWCxhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU8sQ0FBQyxHQUFHLFFBQVEsRUFBRSxTQUFTLFdBQVcsU0FBUyxPQUFPLENBQUM7QUFBQSxFQUM1RCxHQUNBLENBQUMsQ0FDSDtBQUFBLEVBQ0EsNEJBQTRCLDJCQUEyQixPQUNyRCxDQUFDLFFBQTRDLGVBQWU7QUFDMUQsVUFBTSxTQUFTLHNCQUFzQixXQUFXLElBQUk7QUFDcEQsUUFBSSxDQUFDLFVBQVUsa0VBQTJCLE1BQU0sR0FBRztBQUNqRCxhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU8sQ0FBQyxHQUFHLFFBQVEsRUFBRSxPQUFPLENBQUM7QUFBQSxFQUMvQixHQUNBLENBQUMsQ0FDSDtBQUFBLEVBQ0Esb0JBQW9CLG1CQUFtQixPQUNyQyxDQUFDLFFBQXlDLGVBQWU7QUFDdkQsVUFBTSxTQUFTLHNCQUFzQixXQUFXLElBQUk7QUFDcEQsUUFBSSxDQUFDLFVBQVUsa0VBQTJCLE1BQU0sR0FBRztBQUNqRCxhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU87QUFBQSxNQUNMLEdBQUc7QUFBQSxNQUNIO0FBQUEsUUFDRTtBQUFBLFFBQ0EsVUFBVSxFQUFFLGVBQWUsV0FBVyxjQUFjO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUNBLENBQUMsQ0FDSDtBQUNGLElBckRtQzsiLAogICJuYW1lcyI6IFtdCn0K
