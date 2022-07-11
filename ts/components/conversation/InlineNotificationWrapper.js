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
var InlineNotificationWrapper_exports = {};
__export(InlineNotificationWrapper_exports, {
  InlineNotificationWrapper: () => InlineNotificationWrapper
});
module.exports = __toCommonJS(InlineNotificationWrapper_exports);
var import_react = __toESM(require("react"));
class InlineNotificationWrapper extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.focusRef = import_react.default.createRef();
    this.setFocus = /* @__PURE__ */ __name(() => {
      const container = this.focusRef.current;
      if (container && !container.contains(document.activeElement)) {
        container.focus();
      }
    }, "setFocus");
    this.handleFocus = /* @__PURE__ */ __name(() => {
      if (window.getInteractionMode() === "keyboard") {
        this.setSelected();
      }
    }, "handleFocus");
    this.setSelected = /* @__PURE__ */ __name(() => {
      const { id, conversationId, selectMessage } = this.props;
      if (selectMessage) {
        selectMessage(id, conversationId);
      }
    }, "setSelected");
  }
  componentDidMount() {
    const { isSelected } = this.props;
    if (isSelected) {
      this.setFocus();
    }
  }
  componentDidUpdate(prevProps) {
    const { isSelected } = this.props;
    if (!prevProps.isSelected && isSelected) {
      this.setFocus();
    }
  }
  render() {
    const { children } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-inline-notification-wrapper",
      tabIndex: 0,
      ref: this.focusRef,
      onFocus: this.handleFocus
    }, children);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InlineNotificationWrapper
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5saW5lTm90aWZpY2F0aW9uV3JhcHBlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIHNlbGVjdE1lc3NhZ2U/OiAobWVzc2FnZUlkOiBzdHJpbmcsIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY2xhc3MgSW5saW5lTm90aWZpY2F0aW9uV3JhcHBlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wc1R5cGU+IHtcbiAgcHVibGljIGZvY3VzUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+ID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgcHVibGljIHNldEZvY3VzID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZm9jdXNSZWYuY3VycmVudDtcblxuICAgIGlmIChjb250YWluZXIgJiYgIWNvbnRhaW5lci5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgY29udGFpbmVyLmZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVGb2N1cyA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAod2luZG93LmdldEludGVyYWN0aW9uTW9kZSgpID09PSAna2V5Ym9hcmQnKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBzZXRTZWxlY3RlZCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IGlkLCBjb252ZXJzYXRpb25JZCwgc2VsZWN0TWVzc2FnZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChzZWxlY3RNZXNzYWdlKSB7XG4gICAgICBzZWxlY3RNZXNzYWdlKGlkLCBjb252ZXJzYXRpb25JZCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBvdmVycmlkZSBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGlzU2VsZWN0ZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogUHJvcHNUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgeyBpc1NlbGVjdGVkIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFwcmV2UHJvcHMuaXNTZWxlY3RlZCAmJiBpc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1pbmxpbmUtbm90aWZpY2F0aW9uLXdyYXBwZXJcIlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXhcbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIHJlZj17dGhpcy5mb2N1c1JlZn1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQVNYLE1BQU0sa0NBQWtDLHFCQUFNLFVBQXFCO0FBQUEsRUFBbkU7QUFBQTtBQUNFLG9CQUE0QyxxQkFBTSxVQUFVO0FBRTVELG9CQUFXLDZCQUFZO0FBQzVCLFlBQU0sWUFBWSxLQUFLLFNBQVM7QUFFaEMsVUFBSSxhQUFhLENBQUMsVUFBVSxTQUFTLFNBQVMsYUFBYSxHQUFHO0FBQzVELGtCQUFVLE1BQU07QUFBQSxNQUNsQjtBQUFBLElBQ0YsR0FOa0I7QUFRWCx1QkFBYyw2QkFBWTtBQUMvQixVQUFJLE9BQU8sbUJBQW1CLE1BQU0sWUFBWTtBQUM5QyxhQUFLLFlBQVk7QUFBQSxNQUNuQjtBQUFBLElBQ0YsR0FKcUI7QUFNZCx1QkFBYyw2QkFBWTtBQUMvQixZQUFNLEVBQUUsSUFBSSxnQkFBZ0Isa0JBQWtCLEtBQUs7QUFFbkQsVUFBSSxlQUFlO0FBQ2pCLHNCQUFjLElBQUksY0FBYztBQUFBLE1BQ2xDO0FBQUEsSUFDRixHQU5xQjtBQUFBO0FBQUEsRUFRTCxvQkFBMEI7QUFDeEMsVUFBTSxFQUFFLGVBQWUsS0FBSztBQUM1QixRQUFJLFlBQVk7QUFDZCxXQUFLLFNBQVM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFBQSxFQUVnQixtQkFBbUIsV0FBNEI7QUFDN0QsVUFBTSxFQUFFLGVBQWUsS0FBSztBQUU1QixRQUFJLENBQUMsVUFBVSxjQUFjLFlBQVk7QUFDdkMsV0FBSyxTQUFTO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFFZ0IsU0FBc0I7QUFDcEMsVUFBTSxFQUFFLGFBQWEsS0FBSztBQUUxQixXQUNFLG1EQUFDO0FBQUEsTUFDQyxXQUFVO0FBQUEsTUFFVixVQUFVO0FBQUEsTUFDVixLQUFLLEtBQUs7QUFBQSxNQUNWLFNBQVMsS0FBSztBQUFBLE9BRWIsUUFDSDtBQUFBLEVBRUo7QUFDRjtBQXZETyIsCiAgIm5hbWVzIjogW10KfQo=
