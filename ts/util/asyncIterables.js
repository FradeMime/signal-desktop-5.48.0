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
var asyncIterables_exports = {};
__export(asyncIterables_exports, {
  concat: () => concat,
  wrapPromise: () => wrapPromise
});
module.exports = __toCommonJS(asyncIterables_exports);
function concat(iterables) {
  return new ConcatAsyncIterable(iterables);
}
class ConcatAsyncIterable {
  constructor(iterables) {
    this.iterables = iterables;
  }
  async *[Symbol.asyncIterator]() {
    for (const iterable of this.iterables) {
      for await (const value of iterable) {
        yield value;
      }
    }
  }
}
function wrapPromise(promise) {
  return new WrapPromiseAsyncIterable(promise);
}
class WrapPromiseAsyncIterable {
  constructor(promise) {
    this.promise = promise;
  }
  async *[Symbol.asyncIterator]() {
    for await (const value of await this.promise) {
      yield value;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  concat,
  wrapPromise
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXN5bmNJdGVyYWJsZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cblxuZXhwb3J0IHR5cGUgTWF5YmVBc3luY0l0ZXJhYmxlPFQ+ID0gSXRlcmFibGU8VD4gfCBBc3luY0l0ZXJhYmxlPFQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0PFQ+KFxuICBpdGVyYWJsZXM6IEl0ZXJhYmxlPE1heWJlQXN5bmNJdGVyYWJsZTxUPj5cbik6IEFzeW5jSXRlcmFibGU8VD4ge1xuICByZXR1cm4gbmV3IENvbmNhdEFzeW5jSXRlcmFibGUoaXRlcmFibGVzKTtcbn1cblxuY2xhc3MgQ29uY2F0QXN5bmNJdGVyYWJsZTxUPiBpbXBsZW1lbnRzIEFzeW5jSXRlcmFibGU8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGl0ZXJhYmxlczogSXRlcmFibGU8TWF5YmVBc3luY0l0ZXJhYmxlPFQ+Pikge31cblxuICBhc3luYyAqW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpOiBBc3luY0l0ZXJhdG9yPFQ+IHtcbiAgICBmb3IgKGNvbnN0IGl0ZXJhYmxlIG9mIHRoaXMuaXRlcmFibGVzKSB7XG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb21pc2U8VD4oXG4gIHByb21pc2U6IFByb21pc2U8TWF5YmVBc3luY0l0ZXJhYmxlPFQ+PlxuKTogQXN5bmNJdGVyYWJsZTxUPiB7XG4gIHJldHVybiBuZXcgV3JhcFByb21pc2VBc3luY0l0ZXJhYmxlKHByb21pc2UpO1xufVxuXG5jbGFzcyBXcmFwUHJvbWlzZUFzeW5jSXRlcmFibGU8VD4gaW1wbGVtZW50cyBBc3luY0l0ZXJhYmxlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwcm9taXNlOiBQcm9taXNlPE1heWJlQXN5bmNJdGVyYWJsZTxUPj4pIHt9XG5cbiAgYXN5bmMgKltTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKTogQXN5bmNJdGVyYXRvcjxUPiB7XG4gICAgZm9yIGF3YWl0IChjb25zdCB2YWx1ZSBvZiBhd2FpdCB0aGlzLnByb21pc2UpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUU8sZ0JBQ0wsV0FDa0I7QUFDbEIsU0FBTyxJQUFJLG9CQUFvQixTQUFTO0FBQzFDO0FBSmdCLEFBTWhCLE1BQU0sb0JBQW1EO0FBQUEsRUFDdkQsWUFBNkIsV0FBNEM7QUFBNUM7QUFBQSxFQUE2QztBQUFBLFVBRWxFLE9BQU8saUJBQW1DO0FBQ2hELGVBQVcsWUFBWSxLQUFLLFdBQVc7QUFDckMsdUJBQWlCLFNBQVMsVUFBVTtBQUNsQyxjQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFWQSxBQVlPLHFCQUNMLFNBQ2tCO0FBQ2xCLFNBQU8sSUFBSSx5QkFBeUIsT0FBTztBQUM3QztBQUpnQixBQU1oQixNQUFNLHlCQUF3RDtBQUFBLEVBQzVELFlBQTZCLFNBQXlDO0FBQXpDO0FBQUEsRUFBMEM7QUFBQSxVQUUvRCxPQUFPLGlCQUFtQztBQUNoRCxxQkFBaUIsU0FBUyxNQUFNLEtBQUssU0FBUztBQUM1QyxZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRjtBQVJBIiwKICAibmFtZXMiOiBbXQp9Cg==
