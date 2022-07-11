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
var explodePromise_exports = {};
__export(explodePromise_exports, {
  explodePromise: () => explodePromise
});
module.exports = __toCommonJS(explodePromise_exports);
function explodePromise() {
  let resolve;
  let reject;
  const promise = new Promise((innerResolve, innerReject) => {
    resolve = innerResolve;
    reject = innerReject;
  });
  return {
    promise,
    resolve,
    reject
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  explodePromise
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwbG9kZVByb21pc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IHR5cGUgRXhwbG9kZVByb21pc2VSZXN1bHRUeXBlPFQ+ID0gUmVhZG9ubHk8e1xuICBwcm9taXNlOiBQcm9taXNlPFQ+O1xuICByZXNvbHZlOiAodmFsdWU6IFQpID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yOiBFcnJvcikgPT4gdm9pZDtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gZXhwbG9kZVByb21pc2U8VD4oKTogRXhwbG9kZVByb21pc2VSZXN1bHRUeXBlPFQ+IHtcbiAgbGV0IHJlc29sdmU6ICh2YWx1ZTogVCkgPT4gdm9pZDtcbiAgbGV0IHJlamVjdDogKGVycm9yOiBFcnJvcikgPT4gdm9pZDtcblxuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8VD4oKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3QpID0+IHtcbiAgICByZXNvbHZlID0gaW5uZXJSZXNvbHZlO1xuICAgIHJlamVjdCA9IGlubmVyUmVqZWN0O1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHByb21pc2UsXG4gICAgLy8gVHlwZXNjcmlwdCB0aGlua3MgdGhhdCByZXNvbHZlIGFuZCByZWplY3QgY2FuIGJlIHVuZGVmaW5lZCBoZXJlLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgcmVzb2x2ZTogcmVzb2x2ZSEsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICByZWplY3Q6IHJlamVjdCEsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU08sMEJBQTBEO0FBQy9ELE1BQUk7QUFDSixNQUFJO0FBRUosUUFBTSxVQUFVLElBQUksUUFBVyxDQUFDLGNBQWMsZ0JBQWdCO0FBQzVELGNBQVU7QUFDVixhQUFTO0FBQUEsRUFDWCxDQUFDO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUdBO0FBQUEsSUFFQTtBQUFBLEVBQ0Y7QUFDRjtBQWpCZ0IiLAogICJuYW1lcyI6IFtdCn0K
