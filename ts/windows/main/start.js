var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var log = __toESM(require("../../logging/log"));
var import_phase1_ipc = require("./phase1-ipc");
var import_preload = require("../preload");
var import_phase2_dependencies = require("./phase2-dependencies");
var import_phase3_post_signal = require("./phase3-post-signal");
var import_phase4_test = require("./phase4-test");
window.addEventListener("contextmenu", (e) => {
  const node = e.target;
  const isEditable = Boolean(node?.closest('textarea, input, [contenteditable="true"]'));
  const isLink = Boolean(node?.closest("a"));
  const isImage = Boolean(node?.closest(".Lightbox img"));
  const hasSelection = Boolean(window.getSelection()?.toString());
  if (!isEditable && !hasSelection && !isLink && !isImage) {
    e.preventDefault();
  }
});
if (window.SignalContext.config.proxyUrl) {
  log.info("Using provided proxy url");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhcnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG5pbXBvcnQgJy4vcGhhc2UxLWlwYyc7XG5pbXBvcnQgJy4uL3ByZWxvYWQnO1xuaW1wb3J0ICcuL3BoYXNlMi1kZXBlbmRlbmNpZXMnO1xuaW1wb3J0ICcuL3BoYXNlMy1wb3N0LXNpZ25hbCc7XG5pbXBvcnQgJy4vcGhhc2U0LXRlc3QnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBlID0+IHtcbiAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsO1xuXG4gIGNvbnN0IGlzRWRpdGFibGUgPSBCb29sZWFuKFxuICAgIG5vZGU/LmNsb3Nlc3QoJ3RleHRhcmVhLCBpbnB1dCwgW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nKVxuICApO1xuICBjb25zdCBpc0xpbmsgPSBCb29sZWFuKG5vZGU/LmNsb3Nlc3QoJ2EnKSk7XG4gIGNvbnN0IGlzSW1hZ2UgPSBCb29sZWFuKG5vZGU/LmNsb3Nlc3QoJy5MaWdodGJveCBpbWcnKSk7XG4gIGNvbnN0IGhhc1NlbGVjdGlvbiA9IEJvb2xlYW4od2luZG93LmdldFNlbGVjdGlvbigpPy50b1N0cmluZygpKTtcblxuICBpZiAoIWlzRWRpdGFibGUgJiYgIWhhc1NlbGVjdGlvbiAmJiAhaXNMaW5rICYmICFpc0ltYWdlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuaWYgKHdpbmRvdy5TaWduYWxDb250ZXh0LmNvbmZpZy5wcm94eVVybCkge1xuICBsb2cuaW5mbygnVXNpbmcgcHJvdmlkZWQgcHJveHkgdXJsJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxVQUFxQjtBQUVyQix3QkFBTztBQUNQLHFCQUFPO0FBQ1AsaUNBQU87QUFDUCxnQ0FBTztBQUNQLHlCQUFPO0FBRVAsT0FBTyxpQkFBaUIsZUFBZSxPQUFLO0FBQzFDLFFBQU0sT0FBTyxFQUFFO0FBRWYsUUFBTSxhQUFhLFFBQ2pCLE1BQU0sUUFBUSwyQ0FBMkMsQ0FDM0Q7QUFDQSxRQUFNLFNBQVMsUUFBUSxNQUFNLFFBQVEsR0FBRyxDQUFDO0FBQ3pDLFFBQU0sVUFBVSxRQUFRLE1BQU0sUUFBUSxlQUFlLENBQUM7QUFDdEQsUUFBTSxlQUFlLFFBQVEsT0FBTyxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBRTlELE1BQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVM7QUFDdkQsTUFBRSxlQUFlO0FBQUEsRUFDbkI7QUFDRixDQUFDO0FBRUQsSUFBSSxPQUFPLGNBQWMsT0FBTyxVQUFVO0FBQ3hDLE1BQUksS0FBSywwQkFBMEI7QUFDckM7IiwKICAibmFtZXMiOiBbXQp9Cg==
