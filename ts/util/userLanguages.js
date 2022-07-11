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
var userLanguages_exports = {};
__export(userLanguages_exports, {
  formatAcceptLanguageHeader: () => formatAcceptLanguageHeader,
  getUserLanguages: () => getUserLanguages
});
module.exports = __toCommonJS(userLanguages_exports);
const MAX_LANGUAGES_TO_FORMAT = 28;
function formatAcceptLanguageHeader(languages) {
  if (languages.length === 0) {
    return "*";
  }
  const result = [];
  const length = Math.min(languages.length, MAX_LANGUAGES_TO_FORMAT);
  for (let i = 0; i < length; i += 1) {
    const language = languages[i];
    if (i === 0) {
      result.push(language);
      continue;
    }
    const magnitude = 1 / 10 ** (Math.ceil(i / 9) - 1);
    const subtractor = ((i - 1) % 9 + 1) * (magnitude / 10);
    const q = magnitude - subtractor;
    const formattedQ = q.toFixed(3).replace(/0+$/, "");
    result.push(`${language};q=${formattedQ}`);
  }
  return result.join(", ");
}
function getUserLanguages(defaults, fallback) {
  const result = defaults || [];
  return result.length ? result : [fallback];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatAcceptLanguageHeader,
  getUserLanguages
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlckxhbmd1YWdlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyBXZSBbXCJNVVNUIE5PVCBnZW5lcmF0ZSBtb3JlIHRoYW4gdGhyZWUgZGlnaXRzIGFmdGVyIHRoZSBkZWNpbWFsIHBvaW50XCJdWzBdLiBXZSB1c2UgYVxuLy8gICBzcGFjZS1lZmZpY2llbnQgYWxnb3JpdGhtIHRoYXQgcnVucyBvdXQgb2YgZGlnaXRzIGFmdGVyIDI4IGxhbmd1YWdlcy4gVGhpcyBzaG91bGQgYmVcbi8vICAgZmluZSBmb3IgbW9zdCB1c2VycyBhbmQgW3RoZSBzZXJ2ZXIgZG9lc24ndCBwYXJzZSBtb3JlIHRoYW4gMTUgbGFuZ3VhZ2VzLCBhdCBsZWFzdFxuLy8gICBmb3IgYmFkZ2VzXVsxXS5cbi8vXG4vLyBbMF06IGh0dHBzOi8vaHR0cHdnLm9yZy9zcGVjcy9yZmM3MjMxLmh0bWwjcXVhbGl0eS52YWx1ZXNcbi8vIFsxXTogaHR0cHM6Ly9naXRodWIuY29tL3NpZ25hbGFwcC9TaWduYWwtU2VydmVyL2Jsb2IvZDJiYzNjNzM2MDgwYzNkODUyYzllODhhZjBiZmZjYjY2MzJkOTk3NS9zZXJ2aWNlL3NyYy9tYWluL2phdmEvb3JnL3doaXNwZXJzeXN0ZW1zL3RleHRzZWN1cmVnY20vYmFkZ2VzL0NvbmZpZ3VyZWRQcm9maWxlQmFkZ2VDb252ZXJ0ZXIuamF2YSNMMjlcbmNvbnN0IE1BWF9MQU5HVUFHRVNfVE9fRk9STUFUID0gMjg7XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlcihcbiAgbGFuZ3VhZ2VzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbik6IHN0cmluZyB7XG4gIGlmIChsYW5ndWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICcqJztcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGNvbnN0IGxlbmd0aCA9IE1hdGgubWluKGxhbmd1YWdlcy5sZW5ndGgsIE1BWF9MQU5HVUFHRVNfVE9fRk9STUFUKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGxhbmd1YWdlID0gbGFuZ3VhZ2VzW2ldO1xuXG4gICAgLy8gW1wiSWYgbm8gJ3EnIHBhcmFtZXRlciBpcyBwcmVzZW50LCB0aGUgZGVmYXVsdCB3ZWlnaHQgaXMgMS5cIl1bMV1cbiAgICAvL1xuICAgIC8vIFsxXTogaHR0cHM6Ly9odHRwd2cub3JnL3NwZWNzL3JmYzcyMzEuaHRtbCNxdWFsaXR5LnZhbHVlc1xuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXN1bHQucHVzaChsYW5ndWFnZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBUaGVzZSB2YWx1ZXMgY29tcHV0ZSBhIGRlc2NlbmRpbmcgc2VxdWVuY2Ugd2l0aCBtaW5pbWFsIGJ5dGVzLiBTZWUgdGhlIHRlc3RzIGZvclxuICAgIC8vICAgZXhhbXBsZXMuXG4gICAgY29uc3QgbWFnbml0dWRlID0gMSAvIDEwICoqIChNYXRoLmNlaWwoaSAvIDkpIC0gMSk7XG4gICAgY29uc3Qgc3VidHJhY3RvciA9ICgoKGkgLSAxKSAlIDkpICsgMSkgKiAobWFnbml0dWRlIC8gMTApO1xuICAgIGNvbnN0IHEgPSBtYWduaXR1ZGUgLSBzdWJ0cmFjdG9yO1xuICAgIGNvbnN0IGZvcm1hdHRlZFEgPSBxLnRvRml4ZWQoMykucmVwbGFjZSgvMCskLywgJycpO1xuXG4gICAgcmVzdWx0LnB1c2goYCR7bGFuZ3VhZ2V9O3E9JHtmb3JtYXR0ZWRRfWApO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcsICcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckxhbmd1YWdlcyhcbiAgZGVmYXVsdHM6IHVuZGVmaW5lZCB8IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgZmFsbGJhY2s6IHN0cmluZ1xuKTogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHtcbiAgY29uc3QgcmVzdWx0ID0gZGVmYXVsdHMgfHwgW107XG4gIHJldHVybiByZXN1bHQubGVuZ3RoID8gcmVzdWx0IDogW2ZhbGxiYWNrXTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBLE1BQU0sMEJBQTBCO0FBRXpCLG9DQUNMLFdBQ1E7QUFDUixNQUFJLFVBQVUsV0FBVyxHQUFHO0FBQzFCLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxTQUF3QixDQUFDO0FBRS9CLFFBQU0sU0FBUyxLQUFLLElBQUksVUFBVSxRQUFRLHVCQUF1QjtBQUNqRSxXQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSyxHQUFHO0FBQ2xDLFVBQU0sV0FBVyxVQUFVO0FBSzNCLFFBQUksTUFBTSxHQUFHO0FBQ1gsYUFBTyxLQUFLLFFBQVE7QUFDcEI7QUFBQSxJQUNGO0FBSUEsVUFBTSxZQUFZLElBQUksTUFBTyxNQUFLLEtBQUssSUFBSSxDQUFDLElBQUk7QUFDaEQsVUFBTSxhQUFnQixNQUFJLEtBQUssSUFBSyxLQUFNLGFBQVk7QUFDdEQsVUFBTSxJQUFJLFlBQVk7QUFDdEIsVUFBTSxhQUFhLEVBQUUsUUFBUSxDQUFDLEVBQUUsUUFBUSxPQUFPLEVBQUU7QUFFakQsV0FBTyxLQUFLLEdBQUcsY0FBYyxZQUFZO0FBQUEsRUFDM0M7QUFFQSxTQUFPLE9BQU8sS0FBSyxJQUFJO0FBQ3pCO0FBaENnQixBQWtDVCwwQkFDTCxVQUNBLFVBQ3VCO0FBQ3ZCLFFBQU0sU0FBUyxZQUFZLENBQUM7QUFDNUIsU0FBTyxPQUFPLFNBQVMsU0FBUyxDQUFDLFFBQVE7QUFDM0M7QUFOZ0IiLAogICJuYW1lcyI6IFtdCn0K
