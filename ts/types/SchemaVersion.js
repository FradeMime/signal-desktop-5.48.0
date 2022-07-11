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
var SchemaVersion_exports = {};
__export(SchemaVersion_exports, {
  isValid: () => isValid
});
module.exports = __toCommonJS(SchemaVersion_exports);
var import_lodash = require("lodash");
const isValid = /* @__PURE__ */ __name((value) => {
  return Boolean((0, import_lodash.isNumber)(value) && value >= 0);
}, "isValid");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2NoZW1hVmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IGlzVmFsaWQgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIgPT4ge1xuICByZXR1cm4gQm9vbGVhbihpc051bWJlcih2YWx1ZSkgJiYgdmFsdWUgPj0gMCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUVsQixNQUFNLFVBQVUsd0JBQUMsVUFBb0M7QUFDMUQsU0FBTyxRQUFRLDRCQUFTLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDOUMsR0FGdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
