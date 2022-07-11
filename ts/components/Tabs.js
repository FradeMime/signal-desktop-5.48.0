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
var Tabs_exports = {};
__export(Tabs_exports, {
  Tabs: () => Tabs
});
module.exports = __toCommonJS(Tabs_exports);
var import_react = __toESM(require("react"));
var import_useTabs = require("../hooks/useTabs");
const Tabs = /* @__PURE__ */ __name(({
  children,
  initialSelectedTab,
  moduleClassName,
  onTabChange,
  tabs
}) => {
  const { selectedTab, tabsHeaderElement } = (0, import_useTabs.useTabs)({
    initialSelectedTab,
    moduleClassName,
    onTabChange,
    tabs
  });
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, tabsHeaderElement, children({ selectedTab }));
}, "Tabs");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tabs
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGFicy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgVGFic09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vaG9va3MvdXNlVGFicyc7XG5pbXBvcnQgeyB1c2VUYWJzIH0gZnJvbSAnLi4vaG9va3MvdXNlVGFicyc7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjaGlsZHJlbjogKHJlbmRlclByb3BzOiB7IHNlbGVjdGVkVGFiOiBzdHJpbmcgfSkgPT4gUmVhY3ROb2RlO1xufSAmIFRhYnNPcHRpb25zVHlwZTtcblxuZXhwb3J0IGNvbnN0IFRhYnMgPSAoe1xuICBjaGlsZHJlbixcbiAgaW5pdGlhbFNlbGVjdGVkVGFiLFxuICBtb2R1bGVDbGFzc05hbWUsXG4gIG9uVGFiQ2hhbmdlLFxuICB0YWJzLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB7IHNlbGVjdGVkVGFiLCB0YWJzSGVhZGVyRWxlbWVudCB9ID0gdXNlVGFicyh7XG4gICAgaW5pdGlhbFNlbGVjdGVkVGFiLFxuICAgIG1vZHVsZUNsYXNzTmFtZSxcbiAgICBvblRhYkNoYW5nZSxcbiAgICB0YWJzLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7dGFic0hlYWRlckVsZW1lbnR9XG4gICAgICB7Y2hpbGRyZW4oeyBzZWxlY3RlZFRhYiB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBR2xCLHFCQUF3QjtBQU1qQixNQUFNLE9BQU8sd0JBQUM7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixRQUFNLEVBQUUsYUFBYSxzQkFBc0IsNEJBQVE7QUFBQSxJQUNqRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQ0Usd0ZBQ0csbUJBQ0EsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUMzQjtBQUVKLEdBcEJvQjsiLAogICJuYW1lcyI6IFtdCn0K
