var import_chai = require("chai");
var import_SchemaVersion = require("../../types/SchemaVersion");
describe("SchemaVersion", () => {
  describe("isValid", () => {
    it("should return true for positive integers", () => {
      import_chai.assert.isTrue((0, import_SchemaVersion.isValid)(0));
      import_chai.assert.isTrue((0, import_SchemaVersion.isValid)(1));
      import_chai.assert.isTrue((0, import_SchemaVersion.isValid)(2));
    });
    it("should return false for any other value", () => {
      import_chai.assert.isFalse((0, import_SchemaVersion.isValid)(null));
      import_chai.assert.isFalse((0, import_SchemaVersion.isValid)(-1));
      import_chai.assert.isFalse((0, import_SchemaVersion.isValid)(""));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2NoZW1hVmVyc2lvbl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tICcuLi8uLi90eXBlcy9TY2hlbWFWZXJzaW9uJztcblxuZGVzY3JpYmUoJ1NjaGVtYVZlcnNpb24nLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdpc1ZhbGlkJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIHBvc2l0aXZlIGludGVnZXJzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1ZhbGlkKDApKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNWYWxpZCgxKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzVmFsaWQoMikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIGFueSBvdGhlciB2YWx1ZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWQobnVsbCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZCgtMSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZCgnJykpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDJCQUF3QjtBQUV4QixTQUFTLGlCQUFpQixNQUFNO0FBQzlCLFdBQVMsV0FBVyxNQUFNO0FBQ3hCLE9BQUcsNENBQTRDLE1BQU07QUFDbkQseUJBQU8sT0FBTyxrQ0FBUSxDQUFDLENBQUM7QUFDeEIseUJBQU8sT0FBTyxrQ0FBUSxDQUFDLENBQUM7QUFDeEIseUJBQU8sT0FBTyxrQ0FBUSxDQUFDLENBQUM7QUFBQSxJQUMxQixDQUFDO0FBRUQsT0FBRywyQ0FBMkMsTUFBTTtBQUNsRCx5QkFBTyxRQUFRLGtDQUFRLElBQUksQ0FBQztBQUM1Qix5QkFBTyxRQUFRLGtDQUFRLEVBQUUsQ0FBQztBQUMxQix5QkFBTyxRQUFRLGtDQUFRLEVBQUUsQ0FBQztBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
