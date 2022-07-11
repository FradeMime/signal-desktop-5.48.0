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
var isConversationTooBigToRing_exports = {};
__export(isConversationTooBigToRing_exports, {
  isConversationTooBigToRing: () => isConversationTooBigToRing
});
module.exports = __toCommonJS(isConversationTooBigToRing_exports);
var import_parseIntWithFallback = require("../util/parseIntWithFallback");
var import_RemoteConfig = require("../RemoteConfig");
const getMaxGroupCallRingSize = /* @__PURE__ */ __name(() => (0, import_parseIntWithFallback.parseIntWithFallback)((0, import_RemoteConfig.getValue)("global.calling.maxGroupCallRingSize"), 16), "getMaxGroupCallRingSize");
const isConversationTooBigToRing = /* @__PURE__ */ __name((conversation) => (conversation.memberships?.length || 0) >= getMaxGroupCallRingSize(), "isConversationTooBigToRing");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationTooBigToRing
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25Ub29CaWdUb1JpbmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgcGFyc2VJbnRXaXRoRmFsbGJhY2sgfSBmcm9tICcuLi91dGlsL3BhcnNlSW50V2l0aEZhbGxiYWNrJztcbmltcG9ydCB7IGdldFZhbHVlIH0gZnJvbSAnLi4vUmVtb3RlQ29uZmlnJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuXG5jb25zdCBnZXRNYXhHcm91cENhbGxSaW5nU2l6ZSA9ICgpOiBudW1iZXIgPT5cbiAgcGFyc2VJbnRXaXRoRmFsbGJhY2soZ2V0VmFsdWUoJ2dsb2JhbC5jYWxsaW5nLm1heEdyb3VwQ2FsbFJpbmdTaXplJyksIDE2KTtcblxuZXhwb3J0IGNvbnN0IGlzQ29udmVyc2F0aW9uVG9vQmlnVG9SaW5nID0gKFxuICBjb252ZXJzYXRpb246IFJlYWRvbmx5PFBpY2s8Q29udmVyc2F0aW9uVHlwZSwgJ21lbWJlcnNoaXBzJz4+XG4pOiBib29sZWFuID0+XG4gIChjb252ZXJzYXRpb24ubWVtYmVyc2hpcHM/Lmxlbmd0aCB8fCAwKSA+PSBnZXRNYXhHcm91cENhbGxSaW5nU2l6ZSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtDQUFxQztBQUNyQywwQkFBeUI7QUFHekIsTUFBTSwwQkFBMEIsNkJBQzlCLHNEQUFxQixrQ0FBUyxxQ0FBcUMsR0FBRyxFQUFFLEdBRDFDO0FBR3pCLE1BQU0sNkJBQTZCLHdCQUN4QyxpQkFFQyxjQUFhLGFBQWEsVUFBVSxNQUFNLHdCQUF3QixHQUgzQjsiLAogICJuYW1lcyI6IFtdCn0K
