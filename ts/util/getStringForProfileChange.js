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
var getStringForProfileChange_exports = {};
__export(getStringForProfileChange_exports, {
  getStringForProfileChange: () => getStringForProfileChange
});
module.exports = __toCommonJS(getStringForProfileChange_exports);
function getStringForProfileChange(change, changedContact, i18n) {
  if (change.type === "name") {
    return changedContact.name ? i18n("contactChangedProfileName", {
      sender: changedContact.title,
      oldProfile: change.oldName,
      newProfile: change.newName
    }) : i18n("changedProfileName", {
      oldProfile: change.oldName,
      newProfile: change.newName
    });
  }
  throw new Error("TimelineItem: Unknown type!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStringForProfileChange
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RyaW5nRm9yUHJvZmlsZUNoYW5nZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvZmlsZU5hbWVDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAnbmFtZSc7XG4gIG9sZE5hbWU6IHN0cmluZztcbiAgbmV3TmFtZTogc3RyaW5nO1xufTtcbnR5cGUgQ29udGFjdFR5cGUgPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nRm9yUHJvZmlsZUNoYW5nZShcbiAgY2hhbmdlOiBQcm9maWxlTmFtZUNoYW5nZVR5cGUsXG4gIGNoYW5nZWRDb250YWN0OiBDb250YWN0VHlwZSxcbiAgaTE4bjogTG9jYWxpemVyVHlwZVxuKTogc3RyaW5nIHtcbiAgaWYgKGNoYW5nZS50eXBlID09PSAnbmFtZScpIHtcbiAgICByZXR1cm4gY2hhbmdlZENvbnRhY3QubmFtZVxuICAgICAgPyBpMThuKCdjb250YWN0Q2hhbmdlZFByb2ZpbGVOYW1lJywge1xuICAgICAgICAgIHNlbmRlcjogY2hhbmdlZENvbnRhY3QudGl0bGUsXG4gICAgICAgICAgb2xkUHJvZmlsZTogY2hhbmdlLm9sZE5hbWUsXG4gICAgICAgICAgbmV3UHJvZmlsZTogY2hhbmdlLm5ld05hbWUsXG4gICAgICAgIH0pXG4gICAgICA6IGkxOG4oJ2NoYW5nZWRQcm9maWxlTmFtZScsIHtcbiAgICAgICAgICBvbGRQcm9maWxlOiBjaGFuZ2Uub2xkTmFtZSxcbiAgICAgICAgICBuZXdQcm9maWxlOiBjaGFuZ2UubmV3TmFtZSxcbiAgICAgICAgfSk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1RpbWVsaW5lSXRlbTogVW5rbm93biB0eXBlIScpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWVPLG1DQUNMLFFBQ0EsZ0JBQ0EsTUFDUTtBQUNSLE1BQUksT0FBTyxTQUFTLFFBQVE7QUFDMUIsV0FBTyxlQUFlLE9BQ2xCLEtBQUssNkJBQTZCO0FBQUEsTUFDaEMsUUFBUSxlQUFlO0FBQUEsTUFDdkIsWUFBWSxPQUFPO0FBQUEsTUFDbkIsWUFBWSxPQUFPO0FBQUEsSUFDckIsQ0FBQyxJQUNELEtBQUssc0JBQXNCO0FBQUEsTUFDekIsWUFBWSxPQUFPO0FBQUEsTUFDbkIsWUFBWSxPQUFPO0FBQUEsSUFDckIsQ0FBQztBQUFBLEVBQ1A7QUFFQSxRQUFNLElBQUksTUFBTSw2QkFBNkI7QUFDL0M7QUFuQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
