var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var StickerGrid_exports = {};
__export(StickerGrid_exports, {
  StickerGrid: () => StickerGrid
});
module.exports = __toCommonJS(StickerGrid_exports);
var React = __toESM(require("react"));
var import_p_queue = __toESM(require("p-queue"));
var import_react_sortable_hoc = require("react-sortable-hoc");
var styles = __toESM(require("./StickerGrid.scss"));
var import_StickerFrame = require("./StickerFrame");
var import_store = require("../store");
var import_DropZone = require("../elements/DropZone");
var import_preload = require("../util/preload");
var import_i18n = require("../util/i18n");
const queue = new import_p_queue.default({ concurrency: 3, timeout: 1e3 * 60 * 2 });
const SmartStickerFrame = (0, import_react_sortable_hoc.SortableElement)(({ id, showGuide, mode }) => {
  const data = import_store.stickersDuck.useStickerData(id);
  const actions = import_store.stickersDuck.useStickerActions();
  const image = data.imageData ? data.imageData.src : void 0;
  return /* @__PURE__ */ React.createElement(import_StickerFrame.StickerFrame, {
    id,
    showGuide,
    mode,
    image,
    onRemove: actions.removeSticker,
    onPickEmoji: actions.setEmoji,
    emojiData: data.emoji
  });
});
const InnerGrid = (0, import_react_sortable_hoc.SortableContainer)(({ ids, mode, showGuide }) => {
  const i18n = (0, import_i18n.useI18n)();
  const containerClassName = ids.length > 0 ? styles.grid : styles.drop;
  const frameMode = mode === "add" ? "removable" : "pick-emoji";
  const actions = import_store.stickersDuck.useStickerActions();
  const handleDrop = React.useCallback(async (paths) => {
    actions.initializeStickers(paths);
    paths.forEach((path) => {
      queue.add(async () => {
        try {
          const stickerImage = await (0, import_preload.processStickerImage)(path);
          actions.addImageData(stickerImage);
        } catch (e) {
          window.SignalContext.log.error("Error processing image:", e?.stack ? e.stack : String(e));
          actions.removeSticker(path);
          actions.addToast({
            key: (e || {}).errorMessageI18nKey || "StickerCreator--Toasts--errorProcessing"
          });
        }
      });
    });
  }, [actions]);
  return /* @__PURE__ */ React.createElement("div", {
    className: containerClassName
  }, ids.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, ids.map((p, i) => /* @__PURE__ */ React.createElement(SmartStickerFrame, {
    key: p,
    index: i,
    id: p,
    showGuide,
    mode: frameMode
  })), mode === "add" && ids.length < import_store.stickersDuck.maxStickers ? /* @__PURE__ */ React.createElement(import_StickerFrame.StickerFrame, {
    showGuide,
    mode: "add",
    onDrop: handleDrop
  }) : null) : /* @__PURE__ */ React.createElement(import_DropZone.DropZone, {
    label: i18n("StickerCreator--DropStage--dragDrop"),
    onDrop: handleDrop
  }));
});
const StickerGrid = (0, import_react_sortable_hoc.SortableContainer)((props) => {
  const ids = import_store.stickersDuck.useStickerOrder();
  const actions = import_store.stickersDuck.useStickerActions();
  const handleSortEnd = React.useCallback((sortEnd) => {
    actions.moveSticker(sortEnd);
  }, [actions]);
  return /* @__PURE__ */ React.createElement(InnerGrid, {
    ...props,
    ids,
    axis: "xy",
    onSortEnd: handleSortEnd,
    useDragHandle: true
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerGrid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlckdyaWQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCB0eXBlIHsgU29ydEVuZEhhbmRsZXIgfSBmcm9tICdyZWFjdC1zb3J0YWJsZS1ob2MnO1xuaW1wb3J0IHsgU29ydGFibGVDb250YWluZXIsIFNvcnRhYmxlRWxlbWVudCB9IGZyb20gJ3JlYWN0LXNvcnRhYmxlLWhvYyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9TdGlja2VyR3JpZC5zY3NzJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgU3RpY2tlckZyYW1lUHJvcHMgfSBmcm9tICcuL1N0aWNrZXJGcmFtZSc7XG5pbXBvcnQgeyBTdGlja2VyRnJhbWUgfSBmcm9tICcuL1N0aWNrZXJGcmFtZSc7XG5pbXBvcnQgeyBzdGlja2Vyc0R1Y2sgfSBmcm9tICcuLi9zdG9yZSc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIERyb3Bab25lUHJvcHMgfSBmcm9tICcuLi9lbGVtZW50cy9Ecm9wWm9uZSc7XG5pbXBvcnQgeyBEcm9wWm9uZSB9IGZyb20gJy4uL2VsZW1lbnRzL0Ryb3Bab25lJztcbmltcG9ydCB7IHByb2Nlc3NTdGlja2VySW1hZ2UgfSBmcm9tICcuLi91dGlsL3ByZWxvYWQnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJy4uL3V0aWwvaTE4bic7XG5cbmNvbnN0IHF1ZXVlID0gbmV3IFBRdWV1ZSh7IGNvbmN1cnJlbmN5OiAzLCB0aW1lb3V0OiAxMDAwICogNjAgKiAyIH0pO1xuXG50eXBlIFNtYXJ0U3RpY2tlckZyYW1lUHJvcHMgPSBPbWl0PFN0aWNrZXJGcmFtZVByb3BzLCAnaWQnPiAmIHsgaWQ6IHN0cmluZyB9O1xuXG5jb25zdCBTbWFydFN0aWNrZXJGcmFtZSA9IFNvcnRhYmxlRWxlbWVudChcbiAgKHsgaWQsIHNob3dHdWlkZSwgbW9kZSB9OiBTbWFydFN0aWNrZXJGcmFtZVByb3BzKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHN0aWNrZXJzRHVjay51c2VTdGlja2VyRGF0YShpZCk7XG4gICAgY29uc3QgYWN0aW9ucyA9IHN0aWNrZXJzRHVjay51c2VTdGlja2VyQWN0aW9ucygpO1xuICAgIGNvbnN0IGltYWdlID0gZGF0YS5pbWFnZURhdGEgPyBkYXRhLmltYWdlRGF0YS5zcmMgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0aWNrZXJGcmFtZVxuICAgICAgICBpZD17aWR9XG4gICAgICAgIHNob3dHdWlkZT17c2hvd0d1aWRlfVxuICAgICAgICBtb2RlPXttb2RlfVxuICAgICAgICBpbWFnZT17aW1hZ2V9XG4gICAgICAgIG9uUmVtb3ZlPXthY3Rpb25zLnJlbW92ZVN0aWNrZXJ9XG4gICAgICAgIG9uUGlja0Vtb2ppPXthY3Rpb25zLnNldEVtb2ppfVxuICAgICAgICBlbW9qaURhdGE9e2RhdGEuZW1vaml9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbik7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gUGljazxTdGlja2VyRnJhbWVQcm9wcywgJ3Nob3dHdWlkZScgfCAnbW9kZSc+O1xuXG5leHBvcnQgdHlwZSBJbm5lckdyaWRQcm9wcyA9IFByb3BzICYge1xuICBpZHM6IEFycmF5PHN0cmluZz47XG59O1xuXG5jb25zdCBJbm5lckdyaWQgPSBTb3J0YWJsZUNvbnRhaW5lcihcbiAgKHsgaWRzLCBtb2RlLCBzaG93R3VpZGUgfTogSW5uZXJHcmlkUHJvcHMpID0+IHtcbiAgICBjb25zdCBpMThuID0gdXNlSTE4bigpO1xuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzTmFtZSA9IGlkcy5sZW5ndGggPiAwID8gc3R5bGVzLmdyaWQgOiBzdHlsZXMuZHJvcDtcbiAgICBjb25zdCBmcmFtZU1vZGUgPSBtb2RlID09PSAnYWRkJyA/ICdyZW1vdmFibGUnIDogJ3BpY2stZW1vamknO1xuXG4gICAgY29uc3QgYWN0aW9ucyA9IHN0aWNrZXJzRHVjay51c2VTdGlja2VyQWN0aW9ucygpO1xuXG4gICAgY29uc3QgaGFuZGxlRHJvcCA9IFJlYWN0LnVzZUNhbGxiYWNrPERyb3Bab25lUHJvcHNbJ29uRHJvcCddPihcbiAgICAgIGFzeW5jIHBhdGhzID0+IHtcbiAgICAgICAgYWN0aW9ucy5pbml0aWFsaXplU3RpY2tlcnMocGF0aHMpO1xuICAgICAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgIHF1ZXVlLmFkZChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBzdGlja2VySW1hZ2UgPSBhd2FpdCBwcm9jZXNzU3RpY2tlckltYWdlKHBhdGgpO1xuICAgICAgICAgICAgICBhY3Rpb25zLmFkZEltYWdlRGF0YShzdGlja2VySW1hZ2UpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ0Vycm9yIHByb2Nlc3NpbmcgaW1hZ2U6JyxcbiAgICAgICAgICAgICAgICBlPy5zdGFjayA/IGUuc3RhY2sgOiBTdHJpbmcoZSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYWN0aW9ucy5yZW1vdmVTdGlja2VyKHBhdGgpO1xuICAgICAgICAgICAgICBhY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgICBrZXk6XG4gICAgICAgICAgICAgICAgICAoZSB8fCB7fSkuZXJyb3JNZXNzYWdlSTE4bktleSB8fFxuICAgICAgICAgICAgICAgICAgJ1N0aWNrZXJDcmVhdG9yLS1Ub2FzdHMtLWVycm9yUHJvY2Vzc2luZycsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBbYWN0aW9uc11cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc05hbWV9PlxuICAgICAgICB7aWRzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtpZHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxTbWFydFN0aWNrZXJGcmFtZVxuICAgICAgICAgICAgICAgIGtleT17cH1cbiAgICAgICAgICAgICAgICBpbmRleD17aX1cbiAgICAgICAgICAgICAgICBpZD17cH1cbiAgICAgICAgICAgICAgICBzaG93R3VpZGU9e3Nob3dHdWlkZX1cbiAgICAgICAgICAgICAgICBtb2RlPXtmcmFtZU1vZGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIHttb2RlID09PSAnYWRkJyAmJiBpZHMubGVuZ3RoIDwgc3RpY2tlcnNEdWNrLm1heFN0aWNrZXJzID8gKFxuICAgICAgICAgICAgICA8U3RpY2tlckZyYW1lXG4gICAgICAgICAgICAgICAgc2hvd0d1aWRlPXtzaG93R3VpZGV9XG4gICAgICAgICAgICAgICAgbW9kZT1cImFkZFwiXG4gICAgICAgICAgICAgICAgb25Ecm9wPXtoYW5kbGVEcm9wfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPERyb3Bab25lXG4gICAgICAgICAgICBsYWJlbD17aTE4bignU3RpY2tlckNyZWF0b3ItLURyb3BTdGFnZS0tZHJhZ0Ryb3AnKX1cbiAgICAgICAgICAgIG9uRHJvcD17aGFuZGxlRHJvcH1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IFN0aWNrZXJHcmlkID0gU29ydGFibGVDb250YWluZXIoKHByb3BzOiBQcm9wcykgPT4ge1xuICBjb25zdCBpZHMgPSBzdGlja2Vyc0R1Y2sudXNlU3RpY2tlck9yZGVyKCk7XG4gIGNvbnN0IGFjdGlvbnMgPSBzdGlja2Vyc0R1Y2sudXNlU3RpY2tlckFjdGlvbnMoKTtcbiAgY29uc3QgaGFuZGxlU29ydEVuZCA9IFJlYWN0LnVzZUNhbGxiYWNrPFNvcnRFbmRIYW5kbGVyPihcbiAgICBzb3J0RW5kID0+IHtcbiAgICAgIGFjdGlvbnMubW92ZVN0aWNrZXIoc29ydEVuZCk7XG4gICAgfSxcbiAgICBbYWN0aW9uc11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxJbm5lckdyaWRcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGlkcz17aWRzfVxuICAgICAgYXhpcz1cInh5XCJcbiAgICAgIG9uU29ydEVuZD17aGFuZGxlU29ydEVuZH1cbiAgICAgIHVzZURyYWdIYW5kbGVcbiAgICAvPlxuICApO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixxQkFBbUI7QUFFbkIsZ0NBQW1EO0FBQ25ELGFBQXdCO0FBRXhCLDBCQUE2QjtBQUM3QixtQkFBNkI7QUFFN0Isc0JBQXlCO0FBQ3pCLHFCQUFvQztBQUNwQyxrQkFBd0I7QUFFeEIsTUFBTSxRQUFRLElBQUksdUJBQU8sRUFBRSxhQUFhLEdBQUcsU0FBUyxNQUFPLEtBQUssRUFBRSxDQUFDO0FBSW5FLE1BQU0sb0JBQW9CLCtDQUN4QixDQUFDLEVBQUUsSUFBSSxXQUFXLFdBQW1DO0FBQ25ELFFBQU0sT0FBTywwQkFBYSxlQUFlLEVBQUU7QUFDM0MsUUFBTSxVQUFVLDBCQUFhLGtCQUFrQjtBQUMvQyxRQUFNLFFBQVEsS0FBSyxZQUFZLEtBQUssVUFBVSxNQUFNO0FBRXBELFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVLFFBQVE7QUFBQSxJQUNsQixhQUFhLFFBQVE7QUFBQSxJQUNyQixXQUFXLEtBQUs7QUFBQSxHQUNsQjtBQUVKLENBQ0Y7QUFRQSxNQUFNLFlBQVksaURBQ2hCLENBQUMsRUFBRSxLQUFLLE1BQU0sZ0JBQWdDO0FBQzVDLFFBQU0sT0FBTyx5QkFBUTtBQUNyQixRQUFNLHFCQUFxQixJQUFJLFNBQVMsSUFBSSxPQUFPLE9BQU8sT0FBTztBQUNqRSxRQUFNLFlBQVksU0FBUyxRQUFRLGNBQWM7QUFFakQsUUFBTSxVQUFVLDBCQUFhLGtCQUFrQjtBQUUvQyxRQUFNLGFBQWEsTUFBTSxZQUN2QixPQUFNLFVBQVM7QUFDYixZQUFRLG1CQUFtQixLQUFLO0FBQ2hDLFVBQU0sUUFBUSxVQUFRO0FBQ3BCLFlBQU0sSUFBSSxZQUFZO0FBQ3BCLFlBQUk7QUFDRixnQkFBTSxlQUFlLE1BQU0sd0NBQW9CLElBQUk7QUFDbkQsa0JBQVEsYUFBYSxZQUFZO0FBQUEsUUFDbkMsU0FBUyxHQUFQO0FBQ0EsaUJBQU8sY0FBYyxJQUFJLE1BQ3ZCLDJCQUNBLEdBQUcsUUFBUSxFQUFFLFFBQVEsT0FBTyxDQUFDLENBQy9CO0FBQ0Esa0JBQVEsY0FBYyxJQUFJO0FBQzFCLGtCQUFRLFNBQVM7QUFBQSxZQUNmLEtBQ0csTUFBSyxDQUFDLEdBQUcsdUJBQ1Y7QUFBQSxVQUNKLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxHQUNBLENBQUMsT0FBTyxDQUNWO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVztBQUFBLEtBQ2IsSUFBSSxTQUFTLElBQ1osMERBQ0csSUFBSSxJQUFJLENBQUMsR0FBRyxNQUNYLG9DQUFDO0FBQUEsSUFDQyxLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSjtBQUFBLElBQ0EsTUFBTTtBQUFBLEdBQ1IsQ0FDRCxHQUNBLFNBQVMsU0FBUyxJQUFJLFNBQVMsMEJBQWEsY0FDM0Msb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxNQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsR0FDVixJQUNFLElBQ04sSUFFQSxvQ0FBQztBQUFBLElBQ0MsT0FBTyxLQUFLLHFDQUFxQztBQUFBLElBQ2pELFFBQVE7QUFBQSxHQUNWLENBRUo7QUFFSixDQUNGO0FBRU8sTUFBTSxjQUFjLGlEQUFrQixDQUFDLFVBQWlCO0FBQzdELFFBQU0sTUFBTSwwQkFBYSxnQkFBZ0I7QUFDekMsUUFBTSxVQUFVLDBCQUFhLGtCQUFrQjtBQUMvQyxRQUFNLGdCQUFnQixNQUFNLFlBQzFCLGFBQVc7QUFDVCxZQUFRLFlBQVksT0FBTztBQUFBLEVBQzdCLEdBQ0EsQ0FBQyxPQUFPLENBQ1Y7QUFFQSxTQUNFLG9DQUFDO0FBQUEsT0FDSztBQUFBLElBQ0o7QUFBQSxJQUNBLE1BQUs7QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWE7QUFBQSxHQUNmO0FBRUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
