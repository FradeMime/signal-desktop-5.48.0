var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CallingDeviceSelection_exports = {};
__export(CallingDeviceSelection_exports, {
  SmartCallingDeviceSelection: () => SmartCallingDeviceSelection
});
module.exports = __toCommonJS(CallingDeviceSelection_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_CallingDeviceSelection = require("../../components/CallingDeviceSelection");
var import_user = require("../selectors/user");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  const {
    availableMicrophones,
    availableSpeakers,
    selectedMicrophone,
    selectedSpeaker,
    availableCameras,
    selectedCamera
  } = state.calling;
  return {
    availableCameras,
    availableMicrophones,
    availableSpeakers,
    i18n: (0, import_user.getIntl)(state),
    selectedCamera,
    selectedMicrophone,
    selectedSpeaker
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartCallingDeviceSelection = smart(import_CallingDeviceSelection.CallingDeviceSelection);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCallingDeviceSelection
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0RldmljZVNlbGVjdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgQ2FsbGluZ0RldmljZVNlbGVjdGlvbiB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2FsbGluZ0RldmljZVNlbGVjdGlvbic7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuXG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSkgPT4ge1xuICBjb25zdCB7XG4gICAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgc2VsZWN0ZWRNaWNyb3Bob25lLFxuICAgIHNlbGVjdGVkU3BlYWtlcixcbiAgICBhdmFpbGFibGVDYW1lcmFzLFxuICAgIHNlbGVjdGVkQ2FtZXJhLFxuICB9ID0gc3RhdGUuY2FsbGluZztcblxuICByZXR1cm4ge1xuICAgIGF2YWlsYWJsZUNhbWVyYXMsXG4gICAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgc2VsZWN0ZWRDYW1lcmEsXG4gICAgc2VsZWN0ZWRNaWNyb3Bob25lLFxuICAgIHNlbGVjdGVkU3BlYWtlcixcbiAgfTtcbn07XG5cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydENhbGxpbmdEZXZpY2VTZWxlY3Rpb24gPSBzbWFydChDYWxsaW5nRGV2aWNlU2VsZWN0aW9uKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBQ25DLG9DQUF1QztBQUd2QyxrQkFBd0I7QUFFeEIsTUFBTSxrQkFBa0Isd0JBQUMsVUFBcUI7QUFDNUMsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUVWLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsR0FuQndCO0FBcUJ4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLDhCQUE4QixNQUFNLG9EQUFzQjsiLAogICJuYW1lcyI6IFtdCn0K
