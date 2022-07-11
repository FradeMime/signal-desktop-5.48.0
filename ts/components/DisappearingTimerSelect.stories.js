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
var DisappearingTimerSelect_stories_exports = {};
__export(DisappearingTimerSelect_stories_exports, {
  InitialValue1Day: () => InitialValue1Day,
  InitialValue3DaysCustomTime: () => InitialValue3DaysCustomTime,
  default: () => DisappearingTimerSelect_stories_default
});
module.exports = __toCommonJS(DisappearingTimerSelect_stories_exports);
var import_react = __toESM(require("react"));
var import_DisappearingTimerSelect = require("./DisappearingTimerSelect");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var DisappearingTimerSelect_stories_default = {
  title: "Components/DisappearingTimerSelect"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const TimerSelectWrap = /* @__PURE__ */ __name(({ initialValue }) => {
  const [value, setValue] = (0, import_react.useState)(initialValue);
  return /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimerSelect.DisappearingTimerSelect, {
    i18n,
    value,
    onChange: (newValue) => setValue(newValue)
  });
}, "TimerSelectWrap");
const InitialValue1Day = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(TimerSelectWrap, {
  initialValue: 24 * 3600
}), "InitialValue1Day");
InitialValue1Day.story = {
  name: "Initial value: 1 day"
};
const InitialValue3DaysCustomTime = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(TimerSelectWrap, {
  initialValue: 3 * 24 * 3600
}), "InitialValue3DaysCustomTime");
InitialValue3DaysCustomTime.story = {
  name: "Initial value 3 days (Custom time)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InitialValue1Day,
  InitialValue3DaysCustomTime
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlzYXBwZWFyaW5nVGltZXJTZWxlY3Quc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBEaXNhcHBlYXJpbmdUaW1lclNlbGVjdCB9IGZyb20gJy4vRGlzYXBwZWFyaW5nVGltZXJTZWxlY3QnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0Rpc2FwcGVhcmluZ1RpbWVyU2VsZWN0Jyxcbn07XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGluaXRpYWxWYWx1ZTogbnVtYmVyO1xufTtcblxuY29uc3QgVGltZXJTZWxlY3RXcmFwOiBSZWFjdC5GQzxQcm9wcz4gPSAoeyBpbml0aWFsVmFsdWUgfSkgPT4ge1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RGlzYXBwZWFyaW5nVGltZXJTZWxlY3RcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17bmV3VmFsdWUgPT4gc2V0VmFsdWUobmV3VmFsdWUpfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5pdGlhbFZhbHVlMURheSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUaW1lclNlbGVjdFdyYXAgaW5pdGlhbFZhbHVlPXsyNCAqIDM2MDB9IC8+XG4pO1xuXG5Jbml0aWFsVmFsdWUxRGF5LnN0b3J5ID0ge1xuICBuYW1lOiAnSW5pdGlhbCB2YWx1ZTogMSBkYXknLFxufTtcblxuZXhwb3J0IGNvbnN0IEluaXRpYWxWYWx1ZTNEYXlzQ3VzdG9tVGltZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUaW1lclNlbGVjdFdyYXAgaW5pdGlhbFZhbHVlPXszICogMjQgKiAzNjAwfSAvPlxuKTtcblxuSW5pdGlhbFZhbHVlM0RheXNDdXN0b21UaW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5pdGlhbCB2YWx1ZSAzIGRheXMgKEN1c3RvbSB0aW1lKScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMscUNBQXdDO0FBQ3hDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsSUFBTywwQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFNdkMsTUFBTSxrQkFBbUMsd0JBQUMsRUFBRSxtQkFBbUI7QUFDN0QsUUFBTSxDQUFDLE9BQU8sWUFBWSwyQkFBUyxZQUFZO0FBRS9DLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0EsVUFBVSxjQUFZLFNBQVMsUUFBUTtBQUFBLEdBQ3pDO0FBRUosR0FWeUM7QUFZbEMsTUFBTSxtQkFBbUIsNkJBQzlCLG1EQUFDO0FBQUEsRUFBZ0IsY0FBYyxLQUFLO0FBQUEsQ0FBTSxHQURaO0FBSWhDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSO0FBRU8sTUFBTSw4QkFBOEIsNkJBQ3pDLG1EQUFDO0FBQUEsRUFBZ0IsY0FBYyxJQUFJLEtBQUs7QUFBQSxDQUFNLEdBREw7QUFJM0MsNEJBQTRCLFFBQVE7QUFBQSxFQUNsQyxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
