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
var AvatarUploadButton_exports = {};
__export(AvatarUploadButton_exports, {
  AvatarUploadButton: () => AvatarUploadButton
});
module.exports = __toCommonJS(AvatarUploadButton_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_processImageFile = require("../util/processImageFile");
const AvatarUploadButton = /* @__PURE__ */ __name(({
  className,
  i18n,
  onChange
}) => {
  const fileInputRef = (0, import_react.useRef)(null);
  const [processingFile, setProcessingFile] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!processingFile) {
      return import_lodash.noop;
    }
    let shouldCancel = false;
    (async () => {
      let newAvatar;
      try {
        newAvatar = await (0, import_processImageFile.processImageFile)(processingFile);
      } catch (err) {
        return;
      }
      if (shouldCancel) {
        return;
      }
      setProcessingFile(void 0);
      onChange(newAvatar);
    })();
    return () => {
      shouldCancel = true;
    };
  }, [onChange, processingFile]);
  const onInputChange = /* @__PURE__ */ __name((event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setProcessingFile(file);
    }
  }, "onInputChange");
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", {
    className,
    onClick: () => {
      const fileInput = fileInputRef.current;
      if (fileInput) {
        fileInput.value = "";
        fileInput.click();
      }
    },
    type: "button"
  }, i18n("photo")), /* @__PURE__ */ import_react.default.createElement("input", {
    accept: ".gif,.jpg,.jpeg,.png,.webp,image/gif,image/jpeg,image/png,image/webp",
    hidden: true,
    onChange: onInputChange,
    ref: fileInputRef,
    type: "file"
  }));
}, "AvatarUploadButton");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarUploadButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyVXBsb2FkQnV0dG9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENoYW5nZUV2ZW50SGFuZGxlciB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBwcm9jZXNzSW1hZ2VGaWxlIH0gZnJvbSAnLi4vdXRpbC9wcm9jZXNzSW1hZ2VGaWxlJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DaGFuZ2U6IChhdmF0YXI6IFVpbnQ4QXJyYXkpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgQXZhdGFyVXBsb2FkQnV0dG9uID0gKHtcbiAgY2xhc3NOYW1lLFxuICBpMThuLFxuICBvbkNoYW5nZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmPG51bGwgfCBIVE1MSW5wdXRFbGVtZW50PihudWxsKTtcblxuICBjb25zdCBbcHJvY2Vzc2luZ0ZpbGUsIHNldFByb2Nlc3NpbmdGaWxlXSA9IHVzZVN0YXRlPEZpbGUgfCB1bmRlZmluZWQ+KCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByb2Nlc3NpbmdGaWxlKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkQ2FuY2VsID0gZmFsc2U7XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IG5ld0F2YXRhcjogVWludDhBcnJheTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0F2YXRhciA9IGF3YWl0IHByb2Nlc3NJbWFnZUZpbGUocHJvY2Vzc2luZ0ZpbGUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIFByb2Nlc3NpbmcgZXJyb3JzIHNob3VsZCBiZSByYXJlOyBpZiB0aGV5IGRvLCB3ZSBzaWxlbnRseSBmYWlsLiBJbiBhbiBpZGVhbFxuICAgICAgICAvLyAgIHdvcmxkLCB3ZSBtYXkgd2FudCB0byBzaG93IGEgdG9hc3QgaW5zdGVhZC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHNob3VsZENhbmNlbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRQcm9jZXNzaW5nRmlsZSh1bmRlZmluZWQpO1xuICAgICAgb25DaGFuZ2UobmV3QXZhdGFyKTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNob3VsZENhbmNlbCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW29uQ2hhbmdlLCBwcm9jZXNzaW5nRmlsZV0pO1xuXG4gIGNvbnN0IG9uSW5wdXRDaGFuZ2U6IENoYW5nZUV2ZW50SGFuZGxlcjxIVE1MSW5wdXRFbGVtZW50PiA9IGV2ZW50ID0+IHtcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzICYmIGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgc2V0UHJvY2Vzc2luZ0ZpbGUoZmlsZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSBmaWxlSW5wdXRSZWYuY3VycmVudDtcbiAgICAgICAgICBpZiAoZmlsZUlucHV0KSB7XG4gICAgICAgICAgICAvLyBTZXR0aW5nIHRoZSB2YWx1ZSB0byBlbXB0eSBzbyB0aGF0IG9uQ2hhbmdlIGFsd2F5cyBmaXJlcyBpbiBjYXNlXG4gICAgICAgICAgICAvLyB5b3UgYWRkIG11bHRpcGxlIHBob3Rvcy5cbiAgICAgICAgICAgIGZpbGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgZmlsZUlucHV0LmNsaWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgID5cbiAgICAgICAge2kxOG4oJ3Bob3RvJyl9XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxpbnB1dFxuICAgICAgICBhY2NlcHQ9XCIuZ2lmLC5qcGcsLmpwZWcsLnBuZywud2VicCxpbWFnZS9naWYsaW1hZ2UvanBlZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiXG4gICAgICAgIGhpZGRlblxuICAgICAgICBvbkNoYW5nZT17b25JbnB1dENoYW5nZX1cbiAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgIC8+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFtRDtBQUNuRCxvQkFBcUI7QUFHckIsOEJBQWlDO0FBUTFCLE1BQU0scUJBQXFCLHdCQUFDO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sZUFBZSx5QkFBZ0MsSUFBSTtBQUV6RCxRQUFNLENBQUMsZ0JBQWdCLHFCQUFxQiwyQkFBMkI7QUFFdkUsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLGVBQWU7QUFFbkIsSUFBQyxhQUFZO0FBQ1gsVUFBSTtBQUNKLFVBQUk7QUFDRixvQkFBWSxNQUFNLDhDQUFpQixjQUFjO0FBQUEsTUFDbkQsU0FBUyxLQUFQO0FBR0E7QUFBQSxNQUNGO0FBQ0EsVUFBSSxjQUFjO0FBQ2hCO0FBQUEsTUFDRjtBQUNBLHdCQUFrQixNQUFTO0FBQzNCLGVBQVMsU0FBUztBQUFBLElBQ3BCLEdBQUc7QUFFSCxXQUFPLE1BQU07QUFDWCxxQkFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRixHQUFHLENBQUMsVUFBVSxjQUFjLENBQUM7QUFFN0IsUUFBTSxnQkFBc0Qsa0NBQVM7QUFDbkUsVUFBTSxPQUFPLE1BQU0sT0FBTyxTQUFTLE1BQU0sT0FBTyxNQUFNO0FBQ3RELFFBQUksTUFBTTtBQUNSLHdCQUFrQixJQUFJO0FBQUEsSUFDeEI7QUFBQSxFQUNGLEdBTDREO0FBTzVELFNBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxTQUFTLE1BQU07QUFDYixZQUFNLFlBQVksYUFBYTtBQUMvQixVQUFJLFdBQVc7QUFHYixrQkFBVSxRQUFRO0FBQ2xCLGtCQUFVLE1BQU07QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQUs7QUFBQSxLQUVKLEtBQUssT0FBTyxDQUNmLEdBQ0EsbURBQUM7QUFBQSxJQUNDLFFBQU87QUFBQSxJQUNQLFFBQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxJQUNMLE1BQUs7QUFBQSxHQUNQLENBQ0Y7QUFFSixHQXRFa0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
