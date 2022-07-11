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
var ContactPills_stories_exports = {};
__export(ContactPills_stories_exports, {
  EmptyList: () => EmptyList,
  FiftyContacts: () => FiftyContacts,
  FourContactsOneWithALongName: () => FourContactsOneWithALongName,
  OneContact: () => OneContact,
  ThreeContacts: () => ThreeContacts,
  default: () => ContactPills_stories_default
});
module.exports = __toCommonJS(ContactPills_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_ContactPills = require("./ContactPills");
var import_ContactPill = require("./ContactPill");
var import_Fixtures = require("../storybook/Fixtures");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ContactPills_stories_default = {
  title: "Components/Contact Pills"
};
const contacts = (0, import_lodash.times)(50, (index) => (0, import_getDefaultConversation.getDefaultConversation)({
  id: `contact-${index}`,
  name: `Contact ${index}`,
  phoneNumber: "(202) 555-0001",
  profileName: `C${index}`,
  title: `Contact ${index}`
}));
const contactPillProps = /* @__PURE__ */ __name((overrideProps) => ({
  ...overrideProps ?? (0, import_getDefaultConversation.getDefaultConversation)({
    avatarPath: import_Fixtures.gifUrl,
    firstName: "John",
    id: "abc123",
    isMe: false,
    name: "John Bon Bon Jovi",
    phoneNumber: "(202) 555-0001",
    profileName: "JohnB",
    title: "John Bon Bon Jovi"
  }),
  i18n,
  onClickRemove: (0, import_addon_actions.action)("onClickRemove")
}), "contactPillProps");
const EmptyList = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactPills.ContactPills, null), "EmptyList");
EmptyList.story = {
  name: "Empty list"
};
const OneContact = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactPills.ContactPills, null, /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps()
})), "OneContact");
OneContact.story = {
  name: "One contact"
};
const ThreeContacts = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactPills.ContactPills, null, /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps(contacts[0])
}), /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps(contacts[1])
}), /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps(contacts[2])
})), "ThreeContacts");
ThreeContacts.story = {
  name: "Three contacts"
};
const FourContactsOneWithALongName = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactPills.ContactPills, null, /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps(contacts[0])
}), /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps({
    ...contacts[1],
    title: "Pablo Diego Jos\xE9 Francisco de Paula Juan Nepomuceno Mar\xEDa de los Remedios Cipriano de la Sant\xEDsima Trinidad Ruiz y Picasso"
  })
}), /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps(contacts[2])
}), /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  ...contactPillProps(contacts[3])
})), "FourContactsOneWithALongName");
FourContactsOneWithALongName.story = {
  name: "Four contacts, one with a long name"
};
const FiftyContacts = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactPills.ContactPills, null, contacts.map((contact) => /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
  key: contact.id,
  ...contactPillProps(contact)
}))), "FiftyContacts");
FiftyContacts.story = {
  name: "Fifty contacts"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyList,
  FiftyContacts,
  FourContactsOneWithALongName,
  OneContact,
  ThreeContacts
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFBpbGxzLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgQ29udGFjdFBpbGxzIH0gZnJvbSAnLi9Db250YWN0UGlsbHMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgQ29udGFjdFBpbGxQcm9wc1R5cGUgfSBmcm9tICcuL0NvbnRhY3RQaWxsJztcbmltcG9ydCB7IENvbnRhY3RQaWxsIH0gZnJvbSAnLi9Db250YWN0UGlsbCc7XG5pbXBvcnQgeyBnaWZVcmwgfSBmcm9tICcuLi9zdG9yeWJvb2svRml4dHVyZXMnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db250YWN0IFBpbGxzJyxcbn07XG5cbnR5cGUgQ29udGFjdFR5cGUgPSBPbWl0PENvbnRhY3RQaWxsUHJvcHNUeXBlLCAnaTE4bicgfCAnb25DbGlja1JlbW92ZSc+O1xuXG5jb25zdCBjb250YWN0czogQXJyYXk8Q29udGFjdFR5cGU+ID0gdGltZXMoNTAsIGluZGV4ID0+XG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIGlkOiBgY29udGFjdC0ke2luZGV4fWAsXG4gICAgbmFtZTogYENvbnRhY3QgJHtpbmRleH1gLFxuICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTAwMDEnLFxuICAgIHByb2ZpbGVOYW1lOiBgQyR7aW5kZXh9YCxcbiAgICB0aXRsZTogYENvbnRhY3QgJHtpbmRleH1gLFxuICB9KVxuKTtcblxuY29uc3QgY29udGFjdFBpbGxQcm9wcyA9IChcbiAgb3ZlcnJpZGVQcm9wcz86IENvbnRhY3RUeXBlXG4pOiBDb250YWN0UGlsbFByb3BzVHlwZSA9PiAoe1xuICAuLi4ob3ZlcnJpZGVQcm9wcyA/P1xuICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgYXZhdGFyUGF0aDogZ2lmVXJsLFxuICAgICAgZmlyc3ROYW1lOiAnSm9obicsXG4gICAgICBpZDogJ2FiYzEyMycsXG4gICAgICBpc01lOiBmYWxzZSxcbiAgICAgIG5hbWU6ICdKb2huIEJvbiBCb24gSm92aScsXG4gICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0wMDAxJyxcbiAgICAgIHByb2ZpbGVOYW1lOiAnSm9obkInLFxuICAgICAgdGl0bGU6ICdKb2huIEJvbiBCb24gSm92aScsXG4gICAgfSkpLFxuICBpMThuLFxuICBvbkNsaWNrUmVtb3ZlOiBhY3Rpb24oJ29uQ2xpY2tSZW1vdmUnKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgRW1wdHlMaXN0ID0gKCk6IEpTWC5FbGVtZW50ID0+IDxDb250YWN0UGlsbHMgLz47XG5cbkVtcHR5TGlzdC5zdG9yeSA9IHtcbiAgbmFtZTogJ0VtcHR5IGxpc3QnLFxufTtcblxuZXhwb3J0IGNvbnN0IE9uZUNvbnRhY3QgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udGFjdFBpbGxzPlxuICAgIDxDb250YWN0UGlsbCB7Li4uY29udGFjdFBpbGxQcm9wcygpfSAvPlxuICA8L0NvbnRhY3RQaWxscz5cbik7XG5cbk9uZUNvbnRhY3Quc3RvcnkgPSB7XG4gIG5hbWU6ICdPbmUgY29udGFjdCcsXG59O1xuXG5leHBvcnQgY29uc3QgVGhyZWVDb250YWN0cyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb250YWN0UGlsbHM+XG4gICAgPENvbnRhY3RQaWxsIHsuLi5jb250YWN0UGlsbFByb3BzKGNvbnRhY3RzWzBdKX0gLz5cbiAgICA8Q29udGFjdFBpbGwgey4uLmNvbnRhY3RQaWxsUHJvcHMoY29udGFjdHNbMV0pfSAvPlxuICAgIDxDb250YWN0UGlsbCB7Li4uY29udGFjdFBpbGxQcm9wcyhjb250YWN0c1syXSl9IC8+XG4gIDwvQ29udGFjdFBpbGxzPlxuKTtcblxuVGhyZWVDb250YWN0cy5zdG9yeSA9IHtcbiAgbmFtZTogJ1RocmVlIGNvbnRhY3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBGb3VyQ29udGFjdHNPbmVXaXRoQUxvbmdOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRhY3RQaWxscz5cbiAgICA8Q29udGFjdFBpbGwgey4uLmNvbnRhY3RQaWxsUHJvcHMoY29udGFjdHNbMF0pfSAvPlxuICAgIDxDb250YWN0UGlsbFxuICAgICAgey4uLmNvbnRhY3RQaWxsUHJvcHMoe1xuICAgICAgICAuLi5jb250YWN0c1sxXSxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgJ1BhYmxvIERpZWdvIEpvc1x1MDBFOSBGcmFuY2lzY28gZGUgUGF1bGEgSnVhbiBOZXBvbXVjZW5vIE1hclx1MDBFRGEgZGUgbG9zIFJlbWVkaW9zIENpcHJpYW5vIGRlIGxhIFNhbnRcdTAwRURzaW1hIFRyaW5pZGFkIFJ1aXogeSBQaWNhc3NvJyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICAgPENvbnRhY3RQaWxsIHsuLi5jb250YWN0UGlsbFByb3BzKGNvbnRhY3RzWzJdKX0gLz5cbiAgICA8Q29udGFjdFBpbGwgey4uLmNvbnRhY3RQaWxsUHJvcHMoY29udGFjdHNbM10pfSAvPlxuICA8L0NvbnRhY3RQaWxscz5cbik7XG5cbkZvdXJDb250YWN0c09uZVdpdGhBTG9uZ05hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdGb3VyIGNvbnRhY3RzLCBvbmUgd2l0aCBhIGxvbmcgbmFtZScsXG59O1xuXG5leHBvcnQgY29uc3QgRmlmdHlDb250YWN0cyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb250YWN0UGlsbHM+XG4gICAge2NvbnRhY3RzLm1hcChjb250YWN0ID0+IChcbiAgICAgIDxDb250YWN0UGlsbCBrZXk9e2NvbnRhY3QuaWR9IHsuLi5jb250YWN0UGlsbFByb3BzKGNvbnRhY3QpfSAvPlxuICAgICkpfVxuICA8L0NvbnRhY3RQaWxscz5cbik7XG5cbkZpZnR5Q29udGFjdHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdGaWZ0eSBjb250YWN0cycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsb0JBQXNCO0FBRXRCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLDBCQUE2QjtBQUU3Qix5QkFBNEI7QUFDNUIsc0JBQXVCO0FBQ3ZCLG9DQUF1QztBQUV2QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLCtCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFJQSxNQUFNLFdBQStCLHlCQUFNLElBQUksV0FDN0MsMERBQXVCO0FBQUEsRUFDckIsSUFBSSxXQUFXO0FBQUEsRUFDZixNQUFNLFdBQVc7QUFBQSxFQUNqQixhQUFhO0FBQUEsRUFDYixhQUFhLElBQUk7QUFBQSxFQUNqQixPQUFPLFdBQVc7QUFDcEIsQ0FBQyxDQUNIO0FBRUEsTUFBTSxtQkFBbUIsd0JBQ3ZCLGtCQUMwQjtBQUFBLEtBQ3RCLGlCQUNGLDBEQUF1QjtBQUFBLElBQ3JCLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxFQUNULENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxlQUFlLGlDQUFPLGVBQWU7QUFDdkMsSUFoQnlCO0FBa0JsQixNQUFNLFlBQVksNkJBQW1CLG1EQUFDLHNDQUFhLEdBQWpDO0FBRXpCLFVBQVUsUUFBUTtBQUFBLEVBQ2hCLE1BQU07QUFDUjtBQUVPLE1BQU0sYUFBYSw2QkFDeEIsbURBQUMsd0NBQ0MsbURBQUM7QUFBQSxLQUFnQixpQkFBaUI7QUFBQSxDQUFHLENBQ3ZDLEdBSHdCO0FBTTFCLFdBQVcsUUFBUTtBQUFBLEVBQ2pCLE1BQU07QUFDUjtBQUVPLE1BQU0sZ0JBQWdCLDZCQUMzQixtREFBQyx3Q0FDQyxtREFBQztBQUFBLEtBQWdCLGlCQUFpQixTQUFTLEVBQUU7QUFBQSxDQUFHLEdBQ2hELG1EQUFDO0FBQUEsS0FBZ0IsaUJBQWlCLFNBQVMsRUFBRTtBQUFBLENBQUcsR0FDaEQsbURBQUM7QUFBQSxLQUFnQixpQkFBaUIsU0FBUyxFQUFFO0FBQUEsQ0FBRyxDQUNsRCxHQUwyQjtBQVE3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLCtCQUErQiw2QkFDMUMsbURBQUMsd0NBQ0MsbURBQUM7QUFBQSxLQUFnQixpQkFBaUIsU0FBUyxFQUFFO0FBQUEsQ0FBRyxHQUNoRCxtREFBQztBQUFBLEtBQ0ssaUJBQWlCO0FBQUEsT0FDaEIsU0FBUztBQUFBLElBQ1osT0FDRTtBQUFBLEVBQ0osQ0FBQztBQUFBLENBQ0gsR0FDQSxtREFBQztBQUFBLEtBQWdCLGlCQUFpQixTQUFTLEVBQUU7QUFBQSxDQUFHLEdBQ2hELG1EQUFDO0FBQUEsS0FBZ0IsaUJBQWlCLFNBQVMsRUFBRTtBQUFBLENBQUcsQ0FDbEQsR0FaMEM7QUFlNUMsNkJBQTZCLFFBQVE7QUFBQSxFQUNuQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLGdCQUFnQiw2QkFDM0IsbURBQUMsd0NBQ0UsU0FBUyxJQUFJLGFBQ1osbURBQUM7QUFBQSxFQUFZLEtBQUssUUFBUTtBQUFBLEtBQVEsaUJBQWlCLE9BQU87QUFBQSxDQUFHLENBQzlELENBQ0gsR0FMMkI7QUFRN0IsY0FBYyxRQUFRO0FBQUEsRUFDcEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
