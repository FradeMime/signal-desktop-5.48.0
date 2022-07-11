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
var IdenticonSVG_stories_exports = {};
__export(IdenticonSVG_stories_exports, {
  AllColors: () => AllColors,
  default: () => IdenticonSVG_stories_default
});
module.exports = __toCommonJS(IdenticonSVG_stories_exports);
var import_react = __toESM(require("react"));
var import_IdenticonSVG = require("./IdenticonSVG");
var import_Colors = require("../types/Colors");
var IdenticonSVG_stories_default = {
  title: "Components/IdenticonSVG"
};
const AllColors = /* @__PURE__ */ __name(() => {
  const stories = [];
  import_Colors.AvatarColorMap.forEach((value) => stories.push(/* @__PURE__ */ import_react.default.createElement(import_IdenticonSVG.IdenticonSVG, {
    backgroundColor: value.bg,
    content: "HI",
    foregroundColor: value.fg
  })));
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, stories);
}, "AllColors");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllColors
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSWRlbnRpY29uU1ZHLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IElkZW50aWNvblNWRyB9IGZyb20gJy4vSWRlbnRpY29uU1ZHJztcbmltcG9ydCB7IEF2YXRhckNvbG9yTWFwIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvSWRlbnRpY29uU1ZHJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBbGxDb2xvcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBzdG9yaWVzOiBBcnJheTxKU1guRWxlbWVudD4gPSBbXTtcblxuICBBdmF0YXJDb2xvck1hcC5mb3JFYWNoKHZhbHVlID0+XG4gICAgc3Rvcmllcy5wdXNoKFxuICAgICAgPElkZW50aWNvblNWR1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e3ZhbHVlLmJnfVxuICAgICAgICBjb250ZW50PVwiSElcIlxuICAgICAgICBmb3JlZ3JvdW5kQ29sb3I9e3ZhbHVlLmZnfVxuICAgICAgLz5cbiAgICApXG4gICk7XG5cbiAgcmV0dXJuIDw+e3N0b3JpZXN9PC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwwQkFBNkI7QUFDN0Isb0JBQStCO0FBRS9CLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sWUFBWSw2QkFBbUI7QUFDMUMsUUFBTSxVQUE4QixDQUFDO0FBRXJDLCtCQUFlLFFBQVEsV0FDckIsUUFBUSxLQUNOLG1EQUFDO0FBQUEsSUFDQyxpQkFBaUIsTUFBTTtBQUFBLElBQ3ZCLFNBQVE7QUFBQSxJQUNSLGlCQUFpQixNQUFNO0FBQUEsR0FDekIsQ0FDRixDQUNGO0FBRUEsU0FBTyx3RkFBRyxPQUFRO0FBQ3BCLEdBZHlCOyIsCiAgIm5hbWVzIjogW10KfQo=
