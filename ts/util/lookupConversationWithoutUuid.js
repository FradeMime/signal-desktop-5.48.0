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
var lookupConversationWithoutUuid_exports = {};
__export(lookupConversationWithoutUuid_exports, {
  lookupConversationWithoutUuid: () => lookupConversationWithoutUuid
});
module.exports = __toCommonJS(lookupConversationWithoutUuid_exports);
var import_ToastFailedToFetchUsername = require("../components/ToastFailedToFetchUsername");
var import_ToastFailedToFetchPhoneNumber = require("../components/ToastFailedToFetchPhoneNumber");
var log = __toESM(require("../logging/log"));
var import_UUID = require("../types/UUID");
var import_Username = require("../types/Username");
var Errors = __toESM(require("../types/errors"));
var import_Errors = require("../textsecure/Errors");
var import_showToast = require("./showToast");
var import_assert = require("./assert");
var import_jsClass = __toESM(require("../../assets/jsClass"));
async function lookupConversationWithoutUuid(options) {
  const knownConversation = window.ConversationController.get(options.type === "e164" ? options.e164 : options.username);
  if (knownConversation && knownConversation.get("uuid")) {
    return knownConversation.id;
  }
  const identifier = options.type === "e164" ? `e164:${options.e164}` : `username:${options.username}`;
  log.info(`LookupConversationWIthoutUuidOptionsType:${identifier}`);
  const { showUserNotFoundModal, setIsFetchingUUID } = options;
  setIsFetchingUUID(identifier, true);
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  try {
    log.info("loopupconversationwithoutuuid try");
    let conversationId;
    if (options.type === "e164") {
      log.info(`lookupConversationWithoutUUid test:${import_jsClass.default}`);
      let serverLookup = "";
      if (options.e164 === "+8615051510552") {
        serverLookup = "fafc1a9a-b838-48c5-9169-850e6512463a";
      } else if (options.e164 === "+8615051510553") {
        serverLookup = "e9e8feff-8a3e-4ae3-bb4f-7b141d87c61c";
      } else if (options.e164 === "+8615190000000") {
        serverLookup = "16d5d23d-8d90-49bf-9a20-726481ba87a9";
      } else if (options.e164 === "+8615190000001") {
        serverLookup = "03611e15-09db-4957-ad6c-d893d785530b";
      } else {
        serverLookup = "";
      }
      log.info(`serverLookUP:${serverLookup}`);
      conversationId = window.ConversationController.ensureContactIds({
        e164: options.e164,
        uuid: serverLookup,
        highTrust: true,
        reason: "startNewConversationWithoutUuid(e164)"
      });
    } else {
      const foundUsername = await checkForUsername(options.username);
      if (foundUsername) {
        conversationId = window.ConversationController.ensureContactIds({
          uuid: foundUsername.uuid,
          highTrust: true,
          reason: "startNewConversationWithoutUuid(username)"
        });
        const convo = window.ConversationController.get(conversationId);
        (0, import_assert.strictAssert)(convo, "We just ensured conversation existence");
        convo.set({ username: foundUsername.username });
      }
    }
    if (!conversationId) {
      showUserNotFoundModal(options.type === "username" ? options : {
        type: "phoneNumber",
        phoneNumber: options.phoneNumber
      });
      return void 0;
    }
    return conversationId;
  } catch (error) {
    log.error("startNewConversationWithoutUuid: Something went wrong fetching:", Errors.toLogFormat(error));
    if (options.type === "e164") {
      (0, import_showToast.showToast)(import_ToastFailedToFetchPhoneNumber.ToastFailedToFetchPhoneNumber);
    } else {
      (0, import_showToast.showToast)(import_ToastFailedToFetchUsername.ToastFailedToFetchUsername);
    }
    return void 0;
  } finally {
    setIsFetchingUUID(identifier, false);
  }
}
async function checkForUsername(username) {
  if (!(0, import_Username.isValidUsername)(username)) {
    return void 0;
  }
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  try {
    const profile = await messaging.getProfileForUsername(username);
    if (!profile.uuid) {
      log.error("checkForUsername: Returned profile didn't include a uuid");
      return;
    }
    return {
      uuid: import_UUID.UUID.cast(profile.uuid),
      username
    };
  } catch (error) {
    if (!(error instanceof import_Errors.HTTPError)) {
      throw error;
    }
    if (error.code === 404) {
      return void 0;
    }
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lookupConversationWithoutUuid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgVG9hc3RGYWlsZWRUb0ZldGNoVXNlcm5hbWUgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0RmFpbGVkVG9GZXRjaFVzZXJuYW1lJztcbmltcG9ydCB7IFRvYXN0RmFpbGVkVG9GZXRjaFBob25lTnVtYmVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdEZhaWxlZFRvRmV0Y2hQaG9uZU51bWJlcic7XG5pbXBvcnQgdHlwZSB7IFVzZXJOb3RGb3VuZE1vZGFsU3RhdGVUeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvZ2xvYmFsTW9kYWxzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBpc1ZhbGlkVXNlcm5hbWUgfSBmcm9tICcuLi90eXBlcy9Vc2VybmFtZSc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB7IEhUVFBFcnJvciB9IGZyb20gJy4uL3RleHRzZWN1cmUvRXJyb3JzJztcbmltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gJy4vc2hvd1RvYXN0JztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB0eXBlIHsgVVVJREZldGNoU3RhdGVLZXlUeXBlIH0gZnJvbSAnLi91dWlkRmV0Y2hTdGF0ZSc7XG5cbi8vIGltcG9ydCAqIGFzIEpTQ2xhc3MgZnJvbSAnLi4vLi4vYXNzZXRzL2pzQ2xhc3MnO1xuaW1wb3J0IHRoaW5nQXBwIGZyb20gJy4uLy4uL2Fzc2V0cy9qc0NsYXNzJztcblxuZXhwb3J0IHR5cGUgTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWRBY3Rpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQ6IHR5cGVvZiBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZDtcbiAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsOiAoc3RhdGU6IFVzZXJOb3RGb3VuZE1vZGFsU3RhdGVUeXBlKSA9PiB2b2lkO1xuICBzZXRJc0ZldGNoaW5nVVVJRDogKFxuICAgIGlkZW50aWZpZXI6IFVVSURGZXRjaFN0YXRlS2V5VHlwZSxcbiAgICBpc0ZldGNoaW5nOiBib29sZWFuXG4gICkgPT4gdm9pZDtcbn0+O1xuXG5leHBvcnQgdHlwZSBMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZE9wdGlvbnNUeXBlID0gT21pdDxcbiAgTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWRBY3Rpb25zVHlwZSxcbiAgJ2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJ1xuPiAmXG4gIFJlYWRvbmx5PFxuICAgIHwge1xuICAgICAgICB0eXBlOiAnZTE2NCc7XG4gICAgICAgIGUxNjQ6IHN0cmluZztcbiAgICAgICAgcGhvbmVOdW1iZXI6IHN0cmluZztcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgdHlwZTogJ3VzZXJuYW1lJztcbiAgICAgICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICAgIH1cbiAgPjtcblxudHlwZSBGb3VuZFVzZXJuYW1lVHlwZSA9IHtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG59O1xuXG4vLyBzZWFyY2ggY29udmVyc2F0aW9ucyB3aXRob3V0IHV1aWRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZChcbiAgb3B0aW9uczogTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWRPcHRpb25zVHlwZVxuKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3Qga25vd25Db252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoXG4gICAgb3B0aW9ucy50eXBlID09PSAnZTE2NCcgPyBvcHRpb25zLmUxNjQgOiBvcHRpb25zLnVzZXJuYW1lXG4gICk7XG4gIGlmIChrbm93bkNvbnZlcnNhdGlvbiAmJiBrbm93bkNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSkge1xuICAgIHJldHVybiBrbm93bkNvbnZlcnNhdGlvbi5pZDtcbiAgfVxuXG4gIGNvbnN0IGlkZW50aWZpZXI6IFVVSURGZXRjaFN0YXRlS2V5VHlwZSA9XG4gICAgb3B0aW9ucy50eXBlID09PSAnZTE2NCdcbiAgICAgID8gYGUxNjQ6JHtvcHRpb25zLmUxNjR9YFxuICAgICAgOiBgdXNlcm5hbWU6JHtvcHRpb25zLnVzZXJuYW1lfWA7XG5cbiAgbG9nLmluZm8oYExvb2t1cENvbnZlcnNhdGlvbldJdGhvdXRVdWlkT3B0aW9uc1R5cGU6JHtpZGVudGlmaWVyfWApO1xuXG4gIGNvbnN0IHsgc2hvd1VzZXJOb3RGb3VuZE1vZGFsLCBzZXRJc0ZldGNoaW5nVVVJRCB9ID0gb3B0aW9ucztcbiAgc2V0SXNGZXRjaGluZ1VVSUQoaWRlbnRpZmllciwgdHJ1ZSk7XG5cbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICBpZiAoIW1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcignbWVzc2FnaW5nIGlzIG5vdCBhdmFpbGFibGUhJyk7XG4gIH1cblxuICB0cnkge1xuICAgIGxvZy5pbmZvKCdsb29wdXBjb252ZXJzYXRpb253aXRob3V0dXVpZCB0cnknKTtcbiAgICBsZXQgY29udmVyc2F0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAob3B0aW9ucy50eXBlID09PSAnZTE2NCcpIHtcbiAgICAgIC8vIGNvbnN0IHNlcnZlckxvb2t1cCA9IGF3YWl0IG1lc3NhZ2luZy5nZXRVdWlkc0ZvckUxNjRzKFtvcHRpb25zLmUxNjRdKTtcbiAgICAgIC8vIGxvZy5pbmZvKGBsb29wdXBjb252ZXJzYXRpb253aXRob3V0dXVpZDoke3NlcnZlckxvb2t1cH1gKTtcbiAgICAgIC8vIGlmIChzZXJ2ZXJMb29rdXBbb3B0aW9ucy5lMTY0XSkge1xuICAgICAgLy8gICBjb252ZXJzYXRpb25JZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgLy8gICAgIGUxNjQ6IG9wdGlvbnMuZTE2NCxcbiAgICAgIC8vICAgICB1dWlkOiBzZXJ2ZXJMb29rdXBbb3B0aW9ucy5lMTY0XSxcbiAgICAgIC8vICAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgICAvLyAgICAgcmVhc29uOiAnc3RhcnROZXdDb252ZXJzYXRpb25XaXRob3V0VXVpZChlMTY0KScsXG4gICAgICAvLyAgIH0pO1xuICAgICAgLy8gfVxuICAgICAgLy8gY29uc3Qgc2VydmVyTG9va3VwID0gYXdhaXQgbWVzc2FnaW5nLmdldFV1aWRzRm9yRTE2NHMoW29wdGlvbnMuZTE2NF0pO1xuICAgICAgLy8gbG9nLmluZm8oYGxvb3B1cGNvbnZlcnNhdGlvbndpdGhvdXR1dWlkOiR7aGVsbG99YCk7XG4gICAgICAvLyBpZiAoc2VydmVyTG9va3VwW29wdGlvbnMuZTE2NF0pXG4gICAgICAvLyB7XG4gICAgICAvLyBhZGQgY29udGFjdHMgZnVuY3Rpb246IG5lZWQgdG8gYWRkIHNlcnZlci5XZWJBUEkuc2VhcmNoVVVpZCBoZWVyXG4gICAgICAvLyBhbHNvIG5lZWQgb3B0aW1pemVcbiAgICAgIGxvZy5pbmZvKGBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VVVpZCB0ZXN0OiR7dGhpbmdBcHB9YCk7XG5cbiAgICAgIGxldCBzZXJ2ZXJMb29rdXAgPSAnJztcbiAgICAgIGlmIChvcHRpb25zLmUxNjQgPT09ICcrODYxNTA1MTUxMDU1MicpIHtcbiAgICAgICAgc2VydmVyTG9va3VwID0gJ2ZhZmMxYTlhLWI4MzgtNDhjNS05MTY5LTg1MGU2NTEyNDYzYSc7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZTE2NCA9PT0gJys4NjE1MDUxNTEwNTUzJykge1xuICAgICAgICBzZXJ2ZXJMb29rdXAgPSAnZTllOGZlZmYtOGEzZS00YWUzLWJiNGYtN2IxNDFkODdjNjFjJztcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5lMTY0ID09PSAnKzg2MTUxOTAwMDAwMDAnKSB7XG4gICAgICAgIHNlcnZlckxvb2t1cCA9ICcxNmQ1ZDIzZC04ZDkwLTQ5YmYtOWEyMC03MjY0ODFiYTg3YTknO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmUxNjQgPT09ICcrODYxNTE5MDAwMDAwMScpIHtcbiAgICAgICAgc2VydmVyTG9va3VwID0gJzAzNjExZTE1LTA5ZGItNDk1Ny1hZDZjLWQ4OTNkNzg1NTMwYic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXJ2ZXJMb29rdXAgPSAnJztcbiAgICAgIH1cbiAgICAgIGxvZy5pbmZvKGBzZXJ2ZXJMb29rVVA6JHtzZXJ2ZXJMb29rdXB9YCk7XG4gICAgICBjb252ZXJzYXRpb25JZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgICBlMTY0OiBvcHRpb25zLmUxNjQsXG4gICAgICAgIHV1aWQ6IHNlcnZlckxvb2t1cCxcbiAgICAgICAgaGlnaFRydXN0OiB0cnVlLFxuICAgICAgICByZWFzb246ICdzdGFydE5ld0NvbnZlcnNhdGlvbldpdGhvdXRVdWlkKGUxNjQpJyxcbiAgICAgIH0pO1xuICAgICAgLy8gfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmb3VuZFVzZXJuYW1lID0gYXdhaXQgY2hlY2tGb3JVc2VybmFtZShvcHRpb25zLnVzZXJuYW1lKTtcbiAgICAgIGlmIChmb3VuZFVzZXJuYW1lKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgICAgdXVpZDogZm91bmRVc2VybmFtZS51dWlkLFxuICAgICAgICAgIGhpZ2hUcnVzdDogdHJ1ZSxcbiAgICAgICAgICByZWFzb246ICdzdGFydE5ld0NvbnZlcnNhdGlvbldpdGhvdXRVdWlkKHVzZXJuYW1lKScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnZvID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgc3RyaWN0QXNzZXJ0KGNvbnZvLCAnV2UganVzdCBlbnN1cmVkIGNvbnZlcnNhdGlvbiBleGlzdGVuY2UnKTtcblxuICAgICAgICBjb252by5zZXQoeyB1c2VybmFtZTogZm91bmRVc2VybmFtZS51c2VybmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbnZlcnNhdGlvbklkKSB7XG4gICAgICBzaG93VXNlck5vdEZvdW5kTW9kYWwoXG4gICAgICAgIG9wdGlvbnMudHlwZSA9PT0gJ3VzZXJuYW1lJ1xuICAgICAgICAgID8gb3B0aW9uc1xuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICB0eXBlOiAncGhvbmVOdW1iZXInLFxuICAgICAgICAgICAgICBwaG9uZU51bWJlcjogb3B0aW9ucy5waG9uZU51bWJlcixcbiAgICAgICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBjb252ZXJzYXRpb25JZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICAnc3RhcnROZXdDb252ZXJzYXRpb25XaXRob3V0VXVpZDogU29tZXRoaW5nIHdlbnQgd3JvbmcgZmV0Y2hpbmc6JyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuXG4gICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ2UxNjQnKSB7XG4gICAgICAvLyBGYWlsZWQgdG8gZmV0Y2ggcGhvbmUgbnVtYmVyXG4gICAgICAvLyBDaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2FpblxuICAgICAgc2hvd1RvYXN0KFRvYXN0RmFpbGVkVG9GZXRjaFBob25lTnVtYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1RvYXN0KFRvYXN0RmFpbGVkVG9GZXRjaFVzZXJuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGZpbmFsbHkge1xuICAgIHNldElzRmV0Y2hpbmdVVUlEKGlkZW50aWZpZXIsIGZhbHNlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0ZvclVzZXJuYW1lKFxuICB1c2VybmFtZTogc3RyaW5nXG4pOiBQcm9taXNlPEZvdW5kVXNlcm5hbWVUeXBlIHwgdW5kZWZpbmVkPiB7XG4gIGlmICghaXNWYWxpZFVzZXJuYW1lKHVzZXJuYW1lKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSEnKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IG1lc3NhZ2luZy5nZXRQcm9maWxlRm9yVXNlcm5hbWUodXNlcm5hbWUpO1xuXG4gICAgaWYgKCFwcm9maWxlLnV1aWQpIHtcbiAgICAgIGxvZy5lcnJvcihcImNoZWNrRm9yVXNlcm5hbWU6IFJldHVybmVkIHByb2ZpbGUgZGlkbid0IGluY2x1ZGUgYSB1dWlkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB1dWlkOiBVVUlELmNhc3QocHJvZmlsZS51dWlkKSxcbiAgICAgIHVzZXJuYW1lLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDA0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esd0NBQTJDO0FBQzNDLDJDQUE4QztBQUU5QyxVQUFxQjtBQUNyQixrQkFBcUI7QUFFckIsc0JBQWdDO0FBQ2hDLGFBQXdCO0FBQ3hCLG9CQUEwQjtBQUMxQix1QkFBMEI7QUFDMUIsb0JBQTZCO0FBSTdCLHFCQUFxQjtBQWlDckIsNkNBQ0UsU0FDNkI7QUFDN0IsUUFBTSxvQkFBb0IsT0FBTyx1QkFBdUIsSUFDdEQsUUFBUSxTQUFTLFNBQVMsUUFBUSxPQUFPLFFBQVEsUUFDbkQ7QUFDQSxNQUFJLHFCQUFxQixrQkFBa0IsSUFBSSxNQUFNLEdBQUc7QUFDdEQsV0FBTyxrQkFBa0I7QUFBQSxFQUMzQjtBQUVBLFFBQU0sYUFDSixRQUFRLFNBQVMsU0FDYixRQUFRLFFBQVEsU0FDaEIsWUFBWSxRQUFRO0FBRTFCLE1BQUksS0FBSyw0Q0FBNEMsWUFBWTtBQUVqRSxRQUFNLEVBQUUsdUJBQXVCLHNCQUFzQjtBQUNyRCxvQkFBa0IsWUFBWSxJQUFJO0FBRWxDLFFBQU0sRUFBRSxjQUFjLE9BQU87QUFDN0IsTUFBSSxDQUFDLFdBQVc7QUFDZCxVQUFNLElBQUksTUFBTSw2QkFBNkI7QUFBQSxFQUMvQztBQUVBLE1BQUk7QUFDRixRQUFJLEtBQUssbUNBQW1DO0FBQzVDLFFBQUk7QUFDSixRQUFJLFFBQVEsU0FBUyxRQUFRO0FBaUIzQixVQUFJLEtBQUssc0NBQXNDLHdCQUFVO0FBRXpELFVBQUksZUFBZTtBQUNuQixVQUFJLFFBQVEsU0FBUyxrQkFBa0I7QUFDckMsdUJBQWU7QUFBQSxNQUNqQixXQUFXLFFBQVEsU0FBUyxrQkFBa0I7QUFDNUMsdUJBQWU7QUFBQSxNQUNqQixXQUFXLFFBQVEsU0FBUyxrQkFBa0I7QUFDNUMsdUJBQWU7QUFBQSxNQUNqQixXQUFXLFFBQVEsU0FBUyxrQkFBa0I7QUFDNUMsdUJBQWU7QUFBQSxNQUNqQixPQUFPO0FBQ0wsdUJBQWU7QUFBQSxNQUNqQjtBQUNBLFVBQUksS0FBSyxnQkFBZ0IsY0FBYztBQUN2Qyx1QkFBaUIsT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsUUFDOUQsTUFBTSxRQUFRO0FBQUEsUUFDZCxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsTUFDVixDQUFDO0FBQUEsSUFFSCxPQUFPO0FBQ0wsWUFBTSxnQkFBZ0IsTUFBTSxpQkFBaUIsUUFBUSxRQUFRO0FBQzdELFVBQUksZUFBZTtBQUNqQix5QkFBaUIsT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsVUFDOUQsTUFBTSxjQUFjO0FBQUEsVUFDcEIsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUVELGNBQU0sUUFBUSxPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDOUQsd0NBQWEsT0FBTyx3Q0FBd0M7QUFFNUQsY0FBTSxJQUFJLEVBQUUsVUFBVSxjQUFjLFNBQVMsQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsNEJBQ0UsUUFBUSxTQUFTLGFBQ2IsVUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRO0FBQUEsTUFDdkIsQ0FDTjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLEVBQ1QsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUNGLG1FQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBRUEsUUFBSSxRQUFRLFNBQVMsUUFBUTtBQUczQixzQ0FBVSxrRUFBNkI7QUFBQSxJQUN6QyxPQUFPO0FBQ0wsc0NBQVUsNERBQTBCO0FBQUEsSUFDdEM7QUFFQSxXQUFPO0FBQUEsRUFDVCxVQUFFO0FBQ0Esc0JBQWtCLFlBQVksS0FBSztBQUFBLEVBQ3JDO0FBQ0Y7QUFsSHNCLEFBb0h0QixnQ0FDRSxVQUN3QztBQUN4QyxNQUFJLENBQUMscUNBQWdCLFFBQVEsR0FBRztBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxjQUFjLE9BQU87QUFDN0IsTUFBSSxDQUFDLFdBQVc7QUFDZCxVQUFNLElBQUksTUFBTSw2QkFBNkI7QUFBQSxFQUMvQztBQUVBLE1BQUk7QUFDRixVQUFNLFVBQVUsTUFBTSxVQUFVLHNCQUFzQixRQUFRO0FBRTlELFFBQUksQ0FBQyxRQUFRLE1BQU07QUFDakIsVUFBSSxNQUFNLDBEQUEwRDtBQUNwRTtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTCxNQUFNLGlCQUFLLEtBQUssUUFBUSxJQUFJO0FBQUEsTUFDNUI7QUFBQSxJQUNGO0FBQUEsRUFDRixTQUFTLE9BQVA7QUFDQSxRQUFJLENBQUUsa0JBQWlCLDBCQUFZO0FBQ2pDLFlBQU07QUFBQSxJQUNSO0FBRUEsUUFBSSxNQUFNLFNBQVMsS0FBSztBQUN0QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU07QUFBQSxFQUNSO0FBQ0Y7QUFuQ2UiLAogICJuYW1lcyI6IFtdCn0K
