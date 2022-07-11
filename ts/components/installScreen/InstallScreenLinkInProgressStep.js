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
var InstallScreenLinkInProgressStep_exports = {};
__export(InstallScreenLinkInProgressStep_exports, {
  InstallScreenLinkInProgressStep: () => InstallScreenLinkInProgressStep
});
module.exports = __toCommonJS(InstallScreenLinkInProgressStep_exports);
var import_react = __toESM(require("react"));
var import_Spinner = require("../Spinner");
var import_TitlebarDragArea = require("../TitlebarDragArea");
var import_InstallScreenSignalLogo = require("./InstallScreenSignalLogo");
const InstallScreenLinkInProgressStep = /* @__PURE__ */ __name(({
  i18n
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-InstallScreenLinkInProgressStep"
}, /* @__PURE__ */ import_react.default.createElement(import_TitlebarDragArea.TitlebarDragArea, null), /* @__PURE__ */ import_react.default.createElement(import_InstallScreenSignalLogo.InstallScreenSignalLogo, null), /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
  size: "50px",
  svgSize: "normal"
}), /* @__PURE__ */ import_react.default.createElement("h1", null, i18n("initialSync")), /* @__PURE__ */ import_react.default.createElement("h2", null, i18n("initialSync__subtitle"))), "InstallScreenLinkInProgressStep");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InstallScreenLinkInProgressStep
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbkxpbmtJblByb2dyZXNzU3RlcC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uL1NwaW5uZXInO1xuaW1wb3J0IHsgVGl0bGViYXJEcmFnQXJlYSB9IGZyb20gJy4uL1RpdGxlYmFyRHJhZ0FyZWEnO1xuaW1wb3J0IHsgSW5zdGFsbFNjcmVlblNpZ25hbExvZ28gfSBmcm9tICcuL0luc3RhbGxTY3JlZW5TaWduYWxMb2dvJztcblxuZXhwb3J0IGNvbnN0IEluc3RhbGxTY3JlZW5MaW5rSW5Qcm9ncmVzc1N0ZXAgPSAoe1xuICBpMThuLFxufTogUmVhZG9ubHk8eyBpMThuOiBMb2NhbGl6ZXJUeXBlIH0+KTogUmVhY3RFbGVtZW50ID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtSW5zdGFsbFNjcmVlbkxpbmtJblByb2dyZXNzU3RlcFwiPlxuICAgIDxUaXRsZWJhckRyYWdBcmVhIC8+XG5cbiAgICA8SW5zdGFsbFNjcmVlblNpZ25hbExvZ28gLz5cblxuICAgIDxTcGlubmVyIHNpemU9XCI1MHB4XCIgc3ZnU2l6ZT1cIm5vcm1hbFwiIC8+XG4gICAgPGgxPntpMThuKCdpbml0aWFsU3luYycpfTwvaDE+XG4gICAgPGgyPntpMThuKCdpbml0aWFsU3luY19fc3VidGl0bGUnKX08L2gyPlxuICA8L2Rpdj5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBSWxCLHFCQUF3QjtBQUN4Qiw4QkFBaUM7QUFDakMscUNBQXdDO0FBRWpDLE1BQU0sa0NBQWtDLHdCQUFDO0FBQUEsRUFDOUM7QUFBQSxNQUVBLG1EQUFDO0FBQUEsRUFBSSxXQUFVO0FBQUEsR0FDYixtREFBQyw4Q0FBaUIsR0FFbEIsbURBQUMsNERBQXdCLEdBRXpCLG1EQUFDO0FBQUEsRUFBUSxNQUFLO0FBQUEsRUFBTyxTQUFRO0FBQUEsQ0FBUyxHQUN0QyxtREFBQyxZQUFJLEtBQUssYUFBYSxDQUFFLEdBQ3pCLG1EQUFDLFlBQUksS0FBSyx1QkFBdUIsQ0FBRSxDQUNyQyxHQVg2QzsiLAogICJuYW1lcyI6IFtdCn0K
