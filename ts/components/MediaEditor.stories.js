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
var MediaEditor_stories_exports = {};
__export(MediaEditor_stories_exports, {
  ExtraLarge: () => ExtraLarge,
  Large: () => Large,
  Portrait: () => Portrait,
  Smol: () => Smol,
  default: () => MediaEditor_stories_default
});
module.exports = __toCommonJS(MediaEditor_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_MediaEditor = require("./MediaEditor");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
var import_getStickerPacks = require("../test-both/helpers/getStickerPacks");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MediaEditor_stories_default = {
  title: "Components/MediaEditor"
};
const IMAGE_1 = "/fixtures/nathan-anderson-316188-unsplash.jpg";
const IMAGE_2 = "/fixtures/tina-rolf-269345-unsplash.jpg";
const IMAGE_3 = "/fixtures/kitten-4-112-112.jpg";
const IMAGE_4 = "/fixtures/snow.jpg";
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  i18n,
  imageSrc: IMAGE_2,
  onClose: (0, import_addon_actions.action)("onClose"),
  onDone: (0, import_addon_actions.action)("onDone"),
  installedPacks: import_getStickerPacks.installedPacks,
  recentStickers: [import_getStickerPacks.Stickers.wide, import_getStickerPacks.Stickers.tall, import_getStickerPacks.Stickers.abe]
}), "getDefaultProps");
const ExtraLarge = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_MediaEditor.MediaEditor, {
  ...getDefaultProps()
}), "ExtraLarge");
const Large = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_MediaEditor.MediaEditor, {
  ...getDefaultProps(),
  imageSrc: IMAGE_1
}), "Large");
const Smol = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_MediaEditor.MediaEditor, {
  ...getDefaultProps(),
  imageSrc: IMAGE_3
}), "Smol");
const Portrait = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_MediaEditor.MediaEditor, {
  ...getDefaultProps(),
  imageSrc: IMAGE_4
}), "Portrait");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExtraLarge,
  Large,
  Portrait,
  Smol
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3Iuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9NZWRpYUVkaXRvcic7XG5pbXBvcnQgeyBNZWRpYUVkaXRvciB9IGZyb20gJy4vTWVkaWFFZGl0b3InO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgeyBTdGlja2VycywgaW5zdGFsbGVkUGFja3MgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXRTdGlja2VyUGFja3MnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9NZWRpYUVkaXRvcicsXG59O1xuXG5jb25zdCBJTUFHRV8xID0gJy9maXh0dXJlcy9uYXRoYW4tYW5kZXJzb24tMzE2MTg4LXVuc3BsYXNoLmpwZyc7XG5jb25zdCBJTUFHRV8yID0gJy9maXh0dXJlcy90aW5hLXJvbGYtMjY5MzQ1LXVuc3BsYXNoLmpwZyc7XG5jb25zdCBJTUFHRV8zID0gJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZyc7XG5jb25zdCBJTUFHRV80ID0gJy9maXh0dXJlcy9zbm93LmpwZyc7XG5cbmNvbnN0IGdldERlZmF1bHRQcm9wcyA9ICgpOiBQcm9wc1R5cGUgPT4gKHtcbiAgaTE4bixcbiAgaW1hZ2VTcmM6IElNQUdFXzIsXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICBvbkRvbmU6IGFjdGlvbignb25Eb25lJyksXG5cbiAgLy8gU3RpY2tlckJ1dHRvblByb3BzXG4gIGluc3RhbGxlZFBhY2tzLFxuICByZWNlbnRTdGlja2VyczogW1N0aWNrZXJzLndpZGUsIFN0aWNrZXJzLnRhbGwsIFN0aWNrZXJzLmFiZV0sXG59KTtcblxuZXhwb3J0IGNvbnN0IEV4dHJhTGFyZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TWVkaWFFZGl0b3Igey4uLmdldERlZmF1bHRQcm9wcygpfSAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IExhcmdlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1lZGlhRWRpdG9yIHsuLi5nZXREZWZhdWx0UHJvcHMoKX0gaW1hZ2VTcmM9e0lNQUdFXzF9IC8+XG4pO1xuXG5leHBvcnQgY29uc3QgU21vbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxNZWRpYUVkaXRvciB7Li4uZ2V0RGVmYXVsdFByb3BzKCl9IGltYWdlU3JjPXtJTUFHRV8zfSAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFBvcnRyYWl0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1lZGlhRWRpdG9yIHsuLi5nZXREZWZhdWx0UHJvcHMoKX0gaW1hZ2VTcmM9e0lNQUdFXzR9IC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUd2Qix5QkFBNEI7QUFDNUIsc0JBQXVCO0FBQ3ZCLHVCQUEwQjtBQUMxQiw2QkFBeUM7QUFFekMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyw4QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxVQUFVO0FBQ2hCLE1BQU0sVUFBVTtBQUNoQixNQUFNLFVBQVU7QUFDaEIsTUFBTSxVQUFVO0FBRWhCLE1BQU0sa0JBQWtCLDZCQUFrQjtBQUFBLEVBQ3hDO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixRQUFRLGlDQUFPLFFBQVE7QUFBQSxFQUd2QjtBQUFBLEVBQ0EsZ0JBQWdCLENBQUMsZ0NBQVMsTUFBTSxnQ0FBUyxNQUFNLGdDQUFTLEdBQUc7QUFDN0QsSUFUd0I7QUFXakIsTUFBTSxhQUFhLDZCQUN4QixtREFBQztBQUFBLEtBQWdCLGdCQUFnQjtBQUFBLENBQUcsR0FEWjtBQUluQixNQUFNLFFBQVEsNkJBQ25CLG1EQUFDO0FBQUEsS0FBZ0IsZ0JBQWdCO0FBQUEsRUFBRyxVQUFVO0FBQUEsQ0FBUyxHQURwQztBQUlkLE1BQU0sT0FBTyw2QkFDbEIsbURBQUM7QUFBQSxLQUFnQixnQkFBZ0I7QUFBQSxFQUFHLFVBQVU7QUFBQSxDQUFTLEdBRHJDO0FBSWIsTUFBTSxXQUFXLDZCQUN0QixtREFBQztBQUFBLEtBQWdCLGdCQUFnQjtBQUFBLEVBQUcsVUFBVTtBQUFBLENBQVMsR0FEakM7IiwKICAibmFtZXMiOiBbXQp9Cg==
