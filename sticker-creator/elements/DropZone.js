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
var DropZone_exports = {};
__export(DropZone_exports, {
  DropZone: () => DropZone
});
module.exports = __toCommonJS(DropZone_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./DropZone.scss"));
var import_i18n = require("../util/i18n");
var import_useStickerDropzone = require("../util/useStickerDropzone");
var import_isNotNil = require("../../ts/util/isNotNil");
const getClassName = /* @__PURE__ */ __name(({ inner }, isDragActive) => {
  if (inner) {
    return styles.base;
  }
  if (isDragActive) {
    return styles.active;
  }
  return styles.standalone;
}, "getClassName");
const DropZone = /* @__PURE__ */ __name((props) => {
  const { inner, label, onDrop, onDragActive } = props;
  const i18n = (0, import_i18n.useI18n)();
  const handleDrop = React.useCallback((files) => {
    onDrop(files.map(({ path }) => path).filter(import_isNotNil.isNotNil));
  }, [onDrop]);
  const { getRootProps, getInputProps, isDragActive } = (0, import_useStickerDropzone.useStickerDropzone)(handleDrop);
  React.useEffect(() => {
    if (onDragActive) {
      onDragActive(isDragActive);
    }
  }, [isDragActive, onDragActive]);
  return /* @__PURE__ */ React.createElement("div", {
    ...getRootProps({ className: getClassName(props, isDragActive) }),
    role: "button",
    "area-label": label
  }, /* @__PURE__ */ React.createElement("input", {
    ...getInputProps()
  }), /* @__PURE__ */ React.createElement("svg", {
    viewBox: "0 0 36 36",
    width: "36px",
    height: "36px"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M32 17.25H18.75V4h-1.5v13.25H4v1.5h13.25V32h1.5V18.75H32v-1.5z"
  })), !inner ? /* @__PURE__ */ React.createElement("p", {
    className: styles.text
  }, isDragActive ? i18n("StickerCreator--DropZone--activeText") : i18n("StickerCreator--DropZone--staticText")) : null);
}, "DropZone");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropZone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRHJvcFpvbmUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBGaWxlV2l0aFBhdGggfSBmcm9tICdyZWFjdC1kcm9wem9uZSc7XG5cbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL0Ryb3Bab25lLnNjc3MnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJy4uL3V0aWwvaTE4bic7XG5pbXBvcnQgeyB1c2VTdGlja2VyRHJvcHpvbmUgfSBmcm9tICcuLi91dGlsL3VzZVN0aWNrZXJEcm9wem9uZSc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uLy4uL3RzL3V0aWwvaXNOb3ROaWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgcmVhZG9ubHkgaW5uZXI/OiBib29sZWFuO1xuICByZWFkb25seSBsYWJlbDogc3RyaW5nO1xuICBvbkRyb3AoZmlsZXM6IEFycmF5PHN0cmluZz4pOiB1bmtub3duO1xuICBvbkRyYWdBY3RpdmU/KGFjdGl2ZTogYm9vbGVhbik6IHVua25vd247XG59O1xuXG5jb25zdCBnZXRDbGFzc05hbWUgPSAoeyBpbm5lciB9OiBQcm9wcywgaXNEcmFnQWN0aXZlOiBib29sZWFuKSA9PiB7XG4gIGlmIChpbm5lcikge1xuICAgIHJldHVybiBzdHlsZXMuYmFzZTtcbiAgfVxuXG4gIGlmIChpc0RyYWdBY3RpdmUpIHtcbiAgICByZXR1cm4gc3R5bGVzLmFjdGl2ZTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZXMuc3RhbmRhbG9uZTtcbn07XG5cbmV4cG9ydCBjb25zdCBEcm9wWm9uZTogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgaW5uZXIsIGxhYmVsLCBvbkRyb3AsIG9uRHJhZ0FjdGl2ZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGkxOG4gPSB1c2VJMThuKCk7XG5cbiAgY29uc3QgaGFuZGxlRHJvcCA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChmaWxlczogUmVhZG9ubHlBcnJheTxGaWxlV2l0aFBhdGg+KSA9PiB7XG4gICAgICBvbkRyb3AoZmlsZXMubWFwKCh7IHBhdGggfSkgPT4gcGF0aCkuZmlsdGVyKGlzTm90TmlsKSk7XG4gICAgfSxcbiAgICBbb25Ecm9wXVxuICApO1xuXG4gIGNvbnN0IHsgZ2V0Um9vdFByb3BzLCBnZXRJbnB1dFByb3BzLCBpc0RyYWdBY3RpdmUgfSA9XG4gICAgdXNlU3RpY2tlckRyb3B6b25lKGhhbmRsZURyb3ApO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG9uRHJhZ0FjdGl2ZSkge1xuICAgICAgb25EcmFnQWN0aXZlKGlzRHJhZ0FjdGl2ZSk7XG4gICAgfVxuICB9LCBbaXNEcmFnQWN0aXZlLCBvbkRyYWdBY3RpdmVdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRSb290UHJvcHMoeyBjbGFzc05hbWU6IGdldENsYXNzTmFtZShwcm9wcywgaXNEcmFnQWN0aXZlKSB9KX1cbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgYXJlYS1sYWJlbD17bGFiZWx9XG4gICAgPlxuICAgICAgPGlucHV0IHsuLi5nZXRJbnB1dFByb3BzKCl9IC8+XG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMzYgMzZcIiB3aWR0aD1cIjM2cHhcIiBoZWlnaHQ9XCIzNnB4XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMzIgMTcuMjVIMTguNzVWNGgtMS41djEzLjI1SDR2MS41aDEzLjI1VjMyaDEuNVYxOC43NUgzMnYtMS41elwiIC8+XG4gICAgICA8L3N2Zz5cbiAgICAgIHshaW5uZXIgPyAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLnRleHR9PlxuICAgICAgICAgIHtpc0RyYWdBY3RpdmVcbiAgICAgICAgICAgID8gaTE4bignU3RpY2tlckNyZWF0b3ItLURyb3Bab25lLS1hY3RpdmVUZXh0JylcbiAgICAgICAgICAgIDogaTE4bignU3RpY2tlckNyZWF0b3ItLURyb3Bab25lLS1zdGF0aWNUZXh0Jyl9XG4gICAgICAgIDwvcD5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUd2QixhQUF3QjtBQUN4QixrQkFBd0I7QUFDeEIsZ0NBQW1DO0FBQ25DLHNCQUF5QjtBQVN6QixNQUFNLGVBQWUsd0JBQUMsRUFBRSxTQUFnQixpQkFBMEI7QUFDaEUsTUFBSSxPQUFPO0FBQ1QsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxNQUFJLGNBQWM7QUFDaEIsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxTQUFPLE9BQU87QUFDaEIsR0FWcUI7QUFZZCxNQUFNLFdBQXVDLGtDQUFTO0FBQzNELFFBQU0sRUFBRSxPQUFPLE9BQU8sUUFBUSxpQkFBaUI7QUFDL0MsUUFBTSxPQUFPLHlCQUFRO0FBRXJCLFFBQU0sYUFBYSxNQUFNLFlBQ3ZCLENBQUMsVUFBdUM7QUFDdEMsV0FBTyxNQUFNLElBQUksQ0FBQyxFQUFFLFdBQVcsSUFBSSxFQUFFLE9BQU8sd0JBQVEsQ0FBQztBQUFBLEVBQ3ZELEdBQ0EsQ0FBQyxNQUFNLENBQ1Q7QUFFQSxRQUFNLEVBQUUsY0FBYyxlQUFlLGlCQUNuQyxrREFBbUIsVUFBVTtBQUUvQixRQUFNLFVBQVUsTUFBTTtBQUNwQixRQUFJLGNBQWM7QUFDaEIsbUJBQWEsWUFBWTtBQUFBLElBQzNCO0FBQUEsRUFDRixHQUFHLENBQUMsY0FBYyxZQUFZLENBQUM7QUFFL0IsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssYUFBYSxFQUFFLFdBQVcsYUFBYSxPQUFPLFlBQVksRUFBRSxDQUFDO0FBQUEsSUFDakUsTUFBSztBQUFBLElBQ0wsY0FBWTtBQUFBLEtBRVosb0NBQUM7QUFBQSxPQUFVLGNBQWM7QUFBQSxHQUFHLEdBQzVCLG9DQUFDO0FBQUEsSUFBSSxTQUFRO0FBQUEsSUFBWSxPQUFNO0FBQUEsSUFBTyxRQUFPO0FBQUEsS0FDM0Msb0NBQUM7QUFBQSxJQUFLLEdBQUU7QUFBQSxHQUFpRSxDQUMzRSxHQUNDLENBQUMsUUFDQSxvQ0FBQztBQUFBLElBQUUsV0FBVyxPQUFPO0FBQUEsS0FDbEIsZUFDRyxLQUFLLHNDQUFzQyxJQUMzQyxLQUFLLHNDQUFzQyxDQUNqRCxJQUNFLElBQ047QUFFSixHQXZDb0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
