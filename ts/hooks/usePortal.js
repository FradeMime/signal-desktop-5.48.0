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
var usePortal_exports = {};
__export(usePortal_exports, {
  usePortal: () => usePortal
});
module.exports = __toCommonJS(usePortal_exports);
var import_react = require("react");
function usePortal() {
  const [root, setRoot] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
      setRoot(null);
    };
  }, []);
  return root;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePortal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlUG9ydGFsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVBvcnRhbCgpOiBIVE1MRGl2RWxlbWVudCB8IG51bGwge1xuICBjb25zdCBbcm9vdCwgc2V0Um9vdF0gPSB1c2VTdGF0ZTxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHNldFJvb3QoZGl2KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICBzZXRSb290KG51bGwpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gcm9vdDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBb0M7QUFFN0IscUJBQTRDO0FBQ2pELFFBQU0sQ0FBQyxNQUFNLFdBQVcsMkJBQWdDLElBQUk7QUFFNUQsOEJBQVUsTUFBTTtBQUNkLFVBQU0sTUFBTSxTQUFTLGNBQWMsS0FBSztBQUN4QyxhQUFTLEtBQUssWUFBWSxHQUFHO0FBQzdCLFlBQVEsR0FBRztBQUVYLFdBQU8sTUFBTTtBQUNYLGVBQVMsS0FBSyxZQUFZLEdBQUc7QUFDN0IsY0FBUSxJQUFJO0FBQUEsSUFDZDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQ1Q7QUFmZ0IiLAogICJuYW1lcyI6IFtdCn0K
