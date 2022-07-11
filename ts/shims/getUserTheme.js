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
var getUserTheme_exports = {};
__export(getUserTheme_exports, {
  getUserTheme: () => getUserTheme
});
module.exports = __toCommonJS(getUserTheme_exports);
var import_user = require("../state/selectors/user");
function getUserTheme() {
  return (0, import_user.getTheme)(window.reduxStore.getState());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserTheme
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VXNlclRoZW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRUaGVtZSB9IGZyb20gJy4uL3N0YXRlL3NlbGVjdG9ycy91c2VyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJUaGVtZSgpOiBUaGVtZVR5cGUge1xuICByZXR1cm4gZ2V0VGhlbWUod2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsa0JBQXlCO0FBRWxCLHdCQUFtQztBQUN4QyxTQUFPLDBCQUFTLE9BQU8sV0FBVyxTQUFTLENBQUM7QUFDOUM7QUFGZ0IiLAogICJuYW1lcyI6IFtdCn0K
