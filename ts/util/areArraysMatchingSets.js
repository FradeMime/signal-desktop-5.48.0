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
var areArraysMatchingSets_exports = {};
__export(areArraysMatchingSets_exports, {
  areArraysMatchingSets: () => areArraysMatchingSets
});
module.exports = __toCommonJS(areArraysMatchingSets_exports);
function areArraysMatchingSets(left, right) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  for (const item of leftSet) {
    if (!rightSet.has(item)) {
      return false;
    }
  }
  for (const item of rightSet) {
    if (!leftSet.has(item)) {
      return false;
    }
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  areArraysMatchingSets
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlQXJyYXlzTWF0Y2hpbmdTZXRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFycmF5c01hdGNoaW5nU2V0czxUPihcbiAgbGVmdDogQXJyYXk8VD4sXG4gIHJpZ2h0OiBBcnJheTxUPlxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGxlZnRTZXQgPSBuZXcgU2V0KGxlZnQpO1xuICBjb25zdCByaWdodFNldCA9IG5ldyBTZXQocmlnaHQpO1xuXG4gIGZvciAoY29uc3QgaXRlbSBvZiBsZWZ0U2V0KSB7XG4gICAgaWYgKCFyaWdodFNldC5oYXMoaXRlbSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmlnaHRTZXQpIHtcbiAgICBpZiAoIWxlZnRTZXQuaGFzKGl0ZW0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sK0JBQ0wsTUFDQSxPQUNTO0FBQ1QsUUFBTSxVQUFVLElBQUksSUFBSSxJQUFJO0FBQzVCLFFBQU0sV0FBVyxJQUFJLElBQUksS0FBSztBQUU5QixhQUFXLFFBQVEsU0FBUztBQUMxQixRQUFJLENBQUMsU0FBUyxJQUFJLElBQUksR0FBRztBQUN2QixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxhQUFXLFFBQVEsVUFBVTtBQUMzQixRQUFJLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRztBQUN0QixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFwQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
