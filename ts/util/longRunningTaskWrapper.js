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
var longRunningTaskWrapper_exports = {};
__export(longRunningTaskWrapper_exports, {
  longRunningTaskWrapper: () => longRunningTaskWrapper
});
module.exports = __toCommonJS(longRunningTaskWrapper_exports);
var React = __toESM(require("react"));
var import_ReactWrapperView = require("../views/ReactWrapperView");
var import_ErrorModal = require("../components/ErrorModal");
var import_ProgressModal = require("../components/ProgressModal");
var log = __toESM(require("../logging/log"));
var import_clearTimeoutIfNecessary = require("./clearTimeoutIfNecessary");
async function longRunningTaskWrapper({
  name,
  idForLogging,
  task,
  suppressErrorDialog
}) {
  const idLog = `${name}/${idForLogging}`;
  const ONE_SECOND = 1e3;
  const TWO_SECONDS = 2e3;
  let progressView;
  let spinnerStart;
  let progressTimeout = setTimeout(() => {
    log.info(`longRunningTaskWrapper/${idLog}: Creating spinner`);
    progressView = new import_ReactWrapperView.ReactWrapperView({
      className: "progress-modal-wrapper",
      JSX: /* @__PURE__ */ React.createElement(import_ProgressModal.ProgressModal, {
        i18n: window.i18n
      })
    });
    spinnerStart = Date.now();
  }, TWO_SECONDS);
  try {
    log.info(`longRunningTaskWrapper/${idLog}: Starting task`);
    const result = await task();
    log.info(`longRunningTaskWrapper/${idLog}: Task completed successfully`);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(progressTimeout);
    progressTimeout = void 0;
    if (progressView) {
      const now = Date.now();
      if (spinnerStart && now - spinnerStart < ONE_SECOND) {
        log.info(`longRunningTaskWrapper/${idLog}: Spinner shown for less than second, showing for another second`);
        await window.Signal.Util.sleep(ONE_SECOND);
      }
      progressView.remove();
      progressView = void 0;
    }
    return result;
  } catch (error) {
    log.error(`longRunningTaskWrapper/${idLog}: Error!`, error && error.stack ? error.stack : error);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(progressTimeout);
    progressTimeout = void 0;
    if (progressView) {
      progressView.remove();
      progressView = void 0;
    }
    if (!suppressErrorDialog) {
      log.info(`longRunningTaskWrapper/${idLog}: Showing error dialog`);
      const errorView = new import_ReactWrapperView.ReactWrapperView({
        className: "error-modal-wrapper",
        JSX: /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
          i18n: window.i18n,
          onClose: () => {
            errorView.remove();
          }
        })
      });
    }
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  longRunningTaskWrapper
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibG9uZ1J1bm5pbmdUYXNrV3JhcHBlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZWFjdFdyYXBwZXJWaWV3IH0gZnJvbSAnLi4vdmlld3MvUmVhY3RXcmFwcGVyVmlldyc7XG5pbXBvcnQgeyBFcnJvck1vZGFsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9FcnJvck1vZGFsJztcbmltcG9ydCB7IFByb2dyZXNzTW9kYWwgfSBmcm9tICcuLi9jb21wb25lbnRzL1Byb2dyZXNzTW9kYWwnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb25nUnVubmluZ1Rhc2tXcmFwcGVyPFQ+KHtcbiAgbmFtZSxcbiAgaWRGb3JMb2dnaW5nLFxuICB0YXNrLFxuICBzdXBwcmVzc0Vycm9yRGlhbG9nLFxufToge1xuICBuYW1lOiBzdHJpbmc7XG4gIGlkRm9yTG9nZ2luZzogc3RyaW5nO1xuICB0YXNrOiAoKSA9PiBQcm9taXNlPFQ+O1xuICBzdXBwcmVzc0Vycm9yRGlhbG9nPzogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgaWRMb2cgPSBgJHtuYW1lfS8ke2lkRm9yTG9nZ2luZ31gO1xuICBjb25zdCBPTkVfU0VDT05EID0gMTAwMDtcbiAgY29uc3QgVFdPX1NFQ09ORFMgPSAyMDAwO1xuXG4gIGxldCBwcm9ncmVzc1ZpZXc6IEJhY2tib25lLlZpZXcgfCB1bmRlZmluZWQ7XG4gIGxldCBzcGlubmVyU3RhcnQ7XG4gIGxldCBwcm9ncmVzc1RpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbG9nLmluZm8oYGxvbmdSdW5uaW5nVGFza1dyYXBwZXIvJHtpZExvZ306IENyZWF0aW5nIHNwaW5uZXJgKTtcblxuICAgIC8vIE5vdGU6IHRoaXMgY29tcG9uZW50IHVzZXMgYSBwb3J0YWwgdG8gcmVuZGVyIGl0c2VsZiBpbnRvIHRoZSB0b3AtbGV2ZWwgRE9NLiBOb1xuICAgIC8vICAgbmVlZCB0byBhdHRhY2ggaXQgdG8gdGhlIERPTSBoZXJlLlxuICAgIHByb2dyZXNzVmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICAgIGNsYXNzTmFtZTogJ3Byb2dyZXNzLW1vZGFsLXdyYXBwZXInLFxuICAgICAgSlNYOiA8UHJvZ3Jlc3NNb2RhbCBpMThuPXt3aW5kb3cuaTE4bn0gLz4sXG4gICAgfSk7XG4gICAgc3Bpbm5lclN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgfSwgVFdPX1NFQ09ORFMpO1xuXG4gIC8vIE5vdGU6IGFueSB0YXNrIHdlIHB1dCBoZXJlIG5lZWRzIHRvIGhhdmUgaXRzIG93biBzYWZldHkgdmFsdmU7IHRoaXMgZnVuY3Rpb24gd2lsbFxuICAvLyAgIHNob3cgYSBzcGlubmVyIHVudGlsIGl0J3MgZG9uZVxuICB0cnkge1xuICAgIGxvZy5pbmZvKGBsb25nUnVubmluZ1Rhc2tXcmFwcGVyLyR7aWRMb2d9OiBTdGFydGluZyB0YXNrYCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGFzaygpO1xuICAgIGxvZy5pbmZvKGBsb25nUnVubmluZ1Rhc2tXcmFwcGVyLyR7aWRMb2d9OiBUYXNrIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHlgKTtcblxuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHByb2dyZXNzVGltZW91dCk7XG4gICAgcHJvZ3Jlc3NUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwcm9ncmVzc1ZpZXcpIHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAoc3Bpbm5lclN0YXJ0ICYmIG5vdyAtIHNwaW5uZXJTdGFydCA8IE9ORV9TRUNPTkQpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGxvbmdSdW5uaW5nVGFza1dyYXBwZXIvJHtpZExvZ306IFNwaW5uZXIgc2hvd24gZm9yIGxlc3MgdGhhbiBzZWNvbmQsIHNob3dpbmcgZm9yIGFub3RoZXIgc2Vjb25kYFxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlV0aWwuc2xlZXAoT05FX1NFQ09ORCk7XG4gICAgICB9XG4gICAgICBwcm9ncmVzc1ZpZXcucmVtb3ZlKCk7XG4gICAgICBwcm9ncmVzc1ZpZXcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlci8ke2lkTG9nfTogRXJyb3IhYCxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG5cbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeShwcm9ncmVzc1RpbWVvdXQpO1xuICAgIHByb2dyZXNzVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocHJvZ3Jlc3NWaWV3KSB7XG4gICAgICBwcm9ncmVzc1ZpZXcucmVtb3ZlKCk7XG4gICAgICBwcm9ncmVzc1ZpZXcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFzdXBwcmVzc0Vycm9yRGlhbG9nKSB7XG4gICAgICBsb2cuaW5mbyhgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlci8ke2lkTG9nfTogU2hvd2luZyBlcnJvciBkaWFsb2dgKTtcblxuICAgICAgLy8gTm90ZTogdGhpcyBjb21wb25lbnQgdXNlcyBhIHBvcnRhbCB0byByZW5kZXIgaXRzZWxmIGludG8gdGhlIHRvcC1sZXZlbCBET00uIE5vXG4gICAgICAvLyAgIG5lZWQgdG8gYXR0YWNoIGl0IHRvIHRoZSBET00gaGVyZS5cbiAgICAgIGNvbnN0IGVycm9yVmlldzogQmFja2JvbmUuVmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICAgICAgY2xhc3NOYW1lOiAnZXJyb3ItbW9kYWwtd3JhcHBlcicsXG4gICAgICAgIEpTWDogKFxuICAgICAgICAgIDxFcnJvck1vZGFsXG4gICAgICAgICAgICBpMThuPXt3aW5kb3cuaTE4bn1cbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgZXJyb3JWaWV3LnJlbW92ZSgpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qiw4QkFBaUM7QUFDakMsd0JBQTJCO0FBQzNCLDJCQUE4QjtBQUM5QixVQUFxQjtBQUNyQixxQ0FBd0M7QUFFeEMsc0NBQWdEO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQU1hO0FBQ2IsUUFBTSxRQUFRLEdBQUcsUUFBUTtBQUN6QixRQUFNLGFBQWE7QUFDbkIsUUFBTSxjQUFjO0FBRXBCLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxrQkFBOEMsV0FBVyxNQUFNO0FBQ2pFLFFBQUksS0FBSywwQkFBMEIseUJBQXlCO0FBSTVELG1CQUFlLElBQUkseUNBQWlCO0FBQUEsTUFDbEMsV0FBVztBQUFBLE1BQ1gsS0FBSyxvQ0FBQztBQUFBLFFBQWMsTUFBTSxPQUFPO0FBQUEsT0FBTTtBQUFBLElBQ3pDLENBQUM7QUFDRCxtQkFBZSxLQUFLLElBQUk7QUFBQSxFQUMxQixHQUFHLFdBQVc7QUFJZCxNQUFJO0FBQ0YsUUFBSSxLQUFLLDBCQUEwQixzQkFBc0I7QUFDekQsVUFBTSxTQUFTLE1BQU0sS0FBSztBQUMxQixRQUFJLEtBQUssMEJBQTBCLG9DQUFvQztBQUV2RSxnRUFBd0IsZUFBZTtBQUN2QyxzQkFBa0I7QUFDbEIsUUFBSSxjQUFjO0FBQ2hCLFlBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsVUFBSSxnQkFBZ0IsTUFBTSxlQUFlLFlBQVk7QUFDbkQsWUFBSSxLQUNGLDBCQUEwQix1RUFDNUI7QUFDQSxjQUFNLE9BQU8sT0FBTyxLQUFLLE1BQU0sVUFBVTtBQUFBLE1BQzNDO0FBQ0EsbUJBQWEsT0FBTztBQUNwQixxQkFBZTtBQUFBLElBQ2pCO0FBRUEsV0FBTztBQUFBLEVBQ1QsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUNGLDBCQUEwQixpQkFDMUIsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBRUEsZ0VBQXdCLGVBQWU7QUFDdkMsc0JBQWtCO0FBQ2xCLFFBQUksY0FBYztBQUNoQixtQkFBYSxPQUFPO0FBQ3BCLHFCQUFlO0FBQUEsSUFDakI7QUFFQSxRQUFJLENBQUMscUJBQXFCO0FBQ3hCLFVBQUksS0FBSywwQkFBMEIsNkJBQTZCO0FBSWhFLFlBQU0sWUFBMkIsSUFBSSx5Q0FBaUI7QUFBQSxRQUNwRCxXQUFXO0FBQUEsUUFDWCxLQUNFLG9DQUFDO0FBQUEsVUFDQyxNQUFNLE9BQU87QUFBQSxVQUNiLFNBQVMsTUFBTTtBQUNiLHNCQUFVLE9BQU87QUFBQSxVQUNuQjtBQUFBLFNBQ0Y7QUFBQSxNQUVKLENBQUM7QUFBQSxJQUNIO0FBRUEsVUFBTTtBQUFBLEVBQ1I7QUFDRjtBQXBGc0IiLAogICJuYW1lcyI6IFtdCn0K
