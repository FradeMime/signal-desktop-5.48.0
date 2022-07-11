var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var handleKeydownForSearch_exports = {};
__export(handleKeydownForSearch_exports, {
  handleKeydownForSearch: () => handleKeydownForSearch
});
module.exports = __toCommonJS(handleKeydownForSearch_exports);
var KeyboardLayout = __toESM(require("../../services/keyboardLayout"));
function handleKeydownForSearch(event, {
  searchInConversation,
  selectedConversationId,
  startSearch
}) {
  const { ctrlKey, metaKey, shiftKey } = event;
  const commandKey = window.platform === "darwin" && metaKey;
  const controlKey = window.platform !== "darwin" && ctrlKey;
  const commandOrCtrl = commandKey || controlKey;
  const commandAndCtrl = commandKey && ctrlKey;
  const key = KeyboardLayout.lookup(event);
  if (commandOrCtrl && !commandAndCtrl && (key === "f" || key === "F")) {
    if (!shiftKey) {
      startSearch();
      event.preventDefault();
      event.stopPropagation();
    } else if (selectedConversationId) {
      searchInConversation(selectedConversationId);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleKeydownForSearch
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlS2V5ZG93bkZvclNlYXJjaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBLZXlib2FyZExheW91dCBmcm9tICcuLi8uLi9zZXJ2aWNlcy9rZXlib2FyZExheW91dCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVLZXlkb3duRm9yU2VhcmNoKFxuICBldmVudDogUmVhZG9ubHk8S2V5Ym9hcmRFdmVudD4sXG4gIHtcbiAgICBzZWFyY2hJbkNvbnZlcnNhdGlvbixcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkLFxuICAgIHN0YXJ0U2VhcmNoLFxuICB9OiBSZWFkb25seTx7XG4gICAgc2VhcmNoSW5Db252ZXJzYXRpb246IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICBzdGFydFNlYXJjaDogKCkgPT4gdW5rbm93bjtcbiAgfT5cbik6IHZvaWQge1xuICBjb25zdCB7IGN0cmxLZXksIG1ldGFLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcbiAgY29uc3QgY29tbWFuZEtleSA9IHdpbmRvdy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicgJiYgbWV0YUtleTtcbiAgY29uc3QgY29udHJvbEtleSA9IHdpbmRvdy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicgJiYgY3RybEtleTtcbiAgY29uc3QgY29tbWFuZE9yQ3RybCA9IGNvbW1hbmRLZXkgfHwgY29udHJvbEtleTtcbiAgY29uc3QgY29tbWFuZEFuZEN0cmwgPSBjb21tYW5kS2V5ICYmIGN0cmxLZXk7XG4gIGNvbnN0IGtleSA9IEtleWJvYXJkTGF5b3V0Lmxvb2t1cChldmVudCk7XG5cbiAgaWYgKGNvbW1hbmRPckN0cmwgJiYgIWNvbW1hbmRBbmRDdHJsICYmIChrZXkgPT09ICdmJyB8fCBrZXkgPT09ICdGJykpIHtcbiAgICBpZiAoIXNoaWZ0S2V5KSB7XG4gICAgICBzdGFydFNlYXJjaCgpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRDb252ZXJzYXRpb25JZCkge1xuICAgICAgc2VhcmNoSW5Db252ZXJzYXRpb24oc2VsZWN0ZWRDb252ZXJzYXRpb25JZCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EscUJBQWdDO0FBRXpCLGdDQUNMLE9BQ0E7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQU1JO0FBQ04sUUFBTSxFQUFFLFNBQVMsU0FBUyxhQUFhO0FBQ3ZDLFFBQU0sYUFBYSxPQUFPLGFBQWEsWUFBWTtBQUNuRCxRQUFNLGFBQWEsT0FBTyxhQUFhLFlBQVk7QUFDbkQsUUFBTSxnQkFBZ0IsY0FBYztBQUNwQyxRQUFNLGlCQUFpQixjQUFjO0FBQ3JDLFFBQU0sTUFBTSxlQUFlLE9BQU8sS0FBSztBQUV2QyxNQUFJLGlCQUFpQixDQUFDLGtCQUFtQixTQUFRLE9BQU8sUUFBUSxNQUFNO0FBQ3BFLFFBQUksQ0FBQyxVQUFVO0FBQ2Isa0JBQVk7QUFDWixZQUFNLGVBQWU7QUFDckIsWUFBTSxnQkFBZ0I7QUFBQSxJQUN4QixXQUFXLHdCQUF3QjtBQUNqQywyQkFBcUIsc0JBQXNCO0FBQzNDLFlBQU0sZUFBZTtBQUNyQixZQUFNLGdCQUFnQjtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUNGO0FBOUJnQiIsCiAgIm5hbWVzIjogW10KfQo=
