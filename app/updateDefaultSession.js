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
var updateDefaultSession_exports = {};
__export(updateDefaultSession_exports, {
  updateDefaultSession: () => updateDefaultSession
});
module.exports = __toCommonJS(updateDefaultSession_exports);
const SPELL_CHECKER_DICTIONARY_DOWNLOAD_URL = `https://updates.signal.org/desktop/hunspell_dictionaries/${process.versions.electron}/`;
function updateDefaultSession(session) {
  session.setSpellCheckerDictionaryDownloadURL(SPELL_CHECKER_DICTIONARY_DOWNLOAD_URL);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateDefaultSession
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlRGVmYXVsdFNlc3Npb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBTZXNzaW9uIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5jb25zdCBTUEVMTF9DSEVDS0VSX0RJQ1RJT05BUllfRE9XTkxPQURfVVJMID0gYGh0dHBzOi8vdXBkYXRlcy5zaWduYWwub3JnL2Rlc2t0b3AvaHVuc3BlbGxfZGljdGlvbmFyaWVzLyR7cHJvY2Vzcy52ZXJzaW9ucy5lbGVjdHJvbn0vYDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURlZmF1bHRTZXNzaW9uKHNlc3Npb246IFNlc3Npb24pOiB2b2lkIHtcbiAgc2Vzc2lvbi5zZXRTcGVsbENoZWNrZXJEaWN0aW9uYXJ5RG93bmxvYWRVUkwoXG4gICAgU1BFTExfQ0hFQ0tFUl9ESUNUSU9OQVJZX0RPV05MT0FEX1VSTFxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLE1BQU0sd0NBQXdDLDREQUE0RCxRQUFRLFNBQVM7QUFFcEgsOEJBQThCLFNBQXdCO0FBQzNELFVBQVEscUNBQ04scUNBQ0Y7QUFDRjtBQUpnQiIsCiAgIm5hbWVzIjogW10KfQo=
