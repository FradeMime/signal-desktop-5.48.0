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
var safetyNumber_exports = {};
__export(safetyNumber_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(safetyNumber_exports);
var import_safetyNumber = require("../../util/safetyNumber");
var import_contactVerification = require("../../shims/contactVerification");
var log = __toESM(require("../../logging/log"));
const GENERATE = "safetyNumber/GENERATE";
const GENERATE_FULFILLED = "safetyNumber/GENERATE_FULFILLED";
const TOGGLE_VERIFIED = "safetyNumber/TOGGLE_VERIFIED";
const TOGGLE_VERIFIED_FULFILLED = "safetyNumber/TOGGLE_VERIFIED_FULFILLED";
const TOGGLE_VERIFIED_PENDING = "safetyNumber/TOGGLE_VERIFIED_PENDING";
function generate(contact) {
  return {
    type: GENERATE,
    payload: doGenerate(contact)
  };
}
async function doGenerate(contact) {
  const securityNumberBlock = await (0, import_safetyNumber.generateSecurityNumberBlock)(contact);
  return {
    contact,
    safetyNumber: securityNumberBlock.join(" ")
  };
}
function toggleVerified(contact) {
  return {
    type: TOGGLE_VERIFIED,
    payload: {
      data: { contact },
      promise: doToggleVerified(contact)
    }
  };
}
async function alterVerification(contact) {
  try {
    await (0, import_contactVerification.toggleVerification)(contact.id);
  } catch (result) {
    if (result instanceof Error) {
      if (result.name === "OutgoingIdentityKeyError") {
        throw result;
      } else {
        log.error("failed to toggle verified:", result && result.stack ? result.stack : result);
      }
    } else {
      const keyError = result.errors.find((error) => error.name === "OutgoingIdentityKeyError");
      if (keyError) {
        throw keyError;
      } else {
        result.errors.forEach((error) => {
          log.error("failed to toggle verified:", error && error.stack ? error.stack : error);
        });
      }
    }
  }
}
async function doToggleVerified(contact) {
  try {
    await alterVerification(contact);
  } catch (err) {
    if (err.name === "OutgoingIdentityKeyError") {
      await (0, import_contactVerification.reloadProfiles)(contact.id);
      const securityNumberBlock = await (0, import_safetyNumber.generateSecurityNumberBlock)(contact);
      return {
        contact,
        safetyNumber: securityNumberBlock.join(" "),
        safetyNumberChanged: true
      };
    }
  }
  return { contact };
}
const actions = {
  generateSafetyNumber: generate,
  toggleVerified
};
function getEmptyState() {
  return {
    contacts: {}
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === TOGGLE_VERIFIED_PENDING) {
    const { contact } = action.payload;
    const { id } = contact;
    const record = state.contacts[id];
    return {
      contacts: {
        ...state.contacts,
        [id]: {
          ...record,
          safetyNumberChanged: false,
          verificationDisabled: true
        }
      }
    };
  }
  if (action.type === TOGGLE_VERIFIED_FULFILLED) {
    const { contact, ...restProps } = action.payload;
    const { id } = contact;
    const record = state.contacts[id];
    return {
      contacts: {
        ...state.contacts,
        [id]: {
          ...record,
          ...restProps,
          verificationDisabled: false
        }
      }
    };
  }
  if (action.type === GENERATE_FULFILLED) {
    const { contact, safetyNumber } = action.payload;
    const { id } = contact;
    const record = state.contacts[id];
    return {
      contacts: {
        ...state.contacts,
        [id]: {
          ...record,
          safetyNumber
        }
      }
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2FmZXR5TnVtYmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGdlbmVyYXRlU2VjdXJpdHlOdW1iZXJCbG9jayB9IGZyb20gJy4uLy4uL3V0aWwvc2FmZXR5TnVtYmVyJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4vY29udmVyc2F0aW9ucyc7XG5pbXBvcnQge1xuICByZWxvYWRQcm9maWxlcyxcbiAgdG9nZ2xlVmVyaWZpY2F0aW9uLFxufSBmcm9tICcuLi8uLi9zaGltcy9jb250YWN0VmVyaWZpY2F0aW9uJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCB0eXBlIFNhZmV0eU51bWJlckNvbnRhY3RUeXBlID0ge1xuICBzYWZldHlOdW1iZXI6IHN0cmluZztcbiAgc2FmZXR5TnVtYmVyQ2hhbmdlZD86IGJvb2xlYW47XG4gIHZlcmlmaWNhdGlvbkRpc2FibGVkOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgU2FmZXR5TnVtYmVyU3RhdGVUeXBlID0ge1xuICBjb250YWN0czoge1xuICAgIFtrZXk6IHN0cmluZ106IFNhZmV0eU51bWJlckNvbnRhY3RUeXBlO1xuICB9O1xufTtcblxuY29uc3QgR0VORVJBVEUgPSAnc2FmZXR5TnVtYmVyL0dFTkVSQVRFJztcbmNvbnN0IEdFTkVSQVRFX0ZVTEZJTExFRCA9ICdzYWZldHlOdW1iZXIvR0VORVJBVEVfRlVMRklMTEVEJztcbmNvbnN0IFRPR0dMRV9WRVJJRklFRCA9ICdzYWZldHlOdW1iZXIvVE9HR0xFX1ZFUklGSUVEJztcbmNvbnN0IFRPR0dMRV9WRVJJRklFRF9GVUxGSUxMRUQgPSAnc2FmZXR5TnVtYmVyL1RPR0dMRV9WRVJJRklFRF9GVUxGSUxMRUQnO1xuY29uc3QgVE9HR0xFX1ZFUklGSUVEX1BFTkRJTkcgPSAnc2FmZXR5TnVtYmVyL1RPR0dMRV9WRVJJRklFRF9QRU5ESU5HJztcblxudHlwZSBHZW5lcmF0ZUFzeW5jQWN0aW9uVHlwZSA9IHtcbiAgY29udGFjdDogQ29udmVyc2F0aW9uVHlwZTtcbiAgc2FmZXR5TnVtYmVyOiBzdHJpbmc7XG59O1xuXG50eXBlIEdlbmVyYXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ3NhZmV0eU51bWJlci9HRU5FUkFURSc7XG4gIHBheWxvYWQ6IFByb21pc2U8R2VuZXJhdGVBc3luY0FjdGlvblR5cGU+O1xufTtcblxudHlwZSBHZW5lcmF0ZUZ1bGZpbGxlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdzYWZldHlOdW1iZXIvR0VORVJBVEVfRlVMRklMTEVEJztcbiAgcGF5bG9hZDogR2VuZXJhdGVBc3luY0FjdGlvblR5cGU7XG59O1xuXG50eXBlIFRvZ2dsZVZlcmlmaWVkQXN5bmNBY3Rpb25UeXBlID0ge1xuICBjb250YWN0OiBDb252ZXJzYXRpb25UeXBlO1xuICBzYWZldHlOdW1iZXI/OiBzdHJpbmc7XG4gIHNhZmV0eU51bWJlckNoYW5nZWQ/OiBib29sZWFuO1xufTtcblxudHlwZSBUb2dnbGVWZXJpZmllZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdzYWZldHlOdW1iZXIvVE9HR0xFX1ZFUklGSUVEJztcbiAgcGF5bG9hZDoge1xuICAgIGRhdGE6IHsgY29udGFjdDogQ29udmVyc2F0aW9uVHlwZSB9O1xuICAgIHByb21pc2U6IFByb21pc2U8VG9nZ2xlVmVyaWZpZWRBc3luY0FjdGlvblR5cGU+O1xuICB9O1xufTtcblxudHlwZSBUb2dnbGVWZXJpZmllZFBlbmRpbmdBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnc2FmZXR5TnVtYmVyL1RPR0dMRV9WRVJJRklFRF9QRU5ESU5HJztcbiAgcGF5bG9hZDogVG9nZ2xlVmVyaWZpZWRBc3luY0FjdGlvblR5cGU7XG59O1xuXG50eXBlIFRvZ2dsZVZlcmlmaWVkRnVsZmlsbGVkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ3NhZmV0eU51bWJlci9UT0dHTEVfVkVSSUZJRURfRlVMRklMTEVEJztcbiAgcGF5bG9hZDogVG9nZ2xlVmVyaWZpZWRBc3luY0FjdGlvblR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBTYWZldHlOdW1iZXJBY3Rpb25UeXBlID1cbiAgfCBHZW5lcmF0ZUFjdGlvblR5cGVcbiAgfCBHZW5lcmF0ZUZ1bGZpbGxlZEFjdGlvblR5cGVcbiAgfCBUb2dnbGVWZXJpZmllZEFjdGlvblR5cGVcbiAgfCBUb2dnbGVWZXJpZmllZFBlbmRpbmdBY3Rpb25UeXBlXG4gIHwgVG9nZ2xlVmVyaWZpZWRGdWxmaWxsZWRBY3Rpb25UeXBlO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShjb250YWN0OiBDb252ZXJzYXRpb25UeXBlKTogR2VuZXJhdGVBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBHRU5FUkFURSxcbiAgICBwYXlsb2FkOiBkb0dlbmVyYXRlKGNvbnRhY3QpLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb0dlbmVyYXRlKFxuICBjb250YWN0OiBDb252ZXJzYXRpb25UeXBlXG4pOiBQcm9taXNlPEdlbmVyYXRlQXN5bmNBY3Rpb25UeXBlPiB7XG4gIGNvbnN0IHNlY3VyaXR5TnVtYmVyQmxvY2sgPSBhd2FpdCBnZW5lcmF0ZVNlY3VyaXR5TnVtYmVyQmxvY2soY29udGFjdCk7XG4gIHJldHVybiB7XG4gICAgY29udGFjdCxcbiAgICBzYWZldHlOdW1iZXI6IHNlY3VyaXR5TnVtYmVyQmxvY2suam9pbignICcpLFxuICB9O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVWZXJpZmllZChjb250YWN0OiBDb252ZXJzYXRpb25UeXBlKTogVG9nZ2xlVmVyaWZpZWRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUT0dHTEVfVkVSSUZJRUQsXG4gICAgcGF5bG9hZDoge1xuICAgICAgZGF0YTogeyBjb250YWN0IH0sXG4gICAgICBwcm9taXNlOiBkb1RvZ2dsZVZlcmlmaWVkKGNvbnRhY3QpLFxuICAgIH0sXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFsdGVyVmVyaWZpY2F0aW9uKGNvbnRhY3Q6IENvbnZlcnNhdGlvblR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0b2dnbGVWZXJpZmljYXRpb24oY29udGFjdC5pZCk7XG4gIH0gY2F0Y2ggKHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgaWYgKHJlc3VsdC5uYW1lID09PSAnT3V0Z29pbmdJZGVudGl0eUtleUVycm9yJykge1xuICAgICAgICB0aHJvdyByZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ2ZhaWxlZCB0byB0b2dnbGUgdmVyaWZpZWQ6JyxcbiAgICAgICAgICByZXN1bHQgJiYgcmVzdWx0LnN0YWNrID8gcmVzdWx0LnN0YWNrIDogcmVzdWx0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGtleUVycm9yID0gcmVzdWx0LmVycm9ycy5maW5kKFxuICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiBlcnJvci5uYW1lID09PSAnT3V0Z29pbmdJZGVudGl0eUtleUVycm9yJ1xuICAgICAgKTtcbiAgICAgIGlmIChrZXlFcnJvcikge1xuICAgICAgICB0aHJvdyBrZXlFcnJvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5lcnJvcnMuZm9yRWFjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ2ZhaWxlZCB0byB0b2dnbGUgdmVyaWZpZWQ6JyxcbiAgICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb1RvZ2dsZVZlcmlmaWVkKFxuICBjb250YWN0OiBDb252ZXJzYXRpb25UeXBlXG4pOiBQcm9taXNlPFRvZ2dsZVZlcmlmaWVkQXN5bmNBY3Rpb25UeXBlPiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgYWx0ZXJWZXJpZmljYXRpb24oY29udGFjdCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIubmFtZSA9PT0gJ091dGdvaW5nSWRlbnRpdHlLZXlFcnJvcicpIHtcbiAgICAgIGF3YWl0IHJlbG9hZFByb2ZpbGVzKGNvbnRhY3QuaWQpO1xuICAgICAgY29uc3Qgc2VjdXJpdHlOdW1iZXJCbG9jayA9IGF3YWl0IGdlbmVyYXRlU2VjdXJpdHlOdW1iZXJCbG9jayhjb250YWN0KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFjdCxcbiAgICAgICAgc2FmZXR5TnVtYmVyOiBzZWN1cml0eU51bWJlckJsb2NrLmpvaW4oJyAnKSxcbiAgICAgICAgc2FmZXR5TnVtYmVyQ2hhbmdlZDogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgY29udGFjdCB9O1xufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgZ2VuZXJhdGVTYWZldHlOdW1iZXI6IGdlbmVyYXRlLFxuICB0b2dnbGVWZXJpZmllZCxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IFNhZmV0eU51bWJlclN0YXRlVHlwZSB7XG4gIHJldHVybiB7XG4gICAgY29udGFjdHM6IHt9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PFNhZmV0eU51bWJlclN0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8U2FmZXR5TnVtYmVyQWN0aW9uVHlwZT5cbik6IFNhZmV0eU51bWJlclN0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gVE9HR0xFX1ZFUklGSUVEX1BFTkRJTkcpIHtcbiAgICBjb25zdCB7IGNvbnRhY3QgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIGNvbnN0IHsgaWQgfSA9IGNvbnRhY3Q7XG4gICAgY29uc3QgcmVjb3JkID0gc3RhdGUuY29udGFjdHNbaWRdO1xuICAgIHJldHVybiB7XG4gICAgICBjb250YWN0czoge1xuICAgICAgICAuLi5zdGF0ZS5jb250YWN0cyxcbiAgICAgICAgW2lkXToge1xuICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICBzYWZldHlOdW1iZXJDaGFuZ2VkOiBmYWxzZSxcbiAgICAgICAgICB2ZXJpZmljYXRpb25EaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gVE9HR0xFX1ZFUklGSUVEX0ZVTEZJTExFRCkge1xuICAgIGNvbnN0IHsgY29udGFjdCwgLi4ucmVzdFByb3BzIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCB7IGlkIH0gPSBjb250YWN0O1xuICAgIGNvbnN0IHJlY29yZCA9IHN0YXRlLmNvbnRhY3RzW2lkXTtcbiAgICByZXR1cm4ge1xuICAgICAgY29udGFjdHM6IHtcbiAgICAgICAgLi4uc3RhdGUuY29udGFjdHMsXG4gICAgICAgIFtpZF06IHtcbiAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgLi4ucmVzdFByb3BzLFxuICAgICAgICAgIHZlcmlmaWNhdGlvbkRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gR0VORVJBVEVfRlVMRklMTEVEKSB7XG4gICAgY29uc3QgeyBjb250YWN0LCBzYWZldHlOdW1iZXIgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIGNvbnN0IHsgaWQgfSA9IGNvbnRhY3Q7XG4gICAgY29uc3QgcmVjb3JkID0gc3RhdGUuY29udGFjdHNbaWRdO1xuICAgIHJldHVybiB7XG4gICAgICBjb250YWN0czoge1xuICAgICAgICAuLi5zdGF0ZS5jb250YWN0cyxcbiAgICAgICAgW2lkXToge1xuICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICBzYWZldHlOdW1iZXIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLDBCQUE0QztBQUU1QyxpQ0FHTztBQUNQLFVBQXFCO0FBY3JCLE1BQU0sV0FBVztBQUNqQixNQUFNLHFCQUFxQjtBQUMzQixNQUFNLGtCQUFrQjtBQUN4QixNQUFNLDRCQUE0QjtBQUNsQyxNQUFNLDBCQUEwQjtBQWdEaEMsa0JBQWtCLFNBQStDO0FBQy9ELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVMsV0FBVyxPQUFPO0FBQUEsRUFDN0I7QUFDRjtBQUxTLEFBT1QsMEJBQ0UsU0FDa0M7QUFDbEMsUUFBTSxzQkFBc0IsTUFBTSxxREFBNEIsT0FBTztBQUNyRSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsY0FBYyxvQkFBb0IsS0FBSyxHQUFHO0FBQUEsRUFDNUM7QUFDRjtBQVJlLEFBVWYsd0JBQXdCLFNBQXFEO0FBQzNFLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE1BQU0sRUFBRSxRQUFRO0FBQUEsTUFDaEIsU0FBUyxpQkFBaUIsT0FBTztBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUNGO0FBUlMsQUFVVCxpQ0FBaUMsU0FBMEM7QUFDekUsTUFBSTtBQUNGLFVBQU0sbURBQW1CLFFBQVEsRUFBRTtBQUFBLEVBQ3JDLFNBQVMsUUFBUDtBQUNBLFFBQUksa0JBQWtCLE9BQU87QUFDM0IsVUFBSSxPQUFPLFNBQVMsNEJBQTRCO0FBQzlDLGNB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
