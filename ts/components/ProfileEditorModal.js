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
var ProfileEditorModal_exports = {};
__export(ProfileEditorModal_exports, {
  ProfileEditorModal: () => ProfileEditorModal
});
module.exports = __toCommonJS(ProfileEditorModal_exports);
var import_react = __toESM(require("react"));
var import_Modal = require("./Modal");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_ProfileEditor = require("./ProfileEditor");
const ProfileEditorModal = /* @__PURE__ */ __name(({
  hasError,
  i18n,
  myProfileChanged,
  onSetSkinTone,
  toggleProfileEditor,
  toggleProfileEditorHasError,
  ...restProps
}) => {
  const MODAL_TITLES_BY_EDIT_STATE = {
    [import_ProfileEditor.EditState.BetterAvatar]: i18n("ProfileEditorModal--avatar"),
    [import_ProfileEditor.EditState.Bio]: i18n("ProfileEditorModal--about"),
    [import_ProfileEditor.EditState.None]: i18n("ProfileEditorModal--profile"),
    [import_ProfileEditor.EditState.ProfileName]: i18n("ProfileEditorModal--name"),
    [import_ProfileEditor.EditState.Username]: i18n("ProfileEditorModal--username")
  };
  const [modalTitle, setModalTitle] = (0, import_react.useState)(MODAL_TITLES_BY_EDIT_STATE[import_ProfileEditor.EditState.None]);
  if (hasError) {
    return /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      cancelText: i18n("Confirmation--confirm"),
      i18n,
      onClose: toggleProfileEditorHasError
    }, i18n("ProfileEditorModal--error"));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasStickyButtons: true,
    hasXButton: true,
    i18n,
    onClose: toggleProfileEditor,
    title: modalTitle
  }, /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
    ...restProps,
    i18n,
    onEditStateChanged: (editState) => {
      setModalTitle(MODAL_TITLES_BY_EDIT_STATE[editState]);
    },
    onProfileChanged: myProfileChanged,
    onSetSkinTone
  })));
}, "ProfileEditorModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProfileEditorModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZmlsZUVkaXRvck1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi9Db25maXJtYXRpb25EaWFsb2cnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgUHJvZmlsZUVkaXRvclByb3BzVHlwZSB9IGZyb20gJy4vUHJvZmlsZUVkaXRvcic7XG5pbXBvcnQgeyBQcm9maWxlRWRpdG9yLCBFZGl0U3RhdGUgfSBmcm9tICcuL1Byb2ZpbGVFZGl0b3InO1xuaW1wb3J0IHR5cGUgeyBQcm9maWxlRGF0YVR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyVXBkYXRlVHlwZSB9IGZyb20gJy4uL3R5cGVzL0F2YXRhcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YVR5cGUgPSB7XG4gIGhhc0Vycm9yOiBib29sZWFuO1xufTtcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIG15UHJvZmlsZUNoYW5nZWQ6IChcbiAgICBwcm9maWxlRGF0YTogUHJvZmlsZURhdGFUeXBlLFxuICAgIGF2YXRhcjogQXZhdGFyVXBkYXRlVHlwZVxuICApID0+IHVua25vd247XG4gIHRvZ2dsZVByb2ZpbGVFZGl0b3I6ICgpID0+IHVua25vd247XG4gIHRvZ2dsZVByb2ZpbGVFZGl0b3JIYXNFcnJvcjogKCkgPT4gdW5rbm93bjtcbn0gJiBQcm9wc0RhdGFUeXBlICZcbiAgT21pdDxQcm9maWxlRWRpdG9yUHJvcHNUeXBlLCAnb25FZGl0U3RhdGVDaGFuZ2VkJyB8ICdvblByb2ZpbGVDaGFuZ2VkJz47XG5cbmV4cG9ydCBjb25zdCBQcm9maWxlRWRpdG9yTW9kYWwgPSAoe1xuICBoYXNFcnJvcixcbiAgaTE4bixcbiAgbXlQcm9maWxlQ2hhbmdlZCxcbiAgb25TZXRTa2luVG9uZSxcbiAgdG9nZ2xlUHJvZmlsZUVkaXRvcixcbiAgdG9nZ2xlUHJvZmlsZUVkaXRvckhhc0Vycm9yLFxuICAuLi5yZXN0UHJvcHNcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgTU9EQUxfVElUTEVTX0JZX0VESVRfU1RBVEU6IFJlY29yZDxFZGl0U3RhdGUsIHN0cmluZz4gPSB7XG4gICAgW0VkaXRTdGF0ZS5CZXR0ZXJBdmF0YXJdOiBpMThuKCdQcm9maWxlRWRpdG9yTW9kYWwtLWF2YXRhcicpLFxuICAgIFtFZGl0U3RhdGUuQmlvXTogaTE4bignUHJvZmlsZUVkaXRvck1vZGFsLS1hYm91dCcpLFxuICAgIFtFZGl0U3RhdGUuTm9uZV06IGkxOG4oJ1Byb2ZpbGVFZGl0b3JNb2RhbC0tcHJvZmlsZScpLFxuICAgIFtFZGl0U3RhdGUuUHJvZmlsZU5hbWVdOiBpMThuKCdQcm9maWxlRWRpdG9yTW9kYWwtLW5hbWUnKSxcbiAgICBbRWRpdFN0YXRlLlVzZXJuYW1lXTogaTE4bignUHJvZmlsZUVkaXRvck1vZGFsLS11c2VybmFtZScpLFxuICB9O1xuXG4gIGNvbnN0IFttb2RhbFRpdGxlLCBzZXRNb2RhbFRpdGxlXSA9IHVzZVN0YXRlKFxuICAgIE1PREFMX1RJVExFU19CWV9FRElUX1NUQVRFW0VkaXRTdGF0ZS5Ob25lXVxuICApO1xuXG4gIGlmIChoYXNFcnJvcikge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgIGNhbmNlbFRleHQ9e2kxOG4oJ0NvbmZpcm1hdGlvbi0tY29uZmlybScpfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNsb3NlPXt0b2dnbGVQcm9maWxlRWRpdG9ySGFzRXJyb3J9XG4gICAgICA+XG4gICAgICAgIHtpMThuKCdQcm9maWxlRWRpdG9yTW9kYWwtLWVycm9yJyl9XG4gICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPE1vZGFsXG4gICAgICAgIGhhc1N0aWNreUJ1dHRvbnNcbiAgICAgICAgaGFzWEJ1dHRvblxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNsb3NlPXt0b2dnbGVQcm9maWxlRWRpdG9yfVxuICAgICAgICB0aXRsZT17bW9kYWxUaXRsZX1cbiAgICAgID5cbiAgICAgICAgPFByb2ZpbGVFZGl0b3JcbiAgICAgICAgICB7Li4ucmVzdFByb3BzfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25FZGl0U3RhdGVDaGFuZ2VkPXtlZGl0U3RhdGUgPT4ge1xuICAgICAgICAgICAgc2V0TW9kYWxUaXRsZShNT0RBTF9USVRMRVNfQllfRURJVF9TVEFURVtlZGl0U3RhdGVdKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uUHJvZmlsZUNoYW5nZWQ9e215UHJvZmlsZUNoYW5nZWR9XG4gICAgICAgICAgb25TZXRTa2luVG9uZT17b25TZXRTa2luVG9uZX1cbiAgICAgICAgLz5cbiAgICAgIDwvTW9kYWw+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUNoQyxtQkFBc0I7QUFDdEIsZ0NBQW1DO0FBRW5DLDJCQUF5QztBQWtCbEMsTUFBTSxxQkFBcUIsd0JBQUM7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsS0FDRztBQUFBLE1BQ3lCO0FBQzVCLFFBQU0sNkJBQXdEO0FBQUEsS0FDM0QsK0JBQVUsZUFBZSxLQUFLLDRCQUE0QjtBQUFBLEtBQzFELCtCQUFVLE1BQU0sS0FBSywyQkFBMkI7QUFBQSxLQUNoRCwrQkFBVSxPQUFPLEtBQUssNkJBQTZCO0FBQUEsS0FDbkQsK0JBQVUsY0FBYyxLQUFLLDBCQUEwQjtBQUFBLEtBQ3ZELCtCQUFVLFdBQVcsS0FBSyw4QkFBOEI7QUFBQSxFQUMzRDtBQUVBLFFBQU0sQ0FBQyxZQUFZLGlCQUFpQiwyQkFDbEMsMkJBQTJCLCtCQUFVLEtBQ3ZDO0FBRUEsTUFBSSxVQUFVO0FBQ1osV0FDRSxtREFBQztBQUFBLE1BQ0MsWUFBWSxLQUFLLHVCQUF1QjtBQUFBLE1BQ3hDO0FBQUEsTUFDQSxTQUFTO0FBQUEsT0FFUixLQUFLLDJCQUEyQixDQUNuQztBQUFBLEVBRUo7QUFFQSxTQUNFLHdGQUNFLG1EQUFDO0FBQUEsSUFDQyxrQkFBZ0I7QUFBQSxJQUNoQixZQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLEtBRVAsbURBQUM7QUFBQSxPQUNLO0FBQUEsSUFDSjtBQUFBLElBQ0Esb0JBQW9CLGVBQWE7QUFDL0Isb0JBQWMsMkJBQTJCLFVBQVU7QUFBQSxJQUNyRDtBQUFBLElBQ0Esa0JBQWtCO0FBQUEsSUFDbEI7QUFBQSxHQUNGLENBQ0YsQ0FDRjtBQUVKLEdBdERrQzsiLAogICJuYW1lcyI6IFtdCn0K
