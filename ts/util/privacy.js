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
var privacy_exports = {};
__export(privacy_exports, {
  APP_ROOT_PATH: () => APP_ROOT_PATH,
  _pathToRegExp: () => _pathToRegExp,
  _redactPath: () => _redactPath,
  addSensitivePath: () => addSensitivePath,
  redactAll: () => redactAll,
  redactGroupIds: () => redactGroupIds,
  redactPhoneNumbers: () => redactPhoneNumbers,
  redactUuids: () => redactUuids
});
module.exports = __toCommonJS(privacy_exports);
var import_is = __toESM(require("@sindresorhus/is"));
var import_path = require("path");
var import_fp = require("lodash/fp");
var import_lodash = require("lodash");
const APP_ROOT_PATH = (0, import_path.join)(__dirname, "..", "..");
const PHONE_NUMBER_PATTERN = /\+\d{7,12}(\d{3})/g;
const UUID_PATTERN = /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{9}([0-9A-F]{3})/gi;
const GROUP_ID_PATTERN = /(group\()([^)]+)(\))/g;
const GROUP_V2_ID_PATTERN = /(groupv2\()([^=)]+)(=?=?\))/g;
const REDACTION_PLACEHOLDER = "[REDACTED]";
const _redactPath = /* @__PURE__ */ __name((filePath) => {
  if (!import_is.default.string(filePath)) {
    throw new TypeError("'filePath' must be a string");
  }
  const filePathPattern = _pathToRegExp(filePath);
  return (text) => {
    if (!import_is.default.string(text)) {
      throw new TypeError("'text' must be a string");
    }
    if (!import_is.default.regExp(filePathPattern)) {
      return text;
    }
    return text.replace(filePathPattern, REDACTION_PLACEHOLDER);
  };
}, "_redactPath");
const _pathToRegExp = /* @__PURE__ */ __name((filePath) => {
  try {
    const pathWithNormalizedSlashes = filePath.replace(/\//g, "\\");
    const pathWithEscapedSlashes = filePath.replace(/\\/g, "\\\\");
    const urlEncodedPath = encodeURI(filePath);
    const patternString = [
      filePath,
      pathWithNormalizedSlashes,
      pathWithEscapedSlashes,
      urlEncodedPath
    ].map(import_lodash.escapeRegExp).join("|");
    return new RegExp(patternString, "g");
  } catch (error) {
    return void 0;
  }
}, "_pathToRegExp");
const redactPhoneNumbers = /* @__PURE__ */ __name((text) => {
  if (!import_is.default.string(text)) {
    throw new TypeError("'text' must be a string");
  }
  return text.replace(PHONE_NUMBER_PATTERN, `+${REDACTION_PLACEHOLDER}$1`);
}, "redactPhoneNumbers");
const redactUuids = /* @__PURE__ */ __name((text) => {
  if (!import_is.default.string(text)) {
    throw new TypeError("'text' must be a string");
  }
  return text.replace(UUID_PATTERN, `${REDACTION_PLACEHOLDER}$1`);
}, "redactUuids");
const redactGroupIds = /* @__PURE__ */ __name((text) => {
  if (!import_is.default.string(text)) {
    throw new TypeError("'text' must be a string");
  }
  return text.replace(GROUP_ID_PATTERN, (_, before, id, after) => `${before}${REDACTION_PLACEHOLDER}${removeNewlines(id).slice(-3)}${after}`).replace(GROUP_V2_ID_PATTERN, (_, before, id, after) => `${before}${REDACTION_PLACEHOLDER}${removeNewlines(id).slice(-3)}${after}`);
}, "redactGroupIds");
const createRedactSensitivePaths = /* @__PURE__ */ __name((paths) => {
  return (0, import_fp.compose)(paths.map((filePath) => _redactPath(filePath)));
}, "createRedactSensitivePaths");
const sensitivePaths = [];
let redactSensitivePaths = /* @__PURE__ */ __name((text) => text, "redactSensitivePaths");
const addSensitivePath = /* @__PURE__ */ __name((filePath) => {
  sensitivePaths.push(filePath);
  redactSensitivePaths = createRedactSensitivePaths(sensitivePaths);
}, "addSensitivePath");
addSensitivePath(APP_ROOT_PATH);
const redactAll = (0, import_fp.compose)((text) => redactSensitivePaths(text), redactGroupIds, redactPhoneNumbers, redactUuids);
const removeNewlines = /* @__PURE__ */ __name((text) => text.replace(/\r?\n|\r/g, ""), "removeNewlines");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  APP_ROOT_PATH,
  _pathToRegExp,
  _redactPath,
  addSensitivePath,
  redactAll,
  redactGroupIds,
  redactPhoneNumbers,
  redactUuids
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJpdmFjeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8qIGVzbGludC1lbnYgbm9kZSAqL1xuXG5pbXBvcnQgaXMgZnJvbSAnQHNpbmRyZXNvcmh1cy9pcyc7XG5pbXBvcnQgeyBqb2luIGFzIHBhdGhKb2luIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tICdsb2Rhc2gvZnAnO1xuaW1wb3J0IHsgZXNjYXBlUmVnRXhwIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IEFQUF9ST09UX1BBVEggPSBwYXRoSm9pbihfX2Rpcm5hbWUsICcuLicsICcuLicpO1xuXG5jb25zdCBQSE9ORV9OVU1CRVJfUEFUVEVSTiA9IC9cXCtcXGR7NywxMn0oXFxkezN9KS9nO1xuY29uc3QgVVVJRF9QQVRURVJOID1cbiAgL1swLTlBLUZdezh9LVswLTlBLUZdezR9LTRbMC05QS1GXXszfS1bODlBQl1bMC05QS1GXXszfS1bMC05QS1GXXs5fShbMC05QS1GXXszfSkvZ2k7XG5jb25zdCBHUk9VUF9JRF9QQVRURVJOID0gLyhncm91cFxcKCkoW14pXSspKFxcKSkvZztcbmNvbnN0IEdST1VQX1YyX0lEX1BBVFRFUk4gPSAvKGdyb3VwdjJcXCgpKFtePSldKykoPT89P1xcKSkvZztcbmNvbnN0IFJFREFDVElPTl9QTEFDRUhPTERFUiA9ICdbUkVEQUNURURdJztcblxuZXhwb3J0IHR5cGUgUmVkYWN0RnVuY3Rpb24gPSAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xuXG5leHBvcnQgY29uc3QgX3JlZGFjdFBhdGggPSAoZmlsZVBhdGg6IHN0cmluZyk6IFJlZGFjdEZ1bmN0aW9uID0+IHtcbiAgaWYgKCFpcy5zdHJpbmcoZmlsZVBhdGgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmaWxlUGF0aCcgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgfVxuXG4gIGNvbnN0IGZpbGVQYXRoUGF0dGVybiA9IF9wYXRoVG9SZWdFeHAoZmlsZVBhdGgpO1xuXG4gIHJldHVybiAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIWlzLnN0cmluZyh0ZXh0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIid0ZXh0JyBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICghaXMucmVnRXhwKGZpbGVQYXRoUGF0dGVybikpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoZmlsZVBhdGhQYXR0ZXJuLCBSRURBQ1RJT05fUExBQ0VIT0xERVIpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IF9wYXRoVG9SZWdFeHAgPSAoZmlsZVBhdGg6IHN0cmluZyk6IFJlZ0V4cCB8IHVuZGVmaW5lZCA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aFdpdGhOb3JtYWxpemVkU2xhc2hlcyA9IGZpbGVQYXRoLnJlcGxhY2UoL1xcLy9nLCAnXFxcXCcpO1xuICAgIGNvbnN0IHBhdGhXaXRoRXNjYXBlZFNsYXNoZXMgPSBmaWxlUGF0aC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpO1xuICAgIGNvbnN0IHVybEVuY29kZWRQYXRoID0gZW5jb2RlVVJJKGZpbGVQYXRoKTtcbiAgICAvLyBTYWZlIGBTdHJpbmc6OnJlcGxhY2VBbGxgOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2lzc3Vlcy8xMDg0I2lzc3VlY29tbWVudC04NjY5ODc4NlxuICAgIGNvbnN0IHBhdHRlcm5TdHJpbmcgPSBbXG4gICAgICBmaWxlUGF0aCxcbiAgICAgIHBhdGhXaXRoTm9ybWFsaXplZFNsYXNoZXMsXG4gICAgICBwYXRoV2l0aEVzY2FwZWRTbGFzaGVzLFxuICAgICAgdXJsRW5jb2RlZFBhdGgsXG4gICAgXVxuICAgICAgLm1hcChlc2NhcGVSZWdFeHApXG4gICAgICAuam9pbignfCcpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm5TdHJpbmcsICdnJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLy8gUHVibGljIEFQSVxuZXhwb3J0IGNvbnN0IHJlZGFjdFBob25lTnVtYmVycyA9ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIWlzLnN0cmluZyh0ZXh0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIndGV4dCcgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgfVxuXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoUEhPTkVfTlVNQkVSX1BBVFRFUk4sIGArJHtSRURBQ1RJT05fUExBQ0VIT0xERVJ9JDFgKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWRhY3RVdWlkcyA9ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIWlzLnN0cmluZyh0ZXh0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIndGV4dCcgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgfVxuXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoVVVJRF9QQVRURVJOLCBgJHtSRURBQ1RJT05fUExBQ0VIT0xERVJ9JDFgKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWRhY3RHcm91cElkcyA9ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIWlzLnN0cmluZyh0ZXh0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIndGV4dCcgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgfVxuXG4gIHJldHVybiB0ZXh0XG4gICAgLnJlcGxhY2UoXG4gICAgICBHUk9VUF9JRF9QQVRURVJOLFxuICAgICAgKF8sIGJlZm9yZSwgaWQsIGFmdGVyKSA9PlxuICAgICAgICBgJHtiZWZvcmV9JHtSRURBQ1RJT05fUExBQ0VIT0xERVJ9JHtyZW1vdmVOZXdsaW5lcyhpZCkuc2xpY2UoXG4gICAgICAgICAgLTNcbiAgICAgICAgKX0ke2FmdGVyfWBcbiAgICApXG4gICAgLnJlcGxhY2UoXG4gICAgICBHUk9VUF9WMl9JRF9QQVRURVJOLFxuICAgICAgKF8sIGJlZm9yZSwgaWQsIGFmdGVyKSA9PlxuICAgICAgICBgJHtiZWZvcmV9JHtSRURBQ1RJT05fUExBQ0VIT0xERVJ9JHtyZW1vdmVOZXdsaW5lcyhpZCkuc2xpY2UoXG4gICAgICAgICAgLTNcbiAgICAgICAgKX0ke2FmdGVyfWBcbiAgICApO1xufTtcblxuY29uc3QgY3JlYXRlUmVkYWN0U2Vuc2l0aXZlUGF0aHMgPSAoXG4gIHBhdGhzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbik6IFJlZGFjdEZ1bmN0aW9uID0+IHtcbiAgcmV0dXJuIGNvbXBvc2UocGF0aHMubWFwKGZpbGVQYXRoID0+IF9yZWRhY3RQYXRoKGZpbGVQYXRoKSkpO1xufTtcblxuY29uc3Qgc2Vuc2l0aXZlUGF0aHM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxubGV0IHJlZGFjdFNlbnNpdGl2ZVBhdGhzOiBSZWRhY3RGdW5jdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+IHRleHQ7XG5cbmV4cG9ydCBjb25zdCBhZGRTZW5zaXRpdmVQYXRoID0gKGZpbGVQYXRoOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgc2Vuc2l0aXZlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gIHJlZGFjdFNlbnNpdGl2ZVBhdGhzID0gY3JlYXRlUmVkYWN0U2Vuc2l0aXZlUGF0aHMoc2Vuc2l0aXZlUGF0aHMpO1xufTtcblxuYWRkU2Vuc2l0aXZlUGF0aChBUFBfUk9PVF9QQVRIKTtcblxuZXhwb3J0IGNvbnN0IHJlZGFjdEFsbDogUmVkYWN0RnVuY3Rpb24gPSBjb21wb3NlKFxuICAodGV4dDogc3RyaW5nKSA9PiByZWRhY3RTZW5zaXRpdmVQYXRocyh0ZXh0KSxcbiAgcmVkYWN0R3JvdXBJZHMsXG4gIHJlZGFjdFBob25lTnVtYmVycyxcbiAgcmVkYWN0VXVpZHNcbik7XG5cbmNvbnN0IHJlbW92ZU5ld2xpbmVzOiBSZWRhY3RGdW5jdGlvbiA9IHRleHQgPT4gdGV4dC5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCAnJyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxnQkFBZTtBQUNmLGtCQUFpQztBQUVqQyxnQkFBd0I7QUFDeEIsb0JBQTZCO0FBRXRCLE1BQU0sZ0JBQWdCLHNCQUFTLFdBQVcsTUFBTSxJQUFJO0FBRTNELE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sZUFDSjtBQUNGLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sc0JBQXNCO0FBQzVCLE1BQU0sd0JBQXdCO0FBSXZCLE1BQU0sY0FBYyx3QkFBQyxhQUFxQztBQUMvRCxNQUFJLENBQUMsa0JBQUcsT0FBTyxRQUFRLEdBQUc7QUFDeEIsVUFBTSxJQUFJLFVBQVUsNkJBQTZCO0FBQUEsRUFDbkQ7QUFFQSxRQUFNLGtCQUFrQixjQUFjLFFBQVE7QUFFOUMsU0FBTyxDQUFDLFNBQXlCO0FBQy9CLFFBQUksQ0FBQyxrQkFBRyxPQUFPLElBQUksR0FBRztBQUNwQixZQUFNLElBQUksVUFBVSx5QkFBeUI7QUFBQSxJQUMvQztBQUVBLFFBQUksQ0FBQyxrQkFBRyxPQUFPLGVBQWUsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sS0FBSyxRQUFRLGlCQUFpQixxQkFBcUI7QUFBQSxFQUM1RDtBQUNGLEdBbEIyQjtBQW9CcEIsTUFBTSxnQkFBZ0Isd0JBQUMsYUFBeUM7QUFDckUsTUFBSTtBQUNGLFVBQU0sNEJBQTRCLFNBQVMsUUFBUSxPQUFPLElBQUk7QUFDOUQsVUFBTSx5QkFBeUIsU0FBUyxRQUFRLE9BQU8sTUFBTTtBQUM3RCxVQUFNLGlCQUFpQixVQUFVLFFBQVE7QUFHekMsVUFBTSxnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsRUFDRyxJQUFJLDBCQUFZLEVBQ2hCLEtBQUssR0FBRztBQUNYLFdBQU8sSUFBSSxPQUFPLGVBQWUsR0FBRztBQUFBLEVBQ3RDLFNBQVMsT0FBUDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQ0YsR0FuQjZCO0FBc0J0QixNQUFNLHFCQUFxQix3QkFBQyxTQUF5QjtBQUMxRCxNQUFJLENBQUMsa0JBQUcsT0FBTyxJQUFJLEdBQUc7QUFDcEIsVUFBTSxJQUFJLFVBQVUseUJBQXlCO0FBQUEsRUFDL0M7QUFFQSxTQUFPLEtBQUssUUFBUSxzQkFBc0IsSUFBSSx5QkFBeUI7QUFDekUsR0FOa0M7QUFRM0IsTUFBTSxjQUFjLHdCQUFDLFNBQXlCO0FBQ25ELE1BQUksQ0FBQyxrQkFBRyxPQUFPLElBQUksR0FBRztBQUNwQixVQUFNLElBQUksVUFBVSx5QkFBeUI7QUFBQSxFQUMvQztBQUVBLFNBQU8sS0FBSyxRQUFRLGNBQWMsR0FBRyx5QkFBeUI7QUFDaEUsR0FOMkI7QUFRcEIsTUFBTSxpQkFBaUIsd0JBQUMsU0FBeUI7QUFDdEQsTUFBSSxDQUFDLGtCQUFHLE9BQU8sSUFBSSxHQUFHO0FBQ3BCLFVBQU0sSUFBSSxVQUFVLHlCQUF5QjtBQUFBLEVBQy9DO0FBRUEsU0FBTyxLQUNKLFFBQ0Msa0JBQ0EsQ0FBQyxHQUFHLFFBQVEsSUFBSSxVQUNkLEdBQUcsU0FBUyx3QkFBd0IsZUFBZSxFQUFFLEVBQUUsTUFDckQsRUFDRixJQUFJLE9BQ1IsRUFDQyxRQUNDLHFCQUNBLENBQUMsR0FBRyxRQUFRLElBQUksVUFDZCxHQUFHLFNBQVMsd0JBQXdCLGVBQWUsRUFBRSxFQUFFLE1BQ3JELEVBQ0YsSUFBSSxPQUNSO0FBQ0osR0FwQjhCO0FBc0I5QixNQUFNLDZCQUE2Qix3QkFDakMsVUFDbUI7QUFDbkIsU0FBTyx1QkFBUSxNQUFNLElBQUksY0FBWSxZQUFZLFFBQVEsQ0FBQyxDQUFDO0FBQzdELEdBSm1DO0FBTW5DLE1BQU0saUJBQWdDLENBQUM7QUFFdkMsSUFBSSx1QkFBdUMsd0JBQUMsU0FBaUIsTUFBbEI7QUFFcEMsTUFBTSxtQkFBbUIsd0JBQUMsYUFBMkI7QUFDMUQsaUJBQWUsS0FBSyxRQUFRO0FBQzVCLHlCQUF1QiwyQkFBMkIsY0FBYztBQUNsRSxHQUhnQztBQUtoQyxpQkFBaUIsYUFBYTtBQUV2QixNQUFNLFlBQTRCLHVCQUN2QyxDQUFDLFNBQWlCLHFCQUFxQixJQUFJLEdBQzNDLGdCQUNBLG9CQUNBLFdBQ0Y7QUFFQSxNQUFNLGlCQUFpQyxpQ0FBUSxLQUFLLFFBQVEsYUFBYSxFQUFFLEdBQXBDOyIsCiAgIm5hbWVzIjogW10KfQo=
