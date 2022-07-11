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
var ChatColorPicker_stories_exports = {};
__export(ChatColorPicker_stories_exports, {
  CustomColors: () => CustomColors,
  Default: () => Default,
  default: () => ChatColorPicker_stories_default
});
module.exports = __toCommonJS(ChatColorPicker_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_ChatColorPicker = require("./ChatColorPicker");
var import_Colors = require("../types/Colors");
var import_setupI18n = require("../util/setupI18n");
var ChatColorPicker_stories_default = {
  title: "Components/ChatColorPicker"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const SAMPLE_CUSTOM_COLOR = {
  deg: 90,
  end: { hue: 197, saturation: 100 },
  start: { hue: 315, saturation: 78 }
};
const createProps = /* @__PURE__ */ __name(() => ({
  addCustomColor: (0, import_addon_actions.action)("addCustomColor"),
  colorSelected: (0, import_addon_actions.action)("colorSelected"),
  editCustomColor: (0, import_addon_actions.action)("editCustomColor"),
  getConversationsWithCustomColor: (_) => Promise.resolve([]),
  i18n,
  removeCustomColor: (0, import_addon_actions.action)("removeCustomColor"),
  removeCustomColorOnConversations: (0, import_addon_actions.action)("removeCustomColorOnConversations"),
  resetAllChatColors: (0, import_addon_actions.action)("resetAllChatColors"),
  resetDefaultChatColor: (0, import_addon_actions.action)("resetDefaultChatColor"),
  selectedColor: (0, import_addon_knobs.select)("selectedColor", import_Colors.ConversationColors, "basil"),
  selectedCustomColor: {},
  setGlobalDefaultConversationColor: (0, import_addon_actions.action)("setGlobalDefaultConversationColor")
}), "createProps");
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ChatColorPicker.ChatColorPicker, {
  ...createProps()
}), "Default");
const CUSTOM_COLORS = {
  abc: {
    start: { hue: 32, saturation: 100 }
  },
  def: {
    deg: 90,
    start: { hue: 180, saturation: 100 },
    end: { hue: 0, saturation: 100 }
  },
  ghi: SAMPLE_CUSTOM_COLOR,
  jkl: {
    deg: 90,
    start: { hue: 161, saturation: 52 },
    end: { hue: 153, saturation: 89 }
  }
};
const CustomColors = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ChatColorPicker.ChatColorPicker, {
  ...createProps(),
  customColors: CUSTOM_COLORS,
  selectedColor: "custom",
  selectedCustomColor: {
    id: "ghi",
    value: SAMPLE_CUSTOM_COLOR
  }
}), "CustomColors");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomColors,
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdENvbG9yUGlja2VyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQ2hhdENvbG9yUGlja2VyJztcbmltcG9ydCB7IENoYXRDb2xvclBpY2tlciB9IGZyb20gJy4vQ2hhdENvbG9yUGlja2VyJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NoYXRDb2xvclBpY2tlcicsXG59O1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBTQU1QTEVfQ1VTVE9NX0NPTE9SID0ge1xuICBkZWc6IDkwLFxuICBlbmQ6IHsgaHVlOiAxOTcsIHNhdHVyYXRpb246IDEwMCB9LFxuICBzdGFydDogeyBodWU6IDMxNSwgc2F0dXJhdGlvbjogNzggfSxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKCk6IFByb3BzVHlwZSA9PiAoe1xuICBhZGRDdXN0b21Db2xvcjogYWN0aW9uKCdhZGRDdXN0b21Db2xvcicpLFxuICBjb2xvclNlbGVjdGVkOiBhY3Rpb24oJ2NvbG9yU2VsZWN0ZWQnKSxcbiAgZWRpdEN1c3RvbUNvbG9yOiBhY3Rpb24oJ2VkaXRDdXN0b21Db2xvcicpLFxuICBnZXRDb252ZXJzYXRpb25zV2l0aEN1c3RvbUNvbG9yOiAoXzogc3RyaW5nKSA9PiBQcm9taXNlLnJlc29sdmUoW10pLFxuICBpMThuLFxuICByZW1vdmVDdXN0b21Db2xvcjogYWN0aW9uKCdyZW1vdmVDdXN0b21Db2xvcicpLFxuICByZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9uczogYWN0aW9uKCdyZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9ucycpLFxuICByZXNldEFsbENoYXRDb2xvcnM6IGFjdGlvbigncmVzZXRBbGxDaGF0Q29sb3JzJyksXG4gIHJlc2V0RGVmYXVsdENoYXRDb2xvcjogYWN0aW9uKCdyZXNldERlZmF1bHRDaGF0Q29sb3InKSxcbiAgc2VsZWN0ZWRDb2xvcjogc2VsZWN0KCdzZWxlY3RlZENvbG9yJywgQ29udmVyc2F0aW9uQ29sb3JzLCAnYmFzaWwnIGFzIGNvbnN0KSxcbiAgc2VsZWN0ZWRDdXN0b21Db2xvcjoge30sXG4gIHNldEdsb2JhbERlZmF1bHRDb252ZXJzYXRpb25Db2xvcjogYWN0aW9uKFxuICAgICdzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3InXG4gICksXG59KTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2hhdENvbG9yUGlja2VyIHsuLi5jcmVhdGVQcm9wcygpfSAvPlxuKTtcblxuY29uc3QgQ1VTVE9NX0NPTE9SUyA9IHtcbiAgYWJjOiB7XG4gICAgc3RhcnQ6IHsgaHVlOiAzMiwgc2F0dXJhdGlvbjogMTAwIH0sXG4gIH0sXG4gIGRlZjoge1xuICAgIGRlZzogOTAsXG4gICAgc3RhcnQ6IHsgaHVlOiAxODAsIHNhdHVyYXRpb246IDEwMCB9LFxuICAgIGVuZDogeyBodWU6IDAsIHNhdHVyYXRpb246IDEwMCB9LFxuICB9LFxuICBnaGk6IFNBTVBMRV9DVVNUT01fQ09MT1IsXG4gIGprbDoge1xuICAgIGRlZzogOTAsXG4gICAgc3RhcnQ6IHsgaHVlOiAxNjEsIHNhdHVyYXRpb246IDUyIH0sXG4gICAgZW5kOiB7IGh1ZTogMTUzLCBzYXR1cmF0aW9uOiA4OSB9LFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IEN1c3RvbUNvbG9ycyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDaGF0Q29sb3JQaWNrZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoKX1cbiAgICBjdXN0b21Db2xvcnM9e0NVU1RPTV9DT0xPUlN9XG4gICAgc2VsZWN0ZWRDb2xvcj1cImN1c3RvbVwiXG4gICAgc2VsZWN0ZWRDdXN0b21Db2xvcj17e1xuICAgICAgaWQ6ICdnaGknLFxuICAgICAgdmFsdWU6IFNBTVBMRV9DVVNUT01fQ09MT1IsXG4gICAgfX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwyQkFBdUI7QUFDdkIseUJBQXVCO0FBRXZCLHNCQUF1QjtBQUV2Qiw2QkFBZ0M7QUFDaEMsb0JBQW1DO0FBQ25DLHVCQUEwQjtBQUUxQixJQUFPLGtDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLHNCQUFzQjtBQUFBLEVBQzFCLEtBQUs7QUFBQSxFQUNMLEtBQUssRUFBRSxLQUFLLEtBQUssWUFBWSxJQUFJO0FBQUEsRUFDakMsT0FBTyxFQUFFLEtBQUssS0FBSyxZQUFZLEdBQUc7QUFDcEM7QUFFQSxNQUFNLGNBQWMsNkJBQWtCO0FBQUEsRUFDcEMsZ0JBQWdCLGlDQUFPLGdCQUFnQjtBQUFBLEVBQ3ZDLGVBQWUsaUNBQU8sZUFBZTtBQUFBLEVBQ3JDLGlCQUFpQixpQ0FBTyxpQkFBaUI7QUFBQSxFQUN6QyxpQ0FBaUMsQ0FBQyxNQUFjLFFBQVEsUUFBUSxDQUFDLENBQUM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUFBLEVBQzdDLGtDQUFrQyxpQ0FBTyxrQ0FBa0M7QUFBQSxFQUMzRSxvQkFBb0IsaUNBQU8sb0JBQW9CO0FBQUEsRUFDL0MsdUJBQXVCLGlDQUFPLHVCQUF1QjtBQUFBLEVBQ3JELGVBQWUsK0JBQU8saUJBQWlCLGtDQUFvQixPQUFnQjtBQUFBLEVBQzNFLHFCQUFxQixDQUFDO0FBQUEsRUFDdEIsbUNBQW1DLGlDQUNqQyxtQ0FDRjtBQUNGLElBZm9CO0FBaUJiLE1BQU0sVUFBVSw2QkFDckIsbURBQUM7QUFBQSxLQUFvQixZQUFZO0FBQUEsQ0FBRyxHQURmO0FBSXZCLE1BQU0sZ0JBQWdCO0FBQUEsRUFDcEIsS0FBSztBQUFBLElBQ0gsT0FBTyxFQUFFLEtBQUssSUFBSSxZQUFZLElBQUk7QUFBQSxFQUNwQztBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsS0FBSztBQUFBLElBQ0wsT0FBTyxFQUFFLEtBQUssS0FBSyxZQUFZLElBQUk7QUFBQSxJQUNuQyxLQUFLLEVBQUUsS0FBSyxHQUFHLFlBQVksSUFBSTtBQUFBLEVBQ2pDO0FBQUEsRUFDQSxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsSUFDSCxLQUFLO0FBQUEsSUFDTCxPQUFPLEVBQUUsS0FBSyxLQUFLLFlBQVksR0FBRztBQUFBLElBQ2xDLEtBQUssRUFBRSxLQUFLLEtBQUssWUFBWSxHQUFHO0FBQUEsRUFDbEM7QUFDRjtBQUVPLE1BQU0sZUFBZSw2QkFDMUIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxFQUNoQixjQUFjO0FBQUEsRUFDZCxlQUFjO0FBQUEsRUFDZCxxQkFBcUI7QUFBQSxJQUNuQixJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsRUFDVDtBQUFBLENBQ0YsR0FUMEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
