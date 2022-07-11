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
var CallingHeader_exports = {};
__export(CallingHeader_exports, {
  CallingHeader: () => CallingHeader
});
module.exports = __toCommonJS(CallingHeader_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Tooltip = require("./Tooltip");
var import_theme = require("../util/theme");
const CallingHeader = /* @__PURE__ */ __name(({
  i18n,
  isInSpeakerView,
  isGroupCall = false,
  message,
  onCancel,
  participantCount,
  showParticipantsList,
  title,
  toggleParticipants,
  togglePip,
  toggleSettings,
  toggleSpeakerView
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling__header"
}, title ? /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling__header--header-name"
}, title) : null, message ? /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-ongoing-call__header-message"
}, message) : null, /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling-tools"
}, isGroupCall && participantCount ? /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling-tools__button"
}, /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
  content: i18n("calling__participants", [String(participantCount)]),
  theme: import_theme.Theme.Dark
}, /* @__PURE__ */ import_react.default.createElement("button", {
  "aria-label": i18n("calling__participants", [
    String(participantCount)
  ]),
  className: (0, import_classnames.default)("CallingButton__participants--container", {
    "CallingButton__participants--shown": showParticipantsList
  }),
  onClick: toggleParticipants,
  type: "button"
}, /* @__PURE__ */ import_react.default.createElement("i", {
  className: "CallingButton__participants"
}), /* @__PURE__ */ import_react.default.createElement("span", {
  className: "CallingButton__participants--count"
}, participantCount)))) : null, /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling-tools__button"
}, /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
  content: i18n("callingDeviceSelection__settings"),
  theme: import_theme.Theme.Dark
}, /* @__PURE__ */ import_react.default.createElement("button", {
  "aria-label": i18n("callingDeviceSelection__settings"),
  className: "CallingButton__settings",
  onClick: toggleSettings,
  type: "button"
}))), isGroupCall && participantCount > 2 && toggleSpeakerView && /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling-tools__button"
}, /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
  content: i18n(isInSpeakerView ? "calling__switch-view--to-grid" : "calling__switch-view--to-speaker"),
  theme: import_theme.Theme.Dark
}, /* @__PURE__ */ import_react.default.createElement("button", {
  "aria-label": i18n(isInSpeakerView ? "calling__switch-view--to-grid" : "calling__switch-view--to-speaker"),
  className: isInSpeakerView ? "CallingButton__grid-view" : "CallingButton__speaker-view",
  onClick: toggleSpeakerView,
  type: "button"
}))), togglePip && /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling-tools__button"
}, /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
  content: i18n("calling__pip--on"),
  theme: import_theme.Theme.Dark
}, /* @__PURE__ */ import_react.default.createElement("button", {
  "aria-label": i18n("calling__pip--on"),
  className: "CallingButton__pip",
  onClick: togglePip,
  type: "button"
}))), onCancel && /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-calling-tools__button"
}, /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
  content: i18n("cancel"),
  theme: import_theme.Theme.Dark
}, /* @__PURE__ */ import_react.default.createElement("button", {
  "aria-label": i18n("cancel"),
  className: "CallingButton__cancel",
  onClick: onCancel,
  type: "button"
}))))), "CallingHeader");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0hlYWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcCc7XG5pbXBvcnQgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzSW5TcGVha2VyVmlldz86IGJvb2xlYW47XG4gIGlzR3JvdXBDYWxsPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IFJlYWN0Tm9kZTtcbiAgb25DYW5jZWw/OiAoKSA9PiB2b2lkO1xuICBwYXJ0aWNpcGFudENvdW50OiBudW1iZXI7XG4gIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBib29sZWFuO1xuICB0aXRsZT86IHN0cmluZztcbiAgdG9nZ2xlUGFydGljaXBhbnRzPzogKCkgPT4gdm9pZDtcbiAgdG9nZ2xlUGlwPzogKCkgPT4gdm9pZDtcbiAgdG9nZ2xlU2V0dGluZ3M6ICgpID0+IHZvaWQ7XG4gIHRvZ2dsZVNwZWFrZXJWaWV3PzogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBDYWxsaW5nSGVhZGVyID0gKHtcbiAgaTE4bixcbiAgaXNJblNwZWFrZXJWaWV3LFxuICBpc0dyb3VwQ2FsbCA9IGZhbHNlLFxuICBtZXNzYWdlLFxuICBvbkNhbmNlbCxcbiAgcGFydGljaXBhbnRDb3VudCxcbiAgc2hvd1BhcnRpY2lwYW50c0xpc3QsXG4gIHRpdGxlLFxuICB0b2dnbGVQYXJ0aWNpcGFudHMsXG4gIHRvZ2dsZVBpcCxcbiAgdG9nZ2xlU2V0dGluZ3MsXG4gIHRvZ2dsZVNwZWFrZXJWaWV3LFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nX19oZWFkZXJcIj5cbiAgICB7dGl0bGUgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nX19oZWFkZXItLWhlYWRlci1uYW1lXCI+e3RpdGxlfTwvZGl2PlxuICAgICkgOiBudWxsfVxuICAgIHttZXNzYWdlID8gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtb25nb2luZy1jYWxsX19oZWFkZXItbWVzc2FnZVwiPnttZXNzYWdlfTwvZGl2PlxuICAgICkgOiBudWxsfVxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctdG9vbHNcIj5cbiAgICAgIHtpc0dyb3VwQ2FsbCAmJiBwYXJ0aWNpcGFudENvdW50ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXRvb2xzX19idXR0b25cIj5cbiAgICAgICAgICA8VG9vbHRpcFxuICAgICAgICAgICAgY29udGVudD17aTE4bignY2FsbGluZ19fcGFydGljaXBhbnRzJywgW1N0cmluZyhwYXJ0aWNpcGFudENvdW50KV0pfVxuICAgICAgICAgICAgdGhlbWU9e1RoZW1lLkRhcmt9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjYWxsaW5nX19wYXJ0aWNpcGFudHMnLCBbXG4gICAgICAgICAgICAgICAgU3RyaW5nKHBhcnRpY2lwYW50Q291bnQpLFxuICAgICAgICAgICAgICBdKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdDYWxsaW5nQnV0dG9uX19wYXJ0aWNpcGFudHMtLWNvbnRhaW5lcicsIHtcbiAgICAgICAgICAgICAgICAnQ2FsbGluZ0J1dHRvbl9fcGFydGljaXBhbnRzLS1zaG93bic6IHNob3dQYXJ0aWNpcGFudHNMaXN0LFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlUGFydGljaXBhbnRzfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiQ2FsbGluZ0J1dHRvbl9fcGFydGljaXBhbnRzXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiQ2FsbGluZ0J1dHRvbl9fcGFydGljaXBhbnRzLS1jb3VudFwiPlxuICAgICAgICAgICAgICAgIHtwYXJ0aWNpcGFudENvdW50fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXRvb2xzX19idXR0b25cIj5cbiAgICAgICAgPFRvb2x0aXBcbiAgICAgICAgICBjb250ZW50PXtpMThuKCdjYWxsaW5nRGV2aWNlU2VsZWN0aW9uX19zZXR0aW5ncycpfVxuICAgICAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgICAgICA+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2FsbGluZ0RldmljZVNlbGVjdGlvbl9fc2V0dGluZ3MnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIkNhbGxpbmdCdXR0b25fX3NldHRpbmdzXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVNldHRpbmdzfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgPC9kaXY+XG4gICAgICB7aXNHcm91cENhbGwgJiYgcGFydGljaXBhbnRDb3VudCA+IDIgJiYgdG9nZ2xlU3BlYWtlclZpZXcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXRvb2xzX19idXR0b25cIj5cbiAgICAgICAgICA8VG9vbHRpcFxuICAgICAgICAgICAgY29udGVudD17aTE4bihcbiAgICAgICAgICAgICAgaXNJblNwZWFrZXJWaWV3XG4gICAgICAgICAgICAgICAgPyAnY2FsbGluZ19fc3dpdGNoLXZpZXctLXRvLWdyaWQnXG4gICAgICAgICAgICAgICAgOiAnY2FsbGluZ19fc3dpdGNoLXZpZXctLXRvLXNwZWFrZXInXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgdGhlbWU9e1RoZW1lLkRhcmt9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKFxuICAgICAgICAgICAgICAgIGlzSW5TcGVha2VyVmlld1xuICAgICAgICAgICAgICAgICAgPyAnY2FsbGluZ19fc3dpdGNoLXZpZXctLXRvLWdyaWQnXG4gICAgICAgICAgICAgICAgICA6ICdjYWxsaW5nX19zd2l0Y2gtdmlldy0tdG8tc3BlYWtlcidcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICBpc0luU3BlYWtlclZpZXdcbiAgICAgICAgICAgICAgICAgID8gJ0NhbGxpbmdCdXR0b25fX2dyaWQtdmlldydcbiAgICAgICAgICAgICAgICAgIDogJ0NhbGxpbmdCdXR0b25fX3NwZWFrZXItdmlldydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVTcGVha2VyVmlld31cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3RvZ2dsZVBpcCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctdG9vbHNfX2J1dHRvblwiPlxuICAgICAgICAgIDxUb29sdGlwIGNvbnRlbnQ9e2kxOG4oJ2NhbGxpbmdfX3BpcC0tb24nKX0gdGhlbWU9e1RoZW1lLkRhcmt9PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjYWxsaW5nX19waXAtLW9uJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkNhbGxpbmdCdXR0b25fX3BpcFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVBpcH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge29uQ2FuY2VsICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZy10b29sc19fYnV0dG9uXCI+XG4gICAgICAgICAgPFRvb2x0aXAgY29udGVudD17aTE4bignY2FuY2VsJyl9IHRoZW1lPXtUaGVtZS5EYXJrfT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2FuY2VsJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkNhbGxpbmdCdXR0b25fX2NhbmNlbFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2FuY2VsfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7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
