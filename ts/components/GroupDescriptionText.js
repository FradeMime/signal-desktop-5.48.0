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
var GroupDescriptionText_exports = {};
__export(GroupDescriptionText_exports, {
  GroupDescriptionText: () => GroupDescriptionText
});
module.exports = __toCommonJS(GroupDescriptionText_exports);
var import_react = __toESM(require("react"));
var import_AddNewLines = require("./conversation/AddNewLines");
var import_Emojify = require("./conversation/Emojify");
var import_Linkify = require("./conversation/Linkify");
const renderNonLink = /* @__PURE__ */ __name(({ key, text }) => /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
  key,
  text
}), "renderNonLink");
const renderNonNewLine = /* @__PURE__ */ __name(({ key, text }) => /* @__PURE__ */ import_react.default.createElement(import_Linkify.Linkify, {
  key,
  text,
  renderNonLink
}), "renderNonNewLine");
const GroupDescriptionText = /* @__PURE__ */ __name(({
  text
}) => /* @__PURE__ */ import_react.default.createElement(import_AddNewLines.AddNewLines, {
  text,
  renderNonNewLine
}), "GroupDescriptionText");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupDescriptionText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBEZXNjcmlwdGlvblRleHQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBSZW5kZXJUZXh0Q2FsbGJhY2tUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBBZGROZXdMaW5lcyB9IGZyb20gJy4vY29udmVyc2F0aW9uL0FkZE5ld0xpbmVzJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9FbW9qaWZ5JztcbmltcG9ydCB7IExpbmtpZnkgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9MaW5raWZ5JztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIHRleHQ6IHN0cmluZztcbn07XG5cbmNvbnN0IHJlbmRlck5vbkxpbms6IFJlbmRlclRleHRDYWxsYmFja1R5cGUgPSAoeyBrZXksIHRleHQgfSkgPT4gKFxuICA8RW1vamlmeSBrZXk9e2tleX0gdGV4dD17dGV4dH0gLz5cbik7XG5cbmNvbnN0IHJlbmRlck5vbk5ld0xpbmU6IFJlbmRlclRleHRDYWxsYmFja1R5cGUgPSAoeyBrZXksIHRleHQgfSkgPT4gKFxuICA8TGlua2lmeSBrZXk9e2tleX0gdGV4dD17dGV4dH0gcmVuZGVyTm9uTGluaz17cmVuZGVyTm9uTGlua30gLz5cbik7XG5cbmV4cG9ydCBjb25zdCBHcm91cERlc2NyaXB0aW9uVGV4dDogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIHRleHQsXG59KSA9PiA8QWRkTmV3TGluZXMgdGV4dD17dGV4dH0gcmVuZGVyTm9uTmV3TGluZT17cmVuZGVyTm9uTmV3TGluZX0gLz47XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBRWxCLHlCQUE0QjtBQUM1QixxQkFBd0I7QUFDeEIscUJBQXdCO0FBTXhCLE1BQU0sZ0JBQXdDLHdCQUFDLEVBQUUsS0FBSyxXQUNwRCxtREFBQztBQUFBLEVBQVE7QUFBQSxFQUFVO0FBQUEsQ0FBWSxHQURhO0FBSTlDLE1BQU0sbUJBQTJDLHdCQUFDLEVBQUUsS0FBSyxXQUN2RCxtREFBQztBQUFBLEVBQVE7QUFBQSxFQUFVO0FBQUEsRUFBWTtBQUFBLENBQThCLEdBRGQ7QUFJMUMsTUFBTSx1QkFBcUQsd0JBQUM7QUFBQSxFQUNqRTtBQUFBLE1BQ0ksbURBQUM7QUFBQSxFQUFZO0FBQUEsRUFBWTtBQUFBLENBQW9DLEdBRkQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
