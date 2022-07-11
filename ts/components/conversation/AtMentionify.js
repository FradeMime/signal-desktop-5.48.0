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
var AtMentionify_exports = {};
__export(AtMentionify_exports, {
  AtMentionify: () => AtMentionify
});
module.exports = __toCommonJS(AtMentionify_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_Emojify = require("./Emojify");
const AtMentionify = /* @__PURE__ */ __name(({
  bodyRanges,
  direction,
  openConversation,
  text
}) => {
  if (!bodyRanges) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, text);
  }
  const MENTIONS_REGEX = /(\uFFFC@(\d+))/g;
  let match = MENTIONS_REGEX.exec(text);
  let last = 0;
  const rangeStarts = /* @__PURE__ */ new Map();
  bodyRanges.forEach((range) => {
    rangeStarts.set(range.start, range);
  });
  const results = [];
  while (match) {
    if (last < match.index) {
      const textWithNoMentions = text.slice(last, match.index);
      results.push(textWithNoMentions);
    }
    const rangeStart = Number(match[2]);
    const range = rangeStarts.get(rangeStart);
    if (range) {
      results.push(/* @__PURE__ */ import_react.default.createElement("span", {
        className: `MessageBody__at-mention MessageBody__at-mention--${direction}`,
        key: range.start,
        onClick: () => {
          if (openConversation && range.conversationID) {
            openConversation(range.conversationID);
          }
        },
        onKeyUp: (e) => {
          if (e.target === e.currentTarget && e.keyCode === 13 && openConversation && range.conversationID) {
            openConversation(range.conversationID);
          }
        },
        tabIndex: 0,
        role: "link",
        "data-id": range.conversationID,
        "data-title": range.replacementText
      }, /* @__PURE__ */ import_react.default.createElement("bdi", null, "@", /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
        text: range.replacementText
      }))));
    }
    last = MENTIONS_REGEX.lastIndex;
    match = MENTIONS_REGEX.exec(text);
  }
  if (last < text.length) {
    results.push(text.slice(last));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, results);
}, "AtMentionify");
AtMentionify.preprocessMentions = (text, bodyRanges) => {
  if (!bodyRanges || !bodyRanges.length) {
    return text;
  }
  return (0, import_lodash.sortBy)(bodyRanges, "start").reduceRight((str, range) => {
    const textBegin = str.substr(0, range.start);
    const encodedMention = `\uFFFC@${range.start}`;
    const textEnd = str.substr(range.start + range.length, str.length);
    return `${textBegin}${encodedMention}${textEnd}`;
  }, text);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AtMentionify
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXRNZW50aW9uaWZ5LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc29ydEJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL0Vtb2ppZnknO1xuaW1wb3J0IHR5cGUgeyBCb2R5UmFuZ2VzVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgYm9keVJhbmdlcz86IEJvZHlSYW5nZXNUeXBlO1xuICBkaXJlY3Rpb24/OiAnaW5jb21pbmcnIHwgJ291dGdvaW5nJztcbiAgb3BlbkNvbnZlcnNhdGlvbj86IChjb252ZXJzYXRpb25JZDogc3RyaW5nLCBtZXNzYWdlSWQ/OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRleHQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBdE1lbnRpb25pZnkgPSAoe1xuICBib2R5UmFuZ2VzLFxuICBkaXJlY3Rpb24sXG4gIG9wZW5Db252ZXJzYXRpb24sXG4gIHRleHQsXG59OiBQcm9wcyk6IEpTWC5FbGVtZW50ID0+IHtcbiAgaWYgKCFib2R5UmFuZ2VzKSB7XG4gICAgcmV0dXJuIDw+e3RleHR9PC8+O1xuICB9XG5cbiAgY29uc3QgTUVOVElPTlNfUkVHRVggPSAvKFxcdUZGRkNAKFxcZCspKS9nO1xuXG4gIGxldCBtYXRjaCA9IE1FTlRJT05TX1JFR0VYLmV4ZWModGV4dCk7XG4gIGxldCBsYXN0ID0gMDtcblxuICBjb25zdCByYW5nZVN0YXJ0cyA9IG5ldyBNYXAoKTtcbiAgYm9keVJhbmdlcy5mb3JFYWNoKHJhbmdlID0+IHtcbiAgICByYW5nZVN0YXJ0cy5zZXQocmFuZ2Uuc3RhcnQsIHJhbmdlKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICB3aGlsZSAobWF0Y2gpIHtcbiAgICBpZiAobGFzdCA8IG1hdGNoLmluZGV4KSB7XG4gICAgICBjb25zdCB0ZXh0V2l0aE5vTWVudGlvbnMgPSB0ZXh0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KTtcbiAgICAgIHJlc3VsdHMucHVzaCh0ZXh0V2l0aE5vTWVudGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJhbmdlU3RhcnQgPSBOdW1iZXIobWF0Y2hbMl0pO1xuICAgIGNvbnN0IHJhbmdlID0gcmFuZ2VTdGFydHMuZ2V0KHJhbmdlU3RhcnQpO1xuXG4gICAgaWYgKHJhbmdlKSB7XG4gICAgICByZXN1bHRzLnB1c2goXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3NOYW1lPXtgTWVzc2FnZUJvZHlfX2F0LW1lbnRpb24gTWVzc2FnZUJvZHlfX2F0LW1lbnRpb24tLSR7ZGlyZWN0aW9ufWB9XG4gICAgICAgICAga2V5PXtyYW5nZS5zdGFydH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAob3BlbkNvbnZlcnNhdGlvbiAmJiByYW5nZS5jb252ZXJzYXRpb25JRCkge1xuICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKHJhbmdlLmNvbnZlcnNhdGlvbklEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5VXA9e2UgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0ICYmXG4gICAgICAgICAgICAgIGUua2V5Q29kZSA9PT0gMTMgJiZcbiAgICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbiAmJlxuICAgICAgICAgICAgICByYW5nZS5jb252ZXJzYXRpb25JRFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb24ocmFuZ2UuY29udmVyc2F0aW9uSUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgcm9sZT1cImxpbmtcIlxuICAgICAgICAgIGRhdGEtaWQ9e3JhbmdlLmNvbnZlcnNhdGlvbklEfVxuICAgICAgICAgIGRhdGEtdGl0bGU9e3JhbmdlLnJlcGxhY2VtZW50VGV4dH1cbiAgICAgICAgPlxuICAgICAgICAgIDxiZGk+XG4gICAgICAgICAgICBAXG4gICAgICAgICAgICA8RW1vamlmeSB0ZXh0PXtyYW5nZS5yZXBsYWNlbWVudFRleHR9IC8+XG4gICAgICAgICAgPC9iZGk+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGFzdCA9IE1FTlRJT05TX1JFR0VYLmxhc3RJbmRleDtcbiAgICBtYXRjaCA9IE1FTlRJT05TX1JFR0VYLmV4ZWModGV4dCk7XG4gIH1cblxuICBpZiAobGFzdCA8IHRleHQubGVuZ3RoKSB7XG4gICAgcmVzdWx0cy5wdXNoKHRleHQuc2xpY2UobGFzdCkpO1xuICB9XG5cbiAgcmV0dXJuIDw+e3Jlc3VsdHN9PC8+O1xufTtcblxuLy8gQXQtbWVudGlvbnMgbmVlZCB0byBiZSBwcmUtcHJvY2Vzc2VkIGJlZm9yZSBiZWluZyBwdXNoZWQgdGhyb3VnaCB0aGVcbi8vIEF0TWVudGlvbmlmeSBjb21wb25lbnQsIHRoaXMgaXMgZHVlIHRvIGJvZHlSYW5nZXMgY29udGFpbmluZyBzdGFydCtsZW5ndGhcbi8vIHZhbHVlcyB0aGF0IG9wZXJhdGUgb24gdGhlIHJhdyBzdHJpbmcuIFRoZSB0ZXh0IGhhcyB0byBiZSBwYXNzZWQgdGhyb3VnaFxuLy8gb3RoZXIgY29tcG9uZW50cyBiZWZvcmUgYmVpbmcgcmVuZGVyZWQgaW4gdGhlIDxNZXNzYWdlQm9keSAvPiwgY29tcG9uZW50c1xuLy8gc3VjaCBhcyBMaW5raWZ5LCBhbmQgRW1vamlmeS4gVGhlc2UgY29tcG9uZW50cyByZWNlaXZlIHRoZSB0ZXh0IHByb3AgYXMgYVxuLy8gc3RyaW5nLCB0aGVyZWZvcmUgd2UncmUgdW5hYmxlIHRvIG1hcmsgaXQgdXAgd2l0aCBET00gbm9kZXMgcHJpb3IgdG8gaGFuZGluZ1xuLy8gaXQgb2ZmIHRvIHRoZW0uIFRoaXMgZnVuY3Rpb24gd2lsbCBlbmNvZGUgdGhlIFwic3RhcnRcIiBwb3NpdGlvbiBpbnRvIHRoZSB0ZXh0XG4vLyBzdHJpbmcgc28gd2UgY2FuIGxhdGVyIHB1bGwgaXQgb2ZmIHdoZW4gcmVuZGVyaW5nIHRoZSBAbWVudGlvbi5cbkF0TWVudGlvbmlmeS5wcmVwcm9jZXNzTWVudGlvbnMgPSAoXG4gIHRleHQ6IHN0cmluZyxcbiAgYm9keVJhbmdlcz86IEJvZHlSYW5nZXNUeXBlXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoIWJvZHlSYW5nZXMgfHwgIWJvZHlSYW5nZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICAvLyBTb3J0aW5nIGJ5IHRoZSBzdGFydCBpbmRleCB0byBlbnN1cmUgdGhhdCB3ZSBhbHdheXMgcmVwbGFjZSBsYXN0IC0+IGZpcnN0LlxuICByZXR1cm4gc29ydEJ5KGJvZHlSYW5nZXMsICdzdGFydCcpLnJlZHVjZVJpZ2h0KChzdHIsIHJhbmdlKSA9PiB7XG4gICAgY29uc3QgdGV4dEJlZ2luID0gc3RyLnN1YnN0cigwLCByYW5nZS5zdGFydCk7XG4gICAgY29uc3QgZW5jb2RlZE1lbnRpb24gPSBgXFx1RkZGQ0Ake3JhbmdlLnN0YXJ0fWA7XG4gICAgY29uc3QgdGV4dEVuZCA9IHN0ci5zdWJzdHIocmFuZ2Uuc3RhcnQgKyByYW5nZS5sZW5ndGgsIHN0ci5sZW5ndGgpO1xuICAgIHJldHVybiBgJHt0ZXh0QmVnaW59JHtlbmNvZGVkTWVudGlvbn0ke3RleHRFbmR9YDtcbiAgfSwgdGV4dCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQixvQkFBdUI7QUFDdkIscUJBQXdCO0FBVWpCLE1BQU0sZUFBZSx3QkFBQztBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDd0I7QUFDeEIsTUFBSSxDQUFDLFlBQVk7QUFDZixXQUFPLHdGQUFHLElBQUs7QUFBQSxFQUNqQjtBQUVBLFFBQU0saUJBQWlCO0FBRXZCLE1BQUksUUFBUSxlQUFlLEtBQUssSUFBSTtBQUNwQyxNQUFJLE9BQU87QUFFWCxRQUFNLGNBQWMsb0JBQUksSUFBSTtBQUM1QixhQUFXLFFBQVEsV0FBUztBQUMxQixnQkFBWSxJQUFJLE1BQU0sT0FBTyxLQUFLO0FBQUEsRUFDcEMsQ0FBQztBQUVELFFBQU0sVUFBVSxDQUFDO0FBQ2pCLFNBQU8sT0FBTztBQUNaLFFBQUksT0FBTyxNQUFNLE9BQU87QUFDdEIsWUFBTSxxQkFBcUIsS0FBSyxNQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3ZELGNBQVEsS0FBSyxrQkFBa0I7QUFBQSxJQUNqQztBQUVBLFVBQU0sYUFBYSxPQUFPLE1BQU0sRUFBRTtBQUNsQyxVQUFNLFFBQVEsWUFBWSxJQUFJLFVBQVU7QUFFeEMsUUFBSSxPQUFPO0FBQ1QsY0FBUSxLQUNOLG1EQUFDO0FBQUEsUUFDQyxXQUFXLG9EQUFvRDtBQUFBLFFBQy9ELEtBQUssTUFBTTtBQUFBLFFBQ1gsU0FBUyxNQUFNO0FBQ2IsY0FBSSxvQkFBb0IsTUFBTSxnQkFBZ0I7QUFDNUMsNkJBQWlCLE1BQU0sY0FBYztBQUFBLFVBQ3ZDO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUyxPQUFLO0FBQ1osY0FDRSxFQUFFLFdBQVcsRUFBRSxpQkFDZixFQUFFLFlBQVksTUFDZCxvQkFDQSxNQUFNLGdCQUNOO0FBQ0EsNkJBQWlCLE1BQU0sY0FBYztBQUFBLFVBQ3ZDO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsTUFBSztBQUFBLFFBQ0wsV0FBUyxNQUFNO0FBQUEsUUFDZixjQUFZLE1BQU07QUFBQSxTQUVsQixtREFBQyxhQUFJLEtBRUgsbURBQUM7QUFBQSxRQUFRLE1BQU0sTUFBTTtBQUFBLE9BQWlCLENBQ3hDLENBQ0YsQ0FDRjtBQUFBLElBQ0Y7QUFFQSxXQUFPLGVBQWU7QUFDdEIsWUFBUSxlQUFlLEtBQUssSUFBSTtBQUFBLEVBQ2xDO0FBRUEsTUFBSSxPQUFPLEtBQUssUUFBUTtBQUN0QixZQUFRLEtBQUssS0FBSyxNQUFNLElBQUksQ0FBQztBQUFBLEVBQy9CO0FBRUEsU0FBTyx3RkFBRyxPQUFRO0FBQ3BCLEdBeEU0QjtBQWtGNUIsYUFBYSxxQkFBcUIsQ0FDaEMsTUFDQSxlQUNXO0FBQ1gsTUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLFFBQVE7QUFDckMsV0FBTztBQUFBLEVBQ1Q7QUFHQSxTQUFPLDBCQUFPLFlBQVksT0FBTyxFQUFFLFlBQVksQ0FBQyxLQUFLLFVBQVU7QUFDN0QsVUFBTSxZQUFZLElBQUksT0FBTyxHQUFHLE1BQU0sS0FBSztBQUMzQyxVQUFNLGlCQUFpQixVQUFVLE1BQU07QUFDdkMsVUFBTSxVQUFVLElBQUksT0FBTyxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksTUFBTTtBQUNqRSxXQUFPLEdBQUcsWUFBWSxpQkFBaUI7QUFBQSxFQUN6QyxHQUFHLElBQUk7QUFDVDsiLAogICJuYW1lcyI6IFtdCn0K
