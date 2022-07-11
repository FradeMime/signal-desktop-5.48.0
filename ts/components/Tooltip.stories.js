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
var Tooltip_stories_exports = {};
__export(Tooltip_stories_exports, {
  DarkTheme: () => DarkTheme,
  Sticky: () => Sticky,
  WithAppliedPopperModifiers: () => WithAppliedPopperModifiers,
  _Bottom: () => _Bottom,
  _Left: () => _Left,
  _Right: () => _Right,
  _Top: () => _Top,
  default: () => Tooltip_stories_default
});
module.exports = __toCommonJS(Tooltip_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Tooltip = require("./Tooltip");
var import_theme = require("../util/theme");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  content: overrideProps.content || "Hello World",
  direction: (0, import_addon_knobs.select)("direction", import_Tooltip.TooltipPlacement, overrideProps.direction),
  sticky: overrideProps.sticky,
  theme: overrideProps.theme
}), "createProps");
var Tooltip_stories_default = {
  title: "Components/Tooltip"
};
const Trigger = /* @__PURE__ */ React.createElement("span", {
  style: {
    display: "inline-block",
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 200,
    marginRight: 200
  }
}, "Trigger");
const _Top = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
  ...createProps({
    direction: import_Tooltip.TooltipPlacement.Top
  })
}, Trigger), "_Top");
const _Right = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
  ...createProps({
    direction: import_Tooltip.TooltipPlacement.Right
  })
}, Trigger), "_Right");
const _Bottom = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
  ...createProps({
    direction: import_Tooltip.TooltipPlacement.Bottom
  })
}, Trigger), "_Bottom");
const _Left = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
  ...createProps({
    direction: import_Tooltip.TooltipPlacement.Left
  })
}, Trigger), "_Left");
const Sticky = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
  ...createProps({
    sticky: true
  })
}, Trigger), "Sticky");
const WithAppliedPopperModifiers = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
    ...createProps({
      direction: import_Tooltip.TooltipPlacement.Bottom
    }),
    popperModifiers: [
      {
        name: "offset",
        options: {
          offset: [80, 80]
        }
      }
    ]
  }, Trigger);
}, "WithAppliedPopperModifiers");
const DarkTheme = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_Tooltip.Tooltip, {
  ...createProps({
    sticky: true,
    theme: import_theme.Theme.Dark
  })
}, Trigger), "DarkTheme");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DarkTheme,
  Sticky,
  WithAppliedPopperModifiers,
  _Bottom,
  _Left,
  _Right,
  _Top
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9vbHRpcC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1Rvb2x0aXAnO1xuaW1wb3J0IHsgVG9vbHRpcCwgVG9vbHRpcFBsYWNlbWVudCB9IGZyb20gJy4vVG9vbHRpcCc7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBjb250ZW50OiBvdmVycmlkZVByb3BzLmNvbnRlbnQgfHwgJ0hlbGxvIFdvcmxkJyxcbiAgZGlyZWN0aW9uOiBzZWxlY3QoJ2RpcmVjdGlvbicsIFRvb2x0aXBQbGFjZW1lbnQsIG92ZXJyaWRlUHJvcHMuZGlyZWN0aW9uKSxcbiAgc3RpY2t5OiBvdmVycmlkZVByb3BzLnN0aWNreSxcbiAgdGhlbWU6IG92ZXJyaWRlUHJvcHMudGhlbWUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvVG9vbHRpcCcsXG59O1xuXG5jb25zdCBUcmlnZ2VyID0gKFxuICA8c3BhblxuICAgIHN0eWxlPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpblRvcDogMjAwLFxuICAgICAgbWFyZ2luQm90dG9tOiAyMDAsXG4gICAgICBtYXJnaW5MZWZ0OiAyMDAsXG4gICAgICBtYXJnaW5SaWdodDogMjAwLFxuICAgIH19XG4gID5cbiAgICBUcmlnZ2VyXG4gIDwvc3Bhbj5cbik7XG5cbmV4cG9ydCBjb25zdCBfVG9wID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvb2x0aXBcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZGlyZWN0aW9uOiBUb29sdGlwUGxhY2VtZW50LlRvcCxcbiAgICB9KX1cbiAgPlxuICAgIHtUcmlnZ2VyfVxuICA8L1Rvb2x0aXA+XG4pO1xuXG5leHBvcnQgY29uc3QgX1JpZ2h0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvb2x0aXBcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZGlyZWN0aW9uOiBUb29sdGlwUGxhY2VtZW50LlJpZ2h0LFxuICAgIH0pfVxuICA+XG4gICAge1RyaWdnZXJ9XG4gIDwvVG9vbHRpcD5cbik7XG5cbmV4cG9ydCBjb25zdCBfQm90dG9tID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvb2x0aXBcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZGlyZWN0aW9uOiBUb29sdGlwUGxhY2VtZW50LkJvdHRvbSxcbiAgICB9KX1cbiAgPlxuICAgIHtUcmlnZ2VyfVxuICA8L1Rvb2x0aXA+XG4pO1xuXG5leHBvcnQgY29uc3QgX0xlZnQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VG9vbHRpcFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBkaXJlY3Rpb246IFRvb2x0aXBQbGFjZW1lbnQuTGVmdCxcbiAgICB9KX1cbiAgPlxuICAgIHtUcmlnZ2VyfVxuICA8L1Rvb2x0aXA+XG4pO1xuXG5leHBvcnQgY29uc3QgU3RpY2t5ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvb2x0aXBcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgc3RpY2t5OiB0cnVlLFxuICAgIH0pfVxuICA+XG4gICAge1RyaWdnZXJ9XG4gIDwvVG9vbHRpcD5cbik7XG5cbmV4cG9ydCBjb25zdCBXaXRoQXBwbGllZFBvcHBlck1vZGlmaWVycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRvb2x0aXBcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGRpcmVjdGlvbjogVG9vbHRpcFBsYWNlbWVudC5Cb3R0b20sXG4gICAgICB9KX1cbiAgICAgIHBvcHBlck1vZGlmaWVycz17W1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgb2Zmc2V0OiBbODAsIDgwXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7VHJpZ2dlcn1cbiAgICA8L1Rvb2x0aXA+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgRGFya1RoZW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvb2x0aXBcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgc3RpY2t5OiB0cnVlLFxuICAgICAgdGhlbWU6IFRoZW1lLkRhcmssXG4gICAgfSl9XG4gID5cbiAgICB7VHJpZ2dlcn1cbiAgPC9Ub29sdGlwPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUF1QjtBQUd2QixxQkFBMEM7QUFDMUMsbUJBQXNCO0FBRXRCLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLFNBQVMsY0FBYyxXQUFXO0FBQUEsRUFDbEMsV0FBVywrQkFBTyxhQUFhLGlDQUFrQixjQUFjLFNBQVM7QUFBQSxFQUN4RSxRQUFRLGNBQWM7QUFBQSxFQUN0QixPQUFPLGNBQWM7QUFDdkIsSUFMb0I7QUFPcEIsSUFBTywwQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxVQUNKLG9DQUFDO0FBQUEsRUFDQyxPQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsRUFDZjtBQUFBLEdBQ0QsU0FFRDtBQUdLLE1BQU0sT0FBTyw2QkFDbEIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFdBQVcsZ0NBQWlCO0FBQUEsRUFDOUIsQ0FBQztBQUFBLEdBRUEsT0FDSCxHQVBrQjtBQVViLE1BQU0sU0FBUyw2QkFDcEIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFdBQVcsZ0NBQWlCO0FBQUEsRUFDOUIsQ0FBQztBQUFBLEdBRUEsT0FDSCxHQVBvQjtBQVVmLE1BQU0sVUFBVSw2QkFDckIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFdBQVcsZ0NBQWlCO0FBQUEsRUFDOUIsQ0FBQztBQUFBLEdBRUEsT0FDSCxHQVBxQjtBQVVoQixNQUFNLFFBQVEsNkJBQ25CLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxXQUFXLGdDQUFpQjtBQUFBLEVBQzlCLENBQUM7QUFBQSxHQUVBLE9BQ0gsR0FQbUI7QUFVZCxNQUFNLFNBQVMsNkJBQ3BCLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxRQUFRO0FBQUEsRUFDVixDQUFDO0FBQUEsR0FFQSxPQUNILEdBUG9CO0FBVWYsTUFBTSw2QkFBNkIsNkJBQW1CO0FBQzNELFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLFdBQVcsZ0NBQWlCO0FBQUEsSUFDOUIsQ0FBQztBQUFBLElBQ0QsaUJBQWlCO0FBQUEsTUFDZjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsUUFBUSxDQUFDLElBQUksRUFBRTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxLQUVDLE9BQ0g7QUFFSixHQWxCMEM7QUFvQm5DLE1BQU0sWUFBWSw2QkFDdkIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFFBQVE7QUFBQSxJQUNSLE9BQU8sbUJBQU07QUFBQSxFQUNmLENBQUM7QUFBQSxHQUVBLE9BQ0gsR0FSdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
