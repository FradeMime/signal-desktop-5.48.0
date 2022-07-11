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
var Typography_exports = {};
__export(Typography_exports, {
  H1: () => H1,
  H2: () => H2,
  Inline: () => Inline,
  Text: () => Text
});
module.exports = __toCommonJS(Typography_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var styles = __toESM(require("./Typography.scss"));
const H1 = React.memo(({ children, className, ...rest }) => /* @__PURE__ */ React.createElement("h1", {
  className: (0, import_classnames.default)(styles.h1, className),
  ...rest
}, children));
const H2 = React.memo(({ children, className, ...rest }) => /* @__PURE__ */ React.createElement("h2", {
  className: (0, import_classnames.default)(styles.h2, className),
  ...rest
}, children));
const Text = React.memo(({
  children,
  className,
  center,
  secondary,
  ...rest
}) => /* @__PURE__ */ React.createElement("p", {
  className: (0, import_classnames.default)(center ? styles.textCenter : styles.text, secondary ? styles.secondary : null, className),
  ...rest
}, children));
const Inline = React.memo(({ children, className, ...rest }) => /* @__PURE__ */ React.createElement("span", {
  className: (0, import_classnames.default)(styles.text, className),
  ...rest
}, children));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  H1,
  H2,
  Inline,
  Text
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwb2dyYXBoeS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vVHlwb2dyYXBoeS5zY3NzJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5leHBvcnQgdHlwZSBIZWFkaW5nUHJvcHMgPSBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MSGVhZGluZ0VsZW1lbnQ+O1xuZXhwb3J0IHR5cGUgUGFyYWdyYXBoUHJvcHMgPSBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MUGFyYWdyYXBoRWxlbWVudD4gJiB7XG4gIGNlbnRlcj86IGJvb2xlYW47XG4gIHdpZGU/OiBib29sZWFuO1xuICBzZWNvbmRhcnk/OiBib29sZWFuO1xufTtcbmV4cG9ydCB0eXBlIFNwYW5Qcm9wcyA9IFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxTcGFuRWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBIMSA9IFJlYWN0Lm1lbW8oXG4gICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfTogUHJvcHMgJiBIZWFkaW5nUHJvcHMpID0+IChcbiAgICA8aDEgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHN0eWxlcy5oMSwgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvaDE+XG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBIMiA9IFJlYWN0Lm1lbW8oXG4gICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfTogUHJvcHMgJiBIZWFkaW5nUHJvcHMpID0+IChcbiAgICA8aDIgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHN0eWxlcy5oMiwgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvaDI+XG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBjaGlsZHJlbixcbiAgICBjbGFzc05hbWUsXG4gICAgY2VudGVyLFxuICAgIHNlY29uZGFyeSxcbiAgICAuLi5yZXN0XG4gIH06IFByb3BzICYgUGFyYWdyYXBoUHJvcHMpID0+IChcbiAgICA8cFxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICBjZW50ZXIgPyBzdHlsZXMudGV4dENlbnRlciA6IHN0eWxlcy50ZXh0LFxuICAgICAgICBzZWNvbmRhcnkgPyBzdHlsZXMuc2Vjb25kYXJ5IDogbnVsbCxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvcD5cbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IElubGluZSA9IFJlYWN0Lm1lbW8oXG4gICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfTogUHJvcHMgJiBTcGFuUHJvcHMpID0+IChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoc3R5bGVzLnRleHQsIGNsYXNzTmFtZSl9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3NwYW4+XG4gIClcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix3QkFBdUI7QUFFdkIsYUFBd0I7QUFjakIsTUFBTSxLQUFLLE1BQU0sS0FDdEIsQ0FBQyxFQUFFLFVBQVUsY0FBYyxXQUN6QixvQ0FBQztBQUFBLEVBQUcsV0FBVywrQkFBVyxPQUFPLElBQUksU0FBUztBQUFBLEtBQU87QUFBQSxHQUNsRCxRQUNILENBRUo7QUFFTyxNQUFNLEtBQUssTUFBTSxLQUN0QixDQUFDLEVBQUUsVUFBVSxjQUFjLFdBQ3pCLG9DQUFDO0FBQUEsRUFBRyxXQUFXLCtCQUFXLE9BQU8sSUFBSSxTQUFTO0FBQUEsS0FBTztBQUFBLEdBQ2xELFFBQ0gsQ0FFSjtBQUVPLE1BQU0sT0FBTyxNQUFNLEtBQ3hCLENBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsS0FDRztBQUFBLE1BRUgsb0NBQUM7QUFBQSxFQUNDLFdBQVcsK0JBQ1QsU0FBUyxPQUFPLGFBQWEsT0FBTyxNQUNwQyxZQUFZLE9BQU8sWUFBWSxNQUMvQixTQUNGO0FBQUEsS0FDSTtBQUFBLEdBRUgsUUFDSCxDQUVKO0FBRU8sTUFBTSxTQUFTLE1BQU0sS0FDMUIsQ0FBQyxFQUFFLFVBQVUsY0FBYyxXQUN6QixvQ0FBQztBQUFBLEVBQUssV0FBVywrQkFBVyxPQUFPLE1BQU0sU0FBUztBQUFBLEtBQU87QUFBQSxHQUN0RCxRQUNILENBRUo7IiwKICAibmFtZXMiOiBbXQp9Cg==
