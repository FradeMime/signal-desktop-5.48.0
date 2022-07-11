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
var popperUtil_exports = {};
__export(popperUtil_exports, {
  offsetDistanceModifier: () => offsetDistanceModifier,
  sameWidthModifier: () => sameWidthModifier
});
module.exports = __toCommonJS(popperUtil_exports);
const offsetDistanceModifier = /* @__PURE__ */ __name((distance) => ({
  name: "offset",
  options: { offset: [void 0, distance] }
}), "offsetDistanceModifier");
const sameWidthModifier = {
  name: "sameWidth",
  enabled: true,
  phase: "write",
  fn({ state }) {
    state.elements.popper.style.width = `${state.rects.reference.width}px`;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  offsetDistanceModifier,
  sameWidthModifier
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG9wcGVyVXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1vZGlmaWVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBPZmZzZXRNb2RpZmllciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvb2Zmc2V0JztcblxuLyoqXG4gKiBTaG9ydGhhbmQgZm9yIHRoZSBbb2Zmc2V0IG1vZGlmaWVyXVswXSB3aGVuIHlvdSBqdXN0IHdhbm5hIHNldCB0aGUgZGlzdGFuY2UuXG4gKlxuICogWzBdOiBodHRwczovL3BvcHBlci5qcy5vcmcvZG9jcy92Mi9tb2RpZmllcnMvb2Zmc2V0L1xuICovXG5leHBvcnQgY29uc3Qgb2Zmc2V0RGlzdGFuY2VNb2RpZmllciA9IChcbiAgZGlzdGFuY2U6IG51bWJlclxuKTogUGFydGlhbDxPZmZzZXRNb2RpZmllcj4gPT4gKHtcbiAgbmFtZTogJ29mZnNldCcsXG4gIG9wdGlvbnM6IHsgb2Zmc2V0OiBbdW5kZWZpbmVkLCBkaXN0YW5jZV0gfSxcbn0pO1xuXG4vKipcbiAqIE1ha2UgdGhlIHBvcHBlciBlbGVtZW50IHRoZSBzYW1lIHdpZHRoIGFzIHRoZSByZWZlcmVuY2UsIGV2ZW4gd2hlbiB5b3UgcmVzaXplLlxuICpcbiAqIFNob3VsZCBwcm9iYWJseSBiZSB1c2VkIHdpdGggdGhlIFwidG9wLXN0YXJ0XCIsIFwidG9wLWVuZFwiLCBcImJvdHRvbS1zdGFydFwiLCBvclxuICogXCJib3R0b20tZW5kXCIgcGxhY2VtZW50LlxuICovXG5leHBvcnQgY29uc3Qgc2FtZVdpZHRoTW9kaWZpZXI6IE1vZGlmaWVyPCdzYW1lV2lkdGgnLCB1bmtub3duPiA9IHtcbiAgbmFtZTogJ3NhbWVXaWR0aCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbih7IHN0YXRlIH0pIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBzdGF0ZS5lbGVtZW50cy5wb3BwZXIuc3R5bGUud2lkdGggPSBgJHtzdGF0ZS5yZWN0cy5yZWZlcmVuY2Uud2lkdGh9cHhgO1xuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdPLE1BQU0seUJBQXlCLHdCQUNwQyxhQUM2QjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUNOLFNBQVMsRUFBRSxRQUFRLENBQUMsUUFBVyxRQUFRLEVBQUU7QUFDM0MsSUFMc0M7QUFhL0IsTUFBTSxvQkFBb0Q7QUFBQSxFQUMvRCxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxHQUFHLEVBQUUsU0FBUztBQUVaLFVBQU0sU0FBUyxPQUFPLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxVQUFVO0FBQUEsRUFDL0Q7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
