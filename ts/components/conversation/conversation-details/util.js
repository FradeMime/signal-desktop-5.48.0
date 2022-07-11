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
var util_exports = {};
__export(util_exports, {
  RequestState: () => RequestState,
  bemGenerator: () => bemGenerator
});
module.exports = __toCommonJS(util_exports);
var import_classnames = __toESM(require("classnames"));
var RequestState = /* @__PURE__ */ ((RequestState2) => {
  RequestState2[RequestState2["Inactive"] = 0] = "Inactive";
  RequestState2[RequestState2["InactiveWithError"] = 1] = "InactiveWithError";
  RequestState2[RequestState2["Active"] = 2] = "Active";
  return RequestState2;
})(RequestState || {});
const bemGenerator = /* @__PURE__ */ __name((block) => (element, modifier) => {
  const base = `${block}__${element}`;
  const classes = [base];
  let conditionals = {};
  if (modifier) {
    if (typeof modifier === "string") {
      classes.push(`${base}--${modifier}`);
    } else {
      conditionals = Object.keys(modifier).reduce((acc, key) => ({
        ...acc,
        [`${base}--${key}`]: modifier[key]
      }), {});
    }
  }
  return (0, import_classnames.default)(classes, conditionals);
}, "bemGenerator");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RequestState,
  bemGenerator
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGVudW0gUmVxdWVzdFN0YXRlIHtcbiAgSW5hY3RpdmUsXG4gIEluYWN0aXZlV2l0aEVycm9yLFxuICBBY3RpdmUsXG59XG5cbmV4cG9ydCBjb25zdCBiZW1HZW5lcmF0b3IgPVxuICAoYmxvY2s6IHN0cmluZykgPT5cbiAgKGVsZW1lbnQ6IHN0cmluZywgbW9kaWZpZXI/OiBzdHJpbmcgfCBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPik6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgYmFzZSA9IGAke2Jsb2NrfV9fJHtlbGVtZW50fWA7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtiYXNlXTtcblxuICAgIGxldCBjb25kaXRpb25hbHM6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0ge307XG5cbiAgICBpZiAobW9kaWZpZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgJHtiYXNlfS0tJHttb2RpZmllcn1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmRpdGlvbmFscyA9IE9iamVjdC5rZXlzKG1vZGlmaWVyKS5yZWR1Y2UoXG4gICAgICAgICAgKGFjYywga2V5KSA9PiAoe1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW2Ake2Jhc2V9LS0ke2tleX1gXTogbW9kaWZpZXJba2V5XSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbGFzc05hbWVzKGNsYXNzZXMsIGNvbmRpdGlvbmFscyk7XG4gIH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx3QkFBdUI7QUFFaEIsSUFBSyxlQUFMLGtCQUFLLGtCQUFMO0FBQ0w7QUFDQTtBQUNBO0FBSFU7QUFBQTtBQU1MLE1BQU0sZUFDWCx3QkFBQyxVQUNELENBQUMsU0FBaUIsYUFBd0Q7QUFDeEUsUUFBTSxPQUFPLEdBQUcsVUFBVTtBQUMxQixRQUFNLFVBQVUsQ0FBQyxJQUFJO0FBRXJCLE1BQUksZUFBd0MsQ0FBQztBQUU3QyxNQUFJLFVBQVU7QUFDWixRQUFJLE9BQU8sYUFBYSxVQUFVO0FBQ2hDLGNBQVEsS0FBSyxHQUFHLFNBQVMsVUFBVTtBQUFBLElBQ3JDLE9BQU87QUFDTCxxQkFBZSxPQUFPLEtBQUssUUFBUSxFQUFFLE9BQ25DLENBQUMsS0FBSyxRQUFTO0FBQUEsV0FDVjtBQUFBLFNBQ0YsR0FBRyxTQUFTLFFBQVEsU0FBUztBQUFBLE1BQ2hDLElBQ0EsQ0FBQyxDQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLCtCQUFXLFNBQVMsWUFBWTtBQUN6QyxHQXRCQTsiLAogICJuYW1lcyI6IFtdCn0K
