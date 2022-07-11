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
var ProfileChangeNotification_exports = {};
__export(ProfileChangeNotification_exports, {
  ProfileChangeNotification: () => ProfileChangeNotification
});
module.exports = __toCommonJS(ProfileChangeNotification_exports);
var import_react = __toESM(require("react"));
var import_SystemMessage = require("./SystemMessage");
var import_Emojify = require("./Emojify");
var import_getStringForProfileChange = require("../../util/getStringForProfileChange");
function ProfileChangeNotification(props) {
  const { change, changedContact, i18n } = props;
  const message = (0, import_getStringForProfileChange.getStringForProfileChange)(change, changedContact, i18n);
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    icon: "profile",
    contents: /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
      text: message
    })
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProfileChangeNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgU3lzdGVtTWVzc2FnZSB9IGZyb20gJy4vU3lzdGVtTWVzc2FnZSc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9FbW9qaWZ5JztcbmltcG9ydCB0eXBlIHsgUHJvZmlsZU5hbWVDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRTdHJpbmdGb3JQcm9maWxlQ2hhbmdlJztcbmltcG9ydCB7IGdldFN0cmluZ0ZvclByb2ZpbGVDaGFuZ2UgfSBmcm9tICcuLi8uLi91dGlsL2dldFN0cmluZ0ZvclByb2ZpbGVDaGFuZ2UnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNoYW5nZTogUHJvZmlsZU5hbWVDaGFuZ2VUeXBlO1xuICBjaGFuZ2VkQ29udGFjdDogQ29udmVyc2F0aW9uVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uKHByb3BzOiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IHsgY2hhbmdlLCBjaGFuZ2VkQ29udGFjdCwgaTE4biB9ID0gcHJvcHM7XG4gIGNvbnN0IG1lc3NhZ2UgPSBnZXRTdHJpbmdGb3JQcm9maWxlQ2hhbmdlKGNoYW5nZSwgY2hhbmdlZENvbnRhY3QsIGkxOG4pO1xuXG4gIHJldHVybiA8U3lzdGVtTWVzc2FnZSBpY29uPVwicHJvZmlsZVwiIGNvbnRlbnRzPXs8RW1vamlmeSB0ZXh0PXttZXNzYWdlfSAvPn0gLz47XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBSWxCLDJCQUE4QjtBQUM5QixxQkFBd0I7QUFFeEIsdUNBQTBDO0FBUW5DLG1DQUFtQyxPQUErQjtBQUN2RSxRQUFNLEVBQUUsUUFBUSxnQkFBZ0IsU0FBUztBQUN6QyxRQUFNLFVBQVUsZ0VBQTBCLFFBQVEsZ0JBQWdCLElBQUk7QUFFdEUsU0FBTyxtREFBQztBQUFBLElBQWMsTUFBSztBQUFBLElBQVUsVUFBVSxtREFBQztBQUFBLE1BQVEsTUFBTTtBQUFBLEtBQVM7QUFBQSxHQUFJO0FBQzdFO0FBTGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
