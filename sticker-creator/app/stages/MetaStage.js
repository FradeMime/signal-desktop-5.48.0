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
var MetaStage_exports = {};
__export(MetaStage_exports, {
  MetaStage: () => MetaStage
});
module.exports = __toCommonJS(MetaStage_exports);
var React = __toESM(require("react"));
var import_AppStage = require("./AppStage");
var styles = __toESM(require("./MetaStage.scss"));
var import_preload = require("../../util/preload");
var import_useStickerDropzone = require("../../util/useStickerDropzone");
var import_history = require("../../util/history");
var import_Typography = require("../../elements/Typography");
var import_LabeledInput = require("../../elements/LabeledInput");
var import_ConfirmModal = require("../../components/ConfirmModal");
var import_store = require("../../store");
var import_i18n = require("../../util/i18n");
const MetaStage = /* @__PURE__ */ __name(() => {
  const i18n = (0, import_i18n.useI18n)();
  const actions = import_store.stickersDuck.useStickerActions();
  const valid = import_store.stickersDuck.useAllDataValid();
  const cover = import_store.stickersDuck.useCover();
  const title = import_store.stickersDuck.useTitle();
  const author = import_store.stickersDuck.useAuthor();
  const [confirming, setConfirming] = React.useState(false);
  const onDrop = React.useCallback(async ([{ path }]) => {
    try {
      const stickerImage = await (0, import_preload.processStickerImage)(path);
      actions.setCover(stickerImage);
    } catch (e) {
      actions.removeSticker(path);
    }
  }, [actions]);
  const { getRootProps, getInputProps, isDragActive } = (0, import_useStickerDropzone.useStickerDropzone)(onDrop);
  const onNext = React.useCallback(() => {
    setConfirming(true);
  }, [setConfirming]);
  const onCancel = React.useCallback(() => {
    setConfirming(false);
  }, [setConfirming]);
  const onConfirm = React.useCallback(() => {
    import_history.history.push("/upload");
  }, []);
  const coverFrameClass = isDragActive ? styles.coverFrameActive : styles.coverFrame;
  return /* @__PURE__ */ React.createElement(import_AppStage.AppStage, {
    onNext,
    nextActive: valid,
    noMessage: true,
    prev: "/add-emojis"
  }, confirming ? /* @__PURE__ */ React.createElement(import_ConfirmModal.ConfirmModal, {
    title: i18n("StickerCreator--MetaStage--ConfirmDialog--title"),
    confirm: i18n("StickerCreator--MetaStage--ConfirmDialog--confirm"),
    onCancel,
    onConfirm
  }, i18n("StickerCreator--MetaStage--ConfirmDialog--text")) : null, /* @__PURE__ */ React.createElement(import_Typography.H2, null, i18n("StickerCreator--MetaStage--title")), /* @__PURE__ */ React.createElement("div", {
    className: styles.main
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement(import_LabeledInput.LabeledInput, {
    value: title,
    onChange: actions.setTitle
  }, i18n("StickerCreator--MetaStage--Field--title"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement(import_LabeledInput.LabeledInput, {
    value: author,
    onChange: actions.setAuthor
  }, i18n("StickerCreator--MetaStage--Field--author"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement("h3", {
    className: styles.label
  }, i18n("StickerCreator--MetaStage--Field--cover")), /* @__PURE__ */ React.createElement(import_Typography.Text, null, i18n("StickerCreator--MetaStage--Field--cover--help")), /* @__PURE__ */ React.createElement("div", {
    className: styles.coverContainer
  }, /* @__PURE__ */ React.createElement("div", {
    ...getRootProps(),
    className: coverFrameClass
  }, cover?.src ? /* @__PURE__ */ React.createElement("img", {
    className: styles.coverImage,
    src: cover.src,
    alt: "Cover"
  }) : null, /* @__PURE__ */ React.createElement("input", {
    ...getInputProps()
  }))))));
}, "MetaStage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MetaStage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWV0YVN0YWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgRmlsZVdpdGhQYXRoIH0gZnJvbSAncmVhY3QtZHJvcHpvbmUnO1xuaW1wb3J0IHsgQXBwU3RhZ2UgfSBmcm9tICcuL0FwcFN0YWdlJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL01ldGFTdGFnZS5zY3NzJztcbmltcG9ydCB7IHByb2Nlc3NTdGlja2VySW1hZ2UgfSBmcm9tICcuLi8uLi91dGlsL3ByZWxvYWQnO1xuaW1wb3J0IHsgdXNlU3RpY2tlckRyb3B6b25lIH0gZnJvbSAnLi4vLi4vdXRpbC91c2VTdGlja2VyRHJvcHpvbmUnO1xuaW1wb3J0IHsgaGlzdG9yeSB9IGZyb20gJy4uLy4uL3V0aWwvaGlzdG9yeSc7XG5pbXBvcnQgeyBIMiwgVGV4dCB9IGZyb20gJy4uLy4uL2VsZW1lbnRzL1R5cG9ncmFwaHknO1xuaW1wb3J0IHsgTGFiZWxlZElucHV0IH0gZnJvbSAnLi4vLi4vZWxlbWVudHMvTGFiZWxlZElucHV0JztcbmltcG9ydCB7IENvbmZpcm1Nb2RhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ29uZmlybU1vZGFsJztcbmltcG9ydCB7IHN0aWNrZXJzRHVjayB9IGZyb20gJy4uLy4uL3N0b3JlJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi8uLi91dGlsL2kxOG4nO1xuXG5leHBvcnQgY29uc3QgTWV0YVN0YWdlOiBSZWFjdC5Db21wb25lbnRUeXBlID0gKCkgPT4ge1xuICBjb25zdCBpMThuID0gdXNlSTE4bigpO1xuICBjb25zdCBhY3Rpb25zID0gc3RpY2tlcnNEdWNrLnVzZVN0aWNrZXJBY3Rpb25zKCk7XG4gIGNvbnN0IHZhbGlkID0gc3RpY2tlcnNEdWNrLnVzZUFsbERhdGFWYWxpZCgpO1xuICBjb25zdCBjb3ZlciA9IHN0aWNrZXJzRHVjay51c2VDb3ZlcigpO1xuICBjb25zdCB0aXRsZSA9IHN0aWNrZXJzRHVjay51c2VUaXRsZSgpO1xuICBjb25zdCBhdXRob3IgPSBzdGlja2Vyc0R1Y2sudXNlQXV0aG9yKCk7XG4gIGNvbnN0IFtjb25maXJtaW5nLCBzZXRDb25maXJtaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBvbkRyb3AgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICBhc3luYyAoW3sgcGF0aCB9XTogQXJyYXk8RmlsZVdpdGhQYXRoPikgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3RpY2tlckltYWdlID0gYXdhaXQgcHJvY2Vzc1N0aWNrZXJJbWFnZShwYXRoKTtcbiAgICAgICAgYWN0aW9ucy5zZXRDb3ZlcihzdGlja2VySW1hZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhY3Rpb25zLnJlbW92ZVN0aWNrZXIocGF0aCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYWN0aW9uc11cbiAgKTtcblxuICBjb25zdCB7IGdldFJvb3RQcm9wcywgZ2V0SW5wdXRQcm9wcywgaXNEcmFnQWN0aXZlIH0gPVxuICAgIHVzZVN0aWNrZXJEcm9wem9uZShvbkRyb3ApO1xuXG4gIGNvbnN0IG9uTmV4dCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRDb25maXJtaW5nKHRydWUpO1xuICB9LCBbc2V0Q29uZmlybWluZ10pO1xuXG4gIGNvbnN0IG9uQ2FuY2VsID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldENvbmZpcm1pbmcoZmFsc2UpO1xuICB9LCBbc2V0Q29uZmlybWluZ10pO1xuXG4gIGNvbnN0IG9uQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBoaXN0b3J5LnB1c2goJy91cGxvYWQnKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvdmVyRnJhbWVDbGFzcyA9IGlzRHJhZ0FjdGl2ZVxuICAgID8gc3R5bGVzLmNvdmVyRnJhbWVBY3RpdmVcbiAgICA6IHN0eWxlcy5jb3ZlckZyYW1lO1xuXG4gIHJldHVybiAoXG4gICAgPEFwcFN0YWdlIG9uTmV4dD17b25OZXh0fSBuZXh0QWN0aXZlPXt2YWxpZH0gbm9NZXNzYWdlIHByZXY9XCIvYWRkLWVtb2ppc1wiPlxuICAgICAge2NvbmZpcm1pbmcgPyAoXG4gICAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgICB0aXRsZT17aTE4bignU3RpY2tlckNyZWF0b3ItLU1ldGFTdGFnZS0tQ29uZmlybURpYWxvZy0tdGl0bGUnKX1cbiAgICAgICAgICBjb25maXJtPXtpMThuKCdTdGlja2VyQ3JlYXRvci0tTWV0YVN0YWdlLS1Db25maXJtRGlhbG9nLS1jb25maXJtJyl9XG4gICAgICAgICAgb25DYW5jZWw9e29uQ2FuY2VsfVxuICAgICAgICAgIG9uQ29uZmlybT17b25Db25maXJtfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1NZXRhU3RhZ2UtLUNvbmZpcm1EaWFsb2ctLXRleHQnKX1cbiAgICAgICAgPC9Db25maXJtTW9kYWw+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxIMj57aTE4bignU3RpY2tlckNyZWF0b3ItLU1ldGFTdGFnZS0tdGl0bGUnKX08L0gyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgIDxMYWJlbGVkSW5wdXQgdmFsdWU9e3RpdGxlfSBvbkNoYW5nZT17YWN0aW9ucy5zZXRUaXRsZX0+XG4gICAgICAgICAgICB7aTE4bignU3RpY2tlckNyZWF0b3ItLU1ldGFTdGFnZS0tRmllbGQtLXRpdGxlJyl9XG4gICAgICAgICAgPC9MYWJlbGVkSW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgPExhYmVsZWRJbnB1dCB2YWx1ZT17YXV0aG9yfSBvbkNoYW5nZT17YWN0aW9ucy5zZXRBdXRob3J9PlxuICAgICAgICAgICAge2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1NZXRhU3RhZ2UtLUZpZWxkLS1hdXRob3InKX1cbiAgICAgICAgICA8L0xhYmVsZWRJbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucm93fT5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtzdHlsZXMubGFiZWx9PlxuICAgICAgICAgICAge2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1NZXRhU3RhZ2UtLUZpZWxkLS1jb3ZlcicpfVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPFRleHQ+e2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1NZXRhU3RhZ2UtLUZpZWxkLS1jb3Zlci0taGVscCcpfTwvVGV4dD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvdmVyQ29udGFpbmVyfT5cbiAgICAgICAgICAgIDxkaXYgey4uLmdldFJvb3RQcm9wcygpfSBjbGFzc05hbWU9e2NvdmVyRnJhbWVDbGFzc30+XG4gICAgICAgICAgICAgIHtjb3Zlcj8uc3JjID8gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmNvdmVySW1hZ2V9XG4gICAgICAgICAgICAgICAgICBzcmM9e2NvdmVyLnNyY31cbiAgICAgICAgICAgICAgICAgIGFsdD1cIkNvdmVyXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPGlucHV0IHsuLi5nZXRJbnB1dFByb3BzKCl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAg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
