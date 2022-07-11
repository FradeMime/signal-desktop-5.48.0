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
var contactUtil_exports = {};
__export(contactUtil_exports, {
  renderAvatar: () => renderAvatar,
  renderContactShorthand: () => renderContactShorthand,
  renderName: () => renderName
});
module.exports = __toCommonJS(contactUtil_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Avatar = require("../Avatar");
var import_Spinner = require("../Spinner");
var import_Colors = require("../../types/Colors");
var import_EmbeddedContact = require("../../types/EmbeddedContact");
function renderAvatar({
  contact,
  i18n,
  size,
  direction
}) {
  const { avatar } = contact;
  const avatarPath = avatar && avatar.avatar && avatar.avatar.path;
  const pending = avatar && avatar.avatar && avatar.avatar.pending;
  const title = (0, import_EmbeddedContact.getName)(contact) || "";
  const spinnerSvgSize = size < 50 ? "small" : "normal";
  const spinnerSize = size < 50 ? "24px" : void 0;
  if (pending) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-embedded-contact__spinner-container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      svgSize: spinnerSvgSize,
      size: spinnerSize,
      direction
    }));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: false,
    avatarPath,
    badge: void 0,
    blur: import_Avatar.AvatarBlur.NoBlur,
    color: import_Colors.AvatarColors[0],
    conversationType: "direct",
    i18n,
    isMe: true,
    title,
    sharedGroupNames: [],
    size
  });
}
function renderName({
  contact,
  isIncoming,
  module: module2
}) {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(`module-${module2}__contact-name`, isIncoming ? `module-${module2}__contact-name--incoming` : null)
  }, (0, import_EmbeddedContact.getName)(contact));
}
function renderContactShorthand({
  contact,
  isIncoming,
  module: module2
}) {
  const { number: phoneNumber, email } = contact;
  const firstNumber = phoneNumber && phoneNumber[0] && phoneNumber[0].value;
  const firstEmail = email && email[0] && email[0].value;
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(`module-${module2}__contact-method`, isIncoming ? `module-${module2}__contact-method--incoming` : null)
  }, firstNumber || firstEmail);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderAvatar,
  renderContactShorthand,
  renderName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udGFjdFV0aWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhckJsdXIgfSBmcm9tICcuLi9BdmF0YXInO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uL1NwaW5uZXInO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IEVtYmVkZGVkQ29udGFjdFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9FbWJlZGRlZENvbnRhY3QnO1xuaW1wb3J0IHsgZ2V0TmFtZSB9IGZyb20gJy4uLy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBdmF0YXIoe1xuICBjb250YWN0LFxuICBpMThuLFxuICBzaXplLFxuICBkaXJlY3Rpb24sXG59OiB7XG4gIGNvbnRhY3Q6IEVtYmVkZGVkQ29udGFjdFR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHNpemU6IDI4IHwgNTIgfCA4MDtcbiAgZGlyZWN0aW9uPzogJ291dGdvaW5nJyB8ICdpbmNvbWluZyc7XG59KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCB7IGF2YXRhciB9ID0gY29udGFjdDtcblxuICBjb25zdCBhdmF0YXJQYXRoID0gYXZhdGFyICYmIGF2YXRhci5hdmF0YXIgJiYgYXZhdGFyLmF2YXRhci5wYXRoO1xuICBjb25zdCBwZW5kaW5nID0gYXZhdGFyICYmIGF2YXRhci5hdmF0YXIgJiYgYXZhdGFyLmF2YXRhci5wZW5kaW5nO1xuICBjb25zdCB0aXRsZSA9IGdldE5hbWUoY29udGFjdCkgfHwgJyc7XG4gIGNvbnN0IHNwaW5uZXJTdmdTaXplID0gc2l6ZSA8IDUwID8gJ3NtYWxsJyA6ICdub3JtYWwnO1xuICBjb25zdCBzcGlubmVyU2l6ZSA9IHNpemUgPCA1MCA/ICcyNHB4JyA6IHVuZGVmaW5lZDtcblxuICBpZiAocGVuZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1lbWJlZGRlZC1jb250YWN0X19zcGlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICA8U3Bpbm5lclxuICAgICAgICAgIHN2Z1NpemU9e3NwaW5uZXJTdmdTaXplfVxuICAgICAgICAgIHNpemU9e3NwaW5uZXJTaXplfVxuICAgICAgICAgIGRpcmVjdGlvbj17ZGlyZWN0aW9ufVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEF2YXRhclxuICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17ZmFsc2V9XG4gICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgIGJsdXI9e0F2YXRhckJsdXIuTm9CbHVyfVxuICAgICAgY29sb3I9e0F2YXRhckNvbG9yc1swXX1cbiAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIGlzTWVcbiAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e1tdfVxuICAgICAgc2l6ZT17c2l6ZX1cbiAgICAvPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTmFtZSh7XG4gIGNvbnRhY3QsXG4gIGlzSW5jb21pbmcsXG4gIG1vZHVsZSxcbn06IHtcbiAgY29udGFjdDogRW1iZWRkZWRDb250YWN0VHlwZTtcbiAgaXNJbmNvbWluZzogYm9vbGVhbjtcbiAgbW9kdWxlOiBzdHJpbmc7XG59KTogSlNYLkVsZW1lbnQge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgYG1vZHVsZS0ke21vZHVsZX1fX2NvbnRhY3QtbmFtZWAsXG4gICAgICAgIGlzSW5jb21pbmcgPyBgbW9kdWxlLSR7bW9kdWxlfV9fY29udGFjdC1uYW1lLS1pbmNvbWluZ2AgOiBudWxsXG4gICAgICApfVxuICAgID5cbiAgICAgIHtnZXROYW1lKGNvbnRhY3QpfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ29udGFjdFNob3J0aGFuZCh7XG4gIGNvbnRhY3QsXG4gIGlzSW5jb21pbmcsXG4gIG1vZHVsZSxcbn06IHtcbiAgY29udGFjdDogRW1iZWRkZWRDb250YWN0VHlwZTtcbiAgaXNJbmNvbWluZzogYm9vbGVhbjtcbiAgbW9kdWxlOiBzdHJpbmc7XG59KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCB7IG51bWJlcjogcGhvbmVOdW1iZXIsIGVtYWlsIH0gPSBjb250YWN0O1xuICBjb25zdCBmaXJzdE51bWJlciA9IHBob25lTnVtYmVyICYmIHBob25lTnVtYmVyWzBdICYmIHBob25lTnVtYmVyWzBdLnZhbHVlO1xuICBjb25zdCBmaXJzdEVtYWlsID0gZW1haWwgJiYgZW1haWxbMF0gJiYgZW1haWxbMF0udmFsdWU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIGBtb2R1bGUtJHttb2R1bGV9X19jb250YWN0LW1ldGhvZGAsXG4gICAgICAgIGlzSW5jb21pbmcgPyBgbW9kdWxlLSR7bW9kdWxlfV9fY29udGFjdC1tZXRob2QtLWluY29taW5nYCA6IG51bGxcbiAgICAgICl9XG4gICAgPlxuICAgICAge2ZpcnN0TnVtYmVyIHx8IGZpcnN0RW1haWx9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFFdkIsb0JBQW1DO0FBQ25DLHFCQUF3QjtBQUd4QixvQkFBNkI7QUFFN0IsNkJBQXdCO0FBRWpCLHNCQUFzQjtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FNYztBQUNkLFFBQU0sRUFBRSxXQUFXO0FBRW5CLFFBQU0sYUFBYSxVQUFVLE9BQU8sVUFBVSxPQUFPLE9BQU87QUFDNUQsUUFBTSxVQUFVLFVBQVUsT0FBTyxVQUFVLE9BQU8sT0FBTztBQUN6RCxRQUFNLFFBQVEsb0NBQVEsT0FBTyxLQUFLO0FBQ2xDLFFBQU0saUJBQWlCLE9BQU8sS0FBSyxVQUFVO0FBQzdDLFFBQU0sY0FBYyxPQUFPLEtBQUssU0FBUztBQUV6QyxNQUFJLFNBQVM7QUFDWCxXQUNFLG1EQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FDYixtREFBQztBQUFBLE1BQ0MsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ047QUFBQSxLQUNGLENBQ0Y7QUFBQSxFQUVKO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0Msd0JBQXdCO0FBQUEsSUFDeEI7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQLE1BQU0seUJBQVc7QUFBQSxJQUNqQixPQUFPLDJCQUFhO0FBQUEsSUFDcEIsa0JBQWlCO0FBQUEsSUFDakI7QUFBQSxJQUNBLE1BQUk7QUFBQSxJQUNKO0FBQUEsSUFDQSxrQkFBa0IsQ0FBQztBQUFBLElBQ25CO0FBQUEsR0FDRjtBQUVKO0FBOUNnQixBQWdEVCxvQkFBb0I7QUFBQSxFQUN6QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FLYztBQUNkLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsVUFBVSx5QkFDVixhQUFhLFVBQVUsb0NBQW1DLElBQzVEO0FBQUEsS0FFQyxvQ0FBUSxPQUFPLENBQ2xCO0FBRUo7QUFuQmdCLEFBcUJULGdDQUFnQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUtjO0FBQ2QsUUFBTSxFQUFFLFFBQVEsYUFBYSxVQUFVO0FBQ3ZDLFFBQU0sY0FBYyxlQUFlLFlBQVksTUFBTSxZQUFZLEdBQUc7QUFDcEUsUUFBTSxhQUFhLFNBQVMsTUFBTSxNQUFNLE1BQU0sR0FBRztBQUVqRCxTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULFVBQVUsMkJBQ1YsYUFBYSxVQUFVLHNDQUFxQyxJQUM5RDtBQUFBLEtBRUMsZUFBZSxVQUNsQjtBQUVKO0FBdkJnQiIsCiAgIm5hbWVzIjogW10KfQo=
