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
var TimelineFloatingHeader_exports = {};
__export(TimelineFloatingHeader_exports, {
  TimelineFloatingHeader: () => TimelineFloatingHeader
});
module.exports = __toCommonJS(TimelineFloatingHeader_exports);
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_web = require("@react-spring/web");
var import_TimelineDateHeader = require("./TimelineDateHeader");
var import_Spinner = require("../Spinner");
const TimelineFloatingHeader = /* @__PURE__ */ __name(({
  i18n,
  isLoading,
  style,
  timestamp,
  visible
}) => {
  const [hasRendered, setHasRendered] = (0, import_react.useState)(false);
  const [showSpinner, setShowSpinner] = (0, import_react.useState)(isLoading);
  (0, import_react.useEffect)(() => {
    setHasRendered(true);
  }, []);
  const [spinnerStyles, spinnerSpringRef] = (0, import_web.useSpring)(() => ({
    delay: 300,
    duration: 250,
    from: { opacity: 1 },
    to: { opacity: 0 },
    onRest: {
      opacity: ({ value }) => {
        if (value === 0) {
          setShowSpinner(false);
        }
      }
    }
  }), [isLoading]);
  (0, import_react.useEffect)(() => {
    if (isLoading) {
      spinnerSpringRef.stop();
      spinnerSpringRef.set({ opacity: 1 });
      setShowSpinner(true);
    }
    if (!isLoading && showSpinner) {
      spinnerSpringRef.start();
    }
    if (!isLoading && !showSpinner) {
      spinnerSpringRef.stop();
    }
  }, [isLoading, showSpinner, spinnerSpringRef]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("TimelineFloatingHeader", `TimelineFloatingHeader--${visible && hasRendered ? "visible" : "hidden"}`),
    style
  }, /* @__PURE__ */ import_react.default.createElement(import_TimelineDateHeader.TimelineDateHeader, {
    floating: true,
    i18n,
    timestamp
  }), showSpinner && /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    className: "TimelineFloatingHeader__spinner-container",
    style: spinnerStyles
  }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    direction: "on-background",
    size: "20px",
    svgSize: "small"
  })));
}, "TimelineFloatingHeader");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimelineFloatingHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVGbG9hdGluZ0hlYWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdHlwZSB7IENTU1Byb3BlcnRpZXMsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYW5pbWF0ZWQsIHVzZVNwcmluZyB9IGZyb20gJ0ByZWFjdC1zcHJpbmcvd2ViJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBUaW1lbGluZURhdGVIZWFkZXIgfSBmcm9tICcuL1RpbWVsaW5lRGF0ZUhlYWRlcic7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vU3Bpbm5lcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFJlYWRvbmx5PHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICBzdHlsZT86IENTU1Byb3BlcnRpZXM7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICB2aXNpYmxlOiBib29sZWFuO1xufT47XG5cbmV4cG9ydCBjb25zdCBUaW1lbGluZUZsb2F0aW5nSGVhZGVyID0gKHtcbiAgaTE4bixcbiAgaXNMb2FkaW5nLFxuICBzdHlsZSxcbiAgdGltZXN0YW1wLFxuICB2aXNpYmxlLFxufTogUHJvcHNUeXBlKTogUmVhY3RFbGVtZW50ID0+IHtcbiAgY29uc3QgW2hhc1JlbmRlcmVkLCBzZXRIYXNSZW5kZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93U3Bpbm5lciwgc2V0U2hvd1NwaW5uZXJdID0gdXNlU3RhdGUoaXNMb2FkaW5nKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEhhc1JlbmRlcmVkKHRydWUpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgW3NwaW5uZXJTdHlsZXMsIHNwaW5uZXJTcHJpbmdSZWZdID0gdXNlU3ByaW5nKFxuICAgICgpID0+ICh7XG4gICAgICBkZWxheTogMzAwLFxuICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIGZyb206IHsgb3BhY2l0eTogMSB9LFxuICAgICAgdG86IHsgb3BhY2l0eTogMCB9LFxuICAgICAgb25SZXN0OiB7XG4gICAgICAgIG9wYWNpdHk6ICh7IHZhbHVlIH0pID0+IHtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIHNldFNob3dTcGlubmVyKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIFtpc0xvYWRpbmddXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICBzcGlubmVyU3ByaW5nUmVmLnN0b3AoKTtcbiAgICAgIHNwaW5uZXJTcHJpbmdSZWYuc2V0KHsgb3BhY2l0eTogMSB9KTtcbiAgICAgIHNldFNob3dTcGlubmVyKHRydWUpO1xuICAgIH1cblxuICAgIGlmICghaXNMb2FkaW5nICYmIHNob3dTcGlubmVyKSB7XG4gICAgICBzcGlubmVyU3ByaW5nUmVmLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0xvYWRpbmcgJiYgIXNob3dTcGlubmVyKSB7XG4gICAgICBzcGlubmVyU3ByaW5nUmVmLnN0b3AoKTtcbiAgICB9XG4gIH0sIFtpc0xvYWRpbmcsIHNob3dTcGlubmVyLCBzcGlubmVyU3ByaW5nUmVmXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdUaW1lbGluZUZsb2F0aW5nSGVhZGVyJyxcbiAgICAgICAgYFRpbWVsaW5lRmxvYXRpbmdIZWFkZXItLSR7XG4gICAgICAgICAgdmlzaWJsZSAmJiBoYXNSZW5kZXJlZCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXG4gICAgICAgIH1gXG4gICAgICApfVxuICAgICAgc3R5bGU9e3N0eWxlfVxuICAgID5cbiAgICAgIDxUaW1lbGluZURhdGVIZWFkZXIgZmxvYXRpbmcgaTE4bj17aTE4bn0gdGltZXN0YW1wPXt0aW1lc3RhbXB9IC8+XG4gICAgICB7c2hvd1NwaW5uZXIgJiYgKFxuICAgICAgICA8YW5pbWF0ZWQuZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiVGltZWxpbmVGbG9hdGluZ0hlYWRlcl9fc3Bpbm5lci1jb250YWluZXJcIlxuICAgICAgICAgIHN0eWxlPXtzcGlubmVyU3R5bGVzfVxuICAgICAgICA+XG4gICAgICAgICAgPFNwaW5uZXIgZGlyZWN0aW9uPVwib24tYmFja2dyb3VuZFwiIHNpemU9XCIyMHB4XCIgc3ZnU2l6ZT1cInNtYWxsXCIgLz5cbiAgICAgICAgPC9hbmltYXRlZC5kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx3QkFBdUI7QUFFdkIsbUJBQTJDO0FBQzNDLGlCQUFvQztBQUdwQyxnQ0FBbUM7QUFDbkMscUJBQXdCO0FBVWpCLE1BQU0seUJBQXlCLHdCQUFDO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNkI7QUFDN0IsUUFBTSxDQUFDLGFBQWEsa0JBQWtCLDJCQUFTLEtBQUs7QUFDcEQsUUFBTSxDQUFDLGFBQWEsa0JBQWtCLDJCQUFTLFNBQVM7QUFFeEQsOEJBQVUsTUFBTTtBQUNkLG1CQUFlLElBQUk7QUFBQSxFQUNyQixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sQ0FBQyxlQUFlLG9CQUFvQiwwQkFDeEMsTUFBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsTUFBTSxFQUFFLFNBQVMsRUFBRTtBQUFBLElBQ25CLElBQUksRUFBRSxTQUFTLEVBQUU7QUFBQSxJQUNqQixRQUFRO0FBQUEsTUFDTixTQUFTLENBQUMsRUFBRSxZQUFZO0FBQ3RCLFlBQUksVUFBVSxHQUFHO0FBQ2YseUJBQWUsS0FBSztBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLElBQ0EsQ0FBQyxTQUFTLENBQ1o7QUFFQSw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxXQUFXO0FBQ2IsdUJBQWlCLEtBQUs7QUFDdEIsdUJBQWlCLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUNuQyxxQkFBZSxJQUFJO0FBQUEsSUFDckI7QUFFQSxRQUFJLENBQUMsYUFBYSxhQUFhO0FBQzdCLHVCQUFpQixNQUFNO0FBQUEsSUFDekI7QUFFQSxRQUFJLENBQUMsYUFBYSxDQUFDLGFBQWE7QUFDOUIsdUJBQWlCLEtBQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFdBQVcsYUFBYSxnQkFBZ0IsQ0FBQztBQUU3QyxTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULDBCQUNBLDJCQUNFLFdBQVcsY0FBYyxZQUFZLFVBRXpDO0FBQUEsSUFDQTtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUFtQixVQUFRO0FBQUEsSUFBQztBQUFBLElBQVk7QUFBQSxHQUFzQixHQUM5RCxlQUNDLG1EQUFDLG9CQUFTLEtBQVQ7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxLQUVQLG1EQUFDO0FBQUEsSUFBUSxXQUFVO0FBQUEsSUFBZ0IsTUFBSztBQUFBLElBQU8sU0FBUTtBQUFBLEdBQVEsQ0FDakUsQ0FFSjtBQUVKLEdBcEVzQzsiLAogICJuYW1lcyI6IFtdCn0K
