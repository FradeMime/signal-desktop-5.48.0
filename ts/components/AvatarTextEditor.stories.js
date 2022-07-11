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
var AvatarTextEditor_stories_exports = {};
__export(AvatarTextEditor_stories_exports, {
  Empty: () => Empty,
  WithData: () => WithData,
  WithWideCharacters: () => WithWideCharacters,
  default: () => AvatarTextEditor_stories_default
});
module.exports = __toCommonJS(AvatarTextEditor_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_AvatarTextEditor = require("./AvatarTextEditor");
var import_Colors = require("../types/Colors");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarData: overrideProps.avatarData,
  i18n,
  onCancel: (0, import_addon_actions.action)("onCancel"),
  onDone: (0, import_addon_actions.action)("onDone")
}), "createProps");
var AvatarTextEditor_stories_default = {
  title: "Components/AvatarTextEditor"
};
const Empty = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarTextEditor.AvatarTextEditor, {
  ...createProps()
}), "Empty");
const WithData = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarTextEditor.AvatarTextEditor, {
  ...createProps({
    avatarData: {
      id: "123",
      color: import_Colors.AvatarColors[6],
      text: "SUP"
    }
  })
}), "WithData");
WithData.story = {
  name: "with Data"
};
const WithWideCharacters = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarTextEditor.AvatarTextEditor, {
  ...createProps({
    avatarData: {
      id: "123",
      color: import_Colors.AvatarColors[6],
      text: "\u2031\u0BF8\u{12219}"
    }
  })
}), "WithWideCharacters");
WithWideCharacters.story = {
  name: "with wide characters"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Empty,
  WithData,
  WithWideCharacters
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyVGV4dEVkaXRvci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9BdmF0YXJUZXh0RWRpdG9yJztcbmltcG9ydCB7IEF2YXRhclRleHRFZGl0b3IgfSBmcm9tICcuL0F2YXRhclRleHRFZGl0b3InO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXZhdGFyRGF0YTogb3ZlcnJpZGVQcm9wcy5hdmF0YXJEYXRhLFxuICBpMThuLFxuICBvbkNhbmNlbDogYWN0aW9uKCdvbkNhbmNlbCcpLFxuICBvbkRvbmU6IGFjdGlvbignb25Eb25lJyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQXZhdGFyVGV4dEVkaXRvcicsXG59O1xuXG5leHBvcnQgY29uc3QgRW1wdHkgPSAoKTogSlNYLkVsZW1lbnQgPT4gPEF2YXRhclRleHRFZGl0b3Igey4uLmNyZWF0ZVByb3BzKCl9IC8+O1xuXG5leHBvcnQgY29uc3QgV2l0aERhdGEgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QXZhdGFyVGV4dEVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhdmF0YXJEYXRhOiB7XG4gICAgICAgIGlkOiAnMTIzJyxcbiAgICAgICAgY29sb3I6IEF2YXRhckNvbG9yc1s2XSxcbiAgICAgICAgdGV4dDogJ1NVUCcsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuV2l0aERhdGEuc3RvcnkgPSB7XG4gIG5hbWU6ICd3aXRoIERhdGEnLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhXaWRlQ2hhcmFjdGVycyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJUZXh0RWRpdG9yXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGF2YXRhckRhdGE6IHtcbiAgICAgICAgaWQ6ICcxMjMnLFxuICAgICAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzZdLFxuICAgICAgICB0ZXh0OiAnXHUyMDMxXHUwQkY4XHVEODA4XHVERTE5JyxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5XaXRoV2lkZUNoYXJhY3RlcnMuc3RvcnkgPSB7XG4gIG5hbWU6ICd3aXRoIHdpZGUgY2hhcmFjdGVycycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwyQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUd2Qiw4QkFBaUM7QUFDakMsb0JBQTZCO0FBRTdCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLFlBQVksY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxVQUFVLGlDQUFPLFVBQVU7QUFBQSxFQUMzQixRQUFRLGlDQUFPLFFBQVE7QUFDekIsSUFMb0I7QUFPcEIsSUFBTyxtQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxRQUFRLDZCQUFtQixtREFBQztBQUFBLEtBQXFCLFlBQVk7QUFBQSxDQUFHLEdBQXhEO0FBRWQsTUFBTSxXQUFXLDZCQUN0QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsWUFBWTtBQUFBLE1BQ1YsSUFBSTtBQUFBLE1BQ0osT0FBTywyQkFBYTtBQUFBLE1BQ3BCLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDO0FBQUEsQ0FDSCxHQVRzQjtBQVl4QixTQUFTLFFBQVE7QUFBQSxFQUNmLE1BQU07QUFDUjtBQUVPLE1BQU0scUJBQXFCLDZCQUNoQyxtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsWUFBWTtBQUFBLE1BQ1YsSUFBSTtBQUFBLE1BQ0osT0FBTywyQkFBYTtBQUFBLE1BQ3BCLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDO0FBQUEsQ0FDSCxHQVRnQztBQVlsQyxtQkFBbUIsUUFBUTtBQUFBLEVBQ3pCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
