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
var updates_exports = {};
__export(updates_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(updates_exports);
var updateIpc = __toESM(require("../../shims/updateIpc"));
var import_Dialogs = require("../../types/Dialogs");
var import_durations = require("../../util/durations");
const DISMISS_DIALOG = "updates/DISMISS_DIALOG";
const SHOW_UPDATE_DIALOG = "updates/SHOW_UPDATE_DIALOG";
const SNOOZE_UPDATE = "updates/SNOOZE_UPDATE";
const START_UPDATE = "updates/START_UPDATE";
const UNSNOOZE_UPDATE = "updates/UNSNOOZE_UPDATE";
function dismissDialog() {
  return {
    type: DISMISS_DIALOG
  };
}
function showUpdateDialog(dialogType, updateDialogOptions = {}) {
  return {
    type: SHOW_UPDATE_DIALOG,
    payload: {
      dialogType,
      otherState: updateDialogOptions
    }
  };
}
function snoozeUpdate() {
  return (dispatch, getState) => {
    const { dialogType } = getState().updates;
    setTimeout(() => {
      dispatch({
        type: UNSNOOZE_UPDATE,
        payload: dialogType
      });
    }, import_durations.DAY);
    dispatch({
      type: SNOOZE_UPDATE
    });
  };
}
function startUpdate() {
  return async (dispatch) => {
    dispatch({
      type: START_UPDATE
    });
    try {
      await updateIpc.startUpdate();
    } catch (_) {
      dispatch({
        type: SHOW_UPDATE_DIALOG,
        payload: {
          dialogType: import_Dialogs.DialogType.Cannot_Update,
          otherState: {}
        }
      });
    }
  };
}
const actions = {
  dismissDialog,
  showUpdateDialog,
  snoozeUpdate,
  startUpdate
};
function getEmptyState() {
  return {
    dialogType: import_Dialogs.DialogType.None,
    didSnooze: false,
    showEventsCount: 0
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === SHOW_UPDATE_DIALOG) {
    const { dialogType, otherState } = action.payload;
    return {
      ...state,
      ...otherState,
      dialogType,
      showEventsCount: state.showEventsCount + 1
    };
  }
  if (action.type === SNOOZE_UPDATE) {
    return {
      ...state,
      dialogType: import_Dialogs.DialogType.None,
      didSnooze: true
    };
  }
  if (action.type === START_UPDATE) {
    return {
      ...state,
      dialogType: import_Dialogs.DialogType.None
    };
  }
  if (action.type === DISMISS_DIALOG && state.dialogType === import_Dialogs.DialogType.MacOS_Read_Only) {
    return {
      ...state,
      dialogType: import_Dialogs.DialogType.None
    };
  }
  if (action.type === UNSNOOZE_UPDATE) {
    return {
      ...state,
      dialogType: action.payload,
      didSnooze: false
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFRodW5rQWN0aW9uIH0gZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0ICogYXMgdXBkYXRlSXBjIGZyb20gJy4uLy4uL3NoaW1zL3VwZGF0ZUlwYyc7XG5pbXBvcnQgeyBEaWFsb2dUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvRGlhbG9ncyc7XG5pbXBvcnQgeyBEQVkgfSBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5cbi8vIFN0YXRlXG5cbmV4cG9ydCB0eXBlIFVwZGF0ZXNTdGF0ZVR5cGUgPSB7XG4gIGRpYWxvZ1R5cGU6IERpYWxvZ1R5cGU7XG4gIGRpZFNub296ZTogYm9vbGVhbjtcbiAgZG93bmxvYWRTaXplPzogbnVtYmVyO1xuICBkb3dubG9hZGVkU2l6ZT86IG51bWJlcjtcbiAgc2hvd0V2ZW50c0NvdW50OiBudW1iZXI7XG4gIHZlcnNpb24/OiBzdHJpbmc7XG59O1xuXG4vLyBBY3Rpb25zXG5cbmNvbnN0IERJU01JU1NfRElBTE9HID0gJ3VwZGF0ZXMvRElTTUlTU19ESUFMT0cnO1xuY29uc3QgU0hPV19VUERBVEVfRElBTE9HID0gJ3VwZGF0ZXMvU0hPV19VUERBVEVfRElBTE9HJztcbmNvbnN0IFNOT09aRV9VUERBVEUgPSAndXBkYXRlcy9TTk9PWkVfVVBEQVRFJztcbmNvbnN0IFNUQVJUX1VQREFURSA9ICd1cGRhdGVzL1NUQVJUX1VQREFURSc7XG5jb25zdCBVTlNOT09aRV9VUERBVEUgPSAndXBkYXRlcy9VTlNOT09aRV9VUERBVEUnO1xuXG5leHBvcnQgdHlwZSBVcGRhdGVEaWFsb2dPcHRpb25zVHlwZSA9IHtcbiAgZG93bmxvYWRTaXplPzogbnVtYmVyO1xuICBkb3dubG9hZGVkU2l6ZT86IG51bWJlcjtcbiAgdmVyc2lvbj86IHN0cmluZztcbn07XG5cbnR5cGUgRGlzbWlzc0RpYWxvZ0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6IHR5cGVvZiBESVNNSVNTX0RJQUxPRztcbn07XG5cbmV4cG9ydCB0eXBlIFNob3dVcGRhdGVEaWFsb2dBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgU0hPV19VUERBVEVfRElBTE9HO1xuICBwYXlsb2FkOiB7XG4gICAgZGlhbG9nVHlwZTogRGlhbG9nVHlwZTtcbiAgICBvdGhlclN0YXRlOiBVcGRhdGVEaWFsb2dPcHRpb25zVHlwZTtcbiAgfTtcbn07XG5cbnR5cGUgU25vb3plVXBkYXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIFNOT09aRV9VUERBVEU7XG59O1xuXG50eXBlIFN0YXJ0VXBkYXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIFNUQVJUX1VQREFURTtcbn07XG5cbnR5cGUgVW5zbm9vemVVcGRhdGVBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgVU5TTk9PWkVfVVBEQVRFO1xuICBwYXlsb2FkOiBEaWFsb2dUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgVXBkYXRlc0FjdGlvblR5cGUgPVxuICB8IERpc21pc3NEaWFsb2dBY3Rpb25UeXBlXG4gIHwgU2hvd1VwZGF0ZURpYWxvZ0FjdGlvblR5cGVcbiAgfCBTbm9vemVVcGRhdGVBY3Rpb25UeXBlXG4gIHwgU3RhcnRVcGRhdGVBY3Rpb25UeXBlXG4gIHwgVW5zbm9vemVVcGRhdGVBY3Rpb25UeXBlO1xuXG4vLyBBY3Rpb24gQ3JlYXRvcnNcblxuZnVuY3Rpb24gZGlzbWlzc0RpYWxvZygpOiBEaXNtaXNzRGlhbG9nQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogRElTTUlTU19ESUFMT0csXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNob3dVcGRhdGVEaWFsb2coXG4gIGRpYWxvZ1R5cGU6IERpYWxvZ1R5cGUsXG4gIHVwZGF0ZURpYWxvZ09wdGlvbnM6IFVwZGF0ZURpYWxvZ09wdGlvbnNUeXBlID0ge31cbik6IFNob3dVcGRhdGVEaWFsb2dBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBTSE9XX1VQREFURV9ESUFMT0csXG4gICAgcGF5bG9hZDoge1xuICAgICAgZGlhbG9nVHlwZSxcbiAgICAgIG90aGVyU3RhdGU6IHVwZGF0ZURpYWxvZ09wdGlvbnMsXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc25vb3plVXBkYXRlKCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBTbm9vemVVcGRhdGVBY3Rpb25UeXBlIHwgVW5zbm9vemVVcGRhdGVBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCB7IGRpYWxvZ1R5cGUgfSA9IGdldFN0YXRlKCkudXBkYXRlcztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVU5TTk9PWkVfVVBEQVRFLFxuICAgICAgICBwYXlsb2FkOiBkaWFsb2dUeXBlLFxuICAgICAgfSk7XG4gICAgfSwgREFZKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFNOT09aRV9VUERBVEUsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VXBkYXRlKCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBTdGFydFVwZGF0ZUFjdGlvblR5cGUgfCBTaG93VXBkYXRlRGlhbG9nQWN0aW9uVHlwZVxuPiB7XG4gIHJldHVybiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogU1RBUlRfVVBEQVRFLFxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHVwZGF0ZUlwYy5zdGFydFVwZGF0ZSgpO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0hPV19VUERBVEVfRElBTE9HLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgZGlhbG9nVHlwZTogRGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlLFxuICAgICAgICAgIG90aGVyU3RhdGU6IHt9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgZGlzbWlzc0RpYWxvZyxcbiAgc2hvd1VwZGF0ZURpYWxvZyxcbiAgc25vb3plVXBkYXRlLFxuICBzdGFydFVwZGF0ZSxcbn07XG5cbi8vIFJlZHVjZXJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RhdGUoKTogVXBkYXRlc1N0YXRlVHlwZSB7XG4gIHJldHVybiB7XG4gICAgZGlhbG9nVHlwZTogRGlhbG9nVHlwZS5Ob25lLFxuICAgIGRpZFNub296ZTogZmFsc2UsXG4gICAgc2hvd0V2ZW50c0NvdW50OiAwLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PFVwZGF0ZXNTdGF0ZVR5cGU+ID0gZ2V0RW1wdHlTdGF0ZSgpLFxuICBhY3Rpb246IFJlYWRvbmx5PFVwZGF0ZXNBY3Rpb25UeXBlPlxuKTogVXBkYXRlc1N0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0hPV19VUERBVEVfRElBTE9HKSB7XG4gICAgY29uc3QgeyBkaWFsb2dUeXBlLCBvdGhlclN0YXRlIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIC4uLm90aGVyU3RhdGUsXG4gICAgICBkaWFsb2dUeXBlLFxuICAgICAgc2hvd0V2ZW50c0NvdW50OiBzdGF0ZS5zaG93RXZlbnRzQ291bnQgKyAxLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFNOT09aRV9VUERBVEUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBkaWFsb2dUeXBlOiBEaWFsb2dUeXBlLk5vbmUsXG4gICAgICBkaWRTbm9vemU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU1RBUlRfVVBEQVRFKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZGlhbG9nVHlwZTogRGlhbG9nVHlwZS5Ob25lLFxuICAgIH07XG4gIH1cblxuICBpZiAoXG4gICAgYWN0aW9uLnR5cGUgPT09IERJU01JU1NfRElBTE9HICYmXG4gICAgc3RhdGUuZGlhbG9nVHlwZSA9PT0gRGlhbG9nVHlwZS5NYWNPU19SZWFkX09ubHlcbiAgKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZGlhbG9nVHlwZTogRGlhbG9nVHlwZS5Ob25lLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFVOU05PT1pFX1VQREFURSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGRpYWxvZ1R5cGU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgZGlkU25vb3plOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxnQkFBMkI7QUFDM0IscUJBQTJCO0FBQzNCLHVCQUFvQjtBQWdCcEIsTUFBTSxpQkFBaUI7QUFDdkIsTUFBTSxxQkFBcUI7QUFDM0IsTUFBTSxnQkFBZ0I7QUFDdEIsTUFBTSxlQUFlO0FBQ3JCLE1BQU0sa0JBQWtCO0FBMEN4Qix5QkFBa0Q7QUFDaEQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLEVBQ1I7QUFDRjtBQUpTLEFBTVQsMEJBQ0UsWUFDQSxzQkFBK0MsQ0FBQyxHQUNwQjtBQUM1QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0EsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQ0Y7QUFYUyxBQWFULHdCQUtFO0FBQ0EsU0FBTyxDQUFDLFVBQVUsYUFBYTtBQUM3QixVQUFNLEVBQUUsZUFBZSxTQUFTLEVBQUU7QUFDbEMsZUFBVyxNQUFNO0FBQ2YsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUFBLElBQ0gsR0FBRyxvQkFBRztBQUVOLGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFuQlMsQUFxQlQsdUJBS0U7QUFDQSxTQUFPLE9BQU0sYUFBWTtBQUN2QixhQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBRUQsUUFBSTtBQUNGLFlBQU0sVUFBVSxZQUFZO0FBQUEsSUFDOUIsU0FBUyxHQUFQO0FBQ0EsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsWUFBWSwwQkFBVztBQUFBLFVBQ3ZCLFlBQVksQ0FBQztBQUFBLFFBQ2Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBdkJTLEFBeUJGLE1BQU0sVUFBVTtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFJTyx5QkFBMkM7QUFDaEQsU0FBTztBQUFBLElBQ0wsWUFBWSwwQkFBVztBQUFBLElBQ3ZCLFdBQVc7QUFBQSxJQUNYLGlCQUFpQjtBQUFBLEVBQ25CO0FBQ0Y7QUFOZ0IsQUFRVCxpQkFDTCxRQUFvQyxjQUFjLEdBQ2xELFFBQ2tCO0FBQ2xCLE1BQUksT0FBTyxTQUFTLG9CQUFvQjtBQUN0QyxVQUFNLEVBQUUsWUFBWSxlQUFlLE9BQU87QUFFMUMsV0FBTztBQUFBLFNBQ0Y7QUFBQSxTQUNBO0FBQUEsTUFDSDtBQUFBLE1BQ0EsaUJBQWlCLE1BQU0sa0JBQWtCO0FBQUEsSUFDM0M7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFNBQVMsZUFBZTtBQUNqQyxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsWUFBWSwwQkFBVztBQUFBLE1BQ3ZCLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxTQUFTLGNBQWM7QUFDaEMsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNILFlBQVksMEJBQVc7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFFQSxNQUNFLE9BQU8sU0FBUyxrQkFDaEIsTUFBTSxlQUFlLDBCQUFXLGlCQUNoQztBQUNBLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxZQUFZLDBCQUFXO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFNBQVMsaUJBQWlCO0FBQ25DLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxZQUFZLE9BQU87QUFBQSxNQUNuQixXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFqRGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
