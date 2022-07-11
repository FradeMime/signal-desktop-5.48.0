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
var MessageBodyHighlight_stories_exports = {};
__export(MessageBodyHighlight_stories_exports, {
  Basic: () => Basic,
  EmojiNewlinesUrLs: () => EmojiNewlinesUrLs,
  NoJumbomoji: () => NoJumbomoji,
  NoReplacement: () => NoReplacement,
  TwoReplacements: () => TwoReplacements,
  TwoReplacementsWithAnMention: () => TwoReplacementsWithAnMention,
  default: () => MessageBodyHighlight_stories_default
});
module.exports = __toCommonJS(MessageBodyHighlight_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_MessageBodyHighlight = require("./MessageBodyHighlight");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MessageBodyHighlight_stories_default = {
  title: "Components/MessageBodyHighlight"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  bodyRanges: overrideProps.bodyRanges || [],
  i18n,
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "")
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "This is before <<left>>Inside<<right>> This is after."
  });
  return /* @__PURE__ */ React.createElement(import_MessageBodyHighlight.MessageBodyHighlight, {
    ...props
  });
}, "Basic");
const NoReplacement = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "All\nplain\ntext \u{1F525} http://somewhere.com"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBodyHighlight.MessageBodyHighlight, {
    ...props
  });
}, "NoReplacement");
const TwoReplacements = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Begin <<left>>Inside #1<<right>> This is between the two <<left>>Inside #2<<right>> End."
  });
  return /* @__PURE__ */ React.createElement(import_MessageBodyHighlight.MessageBodyHighlight, {
    ...props
  });
}, "TwoReplacements");
const TwoReplacementsWithAnMention = /* @__PURE__ */ __name(() => {
  const props = createProps({
    bodyRanges: [
      {
        length: 1,
        mentionUuid: "0ca40892-7b1a-11eb-9439-0242ac130002",
        replacementText: "Jin Sakai",
        start: 33
      }
    ],
    text: "Begin <<left>>Inside #1<<right>> \uFFFC This is between the two <<left>>Inside #2<<right>> End."
  });
  return /* @__PURE__ */ React.createElement(import_MessageBodyHighlight.MessageBodyHighlight, {
    ...props
  });
}, "TwoReplacementsWithAnMention");
TwoReplacementsWithAnMention.story = {
  name: "Two Replacements with an @mention"
};
const EmojiNewlinesUrLs = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\nhttp://somewhere.com\n\n\u{1F525} Before -- <<left>>A \u{1F525} inside<<right>> -- After \u{1F525}"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBodyHighlight.MessageBodyHighlight, {
    ...props
  });
}, "EmojiNewlinesUrLs");
EmojiNewlinesUrLs.story = {
  name: "Emoji + Newlines + URLs"
};
const NoJumbomoji = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F525}"
  });
  return /* @__PURE__ */ React.createElement(import_MessageBodyHighlight.MessageBodyHighlight, {
    ...props
  });
}, "NoJumbomoji");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  EmojiNewlinesUrLs,
  NoJumbomoji,
  NoReplacement,
  TwoReplacements,
  TwoReplacementsWithAnMention
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJvZHlIaWdobGlnaHQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vTWVzc2FnZUJvZHlIaWdobGlnaHQnO1xuaW1wb3J0IHsgTWVzc2FnZUJvZHlIaWdobGlnaHQgfSBmcm9tICcuL01lc3NhZ2VCb2R5SGlnaGxpZ2h0JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvTWVzc2FnZUJvZHlIaWdobGlnaHQnLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGJvZHlSYW5nZXM6IG92ZXJyaWRlUHJvcHMuYm9keVJhbmdlcyB8fCBbXSxcbiAgaTE4bixcbiAgdGV4dDogdGV4dCgndGV4dCcsIG92ZXJyaWRlUHJvcHMudGV4dCB8fCAnJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IEJhc2ljID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1RoaXMgaXMgYmVmb3JlIDw8bGVmdD4+SW5zaWRlPDxyaWdodD4+IFRoaXMgaXMgYWZ0ZXIuJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlQm9keUhpZ2hsaWdodCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE5vUmVwbGFjZW1lbnQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnQWxsXFxucGxhaW5cXG50ZXh0IFx1RDgzRFx1REQyNSBodHRwOi8vc29tZXdoZXJlLmNvbScsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHlIaWdobGlnaHQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBUd29SZXBsYWNlbWVudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnQmVnaW4gPDxsZWZ0Pj5JbnNpZGUgIzE8PHJpZ2h0Pj4gVGhpcyBpcyBiZXR3ZWVuIHRoZSB0d28gPDxsZWZ0Pj5JbnNpZGUgIzI8PHJpZ2h0Pj4gRW5kLicsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZUJvZHlIaWdobGlnaHQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBUd29SZXBsYWNlbWVudHNXaXRoQW5NZW50aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYm9keVJhbmdlczogW1xuICAgICAge1xuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIG1lbnRpb25VdWlkOiAnMGNhNDA4OTItN2IxYS0xMWViLTk0MzktMDI0MmFjMTMwMDAyJyxcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnSmluIFNha2FpJyxcbiAgICAgICAgc3RhcnQ6IDMzLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHRleHQ6ICdCZWdpbiA8PGxlZnQ+Pkluc2lkZSAjMTw8cmlnaHQ+PiBcXHVGRkZDIFRoaXMgaXMgYmV0d2VlbiB0aGUgdHdvIDw8bGVmdD4+SW5zaWRlICMyPDxyaWdodD4+IEVuZC4nLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VCb2R5SGlnaGxpZ2h0IHsuLi5wcm9wc30gLz47XG59O1xuXG5Ud29SZXBsYWNlbWVudHNXaXRoQW5NZW50aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnVHdvIFJlcGxhY2VtZW50cyB3aXRoIGFuIEBtZW50aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFbW9qaU5ld2xpbmVzVXJMcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdcXG5odHRwOi8vc29tZXdoZXJlLmNvbVxcblxcblx1RDgzRFx1REQyNSBCZWZvcmUgLS0gPDxsZWZ0Pj5BIFx1RDgzRFx1REQyNSBpbnNpZGU8PHJpZ2h0Pj4gLS0gQWZ0ZXIgXHVEODNEXHVERDI1JyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlQm9keUhpZ2hsaWdodCB7Li4ucHJvcHN9IC8+O1xufTtcblxuRW1vamlOZXdsaW5lc1VyTHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdFbW9qaSArIE5ld2xpbmVzICsgVVJMcycsXG59O1xuXG5leHBvcnQgY29uc3QgTm9KdW1ib21vamkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnXHVEODNEXHVERDI1JyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlQm9keUhpZ2hsaWdodCB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFFckIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixrQ0FBcUM7QUFFckMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyx1Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRSxZQUFZLGNBQWMsY0FBYyxDQUFDO0FBQUEsRUFDekM7QUFBQSxFQUNBLE1BQU0sNkJBQUssUUFBUSxjQUFjLFFBQVEsRUFBRTtBQUM3QyxJQUpvQjtBQU1iLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQXlCO0FBQUEsR0FBTztBQUMxQyxHQU5xQjtBQVFkLE1BQU0sZ0JBQWdCLDZCQUFtQjtBQUM5QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBeUI7QUFBQSxHQUFPO0FBQzFDLEdBTjZCO0FBUXRCLE1BQU0sa0JBQWtCLDZCQUFtQjtBQUNoRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBeUI7QUFBQSxHQUFPO0FBQzFDLEdBTitCO0FBUXhCLE1BQU0sK0JBQStCLDZCQUFtQjtBQUM3RCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLFlBQVk7QUFBQSxNQUNWO0FBQUEsUUFDRSxRQUFRO0FBQUEsUUFDUixhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBeUI7QUFBQSxHQUFPO0FBQzFDLEdBZDRDO0FBZ0I1Qyw2QkFBNkIsUUFBUTtBQUFBLEVBQ25DLE1BQU07QUFDUjtBQUVPLE1BQU0sb0JBQW9CLDZCQUFtQjtBQUNsRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBeUI7QUFBQSxHQUFPO0FBQzFDLEdBTmlDO0FBUWpDLGtCQUFrQixRQUFRO0FBQUEsRUFDeEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxjQUFjLDZCQUFtQjtBQUM1QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBeUI7QUFBQSxHQUFPO0FBQzFDLEdBTjJCOyIsCiAgIm5hbWVzIjogW10KfQo=
