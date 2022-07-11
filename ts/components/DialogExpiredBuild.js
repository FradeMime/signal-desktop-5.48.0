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
var DialogExpiredBuild_exports = {};
__export(DialogExpiredBuild_exports, {
  DialogExpiredBuild: () => DialogExpiredBuild
});
module.exports = __toCommonJS(DialogExpiredBuild_exports);
var import_react = __toESM(require("react"));
var import_LeftPaneDialog = require("./LeftPaneDialog");
var import_openLinkInWebBrowser = require("../util/openLinkInWebBrowser");
const DialogExpiredBuild = /* @__PURE__ */ __name(({
  containerWidthBreakpoint,
  hasExpired,
  i18n
}) => {
  if (!hasExpired) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
    containerWidthBreakpoint,
    type: "error",
    onClick: () => {
      (0, import_openLinkInWebBrowser.openLinkInWebBrowser)("https://signal.org/download/");
    },
    clickLabel: i18n("upgrade"),
    hasAction: true
  }, i18n("expiredWarning"), " ");
}, "DialogExpiredBuild");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DialogExpiredBuild
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nRXhwaXJlZEJ1aWxkLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuL191dGlsJztcblxuaW1wb3J0IHsgTGVmdFBhbmVEaWFsb2cgfSBmcm9tICcuL0xlZnRQYW5lRGlhbG9nJztcbmltcG9ydCB7IG9wZW5MaW5rSW5XZWJCcm93c2VyIH0gZnJvbSAnLi4vdXRpbC9vcGVuTGlua0luV2ViQnJvd3Nlcic7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludDtcbiAgaGFzRXhwaXJlZDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBEaWFsb2dFeHBpcmVkQnVpbGQgPSAoe1xuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQsXG4gIGhhc0V4cGlyZWQsXG4gIGkxOG4sXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCB8IG51bGwgPT4ge1xuICBpZiAoIWhhc0V4cGlyZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPExlZnRQYW5lRGlhbG9nXG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e2NvbnRhaW5lcldpZHRoQnJlYWtwb2ludH1cbiAgICAgIHR5cGU9XCJlcnJvclwiXG4gICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgIG9wZW5MaW5rSW5XZWJCcm93c2VyKCdodHRwczovL3NpZ25hbC5vcmcvZG93bmxvYWQvJyk7XG4gICAgICB9fVxuICAgICAgY2xpY2tMYWJlbD17aTE4bigndXBncmFkZScpfVxuICAgICAgaGFzQWN0aW9uXG4gICAgPlxuICAgICAge2kxOG4oJ2V4cGlyZWRXYXJuaW5nJyl9eycgJ31cbiAgICA8L0xlZnRQYW5lRGlhbG9nPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFLbEIsNEJBQStCO0FBQy9CLGtDQUFxQztBQVE5QixNQUFNLHFCQUFxQix3QkFBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNtQztBQUNuQyxNQUFJLENBQUMsWUFBWTtBQUNmLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLE1BQUs7QUFBQSxJQUNMLFNBQVMsTUFBTTtBQUNiLDREQUFxQiw4QkFBOEI7QUFBQSxJQUNyRDtBQUFBLElBQ0EsWUFBWSxLQUFLLFNBQVM7QUFBQSxJQUMxQixXQUFTO0FBQUEsS0FFUixLQUFLLGdCQUFnQixHQUFHLEdBQzNCO0FBRUosR0F0QmtDOyIsCiAgIm5hbWVzIjogW10KfQo=
