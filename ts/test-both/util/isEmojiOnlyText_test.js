var import_chai = require("chai");
var import_isEmojiOnlyText = require("../../util/isEmojiOnlyText");
describe("isEmojiOnlyText", () => {
  it("returns false on empty string", () => {
    import_chai.assert.isFalse((0, import_isEmojiOnlyText.isEmojiOnlyText)(""));
  });
  it("returns false on non-emoji string", () => {
    import_chai.assert.isFalse((0, import_isEmojiOnlyText.isEmojiOnlyText)("123"));
  });
  it("returns false on mixed emoji/text string", () => {
    import_chai.assert.isFalse((0, import_isEmojiOnlyText.isEmojiOnlyText)("12\u{1F60E}3"));
  });
  it("returns false on mixed emoji/text string starting with emoji", () => {
    import_chai.assert.isFalse((0, import_isEmojiOnlyText.isEmojiOnlyText)("\u{1F60E}12\u{1F60E}3"));
  });
  it("returns true on all emoji string", () => {
    import_chai.assert.isTrue((0, import_isEmojiOnlyText.isEmojiOnlyText)("\u{1F60E}\u{1F44D}\u{1F600}\u{1F62E}\u200D\u{1F4A8}"));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNFbW9qaU9ubHlUZXh0X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzRW1vamlPbmx5VGV4dCB9IGZyb20gJy4uLy4uL3V0aWwvaXNFbW9qaU9ubHlUZXh0JztcblxuZGVzY3JpYmUoJ2lzRW1vamlPbmx5VGV4dCcsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgZmFsc2Ugb24gZW1wdHkgc3RyaW5nJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzRW1vamlPbmx5VGV4dCgnJykpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBvbiBub24tZW1vamkgc3RyaW5nJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzRW1vamlPbmx5VGV4dCgnMTIzJykpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBvbiBtaXhlZCBlbW9qaS90ZXh0IHN0cmluZycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShpc0Vtb2ppT25seVRleHQoJzEyXHVEODNEXHVERTBFMycpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2Ugb24gbWl4ZWQgZW1vamkvdGV4dCBzdHJpbmcgc3RhcnRpbmcgd2l0aCBlbW9qaScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShpc0Vtb2ppT25seVRleHQoJ1x1RDgzRFx1REUwRTEyXHVEODNEXHVERTBFMycpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBhbGwgZW1vamkgc3RyaW5nJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoaXNFbW9qaU9ubHlUZXh0KCdcdUQ4M0RcdURFMEVcdUQ4M0RcdURDNERcdUQ4M0RcdURFMDBcdUQ4M0RcdURFMkVcdTIwMERcdUQ4M0RcdURDQTgnKSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsNkJBQWdDO0FBRWhDLFNBQVMsbUJBQW1CLE1BQU07QUFDaEMsS0FBRyxpQ0FBaUMsTUFBTTtBQUN4Qyx1QkFBTyxRQUFRLDRDQUFnQixFQUFFLENBQUM7QUFBQSxFQUNwQyxDQUFDO0FBRUQsS0FBRyxxQ0FBcUMsTUFBTTtBQUM1Qyx1QkFBTyxRQUFRLDRDQUFnQixLQUFLLENBQUM7QUFBQSxFQUN2QyxDQUFDO0FBRUQsS0FBRyw0Q0FBNEMsTUFBTTtBQUNuRCx1QkFBTyxRQUFRLDRDQUFnQixjQUFPLENBQUM7QUFBQSxFQUN6QyxDQUFDO0FBRUQsS0FBRyxnRUFBZ0UsTUFBTTtBQUN2RSx1QkFBTyxRQUFRLDRDQUFnQix1QkFBUyxDQUFDO0FBQUEsRUFDM0MsQ0FBQztBQUVELEtBQUcsb0NBQW9DLE1BQU07QUFDM0MsdUJBQU8sT0FBTyw0Q0FBZ0IscURBQWEsQ0FBQztBQUFBLEVBQzlDLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
