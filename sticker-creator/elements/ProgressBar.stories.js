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
var ProgressBar_stories_exports = {};
__export(ProgressBar_stories_exports, {
  _ProgressBar: () => _ProgressBar,
  default: () => ProgressBar_stories_default
});
module.exports = __toCommonJS(ProgressBar_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_ProgressBar = require("./ProgressBar");
var ProgressBar_stories_default = {
  title: "Sticker Creator/elements"
};
const _ProgressBar = /* @__PURE__ */ __name(() => {
  const count = (0, import_addon_knobs.number)("count", 5);
  const total = (0, import_addon_knobs.number)("total", 10);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_ProgressBar.ProgressBar, {
    count,
    total
  }));
}, "_ProgressBar");
_ProgressBar.story = {
  name: "ProgressBar"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ProgressBar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZ3Jlc3NCYXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgU3RvcnlSb3cgfSBmcm9tICcuL1N0b3J5Um93JztcbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnLi9Qcm9ncmVzc0Jhcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdTdGlja2VyIENyZWF0b3IvZWxlbWVudHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9Qcm9ncmVzc0JhciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNvdW50ID0gbnVtYmVyKCdjb3VudCcsIDUpO1xuICBjb25zdCB0b3RhbCA9IG51bWJlcigndG90YWwnLCAxMCk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlSb3c+XG4gICAgICA8UHJvZ3Jlc3NCYXIgY291bnQ9e2NvdW50fSB0b3RhbD17dG90YWx9IC8+XG4gICAgPC9TdG9yeVJvdz5cbiAgKTtcbn07XG5cbl9Qcm9ncmVzc0Jhci5zdG9yeSA9IHtcbiAgbmFtZTogJ1Byb2dyZXNzQmFyJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBdUI7QUFFdkIsc0JBQXlCO0FBQ3pCLHlCQUE0QjtBQUU1QixJQUFPLDhCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGVBQWUsNkJBQW1CO0FBQzdDLFFBQU0sUUFBUSwrQkFBTyxTQUFTLENBQUM7QUFDL0IsUUFBTSxRQUFRLCtCQUFPLFNBQVMsRUFBRTtBQUVoQyxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDO0FBQUEsSUFBWTtBQUFBLElBQWM7QUFBQSxHQUFjLENBQzNDO0FBRUosR0FUNEI7QUFXNUIsYUFBYSxRQUFRO0FBQUEsRUFDbkIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
