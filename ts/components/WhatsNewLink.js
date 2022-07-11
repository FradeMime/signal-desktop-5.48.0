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
var WhatsNewLink_exports = {};
__export(WhatsNewLink_exports, {
  WhatsNewLink: () => WhatsNewLink
});
module.exports = __toCommonJS(WhatsNewLink_exports);
var import_react = __toESM(require("react"));
var import_Intl = require("./Intl");
const WhatsNewLink = /* @__PURE__ */ __name((props) => {
  const { i18n, showWhatsNewModal } = props;
  return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "whatsNew",
    components: [
      /* @__PURE__ */ import_react.default.createElement("button", {
        className: "WhatsNew",
        type: "button",
        onClick: showWhatsNewModal
      }, i18n("viewReleaseNotes"))
    ]
  });
}, "WhatsNewLink");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsNewLink
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiV2hhdHNOZXdMaW5rLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi9JbnRsJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgc2hvd1doYXRzTmV3TW9kYWw6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgV2hhdHNOZXdMaW5rID0gKHByb3BzOiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHsgaTE4biwgc2hvd1doYXRzTmV3TW9kYWwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPEludGxcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBpZD1cIndoYXRzTmV3XCJcbiAgICAgIGNvbXBvbmVudHM9e1tcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJXaGF0c05ld1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtzaG93V2hhdHNOZXdNb2RhbH0+XG4gICAgICAgICAge2kxOG4oJ3ZpZXdSZWxlYXNlTm90ZXMnKX1cbiAgICAgICAgPC9idXR0b24+LFxuICAgICAgXX1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsa0JBQXFCO0FBU2QsTUFBTSxlQUFlLHdCQUFDLFVBQWtDO0FBQzdELFFBQU0sRUFBRSxNQUFNLHNCQUFzQjtBQUVwQyxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsSUFBRztBQUFBLElBQ0gsWUFBWTtBQUFBLE1BQ1YsbURBQUM7QUFBQSxRQUFPLFdBQVU7QUFBQSxRQUFXLE1BQUs7QUFBQSxRQUFTLFNBQVM7QUFBQSxTQUNqRCxLQUFLLGtCQUFrQixDQUMxQjtBQUFBLElBQ0Y7QUFBQSxHQUNGO0FBRUosR0FkNEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
