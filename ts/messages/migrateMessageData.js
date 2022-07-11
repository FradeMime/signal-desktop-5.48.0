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
var migrateMessageData_exports = {};
__export(migrateMessageData_exports, {
  migrateMessageData: () => migrateMessageData
});
module.exports = __toCommonJS(migrateMessageData_exports);
var import_lodash = require("lodash");
var import_p_map = __toESM(require("p-map"));
var import_Message2 = require("../types/Message2");
var import_isNotNil = require("../util/isNotNil");
var Errors = __toESM(require("../types/errors"));
const MAX_CONCURRENCY = 5;
async function migrateMessageData({
  numMessagesPerBatch,
  upgradeMessageSchema,
  getMessagesNeedingUpgrade,
  saveMessages,
  maxVersion = import_Message2.CURRENT_SCHEMA_VERSION
}) {
  if (!(0, import_lodash.isNumber)(numMessagesPerBatch)) {
    throw new TypeError("'numMessagesPerBatch' is required");
  }
  if (!(0, import_lodash.isFunction)(upgradeMessageSchema)) {
    throw new TypeError("'upgradeMessageSchema' is required");
  }
  const startTime = Date.now();
  const fetchStartTime = Date.now();
  let messagesRequiringSchemaUpgrade;
  try {
    messagesRequiringSchemaUpgrade = await getMessagesNeedingUpgrade(numMessagesPerBatch, { maxVersion });
  } catch (error) {
    window.SignalContext.log.error("migrateMessageData.getMessagesNeedingUpgrade error:", Errors.toLogFormat(error));
    return {
      done: true,
      numProcessed: 0
    };
  }
  const fetchDuration = Date.now() - fetchStartTime;
  const upgradeStartTime = Date.now();
  const failedMessages = new Array();
  const upgradedMessages = (await (0, import_p_map.default)(messagesRequiringSchemaUpgrade, async (message) => {
    try {
      return await upgradeMessageSchema(message, { maxVersion });
    } catch (error) {
      window.SignalContext.log.error("migrateMessageData.upgradeMessageSchema error:", Errors.toLogFormat(error));
      failedMessages.push(message);
      return void 0;
    }
  }, { concurrency: MAX_CONCURRENCY })).filter(import_isNotNil.isNotNil);
  const upgradeDuration = Date.now() - upgradeStartTime;
  const saveStartTime = Date.now();
  const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
  await saveMessages([
    ...upgradedMessages,
    ...failedMessages.map((message) => ({
      ...message,
      schemaMigrationAttempts: (message.schemaMigrationAttempts ?? 0) + 1
    }))
  ], { ourUuid });
  const saveDuration = Date.now() - saveStartTime;
  const totalDuration = Date.now() - startTime;
  const numProcessed = messagesRequiringSchemaUpgrade.length;
  const done = numProcessed < numMessagesPerBatch;
  return {
    done,
    numProcessed,
    fetchDuration,
    upgradeDuration,
    saveDuration,
    totalDuration
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  migrateMessageData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWlncmF0ZU1lc3NhZ2VEYXRhLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBNYXAgZnJvbSAncC1tYXAnO1xuXG5pbXBvcnQgeyBDVVJSRU5UX1NDSEVNQV9WRVJTSU9OIH0gZnJvbSAnLi4vdHlwZXMvTWVzc2FnZTInO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi91dGlsL2lzTm90TmlsJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcblxuY29uc3QgTUFYX0NPTkNVUlJFTkNZID0gNTtcblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgbWVzc2FnZXMgaW4gZGF0YWJhc2UgYXJlIGF0IHRoZSByaWdodCBzY2hlbWEuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWdyYXRlTWVzc2FnZURhdGEoe1xuICBudW1NZXNzYWdlc1BlckJhdGNoLFxuICB1cGdyYWRlTWVzc2FnZVNjaGVtYSxcbiAgZ2V0TWVzc2FnZXNOZWVkaW5nVXBncmFkZSxcbiAgc2F2ZU1lc3NhZ2VzLFxuICBtYXhWZXJzaW9uID0gQ1VSUkVOVF9TQ0hFTUFfVkVSU0lPTixcbn06IFJlYWRvbmx5PHtcbiAgbnVtTWVzc2FnZXNQZXJCYXRjaDogbnVtYmVyO1xuICB1cGdyYWRlTWVzc2FnZVNjaGVtYTogKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgICBvcHRpb25zOiB7IG1heFZlcnNpb246IG51bWJlciB9XG4gICkgPT4gUHJvbWlzZTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+O1xuICBnZXRNZXNzYWdlc05lZWRpbmdVcGdyYWRlOiAoXG4gICAgbGltaXQ6IG51bWJlcixcbiAgICBvcHRpb25zOiB7IG1heFZlcnNpb246IG51bWJlciB9XG4gICkgPT4gUHJvbWlzZTxBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+PjtcbiAgc2F2ZU1lc3NhZ2VzOiAoXG4gICAgZGF0YTogUmVhZG9ubHlBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+LFxuICAgIG9wdGlvbnM6IHsgb3VyVXVpZDogVVVJRFN0cmluZ1R5cGUgfVxuICApID0+IFByb21pc2U8dm9pZD47XG4gIG1heFZlcnNpb24/OiBudW1iZXI7XG59Pik6IFByb21pc2U8XG4gIHwge1xuICAgICAgZG9uZTogdHJ1ZTtcbiAgICAgIG51bVByb2Nlc3NlZDogMDtcbiAgICB9XG4gIHwge1xuICAgICAgZG9uZTogYm9vbGVhbjtcbiAgICAgIG51bVByb2Nlc3NlZDogbnVtYmVyO1xuICAgICAgZmV0Y2hEdXJhdGlvbjogbnVtYmVyO1xuICAgICAgdXBncmFkZUR1cmF0aW9uOiBudW1iZXI7XG4gICAgICBzYXZlRHVyYXRpb246IG51bWJlcjtcbiAgICAgIHRvdGFsRHVyYXRpb246IG51bWJlcjtcbiAgICB9XG4+IHtcbiAgaWYgKCFpc051bWJlcihudW1NZXNzYWdlc1BlckJhdGNoKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInbnVtTWVzc2FnZXNQZXJCYXRjaCcgaXMgcmVxdWlyZWRcIik7XG4gIH1cblxuICBpZiAoIWlzRnVuY3Rpb24odXBncmFkZU1lc3NhZ2VTY2hlbWEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIid1cGdyYWRlTWVzc2FnZVNjaGVtYScgaXMgcmVxdWlyZWRcIik7XG4gIH1cblxuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0IGZldGNoU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgbGV0IG1lc3NhZ2VzUmVxdWlyaW5nU2NoZW1hVXBncmFkZTtcbiAgdHJ5IHtcbiAgICBtZXNzYWdlc1JlcXVpcmluZ1NjaGVtYVVwZ3JhZGUgPSBhd2FpdCBnZXRNZXNzYWdlc05lZWRpbmdVcGdyYWRlKFxuICAgICAgbnVtTWVzc2FnZXNQZXJCYXRjaCxcbiAgICAgIHsgbWF4VmVyc2lvbiB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuZXJyb3IoXG4gICAgICAnbWlncmF0ZU1lc3NhZ2VEYXRhLmdldE1lc3NhZ2VzTmVlZGluZ1VwZ3JhZGUgZXJyb3I6JyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBkb25lOiB0cnVlLFxuICAgICAgbnVtUHJvY2Vzc2VkOiAwLFxuICAgIH07XG4gIH1cbiAgY29uc3QgZmV0Y2hEdXJhdGlvbiA9IERhdGUubm93KCkgLSBmZXRjaFN0YXJ0VGltZTtcblxuICBjb25zdCB1cGdyYWRlU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgZmFpbGVkTWVzc2FnZXMgPSBuZXcgQXJyYXk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPigpO1xuICBjb25zdCB1cGdyYWRlZE1lc3NhZ2VzID0gKFxuICAgIGF3YWl0IHBNYXAoXG4gICAgICBtZXNzYWdlc1JlcXVpcmluZ1NjaGVtYVVwZ3JhZGUsXG4gICAgICBhc3luYyBtZXNzYWdlID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdXBncmFkZU1lc3NhZ2VTY2hlbWEobWVzc2FnZSwgeyBtYXhWZXJzaW9uIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZy5lcnJvcihcbiAgICAgICAgICAgICdtaWdyYXRlTWVzc2FnZURhdGEudXBncmFkZU1lc3NhZ2VTY2hlbWEgZXJyb3I6JyxcbiAgICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgICApO1xuICAgICAgICAgIGZhaWxlZE1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgY29uY3VycmVuY3k6IE1BWF9DT05DVVJSRU5DWSB9XG4gICAgKVxuICApLmZpbHRlcihpc05vdE5pbCk7XG4gIGNvbnN0IHVwZ3JhZGVEdXJhdGlvbiA9IERhdGUubm93KCkgLSB1cGdyYWRlU3RhcnRUaW1lO1xuXG4gIGNvbnN0IHNhdmVTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpO1xuICBhd2FpdCBzYXZlTWVzc2FnZXMoXG4gICAgW1xuICAgICAgLi4udXBncmFkZWRNZXNzYWdlcyxcblxuICAgICAgLy8gSW5jcmVtZW50IG1pZ3JhdGlvbiBhdHRlbXB0c1xuICAgICAgLi4uZmFpbGVkTWVzc2FnZXMubWFwKG1lc3NhZ2UgPT4gKHtcbiAgICAgICAgLi4ubWVzc2FnZSxcbiAgICAgICAgc2NoZW1hTWlncmF0aW9uQXR0ZW1wdHM6IChtZXNzYWdlLnNjaGVtYU1pZ3JhdGlvbkF0dGVtcHRzID8/IDApICsgMSxcbiAgICAgIH0pKSxcbiAgICBdLFxuICAgIHsgb3VyVXVpZCB9XG4gICk7XG4gIGNvbnN0IHNhdmVEdXJhdGlvbiA9IERhdGUubm93KCkgLSBzYXZlU3RhcnRUaW1lO1xuXG4gIGNvbnN0IHRvdGFsRHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICBjb25zdCBudW1Qcm9jZXNzZWQgPSBtZXNzYWdlc1JlcXVpcmluZ1NjaGVtYVVwZ3JhZGUubGVuZ3RoO1xuICBjb25zdCBkb25lID0gbnVtUHJvY2Vzc2VkIDwgbnVtTWVzc2FnZXNQZXJCYXRjaDtcbiAgcmV0dXJuIHtcbiAgICBkb25lLFxuICAgIG51bVByb2Nlc3NlZCxcbiAgICBmZXRjaER1cmF0aW9uLFxuICAgIHVwZ3JhZGVEdXJhdGlvbixcbiAgICBzYXZlRHVyYXRpb24sXG4gICAgdG90YWxEdXJhdGlvbixcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBcUM7QUFDckMsbUJBQWlCO0FBRWpCLHNCQUF1QztBQUN2QyxzQkFBeUI7QUFHekIsYUFBd0I7QUFFeEIsTUFBTSxrQkFBa0I7QUFLeEIsa0NBQXlDO0FBQUEsRUFDdkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWE7QUFBQSxHQTZCYjtBQUNBLE1BQUksQ0FBQyw0QkFBUyxtQkFBbUIsR0FBRztBQUNsQyxVQUFNLElBQUksVUFBVSxtQ0FBbUM7QUFBQSxFQUN6RDtBQUVBLE1BQUksQ0FBQyw4QkFBVyxvQkFBb0IsR0FBRztBQUNyQyxVQUFNLElBQUksVUFBVSxvQ0FBb0M7QUFBQSxFQUMxRDtBQUVBLFFBQU0sWUFBWSxLQUFLLElBQUk7QUFFM0IsUUFBTSxpQkFBaUIsS0FBSyxJQUFJO0FBQ2hDLE1BQUk7QUFDSixNQUFJO0FBQ0YscUNBQWlDLE1BQU0sMEJBQ3JDLHFCQUNBLEVBQUUsV0FBVyxDQUNmO0FBQUEsRUFDRixTQUFTLE9BQVA7QUFDQSxXQUFPLGNBQWMsSUFBSSxNQUN2Qix1REFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUNBLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLGdCQUFnQixLQUFLLElBQUksSUFBSTtBQUVuQyxRQUFNLG1CQUFtQixLQUFLLElBQUk7QUFDbEMsUUFBTSxpQkFBaUIsSUFBSSxNQUE2QjtBQUN4RCxRQUFNLG1CQUNKLE9BQU0sMEJBQ0osZ0NBQ0EsT0FBTSxZQUFXO0FBQ2YsUUFBSTtBQUNGLGFBQU8sTUFBTSxxQkFBcUIsU0FBUyxFQUFFLFdBQVcsQ0FBQztBQUFBLElBQzNELFNBQVMsT0FBUDtBQUNBLGFBQU8sY0FBYyxJQUFJLE1BQ3ZCLGtEQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQ0EscUJBQWUsS0FBSyxPQUFPO0FBQzNCLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRixHQUNBLEVBQUUsYUFBYSxnQkFBZ0IsQ0FDakMsR0FDQSxPQUFPLHdCQUFRO0FBQ2pCLFFBQU0sa0JBQWtCLEtBQUssSUFBSSxJQUFJO0FBRXJDLFFBQU0sZ0JBQWdCLEtBQUssSUFBSTtBQUUvQixRQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUN6RSxRQUFNLGFBQ0o7QUFBQSxJQUNFLEdBQUc7QUFBQSxJQUdILEdBQUcsZUFBZSxJQUFJLGFBQVk7QUFBQSxTQUM3QjtBQUFBLE1BQ0gseUJBQTBCLFNBQVEsMkJBQTJCLEtBQUs7QUFBQSxJQUNwRSxFQUFFO0FBQUEsRUFDSixHQUNBLEVBQUUsUUFBUSxDQUNaO0FBQ0EsUUFBTSxlQUFlLEtBQUssSUFBSSxJQUFJO0FBRWxDLFFBQU0sZ0JBQWdCLEtBQUssSUFBSSxJQUFJO0FBQ25DLFFBQU0sZUFBZSwrQkFBK0I7QUFDcEQsUUFBTSxPQUFPLGVBQWU7QUFDNUIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQWxIc0IiLAogICJuYW1lcyI6IFtdCn0K
