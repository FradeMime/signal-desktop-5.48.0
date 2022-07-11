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
var AvatarIconEditor_exports = {};
__export(AvatarIconEditor_exports, {
  AvatarIconEditor: () => AvatarIconEditor
});
module.exports = __toCommonJS(AvatarIconEditor_exports);
var import_react = __toESM(require("react"));
var import_AvatarColorPicker = require("./AvatarColorPicker");
var import_AvatarModalButtons = require("./AvatarModalButtons");
var import_AvatarPreview = require("./AvatarPreview");
var import_avatarDataToBytes = require("../util/avatarDataToBytes");
const AvatarIconEditor = /* @__PURE__ */ __name(({
  avatarData: initialAvatarData,
  i18n,
  onClose
}) => {
  const [avatarBuffer, setAvatarBuffer] = (0, import_react.useState)();
  const [avatarData, setAvatarData] = (0, import_react.useState)(initialAvatarData);
  const onColorSelected = (0, import_react.useCallback)((color) => {
    setAvatarData({
      ...avatarData,
      color
    });
  }, [avatarData]);
  (0, import_react.useEffect)(() => {
    let shouldCancel = false;
    async function loadAvatar() {
      const buffer = await (0, import_avatarDataToBytes.avatarDataToBytes)(avatarData);
      if (!shouldCancel) {
        setAvatarBuffer(buffer);
      }
    }
    loadAvatar();
    return () => {
      shouldCancel = true;
    };
  }, [avatarData, setAvatarBuffer]);
  const hasChanges = avatarData !== initialAvatarData;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
    avatarColor: avatarData.color,
    avatarValue: avatarBuffer,
    conversationTitle: avatarData.text,
    i18n
  }), /* @__PURE__ */ import_react.default.createElement("hr", {
    className: "AvatarEditor__divider"
  }), /* @__PURE__ */ import_react.default.createElement(import_AvatarColorPicker.AvatarColorPicker, {
    i18n,
    onColorSelected,
    selectedColor: avatarData.color
  }), /* @__PURE__ */ import_react.default.createElement(import_AvatarModalButtons.AvatarModalButtons, {
    hasChanges,
    i18n,
    onCancel: onClose,
    onSave: () => onClose({
      ...avatarData,
      buffer: avatarBuffer
    })
  }));
}, "AvatarIconEditor");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarIconEditor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFySWNvbkVkaXRvci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBBdmF0YXJDb2xvclBpY2tlciB9IGZyb20gJy4vQXZhdGFyQ29sb3JQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBBdmF0YXJDb2xvclR5cGUgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBBdmF0YXJEYXRhVHlwZSB9IGZyb20gJy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXJNb2RhbEJ1dHRvbnMgfSBmcm9tICcuL0F2YXRhck1vZGFsQnV0dG9ucyc7XG5pbXBvcnQgeyBBdmF0YXJQcmV2aWV3IH0gZnJvbSAnLi9BdmF0YXJQcmV2aWV3JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgYXZhdGFyRGF0YVRvQnl0ZXMgfSBmcm9tICcuLi91dGlsL2F2YXRhckRhdGFUb0J5dGVzJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBhdmF0YXJEYXRhOiBBdmF0YXJEYXRhVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKGF2YXRhckRhdGE/OiBBdmF0YXJEYXRhVHlwZSkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBBdmF0YXJJY29uRWRpdG9yID0gKHtcbiAgYXZhdGFyRGF0YTogaW5pdGlhbEF2YXRhckRhdGEsXG4gIGkxOG4sXG4gIG9uQ2xvc2UsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFthdmF0YXJCdWZmZXIsIHNldEF2YXRhckJ1ZmZlcl0gPSB1c2VTdGF0ZTxVaW50OEFycmF5IHwgdW5kZWZpbmVkPigpO1xuICBjb25zdCBbYXZhdGFyRGF0YSwgc2V0QXZhdGFyRGF0YV0gPVxuICAgIHVzZVN0YXRlPEF2YXRhckRhdGFUeXBlPihpbml0aWFsQXZhdGFyRGF0YSk7XG5cbiAgY29uc3Qgb25Db2xvclNlbGVjdGVkID0gdXNlQ2FsbGJhY2soXG4gICAgKGNvbG9yOiBBdmF0YXJDb2xvclR5cGUpID0+IHtcbiAgICAgIHNldEF2YXRhckRhdGEoe1xuICAgICAgICAuLi5hdmF0YXJEYXRhLFxuICAgICAgICBjb2xvcixcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2F2YXRhckRhdGFdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgc2hvdWxkQ2FuY2VsID0gZmFsc2U7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBsb2FkQXZhdGFyKCkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgYXZhdGFyRGF0YVRvQnl0ZXMoYXZhdGFyRGF0YSk7XG4gICAgICBpZiAoIXNob3VsZENhbmNlbCkge1xuICAgICAgICBzZXRBdmF0YXJCdWZmZXIoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9hZEF2YXRhcigpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNob3VsZENhbmNlbCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW2F2YXRhckRhdGEsIHNldEF2YXRhckJ1ZmZlcl0pO1xuXG4gIGNvbnN0IGhhc0NoYW5nZXMgPSBhdmF0YXJEYXRhICE9PSBpbml0aWFsQXZhdGFyRGF0YTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8QXZhdGFyUHJldmlld1xuICAgICAgICBhdmF0YXJDb2xvcj17YXZhdGFyRGF0YS5jb2xvcn1cbiAgICAgICAgYXZhdGFyVmFsdWU9e2F2YXRhckJ1ZmZlcn1cbiAgICAgICAgY29udmVyc2F0aW9uVGl0bGU9e2F2YXRhckRhdGEudGV4dH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgIC8+XG4gICAgICA8aHIgY2xhc3NOYW1lPVwiQXZhdGFyRWRpdG9yX19kaXZpZGVyXCIgLz5cbiAgICAgIDxBdmF0YXJDb2xvclBpY2tlclxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNvbG9yU2VsZWN0ZWQ9e29uQ29sb3JTZWxlY3RlZH1cbiAgICAgICAgc2VsZWN0ZWRDb2xvcj17YXZhdGFyRGF0YS5jb2xvcn1cbiAgICAgIC8+XG4gICAgICA8QXZhdGFyTW9kYWxCdXR0b25zXG4gICAgICAgIGhhc0NoYW5nZXM9e2hhc0NoYW5nZXN9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2FuY2VsPXtvbkNsb3NlfVxuICAgICAgICBvblNhdmU9eygpID0+XG4gICAgICAgICAgb25DbG9zZSh7XG4gICAgICAgICAgICAuLi5hdmF0YXJEYXRhLFxuICAgICAgICAgICAgYnVmZmVyOiBhdmF0YXJCdWZmZXIsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQXdEO0FBRXhELCtCQUFrQztBQUdsQyxnQ0FBbUM7QUFDbkMsMkJBQThCO0FBRTlCLCtCQUFrQztBQVEzQixNQUFNLG1CQUFtQix3QkFBQztBQUFBLEVBQy9CLFlBQVk7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sQ0FBQyxjQUFjLG1CQUFtQiwyQkFBaUM7QUFDekUsUUFBTSxDQUFDLFlBQVksaUJBQ2pCLDJCQUF5QixpQkFBaUI7QUFFNUMsUUFBTSxrQkFBa0IsOEJBQ3RCLENBQUMsVUFBMkI7QUFDMUIsa0JBQWM7QUFBQSxTQUNUO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FDQSxDQUFDLFVBQVUsQ0FDYjtBQUVBLDhCQUFVLE1BQU07QUFDZCxRQUFJLGVBQWU7QUFFbkIsZ0NBQTRCO0FBQzFCLFlBQU0sU0FBUyxNQUFNLGdEQUFrQixVQUFVO0FBQ2pELFVBQUksQ0FBQyxjQUFjO0FBQ2pCLHdCQUFnQixNQUFNO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBTGUsQUFNZixlQUFXO0FBRVgsV0FBTyxNQUFNO0FBQ1gscUJBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFlBQVksZUFBZSxDQUFDO0FBRWhDLFFBQU0sYUFBYSxlQUFlO0FBRWxDLFNBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxJQUNDLGFBQWEsV0FBVztBQUFBLElBQ3hCLGFBQWE7QUFBQSxJQUNiLG1CQUFtQixXQUFXO0FBQUEsSUFDOUI7QUFBQSxHQUNGLEdBQ0EsbURBQUM7QUFBQSxJQUFHLFdBQVU7QUFBQSxHQUF3QixHQUN0QyxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQSxlQUFlLFdBQVc7QUFBQSxHQUM1QixHQUNBLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLFFBQVEsTUFDTixRQUFRO0FBQUEsU0FDSDtBQUFBLE1BQ0gsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEdBRUwsQ0FDRjtBQUVKLEdBaEVnQzsiLAogICJuYW1lcyI6IFtdCn0K
