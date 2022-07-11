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
var useKeyboardShortcuts_exports = {};
__export(useKeyboardShortcuts_exports, {
  useActiveCallShortcuts: () => useActiveCallShortcuts,
  useAttachFileShortcut: () => useAttachFileShortcut,
  useIncomingCallShortcuts: () => useIncomingCallShortcuts,
  useKeyboardShortcuts: () => useKeyboardShortcuts,
  useStartCallShortcuts: () => useStartCallShortcuts,
  useStartRecordingShortcut: () => useStartRecordingShortcut
});
module.exports = __toCommonJS(useKeyboardShortcuts_exports);
var import_react = require("react");
var import_lodash = require("lodash");
var KeyboardLayout = __toESM(require("../services/keyboardLayout"));
function isCmdOrCtrl(ev) {
  const { ctrlKey, metaKey } = ev;
  const commandKey = (0, import_lodash.get)(window, "platform") === "darwin" && metaKey;
  const controlKey = (0, import_lodash.get)(window, "platform") !== "darwin" && ctrlKey;
  return commandKey || controlKey;
}
function isCtrlOrAlt(ev) {
  const { altKey, ctrlKey } = ev;
  const controlKey = (0, import_lodash.get)(window, "platform") === "darwin" && ctrlKey;
  const theAltKey = (0, import_lodash.get)(window, "platform") !== "darwin" && altKey;
  return controlKey || theAltKey;
}
function useActiveCallShortcuts(hangUp) {
  return (0, import_react.useCallback)((ev) => {
    const { shiftKey } = ev;
    const key = KeyboardLayout.lookup(ev);
    if (isCtrlOrAlt(ev) && shiftKey && (key === "e" || key === "E")) {
      ev.preventDefault();
      ev.stopPropagation();
      hangUp();
      return true;
    }
    return false;
  }, [hangUp]);
}
function useIncomingCallShortcuts(acceptAudioCall, acceptVideoCall, declineCall) {
  return (0, import_react.useCallback)((ev) => {
    const { shiftKey } = ev;
    const key = KeyboardLayout.lookup(ev);
    if (isCtrlOrAlt(ev) && shiftKey && (key === "v" || key === "V")) {
      ev.preventDefault();
      ev.stopPropagation();
      acceptVideoCall();
      return true;
    }
    if (isCtrlOrAlt(ev) && shiftKey && (key === "a" || key === "A")) {
      ev.preventDefault();
      ev.stopPropagation();
      acceptAudioCall();
      return true;
    }
    if (isCtrlOrAlt(ev) && shiftKey && (key === "d" || key === "D")) {
      ev.preventDefault();
      ev.stopPropagation();
      declineCall();
      return true;
    }
    return false;
  }, [acceptAudioCall, acceptVideoCall, declineCall]);
}
function useStartCallShortcuts(startAudioCall, startVideoCall) {
  return (0, import_react.useCallback)((ev) => {
    const { shiftKey } = ev;
    const key = KeyboardLayout.lookup(ev);
    if (isCtrlOrAlt(ev) && shiftKey && (key === "c" || key === "C")) {
      ev.preventDefault();
      ev.stopPropagation();
      startAudioCall();
      return true;
    }
    if (isCtrlOrAlt(ev) && shiftKey && (key === "y" || key === "Y")) {
      ev.preventDefault();
      ev.stopPropagation();
      startVideoCall();
      return true;
    }
    return false;
  }, [startAudioCall, startVideoCall]);
}
function useStartRecordingShortcut(startAudioRecording) {
  return (0, import_react.useCallback)((ev) => {
    const { shiftKey } = ev;
    const key = KeyboardLayout.lookup(ev);
    if (isCmdOrCtrl(ev) && shiftKey && (key === "v" || key === "V")) {
      ev.preventDefault();
      ev.stopPropagation();
      startAudioRecording();
      return true;
    }
    return false;
  }, [startAudioRecording]);
}
function useAttachFileShortcut(attachFile) {
  return (0, import_react.useCallback)((ev) => {
    const { shiftKey } = ev;
    const key = KeyboardLayout.lookup(ev);
    if (isCmdOrCtrl(ev) && !shiftKey && (key === "u" || key === "U")) {
      ev.preventDefault();
      ev.stopPropagation();
      attachFile();
      return true;
    }
    return false;
  }, [attachFile]);
}
function useKeyboardShortcuts(...eventHandlers) {
  (0, import_react.useEffect)(() => {
    function handleKeydown(ev) {
      eventHandlers.some((eventHandler) => eventHandler(ev));
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [eventHandlers]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useActiveCallShortcuts,
  useAttachFileShortcut,
  useIncomingCallShortcuts,
  useKeyboardShortcuts,
  useStartCallShortcuts,
  useStartRecordingShortcut
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlS2V5Ym9hcmRTaG9ydGN1dHMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBLZXlib2FyZExheW91dCBmcm9tICcuLi9zZXJ2aWNlcy9rZXlib2FyZExheW91dCc7XG5cbnR5cGUgS2V5Ym9hcmRTaG9ydGN1dEhhbmRsZXJUeXBlID0gKGV2OiBLZXlib2FyZEV2ZW50KSA9PiBib29sZWFuO1xuXG5mdW5jdGlvbiBpc0NtZE9yQ3RybChldjogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICBjb25zdCB7IGN0cmxLZXksIG1ldGFLZXkgfSA9IGV2O1xuICBjb25zdCBjb21tYW5kS2V5ID0gZ2V0KHdpbmRvdywgJ3BsYXRmb3JtJykgPT09ICdkYXJ3aW4nICYmIG1ldGFLZXk7XG4gIGNvbnN0IGNvbnRyb2xLZXkgPSBnZXQod2luZG93LCAncGxhdGZvcm0nKSAhPT0gJ2RhcndpbicgJiYgY3RybEtleTtcbiAgcmV0dXJuIGNvbW1hbmRLZXkgfHwgY29udHJvbEtleTtcbn1cblxuZnVuY3Rpb24gaXNDdHJsT3JBbHQoZXY6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgY29uc3QgeyBhbHRLZXksIGN0cmxLZXkgfSA9IGV2O1xuICBjb25zdCBjb250cm9sS2V5ID0gZ2V0KHdpbmRvdywgJ3BsYXRmb3JtJykgPT09ICdkYXJ3aW4nICYmIGN0cmxLZXk7XG4gIGNvbnN0IHRoZUFsdEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpICE9PSAnZGFyd2luJyAmJiBhbHRLZXk7XG4gIHJldHVybiBjb250cm9sS2V5IHx8IHRoZUFsdEtleTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUFjdGl2ZUNhbGxTaG9ydGN1dHMoXG4gIGhhbmdVcDogKCkgPT4gdW5rbm93blxuKTogS2V5Ym9hcmRTaG9ydGN1dEhhbmRsZXJUeXBlIHtcbiAgcmV0dXJuIHVzZUNhbGxiYWNrKFxuICAgIGV2ID0+IHtcbiAgICAgIGNvbnN0IHsgc2hpZnRLZXkgfSA9IGV2O1xuICAgICAgY29uc3Qga2V5ID0gS2V5Ym9hcmRMYXlvdXQubG9va3VwKGV2KTtcblxuICAgICAgaWYgKGlzQ3RybE9yQWx0KGV2KSAmJiBzaGlmdEtleSAmJiAoa2V5ID09PSAnZScgfHwga2V5ID09PSAnRScpKSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGhhbmdVcCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgW2hhbmdVcF1cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUluY29taW5nQ2FsbFNob3J0Y3V0cyhcbiAgYWNjZXB0QXVkaW9DYWxsOiAoKSA9PiB1bmtub3duLFxuICBhY2NlcHRWaWRlb0NhbGw6ICgpID0+IHVua25vd24sXG4gIGRlY2xpbmVDYWxsOiAoKSA9PiB1bmtub3duXG4pOiBLZXlib2FyZFNob3J0Y3V0SGFuZGxlclR5cGUge1xuICByZXR1cm4gdXNlQ2FsbGJhY2soXG4gICAgZXYgPT4ge1xuICAgICAgY29uc3QgeyBzaGlmdEtleSB9ID0gZXY7XG4gICAgICBjb25zdCBrZXkgPSBLZXlib2FyZExheW91dC5sb29rdXAoZXYpO1xuXG4gICAgICBpZiAoaXNDdHJsT3JBbHQoZXYpICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICd2JyB8fCBrZXkgPT09ICdWJykpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgYWNjZXB0VmlkZW9DYWxsKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDdHJsT3JBbHQoZXYpICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICdhJyB8fCBrZXkgPT09ICdBJykpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgYWNjZXB0QXVkaW9DYWxsKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDdHJsT3JBbHQoZXYpICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICdkJyB8fCBrZXkgPT09ICdEJykpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgZGVjbGluZUNhbGwoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIFthY2NlcHRBdWRpb0NhbGwsIGFjY2VwdFZpZGVvQ2FsbCwgZGVjbGluZUNhbGxdXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGFydENhbGxTaG9ydGN1dHMoXG4gIHN0YXJ0QXVkaW9DYWxsOiAoKSA9PiB1bmtub3duLFxuICBzdGFydFZpZGVvQ2FsbDogKCkgPT4gdW5rbm93blxuKTogS2V5Ym9hcmRTaG9ydGN1dEhhbmRsZXJUeXBlIHtcbiAgcmV0dXJuIHVzZUNhbGxiYWNrKFxuICAgIGV2ID0+IHtcbiAgICAgIGNvbnN0IHsgc2hpZnRLZXkgfSA9IGV2O1xuICAgICAgY29uc3Qga2V5ID0gS2V5Ym9hcmRMYXlvdXQubG9va3VwKGV2KTtcblxuICAgICAgaWYgKGlzQ3RybE9yQWx0KGV2KSAmJiBzaGlmdEtleSAmJiAoa2V5ID09PSAnYycgfHwga2V5ID09PSAnQycpKSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHN0YXJ0QXVkaW9DYWxsKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDdHJsT3JBbHQoZXYpICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICd5JyB8fCBrZXkgPT09ICdZJykpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgc3RhcnRWaWRlb0NhbGwoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIFtzdGFydEF1ZGlvQ2FsbCwgc3RhcnRWaWRlb0NhbGxdXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGFydFJlY29yZGluZ1Nob3J0Y3V0KFxuICBzdGFydEF1ZGlvUmVjb3JkaW5nOiAoKSA9PiB1bmtub3duXG4pOiBLZXlib2FyZFNob3J0Y3V0SGFuZGxlclR5cGUge1xuICByZXR1cm4gdXNlQ2FsbGJhY2soXG4gICAgZXYgPT4ge1xuICAgICAgY29uc3QgeyBzaGlmdEtleSB9ID0gZXY7XG4gICAgICBjb25zdCBrZXkgPSBLZXlib2FyZExheW91dC5sb29rdXAoZXYpO1xuXG4gICAgICBpZiAoaXNDbWRPckN0cmwoZXYpICYmIHNoaWZ0S2V5ICYmIChrZXkgPT09ICd2JyB8fCBrZXkgPT09ICdWJykpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgc3RhcnRBdWRpb1JlY29yZGluZygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgW3N0YXJ0QXVkaW9SZWNvcmRpbmddXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBdHRhY2hGaWxlU2hvcnRjdXQoXG4gIGF0dGFjaEZpbGU6ICgpID0+IHVua25vd25cbik6IEtleWJvYXJkU2hvcnRjdXRIYW5kbGVyVHlwZSB7XG4gIHJldHVybiB1c2VDYWxsYmFjayhcbiAgICBldiA9PiB7XG4gICAgICBjb25zdCB7IHNoaWZ0S2V5IH0gPSBldjtcbiAgICAgIGNvbnN0IGtleSA9IEtleWJvYXJkTGF5b3V0Lmxvb2t1cChldik7XG5cbiAgICAgIGlmIChpc0NtZE9yQ3RybChldikgJiYgIXNoaWZ0S2V5ICYmIChrZXkgPT09ICd1JyB8fCBrZXkgPT09ICdVJykpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgYXR0YWNoRmlsZSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgW2F0dGFjaEZpbGVdXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VLZXlib2FyZFNob3J0Y3V0cyhcbiAgLi4uZXZlbnRIYW5kbGVyczogQXJyYXk8S2V5Ym9hcmRTaG9ydGN1dEhhbmRsZXJUeXBlPlxuKTogdm9pZCB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5ZG93bihldjogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgZXZlbnRIYW5kbGVycy5zb21lKGV2ZW50SGFuZGxlciA9PiBldmVudEhhbmRsZXIoZXYpKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5ZG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlkb3duKTtcbiAgICB9O1xuICB9LCBbZXZlbnRIYW5kbGVyc10pO1xufVxuIl0sCiAgIm1hcHBp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
