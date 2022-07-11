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
var deconstructLookup_exports = {};
__export(deconstructLookup_exports, {
  deconstructLookup: () => deconstructLookup
});
module.exports = __toCommonJS(deconstructLookup_exports);
var import_getOwn = require("./getOwn");
var import_assert = require("./assert");
const deconstructLookup = /* @__PURE__ */ __name((lookup, keys) => {
  const result = [];
  keys.forEach((key) => {
    const value = (0, import_getOwn.getOwn)(lookup, key);
    if (value) {
      result.push(value);
    } else {
      (0, import_assert.assert)(false, `deconstructLookup: lookup failed for ${key}; dropping`);
    }
  });
  return result;
}, "deconstructLookup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deconstructLookup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVjb25zdHJ1Y3RMb29rdXAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZ2V0T3duIH0gZnJvbSAnLi9nZXRPd24nO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuXG5leHBvcnQgY29uc3QgZGVjb25zdHJ1Y3RMb29rdXAgPSA8VD4oXG4gIGxvb2t1cDogUmVjb3JkPHN0cmluZywgVD4sXG4gIGtleXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPlxuKTogQXJyYXk8VD4gPT4ge1xuICBjb25zdCByZXN1bHQ6IEFycmF5PFQ+ID0gW107XG4gIGtleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldE93bihsb29rdXAsIGtleSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydChmYWxzZSwgYGRlY29uc3RydWN0TG9va3VwOiBsb29rdXAgZmFpbGVkIGZvciAke2tleX07IGRyb3BwaW5nYCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBQ3ZCLG9CQUF1QjtBQUVoQixNQUFNLG9CQUFvQix3QkFDL0IsUUFDQSxTQUNhO0FBQ2IsUUFBTSxTQUFtQixDQUFDO0FBQzFCLE9BQUssUUFBUSxDQUFDLFFBQWdCO0FBQzVCLFVBQU0sUUFBUSwwQkFBTyxRQUFRLEdBQUc7QUFDaEMsUUFBSSxPQUFPO0FBQ1QsYUFBTyxLQUFLLEtBQUs7QUFBQSxJQUNuQixPQUFPO0FBQ0wsZ0NBQU8sT0FBTyx3Q0FBd0MsZUFBZTtBQUFBLElBQ3ZFO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTztBQUNULEdBZGlDOyIsCiAgIm5hbWVzIjogW10KfQo=
