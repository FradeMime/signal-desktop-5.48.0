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
var ConversationDetailsIcon_stories_exports = {};
__export(ConversationDetailsIcon_stories_exports, {
  All: () => All,
  ClickableIcons: () => ClickableIcons,
  default: () => ConversationDetailsIcon_stories_default
});
module.exports = __toCommonJS(ConversationDetailsIcon_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var ConversationDetailsIcon_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationDetailIcon"
};
const createProps = /* @__PURE__ */ __name((overrideProps) => ({
  ariaLabel: overrideProps.ariaLabel || "",
  icon: overrideProps.icon || import_ConversationDetailsIcon.IconType.timer,
  onClick: overrideProps.onClick
}), "createProps");
const All = /* @__PURE__ */ __name(() => {
  const icons = Object.values(import_ConversationDetailsIcon.IconType);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, icons.map((icon) => /* @__PURE__ */ React.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
    ...createProps({ icon })
  })));
}, "All");
const ClickableIcons = /* @__PURE__ */ __name(() => {
  const icons = [
    import_ConversationDetailsIcon.IconType.timer,
    import_ConversationDetailsIcon.IconType.trash,
    import_ConversationDetailsIcon.IconType.invites,
    import_ConversationDetailsIcon.IconType.block,
    import_ConversationDetailsIcon.IconType.leave,
    import_ConversationDetailsIcon.IconType.down
  ];
  const onClick = (0, import_addon_actions.action)("onClick");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, icons.map((icon) => /* @__PURE__ */ React.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
    ...createProps({ icon, onClick })
  })));
}, "ClickableIcons");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  All,
  ClickableIcons
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc0ljb24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzSWNvbic7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzSWNvbiwgSWNvblR5cGUgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNJY29uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0NvbnZlcnNhdGlvbkRldGFpbHMvQ29udmVyc2F0aW9uRGV0YWlsSWNvbicsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPik6IFByb3BzID0+ICh7XG4gIGFyaWFMYWJlbDogb3ZlcnJpZGVQcm9wcy5hcmlhTGFiZWwgfHwgJycsXG4gIGljb246IG92ZXJyaWRlUHJvcHMuaWNvbiB8fCBJY29uVHlwZS50aW1lcixcbiAgb25DbGljazogb3ZlcnJpZGVQcm9wcy5vbkNsaWNrLFxufSk7XG5cbmV4cG9ydCBjb25zdCBBbGwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpY29ucyA9IE9iamVjdC52YWx1ZXMoSWNvblR5cGUpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtpY29ucy5tYXAoaWNvbiA9PiAoXG4gICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvbiB7Li4uY3JlYXRlUHJvcHMoeyBpY29uIH0pfSAvPlxuICAgICAgKSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgQ2xpY2thYmxlSWNvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpY29ucyA9IFtcbiAgICBJY29uVHlwZS50aW1lcixcbiAgICBJY29uVHlwZS50cmFzaCxcbiAgICBJY29uVHlwZS5pbnZpdGVzLFxuICAgIEljb25UeXBlLmJsb2NrLFxuICAgIEljb25UeXBlLmxlYXZlLFxuICAgIEljb25UeXBlLmRvd24sXG4gIF07XG5cbiAgY29uc3Qgb25DbGljayA9IGFjdGlvbignb25DbGljaycpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtpY29ucy5tYXAoaWNvbiA9PiAoXG4gICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvbiB7Li4uY3JlYXRlUHJvcHMoeyBpY29uLCBvbkNsaWNrIH0pfSAvPlxuICAgICAgKSl9XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFHdkIscUNBQWtEO0FBRWxELElBQU8sMENBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxrQkFBMEM7QUFBQSxFQUM3RCxXQUFXLGNBQWMsYUFBYTtBQUFBLEVBQ3RDLE1BQU0sY0FBYyxRQUFRLHdDQUFTO0FBQUEsRUFDckMsU0FBUyxjQUFjO0FBQ3pCLElBSm9CO0FBTWIsTUFBTSxNQUFNLDZCQUFtQjtBQUNwQyxRQUFNLFFBQVEsT0FBTyxPQUFPLHVDQUFRO0FBRXBDLFNBQ0UsMERBQ0csTUFBTSxJQUFJLFVBQ1Qsb0NBQUM7QUFBQSxPQUE0QixZQUFZLEVBQUUsS0FBSyxDQUFDO0FBQUEsR0FBRyxDQUNyRCxDQUNIO0FBRUosR0FWbUI7QUFZWixNQUFNLGlCQUFpQiw2QkFBbUI7QUFDL0MsUUFBTSxRQUFRO0FBQUEsSUFDWix3Q0FBUztBQUFBLElBQ1Qsd0NBQVM7QUFBQSxJQUNULHdDQUFTO0FBQUEsSUFDVCx3Q0FBUztBQUFBLElBQ1Qsd0NBQVM7QUFBQSxJQUNULHdDQUFTO0FBQUEsRUFDWDtBQUVBLFFBQU0sVUFBVSxpQ0FBTyxTQUFTO0FBRWhDLFNBQ0UsMERBQ0csTUFBTSxJQUFJLFVBQ1Qsb0NBQUM7QUFBQSxPQUE0QixZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFBQSxHQUFHLENBQzlELENBQ0g7QUFFSixHQW5COEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
