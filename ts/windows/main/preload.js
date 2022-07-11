var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_shims = require("../shims");
var log = __toESM(require("../../logging/log"));
window.preloadStartTime = Date.now();
try {
  require("./start");
} catch (error) {
  if (console._log) {
    console._log("preload error!", error.stack);
  }
  console.log("preload error!", error.stack);
  throw error;
}
window.preloadEndTime = Date.now();
log.info("preload complete");
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaGFzIHRvIGJlIHRoZSBmaXJzdCBpbXBvcnQgYmVjYXVzZSBvZiBtb25rZXktcGF0Y2hpbmdcbmltcG9ydCAnLi4vc2hpbXMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG53aW5kb3cucHJlbG9hZFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbnRyeSB7XG4gIHJlcXVpcmUoJy4vc3RhcnQnKTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKGNvbnNvbGUuX2xvZykge1xuICAgIGNvbnNvbGUuX2xvZygncHJlbG9hZCBlcnJvciEnLCBlcnJvci5zdGFjayk7XG4gIH1cbiAgY29uc29sZS5sb2coJ3ByZWxvYWQgZXJyb3IhJywgZXJyb3Iuc3RhY2spO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuICB0aHJvdyBlcnJvcjtcbn1cblxud2luZG93LnByZWxvYWRFbmRUaW1lID0gRGF0ZS5ub3coKTtcbmxvZy5pbmZvKCdwcmVsb2FkIGNvbXBsZXRlJyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQSxtQkFBTztBQUlQLFVBQXFCO0FBRXJCLE9BQU8sbUJBQW1CLEtBQUssSUFBSTtBQUVuQyxJQUFJO0FBQ0YsVUFBUSxTQUFTO0FBQ25CLFNBQVMsT0FBUDtBQUVBLE1BQUksUUFBUSxNQUFNO0FBQ2hCLFlBQVEsS0FBSyxrQkFBa0IsTUFBTSxLQUFLO0FBQUEsRUFDNUM7QUFDQSxVQUFRLElBQUksa0JBQWtCLE1BQU0sS0FBSztBQUd6QyxRQUFNO0FBQ1I7QUFFQSxPQUFPLGlCQUFpQixLQUFLLElBQUk7QUFDakMsSUFBSSxLQUFLLGtCQUFrQjsiLAogICJuYW1lcyI6IFtdCn0K
