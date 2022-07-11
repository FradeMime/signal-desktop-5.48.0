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
var ModalHost_exports = {};
__export(ModalHost_exports, {
  ModalHost: () => ModalHost
});
module.exports = __toCommonJS(ModalHost_exports);
var import_react = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_web = require("@react-spring/web");
var import_classnames = __toESM(require("classnames"));
var import_getClassNamesFor = require("../util/getClassNamesFor");
var import_theme = require("../util/theme");
var import_useEscapeHandling = require("../hooks/useEscapeHandling");
const ModalHost = import_react.default.memo(({
  children,
  moduleClassName,
  noMouseClose,
  onClose,
  onEscape,
  onTopOfEverything,
  overlayStyles,
  theme,
  useFocusTrap = true
}) => {
  const [root, setRoot] = import_react.default.useState(null);
  const [isMouseDown, setIsMouseDown] = import_react.default.useState(false);
  (0, import_react.useEffect)(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
      setRoot(null);
    };
  }, []);
  (0, import_useEscapeHandling.useEscapeHandling)(onEscape || onClose);
  const handleMouseDown = import_react.default.useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsMouseDown(true);
    }
  }, [setIsMouseDown]);
  const handleMouseUp = import_react.default.useCallback((e) => {
    setIsMouseDown(false);
    if (e.target === e.currentTarget && isMouseDown) {
      onClose();
    }
  }, [onClose, isMouseDown, setIsMouseDown]);
  const className = (0, import_classnames.default)([
    theme ? (0, import_theme.themeClassName)(theme) : void 0,
    onTopOfEverything ? "module-modal-host--on-top-of-everything" : void 0
  ]);
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("module-modal-host", moduleClassName);
  const modalContent = /* @__PURE__ */ import_react.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    role: "presentation",
    className: getClassName("__overlay"),
    style: overlayStyles
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__overlay-container"),
    onMouseDown: noMouseClose ? void 0 : handleMouseDown,
    onMouseUp: noMouseClose ? void 0 : handleMouseUp
  }, children));
  return root ? (0, import_react_dom.createPortal)(useFocusTrap ? /* @__PURE__ */ import_react.default.createElement(import_focus_trap_react.default, {
    focusTrapOptions: {
      allowOutsideClick: ({ target }) => {
        if (!target || !(target instanceof HTMLElement)) {
          return false;
        }
        const titleBar = document.querySelector(".TitleBarContainer__title");
        if (titleBar?.contains(target)) {
          return true;
        }
        return false;
      }
    }
  }, modalContent) : modalContent, root) : null;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ModalHost
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTW9kYWxIb3N0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwLXJlYWN0JztcbmltcG9ydCB0eXBlIHsgU3ByaW5nVmFsdWVzIH0gZnJvbSAnQHJlYWN0LXNwcmluZy93ZWInO1xuaW1wb3J0IHsgYW5pbWF0ZWQgfSBmcm9tICdAcmVhY3Qtc3ByaW5nL3dlYic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBNb2RhbENvbmZpZ1R5cGUgfSBmcm9tICcuLi9ob29rcy91c2VBbmltYXRlZCc7XG5pbXBvcnQgdHlwZSB7IFRoZW1lIH0gZnJvbSAnLi4vdXRpbC90aGVtZSc7XG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcbmltcG9ydCB7IHRoZW1lQ2xhc3NOYW1lIH0gZnJvbSAnLi4vdXRpbC90aGVtZSc7XG5pbXBvcnQgeyB1c2VFc2NhcGVIYW5kbGluZyB9IGZyb20gJy4uL2hvb2tzL3VzZUVzY2FwZUhhbmRsaW5nJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0gUmVhZG9ubHk8e1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3RFbGVtZW50O1xuICBtb2R1bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG5vTW91c2VDbG9zZT86IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIG9uRXNjYXBlPzogKCkgPT4gdW5rbm93bjtcbiAgb25Ub3BPZkV2ZXJ5dGhpbmc/OiBib29sZWFuO1xuICBvdmVybGF5U3R5bGVzPzogU3ByaW5nVmFsdWVzPE1vZGFsQ29uZmlnVHlwZT47XG4gIHRoZW1lPzogVGhlbWU7XG4gIHVzZUZvY3VzVHJhcD86IGJvb2xlYW47XG59PjtcblxuZXhwb3J0IGNvbnN0IE1vZGFsSG9zdCA9IFJlYWN0Lm1lbW8oXG4gICh7XG4gICAgY2hpbGRyZW4sXG4gICAgbW9kdWxlQ2xhc3NOYW1lLFxuICAgIG5vTW91c2VDbG9zZSxcbiAgICBvbkNsb3NlLFxuICAgIG9uRXNjYXBlLFxuICAgIG9uVG9wT2ZFdmVyeXRoaW5nLFxuICAgIG92ZXJsYXlTdHlsZXMsXG4gICAgdGhlbWUsXG4gICAgdXNlRm9jdXNUcmFwID0gdHJ1ZSxcbiAgfTogUHJvcHNUeXBlKSA9PiB7XG4gICAgY29uc3QgW3Jvb3QsIHNldFJvb3RdID0gUmVhY3QudXNlU3RhdGU8SFRNTEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBbaXNNb3VzZURvd24sIHNldElzTW91c2VEb3duXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIHNldFJvb3QoZGl2KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkaXYpO1xuICAgICAgICBzZXRSb290KG51bGwpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFc2NhcGVIYW5kbGluZyhvbkVzY2FwZSB8fCBvbkNsb3NlKTtcblxuICAgIC8vIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHdyaXRlIGRpYWxvZ3MgdG8gYmUgaG9zdGVkIGhlcmU7IHRoZXkgd29uJ3QgaGF2ZSB0byB3b3JyeVxuICAgIC8vICAgYXMgbXVjaCBhYm91dCBwcmV2ZW50aW5nIHByb3BhZ2F0aW9uIG9mIG1vdXNlIGV2ZW50cy5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgc2V0SXNNb3VzZURvd24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbc2V0SXNNb3VzZURvd25dXG4gICAgKTtcbiAgICBjb25zdCBoYW5kbGVNb3VzZVVwID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBzZXRJc01vdXNlRG93bihmYWxzZSk7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQgJiYgaXNNb3VzZURvd24pIHtcbiAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbb25DbG9zZSwgaXNNb3VzZURvd24sIHNldElzTW91c2VEb3duXVxuICAgICk7XG5cbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKFtcbiAgICAgIHRoZW1lID8gdGhlbWVDbGFzc05hbWUodGhlbWUpIDogdW5kZWZpbmVkLFxuICAgICAgb25Ub3BPZkV2ZXJ5dGhpbmcgPyAnbW9kdWxlLW1vZGFsLWhvc3QtLW9uLXRvcC1vZi1ldmVyeXRoaW5nJyA6IHVuZGVmaW5lZCxcbiAgICBdKTtcbiAgICBjb25zdCBnZXRDbGFzc05hbWUgPSBnZXRDbGFzc05hbWVzRm9yKCdtb2R1bGUtbW9kYWwtaG9zdCcsIG1vZHVsZUNsYXNzTmFtZSk7XG5cbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgPGFuaW1hdGVkLmRpdlxuICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX292ZXJsYXknKX1cbiAgICAgICAgICBzdHlsZT17b3ZlcmxheVN0eWxlc31cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX292ZXJsYXktY29udGFpbmVyJyl9XG4gICAgICAgICAgb25Nb3VzZURvd249e25vTW91c2VDbG9zZSA/IHVuZGVmaW5lZCA6IGhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICBvbk1vdXNlVXA9e25vTW91c2VDbG9zZSA/IHVuZGVmaW5lZCA6IGhhbmRsZU1vdXNlVXB9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIHJldHVybiByb290XG4gICAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgICB1c2VGb2N1c1RyYXAgPyAoXG4gICAgICAgICAgICA8Rm9jdXNUcmFwXG4gICAgICAgICAgICAgIGZvY3VzVHJhcE9wdGlvbnM9e3tcbiAgICAgICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0IHx8ICEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICAnLlRpdGxlQmFyQ29udGFpbmVyX190aXRsZSdcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBpZiAodGl0bGVCYXI/LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21vZGFsQ29udGVudH1cbiAgICAgICAgICAgIDwvRm9jdXNUcmFwPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBtb2RhbENvbnRlbnRcbiAgICAgICAgICApLFxuICAgICAgICAgIHJvb3RcbiAgICAgICAgKVxuICAgICAgOiBudWxsO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWlDO0FBQ2pDLHVCQUE2QjtBQUM3Qiw4QkFBc0I7QUFFdEIsaUJBQXlCO0FBQ3pCLHdCQUF1QjtBQUl2Qiw4QkFBaUM7QUFDakMsbUJBQStCO0FBQy9CLCtCQUFrQztBQWMzQixNQUFNLFlBQVkscUJBQU0sS0FDN0IsQ0FBQztBQUFBLEVBQ0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxlQUFlO0FBQUEsTUFDQTtBQUNmLFFBQU0sQ0FBQyxNQUFNLFdBQVcscUJBQU0sU0FBNkIsSUFBSTtBQUMvRCxRQUFNLENBQUMsYUFBYSxrQkFBa0IscUJBQU0sU0FBUyxLQUFLO0FBRTFELDhCQUFVLE1BQU07QUFDZCxVQUFNLE1BQU0sU0FBUyxjQUFjLEtBQUs7QUFDeEMsYUFBUyxLQUFLLFlBQVksR0FBRztBQUM3QixZQUFRLEdBQUc7QUFFWCxXQUFPLE1BQU07QUFDWCxlQUFTLEtBQUssWUFBWSxHQUFHO0FBQzdCLGNBQVEsSUFBSTtBQUFBLElBQ2Q7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsa0RBQWtCLFlBQVksT0FBTztBQUlyQyxRQUFNLGtCQUFrQixxQkFBTSxZQUM1QixDQUFDLE1BQXdCO0FBQ3ZCLFFBQUksRUFBRSxXQUFXLEVBQUUsZUFBZTtBQUNoQyxxQkFBZSxJQUFJO0FBQUEsSUFDckI7QUFBQSxFQUNGLEdBQ0EsQ0FBQyxjQUFjLENBQ2pCO0FBQ0EsUUFBTSxnQkFBZ0IscUJBQU0sWUFDMUIsQ0FBQyxNQUF3QjtBQUN2QixtQkFBZSxLQUFLO0FBRXBCLFFBQUksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLGFBQWE7QUFDL0MsY0FBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQ0EsQ0FBQyxTQUFTLGFBQWEsY0FBYyxDQUN2QztBQUVBLFFBQU0sWUFBWSwrQkFBVztBQUFBLElBQzNCLFFBQVEsaUNBQWUsS0FBSyxJQUFJO0FBQUEsSUFDaEMsb0JBQW9CLDRDQUE0QztBQUFBLEVBQ2xFLENBQUM7QUFDRCxRQUFNLGVBQWUsOENBQWlCLHFCQUFxQixlQUFlO0FBRTFFLFFBQU0sZUFDSixtREFBQztBQUFBLElBQUk7QUFBQSxLQUNILG1EQUFDLG9CQUFTLEtBQVQ7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFdBQVcsYUFBYSxXQUFXO0FBQUEsSUFDbkMsT0FBTztBQUFBLEdBQ1QsR0FDQSxtREFBQztBQUFBLElBQ0MsV0FBVyxhQUFhLHFCQUFxQjtBQUFBLElBQzdDLGFBQWEsZUFBZSxTQUFZO0FBQUEsSUFDeEMsV0FBVyxlQUFlLFNBQVk7QUFBQSxLQUVyQyxRQUNILENBQ0Y7QUFHRixTQUFPLE9BQ0gsbUNBQ0UsZUFDRSxtREFBQztBQUFBLElBQ0Msa0JBQWtCO0FBQUEsTUFDaEIsbUJBQW1CLENBQUMsRUFBRSxhQUFhO0FBQ2pDLFlBQUksQ0FBQyxVQUFVLENBQUUsbUJBQWtCLGNBQWM7QUFDL0MsaUJBQU87QUFBQSxRQUNUO0FBRUEsY0FBTSxXQUFXLFNBQVMsY0FDeEIsMkJBQ0Y7QUFDQSxZQUFJLFVBQVUsU0FBUyxNQUFNLEdBQUc7QUFDOUIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsS0FFQyxZQUNILElBRUEsY0FFRixJQUNGLElBQ0E7QUFDTixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
