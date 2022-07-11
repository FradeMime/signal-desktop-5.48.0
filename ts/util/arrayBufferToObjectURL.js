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
var arrayBufferToObjectURL_exports = {};
__export(arrayBufferToObjectURL_exports, {
  arrayBufferToObjectURL: () => arrayBufferToObjectURL
});
module.exports = __toCommonJS(arrayBufferToObjectURL_exports);
var import_is = __toESM(require("@sindresorhus/is"));
const arrayBufferToObjectURL = /* @__PURE__ */ __name(({
  data,
  type
}) => {
  if (!import_is.default.arrayBuffer(data)) {
    throw new TypeError("`data` must be an ArrayBuffer");
  }
  const blob = new Blob([data], { type });
  return URL.createObjectURL(blob);
}, "arrayBufferToObjectURL");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  arrayBufferToObjectURL
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJyYXlCdWZmZXJUb09iamVjdFVSTC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBpcyBmcm9tICdAc2luZHJlc29yaHVzL2lzJztcblxuaW1wb3J0IHR5cGUgeyBNSU1FVHlwZSB9IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuXG5leHBvcnQgY29uc3QgYXJyYXlCdWZmZXJUb09iamVjdFVSTCA9ICh7XG4gIGRhdGEsXG4gIHR5cGUsXG59OiB7XG4gIGRhdGE6IEFycmF5QnVmZmVyO1xuICB0eXBlOiBNSU1FVHlwZTtcbn0pOiBzdHJpbmcgPT4ge1xuICBpZiAoIWlzLmFycmF5QnVmZmVyKGRhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGRhdGFgIG11c3QgYmUgYW4gQXJyYXlCdWZmZXInKTtcbiAgfVxuXG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZSB9KTtcblxuICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQWU7QUFJUixNQUFNLHlCQUF5Qix3QkFBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLE1BSVk7QUFDWixNQUFJLENBQUMsa0JBQUcsWUFBWSxJQUFJLEdBQUc7QUFDekIsVUFBTSxJQUFJLFVBQVUsK0JBQStCO0FBQUEsRUFDckQ7QUFFQSxRQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxDQUFDO0FBRXRDLFNBQU8sSUFBSSxnQkFBZ0IsSUFBSTtBQUNqQyxHQWRzQzsiLAogICJuYW1lcyI6IFtdCn0K
