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
var util_exports = {};
__export(util_exports, {
  WidthBreakpoint: () => WidthBreakpoint,
  cleanId: () => cleanId,
  getConversationListWidthBreakpoint: () => getConversationListWidthBreakpoint
});
module.exports = __toCommonJS(util_exports);
function cleanId(id) {
  return id.replace(/[^\u0020-\u007e\u00a0-\u00ff]/g, "_");
}
var WidthBreakpoint = /* @__PURE__ */ ((WidthBreakpoint2) => {
  WidthBreakpoint2["Wide"] = "wide";
  WidthBreakpoint2["Medium"] = "medium";
  WidthBreakpoint2["Narrow"] = "narrow";
  return WidthBreakpoint2;
})(WidthBreakpoint || {});
const getConversationListWidthBreakpoint = /* @__PURE__ */ __name((width) => width >= 150 ? "wide" /* Wide */ : "narrow" /* Narrow */, "getConversationListWidthBreakpoint");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WidthBreakpoint,
  cleanId,
  getConversationListWidthBreakpoint
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiX3V0aWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5JZChpZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlkLnJlcGxhY2UoL1teXFx1MDAyMC1cXHUwMDdlXFx1MDBhMC1cXHUwMGZmXS9nLCAnXycpO1xufVxuXG5leHBvcnQgZW51bSBXaWR0aEJyZWFrcG9pbnQge1xuICBXaWRlID0gJ3dpZGUnLFxuICBNZWRpdW0gPSAnbWVkaXVtJyxcbiAgTmFycm93ID0gJ25hcnJvdycsXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25MaXN0V2lkdGhCcmVha3BvaW50ID0gKFxuICB3aWR0aDogbnVtYmVyXG4pOiBXaWR0aEJyZWFrcG9pbnQgPT5cbiAgd2lkdGggPj0gMTUwID8gV2lkdGhCcmVha3BvaW50LldpZGUgOiBXaWR0aEJyZWFrcG9pbnQuTmFycm93O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyxpQkFBaUIsSUFBb0I7QUFDMUMsU0FBTyxHQUFHLFFBQVEsa0NBQWtDLEdBQUc7QUFDekQ7QUFGZ0IsQUFJVCxJQUFLLGtCQUFMLGtCQUFLLHFCQUFMO0FBQ0wsNkJBQU87QUFDUCwrQkFBUztBQUNULCtCQUFTO0FBSEM7QUFBQTtBQU1MLE1BQU0scUNBQXFDLHdCQUNoRCxVQUVBLFNBQVMsTUFBTSxvQkFBdUIsdUJBSFU7IiwKICAibmFtZXMiOiBbXQp9Cg==
