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
var isConversationNameKnown_exports = {};
__export(isConversationNameKnown_exports, {
  isConversationNameKnown: () => isConversationNameKnown
});
module.exports = __toCommonJS(isConversationNameKnown_exports);
var import_missingCaseError = require("./missingCaseError");
function isConversationNameKnown(conversation) {
  switch (conversation.type) {
    case "direct":
      return Boolean(conversation.name || conversation.profileName || conversation.e164);
    case "group":
      return Boolean(conversation.name);
    default:
      throw (0, import_missingCaseError.missingCaseError)(conversation.type);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationNameKnown
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25OYW1lS25vd24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi9taXNzaW5nQ2FzZUVycm9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udmVyc2F0aW9uTmFtZUtub3duKFxuICBjb252ZXJzYXRpb246IFJlYWRvbmx5PFxuICAgIFBpY2s8Q29udmVyc2F0aW9uVHlwZSwgJ2UxNjQnIHwgJ25hbWUnIHwgJ3Byb2ZpbGVOYW1lJyB8ICd0eXBlJz5cbiAgPlxuKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAoY29udmVyc2F0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdkaXJlY3QnOlxuICAgICAgcmV0dXJuIEJvb2xlYW4oXG4gICAgICAgIGNvbnZlcnNhdGlvbi5uYW1lIHx8IGNvbnZlcnNhdGlvbi5wcm9maWxlTmFtZSB8fCBjb252ZXJzYXRpb24uZTE2NFxuICAgICAgKTtcbiAgICBjYXNlICdncm91cCc6XG4gICAgICByZXR1cm4gQm9vbGVhbihjb252ZXJzYXRpb24ubmFtZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY29udmVyc2F0aW9uLnR5cGUpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsOEJBQWlDO0FBRTFCLGlDQUNMLGNBR1M7QUFDVCxVQUFRLGFBQWE7QUFBQSxTQUNkO0FBQ0gsYUFBTyxRQUNMLGFBQWEsUUFBUSxhQUFhLGVBQWUsYUFBYSxJQUNoRTtBQUFBLFNBQ0c7QUFDSCxhQUFPLFFBQVEsYUFBYSxJQUFJO0FBQUE7QUFFaEMsWUFBTSw4Q0FBaUIsYUFBYSxJQUFJO0FBQUE7QUFFOUM7QUFmZ0IiLAogICJuYW1lcyI6IFtdCn0K
