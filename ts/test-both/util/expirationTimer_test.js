var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var moment = __toESM(require("moment"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_messages2 = __toESM(require("../../../_locales/es/messages.json"));
var import_messages3 = __toESM(require("../../../_locales/nb/messages.json"));
var import_messages4 = __toESM(require("../../../_locales/nn/messages.json"));
var import_messages5 = __toESM(require("../../../_locales/pt_BR/messages.json"));
var import_messages6 = __toESM(require("../../../_locales/zh_CN/messages.json"));
var expirationTimer = __toESM(require("../../util/expirationTimer"));
describe("expiration timer utilities", () => {
  const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
  describe("DEFAULT_DURATIONS_IN_SECONDS", () => {
    const { DEFAULT_DURATIONS_IN_SECONDS } = expirationTimer;
    it("includes at least 3 durations", () => {
      import_chai.assert.isAtLeast(DEFAULT_DURATIONS_IN_SECONDS.length, 3);
    });
    it("includes 1 hour as seconds", () => {
      const oneHour = moment.duration(1, "hour").asSeconds();
      import_chai.assert.include(DEFAULT_DURATIONS_IN_SECONDS, oneHour);
    });
  });
  describe("format", () => {
    const { format } = expirationTimer;
    it("handles an undefined duration", () => {
      import_chai.assert.strictEqual(format(i18n, void 0), "off");
    });
    it("handles no duration", () => {
      import_chai.assert.strictEqual(format(i18n, 0), "off");
    });
    it("formats durations", () => {
      (/* @__PURE__ */ new Map([
        [1, "1 second"],
        [2, "2 seconds"],
        [30, "30 seconds"],
        [59, "59 seconds"],
        [moment.duration(1, "m").asSeconds(), "1 minute"],
        [moment.duration(5, "m").asSeconds(), "5 minutes"],
        [moment.duration(1, "h").asSeconds(), "1 hour"],
        [moment.duration(8, "h").asSeconds(), "8 hours"],
        [moment.duration(1, "d").asSeconds(), "1 day"],
        [moment.duration(6, "d").asSeconds(), "6 days"],
        [moment.duration(8, "d").asSeconds(), "8 days"],
        [moment.duration(30, "d").asSeconds(), "30 days"],
        [moment.duration(365, "d").asSeconds(), "365 days"],
        [moment.duration(1, "w").asSeconds(), "1 week"],
        [moment.duration(3, "w").asSeconds(), "3 weeks"],
        [moment.duration(52, "w").asSeconds(), "52 weeks"]
      ])).forEach((expected, input) => {
        import_chai.assert.strictEqual(format(i18n, input), expected);
      });
    });
    it("formats other languages successfully", () => {
      const esI18n = (0, import_setupI18n.setupI18n)("es", import_messages2.default);
      import_chai.assert.strictEqual(format(esI18n, 120), "2 minutos");
      const zhCnI18n = (0, import_setupI18n.setupI18n)("zh_CN", import_messages6.default);
      import_chai.assert.strictEqual(format(zhCnI18n, 60), "1 \u5206\u949F");
      const ptBrI18n = (0, import_setupI18n.setupI18n)("pt_BR", import_messages5.default);
      import_chai.assert.strictEqual(format(ptBrI18n, moment.duration(5, "days").asSeconds()), "5 dias");
      [(0, import_setupI18n.setupI18n)("nb", import_messages3.default), (0, import_setupI18n.setupI18n)("nn", import_messages4.default)].forEach((norwegianI18n) => {
        import_chai.assert.strictEqual(format(norwegianI18n, moment.duration(6, "hours").asSeconds()), "6 timer");
      });
    });
    it("falls back to English if the locale is not supported", () => {
      const badI18n = (0, import_setupI18n.setupI18n)("bogus", {});
      import_chai.assert.strictEqual(format(badI18n, 120), "2 minutes");
    });
    it('handles a "mix" of units gracefully', () => {
      const mix = moment.duration(6, "days").add(moment.duration(2, "hours")).asSeconds();
      import_chai.assert.strictEqual(format(i18n, mix), "6 days, 2 hours");
    });
    it("handles negative numbers gracefully", () => {
      import_chai.assert.strictEqual(format(i18n, -1), "1 second");
      import_chai.assert.strictEqual(format(i18n, -120), "2 minutes");
      import_chai.assert.strictEqual(format(i18n, -0), "off");
    });
    it("handles fractional seconds gracefully", () => {
      import_chai.assert.strictEqual(format(i18n, 4.2), "4 seconds");
      import_chai.assert.strictEqual(format(i18n, 4.8), "4 seconds");
      import_chai.assert.strictEqual(format(i18n, 0.2), "1 second");
      import_chai.assert.strictEqual(format(i18n, 0.8), "1 second");
      import_chai.assert.strictEqual(format(i18n, -4.2), "4 seconds");
      import_chai.assert.strictEqual(format(i18n, -4.8), "4 seconds");
      import_chai.assert.strictEqual(format(i18n, -0.2), "1 second");
      import_chai.assert.strictEqual(format(i18n, -0.8), "1 second");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwaXJhdGlvblRpbWVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IGVzTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZXMvbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgbmJNZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9uYi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCBubk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL25uL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHB0QnJNZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9wdF9CUi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB6aENuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvemhfQ04vbWVzc2FnZXMuanNvbic7XG5cbmltcG9ydCAqIGFzIGV4cGlyYXRpb25UaW1lciBmcm9tICcuLi8uLi91dGlsL2V4cGlyYXRpb25UaW1lcic7XG5cbmRlc2NyaWJlKCdleHBpcmF0aW9uIHRpbWVyIHV0aWxpdGllcycsICgpID0+IHtcbiAgY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuICBkZXNjcmliZSgnREVGQVVMVF9EVVJBVElPTlNfSU5fU0VDT05EUycsICgpID0+IHtcbiAgICBjb25zdCB7IERFRkFVTFRfRFVSQVRJT05TX0lOX1NFQ09ORFMgfSA9IGV4cGlyYXRpb25UaW1lcjtcblxuICAgIGl0KCdpbmNsdWRlcyBhdCBsZWFzdCAzIGR1cmF0aW9ucycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0F0TGVhc3QoREVGQVVMVF9EVVJBVElPTlNfSU5fU0VDT05EUy5sZW5ndGgsIDMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2luY2x1ZGVzIDEgaG91ciBhcyBzZWNvbmRzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb25lSG91ciA9IG1vbWVudC5kdXJhdGlvbigxLCAnaG91cicpLmFzU2Vjb25kcygpO1xuICAgICAgYXNzZXJ0LmluY2x1ZGUoREVGQVVMVF9EVVJBVElPTlNfSU5fU0VDT05EUywgb25lSG91cik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdmb3JtYXQnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBmb3JtYXQgfSA9IGV4cGlyYXRpb25UaW1lcjtcblxuICAgIGl0KCdoYW5kbGVzIGFuIHVuZGVmaW5lZCBkdXJhdGlvbicsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgdW5kZWZpbmVkKSwgJ29mZicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgbm8gZHVyYXRpb24nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0KGkxOG4sIDApLCAnb2ZmJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZm9ybWF0cyBkdXJhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXG4gICAgICAgIFsxLCAnMSBzZWNvbmQnXSxcbiAgICAgICAgWzIsICcyIHNlY29uZHMnXSxcbiAgICAgICAgWzMwLCAnMzAgc2Vjb25kcyddLFxuICAgICAgICBbNTksICc1OSBzZWNvbmRzJ10sXG4gICAgICAgIFttb21lbnQuZHVyYXRpb24oMSwgJ20nKS5hc1NlY29uZHMoKSwgJzEgbWludXRlJ10sXG4gICAgICAgIFttb21lbnQuZHVyYXRpb24oNSwgJ20nKS5hc1NlY29uZHMoKSwgJzUgbWludXRlcyddLFxuICAgICAgICBbbW9tZW50LmR1cmF0aW9uKDEsICdoJykuYXNTZWNvbmRzKCksICcxIGhvdXInXSxcbiAgICAgICAgW21vbWVudC5kdXJhdGlvbig4LCAnaCcpLmFzU2Vjb25kcygpLCAnOCBob3VycyddLFxuICAgICAgICBbbW9tZW50LmR1cmF0aW9uKDEsICdkJykuYXNTZWNvbmRzKCksICcxIGRheSddLFxuICAgICAgICBbbW9tZW50LmR1cmF0aW9uKDYsICdkJykuYXNTZWNvbmRzKCksICc2IGRheXMnXSxcbiAgICAgICAgW21vbWVudC5kdXJhdGlvbig4LCAnZCcpLmFzU2Vjb25kcygpLCAnOCBkYXlzJ10sXG4gICAgICAgIFttb21lbnQuZHVyYXRpb24oMzAsICdkJykuYXNTZWNvbmRzKCksICczMCBkYXlzJ10sXG4gICAgICAgIFttb21lbnQuZHVyYXRpb24oMzY1LCAnZCcpLmFzU2Vjb25kcygpLCAnMzY1IGRheXMnXSxcbiAgICAgICAgW21vbWVudC5kdXJhdGlvbigxLCAndycpLmFzU2Vjb25kcygpLCAnMSB3ZWVrJ10sXG4gICAgICAgIFttb21lbnQuZHVyYXRpb24oMywgJ3cnKS5hc1NlY29uZHMoKSwgJzMgd2Vla3MnXSxcbiAgICAgICAgW21vbWVudC5kdXJhdGlvbig1MiwgJ3cnKS5hc1NlY29uZHMoKSwgJzUyIHdlZWtzJ10sXG4gICAgICBdKS5mb3JFYWNoKChleHBlY3RlZCwgaW5wdXQpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdChpMThuLCBpbnB1dCksIGV4cGVjdGVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Zvcm1hdHMgb3RoZXIgbGFuZ3VhZ2VzIHN1Y2Nlc3NmdWxseScsICgpID0+IHtcbiAgICAgIGNvbnN0IGVzSTE4biA9IHNldHVwSTE4bignZXMnLCBlc01lc3NhZ2VzKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoZXNJMThuLCAxMjApLCAnMiBtaW51dG9zJyk7XG5cbiAgICAgIGNvbnN0IHpoQ25JMThuID0gc2V0dXBJMThuKCd6aF9DTicsIHpoQ25NZXNzYWdlcyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0KHpoQ25JMThuLCA2MCksICcxIFx1NTIwNlx1OTQ5RicpO1xuXG4gICAgICAvLyBUaGUgdW5kZXJseWluZyBsaWJyYXJ5IHN1cHBvcnRzIHRoZSBcInB0XCIgbG9jYWxlLCBub3QgdGhlIFwicHRfQlJcIiBsb2NhbGUuIFRoYXQnc1xuICAgICAgLy8gICB3aGF0IHdlJ3JlIHRlc3RpbmcgaGVyZS5cbiAgICAgIGNvbnN0IHB0QnJJMThuID0gc2V0dXBJMThuKCdwdF9CUicsIHB0QnJNZXNzYWdlcyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZvcm1hdChwdEJySTE4biwgbW9tZW50LmR1cmF0aW9uKDUsICdkYXlzJykuYXNTZWNvbmRzKCkpLFxuICAgICAgICAnNSBkaWFzJ1xuICAgICAgKTtcblxuICAgICAgLy8gVGhlIHVuZGVybHlpbmcgbGlicmFyeSBzdXBwb3J0cyB0aGUgTm9yd2VnaWFuIGxhbmd1YWdlLCB3aGljaCBpcyBhIG1hY3JvbGFuZ3VhZ2VcbiAgICAgIC8vICAgZm9yIEJva21cdTAwRTVsIGFuZCBOeW5vcnNrLlxuICAgICAgW3NldHVwSTE4bignbmInLCBuYk1lc3NhZ2VzKSwgc2V0dXBJMThuKCdubicsIG5uTWVzc2FnZXMpXS5mb3JFYWNoKFxuICAgICAgICBub3J3ZWdpYW5JMThuID0+IHtcbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICBmb3JtYXQobm9yd2VnaWFuSTE4biwgbW9tZW50LmR1cmF0aW9uKDYsICdob3VycycpLmFzU2Vjb25kcygpKSxcbiAgICAgICAgICAgICc2IHRpbWVyJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmFsbHMgYmFjayB0byBFbmdsaXNoIGlmIHRoZSBsb2NhbGUgaXMgbm90IHN1cHBvcnRlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGJhZEkxOG4gPSBzZXR1cEkxOG4oJ2JvZ3VzJywge30pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdChiYWRJMThuLCAxMjApLCAnMiBtaW51dGVzJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBhIFwibWl4XCIgb2YgdW5pdHMgZ3JhY2VmdWxseScsICgpID0+IHtcbiAgICAgIC8vIFdlIGRvbid0IGV4cGVjdCB0aGVyZSB0byBiZSBhIFwibWl4XCIgb2YgdW5pdHMsIGJ1dCB3ZSBzaG91bGRuJ3QgY2hva2UgaWYgYSBiYWRcbiAgICAgIC8vICAgY2xpZW50IGdpdmVzIHVzIGFuIHVuZXhwZWN0ZWQgdGltZXN0YW1wLlxuICAgICAgY29uc3QgbWl4ID0gbW9tZW50XG4gICAgICAgIC5kdXJhdGlvbig2LCAnZGF5cycpXG4gICAgICAgIC5hZGQobW9tZW50LmR1cmF0aW9uKDIsICdob3VycycpKVxuICAgICAgICAuYXNTZWNvbmRzKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0KGkxOG4sIG1peCksICc2IGRheXMsIDIgaG91cnMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIG5lZ2F0aXZlIG51bWJlcnMgZ3JhY2VmdWxseScsICgpID0+IHtcbiAgICAgIC8vIFRoZSBwcm90byBoZWxwcyBlbmZvcmNlIG5vbi1uZWdhdGl2ZSBudW1iZXJzIGJ5IHNwZWNpZnlpbmcgYSB1MzIsIGJ1dCBiZWNhdXNlXG4gICAgICAvLyAgIEphdmFTY3JpcHQgbGFja3Mgc3VjaCBhIHR5cGUsIHdlIHRlc3QgaXQgaGVyZS5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgLTEpLCAnMSBzZWNvbmQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgLTEyMCksICcyIG1pbnV0ZXMnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgLTApLCAnb2ZmJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBmcmFjdGlvbmFsIHNlY29uZHMgZ3JhY2VmdWxseScsICgpID0+IHtcbiAgICAgIC8vIFRoZSBwcm90byBoZWxwcyBlbmZvcmNlIGludGVnZXIgbnVtYmVycyBieSBzcGVjaWZ5aW5nIGEgdTMyLCBidXQgdGhpcyBmdW5jdGlvblxuICAgICAgLy8gICBzaG91bGRuJ3QgY2hva2UgaWYgYmFkIGRhdGEgaXMgcGFzc2VkIHNvbWVob3cuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0KGkxOG4sIDQuMiksICc0IHNlY29uZHMnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgNC44KSwgJzQgc2Vjb25kcycpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdChpMThuLCAwLjIpLCAnMSBzZWNvbmQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgMC44KSwgJzEgc2Vjb25kJyk7XG5cbiAgICAgIC8vIElmIG11bHRpcGxlIHRoaW5ncyBnbyB3cm9uZyBhbmQgd2UgcGFzcyBhIGZyYWN0aW9uYWwgbmVnYXRpdmUgbnVtYmVyLCB3ZSBzdGlsbFxuICAgICAgLy8gICBzaG91bGRuJ3QgZXhwbG9kZS5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgLTQuMiksICc0IHNlY29uZHMnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgLTQuOCksICc0IHNlY29uZHMnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXQoaTE4biwgLTAuMiksICcxIHNlY29uZCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdChpMThuLCAtMC44KSwgJzEgc2Vjb25kJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3Mi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TCxPQUFPLFVBQVUsT0FBTyxTQUFTLEdBQUcsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUN2RCxRQUNGO0FBSUEsT0FBQyxnQ0FBVSxNQUFNLHdCQUFVLEdBQUcsZ0NBQVUsTUFBTSx3QkFBVSxDQUFDLEVBQUUsUUFDekQsbUJBQWlCO0FBQ2YsMkJBQU8sWUFDTCxPQUFPLGVBQWUsT0FBTyxTQUFTLEdBQUcsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUM3RCxTQUNGO0FBQUEsTUFDRixDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyx3REFBd0QsTUFBTTtBQUMvRCxZQUFNLFVBQVUsZ0NBQVUsU0FBUyxDQUFDLENBQUM7QUFDckMseUJBQU8sWUFBWSxPQUFPLFNBQVMsR0FBRyxHQUFHLFdBQVc7QUFBQSxJQUN0RCxDQUFDO0FBRUQsT0FBRyx1Q0FBdUMsTUFBTTtBQUc5QyxZQUFNLE1BQU0sT0FDVCxTQUFTLEdBQUcsTUFBTSxFQUNsQixJQUFJLE9BQU8sU0FBUyxHQUFHLE9BQU8sQ0FBQyxFQUMvQixVQUFVO0FBQ2IseUJBQU8sWUFBWSxPQUFPLE1BQU0sR0FBRyxHQUFHLGlCQUFpQjtBQUFBLElBQ3pELENBQUM7QUFFRCxPQUFHLHVDQUF1QyxNQUFNO0FBRzlDLHlCQUFPLFlBQVksT0FBTyxNQUFNLEVBQUUsR0FBRyxVQUFVO0FBQy9DLHlCQUFPLFlBQVksT0FBTyxNQUFNLElBQUksR0FBRyxXQUFXO0FBQ2xELHlCQUFPLFlBQVksT0FBTyxNQUFNLEVBQUUsR0FBRyxLQUFLO0FBQUEsSUFDNUMsQ0FBQztBQUVELE9BQUcseUNBQXlDLE1BQU07QUFHaEQseUJBQU8sWUFBWSxPQUFPLE1BQU0sR0FBRyxHQUFHLFdBQVc7QUFDakQseUJBQU8sWUFBWSxPQUFPLE1BQU0sR0FBRyxHQUFHLFdBQVc7QUFDakQseUJBQU8sWUFBWSxPQUFPLE1BQU0sR0FBRyxHQUFHLFVBQVU7QUFDaEQseUJBQU8sWUFBWSxPQUFPLE1BQU0sR0FBRyxHQUFHLFVBQVU7QUFJaEQseUJBQU8sWUFBWSxPQUFPLE1BQU0sSUFBSSxHQUFHLFdBQVc7QUFDbEQseUJBQU8sWUFBWSxPQUFPLE1BQU0sSUFBSSxHQUFHLFdBQVc7QUFDbEQseUJBQU8sWUFBWSxPQUFPLE1BQU0sSUFBSSxHQUFHLFVBQVU7QUFDakQseUJBQU8sWUFBWSxPQUFPLE1BQU0sSUFBSSxHQUFHLFVBQVU7QUFBQSxJQUNuRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
