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
var UploadStage_exports = {};
__export(UploadStage_exports, {
  UploadStage: () => UploadStage
});
module.exports = __toCommonJS(UploadStage_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_AppStage = require("./AppStage");
var styles = __toESM(require("./UploadStage.scss"));
var import_history = require("../../util/history");
var import_ProgressBar = require("../../elements/ProgressBar");
var import_Typography = require("../../elements/Typography");
var import_Button = require("../../elements/Button");
var import_store = require("../../store");
var import_preload = require("../../util/preload");
var import_i18n = require("../../util/i18n");
const handleCancel = /* @__PURE__ */ __name(() => {
  import_history.history.push("/add-meta");
}, "handleCancel");
const UploadStage = /* @__PURE__ */ __name(() => {
  const i18n = (0, import_i18n.useI18n)();
  const actions = import_store.stickersDuck.useStickerActions();
  const cover = import_store.stickersDuck.useCover();
  const title = import_store.stickersDuck.useTitle();
  const author = import_store.stickersDuck.useAuthor();
  const orderedData = import_store.stickersDuck.useSelectOrderedData();
  const total = orderedData.length;
  const [complete, setComplete] = React.useState(0);
  React.useEffect(() => {
    (async () => {
      const onProgress = /* @__PURE__ */ __name(() => {
        setComplete((i) => i + 1);
      }, "onProgress");
      try {
        const packMeta = await (0, import_preload.encryptAndUpload)({ title, author }, orderedData, cover, onProgress);
        actions.setPackMeta(packMeta);
        import_history.history.push("/share");
      } catch (e) {
        window.SignalContext.log.error("Error uploading image:", e);
        actions.addToast({
          key: "StickerCreator--Toasts--errorUploading",
          subs: [e.message]
        });
        import_history.history.push("/add-meta");
      }
    })();
    return import_lodash.noop;
  }, [actions, title, author, cover, orderedData]);
  return /* @__PURE__ */ React.createElement(import_AppStage.AppStage, {
    empty: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.base
  }, /* @__PURE__ */ React.createElement(import_Typography.H2, null, i18n("StickerCreator--UploadStage--title")), /* @__PURE__ */ React.createElement(import_Typography.Text, null, i18n("StickerCreator--UploadStage-uploaded", {
    count: String(complete),
    total: String(total)
  })), /* @__PURE__ */ React.createElement(import_ProgressBar.ProgressBar, {
    count: complete,
    total,
    className: styles.progress
  }), /* @__PURE__ */ React.createElement(import_Button.Button, {
    onClick: handleCancel
  }, i18n("cancel"))));
}, "UploadStage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UploadStage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXBsb2FkU3RhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBBcHBTdGFnZSB9IGZyb20gJy4vQXBwU3RhZ2UnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vVXBsb2FkU3RhZ2Uuc2Nzcyc7XG5pbXBvcnQgeyBoaXN0b3J5IH0gZnJvbSAnLi4vLi4vdXRpbC9oaXN0b3J5JztcbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnLi4vLi4vZWxlbWVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgSDIsIFRleHQgfSBmcm9tICcuLi8uLi9lbGVtZW50cy9UeXBvZ3JhcGh5JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uLy4uL2VsZW1lbnRzL0J1dHRvbic7XG5pbXBvcnQgeyBzdGlja2Vyc0R1Y2sgfSBmcm9tICcuLi8uLi9zdG9yZSc7XG5pbXBvcnQgeyBlbmNyeXB0QW5kVXBsb2FkIH0gZnJvbSAnLi4vLi4vdXRpbC9wcmVsb2FkJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi8uLi91dGlsL2kxOG4nO1xuXG5jb25zdCBoYW5kbGVDYW5jZWwgPSAoKSA9PiB7XG4gIGhpc3RvcnkucHVzaCgnL2FkZC1tZXRhJyk7XG59O1xuXG5leHBvcnQgY29uc3QgVXBsb2FkU3RhZ2U6IFJlYWN0LkNvbXBvbmVudFR5cGUgPSAoKSA9PiB7XG4gIGNvbnN0IGkxOG4gPSB1c2VJMThuKCk7XG4gIGNvbnN0IGFjdGlvbnMgPSBzdGlja2Vyc0R1Y2sudXNlU3RpY2tlckFjdGlvbnMoKTtcbiAgY29uc3QgY292ZXIgPSBzdGlja2Vyc0R1Y2sudXNlQ292ZXIoKTtcbiAgY29uc3QgdGl0bGUgPSBzdGlja2Vyc0R1Y2sudXNlVGl0bGUoKTtcbiAgY29uc3QgYXV0aG9yID0gc3RpY2tlcnNEdWNrLnVzZUF1dGhvcigpO1xuICBjb25zdCBvcmRlcmVkRGF0YSA9IHN0aWNrZXJzRHVjay51c2VTZWxlY3RPcmRlcmVkRGF0YSgpO1xuICBjb25zdCB0b3RhbCA9IG9yZGVyZWREYXRhLmxlbmd0aDtcbiAgY29uc3QgW2NvbXBsZXRlLCBzZXRDb21wbGV0ZV0gPSBSZWFjdC51c2VTdGF0ZSgwKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvblByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICBzZXRDb21wbGV0ZShpID0+IGkgKyAxKTtcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYWNrTWV0YSA9IGF3YWl0IGVuY3J5cHRBbmRVcGxvYWQoXG4gICAgICAgICAgeyB0aXRsZSwgYXV0aG9yIH0sXG4gICAgICAgICAgb3JkZXJlZERhdGEsXG4gICAgICAgICAgY292ZXIsXG4gICAgICAgICAgb25Qcm9ncmVzc1xuICAgICAgICApO1xuICAgICAgICBhY3Rpb25zLnNldFBhY2tNZXRhKHBhY2tNZXRhKTtcbiAgICAgICAgaGlzdG9yeS5wdXNoKCcvc2hhcmUnKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmVycm9yKCdFcnJvciB1cGxvYWRpbmcgaW1hZ2U6JywgZSk7XG4gICAgICAgIGFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgIGtleTogJ1N0aWNrZXJDcmVhdG9yLS1Ub2FzdHMtLWVycm9yVXBsb2FkaW5nJyxcbiAgICAgICAgICBzdWJzOiBbZS5tZXNzYWdlXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGhpc3RvcnkucHVzaCgnL2FkZC1tZXRhJyk7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHJldHVybiBub29wO1xuICB9LCBbYWN0aW9ucywgdGl0bGUsIGF1dGhvciwgY292ZXIsIG9yZGVyZWREYXRhXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QXBwU3RhZ2UgZW1wdHk+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJhc2V9PlxuICAgICAgICA8SDI+e2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1VcGxvYWRTdGFnZS0tdGl0bGUnKX08L0gyPlxuICAgICAgICA8VGV4dD5cbiAgICAgICAgICB7aTE4bignU3RpY2tlckNyZWF0b3ItLVVwbG9hZFN0YWdlLXVwbG9hZGVkJywge1xuICAgICAgICAgICAgLy8gV2UgY29udmVydCB0aGVzZSB0byBzdHJpbmcgc28gdGhhdCAwIGlzbid0IGZhbHN5LCB3aGljaCBpMThuIGNoZWNrcyBmb3IuXG4gICAgICAgICAgICBjb3VudDogU3RyaW5nKGNvbXBsZXRlKSxcbiAgICAgICAgICAgIHRvdGFsOiBTdHJpbmcodG90YWwpLFxuICAgICAgICAgIH0pfVxuICAgICAgICA8L1RleHQ+XG4gICAgICAgIDxQcm9ncmVzc0JhclxuICAgICAgICAgIGNvdW50PXtjb21wbGV0ZX1cbiAgICAgICAgICB0b3RhbD17dG90YWx9XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucHJvZ3Jlc3N9XG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlQ2FuY2VsfT57aTE4bignY2FuY2VsJyl9PC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L0FwcFN0YWdlPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixvQkFBcUI7QUFDckIsc0JBQXlCO0FBQ3pCLGFBQXdCO0FBQ3hCLHFCQUF3QjtBQUN4Qix5QkFBNEI7QUFDNUIsd0JBQXlCO0FBQ3pCLG9CQUF1QjtBQUN2QixtQkFBNkI7QUFDN0IscUJBQWlDO0FBQ2pDLGtCQUF3QjtBQUV4QixNQUFNLGVBQWUsNkJBQU07QUFDekIseUJBQVEsS0FBSyxXQUFXO0FBQzFCLEdBRnFCO0FBSWQsTUFBTSxjQUFtQyw2QkFBTTtBQUNwRCxRQUFNLE9BQU8seUJBQVE7QUFDckIsUUFBTSxVQUFVLDBCQUFhLGtCQUFrQjtBQUMvQyxRQUFNLFFBQVEsMEJBQWEsU0FBUztBQUNwQyxRQUFNLFFBQVEsMEJBQWEsU0FBUztBQUNwQyxRQUFNLFNBQVMsMEJBQWEsVUFBVTtBQUN0QyxRQUFNLGNBQWMsMEJBQWEscUJBQXFCO0FBQ3RELFFBQU0sUUFBUSxZQUFZO0FBQzFCLFFBQU0sQ0FBQyxVQUFVLGVBQWUsTUFBTSxTQUFTLENBQUM7QUFFaEQsUUFBTSxVQUFVLE1BQU07QUFDcEIsSUFBQyxhQUFZO0FBQ1gsWUFBTSxhQUFhLDZCQUFNO0FBQ3ZCLG9CQUFZLE9BQUssSUFBSSxDQUFDO0FBQUEsTUFDeEIsR0FGbUI7QUFHbkIsVUFBSTtBQUNGLGNBQU0sV0FBVyxNQUFNLHFDQUNyQixFQUFFLE9BQU8sT0FBTyxHQUNoQixhQUNBLE9BQ0EsVUFDRjtBQUNBLGdCQUFRLFlBQVksUUFBUTtBQUM1QiwrQkFBUSxLQUFLLFFBQVE7QUFBQSxNQUN2QixTQUFTLEdBQVA7QUFDQSxlQUFPLGNBQWMsSUFBSSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELGdCQUFRLFNBQVM7QUFBQSxVQUNmLEtBQUs7QUFBQSxVQUNMLE1BQU0sQ0FBQyxFQUFFLE9BQU87QUFBQSxRQUNsQixDQUFDO0FBQ0QsK0JBQVEsS0FBSyxXQUFXO0FBQUEsTUFDMUI7QUFBQSxJQUNGLEdBQUc7QUFFSCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsU0FBUyxPQUFPLFFBQVEsT0FBTyxXQUFXLENBQUM7QUFFL0MsU0FDRSxvQ0FBQztBQUFBLElBQVMsT0FBSztBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDLDRCQUFJLEtBQUssb0NBQW9DLENBQUUsR0FDaEQsb0NBQUMsOEJBQ0UsS0FBSyx3Q0FBd0M7QUFBQSxJQUU1QyxPQUFPLE9BQU8sUUFBUTtBQUFBLElBQ3RCLE9BQU8sT0FBTyxLQUFLO0FBQUEsRUFDckIsQ0FBQyxDQUNILEdBQ0Esb0NBQUM7QUFBQSxJQUNDLE9BQU87QUFBQSxJQUNQO0FBQUEsSUFDQSxXQUFXLE9BQU87QUFBQSxHQUNwQixHQUNBLG9DQUFDO0FBQUEsSUFBTyxTQUFTO0FBQUEsS0FBZSxLQUFLLFFBQVEsQ0FBRSxDQUNqRCxDQUNGO0FBRUosR0F6RGdEOyIsCiAgIm5hbWVzIjogW10KfQo=
