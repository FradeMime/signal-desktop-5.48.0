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
var isValidReactionEmoji_exports = {};
__export(isValidReactionEmoji_exports, {
  isValidReactionEmoji: () => isValidReactionEmoji
});
module.exports = __toCommonJS(isValidReactionEmoji_exports);
var import_emoji_regex = __toESM(require("emoji-regex"));
var import_grapheme = require("../util/grapheme");
var import_iterables = require("../util/iterables");
function isValidReactionEmoji(value) {
  if (typeof value !== "string") {
    return false;
  }
  const graphemes = (0, import_grapheme.getGraphemes)(value);
  const truncatedGraphemes = (0, import_iterables.take)(graphemes, 2);
  if ((0, import_iterables.size)(truncatedGraphemes) !== 1) {
    return false;
  }
  return (0, import_emoji_regex.default)().test(value);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidReactionEmoji
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNWYWxpZFJlYWN0aW9uRW1vamkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGVtb2ppUmVnZXggZnJvbSAnZW1vamktcmVnZXgnO1xuaW1wb3J0IHsgZ2V0R3JhcGhlbWVzIH0gZnJvbSAnLi4vdXRpbC9ncmFwaGVtZSc7XG5pbXBvcnQgeyB0YWtlLCBzaXplIH0gZnJvbSAnLi4vdXRpbC9pdGVyYWJsZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFJlYWN0aW9uRW1vamkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZWZmZWN0aXZlbHkgYGNvdW50R3JhcGhlbWVzKHZhbHVlKSA9PT0gMWAsIGJ1dCBkb2Vzbid0IHJlcXVpcmUgaXRlcmF0aW5nXG4gIC8vICAgdGhyb3VnaCBhbiBleHRyZW1lbHkgbG9uZyBzdHJpbmcuXG4gIGNvbnN0IGdyYXBoZW1lcyA9IGdldEdyYXBoZW1lcyh2YWx1ZSk7XG4gIGNvbnN0IHRydW5jYXRlZEdyYXBoZW1lcyA9IHRha2UoZ3JhcGhlbWVzLCAyKTtcbiAgaWYgKHNpemUodHJ1bmNhdGVkR3JhcGhlbWVzKSAhPT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBlbW9qaVJlZ2V4KCkudGVzdCh2YWx1ZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXVCO0FBQ3ZCLHNCQUE2QjtBQUM3Qix1QkFBMkI7QUFFcEIsOEJBQThCLE9BQWlDO0FBQ3BFLE1BQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsV0FBTztBQUFBLEVBQ1Q7QUFJQSxRQUFNLFlBQVksa0NBQWEsS0FBSztBQUNwQyxRQUFNLHFCQUFxQiwyQkFBSyxXQUFXLENBQUM7QUFDNUMsTUFBSSwyQkFBSyxrQkFBa0IsTUFBTSxHQUFHO0FBQ2xDLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTyxnQ0FBVyxFQUFFLEtBQUssS0FBSztBQUNoQztBQWRnQiIsCiAgIm5hbWVzIjogW10KfQo=
