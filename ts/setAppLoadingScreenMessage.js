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
var setAppLoadingScreenMessage_exports = {};
__export(setAppLoadingScreenMessage_exports, {
  setAppLoadingScreenMessage: () => setAppLoadingScreenMessage
});
module.exports = __toCommonJS(setAppLoadingScreenMessage_exports);
const DISPLAY_THRESHOLD = 3e3;
const SELECTOR = ".app-loading-screen .message";
let timeout;
let targetString;
let didTimeout = false;
const clear = /* @__PURE__ */ __name(() => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}, "clear");
function setAppLoadingScreenMessage(loadingText, i18n) {
  const message = document.querySelector(SELECTOR);
  if (!message) {
    return clear;
  }
  targetString = loadingText || i18n("optimizingApplication");
  message.innerText = didTimeout ? targetString : i18n("loading");
  if (timeout) {
    return clear;
  }
  timeout = setTimeout(() => {
    didTimeout = true;
    const innerMessage = document.querySelector(SELECTOR);
    if (!innerMessage) {
      return;
    }
    innerMessage.innerText = targetString;
  }, DISPLAY_THRESHOLD);
  return clear;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setAppLoadingScreenMessage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0QXBwTG9hZGluZ1NjcmVlbk1lc3NhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBESVNQTEFZX1RIUkVTSE9MRCA9IDMwMDA7IC8vIG1pbGxpc2Vjb25kc1xuY29uc3QgU0VMRUNUT1IgPSAnLmFwcC1sb2FkaW5nLXNjcmVlbiAubWVzc2FnZSc7XG5cbmxldCB0aW1lb3V0OiBudWxsIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG5sZXQgdGFyZ2V0U3RyaW5nOiBzdHJpbmc7XG5sZXQgZGlkVGltZW91dCA9IGZhbHNlO1xuXG5jb25zdCBjbGVhciA9ICgpID0+IHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBcHBMb2FkaW5nU2NyZWVuTWVzc2FnZShcbiAgbG9hZGluZ1RleHQ6IHVuZGVmaW5lZCB8IHN0cmluZyxcbiAgaTE4bjogTG9jYWxpemVyVHlwZVxuKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihTRUxFQ1RPUik7XG4gIGlmICghbWVzc2FnZSkge1xuICAgIHJldHVybiBjbGVhcjtcbiAgfVxuXG4gIHRhcmdldFN0cmluZyA9IGxvYWRpbmdUZXh0IHx8IGkxOG4oJ29wdGltaXppbmdBcHBsaWNhdGlvbicpO1xuXG4gIG1lc3NhZ2UuaW5uZXJUZXh0ID0gZGlkVGltZW91dCA/IHRhcmdldFN0cmluZyA6IGkxOG4oJ2xvYWRpbmcnKTtcblxuICBpZiAodGltZW91dCkge1xuICAgIHJldHVybiBjbGVhcjtcbiAgfVxuXG4gIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkaWRUaW1lb3V0ID0gdHJ1ZTtcbiAgICBjb25zdCBpbm5lck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihTRUxFQ1RPUik7XG4gICAgaWYgKCFpbm5lck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5uZXJNZXNzYWdlLmlubmVyVGV4dCA9IHRhcmdldFN0cmluZztcbiAgfSwgRElTUExBWV9USFJFU0hPTEQpO1xuXG4gIHJldHVybiBjbGVhcjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxNQUFNLG9CQUFvQjtBQUMxQixNQUFNLFdBQVc7QUFFakIsSUFBSTtBQUNKLElBQUk7QUFDSixJQUFJLGFBQWE7QUFFakIsTUFBTSxRQUFRLDZCQUFNO0FBQ2xCLE1BQUksU0FBUztBQUNYLGlCQUFhLE9BQU87QUFDcEIsY0FBVTtBQUFBLEVBQ1o7QUFDRixHQUxjO0FBT1Asb0NBQ0wsYUFDQSxNQUNZO0FBQ1osUUFBTSxVQUFVLFNBQVMsY0FBMkIsUUFBUTtBQUM1RCxNQUFJLENBQUMsU0FBUztBQUNaLFdBQU87QUFBQSxFQUNUO0FBRUEsaUJBQWUsZUFBZSxLQUFLLHVCQUF1QjtBQUUxRCxVQUFRLFlBQVksYUFBYSxlQUFlLEtBQUssU0FBUztBQUU5RCxNQUFJLFNBQVM7QUFDWCxXQUFPO0FBQUEsRUFDVDtBQUVBLFlBQVUsV0FBVyxNQUFNO0FBQ3pCLGlCQUFhO0FBQ2IsVUFBTSxlQUFlLFNBQVMsY0FBMkIsUUFBUTtBQUNqRSxRQUFJLENBQUMsY0FBYztBQUNqQjtBQUFBLElBQ0Y7QUFDQSxpQkFBYSxZQUFZO0FBQUEsRUFDM0IsR0FBRyxpQkFBaUI7QUFFcEIsU0FBTztBQUNUO0FBM0JnQiIsCiAgIm5hbWVzIjogW10KfQo=
