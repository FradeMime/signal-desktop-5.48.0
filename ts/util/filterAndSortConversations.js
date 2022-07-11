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
var filterAndSortConversations_exports = {};
__export(filterAndSortConversations_exports, {
  filterAndSortConversationsByRecent: () => filterAndSortConversationsByRecent
});
module.exports = __toCommonJS(filterAndSortConversations_exports);
var import_fuse = __toESM(require("fuse.js"));
var import_libphonenumberInstance = require("./libphonenumberInstance");
var import_durations = require("./durations");
const ACTIVE_AT_SCORE_FACTOR = 1 / import_durations.WEEK * 0.01;
const LEFT_GROUP_PENALTY = 1;
const FUSE_OPTIONS = {
  threshold: 0.2,
  includeScore: true,
  useExtendedSearch: true,
  shouldSort: true,
  keys: [
    {
      name: "searchableTitle",
      weight: 1
    },
    {
      name: "title",
      weight: 1
    },
    {
      name: "name",
      weight: 1
    },
    {
      name: "username",
      weight: 1
    },
    {
      name: "e164",
      weight: 0.5
    }
  ]
};
const cachedIndices = /* @__PURE__ */ new WeakMap();
const COMMANDS = /* @__PURE__ */ new Map();
COMMANDS.set("uuidEndsWith", (conversations, query) => {
  return conversations.filter((convo) => convo.uuid?.endsWith(query));
});
COMMANDS.set("idEndsWith", (conversations, query) => {
  return conversations.filter((convo) => convo.id?.endsWith(query));
});
COMMANDS.set("e164EndsWith", (conversations, query) => {
  return conversations.filter((convo) => convo.e164?.endsWith(query));
});
COMMANDS.set("groupIdEndsWith", (conversations, query) => {
  return conversations.filter((convo) => convo.groupId?.endsWith(query));
});
function searchConversations(conversations, searchTerm, regionCode) {
  const maybeCommand = searchTerm.match(/^!([^\s]+):(.*)$/);
  if (maybeCommand) {
    const [, commandName, query] = maybeCommand;
    const command = COMMANDS.get(commandName);
    if (command) {
      return command(conversations, query).map((item) => ({ item }));
    }
  }
  const phoneNumber = (0, import_libphonenumberInstance.parseAndFormatPhoneNumber)(searchTerm, regionCode);
  let extendedSearchTerm = searchTerm;
  if (phoneNumber) {
    extendedSearchTerm += ` | ${phoneNumber.e164}`;
  }
  let index = cachedIndices.get(conversations);
  if (!index) {
    index = new import_fuse.default(conversations, FUSE_OPTIONS);
    cachedIndices.set(conversations, index);
  }
  return index.search(extendedSearchTerm);
}
function filterAndSortConversationsByRecent(conversations, searchTerm, regionCode) {
  if (searchTerm.length) {
    const now = Date.now();
    return searchConversations(conversations, searchTerm, regionCode).slice().sort((a, b) => {
      const { activeAt: aActiveAt = 0, left: aLeft = false } = a.item;
      const { activeAt: bActiveAt = 0, left: bLeft = false } = b.item;
      const aScore = (now - aActiveAt) * ACTIVE_AT_SCORE_FACTOR + (a.score ?? 0) + (aLeft ? LEFT_GROUP_PENALTY : 0);
      const bScore = (now - bActiveAt) * ACTIVE_AT_SCORE_FACTOR + (b.score ?? 0) + (bLeft ? LEFT_GROUP_PENALTY : 0);
      return aScore - bScore;
    }).map((result) => result.item);
  }
  return conversations.concat().sort((a, b) => {
    if (a.activeAt && b.activeAt) {
      return a.activeAt > b.activeAt ? -1 : 1;
    }
    return a.activeAt && !b.activeAt ? -1 : 1;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filterAndSortConversationsByRecent
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IEZ1c2UgZnJvbSAnZnVzZS5qcyc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgcGFyc2VBbmRGb3JtYXRQaG9uZU51bWJlciB9IGZyb20gJy4vbGlicGhvbmVudW1iZXJJbnN0YW5jZSc7XG5pbXBvcnQgeyBXRUVLIH0gZnJvbSAnLi9kdXJhdGlvbnMnO1xuXG4vLyBGdXNlLmpzIHNjb3JlcyBoYXZlIG9yZGVyIG9mIDAuMDFcbmNvbnN0IEFDVElWRV9BVF9TQ09SRV9GQUNUT1IgPSAoMSAvIFdFRUspICogMC4wMTtcbmNvbnN0IExFRlRfR1JPVVBfUEVOQUxUWSA9IDE7XG5cbmNvbnN0IEZVU0VfT1BUSU9OUzogRnVzZS5JRnVzZU9wdGlvbnM8Q29udmVyc2F0aW9uVHlwZT4gPSB7XG4gIC8vIEEgc21hbGwtYnV0LW5vbnplcm8gdGhyZXNob2xkIGxldHMgdXMgbWF0Y2ggcGFydHMgb2YgRTE2NHMgYmV0dGVyLCBhbmQgbWFrZXMgdGhlXG4gIC8vICAgc2VhcmNoIGEgbGl0dGxlIG1vcmUgZm9yZ2l2aW5nLlxuICB0aHJlc2hvbGQ6IDAuMixcbiAgaW5jbHVkZVNjb3JlOiB0cnVlLFxuICB1c2VFeHRlbmRlZFNlYXJjaDogdHJ1ZSxcbiAgLy8gV2Ugc29ydCBtYW51YWxseSBhbnl3YXlcbiAgc2hvdWxkU29ydDogdHJ1ZSxcbiAga2V5czogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdzZWFyY2hhYmxlVGl0bGUnLFxuICAgICAgd2VpZ2h0OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3RpdGxlJyxcbiAgICAgIHdlaWdodDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgIHdlaWdodDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICB3ZWlnaHQ6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZTE2NCcsXG4gICAgICB3ZWlnaHQ6IDAuNSxcbiAgICB9LFxuICBdLFxufTtcblxuY29uc3QgY2FjaGVkSW5kaWNlcyA9IG5ldyBXZWFrTWFwPFxuICBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvblR5cGU+LFxuICBGdXNlPENvbnZlcnNhdGlvblR5cGU+XG4+KCk7XG5cbnR5cGUgQ29tbWFuZFJ1bm5lclR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uVHlwZT4sXG4gIHF1ZXJ5OiBzdHJpbmdcbikgPT4gQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG5cbmNvbnN0IENPTU1BTkRTID0gbmV3IE1hcDxzdHJpbmcsIENvbW1hbmRSdW5uZXJUeXBlPigpO1xuXG5DT01NQU5EUy5zZXQoJ3V1aWRFbmRzV2l0aCcsIChjb252ZXJzYXRpb25zLCBxdWVyeSkgPT4ge1xuICByZXR1cm4gY29udmVyc2F0aW9ucy5maWx0ZXIoY29udm8gPT4gY29udm8udXVpZD8uZW5kc1dpdGgocXVlcnkpKTtcbn0pO1xuXG5DT01NQU5EUy5zZXQoJ2lkRW5kc1dpdGgnLCAoY29udmVyc2F0aW9ucywgcXVlcnkpID0+IHtcbiAgcmV0dXJuIGNvbnZlcnNhdGlvbnMuZmlsdGVyKGNvbnZvID0+IGNvbnZvLmlkPy5lbmRzV2l0aChxdWVyeSkpO1xufSk7XG5cbkNPTU1BTkRTLnNldCgnZTE2NEVuZHNXaXRoJywgKGNvbnZlcnNhdGlvbnMsIHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBjb252ZXJzYXRpb25zLmZpbHRlcihjb252byA9PiBjb252by5lMTY0Py5lbmRzV2l0aChxdWVyeSkpO1xufSk7XG5cbkNPTU1BTkRTLnNldCgnZ3JvdXBJZEVuZHNXaXRoJywgKGNvbnZlcnNhdGlvbnMsIHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBjb252ZXJzYXRpb25zLmZpbHRlcihjb252byA9PiBjb252by5ncm91cElkPy5lbmRzV2l0aChxdWVyeSkpO1xufSk7XG5cbi8vIFNlZSBodHRwczovL2Z1c2Vqcy5pby9leGFtcGxlcy5odG1sI2V4dGVuZGVkLXNlYXJjaCBmb3Jcbi8vIGV4dGVuZGVkIHNlYXJjaCBkb2N1bWVudGF0aW9uLlxuZnVuY3Rpb24gc2VhcmNoQ29udmVyc2F0aW9ucyhcbiAgY29udmVyc2F0aW9uczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25UeXBlPixcbiAgc2VhcmNoVGVybTogc3RyaW5nLFxuICByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IFJlYWRvbmx5QXJyYXk8UGljazxGdXNlLkZ1c2VSZXN1bHQ8Q29udmVyc2F0aW9uVHlwZT4sICdpdGVtJyB8ICdzY29yZSc+PiB7XG4gIGNvbnN0IG1heWJlQ29tbWFuZCA9IHNlYXJjaFRlcm0ubWF0Y2goL14hKFteXFxzXSspOiguKikkLyk7XG4gIGlmIChtYXliZUNvbW1hbmQpIHtcbiAgICBjb25zdCBbLCBjb21tYW5kTmFtZSwgcXVlcnldID0gbWF5YmVDb21tYW5kO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IENPTU1BTkRTLmdldChjb21tYW5kTmFtZSk7XG4gICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgIHJldHVybiBjb21tYW5kKGNvbnZlcnNhdGlvbnMsIHF1ZXJ5KS5tYXAoaXRlbSA9PiAoeyBpdGVtIH0pKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwaG9uZU51bWJlciA9IHBhcnNlQW5kRm9ybWF0UGhvbmVOdW1iZXIoc2VhcmNoVGVybSwgcmVnaW9uQ29kZSk7XG5cbiAgLy8gRXNjYXBlIHRoZSBzZWFyY2ggdGVybVxuICBsZXQgZXh0ZW5kZWRTZWFyY2hUZXJtID0gc2VhcmNoVGVybTtcblxuICAvLyBPUiBwaG9uZU51bWJlclxuICBpZiAocGhvbmVOdW1iZXIpIHtcbiAgICBleHRlbmRlZFNlYXJjaFRlcm0gKz0gYCB8ICR7cGhvbmVOdW1iZXIuZTE2NH1gO1xuICB9XG5cbiAgbGV0IGluZGV4ID0gY2FjaGVkSW5kaWNlcy5nZXQoY29udmVyc2F0aW9ucyk7XG4gIGlmICghaW5kZXgpIHtcbiAgICBpbmRleCA9IG5ldyBGdXNlPENvbnZlcnNhdGlvblR5cGU+KGNvbnZlcnNhdGlvbnMsIEZVU0VfT1BUSU9OUyk7XG4gICAgY2FjaGVkSW5kaWNlcy5zZXQoY29udmVyc2F0aW9ucywgaW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIGluZGV4LnNlYXJjaChleHRlbmRlZFNlYXJjaFRlcm0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnNCeVJlY2VudChcbiAgY29udmVyc2F0aW9uczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25UeXBlPixcbiAgc2VhcmNoVGVybTogc3RyaW5nLFxuICByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+IHtcbiAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIHJldHVybiBzZWFyY2hDb252ZXJzYXRpb25zKGNvbnZlcnNhdGlvbnMsIHNlYXJjaFRlcm0sIHJlZ2lvbkNvZGUpXG4gICAgICAuc2xpY2UoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgeyBhY3RpdmVBdDogYUFjdGl2ZUF0ID0gMCwgbGVmdDogYUxlZnQgPSBmYWxzZSB9ID0gYS5pdGVtO1xuICAgICAgICBjb25zdCB7IGFjdGl2ZUF0OiBiQWN0aXZlQXQgPSAwLCBsZWZ0OiBiTGVmdCA9IGZhbHNlIH0gPSBiLml0ZW07XG5cbiAgICAgICAgLy8gU2VlOiBodHRwczovL2Z1c2Vqcy5pby9hcGkvb3B0aW9ucy5odG1sI2luY2x1ZGVzY29yZVxuICAgICAgICAvLyAwIHNjb3JlIGlzIGEgcGVyZmVjdCBtYXRjaCwgMSAtIGNvbXBsZXRlIG1pc21hdGNoXG4gICAgICAgIGNvbnN0IGFTY29yZSA9XG4gICAgICAgICAgKG5vdyAtIGFBY3RpdmVBdCkgKiBBQ1RJVkVfQVRfU0NPUkVfRkFDVE9SICtcbiAgICAgICAgICAoYS5zY29yZSA/PyAwKSArXG4gICAgICAgICAgKGFMZWZ0ID8gTEVGVF9HUk9VUF9QRU5BTFRZIDogMCk7XG4gICAgICAgIGNvbnN0IGJTY29yZSA9XG4gICAgICAgICAgKG5vdyAtIGJBY3RpdmVBdCkgKiBBQ1RJVkVfQVRfU0NPUkVfRkFDVE9SICtcbiAgICAgICAgICAoYi5zY29yZSA/PyAwKSArXG4gICAgICAgICAgKGJMZWZ0ID8gTEVGVF9HUk9VUF9QRU5BTFRZIDogMCk7XG5cbiAgICAgICAgcmV0dXJuIGFTY29yZSAtIGJTY29yZTtcbiAgICAgIH0pXG4gICAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuaXRlbSk7XG4gIH1cblxuICByZXR1cm4gY29udmVyc2F0aW9ucy5jb25jYXQoKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEuYWN0aXZlQXQgJiYgYi5hY3RpdmVBdCkge1xuICAgICAgcmV0dXJuIGEuYWN0aXZlQXQgPiBiLmFjdGl2ZUF0ID8gLTEgOiAxO1xuICAgIH1cblxuICAgIHJldHVybiBhLmFjdGl2ZUF0ICYmICFiLmFjdGl2ZUF0ID8gLTEgOiAxO1xuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBaUI7QUFHakIsb0NBQTBDO0FBQzFDLHVCQUFxQjtBQUdyQixNQUFNLHlCQUEwQixJQUFJLHdCQUFRO0FBQzVDLE1BQU0scUJBQXFCO0FBRTNCLE1BQU0sZUFBb0Q7QUFBQSxFQUd4RCxXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxtQkFB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
