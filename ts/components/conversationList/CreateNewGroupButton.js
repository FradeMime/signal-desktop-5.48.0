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
var CreateNewGroupButton_exports = {};
__export(CreateNewGroupButton_exports, {
  CreateNewGroupButton: () => CreateNewGroupButton
});
module.exports = __toCommonJS(CreateNewGroupButton_exports);
var import_react = __toESM(require("react"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
const CreateNewGroupButton = import_react.default.memo(/* @__PURE__ */ __name(function CreateNewGroupButton2({ i18n, onClick }) {
  const title = i18n("createNewGroupButton");
  return /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest: false,
    conversationType: "group",
    headerName: title,
    i18n,
    isMe: false,
    isSelected: false,
    onClick,
    sharedGroupNames: [],
    title
  });
}, "CreateNewGroupButton"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateNewGroupButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3JlYXRlTmV3R3JvdXBCdXR0b24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBCYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW0gfSBmcm9tICcuL0Jhc2VDb252ZXJzYXRpb25MaXN0SXRlbSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgQ3JlYXRlTmV3R3JvdXBCdXR0b246IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzVHlwZT4gPSBSZWFjdC5tZW1vKFxuICBmdW5jdGlvbiBDcmVhdGVOZXdHcm91cEJ1dHRvbih7IGkxOG4sIG9uQ2xpY2sgfSkge1xuICAgIGNvbnN0IHRpdGxlID0gaTE4bignY3JlYXRlTmV3R3JvdXBCdXR0b24nKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8QmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e2ZhbHNlfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZ3JvdXBcIlxuICAgICAgICBoZWFkZXJOYW1lPXt0aXRsZX1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIGlzU2VsZWN0ZWQ9e2ZhbHNlfVxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUVsQixzQ0FBeUM7QUFRbEMsTUFBTSx1QkFBcUQscUJBQU0sS0FDdEUsc0RBQThCLEVBQUUsTUFBTSxXQUFXO0FBQy9DLFFBQU0sUUFBUSxLQUFLLHNCQUFzQjtBQUV6QyxTQUNFLG1EQUFDO0FBQUEsSUFDQyx3QkFBd0I7QUFBQSxJQUN4QixrQkFBaUI7QUFBQSxJQUNqQixZQUFZO0FBQUEsSUFDWjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1o7QUFBQSxJQUNBLGtCQUFrQixDQUFDO0FBQUEsSUFDbkI7QUFBQSxHQUNGO0FBRUosR0FoQkEsdUJBaUJGOyIsCiAgIm5hbWVzIjogW10KfQo=
