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
var idForLogging_exports = {};
__export(idForLogging_exports, {
  getConversationIdForLogging: () => getConversationIdForLogging,
  getMessageIdForLogging: () => getMessageIdForLogging
});
module.exports = __toCommonJS(idForLogging_exports);
var import_helpers = require("../messages/helpers");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
function getMessageIdForLogging(message) {
  const account = (0, import_helpers.getSourceUuid)(message) || (0, import_helpers.getSource)(message);
  const device = (0, import_helpers.getSourceDevice)(message);
  const timestamp = message.sent_at;
  return `${account}.${device} ${timestamp}`;
}
function getConversationIdForLogging(conversation) {
  if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation)) {
    const { uuid, e164, id } = conversation;
    return `${uuid || e164} (${id})`;
  }
  if ((0, import_whatTypeOfConversation.isGroupV2)(conversation)) {
    return `groupv2(${conversation.groupId})`;
  }
  return `group(${conversation.groupId})`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConversationIdForLogging,
  getMessageIdForLogging
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaWRGb3JMb2dnaW5nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxufSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IGdldFNvdXJjZSwgZ2V0U291cmNlRGV2aWNlLCBnZXRTb3VyY2VVdWlkIH0gZnJvbSAnLi4vbWVzc2FnZXMvaGVscGVycyc7XG5pbXBvcnQgeyBpc0RpcmVjdENvbnZlcnNhdGlvbiwgaXNHcm91cFYyIH0gZnJvbSAnLi93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1lc3NhZ2VJZEZvckxvZ2dpbmcobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKTogc3RyaW5nIHtcbiAgY29uc3QgYWNjb3VudCA9IGdldFNvdXJjZVV1aWQobWVzc2FnZSkgfHwgZ2V0U291cmNlKG1lc3NhZ2UpO1xuICBjb25zdCBkZXZpY2UgPSBnZXRTb3VyY2VEZXZpY2UobWVzc2FnZSk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG1lc3NhZ2Uuc2VudF9hdDtcblxuICByZXR1cm4gYCR7YWNjb3VudH0uJHtkZXZpY2V9ICR7dGltZXN0YW1wfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb252ZXJzYXRpb25JZEZvckxvZ2dpbmcoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGVcbik6IHN0cmluZyB7XG4gIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbihjb252ZXJzYXRpb24pKSB7XG4gICAgY29uc3QgeyB1dWlkLCBlMTY0LCBpZCB9ID0gY29udmVyc2F0aW9uO1xuICAgIHJldHVybiBgJHt1dWlkIHx8IGUxNjR9ICgke2lkfSlgO1xuICB9XG4gIGlmIChpc0dyb3VwVjIoY29udmVyc2F0aW9uKSkge1xuICAgIHJldHVybiBgZ3JvdXB2Migke2NvbnZlcnNhdGlvbi5ncm91cElkfSlgO1xuICB9XG5cbiAgcmV0dXJuIGBncm91cCgke2NvbnZlcnNhdGlvbi5ncm91cElkfSlgO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0EscUJBQTBEO0FBQzFELG9DQUFnRDtBQUV6QyxnQ0FBZ0MsU0FBd0M7QUFDN0UsUUFBTSxVQUFVLGtDQUFjLE9BQU8sS0FBSyw4QkFBVSxPQUFPO0FBQzNELFFBQU0sU0FBUyxvQ0FBZ0IsT0FBTztBQUN0QyxRQUFNLFlBQVksUUFBUTtBQUUxQixTQUFPLEdBQUcsV0FBVyxVQUFVO0FBQ2pDO0FBTmdCLEFBUVQscUNBQ0wsY0FDUTtBQUNSLE1BQUksd0RBQXFCLFlBQVksR0FBRztBQUN0QyxVQUFNLEVBQUUsTUFBTSxNQUFNLE9BQU87QUFDM0IsV0FBTyxHQUFHLFFBQVEsU0FBUztBQUFBLEVBQzdCO0FBQ0EsTUFBSSw2Q0FBVSxZQUFZLEdBQUc7QUFDM0IsV0FBTyxXQUFXLGFBQWE7QUFBQSxFQUNqQztBQUVBLFNBQU8sU0FBUyxhQUFhO0FBQy9CO0FBWmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
