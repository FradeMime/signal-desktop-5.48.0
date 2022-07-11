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
var MessageSearchResult_stories_exports = {};
__export(MessageSearchResult_stories_exports, {
  Default: () => Default,
  DoubleMention: () => DoubleMention,
  EmptyShouldBeInvalid: () => EmptyShouldBeInvalid,
  FromSomeoneToGroup: () => FromSomeoneToGroup,
  FromYou: () => FromYou,
  FromYouToGroup: () => FromYouToGroup,
  FromYouToYourself: () => FromYouToYourself,
  LongSearchResult: () => LongSearchResult,
  Mention: () => Mention,
  MentionNoMatches: () => MentionNoMatches,
  MentionRegexp: () => MentionRegexp,
  SearchingInConversation: () => SearchingInConversation,
  Selected: () => Selected,
  SenderHasABadge: () => SenderHasABadge,
  _MentionNoMatches: () => _MentionNoMatches,
  default: () => MessageSearchResult_stories_default
});
module.exports = __toCommonJS(MessageSearchResult_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../../.storybook/StorybookThemeContext");
var import_assert = require("../../util/assert");
var import_getFakeBadge = require("../../test-both/helpers/getFakeBadge");
var import_MessageSearchResult = require("./MessageSearchResult");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MessageSearchResult_stories_default = {
  title: "Components/MessageSearchResult"
};
const someone = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Some Person",
  name: "Some Person",
  phoneNumber: "(202) 555-0011"
});
const me = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Me",
  name: "Me",
  isMe: true
});
const group = (0, import_getDefaultConversation.getDefaultConversation)({
  title: "Group Chat",
  name: "Group Chat",
  type: "group"
});
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  id: "",
  conversationId: "",
  sentAt: Date.now() - 24 * 60 * 1e3,
  snippet: (0, import_addon_knobs.text)("snippet", overrideProps.snippet || "What's <<left>>going<<right>> on?"),
  body: (0, import_addon_knobs.text)("body", overrideProps.body || "What's going on?"),
  bodyRanges: overrideProps.bodyRanges || [],
  from: overrideProps.from,
  to: overrideProps.to,
  getPreferredBadge: overrideProps.getPreferredBadge || (() => void 0),
  isSelected: (0, import_addon_knobs.boolean)("isSelected", overrideProps.isSelected || false),
  showConversation: (0, import_addon_actions.action)("showConversation"),
  isSearchingInConversation: (0, import_addon_knobs.boolean)("isSearchingInConversation", overrideProps.isSearchingInConversation || false),
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext)
}), "useProps");
const Default = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: someone,
    to: me
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "Default");
const SenderHasABadge = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: { ...someone, badges: [{ id: "sender badge" }] },
    to: me,
    getPreferredBadge: (badges) => {
      (0, import_assert.strictAssert)(badges[0]?.id === "sender badge", "Rendering the wrong badge!");
      return (0, import_getFakeBadge.getFakeBadge)();
    }
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "SenderHasABadge");
SenderHasABadge.story = {
  name: "Sender has a badge"
};
const Selected = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: someone,
    to: me,
    isSelected: true
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "Selected");
const FromYou = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: me,
    to: someone
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "FromYou");
const SearchingInConversation = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: me,
    to: someone,
    isSearchingInConversation: true
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "SearchingInConversation");
SearchingInConversation.story = {
  name: "Searching in Conversation"
};
const FromYouToYourself = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: me,
    to: me
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "FromYouToYourself");
FromYouToYourself.story = {
  name: "From You to Yourself"
};
const FromYouToGroup = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: me,
    to: group
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "FromYouToGroup");
FromYouToGroup.story = {
  name: "From You to Group"
};
const FromSomeoneToGroup = /* @__PURE__ */ __name(() => {
  const props = useProps({
    from: someone,
    to: group
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "FromSomeoneToGroup");
FromSomeoneToGroup.story = {
  name: "From Someone to Group"
};
const LongSearchResult = /* @__PURE__ */ __name(() => {
  const snippets = [
    "This is a really <<left>>detail<<right>>ed long line which will wrap and only be cut off after it gets to three lines. So maybe this will make it in as well?",
    "Okay, here are the <<left>>detail<<right>>s:\n\n1355 Ridge Way\nCode: 234\n\nI'm excited!"
  ];
  const props1 = useProps({
    from: someone,
    to: me,
    snippet: snippets[0]
  });
  const props2 = useProps({
    from: someone,
    to: me,
    snippet: snippets[1]
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props1
  }), /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props2
  }));
}, "LongSearchResult");
const EmptyShouldBeInvalid = /* @__PURE__ */ __name(() => {
  const props = useProps();
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "EmptyShouldBeInvalid");
EmptyShouldBeInvalid.story = {
  name: "Empty (should be invalid)"
};
const Mention = /* @__PURE__ */ __name(() => {
  const props = useProps({
    body: "moss banana twine sound lake zoo brain count vacuum work stairs try power forget hair dry diary years no results \uFFFC elephant sorry umbrella potato igloo kangaroo home Georgia bayonet vector orange forge diary zebra turtle rise front \uFFFC",
    bodyRanges: [
      {
        length: 1,
        mentionUuid: "7d007e95-771d-43ad-9191-eaa86c773cb8",
        replacementText: "Shoe",
        start: 113
      },
      {
        length: 1,
        mentionUuid: "7d007e95-771d-43ad-9191-eaa86c773cb8",
        replacementText: "Shoe",
        start: 237
      }
    ],
    from: someone,
    to: me,
    snippet: "...forget hair dry diary years no <<left>>results<<right>> \uFFFC <<left>>elephant<<right>> sorry umbrella potato igloo kangaroo home Georgia..."
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "Mention");
Mention.story = {
  name: "@mention"
};
const MentionRegexp = /* @__PURE__ */ __name(() => {
  const props = useProps({
    body: "\uFFFC This is a (long) /text/ ^$ that is ... specially **crafted** to (test) our regexp escaping mechanism! Making sure that the code we write works in all sorts of scenarios",
    bodyRanges: [
      {
        length: 1,
        mentionUuid: "7d007e95-771d-43ad-9191-eaa86c773cb8",
        replacementText: "RegExp",
        start: 0
      }
    ],
    from: someone,
    to: me,
    snippet: "\uFFFC This is a (long) /text/ ^$ that is ... <<left>>specially<<right>> **crafted** to (test) our regexp escaping mechanism..."
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "MentionRegexp");
MentionRegexp.story = {
  name: "@mention regexp"
};
const MentionNoMatches = /* @__PURE__ */ __name(() => {
  const props = useProps({
    body: "\uFFFC hello",
    bodyRanges: [
      {
        length: 1,
        mentionUuid: "7d007e95-771d-43ad-9191-eaa86c773cb8",
        replacementText: "Neo",
        start: 0
      }
    ],
    from: someone,
    to: me,
    snippet: "\uFFFC hello"
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "MentionNoMatches");
MentionNoMatches.story = {
  name: "@mention no-matches"
};
const _MentionNoMatches = /* @__PURE__ */ __name(() => {
  const props = useProps({
    body: "moss banana twine sound lake zoo brain count vacuum work stairs try power forget hair dry diary years no results \uFFFC elephant sorry umbrella potato igloo kangaroo home Georgia bayonet vector orange forge diary zebra turtle rise front \uFFFC",
    bodyRanges: [
      {
        length: 1,
        mentionUuid: "7d007e95-771d-43ad-9191-eaa86c773cb8",
        replacementText: "Shoe",
        start: 113
      },
      {
        length: 1,
        mentionUuid: "7d007e95-771d-43ad-9191-eaa86c773cb8",
        replacementText: "Shoe",
        start: 237
      }
    ],
    from: someone,
    to: me,
    snippet: "...forget hair dry diary years no results \uFFFC elephant sorry umbrella potato igloo kangaroo home Georgia..."
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "_MentionNoMatches");
_MentionNoMatches.story = {
  name: "@mention no-matches"
};
const DoubleMention = /* @__PURE__ */ __name(() => {
  const props = useProps({
    body: "Hey \uFFFC \uFFFC test",
    bodyRanges: [
      {
        length: 1,
        mentionUuid: "9eb2eb65-992a-4909-a2a5-18c56bd7648f",
        replacementText: "Alice",
        start: 4
      },
      {
        length: 1,
        mentionUuid: "755ec61b-1590-48da-b003-3e57b2b54448",
        replacementText: "Bob",
        start: 6
      }
    ],
    from: someone,
    to: me,
    snippet: "<<left>>Hey<<right>> \uFFFC \uFFFC <<left>>test<<right>>"
  });
  return /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
    ...props
  });
}, "DoubleMention");
DoubleMention.story = {
  name: "Double @mention"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  DoubleMention,
  EmptyShouldBeInvalid,
  FromSomeoneToGroup,
  FromYou,
  FromYouToGroup,
  FromYouToYourself,
  LongSearchResult,
  Mention,
  MentionNoMatches,
  MentionRegexp,
  SearchingInConversation,
  Selected,
  SenderHasABadge,
  _MentionNoMatches
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVNlYXJjaFJlc3VsdC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgU3Rvcnlib29rVGhlbWVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLnN0b3J5Ym9vay9TdG9yeWJvb2tUaGVtZUNvbnRleHQnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZ2V0RmFrZUJhZGdlIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RmFrZUJhZGdlJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9NZXNzYWdlU2VhcmNoUmVzdWx0JztcbmltcG9ydCB7IE1lc3NhZ2VTZWFyY2hSZXN1bHQgfSBmcm9tICcuL01lc3NhZ2VTZWFyY2hSZXN1bHQnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9NZXNzYWdlU2VhcmNoUmVzdWx0Jyxcbn07XG5cbmNvbnN0IHNvbWVvbmUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgdGl0bGU6ICdTb21lIFBlcnNvbicsXG4gIG5hbWU6ICdTb21lIFBlcnNvbicsXG4gIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTAwMTEnLFxufSk7XG5cbmNvbnN0IG1lID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIHRpdGxlOiAnTWUnLFxuICBuYW1lOiAnTWUnLFxuICBpc01lOiB0cnVlLFxufSk7XG5cbmNvbnN0IGdyb3VwID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIHRpdGxlOiAnR3JvdXAgQ2hhdCcsXG4gIG5hbWU6ICdHcm91cCBDaGF0JyxcbiAgdHlwZTogJ2dyb3VwJyxcbn0pO1xuXG5jb25zdCB1c2VQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBpMThuLFxuICBpZDogJycsXG4gIGNvbnZlcnNhdGlvbklkOiAnJyxcbiAgc2VudEF0OiBEYXRlLm5vdygpIC0gMjQgKiA2MCAqIDEwMDAsXG4gIHNuaXBwZXQ6IHRleHQoXG4gICAgJ3NuaXBwZXQnLFxuICAgIG92ZXJyaWRlUHJvcHMuc25pcHBldCB8fCBcIldoYXQncyA8PGxlZnQ+PmdvaW5nPDxyaWdodD4+IG9uP1wiXG4gICksXG4gIGJvZHk6IHRleHQoJ2JvZHknLCBvdmVycmlkZVByb3BzLmJvZHkgfHwgXCJXaGF0J3MgZ29pbmcgb24/XCIpLFxuICBib2R5UmFuZ2VzOiBvdmVycmlkZVByb3BzLmJvZHlSYW5nZXMgfHwgW10sXG4gIGZyb206IG92ZXJyaWRlUHJvcHMuZnJvbSBhcyBQcm9wc1R5cGVbJ2Zyb20nXSxcbiAgdG86IG92ZXJyaWRlUHJvcHMudG8gYXMgUHJvcHNUeXBlWyd0byddLFxuICBnZXRQcmVmZXJyZWRCYWRnZTogb3ZlcnJpZGVQcm9wcy5nZXRQcmVmZXJyZWRCYWRnZSB8fCAoKCkgPT4gdW5kZWZpbmVkKSxcbiAgaXNTZWxlY3RlZDogYm9vbGVhbignaXNTZWxlY3RlZCcsIG92ZXJyaWRlUHJvcHMuaXNTZWxlY3RlZCB8fCBmYWxzZSksXG4gIHNob3dDb252ZXJzYXRpb246IGFjdGlvbignc2hvd0NvbnZlcnNhdGlvbicpLFxuICBpc1NlYXJjaGluZ0luQ29udmVyc2F0aW9uOiBib29sZWFuKFxuICAgICdpc1NlYXJjaGluZ0luQ29udmVyc2F0aW9uJyxcbiAgICBvdmVycmlkZVByb3BzLmlzU2VhcmNoaW5nSW5Db252ZXJzYXRpb24gfHwgZmFsc2VcbiAgKSxcbiAgdGhlbWU6IFJlYWN0LnVzZUNvbnRleHQoU3Rvcnlib29rVGhlbWVDb250ZXh0KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGZyb206IHNvbWVvbmUsXG4gICAgdG86IG1lLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTZW5kZXJIYXNBQmFkZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBmcm9tOiB7IC4uLnNvbWVvbmUsIGJhZGdlczogW3sgaWQ6ICdzZW5kZXIgYmFkZ2UnIH1dIH0sXG4gICAgdG86IG1lLFxuICAgIGdldFByZWZlcnJlZEJhZGdlOiBiYWRnZXMgPT4ge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBiYWRnZXNbMF0/LmlkID09PSAnc2VuZGVyIGJhZGdlJyxcbiAgICAgICAgJ1JlbmRlcmluZyB0aGUgd3JvbmcgYmFkZ2UhJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiBnZXRGYWtlQmFkZ2UoKTtcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzfSAvPjtcbn07XG5cblNlbmRlckhhc0FCYWRnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1NlbmRlciBoYXMgYSBiYWRnZScsXG59O1xuXG5leHBvcnQgY29uc3QgU2VsZWN0ZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBmcm9tOiBzb21lb25lLFxuICAgIHRvOiBtZSxcbiAgICBpc1NlbGVjdGVkOiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBGcm9tWW91ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZnJvbTogbWUsXG4gICAgdG86IHNvbWVvbmUsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZVNlYXJjaFJlc3VsdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFNlYXJjaGluZ0luQ29udmVyc2F0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZnJvbTogbWUsXG4gICAgdG86IHNvbWVvbmUsXG4gICAgaXNTZWFyY2hpbmdJbkNvbnZlcnNhdGlvbjogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wc30gLz47XG59O1xuXG5TZWFyY2hpbmdJbkNvbnZlcnNhdGlvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ1NlYXJjaGluZyBpbiBDb252ZXJzYXRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IEZyb21Zb3VUb1lvdXJzZWxmID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZnJvbTogbWUsXG4gICAgdG86IG1lLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzfSAvPjtcbn07XG5cbkZyb21Zb3VUb1lvdXJzZWxmLnN0b3J5ID0ge1xuICBuYW1lOiAnRnJvbSBZb3UgdG8gWW91cnNlbGYnLFxufTtcblxuZXhwb3J0IGNvbnN0IEZyb21Zb3VUb0dyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZnJvbTogbWUsXG4gICAgdG86IGdyb3VwLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzfSAvPjtcbn07XG5cbkZyb21Zb3VUb0dyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnRnJvbSBZb3UgdG8gR3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IEZyb21Tb21lb25lVG9Hcm91cCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGZyb206IHNvbWVvbmUsXG4gICAgdG86IGdyb3VwLFxuICB9KTtcblxuICByZXR1cm4gPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzfSAvPjtcbn07XG5cbkZyb21Tb21lb25lVG9Hcm91cC5zdG9yeSA9IHtcbiAgbmFtZTogJ0Zyb20gU29tZW9uZSB0byBHcm91cCcsXG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ1NlYXJjaFJlc3VsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHNuaXBwZXRzID0gW1xuICAgICdUaGlzIGlzIGEgcmVhbGx5IDw8bGVmdD4+ZGV0YWlsPDxyaWdodD4+ZWQgbG9uZyBsaW5lIHdoaWNoIHdpbGwgd3JhcCBhbmQgb25seSBiZSBjdXQgb2ZmIGFmdGVyIGl0IGdldHMgdG8gdGhyZWUgbGluZXMuIFNvIG1heWJlIHRoaXMgd2lsbCBtYWtlIGl0IGluIGFzIHdlbGw/JyxcbiAgICBcIk9rYXksIGhlcmUgYXJlIHRoZSA8PGxlZnQ+PmRldGFpbDw8cmlnaHQ+PnM6XFxuXFxuMTM1NSBSaWRnZSBXYXlcXG5Db2RlOiAyMzRcXG5cXG5JJ20gZXhjaXRlZCFcIixcbiAgXTtcblxuICBjb25zdCBwcm9wczEgPSB1c2VQcm9wcyh7XG4gICAgZnJvbTogc29tZW9uZSxcbiAgICB0bzogbWUsXG4gICAgc25pcHBldDogc25pcHBldHNbMF0sXG4gIH0pO1xuXG4gIGNvbnN0IHByb3BzMiA9IHVzZVByb3BzKHtcbiAgICBmcm9tOiBzb21lb25lLFxuICAgIHRvOiBtZSxcbiAgICBzbmlwcGV0OiBzbmlwcGV0c1sxXSxcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPE1lc3NhZ2VTZWFyY2hSZXN1bHQgey4uLnByb3BzMX0gLz5cbiAgICAgIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wczJ9IC8+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgRW1wdHlTaG91bGRCZUludmFsaWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKCk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wc30gLz47XG59O1xuXG5FbXB0eVNob3VsZEJlSW52YWxpZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0VtcHR5IChzaG91bGQgYmUgaW52YWxpZCknLFxufTtcblxuZXhwb3J0IGNvbnN0IE1lbnRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBib2R5OiAnbW9zcyBiYW5hbmEgdHdpbmUgc291bmQgbGFrZSB6b28gYnJhaW4gY291bnQgdmFjdXVtIHdvcmsgc3RhaXJzIHRyeSBwb3dlciBmb3JnZXQgaGFpciBkcnkgZGlhcnkgeWVhcnMgbm8gcmVzdWx0cyBcXHVGRkZDIGVsZXBoYW50IHNvcnJ5IHVtYnJlbGxhIHBvdGF0byBpZ2xvbyBrYW5nYXJvbyBob21lIEdlb3JnaWEgYmF5b25ldCB2ZWN0b3Igb3JhbmdlIGZvcmdlIGRpYXJ5IHplYnJhIHR1cnRsZSByaXNlIGZyb250IFxcdUZGRkMnLFxuICAgIGJvZHlSYW5nZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzdkMDA3ZTk1LTc3MWQtNDNhZC05MTkxLWVhYTg2Yzc3M2NiOCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ1Nob2UnLFxuICAgICAgICBzdGFydDogMTEzLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzdkMDA3ZTk1LTc3MWQtNDNhZC05MTkxLWVhYTg2Yzc3M2NiOCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ1Nob2UnLFxuICAgICAgICBzdGFydDogMjM3LFxuICAgICAgfSxcbiAgICBdLFxuICAgIGZyb206IHNvbWVvbmUsXG4gICAgdG86IG1lLFxuICAgIHNuaXBwZXQ6XG4gICAgICAnLi4uZm9yZ2V0IGhhaXIgZHJ5IGRpYXJ5IHllYXJzIG5vIDw8bGVmdD4+cmVzdWx0czw8cmlnaHQ+PiBcXHVGRkZDIDw8bGVmdD4+ZWxlcGhhbnQ8PHJpZ2h0Pj4gc29ycnkgdW1icmVsbGEgcG90YXRvIGlnbG9vIGthbmdhcm9vIGhvbWUgR2VvcmdpYS4uLicsXG4gIH0pO1xuXG4gIHJldHVybiA8TWVzc2FnZVNlYXJjaFJlc3VsdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuTWVudGlvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0BtZW50aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBNZW50aW9uUmVnZXhwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgYm9keTogJ1xcdUZGRkMgVGhpcyBpcyBhIChsb25nKSAvdGV4dC8gXiQgdGhhdCBpcyAuLi4gc3BlY2lhbGx5ICoqY3JhZnRlZCoqIHRvICh0ZXN0KSBvdXIgcmVnZXhwIGVzY2FwaW5nIG1lY2hhbmlzbSEgTWFraW5nIHN1cmUgdGhhdCB0aGUgY29kZSB3ZSB3cml0ZSB3b3JrcyBpbiBhbGwgc29ydHMgb2Ygc2NlbmFyaW9zJyxcbiAgICBib2R5UmFuZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIGxlbmd0aDogMSxcbiAgICAgICAgbWVudGlvblV1aWQ6ICc3ZDAwN2U5NS03NzFkLTQzYWQtOTE5MS1lYWE4NmM3NzNjYjgnLFxuICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdSZWdFeHAnLFxuICAgICAgICBzdGFydDogMCxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBmcm9tOiBzb21lb25lLFxuICAgIHRvOiBtZSxcbiAgICBzbmlwcGV0OlxuICAgICAgJ1xcdUZGRkMgVGhpcyBpcyBhIChsb25nKSAvdGV4dC8gXiQgdGhhdCBpcyAuLi4gPDxsZWZ0Pj5zcGVjaWFsbHk8PHJpZ2h0Pj4gKipjcmFmdGVkKiogdG8gKHRlc3QpIG91ciByZWdleHAgZXNjYXBpbmcgbWVjaGFuaXNtLi4uJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wc30gLz47XG59O1xuXG5NZW50aW9uUmVnZXhwLnN0b3J5ID0ge1xuICBuYW1lOiAnQG1lbnRpb24gcmVnZXhwJyxcbn07XG5cbmV4cG9ydCBjb25zdCBNZW50aW9uTm9NYXRjaGVzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgYm9keTogJ1xcdUZGRkMgaGVsbG8nLFxuICAgIGJvZHlSYW5nZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzdkMDA3ZTk1LTc3MWQtNDNhZC05MTkxLWVhYTg2Yzc3M2NiOCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ05lbycsXG4gICAgICAgIHN0YXJ0OiAwLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGZyb206IHNvbWVvbmUsXG4gICAgdG86IG1lLFxuICAgIHNuaXBwZXQ6ICdcXHVGRkZDIGhlbGxvJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wc30gLz47XG59O1xuXG5NZW50aW9uTm9NYXRjaGVzLnN0b3J5ID0ge1xuICBuYW1lOiAnQG1lbnRpb24gbm8tbWF0Y2hlcycsXG59O1xuXG5leHBvcnQgY29uc3QgX01lbnRpb25Ob01hdGNoZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBib2R5OiAnbW9zcyBiYW5hbmEgdHdpbmUgc291bmQgbGFrZSB6b28gYnJhaW4gY291bnQgdmFjdXVtIHdvcmsgc3RhaXJzIHRyeSBwb3dlciBmb3JnZXQgaGFpciBkcnkgZGlhcnkgeWVhcnMgbm8gcmVzdWx0cyBcXHVGRkZDIGVsZXBoYW50IHNvcnJ5IHVtYnJlbGxhIHBvdGF0byBpZ2xvbyBrYW5nYXJvbyBob21lIEdlb3JnaWEgYmF5b25ldCB2ZWN0b3Igb3JhbmdlIGZvcmdlIGRpYXJ5IHplYnJhIHR1cnRsZSByaXNlIGZyb250IFxcdUZGRkMnLFxuICAgIGJvZHlSYW5nZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzdkMDA3ZTk1LTc3MWQtNDNhZC05MTkxLWVhYTg2Yzc3M2NiOCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ1Nob2UnLFxuICAgICAgICBzdGFydDogMTEzLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzdkMDA3ZTk1LTc3MWQtNDNhZC05MTkxLWVhYTg2Yzc3M2NiOCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ1Nob2UnLFxuICAgICAgICBzdGFydDogMjM3LFxuICAgICAgfSxcbiAgICBdLFxuICAgIGZyb206IHNvbWVvbmUsXG4gICAgdG86IG1lLFxuICAgIHNuaXBwZXQ6XG4gICAgICAnLi4uZm9yZ2V0IGhhaXIgZHJ5IGRpYXJ5IHllYXJzIG5vIHJlc3VsdHMgXFx1RkZGQyBlbGVwaGFudCBzb3JyeSB1bWJyZWxsYSBwb3RhdG8gaWdsb28ga2FuZ2Fyb28gaG9tZSBHZW9yZ2lhLi4uJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wc30gLz47XG59O1xuXG5fTWVudGlvbk5vTWF0Y2hlcy5zdG9yeSA9IHtcbiAgbmFtZTogJ0BtZW50aW9uIG5vLW1hdGNoZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IERvdWJsZU1lbnRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBib2R5OiAnSGV5IFxcdUZGRkMgXFx1RkZGQyB0ZXN0JyxcbiAgICBib2R5UmFuZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIGxlbmd0aDogMSxcbiAgICAgICAgbWVudGlvblV1aWQ6ICc5ZWIyZWI2NS05OTJhLTQ5MDktYTJhNS0xOGM1NmJkNzY0OGYnLFxuICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdBbGljZScsXG4gICAgICAgIHN0YXJ0OiA0LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzc1NWVjNjFiLTE1OTAtNDhkYS1iMDAzLTNlNTdiMmI1NDQ0OCcsXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ0JvYicsXG4gICAgICAgIHN0YXJ0OiA2LFxuICAgICAgfSxcbiAgICBdLFxuICAgIGZyb206IHNvbWVvbmUsXG4gICAgdG86IG1lLFxuICAgIHNuaXBwZXQ6ICc8PGxlZnQ+PkhleTw8cmlnaHQ+PiBcXHVGRkZDIFxcdUZGRkMgPDxsZWZ0Pj50ZXN0PDxyaWdodD4+JyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlU2VhcmNoUmVzdWx0IHsuLi5wcm9wc30gLz47XG59O1xuXG5Eb3VibGVNZW50aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnRG91YmxlIEBtZW50aW9uJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFB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
