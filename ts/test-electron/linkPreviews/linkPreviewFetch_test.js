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
var import_node_fetch = require("node-fetch");
var sinon = __toESM(require("sinon"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_abort_controller = __toESM(require("abort-controller"));
var import_MIME = require("../../types/MIME");
var import_linkPreviewFetch = require("../../linkPreviews/linkPreviewFetch");
describe("link preview fetching", () => {
  function stub() {
    return sinon.stub();
  }
  let warn;
  let logger;
  beforeEach(() => {
    warn = sinon.stub();
    logger = { warn };
  });
  describe("fetchLinkPreviewMetadata", () => {
    const makeHtml = /* @__PURE__ */ __name((stuffInHead = []) => `
    <!doctype html>
    <html>
      <head>${stuffInHead.join("\n")}</head>
      <body>should be ignored</body>
    </html>
    `, "makeHtml");
    const makeResponse = /* @__PURE__ */ __name(({
      status = 200,
      headers = {},
      body = makeHtml(["<title>test title</title>"]),
      url = "https://example.com"
    } = {}) => {
      let bodyLength;
      let bodyStream;
      if (!body) {
        bodyLength = 0;
        bodyStream = null;
      } else if (typeof body === "string") {
        const asBytes = new TextEncoder().encode(body);
        bodyLength = asBytes.length;
        bodyStream = async function* stream() {
          yield asBytes;
        }();
      } else if (body instanceof Uint8Array) {
        bodyLength = body.length;
        bodyStream = async function* stream() {
          yield body;
        }();
      } else {
        bodyLength = null;
        bodyStream = body;
      }
      const headersObj = new Headers();
      Object.entries({
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": bodyLength === null ? null : String(bodyLength),
        ...headers
      }).forEach(([headerName, headerValue]) => {
        if (headerValue) {
          headersObj.set(headerName, headerValue);
        }
      });
      return {
        headers: headersObj,
        body: bodyStream,
        ok: status >= 200 && status <= 299,
        status,
        url
      };
    }, "makeResponse");
    it('handles the "kitchen sink" of results', async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          '<meta property="og:title" content="test title">',
          '<meta property="og:description" content="test description">',
          '<meta property="og:image" content="https://example.com/image.jpg">',
          '<meta property="og:published_time" content="2020-04-20T12:34:56.009Z">'
        ])
      }));
      import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
        title: "test title",
        description: "test description",
        date: 1587386096009,
        imageHref: "https://example.com/image.jpg"
      });
    });
    it("handles image href sources in the correct order", async () => {
      const orderedImageHrefSources = [
        {
          tag: '<meta property="og:image" content="https://example.com/og-image.jpg">',
          expectedHref: "https://example.com/og-image.jpg"
        },
        {
          tag: '<meta property="og:image:url" content="https://example.com/og-image-url.jpg">',
          expectedHref: "https://example.com/og-image-url.jpg"
        },
        {
          tag: '<link rel="apple-touch-icon" href="https://example.com/apple-touch-icon.jpg">',
          expectedHref: "https://example.com/apple-touch-icon.jpg"
        },
        {
          tag: '<link rel="apple-touch-icon-precomposed" href="https://example.com/apple-touch-icon-precomposed.jpg">',
          expectedHref: "https://example.com/apple-touch-icon-precomposed.jpg"
        },
        {
          tag: '<link rel="shortcut icon" href="https://example.com/shortcut-icon.jpg">',
          expectedHref: "https://example.com/shortcut-icon.jpg"
        },
        {
          tag: '<link rel="icon" href="https://example.com/icon.jpg">',
          expectedHref: "https://example.com/icon.jpg"
        }
      ];
      for (let i = orderedImageHrefSources.length - 1; i >= 0; i -= 1) {
        const imageTags = orderedImageHrefSources.slice(i).map(({ tag }) => tag).reverse();
        const fakeFetch = stub().resolves(makeResponse({
          body: makeHtml([
            '<meta property="og:title" content="test title">',
            ...imageTags
          ])
        }));
        const val = await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal);
        import_chai.assert.propertyVal(val, "imageHref", orderedImageHrefSources[i].expectedHref);
      }
    });
    it("logs no warnings if everything goes smoothly", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          '<meta property="og:title" content="test title">',
          '<meta property="og:description" content="test description">',
          '<meta property="og:image" content="https://example.com/image.jpg">',
          '<meta property="og:published_time" content="2020-04-20T12:34:56.009Z">'
        ])
      }));
      await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger);
      sinon.assert.notCalled(warn);
    });
    it("sends WhatsApp as the User-Agent for compatibility", async () => {
      const fakeFetch = stub().resolves(makeResponse());
      await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal);
      sinon.assert.calledWith(fakeFetch, "https://example.com", sinon.match({
        headers: {
          "User-Agent": "WhatsApp/2"
        }
      }));
    });
    it("returns null if the request fails", async () => {
      const fakeFetch = stub().rejects(new Error("Test request failure"));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewMetadata: failed to fetch link preview HTML; bailing");
    });
    it("returns null if the response status code isn't 2xx", async () => {
      await Promise.all([100, 304, 400, 404, 500, 0, -200].map(async (status) => {
        const fakeFetch = stub().resolves(makeResponse({ status }));
        import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
        sinon.assert.calledWith(warn, `fetchLinkPreviewMetadata: got a ${status} status code; bailing`);
      }));
    });
    it("doesn't use fetch's automatic redirection behavior", async () => {
      const fakeFetch = stub().resolves(makeResponse());
      await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal);
      sinon.assert.calledWith(fakeFetch, "https://example.com", sinon.match({ redirect: "manual" }));
    });
    [301, 302, 303, 307, 308].forEach((status) => {
      it(`handles ${status} redirects`, async () => {
        const fakeFetch = stub();
        fakeFetch.onFirstCall().resolves(makeResponse({
          status,
          headers: { Location: "https://example.com/2" },
          body: null
        }));
        fakeFetch.onSecondCall().resolves(makeResponse());
        import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
          title: "test title",
          description: null,
          date: null,
          imageHref: null
        });
        sinon.assert.calledTwice(fakeFetch);
        sinon.assert.calledWith(fakeFetch.getCall(0), "https://example.com");
        sinon.assert.calledWith(fakeFetch.getCall(1), "https://example.com/2");
      });
      it(`returns null when seeing a ${status} status with no Location header`, async () => {
        const fakeFetch = stub().resolves(makeResponse({ status }));
        import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal));
      });
    });
    it("handles relative redirects", async () => {
      const fakeFetch = stub();
      fakeFetch.onFirstCall().resolves(makeResponse({
        status: 301,
        headers: { Location: "/2/" },
        body: null
      }));
      fakeFetch.onSecondCall().resolves(makeResponse({
        status: 301,
        headers: { Location: "3" },
        body: null
      }));
      fakeFetch.onThirdCall().resolves(makeResponse());
      import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
        title: "test title",
        description: null,
        date: null,
        imageHref: null
      });
      sinon.assert.calledThrice(fakeFetch);
      sinon.assert.calledWith(fakeFetch.getCall(0), "https://example.com");
      sinon.assert.calledWith(fakeFetch.getCall(1), "https://example.com/2/");
      sinon.assert.calledWith(fakeFetch.getCall(2), "https://example.com/2/3");
    });
    it("returns null if redirecting to an insecure HTTP URL", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        status: 301,
        headers: { Location: "http://example.com" },
        body: null
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal));
      sinon.assert.calledOnce(fakeFetch);
    });
    it("returns null if there's a redirection loop", async () => {
      const fakeFetch = stub();
      fakeFetch.onFirstCall().resolves(makeResponse({
        status: 301,
        headers: { Location: "/2/" },
        body: null
      }));
      fakeFetch.onSecondCall().resolves(makeResponse({
        status: 301,
        headers: { Location: "/start" },
        body: null
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com/start", new import_abort_controller.default().signal));
      sinon.assert.calledTwice(fakeFetch);
    });
    it("returns null if redirecting more than 20 times", async () => {
      const fakeFetch = stub().callsFake(async () => makeResponse({
        status: 301,
        headers: { Location: `/${Math.random()}` },
        body: null
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com/start", new import_abort_controller.default().signal));
      sinon.assert.callCount(fakeFetch, 20);
    });
    it("returns null if the response has no body", async () => {
      const fakeFetch = stub().resolves(makeResponse({ body: null }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
      sinon.assert.calledWith(warn, "fetchLinkPreviewMetadata: no response body; bailing");
    });
    it("returns null if the result body is too short", async () => {
      const fakeFetch = stub().resolves(makeResponse({ body: "<title>" }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewMetadata: Content-Length is too short; bailing");
    });
    it("returns null if the result is meant to be downloaded", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        headers: { "Content-Disposition": "attachment" }
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewMetadata: Content-Disposition header is not inline; bailing");
    });
    it("allows an explicitly inline Content-Disposition header", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        headers: { "Content-Disposition": "inline" }
      }));
      import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
        title: "test title",
        description: null,
        date: null,
        imageHref: null
      });
    });
    it("returns null if the Content-Type is not HTML", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        headers: { "Content-Type": "text/plain" }
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewMetadata: Content-Type is not HTML; bailing");
    });
    it("accepts non-lowercase Content-Type headers", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        headers: { "Content-Type": "TEXT/HTML; chArsEt=utf-8" }
      }));
      import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
        title: "test title",
        description: null,
        date: null,
        imageHref: null
      });
    });
    it("parses the response as UTF-8 if the body contains a byte order mark", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        headers: {
          "Content-Type": "text/html"
        },
        body: async function* body() {
          yield new Uint8Array([239, 187, 191]);
          yield new TextEncoder().encode("<!doctype html><title>\u{1F389}</title>");
        }()
      }));
      import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
        title: "\u{1F389}",
        description: null,
        date: null,
        imageHref: null
      });
    });
    it("respects the UTF-8 byte order mark above the Content-Type header", async () => {
      const bom = new Uint8Array([239, 187, 191]);
      const titleHtml = new TextEncoder().encode("<title>\u{1F389}</title>");
      const fakeFetch = stub().resolves(makeResponse({
        headers: {
          "Content-Type": "text/html; charset=latin1"
        },
        body: async function* body() {
          yield bom;
          yield titleHtml;
        }()
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "\u{1F389}");
    });
    it("respects the UTF-8 byte order mark above a <meta http-equiv> in the document", async () => {
      const bom = new Uint8Array([239, 187, 191]);
      const titleHtml = new TextEncoder().encode("<title>\u{1F389}</title>");
      const endHeadHtml = new TextEncoder().encode("</head>");
      const fakeFetch = stub().resolves(makeResponse({
        headers: {
          "Content-Type": "text/html"
        },
        body: async function* body() {
          yield bom;
          yield new TextEncoder().encode('<!doctype html><head><meta http-equiv="content-type" content="text/html; charset=latin1">');
          yield titleHtml;
          yield endHeadHtml;
        }()
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "\u{1F389}");
    });
    it("respects the UTF-8 byte order mark above a <meta charset> in the document", async () => {
      const bom = new Uint8Array([239, 187, 191]);
      const titleHtml = new TextEncoder().encode("<title>\u{1F389}</title>");
      const endHeadHtml = new TextEncoder().encode("</head>");
      const fakeFetch = stub().resolves(makeResponse({
        headers: {
          "Content-Type": "text/html"
        },
        body: async function* body() {
          yield bom;
          yield new TextEncoder().encode('<!doctype html><head><meta charset="utf-8">');
          yield titleHtml;
          yield endHeadHtml;
        }()
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "\u{1F389}");
    });
    it("respects the Content-Type header above anything in the HTML", async () => {
      const titleHtml = new TextEncoder().encode("<title>\u{1F389}</title>");
      const endHeadHtml = new TextEncoder().encode("</head>");
      {
        const fakeFetch = stub().resolves(makeResponse({
          headers: {
            "Content-Type": "text/html; charset=utf-8"
          },
          body: async function* body() {
            yield new TextEncoder().encode('<!doctype html><head><meta http-equiv="content-type" content="text/html; charset=latin1">');
            yield titleHtml;
            yield endHeadHtml;
          }()
        }));
        import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "\u{1F389}");
      }
      {
        const fakeFetch = stub().resolves(makeResponse({
          headers: {
            "Content-Type": "text/html; charset=utf-8"
          },
          body: async function* body() {
            yield new TextEncoder().encode('<!doctype html><head><meta charset="utf-8">');
            yield titleHtml;
            yield endHeadHtml;
          }()
        }));
        import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "\u{1F389}");
      }
    });
    it("prefers the Content-Type http-equiv in the HTML above <meta charset>", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        headers: {
          "Content-Type": "text/html"
        },
        body: makeHtml([
          '<meta http-equiv="content-type" content="text/html; charset=utf8">',
          '<meta charset="latin1">',
          "<title>\u{1F389}</title>"
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "\u{1F389}");
    });
    it("parses non-UTF8 encodings", async () => {
      const titleBytes = new Uint8Array([97, 113, 117, 237]);
      import_chai.assert.notDeepEqual(new TextDecoder("utf8").decode(titleBytes), new TextDecoder("latin1").decode(titleBytes), "Test data was not set up correctly");
      const fakeFetch = stub().resolves(makeResponse({
        headers: {
          "Content-Type": "text/html; charset=latin1"
        },
        body: async function* body() {
          yield new TextEncoder().encode("<title>");
          yield titleBytes;
          yield new TextEncoder().encode("</title>");
        }()
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "aqu\xED");
    });
    it("handles incomplete bodies", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: async function* body() {
          yield new TextEncoder().encode("<!doctype html><head><title>foo bar</title><meta");
          throw new Error("Test request error");
        }()
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger), "title", "foo bar");
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "getHtmlDocument: error when reading body; continuing with what we got");
    });
    it("stops reading the body after cancelation", async () => {
      const shouldNeverBeCalled = sinon.stub();
      const abortController = new import_abort_controller.default();
      const fakeFetch = stub().resolves(makeResponse({
        body: async function* body() {
          yield new TextEncoder().encode("<!doctype html><head>");
          abortController.abort();
          yield new TextEncoder().encode("<title>should be dropped</title>");
          shouldNeverBeCalled();
        }()
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", abortController.signal));
      sinon.assert.notCalled(shouldNeverBeCalled);
    });
    it("stops reading bodies after 1000 kilobytes", async function test() {
      const shouldNeverBeCalled = sinon.stub();
      const fakeFetch = stub().resolves(makeResponse({
        body: async function* body() {
          yield new TextEncoder().encode("<!doctype html><head><title>foo bar</title>");
          const spaces = new Uint8Array(250 * 1024).fill(32);
          yield spaces;
          yield spaces;
          yield spaces;
          yield spaces;
          yield spaces;
          shouldNeverBeCalled();
          yield new TextEncoder().encode('<meta property="og:description" content="should be ignored">');
        }()
      }));
      import_chai.assert.deepEqual(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), {
        title: "foo bar",
        description: null,
        date: null,
        imageHref: null
      });
      sinon.assert.notCalled(shouldNeverBeCalled);
    });
    it("returns null if the HTML doesn't contain a title, even if it contains other values", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          '<meta property="og:description" content="ignored">',
          '<meta property="og:image" content="https://example.com/ignored.jpg">',
          `<meta property="og:published_time" content="${new Date().toISOString()}">`
        ])
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "parseMetadata: HTML document doesn't have a title; bailing");
    });
    it("prefers og:title to document.title", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>ignored</title>",
          '<meta property="og:title" content="foo bar">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "title", "foo bar");
    });
    it('prefers og:description to <meta name="description">', async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta name="description" content="ignored">',
          '<meta property="og:description" content="bar">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "description", "bar");
    });
    it('parses <meta name="description">', async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta name="description" content="bar">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "description", "bar");
    });
    it("ignores empty descriptions", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta property="og:description" content="">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "description", null);
    });
    it("parses absolute image URLs", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta property="og:image" content="https://example.com/image.jpg">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "imageHref", "https://example.com/image.jpg");
    });
    it("parses relative image URLs", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta property="og:image" content="assets/image.jpg">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "imageHref", "https://example.com/assets/image.jpg");
    });
    it("relative image URL resolution is relative to the final URL after redirects, not the original URL", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta property="og:image" content="image.jpg">'
        ]),
        url: "https://bar.example/assets/"
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://foo.example", new import_abort_controller.default().signal), "imageHref", "https://bar.example/assets/image.jpg");
    });
    it("ignores empty image URLs", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta property="og:image" content="">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "imageHref", null);
    });
    it("ignores blank image URLs", async () => {
      const fakeFetch = stub().resolves(makeResponse({
        body: makeHtml([
          "<title>foo</title>",
          '<meta property="og:image" content="  ">'
        ])
      }));
      import_chai.assert.propertyVal(await (0, import_linkPreviewFetch.fetchLinkPreviewMetadata)(fakeFetch, "https://example.com", new import_abort_controller.default().signal), "imageHref", null);
    });
  });
  describe("fetchLinkPreviewImage", () => {
    const readFixture = /* @__PURE__ */ __name(async (filename) => {
      const result = await fs.promises.readFile(path.join(__dirname, "..", "..", "..", "fixtures", filename));
      (0, import_chai.assert)(result.length > 10, `Test failed to read fixture ${filename}`);
      return result;
    }, "readFixture");
    [
      {
        title: "JPEG",
        contentType: "image/jpeg",
        fixtureFilename: "kitten-1-64-64.jpg"
      },
      {
        title: "PNG",
        contentType: "image/png",
        fixtureFilename: "freepngs-2cd43b_bed7d1327e88454487397574d87b64dc_mv2.png"
      },
      {
        title: "GIF",
        contentType: "image/gif",
        fixtureFilename: "giphy-GVNvOUpeYmI7e.gif"
      },
      {
        title: "WEBP",
        contentType: "image/webp",
        fixtureFilename: "512x515-thumbs-up-lincoln.webp"
      },
      {
        title: "ICO",
        contentType: "image/x-icon",
        fixtureFilename: "kitten-1-64-64.ico"
      }
    ].forEach(({ title, contentType, fixtureFilename }) => {
      it(`handles ${title} images`, async () => {
        const fixture = await readFixture(fixtureFilename);
        const fakeFetch = stub().resolves(new import_node_fetch.Response(fixture, {
          headers: {
            "Content-Type": contentType,
            "Content-Length": fixture.length.toString()
          }
        }));
        import_chai.assert.deepEqual((await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal))?.contentType, (0, import_MIME.stringToMIMEType)(contentType));
      });
    });
    it("returns null if the request fails", async () => {
      const fakeFetch = stub().rejects(new Error("Test request failure"));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewImage: failed to fetch image; bailing");
    });
    it("returns null if the response status code isn't 2xx", async () => {
      const fixture = await readFixture("kitten-1-64-64.jpg");
      await Promise.all([400, 404, 500, 598].map(async (status) => {
        const fakeFetch = stub().resolves(new import_node_fetch.Response(fixture, {
          status,
          headers: {
            "Content-Type": "image/jpeg",
            "Content-Length": fixture.length.toString()
          }
        }));
        import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal, logger));
        sinon.assert.calledWith(warn, `fetchLinkPreviewImage: got a ${status} status code; bailing`);
      }));
    });
    it("handles 301 redirects", async () => {
      const fixture = await readFixture("kitten-1-64-64.jpg");
      const fakeFetch = stub();
      fakeFetch.onFirstCall().resolves(new import_node_fetch.Response(Buffer.from(""), {
        status: 301,
        headers: {
          Location: "/result.jpg"
        }
      }));
      fakeFetch.onSecondCall().resolves(new import_node_fetch.Response(fixture, {
        headers: {
          "Content-Type": import_MIME.IMAGE_JPEG,
          "Content-Length": fixture.length.toString()
        }
      }));
      import_chai.assert.deepEqual((await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal))?.contentType, import_MIME.IMAGE_JPEG);
      sinon.assert.calledTwice(fakeFetch);
      sinon.assert.calledWith(fakeFetch.getCall(0), "https://example.com/img");
      sinon.assert.calledWith(fakeFetch.getCall(1), "https://example.com/result.jpg");
    });
    it("returns null if the response is too small", async () => {
      const fakeFetch = stub().resolves(new import_node_fetch.Response(await readFixture("kitten-1-64-64.jpg"), {
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Length": "2"
        }
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewImage: Content-Length is too short; bailing");
    });
    it("returns null if the response is too large", async () => {
      const fakeFetch = stub().resolves(new import_node_fetch.Response(await readFixture("kitten-1-64-64.jpg"), {
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Length": "123456789"
        }
      }));
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal, logger));
      sinon.assert.calledOnce(warn);
      sinon.assert.calledWith(warn, "fetchLinkPreviewImage: Content-Length is too large or is unset; bailing");
    });
    it("returns null if the Content-Type is not a valid image", async () => {
      const fixture = await readFixture("kitten-1-64-64.jpg");
      await Promise.all(["", "image/tiff", "video/mp4", "text/plain", "application/html"].map(async (contentType) => {
        const fakeFetch = stub().resolves(new import_node_fetch.Response(fixture, {
          headers: {
            "Content-Type": contentType,
            "Content-Length": fixture.length.toString()
          }
        }));
        import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal, logger));
        sinon.assert.calledWith(warn, "fetchLinkPreviewImage: Content-Type is not an image; bailing");
      }));
    });
    it("sends WhatsApp as the User-Agent for compatibility", async () => {
      const fakeFetch = stub().resolves(new import_node_fetch.Response(Buffer.from("")));
      await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", new import_abort_controller.default().signal);
      sinon.assert.calledWith(fakeFetch, "https://example.com/img", sinon.match({
        headers: {
          "User-Agent": "WhatsApp/2"
        }
      }));
    });
    it("doesn't read the image if the request was aborted before reading started", async () => {
      const abortController = new import_abort_controller.default();
      const fixture = await readFixture("kitten-1-64-64.jpg");
      const fakeFetch = stub().callsFake(() => {
        const response = new import_node_fetch.Response(fixture, {
          headers: {
            "Content-Type": "image/jpeg",
            "Content-Length": fixture.length.toString()
          }
        });
        sinon.stub(response, "buffer").rejects(new Error("Should not be called"));
        sinon.stub(response, "blob").rejects(new Error("Should not be called"));
        sinon.stub(response, "text").rejects(new Error("Should not be called"));
        sinon.stub(response, "body").get(() => {
          throw new Error("Should not be accessed");
        });
        abortController.abort();
        return response;
      });
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", abortController.signal));
    });
    it("returns null if the request was aborted after the image was read", async () => {
      const abortController = new import_abort_controller.default();
      const fixture = await readFixture("kitten-1-64-64.jpg");
      const fakeFetch = stub().callsFake(() => {
        const response = new import_node_fetch.Response(fixture, {
          headers: {
            "Content-Type": "image/jpeg",
            "Content-Length": fixture.length.toString()
          }
        });
        const oldBufferMethod = response.buffer.bind(response);
        sinon.stub(response, "buffer").callsFake(async () => {
          const data = await oldBufferMethod();
          abortController.abort();
          return data;
        });
        return response;
      });
      import_chai.assert.isNull(await (0, import_linkPreviewFetch.fetchLinkPreviewImage)(fakeFetch, "https://example.com/img", abortController.signal));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlua1ByZXZpZXdGZXRjaF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ25vZGUtZmV0Y2gnO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBBYm9ydENvbnRyb2xsZXIgZnJvbSAnYWJvcnQtY29udHJvbGxlcic7XG5pbXBvcnQgeyBJTUFHRV9KUEVHLCBzdHJpbmdUb01JTUVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuaW1wb3J0IHtcbiAgZmV0Y2hMaW5rUHJldmlld0ltYWdlLFxuICBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEsXG59IGZyb20gJy4uLy4uL2xpbmtQcmV2aWV3cy9saW5rUHJldmlld0ZldGNoJztcblxuZGVzY3JpYmUoJ2xpbmsgcHJldmlldyBmZXRjaGluZycsICgpID0+IHtcbiAgLy8gV2UnbGwgdXNlIHRoaXMgdG8gY3JlYXRlIGEgZmFrZSBgZmV0Y2hgLiBXZSdsbCB3YW50IHRvIGNhbGwgYC5yZXNvbHZlc2Agb3JcbiAgLy8gICBgLnJlamVjdHNgIG9uIGl0IChtZWFuaW5nIHRoYXQgaXQgbmVlZHMgdG8gYmUgYSBTaW5vbiBTdHViIHR5cGUpLCBidXQgd2UnbGwgYWxzb1xuICAvLyAgIHdhbnQgaXQgdG8gYmUgYSBmYWtlIGBmZXRjaGAuIGBhbnlgIHNlZW1zIGxpa2UgdGhlIGJlc3QgXCJzdXBlcnR5cGVcIiB0aGVyZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgZnVuY3Rpb24gc3R1YigpOiBhbnkge1xuICAgIHJldHVybiBzaW5vbi5zdHViKCk7XG4gIH1cblxuICBsZXQgd2Fybjogc2lub24uU2lub25TdHViO1xuICBsZXQgbG9nZ2VyOiBQaWNrPExvZ2dlclR5cGUsICd3YXJuJz47XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgd2FybiA9IHNpbm9uLnN0dWIoKTtcbiAgICBsb2dnZXIgPSB7IHdhcm4gfTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YScsICgpID0+IHtcbiAgICBjb25zdCBtYWtlSHRtbCA9IChzdHVmZkluSGVhZDogUmVhZG9ubHlBcnJheTxzdHJpbmc+ID0gW10pID0+IGBcbiAgICA8IWRvY3R5cGUgaHRtbD5cbiAgICA8aHRtbD5cbiAgICAgIDxoZWFkPiR7c3R1ZmZJbkhlYWQuam9pbignXFxuJyl9PC9oZWFkPlxuICAgICAgPGJvZHk+c2hvdWxkIGJlIGlnbm9yZWQ8L2JvZHk+XG4gICAgPC9odG1sPlxuICAgIGA7XG5cbiAgICBjb25zdCBtYWtlUmVzcG9uc2UgPSAoe1xuICAgICAgc3RhdHVzID0gMjAwLFxuICAgICAgaGVhZGVycyA9IHt9LFxuICAgICAgYm9keSA9IG1ha2VIdG1sKFsnPHRpdGxlPnRlc3QgdGl0bGU8L3RpdGxlPiddKSxcbiAgICAgIHVybCA9ICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICB9OiB7XG4gICAgICBzdGF0dXM/OiBudW1iZXI7XG4gICAgICBoZWFkZXJzPzogeyBba2V5OiBzdHJpbmddOiBudWxsIHwgc3RyaW5nIH07XG4gICAgICBib2R5PzogbnVsbCB8IHN0cmluZyB8IFVpbnQ4QXJyYXkgfCBBc3luY0l0ZXJhYmxlPFVpbnQ4QXJyYXk+O1xuICAgICAgdXJsPzogc3RyaW5nO1xuICAgIH0gPSB7fSkgPT4ge1xuICAgICAgbGV0IGJvZHlMZW5ndGg6IG51bGwgfCBudW1iZXI7XG4gICAgICBsZXQgYm9keVN0cmVhbTogbnVsbCB8IEFzeW5jSXRlcmFibGU8VWludDhBcnJheT47XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgYm9keUxlbmd0aCA9IDA7XG4gICAgICAgIGJvZHlTdHJlYW0gPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgYXNCeXRlcyA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShib2R5KTtcbiAgICAgICAgYm9keUxlbmd0aCA9IGFzQnl0ZXMubGVuZ3RoO1xuICAgICAgICBib2R5U3RyZWFtID0gKGFzeW5jIGZ1bmN0aW9uKiBzdHJlYW0oKSB7XG4gICAgICAgICAgeWllbGQgYXNCeXRlcztcbiAgICAgICAgfSkoKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgYm9keUxlbmd0aCA9IGJvZHkubGVuZ3RoO1xuICAgICAgICBib2R5U3RyZWFtID0gKGFzeW5jIGZ1bmN0aW9uKiBzdHJlYW0oKSB7XG4gICAgICAgICAgeWllbGQgYm9keTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHlMZW5ndGggPSBudWxsO1xuICAgICAgICBib2R5U3RyZWFtID0gYm9keTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGVhZGVyc09iaiA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICBPYmplY3QuZW50cmllcyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogYm9keUxlbmd0aCA9PT0gbnVsbCA/IG51bGwgOiBTdHJpbmcoYm9keUxlbmd0aCksXG4gICAgICAgIC4uLmhlYWRlcnMsXG4gICAgICB9KS5mb3JFYWNoKChbaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWVdKSA9PiB7XG4gICAgICAgIGlmIChoZWFkZXJWYWx1ZSkge1xuICAgICAgICAgIGhlYWRlcnNPYmouc2V0KGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnNPYmosXG4gICAgICAgIGJvZHk6IGJvZHlTdHJlYW0sXG4gICAgICAgIG9rOiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8PSAyOTksXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdXJsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXQoJ2hhbmRsZXMgdGhlIFwia2l0Y2hlbiBzaW5rXCIgb2YgcmVzdWx0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBib2R5OiBtYWtlSHRtbChbXG4gICAgICAgICAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9XCJ0ZXN0IHRpdGxlXCI+JyxcbiAgICAgICAgICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cInRlc3QgZGVzY3JpcHRpb25cIj4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGdcIj4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6cHVibGlzaGVkX3RpbWVcIiBjb250ZW50PVwiMjAyMC0wNC0yMFQxMjozNDo1Ni4wMDlaXCI+JyxcbiAgICAgICAgICBdKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAndGVzdCB0aXRsZScsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICd0ZXN0IGRlc2NyaXB0aW9uJyxcbiAgICAgICAgICBkYXRlOiAxNTg3Mzg2MDk2MDA5LFxuICAgICAgICAgIGltYWdlSHJlZjogJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1hZ2UuanBnJyxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGltYWdlIGhyZWYgc291cmNlcyBpbiB0aGUgY29ycmVjdCBvcmRlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG9yZGVyZWRJbWFnZUhyZWZTb3VyY2VzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdGFnOiAnPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCJodHRwczovL2V4YW1wbGUuY29tL29nLWltYWdlLmpwZ1wiPicsXG4gICAgICAgICAgZXhwZWN0ZWRIcmVmOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9vZy1pbWFnZS5qcGcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGFnOiAnPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZTp1cmxcIiBjb250ZW50PVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9vZy1pbWFnZS11cmwuanBnXCI+JyxcbiAgICAgICAgICBleHBlY3RlZEhyZWY6ICdodHRwczovL2V4YW1wbGUuY29tL29nLWltYWdlLXVybC5qcGcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGFnOiAnPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9XCJodHRwczovL2V4YW1wbGUuY29tL2FwcGxlLXRvdWNoLWljb24uanBnXCI+JyxcbiAgICAgICAgICBleHBlY3RlZEhyZWY6ICdodHRwczovL2V4YW1wbGUuY29tL2FwcGxlLXRvdWNoLWljb24uanBnJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRhZzogJzxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb24tcHJlY29tcG9zZWRcIiBocmVmPVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9hcHBsZS10b3VjaC1pY29uLXByZWNvbXBvc2VkLmpwZ1wiPicsXG4gICAgICAgICAgZXhwZWN0ZWRIcmVmOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9hcHBsZS10b3VjaC1pY29uLXByZWNvbXBvc2VkLmpwZycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0YWc6ICc8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgaHJlZj1cImh0dHBzOi8vZXhhbXBsZS5jb20vc2hvcnRjdXQtaWNvbi5qcGdcIj4nLFxuICAgICAgICAgIGV4cGVjdGVkSHJlZjogJ2h0dHBzOi8vZXhhbXBsZS5jb20vc2hvcnRjdXQtaWNvbi5qcGcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGFnOiAnPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCJodHRwczovL2V4YW1wbGUuY29tL2ljb24uanBnXCI+JyxcbiAgICAgICAgICBleHBlY3RlZEhyZWY6ICdodHRwczovL2V4YW1wbGUuY29tL2ljb24uanBnJyxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBmb3IgKGxldCBpID0gb3JkZXJlZEltYWdlSHJlZlNvdXJjZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VUYWdzID0gb3JkZXJlZEltYWdlSHJlZlNvdXJjZXNcbiAgICAgICAgICAuc2xpY2UoaSlcbiAgICAgICAgICAubWFwKCh7IHRhZyB9KSA9PiB0YWcpXG4gICAgICAgICAgLy8gUmV2ZXJzZSB0aGUgYXJyYXkgdG8gbWFrZSBzdXJlIHRoYXQgd2UncmUgcHJpb3JpdGl6aW5nIHByb3Blcmx5LFxuICAgICAgICAgIC8vICAgaW5zdGVhZCBvZiBqdXN0IHVzaW5nIHdoaWNoZXZlciBjb21lcyBmaXJzdC5cbiAgICAgICAgICAucmV2ZXJzZSgpO1xuICAgICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwidGVzdCB0aXRsZVwiPicsXG4gICAgICAgICAgICAgIC4uLmltYWdlVGFncyxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgY29uc3QgdmFsID0gYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQucHJvcGVydHlWYWwoXG4gICAgICAgICAgdmFsLFxuICAgICAgICAgICdpbWFnZUhyZWYnLFxuICAgICAgICAgIG9yZGVyZWRJbWFnZUhyZWZTb3VyY2VzW2ldLmV4cGVjdGVkSHJlZlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ2xvZ3Mgbm8gd2FybmluZ3MgaWYgZXZlcnl0aGluZyBnb2VzIHNtb290aGx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cInRlc3QgdGl0bGVcIj4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwidGVzdCBkZXNjcmlwdGlvblwiPicsXG4gICAgICAgICAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCJodHRwczovL2V4YW1wbGUuY29tL2ltYWdlLmpwZ1wiPicsXG4gICAgICAgICAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpwdWJsaXNoZWRfdGltZVwiIGNvbnRlbnQ9XCIyMDIwLTA0LTIwVDEyOjM0OjU2LjAwOVpcIj4nLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgbG9nZ2VyXG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHdhcm4pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbmRzIFdoYXRzQXBwIGFzIHRoZSBVc2VyLUFnZW50IGZvciBjb21wYXRpYmlsaXR5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKG1ha2VSZXNwb25zZSgpKTtcblxuICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICBzaW5vbi5tYXRjaCh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiAnV2hhdHNBcHAvMicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSByZXF1ZXN0IGZhaWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlamVjdHMobmV3IEVycm9yKCdUZXN0IHJlcXVlc3QgZmFpbHVyZScpKTtcblxuICAgICAgYXNzZXJ0LmlzTnVsbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICBsb2dnZXJcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uod2Fybik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogZmFpbGVkIHRvIGZldGNoIGxpbmsgcHJldmlldyBIVE1MOyBiYWlsaW5nJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyBudWxsIGlmIHRoZSByZXNwb25zZSBzdGF0dXMgY29kZSBpc24ndCAyeHhcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIFsxMDAsIDMwNCwgNDAwLCA0MDQsIDUwMCwgMCwgLTIwMF0ubWFwKGFzeW5jIHN0YXR1cyA9PiB7XG4gICAgICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKG1ha2VSZXNwb25zZSh7IHN0YXR1cyB9KSk7XG5cbiAgICAgICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICAgICAgbG9nZ2VyXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgICAgd2FybixcbiAgICAgICAgICAgIGBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGE6IGdvdCBhICR7c3RhdHVzfSBzdGF0dXMgY29kZTsgYmFpbGluZ2BcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwiZG9lc24ndCB1c2UgZmV0Y2gncyBhdXRvbWF0aWMgcmVkaXJlY3Rpb24gYmVoYXZpb3JcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKG1ha2VSZXNwb25zZSgpKTtcblxuICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICBzaW5vbi5tYXRjaCh7IHJlZGlyZWN0OiAnbWFudWFsJyB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF0uZm9yRWFjaChzdGF0dXMgPT4ge1xuICAgICAgaXQoYGhhbmRsZXMgJHtzdGF0dXN9IHJlZGlyZWN0c2AsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpO1xuICAgICAgICBmYWtlRmV0Y2gub25GaXJzdENhbGwoKS5yZXNvbHZlcyhcbiAgICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgaGVhZGVyczogeyBMb2NhdGlvbjogJ2h0dHBzOi8vZXhhbXBsZS5jb20vMicgfSxcbiAgICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgZmFrZUZldGNoLm9uU2Vjb25kQ2FsbCgpLnJlc29sdmVzKG1ha2VSZXNwb25zZSgpKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgICApLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAndGVzdCB0aXRsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGRhdGU6IG51bGwsXG4gICAgICAgICAgICBpbWFnZUhyZWY6IG51bGwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShmYWtlRmV0Y2gpO1xuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmYWtlRmV0Y2guZ2V0Q2FsbCgwKSwgJ2h0dHBzOi8vZXhhbXBsZS5jb20nKTtcbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZmFrZUZldGNoLmdldENhbGwoMSksICdodHRwczovL2V4YW1wbGUuY29tLzInKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChgcmV0dXJucyBudWxsIHdoZW4gc2VlaW5nIGEgJHtzdGF0dXN9IHN0YXR1cyB3aXRoIG5vIExvY2F0aW9uIGhlYWRlcmAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKG1ha2VSZXNwb25zZSh7IHN0YXR1cyB9KSk7XG5cbiAgICAgICAgYXNzZXJ0LmlzTnVsbChcbiAgICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyByZWxhdGl2ZSByZWRpcmVjdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCk7XG4gICAgICBmYWtlRmV0Y2gub25GaXJzdENhbGwoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBzdGF0dXM6IDMwMSxcbiAgICAgICAgICBoZWFkZXJzOiB7IExvY2F0aW9uOiAnLzIvJyB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgZmFrZUZldGNoLm9uU2Vjb25kQ2FsbCgpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIHN0YXR1czogMzAxLFxuICAgICAgICAgIGhlYWRlcnM6IHsgTG9jYXRpb246ICczJyB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgZmFrZUZldGNoLm9uVGhpcmRDYWxsKCkucmVzb2x2ZXMobWFrZVJlc3BvbnNlKCkpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ3Rlc3QgdGl0bGUnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICAgIGRhdGU6IG51bGwsXG4gICAgICAgICAgaW1hZ2VIcmVmOiBudWxsLFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkVGhyaWNlKGZha2VGZXRjaCk7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmYWtlRmV0Y2guZ2V0Q2FsbCgwKSwgJ2h0dHBzOi8vZXhhbXBsZS5jb20nKTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGZha2VGZXRjaC5nZXRDYWxsKDEpLCAnaHR0cHM6Ly9leGFtcGxlLmNvbS8yLycpO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZmFrZUZldGNoLmdldENhbGwoMiksICdodHRwczovL2V4YW1wbGUuY29tLzIvMycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBpZiByZWRpcmVjdGluZyB0byBhbiBpbnNlY3VyZSBIVFRQIFVSTCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBzdGF0dXM6IDMwMSxcbiAgICAgICAgICBoZWFkZXJzOiB7IExvY2F0aW9uOiAnaHR0cDovL2V4YW1wbGUuY29tJyB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZha2VGZXRjaCk7XG4gICAgfSk7XG5cbiAgICBpdChcInJldHVybnMgbnVsbCBpZiB0aGVyZSdzIGEgcmVkaXJlY3Rpb24gbG9vcFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCk7XG4gICAgICBmYWtlRmV0Y2gub25GaXJzdENhbGwoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBzdGF0dXM6IDMwMSxcbiAgICAgICAgICBoZWFkZXJzOiB7IExvY2F0aW9uOiAnLzIvJyB9LFxuICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgZmFrZUZldGNoLm9uU2Vjb25kQ2FsbCgpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIHN0YXR1czogMzAxLFxuICAgICAgICAgIGhlYWRlcnM6IHsgTG9jYXRpb246ICcvc3RhcnQnIH0sXG4gICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vc3RhcnQnLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKGZha2VGZXRjaCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBudWxsIGlmIHJlZGlyZWN0aW5nIG1vcmUgdGhhbiAyMCB0aW1lcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5jYWxsc0Zha2UoYXN5bmMgKCkgPT5cbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBzdGF0dXM6IDMwMSxcbiAgICAgICAgICBoZWFkZXJzOiB7IExvY2F0aW9uOiBgLyR7TWF0aC5yYW5kb20oKX1gIH0sXG4gICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vc3RhcnQnLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxDb3VudChmYWtlRmV0Y2gsIDIwKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIHJlc3BvbnNlIGhhcyBubyBib2R5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKG1ha2VSZXNwb25zZSh7IGJvZHk6IG51bGwgfSkpO1xuXG4gICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsLFxuICAgICAgICAgIGxvZ2dlclxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogbm8gcmVzcG9uc2UgYm9keTsgYmFpbGluZydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSByZXN1bHQgYm9keSBpcyB0b28gc2hvcnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMobWFrZVJlc3BvbnNlKHsgYm9keTogJzx0aXRsZT4nIH0pKTtcblxuICAgICAgYXNzZXJ0LmlzTnVsbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICBsb2dnZXJcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uod2Fybik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgJ2ZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogQ29udGVudC1MZW5ndGggaXMgdG9vIHNob3J0OyBiYWlsaW5nJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIHJlc3VsdCBpcyBtZWFudCB0byBiZSBkb3dubG9hZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtRGlzcG9zaXRpb24nOiAnYXR0YWNobWVudCcgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWwsXG4gICAgICAgICAgbG9nZ2VyXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHdhcm4pO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgIHdhcm4sXG4gICAgICAgICdmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGE6IENvbnRlbnQtRGlzcG9zaXRpb24gaGVhZGVyIGlzIG5vdCBpbmxpbmU7IGJhaWxpbmcnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyBhbiBleHBsaWNpdGx5IGlubGluZSBDb250ZW50LURpc3Bvc2l0aW9uIGhlYWRlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LURpc3Bvc2l0aW9uJzogJ2lubGluZScgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAndGVzdCB0aXRsZScsXG4gICAgICAgICAgZGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgICAgZGF0ZTogbnVsbCxcbiAgICAgICAgICBpbWFnZUhyZWY6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSBDb250ZW50LVR5cGUgaXMgbm90IEhUTUwnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgIG1ha2VSZXNwb25zZSh7XG4gICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsLFxuICAgICAgICAgIGxvZ2dlclxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh3YXJuKTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICB3YXJuLFxuICAgICAgICAnZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhOiBDb250ZW50LVR5cGUgaXMgbm90IEhUTUw7IGJhaWxpbmcnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgbm9uLWxvd2VyY2FzZSBDb250ZW50LVR5cGUgaGVhZGVycycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnVEVYVC9IVE1MOyBjaEFyc0V0PXV0Zi04JyB9LFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICd0ZXN0IHRpdGxlJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgICBkYXRlOiBudWxsLFxuICAgICAgICAgIGltYWdlSHJlZjogbnVsbCxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgdGhlIHJlc3BvbnNlIGFzIFVURi04IGlmIHRoZSBib2R5IGNvbnRhaW5zIGEgYnl0ZSBvcmRlciBtYXJrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IChhc3luYyBmdW5jdGlvbiogYm9keSgpIHtcbiAgICAgICAgICAgIHlpZWxkIG5ldyBVaW50OEFycmF5KFsweGVmLCAweGJiLCAweGJmXSk7XG4gICAgICAgICAgICB5aWVsZCBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoXG4gICAgICAgICAgICAgICc8IWRvY3R5cGUgaHRtbD48dGl0bGU+XFx1ezFGMzg5fTwvdGl0bGU+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSgpLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICdcdUQ4M0NcdURGODknLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICAgIGRhdGU6IG51bGwsXG4gICAgICAgICAgaW1hZ2VIcmVmOiBudWxsLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jlc3BlY3RzIHRoZSBVVEYtOCBieXRlIG9yZGVyIG1hcmsgYWJvdmUgdGhlIENvbnRlbnQtVHlwZSBoZWFkZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBib20gPSBuZXcgVWludDhBcnJheShbMHhlZiwgMHhiYiwgMHhiZl0pO1xuICAgICAgY29uc3QgdGl0bGVIdG1sID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKCc8dGl0bGU+XFx1ezFGMzg5fTwvdGl0bGU+Jyk7XG5cbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbDsgY2hhcnNldD1sYXRpbjEnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogKGFzeW5jIGZ1bmN0aW9uKiBib2R5KCkge1xuICAgICAgICAgICAgeWllbGQgYm9tO1xuICAgICAgICAgICAgeWllbGQgdGl0bGVIdG1sO1xuICAgICAgICAgIH0pKCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdcdUQ4M0NcdURGODknXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jlc3BlY3RzIHRoZSBVVEYtOCBieXRlIG9yZGVyIG1hcmsgYWJvdmUgYSA8bWV0YSBodHRwLWVxdWl2PiBpbiB0aGUgZG9jdW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBib20gPSBuZXcgVWludDhBcnJheShbMHhlZiwgMHhiYiwgMHhiZl0pO1xuICAgICAgY29uc3QgdGl0bGVIdG1sID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKCc8dGl0bGU+XFx1ezFGMzg5fTwvdGl0bGU+Jyk7XG4gICAgICBjb25zdCBlbmRIZWFkSHRtbCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgnPC9oZWFkPicpO1xuXG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgIG1ha2VSZXNwb25zZSh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogKGFzeW5jIGZ1bmN0aW9uKiBib2R5KCkge1xuICAgICAgICAgICAgeWllbGQgYm9tO1xuICAgICAgICAgICAgeWllbGQgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICAgICAgICAgICAgICAnPCFkb2N0eXBlIGh0bWw+PGhlYWQ+PG1ldGEgaHR0cC1lcXVpdj1cImNvbnRlbnQtdHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9bGF0aW4xXCI+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHlpZWxkIHRpdGxlSHRtbDtcbiAgICAgICAgICAgIHlpZWxkIGVuZEhlYWRIdG1sO1xuICAgICAgICAgIH0pKCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdcdUQ4M0NcdURGODknXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jlc3BlY3RzIHRoZSBVVEYtOCBieXRlIG9yZGVyIG1hcmsgYWJvdmUgYSA8bWV0YSBjaGFyc2V0PiBpbiB0aGUgZG9jdW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBib20gPSBuZXcgVWludDhBcnJheShbMHhlZiwgMHhiYiwgMHhiZl0pO1xuICAgICAgY29uc3QgdGl0bGVIdG1sID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKCc8dGl0bGU+XFx1ezFGMzg5fTwvdGl0bGU+Jyk7XG4gICAgICBjb25zdCBlbmRIZWFkSHRtbCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgnPC9oZWFkPicpO1xuXG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgIG1ha2VSZXNwb25zZSh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogKGFzeW5jIGZ1bmN0aW9uKiBib2R5KCkge1xuICAgICAgICAgICAgeWllbGQgYm9tO1xuICAgICAgICAgICAgeWllbGQgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICAgICAgICAgICAgICAnPCFkb2N0eXBlIGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD1cInV0Zi04XCI+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHlpZWxkIHRpdGxlSHRtbDtcbiAgICAgICAgICAgIHlpZWxkIGVuZEhlYWRIdG1sO1xuICAgICAgICAgIH0pKCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdcdUQ4M0NcdURGODknXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jlc3BlY3RzIHRoZSBDb250ZW50LVR5cGUgaGVhZGVyIGFib3ZlIGFueXRoaW5nIGluIHRoZSBIVE1MJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdGl0bGVIdG1sID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKCc8dGl0bGU+XFx1ezFGMzg5fTwvdGl0bGU+Jyk7XG4gICAgICBjb25zdCBlbmRIZWFkSHRtbCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgnPC9oZWFkPicpO1xuXG4gICAgICB7XG4gICAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbDsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogKGFzeW5jIGZ1bmN0aW9uKiBib2R5KCkge1xuICAgICAgICAgICAgICB5aWVsZCBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoXG4gICAgICAgICAgICAgICAgJzwhZG9jdHlwZSBodG1sPjxoZWFkPjxtZXRhIGh0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PWxhdGluMVwiPidcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgeWllbGQgdGl0bGVIdG1sO1xuICAgICAgICAgICAgICB5aWVsZCBlbmRIZWFkSHRtbDtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgICApLFxuICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgJ1x1RDgzQ1x1REY4OSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAge1xuICAgICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IChhc3luYyBmdW5jdGlvbiogYm9keSgpIHtcbiAgICAgICAgICAgICAgeWllbGQgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICAgICAgICAgICAgICAgICc8IWRvY3R5cGUgaHRtbD48aGVhZD48bWV0YSBjaGFyc2V0PVwidXRmLThcIj4nXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHlpZWxkIHRpdGxlSHRtbDtcbiAgICAgICAgICAgICAgeWllbGQgZW5kSGVhZEh0bWw7XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICAgKSxcbiAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICdcdUQ4M0NcdURGODknXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgncHJlZmVycyB0aGUgQ29udGVudC1UeXBlIGh0dHAtZXF1aXYgaW4gdGhlIEhUTUwgYWJvdmUgPG1ldGEgY2hhcnNldD4nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgIG1ha2VSZXNwb25zZSh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogbWFrZUh0bWwoW1xuICAgICAgICAgICAgJzxtZXRhIGh0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0ZjhcIj4nLFxuICAgICAgICAgICAgJzxtZXRhIGNoYXJzZXQ9XCJsYXRpbjFcIj4nLFxuICAgICAgICAgICAgJzx0aXRsZT5cXHV7MUYzODl9PC90aXRsZT4nLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdcdUQ4M0NcdURGODknXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBub24tVVRGOCBlbmNvZGluZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0aXRsZUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoWzB4NjEsIDB4NzEsIDB4NzUsIDB4ZWRdKTtcbiAgICAgIGFzc2VydC5ub3REZWVwRXF1YWwoXG4gICAgICAgIG5ldyBUZXh0RGVjb2RlcigndXRmOCcpLmRlY29kZSh0aXRsZUJ5dGVzKSxcbiAgICAgICAgbmV3IFRleHREZWNvZGVyKCdsYXRpbjEnKS5kZWNvZGUodGl0bGVCeXRlcyksXG4gICAgICAgICdUZXN0IGRhdGEgd2FzIG5vdCBzZXQgdXAgY29ycmVjdGx5J1xuICAgICAgKTtcblxuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sOyBjaGFyc2V0PWxhdGluMScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiAoYXN5bmMgZnVuY3Rpb24qIGJvZHkoKSB7XG4gICAgICAgICAgICB5aWVsZCBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoJzx0aXRsZT4nKTtcbiAgICAgICAgICAgIHlpZWxkIHRpdGxlQnl0ZXM7XG4gICAgICAgICAgICB5aWVsZCBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoJzwvdGl0bGU+Jyk7XG4gICAgICAgICAgfSkoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICAndGl0bGUnLFxuICAgICAgICAnYXF1XHUwMEVEJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGluY29tcGxldGUgYm9kaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IChhc3luYyBmdW5jdGlvbiogYm9keSgpIHtcbiAgICAgICAgICAgIHlpZWxkIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShcbiAgICAgICAgICAgICAgJzwhZG9jdHlwZSBodG1sPjxoZWFkPjx0aXRsZT5mb28gYmFyPC90aXRsZT48bWV0YSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rlc3QgcmVxdWVzdCBlcnJvcicpO1xuICAgICAgICAgIH0pKCksXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQucHJvcGVydHlWYWwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWwsXG4gICAgICAgICAgbG9nZ2VyXG4gICAgICAgICksXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdmb28gYmFyJ1xuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uod2Fybik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgJ2dldEh0bWxEb2N1bWVudDogZXJyb3Igd2hlbiByZWFkaW5nIGJvZHk7IGNvbnRpbnVpbmcgd2l0aCB3aGF0IHdlIGdvdCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RvcHMgcmVhZGluZyB0aGUgYm9keSBhZnRlciBjYW5jZWxhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNob3VsZE5ldmVyQmVDYWxsZWQgPSBzaW5vbi5zdHViKCk7XG5cbiAgICAgIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IChhc3luYyBmdW5jdGlvbiogYm9keSgpIHtcbiAgICAgICAgICAgIHlpZWxkIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgnPCFkb2N0eXBlIGh0bWw+PGhlYWQ+Jyk7XG4gICAgICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgICAgIHlpZWxkIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgnPHRpdGxlPnNob3VsZCBiZSBkcm9wcGVkPC90aXRsZT4nKTtcbiAgICAgICAgICAgIHNob3VsZE5ldmVyQmVDYWxsZWQoKTtcbiAgICAgICAgICB9KSgpLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmlzTnVsbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgYWJvcnRDb250cm9sbGVyLnNpZ25hbFxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHNob3VsZE5ldmVyQmVDYWxsZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3N0b3BzIHJlYWRpbmcgYm9kaWVzIGFmdGVyIDEwMDAga2lsb2J5dGVzJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgIGNvbnN0IHNob3VsZE5ldmVyQmVDYWxsZWQgPSBzaW5vbi5zdHViKCk7XG5cbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBib2R5OiAoYXN5bmMgZnVuY3Rpb24qIGJvZHkoKSB7XG4gICAgICAgICAgICB5aWVsZCBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoXG4gICAgICAgICAgICAgICc8IWRvY3R5cGUgaHRtbD48aGVhZD48dGl0bGU+Zm9vIGJhcjwvdGl0bGU+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlcyA9IG5ldyBVaW50OEFycmF5KDI1MCAqIDEwMjQpLmZpbGwoMzIpO1xuICAgICAgICAgICAgeWllbGQgc3BhY2VzO1xuICAgICAgICAgICAgeWllbGQgc3BhY2VzO1xuICAgICAgICAgICAgeWllbGQgc3BhY2VzO1xuICAgICAgICAgICAgeWllbGQgc3BhY2VzO1xuICAgICAgICAgICAgeWllbGQgc3BhY2VzO1xuICAgICAgICAgICAgc2hvdWxkTmV2ZXJCZUNhbGxlZCgpO1xuICAgICAgICAgICAgeWllbGQgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICAgICAgICAgICAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJzaG91bGQgYmUgaWdub3JlZFwiPidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSkoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAnZm9vIGJhcicsXG4gICAgICAgICAgZGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgICAgZGF0ZTogbnVsbCxcbiAgICAgICAgICBpbWFnZUhyZWY6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoc2hvdWxkTmV2ZXJCZUNhbGxlZCk7XG4gICAgfSk7XG5cbiAgICBpdChcInJldHVybnMgbnVsbCBpZiB0aGUgSFRNTCBkb2Vzbid0IGNvbnRhaW4gYSB0aXRsZSwgZXZlbiBpZiBpdCBjb250YWlucyBvdGhlciB2YWx1ZXNcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cImlnbm9yZWRcIj4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9pZ25vcmVkLmpwZ1wiPicsXG4gICAgICAgICAgICBgPG1ldGEgcHJvcGVydHk9XCJvZzpwdWJsaXNoZWRfdGltZVwiIGNvbnRlbnQ9XCIke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1cIj5gLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmlzTnVsbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICBsb2dnZXJcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uod2Fybik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgXCJwYXJzZU1ldGFkYXRhOiBIVE1MIGRvY3VtZW50IGRvZXNuJ3QgaGF2ZSBhIHRpdGxlOyBiYWlsaW5nXCJcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncHJlZmVycyBvZzp0aXRsZSB0byBkb2N1bWVudC50aXRsZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBib2R5OiBtYWtlSHRtbChbXG4gICAgICAgICAgICAnPHRpdGxlPmlnbm9yZWQ8L3RpdGxlPicsXG4gICAgICAgICAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9XCJmb28gYmFyXCI+JyxcbiAgICAgICAgICBdKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICAndGl0bGUnLFxuICAgICAgICAnZm9vIGJhcidcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncHJlZmVycyBvZzpkZXNjcmlwdGlvbiB0byA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIj4nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgIG1ha2VSZXNwb25zZSh7XG4gICAgICAgICAgYm9keTogbWFrZUh0bWwoW1xuICAgICAgICAgICAgJzx0aXRsZT5mb288L3RpdGxlPicsXG4gICAgICAgICAgICAnPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cImlnbm9yZWRcIj4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwiYmFyXCI+JyxcbiAgICAgICAgICBdKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAnYmFyJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCI+JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8dGl0bGU+Zm9vPC90aXRsZT4nLFxuICAgICAgICAgICAgJzxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJiYXJcIj4nLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICdiYXInXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lnbm9yZXMgZW1wdHkgZGVzY3JpcHRpb25zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8dGl0bGU+Zm9vPC90aXRsZT4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwiXCI+JyxcbiAgICAgICAgICBdKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBhYnNvbHV0ZSBpbWFnZSBVUkxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8dGl0bGU+Zm9vPC90aXRsZT4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGdcIj4nLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LnByb3BlcnR5VmFsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsXG4gICAgICAgICksXG4gICAgICAgICdpbWFnZUhyZWYnLFxuICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGcnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyByZWxhdGl2ZSBpbWFnZSBVUkxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8dGl0bGU+Zm9vPC90aXRsZT4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiYXNzZXRzL2ltYWdlLmpwZ1wiPicsXG4gICAgICAgICAgXSksXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQucHJvcGVydHlWYWwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKSxcbiAgICAgICAgJ2ltYWdlSHJlZicsXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2Fzc2V0cy9pbWFnZS5qcGcnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbGF0aXZlIGltYWdlIFVSTCByZXNvbHV0aW9uIGlzIHJlbGF0aXZlIHRvIHRoZSBmaW5hbCBVUkwgYWZ0ZXIgcmVkaXJlY3RzLCBub3QgdGhlIG9yaWdpbmFsIFVSTCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbWFrZVJlc3BvbnNlKHtcbiAgICAgICAgICBib2R5OiBtYWtlSHRtbChbXG4gICAgICAgICAgICAnPHRpdGxlPmZvbzwvdGl0bGU+JyxcbiAgICAgICAgICAgICc8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlXCIgY29udGVudD1cImltYWdlLmpwZ1wiPicsXG4gICAgICAgICAgXSksXG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYXIuZXhhbXBsZS9hc3NldHMvJyxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9mb28uZXhhbXBsZScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICAnaW1hZ2VIcmVmJyxcbiAgICAgICAgJ2h0dHBzOi8vYmFyLmV4YW1wbGUvYXNzZXRzL2ltYWdlLmpwZydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWdub3JlcyBlbXB0eSBpbWFnZSBVUkxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBtYWtlUmVzcG9uc2Uoe1xuICAgICAgICAgIGJvZHk6IG1ha2VIdG1sKFtcbiAgICAgICAgICAgICc8dGl0bGU+Zm9vPC90aXRsZT4nLFxuICAgICAgICAgICAgJzxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiXCI+JyxcbiAgICAgICAgICBdKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5wcm9wZXJ0eVZhbChcbiAgICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKFxuICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICApLFxuICAgICAgICAnaW1hZ2VIcmVmJyxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdpZ25vcmVzIGJsYW5rIGltYWdlIFVSTHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVzb2x2ZXMoXG4gICAgICAgIG1ha2VSZXNwb25zZSh7XG4gICAgICAgICAgYm9keTogbWFrZUh0bWwoW1xuICAgICAgICAgICAgJzx0aXRsZT5mb288L3RpdGxlPicsXG4gICAgICAgICAgICAnPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCIgIFwiPicsXG4gICAgICAgICAgXSksXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQucHJvcGVydHlWYWwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICAgKSxcbiAgICAgICAgJ2ltYWdlSHJlZicsXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdmZXRjaExpbmtQcmV2aWV3SW1hZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVhZEZpeHR1cmUgPSBhc3luYyAoZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8VWludDhBcnJheT4gPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoXG4gICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICdmaXh0dXJlcycsIGZpbGVuYW1lKVxuICAgICAgKTtcbiAgICAgIGFzc2VydChyZXN1bHQubGVuZ3RoID4gMTAsIGBUZXN0IGZhaWxlZCB0byByZWFkIGZpeHR1cmUgJHtmaWxlbmFtZX1gKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdKUEVHJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgZml4dHVyZUZpbGVuYW1lOiAna2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUE5HJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICBmaXh0dXJlRmlsZW5hbWU6XG4gICAgICAgICAgJ2ZyZWVwbmdzLTJjZDQzYl9iZWQ3ZDEzMjdlODg0NTQ0ODczOTc1NzRkODdiNjRkY19tdjIucG5nJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnR0lGJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9naWYnLFxuICAgICAgICBmaXh0dXJlRmlsZW5hbWU6ICdnaXBoeS1HVk52T1VwZVltSTdlLmdpZicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ1dFQlAnLFxuICAgICAgICBjb250ZW50VHlwZTogJ2ltYWdlL3dlYnAnLFxuICAgICAgICBmaXh0dXJlRmlsZW5hbWU6ICc1MTJ4NTE1LXRodW1icy11cC1saW5jb2xuLndlYnAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdJQ08nLFxuICAgICAgICBjb250ZW50VHlwZTogJ2ltYWdlL3gtaWNvbicsXG4gICAgICAgIGZpeHR1cmVGaWxlbmFtZTogJ2tpdHRlbi0xLTY0LTY0LmljbycsXG4gICAgICB9LFxuICAgIF0uZm9yRWFjaCgoeyB0aXRsZSwgY29udGVudFR5cGUsIGZpeHR1cmVGaWxlbmFtZSB9KSA9PiB7XG4gICAgICBpdChgaGFuZGxlcyAke3RpdGxlfSBpbWFnZXNgLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpeHR1cmUgPSBhd2FpdCByZWFkRml4dHVyZShmaXh0dXJlRmlsZW5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgICBuZXcgUmVzcG9uc2UoZml4dHVyZSwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogY29udGVudFR5cGUsXG4gICAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IGZpeHR1cmUubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAoXG4gICAgICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1nJyxcbiAgICAgICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk/LmNvbnRlbnRUeXBlLFxuICAgICAgICAgIHN0cmluZ1RvTUlNRVR5cGUoY29udGVudFR5cGUpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIHJlcXVlc3QgZmFpbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlRmV0Y2ggPSBzdHViKCkucmVqZWN0cyhuZXcgRXJyb3IoJ1Rlc3QgcmVxdWVzdCBmYWlsdXJlJykpO1xuXG4gICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2ltZycsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICBsb2dnZXJcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uod2Fybik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgJ2ZldGNoTGlua1ByZXZpZXdJbWFnZTogZmFpbGVkIHRvIGZldGNoIGltYWdlOyBiYWlsaW5nJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyBudWxsIGlmIHRoZSByZXNwb25zZSBzdGF0dXMgY29kZSBpc24ndCAyeHhcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZml4dHVyZSA9IGF3YWl0IHJlYWRGaXh0dXJlKCdraXR0ZW4tMS02NC02NC5qcGcnKTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIFs0MDAsIDQwNCwgNTAwLCA1OThdLm1hcChhc3luYyBzdGF0dXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgICAgIG5ldyBSZXNwb25zZShmaXh0dXJlLCB7XG4gICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnaW1hZ2UvanBlZycsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogZml4dHVyZS5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgICAgICAgIGZha2VGZXRjaCxcbiAgICAgICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1nJyxcbiAgICAgICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICAgICAgbG9nZ2VyXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgICAgd2FybixcbiAgICAgICAgICAgIGBmZXRjaExpbmtQcmV2aWV3SW1hZ2U6IGdvdCBhICR7c3RhdHVzfSBzdGF0dXMgY29kZTsgYmFpbGluZ2BcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIE1vc3Qgb2YgdGhlIHJlZGlyZWN0IGJlaGF2aW9yIGlzIHRlc3RlZCBhYm92ZS5cbiAgICBpdCgnaGFuZGxlcyAzMDEgcmVkaXJlY3RzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZml4dHVyZSA9IGF3YWl0IHJlYWRGaXh0dXJlKCdraXR0ZW4tMS02NC02NC5qcGcnKTtcblxuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpO1xuICAgICAgZmFrZUZldGNoLm9uRmlyc3RDYWxsKCkucmVzb2x2ZXMoXG4gICAgICAgIG5ldyBSZXNwb25zZShCdWZmZXIuZnJvbSgnJyksIHtcbiAgICAgICAgICBzdGF0dXM6IDMwMSxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBMb2NhdGlvbjogJy9yZXN1bHQuanBnJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGZha2VGZXRjaC5vblNlY29uZENhbGwoKS5yZXNvbHZlcyhcbiAgICAgICAgbmV3IFJlc3BvbnNlKGZpeHR1cmUsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogSU1BR0VfSlBFRyxcbiAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IGZpeHR1cmUubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIChcbiAgICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbS9pbWcnLFxuICAgICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbFxuICAgICAgICAgIClcbiAgICAgICAgKT8uY29udGVudFR5cGUsXG4gICAgICAgIElNQUdFX0pQRUdcbiAgICAgICk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShmYWtlRmV0Y2gpO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZmFrZUZldGNoLmdldENhbGwoMCksICdodHRwczovL2V4YW1wbGUuY29tL2ltZycpO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgIGZha2VGZXRjaC5nZXRDYWxsKDEpLFxuICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbS9yZXN1bHQuanBnJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIHJlc3BvbnNlIGlzIHRvbyBzbWFsbCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5yZXNvbHZlcyhcbiAgICAgICAgbmV3IFJlc3BvbnNlKGF3YWl0IHJlYWRGaXh0dXJlKCdraXR0ZW4tMS02NC02NC5qcGcnKSwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnaW1hZ2UvanBlZycsXG4gICAgICAgICAgICAnQ29udGVudC1MZW5ndGgnOiAnMicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdJbWFnZShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1nJyxcbiAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsLFxuICAgICAgICAgIGxvZ2dlclxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh3YXJuKTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICB3YXJuLFxuICAgICAgICAnZmV0Y2hMaW5rUHJldmlld0ltYWdlOiBDb250ZW50LUxlbmd0aCBpcyB0b28gc2hvcnQ7IGJhaWxpbmcnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBpZiB0aGUgcmVzcG9uc2UgaXMgdG9vIGxhcmdlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICBuZXcgUmVzcG9uc2UoYXdhaXQgcmVhZEZpeHR1cmUoJ2tpdHRlbi0xLTY0LTY0LmpwZycpLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6ICcxMjM0NTY3ODknLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2ltZycsXG4gICAgICAgICAgbmV3IEFib3J0Q29udHJvbGxlcigpLnNpZ25hbCxcbiAgICAgICAgICBsb2dnZXJcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uod2Fybik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgd2FybixcbiAgICAgICAgJ2ZldGNoTGlua1ByZXZpZXdJbWFnZTogQ29udGVudC1MZW5ndGggaXMgdG9vIGxhcmdlIG9yIGlzIHVuc2V0OyBiYWlsaW5nJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIENvbnRlbnQtVHlwZSBpcyBub3QgYSB2YWxpZCBpbWFnZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZpeHR1cmUgPSBhd2FpdCByZWFkRml4dHVyZSgna2l0dGVuLTEtNjQtNjQuanBnJyk7XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBbJycsICdpbWFnZS90aWZmJywgJ3ZpZGVvL21wNCcsICd0ZXh0L3BsYWluJywgJ2FwcGxpY2F0aW9uL2h0bWwnXS5tYXAoXG4gICAgICAgICAgYXN5bmMgY29udGVudFR5cGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKFxuICAgICAgICAgICAgICBuZXcgUmVzcG9uc2UoZml4dHVyZSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IGZpeHR1cmUubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdJbWFnZShcbiAgICAgICAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1nJyxcbiAgICAgICAgICAgICAgICBuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsLFxuICAgICAgICAgICAgICAgIGxvZ2dlclxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgd2FybixcbiAgICAgICAgICAgICAgJ2ZldGNoTGlua1ByZXZpZXdJbWFnZTogQ29udGVudC1UeXBlIGlzIG5vdCBhbiBpbWFnZTsgYmFpbGluZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbmRzIFdoYXRzQXBwIGFzIHRoZSBVc2VyLUFnZW50IGZvciBjb21wYXRpYmlsaXR5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLnJlc29sdmVzKG5ldyBSZXNwb25zZShCdWZmZXIuZnJvbSgnJykpKTtcblxuICAgICAgYXdhaXQgZmV0Y2hMaW5rUHJldmlld0ltYWdlKFxuICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2ltZycsXG4gICAgICAgIG5ldyBBYm9ydENvbnRyb2xsZXIoKS5zaWduYWxcbiAgICAgICk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2ltZycsXG4gICAgICAgIHNpbm9uLm1hdGNoKHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnVXNlci1BZ2VudCc6ICdXaGF0c0FwcC8yJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwiZG9lc24ndCByZWFkIHRoZSBpbWFnZSBpZiB0aGUgcmVxdWVzdCB3YXMgYWJvcnRlZCBiZWZvcmUgcmVhZGluZyBzdGFydGVkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgICAgY29uc3QgZml4dHVyZSA9IGF3YWl0IHJlYWRGaXh0dXJlKCdraXR0ZW4tMS02NC02NC5qcGcnKTtcblxuICAgICAgY29uc3QgZmFrZUZldGNoID0gc3R1YigpLmNhbGxzRmFrZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGZpeHR1cmUsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2ltYWdlL2pwZWcnLFxuICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogZml4dHVyZS5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgc2lub25cbiAgICAgICAgICAuc3R1YihyZXNwb25zZSwgJ2J1ZmZlcicpXG4gICAgICAgICAgLnJlamVjdHMobmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGNhbGxlZCcpKTtcbiAgICAgICAgc2lub24uc3R1YihyZXNwb25zZSwgJ2Jsb2InKS5yZWplY3RzKG5ldyBFcnJvcignU2hvdWxkIG5vdCBiZSBjYWxsZWQnKSk7XG4gICAgICAgIHNpbm9uLnN0dWIocmVzcG9uc2UsICd0ZXh0JykucmVqZWN0cyhuZXcgRXJyb3IoJ1Nob3VsZCBub3QgYmUgY2FsbGVkJykpO1xuICAgICAgICBzaW5vbi5zdHViKHJlc3BvbnNlLCAnYm9keScpLmdldCgoKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIGFjY2Vzc2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNOdWxsKFxuICAgICAgICBhd2FpdCBmZXRjaExpbmtQcmV2aWV3SW1hZ2UoXG4gICAgICAgICAgZmFrZUZldGNoLFxuICAgICAgICAgICdodHRwczovL2V4YW1wbGUuY29tL2ltZycsXG4gICAgICAgICAgYWJvcnRDb250cm9sbGVyLnNpZ25hbFxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBpZiB0aGUgcmVxdWVzdCB3YXMgYWJvcnRlZCBhZnRlciB0aGUgaW1hZ2Ugd2FzIHJlYWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICAgIGNvbnN0IGZpeHR1cmUgPSBhd2FpdCByZWFkRml4dHVyZSgna2l0dGVuLTEtNjQtNjQuanBnJyk7XG5cbiAgICAgIGNvbnN0IGZha2VGZXRjaCA9IHN0dWIoKS5jYWxsc0Zha2UoKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZShmaXh0dXJlLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IGZpeHR1cmUubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9sZEJ1ZmZlck1ldGhvZCA9IHJlc3BvbnNlLmJ1ZmZlci5iaW5kKHJlc3BvbnNlKTtcbiAgICAgICAgc2lub24uc3R1YihyZXNwb25zZSwgJ2J1ZmZlcicpLmNhbGxzRmFrZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IG9sZEJ1ZmZlck1ldGhvZCgpO1xuICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc051bGwoXG4gICAgICAgIGF3YWl0IGZldGNoTGlua1ByZXZpZXdJbWFnZShcbiAgICAgICAgICBmYWtlRmV0Y2gsXG4gICAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1nJyxcbiAgICAgICAgICBhYm9ydENvbnRyb2xsZXIuc2lnbmFsXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLHdCQUF5QjtBQUN6QixZQUF1QjtBQUN2QixTQUFvQjtBQUNwQixXQUFzQjtBQUN0Qiw4QkFBNEI7QUFDNUIsa0JBQTZDO0FBRzdDLDhCQUdPO0FBRVAsU0FBUyx5QkFBeUIsTUFBTTtBQUt0QyxrQkFBcUI7QUFDbkIsV0FBTyxNQUFNLEtBQUs7QUFBQSxFQUNwQjtBQUZTLEFBSVQsTUFBSTtBQUNKLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixXQUFPLE1BQU0sS0FBSztBQUNsQixhQUFTLEVBQUUsS0FBSztBQUFBLEVBQ2xCLENBQUM7QUFFRCxXQUFTLDRCQUE0QixNQUFNO0FBQ3pDLFVBQU0sV0FBVyx3QkFBQyxjQUFxQyxDQUFDLE1BQU07QUFBQTtBQUFBO0FBQUEsY0FHcEQsWUFBWSxLQUFLLElBQUk7QUFBQTtBQUFBO0FBQUEsT0FIZDtBQVFqQixVQUFNLGVBQWUsd0JBQUM7QUFBQSxNQUNwQixTQUFTO0FBQUEsTUFDVCxVQUFVLENBQUM7QUFBQSxNQUNYLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixDQUFDO0FBQUEsTUFDN0MsTUFBTTtBQUFBLFFBTUosQ0FBQyxNQUFNO0FBQ1QsVUFBSTtBQUNKLFVBQUk7QUFDSixVQUFJLENBQUMsTUFBTTtBQUNULHFCQUFhO0FBQ2IscUJBQWE7QUFBQSxNQUNmLFdBQVcsT0FBTyxTQUFTLFVBQVU7QUFDbkMsY0FBTSxVQUFVLElBQUksWUFBWSxFQUFFLE9BQU8sSUFBSTtBQUM3QyxxQkFBYSxRQUFRO0FBQ3JCLHFCQUFjLHlCQUF5QjtBQUNyQyxnQkFBTTtBQUFBLFFBQ1IsRUFBRztBQUFBLE1BQ0wsV0FBVyxnQkFBZ0IsWUFBWTtBQUNyQyxxQkFBYSxLQUFLO0FBQ2xCLHFCQUFjLHlCQUF5QjtBQUNyQyxnQkFBTTtB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
