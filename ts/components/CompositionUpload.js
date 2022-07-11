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
var CompositionUpload_exports = {};
__export(CompositionUpload_exports, {
  CompositionUpload: () => CompositionUpload
});
module.exports = __toCommonJS(CompositionUpload_exports);
var import_react = __toESM(require("react"));
var import_AttachmentToastType = require("../types/AttachmentToastType");
var import_ToastCannotMixImageAndNonImageAttachments = require("./ToastCannotMixImageAndNonImageAttachments");
var import_ToastDangerousFileType = require("./ToastDangerousFileType");
var import_ToastFileSize = require("./ToastFileSize");
var import_ToastMaxAttachments = require("./ToastMaxAttachments");
var import_ToastOneNonImageAtATime = require("./ToastOneNonImageAtATime");
var import_ToastUnableToLoadAttachment = require("./ToastUnableToLoadAttachment");
const CompositionUpload = (0, import_react.forwardRef)(({
  addAttachment,
  addPendingAttachment,
  conversationId,
  draftAttachments,
  i18n,
  processAttachments,
  removeAttachment
}, ref) => {
  const [toastType, setToastType] = (0, import_react.useState)();
  const onFileInputChange = /* @__PURE__ */ __name(async (event) => {
    const files = event.target.files || [];
    await processAttachments({
      addAttachment,
      addPendingAttachment,
      conversationId,
      files: Array.from(files),
      draftAttachments,
      onShowToast: setToastType,
      removeAttachment
    });
  }, "onFileInputChange");
  function closeToast() {
    setToastType(void 0);
  }
  let toast;
  if (toastType === import_AttachmentToastType.AttachmentToastType.ToastFileSize) {
    toast = /* @__PURE__ */ import_react.default.createElement(import_ToastFileSize.ToastFileSize, {
      i18n,
      limit: 100,
      onClose: closeToast,
      units: "MB"
    });
  } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastDangerousFileType) {
    toast = /* @__PURE__ */ import_react.default.createElement(import_ToastDangerousFileType.ToastDangerousFileType, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastMaxAttachments) {
    toast = /* @__PURE__ */ import_react.default.createElement(import_ToastMaxAttachments.ToastMaxAttachments, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastOneNonImageAtATime) {
    toast = /* @__PURE__ */ import_react.default.createElement(import_ToastOneNonImageAtATime.ToastOneNonImageAtATime, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastCannotMixImageAndNonImageAttachments) {
    toast = /* @__PURE__ */ import_react.default.createElement(import_ToastCannotMixImageAndNonImageAttachments.ToastCannotMixImageAndNonImageAttachments, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastUnableToLoadAttachment) {
    toast = /* @__PURE__ */ import_react.default.createElement(import_ToastUnableToLoadAttachment.ToastUnableToLoadAttachment, {
      i18n,
      onClose: closeToast
    });
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, toast, /* @__PURE__ */ import_react.default.createElement("input", {
    hidden: true,
    multiple: true,
    onChange: onFileInputChange,
    ref,
    type: "file"
  }));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompositionUpload
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29tcG9zaXRpb25VcGxvYWQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ2hhbmdlRXZlbnRIYW5kbGVyIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIEluTWVtb3J5QXR0YWNobWVudERyYWZ0VHlwZSxcbiAgQXR0YWNobWVudERyYWZ0VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBBdHRhY2htZW50VG9hc3RUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudFRvYXN0VHlwZSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuaW1wb3J0IHsgVG9hc3RDYW5ub3RNaXhJbWFnZUFuZE5vbkltYWdlQXR0YWNobWVudHMgfSBmcm9tICcuL1RvYXN0Q2Fubm90TWl4SW1hZ2VBbmROb25JbWFnZUF0dGFjaG1lbnRzJztcbmltcG9ydCB7IFRvYXN0RGFuZ2Vyb3VzRmlsZVR5cGUgfSBmcm9tICcuL1RvYXN0RGFuZ2Vyb3VzRmlsZVR5cGUnO1xuaW1wb3J0IHsgVG9hc3RGaWxlU2l6ZSB9IGZyb20gJy4vVG9hc3RGaWxlU2l6ZSc7XG5pbXBvcnQgeyBUb2FzdE1heEF0dGFjaG1lbnRzIH0gZnJvbSAnLi9Ub2FzdE1heEF0dGFjaG1lbnRzJztcbmltcG9ydCB7IFRvYXN0T25lTm9uSW1hZ2VBdEFUaW1lIH0gZnJvbSAnLi9Ub2FzdE9uZU5vbkltYWdlQXRBVGltZSc7XG5pbXBvcnQgeyBUb2FzdFVuYWJsZVRvTG9hZEF0dGFjaG1lbnQgfSBmcm9tICcuL1RvYXN0VW5hYmxlVG9Mb2FkQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IEhhbmRsZUF0dGFjaG1lbnRzUHJvY2Vzc2luZ0FyZ3NUeXBlIH0gZnJvbSAnLi4vdXRpbC9oYW5kbGVBdHRhY2htZW50c1Byb2Nlc3NpbmcnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGFkZEF0dGFjaG1lbnQ6IChcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIGF0dGFjaG1lbnQ6IEluTWVtb3J5QXR0YWNobWVudERyYWZ0VHlwZVxuICApID0+IHVua25vd247XG4gIGFkZFBlbmRpbmdBdHRhY2htZW50OiAoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICBwZW5kaW5nQXR0YWNobWVudDogQXR0YWNobWVudERyYWZ0VHlwZVxuICApID0+IHVua25vd247XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGRyYWZ0QXR0YWNobWVudHM6IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudERyYWZ0VHlwZT47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHByb2Nlc3NBdHRhY2htZW50czogKG9wdGlvbnM6IEhhbmRsZUF0dGFjaG1lbnRzUHJvY2Vzc2luZ0FyZ3NUeXBlKSA9PiB1bmtub3duO1xuICByZW1vdmVBdHRhY2htZW50OiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZykgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wb3NpdGlvblVwbG9hZCA9IGZvcndhcmRSZWY8SFRNTElucHV0RWxlbWVudCwgUHJvcHNUeXBlPihcbiAgKFxuICAgIHtcbiAgICAgIGFkZEF0dGFjaG1lbnQsXG4gICAgICBhZGRQZW5kaW5nQXR0YWNobWVudCxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgZHJhZnRBdHRhY2htZW50cyxcbiAgICAgIGkxOG4sXG4gICAgICBwcm9jZXNzQXR0YWNobWVudHMsXG4gICAgICByZW1vdmVBdHRhY2htZW50LFxuICAgIH0sXG4gICAgcmVmXG4gICkgPT4ge1xuICAgIGNvbnN0IFt0b2FzdFR5cGUsIHNldFRvYXN0VHlwZV0gPSB1c2VTdGF0ZTxcbiAgICAgIEF0dGFjaG1lbnRUb2FzdFR5cGUgfCB1bmRlZmluZWRcbiAgICA+KCk7XG5cbiAgICBjb25zdCBvbkZpbGVJbnB1dENoYW5nZTogQ2hhbmdlRXZlbnRIYW5kbGVyPFxuICAgICAgSFRNTElucHV0RWxlbWVudFxuICAgID4gPSBhc3luYyBldmVudCA9PiB7XG4gICAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnRhcmdldC5maWxlcyB8fCBbXTtcblxuICAgICAgYXdhaXQgcHJvY2Vzc0F0dGFjaG1lbnRzKHtcbiAgICAgICAgYWRkQXR0YWNobWVudCxcbiAgICAgICAgYWRkUGVuZGluZ0F0dGFjaG1lbnQsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBmaWxlczogQXJyYXkuZnJvbShmaWxlcyksXG4gICAgICAgIGRyYWZ0QXR0YWNobWVudHMsXG4gICAgICAgIG9uU2hvd1RvYXN0OiBzZXRUb2FzdFR5cGUsXG4gICAgICAgIHJlbW92ZUF0dGFjaG1lbnQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2VUb2FzdCgpIHtcbiAgICAgIHNldFRvYXN0VHlwZSh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIGxldCB0b2FzdDtcblxuICAgIGlmICh0b2FzdFR5cGUgPT09IEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RGaWxlU2l6ZSkge1xuICAgICAgdG9hc3QgPSAoXG4gICAgICAgIDxUb2FzdEZpbGVTaXplXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBsaW1pdD17MTAwfVxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlVG9hc3R9XG4gICAgICAgICAgdW5pdHM9XCJNQlwiXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodG9hc3RUeXBlID09PSBBdHRhY2htZW50VG9hc3RUeXBlLlRvYXN0RGFuZ2Vyb3VzRmlsZVR5cGUpIHtcbiAgICAgIHRvYXN0ID0gPFRvYXN0RGFuZ2Vyb3VzRmlsZVR5cGUgaTE4bj17aTE4bn0gb25DbG9zZT17Y2xvc2VUb2FzdH0gLz47XG4gICAgfSBlbHNlIGlmICh0b2FzdFR5cGUgPT09IEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RNYXhBdHRhY2htZW50cykge1xuICAgICAgdG9hc3QgPSA8VG9hc3RNYXhBdHRhY2htZW50cyBpMThuPXtpMThufSBvbkNsb3NlPXtjbG9zZVRvYXN0fSAvPjtcbiAgICB9IGVsc2UgaWYgKHRvYXN0VHlwZSA9PT0gQXR0YWNobWVudFRvYXN0VHlwZS5Ub2FzdE9uZU5vbkltYWdlQXRBVGltZSkge1xuICAgICAgdG9hc3QgPSA8VG9hc3RPbmVOb25JbWFnZUF0QVRpbWUgaTE4bj17aTE4bn0gb25DbG9zZT17Y2xvc2VUb2FzdH0gLz47XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRvYXN0VHlwZSA9PT1cbiAgICAgIEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RDYW5ub3RNaXhJbWFnZUFuZE5vbkltYWdlQXR0YWNobWVudHNcbiAgICApIHtcbiAgICAgIHRvYXN0ID0gKFxuICAgICAgICA8VG9hc3RDYW5ub3RNaXhJbWFnZUFuZE5vbkltYWdlQXR0YWNobWVudHNcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlVG9hc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodG9hc3RUeXBlID09PSBBdHRhY2htZW50VG9hc3RUeXBlLlRvYXN0VW5hYmxlVG9Mb2FkQXR0YWNobWVudCkge1xuICAgICAgdG9hc3QgPSA8VG9hc3RVbmFibGVUb0xvYWRBdHRhY2htZW50IGkxOG49e2kxOG59IG9uQ2xvc2U9e2Nsb3NlVG9hc3R9IC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICB7dG9hc3R9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGhpZGRlblxuICAgICAgICAgIG11bHRpcGxlXG4gICAgICAgICAgb25DaGFuZ2U9e29uRmlsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQTRDO0FBTTVDLGlDQUFvQztBQUdwQyx1REFBMEQ7QUFDMUQsb0NBQXVDO0FBQ3ZDLDJCQUE4QjtBQUM5QixpQ0FBb0M7QUFDcEMscUNBQXdDO0FBQ3hDLHlDQUE0QztBQW1CckMsTUFBTSxvQkFBb0IsNkJBQy9CLENBQ0U7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FFRixRQUNHO0FBQ0gsUUFBTSxDQUFDLFdBQVcsZ0JBQWdCLDJCQUVoQztBQUVGLFFBQU0sb0JBRUYsOEJBQU0sVUFBUztBQUNqQixVQUFNLFFBQVEsTUFBTSxPQUFPLFNBQVMsQ0FBQztBQUVyQyxVQUFNLG1CQUFtQjtBQUFBLE1BQ3ZCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLE9BQU8sTUFBTSxLQUFLLEtBQUs7QUFBQSxNQUN2QjtBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBWkk7QUFjSix3QkFBc0I7QUFDcEIsaUJBQWEsTUFBUztBQUFBLEVBQ3hCO0FBRlMsQUFJVCxNQUFJO0FBRUosTUFBSSxjQUFjLCtDQUFvQixlQUFlO0FBQ25ELFlBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxPQUFNO0FBQUEsS0FDUjtBQUFBLEVBRUosV0FBVyxjQUFjLCtDQUFvQix3QkFBd0I7QUFDbkUsWUFBUSxtREFBQztBQUFBLE1BQXVCO0FBQUEsTUFBWSxTQUFTO0FBQUEsS0FBWTtBQUFBLEVBQ25FLFdBQVcsY0FBYywrQ0FBb0IscUJBQXFCO0FBQ2hFLFlBQVEsbURBQUM7QUFBQSxNQUFvQjtBQUFBLE1BQVksU0FBUztBQUFBLEtBQVk7QUFBQSxFQUNoRSxXQUFXLGNBQWMsK0NBQW9CLHlCQUF5QjtBQUNwRSxZQUFRLG1EQUFDO0FBQUEsTUFBd0I7QUFBQSxNQUFZLFNBQVM7QUFBQSxLQUFZO0FBQUEsRUFDcEUsV0FDRSxjQUNBLCtDQUFvQiwyQ0FDcEI7QUFDQSxZQUNFLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsU0FBUztBQUFBLEtBQ1g7QUFBQSxFQUVKLFdBQVcsY0FBYywrQ0FBb0IsNkJBQTZCO0FBQ3hFLFlBQVEsbURBQUM7QUFBQSxNQUE0QjtBQUFBLE1BQVksU0FBUztBQUFBLEtBQVk7QUFBQSxFQUN4RTtBQUVBLFNBQ0Usd0ZBQ0csT0FDRCxtREFBQztBQUFBLElBQ0MsUUFBTTtBQUFBLElBQ04sVUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE1BQUs7QUFBQSxHQUNQLENBQ0Y7QUFFSixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
