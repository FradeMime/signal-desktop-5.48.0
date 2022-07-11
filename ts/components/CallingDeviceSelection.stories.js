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
var CallingDeviceSelection_stories_exports = {};
__export(CallingDeviceSelection_stories_exports, {
  AllDevices: () => AllDevices,
  Default: () => Default,
  DefaultDevices: () => DefaultDevices,
  SomeDevices: () => SomeDevices,
  default: () => CallingDeviceSelection_stories_default
});
module.exports = __toCommonJS(CallingDeviceSelection_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_CallingDeviceSelection = require("./CallingDeviceSelection");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const audioDevice = {
  name: "",
  index: 0,
  uniqueId: "",
  i18nKey: void 0
};
const createProps = /* @__PURE__ */ __name(({
  availableMicrophones = [],
  availableSpeakers = [],
  selectedMicrophone = audioDevice,
  selectedSpeaker = audioDevice,
  availableCameras = [],
  selectedCamera = ""
} = {}) => ({
  availableCameras,
  availableMicrophones,
  availableSpeakers,
  changeIODevice: (0, import_addon_actions.action)("change-io-device"),
  i18n,
  selectedCamera,
  selectedMicrophone,
  selectedSpeaker,
  toggleSettings: (0, import_addon_actions.action)("toggle-settings")
}), "createProps");
var CallingDeviceSelection_stories_default = {
  title: "Components/CallingDeviceSelection"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallingDeviceSelection.CallingDeviceSelection, {
    ...createProps()
  });
}, "Default");
const SomeDevices = /* @__PURE__ */ __name(() => {
  const availableSpeakers = [
    {
      name: "Default",
      index: 0,
      uniqueId: "Default",
      i18nKey: "default_communication_device"
    },
    {
      name: "Natalie's Airpods (Bluetooth)",
      index: 1,
      uniqueId: "aa"
    },
    {
      name: "UE Boom (Bluetooth)",
      index: 2,
      uniqueId: "bb"
    }
  ];
  const selectedSpeaker = availableSpeakers[0];
  const props = createProps({
    availableSpeakers,
    selectedSpeaker
  });
  return /* @__PURE__ */ React.createElement(import_CallingDeviceSelection.CallingDeviceSelection, {
    ...props
  });
}, "SomeDevices");
const DefaultDevices = /* @__PURE__ */ __name(() => {
  const availableSpeakers = [
    {
      name: "default (Headphones)",
      index: 0,
      uniqueId: "Default",
      i18nKey: "default_communication_device"
    }
  ];
  const selectedSpeaker = availableSpeakers[0];
  const availableMicrophones = [
    {
      name: "DefAuLt (Headphones)",
      index: 0,
      uniqueId: "Default",
      i18nKey: "default_communication_device"
    }
  ];
  const selectedMicrophone = availableMicrophones[0];
  const props = createProps({
    availableMicrophones,
    availableSpeakers,
    selectedMicrophone,
    selectedSpeaker
  });
  return /* @__PURE__ */ React.createElement(import_CallingDeviceSelection.CallingDeviceSelection, {
    ...props
  });
}, "DefaultDevices");
const AllDevices = /* @__PURE__ */ __name(() => {
  const availableSpeakers = [
    {
      name: "Default",
      index: 0,
      uniqueId: "Default",
      i18nKey: "default_communication_device"
    },
    {
      name: "Natalie's Airpods (Bluetooth)",
      index: 1,
      uniqueId: "aa"
    },
    {
      name: "UE Boom (Bluetooth)",
      index: 2,
      uniqueId: "bb"
    }
  ];
  const selectedSpeaker = availableSpeakers[0];
  const availableMicrophones = [
    {
      name: "Default",
      index: 0,
      uniqueId: "Default",
      i18nKey: "default_communication_device"
    },
    {
      name: "Natalie's Airpods (Bluetooth)",
      index: 1,
      uniqueId: "aa"
    }
  ];
  const selectedMicrophone = availableMicrophones[0];
  const availableCameras = [
    {
      deviceId: "dfbe6effe70b0611ba0fdc2a9ea3f39f6cb110e6687948f7e5f016c111b7329c",
      groupId: "63ee218d2446869e40adfc958ff98263e51f74382b0143328ee4826f20a76f47",
      kind: "videoinput",
      label: "FaceTime HD Camera (Built-in) (9fba:bced)",
      toJSON() {
        return "";
      }
    },
    {
      deviceId: "e2db196a31d50ff9b135299dc0beea67f65b1a25a06d8a4ce76976751bb7a08d",
      groupId: "218ba7f00d7b1239cca15b9116769e5e7d30cc01104ebf84d667643661e0ecf9",
      kind: "videoinput",
      label: "Logitech Webcam (4e72:9058)",
      toJSON() {
        return "";
      }
    }
  ];
  const selectedCamera = "dfbe6effe70b0611ba0fdc2a9ea3f39f6cb110e6687948f7e5f016c111b7329c";
  const props = createProps({
    availableCameras,
    availableMicrophones,
    availableSpeakers,
    selectedCamera,
    selectedMicrophone,
    selectedSpeaker
  });
  return /* @__PURE__ */ React.createElement(import_CallingDeviceSelection.CallingDeviceSelection, {
    ...props
  });
}, "AllDevices");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllDevices,
  Default,
  DefaultDevices,
  SomeDevices
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0RldmljZVNlbGVjdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9DYWxsaW5nRGV2aWNlU2VsZWN0aW9uJztcbmltcG9ydCB7IENhbGxpbmdEZXZpY2VTZWxlY3Rpb24gfSBmcm9tICcuL0NhbGxpbmdEZXZpY2VTZWxlY3Rpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGF1ZGlvRGV2aWNlID0ge1xuICBuYW1lOiAnJyxcbiAgaW5kZXg6IDAsXG4gIHVuaXF1ZUlkOiAnJyxcbiAgaTE4bktleTogdW5kZWZpbmVkLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoe1xuICBhdmFpbGFibGVNaWNyb3Bob25lcyA9IFtdLFxuICBhdmFpbGFibGVTcGVha2VycyA9IFtdLFxuICBzZWxlY3RlZE1pY3JvcGhvbmUgPSBhdWRpb0RldmljZSxcbiAgc2VsZWN0ZWRTcGVha2VyID0gYXVkaW9EZXZpY2UsXG4gIGF2YWlsYWJsZUNhbWVyYXMgPSBbXSxcbiAgc2VsZWN0ZWRDYW1lcmEgPSAnJyxcbn06IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBhdmFpbGFibGVDYW1lcmFzLFxuICBhdmFpbGFibGVNaWNyb3Bob25lcyxcbiAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gIGNoYW5nZUlPRGV2aWNlOiBhY3Rpb24oJ2NoYW5nZS1pby1kZXZpY2UnKSxcbiAgaTE4bixcbiAgc2VsZWN0ZWRDYW1lcmEsXG4gIHNlbGVjdGVkTWljcm9waG9uZSxcbiAgc2VsZWN0ZWRTcGVha2VyLFxuICB0b2dnbGVTZXR0aW5nczogYWN0aW9uKCd0b2dnbGUtc2V0dGluZ3MnKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DYWxsaW5nRGV2aWNlU2VsZWN0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxDYWxsaW5nRGV2aWNlU2VsZWN0aW9uIHsuLi5jcmVhdGVQcm9wcygpfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTb21lRGV2aWNlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF2YWlsYWJsZVNwZWFrZXJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdEZWZhdWx0JyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgdW5pcXVlSWQ6ICdEZWZhdWx0JyxcbiAgICAgIGkxOG5LZXk6ICdkZWZhdWx0X2NvbW11bmljYXRpb25fZGV2aWNlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiTmF0YWxpZSdzIEFpcnBvZHMgKEJsdWV0b290aClcIixcbiAgICAgIGluZGV4OiAxLFxuICAgICAgdW5pcXVlSWQ6ICdhYScsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnVUUgQm9vbSAoQmx1ZXRvb3RoKScsXG4gICAgICBpbmRleDogMixcbiAgICAgIHVuaXF1ZUlkOiAnYmInLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IHNlbGVjdGVkU3BlYWtlciA9IGF2YWlsYWJsZVNwZWFrZXJzWzBdO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF2YWlsYWJsZVNwZWFrZXJzLFxuICAgIHNlbGVjdGVkU3BlYWtlcixcbiAgfSk7XG5cbiAgcmV0dXJuIDxDYWxsaW5nRGV2aWNlU2VsZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdERldmljZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBhdmFpbGFibGVTcGVha2VycyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnZGVmYXVsdCAoSGVhZHBob25lcyknLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICB1bmlxdWVJZDogJ0RlZmF1bHQnLFxuICAgICAgaTE4bktleTogJ2RlZmF1bHRfY29tbXVuaWNhdGlvbl9kZXZpY2UnLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IHNlbGVjdGVkU3BlYWtlciA9IGF2YWlsYWJsZVNwZWFrZXJzWzBdO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU1pY3JvcGhvbmVzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdEZWZBdUx0IChIZWFkcGhvbmVzKScsXG4gICAgICBpbmRleDogMCxcbiAgICAgIHVuaXF1ZUlkOiAnRGVmYXVsdCcsXG4gICAgICBpMThuS2V5OiAnZGVmYXVsdF9jb21tdW5pY2F0aW9uX2RldmljZScsXG4gICAgfSxcbiAgXTtcbiAgY29uc3Qgc2VsZWN0ZWRNaWNyb3Bob25lID0gYXZhaWxhYmxlTWljcm9waG9uZXNbMF07XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgc2VsZWN0ZWRNaWNyb3Bob25lLFxuICAgIHNlbGVjdGVkU3BlYWtlcixcbiAgfSk7XG5cbiAgcmV0dXJuIDxDYWxsaW5nRGV2aWNlU2VsZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQWxsRGV2aWNlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF2YWlsYWJsZVNwZWFrZXJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdEZWZhdWx0JyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgdW5pcXVlSWQ6ICdEZWZhdWx0JyxcbiAgICAgIGkxOG5LZXk6ICdkZWZhdWx0X2NvbW11bmljYXRpb25fZGV2aWNlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiTmF0YWxpZSdzIEFpcnBvZHMgKEJsdWV0b290aClcIixcbiAgICAgIGluZGV4OiAxLFxuICAgICAgdW5pcXVlSWQ6ICdhYScsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnVUUgQm9vbSAoQmx1ZXRvb3RoKScsXG4gICAgICBpbmRleDogMixcbiAgICAgIHVuaXF1ZUlkOiAnYmInLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IHNlbGVjdGVkU3BlYWtlciA9IGF2YWlsYWJsZVNwZWFrZXJzWzBdO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU1pY3JvcGhvbmVzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdEZWZhdWx0JyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgdW5pcXVlSWQ6ICdEZWZhdWx0JyxcbiAgICAgIGkxOG5LZXk6ICdkZWZhdWx0X2NvbW11bmljYXRpb25fZGV2aWNlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiTmF0YWxpZSdzIEFpcnBvZHMgKEJsdWV0b290aClcIixcbiAgICAgIGluZGV4OiAxLFxuICAgICAgdW5pcXVlSWQ6ICdhYScsXG4gICAgfSxcbiAgXTtcbiAgY29uc3Qgc2VsZWN0ZWRNaWNyb3Bob25lID0gYXZhaWxhYmxlTWljcm9waG9uZXNbMF07XG5cbiAgY29uc3QgYXZhaWxhYmxlQ2FtZXJhcyA9IFtcbiAgICB7XG4gICAgICBkZXZpY2VJZDpcbiAgICAgICAgJ2RmYmU2ZWZmZTcwYjA2MTFiYTBmZGMyYTllYTNmMzlmNmNiMTEwZTY2ODc5NDhmN2U1ZjAxNmMxMTFiNzMyOWMnLFxuICAgICAgZ3JvdXBJZDpcbiAgICAgICAgJzYzZWUyMThkMjQ0Njg2OWU0MGFkZmM5NThmZjk4MjYzZTUxZjc0MzgyYjAxNDMzMjhlZTQ4MjZmMjBhNzZmNDcnLFxuICAgICAga2luZDogJ3ZpZGVvaW5wdXQnIGFzIE1lZGlhRGV2aWNlS2luZCxcbiAgICAgIGxhYmVsOiAnRmFjZVRpbWUgSEQgQ2FtZXJhIChCdWlsdC1pbikgKDlmYmE6YmNlZCknLFxuICAgICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZGV2aWNlSWQ6XG4gICAgICAgICdlMmRiMTk2YTMxZDUwZmY5YjEzNTI5OWRjMGJlZWE2N2Y2NWIxYTI1YTA2ZDhhNGNlNzY5NzY3NTFiYjdhMDhkJyxcbiAgICAgIGdyb3VwSWQ6XG4gICAgICAgICcyMThiYTdmMDBkN2IxMjM5Y2NhMTViOTExNjc2OWU1ZTdkMzBjYzAxMTA0ZWJmODRkNjY3NjQzNjYxZTBlY2Y5JyxcbiAgICAgIGtpbmQ6ICd2aWRlb2lucHV0JyBhcyBNZWRpYURldmljZUtpbmQsXG4gICAgICBsYWJlbDogJ0xvZ2l0ZWNoIFdlYmNhbSAoNGU3Mjo5MDU4KScsXG4gICAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0sXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBzZWxlY3RlZENhbWVyYSA9XG4gICAgJ2RmYmU2ZWZmZTcwYjA2MTFiYTBmZGMyYTllYTNmMzlmNmNiMTEwZTY2ODc5NDhmN2U1ZjAxNmMxMTFiNzMyOWMnO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGF2YWlsYWJsZUNhbWVyYXMsXG4gICAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgc2VsZWN0ZWRDYW1lcmEsXG4gICAgc2VsZWN0ZWRNaWNyb3Bob25lLFxuICAgIHNlbGVjdGVkU3BlYWtlcixcbiAgfSk7XG5cbiAgcmV0dXJuIDxDYWxsaW5nRGV2aWNlU2VsZWN0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdz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
