var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getFontNameByTextScript_exports = {};
__export(getFontNameByTextScript_exports, {
  fontSniffer: () => fontSniffer,
  getFontNameByTextScript: () => getFontNameByTextScript
});
module.exports = __toCommonJS(getFontNameByTextScript_exports);
var import_assert = require("./assert");
const FONT_MAP = {
  base: [
    "sans-serif",
    "sans-serif",
    "sans-serif",
    "serif",
    "serif",
    "sans-serif"
  ],
  latin: [
    "Inter",
    "Inter",
    "Inter",
    '"EB Garamond"',
    "Parisienne",
    '"Barlow Condensed"'
  ],
  cyrillic: [
    "Inter",
    "Inter",
    "Inter",
    '"EB Garamond"',
    '"American Typewriter Semibold", "Cambria Bold"',
    '"SF Pro Light (System Light)", "Calibri Light"'
  ],
  devanagari: [
    '"Kohinoor Devanagari Regular", "Utsaah Regular"',
    '"Kohinoor Devanagari Regular", "Utsaah Regular"',
    '"Kohinoor Devanagari Semibold", "Utsaah Bold"',
    '"Devanagari Sangam MN Regular", "Kokila Regular"',
    '"Devanagari Sangam MN Bold", "Kokila Bold"',
    '"Kohinoor Devanagari Light", "Utsaah Regular"'
  ],
  arabic: [
    '"SF Arabic Regular", "Segoe UI Arabic Regular"',
    '"SF Arabic Regular", "Segoe UI Arabic Regular"',
    '"SF Arabic Bold", "Segoe UI Arabic Bold"',
    '"Geeza Pro Regular", "Sakkal Majalla Regular"',
    '"Geeza Pro Bold", "Sakkal Majalla Bold"',
    '"SF Arabic Black", "Segoe UI Arabic Bold"'
  ],
  japanese: [
    '"Hiragino Sans W3"',
    '"Hiragino Sans W3"',
    '"Hiragino Sans W7"',
    '"Hiragino Mincho Pro W3"',
    '"Hiragino Mincho Pro W6"',
    '"Hiragino Maru Gothic Pro N"'
  ],
  zhhk: [
    '"PingFang HK Regular", "MingLiU Regular"',
    '"PingFang HK Regular", "MingLiU Regular"',
    '"PingFang HK Semibold", "MingLiU Regular"',
    '"PingFang HK Ultralight", "MingLiU Regular"',
    '"PingFang HK Thin", "MingLiU Regular"',
    '"PingFang HK Light", "MingLiU Regular"'
  ],
  zhtc: [
    '"PingFang TC Regular", "JhengHei TC Regular"',
    '"PingFang TC Regular", "JhengHei TC Regular"',
    '"PingFang TC Semibold", "JhengHei TC Bold"',
    '"PingFang TC Ultralight", "JhengHei TC Light"',
    '"PingFang TC Thin", "JhengHei TC Regular"',
    '"PingFang TC Light", "JhengHei TC Bold"'
  ],
  zhsc: [
    '"PingFang SC Regular", SimHei',
    '"PingFang SC Regular", SimHei',
    '"PingFang SC Semibold", SimHei',
    '"PingFang SC Ultralight", SimHei',
    '"PingFang SC Thin", SimHei',
    '"PingFang SC Light", SimHei'
  ]
};
const rxArabic = /\p{Script=Arab}/u;
const rxCJK = /\p{Script=Han}/u;
const rxCyrillic = /\p{Script=Cyrl}/u;
const rxDevanagari = /\p{Script=Deva}/u;
const rxJapanese = /\p{Script=Hira}|\p{Script=Kana}/u;
const rxLatin = /\p{Script=Latn}/u;
const fontSniffer = {
  hasArabic(text) {
    return rxArabic.test(text);
  },
  hasCJK(text) {
    return rxCJK.test(text);
  },
  hasCyrillic(text) {
    return rxCyrillic.test(text);
  },
  hasDevanagari(text) {
    return rxDevanagari.test(text);
  },
  hasJapanese(text) {
    return rxJapanese.test(text);
  },
  hasLatin(text) {
    return rxLatin.test(text);
  }
};
function getFontNameByTextScript(text, textStyleIndex, i18n) {
  (0, import_assert.strictAssert)(textStyleIndex >= 0 && textStyleIndex <= 5, "text style is not between 0-5");
  const fonts = [FONT_MAP.base[textStyleIndex]];
  if (fontSniffer.hasArabic(text)) {
    fonts.push(FONT_MAP.arabic[textStyleIndex]);
  }
  if (fontSniffer.hasCJK(text)) {
    const locale = i18n?.getLocale();
    if (locale === "zh_TW") {
      fonts.push(FONT_MAP.zhtc[textStyleIndex]);
    } else if (locale === "zh_HK") {
      fonts.push(FONT_MAP.zhhk[textStyleIndex]);
    } else {
      fonts.push(FONT_MAP.zhsc[textStyleIndex]);
    }
  }
  if (fontSniffer.hasCyrillic(text)) {
    fonts.push(FONT_MAP.cyrillic[textStyleIndex]);
  }
  if (fontSniffer.hasDevanagari(text)) {
    fonts.push(FONT_MAP.devanagari[textStyleIndex]);
  }
  if (fontSniffer.hasJapanese(text)) {
    fonts.push(FONT_MAP.japanese[textStyleIndex]);
  }
  if (fontSniffer.hasLatin(text)) {
    fonts.push(FONT_MAP.latin[textStyleIndex]);
  }
  return fonts.reverse().join(", ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fontSniffer,
  getFontNameByTextScript
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Rm9udE5hbWVCeVRleHRTY3JpcHQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuL2Fzc2VydCc7XG5cbmNvbnN0IEZPTlRfTUFQID0ge1xuICBiYXNlOiBbXG4gICAgJ3NhbnMtc2VyaWYnLFxuICAgICdzYW5zLXNlcmlmJyxcbiAgICAnc2Fucy1zZXJpZicsXG4gICAgJ3NlcmlmJyxcbiAgICAnc2VyaWYnLFxuICAgICdzYW5zLXNlcmlmJyxcbiAgXSxcbiAgbGF0aW46IFtcbiAgICAnSW50ZXInLFxuICAgICdJbnRlcicsXG4gICAgJ0ludGVyJyxcbiAgICAnXCJFQiBHYXJhbW9uZFwiJyxcbiAgICAnUGFyaXNpZW5uZScsXG4gICAgJ1wiQmFybG93IENvbmRlbnNlZFwiJyxcbiAgXSxcbiAgY3lyaWxsaWM6IFtcbiAgICAnSW50ZXInLFxuICAgICdJbnRlcicsXG4gICAgJ0ludGVyJyxcbiAgICAnXCJFQiBHYXJhbW9uZFwiJyxcbiAgICAnXCJBbWVyaWNhbiBUeXBld3JpdGVyIFNlbWlib2xkXCIsIFwiQ2FtYnJpYSBCb2xkXCInLFxuICAgICdcIlNGIFBybyBMaWdodCAoU3lzdGVtIExpZ2h0KVwiLCBcIkNhbGlicmkgTGlnaHRcIicsXG4gIF0sXG4gIGRldmFuYWdhcmk6IFtcbiAgICAnXCJLb2hpbm9vciBEZXZhbmFnYXJpIFJlZ3VsYXJcIiwgXCJVdHNhYWggUmVndWxhclwiJyxcbiAgICAnXCJLb2hpbm9vciBEZXZhbmFnYXJpIFJlZ3VsYXJcIiwgXCJVdHNhYWggUmVndWxhclwiJyxcbiAgICAnXCJLb2hpbm9vciBEZXZhbmFnYXJpIFNlbWlib2xkXCIsIFwiVXRzYWFoIEJvbGRcIicsXG4gICAgJ1wiRGV2YW5hZ2FyaSBTYW5nYW0gTU4gUmVndWxhclwiLCBcIktva2lsYSBSZWd1bGFyXCInLFxuICAgICdcIkRldmFuYWdhcmkgU2FuZ2FtIE1OIEJvbGRcIiwgXCJLb2tpbGEgQm9sZFwiJyxcbiAgICAnXCJLb2hpbm9vciBEZXZhbmFnYXJpIExpZ2h0XCIsIFwiVXRzYWFoIFJlZ3VsYXJcIicsXG4gIF0sXG4gIGFyYWJpYzogW1xuICAgICdcIlNGIEFyYWJpYyBSZWd1bGFyXCIsIFwiU2Vnb2UgVUkgQXJhYmljIFJlZ3VsYXJcIicsXG4gICAgJ1wiU0YgQXJhYmljIFJlZ3VsYXJcIiwgXCJTZWdvZSBVSSBBcmFiaWMgUmVndWxhclwiJyxcbiAgICAnXCJTRiBBcmFiaWMgQm9sZFwiLCBcIlNlZ29lIFVJIEFyYWJpYyBCb2xkXCInLFxuICAgICdcIkdlZXphIFBybyBSZWd1bGFyXCIsIFwiU2Fra2FsIE1hamFsbGEgUmVndWxhclwiJyxcbiAgICAnXCJHZWV6YSBQcm8gQm9sZFwiLCBcIlNha2thbCBNYWphbGxhIEJvbGRcIicsXG4gICAgJ1wiU0YgQXJhYmljIEJsYWNrXCIsIFwiU2Vnb2UgVUkgQXJhYmljIEJvbGRcIicsXG4gIF0sXG4gIGphcGFuZXNlOiBbXG4gICAgJ1wiSGlyYWdpbm8gU2FucyBXM1wiJyxcbiAgICAnXCJIaXJhZ2lubyBTYW5zIFczXCInLFxuICAgICdcIkhpcmFnaW5vIFNhbnMgVzdcIicsXG4gICAgJ1wiSGlyYWdpbm8gTWluY2hvIFBybyBXM1wiJyxcbiAgICAnXCJIaXJhZ2lubyBNaW5jaG8gUHJvIFc2XCInLFxuICAgICdcIkhpcmFnaW5vIE1hcnUgR290aGljIFBybyBOXCInLFxuICBdLFxuICB6aGhrOiBbXG4gICAgJ1wiUGluZ0ZhbmcgSEsgUmVndWxhclwiLCBcIk1pbmdMaVUgUmVndWxhclwiJyxcbiAgICAnXCJQaW5nRmFuZyBISyBSZWd1bGFyXCIsIFwiTWluZ0xpVSBSZWd1bGFyXCInLFxuICAgICdcIlBpbmdGYW5nIEhLIFNlbWlib2xkXCIsIFwiTWluZ0xpVSBSZWd1bGFyXCInLFxuICAgICdcIlBpbmdGYW5nIEhLIFVsdHJhbGlnaHRcIiwgXCJNaW5nTGlVIFJlZ3VsYXJcIicsXG4gICAgJ1wiUGluZ0ZhbmcgSEsgVGhpblwiLCBcIk1pbmdMaVUgUmVndWxhclwiJyxcbiAgICAnXCJQaW5nRmFuZyBISyBMaWdodFwiLCBcIk1pbmdMaVUgUmVndWxhclwiJyxcbiAgXSxcbiAgemh0YzogW1xuICAgICdcIlBpbmdGYW5nIFRDIFJlZ3VsYXJcIiwgXCJKaGVuZ0hlaSBUQyBSZWd1bGFyXCInLFxuICAgICdcIlBpbmdGYW5nIFRDIFJlZ3VsYXJcIiwgXCJKaGVuZ0hlaSBUQyBSZWd1bGFyXCInLFxuICAgICdcIlBpbmdGYW5nIFRDIFNlbWlib2xkXCIsIFwiSmhlbmdIZWkgVEMgQm9sZFwiJyxcbiAgICAnXCJQaW5nRmFuZyBUQyBVbHRyYWxpZ2h0XCIsIFwiSmhlbmdIZWkgVEMgTGlnaHRcIicsXG4gICAgJ1wiUGluZ0ZhbmcgVEMgVGhpblwiLCBcIkpoZW5nSGVpIFRDIFJlZ3VsYXJcIicsXG4gICAgJ1wiUGluZ0ZhbmcgVEMgTGlnaHRcIiwgXCJKaGVuZ0hlaSBUQyBCb2xkXCInLFxuICBdLFxuICB6aHNjOiBbXG4gICAgJ1wiUGluZ0ZhbmcgU0MgUmVndWxhclwiLCBTaW1IZWknLFxuICAgICdcIlBpbmdGYW5nIFNDIFJlZ3VsYXJcIiwgU2ltSGVpJyxcbiAgICAnXCJQaW5nRmFuZyBTQyBTZW1pYm9sZFwiLCBTaW1IZWknLFxuICAgICdcIlBpbmdGYW5nIFNDIFVsdHJhbGlnaHRcIiwgU2ltSGVpJyxcbiAgICAnXCJQaW5nRmFuZyBTQyBUaGluXCIsIFNpbUhlaScsXG4gICAgJ1wiUGluZ0ZhbmcgU0MgTGlnaHRcIiwgU2ltSGVpJyxcbiAgXSxcbn07XG5cbmNvbnN0IHJ4QXJhYmljID0gL1xccHtTY3JpcHQ9QXJhYn0vdTtcbmNvbnN0IHJ4Q0pLID0gL1xccHtTY3JpcHQ9SGFufS91O1xuY29uc3QgcnhDeXJpbGxpYyA9IC9cXHB7U2NyaXB0PUN5cmx9L3U7XG5jb25zdCByeERldmFuYWdhcmkgPSAvXFxwe1NjcmlwdD1EZXZhfS91O1xuY29uc3QgcnhKYXBhbmVzZSA9IC9cXHB7U2NyaXB0PUhpcmF9fFxccHtTY3JpcHQ9S2FuYX0vdTtcbmNvbnN0IHJ4TGF0aW4gPSAvXFxwe1NjcmlwdD1MYXRufS91O1xuXG5leHBvcnQgY29uc3QgZm9udFNuaWZmZXIgPSB7XG4gIGhhc0FyYWJpYyh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcnhBcmFiaWMudGVzdCh0ZXh0KTtcbiAgfSxcblxuICBoYXNDSksodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJ4Q0pLLnRlc3QodGV4dCk7XG4gIH0sXG5cbiAgaGFzQ3lyaWxsaWModGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJ4Q3lyaWxsaWMudGVzdCh0ZXh0KTtcbiAgfSxcblxuICBoYXNEZXZhbmFnYXJpKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByeERldmFuYWdhcmkudGVzdCh0ZXh0KTtcbiAgfSxcblxuICBoYXNKYXBhbmVzZSh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcnhKYXBhbmVzZS50ZXN0KHRleHQpO1xuICB9LFxuXG4gIGhhc0xhdGluKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByeExhdGluLnRlc3QodGV4dCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9udE5hbWVCeVRleHRTY3JpcHQoXG4gIHRleHQ6IHN0cmluZyxcbiAgdGV4dFN0eWxlSW5kZXg6IG51bWJlcixcbiAgaTE4bj86IExvY2FsaXplclR5cGVcbik6IHN0cmluZyB7XG4gIHN0cmljdEFzc2VydChcbiAgICB0ZXh0U3R5bGVJbmRleCA+PSAwICYmIHRleHRTdHlsZUluZGV4IDw9IDUsXG4gICAgJ3RleHQgc3R5bGUgaXMgbm90IGJldHdlZW4gMC01J1xuICApO1xuXG4gIGNvbnN0IGZvbnRzOiBBcnJheTxzdHJpbmc+ID0gW0ZPTlRfTUFQLmJhc2VbdGV4dFN0eWxlSW5kZXhdXTtcblxuICBpZiAoZm9udFNuaWZmZXIuaGFzQXJhYmljKHRleHQpKSB7XG4gICAgZm9udHMucHVzaChGT05UX01BUC5hcmFiaWNbdGV4dFN0eWxlSW5kZXhdKTtcbiAgfVxuXG4gIGlmIChmb250U25pZmZlci5oYXNDSksodGV4dCkpIHtcbiAgICBjb25zdCBsb2NhbGUgPSBpMThuPy5nZXRMb2NhbGUoKTtcblxuICAgIGlmIChsb2NhbGUgPT09ICd6aF9UVycpIHtcbiAgICAgIGZvbnRzLnB1c2goRk9OVF9NQVAuemh0Y1t0ZXh0U3R5bGVJbmRleF0pO1xuICAgIH0gZWxzZSBpZiAobG9jYWxlID09PSAnemhfSEsnKSB7XG4gICAgICBmb250cy5wdXNoKEZPTlRfTUFQLnpoaGtbdGV4dFN0eWxlSW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9udHMucHVzaChGT05UX01BUC56aHNjW3RleHRTdHlsZUluZGV4XSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZvbnRTbmlmZmVyLmhhc0N5cmlsbGljKHRleHQpKSB7XG4gICAgZm9udHMucHVzaChGT05UX01BUC5jeXJpbGxpY1t0ZXh0U3R5bGVJbmRleF0pO1xuICB9XG5cbiAgaWYgKGZvbnRTbmlmZmVyLmhhc0RldmFuYWdhcmkodGV4dCkpIHtcbiAgICBmb250cy5wdXNoKEZPTlRfTUFQLmRldmFuYWdhcmlbdGV4dFN0eWxlSW5kZXhdKTtcbiAgfVxuXG4gIGlmIChmb250U25pZmZlci5oYXNKYXBhbmVzZSh0ZXh0KSkge1xuICAgIGZvbnRzLnB1c2goRk9OVF9NQVAuamFwYW5lc2VbdGV4dFN0eWxlSW5kZXhdKTtcbiAgfVxuXG4gIGlmIChmb250U25pZmZlci5oYXNMYXRpbih0ZXh0KSkge1xuICAgIGZvbnRzLnB1c2goRk9OVF9NQVAubGF0aW5bdGV4dFN0eWxlSW5kZXhdKTtcbiAgfVxuXG4gIHJldHVybiBmb250cy5yZXZlcnNlKCkuam9pbignLCAnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG9CQUE2QjtBQUU3QixNQUFNLFdBQVc7QUFBQSxFQUNmLE1BQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsVUFBVTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsVUFBVTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQUVBLE1BQU0sV0FBVztBQUNqQixNQUFNLFFBQVE7QUFDZCxNQUFNLGFBQWE7QUFDbkIsTUFBTSxlQUFlO0FBQ3JCLE1BQU0sYUFBYTtBQUNuQixNQUFNLFVBQVU7QUFFVCxNQUFNLGNBQWM7QUFBQSxFQUN6QixVQUFVLE1BQXVCO0FBQy9CLFdBQU8sU0FBUyxLQUFLLElBQUk7QUFBQSxFQUMzQjtBQUFBLEVBRUEsT0FBTyxNQUF1QjtBQUM1QixXQUFPLE1BQU0sS0FBSyxJQUFJO0FBQUEsRUFDeEI7QUFBQSxFQUVBLFlBQVksTUFBdUI7QUFDakMsV0FBTyxXQUFXLEtBQUssSUFBSTtBQUFBLEVBQzdCO0FBQUEsRUFFQSxjQUFjLE1BQXVCO0FBQ25DLFdBQU8sYUFBYSxLQUFLLElBQUk7QUFBQSxFQUMvQjtBQUFBLEVBRUEsWUFBWSxNQUF1QjtBQUNqQyxXQUFPLFdBQVcsS0FBSyxJQUFJO0FBQUEsRUFDN0I7QUFBQSxFQUVBLFNBQVMsTUFBdUI7QUFDOUIsV0FBTyxRQUFRLEtBQUssSUFBSTtBQUFBLEVBQzFCO0FBQ0Y7QUFFTyxpQ0FDTCxNQUNBLGdCQUNBLE1BQ1E7QUFDUixrQ0FDRSxrQkFBa0IsS0FBSyxrQkFBa0IsR0FDekMsK0JBQ0Y7QUFFQSxRQUFNLFFBQXVCLENBQUMsU0FBUyxLQUFLLGVBQWU7QUFFM0QsTUFBSSxZQUFZLFVBQVUsSUFBSSxHQUFHO0FBQy9CLFVBQU0sS0FBSyxTQUFTLE9BQU8sZUFBZTtBQUFBLEVBQzVDO0FBRUEsTUFBSSxZQUFZLE9BQU8sSUFBSSxHQUFHO0FBQzVCLFVBQU0sU0FBUyxNQUFNLFVBQVU7QUFFL0IsUUFBSSxXQUFXLFNBQVM7QUFDdEIsWUFBTSxLQUFLLFNBQVMsS0FBSyxlQUFlO0FBQUEsSUFDMUMsV0FBVyxXQUFXLFNBQVM7QUFDN0IsWUFBTSxLQUFLLFNBQVMsS0FBSyxlQUFlO0FBQUEsSUFDMUMsT0FBTztBQUNMLFlBQU0sS0FBSyxTQUFTLEtBQUssZUFBZTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUVBLE1BQUksWUFBWSxZQUFZLElBQUksR0FBRztBQUNqQyxVQUFNLEtBQUssU0FBUyxTQUFTLGVBQWU7QUFBQSxFQUM5QztBQUVBLE1BQUksWUFBWSxjQUFjLElBQUksR0FBRztBQUNuQyxVQUFNLEtBQUssU0FBUyxXQUFXLGVBQWU7QUFBQSxFQUNoRDtBQUVBLE1BQUksWUFBWSxZQUFZLElBQUksR0FBRztBQUNqQyxVQUFNLEtBQUssU0FBUyxTQUFTLGVBQWU7QUFBQSxFQUM5QztBQUVBLE1BQUksWUFBWSxTQUFTLElBQUksR0FBRztBQUM5QixVQUFNLEtBQUssU0FBUyxNQUFNLGVBQWU7QUFBQSxFQUMzQztBQUVBLFNBQU8sTUFBTSxRQUFRLEVBQUUsS0FBSyxJQUFJO0FBQ2xDO0FBN0NnQiIsCiAgIm5hbWVzIjogW10KfQo=
