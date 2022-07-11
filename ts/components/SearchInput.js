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
var SearchInput_exports = {};
__export(SearchInput_exports, {
  SearchInput: () => SearchInput
});
module.exports = __toCommonJS(SearchInput_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_getClassNamesFor = require("../util/getClassNamesFor");
const BASE_CLASS_NAME = "module-SearchInput";
const SearchInput = (0, import_react.forwardRef)(({
  children,
  disabled = false,
  hasSearchIcon = true,
  i18n,
  label,
  moduleClassName,
  onClear,
  onBlur,
  onChange,
  onKeyDown,
  placeholder,
  value
}, ref) => {
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)(BASE_CLASS_NAME, moduleClassName);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__container")
  }, hasSearchIcon && /* @__PURE__ */ import_react.default.createElement("i", {
    className: getClassName("__icon")
  }), children, /* @__PURE__ */ import_react.default.createElement("input", {
    "aria-label": label || i18n("search"),
    className: (0, import_classnames.default)(getClassName("__input"), value && getClassName("__input--with-text"), children && getClassName("__input--with-children")),
    dir: "auto",
    disabled,
    onBlur,
    onChange,
    onKeyDown: (event) => {
      const { ctrlKey, key } = event;
      if (window.platform === "linux" && ctrlKey && key === "/") {
        event.preventDefault();
        event.stopPropagation();
      } else if (key === "Escape" && onClear) {
        onClear();
        event.preventDefault();
        event.stopPropagation();
      }
      onKeyDown?.(event);
    },
    placeholder,
    ref,
    type: "text",
    value
  }), value && onClear && /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("cancel"),
    className: getClassName("__cancel"),
    onClick: onClear,
    tabIndex: -1,
    type: "button"
  }));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SearchInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2VhcmNoSW5wdXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUge1xuICBDaGFuZ2VFdmVudCxcbiAgRm9jdXNFdmVudEhhbmRsZXIsXG4gIEtleWJvYXJkRXZlbnQsXG4gIFJlYWN0Tm9kZSxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgZ2V0Q2xhc3NOYW1lc0ZvciB9IGZyb20gJy4uL3V0aWwvZ2V0Q2xhc3NOYW1lc0Zvcic7XG5cbmV4cG9ydCB0eXBlIFByb3BUeXBlcyA9IHtcbiAgcmVhZG9ubHkgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIHJlYWRvbmx5IGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgbGFiZWw/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGhhc1NlYXJjaEljb24/OiBib29sZWFuO1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICByZWFkb25seSBtb2R1bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IG9uQ2xlYXI/OiAoKSA9PiB1bmtub3duO1xuICByZWFkb25seSBvbkJsdXI/OiBGb2N1c0V2ZW50SGFuZGxlcjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgcmVhZG9ubHkgb25DaGFuZ2U6IChldjogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHVua25vd247XG4gIHJlYWRvbmx5IG9uS2V5RG93bj86IChldjogS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgcmVhZG9ubHkgdmFsdWU6IHN0cmluZztcbn07XG5cbmNvbnN0IEJBU0VfQ0xBU1NfTkFNRSA9ICdtb2R1bGUtU2VhcmNoSW5wdXQnO1xuXG5leHBvcnQgY29uc3QgU2VhcmNoSW5wdXQgPSBmb3J3YXJkUmVmPEhUTUxJbnB1dEVsZW1lbnQsIFByb3BUeXBlcz4oXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgICBoYXNTZWFyY2hJY29uID0gdHJ1ZSxcbiAgICAgIGkxOG4sXG4gICAgICBsYWJlbCxcbiAgICAgIG1vZHVsZUNsYXNzTmFtZSxcbiAgICAgIG9uQ2xlYXIsXG4gICAgICBvbkJsdXIsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIG9uS2V5RG93bixcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgICByZWZcbiAgKSA9PiB7XG4gICAgY29uc3QgZ2V0Q2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lc0ZvcihCQVNFX0NMQVNTX05BTUUsIG1vZHVsZUNsYXNzTmFtZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY29udGFpbmVyJyl9PlxuICAgICAgICB7aGFzU2VhcmNoSWNvbiAmJiA8aSBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19pY29uJyl9IC8+fVxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsIHx8IGkxOG4oJ3NlYXJjaCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIGdldENsYXNzTmFtZSgnX19pbnB1dCcpLFxuICAgICAgICAgICAgdmFsdWUgJiYgZ2V0Q2xhc3NOYW1lKCdfX2lucHV0LS13aXRoLXRleHQnKSxcbiAgICAgICAgICAgIGNoaWxkcmVuICYmIGdldENsYXNzTmFtZSgnX19pbnB1dC0td2l0aC1jaGlsZHJlbicpXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXI9XCJhdXRvXCJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgIG9uS2V5RG93bj17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjdHJsS2V5LCBrZXkgfSA9IGV2ZW50O1xuXG4gICAgICAgICAgICAvLyBPbiBMaW51eCwgdGhpcyBrZXkgY29tYm8gc2VsZWN0cyBhbGwgdGV4dC5cbiAgICAgICAgICAgIGlmICh3aW5kb3cucGxhdGZvcm0gPT09ICdsaW51eCcgJiYgY3RybEtleSAmJiBrZXkgPT09ICcvJykge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRXNjYXBlJyAmJiBvbkNsZWFyKSB7XG4gICAgICAgICAgICAgIG9uQ2xlYXIoKTtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uS2V5RG93bj8uKGV2ZW50KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAvPlxuICAgICAgICB7dmFsdWUgJiYgb25DbGVhciAmJiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2FuY2VsJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19jYW5jZWwnKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xlYXJ9XG4gICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLG1CQUFrQztBQUNsQyx3QkFBdUI7QUFFdkIsOEJBQWlDO0FBaUJqQyxNQUFNLGtCQUFrQjtBQUVqQixNQUFNLGNBQWMsNkJBQ3pCLENBQ0U7QUFBQSxFQUNFO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxnQkFBZ0I7QUFBQSxFQUNoQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FFRixRQUNHO0FBQ0gsUUFBTSxlQUFlLDhDQUFpQixpQkFBaUIsZUFBZTtBQUN0RSxTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFXLGFBQWEsYUFBYTtBQUFBLEtBQ3ZDLGlCQUFpQixtREFBQztBQUFBLElBQUUsV0FBVyxhQUFhLFFBQVE7QUFBQSxHQUFHLEdBQ3ZELFVBQ0QsbURBQUM7QUFBQSxJQUNDLGNBQVksU0FBUyxLQUFLLFFBQVE7QUFBQSxJQUNsQyxXQUFXLCtCQUNULGFBQWEsU0FBUyxHQUN0QixTQUFTLGFBQWEsb0JBQW9CLEdBQzFDLFlBQVksYUFBYSx3QkFBd0IsQ0FDbkQ7QUFBQSxJQUNBLEtBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVcsV0FBUztBQUNsQixZQUFNLEVBQUUsU0FBUyxRQUFRO0FBR3pCLFVBQUksT0FBTyxhQUFhLFdBQVcsV0FBVyxRQUFRLEtBQUs7QUFDekQsY0FBTSxlQUFlO0FBQ3JCLGNBQU0sZ0JBQWdCO0FBQUEsTUFDeEIsV0FBVyxRQUFRLFlBQVksU0FBUztBQUN0QyxnQkFBUTtBQUNSLGNBQU0sZUFBZTtBQUNyQixjQUFNLGdCQUFnQjtBQUFBLE1BQ3hCO0FBRUEsa0JBQVksS0FBSztBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQUs7QUFBQSxJQUNMO0FBQUEsR0FDRixHQUNDLFNBQVMsV0FDUixtREFBQztBQUFBLElBQ0MsY0FBWSxLQUFLLFFBQVE7QUFBQSxJQUN6QixXQUFXLGFBQWEsVUFBVTtBQUFBLElBQ2xDLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxJQUNWLE1BQUs7QUFBQSxHQUNQLENBRUo7QUFFSixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
