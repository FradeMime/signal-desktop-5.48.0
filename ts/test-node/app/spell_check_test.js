var import_chai = require("chai");
var import_spell_check = require("../../../app/spell_check");
describe("SpellCheck", () => {
  describe("getLanguages", () => {
    it("works with locale and base available", () => {
      import_chai.assert.deepEqual((0, import_spell_check.getLanguages)("en-US", ["en-US", "en-CA", "en"]), [
        "en-US",
        "en"
      ]);
    });
    it("works with neither locale nor base available", () => {
      import_chai.assert.deepEqual((0, import_spell_check.getLanguages)("en-US", ["en-NZ", "en-CA"]), [
        "en-NZ",
        "en-CA"
      ]);
    });
    it("works with only base locale available", () => {
      import_chai.assert.deepEqual((0, import_spell_check.getLanguages)("en-US", ["en", "en-CA"]), ["en"]);
    });
    it("works with only full locale available", () => {
      import_chai.assert.deepEqual((0, import_spell_check.getLanguages)("en-US", ["en-CA", "en-US"]), ["en-US"]);
    });
    it("works with base provided and base available", () => {
      import_chai.assert.deepEqual((0, import_spell_check.getLanguages)("en", ["en-CA", "en-US", "en"]), ["en"]);
    });
    it("works with base provided and base not available", () => {
      import_chai.assert.deepEqual((0, import_spell_check.getLanguages)("en", ["en-CA", "en-US"]), [
        "en-CA",
        "en-US"
      ]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3BlbGxfY2hlY2tfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBnZXRMYW5ndWFnZXMgfSBmcm9tICcuLi8uLi8uLi9hcHAvc3BlbGxfY2hlY2snO1xuXG5kZXNjcmliZSgnU3BlbGxDaGVjaycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2dldExhbmd1YWdlcycsICgpID0+IHtcbiAgICBpdCgnd29ya3Mgd2l0aCBsb2NhbGUgYW5kIGJhc2UgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRMYW5ndWFnZXMoJ2VuLVVTJywgWydlbi1VUycsICdlbi1DQScsICdlbiddKSwgW1xuICAgICAgICAnZW4tVVMnLFxuICAgICAgICAnZW4nLFxuICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBuZWl0aGVyIGxvY2FsZSBub3IgYmFzZSBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGdldExhbmd1YWdlcygnZW4tVVMnLCBbJ2VuLU5aJywgJ2VuLUNBJ10pLCBbXG4gICAgICAgICdlbi1OWicsXG4gICAgICAgICdlbi1DQScsXG4gICAgICBdKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIG9ubHkgYmFzZSBsb2NhbGUgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRMYW5ndWFnZXMoJ2VuLVVTJywgWydlbicsICdlbi1DQSddKSwgWydlbiddKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIG9ubHkgZnVsbCBsb2NhbGUgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRMYW5ndWFnZXMoJ2VuLVVTJywgWydlbi1DQScsICdlbi1VUyddKSwgWydlbi1VUyddKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIGJhc2UgcHJvdmlkZWQgYW5kIGJhc2UgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRMYW5ndWFnZXMoJ2VuJywgWydlbi1DQScsICdlbi1VUycsICdlbiddKSwgWydlbiddKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIGJhc2UgcHJvdmlkZWQgYW5kIGJhc2Ugbm90IGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZ2V0TGFuZ3VhZ2VzKCdlbicsIFsnZW4tQ0EnLCAnZW4tVVMnXSksIFtcbiAgICAgICAgJ2VuLUNBJyxcbiAgICAgICAgJ2VuLVVTJyxcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHlCQUE2QjtBQUU3QixTQUFTLGNBQWMsTUFBTTtBQUMzQixXQUFTLGdCQUFnQixNQUFNO0FBQzdCLE9BQUcsd0NBQXdDLE1BQU07QUFDL0MseUJBQU8sVUFBVSxxQ0FBYSxTQUFTLENBQUMsU0FBUyxTQUFTLElBQUksQ0FBQyxHQUFHO0FBQUEsUUFDaEU7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsT0FBRyxnREFBZ0QsTUFBTTtBQUN2RCx5QkFBTyxVQUFVLHFDQUFhLFNBQVMsQ0FBQyxTQUFTLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDMUQ7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsT0FBRyx5Q0FBeUMsTUFBTTtBQUNoRCx5QkFBTyxVQUFVLHFDQUFhLFNBQVMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQUEsSUFDakUsQ0FBQztBQUVELE9BQUcseUNBQXlDLE1BQU07QUFDaEQseUJBQU8sVUFBVSxxQ0FBYSxTQUFTLENBQUMsU0FBUyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUFBLElBQ3ZFLENBQUM7QUFFRCxPQUFHLCtDQUErQyxNQUFNO0FBQ3RELHlCQUFPLFVBQVUscUNBQWEsTUFBTSxDQUFDLFNBQVMsU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUFBLElBQ3ZFLENBQUM7QUFFRCxPQUFHLG1EQUFtRCxNQUFNO0FBQzFELHlCQUFPLFVBQVUscUNBQWEsTUFBTSxDQUFDLFNBQVMsT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUN2RDtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
