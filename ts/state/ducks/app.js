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
var app_exports = {};
__export(app_exports, {
  AppViewType: () => AppViewType,
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(app_exports);
var log = __toESM(require("../../logging/log"));
var AppViewType = /* @__PURE__ */ ((AppViewType2) => {
  AppViewType2["Blank"] = "Blank";
  AppViewType2["Inbox"] = "Inbox";
  AppViewType2["Installer"] = "Installer";
  AppViewType2["Standalone"] = "Standalone";
  return AppViewType2;
})(AppViewType || {});
const INITIAL_LOAD_COMPLETE = "app/INITIAL_LOAD_COMPLETE";
const OPEN_INBOX = "app/OPEN_INBOX";
const OPEN_INSTALLER = "app/OPEN_INSTALLER";
const OPEN_STANDALONE = "app/OPEN_STANDALONE";
const actions = {
  initialLoadComplete,
  openInbox,
  openInstaller,
  openStandalone
};
function initialLoadComplete() {
  return {
    type: INITIAL_LOAD_COMPLETE
  };
}
function openInbox() {
  return async (dispatch) => {
    log.info("open inbox");
    await window.ConversationController.load();
    dispatch({
      type: OPEN_INBOX
    });
  };
}
function openInstaller() {
  return (dispatch) => {
    window.addSetupMenuItems();
    dispatch({
      type: OPEN_INSTALLER
    });
  };
}
function openStandalone() {
  return (dispatch) => {
    if (window.getEnvironment() === "production") {
      return;
    }
    window.addSetupMenuItems();
    dispatch({
      type: OPEN_STANDALONE
    });
  };
}
function getEmptyState() {
  return {
    appView: "Blank" /* Blank */,
    hasInitialLoadCompleted: false
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === OPEN_INBOX) {
    return {
      ...state,
      appView: "Inbox" /* Inbox */
    };
  }
  if (action.type === INITIAL_LOAD_COMPLETE) {
    return {
      ...state,
      hasInitialLoadCompleted: true
    };
  }
  if (action.type === OPEN_INSTALLER) {
    return {
      ...state,
      appView: "Installer" /* Installer */
    };
  }
  if (action.type === OPEN_STANDALONE) {
    return {
      ...state,
      appView: "Standalone" /* Standalone */
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppViewType,
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG4vLyBTdGF0ZVxuXG5leHBvcnQgZW51bSBBcHBWaWV3VHlwZSB7XG4gIEJsYW5rID0gJ0JsYW5rJyxcbiAgSW5ib3ggPSAnSW5ib3gnLFxuICBJbnN0YWxsZXIgPSAnSW5zdGFsbGVyJyxcbiAgU3RhbmRhbG9uZSA9ICdTdGFuZGFsb25lJyxcbn1cblxuZXhwb3J0IHR5cGUgQXBwU3RhdGVUeXBlID0ge1xuICBhcHBWaWV3OiBBcHBWaWV3VHlwZTtcbiAgaGFzSW5pdGlhbExvYWRDb21wbGV0ZWQ6IGJvb2xlYW47XG59O1xuXG4vLyBBY3Rpb25zXG5cbmNvbnN0IElOSVRJQUxfTE9BRF9DT01QTEVURSA9ICdhcHAvSU5JVElBTF9MT0FEX0NPTVBMRVRFJztcbmNvbnN0IE9QRU5fSU5CT1ggPSAnYXBwL09QRU5fSU5CT1gnO1xuY29uc3QgT1BFTl9JTlNUQUxMRVIgPSAnYXBwL09QRU5fSU5TVEFMTEVSJztcbmNvbnN0IE9QRU5fU1RBTkRBTE9ORSA9ICdhcHAvT1BFTl9TVEFOREFMT05FJztcblxudHlwZSBJbml0aWFsTG9hZENvbXBsZXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIElOSVRJQUxfTE9BRF9DT01QTEVURTtcbn07XG5cbnR5cGUgT3BlbkluYm94QWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIE9QRU5fSU5CT1g7XG59O1xuXG50eXBlIE9wZW5JbnN0YWxsZXJBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgT1BFTl9JTlNUQUxMRVI7XG59O1xuXG50eXBlIE9wZW5TdGFuZGFsb25lQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIE9QRU5fU1RBTkRBTE9ORTtcbn07XG5cbmV4cG9ydCB0eXBlIEFwcEFjdGlvblR5cGUgPVxuICB8IEluaXRpYWxMb2FkQ29tcGxldGVBY3Rpb25UeXBlXG4gIHwgT3BlbkluYm94QWN0aW9uVHlwZVxuICB8IE9wZW5JbnN0YWxsZXJBY3Rpb25UeXBlXG4gIHwgT3BlblN0YW5kYWxvbmVBY3Rpb25UeXBlO1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgaW5pdGlhbExvYWRDb21wbGV0ZSxcbiAgb3BlbkluYm94LFxuICBvcGVuSW5zdGFsbGVyLFxuICBvcGVuU3RhbmRhbG9uZSxcbn07XG5cbmZ1bmN0aW9uIGluaXRpYWxMb2FkQ29tcGxldGUoKTogSW5pdGlhbExvYWRDb21wbGV0ZUFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IElOSVRJQUxfTE9BRF9DT01QTEVURSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gb3BlbkluYm94KCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBPcGVuSW5ib3hBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICBsb2cuaW5mbygnb3BlbiBpbmJveCcpO1xuXG4gICAgYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIubG9hZCgpO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogT1BFTl9JTkJPWCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb3Blbkluc3RhbGxlcigpOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgT3Blbkluc3RhbGxlckFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIHdpbmRvdy5hZGRTZXR1cE1lbnVJdGVtcygpO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogT1BFTl9JTlNUQUxMRVIsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9wZW5TdGFuZGFsb25lKCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBPcGVuU3RhbmRhbG9uZUFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGlmICh3aW5kb3cuZ2V0RW52aXJvbm1lbnQoKSA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LmFkZFNldHVwTWVudUl0ZW1zKCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogT1BFTl9TVEFOREFMT05FLFxuICAgIH0pO1xuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IEFwcFN0YXRlVHlwZSB7XG4gIHJldHVybiB7XG4gICAgYXBwVmlldzogQXBwVmlld1R5cGUuQmxhbmssXG4gICAgaGFzSW5pdGlhbExvYWRDb21wbGV0ZWQ6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PEFwcFN0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8QXBwQWN0aW9uVHlwZT5cbik6IEFwcFN0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gT1BFTl9JTkJPWCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFwcFZpZXc6IEFwcFZpZXdUeXBlLkluYm94LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IElOSVRJQUxfTE9BRF9DT01QTEVURSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGhhc0luaXRpYWxMb2FkQ29tcGxldGVkOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IE9QRU5fSU5TVEFMTEVSKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYXBwVmlldzogQXBwVmlld1R5cGUuSW5zdGFsbGVyLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IE9QRU5fU1RBTkRBTE9ORSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFwcFZpZXc6IEFwcFZpZXdUeXBlLlN0YW5kYWxvbmUsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxVQUFxQjtBQUlkLElBQUssY0FBTCxrQkFBSyxpQkFBTDtBQUNMLDBCQUFRO0FBQ1IsMEJBQVE7QUFDUiw4QkFBWTtBQUNaLCtCQUFhO0FBSkg7QUFBQTtBQWNaLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0sYUFBYTtBQUNuQixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLGtCQUFrQjtBQXdCakIsTUFBTSxVQUFVO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLCtCQUE4RDtBQUM1RCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsRUFDUjtBQUNGO0FBSlMsQUFNVCxxQkFLRTtBQUNBLFNBQU8sT0FBTSxhQUFZO0FBQ3ZCLFFBQUksS0FBSyxZQUFZO0FBRXJCLFVBQU0sT0FBTyx1QkFBdUIsS0FBSztBQUV6QyxhQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBZlMsQUFpQlQseUJBS0U7QUFDQSxTQUFPLGNBQVk7QUFDakIsV0FBTyxrQkFBa0I7QUFFekIsYUFBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQWJTLEFBZVQsMEJBS0U7QUFDQSxTQUFPLGNBQVk7QUFDakIsUUFBSSxPQUFPLGVBQWUsTUFBTSxjQUFjO0FBQzVDO0FBQUEsSUFDRjtBQUVBLFdBQU8sa0JBQWtCO0FBQ3pCLGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFoQlMsQUFvQkYseUJBQXVDO0FBQzVDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxJQUNULHlCQUF5QjtBQUFBLEVBQzNCO0FBQ0Y7QUFMZ0IsQUFPVCxpQkFDTCxRQUFnQyxjQUFjLEdBQzlDLFFBQ2M7QUFDZCxNQUFJLE9BQU8sU0FBUyxZQUFZO0FBQzlCLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE9BQU8sU0FBUyx1QkFBdUI7QUFDekMsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNILHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxTQUFTLGdCQUFnQjtBQUNsQyxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFNBQVMsaUJBQWlCO0FBQ25DLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFqQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
