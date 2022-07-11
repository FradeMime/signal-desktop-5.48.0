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
var PanelRow_stories_exports = {};
__export(PanelRow_stories_exports, {
  Basic: () => Basic,
  Button: () => Button,
  Full: () => Full,
  Simple: () => Simple,
  default: () => PanelRow_stories_default
});
module.exports = __toCommonJS(PanelRow_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var import_PanelRow = require("./PanelRow");
var PanelRow_stories_default = {
  title: "Components/Conversation/ConversationDetails/PanelRow"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  icon: (0, import_addon_knobs.boolean)("with icon", overrideProps.icon !== void 0) ? /* @__PURE__ */ React.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
    ariaLabel: "timer",
    icon: import_ConversationDetailsIcon.IconType.timer
  }) : null,
  label: (0, import_addon_knobs.text)("label", overrideProps.label || ""),
  info: (0, import_addon_knobs.text)("info", overrideProps.info || ""),
  right: (0, import_addon_knobs.text)("right", overrideProps.right || ""),
  actions: (0, import_addon_knobs.boolean)("with action", overrideProps.actions !== void 0) ? /* @__PURE__ */ React.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
    ariaLabel: "trash",
    icon: import_ConversationDetailsIcon.IconType.trash,
    onClick: (0, import_addon_actions.action)("action onClick")
  }) : null,
  onClick: (0, import_addon_knobs.boolean)("clickable", overrideProps.onClick !== void 0) ? overrideProps.onClick || (0, import_addon_actions.action)("onClick") : void 0
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps({
    label: "this is a panel row"
  });
  return /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    ...props
  });
}, "Basic");
const Simple = /* @__PURE__ */ __name(() => {
  const props = createProps({
    label: "this is a panel row",
    icon: "with icon",
    right: "side text"
  });
  return /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    ...props
  });
}, "Simple");
const Full = /* @__PURE__ */ __name(() => {
  const props = createProps({
    label: "this is a panel row",
    icon: "with icon",
    info: "this is some info that exists below the main label",
    right: "side text",
    actions: "with action"
  });
  return /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    ...props
  });
}, "Full");
const Button = /* @__PURE__ */ __name(() => {
  const props = createProps({
    label: "this is a panel row",
    icon: "with icon",
    right: "side text",
    onClick: (0, import_addon_actions.action)("onClick")
  });
  return /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    ...props
  });
}, "Button");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  Button,
  Full,
  Simple
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGFuZWxSb3cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgYm9vbGVhbiwgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzSWNvbiwgSWNvblR5cGUgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNJY29uJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL1BhbmVsUm93JztcbmltcG9ydCB7IFBhbmVsUm93IH0gZnJvbSAnLi9QYW5lbFJvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL1BhbmVsUm93Jyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpY29uOiBib29sZWFuKCd3aXRoIGljb24nLCBvdmVycmlkZVByb3BzLmljb24gIT09IHVuZGVmaW5lZCkgPyAoXG4gICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uIGFyaWFMYWJlbD1cInRpbWVyXCIgaWNvbj17SWNvblR5cGUudGltZXJ9IC8+XG4gICkgOiBudWxsLFxuICBsYWJlbDogdGV4dCgnbGFiZWwnLCAob3ZlcnJpZGVQcm9wcy5sYWJlbCBhcyBzdHJpbmcpIHx8ICcnKSxcbiAgaW5mbzogdGV4dCgnaW5mbycsIG92ZXJyaWRlUHJvcHMuaW5mbyB8fCAnJyksXG4gIHJpZ2h0OiB0ZXh0KCdyaWdodCcsIChvdmVycmlkZVByb3BzLnJpZ2h0IGFzIHN0cmluZykgfHwgJycpLFxuICBhY3Rpb25zOiBib29sZWFuKCd3aXRoIGFjdGlvbicsIG92ZXJyaWRlUHJvcHMuYWN0aW9ucyAhPT0gdW5kZWZpbmVkKSA/IChcbiAgICA8Q29udmVyc2F0aW9uRGV0YWlsc0ljb25cbiAgICAgIGFyaWFMYWJlbD1cInRyYXNoXCJcbiAgICAgIGljb249e0ljb25UeXBlLnRyYXNofVxuICAgICAgb25DbGljaz17YWN0aW9uKCdhY3Rpb24gb25DbGljaycpfVxuICAgIC8+XG4gICkgOiBudWxsLFxuICBvbkNsaWNrOiBib29sZWFuKCdjbGlja2FibGUnLCBvdmVycmlkZVByb3BzLm9uQ2xpY2sgIT09IHVuZGVmaW5lZClcbiAgICA/IG92ZXJyaWRlUHJvcHMub25DbGljayB8fCBhY3Rpb24oJ29uQ2xpY2snKVxuICAgIDogdW5kZWZpbmVkLFxufSk7XG5cbmV4cG9ydCBjb25zdCBCYXNpYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGxhYmVsOiAndGhpcyBpcyBhIHBhbmVsIHJvdycsXG4gIH0pO1xuXG4gIHJldHVybiA8UGFuZWxSb3cgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTaW1wbGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBsYWJlbDogJ3RoaXMgaXMgYSBwYW5lbCByb3cnLFxuICAgIGljb246ICd3aXRoIGljb24nLFxuICAgIHJpZ2h0OiAnc2lkZSB0ZXh0JyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxQYW5lbFJvdyB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEZ1bGwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBsYWJlbDogJ3RoaXMgaXMgYSBwYW5lbCByb3cnLFxuICAgIGljb246ICd3aXRoIGljb24nLFxuICAgIGluZm86ICd0aGlzIGlzIHNvbWUgaW5mbyB0aGF0IGV4aXN0cyBiZWxvdyB0aGUgbWFpbiBsYWJlbCcsXG4gICAgcmlnaHQ6ICdzaWRlIHRleHQnLFxuICAgIGFjdGlvbnM6ICd3aXRoIGFjdGlvbicsXG4gIH0pO1xuXG4gIHJldHVybiA8UGFuZWxSb3cgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBCdXR0b24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBsYWJlbDogJ3RoaXMgaXMgYSBwYW5lbCByb3cnLFxuICAgIGljb246ICd3aXRoIGljb24nLFxuICAgIHJpZ2h0OiAnc2lkZSB0ZXh0JyxcbiAgICBvbkNsaWNrOiBhY3Rpb24oJ29uQ2xpY2snKSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxQYW5lbFJvdyB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5QkFBOEI7QUFFOUIscUNBQWtEO0FBRWxELHNCQUF5QjtBQUV6QixJQUFPLDJCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLE1BQU0sZ0NBQVEsYUFBYSxjQUFjLFNBQVMsTUFBUyxJQUN6RCxvQ0FBQztBQUFBLElBQXdCLFdBQVU7QUFBQSxJQUFRLE1BQU0sd0NBQVM7QUFBQSxHQUFPLElBQy9EO0FBQUEsRUFDSixPQUFPLDZCQUFLLFNBQVUsY0FBYyxTQUFvQixFQUFFO0FBQUEsRUFDMUQsTUFBTSw2QkFBSyxRQUFRLGNBQWMsUUFBUSxFQUFFO0FBQUEsRUFDM0MsT0FBTyw2QkFBSyxTQUFVLGNBQWMsU0FBb0IsRUFBRTtBQUFBLEVBQzFELFNBQVMsZ0NBQVEsZUFBZSxjQUFjLFlBQVksTUFBUyxJQUNqRSxvQ0FBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsTUFBTSx3Q0FBUztBQUFBLElBQ2YsU0FBUyxpQ0FBTyxnQkFBZ0I7QUFBQSxHQUNsQyxJQUNFO0FBQUEsRUFDSixTQUFTLGdDQUFRLGFBQWEsY0FBYyxZQUFZLE1BQVMsSUFDN0QsY0FBYyxXQUFXLGlDQUFPLFNBQVMsSUFDekM7QUFDTixJQWpCb0I7QUFtQmIsTUFBTSxRQUFRLDZCQUFtQjtBQUN0QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE9BQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBYTtBQUFBLEdBQU87QUFDOUIsR0FOcUI7QUFRZCxNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFhO0FBQUEsR0FBTztBQUM5QixHQVJzQjtBQVVmLE1BQU0sT0FBTyw2QkFBbUI7QUFDckMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsRUFDWCxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWE7QUFBQSxHQUFPO0FBQzlCLEdBVm9CO0FBWWIsTUFBTSxTQUFTLDZCQUFtQjtBQUN2QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQzNCLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBYTtBQUFBLEdBQU87QUFDOUIsR0FUc0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
