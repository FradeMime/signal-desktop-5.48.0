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
var parseRetryAfter_exports = {};
__export(parseRetryAfter_exports, {
  parseRetryAfter: () => parseRetryAfter,
  parseRetryAfterWithDefault: () => parseRetryAfterWithDefault
});
module.exports = __toCommonJS(parseRetryAfter_exports);
var import_durations = require("./durations");
var import_isNormalNumber = require("./isNormalNumber");
const DEFAULT_RETRY_AFTER = import_durations.MINUTE;
const MINIMAL_RETRY_AFTER = import_durations.SECOND;
function parseRetryAfterWithDefault(value) {
  const retryAfter = parseRetryAfter(value);
  if (retryAfter === void 0) {
    return DEFAULT_RETRY_AFTER;
  }
  return Math.max(retryAfter, MINIMAL_RETRY_AFTER);
}
function parseRetryAfter(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const retryAfter = parseInt(value, 10);
  if (!(0, import_isNormalNumber.isNormalNumber)(retryAfter) || retryAfter.toString() !== value) {
    return void 0;
  }
  return retryAfter * import_durations.SECOND;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseRetryAfter,
  parseRetryAfterWithDefault
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VSZXRyeUFmdGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgU0VDT05ELCBNSU5VVEUgfSBmcm9tICcuL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBpc05vcm1hbE51bWJlciB9IGZyb20gJy4vaXNOb3JtYWxOdW1iZXInO1xuXG5jb25zdCBERUZBVUxUX1JFVFJZX0FGVEVSID0gTUlOVVRFO1xuY29uc3QgTUlOSU1BTF9SRVRSWV9BRlRFUiA9IFNFQ09ORDtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmV0cnlBZnRlcldpdGhEZWZhdWx0KHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHtcbiAgY29uc3QgcmV0cnlBZnRlciA9IHBhcnNlUmV0cnlBZnRlcih2YWx1ZSk7XG4gIGlmIChyZXRyeUFmdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gREVGQVVMVF9SRVRSWV9BRlRFUjtcbiAgfVxuXG4gIHJldHVybiBNYXRoLm1heChyZXRyeUFmdGVyLCBNSU5JTUFMX1JFVFJZX0FGVEVSKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmV0cnlBZnRlcih2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHJldHJ5QWZ0ZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICBpZiAoIWlzTm9ybWFsTnVtYmVyKHJldHJ5QWZ0ZXIpIHx8IHJldHJ5QWZ0ZXIudG9TdHJpbmcoKSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHJldHJ5QWZ0ZXIgKiBTRUNPTkQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx1QkFBK0I7QUFDL0IsNEJBQStCO0FBRS9CLE1BQU0sc0JBQXNCO0FBQzVCLE1BQU0sc0JBQXNCO0FBRXJCLG9DQUFvQyxPQUF3QjtBQUNqRSxRQUFNLGFBQWEsZ0JBQWdCLEtBQUs7QUFDeEMsTUFBSSxlQUFlLFFBQVc7QUFDNUIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLEtBQUssSUFBSSxZQUFZLG1CQUFtQjtBQUNqRDtBQVBnQixBQVNULHlCQUF5QixPQUFvQztBQUNsRSxNQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxhQUFhLFNBQVMsT0FBTyxFQUFFO0FBQ3JDLE1BQUksQ0FBQywwQ0FBZSxVQUFVLEtBQUssV0FBVyxTQUFTLE1BQU0sT0FBTztBQUNsRSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sYUFBYTtBQUN0QjtBQVhnQiIsCiAgIm5hbWVzIjogW10KfQo=
