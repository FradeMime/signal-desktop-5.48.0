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
var createSupportUrl_exports = {};
__export(createSupportUrl_exports, {
  createSupportUrl: () => createSupportUrl
});
module.exports = __toCommonJS(createSupportUrl_exports);
const SUPPORT_LANGUAGES = [
  "ar",
  "bn",
  "de",
  "en-us",
  "es",
  "fr",
  "hi",
  "hi-in",
  "hc",
  "id",
  "it",
  "ja",
  "ko",
  "mr",
  "ms",
  "nl",
  "pl",
  "pt",
  "ru",
  "sv",
  "ta",
  "te",
  "tr",
  "uk",
  "ur",
  "vi",
  "zh-cn",
  "zh-tw"
];
function createSupportUrl({
  locale,
  query = {}
}) {
  const language = SUPPORT_LANGUAGES.includes(locale) ? locale : "en-us";
  const url = new URL(`https://support.signal.org/hc/${language}/requests/new`);
  url.searchParams.set("desktop", "");
  for (const key of Object.keys(query)) {
    if (key === "desktop") {
      continue;
    }
    url.searchParams.set(key, query[key]);
  }
  return url.toString().replace("desktop=", "desktop");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSupportUrl
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlU3VwcG9ydFVybC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyB0aGUgc3VwcG9ydCBvbmx5IHByb3ZpZGVzIGEgc3Vic2V0IG9mIGxhbmd1YWdlcyBhdmFpbGFibGUgd2l0aGluIHRoZSBhcHBcbi8vIHNvIHdlIGhhdmUgdG8gbGlzdCB0aGVtIG91dCBoZXJlIGFuZCBmYWxsYmFjayB0byBlbmdsaXNoIGlmIG5vdCBpbmNsdWRlZFxuY29uc3QgU1VQUE9SVF9MQU5HVUFHRVMgPSBbXG4gICdhcicsXG4gICdibicsXG4gICdkZScsXG4gICdlbi11cycsXG4gICdlcycsXG4gICdmcicsXG4gICdoaScsXG4gICdoaS1pbicsXG4gICdoYycsXG4gICdpZCcsXG4gICdpdCcsXG4gICdqYScsXG4gICdrbycsXG4gICdtcicsXG4gICdtcycsXG4gICdubCcsXG4gICdwbCcsXG4gICdwdCcsXG4gICdydScsXG4gICdzdicsXG4gICd0YScsXG4gICd0ZScsXG4gICd0cicsXG4gICd1aycsXG4gICd1cicsXG4gICd2aScsXG4gICd6aC1jbicsXG4gICd6aC10dycsXG5dO1xuXG5leHBvcnQgdHlwZSBDcmVhdGVTdXBwb3J0VXJsT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIGxvY2FsZTogc3RyaW5nO1xuICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN1cHBvcnRVcmwoe1xuICBsb2NhbGUsXG4gIHF1ZXJ5ID0ge30sXG59OiBDcmVhdGVTdXBwb3J0VXJsT3B0aW9uc1R5cGUpOiBzdHJpbmcge1xuICBjb25zdCBsYW5ndWFnZSA9IFNVUFBPUlRfTEFOR1VBR0VTLmluY2x1ZGVzKGxvY2FsZSkgPyBsb2NhbGUgOiAnZW4tdXMnO1xuXG4gIC8vIFRoaXMgVVJMIG5lZWRzIGEgaGFyZGNvZGVkIGxhbmd1YWdlIGJlY2F1c2UgdGhlICc/ZGVza3RvcCcgaXMgZHJvcHBlZCBpZlxuICAvLyAgIHRoZSBwYWdlIGF1dG8tcmVkaXJlY3RzIHRvIHRoZSBwcm9wZXIgVVJMXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjLyR7bGFuZ3VhZ2V9L3JlcXVlc3RzL25ld2ApO1xuXG4gIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdkZXNrdG9wJywgJycpO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHF1ZXJ5KSkge1xuICAgIGlmIChrZXkgPT09ICdkZXNrdG9wJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgcXVlcnlba2V5XSk7XG4gIH1cblxuICAvLyBTdXBwb3J0IHBhZ2UgcmVxdWlyZXMgYD9kZXNrdG9wJi4uLmAgbm90IGA/ZGVza3RvcD0mLi4uYFxuICByZXR1cm4gdXJsLnRvU3RyaW5nKCkucmVwbGFjZSgnZGVza3RvcD0nLCAnZGVza3RvcCcpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLE1BQU0sb0JBQW9CO0FBQUEsRUFDeEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQU9PLDBCQUEwQjtBQUFBLEVBQy9CO0FBQUEsRUFDQSxRQUFRLENBQUM7QUFBQSxHQUM2QjtBQUN0QyxRQUFNLFdBQVcsa0JBQWtCLFNBQVMsTUFBTSxJQUFJLFNBQVM7QUFJL0QsUUFBTSxNQUFNLElBQUksSUFBSSxpQ0FBaUMsdUJBQXVCO0FBRTVFLE1BQUksYUFBYSxJQUFJLFdBQVcsRUFBRTtBQUVsQyxhQUFXLE9BQU8sT0FBTyxLQUFLLEtBQUssR0FBRztBQUNwQyxRQUFJLFFBQVEsV0FBVztBQUNyQjtBQUFBLElBQ0Y7QUFDQSxRQUFJLGFBQWEsSUFBSSxLQUFLLE1BQU0sSUFBSTtBQUFBLEVBQ3RDO0FBR0EsU0FBTyxJQUFJLFNBQVMsRUFBRSxRQUFRLFlBQVksU0FBUztBQUNyRDtBQXJCZ0IiLAogICJuYW1lcyI6IFtdCn0K
