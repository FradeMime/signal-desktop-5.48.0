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
var AvatarColorPicker_stories_exports = {};
__export(AvatarColorPicker_stories_exports, {
  Default: () => Default,
  Selected: () => Selected,
  default: () => AvatarColorPicker_stories_default
});
module.exports = __toCommonJS(AvatarColorPicker_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_AvatarColorPicker = require("./AvatarColorPicker");
var import_Colors = require("../types/Colors");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  onColorSelected: (0, import_addon_actions.action)("onColorSelected"),
  selectedColor: overrideProps.selectedColor
}), "createProps");
var AvatarColorPicker_stories_default = {
  title: "Components/AvatarColorPicker"
};
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarColorPicker.AvatarColorPicker, {
  ...createProps()
}), "Default");
const Selected = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarColorPicker.AvatarColorPicker, {
  ...createProps({
    selectedColor: import_Colors.AvatarColors[7]
  })
}), "Selected");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  Selected
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyQ29sb3JQaWNrZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQXZhdGFyQ29sb3JQaWNrZXInO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JQaWNrZXIgfSBmcm9tICcuL0F2YXRhckNvbG9yUGlja2VyJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGkxOG4sXG4gIG9uQ29sb3JTZWxlY3RlZDogYWN0aW9uKCdvbkNvbG9yU2VsZWN0ZWQnKSxcbiAgc2VsZWN0ZWRDb2xvcjogb3ZlcnJpZGVQcm9wcy5zZWxlY3RlZENvbG9yLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0F2YXRhckNvbG9yUGlja2VyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhckNvbG9yUGlja2VyIHsuLi5jcmVhdGVQcm9wcygpfSAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhckNvbG9yUGlja2VyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIHNlbGVjdGVkQ29sb3I6IEF2YXRhckNvbG9yc1s3XSxcbiAgICB9KX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwyQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUd2QiwrQkFBa0M7QUFDbEMsb0JBQTZCO0FBRTdCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFO0FBQUEsRUFDQSxpQkFBaUIsaUNBQU8saUJBQWlCO0FBQUEsRUFDekMsZUFBZSxjQUFjO0FBQy9CLElBSm9CO0FBTXBCLElBQU8sb0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sVUFBVSw2QkFDckIsbURBQUM7QUFBQSxLQUFzQixZQUFZO0FBQUEsQ0FBRyxHQURqQjtBQUloQixNQUFNLFdBQVcsNkJBQ3RCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxlQUFlLDJCQUFhO0FBQUEsRUFDOUIsQ0FBQztBQUFBLENBQ0gsR0FMc0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
