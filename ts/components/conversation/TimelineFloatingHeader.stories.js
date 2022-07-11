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
var TimelineFloatingHeader_stories_exports = {};
__export(TimelineFloatingHeader_stories_exports, {
  Loading: () => Loading,
  Visible: () => Visible,
  default: () => TimelineFloatingHeader_stories_default
});
module.exports = __toCommonJS(TimelineFloatingHeader_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_TimelineFloatingHeader = require("./TimelineFloatingHeader");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
function booleanOr(value, defaultValue) {
  return (0, import_lodash.isBoolean)(value) ? value : defaultValue;
}
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  isLoading: (0, import_addon_knobs.boolean)("isLoading", booleanOr(overrideProps.isLoading, false)),
  style: overrideProps.style,
  visible: (0, import_addon_knobs.boolean)("visible", booleanOr(overrideProps.visible, false)),
  i18n,
  timestamp: overrideProps.timestamp || Date.now()
}), "createProps");
var TimelineFloatingHeader_stories_default = {
  title: "Components/TimelineFloatingHeader"
};
const Visible = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_TimelineFloatingHeader.TimelineFloatingHeader, {
    ...createProps({ visible: true })
  });
}, "Visible");
const Loading = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_TimelineFloatingHeader.TimelineFloatingHeader, {
    ...createProps({ visible: true, isLoading: true })
  });
}, "Loading");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Loading,
  Visible
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVGbG9hdGluZ0hlYWRlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1RpbWVsaW5lRmxvYXRpbmdIZWFkZXInO1xuaW1wb3J0IHsgVGltZWxpbmVGbG9hdGluZ0hlYWRlciB9IGZyb20gJy4vVGltZWxpbmVGbG9hdGluZ0hlYWRlcic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmZ1bmN0aW9uIGJvb2xlYW5Pcih2YWx1ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCwgZGVmYXVsdFZhbHVlOiBib29sZWFuKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGlzTG9hZGluZzogYm9vbGVhbignaXNMb2FkaW5nJywgYm9vbGVhbk9yKG92ZXJyaWRlUHJvcHMuaXNMb2FkaW5nLCBmYWxzZSkpLFxuICBzdHlsZTogb3ZlcnJpZGVQcm9wcy5zdHlsZSxcbiAgdmlzaWJsZTogYm9vbGVhbigndmlzaWJsZScsIGJvb2xlYW5PcihvdmVycmlkZVByb3BzLnZpc2libGUsIGZhbHNlKSksXG4gIGkxOG4sXG4gIHRpbWVzdGFtcDogb3ZlcnJpZGVQcm9wcy50aW1lc3RhbXAgfHwgRGF0ZS5ub3coKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9UaW1lbGluZUZsb2F0aW5nSGVhZGVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBWaXNpYmxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxUaW1lbGluZUZsb2F0aW5nSGVhZGVyIHsuLi5jcmVhdGVQcm9wcyh7IHZpc2libGU6IHRydWUgfSl9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IExvYWRpbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxUaW1lbGluZUZsb2F0aW5nSGVhZGVyXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoeyB2aXNpYmxlOiB0cnVlLCBpc0xvYWRpbmc6IHRydWUgfSl9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLG9CQUEwQjtBQUMxQix5QkFBd0I7QUFFeEIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUd2QixvQ0FBdUM7QUFFdkMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsbUJBQW1CLE9BQTRCLGNBQWdDO0FBQzdFLFNBQU8sNkJBQVUsS0FBSyxJQUFJLFFBQVE7QUFDcEM7QUFGUyxBQUlULE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLFdBQVcsZ0NBQVEsYUFBYSxVQUFVLGNBQWMsV0FBVyxLQUFLLENBQUM7QUFBQSxFQUN6RSxPQUFPLGNBQWM7QUFBQSxFQUNyQixTQUFTLGdDQUFRLFdBQVcsVUFBVSxjQUFjLFNBQVMsS0FBSyxDQUFDO0FBQUEsRUFDbkU7QUFBQSxFQUNBLFdBQVcsY0FBYyxhQUFhLEtBQUssSUFBSTtBQUNqRCxJQU5vQjtBQVFwQixJQUFPLHlDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFNBQU8sb0NBQUM7QUFBQSxPQUEyQixZQUFZLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFBQSxHQUFHO0FBQ3JFLEdBRnVCO0FBSWhCLE1BQU0sVUFBVSw2QkFBbUI7QUFDeEMsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWSxFQUFFLFNBQVMsTUFBTSxXQUFXLEtBQUssQ0FBQztBQUFBLEdBQ3BEO0FBRUosR0FOdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
