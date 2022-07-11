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
var crashReports_exports = {};
__export(crashReports_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(crashReports_exports);
var log = __toESM(require("../../logging/log"));
var import_showToast = require("../../util/showToast");
var Errors = __toESM(require("../../types/errors"));
var import_ToastLinkCopied = require("../../components/ToastLinkCopied");
var import_ToastDebugLogError = require("../../components/ToastDebugLogError");
const SET_COUNT = "crashReports/SET_COUNT";
const UPLOAD = "crashReports/UPLOAD";
const ERASE = "crashReports/ERASE";
const actions = {
  setCrashReportCount,
  uploadCrashReports,
  eraseCrashReports
};
function setCrashReportCount(count) {
  return { type: SET_COUNT, payload: count };
}
function uploadCrashReports() {
  return { type: UPLOAD, payload: window.crashReports.upload() };
}
function eraseCrashReports() {
  return { type: ERASE, payload: window.crashReports.erase() };
}
function getEmptyState() {
  return {
    count: 0,
    isPending: false
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === SET_COUNT) {
    return {
      ...state,
      count: action.payload
    };
  }
  if (action.type === `${UPLOAD}_PENDING` || action.type === `${ERASE}_PENDING`) {
    return {
      ...state,
      isPending: true
    };
  }
  if (action.type === `${UPLOAD}_FULFILLED` || action.type === `${ERASE}_FULFILLED`) {
    if (action.type === `${UPLOAD}_FULFILLED`) {
      (0, import_showToast.showToast)(import_ToastLinkCopied.ToastLinkCopied);
    }
    return {
      ...state,
      count: 0,
      isPending: false
    };
  }
  if (action.type === `${UPLOAD}_REJECTED` || action.type === `${ERASE}_REJECTED`) {
    const { error } = action;
    log.error(`Failed to upload crash report due to error ${Errors.toLogFormat(error)}`);
    (0, import_showToast.showToast)(import_ToastDebugLogError.ToastDebugLogError);
    return {
      ...state,
      count: 0,
      isPending: false
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3Jhc2hSZXBvcnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tICcuLi8uLi91dGlsL3Nob3dUb2FzdCc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB7IFRvYXN0TGlua0NvcGllZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvVG9hc3RMaW5rQ29waWVkJztcbmltcG9ydCB7IFRvYXN0RGVidWdMb2dFcnJvciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvVG9hc3REZWJ1Z0xvZ0Vycm9yJztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgQ3Jhc2hSZXBvcnRzU3RhdGVUeXBlID0ge1xuICBjb3VudDogbnVtYmVyO1xuICBpc1BlbmRpbmc6IGJvb2xlYW47XG59O1xuXG4vLyBBY3Rpb25zXG5cbmNvbnN0IFNFVF9DT1VOVCA9ICdjcmFzaFJlcG9ydHMvU0VUX0NPVU5UJztcbmNvbnN0IFVQTE9BRCA9ICdjcmFzaFJlcG9ydHMvVVBMT0FEJztcbmNvbnN0IEVSQVNFID0gJ2NyYXNoUmVwb3J0cy9FUkFTRSc7XG5cbnR5cGUgU2V0Q3Jhc2hSZXBvcnRDb3VudEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6IHR5cGVvZiBTRVRfQ09VTlQ7XG4gIHBheWxvYWQ6IG51bWJlcjtcbn07XG5cbnR5cGUgUHJvbWlzZUFjdGlvbjxUeXBlIGV4dGVuZHMgc3RyaW5nLCBQYXlsb2FkID0gdm9pZD4gPVxuICB8IHtcbiAgICAgIHR5cGU6IFR5cGU7XG4gICAgICBwYXlsb2FkOiBQcm9taXNlPFBheWxvYWQ+O1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiBgJHtUeXBlfV9QRU5ESU5HYDtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogYCR7VHlwZX1fRlVMRklMTEVEYDtcbiAgICAgIHBheWxvYWQ6IFBheWxvYWQ7XG4gICAgfVxuICB8IHtcbiAgICAgIHR5cGU6IGAke1R5cGV9X1JFSkVDVEVEYDtcbiAgICAgIGVycm9yOiB0cnVlO1xuICAgICAgcGF5bG9hZDogRXJyb3I7XG4gICAgfTtcblxudHlwZSBDcmFzaFJlcG9ydHNBY3Rpb25UeXBlID1cbiAgfCBTZXRDcmFzaFJlcG9ydENvdW50QWN0aW9uVHlwZVxuICB8IFByb21pc2VBY3Rpb248dHlwZW9mIFVQTE9BRD5cbiAgfCBQcm9taXNlQWN0aW9uPHR5cGVvZiBFUkFTRT47XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgc2V0Q3Jhc2hSZXBvcnRDb3VudCxcbiAgdXBsb2FkQ3Jhc2hSZXBvcnRzLFxuICBlcmFzZUNyYXNoUmVwb3J0cyxcbn07XG5cbmZ1bmN0aW9uIHNldENyYXNoUmVwb3J0Q291bnQoY291bnQ6IG51bWJlcik6IFNldENyYXNoUmVwb3J0Q291bnRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHsgdHlwZTogU0VUX0NPVU5ULCBwYXlsb2FkOiBjb3VudCB9O1xufVxuXG5mdW5jdGlvbiB1cGxvYWRDcmFzaFJlcG9ydHMoKTogUHJvbWlzZUFjdGlvbjx0eXBlb2YgVVBMT0FEPiB7XG4gIHJldHVybiB7IHR5cGU6IFVQTE9BRCwgcGF5bG9hZDogd2luZG93LmNyYXNoUmVwb3J0cy51cGxvYWQoKSB9O1xufVxuXG5mdW5jdGlvbiBlcmFzZUNyYXNoUmVwb3J0cygpOiBQcm9taXNlQWN0aW9uPHR5cGVvZiBFUkFTRT4ge1xuICByZXR1cm4geyB0eXBlOiBFUkFTRSwgcGF5bG9hZDogd2luZG93LmNyYXNoUmVwb3J0cy5lcmFzZSgpIH07XG59XG5cbi8vIFJlZHVjZXJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RhdGUoKTogQ3Jhc2hSZXBvcnRzU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBjb3VudDogMCxcbiAgICBpc1BlbmRpbmc6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PENyYXNoUmVwb3J0c1N0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8Q3Jhc2hSZXBvcnRzQWN0aW9uVHlwZT5cbik6IENyYXNoUmVwb3J0c1N0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VUX0NPVU5UKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY291bnQ6IGFjdGlvbi5wYXlsb2FkLFxuICAgIH07XG4gIH1cblxuICBpZiAoXG4gICAgYWN0aW9uLnR5cGUgPT09IGAke1VQTE9BRH1fUEVORElOR2AgfHxcbiAgICBhY3Rpb24udHlwZSA9PT0gYCR7RVJBU0V9X1BFTkRJTkdgXG4gICkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGlzUGVuZGluZzogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKFxuICAgIGFjdGlvbi50eXBlID09PSBgJHtVUExPQUR9X0ZVTEZJTExFRGAgfHxcbiAgICBhY3Rpb24udHlwZSA9PT0gYCR7RVJBU0V9X0ZVTEZJTExFRGBcbiAgKSB7XG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBgJHtVUExPQUR9X0ZVTEZJTExFRGApIHtcbiAgICAgIHNob3dUb2FzdChUb2FzdExpbmtDb3BpZWQpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb3VudDogMCxcbiAgICAgIGlzUGVuZGluZzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChcbiAgICBhY3Rpb24udHlwZSA9PT0gKGAke1VQTE9BRH1fUkVKRUNURURgIGFzIGNvbnN0KSB8fFxuICAgIGFjdGlvbi50eXBlID09PSAoYCR7RVJBU0V9X1JFSkVDVEVEYCBhcyBjb25zdClcbiAgKSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gYWN0aW9uO1xuXG4gICAgbG9nLmVycm9yKFxuICAgICAgYEZhaWxlZCB0byB1cGxvYWQgY3Jhc2ggcmVwb3J0IGR1ZSB0byBlcnJvciAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnJvcil9YFxuICAgICk7XG5cbiAgICBzaG93VG9hc3QoVG9hc3REZWJ1Z0xvZ0Vycm9yKTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNvdW50OiAwLFxuICAgICAgaXNQZW5kaW5nOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxVQUFxQjtBQUNyQix1QkFBMEI7QUFDMUIsYUFBd0I7QUFDeEIsNkJBQWdDO0FBQ2hDLGdDQUFtQztBQVduQyxNQUFNLFlBQVk7QUFDbEIsTUFBTSxTQUFTO0FBQ2YsTUFBTSxRQUFRO0FBZ0NQLE1BQU0sVUFBVTtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLDZCQUE2QixPQUE4QztBQUN6RSxTQUFPLEVBQUUsTUFBTSxXQUFXLFNBQVMsTUFBTTtBQUMzQztBQUZTLEFBSVQsOEJBQTREO0FBQzFELFNBQU8sRUFBRSxNQUFNLFFBQVEsU0FBUyxPQUFPLGFBQWEsT0FBTyxFQUFFO0FBQy9EO0FBRlMsQUFJVCw2QkFBMEQ7QUFDeEQsU0FBTyxFQUFFLE1BQU0sT0FBTyxTQUFTLE9BQU8sYUFBYSxNQUFNLEVBQUU7QUFDN0Q7QUFGUyxBQU1GLHlCQUFnRDtBQUNyRCxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsRUFDYjtBQUNGO0FBTGdCLEFBT1QsaUJBQ0wsUUFBeUMsY0FBYyxHQUN2RCxRQUN1QjtBQUN2QixNQUFJLE9BQU8sU0FBUyxXQUFXO0FBQzdCLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFFQSxNQUNFLE9BQU8sU0FBUyxHQUFHLG9CQUNuQixPQUFPLFNBQVMsR0FBRyxpQkFDbkI7QUFDQSxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBRUEsTUFDRSxPQUFPLFNBQVMsR0FBRyxzQkFDbkIsT0FBTyxTQUFTLEdBQUcsbUJBQ25CO0FBQ0EsUUFBSSxPQUFPLFNBQVMsR0FBRyxvQkFBb0I7QUFDekMsc0NBQVUsc0NBQWU7QUFBQSxJQUMzQjtBQUNBLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFFQSxNQUNFLE9BQU8sU0FBVSxHQUFHLHFCQUNwQixPQUFPLFNBQVUsR0FBRyxrQkFDcEI7QUFDQSxVQUFNLEVBQUUsVUFBVTtBQUVsQixRQUFJLE1BQ0YsOENBQThDLE9BQU8sWUFBWSxLQUFLLEdBQ3hFO0FBRUEsb0NBQVUsNENBQWtCO0FBRTVCLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUF2RGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
