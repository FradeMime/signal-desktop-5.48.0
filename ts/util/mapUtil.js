var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mapUtil_exports = {};
__export(mapUtil_exports, {
  groupBy: () => groupBy,
  isEqual: () => isEqual
});
module.exports = __toCommonJS(mapUtil_exports);
var import_iterables = require("./iterables");
const groupBy = /* @__PURE__ */ __name((iterable, fn) => (0, import_iterables.reduce)(iterable, (result, value) => {
  const key = fn(value);
  const existingGroup = result.get(key);
  if (existingGroup) {
    existingGroup.push(value);
  } else {
    result.set(key, [value]);
  }
  return result;
}, /* @__PURE__ */ new Map()), "groupBy");
const isEqual = /* @__PURE__ */ __name((left, right) => {
  if (left.size !== right.size) {
    return false;
  }
  for (const [key, value] of left) {
    if (!right.has(key)) {
      return false;
    }
    if (right.get(key) !== value) {
      return false;
    }
  }
  return true;
}, "isEqual");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupBy,
  isEqual
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFwVXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyByZWR1Y2UgfSBmcm9tICcuL2l0ZXJhYmxlcyc7XG5cbi8qKlxuICogTGlrZSBMb2Rhc2gncyBgZ3JvdXBCeWAsIGJ1dCByZXR1cm5zIGEgYE1hcGAuXG4gKi9cbmV4cG9ydCBjb25zdCBncm91cEJ5ID0gPFQsIFJlc3VsdFQ+KFxuICBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gIGZuOiAodmFsdWU6IFQpID0+IFJlc3VsdFRcbik6IE1hcDxSZXN1bHRULCBBcnJheTxUPj4gPT5cbiAgcmVkdWNlKFxuICAgIGl0ZXJhYmxlLFxuICAgIChyZXN1bHQ6IE1hcDxSZXN1bHRULCBBcnJheTxUPj4sIHZhbHVlOiBUKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBmbih2YWx1ZSk7XG4gICAgICBjb25zdCBleGlzdGluZ0dyb3VwID0gcmVzdWx0LmdldChrZXkpO1xuICAgICAgaWYgKGV4aXN0aW5nR3JvdXApIHtcbiAgICAgICAgZXhpc3RpbmdHcm91cC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5zZXQoa2V5LCBbdmFsdWVdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBuZXcgTWFwPFJlc3VsdFQsIEFycmF5PFQ+PigpXG4gICk7XG5cbmV4cG9ydCBjb25zdCBpc0VxdWFsID0gPEssIFY+KFxuICBsZWZ0OiBSZWFkb25seU1hcDxLLCBWPixcbiAgcmlnaHQ6IFJlYWRvbmx5TWFwPEssIFY+XG4pOiBib29sZWFuID0+IHtcbiAgaWYgKGxlZnQuc2l6ZSAhPT0gcmlnaHQuc2l6ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGxlZnQpIHtcbiAgICBpZiAoIXJpZ2h0LmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0LmdldChrZXkpICE9PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHVCQUF1QjtBQUtoQixNQUFNLFVBQVUsd0JBQ3JCLFVBQ0EsT0FFQSw2QkFDRSxVQUNBLENBQUMsUUFBZ0MsVUFBYTtBQUM1QyxRQUFNLE1BQU0sR0FBRyxLQUFLO0FBQ3BCLFFBQU0sZ0JBQWdCLE9BQU8sSUFBSSxHQUFHO0FBQ3BDLE1BQUksZUFBZTtBQUNqQixrQkFBYyxLQUFLLEtBQUs7QUFBQSxFQUMxQixPQUFPO0FBQ0wsV0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFBQSxFQUN6QjtBQUNBLFNBQU87QUFDVCxHQUNBLG9CQUFJLElBQXVCLENBQzdCLEdBakJxQjtBQW1CaEIsTUFBTSxVQUFVLHdCQUNyQixNQUNBLFVBQ1k7QUFDWixNQUFJLEtBQUssU0FBUyxNQUFNLE1BQU07QUFDNUIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxhQUFXLENBQUMsS0FBSyxVQUFVLE1BQU07QUFDL0IsUUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUc7QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTztBQUM1QixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1QsR0FuQnVCOyIsCiAgIm5hbWVzIjogW10KfQo=
