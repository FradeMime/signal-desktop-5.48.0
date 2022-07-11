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
var CallingSelectPresentingSourcesModal_exports = {};
__export(CallingSelectPresentingSourcesModal_exports, {
  CallingSelectPresentingSourcesModal: () => CallingSelectPresentingSourcesModal
});
module.exports = __toCommonJS(CallingSelectPresentingSourcesModal_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_Button = require("./Button");
var import_Modal = require("./Modal");
var import_theme = require("../util/theme");
const Source = /* @__PURE__ */ __name(({
  onSourceClick,
  source,
  sourceToPresent
}) => {
  return /* @__PURE__ */ import_react.default.createElement("button", {
    className: (0, import_classnames.default)({
      "module-CallingSelectPresentingSourcesModal__source": true,
      "module-CallingSelectPresentingSourcesModal__source--selected": sourceToPresent?.id === source.id
    }),
    key: source.id,
    onClick: () => {
      onSourceClick({
        id: source.id,
        name: source.name
      });
    },
    type: "button"
  }, /* @__PURE__ */ import_react.default.createElement("img", {
    alt: source.name,
    className: "module-CallingSelectPresentingSourcesModal__name--screenshot",
    src: source.thumbnail
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingSelectPresentingSourcesModal__name--container"
  }, source.appIcon ? /* @__PURE__ */ import_react.default.createElement("img", {
    alt: source.name,
    className: "module-CallingSelectPresentingSourcesModal__name--icon",
    height: 16,
    src: source.appIcon,
    width: 16
  }) : null, /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-CallingSelectPresentingSourcesModal__name--text"
  }, source.name)));
}, "Source");
const CallingSelectPresentingSourcesModal = /* @__PURE__ */ __name(({
  i18n,
  presentingSourcesAvailable,
  setPresenting
}) => {
  const [sourceToPresent, setSourceToPresent] = (0, import_react.useState)(void 0);
  if (!presentingSourcesAvailable.length) {
    throw new Error("No sources available for presenting");
  }
  const sources = (0, import_lodash.groupBy)(presentingSourcesAvailable, (source) => source.isScreen);
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    i18n,
    moduleClassName: "module-CallingSelectPresentingSourcesModal",
    onClose: () => {
      setPresenting();
    },
    theme: import_theme.Theme.Dark,
    title: i18n("calling__SelectPresentingSourcesModal--title")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingSelectPresentingSourcesModal__title"
  }, i18n("calling__SelectPresentingSourcesModal--entireScreen")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingSelectPresentingSourcesModal__sources"
  }, (sources.true ?? []).map((source) => /* @__PURE__ */ import_react.default.createElement(Source, {
    key: source.id,
    onSourceClick: (selectedSource) => setSourceToPresent(selectedSource),
    source,
    sourceToPresent
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingSelectPresentingSourcesModal__title"
  }, i18n("calling__SelectPresentingSourcesModal--window")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingSelectPresentingSourcesModal__sources"
  }, (sources.false ?? []).map((source) => /* @__PURE__ */ import_react.default.createElement(Source, {
    key: source.id,
    onSourceClick: (selectedSource) => setSourceToPresent(selectedSource),
    source,
    sourceToPresent
  }))), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, {
    moduleClassName: "module-CallingSelectPresentingSourcesModal"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: () => setPresenting(),
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !sourceToPresent,
    onClick: () => setPresenting(sourceToPresent)
  }, i18n("calling__SelectPresentingSourcesModal--confirm"))));
}, "CallingSelectPresentingSourcesModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingSelectPresentingSourcesModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZ3JvdXBCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuL0J1dHRvbic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgdHlwZSB7IFByZXNlbnRlZFNvdXJjZSwgUHJlc2VudGFibGVTb3VyY2UgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi4vdXRpbC90aGVtZSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcHJlc2VudGluZ1NvdXJjZXNBdmFpbGFibGU6IEFycmF5PFByZXNlbnRhYmxlU291cmNlPjtcbiAgc2V0UHJlc2VudGluZzogKF8/OiBQcmVzZW50ZWRTb3VyY2UpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBTb3VyY2UgPSAoe1xuICBvblNvdXJjZUNsaWNrLFxuICBzb3VyY2UsXG4gIHNvdXJjZVRvUHJlc2VudCxcbn06IHtcbiAgb25Tb3VyY2VDbGljazogKHNvdXJjZTogUHJlc2VudGVkU291cmNlKSA9PiB2b2lkO1xuICBzb3VyY2U6IFByZXNlbnRhYmxlU291cmNlO1xuICBzb3VyY2VUb1ByZXNlbnQ/OiBQcmVzZW50ZWRTb3VyY2U7XG59KTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICdtb2R1bGUtQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWxfX3NvdXJjZSc6IHRydWUsXG4gICAgICAgICdtb2R1bGUtQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWxfX3NvdXJjZS0tc2VsZWN0ZWQnOlxuICAgICAgICAgIHNvdXJjZVRvUHJlc2VudD8uaWQgPT09IHNvdXJjZS5pZCxcbiAgICAgIH0pfVxuICAgICAga2V5PXtzb3VyY2UuaWR9XG4gICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgIG9uU291cmNlQ2xpY2soe1xuICAgICAgICAgIGlkOiBzb3VyY2UuaWQsXG4gICAgICAgICAgbmFtZTogc291cmNlLm5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgfX1cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgID5cbiAgICAgIDxpbWdcbiAgICAgICAgYWx0PXtzb3VyY2UubmFtZX1cbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsX19uYW1lLS1zY3JlZW5zaG90XCJcbiAgICAgICAgc3JjPXtzb3VyY2UudGh1bWJuYWlsfVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsX19uYW1lLS1jb250YWluZXJcIj5cbiAgICAgICAge3NvdXJjZS5hcHBJY29uID8gKFxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGFsdD17c291cmNlLm5hbWV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWxfX25hbWUtLWljb25cIlxuICAgICAgICAgICAgaGVpZ2h0PXsxNn1cbiAgICAgICAgICAgIHNyYz17c291cmNlLmFwcEljb259XG4gICAgICAgICAgICB3aWR0aD17MTZ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1DYWxsaW5nU2VsZWN0UHJlc2VudGluZ1NvdXJjZXNNb2RhbF9fbmFtZS0tdGV4dFwiPlxuICAgICAgICAgIHtzb3VyY2UubmFtZX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwgPSAoe1xuICBpMThuLFxuICBwcmVzZW50aW5nU291cmNlc0F2YWlsYWJsZSxcbiAgc2V0UHJlc2VudGluZyxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGNvbnN0IFtzb3VyY2VUb1ByZXNlbnQsIHNldFNvdXJjZVRvUHJlc2VudF0gPSB1c2VTdGF0ZTxcbiAgICBQcmVzZW50ZWRTb3VyY2UgfCB1bmRlZmluZWRcbiAgPih1bmRlZmluZWQpO1xuXG4gIGlmICghcHJlc2VudGluZ1NvdXJjZXNBdmFpbGFibGUubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBzb3VyY2VzIGF2YWlsYWJsZSBmb3IgcHJlc2VudGluZycpO1xuICB9XG5cbiAgY29uc3Qgc291cmNlcyA9IGdyb3VwQnkoXG4gICAgcHJlc2VudGluZ1NvdXJjZXNBdmFpbGFibGUsXG4gICAgc291cmNlID0+IHNvdXJjZS5pc1NjcmVlblxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsXG4gICAgICBoYXNYQnV0dG9uXG4gICAgICBpMThuPXtpMThufVxuICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsXCJcbiAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgc2V0UHJlc2VudGluZygpO1xuICAgICAgfX1cbiAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgICAgdGl0bGU9e2kxOG4oJ2NhbGxpbmdfX1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwtLXRpdGxlJyl9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWxfX3RpdGxlXCI+XG4gICAgICAgIHtpMThuKCdjYWxsaW5nX19TZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsLS1lbnRpcmVTY3JlZW4nKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWxfX3NvdXJjZXNcIj5cbiAgICAgICAgeyhzb3VyY2VzLnRydWUgPz8gW10pLm1hcChzb3VyY2UgPT4gKFxuICAgICAgICAgIDxTb3VyY2VcbiAgICAgICAgICAgIGtleT17c291cmNlLmlkfVxuICAgICAgICAgICAgb25Tb3VyY2VDbGljaz17c2VsZWN0ZWRTb3VyY2UgPT4gc2V0U291cmNlVG9QcmVzZW50KHNlbGVjdGVkU291cmNlKX1cbiAgICAgICAgICAgIHNvdXJjZT17c291cmNlfVxuICAgICAgICAgICAgc291cmNlVG9QcmVzZW50PXtzb3VyY2VUb1ByZXNlbnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsX190aXRsZVwiPlxuICAgICAgICB7aTE4bignY2FsbGluZ19fU2VsZWN0UHJlc2VudGluZ1NvdXJjZXNNb2RhbC0td2luZG93Jyl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdTZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsX19zb3VyY2VzXCI+XG4gICAgICAgIHsoc291cmNlcy5mYWxzZSA/PyBbXSkubWFwKHNvdXJjZSA9PiAoXG4gICAgICAgICAgPFNvdXJjZVxuICAgICAgICAgICAga2V5PXtzb3VyY2UuaWR9XG4gICAgICAgICAgICBvblNvdXJjZUNsaWNrPXtzZWxlY3RlZFNvdXJjZSA9PiBzZXRTb3VyY2VUb1ByZXNlbnQoc2VsZWN0ZWRTb3VyY2UpfVxuICAgICAgICAgICAgc291cmNlPXtzb3VyY2V9XG4gICAgICAgICAgICBzb3VyY2VUb1ByZXNlbnQ9e3NvdXJjZVRvUHJlc2VudH1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPE1vZGFsLkJ1dHRvbkZvb3RlciBtb2R1bGVDbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWxcIj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFByZXNlbnRpbmcoKX1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdjYW5jZWwnKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBkaXNhYmxlZD17IXNvdXJjZVRvUHJlc2VudH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQcmVzZW50aW5nKHNvdXJjZVRvUHJlc2VudCl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignY2FsbGluZ19fU2VsZWN0UHJlc2VudGluZ1NvdXJjZXNNb2RhbC0tY29uZmlybScpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUNo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
