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
var phoneNumberSharingMode_exports = {};
__export(phoneNumberSharingMode_exports, {
  PhoneNumberSharingMode: () => PhoneNumberSharingMode,
  parsePhoneNumberSharingMode: () => parsePhoneNumberSharingMode
});
module.exports = __toCommonJS(phoneNumberSharingMode_exports);
var import_enum = require("./enum");
var PhoneNumberSharingMode = /* @__PURE__ */ ((PhoneNumberSharingMode2) => {
  PhoneNumberSharingMode2["Everybody"] = "Everybody";
  PhoneNumberSharingMode2["ContactsOnly"] = "ContactsOnly";
  PhoneNumberSharingMode2["Nobody"] = "Nobody";
  return PhoneNumberSharingMode2;
})(PhoneNumberSharingMode || {});
const parsePhoneNumberSharingMode = (0, import_enum.makeEnumParser)(PhoneNumberSharingMode, "Everybody" /* Everybody */);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PhoneNumberSharingMode,
  parsePhoneNumberSharingMode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGhvbmVOdW1iZXJTaGFyaW5nTW9kZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBtYWtlRW51bVBhcnNlciB9IGZyb20gJy4vZW51bSc7XG5cbi8vIFRoZXNlIHN0cmluZ3MgYXJlIHNhdmVkIHRvIGRpc2ssIHNvIGJlIGNhcmVmdWwgd2hlbiBjaGFuZ2luZyB0aGVtLlxuZXhwb3J0IGVudW0gUGhvbmVOdW1iZXJTaGFyaW5nTW9kZSB7XG4gIEV2ZXJ5Ym9keSA9ICdFdmVyeWJvZHknLFxuICBDb250YWN0c09ubHkgPSAnQ29udGFjdHNPbmx5JyxcbiAgTm9ib2R5ID0gJ05vYm9keScsXG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZVBob25lTnVtYmVyU2hhcmluZ01vZGUgPSBtYWtlRW51bVBhcnNlcihcbiAgUGhvbmVOdW1iZXJTaGFyaW5nTW9kZSxcbiAgUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5FdmVyeWJvZHlcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUErQjtBQUd4QixJQUFLLHlCQUFMLGtCQUFLLDRCQUFMO0FBQ0wseUNBQVk7QUFDWiw0Q0FBZTtBQUNmLHNDQUFTO0FBSEM7QUFBQTtBQU1MLE1BQU0sOEJBQThCLGdDQUN6Qyx3QkFDQSwyQkFDRjsiLAogICJuYW1lcyI6IFtdCn0K
