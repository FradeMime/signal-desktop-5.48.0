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
var network_exports = {};
__export(network_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(network_exports);
var import_SocketStatus = require("../../types/SocketStatus");
var import_events = require("../../shims/events");
var import_assignWithNoUnnecessaryAllocation = require("../../util/assignWithNoUnnecessaryAllocation");
const CHECK_NETWORK_STATUS = "network/CHECK_NETWORK_STATUS";
const CLOSE_CONNECTING_GRACE_PERIOD = "network/CLOSE_CONNECTING_GRACE_PERIOD";
const RELINK_DEVICE = "network/RELINK_DEVICE";
const SET_CHALLENGE_STATUS = "network/SET_CHALLENGE_STATUS";
function checkNetworkStatus(payload) {
  return {
    type: CHECK_NETWORK_STATUS,
    payload
  };
}
function closeConnectingGracePeriod() {
  return {
    type: CLOSE_CONNECTING_GRACE_PERIOD
  };
}
function relinkDevice() {
  (0, import_events.trigger)("setupAsNewDevice");
  return {
    type: RELINK_DEVICE
  };
}
function setChallengeStatus(challengeStatus) {
  return {
    type: SET_CHALLENGE_STATUS,
    payload: { challengeStatus }
  };
}
const actions = {
  checkNetworkStatus,
  closeConnectingGracePeriod,
  relinkDevice,
  setChallengeStatus
};
function getEmptyState() {
  return {
    isOnline: navigator.onLine,
    socketStatus: import_SocketStatus.SocketStatus.OPEN,
    withinConnectingGracePeriod: true,
    challengeStatus: "idle"
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === CHECK_NETWORK_STATUS) {
    const { isOnline, socketStatus } = action.payload;
    return (0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(state, {
      isOnline,
      socketStatus
    });
  }
  if (action.type === CLOSE_CONNECTING_GRACE_PERIOD) {
    return {
      ...state,
      withinConnectingGracePeriod: false
    };
  }
  if (action.type === SET_CHALLENGE_STATUS) {
    return {
      ...state,
      challengeStatus: action.payload.challengeStatus
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0d29yay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBTb2NrZXRTdGF0dXMgfSBmcm9tICcuLi8uLi90eXBlcy9Tb2NrZXRTdGF0dXMnO1xuaW1wb3J0IHsgdHJpZ2dlciB9IGZyb20gJy4uLy4uL3NoaW1zL2V2ZW50cyc7XG5pbXBvcnQgeyBhc3NpZ25XaXRoTm9Vbm5lY2Vzc2FyeUFsbG9jYXRpb24gfSBmcm9tICcuLi8uLi91dGlsL2Fzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbic7XG5cbi8vIFN0YXRlXG5cbmV4cG9ydCB0eXBlIE5ldHdvcmtTdGF0ZVR5cGUgPSB7XG4gIGlzT25saW5lOiBib29sZWFuO1xuICBzb2NrZXRTdGF0dXM6IFNvY2tldFN0YXR1cztcbiAgd2l0aGluQ29ubmVjdGluZ0dyYWNlUGVyaW9kOiBib29sZWFuO1xuICBjaGFsbGVuZ2VTdGF0dXM6ICdyZXF1aXJlZCcgfCAncGVuZGluZycgfCAnaWRsZSc7XG59O1xuXG4vLyBBY3Rpb25zXG5cbmNvbnN0IENIRUNLX05FVFdPUktfU1RBVFVTID0gJ25ldHdvcmsvQ0hFQ0tfTkVUV09SS19TVEFUVVMnO1xuY29uc3QgQ0xPU0VfQ09OTkVDVElOR19HUkFDRV9QRVJJT0QgPSAnbmV0d29yay9DTE9TRV9DT05ORUNUSU5HX0dSQUNFX1BFUklPRCc7XG5jb25zdCBSRUxJTktfREVWSUNFID0gJ25ldHdvcmsvUkVMSU5LX0RFVklDRSc7XG5jb25zdCBTRVRfQ0hBTExFTkdFX1NUQVRVUyA9ICduZXR3b3JrL1NFVF9DSEFMTEVOR0VfU1RBVFVTJztcblxuZXhwb3J0IHR5cGUgQ2hlY2tOZXR3b3JrU3RhdHVzUGF5bG9hZFR5cGUgPSB7XG4gIGlzT25saW5lOiBib29sZWFuO1xuICBzb2NrZXRTdGF0dXM6IFNvY2tldFN0YXR1cztcbn07XG5cbnR5cGUgQ2hlY2tOZXR3b3JrU3RhdHVzQWN0aW9uID0ge1xuICB0eXBlOiAnbmV0d29yay9DSEVDS19ORVRXT1JLX1NUQVRVUyc7XG4gIHBheWxvYWQ6IENoZWNrTmV0d29ya1N0YXR1c1BheWxvYWRUeXBlO1xufTtcblxudHlwZSBDbG9zZUNvbm5lY3RpbmdHcmFjZVBlcmlvZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICduZXR3b3JrL0NMT1NFX0NPTk5FQ1RJTkdfR1JBQ0VfUEVSSU9EJztcbn07XG5cbnR5cGUgUmVsaW5rRGV2aWNlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ25ldHdvcmsvUkVMSU5LX0RFVklDRSc7XG59O1xuXG50eXBlIFNldENoYWxsZW5nZVN0YXR1c0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICduZXR3b3JrL1NFVF9DSEFMTEVOR0VfU1RBVFVTJztcbiAgcGF5bG9hZDoge1xuICAgIGNoYWxsZW5nZVN0YXR1czogTmV0d29ya1N0YXRlVHlwZVsnY2hhbGxlbmdlU3RhdHVzJ107XG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBOZXR3b3JrQWN0aW9uVHlwZSA9XG4gIHwgQ2hlY2tOZXR3b3JrU3RhdHVzQWN0aW9uXG4gIHwgQ2xvc2VDb25uZWN0aW5nR3JhY2VQZXJpb2RBY3Rpb25UeXBlXG4gIHwgUmVsaW5rRGV2aWNlQWN0aW9uVHlwZVxuICB8IFNldENoYWxsZW5nZVN0YXR1c0FjdGlvblR5cGU7XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5mdW5jdGlvbiBjaGVja05ldHdvcmtTdGF0dXMoXG4gIHBheWxvYWQ6IENoZWNrTmV0d29ya1N0YXR1c1BheWxvYWRUeXBlXG4pOiBDaGVja05ldHdvcmtTdGF0dXNBY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IENIRUNLX05FVFdPUktfU1RBVFVTLFxuICAgIHBheWxvYWQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsb3NlQ29ubmVjdGluZ0dyYWNlUGVyaW9kKCk6IENsb3NlQ29ubmVjdGluZ0dyYWNlUGVyaW9kQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQ0xPU0VfQ09OTkVDVElOR19HUkFDRV9QRVJJT0QsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlbGlua0RldmljZSgpOiBSZWxpbmtEZXZpY2VBY3Rpb25UeXBlIHtcbiAgdHJpZ2dlcignc2V0dXBBc05ld0RldmljZScpO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUkVMSU5LX0RFVklDRSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hhbGxlbmdlU3RhdHVzKFxuICBjaGFsbGVuZ2VTdGF0dXM6IE5ldHdvcmtTdGF0ZVR5cGVbJ2NoYWxsZW5nZVN0YXR1cyddXG4pOiBTZXRDaGFsbGVuZ2VTdGF0dXNBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBTRVRfQ0hBTExFTkdFX1NUQVRVUyxcbiAgICBwYXlsb2FkOiB7IGNoYWxsZW5nZVN0YXR1cyB9LFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgY2hlY2tOZXR3b3JrU3RhdHVzLFxuICBjbG9zZUNvbm5lY3RpbmdHcmFjZVBlcmlvZCxcbiAgcmVsaW5rRGV2aWNlLFxuICBzZXRDaGFsbGVuZ2VTdGF0dXMsXG59O1xuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IE5ldHdvcmtTdGF0ZVR5cGUge1xuICByZXR1cm4ge1xuICAgIGlzT25saW5lOiBuYXZpZ2F0b3Iub25MaW5lLFxuICAgIHNvY2tldFN0YXR1czogU29ja2V0U3RhdHVzLk9QRU4sXG4gICAgd2l0aGluQ29ubmVjdGluZ0dyYWNlUGVyaW9kOiB0cnVlLFxuICAgIGNoYWxsZW5nZVN0YXR1czogJ2lkbGUnLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PE5ldHdvcmtTdGF0ZVR5cGU+ID0gZ2V0RW1wdHlTdGF0ZSgpLFxuICBhY3Rpb246IFJlYWRvbmx5PE5ldHdvcmtBY3Rpb25UeXBlPlxuKTogTmV0d29ya1N0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ0hFQ0tfTkVUV09SS19TVEFUVVMpIHtcbiAgICBjb25zdCB7IGlzT25saW5lLCBzb2NrZXRTdGF0dXMgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgLy8gVGhpcyBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBmcmVxdWVudGx5LiBXZSBhdm9pZCBhbGxvY2F0aW5nIGEgbmV3IG9iamVjdCBpZiBub3RoaW5nXG4gICAgLy8gICBoYXMgY2hhbmdlZCB0byBhdm9pZCBhbiB1bm5lY2Vzc2FyeSByZS1yZW5kZXIuXG4gICAgcmV0dXJuIGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbihzdGF0ZSwge1xuICAgICAgaXNPbmxpbmUsXG4gICAgICBzb2NrZXRTdGF0dXMsXG4gICAgfSk7XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IENMT1NFX0NPTk5FQ1RJTkdfR1JBQ0VfUEVSSU9EKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgd2l0aGluQ29ubmVjdGluZ0dyYWNlUGVyaW9kOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBTRVRfQ0hBTExFTkdFX1NUQVRVUykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNoYWxsZW5nZVN0YXR1czogYWN0aW9uLnBheWxvYWQuY2hhbGxlbmdlU3RhdHVzLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLDBCQUE2QjtBQUM3QixvQkFBd0I7QUFDeEIsK0NBQWtEO0FBYWxELE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sZ0NBQWdDO0FBQ3RDLE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0sdUJBQXVCO0FBbUM3Qiw0QkFDRSxTQUMwQjtBQUMxQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDRjtBQVBTLEFBU1Qsc0NBQTRFO0FBQzFFLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFKUyxBQU1ULHdCQUFnRDtBQUM5Qyw2QkFBUSxrQkFBa0I7QUFFMUIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLEVBQ1I7QUFDRjtBQU5TLEFBUVQsNEJBQ0UsaUJBQzhCO0FBQzlCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVMsRUFBRSxnQkFBZ0I7QUFBQSxFQUM3QjtBQUNGO0FBUFMsQUFTRixNQUFNLFVBQVU7QUFBQSxFQUNyQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBSU8seUJBQTJDO0FBQ2hELFNBQU87QUFBQSxJQUNMLFVBQVUsVUFBVTtBQUFBLElBQ3BCLGNBQWMsaUNBQWE7QUFBQSxJQUMzQiw2QkFBNkI7QUFBQSxJQUM3QixpQkFBaUI7QUFBQSxFQUNuQjtBQUNGO0FBUGdCLEFBU1QsaUJBQ0wsUUFBb0MsY0FBYyxHQUNsRCxRQUNrQjtBQUNsQixNQUFJLE9BQU8sU0FBUyxzQkFBc0I7QUFDeEMsVUFBTSxFQUFFLFVBQVUsaUJBQWlCLE9BQU87QUFJMUMsV0FBTyxnRkFBa0MsT0FBTztBQUFBLE1BQzlDO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFJLE9BQU8sU0FBUywrQkFBK0I7QUFDakQsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNILDZCQUE2QjtBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxTQUFTLHNCQUFzQjtBQUN4QyxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsaUJBQWlCLE9BQU8sUUFBUTtBQUFBLElBQ2xDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQTlCZ0IiLAogICJuYW1lcyI6IFtdCn0K