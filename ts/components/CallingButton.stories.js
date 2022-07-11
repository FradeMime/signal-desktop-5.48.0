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
var CallingButton_stories_exports = {};
__export(CallingButton_stories_exports, {
  AudioDisabled: () => AudioDisabled,
  AudioOff: () => AudioOff,
  AudioOn: () => AudioOn,
  KitchenSink: () => KitchenSink,
  PresentingOff: () => PresentingOff,
  PresentingOn: () => PresentingOn,
  TooltipRight: () => TooltipRight,
  VideoDisabled: () => VideoDisabled,
  VideoOff: () => VideoOff,
  VideoOn: () => VideoOn,
  default: () => CallingButton_stories_default
});
module.exports = __toCommonJS(CallingButton_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_CallingButton = require("./CallingButton");
var import_Tooltip = require("./Tooltip");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  buttonType: overrideProps.buttonType || (0, import_addon_knobs.select)("buttonType", import_CallingButton.CallingButtonType, import_CallingButton.CallingButtonType.HANG_UP),
  i18n,
  onClick: (0, import_addon_actions.action)("on-click"),
  onMouseEnter: (0, import_addon_actions.action)("on-mouse-enter"),
  onMouseLeave: (0, import_addon_actions.action)("on-mouse-leave"),
  tooltipDirection: (0, import_addon_knobs.select)("tooltipDirection", import_Tooltip.TooltipPlacement, overrideProps.tooltipDirection || import_Tooltip.TooltipPlacement.Bottom)
}), "createProps");
var CallingButton_stories_default = {
  title: "Components/CallingButton"
};
const KitchenSink = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, Object.keys(import_CallingButton.CallingButtonType).map((buttonType) => /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    key: buttonType,
    ...createProps({ buttonType })
  })));
}, "KitchenSink");
const AudioOn = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.AUDIO_ON
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "AudioOn");
const AudioOff = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.AUDIO_OFF
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "AudioOff");
const AudioDisabled = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.AUDIO_DISABLED
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "AudioDisabled");
const VideoOn = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.VIDEO_ON
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "VideoOn");
const VideoOff = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.VIDEO_OFF
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "VideoOff");
const VideoDisabled = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.VIDEO_DISABLED
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "VideoDisabled");
const TooltipRight = /* @__PURE__ */ __name(() => {
  const props = createProps({
    tooltipDirection: import_Tooltip.TooltipPlacement.Right
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "TooltipRight");
TooltipRight.story = {
  name: "Tooltip right"
};
const PresentingOn = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.PRESENTING_ON
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "PresentingOn");
const PresentingOff = /* @__PURE__ */ __name(() => {
  const props = createProps({
    buttonType: import_CallingButton.CallingButtonType.PRESENTING_OFF
  });
  return /* @__PURE__ */ React.createElement(import_CallingButton.CallingButton, {
    ...props
  });
}, "PresentingOff");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioDisabled,
  AudioOff,
  AudioOn,
  KitchenSink,
  PresentingOff,
  PresentingOn,
  TooltipRight,
  VideoDisabled,
  VideoOff,
  VideoOn
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0J1dHRvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0NhbGxpbmdCdXR0b24nO1xuaW1wb3J0IHsgQ2FsbGluZ0J1dHRvbiwgQ2FsbGluZ0J1dHRvblR5cGUgfSBmcm9tICcuL0NhbGxpbmdCdXR0b24nO1xuaW1wb3J0IHsgVG9vbHRpcFBsYWNlbWVudCB9IGZyb20gJy4vVG9vbHRpcCc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYnV0dG9uVHlwZTpcbiAgICBvdmVycmlkZVByb3BzLmJ1dHRvblR5cGUgfHxcbiAgICBzZWxlY3QoJ2J1dHRvblR5cGUnLCBDYWxsaW5nQnV0dG9uVHlwZSwgQ2FsbGluZ0J1dHRvblR5cGUuSEFOR19VUCksXG4gIGkxOG4sXG4gIG9uQ2xpY2s6IGFjdGlvbignb24tY2xpY2snKSxcbiAgb25Nb3VzZUVudGVyOiBhY3Rpb24oJ29uLW1vdXNlLWVudGVyJyksXG4gIG9uTW91c2VMZWF2ZTogYWN0aW9uKCdvbi1tb3VzZS1sZWF2ZScpLFxuICB0b29sdGlwRGlyZWN0aW9uOiBzZWxlY3QoXG4gICAgJ3Rvb2x0aXBEaXJlY3Rpb24nLFxuICAgIFRvb2x0aXBQbGFjZW1lbnQsXG4gICAgb3ZlcnJpZGVQcm9wcy50b29sdGlwRGlyZWN0aW9uIHx8IFRvb2x0aXBQbGFjZW1lbnQuQm90dG9tXG4gICksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ2FsbGluZ0J1dHRvbicsXG59O1xuXG5leHBvcnQgY29uc3QgS2l0Y2hlblNpbmsgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7T2JqZWN0LmtleXMoQ2FsbGluZ0J1dHRvblR5cGUpLm1hcChidXR0b25UeXBlID0+IChcbiAgICAgICAgPENhbGxpbmdCdXR0b25cbiAgICAgICAgICBrZXk9e2J1dHRvblR5cGV9XG4gICAgICAgICAgey4uLmNyZWF0ZVByb3BzKHsgYnV0dG9uVHlwZTogYnV0dG9uVHlwZSBhcyBDYWxsaW5nQnV0dG9uVHlwZSB9KX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEF1ZGlvT24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBidXR0b25UeXBlOiBDYWxsaW5nQnV0dG9uVHlwZS5BVURJT19PTixcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ0J1dHRvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEF1ZGlvT2ZmID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYnV0dG9uVHlwZTogQ2FsbGluZ0J1dHRvblR5cGUuQVVESU9fT0ZGLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQXVkaW9EaXNhYmxlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGJ1dHRvblR5cGU6IENhbGxpbmdCdXR0b25UeXBlLkFVRElPX0RJU0FCTEVELFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgVmlkZW9PbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGJ1dHRvblR5cGU6IENhbGxpbmdCdXR0b25UeXBlLlZJREVPX09OLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgVmlkZW9PZmYgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBidXR0b25UeXBlOiBDYWxsaW5nQnV0dG9uVHlwZS5WSURFT19PRkYsXG4gIH0pO1xuICByZXR1cm4gPENhbGxpbmdCdXR0b24gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBWaWRlb0Rpc2FibGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYnV0dG9uVHlwZTogQ2FsbGluZ0J1dHRvblR5cGUuVklERU9fRElTQUJMRUQsXG4gIH0pO1xuICByZXR1cm4gPENhbGxpbmdCdXR0b24gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBUb29sdGlwUmlnaHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0b29sdGlwRGlyZWN0aW9uOiBUb29sdGlwUGxhY2VtZW50LlJpZ2h0LFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5Ub29sdGlwUmlnaHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdUb29sdGlwIHJpZ2h0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBQcmVzZW50aW5nT24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBidXR0b25UeXBlOiBDYWxsaW5nQnV0dG9uVHlwZS5QUkVTRU5USU5HX09OLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgUHJlc2VudGluZ09mZiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGJ1dHRvblR5cGU6IENhbGxpbmdCdXR0b25UeXBlLlBSRVNFTlRJTkdfT0ZGLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXVCO0FBQ3ZCLDJCQUF1QjtBQUd2QiwyQkFBaUQ7QUFDakQscUJBQWlDO0FBQ2pDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsWUFDRSxjQUFjLGNBQ2QsK0JBQU8sY0FBYyx3Q0FBbUIsdUNBQWtCLE9BQU87QUFBQSxFQUNuRTtBQUFBLEVBQ0EsU0FBUyxpQ0FBTyxVQUFVO0FBQUEsRUFDMUIsY0FBYyxpQ0FBTyxnQkFBZ0I7QUFBQSxFQUNyQyxjQUFjLGlDQUFPLGdCQUFnQjtBQUFBLEVBQ3JDLGtCQUFrQiwr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
