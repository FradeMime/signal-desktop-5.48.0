var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var preferredReactionEmoji_exports = {};
__export(preferredReactionEmoji_exports, {
  canBeSynced: () => canBeSynced,
  getPreferredReactionEmoji: () => getPreferredReactionEmoji
});
module.exports = __toCommonJS(preferredReactionEmoji_exports);
var import_lodash = require("lodash");
var log = __toESM(require("../logging/log"));
var import_constants = require("./constants");
var import_lib = require("../components/emoji/lib");
var import_isValidReactionEmoji = require("./isValidReactionEmoji");
const MAX_STORED_LENGTH = 20;
const MAX_ITEM_LENGTH = 20;
const PREFERRED_REACTION_EMOJI_COUNT = import_constants.DEFAULT_PREFERRED_REACTION_EMOJI_SHORT_NAMES.length;
function getPreferredReactionEmoji(storedValue, skinTone) {
  const storedValueAsArray = Array.isArray(storedValue) ? storedValue : [];
  return (0, import_lodash.times)(PREFERRED_REACTION_EMOJI_COUNT, (index) => {
    const storedItem = storedValueAsArray[index];
    if ((0, import_isValidReactionEmoji.isValidReactionEmoji)(storedItem)) {
      return storedItem;
    }
    const fallbackShortName = import_constants.DEFAULT_PREFERRED_REACTION_EMOJI_SHORT_NAMES[index];
    if (!fallbackShortName) {
      log.error("Index is out of range. Is the preferred count larger than the list of fallbacks?");
      return "\u2764\uFE0F";
    }
    const fallbackEmoji = (0, import_lib.convertShortName)(fallbackShortName, skinTone);
    if (!fallbackEmoji) {
      log.error("No fallback emoji. Does the fallback list contain an invalid short name?");
      return "\u2764\uFE0F";
    }
    return fallbackEmoji;
  });
}
const canBeSynced = /* @__PURE__ */ __name((value) => Array.isArray(value) && value.length <= MAX_STORED_LENGTH && value.every((item) => typeof item === "string" && item.length <= MAX_ITEM_LENGTH), "canBeSynced");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canBeSynced,
  getPreferredReactionEmoji
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlZmVycmVkUmVhY3Rpb25FbW9qaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgREVGQVVMVF9QUkVGRVJSRURfUkVBQ1RJT05fRU1PSklfU0hPUlRfTkFNRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjb252ZXJ0U2hvcnROYW1lIH0gZnJvbSAnLi4vY29tcG9uZW50cy9lbW9qaS9saWInO1xuaW1wb3J0IHsgaXNWYWxpZFJlYWN0aW9uRW1vamkgfSBmcm9tICcuL2lzVmFsaWRSZWFjdGlvbkVtb2ppJztcblxuY29uc3QgTUFYX1NUT1JFRF9MRU5HVEggPSAyMDtcbmNvbnN0IE1BWF9JVEVNX0xFTkdUSCA9IDIwO1xuXG5jb25zdCBQUkVGRVJSRURfUkVBQ1RJT05fRU1PSklfQ09VTlQgPVxuICBERUZBVUxUX1BSRUZFUlJFRF9SRUFDVElPTl9FTU9KSV9TSE9SVF9OQU1FUy5sZW5ndGg7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppKFxuICBzdG9yZWRWYWx1ZTogdW5rbm93bixcbiAgc2tpblRvbmU6IG51bWJlclxuKTogQXJyYXk8c3RyaW5nPiB7XG4gIGNvbnN0IHN0b3JlZFZhbHVlQXNBcnJheTogQXJyYXk8dW5rbm93bj4gPSBBcnJheS5pc0FycmF5KHN0b3JlZFZhbHVlKVxuICAgID8gc3RvcmVkVmFsdWVcbiAgICA6IFtdO1xuXG4gIHJldHVybiB0aW1lcyhQUkVGRVJSRURfUkVBQ1RJT05fRU1PSklfQ09VTlQsIGluZGV4ID0+IHtcbiAgICBjb25zdCBzdG9yZWRJdGVtOiB1bmtub3duID0gc3RvcmVkVmFsdWVBc0FycmF5W2luZGV4XTtcbiAgICBpZiAoaXNWYWxpZFJlYWN0aW9uRW1vamkoc3RvcmVkSXRlbSkpIHtcbiAgICAgIHJldHVybiBzdG9yZWRJdGVtO1xuICAgIH1cblxuICAgIGNvbnN0IGZhbGxiYWNrU2hvcnROYW1lOiB1bmRlZmluZWQgfCBzdHJpbmcgPVxuICAgICAgREVGQVVMVF9QUkVGRVJSRURfUkVBQ1RJT05fRU1PSklfU0hPUlRfTkFNRVNbaW5kZXhdO1xuICAgIGlmICghZmFsbGJhY2tTaG9ydE5hbWUpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ0luZGV4IGlzIG91dCBvZiByYW5nZS4gSXMgdGhlIHByZWZlcnJlZCBjb3VudCBsYXJnZXIgdGhhbiB0aGUgbGlzdCBvZiBmYWxsYmFja3M/J1xuICAgICAgKTtcbiAgICAgIHJldHVybiAnXHUyNzY0XHVGRTBGJztcbiAgICB9XG5cbiAgICBjb25zdCBmYWxsYmFja0Vtb2ppID0gY29udmVydFNob3J0TmFtZShmYWxsYmFja1Nob3J0TmFtZSwgc2tpblRvbmUpO1xuICAgIGlmICghZmFsbGJhY2tFbW9qaSkge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnTm8gZmFsbGJhY2sgZW1vamkuIERvZXMgdGhlIGZhbGxiYWNrIGxpc3QgY29udGFpbiBhbiBpbnZhbGlkIHNob3J0IG5hbWU/J1xuICAgICAgKTtcbiAgICAgIHJldHVybiAnXHUyNzY0XHVGRTBGJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsbGJhY2tFbW9qaTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBjYW5CZVN5bmNlZCA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEFycmF5PHN0cmluZz4gPT5cbiAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiZcbiAgdmFsdWUubGVuZ3RoIDw9IE1BWF9TVE9SRURfTEVOR1RIICYmXG4gIHZhbHVlLmV2ZXJ5KFxuICAgIGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnICYmIGl0ZW0ubGVuZ3RoIDw9IE1BWF9JVEVNX0xFTkdUSFxuICApO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXNCO0FBQ3RCLFVBQXFCO0FBQ3JCLHVCQUE2RDtBQUM3RCxpQkFBaUM7QUFDakMsa0NBQXFDO0FBRXJDLE1BQU0sb0JBQW9CO0FBQzFCLE1BQU0sa0JBQWtCO0FBRXhCLE1BQU0saUNBQ0osOERBQTZDO0FBRXhDLG1DQUNMLGFBQ0EsVUFDZTtBQUNmLFFBQU0scUJBQXFDLE1BQU0sUUFBUSxXQUFXLElBQ2hFLGNBQ0EsQ0FBQztBQUVMLFNBQU8seUJBQU0sZ0NBQWdDLFdBQVM7QUFDcEQsVUFBTSxhQUFzQixtQkFBbUI7QUFDL0MsUUFBSSxzREFBcUIsVUFBVSxHQUFHO0FBQ3BDLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxvQkFDSiw4REFBNkM7QUFDL0MsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixVQUFJLE1BQ0Ysa0ZBQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZ0JBQWdCLGlDQUFpQixtQkFBbUIsUUFBUTtBQUNsRSxRQUFJLENBQUMsZUFBZTtBQUNsQixVQUFJLE1BQ0YsMEVBQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNULENBQUM7QUFDSDtBQWpDZ0IsQUFtQ1QsTUFBTSxjQUFjLHdCQUFDLFVBQzFCLE1BQU0sUUFBUSxLQUFLLEtBQ25CLE1BQU0sVUFBVSxxQkFDaEIsTUFBTSxNQUNKLFVBQVEsT0FBTyxTQUFTLFlBQVksS0FBSyxVQUFVLGVBQ3JELEdBTHlCOyIsCiAgIm5hbWVzIjogW10KfQo=
