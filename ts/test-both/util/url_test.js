var import_chai = require("chai");
var import_iterables = require("../../util/iterables");
var import_url = require("../../util/url");
describe("URL utilities", () => {
  describe("maybeParseUrl", () => {
    it("parses valid URLs", () => {
      [
        "https://example.com",
        "https://example.com:123/pathname?query=string#hash",
        "file:///path/to/file.txt"
      ].forEach((href) => {
        import_chai.assert.deepEqual((0, import_url.maybeParseUrl)(href), new URL(href));
      });
    });
    it("returns undefined for invalid URLs", () => {
      ["", "example.com"].forEach((href) => {
        import_chai.assert.isUndefined((0, import_url.maybeParseUrl)(href));
      });
    });
    it("handles non-strings for compatibility, returning undefined", () => {
      [void 0, null, 123, ["https://example.com"]].forEach((value) => {
        import_chai.assert.isUndefined((0, import_url.maybeParseUrl)(value));
      });
    });
  });
  describe("setUrlSearchParams", () => {
    it("returns a new URL with updated search params", () => {
      const params = {
        normal_string: "foo",
        empty_string: "",
        number: 123,
        true_bool: true,
        false_bool: false,
        null_value: null,
        undefined_value: void 0,
        array: ["ok", "wow"],
        stringified: { toString: () => "bar" }
      };
      const newUrl = (0, import_url.setUrlSearchParams)(new URL("https://example.com/path?should_be=overwritten#hash"), params);
      (0, import_chai.assert)(newUrl.href.startsWith("https://example.com/path?"));
      import_chai.assert.strictEqual(newUrl.hash, "#hash");
      import_chai.assert.strictEqual((0, import_iterables.size)(newUrl.searchParams.entries()), Object.keys(params).length);
      import_chai.assert.strictEqual(newUrl.searchParams.get("normal_string"), "foo");
      import_chai.assert.strictEqual(newUrl.searchParams.get("empty_string"), "");
      import_chai.assert.strictEqual(newUrl.searchParams.get("number"), "123");
      import_chai.assert.strictEqual(newUrl.searchParams.get("true_bool"), "true");
      import_chai.assert.strictEqual(newUrl.searchParams.get("false_bool"), "false");
      import_chai.assert.strictEqual(newUrl.searchParams.get("null_value"), "");
      import_chai.assert.strictEqual(newUrl.searchParams.get("undefined_value"), "");
      import_chai.assert.strictEqual(newUrl.searchParams.get("array"), "ok,wow");
      import_chai.assert.strictEqual(newUrl.searchParams.get("stringified"), "bar");
    });
    it("doesn't touch the original URL or its params", () => {
      const originalHref = "https://example.com/path?query=string";
      const originalUrl = new URL(originalHref);
      const params = { foo: "bar" };
      const newUrl = (0, import_url.setUrlSearchParams)(originalUrl, params);
      import_chai.assert.notStrictEqual(originalUrl, newUrl);
      import_chai.assert.strictEqual(originalUrl.href, originalHref);
      params.foo = "should be ignored";
      import_chai.assert.strictEqual(newUrl.search, "?foo=bar");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXJsX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBzaXplIH0gZnJvbSAnLi4vLi4vdXRpbC9pdGVyYWJsZXMnO1xuXG5pbXBvcnQgeyBtYXliZVBhcnNlVXJsLCBzZXRVcmxTZWFyY2hQYXJhbXMgfSBmcm9tICcuLi8uLi91dGlsL3VybCc7XG5cbmRlc2NyaWJlKCdVUkwgdXRpbGl0aWVzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnbWF5YmVQYXJzZVVybCcsICgpID0+IHtcbiAgICBpdCgncGFyc2VzIHZhbGlkIFVSTHMnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgICdodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgJ2h0dHBzOi8vZXhhbXBsZS5jb206MTIzL3BhdGhuYW1lP3F1ZXJ5PXN0cmluZyNoYXNoJyxcbiAgICAgICAgJ2ZpbGU6Ly8vcGF0aC90by9maWxlLnR4dCcsXG4gICAgICBdLmZvckVhY2goaHJlZiA9PiB7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwobWF5YmVQYXJzZVVybChocmVmKSwgbmV3IFVSTChocmVmKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBmb3IgaW52YWxpZCBVUkxzJywgKCkgPT4ge1xuICAgICAgWycnLCAnZXhhbXBsZS5jb20nXS5mb3JFYWNoKGhyZWYgPT4ge1xuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQobWF5YmVQYXJzZVVybChocmVmKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIG5vbi1zdHJpbmdzIGZvciBjb21wYXRpYmlsaXR5LCByZXR1cm5pbmcgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgW3VuZGVmaW5lZCwgbnVsbCwgMTIzLCBbJ2h0dHBzOi8vZXhhbXBsZS5jb20nXV0uZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChtYXliZVBhcnNlVXJsKHZhbHVlIGFzIGFueSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXRVcmxTZWFyY2hQYXJhbXMnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYSBuZXcgVVJMIHdpdGggdXBkYXRlZCBzZWFyY2ggcGFyYW1zJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBub3JtYWxfc3RyaW5nOiAnZm9vJyxcbiAgICAgICAgZW1wdHlfc3RyaW5nOiAnJyxcbiAgICAgICAgbnVtYmVyOiAxMjMsXG4gICAgICAgIHRydWVfYm9vbDogdHJ1ZSxcbiAgICAgICAgZmFsc2VfYm9vbDogZmFsc2UsXG4gICAgICAgIG51bGxfdmFsdWU6IG51bGwsXG4gICAgICAgIHVuZGVmaW5lZF92YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBhcnJheTogWydvaycsICd3b3cnXSxcbiAgICAgICAgc3RyaW5naWZpZWQ6IHsgdG9TdHJpbmc6ICgpID0+ICdiYXInIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBuZXdVcmwgPSBzZXRVcmxTZWFyY2hQYXJhbXMoXG4gICAgICAgIG5ldyBVUkwoJ2h0dHBzOi8vZXhhbXBsZS5jb20vcGF0aD9zaG91bGRfYmU9b3ZlcndyaXR0ZW4jaGFzaCcpLFxuICAgICAgICBwYXJhbXNcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydChuZXdVcmwuaHJlZi5zdGFydHNXaXRoKCdodHRwczovL2V4YW1wbGUuY29tL3BhdGg/JykpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5ld1VybC5oYXNoLCAnI2hhc2gnKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBzaXplKG5ld1VybC5zZWFyY2hQYXJhbXMuZW50cmllcygpKSxcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGhcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmV3VXJsLnNlYXJjaFBhcmFtcy5nZXQoJ25vcm1hbF9zdHJpbmcnKSwgJ2ZvbycpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5ld1VybC5zZWFyY2hQYXJhbXMuZ2V0KCdlbXB0eV9zdHJpbmcnKSwgJycpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5ld1VybC5zZWFyY2hQYXJhbXMuZ2V0KCdudW1iZXInKSwgJzEyMycpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5ld1VybC5zZWFyY2hQYXJhbXMuZ2V0KCd0cnVlX2Jvb2wnKSwgJ3RydWUnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChuZXdVcmwuc2VhcmNoUGFyYW1zLmdldCgnZmFsc2VfYm9vbCcpLCAnZmFsc2UnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChuZXdVcmwuc2VhcmNoUGFyYW1zLmdldCgnbnVsbF92YWx1ZScpLCAnJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmV3VXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3VuZGVmaW5lZF92YWx1ZScpLCAnJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmV3VXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2FycmF5JyksICdvayx3b3cnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChuZXdVcmwuc2VhcmNoUGFyYW1zLmdldCgnc3RyaW5naWZpZWQnKSwgJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJkb2Vzbid0IHRvdWNoIHRoZSBvcmlnaW5hbCBVUkwgb3IgaXRzIHBhcmFtc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBvcmlnaW5hbEhyZWYgPSAnaHR0cHM6Ly9leGFtcGxlLmNvbS9wYXRoP3F1ZXJ5PXN0cmluZyc7XG4gICAgICBjb25zdCBvcmlnaW5hbFVybCA9IG5ldyBVUkwob3JpZ2luYWxIcmVmKTtcblxuICAgICAgY29uc3QgcGFyYW1zID0geyBmb286ICdiYXInIH07XG5cbiAgICAgIGNvbnN0IG5ld1VybCA9IHNldFVybFNlYXJjaFBhcmFtcyhvcmlnaW5hbFVybCwgcGFyYW1zKTtcblxuICAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKG9yaWdpbmFsVXJsLCBuZXdVcmwpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG9yaWdpbmFsVXJsLmhyZWYsIG9yaWdpbmFsSHJlZik7XG5cbiAgICAgIHBhcmFtcy5mb28gPSAnc2hvdWxkIGJlIGlnbm9yZWQnO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5ld1VybC5zZWFyY2gsICc/Zm9vPWJhcicpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBQ3ZCLHVCQUFxQjtBQUVyQixpQkFBa0Q7QUFFbEQsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixXQUFTLGlCQUFpQixNQUFNO0FBQzlCLE9BQUcscUJBQXFCLE1BQU07QUFDNUI7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLEVBQUUsUUFBUSxVQUFRO0FBQ2hCLDJCQUFPLFVBQVUsOEJBQWMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUM7QUFBQSxNQUNyRCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsT0FBRyxzQ0FBc0MsTUFBTTtBQUM3QyxPQUFDLElBQUksYUFBYSxFQUFFLFFBQVEsVUFBUTtBQUNsQywyQkFBTyxZQUFZLDhCQUFjLElBQUksQ0FBQztBQUFBLE1BQ3hDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxPQUFHLDhEQUE4RCxNQUFNO0FBQ3JFLE9BQUMsUUFBVyxNQUFNLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLFFBQVEsV0FBUztBQUUvRCwyQkFBTyxZQUFZLDhCQUFjLEtBQVksQ0FBQztBQUFBLE1BQ2hELENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLHNCQUFzQixNQUFNO0FBQ25DLE9BQUcsZ0RBQWdELE1BQU07QUFDdkQsWUFBTSxTQUFTO0FBQUEsUUFDYixlQUFlO0FBQUEsUUFDZixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixpQkFBaUI7QUFBQSxRQUNqQixPQUFPLENBQUMsTUFBTSxLQUFLO0FBQUEsUUFDbkIsYUFBYSxFQUFFLFVBQVUsTUFBTSxNQUFNO0FBQUEsTUFDdkM7QUFFQSxZQUFNLFNBQVMsbUNBQ2IsSUFBSSxJQUFJLHFEQUFxRCxHQUM3RCxNQUNGO0FBRUEsOEJBQU8sT0FBTyxLQUFLLFdBQVcsMkJBQTJCLENBQUM7QUFDMUQseUJBQU8sWUFBWSxPQUFPLE1BQU0sT0FBTztBQUV2Qyx5QkFBTyxZQUNMLDJCQUFLLE9BQU8sYUFBYSxRQUFRLENBQUMsR0FDbEMsT0FBTyxLQUFLLE1BQU0sRUFBRSxNQUN0QjtBQUNBLHlCQUFPLFlBQVksT0FBTyxhQUFhLElBQUksZUFBZSxHQUFHLEtBQUs7QUFDbEUseUJBQU8sWUFBWSxPQUFPLGFBQWEsSUFBSSxjQUFjLEdBQUcsRUFBRTtBQUM5RCx5QkFBTyxZQUFZLE9BQU8sYUFBYSxJQUFJLFFBQVEsR0FBRyxLQUFLO0FBQzNELHlCQUFPLFlBQVksT0FBTyxhQUFhLElBQUksV0FBVyxHQUFHLE1BQU07QUFDL0QseUJBQU8sWUFBWSxPQUFPLGFBQWEsSUFBSSxZQUFZLEdBQUcsT0FBTztBQUNqRSx5QkFBTyxZQUFZLE9BQU8sYUFBYSxJQUFJLFlBQVksR0FBRyxFQUFFO0FBQzVELHlCQUFPLFlBQVksT0FBTyxhQUFhLElBQUksaUJBQWlCLEdBQUcsRUFBRTtBQUNqRSx5QkFBTyxZQUFZLE9BQU8sYUFBYSxJQUFJLE9BQU8sR0FBRyxRQUFRO0FBQzdELHlCQUFPLFlBQVksT0FBTyxhQUFhLElBQUksYUFBYSxHQUFHLEtBQUs7QUFBQSxJQUNsRSxDQUFDO0FBRUQsT0FBRyxnREFBZ0QsTUFBTTtBQUN2RCxZQUFNLGVBQWU7QUFDckIsWUFBTSxjQUFjLElBQUksSUFBSSxZQUFZO0FBRXhDLFlBQU0sU0FBUyxFQUFFLEtBQUssTUFBTTtBQUU1QixZQUFNLFNBQVMsbUNBQW1CLGFBQWEsTUFBTTtBQUVyRCx5QkFBTyxlQUFlLGFBQWEsTUFBTTtBQUN6Qyx5QkFBTyxZQUFZLFlBQVksTUFBTSxZQUFZO0FBRWpELGFBQU8sTUFBTTtBQUNiLHlCQUFPLFlBQVksT0FBTyxRQUFRLFVBQVU7QUFBQSxJQUM5QyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
