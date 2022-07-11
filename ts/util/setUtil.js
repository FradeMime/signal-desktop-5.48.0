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
var setUtil_exports = {};
__export(setUtil_exports, {
  isEqual: () => isEqual,
  remove: () => remove,
  toggle: () => toggle
});
module.exports = __toCommonJS(setUtil_exports);
var import_iterables = require("./iterables");
const add = /* @__PURE__ */ __name((set, item) => new Set(set).add(item), "add");
const remove = /* @__PURE__ */ __name((set, ...items) => {
  const clone = new Set(set);
  for (const item of items) {
    clone.delete(item);
  }
  return clone;
}, "remove");
const toggle = /* @__PURE__ */ __name((set, item, shouldInclude) => (shouldInclude ? add : remove)(set, item), "toggle");
const isEqual = /* @__PURE__ */ __name((a, b) => a === b || a.size === b.size && (0, import_iterables.every)(a, (item) => b.has(item)), "isEqual");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isEqual,
  remove,
  toggle
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0VXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGV2ZXJ5IH0gZnJvbSAnLi9pdGVyYWJsZXMnO1xuXG5jb25zdCBhZGQgPSA8VD4oc2V0OiBSZWFkb25seTxTZXQ8VD4+LCBpdGVtOiBUKTogU2V0PFQ+ID0+XG4gIG5ldyBTZXQoc2V0KS5hZGQoaXRlbSk7XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSA8VD4oXG4gIHNldDogUmVhZG9ubHk8U2V0PFQ+PixcbiAgLi4uaXRlbXM6IFJlYWRvbmx5QXJyYXk8VD5cbik6IFNldDxUPiA9PiB7XG4gIGNvbnN0IGNsb25lID0gbmV3IFNldChzZXQpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjbG9uZS5kZWxldGUoaXRlbSk7XG4gIH1cbiAgcmV0dXJuIGNsb25lO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZSA9IDxUPihcbiAgc2V0OiBSZWFkb25seTxTZXQ8VD4+LFxuICBpdGVtOiBSZWFkb25seTxUPixcbiAgc2hvdWxkSW5jbHVkZTogYm9vbGVhblxuKTogU2V0PFQ+ID0+IChzaG91bGRJbmNsdWRlID8gYWRkIDogcmVtb3ZlKShzZXQsIGl0ZW0pO1xuXG5leHBvcnQgY29uc3QgaXNFcXVhbCA9IChcbiAgYTogUmVhZG9ubHk8U2V0PHVua25vd24+PixcbiAgYjogUmVhZG9ubHk8U2V0PHVua25vd24+PlxuKTogYm9vbGVhbiA9PiBhID09PSBiIHx8IChhLnNpemUgPT09IGIuc2l6ZSAmJiBldmVyeShhLCBpdGVtID0+IGIuaGFzKGl0ZW0pKSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHVCQUFzQjtBQUV0QixNQUFNLE1BQU0sd0JBQUksS0FBdUIsU0FDckMsSUFBSSxJQUFJLEdBQUcsRUFBRSxJQUFJLElBQUksR0FEWDtBQUdMLE1BQU0sU0FBUyx3QkFDcEIsUUFDRyxVQUNRO0FBQ1gsUUFBTSxRQUFRLElBQUksSUFBSSxHQUFHO0FBQ3pCLGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFVBQU0sT0FBTyxJQUFJO0FBQUEsRUFDbkI7QUFDQSxTQUFPO0FBQ1QsR0FUc0I7QUFXZixNQUFNLFNBQVMsd0JBQ3BCLEtBQ0EsTUFDQSxrQkFDWSxpQkFBZ0IsTUFBTSxRQUFRLEtBQUssSUFBSSxHQUovQjtBQU1mLE1BQU0sVUFBVSx3QkFDckIsR0FDQSxNQUNZLE1BQU0sS0FBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLDRCQUFNLEdBQUcsVUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLEdBSHBEOyIsCiAgIm5hbWVzIjogW10KfQo=
