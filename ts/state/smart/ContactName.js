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
var ContactName_exports = {};
__export(ContactName_exports, {
  SmartContactName: () => SmartContactName
});
module.exports = __toCommonJS(ContactName_exports);
var React = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_ContactName = require("../../components/conversation/ContactName");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
const SmartContactName = /* @__PURE__ */ __name((props) => {
  const { conversationId } = props;
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const getConversation = (0, import_react_redux.useSelector)(import_conversations.getConversationSelector);
  const conversation = getConversation(conversationId) || {
    title: i18n("unknownContact")
  };
  return /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
    firstName: conversation.firstName,
    title: conversation.title
  });
}, "SmartContactName");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartContactName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdE5hbWUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuXG5pbXBvcnQgeyBDb250YWN0TmFtZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL0NvbnRhY3ROYW1lJztcblxuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB0eXBlIHsgR2V0Q29udmVyc2F0aW9uQnlJZFR5cGUgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25TZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9jb252ZXJzYXRpb25zJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbnR5cGUgRXh0ZXJuYWxQcm9wcyA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBTbWFydENvbnRhY3ROYW1lOiBSZWFjdC5Db21wb25lbnRUeXBlPEV4dGVybmFsUHJvcHM+ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGNvbnZlcnNhdGlvbklkIH0gPSBwcm9wcztcbiAgY29uc3QgaTE4biA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgTG9jYWxpemVyVHlwZT4oZ2V0SW50bCk7XG4gIGNvbnN0IGdldENvbnZlcnNhdGlvbiA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgR2V0Q29udmVyc2F0aW9uQnlJZFR5cGU+KFxuICAgIGdldENvbnZlcnNhdGlvblNlbGVjdG9yXG4gICk7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkKSB8fCB7XG4gICAgdGl0bGU6IGkxOG4oJ3Vua25vd25Db250YWN0JyksXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFjdE5hbWVcbiAgICAgIGZpcnN0TmFtZT17Y29udmVyc2F0aW9uLmZpcnN0TmFtZX1cbiAgICAgIHRpdGxlPXtjb252ZXJzYXRpb24udGl0bGV9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQTRCO0FBRzVCLHlCQUE0QjtBQUU1QixrQkFBd0I7QUFFeEIsMkJBQXdDO0FBUWpDLE1BQU0sbUJBQXVELGtDQUFTO0FBQzNFLFFBQU0sRUFBRSxtQkFBbUI7QUFDM0IsUUFBTSxPQUFPLG9DQUFzQyxtQkFBTztBQUMxRCxRQUFNLGtCQUFrQixvQ0FDdEIsNENBQ0Y7QUFFQSxRQUFNLGVBQWUsZ0JBQWdCLGNBQWMsS0FBSztBQUFBLElBQ3RELE9BQU8sS0FBSyxnQkFBZ0I7QUFBQSxFQUM5QjtBQUVBLFNBQ0Usb0NBQUM7QUFBQSxJQUNDLFdBQVcsYUFBYTtBQUFBLElBQ3hCLE9BQU8sYUFBYTtBQUFBLEdBQ3RCO0FBRUosR0FqQm9FOyIsCiAgIm5hbWVzIjogW10KfQo=
