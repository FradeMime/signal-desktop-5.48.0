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
var ContactName_stories_exports = {};
__export(ContactName_stories_exports, {
  Colors: () => Colors,
  FirstNameAndTitleFirstNamePreferred: () => FirstNameAndTitleFirstNamePreferred,
  FirstNameAndTitleTitlePreferred: () => FirstNameAndTitleTitlePreferred,
  default: () => ContactName_stories_default
});
module.exports = __toCommonJS(ContactName_stories_exports);
var React = __toESM(require("react"));
var import_ContactName = require("./ContactName");
var import_Colors = require("../../types/Colors");
var ContactName_stories_default = {
  title: "Components/Conversation/ContactName"
};
const FirstNameAndTitleTitlePreferred = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
  firstName: "Ignored",
  title: "Someone \u{1F525} Somewhere"
}), "FirstNameAndTitleTitlePreferred");
FirstNameAndTitleTitlePreferred.story = {
  name: "First name and title; title preferred"
};
const FirstNameAndTitleFirstNamePreferred = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
  firstName: "Someone \u{1F525} Somewhere",
  title: "Ignored",
  preferFirstName: true
}), "FirstNameAndTitleFirstNamePreferred");
FirstNameAndTitleFirstNamePreferred.story = {
  name: "First name and title; first name preferred"
};
const Colors = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Colors.ContactNameColors.map((color) => /* @__PURE__ */ React.createElement("div", {
    key: color
  }, /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
    title: `Hello ${color}`,
    contactNameColor: color
  }))));
}, "Colors");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Colors,
  FirstNameAndTitleFirstNamePreferred,
  FirstNameAndTitleTitlePreferred
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdE5hbWUuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBDb250YWN0TmFtZUNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db250YWN0TmFtZScsXG59O1xuXG5leHBvcnQgY29uc3QgRmlyc3ROYW1lQW5kVGl0bGVUaXRsZVByZWZlcnJlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb250YWN0TmFtZSBmaXJzdE5hbWU9XCJJZ25vcmVkXCIgdGl0bGU9XCJTb21lb25lIFx1RDgzRFx1REQyNSBTb21ld2hlcmVcIiAvPlxuKTtcblxuRmlyc3ROYW1lQW5kVGl0bGVUaXRsZVByZWZlcnJlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0ZpcnN0IG5hbWUgYW5kIHRpdGxlOyB0aXRsZSBwcmVmZXJyZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEZpcnN0TmFtZUFuZFRpdGxlRmlyc3ROYW1lUHJlZmVycmVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRhY3ROYW1lXG4gICAgZmlyc3ROYW1lPVwiU29tZW9uZSBcdUQ4M0RcdUREMjUgU29tZXdoZXJlXCJcbiAgICB0aXRsZT1cIklnbm9yZWRcIlxuICAgIHByZWZlckZpcnN0TmFtZVxuICAvPlxuKTtcblxuRmlyc3ROYW1lQW5kVGl0bGVGaXJzdE5hbWVQcmVmZXJyZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdGaXJzdCBuYW1lIGFuZCB0aXRsZTsgZmlyc3QgbmFtZSBwcmVmZXJyZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbG9ycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtDb250YWN0TmFtZUNvbG9ycy5tYXAoY29sb3IgPT4gKFxuICAgICAgICA8ZGl2IGtleT17Y29sb3J9PlxuICAgICAgICAgIDxDb250YWN0TmFtZSB0aXRsZT17YEhlbGxvICR7Y29sb3J9YH0gY29udGFjdE5hbWVDb2xvcj17Y29sb3J9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHlCQUE0QjtBQUM1QixvQkFBa0M7QUFFbEMsSUFBTyw4QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxrQ0FBa0MsNkJBQzdDLG9DQUFDO0FBQUEsRUFBWSxXQUFVO0FBQUEsRUFBVSxPQUFNO0FBQUEsQ0FBdUIsR0FEakI7QUFJL0MsZ0NBQWdDLFFBQVE7QUFBQSxFQUN0QyxNQUFNO0FBQ1I7QUFFTyxNQUFNLHNDQUFzQyw2QkFDakQsb0NBQUM7QUFBQSxFQUNDLFdBQVU7QUFBQSxFQUNWLE9BQU07QUFBQSxFQUNOLGlCQUFlO0FBQUEsQ0FDakIsR0FMaUQ7QUFRbkQsb0NBQW9DLFFBQVE7QUFBQSxFQUMxQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFNBQ0UsMERBQ0csZ0NBQWtCLElBQUksV0FDckIsb0NBQUM7QUFBQSxJQUFJLEtBQUs7QUFBQSxLQUNSLG9DQUFDO0FBQUEsSUFBWSxPQUFPLFNBQVM7QUFBQSxJQUFTLGtCQUFrQjtBQUFBLEdBQU8sQ0FDakUsQ0FDRCxDQUNIO0FBRUosR0FWc0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
