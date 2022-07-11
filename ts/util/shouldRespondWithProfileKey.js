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
var shouldRespondWithProfileKey_exports = {};
__export(shouldRespondWithProfileKey_exports, {
  shouldRespondWithProfileKey: () => shouldRespondWithProfileKey
});
module.exports = __toCommonJS(shouldRespondWithProfileKey_exports);
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
async function shouldRespondWithProfileKey(sender) {
  if ((0, import_whatTypeOfConversation.isMe)(sender.attributes) || !sender.getAccepted() || sender.isBlocked()) {
    return false;
  }
  if (sender.get("sharedGroupNames")?.length) {
    return true;
  }
  await sender.updateSharedGroups();
  return Boolean(sender.get("sharedGroupNames")?.length);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shouldRespondWithProfileKey
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkUmVzcG9uZFdpdGhQcm9maWxlS2V5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBpc01lIH0gZnJvbSAnLi93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3VsZFJlc3BvbmRXaXRoUHJvZmlsZUtleShcbiAgc2VuZGVyOiBDb252ZXJzYXRpb25Nb2RlbFxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGlmIChpc01lKHNlbmRlci5hdHRyaWJ1dGVzKSB8fCAhc2VuZGVyLmdldEFjY2VwdGVkKCkgfHwgc2VuZGVyLmlzQmxvY2tlZCgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gV2UgZG8gbWVzc2FnZSBjaGVjayBpbiBhbiBhdHRlbXB0IHRvIGF2b2lkIGEgZGF0YWJhc2UgbG9va3VwLiBJZiBzb21lb25lIHdhcyBFVkVSIGluXG4gIC8vICAgYSBzaGFyZWQgZ3JvdXAgd2l0aCB1cywgd2Ugc2hvdWxkJ3ZlIHNoYXJlZCBvdXIgcHJvZmlsZSBrZXkgd2l0aCB0aGVtIGluIHRoZSBwYXN0LFxuICAvLyAgIHNvIHdlIHNob3VsZCByZXNwb25kIHdpdGggYSBwcm9maWxlIGtleSBub3cuXG4gIGlmIChzZW5kZXIuZ2V0KCdzaGFyZWRHcm91cE5hbWVzJyk/Lmxlbmd0aCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXdhaXQgc2VuZGVyLnVwZGF0ZVNoYXJlZEdyb3VwcygpO1xuICByZXR1cm4gQm9vbGVhbihzZW5kZXIuZ2V0KCdzaGFyZWRHcm91cE5hbWVzJyk/Lmxlbmd0aCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsb0NBQXFCO0FBRXJCLDJDQUNFLFFBQ2tCO0FBQ2xCLE1BQUksd0NBQUssT0FBTyxVQUFVLEtBQUssQ0FBQyxPQUFPLFlBQVksS0FBSyxPQUFPLFVBQVUsR0FBRztBQUMxRSxXQUFPO0FBQUEsRUFDVDtBQUtBLE1BQUksT0FBTyxJQUFJLGtCQUFrQixHQUFHLFFBQVE7QUFDMUMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLE9BQU8sbUJBQW1CO0FBQ2hDLFNBQU8sUUFBUSxPQUFPLElBQUksa0JBQWtCLEdBQUcsTUFBTTtBQUN2RDtBQWhCc0IiLAogICJuYW1lcyI6IFtdCn0K
