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
var AddGroupMembersModal_stories_exports = {};
__export(AddGroupMembersModal_stories_exports, {
  Default: () => Default,
  EveryoneAlreadyAdded: () => EveryoneAlreadyAdded,
  NoCandidateContacts: () => NoCandidateContacts,
  Only3Contacts: () => Only3Contacts,
  RequestFailsAfter1Second: () => RequestFailsAfter1Second,
  default: () => AddGroupMembersModal_stories_default
});
module.exports = __toCommonJS(AddGroupMembersModal_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_sleep = require("../../../util/sleep");
var import_makeLookup = require("../../../util/makeLookup");
var import_deconstructLookup = require("../../../util/deconstructLookup");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_AddGroupMembersModal = require("./AddGroupMembersModal");
var import_ChooseGroupMembersModal = require("./AddGroupMembersModal/ChooseGroupMembersModal");
var import_ConfirmAdditionsModal = require("./AddGroupMembersModal/ConfirmAdditionsModal");
var import_util = require("./util");
var import_Util = require("../../../types/Util");
var import_fakeLookupConversationWithoutUuid = require("../../../test-both/helpers/fakeLookupConversationWithoutUuid");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var AddGroupMembersModal_stories_default = {
  title: "Components/Conversation/ConversationDetails/AddGroupMembersModal"
};
const allCandidateContacts = (0, import_lodash.times)(50, () => (0, import_getDefaultConversation.getDefaultConversation)());
let allCandidateContactsLookup = (0, import_makeLookup.makeLookup)(allCandidateContacts, "id");
const lookupConversationWithoutUuid = (0, import_fakeLookupConversationWithoutUuid.makeFakeLookupConversationWithoutUuid)((convo) => {
  allCandidateContacts.push(convo);
  allCandidateContactsLookup = (0, import_makeLookup.makeLookup)(allCandidateContacts, "id");
});
const createProps = /* @__PURE__ */ __name((overrideProps = {}, candidateContacts = []) => ({
  clearRequestError: (0, import_addon_actions.action)("clearRequestError"),
  conversationIdsAlreadyInGroup: /* @__PURE__ */ new Set(),
  groupTitle: "Tahoe Trip",
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  makeRequest: async (conversationIds) => {
    (0, import_addon_actions.action)("onMakeRequest")(conversationIds);
  },
  requestState: import_util.RequestState.Inactive,
  renderChooseGroupMembersModal: (props) => {
    const { selectedConversationIds } = props;
    return /* @__PURE__ */ import_react.default.createElement(import_ChooseGroupMembersModal.ChooseGroupMembersModal, {
      ...props,
      candidateContacts,
      selectedContacts: (0, import_deconstructLookup.deconstructLookup)(allCandidateContactsLookup, selectedConversationIds),
      regionCode: "US",
      getPreferredBadge: () => void 0,
      theme: import_Util.ThemeType.light,
      i18n,
      lookupConversationWithoutUuid,
      showUserNotFoundModal: (0, import_addon_actions.action)("showUserNotFoundModal"),
      isUsernamesEnabled: true
    });
  },
  renderConfirmAdditionsModal: (props) => {
    const { selectedConversationIds } = props;
    return /* @__PURE__ */ import_react.default.createElement(import_ConfirmAdditionsModal.ConfirmAdditionsModal, {
      ...props,
      i18n,
      selectedContacts: (0, import_deconstructLookup.deconstructLookup)(allCandidateContactsLookup, selectedConversationIds)
    });
  },
  ...overrideProps
}), "createProps");
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AddGroupMembersModal.AddGroupMembersModal, {
  ...createProps()
}), "Default");
const Only3Contacts = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AddGroupMembersModal.AddGroupMembersModal, {
  ...createProps({}, allCandidateContacts.slice(0, 3))
}), "Only3Contacts");
Only3Contacts.story = {
  name: "Only 3 contacts"
};
const NoCandidateContacts = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AddGroupMembersModal.AddGroupMembersModal, {
  ...createProps({}, [])
}), "NoCandidateContacts");
NoCandidateContacts.story = {
  name: "No candidate contacts"
};
const EveryoneAlreadyAdded = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AddGroupMembersModal.AddGroupMembersModal, {
  ...createProps({
    conversationIdsAlreadyInGroup: new Set(allCandidateContacts.map((contact) => contact.id))
  })
}), "EveryoneAlreadyAdded");
EveryoneAlreadyAdded.story = {
  name: "Everyone already added"
};
const RequestFailsAfter1Second = /* @__PURE__ */ __name(() => {
  const Wrapper = /* @__PURE__ */ __name(() => {
    const [requestState, setRequestState] = (0, import_react.useState)(import_util.RequestState.Inactive);
    return /* @__PURE__ */ import_react.default.createElement(import_AddGroupMembersModal.AddGroupMembersModal, {
      ...createProps({
        clearRequestError: () => {
          setRequestState(import_util.RequestState.Inactive);
        },
        makeRequest: async () => {
          setRequestState(import_util.RequestState.Active);
          await (0, import_sleep.sleep)(1e3);
          setRequestState(import_util.RequestState.InactiveWithError);
        },
        requestState
      })
    });
  }, "Wrapper");
  return /* @__PURE__ */ import_react.default.createElement(Wrapper, null);
}, "RequestFailsAfter1Second");
RequestFailsAfter1Second.story = {
  name: "Request fails after 1 second"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  EveryoneAlreadyAdded,
  NoCandidateContacts,
  Only3Contacts,
  RequestFailsAfter1Second
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkR3JvdXBNZW1iZXJzTW9kYWwuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi8uLi91dGlsL3NsZWVwJztcbmltcG9ydCB7IG1ha2VMb29rdXAgfSBmcm9tICcuLi8uLi8uLi91dGlsL21ha2VMb29rdXAnO1xuaW1wb3J0IHsgZGVjb25zdHJ1Y3RMb29rdXAgfSBmcm9tICcuLi8uLi8uLi91dGlsL2RlY29uc3RydWN0TG9va3VwJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBBZGRHcm91cE1lbWJlcnNNb2RhbCB9IGZyb20gJy4vQWRkR3JvdXBNZW1iZXJzTW9kYWwnO1xuaW1wb3J0IHsgQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwgfSBmcm9tICcuL0FkZEdyb3VwTWVtYmVyc01vZGFsL0Nob29zZUdyb3VwTWVtYmVyc01vZGFsJztcbmltcG9ydCB7IENvbmZpcm1BZGRpdGlvbnNNb2RhbCB9IGZyb20gJy4vQWRkR3JvdXBNZW1iZXJzTW9kYWwvQ29uZmlybUFkZGl0aW9uc01vZGFsJztcbmltcG9ydCB7IFJlcXVlc3RTdGF0ZSB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IG1ha2VGYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQgfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ29udmVyc2F0aW9uRGV0YWlscy9BZGRHcm91cE1lbWJlcnNNb2RhbCcsXG59O1xuXG5jb25zdCBhbGxDYW5kaWRhdGVDb250YWN0cyA9IHRpbWVzKDUwLCAoKSA9PiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCkpO1xubGV0IGFsbENhbmRpZGF0ZUNvbnRhY3RzTG9va3VwID0gbWFrZUxvb2t1cChhbGxDYW5kaWRhdGVDb250YWN0cywgJ2lkJyk7XG5cbmNvbnN0IGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkID0gbWFrZUZha2VMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZChcbiAgY29udm8gPT4ge1xuICAgIGFsbENhbmRpZGF0ZUNvbnRhY3RzLnB1c2goY29udm8pO1xuICAgIGFsbENhbmRpZGF0ZUNvbnRhY3RzTG9va3VwID0gbWFrZUxvb2t1cChhbGxDYW5kaWRhdGVDb250YWN0cywgJ2lkJyk7XG4gIH1cbik7XG5cbnR5cGUgUHJvcHNUeXBlID0gQ29tcG9uZW50UHJvcHM8dHlwZW9mIEFkZEdyb3VwTWVtYmVyc01vZGFsPjtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoXG4gIG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9LFxuICBjYW5kaWRhdGVDb250YWN0czogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXVxuKTogUHJvcHNUeXBlID0+ICh7XG4gIGNsZWFyUmVxdWVzdEVycm9yOiBhY3Rpb24oJ2NsZWFyUmVxdWVzdEVycm9yJyksXG4gIGNvbnZlcnNhdGlvbklkc0FscmVhZHlJbkdyb3VwOiBuZXcgU2V0KCksXG4gIGdyb3VwVGl0bGU6ICdUYWhvZSBUcmlwJyxcbiAgaTE4bixcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG4gIG1ha2VSZXF1ZXN0OiBhc3luYyAoY29udmVyc2F0aW9uSWRzOiBSZWFkb25seUFycmF5PHN0cmluZz4pID0+IHtcbiAgICBhY3Rpb24oJ29uTWFrZVJlcXVlc3QnKShjb252ZXJzYXRpb25JZHMpO1xuICB9LFxuICByZXF1ZXN0U3RhdGU6IFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZSxcbiAgcmVuZGVyQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWw6IHByb3BzID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzIH0gPSBwcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPENob29zZUdyb3VwTWVtYmVyc01vZGFsXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM9e2NhbmRpZGF0ZUNvbnRhY3RzfVxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtkZWNvbnN0cnVjdExvb2t1cChcbiAgICAgICAgICBhbGxDYW5kaWRhdGVDb250YWN0c0xvb2t1cCxcbiAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkc1xuICAgICAgICApfVxuICAgICAgICByZWdpb25Db2RlPVwiVVNcIlxuICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZT17KCkgPT4gdW5kZWZpbmVkfVxuICAgICAgICB0aGVtZT17VGhlbWVUeXBlLmxpZ2h0fVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZD17bG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWR9XG4gICAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbD17YWN0aW9uKCdzaG93VXNlck5vdEZvdW5kTW9kYWwnKX1cbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkXG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4gIHJlbmRlckNvbmZpcm1BZGRpdGlvbnNNb2RhbDogcHJvcHMgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMgfSA9IHByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8Q29uZmlybUFkZGl0aW9uc01vZGFsXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgc2VsZWN0ZWRDb250YWN0cz17ZGVjb25zdHJ1Y3RMb29rdXAoXG4gICAgICAgICAgYWxsQ2FuZGlkYXRlQ29udGFjdHNMb29rdXAsXG4gICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHNcbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbiAgLi4ub3ZlcnJpZGVQcm9wcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBZGRHcm91cE1lbWJlcnNNb2RhbCB7Li4uY3JlYXRlUHJvcHMoKX0gLz5cbik7XG5cbmV4cG9ydCBjb25zdCBPbmx5M0NvbnRhY3RzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEFkZEdyb3VwTWVtYmVyc01vZGFsXG4gICAgey4uLmNyZWF0ZVByb3BzKHt9LCBhbGxDYW5kaWRhdGVDb250YWN0cy5zbGljZSgwLCAzKSl9XG4gIC8+XG4pO1xuXG5Pbmx5M0NvbnRhY3RzLnN0b3J5ID0ge1xuICBuYW1lOiAnT25seSAzIGNvbnRhY3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb0NhbmRpZGF0ZUNvbnRhY3RzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEFkZEdyb3VwTWVtYmVyc01vZGFsIHsuLi5jcmVhdGVQcm9wcyh7fSwgW10pfSAvPlxuKTtcblxuTm9DYW5kaWRhdGVDb250YWN0cy5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIGNhbmRpZGF0ZSBjb250YWN0cycsXG59O1xuXG5leHBvcnQgY29uc3QgRXZlcnlvbmVBbHJlYWR5QWRkZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QWRkR3JvdXBNZW1iZXJzTW9kYWxcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgY29udmVyc2F0aW9uSWRzQWxyZWFkeUluR3JvdXA6IG5ldyBTZXQoXG4gICAgICAgIGFsbENhbmRpZGF0ZUNvbnRhY3RzLm1hcChjb250YWN0ID0+IGNvbnRhY3QuaWQpXG4gICAgICApLFxuICAgIH0pfVxuICAvPlxuKTtcblxuRXZlcnlvbmVBbHJlYWR5QWRkZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdFdmVyeW9uZSBhbHJlYWR5IGFkZGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSZXF1ZXN0RmFpbHNBZnRlcjFTZWNvbmQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBXcmFwcGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IFtyZXF1ZXN0U3RhdGUsIHNldFJlcXVlc3RTdGF0ZV0gPSB1c2VTdGF0ZShSZXF1ZXN0U3RhdGUuSW5hY3RpdmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxBZGRHcm91cE1lbWJlcnNNb2RhbFxuICAgICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICAgIGNsZWFyUmVxdWVzdEVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICBzZXRSZXF1ZXN0U3RhdGUoUmVxdWVzdFN0YXRlLkluYWN0aXZlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1ha2VSZXF1ZXN0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzZXRSZXF1ZXN0U3RhdGUoUmVxdWVzdFN0YXRlLkFjdGl2ZSk7XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICAgICAgICAgIHNldFJlcXVlc3RTdGF0ZShSZXF1ZXN0U3RhdGUuSW5hY3RpdmVXaXRoRXJyb3IpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWVzdFN0YXRlLFxuICAgICAgICB9KX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gPFdyYXBwZXIgLz47XG59O1xuXG5SZXF1ZXN0RmFpbHNBZnRlcjFTZWNvbmQuc3RvcnkgPSB7XG4gIG5hbWU6ICdSZXF1ZXN0IGZhaWxzIGFmdGVyIDEgc2Vjb25kJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFnQztBQUNoQyxvQkFBc0I7QUFFdEIsMkJBQXVCO0FBRXZCLG1CQUFzQjtBQUN0Qix3QkFBMkI7QUFDM0IsK0JBQWtDO0FBQ2xDLHVCQUEwQjtBQUUxQixzQkFBdUI7QUFDdkIsb0NBQXVDO0FBQ3ZDLGtDQUFxQztBQUNyQyxxQ0FBd0M7QUFDeEMsbUNBQXNDO0FBQ3RDLGtCQUE2QjtBQUM3QixrQkFBMEI7QUFDMUIsK0NBQXNEO0FBRXRELE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sdUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sdUJBQXVCLHlCQUFNLElBQUksTUFBTSwwREFBdUIsQ0FBQztBQUNyRSxJQUFJLDZCQUE2QixrQ0FBVyxzQkFBc0IsSUFBSTtBQUV0RSxNQUFNLGdDQUFnQyxvRkFDcEMsV0FBUztBQUNQLHVCQUFxQixLQUFLLEtBQUs7QUFDL0IsK0JBQTZCLGtDQUFXLHNCQUFzQixJQUFJO0FBQ3BFLENBQ0Y7QUFJQSxNQUFNLGNBQWMsd0JBQ2xCLGdCQUFvQyxD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
