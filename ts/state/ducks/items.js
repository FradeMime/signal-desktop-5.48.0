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
var items_exports = {};
__export(items_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer,
  useActions: () => useActions
});
module.exports = __toCommonJS(items_exports);
var import_lodash = require("lodash");
var import_uuid = require("uuid");
var storageShim = __toESM(require("../../shims/storage"));
var import_useBoundActions = require("../../hooks/useBoundActions");
var import_Colors = require("../../types/Colors");
var import_reloadSelectedConversation = require("../../shims/reloadSelectedConversation");
var import_conversations = require("./conversations");
const actions = {
  addCustomColor,
  editCustomColor,
  removeCustomColor,
  resetDefaultChatColor,
  savePreferredLeftPaneWidth,
  setGlobalDefaultConversationColor,
  onSetSkinTone,
  putItem,
  putItemExternal,
  removeItem,
  removeItemExternal,
  resetItems,
  toggleHasAllStoriesMuted
};
const useActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useActions");
function putItem(key, value) {
  storageShim.put(key, value);
  return {
    type: "items/PUT",
    payload: null
  };
}
function onSetSkinTone(tone) {
  return putItem("skinTone", tone);
}
function toggleHasAllStoriesMuted() {
  return (dispatch, getState) => {
    const hasAllStoriesMuted = Boolean(getState().items.hasAllStoriesMuted);
    dispatch(putItem("hasAllStoriesMuted", !hasAllStoriesMuted));
  };
}
function putItemExternal(key, value) {
  return {
    type: "items/PUT_EXTERNAL",
    payload: {
      key,
      value
    }
  };
}
function removeItem(key) {
  storageShim.remove(key);
  return {
    type: "items/REMOVE",
    payload: null
  };
}
function removeItemExternal(key) {
  return {
    type: "items/REMOVE_EXTERNAL",
    payload: key
  };
}
function resetItems() {
  return { type: "items/RESET" };
}
function getDefaultCustomColorData() {
  return {
    colors: {},
    version: 1
  };
}
function addCustomColor(customColor, conversationId) {
  return (dispatch, getState) => {
    const { customColors = getDefaultCustomColorData() } = getState().items;
    let uuid = (0, import_uuid.v4)();
    while (customColors.colors[uuid]) {
      uuid = (0, import_uuid.v4)();
    }
    const nextCustomColors = {
      ...customColors,
      colors: {
        ...customColors.colors,
        [uuid]: customColor
      }
    };
    dispatch(putItem("customColors", nextCustomColors));
    const customColorData = {
      id: uuid,
      value: customColor
    };
    if (conversationId) {
      import_conversations.actions.colorSelected({
        conversationId,
        conversationColor: "custom",
        customColorData
      })(dispatch, getState, null);
    } else {
      setGlobalDefaultConversationColor("custom", customColorData)(dispatch, getState, null);
    }
  };
}
function editCustomColor(colorId, color) {
  return (dispatch, getState) => {
    const { customColors = getDefaultCustomColorData() } = getState().items;
    if (!customColors.colors[colorId]) {
      return;
    }
    const nextCustomColors = {
      ...customColors,
      colors: {
        ...customColors.colors,
        [colorId]: color
      }
    };
    dispatch(putItem("customColors", nextCustomColors));
  };
}
function removeCustomColor(payload) {
  return (dispatch, getState) => {
    const { customColors = getDefaultCustomColorData() } = getState().items;
    const nextCustomColors = {
      ...customColors,
      colors: (0, import_lodash.omit)(customColors.colors, payload)
    };
    dispatch(putItem("customColors", nextCustomColors));
    resetDefaultChatColor()(dispatch, getState, null);
  };
}
function resetDefaultChatColor() {
  return (dispatch) => {
    dispatch(putItem("defaultConversationColor", {
      color: import_Colors.ConversationColors[0]
    }));
    (0, import_reloadSelectedConversation.reloadSelectedConversation)();
  };
}
function setGlobalDefaultConversationColor(color, customColorData) {
  return (dispatch) => {
    dispatch(putItem("defaultConversationColor", {
      color,
      customColorData
    }));
    (0, import_reloadSelectedConversation.reloadSelectedConversation)();
  };
}
function savePreferredLeftPaneWidth(preferredWidth) {
  return (dispatch) => {
    dispatch(putItem("preferredLeftPaneWidth", preferredWidth));
  };
}
function getEmptyState() {
  return {
    defaultConversationColor: {
      color: import_Colors.ConversationColors[0]
    }
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === "items/PUT_EXTERNAL") {
    const { payload } = action;
    return {
      ...state,
      [payload.key]: payload.value
    };
  }
  if (action.type === "items/REMOVE_EXTERNAL") {
    const { payload } = action;
    return (0, import_lodash.omit)(state, payload);
  }
  if (action.type === "items/RESET") {
    return getEmptyState();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXRlbXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHY0IGFzIGdldEd1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB0eXBlIHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgKiBhcyBzdG9yYWdlU2hpbSBmcm9tICcuLi8uLi9zaGltcy9zdG9yYWdlJztcbmltcG9ydCB7IHVzZUJvdW5kQWN0aW9ucyB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZUJvdW5kQWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbiAgQ3VzdG9tQ29sb3JUeXBlLFxuICBDdXN0b21Db2xvcnNJdGVtVHlwZSxcbiAgRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyByZWxvYWRTZWxlY3RlZENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3NoaW1zL3JlbG9hZFNlbGVjdGVkQ29udmVyc2F0aW9uJztcbmltcG9ydCB0eXBlIHsgU3RvcmFnZUFjY2Vzc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0IHsgYWN0aW9ucyBhcyBjb252ZXJzYXRpb25BY3Rpb25zIH0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQ29uZmlnTWFwVHlwZSBhcyBSZW1vdGVDb25maWdUeXBlIH0gZnJvbSAnLi4vLi4vUmVtb3RlQ29uZmlnJztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgSXRlbXNTdGF0ZVR5cGUgPSB7XG4gIHJlYWRvbmx5IHVuaXZlcnNhbEV4cGlyZVRpbWVyPzogbnVtYmVyO1xuXG4gIHJlYWRvbmx5IFtrZXk6IHN0cmluZ106IHVua25vd247XG5cbiAgcmVhZG9ubHkgcmVtb3RlQ29uZmlnPzogUmVtb3RlQ29uZmlnVHlwZTtcblxuICAvLyBUaGlzIHByb3BlcnR5IHNob3VsZCBhbHdheXMgYmUgc2V0IGFuZCB0aGlzIGlzIGVuc3VyZWQgaW4gYmFja2dyb3VuZC50c1xuICByZWFkb25seSBkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3I/OiBEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3JUeXBlO1xuXG4gIHJlYWRvbmx5IGN1c3RvbUNvbG9ycz86IEN1c3RvbUNvbG9yc0l0ZW1UeXBlO1xuXG4gIHJlYWRvbmx5IHByZWZlcnJlZExlZnRQYW5lV2lkdGg/OiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgcHJlZmVycmVkUmVhY3Rpb25FbW9qaT86IEFycmF5PHN0cmluZz47XG5cbiAgcmVhZG9ubHkgYXJlV2VBU3Vic2NyaWJlcj86IGJvb2xlYW47XG59O1xuXG4vLyBBY3Rpb25zXG5cbnR5cGUgSXRlbVB1dEFjdGlvbiA9IHtcbiAgdHlwZTogJ2l0ZW1zL1BVVCc7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xuXG50eXBlIEl0ZW1QdXRFeHRlcm5hbEFjdGlvbiA9IHtcbiAgdHlwZTogJ2l0ZW1zL1BVVF9FWFRFUk5BTCc7XG4gIHBheWxvYWQ6IHtcbiAgICBrZXk6IHN0cmluZztcbiAgICB2YWx1ZTogdW5rbm93bjtcbiAgfTtcbn07XG5cbnR5cGUgSXRlbVJlbW92ZUFjdGlvbiA9IHtcbiAgdHlwZTogJ2l0ZW1zL1JFTU9WRSc7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xuXG50eXBlIEl0ZW1SZW1vdmVFeHRlcm5hbEFjdGlvbiA9IHtcbiAgdHlwZTogJ2l0ZW1zL1JFTU9WRV9FWFRFUk5BTCc7XG4gIHBheWxvYWQ6IHN0cmluZztcbn07XG5cbnR5cGUgSXRlbXNSZXNldEFjdGlvbiA9IHtcbiAgdHlwZTogJ2l0ZW1zL1JFU0VUJztcbn07XG5cbmV4cG9ydCB0eXBlIEl0ZW1zQWN0aW9uVHlwZSA9XG4gIHwgSXRlbVB1dEFjdGlvblxuICB8IEl0ZW1QdXRFeHRlcm5hbEFjdGlvblxuICB8IEl0ZW1SZW1vdmVBY3Rpb25cbiAgfCBJdGVtUmVtb3ZlRXh0ZXJuYWxBY3Rpb25cbiAgfCBJdGVtc1Jlc2V0QWN0aW9uO1xuXG4vLyBBY3Rpb24gQ3JlYXRvcnNcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gIGFkZEN1c3RvbUNvbG9yLFxuICBlZGl0Q3VzdG9tQ29sb3IsXG4gIHJlbW92ZUN1c3RvbUNvbG9yLFxuICByZXNldERlZmF1bHRDaGF0Q29sb3IsXG4gIHNhdmVQcmVmZXJyZWRMZWZ0UGFuZVdpZHRoLFxuICBzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IsXG4gIG9uU2V0U2tpblRvbmUsXG4gIHB1dEl0ZW0sXG4gIHB1dEl0ZW1FeHRlcm5hbCxcbiAgcmVtb3ZlSXRlbSxcbiAgcmVtb3ZlSXRlbUV4dGVybmFsLFxuICByZXNldEl0ZW1zLFxuICB0b2dnbGVIYXNBbGxTdG9yaWVzTXV0ZWQsXG59O1xuXG5leHBvcnQgY29uc3QgdXNlQWN0aW9ucyA9ICgpOiB0eXBlb2YgYWN0aW9ucyA9PiB1c2VCb3VuZEFjdGlvbnMoYWN0aW9ucyk7XG5cbmZ1bmN0aW9uIHB1dEl0ZW08SyBleHRlbmRzIGtleW9mIFN0b3JhZ2VBY2Nlc3NUeXBlPihcbiAga2V5OiBLLFxuICB2YWx1ZTogU3RvcmFnZUFjY2Vzc1R5cGVbS11cbik6IEl0ZW1QdXRBY3Rpb24ge1xuICBzdG9yYWdlU2hpbS5wdXQoa2V5LCB2YWx1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnaXRlbXMvUFVUJyxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9O1xufVxuXG5mdW5jdGlvbiBvblNldFNraW5Ub25lKHRvbmU6IG51bWJlcik6IEl0ZW1QdXRBY3Rpb24ge1xuICByZXR1cm4gcHV0SXRlbSgnc2tpblRvbmUnLCB0b25lKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlSGFzQWxsU3Rvcmllc011dGVkKCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBJdGVtUHV0QWN0aW9uXG4+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBoYXNBbGxTdG9yaWVzTXV0ZWQgPSBCb29sZWFuKGdldFN0YXRlKCkuaXRlbXMuaGFzQWxsU3Rvcmllc011dGVkKTtcblxuICAgIGRpc3BhdGNoKHB1dEl0ZW0oJ2hhc0FsbFN0b3JpZXNNdXRlZCcsICFoYXNBbGxTdG9yaWVzTXV0ZWQpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHV0SXRlbUV4dGVybmFsKGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bik6IEl0ZW1QdXRFeHRlcm5hbEFjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2l0ZW1zL1BVVF9FWFRFUk5BTCcsXG4gICAgcGF5bG9hZDoge1xuICAgICAga2V5LFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXk6IGtleW9mIFN0b3JhZ2VBY2Nlc3NUeXBlKTogSXRlbVJlbW92ZUFjdGlvbiB7XG4gIHN0b3JhZ2VTaGltLnJlbW92ZShrZXkpO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2l0ZW1zL1JFTU9WRScsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSXRlbUV4dGVybmFsKGtleTogc3RyaW5nKTogSXRlbVJlbW92ZUV4dGVybmFsQWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnaXRlbXMvUkVNT1ZFX0VYVEVSTkFMJyxcbiAgICBwYXlsb2FkOiBrZXksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc2V0SXRlbXMoKTogSXRlbXNSZXNldEFjdGlvbiB7XG4gIHJldHVybiB7IHR5cGU6ICdpdGVtcy9SRVNFVCcgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEN1c3RvbUNvbG9yRGF0YSgpIHtcbiAgcmV0dXJuIHtcbiAgICBjb2xvcnM6IHt9LFxuICAgIHZlcnNpb246IDEsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFkZEN1c3RvbUNvbG9yKFxuICBjdXN0b21Db2xvcjogQ3VzdG9tQ29sb3JUeXBlLFxuICBjb252ZXJzYXRpb25JZD86IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgSXRlbVB1dEFjdGlvbj4ge1xuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tQ29sb3JzID0gZ2V0RGVmYXVsdEN1c3RvbUNvbG9yRGF0YSgpIH0gPSBnZXRTdGF0ZSgpLml0ZW1zO1xuXG4gICAgbGV0IHV1aWQgPSBnZXRHdWlkKCk7XG4gICAgd2hpbGUgKGN1c3RvbUNvbG9ycy5jb2xvcnNbdXVpZF0pIHtcbiAgICAgIHV1aWQgPSBnZXRHdWlkKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEN1c3RvbUNvbG9ycyA9IHtcbiAgICAgIC4uLmN1c3RvbUNvbG9ycyxcbiAgICAgIGNvbG9yczoge1xuICAgICAgICAuLi5jdXN0b21Db2xvcnMuY29sb3JzLFxuICAgICAgICBbdXVpZF06IGN1c3RvbUNvbG9yLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZGlzcGF0Y2gocHV0SXRlbSgnY3VzdG9tQ29sb3JzJywgbmV4dEN1c3RvbUNvbG9ycykpO1xuXG4gICAgY29uc3QgY3VzdG9tQ29sb3JEYXRhID0ge1xuICAgICAgaWQ6IHV1aWQsXG4gICAgICB2YWx1ZTogY3VzdG9tQ29sb3IsXG4gICAgfTtcblxuICAgIGlmIChjb252ZXJzYXRpb25JZCkge1xuICAgICAgY29udmVyc2F0aW9uQWN0aW9ucy5jb2xvclNlbGVjdGVkKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbkNvbG9yOiAnY3VzdG9tJyxcbiAgICAgICAgY3VzdG9tQ29sb3JEYXRhLFxuICAgICAgfSkoZGlzcGF0Y2gsIGdldFN0YXRlLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0R2xvYmFsRGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yKCdjdXN0b20nLCBjdXN0b21Db2xvckRhdGEpKFxuICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUsXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBlZGl0Q3VzdG9tQ29sb3IoXG4gIGNvbG9ySWQ6IHN0cmluZyxcbiAgY29sb3I6IEN1c3RvbUNvbG9yVHlwZVxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgSXRlbVB1dEFjdGlvbj4ge1xuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tQ29sb3JzID0gZ2V0RGVmYXVsdEN1c3RvbUNvbG9yRGF0YSgpIH0gPSBnZXRTdGF0ZSgpLml0ZW1zO1xuXG4gICAgaWYgKCFjdXN0b21Db2xvcnMuY29sb3JzW2NvbG9ySWRdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEN1c3RvbUNvbG9ycyA9IHtcbiAgICAgIC4uLmN1c3RvbUNvbG9ycyxcbiAgICAgIGNvbG9yczoge1xuICAgICAgICAuLi5jdXN0b21Db2xvcnMuY29sb3JzLFxuICAgICAgICBbY29sb3JJZF06IGNvbG9yLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZGlzcGF0Y2gocHV0SXRlbSgnY3VzdG9tQ29sb3JzJywgbmV4dEN1c3RvbUNvbG9ycykpO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZW1vdmVDdXN0b21Db2xvcihcbiAgcGF5bG9hZDogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBJdGVtUHV0QWN0aW9uPiB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBjdXN0b21Db2xvcnMgPSBnZXREZWZhdWx0Q3VzdG9tQ29sb3JEYXRhKCkgfSA9IGdldFN0YXRlKCkuaXRlbXM7XG5cbiAgICBjb25zdCBuZXh0Q3VzdG9tQ29sb3JzID0ge1xuICAgICAgLi4uY3VzdG9tQ29sb3JzLFxuICAgICAgY29sb3JzOiBvbWl0KGN1c3RvbUNvbG9ycy5jb2xvcnMsIHBheWxvYWQpLFxuICAgIH07XG5cbiAgICBkaXNwYXRjaChwdXRJdGVtKCdjdXN0b21Db2xvcnMnLCBuZXh0Q3VzdG9tQ29sb3JzKSk7XG4gICAgcmVzZXREZWZhdWx0Q2hhdENvbG9yKCkoZGlzcGF0Y2gsIGdldFN0YXRlLCBudWxsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzZXREZWZhdWx0Q2hhdENvbG9yKCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBJdGVtUHV0QWN0aW9uXG4+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBkaXNwYXRjaChcbiAgICAgIHB1dEl0ZW0oJ2RlZmF1bHRDb252ZXJzYXRpb25Db2xvcicsIHtcbiAgICAgICAgY29sb3I6IENvbnZlcnNhdGlvbkNvbG9yc1swXSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZWxvYWRTZWxlY3RlZENvbnZlcnNhdGlvbigpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IoXG4gIGNvbG9yOiBDb252ZXJzYXRpb25Db2xvclR5cGUsXG4gIGN1c3RvbUNvbG9yRGF0YT86IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHZhbHVlOiBDdXN0b21Db2xvclR5cGU7XG4gIH1cbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIEl0ZW1QdXRBY3Rpb24+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBkaXNwYXRjaChcbiAgICAgIHB1dEl0ZW0oJ2RlZmF1bHRDb252ZXJzYXRpb25Db2xvcicsIHtcbiAgICAgICAgY29sb3IsXG4gICAgICAgIGN1c3RvbUNvbG9yRGF0YSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZWxvYWRTZWxlY3RlZENvbnZlcnNhdGlvbigpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzYXZlUHJlZmVycmVkTGVmdFBhbmVXaWR0aChcbiAgcHJlZmVycmVkV2lkdGg6IG51bWJlclxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgSXRlbVB1dEFjdGlvbj4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGRpc3BhdGNoKHB1dEl0ZW0oJ3ByZWZlcnJlZExlZnRQYW5lV2lkdGgnLCBwcmVmZXJyZWRXaWR0aCkpO1xuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IEl0ZW1zU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3I6IHtcbiAgICAgIGNvbG9yOiBDb252ZXJzYXRpb25Db2xvcnNbMF0sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gIHN0YXRlOiBSZWFkb25seTxJdGVtc1N0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8SXRlbXNBY3Rpb25UeXBlPlxuKTogSXRlbXNTdGF0ZVR5cGUge1xuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdpdGVtcy9QVVRfRVhURVJOQUwnKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBbcGF5bG9hZC5rZXldOiBwYXlsb2FkLnZhbHVlLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdpdGVtcy9SRU1PVkVfRVhURVJOQUwnKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG5cbiAgICByZXR1cm4gb21pdChzdGF0ZSwgcGF5bG9hZCk7XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdpdGVtcy9SRVNFVCcpIHtcbiAgICByZXR1cm4gZ2V0RW1wdHlTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFxQjtBQUNyQixrQkFBOEI7QUFHOUIsa0JBQTZCO0FBQzdCLDZCQUFnQztBQU9oQyxvQkFBbUM7QUFDbkMsd0NBQTJDO0FBRTNDLDJCQUErQztBQThEeEMsTUFBTSxVQUFVO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVPLE1BQU0sYUFBYSw2QkFBc0IsNENBQWdCLE9BQU8sR0FBN0M7QUFFMUIsaUJBQ0UsS0FDQSxPQUNlO0FBQ2YsY0FBWSxJQUFJLEtBQUssS0FBSztBQUUxQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUNGO0FBVlMsQUFZVCx1QkFBdUIsTUFBNkI7QUFDbEQsU0FBTyxRQUFRLFlBQVksSUFBSTtBQUNqQztBQUZTLEFBSVQsb0NBS0U7QUFDQSxTQUFPLENBQUMsVUFBVSxhQUFhO0FBQzdCLFVBQU0scUJBQXFCLFFBQVEsU0FBUyxFQUFFLE1BQU0sa0JBQWtCO0FBRXRFLGFBQVMsUUFBUSxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQztBQUFBLEVBQzdEO0FBQ0Y7QUFYUyxBQWFULHlCQUF5QixLQUFhLE9BQXVDO0FBQzNFLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFSUyxBQVVULG9CQUFvQixLQUFnRDtBQUNsRSxjQUFZLE9BQU8sR0FBRztBQUV0QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUNGO0FBUFMsQUFTVCw0QkFBNEIsS0FBdUM7QUFDakUsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUxTLEFBT1Qsc0JBQXdDO0FBQ3RDLFNBQU8sRUFBRSxNQUFNLGNBQWM7QUFDL0I7QUFGUyxBQUlULHFDQUFxQztBQUNuQyxTQUFPO0FBQUEsSUFDTCxRQUFRLENBQUM7QUFBQSxJQUNULFNBQVM7QUFBQSxFQUNYO0FBQ0Y7QUFMUyxBQU9ULHdCQUNFLGFBQ0EsZ0JBQzBEO0FBQzFELFNBQU8sQ0FBQyxVQUFVLGFBQWE7QUFDN0IsVUFBTSxFQUFFLGVBQWUsMEJBQTBCLE1BQU0sU0FBUyxFQUFFO0FBRWxFLFFBQUksT0FBTyxvQkFBUTtBQUNuQixXQUFPLGFBQWEsT0FBTyxPQUFPO0FBQ2hDLGFBQU8sb0JBQVE7QUFBQSxJQUNqQjtBQUVBLFVBQU0sbUJBQW1CO0FBQUEsU0FDcEI7QUFBQSxNQUNILFFBQVE7QUFBQSxXQUNILGFBQWE7QUFBQSxTQUNmLE9BQU87QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUVBLGFBQVMsUUFBUSxnQkFBZ0IsZ0JBQWdCLENBQUM7QUFFbEQsVUFBTSxrQkFBa0I7QUFBQSxNQUN0QixJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksZ0JBQWdCO0FBQ2xCLG1DQUFvQixjQUFjO0FBQUEsUUFDaEM7QUFBQSxRQUNBLG1CQUFtQjtBQUFBLFFBQ25CO0FBQUEsTUFDRixDQUFDLEVBQUUsVUFBVSxVQUFVLElBQUk7QUFBQSxJQUM3QixPQUFPO0FBQ0wsd0NBQWtDLFVBQVUsZUFBZSxFQUN6RCxVQUNBLFVBQ0EsSUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUF6Q1MsQUEyQ1QseUJBQ0UsU0FDQSxPQUMwRDtBQUMxRCxTQUFPLENBQUMsVUFBVSxhQUFhO0FBQzdCLFVBQU0sRUFBRSxlQUFlLDBCQUEwQixNQUFNLFNBQVMsRUFBRTtBQUVsRSxRQUFJLENBQUMsYUFBYSxPQUFPLFVBQVU7QUFDakM7QUFBQSxJQUNGO0FBRUEsVUFBTSxtQkFBbUI7QUFBQSxTQUNwQjtBQUFBLE1BQ0gsUUFBUTtBQUFBLFdBQ0gsYUFBYTtBQUFBLFNBQ2YsVUFBVTtBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBRUEsYUFBUyxRQUFRLGdCQUFnQixnQkFBZ0IsQ0FBQztBQUFBLEVBQ3BEO0FBQ0Y7QUFyQlMsQUF1QlQsMkJBQ0UsU0FDMEQ7QUFDMUQsU0FBTyxDQUFDLFVBQVUsYUFBYTtBQUM3QixVQUFNLEVBQUUsZUFBZSwwQkFBMEIsTUFBTSxTQUFTLEVBQUU7QUFFbEUsVUFBTSxtQkFBbUI7QUFBQSxTQUNwQjtBQUFBLE1BQ0gsUUFBUSx3QkFBSyxhQUFhLFFBQVEsT0FBTztBQUFBLElBQzNDO0FBRUEsYUFBUyxRQUFRLGdCQUFnQixnQkFBZ0IsQ0FBQztBQUNsRCwwQkFBc0IsRUFBRSxVQUFVLFVBQVUsSUFBSTtBQUFBLEVBQ2xEO0FBQ0Y7QUFkUyxBQWdCVCxpQ0FLRTtBQUNBLFNBQU8sY0FBWTtBQUNqQixhQUNFLFFBQVEsNEJBQTRCO0FBQUEsTUFDbEMsT0FBTyxpQ0FBbUI7QUFBQSxJQUM1QixDQUFDLENBQ0g7QUFDQSxzRUFBMkI7QUFBQSxFQUM3QjtBQUNGO0FBZFMsQUFnQlQsMkNBQ0UsT0FDQSxpQkFJMEQ7QUFDMUQsU0FBTyxjQUFZO0FBQ2pCLGFBQ0UsUUFBUSw0QkFBNEI7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUMsQ0FDSDtBQUNBLHNFQUEyQjtBQUFBLEVBQzdCO0FBQ0Y7QUFoQlMsQUFrQlQsb0NBQ0UsZ0JBQzBEO0FBQzFELFNBQU8sY0FBWTtBQUNqQixhQUFTLFFBQVEsMEJBQTBCLGNBQWMsQ0FBQztBQUFBLEVBQzVEO0FBQ0Y7QUFOUyxBQVVGLHlCQUF5QztBQUM5QyxTQUFPO0FBQUEsSUFDTCwwQkFBMEI7QUFBQSxNQUN4QixPQUFPLGlDQUFtQjtBQUFBLElBQzVCO0FBQUEsRUFDRjtBQUNGO0FBTmdCLEFBUVQsaUJBQ0wsUUFBa0MsY0FBYyxHQUNoRCxRQUNnQjtBQUNoQixNQUFJLE9BQU8sU0FBUyxzQkFBc0I7QUFDeEMsVUFBTSxFQUFFLFlBQVk7QUFFcEIsV0FBTztBQUFBLFNBQ0Y7QUFBQSxPQUNGLFFBQVEsTUFBTSxRQUFRO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFNBQVMseUJBQXlCO0FBQzNDLFVBQU0sRUFBRSxZQUFZO0FBRXBCLFdBQU8sd0JBQUssT0FBTyxPQUFPO0FBQUEsRUFDNUI7QUFFQSxNQUFJLE9BQU8sU0FBUyxlQUFlO0FBQ2pDLFdBQU8sY0FBYztBQUFBLEVBQ3ZCO0FBRUEsU0FBTztBQUNUO0FBeEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
