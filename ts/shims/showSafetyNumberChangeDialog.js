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
var showSafetyNumberChangeDialog_exports = {};
__export(showSafetyNumberChangeDialog_exports, {
  showSafetyNumberChangeDialog: () => showSafetyNumberChangeDialog
});
module.exports = __toCommonJS(showSafetyNumberChangeDialog_exports);
var import_react = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_SafetyNumberChangeDialog = require("../components/SafetyNumberChangeDialog");
var import_badges = require("../state/selectors/badges");
var import_user = require("../state/selectors/user");
let dialogContainerNode;
function removeDialog() {
  if (!dialogContainerNode) {
    return;
  }
  (0, import_react_dom.unmountComponentAtNode)(dialogContainerNode);
  document.body.removeChild(dialogContainerNode);
  dialogContainerNode = void 0;
}
function showSafetyNumberChangeDialog(options) {
  if (dialogContainerNode) {
    removeDialog();
  }
  dialogContainerNode = document.createElement("div");
  document.body.appendChild(dialogContainerNode);
  const reduxState = window.reduxStore.getState();
  const getPreferredBadge = (0, import_badges.getPreferredBadgeSelector)(reduxState);
  const theme = (0, import_user.getTheme)(reduxState);
  (0, import_react_dom.render)(/* @__PURE__ */ import_react.default.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
    confirmText: options.confirmText,
    contacts: options.contacts.map((contact) => contact.format()),
    getPreferredBadge,
    i18n: window.i18n,
    onCancel: () => {
      options.reject();
      removeDialog();
    },
    onConfirm: () => {
      options.resolve();
      removeDialog();
    },
    renderSafetyNumber: (props) => {
      return window.Signal.State.Roots.createSafetyNumberViewer(window.reduxStore, props);
    },
    theme
  }), dialogContainerNode);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  showSafetyNumberChangeDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvd1NhZmV0eU51bWJlckNoYW5nZURpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLy8gVGhpcyBmaWxlIGlzIGhlcmUgdGVtcG9yYXJpbHkgd2hpbGUgd2UncmUgc3dpdGNoaW5nIG9mZiBvZiBCYWNrYm9uZSBpbnRvXG4vLyBSZWFjdC4gSW4gdGhlIGZ1dHVyZSwgYW5kIGluIFJlYWN0LWxhbmQsIHBsZWFzZSBqdXN0IGltcG9ydCBhbmQgdXNlXG4vLyB0aGUgY29tcG9uZW50IGRpcmVjdGx5LiBUaGlzIGlzIHRoZSB0aGluIEFQSSBsYXllciB0byBicmlkZ2UgdGhlIGdhcFxuLy8gd2hpbGUgd2UgY29udmVydCB0aGluZ3Mgb3Zlci4gUGxlYXNlIGRlbGV0ZSB0aGlzIGZpbGUgb25jZSBhbGwgdXNhZ2VzIGFyZVxuLy8gcG9ydGVkIG92ZXIuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1bm1vdW50Q29tcG9uZW50QXROb2RlLCByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IFNhZmV0eU51bWJlckNoYW5nZURpYWxvZyB9IGZyb20gJy4uL2NvbXBvbmVudHMvU2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nJztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IGdldFRoZW1lIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL3VzZXInO1xuXG5leHBvcnQgdHlwZSBTYWZldHlOdW1iZXJDaGFuZ2VWaWV3UHJvcHMgPSB7XG4gIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICBjb250YWN0czogQXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+O1xuICByZWplY3Q6ICgpID0+IHZvaWQ7XG4gIHJlc29sdmU6ICgpID0+IHZvaWQ7XG59O1xuXG5sZXQgZGlhbG9nQ29udGFpbmVyTm9kZTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHJlbW92ZURpYWxvZygpIHtcbiAgaWYgKCFkaWFsb2dDb250YWluZXJOb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdW5tb3VudENvbXBvbmVudEF0Tm9kZShkaWFsb2dDb250YWluZXJOb2RlKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkaWFsb2dDb250YWluZXJOb2RlKTtcblxuICBkaWFsb2dDb250YWluZXJOb2RlID0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NhZmV0eU51bWJlckNoYW5nZURpYWxvZyhcbiAgb3B0aW9uczogU2FmZXR5TnVtYmVyQ2hhbmdlVmlld1Byb3BzXG4pOiB2b2lkIHtcbiAgaWYgKGRpYWxvZ0NvbnRhaW5lck5vZGUpIHtcbiAgICByZW1vdmVEaWFsb2coKTtcbiAgfVxuXG4gIGRpYWxvZ0NvbnRhaW5lck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaWFsb2dDb250YWluZXJOb2RlKTtcblxuICBjb25zdCByZWR1eFN0YXRlID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcbiAgY29uc3QgZ2V0UHJlZmVycmVkQmFkZ2UgPSBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yKHJlZHV4U3RhdGUpO1xuICBjb25zdCB0aGVtZSA9IGdldFRoZW1lKHJlZHV4U3RhdGUpO1xuXG4gIHJlbmRlcihcbiAgICA8U2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nXG4gICAgICBjb25maXJtVGV4dD17b3B0aW9ucy5jb25maXJtVGV4dH1cbiAgICAgIGNvbnRhY3RzPXtvcHRpb25zLmNvbnRhY3RzLm1hcChjb250YWN0ID0+IGNvbnRhY3QuZm9ybWF0KCkpfVxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgaTE4bj17d2luZG93LmkxOG59XG4gICAgICBvbkNhbmNlbD17KCkgPT4ge1xuICAgICAgICBvcHRpb25zLnJlamVjdCgpO1xuICAgICAgICByZW1vdmVEaWFsb2coKTtcbiAgICAgIH19XG4gICAgICBvbkNvbmZpcm09eygpID0+IHtcbiAgICAgICAgb3B0aW9ucy5yZXNvbHZlKCk7XG4gICAgICAgIHJlbW92ZURpYWxvZygpO1xuICAgICAgfX1cbiAgICAgIHJlbmRlclNhZmV0eU51bWJlcj17cHJvcHMgPT4ge1xuICAgICAgICByZXR1cm4gd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVTYWZldHlOdW1iZXJWaWV3ZXIoXG4gICAgICAgICAgd2luZG93LnJlZHV4U3RvcmUsXG4gICAgICAgICAgcHJvcHNcbiAgICAgICAgKTtcbiAgICAgIH19XG4gICAgICB0aGVtZT17dGhlbWV9XG4gICAgLz4sXG4gICAgZGlhbG9nQ29udGFpbmVyTm9kZVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLG1CQUFrQjtBQUNsQix1QkFBK0M7QUFFL0Msc0NBQXlDO0FBQ3pDLG9CQUEwQztBQUMxQyxrQkFBeUI7QUFTekIsSUFBSTtBQUVKLHdCQUF3QjtBQUN0QixNQUFJLENBQUMscUJBQXFCO0FBQ3hCO0FBQUEsRUFDRjtBQUVBLCtDQUF1QixtQkFBbUI7QUFDMUMsV0FBUyxLQUFLLFlBQVksbUJBQW1CO0FBRTdDLHdCQUFzQjtBQUN4QjtBQVRTLEFBV0Ysc0NBQ0wsU0FDTTtBQUNOLE1BQUkscUJBQXFCO0FBQ3ZCLGlCQUFhO0FBQUEsRUFDZjtBQUVBLHdCQUFzQixTQUFTLGNBQWMsS0FBSztBQUNsRCxXQUFTLEtBQUssWUFBWSxtQkFBbUI7QUFFN0MsUUFBTSxhQUFhLE9BQU8sV0FBVyxTQUFTO0FBQzlDLFFBQU0sb0JBQW9CLDZDQUEwQixVQUFVO0FBQzlELFFBQU0sUUFBUSwwQkFBUyxVQUFVO0FBRWpDLCtCQUNFLG1EQUFDO0FBQUEsSUFDQyxhQUFhLFFBQVE7QUFBQSxJQUNyQixVQUFVLFFBQVEsU0FBUyxJQUFJLGFBQVcsUUFBUSxPQUFPLENBQUM7QUFBQSxJQUMxRDtBQUFBLElBQ0EsTUFBTSxPQUFPO0FBQUEsSUFDYixVQUFVLE1BQU07QUFDZCxjQUFRLE9BQU87QUFDZixtQkFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFdBQVcsTUFBTTtBQUNmLGNBQVEsUUFBUTtBQUNoQixtQkFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBLG9CQUFvQixXQUFTO0FBQzNCLGFBQU8sT0FBTyxPQUFPLE1BQU0sTUFBTSx5QkFDL0IsT0FBTyxZQUNQLEtBQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLEdBQ0YsR0FDQSxtQkFDRjtBQUNGO0FBdENnQiIsCiAgIm5hbWVzIjogW10KfQo=
