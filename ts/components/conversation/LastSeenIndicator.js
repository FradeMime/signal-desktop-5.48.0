var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var LastSeenIndicator_exports = {};
__export(LastSeenIndicator_exports, {
  LastSeenIndicator: () => LastSeenIndicator
});
module.exports = __toCommonJS(LastSeenIndicator_exports);
var import_react = __toESM(require("react"));
const LastSeenIndicator = (0, import_react.forwardRef)(({ count, i18n }, ref) => {
  const message = count === 1 ? i18n("unreadMessage") : i18n("unreadMessages", [String(count)]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-last-seen-indicator",
    ref
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-last-seen-indicator__bar"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-last-seen-indicator__text"
  }, message));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LastSeenIndicator
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGFzdFNlZW5JbmRpY2F0b3IudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY291bnQ6IG51bWJlcjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBMYXN0U2VlbkluZGljYXRvciA9IGZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIFByb3BzPihcbiAgKHsgY291bnQsIGkxOG4gfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICBjb3VudCA9PT0gMVxuICAgICAgICA/IGkxOG4oJ3VucmVhZE1lc3NhZ2UnKVxuICAgICAgICA6IGkxOG4oJ3VucmVhZE1lc3NhZ2VzJywgW1N0cmluZyhjb3VudCldKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sYXN0LXNlZW4taW5kaWNhdG9yXCIgcmVmPXtyZWZ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sYXN0LXNlZW4taW5kaWNhdG9yX19iYXJcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sYXN0LXNlZW4taW5kaWNhdG9yX190ZXh0XCI+e21lc3NhZ2V9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtDO0FBUzNCLE1BQU0sb0JBQW9CLDZCQUMvQixDQUFDLEVBQUUsT0FBTyxRQUFRLFFBQVE7QUFDeEIsUUFBTSxVQUNKLFVBQVUsSUFDTixLQUFLLGVBQWUsSUFDcEIsS0FBSyxrQkFBa0IsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDO0FBRTVDLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxJQUE2QjtBQUFBLEtBQzFDLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsR0FBa0MsR0FDakQsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUFvQyxPQUFRLENBQzdEO0FBRUosQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
