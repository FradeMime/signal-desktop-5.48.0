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
var calling_exports = {};
__export(calling_exports, {
  getActiveCall: () => getActiveCall,
  getActiveCallState: () => getActiveCallState,
  getCallSelector: () => getCallSelector,
  getCallsByConversation: () => getCallsByConversation,
  getIncomingCall: () => getIncomingCall,
  isInCall: () => isInCall,
  isInSpeakerView: () => isInSpeakerView
});
module.exports = __toCommonJS(calling_exports);
var import_reselect = require("reselect");
var import_calling = require("../ducks/calling");
var import_user = require("./user");
var import_getOwn = require("../../util/getOwn");
var import_Calling = require("../../types/Calling");
const getCalling = /* @__PURE__ */ __name((state) => state.calling, "getCalling");
const getActiveCallState = (0, import_reselect.createSelector)(getCalling, (state) => state.activeCallState);
const getCallsByConversation = (0, import_reselect.createSelector)(getCalling, (state) => state.callsByConversation);
const getCallSelector = (0, import_reselect.createSelector)(getCallsByConversation, (callsByConversation) => (conversationId) => (0, import_getOwn.getOwn)(callsByConversation, conversationId));
const getActiveCall = (0, import_reselect.createSelector)(getActiveCallState, getCallSelector, (activeCallState, callSelector) => {
  if (activeCallState && activeCallState.conversationId) {
    return callSelector(activeCallState.conversationId);
  }
  return void 0;
});
const isInCall = (0, import_reselect.createSelector)(getActiveCall, (call) => Boolean(call));
const getIncomingCall = (0, import_reselect.createSelector)(getCallsByConversation, import_user.getUserUuid, (callsByConversation, ourUuid) => {
  if (!ourUuid) {
    return void 0;
  }
  return (0, import_calling.getIncomingCall)(callsByConversation, ourUuid);
});
const isInSpeakerView = /* @__PURE__ */ __name((call) => {
  return Boolean(call?.viewMode === import_Calling.CallViewMode.Presentation || call?.viewMode === import_Calling.CallViewMode.Speaker);
}, "isInSpeakerView");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getActiveCall,
  getActiveCallState,
  getCallSelector,
  getCallsByConversation,
  getIncomingCall,
  isInCall,
  isInSpeakerView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUge1xuICBBY3RpdmVDYWxsU3RhdGVUeXBlLFxuICBDYWxsaW5nU3RhdGVUeXBlLFxuICBDYWxsc0J5Q29udmVyc2F0aW9uVHlwZSxcbiAgRGlyZWN0Q2FsbFN0YXRlVHlwZSxcbiAgR3JvdXBDYWxsU3RhdGVUeXBlLFxufSBmcm9tICcuLi9kdWNrcy9jYWxsaW5nJztcbmltcG9ydCB7IGdldEluY29taW5nQ2FsbCBhcyBnZXRJbmNvbWluZ0NhbGxIZWxwZXIgfSBmcm9tICcuLi9kdWNrcy9jYWxsaW5nJztcbmltcG9ydCB7IGdldFVzZXJVdWlkIH0gZnJvbSAnLi91c2VyJztcbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0T3duJztcbmltcG9ydCB7IENhbGxWaWV3TW9kZSB9IGZyb20gJy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuXG5leHBvcnQgdHlwZSBDYWxsU3RhdGVUeXBlID0gRGlyZWN0Q2FsbFN0YXRlVHlwZSB8IEdyb3VwQ2FsbFN0YXRlVHlwZTtcblxuY29uc3QgZ2V0Q2FsbGluZyA9IChzdGF0ZTogU3RhdGVUeXBlKTogQ2FsbGluZ1N0YXRlVHlwZSA9PiBzdGF0ZS5jYWxsaW5nO1xuXG5leHBvcnQgY29uc3QgZ2V0QWN0aXZlQ2FsbFN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhbGxpbmcsXG4gIChzdGF0ZTogQ2FsbGluZ1N0YXRlVHlwZSkgPT4gc3RhdGUuYWN0aXZlQ2FsbFN0YXRlXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FsbHNCeUNvbnZlcnNhdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYWxsaW5nLFxuICAoc3RhdGU6IENhbGxpbmdTdGF0ZVR5cGUpOiBDYWxsc0J5Q29udmVyc2F0aW9uVHlwZSA9PlxuICAgIHN0YXRlLmNhbGxzQnlDb252ZXJzYXRpb25cbik7XG5cbmV4cG9ydCB0eXBlIENhbGxTZWxlY3RvclR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbikgPT4gQ2FsbFN0YXRlVHlwZSB8IHVuZGVmaW5lZDtcbmV4cG9ydCBjb25zdCBnZXRDYWxsU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgKGNhbGxzQnlDb252ZXJzYXRpb246IENhbGxzQnlDb252ZXJzYXRpb25UeXBlKTogQ2FsbFNlbGVjdG9yVHlwZSA9PlxuICAgIChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PlxuICAgICAgZ2V0T3duKGNhbGxzQnlDb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbklkKVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZUNhbGwgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0QWN0aXZlQ2FsbFN0YXRlLFxuICBnZXRDYWxsU2VsZWN0b3IsXG4gIChhY3RpdmVDYWxsU3RhdGUsIGNhbGxTZWxlY3Rvcik6IHVuZGVmaW5lZCB8IENhbGxTdGF0ZVR5cGUgPT4ge1xuICAgIGlmIChhY3RpdmVDYWxsU3RhdGUgJiYgYWN0aXZlQ2FsbFN0YXRlLmNvbnZlcnNhdGlvbklkKSB7XG4gICAgICByZXR1cm4gY2FsbFNlbGVjdG9yKGFjdGl2ZUNhbGxTdGF0ZS5jb252ZXJzYXRpb25JZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGlzSW5DYWxsID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEFjdGl2ZUNhbGwsXG4gIChjYWxsOiBDYWxsU3RhdGVUeXBlIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiBCb29sZWFuKGNhbGwpXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0SW5jb21pbmdDYWxsID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhbGxzQnlDb252ZXJzYXRpb24sXG4gIGdldFVzZXJVdWlkLFxuICAoXG4gICAgY2FsbHNCeUNvbnZlcnNhdGlvbjogQ2FsbHNCeUNvbnZlcnNhdGlvblR5cGUsXG4gICAgb3VyVXVpZDogVVVJRFN0cmluZ1R5cGUgfCB1bmRlZmluZWRcbiAgKTogdW5kZWZpbmVkIHwgRGlyZWN0Q2FsbFN0YXRlVHlwZSB8IEdyb3VwQ2FsbFN0YXRlVHlwZSA9PiB7XG4gICAgaWYgKCFvdXJVdWlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRJbmNvbWluZ0NhbGxIZWxwZXIoY2FsbHNCeUNvbnZlcnNhdGlvbiwgb3VyVXVpZCk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBpc0luU3BlYWtlclZpZXcgPSAoXG4gIGNhbGw6IFBpY2s8QWN0aXZlQ2FsbFN0YXRlVHlwZSwgJ3ZpZXdNb2RlJz4gfCB1bmRlZmluZWRcbik6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBjYWxsPy52aWV3TW9kZSA9PT0gQ2FsbFZpZXdNb2RlLlByZXNlbnRhdGlvbiB8fFxuICAgICAgY2FsbD8udmlld01vZGUgPT09IENhbGxWaWV3TW9kZS5TcGVha2VyXG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUErQjtBQVUvQixxQkFBeUQ7QUFDekQsa0JBQTRCO0FBQzVCLG9CQUF1QjtBQUN2QixxQkFBNkI7QUFLN0IsTUFBTSxhQUFhLHdCQUFDLFVBQXVDLE1BQU0sU0FBOUM7QUFFWixNQUFNLHFCQUFxQixvQ0FDaEMsWUFDQSxDQUFDLFVBQTRCLE1BQU0sZUFDckM7QUFFTyxNQUFNLHlCQUF5QixvQ0FDcEMsWUFDQSxDQUFDLFVBQ0MsTUFBTSxtQkFDVjtBQUtPLE1BQU0sa0JBQWtCLG9DQUM3Qix3QkFDQSxDQUFDLHdCQUNDLENBQUMsbUJBQ0MsMEJBQU8scUJBQXFCLGNBQWMsQ0FDaEQ7QUFFTyxNQUFNLGdCQUFnQixvQ0FDM0Isb0JBQ0EsaUJBQ0EsQ0FBQyxpQkFBaUIsaUJBQTRDO0FBQzVELE1BQUksbUJBQW1CLGdCQUFnQixnQkFBZ0I7QUFDckQsV0FBTyxhQUFhLGdCQUFnQixjQUFjO0FBQUEsRUFDcEQ7QUFFQSxTQUFPO0FBQ1QsQ0FDRjtBQUVPLE1BQU0sV0FBVyxvQ0FDdEIsZUFDQSxDQUFDLFNBQTZDLFFBQVEsSUFBSSxDQUM1RDtBQUVPLE1BQU0sa0JBQWtCLG9DQUM3Qix3QkFDQSx5QkFDQSxDQUNFLHFCQUNBLFlBQ3lEO0FBQ3pELE1BQUksQ0FBQyxTQUFTO0FBQ1osV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLG9DQUFzQixxQkFBcUIsT0FBTztBQUMzRCxDQUNGO0FBRU8sTUFBTSxrQkFBa0Isd0JBQzdCLFNBQ1k7QUFDWixTQUFPLFFBQ0wsTUFBTSxhQUFhLDRCQUFhLGdCQUM5QixNQUFNLGFBQWEsNEJBQWEsT0FDcEM7QUFDRixHQVArQjsiLAogICJuYW1lcyI6IFtdCn0K
