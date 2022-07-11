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
var MessageMeta_exports = {};
__export(MessageMeta_exports, {
  MessageMeta: () => MessageMeta
});
module.exports = __toCommonJS(MessageMeta_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./MessageMeta.scss"));
var import_i18n = require("../util/i18n");
const getItemClass = /* @__PURE__ */ __name(({ kind }) => {
  if (kind === "dark") {
    return styles.dark;
  }
  if (kind === "light") {
    return styles.light;
  }
  return styles.bubble;
}, "getItemClass");
const MessageMeta = React.memo((props) => {
  const i18n = (0, import_i18n.useI18n)();
  const itemClass = getItemClass(props);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.base
  }, /* @__PURE__ */ React.createElement("svg", {
    width: 12,
    height: 12,
    className: itemClass
  }, /* @__PURE__ */ React.createElement("g", {
    fillRule: "evenodd"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M8.5 1.67L9 .804a6 6 0 11-7.919 1.76l.868.504-.008.011L6.25 5.567l-.5.866-4.309-2.488A5 5 0 108.5 1.67z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M6.003 1H6a5.06 5.06 0 00-.5.025V.02A6.08 6.08 0 016 0h.003A6 6 0 0112 6h-1a5 5 0 00-4.997-5zM3.443.572l.502.87a5.06 5.06 0 00-.866.5l-.502-.87a6.08 6.08 0 01.866-.5z"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: itemClass
  }, i18n("minutesAgo", [props.minutesAgo.toString()])), /* @__PURE__ */ React.createElement("svg", {
    width: 18,
    height: 12,
    className: itemClass
  }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("path", {
    d: "M7.917.313a6.99 6.99 0 00-2.844 6.7L5 7.084l-1.795-1.79L2.5 6 5 8.5l.34-.34a7.015 7.015 0 002.577 3.527A6.002 6.002 0 010 6 6.002 6.002 0 017.917.313zM12 0c3.312 0 6 2.688 6 6s-2.688 6-6 6-6-2.688-6-6 2.688-6 6-6zm-1 8.5L15.5 4l-.705-.71L11 7.085l-1.795-1.79L8.5 6 11 8.5z",
    id: "prefix__a"
  }), /* @__PURE__ */ React.createElement("path", {
    id: "prefix__c",
    d: "M0 0h18v12H0z"
  })), /* @__PURE__ */ React.createElement("g", {
    fillRule: "evenodd"
  }, /* @__PURE__ */ React.createElement("mask", {
    id: "prefix__b"
  }, /* @__PURE__ */ React.createElement("use", {
    xlinkHref: "#prefix__a"
  })), /* @__PURE__ */ React.createElement("g", {
    mask: "url(#prefix__b)"
  }, /* @__PURE__ */ React.createElement("use", {
    xlinkHref: "#prefix__c"
  })))));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageMeta
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZU1ldGEudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vTWVzc2FnZU1ldGEuc2Nzcyc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAnLi4vdXRpbC9pMThuJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGtpbmQ/OiAnYnViYmxlJyB8ICdkYXJrJyB8ICdsaWdodCc7XG4gIG1pbnV0ZXNBZ286IG51bWJlcjtcbn07XG5cbmNvbnN0IGdldEl0ZW1DbGFzcyA9ICh7IGtpbmQgfTogUHJvcHMpID0+IHtcbiAgaWYgKGtpbmQgPT09ICdkYXJrJykge1xuICAgIHJldHVybiBzdHlsZXMuZGFyaztcbiAgfVxuXG4gIGlmIChraW5kID09PSAnbGlnaHQnKSB7XG4gICAgcmV0dXJuIHN0eWxlcy5saWdodDtcbiAgfVxuXG4gIHJldHVybiBzdHlsZXMuYnViYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VNZXRhID0gUmVhY3QubWVtbygocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IGkxOG4gPSB1c2VJMThuKCk7XG4gIGNvbnN0IGl0ZW1DbGFzcyA9IGdldEl0ZW1DbGFzcyhwcm9wcyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJhc2V9PlxuICAgICAgPHN2ZyB3aWR0aD17MTJ9IGhlaWdodD17MTJ9IGNsYXNzTmFtZT17aXRlbUNsYXNzfT5cbiAgICAgICAgPGcgZmlsbFJ1bGU9XCJldmVub2RkXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk04LjUgMS42N0w5IC44MDRhNiA2IDAgMTEtNy45MTkgMS43NmwuODY4LjUwNC0uMDA4LjAxMUw2LjI1IDUuNTY3bC0uNS44NjYtNC4zMDktMi40ODhBNSA1IDAgMTA4LjUgMS42N3pcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNi4wMDMgMUg2YTUuMDYgNS4wNiAwIDAwLS41LjAyNVYuMDJBNi4wOCA2LjA4IDAgMDE2IDBoLjAwM0E2IDYgMCAwMTEyIDZoLTFhNSA1IDAgMDAtNC45OTctNXpNMy40NDMuNTcybC41MDIuODdhNS4wNiA1LjA2IDAgMDAtLjg2Ni41bC0uNTAyLS44N2E2LjA4IDYuMDggMCAwMS44NjYtLjV6XCIgLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17aXRlbUNsYXNzfT5cbiAgICAgICAge2kxOG4oJ21pbnV0ZXNBZ28nLCBbcHJvcHMubWludXRlc0Fnby50b1N0cmluZygpXSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzdmcgd2lkdGg9ezE4fSBoZWlnaHQ9ezEyfSBjbGFzc05hbWU9e2l0ZW1DbGFzc30+XG4gICAgICAgIDxkZWZzPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTcuOTE3LjMxM2E2Ljk5IDYuOTkgMCAwMC0yLjg0NCA2LjdMNSA3LjA4NGwtMS43OTUtMS43OUwyLjUgNiA1IDguNWwuMzQtLjM0YTcuMDE1IDcuMDE1IDAgMDAyLjU3NyAzLjUyN0E2LjAwMiA2LjAwMiAwIDAxMCA2IDYuMDAyIDYuMDAyIDAgMDE3LjkxNy4zMTN6TTEyIDBjMy4zMTIgMCA2IDIuNjg4IDYgNnMtMi42ODggNi02IDYtNi0yLjY4OC02LTYgMi42ODgtNiA2LTZ6bS0xIDguNUwxNS41IDRsLS43MDUtLjcxTDExIDcuMDg1bC0xLjc5NS0xLjc5TDguNSA2IDExIDguNXpcIlxuICAgICAgICAgICAgaWQ9XCJwcmVmaXhfX2FcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHBhdGggaWQ9XCJwcmVmaXhfX2NcIiBkPVwiTTAgMGgxOHYxMkgwelwiIC8+XG4gICAgICAgIDwvZGVmcz5cbiAgICAgICAgPGcgZmlsbFJ1bGU9XCJldmVub2RkXCI+XG4gICAgICAgICAgPG1hc2sgaWQ9XCJwcmVmaXhfX2JcIj5cbiAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPVwiI3ByZWZpeF9fYVwiIC8+XG4gICAgICAgICAgPC9tYXNrPlxuICAgICAgICAgIDxnIG1hc2s9XCJ1cmwoI3ByZWZpeF9fYilcIj5cbiAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPVwiI3ByZWZpeF9fY1wiIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICA8L2Rpdj5cbiAgKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLGFBQXdCO0FBQ3hCLGtCQUF3QjtBQU94QixNQUFNLGVBQWUsd0JBQUMsRUFBRSxXQUFrQjtBQUN4QyxNQUFJLFNBQVMsUUFBUTtBQUNuQixXQUFPLE9BQU87QUFBQSxFQUNoQjtBQUVBLE1BQUksU0FBUyxTQUFTO0FBQ3BCLFdBQU8sT0FBTztBQUFBLEVBQ2hCO0FBRUEsU0FBTyxPQUFPO0FBQ2hCLEdBVnFCO0FBWWQsTUFBTSxjQUFjLE1BQU0sS0FBSyxDQUFDLFVBQWlCO0FBQ3RELFFBQU0sT0FBTyx5QkFBUTtBQUNyQixRQUFNLFlBQVksYUFBYSxLQUFLO0FBRXBDLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFBSSxPQUFPO0FBQUEsSUFBSSxRQUFRO0FBQUEsSUFBSSxXQUFXO0FBQUEsS0FDckMsb0NBQUM7QUFBQSxJQUFFLFVBQVM7QUFBQSxLQUNWLG9DQUFDO0FBQUEsSUFBSyxHQUFFO0FBQUEsR0FBMEcsR0FDbEgsb0NBQUM7QUFBQSxJQUFLLEdBQUU7QUFBQSxHQUF5SyxDQUNuTCxDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVc7QUFBQSxLQUNiLEtBQUssY0FBYyxDQUFDLE1BQU0sV0FBVyxTQUFTLENBQUMsQ0FBQyxDQUNuRCxHQUNBLG9DQUFDO0FBQUEsSUFBSSxPQUFPO0FBQUEsSUFBSSxRQUFRO0FBQUEsSUFBSSxXQUFXO0FBQUEsS0FDckMsb0NBQUMsY0FDQyxvQ0FBQztBQUFBLElBQ0MsR0FBRTtBQUFBLElBQ0YsSUFBRztBQUFBLEdBQ0wsR0FDQSxvQ0FBQztBQUFBLElBQUssSUFBRztBQUFBLElBQVksR0FBRTtBQUFBLEdBQWdCLENBQ3pDLEdBQ0Esb0NBQUM7QUFBQSxJQUFFLFVBQVM7QUFBQSxLQUNWLG9DQUFDO0FBQUEsSUFBSyxJQUFHO0FBQUEsS0FDUCxvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEdBQWEsQ0FDOUIsR0FDQSxvQ0FBQztBQUFBLElBQUUsTUFBSztBQUFBLEtBQ04sb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxHQUFhLENBQzlCLENBQ0YsQ0FDRixDQUNGO0FBRUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
