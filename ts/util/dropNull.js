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
var dropNull_exports = {};
__export(dropNull_exports, {
  dropNull: () => dropNull,
  shallowDropNull: () => shallowDropNull
});
module.exports = __toCommonJS(dropNull_exports);
function dropNull(value) {
  if (value === null) {
    return void 0;
  }
  return value;
}
function shallowDropNull(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  const result = {};
  for (const [key, propertyValue] of Object.entries(value)) {
    result[key] = dropNull(propertyValue);
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dropNull,
  shallowDropNull
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZHJvcE51bGwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IHR5cGUgTnVsbFRvVW5kZWZpbmVkPFQ+ID0gRXh0cmFjdDxULCBudWxsPiBleHRlbmRzIG5ldmVyXG4gID8gVFxuICA6IEV4Y2x1ZGU8VCwgbnVsbD4gfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBkcm9wTnVsbDxUPihcbiAgdmFsdWU6IE5vbk51bGxhYmxlPFQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogVCB8IHVuZGVmaW5lZCB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dEcm9wTnVsbDxPIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBhbnkgfT4oXG4gIHZhbHVlOiBPIHwgbnVsbCB8IHVuZGVmaW5lZFxuKTpcbiAgfCB7XG4gICAgICBbUHJvcGVydHkgaW4ga2V5b2YgT106IE51bGxUb1VuZGVmaW5lZDxPW1Byb3BlcnR5XT47XG4gICAgfVxuICB8IHVuZGVmaW5lZCB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCBwcm9wZXJ0eVZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh2YWx1ZSkpIHtcbiAgICByZXN1bHRba2V5XSA9IGRyb3BOdWxsKHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9PLGtCQUNMLE9BQ2U7QUFDZixNQUFJLFVBQVUsTUFBTTtBQUNsQixXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDtBQVBnQixBQVVULHlCQUNMLE9BS1k7QUFDWixNQUFJLFVBQVUsUUFBUSxVQUFVLFFBQVc7QUFDekMsV0FBTztBQUFBLEVBQ1Q7QUFHQSxRQUFNLFNBQWMsQ0FBQztBQUVyQixhQUFXLENBQUMsS0FBSyxrQkFBa0IsT0FBTyxRQUFRLEtBQUssR0FBRztBQUN4RCxXQUFPLE9BQU8sU0FBUyxhQUFhO0FBQUEsRUFDdEM7QUFFQSxTQUFPO0FBQ1Q7QUFuQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
