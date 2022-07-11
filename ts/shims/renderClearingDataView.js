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
var renderClearingDataView_exports = {};
__export(renderClearingDataView_exports, {
  renderClearingDataView: () => renderClearingDataView
});
module.exports = __toCommonJS(renderClearingDataView_exports);
var import_react = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_ClearingData = require("../components/ClearingData");
var import_deleteAllData = require("./deleteAllData");
function renderClearingDataView() {
  (0, import_react_dom.render)(/* @__PURE__ */ import_react.default.createElement(import_ClearingData.ClearingData, {
    deleteAllData: import_deleteAllData.deleteAllData,
    i18n: window.i18n
  }), document.getElementById("app-container"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderClearingDataView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVuZGVyQ2xlYXJpbmdEYXRhVmlldy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCB7IENsZWFyaW5nRGF0YSB9IGZyb20gJy4uL2NvbXBvbmVudHMvQ2xlYXJpbmdEYXRhJztcbmltcG9ydCB7IGRlbGV0ZUFsbERhdGEgfSBmcm9tICcuL2RlbGV0ZUFsbERhdGEnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ2xlYXJpbmdEYXRhVmlldygpOiB2b2lkIHtcbiAgcmVuZGVyKFxuICAgIDxDbGVhcmluZ0RhdGEgZGVsZXRlQWxsRGF0YT17ZGVsZXRlQWxsRGF0YX0gaTE4bj17d2luZG93LmkxOG59IC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAtY29udGFpbmVyJylcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsdUJBQXVCO0FBRXZCLDBCQUE2QjtBQUM3QiwyQkFBOEI7QUFFdkIsa0NBQXdDO0FBQzdDLCtCQUNFLG1EQUFDO0FBQUEsSUFBYSxlQUFlO0FBQUEsSUFBZSxNQUFNLE9BQU87QUFBQSxHQUFNLEdBQy9ELFNBQVMsZUFBZSxlQUFlLENBQ3pDO0FBQ0Y7QUFMZ0IiLAogICJuYW1lcyI6IFtdCn0K
