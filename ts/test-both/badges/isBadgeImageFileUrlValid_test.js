var import_chai = require("chai");
var import_isBadgeImageFileUrlValid = require("../../badges/isBadgeImageFileUrlValid");
describe("isBadgeImageFileUrlValid", () => {
  const UPDATES_URL = "https://updates2.signal.org/desktop";
  it("returns false for invalid URLs", () => {
    ["", "uhh", "http:"].forEach((url) => {
      import_chai.assert.isFalse((0, import_isBadgeImageFileUrlValid.isBadgeImageFileUrlValid)(url, UPDATES_URL));
    });
  });
  it("returns false if the URL doesn't start with the right prefix", () => {
    [
      "https://user:pass@updates2.signal.org/static/badges/foo",
      "https://signal.org/static/badges/foo",
      "https://updates.signal.org/static/badges/foo",
      "http://updates2.signal.org/static/badges/foo",
      "http://updates2.signal.org/static/badges/foo"
    ].forEach((url) => {
      import_chai.assert.isFalse((0, import_isBadgeImageFileUrlValid.isBadgeImageFileUrlValid)(url, UPDATES_URL));
    });
  });
  it("returns true for valid URLs", () => {
    [
      "https://updates2.signal.org/static/badges/foo",
      "https://updates2.signal.org/static/badges/foo.svg",
      "https://updates2.signal.org/static/badges/foo.txt"
    ].forEach((url) => {
      import_chai.assert.isTrue((0, import_isBadgeImageFileUrlValid.isBadgeImageFileUrlValid)(url, UPDATES_URL));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNCYWRnZUltYWdlRmlsZVVybFZhbGlkX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzQmFkZ2VJbWFnZUZpbGVVcmxWYWxpZCB9IGZyb20gJy4uLy4uL2JhZGdlcy9pc0JhZGdlSW1hZ2VGaWxlVXJsVmFsaWQnO1xuXG5kZXNjcmliZSgnaXNCYWRnZUltYWdlRmlsZVVybFZhbGlkJywgKCkgPT4ge1xuICBjb25zdCBVUERBVEVTX1VSTCA9ICdodHRwczovL3VwZGF0ZXMyLnNpZ25hbC5vcmcvZGVza3RvcCc7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGludmFsaWQgVVJMcycsICgpID0+IHtcbiAgICBbJycsICd1aGgnLCAnaHR0cDonXS5mb3JFYWNoKHVybCA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0JhZGdlSW1hZ2VGaWxlVXJsVmFsaWQodXJsLCBVUERBVEVTX1VSTCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdChcInJldHVybnMgZmFsc2UgaWYgdGhlIFVSTCBkb2Vzbid0IHN0YXJ0IHdpdGggdGhlIHJpZ2h0IHByZWZpeFwiLCAoKSA9PiB7XG4gICAgW1xuICAgICAgJ2h0dHBzOi8vdXNlcjpwYXNzQHVwZGF0ZXMyLnNpZ25hbC5vcmcvc3RhdGljL2JhZGdlcy9mb28nLFxuICAgICAgJ2h0dHBzOi8vc2lnbmFsLm9yZy9zdGF0aWMvYmFkZ2VzL2ZvbycsXG4gICAgICAnaHR0cHM6Ly91cGRhdGVzLnNpZ25hbC5vcmcvc3RhdGljL2JhZGdlcy9mb28nLFxuICAgICAgJ2h0dHA6Ly91cGRhdGVzMi5zaWduYWwub3JnL3N0YXRpYy9iYWRnZXMvZm9vJyxcbiAgICAgICdodHRwOi8vdXBkYXRlczIuc2lnbmFsLm9yZy9zdGF0aWMvYmFkZ2VzL2ZvbycsXG4gICAgXS5mb3JFYWNoKHVybCA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0JhZGdlSW1hZ2VGaWxlVXJsVmFsaWQodXJsLCBVUERBVEVTX1VSTCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGZvciB2YWxpZCBVUkxzJywgKCkgPT4ge1xuICAgIFtcbiAgICAgICdodHRwczovL3VwZGF0ZXMyLnNpZ25hbC5vcmcvc3RhdGljL2JhZGdlcy9mb28nLFxuICAgICAgJ2h0dHBzOi8vdXBkYXRlczIuc2lnbmFsLm9yZy9zdGF0aWMvYmFkZ2VzL2Zvby5zdmcnLFxuICAgICAgJ2h0dHBzOi8vdXBkYXRlczIuc2lnbmFsLm9yZy9zdGF0aWMvYmFkZ2VzL2Zvby50eHQnLFxuICAgIF0uZm9yRWFjaCh1cmwgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0JhZGdlSW1hZ2VGaWxlVXJsVmFsaWQodXJsLCBVUERBVEVTX1VSTCkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHNDQUF5QztBQUV6QyxTQUFTLDRCQUE0QixNQUFNO0FBQ3pDLFFBQU0sY0FBYztBQUVwQixLQUFHLGtDQUFrQyxNQUFNO0FBQ3pDLEtBQUMsSUFBSSxPQUFPLE9BQU8sRUFBRSxRQUFRLFNBQU87QUFDbEMseUJBQU8sUUFBUSw4REFBeUIsS0FBSyxXQUFXLENBQUM7QUFBQSxJQUMzRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyxnRUFBZ0UsTUFBTTtBQUN2RTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixFQUFFLFFBQVEsU0FBTztBQUNmLHlCQUFPLFFBQVEsOERBQXlCLEtBQUssV0FBVyxDQUFDO0FBQUEsSUFDM0QsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELEtBQUcsK0JBQStCLE1BQU07QUFDdEM7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLEVBQUUsUUFBUSxTQUFPO0FBQ2YseUJBQU8sT0FBTyw4REFBeUIsS0FBSyxXQUFXLENBQUM7QUFBQSxJQUMxRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
