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
var universalExpireTimer_exports = {};
__export(universalExpireTimer_exports, {
  ITEM_NAME: () => ITEM_NAME,
  get: () => get,
  set: () => set
});
module.exports = __toCommonJS(universalExpireTimer_exports);
const ITEM_NAME = "universalExpireTimer";
function get() {
  return window.storage.get(ITEM_NAME) || 0;
}
function set(newValue) {
  return window.storage.put(ITEM_NAME, newValue || 0);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ITEM_NAME,
  get,
  set
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidW5pdmVyc2FsRXhwaXJlVGltZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGNvbnN0IElURU1fTkFNRSA9ICd1bml2ZXJzYWxFeHBpcmVUaW1lcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgcmV0dXJuIHdpbmRvdy5zdG9yYWdlLmdldChJVEVNX05BTUUpIHx8IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gd2luZG93LnN0b3JhZ2UucHV0KElURU1fTkFNRSwgbmV3VmFsdWUgfHwgMCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLE1BQU0sWUFBWTtBQUVsQixlQUF1QjtBQUM1QixTQUFPLE9BQU8sUUFBUSxJQUFJLFNBQVMsS0FBSztBQUMxQztBQUZnQixBQUlULGFBQWEsVUFBNkM7QUFDL0QsU0FBTyxPQUFPLFFBQVEsSUFBSSxXQUFXLFlBQVksQ0FBQztBQUNwRDtBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
