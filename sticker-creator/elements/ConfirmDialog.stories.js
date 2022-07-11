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
var ConfirmDialog_stories_exports = {};
__export(ConfirmDialog_stories_exports, {
  _ConfirmDialog: () => _ConfirmDialog,
  default: () => ConfirmDialog_stories_default
});
module.exports = __toCommonJS(ConfirmDialog_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_StoryRow = require("./StoryRow");
var import_ConfirmDialog = require("./ConfirmDialog");
var ConfirmDialog_stories_default = {
  title: "Sticker Creator/elements"
};
const _ConfirmDialog = /* @__PURE__ */ __name(() => {
  const title = (0, import_addon_knobs.text)("title", "Foo bar banana baz?");
  const child = (0, import_addon_knobs.text)("text", "Yadda yadda yadda yadda yadda yadda foo bar banana baz.");
  const confirm = (0, import_addon_knobs.text)("confirm", "Upload");
  const cancel = (0, import_addon_knobs.text)("cancel", "Cancel");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_ConfirmDialog.ConfirmDialog, {
    ...{ title, confirm, cancel },
    onConfirm: (0, import_addon_actions.action)("onConfirm"),
    onCancel: (0, import_addon_actions.action)("onCancel")
  }, child));
}, "_ConfirmDialog");
_ConfirmDialog.story = {
  name: "ConfirmDialog"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ConfirmDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybURpYWxvZy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IFN0b3J5Um93IH0gZnJvbSAnLi9TdG9yeVJvdyc7XG5pbXBvcnQgeyBDb25maXJtRGlhbG9nIH0gZnJvbSAnLi9Db25maXJtRGlhbG9nJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ1N0aWNrZXIgQ3JlYXRvci9lbGVtZW50cycsXG59O1xuXG5leHBvcnQgY29uc3QgX0NvbmZpcm1EaWFsb2cgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB0aXRsZSA9IHRleHQoJ3RpdGxlJywgJ0ZvbyBiYXIgYmFuYW5hIGJhej8nKTtcbiAgY29uc3QgY2hpbGQgPSB0ZXh0KFxuICAgICd0ZXh0JyxcbiAgICAnWWFkZGEgeWFkZGEgeWFkZGEgeWFkZGEgeWFkZGEgeWFkZGEgZm9vIGJhciBiYW5hbmEgYmF6LidcbiAgKTtcbiAgY29uc3QgY29uZmlybSA9IHRleHQoJ2NvbmZpcm0nLCAnVXBsb2FkJyk7XG4gIGNvbnN0IGNhbmNlbCA9IHRleHQoJ2NhbmNlbCcsICdDYW5jZWwnKTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeVJvdz5cbiAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgIHsuLi57IHRpdGxlLCBjb25maXJtLCBjYW5jZWwgfX1cbiAgICAgICAgb25Db25maXJtPXthY3Rpb24oJ29uQ29uZmlybScpfVxuICAgICAgICBvbkNhbmNlbD17YWN0aW9uKCdvbkNhbmNlbCcpfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGR9XG4gICAgICA8L0NvbmZpcm1EaWFsb2c+XG4gICAgPC9TdG9yeVJvdz5cbiAgKTtcbn07XG5cbl9Db25maXJtRGlhbG9nLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29uZmlybURpYWxvZycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXFCO0FBQ3JCLDJCQUF1QjtBQUV2QixzQkFBeUI7QUFDekIsMkJBQThCO0FBRTlCLElBQU8sZ0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0saUJBQWlCLDZCQUFtQjtBQUMvQyxRQUFNLFFBQVEsNkJBQUssU0FBUyxxQkFBcUI7QUFDakQsUUFBTSxRQUFRLDZCQUNaLFFBQ0EseURBQ0Y7QUFDQSxRQUFNLFVBQVUsNkJBQUssV0FBVyxRQUFRO0FBQ3hDLFFBQU0sU0FBUyw2QkFBSyxVQUFVLFFBQVE7QUFFdEMsU0FDRSxvQ0FBQyxnQ0FDQyxvQ0FBQztBQUFBLE9BQ0ssRUFBRSxPQUFPLFNBQVMsT0FBTztBQUFBLElBQzdCLFdBQVcsaUNBQU8sV0FBVztBQUFBLElBQzdCLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEtBRTFCLEtBQ0gsQ0FDRjtBQUVKLEdBcEI4QjtBQXNCOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
