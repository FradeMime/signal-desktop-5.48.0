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
var DropStage_exports = {};
__export(DropStage_exports, {
  DropStage: () => DropStage
});
module.exports = __toCommonJS(DropStage_exports);
var React = __toESM(require("react"));
var import_AppStage = require("./AppStage");
var styles = __toESM(require("./DropStage.scss"));
var import_Typography = require("../../elements/Typography");
var import_LabeledCheckbox = require("../../elements/LabeledCheckbox");
var import_StickerGrid = require("../../components/StickerGrid");
var import_store = require("../../store");
var import_i18n = require("../../util/i18n");
const DropStage = /* @__PURE__ */ __name(() => {
  const i18n = (0, import_i18n.useI18n)();
  const stickerPaths = import_store.stickersDuck.useStickerOrder();
  const stickersReady = import_store.stickersDuck.useStickersReady();
  const haveStickers = stickerPaths.length > 0;
  const [showGuide, setShowGuide] = React.useState(true);
  const { resetStatus } = import_store.stickersDuck.useStickerActions();
  React.useEffect(() => {
    resetStatus();
  }, [resetStatus]);
  return /* @__PURE__ */ React.createElement(import_AppStage.AppStage, {
    next: "/add-emojis",
    nextActive: stickersReady
  }, /* @__PURE__ */ React.createElement(import_Typography.H2, null, i18n("StickerCreator--DropStage--title")), /* @__PURE__ */ React.createElement("div", {
    className: styles.info
  }, /* @__PURE__ */ React.createElement(import_Typography.Text, {
    className: styles.message
  }, i18n("StickerCreator--DropStage--help")), haveStickers ? /* @__PURE__ */ React.createElement(import_LabeledCheckbox.LabeledCheckbox, {
    onChange: setShowGuide,
    value: showGuide
  }, i18n("StickerCreator--DropStage--showMargins")) : null), /* @__PURE__ */ React.createElement("div", {
    className: styles.main
  }, /* @__PURE__ */ React.createElement(import_StickerGrid.StickerGrid, {
    mode: "add",
    showGuide
  })));
}, "DropStage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropStage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRHJvcFN0YWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwcFN0YWdlIH0gZnJvbSAnLi9BcHBTdGFnZSc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9Ecm9wU3RhZ2Uuc2Nzcyc7XG5pbXBvcnQgeyBIMiwgVGV4dCB9IGZyb20gJy4uLy4uL2VsZW1lbnRzL1R5cG9ncmFwaHknO1xuaW1wb3J0IHsgTGFiZWxlZENoZWNrYm94IH0gZnJvbSAnLi4vLi4vZWxlbWVudHMvTGFiZWxlZENoZWNrYm94JztcbmltcG9ydCB7IFN0aWNrZXJHcmlkIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9TdGlja2VyR3JpZCc7XG5pbXBvcnQgeyBzdGlja2Vyc0R1Y2sgfSBmcm9tICcuLi8uLi9zdG9yZSc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9pMThuJztcblxuZXhwb3J0IGNvbnN0IERyb3BTdGFnZTogUmVhY3QuQ29tcG9uZW50VHlwZSA9ICgpID0+IHtcbiAgY29uc3QgaTE4biA9IHVzZUkxOG4oKTtcbiAgY29uc3Qgc3RpY2tlclBhdGhzID0gc3RpY2tlcnNEdWNrLnVzZVN0aWNrZXJPcmRlcigpO1xuICBjb25zdCBzdGlja2Vyc1JlYWR5ID0gc3RpY2tlcnNEdWNrLnVzZVN0aWNrZXJzUmVhZHkoKTtcbiAgY29uc3QgaGF2ZVN0aWNrZXJzID0gc3RpY2tlclBhdGhzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IFtzaG93R3VpZGUsIHNldFNob3dHdWlkZV0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgeyByZXNldFN0YXR1cyB9ID0gc3RpY2tlcnNEdWNrLnVzZVN0aWNrZXJBY3Rpb25zKCk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXNldFN0YXR1cygpO1xuICB9LCBbcmVzZXRTdGF0dXNdKTtcblxuICByZXR1cm4gKFxuICAgIDxBcHBTdGFnZSBuZXh0PVwiL2FkZC1lbW9qaXNcIiBuZXh0QWN0aXZlPXtzdGlja2Vyc1JlYWR5fT5cbiAgICAgIDxIMj57aTE4bignU3RpY2tlckNyZWF0b3ItLURyb3BTdGFnZS0tdGl0bGUnKX08L0gyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5pbmZvfT5cbiAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtzdHlsZXMubWVzc2FnZX0+XG4gICAgICAgICAge2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1Ecm9wU3RhZ2UtLWhlbHAnKX1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgICB7aGF2ZVN0aWNrZXJzID8gKFxuICAgICAgICAgIDxMYWJlbGVkQ2hlY2tib3ggb25DaGFuZ2U9e3NldFNob3dHdWlkZX0gdmFsdWU9e3Nob3dHdWlkZX0+XG4gICAgICAgICAgICB7aTE4bignU3RpY2tlckNyZWF0b3ItLURyb3BTdGFnZS0tc2hvd01hcmdpbnMnKX1cbiAgICAgICAgICA8L0xhYmVsZWRDaGVja2JveD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFpbn0+XG4gICAgICAgIDxTdGlja2VyR3JpZCBtb2RlPVwiYWRkXCIgc2hvd0d1aWRlPXtzaG93R3VpZGV9IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L0FwcFN0YWdlPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixzQkFBeUI7QUFDekIsYUFBd0I7QUFDeEIsd0JBQXlCO0FBQ3pCLDZCQUFnQztBQUNoQyx5QkFBNEI7QUFDNUIsbUJBQTZCO0FBQzdCLGtCQUF3QjtBQUVqQixNQUFNLFlBQWlDLDZCQUFNO0FBQ2xELFFBQU0sT0FBTyx5QkFBUTtBQUNyQixRQUFNLGVBQWUsMEJBQWEsZ0JBQWdCO0FBQ2xELFFBQU0sZ0JBQWdCLDBCQUFhLGlCQUFpQjtBQUNwRCxRQUFNLGVBQWUsYUFBYSxTQUFTO0FBQzNDLFFBQU0sQ0FBQyxXQUFXLGdCQUFnQixNQUFNLFNBQWtCLElBQUk7QUFDOUQsUUFBTSxFQUFFLGdCQUFnQiwwQkFBYSxrQkFBa0I7QUFFdkQsUUFBTSxVQUFVLE1BQU07QUFDcEIsZ0JBQVk7QUFBQSxFQUNkLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFFaEIsU0FDRSxvQ0FBQztBQUFBLElBQVMsTUFBSztBQUFBLElBQWMsWUFBWTtBQUFBLEtBQ3ZDLG9DQUFDLDRCQUFJLEtBQUssa0NBQWtDLENBQUUsR0FDOUMsb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFBSyxXQUFXLE9BQU87QUFBQSxLQUNyQixLQUFLLGlDQUFpQyxDQUN6QyxHQUNDLGVBQ0Msb0NBQUM7QUFBQSxJQUFnQixVQUFVO0FBQUEsSUFBYyxPQUFPO0FBQUEsS0FDN0MsS0FBSyx3Q0FBd0MsQ0FDaEQsSUFDRSxJQUNOLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFBWSxNQUFLO0FBQUEsSUFBTTtBQUFBLEdBQXNCLENBQ2hELENBQ0Y7QUFFSixHQTlCOEM7IiwKICAibmFtZXMiOiBbXQp9Cg==
