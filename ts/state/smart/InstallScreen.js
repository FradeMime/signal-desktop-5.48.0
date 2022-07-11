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
var InstallScreen_exports = {};
__export(InstallScreen_exports, {
  SmartInstallScreen: () => SmartInstallScreen
});
module.exports = __toCommonJS(InstallScreen_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_user = require("../selectors/user");
var log = __toESM(require("../../logging/log"));
var import_loadable = require("../../util/loadable");
var import_assert = require("../../util/assert");
var import_explodePromise = require("../../util/explodePromise");
var import_missingCaseError = require("../../util/missingCaseError");
var import_InstallScreen = require("../../components/InstallScreen");
var import_InstallScreenErrorStep = require("../../components/installScreen/InstallScreenErrorStep");
var import_InstallScreenChoosingDeviceNameStep = require("../../components/installScreen/InstallScreenChoosingDeviceNameStep");
var import_Errors = require("../../textsecure/Errors");
var import_isRecord = require("../../util/isRecord");
var Errors = __toESM(require("../../types/errors"));
var import_normalizeDeviceName = require("../../util/normalizeDeviceName");
const INITIAL_STATE = {
  step: import_InstallScreen.InstallScreenStep.QrCodeNotScanned,
  provisioningUrl: { loadingState: import_loadable.LoadingState.Loading }
};
function getInstallError(err) {
  if (err instanceof import_Errors.HTTPError) {
    switch (err.code) {
      case -1:
        return import_InstallScreenErrorStep.InstallError.ConnectionFailed;
      case 409:
        return import_InstallScreenErrorStep.InstallError.TooOld;
      case 411:
        return import_InstallScreenErrorStep.InstallError.TooManyDevices;
      default:
        return import_InstallScreenErrorStep.InstallError.UnknownError;
    }
  }
  if ((0, import_isRecord.isRecord)(err) && err.message === "websocket closed") {
    return import_InstallScreenErrorStep.InstallError.ConnectionFailed;
  }
  return import_InstallScreenErrorStep.InstallError.UnknownError;
}
function SmartInstallScreen() {
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const chooseDeviceNamePromiseWrapperRef = (0, import_react.useRef)((0, import_explodePromise.explodePromise)());
  const [state, setState] = (0, import_react.useState)(INITIAL_STATE);
  const setProvisioningUrl = (0, import_react.useCallback)((value) => {
    setState((currentState) => {
      if (currentState.step !== import_InstallScreen.InstallScreenStep.QrCodeNotScanned) {
        return currentState;
      }
      return {
        ...currentState,
        provisioningUrl: {
          loadingState: import_loadable.LoadingState.Loaded,
          value
        }
      };
    });
  }, [setState]);
  const onQrCodeScanned = (0, import_react.useCallback)(() => {
    setState((currentState) => {
      if (currentState.step !== import_InstallScreen.InstallScreenStep.QrCodeNotScanned) {
        return currentState;
      }
      return {
        step: import_InstallScreen.InstallScreenStep.ChoosingDeviceName,
        deviceName: (0, import_normalizeDeviceName.normalizeDeviceName)(window.textsecure.storage.user.getDeviceName() || window.getHostName() || "").slice(0, import_InstallScreenChoosingDeviceNameStep.MAX_DEVICE_NAME_LENGTH)
      };
    });
  }, [setState]);
  const setDeviceName = (0, import_react.useCallback)((deviceName) => {
    setState((currentState) => {
      if (currentState.step !== import_InstallScreen.InstallScreenStep.ChoosingDeviceName) {
        return currentState;
      }
      return {
        ...currentState,
        deviceName
      };
    });
  }, [setState]);
  const onSubmitDeviceName = (0, import_react.useCallback)(() => {
    if (state.step !== import_InstallScreen.InstallScreenStep.ChoosingDeviceName) {
      return;
    }
    let deviceName = (0, import_normalizeDeviceName.normalizeDeviceName)(state.deviceName);
    if (!deviceName.length) {
      (0, import_assert.assert)(false, "Unexpected empty device name. Falling back to placeholder value");
      deviceName = i18n("Install__choose-device-name__placeholder");
    }
    chooseDeviceNamePromiseWrapperRef.current.resolve(deviceName);
    setState({ step: import_InstallScreen.InstallScreenStep.LinkInProgress });
  }, [state, i18n]);
  (0, import_react.useEffect)(() => {
    let hasCleanedUp = false;
    const accountManager = window.getAccountManager();
    (0, import_assert.assert)(accountManager, "Expected an account manager");
    const updateProvisioningUrl = /* @__PURE__ */ __name((value) => {
      if (hasCleanedUp) {
        return;
      }
      setProvisioningUrl(value);
    }, "updateProvisioningUrl");
    const confirmNumber = /* @__PURE__ */ __name(async () => {
      if (hasCleanedUp) {
        throw new Error("Cannot confirm number; the component was unmounted");
      }
      onQrCodeScanned();
      if (window.CI) {
        chooseDeviceNamePromiseWrapperRef.current.resolve(window.CI.deviceName);
      }
      const result = await chooseDeviceNamePromiseWrapperRef.current.promise;
      if (hasCleanedUp) {
        throw new Error("Cannot confirm number; the component was unmounted");
      }
      const shouldRetainData = window.Signal.Util.Registration.everDone();
      if (!shouldRetainData) {
        try {
          await window.textsecure.storage.protocol.removeAllData();
        } catch (error) {
          log.error("confirmNumber: error clearing database", Errors.toLogFormat(error));
        }
      }
      if (hasCleanedUp) {
        throw new Error("Cannot confirm number; the component was unmounted");
      }
      return result;
    }, "confirmNumber");
    (async () => {
      try {
        await accountManager.registerSecondDevice(updateProvisioningUrl, confirmNumber);
        window.removeSetupMenuItems();
      } catch (error) {
        log.error("account.registerSecondDevice: got an error", Errors.toLogFormat(error));
        if (hasCleanedUp) {
          return;
        }
        setState({
          step: import_InstallScreen.InstallScreenStep.Error,
          error: getInstallError(error)
        });
      }
    })();
    return () => {
      hasCleanedUp = true;
    };
  }, [setProvisioningUrl, onQrCodeScanned]);
  let props;
  switch (state.step) {
    case import_InstallScreen.InstallScreenStep.Error:
      props = {
        step: import_InstallScreen.InstallScreenStep.Error,
        screenSpecificProps: {
          i18n,
          error: state.error,
          quit: () => window.shutdown(),
          tryAgain: () => setState(INITIAL_STATE)
        }
      };
      break;
    case import_InstallScreen.InstallScreenStep.QrCodeNotScanned:
      props = {
        step: import_InstallScreen.InstallScreenStep.QrCodeNotScanned,
        screenSpecificProps: {
          i18n,
          provisioningUrl: state.provisioningUrl
        }
      };
      break;
    case import_InstallScreen.InstallScreenStep.ChoosingDeviceName:
      props = {
        step: import_InstallScreen.InstallScreenStep.ChoosingDeviceName,
        screenSpecificProps: {
          i18n,
          deviceName: state.deviceName,
          setDeviceName,
          onSubmit: onSubmitDeviceName
        }
      };
      break;
    case import_InstallScreen.InstallScreenStep.LinkInProgress:
      props = {
        step: import_InstallScreen.InstallScreenStep.LinkInProgress,
        screenSpecificProps: { i18n }
      };
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(state);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_InstallScreen.InstallScreen, {
    ...props
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartInstallScreen
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudFByb3BzLCBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBMb2FkYWJsZSB9IGZyb20gJy4uLy4uL3V0aWwvbG9hZGFibGUnO1xuaW1wb3J0IHsgTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vLi4vdXRpbC9sb2FkYWJsZSc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBleHBsb2RlUHJvbWlzZSB9IGZyb20gJy4uLy4uL3V0aWwvZXhwbG9kZVByb21pc2UnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQge1xuICBJbnN0YWxsU2NyZWVuLFxuICBJbnN0YWxsU2NyZWVuU3RlcCxcbn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9JbnN0YWxsU2NyZWVuJztcbmltcG9ydCB7IEluc3RhbGxFcnJvciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5zdGFsbFNjcmVlbi9JbnN0YWxsU2NyZWVuRXJyb3JTdGVwJztcbmltcG9ydCB7IE1BWF9ERVZJQ0VfTkFNRV9MRU5HVEggfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luc3RhbGxTY3JlZW4vSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAnO1xuaW1wb3J0IHsgSFRUUEVycm9yIH0gZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi8uLi91dGlsL2lzUmVjb3JkJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi8uLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHsgbm9ybWFsaXplRGV2aWNlTmFtZSB9IGZyb20gJy4uLy4uL3V0aWwvbm9ybWFsaXplRGV2aWNlTmFtZSc7XG5cbnR5cGUgUHJvcHNUeXBlID0gQ29tcG9uZW50UHJvcHM8dHlwZW9mIEluc3RhbGxTY3JlZW4+O1xuXG50eXBlIFN0YXRlVHlwZSA9XG4gIHwge1xuICAgICAgc3RlcDogSW5zdGFsbFNjcmVlblN0ZXAuRXJyb3I7XG4gICAgICBlcnJvcjogSW5zdGFsbEVycm9yO1xuICAgIH1cbiAgfCB7XG4gICAgICBzdGVwOiBJbnN0YWxsU2NyZWVuU3RlcC5RckNvZGVOb3RTY2FubmVkO1xuICAgICAgcHJvdmlzaW9uaW5nVXJsOiBMb2FkYWJsZTxzdHJpbmc+O1xuICAgIH1cbiAgfCB7XG4gICAgICBzdGVwOiBJbnN0YWxsU2NyZWVuU3RlcC5DaG9vc2luZ0RldmljZU5hbWU7XG4gICAgICBkZXZpY2VOYW1lOiBzdHJpbmc7XG4gICAgfVxuICB8IHtcbiAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkxpbmtJblByb2dyZXNzO1xuICAgIH07XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IFN0YXRlVHlwZSA9IHtcbiAgc3RlcDogSW5zdGFsbFNjcmVlblN0ZXAuUXJDb2RlTm90U2Nhbm5lZCxcbiAgcHJvdmlzaW9uaW5nVXJsOiB7IGxvYWRpbmdTdGF0ZTogTG9hZGluZ1N0YXRlLkxvYWRpbmcgfSxcbn07XG5cbmZ1bmN0aW9uIGdldEluc3RhbGxFcnJvcihlcnI6IHVua25vd24pOiBJbnN0YWxsRXJyb3Ige1xuICBpZiAoZXJyIGluc3RhbmNlb2YgSFRUUEVycm9yKSB7XG4gICAgc3dpdGNoIChlcnIuY29kZSkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgcmV0dXJuIEluc3RhbGxFcnJvci5Db25uZWN0aW9uRmFpbGVkO1xuICAgICAgY2FzZSA0MDk6XG4gICAgICAgIHJldHVybiBJbnN0YWxsRXJyb3IuVG9vT2xkO1xuICAgICAgY2FzZSA0MTE6XG4gICAgICAgIHJldHVybiBJbnN0YWxsRXJyb3IuVG9vTWFueURldmljZXM7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gSW5zdGFsbEVycm9yLlVua25vd25FcnJvcjtcbiAgICB9XG4gIH1cbiAgLy8gQWNjb3VudE1hbmFnZXIucmVnaXN0ZXJTZWNvbmREZXZpY2UgdXNlcyB0aGlzIHNwZWNpZmljIFwid2Vic29ja2V0IGNsb3NlZFwiIGVycm9yXG4gIC8vICAgbWVzc2FnZS5cbiAgaWYgKGlzUmVjb3JkKGVycikgJiYgZXJyLm1lc3NhZ2UgPT09ICd3ZWJzb2NrZXQgY2xvc2VkJykge1xuICAgIHJldHVybiBJbnN0YWxsRXJyb3IuQ29ubmVjdGlvbkZhaWxlZDtcbiAgfVxuICByZXR1cm4gSW5zdGFsbEVycm9yLlVua25vd25FcnJvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNtYXJ0SW5zdGFsbFNjcmVlbigpOiBSZWFjdEVsZW1lbnQge1xuICBjb25zdCBpMThuID0gdXNlU2VsZWN0b3IoZ2V0SW50bCk7XG5cbiAgY29uc3QgY2hvb3NlRGV2aWNlTmFtZVByb21pc2VXcmFwcGVyUmVmID0gdXNlUmVmKGV4cGxvZGVQcm9taXNlPHN0cmluZz4oKSk7XG5cbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxTdGF0ZVR5cGU+KElOSVRJQUxfU1RBVEUpO1xuXG4gIGNvbnN0IHNldFByb3Zpc2lvbmluZ1VybCA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRTdGF0ZShjdXJyZW50U3RhdGUgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFN0YXRlLnN0ZXAgIT09IEluc3RhbGxTY3JlZW5TdGVwLlFyQ29kZU5vdFNjYW5uZWQpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY3VycmVudFN0YXRlLFxuICAgICAgICAgIHByb3Zpc2lvbmluZ1VybDoge1xuICAgICAgICAgICAgbG9hZGluZ1N0YXRlOiBMb2FkaW5nU3RhdGUuTG9hZGVkLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldFN0YXRlXVxuICApO1xuXG4gIGNvbnN0IG9uUXJDb2RlU2Nhbm5lZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTdGF0ZShjdXJyZW50U3RhdGUgPT4ge1xuICAgICAgaWYgKGN1cnJlbnRTdGF0ZS5zdGVwICE9PSBJbnN0YWxsU2NyZWVuU3RlcC5RckNvZGVOb3RTY2FubmVkKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkNob29zaW5nRGV2aWNlTmFtZSxcbiAgICAgICAgZGV2aWNlTmFtZTogbm9ybWFsaXplRGV2aWNlTmFtZShcbiAgICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0RGV2aWNlTmFtZSgpIHx8XG4gICAgICAgICAgICB3aW5kb3cuZ2V0SG9zdE5hbWUoKSB8fFxuICAgICAgICAgICAgJydcbiAgICAgICAgKS5zbGljZSgwLCBNQVhfREVWSUNFX05BTUVfTEVOR1RIKSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtzZXRTdGF0ZV0pO1xuXG4gIGNvbnN0IHNldERldmljZU5hbWUgPSB1c2VDYWxsYmFjayhcbiAgICAoZGV2aWNlTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRTdGF0ZShjdXJyZW50U3RhdGUgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFN0YXRlLnN0ZXAgIT09IEluc3RhbGxTY3JlZW5TdGVwLkNob29zaW5nRGV2aWNlTmFtZSkge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jdXJyZW50U3RhdGUsXG4gICAgICAgICAgZGV2aWNlTmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldFN0YXRlXVxuICApO1xuXG4gIGNvbnN0IG9uU3VibWl0RGV2aWNlTmFtZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoc3RhdGUuc3RlcCAhPT0gSW5zdGFsbFNjcmVlblN0ZXAuQ2hvb3NpbmdEZXZpY2VOYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRldmljZU5hbWU6IHN0cmluZyA9IG5vcm1hbGl6ZURldmljZU5hbWUoc3RhdGUuZGV2aWNlTmFtZSk7XG4gICAgaWYgKCFkZXZpY2VOYW1lLmxlbmd0aCkge1xuICAgICAgLy8gVGhpcyBzaG91bGQgYmUgaW1wb3NzaWJsZSwgYnV0IHdlIGhhdmUgaXQgaGVyZSBqdXN0IGluIGNhc2UuXG4gICAgICBhc3NlcnQoXG4gICAgICAgIGZhbHNlLFxuICAgICAgICAnVW5leHBlY3RlZCBlbXB0eSBkZXZpY2UgbmFtZS4gRmFsbGluZyBiYWNrIHRvIHBsYWNlaG9sZGVyIHZhbHVlJ1xuICAgICAgKTtcbiAgICAgIGRldmljZU5hbWUgPSBpMThuKCdJbnN0YWxsX19jaG9vc2UtZGV2aWNlLW5hbWVfX3BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGNob29zZURldmljZU5hbWVQcm9taXNlV3JhcHBlclJlZi5jdXJyZW50LnJlc29sdmUoZGV2aWNlTmFtZSk7XG5cbiAgICBzZXRTdGF0ZSh7IHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkxpbmtJblByb2dyZXNzIH0pO1xuICB9LCBbc3RhdGUsIGkxOG5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBoYXNDbGVhbmVkVXAgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFjY291bnRNYW5hZ2VyID0gd2luZG93LmdldEFjY291bnRNYW5hZ2VyKCk7XG4gICAgYXNzZXJ0KGFjY291bnRNYW5hZ2VyLCAnRXhwZWN0ZWQgYW4gYWNjb3VudCBtYW5hZ2VyJyk7XG5cbiAgICBjb25zdCB1cGRhdGVQcm92aXNpb25pbmdVcmwgPSAodmFsdWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgaWYgKGhhc0NsZWFuZWRVcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRQcm92aXNpb25pbmdVcmwodmFsdWUpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb25maXJtTnVtYmVyID0gYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICBpZiAoaGFzQ2xlYW5lZFVwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNvbmZpcm0gbnVtYmVyOyB0aGUgY29tcG9uZW50IHdhcyB1bm1vdW50ZWQnKTtcbiAgICAgIH1cbiAgICAgIG9uUXJDb2RlU2Nhbm5lZCgpO1xuXG4gICAgICBpZiAod2luZG93LkNJKSB7XG4gICAgICAgIGNob29zZURldmljZU5hbWVQcm9taXNlV3JhcHBlclJlZi5jdXJyZW50LnJlc29sdmUod2luZG93LkNJLmRldmljZU5hbWUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaG9vc2VEZXZpY2VOYW1lUHJvbWlzZVdyYXBwZXJSZWYuY3VycmVudC5wcm9taXNlO1xuXG4gICAgICBpZiAoaGFzQ2xlYW5lZFVwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNvbmZpcm0gbnVtYmVyOyB0aGUgY29tcG9uZW50IHdhcyB1bm1vdW50ZWQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gRGVsZXRlIGFsbCBkYXRhIGZyb20gdGhlIGRhdGFiYXNlIHVubGVzcyB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGEgcmUtbGluay5cbiAgICAgIC8vICAgV2l0aG91dCB0aGlzLCB0aGUgYXBwIHJlc3RhcnRzIGF0IGNlcnRhaW4gdGltZXMgYW5kIGNhbiBjYXVzZSB3ZWlyZCB0aGluZ3MgdG9cbiAgICAgIC8vICAgaGFwcGVuLCBsaWtlIGRhdGEgZnJvbSBhIHByZXZpb3VzIGxpZ2h0IGltcG9ydCBzaG93aW5nIHVwIGFmdGVyIGEgbmV3IGluc3RhbGwuXG4gICAgICBjb25zdCBzaG91bGRSZXRhaW5EYXRhID0gd2luZG93LlNpZ25hbC5VdGlsLlJlZ2lzdHJhdGlvbi5ldmVyRG9uZSgpO1xuICAgICAgaWYgKCFzaG91bGRSZXRhaW5EYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVBbGxEYXRhKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ2NvbmZpcm1OdW1iZXI6IGVycm9yIGNsZWFyaW5nIGRhdGFiYXNlJyxcbiAgICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNDbGVhbmVkVXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY29uZmlybSBudW1iZXI7IHRoZSBjb21wb25lbnQgd2FzIHVubW91bnRlZCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWNjb3VudE1hbmFnZXIucmVnaXN0ZXJTZWNvbmREZXZpY2UoXG4gICAgICAgICAgdXBkYXRlUHJvdmlzaW9uaW5nVXJsLFxuICAgICAgICAgIGNvbmZpcm1OdW1iZXJcbiAgICAgICAgKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlU2V0dXBNZW51SXRlbXMoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnYWNjb3VudC5yZWdpc3RlclNlY29uZERldmljZTogZ290IGFuIGVycm9yJyxcbiAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChoYXNDbGVhbmVkVXApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkVycm9yLFxuICAgICAgICAgIGVycm9yOiBnZXRJbnN0YWxsRXJyb3IoZXJyb3IpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGhhc0NsZWFuZWRVcCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW3NldFByb3Zpc2lvbmluZ1VybCwgb25RckNvZGVTY2FubmVkXSk7XG5cbiAgbGV0IHByb3BzOiBQcm9wc1R5cGU7XG5cbiAgc3dpdGNoIChzdGF0ZS5zdGVwKSB7XG4gICAgY2FzZSBJbnN0YWxsU2NyZWVuU3RlcC5FcnJvcjpcbiAgICAgIHByb3BzID0ge1xuICAgICAgICBzdGVwOiBJbnN0YWxsU2NyZWVuU3RlcC5FcnJvcixcbiAgICAgICAgc2NyZWVuU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgZXJyb3I6IHN0YXRlLmVycm9yLFxuICAgICAgICAgIHF1aXQ6ICgpID0+IHdpbmRvdy5zaHV0ZG93bigpLFxuICAgICAgICAgIHRyeUFnYWluOiAoKSA9PiBzZXRTdGF0ZShJTklUSUFMX1NUQVRFKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEluc3RhbGxTY3JlZW5TdGVwLlFyQ29kZU5vdFNjYW5uZWQ6XG4gICAgICBwcm9wcyA9IHtcbiAgICAgICAgc3RlcDogSW5zdGFsbFNjcmVlblN0ZXAuUXJDb2RlTm90U2Nhbm5lZCxcbiAgICAgICAgc2NyZWVuU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgcHJvdmlzaW9uaW5nVXJsOiBzdGF0ZS5wcm92aXNpb25pbmdVcmwsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBJbnN0YWxsU2NyZWVuU3RlcC5DaG9vc2luZ0RldmljZU5hbWU6XG4gICAgICBwcm9wcyA9IHtcbiAgICAgICAgc3RlcDogSW5zdGFsbFNjcmVlblN0ZXAuQ2hvb3NpbmdEZXZpY2VOYW1lLFxuICAgICAgICBzY3JlZW5TcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICBkZXZpY2VOYW1lOiBzdGF0ZS5kZXZpY2VOYW1lLFxuICAgICAgICAgIHNldERldmljZU5hbWUsXG4gICAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0RGV2aWNlTmFtZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEluc3RhbGxTY3JlZW5TdGVwLkxpbmtJblByb2dyZXNzOlxuICAgICAgcHJvcHMgPSB7XG4gICAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkxpbmtJblByb2dyZXNzLFxuICAgICAgICBzY3JlZW5TcGVjaWZpY1Byb3BzOiB7IGkxOG4gfSxcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4gPEluc3RhbGxTY3JlZW4gey4uLnByb3BzfSAvPjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7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
