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
var audioPlayer_exports = {};
__export(audioPlayer_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer,
  useActions: () => useActions
});
module.exports = __toCommonJS(audioPlayer_exports);
var import_useBoundActions = require("../../hooks/useBoundActions");
var import_conversations = require("./conversations");
const actions = {
  setActiveAudioID
};
const useActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useActions");
function setActiveAudioID(id, context) {
  return {
    type: "audioPlayer/SET_ACTIVE_AUDIO_ID",
    payload: { id, context }
  };
}
function getEmptyState() {
  return {
    activeAudioID: void 0,
    activeAudioContext: void 0
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === "audioPlayer/SET_ACTIVE_AUDIO_ID") {
    const { payload } = action;
    return {
      ...state,
      activeAudioID: payload.id,
      activeAudioContext: payload.context
    };
  }
  if (action.type === import_conversations.SELECTED_CONVERSATION_CHANGED) {
    return {
      ...state,
      activeAudioID: void 0
    };
  }
  if (action.type === "MESSAGE_DELETED") {
    const { id } = action.payload;
    if (state.activeAudioID !== id) {
      return state;
    }
    return {
      ...state,
      activeAudioID: void 0
    };
  }
  if (action.type === "MESSAGE_CHANGED") {
    const { id, data } = action.payload;
    if (state.activeAudioID !== id) {
      return state;
    }
    if (!data.deletedForEveryone) {
      return state;
    }
    return {
      ...state,
      activeAudioID: void 0
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer,
  useActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9QbGF5ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdXNlQm91bmRBY3Rpb25zIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlQm91bmRBY3Rpb25zJztcblxuaW1wb3J0IHR5cGUge1xuICBNZXNzYWdlRGVsZXRlZEFjdGlvblR5cGUsXG4gIE1lc3NhZ2VDaGFuZ2VkQWN0aW9uVHlwZSxcbiAgU2VsZWN0ZWRDb252ZXJzYXRpb25DaGFuZ2VkQWN0aW9uVHlwZSxcbn0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IFNFTEVDVEVEX0NPTlZFUlNBVElPTl9DSEFOR0VEIH0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgQXVkaW9QbGF5ZXJTdGF0ZVR5cGUgPSB7XG4gIHJlYWRvbmx5IGFjdGl2ZUF1ZGlvSUQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgYWN0aXZlQXVkaW9Db250ZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG4vLyBBY3Rpb25zXG5cbnR5cGUgU2V0QWN0aXZlQXVkaW9JREFjdGlvbiA9IHtcbiAgdHlwZTogJ2F1ZGlvUGxheWVyL1NFVF9BQ1RJVkVfQVVESU9fSUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb250ZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIH07XG59O1xuXG50eXBlIEF1ZGlvUGxheWVyQWN0aW9uVHlwZSA9IFNldEFjdGl2ZUF1ZGlvSURBY3Rpb247XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgc2V0QWN0aXZlQXVkaW9JRCxcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBY3Rpb25zID0gKCk6IHR5cGVvZiBhY3Rpb25zID0+IHVzZUJvdW5kQWN0aW9ucyhhY3Rpb25zKTtcblxuZnVuY3Rpb24gc2V0QWN0aXZlQXVkaW9JRChcbiAgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgY29udGV4dDogc3RyaW5nXG4pOiBTZXRBY3RpdmVBdWRpb0lEQWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnYXVkaW9QbGF5ZXIvU0VUX0FDVElWRV9BVURJT19JRCcsXG4gICAgcGF5bG9hZDogeyBpZCwgY29udGV4dCB9LFxuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IEF1ZGlvUGxheWVyU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBhY3RpdmVBdWRpb0lEOiB1bmRlZmluZWQsXG4gICAgYWN0aXZlQXVkaW9Db250ZXh0OiB1bmRlZmluZWQsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8QXVkaW9QbGF5ZXJTdGF0ZVR5cGU+ID0gZ2V0RW1wdHlTdGF0ZSgpLFxuICBhY3Rpb246IFJlYWRvbmx5PFxuICAgIHwgQXVkaW9QbGF5ZXJBY3Rpb25UeXBlXG4gICAgfCBNZXNzYWdlRGVsZXRlZEFjdGlvblR5cGVcbiAgICB8IE1lc3NhZ2VDaGFuZ2VkQWN0aW9uVHlwZVxuICAgIHwgU2VsZWN0ZWRDb252ZXJzYXRpb25DaGFuZ2VkQWN0aW9uVHlwZVxuICA+XG4pOiBBdWRpb1BsYXllclN0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ2F1ZGlvUGxheWVyL1NFVF9BQ1RJVkVfQVVESU9fSUQnKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBhY3RpdmVBdWRpb0lEOiBwYXlsb2FkLmlkLFxuICAgICAgYWN0aXZlQXVkaW9Db250ZXh0OiBwYXlsb2FkLmNvbnRleHQsXG4gICAgfTtcbiAgfVxuXG4gIC8vIFJlc2V0IGFjdGl2ZUF1ZGlvSUQgb24gY29udmVyc2F0aW9uIGNoYW5nZS5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBTRUxFQ1RFRF9DT05WRVJTQVRJT05fQ0hBTkdFRCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUF1ZGlvSUQ6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9XG5cbiAgLy8gUmVzZXQgYWN0aXZlQXVkaW9JRCBvbiB3aGVuIHBsYXllZCBtZXNzYWdlIGlzIGRlbGV0ZWQgb24gZXhwaXJhdGlvbi5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnTUVTU0FHRV9ERUxFVEVEJykge1xuICAgIGNvbnN0IHsgaWQgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIGlmIChzdGF0ZS5hY3RpdmVBdWRpb0lEICE9PSBpZCkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUF1ZGlvSUQ6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9XG5cbiAgLy8gUmVzZXQgYWN0aXZlQXVkaW9JRCBvbiB3aGVuIHBsYXllZCBtZXNzYWdlIGlzIGRlbGV0ZWQgZm9yIGV2ZXJ5b25lLlxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdNRVNTQUdFX0NIQU5HRUQnKSB7XG4gICAgY29uc3QgeyBpZCwgZGF0YSB9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICBpZiAoc3RhdGUuYWN0aXZlQXVkaW9JRCAhPT0gaWQpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBpZiAoIWRhdGEuZGVsZXRlZEZvckV2ZXJ5b25lKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQXVkaW9JRDogdW5kZWZpbmVkLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsNkJBQWdDO0FBT2hDLDJCQUE4QztBQXVCdkMsTUFBTSxVQUFVO0FBQUEsRUFDckI7QUFDRjtBQUVPLE1BQU0sYUFBYSw2QkFBc0IsNENBQWdCLE9BQU8sR0FBN0M7QUFFMUIsMEJBQ0UsSUFDQSxTQUN3QjtBQUN4QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTLEVBQUUsSUFBSSxRQUFRO0FBQUEsRUFDekI7QUFDRjtBQVJTLEFBWUYseUJBQStDO0FBQ3BELFNBQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxJQUNmLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQ0Y7QUFMZ0IsQUFPVCxpQkFDTCxRQUF3QyxjQUFjLEdBQ3RELFFBTXNCO0FBQ3RCLE1BQUksT0FBTyxTQUFTLG1DQUFtQztBQUNyRCxVQUFNLEVBQUUsWUFBWTtBQUVwQixXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsZUFBZSxRQUFRO0FBQUEsTUFDdkIsb0JBQW9CLFFBQVE7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLE9BQU8sU0FBUyxvREFBK0I7QUFDakQsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNILGVBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLE9BQU8sU0FBUyxtQkFBbUI7QUFDckMsVUFBTSxFQUFFLE9BQU8sT0FBTztBQUN0QixRQUFJLE1BQU0sa0JBQWtCLElBQUk7QUFDOUIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsZUFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUdBLE1BQUksT0FBTyxTQUFTLG1CQUFtQjtBQUNyQyxVQUFNLEVBQUUsSUFBSSxTQUFTLE9BQU87QUFFNUIsUUFBSSxNQUFNLGtCQUFrQixJQUFJO0FBQzlCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxDQUFDLEtBQUssb0JBQW9CO0FBQzVCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNILGVBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUEzRGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
