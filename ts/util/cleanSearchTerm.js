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
var cleanSearchTerm_exports = {};
__export(cleanSearchTerm_exports, {
  cleanSearchTerm: () => cleanSearchTerm
});
module.exports = __toCommonJS(cleanSearchTerm_exports);
function cleanSearchTerm(searchTerm) {
  const lowercase = searchTerm.toLowerCase();
  const withoutSpecialCharacters = lowercase.replace(/([-!"#$%&'()*+,./\\:;<=>?@[\]^_`{|}~])/g, " ");
  const whiteSpaceNormalized = withoutSpecialCharacters.replace(/\s+/g, " ");
  const byToken = whiteSpaceNormalized.split(" ");
  const withoutSpecialTokens = byToken.filter((token) => token && token !== "and" && token !== "or" && token !== "not" && token !== ")" && token !== "(" && token !== "+" && token !== "," && token !== "near");
  const withWildcards = withoutSpecialTokens.map((token) => `${token}*`);
  return withWildcards.join(" ").trim();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanSearchTerm
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xlYW5TZWFyY2hUZXJtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU2VhcmNoVGVybShzZWFyY2hUZXJtOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBsb3dlcmNhc2UgPSBzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHdpdGhvdXRTcGVjaWFsQ2hhcmFjdGVycyA9IGxvd2VyY2FzZS5yZXBsYWNlKFxuICAgIC8oWy0hXCIjJCUmJygpKissLi9cXFxcOjs8PT4/QFtcXF1eX2B7fH1+XSkvZyxcbiAgICAnICdcbiAgKTtcbiAgY29uc3Qgd2hpdGVTcGFjZU5vcm1hbGl6ZWQgPSB3aXRob3V0U3BlY2lhbENoYXJhY3RlcnMucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICBjb25zdCBieVRva2VuID0gd2hpdGVTcGFjZU5vcm1hbGl6ZWQuc3BsaXQoJyAnKTtcbiAgY29uc3Qgd2l0aG91dFNwZWNpYWxUb2tlbnMgPSBieVRva2VuLmZpbHRlcihcbiAgICB0b2tlbiA9PlxuICAgICAgdG9rZW4gJiZcbiAgICAgIHRva2VuICE9PSAnYW5kJyAmJlxuICAgICAgdG9rZW4gIT09ICdvcicgJiZcbiAgICAgIHRva2VuICE9PSAnbm90JyAmJlxuICAgICAgdG9rZW4gIT09ICcpJyAmJlxuICAgICAgdG9rZW4gIT09ICcoJyAmJlxuICAgICAgdG9rZW4gIT09ICcrJyAmJlxuICAgICAgdG9rZW4gIT09ICcsJyAmJlxuICAgICAgdG9rZW4gIT09ICduZWFyJ1xuICApO1xuICBjb25zdCB3aXRoV2lsZGNhcmRzID0gd2l0aG91dFNwZWNpYWxUb2tlbnMubWFwKHRva2VuID0+IGAke3Rva2VufSpgKTtcblxuICByZXR1cm4gd2l0aFdpbGRjYXJkcy5qb2luKCcgJykudHJpbSgpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLHlCQUF5QixZQUE0QjtBQUMxRCxRQUFNLFlBQVksV0FBVyxZQUFZO0FBQ3pDLFFBQU0sMkJBQTJCLFVBQVUsUUFDekMsMkNBQ0EsR0FDRjtBQUNBLFFBQU0sdUJBQXVCLHlCQUF5QixRQUFRLFFBQVEsR0FBRztBQUN6RSxRQUFNLFVBQVUscUJBQXFCLE1BQU0sR0FBRztBQUM5QyxRQUFNLHVCQUF1QixRQUFRLE9BQ25DLFdBQ0UsU0FDQSxVQUFVLFNBQ1YsVUFBVSxRQUNWLFVBQVUsU0FDVixVQUFVLE9BQ1YsVUFBVSxPQUNWLFVBQVUsT0FDVixVQUFVLE9BQ1YsVUFBVSxNQUNkO0FBQ0EsUUFBTSxnQkFBZ0IscUJBQXFCLElBQUksV0FBUyxHQUFHLFFBQVE7QUFFbkUsU0FBTyxjQUFjLEtBQUssR0FBRyxFQUFFLEtBQUs7QUFDdEM7QUF2QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
