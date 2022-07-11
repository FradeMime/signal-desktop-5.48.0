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
var TypingAnimation_stories_exports = {};
__export(TypingAnimation_stories_exports, {
  Default: () => Default,
  Light: () => Light,
  default: () => TypingAnimation_stories_default
});
module.exports = __toCommonJS(TypingAnimation_stories_exports);
var React = __toESM(require("react"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_TypingAnimation = require("./TypingAnimation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var TypingAnimation_stories_default = {
  title: "Components/Conversation/TypingAnimation"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  color: overrideProps.color || ""
}), "createProps");
const Default = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_TypingAnimation.TypingAnimation, {
    ...props
  });
}, "Default");
const Light = /* @__PURE__ */ __name(() => {
  const props = createProps({
    color: "light"
  });
  return /* @__PURE__ */ React.createElement("div", {
    style: { padding: "2em", backgroundColor: "grey" }
  }, /* @__PURE__ */ React.createElement(import_TypingAnimation.TypingAnimation, {
    ...props
  }));
}, "Light");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  Light
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwaW5nQW5pbWF0aW9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9UeXBpbmdBbmltYXRpb24nO1xuaW1wb3J0IHsgVHlwaW5nQW5pbWF0aW9uIH0gZnJvbSAnLi9UeXBpbmdBbmltYXRpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vVHlwaW5nQW5pbWF0aW9uJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICBjb2xvcjogb3ZlcnJpZGVQcm9wcy5jb2xvciB8fCAnJyxcbn0pO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPFR5cGluZ0FuaW1hdGlvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IExpZ2h0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgY29sb3I6ICdsaWdodCcsXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMmVtJywgYmFja2dyb3VuZENvbG9yOiAnZ3JleScgfX0+XG4gICAgICA8VHlwaW5nQW5pbWF0aW9uIHsuLi5wcm9wc30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsNkJBQWdDO0FBRWhDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sa0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEU7QUFBQSxFQUNBLE9BQU8sY0FBYyxTQUFTO0FBQ2hDLElBSG9CO0FBS2IsTUFBTSxVQUFVLDZCQUFtQjtBQUN4QyxRQUFNLFFBQVEsWUFBWTtBQUUxQixTQUFPLG9DQUFDO0FBQUEsT0FBb0I7QUFBQSxHQUFPO0FBQ3JDLEdBSnVCO0FBTWhCLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBRUQsU0FDRSxvQ0FBQztBQUFBLElBQUksT0FBTyxFQUFFLFNBQVMsT0FBTyxpQkFBaUIsT0FBTztBQUFBLEtBQ3BELG9DQUFDO0FBQUEsT0FBb0I7QUFBQSxHQUFPLENBQzlCO0FBRUosR0FWcUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
