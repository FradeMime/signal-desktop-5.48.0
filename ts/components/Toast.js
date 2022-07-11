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
var Toast_exports = {};
__export(Toast_exports, {
  Toast: () => Toast
});
module.exports = __toCommonJS(Toast_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_dom = require("react-dom");
var import_useRestoreFocus = require("../hooks/useRestoreFocus");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
const Toast = (0, import_react.memo)(({
  autoDismissDisabled = false,
  children,
  className,
  disableCloseOnClick = false,
  onClose,
  style,
  timeout = 8e3,
  toastAction
}) => {
  const [root, setRoot] = import_react.default.useState(null);
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  (0, import_react.useEffect)(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
      setRoot(null);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!root || autoDismissDisabled) {
      return;
    }
    const timeoutId = setTimeout(onClose, timeout);
    return () => {
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeoutId);
    };
  }, [autoDismissDisabled, onClose, root, timeout]);
  return root ? (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement("div", {
    "aria-live": "assertive",
    className: (0, import_classnames.default)("Toast", className),
    onClick: () => {
      if (!disableCloseOnClick) {
        onClose();
      }
    },
    onKeyDown: (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        if (!disableCloseOnClick) {
          onClose();
        }
      }
    },
    role: "button",
    tabIndex: 0,
    style
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Toast__content"
  }, children), toastAction && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Toast__button",
    onClick: (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      toastAction.onClick();
      onClose();
    },
    onKeyDown: (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.stopPropagation();
        ev.preventDefault();
        toastAction.onClick();
        onClose();
      }
    },
    ref: focusRef,
    role: "button",
    tabIndex: 0
  }, toastAction.label)), root) : null;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toast
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBLZXlib2FyZEV2ZW50LCBNb3VzZUV2ZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgbWVtbywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgdXNlUmVzdG9yZUZvY3VzIH0gZnJvbSAnLi4vaG9va3MvdXNlUmVzdG9yZUZvY3VzJztcbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi4vdXRpbC9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgYXV0b0Rpc21pc3NEaXNhYmxlZD86IGJvb2xlYW47XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZGlzYWJsZUNsb3NlT25DbGljaz86IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG4gIHRvYXN0QWN0aW9uPzoge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgb25DbGljazogKCkgPT4gdW5rbm93bjtcbiAgfTtcbiAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufTtcblxuZXhwb3J0IGNvbnN0IFRvYXN0ID0gbWVtbyhcbiAgKHtcbiAgICBhdXRvRGlzbWlzc0Rpc2FibGVkID0gZmFsc2UsXG4gICAgY2hpbGRyZW4sXG4gICAgY2xhc3NOYW1lLFxuICAgIGRpc2FibGVDbG9zZU9uQ2xpY2sgPSBmYWxzZSxcbiAgICBvbkNsb3NlLFxuICAgIHN0eWxlLFxuICAgIHRpbWVvdXQgPSA4MDAwLFxuICAgIHRvYXN0QWN0aW9uLFxuICB9OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCB8IG51bGwgPT4ge1xuICAgIGNvbnN0IFtyb290LCBzZXRSb290XSA9IFJlYWN0LnVzZVN0YXRlPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW2ZvY3VzUmVmXSA9IHVzZVJlc3RvcmVGb2N1cygpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgc2V0Um9vdChkaXYpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICAgIHNldFJvb3QobnVsbCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIXJvb3QgfHwgYXV0b0Rpc21pc3NEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQob25DbG9zZSwgdGltZW91dCk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRpbWVvdXRJZCk7XG4gICAgICB9O1xuICAgIH0sIFthdXRvRGlzbWlzc0Rpc2FibGVkLCBvbkNsb3NlLCByb290LCB0aW1lb3V0XSk7XG5cbiAgICByZXR1cm4gcm9vdFxuICAgICAgPyBjcmVhdGVQb3J0YWwoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnVG9hc3QnLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVDbG9zZU9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldjogS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VudGVyJyB8fCBldi5rZXkgPT09ICcgJykge1xuICAgICAgICAgICAgICAgIGlmICghZGlzYWJsZUNsb3NlT25DbGljaykge1xuICAgICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJUb2FzdF9fY29udGVudFwiPntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgICAgIHt0b2FzdEFjdGlvbiAmJiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJUb2FzdF9fYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXY6IE1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICB0b2FzdEFjdGlvbi5vbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbktleURvd249eyhldjogS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFbnRlcicgfHwgZXYua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0QWN0aW9uLm9uQ2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0b2FzdEFjdGlvbi5sYWJlbH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICByb290XG4gICAgICAgIClcbiAgICAgIDogbnVsbDtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUF1QztBQUN2Qyx3QkFBdUI7QUFDdkIsdUJBQTZCO0FBQzdCLDZCQUFnQztBQUNoQyxxQ0FBd0M7QUFnQmpDLE1BQU0sUUFBUSx1QkFDbkIsQ0FBQztBQUFBLEVBQ0Msc0JBQXNCO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFVBQVU7QUFBQSxFQUNWO0FBQUEsTUFDbUM7QUFDbkMsUUFBTSxDQUFDLE1BQU0sV0FBVyxxQkFBTSxTQUE2QixJQUFJO0FBQy9ELFFBQU0sQ0FBQyxZQUFZLDRDQUFnQjtBQUVuQyw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxNQUFNLFNBQVMsY0FBYyxLQUFLO0FBQ3hDLGFBQVMsS0FBSyxZQUFZLEdBQUc7QUFDN0IsWUFBUSxHQUFHO0FBRVgsV0FBTyxNQUFNO0FBQ1gsZUFBUyxLQUFLLFlBQVksR0FBRztBQUM3QixjQUFRLElBQUk7QUFBQSxJQUNkO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLDhCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsUUFBUSxxQkFBcUI7QUFDaEM7QUFBQSxJQUNGO0FBRUEsVUFBTSxZQUFZLFdBQVcsU0FBUyxPQUFPO0FBRTdDLFdBQU8sTUFBTTtBQUNYLGtFQUF3QixTQUFTO0FBQUEsSUFDbkM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxxQkFBcUIsU0FBUyxNQUFNLE9BQU8sQ0FBQztBQUVoRCxTQUFPLE9BQ0gsbUNBQ0UsbURBQUM7QUFBQSxJQUNDLGFBQVU7QUFBQSxJQUNWLFdBQVcsK0JBQVcsU0FBUyxTQUFTO0FBQUEsSUFDeEMsU0FBUyxNQUFNO0FBQ2IsVUFBSSxDQUFDLHFCQUFxQjtBQUN4QixnQkFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXLENBQUMsT0FBc0M7QUFDaEQsVUFBSSxHQUFHLFFBQVEsV0FBVyxHQUFHLFFBQVEsS0FBSztBQUN4QyxZQUFJLENBQUMscUJBQXFCO0FBQ3hCLGtCQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFLO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVjtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUFrQixRQUFTLEdBQ3pDLGVBQ0MsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLFNBQVMsQ0FBQyxPQUFtQztBQUMzQyxTQUFHLGdCQUFnQjtBQUNuQixTQUFHLGVBQWU7QUFDbEIsa0JBQVksUUFBUTtBQUNwQixjQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsV0FBVyxDQUFDLE9BQXNDO0FBQ2hELFVBQUksR0FBRyxRQUFRLFdBQVcsR0FBRyxRQUFRLEtBQUs7QUFDeEMsV0FBRyxnQkFBZ0I7QUFDbkIsV0FBRyxlQUFlO0FBQ2xCLG9CQUFZLFFBQVE7QUFDcEIsZ0JBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsTUFBSztBQUFBLElBQ0wsVUFBVTtBQUFBLEtBRVQsWUFBWSxLQUNmLENBRUosR0FDQSxJQUNGLElBQ0E7QUFDTixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
