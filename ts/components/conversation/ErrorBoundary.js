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
var ErrorBoundary_exports = {};
__export(ErrorBoundary_exports, {
  ErrorBoundary: () => ErrorBoundary
});
module.exports = __toCommonJS(ErrorBoundary_exports);
var import_react = __toESM(require("react"));
var Errors = __toESM(require("../../types/errors"));
var log = __toESM(require("../../logging/log"));
const CSS_MODULE = "module-error-boundary-notification";
class ErrorBoundary extends import_react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: void 0 };
  }
  static getDerivedStateFromError(error) {
    log.error("ErrorBoundary: captured rendering error", Errors.toLogFormat(error));
    return { error };
  }
  render() {
    const { error } = this.state;
    const { i18n, children } = this.props;
    if (!error) {
      return children;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: CSS_MODULE,
      onClick: this.onClick.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
      role: "button",
      tabIndex: 0
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: `${CSS_MODULE}__icon-container`
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: `${CSS_MODULE}__icon`
    })), /* @__PURE__ */ import_react.default.createElement("div", {
      className: `${CSS_MODULE}__message`
    }, i18n("ErrorBoundaryNotification__text")));
  }
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.onAction();
  }
  onKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.onAction();
  }
  onAction() {
    const { showDebugLog } = this.props;
    showDebugLog();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorBoundary
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXJyb3JCb3VuZGFyeS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi8uLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG5cbiAgc2hvd0RlYnVnTG9nKCk6IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBTdGF0ZSA9IHtcbiAgZXJyb3I/OiBFcnJvcjtcbn07XG5cbmNvbnN0IENTU19NT0RVTEUgPSAnbW9kdWxlLWVycm9yLWJvdW5kYXJ5LW5vdGlmaWNhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHsgZXJyb3I6IHVuZGVmaW5lZCB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3I6IEVycm9yKTogU3RhdGUge1xuICAgIGxvZy5lcnJvcihcbiAgICAgICdFcnJvckJvdW5kYXJ5OiBjYXB0dXJlZCByZW5kZXJpbmcgZXJyb3InLFxuICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICk7XG4gICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgfVxuXG4gIHB1YmxpYyBvdmVycmlkZSByZW5kZXIoKTogUmVhY3ROb2RlIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgaTE4biwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWVycm9yKSB7XG4gICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtDU1NfTU9EVUxFfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtDU1NfTU9EVUxFfV9faWNvbi1jb250YWluZXJgfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Q1NTX01PRFVMRX1fX2ljb25gfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0NTU19NT0RVTEV9X19tZXNzYWdlYH0+XG4gICAgICAgICAge2kxOG4oJ0Vycm9yQm91bmRhcnlOb3RpZmljYXRpb25fX3RleHQnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMub25BY3Rpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgb25LZXlEb3duKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VudGVyJyAmJiBldmVudC5rZXkgIT09ICcgJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5vbkFjdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkFjdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNob3dEZWJ1Z0xvZyB9ID0gdGhpcy5wcm9wcztcbiAgICBzaG93RGVidWdMb2coKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUdsQixhQUF3QjtBQUN4QixVQUFxQjtBQWFyQixNQUFNLGFBQWE7QUFFWixNQUFNLHNCQUFzQixxQkFBTSxjQUE0QjtBQUFBLEVBQ25FLFlBQVksT0FBYztBQUN4QixVQUFNLEtBQUs7QUFFWCxTQUFLLFFBQVEsRUFBRSxPQUFPLE9BQVU7QUFBQSxFQUNsQztBQUFBLFNBRWMseUJBQXlCLE9BQXFCO0FBQzFELFFBQUksTUFDRiwyQ0FDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUNBLFdBQU8sRUFBRSxNQUFNO0FBQUEsRUFDakI7QUFBQSxFQUVnQixTQUFvQjtBQUNsQyxVQUFNLEVBQUUsVUFBVSxLQUFLO0FBQ3ZCLFVBQU0sRUFBRSxNQUFNLGFBQWEsS0FBSztBQUVoQyxRQUFJLENBQUMsT0FBTztBQUNWLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FDRSxtREFBQztBQUFBLE1BQ0MsV0FBVztBQUFBLE1BQ1gsU0FBUyxLQUFLLFFBQVEsS0FBSyxJQUFJO0FBQUEsTUFDL0IsV0FBVyxLQUFLLFVBQVUsS0FBSyxJQUFJO0FBQUEsTUFDbkMsTUFBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE9BRVYsbURBQUM7QUFBQSxNQUFJLFdBQVcsR0FBRztBQUFBLE9BQ2pCLG1EQUFDO0FBQUEsTUFBSSxXQUFXLEdBQUc7QUFBQSxLQUFvQixDQUN6QyxHQUNBLG1EQUFDO0FBQUEsTUFBSSxXQUFXLEdBQUc7QUFBQSxPQUNoQixLQUFLLGlDQUFpQyxDQUN6QyxDQUNGO0FBQUEsRUFFSjtBQUFBLEVBRVEsUUFBUSxPQUErQjtBQUM3QyxVQUFNLGdCQUFnQjtBQUN0QixVQUFNLGVBQWU7QUFFckIsU0FBSyxTQUFTO0FBQUEsRUFDaEI7QUFBQSxFQUVRLFVBQVUsT0FBa0M7QUFDbEQsUUFBSSxNQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVEsS0FBSztBQUM5QztBQUFBLElBQ0Y7QUFDQSxVQUFNLGdCQUFnQjtBQUN0QixVQUFNLGVBQWU7QUFFckIsU0FBSyxTQUFTO0FBQUEsRUFDaEI7QUFBQSxFQUVRLFdBQWlCO0FBQ3ZCLFVBQU0sRUFBRSxpQkFBaUIsS0FBSztBQUM5QixpQkFBYTtBQUFBLEVBQ2Y7QUFDRjtBQTlETyIsCiAgIm5hbWVzIjogW10KfQo=
