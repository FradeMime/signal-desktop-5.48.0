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
  hasNetworkDialog: () => hasNetworkDialog,
  isChallengePending: () => isChallengePending
});
module.exports = __toCommonJS(network_exports);
var import_reselect = require("reselect");
var import_registration = require("../../util/registration");
var import_SocketStatus = require("../../types/SocketStatus");
const getNetwork = /* @__PURE__ */ __name((state) => state.network, "getNetwork");
const hasNetworkDialog = (0, import_reselect.createSelector)(getNetwork, import_registration.isDone, ({ isOnline, socketStatus, withinConnectingGracePeriod }, isRegistrationDone) => isRegistrationDone && (!isOnline || socketStatus === import_SocketStatus.SocketStatus.CONNECTING && !withinConnectingGracePeriod || socketStatus === import_SocketStatus.SocketStatus.CLOSED || socketStatus === import_SocketStatus.SocketStatus.CLOSING));
const isChallengePending = (0, import_reselect.createSelector)(getNetwork, ({ challengeStatus }) => challengeStatus === "pending");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasNetworkDialog,
  isChallengePending
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0d29yay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB0eXBlIHsgTmV0d29ya1N0YXRlVHlwZSB9IGZyb20gJy4uL2R1Y2tzL25ldHdvcmsnO1xuaW1wb3J0IHsgaXNEb25lIH0gZnJvbSAnLi4vLi4vdXRpbC9yZWdpc3RyYXRpb24nO1xuaW1wb3J0IHsgU29ja2V0U3RhdHVzIH0gZnJvbSAnLi4vLi4vdHlwZXMvU29ja2V0U3RhdHVzJztcblxuY29uc3QgZ2V0TmV0d29yayA9IChzdGF0ZTogU3RhdGVUeXBlKTogTmV0d29ya1N0YXRlVHlwZSA9PiBzdGF0ZS5uZXR3b3JrO1xuXG5leHBvcnQgY29uc3QgaGFzTmV0d29ya0RpYWxvZyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXROZXR3b3JrLFxuICBpc0RvbmUsXG4gIChcbiAgICB7IGlzT25saW5lLCBzb2NrZXRTdGF0dXMsIHdpdGhpbkNvbm5lY3RpbmdHcmFjZVBlcmlvZCB9OiBOZXR3b3JrU3RhdGVUeXBlLFxuICAgIGlzUmVnaXN0cmF0aW9uRG9uZTogYm9vbGVhblxuICApOiBib29sZWFuID0+XG4gICAgaXNSZWdpc3RyYXRpb25Eb25lICYmXG4gICAgKCFpc09ubGluZSB8fFxuICAgICAgKHNvY2tldFN0YXR1cyA9PT0gU29ja2V0U3RhdHVzLkNPTk5FQ1RJTkcgJiZcbiAgICAgICAgIXdpdGhpbkNvbm5lY3RpbmdHcmFjZVBlcmlvZCkgfHxcbiAgICAgIHNvY2tldFN0YXR1cyA9PT0gU29ja2V0U3RhdHVzLkNMT1NFRCB8fFxuICAgICAgc29ja2V0U3RhdHVzID09PSBTb2NrZXRTdGF0dXMuQ0xPU0lORylcbik7XG5cbmV4cG9ydCBjb25zdCBpc0NoYWxsZW5nZVBlbmRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0TmV0d29yayxcbiAgKHsgY2hhbGxlbmdlU3RhdHVzIH0pID0+IGNoYWxsZW5nZVN0YXR1cyA9PT0gJ3BlbmRpbmcnXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQStCO0FBSS9CLDBCQUF1QjtBQUN2QiwwQkFBNkI7QUFFN0IsTUFBTSxhQUFhLHdCQUFDLFVBQXVDLE1BQU0sU0FBOUM7QUFFWixNQUFNLG1CQUFtQixvQ0FDOUIsWUFDQSw0QkFDQSxDQUNFLEVBQUUsVUFBVSxjQUFjLCtCQUMxQix1QkFFQSxzQkFDQyxFQUFDLFlBQ0MsaUJBQWlCLGlDQUFhLGNBQzdCLENBQUMsK0JBQ0gsaUJBQWlCLGlDQUFhLFVBQzlCLGlCQUFpQixpQ0FBYSxRQUNwQztBQUVPLE1BQU0scUJBQXFCLG9DQUNoQyxZQUNBLENBQUMsRUFBRSxzQkFBc0Isb0JBQW9CLFNBQy9DOyIsCiAgIm5hbWVzIjogW10KfQo=
