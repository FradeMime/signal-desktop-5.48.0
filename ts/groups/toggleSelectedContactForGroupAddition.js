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
var toggleSelectedContactForGroupAddition_exports = {};
__export(toggleSelectedContactForGroupAddition_exports, {
  OneTimeModalState: () => OneTimeModalState,
  toggleSelectedContactForGroupAddition: () => toggleSelectedContactForGroupAddition
});
module.exports = __toCommonJS(toggleSelectedContactForGroupAddition_exports);
var import_lodash = require("lodash");
var OneTimeModalState = /* @__PURE__ */ ((OneTimeModalState2) => {
  OneTimeModalState2[OneTimeModalState2["NeverShown"] = 0] = "NeverShown";
  OneTimeModalState2[OneTimeModalState2["Showing"] = 1] = "Showing";
  OneTimeModalState2[OneTimeModalState2["Shown"] = 2] = "Shown";
  return OneTimeModalState2;
})(OneTimeModalState || {});
function toggleSelectedContactForGroupAddition(conversationId, currentState) {
  const {
    maxGroupSize,
    maxRecommendedGroupSize,
    numberOfContactsAlreadyInGroup,
    selectedConversationIds: oldSelectedConversationIds
  } = currentState;
  let { maximumGroupSizeModalState, recommendedGroupSizeModalState } = currentState;
  const selectedConversationIds = (0, import_lodash.without)(oldSelectedConversationIds, conversationId);
  const shouldAdd = selectedConversationIds.length === oldSelectedConversationIds.length;
  if (shouldAdd) {
    const newExpectedMemberCount = selectedConversationIds.length + numberOfContactsAlreadyInGroup + 1;
    if (newExpectedMemberCount <= maxGroupSize) {
      if (newExpectedMemberCount === maxGroupSize && maximumGroupSizeModalState === 0 /* NeverShown */) {
        maximumGroupSizeModalState = 1 /* Showing */;
      } else if (newExpectedMemberCount >= maxRecommendedGroupSize && recommendedGroupSizeModalState === 0 /* NeverShown */) {
        recommendedGroupSizeModalState = 1 /* Showing */;
      }
      selectedConversationIds.push(conversationId);
    }
  }
  return {
    selectedConversationIds,
    maximumGroupSizeModalState,
    recommendedGroupSizeModalState
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OneTimeModalState,
  toggleSelectedContactForGroupAddition
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidG9nZ2xlU2VsZWN0ZWRDb250YWN0Rm9yR3JvdXBBZGRpdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB3aXRob3V0IH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGVudW0gT25lVGltZU1vZGFsU3RhdGUge1xuICBOZXZlclNob3duLFxuICBTaG93aW5nLFxuICBTaG93bixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdGVkQ29udGFjdEZvckdyb3VwQWRkaXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGN1cnJlbnRTdGF0ZTogUmVhZG9ubHk8e1xuICAgIG1heEdyb3VwU2l6ZTogbnVtYmVyO1xuICAgIG1heFJlY29tbWVuZGVkR3JvdXBTaXplOiBudW1iZXI7XG4gICAgbWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlO1xuICAgIG51bWJlck9mQ29udGFjdHNBbHJlYWR5SW5Hcm91cDogbnVtYmVyO1xuICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGU7XG4gICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IEFycmF5PHN0cmluZz47XG4gIH0+XG4pOiB7XG4gIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZTtcbiAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZTtcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IEFycmF5PHN0cmluZz47XG59IHtcbiAgY29uc3Qge1xuICAgIG1heEdyb3VwU2l6ZSxcbiAgICBtYXhSZWNvbW1lbmRlZEdyb3VwU2l6ZSxcbiAgICBudW1iZXJPZkNvbnRhY3RzQWxyZWFkeUluR3JvdXAsXG4gICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IG9sZFNlbGVjdGVkQ29udmVyc2F0aW9uSWRzLFxuICB9ID0gY3VycmVudFN0YXRlO1xuICBsZXQgeyBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZSwgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlIH0gPVxuICAgIGN1cnJlbnRTdGF0ZTtcblxuICBjb25zdCBzZWxlY3RlZENvbnZlcnNhdGlvbklkcyA9IHdpdGhvdXQoXG4gICAgb2xkU2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsXG4gICAgY29udmVyc2F0aW9uSWRcbiAgKTtcbiAgY29uc3Qgc2hvdWxkQWRkID1cbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkcy5sZW5ndGggPT09IG9sZFNlbGVjdGVkQ29udmVyc2F0aW9uSWRzLmxlbmd0aDtcbiAgaWYgKHNob3VsZEFkZCkge1xuICAgIGNvbnN0IG5ld0V4cGVjdGVkTWVtYmVyQ291bnQgPVxuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMubGVuZ3RoICsgbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwICsgMTtcbiAgICBpZiAobmV3RXhwZWN0ZWRNZW1iZXJDb3VudCA8PSBtYXhHcm91cFNpemUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3RXhwZWN0ZWRNZW1iZXJDb3VudCA9PT0gbWF4R3JvdXBTaXplICYmXG4gICAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlID09PSBPbmVUaW1lTW9kYWxTdGF0ZS5OZXZlclNob3duXG4gICAgICApIHtcbiAgICAgICAgbWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGUgPSBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93aW5nO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgbmV3RXhwZWN0ZWRNZW1iZXJDb3VudCA+PSBtYXhSZWNvbW1lbmRlZEdyb3VwU2l6ZSAmJlxuICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUgPT09IE9uZVRpbWVNb2RhbFN0YXRlLk5ldmVyU2hvd25cbiAgICAgICkge1xuICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUgPSBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93aW5nO1xuICAgICAgfVxuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMucHVzaChjb252ZXJzYXRpb25JZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkcyxcbiAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZSxcbiAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBd0I7QUFFakIsSUFBSyxvQkFBTCxrQkFBSyx1QkFBTDtBQUNMO0FBQ0E7QUFDQTtBQUhVO0FBQUE7QUFNTCwrQ0FDTCxnQkFDQSxjQVlBO0FBQ0EsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EseUJBQXlCO0FBQUEsTUFDdkI7QUFDSixNQUFJLEVBQUUsNEJBQTRCLG1DQUNoQztBQUVGLFFBQU0sMEJBQTBCLDJCQUM5Qiw0QkFDQSxjQUNGO0FBQ0EsUUFBTSxZQUNKLHdCQUF3QixXQUFXLDJCQUEyQjtBQUNoRSxNQUFJLFdBQVc7QUFDYixVQUFNLHlCQUNKLHdCQUF3QixTQUFTLGlDQUFpQztBQUNwRSxRQUFJLDBCQUEwQixjQUFjO0FBQzFDLFVBQ0UsMkJBQTJCLGdCQUMzQiwrQkFBK0Isb0JBQy9CO0FBQ0EscUNBQTZCO0FBQUEsTUFDL0IsV0FDRSwwQkFBMEIsMkJBQzFCLG1DQUFtQyxvQkFDbkM7QUFDQSx5Q0FBaUM7QUFBQSxNQUNuQztBQUNBLDhCQUF3QixLQUFLLGNBQWM7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBdERnQiIsCiAgIm5hbWVzIjogW10KfQo=
