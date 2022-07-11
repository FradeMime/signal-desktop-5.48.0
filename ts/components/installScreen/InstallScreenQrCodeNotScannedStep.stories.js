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
var InstallScreenQrCodeNotScannedStep_stories_exports = {};
__export(InstallScreenQrCodeNotScannedStep_stories_exports, {
  QrCodeFailedToLoad: () => QrCodeFailedToLoad,
  QrCodeLoaded: () => QrCodeLoaded,
  QrCodeLoading: () => QrCodeLoading,
  SimulatedFailure: () => SimulatedFailure,
  SimulatedLoading: () => SimulatedLoading,
  default: () => InstallScreenQrCodeNotScannedStep_stories_default
});
module.exports = __toCommonJS(InstallScreenQrCodeNotScannedStep_stories_exports);
var import_react = __toESM(require("react"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_loadable = require("../../util/loadable");
var import_InstallScreenQrCodeNotScannedStep = require("./InstallScreenQrCodeNotScannedStep");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var InstallScreenQrCodeNotScannedStep_stories_default = {
  title: "Components/InstallScreen/InstallScreenQrCodeNotScannedStep"
};
const Simulation = /* @__PURE__ */ __name(({ finalResult }) => {
  const [provisioningUrl, setProvisioningUrl] = (0, import_react.useState)({
    loadingState: import_loadable.LoadingState.Loading
  });
  (0, import_react.useEffect)(() => {
    const timeout = setTimeout(() => {
      setProvisioningUrl(finalResult);
    }, 2e3);
    return () => {
      clearTimeout(timeout);
    };
  }, [finalResult]);
  return /* @__PURE__ */ import_react.default.createElement(import_InstallScreenQrCodeNotScannedStep.InstallScreenQrCodeNotScannedStep, {
    i18n,
    provisioningUrl
  });
}, "Simulation");
const QrCodeLoading = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenQrCodeNotScannedStep.InstallScreenQrCodeNotScannedStep, {
  i18n,
  provisioningUrl: {
    loadingState: import_loadable.LoadingState.Loading
  }
}), "QrCodeLoading");
QrCodeLoading.story = {
  name: "QR code loading"
};
const QrCodeFailedToLoad = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenQrCodeNotScannedStep.InstallScreenQrCodeNotScannedStep, {
  i18n,
  provisioningUrl: {
    loadingState: import_loadable.LoadingState.LoadFailed,
    error: new Error("uh oh")
  }
}), "QrCodeFailedToLoad");
QrCodeFailedToLoad.story = {
  name: "QR code failed to load"
};
const QrCodeLoaded = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenQrCodeNotScannedStep.InstallScreenQrCodeNotScannedStep, {
  i18n,
  provisioningUrl: {
    loadingState: import_loadable.LoadingState.Loaded,
    value: "https://example.com/fake-signal-link?uuid=56cdd548-e595-4962-9a27-3f1e8210a959&pub_key=SW4gdGhlIHZhc3QsIGRlZXAgZm9yZXN0IG9mIEh5cnVsZS4uLg%3D%3D"
  }
}), "QrCodeLoaded");
QrCodeLoaded.story = {
  name: "QR code loaded"
};
const SimulatedLoading = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Simulation, {
  finalResult: {
    loadingState: import_loadable.LoadingState.Loaded,
    value: "https://example.com/fake-signal-link?uuid=56cdd548-e595-4962-9a27-3f1e8210a959&pub_key=SW4gdGhlIHZhc3QsIGRlZXAgZm9yZXN0IG9mIEh5cnVsZS4uLg%3D%3D"
  }
}), "SimulatedLoading");
SimulatedLoading.story = {
  name: "Simulated loading"
};
const SimulatedFailure = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Simulation, {
  finalResult: {
    loadingState: import_loadable.LoadingState.LoadFailed,
    error: new Error("uh oh")
  }
}), "SimulatedFailure");
SimulatedFailure.story = {
  name: "Simulated failure"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QrCodeFailedToLoad,
  QrCodeLoaded,
  QrCodeLoading,
  SimulatedFailure,
  SimulatedLoading
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHR5cGUgeyBMb2FkYWJsZSB9IGZyb20gJy4uLy4uL3V0aWwvbG9hZGFibGUnO1xuaW1wb3J0IHsgTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vLi4vdXRpbC9sb2FkYWJsZSc7XG5pbXBvcnQgeyBJbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXAgfSBmcm9tICcuL0luc3RhbGxTY3JlZW5RckNvZGVOb3RTY2FubmVkU3RlcCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0luc3RhbGxTY3JlZW4vSW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwJyxcbn07XG5cbmNvbnN0IFNpbXVsYXRpb24gPSAoeyBmaW5hbFJlc3VsdCB9OiB7IGZpbmFsUmVzdWx0OiBMb2FkYWJsZTxzdHJpbmc+IH0pID0+IHtcbiAgY29uc3QgW3Byb3Zpc2lvbmluZ1VybCwgc2V0UHJvdmlzaW9uaW5nVXJsXSA9IHVzZVN0YXRlPExvYWRhYmxlPHN0cmluZz4+KHtcbiAgICBsb2FkaW5nU3RhdGU6IExvYWRpbmdTdGF0ZS5Mb2FkaW5nLFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFByb3Zpc2lvbmluZ1VybChmaW5hbFJlc3VsdCk7XG4gICAgfSwgMjAwMCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9O1xuICB9LCBbZmluYWxSZXN1bHRdKTtcblxuICByZXR1cm4gKFxuICAgIDxJbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXBcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBwcm92aXNpb25pbmdVcmw9e3Byb3Zpc2lvbmluZ1VybH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFFyQ29kZUxvYWRpbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8SW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwXG4gICAgaTE4bj17aTE4bn1cbiAgICBwcm92aXNpb25pbmdVcmw9e3tcbiAgICAgIGxvYWRpbmdTdGF0ZTogTG9hZGluZ1N0YXRlLkxvYWRpbmcsXG4gICAgfX1cbiAgLz5cbik7XG5cblFyQ29kZUxvYWRpbmcuc3RvcnkgPSB7XG4gIG5hbWU6ICdRUiBjb2RlIGxvYWRpbmcnLFxufTtcblxuZXhwb3J0IGNvbnN0IFFyQ29kZUZhaWxlZFRvTG9hZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxJbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXBcbiAgICBpMThuPXtpMThufVxuICAgIHByb3Zpc2lvbmluZ1VybD17e1xuICAgICAgbG9hZGluZ1N0YXRlOiBMb2FkaW5nU3RhdGUuTG9hZEZhaWxlZCxcbiAgICAgIGVycm9yOiBuZXcgRXJyb3IoJ3VoIG9oJyksXG4gICAgfX1cbiAgLz5cbik7XG5cblFyQ29kZUZhaWxlZFRvTG9hZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1FSIGNvZGUgZmFpbGVkIHRvIGxvYWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFFyQ29kZUxvYWRlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxJbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXBcbiAgICBpMThuPXtpMThufVxuICAgIHByb3Zpc2lvbmluZ1VybD17e1xuICAgICAgbG9hZGluZ1N0YXRlOiBMb2FkaW5nU3RhdGUuTG9hZGVkLFxuICAgICAgdmFsdWU6XG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2Zha2Utc2lnbmFsLWxpbms/dXVpZD01NmNkZDU0OC1lNTk1LTQ5NjItOWEyNy0zZjFlODIxMGE5NTkmcHViX2tleT1TVzRnZEdobElIWmhjM1FzSUdSbFpYQWdabTl5WlhOMElHOW1JRWg1Y25Wc1pTNHVMZyUzRCUzRCcsXG4gICAgfX1cbiAgLz5cbik7XG5cblFyQ29kZUxvYWRlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1FSIGNvZGUgbG9hZGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTaW11bGF0ZWRMb2FkaW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFNpbXVsYXRpb25cbiAgICBmaW5hbFJlc3VsdD17e1xuICAgICAgbG9hZGluZ1N0YXRlOiBMb2FkaW5nU3RhdGUuTG9hZGVkLFxuICAgICAgdmFsdWU6XG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2Zha2Utc2lnbmFsLWxpbms/dXVpZD01NmNkZDU0OC1lNTk1LTQ5NjItOWEyNy0zZjFlODIxMGE5NTkmcHViX2tleT1TVzRnZEdobElIWmhjM1FzSUdSbFpYQWdabTl5WlhOMElHOW1JRWg1Y25Wc1pTNHVMZyUzRCUzRCcsXG4gICAgfX1cbiAgLz5cbik7XG5cblNpbXVsYXRlZExvYWRpbmcuc3RvcnkgPSB7XG4gIG5hbWU6ICdTaW11bGF0ZWQgbG9hZGluZycsXG59O1xuXG5leHBvcnQgY29uc3QgU2ltdWxhdGVkRmFpbHVyZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTaW11bGF0aW9uXG4gICAgZmluYWxSZXN1bHQ9e3tcbiAgICAgIGxvYWRpbmdTdGF0ZTogTG9hZGluZ1N0YXRlLkxvYWRGYWlsZWQsXG4gICAgICBlcnJvcjogbmV3IEVycm9yKCd1aCBvaCcpLFxuICAgIH19XG4gIC8+XG4pO1xuXG5TaW11bGF0ZWRGYWlsdXJlLnN0b3J5ID0ge1xuICBuYW1lOiAnU2ltdWxhdGVkIGZhaWx1cmUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQTJDO0FBRTNDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFHdkIsc0JBQTZCO0FBQzdCLCtDQUFrRDtBQUVsRCxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLG9EQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGFBQWEsd0JBQUMsRUFBRSxrQkFBcUQ7QUFDekUsUUFBTSxDQUFDLGlCQUFpQixzQkFBc0IsMkJBQTJCO0FBQUEsSUFDdkUsY0FBYyw2QkFBYTtBQUFBLEVBQzdCLENBQUM7QUFFRCw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxVQUFVLFdBQVcsTUFBTTtBQUMvQix5QkFBbUIsV0FBVztBQUFBLElBQ2hDLEdBQUcsR0FBSTtBQUNQLFdBQU8sTUFBTTtBQUNYLG1CQUFhLE9BQU87QUFBQSxJQUN0QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUVoQixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxHQUNGO0FBRUosR0FwQm1CO0FBc0JaLE1BQU0sZ0JBQWdCLDZCQUMzQixtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2YsY0FBYyw2QkFBYTtBQUFBLEVBQzdCO0FBQUEsQ0FDRixHQU4yQjtBQVM3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHFCQUFxQiw2QkFDaEMsbURBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmLGNBQWMsNkJBQWE7QUFBQSxJQUMzQixPQUFPLElBQUksTUFBTSxPQUFPO0FBQUEsRUFDMUI7QUFBQSxDQUNGLEdBUGdDO0FBVWxDLG1CQUFtQixRQUFRO0FBQUEsRUFDekIsTUFBTTtBQUNSO0FBRU8sTUFBTSxlQUFlLDZCQUMxQixtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2YsY0FBYyw2QkFBYTtBQUFBLElBQzNCLE9BQ0U7QUFBQSxFQUNKO0FBQUEsQ0FDRixHQVIwQjtBQVc1QixhQUFhLFFBQVE7QUFBQSxFQUNuQixNQUFNO0FBQ1I7QUFFTyxNQUFNLG1CQUFtQiw2QkFDOUIsbURBQUM7QUFBQSxFQUNDLGFBQWE7QUFBQSxJQUNYLGNBQWMsNkJBQWE7QUFBQSxJQUMzQixPQUNFO0FBQUEsRUFDSjtBQUFBLENBQ0YsR0FQOEI7QUFVaEMsaUJBQWlCLFFBQVE7QUFBQSxFQUN2QixNQUFNO0FBQ1I7QUFFTyxNQUFNLG1CQUFtQiw2QkFDOUIsbURBQUM7QUFBQSxFQUNDLGFBQWE7QUFBQSxJQUNYLGNBQWMsNkJBQWE7QUFBQSxJQUMzQixPQUFPLElBQUksTUFBTSxPQUFPO0FBQUEsRUFDMUI7QUFBQSxDQUNGLEdBTjhCO0FBU2hDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
