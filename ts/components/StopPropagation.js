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
var StopPropagation_exports = {};
__export(StopPropagation_exports, {
  StopPropagation: () => StopPropagation
});
module.exports = __toCommonJS(StopPropagation_exports);
var import_react = __toESM(require("react"));
const StopPropagation = /* @__PURE__ */ __name(({
  children,
  className
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className,
  onClick: (ev) => ev.stopPropagation(),
  onKeyDown: (ev) => ev.stopPropagation()
}, children), "StopPropagation");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StopPropagation
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcFByb3BhZ2F0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLy8gV2hlbmV2ZXIgeW91IGRvbid0IHdhbnQgY2xpY2sgb3Iga2V5IGV2ZW50cyB0byBwcm9wYWdhdGUgaW50byB0aGVpciBwYXJlbnQgY29udGFpbmVyXG5leHBvcnQgY29uc3QgU3RvcFByb3BhZ2F0aW9uID0gKHtcbiAgY2hpbGRyZW4sXG4gIGNsYXNzTmFtZSxcbn06IHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xufSk6IEpTWC5FbGVtZW50ID0+IChcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9uc1xuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgb25DbGljaz17ZXYgPT4gZXYuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgb25LZXlEb3duPXtldiA9PiBldi5zdG9wUHJvcGFnYXRpb24oKX1cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUdYLE1BQU0sa0JBQWtCLHdCQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsTUFNQSxtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLFNBQVMsUUFBTSxHQUFHLGdCQUFnQjtBQUFBLEVBQ2xDLFdBQVcsUUFBTSxHQUFHLGdCQUFnQjtBQUFBLEdBRW5DLFFBQ0gsR0FkNkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
