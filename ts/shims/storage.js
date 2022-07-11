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
var storage_exports = {};
__export(storage_exports, {
  put: () => put,
  remove: () => remove
});
module.exports = __toCommonJS(storage_exports);
function put(key, value) {
  window.storage.put(key, value);
}
async function remove(key) {
  await window.storage.remove(key);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  put,
  remove
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RvcmFnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgU3RvcmFnZUFjY2Vzc1R5cGUgfSBmcm9tICcuLi90eXBlcy9TdG9yYWdlLmQnO1xuXG4vLyBNYXRjaGluZyB3aW5kb3cuc3RvcmFnZS5wdXQgQVBJXG5leHBvcnQgZnVuY3Rpb24gcHV0PEsgZXh0ZW5kcyBrZXlvZiBTdG9yYWdlQWNjZXNzVHlwZT4oXG4gIGtleTogSyxcbiAgdmFsdWU6IFN0b3JhZ2VBY2Nlc3NUeXBlW0tdXG4pOiB2b2lkIHtcbiAgd2luZG93LnN0b3JhZ2UucHV0KGtleSwgdmFsdWUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlKGtleToga2V5b2YgU3RvcmFnZUFjY2Vzc1R5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgd2luZG93LnN0b3JhZ2UucmVtb3ZlKGtleSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNTyxhQUNMLEtBQ0EsT0FDTTtBQUNOLFNBQU8sUUFBUSxJQUFJLEtBQUssS0FBSztBQUMvQjtBQUxnQixBQU9oQixzQkFBNkIsS0FBNkM7QUFDeEUsUUFBTSxPQUFPLFFBQVEsT0FBTyxHQUFHO0FBQ2pDO0FBRnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
