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
var ExpireTimer_exports = {};
__export(ExpireTimer_exports, {
  ExpireTimer: () => ExpireTimer
});
module.exports = __toCommonJS(ExpireTimer_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_timer = require("../../util/timer");
var import_clearTimeoutIfNecessary = require("../../util/clearTimeoutIfNecessary");
class ExpireTimer extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }
  componentDidMount() {
    const { expirationLength } = this.props;
    const increment = (0, import_timer.getIncrement)(expirationLength);
    const updateFrequency = Math.max(increment, 500);
    const update = /* @__PURE__ */ __name(() => {
      this.setState({
        lastUpdated: Date.now()
      });
    }, "update");
    this.interval = setInterval(update, updateFrequency);
  }
  componentWillUnmount() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.interval);
  }
  render() {
    const {
      deletedForEveryone,
      direction,
      expirationLength,
      expirationTimestamp,
      withImageNoCaption,
      withSticker,
      withTapToViewExpired
    } = this.props;
    const bucket = (0, import_timer.getTimerBucket)(expirationTimestamp, expirationLength);
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-expire-timer", `module-expire-timer--${bucket}`, direction ? `module-expire-timer--${direction}` : null, deletedForEveryone ? "module-expire-timer--deleted-for-everyone" : null, withTapToViewExpired ? `module-expire-timer--${direction}-with-tap-to-view-expired` : null, direction && withImageNoCaption ? "module-expire-timer--with-image-no-caption" : null, withSticker ? "module-expire-timer--with-sticker" : null)
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpireTimer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXhwaXJlVGltZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBnZXRJbmNyZW1lbnQsIGdldFRpbWVyQnVja2V0IH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lcic7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uLy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgZGVsZXRlZEZvckV2ZXJ5b25lPzogYm9vbGVhbjtcbiAgZGlyZWN0aW9uPzogJ2luY29taW5nJyB8ICdvdXRnb2luZyc7XG4gIGV4cGlyYXRpb25MZW5ndGg6IG51bWJlcjtcbiAgZXhwaXJhdGlvblRpbWVzdGFtcD86IG51bWJlcjtcbiAgd2l0aEltYWdlTm9DYXB0aW9uPzogYm9vbGVhbjtcbiAgd2l0aFN0aWNrZXI/OiBib29sZWFuO1xuICB3aXRoVGFwVG9WaWV3RXhwaXJlZD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgRXhwaXJlVGltZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHM+IHtcbiAgcHJpdmF0ZSBpbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZXhwaXJhdGlvbkxlbmd0aCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbmNyZW1lbnQgPSBnZXRJbmNyZW1lbnQoZXhwaXJhdGlvbkxlbmd0aCk7XG4gICAgY29uc3QgdXBkYXRlRnJlcXVlbmN5ID0gTWF0aC5tYXgoaW5jcmVtZW50LCA1MDApO1xuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIC8vIFVzZWQgdG8gdHJpZ2dlciByZW5kZXJzXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby11bnVzZWQtc3RhdGVcbiAgICAgICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGUsIHVwZGF0ZUZyZXF1ZW5jeSk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50V2lsbFVubW91bnQoKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7XG4gICAgICBkZWxldGVkRm9yRXZlcnlvbmUsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBleHBpcmF0aW9uTGVuZ3RoLFxuICAgICAgZXhwaXJhdGlvblRpbWVzdGFtcCxcbiAgICAgIHdpdGhJbWFnZU5vQ2FwdGlvbixcbiAgICAgIHdpdGhTdGlja2VyLFxuICAgICAgd2l0aFRhcFRvVmlld0V4cGlyZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBidWNrZXQgPSBnZXRUaW1lckJ1Y2tldChleHBpcmF0aW9uVGltZXN0YW1wLCBleHBpcmF0aW9uTGVuZ3RoKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnbW9kdWxlLWV4cGlyZS10aW1lcicsXG4gICAgICAgICAgYG1vZHVsZS1leHBpcmUtdGltZXItLSR7YnVja2V0fWAsXG4gICAgICAgICAgZGlyZWN0aW9uID8gYG1vZHVsZS1leHBpcmUtdGltZXItLSR7ZGlyZWN0aW9ufWAgOiBudWxsLFxuICAgICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVxuICAgICAgICAgICAgPyAnbW9kdWxlLWV4cGlyZS10aW1lci0tZGVsZXRlZC1mb3ItZXZlcnlvbmUnXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgd2l0aFRhcFRvVmlld0V4cGlyZWRcbiAgICAgICAgICAgID8gYG1vZHVsZS1leHBpcmUtdGltZXItLSR7ZGlyZWN0aW9ufS13aXRoLXRhcC10by12aWV3LWV4cGlyZWRgXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgZGlyZWN0aW9uICYmIHdpdGhJbWFnZU5vQ2FwdGlvblxuICAgICAgICAgICAgPyAnbW9kdWxlLWV4cGlyZS10aW1lci0td2l0aC1pbWFnZS1uby1jYXB0aW9uJ1xuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgIHdpdGhTdGlja2VyID8gJ21vZHVsZS1leHBpcmUtdGltZXItLXdpdGgtc3RpY2tlcicgOiBudWxsXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLG1CQUE2QztBQUM3QyxxQ0FBd0M7QUFZakMsTUFBTSxvQkFBb0IscUJBQU0sVUFBaUI7QUFBQSxFQUd0RCxZQUFZLE9BQWM7QUFDeEIsVUFBTSxLQUFLO0FBRVgsU0FBSyxXQUFXO0FBQUEsRUFDbEI7QUFBQSxFQUVnQixvQkFBMEI7QUFDeEMsVUFBTSxFQUFFLHFCQUFxQixLQUFLO0FBQ2xDLFVBQU0sWUFBWSwrQkFBYSxnQkFBZ0I7QUFDL0MsVUFBTSxrQkFBa0IsS0FBSyxJQUFJLFdBQVcsR0FBRztBQUUvQyxVQUFNLFNBQVMsNkJBQU07QUFDbkIsV0FBSyxTQUFTO0FBQUEsUUFHWixhQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3hCLENBQUM7QUFBQSxJQUNILEdBTmU7QUFPZixTQUFLLFdBQVcsWUFBWSxRQUFRLGVBQWU7QUFBQSxFQUNyRDtBQUFBLEVBRWdCLHVCQUE2QjtBQUMzQyxnRUFBd0IsS0FBSyxRQUFRO0FBQUEsRUFDdkM7QUFBQSxFQUVnQixTQUFzQjtBQUNwQyxVQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUVULFVBQU0sU0FBUyxpQ0FBZSxxQkFBcUIsZ0JBQWdCO0FBRW5FLFdBQ0UsbURBQUM7QUFBQSxNQUNDLFdBQVcsK0JBQ1QsdUJBQ0Esd0JBQXdCLFVBQ3hCLFlBQVksd0JBQXdCLGNBQWMsTUFDbEQscUJBQ0ksOENBQ0EsTUFDSix1QkFDSSx3QkFBd0IsdUNBQ3hCLE1BQ0osYUFBYSxxQkFDVCwrQ0FDQSxNQUNKLGNBQWMsc0NBQXNDLElBQ3REO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFDRjtBQTdETyIsCiAgIm5hbWVzIjogW10KfQo=
