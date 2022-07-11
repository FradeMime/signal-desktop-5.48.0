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
var MessageBodyHighlight_exports = {};
__export(MessageBodyHighlight_exports, {
  MessageBodyHighlight: () => MessageBodyHighlight
});
module.exports = __toCommonJS(MessageBodyHighlight_exports);
var import_react = __toESM(require("react"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_AtMentionify = require("../conversation/AtMentionify");
var import_MessageBody = require("../conversation/MessageBody");
var import_Emojify = require("../conversation/Emojify");
var import_AddNewLines = require("../conversation/AddNewLines");
const CLASS_NAME = `${import_BaseConversationListItem.MESSAGE_TEXT_CLASS_NAME}__message-search-result-contents`;
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
class MessageBodyHighlight extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.renderNewLines = /* @__PURE__ */ __name(({
      text: textWithNewLines,
      key
    }) => {
      const { bodyRanges } = this.props;
      return /* @__PURE__ */ import_react.default.createElement(import_AddNewLines.AddNewLines, {
        key,
        text: textWithNewLines,
        renderNonNewLine: ({ text, key: innerKey }) => /* @__PURE__ */ import_react.default.createElement(import_AtMentionify.AtMentionify, {
          bodyRanges,
          key: innerKey,
          text
        })
      });
    }, "renderNewLines");
  }
  renderContents() {
    const { bodyRanges, text, i18n } = this.props;
    const results = [];
    const FIND_BEGIN_END = /<<left>>(.+?)<<right>>/g;
    const processedText = import_AtMentionify.AtMentionify.preprocessMentions(text, bodyRanges);
    let match = FIND_BEGIN_END.exec(processedText);
    let last = 0;
    let count = 1;
    if (!match) {
      return /* @__PURE__ */ import_react.default.createElement(import_MessageBody.MessageBody, {
        bodyRanges,
        disableJumbomoji: true,
        disableLinks: true,
        text,
        i18n
      });
    }
    const sizeClass = "";
    while (match) {
      if (last < match.index) {
        const beforeText = processedText.slice(last, match.index);
        count += 1;
        results.push(renderEmoji({
          text: beforeText,
          sizeClass,
          key: count,
          i18n,
          renderNonEmoji: this.renderNewLines
        }));
      }
      const [, toHighlight] = match;
      count += 2;
      results.push(/* @__PURE__ */ import_react.default.createElement("span", {
        className: "MessageBody__highlight",
        key: count - 1
      }, renderEmoji({
        text: toHighlight,
        sizeClass,
        key: count,
        i18n,
        renderNonEmoji: this.renderNewLines
      })));
      last = FIND_BEGIN_END.lastIndex;
      match = FIND_BEGIN_END.exec(processedText);
    }
    if (last < processedText.length) {
      count += 1;
      results.push(renderEmoji({
        text: processedText.slice(last),
        sizeClass,
        key: count,
        i18n,
        renderNonEmoji: this.renderNewLines
      }));
    }
    return results;
  }
  render() {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: CLASS_NAME
    }, this.renderContents());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageBodyHighlight
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJvZHlIaWdobGlnaHQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBNRVNTQUdFX1RFWFRfQ0xBU1NfTkFNRSB9IGZyb20gJy4vQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtJztcbmltcG9ydCB7IEF0TWVudGlvbmlmeSB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbi9BdE1lbnRpb25pZnknO1xuaW1wb3J0IHsgTWVzc2FnZUJvZHkgfSBmcm9tICcuLi9jb252ZXJzYXRpb24vTWVzc2FnZUJvZHknO1xuaW1wb3J0IHsgRW1vamlmeSB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbi9FbW9qaWZ5JztcbmltcG9ydCB7IEFkZE5ld0xpbmVzIH0gZnJvbSAnLi4vY29udmVyc2F0aW9uL0FkZE5ld0xpbmVzJztcblxuaW1wb3J0IHR5cGUgeyBTaXplQ2xhc3NUeXBlIH0gZnJvbSAnLi4vZW1vamkvbGliJztcblxuaW1wb3J0IHR5cGUge1xuICBCb2R5UmFuZ2VzVHlwZSxcbiAgTG9jYWxpemVyVHlwZSxcbiAgUmVuZGVyVGV4dENhbGxiYWNrVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmNvbnN0IENMQVNTX05BTUUgPSBgJHtNRVNTQUdFX1RFWFRfQ0xBU1NfTkFNRX1fX21lc3NhZ2Utc2VhcmNoLXJlc3VsdC1jb250ZW50c2A7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBib2R5UmFuZ2VzOiBCb2R5UmFuZ2VzVHlwZTtcbiAgdGV4dDogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuY29uc3QgcmVuZGVyRW1vamkgPSAoe1xuICB0ZXh0LFxuICBrZXksXG4gIHNpemVDbGFzcyxcbiAgcmVuZGVyTm9uRW1vamksXG59OiB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRleHQ6IHN0cmluZztcbiAga2V5OiBudW1iZXI7XG4gIHNpemVDbGFzcz86IFNpemVDbGFzc1R5cGU7XG4gIHJlbmRlck5vbkVtb2ppOiBSZW5kZXJUZXh0Q2FsbGJhY2tUeXBlO1xufSkgPT4gKFxuICA8RW1vamlmeVxuICAgIGtleT17a2V5fVxuICAgIHRleHQ9e3RleHR9XG4gICAgc2l6ZUNsYXNzPXtzaXplQ2xhc3N9XG4gICAgcmVuZGVyTm9uRW1vamk9e3JlbmRlck5vbkVtb2ppfVxuICAvPlxuKTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCb2R5SGlnaGxpZ2h0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyTmV3TGluZXM6IFJlbmRlclRleHRDYWxsYmFja1R5cGUgPSAoe1xuICAgIHRleHQ6IHRleHRXaXRoTmV3TGluZXMsXG4gICAga2V5LFxuICB9KSA9PiB7XG4gICAgY29uc3QgeyBib2R5UmFuZ2VzIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8QWRkTmV3TGluZXNcbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIHRleHQ9e3RleHRXaXRoTmV3TGluZXN9XG4gICAgICAgIHJlbmRlck5vbk5ld0xpbmU9eyh7IHRleHQsIGtleTogaW5uZXJLZXkgfSkgPT4gKFxuICAgICAgICAgIDxBdE1lbnRpb25pZnkgYm9keVJhbmdlcz17Ym9keVJhbmdlc30ga2V5PXtpbm5lcktleX0gdGV4dD17dGV4dH0gLz5cbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBwcml2YXRlIHJlbmRlckNvbnRlbnRzKCk6IFJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBib2R5UmFuZ2VzLCB0ZXh0LCBpMThuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJlc3VsdHM6IEFycmF5PEpTWC5FbGVtZW50PiA9IFtdO1xuICAgIGNvbnN0IEZJTkRfQkVHSU5fRU5EID0gLzw8bGVmdD4+KC4rPyk8PHJpZ2h0Pj4vZztcblxuICAgIGNvbnN0IHByb2Nlc3NlZFRleHQgPSBBdE1lbnRpb25pZnkucHJlcHJvY2Vzc01lbnRpb25zKHRleHQsIGJvZHlSYW5nZXMpO1xuXG4gICAgbGV0IG1hdGNoID0gRklORF9CRUdJTl9FTkQuZXhlYyhwcm9jZXNzZWRUZXh0KTtcbiAgICBsZXQgbGFzdCA9IDA7XG4gICAgbGV0IGNvdW50ID0gMTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNZXNzYWdlQm9keVxuICAgICAgICAgIGJvZHlSYW5nZXM9e2JvZHlSYW5nZXN9XG4gICAgICAgICAgZGlzYWJsZUp1bWJvbW9qaVxuICAgICAgICAgIGRpc2FibGVMaW5rc1xuICAgICAgICAgIHRleHQ9e3RleHR9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZUNsYXNzID0gJyc7XG5cbiAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgIGlmIChsYXN0IDwgbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlVGV4dCA9IHByb2Nlc3NlZFRleHQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpO1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICByZXN1bHRzLnB1c2goXG4gICAgICAgICAgcmVuZGVyRW1vamkoe1xuICAgICAgICAgICAgdGV4dDogYmVmb3JlVGV4dCxcbiAgICAgICAgICAgIHNpemVDbGFzcyxcbiAgICAgICAgICAgIGtleTogY291bnQsXG4gICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgcmVuZGVyTm9uRW1vamk6IHRoaXMucmVuZGVyTmV3TGluZXMsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgWywgdG9IaWdobGlnaHRdID0gbWF0Y2g7XG4gICAgICBjb3VudCArPSAyO1xuICAgICAgcmVzdWx0cy5wdXNoKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJNZXNzYWdlQm9keV9faGlnaGxpZ2h0XCIga2V5PXtjb3VudCAtIDF9PlxuICAgICAgICAgIHtyZW5kZXJFbW9qaSh7XG4gICAgICAgICAgICB0ZXh0OiB0b0hpZ2hsaWdodCxcbiAgICAgICAgICAgIHNpemVDbGFzcyxcbiAgICAgICAgICAgIGtleTogY291bnQsXG4gICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgcmVuZGVyTm9uRW1vamk6IHRoaXMucmVuZGVyTmV3TGluZXMsXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG5cbiAgICAgIGxhc3QgPSBGSU5EX0JFR0lOX0VORC5sYXN0SW5kZXg7XG4gICAgICBtYXRjaCA9IEZJTkRfQkVHSU5fRU5ELmV4ZWMocHJvY2Vzc2VkVGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgPCBwcm9jZXNzZWRUZXh0Lmxlbmd0aCkge1xuICAgICAgY291bnQgKz0gMTtcbiAgICAgIHJlc3VsdHMucHVzaChcbiAgICAgICAgcmVuZGVyRW1vamkoe1xuICAgICAgICAgIHRleHQ6IHByb2Nlc3NlZFRleHQuc2xpY2UobGFzdCksXG4gICAgICAgICAgc2l6ZUNsYXNzLFxuICAgICAgICAgIGtleTogY291bnQsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICByZW5kZXJOb25FbW9qaTogdGhpcy5yZW5kZXJOZXdMaW5lcyxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IFJlYWN0Tm9kZSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtDTEFTU19OQU1FfT57dGhpcy5yZW5kZXJDb250ZW50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
