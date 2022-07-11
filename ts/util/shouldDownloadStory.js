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
var shouldDownloadStory_exports = {};
__export(shouldDownloadStory_exports, {
  shouldDownloadStory: () => shouldDownloadStory
});
module.exports = __toCommonJS(shouldDownloadStory_exports);
var import_Client = __toESM(require("../sql/Client"));
const MAX_NUM_STORIES_TO_PREFETCH = 5;
async function shouldDownloadStory(conversation) {
  if (!conversation.hasPostedStory) {
    return true;
  }
  const [storyReads, storyCounts] = await Promise.all([
    import_Client.default.countStoryReadsByConversation(conversation.id),
    import_Client.default.getStoryCount(conversation.id)
  ]);
  return storyReads > 0 && storyCounts <= MAX_NUM_STORIES_TO_PREFETCH;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shouldDownloadStory
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkRG93bmxvYWRTdG9yeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5cbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuXG5jb25zdCBNQVhfTlVNX1NUT1JJRVNfVE9fUFJFRkVUQ0ggPSA1O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hvdWxkRG93bmxvYWRTdG9yeShcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZVxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGlmICghY29udmVyc2F0aW9uLmhhc1Bvc3RlZFN0b3J5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBbc3RvcnlSZWFkcywgc3RvcnlDb3VudHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGRhdGFJbnRlcmZhY2UuY291bnRTdG9yeVJlYWRzQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmlkKSxcbiAgICBkYXRhSW50ZXJmYWNlLmdldFN0b3J5Q291bnQoY29udmVyc2F0aW9uLmlkKSxcbiAgXSk7XG5cbiAgcmV0dXJuIHN0b3J5UmVhZHMgPiAwICYmIHN0b3J5Q291bnRzIDw9IE1BWF9OVU1fU1RPUklFU19UT19QUkVGRVRDSDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxvQkFBMEI7QUFFMUIsTUFBTSw4QkFBOEI7QUFFcEMsbUNBQ0UsY0FDa0I7QUFDbEIsTUFBSSxDQUFDLGFBQWEsZ0JBQWdCO0FBQ2hDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxDQUFDLFlBQVksZUFBZSxNQUFNLFFBQVEsSUFBSTtBQUFBLElBQ2xELHNCQUFjLDhCQUE4QixhQUFhLEVBQUU7QUFBQSxJQUMzRCxzQkFBYyxjQUFjLGFBQWEsRUFBRTtBQUFBLEVBQzdDLENBQUM7QUFFRCxTQUFPLGFBQWEsS0FBSyxlQUFlO0FBQzFDO0FBYnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
