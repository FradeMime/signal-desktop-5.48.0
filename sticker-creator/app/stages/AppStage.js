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
var AppStage_exports = {};
__export(AppStage_exports, {
  AppStage: () => AppStage
});
module.exports = __toCommonJS(AppStage_exports);
var import_react = __toESM(require("react"));
var styles = __toESM(require("./AppStage.scss"));
var import_history = require("../../util/history");
var import_Button = require("../../elements/Button");
var import_i18n = require("../../util/i18n");
var import_Typography = require("../../elements/Typography");
var import_Toaster = require("../../components/Toaster");
var import_store = require("../../store");
const getClassName = /* @__PURE__ */ __name(({ noMessage, empty }) => {
  if (noMessage) {
    return styles.noMessage;
  }
  if (empty) {
    return styles.empty;
  }
  return styles.main;
}, "getClassName");
const AppStage = /* @__PURE__ */ __name((props) => {
  const {
    children,
    next,
    nextActive,
    nextText,
    onNext,
    onPrev,
    prev,
    prevText
  } = props;
  const i18n = (0, import_i18n.useI18n)();
  const handleNext = import_react.default.useCallback(() => {
    if (next) {
      import_history.history.push(next);
    }
  }, [next]);
  const handlePrev = import_react.default.useCallback(() => {
    if (prev) {
      import_history.history.push(prev);
    }
  }, [prev]);
  const addMoreCount = import_store.stickersDuck.useAddMoreCount();
  const toasts = import_store.stickersDuck.useToasts();
  const { dismissToast } = import_store.stickersDuck.useStickerActions();
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("main", {
    className: getClassName(props)
  }, children), /* @__PURE__ */ import_react.default.createElement("footer", {
    className: styles.footer
  }, prev || onPrev ? /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    className: styles.button,
    onClick: onPrev || handlePrev
  }, prevText || i18n("StickerCreator--AppStage--prev")) : null, addMoreCount > 0 ? /* @__PURE__ */ import_react.default.createElement(import_Typography.Text, {
    secondary: true
  }, i18n("StickerCreator--DropStage--addMore", [
    addMoreCount.toString()
  ])) : null, next || onNext ? /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    className: styles.button,
    onClick: onNext || handleNext,
    primary: true,
    disabled: !nextActive
  }, nextText || i18n("StickerCreator--AppStage--next")) : null), /* @__PURE__ */ import_react.default.createElement(import_Toaster.Toaster, {
    className: styles.toaster,
    loaf: toasts.map((slice, id) => ({
      id,
      text: i18n(slice.key, slice.subs)
    })),
    onDismiss: dismissToast
  }));
}, "AppStage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppStage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXBwU3RhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL0FwcFN0YWdlLnNjc3MnO1xuaW1wb3J0IHsgaGlzdG9yeSB9IGZyb20gJy4uLy4uL3V0aWwvaGlzdG9yeSc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi8uLi9lbGVtZW50cy9CdXR0b24nO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvaTE4bic7XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi4vLi4vZWxlbWVudHMvVHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Ub2FzdGVyJztcbmltcG9ydCB7IHN0aWNrZXJzRHVjayB9IGZyb20gJy4uLy4uL3N0b3JlJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIHJlYWRvbmx5IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIHJlYWRvbmx5IGVtcHR5PzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgcHJldj86IHN0cmluZztcbiAgcmVhZG9ubHkgcHJldlRleHQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IG5leHQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IG5leHRBY3RpdmU/OiBib29sZWFuO1xuICByZWFkb25seSBub01lc3NhZ2U/OiBib29sZWFuO1xuICByZWFkb25seSBvbk5leHQ/OiAoKSA9PiB1bmtub3duO1xuICByZWFkb25seSBvblByZXY/OiAoKSA9PiB1bmtub3duO1xuICByZWFkb25seSBuZXh0VGV4dD86IHN0cmluZztcbn07XG5cbmNvbnN0IGdldENsYXNzTmFtZSA9ICh7IG5vTWVzc2FnZSwgZW1wdHkgfTogUHJvcHMpID0+IHtcbiAgaWYgKG5vTWVzc2FnZSkge1xuICAgIHJldHVybiBzdHlsZXMubm9NZXNzYWdlO1xuICB9XG5cbiAgaWYgKGVtcHR5KSB7XG4gICAgcmV0dXJuIHN0eWxlcy5lbXB0eTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZXMubWFpbjtcbn07XG5cbmV4cG9ydCBjb25zdCBBcHBTdGFnZTogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHtcbiAgICBjaGlsZHJlbixcbiAgICBuZXh0LFxuICAgIG5leHRBY3RpdmUsXG4gICAgbmV4dFRleHQsXG4gICAgb25OZXh0LFxuICAgIG9uUHJldixcbiAgICBwcmV2LFxuICAgIHByZXZUZXh0LFxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IGkxOG4gPSB1c2VJMThuKCk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAobmV4dCkge1xuICAgICAgaGlzdG9yeS5wdXNoKG5leHQpO1xuICAgIH1cbiAgfSwgW25leHRdKTtcblxuICBjb25zdCBoYW5kbGVQcmV2ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChwcmV2KSB7XG4gICAgICBoaXN0b3J5LnB1c2gocHJldik7XG4gICAgfVxuICB9LCBbcHJldl0pO1xuXG4gIGNvbnN0IGFkZE1vcmVDb3VudCA9IHN0aWNrZXJzRHVjay51c2VBZGRNb3JlQ291bnQoKTtcbiAgY29uc3QgdG9hc3RzID0gc3RpY2tlcnNEdWNrLnVzZVRvYXN0cygpO1xuICBjb25zdCB7IGRpc21pc3NUb2FzdCB9ID0gc3RpY2tlcnNEdWNrLnVzZVN0aWNrZXJBY3Rpb25zKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPG1haW4gY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUocHJvcHMpfT57Y2hpbGRyZW59PC9tYWluPlxuICAgICAgPGZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJ9PlxuICAgICAgICB7cHJldiB8fCBvblByZXYgPyAoXG4gICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b259IG9uQ2xpY2s9e29uUHJldiB8fCBoYW5kbGVQcmV2fT5cbiAgICAgICAgICAgIHtwcmV2VGV4dCB8fCBpMThuKCdTdGlja2VyQ3JlYXRvci0tQXBwU3RhZ2UtLXByZXYnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHthZGRNb3JlQ291bnQgPiAwID8gKFxuICAgICAgICAgIDxUZXh0IHNlY29uZGFyeT5cbiAgICAgICAgICAgIHtpMThuKCdTdGlja2VyQ3JlYXRvci0tRHJvcFN0YWdlLS1hZGRNb3JlJywgW1xuICAgICAgICAgICAgICBhZGRNb3JlQ291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIF0pfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtuZXh0IHx8IG9uTmV4dCA/IChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBvbkNsaWNrPXtvbk5leHQgfHwgaGFuZGxlTmV4dH1cbiAgICAgICAgICAgIHByaW1hcnlcbiAgICAgICAgICAgIGRpc2FibGVkPXshbmV4dEFjdGl2ZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bmV4dFRleHQgfHwgaTE4bignU3RpY2tlckNyZWF0b3ItLUFwcFN0YWdlLS1uZXh0Jyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9mb290ZXI+XG4gICAgICA8VG9hc3RlclxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy50b2FzdGVyfVxuICAgICAgICBsb2FmPXt0b2FzdHMubWFwKChzbGljZSwgaWQpID0+ICh7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgdGV4dDogaTE4bihzbGljZS5rZXksIHNsaWNlLnN1YnMpLFxuICAgICAgICB9KSl9XG4gICAgICAgIG9uRGlzbWlzcz17ZGlzbWlzc1RvYXN0fVxuICAgICAgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLGFBQXdCO0FBQ3hCLHFCQUF3QjtBQUN4QixvQkFBdUI7QUFDdkIsa0JBQXdCO0FBQ3hCLHdCQUFxQjtBQUNyQixxQkFBd0I7QUFDeEIsbUJBQTZCO0FBZTdCLE1BQU0sZUFBZSx3QkFBQyxFQUFFLFdBQVcsWUFBbUI7QUFDcEQsTUFBSSxXQUFXO0FBQ2IsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxNQUFJLE9BQU87QUFDVCxXQUFPLE9BQU87QUFBQSxFQUNoQjtBQUVBLFNBQU8sT0FBTztBQUNoQixHQVZxQjtBQVlkLE1BQU0sV0FBdUMsa0NBQVM7QUFDM0QsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUNKLFFBQU0sT0FBTyx5QkFBUTtBQUVyQixRQUFNLGFBQWEscUJBQU0sWUFBWSxNQUFNO0FBQ3pDLFFBQUksTUFBTTtBQUNSLDZCQUFRLEtBQUssSUFBSTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsUUFBTSxhQUFhLHFCQUFNLFlBQVksTUFBTTtBQUN6QyxRQUFJLE1BQU07QUFDUiw2QkFBUSxLQUFLLElBQUk7QUFBQSxJQUNuQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQztBQUVULFFBQU0sZUFBZSwwQkFBYSxnQkFBZ0I7QUFDbEQsUUFBTSxTQUFTLDBCQUFhLFVBQVU7QUFDdEMsUUFBTSxFQUFFLGlCQUFpQiwwQkFBYSxrQkFBa0I7QUFFeEQsU0FDRSx3RkFDRSxtREFBQztBQUFBLElBQUssV0FBVyxhQUFhLEtBQUs7QUFBQSxLQUFJLFFBQVMsR0FDaEQsbURBQUM7QUFBQSxJQUFPLFdBQVcsT0FBTztBQUFBLEtBQ3ZCLFFBQVEsU0FDUCxtREFBQztBQUFBLElBQU8sV0FBVyxPQUFPO0FBQUEsSUFBUSxTQUFTLFVBQVU7QUFBQSxLQUNsRCxZQUFZLEtBQUssZ0NBQWdDLENBQ3BELElBQ0UsTUFDSCxlQUFlLElBQ2QsbURBQUM7QUFBQSxJQUFLLFdBQVM7QUFBQSxLQUNaLEtBQUssc0NBQXNDO0FBQUEsSUFDMUMsYUFBYSxTQUFTO0FBQUEsRUFDeEIsQ0FBQyxDQUNILElBQ0UsTUFDSCxRQUFRLFNBQ1AsbURBQUM7QUFBQSxJQUNDLFdBQVcsT0FBTztBQUFBLElBQ2xCLFNBQVMsVUFBVTtBQUFBLElBQ25CLFNBQU87QUFBQSxJQUNQLFVBQVUsQ0FBQztBQUFBLEtBRVYsWUFBWSxLQUFLLGdDQUFnQyxDQUNwRCxJQUNFLElBQ04sR0FDQSxtREFBQztBQUFBLElBQ0MsV0FBVyxPQUFPO0FBQUEsSUFDbEIsTUFBTSxPQUFPLElBQUksQ0FBQyxPQUFPLE9BQVE7QUFBQSxNQUMvQjtBQUFBLE1BQ0EsTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLElBQUk7QUFBQSxJQUNsQyxFQUFFO0FBQUEsSUFDRixXQUFXO0FBQUEsR0FDYixDQUNGO0FBRUosR0FsRW9EOyIsCiAgIm5hbWVzIjogW10KfQo=
