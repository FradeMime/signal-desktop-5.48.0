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
var MessageBody_exports = {};
__export(MessageBody_exports, {
  MessageBody: () => MessageBody
});
module.exports = __toCommonJS(MessageBody_exports);
var import_react = __toESM(require("react"));
var import_Attachment = require("../../types/Attachment");
var import_lib = require("../emoji/lib");
var import_AtMentionify = require("./AtMentionify");
var import_Emojify = require("./Emojify");
var import_AddNewLines = require("./AddNewLines");
var import_Linkify = require("./Linkify");
const renderEmoji = /* @__PURE__ */ __name(({
  text,
  key,
  sizeClass,
  renderNonEmoji
}) => /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
  key,
  text,
  sizeClass,
  renderNonEmoji
}), "renderEmoji");
function MessageBody({
  bodyRanges,
  direction,
  disableJumbomoji,
  disableLinks,
  i18n,
  onIncreaseTextLength,
  openConversation,
  text,
  textAttachment,
  kickOffBodyDownload
}) {
  const hasReadMore = Boolean(onIncreaseTextLength);
  const textWithSuffix = textAttachment?.pending || hasReadMore ? `${text}...` : text;
  const sizeClass = disableJumbomoji ? void 0 : (0, import_lib.getSizeClass)(text);
  const processedText = import_AtMentionify.AtMentionify.preprocessMentions(textWithSuffix, bodyRanges);
  const renderNewLines = /* @__PURE__ */ __name(({
    text: textWithNewLines,
    key
  }) => {
    return /* @__PURE__ */ import_react.default.createElement(import_AddNewLines.AddNewLines, {
      key,
      text: textWithNewLines,
      renderNonNewLine: ({ text: innerText, key: innerKey }) => /* @__PURE__ */ import_react.default.createElement(import_AtMentionify.AtMentionify, {
        key: innerKey,
        direction,
        text: innerText,
        bodyRanges,
        openConversation
      })
    });
  }, "renderNewLines");
  let pendingContent;
  if (hasReadMore) {
    pendingContent = null;
  } else if (textAttachment?.pending) {
    pendingContent = /* @__PURE__ */ import_react.default.createElement("span", {
      className: "MessageBody__highlight"
    }, " ", i18n("downloading"));
  } else if (textAttachment && (0, import_Attachment.canBeDownloaded)(textAttachment) && kickOffBodyDownload) {
    pendingContent = /* @__PURE__ */ import_react.default.createElement("span", null, " ", /* @__PURE__ */ import_react.default.createElement("button", {
      className: "MessageBody__download-body",
      onClick: () => {
        kickOffBodyDownload();
      },
      onKeyDown: (ev) => {
        if (ev.key === "Space" || ev.key === "Enter") {
          kickOffBodyDownload();
        }
      },
      tabIndex: 0,
      type: "button"
    }, i18n("downloadFullMessage")));
  }
  return /* @__PURE__ */ import_react.default.createElement("span", null, disableLinks ? renderEmoji({
    i18n,
    text: processedText,
    sizeClass,
    key: 0,
    renderNonEmoji: renderNewLines
  }) : /* @__PURE__ */ import_react.default.createElement(import_Linkify.Linkify, {
    text: processedText,
    renderNonLink: ({ key, text: nonLinkText }) => {
      return renderEmoji({
        i18n,
        text: nonLinkText,
        sizeClass,
        key,
        renderNonEmoji: renderNewLines
      });
    }
  }), pendingContent, onIncreaseTextLength ? /* @__PURE__ */ import_react.default.createElement("button", {
    className: "MessageBody__read-more",
    onClick: () => {
      onIncreaseTextLength();
    },
    onKeyDown: (ev) => {
      if (ev.key === "Space" || ev.key === "Enter") {
        onIncreaseTextLength();
      }
    },
    tabIndex: 0,
    type: "button"
  }, " ", i18n("MessageBody--read-more")) : null);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageBody
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJvZHkudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBLZXlib2FyZEV2ZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgY2FuQmVEb3dubG9hZGVkIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IFNpemVDbGFzc1R5cGUgfSBmcm9tICcuLi9lbW9qaS9saWInO1xuaW1wb3J0IHsgZ2V0U2l6ZUNsYXNzIH0gZnJvbSAnLi4vZW1vamkvbGliJztcbmltcG9ydCB7IEF0TWVudGlvbmlmeSB9IGZyb20gJy4vQXRNZW50aW9uaWZ5JztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL0Vtb2ppZnknO1xuaW1wb3J0IHsgQWRkTmV3TGluZXMgfSBmcm9tICcuL0FkZE5ld0xpbmVzJztcbmltcG9ydCB7IExpbmtpZnkgfSBmcm9tICcuL0xpbmtpZnknO1xuXG5pbXBvcnQgdHlwZSB7XG4gIEJvZHlSYW5nZXNUeXBlLFxuICBMb2NhbGl6ZXJUeXBlLFxuICBSZW5kZXJUZXh0Q2FsbGJhY2tUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxudHlwZSBPcGVuQ29udmVyc2F0aW9uQWN0aW9uVHlwZSA9IChcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgbWVzc2FnZUlkPzogc3RyaW5nXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBkaXJlY3Rpb24/OiAnaW5jb21pbmcnIHwgJ291dGdvaW5nJztcbiAgdGV4dDogc3RyaW5nO1xuICB0ZXh0QXR0YWNobWVudD86IFBpY2s8QXR0YWNobWVudFR5cGUsICdwZW5kaW5nJyB8ICdkaWdlc3QnIHwgJ2tleSc+O1xuICAvKiogSWYgc2V0LCBhbGwgZW1vamkgd2lsbCBiZSB0aGUgc2FtZSBzaXplLiBPdGhlcndpc2UsIGp1c3Qgb25lIGVtb2ppIHdpbGwgYmUgbGFyZ2UuICovXG4gIGRpc2FibGVKdW1ib21vamk/OiBib29sZWFuO1xuICAvKiogSWYgc2V0LCBsaW5rcyB3aWxsIGJlIGxlZnQgYWxvbmUgaW5zdGVhZCBvZiB0dXJuZWQgaW50byBjbGlja2FibGUgYDxhPmAgdGFncy4gKi9cbiAgZGlzYWJsZUxpbmtzPzogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgYm9keVJhbmdlcz86IEJvZHlSYW5nZXNUeXBlO1xuICBvbkluY3JlYXNlVGV4dExlbmd0aD86ICgpID0+IHVua25vd247XG4gIG9wZW5Db252ZXJzYXRpb24/OiBPcGVuQ29udmVyc2F0aW9uQWN0aW9uVHlwZTtcbiAga2lja09mZkJvZHlEb3dubG9hZD86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCByZW5kZXJFbW9qaSA9ICh7XG4gIHRleHQsXG4gIGtleSxcbiAgc2l6ZUNsYXNzLFxuICByZW5kZXJOb25FbW9qaSxcbn06IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgdGV4dDogc3RyaW5nO1xuICBrZXk6IG51bWJlcjtcbiAgc2l6ZUNsYXNzPzogU2l6ZUNsYXNzVHlwZTtcbiAgcmVuZGVyTm9uRW1vamk6IFJlbmRlclRleHRDYWxsYmFja1R5cGU7XG59KSA9PiAoXG4gIDxFbW9qaWZ5XG4gICAga2V5PXtrZXl9XG4gICAgdGV4dD17dGV4dH1cbiAgICBzaXplQ2xhc3M9e3NpemVDbGFzc31cbiAgICByZW5kZXJOb25FbW9qaT17cmVuZGVyTm9uRW1vaml9XG4gIC8+XG4pO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IG1ha2VzIGl0IHZlcnkgZWFzeSB0byB1c2UgYWxsIHRocmVlIG9mIG91ciBtZXNzYWdlIGZvcm1hdHRpbmdcbiAqIGNvbXBvbmVudHM6IGBFbW9qaWZ5YCwgYExpbmtpZnlgLCBhbmQgYEFkZE5ld0xpbmVzYC4gQmVjYXVzZSBlYWNoIG9mIHRoZW0gaXMgZnVsbHlcbiAqIGNvbmZpZ3VyYWJsZSB3aXRoIHRoZWlyIGByZW5kZXJYWFhgIHByb3BzLCB0aGlzIGNvbXBvbmVudCB3aWxsIGFzc2VtYmxlIGFsbCB0aHJlZSBvZlxuICogdGhlbSBmb3IgeW91LlxuICovXG5leHBvcnQgZnVuY3Rpb24gTWVzc2FnZUJvZHkoe1xuICBib2R5UmFuZ2VzLFxuICBkaXJlY3Rpb24sXG4gIGRpc2FibGVKdW1ib21vamksXG4gIGRpc2FibGVMaW5rcyxcbiAgaTE4bixcbiAgb25JbmNyZWFzZVRleHRMZW5ndGgsXG4gIG9wZW5Db252ZXJzYXRpb24sXG4gIHRleHQsXG4gIHRleHRBdHRhY2htZW50LFxuICBraWNrT2ZmQm9keURvd25sb2FkLFxufTogUHJvcHMpOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IGhhc1JlYWRNb3JlID0gQm9vbGVhbihvbkluY3JlYXNlVGV4dExlbmd0aCk7XG4gIGNvbnN0IHRleHRXaXRoU3VmZml4ID1cbiAgICB0ZXh0QXR0YWNobWVudD8ucGVuZGluZyB8fCBoYXNSZWFkTW9yZSA/IGAke3RleHR9Li4uYCA6IHRleHQ7XG5cbiAgY29uc3Qgc2l6ZUNsYXNzID0gZGlzYWJsZUp1bWJvbW9qaSA/IHVuZGVmaW5lZCA6IGdldFNpemVDbGFzcyh0ZXh0KTtcbiAgY29uc3QgcHJvY2Vzc2VkVGV4dCA9IEF0TWVudGlvbmlmeS5wcmVwcm9jZXNzTWVudGlvbnMoXG4gICAgdGV4dFdpdGhTdWZmaXgsXG4gICAgYm9keVJhbmdlc1xuICApO1xuXG4gIGNvbnN0IHJlbmRlck5ld0xpbmVzOiBSZW5kZXJUZXh0Q2FsbGJhY2tUeXBlID0gKHtcbiAgICB0ZXh0OiB0ZXh0V2l0aE5ld0xpbmVzLFxuICAgIGtleSxcbiAgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8QWRkTmV3TGluZXNcbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIHRleHQ9e3RleHRXaXRoTmV3TGluZXN9XG4gICAgICAgIHJlbmRlck5vbk5ld0xpbmU9eyh7IHRleHQ6IGlubmVyVGV4dCwga2V5OiBpbm5lcktleSB9KSA9PiAoXG4gICAgICAgICAgPEF0TWVudGlvbmlmeVxuICAgICAgICAgICAga2V5PXtpbm5lcktleX1cbiAgICAgICAgICAgIGRpcmVjdGlvbj17ZGlyZWN0aW9ufVxuICAgICAgICAgICAgdGV4dD17aW5uZXJUZXh0fVxuICAgICAgICAgICAgYm9keVJhbmdlcz17Ym9keVJhbmdlc31cbiAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb249e29wZW5Db252ZXJzYXRpb259XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBsZXQgcGVuZGluZ0NvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgaWYgKGhhc1JlYWRNb3JlKSB7XG4gICAgcGVuZGluZ0NvbnRlbnQgPSBudWxsO1xuICB9IGVsc2UgaWYgKHRleHRBdHRhY2htZW50Py5wZW5kaW5nKSB7XG4gICAgcGVuZGluZ0NvbnRlbnQgPSAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJNZXNzYWdlQm9keV9faGlnaGxpZ2h0XCI+IHtpMThuKCdkb3dubG9hZGluZycpfTwvc3Bhbj5cbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIHRleHRBdHRhY2htZW50ICYmXG4gICAgY2FuQmVEb3dubG9hZGVkKHRleHRBdHRhY2htZW50KSAmJlxuICAgIGtpY2tPZmZCb2R5RG93bmxvYWRcbiAgKSB7XG4gICAgcGVuZGluZ0NvbnRlbnQgPSAoXG4gICAgICA8c3Bhbj5cbiAgICAgICAgeycgJ31cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cIk1lc3NhZ2VCb2R5X19kb3dubG9hZC1ib2R5XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBraWNrT2ZmQm9keURvd25sb2FkKCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ1NwYWNlJyB8fCBldi5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAga2lja09mZkJvZHlEb3dubG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignZG93bmxvYWRGdWxsTWVzc2FnZScpfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8c3Bhbj5cbiAgICAgIHtkaXNhYmxlTGlua3MgPyAoXG4gICAgICAgIHJlbmRlckVtb2ppKHtcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIHRleHQ6IHByb2Nlc3NlZFRleHQsXG4gICAgICAgICAgc2l6ZUNsYXNzLFxuICAgICAgICAgIGtleTogMCxcbiAgICAgICAgICByZW5kZXJOb25FbW9qaTogcmVuZGVyTmV3TGluZXMsXG4gICAgICAgIH0pXG4gICAgICApIDogKFxuICAgICAgICA8TGlua2lmeVxuICAgICAgICAgIHRleHQ9e3Byb2Nlc3NlZFRleHR9XG4gICAgICAgICAgcmVuZGVyTm9uTGluaz17KHsga2V5LCB0ZXh0OiBub25MaW5rVGV4dCB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyRW1vamkoe1xuICAgICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgICB0ZXh0OiBub25MaW5rVGV4dCxcbiAgICAgICAgICAgICAgc2l6ZUNsYXNzLFxuICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgIHJlbmRlck5vbkVtb2ppOiByZW5kZXJOZXdMaW5lcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3BlbmRpbmdDb250ZW50fVxuICAgICAge29uSW5jcmVhc2VUZXh0TGVuZ3RoID8gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiTWVzc2FnZUJvZHlfX3JlYWQtbW9yZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb25JbmNyZWFzZVRleHRMZW5ndGgoKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnU3BhY2UnIHx8IGV2LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICBvbkluY3JlYXNlVGV4dExlbmd0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICB7JyAnfVxuICAgICAgICAgIHtpMThuKCdNZXNzYWdlQm9keS0tcmVhZC1tb3JlJyl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9zcGFuPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUdsQix3QkFBZ0M7QUFFaEMsaUJBQTZCO0FBQzdCLDBCQUE2QjtBQUM3QixxQkFBd0I7QUFDeEIseUJBQTRCO0FBQzVCLHFCQUF3QjtBQTRCeEIsTUFBTSxjQUFjLHdCQUFDO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQVFBLG1EQUFDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLENBQ0YsR0FqQmtCO0FBMEJiLHFCQUFxQjtBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FDcUI7QUFDckIsUUFBTSxjQUFjLFFBQVEsb0JBQW9CO0FBQ2hELFFBQU0saUJBQ0osZ0JBQWdCLFdBQVcsY0FBYyxHQUFHLFlBQVk7QUFFMUQsUUFBTSxZQUFZLG1CQUFtQixTQUFZLDZCQUFhLElBQUk7QUFDbEUsUUFBTSxnQkFBZ0IsaUNBQWEsbUJBQ2pDLGdCQUNBLFVBQ0Y7QUFFQSxRQUFNLGlCQUF5Qyx3QkFBQztBQUFBLElBQzlDLE1BQU07QUFBQSxJQUNOO0FBQUEsUUFDSTtBQUNKLFdBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sV0FBVyxLQUFLLGVBQ3pDLG1EQUFDO0FBQUEsUUFDQyxLQUFLO0FBQUEsUUFDTDtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsT0FDRjtBQUFBLEtBRUo7QUFBQSxFQUVKLEdBbkIrQztBQXFCL0MsTUFBSTtBQUNKLE1BQUksYUFBYTtBQUNmLHFCQUFpQjtBQUFBLEVBQ25CLFdBQVcsZ0JBQWdCLFNBQVM7QUFDbEMscUJBQ0UsbURBQUM7QUFBQSxNQUFLLFdBQVU7QUFBQSxPQUF5QixLQUFFLEtBQUssYUFBYSxDQUFFO0FBQUEsRUFFbkUsV0FDRSxrQkFDQSx1Q0FBZ0IsY0FBYyxLQUM5QixxQkFDQTtBQUNBLHFCQUNFLG1EQUFDLGNBQ0UsS0FDRCxtREFBQztBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsU0FBUyxNQUFNO0FBQ2IsNEJBQW9CO0FBQUEsTUFDdEI7QUFBQSxNQUNBLFdBQVcsQ0FBQyxPQUFzQjtBQUNoQyxZQUFJLEdBQUcsUUFBUSxXQUFXLEdBQUcsUUFBUSxTQUFTO0FBQzVDLDhCQUFvQjtBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsTUFBSztBQUFBLE9BRUosS0FBSyxxQkFBcUIsQ0FDN0IsQ0FDRjtBQUFBLEVBRUo7QUFFQSxTQUNFLG1EQUFDLGNBQ0UsZUFDQyxZQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ047QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMLGdCQUFnQjtBQUFBLEVBQ2xCLENBQUMsSUFFRCxtREFBQztBQUFBLElBQ0MsTUFBTTtBQUFBLElBQ04sZUFBZSxDQUFDLEVBQUUsS0FBSyxNQUFNLGtCQUFrQjtBQUM3QyxhQUFPLFlBQVk7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxNQUNsQixDQUFDO0FBQUEsSUFDSDtBQUFBLEdBQ0YsR0FFRCxnQkFDQSx1QkFDQyxtREFBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsU0FBUyxNQUFNO0FBQ2IsMkJBQXFCO0FBQUEsSUFDdkI7QUFBQSxJQUNBLFdBQVcsQ0FBQyxPQUFzQjtBQUNoQyxVQUFJLEdBQUcsUUFBUSxXQUFXLEdBQUcsUUFBUSxTQUFTO0FBQzVDLDZCQUFxQjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsTUFBSztBQUFBLEtBRUosS0FDQSxLQUFLLHdCQUF3QixDQUNoQyxJQUNFLElBQ047QUFFSjtBQTFIZ0IiLAogICJuYW1lcyI6IFtdCn0K
