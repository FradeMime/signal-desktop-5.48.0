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
var fakeLookupConversationWithoutUuid_exports = {};
__export(fakeLookupConversationWithoutUuid_exports, {
  makeFakeLookupConversationWithoutUuid: () => makeFakeLookupConversationWithoutUuid,
  useUuidFetchState: () => useUuidFetchState
});
module.exports = __toCommonJS(fakeLookupConversationWithoutUuid_exports);
var import_react = require("react");
var import_sleep = require("../../util/sleep");
var durations = __toESM(require("../../util/durations"));
var import_getDefaultConversation = require("./getDefaultConversation");
const VALID_IDENTIFIERS = /* @__PURE__ */ new Set([
  "e164:+12125551234",
  "username:bobross"
]);
function makeFakeLookupConversationWithoutUuid(saveConversation) {
  const cache = /* @__PURE__ */ new Map();
  return async (options) => {
    const identifier = options.type === "e164" ? `e164:${options.e164}` : `username:${options.username}`;
    let result = cache.get(identifier);
    if (result) {
      return result.id;
    }
    if (VALID_IDENTIFIERS.has(identifier) && saveConversation) {
      result = (0, import_getDefaultConversation.getDefaultConversation)({
        firstName: void 0,
        avatarPath: void 0,
        name: void 0,
        profileName: void 0,
        ...options.type === "e164" ? {
          title: options.e164,
          e164: options.e164,
          phoneNumber: options.e164
        } : {
          title: `@${options.username}`,
          username: options.username
        }
      });
      cache.set(identifier, result);
      saveConversation(result);
    }
    options.setIsFetchingUUID(identifier, true);
    await (0, import_sleep.sleep)(durations.SECOND);
    options.setIsFetchingUUID(identifier, false);
    if (!result) {
      options.showUserNotFoundModal(options.type === "username" ? options : {
        type: "phoneNumber",
        phoneNumber: options.phoneNumber
      });
      return void 0;
    }
    return result.id;
  };
}
function useUuidFetchState(initial = {}) {
  const [uuidFetchState, setUuidFetchState] = (0, import_react.useState)(initial);
  const setIsFetchingUUID = /* @__PURE__ */ __name((key, value) => {
    setUuidFetchState((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  }, "setIsFetchingUUID");
  return [uuidFetchState, setIsFetchingUUID];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeFakeLookupConversationWithoutUuid,
  useUuidFetchState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmFrZUxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIFVVSURGZXRjaFN0YXRlVHlwZSxcbiAgVVVJREZldGNoU3RhdGVLZXlUeXBlLFxufSBmcm9tICcuLi8uLi91dGlsL3V1aWRGZXRjaFN0YXRlJztcbmltcG9ydCB0eXBlIHsgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQgfSBmcm9tICcuLi8uLi91dGlsL2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGVlcCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuY29uc3QgVkFMSURfSURFTlRJRklFUlMgPSBuZXcgU2V0PFVVSURGZXRjaFN0YXRlS2V5VHlwZT4oW1xuICAnZTE2NDorMTIxMjU1NTEyMzQnLFxuICAndXNlcm5hbWU6Ym9icm9zcycsXG5dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VGYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQoXG4gIHNhdmVDb252ZXJzYXRpb24/OiAoY29udm86IENvbnZlcnNhdGlvblR5cGUpID0+IHZvaWRcbik6IHR5cGVvZiBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCB7XG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcDxVVUlERmV0Y2hTdGF0ZUtleVR5cGUsIENvbnZlcnNhdGlvblR5cGU+KCk7XG5cbiAgcmV0dXJuIGFzeW5jIG9wdGlvbnMgPT4ge1xuICAgIGNvbnN0IGlkZW50aWZpZXI6IFVVSURGZXRjaFN0YXRlS2V5VHlwZSA9XG4gICAgICBvcHRpb25zLnR5cGUgPT09ICdlMTY0J1xuICAgICAgICA/IGBlMTY0OiR7b3B0aW9ucy5lMTY0fWBcbiAgICAgICAgOiBgdXNlcm5hbWU6JHtvcHRpb25zLnVzZXJuYW1lfWA7XG5cbiAgICBsZXQgcmVzdWx0ID0gY2FjaGUuZ2V0KGlkZW50aWZpZXIpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuaWQ7XG4gICAgfVxuXG4gICAgaWYgKFZBTElEX0lERU5USUZJRVJTLmhhcyhpZGVudGlmaWVyKSAmJiBzYXZlQ29udmVyc2F0aW9uKSB7XG4gICAgICByZXN1bHQgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgLy8gV2UgZG9uJ3QgcmVhbGx5IGtub3cgYW55dGhpbmcgYWJvdXQgdGhlIGNvbnRhY3RcbiAgICAgICAgZmlyc3ROYW1lOiB1bmRlZmluZWQsXG4gICAgICAgIGF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgbmFtZTogdW5kZWZpbmVkLFxuICAgICAgICBwcm9maWxlTmFtZTogdW5kZWZpbmVkLFxuXG4gICAgICAgIC4uLihvcHRpb25zLnR5cGUgPT09ICdlMTY0J1xuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lMTY0LFxuICAgICAgICAgICAgICBlMTY0OiBvcHRpb25zLmUxNjQsXG4gICAgICAgICAgICAgIHBob25lTnVtYmVyOiBvcHRpb25zLmUxNjQsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBgQCR7b3B0aW9ucy51c2VybmFtZX1gLFxuICAgICAgICAgICAgICB1c2VybmFtZTogb3B0aW9ucy51c2VybmFtZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgICBjYWNoZS5zZXQoaWRlbnRpZmllciwgcmVzdWx0KTtcblxuICAgICAgc2F2ZUNvbnZlcnNhdGlvbihyZXN1bHQpO1xuICAgIH1cblxuICAgIG9wdGlvbnMuc2V0SXNGZXRjaGluZ1VVSUQoaWRlbnRpZmllciwgdHJ1ZSk7XG5cbiAgICBhd2FpdCBzbGVlcChkdXJhdGlvbnMuU0VDT05EKTtcblxuICAgIG9wdGlvbnMuc2V0SXNGZXRjaGluZ1VVSUQoaWRlbnRpZmllciwgZmFsc2UpO1xuXG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIG9wdGlvbnMuc2hvd1VzZXJOb3RGb3VuZE1vZGFsKFxuICAgICAgICBvcHRpb25zLnR5cGUgPT09ICd1c2VybmFtZSdcbiAgICAgICAgICA/IG9wdGlvbnNcbiAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3Bob25lTnVtYmVyJyxcbiAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IG9wdGlvbnMucGhvbmVOdW1iZXIsXG4gICAgICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0LmlkO1xuICB9O1xufVxuXG50eXBlIFNldElzRmV0Y2hpbmdVVUlEVHlwZSA9IChcbiAgaWRlbnRpZmllcjogVVVJREZldGNoU3RhdGVLZXlUeXBlLFxuICBpc0ZldGNoaW5nOiBib29sZWFuXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VVdWlkRmV0Y2hTdGF0ZShcbiAgaW5pdGlhbDogVVVJREZldGNoU3RhdGVUeXBlID0ge31cbik6IFtVVUlERmV0Y2hTdGF0ZVR5cGUsIFNldElzRmV0Y2hpbmdVVUlEVHlwZV0ge1xuICBjb25zdCBbdXVpZEZldGNoU3RhdGUsIHNldFV1aWRGZXRjaFN0YXRlXSA9IHVzZVN0YXRlKGluaXRpYWwpO1xuXG4gIGNvbnN0IHNldElzRmV0Y2hpbmdVVUlEOiBTZXRJc0ZldGNoaW5nVVVJRFR5cGUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIHNldFV1aWRGZXRjaFN0YXRlKHByZXYgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2tleV06IHZhbHVlLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gW3V1aWRGZXRjaFN0YXRlLCBzZXRJc0ZldGNoaW5nVVVJRF07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBeUI7QUFPekIsbUJBQXNCO0FBQ3RCLGdCQUEyQjtBQUUzQixvQ0FBdUM7QUFFdkMsTUFBTSxvQkFBb0Isb0JBQUksSUFBMkI7QUFBQSxFQUN2RDtBQUFBLEVBQ0E7QUFDRixDQUFDO0FBRU0sK0NBQ0wsa0JBQ3NDO0FBQ3RDLFFBQU0sUUFBUSxvQkFBSSxJQUE2QztBQUUvRCxTQUFPLE9BQU0sWUFBVztBQUN0QixVQUFNLGFBQ0osUUFBUSxTQUFTLFNBQ2IsUUFBUSxRQUFRLFNBQ2hCLFlBQVksUUFBUTtBQUUxQixRQUFJLFNBQVMsTUFBTSxJQUFJLFVBQVU7QUFDakMsUUFBSSxRQUFRO0FBQ1YsYUFBTyxPQUFPO0FBQUEsSUFDaEI7QUFFQSxRQUFJLGtCQUFrQixJQUFJLFVBQVUsS0FBSyxrQkFBa0I7QUFDekQsZUFBUywwREFBdUI7QUFBQSxRQUU5QixXQUFXO0FBQUEsUUFDWCxZQUFZO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsV0FFVCxRQUFRLFNBQVMsU0FDakI7QUFBQSxVQUNFLE9BQU8sUUFBUTtBQUFBLFVBQ2YsTUFBTSxRQUFRO0FBQUEsVUFDZCxhQUFhLFFBQVE7QUFBQSxRQUN2QixJQUNBO0FBQUEsVUFDRSxPQUFPLElBQUksUUFBUTtBQUFBLFVBQ25CLFVBQVUsUUFBUTtBQUFBLFFBQ3BCO0FBQUEsTUFDTixDQUFDO0FBQ0QsWUFBTSxJQUFJLFlBQVksTUFBTTtBQUU1Qix1QkFBaUIsTUFBTTtBQUFBLElBQ3pCO0FBRUEsWUFBUSxrQkFBa0IsWUFBWSxJQUFJO0FBRTFDLFVBQU0sd0JBQU0sVUFBVSxNQUFNO0FBRTVCLFlBQVEsa0JBQWtCLFlBQVksS0FBSztBQUUzQyxRQUFJLENBQUMsUUFBUTtBQUNYLGNBQVEsc0JBQ04sUUFBUSxTQUFTLGFBQ2IsVUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRO0FBQUEsTUFDdkIsQ0FDTjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFDRjtBQTVEZ0IsQUFtRVQsMkJBQ0wsVUFBOEIsQ0FBQyxHQUNjO0FBQzdDLFFBQU0sQ0FBQyxnQkFBZ0IscUJBQXFCLDJCQUFTLE9BQU87QUFFNUQsUUFBTSxvQkFBMkMsd0JBQUMsS0FBSyxVQUFVO0FBQy9ELHNCQUFrQixVQUFRO0FBQ3hCLGFBQU87QUFBQSxXQUNGO0FBQUEsU0FDRixNQUFNO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FQaUQ7QUFTakQsU0FBTyxDQUFDLGdCQUFnQixpQkFBaUI7QUFDM0M7QUFmZ0IiLAogICJuYW1lcyI6IFtdCn0K
