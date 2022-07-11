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
var BetterAvatarBubble_exports = {};
__export(BetterAvatarBubble_exports, {
  BetterAvatarBubble: () => BetterAvatarBubble
});
module.exports = __toCommonJS(BetterAvatarBubble_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const BetterAvatarBubble = /* @__PURE__ */ __name(({
  children,
  color,
  i18n,
  isSelected,
  onDelete,
  onSelect,
  style
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      BetterAvatarBubble: true,
      "BetterAvatarBubble--selected": isSelected
    }, color && `BetterAvatarBubble--${color}`),
    onKeyDown: (ev) => {
      if (ev.key === "Enter") {
        onSelect();
      }
    },
    onClick: onSelect,
    role: "button",
    style,
    tabIndex: 0
  }, onDelete && /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("delete"),
    className: "BetterAvatarBubble__delete",
    onClick: onDelete,
    tabIndex: -1,
    type: "button"
  }), children);
}, "BetterAvatarBubble");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BetterAvatarBubble
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmV0dGVyQXZhdGFyQnViYmxlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENTU1Byb3BlcnRpZXMsIE1vdXNlRXZlbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBBdmF0YXJDb2xvclR5cGUgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIGNvbG9yPzogQXZhdGFyQ29sb3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc1NlbGVjdGVkPzogYm9vbGVhbjtcbiAgb25EZWxldGU/OiAoZXY6IE1vdXNlRXZlbnQpID0+IHVua25vd247XG4gIG9uU2VsZWN0OiAoKSA9PiB1bmtub3duO1xuICBzdHlsZT86IENTU1Byb3BlcnRpZXM7XG59O1xuXG5leHBvcnQgY29uc3QgQmV0dGVyQXZhdGFyQnViYmxlID0gKHtcbiAgY2hpbGRyZW4sXG4gIGNvbG9yLFxuICBpMThuLFxuICBpc1NlbGVjdGVkLFxuICBvbkRlbGV0ZSxcbiAgb25TZWxlY3QsXG4gIHN0eWxlLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAge1xuICAgICAgICAgIEJldHRlckF2YXRhckJ1YmJsZTogdHJ1ZSxcbiAgICAgICAgICAnQmV0dGVyQXZhdGFyQnViYmxlLS1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yICYmIGBCZXR0ZXJBdmF0YXJCdWJibGUtLSR7Y29sb3J9YFxuICAgICAgKX1cbiAgICAgIG9uS2V5RG93bj17ZXYgPT4ge1xuICAgICAgICBpZiAoZXYua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgb25TZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uQ2xpY2s9e29uU2VsZWN0fVxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICBzdHlsZT17c3R5bGV9XG4gICAgICB0YWJJbmRleD17MH1cbiAgICA+XG4gICAgICB7b25EZWxldGUgJiYgKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignZGVsZXRlJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiQmV0dGVyQXZhdGFyQnViYmxlX19kZWxldGVcIlxuICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFlaEIsTUFBTSxxQkFBcUIsd0JBQUM7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1Q7QUFBQSxNQUNFLG9CQUFvQjtBQUFBLE1BQ3BCLGdDQUFnQztBQUFBLElBQ2xDLEdBQ0EsU0FBUyx1QkFBdUIsT0FDbEM7QUFBQSxJQUNBLFdBQVcsUUFBTTtBQUNmLFVBQUksR0FBRyxRQUFRLFNBQVM7QUFDdEIsaUJBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsTUFBSztBQUFBLElBQ0w7QUFBQSxJQUNBLFVBQVU7QUFBQSxLQUVULFlBQ0MsbURBQUM7QUFBQSxJQUNDLGNBQVksS0FBSyxRQUFRO0FBQUEsSUFDekIsV0FBVTtBQUFBLElBQ1YsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsTUFBSztBQUFBLEdBQ1AsR0FFRCxRQUNIO0FBRUosR0F4Q2tDOyIsCiAgIm5hbWVzIjogW10KfQo=
