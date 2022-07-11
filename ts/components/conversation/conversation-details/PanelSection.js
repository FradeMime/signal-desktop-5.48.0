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
var PanelSection_exports = {};
__export(PanelSection_exports, {
  PanelSection: () => PanelSection
});
module.exports = __toCommonJS(PanelSection_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_util = require("./util");
const bem = (0, import_util.bemGenerator)("ConversationDetails-panel-section");
const borderlessClass = bem("root", "borderless");
const PanelSection = /* @__PURE__ */ __name(({
  actions,
  borderless,
  centerTitle,
  children,
  title
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: (0, import_classnames.default)(bem("root"), borderless ? borderlessClass : null)
}, (title || actions) && /* @__PURE__ */ import_react.default.createElement("div", {
  className: bem("header", { center: centerTitle || false })
}, title && /* @__PURE__ */ import_react.default.createElement("div", {
  className: bem("title")
}, title), actions && /* @__PURE__ */ import_react.default.createElement("div", null, actions)), /* @__PURE__ */ import_react.default.createElement("div", null, children)), "PanelSection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PanelSection
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGFuZWxTZWN0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBiZW1HZW5lcmF0b3IgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgYWN0aW9ucz86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYm9yZGVybGVzcz86IGJvb2xlYW47XG4gIGNlbnRlclRpdGxlPzogYm9vbGVhbjtcbiAgdGl0bGU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBiZW0gPSBiZW1HZW5lcmF0b3IoJ0NvbnZlcnNhdGlvbkRldGFpbHMtcGFuZWwtc2VjdGlvbicpO1xuY29uc3QgYm9yZGVybGVzc0NsYXNzID0gYmVtKCdyb290JywgJ2JvcmRlcmxlc3MnKTtcblxuZXhwb3J0IGNvbnN0IFBhbmVsU2VjdGlvbjogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSAoe1xuICBhY3Rpb25zLFxuICBib3JkZXJsZXNzLFxuICBjZW50ZXJUaXRsZSxcbiAgY2hpbGRyZW4sXG4gIHRpdGxlLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhiZW0oJ3Jvb3QnKSwgYm9yZGVybGVzcyA/IGJvcmRlcmxlc3NDbGFzcyA6IG51bGwpfT5cbiAgICB7KHRpdGxlIHx8IGFjdGlvbnMpICYmIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtiZW0oJ2hlYWRlcicsIHsgY2VudGVyOiBjZW50ZXJUaXRsZSB8fCBmYWxzZSB9KX0+XG4gICAgICAgIHt0aXRsZSAmJiA8ZGl2IGNsYXNzTmFtZT17YmVtKCd0aXRsZScpfT57dGl0bGV9PC9kaXY+fVxuICAgICAgICB7YWN0aW9ucyAmJiA8ZGl2PnthY3Rpb25zfTwvZGl2Pn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gIDwvZGl2PlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBQ3ZCLGtCQUE2QjtBQVM3QixNQUFNLE1BQU0sOEJBQWEsbUNBQW1DO0FBQzVELE1BQU0sa0JBQWtCLElBQUksUUFBUSxZQUFZO0FBRXpDLE1BQU0sZUFBMkMsd0JBQUM7QUFBQSxFQUN2RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUVBLG1EQUFDO0FBQUEsRUFBSSxXQUFXLCtCQUFXLElBQUksTUFBTSxHQUFHLGFBQWEsa0JBQWtCLElBQUk7QUFBQSxHQUN2RSxVQUFTLFlBQ1QsbURBQUM7QUFBQSxFQUFJLFdBQVcsSUFBSSxVQUFVLEVBQUUsUUFBUSxlQUFlLE1BQU0sQ0FBQztBQUFBLEdBQzNELFNBQVMsbURBQUM7QUFBQSxFQUFJLFdBQVcsSUFBSSxPQUFPO0FBQUEsR0FBSSxLQUFNLEdBQzlDLFdBQVcsbURBQUMsYUFBSyxPQUFRLENBQzVCLEdBRUYsbURBQUMsYUFBSyxRQUFTLENBQ2pCLEdBZnNEOyIsCiAgIm5hbWVzIjogW10KfQo=
