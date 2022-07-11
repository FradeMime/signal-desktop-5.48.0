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
var ShareStage_exports = {};
__export(ShareStage_exports, {
  ShareStage: () => ShareStage
});
module.exports = __toCommonJS(ShareStage_exports);
var React = __toESM(require("react"));
var import_AppStage = require("./AppStage");
var styles = __toESM(require("./ShareStage.scss"));
var appStyles = __toESM(require("./AppStage.scss"));
var import_history = require("../../util/history");
var import_Typography = require("../../elements/Typography");
var import_CopyText = require("../../elements/CopyText");
var import_Toast = require("../../elements/Toast");
var import_ShareButtons = require("../../components/ShareButtons");
var import_StickerPackPreview = require("../../components/StickerPackPreview");
var import_store = require("../../store");
var import_i18n = require("../../util/i18n");
var import_Intl = require("../../../ts/components/Intl");
const ShareStage = /* @__PURE__ */ __name(() => {
  const i18n = (0, import_i18n.useI18n)();
  const actions = import_store.stickersDuck.useStickerActions();
  const title = import_store.stickersDuck.useTitle();
  const author = import_store.stickersDuck.useAuthor();
  const images = import_store.stickersDuck.useOrderedImagePaths();
  const shareUrl = import_store.stickersDuck.usePackUrl();
  const [linkCopied, setLinkCopied] = React.useState(false);
  const onCopy = React.useCallback(() => {
    setLinkCopied(true);
  }, [setLinkCopied]);
  const resetLinkCopied = React.useCallback(() => {
    setLinkCopied(false);
  }, [setLinkCopied]);
  const handleNext = React.useCallback(() => {
    window.close();
  }, []);
  const handlePrev = React.useCallback(() => {
    actions.reset();
    import_history.history.push("/");
  }, [actions]);
  return /* @__PURE__ */ React.createElement(import_AppStage.AppStage, {
    nextText: i18n("StickerCreator--ShareStage--close"),
    onNext: handleNext,
    nextActive: true,
    prevText: i18n("StickerCreator--ShareStage--createAnother"),
    onPrev: handlePrev
  }, shareUrl ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_Typography.H2, null, i18n("StickerCreator--ShareStage--title")), /* @__PURE__ */ React.createElement(import_Typography.Text, {
    className: styles.message
  }, i18n("StickerCreator--ShareStage--help")), /* @__PURE__ */ React.createElement("div", {
    className: styles.main
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement(import_StickerPackPreview.StickerPackPreview, {
    title,
    author,
    images
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement(import_CopyText.CopyText, {
    value: shareUrl,
    label: i18n("StickerCreator--ShareStage--copyTitle"),
    onCopy
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement(import_Typography.Text, {
    className: styles.callToAction,
    center: true
  }, /* @__PURE__ */ React.createElement(import_Intl.Intl, {
    i18n,
    id: "StickerCreator--ShareStage--callToAction",
    components: [
      /* @__PURE__ */ React.createElement("strong", {
        key: "hashtag"
      }, "#makeprivacystick")
    ]
  }))), /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement(import_ShareButtons.ShareButtons, {
    value: shareUrl
  }))), linkCopied ? /* @__PURE__ */ React.createElement("div", {
    className: appStyles.toaster
  }, /* @__PURE__ */ React.createElement(import_Toast.Toast, {
    onClick: resetLinkCopied
  }, i18n("StickerCreator--Toasts--linkedCopied"))) : null) : null);
}, "ShareStage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShareStage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hhcmVTdGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcHBTdGFnZSB9IGZyb20gJy4vQXBwU3RhZ2UnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vU2hhcmVTdGFnZS5zY3NzJztcbmltcG9ydCAqIGFzIGFwcFN0eWxlcyBmcm9tICcuL0FwcFN0YWdlLnNjc3MnO1xuaW1wb3J0IHsgaGlzdG9yeSB9IGZyb20gJy4uLy4uL3V0aWwvaGlzdG9yeSc7XG5pbXBvcnQgeyBIMiwgVGV4dCB9IGZyb20gJy4uLy4uL2VsZW1lbnRzL1R5cG9ncmFwaHknO1xuaW1wb3J0IHsgQ29weVRleHQgfSBmcm9tICcuLi8uLi9lbGVtZW50cy9Db3B5VGV4dCc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4uLy4uL2VsZW1lbnRzL1RvYXN0JztcbmltcG9ydCB7IFNoYXJlQnV0dG9ucyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU2hhcmVCdXR0b25zJztcbmltcG9ydCB7IFN0aWNrZXJQYWNrUHJldmlldyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU3RpY2tlclBhY2tQcmV2aWV3JztcbmltcG9ydCB7IHN0aWNrZXJzRHVjayB9IGZyb20gJy4uLy4uL3N0b3JlJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi8uLi91dGlsL2kxOG4nO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uLy4uLy4uL3RzL2NvbXBvbmVudHMvSW50bCc7XG5cbmV4cG9ydCBjb25zdCBTaGFyZVN0YWdlOiBSZWFjdC5Db21wb25lbnRUeXBlID0gKCkgPT4ge1xuICBjb25zdCBpMThuID0gdXNlSTE4bigpO1xuICBjb25zdCBhY3Rpb25zID0gc3RpY2tlcnNEdWNrLnVzZVN0aWNrZXJBY3Rpb25zKCk7XG4gIGNvbnN0IHRpdGxlID0gc3RpY2tlcnNEdWNrLnVzZVRpdGxlKCk7XG4gIGNvbnN0IGF1dGhvciA9IHN0aWNrZXJzRHVjay51c2VBdXRob3IoKTtcbiAgY29uc3QgaW1hZ2VzID0gc3RpY2tlcnNEdWNrLnVzZU9yZGVyZWRJbWFnZVBhdGhzKCk7XG4gIGNvbnN0IHNoYXJlVXJsID0gc3RpY2tlcnNEdWNrLnVzZVBhY2tVcmwoKTtcbiAgY29uc3QgW2xpbmtDb3BpZWQsIHNldExpbmtDb3BpZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBvbkNvcHkgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0TGlua0NvcGllZCh0cnVlKTtcbiAgfSwgW3NldExpbmtDb3BpZWRdKTtcbiAgY29uc3QgcmVzZXRMaW5rQ29waWVkID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldExpbmtDb3BpZWQoZmFsc2UpO1xuICB9LCBbc2V0TGlua0NvcGllZF0pO1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgd2luZG93LmNsb3NlKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQcmV2ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGFjdGlvbnMucmVzZXQoKTtcbiAgICBoaXN0b3J5LnB1c2goJy8nKTtcbiAgfSwgW2FjdGlvbnNdKTtcblxuICByZXR1cm4gKFxuICAgIDxBcHBTdGFnZVxuICAgICAgbmV4dFRleHQ9e2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1TaGFyZVN0YWdlLS1jbG9zZScpfVxuICAgICAgb25OZXh0PXtoYW5kbGVOZXh0fVxuICAgICAgbmV4dEFjdGl2ZVxuICAgICAgcHJldlRleHQ9e2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1TaGFyZVN0YWdlLS1jcmVhdGVBbm90aGVyJyl9XG4gICAgICBvblByZXY9e2hhbmRsZVByZXZ9XG4gICAgPlxuICAgICAge3NoYXJlVXJsID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxIMj57aTE4bignU3RpY2tlckNyZWF0b3ItLVNoYXJlU3RhZ2UtLXRpdGxlJyl9PC9IMj5cbiAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9e3N0eWxlcy5tZXNzYWdlfT5cbiAgICAgICAgICAgIHtpMThuKCdTdGlja2VyQ3JlYXRvci0tU2hhcmVTdGFnZS0taGVscCcpfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICA8U3RpY2tlclBhY2tQcmV2aWV3XG4gICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgIGF1dGhvcj17YXV0aG9yfVxuICAgICAgICAgICAgICAgIGltYWdlcz17aW1hZ2VzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgIDxDb3B5VGV4dFxuICAgICAgICAgICAgICAgIHZhbHVlPXtzaGFyZVVybH1cbiAgICAgICAgICAgICAgICBsYWJlbD17aTE4bignU3RpY2tlckNyZWF0b3ItLVNoYXJlU3RhZ2UtLWNvcHlUaXRsZScpfVxuICAgICAgICAgICAgICAgIG9uQ29weT17b25Db3B5fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT17c3R5bGVzLmNhbGxUb0FjdGlvbn0gY2VudGVyPlxuICAgICAgICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgaWQ9XCJTdGlja2VyQ3JlYXRvci0tU2hhcmVTdGFnZS0tY2FsbFRvQWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM9e1tcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBrZXk9XCJoYXNodGFnXCI+I21ha2Vwcml2YWN5c3RpY2s8L3N0cm9uZz4sXG4gICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICA8U2hhcmVCdXR0b25zIHZhbHVlPXtzaGFyZVVybH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtsaW5rQ29waWVkID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2FwcFN0eWxlcy50b2FzdGVyfT5cbiAgICAgICAgICAgICAgPFRvYXN0IG9uQ2xpY2s9e3Jlc2V0TGlua0NvcGllZH0+XG4gICAgICAgICAgICAgICAge2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1Ub2FzdHMtLWxpbmtlZENvcGllZCcpfVxuICAgICAgICAgICAgICA8L1RvYXN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9BcHBTdGFnZT5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsc0JBQXlCO0FBQ3pCLGFBQXdCO0FBQ3hCLGdCQUEyQjtBQUMzQixxQkFBd0I7QUFDeEIsd0JBQXlCO0FBQ3pCLHNCQUF5QjtBQUN6QixtQkFBc0I7QUFDdEIsMEJBQTZCO0FBQzdCLGdDQUFtQztBQUNuQyxtQkFB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
