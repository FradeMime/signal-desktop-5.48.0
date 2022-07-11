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
var isSorted_exports = {};
__export(isSorted_exports, {
  isSorted: () => isSorted
});
module.exports = __toCommonJS(isSorted_exports);
function isSorted(list) {
  let previousItem;
  for (const item of list) {
    if (previousItem !== void 0 && item < previousItem) {
      return false;
    }
    previousItem = item;
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isSorted
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNTb3J0ZWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU29ydGVkKGxpc3Q6IEl0ZXJhYmxlPG51bWJlcj4pOiBib29sZWFuIHtcbiAgbGV0IHByZXZpb3VzSXRlbTogdW5kZWZpbmVkIHwgbnVtYmVyO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGlzdCkge1xuICAgIGlmIChwcmV2aW91c0l0ZW0gIT09IHVuZGVmaW5lZCAmJiBpdGVtIDwgcHJldmlvdXNJdGVtKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHByZXZpb3VzSXRlbSA9IGl0ZW07XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sa0JBQWtCLE1BQWlDO0FBQ3hELE1BQUk7QUFDSixhQUFXLFFBQVEsTUFBTTtBQUN2QixRQUFJLGlCQUFpQixVQUFhLE9BQU8sY0FBYztBQUNyRCxhQUFPO0FBQUEsSUFDVDtBQUNBLG1CQUFlO0FBQUEsRUFDakI7QUFDQSxTQUFPO0FBQ1Q7QUFUZ0IiLAogICJuYW1lcyI6IFtdCn0K
