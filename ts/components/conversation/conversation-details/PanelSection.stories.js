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
var PanelSection_stories_exports = {};
__export(PanelSection_stories_exports, {
  Basic: () => Basic,
  Centered: () => Centered,
  WithActions: () => WithActions,
  WithContent: () => WithContent,
  default: () => PanelSection_stories_default
});
module.exports = __toCommonJS(PanelSection_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_PanelSection = require("./PanelSection");
var import_PanelRow = require("./PanelRow");
var PanelSection_stories_default = {
  title: "Components/Conversation/ConversationDetails/PanelSection"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  title: (0, import_addon_knobs.text)("label", overrideProps.title || ""),
  centerTitle: (0, import_addon_knobs.boolean)("centerTitle", overrideProps.centerTitle || false),
  actions: (0, import_addon_knobs.boolean)("with action", overrideProps.actions !== void 0) ? /* @__PURE__ */ React.createElement("button", {
    onClick: (0, import_addon_actions.action)("actions onClick"),
    type: "button"
  }, "action") : null
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps({
    title: "panel section header"
  });
  return /* @__PURE__ */ React.createElement(import_PanelSection.PanelSection, {
    ...props
  });
}, "Basic");
const Centered = /* @__PURE__ */ __name(() => {
  const props = createProps({
    title: "this is a panel row",
    centerTitle: true
  });
  return /* @__PURE__ */ React.createElement(import_PanelSection.PanelSection, {
    ...props
  });
}, "Centered");
const WithActions = /* @__PURE__ */ __name(() => {
  const props = createProps({
    title: "this is a panel row",
    actions: /* @__PURE__ */ React.createElement("button", {
      onClick: (0, import_addon_actions.action)("actions onClick"),
      type: "button"
    }, "action")
  });
  return /* @__PURE__ */ React.createElement(import_PanelSection.PanelSection, {
    ...props
  });
}, "WithActions");
const WithContent = /* @__PURE__ */ __name(() => {
  const props = createProps({
    title: "this is a panel row"
  });
  return /* @__PURE__ */ React.createElement(import_PanelSection.PanelSection, {
    ...props
  }, /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    label: "this is panel row one"
  }), /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    label: "this is panel row two"
  }), /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    label: "this is panel row three"
  }), /* @__PURE__ */ React.createElement(import_PanelRow.PanelRow, {
    label: "this is panel row four"
  }));
}, "WithContent");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  Centered,
  WithActions,
  WithContent
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGFuZWxTZWN0aW9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IGJvb2xlYW4sIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vUGFuZWxTZWN0aW9uJztcbmltcG9ydCB7IFBhbmVsU2VjdGlvbiB9IGZyb20gJy4vUGFuZWxTZWN0aW9uJztcbmltcG9ydCB7IFBhbmVsUm93IH0gZnJvbSAnLi9QYW5lbFJvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL1BhbmVsU2VjdGlvbicsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgdGl0bGU6IHRleHQoJ2xhYmVsJywgb3ZlcnJpZGVQcm9wcy50aXRsZSB8fCAnJyksXG4gIGNlbnRlclRpdGxlOiBib29sZWFuKCdjZW50ZXJUaXRsZScsIG92ZXJyaWRlUHJvcHMuY2VudGVyVGl0bGUgfHwgZmFsc2UpLFxuICBhY3Rpb25zOiBib29sZWFuKCd3aXRoIGFjdGlvbicsIG92ZXJyaWRlUHJvcHMuYWN0aW9ucyAhPT0gdW5kZWZpbmVkKSA/IChcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e2FjdGlvbignYWN0aW9ucyBvbkNsaWNrJyl9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgIGFjdGlvblxuICAgIDwvYnV0dG9uPlxuICApIDogbnVsbCxcbn0pO1xuXG5leHBvcnQgY29uc3QgQmFzaWMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0aXRsZTogJ3BhbmVsIHNlY3Rpb24gaGVhZGVyJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxQYW5lbFNlY3Rpb24gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBDZW50ZXJlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRpdGxlOiAndGhpcyBpcyBhIHBhbmVsIHJvdycsXG4gICAgY2VudGVyVGl0bGU6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8UGFuZWxTZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aEFjdGlvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0aXRsZTogJ3RoaXMgaXMgYSBwYW5lbCByb3cnLFxuICAgIGFjdGlvbnM6IChcbiAgICAgIDxidXR0b24gb25DbGljaz17YWN0aW9uKCdhY3Rpb25zIG9uQ2xpY2snKX0gdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICBhY3Rpb25cbiAgICAgIDwvYnV0dG9uPlxuICAgICksXG4gIH0pO1xuXG4gIHJldHVybiA8UGFuZWxTZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aENvbnRlbnQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0aXRsZTogJ3RoaXMgaXMgYSBwYW5lbCByb3cnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxQYW5lbFNlY3Rpb24gey4uLnByb3BzfT5cbiAgICAgIDxQYW5lbFJvdyBsYWJlbD1cInRoaXMgaXMgcGFuZWwgcm93IG9uZVwiIC8+XG4gICAgICA8UGFuZWxSb3cgbGFiZWw9XCJ0aGlzIGlzIHBhbmVsIHJvdyB0d29cIiAvPlxuICAgICAgPFBhbmVsUm93IGxhYmVsPVwidGhpcyBpcyBwYW5lbCByb3cgdGhyZWVcIiAvPlxuICAgICAgPFBhbmVsUm93IGxhYmVsPVwidGhpcyBpcyBwYW5lbCByb3cgZm91clwiIC8+XG4gICAgPC9QYW5lbFNlY3Rpb24+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsMkJBQXVCO0FBQ3ZCLHlCQUE4QjtBQUc5QiwwQkFBNkI7QUFDN0Isc0JBQXlCO0FBRXpCLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsT0FBTyw2QkFBSyxTQUFTLGNBQWMsU0FBUyxFQUFFO0FBQUEsRUFDOUMsYUFBYSxnQ0FBUSxlQUFlLGNBQWMsZUFBZSxLQUFLO0FBQUEsRUFDdEUsU0FBUyxnQ0FBUSxlQUFlLGNBQWMsWUFBWSxNQUFTLElBQ2pFLG9DQUFDO0FBQUEsSUFBTyxTQUFTLGlDQUFPLGlCQUFpQjtBQUFBLElBQUcsTUFBSztBQUFBLEtBQVMsUUFFMUQsSUFDRTtBQUNOLElBUm9CO0FBVWIsTUFBTSxRQUFRLDZCQUFtQjtBQUN0QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE9BQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBaUI7QUFBQSxHQUFPO0FBQ2xDLEdBTnFCO0FBUWQsTUFBTSxXQUFXLDZCQUFtQjtBQUN6QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxFQUNmLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBaUI7QUFBQSxHQUFPO0FBQ2xDLEdBUHdCO0FBU2pCLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixPQUFPO0FBQUEsSUFDUCxTQUNFLG9DQUFDO0FBQUEsTUFBTyxTQUFTLGlDQUFPLGlCQUFpQjtBQUFBLE1BQUcsTUFBSztBQUFBLE9BQVMsUUFFMUQ7QUFBQSxFQUVKLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBaUI7QUFBQSxHQUFPO0FBQ2xDLEdBWDJCO0FBYXBCLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBRUQsU0FDRSxvQ0FBQztBQUFBLE9BQWlCO0FBQUEsS0FDaEIsb0NBQUM7QUFBQSxJQUFTLE9BQU07QUFBQSxHQUF3QixHQUN4QyxvQ0FBQztBQUFBLElBQVMsT0FBTTtBQUFBLEdBQXdCLEdBQ3hDLG9DQUFDO0FBQUEsSUFBUyxPQUFNO0FBQUEsR0FBMEIsR0FDMUMsb0NBQUM7QUFBQSxJQUFTLE9BQU07QUFBQSxHQUF5QixDQUMzQztBQUVKLEdBYjJCOyIsCiAgIm5hbWVzIjogW10KfQo=
