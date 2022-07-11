var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var BadgeCarouselIndex_exports = {};
__export(BadgeCarouselIndex_exports, {
  BadgeCarouselIndex: () => BadgeCarouselIndex
});
module.exports = __toCommonJS(BadgeCarouselIndex_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_assert = require("../util/assert");
function BadgeCarouselIndex({
  currentIndex,
  totalCount
}) {
  (0, import_assert.strictAssert)(totalCount >= 1, "Expected 1 or more items");
  (0, import_assert.strictAssert)(currentIndex < totalCount, "Expected current index to be in range");
  if (totalCount < 2) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-hidden": true,
    className: "BadgeCarouselIndex"
  }, (0, import_lodash.times)(totalCount, (index) => /* @__PURE__ */ import_react.default.createElement("div", {
    key: index,
    className: (0, import_classnames.default)("BadgeCarouselIndex__dot", currentIndex === index && "BadgeCarouselIndex__dot--selected")
  })));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeCarouselIndex
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VDYXJvdXNlbEluZGV4LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuZXhwb3J0IGZ1bmN0aW9uIEJhZGdlQ2Fyb3VzZWxJbmRleCh7XG4gIGN1cnJlbnRJbmRleCxcbiAgdG90YWxDb3VudCxcbn06IFJlYWRvbmx5PHtcbiAgY3VycmVudEluZGV4OiBudW1iZXI7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbn0+KTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgc3RyaWN0QXNzZXJ0KHRvdGFsQ291bnQgPj0gMSwgJ0V4cGVjdGVkIDEgb3IgbW9yZSBpdGVtcycpO1xuICBzdHJpY3RBc3NlcnQoXG4gICAgY3VycmVudEluZGV4IDwgdG90YWxDb3VudCxcbiAgICAnRXhwZWN0ZWQgY3VycmVudCBpbmRleCB0byBiZSBpbiByYW5nZSdcbiAgKTtcblxuICBpZiAodG90YWxDb3VudCA8IDIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBhcmlhLWhpZGRlbiBjbGFzc05hbWU9XCJCYWRnZUNhcm91c2VsSW5kZXhcIj5cbiAgICAgIHt0aW1lcyh0b3RhbENvdW50LCBpbmRleCA9PiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICdCYWRnZUNhcm91c2VsSW5kZXhfX2RvdCcsXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPT09IGluZGV4ICYmICdCYWRnZUNhcm91c2VsSW5kZXhfX2RvdC0tc2VsZWN0ZWQnXG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFDdkIsb0JBQXNCO0FBRXRCLG9CQUE2QjtBQUV0Qiw0QkFBNEI7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxHQUlzQjtBQUN0QixrQ0FBYSxjQUFjLEdBQUcsMEJBQTBCO0FBQ3hELGtDQUNFLGVBQWUsWUFDZix1Q0FDRjtBQUVBLE1BQUksYUFBYSxHQUFHO0FBQ2xCLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQUksZUFBVztBQUFBLElBQUMsV0FBVTtBQUFBLEtBQ3hCLHlCQUFNLFlBQVksV0FDakIsbURBQUM7QUFBQSxJQUNDLEtBQUs7QUFBQSxJQUNMLFdBQVcsK0JBQ1QsMkJBQ0EsaUJBQWlCLFNBQVMsbUNBQzVCO0FBQUEsR0FDRixDQUNELENBQ0g7QUFFSjtBQTlCZ0IiLAogICJuYW1lcyI6IFtdCn0K
