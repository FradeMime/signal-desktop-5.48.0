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
var app_exports = {};
__export(app_exports, {
  App: () => App
});
module.exports = __toCommonJS(app_exports);
var React = __toESM(require("react"));
var import_react_router_dom = require("react-router-dom");
var import_DropStage = require("./stages/DropStage");
var import_EmojiStage = require("./stages/EmojiStage");
var import_UploadStage = require("./stages/UploadStage");
var import_MetaStage = require("./stages/MetaStage");
var import_ShareStage = require("./stages/ShareStage");
var styles = __toESM(require("./index.scss"));
var import_PageHeader = require("../elements/PageHeader");
var import_i18n = require("../util/i18n");
var import_TitleBarContainer = require("../../ts/components/TitleBarContainer");
var import_useTheme = require("../../ts/hooks/useTheme");
const App = /* @__PURE__ */ __name(({
  platform,
  executeMenuRole,
  isWindows11
}) => {
  const i18n = (0, import_i18n.useI18n)();
  const theme = (0, import_useTheme.useTheme)();
  return /* @__PURE__ */ React.createElement(import_TitleBarContainer.TitleBarContainer, {
    iconSrc: "../../images/icon_32.png",
    platform,
    isWindows11,
    theme,
    executeMenuRole
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement(import_PageHeader.PageHeader, null, i18n("StickerCreator--title")), /* @__PURE__ */ React.createElement(import_react_router_dom.Switch, null, /* @__PURE__ */ React.createElement(import_react_router_dom.Route, {
    path: "/drop"
  }, /* @__PURE__ */ React.createElement(import_DropStage.DropStage, null)), /* @__PURE__ */ React.createElement(import_react_router_dom.Route, {
    path: "/add-emojis"
  }, /* @__PURE__ */ React.createElement(import_EmojiStage.EmojiStage, null)), /* @__PURE__ */ React.createElement(import_react_router_dom.Route, {
    path: "/add-meta"
  }, /* @__PURE__ */ React.createElement(import_MetaStage.MetaStage, null)), /* @__PURE__ */ React.createElement(import_react_router_dom.Route, {
    path: "/upload"
  }, /* @__PURE__ */ React.createElement(import_UploadStage.UploadStage, null)), /* @__PURE__ */ React.createElement(import_react_router_dom.Route, {
    path: "/share"
  }, /* @__PURE__ */ React.createElement(import_ShareStage.ShareStage, null)), /* @__PURE__ */ React.createElement(import_react_router_dom.Redirect, {
    to: "/drop"
  }))));
}, "App");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXgudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVkaXJlY3QsIFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IERyb3BTdGFnZSB9IGZyb20gJy4vc3RhZ2VzL0Ryb3BTdGFnZSc7XG5pbXBvcnQgeyBFbW9qaVN0YWdlIH0gZnJvbSAnLi9zdGFnZXMvRW1vamlTdGFnZSc7XG5pbXBvcnQgeyBVcGxvYWRTdGFnZSB9IGZyb20gJy4vc3RhZ2VzL1VwbG9hZFN0YWdlJztcbmltcG9ydCB7IE1ldGFTdGFnZSB9IGZyb20gJy4vc3RhZ2VzL01ldGFTdGFnZSc7XG5pbXBvcnQgeyBTaGFyZVN0YWdlIH0gZnJvbSAnLi9zdGFnZXMvU2hhcmVTdGFnZSc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9pbmRleC5zY3NzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXIgfSBmcm9tICcuLi9lbGVtZW50cy9QYWdlSGVhZGVyJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi91dGlsL2kxOG4nO1xuaW1wb3J0IHsgVGl0bGVCYXJDb250YWluZXIgfSBmcm9tICcuLi8uLi90cy9jb21wb25lbnRzL1RpdGxlQmFyQ29udGFpbmVyJztcbmltcG9ydCB0eXBlIHsgRXhlY3V0ZU1lbnVSb2xlVHlwZSB9IGZyb20gJy4uLy4uL3RzL2NvbXBvbmVudHMvVGl0bGVCYXJDb250YWluZXInO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICcuLi8uLi90cy9ob29rcy91c2VUaGVtZSc7XG5cbmV4cG9ydCB0eXBlIEFwcFByb3BzVHlwZSA9IFJlYWRvbmx5PHtcbiAgcGxhdGZvcm06IHN0cmluZztcbiAgZXhlY3V0ZU1lbnVSb2xlOiBFeGVjdXRlTWVudVJvbGVUeXBlO1xuICBpc1dpbmRvd3MxMTogYm9vbGVhbjtcbn0+O1xuXG5leHBvcnQgY29uc3QgQXBwID0gKHtcbiAgcGxhdGZvcm0sXG4gIGV4ZWN1dGVNZW51Um9sZSxcbiAgaXNXaW5kb3dzMTEsXG59OiBBcHBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGkxOG4gPSB1c2VJMThuKCk7XG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcblxuICByZXR1cm4gKFxuICAgIDxUaXRsZUJhckNvbnRhaW5lclxuICAgICAgaWNvblNyYz1cIi4uLy4uL2ltYWdlcy9pY29uXzMyLnBuZ1wiXG4gICAgICBwbGF0Zm9ybT17cGxhdGZvcm19XG4gICAgICBpc1dpbmRvd3MxMT17aXNXaW5kb3dzMTF9XG4gICAgICB0aGVtZT17dGhlbWV9XG4gICAgICBleGVjdXRlTWVudVJvbGU9e2V4ZWN1dGVNZW51Um9sZX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgIDxQYWdlSGVhZGVyPntpMThuKCdTdGlja2VyQ3JlYXRvci0tdGl0bGUnKX08L1BhZ2VIZWFkZXI+XG4gICAgICAgIDxTd2l0Y2g+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvZHJvcFwiPlxuICAgICAgICAgICAgPERyb3BTdGFnZSAvPlxuICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRkLWVtb2ppc1wiPlxuICAgICAgICAgICAgPEVtb2ppU3RhZ2UgLz5cbiAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkZC1tZXRhXCI+XG4gICAgICAgICAgICA8TWV0YVN0YWdlIC8+XG4gICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi91cGxvYWRcIj5cbiAgICAgICAgICAgIDxVcGxvYWRTdGFnZSAvPlxuICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvc2hhcmVcIj5cbiAgICAgICAgICAgIDxTaGFyZVN0YWdlIC8+XG4gICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICA8UmVkaXJlY3QgdG89XCIvZHJvcFwiIC8+XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICAgPC9kaXY+XG4gICAgPC9UaXRsZUJhckNvbnRhaW5lcj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsOEJBQXdDO0FBQ3hDLHVCQUEwQjtBQUMxQix3QkFBMkI7QUFDM0IseUJBQTRCO0FBQzVCLHVCQUEwQjtBQUMxQix3QkFBMkI7QUFDM0IsYUFBd0I7QUFDeEIsd0JBQTJCO0FBQzNCLGtCQUF3QjtBQUN4QiwrQkFBa0M7QUFFbEMsc0JBQXlCO0FBUWxCLE1BQU0sTUFBTSx3QkFBQztBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUMrQjtBQUMvQixRQUFNLE9BQU8seUJBQVE7QUFDckIsUUFBTSxRQUFRLDhCQUFTO0FBRXZCLFNBQ0Usb0NBQUM7QUFBQSxJQUNDLFNBQVE7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsS0FFQSxvQ0FBQztBQUFBLElBQUksV0FBVyxPQUFPO0FBQUEsS0FDckIsb0NBQUMsb0NBQVksS0FBSyx1QkFBdUIsQ0FBRSxHQUMzQyxvQ0FBQyxzQ0FDQyxvQ0FBQztBQUFBLElBQU0sTUFBSztBQUFBLEtBQ1Ysb0NBQUMsZ0NBQVUsQ0FDYixHQUNBLG9DQUFDO0FBQUEsSUFBTSxNQUFLO0FBQUEsS0FDVixvQ0FBQyxrQ0FBVyxDQUNkLEdBQ0Esb0NBQUM7QUFBQSxJQUFNLE1BQUs7QUFBQSxLQUNWLG9DQUFDLGdDQUFVLENBQ2IsR0FDQSxvQ0FBQztBQUFBLElBQU0sTUFBSztBQUFBLEtBQ1Ysb0NBQUMsb0NBQVksQ0FDZixHQUNBLG9DQUFDO0FBQUEsSUFBTSxNQUFLO0FBQUEsS0FDVixvQ0FBQyxrQ0FBVyxDQUNkLEdBQ0Esb0NBQUM7QUFBQSxJQUFTLElBQUc7QUFBQSxHQUFRLENBQ3ZCLENBQ0YsQ0FDRjtBQUVKLEdBdkNtQjsiLAogICJuYW1lcyI6IFtdCn0K
