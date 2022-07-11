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
var accounts_exports = {};
__export(accounts_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(accounts_exports);
var Errors = __toESM(require("../../types/errors"));
var log = __toESM(require("../../logging/log"));
const actions = {
  checkForAccount
};
function checkForAccount(phoneNumber) {
  return async (dispatch, getState) => {
    if (!window.textsecure.messaging) {
      dispatch({
        type: "NOOP",
        payload: null
      });
      return;
    }
    const conversation = window.ConversationController.get(phoneNumber);
    if (conversation && conversation.get("uuid")) {
      log.error(`checkForAccount: found ${phoneNumber} in existing contacts`);
      const uuid2 = conversation.get("uuid");
      dispatch({
        type: "accounts/UPDATE",
        payload: {
          phoneNumber,
          uuid: uuid2
        }
      });
      return;
    }
    const state = getState();
    const existing = Object.prototype.hasOwnProperty.call(state.accounts.accounts, phoneNumber);
    if (existing) {
      dispatch({
        type: "NOOP",
        payload: null
      });
    }
    let uuid;
    log.error(`checkForAccount: looking ${phoneNumber} up on server`);
    try {
      const uuidLookup = await window.textsecure.messaging.getUuidsForE164s([
        phoneNumber
      ]);
      uuid = uuidLookup[phoneNumber] || void 0;
    } catch (error) {
      log.error("checkForAccount:", Errors.toLogFormat(error));
    }
    dispatch({
      type: "accounts/UPDATE",
      payload: {
        phoneNumber,
        uuid
      }
    });
  };
}
function getEmptyState() {
  return {
    accounts: {}
  };
}
function reducer(state = getEmptyState(), action) {
  if (!state) {
    return getEmptyState();
  }
  if (action.type === "accounts/UPDATE") {
    const { payload } = action;
    const { phoneNumber, uuid } = payload;
    return {
      ...state,
      accounts: {
        ...state.accounts,
        [phoneNumber]: uuid
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWNjb3VudHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBUaHVua0FjdGlvbiB9IGZyb20gJ3JlZHV4LXRodW5rJztcblxuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uLy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB0eXBlIHsgTm9vcEFjdGlvblR5cGUgfSBmcm9tICcuL25vb3AnO1xuXG4vLyBTdGF0ZVxuXG5leHBvcnQgdHlwZSBBY2NvdW50c1N0YXRlVHlwZSA9IHtcbiAgYWNjb3VudHM6IFJlY29yZDxzdHJpbmcsIFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkPjtcbn07XG5cbi8vIEFjdGlvbnNcblxudHlwZSBBY2NvdW50VXBkYXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2FjY291bnRzL1VQREFURSc7XG4gIHBheWxvYWQ6IHtcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nO1xuICAgIHV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIEFjY291bnRzQWN0aW9uVHlwZSA9IEFjY291bnRVcGRhdGVBY3Rpb25UeXBlO1xuXG4vLyBBY3Rpb24gQ3JlYXRvcnNcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gIGNoZWNrRm9yQWNjb3VudCxcbn07XG5cbmZ1bmN0aW9uIGNoZWNrRm9yQWNjb3VudChcbiAgcGhvbmVOdW1iZXI6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248XG4gIHZvaWQsXG4gIFJvb3RTdGF0ZVR5cGUsXG4gIHVua25vd24sXG4gIEFjY291bnRVcGRhdGVBY3Rpb25UeXBlIHwgTm9vcEFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGlmICghd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdOT09QJyxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChwaG9uZU51bWJlcik7XG4gICAgaWYgKGNvbnZlcnNhdGlvbiAmJiBjb252ZXJzYXRpb24uZ2V0KCd1dWlkJykpIHtcbiAgICAgIGxvZy5lcnJvcihgY2hlY2tGb3JBY2NvdW50OiBmb3VuZCAke3Bob25lTnVtYmVyfSBpbiBleGlzdGluZyBjb250YWN0c2ApO1xuICAgICAgY29uc3QgdXVpZCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKTtcblxuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnYWNjb3VudHMvVVBEQVRFJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICAgIHV1aWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICBzdGF0ZS5hY2NvdW50cy5hY2NvdW50cyxcbiAgICAgIHBob25lTnVtYmVyXG4gICAgKTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ05PT1AnLFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHV1aWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkO1xuXG4gICAgbG9nLmVycm9yKGBjaGVja0ZvckFjY291bnQ6IGxvb2tpbmcgJHtwaG9uZU51bWJlcn0gdXAgb24gc2VydmVyYCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHV1aWRMb29rdXAgPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcuZ2V0VXVpZHNGb3JFMTY0cyhbXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgXSk7XG4gICAgICB1dWlkID0gdXVpZExvb2t1cFtwaG9uZU51bWJlcl0gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoJ2NoZWNrRm9yQWNjb3VudDonLCBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnYWNjb3VudHMvVVBEQVRFJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHV1aWQsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IEFjY291bnRzU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBhY2NvdW50czoge30sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8QWNjb3VudHNTdGF0ZVR5cGU+ID0gZ2V0RW1wdHlTdGF0ZSgpLFxuICBhY3Rpb246IFJlYWRvbmx5PEFjY291bnRzQWN0aW9uVHlwZT5cbik6IEFjY291bnRzU3RhdGVUeXBlIHtcbiAgaWYgKCFzdGF0ZSkge1xuICAgIHJldHVybiBnZXRFbXB0eVN0YXRlKCk7XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdhY2NvdW50cy9VUERBVEUnKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gICAgY29uc3QgeyBwaG9uZU51bWJlciwgdXVpZCB9ID0gcGF5bG9hZDtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjY291bnRzOiB7XG4gICAgICAgIC4uLnN0YXRlLmFjY291bnRzLFxuICAgICAgICBbcGhvbmVOdW1iZXJdOiB1dWlkLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxhQUF3QjtBQUN4QixVQUFxQjtBQTJCZCxNQUFNLFVBQVU7QUFBQSxFQUNyQjtBQUNGO0FBRUEseUJBQ0UsYUFNQTtBQUNBLFNBQU8sT0FBTyxVQUFVLGFBQWE7QUFDbkMsUUFBSSxDQUFDLE9BQU8sV0FBVyxXQUFXO0FBQ2hDLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFDRDtBQUFBLElBQ0Y7QUFFQSxVQUFNLGVBQWUsT0FBTyx1QkFBdUIsSUFBSSxXQUFXO0FBQ2xFLFFBQUksZ0JBQWdCLGFBQWEsSUFBSSxNQUFNLEdBQUc7QUFDNUMsVUFBSSxNQUFNLDBCQUEwQixrQ0FBa0M7QUFDdEUsWUFBTSxRQUFPLGFBQWEsSUFBSSxNQUFNO0FBRXBDLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFDRDtBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVEsU0FBUztBQUN2QixVQUFNLFdBQVcsT0FBTyxVQUFVLGVBQWUsS0FDL0MsTUFBTSxTQUFTLFVBQ2YsV0FDRjtBQUNBLFFBQUksVUFBVTtBQUNaLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSTtBQUVKLFFBQUksTUFBTSw0QkFBNEIsMEJBQTBCO0FBQ2hFLFFBQUk7QUFDRixZQUFNLGFBQWEsTUFBTSxPQUFPLFdBQVcsVUFBVSxpQkFBaUI7QUFBQSxRQUNwRTtBQUFBLE1BQ0YsQ0FBQztBQUNELGFBQU8sV0FBVyxnQkFBZ0I7QUFBQSxJQUNwQyxTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQU0sb0JBQW9CLE9BQU8sWUFBWSxLQUFLLENBQUM7QUFBQSxJQUN6RDtBQUVBLGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFoRVMsQUFvRUYseUJBQTRDO0FBQ2pELFNBQU87QUFBQSxJQUNMLFVBQVUsQ0FBQztBQUFBLEVBQ2I7QUFDRjtBQUpnQixBQU1ULGlCQUNMLFFBQXFDLGNBQWMsR0FDbkQsUUFDbUI7QUFDbkIsTUFBSSxDQUFDLE9BQU87QUFDVixXQUFPLGNBQWM7QUFBQSxFQUN2QjtBQUVBLE1BQUksT0FBTyxTQUFTLG1CQUFtQjtBQUNyQyxVQUFNLEVBQUUsWUFBWTtBQUNwQixVQUFNLEVBQUUsYUFBYSxTQUFTO0FBRTlCLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxVQUFVO0FBQUEsV0FDTCxNQUFNO0FBQUEsU0FDUixjQUFjO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQXRCZ0IiLAogICJuYW1lcyI6IFtdCn0K
