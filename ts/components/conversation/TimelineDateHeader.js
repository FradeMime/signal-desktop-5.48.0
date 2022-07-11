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
var TimelineDateHeader_exports = {};
__export(TimelineDateHeader_exports, {
  TimelineDateHeader: () => TimelineDateHeader
});
module.exports = __toCommonJS(TimelineDateHeader_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var durations = __toESM(require("../../util/durations"));
var import_timestamp = require("../../util/timestamp");
var import_Time = require("../Time");
function TimelineDateHeader({
  floating = false,
  i18n,
  timestamp
}) {
  const [text, setText] = (0, import_react.useState)((0, import_timestamp.formatDate)(i18n, timestamp));
  (0, import_react.useEffect)(() => {
    const update = /* @__PURE__ */ __name(() => setText((0, import_timestamp.formatDate)(i18n, timestamp)), "update");
    update();
    const interval = setInterval(update, durations.MINUTE);
    return () => {
      clearInterval(interval);
    };
  }, [i18n, timestamp]);
  return /* @__PURE__ */ import_react.default.createElement(import_Time.Time, {
    className: (0, import_classnames.default)("TimelineDateHeader", `TimelineDateHeader--${floating ? "floating" : "inline"}`),
    dateOnly: true,
    timestamp
  }, text);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimelineDateHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVEYXRlSGVhZGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lc3RhbXAnO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gJy4uL1RpbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gVGltZWxpbmVEYXRlSGVhZGVyKHtcbiAgZmxvYXRpbmcgPSBmYWxzZSxcbiAgaTE4bixcbiAgdGltZXN0YW1wLFxufTogUmVhZG9ubHk8e1xuICBmbG9hdGluZz86IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufT4pOiBSZWFjdEVsZW1lbnQge1xuICBjb25zdCBbdGV4dCwgc2V0VGV4dF0gPSB1c2VTdGF0ZShmb3JtYXREYXRlKGkxOG4sIHRpbWVzdGFtcCkpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHNldFRleHQoZm9ybWF0RGF0ZShpMThuLCB0aW1lc3RhbXApKTtcbiAgICB1cGRhdGUoKTtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKHVwZGF0ZSwgZHVyYXRpb25zLk1JTlVURSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH07XG4gIH0sIFtpMThuLCB0aW1lc3RhbXBdKTtcblxuICByZXR1cm4gKFxuICAgIDxUaW1lXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdUaW1lbGluZURhdGVIZWFkZXInLFxuICAgICAgICBgVGltZWxpbmVEYXRlSGVhZGVyLS0ke2Zsb2F0aW5nID8gJ2Zsb2F0aW5nJyA6ICdpbmxpbmUnfWBcbiAgICAgICl9XG4gICAgICBkYXRlT25seVxuICAgICAgdGltZXN0YW1wPXt0aW1lc3RhbXB9XG4gICAgPlxuICAgICAge3RleHR9XG4gICAgPC9UaW1lPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUEyQztBQUMzQyx3QkFBdUI7QUFDdkIsZ0JBQTJCO0FBRTNCLHVCQUEyQjtBQUMzQixrQkFBcUI7QUFFZCw0QkFBNEI7QUFBQSxFQUNqQyxXQUFXO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxHQUtnQjtBQUNoQixRQUFNLENBQUMsTUFBTSxXQUFXLDJCQUFTLGlDQUFXLE1BQU0sU0FBUyxDQUFDO0FBQzVELDhCQUFVLE1BQU07QUFDZCxVQUFNLFNBQVMsNkJBQU0sUUFBUSxpQ0FBVyxNQUFNLFNBQVMsQ0FBQyxHQUF6QztBQUNmLFdBQU87QUFDUCxVQUFNLFdBQVcsWUFBWSxRQUFRLFVBQVUsTUFBTTtBQUNyRCxXQUFPLE1BQU07QUFDWCxvQkFBYyxRQUFRO0FBQUEsSUFDeEI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUVwQixTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULHNCQUNBLHVCQUF1QixXQUFXLGFBQWEsVUFDakQ7QUFBQSxJQUNBLFVBQVE7QUFBQSxJQUNSO0FBQUEsS0FFQyxJQUNIO0FBRUo7QUEvQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
