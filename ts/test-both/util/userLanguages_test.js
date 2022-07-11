var import_chai = require("chai");
var import_userLanguages = require("../../util/userLanguages");
describe("user language utilities", () => {
  describe("formatAcceptLanguageHeader", () => {
    it("returns * if no languages are provided", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)([]), "*");
    });
    it("formats one provided language", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)(["en-US"]), "en-US");
    });
    it("formats three provided languages", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)("abc".split("")), "a, b;q=0.9, c;q=0.8");
    });
    it("formats 10 provided languages", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)("abcdefghij".split("")), "a, b;q=0.9, c;q=0.8, d;q=0.7, e;q=0.6, f;q=0.5, g;q=0.4, h;q=0.3, i;q=0.2, j;q=0.1");
    });
    it("formats 11 provided languages", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)("abcdefghijk".split("")), "a, b;q=0.9, c;q=0.8, d;q=0.7, e;q=0.6, f;q=0.5, g;q=0.4, h;q=0.3, i;q=0.2, j;q=0.1, k;q=0.09");
    });
    it("formats 19 provided languages", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)("abcdefghijklmnopqrs".split("")), "a, b;q=0.9, c;q=0.8, d;q=0.7, e;q=0.6, f;q=0.5, g;q=0.4, h;q=0.3, i;q=0.2, j;q=0.1, k;q=0.09, l;q=0.08, m;q=0.07, n;q=0.06, o;q=0.05, p;q=0.04, q;q=0.03, r;q=0.02, s;q=0.01");
    });
    it("formats 20 provided languages", () => {
      import_chai.assert.strictEqual((0, import_userLanguages.formatAcceptLanguageHeader)("abcdefghijklmnopqrst".split("")), "a, b;q=0.9, c;q=0.8, d;q=0.7, e;q=0.6, f;q=0.5, g;q=0.4, h;q=0.3, i;q=0.2, j;q=0.1, k;q=0.09, l;q=0.08, m;q=0.07, n;q=0.06, o;q=0.05, p;q=0.04, q;q=0.03, r;q=0.02, s;q=0.01, t;q=0.009");
    });
    it("only formats the first 28 languages", () => {
      const result = (0, import_userLanguages.formatAcceptLanguageHeader)("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
      import_chai.assert.include(result, "B;q=0.001");
      import_chai.assert.notInclude(result, "C");
      import_chai.assert.notInclude(result, "D");
      import_chai.assert.notInclude(result, "E");
      import_chai.assert.notInclude(result, "Z");
    });
  });
  describe("getUserLanguages", () => {
    it("returns the fallback if no languages are provided", () => {
      import_chai.assert.deepEqual((0, import_userLanguages.getUserLanguages)([], "fallback"), ["fallback"]);
      import_chai.assert.deepEqual((0, import_userLanguages.getUserLanguages)(void 0, "fallback"), ["fallback"]);
    });
    it("returns the provided languages", () => {
      import_chai.assert.deepEqual((0, import_userLanguages.getUserLanguages)(["a", "b", "c"], "x"), ["a", "b", "c"]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlckxhbmd1YWdlc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtcbiAgZm9ybWF0QWNjZXB0TGFuZ3VhZ2VIZWFkZXIsXG4gIGdldFVzZXJMYW5ndWFnZXMsXG59IGZyb20gJy4uLy4uL3V0aWwvdXNlckxhbmd1YWdlcyc7XG5cbmRlc2NyaWJlKCd1c2VyIGxhbmd1YWdlIHV0aWxpdGllcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2Zvcm1hdEFjY2VwdExhbmd1YWdlSGVhZGVyJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zICogaWYgbm8gbGFuZ3VhZ2VzIGFyZSBwcm92aWRlZCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlcihbXSksICcqJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZm9ybWF0cyBvbmUgcHJvdmlkZWQgbGFuZ3VhZ2UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0QWNjZXB0TGFuZ3VhZ2VIZWFkZXIoWydlbi1VUyddKSwgJ2VuLVVTJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZm9ybWF0cyB0aHJlZSBwcm92aWRlZCBsYW5ndWFnZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZvcm1hdEFjY2VwdExhbmd1YWdlSGVhZGVyKCdhYmMnLnNwbGl0KCcnKSksXG4gICAgICAgICdhLCBiO3E9MC45LCBjO3E9MC44J1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdmb3JtYXRzIDEwIHByb3ZpZGVkIGxhbmd1YWdlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZm9ybWF0QWNjZXB0TGFuZ3VhZ2VIZWFkZXIoJ2FiY2RlZmdoaWonLnNwbGl0KCcnKSksXG4gICAgICAgICdhLCBiO3E9MC45LCBjO3E9MC44LCBkO3E9MC43LCBlO3E9MC42LCBmO3E9MC41LCBnO3E9MC40LCBoO3E9MC4zLCBpO3E9MC4yLCBqO3E9MC4xJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdmb3JtYXRzIDExIHByb3ZpZGVkIGxhbmd1YWdlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZm9ybWF0QWNjZXB0TGFuZ3VhZ2VIZWFkZXIoJ2FiY2RlZmdoaWprJy5zcGxpdCgnJykpLFxuICAgICAgICAnYSwgYjtxPTAuOSwgYztxPTAuOCwgZDtxPTAuNywgZTtxPTAuNiwgZjtxPTAuNSwgZztxPTAuNCwgaDtxPTAuMywgaTtxPTAuMiwgajtxPTAuMSwgaztxPTAuMDknXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Zvcm1hdHMgMTkgcHJvdmlkZWQgbGFuZ3VhZ2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlcignYWJjZGVmZ2hpamtsbW5vcHFycycuc3BsaXQoJycpKSxcbiAgICAgICAgJ2EsIGI7cT0wLjksIGM7cT0wLjgsIGQ7cT0wLjcsIGU7cT0wLjYsIGY7cT0wLjUsIGc7cT0wLjQsIGg7cT0wLjMsIGk7cT0wLjIsIGo7cT0wLjEsIGs7cT0wLjA5LCBsO3E9MC4wOCwgbTtxPTAuMDcsIG47cT0wLjA2LCBvO3E9MC4wNSwgcDtxPTAuMDQsIHE7cT0wLjAzLCByO3E9MC4wMiwgcztxPTAuMDEnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Zvcm1hdHMgMjAgcHJvdmlkZWQgbGFuZ3VhZ2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlcignYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKSksXG4gICAgICAgICdhLCBiO3E9MC45LCBjO3E9MC44LCBkO3E9MC43LCBlO3E9MC42LCBmO3E9MC41LCBnO3E9MC40LCBoO3E9MC4zLCBpO3E9MC4yLCBqO3E9MC4xLCBrO3E9MC4wOSwgbDtxPTAuMDgsIG07cT0wLjA3LCBuO3E9MC4wNiwgbztxPTAuMDUsIHA7cT0wLjA0LCBxO3E9MC4wMywgcjtxPTAuMDIsIHM7cT0wLjAxLCB0O3E9MC4wMDknXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ29ubHkgZm9ybWF0cyB0aGUgZmlyc3QgMjggbGFuZ3VhZ2VzJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybWF0QWNjZXB0TGFuZ3VhZ2VIZWFkZXIoXG4gICAgICAgICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJy5zcGxpdCgnJylcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaW5jbHVkZShyZXN1bHQsICdCO3E9MC4wMDEnKTtcbiAgICAgIGFzc2VydC5ub3RJbmNsdWRlKHJlc3VsdCwgJ0MnKTtcbiAgICAgIGFzc2VydC5ub3RJbmNsdWRlKHJlc3VsdCwgJ0QnKTtcbiAgICAgIGFzc2VydC5ub3RJbmNsdWRlKHJlc3VsdCwgJ0UnKTtcbiAgICAgIGFzc2VydC5ub3RJbmNsdWRlKHJlc3VsdCwgJ1onKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFVzZXJMYW5ndWFnZXMnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIGZhbGxiYWNrIGlmIG5vIGxhbmd1YWdlcyBhcmUgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGdldFVzZXJMYW5ndWFnZXMoW10sICdmYWxsYmFjaycpLCBbJ2ZhbGxiYWNrJ10pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRVc2VyTGFuZ3VhZ2VzKHVuZGVmaW5lZCwgJ2ZhbGxiYWNrJyksIFsnZmFsbGJhY2snXSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgcHJvdmlkZWQgbGFuZ3VhZ2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRVc2VyTGFuZ3VhZ2VzKFsnYScsICdiJywgJ2MnXSwgJ3gnKSwgWydhJywgJ2InLCAnYyddKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUN2QiwyQkFHTztBQUVQLFNBQVMsMkJBQTJCLE1BQU07QUFDeEMsV0FBUyw4QkFBOEIsTUFBTTtBQUMzQyxPQUFHLDBDQUEwQyxNQUFNO0FBQ2pELHlCQUFPLFlBQVkscURBQTJCLENBQUMsQ0FBQyxHQUFHLEdBQUc7QUFBQSxJQUN4RCxDQUFDO0FBRUQsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4Qyx5QkFBTyxZQUFZLHFEQUEyQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU87QUFBQSxJQUNuRSxDQUFDO0FBRUQsT0FBRyxvQ0FBb0MsTUFBTTtBQUMzQyx5QkFBTyxZQUNMLHFEQUEyQixNQUFNLE1BQU0sRUFBRSxDQUFDLEdBQzFDLHFCQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4Qyx5QkFBTyxZQUNMLHFEQUEyQixhQUFhLE1BQU0sRUFBRSxDQUFDLEdBQ2pELG9GQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4Qyx5QkFBTyxZQUNMLHFEQUEyQixjQUFjLE1BQU0sRUFBRSxDQUFDLEdBQ2xELDhGQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4Qyx5QkFBTyxZQUNMLHFEQUEyQixzQkFBc0IsTUFBTSxFQUFFLENBQUMsR0FDMUQsOEtBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLGlDQUFpQyxNQUFNO0FBQ3hDLHlCQUFPLFlBQ0wscURBQTJCLHVCQUF1QixNQUFNLEVBQUUsQ0FBQyxHQUMzRCx5TEFDRjtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsdUNBQXVDLE1BQU07QUFDOUMsWUFBTSxTQUFTLHFEQUNiLHVEQUF1RCxNQUFNLEVBQUUsQ0FDakU7QUFDQSx5QkFBTyxRQUFRLFFBQVEsV0FBVztBQUNsQyx5QkFBTyxXQUFXLFFBQVEsR0FBRztBQUM3Qix5QkFBTyxXQUFXLFFBQVEsR0FBRztBQUM3Qix5QkFBTyxXQUFXLFFBQVEsR0FBRztBQUM3Qix5QkFBTyxXQUFXLFFBQVEsR0FBRztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLG9CQUFvQixNQUFNO0FBQ2pDLE9BQUcscURBQXFELE1BQU07QUFDNUQseUJBQU8sVUFBVSwyQ0FBaUIsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUMvRCx5QkFBTyxVQUFVLDJDQUFpQixRQUFXLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUFBLElBQ3hFLENBQUM7QUFFRCxPQUFHLGtDQUFrQyxNQUFNO0FBQ3pDLHlCQUFPLFVBQVUsMkNBQWlCLENBQUMsS0FBSyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDMUUsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
