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
var CallingDeviceSelection_exports = {};
__export(CallingDeviceSelection_exports, {
  CallingDeviceSelection: () => CallingDeviceSelection
});
module.exports = __toCommonJS(CallingDeviceSelection_exports);
var React = __toESM(require("react"));
var import_Modal = require("./Modal");
var import_Calling = require("../types/Calling");
var import_theme = require("../util/theme");
function localizeDefault(i18n, deviceLabel) {
  return deviceLabel.toLowerCase().startsWith("default") ? deviceLabel.replace(/default/i, i18n("callingDeviceSelection__select--default")) : deviceLabel;
}
function renderAudioOptions(devices, i18n, selectedDevice) {
  if (!devices.length) {
    return /* @__PURE__ */ React.createElement("option", {
      "aria-selected": true
    }, i18n("callingDeviceSelection__select--no-device"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, devices.map((device) => {
    const isSelected = selectedDevice && selectedDevice.index === device.index;
    return /* @__PURE__ */ React.createElement("option", {
      "aria-selected": isSelected,
      key: device.index,
      value: device.index
    }, localizeDefault(i18n, device.name));
  }));
}
function renderVideoOptions(devices, i18n, selectedCamera) {
  if (!devices.length) {
    return /* @__PURE__ */ React.createElement("option", {
      "aria-selected": true
    }, i18n("callingDeviceSelection__select--no-device"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, devices.map((device) => {
    const isSelected = selectedCamera === device.deviceId;
    return /* @__PURE__ */ React.createElement("option", {
      "aria-selected": isSelected,
      key: device.deviceId,
      value: device.deviceId
    }, localizeDefault(i18n, device.label));
  }));
}
function createAudioChangeHandler(devices, changeIODevice, type) {
  return (ev) => {
    changeIODevice({
      type,
      selectedDevice: devices[Number(ev.currentTarget.value)]
    });
  };
}
function createCameraChangeHandler(changeIODevice) {
  return (ev) => {
    changeIODevice({
      type: import_Calling.CallingDeviceType.CAMERA,
      selectedDevice: String(ev.currentTarget.value)
    });
  };
}
const CallingDeviceSelection = /* @__PURE__ */ __name(({
  availableCameras,
  availableMicrophones,
  availableSpeakers,
  changeIODevice,
  i18n,
  selectedCamera,
  selectedMicrophone,
  selectedSpeaker,
  toggleSettings
}) => {
  const selectedMicrophoneIndex = selectedMicrophone ? selectedMicrophone.index : void 0;
  const selectedSpeakerIndex = selectedSpeaker ? selectedSpeaker.index : void 0;
  return /* @__PURE__ */ React.createElement(import_Modal.Modal, {
    i18n,
    theme: import_theme.Theme.Dark,
    onClose: toggleSettings
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-calling-device-selection"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "module-calling-device-selection__close-button",
    onClick: toggleSettings,
    tabIndex: 0,
    "aria-label": i18n("close")
  })), /* @__PURE__ */ React.createElement("h1", {
    className: "module-calling-device-selection__title"
  }, i18n("callingDeviceSelection__settings")), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "video",
    className: "module-calling-device-selection__label"
  }, i18n("callingDeviceSelection__label--video")), /* @__PURE__ */ React.createElement("div", {
    className: "module-calling-device-selection__select"
  }, /* @__PURE__ */ React.createElement("select", {
    disabled: !availableCameras.length,
    name: "video",
    onChange: createCameraChangeHandler(changeIODevice),
    value: selectedCamera
  }, renderVideoOptions(availableCameras, i18n, selectedCamera))), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "audio-input",
    className: "module-calling-device-selection__label"
  }, i18n("callingDeviceSelection__label--audio-input")), /* @__PURE__ */ React.createElement("div", {
    className: "module-calling-device-selection__select"
  }, /* @__PURE__ */ React.createElement("select", {
    disabled: !availableMicrophones.length,
    name: "audio-input",
    onChange: createAudioChangeHandler(availableMicrophones, changeIODevice, import_Calling.CallingDeviceType.MICROPHONE),
    value: selectedMicrophoneIndex
  }, renderAudioOptions(availableMicrophones, i18n, selectedMicrophone))), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "audio-output",
    className: "module-calling-device-selection__label"
  }, i18n("callingDeviceSelection__label--audio-output")), /* @__PURE__ */ React.createElement("div", {
    className: "module-calling-device-selection__select"
  }, /* @__PURE__ */ React.createElement("select", {
    disabled: !availableSpeakers.length,
    name: "audio-output",
    onChange: createAudioChangeHandler(availableSpeakers, changeIODevice, import_Calling.CallingDeviceType.SPEAKER),
    value: selectedSpeakerIndex
  }, renderAudioOptions(availableSpeakers, i18n, selectedSpeaker))));
}, "CallingDeviceSelection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingDeviceSelection
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0RldmljZVNlbGVjdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEF1ZGlvRGV2aWNlIH0gZnJvbSAncmluZ3J0Yyc7XG5cbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHtcbiAgQ2hhbmdlSU9EZXZpY2VQYXlsb2FkVHlwZSxcbiAgTWVkaWFEZXZpY2VTZXR0aW5ncyxcbn0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgeyBDYWxsaW5nRGV2aWNlVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgVGhlbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBNZWRpYURldmljZVNldHRpbmdzICYge1xuICBjaGFuZ2VJT0RldmljZTogKHBheWxvYWQ6IENoYW5nZUlPRGV2aWNlUGF5bG9hZFR5cGUpID0+IHZvaWQ7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRvZ2dsZVNldHRpbmdzOiAoKSA9PiB2b2lkO1xufTtcblxuZnVuY3Rpb24gbG9jYWxpemVEZWZhdWx0KGkxOG46IExvY2FsaXplclR5cGUsIGRldmljZUxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZGV2aWNlTGFiZWwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdkZWZhdWx0JylcbiAgICA/IGRldmljZUxhYmVsLnJlcGxhY2UoXG4gICAgICAgIC9kZWZhdWx0L2ksXG4gICAgICAgIGkxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX3NlbGVjdC0tZGVmYXVsdCcpXG4gICAgICApXG4gICAgOiBkZXZpY2VMYWJlbDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQXVkaW9PcHRpb25zKFxuICBkZXZpY2VzOiBBcnJheTxBdWRpb0RldmljZT4sXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIHNlbGVjdGVkRGV2aWNlOiBBdWRpb0RldmljZSB8IHVuZGVmaW5lZFxuKTogSlNYLkVsZW1lbnQge1xuICBpZiAoIWRldmljZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxvcHRpb24gYXJpYS1zZWxlY3RlZD5cbiAgICAgICAge2kxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX3NlbGVjdC0tbm8tZGV2aWNlJyl9XG4gICAgICA8L29wdGlvbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2RldmljZXMubWFwKChkZXZpY2U6IEF1ZGlvRGV2aWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPVxuICAgICAgICAgIHNlbGVjdGVkRGV2aWNlICYmIHNlbGVjdGVkRGV2aWNlLmluZGV4ID09PSBkZXZpY2UuaW5kZXg7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNTZWxlY3RlZH1cbiAgICAgICAgICAgIGtleT17ZGV2aWNlLmluZGV4fVxuICAgICAgICAgICAgdmFsdWU9e2RldmljZS5pbmRleH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bG9jYWxpemVEZWZhdWx0KGkxOG4sIGRldmljZS5uYW1lKX1cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufVxuXG5mdW5jdGlvbiByZW5kZXJWaWRlb09wdGlvbnMoXG4gIGRldmljZXM6IEFycmF5PE1lZGlhRGV2aWNlSW5mbz4sXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIHNlbGVjdGVkQ2FtZXJhOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IEpTWC5FbGVtZW50IHtcbiAgaWYgKCFkZXZpY2VzLmxlbmd0aCkge1xuICAgIHJldHVybiAoXG4gICAgICA8b3B0aW9uIGFyaWEtc2VsZWN0ZWQ+XG4gICAgICAgIHtpMThuKCdjYWxsaW5nRGV2aWNlU2VsZWN0aW9uX19zZWxlY3QtLW5vLWRldmljZScpfVxuICAgICAgPC9vcHRpb24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtkZXZpY2VzLm1hcCgoZGV2aWNlOiBNZWRpYURldmljZUluZm8pID0+IHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkQ2FtZXJhID09PSBkZXZpY2UuZGV2aWNlSWQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc1NlbGVjdGVkfVxuICAgICAgICAgICAga2V5PXtkZXZpY2UuZGV2aWNlSWR9XG4gICAgICAgICAgICB2YWx1ZT17ZGV2aWNlLmRldmljZUlkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsb2NhbGl6ZURlZmF1bHQoaTE4biwgZGV2aWNlLmxhYmVsKX1cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBdWRpb0NoYW5nZUhhbmRsZXIoXG4gIGRldmljZXM6IEFycmF5PEF1ZGlvRGV2aWNlPixcbiAgY2hhbmdlSU9EZXZpY2U6IChwYXlsb2FkOiBDaGFuZ2VJT0RldmljZVBheWxvYWRUeXBlKSA9PiB2b2lkLFxuICB0eXBlOiBDYWxsaW5nRGV2aWNlVHlwZS5TUEVBS0VSIHwgQ2FsbGluZ0RldmljZVR5cGUuTUlDUk9QSE9ORVxuKSB7XG4gIHJldHVybiAoZXY6IFJlYWN0LkZvcm1FdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICBjaGFuZ2VJT0RldmljZSh7XG4gICAgICB0eXBlLFxuICAgICAgc2VsZWN0ZWREZXZpY2U6IGRldmljZXNbTnVtYmVyKGV2LmN1cnJlbnRUYXJnZXQudmFsdWUpXSxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FtZXJhQ2hhbmdlSGFuZGxlcihcbiAgY2hhbmdlSU9EZXZpY2U6IChwYXlsb2FkOiBDaGFuZ2VJT0RldmljZVBheWxvYWRUeXBlKSA9PiB2b2lkXG4pIHtcbiAgcmV0dXJuIChldjogUmVhY3QuRm9ybUV2ZW50PEhUTUxTZWxlY3RFbGVtZW50Pik6IHZvaWQgPT4ge1xuICAgIGNoYW5nZUlPRGV2aWNlKHtcbiAgICAgIHR5cGU6IENhbGxpbmdEZXZpY2VUeXBlLkNBTUVSQSxcbiAgICAgIHNlbGVjdGVkRGV2aWNlOiBTdHJpbmcoZXYuY3VycmVudFRhcmdldC52YWx1ZSksXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBDYWxsaW5nRGV2aWNlU2VsZWN0aW9uID0gKHtcbiAgYXZhaWxhYmxlQ2FtZXJhcyxcbiAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gIGF2YWlsYWJsZVNwZWFrZXJzLFxuICBjaGFuZ2VJT0RldmljZSxcbiAgaTE4bixcbiAgc2VsZWN0ZWRDYW1lcmEsXG4gIHNlbGVjdGVkTWljcm9waG9uZSxcbiAgc2VsZWN0ZWRTcGVha2VyLFxuICB0b2dnbGVTZXR0aW5ncyxcbn06IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBzZWxlY3RlZE1pY3JvcGhvbmVJbmRleCA9IHNlbGVjdGVkTWljcm9waG9uZVxuICAgID8gc2VsZWN0ZWRNaWNyb3Bob25lLmluZGV4XG4gICAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNlbGVjdGVkU3BlYWtlckluZGV4ID0gc2VsZWN0ZWRTcGVha2VyXG4gICAgPyBzZWxlY3RlZFNwZWFrZXIuaW5kZXhcbiAgICA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbCBpMThuPXtpMThufSB0aGVtZT17VGhlbWUuRGFya30gb25DbG9zZT17dG9nZ2xlU2V0dGluZ3N9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZy1kZXZpY2Utc2VsZWN0aW9uXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZy1kZXZpY2Utc2VsZWN0aW9uX19jbG9zZS1idXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVNldHRpbmdzfVxuICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Nsb3NlJyl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGgxIGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLWRldmljZS1zZWxlY3Rpb25fX3RpdGxlXCI+XG4gICAgICAgIHtpMThuKCdjYWxsaW5nRGV2aWNlU2VsZWN0aW9uX19zZXR0aW5ncycpfVxuICAgICAgPC9oMT5cblxuICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ2aWRlb1wiIGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLWRldmljZS1zZWxlY3Rpb25fX2xhYmVsXCI+XG4gICAgICAgIHtpMThuKCdjYWxsaW5nRGV2aWNlU2VsZWN0aW9uX19sYWJlbC0tdmlkZW8nKX1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLWRldmljZS1zZWxlY3Rpb25fX3NlbGVjdFwiPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgZGlzYWJsZWQ9eyFhdmFpbGFibGVDYW1lcmFzLmxlbmd0aH1cbiAgICAgICAgICBuYW1lPVwidmlkZW9cIlxuICAgICAgICAgIG9uQ2hhbmdlPXtjcmVhdGVDYW1lcmFDaGFuZ2VIYW5kbGVyKGNoYW5nZUlPRGV2aWNlKX1cbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDYW1lcmF9XG4gICAgICAgID5cbiAgICAgICAgICB7cmVuZGVyVmlkZW9PcHRpb25zKGF2YWlsYWJsZUNhbWVyYXMsIGkxOG4sIHNlbGVjdGVkQ2FtZXJhKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGxhYmVsXG4gICAgICAgIGh0bWxGb3I9XCJhdWRpby1pbnB1dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLWRldmljZS1zZWxlY3Rpb25fX2xhYmVsXCJcbiAgICAgID5cbiAgICAgICAge2kxOG4oJ2NhbGxpbmdEZXZpY2VTZWxlY3Rpb25fX2xhYmVsLS1hdWRpby1pbnB1dCcpfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctZGV2aWNlLXNlbGVjdGlvbl9fc2VsZWN0XCI+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBkaXNhYmxlZD17IWF2YWlsYWJsZU1pY3JvcGhvbmVzLmxlbmd0aH1cbiAgICAgICAgICBuYW1lPVwiYXVkaW8taW5wdXRcIlxuICAgICAgICAgIG9uQ2hhbmdlPXtjcmVhdGVBdWRpb0NoYW5nZUhhbmRsZXIoXG4gICAgICAgICAgICBhdmFpbGFibGVNaWNyb3Bob25lcyxcbiAgICAgICAgICAgIGNoYW5nZUlPRGV2aWNlLFxuICAgICAgICAgICAgQ2FsbGluZ0RldmljZVR5cGUuTUlDUk9QSE9ORVxuICAgICAgICAgICl9XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkTWljcm9waG9uZUluZGV4fVxuICAgICAgICA+XG4gICAgICAgICAge3JlbmRlckF1ZGlvT3B0aW9ucyhhdmFpbGFibGVNaWNyb3Bob25lcywgaTE4biwgc2VsZWN0ZWRNaWNyb3Bob25lKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGxhYmVsXG4gICAgICAgIGh0bWxGb3I9XCJhdWRpby1vdXRwdXRcIlxuICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZy1kZXZpY2Utc2VsZWN0aW9uX19sYWJlbFwiXG4gICAgICA+XG4gICAgICAgIHtpMThuKCdjYWxsaW5nRGV2aWNlU2VsZWN0aW9uX19sYWJlbC0tYXVkaW8tb3V0cHV0Jyl9XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZy1kZXZpY2Utc2VsZWN0aW9uX19zZWxlY3RcIj5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGRpc2FibGVkPXshYXZhaWxhYmxlU3BlYWtlcnMubGVuZ3RofVxuICAgICAgICAgIG5hbWU9XCJhdWRpby1vdXRwdXRcIlxuICAgICAgICAgIG9uQ2hhbmdlPXtjcmVhdGVBdWRpb0NoYW5nZUhhbmRsZXIoXG4gICAgICAgICAgICBhdmFpbGFibGVTcGVha2VycyxcbiAgICAgICAgICAgIGNoYW5nZUlPRGV2aWNlLFxuICAgICAgICAgICAgQ2FsbGluZ0RldmljZVR5cGUuU1BFQUtFUlxuICAgICAgICAgICl9XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkU3BlYWtlckluZGV4fVxuICAgICAgICA+XG4gICAgICAgICAge3JlbmRlckF1ZGlvT3B0aW9ucyhhdmFpbGFibGVTcGVha2VycywgaTE4biwgc2VsZWN0ZWRTcGVha2VyKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L01vZGFsPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUd2QixtQkFBc0I7QUFNdEIscUJBQWtDO0FBQ2xDLG1CQUFzQjtBQVF0Qix5QkFBeUIsTUFBcUIsYUFBNkI7QUFDekUsU0FBTyxZQUFZLFlBQVksRUFBRSxXQUFXLFNBQVMsSUFDakQsWUFBWSxRQUNWLFlBQ0EsS0FBSyx5Q0FBeUMsQ0FDaEQsSUFDQTtBQUNOO0FBUFMsQUFTVCw0QkFDRSxTQUNBLE1BQ0EsZ0JBQ2E7QUFDYixN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
