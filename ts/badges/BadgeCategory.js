var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var BadgeCategory_exports = {};
__export(BadgeCategory_exports, {
  BadgeCategory: () => BadgeCategory,
  parseBadgeCategory: () => parseBadgeCategory
});
module.exports = __toCommonJS(BadgeCategory_exports);
var import_enum = require("../util/enum");
var BadgeCategory = /* @__PURE__ */ ((BadgeCategory2) => {
  BadgeCategory2["Donor"] = "donor";
  BadgeCategory2["Other"] = "other";
  return BadgeCategory2;
})(BadgeCategory || {});
const parseBadgeCategory = (0, import_enum.makeEnumParser)(BadgeCategory, "other" /* Other */);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeCategory,
  parseBadgeCategory
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VDYXRlZ29yeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBtYWtlRW51bVBhcnNlciB9IGZyb20gJy4uL3V0aWwvZW51bSc7XG5cbi8vIFRoZSBzZXJ2ZXIgbWF5IHJldHVybiBcInRlc3RpbmdcIiwgd2hpY2ggd2Ugc2hvdWxkIHBhcnNlIGFzIFwib3RoZXJcIi5cbmV4cG9ydCBlbnVtIEJhZGdlQ2F0ZWdvcnkge1xuICBEb25vciA9ICdkb25vcicsXG4gIE90aGVyID0gJ290aGVyJyxcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlQmFkZ2VDYXRlZ29yeSA9IG1ha2VFbnVtUGFyc2VyKFxuICBCYWRnZUNhdGVnb3J5LFxuICBCYWRnZUNhdGVnb3J5Lk90aGVyXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBK0I7QUFHeEIsSUFBSyxnQkFBTCxrQkFBSyxtQkFBTDtBQUNMLDRCQUFRO0FBQ1IsNEJBQVE7QUFGRTtBQUFBO0FBS0wsTUFBTSxxQkFBcUIsZ0NBQ2hDLGVBQ0EsbUJBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
