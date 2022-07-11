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
var BackboneHost_exports = {};
__export(BackboneHost_exports, {
  BackboneHost: () => BackboneHost
});
module.exports = __toCommonJS(BackboneHost_exports);
var import_react = __toESM(require("react"));
const BackboneHost = /* @__PURE__ */ __name(({ View, className }) => {
  const hostRef = (0, import_react.useRef)(null);
  const viewRef = (0, import_react.useRef)(void 0);
  (0, import_react.useEffect)(() => {
    const view = new View({
      el: hostRef.current
    });
    viewRef.current = view;
    return () => {
      if (!viewRef || !viewRef.current) {
        return;
      }
      viewRef.current.remove();
      viewRef.current = void 0;
    };
  }, [View]);
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className,
    ref: hostRef
  }));
}, "BackboneHost");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackboneHost
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFja2JvbmVIb3N0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSAqIGFzIEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIFZpZXc6IHR5cGVvZiBCYWNrYm9uZS5WaWV3O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgQmFja2JvbmVIb3N0ID0gKHsgVmlldywgY2xhc3NOYW1lIH06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaG9zdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB2aWV3UmVmID0gdXNlUmVmPEJhY2tib25lLlZpZXcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB2aWV3ID0gbmV3IFZpZXcoe1xuICAgICAgZWw6IGhvc3RSZWYuY3VycmVudCxcbiAgICB9KTtcblxuICAgIHZpZXdSZWYuY3VycmVudCA9IHZpZXc7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKCF2aWV3UmVmIHx8ICF2aWV3UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2aWV3UmVmLmN1cnJlbnQucmVtb3ZlKCk7XG4gICAgICB2aWV3UmVmLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfSwgW1ZpZXddKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByZWY9e2hvc3RSZWZ9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF5QztBQVFsQyxNQUFNLGVBQWUsd0JBQUMsRUFBRSxNQUFNLGdCQUF3QztBQUMzRSxRQUFNLFVBQVUseUJBQThCLElBQUk7QUFDbEQsUUFBTSxVQUFVLHlCQUFrQyxNQUFTO0FBRTNELDhCQUFVLE1BQU07QUFDZCxVQUFNLE9BQU8sSUFBSSxLQUFLO0FBQUEsTUFDcEIsSUFBSSxRQUFRO0FBQUEsSUFDZCxDQUFDO0FBRUQsWUFBUSxVQUFVO0FBRWxCLFdBQU8sTUFBTTtBQUNYLFVBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxTQUFTO0FBQ2hDO0FBQUEsTUFDRjtBQUVBLGNBQVEsUUFBUSxPQUFPO0FBQ3ZCLGNBQVEsVUFBVTtBQUFBLElBQ3BCO0FBQUEsRUFDRixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsU0FDRSxtREFBQyxhQUNDLG1EQUFDO0FBQUEsSUFBSTtBQUFBLElBQXNCLEtBQUs7QUFBQSxHQUFTLENBQzNDO0FBRUosR0ExQjRCOyIsCiAgIm5hbWVzIjogW10KfQo=
