var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dispatchItemsMiddleware_exports = {};
__export(dispatchItemsMiddleware_exports, {
  dispatchItemsMiddleware: () => dispatchItemsMiddleware
});
module.exports = __toCommonJS(dispatchItemsMiddleware_exports);
var import_electron = require("electron");
var import_conversations = require("../state/ducks/conversations");
const dispatchItemsMiddleware = /* @__PURE__ */ __name(({ getState }) => (next) => (action) => {
  const result = next(action);
  if (action.type === "items/PUT" || action.type === "items/PUT_EXTERNAL" || action.type === "items/REMOVE" || action.type === "items/REMOVE_EXTERNAL" || action.type === "items/RESET" || action.type === import_conversations.COLOR_SELECTED || action.type === import_conversations.COLORS_CHANGED) {
    import_electron.ipcRenderer.send("preferences-changed", getState().items);
  }
  return result;
}, "dispatchItemsMiddleware");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dispatchItemsMiddleware
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGlzcGF0Y2hJdGVtc01pZGRsZXdhcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgdHlwZSB7IE1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IENPTE9SU19DSEFOR0VELCBDT0xPUl9TRUxFQ1RFRCB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgZGlzcGF0Y2hJdGVtc01pZGRsZXdhcmU6IE1pZGRsZXdhcmUgPVxuICAoeyBnZXRTdGF0ZSB9KSA9PlxuICBuZXh0ID0+XG4gIGFjdGlvbiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV4dChhY3Rpb24pO1xuICAgIGlmIChcbiAgICAgIGFjdGlvbi50eXBlID09PSAnaXRlbXMvUFVUJyB8fFxuICAgICAgYWN0aW9uLnR5cGUgPT09ICdpdGVtcy9QVVRfRVhURVJOQUwnIHx8XG4gICAgICBhY3Rpb24udHlwZSA9PT0gJ2l0ZW1zL1JFTU9WRScgfHxcbiAgICAgIGFjdGlvbi50eXBlID09PSAnaXRlbXMvUkVNT1ZFX0VYVEVSTkFMJyB8fFxuICAgICAgYWN0aW9uLnR5cGUgPT09ICdpdGVtcy9SRVNFVCcgfHxcbiAgICAgIGFjdGlvbi50eXBlID09PSBDT0xPUl9TRUxFQ1RFRCB8fFxuICAgICAgYWN0aW9uLnR5cGUgPT09IENPTE9SU19DSEFOR0VEXG4gICAgKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdwcmVmZXJlbmNlcy1jaGFuZ2VkJywgZ2V0U3RhdGUoKS5pdGVtcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQTRCO0FBRzVCLDJCQUErQztBQUV4QyxNQUFNLDBCQUNYLHdCQUFDLEVBQUUsZUFDSCxVQUNBLFlBQVU7QUFDUixRQUFNLFNBQVMsS0FBSyxNQUFNO0FBQzFCLE1BQ0UsT0FBTyxTQUFTLGVBQ2hCLE9BQU8sU0FBUyx3QkFDaEIsT0FBTyxTQUFTLGtCQUNoQixPQUFPLFNBQVMsMkJBQ2hCLE9BQU8sU0FBUyxpQkFDaEIsT0FBTyxTQUFTLHVDQUNoQixPQUFPLFNBQVMscUNBQ2hCO0FBQ0EsZ0NBQVksS0FBSyx1QkFBdUIsU0FBUyxFQUFFLEtBQUs7QUFBQSxFQUMxRDtBQUNBLFNBQU87QUFDVCxHQWhCQTsiLAogICJuYW1lcyI6IFtdCn0K
