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
var util_exports = {};
__export(util_exports, {
  getBlotTextPartitions: () => getBlotTextPartitions,
  getDeltaToRemoveStaleMentions: () => getDeltaToRemoveStaleMentions,
  getDeltaToRestartMention: () => getDeltaToRestartMention,
  getTextAndMentionsFromOps: () => getTextAndMentionsFromOps,
  getTextFromOps: () => getTextFromOps,
  insertEmojiOps: () => insertEmojiOps,
  insertMentionOps: () => insertMentionOps,
  isInsertEmojiOp: () => isInsertEmojiOp,
  isInsertMentionOp: () => isInsertMentionOp,
  isMentionBlot: () => isMentionBlot,
  isRetainOp: () => isRetainOp,
  isSpecificInsertOp: () => isSpecificInsertOp,
  matchBlotTextPartitions: () => matchBlotTextPartitions
});
module.exports = __toCommonJS(util_exports);
var import_emoji_regex = __toESM(require("emoji-regex"));
var import_quill_delta = __toESM(require("quill-delta"));
const isMentionBlot = /* @__PURE__ */ __name((blot) => blot.value() && blot.value().mention, "isMentionBlot");
const isRetainOp = /* @__PURE__ */ __name((op) => op !== void 0 && op.retain !== void 0, "isRetainOp");
const isSpecificInsertOp = /* @__PURE__ */ __name((op, type) => {
  return op.insert !== void 0 && typeof op.insert === "object" && Object.hasOwnProperty.call(op.insert, type);
}, "isSpecificInsertOp");
const isInsertEmojiOp = /* @__PURE__ */ __name((op) => isSpecificInsertOp(op, "emoji"), "isInsertEmojiOp");
const isInsertMentionOp = /* @__PURE__ */ __name((op) => isSpecificInsertOp(op, "mention"), "isInsertMentionOp");
const getTextFromOps = /* @__PURE__ */ __name((ops) => ops.reduce((acc, op) => {
  if (typeof op.insert === "string") {
    return acc + op.insert;
  }
  if (isInsertEmojiOp(op)) {
    return acc + op.insert.emoji;
  }
  if (isInsertMentionOp(op)) {
    return `${acc}@${op.insert.mention.title}`;
  }
  return acc;
}, "").trim(), "getTextFromOps");
const getTextAndMentionsFromOps = /* @__PURE__ */ __name((ops) => {
  const mentions = [];
  const text = ops.reduce((acc, op, index) => {
    if (typeof op.insert === "string") {
      const toAdd = index === 0 ? op.insert.trimStart() : op.insert;
      return acc + toAdd;
    }
    if (isInsertEmojiOp(op)) {
      return acc + op.insert.emoji;
    }
    if (isInsertMentionOp(op)) {
      mentions.push({
        length: 1,
        mentionUuid: op.insert.mention.uuid,
        replacementText: op.insert.mention.title,
        start: acc.length
      });
      return `${acc}\uFFFC`;
    }
    return acc;
  }, "").trimEnd();
  return [text, mentions];
}, "getTextAndMentionsFromOps");
const getBlotTextPartitions = /* @__PURE__ */ __name((blotText, index) => {
  const lowerCaseBlotText = (blotText || "").toLowerCase();
  const leftLeafText = lowerCaseBlotText.substr(0, index);
  const rightLeafText = lowerCaseBlotText.substr(index);
  return [leftLeafText, rightLeafText];
}, "getBlotTextPartitions");
const matchBlotTextPartitions = /* @__PURE__ */ __name((blot, index, leftRegExp, rightRegExp) => {
  const [leftText, rightText] = getBlotTextPartitions(blot.text, index);
  const leftMatch = leftRegExp.exec(leftText);
  let rightMatch = null;
  if (rightRegExp) {
    rightMatch = rightRegExp.exec(rightText);
  }
  return [leftMatch, rightMatch];
}, "matchBlotTextPartitions");
const getDeltaToRestartMention = /* @__PURE__ */ __name((ops) => {
  const changes = ops.reduce((acc, op) => {
    if (op.insert && typeof op.insert === "string") {
      acc.push({ retain: op.insert.length });
    } else {
      acc.push({ retain: 1 });
    }
    return acc;
  }, Array());
  changes.push({ delete: 1 });
  changes.push({ insert: "@" });
  return new import_quill_delta.default(changes);
}, "getDeltaToRestartMention");
const getDeltaToRemoveStaleMentions = /* @__PURE__ */ __name((ops, memberUuids) => {
  const newOps = ops.reduce((memo, op) => {
    if (op.insert) {
      if (isInsertMentionOp(op) && !memberUuids.includes(op.insert.mention.uuid)) {
        const deleteOp = { delete: 1 };
        const textOp = { insert: `@${op.insert.mention.title}` };
        return [...memo, deleteOp, textOp];
      }
      if (typeof op.insert === "string") {
        const retainStringOp = { retain: op.insert.length };
        return [...memo, retainStringOp];
      }
      const retainEmbedOp = { retain: 1 };
      return [...memo, retainEmbedOp];
    }
    return [...memo, op];
  }, Array());
  return new import_quill_delta.default(newOps);
}, "getDeltaToRemoveStaleMentions");
const insertMentionOps = /* @__PURE__ */ __name((incomingOps, bodyRanges) => {
  const ops = [...incomingOps];
  bodyRanges.sort((a, b) => b.start - a.start).forEach(({ start, length, mentionUuid, replacementText }) => {
    const op = ops.shift();
    if (op) {
      const { insert } = op;
      if (typeof insert === "string") {
        const left = insert.slice(0, start);
        const right = insert.slice(start + length);
        const mention = {
          uuid: mentionUuid,
          title: replacementText
        };
        ops.unshift({ insert: right });
        ops.unshift({ insert: { mention } });
        ops.unshift({ insert: left });
      } else {
        ops.unshift(op);
      }
    }
  });
  return ops;
}, "insertMentionOps");
const insertEmojiOps = /* @__PURE__ */ __name((incomingOps) => {
  return incomingOps.reduce((ops, op) => {
    if (typeof op.insert === "string") {
      const text = op.insert;
      const re = (0, import_emoji_regex.default)();
      let index = 0;
      let match;
      while (match = re.exec(text)) {
        const [emoji] = match;
        ops.push({ insert: text.slice(index, match.index) });
        ops.push({ insert: { emoji } });
        index = match.index + emoji.length;
      }
      ops.push({ insert: text.slice(index, text.length) });
    } else {
      ops.push(op);
    }
    return ops;
  }, []);
}, "insertEmojiOps");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBlotTextPartitions,
  getDeltaToRemoveStaleMentions,
  getDeltaToRestartMention,
  getTextAndMentionsFromOps,
  getTextFromOps,
  insertEmojiOps,
  insertMentionOps,
  isInsertEmojiOp,
  isInsertMentionOp,
  isMentionBlot,
  isRetainOp,
  isSpecificInsertOp,
  matchBlotTextPartitions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBlbW9qaVJlZ2V4IGZyb20gJ2Vtb2ppLXJlZ2V4JztcbmltcG9ydCBEZWx0YSBmcm9tICdxdWlsbC1kZWx0YSc7XG5pbXBvcnQgdHlwZSB7IExlYWZCbG90LCBEZWx0YU9wZXJhdGlvbiB9IGZyb20gJ3F1aWxsJztcbmltcG9ydCB0eXBlIE9wIGZyb20gJ3F1aWxsLWRlbHRhL2Rpc3QvT3AnO1xuXG5pbXBvcnQgdHlwZSB7IEJvZHlSYW5nZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgTWVudGlvbkJsb3QgfSBmcm9tICcuL21lbnRpb25zL2Jsb3QnO1xuXG5leHBvcnQgdHlwZSBNZW50aW9uQmxvdFZhbHVlID0ge1xuICB1dWlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgaXNNZW50aW9uQmxvdCA9IChibG90OiBMZWFmQmxvdCk6IGJsb3QgaXMgTWVudGlvbkJsb3QgPT5cbiAgYmxvdC52YWx1ZSgpICYmIGJsb3QudmFsdWUoKS5tZW50aW9uO1xuXG5leHBvcnQgdHlwZSBSZXRhaW5PcCA9IE9wICYgeyByZXRhaW46IG51bWJlciB9O1xuZXhwb3J0IHR5cGUgSW5zZXJ0T3A8SyBleHRlbmRzIHN0cmluZywgVD4gPSBPcCAmIHsgaW5zZXJ0OiB7IFtWIGluIEtdOiBUIH0gfTtcblxuZXhwb3J0IHR5cGUgSW5zZXJ0TWVudGlvbk9wID0gSW5zZXJ0T3A8J21lbnRpb24nLCBNZW50aW9uQmxvdFZhbHVlPjtcbmV4cG9ydCB0eXBlIEluc2VydEVtb2ppT3AgPSBJbnNlcnRPcDwnZW1vamknLCBzdHJpbmc+O1xuXG5leHBvcnQgY29uc3QgaXNSZXRhaW5PcCA9IChvcD86IE9wKTogb3AgaXMgUmV0YWluT3AgPT5cbiAgb3AgIT09IHVuZGVmaW5lZCAmJiBvcC5yZXRhaW4gIT09IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNvbnN0IGlzU3BlY2lmaWNJbnNlcnRPcCA9IChvcDogT3AsIHR5cGU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIG9wLmluc2VydCAhPT0gdW5kZWZpbmVkICYmXG4gICAgdHlwZW9mIG9wLmluc2VydCA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvcC5pbnNlcnQsIHR5cGUpXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNJbnNlcnRFbW9qaU9wID0gKG9wOiBPcCk6IG9wIGlzIEluc2VydEVtb2ppT3AgPT5cbiAgaXNTcGVjaWZpY0luc2VydE9wKG9wLCAnZW1vamknKTtcblxuZXhwb3J0IGNvbnN0IGlzSW5zZXJ0TWVudGlvbk9wID0gKG9wOiBPcCk6IG9wIGlzIEluc2VydE1lbnRpb25PcCA9PlxuICBpc1NwZWNpZmljSW5zZXJ0T3Aob3AsICdtZW50aW9uJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRUZXh0RnJvbU9wcyA9IChvcHM6IEFycmF5PERlbHRhT3BlcmF0aW9uPik6IHN0cmluZyA9PlxuICBvcHNcbiAgICAucmVkdWNlKChhY2MsIG9wKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9wLmluc2VydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGFjYyArIG9wLmluc2VydDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzSW5zZXJ0RW1vamlPcChvcCkpIHtcbiAgICAgICAgcmV0dXJuIGFjYyArIG9wLmluc2VydC5lbW9qaTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzSW5zZXJ0TWVudGlvbk9wKG9wKSkge1xuICAgICAgICByZXR1cm4gYCR7YWNjfUAke29wLmluc2VydC5tZW50aW9uLnRpdGxlfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgJycpXG4gICAgLnRyaW0oKTtcblxuZXhwb3J0IGNvbnN0IGdldFRleHRBbmRNZW50aW9uc0Zyb21PcHMgPSAoXG4gIG9wczogQXJyYXk8T3A+XG4pOiBbc3RyaW5nLCBBcnJheTxCb2R5UmFuZ2VUeXBlPl0gPT4ge1xuICBjb25zdCBtZW50aW9uczogQXJyYXk8Qm9keVJhbmdlVHlwZT4gPSBbXTtcblxuICBjb25zdCB0ZXh0ID0gb3BzXG4gICAgLnJlZHVjZSgoYWNjLCBvcCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb3AuaW5zZXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCB0b0FkZCA9IGluZGV4ID09PSAwID8gb3AuaW5zZXJ0LnRyaW1TdGFydCgpIDogb3AuaW5zZXJ0O1xuICAgICAgICByZXR1cm4gYWNjICsgdG9BZGQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0luc2VydEVtb2ppT3Aob3ApKSB7XG4gICAgICAgIHJldHVybiBhY2MgKyBvcC5pbnNlcnQuZW1vamk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0luc2VydE1lbnRpb25PcChvcCkpIHtcbiAgICAgICAgbWVudGlvbnMucHVzaCh7XG4gICAgICAgICAgbGVuZ3RoOiAxLCAvLyBUaGUgbGVuZ3RoIG9mIGBcXHVGRkZDYFxuICAgICAgICAgIG1lbnRpb25VdWlkOiBvcC5pbnNlcnQubWVudGlvbi51dWlkLFxuICAgICAgICAgIHJlcGxhY2VtZW50VGV4dDogb3AuaW5zZXJ0Lm1lbnRpb24udGl0bGUsXG4gICAgICAgICAgc3RhcnQ6IGFjYy5sZW5ndGgsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBgJHthY2N9XFx1RkZGQ2A7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgJycpXG4gICAgLnRyaW1FbmQoKTsgLy8gVHJpbW1pbmcgdGhlIHN0YXJ0IG9mIHRoaXMgc3RyaW5nIHdpbGwgbWVzcyB1cCBtZW50aW9uIGluZGljZXNcblxuICByZXR1cm4gW3RleHQsIG1lbnRpb25zXTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCbG90VGV4dFBhcnRpdGlvbnMgPSAoXG4gIGJsb3RUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIGluZGV4OiBudW1iZXJcbik6IFtzdHJpbmcsIHN0cmluZ10gPT4ge1xuICBjb25zdCBsb3dlckNhc2VCbG90VGV4dCA9IChibG90VGV4dCB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgbGVmdExlYWZUZXh0ID0gbG93ZXJDYXNlQmxvdFRleHQuc3Vic3RyKDAsIGluZGV4KTtcbiAgY29uc3QgcmlnaHRMZWFmVGV4dCA9IGxvd2VyQ2FzZUJsb3RUZXh0LnN1YnN0cihpbmRleCk7XG5cbiAgcmV0dXJuIFtsZWZ0TGVhZlRleHQsIHJpZ2h0TGVhZlRleHRdO1xufTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoQmxvdFRleHRQYXJ0aXRpb25zID0gKFxuICBibG90OiBMZWFmQmxvdCxcbiAgaW5kZXg6IG51bWJlcixcbiAgbGVmdFJlZ0V4cDogUmVnRXhwLFxuICByaWdodFJlZ0V4cD86IFJlZ0V4cFxuKTogQXJyYXk8UmVnRXhwTWF0Y2hBcnJheSB8IG51bGw+ID0+IHtcbiAgY29uc3QgW2xlZnRUZXh0LCByaWdodFRleHRdID0gZ2V0QmxvdFRleHRQYXJ0aXRpb25zKGJsb3QudGV4dCwgaW5kZXgpO1xuXG4gIGNvbnN0IGxlZnRNYXRjaCA9IGxlZnRSZWdFeHAuZXhlYyhsZWZ0VGV4dCk7XG4gIGxldCByaWdodE1hdGNoID0gbnVsbDtcblxuICBpZiAocmlnaHRSZWdFeHApIHtcbiAgICByaWdodE1hdGNoID0gcmlnaHRSZWdFeHAuZXhlYyhyaWdodFRleHQpO1xuICB9XG5cbiAgcmV0dXJuIFtsZWZ0TWF0Y2gsIHJpZ2h0TWF0Y2hdO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERlbHRhVG9SZXN0YXJ0TWVudGlvbiA9IChvcHM6IEFycmF5PE9wPik6IERlbHRhID0+IHtcbiAgY29uc3QgY2hhbmdlcyA9IG9wcy5yZWR1Y2UoKGFjYywgb3ApOiBBcnJheTxPcD4gPT4ge1xuICAgIGlmIChvcC5pbnNlcnQgJiYgdHlwZW9mIG9wLmluc2VydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFjYy5wdXNoKHsgcmV0YWluOiBvcC5pbnNlcnQubGVuZ3RoIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY2MucHVzaCh7IHJldGFpbjogMSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgQXJyYXk8T3A+KCkpO1xuICBjaGFuZ2VzLnB1c2goeyBkZWxldGU6IDEgfSk7XG4gIGNoYW5nZXMucHVzaCh7IGluc2VydDogJ0AnIH0pO1xuICByZXR1cm4gbmV3IERlbHRhKGNoYW5nZXMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERlbHRhVG9SZW1vdmVTdGFsZU1lbnRpb25zID0gKFxuICBvcHM6IEFycmF5PE9wPixcbiAgbWVtYmVyVXVpZHM6IEFycmF5PHN0cmluZz5cbik6IERlbHRhID0+IHtcbiAgY29uc3QgbmV3T3BzID0gb3BzLnJlZHVjZSgobWVtbywgb3ApID0+IHtcbiAgICBpZiAob3AuaW5zZXJ0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzSW5zZXJ0TWVudGlvbk9wKG9wKSAmJlxuICAgICAgICAhbWVtYmVyVXVpZHMuaW5jbHVkZXMob3AuaW5zZXJ0Lm1lbnRpb24udXVpZClcbiAgICAgICkge1xuICAgICAgICBjb25zdCBkZWxldGVPcCA9IHsgZGVsZXRlOiAxIH07XG4gICAgICAgIGNvbnN0IHRleHRPcCA9IHsgaW5zZXJ0OiBgQCR7b3AuaW5zZXJ0Lm1lbnRpb24udGl0bGV9YCB9O1xuICAgICAgICByZXR1cm4gWy4uLm1lbW8sIGRlbGV0ZU9wLCB0ZXh0T3BdO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9wLmluc2VydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgcmV0YWluU3RyaW5nT3AgPSB7IHJldGFpbjogb3AuaW5zZXJ0Lmxlbmd0aCB9O1xuICAgICAgICByZXR1cm4gWy4uLm1lbW8sIHJldGFpblN0cmluZ09wXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmV0YWluRW1iZWRPcCA9IHsgcmV0YWluOiAxIH07XG4gICAgICByZXR1cm4gWy4uLm1lbW8sIHJldGFpbkVtYmVkT3BdO1xuICAgIH1cblxuICAgIHJldHVybiBbLi4ubWVtbywgb3BdO1xuICB9LCBBcnJheTxPcD4oKSk7XG5cbiAgcmV0dXJuIG5ldyBEZWx0YShuZXdPcHMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGluc2VydE1lbnRpb25PcHMgPSAoXG4gIGluY29taW5nT3BzOiBBcnJheTxPcD4sXG4gIGJvZHlSYW5nZXM6IEFycmF5PEJvZHlSYW5nZVR5cGU+XG4pOiBBcnJheTxPcD4gPT4ge1xuICBjb25zdCBvcHMgPSBbLi4uaW5jb21pbmdPcHNdO1xuXG4gIC8vIFdvcmtpbmcgYmFja3dhcmRzIHRocm91Z2ggYm9keVJhbmdlcyAodG8gYXZvaWQgb2Zmc2V0dGluZyBsYXRlciBtZW50aW9ucyksXG4gIC8vIFNoaWZ0IG9mZiB0aGUgb3Agd2l0aCB0aGUgdGV4dCB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBtZW50aW9uLFxuICAvLyBJbnNlcnQgYSBtZW50aW9uIGJhc2VkIG9uIHRoZSBjdXJyZW50IGJvZHlSYW5nZSxcbiAgLy8gVW5zaGlmdCB0aGUgbWVudGlvbiBhbmQgc3Vycm91bmRpbmcgdGV4dCB0byBsZWF2ZSB0aGUgb3BzIHJlYWR5IGZvciB0aGUgbmV4dCByYW5nZVxuICBib2R5UmFuZ2VzXG4gICAgLnNvcnQoKGEsIGIpID0+IGIuc3RhcnQgLSBhLnN0YXJ0KVxuICAgIC5mb3JFYWNoKCh7IHN0YXJ0LCBsZW5ndGgsIG1lbnRpb25VdWlkLCByZXBsYWNlbWVudFRleHQgfSkgPT4ge1xuICAgICAgY29uc3Qgb3AgPSBvcHMuc2hpZnQoKTtcblxuICAgICAgaWYgKG9wKSB7XG4gICAgICAgIGNvbnN0IHsgaW5zZXJ0IH0gPSBvcDtcblxuICAgICAgICBpZiAodHlwZW9mIGluc2VydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zdCBsZWZ0ID0gaW5zZXJ0LnNsaWNlKDAsIHN0YXJ0KTtcbiAgICAgICAgICBjb25zdCByaWdodCA9IGluc2VydC5zbGljZShzdGFydCArIGxlbmd0aCk7XG5cbiAgICAgICAgICBjb25zdCBtZW50aW9uID0ge1xuICAgICAgICAgICAgdXVpZDogbWVudGlvblV1aWQsXG4gICAgICAgICAgICB0aXRsZTogcmVwbGFjZW1lbnRUZXh0LFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBvcHMudW5zaGlmdCh7IGluc2VydDogcmlnaHQgfSk7XG4gICAgICAgICAgb3BzLnVuc2hpZnQoeyBpbnNlcnQ6IHsgbWVudGlvbiB9IH0pO1xuICAgICAgICAgIG9wcy51bnNoaWZ0KHsgaW5zZXJ0OiBsZWZ0IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wcy51bnNoaWZ0KG9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBvcHM7XG59O1xuXG5leHBvcnQgY29uc3QgaW5zZXJ0RW1vamlPcHMgPSAoaW5jb21pbmdPcHM6IEFycmF5PE9wPik6IEFycmF5PE9wPiA9PiB7XG4gIHJldHVybiBpbmNvbWluZ09wcy5yZWR1Y2UoKG9wcywgb3ApID0+IHtcbiAgICBpZiAodHlwZW9mIG9wLmluc2VydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBvcC5pbnNlcnQ7XG4gICAgICBjb25zdCByZSA9IGVtb2ppUmVnZXgoKTtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGw7XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWModGV4dCkpKSB7XG4gICAgICAgIGNvbnN0IFtlbW9qaV0gPSBtYXRjaDtcbiAgICAgICAgb3BzLnB1c2goeyBpbnNlcnQ6IHRleHQuc2xpY2UoaW5kZXgsIG1hdGNoLmluZGV4KSB9KTtcbiAgICAgICAgb3BzLnB1c2goeyBpbnNlcnQ6IHsgZW1vamkgfSB9KTtcbiAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleCArIGVtb2ppLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgb3BzLnB1c2goeyBpbnNlcnQ6IHRleHQuc2xpY2UoaW5kZXgsIHRleHQubGVuZ3RoKSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3BzLnB1c2gob3ApO1xuICAgIH1cblxuICAgIHJldHVybiBvcHM7XG4gIH0sIFtdIGFzIEFycmF5PE9wPik7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF1QjtBQUN2Qix5QkFBa0I7QUFZWCxNQUFNLGdCQUFnQix3QkFBQyxTQUM1QixLQUFLLE1BQU0sS0FBSyxLQUFLLE1BQU0sRUFBRSxTQURGO0FBU3RCLE1BQU0sYUFBYSx3QkFBQyxPQUN6QixPQUFPLFVBQWEsR0FBRyxXQUFXLFFBRFY7QUFHbkIsTUFBTSxxQkFBcUIsd0JBQUMsSUFBUSxTQUEwQjtBQUNuRSxTQUNFLEdBQUcsV0FBVyxVQUNkLE9BQU8sR0FBRyxXQUFXLFlBQ3JCLE9BQU8sZUFBZSxLQUFLLEdBQUcsUUFBUSxJQUFJO0FBRTlDLEdBTmtDO0FBUTNCLE1BQU0sa0JBQWtCLHdCQUFDLE9BQzlCLG1CQUFtQixJQUFJLE9BQU8sR0FERDtBQUd4QixNQUFNLG9CQUFvQix3QkFBQyxPQUNoQyxtQkFBbUIsSUFBSSxTQUFTLEdBREQ7QUFHMUIsTUFBTSxpQkFBaUIsd0JBQUMsUUFDN0IsSUFDRyxPQUFPLENBQUMsS0FBSyxPQUFPO0FBQ25CLE1BQUksT0FBTyxHQUFHLFdBQVcsVUFBVTtBQUNqQyxXQUFPLE1BQU0sR0FB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
