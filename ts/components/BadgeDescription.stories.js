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
var BadgeDescription_stories_exports = {};
__export(BadgeDescription_stories_exports, {
  NameWithRtlOverrides: () => NameWithRtlOverrides,
  NormalName: () => NormalName,
  default: () => BadgeDescription_stories_default
});
module.exports = __toCommonJS(BadgeDescription_stories_exports);
var import_react = __toESM(require("react"));
var import_BadgeDescription = require("./BadgeDescription");
var BadgeDescription_stories_default = {
  title: "Components/BadgeDescription"
};
const NormalName = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDescription.BadgeDescription, {
  template: "{short_name} is here! Hello, {short_name}! {short_name}, I think you're great. This is not replaced: {not_replaced}",
  firstName: "Alice",
  title: "Should not be seen"
}), "NormalName");
NormalName.story = {
  name: "Normal name"
};
const NameWithRtlOverrides = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDescription.BadgeDescription, {
  template: "Hello, {short_name}! {short_name}, I think you're great.",
  title: "Flip-\u202Eflop"
}), "NameWithRtlOverrides");
NameWithRtlOverrides.story = {
  name: "Name with RTL overrides"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NameWithRtlOverrides,
  NormalName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VEZXNjcmlwdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBCYWRnZURlc2NyaXB0aW9uIH0gZnJvbSAnLi9CYWRnZURlc2NyaXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQmFkZ2VEZXNjcmlwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgTm9ybWFsTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCYWRnZURlc2NyaXB0aW9uXG4gICAgdGVtcGxhdGU9XCJ7c2hvcnRfbmFtZX0gaXMgaGVyZSEgSGVsbG8sIHtzaG9ydF9uYW1lfSEge3Nob3J0X25hbWV9LCBJIHRoaW5rIHlvdSdyZSBncmVhdC4gVGhpcyBpcyBub3QgcmVwbGFjZWQ6IHtub3RfcmVwbGFjZWR9XCJcbiAgICBmaXJzdE5hbWU9XCJBbGljZVwiXG4gICAgdGl0bGU9XCJTaG91bGQgbm90IGJlIHNlZW5cIlxuICAvPlxuKTtcblxuTm9ybWFsTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ05vcm1hbCBuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOYW1lV2l0aFJ0bE92ZXJyaWRlcyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCYWRnZURlc2NyaXB0aW9uXG4gICAgdGVtcGxhdGU9XCJIZWxsbywge3Nob3J0X25hbWV9ISB7c2hvcnRfbmFtZX0sIEkgdGhpbmsgeW91J3JlIGdyZWF0LlwiXG4gICAgdGl0bGU9eydGbGlwLVxcdTIwMmVmbG9wJ31cbiAgLz5cbik7XG5cbk5hbWVXaXRoUnRsT3ZlcnJpZGVzLnN0b3J5ID0ge1xuICBuYW1lOiAnTmFtZSB3aXRoIFJUTCBvdmVycmlkZXMnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDhCQUFpQztBQUVqQyxJQUFPLG1DQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGFBQWEsNkJBQ3hCLG1EQUFDO0FBQUEsRUFDQyxVQUFTO0FBQUEsRUFDVCxXQUFVO0FBQUEsRUFDVixPQUFNO0FBQUEsQ0FDUixHQUx3QjtBQVExQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHVCQUF1Qiw2QkFDbEMsbURBQUM7QUFBQSxFQUNDLFVBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxDQUNULEdBSmtDO0FBT3BDLHFCQUFxQixRQUFRO0FBQUEsRUFDM0IsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
