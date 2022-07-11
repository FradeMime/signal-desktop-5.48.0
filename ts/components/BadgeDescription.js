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
var BadgeDescription_exports = {};
__export(BadgeDescription_exports, {
  BadgeDescription: () => BadgeDescription
});
module.exports = __toCommonJS(BadgeDescription_exports);
var import_react = __toESM(require("react"));
var import_ContactName = require("./conversation/ContactName");
function BadgeDescription({
  firstName,
  template,
  title
}) {
  const result = [];
  let lastIndex = 0;
  const matches = template.matchAll(/\{short_name\}/g);
  for (const match of matches) {
    const matchIndex = match.index || 0;
    result.push(template.slice(lastIndex, matchIndex));
    result.push(/* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      key: matchIndex,
      firstName,
      title,
      preferFirstName: true
    }));
    lastIndex = matchIndex + 12;
  }
  result.push(template.slice(lastIndex));
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, result);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeDescription
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VEZXNjcmlwdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdENoaWxkLCBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBCYWRnZURlc2NyaXB0aW9uKHtcbiAgZmlyc3ROYW1lLFxuICB0ZW1wbGF0ZSxcbiAgdGl0bGUsXG59OiBSZWFkb25seTx7XG4gIGZpcnN0TmFtZT86IHN0cmluZztcbiAgdGVtcGxhdGU6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn0+KTogUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgcmVzdWx0OiBBcnJheTxSZWFjdENoaWxkPiA9IFtdO1xuXG4gIGxldCBsYXN0SW5kZXggPSAwO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSB0ZW1wbGF0ZS5tYXRjaEFsbCgvXFx7c2hvcnRfbmFtZVxcfS9nKTtcbiAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSB7XG4gICAgY29uc3QgbWF0Y2hJbmRleCA9IG1hdGNoLmluZGV4IHx8IDA7XG5cbiAgICByZXN1bHQucHVzaCh0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgsIG1hdGNoSW5kZXgpKTtcblxuICAgIHJlc3VsdC5wdXNoKFxuICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgIGtleT17bWF0Y2hJbmRleH1cbiAgICAgICAgZmlyc3ROYW1lPXtmaXJzdE5hbWV9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgcHJlZmVyRmlyc3ROYW1lXG4gICAgICAvPlxuICAgICk7XG5cbiAgICBsYXN0SW5kZXggPSBtYXRjaEluZGV4ICsgMTI7XG4gIH1cblxuICByZXN1bHQucHVzaCh0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgpKTtcblxuICByZXR1cm4gPD57cmVzdWx0fTwvPjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIseUJBQTRCO0FBRXJCLDBCQUEwQjtBQUFBLEVBQy9CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUtnQjtBQUNoQixRQUFNLFNBQTRCLENBQUM7QUFFbkMsTUFBSSxZQUFZO0FBRWhCLFFBQU0sVUFBVSxTQUFTLFNBQVMsaUJBQWlCO0FBQ25ELGFBQVcsU0FBUyxTQUFTO0FBQzNCLFVBQU0sYUFBYSxNQUFNLFNBQVM7QUFFbEMsV0FBTyxLQUFLLFNBQVMsTUFBTSxXQUFXLFVBQVUsQ0FBQztBQUVqRCxXQUFPLEtBQ0wsbURBQUM7QUFBQSxNQUNDLEtBQUs7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0EsaUJBQWU7QUFBQSxLQUNqQixDQUNGO0FBRUEsZ0JBQVksYUFBYTtBQUFBLEVBQzNCO0FBRUEsU0FBTyxLQUFLLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFFckMsU0FBTyx3RkFBRyxNQUFPO0FBQ25CO0FBbENnQiIsCiAgIm5hbWVzIjogW10KfQo=
