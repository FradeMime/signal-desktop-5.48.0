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
var useAnimated_exports = {};
__export(useAnimated_exports, {
  useAnimated: () => useAnimated
});
module.exports = __toCommonJS(useAnimated_exports);
var import_react = require("react");
var import_web = require("@react-spring/web");
function useAnimated(onClose, {
  getFrom,
  getTo
}) {
  const [isOpen, setIsOpen] = (0, import_react.useState)(true);
  const modalRef = (0, import_web.useSpringRef)();
  const modalStyles = (0, import_web.useSpring)({
    from: getFrom(isOpen),
    to: getTo(isOpen),
    onRest: () => {
      if (!isOpen) {
        onClose();
      }
    },
    config: {
      clamp: true,
      friction: 20,
      mass: 0.5,
      tension: 350
    },
    ref: modalRef
  });
  const overlayRef = (0, import_web.useSpringRef)();
  const overlayStyles = (0, import_web.useSpring)({
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
    config: {
      clamp: true,
      friction: 22,
      tension: 360
    },
    ref: overlayRef
  });
  (0, import_web.useChain)(isOpen ? [overlayRef, modalRef] : [modalRef, overlayRef]);
  return {
    close: () => setIsOpen(false),
    overlayStyles,
    modalStyles
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAnimated
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlQW5pbWF0ZWQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBTcHJpbmdWYWx1ZXMgfSBmcm9tICdAcmVhY3Qtc3ByaW5nL3dlYic7XG5pbXBvcnQgeyB1c2VDaGFpbiwgdXNlU3ByaW5nLCB1c2VTcHJpbmdSZWYgfSBmcm9tICdAcmVhY3Qtc3ByaW5nL3dlYic7XG5cbmV4cG9ydCB0eXBlIE1vZGFsQ29uZmlnVHlwZSA9IHtcbiAgb3BhY2l0eTogbnVtYmVyO1xuICB0cmFuc2Zvcm0/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlQW5pbWF0ZWQoXG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd24sXG4gIHtcbiAgICBnZXRGcm9tLFxuICAgIGdldFRvLFxuICB9OiB7XG4gICAgZ2V0RnJvbTogKGlzT3BlbjogYm9vbGVhbikgPT4gTW9kYWxDb25maWdUeXBlO1xuICAgIGdldFRvOiAoaXNPcGVuOiBib29sZWFuKSA9PiBNb2RhbENvbmZpZ1R5cGU7XG4gIH1cbik6IHtcbiAgY2xvc2U6ICgpID0+IHVua25vd247XG4gIG1vZGFsU3R5bGVzOiBTcHJpbmdWYWx1ZXM8TW9kYWxDb25maWdUeXBlPjtcbiAgb3ZlcmxheVN0eWxlczogU3ByaW5nVmFsdWVzPE1vZGFsQ29uZmlnVHlwZT47XG59IHtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IG1vZGFsUmVmID0gdXNlU3ByaW5nUmVmKCk7XG5cbiAgY29uc3QgbW9kYWxTdHlsZXMgPSB1c2VTcHJpbmcoe1xuICAgIGZyb206IGdldEZyb20oaXNPcGVuKSxcbiAgICB0bzogZ2V0VG8oaXNPcGVuKSxcbiAgICBvblJlc3Q6ICgpID0+IHtcbiAgICAgIGlmICghaXNPcGVuKSB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbmZpZzoge1xuICAgICAgY2xhbXA6IHRydWUsXG4gICAgICBmcmljdGlvbjogMjAsXG4gICAgICBtYXNzOiAwLjUsXG4gICAgICB0ZW5zaW9uOiAzNTAsXG4gICAgfSxcbiAgICByZWY6IG1vZGFsUmVmLFxuICB9KTtcblxuICBjb25zdCBvdmVybGF5UmVmID0gdXNlU3ByaW5nUmVmKCk7XG5cbiAgY29uc3Qgb3ZlcmxheVN0eWxlcyA9IHVzZVNwcmluZyh7XG4gICAgZnJvbTogeyBvcGFjaXR5OiAwIH0sXG4gICAgdG86IHsgb3BhY2l0eTogaXNPcGVuID8gMSA6IDAgfSxcbiAgICBjb25maWc6IHtcbiAgICAgIGNsYW1wOiB0cnVlLFxuICAgICAgZnJpY3Rpb246IDIyLFxuICAgICAgdGVuc2lvbjogMzYwLFxuICAgIH0sXG4gICAgcmVmOiBvdmVybGF5UmVmLFxuICB9KTtcblxuICB1c2VDaGFpbihpc09wZW4gPyBbb3ZlcmxheVJlZiwgbW9kYWxSZWZdIDogW21vZGFsUmVmLCBvdmVybGF5UmVmXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjbG9zZTogKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSxcbiAgICBvdmVybGF5U3R5bGVzLFxuICAgIG1vZGFsU3R5bGVzLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF5QjtBQUV6QixpQkFBa0Q7QUFPM0MscUJBQ0wsU0FDQTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsR0FTRjtBQUNBLFFBQU0sQ0FBQyxRQUFRLGFBQWEsMkJBQVMsSUFBSTtBQUV6QyxRQUFNLFdBQVcsNkJBQWE7QUFFOUIsUUFBTSxjQUFjLDBCQUFVO0FBQUEsSUFDNUIsTUFBTSxRQUFRLE1BQU07QUFBQSxJQUNwQixJQUFJLE1BQU0sTUFBTTtBQUFBLElBQ2hCLFFBQVEsTUFBTTtBQUNaLFVBQUksQ0FBQyxRQUFRO0FBQ1gsZ0JBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLEtBQUs7QUFBQSxFQUNQLENBQUM7QUFFRCxRQUFNLGFBQWEsNkJBQWE7QUFFaEMsUUFBTSxnQkFBZ0IsMEJBQVU7QUFBQSxJQUM5QixNQUFNLEVBQUUsU0FBUyxFQUFFO0FBQUEsSUFDbkIsSUFBSSxFQUFFLFNBQVMsU0FBUyxJQUFJLEVBQUU7QUFBQSxJQUM5QixRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsS0FBSztBQUFBLEVBQ1AsQ0FBQztBQUVELDJCQUFTLFNBQVMsQ0FBQyxZQUFZLFFBQVEsSUFBSSxDQUFDLFVBQVUsVUFBVSxDQUFDO0FBRWpFLFNBQU87QUFBQSxJQUNMLE9BQU8sTUFBTSxVQUFVLEtBQUs7QUFBQSxJQUM1QjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUF2RGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
