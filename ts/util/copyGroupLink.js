var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var copyGroupLink_exports = {};
__export(copyGroupLink_exports, {
  copyGroupLink: () => copyGroupLink
});
module.exports = __toCommonJS(copyGroupLink_exports);
var import_showToast = require("./showToast");
var import_ToastGroupLinkCopied = require("../components/ToastGroupLinkCopied");
async function copyGroupLink(groupLink) {
  await window.navigator.clipboard.writeText(groupLink);
  (0, import_showToast.showToast)(import_ToastGroupLinkCopied.ToastGroupLinkCopied);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyGroupLink
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29weUdyb3VwTGluay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tICcuL3Nob3dUb2FzdCc7XG5pbXBvcnQgeyBUb2FzdEdyb3VwTGlua0NvcGllZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RHcm91cExpbmtDb3BpZWQnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUdyb3VwTGluayhncm91cExpbms6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCB3aW5kb3cubmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZ3JvdXBMaW5rKTtcbiAgc2hvd1RvYXN0KFRvYXN0R3JvdXBMaW5rQ29waWVkKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx1QkFBMEI7QUFDMUIsa0NBQXFDO0FBRXJDLDZCQUFvQyxXQUFrQztBQUNwRSxRQUFNLE9BQU8sVUFBVSxVQUFVLFVBQVUsU0FBUztBQUNwRCxrQ0FBVSxnREFBb0I7QUFDaEM7QUFIc0IiLAogICJuYW1lcyI6IFtdCn0K
