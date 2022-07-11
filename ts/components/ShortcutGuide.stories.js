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
var ShortcutGuide_stories_exports = {};
__export(ShortcutGuide_stories_exports, {
  Default: () => Default,
  HasStickers: () => HasStickers,
  Mac: () => Mac,
  default: () => ShortcutGuide_stories_default
});
module.exports = __toCommonJS(ShortcutGuide_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_ShortcutGuide = require("./ShortcutGuide");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ShortcutGuide_stories_default = {
  title: "Components/ShortcutGuide"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  close: (0, import_addon_actions.action)("close"),
  hasInstalledStickers: (0, import_addon_knobs.boolean)("hasInstalledStickers", overrideProps.hasInstalledStickers || false),
  platform: (0, import_addon_knobs.select)("platform", {
    macOS: "darwin",
    other: "other"
  }, overrideProps.platform || "other")
}), "createProps");
const Default = /* @__PURE__ */ __name(() => {
  const props = createProps({});
  return /* @__PURE__ */ React.createElement(import_ShortcutGuide.ShortcutGuide, {
    ...props
  });
}, "Default");
const Mac = /* @__PURE__ */ __name(() => {
  const props = createProps({ platform: "darwin" });
  return /* @__PURE__ */ React.createElement(import_ShortcutGuide.ShortcutGuide, {
    ...props
  });
}, "Mac");
const HasStickers = /* @__PURE__ */ __name(() => {
  const props = createProps({ hasInstalledStickers: true });
  return /* @__PURE__ */ React.createElement(import_ShortcutGuide.ShortcutGuide, {
    ...props
  });
}, "HasStickers");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  HasStickers,
  Mac
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hvcnRjdXRHdWlkZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgYm9vbGVhbiwgc2VsZWN0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vU2hvcnRjdXRHdWlkZSc7XG5pbXBvcnQgeyBTaG9ydGN1dEd1aWRlIH0gZnJvbSAnLi9TaG9ydGN1dEd1aWRlJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU2hvcnRjdXRHdWlkZScsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgaTE4bixcbiAgY2xvc2U6IGFjdGlvbignY2xvc2UnKSxcbiAgaGFzSW5zdGFsbGVkU3RpY2tlcnM6IGJvb2xlYW4oXG4gICAgJ2hhc0luc3RhbGxlZFN0aWNrZXJzJyxcbiAgICBvdmVycmlkZVByb3BzLmhhc0luc3RhbGxlZFN0aWNrZXJzIHx8IGZhbHNlXG4gICksXG4gIHBsYXRmb3JtOiBzZWxlY3QoXG4gICAgJ3BsYXRmb3JtJyxcbiAgICB7XG4gICAgICBtYWNPUzogJ2RhcndpbicsXG4gICAgICBvdGhlcjogJ290aGVyJyxcbiAgICB9LFxuICAgIG92ZXJyaWRlUHJvcHMucGxhdGZvcm0gfHwgJ290aGVyJ1xuICApLFxufSk7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7fSk7XG4gIHJldHVybiA8U2hvcnRjdXRHdWlkZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1hYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBwbGF0Zm9ybTogJ2RhcndpbicgfSk7XG4gIHJldHVybiA8U2hvcnRjdXRHdWlkZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEhhc1N0aWNrZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGhhc0luc3RhbGxlZFN0aWNrZXJzOiB0cnVlIH0pO1xuICByZXR1cm4gPFNob3J0Y3V0R3VpZGUgey4uLnByb3BzfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsMkJBQXVCO0FBQ3ZCLHlCQUFnQztBQUVoQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLDJCQUE4QjtBQUU5QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLGdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFO0FBQUEsRUFDQSxPQUFPLGlDQUFPLE9BQU87QUFBQSxFQUNyQixzQkFBc0IsZ0NBQ3BCLHdCQUNBLGNBQWMsd0JBQXdCLEtBQ3hDO0FBQUEsRUFDQSxVQUFVLCtCQUNSLFlBQ0E7QUFBQSxJQUNFLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxFQUNULEdBQ0EsY0FBYyxZQUFZLE9BQzVCO0FBQ0YsSUFmb0I7QUFpQmIsTUFBTSxVQUFVLDZCQUFtQjtBQUN4QyxRQUFNLFFBQVEsWUFBWSxDQUFDLENBQUM7QUFDNUIsU0FBTyxvQ0FBQztBQUFBLE9BQWtCO0FBQUEsR0FBTztBQUNuQyxHQUh1QjtBQUtoQixNQUFNLE1BQU0sNkJBQW1CO0FBQ3BDLFFBQU0sUUFBUSxZQUFZLEVBQUUsVUFBVSxTQUFTLENBQUM7QUFDaEQsU0FBTyxvQ0FBQztBQUFBLE9BQWtCO0FBQUEsR0FBTztBQUNuQyxHQUhtQjtBQUtaLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsUUFBTSxRQUFRLFlBQVksRUFBRSxzQkFBc0IsS0FBSyxDQUFDO0FBQ3hELFNBQU8sb0NBQUM7QUFBQSxPQUFrQjtBQUFBLEdBQU87QUFDbkMsR0FIMkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
