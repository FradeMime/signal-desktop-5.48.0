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
var AvatarPreview_stories_exports = {};
__export(AvatarPreview_stories_exports, {
  NoStateGroup: () => NoStateGroup,
  NoStateGroupUploadMe: () => NoStateGroupUploadMe,
  NoStatePersonal: () => NoStatePersonal,
  Path: () => Path,
  Style: () => Style,
  Value: () => Value,
  ValuePath: () => ValuePath,
  default: () => AvatarPreview_stories_default
});
module.exports = __toCommonJS(AvatarPreview_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_AvatarPreview = require("./AvatarPreview");
var import_Colors = require("../types/Colors");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const TEST_IMAGE = new Uint8Array((0, import_lodash.chunk)("89504e470d0a1a0a0000000d4948445200000008000000080103000000fec12cc800000006504c5445ff00ff00ff000c82e9800000001849444154085b633061a8638863a867f8c720c760c12000001a4302f4d81dd9870000000049454e44ae426082", 2).map((bytePair) => parseInt(bytePair.join(""), 16)));
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarColor: overrideProps.avatarColor,
  avatarPath: overrideProps.avatarPath,
  avatarValue: overrideProps.avatarValue,
  conversationTitle: overrideProps.conversationTitle,
  i18n,
  isEditable: Boolean(overrideProps.isEditable),
  isGroup: Boolean(overrideProps.isGroup),
  onAvatarLoaded: (0, import_addon_actions.action)("onAvatarLoaded"),
  onClear: (0, import_addon_actions.action)("onClear"),
  onClick: (0, import_addon_actions.action)("onClick"),
  style: overrideProps.style
}), "createProps");
var AvatarPreview_stories_default = {
  title: "Components/AvatarPreview"
};
const NoStatePersonal = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({
    avatarColor: import_Colors.AvatarColors[0],
    conversationTitle: "Just Testing"
  })
}), "NoStatePersonal");
NoStatePersonal.story = {
  name: "No state (personal)"
};
const NoStateGroup = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({
    avatarColor: import_Colors.AvatarColors[1],
    isGroup: true
  })
}), "NoStateGroup");
NoStateGroup.story = {
  name: "No state (group)"
};
const NoStateGroupUploadMe = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({
    avatarColor: import_Colors.AvatarColors[1],
    isEditable: true,
    isGroup: true
  })
}), "NoStateGroupUploadMe");
NoStateGroupUploadMe.story = {
  name: "No state (group) + upload me"
};
const Value = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({ avatarValue: TEST_IMAGE })
}), "Value");
Value.story = {
  name: "value"
};
const Path = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({ avatarPath: "/fixtures/kitten-3-64-64.jpg" })
}), "Path");
Path.story = {
  name: "path"
};
const ValuePath = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({
    avatarPath: "/fixtures/kitten-3-64-64.jpg",
    avatarValue: TEST_IMAGE
  })
}), "ValuePath");
ValuePath.story = {
  name: "value & path"
};
const Style = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
  ...createProps({
    avatarValue: TEST_IMAGE,
    style: { height: 100, width: 100 }
  })
}), "Style");
Style.story = {
  name: "style"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NoStateGroup,
  NoStateGroupUploadMe,
  NoStatePersonal,
  Path,
  Style,
  Value,
  ValuePath
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyUHJldmlldy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY2h1bmsgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQXZhdGFyUHJldmlldyc7XG5pbXBvcnQgeyBBdmF0YXJQcmV2aWV3IH0gZnJvbSAnLi9BdmF0YXJQcmV2aWV3JztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgVEVTVF9JTUFHRSA9IG5ldyBVaW50OEFycmF5KFxuICBjaHVuayhcbiAgICAnODk1MDRlNDcwZDBhMWEwYTAwMDAwMDBkNDk0ODQ0NTIwMDAwMDAwODAwMDAwMDA4MDEwMzAwMDAwMGZlYzEyY2M4MDAwMDAwMDY1MDRjNTQ0NWZmMDBmZjAwZmYwMDBjODJlOTgwMDAwMDAwMTg0OTQ0NDE1NDA4NWI2MzMwNjFhODYzODg2M2E4NjdmOGM3MjBjNzYwYzEyMDAwMDAxYTQzMDJmNGQ4MWRkOTg3MDAwMDAwMDA0OTQ1NGU0NGFlNDI2MDgyJyxcbiAgICAyXG4gICkubWFwKGJ5dGVQYWlyID0+IHBhcnNlSW50KGJ5dGVQYWlyLmpvaW4oJycpLCAxNikpXG4pO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBhdmF0YXJDb2xvcjogb3ZlcnJpZGVQcm9wcy5hdmF0YXJDb2xvcixcbiAgYXZhdGFyUGF0aDogb3ZlcnJpZGVQcm9wcy5hdmF0YXJQYXRoLFxuICBhdmF0YXJWYWx1ZTogb3ZlcnJpZGVQcm9wcy5hdmF0YXJWYWx1ZSxcbiAgY29udmVyc2F0aW9uVGl0bGU6IG92ZXJyaWRlUHJvcHMuY29udmVyc2F0aW9uVGl0bGUsXG4gIGkxOG4sXG4gIGlzRWRpdGFibGU6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc0VkaXRhYmxlKSxcbiAgaXNHcm91cDogQm9vbGVhbihvdmVycmlkZVByb3BzLmlzR3JvdXApLFxuICBvbkF2YXRhckxvYWRlZDogYWN0aW9uKCdvbkF2YXRhckxvYWRlZCcpLFxuICBvbkNsZWFyOiBhY3Rpb24oJ29uQ2xlYXInKSxcbiAgb25DbGljazogYWN0aW9uKCdvbkNsaWNrJyksXG4gIHN0eWxlOiBvdmVycmlkZVByb3BzLnN0eWxlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0F2YXRhclByZXZpZXcnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vU3RhdGVQZXJzb25hbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJQcmV2aWV3XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGF2YXRhckNvbG9yOiBBdmF0YXJDb2xvcnNbMF0sXG4gICAgICBjb252ZXJzYXRpb25UaXRsZTogJ0p1c3QgVGVzdGluZycsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Ob1N0YXRlUGVyc29uYWwuc3RvcnkgPSB7XG4gIG5hbWU6ICdObyBzdGF0ZSAocGVyc29uYWwpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb1N0YXRlR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QXZhdGFyUHJldmlld1xuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhdmF0YXJDb2xvcjogQXZhdGFyQ29sb3JzWzFdLFxuICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbk5vU3RhdGVHcm91cC5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIHN0YXRlIChncm91cCknLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vU3RhdGVHcm91cFVwbG9hZE1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhclByZXZpZXdcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgYXZhdGFyQ29sb3I6IEF2YXRhckNvbG9yc1sxXSxcbiAgICAgIGlzRWRpdGFibGU6IHRydWUsXG4gICAgICBpc0dyb3VwOiB0cnVlLFxuICAgIH0pfVxuICAvPlxuKTtcblxuTm9TdGF0ZUdyb3VwVXBsb2FkTWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdObyBzdGF0ZSAoZ3JvdXApICsgdXBsb2FkIG1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBWYWx1ZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJQcmV2aWV3IHsuLi5jcmVhdGVQcm9wcyh7IGF2YXRhclZhbHVlOiBURVNUX0lNQUdFIH0pfSAvPlxuKTtcblxuVmFsdWUuc3RvcnkgPSB7XG4gIG5hbWU6ICd2YWx1ZScsXG59O1xuXG5leHBvcnQgY29uc3QgUGF0aCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJQcmV2aWV3XG4gICAgey4uLmNyZWF0ZVByb3BzKHsgYXZhdGFyUGF0aDogJy9maXh0dXJlcy9raXR0ZW4tMy02NC02NC5qcGcnIH0pfVxuICAvPlxuKTtcblxuUGF0aC5zdG9yeSA9IHtcbiAgbmFtZTogJ3BhdGgnLFxufTtcblxuZXhwb3J0IGNvbnN0IFZhbHVlUGF0aCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJQcmV2aWV3XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTMtNjQtNjQuanBnJyxcbiAgICAgIGF2YXRhclZhbHVlOiBURVNUX0lNQUdFLFxuICAgIH0pfVxuICAvPlxuKTtcblxuVmFsdWVQYXRoLnN0b3J5ID0ge1xuICBuYW1lOiAndmFsdWUgJiBwYXRoJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJQcmV2aWV3XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGF2YXRhclZhbHVlOiBURVNUX0lNQUdFLFxuICAgICAgc3R5bGU6IHsgaGVpZ2h0OiAxMDAsIHdpZHRoOiAxMDAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cblN0eWxlLnN0b3J5ID0ge1xuICBuYW1lOiAnc3R5bGUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQixvQkFBc0I7QUFFdEIsMkJBQXVCO0FBR3ZCLDJCQUE4QjtBQUM5QixvQkFBNkI7QUFDN0IsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGFBQWEsSUFBSSxXQUNyQix5QkFDRSwwTUFDQSxDQUNGLEVBQUUsSUFBSSxjQUFZLFNBQVMsU0FBUyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FDbkQ7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRSxhQUFhLGNBQWM7QUFBQSxFQUMzQixZQUFZLGNBQWM7QUFBQSxFQUMxQixhQUFhLGNBQWM7QUFBQSxFQUMzQixtQkFBbUIsY0FBYztBQUFBLEVBQ2pDO0FBQUEsRUFDQSxZQUFZLFFBQVEsY0FBYyxVQUFVO0FBQUEsRUFDNUMsU0FBUyxRQUFRLGNBQWMsT0FBTztBQUFBLEVBQ3RDLGdCQUFnQixpQ0FBTyxnQkFBZ0I7QUFBQSxFQUN2QyxTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixPQUFPLGNBQWM7QUFDdkIsSUFab0I7QUFjcEIsSUFBTyxnQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxrQkFBa0IsNkJBQzdCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxhQUFhLDJCQUFhO0FBQUEsSUFDMUIsbUJBQW1CO0FBQUEsRUFDckIsQ0FBQztBQUFBLENBQ0gsR0FONkI7QUFTL0IsZ0JBQWdCLFFBQVE7QUFBQSxFQUN0QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGVBQWUsNkJBQzFCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxhQUFhLDJCQUFhO0FBQUEsSUFDMUIsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUFBLENBQ0gsR0FOMEI7QUFTNUIsYUFBYSxRQUFRO0FBQUEsRUFDbkIsTUFBTTtBQUNSO0FBRU8sTUFBTSx1QkFBdUIsNkJBQ2xDLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxhQUFhLDJCQUFhO0FBQUEsSUFDMUIsWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUFBLENBQ0gsR0FQa0M7QUFVcEMscUJBQXFCLFFBQVE7QUFBQSxFQUMzQixNQUFNO0FBQ1I7QUFFTyxNQUFNLFFBQVEsNkJBQ25CLG1EQUFDO0FBQUEsS0FBa0IsWUFBWSxFQUFFLGFBQWEsV0FBVyxDQUFDO0FBQUEsQ0FBRyxHQUQxQztBQUlyQixNQUFNLFFBQVE7QUFBQSxFQUNaLE1BQU07QUFDUjtBQUVPLE1BQU0sT0FBTyw2QkFDbEIsbURBQUM7QUFBQSxLQUNLLFlBQVksRUFBRSxZQUFZLCtCQUErQixDQUFDO0FBQUEsQ0FDaEUsR0FIa0I7QUFNcEIsS0FBSyxRQUFRO0FBQUEsRUFDWCxNQUFNO0FBQ1I7QUFFTyxNQUFNLFlBQVksNkJBQ3ZCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsRUFDZixDQUFDO0FBQUEsQ0FDSCxHQU51QjtBQVN6QixVQUFVLFFBQVE7QUFBQSxFQUNoQixNQUFNO0FBQ1I7QUFFTyxNQUFNLFFBQVEsNkJBQ25CLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixPQUFPLEVBQUUsUUFBUSxLQUFLLE9BQU8sSUFBSTtBQUFBLEVBQ25DLENBQUM7QUFBQSxDQUNILEdBTm1CO0FBU3JCLE1BQU0sUUFBUTtBQUFBLEVBQ1osTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
