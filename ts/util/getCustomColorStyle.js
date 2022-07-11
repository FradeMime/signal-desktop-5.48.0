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
var getCustomColorStyle_exports = {};
__export(getCustomColorStyle_exports, {
  getCustomColorStyle: () => getCustomColorStyle
});
module.exports = __toCommonJS(getCustomColorStyle_exports);
var import_Util = require("../types/Util");
var import_getHSL = require("./getHSL");
var import_getUserTheme = require("../shims/getUserTheme");
function getCustomColorStyle(color, isQuote = false) {
  if (!color) {
    return void 0;
  }
  const extraQuoteProps = {};
  let adjustedLightness = 0;
  if (isQuote) {
    const theme = (0, import_getUserTheme.getUserTheme)();
    if (theme === import_Util.ThemeType.light) {
      adjustedLightness = 0.6;
    }
    if (theme === import_Util.ThemeType.dark) {
      adjustedLightness = -0.4;
    }
    extraQuoteProps.borderLeftColor = (0, import_getHSL.getHSL)(color.start);
  }
  if (!color.end) {
    return {
      ...extraQuoteProps,
      backgroundColor: (0, import_getHSL.getHSL)(color.start, adjustedLightness)
    };
  }
  return {
    ...extraQuoteProps,
    backgroundImage: `linear-gradient(${270 - (color.deg || 0)}deg, ${(0, import_getHSL.getHSL)(color.start, adjustedLightness)}, ${(0, import_getHSL.getHSL)(color.end, adjustedLightness)})`
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomColorStyle
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q3VzdG9tQ29sb3JTdHlsZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEN1c3RvbUNvbG9yVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGdldEhTTCB9IGZyb20gJy4vZ2V0SFNMJztcbmltcG9ydCB7IGdldFVzZXJUaGVtZSB9IGZyb20gJy4uL3NoaW1zL2dldFVzZXJUaGVtZSc7XG5cbnR5cGUgRXh0cmFRdW90ZVByb3BzVHlwZSA9IHtcbiAgYm9yZGVyTGVmdENvbG9yPzogc3RyaW5nO1xufTtcblxudHlwZSBCYWNrZ3JvdW5kUHJvcGVydHlUeXBlID1cbiAgfCB7IGJhY2tncm91bmRDb2xvcjogc3RyaW5nIH1cbiAgfCB7IGJhY2tncm91bmRJbWFnZTogc3RyaW5nIH1cbiAgfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXN0b21Db2xvclN0eWxlKFxuICBjb2xvcj86IEN1c3RvbUNvbG9yVHlwZSxcbiAgaXNRdW90ZSA9IGZhbHNlXG4pOiBCYWNrZ3JvdW5kUHJvcGVydHlUeXBlIHtcbiAgaWYgKCFjb2xvcikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBleHRyYVF1b3RlUHJvcHM6IEV4dHJhUXVvdGVQcm9wc1R5cGUgPSB7fTtcbiAgbGV0IGFkanVzdGVkTGlnaHRuZXNzID0gMDtcbiAgaWYgKGlzUXVvdGUpIHtcbiAgICBjb25zdCB0aGVtZSA9IGdldFVzZXJUaGVtZSgpO1xuICAgIGlmICh0aGVtZSA9PT0gVGhlbWVUeXBlLmxpZ2h0KSB7XG4gICAgICBhZGp1c3RlZExpZ2h0bmVzcyA9IDAuNjtcbiAgICB9XG4gICAgaWYgKHRoZW1lID09PSBUaGVtZVR5cGUuZGFyaykge1xuICAgICAgYWRqdXN0ZWRMaWdodG5lc3MgPSAtMC40O1xuICAgIH1cbiAgICBleHRyYVF1b3RlUHJvcHMuYm9yZGVyTGVmdENvbG9yID0gZ2V0SFNMKGNvbG9yLnN0YXJ0KTtcbiAgfVxuXG4gIGlmICghY29sb3IuZW5kKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmV4dHJhUXVvdGVQcm9wcyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogZ2V0SFNMKGNvbG9yLnN0YXJ0LCBhZGp1c3RlZExpZ2h0bmVzcyksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uZXh0cmFRdW90ZVByb3BzLFxuICAgIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudCgkezI3MCAtIChjb2xvci5kZWcgfHwgMCl9ZGVnLCAke2dldEhTTChcbiAgICAgIGNvbG9yLnN0YXJ0LFxuICAgICAgYWRqdXN0ZWRMaWdodG5lc3NcbiAgICApfSwgJHtnZXRIU0woY29sb3IuZW5kLCBhZGp1c3RlZExpZ2h0bmVzcyl9KWAsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsa0JBQTBCO0FBQzFCLG9CQUF1QjtBQUN2QiwwQkFBNkI7QUFXdEIsNkJBQ0wsT0FDQSxVQUFVLE9BQ2M7QUFDeEIsTUFBSSxDQUFDLE9BQU87QUFDVixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sa0JBQXVDLENBQUM7QUFDOUMsTUFBSSxvQkFBb0I7QUFDeEIsTUFBSSxTQUFTO0FBQ1gsVUFBTSxRQUFRLHNDQUFhO0FBQzNCLFFBQUksVUFBVSxzQkFBVSxPQUFPO0FBQzdCLDBCQUFvQjtBQUFBLElBQ3RCO0FBQ0EsUUFBSSxVQUFVLHNCQUFVLE1BQU07QUFDNUIsMEJBQW9CO0FBQUEsSUFDdEI7QUFDQSxvQkFBZ0Isa0JBQWtCLDBCQUFPLE1BQU0sS0FBSztBQUFBLEVBQ3REO0FBRUEsTUFBSSxDQUFDLE1BQU0sS0FBSztBQUNkLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxpQkFBaUIsMEJBQU8sTUFBTSxPQUFPLGlCQUFpQjtBQUFBLElBQ3hEO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxPQUNGO0FBQUEsSUFDSCxpQkFBaUIsbUJBQW1CLE1BQU8sT0FBTSxPQUFPLFVBQVUsMEJBQ2hFLE1BQU0sT0FDTixpQkFDRixNQUFNLDBCQUFPLE1BQU0sS0FBSyxpQkFBaUI7QUFBQSxFQUMzQztBQUNGO0FBbkNnQiIsCiAgIm5hbWVzIjogW10KfQo=
