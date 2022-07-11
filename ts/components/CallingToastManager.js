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
var CallingToastManager_exports = {};
__export(CallingToastManager_exports, {
  CallingToastManager: () => CallingToastManager
});
module.exports = __toCommonJS(CallingToastManager_exports);
var import_react = __toESM(require("react"));
var import_Calling = require("../types/Calling");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_CallingToast = require("./CallingToast");
function getReconnectingToast({ activeCall, i18n }) {
  if (activeCall.callMode === import_Calling.CallMode.Group && activeCall.connectionState === import_Calling.GroupCallConnectionState.Reconnecting) {
    return {
      message: i18n("callReconnecting"),
      type: "static"
    };
  }
  return void 0;
}
const ME = Symbol("me");
function getCurrentPresenter(activeCall) {
  if (activeCall.presentingSource) {
    return ME;
  }
  if (activeCall.callMode === import_Calling.CallMode.Direct) {
    const isOtherPersonPresenting = activeCall.remoteParticipants.some((participant) => participant.presenting);
    return isOtherPersonPresenting ? activeCall.conversation : void 0;
  }
  if (activeCall.callMode === import_Calling.CallMode.Group) {
    return activeCall.remoteParticipants.find((participant) => participant.presenting);
  }
  return void 0;
}
function useScreenSharingToast({ activeCall, i18n }) {
  const [result, setResult] = (0, import_react.useState)(void 0);
  const [previousPresenter, setPreviousPresenter] = (0, import_react.useState)(void 0);
  const previousPresenterId = previousPresenter?.id;
  const previousPresenterTitle = previousPresenter?.title;
  (0, import_react.useEffect)(() => {
    const currentPresenter = getCurrentPresenter(activeCall);
    if (!currentPresenter && previousPresenterId) {
      if (previousPresenterId === ME) {
        setResult({
          type: "dismissable",
          message: i18n("calling__presenting--you-stopped")
        });
      } else if (previousPresenterTitle) {
        setResult({
          type: "dismissable",
          message: i18n("calling__presenting--person-stopped", [
            previousPresenterTitle
          ])
        });
      }
    }
  }, [activeCall, i18n, previousPresenterId, previousPresenterTitle]);
  (0, import_react.useEffect)(() => {
    const currentPresenter = getCurrentPresenter(activeCall);
    if (currentPresenter === ME) {
      setPreviousPresenter({
        id: ME
      });
    } else if (!currentPresenter) {
      setPreviousPresenter(void 0);
    } else {
      const { id, title } = currentPresenter;
      setPreviousPresenter({ id, title });
    }
  }, [activeCall]);
  return result;
}
const CallingToastManager = /* @__PURE__ */ __name((props) => {
  const reconnectingToast = getReconnectingToast(props);
  const screenSharingToast = useScreenSharingToast(props);
  let toast;
  if (reconnectingToast) {
    toast = reconnectingToast;
  } else if (screenSharingToast) {
    toast = screenSharingToast;
  }
  const [toastMessage, setToastMessage] = (0, import_react.useState)("");
  const timeoutRef = (0, import_react.useRef)(null);
  const dismissToast = (0, import_react.useCallback)(() => {
    if (timeoutRef) {
      setToastMessage("");
    }
  }, [setToastMessage, timeoutRef]);
  (0, import_react.useEffect)(() => {
    if (toast) {
      if (toast.type === "dismissable") {
        (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeoutRef.current);
        timeoutRef.current = setTimeout(dismissToast, import_CallingToast.DEFAULT_LIFETIME);
      }
      setToastMessage(toast.message);
    }
    return () => {
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeoutRef.current);
    };
  }, [dismissToast, setToastMessage, timeoutRef, toast]);
  return /* @__PURE__ */ import_react.default.createElement(import_CallingToast.CallingToast, {
    isVisible: Boolean(toastMessage),
    onClick: dismissToast
  }, toastMessage);
}, "CallingToastManager");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingToastManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1RvYXN0TWFuYWdlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQWN0aXZlQ2FsbFR5cGUgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IENhbGxNb2RlLCBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuaW1wb3J0IHsgQ2FsbGluZ1RvYXN0LCBERUZBVUxUX0xJRkVUSU1FIH0gZnJvbSAnLi9DYWxsaW5nVG9hc3QnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgYWN0aXZlQ2FsbDogQWN0aXZlQ2FsbFR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG50eXBlIFRvYXN0VHlwZSA9XG4gIHwge1xuICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgdHlwZTogJ2Rpc21pc3NhYmxlJyB8ICdzdGF0aWMnO1xuICAgIH1cbiAgfCB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGdldFJlY29ubmVjdGluZ1RvYXN0KHsgYWN0aXZlQ2FsbCwgaTE4biB9OiBQcm9wc1R5cGUpOiBUb2FzdFR5cGUge1xuICBpZiAoXG4gICAgYWN0aXZlQ2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiZcbiAgICBhY3RpdmVDYWxsLmNvbm5lY3Rpb25TdGF0ZSA9PT0gR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZ1xuICApIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogaTE4bignY2FsbFJlY29ubmVjdGluZycpLFxuICAgICAgdHlwZTogJ3N0YXRpYycsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBNRSA9IFN5bWJvbCgnbWUnKTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNlbnRlcihcbiAgYWN0aXZlQ2FsbDogUmVhZG9ubHk8QWN0aXZlQ2FsbFR5cGU+XG4pOiBDb252ZXJzYXRpb25UeXBlIHwgdHlwZW9mIE1FIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGFjdGl2ZUNhbGwucHJlc2VudGluZ1NvdXJjZSkge1xuICAgIHJldHVybiBNRTtcbiAgfVxuICBpZiAoYWN0aXZlQ2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuRGlyZWN0KSB7XG4gICAgY29uc3QgaXNPdGhlclBlcnNvblByZXNlbnRpbmcgPSBhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5zb21lKFxuICAgICAgcGFydGljaXBhbnQgPT4gcGFydGljaXBhbnQucHJlc2VudGluZ1xuICAgICk7XG4gICAgcmV0dXJuIGlzT3RoZXJQZXJzb25QcmVzZW50aW5nID8gYWN0aXZlQ2FsbC5jb252ZXJzYXRpb24gOiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGFjdGl2ZUNhbGwuY2FsbE1vZGUgPT09IENhbGxNb2RlLkdyb3VwKSB7XG4gICAgcmV0dXJuIGFjdGl2ZUNhbGwucmVtb3RlUGFydGljaXBhbnRzLmZpbmQoXG4gICAgICBwYXJ0aWNpcGFudCA9PiBwYXJ0aWNpcGFudC5wcmVzZW50aW5nXG4gICAgKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB1c2VTY3JlZW5TaGFyaW5nVG9hc3QoeyBhY3RpdmVDYWxsLCBpMThuIH06IFByb3BzVHlwZSk6IFRvYXN0VHlwZSB7XG4gIGNvbnN0IFtyZXN1bHQsIHNldFJlc3VsdF0gPSB1c2VTdGF0ZTx1bmRlZmluZWQgfCBUb2FzdFR5cGU+KHVuZGVmaW5lZCk7XG5cbiAgY29uc3QgW3ByZXZpb3VzUHJlc2VudGVyLCBzZXRQcmV2aW91c1ByZXNlbnRlcl0gPSB1c2VTdGF0ZTxcbiAgICB1bmRlZmluZWQgfCB7IGlkOiBzdHJpbmcgfCB0eXBlb2YgTUU7IHRpdGxlPzogc3RyaW5nIH1cbiAgPih1bmRlZmluZWQpO1xuXG4gIGNvbnN0IHByZXZpb3VzUHJlc2VudGVySWQgPSBwcmV2aW91c1ByZXNlbnRlcj8uaWQ7XG4gIGNvbnN0IHByZXZpb3VzUHJlc2VudGVyVGl0bGUgPSBwcmV2aW91c1ByZXNlbnRlcj8udGl0bGU7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50UHJlc2VudGVyID0gZ2V0Q3VycmVudFByZXNlbnRlcihhY3RpdmVDYWxsKTtcbiAgICBpZiAoIWN1cnJlbnRQcmVzZW50ZXIgJiYgcHJldmlvdXNQcmVzZW50ZXJJZCkge1xuICAgICAgaWYgKHByZXZpb3VzUHJlc2VudGVySWQgPT09IE1FKSB7XG4gICAgICAgIHNldFJlc3VsdCh7XG4gICAgICAgICAgdHlwZTogJ2Rpc21pc3NhYmxlJyxcbiAgICAgICAgICBtZXNzYWdlOiBpMThuKCdjYWxsaW5nX19wcmVzZW50aW5nLS15b3Utc3RvcHBlZCcpLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNQcmVzZW50ZXJUaXRsZSkge1xuICAgICAgICBzZXRSZXN1bHQoe1xuICAgICAgICAgIHR5cGU6ICdkaXNtaXNzYWJsZScsXG4gICAgICAgICAgbWVzc2FnZTogaTE4bignY2FsbGluZ19fcHJlc2VudGluZy0tcGVyc29uLXN0b3BwZWQnLCBbXG4gICAgICAgICAgICBwcmV2aW91c1ByZXNlbnRlclRpdGxlLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFthY3RpdmVDYWxsLCBpMThuLCBwcmV2aW91c1ByZXNlbnRlcklkLCBwcmV2aW91c1ByZXNlbnRlclRpdGxlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50UHJlc2VudGVyID0gZ2V0Q3VycmVudFByZXNlbnRlcihhY3RpdmVDYWxsKTtcbiAgICBpZiAoY3VycmVudFByZXNlbnRlciA9PT0gTUUpIHtcbiAgICAgIHNldFByZXZpb3VzUHJlc2VudGVyKHtcbiAgICAgICAgaWQ6IE1FLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghY3VycmVudFByZXNlbnRlcikge1xuICAgICAgc2V0UHJldmlvdXNQcmVzZW50ZXIodW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBpZCwgdGl0bGUgfSA9IGN1cnJlbnRQcmVzZW50ZXI7XG4gICAgICBzZXRQcmV2aW91c1ByZXNlbnRlcih7IGlkLCB0aXRsZSB9KTtcbiAgICB9XG4gIH0sIFthY3RpdmVDYWxsXSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb21wb25lbnQgc2hvdWxkIHNob3cgdG9hc3RzIHdoZW4gdXNlcnMgam9pbiBvciBsZWF2ZS4gU2VlXG4vLyAgIERFU0tUT1AtOTAyLlxuZXhwb3J0IGNvbnN0IENhbGxpbmdUb2FzdE1hbmFnZXI6IFJlYWN0LkZDPFByb3BzVHlwZT4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHJlY29ubmVjdGluZ1RvYXN0ID0gZ2V0UmVjb25uZWN0aW5nVG9hc3QocHJvcHMpO1xuICBjb25zdCBzY3JlZW5TaGFyaW5nVG9hc3QgPSB1c2VTY3JlZW5TaGFyaW5nVG9hc3QocHJvcHMpO1xuXG4gIGxldCB0b2FzdDogVG9hc3RUeXBlO1xuICBpZiAocmVjb25uZWN0aW5nVG9hc3QpIHtcbiAgICB0b2FzdCA9IHJlY29ubmVjdGluZ1RvYXN0O1xuICB9IGVsc2UgaWYgKHNjcmVlblNoYXJpbmdUb2FzdCkge1xuICAgIHRvYXN0ID0gc2NyZWVuU2hhcmluZ1RvYXN0O1xuICB9XG5cbiAgY29uc3QgW3RvYXN0TWVzc2FnZSwgc2V0VG9hc3RNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgdGltZW91dFJlZiA9IHVzZVJlZjxOb2RlSlMuVGltZW91dCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGRpc21pc3NUb2FzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodGltZW91dFJlZikge1xuICAgICAgc2V0VG9hc3RNZXNzYWdlKCcnKTtcbiAgICB9XG4gIH0sIFtzZXRUb2FzdE1lc3NhZ2UsIHRpbWVvdXRSZWZdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0b2FzdCkge1xuICAgICAgaWYgKHRvYXN0LnR5cGUgPT09ICdkaXNtaXNzYWJsZScpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgICAgdGltZW91dFJlZi5jdXJyZW50ID0gc2V0VGltZW91dChkaXNtaXNzVG9hc3QsIERFRkFVTFRfTElGRVRJTUUpO1xuICAgICAgfVxuXG4gICAgICBzZXRUb2FzdE1lc3NhZ2UodG9hc3QubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgfTtcbiAgfSwgW2Rpc21pc3NUb2FzdCwgc2V0VG9hc3RNZXNzYWdlLCB0aW1lb3V0UmVmLCB0b2FzdF0pO1xuXG4gIHJldHVybiAoXG4gICAgPENhbGxpbmdUb2FzdCBpc1Zpc2libGU9e0Jvb2xlYW4odG9hc3RNZXNzYWdlKX0gb25DbGljaz17ZGlzbWlzc1RvYXN0fT5cbiAgICAgIHt0b2FzdE1lc3NhZ2V9XG4gICAgPC9D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
