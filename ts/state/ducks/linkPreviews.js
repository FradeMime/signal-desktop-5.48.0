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
var linkPreviews_exports = {};
__export(linkPreviews_exports, {
  ADD_PREVIEW: () => ADD_PREVIEW,
  REMOVE_PREVIEW: () => REMOVE_PREVIEW,
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer,
  useLinkPreviewActions: () => useLinkPreviewActions
});
module.exports = __toCommonJS(linkPreviews_exports);
var import_assignWithNoUnnecessaryAllocation = require("../../util/assignWithNoUnnecessaryAllocation");
var import_LinkPreview = require("../../services/LinkPreview");
var import_useBoundActions = require("../../hooks/useBoundActions");
const ADD_PREVIEW = "linkPreviews/ADD_PREVIEW";
const REMOVE_PREVIEW = "linkPreviews/REMOVE_PREVIEW";
function debouncedMaybeGrabLinkPreview(message, source) {
  return (dispatch) => {
    (0, import_LinkPreview.maybeGrabLinkPreview)(message, source);
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function addLinkPreview(linkPreview, source) {
  return {
    type: ADD_PREVIEW,
    payload: {
      linkPreview,
      source
    }
  };
}
function removeLinkPreview() {
  return {
    type: REMOVE_PREVIEW
  };
}
const actions = {
  addLinkPreview,
  debouncedMaybeGrabLinkPreview,
  removeLinkPreview
};
const useLinkPreviewActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useLinkPreviewActions");
function getEmptyState() {
  return {
    linkPreview: void 0
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === ADD_PREVIEW) {
    const { payload } = action;
    return {
      linkPreview: payload.linkPreview,
      source: payload.source
    };
  }
  if (action.type === REMOVE_PREVIEW) {
    return (0, import_assignWithNoUnnecessaryAllocation.assignWithNoUnnecessaryAllocation)(state, {
      linkPreview: void 0,
      source: void 0
    });
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ADD_PREVIEW,
  REMOVE_PREVIEW,
  actions,
  getEmptyState,
  reducer,
  useLinkPreviewActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlua1ByZXZpZXdzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuayc7XG5cbmltcG9ydCB0eXBlIHsgTm9vcEFjdGlvblR5cGUgfSBmcm9tICcuL25vb3AnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgYXMgUm9vdFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBMaW5rUHJldmlld1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9tZXNzYWdlL0xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgdHlwZSB7IExpbmtQcmV2aWV3U291cmNlVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xpbmtQcmV2aWV3JztcbmltcG9ydCB7IGFzc2lnbldpdGhOb1VubmVjZXNzYXJ5QWxsb2NhdGlvbiB9IGZyb20gJy4uLy4uL3V0aWwvYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uJztcbmltcG9ydCB7IG1heWJlR3JhYkxpbmtQcmV2aWV3IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvTGlua1ByZXZpZXcnO1xuaW1wb3J0IHsgdXNlQm91bmRBY3Rpb25zIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlQm91bmRBY3Rpb25zJztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgTGlua1ByZXZpZXdzU3RhdGVUeXBlID0ge1xuICByZWFkb25seSBsaW5rUHJldmlldz86IExpbmtQcmV2aWV3VHlwZTtcbiAgcmVhZG9ubHkgc291cmNlPzogTGlua1ByZXZpZXdTb3VyY2VUeXBlO1xufTtcblxuLy8gQWN0aW9uc1xuXG5leHBvcnQgY29uc3QgQUREX1BSRVZJRVcgPSAnbGlua1ByZXZpZXdzL0FERF9QUkVWSUVXJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfUFJFVklFVyA9ICdsaW5rUHJldmlld3MvUkVNT1ZFX1BSRVZJRVcnO1xuXG5leHBvcnQgdHlwZSBBZGRMaW5rUHJldmlld0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdsaW5rUHJldmlld3MvQUREX1BSRVZJRVcnO1xuICBwYXlsb2FkOiB7XG4gICAgbGlua1ByZXZpZXc6IExpbmtQcmV2aWV3VHlwZTtcbiAgICBzb3VyY2U6IExpbmtQcmV2aWV3U291cmNlVHlwZTtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIFJlbW92ZUxpbmtQcmV2aWV3QWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2xpbmtQcmV2aWV3cy9SRU1PVkVfUFJFVklFVyc7XG59O1xuXG50eXBlIExpbmtQcmV2aWV3c0FjdGlvblR5cGUgPVxuICB8IEFkZExpbmtQcmV2aWV3QWN0aW9uVHlwZVxuICB8IFJlbW92ZUxpbmtQcmV2aWV3QWN0aW9uVHlwZTtcblxuLy8gQWN0aW9uIENyZWF0b3JzXG5cbmZ1bmN0aW9uIGRlYm91bmNlZE1heWJlR3JhYkxpbmtQcmV2aWV3KFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHNvdXJjZTogTGlua1ByZXZpZXdTb3VyY2VUeXBlXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBOb29wQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIG1heWJlR3JhYkxpbmtQcmV2aWV3KG1lc3NhZ2UsIHNvdXJjZSk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnTk9PUCcsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhZGRMaW5rUHJldmlldyhcbiAgbGlua1ByZXZpZXc6IExpbmtQcmV2aWV3VHlwZSxcbiAgc291cmNlOiBMaW5rUHJldmlld1NvdXJjZVR5cGVcbik6IEFkZExpbmtQcmV2aWV3QWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQUREX1BSRVZJRVcsXG4gICAgcGF5bG9hZDoge1xuICAgICAgbGlua1ByZXZpZXcsXG4gICAgICBzb3VyY2UsXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGlua1ByZXZpZXcoKTogUmVtb3ZlTGlua1ByZXZpZXdBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRU1PVkVfUFJFVklFVyxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gIGFkZExpbmtQcmV2aWV3LFxuICBkZWJvdW5jZWRNYXliZUdyYWJMaW5rUHJldmlldyxcbiAgcmVtb3ZlTGlua1ByZXZpZXcsXG59O1xuXG5leHBvcnQgY29uc3QgdXNlTGlua1ByZXZpZXdBY3Rpb25zID0gKCk6IHR5cGVvZiBhY3Rpb25zID0+XG4gIHVzZUJvdW5kQWN0aW9ucyhhY3Rpb25zKTtcblxuLy8gUmVkdWNlclxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW1wdHlTdGF0ZSgpOiBMaW5rUHJldmlld3NTdGF0ZVR5cGUge1xuICByZXR1cm4ge1xuICAgIGxpbmtQcmV2aWV3OiB1bmRlZmluZWQsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8TGlua1ByZXZpZXdzU3RhdGVUeXBlPiA9IGdldEVtcHR5U3RhdGUoKSxcbiAgYWN0aW9uOiBSZWFkb25seTxMaW5rUHJldmlld3NBY3Rpb25UeXBlPlxuKTogTGlua1ByZXZpZXdzU3RhdGVUeXBlIHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSBBRERfUFJFVklFVykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmtQcmV2aWV3OiBwYXlsb2FkLmxpbmtQcmV2aWV3LFxuICAgICAgc291cmNlOiBwYXlsb2FkLnNvdXJjZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBSRU1PVkVfUFJFVklFVykge1xuICAgIHJldHVybiBhc3NpZ25XaXRoTm9Vbm5lY2Vzc2FyeUFsbG9jYXRpb24oc3RhdGUsIHtcbiAgICAgIGxpbmtQcmV2aWV3OiB1bmRlZmluZWQsXG4gICAgICBzb3VyY2U6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0EsK0NBQWtEO0FBQ2xELHlCQUFxQztBQUNyQyw2QkFBZ0M7QUFXekIsTUFBTSxjQUFjO0FBQ3BCLE1BQU0saUJBQWlCO0FBb0I5Qix1Q0FDRSxTQUNBLFFBQzJEO0FBQzNELFNBQU8sY0FBWTtBQUNqQixpREFBcUIsU0FBUyxNQUFNO0FBRXBDLGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFaUyxBQWNULHdCQUNFLGFBQ0EsUUFDMEI7QUFDMUIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQVhTLEFBYVQsNkJBQTBEO0FBQ3hELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFKUyxBQU1GLE1BQU0sVUFBVTtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVPLE1BQU0sd0JBQXdCLDZCQUNuQyw0Q0FBZ0IsT0FBTyxHQURZO0FBSzlCLHlCQUFnRDtBQUNyRCxTQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsRUFDZjtBQUNGO0FBSmdCLEFBTVQsaUJBQ0wsUUFBeUMsY0FBYyxHQUN2RCxRQUN1QjtBQUN2QixNQUFJLE9BQU8sU0FBUyxhQUFhO0FBQy9CLFVBQU0sRUFBRSxZQUFZO0FBRXBCLFdBQU87QUFBQSxNQUNMLGFBQWEsUUFBUTtBQUFBLE1BQ3JCLFFBQVEsUUFBUTtBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxTQUFTLGdCQUFnQjtBQUNsQyxXQUFPLGdGQUFrQyxPQUFPO0FBQUEsTUFDOUMsYUFBYTtBQUFBLE1BQ2IsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPO0FBQ1Q7QUFyQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
