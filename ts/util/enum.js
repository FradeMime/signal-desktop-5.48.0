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
var enum_exports = {};
__export(enum_exports, {
  makeEnumParser: () => makeEnumParser
});
module.exports = __toCommonJS(enum_exports);
function makeEnumParser(enumToParse, defaultValue) {
  const enumValues = new Set(Object.values(enumToParse));
  const isEnumValue = /* @__PURE__ */ __name((value) => typeof value === "string" && enumValues.has(value), "isEnumValue");
  return (value) => isEnumValue(value) ? value : defaultValue;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeEnumParser
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW51bS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKipcbiAqIFR1cm4gYSBzdHJpbmcgKGxpa2UgXCJncmVlblwiKSBpbnRvIGl0cyBlbnVtIHR5cGUgKGxpa2UgYENvbG9yLkdyZWVuYCkuIFVzZWZ1bCB3aGVuXG4gKiBkZXNlcmlhbGl6aW5nIHN0cmluZ3MgaW50byBlbnVtIHR5cGVzLlxuICpcbiAqIEl0IG9ubHkgc3VwcG9ydHMgZW51bXMgd2l0aCBzdHJpbmcgdmFsdWVzLiBJdCBjb3VsZCB0aGVvcmV0aWNhbGx5IHN1cHBvcnQgbW9yZSwgYnV0OlxuICpcbiAqIDEuIEl0J3MgZWFzaWVyIHRvIGRlYnVnLiBBIHNlcmlhbGl6ZWQgdmFsdWUgb2YgXCJHcmVlblwiIGlzIGVhc2llciB0byBhc3NvY2lhdGUgd2l0aFxuICogICAgYENvbG9yLkdyZWVuYCB0aGFuIGEgc2VyaWFsaXplZCB2YWx1ZSBvZiAyLlxuICogMi4gVHlwZVNjcmlwdCdzIGRlZmF1bHQgdXNlcyBudW1lcmljIGVudW0gdmFsdWVzLiBCZWNhdXNlIHRoZSBzdGFiaWxpdHkgb2YgdmFsdWVzIGlzXG4gKiAgICBpbXBvcnRhbnQgYW5kIGl0J3MgZWFzeSB0byBtZXNzIHVwIHRoZSBzdGFiaWxpdHkgb2YgdmFsdWVzIChlLmcuLCBieSByZW9yZGVyaW5nIHRoZVxuICogICAgZW51bSksIHRoZXNlIGFyZSBkaXNjb3VyYWdlZCBoZXJlLlxuICpcbiAqIEFnYWluOiBubyBcImhhcmRcIiB0ZWNobmljYWwgcmVhc29uIHdoeSB0aGlzIG9ubHkgc3VwcG9ydHMgc3RyaW5nczsgaXQncyB0byBlbmNvdXJhZ2VcbiAqIGdvb2QgYmVoYXZpb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRW51bVBhcnNlcjxcbiAgVEVudW1LZXkgZXh0ZW5kcyBzdHJpbmcsXG4gIFRFbnVtVmFsdWUgZXh0ZW5kcyBzdHJpbmdcbj4oXG4gIGVudW1Ub1BhcnNlOiBSZWNvcmQ8VEVudW1LZXksIFRFbnVtVmFsdWU+LFxuICBkZWZhdWx0VmFsdWU6IFRFbnVtVmFsdWVcbik6ICh2YWx1ZTogdW5rbm93bikgPT4gVEVudW1WYWx1ZSB7XG4gIGNvbnN0IGVudW1WYWx1ZXMgPSBuZXcgU2V0KE9iamVjdC52YWx1ZXMoZW51bVRvUGFyc2UpKTtcbiAgY29uc3QgaXNFbnVtVmFsdWUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBURW51bVZhbHVlID0+XG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBlbnVtVmFsdWVzLmhhcyh2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZSA9PiAoaXNFbnVtVmFsdWUodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWUpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCTyx3QkFJTCxhQUNBLGNBQ2dDO0FBQ2hDLFFBQU0sYUFBYSxJQUFJLElBQUksT0FBTyxPQUFPLFdBQVcsQ0FBQztBQUNyRCxRQUFNLGNBQWMsd0JBQUMsVUFDbkIsT0FBTyxVQUFVLFlBQVksV0FBVyxJQUFJLEtBQUssR0FEL0I7QUFFcEIsU0FBTyxXQUFVLFlBQVksS0FBSyxJQUFJLFFBQVE7QUFDaEQ7QUFYZ0IiLAogICJuYW1lcyI6IFtdCn0K
