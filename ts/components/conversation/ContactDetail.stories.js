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
var ContactDetail_stories_exports = {};
__export(ContactDetail_stories_exports, {
  EmptyWithAccount: () => EmptyWithAccount,
  EmptyWithoutAccount: () => EmptyWithoutAccount,
  FamilyName: () => FamilyName,
  FullyFilledOut: () => FullyFilledOut,
  GivenFamilyName: () => GivenFamilyName,
  GivenName: () => GivenName,
  LoadingAvatar: () => LoadingAvatar,
  OnlyEmail: () => OnlyEmail,
  Organization: () => Organization,
  default: () => ContactDetail_stories_default
});
module.exports = __toCommonJS(ContactDetail_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_ContactDetail = require("./ContactDetail");
var import_EmbeddedContact = require("../../types/EmbeddedContact");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_MIME = require("../../types/MIME");
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ContactDetail_stories_default = {
  title: "Components/Conversation/ContactDetail"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  contact: overrideProps.contact || {},
  hasSignalAccount: (0, import_addon_knobs.boolean)("hasSignalAccount", overrideProps.hasSignalAccount || false),
  i18n,
  onSendMessage: (0, import_addon_actions.action)("onSendMessage")
}), "createProps");
const fullContact = {
  address: [
    {
      type: import_EmbeddedContact.AddressType.HOME,
      street: "555 Main St.",
      city: "Boston",
      region: "MA",
      postcode: "33333",
      pobox: "2323-444",
      country: "US",
      neighborhood: "Garden Place"
    },
    {
      type: import_EmbeddedContact.AddressType.WORK,
      street: "333 Another St.",
      city: "Boston",
      region: "MA",
      postcode: "33344",
      pobox: "2424-555",
      country: "US",
      neighborhood: "Factory Place"
    },
    {
      type: import_EmbeddedContact.AddressType.CUSTOM,
      street: "111 Dream St.",
      city: "Miami",
      region: "FL",
      postcode: "44232",
      pobox: "111-333",
      country: "US",
      neighborhood: "BeachVille",
      label: "vacation"
    },
    {
      type: import_EmbeddedContact.AddressType.CUSTOM,
      street: "333 Fake St.",
      city: "Boston",
      region: "MA",
      postcode: "33345",
      pobox: "123-444",
      country: "US",
      neighborhood: "Downtown"
    }
  ],
  avatar: {
    avatar: (0, import_fakeAttachment.fakeAttachment)({
      path: "/fixtures/giphy-GVNvOUpeYmI7e.gif",
      contentType: import_MIME.IMAGE_GIF
    }),
    isProfile: true
  },
  email: [
    {
      value: "jerjor@fakemail.com",
      type: import_EmbeddedContact.ContactFormType.HOME
    },
    {
      value: "jerry.jordan@fakeco.com",
      type: import_EmbeddedContact.ContactFormType.WORK
    },
    {
      value: "jj@privatething.net",
      type: import_EmbeddedContact.ContactFormType.CUSTOM,
      label: "private"
    },
    {
      value: "jordan@another.net",
      type: import_EmbeddedContact.ContactFormType.CUSTOM
    }
  ],
  name: {
    givenName: "Jerry",
    familyName: "Jordan",
    prefix: "Dr.",
    suffix: "Jr.",
    middleName: "James",
    displayName: "Jerry Jordan"
  },
  number: [
    {
      value: "555-444-2323",
      type: import_EmbeddedContact.ContactFormType.HOME
    },
    {
      value: "555-444-3232",
      type: import_EmbeddedContact.ContactFormType.WORK
    },
    {
      value: "555-666-3232",
      type: import_EmbeddedContact.ContactFormType.MOBILE
    },
    {
      value: "333-666-3232",
      type: import_EmbeddedContact.ContactFormType.CUSTOM,
      label: "special"
    },
    {
      value: "333-777-3232",
      type: import_EmbeddedContact.ContactFormType.CUSTOM
    }
  ]
};
const FullyFilledOut = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: fullContact,
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "FullyFilledOut");
const OnlyEmail = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      email: [
        {
          value: "jerjor@fakemail.com",
          type: import_EmbeddedContact.ContactFormType.HOME
        }
      ]
    },
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "OnlyEmail");
const GivenName = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      name: {
        givenName: "Jerry"
      }
    },
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "GivenName");
const Organization = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      organization: "Company 5"
    },
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "Organization");
const GivenFamilyName = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      name: {
        givenName: "Jerry",
        familyName: "FamilyName"
      }
    },
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "GivenFamilyName");
GivenFamilyName.story = {
  name: "Given + Family Name"
};
const FamilyName = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      name: {
        familyName: "FamilyName"
      }
    },
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "FamilyName");
const LoadingAvatar = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      avatar: {
        avatar: (0, import_fakeAttachment.fakeAttachment)({
          contentType: import_MIME.IMAGE_GIF,
          pending: true
        }),
        isProfile: true
      }
    },
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "LoadingAvatar");
const EmptyWithAccount = /* @__PURE__ */ __name(() => {
  const props = createProps({
    hasSignalAccount: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "EmptyWithAccount");
EmptyWithAccount.story = {
  name: "Empty with Account"
};
const EmptyWithoutAccount = /* @__PURE__ */ __name(() => {
  const props = createProps({
    hasSignalAccount: false
  });
  return /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
    ...props
  });
}, "EmptyWithoutAccount");
EmptyWithoutAccount.story = {
  name: "Empty without Account"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyWithAccount,
  EmptyWithoutAccount,
  FamilyName,
  FullyFilledOut,
  GivenFamilyName,
  GivenName,
  LoadingAvatar,
  OnlyEmail,
  Organization
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdERldGFpbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL0NvbnRhY3REZXRhaWwnO1xuaW1wb3J0IHsgQ29udGFjdERldGFpbCB9IGZyb20gJy4vQ29udGFjdERldGFpbCc7XG5pbXBvcnQgeyBBZGRyZXNzVHlwZSwgQ29udGFjdEZvcm1UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgSU1BR0VfR0lGIH0gZnJvbSAnLi4vLi4vdHlwZXMvTUlNRSc7XG5cbmltcG9ydCB7IGZha2VBdHRhY2htZW50IH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZmFrZUF0dGFjaG1lbnQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ29udGFjdERldGFpbCcsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgY29udGFjdDogb3ZlcnJpZGVQcm9wcy5jb250YWN0IHx8IHt9LFxuICBoYXNTaWduYWxBY2NvdW50OiBib29sZWFuKFxuICAgICdoYXNTaWduYWxBY2NvdW50JyxcbiAgICBvdmVycmlkZVByb3BzLmhhc1NpZ25hbEFjY291bnQgfHwgZmFsc2VcbiAgKSxcbiAgaTE4bixcbiAgb25TZW5kTWVzc2FnZTogYWN0aW9uKCdvblNlbmRNZXNzYWdlJyksXG59KTtcblxuY29uc3QgZnVsbENvbnRhY3QgPSB7XG4gIGFkZHJlc3M6IFtcbiAgICB7XG4gICAgICB0eXBlOiBBZGRyZXNzVHlwZS5IT01FLFxuICAgICAgc3RyZWV0OiAnNTU1IE1haW4gU3QuJyxcbiAgICAgIGNpdHk6ICdCb3N0b24nLFxuICAgICAgcmVnaW9uOiAnTUEnLFxuICAgICAgcG9zdGNvZGU6ICczMzMzMycsXG4gICAgICBwb2JveDogJzIzMjMtNDQ0JyxcbiAgICAgIGNvdW50cnk6ICdVUycsXG4gICAgICBuZWlnaGJvcmhvb2Q6ICdHYXJkZW4gUGxhY2UnLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogQWRkcmVzc1R5cGUuV09SSyxcbiAgICAgIHN0cmVldDogJzMzMyBBbm90aGVyIFN0LicsXG4gICAgICBjaXR5OiAnQm9zdG9uJyxcbiAgICAgIHJlZ2lvbjogJ01BJyxcbiAgICAgIHBvc3Rjb2RlOiAnMzMzNDQnLFxuICAgICAgcG9ib3g6ICcyNDI0LTU1NScsXG4gICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgbmVpZ2hib3Job29kOiAnRmFjdG9yeSBQbGFjZScsXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiBBZGRyZXNzVHlwZS5DVVNUT00sXG4gICAgICBzdHJlZXQ6ICcxMTEgRHJlYW0gU3QuJyxcbiAgICAgIGNpdHk6ICdNaWFtaScsXG4gICAgICByZWdpb246ICdGTCcsXG4gICAgICBwb3N0Y29kZTogJzQ0MjMyJyxcbiAgICAgIHBvYm94OiAnMTExLTMzMycsXG4gICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgbmVpZ2hib3Job29kOiAnQmVhY2hWaWxsZScsXG4gICAgICBsYWJlbDogJ3ZhY2F0aW9uJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6IEFkZHJlc3NUeXBlLkNVU1RPTSxcbiAgICAgIHN0cmVldDogJzMzMyBGYWtlIFN0LicsXG4gICAgICBjaXR5OiAnQm9zdG9uJyxcbiAgICAgIHJlZ2lvbjogJ01BJyxcbiAgICAgIHBvc3Rjb2RlOiAnMzMzNDUnLFxuICAgICAgcG9ib3g6ICcxMjMtNDQ0JyxcbiAgICAgIGNvdW50cnk6ICdVUycsXG4gICAgICBuZWlnaGJvcmhvb2Q6ICdEb3dudG93bicsXG4gICAgfSxcbiAgXSxcbiAgYXZhdGFyOiB7XG4gICAgYXZhdGFyOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICBwYXRoOiAnL2ZpeHR1cmVzL2dpcGh5LUdWTnZPVXBlWW1JN2UuZ2lmJyxcbiAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9HSUYsXG4gICAgfSksXG4gICAgaXNQcm9maWxlOiB0cnVlLFxuICB9LFxuICBlbWFpbDogW1xuICAgIHtcbiAgICAgIHZhbHVlOiAnamVyam9yQGZha2VtYWlsLmNvbScsXG4gICAgICB0eXBlOiBDb250YWN0Rm9ybVR5cGUuSE9NRSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHZhbHVlOiAnamVycnkuam9yZGFuQGZha2Vjby5jb20nLFxuICAgICAgdHlwZTogQ29udGFjdEZvcm1UeXBlLldPUkssXG4gICAgfSxcbiAgICB7XG4gICAgICB2YWx1ZTogJ2pqQHByaXZhdGV0aGluZy5uZXQnLFxuICAgICAgdHlwZTogQ29udGFjdEZvcm1UeXBlLkNVU1RPTSxcbiAgICAgIGxhYmVsOiAncHJpdmF0ZScsXG4gICAgfSxcbiAgICB7XG4gICAgICB2YWx1ZTogJ2pvcmRhbkBhbm90aGVyLm5ldCcsXG4gICAgICB0eXBlOiBDb250YWN0Rm9ybVR5cGUuQ1VTVE9NLFxuICAgIH0sXG4gIF0sXG4gIG5hbWU6IHtcbiAgICBnaXZlbk5hbWU6ICdKZXJyeScsXG4gICAgZmFtaWx5TmFtZTogJ0pvcmRhbicsXG4gICAgcHJlZml4OiAnRHIuJyxcbiAgICBzdWZmaXg6ICdKci4nLFxuICAgIG1pZGRsZU5hbWU6ICdKYW1lcycsXG4gICAgZGlzcGxheU5hbWU6ICdKZXJyeSBKb3JkYW4nLFxuICB9LFxuICBudW1iZXI6IFtcbiAgICB7XG4gICAgICB2YWx1ZTogJzU1NS00NDQtMjMyMycsXG4gICAgICB0eXBlOiBDb250YWN0Rm9ybVR5cGUuSE9NRSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHZhbHVlOiAnNTU1LTQ0NC0zMjMyJyxcbiAgICAgIHR5cGU6IENvbnRhY3RGb3JtVHlwZS5XT1JLLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsdWU6ICc1NTUtNjY2LTMyMzInLFxuICAgICAgdHlwZTogQ29udGFjdEZvcm1UeXBlLk1PQklMRSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHZhbHVlOiAnMzMzLTY2Ni0zMjMyJyxcbiAgICAgIHR5cGU6IENvbnRhY3RGb3JtVHlwZS5DVVNUT00sXG4gICAgICBsYWJlbDogJ3NwZWNpYWwnLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsdWU6ICczMzMtNzc3LTMyMzInLFxuICAgICAgdHlwZTogQ29udGFjdEZvcm1UeXBlLkNVU1RPTSxcbiAgICB9LFxuICBdLFxufTtcblxuZXhwb3J0IGNvbnN0IEZ1bGx5RmlsbGVkT3V0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgY29udGFjdDogZnVsbENvbnRhY3QsXG4gICAgaGFzU2lnbmFsQWNjb3VudDogdHJ1ZSxcbiAgfSk7XG4gIHJldHVybiA8Q29udGFjdERldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE9ubHlFbWFpbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGNvbnRhY3Q6IHtcbiAgICAgIGVtYWlsOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogJ2plcmpvckBmYWtlbWFpbC5jb20nLFxuICAgICAgICAgIHR5cGU6IENvbnRhY3RGb3JtVHlwZS5IT01FLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGhhc1NpZ25hbEFjY291bnQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29udGFjdERldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEdpdmVuTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGNvbnRhY3Q6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZ2l2ZW5OYW1lOiAnSmVycnknLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGhhc1NpZ25hbEFjY291bnQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29udGFjdERldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE9yZ2FuaXphdGlvbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGNvbnRhY3Q6IHtcbiAgICAgIG9yZ2FuaXphdGlvbjogJ0NvbXBhbnkgNScsXG4gICAgfSxcbiAgICBoYXNTaWduYWxBY2NvdW50OiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gPENvbnRhY3REZXRhaWwgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBHaXZlbkZhbWlseU5hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBjb250YWN0OiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGdpdmVuTmFtZTogJ0plcnJ5JyxcbiAgICAgICAgZmFtaWx5TmFtZTogJ0ZhbWlseU5hbWUnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGhhc1NpZ25hbEFjY291bnQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29udGFjdERldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuR2l2ZW5GYW1pbHlOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnR2l2ZW4gKyBGYW1pbHkgTmFtZScsXG59O1xuXG5leHBvcnQgY29uc3QgRmFtaWx5TmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGNvbnRhY3Q6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZmFtaWx5TmFtZTogJ0ZhbWlseU5hbWUnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGhhc1NpZ25hbEFjY291bnQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29udGFjdERldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IExvYWRpbmdBdmF0YXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBjb250YWN0OiB7XG4gICAgICBhdmF0YXI6IHtcbiAgICAgICAgYXZhdGFyOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0dJRixcbiAgICAgICAgICBwZW5kaW5nOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGhhc1NpZ25hbEFjY291bnQ6IHRydWUsXG4gIH0pO1xuICByZXR1cm4gPENvbnRhY3REZXRhaWwgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eVdpdGhBY2NvdW50ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaGFzU2lnbmFsQWNjb3VudDogdHJ1ZSxcbiAgfSk7XG4gIHJldHVybiA8Q29udGFjdERldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuRW1wdHlXaXRoQWNjb3VudC5zdG9yeSA9IHtcbiAgbmFtZTogJ0VtcHR5IHdpdGggQWNjb3VudCcsXG59O1xuXG5leHBvcnQgY29uc3QgRW1wdHlXaXRob3V0QWNjb3VudCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGhhc1NpZ25hbEFjY291bnQ6IGZhbHNlLFxuICB9KTtcbiAgcmV0dXJuIDxDb250YWN0RGV0YWlsIHsuLi5wcm9wc30gLz47XG59O1xuXG5FbXB0eVdpdGhvdXRBY2NvdW50LnN0b3J5ID0ge1xuICBuYW1lOiAnRW1wdHkgd2l0aG91dCBBY2NvdW50Jyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsMkJBQXVCO0FBQ3ZCLHlCQUF3QjtBQUd4QiwyQkFBOEI7QUFDOUIsNkJBQTZDO0FBQzdDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsa0JBQTBCO0FBRTFCLDRCQUErQjtBQUUvQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLGdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLFNBQVMsY0FBYyxXQUFXLENBQUM7QUFBQSxFQUNuQyxrQkFBa0IsZ0NBQ2hCLG9CQUNBLGNBQWMsb0JBQW9CLEtBQ3BDO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZSxpQ0FBTyxlQUFlO0FBQ3ZDLElBUm9CO0FBVXBCLE1BQU0sY0FBYztBQUFBLEVBQ2xCLFNBQVM7QUFBQSxJQUNQO0FBQUEsTUFDRSxNQUFNLG1DQUFZO0FBQUEsTUFDbEIsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsU0FBUztB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
