var import_chai = require("chai");
var import_isValidE164 = require("../../util/isValidE164");
describe("isValidE164", () => {
  it("returns false for non-strings", () => {
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)(void 0, false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)(18885551234, false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)(["+18885551234"], false));
  });
  it("returns false for invalid E164s", () => {
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("+05551234", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("+1800ENCRYPT", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("+1-888-555-1234", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("+1 (888) 555-1234", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("+1012345678901234", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("+18885551234extra", false));
  });
  it("returns true for E164s that look valid", () => {
    import_chai.assert.isTrue((0, import_isValidE164.isValidE164)("+18885551234", false));
    import_chai.assert.isTrue((0, import_isValidE164.isValidE164)("+123456789012", false));
    import_chai.assert.isTrue((0, import_isValidE164.isValidE164)("+12", false));
  });
  it("can make the leading + optional or required", () => {
    import_chai.assert.isTrue((0, import_isValidE164.isValidE164)("18885551234", false));
    import_chai.assert.isFalse((0, import_isValidE164.isValidE164)("18885551234", true));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNWYWxpZEUxNjRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNWYWxpZEUxNjQgfSBmcm9tICcuLi8uLi91dGlsL2lzVmFsaWRFMTY0JztcblxuZGVzY3JpYmUoJ2lzVmFsaWRFMTY0JywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLXN0cmluZ3MnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZEUxNjQodW5kZWZpbmVkLCBmYWxzZSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KDE4ODg1NTUxMjM0LCBmYWxzZSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KFsnKzE4ODg1NTUxMjM0J10sIGZhbHNlKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpbnZhbGlkIEUxNjRzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KCcnLCBmYWxzZSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KCcrMDU1NTEyMzQnLCBmYWxzZSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KCcrMTgwMEVOQ1JZUFQnLCBmYWxzZSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KCcrMS04ODgtNTU1LTEyMzQnLCBmYWxzZSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRFMTY0KCcrMSAoODg4KSA1NTUtMTIzNCcsIGZhbHNlKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZEUxNjQoJysxMDEyMzQ1Njc4OTAxMjM0JywgZmFsc2UpKTtcbiAgICBhc3NlcnQuaXNGYWxzZShpc1ZhbGlkRTE2NCgnKzE4ODg1NTUxMjM0ZXh0cmEnLCBmYWxzZSkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGZvciBFMTY0cyB0aGF0IGxvb2sgdmFsaWQnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc1ZhbGlkRTE2NCgnKzE4ODg1NTUxMjM0JywgZmFsc2UpKTtcbiAgICBhc3NlcnQuaXNUcnVlKGlzVmFsaWRFMTY0KCcrMTIzNDU2Nzg5MDEyJywgZmFsc2UpKTtcbiAgICBhc3NlcnQuaXNUcnVlKGlzVmFsaWRFMTY0KCcrMTInLCBmYWxzZSkpO1xuICB9KTtcblxuICBpdCgnY2FuIG1ha2UgdGhlIGxlYWRpbmcgKyBvcHRpb25hbCBvciByZXF1aXJlZCcsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGlzVmFsaWRFMTY0KCcxODg4NTU1MTIzNCcsIGZhbHNlKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZEUxNjQoJzE4ODg1NTUxMjM0JywgdHJ1ZSkpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHlCQUE0QjtBQUU1QixTQUFTLGVBQWUsTUFBTTtBQUM1QixLQUFHLGlDQUFpQyxNQUFNO0FBQ3hDLHVCQUFPLFFBQVEsb0NBQVksUUFBVyxLQUFLLENBQUM7QUFDNUMsdUJBQU8sUUFBUSxvQ0FBWSxhQUFhLEtBQUssQ0FBQztBQUM5Qyx1QkFBTyxRQUFRLG9DQUFZLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ3JELENBQUM7QUFFRCxLQUFHLG1DQUFtQyxNQUFNO0FBQzFDLHVCQUFPLFFBQVEsb0NBQVksSUFBSSxLQUFLLENBQUM7QUFDckMsdUJBQU8sUUFBUSxvQ0FBWSxhQUFhLEtBQUssQ0FBQztBQUM5Qyx1QkFBTyxRQUFRLG9DQUFZLGdCQUFnQixLQUFLLENBQUM7QUFDakQsdUJBQU8sUUFBUSxvQ0FBWSxtQkFBbUIsS0FBSyxDQUFDO0FBQ3BELHVCQUFPLFFBQVEsb0NBQVkscUJBQXFCLEtBQUssQ0FBQztBQUN0RCx1QkFBTyxRQUFRLG9DQUFZLHFCQUFxQixLQUFLLENBQUM7QUFDdEQsdUJBQU8sUUFBUSxvQ0FBWSxxQkFBcUIsS0FBSyxDQUFDO0FBQUEsRUFDeEQsQ0FBQztBQUVELEtBQUcsMENBQTBDLE1BQU07QUFDakQsdUJBQU8sT0FBTyxvQ0FBWSxnQkFBZ0IsS0FBSyxDQUFDO0FBQ2hELHVCQUFPLE9BQU8sb0NBQVksaUJBQWlCLEtBQUssQ0FBQztBQUNqRCx1QkFBTyxPQUFPLG9DQUFZLE9BQU8sS0FBSyxDQUFDO0FBQUEsRUFDekMsQ0FBQztBQUVELEtBQUcsK0NBQStDLE1BQU07QUFDdEQsdUJBQU8sT0FBTyxvQ0FBWSxlQUFlLEtBQUssQ0FBQztBQUMvQyx1QkFBTyxRQUFRLG9DQUFZLGVBQWUsSUFBSSxDQUFDO0FBQUEsRUFDakQsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
