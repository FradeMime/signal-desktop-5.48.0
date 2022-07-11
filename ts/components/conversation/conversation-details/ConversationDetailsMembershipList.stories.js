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
var ConversationDetailsMembershipList_stories_exports = {};
__export(ConversationDetailsMembershipList_stories_exports, {
  CanAddNewMembers: () => CanAddNewMembers,
  Few: () => Few,
  Limit: () => Limit,
  Limit1: () => Limit1,
  Limit2: () => Limit2,
  Many: () => Many,
  None: () => None,
  default: () => ConversationDetailsMembershipList_stories_default
});
module.exports = __toCommonJS(ConversationDetailsMembershipList_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_Util = require("../../../types/Util");
var import_ConversationDetailsMembershipList = require("./ConversationDetailsMembershipList");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationDetailsMembershipList_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationDetailsMembershipList"
};
const createMemberships = /* @__PURE__ */ __name((numberOfMemberships = 10) => {
  return Array.from(new Array((0, import_addon_knobs.number)("number of memberships", numberOfMemberships))).map((_, i) => ({
    isAdmin: i % 3 === 0,
    member: (0, import_getDefaultConversation.getDefaultConversation)({
      isMe: i === 2
    })
  }));
}, "createMemberships");
const createProps = /* @__PURE__ */ __name((overrideProps) => ({
  canAddNewMembers: (0, import_lodash.isBoolean)(overrideProps.canAddNewMembers) ? overrideProps.canAddNewMembers : false,
  conversationId: "123",
  getPreferredBadge: () => void 0,
  i18n,
  memberships: overrideProps.memberships || [],
  showContactModal: (0, import_addon_actions.action)("showContactModal"),
  startAddingNewMembers: (0, import_addon_actions.action)("startAddingNewMembers"),
  theme: import_Util.ThemeType.light
}), "createProps");
const Few = /* @__PURE__ */ __name(() => {
  const memberships = createMemberships(3);
  const props = createProps({ memberships });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "Few");
const Limit = /* @__PURE__ */ __name(() => {
  const memberships = createMemberships(5);
  const props = createProps({ memberships });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "Limit");
const Limit1 = /* @__PURE__ */ __name(() => {
  const memberships = createMemberships(6);
  const props = createProps({ memberships });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "Limit1");
Limit1.story = {
  name: "Limit +1"
};
const Limit2 = /* @__PURE__ */ __name(() => {
  const memberships = createMemberships(7);
  const props = createProps({ memberships });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "Limit2");
Limit2.story = {
  name: "Limit +2"
};
const Many = /* @__PURE__ */ __name(() => {
  const memberships = createMemberships(100);
  const props = createProps({ memberships });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "Many");
const None = /* @__PURE__ */ __name(() => {
  const props = createProps({ memberships: [] });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "None");
const CanAddNewMembers = /* @__PURE__ */ __name(() => {
  const memberships = createMemberships(10);
  const props = createProps({ canAddNewMembers: true, memberships });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    ...props
  });
}, "CanAddNewMembers");
CanAddNewMembers.story = {
  name: "Can add new members"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CanAddNewMembers,
  Few,
  Limit,
  Limit1,
  Limit2,
  Many,
  None
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcblxuaW1wb3J0IHR5cGUge1xuICBQcm9wcyxcbiAgR3JvdXBWMk1lbWJlcnNoaXAsXG59IGZyb20gJy4vQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0JztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCB9IGZyb20gJy4vQ29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTpcbiAgICAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ29udmVyc2F0aW9uRGV0YWlscy9Db252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3QnLFxufTtcblxuY29uc3QgY3JlYXRlTWVtYmVyc2hpcHMgPSAoXG4gIG51bWJlck9mTWVtYmVyc2hpcHMgPSAxMFxuKTogQXJyYXk8R3JvdXBWMk1lbWJlcnNoaXA+ID0+IHtcbiAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgbmV3IEFycmF5KG51bWJlcignbnVtYmVyIG9mIG1lbWJlcnNoaXBzJywgbnVtYmVyT2ZNZW1iZXJzaGlwcykpXG4gICkubWFwKFxuICAgIChfLCBpKTogR3JvdXBWMk1lbWJlcnNoaXAgPT4gKHtcbiAgICAgIGlzQWRtaW46IGkgJSAzID09PSAwLFxuICAgICAgbWVtYmVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaXNNZTogaSA9PT0gMixcbiAgICAgIH0pLFxuICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPik6IFByb3BzID0+ICh7XG4gIGNhbkFkZE5ld01lbWJlcnM6IGlzQm9vbGVhbihvdmVycmlkZVByb3BzLmNhbkFkZE5ld01lbWJlcnMpXG4gICAgPyBvdmVycmlkZVByb3BzLmNhbkFkZE5ld01lbWJlcnNcbiAgICA6IGZhbHNlLFxuICBjb252ZXJzYXRpb25JZDogJzEyMycsXG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiB1bmRlZmluZWQsXG4gIGkxOG4sXG4gIG1lbWJlcnNoaXBzOiBvdmVycmlkZVByb3BzLm1lbWJlcnNoaXBzIHx8IFtdLFxuICBzaG93Q29udGFjdE1vZGFsOiBhY3Rpb24oJ3Nob3dDb250YWN0TW9kYWwnKSxcbiAgc3RhcnRBZGRpbmdOZXdNZW1iZXJzOiBhY3Rpb24oJ3N0YXJ0QWRkaW5nTmV3TWVtYmVycycpLFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxufSk7XG5cbmV4cG9ydCBjb25zdCBGZXcgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBtZW1iZXJzaGlwcyA9IGNyZWF0ZU1lbWJlcnNoaXBzKDMpO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBtZW1iZXJzaGlwcyB9KTtcblxuICByZXR1cm4gPENvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IExpbWl0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgbWVtYmVyc2hpcHMgPSBjcmVhdGVNZW1iZXJzaGlwcyg1KTtcblxuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgbWVtYmVyc2hpcHMgfSk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3Qgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBMaW1pdDEgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBtZW1iZXJzaGlwcyA9IGNyZWF0ZU1lbWJlcnNoaXBzKDYpO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBtZW1iZXJzaGlwcyB9KTtcblxuICByZXR1cm4gPENvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuTGltaXQxLnN0b3J5ID0ge1xuICBuYW1lOiAnTGltaXQgKzEnLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbWl0MiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lbWJlcnNoaXBzID0gY3JlYXRlTWVtYmVyc2hpcHMoNyk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IG1lbWJlcnNoaXBzIH0pO1xuXG4gIHJldHVybiA8Q29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0IHsuLi5wcm9wc30gLz47XG59O1xuXG5MaW1pdDIuc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW1pdCArMicsXG59O1xuXG5leHBvcnQgY29uc3QgTWFueSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lbWJlcnNoaXBzID0gY3JlYXRlTWVtYmVyc2hpcHMoMTAwKTtcblxuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgbWVtYmVyc2hpcHMgfSk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3Qgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb25lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IG1lbWJlcnNoaXBzOiBbXSB9KTtcblxuICByZXR1cm4gPENvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IENhbkFkZE5ld01lbWJlcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBtZW1iZXJzaGlwcyA9IGNyZWF0ZU1lbWJlcnNoaXBzKDEwKTtcblxuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgY2FuQWRkTmV3TWVtYmVyczogdHJ1ZSwgbWVtYmVyc2hpcHMgfSk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3Qgey4uLnByb3BzfSAvPjtcbn07XG5cbkNhbkFkZE5ld01lbWJlcnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdDYW4gYWRkIG5ldyBtZW1iZXJzJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixvQkFBMEI7QUFFMUIsMkJBQXVCO0FBQ3ZCLHlCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG9DQUF1QztBQUN2QyxrQkFBMEI7QUFNMUIsK0NBQWtEO0FBRWxELE1BQU0sT0FBTyxnQ0FBVSxN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
