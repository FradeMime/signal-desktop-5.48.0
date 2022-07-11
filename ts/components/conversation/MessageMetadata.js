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
var MessageMetadata_exports = {};
__export(MessageMetadata_exports, {
  MessageMetadata: () => MessageMetadata
});
module.exports = __toCommonJS(MessageMetadata_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_measure = __toESM(require("react-measure"));
var import_ExpireTimer = require("./ExpireTimer");
var import_MessageTimestamp = require("./MessageTimestamp");
var import_Spinner = require("../Spinner");
const MessageMetadata = /* @__PURE__ */ __name(({
  deletedForEveryone,
  direction,
  expirationLength,
  expirationTimestamp,
  hasText,
  i18n,
  id,
  isInline,
  isShowingImage,
  isSticker,
  isTapToViewExpired,
  onWidthMeasured,
  showMessageDetail,
  status,
  textPending,
  timestamp
}) => {
  const withImageNoCaption = Boolean(!isSticker && !hasText && isShowingImage);
  const metadataDirection = isSticker ? void 0 : direction;
  let timestampNode;
  {
    const isError = status === "error" && direction === "outgoing";
    const isPartiallySent = status === "partial-sent" && direction === "outgoing";
    const isPaused = status === "paused";
    if (isError || isPartiallySent || isPaused) {
      let statusInfo;
      if (isError) {
        statusInfo = deletedForEveryone ? i18n("deleteFailed") : i18n("sendFailed");
      } else if (isPaused) {
        statusInfo = i18n("sendPaused");
      } else {
        statusInfo = /* @__PURE__ */ import_react.default.createElement("button", {
          type: "button",
          className: "module-message__metadata__tapable",
          onClick: (event) => {
            event.stopPropagation();
            event.preventDefault();
            showMessageDetail(id);
          }
        }, deletedForEveryone ? i18n("partiallyDeleted") : i18n("partiallySent"));
      }
      timestampNode = /* @__PURE__ */ import_react.default.createElement("span", {
        className: (0, import_classnames.default)({
          "module-message__metadata__date": true,
          "module-message__metadata__date--with-sticker": isSticker,
          "module-message__metadata__date--deleted-for-everyone": deletedForEveryone,
          [`module-message__metadata__date--${direction}`]: !isSticker,
          "module-message__metadata__date--with-image-no-caption": withImageNoCaption
        })
      }, statusInfo);
    } else {
      timestampNode = /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
        i18n,
        timestamp,
        direction: metadataDirection,
        deletedForEveryone,
        withImageNoCaption,
        withSticker: isSticker,
        withTapToViewExpired: isTapToViewExpired,
        module: "module-message__metadata__date"
      });
    }
  }
  const className = (0, import_classnames.default)("module-message__metadata", isInline && "module-message__metadata--inline", withImageNoCaption && "module-message__metadata--with-image-no-caption", deletedForEveryone && "module-message__metadata--deleted-for-everyone");
  const children = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, timestampNode, expirationLength ? /* @__PURE__ */ import_react.default.createElement(import_ExpireTimer.ExpireTimer, {
    direction: metadataDirection,
    deletedForEveryone,
    expirationLength,
    expirationTimestamp,
    withImageNoCaption,
    withSticker: isSticker,
    withTapToViewExpired: isTapToViewExpired
  }) : null, textPending ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-message__metadata__spinner-container"
  }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    svgSize: "small",
    size: "14px",
    direction
  })) : null, (!deletedForEveryone || status === "sending") && !textPending && direction === "outgoing" && status !== "error" && status !== "partial-sent" ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-message__metadata__status-icon", `module-message__metadata__status-icon--${status}`, isSticker ? "module-message__metadata__status-icon--with-sticker" : null, withImageNoCaption ? "module-message__metadata__status-icon--with-image-no-caption" : null, deletedForEveryone ? "module-message__metadata__status-icon--deleted-for-everyone" : null, isTapToViewExpired ? "module-message__metadata__status-icon--with-tap-to-view-expired" : null)
  }) : null);
  if (onWidthMeasured) {
    return /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
      bounds: true,
      onResize: ({ bounds }) => {
        onWidthMeasured(bounds?.width || 0);
      }
    }, ({ measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
      className,
      ref: measureRef
    }, children));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className
  }, children);
}, "MessageMetadata");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageMetadata
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZU1ldGFkYXRhLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCwgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IE1lYXN1cmUgZnJvbSAncmVhY3QtbWVhc3VyZSc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBEaXJlY3Rpb25UeXBlLCBNZXNzYWdlU3RhdHVzVHlwZSB9IGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgeyBFeHBpcmVUaW1lciB9IGZyb20gJy4vRXhwaXJlVGltZXInO1xuaW1wb3J0IHsgTWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4vTWVzc2FnZVRpbWVzdGFtcCc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vU3Bpbm5lcic7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBkZWxldGVkRm9yRXZlcnlvbmU/OiBib29sZWFuO1xuICBkaXJlY3Rpb246IERpcmVjdGlvblR5cGU7XG4gIGV4cGlyYXRpb25MZW5ndGg/OiBudW1iZXI7XG4gIGV4cGlyYXRpb25UaW1lc3RhbXA/OiBudW1iZXI7XG4gIGhhc1RleHQ6IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlkOiBzdHJpbmc7XG4gIGlzSW5saW5lPzogYm9vbGVhbjtcbiAgaXNTaG93aW5nSW1hZ2U6IGJvb2xlYW47XG4gIGlzU3RpY2tlcj86IGJvb2xlYW47XG4gIGlzVGFwVG9WaWV3RXhwaXJlZD86IGJvb2xlYW47XG4gIG9uV2lkdGhNZWFzdXJlZD86ICh3aWR0aDogbnVtYmVyKSA9PiB1bmtub3duO1xuICBzaG93TWVzc2FnZURldGFpbDogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN0YXR1cz86IE1lc3NhZ2VTdGF0dXNUeXBlO1xuICB0ZXh0UGVuZGluZz86IGJvb2xlYW47XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VNZXRhZGF0YSA9ICh7XG4gIGRlbGV0ZWRGb3JFdmVyeW9uZSxcbiAgZGlyZWN0aW9uLFxuICBleHBpcmF0aW9uTGVuZ3RoLFxuICBleHBpcmF0aW9uVGltZXN0YW1wLFxuICBoYXNUZXh0LFxuICBpMThuLFxuICBpZCxcbiAgaXNJbmxpbmUsXG4gIGlzU2hvd2luZ0ltYWdlLFxuICBpc1N0aWNrZXIsXG4gIGlzVGFwVG9WaWV3RXhwaXJlZCxcbiAgb25XaWR0aE1lYXN1cmVkLFxuICBzaG93TWVzc2FnZURldGFpbCxcbiAgc3RhdHVzLFxuICB0ZXh0UGVuZGluZyxcbiAgdGltZXN0YW1wLFxufTogUmVhZG9ubHk8UHJvcHNUeXBlPik6IFJlYWN0RWxlbWVudCA9PiB7XG4gIGNvbnN0IHdpdGhJbWFnZU5vQ2FwdGlvbiA9IEJvb2xlYW4oIWlzU3RpY2tlciAmJiAhaGFzVGV4dCAmJiBpc1Nob3dpbmdJbWFnZSk7XG4gIGNvbnN0IG1ldGFkYXRhRGlyZWN0aW9uID0gaXNTdGlja2VyID8gdW5kZWZpbmVkIDogZGlyZWN0aW9uO1xuXG4gIGxldCB0aW1lc3RhbXBOb2RlOiBSZWFjdENoaWxkO1xuICB7XG4gICAgY29uc3QgaXNFcnJvciA9IHN0YXR1cyA9PT0gJ2Vycm9yJyAmJiBkaXJlY3Rpb24gPT09ICdvdXRnb2luZyc7XG4gICAgY29uc3QgaXNQYXJ0aWFsbHlTZW50ID1cbiAgICAgIHN0YXR1cyA9PT0gJ3BhcnRpYWwtc2VudCcgJiYgZGlyZWN0aW9uID09PSAnb3V0Z29pbmcnO1xuICAgIGNvbnN0IGlzUGF1c2VkID0gc3RhdHVzID09PSAncGF1c2VkJztcblxuICAgIGlmIChpc0Vycm9yIHx8IGlzUGFydGlhbGx5U2VudCB8fCBpc1BhdXNlZCkge1xuICAgICAgbGV0IHN0YXR1c0luZm86IFJlYWN0LlJlYWN0Q2hpbGQ7XG4gICAgICBpZiAoaXNFcnJvcikge1xuICAgICAgICBzdGF0dXNJbmZvID0gZGVsZXRlZEZvckV2ZXJ5b25lXG4gICAgICAgICAgPyBpMThuKCdkZWxldGVGYWlsZWQnKVxuICAgICAgICAgIDogaTE4bignc2VuZEZhaWxlZCcpO1xuICAgICAgfSBlbHNlIGlmIChpc1BhdXNlZCkge1xuICAgICAgICBzdGF0dXNJbmZvID0gaTE4bignc2VuZFBhdXNlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzSW5mbyA9IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19tZXRhZGF0YV9fdGFwYWJsZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgc2hvd01lc3NhZ2VEZXRhaWwoaWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7ZGVsZXRlZEZvckV2ZXJ5b25lXG4gICAgICAgICAgICAgID8gaTE4bigncGFydGlhbGx5RGVsZXRlZCcpXG4gICAgICAgICAgICAgIDogaTE4bigncGFydGlhbGx5U2VudCcpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aW1lc3RhbXBOb2RlID0gKFxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19kYXRlJzogdHJ1ZSxcbiAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX2RhdGUtLXdpdGgtc3RpY2tlcic6IGlzU3RpY2tlcixcbiAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX2RhdGUtLWRlbGV0ZWQtZm9yLWV2ZXJ5b25lJzpcbiAgICAgICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lLFxuICAgICAgICAgICAgW2Btb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX2RhdGUtLSR7ZGlyZWN0aW9ufWBdOiAhaXNTdGlja2VyLFxuICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19tZXRhZGF0YV9fZGF0ZS0td2l0aC1pbWFnZS1uby1jYXB0aW9uJzpcbiAgICAgICAgICAgICAgd2l0aEltYWdlTm9DYXB0aW9uLFxuICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAge3N0YXR1c0luZm99XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVzdGFtcE5vZGUgPSAoXG4gICAgICAgIDxNZXNzYWdlVGltZXN0YW1wXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICB0aW1lc3RhbXA9e3RpbWVzdGFtcH1cbiAgICAgICAgICBkaXJlY3Rpb249e21ldGFkYXRhRGlyZWN0aW9ufVxuICAgICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZT17ZGVsZXRlZEZvckV2ZXJ5b25lfVxuICAgICAgICAgIHdpdGhJbWFnZU5vQ2FwdGlvbj17d2l0aEltYWdlTm9DYXB0aW9ufVxuICAgICAgICAgIHdpdGhTdGlja2VyPXtpc1N0aWNrZXJ9XG4gICAgICAgICAgd2l0aFRhcFRvVmlld0V4cGlyZWQ9e2lzVGFwVG9WaWV3RXhwaXJlZH1cbiAgICAgICAgICBtb2R1bGU9XCJtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX2RhdGVcIlxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKFxuICAgICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGEnLFxuICAgIGlzSW5saW5lICYmICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGEtLWlubGluZScsXG4gICAgd2l0aEltYWdlTm9DYXB0aW9uICYmICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGEtLXdpdGgtaW1hZ2Utbm8tY2FwdGlvbicsXG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lICYmICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGEtLWRlbGV0ZWQtZm9yLWV2ZXJ5b25lJ1xuICApO1xuICBjb25zdCBjaGlsZHJlbiA9IChcbiAgICA8PlxuICAgICAge3RpbWVzdGFtcE5vZGV9XG4gICAgICB7ZXhwaXJhdGlvbkxlbmd0aCA/IChcbiAgICAgICAgPEV4cGlyZVRpbWVyXG4gICAgICAgICAgZGlyZWN0aW9uPXttZXRhZGF0YURpcmVjdGlvbn1cbiAgICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmU9e2RlbGV0ZWRGb3JFdmVyeW9uZX1cbiAgICAgICAgICBleHBpcmF0aW9uTGVuZ3RoPXtleHBpcmF0aW9uTGVuZ3RofVxuICAgICAgICAgIGV4cGlyYXRpb25UaW1lc3RhbXA9e2V4cGlyYXRpb25UaW1lc3RhbXB9XG4gICAgICAgICAgd2l0aEltYWdlTm9DYXB0aW9uPXt3aXRoSW1hZ2VOb0NhcHRpb259XG4gICAgICAgICAgd2l0aFN0aWNrZXI9e2lzU3RpY2tlcn1cbiAgICAgICAgICB3aXRoVGFwVG9WaWV3RXhwaXJlZD17aXNUYXBUb1ZpZXdFeHBpcmVkfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7dGV4dFBlbmRpbmcgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19zcGlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTcGlubmVyIHN2Z1NpemU9XCJzbWFsbFwiIHNpemU9XCIxNHB4XCIgZGlyZWN0aW9uPXtkaXJlY3Rpb259IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7KCFkZWxldGVkRm9yRXZlcnlvbmUgfHwgc3RhdHVzID09PSAnc2VuZGluZycpICYmXG4gICAgICAhdGV4dFBlbmRpbmcgJiZcbiAgICAgIGRpcmVjdGlvbiA9PT0gJ291dGdvaW5nJyAmJlxuICAgICAgc3RhdHVzICE9PSAnZXJyb3InICYmXG4gICAgICBzdGF0dXMgIT09ICdwYXJ0aWFsLXNlbnQnID8gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19tZXRhZGF0YV9fc3RhdHVzLWljb24nLFxuICAgICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX19tZXRhZGF0YV9fc3RhdHVzLWljb24tLSR7c3RhdHVzfWAsXG4gICAgICAgICAgICBpc1N0aWNrZXJcbiAgICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19zdGF0dXMtaWNvbi0td2l0aC1zdGlja2VyJ1xuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICB3aXRoSW1hZ2VOb0NhcHRpb25cbiAgICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19zdGF0dXMtaWNvbi0td2l0aC1pbWFnZS1uby1jYXB0aW9uJ1xuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmVcbiAgICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19zdGF0dXMtaWNvbi0tZGVsZXRlZC1mb3ItZXZlcnlvbmUnXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGlzVGFwVG9WaWV3RXhwaXJlZFxuICAgICAgICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX3N0YXR1cy1pY29uLS13aXRoLXRhcC10by12aWV3LWV4cGlyZWQnXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICl9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcblxuICBpZiAob25XaWR0aE1lYXN1cmVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNZWFzdXJlXG4gICAgICAgIGJvdW5kc1xuICAgICAgICBvblJlc2l6ZT17KHsgYm91bmRzIH0pID0+IHtcbiAgICAgICAgICBvbldpZHRoTWVhc3VyZWQoYm91bmRzPy53aWR0aCB8fCAwKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgeyh7IG1lYXN1cmVSZWYgfSkgPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJlZj17bWVhc3VyZVJlZn0+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L01lYXN1cmU+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57Y2hpbGRyZW59PC9kaXY+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBQ3ZCLDJCQUFvQjtBQUlwQix5QkFBNEI7QUFDNUIsOEJBQWlDO0FBQ2pDLHFCQUF3QjtBQXFCakIsTUFBTSxrQkFBa0Isd0JBQUM7QUFBQSxFQUM5QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ3VDO0FBQ3ZDLFFBQU0scUJBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FB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
