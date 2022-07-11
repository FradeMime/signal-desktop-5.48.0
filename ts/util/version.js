var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var version_exports = {};
__export(version_exports, {
  generateAlphaVersion: () => generateAlphaVersion,
  isAlpha: () => isAlpha,
  isBeta: () => isBeta,
  isProduction: () => isProduction,
  isStaging: () => isStaging
});
module.exports = __toCommonJS(version_exports);
var semver = __toESM(require("semver"));
var import_moment = __toESM(require("moment"));
const isProduction = /* @__PURE__ */ __name((version) => {
  const parsed = semver.parse(version);
  if (!parsed) {
    return false;
  }
  return !parsed.prerelease.length && !parsed.build.length;
}, "isProduction");
const isBeta = /* @__PURE__ */ __name((version) => semver.parse(version)?.prerelease[0] === "beta", "isBeta");
const isAlpha = /* @__PURE__ */ __name((version) => semver.parse(version)?.prerelease[0] === "alpha", "isAlpha");
const isStaging = /* @__PURE__ */ __name((version) => semver.parse(version)?.prerelease[0] === "staging", "isStaging");
const generateAlphaVersion = /* @__PURE__ */ __name((options) => {
  const { currentVersion, shortSha } = options;
  const parsed = semver.parse(currentVersion);
  if (!parsed) {
    throw new Error(`generateAlphaVersion: Invalid version ${currentVersion}`);
  }
  const formattedDate = (0, import_moment.default)().utc().format("YYYYMMDD.HH");
  const formattedVersion = `${parsed.major}.${parsed.minor}.${parsed.patch}`;
  return `${formattedVersion}-alpha.${formattedDate}-${shortSha}`;
}, "generateAlphaVersion");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateAlphaVersion,
  isAlpha,
  isBeta,
  isProduction,
  isStaging
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSAnc2VtdmVyJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZXhwb3J0IGNvbnN0IGlzUHJvZHVjdGlvbiA9ICh2ZXJzaW9uOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gc2VtdmVyLnBhcnNlKHZlcnNpb24pO1xuXG4gIGlmICghcGFyc2VkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuICFwYXJzZWQucHJlcmVsZWFzZS5sZW5ndGggJiYgIXBhcnNlZC5idWlsZC5sZW5ndGg7XG59O1xuXG5leHBvcnQgY29uc3QgaXNCZXRhID0gKHZlcnNpb246IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgc2VtdmVyLnBhcnNlKHZlcnNpb24pPy5wcmVyZWxlYXNlWzBdID09PSAnYmV0YSc7XG5cbmV4cG9ydCBjb25zdCBpc0FscGhhID0gKHZlcnNpb246IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgc2VtdmVyLnBhcnNlKHZlcnNpb24pPy5wcmVyZWxlYXNlWzBdID09PSAnYWxwaGEnO1xuXG5leHBvcnQgY29uc3QgaXNTdGFnaW5nID0gKHZlcnNpb246IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgc2VtdmVyLnBhcnNlKHZlcnNpb24pPy5wcmVyZWxlYXNlWzBdID09PSAnc3RhZ2luZyc7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUFscGhhVmVyc2lvbiA9IChvcHRpb25zOiB7XG4gIGN1cnJlbnRWZXJzaW9uOiBzdHJpbmc7XG4gIHNob3J0U2hhOiBzdHJpbmc7XG59KTogc3RyaW5nID0+IHtcbiAgY29uc3QgeyBjdXJyZW50VmVyc2lvbiwgc2hvcnRTaGEgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgcGFyc2VkID0gc2VtdmVyLnBhcnNlKGN1cnJlbnRWZXJzaW9uKTtcbiAgaWYgKCFwYXJzZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGdlbmVyYXRlQWxwaGFWZXJzaW9uOiBJbnZhbGlkIHZlcnNpb24gJHtjdXJyZW50VmVyc2lvbn1gKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBtb21lbnQoKS51dGMoKS5mb3JtYXQoJ1lZWVlNTURELkhIJyk7XG4gIGNvbnN0IGZvcm1hdHRlZFZlcnNpb24gPSBgJHtwYXJzZWQubWFqb3J9LiR7cGFyc2VkLm1pbm9yfS4ke3BhcnNlZC5wYXRjaH1gO1xuXG4gIHJldHVybiBgJHtmb3JtYXR0ZWRWZXJzaW9ufS1hbHBoYS4ke2Zvcm1hdHRlZERhdGV9LSR7c2hvcnRTaGF9YDtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxhQUF3QjtBQUN4QixvQkFBbUI7QUFFWixNQUFNLGVBQWUsd0JBQUMsWUFBNkI7QUFDeEQsUUFBTSxTQUFTLE9BQU8sTUFBTSxPQUFPO0FBRW5DLE1BQUksQ0FBQyxRQUFRO0FBQ1gsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLENBQUMsT0FBTyxXQUFXLFVBQVUsQ0FBQyxPQUFPLE1BQU07QUFDcEQsR0FSNEI7QUFVckIsTUFBTSxTQUFTLHdCQUFDLFlBQ3JCLE9BQU8sTUFBTSxPQUFPLEdBQUcsV0FBVyxPQUFPLFFBRHJCO0FBR2YsTUFBTSxVQUFVLHdCQUFDLFlBQ3RCLE9BQU8sTUFBTSxPQUFPLEdBQUcsV0FBVyxPQUFPLFNBRHBCO0FBR2hCLE1BQU0sWUFBWSx3QkFBQyxZQUN4QixPQUFPLE1BQU0sT0FBTyxHQUFHLFdBQVcsT0FBTyxXQURsQjtBQUdsQixNQUFNLHVCQUF1Qix3QkFBQyxZQUd2QjtBQUNaLFFBQU0sRUFBRSxnQkFBZ0IsYUFBYTtBQUVyQyxRQUFNLFNBQVMsT0FBTyxNQUFNLGNBQWM7QUFDMUMsTUFBSSxDQUFDLFFBQVE7QUFDWCxVQUFNLElBQUksTUFBTSx5Q0FBeUMsZ0JBQWdCO0FBQUEsRUFDM0U7QUFFQSxRQUFNLGdCQUFnQiwyQkFBTyxFQUFFLElBQUksRUFBRSxPQUFPLGFBQWE7QUFDekQsUUFBTSxtQkFBbUIsR0FBRyxPQUFPLFNBQVMsT0FBTyxTQUFTLE9BQU87QUFFbkUsU0FBTyxHQUFHLDBCQUEwQixpQkFBaUI7QUFDdkQsR0Fmb0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
