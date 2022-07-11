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
var emojis_exports = {};
__export(emojis_exports, {
  actions: () => actions,
  reducer: () => reducer,
  useActions: () => useActions
});
module.exports = __toCommonJS(emojis_exports);
var import_lodash = require("lodash");
var import_Client = __toESM(require("../../sql/Client"));
var import_useBoundActions = require("../../hooks/useBoundActions");
const { updateEmojiUsage } = import_Client.default;
const actions = {
  onUseEmoji,
  useEmoji
};
const useActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useActions");
function onUseEmoji({
  shortName
}) {
  return async (dispatch) => {
    try {
      await updateEmojiUsage(shortName);
      dispatch(useEmoji(shortName));
    } catch (err) {
    }
  };
}
function useEmoji(payload) {
  return {
    type: "emojis/USE_EMOJI",
    payload
  };
}
function getEmptyState() {
  return {
    recents: []
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === "emojis/USE_EMOJI") {
    const { payload } = action;
    return {
      ...state,
      recents: (0, import_lodash.take)((0, import_lodash.uniq)([payload, ...state.recents]), 32)
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  reducer,
  useActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW1vamlzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdGFrZSwgdW5pcSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IFRodW5rQWN0aW9uIH0gZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHR5cGUgeyBFbW9qaVBpY2tEYXRhVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyB1c2VCb3VuZEFjdGlvbnMgfSBmcm9tICcuLi8uLi9ob29rcy91c2VCb3VuZEFjdGlvbnMnO1xuXG5jb25zdCB7IHVwZGF0ZUVtb2ppVXNhZ2UgfSA9IGRhdGFJbnRlcmZhY2U7XG5cbi8vIFN0YXRlXG5cbmV4cG9ydCB0eXBlIEVtb2ppc1N0YXRlVHlwZSA9IHtcbiAgcmVhZG9ubHkgcmVjZW50czogQXJyYXk8c3RyaW5nPjtcbn07XG5cbi8vIEFjdGlvbnNcblxudHlwZSBVc2VFbW9qaUFjdGlvbiA9IHtcbiAgdHlwZTogJ2Vtb2ppcy9VU0VfRU1PSkknO1xuICBwYXlsb2FkOiBzdHJpbmc7XG59O1xuXG50eXBlIEVtb2ppc0FjdGlvblR5cGUgPSBVc2VFbW9qaUFjdGlvbjtcblxuLy8gQWN0aW9uIENyZWF0b3JzXG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICBvblVzZUVtb2ppLFxuICB1c2VFbW9qaSxcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBY3Rpb25zID0gKCk6IHR5cGVvZiBhY3Rpb25zID0+IHVzZUJvdW5kQWN0aW9ucyhhY3Rpb25zKTtcblxuZnVuY3Rpb24gb25Vc2VFbW9qaSh7XG4gIHNob3J0TmFtZSxcbn06IEVtb2ppUGlja0RhdGFUeXBlKTogVGh1bmtBY3Rpb248dm9pZCwgdW5rbm93biwgdW5rbm93biwgVXNlRW1vamlBY3Rpb24+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdXBkYXRlRW1vamlVc2FnZShzaG9ydE5hbWUpO1xuICAgICAgZGlzcGF0Y2godXNlRW1vamkoc2hvcnROYW1lKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBFcnJvcnMgYXJlIGlnbm9yZWQuXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VFbW9qaShwYXlsb2FkOiBzdHJpbmcpOiBVc2VFbW9qaUFjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2Vtb2ppcy9VU0VfRU1PSkknLFxuICAgIHBheWxvYWQsXG4gIH07XG59XG5cbi8vIFJlZHVjZXJcblxuZnVuY3Rpb24gZ2V0RW1wdHlTdGF0ZSgpOiBFbW9qaXNTdGF0ZVR5cGUge1xuICByZXR1cm4ge1xuICAgIHJlY2VudHM6IFtdLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PEVtb2ppc1N0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8RW1vamlzQWN0aW9uVHlwZT5cbik6IEVtb2ppc1N0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ2Vtb2ppcy9VU0VfRU1PSkknKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZWNlbnRzOiB0YWtlKHVuaXEoW3BheWxvYWQsIC4uLnN0YXRlLnJlY2VudHNdKSwgMzIpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUEyQjtBQUczQixvQkFBMEI7QUFDMUIsNkJBQWdDO0FBRWhDLE1BQU0sRUFBRSxxQkFBcUI7QUFtQnRCLE1BQU0sVUFBVTtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUNGO0FBRU8sTUFBTSxhQUFhLDZCQUFzQiw0Q0FBZ0IsT0FBTyxHQUE3QztBQUUxQixvQkFBb0I7QUFBQSxFQUNsQjtBQUFBLEdBQ3lFO0FBQ3pFLFNBQU8sT0FBTSxhQUFZO0FBQ3ZCLFFBQUk7QUFDRixZQUFNLGlCQUFpQixTQUFTO0FBQ2hDLGVBQVMsU0FBUyxTQUFTLENBQUM7QUFBQSxJQUM5QixTQUFTLEtBQVA7QUFBQSxJQUVGO0FBQUEsRUFDRjtBQUNGO0FBWFMsQUFhVCxrQkFBa0IsU0FBaUM7QUFDakQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQ0Y7QUFMUyxBQVNULHlCQUEwQztBQUN4QyxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUM7QUFBQSxFQUNaO0FBQ0Y7QUFKUyxBQU1GLGlCQUNMLFFBQW1DLGNBQWMsR0FDakQsUUFDaUI7QUFDakIsTUFBSSxPQUFPLFNBQVMsb0JBQW9CO0FBQ3RDLFVBQU0sRUFBRSxZQUFZO0FBRXBCLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxTQUFTLHdCQUFLLHdCQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQWRnQiIsCiAgIm5hbWVzIjogW10KfQo=
