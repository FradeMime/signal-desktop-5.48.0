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
var TextAttachment_stories_exports = {};
__export(TextAttachment_stories_exports, {
  AutowrapText: () => AutowrapText,
  CharacterWrapBold: () => CharacterWrapBold,
  Gradient: () => Gradient,
  LinkPreview: () => LinkPreview,
  LinkPreviewJustUrl: () => LinkPreviewJustUrl,
  LinkPreviewJustUrlText: () => LinkPreviewJustUrlText,
  LinkPreviewLongTitle: () => LinkPreviewLongTitle,
  LinkPreviewReallyLongDomain: () => LinkPreviewReallyLongDomain,
  LinkPreviewThumbnail: () => LinkPreviewThumbnail,
  LinkPreviewWRJ: () => LinkPreviewWRJ,
  MixOfNewlinesOverflowAutowrap: () => MixOfNewlinesOverflowAutowrap,
  OverflowNewlineNumbers: () => OverflowNewlineNumbers,
  RomeoJuliet: () => RomeoJuliet,
  SolidBgTextBg: () => SolidBgTextBg,
  TextWithLineBreaksAutowrapSerifFont: () => TextWithLineBreaksAutowrapSerifFont,
  TextWithLineBreaksCondensedFont: () => TextWithLineBreaksCondensedFont,
  default: () => TextAttachment_stories_default
});
module.exports = __toCommonJS(TextAttachment_stories_exports);
var import_react = __toESM(require("react"));
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
var import_TextAttachment = require("./TextAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  i18n,
  textAttachment: {}
}), "getDefaultProps");
var TextAttachment_stories_default = {
  title: "Components/TextAttachment"
};
const SolidBgTextBg = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4286869806,
    text: "hello",
    textBackgroundColor: 4293263387,
    textForegroundColor: 4294967295,
    textStyle: 1
  }
}), "SolidBgTextBg");
SolidBgTextBg.story = {
  name: "Solid bg + text bg"
};
const Gradient = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    gradient: {
      angle: 191,
      endColor: 4282529679,
      startColor: 4294260804
    },
    text: "hey",
    textBackgroundColor: 0,
    textForegroundColor: 4294704123,
    textStyle: 1
  }
}), "Gradient");
const TextWithLineBreaksCondensedFont = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    gradient: {
      angle: 180,
      endColor: 4278884698,
      startColor: 4284861868
    },
    text: "Wow!\nThis is 2 lines!",
    textBackgroundColor: 4294967295,
    textForegroundColor: 4278249127,
    textStyle: 5
  }
}), "TextWithLineBreaksCondensedFont");
TextWithLineBreaksCondensedFont.story = {
  name: "Text with line breaks (condensed font)"
};
const TextWithLineBreaksAutowrapSerifFont = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4278249127,
    text: "Wrap?\nYes please, wrap this text automatically for me so that it fits nicely inside the story.",
    textBackgroundColor: 0,
    textForegroundColor: 4294967295,
    textStyle: 3
  }
}), "TextWithLineBreaksAutowrapSerifFont");
TextWithLineBreaksAutowrapSerifFont.story = {
  name: "Text with line breaks + Autowrap (serif font)"
};
const AutowrapText = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    gradient: {
      angle: 175,
      endColor: 4294859832,
      startColor: 4294950980
    },
    text: "This text should automatically wrap into multiple lines since it exceeds the bounds of the story",
    textBackgroundColor: 4294967295,
    textForegroundColor: 4278249037,
    textStyle: 1
  }
}), "AutowrapText");
AutowrapText.story = {
  name: "Autowrap text"
};
const RomeoJuliet = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    gradient: {
      angle: 180,
      endColor: 4286632135,
      startColor: 4278227945
    },
    text: "Two households, both alike in dignity, In fair Verona, where we lay our scene, From ancient grudge break to new mutiny, Where civil blood makes civil hands unclean. From forth the fatal loins of these two foes A pair of star-cross'd lovers take their life; Whose misadventured piteous overthrows Do with their death bury their parents' strife. The fearful passage of their death-mark'd love, And the continuance of their parents' rage, Which, but their children's end, nought could remove, Is now the two hours' traffic of our stage; The which if you with patient ears attend, What here shall miss, our toil shall strive to mend.",
    textBackgroundColor: 0,
    textForegroundColor: 4294704123,
    textStyle: 4
  }
}), "RomeoJuliet");
RomeoJuliet.story = {
  name: "Romeo & Juliet"
};
const OverflowNewlineNumbers = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    gradient: {
      angle: 175,
      endColor: 4294859832,
      startColor: 4294950980
    },
    text: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16",
    textBackgroundColor: 4294967295,
    textForegroundColor: 4278249037,
    textStyle: 1
  }
}), "OverflowNewlineNumbers");
OverflowNewlineNumbers.story = {
  name: "Overflow newline numbers"
};
const CharacterWrapBold = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4278825851,
    text: "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    textBackgroundColor: 0,
    textForegroundColor: 4294704123,
    textStyle: 2
  }
}), "CharacterWrapBold");
CharacterWrapBold.story = {
  name: "Character wrap (bold)"
};
const MixOfNewlinesOverflowAutowrap = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4294951251,
    text: "A new line\nIs this a new line? Yes, indeed and I should be wrapped woooooooooooooooooooooooow this is working!\nCool.",
    textBackgroundColor: 0,
    textForegroundColor: 4278231014,
    textStyle: 1
  }
}), "MixOfNewlinesOverflowAutowrap");
MixOfNewlinesOverflowAutowrap.story = {
  name: "Mix of newlines, overflow, autowrap"
};
const LinkPreview = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4294951251,
    preview: {
      url: "https://www.signal.org/workworkwork",
      title: "Signal >> Careers"
    }
  }
}), "LinkPreview");
LinkPreview.story = {
  name: "Link preview"
};
const LinkPreviewThumbnail = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  isThumbnail: true,
  textAttachment: {
    color: 4294951251,
    preview: {
      url: "https://www.signal.org/workworkwork",
      title: "Signal >> Careers"
    }
  }
}), "LinkPreviewThumbnail");
LinkPreviewThumbnail.story = {
  name: "Link preview (thumbnail)"
};
const LinkPreviewLongTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4294951251,
    preview: {
      title: "2021 Etihad Airways Abu Dhabi Grand Prix Race Summary - F1 RaceCast Dec 10 to Dec 12 - ESPN",
      url: "https://www.espn.com/f1/race/_/id/600001776"
    },
    text: "Spoiler alert!",
    textForegroundColor: 4294704123
  }
}), "LinkPreviewLongTitle");
LinkPreviewLongTitle.story = {
  name: "Link preview (long title)"
};
const LinkPreviewJustUrl = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4294951251,
    preview: {
      url: "https://www.rolex.com/en-us/watches/day-date/m228236-0012.html"
    }
  }
}), "LinkPreviewJustUrl");
LinkPreviewJustUrl.story = {
  name: "Link preview (just url)"
};
const LinkPreviewJustUrlText = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4294951251,
    preview: {
      url: "https://www.rolex.com/en-us/watches/day-date/m228236-0012.html"
    },
    text: "Check this out!"
  }
}), "LinkPreviewJustUrlText");
LinkPreviewJustUrlText.story = {
  name: "Link preview (just url + text)"
};
const LinkPreviewReallyLongDomain = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    color: 4294951251,
    preview: {
      url: "https://llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.international/"
    }
  }
}), "LinkPreviewReallyLongDomain");
LinkPreviewReallyLongDomain.story = {
  name: "Link preview (really long domain)"
};
const LinkPreviewWRJ = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
  ...getDefaultProps(),
  textAttachment: {
    gradient: {
      angle: 180,
      endColor: 4286632135,
      startColor: 4278227945
    },
    text: "Two households, both alike in dignity, In fair Verona, where we lay our scene, From ancient grudge break to new mutiny, Where civil blood makes civil hands unclean. From forth the fatal loins of these two foes A pair of star-cross'd lovers take their life; Whose misadventured piteous overthrows Do with their death bury their parents' strife. The fearful passage of their death-mark'd love, And the continuance of their parents' rage, Which, but their children's end, nought could remove, Is now the two hours' traffic of our stage; The which if you with patient ears attend, What here shall miss, our toil shall strive to mend.",
    textBackgroundColor: 0,
    textForegroundColor: 4294704123,
    textStyle: 4,
    preview: {
      title: "Romeo and Juliet: Entire Play",
      url: "http://shakespeare.mit.edu/romeo_juliet/full.html"
    }
  }
}), "LinkPreviewWRJ");
LinkPreviewWRJ.story = {
  name: "Link Preview w/ R&J"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutowrapText,
  CharacterWrapBold,
  Gradient,
  LinkPreview,
  LinkPreviewJustUrl,
  LinkPreviewJustUrlText,
  LinkPreviewLongTitle,
  LinkPreviewReallyLongDomain,
  LinkPreviewThumbnail,
  LinkPreviewWRJ,
  MixOfNewlinesOverflowAutowrap,
  OverflowNewlineNumbers,
  RomeoJuliet,
  SolidBgTextBg,
  TextWithLineBreaksAutowrapSerifFont,
  TextWithLineBreaksCondensedFont
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGV4dEF0dGFjaG1lbnQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgeyBUZXh0QXR0YWNobWVudCB9IGZyb20gJy4vVGV4dEF0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1RleHRBdHRhY2htZW50JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZ2V0RGVmYXVsdFByb3BzID0gKCk6IFByb3BzVHlwZSA9PiAoe1xuICBpMThuLFxuICB0ZXh0QXR0YWNobWVudDoge30sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvVGV4dEF0dGFjaG1lbnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFNvbGlkQmdUZXh0QmcgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgdGV4dEF0dGFjaG1lbnQ9e3tcbiAgICAgIGNvbG9yOiA0Mjg2ODY5ODA2LFxuICAgICAgdGV4dDogJ2hlbGxvJyxcbiAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3I6IDQyOTMyNjMzODcsXG4gICAgICB0ZXh0Rm9yZWdyb3VuZENvbG9yOiA0Mjk0OTY3Mjk1LFxuICAgICAgdGV4dFN0eWxlOiAxLFxuICAgIH19XG4gIC8+XG4pO1xuXG5Tb2xpZEJnVGV4dEJnLnN0b3J5ID0ge1xuICBuYW1lOiAnU29saWQgYmcgKyB0ZXh0IGJnJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcmFkaWVudCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgZ3JhZGllbnQ6IHtcbiAgICAgICAgYW5nbGU6IDE5MSxcbiAgICAgICAgZW5kQ29sb3I6IDQyODI1Mjk2NzksXG4gICAgICAgIHN0YXJ0Q29sb3I6IDQyOTQyNjA4MDQsXG4gICAgICB9LFxuICAgICAgdGV4dDogJ2hleScsXG4gICAgICB0ZXh0QmFja2dyb3VuZENvbG9yOiAwLFxuICAgICAgdGV4dEZvcmVncm91bmRDb2xvcjogNDI5NDcwNDEyMyxcbiAgICAgIHRleHRTdHlsZTogMSxcbiAgICB9fVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFRleHRXaXRoTGluZUJyZWFrc0NvbmRlbnNlZEZvbnQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgdGV4dEF0dGFjaG1lbnQ9e3tcbiAgICAgIGdyYWRpZW50OiB7XG4gICAgICAgIGFuZ2xlOiAxODAsXG4gICAgICAgIGVuZENvbG9yOiA0Mjc4ODg0Njk4LFxuICAgICAgICBzdGFydENvbG9yOiA0Mjg0ODYxODY4LFxuICAgICAgfSxcbiAgICAgIHRleHQ6ICdXb3chXFxuVGhpcyBpcyAyIGxpbmVzIScsXG4gICAgICB0ZXh0QmFja2dyb3VuZENvbG9yOiA0Mjk0OTY3Mjk1LFxuICAgICAgdGV4dEZvcmVncm91bmRDb2xvcjogNDI3ODI0OTEyNyxcbiAgICAgIHRleHRTdHlsZTogNSxcbiAgICB9fVxuICAvPlxuKTtcblxuVGV4dFdpdGhMaW5lQnJlYWtzQ29uZGVuc2VkRm9udC5zdG9yeSA9IHtcbiAgbmFtZTogJ1RleHQgd2l0aCBsaW5lIGJyZWFrcyAoY29uZGVuc2VkIGZvbnQpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUZXh0V2l0aExpbmVCcmVha3NBdXRvd3JhcFNlcmlmRm9udCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgY29sb3I6IDQyNzgyNDkxMjcsXG4gICAgICB0ZXh0OiAnV3JhcD9cXG5ZZXMgcGxlYXNlLCB3cmFwIHRoaXMgdGV4dCBhdXRvbWF0aWNhbGx5IGZvciBtZSBzbyB0aGF0IGl0IGZpdHMgbmljZWx5IGluc2lkZSB0aGUgc3RvcnkuJyxcbiAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3I6IDAsXG4gICAgICB0ZXh0Rm9yZWdyb3VuZENvbG9yOiA0Mjk0OTY3Mjk1LFxuICAgICAgdGV4dFN0eWxlOiAzLFxuICAgIH19XG4gIC8+XG4pO1xuXG5UZXh0V2l0aExpbmVCcmVha3NBdXRvd3JhcFNlcmlmRm9udC5zdG9yeSA9IHtcbiAgbmFtZTogJ1RleHQgd2l0aCBsaW5lIGJyZWFrcyArIEF1dG93cmFwIChzZXJpZiBmb250KScsXG59O1xuXG5leHBvcnQgY29uc3QgQXV0b3dyYXBUZXh0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRleHRBdHRhY2htZW50XG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIHRleHRBdHRhY2htZW50PXt7XG4gICAgICBncmFkaWVudDoge1xuICAgICAgICBhbmdsZTogMTc1LFxuICAgICAgICBlbmRDb2xvcjogNDI5NDg1OTgzMixcbiAgICAgICAgc3RhcnRDb2xvcjogNDI5NDk1MDk4MCxcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnVGhpcyB0ZXh0IHNob3VsZCBhdXRvbWF0aWNhbGx5IHdyYXAgaW50byBtdWx0aXBsZSBsaW5lcyBzaW5jZSBpdCBleGNlZWRzIHRoZSBib3VuZHMgb2YgdGhlIHN0b3J5JyxcbiAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3I6IDQyOTQ5NjcyOTUsXG4gICAgICB0ZXh0Rm9yZWdyb3VuZENvbG9yOiA0Mjc4MjQ5MDM3LFxuICAgICAgdGV4dFN0eWxlOiAxLFxuICAgIH19XG4gIC8+XG4pO1xuXG5BdXRvd3JhcFRleHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdBdXRvd3JhcCB0ZXh0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBSb21lb0p1bGlldCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgZ3JhZGllbnQ6IHtcbiAgICAgICAgYW5nbGU6IDE4MCxcbiAgICAgICAgZW5kQ29sb3I6IDQyODY2MzIxMzUsXG4gICAgICAgIHN0YXJ0Q29sb3I6IDQyNzgyMjc5NDUsXG4gICAgICB9LFxuICAgICAgdGV4dDogXCJUd28gaG91c2Vob2xkcywgYm90aCBhbGlrZSBpbiBkaWduaXR5LCBJbiBmYWlyIFZlcm9uYSwgd2hlcmUgd2UgbGF5IG91ciBzY2VuZSwgRnJvbSBhbmNpZW50IGdydWRnZSBicmVhayB0byBuZXcgbXV0aW55LCBXaGVyZSBjaXZpbCBibG9vZCBtYWtlcyBjaXZpbCBoYW5kcyB1bmNsZWFuLiBGcm9tIGZvcnRoIHRoZSBmYXRhbCBsb2lucyBvZiB0aGVzZSB0d28gZm9lcyBBIHBhaXIgb2Ygc3Rhci1jcm9zcydkIGxvdmVycyB0YWtlIHRoZWlyIGxpZmU7IFdob3NlIG1pc2FkdmVudHVyZWQgcGl0ZW91cyBvdmVydGhyb3dzIERvIHdpdGggdGhlaXIgZGVhdGggYnVyeSB0aGVpciBwYXJlbnRzJyBzdHJpZmUuIFRoZSBmZWFyZnVsIHBhc3NhZ2Ugb2YgdGhlaXIgZGVhdGgtbWFyaydkIGxvdmUsIEFuZCB0aGUgY29udGludWFuY2Ugb2YgdGhlaXIgcGFyZW50cycgcmFnZSwgV2hpY2gsIGJ1dCB0aGVpciBjaGlsZHJlbidzIGVuZCwgbm91Z2h0IGNvdWxkIHJlbW92ZSwgSXMgbm93IHRoZSB0d28gaG91cnMnIHRyYWZmaWMgb2Ygb3VyIHN0YWdlOyBUaGUgd2hpY2ggaWYgeW91IHdpdGggcGF0aWVudCBlYXJzIGF0dGVuZCwgV2hhdCBoZXJlIHNoYWxsIG1pc3MsIG91ciB0b2lsIHNoYWxsIHN0cml2ZSB0byBtZW5kLlwiLFxuICAgICAgdGV4dEJhY2tncm91bmRDb2xvcjogMCxcbiAgICAgIHRleHRGb3JlZ3JvdW5kQ29sb3I6IDQyOTQ3MDQxMjMsXG4gICAgICB0ZXh0U3R5bGU6IDQsXG4gICAgfX1cbiAgLz5cbik7XG5cblJvbWVvSnVsaWV0LnN0b3J5ID0ge1xuICBuYW1lOiAnUm9tZW8gJiBKdWxpZXQnLFxufTtcblxuZXhwb3J0IGNvbnN0IE92ZXJmbG93TmV3bGluZU51bWJlcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgdGV4dEF0dGFjaG1lbnQ9e3tcbiAgICAgIGdyYWRpZW50OiB7XG4gICAgICAgIGFuZ2xlOiAxNzUsXG4gICAgICAgIGVuZENvbG9yOiA0Mjk0ODU5ODMyLFxuICAgICAgICBzdGFydENvbG9yOiA0Mjk0OTUwOTgwLFxuICAgICAgfSxcbiAgICAgIHRleHQ6ICcxXFxuMlxcbjNcXG40XFxuNVxcbjZcXG43XFxuOFxcbjlcXG4xMFxcbjExXFxuMTJcXG4xM1xcbjE0XFxuMTVcXG4xNicsXG4gICAgICB0ZXh0QmFja2dyb3VuZENvbG9yOiA0Mjk0OTY3Mjk1LFxuICAgICAgdGV4dEZvcmVncm91bmRDb2xvcjogNDI3ODI0OTAzNyxcbiAgICAgIHRleHRTdHlsZTogMSxcbiAgICB9fVxuICAvPlxuKTtcblxuT3ZlcmZsb3dOZXdsaW5lTnVtYmVycy5zdG9yeSA9IHtcbiAgbmFtZTogJ092ZXJmbG93IG5ld2xpbmUgbnVtYmVycycsXG59O1xuXG5leHBvcnQgY29uc3QgQ2hhcmFjdGVyV3JhcEJvbGQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgdGV4dEF0dGFjaG1lbnQ9e3tcbiAgICAgIGNvbG9yOiA0Mjc4ODI1ODUxLFxuICAgICAgdGV4dDogJ21tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW0nLFxuICAgICAgdGV4dEJhY2tncm91bmRDb2xvcjogMCxcbiAgICAgIHRleHRGb3JlZ3JvdW5kQ29sb3I6IDQyOTQ3MDQxMjMsXG4gICAgICB0ZXh0U3R5bGU6IDIsXG4gICAgfX1cbiAgLz5cbik7XG5cbkNoYXJhY3RlcldyYXBCb2xkLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2hhcmFjdGVyIHdyYXAgKGJvbGQpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBNaXhPZk5ld2xpbmVzT3ZlcmZsb3dBdXRvd3JhcCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgY29sb3I6IDQyOTQ5NTEyNTEsXG4gICAgICB0ZXh0OiAnQSBuZXcgbGluZVxcbklzIHRoaXMgYSBuZXcgbGluZT8gWWVzLCBpbmRlZWQgYW5kIEkgc2hvdWxkIGJlIHdyYXBwZWQgd29vb29vb29vb29vb29vb29vb29vb29vb3cgdGhpcyBpcyB3b3JraW5nIVxcbkNvb2wuJyxcbiAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3I6IDAsXG4gICAgICB0ZXh0Rm9yZWdyb3VuZENvbG9yOiA0Mjc4MjMxMDE0LFxuICAgICAgdGV4dFN0eWxlOiAxLFxuICAgIH19XG4gIC8+XG4pO1xuXG5NaXhPZk5ld2xpbmVzT3ZlcmZsb3dBdXRvd3JhcC5zdG9yeSA9IHtcbiAgbmFtZTogJ01peCBvZiBuZXdsaW5lcywgb3ZlcmZsb3csIGF1dG93cmFwJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlldyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgY29sb3I6IDQyOTQ5NTEyNTEsXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnNpZ25hbC5vcmcvd29ya3dvcmt3b3JrJyxcbiAgICAgICAgdGl0bGU6ICdTaWduYWwgPj4gQ2FyZWVycycsXG4gICAgICB9LFxuICAgIH19XG4gIC8+XG4pO1xuXG5MaW5rUHJldmlldy5zdG9yeSA9IHtcbiAgbmFtZTogJ0xpbmsgcHJldmlldycsXG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdUaHVtYm5haWwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgaXNUaHVtYm5haWxcbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgY29sb3I6IDQyOTQ5NTEyNTEsXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnNpZ25hbC5vcmcvd29ya3dvcmt3b3JrJyxcbiAgICAgICAgdGl0bGU6ICdTaWduYWwgPj4gQ2FyZWVycycsXG4gICAgICB9LFxuICAgIH19XG4gIC8+XG4pO1xuXG5MaW5rUHJldmlld1RodW1ibmFpbC5zdG9yeSA9IHtcbiAgbmFtZTogJ0xpbmsgcHJldmlldyAodGh1bWJuYWlsKScsXG59O1xuXG5leHBvcnQgY29uc3QgTGlua1ByZXZpZXdMb25nVGl0bGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgdGV4dEF0dGFjaG1lbnQ9e3tcbiAgICAgIGNvbG9yOiA0Mjk0OTUxMjUxLFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0aXRsZTpcbiAgICAgICAgICAnMjAyMSBFdGloYWQgQWlyd2F5cyBBYnUgRGhhYmkgR3JhbmQgUHJpeCBSYWNlIFN1bW1hcnkgLSBGMSBSYWNlQ2FzdCBEZWMgMTAgdG8gRGVjIDEyIC0gRVNQTicsXG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmVzcG4uY29tL2YxL3JhY2UvXy9pZC82MDAwMDE3NzYnLFxuICAgICAgfSxcbiAgICAgIHRleHQ6ICdTcG9pbGVyIGFsZXJ0IScsXG4gICAgICB0ZXh0Rm9yZWdyb3VuZENvbG9yOiA0Mjk0NzA0MTIzLFxuICAgIH19XG4gIC8+XG4pO1xuXG5MaW5rUHJldmlld0xvbmdUaXRsZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0xpbmsgcHJldmlldyAobG9uZyB0aXRsZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtQcmV2aWV3SnVzdFVybCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgY29sb3I6IDQyOTQ5NTEyNTEsXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnJvbGV4LmNvbS9lbi11cy93YXRjaGVzL2RheS1kYXRlL20yMjgyMzYtMDAxMi5odG1sJyxcbiAgICAgIH0sXG4gICAgfX1cbiAgLz5cbik7XG5cbkxpbmtQcmV2aWV3SnVzdFVybC5zdG9yeSA9IHtcbiAgbmFtZTogJ0xpbmsgcHJldmlldyAoanVzdCB1cmwpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlld0p1c3RVcmxUZXh0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRleHRBdHRhY2htZW50XG4gICAgey4uLmdldERlZmF1bHRQcm9wcygpfVxuICAgIHRleHRBdHRhY2htZW50PXt7XG4gICAgICBjb2xvcjogNDI5NDk1MTI1MSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cucm9sZXguY29tL2VuLXVzL3dhdGNoZXMvZGF5LWRhdGUvbTIyODIzNi0wMDEyLmh0bWwnLFxuICAgICAgfSxcbiAgICAgIHRleHQ6ICdDaGVjayB0aGlzIG91dCEnLFxuICAgIH19XG4gIC8+XG4pO1xuXG5MaW5rUHJldmlld0p1c3RVcmxUZXh0LnN0b3J5ID0ge1xuICBuYW1lOiAnTGluayBwcmV2aWV3IChqdXN0IHVybCArIHRleHQpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlld1JlYWxseUxvbmdEb21haW4gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VGV4dEF0dGFjaG1lbnRcbiAgICB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9XG4gICAgdGV4dEF0dGFjaG1lbnQ9e3tcbiAgICAgIGNvbG9yOiA0Mjk0OTUxMjUxLFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB1cmw6ICdodHRwczovL2xsYW5mYWlycHdsbGd3eW5neWxsZ29nZXJ5Y2h3eXJuZHJvYndsbGxsYW50eXNpbGlvZ29nb2dvY2guaW50ZXJuYXRpb25hbC8nLFxuICAgICAgfSxcbiAgICB9fVxuICAvPlxuKTtcblxuTGlua1ByZXZpZXdSZWFsbHlMb25nRG9tYWluLnN0b3J5ID0ge1xuICBuYW1lOiAnTGluayBwcmV2aWV3IChyZWFsbHkgbG9uZyBkb21haW4pJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rUHJldmlld1dSSiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUZXh0QXR0YWNobWVudFxuICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgZ3JhZGllbnQ6IHtcbiAgICAgICAgYW5nbGU6IDE4MCxcbiAgICAgICAgZW5kQ29sb3I6IDQyODY2MzIxMzUsXG4gICAgICAgIHN0YXJ0Q29sb3I6IDQyNzgyMjc5NDUsXG4gICAgICB9LFxuICAgICAgdGV4dDogXCJUd28gaG91c2Vob2xkcywgYm90aCBhbGlrZSBpbiBkaWduaXR5LCBJbiBmYWlyIFZlcm9uYSwgd2hlcmUgd2UgbGF5IG91ciBzY2VuZSwgRnJvbSBhbmNpZW50IGdydWRnZSBicmVhayB0byBuZXcgbXV0aW55LCBXaGVyZSBjaXZpbCBibG9vZCBtYWtlcyBjaXZpbCBoYW5kcyB1bmNsZWFuLiBGcm9tIGZvcnRoIHRoZSBmYXRhbCBsb2lucyBvZiB0aGVzZSB0d28gZm9lcyBBIHBhaXIgb2Ygc3Rhci1jcm9zcydkIGxvdmVycyB0YWtlIHRoZWlyIGxpZmU7IFdob3NlIG1pc2FkdmVudHVyZWQgcGl0ZW91cyBvdmVydGhyb3dzIERvIHdpdGggdGhlaXIgZGVhdGggYnVyeSB0aGVpciBwYXJlbnRzJyBzdHJpZmUuIFRoZSBmZWFyZnVsIHBhc3NhZ2Ugb2YgdGhlaXIgZGVhdGgtbWFyaydkIGxvdmUsIEFuZCB0aGUgY29udGludWFuY2Ugb2YgdGhlaXIgcGFyZW50cycgcmFnZSwgV2hpY2gsIGJ1dCB0aGVpciBjaGlsZHJlbidzIGVuZCwgbm91Z2h0IGNvdWxkIHJlbW92ZSwgSXMgbm93IHRoZSB0d28gaG91cnMnIHRyYWZmaWMgb2Ygb3VyIHN0YWdlOyBUaGUgd2hpY2ggaWYgeW91IHdpdGggcGF0aWVudCBlYXJzIGF0dGVuZCwgV2hhdCBoZXJlIHNoYWxsIG1pc3MsIG91ciB0b2lsIHNoYWxsIHN0cml2ZSB0byBtZW5kLlwiLFxuICAgICAgdGV4dEJhY2tncm91bmRDb2xvcjogMCxcbiAgICAgIHRleHRGb3JlZ3JvdW5kQ29sb3I6IDQyOTQ3MDQxMjMsXG4gICAgICB0ZXh0U3R5bGU6IDQsXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHRpdGxlOiAnUm9tZW8gYW5kIEp1bGlldDogRW50aXJlIFBsYXknLFxuICAgICAgICB1cmw6ICdodHRwOi8vc2hha2VzcGVhcmUubWl0LmVkdS9yb21lb19qdWxpZXQvZnVsbC5odG1sJyxcbiAgICAgIH0sXG4gICAgfX1cbiAgLz5cbik7XG5cbkxpbmtQcmV2aWV3V1JKLnN0b3J5ID0ge1xuICBuYW1lOiAnTGluayBQcmV2aWV3IHcvIFImSicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7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
