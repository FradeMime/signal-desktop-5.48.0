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
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var styles = __toESM(require("./Toast.scss"));
const Toast = React.memo(({ children, className, ...rest }) => /* @__PURE__ */ React.createElement("button", {
  type: "button",
  className: (0, import_classnames.default)(styles.base, className),
  ...rest
}, children));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toast
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9Ub2FzdC5zY3NzJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4gJiB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5leHBvcnQgY29uc3QgVG9hc3QgPSBSZWFjdC5tZW1vKCh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfTogUHJvcHMpID0+IChcbiAgPGJ1dHRvblxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhzdHlsZXMuYmFzZSwgY2xhc3NOYW1lKX1cbiAgICB7Li4ucmVzdH1cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9idXR0b24+XG4pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHdCQUF1QjtBQUN2QixhQUF3QjtBQU1qQixNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUMsRUFBRSxVQUFVLGNBQWMsV0FDekQsb0NBQUM7QUFBQSxFQUNDLE1BQUs7QUFBQSxFQUNMLFdBQVcsK0JBQVcsT0FBTyxNQUFNLFNBQVM7QUFBQSxLQUN4QztBQUFBLEdBRUgsUUFDSCxDQUNEOyIsCiAgIm5hbWVzIjogW10KfQo=
