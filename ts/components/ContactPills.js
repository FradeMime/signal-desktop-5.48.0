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
var ContactPills_exports = {};
__export(ContactPills_exports, {
  ContactPills: () => ContactPills
});
module.exports = __toCommonJS(ContactPills_exports);
var import_react = __toESM(require("react"));
var import_usePrevious = require("../hooks/usePrevious");
var import_scrollUtil = require("../util/scrollUtil");
const ContactPills = /* @__PURE__ */ __name(({ children }) => {
  const elRef = (0, import_react.useRef)(null);
  const childCount = import_react.Children.count(children);
  const previousChildCount = (0, import_usePrevious.usePrevious)(0, childCount);
  (0, import_react.useEffect)(() => {
    const hasAddedNewChild = childCount > previousChildCount;
    const el = elRef.current;
    if (hasAddedNewChild && el) {
      (0, import_scrollUtil.scrollToBottom)(el);
    }
  }, [childCount, previousChildCount]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ContactPills",
    ref: elRef
  }, children);
}, "ContactPills");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactPills
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFBpbGxzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCwgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVByZXZpb3VzIH0gZnJvbSAnLi4vaG9va3MvdXNlUHJldmlvdXMnO1xuaW1wb3J0IHsgc2Nyb2xsVG9Cb3R0b20gfSBmcm9tICcuLi91dGlsL3Njcm9sbFV0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG59O1xuXG5leHBvcnQgY29uc3QgQ29udGFjdFBpbGxzOiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBlbFJlZiA9IHVzZVJlZjxudWxsIHwgSFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IGNoaWxkQ291bnQgPSBDaGlsZHJlbi5jb3VudChjaGlsZHJlbik7XG4gIGNvbnN0IHByZXZpb3VzQ2hpbGRDb3VudCA9IHVzZVByZXZpb3VzKDAsIGNoaWxkQ291bnQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFzQWRkZWROZXdDaGlsZCA9IGNoaWxkQ291bnQgPiBwcmV2aW91c0NoaWxkQ291bnQ7XG4gICAgY29uc3QgZWwgPSBlbFJlZi5jdXJyZW50O1xuICAgIGlmIChoYXNBZGRlZE5ld0NoaWxkICYmIGVsKSB7XG4gICAgICBzY3JvbGxUb0JvdHRvbShlbCk7XG4gICAgfVxuICB9LCBbY2hpbGRDb3VudCwgcHJldmlvdXNDaGlsZENvdW50XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0UGlsbHNcIiByZWY9e2VsUmVmfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQW1EO0FBRW5ELHlCQUE0QjtBQUM1Qix3QkFBK0I7QUFNeEIsTUFBTSxlQUE2Qyx3QkFBQyxFQUFFLGVBQWU7QUFDMUUsUUFBTSxRQUFRLHlCQUE4QixJQUFJO0FBRWhELFFBQU0sYUFBYSxzQkFBUyxNQUFNLFFBQVE7QUFDMUMsUUFBTSxxQkFBcUIsb0NBQVksR0FBRyxVQUFVO0FBRXBELDhCQUFVLE1BQU07QUFDZCxVQUFNLG1CQUFtQixhQUFhO0FBQ3RDLFVBQU0sS0FBSyxNQUFNO0FBQ2pCLFFBQUksb0JBQW9CLElBQUk7QUFDMUIsNENBQWUsRUFBRTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsWUFBWSxrQkFBa0IsQ0FBQztBQUVuQyxTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsSUFBc0IsS0FBSztBQUFBLEtBQ3ZDLFFBQ0g7QUFFSixHQW5CMEQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
