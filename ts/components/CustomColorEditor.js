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
var CustomColorEditor_exports = {};
__export(CustomColorEditor_exports, {
  CustomColorEditor: () => CustomColorEditor
});
module.exports = __toCommonJS(CustomColorEditor_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_GradientDial = require("./GradientDial");
var import_SampleMessageBubbles = require("./SampleMessageBubbles");
var import_Slider = require("./Slider");
var import_Tabs = require("./Tabs");
var import_getHSL = require("../util/getHSL");
var import_getCustomColorStyle = require("../util/getCustomColorStyle");
var TabViews = /* @__PURE__ */ ((TabViews2) => {
  TabViews2["Solid"] = "Solid";
  TabViews2["Gradient"] = "Gradient";
  return TabViews2;
})(TabViews || {});
function getPercentage(value, max) {
  return 100 * value / max;
}
function getValue(percentage, max) {
  return Math.round(max / 100 * percentage);
}
const MAX_HUE = 360;
const ULTRAMARINE_ISH_VALUES = {
  hue: 220,
  saturation: 84
};
const ULTRAMARINE_ISH = {
  start: ULTRAMARINE_ISH_VALUES,
  deg: 180
};
const CustomColorEditor = /* @__PURE__ */ __name(({
  customColor = ULTRAMARINE_ISH,
  i18n,
  onClose,
  onSave
}) => {
  const [color, setColor] = (0, import_react.useState)(customColor);
  const [selectedColorKnob, setSelectedColorKnob] = (0, import_react.useState)(import_GradientDial.KnobType.start);
  const { hue, saturation } = color[selectedColorKnob] || ULTRAMARINE_ISH_VALUES;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Tabs.Tabs, {
    initialSelectedTab: color.end ? "Gradient" /* Gradient */ : "Solid" /* Solid */,
    moduleClassName: "CustomColorEditor__tabs",
    onTabChange: (selectedTab) => {
      if (selectedTab === "Gradient" /* Gradient */ && !color.end) {
        setColor({
          ...color,
          end: ULTRAMARINE_ISH_VALUES
        });
      }
      if (selectedTab === "Solid" /* Solid */ && color.end) {
        setColor({
          ...color,
          end: void 0
        });
      }
    },
    tabs: [
      {
        id: "Solid" /* Solid */,
        label: i18n("CustomColorEditor__solid")
      },
      {
        id: "Gradient" /* Gradient */,
        label: i18n("CustomColorEditor__gradient")
      }
    ]
  }, ({ selectedTab }) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CustomColorEditor__messages"
  }, /* @__PURE__ */ import_react.default.createElement(import_SampleMessageBubbles.SampleMessageBubbles, {
    backgroundStyle: (0, import_getCustomColorStyle.getCustomColorStyle)(color),
    color: "custom",
    i18n,
    includeAnotherBubble: true
  }), selectedTab === "Gradient" /* Gradient */ && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_GradientDial.GradientDial, {
    deg: color.deg,
    knob1Style: { backgroundColor: (0, import_getHSL.getHSL)(color.start) },
    knob2Style: {
      backgroundColor: (0, import_getHSL.getHSL)(color.end || ULTRAMARINE_ISH_VALUES)
    },
    onChange: (deg) => {
      setColor({
        ...color,
        deg
      });
    },
    onClick: (knob) => setSelectedColorKnob(knob),
    selectedKnob: selectedColorKnob
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CustomColorEditor__slider-container"
  }, i18n("CustomColorEditor__hue"), /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
    handleStyle: {
      backgroundColor: (0, import_getHSL.getHSL)({
        hue,
        saturation: 100
      })
    },
    label: i18n("CustomColorEditor__hue"),
    moduleClassName: "CustomColorEditor__hue-slider",
    onChange: (percentage) => {
      setColor({
        ...color,
        [selectedColorKnob]: {
          ...ULTRAMARINE_ISH_VALUES,
          ...color[selectedColorKnob],
          hue: getValue(percentage, MAX_HUE)
        }
      });
    },
    value: getPercentage(hue, MAX_HUE)
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CustomColorEditor__slider-container"
  }, i18n("CustomColorEditor__saturation"), /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
    containerStyle: (0, import_getCustomColorStyle.getCustomColorStyle)({
      deg: 180,
      start: { hue, saturation: 0 },
      end: { hue, saturation: 100 }
    }),
    handleStyle: {
      backgroundColor: (0, import_getHSL.getHSL)(color[selectedColorKnob] || ULTRAMARINE_ISH_VALUES)
    },
    label: i18n("CustomColorEditor__saturation"),
    moduleClassName: "CustomColorEditor__saturation-slider",
    onChange: (value) => {
      setColor({
        ...color,
        [selectedColorKnob]: {
          ...ULTRAMARINE_ISH_VALUES,
          ...color[selectedColorKnob],
          saturation: value
        }
      });
    },
    value: saturation
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CustomColorEditor__footer"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    variant: import_Button.ButtonVariant.Secondary,
    onClick: onClose
  }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: () => {
      onSave(color);
      onClose();
    }
  }, i18n("save"))))));
}, "CustomColorEditor");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomColorEditor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3VzdG9tQ29sb3JFZGl0b3IudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IEdyYWRpZW50RGlhbCwgS25vYlR5cGUgfSBmcm9tICcuL0dyYWRpZW50RGlhbCc7XG5pbXBvcnQgeyBTYW1wbGVNZXNzYWdlQnViYmxlcyB9IGZyb20gJy4vU2FtcGxlTWVzc2FnZUJ1YmJsZXMnO1xuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSAnLi9TbGlkZXInO1xuaW1wb3J0IHsgVGFicyB9IGZyb20gJy4vVGFicyc7XG5pbXBvcnQgdHlwZSB7IEN1c3RvbUNvbG9yVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGdldEhTTCB9IGZyb20gJy4uL3V0aWwvZ2V0SFNMJztcbmltcG9ydCB7IGdldEN1c3RvbUNvbG9yU3R5bGUgfSBmcm9tICcuLi91dGlsL2dldEN1c3RvbUNvbG9yU3R5bGUnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGN1c3RvbUNvbG9yPzogQ3VzdG9tQ29sb3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsb3NlOiAoKSA9PiB1bmtub3duO1xuICBvblNhdmU6IChjb2xvcjogQ3VzdG9tQ29sb3JUeXBlKSA9PiB1bmtub3duO1xufTtcblxuZW51bSBUYWJWaWV3cyB7XG4gIFNvbGlkID0gJ1NvbGlkJyxcbiAgR3JhZGllbnQgPSAnR3JhZGllbnQnLFxufVxuXG5mdW5jdGlvbiBnZXRQZXJjZW50YWdlKHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuICgxMDAgKiB2YWx1ZSkgLyBtYXg7XG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlKHBlcmNlbnRhZ2U6IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5yb3VuZCgobWF4IC8gMTAwKSAqIHBlcmNlbnRhZ2UpO1xufVxuXG5jb25zdCBNQVhfSFVFID0gMzYwO1xuY29uc3QgVUxUUkFNQVJJTkVfSVNIX1ZBTFVFUyA9IHtcbiAgaHVlOiAyMjAsXG4gIHNhdHVyYXRpb246IDg0LFxufTtcbmNvbnN0IFVMVFJBTUFSSU5FX0lTSDogQ3VzdG9tQ29sb3JUeXBlID0ge1xuICBzdGFydDogVUxUUkFNQVJJTkVfSVNIX1ZBTFVFUyxcbiAgZGVnOiAxODAsXG59O1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tQ29sb3JFZGl0b3IgPSAoe1xuICBjdXN0b21Db2xvciA9IFVMVFJBTUFSSU5FX0lTSCxcbiAgaTE4bixcbiAgb25DbG9zZSxcbiAgb25TYXZlLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbY29sb3IsIHNldENvbG9yXSA9IHVzZVN0YXRlPEN1c3RvbUNvbG9yVHlwZT4oY3VzdG9tQ29sb3IpO1xuICBjb25zdCBbc2VsZWN0ZWRDb2xvcktub2IsIHNldFNlbGVjdGVkQ29sb3JLbm9iXSA9IHVzZVN0YXRlPEtub2JUeXBlPihcbiAgICBLbm9iVHlwZS5zdGFydFxuICApO1xuXG4gIGNvbnN0IHsgaHVlLCBzYXR1cmF0aW9uIH0gPVxuICAgIGNvbG9yW3NlbGVjdGVkQ29sb3JLbm9iXSB8fCBVTFRSQU1BUklORV9JU0hfVkFMVUVTO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxUYWJzXG4gICAgICAgIGluaXRpYWxTZWxlY3RlZFRhYj17Y29sb3IuZW5kID8gVGFiVmlld3MuR3JhZGllbnQgOiBUYWJWaWV3cy5Tb2xpZH1cbiAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiQ3VzdG9tQ29sb3JFZGl0b3JfX3RhYnNcIlxuICAgICAgICBvblRhYkNoYW5nZT17c2VsZWN0ZWRUYWIgPT4ge1xuICAgICAgICAgIGlmIChzZWxlY3RlZFRhYiA9PT0gVGFiVmlld3MuR3JhZGllbnQgJiYgIWNvbG9yLmVuZCkge1xuICAgICAgICAgICAgc2V0Q29sb3Ioe1xuICAgICAgICAgICAgICAuLi5jb2xvcixcbiAgICAgICAgICAgICAgZW5kOiBVTFRSQU1BUklORV9JU0hfVkFMVUVTLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkVGFiID09PSBUYWJWaWV3cy5Tb2xpZCAmJiBjb2xvci5lbmQpIHtcbiAgICAgICAgICAgIHNldENvbG9yKHtcbiAgICAgICAgICAgICAgLi4uY29sb3IsXG4gICAgICAgICAgICAgIGVuZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICB0YWJzPXtbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFRhYlZpZXdzLlNvbGlkLFxuICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ0N1c3RvbUNvbG9yRWRpdG9yX19zb2xpZCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFRhYlZpZXdzLkdyYWRpZW50LFxuICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ0N1c3RvbUNvbG9yRWRpdG9yX19ncmFkaWVudCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHsoeyBzZWxlY3RlZFRhYiB9KSA9PiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ3VzdG9tQ29sb3JFZGl0b3JfX21lc3NhZ2VzXCI+XG4gICAgICAgICAgICAgIDxTYW1wbGVNZXNzYWdlQnViYmxlc1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTdHlsZT17Z2V0Q3VzdG9tQ29sb3JTdHlsZShjb2xvcil9XG4gICAgICAgICAgICAgICAgY29sb3I9XCJjdXN0b21cIlxuICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgaW5jbHVkZUFub3RoZXJCdWJibGVcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAge3NlbGVjdGVkVGFiID09PSBUYWJWaWV3cy5HcmFkaWVudCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxHcmFkaWVudERpYWxcbiAgICAgICAgICAgICAgICAgICAgZGVnPXtjb2xvci5kZWd9XG4gICAgICAgICAgICAgICAgICAgIGtub2IxU3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBnZXRIU0woY29sb3Iuc3RhcnQpIH19XG4gICAgICAgICAgICAgICAgICAgIGtub2IyU3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGdldEhTTChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLmVuZCB8fCBVTFRSQU1BUklORV9JU0hfVkFMVUVTXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2RlZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0Q29sb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWcsXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2tub2IgPT4gc2V0U2VsZWN0ZWRDb2xvcktub2Ioa25vYil9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkS25vYj17c2VsZWN0ZWRDb2xvcktub2J9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkN1c3RvbUNvbG9yRWRpdG9yX19zbGlkZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdDdXN0b21Db2xvckVkaXRvcl9faHVlJyl9XG4gICAgICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgICAgICBoYW5kbGVTdHlsZT17e1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBnZXRIU0woe1xuICAgICAgICAgICAgICAgICAgICBodWUsXG4gICAgICAgICAgICAgICAgICAgIHNhdHVyYXRpb246IDEwMCxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ0N1c3RvbUNvbG9yRWRpdG9yX19odWUnKX1cbiAgICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJDdXN0b21Db2xvckVkaXRvcl9faHVlLXNsaWRlclwiXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldENvbG9yKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZENvbG9yS25vYl06IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5VTFRSQU1BUklORV9JU0hfVkFMVUVTLFxuICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbG9yW3NlbGVjdGVkQ29sb3JLbm9iXSxcbiAgICAgICAgICAgICAgICAgICAgICBodWU6IGdldFZhbHVlKHBlcmNlbnRhZ2UsIE1BWF9IVUUpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0UGVyY2VudGFnZShodWUsIE1BWF9IVUUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkN1c3RvbUNvbG9yRWRpdG9yX19zbGlkZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdDdXN0b21Db2xvckVkaXRvcl9fc2F0dXJhdGlvbicpfVxuICAgICAgICAgICAgICA8U2xpZGVyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGU9e2dldEN1c3RvbUNvbG9yU3R5bGUoe1xuICAgICAgICAgICAgICAgICAgZGVnOiAxODAsXG4gICAgICAgICAgICAgICAgICBzdGFydDogeyBodWUsIHNhdHVyYXRpb246IDAgfSxcbiAgICAgICAgICAgICAgICAgIGVuZDogeyBodWUsIHNhdHVyYXRpb246IDEwMCB9LFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGhhbmRsZVN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGdldEhTTChcbiAgICAgICAgICAgICAgICAgICAgY29sb3Jbc2VsZWN0ZWRDb2xvcktub2JdIHx8IFVMVFJBTUFSSU5FX0lTSF9WQUxVRVNcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBsYWJlbD17aTE4bignQ3VzdG9tQ29sb3JFZGl0b3JfX3NhdHVyYXRpb24nKX1cbiAgICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJDdXN0b21Db2xvckVkaXRvcl9fc2F0dXJhdGlvbi1zbGlkZXJcIlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodmFsdWU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0Q29sb3Ioe1xuICAgICAgICAgICAgICAgICAgICAuLi5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGVkQ29sb3JLbm9iXToge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLlVMVFJBTUFSSU5FX0lTSF9WQUxVRVMsXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29sb3Jbc2VsZWN0ZWRDb2xvcktub2JdLFxuICAgICAgICAgICAgICAgICAgICAgIHNhdHVyYXRpb246IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17c2F0dXJhdGlvbn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDdXN0b21Db2xvckVkaXRvcl9fZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9IG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgICAgICAgICAgIHtpMThuKCdjYW5jZWwnKX1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBvblNhdmUoY29sb3IpO1xuICAgICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aTE4bignc2F2ZScpfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9UYWJzPlxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFDaEMsb0JB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
