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
var SystemTraySettingsCheckboxes_exports = {};
__export(SystemTraySettingsCheckboxes_exports, {
  SystemTraySettingsCheckboxes: () => SystemTraySettingsCheckboxes
});
module.exports = __toCommonJS(SystemTraySettingsCheckboxes_exports);
var import_react = __toESM(require("react"));
var import_SystemTraySetting = require("../../types/SystemTraySetting");
const SystemTraySettingsCheckboxes = /* @__PURE__ */ __name(({
  i18n,
  initialValue,
  isSystemTraySupported,
  onChange
}) => {
  const [localValue, setLocalValue] = (0, import_react.useState)((0, import_SystemTraySetting.parseSystemTraySetting)(initialValue));
  if (!isSystemTraySupported) {
    return null;
  }
  const setValue = /* @__PURE__ */ __name((value) => {
    setLocalValue((oldValue) => {
      if (oldValue !== value) {
        onChange(value);
      }
      return value;
    });
  }, "setValue");
  const setMinimizeToSystemTray = /* @__PURE__ */ __name((event) => {
    setValue(event.target.checked ? import_SystemTraySetting.SystemTraySetting.MinimizeToSystemTray : import_SystemTraySetting.SystemTraySetting.DoNotUseSystemTray);
  }, "setMinimizeToSystemTray");
  const setMinimizeToAndStartInSystemTray = /* @__PURE__ */ __name((event) => {
    setValue(event.target.checked ? import_SystemTraySetting.SystemTraySetting.MinimizeToAndStartInSystemTray : import_SystemTraySetting.SystemTraySetting.MinimizeToSystemTray);
  }, "setMinimizeToAndStartInSystemTray");
  const minimizesToTray = (0, import_SystemTraySetting.shouldMinimizeToSystemTray)(localValue);
  const minimizesToAndStartsInSystemTray = localValue === import_SystemTraySetting.SystemTraySetting.MinimizeToAndStartInSystemTray;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("input", {
    checked: minimizesToTray,
    id: "system-tray-setting-minimize-to-system-tray",
    onChange: setMinimizeToSystemTray,
    type: "checkbox"
  }), " ", /* @__PURE__ */ import_react.default.createElement("label", {
    htmlFor: "system-tray-setting-minimize-to-system-tray"
  }, i18n("SystemTraySetting__minimize-to-system-tray"))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("input", {
    checked: minimizesToAndStartsInSystemTray,
    disabled: !minimizesToTray,
    id: "system-tray-setting-minimize-to-and-start-in-system-tray",
    onChange: setMinimizeToAndStartInSystemTray,
    type: "checkbox"
  }), " ", /* @__PURE__ */ import_react.default.createElement("label", {
    htmlFor: "system-tray-setting-minimize-to-and-start-in-system-tray",
    style: minimizesToTray ? {} : { opacity: 0.75 }
  }, i18n("SystemTraySetting__minimize-to-and-start-in-system-tray"))));
}, "SystemTraySettingsCheckboxes");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemTraySettingsCheckboxes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3lzdGVtVHJheVNldHRpbmdzQ2hlY2tib3hlcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDaGFuZ2VFdmVudCwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBTeXN0ZW1UcmF5U2V0dGluZyxcbiAgcGFyc2VTeXN0ZW1UcmF5U2V0dGluZyxcbiAgc2hvdWxkTWluaW1pemVUb1N5c3RlbVRyYXksXG59IGZyb20gJy4uLy4uL3R5cGVzL1N5c3RlbVRyYXlTZXR0aW5nJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaW5pdGlhbFZhbHVlOiBzdHJpbmc7XG4gIGlzU3lzdGVtVHJheVN1cHBvcnRlZDogYm9vbGVhbjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogU3lzdGVtVHJheVNldHRpbmcpID0+IHVua25vd247XG59O1xuXG4vLyBUaGlzIGNvbXBvbmVudCBpcyByZW5kZXJlZCBieSBCYWNrYm9uZSwgc28gaXQgZGV2aWF0ZXMgZnJvbSBpZGlvbWF0aWMgUmVhY3QgYSBiaXQuIEZvclxuLy8gICBleGFtcGxlLCBpdCBkb2VzIG5vdCByZWNlaXZlIGl0cyB2YWx1ZSBhcyBhIHByb3AuXG5leHBvcnQgY29uc3QgU3lzdGVtVHJheVNldHRpbmdzQ2hlY2tib3hlczogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIGkxOG4sXG4gIGluaXRpYWxWYWx1ZSxcbiAgaXNTeXN0ZW1UcmF5U3VwcG9ydGVkLFxuICBvbkNoYW5nZSxcbn0pID0+IHtcbiAgY29uc3QgW2xvY2FsVmFsdWUsIHNldExvY2FsVmFsdWVdID0gdXNlU3RhdGU8U3lzdGVtVHJheVNldHRpbmc+KFxuICAgIHBhcnNlU3lzdGVtVHJheVNldHRpbmcoaW5pdGlhbFZhbHVlKVxuICApO1xuXG4gIGlmICghaXNTeXN0ZW1UcmF5U3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBzZXRWYWx1ZSA9ICh2YWx1ZTogU3lzdGVtVHJheVNldHRpbmcpOiB2b2lkID0+IHtcbiAgICBzZXRMb2NhbFZhbHVlKG9sZFZhbHVlID0+IHtcbiAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgb25DaGFuZ2UodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldE1pbmltaXplVG9TeXN0ZW1UcmF5ID0gKGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIHNldFZhbHVlKFxuICAgICAgZXZlbnQudGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgPyBTeXN0ZW1UcmF5U2V0dGluZy5NaW5pbWl6ZVRvU3lzdGVtVHJheVxuICAgICAgICA6IFN5c3RlbVRyYXlTZXR0aW5nLkRvTm90VXNlU3lzdGVtVHJheVxuICAgICk7XG4gIH07XG5cbiAgY29uc3Qgc2V0TWluaW1pemVUb0FuZFN0YXJ0SW5TeXN0ZW1UcmF5ID0gKFxuICAgIGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PlxuICApID0+IHtcbiAgICBzZXRWYWx1ZShcbiAgICAgIGV2ZW50LnRhcmdldC5jaGVja2VkXG4gICAgICAgID8gU3lzdGVtVHJheVNldHRpbmcuTWluaW1pemVUb0FuZFN0YXJ0SW5TeXN0ZW1UcmF5XG4gICAgICAgIDogU3lzdGVtVHJheVNldHRpbmcuTWluaW1pemVUb1N5c3RlbVRyYXlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IG1pbmltaXplc1RvVHJheSA9IHNob3VsZE1pbmltaXplVG9TeXN0ZW1UcmF5KGxvY2FsVmFsdWUpO1xuICBjb25zdCBtaW5pbWl6ZXNUb0FuZFN0YXJ0c0luU3lzdGVtVHJheSA9XG4gICAgbG9jYWxWYWx1ZSA9PT0gU3lzdGVtVHJheVNldHRpbmcuTWluaW1pemVUb0FuZFN0YXJ0SW5TeXN0ZW1UcmF5O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNoZWNrZWQ9e21pbmltaXplc1RvVHJheX1cbiAgICAgICAgICBpZD1cInN5c3RlbS10cmF5LXNldHRpbmctbWluaW1pemUtdG8tc3lzdGVtLXRyYXlcIlxuICAgICAgICAgIG9uQ2hhbmdlPXtzZXRNaW5pbWl6ZVRvU3lzdGVtVHJheX1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAvPlxuICAgICAgICB7LyogVGhlc2UgbWFudWFsIHNwYWNlcyBtaXJyb3IgdGhlIG5vbi1SZWFjdCBwYXJ0cyBvZiB0aGUgc2V0dGluZ3Mgc2NyZWVuLiAqL317JyAnfVxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInN5c3RlbS10cmF5LXNldHRpbmctbWluaW1pemUtdG8tc3lzdGVtLXRyYXlcIj5cbiAgICAgICAgICB7aTE4bignU3lzdGVtVHJheVNldHRpbmdfX21pbmltaXplLXRvLXN5c3RlbS10cmF5Jyl9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNoZWNrZWQ9e21pbmltaXplc1RvQW5kU3RhcnRzSW5TeXN0ZW1UcmF5fVxuICAgICAgICAgIGRpc2FibGVkPXshbWluaW1pemVzVG9UcmF5fVxuICAgICAgICAgIGlkPVwic3lzdGVtLXRyYXktc2V0dGluZy1taW5pbWl6ZS10by1hbmQtc3RhcnQtaW4tc3lzdGVtLXRyYXlcIlxuICAgICAgICAgIG9uQ2hhbmdlPXtzZXRNaW5pbWl6ZVRvQW5kU3RhcnRJblN5c3RlbVRyYXl9XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgLz57JyAnfVxuICAgICAgICB7LyogVGhlc2Ugc3R5bGVzIHNob3VsZCBsaXZlIGluIENTUywgYnV0IGJlY2F1c2Ugd2UgaW50ZW5kIHRvIHJld3JpdGUgdGhlIHNldHRpbmdzXG4gICAgICAgICAgICBzY3JlZW4sIHRoaXMgaW5saW5lIENTUyBsaW1pdHMgdGhlIHNjb3BlIG9mIHRoZSBmdXR1cmUgcmV3cml0ZS4gKi99XG4gICAgICAgIDxsYWJlbFxuICAgICAgICAgIGh0bWxGb3I9XCJzeXN0ZW0tdHJheS1zZXR0aW5nLW1pbmltaXplLXRvLWFuZC1zdGFydC1pbi1zeXN0ZW0tdHJheVwiXG4gICAgICAgICAgc3R5bGU9e21pbmltaXplc1RvVHJheSA/IHt9IDogeyBvcGFjaXR5OiAwLjc1IH19XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignU3lzdGVtVHJheVNldHRpbmdfX21pbmltaXplLXRvLWFuZC1zdGFydC1pbi1zeXN0ZW0tdHJheScpfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFnQztBQUNoQywrQkFJTztBQVlBLE1BQU0sK0JBQTZELHdCQUFDO0FBQUEsRUFDekU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNJO0FBQ0osUUFBTSxDQUFDLFlBQVksaUJBQWlCLDJCQUNsQyxxREFBdUIsWUFBWSxDQUNyQztBQUVBLE1BQUksQ0FBQyx1QkFBdUI7QUFDMUIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFdBQVcsd0JBQUMsVUFBbUM7QUFDbkQsa0JBQWMsY0FBWTtBQUN4QixVQUFJLGFBQWEsT0FBTztBQUN0QixpQkFBUyxLQUFLO0FBQUEsTUFDaEI7QUFDQSxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxHQVBpQjtBQVNqQixRQUFNLDBCQUEwQix3QkFBQyxVQUF5QztBQUN4RSxhQUNFLE1BQU0sT0FBTyxVQUNULDJDQUFrQix1QkFDbEIsMkNBQWtCLGtCQUN4QjtBQUFBLEVBQ0YsR0FOZ0M7QUFRaEMsUUFBTSxvQ0FBb0Msd0JBQ3hDLFVBQ0c7QUFDSCxhQUNFLE1BQU0sT0FBTyxVQUNULDJDQUFrQixpQ0FDbEIsMkNBQWtCLG9CQUN4QjtBQUFBLEVBQ0YsR0FSMEM7QUFVMUMsUUFBTSxrQkFBa0IseURBQTJCLFVBQVU7QUFDN0QsUUFBTSxtQ0FDSixlQUFlLDJDQUFrQjtBQUVuQyxTQUNFLHdGQUNFLG1EQUFDLGFBQ0MsbURBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxJQUNULElBQUc7QUFBQSxJQUNILFVBQVU7QUFBQSxJQUNWLE1BQUs7QUFBQSxHQUNQLEdBQytFLEtBQy9FLG1EQUFDO0FBQUEsSUFBTSxTQUFRO0FBQUEsS0FDWixLQUFLLDRDQUE0QyxDQUNwRCxDQUNGLEdBQ0EsbURBQUMsYUFDQyxtREFBQztBQUFBLElBQ0MsU0FBUztBQUFBLElBQ1QsVUFBVSxDQUFDO0FBQUEsSUFDWCxJQUFHO0FBQUEsSUFDSCxVQUFVO0FBQUEsSUFDVixNQUFLO0FBQUEsR0FDUCxHQUFHLEtBR0gsbURBQUM7QUFBQSxJQUNDLFNBQVE7QUFBQSxJQUNSLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsS0FBSztBQUFBLEtBRTdDLEtBQUsseURBQXlELENBQ2pFLENBQ0YsQ0FDRjtBQUVKLEdBOUUwRTsiLAogICJuYW1lcyI6IFtdCn0K
