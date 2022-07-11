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
var routineProfileRefresh_exports = {};
__export(routineProfileRefresh_exports, {
  routineProfileRefresh: () => routineProfileRefresh
});
module.exports = __toCommonJS(routineProfileRefresh_exports);
var import_lodash = require("lodash");
var import_p_queue = __toESM(require("p-queue"));
var log = __toESM(require("./logging/log"));
var import_assert = require("./util/assert");
var import_missingCaseError = require("./util/missingCaseError");
var import_isNormalNumber = require("./util/isNormalNumber");
var import_iterables = require("./util/iterables");
var import_timestamp = require("./util/timestamp");
var import_getProfile = require("./util/getProfile");
const STORAGE_KEY = "lastAttemptedToRefreshProfilesAt";
const MAX_AGE_TO_BE_CONSIDERED_ACTIVE = 30 * 24 * 60 * 60 * 1e3;
const MAX_AGE_TO_BE_CONSIDERED_RECENTLY_REFRESHED = 1 * 24 * 60 * 60 * 1e3;
const MAX_CONVERSATIONS_TO_REFRESH = 50;
const MIN_ELAPSED_DURATION_TO_REFRESH_AGAIN = 12 * 3600 * 1e3;
async function routineProfileRefresh({
  allConversations,
  ourConversationId,
  storage,
  getProfileFn = import_getProfile.getProfile
}) {
  log.info("routineProfileRefresh: starting");
  if (!hasEnoughTimeElapsedSinceLastRefresh(storage)) {
    log.info("routineProfileRefresh: too soon to refresh. Doing nothing");
    return;
  }
  log.info("routineProfileRefresh: updating last refresh time");
  await storage.put(STORAGE_KEY, Date.now());
  const conversationsToRefresh = getConversationsToRefresh(allConversations, ourConversationId);
  log.info("routineProfileRefresh: starting to refresh conversations");
  let totalCount = 0;
  let successCount = 0;
  async function refreshConversation(conversation) {
    log.info(`routineProfileRefresh: refreshing profile for ${conversation.idForLogging()}`);
    totalCount += 1;
    try {
      await getProfileFn(conversation.get("uuid"), conversation.get("e164"));
      log.info(`routineProfileRefresh: refreshed profile for ${conversation.idForLogging()}`);
      successCount += 1;
    } catch (err) {
      log.error(`routineProfileRefresh: refreshed profile for ${conversation.idForLogging()}`, err?.stack || err);
    }
  }
  const refreshQueue = new import_p_queue.default({
    concurrency: 5,
    timeout: 1e3 * 60 * 2,
    throwOnTimeout: true
  });
  for (const conversation of conversationsToRefresh) {
    refreshQueue.add(() => refreshConversation(conversation));
  }
  await refreshQueue.onIdle();
  log.info(`routineProfileRefresh: successfully refreshed ${successCount} out of ${totalCount} conversation(s)`);
}
function hasEnoughTimeElapsedSinceLastRefresh(storage) {
  const storedValue = storage.get(STORAGE_KEY);
  if ((0, import_lodash.isNil)(storedValue)) {
    return true;
  }
  if ((0, import_isNormalNumber.isNormalNumber)(storedValue)) {
    return (0, import_timestamp.isOlderThan)(storedValue, MIN_ELAPSED_DURATION_TO_REFRESH_AGAIN);
  }
  (0, import_assert.assert)(false, `An invalid value was stored in ${STORAGE_KEY}; treating it as nil`);
  return true;
}
function getConversationsToRefresh(conversations, ourConversationId) {
  const filteredConversations = getFilteredConversations(conversations, ourConversationId);
  return (0, import_iterables.take)(filteredConversations, MAX_CONVERSATIONS_TO_REFRESH);
}
function* getFilteredConversations(conversations, ourConversationId) {
  const sorted = (0, import_lodash.sortBy)(conversations, (c) => c.get("active_at"));
  const conversationIdsSeen = /* @__PURE__ */ new Set([ourConversationId]);
  for (const conversation of sorted) {
    const type = conversation.get("type");
    switch (type) {
      case "private":
        if (!conversationIdsSeen.has(conversation.id) && isConversationActive(conversation) && !hasRefreshedProfileRecently(conversation)) {
          conversationIdsSeen.add(conversation.id);
          yield conversation;
        }
        break;
      case "group":
        for (const member of conversation.getMembers()) {
          if (!conversationIdsSeen.has(member.id) && !hasRefreshedProfileRecently(member)) {
            conversationIdsSeen.add(member.id);
            yield member;
          }
        }
        break;
      default:
        throw (0, import_missingCaseError.missingCaseError)(type);
    }
  }
}
function isConversationActive(conversation) {
  const activeAt = conversation.get("active_at");
  return (0, import_isNormalNumber.isNormalNumber)(activeAt) && activeAt + MAX_AGE_TO_BE_CONSIDERED_ACTIVE > Date.now();
}
function hasRefreshedProfileRecently(conversation) {
  const profileLastFetchedAt = conversation.get("profileLastFetchedAt");
  return (0, import_isNormalNumber.isNormalNumber)(profileLastFetchedAt) && profileLastFetchedAt + MAX_AGE_TO_BE_CONSIDERED_RECENTLY_REFRESHED > Date.now();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routineProfileRefresh
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicm91dGluZVByb2ZpbGVSZWZyZXNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOaWwsIHNvcnRCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgeyBpc05vcm1hbE51bWJlciB9IGZyb20gJy4vdXRpbC9pc05vcm1hbE51bWJlcic7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAnLi91dGlsL2l0ZXJhYmxlcyc7XG5pbXBvcnQgeyBpc09sZGVyVGhhbiB9IGZyb20gJy4vdXRpbC90aW1lc3RhbXAnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4vbW9kZWxzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBTdG9yYWdlSW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0IHsgZ2V0UHJvZmlsZSB9IGZyb20gJy4vdXRpbC9nZXRQcm9maWxlJztcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnbGFzdEF0dGVtcHRlZFRvUmVmcmVzaFByb2ZpbGVzQXQnO1xuY29uc3QgTUFYX0FHRV9UT19CRV9DT05TSURFUkVEX0FDVElWRSA9IDMwICogMjQgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IE1BWF9BR0VfVE9fQkVfQ09OU0lERVJFRF9SRUNFTlRMWV9SRUZSRVNIRUQgPSAxICogMjQgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IE1BWF9DT05WRVJTQVRJT05TX1RPX1JFRlJFU0ggPSA1MDtcbmNvbnN0IE1JTl9FTEFQU0VEX0RVUkFUSU9OX1RPX1JFRlJFU0hfQUdBSU4gPSAxMiAqIDM2MDAgKiAxMDAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcm91dGluZVByb2ZpbGVSZWZyZXNoKHtcbiAgYWxsQ29udmVyc2F0aW9ucyxcbiAgb3VyQ29udmVyc2F0aW9uSWQsXG4gIHN0b3JhZ2UsXG5cbiAgLy8gT25seSBmb3IgdGVzdHNcbiAgZ2V0UHJvZmlsZUZuID0gZ2V0UHJvZmlsZSxcbn06IHtcbiAgYWxsQ29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+O1xuICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBzdG9yYWdlOiBQaWNrPFN0b3JhZ2VJbnRlcmZhY2UsICdnZXQnIHwgJ3B1dCc+O1xuICBnZXRQcm9maWxlRm4/OiB0eXBlb2YgZ2V0UHJvZmlsZTtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgbG9nLmluZm8oJ3JvdXRpbmVQcm9maWxlUmVmcmVzaDogc3RhcnRpbmcnKTtcblxuICBpZiAoIWhhc0Vub3VnaFRpbWVFbGFwc2VkU2luY2VMYXN0UmVmcmVzaChzdG9yYWdlKSkge1xuICAgIGxvZy5pbmZvKCdyb3V0aW5lUHJvZmlsZVJlZnJlc2g6IHRvbyBzb29uIHRvIHJlZnJlc2guIERvaW5nIG5vdGhpbmcnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2cuaW5mbygncm91dGluZVByb2ZpbGVSZWZyZXNoOiB1cGRhdGluZyBsYXN0IHJlZnJlc2ggdGltZScpO1xuICBhd2FpdCBzdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgRGF0ZS5ub3coKSk7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uc1RvUmVmcmVzaCA9IGdldENvbnZlcnNhdGlvbnNUb1JlZnJlc2goXG4gICAgYWxsQ29udmVyc2F0aW9ucyxcbiAgICBvdXJDb252ZXJzYXRpb25JZFxuICApO1xuXG4gIGxvZy5pbmZvKCdyb3V0aW5lUHJvZmlsZVJlZnJlc2g6IHN0YXJ0aW5nIHRvIHJlZnJlc2ggY29udmVyc2F0aW9ucycpO1xuXG4gIGxldCB0b3RhbENvdW50ID0gMDtcbiAgbGV0IHN1Y2Nlc3NDb3VudCA9IDA7XG5cbiAgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaENvbnZlcnNhdGlvbihcbiAgICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYHJvdXRpbmVQcm9maWxlUmVmcmVzaDogcmVmcmVzaGluZyBwcm9maWxlIGZvciAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gXG4gICAgKTtcblxuICAgIHRvdGFsQ291bnQgKz0gMTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZ2V0UHJvZmlsZUZuKGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSwgY29udmVyc2F0aW9uLmdldCgnZTE2NCcpKTtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgcm91dGluZVByb2ZpbGVSZWZyZXNoOiByZWZyZXNoZWQgcHJvZmlsZSBmb3IgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgKTtcbiAgICAgIHN1Y2Nlc3NDb3VudCArPSAxO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgcm91dGluZVByb2ZpbGVSZWZyZXNoOiByZWZyZXNoZWQgcHJvZmlsZSBmb3IgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YCxcbiAgICAgICAgZXJyPy5zdGFjayB8fCBlcnJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVmcmVzaFF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gICAgY29uY3VycmVuY3k6IDUsXG4gICAgdGltZW91dDogMTAwMCAqIDYwICogMixcbiAgICB0aHJvd09uVGltZW91dDogdHJ1ZSxcbiAgfSk7XG4gIGZvciAoY29uc3QgY29udmVyc2F0aW9uIG9mIGNvbnZlcnNhdGlvbnNUb1JlZnJlc2gpIHtcbiAgICByZWZyZXNoUXVldWUuYWRkKCgpID0+IHJlZnJlc2hDb252ZXJzYXRpb24oY29udmVyc2F0aW9uKSk7XG4gIH1cbiAgYXdhaXQgcmVmcmVzaFF1ZXVlLm9uSWRsZSgpO1xuXG4gIGxvZy5pbmZvKFxuICAgIGByb3V0aW5lUHJvZmlsZVJlZnJlc2g6IHN1Y2Nlc3NmdWxseSByZWZyZXNoZWQgJHtzdWNjZXNzQ291bnR9IG91dCBvZiAke3RvdGFsQ291bnR9IGNvbnZlcnNhdGlvbihzKWBcbiAgKTtcbn1cblxuZnVuY3Rpb24gaGFzRW5vdWdoVGltZUVsYXBzZWRTaW5jZUxhc3RSZWZyZXNoKFxuICBzdG9yYWdlOiBQaWNrPFN0b3JhZ2VJbnRlcmZhY2UsICdnZXQnPlxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0b3JlZFZhbHVlID0gc3RvcmFnZS5nZXQoU1RPUkFHRV9LRVkpO1xuXG4gIGlmIChpc05pbChzdG9yZWRWYWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChpc05vcm1hbE51bWJlcihzdG9yZWRWYWx1ZSkpIHtcbiAgICByZXR1cm4gaXNPbGRlclRoYW4oc3RvcmVkVmFsdWUsIE1JTl9FTEFQU0VEX0RVUkFUSU9OX1RPX1JFRlJFU0hfQUdBSU4pO1xuICB9XG5cbiAgYXNzZXJ0KFxuICAgIGZhbHNlLFxuICAgIGBBbiBpbnZhbGlkIHZhbHVlIHdhcyBzdG9yZWQgaW4gJHtTVE9SQUdFX0tFWX07IHRyZWF0aW5nIGl0IGFzIG5pbGBcbiAgKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldENvbnZlcnNhdGlvbnNUb1JlZnJlc2goXG4gIGNvbnZlcnNhdGlvbnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+LFxuICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBJdGVyYWJsZTxDb252ZXJzYXRpb25Nb2RlbD4ge1xuICBjb25zdCBmaWx0ZXJlZENvbnZlcnNhdGlvbnMgPSBnZXRGaWx0ZXJlZENvbnZlcnNhdGlvbnMoXG4gICAgY29udmVyc2F0aW9ucyxcbiAgICBvdXJDb252ZXJzYXRpb25JZFxuICApO1xuICByZXR1cm4gdGFrZShmaWx0ZXJlZENvbnZlcnNhdGlvbnMsIE1BWF9DT05WRVJTQVRJT05TX1RPX1JFRlJFU0gpO1xufVxuXG5mdW5jdGlvbiogZ2V0RmlsdGVyZWRDb252ZXJzYXRpb25zKFxuICBjb252ZXJzYXRpb25zOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvbk1vZGVsPixcbiAgb3VyQ29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogSXRlcmFibGU8Q29udmVyc2F0aW9uTW9kZWw+IHtcbiAgY29uc3Qgc29ydGVkID0gc29ydEJ5KGNvbnZlcnNhdGlvbnMsIGMgPT4gYy5nZXQoJ2FjdGl2ZV9hdCcpKTtcblxuICBjb25zdCBjb252ZXJzYXRpb25JZHNTZWVuID0gbmV3IFNldDxzdHJpbmc+KFtvdXJDb252ZXJzYXRpb25JZF0pO1xuXG4gIGZvciAoY29uc3QgY29udmVyc2F0aW9uIG9mIHNvcnRlZCkge1xuICAgIGNvbnN0IHR5cGUgPSBjb252ZXJzYXRpb24uZ2V0KCd0eXBlJyk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdwcml2YXRlJzpcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFjb252ZXJzYXRpb25JZHNTZWVuLmhhcyhjb252ZXJzYXRpb24uaWQpICYmXG4gICAgICAgICAgaXNDb252ZXJzYXRpb25BY3RpdmUoY29udmVyc2F0aW9uKSAmJlxuICAgICAgICAgICFoYXNSZWZyZXNoZWRQcm9maWxlUmVjZW50bHkoY29udmVyc2F0aW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZHNTZWVuLmFkZChjb252ZXJzYXRpb24uaWQpO1xuICAgICAgICAgIHlpZWxkIGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgZm9yIChjb25zdCBtZW1iZXIgb2YgY29udmVyc2F0aW9uLmdldE1lbWJlcnMoKSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFjb252ZXJzYXRpb25JZHNTZWVuLmhhcyhtZW1iZXIuaWQpICYmXG4gICAgICAgICAgICAhaGFzUmVmcmVzaGVkUHJvZmlsZVJlY2VudGx5KG1lbWJlcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkc1NlZW4uYWRkKG1lbWJlci5pZCk7XG4gICAgICAgICAgICB5aWVsZCBtZW1iZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih0eXBlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNDb252ZXJzYXRpb25BY3RpdmUoXG4gIGNvbnZlcnNhdGlvbjogUmVhZG9ubHk8Q29udmVyc2F0aW9uTW9kZWw+XG4pOiBib29sZWFuIHtcbiAgY29uc3QgYWN0aXZlQXQgPSBjb252ZXJzYXRpb24uZ2V0KCdhY3RpdmVfYXQnKTtcbiAgcmV0dXJuIChcbiAgICBpc05vcm1hbE51bWJlcihhY3RpdmVBdCkgJiZcbiAgICBhY3RpdmVBdCArIE1BWF9BR0VfVE9fQkVfQ09OU0lERVJFRF9BQ1RJVkUgPiBEYXRlLm5vdygpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGhhc1JlZnJlc2hlZFByb2ZpbGVSZWNlbnRseShcbiAgY29udmVyc2F0aW9uOiBSZWFkb25seTxDb252ZXJzYXRpb25Nb2RlbD5cbik6IGJvb2xlYW4ge1xuICBjb25zdCBwcm9maWxlTGFzdEZldGNoZWRBdCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVMYXN0RmV0Y2hlZEF0Jyk7XG4gIHJldHVybiAoXG4gICAgaXNOb3JtYWxOdW1iZXIocHJvZmlsZUxhc3RGZXRjaGVkQXQpICYmXG4gICAgcHJvZmlsZUxhc3RGZXRjaGVkQXQgKyBNQVhfQUdFX1RPX0JFX0NPTlNJREVSRURfUkVDRU5UTFlfUkVGUkVTSEVEID5cbiAgICAgIERhdGUubm93KClcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBOEI7QUFDOUIscUJBQW1CO0FBRW5CLFVBQXFCO0FBQ3JCLG9CQUF1QjtBQUN2Qiw4QkFBaUM7QUFDakMsNEJBQStCO0FBQy9CLHVCQUFxQjtBQUNyQix1QkFBNEI7QUFHNUIsd0JBQTJCO0FBRTNCLE1BQU0sY0FBYztBQUNwQixNQUFNLGtDQUFrQyxLQUFLLEtBQUssS0FBSyxLQUFLO0FBQzVELE1BQU0sOENBQThDLElBQUksS0FBSyxLQUFLLEtBQUs7QUFDdkUsTUFBTSwrQkFBK0I7QUFDckMsTUFBTSx3Q0FBd0MsS0FBSyxPQUFPO0FBRTFELHFDQUE0QztBQUFBLEVBQzFDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUdBLGVBQWU7QUFBQSxHQU1DO0FBQ2hCLE1BQUksS0FBSyxpQ0FBaUM7QUFFMUMsTUFBSSxDQUFDLHFDQUFxQyxPQUFPLEdBQUc7QUFDbEQsUUFBSSxLQUFLLDJEQUEyRDtBQUNwRTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLEtBQUssbURBQW1EO0FBQzVELFFBQU0sUUFBUSxJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUM7QUFFekMsUUFBTSx5QkFBeUIsMEJBQzdCLGtCQUNBLGlCQUNGO0FBRUEsTUFBSSxLQUFLLDBEQUEwRDtBQUVuRSxNQUFJLGFBQWE7QUFDakIsTUFBSSxlQUFlO0FBRW5CLHFDQUNFLGNBQ2U7QUFDZixRQUFJLEtBQ0YsaURBQWlELGFBQWEsYUFBYSxHQUM3RTtBQUVBLGtCQUFjO0FBQ2QsUUFBSTtBQUNGLFlBQU0sYUFBYSxhQUFhLElBQUksTUFBTSxHQUFHLGFBQWEsSUFBSSxNQUFNLENBQUM7QUFDckUsVUFBSSxLQUNGLGdEQUFnRCxhQUFhLGFBQWEsR0FDNUU7QUFDQSxzQkFBZ0I7QUFBQSxJQUNsQixTQUFTLEtBQVA7QUFDQSxVQUFJLE1BQ0YsZ0RBQWdELGFBQWEsYUFBYSxLQUMxRSxLQUFLLFNBQVMsR0FDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQXBCZSxBQXNCZixRQUFNLGVBQWUsSUFBSSx1QkFBTztBQUFBLElBQzlCLGFBQWE7QUFBQSxJQUNiLFNBQVMsTUFBTyxLQUFLO0FBQUEsSUFDckIsZ0JBQWdCO0FBQUEsRUFDbEIsQ0FBQztBQUNELGFBQVcsZ0JBQWdCLHdCQUF3QjtBQUNqRCxpQkFBYSxJQUFJLE1BQU0sb0JBQW9CLFlBQVksQ0FBQztBQUFBLEVBQzFEO0FBQ0EsUUFBTSxhQUFhLE9BQU87QUFFMUIsTUFBSSxLQUNGLGlEQUFpRCx1QkFBdUIsNEJBQzFFO0FBQ0Y7QUFwRXNCLEFBc0V0Qiw4Q0FDRSxTQUNTO0FBQ1QsUUFBTSxjQUFjLFFBQVEsSUFBSSxXQUFXO0FBRTNDLE1BQUkseUJBQU0sV0FBVyxHQUFHO0FBQ3RCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSwwQ0FBZSxXQUFXLEdBQUc7QUFDL0IsV0FBTyxrQ0FBWSxhQUFhLHFDQUFxQztBQUFBLEVBQ3ZFO0FBRUEsNEJBQ0UsT0FDQSxrQ0FBa0MsaUNBQ3BDO0FBQ0EsU0FBTztBQUNUO0FBbEJTLEFBb0JULG1DQUNFLGVBQ0EsbUJBQzZCO0FBQzdCLFFBQU0sd0JBQXdCLHlCQUM1QixlQUNBLGlCQUNGO0FBQ0EsU0FBTywyQkFBSyx1QkFBdUIsNEJBQTRCO0FBQ2pFO0FBVFMsQUFXVCxtQ0FDRSxlQUNBLG1CQUM2QjtBQUM3QixRQUFNLFNBQVMsMEJBQU8sZUFBZSxPQUFLLEVBQUUsSUFBSSxXQUFXLENBQUM7QUFFNUQsUUFBTSxzQkFBc0Isb0JBQUksSUFBWSxDQUFDLGlCQUFpQixDQUFDO0FBRS9ELGFBQVcsZ0JBQWdCLFFBQVE7QUFDakMsVUFBTSxPQUFPLGFBQWEsSUFBSSxNQUFNO0FBQ3BDLFlBQVE7QUFBQSxXQUNEO0FBQ0gsWUFDRSxDQUFDLG9CQUFvQixJQUFJLGFBQWEsRUFBRSxLQUN4QyxxQkFBcUIsWUFBWSxLQUNqQyxDQUFDLDRCQUE0QixZQUFZLEdBQ3pDO0FBQ0EsOEJBQW9CLElBQUksYUFBYSxFQUFFO0FBQ3ZDLGdCQUFNO0FBQUEsUUFDUjtBQUNBO0FBQUEsV0FDRztBQUNILG1CQUFXLFVBQVUsYUFBYSxXQUFXLEdBQUc7QUFDOUMsY0FDRSxDQUFDLG9CQUFvQixJQUFJLE9BQU8sRUFBRSxLQUNsQyxDQUFDLDRCQUE0QixNQUFNLEdBQ25DO0FBQ0EsZ0NBQW9CLElBQUksT0FBTyxFQUFFO0FBQ2pDLGtCQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFDQTtBQUFBO0FBRUEsY0FBTSw4Q0FBaUIsSUFBSTtBQUFBO0FBQUEsRUFFakM7QUFDRjtBQXBDVSxBQXNDViw4QkFDRSxjQUNTO0FBQ1QsUUFBTSxXQUFXLGFBQWEsSUFBSSxXQUFXO0FBQzdDLFNBQ0UsMENBQWUsUUFBUSxLQUN2QixXQUFXLGtDQUFrQyxLQUFLLElBQUk7QUFFMUQ7QUFSUyxBQVVULHFDQUNFLGNBQ1M7QUFDVCxRQUFNLHVCQUF1QixhQUFhLElBQUksc0JBQXNCO0FBQ3BFLFNBQ0UsMENBQWUsb0JBQW9CLEtBQ25DLHVCQUF1Qiw4Q0FDckIsS0FBSyxJQUFJO0FBRWY7QUFUUyIsCiAgIm5hbWVzIjogW10KfQo=
