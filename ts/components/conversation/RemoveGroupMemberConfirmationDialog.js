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
var RemoveGroupMemberConfirmationDialog_exports = {};
__export(RemoveGroupMemberConfirmationDialog_exports, {
  RemoveGroupMemberConfirmationDialog: () => RemoveGroupMemberConfirmationDialog
});
module.exports = __toCommonJS(RemoveGroupMemberConfirmationDialog_exports);
var import_react = __toESM(require("react"));
var import_util = require("../../groups/util");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_Intl = require("../Intl");
var import_ContactName = require("./ContactName");
const RemoveGroupMemberConfirmationDialog = /* @__PURE__ */ __name(({ conversation, group, i18n, onClose, onRemove }) => {
  const descriptionKey = (0, import_util.isAccessControlEnabled)(group.accessControlAddFromInviteLink) ? "RemoveGroupMemberConfirmation__description__with-link" : "RemoveGroupMemberConfirmation__description";
  return /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: onRemove,
        text: i18n("RemoveGroupMemberConfirmation__remove-button"),
        style: "negative"
      }
    ],
    i18n,
    onClose,
    title: /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: descriptionKey,
      components: {
        name: /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
          title: conversation.title
        })
      }
    })
  });
}, "RemoveGroupMemberConfirmationDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveGroupMemberConfirmationDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVtb3ZlR3JvdXBNZW1iZXJDb25maXJtYXRpb25EaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgaXNBY2Nlc3NDb250cm9sRW5hYmxlZCB9IGZyb20gJy4uLy4uL2dyb3Vwcy91dGlsJztcblxuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi9JbnRsJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBncm91cDogQ29udmVyc2F0aW9uVHlwZTtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBvblJlbW92ZTogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBSZW1vdmVHcm91cE1lbWJlckNvbmZpcm1hdGlvbkRpYWxvZzogRnVuY3Rpb25Db21wb25lbnQ8XG4gIFByb3BzVHlwZVxuPiA9ICh7IGNvbnZlcnNhdGlvbiwgZ3JvdXAsIGkxOG4sIG9uQ2xvc2UsIG9uUmVtb3ZlIH0pID0+IHtcbiAgY29uc3QgZGVzY3JpcHRpb25LZXkgPSBpc0FjY2Vzc0NvbnRyb2xFbmFibGVkKFxuICAgIGdyb3VwLmFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGlua1xuICApXG4gICAgPyAnUmVtb3ZlR3JvdXBNZW1iZXJDb25maXJtYXRpb25fX2Rlc2NyaXB0aW9uX193aXRoLWxpbmsnXG4gICAgOiAnUmVtb3ZlR3JvdXBNZW1iZXJDb25maXJtYXRpb25fX2Rlc2NyaXB0aW9uJztcblxuICByZXR1cm4gKFxuICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogb25SZW1vdmUsXG4gICAgICAgICAgdGV4dDogaTE4bignUmVtb3ZlR3JvdXBNZW1iZXJDb25maXJtYXRpb25fX3JlbW92ZS1idXR0b24nKSxcbiAgICAgICAgICBzdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgfSxcbiAgICAgIF19XG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIHRpdGxlPXtcbiAgICAgICAgPEludGxcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlkPXtkZXNjcmlwdGlvbktleX1cbiAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICBuYW1lOiA8Q29udGFjdE5hbWUgdGl0bGU9e2NvbnZlcnNhdGlvbi50aXRsZX0gLz4sXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIH1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFJbEIsa0JBQXVDO0FBRXZDLGdDQUFtQztBQUNuQyxrQkFBcUI7QUFDckIseUJBQTRCO0FBVXJCLE1BQU0sc0NBRVQsd0JBQUMsRUFBRSxjQUFjLE9BQU8sTUFBTSxTQUFTLGVBQWU7QUFDeEQsUUFBTSxpQkFBaUIsd0NBQ3JCLE1BQU0sOEJBQ1IsSUFDSSwwREFDQTtBQUVKLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxRQUFRO0FBQUEsUUFDUixNQUFNLEtBQUssOENBQThDO0FBQUEsUUFDekQsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxJQUFJO0FBQUEsTUFDSixZQUFZO0FBQUEsUUFDVixNQUFNLG1EQUFDO0FBQUEsVUFBWSxPQUFPLGFBQWE7QUFBQSxTQUFPO0FBQUEsTUFDaEQ7QUFBQSxLQUNGO0FBQUEsR0FFSjtBQUVKLEdBN0JJOyIsCiAgIm5hbWVzIjogW10KfQo=
