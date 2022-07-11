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
var getMessageTimestamp_exports = {};
__export(getMessageTimestamp_exports, {
  getMessageTimestamp: () => getMessageTimestamp
});
module.exports = __toCommonJS(getMessageTimestamp_exports);
function getMessageTimestamp(message) {
  return message.received_at_ms || message.received_at;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMessageTimestamp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TWVzc2FnZVRpbWVzdGFtcC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXNzYWdlVGltZXN0YW1wKFxuICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSwgJ3JlY2VpdmVkX2F0JyB8ICdyZWNlaXZlZF9hdF9tcyc+XG4pOiBudW1iZXIge1xuICByZXR1cm4gbWVzc2FnZS5yZWNlaXZlZF9hdF9tcyB8fCBtZXNzYWdlLnJlY2VpdmVkX2F0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtPLDZCQUNMLFNBQ1E7QUFDUixTQUFPLFFBQVEsa0JBQWtCLFFBQVE7QUFDM0M7QUFKZ0IiLAogICJuYW1lcyI6IFtdCn0K
