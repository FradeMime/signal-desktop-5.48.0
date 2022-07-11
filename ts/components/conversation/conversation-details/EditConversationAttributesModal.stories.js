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
var EditConversationAttributesModal_stories_exports = {};
__export(EditConversationAttributesModal_stories_exports, {
  AvatarAndTitle: () => AvatarAndTitle,
  HasError: () => HasError,
  InitiallyFocusingDescription: () => InitiallyFocusingDescription,
  NoAvatarEmptyTitle: () => NoAvatarEmptyTitle,
  RequestActive: () => RequestActive,
  default: () => EditConversationAttributesModal_stories_default
});
module.exports = __toCommonJS(EditConversationAttributesModal_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_EditConversationAttributesModal = require("./EditConversationAttributesModal");
var import_util = require("./util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var EditConversationAttributesModal_stories_default = {
  title: "Components/Conversation/ConversationDetails/EditConversationAttributesModal"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarPath: void 0,
  conversationId: "123",
  i18n,
  initiallyFocusDescription: false,
  onClose: (0, import_addon_actions.action)("onClose"),
  makeRequest: (0, import_addon_actions.action)("onMakeRequest"),
  requestState: import_util.RequestState.Inactive,
  title: "Bing Bong Group",
  deleteAvatarFromDisk: (0, import_addon_actions.action)("deleteAvatarFromDisk"),
  replaceAvatar: (0, import_addon_actions.action)("replaceAvatar"),
  saveAvatarToDisk: (0, import_addon_actions.action)("saveAvatarToDisk"),
  userAvatarData: [],
  ...overrideProps
}), "createProps");
const NoAvatarEmptyTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_EditConversationAttributesModal.EditConversationAttributesModal, {
  ...createProps({ title: "" })
}), "NoAvatarEmptyTitle");
NoAvatarEmptyTitle.story = {
  name: "No avatar, empty title"
};
const AvatarAndTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_EditConversationAttributesModal.EditConversationAttributesModal, {
  ...createProps({
    avatarPath: "/fixtures/kitten-3-64-64.jpg"
  })
}), "AvatarAndTitle");
AvatarAndTitle.story = {
  name: "Avatar and title"
};
const InitiallyFocusingDescription = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_EditConversationAttributesModal.EditConversationAttributesModal, {
  ...createProps({ title: "Has title", initiallyFocusDescription: true })
}), "InitiallyFocusingDescription");
InitiallyFocusingDescription.story = {
  name: "Initially focusing description"
};
const RequestActive = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_EditConversationAttributesModal.EditConversationAttributesModal, {
  ...createProps({ requestState: import_util.RequestState.Active })
}), "RequestActive");
RequestActive.story = {
  name: "Request active"
};
const HasError = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_EditConversationAttributesModal.EditConversationAttributesModal, {
  ...createProps({ requestState: import_util.RequestState.InactiveWithError })
}), "HasError");
HasError.story = {
  name: "Has error"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarAndTitle,
  HasError,
  InitiallyFocusingDescription,
  NoAvatarEmptyTitle,
  RequestActive
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBFZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsIH0gZnJvbSAnLi9FZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsJztcbmltcG9ydCB7IFJlcXVlc3RTdGF0ZSB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6XG4gICAgJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0NvbnZlcnNhdGlvbkRldGFpbHMvRWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbCcsXG59O1xuXG50eXBlIFByb3BzVHlwZSA9IENvbXBvbmVudFByb3BzPHR5cGVvZiBFZGl0Q29udmVyc2F0aW9uQXR0cmlidXRlc01vZGFsPjtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXZhdGFyUGF0aDogdW5kZWZpbmVkLFxuICBjb252ZXJzYXRpb25JZDogJzEyMycsXG4gIGkxOG4sXG4gIGluaXRpYWxseUZvY3VzRGVzY3JpcHRpb246IGZhbHNlLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgbWFrZVJlcXVlc3Q6IGFjdGlvbignb25NYWtlUmVxdWVzdCcpLFxuICByZXF1ZXN0U3RhdGU6IFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZSxcbiAgdGl0bGU6ICdCaW5nIEJvbmcgR3JvdXAnLFxuICBkZWxldGVBdmF0YXJGcm9tRGlzazogYWN0aW9uKCdkZWxldGVBdmF0YXJGcm9tRGlzaycpLFxuICByZXBsYWNlQXZhdGFyOiBhY3Rpb24oJ3JlcGxhY2VBdmF0YXInKSxcbiAgc2F2ZUF2YXRhclRvRGlzazogYWN0aW9uKCdzYXZlQXZhdGFyVG9EaXNrJyksXG4gIHVzZXJBdmF0YXJEYXRhOiBbXSxcbiAgLi4ub3ZlcnJpZGVQcm9wcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgTm9BdmF0YXJFbXB0eVRpdGxlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEVkaXRDb252ZXJzYXRpb25BdHRyaWJ1dGVzTW9kYWwgey4uLmNyZWF0ZVByb3BzKHsgdGl0bGU6ICcnIH0pfSAvPlxuKTtcblxuTm9BdmF0YXJFbXB0eVRpdGxlLnN0b3J5ID0ge1xuICBuYW1lOiAnTm8gYXZhdGFyLCBlbXB0eSB0aXRsZScsXG59O1xuXG5leHBvcnQgY29uc3QgQXZhdGFyQW5kVGl0bGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhdmF0YXJQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi0zLTY0LTY0LmpwZycsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5BdmF0YXJBbmRUaXRsZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0F2YXRhciBhbmQgdGl0bGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEluaXRpYWxseUZvY3VzaW5nRGVzY3JpcHRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7IHRpdGxlOiAnSGFzIHRpdGxlJywgaW5pdGlhbGx5Rm9jdXNEZXNjcmlwdGlvbjogdHJ1ZSB9KX1cbiAgLz5cbik7XG5cbkluaXRpYWxseUZvY3VzaW5nRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdJbml0aWFsbHkgZm9jdXNpbmcgZGVzY3JpcHRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IFJlcXVlc3RBY3RpdmUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7IHJlcXVlc3RTdGF0ZTogUmVxdWVzdFN0YXRlLkFjdGl2ZSB9KX1cbiAgLz5cbik7XG5cblJlcXVlc3RBY3RpdmUuc3RvcnkgPSB7XG4gIG5hbWU6ICdSZXF1ZXN0IGFjdGl2ZScsXG59O1xuXG5leHBvcnQgY29uc3QgSGFzRXJyb3IgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7IHJlcXVlc3RTdGF0ZTogUmVxdWVzdFN0YXRlLkluYWN0aXZlV2l0aEVycm9yIH0pfVxuICAvPlxuKTtcblxuSGFzRXJyb3Iuc3RvcnkgPSB7XG4gIG5hbWU6ICdIYXMgZXJyb3InLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLDZDQUFnRDtBQUNoRCxrQkFBNkI7QUFFN0IsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxrREFBUTtBQUFBLEVBQ2IsT0FDRTtBQUNKO0FBSUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsWUFBWTtBQUFBLEVBQ1osZ0JBQWdCO0FBQUEsRUFDaEI7QUFBQSxFQUNBLDJCQUEyQjtBQUFBLEVBQzNCLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLGFBQWEsaUNBQU8sZUFBZTtBQUFBLEVBQ25DLGNBQWMseUJBQWE7QUFBQSxFQUMzQixPQUFPO0FBQUEsRUFDUCxzQkFBc0IsaUNBQU8sc0JBQXNCO0FBQUEsRUFDbkQsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsRUFDckMsa0JBQWtCLGlDQUFPLGtCQUFrQjtBQUFBLEVBQzNDLGdCQUFnQixDQUFDO0FBQUEsS0FDZDtBQUNMLElBZG9CO0FBZ0JiLE1BQU0scUJBQXFCLDZCQUNoQyxtREFBQztBQUFBLEtBQW9DLFlBQVksRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUFBLENBQUcsR0FEakM7QUFJbEMsbUJBQW1CLFFBQVE7QUFBQSxFQUN6QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGlCQUFpQiw2QkFDNUIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFBQSxDQUNILEdBTDRCO0FBUTlCLGVBQWUsUUFBUTtBQUFBLEVBQ3JCLE1BQU07QUFDUjtBQUVPLE1BQU0sK0JBQStCLDZCQUMxQyxtREFBQztBQUFBLEtBQ0ssWUFBWSxFQUFFLE9BQU8sYUFBYSwyQkFBMkIsS0FBSyxDQUFDO0FBQUEsQ0FDekUsR0FIMEM7QUFNNUMsNkJBQTZCLFFBQVE7QUFBQSxFQUNuQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLGdCQUFnQiw2QkFDM0IsbURBQUM7QUFBQSxLQUNLLFlBQVksRUFBRSxjQUFjLHlCQUFhLE9BQU8sQ0FBQztBQUFBLENBQ3ZELEdBSDJCO0FBTTdCLGNBQWMsUUFBUTtBQUFBLEVBQ3BCLE1BQU07QUFDUjtBQUVPLE1BQU0sV0FBVyw2QkFDdEIsbURBQUM7QUFBQSxLQUNLLFlBQVksRUFBRSxjQUFjLHlCQUFhLGtCQUFrQixDQUFDO0FBQUEsQ0FDbEUsR0FIc0I7QUFNeEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
