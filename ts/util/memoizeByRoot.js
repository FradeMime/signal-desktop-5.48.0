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
var memoizeByRoot_exports = {};
__export(memoizeByRoot_exports, {
  memoizeByRoot: () => memoizeByRoot
});
module.exports = __toCommonJS(memoizeByRoot_exports);
var import_reselect = require("reselect");
var import_assert = require("./assert");
function memoizeByRoot(fn, equalityCheck) {
  const cache = /* @__PURE__ */ new WeakMap();
  const wrap = /* @__PURE__ */ __name((root, ...rest) => {
    (0, import_assert.strictAssert)(typeof root === "object" && root !== null, "Root is not object");
    let partial = cache.get(root);
    if (!partial) {
      partial = (0, import_reselect.defaultMemoize)((...args) => {
        return fn(root, ...args);
      }, equalityCheck);
      cache.set(root, partial);
    }
    return partial(...rest);
  }, "wrap");
  return wrap;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  memoizeByRoot
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtb2l6ZUJ5Um9vdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBkZWZhdWx0TWVtb2l6ZSB9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuXG4vLyBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBmdW5jdGlvbiBiZWxvdyBhbmQgYGRlZmF1bHRNZW1vaXplYCBmcm9tXG4vLyBgcmVzZWxlY3RgIGlzIHRoYXQgaXQgc3VwcG9ydHMgbXVsdGlwbGUgXCJyb290XCIgc3RhdGVzLiBgcmVzZWxlY3RgIGlzIGRlc2lnbmVkXG4vLyB0byBpbnRlcmFjdCB3aXRoIGEgc2luZ2xlIHJlZHV4IHN0b3JlIGFuZCBieSBkZWZhdWx0IGl0IG1lbW9pemVzIG9ubHkgdGhlXG4vLyBsYXN0IHJlc3VsdCBvZiB0aGUgc2VsZWN0b3IgKG1hdGNoZWQgYnkgaXRzIGFyZ3VtZW50cykuIFRoaXMgd29ya3Mgd2VsbCB3aGVuXG4vLyBhcHBsaWVkIHRvIHNpbmd1bGFyIGVudGl0aWVzIGxpdmluZyBpbiB0aGUgcmVkdXgncyBzdGF0ZSwgYnV0IHdlIG5lZWQgdG9cbi8vIGFwcGx5IHNlbGVjdG9yIHRvIG11bHRpdGlkZSBvZiBjb252ZXJzYXRpb25zIGFuZCBtZXNzYWdlcy5cbi8vXG4vLyBUaGUgd2F5IGl0IHdvcmtzIGlzIHRoYXQgaXQgYWRkcyBhbiBleHRyYSBtZW1vaXphdGlvbiBzdGVwIHRoYXQgdXNlcyB0aGVcbi8vIGZpcnN0IGFyZ3VtZW50IChcInJvb3RcIikgYXMgYSBrZXkgaW4gYSB3ZWFrIG1hcCwgYW5kIHRoZW4gYXBwbGllcyB0aGUgZGVmYXVsdFxuLy8gYHJlc2VsZWN0YCdzIG1lbW9pemF0aW9uIGZ1bmN0aW9uIHRvIHRoZSByZXN0IG9mIHRoZSBhcmd1bWVudHMuIFRoaXMgd2F5XG4vLyB3ZSBlc3NlbnRpYWxseSBnZXQgYSB3ZWFrIG1hcCBvZiBzZWxlY3RvcnMgYnkgdGhlIFwicm9vdFwiLlxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIG1lbW9pemVCeVJvb3Q8RiBleHRlbmRzIEZ1bmN0aW9uPihcbiAgZm46IEYsXG4gIGVxdWFsaXR5Q2hlY2s/OiA8VD4oYTogVCwgYjogVCkgPT4gYm9vbGVhblxuKTogRiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG4gIGNvbnN0IGNhY2hlID0gbmV3IFdlYWtNYXA8b2JqZWN0LCBGdW5jdGlvbj4oKTtcblxuICBjb25zdCB3cmFwID0gKHJvb3Q6IHVua25vd24sIC4uLnJlc3Q6IEFycmF5PHVua25vd24+KTogdW5rbm93biA9PiB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdHlwZW9mIHJvb3QgPT09ICdvYmplY3QnICYmIHJvb3QgIT09IG51bGwsXG4gICAgICAnUm9vdCBpcyBub3Qgb2JqZWN0J1xuICAgICk7XG5cbiAgICBsZXQgcGFydGlhbCA9IGNhY2hlLmdldChyb290KTtcbiAgICBpZiAoIXBhcnRpYWwpIHtcbiAgICAgIHBhcnRpYWwgPSBkZWZhdWx0TWVtb2l6ZSgoLi4uYXJnczogQXJyYXk8dW5rbm93bj4pOiB1bmtub3duID0+IHtcbiAgICAgICAgcmV0dXJuIGZuKHJvb3QsIC4uLmFyZ3MpO1xuICAgICAgfSwgZXF1YWxpdHlDaGVjayk7XG5cbiAgICAgIGNhY2hlLnNldChyb290LCBwYXJ0aWFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydGlhbCguLi5yZXN0KTtcbiAgfTtcblxuICByZXR1cm4gd3JhcCBhcyB1bmtub3duIGFzIEY7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQStCO0FBRS9CLG9CQUE2QjtBQWV0Qix1QkFDTCxJQUNBLGVBQ0c7QUFFSCxRQUFNLFFBQVEsb0JBQUksUUFBMEI7QUFFNUMsUUFBTSxPQUFPLHdCQUFDLFNBQWtCLFNBQWtDO0FBQ2hFLG9DQUNFLE9BQU8sU0FBUyxZQUFZLFNBQVMsTUFDckMsb0JBQ0Y7QUFFQSxRQUFJLFVBQVUsTUFBTSxJQUFJLElBQUk7QUFDNUIsUUFBSSxDQUFDLFNBQVM7QUFDWixnQkFBVSxvQ0FBZSxJQUFJLFNBQWtDO0FBQzdELGVBQU8sR0FBRyxNQUFNLEdBQUcsSUFBSTtBQUFBLE1BQ3pCLEdBQUcsYUFBYTtBQUVoQixZQUFNLElBQUksTUFBTSxPQUFPO0FBQUEsSUFDekI7QUFFQSxXQUFPLFFBQVEsR0FBRyxJQUFJO0FBQUEsRUFDeEIsR0FoQmE7QUFrQmIsU0FBTztBQUNUO0FBMUJnQiIsCiAgIm5hbWVzIjogW10KfQo=
