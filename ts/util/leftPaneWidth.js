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
var leftPaneWidth_exports = {};
__export(leftPaneWidth_exports, {
  MAX_WIDTH: () => MAX_WIDTH,
  MIN_FULL_WIDTH: () => MIN_FULL_WIDTH,
  MIN_WIDTH: () => MIN_WIDTH,
  SNAP_WIDTH: () => SNAP_WIDTH,
  getWidthFromPreferredWidth: () => getWidthFromPreferredWidth
});
module.exports = __toCommonJS(leftPaneWidth_exports);
var import_lodash = require("lodash");
var import_isSorted = require("./isSorted");
var import_assert = require("./assert");
const MIN_WIDTH = 97;
const SNAP_WIDTH = 200;
const MIN_FULL_WIDTH = 280;
const MAX_WIDTH = 380;
(0, import_assert.strictAssert)((0, import_isSorted.isSorted)([MIN_WIDTH, SNAP_WIDTH, MIN_FULL_WIDTH, MAX_WIDTH]), "Expected widths to be in the right order");
function getWidthFromPreferredWidth(preferredWidth, { requiresFullWidth }) {
  const clampedWidth = (0, import_lodash.clamp)(preferredWidth, MIN_WIDTH, MAX_WIDTH);
  if (requiresFullWidth || clampedWidth >= SNAP_WIDTH) {
    return Math.max(clampedWidth, MIN_FULL_WIDTH);
  }
  return MIN_WIDTH;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_WIDTH,
  MIN_FULL_WIDTH,
  MIN_WIDTH,
  SNAP_WIDTH,
  getWidthFromPreferredWidth
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGVmdFBhbmVXaWR0aC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjbGFtcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpc1NvcnRlZCB9IGZyb20gJy4vaXNTb3J0ZWQnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuXG5leHBvcnQgY29uc3QgTUlOX1dJRFRIID0gOTc7XG5leHBvcnQgY29uc3QgU05BUF9XSURUSCA9IDIwMDtcbmV4cG9ydCBjb25zdCBNSU5fRlVMTF9XSURUSCA9IDI4MDtcbmV4cG9ydCBjb25zdCBNQVhfV0lEVEggPSAzODA7XG5zdHJpY3RBc3NlcnQoXG4gIGlzU29ydGVkKFtNSU5fV0lEVEgsIFNOQVBfV0lEVEgsIE1JTl9GVUxMX1dJRFRILCBNQVhfV0lEVEhdKSxcbiAgJ0V4cGVjdGVkIHdpZHRocyB0byBiZSBpbiB0aGUgcmlnaHQgb3JkZXInXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2lkdGhGcm9tUHJlZmVycmVkV2lkdGgoXG4gIHByZWZlcnJlZFdpZHRoOiBudW1iZXIsXG4gIHsgcmVxdWlyZXNGdWxsV2lkdGggfTogeyByZXF1aXJlc0Z1bGxXaWR0aDogYm9vbGVhbiB9XG4pOiBudW1iZXIge1xuICBjb25zdCBjbGFtcGVkV2lkdGggPSBjbGFtcChwcmVmZXJyZWRXaWR0aCwgTUlOX1dJRFRILCBNQVhfV0lEVEgpO1xuXG4gIGlmIChyZXF1aXJlc0Z1bGxXaWR0aCB8fCBjbGFtcGVkV2lkdGggPj0gU05BUF9XSURUSCkge1xuICAgIHJldHVybiBNYXRoLm1heChjbGFtcGVkV2lkdGgsIE1JTl9GVUxMX1dJRFRIKTtcbiAgfVxuXG4gIHJldHVybiBNSU5fV0lEVEg7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBc0I7QUFDdEIsc0JBQXlCO0FBQ3pCLG9CQUE2QjtBQUV0QixNQUFNLFlBQVk7QUFDbEIsTUFBTSxhQUFhO0FBQ25CLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sWUFBWTtBQUN6QixnQ0FDRSw4QkFBUyxDQUFDLFdBQVcsWUFBWSxnQkFBZ0IsU0FBUyxDQUFDLEdBQzNELDBDQUNGO0FBRU8sb0NBQ0wsZ0JBQ0EsRUFBRSxxQkFDTTtBQUNSLFFBQU0sZUFBZSx5QkFBTSxnQkFBZ0IsV0FBVyxTQUFTO0FBRS9ELE1BQUkscUJBQXFCLGdCQUFnQixZQUFZO0FBQ25ELFdBQU8sS0FBSyxJQUFJLGNBQWMsY0FBYztBQUFBLEVBQzlDO0FBRUEsU0FBTztBQUNUO0FBWGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
