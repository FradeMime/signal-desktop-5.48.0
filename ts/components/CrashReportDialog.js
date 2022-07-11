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
var CrashReportDialog_exports = {};
__export(CrashReportDialog_exports, {
  CrashReportDialog: () => CrashReportDialog
});
module.exports = __toCommonJS(CrashReportDialog_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_Modal = require("./Modal");
var import_Spinner = require("./Spinner");
function CrashReportDialog(props) {
  const { i18n, isPending, uploadCrashReports, eraseCrashReports } = props;
  const onEraseClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    eraseCrashReports();
  }, "onEraseClick");
  const onSubmitClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    uploadCrashReports();
  }, "onSubmitClick");
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    moduleClassName: "module-Modal--important",
    i18n,
    title: i18n("CrashReportDialog__title"),
    hasXButton: true,
    onClose: eraseCrashReports
  }, /* @__PURE__ */ import_react.default.createElement("section", null, i18n("CrashReportDialog__body")), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: isPending,
    onClick: onEraseClick,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("CrashReportDialog__erase")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: isPending,
    onClick: onSubmitClick,
    ref: (button) => button?.focus(),
    variant: import_Button.ButtonVariant.Primary
  }, isPending ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    size: "22px",
    svgSize: "small"
  }) : i18n("CrashReportDialog__submit"))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrashReportDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3Jhc2hSZXBvcnREaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuXG50eXBlIFByb3BzQWN0aW9uc1R5cGUgPSB7XG4gIHVwbG9hZENyYXNoUmVwb3J0czogKCkgPT4gdm9pZDtcbiAgZXJhc2VDcmFzaFJlcG9ydHM6ICgpID0+IHZvaWQ7XG59O1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNQZW5kaW5nOiBib29sZWFuO1xufSAmIFByb3BzQWN0aW9uc1R5cGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmFzaFJlcG9ydERpYWxvZyhwcm9wczogUmVhZG9ubHk8UHJvcHNUeXBlPik6IEpTWC5FbGVtZW50IHtcbiAgY29uc3QgeyBpMThuLCBpc1BlbmRpbmcsIHVwbG9hZENyYXNoUmVwb3J0cywgZXJhc2VDcmFzaFJlcG9ydHMgfSA9IHByb3BzO1xuXG4gIGNvbnN0IG9uRXJhc2VDbGljayA9IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBlcmFzZUNyYXNoUmVwb3J0cygpO1xuICB9O1xuXG4gIGNvbnN0IG9uU3VibWl0Q2xpY2sgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdXBsb2FkQ3Jhc2hSZXBvcnRzKCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIm1vZHVsZS1Nb2RhbC0taW1wb3J0YW50XCJcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICB0aXRsZT17aTE4bignQ3Jhc2hSZXBvcnREaWFsb2dfX3RpdGxlJyl9XG4gICAgICBoYXNYQnV0dG9uXG4gICAgICBvbkNsb3NlPXtlcmFzZUNyYXNoUmVwb3J0c31cbiAgICA+XG4gICAgICA8c2VjdGlvbj57aTE4bignQ3Jhc2hSZXBvcnREaWFsb2dfX2JvZHknKX08L3NlY3Rpb24+XG4gICAgICA8TW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgZGlzYWJsZWQ9e2lzUGVuZGluZ31cbiAgICAgICAgICBvbkNsaWNrPXtvbkVyYXNlQ2xpY2t9XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignQ3Jhc2hSZXBvcnREaWFsb2dfX2VyYXNlJyl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgZGlzYWJsZWQ9e2lzUGVuZGluZ31cbiAgICAgICAgICBvbkNsaWNrPXtvblN1Ym1pdENsaWNrfVxuICAgICAgICAgIHJlZj17YnV0dG9uID0+IGJ1dHRvbj8uZm9jdXMoKX1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlByaW1hcnl9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNQZW5kaW5nID8gKFxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cIjIycHhcIiBzdmdTaXplPVwic21hbGxcIiAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBpMThuKCdDcmFzaFJlcG9ydERpYWxvZ19fc3VibWl0JylcbiAgICAgICAgICApfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBR2xCLG9CQUFzQztBQUN0QyxtQkFBc0I7QUFDdEIscUJBQXdCO0FBWWpCLDJCQUEyQixPQUF5QztBQUN6RSxRQUFNLEVBQUUsTUFBTSxXQUFXLG9CQUFvQixzQkFBc0I7QUFFbkUsUUFBTSxlQUFlLHdCQUFDLFVBQTRCO0FBQ2hELFVBQU0sZUFBZTtBQUVyQixzQkFBa0I7QUFBQSxFQUNwQixHQUpxQjtBQU1yQixRQUFNLGdCQUFnQix3QkFBQyxVQUE0QjtBQUNqRCxVQUFNLGVBQWU7QUFFckIsdUJBQW1CO0FBQUEsRUFDckIsR0FKc0I7QUFNdEIsU0FDRSxtREFBQztBQUFBLElBQ0MsaUJBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNBLE9BQU8sS0FBSywwQkFBMEI7QUFBQSxJQUN0QyxZQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsS0FFVCxtREFBQyxpQkFBUyxLQUFLLHlCQUF5QixDQUFFLEdBQzFDLG1EQUFDLG1CQUFNLGNBQU4sTUFDQyxtREFBQztBQUFBLElBQ0MsVUFBVTtBQUFBLElBQ1YsU0FBUztBQUFBLElBQ1QsU0FBUyw0QkFBYztBQUFBLEtBRXRCLEtBQUssMEJBQTBCLENBQ2xDLEdBQ0EsbURBQUM7QUFBQSxJQUNDLFVBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxJQUNULEtBQUssWUFBVSxRQUFRLE1BQU07QUFBQSxJQUM3QixTQUFTLDRCQUFjO0FBQUEsS0FFdEIsWUFDQyxtREFBQztBQUFBLElBQVEsTUFBSztBQUFBLElBQU8sU0FBUTtBQUFBLEdBQVEsSUFFckMsS0FBSywyQkFBMkIsQ0FFcEMsQ0FDRixDQUNGO0FBRUo7QUEvQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
