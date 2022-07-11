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
var fabricEffectListener_exports = {};
__export(fabricEffectListener_exports, {
  fabricEffectListener: () => fabricEffectListener
});
module.exports = __toCommonJS(fabricEffectListener_exports);
function fabricEffectListener(target, eventNames, handler) {
  for (const eventName of eventNames) {
    target.on(eventName, handler);
  }
  return () => {
    for (const eventName of eventNames) {
      target.off(eventName, handler);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fabricEffectListener
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmFicmljRWZmZWN0TGlzdGVuZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBmYWJyaWMgfSBmcm9tICdmYWJyaWMnO1xuXG4vKipcbiAqIEEgaGVscGVyIGZvciBzZXR0aW5nIEZhYnJpYyBldmVudHMgaW5zaWRlIG9mIFJlYWN0IGB1c2VFZmZlY3Rgcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhYnJpY0VmZmVjdExpc3RlbmVyKFxuICB0YXJnZXQ6IGZhYnJpYy5JT2JzZXJ2YWJsZTx1bmtub3duPixcbiAgZXZlbnROYW1lczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICBoYW5kbGVyOiAoZXZlbnQ6IGZhYnJpYy5JRXZlbnQpID0+IHVua25vd25cbik6ICgpID0+IHZvaWQge1xuICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudE5hbWVzKSB7XG4gICAgdGFyZ2V0Lm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgZXZlbnROYW1lIG9mIGV2ZW50TmFtZXMpIHtcbiAgICAgIHRhcmdldC5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICB9XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUU8sOEJBQ0wsUUFDQSxZQUNBLFNBQ1k7QUFDWixhQUFXLGFBQWEsWUFBWTtBQUNsQyxXQUFPLEdBQUcsV0FBVyxPQUFPO0FBQUEsRUFDOUI7QUFFQSxTQUFPLE1BQU07QUFDWCxlQUFXLGFBQWEsWUFBWTtBQUNsQyxhQUFPLElBQUksV0FBVyxPQUFPO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQ0Y7QUFkZ0IiLAogICJuYW1lcyI6IFtdCn0K
