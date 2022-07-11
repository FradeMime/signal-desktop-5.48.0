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
var refMerger_exports = {};
__export(refMerger_exports, {
  createRefMerger: () => createRefMerger,
  refMerger: () => refMerger
});
module.exports = __toCommonJS(refMerger_exports);
var import_memoizee = __toESM(require("memoizee"));
function refMerger(...refs) {
  return (el) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    });
  };
}
function createRefMerger() {
  return (0, import_memoizee.default)(refMerger, { length: false, max: 1 });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRefMerger,
  refMerger
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVmTWVyZ2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTXV0YWJsZVJlZk9iamVjdCwgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IG1lbW9pemVlIGZyb20gJ21lbW9pemVlJztcblxuLyoqXG4gKiBNZXJnZXMgbXVsdGlwbGUgcmVmcy5cbiAqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIGVhY2ggdGltZSwgd2hpY2ggbWF5IGNhdXNlIHVubmVjZXNzYXJ5IHJlLXJlbmRlcnMuIFRyeVxuICogYGNyZWF0ZVJlZk1lcmdlcmAgaWYgeW91IHdhbnQgdG8gY2FjaGUgdGhlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmTWVyZ2VyPFQ+KFxuICAuLi5yZWZzOiBBcnJheTxSZWY8dW5rbm93bj4+XG4pOiAodG9wTGV2ZWxSZWY6IFQpID0+IHZvaWQge1xuICByZXR1cm4gKGVsOiBUKSA9PiB7XG4gICAgcmVmcy5mb3JFYWNoKHJlZiA9PiB7XG4gICAgICAvLyBUaGlzIGlzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mIFt3aGF0IFJlYWN0IGRvZXNdWzBdIHRvIHNldCBhIHJlZi5cbiAgICAgIC8vIFswXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvMjliN2I3NzVmMmVjZjg3OGVhZjYwNWJlOTU5ZDk1OTAzMDU5OGIwNy9wYWNrYWdlcy9yZWFjdC1yZWNvbmNpbGVyL3NyYy9SZWFjdEZpYmVyQ29tbWl0V29yay5qcyNMNjYxLUw2NzdcbiAgICAgIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlZihlbCk7XG4gICAgICB9IGVsc2UgaWYgKHJlZikge1xuICAgICAgICAvLyBJIGJlbGlldmUgdGhlIHR5cGVzIGZvciBgcmVmYCBhcmUgd3JvbmcgaW4gdGhpcyBjYXNlLCBhcyBgcmVmLmN1cnJlbnRgIHNob3VsZFxuICAgICAgICAvLyAgIG5vdCBiZSBgcmVhZG9ubHlgLiBUaGF0J3Mgd2h5IHdlIGRvIHRoaXMgY2FzdC4gU2VlIFt0aGUgUmVhY3Qgc291cmNlXVsxXS5cbiAgICAgICAgLy8gWzFdOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi8yOWI3Yjc3NWYyZWNmODc4ZWFmNjA1YmU5NTlkOTU5MDMwNTk4YjA3L3BhY2thZ2VzL3NoYXJlZC9SZWFjdFR5cGVzLmpzI0w3OC1MODBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIChyZWYgYXMgTXV0YWJsZVJlZk9iamVjdDxUPikuY3VycmVudCA9IGVsO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVmTWVyZ2VyKCk6IHR5cGVvZiByZWZNZXJnZXIge1xuICByZXR1cm4gbWVtb2l6ZWUocmVmTWVyZ2VyLCB7IGxlbmd0aDogZmFsc2UsIG1heDogMSB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLHNCQUFxQjtBQVFkLHNCQUNGLE1BQ3VCO0FBQzFCLFNBQU8sQ0FBQyxPQUFVO0FBQ2hCLFNBQUssUUFBUSxTQUFPO0FBR2xCLFVBQUksT0FBTyxRQUFRLFlBQVk7QUFDN0IsWUFBSSxFQUFFO0FBQUEsTUFDUixXQUFXLEtBQUs7QUFLZCxRQUFDLElBQTRCLFVBQVU7QUFBQSxNQUN6QztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQWxCZ0IsQUFvQlQsMkJBQTZDO0FBQ2xELFNBQU8sNkJBQVMsV0FBVyxFQUFFLFFBQVEsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUN0RDtBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
