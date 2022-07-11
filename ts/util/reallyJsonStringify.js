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
var reallyJsonStringify_exports = {};
__export(reallyJsonStringify_exports, {
  reallyJsonStringify: () => reallyJsonStringify
});
module.exports = __toCommonJS(reallyJsonStringify_exports);
function reallyJsonStringify(value) {
  let result;
  try {
    result = JSON.stringify(value);
  } catch (_err) {
    result = void 0;
  }
  return typeof result === "string" ? result : Object.prototype.toString.call(value);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reallyJsonStringify
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhbGx5SnNvblN0cmluZ2lmeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKipcbiAqIFJldHVybnMgYEpTT04uc3RyaW5naWZ5KHZhbHVlKWAgaWYgdGhhdCByZXR1cm5zIGEgc3RyaW5nLCBvdGhlcndpc2UgcmV0dXJucyBhIHZhbHVlXG4gKiBsaWtlIGBbb2JqZWN0IE9iamVjdF1gIG9yIGBbb2JqZWN0IFVuZGVmaW5lZF1gLlxuICpcbiAqIGBKU09OLnN0cmluZ2lmeWAgZG9lc24ndCBhbHdheXMgcmV0dXJuIGEgc3RyaW5nLiBTb21lIGV4YW1wbGVzOlxuICpcbiAqICAgICBKU09OLnN0cmluZ2lmeSh1bmRlZmluZWQpID09PSB1bmRlZmluZWRcbiAqXG4gKiAgICAgSlNPTi5zdHJpbmdpZnkoU3ltYm9sKCkpID09PSB1bmRlZmluZWRcbiAqXG4gKiAgICAgSlNPTi5zdHJpbmdpZnkoeyB0b0pTT04oKSB7fSB9KSA9PT0gdW5kZWZpbmVkXG4gKlxuICogICAgIGNvbnN0IGEgPSB7fTtcbiAqICAgICBjb25zdCBiID0geyBhIH07XG4gKiAgICAgYS5iID0gYTtcbiAqICAgICBKU09OLnN0cmluZ2lmeShhKTsgIC8vID0+IFRocm93cyBhIFR5cGVFcnJvclxuICpcbiAqICAgICBKU09OLnN0cmluZ2lmeSgxMjNuKTsgIC8vID0+IFRocm93cyBhIFR5cGVFcnJvclxuICpcbiAqICAgICBjb25zdCBzY2FyeSA9IHtcbiAqICAgICAgIHRvSlNPTigpIHtcbiAqICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1aCBvaCcpO1xuICogICAgICAgfVxuICogICAgIH07XG4gKiAgICAgSlNPTi5zdHJpbmdpZnkoc2NhcnkpOyAgLy8gPT4gVGhyb3dzIFwidWggb2hcIlxuICpcbiAqIFRoaXMgbWFrZXMgc3VyZSB3ZSByZXR1cm4gYSBzdHJpbmcgYW5kIGRvbid0IHRocm93LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhbGx5SnNvblN0cmluZ2lmeSh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB7XG4gIGxldCByZXN1bHQ6IHVua25vd247XG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9IGNhdGNoIChfZXJyKSB7XG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnXG4gICAgPyByZXN1bHRcbiAgICA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0JPLDZCQUE2QixPQUF3QjtBQUMxRCxNQUFJO0FBQ0osTUFBSTtBQUNGLGFBQVMsS0FBSyxVQUFVLEtBQUs7QUFBQSxFQUMvQixTQUFTLE1BQVA7QUFDQSxhQUFTO0FBQUEsRUFDWDtBQUVBLFNBQU8sT0FBTyxXQUFXLFdBQ3JCLFNBQ0EsT0FBTyxVQUFVLFNBQVMsS0FBSyxLQUFLO0FBQzFDO0FBWGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
