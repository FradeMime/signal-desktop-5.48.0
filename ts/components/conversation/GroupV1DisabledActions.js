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
var GroupV1DisabledActions_exports = {};
__export(GroupV1DisabledActions_exports, {
  GroupV1DisabledActions: () => GroupV1DisabledActions
});
module.exports = __toCommonJS(GroupV1DisabledActions_exports);
var React = __toESM(require("react"));
var import_Intl = require("../Intl");
const GroupV1DisabledActions = /* @__PURE__ */ __name(({
  i18n,
  onStartGroupMigration
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v1-disabled-actions"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "module-group-v1-disabled-actions__message"
  }, /* @__PURE__ */ React.createElement(import_Intl.Intl, {
    i18n,
    id: "GroupV1--Migration--disabled",
    components: {
      learnMore: /* @__PURE__ */ React.createElement("a", {
        href: "https://support.signal.org/hc/articles/360007319331",
        target: "_blank",
        rel: "noreferrer",
        className: "module-group-v1-disabled-actions__message__learn-more"
      }, i18n("MessageRequests--learn-more"))
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v1-disabled-actions__buttons"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: onStartGroupMigration,
    tabIndex: 0,
    className: "module-group-v1-disabled-actions__buttons__button"
  }, i18n("MessageRequests--continue"))));
}, "GroupV1DisabledActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV1DisabledActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMURpc2FibGVkQWN0aW9ucy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25TdGFydEdyb3VwTWlncmF0aW9uOiAoKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwVjFEaXNhYmxlZEFjdGlvbnMgPSAoe1xuICBpMThuLFxuICBvblN0YXJ0R3JvdXBNaWdyYXRpb24sXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtdjEtZGlzYWJsZWQtYWN0aW9uc1wiPlxuICAgICAgPHAgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYxLWRpc2FibGVkLWFjdGlvbnNfX21lc3NhZ2VcIj5cbiAgICAgICAgPEludGxcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlkPVwiR3JvdXBWMS0tTWlncmF0aW9uLS1kaXNhYmxlZFwiXG4gICAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgICAgbGVhcm5Nb3JlOiAoXG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjL2FydGljbGVzLzM2MDAwNzMxOTMzMVwiXG4gICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtdjEtZGlzYWJsZWQtYWN0aW9uc19fbWVzc2FnZV9fbGVhcm4tbW9yZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aTE4bignTWVzc2FnZVJlcXVlc3RzLS1sZWFybi1tb3JlJyl9XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICksXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvcD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYxLWRpc2FibGVkLWFjdGlvbnNfX2J1dHRvbnNcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e29uU3RhcnRHcm91cE1pZ3JhdGlvbn1cbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtdjEtZGlzYWJsZWQtYWN0aW9uc19fYnV0dG9uc19fYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWNvbnRpbnVlJyl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLGtCQUFxQjtBQVFkLE1BQU0seUJBQXlCLHdCQUFDO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsU0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUFFLFdBQVU7QUFBQSxLQUNYLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsSUFBRztBQUFBLElBQ0gsWUFBWTtBQUFBLE1BQ1YsV0FDRSxvQ0FBQztBQUFBLFFBQ0MsTUFBSztBQUFBLFFBQ0wsUUFBTztBQUFBLFFBQ1AsS0FBSTtBQUFBLFFBQ0osV0FBVTtBQUFBLFNBRVQsS0FBSyw2QkFBNkIsQ0FDckM7QUFBQSxJQUVKO0FBQUEsR0FDRixDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixXQUFVO0FBQUEsS0FFVCxLQUFLLDJCQUEyQixDQUNuQyxDQUNGLENBQ0Y7QUFFSixHQXBDc0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
