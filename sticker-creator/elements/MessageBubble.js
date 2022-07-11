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
var MessageBubble_exports = {};
__export(MessageBubble_exports, {
  MessageBubble: () => MessageBubble
});
module.exports = __toCommonJS(MessageBubble_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./MessageBubble.scss"));
var import_MessageMeta = require("./MessageMeta");
const MessageBubble = /* @__PURE__ */ __name(({
  children,
  minutesAgo
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.base
  }, children, /* @__PURE__ */ React.createElement(import_MessageMeta.MessageMeta, {
    kind: "bubble",
    minutesAgo
  }));
}, "MessageBubble");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageBubble
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJ1YmJsZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9NZXNzYWdlQnViYmxlLnNjc3MnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBNZXNzYWdlTWV0YVByb3BzIH0gZnJvbSAnLi9NZXNzYWdlTWV0YSc7XG5pbXBvcnQgeyBNZXNzYWdlTWV0YSB9IGZyb20gJy4vTWVzc2FnZU1ldGEnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFBpY2s8TWVzc2FnZU1ldGFQcm9wcywgJ21pbnV0ZXNBZ28nPiAmIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlQnViYmxlOiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICBtaW51dGVzQWdvLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYmFzZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgICA8TWVzc2FnZU1ldGEga2luZD1cImJ1YmJsZVwiIG1pbnV0ZXNBZ289e21pbnV0ZXNBZ299IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLGFBQXdCO0FBRXhCLHlCQUE0QjtBQU1yQixNQUFNLGdCQUE0Qyx3QkFBQztBQUFBLEVBQ3hEO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixTQUNFLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNwQixVQUNELG9DQUFDO0FBQUEsSUFBWSxNQUFLO0FBQUEsSUFBUztBQUFBLEdBQXdCLENBQ3JEO0FBRUosR0FWeUQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
