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
var contactVerification_exports = {};
__export(contactVerification_exports, {
  reloadProfiles: () => reloadProfiles,
  toggleVerification: () => toggleVerification
});
module.exports = __toCommonJS(contactVerification_exports);
async function toggleVerification(id) {
  const contact = window.getConversations().get(id);
  if (contact) {
    await contact.toggleVerified();
  }
}
async function reloadProfiles(id) {
  const contact = window.getConversations().get(id);
  if (contact) {
    await contact.getProfiles();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reloadProfiles,
  toggleVerification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udGFjdFZlcmlmaWNhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlVmVyaWZpY2F0aW9uKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29udGFjdCA9IHdpbmRvdy5nZXRDb252ZXJzYXRpb25zKCkuZ2V0KGlkKTtcbiAgaWYgKGNvbnRhY3QpIHtcbiAgICBhd2FpdCBjb250YWN0LnRvZ2dsZVZlcmlmaWVkKCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbG9hZFByb2ZpbGVzKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29udGFjdCA9IHdpbmRvdy5nZXRDb252ZXJzYXRpb25zKCkuZ2V0KGlkKTtcbiAgaWYgKGNvbnRhY3QpIHtcbiAgICBhd2FpdCBjb250YWN0LmdldFByb2ZpbGVzKCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtDQUF5QyxJQUEyQjtBQUNsRSxRQUFNLFVBQVUsT0FBTyxpQkFBaUIsRUFBRSxJQUFJLEVBQUU7QUFDaEQsTUFBSSxTQUFTO0FBQ1gsVUFBTSxRQUFRLGVBQWU7QUFBQSxFQUMvQjtBQUNGO0FBTHNCLEFBT3RCLDhCQUFxQyxJQUEyQjtBQUM5RCxRQUFNLFVBQVUsT0FBTyxpQkFBaUIsRUFBRSxJQUFJLEVBQUU7QUFDaEQsTUFBSSxTQUFTO0FBQ1gsVUFBTSxRQUFRLFlBQVk7QUFBQSxFQUM1QjtBQUNGO0FBTHNCIiwKICAibmFtZXMiOiBbXQp9Cg==
