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
var isWindowDragElement_exports = {};
__export(isWindowDragElement_exports, {
  isWindowDragElement: () => isWindowDragElement
});
module.exports = __toCommonJS(isWindowDragElement_exports);
function isWindowDragElement(el) {
  let currentEl = el;
  do {
    const appRegion = getComputedStyle(currentEl).getPropertyValue("-webkit-app-region");
    switch (appRegion) {
      case "no-drag":
        return false;
      case "drag":
        return true;
      default:
        currentEl = currentEl.parentElement;
        break;
    }
  } while (currentEl);
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isWindowDragElement
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNXaW5kb3dEcmFnRWxlbWVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXaW5kb3dEcmFnRWxlbWVudChlbDogUmVhZG9ubHk8RWxlbWVudD4pOiBib29sZWFuIHtcbiAgbGV0IGN1cnJlbnRFbDogRWxlbWVudCB8IG51bGwgPSBlbDtcbiAgZG8ge1xuICAgIGNvbnN0IGFwcFJlZ2lvbiA9XG4gICAgICBnZXRDb21wdXRlZFN0eWxlKGN1cnJlbnRFbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC1hcHAtcmVnaW9uJyk7XG4gICAgc3dpdGNoIChhcHBSZWdpb24pIHtcbiAgICAgIGNhc2UgJ25vLWRyYWcnOlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBjYXNlICdkcmFnJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjdXJyZW50RWwgPSBjdXJyZW50RWwucGFyZW50RWxlbWVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IHdoaWxlIChjdXJyZW50RWwpO1xuICByZXR1cm4gZmFsc2U7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sNkJBQTZCLElBQWdDO0FBQ2xFLE1BQUksWUFBNEI7QUFDaEMsS0FBRztBQUNELFVBQU0sWUFDSixpQkFBaUIsU0FBUyxFQUFFLGlCQUFpQixvQkFBb0I7QUFDbkUsWUFBUTtBQUFBLFdBQ0Q7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU87QUFBQTtBQUVQLG9CQUFZLFVBQVU7QUFDdEI7QUFBQTtBQUFBLEVBRU4sU0FBUztBQUNULFNBQU87QUFDVDtBQWhCZ0IiLAogICJuYW1lcyI6IFtdCn0K
