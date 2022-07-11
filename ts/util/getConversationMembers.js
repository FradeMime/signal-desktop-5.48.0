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
var getConversationMembers_exports = {};
__export(getConversationMembers_exports, {
  getConversationMembers: () => getConversationMembers
});
module.exports = __toCommonJS(getConversationMembers_exports);
var import_lodash = require("lodash");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
function getConversationMembers(conversationAttrs, options = {}) {
  if ((0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs)) {
    return [conversationAttrs];
  }
  if (conversationAttrs.membersV2) {
    const { includePendingMembers } = options;
    const members = includePendingMembers ? [
      ...conversationAttrs.membersV2 || [],
      ...conversationAttrs.pendingMembersV2 || []
    ] : conversationAttrs.membersV2 || [];
    return (0, import_lodash.compact)(members.map((member) => {
      const conversation = window.ConversationController.get(member.uuid);
      if (conversation && (conversation.isUnregistered() || conversation.isBlocked())) {
        return null;
      }
      return conversation?.attributes;
    }));
  }
  if (conversationAttrs.members) {
    return (0, import_lodash.compact)(conversationAttrs.members.map((id) => {
      const conversation = window.ConversationController.get(id);
      if (conversation && (conversation.isUnregistered() || conversation.isBlocked())) {
        return null;
      }
      return conversation?.attributes;
    }));
  }
  return [];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConversationMembers
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q29udmVyc2F0aW9uTWVtYmVycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb21wYWN0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IGlzRGlyZWN0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnZlcnNhdGlvbk1lbWJlcnMoXG4gIGNvbnZlcnNhdGlvbkF0dHJzOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgb3B0aW9uczogeyBpbmNsdWRlUGVuZGluZ01lbWJlcnM/OiBib29sZWFuIH0gPSB7fVxuKTogQXJyYXk8Q29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU+IHtcbiAgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbkF0dHJzKSkge1xuICAgIHJldHVybiBbY29udmVyc2F0aW9uQXR0cnNdO1xuICB9XG5cbiAgaWYgKGNvbnZlcnNhdGlvbkF0dHJzLm1lbWJlcnNWMikge1xuICAgIGNvbnN0IHsgaW5jbHVkZVBlbmRpbmdNZW1iZXJzIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IG1lbWJlcnM6IEFycmF5PHsgdXVpZDogVVVJRFN0cmluZ1R5cGUgfT4gPSBpbmNsdWRlUGVuZGluZ01lbWJlcnNcbiAgICAgID8gW1xuICAgICAgICAgIC4uLihjb252ZXJzYXRpb25BdHRycy5tZW1iZXJzVjIgfHwgW10pLFxuICAgICAgICAgIC4uLihjb252ZXJzYXRpb25BdHRycy5wZW5kaW5nTWVtYmVyc1YyIHx8IFtdKSxcbiAgICAgICAgXVxuICAgICAgOiBjb252ZXJzYXRpb25BdHRycy5tZW1iZXJzVjIgfHwgW107XG5cbiAgICByZXR1cm4gY29tcGFjdChcbiAgICAgIG1lbWJlcnMubWFwKG1lbWJlciA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChtZW1iZXIudXVpZCk7XG5cbiAgICAgICAgLy8gSW4gZ3JvdXBzIHdlIHdvbid0IHNlbnQgdG8gYmxvY2tlZCBjb250YWN0cyBvciB0aG9zZSB3ZSB0aGluayBhcmUgdW5yZWdpc3RlcmVkXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb252ZXJzYXRpb24gJiZcbiAgICAgICAgICAoY29udmVyc2F0aW9uLmlzVW5yZWdpc3RlcmVkKCkgfHwgY29udmVyc2F0aW9uLmlzQmxvY2tlZCgpKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb252ZXJzYXRpb24/LmF0dHJpYnV0ZXM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBpZiAoY29udmVyc2F0aW9uQXR0cnMubWVtYmVycykge1xuICAgIHJldHVybiBjb21wYWN0KFxuICAgICAgY29udmVyc2F0aW9uQXR0cnMubWVtYmVycy5tYXAoaWQgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWQpO1xuXG4gICAgICAgIC8vIEluIGdyb3VwcyB3ZSB3b24ndCBzZW50IHRvIGJsb2NrZWQgY29udGFjdHMgb3IgdGhvc2Ugd2UgdGhpbmsgYXJlIHVucmVnaXN0ZXJlZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgY29udmVyc2F0aW9uICYmXG4gICAgICAgICAgKGNvbnZlcnNhdGlvbi5pc1VucmVnaXN0ZXJlZCgpIHx8IGNvbnZlcnNhdGlvbi5pc0Jsb2NrZWQoKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udmVyc2F0aW9uPy5hdHRyaWJ1dGVzO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF3QjtBQUd4QixvQ0FBcUM7QUFFOUIsZ0NBQ0wsbUJBQ0EsVUFBK0MsQ0FBQyxHQUNiO0FBQ25DLE1BQUksd0RBQXFCLGlCQUFpQixHQUFHO0FBQzNDLFdBQU8sQ0FBQyxpQkFBaUI7QUFBQSxFQUMzQjtBQUVBLE1BQUksa0JBQWtCLFdBQVc7QUFDL0IsVUFBTSxFQUFFLDBCQUEwQjtBQUNsQyxVQUFNLFVBQTJDLHdCQUM3QztBQUFBLE1BQ0UsR0FBSSxrQkFBa0IsYUFBYSxDQUFDO0FBQUEsTUFDcEMsR0FBSSxrQkFBa0Isb0JBQW9CLENBQUM7QUFBQSxJQUM3QyxJQUNBLGtCQUFrQixhQUFhLENBQUM7QUFFcEMsV0FBTywyQkFDTCxRQUFRLElBQUksWUFBVTtBQUNwQixZQUFNLGVBQWUsT0FBTyx1QkFBdUIsSUFBSSxPQUFPLElBQUk7QUFHbEUsVUFDRSxnQkFDQyxjQUFhLGVBQWUsS0FBSyxhQUFhLFVBQVUsSUFDekQ7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sY0FBYztBQUFBLElBQ3ZCLENBQUMsQ0FDSDtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGtCQUFrQixTQUFTO0FBQzdCLFdBQU8sMkJBQ0wsa0JBQWtCLFFBQVEsSUFBSSxRQUFNO0FBQ2xDLFlBQU0sZUFBZSxPQUFPLHVCQUF1QixJQUFJLEVBQUU7QUFHekQsVUFDRSxnQkFDQyxjQUFhLGVBQWUsS0FBSyxhQUFhLFVBQVUsSUFDekQ7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sY0FBYztBQUFBLElBQ3ZCLENBQUMsQ0FDSDtBQUFBLEVBQ0Y7QUFFQSxTQUFPLENBQUM7QUFDVjtBQXJEZ0IiLAogICJuYW1lcyI6IFtdCn0K
