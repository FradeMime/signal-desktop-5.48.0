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
var canvasToBytes_exports = {};
__export(canvasToBytes_exports, {
  canvasToBytes: () => canvasToBytes
});
module.exports = __toCommonJS(canvasToBytes_exports);
var import_canvasToBlob = require("./canvasToBlob");
async function canvasToBytes(canvas, mimeType, quality) {
  const blob = await (0, import_canvasToBlob.canvasToBlob)(canvas, mimeType, quality);
  return new Uint8Array(await blob.arrayBuffer());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canvasToBytes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FudmFzVG9CeXRlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjYW52YXNUb0Jsb2IgfSBmcm9tICcuL2NhbnZhc1RvQmxvYic7XG5pbXBvcnQgdHlwZSB7IE1JTUVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYW52YXNUb0J5dGVzKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBtaW1lVHlwZT86IE1JTUVUeXBlLFxuICBxdWFsaXR5PzogbnVtYmVyXG4pOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgY29uc3QgYmxvYiA9IGF3YWl0IGNhbnZhc1RvQmxvYihjYW52YXMsIG1pbWVUeXBlLCBxdWFsaXR5KTtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGJsb2IuYXJyYXlCdWZmZXIoKSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsMEJBQTZCO0FBRzdCLDZCQUNFLFFBQ0EsVUFDQSxTQUNxQjtBQUNyQixRQUFNLE9BQU8sTUFBTSxzQ0FBYSxRQUFRLFVBQVUsT0FBTztBQUN6RCxTQUFPLElBQUksV0FBVyxNQUFNLEtBQUssWUFBWSxDQUFDO0FBQ2hEO0FBUHNCIiwKICAibmFtZXMiOiBbXQp9Cg==
