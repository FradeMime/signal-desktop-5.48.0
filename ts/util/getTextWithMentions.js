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
var getTextWithMentions_exports = {};
__export(getTextWithMentions_exports, {
  getTextWithMentions: () => getTextWithMentions
});
module.exports = __toCommonJS(getTextWithMentions_exports);
function getTextWithMentions(bodyRanges, text) {
  return bodyRanges.sort((a, b) => b.start - a.start).reduce((acc, { start, length, replacementText }) => {
    const left = acc.slice(0, start);
    const right = acc.slice(start + length);
    return `${left}@${replacementText}${right}`;
  }, text);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTextWithMentions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VGV4dFdpdGhNZW50aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEJvZHlSYW5nZXNUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0V2l0aE1lbnRpb25zKFxuICBib2R5UmFuZ2VzOiBCb2R5UmFuZ2VzVHlwZSxcbiAgdGV4dDogc3RyaW5nXG4pOiBzdHJpbmcge1xuICByZXR1cm4gYm9keVJhbmdlc1xuICAgIC5zb3J0KChhLCBiKSA9PiBiLnN0YXJ0IC0gYS5zdGFydClcbiAgICAucmVkdWNlKChhY2MsIHsgc3RhcnQsIGxlbmd0aCwgcmVwbGFjZW1lbnRUZXh0IH0pID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBhY2Muc2xpY2UoMCwgc3RhcnQpO1xuICAgICAgY29uc3QgcmlnaHQgPSBhY2Muc2xpY2Uoc3RhcnQgKyBsZW5ndGgpO1xuICAgICAgcmV0dXJuIGAke2xlZnR9QCR7cmVwbGFjZW1lbnRUZXh0fSR7cmlnaHR9YDtcbiAgICB9LCB0ZXh0KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLTyw2QkFDTCxZQUNBLE1BQ1E7QUFDUixTQUFPLFdBQ0osS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQ2hDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxRQUFRLHNCQUFzQjtBQUNuRCxVQUFNLE9BQU8sSUFBSSxNQUFNLEdBQUcsS0FBSztBQUMvQixVQUFNLFFBQVEsSUFBSSxNQUFNLFFBQVEsTUFBTTtBQUN0QyxXQUFPLEdBQUcsUUFBUSxrQkFBa0I7QUFBQSxFQUN0QyxHQUFHLElBQUk7QUFDWDtBQVhnQiIsCiAgIm5hbWVzIjogW10KfQo=
