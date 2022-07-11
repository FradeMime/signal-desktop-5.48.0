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
var useTabs_exports = {};
__export(useTabs_exports, {
  useTabs: () => useTabs
});
module.exports = __toCommonJS(useTabs_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_assert = require("../util/assert");
var import_getClassNamesFor = require("../util/getClassNamesFor");
function useTabs({
  initialSelectedTab,
  moduleClassName,
  onTabChange,
  tabs
}) {
  (0, import_assert.assert)(tabs.length, "Tabs needs more than 1 tab present");
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("Tabs", moduleClassName);
  const [selectedTab, setSelectedTab] = (0, import_react.useState)(initialSelectedTab || tabs[0].id);
  const tabsHeaderElement = /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("")
  }, tabs.map(({ id, label }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName("__tab"), selectedTab === id && getClassName("__tab--selected")),
    key: id,
    onClick: () => {
      setSelectedTab(id);
      onTabChange?.(id);
    },
    onKeyUp: (e) => {
      if (e.target === e.currentTarget && e.keyCode === 13) {
        setSelectedTab(id);
        e.preventDefault();
        e.stopPropagation();
      }
    },
    role: "tab",
    tabIndex: 0
  }, label)));
  return {
    selectedTab,
    tabsHeaderElement
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTabs
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlVGFicy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBLZXlib2FyZEV2ZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcblxudHlwZSBUYWIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJzT3B0aW9uc1R5cGUgPSB7XG4gIGluaXRpYWxTZWxlY3RlZFRhYj86IHN0cmluZztcbiAgbW9kdWxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBvblRhYkNoYW5nZT86IChzZWxlY3RlZFRhYjogc3RyaW5nKSA9PiB1bmtub3duO1xuICB0YWJzOiBBcnJheTxUYWI+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYnMoe1xuICBpbml0aWFsU2VsZWN0ZWRUYWIsXG4gIG1vZHVsZUNsYXNzTmFtZSxcbiAgb25UYWJDaGFuZ2UsXG4gIHRhYnMsXG59OiBUYWJzT3B0aW9uc1R5cGUpOiB7XG4gIHNlbGVjdGVkVGFiOiBzdHJpbmc7XG4gIHRhYnNIZWFkZXJFbGVtZW50OiBKU1guRWxlbWVudDtcbn0ge1xuICBhc3NlcnQodGFicy5sZW5ndGgsICdUYWJzIG5lZWRzIG1vcmUgdGhhbiAxIHRhYiBwcmVzZW50Jyk7XG5cbiAgY29uc3QgZ2V0Q2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lc0ZvcignVGFicycsIG1vZHVsZUNsYXNzTmFtZSk7XG5cbiAgY29uc3QgW3NlbGVjdGVkVGFiLCBzZXRTZWxlY3RlZFRhYl0gPSB1c2VTdGF0ZTxzdHJpbmc+KFxuICAgIGluaXRpYWxTZWxlY3RlZFRhYiB8fCB0YWJzWzBdLmlkXG4gICk7XG5cbiAgY29uc3QgdGFic0hlYWRlckVsZW1lbnQgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnJyl9PlxuICAgICAge3RhYnMubWFwKCh7IGlkLCBsYWJlbCB9KSA9PiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBnZXRDbGFzc05hbWUoJ19fdGFiJyksXG4gICAgICAgICAgICBzZWxlY3RlZFRhYiA9PT0gaWQgJiYgZ2V0Q2xhc3NOYW1lKCdfX3RhYi0tc2VsZWN0ZWQnKVxuICAgICAgICAgICl9XG4gICAgICAgICAga2V5PXtpZH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRTZWxlY3RlZFRhYihpZCk7XG4gICAgICAgICAgICBvblRhYkNoYW5nZT8uKGlkKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5VXA9eyhlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCAmJiBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgIHNldFNlbGVjdGVkVGFiKGlkKTtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgID5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZFRhYixcbiAgICB0YWJzSGVhZGVyRWxlbWVudCxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBZ0M7QUFDaEMsd0JBQXVCO0FBQ3ZCLG9CQUF1QjtBQUN2Qiw4QkFBaUM7QUFjMUIsaUJBQWlCO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUlBO0FBQ0EsNEJBQU8sS0FBSyxRQUFRLG9DQUFvQztBQUV4RCxRQUFNLGVBQWUsOENBQWlCLFFBQVEsZUFBZTtBQUU3RCxRQUFNLENBQUMsYUFBYSxrQkFBa0IsMkJBQ3BDLHNCQUFzQixLQUFLLEdBQUcsRUFDaEM7QUFFQSxRQUFNLG9CQUNKLG1EQUFDO0FBQUEsSUFBSSxXQUFXLGFBQWEsRUFBRTtBQUFBLEtBQzVCLEtBQUssSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUNmLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULGFBQWEsT0FBTyxHQUNwQixnQkFBZ0IsTUFBTSxhQUFhLGlCQUFpQixDQUN0RDtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsU0FBUyxNQUFNO0FBQ2IscUJBQWUsRUFBRTtBQUNqQixvQkFBYyxFQUFFO0FBQUEsSUFDbEI7QUFBQSxJQUNBLFNBQVMsQ0FBQyxNQUFxQjtBQUM3QixVQUFJLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFlBQVksSUFBSTtBQUNwRCx1QkFBZSxFQUFFO0FBQ2pCLFVBQUUsZUFBZTtBQUNqQixVQUFFLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBSztBQUFBLElBQ0wsVUFBVTtBQUFBLEtBRVQsS0FDSCxDQUNELENBQ0g7QUFHRixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFsRGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
