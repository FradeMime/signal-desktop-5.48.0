var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var import_sinon = __toESM(require("sinon"));
var import_sgnlHref = require("../../util/sgnlHref");
function shouldNeverBeCalled() {
  import_chai.assert.fail("This should never be called");
}
const explodingLogger = {
  fatal: shouldNeverBeCalled,
  error: shouldNeverBeCalled,
  warn: shouldNeverBeCalled,
  info: shouldNeverBeCalled,
  debug: shouldNeverBeCalled,
  trace: shouldNeverBeCalled
};
describe("sgnlHref", () => {
  [
    { protocol: "sgnl", check: import_sgnlHref.isSgnlHref, name: "isSgnlHref" },
    { protocol: "signalcaptcha", check: import_sgnlHref.isCaptchaHref, name: "isCaptchaHref" }
  ].forEach(({ protocol, check, name }) => {
    describe(name, () => {
      it("returns false for non-strings", () => {
        const logger = {
          ...explodingLogger,
          warn: import_sinon.default.spy()
        };
        const castToString = /* @__PURE__ */ __name((value) => value, "castToString");
        import_chai.assert.isFalse(check(castToString(void 0), logger));
        import_chai.assert.isFalse(check(castToString(null), logger));
        import_chai.assert.isFalse(check(castToString(123), logger));
        import_sinon.default.assert.calledThrice(logger.warn);
      });
      it("returns false for invalid URLs", () => {
        import_chai.assert.isFalse(check("", explodingLogger));
        import_chai.assert.isFalse(check(protocol, explodingLogger));
        import_chai.assert.isFalse(check(`${protocol}://::`, explodingLogger));
      });
      it(`returns false if the protocol is not "${protocol}:"`, () => {
        import_chai.assert.isFalse(check("https://example", explodingLogger));
        import_chai.assert.isFalse(check("https://signal.art/addstickers/?pack_id=abc", explodingLogger));
        import_chai.assert.isFalse(check("signal://example", explodingLogger));
      });
      it(`returns true if the protocol is "${protocol}:"`, () => {
        import_chai.assert.isTrue(check(`${protocol}://`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example.com`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol.toUpperCase()}://example`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example?foo=bar`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example/`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example#`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}:foo`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://user:pass@example`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example.com:1234`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example.com/extra/path/data`, explodingLogger));
        import_chai.assert.isTrue(check(`${protocol}://example/?foo=bar#hash`, explodingLogger));
      });
      it("accepts URL objects", () => {
        const invalid = new URL("https://example.com");
        import_chai.assert.isFalse(check(invalid, explodingLogger));
        const valid = new URL(`${protocol}://example`);
        import_chai.assert.isTrue(check(valid, explodingLogger));
      });
    });
  });
  describe("isSignalHttpsLink", () => {
    it("returns false for non-strings", () => {
      const logger = {
        ...explodingLogger,
        warn: import_sinon.default.spy()
      };
      const castToString = /* @__PURE__ */ __name((value) => value, "castToString");
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)(castToString(void 0), logger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)(castToString(null), logger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)(castToString(123), logger));
      import_sinon.default.assert.calledThrice(logger.warn);
    });
    it("returns false for invalid URLs", () => {
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("", explodingLogger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("https", explodingLogger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("https://::", explodingLogger));
    });
    it('returns false if the protocol is not "https:"', () => {
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("sgnl://signal.art", explodingLogger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("sgnl://signal.art/addstickers/?pack_id=abc", explodingLogger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("signal://signal.group", explodingLogger));
    });
    it("returns false if the URL is not a valid Signal URL", () => {
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("https://signal.org", explodingLogger));
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("https://example.com", explodingLogger));
    });
    it('returns true if the protocol is "https:"', () => {
      import_chai.assert.isTrue((0, import_sgnlHref.isSignalHttpsLink)("https://signal.group", explodingLogger));
      import_chai.assert.isTrue((0, import_sgnlHref.isSignalHttpsLink)("https://signal.art", explodingLogger));
      import_chai.assert.isTrue((0, import_sgnlHref.isSignalHttpsLink)("HTTPS://signal.art", explodingLogger));
      import_chai.assert.isTrue((0, import_sgnlHref.isSignalHttpsLink)("https://signal.me", explodingLogger));
    });
    it("returns false if username or password are set", () => {
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("https://user:password@signal.group", explodingLogger));
    });
    it("returns false if port is set", () => {
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)("https://signal.group:1234", explodingLogger));
    });
    it("accepts URL objects", () => {
      const invalid = new URL("sgnl://example.com");
      import_chai.assert.isFalse((0, import_sgnlHref.isSignalHttpsLink)(invalid, explodingLogger));
      const valid = new URL("https://signal.art");
      import_chai.assert.isTrue((0, import_sgnlHref.isSignalHttpsLink)(valid, explodingLogger));
    });
  });
  describe("parseSgnlHref", () => {
    it("returns a null command for invalid URLs", () => {
      ["", "sgnl", "https://example/?foo=bar"].forEach((href) => {
        import_chai.assert.deepEqual((0, import_sgnlHref.parseSgnlHref)(href, explodingLogger), {
          command: null,
          args: /* @__PURE__ */ new Map(),
          hash: void 0
        });
      });
    });
    it("parses the command for URLs with no arguments", () => {
      [
        "sgnl://foo",
        "sgnl://foo/",
        "sgnl://foo?",
        "SGNL://foo?",
        "sgnl://user:pass@foo",
        "sgnl://foo/path/data"
      ].forEach((href) => {
        import_chai.assert.deepEqual((0, import_sgnlHref.parseSgnlHref)(href, explodingLogger), {
          command: "foo",
          args: /* @__PURE__ */ new Map(),
          hash: void 0
        });
      });
    });
    it("parses a command's arguments", () => {
      import_chai.assert.deepEqual((0, import_sgnlHref.parseSgnlHref)("sgnl://Foo?bar=baz&qux=Quux&num=123&empty=&encoded=hello%20world", explodingLogger), {
        command: "Foo",
        args: /* @__PURE__ */ new Map([
          ["bar", "baz"],
          ["qux", "Quux"],
          ["num", "123"],
          ["empty", ""],
          ["encoded", "hello world"]
        ]),
        hash: void 0
      });
    });
    it("treats the port as part of the command", () => {
      import_chai.assert.propertyVal((0, import_sgnlHref.parseSgnlHref)("sgnl://foo:1234", explodingLogger), "command", "foo:1234");
    });
    it("ignores duplicate query parameters", () => {
      import_chai.assert.deepPropertyVal((0, import_sgnlHref.parseSgnlHref)("sgnl://x?foo=bar&foo=totally-ignored", explodingLogger), "args", /* @__PURE__ */ new Map([["foo", "bar"]]));
    });
    it("includes hash", () => {
      [
        "sgnl://foo?bar=baz#somehash",
        "sgnl://user:pass@foo?bar=baz#somehash"
      ].forEach((href) => {
        import_chai.assert.deepEqual((0, import_sgnlHref.parseSgnlHref)(href, explodingLogger), {
          command: "foo",
          args: /* @__PURE__ */ new Map([["bar", "baz"]]),
          hash: "somehash"
        });
      });
    });
    it("ignores other parts of the URL", () => {
      [
        "sgnl://foo?bar=baz",
        "sgnl://foo/?bar=baz",
        "sgnl://foo/lots/of/path?bar=baz",
        "sgnl://user:pass@foo?bar=baz"
      ].forEach((href) => {
        import_chai.assert.deepEqual((0, import_sgnlHref.parseSgnlHref)(href, explodingLogger), {
          command: "foo",
          args: /* @__PURE__ */ new Map([["bar", "baz"]]),
          hash: void 0
        });
      });
    });
    it("doesn't do anything fancy with arrays or objects in the query string", () => {
      import_chai.assert.deepPropertyVal((0, import_sgnlHref.parseSgnlHref)("sgnl://x?foo[]=bar&foo[]=baz", explodingLogger), "args", /* @__PURE__ */ new Map([["foo[]", "bar"]]));
      import_chai.assert.deepPropertyVal((0, import_sgnlHref.parseSgnlHref)("sgnl://x?foo[bar][baz]=foobarbaz", explodingLogger), "args", /* @__PURE__ */ new Map([["foo[bar][baz]", "foobarbaz"]]));
    });
  });
  describe("parseCaptchaHref", () => {
    it("throws on invalid URLs", () => {
      ["", "sgnl", "https://example/?foo=bar"].forEach((href) => {
        import_chai.assert.throws(() => (0, import_sgnlHref.parseCaptchaHref)(href, explodingLogger), "Not a captcha href");
      });
    });
    it("parses the command for URLs with no arguments", () => {
      [
        "signalcaptcha://foo",
        "signalcaptcha://foo?x=y",
        "signalcaptcha://a:b@foo?x=y",
        "signalcaptcha://foo#hash",
        "signalcaptcha://foo/"
      ].forEach((href) => {
        import_chai.assert.deepEqual((0, import_sgnlHref.parseCaptchaHref)(href, explodingLogger), {
          captcha: "foo"
        });
      });
    });
  });
  describe("parseE164FromSignalDotMeHash", () => {
    it("returns undefined for invalid inputs", () => {
      [
        "",
        " p/+18885551234",
        "p/+18885551234 ",
        "x/+18885551234",
        "p/+notanumber",
        "p/7c7e87a0-3b74-4efd-9a00-6eb8b1dd5be8",
        "p/+08885551234",
        "p/18885551234"
      ].forEach((hash) => {
        import_chai.assert.isUndefined((0, import_sgnlHref.parseE164FromSignalDotMeHash)(hash));
      });
    });
    it("returns the E164 for valid inputs", () => {
      import_chai.assert.strictEqual((0, import_sgnlHref.parseE164FromSignalDotMeHash)("p/+18885551234"), "+18885551234");
      import_chai.assert.strictEqual((0, import_sgnlHref.parseE164FromSignalDotMeHash)("p/+441632960104"), "+441632960104");
    });
  });
  describe("parseSignalHttpsLink", () => {
    it("returns a null command for invalid URLs", () => {
      ["", "https", "https://example/?foo=bar"].forEach((href) => {
        import_chai.assert.deepEqual((0, import_sgnlHref.parseSignalHttpsLink)(href, explodingLogger), {
          command: null,
          args: /* @__PURE__ */ new Map(),
          hash: void 0
        });
      });
    });
    it("handles signal.art links", () => {
      import_chai.assert.deepEqual((0, import_sgnlHref.parseSignalHttpsLink)("https://signal.art/addstickers/#pack_id=baz&pack_key=Quux&num=123&empty=&encoded=hello%20world", explodingLogger), {
        command: "addstickers",
        args: /* @__PURE__ */ new Map([
          ["pack_id", "baz"],
          ["pack_key", "Quux"],
          ["num", "123"],
          ["empty", ""],
          ["encoded", "hello world"]
        ]),
        hash: "pack_id=baz&pack_key=Quux&num=123&empty=&encoded=hello%20world"
      });
    });
    it("handles signal.group links", () => {
      import_chai.assert.deepEqual((0, import_sgnlHref.parseSignalHttpsLink)("https://signal.group/#data", explodingLogger), {
        command: "signal.group",
        args: /* @__PURE__ */ new Map(),
        hash: "data"
      });
    });
    it("handles signal.me links", () => {
      import_chai.assert.deepEqual((0, import_sgnlHref.parseSignalHttpsLink)("https://signal.me/#p/+18885551234", explodingLogger), {
        command: "signal.me",
        args: /* @__PURE__ */ new Map(),
        hash: "p/+18885551234"
      });
    });
  });
  describe("rewriteSignalHrefsIfNecessary", () => {
    it("rewrites http://signal.group hrefs, making them use HTTPS", () => {
      import_chai.assert.strictEqual((0, import_sgnlHref.rewriteSignalHrefsIfNecessary)("http://signal.group/#abc123"), "https://signal.group/#abc123");
    });
    it("rewrites http://signal.art hrefs, making them use HTTPS", () => {
      import_chai.assert.strictEqual((0, import_sgnlHref.rewriteSignalHrefsIfNecessary)("http://signal.art/addstickers/#pack_id=abc123"), "https://signal.art/addstickers/#pack_id=abc123");
    });
    it("rewrites http://signal.me hrefs, making them use HTTPS", () => {
      import_chai.assert.strictEqual((0, import_sgnlHref.rewriteSignalHrefsIfNecessary)("http://signal.me/#p/+18885551234"), "https://signal.me/#p/+18885551234");
    });
    it("removes auth if present", () => {
      import_chai.assert.strictEqual((0, import_sgnlHref.rewriteSignalHrefsIfNecessary)("http://user:pass@signal.group/ab?c=d#ef"), "https://signal.group/ab?c=d#ef");
      import_chai.assert.strictEqual((0, import_sgnlHref.rewriteSignalHrefsIfNecessary)("https://user:pass@signal.group/ab?c=d#ef"), "https://signal.group/ab?c=d#ef");
    });
    it("does nothing to other hrefs", () => {
      [
        "http://example.com",
        "https://signal.art/addstickers/#pack_id=abc123",
        "http://signal.group:1234/abc?d=e#fg",
        "http://subdomain.signal.group/#abcdef",
        "ftp://signal.group/#abc123",
        "ftp://user:pass@signal.group/#abc123"
      ].forEach((href) => {
        import_chai.assert.strictEqual((0, import_sgnlHref.rewriteSignalHrefsIfNecessary)(href), href);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2dubEhyZWZfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IFNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuXG5pbXBvcnQge1xuICBpc1NnbmxIcmVmLFxuICBpc0NhcHRjaGFIcmVmLFxuICBpc1NpZ25hbEh0dHBzTGluayxcbiAgcGFyc2VTZ25sSHJlZixcbiAgcGFyc2VDYXB0Y2hhSHJlZixcbiAgcGFyc2VFMTY0RnJvbVNpZ25hbERvdE1lSGFzaCxcbiAgcGFyc2VTaWduYWxIdHRwc0xpbmssXG4gIHJld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5LFxufSBmcm9tICcuLi8uLi91dGlsL3NnbmxIcmVmJztcblxuZnVuY3Rpb24gc2hvdWxkTmV2ZXJCZUNhbGxlZCgpIHtcbiAgYXNzZXJ0LmZhaWwoJ1RoaXMgc2hvdWxkIG5ldmVyIGJlIGNhbGxlZCcpO1xufVxuXG5jb25zdCBleHBsb2RpbmdMb2dnZXI6IExvZ2dlclR5cGUgPSB7XG4gIGZhdGFsOiBzaG91bGROZXZlckJlQ2FsbGVkLFxuICBlcnJvcjogc2hvdWxkTmV2ZXJCZUNhbGxlZCxcbiAgd2Fybjogc2hvdWxkTmV2ZXJCZUNhbGxlZCxcbiAgaW5mbzogc2hvdWxkTmV2ZXJCZUNhbGxlZCxcbiAgZGVidWc6IHNob3VsZE5ldmVyQmVDYWxsZWQsXG4gIHRyYWNlOiBzaG91bGROZXZlckJlQ2FsbGVkLFxufTtcblxuZGVzY3JpYmUoJ3NnbmxIcmVmJywgKCkgPT4ge1xuICBbXG4gICAgeyBwcm90b2NvbDogJ3NnbmwnLCBjaGVjazogaXNTZ25sSHJlZiwgbmFtZTogJ2lzU2dubEhyZWYnIH0sXG4gICAgeyBwcm90b2NvbDogJ3NpZ25hbGNhcHRjaGEnLCBjaGVjazogaXNDYXB0Y2hhSHJlZiwgbmFtZTogJ2lzQ2FwdGNoYUhyZWYnIH0sXG4gIF0uZm9yRWFjaCgoeyBwcm90b2NvbCwgY2hlY2ssIG5hbWUgfSkgPT4ge1xuICAgIGRlc2NyaWJlKG5hbWUsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tc3RyaW5ncycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbG9nZ2VyID0ge1xuICAgICAgICAgIC4uLmV4cGxvZGluZ0xvZ2dlcixcbiAgICAgICAgICB3YXJuOiBTaW5vbi5zcHkoKSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjYXN0VG9TdHJpbmcgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gdmFsdWUgYXMgc3RyaW5nO1xuXG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoZWNrKGNhc3RUb1N0cmluZyh1bmRlZmluZWQpLCBsb2dnZXIpKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hlY2soY2FzdFRvU3RyaW5nKG51bGwpLCBsb2dnZXIpKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hlY2soY2FzdFRvU3RyaW5nKDEyMyksIGxvZ2dlcikpO1xuXG4gICAgICAgIFNpbm9uLmFzc2VydC5jYWxsZWRUaHJpY2UobG9nZ2VyLndhcm4pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpbnZhbGlkIFVSTHMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoZWNrKCcnLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hlY2socHJvdG9jb2wsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShjaGVjayhgJHtwcm90b2NvbH06Ly86OmAsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGByZXR1cm5zIGZhbHNlIGlmIHRoZSBwcm90b2NvbCBpcyBub3QgXCIke3Byb3RvY29sfTpcImAsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hlY2soJ2h0dHBzOi8vZXhhbXBsZScsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBjaGVjaygnaHR0cHM6Ly9zaWduYWwuYXJ0L2FkZHN0aWNrZXJzLz9wYWNrX2lkPWFiYycsIGV4cGxvZGluZ0xvZ2dlcilcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hlY2soJ3NpZ25hbDovL2V4YW1wbGUnLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChgcmV0dXJucyB0cnVlIGlmIHRoZSBwcm90b2NvbCBpcyBcIiR7cHJvdG9jb2x9OlwiYCwgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGNoZWNrKGAke3Byb3RvY29sfTovL2AsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGNoZWNrKGAke3Byb3RvY29sfTovL2V4YW1wbGVgLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGVjayhgJHtwcm90b2NvbH06Ly9leGFtcGxlLmNvbWAsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICAgIGNoZWNrKGAke3Byb3RvY29sLnRvVXBwZXJDYXNlKCl9Oi8vZXhhbXBsZWAsIGV4cGxvZGluZ0xvZ2dlcilcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGVjayhgJHtwcm90b2NvbH06Ly9leGFtcGxlP2Zvbz1iYXJgLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGVjayhgJHtwcm90b2NvbH06Ly9leGFtcGxlL2AsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGNoZWNrKGAke3Byb3RvY29sfTovL2V4YW1wbGUjYCwgZXhwbG9kaW5nTG9nZ2VyKSk7XG5cbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGVjayhgJHtwcm90b2NvbH06Zm9vYCwgZXhwbG9kaW5nTG9nZ2VyKSk7XG5cbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgICBjaGVjayhgJHtwcm90b2NvbH06Ly91c2VyOnBhc3NAZXhhbXBsZWAsIGV4cGxvZGluZ0xvZ2dlcilcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGVjayhgJHtwcm90b2NvbH06Ly9leGFtcGxlLmNvbToxMjM0YCwgZXhwbG9kaW5nTG9nZ2VyKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgICAgY2hlY2soYCR7cHJvdG9jb2x9Oi8vZXhhbXBsZS5jb20vZXh0cmEvcGF0aC9kYXRhYCwgZXhwbG9kaW5nTG9nZ2VyKVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICAgIGNoZWNrKGAke3Byb3RvY29sfTovL2V4YW1wbGUvP2Zvbz1iYXIjaGFzaGAsIGV4cGxvZGluZ0xvZ2dlcilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYWNjZXB0cyBVUkwgb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IG5ldyBVUkwoJ2h0dHBzOi8vZXhhbXBsZS5jb20nKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hlY2soaW52YWxpZCwgZXhwbG9kaW5nTG9nZ2VyKSk7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gbmV3IFVSTChgJHtwcm90b2NvbH06Ly9leGFtcGxlYCk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoY2hlY2sodmFsaWQsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc1NpZ25hbEh0dHBzTGluaycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLXN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dnZXIgPSB7XG4gICAgICAgIC4uLmV4cGxvZGluZ0xvZ2dlcixcbiAgICAgICAgd2FybjogU2lub24uc3B5KCksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYXN0VG9TdHJpbmcgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gdmFsdWUgYXMgc3RyaW5nO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NpZ25hbEh0dHBzTGluayhjYXN0VG9TdHJpbmcodW5kZWZpbmVkKSwgbG9nZ2VyKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NpZ25hbEh0dHBzTGluayhjYXN0VG9TdHJpbmcobnVsbCksIGxvZ2dlcikpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNTaWduYWxIdHRwc0xpbmsoY2FzdFRvU3RyaW5nKDEyMyksIGxvZ2dlcikpO1xuXG4gICAgICBTaW5vbi5hc3NlcnQuY2FsbGVkVGhyaWNlKGxvZ2dlci53YXJuKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpbnZhbGlkIFVSTHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NpZ25hbEh0dHBzTGluaygnJywgZXhwbG9kaW5nTG9nZ2VyKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NpZ25hbEh0dHBzTGluaygnaHR0cHMnLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzU2lnbmFsSHR0cHNMaW5rKCdodHRwczovLzo6JywgZXhwbG9kaW5nTG9nZ2VyKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgcHJvdG9jb2wgaXMgbm90IFwiaHR0cHM6XCInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NpZ25hbEh0dHBzTGluaygnc2dubDovL3NpZ25hbC5hcnQnLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc1NpZ25hbEh0dHBzTGluayhcbiAgICAgICAgICAnc2dubDovL3NpZ25hbC5hcnQvYWRkc3RpY2tlcnMvP3BhY2tfaWQ9YWJjJyxcbiAgICAgICAgICBleHBsb2RpbmdMb2dnZXJcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc1NpZ25hbEh0dHBzTGluaygnc2lnbmFsOi8vc2lnbmFsLmdyb3VwJywgZXhwbG9kaW5nTG9nZ2VyKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBVUkwgaXMgbm90IGEgdmFsaWQgU2lnbmFsIFVSTCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzU2lnbmFsSHR0cHNMaW5rKCdodHRwczovL3NpZ25hbC5vcmcnLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzU2lnbmFsSHR0cHNMaW5rKCdodHRwczovL2V4YW1wbGUuY29tJywgZXhwbG9kaW5nTG9nZ2VyKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBwcm90b2NvbCBpcyBcImh0dHBzOlwiJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1NpZ25hbEh0dHBzTGluaygnaHR0cHM6Ly9zaWduYWwuZ3JvdXAnLCBleHBsb2RpbmdMb2dnZXIpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNTaWduYWxIdHRwc0xpbmsoJ2h0dHBzOi8vc2lnbmFsLmFydCcsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1NpZ25hbEh0dHBzTGluaygnSFRUUFM6Ly9zaWduYWwuYXJ0JywgZXhwbG9kaW5nTG9nZ2VyKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzU2lnbmFsSHR0cHNMaW5rKCdodHRwczovL3NpZ25hbC5tZScsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdXNlcm5hbWUgb3IgcGFzc3dvcmQgYXJlIHNldCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc1NpZ25hbEh0dHBzTGluaygnaHR0cHM6Ly91c2VyOnBhc3N3b3JkQHNpZ25hbC5ncm91cCcsIGV4cGxvZGluZ0xvZ2dlcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBwb3J0IGlzIHNldCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc1NpZ25hbEh0dHBzTGluaygnaHR0cHM6Ly9zaWduYWwuZ3JvdXA6MTIzNCcsIGV4cGxvZGluZ0xvZ2dlcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyBVUkwgb2JqZWN0cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGludmFsaWQgPSBuZXcgVVJMKCdzZ25sOi8vZXhhbXBsZS5jb20nKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzU2lnbmFsSHR0cHNMaW5rKGludmFsaWQsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgICAgY29uc3QgdmFsaWQgPSBuZXcgVVJMKCdodHRwczovL3NpZ25hbC5hcnQnKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNTaWduYWxIdHRwc0xpbmsodmFsaWQsIGV4cGxvZGluZ0xvZ2dlcikpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncGFyc2VTZ25sSHJlZicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhIG51bGwgY29tbWFuZCBmb3IgaW52YWxpZCBVUkxzJywgKCkgPT4ge1xuICAgICAgWycnLCAnc2dubCcsICdodHRwczovL2V4YW1wbGUvP2Zvbz1iYXInXS5mb3JFYWNoKGhyZWYgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHBhcnNlU2dubEhyZWYoaHJlZiwgZXhwbG9kaW5nTG9nZ2VyKSwge1xuICAgICAgICAgIGNvbW1hbmQ6IG51bGwsXG4gICAgICAgICAgYXJnczogbmV3IE1hcDxuZXZlciwgbmV2ZXI+KCksXG4gICAgICAgICAgaGFzaDogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyB0aGUgY29tbWFuZCBmb3IgVVJMcyB3aXRoIG5vIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICAgIFtcbiAgICAgICAgJ3Nnbmw6Ly9mb28nLFxuICAgICAgICAnc2dubDovL2Zvby8nLFxuICAgICAgICAnc2dubDovL2Zvbz8nLFxuICAgICAgICAnU0dOTDovL2Zvbz8nLFxuICAgICAgICAnc2dubDovL3VzZXI6cGFzc0Bmb28nLFxuICAgICAgICAnc2dubDovL2Zvby9wYXRoL2RhdGEnLFxuICAgICAgXS5mb3JFYWNoKGhyZWYgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHBhcnNlU2dubEhyZWYoaHJlZiwgZXhwbG9kaW5nTG9nZ2VyKSwge1xuICAgICAgICAgIGNvbW1hbmQ6ICdmb28nLFxuICAgICAgICAgIGFyZ3M6IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCksXG4gICAgICAgICAgaGFzaDogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJwYXJzZXMgYSBjb21tYW5kJ3MgYXJndW1lbnRzXCIsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIHBhcnNlU2dubEhyZWYoXG4gICAgICAgICAgJ3Nnbmw6Ly9Gb28/YmFyPWJheiZxdXg9UXV1eCZudW09MTIzJmVtcHR5PSZlbmNvZGVkPWhlbGxvJTIwd29ybGQnLFxuICAgICAgICAgIGV4cGxvZGluZ0xvZ2dlclxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgY29tbWFuZDogJ0ZvbycsXG4gICAgICAgICAgYXJnczogbmV3IE1hcChbXG4gICAgICAgICAgICBbJ2JhcicsICdiYXonXSxcbiAgICAgICAgICAgIFsncXV4JywgJ1F1dXgnXSxcbiAgICAgICAgICAgIFsnbnVtJywgJzEyMyddLFxuICAgICAgICAgICAgWydlbXB0eScsICcnXSxcbiAgICAgICAgICAgIFsnZW5jb2RlZCcsICdoZWxsbyB3b3JsZCddLFxuICAgICAgICAgIF0pLFxuICAgICAgICAgIGhhc2g6IHVuZGVmaW5lZCxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmVhdHMgdGhlIHBvcnQgYXMgcGFydCBvZiB0aGUgY29tbWFuZCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgcGFyc2VTZ25sSHJlZignc2dubDovL2ZvbzoxMjM0JywgZXhwbG9kaW5nTG9nZ2VyKSxcbiAgICAgICAgJ2NvbW1hbmQnLFxuICAgICAgICAnZm9vOjEyMzQnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lnbm9yZXMgZHVwbGljYXRlIHF1ZXJ5IHBhcmFtZXRlcnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcFByb3BlcnR5VmFsKFxuICAgICAgICBwYXJzZVNnbmxIcmVmKCdzZ25sOi8veD9mb289YmFyJmZvbz10b3RhbGx5LWlnbm9yZWQnLCBleHBsb2RpbmdMb2dnZXIpLFxuICAgICAgICAnYXJncycsXG4gICAgICAgIG5ldyBNYXAoW1snZm9vJywgJ2JhciddXSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5jbHVkZXMgaGFzaCcsICgpID0+IHtcbiAgICAgIFtcbiAgICAgICAgJ3Nnbmw6Ly9mb28/YmFyPWJheiNzb21laGFzaCcsXG4gICAgICAgICdzZ25sOi8vdXNlcjpwYXNzQGZvbz9iYXI9YmF6I3NvbWVoYXNoJyxcbiAgICAgIF0uZm9yRWFjaChocmVmID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChwYXJzZVNnbmxIcmVmKGhyZWYsIGV4cGxvZGluZ0xvZ2dlciksIHtcbiAgICAgICAgICBjb21tYW5kOiAnZm9vJyxcbiAgICAgICAgICBhcmdzOiBuZXcgTWFwKFtbJ2JhcicsICdiYXonXV0pLFxuICAgICAgICAgIGhhc2g6ICdzb21laGFzaCcsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWdub3JlcyBvdGhlciBwYXJ0cyBvZiB0aGUgVVJMJywgKCkgPT4ge1xuICAgICAgW1xuICAgICAgICAnc2dubDovL2Zvbz9iYXI9YmF6JyxcbiAgICAgICAgJ3Nnbmw6Ly9mb28vP2Jhcj1iYXonLFxuICAgICAgICAnc2dubDovL2Zvby9sb3RzL29mL3BhdGg/YmFyPWJheicsXG4gICAgICAgICdzZ25sOi8vdXNlcjpwYXNzQGZvbz9iYXI9YmF6JyxcbiAgICAgIF0uZm9yRWFjaChocmVmID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChwYXJzZVNnbmxIcmVmKGhyZWYsIGV4cGxvZGluZ0xvZ2dlciksIHtcbiAgICAgICAgICBjb21tYW5kOiAnZm9vJyxcbiAgICAgICAgICBhcmdzOiBuZXcgTWFwKFtbJ2JhcicsICdiYXonXV0pLFxuICAgICAgICAgIGhhc2g6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KFwiZG9lc24ndCBkbyBhbnl0aGluZyBmYW5jeSB3aXRoIGFycmF5cyBvciBvYmplY3RzIGluIHRoZSBxdWVyeSBzdHJpbmdcIiwgKCkgPT4ge1xuICAgICAgLy8gVGhlIGBxc2AgbW9kdWxlIGRvZXMgdGhpbmdzIGxpa2UgdGhpcywgd2hpY2ggd2UgZG9uJ3Qgd2FudC5cbiAgICAgIGFzc2VydC5kZWVwUHJvcGVydHlWYWwoXG4gICAgICAgIHBhcnNlU2dubEhyZWYoJ3Nnbmw6Ly94P2Zvb1tdPWJhciZmb29bXT1iYXonLCBleHBsb2RpbmdMb2dnZXIpLFxuICAgICAgICAnYXJncycsXG4gICAgICAgIG5ldyBNYXAoW1snZm9vW10nLCAnYmFyJ11dKVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5kZWVwUHJvcGVydHlWYWwoXG4gICAgICAgIHBhcnNlU2dubEhyZWYoJ3Nnbmw6Ly94P2Zvb1tiYXJdW2Jhel09Zm9vYmFyYmF6JywgZXhwbG9kaW5nTG9nZ2VyKSxcbiAgICAgICAgJ2FyZ3MnLFxuICAgICAgICBuZXcgTWFwKFtbJ2Zvb1tiYXJdW2Jhel0nLCAnZm9vYmFyYmF6J11dKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNlQ2FwdGNoYUhyZWYnLCAoKSA9PiB7XG4gICAgaXQoJ3Rocm93cyBvbiBpbnZhbGlkIFVSTHMnLCAoKSA9PiB7XG4gICAgICBbJycsICdzZ25sJywgJ2h0dHBzOi8vZXhhbXBsZS8/Zm9vPWJhciddLmZvckVhY2goaHJlZiA9PiB7XG4gICAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICAgKCkgPT4gcGFyc2VDYXB0Y2hhSHJlZihocmVmLCBleHBsb2RpbmdMb2dnZXIpLFxuICAgICAgICAgICdOb3QgYSBjYXB0Y2hhIGhyZWYnXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgdGhlIGNvbW1hbmQgZm9yIFVSTHMgd2l0aCBubyBhcmd1bWVudHMnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgICdzaWduYWxjYXB0Y2hhOi8vZm9vJyxcbiAgICAgICAgJ3NpZ25hbGNhcHRjaGE6Ly9mb28/eD15JyxcbiAgICAgICAgJ3NpZ25hbGNhcHRjaGE6Ly9hOmJAZm9vP3g9eScsXG4gICAgICAgICdzaWduYWxjYXB0Y2hhOi8vZm9vI2hhc2gnLFxuICAgICAgICAnc2lnbmFsY2FwdGNoYTovL2Zvby8nLFxuICAgICAgXS5mb3JFYWNoKGhyZWYgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHBhcnNlQ2FwdGNoYUhyZWYoaHJlZiwgZXhwbG9kaW5nTG9nZ2VyKSwge1xuICAgICAgICAgIGNhcHRjaGE6ICdmb28nLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncGFyc2VFMTY0RnJvbVNpZ25hbERvdE1lSGFzaCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgZm9yIGludmFsaWQgaW5wdXRzJywgKCkgPT4ge1xuICAgICAgW1xuICAgICAgICAnJyxcbiAgICAgICAgJyBwLysxODg4NTU1MTIzNCcsXG4gICAgICAgICdwLysxODg4NTU1MTIzNCAnLFxuICAgICAgICAneC8rMTg4ODU1NTEyMzQnLFxuICAgICAgICAncC8rbm90YW51bWJlcicsXG4gICAgICAgICdwLzdjN2U4N2EwLTNiNzQtNGVmZC05YTAwLTZlYjhiMWRkNWJlOCcsXG4gICAgICAgICdwLyswODg4NTU1MTIzNCcsXG4gICAgICAgICdwLzE4ODg1NTUxMjM0JyxcbiAgICAgIF0uZm9yRWFjaChoYXNoID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHBhcnNlRTE2NEZyb21TaWduYWxEb3RNZUhhc2goaGFzaCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgRTE2NCBmb3IgdmFsaWQgaW5wdXRzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBwYXJzZUUxNjRGcm9tU2lnbmFsRG90TWVIYXNoKCdwLysxODg4NTU1MTIzNCcpLFxuICAgICAgICAnKzE4ODg1NTUxMjM0J1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgcGFyc2VFMTY0RnJvbVNpZ25hbERvdE1lSGFzaCgncC8rNDQxNjMyOTYwMTA0JyksXG4gICAgICAgICcrNDQxNjMyOTYwMTA0J1xuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNlU2lnbmFsSHR0cHNMaW5rJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGEgbnVsbCBjb21tYW5kIGZvciBpbnZhbGlkIFVSTHMnLCAoKSA9PiB7XG4gICAgICBbJycsICdodHRwcycsICdodHRwczovL2V4YW1wbGUvP2Zvbz1iYXInXS5mb3JFYWNoKGhyZWYgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHBhcnNlU2lnbmFsSHR0cHNMaW5rKGhyZWYsIGV4cGxvZGluZ0xvZ2dlciksIHtcbiAgICAgICAgICBjb21tYW5kOiBudWxsLFxuICAgICAgICAgIGFyZ3M6IG5ldyBNYXA8bmV2ZXIsIG5ldmVyPigpLFxuICAgICAgICAgIGhhc2g6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIHNpZ25hbC5hcnQgbGlua3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBwYXJzZVNpZ25hbEh0dHBzTGluayhcbiAgICAgICAgICAnaHR0cHM6Ly9zaWduYWwuYXJ0L2FkZHN0aWNrZXJzLyNwYWNrX2lkPWJheiZwYWNrX2tleT1RdXV4Jm51bT0xMjMmZW1wdHk9JmVuY29kZWQ9aGVsbG8lMjB3b3JsZCcsXG4gICAgICAgICAgZXhwbG9kaW5nTG9nZ2VyXG4gICAgICAgICksXG4gICAgICAgIHtcbiAgICAgICAgICBjb21tYW5kOiAnYWRkc3RpY2tlcnMnLFxuICAgICAgICAgIGFyZ3M6IG5ldyBNYXAoW1xuICAgICAgICAgICAgWydwYWNrX2lkJywgJ2JheiddLFxuICAgICAgICAgICAgWydwYWNrX2tleScsICdRdXV4J10sXG4gICAgICAgICAgICBbJ251bScsICcxMjMnXSxcbiAgICAgICAgICAgIFsnZW1wdHknLCAnJ10sXG4gICAgICAgICAgICBbJ2VuY29kZWQnLCAnaGVsbG8gd29ybGQnXSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBoYXNoOiAncGFja19pZD1iYXomcGFja19rZXk9UXV1eCZudW09MTIzJmVtcHR5PSZlbmNvZGVkPWhlbGxvJTIwd29ybGQnLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgc2lnbmFsLmdyb3VwIGxpbmtzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgcGFyc2VTaWduYWxIdHRwc0xpbmsoJ2h0dHBzOi8vc2lnbmFsLmdyb3VwLyNkYXRhJywgZXhwbG9kaW5nTG9nZ2VyKSxcbiAgICAgICAge1xuICAgICAgICAgIGNvbW1hbmQ6ICdzaWduYWwuZ3JvdXAnLFxuICAgICAgICAgIGFyZ3M6IG5ldyBNYXA8bmV2ZXIsIG5ldmVyPigpLFxuICAgICAgICAgIGhhc2g6ICdkYXRhJyxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIHNpZ25hbC5tZSBsaW5rcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIHBhcnNlU2lnbmFsSHR0cHNMaW5rKFxuICAgICAgICAgICdodHRwczovL3NpZ25hbC5tZS8jcC8rMTg4ODU1NTEyMzQnLFxuICAgICAgICAgIGV4cGxvZGluZ0xvZ2dlclxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgY29tbWFuZDogJ3NpZ25hbC5tZScsXG4gICAgICAgICAgYXJnczogbmV3IE1hcDxuZXZlciwgbmV2ZXI+KCksXG4gICAgICAgICAgaGFzaDogJ3AvKzE4ODg1NTUxMjM0JyxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Jld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5JywgKCkgPT4ge1xuICAgIGl0KCdyZXdyaXRlcyBodHRwOi8vc2lnbmFsLmdyb3VwIGhyZWZzLCBtYWtpbmcgdGhlbSB1c2UgSFRUUFMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHJld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5KCdodHRwOi8vc2lnbmFsLmdyb3VwLyNhYmMxMjMnKSxcbiAgICAgICAgJ2h0dHBzOi8vc2lnbmFsLmdyb3VwLyNhYmMxMjMnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jld3JpdGVzIGh0dHA6Ly9zaWduYWwuYXJ0IGhyZWZzLCBtYWtpbmcgdGhlbSB1c2UgSFRUUFMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHJld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5KFxuICAgICAgICAgICdodHRwOi8vc2lnbmFsLmFydC9hZGRzdGlja2Vycy8jcGFja19pZD1hYmMxMjMnXG4gICAgICAgICksXG4gICAgICAgICdodHRwczovL3NpZ25hbC5hcnQvYWRkc3RpY2tlcnMvI3BhY2tfaWQ9YWJjMTIzJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXdyaXRlcyBodHRwOi8vc2lnbmFsLm1lIGhyZWZzLCBtYWtpbmcgdGhlbSB1c2UgSFRUUFMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHJld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5KCdodHRwOi8vc2lnbmFsLm1lLyNwLysxODg4NTU1MTIzNCcpLFxuICAgICAgICAnaHR0cHM6Ly9zaWduYWwubWUvI3AvKzE4ODg1NTUxMjM0J1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGF1dGggaWYgcHJlc2VudCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgcmV3cml0ZVNpZ25hbEhyZWZzSWZOZWNlc3NhcnkoXG4gICAgICAgICAgJ2h0dHA6Ly91c2VyOnBhc3NAc2lnbmFsLmdyb3VwL2FiP2M9ZCNlZidcbiAgICAgICAgKSxcbiAgICAgICAgJ2h0dHBzOi8vc2lnbmFsLmdyb3VwL2FiP2M9ZCNlZidcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHJld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5KFxuICAgICAgICAgICdodHRwczovL3VzZXI6cGFzc0BzaWduYWwuZ3JvdXAvYWI/Yz1kI2VmJ1xuICAgICAgICApLFxuICAgICAgICAnaHR0cHM6Ly9zaWduYWwuZ3JvdXAvYWI/Yz1kI2VmJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdGhpbmcgdG8gb3RoZXIgaHJlZnMnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgIC8vIE5vcm1hbCBVUkxzXG4gICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAvLyBBbHJlYWR5IEhUVFBTXG4gICAgICAgICdodHRwczovL3NpZ25hbC5hcnQvYWRkc3RpY2tlcnMvI3BhY2tfaWQ9YWJjMTIzJyxcbiAgICAgICAgLy8gRGlmZmVyZW50IHBvcnRcbiAgICAgICAgJ2h0dHA6Ly9zaWduYWwuZ3JvdXA6MTIzNC9hYmM/ZD1lI2ZnJyxcbiAgICAgICAgLy8gRGlmZmVyZW50IHN1YmRvbWFpblxuICAgICAgICAnaHR0cDovL3N1YmRvbWFpbi5zaWduYWwuZ3JvdXAvI2FiY2RlZicsXG4gICAgICAgIC8vIERpZmZlcmVudCBwcm90b2NvbFxuICAgICAgICAnZnRwOi8vc2lnbmFsLmdyb3VwLyNhYmMxMjMnLFxuICAgICAgICAnZnRwOi8vdXNlcjpwYXNzQHNpZ25hbC5ncm91cC8jYWJjMTIzJyxcbiAgICAgIF0uZm9yRWFjaChocmVmID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJld3JpdGVTaWduYWxIcmVmc0lmTmVjZXNzYXJ5KGhyZWYpLCBocmVmKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixtQkFBa0I7QUFHbEIsc0JBU087QUFFUCwrQkFBK0I7QUFDN0IscUJBQU8sS0FBSyw2QkFBNkI7QUFDM0M7QUFGUyxBQUlULE1BQU0sa0JBQThCO0FBQUEsRUFDbEMsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsT0FBTztBQUNUO0FBRUEsU0FBUyxZQUFZLE1BQU07QUFDekI7QUFBQSxJ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
