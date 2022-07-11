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
var stickers_exports = {};
__export(stickers_exports, {
  addImageData: () => addImageData,
  addToast: () => addToast,
  dismissToast: () => dismissToast,
  initializeStickers: () => initializeStickers,
  maxByteSize: () => maxByteSize,
  maxStickers: () => maxStickers,
  minStickers: () => minStickers,
  moveSticker: () => moveSticker,
  reducer: () => reducer,
  removeSticker: () => removeSticker,
  reset: () => reset,
  resetCover: () => resetCover,
  resetStatus: () => resetStatus,
  setAuthor: () => setAuthor,
  setCover: () => setCover,
  setEmoji: () => setEmoji,
  setPackMeta: () => setPackMeta,
  setTitle: () => setTitle,
  useAddMoreCount: () => useAddMoreCount,
  useAllDataValid: () => useAllDataValid,
  useAuthor: () => useAuthor,
  useCover: () => useCover,
  useEmojisReady: () => useEmojisReady,
  useOrderedImagePaths: () => useOrderedImagePaths,
  usePackUrl: () => usePackUrl,
  useSelectOrderedData: () => useSelectOrderedData,
  useStickerActions: () => useStickerActions,
  useStickerData: () => useStickerData,
  useStickerOrder: () => useStickerOrder,
  useStickersReady: () => useStickersReady,
  useTitle: () => useTitle,
  useToasts: () => useToasts
});
module.exports = __toCommonJS(stickers_exports);
var import_react = require("react");
var import_redux_ts_utils = require("redux-ts-utils");
var import_react_redux = require("react-redux");
var import_reselect = require("reselect");
var import_lodash = require("lodash");
var import_redux = require("redux");
var import_array_move = __toESM(require("array-move"));
var import_lib = require("../../../ts/components/emoji/lib");
var import_isNotNil = require("../../../ts/util/isNotNil");
const initializeStickers = (0, import_redux_ts_utils.createAction)("stickers/initializeStickers");
const addImageData = (0, import_redux_ts_utils.createAction)("stickers/addSticker");
const removeSticker = (0, import_redux_ts_utils.createAction)("stickers/removeSticker");
const moveSticker = (0, import_redux_ts_utils.createAction)("stickers/moveSticker");
const setCover = (0, import_redux_ts_utils.createAction)("stickers/setCover");
const resetCover = (0, import_redux_ts_utils.createAction)("stickers/resetCover");
const setEmoji = (0, import_redux_ts_utils.createAction)("stickers/setEmoji");
const setTitle = (0, import_redux_ts_utils.createAction)("stickers/setTitle");
const setAuthor = (0, import_redux_ts_utils.createAction)("stickers/setAuthor");
const setPackMeta = (0, import_redux_ts_utils.createAction)("stickers/setPackMeta");
const addToast = (0, import_redux_ts_utils.createAction)("stickers/addToast");
const dismissToast = (0, import_redux_ts_utils.createAction)("stickers/dismissToast");
const resetStatus = (0, import_redux_ts_utils.createAction)("stickers/resetStatus");
const reset = (0, import_redux_ts_utils.createAction)("stickers/reset");
const minStickers = 1;
const maxStickers = 200;
const maxByteSize = 300 * 1024;
const defaultState = {
  order: [],
  data: {},
  title: "",
  author: "",
  packId: "",
  packKey: "",
  toasts: []
};
const adjustCover = /* @__PURE__ */ __name((state) => {
  const first = state.order[0];
  if (first) {
    state.cover = state.data[first].imageData;
  } else {
    delete state.cover;
  }
}, "adjustCover");
const reducer = (0, import_redux_ts_utils.reduceReducers)([
  (0, import_redux_ts_utils.handleAction)(initializeStickers, (state, { payload }) => {
    const truncated = (0, import_lodash.take)((0, import_lodash.uniq)([...state.order, ...payload]), maxStickers - state.order.length);
    truncated.forEach((path) => {
      if (!state.data[path]) {
        state.data[path] = {};
        state.order.push(path);
      }
    });
  }),
  (0, import_redux_ts_utils.handleAction)(addImageData, (state, { payload }) => {
    if ((0, import_lodash.isNumber)(payload.meta.pages)) {
      state.toasts.push({ key: "StickerCreator--Toasts--animated" });
      (0, import_lodash.pull)(state.order, payload.path);
      delete state.data[payload.path];
    } else if (payload.buffer.byteLength > maxByteSize) {
      state.toasts.push({ key: "StickerCreator--Toasts--tooLarge" });
      (0, import_lodash.pull)(state.order, payload.path);
      delete state.data[payload.path];
    } else {
      const data = state.data[payload.path];
      if (data && !data.imageData) {
        data.imageData = payload;
        const key = "StickerCreator--Toasts--imagesAdded";
        const toast = (() => {
          const oldToast = (0, import_lodash.find)(state.toasts, { key });
          if (oldToast) {
            return oldToast;
          }
          const newToast = { key, subs: ["0"] };
          state.toasts.push(newToast);
          return newToast;
        })();
        const previousSub = toast?.subs?.[0];
        if (toast && (0, import_lodash.isString)(previousSub)) {
          const previousCount = parseInt(previousSub, 10);
          const newCount = Number.isFinite(previousCount) ? previousCount + 1 : 1;
          toast.subs = toast.subs || [];
          toast.subs[0] = newCount.toString();
        }
      }
    }
    adjustCover(state);
  }),
  (0, import_redux_ts_utils.handleAction)(removeSticker, (state, { payload }) => {
    (0, import_lodash.pull)(state.order, payload);
    delete state.data[payload];
    adjustCover(state);
  }),
  (0, import_redux_ts_utils.handleAction)(moveSticker, (state, { payload }) => {
    import_array_move.default.mutate(state.order, payload.oldIndex, payload.newIndex);
  }),
  (0, import_redux_ts_utils.handleAction)(setCover, (state, { payload }) => {
    state.cover = payload;
  }),
  (0, import_redux_ts_utils.handleAction)(resetCover, (state) => {
    adjustCover(state);
  }),
  (0, import_redux_ts_utils.handleAction)(setEmoji, (state, { payload }) => {
    const data = state.data[payload.id];
    if (data) {
      data.emoji = payload.emoji;
    }
  }),
  (0, import_redux_ts_utils.handleAction)(setTitle, (state, { payload }) => {
    state.title = payload;
  }),
  (0, import_redux_ts_utils.handleAction)(setAuthor, (state, { payload }) => {
    state.author = payload;
  }),
  (0, import_redux_ts_utils.handleAction)(setPackMeta, (state, { payload: { packId, key } }) => {
    state.packId = packId;
    state.packKey = key;
  }),
  (0, import_redux_ts_utils.handleAction)(addToast, (state, { payload: toast }) => {
    (0, import_lodash.remove)(state.toasts, { key: toast.key });
    state.toasts.push(toast);
  }),
  (0, import_redux_ts_utils.handleAction)(dismissToast, (state) => {
    state.toasts.pop();
  }),
  (0, import_redux_ts_utils.handleAction)(resetStatus, (state) => {
    state.toasts = [];
  }),
  (0, import_redux_ts_utils.handleAction)(reset, () => defaultState)
], defaultState);
const useTitle = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => stickers.title), "useTitle");
const useAuthor = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => stickers.author), "useAuthor");
const useCover = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => stickers.cover), "useCover");
const useStickerOrder = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => stickers.order), "useStickerOrder");
const useStickerData = /* @__PURE__ */ __name((src) => (0, import_react_redux.useSelector)(({ stickers }) => stickers.data[src]), "useStickerData");
const useStickersReady = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => stickers.order.length >= minStickers && stickers.order.length <= maxStickers && Object.values(stickers.data).every(({ imageData }) => Boolean(imageData))), "useStickersReady");
const useEmojisReady = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => Object.values(stickers.data).every(({ emoji }) => !!emoji)), "useEmojisReady");
const useAllDataValid = /* @__PURE__ */ __name(() => {
  const stickersReady = useStickersReady();
  const emojisReady = useEmojisReady();
  const cover = useCover();
  const title = useTitle();
  const author = useAuthor();
  return !!(stickersReady && emojisReady && cover && title && author);
}, "useAllDataValid");
const selectUrl = (0, import_reselect.createSelector)(({ stickers }) => stickers.packId, ({ stickers }) => stickers.packKey, (id, key) => `https://signal.art/addstickers/#pack_id=${id}&pack_key=${key}`);
const usePackUrl = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(selectUrl), "usePackUrl");
const useToasts = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => stickers.toasts), "useToasts");
const useAddMoreCount = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(({ stickers }) => (0, import_lodash.clamp)(minStickers - stickers.order.length, 0, minStickers)), "useAddMoreCount");
const selectOrderedData = (0, import_reselect.createSelector)(({ stickers }) => stickers.order, ({ stickers }) => stickers.data, (order, data) => order.map((id) => ({
  ...data[id],
  emoji: (0, import_lib.convertShortName)(data[id].emoji.shortName, data[id].emoji.skinTone)
})));
const useSelectOrderedData = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(selectOrderedData), "useSelectOrderedData");
const selectOrderedImagePaths = (0, import_reselect.createSelector)(selectOrderedData, (data) => data.map(({ imageData }) => imageData?.src).filter(import_isNotNil.isNotNil));
const useOrderedImagePaths = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(selectOrderedImagePaths), "useOrderedImagePaths");
const useStickerActions = /* @__PURE__ */ __name(() => {
  const dispatch = (0, import_react_redux.useDispatch)();
  return (0, import_react.useMemo)(() => (0, import_redux.bindActionCreators)({
    addImageData,
    initializeStickers,
    removeSticker,
    moveSticker,
    setCover,
    setEmoji,
    setTitle,
    setAuthor,
    setPackMeta,
    addToast,
    dismissToast,
    reset,
    resetStatus
  }, dispatch), [dispatch]);
}, "useStickerActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addImageData,
  addToast,
  dismissToast,
  initializeStickers,
  maxByteSize,
  maxStickers,
  minStickers,
  moveSticker,
  reducer,
  removeSticker,
  reset,
  resetCover,
  resetStatus,
  setAuthor,
  setCover,
  setEmoji,
  setPackMeta,
  setTitle,
  useAddMoreCount,
  useAllDataValid,
  useAuthor,
  useCover,
  useEmojisReady,
  useOrderedImagePaths,
  usePackUrl,
  useSelectOrderedData,
  useStickerActions,
  useStickerData,
  useStickerOrder,
  useStickersReady,
  useTitle,
  useToasts
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RpY2tlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBEcmFmdCB9IGZyb20gJ3JlZHV4LXRzLXV0aWxzJztcbmltcG9ydCB7IGNyZWF0ZUFjdGlvbiwgaGFuZGxlQWN0aW9uLCByZWR1Y2VSZWR1Y2VycyB9IGZyb20gJ3JlZHV4LXRzLXV0aWxzJztcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtcbiAgY2xhbXAsXG4gIGZpbmQsXG4gIGlzTnVtYmVyLFxuICBpc1N0cmluZyxcbiAgcHVsbCxcbiAgcmVtb3ZlLFxuICB0YWtlLFxuICB1bmlxLFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBTb3J0RW5kIH0gZnJvbSAncmVhY3Qtc29ydGFibGUtaG9jJztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBhcnJheU1vdmUgZnJvbSAnYXJyYXktbW92ZSc7XG5pbXBvcnQgdHlwZSB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7XG4gIFBhY2tNZXRhRGF0YSxcbiAgU3RpY2tlckltYWdlRGF0YSxcbiAgU3RpY2tlckRhdGEsXG59IGZyb20gJy4uLy4uL3V0aWwvcHJlbG9hZCc7XG5pbXBvcnQgdHlwZSB7IEVtb2ppUGlja0RhdGFUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHMvY29tcG9uZW50cy9lbW9qaS9FbW9qaVBpY2tlcic7XG5pbXBvcnQgeyBjb252ZXJ0U2hvcnROYW1lIH0gZnJvbSAnLi4vLi4vLi4vdHMvY29tcG9uZW50cy9lbW9qaS9saWInO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi8uLi8uLi90cy91dGlsL2lzTm90TmlsJztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTdGlja2VycyA9IGNyZWF0ZUFjdGlvbjxBcnJheTxzdHJpbmc+PihcbiAgJ3N0aWNrZXJzL2luaXRpYWxpemVTdGlja2Vycydcbik7XG5leHBvcnQgY29uc3QgYWRkSW1hZ2VEYXRhID0gY3JlYXRlQWN0aW9uPFN0aWNrZXJJbWFnZURhdGE+KFxuICAnc3RpY2tlcnMvYWRkU3RpY2tlcidcbik7XG5leHBvcnQgY29uc3QgcmVtb3ZlU3RpY2tlciA9IGNyZWF0ZUFjdGlvbjxzdHJpbmc+KCdzdGlja2Vycy9yZW1vdmVTdGlja2VyJyk7XG5leHBvcnQgY29uc3QgbW92ZVN0aWNrZXIgPSBjcmVhdGVBY3Rpb248U29ydEVuZD4oJ3N0aWNrZXJzL21vdmVTdGlja2VyJyk7XG5leHBvcnQgY29uc3Qgc2V0Q292ZXIgPSBjcmVhdGVBY3Rpb248U3RpY2tlckltYWdlRGF0YT4oJ3N0aWNrZXJzL3NldENvdmVyJyk7XG5leHBvcnQgY29uc3QgcmVzZXRDb3ZlciA9IGNyZWF0ZUFjdGlvbjxTdGlja2VySW1hZ2VEYXRhPignc3RpY2tlcnMvcmVzZXRDb3ZlcicpO1xuZXhwb3J0IGNvbnN0IHNldEVtb2ppID1cbiAgY3JlYXRlQWN0aW9uPHsgaWQ6IHN0cmluZzsgZW1vamk6IEVtb2ppUGlja0RhdGFUeXBlIH0+KCdzdGlja2Vycy9zZXRFbW9qaScpO1xuZXhwb3J0IGNvbnN0IHNldFRpdGxlID0gY3JlYXRlQWN0aW9uPHN0cmluZz4oJ3N0aWNrZXJzL3NldFRpdGxlJyk7XG5leHBvcnQgY29uc3Qgc2V0QXV0aG9yID0gY3JlYXRlQWN0aW9uPHN0cmluZz4oJ3N0aWNrZXJzL3NldEF1dGhvcicpO1xuZXhwb3J0IGNvbnN0IHNldFBhY2tNZXRhID0gY3JlYXRlQWN0aW9uPFBhY2tNZXRhRGF0YT4oJ3N0aWNrZXJzL3NldFBhY2tNZXRhJyk7XG5cbmV4cG9ydCBjb25zdCBhZGRUb2FzdCA9IGNyZWF0ZUFjdGlvbjx7XG4gIGtleTogc3RyaW5nO1xuICBzdWJzPzogQXJyYXk8c3RyaW5nPjtcbn0+KCdzdGlja2Vycy9hZGRUb2FzdCcpO1xuZXhwb3J0IGNvbnN0IGRpc21pc3NUb2FzdCA9IGNyZWF0ZUFjdGlvbjx2b2lkPignc3RpY2tlcnMvZGlzbWlzc1RvYXN0Jyk7XG5cbmV4cG9ydCBjb25zdCByZXNldFN0YXR1cyA9IGNyZWF0ZUFjdGlvbjx2b2lkPignc3RpY2tlcnMvcmVzZXRTdGF0dXMnKTtcbmV4cG9ydCBjb25zdCByZXNldCA9IGNyZWF0ZUFjdGlvbjx2b2lkPignc3RpY2tlcnMvcmVzZXQnKTtcblxuZXhwb3J0IGNvbnN0IG1pblN0aWNrZXJzID0gMTtcbmV4cG9ydCBjb25zdCBtYXhTdGlja2VycyA9IDIwMDtcbmV4cG9ydCBjb25zdCBtYXhCeXRlU2l6ZSA9IDMwMCAqIDEwMjQ7XG5cbnR5cGUgU3RhdGVTdGlja2VyRGF0YSA9IHtcbiAgcmVhZG9ubHkgaW1hZ2VEYXRhPzogU3RpY2tlckltYWdlRGF0YTtcbiAgcmVhZG9ubHkgZW1vamk/OiBFbW9qaVBpY2tEYXRhVHlwZTtcbn07XG5cbnR5cGUgU3RhdGVUb2FzdERhdGEgPSB7XG4gIGtleTogc3RyaW5nO1xuICBzdWJzPzogQXJyYXk8c3RyaW5nPjtcbn07XG5cbmV4cG9ydCB0eXBlIFN0YXRlID0ge1xuICByZWFkb25seSBvcmRlcjogQXJyYXk8c3RyaW5nPjtcbiAgcmVhZG9ubHkgY292ZXI/OiBTdGlja2VySW1hZ2VEYXRhO1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuICByZWFkb25seSBhdXRob3I6IHN0cmluZztcbiAgcmVhZG9ubHkgcGFja0lkOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBhY2tLZXk6IHN0cmluZztcbiAgcmVhZG9ubHkgdG9hc3RzOiBBcnJheTxTdGF0ZVRvYXN0RGF0YT47XG4gIHJlYWRvbmx5IGRhdGE6IHtcbiAgICByZWFkb25seSBbc3JjOiBzdHJpbmddOiBTdGF0ZVN0aWNrZXJEYXRhO1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgQWN0aW9ucyA9IHtcbiAgYWRkSW1hZ2VEYXRhOiB0eXBlb2YgYWRkSW1hZ2VEYXRhO1xuICBpbml0aWFsaXplU3RpY2tlcnM6IHR5cGVvZiBpbml0aWFsaXplU3RpY2tlcnM7XG4gIHJlbW92ZVN0aWNrZXI6IHR5cGVvZiByZW1vdmVTdGlja2VyO1xuICBtb3ZlU3RpY2tlcjogdHlwZW9mIG1vdmVTdGlja2VyO1xuICBzZXRDb3ZlcjogdHlwZW9mIHNldENvdmVyO1xuICBzZXRFbW9qaTogdHlwZW9mIHNldEVtb2ppO1xuICBzZXRUaXRsZTogdHlwZW9mIHNldFRpdGxlO1xuICBzZXRBdXRob3I6IHR5cGVvZiBzZXRBdXRob3I7XG4gIHNldFBhY2tNZXRhOiB0eXBlb2Ygc2V0UGFja01ldGE7XG4gIGFkZFRvYXN0OiB0eXBlb2YgYWRkVG9hc3Q7XG4gIGRpc21pc3NUb2FzdDogdHlwZW9mIGRpc21pc3NUb2FzdDtcbiAgcmVzZXQ6IHR5cGVvZiByZXNldDtcbiAgcmVzZXRTdGF0dXM6IHR5cGVvZiByZXNldFN0YXR1cztcbn07XG5cbmNvbnN0IGRlZmF1bHRTdGF0ZTogU3RhdGUgPSB7XG4gIG9yZGVyOiBbXSxcbiAgZGF0YToge30sXG4gIHRpdGxlOiAnJyxcbiAgYXV0aG9yOiAnJyxcbiAgcGFja0lkOiAnJyxcbiAgcGFja0tleTogJycsXG4gIHRvYXN0czogW10sXG59O1xuXG5jb25zdCBhZGp1c3RDb3ZlciA9IChzdGF0ZTogRHJhZnQ8U3RhdGU+KSA9PiB7XG4gIGNvbnN0IGZpcnN0ID0gc3RhdGUub3JkZXJbMF07XG5cbiAgaWYgKGZpcnN0KSB7XG4gICAgc3RhdGUuY292ZXIgPSBzdGF0ZS5kYXRhW2ZpcnN0XS5pbWFnZURhdGE7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHN0YXRlLmNvdmVyO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9IHJlZHVjZVJlZHVjZXJzPFN0YXRlPihcbiAgW1xuICAgIGhhbmRsZUFjdGlvbihpbml0aWFsaXplU3RpY2tlcnMsIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+IHtcbiAgICAgIGNvbnN0IHRydW5jYXRlZCA9IHRha2UoXG4gICAgICAgIHVuaXEoWy4uLnN0YXRlLm9yZGVyLCAuLi5wYXlsb2FkXSksXG4gICAgICAgIG1heFN0aWNrZXJzIC0gc3RhdGUub3JkZXIubGVuZ3RoXG4gICAgICApO1xuICAgICAgdHJ1bmNhdGVkLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgIGlmICghc3RhdGUuZGF0YVtwYXRoXSkge1xuICAgICAgICAgIHN0YXRlLmRhdGFbcGF0aF0gPSB7fTtcbiAgICAgICAgICBzdGF0ZS5vcmRlci5wdXNoKHBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KSxcblxuICAgIGhhbmRsZUFjdGlvbihhZGRJbWFnZURhdGEsIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+IHtcbiAgICAgIGlmIChpc051bWJlcihwYXlsb2FkLm1ldGEucGFnZXMpKSB7XG4gICAgICAgIHN0YXRlLnRvYXN0cy5wdXNoKHsga2V5OiAnU3RpY2tlckNyZWF0b3ItLVRvYXN0cy0tYW5pbWF0ZWQnIH0pO1xuICAgICAgICBwdWxsKHN0YXRlLm9yZGVyLCBwYXlsb2FkLnBhdGgpO1xuICAgICAgICBkZWxldGUgc3RhdGUuZGF0YVtwYXlsb2FkLnBhdGhdO1xuICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLmJ1ZmZlci5ieXRlTGVuZ3RoID4gbWF4Qnl0ZVNpemUpIHtcbiAgICAgICAgc3RhdGUudG9hc3RzLnB1c2goeyBrZXk6ICdTdGlja2VyQ3JlYXRvci0tVG9hc3RzLS10b29MYXJnZScgfSk7XG4gICAgICAgIHB1bGwoc3RhdGUub3JkZXIsIHBheWxvYWQucGF0aCk7XG4gICAgICAgIGRlbGV0ZSBzdGF0ZS5kYXRhW3BheWxvYWQucGF0aF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkYXRhID0gc3RhdGUuZGF0YVtwYXlsb2FkLnBhdGhdO1xuXG4gICAgICAgIC8vIElmIHdlIGFyZSBhZGRpbmcgaW1hZ2UgZGF0YSwgcHJvY2VlZCB0byB1cGRhdGUgdGhlIHN0YXRlIGFuZCBhZGQvdXBkYXRlIGEgdG9hc3RcbiAgICAgICAgaWYgKGRhdGEgJiYgIWRhdGEuaW1hZ2VEYXRhKSB7XG4gICAgICAgICAgZGF0YS5pbWFnZURhdGEgPSBwYXlsb2FkO1xuXG4gICAgICAgICAgY29uc3Qga2V5ID0gJ1N0aWNrZXJDcmVhdG9yLS1Ub2FzdHMtLWltYWdlc0FkZGVkJztcblxuICAgICAgICAgIGNvbnN0IHRvYXN0ID0gKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFRvYXN0ID0gZmluZChzdGF0ZS50b2FzdHMsIHsga2V5IH0pO1xuXG4gICAgICAgICAgICBpZiAob2xkVG9hc3QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9sZFRvYXN0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXdUb2FzdCA9IHsga2V5LCBzdWJzOiBbJzAnXSB9O1xuICAgICAgICAgICAgc3RhdGUudG9hc3RzLnB1c2gobmV3VG9hc3QpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3VG9hc3Q7XG4gICAgICAgICAgfSkoKTtcblxuICAgICAgICAgIGNvbnN0IHByZXZpb3VzU3ViID0gdG9hc3Q/LnN1YnM/LlswXTtcbiAgICAgICAgICBpZiAodG9hc3QgJiYgaXNTdHJpbmcocHJldmlvdXNTdWIpKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0NvdW50ID0gcGFyc2VJbnQocHJldmlvdXNTdWIsIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NvdW50ID0gTnVtYmVyLmlzRmluaXRlKHByZXZpb3VzQ291bnQpXG4gICAgICAgICAgICAgID8gcHJldmlvdXNDb3VudCArIDFcbiAgICAgICAgICAgICAgOiAxO1xuXG4gICAgICAgICAgICB0b2FzdC5zdWJzID0gdG9hc3Quc3VicyB8fCBbXTtcbiAgICAgICAgICAgIHRvYXN0LnN1YnNbMF0gPSBuZXdDb3VudC50b1N0cmluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhZGp1c3RDb3ZlcihzdGF0ZSk7XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24ocmVtb3ZlU3RpY2tlciwgKHN0YXRlLCB7IHBheWxvYWQgfSkgPT4ge1xuICAgICAgcHVsbChzdGF0ZS5vcmRlciwgcGF5bG9hZCk7XG4gICAgICBkZWxldGUgc3RhdGUuZGF0YVtwYXlsb2FkXTtcbiAgICAgIGFkanVzdENvdmVyKHN0YXRlKTtcbiAgICB9KSxcblxuICAgIGhhbmRsZUFjdGlvbihtb3ZlU3RpY2tlciwgKHN0YXRlLCB7IHBheWxvYWQgfSkgPT4ge1xuICAgICAgYXJyYXlNb3ZlLm11dGF0ZShzdGF0ZS5vcmRlciwgcGF5bG9hZC5vbGRJbmRleCwgcGF5bG9hZC5uZXdJbmRleCk7XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24oc2V0Q292ZXIsIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+IHtcbiAgICAgIHN0YXRlLmNvdmVyID0gcGF5bG9hZDtcbiAgICB9KSxcblxuICAgIGhhbmRsZUFjdGlvbihyZXNldENvdmVyLCBzdGF0ZSA9PiB7XG4gICAgICBhZGp1c3RDb3ZlcihzdGF0ZSk7XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24oc2V0RW1vamksIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzdGF0ZS5kYXRhW3BheWxvYWQuaWRdO1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YS5lbW9qaSA9IHBheWxvYWQuZW1vamk7XG4gICAgICB9XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24oc2V0VGl0bGUsIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+IHtcbiAgICAgIHN0YXRlLnRpdGxlID0gcGF5bG9hZDtcbiAgICB9KSxcblxuICAgIGhhbmRsZUFjdGlvbihzZXRBdXRob3IsIChzdGF0ZSwgeyBwYXlsb2FkIH0pID0+IHtcbiAgICAgIHN0YXRlLmF1dGhvciA9IHBheWxvYWQ7XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24oc2V0UGFja01ldGEsIChzdGF0ZSwgeyBwYXlsb2FkOiB7IHBhY2tJZCwga2V5IH0gfSkgPT4ge1xuICAgICAgc3RhdGUucGFja0lkID0gcGFja0lkO1xuICAgICAgc3RhdGUucGFja0tleSA9IGtleTtcbiAgICB9KSxcblxuICAgIGhhbmRsZUFjdGlvbihhZGRUb2FzdCwgKHN0YXRlLCB7IHBheWxvYWQ6IHRvYXN0IH0pID0+IHtcbiAgICAgIHJlbW92ZShzdGF0ZS50b2FzdHMsIHsga2V5OiB0b2FzdC5rZXkgfSk7XG4gICAgICBzdGF0ZS50b2FzdHMucHVzaCh0b2FzdCk7XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24oZGlzbWlzc1RvYXN0LCBzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS50b2FzdHMucG9wKCk7XG4gICAgfSksXG5cbiAgICBoYW5kbGVBY3Rpb24ocmVzZXRTdGF0dXMsIHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnRvYXN0cyA9IFtdO1xuICAgIH0pLFxuXG4gICAgaGFuZGxlQWN0aW9uKHJlc2V0LCAoKSA9PiBkZWZhdWx0U3RhdGUpLFxuICBdLFxuICBkZWZhdWx0U3RhdGVcbik7XG5cbmV4cG9ydCBjb25zdCB1c2VUaXRsZSA9ICgpOiBzdHJpbmcgPT5cbiAgdXNlU2VsZWN0b3IoKHsgc3RpY2tlcnMgfTogQXBwU3RhdGUpID0+IHN0aWNrZXJzLnRpdGxlKTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGhvciA9ICgpOiBzdHJpbmcgPT5cbiAgdXNlU2VsZWN0b3IoKHsgc3RpY2tlcnMgfTogQXBwU3RhdGUpID0+IHN0aWNrZXJzLmF1dGhvcik7XG5cbmV4cG9ydCBjb25zdCB1c2VDb3ZlciA9ICgpOiBTdGlja2VySW1hZ2VEYXRhIHwgdW5kZWZpbmVkID0+XG4gIHVzZVNlbGVjdG9yKCh7IHN0aWNrZXJzIH06IEFwcFN0YXRlKSA9PiBzdGlja2Vycy5jb3Zlcik7XG5cbmV4cG9ydCBjb25zdCB1c2VTdGlja2VyT3JkZXIgPSAoKTogQXJyYXk8c3RyaW5nPiA9PlxuICB1c2VTZWxlY3RvcigoeyBzdGlja2VycyB9OiBBcHBTdGF0ZSkgPT4gc3RpY2tlcnMub3JkZXIpO1xuXG5leHBvcnQgY29uc3QgdXNlU3RpY2tlckRhdGEgPSAoc3JjOiBzdHJpbmcpOiBTdGF0ZVN0aWNrZXJEYXRhID0+XG4gIHVzZVNlbGVjdG9yKCh7IHN0aWNrZXJzIH06IEFwcFN0YXRlKSA9PiBzdGlja2Vycy5kYXRhW3NyY10pO1xuXG5leHBvcnQgY29uc3QgdXNlU3RpY2tlcnNSZWFkeSA9ICgpOiBib29sZWFuID0+XG4gIHVzZVNlbGVjdG9yKFxuICAgICh7IHN0aWNrZXJzIH06IEFwcFN0YXRlKSA9PlxuICAgICAgc3RpY2tlcnMub3JkZXIubGVuZ3RoID49IG1pblN0aWNrZXJzICYmXG4gICAgICBzdGlja2Vycy5vcmRlci5sZW5ndGggPD0gbWF4U3RpY2tlcnMgJiZcbiAgICAgIE9iamVjdC52YWx1ZXMoc3RpY2tlcnMuZGF0YSkuZXZlcnkoKHsgaW1hZ2VEYXRhIH0pID0+IEJvb2xlYW4oaW1hZ2VEYXRhKSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHVzZUVtb2ppc1JlYWR5ID0gKCk6IGJvb2xlYW4gPT5cbiAgdXNlU2VsZWN0b3IoKHsgc3RpY2tlcnMgfTogQXBwU3RhdGUpID0+XG4gICAgT2JqZWN0LnZhbHVlcyhzdGlja2Vycy5kYXRhKS5ldmVyeSgoeyBlbW9qaSB9KSA9PiAhIWVtb2ppKVxuICApO1xuXG5leHBvcnQgY29uc3QgdXNlQWxsRGF0YVZhbGlkID0gKCk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBzdGlja2Vyc1JlYWR5ID0gdXNlU3RpY2tlcnNSZWFkeSgpO1xuICBjb25zdCBlbW9qaXNSZWFkeSA9IHVzZUVtb2ppc1JlYWR5KCk7XG4gIGNvbnN0IGNvdmVyID0gdXNlQ292ZXIoKTtcbiAgY29uc3QgdGl0bGUgPSB1c2VUaXRsZSgpO1xuICBjb25zdCBhdXRob3IgPSB1c2VBdXRob3IoKTtcblxuICByZXR1cm4gISEoc3RpY2tlcnNSZWFkeSAmJiBlbW9qaXNSZWFkeSAmJiBjb3ZlciAmJiB0aXRsZSAmJiBhdXRob3IpO1xufTtcblxuY29uc3Qgc2VsZWN0VXJsID0gY3JlYXRlU2VsZWN0b3IoXG4gICh7IHN0aWNrZXJzIH06IEFwcFN0YXRlKSA9PiBzdGlja2Vycy5wYWNrSWQsXG4gICh7IHN0aWNrZXJzIH06IEFwcFN0YXRlKSA9PiBzdGlja2Vycy5wYWNrS2V5LFxuICAoaWQsIGtleSkgPT4gYGh0dHBzOi8vc2lnbmFsLmFydC9hZGRzdGlja2Vycy8jcGFja19pZD0ke2lkfSZwYWNrX2tleT0ke2tleX1gXG4pO1xuXG5leHBvcnQgY29uc3QgdXNlUGFja1VybCA9ICgpOiBzdHJpbmcgPT4gdXNlU2VsZWN0b3Ioc2VsZWN0VXJsKTtcblxuZXhwb3J0IGNvbnN0IHVzZVRvYXN0cyA9ICgpOiBBcnJheTxTdGF0ZVRvYXN0RGF0YT4gPT5cbiAgdXNlU2VsZWN0b3IoKHsgc3RpY2tlcnMgfTogQXBwU3RhdGUpID0+IHN0aWNrZXJzLnRvYXN0cyk7XG5cbmV4cG9ydCBjb25zdCB1c2VBZGRNb3JlQ291bnQgPSAoKTogbnVtYmVyID0+XG4gIHVzZVNlbGVjdG9yKCh7IHN0aWNrZXJzIH06IEFwcFN0YXRlKSA9PlxuICAgIGNsYW1wKG1pblN0aWNrZXJzIC0gc3RpY2tlcnMub3JkZXIubGVuZ3RoLCAwLCBtaW5TdGlja2VycylcbiAgKTtcblxuY29uc3Qgc2VsZWN0T3JkZXJlZERhdGEgPSBjcmVhdGVTZWxlY3RvcihcbiAgKHsgc3RpY2tlcnMgfTogQXBwU3RhdGUpID0+IHN0aWNrZXJzLm9yZGVyLFxuICAoeyBzdGlja2VycyB9OiBBcHBTdGF0ZSkgPT4gc3RpY2tlcnMuZGF0YSxcbiAgKG9yZGVyLCBkYXRhKSA9PlxuICAgIG9yZGVyLm1hcChpZCA9PiAoe1xuICAgICAgLi4uZGF0YVtpZF0sXG4gICAgICBlbW9qaTogY29udmVydFNob3J0TmFtZShcbiAgICAgICAgKGRhdGFbaWRdLmVtb2ppIGFzIEVtb2ppUGlja0RhdGFUeXBlKS5zaG9ydE5hbWUsXG4gICAgICAgIChkYXRhW2lkXS5lbW9qaSBhcyBFbW9qaVBpY2tEYXRhVHlwZSkuc2tpblRvbmVcbiAgICAgICksXG4gICAgfSkpXG4pO1xuXG5leHBvcnQgY29uc3QgdXNlU2VsZWN0T3JkZXJlZERhdGEgPSAoKTogQXJyYXk8U3RpY2tlckRhdGE+ID0+XG4gIHVzZVNlbGVjdG9yKHNlbGVjdE9yZGVyZWREYXRhKTtcblxuY29uc3Qgc2VsZWN0T3JkZXJlZEltYWdlUGF0aHMgPSBjcmVhdGVTZWxlY3RvcihcbiAgc2VsZWN0T3JkZXJlZERhdGEsXG4gIChkYXRhOiBBcnJheTxTdGlja2VyRGF0YT4pID0+XG4gICAgZGF0YS5tYXAoKHsgaW1hZ2VEYXRhIH0pID0+IGltYWdlRGF0YT8uc3JjKS5maWx0ZXIoaXNOb3ROaWwpXG4pO1xuXG5leHBvcnQgY29uc3QgdXNlT3JkZXJlZEltYWdlUGF0aHMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PlxuICB1c2VTZWxlY3RvcihzZWxlY3RPcmRlcmVkSW1hZ2VQYXRocyk7XG5cbmV4cG9ydCBjb25zdCB1c2VTdGlja2VyQWN0aW9ucyA9ICgpOiBBY3Rpb25zID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIHJldHVybiB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBiaW5kQWN0aW9uQ3JlYXRvcnMoXG4gICAgICAgIHtcbiAgICAgICAgICBhZGRJbWFnZURhdGEsXG4gICAgICAgICAgaW5pdGlhbGl6ZVN0aWNrZXJzLFxuICAgICAgICAgIHJlbW92ZVN0aWNrZXIsXG4gICAgICAgICAgbW92ZVN0aWNrZXIsXG4gICAgICAgICAgc2V0Q292ZXIsXG4gICAgICAgICAgc2V0RW1vamksXG4gICAgICAgICAgc2V0VGl0bGUsXG4gICAgICAgICAgc2V0QXV0aG9yLFxuICAgICAgICAgIHNldFBhY2tNZXRhLFxuICAgICAgICAgIGFkZFRvYXN0LFxuICAgICAgICAgIGRpc21pc3NUb2FzdCxcbiAgICAgICAgICByZXNldCxcbiAgICAgICAgICByZXNldFN0YXR1cyxcbiAgICAgICAgfSxcbiAgICAgICAgZGlzcGF0Y2hcbiAgICAgICksXG4gICAgW2Rpc3BhdGNoXVxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLG1CQUF3QjtBQUV4Qiw0QkFBMkQ7QUFDM0QseUJBQXlDO0FBQ3pDLHNCQUErQjtBQUMvQixvQkFTTztBQUVQLG1CQUFtQztBQUNuQyx3QkFBc0I7QUFRdEIsaUJBQWlDO0FBQ2pDLHNCQUF5QjtBQUVsQixNQUFNLHFCQUFxQix3Q0FDaEMsNkJBQ0Y7QUFDTyxNQUFNLGVBQWUsd0NBQzFCLHFCQUNGO0FBQ08sTUFBTSxnQkFBZ0Isd0NBQXFCLHdCQUF3QjtBQUNuRSxNQUFNLGNBQWMsd0NBQXNCLHNCQUFzQjtBQUNoRSxNQUFNLFdBQVcsd0NBQStCLG1CQUFtQjtBQUNuRSxNQUFNLGFBQWEsd0NBQStCLHFCQUFxQjtBQUN2RSxNQUFNLFdBQ1gsd0NBQXVELG1CQUFtQjtBQUNyRSxNQUFNLFdBQVcsd0NBQXFCLG1CQUFtQjtBQUN6RCxNQUFNLFlBQVksd0NBQXFCLG9CQUFvQjtBQUMzRCxNQUFNLGNBQWMsd0NBQTJCLHNCQUFzQjtBQUVyRSxNQUFNLFdBQVcsd0NBR3JCLG1CQUFtQjtB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
