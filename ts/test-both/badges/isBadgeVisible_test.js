var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_isBadgeVisible = require("../../badges/isBadgeVisible");
var import_BadgeCategory = require("../../badges/BadgeCategory");
describe("isBadgeVisible", () => {
  const fakeBadge = /* @__PURE__ */ __name((isVisible) => ({
    category: import_BadgeCategory.BadgeCategory.Donor,
    descriptionTemplate: "test",
    id: "TEST",
    images: [],
    name: "test",
    ...typeof isVisible === "boolean" ? { expiresAt: 123, isVisible } : {}
  }), "fakeBadge");
  it("returns true if the visibility is unspecified (someone else's badge)", () => {
    import_chai.assert.isTrue((0, import_isBadgeVisible.isBadgeVisible)(fakeBadge()));
  });
  it("returns false if not visible", () => {
    import_chai.assert.isFalse((0, import_isBadgeVisible.isBadgeVisible)(fakeBadge(false)));
  });
  it("returns true if visible", () => {
    import_chai.assert.isTrue((0, import_isBadgeVisible.isBadgeVisible)(fakeBadge(true)));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNCYWRnZVZpc2libGVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL3R5cGVzJztcblxuaW1wb3J0IHsgaXNCYWRnZVZpc2libGUgfSBmcm9tICcuLi8uLi9iYWRnZXMvaXNCYWRnZVZpc2libGUnO1xuaW1wb3J0IHsgQmFkZ2VDYXRlZ29yeSB9IGZyb20gJy4uLy4uL2JhZGdlcy9CYWRnZUNhdGVnb3J5JztcblxuZGVzY3JpYmUoJ2lzQmFkZ2VWaXNpYmxlJywgKCkgPT4ge1xuICBjb25zdCBmYWtlQmFkZ2UgPSAoaXNWaXNpYmxlPzogYm9vbGVhbik6IEJhZGdlVHlwZSA9PiAoe1xuICAgIGNhdGVnb3J5OiBCYWRnZUNhdGVnb3J5LkRvbm9yLFxuICAgIGRlc2NyaXB0aW9uVGVtcGxhdGU6ICd0ZXN0JyxcbiAgICBpZDogJ1RFU1QnLFxuICAgIGltYWdlczogW10sXG4gICAgbmFtZTogJ3Rlc3QnLFxuICAgIC4uLih0eXBlb2YgaXNWaXNpYmxlID09PSAnYm9vbGVhbicgPyB7IGV4cGlyZXNBdDogMTIzLCBpc1Zpc2libGUgfSA6IHt9KSxcbiAgfSk7XG5cbiAgaXQoXCJyZXR1cm5zIHRydWUgaWYgdGhlIHZpc2liaWxpdHkgaXMgdW5zcGVjaWZpZWQgKHNvbWVvbmUgZWxzZSdzIGJhZGdlKVwiLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc0JhZGdlVmlzaWJsZShmYWtlQmFkZ2UoKSkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgdmlzaWJsZScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShpc0JhZGdlVmlzaWJsZShmYWtlQmFkZ2UoZmFsc2UpKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgaWYgdmlzaWJsZScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGlzQmFkZ2VWaXNpYmxlKGZha2VCYWRnZSh0cnVlKSkpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFHdkIsNEJBQStCO0FBQy9CLDJCQUE4QjtBQUU5QixTQUFTLGtCQUFrQixNQUFNO0FBQy9CLFFBQU0sWUFBWSx3QkFBQyxjQUFvQztBQUFBLElBQ3JELFVBQVUsbUNBQWM7QUFBQSxJQUN4QixxQkFBcUI7QUFBQSxJQUNyQixJQUFJO0FBQUEsSUFDSixRQUFRLENBQUM7QUFBQSxJQUNULE1BQU07QUFBQSxPQUNGLE9BQU8sY0FBYyxZQUFZLEVBQUUsV0FBVyxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQUEsRUFDeEUsSUFQa0I7QUFTbEIsS0FBRyx3RUFBd0UsTUFBTTtBQUMvRSx1QkFBTyxPQUFPLDBDQUFlLFVBQVUsQ0FBQyxDQUFDO0FBQUEsRUFDM0MsQ0FBQztBQUVELEtBQUcsZ0NBQWdDLE1BQU07QUFDdkMsdUJBQU8sUUFBUSwwQ0FBZSxVQUFVLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDakQsQ0FBQztBQUVELEtBQUcsMkJBQTJCLE1BQU07QUFDbEMsdUJBQU8sT0FBTywwQ0FBZSxVQUFVLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDL0MsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
