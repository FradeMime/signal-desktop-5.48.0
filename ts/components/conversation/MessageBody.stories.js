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
var MessageBody_stories_exports = {};
__export(MessageBody_stories_exports, {
  ComplexMessageBody: () => ComplexMessageBody,
  EmojiSizeBasedOnCount: () => EmojiSizeBasedOnCount,
  JumbomojiDisabled: () => JumbomojiDisabled,
  JumbomojiDisabledByText: () => JumbomojiDisabledByText,
  JumbomojiEnabled: () => JumbomojiEnabled,
  LinksDisabled: () => LinksDisabled,
  LinksEnabled: () => LinksEnabled,
  Mention: () => Mention,
  MultipleMentions: () => MultipleMentions,
  TextPending: () => TextPending,
  default: () => MessageBody_stories_default
});
module.exports = __toCommonJS(MessageBody_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_MessageBody = require("./MessageBody");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MessageBody_stories_default = {
  title: "Components/Conversation/MessageBody"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  bodyRanges: overrideProps.bodyRanges,
  disableJumbomoji: (0, import_addon_knobs.boolean)("disableJumbomoji", overrideProps.disableJumbomoji || false),
  disableLinks: (0, import_addon_knobs.boolean)("disableLinks", overrideProps.disableLinks || false),
  direction: "incoming",
  i18n,
  text: (0, import_addon_knobs.text)("text", overrideProps.text || ""),
  textAttachment: overrideProps.textAttachment || {
    pending: (0, import_addon_knobs.boolean)("textPending", false)
  }
}), "createProps");
const LinksEnabled = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Check out https://www.signal.org"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "LinksEnabled");
const LinksDisabled = /* @__PURE__ */ __name(() => {
  const props = createProps({
    disableLinks: true,
    text: "Check out https://www.signal.org"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "LinksDisabled");
const EmojiSizeBasedOnCount = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props,
    text: "\u{1F639}"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props,
    text: "\u{1F639}\u{1F639}\u{1F639}"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props,
    text: "\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props,
    text: "\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props,
    text: "\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}\u{1F639}"
  }));
}, "EmojiSizeBasedOnCount");
const JumbomojiEnabled = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "JumbomojiEnabled");
const JumbomojiDisabled = /* @__PURE__ */ __name(() => {
  const props = createProps({
    disableJumbomoji: true,
    text: "\u{1F639}"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "JumbomojiDisabled");
const JumbomojiDisabledByText = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "not a jumbo kitty \u{1F639}"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "JumbomojiDisabledByText");
JumbomojiDisabledByText.story = {
  name: "Jumbomoji Disabled by Text"
};
const TextPending = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Check out https://www.signal.org",
    textAttachment: {
      pending: true
    }
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "TextPending");
const Mention = /* @__PURE__ */ __name(() => {
  const props = createProps({
    bodyRanges: [
      {
        start: 5,
        length: 1,
        mentionUuid: "tuv",
        replacementText: "Bender B Rodriguez \u{1F916}"
      }
    ],
    text: "Like \uFFFC once said: My story is a lot like yours, only more interesting because it involves robots"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "Mention");
Mention.story = {
  name: "@Mention"
};
const MultipleMentions = /* @__PURE__ */ __name(() => {
  const props = createProps({
    bodyRanges: [
      {
        start: 2,
        length: 1,
        mentionUuid: "def",
        replacementText: "Philip J Fry"
      },
      {
        start: 4,
        length: 1,
        mentionUuid: "abc",
        replacementText: "Professor Farnsworth"
      },
      {
        start: 0,
        length: 1,
        mentionUuid: "xyz",
        replacementText: "Yancy Fry"
      }
    ],
    text: "\uFFFC \uFFFC \uFFFC"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "MultipleMentions");
MultipleMentions.story = {
  name: "Multiple @Mentions"
};
const ComplexMessageBody = /* @__PURE__ */ __name(() => {
  const props = createProps({
    bodyRanges: [
      {
        start: 78,
        length: 1,
        mentionUuid: "wer",
        replacementText: "Acid Burn"
      },
      {
        start: 80,
        length: 1,
        mentionUuid: "xox",
        replacementText: "Cereal Killer"
      },
      {
        start: 4,
        length: 1,
        mentionUuid: "ldo",
        replacementText: "Zero Cool"
      }
    ],
    direction: "outgoing",
    text: "Hey \uFFFC\nCheck out https://www.signal.org I think you will really like it \u{1F60D}\n\ncc \uFFFC \uFFFC"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBody.MessageBody, {
    ...props
  });
}, "ComplexMessageBody");
ComplexMessageBody.story = {
  name: "Complex MessageBody"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplexMessageBody,
  EmojiSizeBasedOnCount,
  JumbomojiDisabled,
  JumbomojiDisabledByText,
  JumbomojiEnabled,
  LinksDisabled,
  LinksEnabled,
  Mention,
  MultipleMentions,
  TextPending
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJvZHkuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBib29sZWFuLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL01lc3NhZ2VCb2R5JztcbmltcG9ydCB7IE1lc3NhZ2VCb2R5IH0gZnJvbSAnLi9NZXNzYWdlQm9keSc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL01lc3NhZ2VCb2R5Jyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBib2R5UmFuZ2VzOiBvdmVycmlkZVByb3BzLmJvZHlSYW5nZXMsXG4gIGRpc2FibGVKdW1ib21vamk6IGJvb2xlYW4oXG4gICAgJ2Rpc2FibGVKdW1ib21vamknLFxuICAgIG92ZXJyaWRlUHJvcHMuZGlzYWJsZUp1bWJvbW9qaSB8fCBmYWxzZVxuICApLFxuICBkaXNhYmxlTGlua3M6IGJvb2xlYW4oJ2Rpc2FibGVMaW5rcycsIG92ZXJyaWRlUHJvcHMuZGlzYWJsZUxpbmtzIHx8IGZhbHNlKSxcbiAgZGlyZWN0aW9uOiAnaW5jb21pbmcnLFxuICBpMThuLFxuICB0ZXh0OiB0ZXh0KCd0ZXh0Jywgb3ZlcnJpZGVQcm9wcy50ZXh0IHx8ICcnKSxcbiAgdGV4dEF0dGFjaG1lbnQ6IG92ZXJyaWRlUHJvcHMudGV4dEF0dGFjaG1lbnQgfHwge1xuICAgIHBlbmRpbmc6IGJvb2xlYW4oJ3RleHRQZW5kaW5nJywgZmFsc2UpLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBMaW5rc0VuYWJsZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnQ2hlY2sgb3V0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VCb2R5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTGlua3NEaXNhYmxlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGRpc2FibGVMaW5rczogdHJ1ZSxcbiAgICB0ZXh0OiAnQ2hlY2sgb3V0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VCb2R5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRW1vamlTaXplQmFzZWRPbkNvdW50ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxNZXNzYWdlQm9keSB7Li4ucHJvcHN9IHRleHQ9XCJcdUQ4M0RcdURFMzlcIiAvPlxuICAgICAgPGJyIC8+XG4gICAgICA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSB0ZXh0PVwiXHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XCIgLz5cbiAgICAgIDxiciAvPlxuICAgICAgPE1lc3NhZ2VCb2R5IHsuLi5wcm9wc30gdGV4dD1cIlx1RDgzRFx1REUzOVx1RDgzRFx1REUzOVx1RDgzRFx1REUzOVx1RDgzRFx1REUzOVx1RDgzRFx1REUzOVwiIC8+XG4gICAgICA8YnIgLz5cbiAgICAgIDxNZXNzYWdlQm9keSB7Li4ucHJvcHN9IHRleHQ9XCJcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcIiAvPlxuICAgICAgPGJyIC8+XG4gICAgICA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSB0ZXh0PVwiXHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5XCIgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBKdW1ib21vamlFbmFibGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REUzOScsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBKdW1ib21vamlEaXNhYmxlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGRpc2FibGVKdW1ib21vamk6IHRydWUsXG4gICAgdGV4dDogJ1x1RDgzRFx1REUzOScsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBKdW1ib21vamlEaXNhYmxlZEJ5VGV4dCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdub3QgYSBqdW1ibyBraXR0eSBcdUQ4M0RcdURFMzknLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VCb2R5IHsuLi5wcm9wc30gLz47XG59O1xuXG5KdW1ib21vamlEaXNhYmxlZEJ5VGV4dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0p1bWJvbW9qaSBEaXNhYmxlZCBieSBUZXh0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBUZXh0UGVuZGluZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdDaGVjayBvdXQgaHR0cHM6Ly93d3cuc2lnbmFsLm9yZycsXG4gICAgdGV4dEF0dGFjaG1lbnQ6IHtcbiAgICAgIHBlbmRpbmc6IHRydWUsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlQm9keSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1lbnRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBib2R5UmFuZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXJ0OiA1LFxuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIG1lbnRpb25VdWlkOiAndHV2JyxcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnQmVuZGVyIEIgUm9kcmlndWV6IFx1RDgzRVx1REQxNicsXG4gICAgICB9LFxuICAgIF0sXG4gICAgdGV4dDogJ0xpa2UgXFx1RkZGQyBvbmNlIHNhaWQ6IE15IHN0b3J5IGlzIGEgbG90IGxpa2UgeW91cnMsIG9ubHkgbW9yZSBpbnRlcmVzdGluZyBiZWNhdXNlIGl0IGludm9sdmVzIHJvYm90cycsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSAvPjtcbn07XG5cbk1lbnRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdATWVudGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlwbGVNZW50aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIC8vIFRoZXNlIGFyZSBpbnRlbnRpb25hbGx5IGluIGEgbWl4ZWQgb3JkZXIgdG8gdGVzdCBob3cgd2UgZGVhbCB3aXRoIHRoYXRcbiAgICBib2R5UmFuZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIHN0YXJ0OiAyLFxuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIG1lbnRpb25VdWlkOiAnZGVmJyxcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnUGhpbGlwIEogRnJ5JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXJ0OiA0LFxuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIG1lbnRpb25VdWlkOiAnYWJjJyxcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnUHJvZmVzc29yIEZhcm5zd29ydGgnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIGxlbmd0aDogMSxcbiAgICAgICAgbWVudGlvblV1aWQ6ICd4eXonLFxuICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdZYW5jeSBGcnknLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHRleHQ6ICdcXHVGRkZDIFxcdUZGRkMgXFx1RkZGQycsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSAvPjtcbn07XG5cbk11bHRpcGxlTWVudGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNdWx0aXBsZSBATWVudGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBsZXhNZXNzYWdlQm9keSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGJvZHlSYW5nZXM6IFtcbiAgICAgIC8vIFRoZXNlIGFyZSBpbnRlbnRpb25hbGx5IGluIGEgbWl4ZWQgb3JkZXIgdG8gdGVzdCBob3cgd2UgZGVhbCB3aXRoIHRoYXRcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6IDc4LFxuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIG1lbnRpb25VdWlkOiAnd2VyJyxcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnQWNpZCBCdXJuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXJ0OiA4MCxcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJ3hveCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ0NlcmVhbCBLaWxsZXInLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6IDQsXG4gICAgICAgIGxlbmd0aDogMSxcbiAgICAgICAgbWVudGlvblV1aWQ6ICdsZG8nLFxuICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdaZXJvIENvb2wnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICB0ZXh0OiAnSGV5IFxcdUZGRkNcXG5DaGVjayBvdXQgaHR0cHM6Ly93d3cuc2lnbmFsLm9yZyBJIHRoaW5rIHlvdSB3aWxsIHJlYWxseSBsaWtlIGl0IFx1RDgzRFx1REUwRFxcblxcbmNjIFxcdUZGRkMgXFx1RkZGQycsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHkgey4uLnByb3BzfSAvPjtcbn07XG5cbkNvbXBsZXhNZXNzYWdlQm9keS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBsZXggTWVzc2FnZUJvZHknLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHlCQUE4QjtBQUc5Qix5QkFBNEI7QUFDNUIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDhCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLFlB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
