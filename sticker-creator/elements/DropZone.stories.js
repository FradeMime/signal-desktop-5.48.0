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
var DropZone_stories_exports = {};
__export(DropZone_stories_exports, {
  _DropZone: () => _DropZone,
  default: () => DropZone_stories_default
});
module.exports = __toCommonJS(DropZone_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_DropZone = require("./DropZone");
var DropZone_stories_default = {
  title: "Sticker Creator/elements"
};
const _DropZone = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_DropZone.DropZone, {
    label: "This is the label",
    onDrop: (0, import_addon_actions.action)("onDrop")
  });
}, "_DropZone");
_DropZone.story = {
  name: "DropZone"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _DropZone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRHJvcFpvbmUuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBEcm9wWm9uZSB9IGZyb20gJy4vRHJvcFpvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfRHJvcFpvbmUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPERyb3Bab25lIGxhYmVsPVwiVGhpcyBpcyB0aGUgbGFiZWxcIiBvbkRyb3A9e2FjdGlvbignb25Ecm9wJyl9IC8+O1xufTtcblxuX0Ryb3Bab25lLnN0b3J5ID0ge1xuICBuYW1lOiAnRHJvcFpvbmUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2QixzQkFBeUI7QUFFekIsSUFBTywyQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxTQUFPLG9DQUFDO0FBQUEsSUFBUyxPQUFNO0FBQUEsSUFBb0IsUUFBUSxpQ0FBTyxRQUFRO0FBQUEsR0FBRztBQUN2RSxHQUZ5QjtBQUl6QixVQUFVLFFBQVE7QUFBQSxFQUNoQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
