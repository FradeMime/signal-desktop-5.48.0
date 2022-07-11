var import_chai = require("chai");
var import_LinkPreview = require("../../types/LinkPreview");
describe("Link previews", () => {
  describe("#shouldPreviewHref", () => {
    it("returns false for invalid URLs", () => {
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)(""));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https://"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https://bad url"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("example.com"));
    });
    it("returns false for non-HTTPS URLs", () => {
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("http://example.com"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("ftp://example.com"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("file://example"));
    });
    it('returns false if the link is "sneaky"', () => {
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https://user:pass@example.com"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https://aqu\xED.example"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https://aqu%C3%AD.example"));
    });
    it("returns false for skipped domains", () => {
      import_chai.assert.isFalse((0, import_LinkPreview.shouldPreviewHref)("https://debuglogs.org"));
    });
    it('returns true for "safe" urls', () => {
      import_chai.assert.isTrue((0, import_LinkPreview.shouldPreviewHref)("https://example.com"));
      import_chai.assert.isTrue((0, import_LinkPreview.shouldPreviewHref)("https://example.com/foo/bar?query=string#hash"));
    });
  });
  describe("#shouldLinkifyMessage;", () => {
    it("returns false for strings with directional override characters", () => {
      import_chai.assert.isFalse((0, import_LinkPreview.shouldLinkifyMessage)("\u202C"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldLinkifyMessage)("\u202D"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldLinkifyMessage)("\u202E"));
    });
    it("returns false for strings with unicode drawing characters", () => {
      import_chai.assert.isFalse((0, import_LinkPreview.shouldLinkifyMessage)("\u2500"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldLinkifyMessage)("\u2588"));
      import_chai.assert.isFalse((0, import_LinkPreview.shouldLinkifyMessage)("\u25FF"));
    });
    it("returns true other strings", () => {
      import_chai.assert.isTrue((0, import_LinkPreview.shouldLinkifyMessage)(null));
      import_chai.assert.isTrue((0, import_LinkPreview.shouldLinkifyMessage)(void 0));
      import_chai.assert.isTrue((0, import_LinkPreview.shouldLinkifyMessage)("Random other string aqu%C3%AD"));
    });
  });
  describe("#findLinks", () => {
    it("returns all links if no caretLocation is provided", () => {
      const text = "Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android";
      const expected = [
        "https://github.com/signalapp/Signal-Desktop",
        "https://github.com/signalapp/Signal-Android"
      ];
      const actual = (0, import_LinkPreview.findLinks)(text);
      import_chai.assert.deepEqual(expected, actual);
    });
    it("returns all links after emojis without spaces in between", () => {
      const text = "\u{1F60E}https://github.com/signalapp/Signal-Desktop\u{1F61B}";
      const expected = ["https://github.com/signalapp/Signal-Desktop"];
      const actual = (0, import_LinkPreview.findLinks)(text);
      import_chai.assert.deepEqual(expected, actual);
    });
    it("includes all links if cursor is not in a link", () => {
      const text = "Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android";
      const caretLocation = 10;
      const expected = [
        "https://github.com/signalapp/Signal-Desktop",
        "https://github.com/signalapp/Signal-Android"
      ];
      const actual = (0, import_LinkPreview.findLinks)(text, caretLocation);
      import_chai.assert.deepEqual(expected, actual);
    });
    it("excludes a link not at the end if the caret is inside of it", () => {
      const text = "Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android";
      const caretLocation = 30;
      const expected = ["https://github.com/signalapp/Signal-Android"];
      const actual = (0, import_LinkPreview.findLinks)(text, caretLocation);
      import_chai.assert.deepEqual(expected, actual);
    });
    it("excludes a link not at the end if the caret is at its end", () => {
      const text = "Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android";
      const caretLocation = 64;
      const expected = ["https://github.com/signalapp/Signal-Android"];
      const actual = (0, import_LinkPreview.findLinks)(text, caretLocation);
      import_chai.assert.deepEqual(expected, actual);
    });
    it("excludes a link at the end of the caret is inside of it", () => {
      const text = "Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android";
      const caretLocation = 100;
      const expected = ["https://github.com/signalapp/Signal-Desktop"];
      const actual = (0, import_LinkPreview.findLinks)(text, caretLocation);
      import_chai.assert.deepEqual(expected, actual);
    });
    it("includes link at the end if cursor is at its end", () => {
      const text = "Check out this link: https://github.com/signalapp/Signal-Desktop\nAnd this one too: https://github.com/signalapp/Signal-Android";
      const caretLocation = text.length;
      const expected = [
        "https://github.com/signalapp/Signal-Desktop",
        "https://github.com/signalapp/Signal-Android"
      ];
      const actual = (0, import_LinkPreview.findLinks)(text, caretLocation);
      import_chai.assert.deepEqual(expected, actual);
    });
  });
  describe("#isLinkSneaky", () => {
    it("returns true for =", () => {
      const link = "r.id=s.id";
      import_chai.assert.strictEqual((0, import_LinkPreview.isLinkSneaky)(link), true);
    });
    it("returns true for $", () => {
      const link = "r.id$s.id";
      import_chai.assert.strictEqual((0, import_LinkPreview.isLinkSneaky)(link), true);
    });
    it("returns true for +", () => {
      const link = "r.id+s.id";
      import_chai.assert.strictEqual((0, import_LinkPreview.isLinkSneaky)(link), true);
    });
    it("returns true for ^", () => {
      const link = "r.id^s.id";
      import_chai.assert.strictEqual((0, import_LinkPreview.isLinkSneaky)(link), true);
    });
    it("returns true for URLs with a length of 4097 or higher", () => {
      const href = `https://example.com/${"a".repeat(4077)}`;
      import_chai.assert.lengthOf(href, 4097, "Test href is not the proper length");
      import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)(href));
      import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)(`${href}?foo=bar`));
    });
    describe("auth", () => {
      it("returns true for hrefs with auth (or pretend auth)", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://user:pass@example.com"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://user:@example.com"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://:pass@example.com"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("http://whatever.com&login=someuser@77777777"));
      });
    });
    describe("domain", () => {
      it("returns false for all-latin domain", () => {
        const link = "https://www.amazon.com";
        const actual = (0, import_LinkPreview.isLinkSneaky)(link);
        import_chai.assert.strictEqual(actual, false);
      });
      it("returns false for IPv4 addresses", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://127.0.0.1/path"));
      });
      it("returns true for IPv6 addresses", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/path"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://[::]/path"));
      });
      it("returns true for Latin + Cyrillic domain", () => {
        const link = "https://www.a\u043Cazon.com";
        const actual = (0, import_LinkPreview.isLinkSneaky)(link);
        import_chai.assert.strictEqual(actual, true);
      });
      it("returns true for Latin + Greek domain", () => {
        const link = "https://www.\u03B1pple.com";
        const actual = (0, import_LinkPreview.isLinkSneaky)(link);
        import_chai.assert.strictEqual(actual, true);
      });
      it("returns true for ASCII and non-ASCII mix", () => {
        const link = "https://www.\u0430\u0440\u0440\u04CF\u0435.com";
        const actual = (0, import_LinkPreview.isLinkSneaky)(link);
        import_chai.assert.strictEqual(actual, true);
      });
      it("returns true for Latin + High Greek domain", () => {
        const link = `https://www.apple${String.fromCodePoint(65952)}.com`;
        const actual = (0, import_LinkPreview.isLinkSneaky)(link);
        import_chai.assert.strictEqual(actual, true);
      });
      it("returns true if the domain doesn't contain a .", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://localhost"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://localhost:3000"));
      });
      it("returns true if the domain has any empty labels", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example."));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com."));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://.example.com"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://..example.com"));
      });
      it("returns true if the domain is longer than 2048 UTF-16 code points", () => {
        const domain = `${"a".repeat(2041)}.example`;
        import_chai.assert.lengthOf(domain, 2049, "Test domain is the incorrect length");
        const link = `https://${domain}/foo/bar`;
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)(link));
      });
    });
    describe("pathname", () => {
      it("returns false for no pathname", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/"));
      });
      it("returns false if the pathname contains valid characters", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo/bar"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/:/[]@!$&'()*+,;=abc123-._~%"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://lbry.tv/@ScammerRevolts:b0/DELETING-EVERY-FILE-OFF-A-SCAMMERS-LAPTOP-Destroyed:1"));
      });
      it("returns true if the pathname contains invalid characters", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/hello world"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/aqu\xED-est\xE1"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/hello\0world"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/hello\nworld"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/hello\u{1F608}world"));
      });
    });
    describe("query string", () => {
      it("returns false for no query", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?"));
      });
      it("returns false if the query string contains valid characters", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?bar"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?bar=baz"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?bar=:/[]@!$&'()*+,;=abc123-._~%"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?:/[]@!$&'()*+,;=abc123-._~%=baz"));
      });
      it("returns true if the query string contains invalid characters", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?bar baz"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?bar baz=qux"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?bar=baz qux"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?aqu\xED=est\xE1"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?hello=\0world"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?hello=hello\nworld"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo?hello=\u{1F608}world"));
      });
    });
    describe("hash", () => {
      it("returns false for no hash", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#"));
      });
      it("returns false if the hash contains valid characters", () => {
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#bar"));
        import_chai.assert.isFalse((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#:/[]@!$&'()*+,;=abc123-._~%"));
      });
      it("returns true if the hash contains invalid characters", () => {
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#bar baz"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#bar baz=qux"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#bar=baz qux"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#aqu\xED_est\xE1"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#hello\0world"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#hello\nworld"));
        import_chai.assert.isTrue((0, import_LinkPreview.isLinkSneaky)("https://example.com/foo#hello\u{1F608}world"));
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlua1ByZXZpZXdfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQge1xuICBmaW5kTGlua3MsXG4gIHNob3VsZExpbmtpZnlNZXNzYWdlLFxuICBzaG91bGRQcmV2aWV3SHJlZixcbiAgaXNMaW5rU25lYWt5LFxufSBmcm9tICcuLi8uLi90eXBlcy9MaW5rUHJldmlldyc7XG5cbmRlc2NyaWJlKCdMaW5rIHByZXZpZXdzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnI3Nob3VsZFByZXZpZXdIcmVmJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpbnZhbGlkIFVSTHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRQcmV2aWV3SHJlZignJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkUHJldmlld0hyZWYoJ2h0dHBzJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkUHJldmlld0hyZWYoJ2h0dHBzOi8vJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkUHJldmlld0hyZWYoJ2h0dHBzOi8vYmFkIHVybCcpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHNob3VsZFByZXZpZXdIcmVmKCdleGFtcGxlLmNvbScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tSFRUUFMgVVJMcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHNob3VsZFByZXZpZXdIcmVmKCdodHRwOi8vZXhhbXBsZS5jb20nKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRQcmV2aWV3SHJlZignZnRwOi8vZXhhbXBsZS5jb20nKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRQcmV2aWV3SHJlZignZmlsZTovL2V4YW1wbGUnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgbGluayBpcyBcInNuZWFreVwiJywgKCkgPT4ge1xuICAgICAgLy8gU2VlIGBpc0xpbmtTbmVha3lgIHRlc3RzIGJlbG93IGZvciBtb3JlIHRob3JvdWdoIGNoZWNraW5nLlxuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkUHJldmlld0hyZWYoJ2h0dHBzOi8vdXNlcjpwYXNzQGV4YW1wbGUuY29tJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkUHJldmlld0hyZWYoJ2h0dHBzOi8vYXF1XHUwMEVELmV4YW1wbGUnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRQcmV2aWV3SHJlZignaHR0cHM6Ly9hcXUlQzMlQUQuZXhhbXBsZScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBza2lwcGVkIGRvbWFpbnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRQcmV2aWV3SHJlZignaHR0cHM6Ly9kZWJ1Z2xvZ3Mub3JnJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgXCJzYWZlXCIgdXJscycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoc2hvdWxkUHJldmlld0hyZWYoJ2h0dHBzOi8vZXhhbXBsZS5jb20nKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBzaG91bGRQcmV2aWV3SHJlZignaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28vYmFyP3F1ZXJ5PXN0cmluZyNoYXNoJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjc2hvdWxkTGlua2lmeU1lc3NhZ2U7JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBzdHJpbmdzIHdpdGggZGlyZWN0aW9uYWwgb3ZlcnJpZGUgY2hhcmFjdGVycycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHNob3VsZExpbmtpZnlNZXNzYWdlKCdcXHUyMDJjJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkTGlua2lmeU1lc3NhZ2UoJ1xcdTIwMmQnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRMaW5raWZ5TWVzc2FnZSgnXFx1MjAyZScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBzdHJpbmdzIHdpdGggdW5pY29kZSBkcmF3aW5nIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShzaG91bGRMaW5raWZ5TWVzc2FnZSgnXFx1MjUwMCcpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHNob3VsZExpbmtpZnlNZXNzYWdlKCdcXHUyNTg4JykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc2hvdWxkTGlua2lmeU1lc3NhZ2UoJ1xcdTI1RkYnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG90aGVyIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKHNob3VsZExpbmtpZnlNZXNzYWdlKG51bGwpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoc2hvdWxkTGlua2lmeU1lc3NhZ2UodW5kZWZpbmVkKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKHNob3VsZExpbmtpZnlNZXNzYWdlKCdSYW5kb20gb3RoZXIgc3RyaW5nIGFxdSVDMyVBRCcpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNmaW5kTGlua3MnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYWxsIGxpbmtzIGlmIG5vIGNhcmV0TG9jYXRpb24gaXMgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ0NoZWNrIG91dCB0aGlzIGxpbms6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLURlc2t0b3BcXG5BbmQgdGhpcyBvbmUgdG9vOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1BbmRyb2lkJztcblxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1EZXNrdG9wJyxcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLUFuZHJvaWQnLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gZmluZExpbmtzKHRleHQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChleHBlY3RlZCwgYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFsbCBsaW5rcyBhZnRlciBlbW9qaXMgd2l0aG91dCBzcGFjZXMgaW4gYmV0d2VlbicsICgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSAnXHVEODNEXHVERTBFaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtRGVza3RvcFx1RDgzRFx1REUxQic7XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gWydodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1EZXNrdG9wJ107XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGZpbmRMaW5rcyh0ZXh0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZXhwZWN0ZWQsIGFjdHVhbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5jbHVkZXMgYWxsIGxpbmtzIGlmIGN1cnNvciBpcyBub3QgaW4gYSBsaW5rJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9XG4gICAgICAgICdDaGVjayBvdXQgdGhpcyBsaW5rOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1EZXNrdG9wXFxuQW5kIHRoaXMgb25lIHRvbzogaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtQW5kcm9pZCc7XG4gICAgICBjb25zdCBjYXJldExvY2F0aW9uID0gMTA7XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gW1xuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtRGVza3RvcCcsXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1BbmRyb2lkJyxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGZpbmRMaW5rcyh0ZXh0LCBjYXJldExvY2F0aW9uKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZXhwZWN0ZWQsIGFjdHVhbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZXhjbHVkZXMgYSBsaW5rIG5vdCBhdCB0aGUgZW5kIGlmIHRoZSBjYXJldCBpcyBpbnNpZGUgb2YgaXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ0NoZWNrIG91dCB0aGlzIGxpbms6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLURlc2t0b3BcXG5BbmQgdGhpcyBvbmUgdG9vOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1BbmRyb2lkJztcbiAgICAgIGNvbnN0IGNhcmV0TG9jYXRpb24gPSAzMDtcblxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLUFuZHJvaWQnXTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gZmluZExpbmtzKHRleHQsIGNhcmV0TG9jYXRpb24pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChleHBlY3RlZCwgYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdleGNsdWRlcyBhIGxpbmsgbm90IGF0IHRoZSBlbmQgaWYgdGhlIGNhcmV0IGlzIGF0IGl0cyBlbmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID1cbiAgICAgICAgJ0NoZWNrIG91dCB0aGlzIGxpbms6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLURlc2t0b3BcXG5BbmQgdGhpcyBvbmUgdG9vOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1BbmRyb2lkJztcbiAgICAgIGNvbnN0IGNhcmV0TG9jYXRpb24gPSA2NDtcblxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLUFuZHJvaWQnXTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gZmluZExpbmtzKHRleHQsIGNhcmV0TG9jYXRpb24pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChleHBlY3RlZCwgYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdleGNsdWRlcyBhIGxpbmsgYXQgdGhlIGVuZCBvZiB0aGUgY2FyZXQgaXMgaW5zaWRlIG9mIGl0JywgKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9XG4gICAgICAgICdDaGVjayBvdXQgdGhpcyBsaW5rOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1EZXNrdG9wXFxuQW5kIHRoaXMgb25lIHRvbzogaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtQW5kcm9pZCc7XG4gICAgICBjb25zdCBjYXJldExvY2F0aW9uID0gMTAwO1xuXG4gICAgICBjb25zdCBleHBlY3RlZCA9IFsnaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtRGVza3RvcCddO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBmaW5kTGlua3ModGV4dCwgY2FyZXRMb2NhdGlvbik7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGV4cGVjdGVkLCBhY3R1YWwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2luY2x1ZGVzIGxpbmsgYXQgdGhlIGVuZCBpZiBjdXJzb3IgaXMgYXQgaXRzIGVuZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPVxuICAgICAgICAnQ2hlY2sgb3V0IHRoaXMgbGluazogaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtRGVza3RvcFxcbkFuZCB0aGlzIG9uZSB0b286IGh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLUFuZHJvaWQnO1xuICAgICAgY29uc3QgY2FyZXRMb2NhdGlvbiA9IHRleHQubGVuZ3RoO1xuXG4gICAgICBjb25zdCBleHBlY3RlZCA9IFtcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLURlc2t0b3AnLFxuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtQW5kcm9pZCcsXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBmaW5kTGlua3ModGV4dCwgY2FyZXRMb2NhdGlvbik7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGV4cGVjdGVkLCBhY3R1YWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2lzTGlua1NuZWFreScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciA9JywgKCkgPT4ge1xuICAgICAgY29uc3QgbGluayA9ICdyLmlkPXMuaWQnO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzTGlua1NuZWFreShsaW5rKSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciAkJywgKCkgPT4ge1xuICAgICAgY29uc3QgbGluayA9ICdyLmlkJHMuaWQnO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzTGlua1NuZWFreShsaW5rKSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciArJywgKCkgPT4ge1xuICAgICAgY29uc3QgbGluayA9ICdyLmlkK3MuaWQnO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzTGlua1NuZWFreShsaW5rKSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBeJywgKCkgPT4ge1xuICAgICAgY29uc3QgbGluayA9ICdyLmlkXnMuaWQnO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzTGlua1NuZWFreShsaW5rKSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBVUkxzIHdpdGggYSBsZW5ndGggb2YgNDA5NyBvciBoaWdoZXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBocmVmID0gYGh0dHBzOi8vZXhhbXBsZS5jb20vJHsnYScucmVwZWF0KDQwNzcpfWA7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoaHJlZiwgNDA5NywgJ1Rlc3QgaHJlZiBpcyBub3QgdGhlIHByb3BlciBsZW5ndGgnKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koaHJlZikpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koYCR7aHJlZn0/Zm9vPWJhcmApKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhdXRoJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgaHJlZnMgd2l0aCBhdXRoIChvciBwcmV0ZW5kIGF1dGgpJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly91c2VyOnBhc3NAZXhhbXBsZS5jb20nKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovL3VzZXI6QGV4YW1wbGUuY29tJykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly86cGFzc0BleGFtcGxlLmNvbScpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgICBpc0xpbmtTbmVha3koJ2h0dHA6Ly93aGF0ZXZlci5jb20mbG9naW49c29tZXVzZXJANzc3Nzc3NzcnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZG9tYWluJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGFsbC1sYXRpbiBkb21haW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSAnaHR0cHM6Ly93d3cuYW1hem9uLmNvbSc7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IGlzTGlua1NuZWFreShsaW5rKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBJUHY0IGFkZHJlc3NlcycsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNMaW5rU25lYWt5KCdodHRwczovLzEyNy4wLjAuMS9wYXRoJykpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCB0aGlzIHNob3VsZCByZXR1cm4gYGZhbHNlYCBidXQgd2UnZCBuZWVkIHRvIGFkZCBzcGVjaWFsIGxvZ2ljXG4gICAgICAvLyAgIGZvciBpdC5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIElQdjYgYWRkcmVzc2VzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICAgIGlzTGlua1NuZWFreSgnaHR0cHM6Ly9bMjAwMTowZGI4Ojg1YTM6MDAwMDowMDAwOjhhMmU6MDM3MDo3MzM0XS9wYXRoJylcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vWzo6XS9wYXRoJykpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIExhdGluICsgQ3lyaWxsaWMgZG9tYWluJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBsaW5rID0gJ2h0dHBzOi8vd3d3LmFcdTA0M0Nhem9uLmNvbSc7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IGlzTGlua1NuZWFreShsaW5rKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgTGF0aW4gKyBHcmVlayBkb21haW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSAnaHR0cHM6Ly93d3cuXHUwM0IxcHBsZS5jb20nO1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmtTbmVha3kobGluayk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIEFTQ0lJIGFuZCBub24tQVNDSUkgbWl4JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBsaW5rID0gJ2h0dHBzOi8vd3d3Llx1MDQzMFx1MDQ0MFx1MDQ0MFx1MDRDRlx1MDQzNS5jb20nO1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmtTbmVha3kobGluayk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIExhdGluICsgSGlnaCBHcmVlayBkb21haW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBgaHR0cHM6Ly93d3cuYXBwbGUke1N0cmluZy5mcm9tQ29kZVBvaW50KDB4MTAxYTApfS5jb21gO1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBpc0xpbmtTbmVha3kobGluayk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KFwicmV0dXJucyB0cnVlIGlmIHRoZSBkb21haW4gZG9lc24ndCBjb250YWluIGEgLlwiLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovL2V4YW1wbGUnKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovL2xvY2FsaG9zdCcpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vbG9jYWxob3N0OjMwMDAnKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgZG9tYWluIGhhcyBhbnkgZW1wdHkgbGFiZWxzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLicpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20uJykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly8uZXhhbXBsZS5jb20nKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovLy4uZXhhbXBsZS5jb20nKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgZG9tYWluIGlzIGxvbmdlciB0aGFuIDIwNDggVVRGLTE2IGNvZGUgcG9pbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBkb21haW4gPSBgJHsnYScucmVwZWF0KDIwNDEpfS5leGFtcGxlYDtcbiAgICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGRvbWFpbiwgMjA0OSwgJ1Rlc3QgZG9tYWluIGlzIHRoZSBpbmNvcnJlY3QgbGVuZ3RoJyk7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBgaHR0cHM6Ly8ke2RvbWFpbn0vZm9vL2JhcmA7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KGxpbmspKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3BhdGhuYW1lJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vIHBhdGhuYW1lJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20nKSk7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS8nKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIHBhdGhuYW1lIGNvbnRhaW5zIHZhbGlkIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28nKSk7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28vYmFyJykpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBpc0xpbmtTbmVha3koXCJodHRwczovL2V4YW1wbGUuY29tLzovW11AISQmJygpKissOz1hYmMxMjMtLl9+JVwiKVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBpc0xpbmtTbmVha3koXG4gICAgICAgICAgICAnaHR0cHM6Ly9sYnJ5LnR2L0BTY2FtbWVyUmV2b2x0czpiMC9ERUxFVElORy1FVkVSWS1GSUxFLU9GRi1BLVNDQU1NRVJTLUxBUFRPUC1EZXN0cm95ZWQ6MSdcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgcGF0aG5hbWUgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9oZWxsbyB3b3JsZCcpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vYXF1XHUwMEVELWVzdFx1MDBFMScpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vaGVsbG9cXHgwMHdvcmxkJykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9oZWxsb1xcbndvcmxkJykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9oZWxsb1x1RDgzRFx1REUwOHdvcmxkJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncXVlcnkgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vIHF1ZXJ5JywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vJykpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vPycpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgcXVlcnkgc3RyaW5nIGNvbnRhaW5zIHZhbGlkIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28/YmFyJykpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vP2Jhcj1iYXonKSk7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICAgIGlzTGlua1NuZWFreShcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28/YmFyPTovW11AISQmJygpKissOz1hYmMxMjMtLl9+JVwiXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBpc0xpbmtTbmVha3koXG4gICAgICAgICAgICBcImh0dHBzOi8vZXhhbXBsZS5jb20vZm9vPzovW11AISQmJygpKissOz1hYmMxMjMtLl9+JT1iYXpcIlxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBxdWVyeSBzdHJpbmcgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28/YmFyIGJheicpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vP2JhciBiYXo9cXV4JykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28/YmFyPWJheiBxdXgnKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovL2V4YW1wbGUuY29tL2Zvbz9hcXVcdTAwRUQ9ZXN0XHUwMEUxJykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28/aGVsbG89XFx4MDB3b3JsZCcpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgICBpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vP2hlbGxvPWhlbGxvXFxud29ybGQnKVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28/aGVsbG89XHVEODNEXHVERTA4d29ybGQnKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNoJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vIGhhc2gnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28nKSk7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28jJykpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBoYXNoIGNvbnRhaW5zIHZhbGlkIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28jYmFyJykpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBpc0xpbmtTbmVha3koXCJodHRwczovL2V4YW1wbGUuY29tL2ZvbyM6L1tdQCEkJicoKSorLDs9YWJjMTIzLS5ffiVcIilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBoYXNoIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycycsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vI2JhciBiYXonKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovL2V4YW1wbGUuY29tL2ZvbyNiYXIgYmF6PXF1eCcpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vI2Jhcj1iYXogcXV4JykpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGlzTGlua1NuZWFreSgnaHR0cHM6Ly9leGFtcGxlLmNvbS9mb28jYXF1XHUwMEVEX2VzdFx1MDBFMScpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vI2hlbGxvXFx4MDB3b3JsZCcpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0xpbmtTbmVha3koJ2h0dHBzOi8vZXhhbXBsZS5jb20vZm9vI2hlbGxvXFxud29ybGQnKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoaXNMaW5rU25lYWt5KCdodHRwczovL2V4YW1wbGUuY29tL2ZvbyNoZWxsb1x1RDgzRFx1REUwOHdvcmxkJykp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
