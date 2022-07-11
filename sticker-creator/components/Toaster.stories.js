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
var Toaster_stories_exports = {};
__export(Toaster_stories_exports, {
  _Toaster: () => _Toaster,
  default: () => Toaster_stories_default
});
module.exports = __toCommonJS(Toaster_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("../elements/StoryRow");
var import_Toaster = require("./Toaster");
var Toaster_stories_default = {
  title: "Sticker Creator/components"
};
const _Toaster = /* @__PURE__ */ __name(() => {
  const inputText = (0, import_addon_knobs.text)("Slices", ["error 1", "error 2"].join("|"));
  const initialState = React.useMemo(() => inputText.split("|"), [inputText]);
  const [state, setState] = React.useState(initialState);
  const handleDismiss = React.useCallback((0, import_lodash.debounce)(() => {
    setState(import_lodash.dropRight);
  }, 10), [setState]);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_Toaster.Toaster, {
    loaf: state.map((text, id) => ({ id, text })),
    onDismiss: handleDismiss
  }));
}, "_Toaster");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _Toaster
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3Rlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgZHJvcFJpZ2h0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHRleHQgYXMgdGV4dEtub2IgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgU3RvcnlSb3cgfSBmcm9tICcuLi9lbGVtZW50cy9TdG9yeVJvdyc7XG5pbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSAnLi9Ub2FzdGVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ1N0aWNrZXIgQ3JlYXRvci9jb21wb25lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfVG9hc3RlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGlucHV0VGV4dCA9IHRleHRLbm9iKCdTbGljZXMnLCBbJ2Vycm9yIDEnLCAnZXJyb3IgMiddLmpvaW4oJ3wnKSk7XG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gaW5wdXRUZXh0LnNwbGl0KCd8JyksIFtpbnB1dFRleHRdKTtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZShpbml0aWFsU3RhdGUpO1xuXG4gIC8vIFRPRE8gbm90IHN1cmUgaG93IHRvIGZpeCB0aGlzXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgY29uc3QgaGFuZGxlRGlzbWlzcyA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIC8vIERlYm91bmNlIGlzIHJlcXVpcmVkIGhlcmUgc2luY2UgYXV0by1kaXNtaXNzIGlzIGFzeW5jaHJvbm91c2x5IGNhbGxlZFxuICAgIC8vIGZyb20gbXVsdGlwbGUgcmVuZGVyZWQgaW5zdGFuY2VzIChtdWx0aXBsZSB0aGVtZXMpXG4gICAgZGVib3VuY2UoKCkgPT4ge1xuICAgICAgc2V0U3RhdGUoZHJvcFJpZ2h0KTtcbiAgICB9LCAxMCksXG4gICAgW3NldFN0YXRlXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFN0b3J5Um93PlxuICAgICAgPFRvYXN0ZXJcbiAgICAgICAgbG9hZj17c3RhdGUubWFwKCh0ZXh0LCBpZCkgPT4gKHsgaWQsIHRleHQgfSkpfVxuICAgICAgICBvbkRpc21pc3M9e2hhbmRsZURpc21pc3N9XG4gICAgICAvPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsb0JBQW9DO0FBQ3BDLHlCQUFpQztBQUVqQyxzQkFBeUI7QUFDekIscUJBQXdCO0FBRXhCLElBQU8sMEJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sV0FBVyw2QkFBbUI7QUFDekMsUUFBTSxZQUFZLDZCQUFTLFVBQVUsQ0FBQyxXQUFXLFNBQVMsRUFBRSxLQUFLLEdBQUcsQ0FBQztBQUNyRSxRQUFNLGVBQWUsTUFBTSxRQUFRLE1BQU0sVUFBVSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUMxRSxRQUFNLENBQUMsT0FBTyxZQUFZLE1BQU0sU0FBUyxZQUFZO0FBSXJELFFBQU0sZ0JBQWdCLE1BQU0sWUFHMUIsNEJBQVMsTUFBTTtBQUNiLGFBQVMsdUJBQVM7QUFBQSxFQUNwQixHQUFHLEVBQUUsR0FDTCxDQUFDLFFBQVEsQ0FDWDtBQUVBLFNBQ0Usb0NBQUMsZ0NBQ0Msb0NBQUM7QUFBQSxJQUNDLE1BQU0sTUFBTSxJQUFJLENBQUMsTUFBTSxPQUFRLEdBQUUsSUFBSSxLQUFLLEVBQUU7QUFBQSxJQUM1QyxXQUFXO0FBQUEsR0FDYixDQUNGO0FBRUosR0F4QndCOyIsCiAgIm5hbWVzIjogW10KfQo=
